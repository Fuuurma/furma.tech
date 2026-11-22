import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { HOME_PROJECTS, ARCHIVED_PROJECTS } from "../src/lib/home-projects.ts";
import { CURRENT_SHOWCASE } from "../src/lib/showcase-films.ts";

const pageSource = readFileSync(
  new URL("../src/app/showcase/page.tsx", import.meta.url),
  "utf8",
);
const smokeSource = readFileSync(
  new URL("../scripts/smoke.mjs", import.meta.url),
  "utf8",
);
const publicFile = (p: string) => new URL(`../public${p}`, import.meta.url);

const FILMED_HREFS = [
  "/portfolio/tic-tac-toe-disappear",
  "/portfolio/qart",
  "/portfolio/putarenfe",
];

test("/showcase lists the filmed catalogue projects in HOME_PROJECTS order", () => {
  const catalogueOrder = HOME_PROJECTS.filter((p) =>
    FILMED_HREFS.includes(p.href),
  ).map((p) => p.href);
  assert.deepEqual(CURRENT_SHOWCASE.map((e) => e.href), catalogueOrder);
  assert.deepEqual(CURRENT_SHOWCASE.map((e) => e.href), FILMED_HREFS);
});

test("each film entry matches its HOME_PROJECTS row", () => {
  for (const entry of CURRENT_SHOWCASE) {
    const project = HOME_PROJECTS.find((p) => p.href === entry.href);
    assert.ok(project, `no HOME_PROJECTS row for ${entry.href}`);
    assert.equal(entry.name, project.name);
    assert.equal(entry.kind, project.category);
    assert.equal(entry.status, project.status);
  }
});

test("no film entry is an archived project", () => {
  for (const entry of CURRENT_SHOWCASE) {
    for (const archived of ARCHIVED_PROJECTS) {
      assert.notEqual(entry.href, archived.href);
      assert.notEqual(entry.name, archived.name);
    }
  }
});

test("every listed film ships an mp4 and a poster", () => {
  for (const entry of CURRENT_SHOWCASE) {
    for (const p of [entry.film.mp4, entry.film.poster]) {
      assert.ok(existsSync(publicFile(p)), `missing public${p}`);
    }
  }
});

test("the showcase page renders CURRENT_SHOWCASE, not the full index", () => {
  assert.ok(pageSource.includes("CURRENT_SHOWCASE"));
  assert.ok(!pageSource.includes("SHOWCASE_INDEX"));
});

test("the page h1 and the smoke gate agree on the heading", () => {
  const tag = pageSource.match(/<SplitReveal\b[^>]*>/)?.[0] ?? "";
  const pageH1 = /as="h1"/.test(tag)
    ? tag.match(/text="([^"]+)"/)?.[1]
    : undefined;
  const smokeHeading = smokeSource.match(
    /path:\s*"\/showcase",\s*heading:\s*"([^"]+)"/,
  )?.[1];
  assert.ok(pageH1, "no SplitReveal h1 text found in the showcase page");
  assert.ok(smokeHeading, "no /showcase heading found in smoke.mjs");
  assert.equal(pageH1, smokeHeading);
});
