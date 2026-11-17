/**
 * The chrome title is a pathname map with no route check behind it —
 * StudioChrome prints whatever getStudioPageTitle returns, so a wrong
 * branch shows the wrong word to every reader on that route.
 *
 * What this suite pins:
 *
 * - `/portfolio` itself stays untitled: the hub page's own header is the
 *   title, so the chrome slot stays empty.
 * - A project path takes the project's name from HOME_PROJECTS —
 *   `/portfolio/aitlas/nova` prints "Aitlas", not a guess from the URL.
 * - `/brand`, `/privacy` and `/styleguide` each name their page.
 * - An unknown `/portfolio/<slug>` falls back to a title-cased last
 *   segment — "X" for `/portfolio/x` — so a route added before its nav
 *   entry still gets a readable chrome title.
 * - Anything unmapped prints nothing at all, and the removed `/products`
 *   prefix branch stays gone: no such route exists.
 *
 * Zero-dependency node:test, the house idiom for this repo's boundaries.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { getStudioPageTitle } from "../src/lib/portfolio-nav.ts";

test("the portfolio hub keeps an empty chrome title", () => {
  assert.equal(getStudioPageTitle("/portfolio"), undefined);
});

test("a project path takes the project's HOME_PROJECTS name", () => {
  assert.equal(getStudioPageTitle("/portfolio/aitlas/nova"), "Aitlas");
  assert.equal(getStudioPageTitle("/portfolio/aitlas"), "Aitlas");
  assert.equal(
    getStudioPageTitle("/portfolio/tic-tac-toe-disappear"),
    "Tic-Tac-Toe",
  );
});

test("top-level pages each name themselves", () => {
  assert.equal(getStudioPageTitle("/brand"), "Brand");
  assert.equal(getStudioPageTitle("/privacy"), "Privacy");
  assert.equal(getStudioPageTitle("/styleguide"), "Styleguide");
});

test("an unknown portfolio slug falls back to a title-cased segment", () => {
  assert.equal(getStudioPageTitle("/portfolio/x"), "X");
  assert.equal(
    getStudioPageTitle("/portfolio/some-new-thing"),
    "Some New Thing",
  );
});

test("unmapped paths print no chrome title", () => {
  for (const pathname of ["/", "/v2", "/contact"]) {
    assert.equal(getStudioPageTitle(pathname), undefined, pathname);
  }
});

test("the dead /products branch stays removed", () => {
  assert.equal(getStudioPageTitle("/products"), undefined);
  assert.equal(getStudioPageTitle("/products/anything"), undefined);
});
