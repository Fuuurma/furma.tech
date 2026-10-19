"use client";

import { useEffect, useRef, useState } from "react";
import {
  BAYER_8,
  PLATE_PEAK,
  asciiCell,
  bayerThreshold,
  plateReserve,
  plateTone,
  type PlateReserve,
} from "@/lib/halftone";
import { readReserves } from "@/lib/screen-reserves";
import { cn } from "@/lib/utils";

interface AsciiScreenProps {
  /** The panel the screen is painted into — measured for the grid. */
  surfaceRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * The hero's half of the plate: the same picture the footer prints in dots,
 * resolved here on a coarse screen of characters.
 *
 * A printed sheet carries two screens for one image — a coarse one for the
 * picture, a fine one for the type beside it. This is the coarse one. The
 * marks come off a density ladder measured from the rendered page, so the
 * field carries tone rather than lettering, and the headline is reserved out
 * of the ink so the type still sits on clean black.
 */
export function AsciiScreen({ surfaceRef, className }: AsciiScreenProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const surface = surfaceRef.current;
    const pre = preRef.current;
    if (!surface || !pre) return;

    let frame = 0;
    let cancelled = false;

    /**
     * The metrics of one cell, in panel pixels.
     *
     * The advance is measured from the DOM rather than from a canvas: the grid
     * is spaced with letter-spacing, and `measureText` on its own does not
     * know about it, so the columns would drift away from the marks.
     */
    const measure = () => {
      const style = window.getComputedStyle(pre);
      const fontSize = Number.parseFloat(style.fontSize);
      const lineHeight = Number.parseFloat(style.lineHeight);
      if (!Number.isFinite(fontSize) || !Number.isFinite(lineHeight)) return;

      const probe = document.createElement("span");
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      probe.style.whiteSpace = "pre";
      probe.style.fontFamily = style.fontFamily;
      probe.style.fontSize = style.fontSize;
      probe.style.fontWeight = style.fontWeight;
      probe.style.letterSpacing = style.letterSpacing;
      probe.textContent = "M".repeat(20);
      pre.appendChild(probe);
      const advance = probe.getBoundingClientRect().width / 20;
      probe.remove();

      if (!(advance > 0)) return;

      return { fontSize, lineHeight, advance };
    };

    const paint = () => {
      frame = 0;
      if (cancelled) return;

      const metrics = measure();
      if (!metrics) return;

      const rect = surface.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width <= 0 || height <= 0) {
        setLines([]);
        return;
      }

      const columns = Math.max(1, Math.floor(width / metrics.advance));
      const rows = Math.max(1, Math.floor(height / metrics.lineHeight));

      const reserves: PlateReserve[] = readReserves(surface);

      const rendered: string[] = [];

      for (let row = 0; row < rows; row++) {
        const v = (row + 0.5) / rows;
        const cy = (row + 0.5) * metrics.lineHeight;
        let line = "";

        for (let column = 0; column < columns; column++) {
          const u = (column + 0.5) / columns;
          const tone =
            plateTone(u, v, width, height, reserves) *
            plateReserve(reserves, (column + 0.5) * metrics.advance, cy);

          line += asciiCell(
            tone * PLATE_PEAK,
            bayerThreshold(BAYER_8, column, row),
          );
        }

        rendered.push(line);
      }

      // Rows that carry no ink are dropped so the plate stays cheap.
      while (rendered.length > 0 && rendered[rendered.length - 1].trim() === "") {
        rendered.pop();
      }

      setLines(rendered);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(surface);

    // The grid is measured against the real face, so it has to be repainted
    // once the webfont has landed — the fallback's advance is not the same.
    const loadFonts = async () => {
      if (typeof document === "undefined" || !document.fonts) return;
      const style = window.getComputedStyle(pre);
      try {
        await document.fonts.load(
          `${Number.parseFloat(style.fontSize)}px ${style.fontFamily}`,
        );
        await document.fonts.ready;
      } catch {
        // A failed font load still leaves a measurable face.
      }
      schedule();
    };

    schedule();
    void loadFonts();

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [surfaceRef]);

  return (
    <pre ref={preRef} aria-hidden="true" className={cn("ascii-screen", className)}>
      {lines.join("\n")}
    </pre>
  );
}
