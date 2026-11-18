/**
 * schemas.ts is the shared contact-validation boundary: the client form
 * (PlasticHome) and the server action (submitContactForm) both call
 * validateForm(contactFormSchema, payload), and the server action forwards
 * the resulting errors dict to decideContactActionResponse while the client
 * shows each field's messages[0] — so the first message in an array is
 * user-visible text. Nothing pinned those bounds: a loosened limit (say
 * message min 10 -> 1) would have shipped silently. These tests pin the
 * bounds literally — the bound value parses, one past it fails with the
 * exact message — plus the defaults and the exact field-error shape.
 *
 * Run: `node --test tests/schemas.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { contactFormSchema, validateForm } from "../src/lib/schemas.ts";

const chars = (n: number) => "x".repeat(n);

// Valid and comfortably inside every bound, so a planted bound change can
// only turn red the case that pins that bound — never a bystander test.
const validPayload = () => ({
  name: chars(20),
  email: "ada@example.com",
  message: chars(40),
});

test("contact schema: a payload at every bound parses, with defaults applied", () => {
  const result = validateForm(contactFormSchema, {
    name: chars(100), // max name
    email: "ada@example.com",
    company: "", // the accepted empty-string form
    message: chars(2000), // max message
    // subject and newsletter omitted: the defaults must apply
  });
  assert.deepEqual(result, {
    success: true,
    data: {
      name: chars(100),
      email: "ada@example.com",
      company: "",
      subject: "general",
      message: chars(2000),
      newsletter: false,
    },
  });
});

test("contact schema: name accepts 2..100 and rejects one past each bound", () => {
  for (const n of [2, 100]) {
    const result = validateForm(contactFormSchema, {
      ...validPayload(),
      name: chars(n),
    });
    assert.equal(result.success, true, `a name of ${n} chars must parse`);
  }
  assert.deepEqual(
    validateForm(contactFormSchema, { ...validPayload(), name: chars(1) }),
    {
      success: false,
      errors: { name: ["Name must be at least 2 characters"] },
    },
  );
  assert.deepEqual(
    validateForm(contactFormSchema, { ...validPayload(), name: chars(101) }),
    {
      success: false,
      errors: { name: ["Name must be less than 100 characters"] },
    },
  );
});

test("contact schema: email must be an email address", () => {
  assert.deepEqual(
    validateForm(contactFormSchema, {
      ...validPayload(),
      email: "not-an-email",
    }),
    {
      success: false,
      errors: { email: ["Please enter a valid email address"] },
    },
  );
});

test("contact schema: message accepts 10..2000 and rejects one past each bound", () => {
  for (const n of [10, 2000]) {
    const result = validateForm(contactFormSchema, {
      ...validPayload(),
      message: chars(n),
    });
    assert.equal(result.success, true, `a message of ${n} chars must parse`);
  }
  assert.deepEqual(
    validateForm(contactFormSchema, { ...validPayload(), message: chars(9) }),
    {
      success: false,
      errors: { message: ["Message must be at least 10 characters"] },
    },
  );
  assert.deepEqual(
    validateForm(contactFormSchema, {
      ...validPayload(),
      message: chars(2001),
    }),
    {
      success: false,
      errors: { message: ["Message must be less than 2000 characters"] },
    },
  );
});

test("contact schema: subject is a four-value enum defaulting to general", () => {
  const omitted = validateForm(contactFormSchema, validPayload());
  assert.equal(omitted.success, true);
  assert.equal(omitted.data?.subject, "general");

  const chosen = validateForm(contactFormSchema, {
    ...validPayload(),
    subject: "partnership",
  });
  assert.equal(chosen.success, true);
  assert.equal(chosen.data?.subject, "partnership");

  assert.deepEqual(
    validateForm(contactFormSchema, { ...validPayload(), subject: "emergency" }),
    {
      success: false,
      errors: {
        subject: [
          'Invalid option: expected one of "product_demo"|"aitlas_access"|"partnership"|"general"',
        ],
      },
    },
  );
});

test("contact schema: company is optional", () => {
  const omitted = validateForm(contactFormSchema, validPayload());
  assert.equal(omitted.success, true);
  const empty = validateForm(contactFormSchema, {
    ...validPayload(),
    company: "",
  });
  assert.equal(empty.success, true);
});

test("validateForm: a multi-field failure keys the errors dict by field", () => {
  // The exact shape the server action forwards to
  // decideContactActionResponse: one key per failing field, the messages in
  // an array, nothing for passing fields.
  assert.deepEqual(
    validateForm(contactFormSchema, {
      name: chars(1),
      email: "not-an-email",
      message: chars(40),
    }),
    {
      success: false,
      errors: {
        name: ["Name must be at least 2 characters"],
        email: ["Please enter a valid email address"],
      },
    },
  );
});
