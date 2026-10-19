"use client";

import { useEffect, useRef } from "react";
import {
  BAYER_8,
  bayerThreshold,
  ditherCell,
  plateReserve,
  plateTone,
  type PlateReserve,
} from "@/lib/halftone";
import { readReserves } from "@/lib/screen-reserves";
import { cn } from "@/lib/utils";

interface DitherScreenProps {
  /** The panel the screen is painted into — measured for the grid. */
  surfaceRef: React.RefObject<HTMLElement | null>;
  /** Edge length of one halftone cell, in CSS pixels. */
  cell?: number;
  className?: string;
}

/**
 * The footer's half of the plate: the same picture the hero prints in
 * characters, resolved here on a fine screen of dots.
 *
 * A printed sheet carries two screens for one image — a coarse one for the
 * picture, a fine one for the type beside it. That is the relationship
 * between these two panels. The ink takes the panel's own text colour, so
 * the footer stays strictly black and white in either theme.
 */
export function DitherScreen({
  surfaceRef,
  cell = 4,
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

    const paint = () => {
      const rect = surface.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const columns = Math.max(1, Math.ceil(rect.width / cell));
      const rows = Math.max(1, Math.ceil(rect.height / cell));

      if (canvas.width !== columns) canvas.width = columns;
      if (canvas.height !== rows) canvas.height = rows;
      canvas.style.width = `${columns * cell}px`;
      canvas.style.height = `${rows * cell}px`;

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

      const image = context.createImageData(columns, rows);

      for (let row = 0; row < rows; row++) {
        const v = (row + 0.5) / rows;
        const cy = (row + 0.5) * cell;

        for (let column = 0; column < columns; column++) {
          const u = (column + 0.5) / columns;
          const tone =
            plateTone(u, v, rect.width, rect.height, reserves) *
            plateReserve(reserves, (column + 0.5) * cell, cy);

          if (!ditherCell(tone, bayerThreshold(BAYER_8, column, row))) continue;

          const offset = (row * columns + column) * 4;
          image.data[offset] = ink[0];
          image.data[offset + 1] = ink[1];
          image.data[offset + 2] = ink[2];
          image.data[offset + 3] = 255;
        }
      }

      context.putImageData(image, 0, 0);
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
