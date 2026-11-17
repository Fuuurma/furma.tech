/**
 * Agent-guide catalogue contract.
 *
 * Zero-dependency (node:test). The agent guides (AGENTS.md, GEMINI.md,
 * QWEN.md) carry a picture of what the studio sells; the catalogue they
 * must picture is `HOME_PROJECTS` in `src/lib/home-projects.ts` — the
 * honest list the home tour, portfolio index, footers and sitemap all
 * read. Since 2026-11-16 that list is the active set and nothing else:
 * there is no archive export and no reachable-but-unlisted shelf. This
 * suite pins every guide's block to the catalogue so drift in any of
 * them cannot return.
 *
 * Run: `node --test tests/guide-catalogue.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOME_PROJECTS } from "../src/lib/home-projects.ts";

const GUIDES = ["AGENTS.md", "GEMINI.md", "QWEN.md"] as const;

function readGuide(name: (typeof GUIDES)[number]): string {
  return readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
}

for (const guide of GUIDES) {
  const text = readGuide(guide);

  test(`${guide} names the catalogue module as its source`, () => {
    assert.match(
      text,
      /catalogue[^\n]*`src\/lib\/home-projects\.ts`/,
      "the Context block must point at src/lib/home-projects.ts",
    );
  });

  test(`${guide} lists exactly HOME_PROJECTS, name and status, in order`, () => {
    const block = text.match(/\*\*Advertised products[^\n]*\n((?:- \*\*.+\n?)+)/);
    assert.ok(block, `${guide} must carry an **Advertised products** list`);
    const listed = block[1]
      .trim()
      .split("\n")
      .map((line) => {
        const m = line.match(/^- \*\*(.+?)\*\* — .+\(([^()]+)\)$/);
        assert.ok(m, `unparsable catalogue line: ${line}`);
        return { name: m[1], status: m[2] };
      });
    assert.deepEqual(
      listed,
      HOME_PROJECTS.map((p) => ({ name: p.name, status: p.status })),
      "every advertised line must match HOME_PROJECTS name+status, in order",
    );
  });

  test(`${guide} carries no archive — the catalogue is the active set`, () => {
    assert.ok(
      !text.includes("ARCHIVED_PROJECTS"),
      `${guide} must not reference the removed archive export`,
    );
    assert.ok(
      !text.split("\n").some((l) => l.startsWith("**Archived (")),
      `${guide} must not carry an archive line`,
    );
  });
}
