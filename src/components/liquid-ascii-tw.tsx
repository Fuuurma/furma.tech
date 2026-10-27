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
 * - **A hold** gathers the water into a mound under the hand, deeper the
 *   longer the hand rests, and **the release** lets the mound go as a wave.
 * - **A click** is a hold of no length: it strikes the water, and the strike
 *   throws a crown.
 *
 * The hand also writes in characters. What it leaves — a faint wake on hover,
 * a flowing stroke on a drag, a swelling blob on a hold, an abstract form
 * thrown on release — is a tone field like the water's, so it is printed
 * through the same ramp of characters and the same ink ceiling. See
 * `lib/ink-field`.
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
import { InkField, bindPointer } from "@/lib/ink-field";
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
  /**
   * House addition: whether the hand's ink is printed over the water. The
   * water answers the hand either way; this is only the characters it writes.
   */
  ink?: boolean;
  /**
   * House addition: the part of the panel the water stands in. The sea fills
   * this element's box and the rest of the panel is sky, so the type can sit
   * in the sky and the colophon on the sea. Without it the water fills
   * `fillHeight` of the panel, as it always did.
   */
  zoneRef?: React.RefObject<HTMLElement | null>;
  /**
   * House addition: a sun in the sky, and its path on the water. `x` is its
   * place across the panel (0..1), `radius` its size as a share of the
   * panel's height, and `rise` how high its centre stands above the horizon,
   * in radii (negative sinks it). The sun is printed in the same characters
   * as the water; its path on the sea breaks up on the waves.
   */
  sun?: { x: number; radius: number; rise?: number };
  /**
   * How far the sun's light falls away from its disc, and how much haze lies
   * along the horizon. The defaults are the dark plate's; a plate printed on
   * paper wants less of both, because a low tone that reads as light on black
   * reads as dust on white.
   */
  sunHalo?: number;
  sunHaze?: number;
  /**
   * The ink the sky is printed in. Defaults to `color`; a plate on paper needs
   * two: the sun is printed solid and the sea as a wash, because one ink cannot
   * be both a shape and a texture.
   */
  skyInk?: string;

  /**
   * House addition: the night sky. When the page is in its dark theme the
   * plate shows this moon instead of the sun, with a scatter of stars, and
   * the moon's path on the water is narrower and fainter. The plate itself is
   * black in both themes; only what hangs in its sky changes.
   */
  moon?: { x: number; radius: number; rise?: number };
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

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** How much of a cell the face fills. A character with room to breathe. */
const FONT_FILL = 0.78;

/** How deep below its surface the water still shows, in cells. */
const SURFACE_DEPTH = 2.5;

/** The share of a full cell the water must hold to count as its surface. */
const BODY_FLOOR = 0.06;

/** The speed at which the water is fully lit, in px/s. */
const MOTION_REFERENCE = 90;

/** How deep the reader's hand presses the surface, in pixels. */
const PRESS_DEPTH = 30;

/** How high a held hand gathers the water: where it starts, and what a full
 *  charge adds, in pixels. A negative force lifts the surface. */
const MOUND_BASE = 10;
const MOUND_DEPTH = 46;

/** How far a press may travel and still count as a hold, in pixels. */
const HOLD_SLOP = 14;

/** How much of a strike is thrown up, in pixels. */
const SPLASH_DEPTH = 66;

/** How fast the reader's hand may move, in px/s. */
const MAX_HAND_SPEED = 900;


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
  ink: showInk = true,
  zoneRef,
  sun: sunProp,
  sunHalo = 0.42,
  sunHaze = 0.26,
  skyInk = color,

  moon: moonProp,
}: LiquidAsciiProps) {
  // The sun is a small object a caller writes inline; the effect depends on
  // its three numbers, not on the object, so a re-render does not rebuild
  // the water.
  const sunX = sunProp?.x;
  const sunRadius = sunProp?.radius;
  const sunRise = sunProp?.rise ?? 0.15;
  const moonX = moonProp?.x;
  const moonRadius = moonProp?.radius;
  const moonRise = moonProp?.rise ?? 1.5;
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

    const sun =
      sunX !== undefined && sunRadius !== undefined
        ? { x: sunX, radius: sunRadius, rise: sunRise }
        : null;
    const moon =
      moonX !== undefined && moonRadius !== undefined
        ? { x: moonX, radius: moonRadius, rise: moonRise }
        : null;

    /** What hangs in the sky right now: the moon in the dark theme. */
    let skyBody = sun;
    let night = false;

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
    let sky = resolve(skyInk);
    let paper = resolve(backgroundColor);
    const face = resolveFont(fontFamily);

    const readColours = () => {
      ink = resolve(color);
      sky = resolve(skyInk);
      paper = resolve(backgroundColor);
    };
    const glyphs = Array.from(characters.length > 0 ? characters : " ");

    let water: Water | null = null;
    let atlas: HTMLCanvasElement | null = null;
    let skyAtlas: HTMLCanvasElement | null = null;
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

    /**
     * The reader's hand, and the characters it writes. The field keeps the
     * hand's position, speed and charge; the water reads them to press, pull,
     * gather and strike, and the ink is printed over it. Under reduced motion
     * there is no hand at all: the screen is a still frame.
     */
    const hands = !reduceMotion;
    let inkField: InkField | null = null;
    let inkTone = new Float32Array(0);

    /** The sky, printed once per layout, and the line the sea rests on. */
    let skyTone = new Float32Array(0);
    let toneBuffer = new Float32Array(0);
    let horizon = 0;
    let strikes = 0;
    let unbind: (() => void) | null = null;

    /**
     * The atlas: every mark, drawn once, at the screen's own resolution.
     *
     * Drawing the characters into a strip and blitting them is far cheaper
     * than asking the browser to set the same few hundred characters every
     * frame, and it keeps the marks on one lattice.
     */
    const buildAtlas = (ratio: number, paintWith: string = ink): HTMLCanvasElement | null => {
      const atlasCanvas = document.createElement("canvas");
      atlasCanvas.width = Math.ceil(cellWidth * ratio * glyphs.length);
      atlasCanvas.height = Math.ceil(cellHeight * ratio);
      const atlasContext = atlasCanvas.getContext("2d");
      if (!atlasContext) return null;
      atlasContext.font = `${fontSize * ratio}px ${face}`;
      atlasContext.textAlign = "center";
      atlasContext.textBaseline = "middle";
      atlasContext.fillStyle = paintWith;
      glyphs.forEach((glyph, index) => {
        atlasContext.fillText(
          glyph,
          (index + 0.5) * cellWidth * ratio,
          atlasCanvas.height / 2,
        );
      });
      return atlasCanvas;
    };

    /**
     * Lay out the screen: the lattice, the face, and the marks.
     *
     * The marks are measured in the medium that prints them, and the face is
     * sized so that the heaviest mark covers the page's ink ceiling — the
     * same ceiling the hero's dots are held to. Two screens, one weight of
     * paper.
     */
    /**
     * The sky: a sun by day or a moon by night, its halo, and a haze along
     * the horizon, printed as a tone field on the character lattice. It does
     * not move, so it is computed when the panel is laid out (and again when
     * the theme changes) and copied under the water each frame.
     */
    const printSky = () => {
      const size = columns * rows;
      skyTone = new Float32Array(size);
      toneBuffer = new Float32Array(size);
      night = !!moon && document.documentElement.classList.contains("dark");
      skyBody = night ? moon : sun;
      if (!skyBody) return;

      const panelHeight = rows * cellHeight;
      const radius = skyBody.radius * panelHeight;
      const centreX = skyBody.x * columns * cellWidth;
      const centreY = horizon - skyBody.rise * radius;

      for (let row = 0; row < rows; row++) {
        const y = (row + 0.5) * cellHeight;
        if (y >= horizon) break;
        for (let column = 0; column < columns; column++) {
          const x = (column + 0.5) * cellWidth;
          const distance = Math.hypot(x - centreX, y - centreY);
          const index = row * columns + column;

          if (night) {
            // A waxing gibbous: a disc with a second disc laid over its
            // lower left to make the terminator, and soft patches of sea
            // across it so it reads as a surface and not a coin.
            const disc = 1 - smoothstep(radius * 0.94, radius, distance);
            const shadow =
              1 -
              smoothstep(
                radius * 0.9,
                radius * 1.1,
                Math.hypot(x - (centreX - radius * 0.42), y - (centreY + radius * 0.1)),
              );
            const maria =
              0.5 + 0.5 * Math.sin(x * 0.05 + 1.7) * Math.sin(y * 0.075 + 0.4);
            const lit = disc * (1 - 0.9 * shadow) * (0.9 - 0.22 * maria);
            const halo =
              distance > radius
                ? 0.24 * Math.exp(-(((distance - radius) / (radius * 0.65)) ** 2))
                : 0;
            const haze = 0.12 * Math.exp(-(((horizon - y) / (radius * 1.4)) ** 2));

            // Stars: a few single marks, far from the moon and off the haze.
            let star = 0;
            const seed = (((column * 73856093) ^ (row * 19349663)) >>> 0) % 1000;
            if (
              seed < 14 &&
              distance > radius * 2 &&
              y < horizon - cellHeight * 3
            ) {
              // Light marks only: a star is a dot, never a letter.
              star = 0.1 + 0.12 * ((seed % 5) / 5);
            }
            skyTone[index] = Math.max(lit, halo, haze, star);
            continue;
          }

          // The sun: the disc, with a soft rim; the halo falling away from
          // it; and a haze that lies along the horizon and thins upward.
          // A printed sun is a ring: the edge is ink, the middle is paper.
          // The sun is marks: a soft disc of the heaviest characters, the way
          // a screen prints a light source. A line would be a different
          // medium, and this plate is characters.
          const disc = 1 - smoothstep(radius * 0.94, radius, distance);
          const core = 0;
          const halo =
            distance > radius
              ? sunHalo * Math.exp(-(((distance - radius) / (radius * 0.8)) ** 2))
              : 0;
          const haze =
            sunHaze * Math.exp(-(((horizon - y) / (radius * 0.75)) ** 2));
          skyTone[index] = Math.max(disc, core, halo, haze);
        }
      }
    };

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

      atlas = buildAtlas(ratio, ink);
      skyAtlas = buildAtlas(ratio, sky);
      if (!atlas || !skyAtlas) return null;

      if (hands) {
        if (inkField) {
          inkField.resize(rect.width, rect.height);
        } else {
          inkField = new InkField(rect.width, rect.height, {
            cell: cellHeight,
            line: cellHeight * 1.4,
            reach: Math.max(34, Math.min(72, rect.height * 0.3)),
            // The plate is mostly type: a form opens, but not across the words.
            forms: 0.5,
          });
          unbind = bindPointer(surface, inkField);
        }
      }

      // The sea stands in its zone: the water fills the zone's box, and the
      // rest of the panel is sky.
      const panelHeight = rows * cellHeight;
      let share = fillHeight;
      const zone = zoneRef?.current;
      if (zone) {
        const depth = rect.bottom - zone.getBoundingClientRect().top;
        share = Math.max(0.05, Math.min(0.95, depth / panelHeight));
      }
      horizon = panelHeight * (1 - share);
      printSky();

      water = new Water({
        width: columns * cellWidth,
        height: panelHeight,
        cellWidth,
        cellHeight,
        gravity: Math.abs(gravity),
        fillHeight: share,
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
      const tone = toneBuffer;
      tone.set(skyTone);
      if (!water) return tone;

      // The sun's path: a lane on the sea beneath the sun that breaks up on
      // the waves, so the light reads as light on water.
      const laneX = skyBody ? skyBody.x * columns * cellWidth : 0;
      const laneWidth = skyBody ? skyBody.radius * rows * cellHeight * (night ? 0.6 : 0.95) : 1;
      const reach = skyBody ? skyBody.radius * rows * cellHeight * (night ? 2.2 : 1.7) : 1;
      const laneGain = night ? 0.6 : 0.95;

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
          let value = falloff * (0.72 + 0.28 * stir);

          if (skyBody) {
            const across = ((column + 0.5) * cellWidth - laneX) / laneWidth;
            const lane = Math.exp(-across * across);
            if (lane > 0.02) {
              const shimmer =
                0.5 + 0.5 * Math.sin(row * 2.1 + surfaceY * 0.09 + elapsed * 3 + column * 0.31);
              const glint = lane * shimmer * Math.exp(-depth / reach) * laneGain;
              if (glint > value) value = glint;
            }
          }
          tone[row * columns + column] = value;
        }
      }

      return tone;
    };

    const paint = () => {
      if (!water || !atlas || !skyAtlas) return;
      const bodyAtlas = atlas;
      const headAtlas = skyAtlas;

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

      // The hand's ink is a tone field of its own, on the character lattice;
      // where it is, it prints over the water.
      if (showInk && inkField?.active) {
        const size = columns * rows;
        if (inkTone.length < size) inkTone = new Float32Array(size);
        inkField.fillTone(inkTone, columns, rows, cellWidth, cellHeight);
        for (let i = 0; i < size; i++) {
          if (inkTone[i] > tone[i]) tone[i] = inkTone[i];
        }
      }

      // Two inks, two passes: the sky (sun or moon) is printed solid, the sea
      // as a wash. One pass would have to choose one ink for both, and a tone
      // faint enough to be water is too faint to be a sun.
      const paintCells = (skyPass: boolean) => {
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
          const index0 = row * columns + column;
          const value = tone[index0] * keep;
          if (value <= 0.002) continue;

          const inSky =
            skyBody !== null && y + cellHeight <= horizon + cellHeight * 0.5;
          if (inSky !== skyPass) continue;

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
            skyPass ? headAtlas : bodyAtlas,
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

      paintCells(true);
      paintCells(false);

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
      // The hand's reach is the sea's, not the panel's: the water is only as
      // deep as its zone, however tall the sky above it is.
      const seaDepth = Math.max(cellHeight, rows * cellHeight - horizon);
      const reach = Math.min(rect.width, seaDepth) * cursorRadius;
      const hand = inkField?.pointer;

      // A hand in the sky writes in the sky; only a hand at the sea (or just
      // above it, where a crown would reach) moves the water.
      const inWater = !!hand && hand.over && hand.y >= horizon - 80;
      if (inkField && hand && hand.over && !inWater) strikes = inkField.thrown;

      if (inkField && hand && inWater) {
        // A strike is an event, not a force: the hand is not pressing the
        // surface down at the same time as it is throwing it up. How hard it
        // strikes is how long the hand held.
        if (inkField.thrown !== strikes) {
          strikes = inkField.thrown;
          const last = inkField.throws[inkField.throws.length - 1];
          const held = last ? Math.max(0, Math.min(1, (last.life - 1.5) / 1.1)) : 0;
          return {
            x: hand.x,
            radius: reach * (1 + 0.5 * held),
            force: 0,
            velocity: 0,
            splash: SPLASH_DEPTH * (0.55 + 1.0 * held),
          };
        }

        const dragging = hand.down && hand.travelled > HOLD_SLOP;
        if (hand.down && !dragging) {
          // A held hand gathers the water into a mound under it.
          return {
            x: hand.x,
            radius: reach * (1 + 0.6 * inkField.charge),
            force: -(MOUND_BASE + MOUND_DEPTH * inkField.charge),
            velocity: 0,
            splash: 0,
          };
        }

        const speed = Math.max(-MAX_HAND_SPEED, Math.min(MAX_HAND_SPEED, hand.vx));
        return {
          x: hand.x,
          radius: reach,
          force: hand.down ? PRESS_DEPTH * 1.6 : PRESS_DEPTH,
          velocity: hand.down ? speed * flipRatio : 0,
          splash: 0,
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
      const seconds = lastStep > 0 ? Math.min(0.05, (now - lastStep) / 1000) : 1 / 60;
      lastStep = now;

      inkField?.step(seconds);
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
      // The sky follows the theme: the sun by day, the moon by night.
      printSky();
      // The ink is baked into the atlas, so the atlas is drawn again.
      const r = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      atlas = buildAtlas(r, ink);
      skyAtlas = buildAtlas(r, sky);
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
      unbind?.();
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
    showInk,
    zoneRef,
    sunX,
    sunRadius,
    sunRise,
    sunHalo,
    sunHaze,
    skyInk,
    moonX,
    moonRadius,
    moonRise,
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
