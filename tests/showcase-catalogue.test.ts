/**
 * Showcase catalogue contracts: /showcase is public and indexable, so it
 * may list only the current catalogue — never the archived shelf. The
 * parity with HOME_PROJECTS is pinned here because showcase-films.ts
 * stays a pure module that node:test imports directly.
 *
 * Run: `node --test tests/showcase-catalogue.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { CURRENT_SHOWCASE } from "../src/lib/showcase-films.ts";
import { ARCHIVED_PROJECTS, HOME_PROJECTS } from "../src/lib/home-projects.ts";

const publicFile = (p: string) => new URL(`../public${p}`, import.meta.url);

test("every showcased film matches a current catalogue entry", () => {
  for (const entry of CURRENT_SHOWCASE) {
    const project = HOME_PROJECTS.find((p) => p.href === entry.href);
    assert.ok(project, `${entry.name} (${entry.href}) is not in HOME_PROJECTS`);
    assert.equal(entry.name, project.name, `${entry.href} name drifted`);
    assert.equal(entry.kind, project.category, `${entry.href} kind drifted`);
    assert.equal(entry.status, project.status, `${entry.href} status drifted`);
  }
});

test("no showcased film is archived work", () => {
  for (const entry of CURRENT_SHOWCASE) {
    assert.ok(
      !ARCHIVED_PROJECTS.some(
        (p) => p.href === entry.href || p.name === entry.name,
      ),
      `${entry.name} (${entry.href}) matches an archived project`,
    );
  }
});

test("the showcase lists exactly the filmed current products", () => {
  assert.deepEqual(
    CURRENT_SHOWCASE.map((e) => e.href).sort(),
    [
      "/portfolio/putarenfe",
      "/portfolio/qart",
      "/portfolio/tic-tac-toe-disappear",
    ],
  );
  assert.ok(
    !CURRENT_SHOWCASE.some((e) => e.href === "/portfolio/bloxs"),
    "bloxs.mp4 is the old furma.bloxs guest-site kit, not the component library",
  );
});

test("every showcased film ships an mp4 and a poster", () => {
  for (const entry of CURRENT_SHOWCASE) {
    for (const p of [entry.film.mp4, entry.film.poster]) {
      assert.ok(existsSync(publicFile(p)), `missing public${p}`);
    }
  }
});
