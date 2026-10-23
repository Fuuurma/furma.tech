/**
 * The v1 chrome carries no hue.
 *
 * The rule the mount pass installed: **the page is monochrome, and the
 * product keeps its colours inside its own picture.** A colour that appears
 * outside the artifact's own frame is a bug.
 *
 * The one thing that used to break it was the portfolio's status tag: green
 * for "In Development", amber for "Roadmap", the last colour on the page
 * outside a product's picture — and the state was already on the page twice
 * over in words.
 *
 * The site's own dark theme is warm on purpose, and the shadcn floor keeps
 * its own tokens, so the token blocks are exempt. Everything else — every
 * component rule, every house file — has to be neutral.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The house's own v1 files. The shadcn floor and /v2 are other contexts. */
const HOUSE_FILES = [
  "src/app/privacy/page.tsx",
  "src/app/brand/page.tsx",
  "src/app/styleguide/page.tsx",
  "src/app/portfolio/aitlas/page.tsx",
  "src/app/portfolio/aitlas/agents/page.tsx",
  "src/app/portfolio/aitlas/nexus/page.tsx",
  "src/app/portfolio/aitlas/nova/page.tsx",
  "src/app/portfolio/financehub/page.tsx",
  "src/app/portfolio/guidetours/page.tsx",
  "src/app/portfolio/linkup/page.tsx",
  "src/app/portfolio/onetomany/page.tsx",
  "src/app/portfolio/opengovern/page.tsx",
  "src/app/portfolio/pickstracker/page.tsx",
  "src/app/portfolio/qart/page.tsx",
  "src/app/portfolio/restauramanager/page.tsx",
  "src/app/portfolio/tic-tac-toe-disappear/page.tsx",
  "src/components/home/PlasticHome.tsx",
  "src/components/home/PlasticProjectSlide.tsx",
  "src/components/home/PortfolioNavDropdown.tsx",
  "src/components/portfolio/PortfolioListItem.tsx",
  "src/components/studio/StudioSiteFooter.tsx",
  "src/components/ui/ProjectLayout.tsx",
  "src/components/ui/project/ProjectLayoutFooter.tsx",
];

/** A colour literal and the spread of its channels. Zero spread = neutral. */
function literals(source: string): { text: string; spread: number }[] {
  const out: { text: string; spread: number }[] = [];
  for (const m of source.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
    const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
    out.push({ text: m[0], spread: Math.max(r, g, b) - Math.min(r, g, b) });
  }
  for (const m of source.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)) {
    const [r, g, b] = [1, 2, 3].map((i) => Number(m[i]));
    out.push({ text: m[0], spread: Math.max(r, g, b) - Math.min(r, g, b) });
  }
  return out;
}

/** The rules of a stylesheet, with the context each one sits in. */
function rules(css: string): { context: string; body: string }[] {
  const out: { context: string; body: string }[] = [];
  const stack: string[] = [];
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i);
    if (open === -1) break;
    const selector = css.slice(i, open).trim();
    let depth = 1;
    let j = open + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") depth--;
      j++;
    }
    const body = css.slice(open + 1, j - 1);
    const context = [...stack, selector].join(" ");
    if (body.includes("{")) stack.push(selector);
    else out.push({ context, body });
    i = j;
  }
  return out;
}

/** The token blocks, where a hue is allowed: the theme and its warm dark. */
const TOKEN_BLOCK = /(^|\s)(:root|\.dark|@theme)(\s|$)/;

test("no component rule in the stylesheet carries a hue", () => {
  const css = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");
  const failures: string[] = [];

  for (const { context, body } of rules(css)) {
    if (TOKEN_BLOCK.test(context)) continue;
    for (const { text, spread } of literals(body)) {
      if (spread === 0) continue;
      failures.push(`${context.replace(/\s+/g, " ").slice(0, 60)} → ${text} (spread ${spread})`);
    }
  }

  assert.deepEqual(
    failures,
    [],
    "a component rule carries a hue:\n  " + failures.join("\n  "),
  );
});

test("no house file carries a hue", () => {
  const failures: string[] = [];

  for (const file of HOUSE_FILES) {
    const source = readFileSync(join(ROOT, file), "utf8");
    for (const { text, spread } of literals(source)) {
      if (spread === 0) continue;
      failures.push(`${file} → ${text} (spread ${spread})`);
    }
  }

  assert.deepEqual(
    failures,
    [],
    "a house file carries a hue:\n  " + failures.join("\n  "),
  );
});

test("the status tag is one treatment, and it is neutral", () => {
  const css = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");
  assert.ok(
    /\.portfolio-list-page__status\s*\{/.test(css),
    "the status tag must have a rule of its own",
  );
  // No per-state modifier survives: the state is in the word.
  for (const tone of ["dev", "roadmap", "paused"]) {
    assert.ok(
      !css.includes(`portfolio-list-page__status--${tone}`),
      `the status tag must not carry a per-state tone: --${tone}`,
    );
  }
  const item = readFileSync(join(ROOT, "src/components/portfolio/PortfolioListItem.tsx"), "utf8");
  assert.ok(
    !item.includes("statusTone"),
    "the status tone helper is gone with the per-state colours",
  );
});

test("the page says where the colour is allowed to be", () => {
  const design = readFileSync(join(ROOT, "DESIGN.md"), "utf8");
  assert.ok(
    /the page is monochrome/i.test(design),
    "DESIGN.md must state the monochrome rule",
  );
  assert.ok(
    /inside its own\s+>?picture|inside the product/i.test(design),
    "DESIGN.md must say where a colour is allowed to live",
  );
});
