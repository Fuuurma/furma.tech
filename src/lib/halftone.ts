/**
 * One halftone plate, printed at two screen frequencies.
 *
 * The landing hero and the closing footer are not two decorations that happen
 * to share a colour. They are the same plate seen twice: one continuous-tone
 * picture, read by two screens of different fineness.
 *
 * A printed sheet has always carried two screens for one image — a coarse
 * one for the picture, a fine one for the type beside it. That is the whole
 * idea here: `AsciiScreen` is the coarse screen, `DitherScreen` is the fine
 * one, and both read the tone field below. Change the field and the whole
 * page moves together.
 *
 * The two screens share one model, and that is what makes them one style
 * rather than two: **every cell of the picture carries a mark, and the mark
 * is sized by the tone under it.** The coarse screen's mark is a character
 * from a density ladder measured off the face in use; the fine screen's mark
 * is a round dot whose area is the share of its cell the tone asks for. Both
 * are held to the same ceiling, so the same tone prints the same weight of
 * paper in either panel — the hero in characters, the footer in dots.
 *
 * Everything here is deterministic and static. The plate is painted once per
 * resize, so it costs nothing to animate nothing.
 */

/** A fixed threshold pattern. Each cell states the tone the source must
 *  exceed before that cell takes ink. */
export type BayerMatrix = readonly (readonly number[])[];

/** 8×8 Bayer threshold matrix, values 0..63. The coarse screen's matrix. */
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
 * ink shares are **measured** rather than guessed — a glyph's share of its
 * cell is a property of the typeface, the size and the tracking, and a
 * guessed table puts the ladder out of order (`-` inks less than `.` in
 * JetBrains Mono, and `=` inks twice what a guess says).
 *
 * The ladder is the same job a halftone does with dots of graded diameter,
 * and it is the calibration between the two screens: a coarse screen of
 * characters and a fine screen of dots only carry the same tone if both cover
 * the same share of their cell.
 */
export const ASCII_GLYPHS = [
  " ",
  ".",
  "-",
  ":",
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
 * What each mark really inks of its cell, as the browser prints it.
 *
 * These are measured from the *rendered page* — the browser's own text, in
 * the face and the cell the design ships with (JetBrains Mono, 11px on a 12px
 * line, 2.4px of tracking, in a 9 × 12 px cell). They cannot be measured in a
 * canvas: a canvas rasterises the same glyph about a third heavier than the
 * DOM does, so a canvas measurement of `@` reads 0.30 where the page prints
 * 0.22, and a ladder built from it makes the two screens disagree by exactly
 * that much. The numbers here are the page's own.
 *
 * The order is the measured order, not the assumed one: `=` inks *less* than
 * `+`, and `.` inks less than `-`.
 */
export const ASCII_COVERAGE: Readonly<Record<string, number>> = {
  " ": 0,
  ".": 0.0225,
  "-": 0.0286,
  ":": 0.0405,
  "=": 0.0771,
  "+": 0.0805,
  "*": 0.1055,
  "#": 0.1663,
  "%": 0.1811,
  "@": 0.2189,
};

/**
 * The density ladder, lightest mark first.
 *
 * The ladder only works if it climbs: a mark that inks less than the one
 * before it would print as a step backwards.
 */
export const ASCII_RAMP: readonly RampStep[] = ASCII_GLYPHS.map((glyph) => ({
  glyph,
  coverage: ASCII_COVERAGE[glyph] ?? 0,
})).sort((a, b) => a.coverage - b.coverage);

/**
 * The share of a cell the plate may cover at its darkest.
 *
 * This is the ceiling for both screens, and it is the ladder's own top step
 * rather than a number of its own: the character screen reaches it with the
 * ladder's last mark, and the dot screen reaches it with a dot that covers
 * that share of its cell. Same tone, same weight, two screens.
 */
export const PLATE_PEAK = ASCII_RAMP[ASCII_RAMP.length - 1].coverage;

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
export function asciiCell(coverage: number, threshold: number): string {
  if (ASCII_RAMP.length === 0) return " ";

  let level = 0;
  for (let i = 0; i < ASCII_RAMP.length; i++) {
    if (ASCII_RAMP[i].coverage <= coverage) level = i;
  }

  const next = Math.min(ASCII_RAMP.length - 1, level + 1);
  const low = ASCII_RAMP[level].coverage;
  const high = ASCII_RAMP[next].coverage;
  const span = high - low;
  const blend = span > 0 ? (coverage - low) / span : 0;

  const index = blend > threshold ? next : level;
  return ASCII_RAMP[index].glyph;
}

/**
 * The radius of a dot that covers a given share of its cell.
 *
 * The fine screen's mark is a round dot, so the share of the cell it covers
 * is the dot's area over the cell's area, and the radius follows from there.
 * A dot of this radius prints the same weight of paper as the coarse
 * screen's mark of the same coverage — which is the whole calibration
 * between the two screens.
 */
export function dotRadius(share: number, cell: number): number {
  return Math.sqrt((share * cell * cell) / Math.PI);
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
