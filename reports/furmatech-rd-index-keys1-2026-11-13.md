# FURMATECH-RD-INDEX-KEYS1 — react-doctor no-array-index-as-key

Date: 2026-11-13 · Slice: FURMATECH-RD-INDEX-KEYS1

Source: react-doctor@0.9.14 `--json --no-score` on this worktree (pre-change scan showed
3 `no-array-index-as-key` diagnostics on the 3 owned files; post-change scan shows 0).

## Diagnostics and what each was

- `src/components/home/SectionReelBar.tsx:103` — the reel strip keyed ghost spacer rows
  with `` `ghost-${columnOffset}-${i}` ``, embedding the row index. Each `ReelColumn`
  renders at most one ghost row (head spacer for `columnOffset === -1`, tail spacer for
  `+1`, none for `0`), so `` `ghost-${columnOffset}` `` is already a stable, unique key
  within the strip; the index suffix was redundant. Item rows keep `row.item.id`.
- `src/components/motion/SplitReveal.tsx:63` — word/line units were keyed
  `` `${unit}-${i}` ``, so duplicate words ("the", "and") got distinct keys only by
  position. Units are now pre-keyed by occurrence count: a `Map` pass assigns each
  repeated unit `${unit}-${occurrence}` (first `word-0`, second `word-1`, …), which is
  injective, content-derived, and independent of the map index. The stagger `delay`
  still uses the map index `i`, which the rule does not flag — only key usage is checked.
- `src/components/motion/StaggerReveal.tsx:52` — every wrapped child was keyed `key={i}`.
  Keys now prefer the child's own `child.key` when it is a valid element with a key
  (all in-repo callers already key their children, e.g. `key={logo.name}`), falling back
  to a per-render `anonymous-${n}` counter for anonymous/string children. `Children.map`
  namespaces the keys it returns, so uniqueness is preserved either way.

## Changes

- `SectionReelBar.tsx`: ghost-row key dropped the `-${i}` suffix; `rows.map` no longer
  takes the unused index parameter.
- `SplitReveal.tsx`: added `occurrences`/`keyedUnits` pass; JSX maps `keyedUnits` and
  keys spans by `key`.
- `StaggerReveal.tsx`: `Children.map` callback uses `isValidElement(child) &&
  child.key != null ? child.key : `anonymous-${anonymousIndex++}``; added
  `isValidElement` to the react import.

## Verification

- `npx react-doctor@0.9.14 --json --no-score` on the 3 files — `no-array-index-as-key: 0`
  (was 3). Remaining rows are the pre-existing `use-lazy-motion` warnings on
  `SplitReveal.tsx:4` and `StaggerReveal.tsx:5`, out of scope for this slice.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
