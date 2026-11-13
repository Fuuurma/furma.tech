# FURMATECH-RD-FOOTER-NAV1 — react-doctor no-redundant-roles / prefer-use-effect-event

Date: 2026-11-13 · Slice: FURMATECH-RD-FOOTER-NAV1 · Landed: 8b2297b on origin/main

Source: react-doctor@0.9.14 `--json --no-score` on this worktree (pre-change scan showed
4 diagnostics on the 3 owned files; post-change scan shows 1).

## Diagnostics and what each was

- `src/components/studio/StudioSiteFooter.tsx:9` — `no-redundant-roles`: explicit
  `role="contentinfo"` on `<footer>`, which already maps to `contentinfo`. Removed; the
  element's implicit semantics are unchanged.
- `src/components/studio/StudioWaterFooter.tsx:53` — same redundant role on the water
  footer's `<footer>`. Removed.
- `src/components/home/PortfolioNavDropdown.tsx:138` — `prefer-use-effect-event`: the
  Escape/pointerdown effect listed `closeMenu` in its deps, so it re-subscribed whenever
  the callback changed identity. `closeMenu` stays a `useCallback` for the JSX handlers
  (`onClick`, `onNavigate`, touch toggle); the effect's sub-handlers now call
  `closeMenuEvent = useEffectEvent(closeMenu)`, which always invokes the latest
  `closeMenu` but is not a dependency, so the effect subscribes once per `open` flip.
  Menu behavior is identical: same listeners, same cleanup, same close path.

## Changes (commit 8b2297b)

- Removed `role="contentinfo"` from both studio footers (DOM output loses only the
  redundant attribute; the accessibility tree is unchanged).
- `PortfolioNavDropdown.tsx`: imported `useEffectEvent`, added `closeMenuEvent`, pointed
  the two effect sub-handlers at it, dropped `closeMenu` from the dep array (`[open]`).

## Verification

- `npx react-doctor@0.9.14 --json --no-score` on the 3 files — `no-redundant-roles: 0`,
  `prefer-use-effect-event: 0` (was 3 total). The one remaining row is the pre-existing
  P3 `use-lazy-motion` on `PortfolioNavDropdown.tsx:14`, out of scope.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
