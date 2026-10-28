/**
 * A link to furma.tech previews with a picture.
 *
 * The share metadata named no image at all, `constructMetadata` pointed at a
 * file that did not exist, and the only image on disk was an SVG — which
 * social platforms do not render. So every shared link was a bare title. The
 * card is a 1200×630 PNG rendered from the real hero, and the site's metadata
 * names it.
 *
 * Run: `node --test "tests/*.test.ts"`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

test("the share image is a 1200×630 PNG", () => {
  const png = readFileSync(here("../public/og.png"));
  assert.deepEqual(
    [...png.subarray(0, 8)],
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    "og.png must be a PNG: platforms do not render SVG",
  );
  assert.equal(png.readUInt32BE(16), 1200, "the card is 1200px wide");
  assert.equal(png.readUInt32BE(20), 630, "the card is 630px tall");
  assert.ok(png.length < 600_000, `the card is a link preview, not a poster (${png.length} bytes)`);
});

test("the site's metadata names the designed card (F99)", () => {
  const layout = readFileSync(here("../src/app/layout.tsx"), "utf8");
  assert.ok(/metadataBase:\s*new URL\("https:\/\/furma\.tech"\)/.test(layout), "relative image URLs need a base");
  // The shared card is the designed asset: public/og.png, the hero render
  // DESIGN.md names. Per-title cards keep the dynamic /og route (pinned in
  // og-metadata.test.ts). Strip comments first: the rationale may NAME the
  // retired template without shipping it.
  const code = layout.replace(/^\/\/.*$/gm, "");
  assert.ok(/openGraph:[\s\S]*?images:\s*\["\/og\.png"\]/.test(code), "Open Graph must name the designed card");
  assert.ok(/twitter:[\s\S]*?images:\s*\["\/og\.png"\]/.test(code), "the Twitter card must name it too");
  assert.ok(!/Digital Venture Studio/.test(code), "the retired studio template must not ride the share card");
  const metadata = readFileSync(here("../src/lib/metadata.ts"), "utf8");
  assert.ok(!/og-image\.svg/.test(metadata), "no metadata may point at the SVG");
});
