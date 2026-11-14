/**
 * The component-reference grid prints a label only when its metadata
 * array actually has entries.
 *
 * Every card row renders `{cond && <div>Label: {arr.join(", ")}</div>}`.
 * The metadata props are arrays, and an empty array is truthy — so a bare
 * `comp.length &&` check prints a stray "Length: " label with no content
 * for an entry like `length: []` (react-doctor
 * rendering-conditional-render; WORK.md auto-intake 2026-11-12).
 *
 * The gate has to be the array's length, not the array itself — and not
 * `arr?.length` bare either, because `0 &&` renders a literal "0".
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = join(ROOT, "src/app/styleguide/page.tsx");

test("component grid gates every joined label on array length", () => {
  const lines = readFileSync(PAGE, "utf8").split("\n");
  const gated: number[] = [];
  lines.forEach((line, i) => {
    if (!line.includes('.join(", ")')) return;
    gated.push(i + 1);
    const cond = line.match(/\{\s*(.+?)\s*&&/)?.[1] ?? "";
    assert.ok(
      cond.includes("length"),
      `styleguide/page.tsx:${i + 1} renders a joined label without a length gate: ${line.trim()}`,
    );
  });
  assert.ok(gated.length >= 15, `expected the component grid's label rows, found ${gated.length}`);
});
