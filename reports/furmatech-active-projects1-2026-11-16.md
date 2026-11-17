# FTECH-ACTIVE-PROJECTS1 — catalogue is the active set

Date: 2026-11-16 · Slice: FTECH-ACTIVE-PROJECTS1 · Lane `fleet/ftech-active-projects1` @ `origin/master` e250a03

Furma's 2026-11-16 ruling: furma.tech lists only the active set — tic-tac-toe,
gambit-deck, furma.bloxs, puta-renfe, aitlas, software-factory, fuddy, qart,
benxer — and every other project leaves the listing, the linked pages and
every data source. No archive shelf: the 2026-10-27 reachable-but-unlisted
model (`ARCHIVED_PROJECTS`) is gone entirely.

## What changed

- `src/lib/home-projects.ts` — `HOME_PROJECTS` is now the nine active
  projects, in catalogue order; `ARCHIVED_PROJECTS` deleted. Every derived
  surface (home tour, floating field, portfolio index, nav dropdown, footers,
  sitemap, reel indices, prev/next) reads this one list.
- New case pages + bespoke 520:340 concept visuals (same "Concept visual —
  illustrative mock, not a product screenshot" caption as the rest):
  - `src/app/portfolio/software-factory/page.tsx` + `SoftwareFactoryHero.tsx`
    — claim → work → verify → land lanes; private by design.
  - `src/app/portfolio/fuddy/page.tsx` + `FuddyHero.tsx` — week grid +
    auto-merged shopping list.
  - `src/app/portfolio/benxer/page.tsx` + `BenxerHero.tsx` — benchmark cohort
    scatter + profile rows, "no rank claim" interval.
- `src/lib/project-heroes.ts` — `PROJECT_HERO_MAP` covers all nine ids.
- `src/lib/v2-projects.ts` — `V2_PROJECTS`/`V2_STATS` rebuilt on the active
  set (statusLabel shape preserved); `V2Verticals.tsx` panel now lists the
  eight non-Aitlas actives + the Aitlas deep-dive.
- `src/lib/showcase-films.ts` — `SHOWCASE_FILMS` keeps aitlas/tictactoe/qart
  (the pages that pass `projectId`); `SHOWCASE_INDEX` lists the six films
  that exist for active projects, each linking its case page.
- `src/components/home/FloatingProjectCards.tsx` — `PLACEMENTS` grew 6→9, one
  window per project (count pinned by `floating-cards.test.ts`); three stay
  `narrow` for phones.
- `src/components/ui/breadcrumb.tsx` — route labels for the six new slugs;
  retired slugs removed.
- `src/lib/schemas.ts` — waitlist/booking enums no longer name
  restaurantManager/tourManager/financeHub.
- Deleted: 8 portfolio routes (financehub, guidetours, linkup, onetomany,
  opengovern, pickstracker, pond, restauramanager), 8 hero components, 28
  showcase media files (14 retired slugs × mp4+jpg). Aitlas — archived on
  2026-10-27 — is back in the catalogue.
- Docs synced: `AGENTS.md`, `GEMINI.md`, `QWEN.md` (advertised list = the
  nine, archive line removed), `README.md`, `DESIGN.md` (new dated ruling +
  field-count note), `.impeccable.md` (range counts).
- Tests updated to the new contract: `guide-catalogue.test.ts` now pins "no
  archive" instead of the archived line; `project-copy.test.ts` drops the
  FT-CONTENT-03 block whose two guarded pages no longer exist;
  `monochrome-chrome`/`type-contrast` HOUSE_FILES now cover all nine case
  pages; `og-metadata` fixture renamed; `smoke.mjs` headings + sitemap
  assertions cover the nine and assert retired routes absent.

## Verification

- `pnpm lint` — clean.
- `pnpm test` — 165/165 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; route table shows exactly the nine portfolio routes
  (+ aitlas/nova|nexus|agents subpages), no retired routes.
- `node scripts/smoke.mjs` against `pnpm start` :3080 — all checks pass:
  every catalogue route 200 + h1, /v2 noindex, sitemap lists the nine and
  excludes retired slugs + /v2, /og image/png, contact surface intact.
- DOM-verified on the production server (agent-browser, fleet profile):
  /portfolio lists exactly the nine hrefs in order, h1 "9 products";
  all nine case pages render h1 + hero + "Concept visual" caption;
  prev/next chains aitlas → software-factory → fuddy; /portfolio/pond 404s;
  home innerText contains all nine names and zero retired names; /v2 panels
  list the active set; phone viewport shows exactly 3 narrow float cards;
  `scrollWidth == clientWidth` at 390px and 1440px on /, /portfolio,
  /showcase, /v2 and all three new pages; Tab focus shows a visible outline.
- Console: only pre-existing Vercel analytics script-load noise on localhost.
- Screenshots (12 PNGs, this model cannot render images — captured as
  artifacts, DOM-verified instead): `.tmp/shots/` — home + portfolio +
  software-factory/fuddy/benxer + showcase + v2, at 1440×900 and 390×844.

## Notes / open

- One `pnpm build` run exited 1 *after* a fully printed route table: Next.js
  16.4.2's security nudge tried to auto-run `next upgrade --agent=security`
  and failed non-interactively. Retry was green; unrelated to this diff —
  the installed Next has a known advisory (pre-existing).
- Retired project URLs now 404 rather than redirect — the ruling was removal,
  not relocation.
- `submitWaitlistSignup`/`bookingSchema` remain dormant server actions (no UI
  submits them); their enums now name active ids only.
