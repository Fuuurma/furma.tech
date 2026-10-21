/**
 * A twelve-column grid is wider than a phone if its gaps are.
 *
 * Eleven gaps of `gap-8` are 352px before a single column has been laid, and
 * a phone is 320 to 390px across: the grid collapses its columns to nothing,
 * stays 352px wide, and drags the whole page sideways with it. Seven pages
 * had it — the portfolio's closing section, every case study's call to
 * action, the privacy policy and the 404 among them — and nothing but a
 * phone's width would have shown it.
 *
 * The rule is a property of the source and is cheap to hold: a
 * `grid-cols-12` that is not preceded by a one-column layout must not carry a
 * plain column gap of 7 (28px) or more. Give the gap to `md:` and up.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const SRC = fileURLToPath(new URL("../src", import.meta.url));

function* files(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (path.endsWith(".tsx")) yield path;
  }
}

/** The concept page and the style guide are their own contexts. */
const EXEMPT = /[\\/](v2|styleguide)[\\/]/;

test("no twelve-column grid carries a column gap a phone cannot hold", () => {
  const offenders: string[] = [];
  for (const file of files(SRC)) {
    if (EXEMPT.test(file)) continue;
    const source = readFileSync(file, "utf8");
    // `grid-cols-12 gap-8` and `grid-cols-12 gap-x-8`, but not `md:gap-8`.
    for (const match of source.matchAll(/(?<![:\w-])grid-cols-12(?:\s+[\w:[\]./-]+)*?\s+gap(?:-x)?-(\d+)(?![\w-])/g)) {
      if (Number(match[1]) >= 7) offenders.push(`${file.replace(SRC, "src")}: ${match[0]}`);
    }
  }
  assert.deepEqual(offenders, [], "a 12-column grid's gap must start at `md:`");
});
