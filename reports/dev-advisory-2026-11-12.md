# dev-advisory chain bump: minimatch via eslint-config-next

Slice: SF stream/mechanical/2026-11-12-dep-audit-furma.tech-worker.md —
"furma.tech P3 chore: bump dev-advisory chain (1 advisory, dev-only)".
Branch `fleet/ftech-dev-advisory`, base `origin/main` fd80c0d.

## The advisory

`pnpm audit` before: **1 moderate, dev-only** — `minimatch >=7.0.0 <11.0.1`
(GHSA-g3hv-75wg-m249), reached only through the devDependency
`eslint-config-next` → `typescript-eslint` →
`@typescript-eslint/typescript-estree@8.65.0` (`minimatch@^10.2.2` →
resolved 10.2.5). It runs inside ESLint at lint time and never ships;
the eslint plugins' own `minimatch@3.1.5` edges sit outside the vulnerable
range and are untouched.

## Why an override, not a parent bump

No stable parent range allows the patch: `typescript-estree` caps minimatch
at `^10.2.2` through the latest stable `8.72.2`; only the unpublished
`8.72.3-alpha` line has moved to `^11.0.1`. Bumping `eslint-config-next`
(16.2.11 → 16.4.6 stable) still resolves `typescript-eslint@^8.x` →
`typescript-estree@8.72.2` → `minimatch@^10.2.2`, so "bump where the
parent range allows" has no bump to make. The floor is forced on the one
vulnerable edge in `pnpm-workspace.yaml` `overrides:` — the only place
pnpm reads overrides (see the `pnpm-overrides-location` fleet lesson; a
`package.json` `pnpm.overrides` entry would silently no-op).

`'@typescript-eslint/typescript-estree>minimatch': ^11.0.1` is scoped to
that parent edge, not a blanket `minimatch` override — a global bump would
have dragged the eslint plugins' `minimatch@^3` consumers onto v11 and
broken the lint toolchain (the failure mode the audit file warns about).
It resolves **11.0.8**, above the `>=11.0.1` floor, inside major 11.
minimatch 11 keeps dual ESM/CJS exports and is what the typescript-eslint
alpha already declares, so the edge is upstream-sanctioned. As a bonus the
new resolution pulls `brace-expansion@5.0.13` (floor `^5.0.12`), clearing
five dev-only `brace-expansion` 4.x/5.x-range advisory rows on the same
chain; the `minimatch@3` → `brace-expansion@1.x` rows remain, out of scope.

## What landed

- `pnpm-workspace.yaml`: `overrides:` gains the scoped minimatch floor with
  the advisory id and rationale in the house comment style.
- `pnpm-lock.yaml`: regenerated — `typescript-estree`'s minimatch
  `10.2.5` → `11.0.8`, its `brace-expansion` `5.0.7` → `5.0.13`, new leaf
  `@isaacs/nonrecursive-glob-match@1.1.0`. `minimatch@3.1.5` and every
  other resolution unchanged; `package.json` untouched.

## Verification

- `pnpm audit --json`: minimatch advisory gone; 26 → 20 advisory rows, all
  remaining rows pre-existing (next/zod prod rows are separate slices).
- `pnpm lint`: 0 errors (1 pre-existing `_params` warning in
  `src/lib/metadata.ts`, unrelated).
- `pnpm exec tsc --noEmit`: clean.
- `pnpm test`: 86/86 pass.
- `pnpm build`: green, 24 static routes.
