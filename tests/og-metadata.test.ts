/**
 * Social-preview contracts (FT-DEEP-04).
 *
 * Zero-dependency (node:test). Pins that every OG/Twitter image reference
 * resolves to the real PNG /og route (not the unrasterizable SVG and not
 * the 404 /og.png the dead helper defaulted to), that metadataBase and
 * canonicals exist, and that JSON-LD is emitted by the root layout.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { getOgImageUrl, constructMetadata } from "../src/lib/metadata.ts";

test("getOgImageUrl returns the PNG /og route, never SVG or the dead /og.png", () => {
  const url = getOgImageUrl({ title: "OpenGovern", subtitle: "Direct Democracy", variant: "product" });
  assert.ok(url.startsWith("https://furma.tech/og?"), url);
  assert.ok(!url.endsWith(".svg"), url);
  assert.ok(!url.includes("/og.png"), url);
  assert.ok(url.includes("title=OpenGovern"), url);
  assert.ok(url.includes("subtitle=Direct"), url);
  assert.ok(url.includes("variant=product"), url);
});

test("getOgImageUrl encodes special characters", () => {
  const url = getOgImageUrl({ title: "A & B", subtitle: "x?y" });
  assert.ok(url.includes("A+%26+B") || url.includes("A%20%26%20B"), url);
});

test("the /og route handler exists and renders via ImageResponse", () => {
  const src = readFileSync("src/app/og/route.tsx", "utf8");
  assert.ok(src.includes('from "next/og"') || src.includes("from 'next/og'"));
  assert.ok(src.includes("ImageResponse"));
});

test("constructMetadata carries metadataBase, canonical support, and a live default image", () => {
  const m = constructMetadata({ title: "X", path: "/portfolio/x" });
  assert.equal(m.metadataBase?.toString(), "https://furma.tech/");
  const alt = m.alternates as { canonical?: string } | undefined;
  assert.equal(alt?.canonical, "/portfolio/x");
  const og = m.openGraph as { images?: { url: string }[] };
  const img = og?.images?.[0]?.url ?? "";
  assert.ok(img.startsWith("https://furma.tech/og"), img);
  assert.ok(!img.endsWith(".svg") && !img.includes("/og.png"), img);
});

test("root layout sets metadataBase, canonical, OG image, and JSON-LD", () => {
  const src = readFileSync("src/app/layout.tsx", "utf8");
  assert.ok(src.includes("metadataBase"), "layout.tsx missing metadataBase");
  assert.match(src, /canonical:\s*"\/"/, "layout.tsx missing canonical /");
  assert.match(src, /images:\s*\[OG_IMAGE\]/, "layout.tsx missing OG image");
  assert.ok(src.includes("application/ld+json"), "layout.tsx missing JSON-LD");
});

test("every indexable app page declares a canonical; noindex pages declare none", () => {
  const appDir = "src/app";
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = join(dir, e.name);
      return e.isDirectory() ? walk(p) : [p];
    });
  const metaFiles = walk(appDir).filter((f) => /(page|layout)\.tsx$/.test(f));
  const withMeta = metaFiles.filter((f) => readFileSync(f, "utf8").includes("export const metadata"));
  assert.ok(withMeta.length > 0);
  for (const f of withMeta) {
    const src = readFileSync(f, "utf8");
    const noindex = /robots:\s*\{[^}]*index:\s*false/.test(src);
    const hasCanonical = /alternates:\s*\{\s*canonical/.test(src);
    if (f === join(appDir, "layout.tsx")) {
      assert.ok(hasCanonical, "root layout needs canonical /");
    } else if (noindex) {
      assert.ok(!hasCanonical, `${f} is noindex and must not declare a canonical`);
    } else {
      assert.ok(hasCanonical, `${f} is indexable and must declare a canonical`);
    }
  }
});

test("og-image.svg is no longer referenced anywhere", () => {
  const appSrc = readFileSync("src/lib/metadata.ts", "utf8") + readFileSync("src/app/layout.tsx", "utf8");
  assert.ok(!appSrc.includes("og-image.svg"));
  assert.equal(existsSync("public/og-image.svg"), false);
});
