#!/usr/bin/env node
/**
 * Black-box runtime smoke gate for furma.tech (VAL-STATIC-FUR-001 / 005 / 006).
 *
 * Zero-dependency (Node 24 global fetch + node:assert). Start the production
 * server first, then run:
 *
 *   node scripts/smoke.mjs [base-url]
 *
 * The default base URL is the port `pnpm start` binds, read from package.json's
 * start script — not a copy of the number. Three copies of a port once lived
 * here (3271), in the CI workflow (4080) and in the start script (3080), and
 * every one of them drifted from the others.
 *
 * Asserts that every required content route serves 200 with the main landmark
 * + a heading, that /v2 stays noindex, that the sitemap lists the canonical
 * portfolio routes and excludes /v2, that the /og OG ImageResponse route serves
 * 200 image/png, and that the landing contact surface + direct mailto
 * alternative are present.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);
const startPort = pkg.scripts.start.match(/--port (\d+)/)?.[1];
if (!startPort) {
  throw new Error(
    `no --port in the start script: ${pkg.scripts.start}. The smoke gate ` +
      `cannot guess which port the server binds.`,
  );
}
const baseUrl = (process.argv[2] ?? `http://127.0.0.1:${startPort}`).replace(/\/$/, "");

async function get(path, { headers } = {}) {
  const response = await fetch(`${baseUrl}${path}`, { headers });
  const text = await response.text();
  return { status: response.status, text, response };
}

function must(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const REQUIRED_ROUTES = [
  { path: "/", heading: "furma.tech" },
  { path: "/portfolio", heading: "products" },
  { path: "/portfolio/aitlas", heading: "Aitlas" },
  { path: "/portfolio/restauramanager", heading: "restauManager" },
  { path: "/privacy", heading: "Privacy policy" },
];

let failures = 0;

for (const route of REQUIRED_ROUTES) {
  try {
    const { status, text } = await get(route.path);
    assert.equal(status, 200, `${route.path} should be 200`);
    must(text.includes('id="main-content"'), `${route.path} missing main#main-content`);
    must(text.includes(route.heading), `${route.path} missing heading "${route.heading}"`);
    console.log(`  ok  ${route.path} (200, main landmark + heading)`);
  } catch (error) {
    failures += 1;
    console.error(`  FAIL ${route.path}: ${error.message}`);
  }
}

// /v2 must remain explicitly noindex,nofollow and must NOT be a canonical page.
try {
  const { status, text } = await get("/v2");
  assert.equal(status, 200, "/v2 should be 200");
  must(
    /<meta name="robots" content="noindex,\s*nofollow"\s*\/>/.test(text),
    "/v2 must declare noindex,nofollow",
  );
  console.log("  ok  /v2 (200, noindex,nofollow)");
} catch (error) {
  failures += 1;
  console.error(`  FAIL /v2: ${error.message}`);
}

// Sitemap must include canonical portfolio routes and exclude /v2.
try {
  const { status, text } = await get("/sitemap.xml");
  assert.equal(status, 200, "/sitemap.xml should be 200");
  must(text.includes("/portfolio/aitlas"), "sitemap missing /portfolio/aitlas");
  must(
    text.includes("/portfolio/restauramanager"),
    "sitemap missing /portfolio/restauramanager",
  );
  must(!text.includes("/v2"), "sitemap must not include /v2");
  console.log("  ok  /sitemap.xml (canonical portfolio routes, no /v2)");
} catch (error) {
  failures += 1;
  console.error(`  FAIL /sitemap.xml: ${error.message}`);
}

// Landing contact surface must exist and offer the direct mailto alternative.
try {
  const { text } = await get("/");
  must(text.includes('id="contact"'), "landing missing contact section");
  must(
    text.includes("mailto:hello@furma.tech"),
    "landing missing direct mailto alternative",
  );
  // Contact labels must be associated with inputs (a11y contract evidence).
  must(
    text.includes('for="contact-name"') && text.includes('id="contact-name"'),
    "contact name field must be labelled",
  );
  console.log("  ok  / contact section + mailto alternative + labelled fields");
} catch (error) {
  failures += 1;
  console.error(`  FAIL / contact: ${error.message}`);
}

// /og OG ImageResponse route must serve 200 image/png (social previews).
try {
  const { status, response } = await get("/og");
  assert.equal(status, 200, "/og should be 200");
  must(
    (response.headers.get("content-type") ?? "").startsWith("image/png"),
    "/og must return image/png",
  );
  console.log("  ok  /og (200, image/png)");
} catch (error) {
  failures += 1;
  console.error(`  FAIL /og: ${error.message}`);
}

if (failures > 0) {
  console.error(`\n${failures} smoke check(s) failed against ${baseUrl}`);
  process.exit(1);
}
console.log(`\nAll furma.tech smoke checks passed against ${baseUrl}`);
