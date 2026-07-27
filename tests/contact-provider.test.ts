/**
 * Honest-delivery + rate-limit unit gate.
 *
 * Zero-dependency (node:test). Proves the boundaries that VAL-STATIC-FUR-002 /
 * 003 depend on:
 *  - The provider resolver fails closed for missing / unsafe config.
 *  - submitToProvider never fabricates a reference or success.
 *  - The rate limiter actually denies once the window is exhausted.
 *
 * Run: `node --test tests/`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveContactProvider,
  submitToProvider,
} from "../src/lib/contact-provider.ts";
import {
  checkRateLimit,
  __resetRateLimiterForTests,
} from "../src/lib/rate-limit.ts";

test("resolveContactProvider: unconfigured when URL is absent or blank", () => {
  assert.equal(resolveContactProvider({}).configured, false);
  assert.equal(
    resolveContactProvider({ CONTACT_PROVIDER_URL: "   " }).configured,
    false,
  );
});

test("resolveContactProvider: rejects non-http(s) schemes (fail closed)", () => {
  assert.equal(
    resolveContactProvider({ CONTACT_PROVIDER_URL: "file:///etc/passwd" })
      .configured,
    false,
  );
  assert.equal(
    resolveContactProvider({ CONTACT_PROVIDER_URL: "javascript:alert(1)" })
      .configured,
    false,
  );
});

test("resolveContactProvider: accepts https + optional token", () => {
  const resolution = resolveContactProvider({
    CONTACT_PROVIDER_URL: "https://hook.example.test/inbox",
    CONTACT_PROVIDER_TOKEN: "tok",
  });
  assert.equal(resolution.configured, true);
  assert.equal(resolution.url, "https://hook.example.test/inbox");
  assert.equal(resolution.token, "tok");
});

test("submitToProvider: fail closed with NO fabricated reference when unconfigured", async () => {
  const result = await submitToProvider(
    { channel: "contact", name: "A", email: "a@b.test", message: "hello" },
    { configured: false },
  );
  assert.equal(result.ok, false);
  assert.equal(
    result.reference,
    undefined,
    "must not fabricate a reference when unconfigured",
  );
});

test("submitToProvider: provider HTTP failure is non-success without a fabricated id", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response("err", { status: 500 })) as typeof fetch;
  try {
    const result = await submitToProvider(
      { channel: "contact", name: "A", email: "a@b.test", message: "hi" },
      { configured: true, url: "https://hook.test/inbox" },
    );
    assert.equal(result.ok, false);
    assert.equal(result.reference, undefined);
  } finally {
    globalThis.fetch = original;
  }
});

test("submitToProvider: success only when provider acknowledges persistence; reference comes from provider", async () => {
  // The legacy `{ id: ... }` shape is NOT enough on its own — the provider
  // must also return the documented acknowledgment flag. This test proves
  // the documented happy path: provider returns `{ acknowledged: true,
  // reference: "rec_123" }` and the boundary returns success with the
  // provider-supplied reference.
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ acknowledged: true, reference: "rec_123" }),
      { status: 200, headers: { "content-type": "application/json" } },
    )) as typeof fetch;
  try {
    const result = await submitToProvider(
      { channel: "contact", name: "A", email: "a@b.test", message: "hi" },
      { configured: true, url: "https://hook.test/inbox" },
    );
    assert.equal(result.ok, true);
    assert.equal(result.reference, "rec_123");
  } finally {
    globalThis.fetch = original;
  }
});

test("submitToProvider: legacy `ok: true` + `reference` alias is honored", async () => {
  // Backwards-compat: a provider that returns the legacy `{ ok: true,
  // reference: "..." }` shape (without the canonical `acknowledged` flag)
  // is still treated as a durable acknowledgment.
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ ok: true, reference: "rec_legacy" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  try {
    const result = await submitToProvider(
      { channel: "contact", name: "A", email: "a@b.test", message: "hi" },
      { configured: true, url: "https://hook.test/inbox" },
    );
    assert.equal(result.ok, true);
    assert.equal(result.reference, "rec_legacy");
  } finally {
    globalThis.fetch = original;
  }
});

test("submitToProvider: ok without reference when provider acknowledges persistence", async () => {
  // The provider must return the documented acknowledgment schema
  // (an explicit `acknowledged: true` flag). When it does, success is
  // reported without a fabricated reference.
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ acknowledged: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  try {
    const result = await submitToProvider(
      { channel: "waitlist", name: "", email: "a@b.test", message: "" },
      { configured: true, url: "https://hook.test/inbox" },
    );
    assert.equal(result.ok, true);
    assert.equal(result.reference, undefined, "no id invented");
  } finally {
    globalThis.fetch = original;
  }
});

test("submitToProvider: REGRESSION 2xx with empty body is NOT durable success", async () => {
  // The previous contract accepted any 2xx response as durable success.
  // The new contract requires the documented acknowledgment schema; an
  // empty body must NOT be reported as recorded.
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response("", {
      status: 200,
      headers: { "content-type": "text/plain" },
    })) as typeof fetch;
  try {
    const result = await submitToProvider(
      { channel: "contact", name: "A", email: "a@b.test", message: "hi" },
      { configured: true, url: "https://hook.test/inbox" },
    );
    assert.equal(result.ok, false, "empty 2xx must not be reported as success");
    assert.equal(result.reference, undefined, "no reference invented");
    assert.equal(
      result.message,
      "provider-acknowledgment-missing",
      "failure reason names the contract gap",
    );
  } finally {
    globalThis.fetch = original;
  }
});

test("submitToProvider: REGRESSION 2xx with unrelated payload is NOT durable success", async () => {
  // A 2xx body that doesn't match the acknowledgment schema (no
  // `acknowledged: true`, no `reference`, no `id`, no `ok: true`) must
  // not be reported as durable success. Even a body that LOOKS healthy
  // but lacks the explicit acknowledgment is treated as unrecorded.
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ status: "received", echo: true, value: 42 }),
      { status: 200, headers: { "content-type": "application/json" } },
    )) as typeof fetch;
  try {
    const result = await submitToProvider(
      { channel: "waitlist", email: "a@b.test", message: "" },
      { configured: true, url: "https://hook.test/inbox" },
    );
    assert.equal(result.ok, false, "unrelated 2xx must not be reported as success");
    assert.equal(result.reference, undefined);
    assert.equal(result.message, "provider-acknowledgment-missing");
  } finally {
    globalThis.fetch = original;
  }
});

test("submitToProvider: explicit acknowledgment with reference returns reference", async () => {
  // When the provider returns the documented schema WITH a reference id,
  // the reference flows through. `acknowledged: true` is the contract flag.
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ acknowledged: true, reference: "ack_42" }),
      { status: 200, headers: { "content-type": "application/json" } },
    )) as typeof fetch;
  try {
    const result = await submitToProvider(
      { channel: "contact", name: "A", email: "a@b.test", message: "hi" },
      { configured: true, url: "https://hook.test/inbox" },
    );
    assert.equal(result.ok, true);
    assert.equal(result.reference, "ack_42");
  } finally {
    globalThis.fetch = original;
  }
});

test("checkRateLimit: allows up to limit then fails closed", () => {
  __resetRateLimiterForTests();
  const windowMs = 1000;
  assert.equal(
    checkRateLimit("ip-1", 2, windowMs, 100).allowed,
    true,
  );
  assert.equal(
    checkRateLimit("ip-1", 2, windowMs, 200).allowed,
    true,
  );
  assert.equal(
    checkRateLimit("ip-1", 2, windowMs, 300).allowed,
    false,
    "third request in the window must be denied",
  );
  // Distinct identifiers are independent.
  assert.equal(checkRateLimit("ip-2", 2, windowMs, 300).allowed, true);
});

test("checkRateLimit: window slides so requests recover after it expires", () => {
  __resetRateLimiterForTests();
  const windowMs = 100;
  checkRateLimit("ip-3", 1, windowMs, 1000);
  assert.equal(
    checkRateLimit("ip-3", 1, windowMs, 1050).allowed,
    false,
  );
  assert.equal(
    checkRateLimit("ip-3", 1, windowMs, 1200).allowed,
    true,
    "after the window passes the identifier is allowed again",
  );
});
