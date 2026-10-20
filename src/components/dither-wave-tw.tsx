"use client";

/**
 * Dither Wave — flowing waves, printed as a retro dither.
 *
 * The hero's picture is a wave, and a wave is a picture that moves. This
 * component is the screen that prints it: a lattice of dots whose tone is
 * read off the wave field and whose *area* is the share of its cell the tone
 * asks for, dithered against an ordered threshold so a smooth gradient
 * breaks into the ordered dots of a print rather than banding.
 *
 * The prop names and their meanings follow the React Bits Pro component of the
 * same name, so the licensed file can replace this one without the call site
 * changing. Two house additions are marked below: `surfaceRef` (the panel
 * the ink must keep off the type) and `cell` (the pitch of the screen).
 */

import { useEffect, useRef } from "react";
import {
  BAYER_8,
  INK_CEILING,
  bayerThreshold,
  ditherLevel,
  measureDotRadii,
  screenReserve,
  type ScreenReserve,
} from "@/lib/halftone";
import { sampleField, sampleWaveField } from "@/lib/wave-field";
import { readReserves } from "@/lib/screen-reserves";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface DitherWaveProps {
  /** The width of the screen, in pixels. The panel's own width when omitted. */
  width?: number;
  /** The height of the screen, in pixels. The panel's own height when omitted. */
  height?: number;
  /** How fast the waves travel. */
  speed?: number;
  /** How hard the crests bite. */
  intensity?: number;
  /** How many features the wave carries across the panel. */
  scale?: number;
  /** The resolution the wave is sampled at, as a share of the lattice. */
  downScale?: number;
  /** The colour of the paper. */
  primaryColor?: string;
  /** The colour of the ink in the lower half of the tone range. */
  secondaryColor?: string;
  /** The colour of the ink in the upper half of the tone range. */
  tertiaryColor?: string;
  /** The opacity of the whole screen. */
  opacity?: number;
  /** How much of the wave is computed. */
  quality?: "low" | "medium" | "high";
  /** The most frames a second the screen will draw. */
  maxFPS?: number;
  /** Whether the screen stops while it is off the page. */
  pauseWhenOffscreen?: boolean;
  className?: string;
  children?: React.ReactNode;
  /** House addition: the panel the ink must keep off the type. */
  surfaceRef?: React.RefObject<HTMLElement | null>;
  /** House addition: the pitch of the screen, in CSS pixels. */
  cell?: number;
  /** House addition: whether a swell crosses the screen when the reader is idle. */
  idleCue?: boolean;
  /** House addition: how long the reader must leave the page alone, in ms. */
  idleCueDelay?: number;
}

/** The tone scale of the screen: how many steps of ink it can print. */
const LEVELS = 48;

/** How wide the swell is, as a share of the diagonal. */
const SWELL_WIDTH = 0.17;

/** How much deeper the ink gets as the swell passes. */
const SWELL_GAIN = 0.9;

/** How much of the swell shows in the quiet middle of the page. */
const SWELL_FLOOR = 0.16;

/** How long the swell takes to cross the panel, in milliseconds. */
const SWELL_PERIOD = 4200;

/** How many octaves of noise each quality setting buys. */
const OCTAVES: Record<NonNullable<DitherWaveProps["quality"]>, number> = {
  low: 2,
  medium: 3,
  high: 4,
};

/**
 * Where the light sits.
 *
 * The wave is the subject, but the subject does not fill the panel: the type
 * needs clean ground, and a page of even tone is noise. So the wave is held
 * to two opposite corners — the top right and the bottom left — and falls
 * away from them. The page's composition is light at the ends of the
 * diagonal and quiet through the middle, while the picture inside the light
 * now moves.
 */
function corner(
  u: number,
  v: number,
  width: number,
  height: number,
  radius: number,
): number {
  const dx = (1 - u) * width;
  const dy = v * height;
  const distance = Math.hypot(dx * 0.82, dy) / radius;
  if (distance >= 1) return 0;
  const falloff = 1 - distance;
  return falloff * falloff * (3 - 2 * falloff);
}

/** The light of both corners, held against each other. */
function envelope(
  u: number,
  v: number,
  width: number,
  height: number,
  radius: number,
): number {
  return Math.max(
    corner(u, v, width, height, radius),
    corner(1 - u, 1 - v, width, height, radius),
  );
}

/**
 * The swell.
 *
 * When the reader leaves the hero alone, a swell crosses the panel from the
 * top right to the bottom left: the ink deepens as it passes, and a faint
 * band of it shows in the quiet middle, so the page says out loud that it
 * continues. It is the wave itself doing the talking — there is no label and
 * no rule to read.
 */
function swell(u: number, v: number, position: number): number {
  if (position < 0) return 0;
  const diagonal = ((1 - u) + v) / 2;
  const distance = (diagonal - position) / SWELL_WIDTH;
  return Math.exp(-(distance * distance));
}

export function DitherWave({
  width,
  height,
  speed = 1,
  intensity = 1,
  scale = 6,
  downScale = 0.5,
  primaryColor = "#5227FF",
  secondaryColor = "#5227FF",
  tertiaryColor = "#0a0a0a",
  opacity = 1,
  quality = "medium",
  maxFPS = 60,
  pauseWhenOffscreen = true,
  className,
  children,
  surfaceRef,
  cell = 7,
  idleCue = false,
  idleCueDelay = 5000,
}: DitherWaveProps) {
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

    // The colours are read from the page, not from the props: a prop may
    // name a token, and a token changes with the theme. They are read again
    // whenever the theme changes, so the screen never keeps the palette it
    // was mounted with.
    let paper = resolve(primaryColor);
    let lowerInk = resolve(secondaryColor);
    let upperInk = resolve(tertiaryColor);

    const readColours = () => {
      paper = resolve(primaryColor);
      lowerInk = resolve(secondaryColor);
      upperInk = resolve(tertiaryColor);
    };

    /** The measured radii, and the cell size they were measured for. */
    let radii: number[] = [];
    let radiiCell = 0;

    /** The blocks of type the ink must not touch. */
    const observed = new Set<HTMLElement>();
    const reserveObserver = new ResizeObserver(() => {
      paint(clock);
    });

    /** The wave, sampled on a coarse grid. */
    let field = new Float32Array(0);
    let fieldColumns = 0;
    let fieldRows = 0;

    /** The reserves are read from the live type, so they are read afresh
     *  every few frames — often enough to follow a reveal, seldom enough to
     *  keep the page from laying out on every frame. */
    let reserves: ScreenReserve[] = [];
    let reserveAge = 0;

    let clock = 0;
    let frame = 0;
    let lastDraw = 0;
    let visible = true;

    /**
     * When the reader last touched the page.
     *
     * The swell only crosses the panel when nobody is there to read it, so
     * the screen has to know when the reader walked away.
     */
    let lastTouch = performance.now();
    const noteTouch = () => {
      lastTouch = performance.now();
    };

    /** Where the swell is on the diagonal, or -1 when it is not running. */
    const swellPosition = (): number => {
      if (!idleCue || reduceMotion) return -1;
      const idle = performance.now() - lastTouch;
      if (idle < idleCueDelay) return -1;
      const phase = ((idle - idleCueDelay) % SWELL_PERIOD) / SWELL_PERIOD;
      return -0.2 + phase * 1.4;
    };

    const paint = (time: number) => {
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

      const columns = Math.max(1, Math.ceil(rect.width / cell));
      const rows = Math.max(1, Math.ceil(rect.height / cell));

      // The wave is smooth, so it is sampled on a coarser grid and stretched
      // back over the lattice.
      const sampleColumns = Math.max(2, Math.round(columns * downScale));
      const sampleRows = Math.max(2, Math.round(rows * downScale));
      if (field.length !== sampleColumns * sampleRows) {
        field = new Float32Array(sampleColumns * sampleRows);
      }
      fieldColumns = sampleColumns;
      fieldRows = sampleRows;
      sampleWaveField(field, fieldColumns, fieldRows, time, {
        scale,
        intensity,
        octaves: OCTAVES[quality],
      });

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

      // The radii are measured for the cell as it is printed.
      const cellPixels = cell * ratio;
      if (radiiCell !== cellPixels) {
        radii = measureDotRadii(cellPixels, LEVELS, INK_CEILING);
        radiiCell = cellPixels;
      }

      context.fillStyle = paper;
      context.fillRect(0, 0, rect.width, rect.height);

      // The light is held to the corner; the radius follows the panel so the
      // falloff stays round whatever the viewport measures.
      const radius = Math.max(1, Math.min(rect.height * 0.7, rect.width * 0.5));

      // The dots are gathered by level and printed one pass per level, so
      // the screen costs a few dozen fills rather than one per cell.
      const lower = new Map<number, number[]>();
      const upper = new Map<number, number[]>();

      // The swell: where it is on the diagonal right now, or -1 when the
      // reader is still there and the swell is not needed.
      const swellAt = swellPosition();

      for (let row = 0; row < rows; row++) {
        const v = (row + 0.5) / rows;
        const cy = (row + 0.5) * cell;

        for (let column = 0; column < columns; column++) {
          const u = (column + 0.5) / columns;

          // The two corners print the same wave: the bottom-left lobe is
          // the top-right lobe, mirrored, so the page reads as one plate
          // printed twice.
          const topRight =
            sampleField(field, fieldColumns, fieldRows, u, v) *
            envelope(u, v, rect.width, rect.height, radius);
          const bottomLeft =
            sampleField(field, fieldColumns, fieldRows, 1 - u, 1 - v) *
            envelope(1 - u, 1 - v, rect.width, rect.height, radius);

          const swellAmount = swell(u, v, swellAt);
          const tone =
            (Math.max(topRight, bottomLeft) * (1 + SWELL_GAIN * swellAmount) +
              SWELL_FLOOR * swellAmount) *
            screenReserve(reserves, (column + 0.5) * cell, cy);
          if (tone <= 0.001) continue;

          const level = ditherLevel(
            tone,
            LEVELS,
            bayerThreshold(BAYER_8, column, row),
          );
          if (level <= 0) continue;

          const buckets = tone < 0.5 ? lower : upper;
          const points = buckets.get(level);
          const x = (column + 0.5) * cell;
          const y = (row + 0.5) * cell;
          if (points) points.push(x, y);
          else buckets.set(level, [x, y]);
        }
      }

      const print = (buckets: Map<number, number[]>, ink: string) => {
        context.fillStyle = ink;
        for (const [level, points] of buckets) {
          const dotRadius = radii[level] ?? 0;
          if (dotRadius <= 0) continue;
          context.beginPath();
          for (let i = 0; i < points.length; i += 2) {
            context.moveTo(points[i] + dotRadius, points[i + 1]);
            context.arc(points[i], points[i + 1], dotRadius, 0, Math.PI * 2);
          }
          context.fill();
        }
      };

      print(lower, lowerInk);
      print(upper, upperInk);
    };

    const schedule = () => {
      // Reduced motion gets one still frame and no loop: nothing may put
      // the screen back in motion behind the reader's back.
      if (reduceMotion) return;
      if (frame) return;
      frame = window.requestAnimationFrame(step);
    };

    const step = (now: number) => {
      frame = 0;
      if (!visible) return;

      // The tolerance matters: a display's frames are a hair under the
      // period they claim, so an interval of exactly one period throws away
      // every other frame and the screen runs at half the rate it was asked
      // for.
      const interval = (1000 / Math.max(1, maxFPS)) * 0.9;
      if (now - lastDraw < interval) {
        schedule();
        return;
      }
      lastDraw = now;

      clock = now / 1000;
      paint(clock * speed);
      schedule();
    };

    const observer = new ResizeObserver(() => {
      reserveAge = 6;
      if (reduceMotion) paint(0);
    });
    observer.observe(surface);

    // The ink follows the theme, so a theme switch repaints the screen.
    const themeObserver = new MutationObserver(() => {
      readColours();
      if (reduceMotion) paint(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // A change of device ratio changes the screen's own resolution, so the
    // dots have to be measured and printed again at the new one.
    let resolution = window.matchMedia(
      `(resolution: ${window.devicePixelRatio || 1}dppx)`,
    );
    const onResolution = () => {
      resolution.removeEventListener("change", onResolution);
      resolution = window.matchMedia(
        `(resolution: ${window.devicePixelRatio || 1}dppx)`,
      );
      resolution.addEventListener("change", onResolution);
      radiiCell = 0;
      if (reduceMotion) paint(0);
    };
    resolution.addEventListener("change", onResolution);

    // A screen that is off the page has nothing to say.
    // A screen that is off the page has nothing to say, and a fluid
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

    if (reduceMotion) {
      // Reduced motion gets one still frame: the wave at rest, printed once.
      reserveAge = 6;
      paint(0);
    } else {
      schedule();
    }

    // The swell waits for the reader to leave the page alone, so the screen
    // has to know when they came back.
    if (idleCue) {
      window.addEventListener("pointermove", noteTouch, { passive: true });
      window.addEventListener("pointerdown", noteTouch, { passive: true });
      window.addEventListener("keydown", noteTouch);
      window.addEventListener("wheel", noteTouch, { passive: true });
      window.addEventListener("touchstart", noteTouch, { passive: true });
      window.addEventListener("scroll", noteTouch, { passive: true });
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      reserveObserver.disconnect();
      intersection?.disconnect();
      resolution.removeEventListener("change", onResolution);
      if (idleCue) {
        window.removeEventListener("pointermove", noteTouch);
        window.removeEventListener("pointerdown", noteTouch);
        window.removeEventListener("keydown", noteTouch);
        window.removeEventListener("wheel", noteTouch);
        window.removeEventListener("touchstart", noteTouch);
        window.removeEventListener("scroll", noteTouch);
      }
    };
  }, [
    surfaceRef,
    cell,
    speed,
    intensity,
    scale,
    downScale,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    quality,
    maxFPS,
    pauseWhenOffscreen,
    idleCue,
    idleCueDelay,
    reduceMotion,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={cn("dither-wave", className)}
      style={{
        opacity,
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="dither-wave__canvas" />
      {children}
    </div>
  );
}
