/**
 * Portfolio marketing-accuracy contracts (FT-CONTENT-01).
 *
 * Zero-dependency (node:test). The tic-tac-toe game's real rule — from its
 * own help text — is "3 marks per player; place a 4th and your oldest
 * vanishes". Every marketing surface must state that rule (never the
 * turn-based "vanishes after each turn" misreading), and the In-Dev
 * detail page must not promise Play in its CTA.
 *
 * Run: `node --test tests/project-copy.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { V2_PROJECTS } from "../src/lib/v2-projects.ts";
import { HOME_PROJECTS } from "../src/lib/home-projects.ts";

const indexNote = V2_PROJECTS.find((p) => p.id === "tic-tac-toe")?.note ?? "";
const homeDescription =
  HOME_PROJECTS.find((p) => p.id === "tic-tac-toe")?.description ?? "";
const detailPage = readFileSync(
  new URL("../src/app/portfolio/tic-tac-toe-disappear/page.tsx", import.meta.url),
  "utf8",
);

test("index note states the 3-piece rule", () => {
  assert.match(indexNote, /3 pieces?/i);
  assert.doesNotMatch(indexNote, /vanish(es)? after each turn/i);
});

test("home card description states the 3-piece rule", () => {
  assert.match(homeDescription, /3-piece/i);
  assert.doesNotMatch(homeDescription, /vanish after each turn/i);
});

test("Detail hero states the 3-piece rule, not turn-based vanishing", () => {
  assert.doesNotMatch(detailPage, /vanish after a set number of turns/i);
  assert.match(detailPage, /only 3 pieces per player/i);
});

test("detail CTA matches In-Dev status (no Play promise)", () => {
  assert.doesNotMatch(detailPage, /Play the vanishing-move variant/i);
  assert.match(detailPage, /Get updates/);
});

// FT-CONTENT-02: QArt is stage=building, so index/home/detail must all
// say In Development like the other building projects — never the
// expired "Coming Soon · Q2 2026" promise, and never three different
// stages at once. (The row text said "roadmap", but the hub STATE and
// sibling convention both say building → In Development; roadmap
// would understate a product with landed slices. Deviation annotated.)

const qartIndex = V2_PROJECTS.find((p) => p.id === "qart");
const qartHome = HOME_PROJECTS.find((p) => p.id === "qart");
const qartDetail = readFileSync(
  new URL("../src/app/portfolio/qart/page.tsx", import.meta.url),
  "utf8",
);

test("QArt index badge says in-dev", () => {
  assert.equal(qartIndex?.status, "in-dev");
});

test("QArt home card says In Development", () => {
  assert.equal(qartHome?.status, "In Development");
});

test("QArt detail badge says In Development with no expired date", () => {
  assert.doesNotMatch(qartDetail, /Q2 2026/);
  assert.doesNotMatch(qartDetail, /Coming Soon/);
  assert.match(qartDetail, /label: "In Development", variant: "beta"/);
});

// FT-CONTENT-03: numeric marketing claims must read as labeled
// estimates/targets unless a measurement backs them. Neither claim has
// one: guides-tours has no time-savings study, and FinanceHub is a
// parked gh-only repo — so both stay on the page as qualified claims,
// never bare facts.

const guidetoursDetail = readFileSync(
  new URL("../src/app/portfolio/guidetours/page.tsx", import.meta.url),
  "utf8",
);
const financehubDetail = readFileSync(
  new URL("../src/app/portfolio/financehub/page.tsx", import.meta.url),
  "utf8",
);

test("GuideTours hours claim reads as an estimate", () => {
  assert.doesNotMatch(guidetoursDetail, /save you 8\+ hours per week/);
  assert.match(guidetoursDetail, /estimated 8\+ hours per week/i);
});

test("FinanceHub cache claim reads as a target, not a measured rate", () => {
  assert.doesNotMatch(financehubDetail, /achieving 85-95% hit rate/);
  assert.doesNotMatch(financehubDetail, /with 85-95% hit rate/);
  assert.match(financehubDetail, /target(ing|ed)?[^.]{0,40}85-95% hit rate/i);
});

// FT-UX-02: the hero's "See projects" lands on an interstitial that
// starts a guided tour — that step must name itself as a tour and
// offer the direct index as an explicit skip, never a mystery gate.

const plasticHome = readFileSync(
  new URL("../src/components/home/PlasticHome.tsx", import.meta.url),
  "utf8",
);

test("Tour interstitial names itself as a guided tour", () => {
  assert.match(plasticHome, /Guided tour/);
  assert.doesNotMatch(plasticHome, /Index 00/);
});

test("Tour interstitial offers skipping to the full index", () => {
  assert.match(plasticHome, /skip the tour/i);
  assert.match(plasticHome, /open full index/i);
});
