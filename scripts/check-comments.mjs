#!/usr/bin/env node
/**
 * No-new-comments ratchet.
 *
 * Scans every tracked code file in the product scope (src/, tests/,
 * scripts/, .github/, and root-level config files) with a language-aware
 * scanner per file family, fingerprints each comment's normalized text, and
 * fails when the current tree contains a comment fingerprint that is not in
 * the committed baseline (scripts/comment-baseline.json).
 *
 * Deletions always pass; new or edited comment text fails. To admit a
 * required comment (legal marker, tooling directive, API doc) run
 * `node scripts/check-comments.mjs --write` and commit the baseline diff.
 *
 * Usage:
 *   node scripts/check-comments.mjs          check against baseline (gate)
 *   node scripts/check-comments.mjs --write  regenerate baseline
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const BASELINE_PATH = 'scripts/comment-baseline.json';
const WRITE = process.argv.includes('--write');

// Product scope: code dirs plus root-level config files. Vendored skill and
// agent-template trees (.agents/, .cursor/, .devin/, .factory/, skills/) are
// not product code and are excluded, matching eslint.config.mjs ignores.
const SCOPE_DIRS = ['src/', 'tests/', 'scripts/', '.github/'];
const CODE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.css', '.yml', '.yaml', '.sh', '.json',
]);

function isInScope(path) {
  if (!CODE_EXTENSIONS.has(extname(path))) return false;
  if (SCOPE_DIRS.some((dir) => path.startsWith(dir))) return true;
  return !path.includes('/'); // root-level config files only
}

function extname(path) {
  const base = basename(path);
  const dot = base.lastIndexOf('.');
  return dot === -1 ? '' : base.slice(dot);
}

function trackedFiles() {
  const out = execFileSync('git', ['ls-files'], { encoding: 'utf8' });
  return out.split('\n').filter(Boolean).filter(isInScope);
}

// ---------------------------------------------------------------------------
// Comment scanners. Each returns [{ line, text }] where text is the raw
// comment including its delimiters.
// ---------------------------------------------------------------------------

const JS_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

function scriptKindFor(path) {
  if (path.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (path.endsWith('.jsx')) return ts.ScriptKind.JSX;
  if (/\.(js|mjs|cjs)$/.test(path)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

// Walk every node and token of the parsed tree and collect the comment
// ranges in each one's leading and trailing trivia. The parser (unlike a
// linear token scan) re-scans template literals correctly, so `//` inside
// strings and `${}` templates is never mistaken for a comment.
function scanJsLike(path, text) {
  // Strip a shebang line; it is a directive, not a comment.
  const body = text.startsWith('#!') ? text.slice(text.indexOf('\n') + 1) : text;
  const sf = ts.createSourceFile(path, body, ts.ScriptTarget.Latest, true, scriptKindFor(path));
  const comments = [];
  const seen = new Set();
  const lineStarts = [0];
  for (let i = 0; i < body.length; i++) {
    if (body[i] === '\n') lineStarts.push(i + 1);
  }
  const lineOf = (pos) => {
    let lo = 0;
    let hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= pos) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
  const add = (range) => {
    if (!range) return;
    const key = `${range.pos}:${range.end}`;
    if (seen.has(key)) return;
    seen.add(key);
    comments.push({
      line: lineOf(range.pos),
      text: body.slice(range.pos, range.end),
      pos: range.pos,
      end: range.end,
    });
  };
  const visit = (node) => {
    for (const r of ts.getLeadingCommentRanges(body, node.getFullStart()) ?? []) add(r);
    for (const r of ts.getTrailingCommentRanges(body, node.getEnd()) ?? []) add(r);
    for (const child of node.getChildren()) visit(child);
  };
  visit(sf);
  comments.sort((a, b) => a.line - b.line);
  return comments;
}

// /* ... */ blocks with string awareness (CSS, JSONC-style // too for .json).
function scanCss(text) {
  const comments = [];
  let state = 'normal'; // normal | block | sq | dq
  let blockStart = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (state === 'block') {
      if (ch === '*' && next === '/') {
        comments.push({
          line: lineOfOffset(text, blockStart),
          text: text.slice(blockStart, i + 2),
        });
        state = 'normal';
        i++;
      }
      continue;
    }
    if (state === 'sq' || state === 'dq') {
      if (ch === '\\') i++;
      else if ((state === 'sq' && ch === "'") || (state === 'dq' && ch === '"')) state = 'normal';
      continue;
    }
    if (ch === '/' && next === '*') {
      state = 'block';
      blockStart = i;
      i++;
      continue;
    }
    if (ch === "'") { state = 'sq'; continue; }
    if (ch === '"') { state = 'dq'; continue; }
  }
  return comments;
}

function lineOfOffset(text, pos) {
  let line = 1;
  for (let i = 0; i < pos; i++) if (text[i] === '\n') line++;
  return line;
}

// # line comments for YAML and shell: a # starts a comment at line start or
// after whitespace, outside single/double quotes. Shebangs are skipped.
function scanHash(text, { shell = false } = {}) {
  const comments = [];
  const lines = text.split('\n');
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (shell && li === 0 && line.startsWith('#!')) continue;
    let state = 'normal';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (state === 'sq') {
        if (ch === "'") state = 'normal';
        continue;
      }
      if (state === 'dq') {
        if (ch === '\\') i++;
        else if (ch === '"') state = 'normal';
        continue;
      }
      if (ch === "'") { state = 'sq'; continue; }
      if (ch === '"') { state = 'dq'; continue; }
      if (ch === '#') {
        const prev = i === 0 ? ' ' : line[i - 1];
        if (i === 0 || /\s/.test(prev)) {
          comments.push({ line: li + 1, text: line.slice(i) });
        }
        break;
      }
    }
  }
  return comments;
}

// // and /* */ comments for JSON-with-comments files (tsconfig, components.json).
function scanJsonc(text) {
  const comments = [];
  let state = 'normal'; // normal | line | block | dq | sq
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (state === 'line') {
      if (ch === '\n') {
        comments.push({ line: lineOfOffset(text, start), text: text.slice(start, i) });
        state = 'normal';
      }
      continue;
    }
    if (state === 'block') {
      if (ch === '*' && next === '/') {
        comments.push({ line: lineOfOffset(text, start), text: text.slice(start, i + 2) });
        state = 'normal';
        i++;
      }
      continue;
    }
    if (state === 'dq' || state === 'sq') {
      if (ch === '\\') i++;
      else if ((state === 'dq' && ch === '"') || (state === 'sq' && ch === "'")) state = 'normal';
      continue;
    }
    if (ch === '/' && next === '/') { state = 'line'; start = i; i++; continue; }
    if (ch === '/' && next === '*') { state = 'block'; start = i; i++; continue; }
    if (ch === '"') { state = 'dq'; continue; }
    if (ch === "'") { state = 'sq'; continue; }
  }
  if (state === 'line') {
    comments.push({ line: lineOfOffset(text, start), text: text.slice(start) });
  }
  return comments;
}

function scanFile(path, text) {
  const ext = extname(path);
  if (JS_EXTENSIONS.has(ext)) return scanJsLike(path, text);
  if (ext === '.css') return scanCss(text);
  if (ext === '.yml' || ext === '.yaml') return scanHash(text);
  if (ext === '.sh') return scanHash(text, { shell: true });
  if (ext === '.json') return scanJsonc(text);
  return [];
}

// ---------------------------------------------------------------------------
// Fingerprints: normalized comment text, delimiters and layout stripped.
// ---------------------------------------------------------------------------

function normalize(text) {
  return text
    .replace(/^\/\/+/, '')
    .replace(/^\/\*+/, '')
    .replace(/\*\/+$/, '')
    .split('\n')
    .map((line) => line.replace(/^\s*\*+\s?/, '').replace(/\s+$/, ''))
    .join('\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function fingerprint(comment) {
  return normalize(comment.text);
}

// ---------------------------------------------------------------------------
// Baseline compare: per file, each fingerprint's current count must not
// exceed its baseline count. Deletions always pass.
// ---------------------------------------------------------------------------

function countMap(fingerprints) {
  const map = new Map();
  for (const fp of fingerprints) map.set(fp, (map.get(fp) ?? 0) + 1);
  return map;
}

function main() {
  const files = trackedFiles();
  const current = {}; // path -> [{ line, fp }]
  let commentCount = 0;

  for (const path of files) {
    const text = readFileSync(path, 'utf8');
    const comments = scanFile(path, text);
    if (comments.length === 0) continue;
    current[path] = comments.map((c) => ({ line: c.line, fp: fingerprint(c) }));
    commentCount += comments.length;
  }

  if (WRITE) {
    const baseline = { version: 2, files: {} };
    for (const path of Object.keys(current).sort()) {
      const counts = countMap(current[path].map((c) => c.fp));
      baseline.files[path] = Object.fromEntries([...counts.entries()].sort());
    }
    writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + '\n');
    console.log(
      `baseline written: ${Object.keys(baseline.files).length} files, ` +
        `${commentCount} comments -> ${BASELINE_PATH}`,
    );
    return;
  }

  if (!existsSync(BASELINE_PATH)) {
    console.error(`missing ${BASELINE_PATH}; run: node scripts/check-comments.mjs --write`);
    process.exit(1);
  }
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
  const violations = [];

  for (const [path, comments] of Object.entries(current)) {
    const allowed = baseline.files[path] ?? {};
    const seen = new Map();
    for (const c of comments) {
      const n = (seen.get(c.fp) ?? 0) + 1;
      seen.set(c.fp, n);
      if (n > (allowed[c.fp] ?? 0)) {
        violations.push({ path, line: c.line, fp: c.fp });
      }
    }
  }

  if (violations.length > 0) {
    console.error(
      `no-new-comments ratchet FAILED: ${violations.length} new/changed comment(s)`,
    );
    for (const v of violations) {
      console.error(`  ${v.path}:${v.line}  ${v.fp.slice(0, 100)}`);
    }
    console.error(
      'Delete the comment, or if it is required (legal/tooling/API doc) run ' +
        '`node scripts/check-comments.mjs --write` and commit the baseline.',
    );
    process.exit(1);
  }

  const baselineCount = Object.values(baseline.files).reduce(
    (n, f) => n + Object.values(f).reduce((a, b) => a + b, 0),
    0,
  );
  console.log(
    `no-new-comments ratchet OK: ${commentCount} comments in ` +
      `${Object.keys(current).length} files (baseline allows ${baselineCount} comments)`,
  );
}

export { scanFile, fingerprint, normalize, trackedFiles, isInScope };

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) main();
