# FURMATECH-RD-CLEANUP1 — react-doctor effect-needs-cleanup (verification)

Date: 2026-11-13 · Slice: FURMATECH-RD-CLEANUP1 (WORK.md row 388) · Verified at ac2a07f on origin/main

## Outcome

Already landed — no code change needed. WORK.md row 388 is auto-intake from the
react-doctor stream scan @28efd09; the same three `effect-needs-cleanup` diagnostics
were fixed and landed earlier the same day as FURMATECH-RD-EFFECT-CLEANUP1 in e1579f1
(`fix(effects): guarantee cleanups in the screens and the carousel`), with the full
analysis in `reports/furmatech-rd-effect-cleanup1-2026-11-13.md`. This slice re-verified
the rows on current origin/main (de092ea and ac2a07f landed since the scan) and adds
this record only.

## Re-located rows (scan line numbers had drifted)

- `src/components/dither-wave-tw.tsx` — flagged `useEffect` now at :217. It returns a
  teardown (:711-727) that cancels the RAF, disconnects `observer`, `themeObserver`,
  `reserveObserver` and `intersection`, removes the `matchMedia` resolution listener
  and the six idle-swell `window` listeners, and calls `unbind?.()` for the pointer
  binding. The reserve-target `observe/unobserve` sync runs on the frame path
  (`syncReserves` inside `step`), not inside `paint`, so no subscription is created
  inside a subscription's own callback.
- `src/components/liquid-ascii-tw.tsx` — flagged `useEffect` now at :229. Teardown is
  the shared `dispose()` (:858-866), returned on the early `layout()` failure path
  (`if (!body) return dispose;` :871) and on the normal path (`return dispose;` :885) —
  the leak the scan flagged (observers subscribed before `layout()` could return null)
  is closed on unmount while the resize-retry observers stay alive until then.
- `src/components/ui/carousel.tsx` — flagged `useEffect` now at :96. The cleanup
  removes both `"reInit"` and `"select"` handlers (:106-109); the scan-era asymmetry
  (only `"select"` removed) is gone.

## Verification (this worktree @ ac2a07f)

- `npx react-doctor@0.9.14 --json --no-score` — `effect-needs-cleanup: 0` rows on the
  three files and 0 repo-wide (37 warnings total, all other rules). Remaining rows on
  the touched files are pre-existing and out of scope: `no-giant-component` P3
  (dither-wave-tw.tsx:190, liquid-ascii-tw.tsx:186) and `no-pass-data-to-parent`,
  `no-pass-live-state-to-parent`, `no-prop-callback-in-effect`,
  `jsx-no-constructed-context-values` on carousel.tsx:93/114.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all routes prerendered as static content.
