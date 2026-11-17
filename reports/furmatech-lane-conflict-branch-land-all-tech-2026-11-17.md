# FURMATECH-LANE-CONFLICT-BRANCH-LAND-ALL-TECH — conflict resolution

- Date: 2026-11-17 · repo: `github.com/Fuuurma/furma.tech`
- Slice: `lane-land-conflict furma.tech/fleet/branch-land-all-tech`
- Worktree: `/Users/sergi/Projects/worktrees/furma-tech-branch-land-all-tech` (isolated, lane branch checked out)
- Brief: `stream/mechanical/2026-11-17-lane-conflict-furma.tech-fleet-branch-land-all-tech.md`

## 1. What the conflict was

`lane-land.sh` lands a repo's own default branch. For `furma.tech` the remote
`HEAD` is `refs/heads/master`, so the landing base is `origin/master` and the
lane branch had to merge it. The branch `fleet/branch-land-all-tech` was
`origin/main` (`c97de51`) plus two documentation commits, and `origin/master`
(`9f2bb78`) had diverged from `origin/main` at merge-base `79f1129`:

| ref | tip | commits unique vs the other |
|---|---|---|
| `origin/main` | `c97de51` | 41 (21 patch-identical to master, 20 unique) |
| `origin/master` | `9f2bb78` | 127 |
| `fleet/branch-land-all-tech` | `5db9ba3` | 43 vs `origin/master`, 2 vs `origin/main` |

A merge and a rebase both failed. `git merge-tree` and the merge itself
reported **48 content-conflict hunks across 17 files**.

The two lineages also disagree about *what the studio sells*, which is the
substantive part of the conflict:

- `origin/main` still carries the old ten-product catalogue
  (`restauManager`, `GuideTours`, `FinanceHub`, `OneToMany`, `OpenGovern`,
  `LinkUp`, `PicksTracker`).
- `origin/master` carries the **nine active products** adopted on 2026-11-16
  (`tic-tac-toe`, `gambit-deck`, `bloxs`, `putarenfe`, `aitlas`,
  `software-factory`, `fuddy`, `qart`, `benxer`) in `src/lib/home-projects.ts`,
  `src/lib/v2-projects.ts` and `src/lib/project-heroes.ts`.

The repo's own adjudication decides this: `reports/furmatech-branch-reconcile1-REPORT.md`
(2026-11-14, on `origin/master`) records that `master` is the shipping line,
that `main`'s code delta is already covered on `master`, and that `main`'s
F105 guide sync (`25d077d`) is **superseded** — it still lists the old
catalogue. The three agent guides on the merged tree carry master's
"Advertised products (`HOME_PROJECTS`)" block, and
`tests/guide-catalogue.test.ts` fails if that block drifts from
`HOME_PROJECTS`. The catalogue is therefore master's.

## 2. Resolution rule

Per hunk: **take `origin/master`** (the shipping line, and the side the guides
and the catalogue test already agree with), **unless master's text is false or
incomplete for the merged tree**, in which case the accurate text wins.
`main`'s unique 2026-11-17 work — the new test suites, its source fixes, its
dead-code removal and its report records — is kept in full; none of it is in a
conflict hunk, so it merges cleanly.

## 3. Per-file outcome

| File | Hunks | Side | Why |
|---|---|---|---|
| `AGENTS.md` | 14 | master, 3 corrections | master is the current guide (F105 superseded); corrections: `ui/` is Base UI, `hooks/` holds `useScroll.ts`, `.reveal-fade` exists in the merged stylesheet, `.card-hover` is `border-color: var(--foreground)` on hover — not a shadow lift |
| `GEMINI.md` | 3 | master | stack block (`Next.js 16.4.2`) and command table match the merged `package.json` and scripts |
| `QWEN.md` | 6 | master + route union | stack block from master; route table = main's seven routes plus master's `/showcase` (all nine exist under `src/app/`) |
| `README.md` | 5 | master + route union | same as QWEN; the merged tree serves `/styleguide` and `/showcase` |
| `pnpm-lock.yaml` | 1 | master | generated file takes the base side; `pnpm install --frozen-lockfile` passes, so it is consistent with the merged manifests |
| `pnpm-workspace.yaml` | 1 | master + main's note | same override on both sides, only the order differs; master's ordering plus main's GHSA-g3hv-75wg-m249 comment |
| `src/app/styleguide/page.tsx` | 3 | master | master already carries main's improvements (ported: `Boolean(...)` gating, `key={comp.name}`, `LONG_DATE_FORMATTER` hoist, `suppressHydrationWarning`, scoped card transition) **and** the component refactor |
| `src/components/ThemeProvider.tsx` | 2 | master | master's `useSyncExternalStore` version is the same fix with `try/catch` on storage access; main's module-level storage helpers lose their callers and are removed |
| `src/components/home/useSmoothSectionScroll.ts` | 1 | master | master's version already contains main's `changedTouches[0]` guard (ported) plus the `shouldAdvanceSection` boundary check |
| `src/components/motion/StaggerReveal.tsx` | 1 | master | master swaps framer's `useReducedMotion` for the repo's `useStableReducedMotion` |
| `src/components/ui/calendar.tsx` | 2 | master | master's cached `Intl.DateTimeFormat` replaces main's per-call `toLocaleDateString`; main's orphaned `formattedDate` local is removed |
| `src/components/ui/carousel.tsx` | 1 | master | master's `useSyncExternalStore` carousel already carries the `reInit` cleanup main added |
| `src/components/v2/V2Nav.tsx` | 1 | master | master removed the Sitges clock from the nav; the merged file's `<SitgesClock />` usage is gone with it |
| `src/components/v2/V2Verticals.tsx` | 2 | master | master's `v2-panel` markup already carries the scoped transitions main ported |
| `src/lib/home-projects.ts` | 2 | master | the catalogue — master's nine products, matching the merged guides and `PROJECT_HERO_MAP` |
| `src/lib/schemas.ts` | 1 | **main** | main's `9a84fd1` removes the dead `waitlistSchema` / `bookingSchema`; nothing on the merged tree references them |
| `src/lib/server-actions.ts` | 2 | **main** | main's `9a84fd1` removes the dead `submitWaitlistSignup`; master kept it, but no caller exists in either tree |

No conflict marker survives in the tree, and every merged file was checked
against the merged sources before it was accepted.

## 4. Resulting tree

`git diff origin/master` after the merge is exactly main's unique work plus
the lane's own report:

- new test suites: `tests/home-reel.test.ts`, `tests/portfolio-nav.test.ts`,
  `tests/portfolio-parity.test.ts`, `tests/wave-field.test.ts`
- main's source fixes: `src/lib/analytics.ts`, `src/lib/portfolio-nav.ts`,
  `src/lib/wave-field.ts`, `tsconfig.json`
- main's dead-code removal: `src/lib/schemas.ts`, `src/lib/server-actions.ts`
- report records: `reports/dev-advisory-2026-11-12.md`,
  `reports/furmatech-portfolio-parity-2026-11-17.md`,
  `reports/furmatech-rd-styleguide2-2026-11-13.md`,
  `reports/furmatech-server-actions-2026-11-17.md`
- the lane's own `reports/branch-land-all-tech-2026-11-17.md`
- four guide files reconciled as described above, and
  `pnpm-workspace.yaml` (+3 lines: main's GHSA note)

## 5. Gates

Run in the isolated worktree on the merged tree:

| Gate | Result |
|---|---|
| `pnpm install --frozen-lockfile` | pass — master's lockfile satisfies the merged `package.json` + `pnpm-workspace.yaml` (next 16.4.2, eslint-config-next 16.4.2) |
| `pnpm lint` | pass, no output |
| `pnpm test` | pass — **187 tests, 187 pass, 0 fail** |
| `pnpm build` | pass — TypeScript clean, 25 routes generated, including the nine catalogue pages |

The 187 include the tests that pin this merge: `tests/guide-catalogue.test.ts`
(the guides match `HOME_PROJECTS`), `tests/portfolio-parity.test.ts` (main's
new parity gate over `HOME_PROJECTS` / `V2_PROJECTS` / `PROJECT_HERO_MAP`),
and main's `home-reel`, `portfolio-nav` and `wave-field` suites.

## 6. State and what is left

- The branch carries the merge commit `1859bf1` (parents `5db9ba3` and
  `9f2bb78`). The next `lane-land` run lands it on `origin/master`; this lane
  did not land it.
- **Nothing blocks the landing.** The merged tree is master plus main's unique
  work, and every gate is green.
- **One pre-existing doc drift, left alone on purpose:** `QWEN.md` still lists
  `.gradient-text` in its "Animations & Effects" section, and that class does
  not exist in the merged stylesheet (nor on either parent). It is in a
  non-conflicted region on both sides, so fixing it is outside a
  conflict-only resolution — it needs a separate edit on the shipping line.
- **The wider `main` vs `master` divergence is untouched.** The reconcile
  report's recommendation to retire `main` (archive it, then delete) is
  owner-gated and is not this slice's work. This branch carries main's
  remaining unique commits; the rest of `main` is still 41 commits of
  divergence from the shipping line.
