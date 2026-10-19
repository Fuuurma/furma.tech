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

## Home hero + footer — one halftone plate, two screens (2026-10-19)

The landing hero and the closing footer carry **one** black-and-white
treatment. A single continuous-tone picture — a disc of light in the top-right
corner — is printed twice, on two screens of different fineness: a coarse
screen of characters in the hero, a fine screen of dots in the footer.

A printed sheet has always carried two screens for one image — a coarse one
for the picture, a fine one for the type beside it. That is the whole idea:
the hero and the footer are the same plate, printed at two frequencies.

Both screens work the same way: **every cell of the picture carries a mark,
and the mark is sized by the tone under it.** The coarse screen's mark is a
character off a density ladder; the fine screen's mark is a round dot whose
*area* is the share of its cell the tone asks for.

| Panel | Screen | Cell | Ceiling |
|---|---|---|---|
| hero | characters | 9 × 12 px | `PLATE_PEAK` = 0.2189 |
| footer | dots | 6 × 6 px | `PLATE_PEAK` = 0.2189 |

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

Craft move: the two screens are calibrated by **cell coverage**, not by
look, and the calibration is measured at both ends.

- The character screen's density ladder is measured from the **rendered
  page** — the browser's own text, in the face and cell the design ships
  with. It cannot be measured in a canvas: a canvas rasterises the same
  glyph about a third heavier than the DOM does (`@` reads 0.30 in a canvas
  where the page prints 0.22), and a ladder built from a canvas makes the
  two screens disagree by exactly that much. The measured table lives in
  `ASCII_COVERAGE`, and the shared ceiling `PLATE_PEAK` is derived from its
  top step rather than being a number of its own.
- The fine screen measures **its own radii**: a rasterised dot does not
  cover quite the area its radius asks for, so each radius is drawn on a
  cell-sized canvas, read back, and corrected until the ink it lays down is
  the share the tone asked for.

The same tone therefore inks the same share of a cell in each panel, which
is what makes the hero's characters and the footer's dots read as one style
rather than two textures. Measured on the shipped page: over the same area
of the same picture the two panels differ by 1–2% of light share.

Rules:
- One plate, one style: hero = characters, footer = dots. No variant switch.
- No chroma, no gradient fills, no shadow depth.
- The plate is painted once per resize and never animated, so reduced motion
  changes nothing about it.
- The artwork is decorative — a real `<h1>` carries the name for assistive
  technology.
- The footer's surface is painted with `--foreground`, so its type follows
  `--background` and the whole panel inverts with the theme. The hero is
  painted black outright and keeps fixed white.
