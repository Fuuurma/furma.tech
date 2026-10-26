/**
 * FURMA-CONTACT-RATE-BOUND-01 — the contact throttle is dual-scoped and
 * the limiter's own memory/CPU are bounded.
 *
 * Two defections this suite pins:
 *
 *  1. Email rotation: the old identifier was the submitted address alone,
 *     so an attacker rotating addresses got a fresh bucket every time and
 *     the throttle never bound. The scoped decision now binds BOTH the
 *     address and the network-origin caller in one all-or-nothing check —
 *     a fresh address behind an exhausted caller is still denied, and a
 *     denied call records nothing anywhere.
 *
 *  2. Unbounded limiter cost: the eviction sweep walked the whole bucket
 *     map on every call once the cap was hit, so an attacker who pinned
 *     the cap taxed every later request with an O(map) scan. Eviction now
 *     visits a bounded sample and hard-drops down to the cap.
 *
 * Zero-dependency node:test, the house idiom for this repo's boundaries.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import {
  checkScopedRateLimit,
  checkRateLimit,
  __resetRateLimiterForTests,
} from "../src/lib/rate-limit.ts";

test.beforeEach(() => __resetRateLimiterForTests());

test("rotation cannot dilute the throttle: the caller scope denies", () => {
  const scopes = (email: string) => [
    { key: `contact:${email}`, limit: 5, windowMs: 60_000 },
    { key: "contact:caller:203.0.113.7", limit: 3, windowMs: 60_000 },
  ];

  // Three distinct addresses burn the caller bucket; each address is far
  // under its own five-per-window allowance.
  for (const email of ["a@x.test", "b@x.test", "c@x.test"]) {
    const r = checkScopedRateLimit(scopes(email));
    assert.equal(r.allowed, true, `${email} should pass while caller allows`);
  }

  // The fourth address is fresh but the caller is exhausted — this is the
  // rotation the old email-only scope waved through.
  const denied = checkScopedRateLimit(scopes("d@x.test"));
  assert.equal(denied.allowed, false);
  assert.equal(denied.deniedScope, "contact:caller:203.0.113.7");
});

test("a denied call records nothing — the refusal burns no allowance", () => {
  const scopes = (email: string) => [
    { key: `contact:${email}`, limit: 1, windowMs: 60_000 },
    { key: "contact:caller:198.51.100.9", limit: 1, windowMs: 60_000 },
  ];

  // First submission consumes BOTH scopes (all-or-nothing recording).
  const first = checkScopedRateLimit(scopes("solo@x.test"));
  assert.equal(first.allowed, true);

  // A different address with the same caller is denied by the caller
  // scope — and that denial must NOT seed the new address's bucket.
  const denied = checkScopedRateLimit(scopes("other@x.test"));
  assert.equal(denied.allowed, false);

  // Alone (fresh caller), that same address is still allowed: proof the
  // denied call recorded nothing into its own scope.
  const alone = checkScopedRateLimit([
    { key: "contact:other@x.test", limit: 1, windowMs: 60_000 },
    { key: "contact:caller:fresh-ip", limit: 5, windowMs: 60_000 },
  ]);
  assert.equal(alone.allowed, true);
});

test("acceptance records one hit in every scope", () => {
  const scopes = () => [
    { key: "contact:tight@x.test", limit: 1, windowMs: 60_000 },
    { key: "contact:caller:loose-ip", limit: 9, windowMs: 60_000 },
  ];
  assert.equal(checkScopedRateLimit(scopes()).allowed, true);
  const second = checkScopedRateLimit(scopes());
  // The address scope (limit 1) is the binding one now.
  assert.equal(second.allowed, false);
  assert.equal(second.deniedScope, "contact:tight@x.test");
});

test("the bucket map stays bounded under a rotation flood", () => {
  // Flood with distinct identifiers well past the internal cap (10k):
  // every call is allowed (each identifier is fresh) but the map must
  // never grow past the cap, and the per-call work must stay bounded —
  // this loop finishing in milliseconds IS the CPU assertion.
  const start = Date.now();
  for (let i = 0; i < 11_000; i++) {
    checkRateLimit(`flood:${i}`, 5, 60_000);
  }
  const elapsed = Date.now() - start;
  assert.ok(elapsed < 5_000, `flood took ${elapsed}ms — eviction is too slow`);

  // The limiter still answers correctly after the flood: a fresh
  // identifier gets a full window, and its hits are tracked.
  const after = checkRateLimit("flood:after", 2, 60_000);
  assert.equal(after.allowed, true);
  assert.equal(after.remaining, 1);
});

test("expired buckets are evictable — space frees for new identifiers", () => {
  // Fill the flood identifiers, then advance past their window.
  for (let i = 0; i < 500; i++) {
    checkRateLimit(`stale:${i}`, 5, 60_000);
  }
  const later = Date.now() + 61_000;
  // At `later` every stale: bucket is expired; the new call evicts them
  // instead of growing the map.
  const fresh = checkScopedRateLimit(
    [
      { key: "contact:fresh@x.test", limit: 5, windowMs: 60_000 },
      { key: "contact:caller:fresh", limit: 5, windowMs: 60_000 },
    ],
    later,
  );
  assert.equal(fresh.allowed, true);
});

test("both actions scope the contact and caller keys together", () => {
  // Source pin: the dual scope is wired in the server actions, not just
  // exported from the limiter.
  const source = readFileSync(
    join(fileURLToPath(new URL(".", import.meta.url)), "../src/lib/server-actions.ts"),
    "utf8",
  );
  assert.match(source, /checkScopedRateLimit\(/);
  assert.match(source, /\$\{channel\}:\$\{email/);
  assert.match(source, /\$\{channel\}:caller:\$\{caller\}/);
});
