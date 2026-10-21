/**
 * The sitemap must not claim that the site changes on every build.
 *
 * The generator stamped every URL with `new Date()` — the BUILD time — so
 * the whole site looked freshly modified on every deploy, and no entry
 * carried a truthful "this content changed then" signal. A `lastModified`
 * that moves on every build is noise to a crawler, and an untrustworthy one
 * is ignored outright.
 *
 * None of these pages has a content-modified date (the portfolio entries
 * come from HOME_PROJECTS, which carries none), so the field is omitted
 * rather than invented. The URL set, the change frequencies and the
 * priorities are unchanged — only the false dates are gone.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSitemap } from "../src/lib/sitemap.ts";
import { HOME_PROJECTS } from "../src/lib/home-projects.ts";

const BASE = "https://furma.tech";

test("sitemap: no entry claims a lastModified date", () => {
  for (const entry of buildSitemap(BASE, HOME_PROJECTS)) {
    assert.equal(
      entry.lastModified,
      undefined,
      `${entry.url} carries a lastModified — the build time is not a content date`,
    );
  }
});

test("sitemap: the URL set is preserved", () => {
  const urls = buildSitemap(BASE, HOME_PROJECTS).map((entry) => entry.url);
  assert.deepEqual(urls, [
    BASE,
    `${BASE}/portfolio`,
    `${BASE}/privacy`,
    `${BASE}/portfolio/aitlas`,
    `${BASE}/portfolio/aitlas/nova`,
    `${BASE}/portfolio/aitlas/nexus`,
    `${BASE}/portfolio/aitlas/agents`,
    ...HOME_PROJECTS.filter((p) => p.id !== "aitlas").map(
      (p) => `${BASE}${p.href}`,
    ),
  ]);
});

test("sitemap: the change frequencies and priorities are preserved", () => {
  const entries = buildSitemap(BASE, HOME_PROJECTS);
  const byUrl = new Map(entries.map((e) => [e.url, e]));
  assert.equal(byUrl.get(BASE)?.priority, 1);
  assert.equal(byUrl.get(BASE)?.changeFrequency, "weekly");
  assert.equal(byUrl.get(`${BASE}/portfolio`)?.priority, 0.9);
  assert.equal(byUrl.get(`${BASE}/privacy`)?.changeFrequency, "yearly");
  assert.equal(byUrl.get(`${BASE}/privacy`)?.priority, 0.3);
  assert.equal(byUrl.get(`${BASE}/portfolio/aitlas/nova`)?.priority, 0.8);
  assert.equal(
    byUrl.get(`${BASE}/portfolio/${HOME_PROJECTS[1].id}`)?.priority,
    0.7,
  );
});
