/**
 * /showcase catalogue contract.
 *
 * Zero-dependency (node:test). /showcase is public and indexable, so it
 * may list only the current catalogue — HOME_PROJECTS — never the
 * archived shelf that stays reachable but unadvertised (DESIGN.md: "the
 * catalogue is what is real"). SHOWCASE_INDEX remains the full film
 * record for the case pages; CURRENT_SHOWCASE is the curated view the
 * page renders, and this suite pins it to the catalogue so a paused or
 * retired project cannot reappear on the indexable page. The parity is
 * pinned here rather than by import because showcase-films.ts stays a
 * pure module that node:test imports directly.
 *
 * Run: `node --test tests/showcase-catalogue.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { CURRENT_SHOWCASE } from "../src/lib/showcase-films.ts";
import { ARCHIVED_PROJECTS, HOME_PROJECTS } from "../src/lib/home-projects.ts";

const publicFile = (p: string) => new URL(`../public${p}`, import.meta.url);

test("every current showcase entry matches an advertised HOME_PROJECTS row", () => {
  for (const entry of CURRENT_SHOWCASE) {
    const project = HOME_PROJECTS.find((p) => p.href === entry.href);
    assert.ok(project, `${entry.name} (${entry.href}) is not in HOME_PROJECTS`);
    assert.equal(entry.name, project.name);
    assert.equal(entry.kind, project.category);
    assert.equal(entry.status, project.status);
  }
});

test("no current showcase entry names archived work", () => {
  for (const entry of CURRENT_SHOWCASE) {
    assert.ok(
      !ARCHIVED_PROJECTS.some(
        (p) => p.href === entry.href || p.name === entry.name,
      ),
      `${entry.name} is archived and must not be listed on /showcase`,
    );
  }
});

test("the current showcase is exactly the filmed catalogue products", () => {
  assert.deepEqual(
    CURRENT_SHOWCASE.map((e) => e.href),
    [
      "/portfolio/tic-tac-toe-disappear",
      "/portfolio/qart",
      "/portfolio/putarenfe",
    ],
  );
  assert.ok(
    !CURRENT_SHOWCASE.some((e) => e.href === "/portfolio/bloxs"),
    "bloxs.mp4 is the old guest-site kit, not the component-library prototype",
  );
});

test("every listed film ships an mp4 and a poster", () => {
  for (const entry of CURRENT_SHOWCASE) {
    for (const p of [entry.film.mp4, entry.film.poster]) {
      assert.ok(existsSync(publicFile(p)), `missing public${p}`);
    }
  }
});
