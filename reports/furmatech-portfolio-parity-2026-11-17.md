# FURMATECH-PORTFOLIO-PARITY — id/href parity across the three catalogues

Date: 2026-11-17 · Slice: test(portfolio): pin id parity across HOME_PROJECTS,
V2_PROJECTS, PROJECT_HERO_MAP · Dispatch ctx_fd296a05b3d1, base origin/main@abe4b0a

## Problem

The product catalogue is written down three times: `src/lib/home-projects.ts`
(HOME_PROJECTS — landing slides, portfolio routes, sitemap),
`src/lib/v2-projects.ts` (V2_PROJECTS — "The Workshop" index), and
`src/lib/project-heroes.ts` (PROJECT_HERO_MAP — hero visual per project id,
read by PlasticHome, PortfolioListItem and ProjectCoverVisual). Nothing failed
when a project landed in one list but not the others: a missing hero key
renders no visual, a missing V2 row drops the project from /v2, and a drifted
href splits the route.

## Change (test-only)

`tests/portfolio-parity.test.ts` — four node:test cases:

- every HOME_PROJECTS id has a PROJECT_HERO_MAP entry;
- every HOME_PROJECTS id has a V2_PROJECTS row at the same href;
- the three catalogues carry the same project id set (both directions — an
  orphan in V2 or the hero map fails as loudly as a missing one);
- ids are unique within each catalogue (ids key the hero map and the routes).

PROJECT_HERO_MAP cannot be imported under `node --test` — it pulls the TSX
hero components through the `@/` alias — so its keys are parsed from the
source literal, the same source-pin idiom `rate-limit-scopes.test.ts` uses
for server-actions.ts. Status wording is each catalogue's own and is
deliberately not compared.

## Mutation proof (test-value)

Each planted defect was reverted after the red run; the tree carries only
the new test:

- deleted `linkup` from PROJECT_HERO_MAP → "every HOME_PROJECTS id has a
  PROJECT_HERO_MAP entry" and "same project ids" fail;
- changed V2 `qart` href to `/portfolio/qr` → the href-parity test fails
  while id parity stays green;
- added orphan key `ghostproject` to PROJECT_HERO_MAP → "same project ids"
  fails.

## Verification

- `pnpm test` (`node --test "tests/*.test.ts"`) — 90/90 pass, including the
  4 new cases.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts`
  unused `_params`, untouched by this slice).
- `pnpm build` — green; all 24 routes prerendered.
- Landed: test commit dee86e7 fast-forwarded onto origin/main via
  `sf_git_push_land` (ancestry proven against the fetched tip).
