# FURMATECH-BRANCH-RECONCILE1 — origin/main ↔ origin/master divergence

Read-only diagnosis of `/Users/sergi/Projects/furma.tech`, 2026-11-14. No edits made.

## 1. Tips after `git fetch origin`

| ref | tip | date (+0100) | subject |
|---|---|---|---|
| `origin/main` | `322eff3c0037` | 2026-11-14 00:20:17 | docs(reports): FURMATECH-RD-KEYED-LISTS1 verification record |
| `origin/master` | `6e1731c50c61` | 2026-11-14 11:56:16 | fix(ui): clear react-doctor json-html, transition-all and locale-format rows |

- `origin/master` tip is also the tip of `fleet/furmatech-rd-next3` and `fleet/furmatech-rd-next4`.
- merge-base: `79f1129e` (2026-10-22, "merge: land fleet/furma.tech-trust-policy-20261022 into main").
- Divergence: **30 commits unique to main, 95 unique to master** (19 of master's are `merge: land fleet/…` bookkeeping; 76 non-merge). Net tree diff main→master: **182 files, +6508/−2568**.
- Unique-commit date ranges: main 2026-10-26 → 11-14; master 2026-10-04 → 11-14.

## 2. Commits unique to origin/main (30) — change and presence on master

Presence was checked at file level (`git show origin/master:<file>`), not by subject.

### A. Patch-equivalent already on master (`git cherry` = `-`)

- `e3b0ef9` F103 contact throttle binds caller → master's `828119e`, identical patch.
- `83012ab` F101 glyph atlas redraws on DPR change → master's `4d3fdee`, identical patch.
- `0268d48` 24-hour release-age gate → master's `28efd09`, identical patch.

### B. Semantically present on master (different patch, same fix)

- `ea85c9a` minimatch `^11` override under typescript-estree → master's `c805167` carries the identical `'@typescript-eslint/typescript-estree>minimatch': ^11.0.1` override in `pnpm-workspace.yaml` (master lacks only the explanatory comment).
- `ac2a07f` styleguide `transition-all`→`transition-[border-color,box-shadow]` + ThemeProvider store-read → master's `6e1731c` applied the same transition narrowing; both sides now use `useSyncExternalStore` in ThemeProvider with different implementations (master's also handles a custom `furma-theme-change` event and try/catch — arguably the more complete fix).
- `d19741c` styleguide `LONG_DATE_FORMATTER` hoist + `suppressHydrationWarning` → master's `6e1731c` landed the same change.
- `e1579f1` (carousel part only) `api.off("reInit")` cleanup → master's `carousel.tsx` already subscribes to and removes `reInit`.

### C. Stale or missing on master

- `25d077d` F105 agent-guide sync (2026-11-09) → **stale**: master's `716b3f6` (11-07) + `94da37d`/`e364a23` (11-12) describe the current six-product catalogue; main's `AGENTS.md` still advertises the old "11 products" list.
- `fd80c0d` styleguide component-grid `Boolean(…?.length)` gating + `tests/styleguide-component-grid.test.ts` → **ABSENT** (master still has `key={i}` and unguarded `comp.variants &&`; test file does not exist on master).
- `e1579f1` (rest) `syncReserves` moved out of paint in `dither-wave-tw.tsx`/`liquid-ascii-tw.tsx` + `tests/liquid-atlas-dpr.test.ts` → **ABSENT** (`syncReserves` not present in master's files).
- `8b2297b` drop redundant `role="contentinfo"` + `useEffectEvent` nav dismiss → **ABSENT** (master's `StudioSiteFooter.tsx` still has `role="contentinfo"`; `PortfolioNavDropdown.tsx` has no `useEffectEvent`).
- `c66635a` semantic `<nav>` for section reel + `changedTouches[0]` guard → **ABSENT** (master's `SectionReelBar.tsx` still uses `role="navigation"` on a div; `useSmoothSectionScroll.ts` reads `e.changedTouches[0].clientY` unguarded).
- `c16fd6e` stable non-index keys (`ghost-${columnOffset}` without `-${i}`, `keyedUnits` in SplitReveal, `isValidElement` keys in StaggerReveal) → **ABSENT**.
- `49fb194` v2 `transition-all` → scoped transitions in V2Contact/V2Manifesto/V2Verticals/V2WorkIndex → **ABSENT** (master's v2 files still carry `transition-all`; the NEXT3 report confirms 5 `no-transition-all` rows remain in `src/components/v2/*`).
- `88ab55a` V2Nav `querySelector` try/catch, V2Experience `SITGES_CLOCK_FORMATTER` hoist, analytics export split → **ABSENT** (master's `Analytics.tsx` is self-contained; `src/lib/analytics.ts` does not exist on master).
- `6045912` Set-membership screen-reserve sync → **ABSENT** (master still uses `Array.from` + `includes`).
- `f5abf55` cva variant helpers → `src/lib/{badge,button,tabs,toggle}-variants.ts` → **ABSENT** (the four lib files do not exist on master; master's `button.tsx` etc. still define `buttonVariants` inline via `cva`).
- `9ef5cf1` stable keys in ScrollReveal/breadcrumb/field/V2Manifesto → **ABSENT** (master still uses `key={index}` / index-derived keys).
- 12 × `docs(reports)/furmatech-rd-*.md` verification records → **ABSENT** on master (master has only `reports/furmatech-rd-next3-2026-11-14.md`).

## 3. Commits unique to origin/master (95)

- 3 patch-equivalents on main: `828119e` (F103), `28efd09` (release-age), `4d3fdee` (F101).
- `c805167` minimatch → present on main as `ea85c9a`.
- `716b3f6`/`e364a23`/`94da37d` agent-guide docs → main has only the older F105 variant; master's reflect the current catalogue.
- `ed1bba9` + `6e1731c` react-doctor NEXT fixes → **ABSENT on main**: main's `layout.tsx` has no `JSON_LD_SCRIPT` escaping, `calendar.tsx` no `getDayDateFormatter`, `toggle-group.tsx` no memoized `contextValue`. (Main independently has equivalent styleguide formatter/transition fixes via its own commits.)
- The remaining ~68 non-merge commits are the entire shipped redesign + infra, **none present on main**. Verified by file existence — all absent on main: `src/app/showcase/page.tsx`, `src/app/og/route.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/showcase-films.ts`, `src/lib/section-scroll.ts`, `src/lib/security-headers.ts`, `src/components/ui/project/ProjectFilm.tsx`, and tests `next-type-imports`, `robots`, `showcase-films`, `section-scroll`, `security-headers`, `project-copy`, `project-plate`, `guide-catalogue`, `og-metadata`, `floating-cards`, `contact-provider`, `styleguide`, `sitemap`, `small-items`.
- Also absent on main: new portfolio slugs `/portfolio/{bloxs,gambit-deck,pond,putarenfe}`, `packageManager: pnpm@10.34.5` pin, `next` 16.4.2 + `eslint-config-next` 16.4.2 (main still has next 16.3.5 / eslint-config-next 16.2.11).

Themes of master's unique work: home hero/entry redesign + floating project windows; portfolio catalogue cut to six advertised products + archive; showcase films + `/showcase` + studio reel; OG image route + JSON-LD; robots/sitemap SEO; security headers + FT-DEEP fixes; contact page redesign; footer sunset series + typeface swap; theme plates; CI smoke/lint-gate repairs; content-accuracy fixes (tic-tac-toe, QArt, OpenGovern).

## 4. Which ref is the real default — **master**

- `git symbolic-ref refs/remotes/origin/HEAD` → `refs/remotes/origin/master`; `git remote show origin` → "HEAD branch: master".
- `.github/workflows/ci.yml` exists **only on master** and triggers `push: branches: [master]` — pushes to main run no CI.
- `AGENTS.md`: "Create a feature branch from `master`"; PRs target master.
- Local checkout is on `master` tracking `origin/master` (currently 9 behind).
- No in-repo deploy config names a branch (no `vercel.json`, no deploy workflow; only a `public/vercel.svg` asset). Vercel's production branch is a dashboard setting not visible here, but every in-repo signal — remote HEAD, CI filter, agent docs, checkout — says master.
- Note: merge-base and several master-side merge subjects say "into main" — that is the lane-land tooling's message template; the ref actually landed on is master.

## 5. Safe reconciliation: **port the missing react-doctor fixes to master, then retire main**

Evidence:

- master is the default, CI-gated branch and is ~3 weeks / 95 commits ahead in shipped work; main's tree lacks the entire redesign (182-file diff).
- main's only unique value is the RD-* remediation: ~9 fix commits covering rows master's react-doctor still reports. The NEXT3 report itself states: "The origin/main line carries earlier RD fixes for several of these rules that have not been ported to master" — at that HEAD, 57 diagnostics remained including `no-array-index-as-key` ×8, `only-export-components` ×5, `no-transition-all` ×5 (all in `v2/*`), matching exactly what main's slices cleared.
- Merging `origin/main` into `origin/master` is the unsafe option: parallel histories touching the same ~35 files (`styleguide/page.tsx`, `ThemeProvider.tsx`, `ui/*`, `v2/*`, `pnpm-*`, agent docs) → textual plus semantic conflicts; risks resurrecting main's older pins (`next` 16.3.5, `eslint-config-next` 16.2.11, no `packageManager` pin) and the stale 11-product docs if mis-resolved.
- Retiring `main` without porting silently drops the fixes → react-doctor regresses on master.

Builder commands (conflicts expected — re-apply per-file where master's code drifted; skip duplicates):

```bash
git fetch origin
git worktree add <lane-wt> -b fleet/rd-port-main-fixes origin/master
cd <lane-wt>
# Skip patch-equivalents/duplicates: e3b0ef9 83012ab 0268d48 ea85c9a
# Skip stale docs: 25d077d; skip or regenerate the 12 reports/*.md commits
git cherry-pick fd80c0d e1579f1 8b2297b c66635a c16fd6e 49fb194 6045912 f5abf55 9ef5cf1
# Partial ports — master already covers part of each:
#   88ab55a → only V2Nav try/catch + V2Experience SITGES_CLOCK_FORMATTER
#             (master's Analytics.tsx is self-contained; src/lib/analytics.ts does not exist there)
#   ac2a07f / d19741c → only styleguide key={comp.name} + Boolean() gating
#             (formatter, transition scope, ThemeProvider already on master)
#   e1579f1 → only dither-wave-tw / liquid-ascii-tw syncReserves + test
#             (carousel reInit cleanup already on master)
pnpm lint && pnpm exec tsc --noEmit && pnpm test && pnpm build
npx react-doctor@0.9.14 --json   # ported rows should leave the 57-diagnostic list
# land via the normal lane-land flow to origin/master, verify deploy, then:
git push origin --delete main    # retire main only after the port is live
```

What could be lost by the wrong choice:

- **Merge main→master**: heavy conflict resolution; risk of regressing master's newer deps/docs; ~30 commits of parallel RD history folded into master; semantic conflicts (main's cva→lib refactor vs master's inline-cva components that also carry NEXT3/NEXT4 fixes) can produce files that compile yet re-flag or silently drop master's own rows.
- **Delete main now**: the ~9 missing fix commits' react-doctor rows stay open on master (keyed lists, `only-export-components`, v2 `no-transition-all`, wave/ascii effect cleanups, Set membership, footer/nav semantics, V2Nav/V2Experience fixes, styleguide gating).
- **Do nothing**: every future lane keeps hitting the divergence; anyone reading `origin/main` sees a tree missing the shipped site.
