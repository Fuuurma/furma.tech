/**
 * The glyph atlas is baked at the screen's own resolution, so it has to be
 * baked again when that resolution changes.
 *
 * Browser zoom and a move between displays change `devicePixelRatio`
 * without firing a resize, so the `ResizeObserver` never sees it: the atlas
 * kept the ratio it was mounted with while `paint` cropped it at the live
 * one, and the marks came out misaligned until a layout or a theme change
 * rebuilt it. A `resolution` media query is the listener that catches the
 * change, and it is let go with the effect like every other observer here.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const liquid = readFileSync(
  fileURLToPath(new URL("../src/components/liquid-ascii-tw.tsx", import.meta.url)),
  "utf8",
);

test("the screen watches the device resolution", () => {
  assert.ok(
    liquid.includes("matchMedia(") &&
      liquid.includes("(resolution: ${window.devicePixelRatio || 1}dppx)"),
    "the screen must listen for a devicePixelRatio change",
  );
});

test("a new ratio redraws the atlas at that ratio", () => {
  // The handler ends at the listener's own registration: the first
  // addEventListener is the re-arm inside it, the second is the mount.
  const start = liquid.indexOf("const onResolution");
  const end = liquid.indexOf(
    "resolution.addEventListener",
    liquid.indexOf("resolution.addEventListener") + 1,
  );
  const handler = liquid.slice(start, end);
  assert.ok(
    handler.includes('resolution.removeEventListener("change", onResolution)'),
    "the listener must re-arm at the new ratio",
  );
  assert.ok(
    /buildAtlas\(Math\.min\(2, Math\.max\(1, window\.devicePixelRatio/.test(
      handler,
    ),
    "a new ratio must redraw the atlas, clamped like the paint crop",
  );
  assert.ok(
    handler.includes("paint()"),
    "the redrawn atlas must be printed",
  );
});

test("the resolution listener is cleaned up with the effect", () => {
  const cleanup = liquid.slice(liquid.lastIndexOf("return () =>"));
  assert.ok(
    cleanup.includes('resolution.removeEventListener("change", onResolution)'),
    "the listener must not outlive the effect",
  );
});
