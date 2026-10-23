/**
 * The reader's hand writes into the screen, and the screen lets it go.
 *
 * The hero and the footer print a tone field as marks, and the reader can now
 * write into that field: hover, drag, hold, and release. The field the hand
 * writes into is `InkField`, and what it has to keep is a handful of promises
 * about *behaviour* — not about how it is built:
 *
 * - **A drag paints and a hover only whispers**, and both go: nothing the
 *   hand writes stays on the screen for good.
 * - **A click throws a form that opens outward and fades**, a hold throws a
 *   larger one, and a drag throws none.
 * - **The repertoire is the same every time**: the screen has no randomness.
 * - **The push the hand puts into the picture relaxes back to nothing.**
 * - **The tone is a tone**: it never leaves 0..1, and it never lands where
 *   nothing was drawn.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { FORMS, InkField, formDistance } from "../src/lib/ink-field.ts";

const W = 1200;
const H = 700;
const LATTICE = 7;
const COLUMNS = Math.ceil(W / LATTICE);
const ROWS = Math.ceil(H / LATTICE);

function field(): InkField {
  return new InkField(W, H, { cell: 12 });
}

/** Run the field for a number of seconds at 60 fps. */
function run(ink: InkField, seconds: number): void {
  for (let i = 0; i < Math.round(seconds * 60); i++) ink.step(1 / 60);
}

/** Draw a horizontal stroke across the middle, with the button held or not. */
function stroke(ink: InkField, down: boolean): void {
  ink.move(200, 350, 0);
  if (down) ink.press(200, 350);
  for (let x = 200; x <= 1000; x += 20) {
    ink.move(x, 350, 1 / 60);
    ink.step(1 / 60);
  }
}

function tone(ink: InkField): Float32Array {
  const out = new Float32Array(COLUMNS * ROWS);
  ink.fillTone(out, COLUMNS, ROWS, LATTICE);
  return out;
}

function peak(values: Float32Array): number {
  let max = 0;
  for (const value of values) if (value > max) max = value;
  return max;
}

/** The distance from a point to the farthest cell that carries real ink. */
function reachOf(values: Float32Array, x: number, y: number): number {
  let farthest = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      if (values[r * COLUMNS + c] < 0.12) continue;
      const d = Math.hypot((c + 0.5) * LATTICE - x, (r + 0.5) * LATTICE - y);
      if (d > farthest) farthest = d;
    }
  }
  return farthest;
}

test("a drag paints, a hover only whispers, and both go", () => {
  const hover = field();
  stroke(hover, false);
  const whisper = peak(tone(hover));

  const drag = field();
  stroke(drag, true);
  drag.release();
  const paint = peak(tone(drag));

  assert.ok(paint > 0.5, `a drag should leave real ink, got ${paint}`);
  assert.ok(
    whisper < paint * 0.7,
    `a hover (${whisper}) should be quieter than a drag (${paint})`,
  );

  drag.leave();
  hover.leave();
  run(drag, 9);
  run(hover, 9);
  assert.equal(peak(tone(drag)), 0, "the dragged ink must fade out entirely");
  assert.equal(peak(tone(hover)), 0, "the hover's wake must fade out entirely");
});

test("a click throws a form that opens outward and fades", () => {
  const ink = field();
  ink.move(600, 350, 0);
  ink.press(600, 350);
  ink.release();
  assert.equal(ink.throws.length, 1, "a click throws one form");

  run(ink, 0.15);
  const early = reachOf(tone(ink), 600, 350);
  run(ink, 0.3);
  const late = reachOf(tone(ink), 600, 350);
  assert.ok(late > early, `the form must open outward (${early} → ${late})`);

  ink.leave();
  run(ink, 4);
  assert.equal(ink.throws.length, 0, "the form must leave the field");
  assert.equal(peak(tone(ink)), 0, "and leave no ink behind");
});

test("a hold throws a larger form than a click, and a drag throws none", () => {
  const click = field();
  click.move(600, 350, 0);
  click.press(600, 350);
  click.release();
  run(click, 0.4);

  const hold = field();
  hold.move(600, 350, 0);
  hold.press(600, 350);
  run(hold, 1.4);
  assert.ok(hold.charge > 0.9, `a held hand charges (${hold.charge})`);
  hold.release();
  run(hold, 0.4);

  assert.ok(
    reachOf(tone(hold), 600, 350) > reachOf(tone(click), 600, 350) * 1.3,
    "a full hold must throw a clearly larger form than a click",
  );

  const drag = field();
  stroke(drag, true);
  drag.release();
  assert.equal(drag.throws.length, 0, "a drag already made its mark");
});

test("the repertoire is the same every time", () => {
  const kinds = (): string[] => {
    const ink = field();
    const seen: string[] = [];
    for (let i = 0; i < FORMS.length * 2; i++) {
      ink.strike(300 + i * 40, 300, 0.2);
      seen.push(ink.throws[ink.throws.length - 1].kind);
    }
    return seen;
  };

  const first = kinds();
  assert.deepEqual(first, kinds(), "no randomness: same hand, same forms");
  assert.equal(new Set(first).size, FORMS.length, "every form is thrown");
});

test("every form has an inside and an outside", () => {
  for (const kind of FORMS) {
    assert.ok(formDistance(kind, 0, 0) < 0, `${kind}: the centre is inside`);
    assert.ok(formDistance(kind, 3, 3) > 0, `${kind}: far away is outside`);
  }
});

test("the push the hand puts into the picture relaxes back to nothing", () => {
  const ink = field();
  stroke(ink, true);
  ink.release();

  let pushed = 0;
  for (const value of ink.ox) pushed = Math.max(pushed, Math.abs(value));
  assert.ok(pushed > 4, `a drag must push the picture (${pushed}px)`);

  ink.leave();
  run(ink, 9);
  let left = 0;
  for (const value of ink.ox) left = Math.max(left, Math.abs(value));
  for (const value of ink.oy) left = Math.max(left, Math.abs(value));
  assert.ok(left < 0.5, `the picture must settle back (${left}px left)`);
});

test("the tone is a tone: bounded, and only where something was drawn", () => {
  const ink = field();
  ink.move(100, 100, 0);
  ink.press(100, 100);
  run(ink, 1.5);
  ink.strike(900, 500, 1);
  run(ink, 0.2);

  const values = tone(ink);
  for (const value of values) {
    assert.ok(value >= 0 && value <= 1, `tone out of range: ${value}`);
  }
  assert.ok(peak(values) > 0.5, "something was drawn");

  // The far corner is more than any form's reach from either point.
  const corner = values[(ROWS - 1) * COLUMNS + (COLUMNS - 1)];
  assert.equal(corner, 0, "ink must not land where nothing was drawn");
});

test("a resize forgets the ink, because the page changed shape", () => {
  const ink = field();
  stroke(ink, true);
  assert.ok(ink.dyeMax > 0.2);
  ink.resize(W / 2, H / 2);
  assert.equal(ink.dyeMax, 0);
  assert.equal(peak(ink.dye), 0);
});
