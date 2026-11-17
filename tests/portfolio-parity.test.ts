/**
 * The product catalogue is written down three times: HOME_PROJECTS drives
 * the landing and portfolio pages, V2_PROJECTS drives "The Workshop", and
 * PROJECT_HERO_MAP decides which hero visual a project id gets. They are
 * separate literals on purpose — but nothing made them agree, so a project
 * could land in one list and silently miss the others: no hero on its
 * cards, no row in the workshop index.
 *
 * This pins id/href parity across all three (status wording is each
 * catalogue's own and deliberately not compared). PROJECT_HERO_MAP cannot
 * be imported under node --test — it pulls the TSX hero components through
 * the "@/" alias — so its keys are read from the source, the same
 * source-pin idiom rate-limit-scopes.test.ts uses for server-actions.ts.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { HOME_PROJECTS } from "../src/lib/home-projects.ts";
import { V2_PROJECTS } from "../src/lib/v2-projects.ts";

const heroesSource = readFileSync(
  fileURLToPath(new URL("../src/lib/project-heroes.ts", import.meta.url)),
  "utf8",
);

/** Keys of the PROJECT_HERO_MAP literal, quoted and bare alike. */
function projectHeroIds(source: string): string[] {
  const lines = source.split("\n");
  const decl = lines.findIndex((line) => line.includes("PROJECT_HERO_MAP"));
  assert.ok(decl >= 0, "project-heroes.ts has no PROJECT_HERO_MAP");
  const ids: string[] = [];
  for (const line of lines.slice(decl + 1)) {
    if (/^\s*\}/.test(line)) break;
    const key = line.match(/^\s*(?:"([^"]+)"|([A-Za-z_$][\w$]*))\s*:/);
    if (key) ids.push(key[1] ?? key[2]);
  }
  return ids;
}

const homeIds = HOME_PROJECTS.map((p) => p.id);
const v2Ids = V2_PROJECTS.map((p) => p.id);
const heroIds = projectHeroIds(heroesSource);
const heroIdSet = new Set(heroIds);
const v2ById = new Map(V2_PROJECTS.map((p) => [p.id, p]));

test("every HOME_PROJECTS id has a PROJECT_HERO_MAP entry", () => {
  for (const project of HOME_PROJECTS) {
    assert.ok(
      heroIdSet.has(project.id),
      `${project.id} has no hero in PROJECT_HERO_MAP`,
    );
  }
});

test("every HOME_PROJECTS id has a V2_PROJECTS row at the same href", () => {
  for (const project of HOME_PROJECTS) {
    const v2 = v2ById.get(project.id);
    assert.ok(v2, `${project.id} has no V2_PROJECTS row`);
    assert.equal(
      v2.href,
      project.href,
      `${project.id}: V2 href ${v2.href} != home href ${project.href}`,
    );
  }
});

test("the three catalogues carry the same project ids", () => {
  assert.deepEqual(
    [...heroIds].sort(),
    [...homeIds].sort(),
    "PROJECT_HERO_MAP keys drifted from HOME_PROJECTS ids",
  );
  assert.deepEqual(
    [...v2Ids].sort(),
    [...homeIds].sort(),
    "V2_PROJECTS ids drifted from HOME_PROJECTS ids",
  );
});

test("project ids are unique within each catalogue", () => {
  for (const [name, ids] of [
    ["HOME_PROJECTS", homeIds],
    ["V2_PROJECTS", v2Ids],
    ["PROJECT_HERO_MAP", heroIds],
  ] as const) {
    assert.equal(
      new Set(ids).size,
      ids.length,
      `${name} repeats an id — ids key the hero map and the routes`,
    );
  }
});
