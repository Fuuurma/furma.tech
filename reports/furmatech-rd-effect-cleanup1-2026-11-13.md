# FURMATECH-RD-EFFECT-CLEANUP1 — react-doctor effect-needs-cleanup

Date: 2026-11-13 · Slice: FURMATECH-RD-EFFECT-CLEANUP1 · Landed: e1579f1 on origin/main

Source report: `stream/mechanical/2026-11-13-react-doctor-furma.tech.md` (react-doctor@0.9.14,
scanned the shared checkout at master@28efd09 whose staged tree already carried the
origin/main blobs for all three files — the diagnostics reproduce verbatim on origin/main).

## Diagnostics and what each effect actually subscribes

- `src/components/dither-wave-tw.tsx:217` — `useEffect` builds two `ResizeObserver`s
  (`reserveObserver` on `[data-screen-reserve]` blocks, `observer` on the surface), a
  `MutationObserver` (theme), a `matchMedia("resolution")` listener, an
  `IntersectionObserver` (offscreen pause), six `window` listeners (idle swell) and a RAF
  loop via `schedule()`. Cleanup already cancelled the frame and disconnected everything —
  but the per-frame `reserveObserver.observe/unobserve` bookkeeping ran *inside* `paint`,
  which observer callbacks also invoke, so the rule could not prove the pair was let go.
- `src/components/liquid-ascii-tw.tsx:229` — same observer set plus `bindPointer` (via
  `unbind`). Same `observe`-inside-`paint` problem, **and** a real leak: `layout()` can
  return `null` (zero-size panel, no 2d context, atlas failure) *after* every observer and
  listener above was already subscribed, and `if (!body) return;` returned no cleanup —
  keeping the subscriptions alive on purpose (a later resize retries `layout()`) but also
  leaking them on unmount.
- `src/components/ui/carousel.tsx:96` — `api.on("reInit", onSelect)` and
  `api.on("select", onSelect)`; the cleanup removed only `"select"`. Real asymmetry.

## Changes (commit e1579f1)

- Both screens: the reserve-target `observe/unobserve` sync moved out of `paint` into
  `syncReserves()`, called once per frame from `step()` — the frame path — so no
  subscription is created inside a subscription's own callback. Cadence is unchanged:
  `step` already ran `paint` every frame; observer-triggered repaints skip the sync, which
  only re-reads which elements are watched (reserves themselves are still re-read inside
  `paint` every 6 frames). Under reduced motion the sync never runs, so `reserveObserver`
  watches nothing — the still frame is painted once either way and surface resizes still
  repaint through `observer`.
- `liquid-ascii-tw.tsx`: teardown extracted to `dispose()`; `if (!body) return dispose;`
  keeps the resize-retry observers alive **and** cleans up on unmount; the normal path
  returns the same `dispose`.
- `carousel.tsx`: cleanup now removes both `"reInit"` and `"select"`.
- `tests/liquid-atlas-dpr.test.ts`: the cleanup-shape assertion followed the refactor —
  it now checks `dispose` releases the resolution listener and that the effect returns it
  (same invariant, plus the early-return path).

## Verification

- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts` unused `_params`).
- `pnpm exec tsc --noEmit` — clean (a stale `.next/types` from master-only routes was
  removed first; zero `src/` errors before and after).
- `pnpm test` — 86/86 pass (`node --test "tests/*.test.ts"`).
- `npx react-doctor@0.9.14 --json --no-score` on this worktree — `effect-needs-cleanup: 0`
  (was 3). Remaining rows on the touched files are pre-existing P3s out of scope
  (`no-giant-component`, `js-set-map-lookups`, `no-pass-*-to-parent`, context value).
