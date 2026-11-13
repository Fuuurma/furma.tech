# FURMATECH-RD-UI-EXPORTS1 — react-doctor only-export-components (ui primitives)

Date: 2026-11-13 · Slice: FURMATECH-RD-UI-EXPORTS1 (WORK.md row 404)

Source: react-doctor@0.9.14 lane scan @28efd09
(`stream/mechanical/2026-11-13-react-doctor-furma.tech.md`) flagged
`only-export-components` on the shadcn-style ui primitives; SMALLRULES1
(7fb285f) confirmed the four rows were still live at HEAD. This slice
re-derived the live list, moved each cva variant helper into its own
`src/lib/` module, and updated every importer. Component render output and
class strings are unchanged — the cva definitions moved verbatim.

## Live list at HEAD (react-doctor@0.9.14 `--json --no-score`, 7fb285f)

Four `only-export-components` rows, one per file, each pointing at the
trailing `export { …, *Variants }` statement:

- `src/components/ui/badge.tsx:52` — `badgeVariants`
- `src/components/ui/button.tsx:97` — `buttonVariants`
- `src/components/ui/tabs.tsx:82` — `tabsListVariants`
- `src/components/ui/toggle.tsx:45` — `toggleVariants`

(`export interface ButtonProps` in button.tsx is type-only and was never
flagged.)

## Change

New modules (cva definitions verbatim, named exports):

- `src/lib/badge-variants.ts` — `badgeVariants`
- `src/lib/button-variants.ts` — `buttonVariants`
- `src/lib/tabs-variants.ts` — `tabsListVariants`
- `src/lib/toggle-variants.ts` — `toggleVariants`

Component files now import their variant helper from `@/lib/*-variants`
and export components only:

- `badge.tsx` → `export { Badge }`
- `button.tsx` → `export { Button }` (+ `ButtonProps` interface, unchanged)
- `tabs.tsx` → `export { Tabs, TabsList, TabsTrigger, TabsContent }`
- `toggle.tsx` → `export { Toggle }`

Importer updates:

- `src/components/ui/calendar.tsx` — `buttonVariants` now from
  `@/lib/button-variants`; `Button` still from `@/components/ui/button`.
- `src/components/ui/toggle-group.tsx` — `toggleVariants` now from
  `@/lib/toggle-variants`.

`badgeVariants` and `tabsListVariants` had no external importers.

## Verification

- `npx react-doctor@0.9.14 --json --no-score` on the 4 target files plus the
  2 importers and 4 new lib modules — **0 `only-export-components` rows**.
  Two unrelated pre-existing warnings remain on untouched code:
  `no-locale-format-in-render` (calendar.tsx:202, the day-picker
  `formatMonthDropdown`) and `jsx-no-constructed-context-values`
  (toggle-group.tsx:51, the context Provider value literal).
- `pnpm lint` — clean.
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `pnpm build` — green; all routes prerendered.
