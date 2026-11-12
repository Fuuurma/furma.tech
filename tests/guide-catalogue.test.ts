/**
 * Agent-guide catalogue contract.
 *
 * Zero-dependency (node:test). AGENTS.md carries a picture of what the
 * studio sells; the catalogue it must picture is `HOME_PROJECTS` in
 * `src/lib/home-projects.ts` — the honest list the home tour, portfolio
 * index, footers and sitemap all read. The guide once said "6 products"
 * above a list of ten, with stale statuses and the four newest products
 * missing entirely; this suite pins the block to the catalogue so drift
 * cannot return.
 *
 * Run: `node --test tests/guide-catalogue.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOME_PROJECTS, ARCHIVED_PROJECTS } from "../src/lib/home-projects.ts";

const agents = readFileSync(new URL("../AGENTS.md", import.meta.url), "utf8");

test("the guide names the catalogue module as its source", () => {
  assert.match(
    agents,
    /catalogue[^\n]*`src\/lib\/home-projects\.ts`/,
    "the Context block must point at src/lib/home-projects.ts",
  );
});

test("the guide lists exactly HOME_PROJECTS, name and status, in order", () => {
  const block = agents.match(/\*\*Advertised products[^\n]*\n((?:- \*\*.+\n?)+)/);
  assert.ok(block, "AGENTS.md must carry an **Advertised products** list");
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

test("the guide names the archived set as reachable, not advertised", () => {
  const line = agents.split("\n").find((l) => l.startsWith("**Archived ("));
  assert.ok(line, "AGENTS.md must carry the **Archived (...) catalogue line");
  assert.match(line, /reachable, not advertised/);
  for (const p of ARCHIVED_PROJECTS) {
    assert.ok(line.includes(p.name), `the archived line must still name ${p.name}`);
  }
});
