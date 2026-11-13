# FURMATECH-RD-BLOCKS-SET1 — react-doctor js-set-map-lookups

Date: 2026-11-13 · Slice: FURMATECH-RD-BLOCKS-SET1

Source: react-doctor@0.9.14 `--json --no-score` on this worktree (pre-change scan showed
2 `js-set-map-lookups` diagnostics on the 2 owned files; post-change scan shows 0).

## Diagnostics and what each was

- `src/components/dither-wave-tw.tsx:330` — `syncReserves` collected
  `[data-screen-reserve]` elements into an array and tested membership with
  `blocks.includes(element)` inside the loop over `observed`, an O(n) scan per
  observed element on every re-sync.
- `src/components/liquid-ascii-tw.tsx:595` — identical `syncReserves` body, same
  `blocks.includes(element)` lookup.

## Changes

Both files: `blocks` is now a `Set` built straight from the
`querySelectorAll<HTMLElement>("[data-screen-reserve]")` NodeList
(`new Set(nodeList)` replaces `Array.from(nodeList)`), and the membership test
is `blocks.has(element)`. Set iteration order is insertion order, which is the
NodeList's document order, and `querySelectorAll` never returns the same element
twice — so the second loop still visits blocks in exactly the same order and the
unobserve/re-observe behaviour is unchanged. `SameValueZero` semantics of
`Set.has` match `Array.includes` for element identity.

## Verification

- `npx react-doctor@0.9.14 --json --no-score` on the 2 files — `js-set-map-lookups: 0`
  (was 2). Remaining rows are the pre-existing `no-giant-component` warnings on
  `DitherWave` and `LiquidAscii`, out of scope for this slice.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green, 24/24 static pages.
