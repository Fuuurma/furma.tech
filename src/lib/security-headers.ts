/**
 * Response security headers (FT-DEEP-05).
 *
 * Pure data so tests can pin the policy without parsing next.config.ts.
 *
 * CSP notes:
 *  - script-src keeps 'unsafe-inline': Next.js streams RSC payloads as inline
 *    <script> and next-themes injects its theme bootstrap inline. A nonce CSP
 *    needs middleware; this static policy still gates objects, frames,
 *    base-uri, and form-action.
 *  - Vercel Analytics + Speed Insights are the only third-party origins.
 */

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

export const SECURITY_HEADERS: readonly { key: string; value: string }[] = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
