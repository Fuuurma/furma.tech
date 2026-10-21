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
  `fluid.ts` (the footer's water: a PIC/FLIP particle fluid on the
  character's own lattice),
  `screen-reserves.ts` (reads the blocks of type the ink
  must avoid), `use-reduced-motion.ts` (SSR-stable reduced-motion
  preference)
- `src/components/home/` — `PlasticHome.tsx` (the immersive section home)
- `src/components/dither-wave-tw.tsx` — the hero's screen: a wave printed on
  a fine screen of dots (React Bits Pro `Dither Wave`, prop API verbatim)
- `src/components/liquid-ascii-tw.tsx` — the footer's screen: a body of
  water printed in characters (React Bits Pro `Liquid Ascii`, prop API
  verbatim)
- `src/hooks/` — `use-mobile.ts`, `useScroll.ts`, `useAgentNavigation.ts`
- `scripts/smoke.mjs` — post-build smoke check
