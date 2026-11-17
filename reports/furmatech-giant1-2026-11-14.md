# FURMATECH-GIANT1 — react-doctor no-giant-component ×3

Date: 2026-11-14 · Slice: FURMATECH-GIANT1 · Lane `fleet/furmatech-giant1` @ `origin/master` aa7dd4a

Source: react-doctor@0.9.14 `--json` on this worktree — pre-change scan at HEAD
aa7dd4a showed **21 diagnostics**: `use-lazy-motion` ×18 (the deferred class)
and `no-giant-component` ×3 — the only remaining fixable rows. Post-change
scan shows **18**, all `use-lazy-motion`. Every `no-giant-component` row is
cleared and no touched file carries any diagnostic.

## Live list at HEAD (react-doctor@0.9.14 `--json`, aa7dd4a)

- `src/app/styleguide/page.tsx:104` — `StyleguidePage` over 300 lines.
- `src/components/dither-wave-tw.tsx:190` — `DitherWave` over 300 lines.
- `src/components/liquid-ascii-tw.tsx:201` — `LiquidAscii` over 300 lines.

## Changes — markup, class names and rendered output identical

- `styleguide/page.tsx` — each top-level `<Section>` pulled into its own
  component (`StyleguideHeader`, `TypographySection` … `ComponentReferenceSection`,
  `CtaSection`), verbatim JSX. The seven `useState` hooks moved into the one
  section that reads them (`InputsSection`, `ToggleSection`, `MenusSection`,
  `CalendarSection`, `CollapsibleSection`); all sections mount unconditionally
  in the same order, so state identity and behaviour are unchanged.
  `StyleguidePage` is now pure composition. `SectionRow`,
  `LONG_DATE_FORMATTER` and every import stay put — the
  `styleguide-component-grid` contract test still finds its gated `.join(", ")`
  rows in this file.
- `dither-wave-tw.tsx` — the ~530-line `useEffect` moved verbatim into
  `useDitherWaveScreen`, a same-file helper that owns the wrapper/canvas refs
  and `useStableReducedMotion`, takes a `DitherWaveScreenOptions` object of the
  resolved prop values, and returns the refs. `DitherWave` keeps its exact
  destructured signature and JSX; the effect body and deps array are
  byte-identical.
- `liquid-ascii-tw.tsx` — same shape: the ~718-line `useEffect` moved verbatim
  into `useLiquidAsciiScreen` behind `LiquidAsciiScreenOptions` (29 fields,
  including the six resolved `sun*`/`moon*` numbers so the deps keep their
  primitive-identity semantics). `LiquidAscii` keeps its signature, the
  sun/moon number extraction and its JSX.

## Sizes (component line span → after)

- `StyleguidePage`: 910 → 73 lines (22 section components, largest
  `ComponentReferenceSection` ~89).
- `DitherWave`: 574 → 58 lines; `useDitherWaveScreen` holds the engine.
- `LiquidAscii`: 782 → 92 lines; `useLiquidAsciiScreen` holds the engine.
- Files: `page.tsx` 1013 → 1149, `dither-wave-tw.tsx` 763 → 822,
  `liquid-ascii-tw.tsx` 982 → 1082 (wrapper/interface/call scaffolding only;
  moved code verified byte-identical against HEAD).

## Verification

- `npx react-doctor@0.9.14 --json` post-change — **18 diagnostics** (was 21).
  `no-giant-component` 3 → 0; zero rows on every touched file; no new rows.
- `pnpm lint` — clean.
- `pnpm exec tsc --noEmit` — clean.
- `pnpm test` — 167/167 pass (`node --test "tests/*.test.ts"`), including the
  source-pinning suites `hero-footer-screens`, `liquid-atlas-dpr` and
  `styleguide-component-grid`.
- `pnpm build` — green; all routes generated.

## Remaining

18 diagnostics at this HEAD, all `use-lazy-motion` — the deferred class
(per-file conversion adds the feature bundle while siblings ship full
motion). No fixable non-deferred diagnostics remain.
