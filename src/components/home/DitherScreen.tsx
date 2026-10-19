"use client";

import { useEffect, useRef } from "react";
import {
  PLATE_PEAK,
  dotRadius,
  plateReserve,
  plateTone,
  type PlateReserve,
} from "@/lib/halftone";
import { readReserves } from "@/lib/screen-reserves";
import { cn } from "@/lib/utils";

interface DitherScreenProps {
  /** The panel the screen is painted into — measured for the grid. */
  surfaceRef: React.RefObject<HTMLElement | null>;
  /** The pitch of the screen, in CSS pixels. */
  cell?: number;
  className?: string;
}

/**
 * The radii that lay down a given share of a cell.
 *
 * A dot's *area* is what carries the tone, and a rasterised dot does not
 * cover quite the area its radius asks for — a small circle loses a slice of
 * itself to the pixel grid, so a dot drawn for a fifth of its cell lays down
 * nearer a sixth. The radii are therefore measured, not assumed: each one is
 * drawn on a cell-sized canvas, read back, and corrected until the ink it
 * lays down is the share the tone asked for.
 *
 * This is the one calibration the page can make for itself, because the fine
 * screen paints into a canvas and a canvas can be read back. The coarse
 * screen's marks are the browser's own text, and no canvas can say what the
 * browser will print with them.
 */
function measureRadii(cellPx: number, levels: number): number[] {
  const radii = new Array<number>(levels + 1).fill(0);

  const canvas = document.createElement("canvas");
  canvas.width = cellPx;
  canvas.height = cellPx;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return radii;

  for (let level = 1; level <= levels; level++) {
    const share = level / levels;
    let radius = dotRadius(share, cellPx);

    for (let pass = 0; pass < 3; pass++) {
      context.clearRect(0, 0, cellPx, cellPx);
      context.fillStyle = "#fff";
      context.beginPath();
      context.arc(cellPx / 2, cellPx / 2, radius, 0, Math.PI * 2);
      context.fill();

      const pixels = context.getImageData(0, 0, cellPx, cellPx).data;
      let ink = 0;
      for (let i = 3; i < pixels.length; i += 4) ink += pixels[i] / 255;
      const realised = ink / (cellPx * cellPx);
      if (realised <= 0) break;

      const correction = Math.sqrt(share / realised);
      radius *= correction;
      if (Math.abs(correction - 1) < 0.002) break;
    }

    radii[level] = radius;
  }

  return radii;
}

/**
 * The footer's half of the plate: the same picture the hero prints in
 * characters, resolved here on a fine screen of dots.
 *
 * The two screens share one model, and that is what makes them one style
 * rather than two: every cell of the picture carries a mark, and the mark is
 * sized by the tone under it. Here the mark is a round dot whose area is the
 * share of its cell the tone asks for, so the core of the disc prints the
 * same weight of paper as the core of the character screen — at a finer
 * pitch, the way a printed sheet carries a coarse screen for the picture and
 * a fine one for the type beside it.
 *
 * The screen is printed at the device's own resolution, so a dot can be any
 * size the tone asks for. A threshold dither — a whole cell of ink or none of
 * it — would read as noise beside the hero's smooth ramp; a graded dot reads
 * as tone, which is what the two panels have to agree on.
 *
 * The ink takes the panel's own text colour, so the footer stays strictly
 * black and white in either theme.
 */
export function DitherScreen({
  surfaceRef,
  cell = 6,
  className,
}: DitherScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    const canvas = canvasRef.current;
    if (!surface || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    /** Resolve any CSS colour into bytes by letting the canvas parse it. */
    const resolveInk = (color: string): [number, number, number] => {
      const probe = document.createElement("canvas");
      probe.width = 1;
      probe.height = 1;
      const probeContext = probe.getContext("2d", { willReadFrequently: true });
      if (!probeContext) return [255, 255, 255];
      probeContext.fillStyle = color;
      probeContext.fillRect(0, 0, 1, 1);
      const data = probeContext.getImageData(0, 0, 1, 1).data;
      return [data[0], data[1], data[2]];
    };

    /** The blocks of type the ink must not touch. */
    const observed = new Set<HTMLElement>();
    const reserveObserver = new ResizeObserver(() => {
      paint();
    });

    /** The measured radii, and the cell size they were measured for. */
    let radii: number[] = [];
    let radiiCell = 0;

    const paint = () => {
      const rect = surface.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      // The screen is printed at the device's own resolution, so a dot can be
      // graded to the tone instead of snapping to a whole cell.
      const ratio = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      const columns = Math.max(1, Math.ceil(rect.width / cell));
      const rows = Math.max(1, Math.ceil(rect.height / cell));

      const width = Math.round(rect.width * ratio);
      const height = Math.round(rect.height * ratio);
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ink = resolveInk(
        window.getComputedStyle(surface).color || "#ffffff",
      );

      const blocks = Array.from(
        surface.querySelectorAll<HTMLElement>("[data-screen-reserve]"),
      );

      // Keep the reserve observer in step with the blocks on the panel.
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

      const reserves: PlateReserve[] = readReserves(surface);

      context.clearRect(0, 0, width, height);
      context.fillStyle = `rgb(${ink[0]}, ${ink[1]}, ${ink[2]})`;

      // The cell, in device pixels.
      const cellPx = cell * ratio;

      // Dots are gathered by radius and printed one pass per radius, so the
      // screen costs a few dozen fills rather than one per cell.
      const STEPS = 48;
      if (radiiCell !== cellPx) {
        radii = measureRadii(cellPx, STEPS);
        radiiCell = cellPx;
      }
      const buckets = new Map<number, number[]>();

      for (let row = 0; row < rows; row++) {
        const v = (row + 0.5) / rows;
        const cy = (row + 0.5) * cell;

        for (let column = 0; column < columns; column++) {
          const u = (column + 0.5) / columns;
          const tone =
            plateTone(u, v, rect.width, rect.height, reserves) *
            plateReserve(reserves, (column + 0.5) * cell, cy);
          if (tone <= 0) continue;

          const share = tone * PLATE_PEAK;
          const step = Math.max(1, Math.round(share * STEPS));
          const points = buckets.get(step);
          const x = (column + 0.5) * cellPx;
          const y = (row + 0.5) * cellPx;
          if (points) points.push(x, y);
          else buckets.set(step, [x, y]);
        }
      }

      for (const [step, points] of buckets) {
        const radius = radii[step] ?? 0;
        if (radius <= 0) continue;
        context.beginPath();
        for (let i = 0; i < points.length; i += 2) {
          context.moveTo(points[i] + radius, points[i + 1]);
          context.arc(points[i], points[i + 1], radius, 0, Math.PI * 2);
        }
        context.fill();
      }
    };

    paint();

    const observer = new ResizeObserver(paint);
    observer.observe(surface);

    // The ink follows the theme, so a theme switch repaints the screen.
    const themeObserver = new MutationObserver(paint);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // A change of device ratio changes the screen's own resolution, so the
    // plate has to be printed again at the new one.
    let resolution = window.matchMedia(
      `(resolution: ${window.devicePixelRatio || 1}dppx)`,
    );
    const onResolution = () => {
      resolution.removeEventListener("change", onResolution);
      resolution = window.matchMedia(
        `(resolution: ${window.devicePixelRatio || 1}dppx)`,
      );
      resolution.addEventListener("change", onResolution);
      paint();
    };
    resolution.addEventListener("change", onResolution);

    // The blocks of type are measured against the real faces, so the screen
    // has to be repainted once the webfonts have landed.
    const loadFonts = async () => {
      if (typeof document === "undefined" || !document.fonts) return;
      try {
        await document.fonts.ready;
      } catch {
        // A failed font load still leaves a measurable face.
      }
      paint();
    };

    void loadFonts();

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
      reserveObserver.disconnect();
      resolution.removeEventListener("change", onResolution);
    };
  }, [surfaceRef, cell]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("dither-screen", className)}
    />
  );
}
