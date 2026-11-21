/**
 * Studio identity copy contract.
 *
 * Zero-dependency (node:test). DESIGN.md retired the two-vertical story —
 * "industry-grade SaaS tools and the Aitlas AI ecosystem", "Two verticals:
 * B2B SaaS + Aitlas AI ecosystem", "Bootstrapped venture studio" — for a
 * digital studio building games, tools and civic tech. This suite pins the
 * shared STUDIO_* constants in src/lib/metadata.ts and their wiring into
 * every public surface that repeats the identity: root metadata and
 * JSON-LD, the OG card, the site footer, privacy and the styleguide demo.
 *
 * Run: `node --test tests/studio-copy.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  STUDIO_DESCRIPTION,
  STUDIO_DESCRIPTION_SHORT,
  STUDIO_FOOTER_LINE,
  STUDIO_KEYWORDS,
  STUDIO_WHO_WE_ARE,
  constructMetadata,
} from "../src/lib/metadata.ts";

const COPY_STRINGS = {
  STUDIO_DESCRIPTION,
  STUDIO_DESCRIPTION_SHORT,
  STUDIO_FOOTER_LINE,
  STUDIO_WHO_WE_ARE,
} as const;

const SURFACES = [
  "src/lib/metadata.ts",
  "src/app/layout.tsx",
  "src/app/og/route.tsx",
  "src/components/studio/StudioSiteFooter.tsx",
  "src/app/privacy/page.tsx",
  "src/app/styleguide/page.tsx",
] as const;

const RETIRED_PHRASES = [
  "Aitlas AI ecosystem",
  "industry-grade SaaS",
  "Two verticals",
  "B2B SaaS",
  "Bootstrapped venture studio",
] as const;

test("each studio copy string names games, tools and civic tech", () => {
  for (const [name, copy] of Object.entries(COPY_STRINGS)) {
    assert.match(copy, /games/i, `${name} must name games`);
    assert.match(copy, /tools/i, `${name} must name tools`);
    assert.match(copy, /civic tech/i, `${name} must name civic tech`);
  }
});

test("no studio copy string revives the retired story", () => {
  for (const [name, copy] of Object.entries(COPY_STRINGS)) {
    assert.doesNotMatch(
      copy,
      /saas|aitlas|mcp|venture/i,
      `${name} still carries retired positioning`,
    );
  }
});

test("STUDIO_KEYWORDS covers the studio's kinds and drops retired terms", () => {
  const lower = STUDIO_KEYWORDS.map((keyword) => keyword.toLowerCase());
  for (const keyword of ["games", "tools", "civic tech"]) {
    assert.ok(lower.includes(keyword), `keywords missing "${keyword}"`);
  }
  for (const keyword of lower) {
    assert.doesNotMatch(
      keyword,
      /aitlas|saas|mcp/,
      `keyword "${keyword}" is retired`,
    );
  }
});

test("no public surface carries the retired two-vertical phrases", () => {
  for (const file of SURFACES) {
    const source = readFileSync(file, "utf8");
    for (const phrase of RETIRED_PHRASES) {
      assert.ok(
        !source.includes(phrase),
        `${file} still contains the retired phrase "${phrase}"`,
      );
    }
  }
});

test("constructMetadata defaults to the studio description", () => {
  assert.equal(constructMetadata().description, STUDIO_DESCRIPTION);
});

test("every surface is wired to the shared studio constants", () => {
  const layout = readFileSync("src/app/layout.tsx", "utf8");
  assert.match(layout, /description:\s*STUDIO_DESCRIPTION\b/);
  assert.match(layout, /keywords:\s*STUDIO_KEYWORDS\b/);
  assert.match(layout, /STUDIO_DESCRIPTION_SHORT/);

  const metadata = readFileSync("src/lib/metadata.ts", "utf8");
  assert.match(metadata, /description\s*=\s*STUDIO_DESCRIPTION\b/);

  const og = readFileSync("src/app/og/route.tsx", "utf8");
  assert.ok(og.includes("STUDIO_DESCRIPTION"));

  const footer = readFileSync(
    "src/components/studio/StudioSiteFooter.tsx",
    "utf8",
  );
  assert.ok(footer.includes("STUDIO_FOOTER_LINE"));

  const privacy = readFileSync("src/app/privacy/page.tsx", "utf8");
  assert.ok(privacy.includes("STUDIO_WHO_WE_ARE"));

  const styleguide = readFileSync("src/app/styleguide/page.tsx", "utf8");
  assert.ok(styleguide.includes("STUDIO_DESCRIPTION_SHORT"));
});
