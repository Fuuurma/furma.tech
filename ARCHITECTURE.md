# Furma.tech — Architecture

Marketing and portfolio site for the Furma.tech studio. Next.js 16
App Router + React 19 + TypeScript strict + Tailwind v4, dev on
`http://127.0.0.1:3080`. No database: the only writes are contact/waitlist
submissions through server actions to a configured provider, with a
truthful non-success when no provider is configured. See `DESIGN.md` for
the visual contract.

## Modules

- `src/app/` — routes: `/` (composition root over `PlasticHome`), `/portfolio`
  + `/portfolio/[project]`, `/privacy`, `/styleguide`, `/v2` (self-contained
  "Workshop" concept: own layout, fonts, CSS), `sitemap.ts` + `robots.ts`
- `src/components/` — `LayoutChrome.tsx` (v1 nav/footer; bypassed by v2 via
  `isV2`), `ThemeProvider.tsx`, `Analytics.tsx`, `home/`, `heroes/`,
  `portfolio/`, `studio/`, `motion/`, `v2/`, `ui/` (primitives)
- `src/lib/` — `server-actions.ts` (contact/waitlist truthfulness contract:
  validate, rate-limit, success only on provider receipt — never fabricated),
  `contact-provider.ts`, `rate-limit.ts` (in-memory sliding window, fails
  closed; single-instance exact, shared store needed across replicas),
  `schemas.ts` (Zod), `metadata.ts`, `home-projects.ts`, `v2-projects.ts`,
  `halftone.ts` (the house screen: the ordered threshold, the ink ceiling,
  the measured dot radii and glyph ladder, the reserve model),
  `wave-field.ts` (the hero's wave: a warped, ridged noise field),
  `water.ts` (the footer's sea: a 1-D shallow-water solver, one column per
  character, printed by `liquid-ascii-tw.tsx`),
  `screen-reserves.ts` (reads the blocks of type the ink
  must avoid), `use-reduced-motion.ts` (SSR-stable reduced-motion
  preference)
- `src/components/home/` — `PlasticHome.tsx` (the immersive section home)
- `src/components/dither-wave-tw.tsx` — the hero's screen: a wave printed on
  a fine screen of dots (React Bits Pro `Dither Wave`, prop API verbatim)
- `src/components/liquid-ascii-tw.tsx` — the footer's screen: a body of
  water printed in characters (React Bits Pro `Liquid Ascii`, prop API
  verbatim)
- `src/hooks/` — `useScroll.ts`
- `scripts/smoke.mjs` — post-build smoke check

## Decisions

Durable technical decisions live here (migrated from source comments in
the 2026-11-21 comment audit; see `reports/comment-audit-bootstrap-2026-11-21.md`).

- **House face is Instrument Sans, not Syne.** Syne's `g` has a severed
  descender by design — the Google Fonts original draws it the same way —
  and at any size it reads as an unfinished letter. 2026-10-27 call:
  every letter has to finish. Cormorant and JetBrains Mono keep the
  serif/mono roles.
- **The footer's sea is shallow water, not a particle fluid.** A PIC/FLIP
  fluid was built first and dropped on measurement: on a collocated grid
  it creeps, and in five seconds of simulation it lost ~94% of its volume
  and collapsed (`tests/water-volume.test.ts` pins the bound). The
  shallow-water form conserves volume by construction — the flow between
  two columns is one number that leaves one and enters the next.
- **The sitemap omits `lastModified`.** `buildSitemap` used to stamp every
  URL with the build time, so the whole site claimed to change on every
  deploy — noise a crawler learns to ignore. No page carries a real
  content-modified date; if one ever does, emit it for that page only.
- **CSP `script-src` keeps `'unsafe-inline'`.** Next.js streams RSC
  payloads as inline `<script>` and next-themes injects its bootstrap
  inline; a nonce policy needs middleware this static `next.config.ts`
  policy does not have. `object-src`, `frame-src`, `base-uri`,
  `form-action` stay locked and `connect-src`/`img-src` name only the
  Vercel origins. Tighten only if inline scripts become nonce-able.
- **Root OG card is the designed `public/og.png`.** A 1200×630 render of
  the real hero (F99), not a re-render of the retired "Digital Venture
  Studio" template. The dynamic `/og` ImageResponse route stays for
  per-title cards on product pages and Aitlas — social crawlers do not
  rasterize SVG and each title needs its own words.
