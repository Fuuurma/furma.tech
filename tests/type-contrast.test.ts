/**
 * The ladder's smallest step has to be legible.
 *
 * The v1 pages' small type is governed by four steps (see
 * `tests/type-ladder.test.ts`). The smallest of them is where contrast
 * breaks, so the floor is pinned here.
 *
 * A run of text on the light surface needs 55% of the foreground to reach
 * 4.5:1 (WCAG AA). A run whose colour follows the theme has to clear both
 * surfaces at once, so it needs 60%. A run on a dark surface needs 50%.
 * A non-text mark — an icon, a divider, a watermark — needs 45%, which is
 * the 3:1 floor for meaningful graphics, and anything below that is not
 * perceivable at all.
 *
 * The one thing allowed to go lower is the ghost numeral on tic-tac-toe,
 * and only because it says `aria-hidden` and repeats the heading beside it.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The v1 public face: the house's own files, not the shadcn floor. */
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
  "src/components/studio/StudioSiteFooter.tsx",
  "src/components/ui/ProjectLayout.tsx",
  "src/components/ui/project/ProjectLayoutFooter.tsx",
];

/** Text on a theme-relative colour must clear both surfaces at once. */
const FLOORS = [
  { pattern: /placeholder:text-foreground\/(\d+)/g, text: 60, mark: 60, kind: "theme" },
  { pattern: /text-foreground\/(\d+)/g, text: 60, mark: 45, kind: "theme" },
  { pattern: /text-white\/(\d+)/g, text: 50, mark: 45, kind: "dark" },
  { pattern: /text-background\/(\d+)/g, text: 50, mark: 45, kind: "dark" },
];

/** An icon wrapper: a fixed square, or a span that is only a mark. */
const ICON = /\bw-(\d+(?:\.\d+)?)\s+h-\1\b/;

test("no text run on the v1 pages is painted below the legible floor", () => {
  const failures: string[] = [];

  for (const file of HOUSE_FILES) {
    const lines = readFileSync(join(ROOT, file), "utf8").split("\n");
    lines.forEach((line, i) => {
      // A short window around the line, so an aria-hidden on the element's
      // own attributes is seen even when it sits on another line.
      const window = lines.slice(Math.max(0, i - 8), i + 9).join(" ");
      // aria-hidden means the element is decoration, not content: the ghost
      // numeral on tic-tac-toe is one, and it repeats the heading beside it.
      if (window.includes("aria-hidden")) return;
      const isMark = ICON.test(line);

      for (const { pattern, text, mark } of FLOORS) {
        pattern.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = pattern.exec(line)) !== null) {
          const pct = Number(m[1]);
          const floor = isMark ? mark : text;
          if (pct >= floor) continue;
          failures.push(
            `${relative(ROOT, join(ROOT, file))}:${i + 1} — ${m[0]} is ${pct}%, ` +
              `floor is ${floor}% (${isMark ? "non-text mark" : "text"})`,
          );
        }
      }
    });
  }

  assert.deepEqual(
    failures,
    [],
    "text below the contrast floor:\n  " + failures.join("\n  "),
  );
});

test("the ladder's own label colour clears the floor", () => {
  const css = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");
  // .plastic-label paints the foreground at 38% transparent — 62% opaque.
  const m = css.match(
    /\.plastic-label\s*\{[^}]*?color:\s*color-mix\(in oklch,\s*var\(--foreground\),\s*transparent\s*(\d+)%\)/,
  );
  assert.ok(m, "the house label colour must be a color-mix of the foreground");
  const opacity = 100 - Number(m[1]);
  assert.ok(
    opacity >= 60,
    `the house label paints at ${opacity}% and must be at least 60%`,
  );
});

test("no text colour in the stylesheet is painted below the floor", () => {
  const css = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");
  // Every `color: rgba(...)` in the stylesheet is a run of type on a surface
  // of the opposite colour. 55% of the opposite colour clears 4.5:1 on a
  // black ground and on a white one; the borders are a different property
  // and are not type.
  const colours = [
    ...css.matchAll(
      /(?<![-\w])color:\s*rgba\(\s*\d+,\s*\d+,\s*\d+,\s*([\d.]+)\s*\)/g,
    ),
  ];
  const failures = colours
    .map((m) => ({ at: m.index, alpha: Number(m[1]) }))
    .filter((c) => c.alpha < 0.55)
    .map((c) => `at offset ${c.at}: alpha ${c.alpha}`);

  assert.deepEqual(
    failures,
    [],
    "a text colour in the stylesheet is below the 55% floor:\n  " + failures.join("\n  "),
  );
});

test("the inverse ladder clears the floor on a black ground and a white one", () => {
  const css = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");

  // The fixed-white steps, used on a surface painted black outright.
  for (const step of ["inverse", "inverse-dim", "inverse-faint"]) {
    const m = css.match(
      new RegExp(
        `\\.plastic-label--${step}\\s*\\{[^}]*?rgba\\(255,\\s*255,\\s*255,\\s*([\\d.]+)\\)`,
      ),
    );
    assert.ok(m, `.plastic-label--${step} must declare its white`);
    const opacity = Number(m[1]) * 100;
    assert.ok(
      opacity >= 55,
      `.plastic-label--${step} paints at ${opacity}% and must be at least 55%`,
    );
  }

  // The theme-following steps, used on a surface painted with --foreground,
  // which inverts. The mix takes the background colour, so the same share of
  // it has to clear 4.5:1 over a black ground and over a white one.
  for (const step of ["inverse", "inverse-dim", "inverse-faint"]) {
    const m = css.match(
      new RegExp(
        `\\.plastic-on-dark \\.plastic-label--${step}\\s*\\{[^}]*?var\\(--background\\),\\s*transparent\\s*(\\d+)%`,
      ),
    );
    assert.ok(m, `.plastic-on-dark .plastic-label--${step} must declare its mix`);
    const opacity = 100 - Number(m[1]);
    assert.ok(
      opacity >= 55,
      `.plastic-on-dark .plastic-label--${step} paints at ${opacity}% and must be at least 55%`,
    );
  }
});
