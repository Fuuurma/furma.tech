---
name: delete-comment
description: Audit code comments, remove redundant or stale ones, turn workaround notes into repair tasks, and move lasting decisions into ADRs. Use for a requested comment audit or cleanup in this repository.
---

# Delete comments

Adapted from the canonical `delete-comment` skill (sf-v2
`skills/delete-comment/SKILL.md`, digest 897fa4f8). Audit the requested
source scope, including tests and scripts. Preserve the current worktree's
unrelated edits. Count comment tokens with a language-aware parser where
available; a text search is only a discovery aid.

## Scope and ratchet

The audited scope is every tracked code file under `src/`, `tests/`,
`scripts/`, `.github/`, plus root-level config files — TypeScript/TSX/JS/MJS
(parsed with the TypeScript compiler API), CSS, YAML, shell, and JSONC.
Vendored trees (`.agents/`, `.cursor/`, `.devin/`, `.factory/`, `skills/`)
are not product code and are out of scope.

`pnpm lint` runs `pnpm check:comments` (`node scripts/check-comments.mjs`),
which fails on any comment fingerprint — normalized comment text — that is
not in `scripts/comment-baseline.json`. Deletions always pass; new or
edited comment text fails. Fingerprints that are themselves check
suppressions or deprecation directives are stored as sha256 digests, so
the baseline never republishes them verbatim. To admit a required comment
(legal notice, tooling directive, API documentation), run
`node scripts/check-comments.mjs --write` with every in-scope file
tracked and commit the baseline diff. Never refresh the baseline to admit
an added comment; keep it moving downward.

## Classification

For each comment, inspect the surrounding code and current tests:

| Class | Test | Action |
|---|---|---|
| Tautology | The code already states the same fact | Delete |
| Stale | The described behavior or name no longer exists | Delete |
| Excuse | The note rationalizes a workaround, swallowed error, or incomplete path | File one concrete repair task with a verify command, keep or delete the note only per the repair plan |
| Decision record | A surprising, costly-to-reverse tradeoff explains the implementation | Record the decision and reason in the repo's decision location, then delete the source comment |

Retain required legal notices, shebangs, generated-file markers, compiler
and lint directives, and public API documentation where removing them
would change tooling or the published interface — including the React Bits
Pro prop-compat docs in `src/components/dither-wave-tw.tsx` and the
module/API doc comments the repo uses as its documentation layer. Record
retained comments separately from the four cleanup classes. If
classification is uncertain, inspect call sites and history before acting.

## Decision locations, in order of fit

1. `DESIGN.md` / `.impeccable.md` — visual and product contracts.
2. `AGENTS.md` — agent-facing product catalogue and conventions.
3. `ARCHITECTURE.md` `## Decisions` — durable technical decisions. This
   repo has no tracked `docs/` (`/docs` is gitignored: "contains secrets —
   kept locally only"), so do not create `docs/adr/`; append a dated bullet
   to the Decisions section instead, matching its terse style.
4. Module/API doc comments — the local contract of the code they sit on.
   Keep these; do not duplicate them into decision records.

## Secondary engineering review

While reading each area for comments, use `codebase-design`, `quality-bar`,
and `diagnosing-bugs` where relevant, plus the repository's relevant
language and framework skills. Look for duplicated decisions, shallow
modules, tangled ownership, unsafe error handling (including silenced
checks), weak test seams, avoidable complexity, and measurable performance
or reliability problems. Check callers and tests before judging an
apparent problem.

Keep comment cleanup as the slice's deliverable. Record only material
opportunities in the project's existing issue tracker or backlog (sf task
queue), with a code location, evidence of impact, a concrete proposed
change, and a verify command. Deduplicate against existing tasks and rank
by impact. Implement an unrelated refactor in its own task so the comment
diff stays reviewable. A clean area can have no secondary findings.

## Slicing and reporting

Use small reviewable slices for large scopes. Give each slice its own
verify command and dependency edge. Verify with `pnpm test && pnpm lint &&
pnpm build`. Report blocks removed, comment-only physical lines removed,
remaining blocks, and the evidence behind any estimate. Land only the
files the slice owns.
