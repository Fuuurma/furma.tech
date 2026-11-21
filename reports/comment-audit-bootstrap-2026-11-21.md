# COMMENT-AUDIT-BOOTSTRAP — full comment inventory, first slice, and the no-new-comments ratchet

Date: 2026-11-21 · Task `t_01M7WXFYC6XE8XD3MX3PCTP4A3` · Lane `sf/t_01M7WXFYC6XE8XD3MX3PCTP4A3/e3`

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

Result at the audited baseline (origin/master, measured by the same
scanner): **1,159 comment tokens across 108 files**, **2,271
comment-only physical lines** (lines containing nothing but comment
text; 2,462 lines carry comment text including trailing comments).

Post-slice (current tree): **1,144 comment tokens in 108 files**, **2,265
comment-only physical lines**. The ratchet's own two files
(`scripts/check-comments.mjs`, `tests/comment-ratchet.test.ts`) carry ~28
tokens / ~55 comment-only lines of tooling documentation, so product-code
comments fell by ~43 tokens / ~61 lines while repo totals fell by
15 tokens / 6 lines.

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
  majority (~1,100 tokens). This includes the React Bits Pro prop-compat
  docs in `dither-wave-tw.tsx` / `liquid-ascii-tw.tsx`, shebangs, the two
  lint-suppression / deprecation directives in the tree, test contract
  rationales in `tests/`, config rationale in `eslint.config.mjs` /
  `ci.yml` / `pnpm-workspace.yaml`, and the CSS section labels in
  `globals.css` / `v2.css` (the "AI Company UI Accents" header was the
  one stale label, removed).

## Slice-1 removals (all verified comment-only lines via `git diff`)

- `src/app/loading.tsx` — tautological JSDoc (4 lines)
- `src/app/robots.ts` — tautological JSDoc + two noise comments (6 lines)
- `src/components/Analytics.tsx` — tautological JSDoc + JSX labels (8 lines)
- `src/lib/schemas.ts` — tautological JSDoc ×2 + restating line comment (7)
- `src/app/styleguide/page.tsx` — 24 section-banner JSX comments + 2
  `// ———` separators (26)
- `src/app/globals.css` — stale "AI Company UI Accents" header (1)
- `src/app/layout.tsx` — decision comments migrated to `ARCHITECTURE.md` Decisions (8)
- `src/lib/water.ts` — particle-fluid history trimmed to the same (net 2)

## Ratchet

`pnpm lint` now runs `pnpm check:comments` after ESLint. The ratchet
fingerprints normalized comment text per file; every current fingerprint
must exist in `scripts/comment-baseline.json` (multiset compare —
deletions always pass, new or edited comment text fails with
`file:line` + text). Fingerprints that are themselves check-suppression
or deprecation directives are stored as sha256 digests, so the baseline
never republishes a silenced-check directive verbatim — the merge gate
reads added lines in every committed file, baseline included. `--write`
regenerates the baseline for legitimately required comments; it must
never be refreshed to admit additions. Contract coverage:
`tests/comment-ratchet.test.ts` runs the gate in `pnpm test`.
Negative-tested: appending `// ratchet-probe` fails the gate; template
`//` false positives do not occur. The baseline is generated only while
every in-scope file is tracked — `git ls-files` is the file list, so
untracked new files are invisible to `--write` (the e1 baseline missed
this ratchet's own two files; regenerated here with all files staged).

Repo skill: `.devin/skills/delete-comment/SKILL.md`, adapted from the
canonical sf-v2 skill, documents scope, classes, decision locations, and
the ratchet workflow.

## Savings

- Current comment-only physical lines (post-slice): **2,265** across
  1,144 tokens / 108 files (master baseline: 2,271 / 1,159 / 108).
- Removed this slice: **61 net comment-only lines** from product files
  (43 tokens), concentrated in generated boilerplate: styleguide banners,
  JSDoc stubs, one stale CSS header, decision narratives migrated to
  `ARCHITECTURE.md`. The ratchet tooling itself carries ~55 comment-only
  lines, so net repo comment-only LOC is **−6**; gross product-code
  savings is the honest headline.
- Projected: the retained classes are ~95% of remaining comment LOC and
  are kept by policy, so realistic further savings are small — order
  100–300 lines if a future task compacts the `globals.css` section-label
  convention (~206 lines) and borderline hero/`v2` region labels. Do not
  project stripping API docs: that would delete the repo's documentation
  layer, not comments.

## Secondary finding (recorded here — `sf task add` needs SF_ADMIN_TOKEN,
control-host only; file from the queue side)

`src/app/styleguide/page.tsx` ~L1099: the inventory row renders
`Shape: …` via `(comp as any).shape` behind a next-line suppression of
the `no-explicit-any` rule. No data entry uses the singular `shape` key
(only `shapes`), so the row is dead code behind a silenced check and an
`any` cast — both prohibited by AGENTS.md. Proposed: delete the dead row
(or type the inventory entries). Verify: `pnpm lint && pnpm test &&
pnpm build`. Risk: low.
