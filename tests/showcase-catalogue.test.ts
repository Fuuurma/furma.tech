/**
 * /showcase is public and indexable, so it lists the current catalogue —
 * films for the products HOME_PROJECTS advertises — never the archived
 * shelf. DESIGN.md ("The catalogue is what is real"): archived projects
 * stay reachable but are not listed, linked, counted or submitted.
 *
 * Run: `node --test tests/showcase-catalogue.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { CURRENT_SHOWCASE } from "../src/lib/showcase-films.ts";
import { ARCHIVED_PROJECTS, HOME_PROJECTS } from "../src/lib/home-projects.ts";

const publicFile = (p: string) => new URL(`../public${p}`, import.meta.url);

test("every showcased film is a current catalogue product", () => {
  for (const entry of CURRENT_SHOWCASE) {
    const project = HOME_PROJECTS.find((p) => p.href === entry.href);
    assert.ok(
      project,
      `${entry.name} (${entry.href}) has no HOME_PROJECTS entry`,
    );
    assert.equal(entry.name, project.name);
    assert.equal(entry.kind, project.category);
    assert.equal(entry.status, project.status);
  }
});

test("no showcased film is archived work", () => {
  for (const entry of CURRENT_SHOWCASE) {
    assert.ok(
      !ARCHIVED_PROJECTS.some(
        (p) => p.href === entry.href || p.name === entry.name,
      ),
      `${entry.name} is archived, not current`,
    );
  }
});

test("the current set is exactly the filmed catalogue products", () => {
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
    "bloxs.mp4 is the old guest-site kit, not the component library",
  );
});

test("every showcased film ships an mp4 and a poster", () => {
  for (const entry of CURRENT_SHOWCASE) {
    for (const p of [entry.film.mp4, entry.film.poster]) {
      assert.ok(existsSync(publicFile(p)), `missing public${p}`);
    }
  }
});
