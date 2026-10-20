/**
 * The lobes are the two lights the hero's wave is printed from.
 *
 * The reader can lean them, grab them, and let them go. What the lobes have
 * to keep is a handful of promises about *behaviour*:
 *
 * - **At rest they sit in opposite corners**, and a resize puts them back.
 * - **A held hand pulls a grabbed lobe after it**, and the lobe stays on the
 *   panel however far the hand is pushed.
 * - **Released, a lobe settles home** well inside the time a reader would
 *   wait, and it does not overshoot the corner.
 * - **The model is deterministic**: the same hand gives the same lobes.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { Lobes } from "../src/lib/lobes.ts";

const W = 1440;
const H = 900;
const FRAME = 1 / 60;

function run(lobes: Lobes, seconds: number, hand: Parameters<Lobes["step"]>[1]): void {
  for (let t = 0; t < seconds; t += FRAME) lobes.step(FRAME, hand);
}

function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by);
}

test("at rest the lobes sit in opposite corners", () => {
  const lobes = new Lobes(W, H);
  assert.ok(distance(lobes.topRight.x, lobes.topRight.y, W, 0) < 1e-6);
  assert.ok(distance(lobes.bottomLeft.x, lobes.bottomLeft.y, 0, H) < 1e-6);
});

test("a resize puts the lobes back in the new corners", () => {
  const lobes = new Lobes(W, H);
  run(lobes, 1, { x: 300, y: 300, over: true, down: true });
  lobes.resize(800, 500);
  assert.ok(distance(lobes.topRight.x, lobes.topRight.y, 800, 0) < 1e-6);
  assert.ok(distance(lobes.bottomLeft.x, lobes.bottomLeft.y, 0, 500) < 1e-6);
});

test("a click does not yank a lobe: a press must move before it takes one", () => {
  const lobes = new Lobes(W, H);
  const click = { x: W - 120, y: 90, over: true, down: true, travelled: 0 };
  lobes.step(FRAME, click);
  run(lobes, 1, click);
  const d = distance(lobes.topRight.x, lobes.topRight.y, W, 0);
  assert.ok(d < 40, `a still press leaves the lobe at its corner (${d.toFixed(0)} px off)`);
});

test("a strike knocks a lobe away from the point, and it comes home", () => {
  const lobes = new Lobes(W, H);
  lobes.kick(W - 200, 150);
  run(lobes, 0.35, null);
  const knocked = distance(lobes.topRight.x, lobes.topRight.y, W, 0);
  assert.ok(knocked > 20, `the lobe is knocked off its corner (${knocked.toFixed(0)} px)`);
  run(lobes, 6, null);
  assert.ok(distance(lobes.topRight.x, lobes.topRight.y, W, 0) < 0.5, "and settles home");
});

test("a lobe let go overshoots its corner on the way home", () => {
  const lobes = new Lobes(W, H);
  lobes.step(FRAME, { x: W - 4, y: 4, over: true, down: true, travelled: 50 });
  run(lobes, 1.2, { x: 300, y: 500, over: true, down: true, travelled: 900 });
  let farthestBeyond = 0;
  for (let t = 0; t < 4; t += FRAME) {
    lobes.step(FRAME, null);
    farthestBeyond = Math.max(farthestBeyond, lobes.topRight.x - W, -lobes.topRight.y);
  }
  assert.ok(farthestBeyond > 4, `the lobe swings past its corner (${farthestBeyond.toFixed(1)} px)`);
});

test("a hover leans a lobe toward the hand without taking it", () => {
  const lobes = new Lobes(W, H);
  const hand = { x: 700, y: 400, over: true, down: false };
  const before = distance(lobes.topRight.x, lobes.topRight.y, hand.x, hand.y);
  run(lobes, 2, hand);
  const after = distance(lobes.topRight.x, lobes.topRight.y, hand.x, hand.y);
  assert.ok(after < before, "the lobe leans toward the hand");
  assert.ok(after > before * 0.5, "a hover does not take the lobe");
});

test("a press on a lobe grabs it, and the lobe follows the hand", () => {
  const lobes = new Lobes(W, H);
  const target = { x: 900, y: 300 };
  // Press on the top-right lobe, then drag the hand across the panel.
  lobes.step(FRAME, { x: W - 4, y: 4, over: true, down: true });
  run(lobes, 2, { x: target.x, y: target.y, over: true, down: true });
  const d = distance(lobes.topRight.x, lobes.topRight.y, target.x, target.y);
  assert.ok(d < 5, `the grabbed lobe follows the hand (${d.toFixed(1)} px away)`);
});

test("a press away from both lobes grabs nothing", () => {
  const lobes = new Lobes(W, H);
  const hand = { x: W / 2, y: H / 2, over: true, down: true };
  run(lobes, 2, hand);
  const d = distance(lobes.topRight.x, lobes.topRight.y, hand.x, hand.y);
  assert.ok(d > 300, `a press in the middle does not carry a lobe to the hand (${d.toFixed(0)} px away)`);
});

test("a grabbed lobe never leaves the panel", () => {
  const lobes = new Lobes(W, H);
  lobes.step(FRAME, { x: W - 4, y: 4, over: true, down: true });
  const far = { x: W * 4, y: -H * 3, over: true, down: true };
  // A lobe may swing a little past its corner on the way home, never far.
  for (let t = 0; t < 3; t += FRAME) {
    lobes.step(FRAME, far);
    assert.ok(lobes.topRight.x >= -W * 0.15 && lobes.topRight.x <= W * 1.15, "x stays near the panel");
    assert.ok(lobes.topRight.y >= -H * 0.15 && lobes.topRight.y <= H * 1.15, "y stays near the panel");
  }
});

test("released, a lobe settles home within six seconds and stays there", () => {
  const lobes = new Lobes(W, H);
  lobes.step(FRAME, { x: W - 4, y: 4, over: true, down: true });
  run(lobes, 1.5, { x: 200, y: 600, over: true, down: true });

  // Settled means: from this moment on, the lobe never leaves 0.5 px of home.
  let t = 0;
  let lastAway = 0;
  while (t < 8) {
    lobes.step(FRAME, null);
    t += FRAME;
    if (distance(lobes.topRight.x, lobes.topRight.y, W, 0) >= 0.5) lastAway = t;
  }
  assert.ok(lastAway <= 6, `the lobe is home and still within six seconds (last away at ${lastAway.toFixed(2)} s)`);
});

test("the model is deterministic: the same hand gives the same lobes", () => {
  const script = [
    { x: 1400, y: 10, over: true, down: true },
    { x: 1100, y: 200, over: true, down: true },
    { x: 500, y: 700, over: true, down: false },
  ];
  const trace = (): number[] => {
    const lobes = new Lobes(W, H);
    const out: number[] = [];
    for (const hand of script) {
      run(lobes, 0.5, hand);
      out.push(lobes.topRight.x, lobes.topRight.y, lobes.bottomLeft.x, lobes.bottomLeft.y);
    }
    return out;
  };
  assert.deepEqual(trace(), trace());
});

test("a long stalled frame cannot fling a lobe off the panel", () => {
  const lobes = new Lobes(W, H);
  lobes.step(FRAME, { x: W - 4, y: 4, over: true, down: true });
  lobes.step(FRAME, { x: 100, y: 100, over: true, down: true });
  lobes.step(30, { x: 100, y: 100, over: true, down: true });
  assert.ok(lobes.topRight.x >= 0 && lobes.topRight.x <= W);
  assert.ok(lobes.topRight.y >= 0 && lobes.topRight.y <= H);
  assert.ok(Number.isFinite(lobes.topRight.x) && Number.isFinite(lobes.topRight.y));
});
