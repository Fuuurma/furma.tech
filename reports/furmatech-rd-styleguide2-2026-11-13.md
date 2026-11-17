# FURMATECH-RD-STYLEGUIDE2 — react-doctor no-transition-all / rendering-conditional-render / no-adjust-state-on-prop-change

Date: 2026-11-13 · Slice: FURMATECH-RD-STYLEGUIDE2

Source: `npx react-doctor@0.9.14 --json src/app/styleguide/page.tsx src/components/ThemeProvider.tsx`
in this worktree (pre-change scan: 3 warnings — `no-giant-component` P3 at page.tsx:104
(out of scope, left by STYLEGUIDE1), `no-transition-all` at page.tsx:265,
`no-adjust-state-on-prop-change` at ThemeProvider.tsx:29; post-change scan: 1 warning,
the same pre-existing `no-giant-component` P3).

## Diagnostics and what each was

- `src/app/styleguide/page.tsx:265` — `no-transition-all`: the Cards demo card animated
  every property on hover. Replaced with `transition-[border-color,box-shadow]`, the
  explicit property list covering exactly what the hover changes
  (`hover:border-foreground/30`, `hover:shadow-2xl hover:shadow-foreground/5`), matching
  the convention landed for the /v2 sections in 49fb194 and `transition-[color,box-shadow]`
  in `ui/slider.tsx`. `duration-500` unchanged.
- `rendering-conditional-render` (`{comp.length && ...}`) — already resolved before this
  slice: fd80c0d gated every component-grid metadata row on `Boolean(comp.<prop>?.length)`
  and pinned the invariant in `tests/styleguide-component-grid.test.ts`. react-doctor
  reports no `rendering-conditional-render` finding on the file; no edit needed.
- `src/components/ThemeProvider.tsx:29` — `no-adjust-state-on-prop-change`: the
  `setIsMounted(true)` mount effect (plus the `isMounted` gate on the DOM-sync effect).
  Replaced with `useSyncExternalStore`: the stored theme is now an external store read
  (`readStoredTheme` + `storage`-event subscription, `getServerSnapshot` → `null`), so the
  post-hydration stored value arrives via React's own store-consistency re-render — no
  setState-in-effect at all. A session `override` state carries user toggles; `setTheme`
  writes localStorage directly. The remaining effect only syncs `documentElement`'s
  `light`/`dark` class (no setState → `react-hooks/set-state-in-effect` clean) and no
  longer writes localStorage, so the mount sequence cannot clobber a stored theme with
  the default before resolution — the transient-write window the `isMounted` gate existed
  to prevent is gone by construction. Side benefit: cross-tab `storage` events now
  propagate the theme. First-visit persistence of the default key is dropped (absent key
  already resolves to `defaultTheme`; nothing else reads `furma-theme`).

Note: `react-hooks/set-state-in-effect` reports only the FIRST setState call per effect,
which is why the old file passed lint — the disabled `setIsMounted` masked the later
`setTheme(stored)`. Any synchronous setState left in the mount effect errors once the
mounted flag is gone, so the store approach was required, not optional.

## Verification

- `npx react-doctor@0.9.14 --json` on both files — `no-transition-all: 0`,
  `no-adjust-state-on-prop-change: 0`, `rendering-conditional-render: 0`. Remaining row is
  the pre-existing P3 `no-giant-component` (page.tsx:104), out of scope.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all routes prerendered including `/styleguide`.
