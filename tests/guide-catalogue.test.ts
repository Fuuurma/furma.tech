/**
 * Agent-guide catalogue contract.
 *
 * Zero-dependency (node:test). The agent guides (AGENTS.md, GEMINI.md,
 * QWEN.md) carry a picture of what the studio sells; the catalogue they
 * must picture is `HOME_PROJECTS` in `src/lib/home-projects.ts` — the
 * honest list the home tour, portfolio index, footers and sitemap all
 * read. The guides once said "two verticals" with Aitlas as an active
 * product above a stale list missing the four newest products; this
 * suite pins every guide's block to the catalogue so drift in any of
 * them cannot return.
 *
 * Run: `node --test tests/guide-catalogue.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOME_PROJECTS, ARCHIVED_PROJECTS } from "../src/lib/home-projects.ts";

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

  test(`${guide} names the archived set as reachable, not advertised`, () => {
    const line = text.split("\n").find((l) => l.startsWith("**Archived ("));
    assert.ok(line, `${guide} must carry the **Archived (...) catalogue line`);
    assert.match(line, /reachable, not advertised/);
    for (const p of ARCHIVED_PROJECTS) {
      assert.ok(line.includes(p.name), `the archived line must still name ${p.name}`);
    }
  });
}
