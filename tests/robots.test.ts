/**
 * robots.txt contracts (FURMA-TECH-ROBOTS1).
 *
 * This is a JS-rendered Next site: Googlebot has to fetch `/_next/` JS and
 * CSS to render the pages the sitemap submits. The crawl rules disallowed
 * `/_next/` (and `/node_modules/`, which production never serves), so a bot
 * that honoured robots.txt could not render the site it was invited to
 * index. The disallows are gone; the internal paths that are real stay.
 *
 * Zero-dependency (node:test). `src/app/robots.ts` imports the `MetadataRoute`
 * type from Next, so the suite pins the rule blocks in the source rather than
 * importing the module — the same idiom the other chrome contracts use.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync("src/app/robots.ts", "utf8");

/** The quoted paths of every `disallow: [...]` block, in source order. */
function disallowBlocks(): string[][] {
  return [...source.matchAll(/disallow:\s*\[([^\]]*)\]/g)].map((match) =>
    [...match[1].matchAll(/'([^']*)'/g)].map((entry) => entry[1]),
  );
}

test("robots: no rule blocks /_next/ — the crawler needs the build assets", () => {
  assert.ok(
    !source.includes("/_next/"),
    "robots.ts still disallows /_next/; a bot that honours robots.txt cannot render the site",
  );
});

test("robots: no rule blocks /node_modules/, which production never serves", () => {
  assert.ok(
    !source.includes("/node_modules/"),
    "robots.ts still disallows /node_modules/",
  );
});

test("robots: the retained rules are pinned", () => {
  assert.deepEqual(disallowBlocks(), [
    ["/api/", "/styleguide"],
    ["/api/", "/styleguide", "/brand"],
  ]);
});

test("robots: the site is still allowed, and sitemap and host are named", () => {
  assert.match(source, /allow:\s*'\/'/);
  assert.match(source, /`\$\{baseUrl\}\/sitemap\.xml`/);
  assert.match(source, /host:\s*baseUrl/);
});

test("robots: the AI-bot rule still names its agents", () => {
  for (const agent of ["GPTBot", "ClaudeBot", "PerplexityBot", "CCBot"]) {
    assert.ok(source.includes(`'${agent}'`), `robots.ts dropped ${agent}`);
  }
});
