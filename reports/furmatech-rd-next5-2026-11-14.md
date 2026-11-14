# FURMATECH-RD-NEXT5 — react-doctor no-high-complexity-react-function / prefer-tag-over-role / no-redundant-roles

Date: 2026-11-14 · Slice: FURMATECH-RD-NEXT5 (WORK.md auto-intake row, after
FURMATECH-RD-NEXT4 landed c29c78d on origin/master)

Source: react-doctor@0.9.14 `--json` on this worktree — pre-change scan at HEAD
c29c78d showed 54 diagnostics; post-change scan shows 51. The three rows below
are the next fixable entries in live-list order that no live peer owns:
FURMATECH-MAIN-PORT1 holds every earlier non-deferred file (its port brings the
origin/main fixes for those rows), so the reachable fixable set was exactly
these three. `use-lazy-motion` (deferred class) and `no-giant-component`
(redesign) were skipped per the slice rules.

## Live list at HEAD (react-doctor@0.9.14 `--json`, c29c78d)

54 diagnostics. Fixed rows:

- `src/components/home/PlasticHome.tsx:289` — `no-high-complexity-react-function`
  (Maintainability): `ContactSlide` had cyclomatic complexity 18, cognitive
  complexity 25 (rule flags above 15 on either axis).
- `src/components/ui/item.tsx:12` — `prefer-tag-over-role` (Accessibility):
  `ItemGroup` rendered `<div role="list">`; the rule wants the semantic tag.
- `src/components/ui/pagination.tsx:10` — `no-redundant-roles`
  (Accessibility): `<nav role="navigation">` repeats the element's implicit
  role.

## Changes

- `PlasticHome.tsx` — pure code motion, no behaviour or rendered-output change:
  the sent-state block moved verbatim into `ContactSentPanel` (receives
  `sentTo`, `statusRef`, `onWriteAnother`; the ref still lands on the same
  `role="status"` div, so the sent-focus effect is unchanged), and the three
  `.plastic-letter__field` blocks moved verbatim into `ContactFields` inside a
  fragment — no wrapper node, so the DOM is identical. `clearFieldError`
  reaches the fields as `onFieldChange`; `ContactSlide` keeps all state and
  handlers. Post-change the file scans clean for the rule (the two new
  components stay under the same thresholds).
- `item.tsx` — `ItemGroup` is `<ul role="list">` now (props type
  `ComponentProps<"ul">`). The tag swap is what the rule asks for; the explicit
  `role="list"` stays because Tailwind preflight's `list-style: none` makes
  WebKit/VoiceOver drop list semantics — `no-redundant-roles` excepts
  `ul`/`list` for exactly this reason, and the component is unused in the
  repo today so no rendered output changes either way.
- `pagination.tsx` — `role="navigation"` removed from `<nav>`; same fix shape
  origin/main already uses for `StudioSiteFooter`'s `role="contentinfo"`.
  `aria-label="pagination"` keeps the landmark named.

## Verification

- `npx react-doctor@0.9.14 --json` post-change — **51 diagnostics** (was 54).
  `no-high-complexity-react-function`: 1 → 0 repo-wide.
  `prefer-tag-over-role`: 3 → 2, 0 rows on `item.tsx`.
  `no-redundant-roles`: 2 → 1, 0 rows on `pagination.tsx`.
  Touched files carry no rows for the fixed rules; `PlasticHome.tsx` keeps only
  its pre-existing deferred `use-lazy-motion` row.
- `pnpm lint` — clean.
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 166/166 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all routes generated.

## Remaining

51 diagnostics at this HEAD: `use-lazy-motion` ×18 (deferred class — per-file
conversion adds the feature bundle while siblings ship full motion),
`no-array-index-as-key` ×7, `no-transition-all` ×5 and
`only-export-components` ×4 (remaining rows in `src/components/v2/*`,
`src/components/ui/*`, `src/components/motion/*` — all owned by the live
FURMATECH-MAIN-PORT1 port), `no-giant-component` ×3 (redesign),
`prefer-tag-over-role` ×2, `no-redundant-roles` ×1,
`effect-needs-cleanup` ×2, `js-set-map-lookups` ×2, plus singletons
(`no-array-index-deref-without-bounds-or-empty-guard`,
`no-non-literal-selector-query-without-try-catch`, `no-pass-data-to-parent`,
`no-pass-live-state-to-parent`, `no-prop-callback-in-effect`,
`jsx-no-constructed-context-values`, `prefer-use-effect-event`). Every remaining
non-deferred row sits in a file the live port owns.
