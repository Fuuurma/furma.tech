# FURMATECH-RD-REEL-TOUCH1 — react-doctor prefer-tag-over-role / no-array-index-deref-without-bounds-or-empty-guard

Date: 2026-11-13 · Slice: FURMATECH-RD-REEL-TOUCH1 · Landed: c66635a on origin/main

Source: react-doctor@0.9.14 `--json --no-score` on this worktree (pre-change scan showed
3 diagnostics on the 2 owned files; post-change scan shows 1).

## Diagnostics and what each was

- `src/components/home/SectionReelBar.tsx:183` — `prefer-tag-over-role`: explicit
  `role="navigation"` on a `<div>` rendered as `StudioChrome`'s `projectsSlot`. The
  element is now a semantic `<nav>` and the redundant role is gone; `aria-label="Site
  sections"`, the class list and `data-active-index` are unchanged, so the landmark
  keeps its accessible name and every styling hook is identical (`<nav>` is
  `display: block` like `<div>`; the slot sits in a plain `<div>` inside `<header>`,
  not inside another nav).
- `src/components/home/useSmoothSectionScroll.ts:168` —
  `no-array-index-deref-without-bounds-or-empty-guard`: `e.changedTouches[0].clientY`
  was dereferenced without checking the list is non-empty. `handleTouchEnd` now reads
  `const touch = e.changedTouches[0]` and returns early when absent; the swipe
  threshold and `goTo` call are unchanged, so touch-scroll behavior is identical for
  every real touch sequence.

## Changes (commit c66635a)

- `SectionReelBar.tsx`: `projectsSlot` root swapped from
  `<div role="navigation" aria-label="Site sections">` to `<nav aria-label="Site sections">`.
- `useSmoothSectionScroll.ts`: `handleTouchEnd` guards `changedTouches[0]` before
  reading `.clientY`.

## Verification

- `npx react-doctor@0.9.14 --json --no-score` on the 2 files — `prefer-tag-over-role: 0`,
  `no-array-index-deref-without-bounds-or-empty-guard: 0` (was 1 each). The one
  remaining row is the pre-existing warning `no-array-index-as-key` on
  `SectionReelBar.tsx:103` (`key={... ?? `ghost-${columnOffset}-${i}`}`), out of scope
  for this slice.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — clean, 24/24 static pages prerendered.
