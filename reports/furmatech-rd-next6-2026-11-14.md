# FURMATECH-RD-NEXT6 — react-doctor prefer-tag-over-role / no-pass-*-to-parent / no-prop-callback-in-effect / jsx-no-constructed-context-values

Date: 2026-11-14 · Slice: FURMATECH-RD-NEXT6 · Lane `fleet/furmatech-rd-next6` @ `origin/master` 26709cb

Source: react-doctor@0.9.14 `--json` on this worktree — pre-change scan at HEAD
26709cb showed **26 diagnostics**, not the 51 the row brief carried (that count
was NEXT5's pre-port-master figure; the MAIN-PORT1 + NEXT5 landings cleared the
rest). Post-change scan shows **21**. Every non-deferred, non-redesign row in
the live list is fixed — the complete reachable set was these five diagnostics
in two files.

## Live list at HEAD (react-doctor@0.9.14 `--json`, 26709cb)

26 diagnostics: `use-lazy-motion` ×18 (deferred class), `no-giant-component` ×3
(redesign), and five fixable rows:

- `src/components/ui/breadcrumb.tsx:70` — `prefer-tag-over-role`
  (Accessibility): `BreadcrumbPage` rendered `<span role="link">`.
- `src/components/ui/carousel.tsx:98` — `no-pass-data-to-parent`,
  `no-pass-live-state-to-parent`, `no-prop-callback-in-effect` (Bugs, all one
  root cause): `setApi(api)` prop callback fired from `useEffect`.
- `src/components/ui/carousel.tsx:103` — `jsx-no-constructed-context-values`
  (Performance): `CarouselContext.Provider` `value` built inline.

## Changes

- `breadcrumb.tsx` — `BreadcrumbPage` is `<a>` now (props type
  `ComponentProps<"a">`). All attributes kept verbatim, including
  `role="link"`: a bare `<a>` without `href` has no implicit role, so the
  explicit role is a correct addition, not redundant (`no-redundant-roles`
  resolves `a` through the attribute-aware path), and `prefer-tag-over-role`
  skips `<a>` elements whose role isn't `button`. `anchor-is-valid` stays
  silent because `{...props}` could supply `href`. The a11y tree and visuals
  are identical; the only rendered change is the tag the rule asked for.
- `carousel.tsx` — two changes, no behaviour or rendered-output change:
  1. `jsx-no-constructed-context-values`: the provider `value` moved into
     `React.useMemo` with the full dep list (`carouselRef`, `api`, `opts`,
     `orientation`, `scrollPrev`, `scrollNext`, `canScrollPrev`,
     `canScrollNext`). Same fields, same expression; consumers now keep a
     stable context value instead of redrawing on every `Carousel` render.
  2. The `setApi` prop and its `useEffect` notification are removed. `setApi`
     had zero consumers repo-wide (only `styleguide/page.tsx` uses `Carousel`,
     without it); descendants already read `api` through `useCarousel()` —
     the rule-endorsed "return it from the hook" path. A parent callback for
     a child-owned embla instance can only fire post-mount, which is exactly
     what the three Bugs rules flag, so keeping the feature meant keeping the
     diagnostic. `CarouselApi` stays exported (it types `useCarousel().api`).

## Verification

- `npx react-doctor@0.9.14 --json` post-change — **21 diagnostics** (was 26).
  `prefer-tag-over-role` 1→0, `no-pass-data-to-parent` 1→0,
  `no-pass-live-state-to-parent` 1→0, `no-prop-callback-in-effect` 1→0,
  `jsx-no-constructed-context-values` 1→0. Zero rows on the touched files;
  no new rows introduced.
- `pnpm lint` — clean.
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 167/167 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all 30 routes generated.

## Remaining

21 diagnostics at this HEAD, all in the two excluded classes:
`use-lazy-motion` ×18 (deferred class — per-file conversion adds the feature
bundle while siblings ship full motion) and `no-giant-component` ×3
(`liquid-ascii-tw.tsx`, `dither-wave-tw.tsx`, `styleguide/page.tsx` — redesign
rows). No fixable non-deferred diagnostics remain.
