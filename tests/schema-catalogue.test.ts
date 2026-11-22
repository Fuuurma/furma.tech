/**
 * Schema-catalogue gate — the contact boundary only accepts subjects the
 * studio can honour today.
 *
 * Aitlas, restauManager, GuideTours and FinanceHub are archived: reachable
 * but not advertised. The waitlist/booking schemas and the
 * `submitWaitlistSignup` action are deleted, and the contact subject enum no
 * longer offers `aitlas_access` or `product_demo` — so no visitor, forged
 * request, or stale link can express interest in an archived product
 * through the contact form.
 *
 * Zero-dependency node:test, the house idiom for this repo's boundaries.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { contactFormSchema } from "../src/lib/schemas.ts";

function readSource(path: string): string {
  return readFileSync(
    join(fileURLToPath(new URL(".", import.meta.url)), path),
    "utf8",
  );
}

test("a valid contact payload still parses", () => {
  const result = contactFormSchema.safeParse({
    name: "Ada Lovelace",
    email: "ada@example.test",
    company: "",
    subject: "general",
    message: "Hello, I would like to talk about a project.",
    newsletter: false,
  });
  assert.equal(result.success, true);
});

test("archived-product subjects are rejected at the boundary", () => {
  const base = {
    name: "Ada Lovelace",
    email: "ada@example.test",
    message: "Hello, I would like to talk about a project.",
  };
  for (const subject of ["aitlas_access", "product_demo"]) {
    const result = contactFormSchema.safeParse({ ...base, subject });
    assert.equal(result.success, false, `subject=${subject} must not parse`);
  }
});

test("schemas.ts carries no waitlist or booking surface", () => {
  const source = readSource("../src/lib/schemas.ts");
  assert.doesNotMatch(
    source,
    /waitlistSchema|bookingSchema|WaitlistData|BookingData/,
  );
});

test("server-actions.ts keeps only the contact action", () => {
  const source = readSource("../src/lib/server-actions.ts");
  assert.doesNotMatch(source, /submitWaitlistSignup/);
  assert.match(source, /submitContactForm/);
  assert.match(source, /checkScopedRateLimit\(/);
});
