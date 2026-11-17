/**
 * Styleguide route contracts (FT-DEEP-06).
 *
 * Zero-dependency (node:test). Pins the decisions that keep the component
 * showcase out of the index and hydration-stable:
 *  - a server layout exports a real title + noindex/nofollow robots (the
 *    client page cannot export metadata itself);
 *  - robots.ts disallows /styleguide for every crawler, not only AI bots;
 *  - the page never seeds state from wall-clock new Date() (SSR/CSR drift);
 *  - the calendar's month formatter never falls back to the ambient locale.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const layout = read("src/app/styleguide/layout.tsx");
const page = read("src/app/styleguide/page.tsx");
const robots = read("src/app/robots.ts");
const calendar = read("src/components/ui/calendar.tsx");

test("the route is noindexed and titled for what it is", () => {
  assert.match(layout, /robots:\s*{[^}]*index:\s*false/s);
  assert.match(layout, /title:\s*"Styleguide — Furma\.tech"/);
});

test("robots.txt disallows /styleguide for all crawlers", () => {
  const wildcard = robots.match(/userAgent:\s*'\*'[^}]*disallow:\s*\[([^\]]*)\]/s);
  assert.ok(wildcard, "no wildcard disallow block");
  assert.match(wildcard[1], /'\/styleguide'/);
});

test("page state never seeds from wall-clock time", () => {
  assert.doesNotMatch(page, /useState[^=]*=\s*\(?new Date\(\)/);
});

test("calendar month labels use a deterministic locale", () => {
  assert.match(calendar, /toLocaleString\(locale\?\.code \?\? "en-US"/);
});
