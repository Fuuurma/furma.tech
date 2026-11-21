# Comment audit 1 — bootstrap, ratchet, first removals (2026-11-21)

Scope: tracked first-party source — `src/`, `tests/`, `scripts/`, root config
files. Vendored skill packs (`.agents/`, `.factory/`, `.cursor/`, `.devin/`,
`.claude/`, `skills/shadcn/`) are third-party content and excluded from the
audit and from the ratchet.

Method: language-aware counter (`scripts/check-comments.mjs`) tokenizes
JS/TS so string, template and regex literals are skipped before comment
detection (URLs never count); CSS is scanned for block comments. A
comment-only physical line is one whose non-comment remainder is blank.

## Measured totals

| Metric | Before slice | After slice |
|---|---|---|
| Files with comments | 100 | 100 |
| Comment-only lines | 3,371 | **3,349** |
| Comment blocks | 1,789 | ~1,770 |

Removed in this slice: 20 template tautology labels from
`src/app/globals.css` (e.g. "Professional Animations" above `@keyframes`,
"Selection" above `::selection`, "Grey scale - Light" above a literal grey
scale, "Monochrome Furma palette (Replacing colored accents)" — stale, the
migration it announced is done), plus the inline `/* Sharper */`. The heavy
design prose, algorithm walkthroughs and module contracts were inspected and
classified as documentation; they stay.

Projected savings: the tautology class is exhausted in the audited areas —
no further projected savings from classes found here. Excuse comments: zero
found (a repo-wide marker sweep for TODO/FIXME/hack/workaround/for-now hit
only false positives), so no repair tasks were filed. Stale references: the
one suspicious path (`src/lib/fluid.ts` in `tests/hero-footer-screens.test.ts`)
is an intentional absent-path guard proving the retired particle fluid stays
gone.

## Decision records moved to `DESIGN.md`

Source comments deleted, decisions preserved as dated sections (2026-11-21)
in `DESIGN.md` — the repo's tracked decision log. (`docs/` is gitignored and
holds local-only material, so the generic `docs/adr/` convention does not
apply here; the skill now says so.)

- "The type is self-hosted, and the sans face has to finish" — the Syne →
  Instrument Sans story (2026-10-27 "every letter has to finish" call),
  italic Cormorant preload exclusion, and the new self-hosting decision:
  faces ship as committed latin woff2 under `src/app/fonts/`, because builds
  must not fetch fonts at build time (the merge gate cannot reach
  fonts.googleapis.com — the failure that killed attempt e3).
- "The root share card is the designed asset" — F99: `public/og.png` is the
  root share card; the dynamic `/og` route serves per-title cards only.
- "The JSON-LD payload is escaped to unicode sequences" — why the JSON-LD
  payload is escaped before inlining.

## The ratchet

`pnpm lint` now runs `scripts/check-comments.mjs` before ESLint. It refuses
any file whose comment-only line count rises above
`scripts/comment-baseline.json` (taken at 3,349 after this slice's removals)
and allows deletions; improvements print and ask for
`--update-baseline` to hold the gain. Skill: `skills/delete-comment/SKILL.md`
(adapted from sf-v2's canonical skill).

## Follow-up areas (independent, each with its own verify command)

Remaining comment-only lines by area, with classification so far (samples
audited; each follow-up slice re-classifies file by file). Disposition for
all areas is expected to be keep-dominant: this repo's comment prose is
deliberate design documentation. Each slice removes only tautologies/stale
comments, moves decision records to `DESIGN.md`, and refreshes the baseline.

| ID | Area | Lines | Verify command | Blocked by |
|---|---|---|---|---|
| F-1 | Motion render libs: `liquid-ascii-tw.tsx`, `dither-wave-tw.tsx`, `wave-field.ts`, `motion.ts`, `use-reduced-motion.ts` | 623 | `pnpm test && pnpm lint && pnpm build` | this slice landing |
| F-2 | Field/water libs: `ink-field.ts`, `water.ts`, `halftone.ts`, `lobes.ts` | 659 | `pnpm test && pnpm lint && pnpm build` | this slice landing |
| F-3 | `tests/` suite (28 files) | 791 | `pnpm test && pnpm lint && pnpm build` | this slice landing |
| F-4 | Contact/server: `contact-provider.ts`, `rate-limit.ts`, `server-actions.ts`, `schemas.ts` | 319 | `pnpm test && pnpm lint && pnpm build` | this slice landing |
| F-5 | Home components: `PlasticHome.tsx`, `FloatingProjectCards.tsx`, scroll hooks, plus remaining `globals.css` prose and misc | ~792 | `pnpm test && pnpm lint && pnpm build` | this slice landing |

F-1…F-5 are mutually independent. v2 (`93`), studio footer (`38`) and
portfolio pages (`24`) are small enough to fold into F-5.
