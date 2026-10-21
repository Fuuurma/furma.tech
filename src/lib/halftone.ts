/**
 * The house screen: a lattice, a rule, and a ceiling.
 *
 * A screen is a lattice and a rule. The lattice is where the marks sit; the
 * rule says how much ink a mark carries at a given tone. Everything on this
 * page that prints — the wave in the hero, the water in the footer — is a
 * tone field fed through the same rule, which is what keeps two very
 * different pictures reading as one style.
 *
 * The rule is deliberately about **coverage**: the share of its cell a mark
 * covers. It is not about brightness, because brightness is a property of the
 * ink and the paper, and the paper here is always the page's own.
 *
 * The ceiling is the page's constant. No mark on this page covers more than
 * `INK_CEILING` of its cell, so the coarsest screen and the finest screen
 * print the same weight of paper.
 */

/** A fixed threshold pattern. Each cell states the tone the source must
 *  exceed before that cell takes ink. */
export type BayerMatrix = readonly (readonly number[])[];

/** 8×8 Bayer threshold matrix, values 0..63. The house's ordered dither. */
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
 * The share of a cell a mark may cover at its darkest.
 *
 * This is the page's ink ceiling, and it is a measured number rather than a
 * taste decision. It was read off the rendered page — the browser's own text,
 * in the face and the cell the design ships with — where the heaviest mark
 * covers 21.9% of its cell.
 *
 * Both screens are held to it. The fine screen reaches it with a dot whose
 * area is the share the tone asks for; the coarse screen reaches it with the
 * heaviest character it is allowed to print. Same tone, same weight of
 * paper, two screen frequencies.
 */
export const INK_CEILING = 0.2189;

/**
 * The radius of a dot that covers a given share of its cell.
 *
 * The fine screen's mark is a round dot, so the share of the cell it covers
 * is the dot's area over the cell's area, and the radius follows from there.
 */
export function dotRadius(share: number, cell: number): number {
  return Math.sqrt((share * cell * cell) / Math.PI);
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
 * screen's marks are drawn the same way, so its ladder is measured in the
 * medium that prints it — see `measureGlyphCoverage`.
 */
export function measureDotRadii(
  cellPx: number,
  levels: number,
  ceiling: number = INK_CEILING,
): number[] {
  const radii = new Array<number>(levels + 1).fill(0);
  const size = Math.max(1, Math.ceil(cellPx));

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return radii;

  for (let level = 1; level <= levels; level++) {
    const share = (level / levels) * ceiling;
    let radius = dotRadius(share, size);

    for (let pass = 0; pass < 3; pass++) {
      context.clearRect(0, 0, size, size);
      context.fillStyle = "#fff";
      context.beginPath();
      context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
      context.fill();

      const pixels = context.getImageData(0, 0, size, size).data;
      let ink = 0;
      for (let i = 3; i < pixels.length; i += 4) ink += pixels[i] / 255;
      const realised = ink / (size * size);
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
 * The level a share of ink falls on, dithered against an ordered threshold.
 *
 * The lattice of levels is the tone scale of the screen: level 0 is paper,
 * the top level is the ceiling. A tone that lands between two levels is
 * printed as one or the other, and the ordered threshold decides which —
 * so a smooth gradient breaks into the ordered dots of a dither instead of
 * banding into visible steps.
 */
export function ditherLevel(
  share: number,
  levels: number,
  threshold: number,
): number {
  if (levels <= 0) return 0;
  const exact = Math.min(levels, Math.max(0, share * levels));
  const low = Math.floor(exact);
  const high = Math.min(levels, low + 1);
  return exact - low > threshold ? high : low;
}

/**
 * The share of its cell each glyph inks, measured in the medium that prints
 * it.
 *
 * A glyph's weight is a property of the typeface, the size and the tracking —
 * and of the printer. The same face prints a third heavier in a canvas than
 * it does in the DOM, so a ladder measured in one medium and used in the
 * other prints the wrong weight by exactly that much.
 *
 * The coarse screen paints into a canvas, so it measures itself the way the
 * fine screen measures its own radii: draw each glyph on a cell-sized canvas,
 * read it back, and count the ink. The table that comes back is the face's,
 * as this browser prints it.
 */
export function measureGlyphCoverage(
  font: string,
  cellWidth: number,
  cellHeight: number,
  glyphs: readonly string[],
): number[] {
  const width = Math.max(1, Math.ceil(cellWidth));
  const height = Math.max(1, Math.ceil(cellHeight));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return glyphs.map(() => 0);

  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";

  const coverage: number[] = [];
  for (const glyph of glyphs) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#fff";
    context.fillText(glyph, width / 2, height / 2);
    const pixels = context.getImageData(0, 0, width, height).data;
    let ink = 0;
    for (let i = 3; i < pixels.length; i += 4) ink += pixels[i] / 255;
    coverage.push(ink / (width * height));
  }

  return coverage;
}

/**
 * The step of a ramp a tone falls on, dithered against an ordered threshold.
 *
 * A ramp is an ordered set of marks and the share of a cell each one inks.
 * A tone that lands between two marks is printed as one or the other, and
 * the ordered threshold decides which — so a smooth gradient breaks into the
 * ordered dots of a dither instead of banding into visible steps.
 *
 * The ramp must climb: a mark that inks less than the one before it would
 * print as a step backwards.
 */
export function ditherRamp(
  ramp: readonly { coverage: number }[],
  target: number,
  threshold: number,
): number {
  if (ramp.length === 0) return 0;

  let level = 0;
  for (let index = 0; index < ramp.length; index++) {
    if (ramp[index].coverage <= target) level = index;
  }

  const next = Math.min(ramp.length - 1, level + 1);
  const low = ramp[level].coverage;
  const high = ramp[next].coverage;
  const span = high - low;
  const blend = span > 0 ? (target - low) / span : 0;

  return blend > threshold ? next : level;
}

/** A rectangle on the panel that the ink must not touch. */
export interface ScreenReserve {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Padding around the block, in panel pixels. */
  margin: number;
}

/**
 * The share of its ink the screen keeps behind a word.
 *
 * Type used to knock a clean hole out of the ink, and a clean hole reads as a
 * black box: the eye sees the rectangle, not the words. The ink now thins to a
 * faint stipple behind the type instead of vanishing — enough of the print
 * stays that the picture is one picture, little enough that the words keep
 * their ground.
 */
export const RESERVE_FLOOR = 0.14;

/**
 * How much ink survives at a point, given the blocks of type on the panel.
 *
 * The type thins the ink around it the way a halo does, not the way a
 * rectangle does: behind the words the ink falls to `RESERVE_FLOOR`, and it
 * eases back to full over the margin around them on a smoother-than-smoothstep
 * curve, so there is no edge for the eye to catch. Distance is Euclidean, so
 * the thinned ground has round corners.
 */
export function screenReserve(
  reserves: ScreenReserve[],
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

    // Thin through the block, easing back to full ink at the margin.
    const edge = distance * distance * distance * (distance * (distance * 6 - 15) + 10);
    keep = Math.min(keep, RESERVE_FLOOR + (1 - RESERVE_FLOOR) * edge);
  }

  return keep;
}
