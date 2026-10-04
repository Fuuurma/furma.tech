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

test("detail hero states the 3-piece rule, not turn-based vanishing", () => {
  assert.doesNotMatch(detailPage, /vanish after a set number of turns/i);
  assert.match(detailPage, /only 3 pieces per player/i);
});

test("detail CTA matches In-Dev status (no Play promise)", () => {
  assert.doesNotMatch(detailPage, /Play the vanishing-move variant/i);
  assert.match(detailPage, /Get updates/);
});
