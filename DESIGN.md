# DESIGN.md — furma.tech

> Hard contract. Authority: this file > `.impeccable.md` (v2 notes) > `AGENTS.md`.

## Direction

**Quiet mono editorial (v1 public home)** — Syne / Cormorant / JetBrains,
B/W. `/v2` Workshop (cream + orange) is an alternate concept, not the default
public face until a deliberate cutover.

### References
- gionatannese.com — nerdy details, restraint
- Experimental Jetset — identity systems
- `.impeccable.md` — v1 vs v2 already written

### NEVER
- Dual public identities without a chosen `/`
- `.gradient-text` / `.glow-mono` leftovers vs the stated principles
- Amber→orange→pink utility copy in AGENTS
- Default shadcn zinc

### MUST
- One home direction on `/`
- Tokens only; hairlines; reduced-motion
- Inverse surfaces own their text colour (`--inverse` tokens, not
  `text-white` utilities — the unlayered `plastic-*` rules win otherwise)
- The chrome's type is the ladder: `--text-label` / `--text-meta` /
  `--text-small` / `--text-body`. No other small size, in CSS or in a
  Tailwind arbitrary value.
- No text below 55% of the opposite colour. No text below 60% of the
  theme's foreground, because that colour has to clear both surfaces.
- The page is monochrome; the product keeps its colours inside its own
  picture
- The chrome carries no hue: no colour literal in a component rule, and
  none in a house file. The theme's own warm dark paper is the exception,
  and it is a theme, not a hue on the page
- Invoke `design-arsenal` + `impeccable` on UI passes

## The v1 pages — the rule gets teeth (2026-10-20)

The mount pass wrote a rule: *the page is monochrome, and the product keeps
its colours inside its own picture.* Nothing enforced it, and one thing
broke it.

The portfolio's status tag was green for "In Development" and amber for
"Roadmap" — `#0a5c36` and `#5c3d0a`, the only two colour literals in the
entire component layer. The shadcn floor underneath had already been
re-skinned to greys, so the tag was the one hand-written exception on the
page. And the state was already on the page twice over in words: the row's
tag column reads "AI INFRASTRUCTURE · IN DEVELOPMENT" and the chip beside
the description reads "IN DEVELOPMENT". The colour was ink that carried no
information.

The tag is now one treatment for every state: a hairline frame, the word,
and nothing else to read. The per-state modifiers are gone, and so is the
helper that chose between them — a chip that is the same for every state
does not need a tone.

Measured, on the rendered page with a row expanded: the chroma on
`/portfolio` fell from **3,907 pixels to 631**, and the 631 that are left
are the product's own picture — the blue and purple nodes in the Aitlas
artifact — which is exactly where the rule says a colour may live.
`/portfolio/aitlas` did not move, because all of its chroma was always the
artifact.

The rule now has a test. `tests/monochrome-chrome.test.ts` walks the
stylesheet's rules, skips the token blocks, and fails on any colour literal
whose channels are not equal; it does the same for the house's own files.
The theme's warm dark paper and the shadcn floor's own tokens are the
exemptions, and they are exemptions because they are *themes*, not hues on
the page.

References (with why):
- **Experimental Jetset** (house catalogue) — identity systems where colour
  is a system with a few members, each used with purpose. Why: the shadcn
  floor here was already re-skinned to greys, and the status tag was the one
  thing that had opted out of the system.
- **Vignelli's Unigrid** — a system is a set of decisions, not a set of
  exceptions. Why: two colour literals in a whole stylesheet is how a system
  stops being a system. The tag was the only thing left to decide.
- **Tufte's data-ink ratio** — ink that carries no information should not be
  printed. Why: the state was on the page twice over in words, so the
  colour was decoration by another name.

Craft move: **the tag is a tag.** A hairline frame and the word, in the
house's own vocabulary — the same frame, the same hairline weight and the
same corner radius the rest of the page's marks use. Nothing to decode.

Catalog pick: **no library.** A stylesheet rule, a deleted helper, and a
test. The measurement is the house's own: count the channels of the
rendered page and see what is left.

Rules:
- The chrome carries no hue. A colour literal in a component rule is a bug.
- The state is in the word, always. A tag never needs a colour to be read.
- A product's colour lives inside the artifact's own frame. The chips, the
  washes, the accents — all of them are the product's, and they stay
  inside the picture.
- The theme's warm dark paper is a theme, not a hue on the page. The screens
  still drop it, and the rest of the page keeps it.

## The v1 pages — one type ladder, and a legible smallest step (2026-10-20)

The chrome's small type carried ten sizes between 8px and 17px — 8, 9, 10,
10.4, 11, 12, 13, 14, 16 and 17 — most of them a pixel apart, and two of them
below the floor a label can be read at. The house measure tool named sixteen
runs of 9px on `/portfolio` alone. It is now four steps:

| step | size | the job |
|---|---|---|
| `--text-label` | 10px | the mono meta label — the house's smallest mark |
| `--text-meta` | 11px | small meta, links, CTAs, form fields |
| `--text-small` | 13px | the smallest step still read as text |
| `--text-body` | 15px | small body copy |

They live in one `@theme` block, so the `text-label` / `text-meta` /
`text-small` / `text-body` utilities reference the token rather than freezing
its value at build time. Every one of the 27 hardcoded small sizes in
`globals.css` and all 75 arbitrary Tailwind sizes in the v1 house files now
come from the ladder. Measured on the rendered pages: **the smallest chrome
type is 10px, and there is no sub-10px chrome text on any v1 page, at
1440×900 or 390×844.** The only text left below 10px is inside the product
artifacts — a mockup's own labels, which belong to the picture.

**The merge had to be taught.** tailwind-merge reads any `text-*` class it
does not recognise as a *colour*, so `text-meta` and `text-background` landed
in the same group and the earlier one was dropped: the size silently
disappeared from every element that also set a text colour, and the element
fell back to the browser's 16px. The contact form's submit button was one —
it said 16px where it said 11px. `src/lib/utils.ts` now extends the merge
with the four steps, and a test holds it there.

**The smallest step has to be legible.** The band that was left had run down
into the floor: the slide separators were at 30% of the foreground (2.12:1 on
white), the portfolio's feature tags at 45% (3.36:1), the footer's dim
labels at 40% of white on black (3.66:1), the hero's scroll marker at 50%
(3.98:1). All of them are now at 55–60% of the opposite colour, which clears
4.5:1 on a black ground and on a white one — the floors are written into the
tests, because a surface that inverts with the theme has to clear both.

The inverse ladder got the same treatment. The three inverse steps were 55%,
40% and 30% of the opposite colour, and the lower two failed AA on either
ground; they are now 65%, 60% and 55%, the same three steps the page's own
surface uses. The one thing allowed to go lower is the ghost numeral on
tic-tac-toe, and only because it says `aria-hidden` and repeats the heading
beside it.

References (with why):
- **Vignelli's Unigrid** — a system of very few steps, each with exactly one
  job, used without exception. Why: the ladder's four steps replace a dozen,
  and every one of them has a single job. A size that does two jobs is two
  sizes wearing one coat.
- **Jan Tschichold's "Die neue Typographie"** (1928) — hierarchy built from a
  scale rather than from decoration; the typographic architect sets the order
  of the page in type sizes before anything else is chosen. Why: the page's
  hierarchy is a ladder, and the sizes now say which thing outranks which.
- **WCAG 2.2 SC 1.4.3 and 1.4.11** — 4.5:1 for text, 3:1 for a meaningful
  graphic. Why: the smallest step is where the contract bites, and the
  floors are written down so the next pass does not have to rediscover them.

Craft move: **one mark, one weight.** The meta label is now a single pair —
10px at 62% of the foreground — and it is the same mark in the nav, on the
slides, in the portfolio's tags and in the footer. Before, the same label
appeared at four different sizes and four different opacities in four
different places, so the page's smallest type read as a set of near-misses
rather than as a register.

Catalog pick: **no library.** The ladder is four custom properties in the
stylesheet's own `@theme` block, and the utilities come from Tailwind's
existing `text-*` namespace. The one thing the pass had to reach for was
tailwind-merge's own configuration API — the merge had to be taught the four
steps, and that is the choice that made the difference.

Rules:
- The ladder is the only source of a small size. A size that is not on the
  ladder is a bug, in the stylesheet and in a Tailwind arbitrary value.
- The ladder is declared once, in `@theme`, so a utility and a rule can
  never disagree about what a step is.
- `cn()` has to know the four steps are sizes, not colours.
- No text below 55% of the opposite colour; no text below 60% of the
  theme's foreground.
- The shadcn floor in `src/components/ui/` and the `/v2` concept are their
  own contexts and are not on the ladder. The floor is the floor; `/v2` is
  a different design and will be cut over deliberately.

## The v1 pages — one neutral mount (2026-10-20)

The two screens are black and white. The ten product slides that follow the
hero were not: each one sat on its own pastel wash, and the result was a page
that read as three worlds — a black-and-white wave, ten coloured cards, and a
black-and-white body of water.

The washes carried a hue the studio's brand does not have. They ignored the
theme, they carried no information, and they were a per-project value, so
every product had to be re-tinted to keep the family feeling related. The rule
that replaces them is one line:

> **The page is monochrome; the product keeps its colours inside its own
> picture.**

The product's accent belongs to the product. It is the one thing on the page
that is allowed to be in colour, and it is allowed to be in colour because it
is inside the artifact — the amber table, the blue chart, the green node, the
purple MCP node. Outside that picture, the page is black, white, and the greys
between.

**The mount** is the sheet a product's picture is printed on. It is now one
token, `--mount`, defined once in `:root` at `oklch(0.92 0 0)` — a neutral
plate, painted at rgb(228, 228, 228) with zero chroma pixels in the margin
around every picture.

Three decisions sit behind that value:

- **It is not an alias of the grey scale.** The grey steps flip in the dark
  theme (`--grey-200` becomes a warm 0.18), so an alias would both invert the
  plate and give it the theme's hue. The plate sits on a black ground in both
  themes — measured: rgb(0, 0, 0) either side of the frame — so it must not
  move when the theme does. It is its own token for that reason.
- **It keeps the value the washes had.** The ten washes ran OKLCH lightness
  0.879 to 0.939, mean 0.918. 0.92 is the house's own `--grey-200` step, so
  the sheet is the lightness it already was and no product's picture changes
  contrast against it. The value was computed from the ten hexes, not chosen
  by eye.
- **It is a plate, not a card.** It has no radius, no shadow and no border.
  It is the paper, and the picture is printed on it.

**The marker** in the portfolio panel used to be a 3px chip in the project's
own colour. It is now a 1px line in the panel's own hairline vocabulary: an
inactive project paints at rgb(56, 56, 56), the project you are on at
rgb(231, 231, 231). It says where you are without spending a colour the
studio does not have.

References (with why):
- **Tufte's data-ink ratio** — ink that carries no information should not be
  printed. Why: the ten washes were decoration, and decoration is the one
  thing a monochrome page cannot afford. The rule that follows from it is
  where a colour may live: inside the picture, where it means something.
- **The press proof** — a proof pull on plain stock: the paper carries no
  colour of its own, the image carries all of it. Why: the mount is a sheet,
  not a card. One neutral plate for ten products, so the home reads as one
  printed artifact instead of a swatch book.
- **Experimental Jetset** (house catalogue) — identity systems where colour
  is a system with few members, each used with purpose. Why: this studio has
  no hue in its identity, so it does not invent one per product. The accent
  belongs to the product.

Craft move: **the marker joins the panel's hairline vocabulary.** The chip
was a second, louder pen in a panel that is otherwise drawn entirely in 1px
lines. Replacing it with a line of the same weight and the same family makes
"you are here" read as part of the drawing rather than as a badge bolted onto
it.

Catalog pick: **none needed.** The pass is a token and a stylesheet; the one
judgement in it — the plate's lightness — was settled by computing the ten
washes' OKLCH lightness and taking their mean, not by a tool's default.

Rules:
- The mount is `--mount` and only `--mount`. No per-project colour, no inline
  `backgroundColor` on a frame, no second plate.
- A product's colour lives inside its picture. If a colour appears outside
  the artifact's own frame, it is a bug.
- The plate does not invert with the theme, because it sits on a black ground
  in both themes.
- The marker is a hairline in the panel's vocabulary, not a colour chip.
- The plate is the paper: no radius, no shadow, no border, no gradient.

## Home hero + footer — a wave and a body of water (2026-10-20)

The landing hero and the closing footer carry two black-and-white screens,
and they are the same kind of thing: **a tone field, printed as marks.**

The hero prints a **wave** — a noise field, warped by a second noise field
and ridged, so the crests catch the light and the troughs stay dark. The
field is held to the top-right corner and falls away from it, so the page
keeps its composition (light in one corner, quiet everywhere else) while the
picture inside that light now moves.

The footer prints a **body of water** that sloshes. A body of water is not a
picture of water, it is a thing with mass, so the footer simulates one: a
PIC/FLIP particle fluid on the character's own lattice, and the ASCII picture
is the water itself rather than a caption of it. The surface of the water is
the picture — lit from above, fading with the depth beneath it, brightened
by the motion. The pointer stirs it.

| Panel | Screen | Lattice | Ink |
|---|---|---|---|
| hero | dots | 7 × 7 px | the hero's fixed white on black |
| footer | characters | the face's advance × 16 px | `--screen-ink` on `--screen-paper` |

Both screens obey one rule: **a mark's area is the share of its cell the
tone asks for**, and no mark on this page covers more than `INK_CEILING`
(0.2189) of its cell. The hero reaches that ceiling with a dot whose area is
graded to the tone; the footer reaches it with the heaviest character it is
allowed to print. Measured on the rendered page, the hero's darkest dot
covers 18.5% of its cell and the footer's heaviest character 20.3% — the
same weight of paper, two screen frequencies.

The other measure is hue. Counting the channels of the rendered page, the
hero is neutral to the bit (0 of 4.8M pixels carry a colour) and the
footer's panel is neutral too; the only channel difference left anywhere in
either screen is 1/255, which is the browser's own rounding on antialiased
edges. The dark theme's own paper is a warm off-white, and before the
screen tokens the footer printed it verbatim — a cream panel spread over
4.6M pixels, a difference of 5/255 that no eye would ever see and no
measurement would let pass.

The wordmark and the copy are untouched. Where the type meets the ink it
reverses out of it — the print idiom of type knocked out of a screened block.

References (with why):
- **newsprint halftone (45 lpi screen)** — a halftone is an ordered
  threshold with ink; printing the picture as marks makes the page read as a
  printed artifact rather than as an interface.
- **chafa / libcaca tone rendering** — the same continuous tone resolved on
  a coarse grid of characters, where the character carries the tone instead
  of a pixel.
- **Bencho Lab's ASCII wake** (vendored in `furma.bloxs-v2`) — the closest
  precedent for the coarse screen: a grid of numbers, and a number picks a
  character off a ramp, lightest to densest. That is the whole effect, and it
  is the model both screens here run on — a tone field, printed as marks.
  Its one idea that does not travel is the shimmer, where the live part of
  the field flickers between neighbouring characters the way a terminal
  redraws. Here the field is printed, not redrawn, so the ordered threshold
  is the point: a random mix would turn the depth ramp into noise.
- **Radium Coders' Evil Buttons `DitherButton`** (vendored in
  `furma.bloxs-v2`, Apache-2.0) — a proven canvas dither on a 4px grid; the
  fine screen inherits house craft instead of a tutorial.
- **React Bits Pro `Dither Wave` and `Liquid Ascii`** — the briefs for the
  two screens. The components in `src/components/dither-wave-tw.tsx` and
  `src/components/liquid-ascii-tw.tsx` carry their prop API verbatim, so the
  licensed files can replace them without the call site changing. The
  registry is configured in `components.json`; the key is a credential and
  never enters the tree (`launchctl setenv REACTBITS_LICENSE_KEY <key>`,
  then `npx shadcn@latest add @reactbits-starter/dither-wave-tw`).

Craft move: **each screen measures its own marks.** A rasterised dot does
not cover quite the area its radius asks for, and a canvas rasterises a
glyph about a third heavier than the DOM does — so the fine screen draws
each radius on a cell-sized canvas, reads it back and corrects it, and the
coarse screen measures its ladder of characters the same way. The ceiling is
shared; the measurement is local, because the medium that prints a mark is
the only thing that can say what it prints.

Rules:
- One model, two screens: hero = dots, footer = characters. No variant
  switch, no second design.
- No chroma, no gradient fills, no shadow depth.
- Reduced motion gets one still frame: the wave at rest, the water caught
  mid-slosh. Nothing may put either screen back in motion.
- The artwork is decorative — a real `<h1>` carries the name for assistive
  technology.
- The screens print in `--screen-paper` and `--screen-ink`, not in
  `--foreground` and `--background`. The page's tokens may carry a hue — the
  dark theme's paper is a warm off-white — and a screen that prints a token
  verbatim prints that hue with it, so a cream panel got into a black-and-
  white footer. The screen tokens keep the token's lightness and drop its
  hue, and a browser without relative colour syntax falls back to the token
  itself.
- The footer's canvas prints its panel in `--screen-paper` and its marks in
  `--screen-ink`, so the panel still inverts with the theme: the dark footer
  is a light sheet with dark type. The hero is painted black outright and
  keeps fixed white.
- A screen that is off the page stops: neither of them runs a loop the
  reader cannot see.

## Home hero + footer — one halftone plate, two screens (2026-10-19, superseded)

The landing hero and the closing footer carried one black-and-white
treatment: a single continuous-tone picture — a disc of light in the
top-right corner — printed twice, on a coarse screen of characters in the
hero and a fine screen of dots in the footer. The two screens were
calibrated by cell coverage, and the calibration was measured at both ends.

That treatment is superseded by the two screens above, which keep its
calibration and its knock-out, and give each panel a subject that moves.
The wordmark, the copy, the tokens and the reserve model are unchanged.
