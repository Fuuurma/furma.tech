# FURMATECH-RD-RENDER-HYGIENE1 — react-doctor no-locale-format-in-render / no-array-index-as-key

Date: 2026-11-13 · Slice: FURMATECH-RD-RENDER-HYGIENE1 (WORK.md row 394)

Source: react-doctor@0.9.14 `--json` lane scan @28efd09 flagged
`no-locale-format-in-render` at `src/app/styleguide/page.tsx:719` and
`no-array-index-as-key` at `src/app/styleguide/page.tsx:962`. Both were already
resolved on `origin/main` by d19741c ("fix(ui): hoist styleguide date formatter,
key component cards by name", landed ahead of STYLEGUIDE2's ac2a07f); this slice
re-located both sites post-ac2a07f, verified 0 rows, and records the result.

## Diagnostics and what each was

- `no-locale-format-in-render` (was :719, scan-time) — the Calendar "Selected:"
  line called `date.toLocaleDateString("en-US", {…})` inside render. d19741c
  hoisted the options into a module-scope `LONG_DATE_FORMATTER`
  (`Intl.DateTimeFormat`, page.tsx:87) and the JSX now calls
  `LONG_DATE_FORMATTER.format(date)` (:726), with `suppressHydrationWarning` on
  the `<p>` since the printed day is client-local by design.
- `no-array-index-as-key` (was :962, scan-time) — the §20 component-inventory
  grid mapped `.map((comp, i) => <div key={i}>)`. d19741c dropped the index
  parameter and keys each card by `comp.name` (:969), a stable content id unique
  within the static list.

## Verification

- `npx react-doctor@0.9.14 --json --no-score src/app/styleguide/page.tsx` at
  4dcc956 — 0 rows for `no-locale-format-in-render` and `no-array-index-as-key`.
  The file's only remaining diagnostic is the pre-existing P3
  `no-giant-component` (:104), out of scope for this slice.
- `pnpm lint` — clean (0 errors; the 1 pre-existing `src/lib/metadata.ts`
  unused-`_params` warning pattern is unchanged).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all 24 routes prerendered including `/styleguide`.
