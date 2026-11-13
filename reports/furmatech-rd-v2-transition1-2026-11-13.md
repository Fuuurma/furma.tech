# FURMATECH-RD-V2-TRANSITION1 — react-doctor no-transition-all

Date: 2026-11-13 · Slice: FURMATECH-RD-V2-TRANSITION1

Source: react-doctor@0.9.14 on this worktree (pre-change scan showed 5
`no-transition-all` diagnostics on the 4 owned files; post-change scan shows 0).

## Diagnostics and what each was

- `src/components/v2/V2Contact.tsx:149` — the "Send to the workshop" submit button
  used `transition-all duration-300`. Its only animated properties are
  `background-color` (`hover:bg-[var(--v2-cream-on-dark)]`) and `opacity`
  (`disabled:opacity-60`), so the class is now
  `transition-[background-color,opacity] duration-300` — same two properties,
  same 300ms timing.
- `src/components/v2/V2Manifesto.tsx:110` — the principle-row rule line grew
  `w-8 → group-hover:w-14`; only `width` animates, so
  `transition-[width] duration-500` replaces `transition-all duration-500`.
- `src/components/v2/V2Verticals.tsx:83` and `:135` — the `↗` affordances on the
  SaaS and Aitlas row links animate `translate-x-1` plus `opacity-0 → 100` on
  `group-hover/item`. Tailwind v4 emits `translate-x-*` as the native `translate`
  property (verified against the compiled utilities: `transition-transform`
  expands to `transform, translate, scale, rotate`), so the scoped list is
  `transition-[opacity,translate] duration-300` — both animated properties, same
  timing.
- `src/components/v2/V2WorkIndex.tsx:152` — identical `↗` pattern on the work
  index rows (`group-hover:translate-x-1 group-hover:opacity-100`), same
  `transition-[opacity,translate] duration-300`.

## Changes

Five class-string substitutions across the four owned files; no markup, logic,
or timing changes. Arbitrary `transition-[...]` lists match the convention
already used in `V2Nav.tsx` (`transition-[background-color,border-color,backdrop-filter]`)
and `PlasticHome.tsx` (`transition-[transform,opacity]`).

## Verification

- `npx react-doctor@0.9.14 --no-supply-chain` on the 4 files — `no-transition-all: 0`
  (was 5). Remaining rows are pre-existing `use-lazy-motion` ×4 and
  `no-array-index-as-key` ×1, out of scope for this slice.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — production build succeeds.
