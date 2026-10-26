/**
 * The plate is the picture's own box.
 *
 * The cover used to give a picture a frame the size of the room it was in, and
 * the picture (a 520:340 drawing) letterboxed inside it: a grey bar down two
 * sides on a desk, a grey slab above and below on a phone. The plate is now
 * sized from the picture's ratio, so the paper is one even margin. That holds
 * only while every picture keeps that ratio, and while every layout the data
 * names has something that renders it.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { HOME_PROJECTS } from "../src/lib/home-projects.ts";

const root = (path: string) => fileURLToPath(new URL(`../${path}`, import.meta.url));
const css = readFileSync(root("src/app/globals.css"), "utf8");
const slide = readFileSync(root("src/components/home/PlasticProjectSlide.tsx"), "utf8");

test("the plate takes the ratio the pictures are drawn at", () => {
  const frame = css.match(/\.plastic-cover__frame\s*\{([^}]*)\}/g)?.join("\n") ?? "";
  assert.match(frame, /aspect-ratio:\s*520\s*\/\s*340/, "the plate must be 520:340");
});

test("every picture is drawn at the plate's ratio", () => {
  const dir = root("src/components/heroes");
  const files = readdirSync(dir).filter((f) => f.endsWith("Hero.tsx"));
  assert.ok(files.length >= HOME_PROJECTS.length, "every project needs a picture");
  for (const file of files) {
    const source = readFileSync(`${dir}/${file}`, "utf8");
    assert.match(
      source,
      /viewBox="0 0 520 340"/,
      `${file} must be drawn at 520:340 or the plate letterboxes it again`,
    );
  }
});

test("every layout the data names has a renderer", () => {
  const renderers = slide.match(/const LAYOUT_RENDERERS[^{]*\{([^}]*)\}/)?.[1] ?? "";
  for (const { id, layout } of HOME_PROJECTS) {
    assert.ok(
      new RegExp(`["']?${layout}["']?\\s*:`).test(renderers),
      `${id} names the layout "${layout}", which has no renderer`,
    );
  }
});

test("no layout sets a title over the picture", () => {
  assert.doesNotMatch(slide, /--overlay|LayoutOverlay/, "the overlay layout is gone");
});

test("a field is never smaller than 16px on a touch screen", () => {
  // Anything smaller makes iOS Safari zoom the page when a field takes focus.
  const touch = css.match(
    /@media \(pointer: coarse\), \(max-width: 900px\)\s*\{\s*\.plastic-field\s*\{([^}]*)\}/,
  );
  assert.ok(touch, "the touch rule for .plastic-field must exist");
  assert.match(touch[1], /font-size:\s*max\(16px/);
});

test("a deep link to #contact is read before the hash is synced", () => {
  // On mount the sync effect sees section 0 and strips "#contact". It has to
  // run after the effect that reads the incoming hash, or /#contact (the
  // site's contact address, and the portfolio's "Get in touch") opens the hero.
  const home = readFileSync(root("src/components/home/PlasticHome.tsx"), "utf8");
  const reads = home.indexOf('if (window.location.hash === "#contact") {\n      preferContactFormFocus');
  const syncs = home.indexOf("syncContactHash(activeIndex)");
  assert.ok(reads > 0 && syncs > 0, "both effects must exist");
  assert.ok(reads < syncs, "the hash must be read before it is synced");
});
