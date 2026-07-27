/**
 * Contact / waitlist durable-provider boundary.
 *
 * The site must NEVER fabricate success. A submission is treated as successful
 * only when a configured durable provider (e.g. a webhook, CRM, or inbox
 * endpoint) accepts AND acknowledges persistence per the contract below. With
 * no provider configured the boundary fails closed: callers surface a truthful
 * retry / direct-contact alternative and never display a generated receipt id
 * or enrollment confirmation.
 *
 * Configuration is read at call time so operators can enable a provider via env
 * without code changes, and so tests can inject a fake environment:
 *
 *   CONTACT_PROVIDER_URL    HTTPS endpoint that durably records the submission.
 *   CONTACT_PROVIDER_TOKEN  Optional bearer token sent to the endpoint.
 *
 * No provider is invented here. When the URL is absent or invalid the boundary
 * reports "not-configured" and the caller must treat that as a non-success.
 *
 * ## Persistence-acknowledgment contract
 *
 * The provider MUST durably record the submission AND respond with a 2xx
 * body that matches the acknowledgment schema. The boundary treats any 2xx
 * response without that contract acknowledgment as "not recorded" and returns
 * `{ ok: false, message: "provider-acknowledgment-missing" }`. This prevents
 * a misconfigured webhook (e.g. one that only echoes a 200 OK) from making
 * the UI report success while the contact is lost.
 *
 * Acknowledged response shape (any one of these is sufficient, plus an
 * optional reference / id):
 *
 *   { "acknowledged": true }                                // canonical
 *   { "acknowledged": true, "reference": "<provider-id>" }  // canonical + id
 *   { "ok": true, "reference": "<provider-id>" }            // legacy alias
 *   { "ok": true, "id": "<provider-id>" }                   // legacy alias
 *
 * Anything else — including an empty body, `{ ok: true }` with no id, a
 * plain `{ "status": "received" }`, or HTML — is rejected.
 */

export type SubmissionChannel = "contact" | "waitlist";

export interface ContactSubmission {
  channel: SubmissionChannel;
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
  newsletter?: boolean;
  /** Waitlist interest slug (ignored for the "contact" channel). */
  interest?: string;
}

export interface ProviderResolution {
  configured: boolean;
  url?: string;
  token?: string;
}

export interface SubmissionResult {
  ok: boolean;
  /** Provider-returned reference when available. NEVER fabricated by us. */
  reference?: string;
  /** Safe-to-surface reason describing why the submission did not succeed. */
  message?: string;
}

/**
 * Resolve the durable provider from an environment. Pure + deterministic so it
 * can be unit-tested with an injected env. Non-http(s) schemes are rejected so a
 * misconfigured `file:` / `javascript:` value can never masquerade as a provider.
 */
export function resolveContactProvider(
  env: NodeJS.ProcessEnv = process.env,
): ProviderResolution {
  const raw = (env.CONTACT_PROVIDER_URL ?? "").trim();
  if (!raw) return { configured: false };

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { configured: false };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { configured: false };
  }

  const token = (env.CONTACT_PROVIDER_TOKEN ?? "").trim() || undefined;
  return { configured: true, url: raw, token };
}

/**
 * Submit a validated payload to the resolved provider. Returns a truthful result
 * in every case: never throws, never fabricates a reference, and never reports
 * success when the provider is unconfigured or unreachable.
 */
export async function submitToProvider(
  submission: ContactSubmission,
  resolution: ProviderResolution = resolveContactProvider(),
): Promise<SubmissionResult> {
  if (!resolution.configured || !resolution.url) {
    return { ok: false, message: "not-configured" };
  }

  try {
    const response = await fetch(resolution.url, {
      method: "POST",
      redirect: "error",
      headers: {
        "content-type": "application/json",
        ...(resolution.token
          ? { authorization: `Bearer ${resolution.token}` }
          : {}),
      },
      body: JSON.stringify({
        channel: submission.channel,
        name: submission.name,
        email: submission.email,
        company: submission.company ?? "",
        subject: submission.subject ?? "general",
        message: submission.message,
        newsletter: submission.newsletter ?? false,
        interest: submission.interest,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return { ok: false, message: `provider-status-${response.status}` };
    }

    // A 2xx is NOT durable success on its own. The provider must return the
    // documented acknowledgment schema (see file header). Any 2xx without it
    // is rejected so a misconfigured webhook can't make the UI report success
    // while the contact is lost.
    let parsed: unknown = null;
    try {
      const raw = await response.text();
      parsed = raw.trim().length > 0 ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }

    const acknowledgment = parseProviderAcknowledgment(parsed);
    if (!acknowledgment.acknowledged) {
      return {
        ok: false,
        message: "provider-acknowledgment-missing",
      };
    }

    return { ok: true, reference: acknowledgment.reference };
  } catch (error) {
    const message =
      error instanceof Error
        ? `provider-unreachable: ${error.name}`
        : "provider-unreachable";
    return { ok: false, message };
  }
}

interface ProviderAcknowledgment {
  /** True only when the body matches the documented acknowledgment schema. */
  acknowledged: boolean;
  /** Provider-supplied reference id, if any. Never fabricated by us. */
  reference?: string;
}

/**
 * Pure, dependency-free validator for the documented acknowledgment schema.
 * Returns `{ acknowledged: false }` for any 2xx body that does not prove
 * durable persistence — empty body, unrelated payload, missing flag, or a
 * `{ ok: true }` without a reference id.
 *
 * The schema accepts either the canonical `acknowledged: true` flag or the
 * legacy `ok: true` alias, and either a `reference` or an `id` field. See
 * the file header for the full contract.
 */
export function parseProviderAcknowledgment(
  body: unknown,
): ProviderAcknowledgment {
  if (body === null || typeof body !== "object") {
    return { acknowledged: false };
  }

  const record = body as Record<string, unknown>;
  const acknowledgedFlag =
    record.acknowledged === true || record.ok === true;
  if (!acknowledgedFlag) {
    return { acknowledged: false };
  }

  const reference = readNonEmptyString(record.reference ?? record.id);
  return { acknowledged: true, reference };
}

function readNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
