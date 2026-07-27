/**
 * Contact / waitlist durable-provider boundary.
 *
 * The site must NEVER fabricate success. A submission is treated as successful
 * only when a configured durable provider (e.g. a webhook, CRM, or inbox
 * endpoint) accepts and records it. With no provider configured the boundary
 * fails closed: callers surface a truthful retry / direct-contact alternative
 * and never display a generated receipt id or enrollment confirmation.
 *
 * Configuration is read at call time so operators can enable a provider via env
 * without code changes, and so tests can inject a fake environment:
 *
 *   CONTACT_PROVIDER_URL    HTTPS endpoint that durably records the submission.
 *   CONTACT_PROVIDER_TOKEN  Optional bearer token sent to the endpoint.
 *
 * No provider is invented here. When the URL is absent or invalid the boundary
 * reports "not-configured" and the caller must treat that as a non-success.
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

    // Prefer an explicit provider reference. If the provider returns none, we
    // succeed without a reference rather than inventing one.
    let reference: string | undefined;
    try {
      const data = (await response.json()) as {
        id?: string;
        reference?: string;
      } | null;
      reference = data?.id ?? data?.reference ?? undefined;
    } catch {
      reference = undefined;
    }

    return { ok: true, reference };
  } catch (error) {
    const message =
      error instanceof Error
        ? `provider-unreachable: ${error.name}`
        : "provider-unreachable";
    return { ok: false, message };
  }
}
