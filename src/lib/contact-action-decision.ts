/**
 * Pure truthfulness decision for the contact form action
 * (VAL-STATIC-FUR-002 / 003).
 *
 * `submitContactForm` is the site's only server action. Its acknowledgement
 * decision — whether the visitor is told their message was recorded — lives
 * behind this single pure seam so it can be pinned without a Next.js request
 * context, the rate limiter's in-process state, or the network. The action
 * routes every terminal path through `decideContactActionResponse`; tests
 * exercise that same interface with a fake provider result.
 *
 * Fail-closed rules (no fabricated receipt, no false enrollment):
 *  - invalid input         -> success:false with field errors, no messageId
 *  - rate-limited          -> success:false, no messageId
 *  - provider not ack-ing  -> success:false, no messageId
 *  - acknowledged send     -> success:true, messageId only from the provider
 *
 * Deep module: one function, no dependencies on framework or I/O. Every
 * caller (the action and its tests) crosses the same seam, so the rule lives
 * in one place and cannot drift between production and its guard.
 */

import type { SubmissionResult } from "./contact-provider";

/** Why the action stopped — one variant per terminal path. */
export type ContactActionOutcome =
  | { stage: "invalid"; errors: Record<string, string[]> }
  | { stage: "rate-limited" }
  | { stage: "provider"; result: SubmissionResult };

/**
 * Structural equivalent of the action's `ServerActionResponse` (kept here so
 * the seam has no import from the framework-bound action module).
 */
export interface ContactActionDecision {
  success: boolean;
  data?: { messageId?: string };
  error?: string;
  fieldErrors?: Record<string, string>;
}

const PROVIDER_UNAVAILABLE_MESSAGE =
  "We couldn't record your message right now. Email hello@furma.tech directly and we'll reply within 48 hours.";
const RATE_LIMIT_MESSAGE =
  "Too many attempts — please wait a minute and try again, or email hello@furma.tech directly.";

function fieldErrorMap(
  errors: Record<string, string[]>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(errors).map(([key, messages]) => [
      key,
      messages[0] ?? "Invalid value",
    ]),
  );
}

/**
 * Decide the truthful response for a contact submission. Pure and total: the
 * only source of a messageId is a provider result that carries a reference,
 * and success is returned only for an acknowledged send.
 */
export function decideContactActionResponse(
  outcome: ContactActionOutcome,
): ContactActionDecision {
  switch (outcome.stage) {
    case "invalid": {
      const fieldErrors = fieldErrorMap(outcome.errors);
      const first =
        Object.values(fieldErrors)[0] ??
        "Please check the form and try again.";
      return { success: false, error: first, fieldErrors };
    }

    case "rate-limited":
      return { success: false, error: RATE_LIMIT_MESSAGE };

    case "provider": {
      const result = outcome.result;
      // The acknowledgement gate. A 2xx without the documented ack schema,
      // an HTTP failure, or no configured provider all fail closed — no
      // success, no fabricated receipt.
      if (!result.ok) {
        return { success: false, error: PROVIDER_UNAVAILABLE_MESSAGE };
      }
      return {
        success: true,
        data: result.reference ? { messageId: result.reference } : {},
      };
    }
  }
}
