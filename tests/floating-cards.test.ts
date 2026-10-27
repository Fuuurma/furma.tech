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

test("every card answers the pointer on its own", () => {
  // One pointer, five springs: the cards must not arrive together.
  assert.match(field, /const stiffness = 34 \+ index \* 9;/);
  assert.match(field, /const damping = 13 \+ index \* 2\.5;/);
  assert.match(field, /const nx = useSpring\(rawX, settle\);/);
  assert.match(field, /const near = useSpring\(rawNear, settle\);/);
  assert.match(field, /const settle = \{ stiffness, damping, mass: 0\.6 \} as const;/);
  assert.doesNotMatch(field, /fieldRotate|plastic-float-field"\s+style=\{\{/);
});

test("the answer falls off with distance, and is felt before it lands", () => {
  assert.match(field, /const falloff = clamp\(1 - distance \/ reach, 0, 1\);/);
  assert.match(field, /return falloff \* falloff;/);
  assert.match(field, /const TILT = 30;/);
  assert.match(field, /const MAGNET = 44;/);
  assert.match(field, /placement\.depth \+ LIFT \* answer/);
  assert.match(field, /clamp\(p \* 1\.6, 0, 1\)/, "the edge lights before the card moves");
});

test("the field stands still when asked, and when the panel is away", () => {
  assert.match(field, /const still = reduceMotion \|\| !isActive;/);
  assert.match(field, /animate=\{still \? undefined : \{ y: \[0, -placement\.lift, 0\] \}\}/);
  assert.match(field, /pointerX\.set\(NO_POINTER\)/, "a still field rests offscreen");
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{\s*\.plastic-float-card \{/);
});

test("the panel mounts the field behind the title", () => {
  const index = home.indexOf("<FloatingProjectCards");
  const heading = home.indexOf('className="plastic-index min-h-full"');
  assert.ok(index > 0, "the field is mounted on the index panel");
  assert.ok(heading > index, "the title comes after the field in the panel");
  assert.match(home, /<FloatingProjectCards\s+projects=\{HOME_PROJECTS\}\s+isActive=\{isActive\}/);
});
