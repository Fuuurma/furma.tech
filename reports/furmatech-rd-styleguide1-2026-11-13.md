# FURMATECH-RD-STYLEGUIDE1 — react-doctor no-locale-format-in-render / no-array-index-as-key

Date: 2026-11-13 · Slice: FURMATECH-RD-STYLEGUIDE1

Source: react-doctor@0.9.14 `--json` on `src/app/styleguide/page.tsx` in this worktree
(pre-change scan showed 4 diagnostics on the file; post-change scan shows 2, both
pre-existing P3s out of scope).

## Diagnostics and what each was

- `src/app/styleguide/page.tsx:719` — `no-locale-format-in-render`: `date.toLocaleDateString("en-US", …)`
  ran inside render, so server and browser could format with different locale/timezone
  context. Replaced with a module-hoisted `LONG_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", …)`
  and `.format(date)` at the call site — same explicit locale and options, so the printed
  text is byte-identical.
- The hoisted `.format()` call still tripped the rule: react-doctor flags *any*
  `Intl.DateTimeFormat().format()` inside a `'use client'` module unless the formatter is
  constructed with an explicit `timeZone`, the enclosing JSX carries
  `suppressHydrationWarning`, or the call sits in a statically-dead/guarded branch. A
  post-mount `useEffect` does not clear it — the detector fires on the call itself.
  `timeZone: "UTC"` was rejected: the calendar's selected `Date` is local-midnight, so UTC
  formatting would print the previous day for UTC+ users and break the styleguide's
  "Selected" readout. `suppressHydrationWarning` on the `<p>` is React's intended escape
  for exactly this case — the text is client-local by design — and preserves the display
  for every user.
- `src/app/styleguide/page.tsx:962` — `no-array-index-as-key`: the component-card grid used
  `key={i}`. Switched to `key={comp.name}` (all 30 names are unique literals) and dropped
  the now-unused `i` map parameter. List is static, so identity behaviour is unchanged.

## Changes

- `src/app/styleguide/page.tsx`: added `LONG_DATE_FORMATTER` (module scope), swapped the
  `toLocaleDateString` call for `LONG_DATE_FORMATTER.format(date)` behind
  `suppressHydrationWarning`, and keyed the component cards by `comp.name`.

## Verification

- `npx react-doctor@0.9.14 --json src/app/styleguide/page.tsx` — `no-locale-format-in-render: 0`,
  `no-array-index-as-key: 0` (was 1 each). Remaining rows are the pre-existing P3s
  `no-giant-component` (line 104) and `no-transition-all` (line 265), out of scope.
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
