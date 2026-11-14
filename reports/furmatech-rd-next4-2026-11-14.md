# FURMATECH-RD-NEXT4 — react-doctor no-array-index-as-key / rendering-conditional-render / only-export-components

Date: 2026-11-14 · Slice: FURMATECH-RD-NEXT4 (WORK.md auto-intake row, after
FURMATECH-RD-NEXT3 landed 6e1731c on origin/master)

Source: react-doctor@0.9.14 `--json` on this worktree — pre-change scan at HEAD
6e1731c showed 57 diagnostics; post-change scan shows 54. The three rows below
are the first fixable entries in live-list order; `no-giant-component` and the
`use-lazy-motion` deferred class were skipped as redesign/deferred work.

## Live list at HEAD (react-doctor@0.9.14 `--json`, 6e1731c)

57 diagnostics. Fixed rows:

- `src/app/styleguide/page.tsx:969` — `no-array-index-as-key` (Bugs): the
  component-inventory grid used `key={i}` over a static literal whose every
  entry has a unique `name`.
- `src/app/styleguide/page.tsx:983` — `rendering-conditional-render` (Bugs):
  `{comp.length && …}` reads as a numeric `length` to the rule; the property
  actually holds a `string[] | undefined`.
- `src/components/Analytics.tsx:28` — `only-export-components`
  (Maintainability): the file exported the `Analytics` component plus the
  `trackEvent` helper, which Fast Refresh cannot preserve state across.

## Changes

- `styleguide/page.tsx` — `key={i}` → `key={comp.name}` and the now-unused map
  index param dropped; same convention as `key={c.name}` earlier in the file.
  Keys are not rendered, so output is identical.
- `styleguide/page.tsx` — `{comp.length && <div>…</div>}` →
  `{comp.length ? <div>…</div> : null}`; identical rendered output (`undefined`
  and `null` both render nothing; arrays are always truthy either way).
- `Analytics.tsx` — `trackEvent` moved verbatim to `src/lib/track-event.ts`
  (new file, 2 files touched total for the row). It had no importers; the
  `window.va` global comes from `@vercel/analytics` types and still resolves.
  `Analytics` remains the file's only export.

## Verification

- `npx react-doctor@0.9.14 --json` post-change — **54 diagnostics** (was 57).
  `no-array-index-as-key`: 8 → 7, 0 rows on `styleguide/page.tsx`.
  `rendering-conditional-render`: 1 → 0 repo-wide.
  `only-export-components`: 5 → 4, 0 rows on `Analytics.tsx`;
  `src/lib/track-event.ts` reports 0 rows.
  `styleguide/page.tsx` keeps its pre-existing `no-giant-component` row
  (redesign class, out of scope for this slice).
- `pnpm lint` — clean.
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 166/166 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all 30 routes generated.

## Remaining

54 diagnostics at this HEAD: `use-lazy-motion` ×18 (deferred class — per-file
conversion adds the feature bundle while siblings ship full motion),
`no-array-index-as-key` ×7, `no-transition-all` ×5 and `only-export-components`
×4 (remaining rows in `src/components/v2/*`, `src/components/ui/*`,
`src/components/motion/*`), `no-giant-component` ×3 (redesign),
`prefer-tag-over-role` ×3, `no-redundant-roles` ×2, `effect-needs-cleanup` ×2,
`js-set-map-lookups` ×2, plus singletons (`no-high-complexity-react-function`,
`prefer-use-effect-event`, `no-array-index-deref-without-bounds-or-empty-guard`,
`no-pass-data-to-parent`, `no-pass-live-state-to-parent`,
`no-prop-callback-in-effect`, `jsx-no-constructed-context-values`,
`no-non-literal-selector-query-without-try-catch`).
