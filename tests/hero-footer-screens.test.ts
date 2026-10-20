/**
 * The hero and the footer are one screen each, and the page is a page.
 *
 * The two screens are the house's print idiom: **one model, two screens.**
 * The hero prints the wave as a fine halftone of dots, the footer prints the
 * body of water as a coarse screen of characters, and both are held to the
 * same ink ceiling, so the page reads as one weight of paper.
 *
 * This file locks the decisions the owner's brief put in place:
 *
 * - The hero carries **no scroll cue** — no label, no rule. The wave itself
 *   says that the page continues: after five seconds of an idle reader a
 *   swell crosses the panel from the top right to the bottom left.
 * - The wave is held to **two opposite corners** and the bottom-left lobe
 *   prints the same wave as the top-right lobe, mirrored. One plate, printed
 *   twice.
 * - The footer's water has **its own band**. The type is set on the clean
 *   paper above it, not reversed out of a screen, and the band is the
 *   reader's to touch: a pointer presses the surface, a drag pulls it, and
 *   a click strikes it.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (path: string): string =>
  readFileSync(fileURLToPath(new URL(path, import.meta.url)), "utf8");

const home = read("../src/components/home/PlasticHome.tsx");
const wave = read("../src/components/dither-wave-tw.tsx");
const liquid = read("../src/components/liquid-ascii-tw.tsx");
const css = read("../src/app/globals.css");

test("the hero carries no scroll cue", () => {
  assert.ok(
    !/plastic-hero-scroll-cue/.test(home),
    "the hero must not carry a scroll cue",
  );
  assert.ok(
    !/plastic-hero-scroll-cue/.test(css),
    "the scroll cue's rule must be gone with it",
  );
  assert.ok(
    !/>\s*Scroll\s*</.test(home),
    "the hero must not carry a scroll label",
  );
});

test("the hero carries no premise copy", () => {
  assert.ok(
    !/Bootstrapped studio building industry SaaS/.test(home),
    "the premise copy must be gone",
  );
  assert.ok(
    !/Aitlas AI ecosystem/.test(home),
    "the premise copy must be gone",
  );
});

test("the wave is held to two opposite corners, one plate printed twice", () => {
  // The bottom-left lobe samples the same field, mirrored.
  assert.ok(
    /sampleField\(\s*field,\s*fieldColumns,\s*fieldRows,\s*1 - u,\s*1 - v\s*\)/.test(
      wave,
    ),
    "the bottom-left lobe must print the wave mirrored",
  );
  assert.ok(
    /corner\(\s*1 - u,\s*1 - v,\s*width,\s*height,\s*radius\s*\)/.test(wave),
    "the light must be held to the bottom-left corner as well",
  );
});

test("the swell waits for an idle reader and honours reduced motion", () => {
  assert.ok(
    /idleCue\??:\s*boolean/.test(wave),
    "the wave must offer the idle cue",
  );
  assert.ok(
    /idleCueDelay\??:\s*number/.test(wave),
    "the wave must offer the delay before the swell crosses",
  );
  assert.ok(
    /if \(!idleCue \|\| reduceMotion\) return -1;/.test(wave),
    "the swell must not run when the reader asked for less motion",
  );
  assert.ok(
    /idleCueDelay=\{5000\}/.test(home),
    "the hero must ask for the swell after five idle seconds",
  );
  assert.ok(
    /idleCue\b/.test(home),
    "the hero must ask for the swell",
  );
});

test("the footer's water has its own band, and the type keeps clean paper", () => {
  // The band is its own element, with the water inside it.
  assert.ok(
    /ref=\{waterRef\}/.test(home),
    "the footer's water must have a band of its own",
  );
  assert.ok(
    /<LiquidAscii[\s\S]{0,200}surfaceRef=\{waterRef\}/.test(home),
    "the water must be printed in the band",
  );

  // The type is above the band, not inside it.
  const band = home.indexOf("ref={waterRef}");
  const type = home.indexOf("We build sovereign digital futures.");
  assert.ok(type > 0 && band > type, "the type must be set above the band");

  // The band is the reader's to touch.
  assert.ok(
    /pointerdown/.test(liquid),
    "the water must answer a click",
  );
  assert.ok(
    /pointermove/.test(liquid),
    "the water must answer the pointer",
  );
  assert.ok(
    /hand\.speed/.test(liquid),
    "the water must be pulled by a drag",
  );
});

test("the water prints in the screen's own tokens, and the solver is the house's", () => {
  assert.ok(
    /color="var\(--screen-ink\)"/.test(home),
    "the water must print in the screen's ink",
  );
  assert.ok(
    /backgroundColor="var\(--screen-paper\)"/.test(home),
    "the water must print on the screen's paper",
  );

  // The particle fluid is gone: it lost 94% of its volume and collapsed.
  assert.ok(
    !existsSync(
      fileURLToPath(new URL("../src/lib/fluid.ts", import.meta.url)),
    ),
    "the particle fluid must be gone",
  );
  assert.ok(
    existsSync(
      fileURLToPath(new URL("../src/lib/water.ts", import.meta.url)),
    ),
    "the shallow water must be here",
  );
});
