import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ARCHIVED_PROJECTS,
  HOME_PROJECTS,
} from "../src/lib/home-projects.ts";
import { V2_PROJECTS, V2_STATS } from "../src/lib/v2-projects.ts";

const STAGE_LABEL: Record<string, RegExp | undefined> = {
  Beta: /^beta$/i,
  Prototype: /^prototype$/i,
  "In Development": /^in dev(elopment)?$/i,
};

test("v2 work rows carry the HOME_PROJECTS hrefs in order", () => {
  assert.deepEqual(
    V2_PROJECTS.map((p) => p.href),
    HOME_PROJECTS.map((p) => p.href),
  );
});

test("v2 ids are the HOME_PROJECTS ids as a set", () => {
  const homeIds = HOME_PROJECTS.map((p) => p.id);
  const v2Ids = V2_PROJECTS.map((p) => p.id);
  assert.equal(v2Ids.length, homeIds.length);
  assert.equal(new Set(v2Ids).size, v2Ids.length);
  assert.deepEqual([...v2Ids].sort(), [...homeIds].sort());
});

test("v2 name and category come from HOME_PROJECTS", () => {
  assert.deepEqual(
    V2_PROJECTS.map((p) => p.name),
    HOME_PROJECTS.map((p) => p.name),
  );
  assert.deepEqual(
    V2_PROJECTS.map((p) => p.category),
    HOME_PROJECTS.map((p) => p.category),
  );
});

test("every HOME status maps to a v2 statusLabel naming the same stage", () => {
  const v2ByHref = new Map(V2_PROJECTS.map((p) => [p.href, p]));
  for (const home of HOME_PROJECTS) {
    const stage = STAGE_LABEL[home.status];
    assert.ok(stage, `no v2 status contract for HOME status "${home.status}"`);
    const v2 = v2ByHref.get(home.href);
    assert.ok(v2, `no v2 row for ${home.href}`);
    assert.match(
      v2.statusLabel,
      stage,
      `${home.id}: statusLabel "${v2.statusLabel}" does not name "${home.status}"`,
    );
  }
});

test("no archived project appears in the v2 catalogue", () => {
  const archivedHrefs = new Set(ARCHIVED_PROJECTS.map((p) => p.href));
  const archivedIds = new Set(ARCHIVED_PROJECTS.map((p) => p.id));
  for (const p of V2_PROJECTS) {
    assert.ok(!archivedHrefs.has(p.href), `${p.id} href is archived`);
    assert.ok(!archivedIds.has(p.id), `${p.id} id is archived`);
  }
});

test("V2_STATS product count equals HOME_PROJECTS.length", () => {
  const products = V2_STATS.find((s) => s.label === "Products in the workshop");
  assert.ok(products, "V2_STATS has no products stat");
  assert.equal(products.value, HOME_PROJECTS.length);
});
