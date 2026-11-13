# FURMATECH-TYPECHECK-UNIT-RED1 — 2026-11-13

Slice: fix the two daily-tests reds reported at `28efd09`
(`stream/mechanical/2026-11-13-daily-tests-furma.tech.md`).

## Root causes

Both reds were dirty-checkout artifacts, not product bugs at the pinned SHA.

`control/fleet/daily-tests.sh` runs the gates directly inside the live shared
checkout `~/Projects/furma.tech` with no clean-tree check. At sweep time that
checkout sat at `28efd09` with 67 staged-but-uncommitted files (in-flight lane
work). Measured against that dirty tree:

1. **typecheck TS2322** `gambit-deck/page.tsx(53,20) Property 'live' does not
   exist on ProjectLayoutProps` — the dirty `src/components/ui/ProjectLayout.tsx`
   had dropped the `live?: { href; label }` prop while the dirty page still
   passed it. Clean `28efd09` and clean `origin/master` both carry the prop
   (introduced in `357764e`); nothing to fix in the page or the component.
2. **unit SyntaxError** `The requested module 'next' does not provide an export
   named 'Metadata'` — the dirty `src/lib/metadata.ts` had been changed from
   `import type { Metadata }` to a value `import { Metadata } from "next"`.
   Under `node --test`'s type stripping a value import of a type-only export
   survives to runtime and crashes module resolution for any suite that reaches
   the module (`tests/og-metadata.test.ts` imports that file). The same dirty
   tree also broke `tests/styleguide.test.ts:43` (calendar month-locale regex)
   via a dirty `src/components/ui/calendar.tsx`.

## Fix landed

`3c31daf` on `origin/master` (fast-forward `c805167..3c31daf`):

- 20 files under `src/app/` (`robots.ts` + 19 pages) converted
  `import { Metadata }` / `import { MetadataRoute }` to `import type`, matching
  AGENTS.md §3/§4 and the eight files that already complied. All uses were
  type-position only (`export const metadata: Metadata`,
  `robots(): MetadataRoute.Robots`), so the change is semantics-free for Next.
- `tests/next-type-imports.test.ts` — new zero-dependency contract test that
  walks `src/**` and fails on any value-position import of `Metadata` or
  `MetadataRoute` from the bare `next` specifier. Proven red against the old
  import form, green after.

## Gates (on the landed tree)

- `pnpm exec tsc --noEmit` — clean
- `pnpm run lint` (eslint) — clean
- `pnpm test` (`node --test tests/*.test.ts`) — 166/166 pass (165 + new test)
- `pnpm build` — green, all routes prerender

Baseline before the change on clean `c805167` was already green; the commit is
hardening that removes the whole failure class and pins it with a test.

## Notes for the coordinator

- **Spec said `origin/main`; the repo mainline is `master`.** `origin/main`
  (`ea85c9a`) is a stale divergent line that lacks `portfolio/gambit-deck` and
  the other new project pages entirely; `origin/HEAD -> origin/master` and
  AGENTS.md branches from `master`. Landed on `origin/master`.
- **Systemic root cause (SF-side, out of this slice's repo):**
  `control/fleet/daily-tests.sh` gates whatever the shared checkout contains.
  Until it runs gates on a clean worktree/clone or refuses dirty trees, any
  lane's staged WIP will produce daily reds that look like product bugs. Worth
  its own slice.
- Preflight `worker start` initially HOLDed on a duplicate-lane false positive:
  lane `ctx_1e684e72490b` owns slice `QART-UNIT-RED1` in the qart repo, but
  `named_in()` matched the shared `-RED1` name token. Released by a board
  `decision` entry per the fence's own instructions.
