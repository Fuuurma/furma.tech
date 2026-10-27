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

test("the field is navigation: five buttons, one per project", () => {
  assert.match(field, /<motion\.button\s+type="button"\s+className="plastic-float-card"\s+onClick=\{\(\) => onOpen\(index\)\}/);
  assert.match(field, /\{String\(index \+ 1\)\.padStart\(2, "0"\)\}/);
  assert.doesNotMatch(field, /className="plastic-float-stage" aria-hidden/);
});

test("a window opens its project, and the keyboard can reach it", () => {
  assert.match(field, /onClick=\{\(\) => onOpen\(index\)\}/);
  assert.match(field, /onFocus=\{\(\) => setFocused\(true\)\}/);
  assert.match(field, /Math\.max\(n, o, focused \? 0\.8 : 0\)/);
  assert.match(field, /className="plastic-float-open"/);
});

test("the title keeps the middle, and one card wins", () => {
  assert.match(field, /const clearance = clamp\(\(fromTitle - 180\) \/ 260, 0\.45, 1\);/);
  assert.match(field, /const answer = placement\.answer \* clearance;/);
  assert.match(field, /const invitation = useTransform\(glow, \[0\.62, 0\.92\], \[0, 1\]\);/);
});

test("something happens before the pointer arrives", () => {
  assert.match(field, /const highlight = useMotionValue\(-1\);/);
  assert.match(field, /\}, 3600\);/);
  assert.match(field, /const offered = useTransform\(highlight, \(value\): number => \(value === index \? 0\.72 : 0\)\);/);
  assert.match(field, /wantsHelp/, "a real pointer takes over from the offer");
});

test("the field takes no gesture from the tour", () => {
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
  assert.match(field, /return falloff \* falloff \* falloff;/, "the nearest window wins clearly");
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
