/**
 * The wave field is read back at arbitrary points, bilinearly.
 *
 * `sampleField` stretches the coarse grid the wave was sampled on over the
 * whole panel, so what it has to keep is a handful of promises:
 *
 * - **A field with no columns or no rows answers zero**, whatever the point.
 * - **The corners are exact**: u = v = 0 and u = v = 1 return the corner
 *   samples themselves, not an interpolation near them.
 * - **Between the corners it interpolates**, so the printed wave is smooth.
 * - **A point outside the panel reads the edge it ran off** — clamped into
 *   the field, never an index that is not there and never a NaN.
 * - **The read is deterministic**: the same field and point give the same
 *   tone every time.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { sampleField, sampleWaveField } from "../src/lib/wave-field.ts";

test("a field with no columns or no rows answers zero", () => {
  const field = new Float32Array([0.2, 0.4, 0.6, 0.8]);
  assert.equal(sampleField(field, 0, 2, 0.5, 0.5), 0);
  assert.equal(sampleField(field, 2, 0, 0.5, 0.5), 0);
  assert.equal(sampleField(field, -3, 2, 0.25, 0.75), 0);
  assert.equal(sampleField(field, 2, -3, 0.25, 0.75), 0);
});

test("the corners of the field are read exactly", () => {
  // A 2×2 field whose four cells are all different: TL, TR, BL, BR.
  const field = new Float32Array([0.1, 0.4, 0.6, 0.9]);
  assert.equal(sampleField(field, 2, 2, 0, 0), field[0]);
  assert.equal(sampleField(field, 2, 2, 1, 0), field[1]);
  assert.equal(sampleField(field, 2, 2, 0, 1), field[2]);
  assert.equal(sampleField(field, 2, 2, 1, 1), field[3]);
});

test("between the corners the field interpolates", () => {
  // TL = 0, TR = 1, BL = 2, BR = 3.
  const field = new Float32Array([0, 1, 2, 3]);
  assert.equal(sampleField(field, 2, 2, 0.5, 0), 0.5);
  assert.equal(sampleField(field, 2, 2, 0, 0.5), 1);
  assert.equal(sampleField(field, 2, 2, 0.5, 0.5), 1.5);
});

test("a point outside the panel reads the edge it ran off", () => {
  const field = new Float32Array([0.1, 0.4, 0.6, 0.9]);
  assert.equal(sampleField(field, 2, 2, -0.5, 0.5), sampleField(field, 2, 2, 0, 0.5));
  assert.equal(sampleField(field, 2, 2, 1.5, 0.5), sampleField(field, 2, 2, 1, 0.5));
  assert.equal(sampleField(field, 2, 2, 0.5, -0.5), sampleField(field, 2, 2, 0.5, 0));
  assert.equal(sampleField(field, 2, 2, 0.5, 1.5), sampleField(field, 2, 2, 0.5, 1));
});

test("no point on or off the panel reads NaN", () => {
  const field = new Float32Array(16).map((_, i) => i / 15);
  for (const u of [-2, -0.5, 0, 0.3, 0.7, 1, 1.5, 2]) {
    for (const v of [-2, -0.5, 0, 0.3, 0.7, 1, 1.5, 2]) {
      const tone = sampleField(field, 4, 4, u, v);
      assert.ok(Number.isFinite(tone), `u=${u} v=${v} gave ${tone}`);
    }
  }
});

test("the read is deterministic: the same field and point give the same tone", () => {
  const field = new Float32Array(25).map((_, i) => ((i * 37) % 25) / 25);
  const first = sampleField(field, 5, 5, 0.37, 0.71);
  for (let i = 0; i < 8; i++) {
    assert.equal(sampleField(field, 5, 5, 0.37, 0.71), first);
  }
});

test("the wave itself is deterministic: the same time gives the same field", () => {
  const columns = 8;
  const rows = 6;
  const options = { scale: 4, intensity: 1, octaves: 3 };
  const a = new Float32Array(columns * rows);
  const b = new Float32Array(columns * rows);
  sampleWaveField(a, columns, rows, 12.5, options);
  sampleWaveField(b, columns, rows, 12.5, options);
  assert.deepEqual(a, b);
});
