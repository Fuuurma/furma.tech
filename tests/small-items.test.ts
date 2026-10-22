/**
 * Small verified items (FT-DEEP-09).
 *
 * Zero-dependency (node:test). Pins the four mechanical fixes:
 * reduced-motion gate on AnimatedNumber's entrance tween, .gitignore free of
 * merge-conflict markers, /contact redirecting to /#contact, and robots.ts
 * not allowing a nonexistent /og/ route.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("AnimatedNumber skips the entrance tween under reduced motion", () => {
  const src = readFileSync("src/components/motion/AnimatedNumber.tsx", "utf8");
  assert.ok(
    /initial=\{reduceMotion \? false :/.test(src),
    "initial prop must be gated on reduceMotion",
  );
});

test(".gitignore carries no merge-conflict markers", () => {
  const src = readFileSync(".gitignore", "utf8");
  for (const marker of ["<<<<<<<", "=======", ">>>>>>>"]) {
    assert.ok(!src.includes(marker), `.gitignore still contains ${marker}`);
  }
});

test("/contact redirects to the homepage contact section", () => {
  const src = readFileSync("next.config.ts", "utf8");
  assert.match(src, /source:\s*"\/contact",\s*destination:\s*"\/#contact"/);
});

test("robots.ts does not allow the nonexistent /og/ path", () => {
  const src = readFileSync("src/app/robots.ts", "utf8");
  assert.ok(!src.includes("'/og/'"), "robots.ts still allows /og/");
});
