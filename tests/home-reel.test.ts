/**
 * The section reel bar is only as honest as the indices behind it.
 *
 * PlasticHome scrolls a stack of panels — hero, portfolio index, one per
 * project, contact, footer — and the reel bar offers a shortcut to every
 * panel but the hero. home-reel.ts owns the numbering both sides must
 * agree on: HOME_SECTION places each panel, buildHomeReelItems prints one
 * reel entry per reachable panel, and reelIndexForSection translates a
 * panel position back into a reel position. Nothing but this suite keeps
 * the three honest when SECTIONS grows or moves.
 *
 * What this suite pins:
 *
 * - HOME_SECTION numbers the panels the way SECTIONS stacks them: hero at
 *   0, the index at 1, projects from 2, contact and footer closing, and a
 *   total of four frames plus one per project.
 * - buildHomeReelItems prints one entry per non-hero panel, in panel
 *   order, numbered 00 upward, each pointing at its own sectionIndex.
 * - reelIndexForSection maps a panel position to its reel entry — and the
 *   hero, which has no entry, maps to -1 so callers know the bar has
 *   nothing to mark.
 * - PlasticHome's SECTIONS literal still stacks hero, portfolio-index, the
 *   project spread, contact, footer — the order every index assumes.
 *
 * home-reel.ts reaches HOME_PROJECTS through the bundler's `@/` alias,
 * which Node's runner cannot resolve; the hooks below teach it the same
 * mapping the bundler uses, then the real module is imported untouched.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { HOME_PROJECTS } from "../src/lib/home-projects.ts";

const read = (path: string): string =>
  readFileSync(fileURLToPath(new URL(path, import.meta.url)), "utf8");

const SRC_DIR = fileURLToPath(new URL("../src/", import.meta.url));

const ALIAS_HOOKS = `
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
const SRC = ${JSON.stringify(SRC_DIR)};
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const rel = specifier.slice(2);
    for (const candidate of [
      rel + ".ts",
      rel + ".tsx",
      rel + "/index.ts",
      rel + "/index.tsx",
    ]) {
      const path = SRC + candidate;
      if (existsSync(path)) {
        return { url: pathToFileURL(path).href, shortCircuit: true };
      }
    }
  }
  return next(specifier, context);
}
`;

register(`data:text/javascript,${encodeURIComponent(ALIAS_HOOKS)}`);

const { HOME_SECTION, buildHomeReelItems, reelIndexForSection } =
  await import("../src/lib/home-reel.ts");

const PROJECT_COUNT = HOME_PROJECTS.length;
const REEL_LENGTH = PROJECT_COUNT + 3;

const plasticHome = read("../src/components/home/PlasticHome.tsx");

test("HOME_SECTION numbers the panels the way SECTIONS stacks them", () => {
  assert.equal(HOME_SECTION.hero, 0);
  assert.equal(HOME_SECTION.portfolioIndex, 1);
  assert.equal(HOME_SECTION.firstProject, 2);
  assert.equal(HOME_SECTION.contact, PROJECT_COUNT + 2);
  assert.equal(HOME_SECTION.footer, PROJECT_COUNT + 3);
  assert.equal(HOME_SECTION.total, 4 + HOME_PROJECTS.length);
});

test("buildHomeReelItems prints one numbered entry per non-hero panel", () => {
  const items = buildHomeReelItems();

  assert.equal(items.length, REEL_LENGTH);
  assert.deepEqual(
    items.map((item) => item.id),
    [
      "portfolio-index",
      ...HOME_PROJECTS.map((project) => project.id),
      "contact",
      "footer",
    ],
  );
  assert.deepEqual(
    items.map((item) => item.title),
    [
      "Portfolio",
      ...HOME_PROJECTS.map((project) => project.name),
      "Contact",
      "Studio",
    ],
  );
  assert.deepEqual(
    items.map((item) => item.count),
    Array.from({ length: REEL_LENGTH }, (_, i) =>
      String(i).padStart(2, "0"),
    ),
  );
  assert.deepEqual(
    items.map((item) => item.sectionIndex),
    Array.from({ length: REEL_LENGTH }, (_, i) => i + 1),
  );
});

test("the reel's fixed entries keep their words and their panels", () => {
  const items = buildHomeReelItems();

  assert.deepEqual(items[0], {
    id: "portfolio-index",
    title: "Portfolio",
    count: "00",
    sectionIndex: 1,
  });
  assert.deepEqual(items[items.length - 2], {
    id: "contact",
    title: "Contact",
    count: String(PROJECT_COUNT + 1).padStart(2, "0"),
    sectionIndex: PROJECT_COUNT + 2,
  });
  assert.deepEqual(items[items.length - 1], {
    id: "footer",
    title: "Studio",
    count: String(PROJECT_COUNT + 2).padStart(2, "0"),
    sectionIndex: PROJECT_COUNT + 3,
  });
});

test("reelIndexForSection maps panels to reel entries and back", () => {
  const items = buildHomeReelItems();

  assert.equal(
    reelIndexForSection(HOME_SECTION.hero, items),
    -1,
    "the hero has no reel entry",
  );
  for (let section = 1; section < HOME_SECTION.total; section += 1) {
    assert.equal(
      reelIndexForSection(section, items),
      section - 1,
      `section ${section} should sit at reel position ${section - 1}`,
    );
  }
  assert.equal(reelIndexForSection(HOME_SECTION.total, items), -1);
  assert.equal(reelIndexForSection(-1, items), -1);

  items.forEach((item, index) => {
    assert.equal(
      reelIndexForSection(item.sectionIndex, items),
      index,
      `reel entry ${index} should point back at itself`,
    );
  });
});

test("PlasticHome SECTIONS keeps hero, index, projects, contact, footer order", () => {
  const start = plasticHome.indexOf("const SECTIONS = [");
  const end = plasticHome.indexOf("];", start);
  assert.ok(start !== -1, "SECTIONS literal not found in PlasticHome");
  assert.ok(end !== -1, "SECTIONS literal is not closed in PlasticHome");
  const block = plasticHome.slice(start, end);

  const positionOf = (pattern: RegExp): number => {
    const match = block.match(pattern);
    assert.ok(match, `SECTIONS is missing ${pattern}`);
    return match.index ?? -1;
  };

  const hero = positionOf(/\{\s*id:\s*"hero"/);
  const index = positionOf(/\{\s*id:\s*"portfolio-index"/);
  const projects = positionOf(/\.\.\.HOME_PROJECTS\.map/);
  const contact = positionOf(/\{\s*id:\s*"contact"/);
  const footer = positionOf(/\{\s*id:\s*"footer"/);

  assert.ok(
    hero < index &&
      index < projects &&
      projects < contact &&
      contact < footer,
    "SECTIONS must stack hero, portfolio-index, the project spread, " +
      "contact, footer — the order HOME_SECTION assumes",
  );
  assert.ok(
    /type:\s*"project"/.test(block.slice(projects, contact)),
    "the project spread must type its panels as projects",
  );
  assert.equal(
    (block.match(/\{\s*id:\s*"/g) ?? []).length,
    4,
    "SECTIONS must hold exactly four literal panels around the spread",
  );
});
