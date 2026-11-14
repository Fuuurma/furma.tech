# FURMATECH-BRANCH-RECONCILE1 — origin/main ↔ origin/master divergence

Read-only diagnosis of `github.com/Fuuurma/furma.tech`, 2026-11-14. Method: fresh
scratch clone (`git clone` → `/tmp/furmatech-reconcile1`), `git fetch`,
plumbing-only inspection (`rev-list`, `cherry`, `ls-tree`, `show`). No branch,
history or workflow config was changed.

**Path note:** the dispatch asked for `docs/reports/furmatech-branch-reconcile1/REPORT.md`,
but `/docs` is gitignored on **both** branches (`.gitignore`: "docs (contains
secrets - kept locally only)") — the path cannot be committed without
force-adding into a secrets-quarantine directory, which this report does not
do. Delivered instead at `reports/furmatech-branch-reconcile1-REPORT.md` (repo
convention) and `~/.agent-state/orch/run_d79f312c05ea/reports/`.

## 0. TL;DR

- **`master` is the real default and shipping line.** Remote `HEAD` →
  `refs/heads/master`; CI runs only on `master`; agent docs and the project
  ledger call master the release line.
- Divergence: merge-base `79f1129e` (2026-10-22). **`main` is +30 commits,
  `master` is +111.** The two trees differ by ~182 files.
- **`main`'s code delta is now fully covered on `master`.** Six commits are
  patch-identical; nine more were ported today by FURMATECH-MAIN-PORT1
  (conflict-resolved, verified green); the rest have equivalents or are stale.
  What remains unique to `main`: **13 verification-report docs + one stale
  doc-sync commit** — no code.
- **Recommendation: retire `main`** — archive it under `refs/heads/archive/`
  first, then delete. Do **not** merge `main` into `master` (conflicts +
  stale-pin regression risk for ~zero gain), and do **not** delete before
  archiving (the report trail exists nowhere else).

## 1. Tips and merge-base

| ref | tip sha | commit date (+0100) | subject |
|---|---|---|---|
| `origin/main` | `322eff3c0037de31401ff969aa4fe4488dfd3b11` | 2026-11-14 00:20:17 | docs(reports): FURMATECH-RD-KEYED-LISTS1 verification record |
| `origin/master` | `e250a037c410c67c62e9ec1c36889b45e6f05c43` | 2026-11-14 12:52:33 | fix(ui): clear react-doctor no-giant-component rows |
| merge-base | `79f1129e9f947ce8b65f3973c2e4c00e17522cb9` | 2026-10-22 14:39:10 | merge: land fleet/furma.tech-trust-policy-20261022 into main |

Counts (`git rev-list --count`): **30 commits unique to `main`** (16 `fix`/`feat`
code commits + 14 docs commits), **111 unique to `master`** (91 non-merge +
20 merge commits). Unique-commit date ranges: main 2026-10-26 → 11-14; master
2026-10-04 → 11-14.

## 2. Commits unique to `origin/main` (30) — what each changes, and whether `master` has it

Presence was verified at file/patch level on current `origin/master`, not by
commit subject. Statuses: **same patch** = `git cherry` `-` (identical
patch-id); **ported** = landed via FURMATECH-MAIN-PORT1 under a new sha;
**equivalent** = master's own commit covers the change; **superseded** =
master's version is newer; **main-only** = exists nowhere else.

### Code commits (16)

| sha | change | on `master`? |
|---|---|---|
| `e3b0ef9` | F103: contact throttle binds the caller, limiter cost bounded | same patch → `828119e` |
| `83012ab` | F101: glyph atlas redraws on device-pixel-ratio change | same patch → `4d3fdee` |
| `0268d48` | 24-hour pnpm release-age supply-chain gate | same patch → `28efd09` |
| `fd80c0d` | styleguide component-grid `Boolean(…?.length)` gating + `tests/styleguide-component-grid.test.ts` | ported → `83b83e8` (verified: test file exists on master) |
| `ea85c9a` | minimatch `^11` override under typescript-estree (GHSA-g3hv-75wg-m249) | equivalent → `c805167` (same override in `pnpm-workspace.yaml`, minus comment) |
| `e1579f1` | effect cleanups: carousel `api.off`, `syncReserves` out of paint in dither-wave/liquid-ascii + `tests/liquid-atlas-dpr.test.ts` | ported → `e137781` (carousel hunk skipped — master already cleaned it; wave/ascii hand-merged) |
| `8b2297b` | drop redundant `role="contentinfo"`, `useEffectEvent` nav dismiss | ported → `f66427d` |
| `d19741c` | styleguide `LONG_DATE_FORMATTER` hoist + `suppressHydrationWarning` + `key={comp.name}` | equivalent → covered by master's NEXT3/NEXT4 react-doctor commits (`6e1731c` et al.) |
| `c66635a` | semantic `<nav>` for section reel + `changedTouches[0]` guard | ported → `2a46bc7` (verified: `<nav>` at SectionReelBar.tsx:178, guard at useSmoothSectionScroll.ts:195) |
| `c16fd6e` | stable non-index keys (reel bar, SplitReveal, StaggerReveal) | ported → `2108a12` |
| `49fb194` | v2 `transition-all` → scoped transitions (V2Contact/Manifesto/Verticals/WorkIndex) | same patch → `795e29b` (verified: zero `transition-all` in `src/components/v2/` on master) |
| `88ab55a` | V2Nav `querySelector` try/catch, V2Experience `SITGES_CLOCK_FORMATTER` hoist, analytics export split | partial → `500270f` (V2Experience guard only; master's analytics split already exists as `src/lib/track-event.ts`, NEXT4) |
| `6045912` | Set-membership screen-reserve sync in wave + ascii | same patch → `4377e07` (verified: `new Set` in both files on master) |
| `ac2a07f` | styleguide card `transition-all`→scoped + ThemeProvider store-read | equivalent → master's NEXT3/NEXT4 (`useSyncExternalStore` ThemeProvider, scoped transition) |
| `f5abf55` | cva variant helpers → `src/lib/{badge,button,tabs,toggle}-variants.ts` | ported → `107caca` (verified: all four lib files exist on master) |
| `9ef5cf1` | stable keys in ScrollReveal/breadcrumb/field/V2Manifesto (KEYED-LISTS1) | same patch → `abab424` (verified: `key={key}` in master's ScrollReveal) |

### Docs commits (14)

| sha | change | on `master`? |
|---|---|---|
| `25d077d` | F105 agent/project guide sync (2026-11-09) | **superseded** — master's `716b3f6` + `94da37d`/`e364a23` describe the current six-product catalogue; main's `AGENTS.md` still lists the old 11 products |
| `48a67bf` | docs(reports): FURMATECH-RD-EFFECT-CLEANUP1 record | **main-only** |
| `a265331` | docs(reports): FURMATECH-RD-FOOTER-NAV1 record | **main-only** |
| `c36d1ef` | docs(reports): FURMATECH-RD-STYLEGUIDE1 record | **main-only** |
| `085ee3a` | docs(reports): FURMATECH-RD-REEL-TOUCH1 record | **main-only** |
| `df496c6` | docs(reports): FURMATECH-RD-INDEX-KEYS1 record | **main-only** |
| `9af465e` | docs(reports): FURMATECH-RD-V2-TRANSITION1 record | **main-only** |
| `a732f47` | docs(reports): FURMATECH-RD-V2-CLEANUP1 record | **main-only** |
| `de092ea` | docs(reports): FURMATECH-RD-BLOCKS-SET1 record | **main-only** |
| `4dcc956` | docs(reports): FURMATECH-RD-CLEANUP1 record | **main-only** |
| `ae0dc9d` | docs(reports): FURMATECH-RD-RENDER-HYGIENE1 record | **main-only** |
| `7fb285f` | docs(reports): FURMATECH-RD-SMALLRULES1 record | **main-only** |
| `a4f6330` | docs(reports): FURMATECH-RD-UI-EXPORTS1 record | **main-only** |
| `322eff3` | docs(reports): FURMATECH-RD-KEYED-LISTS1 record | **main-only** |

**Net: every code change on `main` exists on `master` — identically, as a
verified port, or as a covered equivalent. `main`'s only unique content is 13
report records plus a stale doc sync.**

## 3. Commits unique to `origin/master` (111)

`git cherry origin/main origin/master`: 6 commits are patch-equivalents of
`main` commits (marked †); the rest have no counterpart on `main`. Grouped by
theme; every commit listed.

### A. FURMATECH-MAIN-PORT1 — ports of `main`'s RD fixes (landed 2026-11-14)

| sha | change | source on `main` |
|---|---|---|
| `83b83e8` | styleguide component-grid gates | `fd80c0d` |
| `e137781` | effect cleanups (wave/ascii; carousel already clean) | `e1579f1` |
| `f66427d` | footer roles + effect-event nav dismiss | `8b2297b` |
| `2a46bc7` | semantic reel nav + touch guard | `c66635a` |
| `2108a12` | stable keys in reel/motion reveals | `c16fd6e` |
| `795e29b` † | v2 scoped transitions | `49fb194` |
| `4377e07` † | Set-membership reserve sync | `6045912` |
| `107caca` | cva helpers → `src/lib/*-variants.ts` | `f5abf55` |
| `abab424` † | stable keys (ScrollReveal/breadcrumb/field/V2Manifesto) | `9ef5cf1` |
| `500270f` | v2 anchor `querySelector` guard + reconcile evidence | partial `88ab55a` |
| `d35ef82` | docs(reports): MAIN-PORT1 port record | — |

### B. Master's own react-doctor waves (rd-next3/4/5/6) — absent on `main`

| sha | change |
|---|---|
| `ed1bba9` | locale-format + context-value rows |
| `6e1731c` | json-html, transition-all, locale-format rows |
| `c29c78d` | index-key, stray-zero, mixed-export rows |
| `eb7c06f` | complexity, tag-over-role, redundant-role rows |
| `aa7dd4a` | tag-over-role, parent-callback, context-value rows |
| `e250a03` | no-giant-component rows |
| `95071c4` | docs(research): daily-tests red1 root-cause report |

### C. Patch-equivalents of old `main` commits (present on both)

| sha | change | `main` twin |
|---|---|---|
| `828119e` † | F103 contact throttle | `e3b0ef9` |
| `28efd09` † | 24-hour release-age gate | `0268d48` |
| `4d3fdee` † | F101 glyph atlas DPR redraw | `83012ab` |
| `c805167` | minimatch advisory in eslint-config-next chain | `ea85c9a` (equivalent override) |

### D. The shipped product work — absent on `main` (the redesign + infra)

Home/entry redesign and floating project windows:
`35f72b0` `6b1086a` `4e04061` `f8f7653` `de8c16d` `89fa181` `3f6440b`
`c7a717d` `6af434e` `046ce5d` `7099e71` `0328054` `3b681fb` `6d85317`
`f184867` `5861ae7` `db24471` `357764e`

Portfolio catalogue (six advertised products) + case pages:
`6435885` `72d9dcb`

Showcase films, studio reel, `/showcase`:
`bc1aced` `6b6890e` `7774a24` `94bb01f`(research)

SEO/OG/security:
`b91ba63` `4a448eb` `276e1c4` `f0a0381` `c1db047` `4638cf0` `24006ca`

Contact page + footer/type design series:
`e568a1c` `75c9ea9` `d8a554e` `61a6b35` `1c97a18` `718d5dd` `2a9162d`
`8678891`

Content accuracy + UX fixes (each landed twice via two lane paths —
`128943d`-series and `c53ddb5`-series carry the same titles):
`7796ec7`/`936f022` (tic-tac-toe FT-CONTENT-01), `7ace01a`/`af6a2ba`
(QArt FT-CONTENT-02), `aabba5b`/`db96582` (numeric-claim FT-CONTENT-03),
`128943d`/`c53ddb5` (concept-visual FT-CONTENT-04), `3b406a8`/`1594eae`
(guided-tour FT-UX-02), `29e2911` (OpenGovern F42), `09248bf` (OpenGovern
labels), `986159b` (contact reference id), `a4a5303` (tic-tac-toe copy)

CI/deps/toolchain:
`93f6acc` (lint gate F40), `e26598f` (smoke port), `e652262` (og smoke gate
F38), `1b250ed` (lockfile + `packageManager` pin), `07cd427` (next 16.4.2),
`cf1e49c`/`e4215c7`-era security pins, `8410789` (eslint gate + contact error),
`3c31daf` (next type-only imports), `46859bf` (dead deps FT-DEEP-07),
`3527e20` (docs sync FT-DEEP-08)

Agent-guide syncs (current six-product catalogue):
`716b3f6` `94da37d` `e364a23` `1785e03`

### E. Merge bookkeeping (20) — lane-land records, no unique content

`26709cb` `d3d7c52` `f8dea7f` `57f1cfc` `0fc540f` `12f8271` `eac17bb`
`054e0ca` `6e4dce8` `b0ea607` `fef96c4` `ea444e7` `1d42091` `52bc967`
`ab9a514` `7150a7e` `3d8b1ba` `8546c55` `9ffffdf` `95b9567`

Note: merge subjects saying "into main" (`7150a7e`, `3d8b1ba`, `95b9567`) are
the lane-land tooling's message template — the ref actually landed on is
`master`. This is also why `main` looks "merged into" in places it isn't.

## 4. Which ref is real — `master`

| signal | finding |
|---|---|
| Remote HEAD | `git ls-remote --symref origin HEAD` → `refs/heads/master` |
| CI | `.github/workflows/ci.yml` exists **only on master**; `push: branches: [master]` — pushes to `main` run no CI at all |
| Agent docs | `AGENTS.md` (master): "Create a feature branch from `master`"; PRs target master |
| Toolchain | master pins `packageManager: pnpm@10.34.5`, `next 16.4.2`, `eslint-config-next 16.4.2`; `main` has **no** `packageManager` pin and sits on `next 16.3.5` / `eslint-config-next 16.2.11` |
| Project ledger | `projects/furma.tech/LEDGER.md` F5/F44: "the shipping line is master"; the divergence itself is recorded owner-gated |
| Deploy config | No `vercel.json`/`netlify.toml`/deploy workflow in either tree. `@vercel/analytics` + `@vercel/speed-insights` deps ⇒ Vercel; with no branch override in-repo, Vercel production deploys track the repo default branch = `master`. Live-site fetch was not possible from this environment (DNS blocked) — consistent-but-unverified |
| Fleet drift | This very dispatch was preflighted "DISPATCH @ origin/main 322eff3" and its worktree cut from `main` — tooling still defaults to `main`, which is the drift source |

## 5. What changed since the first reconcile report

`reports/furmatech-branch-reconcile1-2026-11-14.md` (on master, added in
`500270f`) reached the same diagnosis at master tip `6e1731c` and recommended
"port the missing react-doctor fixes to master, then retire main". Since then:

- **FURMATECH-MAIN-PORT1 landed** (`d35ef82` + the 10 port commits in §3A):
  all nine cherry-picks plus the `88ab55a` partial, verified `pnpm lint`,
  `tsc --noEmit`, `pnpm test` 167/167, `pnpm build` green; react-doctor
  diagnostics 54 → 29, every ported rule at 0 rows.
- master advanced to `e250a03` with four more react-doctor commits
  (`eb7c06f`, `aa7dd4a`, `e250a03` + merge `26709cb`).

So the open question collapses from "port or merge" to "when to retire".

## 6. Recommendation: retire `main` (archive first, then delete)

`main`'s code is fully on `master`; its only unique content is 13 report
records + one stale doc sync — preserved by an archive ref at zero risk.
Merging buys nothing and can regress master's newer pins.

```bash
# 0. Confirm production is serving master (Vercel dashboard → production branch,
#    or check furma.tech content for the six-product catalogue).
# 1. Preserve the whole main line — all 30 commits incl. the report records:
git push origin origin/main:refs/heads/archive/main-20261114
# 2. Retire main:
git push origin --delete main
# 3. Repo hygiene (follow-ups, not part of this read-only slice):
#    - point fleet lane bases / dispatch preflights at origin/master
#      (this dispatch based on origin/main@322eff3 — the drift source);
#    - AGENTS.md already says master — no doc change needed.
```

The delete is a shared-repo branch operation — per `projects/furma.tech/LEDGER.md` F5 the shipping-line call is owner-gated; archiving first makes the
step reversible, so it can be executed by whoever owns branch admin.

### What each wrong choice loses

- **Merge `origin/main` → `origin/master`:** conflicts across ~35 shared files
  (`styleguide/page.tsx`, `ThemeProvider.tsx`, `ui/*`, `v2/*`, `pnpm-*`, agent
  docs). Mis-resolution can resurrect `main`'s older pins — `next 16.3.5` over
  master's `16.4.2`, `eslint-config-next 16.2.11` over `16.4.2`, the missing
  `packageManager` pin, and the stale 11-product `AGENTS.md` — while gaining
  only 13 report docs and a superseded doc sync. High risk, near-zero gain.
- **Delete `main` without archiving:** the 13 RD verification reports and the
  divergence evidence exist nowhere else — the audit trail for the whole
  react-doctor campaign dies with the ref.
- **Do nothing:** every fleet lane keeps being cut from `origin/main` (this
  dispatch is proof), so workers keep committing onto a dead line; anyone
  reading `origin/main` sees a tree missing the entire shipped redesign.

## 7. Prior art

- `reports/furmatech-branch-reconcile1-2026-11-14.md` @ `origin/master`
  (`500270f`) — first-pass diagnosis; this report re-verifies it at the
  current tips and folds in the landed port.
- `reports/furmatech-main-port1-2026-11-14.md` @ `origin/master` (`d35ef82`) —
  the port record with per-commit mapping and gate evidence.
- `projects/furma.tech/LEDGER.md` F5 (software-factory) — the owner-gated
  divergence row this slice evidences.
