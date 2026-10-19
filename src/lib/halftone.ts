/**
 * One halftone plate, printed at two screen frequencies.
 *
 * The landing hero and the closing footer are not two decorations that happen
 * to share a colour. They are the same plate seen twice: one continuous-tone
 * picture, resolved by an ordered Bayer threshold, once through a coarse
 * screen of characters and once through a fine screen of dots.
 *
 * A printed sheet has always carried two screens for one image — a coarse
 * one for the picture, a fine one for the type beside it. That is the whole
 * idea here: `AsciiScreen` is the coarse screen, `DitherScreen` is the fine
 * one, and both read the tone field below. Change the field and the whole
 * page moves together.
 *
 * Everything here is deterministic and static. The plate is painted once per
 * resize, so it costs nothing to animate nothing.
 */

/** A fixed threshold pattern. Each cell states the tone the source must
 *  exceed before that cell takes ink. */
export type BayerMatrix = readonly (readonly number[])[];

/**
 * 4×4 Bayer threshold matrix, values 0..15.
 *
 * The classic ordered dither, in the arrangement used by Radium Coders'
 * Evil Buttons `DitherButton` (Apache-2.0, vendored in `furma.bloxs-v2`).
 * House craft, not a tutorial.
 */
export const BAYER_4: BayerMatrix = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

/** 8×8 Bayer threshold matrix, values 0..63. The fine screen's matrix. */
export const BAYER_8: BayerMatrix = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

/**
 * Normalised threshold (0..1) for a cell of the given matrix. The +0.5
 * offset centres each threshold inside its own bucket.
 */
export function bayerThreshold(
  matrix: BayerMatrix,
  x: number,
  y: number,
): number {
  const size = matrix.length;
  const row = matrix[y % size];
  return (row[x % size] + 0.5) / (size * size);
}

/**
 * The coarse screen's density ladder.
 *
 * These are the marks the screen is allowed to print, lightest first. Their
 * ink shares are **measured** from the face in use rather than guessed — a
 * glyph's share of its cell is a property of the typeface, the size and the
 * tracking, and a guessed table puts the ladder out of order (`-` inks less
 * than `.` in JetBrains Mono, and `=` inks twice what a guess says).
 *
 * The ladder is the same job a halftone does with dots of graded diameter,
 * and it is the calibration between the two screens: a coarse screen of
 * characters and a fine screen of dots only carry the same tone if both cover
 * the same share of their cell.
 */
export const ASCII_GLYPHS = [
  " ",
  ".",
  ":",
  "-",
  "=",
  "+",
  "*",
  "#",
  "%",
  "@",
] as const;

/** One step of the density ladder: a mark and the share of its cell it inks. */
export interface RampStep {
  glyph: string;
  coverage: number;
}

/**
 * The share of a cell the plate may ink at its darkest.
 *
 * This is the ceiling for both screens. The character screen reaches it with
 * the ladder's last mark; the dot screen reaches it by inking that share of
 * its cells. Same tone, same weight, two screens.
 *
 * Measured against JetBrains Mono at 11px / 12px line / 2.4px tracking, whose
 * heaviest mark on this ladder inks 0.328 of its cell.
 */
export const PLATE_PEAK = 0.33;

/**
 * Measure what each mark inks of its cell, in the face being used.
 *
 * The measurement is alpha-weighted, so a patterned mark (a light shade)
 * counts the share of its area it actually covers rather than the share of
 * pixels it touches.
 */
export function measureRamp(
  glyphs: readonly string[],
  font: string,
  advance: number,
  lineHeight: number,
): RampStep[] {
  if (typeof document === "undefined") {
    return glyphs.map((glyph) => ({ glyph, coverage: 0 }));
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return glyphs.map((glyph) => ({ glyph, coverage: 0 }));
  }

  const width = Math.max(1, Math.round(advance));
  const height = Math.max(1, Math.round(lineHeight));
  canvas.width = width;
  canvas.height = height;

  const steps: RampStep[] = [];

  for (const glyph of glyphs) {
    context.clearRect(0, 0, width, height);
    context.font = font;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#fff";
    context.fillText(glyph, width / 2, height / 2);

    const pixels = context.getImageData(0, 0, width, height).data;
    let ink = 0;
    for (let i = 3; i < pixels.length; i += 4) ink += pixels[i] / 255;

    steps.push({ glyph, coverage: ink / (width * height) });
  }

  // The ladder only works if it climbs: a mark that inks less than the one
  // before it would print as a step backwards.
  return steps.sort((a, b) => a.coverage - b.coverage);
}

/**
 * Where the plate's mass sits, in normalised panel space.
 *
 * The plate is anchored to the top-right corner of the hero and the footer
 * alike, so the picture reads as continuous down the page: the same form,
 * resolved by a coarse screen at the top of the sheet and a fine one at the
 * bottom.
 */
const PLATE = {
  /** Radius, as a share of the panel's height. */
  r: 0.22,
  /** The clear space the type keeps around itself, in panel pixels. */
  clearance: 36,
};

/**
 * The plate: a continuous tone field, 0 (paper) to 1 (full ink).
 *
 * `u` runs across the panel, `v` down it, both 0..1; `width` and `height` are
 * the panel's size in pixels, so the disc stays round whatever the viewport.
 *
 * The subject is a disc of light with a soft, slightly uneven rim — dense at
 * the core and dissolving at the edge, the way a photograph falls off around
 * a lit form. The rim carries a slow wave so the edge looks drawn rather
 * than computed.
 *
 * The disc sits in the panel's top-right corner. Its size follows the clear
 * band above the first block of type that reaches into that corner: where
 * the panel is roomy the disc is large, and where the type fills the panel
 * it shrinks to a mark rather than disappearing under the words.
 *
 * The same function draws the character screen and the dot screen. Only the
 * resolution and the ink change.
 */
export function plateTone(
  u: number,
  v: number,
  width: number,
  height: number,
  reserves: PlateReserve[] = [],
): number {
  const base = Math.min(PLATE.r * height, PLATE.r * width * 1.25);
  if (base <= 0) return 0;

  // The first type that reaches into the corner decides the clear band.
  const corner = width - base * 0.86;
  const band = reserves.reduce((top, reserve) => {
    const reaches = reserve.x + reserve.width + PLATE.clearance > corner;
    if (!reaches) return top;
    return Math.min(top, Math.max(0, reserve.y - PLATE.clearance));
  }, height);

  const radius = Math.min(base, band / 0.62);
  if (radius <= 0) return 0;

  const centreX = width - radius * 0.86;
  // Where the panel is roomy the disc sits high in the corner; where the
  // type fills it, the disc settles into the clear band and is cropped by
  // the edge of the sheet.
  const centreY =
    radius < base ? band / 2 : radius * 0.84;

  const dx = u * width - centreX;
  const dy = v * height - centreY;
  const distance = Math.hypot(dx, dy) / radius;
  if (distance >= 1) return 0;

  // A slow wave on the radius keeps the rim from reading as a computed arc.
  const angle = Math.atan2(dy, dx);
  const wobble =
    1 +
    0.05 * Math.sin(angle * 3 + 1.2) +
    0.025 * Math.sin(angle * 5 - 0.4);

  return Math.pow(1 - Math.min(1, distance * wobble), 1.7);
}

/**
 * Resolve a coverage to a mark on the ladder, dithering between two
 * neighbouring steps with an ordered threshold so the gradation stays smooth
 * instead of banding into visible steps.
 */
export function asciiCell(
  coverage: number,
  threshold: number,
  ramp: RampStep[],
): string {
  if (ramp.length === 0) return " ";

  let level = 0;
  for (let i = 0; i < ramp.length; i++) {
    if (ramp[i].coverage <= coverage) level = i;
  }

  const next = Math.min(ramp.length - 1, level + 1);
  const low = ramp[level].coverage;
  const high = ramp[next].coverage;
  const span = high - low;
  const blend = span > 0 ? (coverage - low) / span : 0;

  const index = blend > threshold ? next : level;
  return ramp[index].glyph;
}

/**
 * Resolve a coverage to a single inked or bare cell of the fine screen.
 *
 * The threshold is uniform across the matrix, so the share of cells that take
 * ink is the coverage itself — the same share the coarse screen's glyph
 * inks of its own cell.
 */
export function ditherCell(coverage: number, threshold: number): boolean {
  return coverage > threshold;
}

/** A rectangle on the panel that the ink must not touch. */
export interface PlateReserve {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Padding around the block, in panel pixels. */
  margin: number;
}

/**
 * How much ink survives at a point, given the blocks of type on the plate.
 *
 * The type knocks a soft hole out of the ink rather than a hard rectangle —
 * the way type reverses out of a screened block on a printed sheet. The whole
 * of the block is cleared, and the ink eases back over the margin around it,
 * so type always sits on clean ground with the texture flowing back into it.
 */
export function plateReserve(
  reserves: PlateReserve[],
  x: number,
  y: number,
): number {
  if (reserves.length === 0) return 1;

  let keep = 1;

  for (const reserve of reserves) {
    const centreX = reserve.x + reserve.width / 2;
    const centreY = reserve.y + reserve.height / 2;
    if (reserve.margin <= 0) continue;

    // Distance outside the block itself, in margin widths.
    const dx = Math.max(0, Math.abs(x - centreX) - reserve.width / 2);
    const dy = Math.max(0, Math.abs(y - centreY) - reserve.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy) / reserve.margin;
    if (distance >= 1) continue;

    // Clear through the block, easing back to full ink at the margin.
    const edge = distance * distance * (3 - 2 * distance);
    keep = Math.min(keep, edge);
  }

  return keep;
}
