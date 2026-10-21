"use client";

import type { ScreenReserve } from "@/lib/halftone";

/**
 * Read the blocks of type on a panel, so the plate's ink can be kept off
 * them.
 *
 * A block's *text* is what the ink must avoid, not the block's box: a label
 * set in a full-width column still only occupies its own words. So the
 * reserves are read from the text runs themselves.
 *
 * A block marked `data-screen-reserve="block"` is measured by its box
 * instead. That is for type that is revealed by a transform — the words move
 * into place, so their measured position is only right once the reveal has
 * finished, while the block's own box never moves.
 */

/** The clear space the type keeps around itself, in panel pixels. */
export const RESERVE_MARGIN = 72;

function boxesFor(element: HTMLElement): DOMRect[] {
  if (element.dataset.screenReserve === "block") {
    const box = element.getBoundingClientRect();
    return box.width > 0 && box.height > 0 ? [box] : [];
  }

  const range = document.createRange();
  range.selectNodeContents(element);
  const rects = Array.from(range.getClientRects()).filter(
    (rect) => rect.width > 0 && rect.height > 0,
  );

  if (rects.length === 0) {
    const box = element.getBoundingClientRect();
    return box.width > 0 && box.height > 0 ? [box] : [];
  }

  return rects;
}

export function readReserves(surface: HTMLElement): ScreenReserve[] {
  const surfaceRect = surface.getBoundingClientRect();
  const reserves: ScreenReserve[] = [];

  for (const element of surface.querySelectorAll<HTMLElement>(
    "[data-screen-reserve]",
  )) {
    for (const box of boxesFor(element)) {
      reserves.push({
        x: box.left - surfaceRect.left,
        y: box.top - surfaceRect.top,
        width: box.width,
        height: box.height,
        margin: RESERVE_MARGIN,
      });
    }
  }

  return reserves;
}
