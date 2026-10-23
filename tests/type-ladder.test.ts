/**
 * The v1 pages' type is governed by a ladder.
 *
 * The chrome's small type used to carry ten sizes between 8px and 17px —
 * 8, 9, 10, 10.4, 11, 12, 13, 14, 16 and 17 — most of them a pixel apart,
 * and two of them below the floor a label can be read at. It is now four
 * steps, declared once: `--text-label` (10), `--text-meta` (11),
 * `--text-small` (13) and `--text-body` (15).
 *
 * The second half of the file is the trap that came with the ladder.
 * tailwind-merge classifies any `text-*` class it does not recognise as a
 * *colour*, so `text-meta` and `text-background` land in the same group and
 * the size is dropped — the element silently falls back to 16px. The merge
 * in `src/lib/utils.ts` teaches it the four steps; these tests hold it there.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { cn } from "../src/lib/utils.ts";

const css = readFileSync(
  fileURLToPath(new URL("../src/app/globals.css", import.meta.url)),
  "utf8",
);

const STEPS = ["label", "meta", "small", "body"] as const;

test("the ladder is declared once, in the theme", () => {
  for (const step of STEPS) {
    const declarations = css.match(new RegExp(`--text-${step}:`, "g")) ?? [];
    assert.equal(
      declarations.length,
      1,
      `--text-${step} must be declared exactly once`,
    );
  }
  assert.ok(
    /@theme\s*\{[^}]*--text-label:/.test(css),
    "the ladder must live in a @theme block, so the utilities reference the token",
  );
});

test("the ladder's steps are the ones the page is allowed to use", () => {
  const expected = { label: "10px", meta: "11px", small: "13px", body: "15px" };
  for (const [step, value] of Object.entries(expected)) {
    const m = css.match(new RegExp(`--text-${step}:\\s*([^;]+);`));
    assert.ok(m, `--text-${step} must exist`);
    assert.equal(m[1].trim(), value, `--text-${step} must be ${value}`);
  }
});

test("no hardcoded small size survives in the design system", () => {
  const hardcoded = [...css.matchAll(/font-size:\s*(\d+(?:\.\d+)?)(px|rem)/g)]
    .map((m) => (m[2] === "rem" ? Number(m[1]) * 16 : Number(m[1])))
    .filter((px) => px < 18);
  assert.deepEqual(
    hardcoded,
    [],
    "every small size must come from the ladder",
  );
});

test("a ladder size and a text colour are two different groups", () => {
  // The trap: tailwind-merge reads an unknown `text-*` class as a colour,
  // so `text-meta` was dropped whenever the same element also set a text
  // colour — and the size silently fell back to 16px.
  for (const step of STEPS) {
    assert.equal(
      cn(`text-${step}`, "text-background"),
      `text-${step} text-background`,
      `text-${step} must survive next to a text colour`,
    );
  }
});

test("a later ladder size still wins over an earlier one", () => {
  assert.equal(cn("text-label", "text-meta"), "text-meta");
  assert.equal(cn("text-meta", "text-small"), "text-small");
});

test("a built-in size still wins over a ladder size", () => {
  assert.equal(cn("text-label", "text-sm"), "text-sm");
  assert.equal(cn("text-sm", "text-label"), "text-label");
});
