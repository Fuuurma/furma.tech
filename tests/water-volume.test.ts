/**
 * The water is a body of water.
 *
 * The footer used to carry a particle fluid that lost **94% of its volume in
 * five seconds** and collapsed into a sliver on the floor: the water in the
 * picture was not the water in the simulation, and the footer read as a
 * smear at the bottom of the page rather than as a body of water.
 *
 * The house solver is now a row of columns of shallow water, and the rule it
 * has to keep is the rule the picture depends on: **the body keeps its
 * volume**. The flow between two columns is one number that leaves one
 * column and enters the next, so the water can slosh, be pressed, be pulled
 * and be struck without ever gaining or losing a drop.
 *
 * A picture of water that slowly drained away would not be a body of water,
 * and a body of water that is not a body of water is a puddle.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { Water } from "../src/lib/water.ts";

const CONFIG = {
  width: 1440,
  height: 240,
  cellWidth: 7.5,
  cellHeight: 16,
  gravity: 1400,
  fillHeight: 0.82,
  damping: 0.7,
};

/** How far the volume may drift, as a share of the body's volume. */
const TOLERANCE = 0.002;

function drift(water: Water, rest: number): number {
  return Math.abs(water.volume() - rest) / rest;
}

test("the water keeps its volume while it rests", () => {
  const water = new Water(CONFIG);
  const rest = water.volume();

  for (let step = 0; step < 600; step++) water.step(1 / 60, null);

  assert.ok(
    drift(water, rest) < TOLERANCE,
    `the body drifted by ${(drift(water, rest) * 100).toFixed(3)}%`,
  );
});

test("the water keeps its volume under a hand", () => {
  const water = new Water(CONFIG);
  const rest = water.volume();

  for (let step = 0; step < 300; step++) {
    water.step(1 / 60, {
      x: 720,
      radius: 120,
      force: 30,
      velocity: 0,
      splash: 0,
    });
  }

  assert.ok(
    drift(water, rest) < TOLERANCE,
    `the body drifted by ${(drift(water, rest) * 100).toFixed(3)}%`,
  );
});

test("the water keeps its volume when it is struck", () => {
  const water = new Water(CONFIG);
  const rest = water.volume();

  water.step(1 / 60, {
    x: 500,
    radius: 120,
    force: 0,
    velocity: 0,
    splash: 66,
  });
  for (let step = 0; step < 300; step++) water.step(1 / 60, null);

  assert.ok(
    drift(water, rest) < TOLERANCE,
    `the body drifted by ${(drift(water, rest) * 100).toFixed(3)}%`,
  );
});

test("the water keeps its volume when it is dragged", () => {
  const water = new Water(CONFIG);
  const rest = water.volume();

  for (let step = 0; step < 120; step++) {
    water.step(1 / 60, {
      x: 300 + step * 8,
      radius: 120,
      force: 26,
      velocity: 480,
      splash: 0,
    });
  }

  assert.ok(
    drift(water, rest) < TOLERANCE,
    `the body drifted by ${(drift(water, rest) * 100).toFixed(3)}%`,
  );
});

test("the surface answers the hand", () => {
  const water = new Water(CONFIG);
  const column = 96;

  const before = water.surfaceY(column);
  for (let step = 0; step < 60; step++) {
    water.step(1 / 60, {
      x: 720,
      radius: 120,
      force: 40,
      velocity: 0,
      splash: 0,
    });
  }
  const pressed = water.surfaceY(column);

  assert.ok(
    pressed > before + 10,
    `the hand did not press the surface down (${before} → ${pressed})`,
  );
});

test("a strike throws the water up", () => {
  const water = new Water(CONFIG);
  const column = 64;

  const before = water.surfaceY(column);
  water.step(1 / 60, {
    x: 480,
    radius: 120,
    force: 0,
    velocity: 0,
    splash: 66,
  });
  const struck = water.surfaceY(column);

  assert.ok(
    struck < before - 20,
    `the strike did not throw the water up (${before} → ${struck})`,
  );
});

test("holding the hand gathers a mound and keeps the volume", () => {
  const water = new Water(CONFIG);
  const rest = water.volume();
  const column = 96;

  // A held hand makes the crest slosh, so the height at one instant depends
  // on phase. The mound is judged by its highest point during the hold.
  const before = water.surfaceY(column);
  let gathered = before;
  for (let step = 0; step < 180; step++) {
    water.step(1 / 60, {
      x: 720,
      radius: 120,
      force: -40,
      velocity: 0,
      splash: 0,
    });
    gathered = Math.min(gathered, water.surfaceY(column));
  }

  assert.ok(
    gathered < before - 15,
    `the hold did not gather a mound (${before} → ${gathered})`,
  );
  assert.ok(
    drift(water, rest) < TOLERANCE,
    `the body drifted by ${(drift(water, rest) * 100).toFixed(3)}%`,
  );
});

test("releasing the hold throws a wave out of the mound and keeps the volume", () => {
  const water = new Water(CONFIG);
  const rest = water.volume();
  const far = 96 + 40;
  const restFar = water.surfaceY(far);

  for (let step = 0; step < 180; step++) {
    water.step(1 / 60, {
      x: 720,
      radius: 120,
      force: -40,
      velocity: 0,
      splash: 0,
    });
  }
  water.step(1 / 60, {
    x: 720,
    radius: 120,
    force: 0,
    velocity: 0,
    splash: 90,
  });

  let travelled = 0;
  for (let step = 0; step < 120; step++) {
    water.step(1 / 60, null);
    travelled = Math.max(travelled, Math.abs(water.surfaceY(far) - restFar));
  }

  assert.ok(
    travelled > 4,
    `the release did not send a wave ${40 * CONFIG.cellWidth}px out (${travelled.toFixed(2)}px)`,
  );
  assert.ok(
    drift(water, rest) < TOLERANCE,
    `the body drifted by ${(drift(water, rest) * 100).toFixed(3)}%`,
  );
});
