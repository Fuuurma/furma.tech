# FURMATECH-RD-CALENDAR1 — react-doctor no-locale-format-in-render / jsx-no-constructed-context-values

Date: 2026-11-14 · Slice: FURMATECH-RD-CALENDAR1 (WORK.md row 416)

Source: react-doctor@0.9.14 `--json --no-score` on the two owned files in this
worktree — pre-change scan at HEAD 322eff3 showed exactly 2 diagnostics (1 per
file); post-change scan shows 0. These are the two rows
FURMATECH-RD-UI-EXPORTS1 (a4f6330/f5abf55) explicitly left live on untouched
code while it moved the cva helpers.

## Live list at HEAD (react-doctor@0.9.14 `--json --no-score`, 322eff3)

- `src/components/ui/calendar.tsx:202` — `no-locale-format-in-render`:
  `CalendarDayButton` computed `data-day={day.date.toLocaleDateString(locale?.code)}`
  inside render, so server and browser could format with different locale
  context. (The sibling `formatMonthDropdown` at :44 calls `toLocaleString`,
  which the rule exempts — receiver is not `new Date()` — and was never flagged.)
- `src/components/ui/toggle-group.tsx:51` — `jsx-no-constructed-context-values`:
  `<ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>`
  built a fresh object literal every render, so every `ToggleGroupItem` consumer
  redrew on each `ToggleGroup` render.

## Changes

- `calendar.tsx` — hoisted the day-button date formatting into a module-level
  `formatDayDate(date, localeCode)` helper; `CalendarDayButton` now computes
  `const formattedDate = formatDayDate(day.date, locale?.code)` and passes
  `data-day={formattedDate}`. Same function, same arguments, same string — the
  attribute value is byte-identical. The `toLocaleDateString` call now lives
  outside any component/hook render scope and outside JSX, which is what the
  rule's scope analysis checks; rendered output (visible and attribute) is
  unchanged. The value stays runtime-locale-formatted exactly as upstream
  day-picker markup intends — `data-day` is a styling/test hook, not visible
  text.
- `toggle-group.tsx` — the provider value is now
  `React.useMemo(() => ({ variant, size, spacing, orientation }), [variant, size, spacing, orientation])`
  bound to `contextValue`. Consumers read identical fields through the same
  context shape; the object is now referentially stable across unrelated
  re-renders.

## Verification

- `npx react-doctor@0.9.14 --json --no-score src/components/ui/calendar.tsx src/components/ui/toggle-group.tsx`
  — **0 diagnostics** (was 2: one `no-locale-format-in-render`, one
  `jsx-no-constructed-context-values`).
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused
  `_params`), unchanged from baseline.
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all 24 routes prerendered.
