/**
 * The type thins the ink; it does not cut a hole in it.
 *
 * Type used to knock a clean rectangle out of the screen, and a clean
 * rectangle reads as a black box: the eye catches the box instead of the
 * words, which is readable and bad design in the same breath. The rule that
 * replaces it has three parts, and each is a behaviour the reader can see:
 *
 * - **Behind the words the ink thins, it does not vanish.** The picture stays
 *   one picture, with a faint stipple showing through the type's own ground.
 * - **Far from the words nothing changes.**
 * - **The thinning eases back with no edge**: as distance from the words
 *   grows, the ink only ever returns — it never steps, and it never dips.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  RESERVE_FLOOR,
  screenReserve,
  type ScreenReserve,
} from "../src/lib/halftone.ts";

const WORDS: ScreenReserve = { x: 400, y: 300, width: 300, height: 40, margin: 72 };

/** The ink kept at a distance `d` px to the right of the words' box. */
function keptAt(d: number): number {
  return screenReserve([WORDS], WORDS.x + WORDS.width + d, WORDS.y + 20);
}

test("behind the words the ink thins to a floor and does not vanish", () => {
  const inside = screenReserve([WORDS], 550, 320);
  assert.ok(inside > 0, "a clean hole is a black box: some ink must remain");
  assert.ok(inside < 0.25, `the ink must thin behind the words (kept ${inside})`);
  assert.equal(inside, RESERVE_FLOOR, "inside the box the ink sits at the floor");
});

test("far from the words the ink is untouched", () => {
  assert.equal(keptAt(WORDS.margin), 1);
  assert.equal(keptAt(WORDS.margin * 3), 1);
  assert.equal(screenReserve([], 10, 10), 1, "no type, no thinning");
});

test("the ink returns smoothly: it only ever rises with distance", () => {
  let previous = keptAt(0);
  let largestStep = 0;
  for (let d = 1; d <= WORDS.margin; d++) {
    const kept = keptAt(d);
    assert.ok(kept >= previous - 1e-9, `the ink dipped at ${d}px (${previous} → ${kept})`);
    largestStep = Math.max(largestStep, kept - previous);
    previous = kept;
  }
  // An edge is a step. Across a 72px margin no single pixel may carry more
  // than a few percent of the return.
  assert.ok(largestStep < 0.05, `the thinning has an edge (a ${largestStep} step)`);
});

test("the thinned ground has round corners", () => {
  // Forty px from the box, straight out from a side and diagonally off a
  // corner. A round halo thins both the same; a boxy one thins the corner
  // more, and the eye catches the corner.
  const side = screenReserve([WORDS], WORDS.x + WORDS.width + 40, WORDS.y + 20);
  const diagonal = 40 / Math.SQRT2;
  const corner = screenReserve(
    [WORDS],
    WORDS.x + WORDS.width + diagonal,
    WORDS.y + WORDS.height + diagonal,
  );
  assert.ok(
    Math.abs(corner - side) < 1e-6,
    `the halo is not round: side ${side}, corner ${corner}`,
  );
});
