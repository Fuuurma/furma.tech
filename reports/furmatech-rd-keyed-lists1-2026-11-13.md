# FURMATECH-RD-KEYED-LISTS1 — react-doctor no-array-index-as-key (residuals)

Date: 2026-11-13 · Slice: FURMATECH-RD-KEYED-LISTS1 (WORK.md row 407)

Source: react-doctor@0.9.14 `--json --no-score` on this worktree — pre-change scan at
HEAD a4f6330 showed 4 `no-array-index-as-key` diagnostics on the 4 owned files;
post-change scan shows 0. Same four sites the FURMATECH-RD-SMALLRULES1 report listed
as remaining rows outside its scope.

## Live list at HEAD (react-doctor@0.9.14 `--json --no-score`, a4f6330)

- `src/components/ui/ScrollReveal.tsx:58` — `StaggerChildren` wrapped each array
  child in a div keyed `key={index}`.
- `src/components/ui/breadcrumb.tsx:180` — the legacy auto-generating `Breadcrumbs`
  keyed each crumb `key={index}`.
- `src/components/ui/field.tsx:205` — `FieldError` keyed deduplicated error `<li>`s
  `key={index}`.
- `src/components/v2/V2Manifesto.tsx:84` — creed words keyed `` `${word}-${i}` ``,
  so repeated words ("the", "and") were distinct only by position.

## Changes

- `ScrollReveal.tsx` — mirrors the FURMATECH-RD-INDEX-KEYS1 `StaggerReveal` fix:
  each wrapper key prefers the child's own `child.key` when it is a valid element
  with a key, falling back to a per-render `anonymous-${n}` counter for anonymous
  or string children. The `Array.isArray` branch and the stagger `transitionDelay`
  still use the map index `i`, which the rule does not flag — only key usage is
  checked. Rendered order and content unchanged.
- `breadcrumb.tsx` — crumb key is now the composite `` `${item.label}:${item.href ?? ""}` ``
  built from the item's own fields; `generateBreadcrumbs` output is untouched, so
  order and content are identical.
- `field.tsx` — error `<li>` key is `error.message`. `uniqueErrors` is already
  deduplicated by message via the `Map` pass, so messages are unique among rendered
  rows; entries without a message render nothing as before.
- `V2Manifesto.tsx` — words are pre-keyed by occurrence count (the
  `SplitReveal` pattern): a `Map` pass assigns each repeated word
  `` `${word}-${occurrence}` `` (first `word-0`, second `word-1`, …), injective,
  content-derived, and independent of the map index. `Word`'s scroll `index` prop
  still uses the map index for the opacity window, which the rule does not flag.

## Verification

- `npx react-doctor@0.9.14 --json --no-score` on the 4 files — `no-array-index-as-key: 0`
  (was 4). Remaining rows are the pre-existing `prefer-tag-over-role` warning on
  `breadcrumb.tsx:70` and the `use-lazy-motion` warning on `V2Manifesto.tsx:4`,
  both out of scope for this slice.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all 24 routes prerendered.
