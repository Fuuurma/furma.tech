/**
 * Server actions for contact + waitlist.
 *
 * Truthfulness contract (VAL-STATIC-FUR-002 / 003):
 * - Input is always validated; invalid input is rejected with field errors.
 * - Every submission is rate-limited per identifier (fail closed when exceeded).
 * - Success is returned ONLY when a configured durable provider accepts and
 *   records the submission. With no provider configured — or on any provider /
 *   network failure — the action returns a non-success with a truthful message
 *   that points to the direct-contact alternative. A receipt / signup id is
 *   never fabricated: it only appears when the provider returns one.
 */

"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { contactFormSchema, waitlistSchema, validateForm } from "./schemas";
import { checkScopedRateLimit } from "./rate-limit";
import {
  resolveContactProvider,
  submitToProvider,
  type ContactSubmission,
} from "./contact-provider";

interface ServerActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const CONTACT_RATE_LIMIT = 5;
const CONTACT_RATE_WINDOW_MS = 60_000;
const WAITLIST_RATE_LIMIT = 5;
const WAITLIST_RATE_WINDOW_MS = 60_000;
// The caller scope binds the network origin, so rotating addresses cannot
// dilute the per-address throttle (FURMA-CONTACT-RATE-BOUND-01). Generous
// enough for a shared office NAT, tight enough that rotation buys nothing.
const CALLER_RATE_LIMIT = 15;
const CALLER_RATE_WINDOW_MS = 60_000;

/**
 * Truthful copy shown when no durable provider is configured (or the provider
 * fails). Never claims success, enrollment, or a receipt — always offers the
 * direct mailto alternative so the visitor still has a working contact path.
 */
const PROVIDER_UNAVAILABLE_MESSAGE =
  "We couldn't record your message right now. Email hello@furma.tech directly and we'll reply within 48 hours.";
const RATE_LIMIT_MESSAGE =
  "Too many attempts — please wait a minute and try again, or email hello@furma.tech directly.";

function rateLimitIdentifier(formData: FormData): string {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  return email || "anonymous";
}

/**
 * The network-origin scope. Behind the reverse proxy the client IP arrives
 * in x-forwarded-for (first hop) or x-real-ip; anything else shares one
 * "anonymous" bucket, which still bounds rotation from unproxied callers.
 */
async function callerScope(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || h.get("x-real-ip")?.trim() || "";
  return ip || "anonymous";
}

/**
 * Two scopes per submission: the address and the caller. Both must allow
 * before anything is recorded, so a fresh address behind an exhausted
 * caller is still throttled (FURMA-CONTACT-RATE-BOUND-01).
 */
function contactScopes(
  channel: "contact" | "waitlist",
  email: string,
  caller: string,
) {
  const perAddress =
    channel === "contact"
      ? { limit: CONTACT_RATE_LIMIT, windowMs: CONTACT_RATE_WINDOW_MS }
      : { limit: WAITLIST_RATE_LIMIT, windowMs: WAITLIST_RATE_WINDOW_MS };
  return [
    {
      key: `${channel}:${email || "anonymous"}`,
      limit: perAddress.limit,
      windowMs: perAddress.windowMs,
    },
    {
      key: `${channel}:caller:${caller}`,
      limit: CALLER_RATE_LIMIT,
      windowMs: CALLER_RATE_WINDOW_MS,
    },
  ];
}

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

export async function submitContactForm(
  formData: FormData,
): Promise<ServerActionResponse> {
  const data = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? "") || "",
    subject: String(formData.get("subject") ?? "general") || "general",
    message: String(formData.get("message") ?? ""),
    newsletter: formData.get("newsletter") === "on",
  };

  const validation = validateForm(contactFormSchema, data);
  if (validation.errors) {
    const fieldErrors = fieldErrorMap(validation.errors);
    const first =
      Object.values(fieldErrors)[0] ??
      "Please check the form and try again.";
    return { success: false, error: first, fieldErrors };
  }

  const scope = checkScopedRateLimit(
    contactScopes(
      "contact",
      rateLimitIdentifier(formData),
      await callerScope(),
    ),
  );
  if (!scope.allowed) {
    return { success: false, error: RATE_LIMIT_MESSAGE };
  }

  const submission: ContactSubmission = {
    channel: "contact",
    name: data.name,
    email: data.email,
    company: data.company,
    subject: data.subject,
    message: data.message,
    newsletter: data.newsletter,
  };

  const result = await submitToProvider(submission, resolveContactProvider());
  if (!result.ok) {
    // Fail closed: no fabricated receipt, no false enrollment.
    return { success: false, error: PROVIDER_UNAVAILABLE_MESSAGE };
  }

  revalidatePath("/");
  return {
    success: true,
    data: result.reference ? { messageId: result.reference } : {},
  };
}

export async function submitWaitlistSignup(
  formData: FormData,
): Promise<ServerActionResponse> {
  const data = {
    email: String(formData.get("email") ?? ""),
    interest: String(formData.get("interest") ?? "all") || "all",
  };

  const validation = validateForm(waitlistSchema, data);
  if (validation.errors) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const scope = checkScopedRateLimit(
    contactScopes(
      "waitlist",
      rateLimitIdentifier(formData),
      await callerScope(),
    ),
  );
  if (!scope.allowed) {
    return { success: false, error: RATE_LIMIT_MESSAGE };
  }

  const result = await submitToProvider(
    {
      channel: "waitlist",
      name: "",
      email: data.email,
      message: "",
      interest: data.interest,
    },
    resolveContactProvider(),
  );
  if (!result.ok) {
    return { success: false, error: PROVIDER_UNAVAILABLE_MESSAGE };
  }

  return {
    success: true,
    data: result.reference ? { signupId: result.reference } : {},
  };
}
