/**
 * Best-effort in-memory rate limiter for server actions.
 *
 * Bound: per-identifier sliding window. When the configured limit is exceeded
 * the request is DENIED — the limiter fails closed and never silently allows.
 *
 * Scope: state lives in-process, so enforcement is exact for a single
 * long-running `next start` / dev instance. Across serverless replicas a shared
 * store (Redis / Upstash) is required for exact enforcement; that is an
 * owner-gated ops decision documented in the audit. This module never returns
 * `allowed: true` once the window is exhausted — it will not masquerade a
 * limited request as permitted.
 */

interface Bucket {
  /** Timestamps (ms) of accepted events still inside the sliding window. */
  hits: number[];
}

const buckets = new Map<string, Bucket>();

/** Guard against unbounded growth from unique identifiers. */
const MAX_BUCKETS = 10_000;

export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  /** ms since epoch when the window resets for this identifier. */
  resetAt: number;
  /** Configured window (ms) — informational. */
  windowMs: number;
  /** Configured limit — informational. */
  limit: number;
}

/**
 * Decide whether `identifier` may perform one more action inside `limit` per
 * `windowMs`. Has a side effect: an accepted decision records the hit. `now` is
 * injectable for deterministic tests.
 */
export function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitDecision {
  const key = identifier || "anonymous";
  const cutoff = now - windowMs;

  const existing = buckets.get(key);
  const hits = existing
    ? existing.hits.filter((timestamp) => timestamp > cutoff)
    : [];

  const allowed = hits.length < limit;
  if (allowed) {
    hits.push(now);
  }

  // resetAt = oldest retained hit + window (when that hit expires). If the
  // window is empty (e.g. first request), resetAt is now + window.
  const oldest = hits.length > 0 ? hits[0] : now;
  const resetAt = oldest + windowMs;
  const remaining = Math.max(0, limit - hits.length);

  buckets.set(key, { hits });

  // Eviction when the map is large — CPU-bounded by design (FURMA-CONTACT-
  // RATE-BOUND-01): the old sweep walked the WHOLE map (10k entries) on
  // every call once the cap was hit, letting an attacker who pins the cap
  // tax every subsequent request. The scan now visits at most
  // MAX_EVICTION_SCAN oldest keys (Map preserves insertion order), deletes
  // the expired ones among them, and hard-drops oldest entries until the
  // map is under the cap again. Memory stays bounded; so does the work per
  // accepted or denied call.
  if (buckets.size > MAX_BUCKETS) {
    let scanned = 0;
    const droppable: string[] = [];
    for (const [mapKey, bucket] of buckets) {
      if (scanned >= MAX_EVICTION_SCAN) break;
      scanned += 1;
      if (mapKey !== key && bucket.hits.every((h) => h <= cutoff)) {
        droppable.push(mapKey);
      }
    }
    for (const mapKey of droppable) buckets.delete(mapKey);
    while (buckets.size > MAX_BUCKETS) {
      const oldest = buckets.keys().next().value;
      if (oldest === undefined) break;
      buckets.delete(oldest);
    }
  }

  return { allowed, remaining, resetAt, windowMs, limit };
}

/** The eviction scan never visits more keys than this per call. */
const MAX_EVICTION_SCAN = 200;

export interface ScopedLimit {
  key: string;
  limit: number;
  windowMs: number;
}

export interface ScopedDecision {
  allowed: boolean;
  /** When the binding scope frees, in ms since epoch. */
  resetAt: number;
  /** The scope that refused the call, when denied. */
  deniedScope: string | null;
}

/**
 * All-or-nothing decision across several scopes of the same action (FURMA-
 * CONTACT-RATE-BOUND-01): an email scope binds the address, a caller scope
 * binds the network origin, so rotating addresses cannot dilute the
 * throttle. Decides against every scope BEFORE recording anything — a
 * denied call leaves every bucket untouched (no burned allowance) — and on
 * acceptance records exactly one hit in every scope. Each scope is a plain
 * sliding window with the same semantics as checkRateLimit.
 */
export function checkScopedRateLimit(
  scopes: ReadonlyArray<ScopedLimit>,
  now: number = Date.now(),
): ScopedDecision {
  const evaluations = scopes.map((scope) => ({
    scope,
    ...evaluateScope(scope.key, scope.limit, scope.windowMs, now),
  }));

  const denied = evaluations.find((e) => !e.allowed);
  if (denied) {
    return {
      allowed: false,
      resetAt: denied.resetAt,
      deniedScope: denied.scope.key,
    };
  }

  let resetAt = 0;
  for (const e of evaluations) {
    recordScope(e.scope.key, e.hits, now);
    resetAt = Math.max(resetAt, e.resetAt);
  }
  return { allowed: true, resetAt, deniedScope: null };
}

function evaluateScope(
  key: string,
  limit: number,
  windowMs: number,
  now: number,
): { hits: number[]; allowed: boolean; resetAt: number } {
  const resolvedKey = key || "anonymous";
  const cutoff = now - windowMs;
  const existing = buckets.get(resolvedKey);
  const hits = existing
    ? existing.hits.filter((timestamp) => timestamp > cutoff)
    : [];
  const allowed = hits.length < limit;
  const oldest = hits.length > 0 ? hits[0] : now;
  return { hits, allowed, resetAt: oldest + windowMs };
}

function recordScope(key: string, hits: number[], now: number): void {
  hits.push(now);
  buckets.set(key || "anonymous", { hits });
}

/** Reset all limiter state. Test-only — exported so suites stay deterministic. */
export function __resetRateLimiterForTests(): void {
  buckets.clear();
}
