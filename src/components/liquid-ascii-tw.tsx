"use client";

/**
 * Liquid ASCII — a body of water, drawn in characters.
 *
 * The footer's picture is a body of water that sloshes. A body of water is
 * not a picture of water — it is a thing with mass — so this component
 * solves for one: a row of columns of shallow water, one column per
 * character, and the picture falls out of the solution.
 *
 * The characters are the water, not a caption of it. The columns the water
 * stands in are the columns the characters are set in, so the surface of
 * the water is quantised to the same lattice the type is, and the ASCII
 * picture and the water are the same thing.
 *
 * The hand in the water is the reader's:
 *
 * - **A pointer held over the water** presses the surface down under it and
 *   the water closes over the hollow.
 * - **A pointer dragged through the water** pulls it along, and the wake
 *   keeps sloshing after the hand is lifted.
 * - **A click** strikes the water, and the strike throws a crown.
 *
 * The prop names and their meanings follow the React Bits Pro component of
 * the same name, so the licensed file can replace this one without the call
 * site changing. Where the house solver reads a prop differently from the
 * licensed file, the reading is listed below the interface. Four house
 * additions are marked: `surfaceRef` (the panel the ink must keep off the
 * type), `maxFPS` (the frame budget), `pauseWhenOffscreen` (a water
 * simulation has no business running off the page) and `damping` (how much
 * of the wave is let go).
 */

import { useEffect, useRef } from "react";
import {
  BAYER_8,
  INK_CEILING,
  bayerThreshold,
  ditherRamp,
  measureGlyphCoverage,
  screenReserve,
  type ScreenReserve,
} from "@/lib/halftone";
import { Water, type WaterPointer } from "@/lib/water";
import { readReserves } from "@/lib/screen-reserves";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface LiquidAsciiProps {
  /** The width of the screen, in pixels. The panel's own width when omitted. */
  width?: number;
  /** The height of the screen, in pixels. The panel's own height when omitted. */
  height?: number;
  className?: string;
  children?: React.ReactNode;
  /** How fast the water moves. */
  speed?: number;
  /** The height of a character cell, in pixels. */
  cellSize?: number;
  /** The acceleration, in px/s². Negative pulls the water down. */
  gravity?: number;
  /** The share of the velocity that comes from FLIP. 0 is all PIC. */
  flipRatio?: number;
  /** How many times the pressure is relaxed per step. */
  pressureIters?: number;
  /** How many times the particles are pushed apart per step. */
  separationIters?: number;
  /** The over-relaxation factor of the pressure solve. */
  overRelaxation?: number;
  /** How much of the panel the water fills at rest, 0..1. */
  fillHeight?: number;
  /** The reach of the pointer, as a share of the panel's short side. */
  cursorRadius?: number;
  /** How hard the pointer pushes the water. */
  cursorForce?: number;
  /** The marks the water is drawn with, lightest first. */
  characters?: string;
  /** The colour of the water. */
  color?: string;
  /** The colour of the panel behind the water. */
  backgroundColor?: string;
  /** The face the water is drawn in. */
  fontFamily?: string;
  /** The opacity of the whole screen. */
  opacity?: number;
  /** Whether the water stirs on its own. */
  autoWave?: boolean;
  /** House addition: the most frames a second the water will move. */
  maxFPS?: number;
  /** House addition: whether the water stops while it is off the page. */
  pauseWhenOffscreen?: boolean;
  /** House addition: the panel the ink must keep off the type. */
  surfaceRef?: React.RefObject<HTMLElement | null>;
  /** House addition: how much of the wave is let go each second. */
  damping?: number;
}

/**
 * How the house solver reads the props of the licensed component.
 *
 * - `gravity` is the acceleration of the water, as it is there.
 * - `fillHeight` is how much of the panel the water rests on, as it is there.
 * - `cursorRadius` is the reach of the pointer and `cursorForce` how deep it
 *   presses the surface.
 * - `speed` is how quickly the water's own stirring moves.
 * - `pressureIters` is the solver's budget for one step: the passes the
 *   wave is allowed to take to cross the panel.
 * - `overRelaxation` is how hard the wave is driven.
 * - `separationIters` is how many times the surface is evened out after a
 *   step, so a strike does not leave a spike behind.
 * - `flipRatio` is how much of the pointer's own speed the water keeps.
 */

/** How much of a cell the face fills. A character with room to breathe. */
const FONT_FILL = 0.78;

/** How deep below its surface the water still shows, in cells. */
const SURFACE_DEPTH = 2.5;

/** The share of a full cell the water must hold to count as its surface. */
const BODY_FLOOR = 0.08;

/** The speed at which the water is fully lit, in px/s. */
const MOTION_REFERENCE = 90;

/** How deep the reader's hand presses the surface, in pixels. */
const PRESS_DEPTH = 30;

/** How much of a strike is thrown up, in pixels. */
const SPLASH_DEPTH = 66;

/** How fast the reader's hand may move, in px/s. */
const MAX_HAND_SPEED = 900;

/** How long the hand's memory of its own speed lasts, in seconds. */
const HAND_MEMORY = 0.08;

export function LiquidAscii({
  width,
  height,
  className,
  children,
  speed = 0.9,
  cellSize = 15,
  gravity = 1400,
  flipRatio = 0.3,
  pressureIters = 30,
  separationIters = 3,
  overRelaxation = 1.5,
  fillHeight = 0.4,
  cursorRadius = 0.25,
  cursorForce = 66,
  characters = " ·:-~=+*#%@",
  color = "#ffffff",
  backgroundColor = "#000000",
  fontFamily = "monospace",
  opacity = 1,
  autoWave = true,
  maxFPS = 60,
  pauseWhenOffscreen = true,
  surfaceRef,
  damping = 0.7,
}: LiquidAsciiProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useStableReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const surface = surfaceRef?.current ?? wrapper.parentElement;
    if (!surface) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    /** Resolve a CSS colour — including `var(--token)` — into a fill style. */
    const resolve = (value: string): string => {
      const probe = document.createElement("span");
      probe.style.display = "none";
      probe.style.color = value;
      document.body.appendChild(probe);
      const computed = window.getComputedStyle(probe).color;
      probe.remove();
      return computed || value;
    };

    /** Resolve a CSS font stack, including `var(--token)`. */
    const resolveFont = (value: string): string => {
      const probe = document.createElement("span");
      probe.style.display = "none";
      probe.style.fontFamily = value;
      document.body.appendChild(probe);
      const computed = window.getComputedStyle(probe).fontFamily;
      probe.remove();
      return computed || value;
    };

    // The colours are read from the page, not from the props: a prop may
    // name a token, and a token changes with the theme. They are read again
    // whenever the theme changes, so the water never keeps the palette it
    // was mounted with.
    let ink = resolve(color);
    let paper = resolve(backgroundColor);
    const face = resolveFont(fontFamily);

    const readColours = () => {
      ink = resolve(color);
      paper = resolve(backgroundColor);
    };
    const glyphs = Array.from(characters.length > 0 ? characters : " ");

    let water: Water | null = null;
    let atlas: HTMLCanvasElement | null = null;
    /** The ramp of marks, lightest first, with the share each one inks. */
    let ramp: { glyph: string; coverage: number }[] = [];
    let cellWidth = 1;
    let cellHeight = cellSize;
    let fontSize = cellSize * FONT_FILL;
    let columns = 1;
    let rows = 1;

    /** The blocks of type the ink must not touch. */
    const observed = new Set<HTMLElement>();
    const reserveObserver = new ResizeObserver(() => {
      paint();
    });

    let reserves: ScreenReserve[] = [];
    let reserveAge = 0;

    let frame = 0;
    let lastStep = 0;
    let visible = true;
    let elapsed = 0;

    /** Where the reader's hand is on the water. */
    const hand = {
      x: 0,
      y: 0,
      /** The hand's own speed along the surface, in px/s. */
      speed: 0,
      /** Where the hand was, and when — the hand remembers a little. */
      lastX: 0,
      lastAt: 0,
      /** Whether the hand is over the water. */
      over: false,
      /** Whether the hand is pressing down. */
      down: false,
      /** The strike waiting to be thrown. */
      splash: 0,
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = surface.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const now = performance.now();

      // The hand's speed is remembered for a moment, so a quick flick keeps
      // pulling the water after the pointer has stopped.
      const since = (now - hand.lastAt) / 1000;
      if (since > 0.0005 && hand.lastAt > 0) {
        const speed = (x - hand.lastX) / since;
        const blend = Math.min(1, since / HAND_MEMORY);
        hand.speed = hand.speed * (1 - blend) + speed * blend;
        hand.speed = Math.max(
          -MAX_HAND_SPEED,
          Math.min(MAX_HAND_SPEED, hand.speed),
        );
      }
      hand.lastX = x;
      hand.lastAt = now;
      hand.x = x;
      hand.y = y;
      hand.over = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      onPointerMove(event);
      hand.down = true;
      hand.splash = SPLASH_DEPTH;
      surface.setPointerCapture?.(event.pointerId);
    };

    const onPointerUp = () => {
      hand.down = false;
    };

    const onPointerLeave = () => {
      hand.over = false;
      hand.down = false;
      hand.speed = 0;
    };

    /**
     * The atlas: every mark, drawn once, at the screen's own resolution.
     *
     * Drawing the characters into a strip and blitting them is far cheaper
     * than asking the browser to set the same few hundred characters every
     * frame, and it keeps the marks on one lattice.
     */
    const buildAtlas = (ratio: number): boolean => {
      const atlasCanvas = document.createElement("canvas");
      atlasCanvas.width = Math.ceil(cellWidth * ratio * glyphs.length);
      atlasCanvas.height = Math.ceil(cellHeight * ratio);
      const atlasContext = atlasCanvas.getContext("2d");
      if (!atlasContext) return false;
      atlasContext.font = `${fontSize * ratio}px ${face}`;
      atlasContext.textAlign = "center";
      atlasContext.textBaseline = "middle";
      atlasContext.fillStyle = ink;
      glyphs.forEach((glyph, index) => {
        atlasContext.fillText(
          glyph,
          (index + 0.5) * cellWidth * ratio,
          atlasCanvas.height / 2,
        );
      });
      atlas = atlasCanvas;
      return true;
    };

    /**
     * Lay out the screen: the lattice, the face, and the marks.
     *
     * The marks are measured in the medium that prints them, and the face is
     * sized so that the heaviest mark covers the page's ink ceiling — the
     * same ceiling the hero's dots are held to. Two screens, one weight of
     * paper.
     */
    const layout = (): Water | null => {
      const rect = surface.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;

      const ratio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));

      // The cell is as wide as the face's advance and as tall as `cellSize`.
      const metrics = document.createElement("canvas").getContext("2d");
      if (!metrics) return null;
      metrics.font = `${fontSize}px ${face}`;
      cellWidth = Math.max(1, metrics.measureText("M").width);
      cellHeight = Math.max(1, cellSize);

      columns = Math.max(1, Math.floor(rect.width / cellWidth));
      rows = Math.max(1, Math.floor(rect.height / cellHeight));

      // Measure the marks, then size the face so the heaviest one reaches
      // the ceiling without falling out of its cell.
      let coverage = measureGlyphCoverage(
        `${fontSize}px ${face}`,
        cellWidth,
        cellHeight,
        glyphs,
      );
      const heaviest = coverage.reduce((max, value) => Math.max(max, value), 0);
      if (heaviest > 0 && heaviest < INK_CEILING) {
        const scale = Math.sqrt(INK_CEILING / heaviest);
        const next = Math.min(cellHeight * 0.95, fontSize * scale);
        if (next > fontSize) {
          fontSize = next;
          coverage = measureGlyphCoverage(
            `${fontSize}px ${face}`,
            cellWidth,
            cellHeight,
            glyphs,
          );
        }
      }

      ramp = glyphs
        .map((glyph, index) => ({ glyph, coverage: coverage[index] ?? 0 }))
        .sort((a, b) => a.coverage - b.coverage);

      if (!buildAtlas(ratio)) return null;

      water = new Water({
        width: columns * cellWidth,
        height: rows * cellHeight,
        cellWidth,
        cellHeight,
        gravity: Math.abs(gravity),
        fillHeight,
        damping,
        maxPasses: pressureIters,
        drive: overRelaxation,
        smoothing: separationIters,
      });

      return water;
    };

    /**
     * Where the water is, and how fast it is moving.
     *
     * The picture is the surface: the top of the water in each column, lit
     * from above, fading with the depth beneath it and brightened by the
     * motion. A still body is a flat line; a sloshing one flickers.
     */
    const toneField = (): Float32Array => {
      const tone = new Float32Array(columns * rows);
      if (!water) return tone;

      for (let column = 0; column < columns; column++) {
        const surfaceY = water.surfaceY(column);
        if (surfaceY >= rows * cellHeight) continue;

        const speed = Math.abs(water.surfaceSpeed(column));
        const stir = Math.min(1, speed / MOTION_REFERENCE);

        for (let row = 0; row < rows; row++) {
          // The depth of the mark under the surface, in cells. It is read
          // from the water's own level rather than from the row the mark is
          // in, so the tone fades smoothly instead of in bands.
          const depth =
            (row + 1) * cellHeight - surfaceY;
          if (depth <= 0) continue;

          const falloff = Math.max(
            BODY_FLOOR,
            Math.exp(-depth / (cellHeight * SURFACE_DEPTH)),
          );
          tone[row * columns + column] = falloff * (0.72 + 0.28 * stir);
        }
      }

      return tone;
    };

    const paint = () => {
      if (!water || !atlas) return;

      const rect = surface.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const ratio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      const pixelWidth = Math.round(rect.width * ratio);
      const pixelHeight = Math.round(rect.height * ratio);
      if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
      if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const blocks = Array.from(
        surface.querySelectorAll<HTMLElement>("[data-screen-reserve]"),
      );
      for (const element of observed) {
        if (!blocks.includes(element)) {
          reserveObserver.unobserve(element);
          observed.delete(element);
        }
      }
      for (const element of blocks) {
        if (!observed.has(element)) {
          reserveObserver.observe(element);
          observed.add(element);
        }
      }

      reserveAge += 1;
      if (reserveAge >= 6) {
        reserveAge = 0;
        reserves = readReserves(surface);
      }

      context.fillStyle = paper;
      context.fillRect(0, 0, rect.width, rect.height);

      const tone = toneField();

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const x = column * cellWidth;
          const y = row * cellHeight;

          // The type knocks a soft hole out of the water, and the water
          // eases back into it over the margin — the print idiom of type
          // reversed out of a screened block. The hole is a *share* of the
          // tone, not a cut-out: the cells just outside the words are the
          // lightest, and the body of the water grows back in around them.
          const keep = screenReserve(
            reserves,
            x + cellWidth / 2,
            y + cellHeight / 2,
          );
          const value = tone[row * columns + column] * keep;
          if (value <= 0.002) continue;

          const index = ditherRamp(
            ramp,
            value * INK_CEILING,
            bayerThreshold(BAYER_8, column, row),
          );
          const glyph = ramp[index];
          if (!glyph || glyph.coverage <= 0) continue;

          const glyphIndex = glyphs.indexOf(glyph.glyph);
          if (glyphIndex < 0) continue;

          const sourceWidth = cellWidth * ratio;
          context.drawImage(
            atlas,
            glyphIndex * sourceWidth,
            0,
            sourceWidth,
            cellHeight * ratio,
            x,
            y,
            cellWidth,
            cellHeight,
          );
        }
      }
    };

    /**
     * The reader's hand, or the water's own stirring.
     *
     * The hand presses the surface where it is and pulls it along when it
     * moves. The water's own stirring is a slow hand that never quite lets
     * go, so the body is never a dead flat line.
     */
    const pointer = (time: number): WaterPointer | null => {
      const rect = surface.getBoundingClientRect();
      const reach = Math.min(rect.width, rect.height) * cursorRadius;

      if (hand.over) {
        // A strike is an event, not a force: the hand is not pressing the
        // surface down at the same time as it is throwing it up.
        const striking = hand.splash > 0;
        const splash = striking ? hand.splash : 0;
        hand.splash = 0;
        return {
          x: hand.x,
          radius: reach,
          force: striking ? 0 : hand.down ? PRESS_DEPTH * 1.6 : PRESS_DEPTH,
          velocity: striking ? 0 : hand.down ? hand.speed * flipRatio : 0,
          splash,
        };
      }

      if (!autoWave) return null;

      // The water's own stirring: a slow hand that drifts along the
      // surface and never quite lets go.
      const sweep = Math.sin(time * 0.32);
      const drift = Math.cos(time * 0.21);
      return {
        x: rect.width * (0.5 + sweep * 0.34),
        radius: reach * 0.8,
        force: cursorForce * 0.55,
        velocity: drift * 40 * speed,
        splash: 0,
      };
    };

    const step = (now: number) => {
      frame = 0;
      if (!visible) return;

      // The tolerance matters: a display's frames are a hair under the
      // period they claim, so an interval of exactly one period throws away
      // every other frame and the screen runs at half the rate it was asked
      // for.
      const interval = (1000 / Math.max(1, maxFPS)) * 0.9;
      if (now - lastStep < interval) {
        schedule();
        return;
      }
      lastStep = now;

      elapsed += (1 / 60) * speed;
      water?.step(1 / 60, pointer(elapsed));
      paint();
      schedule();
    };

    const schedule = () => {
      // Reduced motion gets one still frame and no loop: nothing may put
      // the screen back in motion behind the reader's back.
      if (reduceMotion) return;
      if (frame) return;
      frame = window.requestAnimationFrame(step);
    };

    const observer = new ResizeObserver(() => {
      if (!layout()) return;
      reserveAge = 6;
      paint();
    });
    observer.observe(surface);

    // The ink follows the theme, so a theme switch repaints the screen.
    const themeObserver = new MutationObserver(() => {
      readColours();
      // The ink is baked into the atlas, so the atlas is drawn again.
      buildAtlas(Math.min(2, Math.max(1, window.devicePixelRatio || 1)));
      paint();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // A screen that is off the page has nothing to say, and a water
    // simulation is not cheap enough to run for nobody.
    //
    // The observer is given a negative margin, so the screen stops a little
    // before it leaves the viewport rather than exactly at the edge: a
    // panel whose top sits flush with the viewport's bottom still counts as
    // touching it, and the screen would run on for a whole section.
    let intersection: IntersectionObserver | null = null;
    if (pauseWhenOffscreen && typeof IntersectionObserver !== "undefined") {
      visible = false;
      intersection = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visible = entry.isIntersecting;
            if (visible) schedule();
          }
        },
        { rootMargin: "-80px" },
      );
      intersection.observe(wrapper);
    }

    surface.addEventListener("pointermove", onPointerMove);
    surface.addEventListener("pointerdown", onPointerDown);
    surface.addEventListener("pointerup", onPointerUp);
    surface.addEventListener("pointercancel", onPointerUp);
    surface.addEventListener("pointerleave", onPointerLeave);

    // The water, once the lattice is laid out.
    const body = layout();
    if (!body) return;

    if (reduceMotion) {
      // Reduced motion gets one still frame: the water caught mid-slosh, and
      // no loop to keep it moving.
      for (let i = 0; i < 90; i++) {
        body.step(1 / 60, pointer(i / 60));
      }
      reserveAge = 6;
      paint();
    } else {
      schedule();
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      reserveObserver.disconnect();
      intersection?.disconnect();
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointerup", onPointerUp);
      surface.removeEventListener("pointercancel", onPointerUp);
      surface.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [
    surfaceRef,
    speed,
    cellSize,
    gravity,
    flipRatio,
    pressureIters,
    separationIters,
    overRelaxation,
    fillHeight,
    cursorRadius,
    cursorForce,
    characters,
    color,
    backgroundColor,
    fontFamily,
    autoWave,
    maxFPS,
    pauseWhenOffscreen,
    damping,
    reduceMotion,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={cn("liquid-ascii", className)}
      style={{
        opacity,
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="liquid-ascii__canvas" />
      {children}
    </div>
  );
}
