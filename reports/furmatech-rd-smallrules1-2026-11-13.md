# FURMATECH-RD-SMALLRULES1 — react-doctor only-export-components / no-array-index-as-key / prefer-use-effect-event

Date: 2026-11-13 · Slice: FURMATECH-RD-SMALLRULES1 (WORK.md row 400)

Source: react-doctor@0.9.14 lane scan @28efd09
(`stream/mechanical/2026-11-13-react-doctor-furma.tech.md`) flagged three
findings. All three were already resolved on `origin/main` by earlier slices;
this slice re-derived the live list at HEAD ae0dc9d, verified 0 rows for the
three named sites, and records the result. No code change.

## Live list at HEAD (react-doctor@0.9.14 `--json --no-score`, ae0dc9d)

Repo-wide: 37 diagnostics — `use-lazy-motion` ×16 (suppressed-note class),
`only-export-components` ×4, `no-array-index-as-key` ×4, plus singletons
(`no-giant-component` ×3, `jsx-no-constructed-context-values` ×2,
`prefer-tag-over-role` ×2, `no-high-complexity-react-function`,
`no-locale-format-in-render`, `no-pass-data-to-parent`,
`no-pass-live-state-to-parent`, `no-prop-callback-in-effect`,
`no-redundant-roles`). `prefer-use-effect-event`: 0 rows repo-wide.

The three named sites:

- `only-export-components` (was `Analytics.tsx:28`) — 0 rows. `trackEvent`
  moved verbatim to `src/lib/analytics.ts` by 88ab55a (FURMATECH-RD-V2-CLEANUP1);
  `Analytics.tsx` now exports only the `Analytics` component, and
  `src/app/layout.tsx` imports only that. `trackEvent` has no callers.
- `no-array-index-as-key` (was `SectionReelBar.tsx:103`) — 0 rows. c16fd6e
  (FURMATECH-RD-INDEX-KEYS1) dropped the `-${i}` suffix from the ghost spacer
  key: `` `ghost-${columnOffset}` `` is unique per strip (each `ReelColumn`
  renders at most one ghost row), and item rows keep `row.item.id`.
- `prefer-use-effect-event` (was `PortfolioNavDropdown.tsx:138`, scan-time
  deps `[open, closeMenu]`) — 0 rows. 8b2297b bound `closeMenu` through
  `useEffectEvent` (`closeMenuEvent`, :101); the dismiss effect now depends on
  `[open]` only and calls `closeMenuEvent()` for Escape and outside-pointer.

## Remaining rows for the same rule names (outside this slice's files)

- `only-export-components`: `src/components/ui/{badge,button,tabs,toggle}.tsx`
  — cva `*Variants` exports beside the component (shadcn-style primitives).
- `no-array-index-as-key`: `src/components/ui/ScrollReveal.tsx:58`,
  `src/components/ui/breadcrumb.tsx:180`, `src/components/ui/field.tsx:205`,
  `src/components/v2/V2Manifesto.tsx:84`.

## Verification

- `npx react-doctor@0.9.14 --json --no-score` on the four touched-path files
  (`Analytics.tsx`, `SectionReelBar.tsx`, `PortfolioNavDropdown.tsx`,
  `src/lib/analytics.ts`) at ae0dc9d — 0 rows for all three rules; the only
  diagnostic is the pre-existing `use-lazy-motion` warning on
  `PortfolioNavDropdown.tsx:14`, out of scope.
- `pnpm lint` — clean (0 errors; the pre-existing `src/lib/metadata.ts`
  unused-`_params` warning pattern is unchanged).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all routes prerendered.
