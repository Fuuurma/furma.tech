# FURMATECH-RD-NEXT3 — react-doctor unsafe-json-in-html / no-transition-all / no-locale-format-in-render

Date: 2026-11-14 · Slice: FURMATECH-RD-NEXT3 (WORK.md auto-intake row, after
FURMATECH-RD-CALENDAR1 landed ed1bba9 on origin/master)

Source: react-doctor@0.9.14 `--json` on this worktree — pre-change scan at HEAD
ed1bba9 showed 60 diagnostics; post-change scan shows 57. The three rows below
are the first fixable entries in live-list order; `no-giant-component` rows were
skipped as redesign work.

## Live list at HEAD (react-doctor@0.9.14 `--json`, ed1bba9)

60 diagnostics. Fixed rows:

- `src/app/layout.tsx:107` — `unsafe-json-in-html` (Security): the JSON-LD
  `<script type="application/ld+json">` embedded `JSON.stringify(JSON_LD)` raw;
  a `<` in the data could close the script tag.
- `src/app/styleguide/page.tsx:258` — `no-transition-all` (Performance): the
  Cards demo used `transition-all duration-500` while only border-color and
  box-shadow animate on hover.
- `src/app/styleguide/page.tsx:719` — `no-locale-format-in-render` (Bugs): the
  Calendar "Selected:" line built `toLocaleDateString("en-US", {…})` options on
  every render.

## Changes

- `layout.tsx` — the serialized payload is hoisted to module scope as
  `JSON_LD_SCRIPT` with `&`, `<`, `>` escaped to `\u0026`/`\u003c`/`\u003e` —
  valid JSON escapes that parse to the identical object, so the structured data
  and rendered page are unchanged.
- `styleguide/page.tsx` — `transition-all` narrowed to
  `transition-[border-color,box-shadow]`, the exact hover-animated properties
  (same fix CALENDAR1-adjacent slices used on origin/main, ac2a07f).
- `styleguide/page.tsx` — `Intl.DateTimeFormat("en-US", {…})` hoisted to
  module-scope `LONG_DATE_FORMATTER`; the `<p>` calls `.format(date)` and
  carries `suppressHydrationWarning` since the printed day is client-local by
  design (same fix as d19741c on origin/main / ed1bba9's calendar pattern).

## Verification

- `npx react-doctor@0.9.14 --json` post-change — **57 diagnostics** (was 60).
  `unsafe-json-in-html`: 0 rows repo-wide. `no-locale-format-in-render`: 0 rows
  repo-wide. `no-transition-all`: 0 rows on `styleguide/page.tsx` (5 pre-existing
  rows remain in `src/components/v2/*`, untouched). `layout.tsx`: 0 rows.
  `styleguide/page.tsx` keeps 3 pre-existing rows for other rules
  (`no-giant-component`, `no-array-index-as-key`, `rendering-conditional-render`),
  out of scope for this slice.
- `pnpm lint` — clean.
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 166/166 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all 30 routes generated.

## Remaining

57 diagnostics at this HEAD: `use-lazy-motion` ×18 (suppressed-note class —
per-file conversion adds the feature bundle while siblings ship full motion),
`no-array-index-as-key` ×8, `only-export-components` ×5, `no-transition-all`
×5 (all in `src/components/v2/*`), plus singletons and pairs across the ui and
motion primitives. The origin/main line carries earlier RD fixes for several of
these rules that have not been ported to master.
