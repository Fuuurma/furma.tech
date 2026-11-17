# BRANCH-LAND-ALL-TECH — furma.tech remote-branch landing / adjudication report

- Date: 2026-11-17
- Repo: `github.com/Fuuurma/furma.tech` (remote `origin`)
- Preflight base: `origin/main` @ `c97de51fd9876c533baec9a5ead75395515a94b2`
- Lane worktree: `/Users/sergi/Projects/worktrees/branch-land-all-tech` on `fleet/branch-land-all-tech`, cut from `origin/main`

## Method

1. Fresh `git fetch origin` in the lane worktree, then authoritative branch set from `git ls-remote --heads origin` (23 refs).
2. Relationship to `origin/main` via `git merge-base --is-ancestor <ref> origin/main` and `git rev-list --count origin/main..<ref>`.
3. No branch, ref, commit, or workflow config was created, deleted, archived, renamed, or force-updated. `origin/main` is unchanged at `c97de51`. The dirty shared checkout at `/Users/sergi/Projects/furma.tech` was not touched.

## Result: 0 branches landed; 0 branches deleted or archived

The slice's landing set is **non-main / non-master / non-archive / non-hold remote branches**. Every one of the 23 remote branches falls into an excluded class: 19 `archive/*`, 2 `fleet-hold/*`, `master`, and `main` itself. There is therefore **no green non-destructive candidate branch to land**, nothing was rebased or linearized, and no repo gates were run (no change landed, so there is no new tree to gate). All branches remain exactly where they were.

## Every checked branch

`unique` = commits reachable from the branch but not from `origin/main` (`rev-list --count origin/main..<ref>`). "ANCESTOR" means the branch is already fully contained in `origin/main`.

| Branch | SHA (full) | unique | vs origin/main | Decision — exact reason |
|---|---|---|---|---|
| `main` | `c97de51fd9876c533baec9a5ead75395515a94b2` | 0 | ANCESTOR | Target base (preflight). Not a landing candidate; unchanged. |
| `master` | `9f2bb78dad7623da42c23f5ebf2a3c5319b725c5` | 127 | NOT-ancestor | **HOLD — master-only branch, excluded by slice scope.** Divergent shipping line (repo HEAD → `master`), 127 unique commits not on `main`; a merge into `main` would be conflicted/risky and is owner-gated per `projects/furma.tech/LEDGER.md` F5. Untouched. (Tip moved `698d820` → `9f2bb78` during this run; counts taken at the fresh tip.) |
| `fleet-hold/fleet/branch-land-all-tech` | `c97de51fd9876c533baec9a5ead75395515a94b2` | 0 | ANCESTOR | **HOLD — `fleet-hold/*` hold-prefixed branch, excluded by slice scope.** This lane's own hold ref, already at the `main` SHA; no landing needed. Untouched. |
| `fleet-hold/fleet/branch-sweep-tech` | `d7348f48d94dd7ca0a271bbd7b3718ee6056c817` | 0 | ANCESTOR | **HOLD — `fleet-hold/*` hold-prefixed branch, excluded by slice scope.** Already fully merged into `origin/main` (ancestor, 0 unique commits); nothing to land. Untouched. |
| `archive/design/remove-dead-contact-form-20261005` | `24b059994d2dd2f41d546585f1e868648377b794` | 7 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope (non-archive only).** 7 unique commits left intact; not landed, deleted, or re-archived. |
| `archive/develop` | `d7992c2bab93b43d81d90407aaf4a40ea28775f0` | 6 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 6 unique commits left intact. |
| `archive/feat/home-hero-footer-ascii-dither` | `a7c714c3138d675e40e00ea8b2f16470bbc2e14c` | 6 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 6 unique commits left intact. |
| `archive/feat/interactive-screens` | `852867fcae407726a5f339534f51bf179d3ae33e` | 3 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 3 unique commits left intact. |
| `archive/feat/interactive-screens-live-20261029` | `64d1ed922c49d45b12c88f05d2abe0de9d6005d6` | 5 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 5 unique commits left intact. |
| `archive/feat/showcase-films` | `0796c7db4dfce58467e126fbd26197a7e0b13c37` | 18 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 18 unique commits left intact. |
| `archive/feat/showcase-page` | `6e26e055cde9235ea0ad08c392ae0bc20a726016` | 19 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 19 unique commits left intact. |
| `archive/feat/soft-screens-image-footer` | `354041ae8ade40c6aca741284708c389d54a01b1` | 2 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 2 unique commits left intact. |
| `archive/fix/furma-tech-small-quality-fixes-20261008` | `eafbf28221870f5d79874ace1de73dbe22b287ff` | 7 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 7 unique commits left intact. |
| `archive/fix/pnpm-minimum-release-age` | `72f01b65a1e1bc223356955cf2d9ab32ff7e622b` | 83 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 83 unique commits left intact. |
| `archive/fleet/design-hero-premise-20261004` | `8fb5eb0754c592bea621c4061e647867d5505c3b` | 7 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 7 unique commits left intact. |
| `archive/fleet/design-tech-work-entry-20261004` | `0328054f1ca1f2f8b3092b7ac920b5eb5b58d70b` | 8 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 8 unique commits left intact. |
| `archive/fleet/furma-tech-f105` | `92ebbf1a3ca1a8c33c951426ba7fa9afb0d3856d` | 1 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 1 unique commit left intact. |
| `archive/fleet/furma-tech-f105-guide-sync` | `716b3f6cdd0345d1c3872effcf46b18bbe51563f` | 84 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 84 unique commits left intact. |
| `archive/fleet/furma-tech-work182-cormorant-20261025` | `bf8e4bed614bd6a4ea42c9c03fcbe910208729f6` | 39 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 39 unique commits left intact. |
| `archive/fleet/furma-tech-work287-og-smoke-20261025` | `6f31cf831626132578c7d19dc0169007ad46f3dd` | 39 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 39 unique commits left intact. |
| `archive/fleet/furma.tech-master-remainder-20261022` | `95b956744c0e6466267a543e5a38ce44833d0cd9` | 20 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 20 unique commits left intact. |
| `archive/fleet/home-entry-one-line` | `a4a5303a6e6186b041cb0581aa61b5c56973ea13` | 68 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 68 unique commits left intact. |
| `archive/master` | `d3d7c5298c604176fc9c490b60b74e6255acbb39` | 82 | NOT-ancestor | **HOLD — `archive/*` branch, excluded by slice scope.** 82 unique commits left intact. |

## Notes and prior art

- No `land`, merge, rebase, cherry-pick, or fast-forward was performed; `sf-orch land` was not invoked because its input set is empty. `origin/main` remains at the preflight SHA `c97de51`.
- The two `fleet-hold/*` branches and `main` are already ancestors of `origin/main` (0 unique commits), so even setting scope aside there would be nothing to land from them.
- `master` adjudication is consistent with `reports/furmatech-branch-reconcile1-REPORT.md` (2026-11-14): repo HEAD points to `master` (shipping line), `main`'s code is fully covered on `master`, and the divergence/retire decision is owner-gated — so `master` is held, not force-landed onto `main`.
- All 19 `archive/*` branches intentionally retain their unique commits; "nothing deleted or archived" is satisfied — this lane created no new archive refs and deleted no refs.
- Artifact branch: this lane pushed `fleet/branch-land-all-tech` @ `3ec44ed641efae004dbbbab81f9ce8d830091d97` (a docs-only report commit on top of `c97de51`) as the durable home for this report. It is a lane artifact, not product work, and is intentionally not landed onto `main`; it did not exist at dispatch, so it is outside the 23-branch set checked above.

## Verification evidence

- `git fetch origin` (fresh) succeeded; `git rev-parse origin/main` = `c97de51fd987...` (matches preflight and unchanged).
- `git ls-remote --heads origin` returned 23 refs: 19 `archive/*`, 2 `fleet-hold/*`, `main`, `master`.
- `git ls-remote --symref origin HEAD` → `refs/heads/master` (confirms master-only flag).
- `git merge-base --is-ancestor` + `git rev-list --count origin/main..<ref>` produced the `unique`/relation columns above; no branch outside the four excluded classes exists.
- No gates run: no commit landed, so there is no new tree to gate and no red-vs-baseline ambiguity to resolve.
