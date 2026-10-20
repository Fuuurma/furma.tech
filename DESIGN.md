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
- Invoke `design-arsenal` + `impeccable` on UI passes

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
