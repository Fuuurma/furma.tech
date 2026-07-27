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

  // Opportunistic eviction of stale buckets when the map is large.
  if (buckets.size > MAX_BUCKETS) {
    for (const [mapKey, bucket] of buckets) {
      if (bucket.hits.every((timestamp) => timestamp <= cutoff)) {
        buckets.delete(mapKey);
      }
      if (buckets.size <= MAX_BUCKETS) break;
    }
  }

  return { allowed, remaining, resetAt, windowMs, limit };
}

/** Reset all limiter state. Test-only — exported so suites stay deterministic. */
export function __resetRateLimiterForTests(): void {
  buckets.clear();
}
