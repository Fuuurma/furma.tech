/**
 * Section-navigation boundary contracts (FT-UX-01 / FT-A11Y-01).
 *
 * Zero-dependency (node:test). Pins the decisions the plastic home's global
 * wheel/touch/keyboard navigation makes before advancing sections:
 *  - a scroll region consumes gestures until its edge; only edge gestures
 *    (or gestures outside any region) advance the tour;
 *  - the flat portfolio menu moves focus with arrows (wrapping) and Home/End.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  atScrollBottom,
  atScrollTop,
  nextMenuIndex,
  shouldAdvanceSection,
} from "../src/lib/section-scroll.ts";

const mid = { scrollTop: 100, scrollHeight: 1000, clientHeight: 400 };
const top = { scrollTop: 0, scrollHeight: 1000, clientHeight: 400 };
const bottom = { scrollTop: 600, scrollHeight: 1000, clientHeight: 400 };
const fits = { scrollTop: 0, scrollHeight: 300, clientHeight: 400 };

test("gestures outside any scroll region always advance", () => {
  assert.equal(shouldAdvanceSection(1, null), true);
  assert.equal(shouldAdvanceSection(-1, null), true);
});

test("a mid-region gesture never advances", () => {
  assert.equal(shouldAdvanceSection(1, mid), false);
  assert.equal(shouldAdvanceSection(-1, mid), false);
});

test("at the top edge only the upward gesture advances", () => {
  assert.equal(atScrollTop(top), true);
  assert.equal(atScrollBottom(top), false);
  assert.equal(shouldAdvanceSection(-1, top), true);
  assert.equal(shouldAdvanceSection(1, top), false);
});

test("at the bottom edge only the downward gesture advances", () => {
  assert.equal(atScrollTop(bottom), false);
  assert.equal(atScrollBottom(bottom), true);
  assert.equal(shouldAdvanceSection(1, bottom), true);
  assert.equal(shouldAdvanceSection(-1, bottom), false);
});

test("a region whose content fits reports both edges (tour swipes preserved)", () => {
  assert.equal(atScrollTop(fits), true);
  assert.equal(atScrollBottom(fits), true);
  assert.equal(shouldAdvanceSection(1, fits), true);
  assert.equal(shouldAdvanceSection(-1, fits), true);
});

test("bottom tolerance absorbs 1px of fractional rounding", () => {
  const almost = { scrollTop: 599, scrollHeight: 1000, clientHeight: 400 };
  assert.equal(atScrollBottom(almost), true);
  assert.equal(shouldAdvanceSection(1, almost), true);
});

test("menu arrows move one step and wrap at both ends", () => {
  assert.equal(nextMenuIndex(0, 5, "ArrowDown"), 1);
  assert.equal(nextMenuIndex(4, 5, "ArrowDown"), 0);
  assert.equal(nextMenuIndex(1, 5, "ArrowUp"), 0);
  assert.equal(nextMenuIndex(0, 5, "ArrowUp"), 4);
});

test("menu Home/End jump to the ends", () => {
  assert.equal(nextMenuIndex(3, 5, "Home"), 0);
  assert.equal(nextMenuIndex(1, 5, "End"), 4);
});

test("menu nav stays in range for degenerate totals", () => {
  assert.equal(nextMenuIndex(0, 1, "ArrowDown"), 0);
  assert.equal(nextMenuIndex(0, 1, "ArrowUp"), 0);
  assert.equal(nextMenuIndex(0, 0, "ArrowDown"), 0);
  assert.equal(nextMenuIndex(0, 0, "End"), 0);
});

// FT-DEEP-02: every overflow-y:auto overlay must declare itself a scroll
// region, or wheel/touch over it advances the tour instead of scrolling.
const portfolioPanel = readFileSync(
  new URL("../src/components/home/PortfolioNavDropdown.tsx", import.meta.url),
  "utf8",
);

test("the mega-panel declares itself a scroll region", () => {
  assert.match(
    portfolioPanel,
    /className="studio-portfolio-panel"[^>]*data-section-scroll/s,
  );
});
