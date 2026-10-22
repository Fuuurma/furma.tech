/**
 * Security-header contracts (FT-DEEP-05).
 *
 * Zero-dependency (node:test). Pins the response-header policy that
 * next.config.ts serves on every route: the headers exist, carry the values
 * the audit requires, and the CSP actually forbids the dangerous defaults it
 * claims to forbid.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { SECURITY_HEADERS } from "../src/lib/security-headers.ts";

const byKey = new Map(SECURITY_HEADERS.map((h) => [h.key, h.value]));

test("every audited header is present", () => {
  for (const key of [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
  ]) {
    assert.ok(byKey.has(key), `missing ${key}`);
  }
});

test("HSTS covers subdomains for at least one year", () => {
  const value = byKey.get("Strict-Transport-Security") ?? "";
  assert.match(value, /max-age=(\d+)/);
  assert.ok(Number(value.match(/max-age=(\d+)/)?.[1]) >= 31_536_000);
  assert.match(value, /includeSubDomains/);
});

test("framing is denied in both modern and legacy headers", () => {
  assert.equal(byKey.get("X-Frame-Options"), "DENY");
  assert.match(byKey.get("Content-Security-Policy") ?? "", /frame-ancestors 'none'/);
});

test("the CSP forbids the escalation paths the audit targets", () => {
  const csp = byKey.get("Content-Security-Policy") ?? "";
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /base-uri 'self'/);
  assert.match(csp, /form-action 'self'/);
});

test("MIME sniffing is off and referrer leakage is bounded", () => {
  assert.equal(byKey.get("X-Content-Type-Options"), "nosniff");
  assert.equal(byKey.get("Referrer-Policy"), "strict-origin-when-cross-origin");
});
