# Comment audit 1 — bootstrap, ratchet, first removals (2026-11-21)

Scope: tracked first-party source — `src/`, `tests/`, `scripts/`, root config
files, restricted to source extensions (`.ts`, `.tsx`, `.js`, `.jsx`,
`.mjs`, `.cjs`, `.css`, `.scss`). Binary assets (`src/app/fonts/*.woff2`,
`favicon.ico`) and other non-source files (`tests/package.json`,
`scripts/comment-baseline.json`) are never opened or counted. Vendored skill
packs (`.agents/`, `.factory/`, `.cursor/`, `.devin/`, `.claude/`,
`skills/shadcn/`) are third-party content and excluded from the audit and
from the ratchet.

Method: language-aware counter (`scripts/check-comments.mjs`) tokenizes
JS/TS so string, template and regex literals are skipped before comment
detection (URLs never count); CSS is scanned for block comments. Comment
spans mask to blanks per physical line — newlines inside a block comment
are preserved, so every physical line is judged on its own non-comment
remainder. A comment-only physical line is one whose non-comment remainder
is blank. The checker counts its own comments: `scripts/check-comments.mjs`
is in scope, so its header and inline notes are part of the baseline.

## Measured totals

Totals below are regenerated with the corrected counter (source-only scope,
per-physical-line masking). The first attempt's figures (3,371 → 3,349)
were inflated: its mask collapsed newlines inside block comments, so every
physical line after a multi-line comment compared against the wrong mask
line and trailing lines counted as phantom comments.

| Metric | Before slice | After slice |
|---|---|---|
| Files with comments | 99 | 101 |
| Comment-only lines | 2,275 | **2,288** |
| Comment blocks | 727 | 712 |

The after-slice line total is the regenerated
`scripts/comment-baseline.json` (2,288), not 3,349. It sits above the
before-slice 2,275 because this slice adds the ratchet itself — the checker
counts its own 21 comment lines and the new contract test adds 12 — while
the globals.css removals below take out 20. Comment blocks still fall
(727 → 712).

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
`scripts/comment-baseline.json` (regenerated at 2,288 after this slice's
removals and the ratchet's own comments) and allows deletions;
improvements print and ask for `--update-baseline` to hold the gain.
`tests/comment-ratchet.test.ts` pins the tokenizer seams, the source-only
file scope and the ratchet's exit-0 run. Skill: `skills/delete-comment/SKILL.md`
(adapted from sf-v2's canonical skill).

## Remaining prose

Disposition stays keep-dominant: this repo's comment prose is deliberate
design documentation, and sampled areas classified that way again here.
No follow-up slices are planned in this task; any future cleanup goes
through `skills/delete-comment` as its own reviewed slice.
