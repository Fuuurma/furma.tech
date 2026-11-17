/**
 * Showcase film contracts: every portfolio case page that passes a
 * projectId has a film, and every registered film ships all three files.
 *
 * Run: `node --test tests/showcase-films.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { SHOWCASE_FILMS, SHOWCASE_INDEX, STUDIO_REEL } from "../src/lib/showcase-films.ts";

const publicFile = (p: string) => new URL(`../public${p}`, import.meta.url);

test("every registered film ships an mp4 and a poster", () => {
  for (const film of [
    ...Object.values(SHOWCASE_FILMS),
    ...SHOWCASE_INDEX.map((e) => e.film),
    STUDIO_REEL,
  ]) {
    for (const p of [film.mp4, film.poster]) {
      assert.ok(existsSync(publicFile(p)), `missing public${p}`);
    }
  }
});

test("every case page projectId has a showcase film", () => {
  const dir = new URL("../src/app/portfolio/", import.meta.url);
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const page = new URL(`${entry.name}/page.tsx`, dir);
    if (!existsSync(page)) continue;
    const id = readFileSync(page, "utf8").match(/projectId="([^"]+)"/)?.[1];
    if (id) assert.ok(SHOWCASE_FILMS[id], `no film for projectId "${id}"`);
  }
});

test("/showcase lists every case-page film and links each case study", () => {
  const listed = new Set(SHOWCASE_INDEX.map((e) => e.film.mp4));
  for (const film of Object.values(SHOWCASE_FILMS)) {
    assert.ok(listed.has(film.mp4), `${film.mp4} missing from SHOWCASE_INDEX`);
  }
  for (const e of SHOWCASE_INDEX.filter((e) => e.href)) {
    const slug = e.href!.replace("/portfolio/", "");
    assert.ok(
      existsSync(new URL(`../src/app/portfolio/${slug}/page.tsx`, import.meta.url)),
      `${e.name} links to missing ${e.href}`,
    );
  }
});
