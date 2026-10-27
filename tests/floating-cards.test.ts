/**
 * Five project windows float on the index panel, and they are decoration.
 *
 * The home is a panel tour: a wheel gesture advances a section, and the panel's
 * wave takes the hand. A floating field that listened to either would fight
 * both. These contracts keep it out of the way — the field takes no pointer
 * events, carries no wheel/touch handler, is hidden from assistive tech, and
 * stands still when the reader asked for less motion. The depth mechanic is the
 * one studied in `furma.bloxs` `3d-card`: the pointer's offset from the centre
 * divided by 25px is a degree of tilt.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string): string =>
  readFileSync(new URL(path, import.meta.url), "utf8");

const field = read("../src/components/home/FloatingProjectCards.tsx");
const home = read("../src/components/home/PlasticHome.tsx");
const css = read("../src/app/globals.css");

test("five project windows float in the field", () => {
  const placements = field.match(/\{ x: [\d.]+, y: [\d.]+, depth:/g) ?? [];
  assert.equal(placements.length, 5, "the field starts with five placements");
  assert.match(field, /projects\.slice\(0, PLACEMENTS\.length\)/);
});

test("the field is decoration, never a control", () => {
  assert.match(field, /aria-hidden="true"/);
  assert.match(field, /className="plastic-float-stage"/);
  assert.doesNotMatch(field, /onWheel|onTouchStart|onTouchMove|addEventListener\("wheel"/);
  assert.doesNotMatch(field, /pointerdown/i);
  assert.match(
    css,
    /\.plastic-float-stage \{[\s\S]*?pointer-events: none;/,
    "the stage must not take the wave's hand",
  );
});

test("the cards read from one pointer tilt, in degrees", () => {
  assert.match(field, /const FALLOFF = 25;/);
  assert.match(field, /const TILT = 14;/);
  assert.match(field, /\/ FALLOFF, -TILT, TILT\)/);
  assert.match(field, /useSpring\(x,/);
});

test("the field stands still when asked, and when the panel is away", () => {
  assert.match(field, /const still = reduceMotion \|\| !isActive;/);
  assert.match(field, /animate=\{still \? undefined : \{ y: \[0, -placement\.lift, 0\] \}\}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{\s*\.plastic-float-card \{/);
});

test("the panel mounts the field behind the title", () => {
  const index = home.indexOf("<FloatingProjectCards");
  const heading = home.indexOf('className="plastic-index min-h-full"');
  assert.ok(index > 0, "the field is mounted on the index panel");
  assert.ok(heading > index, "the title comes after the field in the panel");
  assert.match(home, /<FloatingProjectCards\s+projects=\{HOME_PROJECTS\}\s+isActive=\{isActive\}/);
});
