# COMMENT-AUDIT-BOOTSTRAP — full comment inventory, first slice, and the no-new-comments ratchet

Date: 2026-11-21 · Task `t_01M7WXFYC6XE8XD3MX3PCTP4A3` · Lane `sf/t_01M7WXFYC6XE8XD3MX3PCTP4A3/e1`

## Inventory (measured, language-aware)

Scope: every tracked code file under `src/`, `tests/`, `scripts/`,
`.github/`, and root-level config files. Vendored trees (`.agents/`,
`.cursor/`, `.devin/`, `.factory/`, `skills/`) are excluded — they are agent
templates, not product code (same rule `eslint.config.mjs` already applies).

Scanner: `scripts/check-comments.mjs`. JS-family files are parsed with the
TypeScript compiler API (`createSourceFile` + leading/trailing comment
ranges on every node and token), so `//` inside strings and `${}` templates
is never counted — verified against the `http://127.0.0.1:${port}` template
in `scripts/smoke.mjs:40` and the `` `//furma.tech${image}` `` template in
`src/lib/metadata.ts`. CSS uses a string-aware `/* */` scanner; YAML/shell
use a quote-aware `#` scanner with shebang exclusion; JSONC configs get a
`//` + `/* */` scanner.

Result at the audited baseline: **1,155 comment tokens across 107 files**
(pre-slice; the earlier draft count of 672 blocks / 1,810 lines came from a
text-grep discovery pass and is superseded — parser tokens are the
authoritative unit). Comment-only physical lines at baseline: ~2,460.

Post-slice (current tree, measured by the same scanner): **1,116 comment
tokens in 106 files**, **2,399 comment-only physical lines**.

## Classification

Every block was read in context (callers and tests checked where
classification was uncertain). Distribution:

- **Tautology / stale — removed in slice 1:** 43 comment tokens,
  61 net comment-only physical lines (62 removed, 1 re-added shortened).
- **Decision records — migrated:** five durable decisions moved to the
  `## Decisions` section of `ARCHITECTURE.md` (the repo's existing
  decision location — `/docs` is gitignored, "contains secrets — kept
  locally only", so no `docs/adr/` was created). Covered: house face
  (Instrument Sans over Syne's severed `g`), shallow-water solver
  (particle fluid measured and dropped), sitemap omits `lastModified`,
  CSP keeps `'unsafe-inline'`, OG card assets. Three source comments
  carrying pure decision narrative were deleted (`layout.tsx` font + F99
  blocks); the `water.ts` module header kept its contract documentation
  with the particle-fluid history trimmed. Module/API docs that mix
  contract + rationale (`sitemap.ts`, `security-headers.ts`,
  `metadata.ts`) stay — they are the local documentation layer; the
  decision record holds the durable "why". `ARCHITECTURE.md`'s stale
  `fluid.ts`/`use-mobile.ts`/`useAgentNavigation.ts` module entries were
  corrected to `water.ts`/`useScroll.ts` in the same pass.
- **Excuses — none found.** No comment in scope rationalizes a workaround,
  swallowed error, or incomplete path, so no repair tasks were required.
  (The empty `catch` blocks in `contact-provider.ts` / `rate-limit.ts`
  carry no excuse comments and behave as documented.)
- **Required directive / API documentation — retained:** the large
  majority (~1,050 tokens). This includes the React Bits Pro prop-compat
  docs in `dither-wave-tw.tsx` / `liquid-ascii-tw.tsx`, shebangs,
  `eslint-disable` directives, the `@deprecated` marker in
  `ProjectLayout.tsx`, test contract rationales in `tests/`, config
  rationale in `eslint.config.mjs` / `ci.yml` / `pnpm-workspace.yaml`,
  and the CSS section labels in `globals.css` / `v2.css` (the
  "AI Company UI Accents" header was the one stale label, removed).

## Slice-1 removals (all verified comment-only lines via `git diff`)

- `src/app/loading.tsx` — tautological JSDoc (4 lines)
- `src/app/robots.ts` — tautological JSDoc + two noise comments (6 lines)
- `src/components/Analytics.tsx` — tautological JSDoc + JSX labels (8 lines)
- `src/lib/schemas.ts` — tautological JSDoc ×2 + restating line comment (7)
- `src/app/styleguide/page.tsx` — 24 section-banner JSX comments + 2
  `// ———` separators (26)
- `src/app/globals.css` — stale "AI Company UI Accents" header (1)
- `src/app/layout.tsx` — decision comments migrated to ADR-0001/0005 (8)
- `src/lib/water.ts` — particle-fluid history trimmed to ADR-0002 (net 2)

## Ratchet

`pnpm lint` now runs `pnpm check:comments` after ESLint. The ratchet
fingerprints normalized comment text per file; every current fingerprint
must exist in `scripts/comment-baseline.json` (multiset compare —
deletions always pass, new or edited comment text fails with
`file:line` + text). `--write` regenerates the baseline for legitimately
required comments; it must never be refreshed to admit additions. Contract
coverage: `tests/comment-ratchet.test.ts` runs the gate in `pnpm test`.
Negative-tested: appending `// ratchet-probe` fails the gate; template
`//` false positives do not occur.

Repo skill: `.devin/skills/delete-comment/SKILL.md`, adapted from the
canonical sf-v2 skill, documents scope, classes, decision locations, and
the ratchet workflow.

## Savings

- Current comment-only physical lines (post-slice): **2,399** across
  1,116 tokens / 106 files.
- Removed this slice: **61 net** (0.03% of comment LOC — the codebase was
  already comment-disciplined; the wins were concentrated in generated
  boilerplate: styleguide banners, JSDoc stubs, one stale CSS header).
- Projected: the retained classes are ~95% of remaining comment LOC and
  are kept by policy, so realistic further savings are small — order
  100–300 lines if a future task compacts the `globals.css` section-label
  convention (~206 lines) and borderline hero/`v2` region labels. Do not
  project stripping API docs: that would delete the repo's documentation
  layer, not comments.

## Secondary finding (filed for repair — sf queue unreachable from this
peer; SF_ADMIN_TOKEN is control-host only)

`src/app/styleguide/page.tsx` ~L1099: the inventory row renders
`Shape: …` via `(comp as any).shape` behind
`eslint-disable-next-line @typescript-eslint/no-explicit-any`. No data
entry uses the singular `shape` key (only `shapes`), so the row is dead
code behind a silenced check and an `any` cast — both prohibited by
AGENTS.md. Proposed: delete the dead row (or type the inventory entries).
Verify: `pnpm lint && pnpm test && pnpm build`. Risk: low.
