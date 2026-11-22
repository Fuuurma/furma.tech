import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { contactFormSchema } from "../src/lib/schemas.ts";

const VALID_CONTACT = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello — I would like to talk about a collaboration.",
};

test("a valid contact payload with subject=general still parses", () => {
  const explicit = contactFormSchema.safeParse({
    ...VALID_CONTACT,
    subject: "general",
  });
  assert.equal(explicit.success, true);

  const defaulted = contactFormSchema.safeParse(VALID_CONTACT);
  assert.equal(defaulted.success, true);
  if (defaulted.success) {
    assert.equal(defaulted.data.subject, "general");
  }
});

test("archived-product and demo-request subjects are rejected", () => {
  for (const subject of ["aitlas_access", "product_demo"]) {
    const result = contactFormSchema.safeParse({ ...VALID_CONTACT, subject });
    assert.equal(result.success, false, `subject "${subject}" must not parse`);
  }
});

test("schemas.ts exports no waitlist or booking surface", () => {
  const source = readFileSync(
    new URL("../src/lib/schemas.ts", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    source,
    /waitlistSchema|bookingSchema|WaitlistData|BookingData/,
  );
});

test("server-actions.ts keeps only the contact action", () => {
  const source = readFileSync(
    new URL("../src/lib/server-actions.ts", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /submitWaitlistSignup/);
  assert.match(source, /submitContactForm/);
  assert.match(source, /checkScopedRateLimit\(/);
});
