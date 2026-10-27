# The project showcase — research and first plan (2026-10-27)

Status: research only. No code written for the showcase yet.

## The ask

> the projects of furma.tech floating as cards / windows. as showcase — scroll will
> continue down as allways. maybe we can start by putting 10 logos there instead of
> the full card/window. but the core of them floating on the bg as carousel is the same

Long, iterative job. This file is the ground truth for it: what already exists, what is
worth copying, and the order to build it in.

## What the section is today

`PortfolioIndexSlide` in `src/components/home/PlasticHome.tsx` — the second panel of the
home tour. It is one centred rotating word (`AI / SaaS / games / civic tech`) on the
`DitherWave` field. Everything else was removed on 2026-10-27.

## What constrains any showcase built there

These are properties of this codebase, not preferences. A showcase that ignores them
breaks the page.

1. **The home is a panel tour, not a document scroll.** `useSmoothSectionScroll` stacks
   every section as an absolutely positioned panel and moves them with `translateY`
   (`PlasticHome.tsx`, `plastic-home__panel`). There is no `scrollY` to scrub: the page's
   progress is `activeIndex`, and a wheel gesture *advances a section*.
2. **A panel can own its own scroll.** `data-section-scroll` marks an inner scroller that
   swallows wheel/touch until it reaches its end (`tests/section-scroll.test.ts`). The
   contact panel already uses it.
3. **Text keeps its paper.** `data-screen-reserve` thins the wave's ink behind type; the
   canvas reads element boxes each frame. More moving boxes means more per-frame work.
4. **One wave, low gain, interactive.** The panel's `DitherWave` is `composition="field"`,
   `quality="low"`, `maxFPS={45}` and accepts the hand. Cards drawn over it must not fight
   the pointer for the same gesture.
5. **Reduced motion is a real state.** `useStableReducedMotion` is SSR-safe; the repo's
   contract tests read the source for `prefers-reduced-motion` handling.
6. **Tests pin source contracts, not screenshots.** `tests/*.test.ts` read files and
   assert on strings/mechanics. New behaviour needs a test in the same idiom.

## Furma already owns the hard part

`furma.bloxs` already contains four working depth/float mechanics, each studied from a
source and rebuilt, with the physics documented. The showcase is a composition of these,
not a new engine.

| Piece | File | Mechanism worth taking |
|---|---|---|
| Diagonal carousel | `src/originals/diagonal-carousel/STUDY.md` | Cards on one diagonal; the active card is full size at centre, the ones behind step down-left smaller, ahead step up-right. **Every input — wheel, drag, keys, click — feeds one critically damped spring** (fixed 1/120s step, no overshoot), with detents so a card holds until the stack leaves it. |
| Card swap | `src/originals/card-swap/STUDY.md` | A perspective stage, one slot per card; a slot at depth `i` sits at `(i·60, −i·70, −i·90)` and is scaled by `900 / (900 + i·90)`. Hover spreads the stack 12%, the perspective origin follows the pointer, the fourth card dims to 62%. Autoplay pauses over a card, during a drag, off viewport and when the tab is hidden. |
| 3D card | `src/originals/3d-card/STUDY.md` | Pointer offset ÷ 25px → `rotateX/Y` under a 1000px perspective; `preserve-3d` so inner layers genuinely rise. |
| Footer gallery | `src/originals/footer-gallery/STUDY.md` | A card stage behind content on a radial field with grain, rows revealing at `i × 40ms`. |

Also relevant: `floating-dock`, `floating-navbar` (float grammar), `orbiting-circles`,
`icon-cloud` (the "10 logos" phase), `infinite-slider` / `furma-marquee`.

**The strongest single candidate is the diagonal carousel's float model** — it is the only
one in the set that is driven by one spring position rather than by scroll, which is
exactly what a tour panel needs.

## Outside: what exists, and what it is good for

Verified by search on 2026-10-27; each line says what I actually confirmed.

**Carousels with depth**

- **Motion UI `Coverflow`** (`motion.dev/ui/components/coverflow`) — the cleanest API of
  the lot: `cardWidth`, `rotation` (peak neighbour `rotateY`, default 22), `neighbourScale`
  0.82, `neighbourOpacity` 0.45, `perspective` 1200, `startIndex`. **Paid** (Motion+), source
  is copy-editable. Good as a *construct*, not as a dependency.
- **shadcn.io `gallery-coverflow` block** (2026-03) — free coverflow on shadcn + Tailwind +
  Framer Motion. Closest thing to a drop-in, but built for image galleries, not project
  windows.
- **`ashishgogula/coverflow`** (GitHub) — iTunes Cover Flow rebuilt on Motion springs,
  hardware-accelerated CSS 3D, no layout shift, shadcn install path. The spring model is
  the interesting part.
- **Swiper's `coverflow` effect** via `skiper47` — battle-tested and cheap, but Swiper owns
  the gesture model (drag/wheel) and would fight the tour's wheel.
- **Addy Osmani's "Cover Flow with modern CSS"** — pure-CSS coverflow using scroll-snap +
  `animation-timeline: view()`; a good reference for how little is needed.

**Floating cards / canvas**

- **21st.dev "Floating Card Gallery"** — mouse-tracked 3D perspective, expandable cards,
  keyboard + ARIA, floating particle background. Closest to "windows floating on the
  background", but the particles are the wrong material for this page's wave.
- **Dribbble "Infinite Drag Canvas"** (Framer) — a scroll-and-drag canvas where work floats
  in an endless grid: hover lifts, click zooms, drag roams, with a "scroll / drag to move"
  hint. The interaction model to steal for a non-scroll panel.
- **Trionn "Work Showcase — floating project gallery"** (Awwwards) — floating project cards
  on a moving field; the reference for *density* (how many can float before it is noise).

**Stacked / scroll-linked portfolios**

- **UI Incubator "Portfolio Stacked Scroll"** — `position: sticky` per card with incremental
  top offsets, `useScroll` + `useTransform` scaling 0.88 → 1. Explicitly suits **3–5 cards**;
  beyond five the deck reads awkward on short screens. Useful caution: ten cards will not
  stack.
- **Skiper16** (`skiper16`) — sticky card stack with Lenis, shadcn install.
- **Framer "3D Scroll Cards"** and **Darkroom's sticky project showcase** — the agency
  pattern: a sticky stage that swaps the featured project as sections pass. Requires real
  document scroll.

**Personal and studio sites worth looking at**

- **Roy Jad** (One Page Love, 2026-10) — floating project panels plus a horizontally
  scrolling portfolio gallery, tiny mono labels, extreme white space.
- **Theo Cole** (Framer template) — "SCROLL/DRAG TO MOVE" over a field of interactive
  project cards. The drag-to-roam model.
- **Pacôme Pertant** (Awwwards) — a dimensional floating project gallery inside a
  browser-like frame.
- **Trionn**, **Darkroom**, **Jackson Bryan** — floating device/window cards as the work
  itself.

**Browser reality check**

`animation-timeline: view()` is Chrome/Edge 115+, Safari 26+, Firefox 159+ — about 88% of
global usage, not Baseline (`caniuse`, MDN, 2026-03). Decision: drive the motion in JS with
Motion (already a dependency) so the panel behaves identically everywhere the tour already
works.

## The three mechanisms, judged against this panel

**A — a float, not a scroll.** One spring position drives which card is forward; the wheel
and touch still advance the tour; drag on a card moves the stack only while the pointer is
down; autoplay advances when the panel is active and nobody is touching it. This is the
diagonal carousel's model, reduced to our material. Nothing to hijack; the tour keeps its
own gesture.

**B — an inner scroll region.** `data-section-scroll` inside the panel drives a horizontal
rail. It works (the contact panel proves it) but it spends the panel's whole wheel budget on
the rail: a reader who wants the next section must first finish the cards. On a tour whose
promise is "scroll always moves you on", this is the mechanism most likely to feel stuck.

**C — native scroll with sticky.** The strongest cinematic result outside this codebase, and
incompatible with the tour: it wants the document to scroll.

**A is the recommendation.** It is the only one where "scroll continues down as always" stays
literally true.

## Phases

Each phase is a reviewable slice, in this order.

0. **Study pass, no code.** Re-read the diagonal-carousel and card-swap models; decide the
   float (spring), the layout (row / diagonal / orbit), and the depth budget (how many cards
   visible at once). Output: one annotated still, one paragraph of physics. Owner review
   before any component exists.
1. **Marks, no windows.** *(Started 2026-10-27 with five windows instead of ten marks —
   see DESIGN.md, "The field of windows".)* Cards that carry a project's mark and name only —
   the logos the ask settles on as a starting point. Float, autoplay, hover-to-front, click opens
   the project slide. Nothing to read, so the motion can be judged alone. This is where the
   feel gets tuned (spring frequency, spread, dwell, dim curve).

   **There are no project marks in the repo today.** `public/` holds only the studio's own
   logos (`logo.svg`, `logo-clean.svg`, `logo-dark.svg`, `logo-minimal.svg`); the ten projects
   exist as bespoke hero *artwork* (`src/components/heroes/*.tsx`, 10 files). So "ten logos"
   is itself a decision: (a) set each project's name in type as its mark — fastest, and it
   matches the editorial direction; (b) crop a signature corner of each existing hero SVG;
   (c) draw ten marks — a separate design job that should not block the motion work.
2. **Windows.** The same engine, cards become the project window: name, category, status,
   one line, one picture. Depth shade, hover spread, keyboard (arrows, Enter, Esc), and a
   focus order that matches the visual order.
3. **The hand.** Pointer parallax on the stage (not on each card), drag with inertia,
   release-to-nearest, and reduced motion as a static, ordered row.

## Contract for the component

- The wheel and touch still advance the tour. A card may only take the pointer after it is
  pressed.
- Autoplay stops when the panel is inactive, the tab is hidden, a card is hovered or held,
  and under reduced motion.
- The stage is sized by its container, not the viewport; it must not create document
  overflow at 320/390/768/1440.
- Keyboard reaches every card in visual order; the card that is forward is the one that
  takes Enter.
- Reduced motion: a plain, ordered row of the same ten, no float.
- One test pins the mechanism in the repo's idiom: the float is one spring, the tour's
  navigation is untouched, reduced motion renders the static row.

## References named (design-arsenal contract)

1. **Trionn, "Work Showcase — floating project gallery"** — why: the density ceiling. It
   shows how many floating cards stay legible before the field reads as clutter.
2. **21st.dev, "Floating Card Gallery"** — why: the pointer-driven perspective stage, and
   the accessibility plumbing (focus, ARIA) a floating field usually forgets.
3. **furma.bloxs `diagonal-carousel`** (studied from Daksh Aswall) — why: the physics. One
   critically damped spring, detents, and no overshoot is exactly the grammar a panel needs.

Craft move: **one spring, one position.** Every input writes to a single float value; the
cards read from it. No per-card animation state, no scroll listeners.

Catalog pick: **Motion** (`framer-motion`, already installed) for the spring and transforms;
**Embla** stays available if a snapping rail is wanted later; **Lenis** is not used here —
the tour already owns smooth scrolling.

## Open questions for Furma

1. Do the ten float on a **row** (a horizontal depth line), a **diagonal** (bloxs's
   geometry), or an **orbit** (a ring the pointer turns)?
2. Should a card be **pressable** (drag roams the field) or **hover-only** (the field moves
   itself and the pointer only lifts a card)?
3. Does a card open the project panel already in the tour (`navigate(FIRST_PROJECT_SECTION +
   i)`), or its own route (`/portfolio/<id>`)?

## Sources

- `~/Projects/furma.bloxs`: `src/originals/{diagonal-carousel,card-swap,3d-card,footer-gallery}/STUDY.md`,
  `research/library-arsenal.md`, `catalog/references.json` (`furma-diagonal-carousel`,
  `furma-card-swap`, `motion-showcase`, `ui-layouts-stack-testimonial`).
- `~/Projects/software-factory/design/inspiration.md` (`liquid-glass-carousel`,
  Minimal Gallery, Component Gallery), `QUICK-REFERENCE.md` (Embla, Motion, Lenis, GSAP
  ScrollTrigger).
- `~/Documents/Obsidian Vault`: LIBRARY sources and X design signal notes (no note matched
  "floating card / coverflow" — the vault's design material on this theme is in the Hub
  catalogs above).
- Web, 2026-10-27: motion.dev/ui/components/coverflow; shadcn.io/blocks/gallery-coverflow;
  github.com/ashishgogula/coverflow; skiper-ui.com/v1/skiper47 and /skiper16;
  ui-incubator.com "portfolio-stacked-scroll"; 21st.dev floating-card-gallery;
  awwwards (Trionn, Pacôme Pertant); onepagelove.com/roy-jad; theocole.framer.website;
  caniuse + MDN for `animation-timeline: view()`.
