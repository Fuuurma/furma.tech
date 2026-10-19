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
corner — is resolved by an ordered Bayer threshold twice: once through a
coarse screen of characters in the hero, once through a fine screen of dots in
the footer.

A printed sheet has always carried two screens for one image — a coarse one
for the picture, a fine one for the type beside it. That is the whole idea:
the hero and the footer are the same plate, printed at two frequencies.

| Panel | Screen | Cell | Matrix |
|---|---|---|---|
| hero | characters | 9 × 12 px | Bayer 4×4 |
| footer | dots | 4 × 4 px | Bayer 8×8 |

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
  `furma.bloxs-v2`, Apache-2.0) — a proven ordered-Bayer canvas dither on a
  4px grid; the fine screen inherits house craft instead of a tutorial.

Craft move: the two screens are calibrated by **cell coverage**, not by
look. The ASCII ramp states how much of its cell each glyph inks, and the
dot screen inks a cell when the tone passes that cell's threshold, so both
screens carry the same share of ink for the same tone.

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
