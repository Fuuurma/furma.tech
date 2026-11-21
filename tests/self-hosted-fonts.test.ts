/**
 * Self-hosted font contract.
 *
 * Zero-dependency (node:test). The merge gate has no network and cannot
 * reach fonts.googleapis.com, so `next/font/google` turns every offline
 * `next build` into a hard failure (it killed the e3 build). The faces
 * ship as committed latin woff2 files under `src/app/fonts/` and load
 * through `next/font/local`: the same subsets Google serves, no fetch.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  closeSync,
  existsSync,
  openSync,
  readFileSync,
  readSync,
  statSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";

const ROOT_LAYOUT = "src/app/layout.tsx";
const V2_LAYOUT = "src/app/v2/layout.tsx";
const FONTS_DIR = "src/app/fonts";
const LAYOUTS = [ROOT_LAYOUT, V2_LAYOUT];

// The nine latin variable subsets the two layouts declare. Sizes are all
// well above the 20 kB floor — a truncated or LFS-pointer file fails here.
const FACES = [
  "instrument-sans-latin.woff2",
  "cormorant-latin-normal.woff2",
  "cormorant-latin-italic.woff2",
  "jetbrains-mono-latin.woff2",
  "archivo-latin-normal.woff2",
  "archivo-latin-italic.woff2",
  "source-serif-4-latin-normal.woff2",
  "source-serif-4-latin-italic.woff2",
  "geist-mono-latin.woff2",
];

const WOFF2_MAGIC = Buffer.from([0x77, 0x4f, 0x46, 0x32]); // "wOF2"

test("both layouts load faces through next/font/local, never next/font/google", () => {
  for (const file of LAYOUTS) {
    const src = readFileSync(file, "utf8");
    assert.match(
      src,
      /import\s+localFont\s+from\s+["']next\/font\/local["']/,
      `${file} must import localFont from next/font/local`,
    );
    assert.ok(
      !src.includes("next/font/google"),
      `${file} still references next/font/google — the gate cannot fetch faces`,
    );
    assert.match(
      src,
      /export\s+const\s+metadata\b/,
      `${file} must keep exporting metadata`,
    );
  }
});

test("the nine latin woff2 faces ship under src/app/fonts", () => {
  for (const name of FACES) {
    const path = join(FONTS_DIR, name);
    assert.ok(existsSync(path), `${path} is missing`);
    const { size } = statSync(path);
    assert.ok(size > 20_000, `${path} is ${size} bytes, expected > 20000`);
    const fd = openSync(path, "r");
    const magic = Buffer.alloc(4);
    readSync(fd, magic, 0, 4, 0);
    closeSync(fd);
    assert.ok(
      magic.equals(WOFF2_MAGIC),
      `${path} does not start with the wOF2 magic`,
    );
  }
});

test("every fonts/*.woff2 path referenced by the layouts exists", () => {
  const FONT_REF = /["']((?:\.\/|\.\.\/)fonts\/[^"']+\.woff2)["']/g;
  for (const file of LAYOUTS) {
    const src = readFileSync(file, "utf8");
    const refs = [...src.matchAll(FONT_REF)].map((m) => m[1]);
    assert.ok(refs.length > 0, `${file} references no fonts/*.woff2 path`);
    for (const ref of refs) {
      const resolved = resolve(dirname(file), ref);
      assert.ok(
        existsSync(resolved),
        `${file} references ${ref}, which does not exist at ${resolved}`,
      );
    }
  }
});
