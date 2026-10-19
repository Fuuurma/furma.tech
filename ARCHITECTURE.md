# Furma.tech — Architecture

Marketing and portfolio site for the Furma.tech venture studio. Next.js 16
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
  `halftone.ts` (the home plate: Bayer matrices, the tone field, the ASCII
  density ramp), `screen-reserves.ts` (reads the blocks of type the plate's
  ink must avoid), `use-reduced-motion.ts` (SSR-stable reduced-motion
  preference)
- `src/components/home/` — `PlasticHome.tsx` (the immersive section home),
  `AsciiScreen.tsx` (the plate on a coarse screen of characters — the hero),
  `DitherScreen.tsx` (the same plate on a fine screen of dots — the footer)
- `src/hooks/` — `use-mobile.ts`, `useScroll.ts`, `useAgentNavigation.ts`
- `scripts/smoke.mjs` — post-build smoke check
