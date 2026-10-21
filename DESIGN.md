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
- The hero carries no scroll cue — no label, no rule. The wave is the cue.
- Full-bleed plates (hero, footer, case-study band) are painted black outright,
  never with the theme's foreground: the dark theme must not make one white
- The footer is one plate: a sky behind the type, a sun, and a sea at the foot
  that the reader can put a hand in. The type thins the ink around itself; it
  does not cut a hole in it
- The screens answer the hand — hover, drag, hold, release — and everything
  the hand writes is printed through the same ordered threshold and ink
  ceiling as the picture: printed, never glowed. Reduced motion has no hand
  at all.
- The water keeps its volume. A body of water that drains is a puddle
- The footer is the site's, not a page's: one component, one plate. The home
  closes on it; the pages in the flow carry it
- The index is the width of the screen: the rules that separate the work run
  edge to edge, and the work stays stacked top to bottom
- The shot fills its mount. A picture shown as a thumbnail inside a frame is
  a caption with a picture attached
- Invoke `design-arsenal` + `impeccable` on UI passes

## Softer screens — a plate for a footer, and no black boxes (2026-10-21)

The owner's second look at the landed pass: *the effect is an improvement; the
footer is not*; *there is a big, visible black box behind the text — good for
readability, bad UI/UX, maybe a mix*; and *on the portfolio page use only the
effect: cut the text, cut the height by half, so the list is clear and
scrollable*. Also: the studio is a **digital studio**, not a digital venture
studio.

**1. The type thins the ink; it does not cut a hole in it.** `screenReserve`
cleared a rectangle to zero and eased back over 36px, and a clean rectangle
reads as a black box — the eye caught the box, not the words. The ink now
falls to a floor (`RESERVE_FLOOR`, 14%) behind the words and eases back over a
72px margin on a smoother-than-smoothstep curve. The picture stays one picture
with a faint stipple showing through the type's ground, and the halo is round
(distance is Euclidean). `tests/screen-reserve.test.ts` holds it: some ink
remains behind the words, nothing changes far from them, the return has no
step larger than 5% a pixel, and a corner is thinned exactly as a side is.

**2. The footer is one plate.** The old footer was a type block with a band of
characters stuck on its foot. It is now a single picture: the whole panel is
printed in characters, with a **sky** behind the type, a **sun** low on the
right (a dome of the heaviest marks, with a halo and a haze along the
horizon), and the **sea** in a zone at the foot, where the colophon is set. The
sun's path on the water breaks up on the waves. The type is set in the sky
and thins the ink around itself. The hand writes in the sky with ink, and
moves the water only when it is at the sea. Forms thrown by a release are half
the hero's size, so they open without crossing the words. `LiquidAscii` gains
three house props: `zoneRef` (the sea's box), `sun`, and `ink`.

**By day a sunset, by night a moon.** The plate is black in both themes, but
what hangs in its sky follows the theme: the sun in the light theme, and in the
dark theme a waxing moon with a scatter of single-dot stars and a narrower,
fainter path on the water. The sky is printed again when the theme changes, and
the water is not reset by it.

The sun is generated, not a photograph: no image library was found on this
machine (`~/Projects/images` does not exist), and generating one costs
quota. The plate takes any tone field, so a photograph or a plate made for
the footer can replace the sun and sea later without changing the footer.

**3. The portfolio page opens on the effect and nothing else.** The hero keeps
the tide and loses its words and half its height (`min(40svh, 380px)`). The
page's name survives as an `sr-only` heading inside it. The list starts calm:
every row is collapsed and at rest, and nothing opens until the reader hovers,
focuses or clicks it.

**4. "Venture" is gone.** The studio is a *digital studio*: the hero, the page
titles, the footer's statement, every description and keyword, the privacy
policy, the share image, the README and the agent notes all say so. The one
"venture" left is "venture capital" in the v2 concept's "0% VC" stat, which is
the ethos and not the descriptor.

**5. The bookends are black in both themes.** The footer and the case-study
call-to-action band were painted with the theme's foreground, so the dark
theme turned each into a white sheet on a dark page — and the band's link,
fixed white, vanished on it. Both are painted black outright now, like the
hero. Small inverse callouts (a privacy-policy box, the contact form's button)
still invert with the theme; they are emphasis, not a plate. The screens'
paper and ink are literal black and white, so no theme reaches them.

**6. Small screens.** Checked at 320×568, 360×740, 390×844, 430×932, 768×1024
and 844×390 landscape, on all seventeen pages. The first pass compared the page
to the width the phone emulator had already widened it to, and reported no
overflow while the page was 414px wide on a 390px phone. Corrected, it found two
real defects, both fixed:

- The header's three cells (brand, portfolio menu, views) need 414px at their
  desk padding, so the theme button fell off the screen's edge. Below 430px
  the cells give back their padding; below 360px the menu keeps only its
  arrow, with `aria-label="Portfolio"` so it still has a name.
- Seven pages carried a `grid-cols-12 gap-8`: eleven gaps are 352px before a
  column is laid, so the grid stayed 352px wide on a 320px phone and dragged
  the page sideways — the portfolio's closing section, every case study's
  call to action, the privacy policy, the 404. The gap now starts at `md:`.
  `tests/phone-grids.test.ts` holds it, and fails on the old source.

On a short screen (under 700px tall) the footer compacts: the description and
the two section labels go, the gaps tighten, the sea shrinks to 88px, and a
wide short screen sets the two columns side by side. A horizontal swipe in the
band draws; a vertical swipe scrolls the page.

**7. A touch screen has no cursor to invite the hand.** The hero and the
portfolio band throw one small form, once, about a second and a half after they
are first seen, on a device with no hover. Under reduced motion they throw
nothing, and a hand that has already arrived cancels it.

**8. Cost.** Profiled under a drag, the home hero spent 48% of its time idle,
29% in the browser's own rasterising, and its largest piece of our own code was
the type's halo, worked out for every cell on every frame. It is now worked out
into a map when the type is read (every sixth frame) and looked up per cell; the
wave is only sampled where a lobe has light; and a screen nobody is touching
prints at 30 frames a second, 60 when a hand is on it. At 4× CPU throttle the
home hero's idle frame went from 55ms to 28ms and a drag's long tasks from 171
to 8.

**9. A shared link has a picture.** The share metadata named no image, the
helper pointed at a file that did not exist, and the only image on disk was an
SVG, which social platforms do not render: every shared link was a bare title.
`public/og.png` is a 1200×630 PNG rendered from the real hero — the wordmark,
the line under it, the two lobes in dither — with the controls taken off, so
the card is the page and not a screenshot of it. The root layout names it for
Open Graph and Twitter (with a `metadataBase`), and `tests/share-image.test.ts`
holds the format, the size and the wiring. Re-render it from the hero if the
hero's look changes.

References (with why):
- **Printed halftone, the dot-gain edge** — a screened tone fades; it does not
  stop. Why: the black box was a tone that stopped.
- **ASCII-art sunsets (the BBS tradition)** — a sun is a disc of the heaviest
  characters and everything else is gradation. Why: it is the one picture the
  character set draws well, and it is what a footer in characters should hold.
- **The studio's own location** — a studio in Sitges, on the Mediterranean,
  closes its page on a dawn over the sea.

Craft move: **the plate is the footer.** The picture is not under the content
or beside it; the content is set in the picture's quiet part, and the picture
makes room for it by thinning, not by clearing.

Catalog pick: **no library.** The sky is thirty lines on the existing
character lattice, and the water is the house's shallow-water solver.

Rules:
- Type thins the ink; it never clears a rectangle. A new screen uses
  `screenReserve`, and its tests assert a floor above zero.
- The footer's picture is printed across the whole plate; the water stands in
  its own zone, and the sea's reach is the zone's, not the panel's.
- A hand in the sky writes in the sky; only a hand at the sea moves the water.
- The portfolio page's head is the effect alone. Words there are `sr-only`.

## The hand — the screens answer the reader (2026-10-21)

The brief: the hero is good; let the reader interact with the ASCII and the
dither — hover, click, drag — more fluid, even abstract forms. "The two
initial lobes are nice, but the user can modify them with actions." Same for
the footer, a hero on the portfolio page, and the same idea on other sections.

**1. One hand, two screens.** `src/lib/ink-field.ts` is the field the reader
writes into: a coarse grid of ink, a flow that carries it, and a push that
leans the picture. It is a tone field like the wave and the water, so the
hero's dots and the footer's characters print it through the same ordered
threshold and ink ceiling. It has no DOM and no randomness; the same hand on
the same screen prints the same thing.

| Gesture | The screen |
|---|---|
| hover | a faint wake that fades in under a second; the picture leans |
| drag | a stroke that is carried by the hand's own motion and lingers ~2 s |
| hold | a metaball with three satellites swells under the hand |
| release | a form — ring, square, diamond, plus, lens, triangle — opens from the hand, echoed inside itself, and fades. A click is a hold of no length: a small form |

The repertoire cycles with every throw, so the screen has six forms and no
dice. A drag throws none: the ink it laid is its mark.

**2. The lobes are things you can take.** `src/lib/lobes.ts`. A hover leans a
lobe toward the hand and a drag that starts inside one takes it; the lobe
follows the hand, swells, and on release swings back past its corner on an
underdamped spring and settles inside six seconds. A strike near a lobe
knocks it away. A press that has not moved is a click and does not take a
lobe. The bottom-left lobe still prints the top-right lobe's field, mirrored:
one plate, printed twice.

**3. The footer's water gathers.** A held hand lifts the water into a mound
under it, deeper the longer it rests, and the release lets it go as a wave.
The hand's ink is printed over the water in characters. The band is taller
(30% of the panel, 190–360px; 240–320px in a page's flow) because a form
needs room to open. Volume drift stays inside the 0.2% the water is held to.

**4. The portfolio page has a hero again.** *(Revised the same day: see "Softer
screens" above — the hero keeps the tide and loses its words.)* The previous pass removed the
intro and left an `sr-only` heading; the owner asked for a hero. It is the
home's black plate with a *tide* — light that rises from the foot of the
panel, its crest a slow swell of two waves — and a visible `<h1>`, set large.
The type sits in the top half and the tide owns the bottom half: the hand
needs open ground, and a headline set over the tide would knock the light out
around itself. The page now begins in a wave and ends in water.

**5. Other sections.** `DitherWave` has three compositions: `corners` (the
home), `horizon` (the portfolio's tide) and `field`, a quiet ground at low
gain where only the wave's crests carry ink. The home's portfolio-index slide
uses `field`, printed in the page's own paper and ink so it follows the theme.

References (with why):
- **Bencho Lab's ASCII wake** — the characters are the water, so a hand in the
  water is a hand in the characters. The footer's ink is characters.
- **Pavel Dobryakov's WebGL fluid** — the hand's motion carries the ink. A
  drag swirls rather than smears because the flow is the hand's own velocity.
- **Lucas Pope's ordered dither (*Return of the Obra Dinn*)** — the threshold
  stays fixed while the tone moves, so interaction reads as print, not glow.

Craft move: **the hand leaves a mark, and the mark ages.** Every gesture
deposits into a field that decays, and every field is printed through the
house screen. Nothing the reader does introduces a second visual language.

Catalog pick: **no library.** The engine is ~800 lines of house code, and the
licensed Liquid ASCII / Dither Wave prop APIs are unchanged: `interactive`,
`composition` and `ink` are house additions.

Rules:
- The hand's ink goes through `screenReserve`: it keeps off the type like the
  wave does. A press that starts on a link or a button belongs to the link.
- A press suppresses text selection for its length, so a drag draws and does
  not select the words it passes over. Touch scrolls vertically and draws
  horizontally (`touch-action: pan-y`).
- Reduced motion binds no pointer and runs no field: the screens are the
  still frame they already were.
- `cursor: crosshair` is the only invitation. The hero carries no label.

Smoke (Playwright, 1440×900 and 390×844 touch, light and dark; `/` and
`/portfolio`): no console errors on any of the eight; 0 chroma pixels on the
first screen of each; the page does not scroll sideways at 1440; a drag
changes ~53,000 px on the home hero and ~33,000 px on the portfolio tide; the
wheel still scrolls the page over the portfolio hero; the home's "See
projects" still navigates; under `prefers-reduced-motion` the screens are
identical 900 ms apart and a drag plus a click change nothing; the rAF
interval under a drag is p50 13 ms / p95 26 ms in software-rendered headless
Chromium. 66/66 tests (ink field 8, lobes 12, water 8), typecheck clean,
lint clean, build clean.

## The index is the width of the screen (2026-10-20)

The brief: put the site's footer on the portfolio page; make the section of
the ten projects full page width; delete the intro block; and give a hovered
project more room for its work to show.

**1. The footer is the site's, not the home's.** The plate the home closes
on — the studio statement, the connect block, the project index, the
colophon, and the body of water at the foot — is now one component
(`StudioWaterFooter`) that closes whichever page ends in water. It has two
shapes and one content: `panel`, the home's full-height closing section, and
`section`, the same plate set in a page's own flow. The portfolio page takes
the section. The alternative was a second copy of the plate, which would have
drifted from the first on the first change to either.

**2. The index is the width of the screen, and the work stays stacked top to
bottom.** The lines that separate the ten projects were the width of a
1280px column, so the rules stopped short of the screen and the list read as
a panel floating in the page. The rules are now the page's own: they run edge
to edge, and the rows keep the page's margin inside them. The order is
untouched — the ten projects still read top to bottom, which is the order
the work wants and the one the eye already knows.

**3. The page has no headline.** *(Superseded 2026-10-21 by "The hand" above: the
index now opens on a hero with a visible `<h1>`.)* The intro block ("Portfolio / Index 00 / 10
products / Bootstrapped from Sitges…") is gone. It was a caption for the
list, and the list is the page. The heading survives as `sr-only`, so the
page still names itself to a reader who arrives by search or by a link, and
the chrome's "Index" label carries the visible identity.

**4. The shot fills its mount.** The row opened on a thumbnail in a frame:
the mount was cut to 16/10 and the picture was capped at 200px inside it, so
the work was shown small inside a shape that was mostly mount. The mount is
now cut to the field the heroes are actually drawn on — **520 × 340** — and
takes the column's width, so the picture fills it edge to edge.

| | before | after |
|---|---|---|
| the separator rules | 1280px, inset 80px each side | 1440px, edge to edge |
| the opened row's mount | 450px wide, 16/10 | 605px wide, 520:340 |
| the shot itself | ≈400 × 200 | 542 × 354 (2.4× the area) |
| the page's head | an intro block | the work |

References (with why):
- **Vignelli's Unigrid for the National Park Service (1977)** — the grid's
  rules are the page's structure, not the column's decoration. The
  separators here are the page's rules, so they belong to the page's width.
- **The printed catalogue raisonné** — a list of works where each entry is
  a rule-separated line, and the plate opens beside the entry that is being
  read. The row's own line is the index; the picture is the work.
- **The photographic contact sheet** — the index of a shoot is made of
  pictures, not of captions. A project is worth a frame of its own, and the
  frame's size is the project's size, not the index's.

Craft move: **the shot is the reason the row opens, so the shot fills the
mount.** The old mount was a 16/10 box with the picture capped inside it —
a thumbnail in a frame, which is the same mistake as the hero's copy under
the wave: the frame is a shape, and the work is what is in it. The mount is
now cut to the field the heroes are drawn on and the picture fills it.

Catalog pick: **no library.** The list and the footer are house code: the
water is the house's shallow-water solver under the house's ink ceiling, and
the mount's ratio is the heroes' own drawing field. The licensed React Bits
Pro water can replace the water at the call site unchanged — the prop API is
theirs — but the house additions (`surfaceRef`, `maxFPS`, `pauseWhenOffscreen`,
`cell`, `idleCue`, `damping`) and the solver underneath are the house's and
would have to be carried over.

Smoke (Playwright, 1440×900 and 390×844):
- the rules measure the full width of the screen at both widths;
- the opened row's shot measures 542 × 354 inside a 605px mount, against
  ≈400 × 200 before;
- the order of the ten projects is unchanged, top to bottom;
- the portfolio page ends in the water: `footer[role=contentinfo]` with a
  live canvas, and no intro block in the document;
- 44/44 tests, typecheck clean, lint clean (one pre-existing warning),
  build clean, the black-box smoke gate green against the production server.

## Home hero + footer — the wave crosses, and the water answers (2026-10-20)

The brief: the hero is good and can be better; the footer is horrible and its
water "disappears the design"; keep the water, and let the reader put a hand
in it.

**1. The hero carries no scroll cue.** No label, no rule, no pulse. A label
is a sentence about the page, and the page does not need to be told what it
is. The wave says it instead: after five seconds of an idle reader a swell
crosses the panel from the top right to the bottom left, the ink deepening as
it passes and a faint band of it showing in the quiet middle. The cue is the
one thing the reader is already looking at, so nothing is added to the page to
point at the page.

**2. One plate, printed twice.** The wave was held to the top-right corner.
It is now held to two opposite corners — the top right and the bottom left —
and the bottom-left lobe prints the same field *mirrored*. Measured at
1440×900: the two corners carry the same ink, 13.8% and 13.7% of their
pixels lit. The page's composition is light at the ends of the diagonal and
quiet through the middle, and the copy that used to sit in the bottom left is
gone, so the wave fills the space the words were in rather than arguing with
them.

**3. The footer's water has a band of its own.** *(Superseded 2026-10-21 by "Softer
screens": the whole footer is the plate now.)* The water used to be printed
behind the whole footer, and the type was reversed out of it — so the type sat
on a screen and the screen read as a foreign object pasted over the page.
Now the type is set on clean paper and the water has a band at the foot of the
page: **the page ends in a body of water.** The band is the only place on the
page that is a screen, which is what makes it read as a print rather than as
noise.

**4. The water is a body of water, and it answers the reader.** The particle
fluid that was there lost **94% of its volume in five seconds** and collapsed
into a sliver on the floor: the water in the picture was not the water in the
simulation, and the footer read as a smear. The house solver is now a row of
columns of shallow water — one column per character — and the rule it keeps is
that the body keeps its volume. Measured: **0.00% drift** across resting,
pressing, dragging and striking.

- a pointer held over the water presses the surface down under it, and the
  water closes over the hollow;
- a pointer dragged through the water pulls it along, and the wake keeps
  sloshing after the hand is lifted;
- a click strikes it, and the strike throws a crown that the wave then carries
  away across the panel.

| Panel | Screen | Lattice | Ink |
|---|---|---|---|
| hero | dots | 7 × 7 px | the hero's fixed white on black |
| footer | characters | the face's advance × 16 px | `--screen-ink` on `--screen-paper` |

Both screens obey one rule: **a mark's area is the share of its cell the
tone asks for**, and no mark covers more than `INK_CEILING` (0.2189) of its
cell. The footer's tone is read from the water's own level rather than from
the row the mark sits in, so the body fades smoothly instead of in bands, and
the deep water prints as a stipple rather than a wall of characters.

References (with why):
- **Bencho Lab's ASCII wake** — a body of water drawn in characters is not a
  picture of water; the characters *are* the water. The footer's columns are
  the characters' own cells, so the waterline is quantised to the type.
- **Tufte's data-ink ratio** — the water carries the page's picture, so it
  has to earn its ink. The deep water is a stipple at the ink ceiling, not a
  field of glyphs, and the type around it keeps clean paper.
- **chafa / libcaca tone rendering** — tone is a *share of the cell*, and a
  screen is a lattice plus a rule. The hero grades a dot's area; the footer
  grades a character's coverage. Same weight of paper, two frequencies.

Craft move: **the swell is the scroll cue.** The hero had a rule with a word
on it, and the rule was a foreign object on a page whose whole idea is that
a wave is drawn on a screen. The swell replaces it: the same wave, sent
across the diagonal on its own, so the reader learns the page continues by
watching the picture continue.

Catalog pick: **no library.** The two screens are house code because the
house's ink ceiling, its reserve knock-out and its token-driven palette are
the contract, and a component that draws its own halftone cannot be held to
them. The licensed React Bits Pro files can replace both components at the
call site unchanged — the prop API is theirs — but the house additions
(`surfaceRef`, `maxFPS`, `pauseWhenOffscreen`, `cell`, `idleCue`) and the
solver underneath are the house's, and a licensed install would need them
carried over.

Smoke (Playwright, 1440×900 and 390×844, light and dark):
- the hero's two corners measure the same ink (13.8% / 13.7%);
- the hero's ink moves from 3.9% to 6.1% and back as the swell crosses, and
  does not move at all under `prefers-reduced-motion`;
- the footer's band answers a hover (the surface dips), a drag (a wake is
  pulled across the panel) and a click (a crown is thrown, at the struck
  column, within 260 ms);
- the footer's type is set on clean paper: no ink is printed behind it;
- 43/43 tests, typecheck clean, lint clean, build clean.

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

## Home hero + footer — a wave and a body of water (2026-10-20, superseded)

Superseded by "the wave crosses, and the water answers" above, which keeps
this section's print idiom — one model, two screens, one ink ceiling — and
replaces its single corner with the diagonal, its particle fluid with a body
of water that keeps its volume, and its pointer that stirs with a hand that
presses, pulls and strikes.

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
