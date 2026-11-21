/**
 * Comment-ratchet contract.
 *
 * Zero-dependency (node:test). scripts/check-comments.mjs is the lint gate's
 * first stage: it counts comment-only physical lines in tracked first-party
 * source and refuses growth above scripts/comment-baseline.json. These tests
 * pin the tokenizer's seams (strings, templates and URLs never count; CSS
 * block comments do), the source-only file scope that keeps binary assets
 * out, and the ratchet's own exit-0 run as a subprocess.
 *
 * Run: `node --test tests/comment-ratchet.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SOURCE_EXTS,
  countSource,
  trackedSourceFiles,
} from "../scripts/check-comments.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

test("countSource counts comment-only // and /* */ lines in JS/TS", () => {
  const src = [
    "// a full-line comment",
    "const a = 1; // trailing comment stays code",
    "/*",
    " * block body",
    " */",
    'const s = "not // a comment";',
    'const t = `tpl // ${name} end`;',
    'const u = "https://example.com//path";',
    "see: //example.com for docs",
    "/* inline */ const b = 2;",
  ].join("\n");
  const r = countSource(src, false);
  assert.equal(r.count, 4);
  assert.equal(r.blocks, 2);
});

test("countSource counts CSS block-comment lines and ignores //", () => {
  const src = [
    "/* header */",
    "a { color: red; }",
    "/* multi",
    "line */",
    "// not a css comment",
  ].join("\n");
  const r = countSource(src, true);
  assert.equal(r.count, 3);
  assert.equal(r.blocks, 2);
});

test("trackedSourceFiles returns only source extensions", () => {
  const files = trackedSourceFiles();
  assert.ok(files.length > 0);
  assert.ok(files.includes("scripts/check-comments.mjs"));
  assert.ok(files.includes("eslint.config.mjs"));
  assert.ok(!files.some((f) => f.endsWith(".woff2")));
  for (const f of files) {
    assert.ok(
      SOURCE_EXTS.has(extname(f)),
      `${f} is tracked but has non-source extension ${extname(f)}`,
    );
  }
});

test("the ratchet exits 0 against the committed baseline", () => {
  const out = execFileSync(process.execPath, ["scripts/check-comments.mjs"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  assert.match(out, /comment ratchet OK/);
});
