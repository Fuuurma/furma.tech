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
/* The hand is shared: one engine reads the pointer for both screens. */
const hand = read("../src/lib/ink-field.ts");
const css = read("../src/app/globals.css");
/* The footer is the site's, not the home's: it lives in one component and
   closes every page that ends in water. */
const footer = read("../src/components/studio/StudioWaterFooter.tsx");
const portfolio = read("../src/components/portfolio/PortfolioListView.tsx");

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
  // The light is held by two lobes, one in each corner at rest. That they rest
  // in opposite corners, and that a hand can take them, is tests/lobes.test.ts.
  assert.ok(
    /lobes\?\.topRight/.test(wave) && /lobes\?\.bottomLeft/.test(wave),
    "the light must be held by a top-right and a bottom-left lobe",
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
    /ref=\{waterRef\}/.test(footer),
    "the footer's water must have a band of its own",
  );
  assert.ok(
    /<LiquidAscii[\s\S]{0,200}surfaceRef=\{waterRef\}/.test(footer),
    "the water must be printed in the band",
  );

  // The type is above the band, not inside it.
  const band = footer.indexOf("ref={waterRef}");
  const type = footer.indexOf("We build sovereign digital futures.");
  assert.ok(type > 0 && band > type, "the type must be set above the band");

  // The band is the reader's to touch, through the one hand both screens
  // share: it presses, it pulls, it gathers a mound while held, and it
  // strikes when the hand is let go.
  assert.ok(
    /bindPointer\(surface, inkField\)/.test(liquid),
    "the water must read the pointer through the shared hand",
  );
  assert.ok(
    /pointerdown/.test(hand) && /pointermove/.test(hand),
    "the shared hand must listen for a press and a move",
  );
  assert.ok(
    /hand\.vx/.test(liquid),
    "the water must be pulled by a drag",
  );
  assert.ok(
    /MOUND_DEPTH \* inkField\.charge/.test(liquid),
    "a held hand must gather the water, deeper the longer it is held",
  );
  assert.ok(
    /inkField\.thrown !== strikes/.test(liquid),
    "a released hand must strike the water",
  );
});

test("the water prints in the screen's own tokens, and the solver is the house's", () => {
  assert.ok(
    /color="var\(--screen-ink\)"/.test(footer),
    "the water must print in the screen's ink",
  );
  assert.ok(
    /backgroundColor="var\(--screen-paper\)"/.test(footer),
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

test("the portfolio page closes in the site's footer", () => {
  assert.ok(
    /<StudioWaterFooter/.test(portfolio),
    "the portfolio page must carry the site's footer",
  );
  // One footer for the whole site: the home's closing panel is the same
  // component, not a second copy of the plate.
  assert.ok(
    /<StudioWaterFooter[\s\S]{0,120}variant="panel"/.test(home),
    "the home must close with the same footer, as a panel",
  );
});
