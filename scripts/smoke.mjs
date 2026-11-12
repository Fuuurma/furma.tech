#!/usr/bin/env node
/**
 * Black-box runtime smoke gate for furma.tech (VAL-STATIC-FUR-001 / 005 / 006).
 *
 * Zero-dependency (Node 24 global fetch + node:assert; the one non-node
 * import is src/lib/home-projects.ts, read through Node's type stripping the
 * same way tests/ are). Start the production server first, then run:
 *
 *   node scripts/smoke.mjs [base-url]
 *
 * The default base URL is the port `pnpm start` binds, read from package.json's
 * start script — not a copy of the number. Three copies of a port once lived
 * here (3271), in the CI workflow (4080) and in the start script (3080), and
 * every one of them drifted from the others.
 *
 * Asserts that every required content route serves 200 with the main landmark
 * + a heading — the advertised catalogue (HOME_PROJECTS + /showcase) derived
 * from the honest list itself, so the routes cannot drift from the site —
 * that one archived page stays reachable without being advertised, that /v2
 * stays noindex, that the sitemap lists the canonical catalogue routes and
 * excludes /v2, that every catalogue URL the sitemap lists actually serves,
 * that the /og OG ImageResponse route serves 200 image/png, and that the
 * landing contact surface + direct mailto alternative are present.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOME_PROJECTS } from "../src/lib/home-projects.ts";

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

/**
 * The advertised catalogue's headings, keyed by route. The routes themselves
 * come from HOME_PROJECTS, so the list of covered pages cannot drift from the
 * honest list; only each page's heading string lives here.
 */
const CATALOGUE_HEADINGS = {
  "/portfolio/tic-tac-toe-disappear": "Tic-Tac-Toe Disappear",
  "/portfolio/gambit-deck": "Gambit Deck",
  "/portfolio/pond": "Pond",
  "/portfolio/qart": "QArt",
  "/portfolio/bloxs": "Bloxs",
  "/portfolio/putarenfe": "Renfe",
};

// A project the studio advertises without a heading here would ship through
// this gate unchecked — refuse to run instead.
for (const project of HOME_PROJECTS) {
  if (!(project.href in CATALOGUE_HEADINGS)) {
    throw new Error(
      `HOME_PROJECTS advertises ${project.href} but CATALOGUE_HEADINGS has ` +
        `no heading for it; add one so the catalogue stays covered.`,
    );
  }
}

const REQUIRED_ROUTES = [
  { path: "/", heading: "furma.tech" },
  { path: "/portfolio", heading: "products" },
  { path: "/showcase", heading: "Every product, in motion", strictHeading: true },
  ...HOME_PROJECTS.map((p) => ({
    path: p.href,
    heading: CATALOGUE_HEADINGS[p.href],
    strictHeading: true,
  })),
  // Reachable but unadvertised: aitlas is archived — off the lists and the
  // sitemap — yet must keep serving for anyone holding an old link.
  { path: "/portfolio/aitlas", heading: "Aitlas" },
  { path: "/privacy", heading: "Privacy policy" },
];

/** Escape a heading for the h1 accessible-name regex. */
function headingPattern(heading) {
  return heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

let failures = 0;

for (const route of REQUIRED_ROUTES) {
  try {
    const { status, text } = await get(route.path);
    assert.equal(status, 200, `${route.path} should be 200`);
    must(text.includes('id="main-content"'), `${route.path} missing main#main-content`);
    // Catalogue h1s render through SplitReveal: the accessible heading lives
    // on the h1's aria-label, and the raw string also shows up in <title> and
    // body copy — so a broken h1 must fail even when the words survive
    // elsewhere. Strict routes pin the h1's accessible name itself.
    if (route.strictHeading) {
      must(
        new RegExp(`<h1[^>]*aria-label="${headingPattern(route.heading)}"`).test(text),
        `${route.path} missing h1 heading "${route.heading}"`,
      );
    } else {
      must(text.includes(route.heading), `${route.path} missing heading "${route.heading}"`);
    }
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

// Sitemap must include canonical catalogue routes and exclude /v2.
try {
  const { status, text } = await get("/sitemap.xml");
  assert.equal(status, 200, "/sitemap.xml should be 200");
  // The sitemap carries the projects the site shows, and nothing it has
  // stopped advertising: paused work keeps its page but not a submission.
  const cataloguePaths = ["/showcase", ...HOME_PROJECTS.map((p) => p.href)];
  for (const href of cataloguePaths) {
    must(text.includes(href), `sitemap missing ${href}`);
  }
  must(!text.includes("/portfolio/aitlas"), "the sitemap still advertises paused work");
  must(!text.includes("/v2"), "sitemap must not include /v2");
  // A listed URL that does not serve is worse than a missing one: open every
  // catalogue URL the XML asserts instead of only reading the XML.
  for (const path of cataloguePaths) {
    const opened = await get(path);
    assert.equal(opened.status, 200, `sitemap-listed ${path} should be 200`);
  }
  console.log("  ok  /sitemap.xml (canonical catalogue routes, listed URLs serve, no /v2)");
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
