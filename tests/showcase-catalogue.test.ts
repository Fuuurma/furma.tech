/**
 * /showcase catalogue contract.
 *
 * Zero-dependency (node:test). /showcase is public and indexable, so it
 * may list only the current catalogue — a film for each HOME_PROJECTS
 * product that has one. The full film shelf (SHOWCASE_INDEX, archived
 * and retired work included) stays reachable for case pages but is
 * never listed, per DESIGN.md "the catalogue is what is real".
 * Parity with HOME_PROJECTS is pinned here because showcase-films.ts is
 * a pure lib module that node:test imports directly and cannot import
 * home-projects itself.
 *
 * Run: `node --test tests/showcase-catalogue.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { CURRENT_SHOWCASE } from "../src/lib/showcase-films.ts";
import { ARCHIVED_PROJECTS, HOME_PROJECTS } from "../src/lib/home-projects.ts";

const publicFile = (p: string) => new URL(`../public${p}`, import.meta.url);
const showcasePage = readFileSync(
  new URL("../src/app/showcase/page.tsx", import.meta.url),
  "utf8",
);

test("every listed film matches a HOME_PROJECTS entry by href", () => {
  for (const e of CURRENT_SHOWCASE) {
    const home = HOME_PROJECTS.find((p) => p.href === e.href);
    assert.ok(home, `${e.name} (${e.href}) is not in HOME_PROJECTS`);
    assert.equal(e.name, home.name);
    assert.equal(e.kind, home.category);
    assert.equal(e.status, home.status);
  }
});

test("no listed film is an archived project", () => {
  for (const e of CURRENT_SHOWCASE) {
    assert.ok(
      !ARCHIVED_PROJECTS.some((p) => p.href === e.href || p.name === e.name),
      `${e.name} is archived but listed on /showcase`,
    );
  }
});

test("the listed set is exactly the filmed catalogue products", () => {
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
    "bloxs.mp4 is the old furma.bloxs kit, not the current prototype",
  );
});

test("each listed film ships an mp4 and a poster", () => {
  for (const e of CURRENT_SHOWCASE) {
    for (const p of [e.film.mp4, e.film.poster]) {
      assert.ok(existsSync(publicFile(p)), `missing public${p}`);
    }
  }
});

test("/showcase renders CURRENT_SHOWCASE, not the full film shelf", () => {
  assert.match(showcasePage, /CURRENT_SHOWCASE\.map/);
  assert.match(showcasePage, /CURRENT_SHOWCASE\.length\} films/);
  assert.doesNotMatch(showcasePage, /SHOWCASE_INDEX\.map/);
});

test("/showcase copy presents the current catalogue", () => {
  assert.match(showcasePage, /Current work, in motion/);
  assert.match(
    showcasePage,
    /one short film for each\s+product that has one, plus the studio reel/,
  );
  assert.match(showcasePage, /studio's work in one cut/);
  assert.match(
    showcasePage,
    /current catalogue in motion: product films and the studio reel/,
  );
});
