# FURMATECH-MAIN-PORT1 — react-doctor fixes ported from stale origin/main to master

Lane `fleet/furmatech-main-port1`, 2026-11-14. Ports the missing half of
`origin/main` (322eff3) onto `origin/master` per section 5 of
`reports/furmatech-branch-reconcile1-2026-11-14.md`. `origin/main` was NOT
deleted or pushed — retirement follows after this lands.

## Cherry-picked (9 commits, provenance preserved)

| source (origin/main) | lane commit | notes |
|---|---|---|
| `fd80c0d` styleguide array-length gates | `83b83e8` | conflict resolved: kept master's `key={comp.name}`; gated block taken from source |
| `e1579f1` effect cleanups | `e137781` | carousel hunk skipped — master's `carousel.tsx` already removes `reInit`+`select` via `useSyncExternalStore`; `liquid-ascii-tw.tsx` hand-merged onto master's dual-atlas (`skyAtlas`) version |
| `8b2297b` footer roles + effect-event | `f66427d` | `StudioWaterFooter` needed nothing (no `role="contentinfo"` on master) |
| `c66635a` semantic nav + touch guard | `2a46bc7` | `useSmoothSectionScroll` hand-merged: kept master's `shouldAdvanceSection` boundary logic, added only the `changedTouches[0]` guard |
| `c16fd6e` stable keys (reel/motion) | `2108a12` | `StaggerReveal` import conflict resolved keeping master's `useStableReducedMotion` |
| `49fb194` v2 scoped transitions | `795e29b` | clean |
| `6045912` Set-membership reserve sync | `4377e07` | clean |
| `f5abf55` cva helpers → `src/lib/*-variants.ts` | `107caca` | clean; only consumer was `calendar.tsx` |
| `9ef5cf1` stable keys (ScrollReveal/breadcrumb/field/V2Manifesto) | `abab424` | clean |

## Partial port

- `88ab55a` → only `V2Experience` `querySelector` try/catch (`500270f`).
  V2Nav's `SITGES_CLOCK_FORMATTER` hoist does not apply — master's V2Nav has
  no `SitgesClock`. The analytics export split already exists on master as
  `src/lib/track-event.ts` (NEXT4); `Analytics.tsx` exports only `Analytics`.

## Deliberately skipped

- Patch-equivalents already on master: `e3b0ef9`, `83012ab`, `0268d48`,
  `ea85c9a` (minimatch override present as `c805167`).
- `ac2a07f`, `d19741c` — fully covered by master's NEXT3/NEXT4
  (`LONG_DATE_FORMATTER`, `suppressHydrationWarning`, `key={comp.name}`,
  scoped card transition, `useSyncExternalStore` ThemeProvider).
- `25d077d` F105 agent-guide sync — stale; master's guide docs are newer.
- 12 × `docs(reports)/furmatech-rd-*.md` verification records — main's
  history, not ported; this report + the reconcile report are the evidence.

## Verification

- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test` (167/167), `pnpm build` — all green.
- `npx react-doctor@0.9.14 --json` on pristine `origin/master` export: 54
  diagnostics. On this branch: 29. Every ported rule reads 0 rows:
  `no-transition-all` 5→0, `no-array-index-as-key` 7→0,
  `only-export-components` 4→0, `effect-needs-cleanup` 2→0,
  `js-set-map-lookups` 2→0, `prefer-tag-over-role` 3→2 (reel fixed;
  breadcrumb/item are baseline on both branches), `no-redundant-roles` 2→1
  (footer fixed; pagination is baseline), `prefer-use-effect-event` 1→0,
  `no-non-literal-selector-query-without-try-catch` 1→0,
  `no-array-index-deref-without-bounds-or-empty-guard` 1→0.
- The 29 remaining rows are baseline noise also present on `origin/main`
  (`use-lazy-motion` ×18, giant-component, carousel context-values, etc.) —
  no change applied twice, no new rows introduced (the single
  `use-lazy-motion` "move" in PortfolioNavDropdown is a line shift from the
  added `useEffectEvent` import).

## Left for the coordinator

- Land `fleet/furmatech-main-port1` onto `origin/master` (fast-forward),
  verify deploy, then `git push origin --delete main` per the reconcile
  report's retirement step.
- Pre-existing (not port scope): master's `liquid-ascii-tw.tsx`
  `onResolution` calls `buildAtlas(r)` without assigning the returned
  canvas to `atlas`/`skyAtlas` — the DPR-change redraw may be a no-op on
  master. Worth a follow-up row.
