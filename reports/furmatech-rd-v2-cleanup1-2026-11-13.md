# FURMATECH-RD-V2-CLEANUP1 — react-doctor cleanup on Analytics + /v2 chrome

Date: 2026-11-13 · Slice: FURMATECH-RD-V2-CLEANUP1

Source: react-doctor@0.9.14 on this worktree (pre-change scan showed 5
diagnostics on the 3 owned files; post-change scan shows 2, both
pre-existing `use-lazy-motion` rows out of scope for this slice).

## Diagnostics and what each was

- `src/components/Analytics.tsx:28` — `react-doctor/only-export-components`:
  the file exported the `Analytics` component plus the `trackEvent` helper.
  `trackEvent` moved verbatim (JSDoc included) to `src/lib/analytics.ts`, a
  plain utility module; `Analytics.tsx` now exports only the component. The
  function had no callers in the repo — `src/app/layout.tsx` imports only
  `Analytics` — so no call sites needed updating. `window.va` keeps resolving
  through the `@vercel/analytics` global `Window` augmentation.
- `src/components/v2/V2Experience.tsx:118` —
  `react-doctor/no-non-literal-selector-query-without-try-catch`: the Lenis
  anchor handler passed the raw `href` (`#…`) to `document.querySelector`,
  which throws `SyntaxError` on selectors CSS cannot parse (e.g. `#123`).
  The lookup is now wrapped in `try/catch`; an invalid selector returns
  early exactly like a missing element.
- `src/components/v2/V2Nav.tsx:18` — `react-doctor/js-hoist-intl`: the Sitges
  clock built an `Intl.DateTimeFormat` inside the mount effect. The formatter
  is now the module-scope `SITGES_CLOCK_FORMATTER` constant (same options,
  same `en-GB`/`Europe/Madrid` shape as `LONG_DATE_FORMATTER` in
  `src/app/styleguide/page.tsx`), built once; the effect only formats.

## Changes

One new file (`src/lib/analytics.ts`), one export removed from
`Analytics.tsx`, one `try/catch` around the selector lookup, one formatter
hoisted. No markup, timing, or behaviour changes.

## Verification

- `npx react-doctor@0.9.14 --no-supply-chain` on the 3 files + the new lib —
  `only-export-components: 0`, `no-non-literal-selector-query-without-try-catch: 0`,
  `js-hoist-intl: 0` (was 1 each). Remaining rows are the pre-existing
  `use-lazy-motion` ×2 (`V2Experience.tsx:4`, `V2Nav.tsx:5`), out of scope.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts`
  unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — production build succeeds, all routes static.
