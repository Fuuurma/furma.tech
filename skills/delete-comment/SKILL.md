---
name: delete-comment
description: "Audit code comments in furma.tech, remove redundant or stale ones, turn workaround notes into repair tasks, and move lasting decisions into DESIGN.md. Use when asked to clean up comments, run a comment audit, or enforce the no-new-comments ratchet."
---

# Delete comments (furma.tech)

Adapted from `sf-v2/skills/delete-comment`. Audit the requested source scope
(`src/`, `tests/`, `scripts/`, root config files) — vendored skill packs
(`.agents/`, `.factory/`, `.cursor/`, `.devin/`, `.claude/`, `skills/shadcn/`)
are third-party content and out of scope. Preserve the worktree's unrelated
edits. The counting tool is `node scripts/check-comments.mjs --report`
(language-aware: strings, templates and regexes are skipped before comment
detection, so URLs never count); a text search is only a discovery aid.

## House style first

This repo's comments are written deliberately: design intent in CSS,
algorithm walkthroughs in the render libraries, module contracts at the top
of `src/lib/`. Most comments that look long are documentation, not debt.
Classify before deleting, and when a comment is doing real work, leave it.

For each comment, inspect the surrounding code and current tests:

| Class | Test | Action |
|---|---|---|
| Tautology | The code already states the same fact (template labels like "Professional Animations" above `@keyframes float`) | Delete |
| Stale | The described behavior, name or path no longer exists | Delete |
| Excuse | The note rationalizes a workaround, swallowed error, or incomplete path | File one concrete repair task in `reports/` with a verify command, then delete the note |
| Decision record | A surprising, costly-to-reverse tradeoff explains the implementation | Record it as a dated section in `DESIGN.md` (the repo's decision log; the `docs/` directory is gitignored and local-only — never put decisions there), then delete the source comment |
| Design prose | The repo's editorial voice explaining intent next to the code it describes | Keep — this is a house convention, not debt |

Retain required legal notices, shebangs, generated-file markers, compiler
directives, and public API documentation (the JSDoc on component props and
`src/lib/` module headers). Record retained classes separately from the four
cleanup classes. If classification is uncertain, inspect call sites and
history before acting.

## The ratchet

`pnpm lint` runs `scripts/check-comments.mjs`, which refuses any file whose
comment-only line count rises above `scripts/comment-baseline.json`. After a
cleanup passes against the current baseline, run
`node scripts/check-comments.mjs --update-baseline`, then run the full
repository gates (`pnpm test && pnpm lint && pnpm build`). Keep the ratchet
moving downward; never refresh it to admit an added comment.

## Secondary engineering review

While reading each area for comments, look for duplicated decisions, shallow
modules, tangled ownership, unsafe error handling, weak test seams, and
measurable performance or reliability problems. Check callers and tests
before judging an apparent problem. Record only material opportunities in
`reports/`, with a code location, evidence of impact, a concrete proposed
change, and a verify command. Implement an unrelated refactor in its own
slice so the comment diff stays reviewable. A clean area can have no
secondary findings.

Use small reviewable slices for large areas. Give each slice its own verify
command. Report blocks removed, comment-only physical lines removed,
remaining blocks, and the evidence behind any estimate.
