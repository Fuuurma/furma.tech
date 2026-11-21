#!/usr/bin/env node
// Comment ratchet: counts comment-only physical lines in first-party source
// and refuses any count above the recorded baseline. Deletions always pass;
// when the count drops, refresh the baseline so the ratchet keeps tightening.
//
//   node scripts/check-comments.mjs                  # audit (exit 1 on growth)
//   node scripts/check-comments.mjs --report         # per-file counts
//   node scripts/check-comments.mjs --update-baseline
//
// Language-aware: JS/TS tokenizing skips string, template and regex literals
// before comment detection, so URLs and text like "://" never count. CSS is
// scanned for block comments only. Scope: src, tests, scripts and the root
// config files; vendored skill packs are third-party content, not ours.

import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const BASELINE_PATH = join(ROOT, "scripts", "comment-baseline.json");

const CSS_EXTS = new Set([".css", ".scss"]);

function trackedFiles() {
  const out = execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" });
  const inScope = (f) =>
    f === "eslint.config.mjs" || f === "next.config.ts" || f === "postcss.config.mjs" ||
    f.startsWith("src/") || f.startsWith("tests/") || f.startsWith("scripts/");
  return out.split("\n").filter(Boolean).filter(inScope);
}

// Comment spans with absolute offsets. Strings, templates (with nested
// interpolation) and regex literals are consumed as code first, so their
// contents can never start a comment; a ":" before "//" keeps URLs out too.
function commentSegments(src, isCss) {
  const segs = [];
  let i = 0;
  const n = src.length;
  let prevSignificant = "";

  while (i < n) {
    const c = src[i];
    const next = i + 1 < n ? src[i + 1] : "";
    if (c === "\n") {
      i++;
      continue;
    }
    if (isCss) {
      if (c === "/" && next === "*") {
        const start = i;
        i += 2;
        while (i < n && !(src[i] === "*" && src[i + 1] === "/")) i++;
        i = Math.min(i + 2, n);
        segs.push({ start, end: i });
        continue;
      }
      if (c === "'" || c === '"') {
        i++;
        while (i < n && src[i] !== c) {
          if (src[i] === "\\") i++;
          i++;
        }
        i++;
        prevSignificant = '"';
        continue;
      }
      if (!/\s/.test(c)) prevSignificant = c;
      i++;
      continue;
    }
    if (c === "/" && next === "/" && prevSignificant !== ":") {
      const start = i;
      while (i < n && src[i] !== "\n") i++;
      segs.push({ start, end: i });
      continue;
    }
    if (c === "/" && next === "*") {
      const start = i;
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) i++;
      i = Math.min(i + 2, n);
      segs.push({ start, end: i });
      continue;
    }
    if (c === "'" || c === '"') {
      i++;
      while (i < n && src[i] !== c) {
        if (src[i] === "\\") i++;
        i++;
      }
      i++;
      prevSignificant = '"';
      continue;
    }
    if (c === "`") {
      i++;
      let depth = 0;
      while (i < n) {
        if (src[i] === "\\") {
          i += 2;
          continue;
        }
        if (depth === 0 && src[i] === "$" && src[i + 1] === "{") {
          depth = 1;
          i += 2;
          continue;
        }
        if (depth > 0) {
          if (src[i] === "{") depth++;
          else if (src[i] === "}") depth--;
          i++;
          continue;
        }
        if (src[i] === "`") {
          i++;
          break;
        }
        i++;
      }
      prevSignificant = "`";
      continue;
    }
    // Regex literal: a slash in operator position opens one, and escapes and
    // character classes are honored while scanning for its closing slash.
    if (c === "/" && prevSignificant !== "" && /[(,=:[!&|?{};+\-*%<>=~]/.test(prevSignificant)) {
      const start = i;
      i++;
      let inClass = false;
      let closed = false;
      while (i < n) {
        if (src[i] === "\\") {
          i += 2;
          continue;
        }
        if (src[i] === "\n") break;
        if (src[i] === "[") inClass = true;
        else if (src[i] === "]") inClass = false;
        else if (src[i] === "/" && !inClass) {
          i++;
          closed = true;
          break;
        }
        i++;
      }
      if (closed) {
        while (i < n && /[a-z]/.test(src[i])) i++;
        prevSignificant = "/";
        continue;
      }
      i = start + 1;
      prevSignificant = "/";
      continue;
    }
    if (!/\s/.test(c)) prevSignificant = c;
    i++;
  }
  return segs;
}

// A physical line counts when it holds non-comment text that disappears once
// comment spans are masked — i.e. the comment was the only content.
function countFile(rel) {
  const src = readFileSync(join(ROOT, rel), "utf8");
  const isCss = CSS_EXTS.has(extname(rel));
  const masked = src.split("");
  for (const seg of commentSegments(src, isCss)) {
    for (let k = seg.start; k < seg.end; k++) masked[k] = " ";
  }
  const originalLines = src.split("\n");
  const maskedLines = masked.join("").split("\n");
  const flags = originalLines.map(
    (orig, li) => orig.trim() !== "" && (maskedLines[li] ?? "").trim() === ""
  );
  let blocks = 0;
  for (let i = 0; i < flags.length; i++) {
    if (flags[i] && (i === 0 || !flags[i - 1])) blocks++;
  }
  return { count: flags.filter(Boolean).length, blocks };
}

function main() {
  const mode = process.argv[2] ?? "audit";
  const files = trackedFiles();
  const results = {};
  let total = 0;
  let totalBlocks = 0;
  for (const f of files) {
    const r = countFile(f);
    if (r.count > 0) {
      results[f] = r.count;
      total += r.count;
      totalBlocks += r.blocks;
    }
  }
  if (mode === "--report") {
    for (const [f, c] of Object.entries(results).sort((a, b) => b[1] - a[1])) {
      console.log(String(c).padStart(5), f);
    }
    console.log(`\nfiles with comments: ${Object.keys(results).length}`);
    console.log(`comment-only lines: ${total}`);
    console.log(`comment blocks: ${totalBlocks}`);
    return;
  }
  if (mode === "--update-baseline") {
    const baseline = { total, files: results, updatedAt: new Date().toISOString() };
    writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
    console.log(`baseline updated: ${total} comment-only lines across ${Object.keys(results).length} files`);
    return;
  }
  let ok = true;
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const baseFiles = baseline.files ?? {};
  const allPaths = new Set([...Object.keys(baseFiles), ...Object.keys(results)]);
  for (const f of [...allPaths].sort()) {
    const before = baseFiles[f] ?? 0;
    const now = results[f] ?? 0;
    if (now > before) {
      ok = false;
      console.error(`FAIL ${f}: ${now} > baseline ${before} (+${now - before})`);
    } else if (now < before) {
      console.log(`improved ${f}: ${before} -> ${now} (run --update-baseline to hold the gain)`);
    }
  }
  if (Number.isFinite(baseline.total) && total > baseline.total) ok = false;
  if (!ok) {
    console.error(`comment ratchet failed: ${total} comment-only lines vs baseline ${baseline.total}`);
    process.exit(1);
  }
  console.log(`comment ratchet OK: ${total} comment-only lines (baseline ${baseline.total})`);
}

main();
