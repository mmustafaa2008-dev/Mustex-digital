/**
 * Basic in-memory rate limiter for server actions.
 * Suitable for single-instance / basic spam protection (no database).
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSeconds: number };

export function checkStartProjectRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { ok: true, remaining: MAX_REQUESTS - existing.count };
}
