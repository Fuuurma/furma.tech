/**
 * submitContactForm truthfulness gate — behavioral pin of the decision seam
 * (VAL-STATIC-FUR-002 / 003).
 *
 * `submitContactForm` is the site's only server action. It cannot be imported
 * into `node --test` (it depends on a Next.js request context and on the
 * network), so its truthfulness decision is extracted behind the pure
 * `decideContactActionResponse` seam in `src/lib/contact-action-decision.ts`.
 * The action routes every terminal path through that function; these tests
 * exercise the same seam production uses, with a fake provider result —
 * no network, no request context, no test-only production branches.
 *
 * Fail-closed contract pinned here:
 *  - invalid input            -> success:false, field errors, no messageId
 *  - rate-limited (dual scope)-> success:false, no messageId
 *  - provider not ack-ing     -> success:false, NO messageId
 *  - acknowledged send        -> success:true with the provider's messageId
 *
 * Run: `node --test tests/contact-action-decision.test.ts`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { decideContactActionResponse } from "../src/lib/contact-action-decision.ts";

test("invalid input fails closed: success:false with field errors, no messageId", () => {
  const decision = decideContactActionResponse({
    stage: "invalid",
    errors: { email: ["Please enter a valid email address"] },
  });

  assert.equal(decision.success, false);
  assert.equal(decision.data, undefined, "no messageId on invalid input");
  assert.deepEqual(decision.fieldErrors, {
    email: "Please enter a valid email address",
  });
});

test("rate-limited fails closed: both scopes funnel to one all-or-nothing decision", () => {
  // The address scope and the caller scope are decided together by
  // checkScopedRateLimit; either denial reaches this single fail-closed seam.
  const decision = decideContactActionResponse({ stage: "rate-limited" });

  assert.equal(decision.success, false);
  assert.equal(decision.data, undefined, "a throttled send carries no messageId");
  assert.ok(decision.error, "a truthful reason is surfaced to the visitor");
});

test("provider not acknowledging fails closed: success:false and NO messageId", () => {
  // Fake provider results — no network. Every non-acknowledgment (no provider
  // configured, HTTP failure, or a 2xx without the ack schema) must fail
  // closed and must never surface a fabricated receipt.
  const nonAcknowledgments = [
    { ok: false as const, message: "not-configured" },
    { ok: false as const, message: "provider-status-500" },
    { ok: false as const, message: "provider-acknowledgment-missing" },
  ];

  for (const result of nonAcknowledgments) {
    const decision = decideContactActionResponse({
      stage: "provider",
      result,
    });
    assert.equal(decision.success, false, `${result.message} must fail closed`);
    assert.equal(
      decision.data?.messageId,
      undefined,
      `${result.message} must not fabricate a messageId`,
    );
  }
});

test("only an acknowledged send succeeds, with the provider's messageId", () => {
  const withReference = decideContactActionResponse({
    stage: "provider",
    result: { ok: true, reference: "msg_123" },
  });
  assert.equal(withReference.success, true);
  assert.deepEqual(withReference.data, { messageId: "msg_123" });

  // An acknowledgment with no reference is still a truthful success, but the
  // action must not invent an id — it returns no messageId at all.
  const withoutReference = decideContactActionResponse({
    stage: "provider",
    result: { ok: true },
  });
  assert.equal(withoutReference.success, true);
  assert.deepEqual(withoutReference.data, {}, "no id invented");
});
