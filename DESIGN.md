---
name: Danke Hidayat — Botanical Folio
description: Plate-cream herbarium portfolio; hairline sepia rules, leaf-green ink, lilac bloom heat, Bodoni Moda display, arched specimen plates.
colors:
  bg: "#f6f1e6"
  surface: "#fbf8ef"
  surface-tint: "#efe8d8"
  border: "#d9cdb5"
  border-strong: "#c2b294"
  ink: "#2c2a24"
  ink-body: "#4a4a4a"
  ink-muted: "#6b6456"
  green: "#2e5e3d"
  green-deep: "#23492f"
  green-bright: "#4e8260"
  sage: "#7fa37a"
  lilac: "#7b5c9e"
  lilac-deep: "#64497f"
  lilac-bright: "#a98bc6"
  lilac-field: "#efe7f5"
  ink-on-green: "#f6f1e6"
  ink-on-green-muted: "#cfe3d5"
  ink-on-heat: "#fbf7ee"
  ink-on-heat-muted: "#e8ddf3"
  code-bg: "#efe8d8"
  success: "#4e8260"
  warning: "#a4791c"
  error: "#a33c2b"
  dark-bg: "#17150f"
  dark-surface: "#1e1b14"
  dark-surface-tint: "#262219"
  dark-border: "#3a3527"
  dark-border-strong: "#544d3b"
  dark-ink: "#efe8d6"
  dark-ink-body: "#c7c0ae"
  dark-ink-muted: "#97907d"
  dark-green: "#8fbe9c"
  dark-green-deep: "#a7cdb1"
  dark-green-bright: "#7fb08d"
  dark-sage: "#86a881"
  dark-lilac: "#b69bd6"
  dark-lilac-deep: "#c9b2e2"
  dark-lilac-bright: "#cdb6e6"
  dark-lilac-field: "#2a2335"
  dark-ink-on-green: "#17150f"
  dark-ink-on-green-muted: "#2c3a2f"
  dark-ink-on-heat: "#17121f"
  dark-ink-on-heat-muted: "#241c31"
  dark-code-bg: "#242017"
  dark-success: "#8fbe9c"
  dark-warning: "#d3a94a"
  dark-error: "#d98a76"
typography:
  display:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni Moda', 'Didot', Georgia, serif"
    fontSize: "clamp(3.1rem, 8.5vw, 6.4rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "0.005em"
  headline:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni Moda', 'Didot', Georgia, serif"
    fontSize: "clamp(2rem, 4.6vw, 3.3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni Moda', 'Didot', Georgia, serif"
    fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.16
  body:
    fontFamily: "'Newsreader Variable', 'Newsreader', Georgia, 'Times New Roman', serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
  mono:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "6px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  shell: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.lilac}"
    textColor: "{colors.ink-on-heat}"
    typography:
      fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, sans-serif"
      fontSize: "0.82rem"
      fontWeight: 600
      lineHeight: 1.2
      letterSpacing: "0.14em"
    rounded: "{rounded.sm}"
    padding: "0.78rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.lilac-deep}"
    textColor: "{colors.ink-on-heat}"
    typography:
      fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, sans-serif"
      fontSize: "0.82rem"
      fontWeight: 600
      lineHeight: 1.2
      letterSpacing: "0.14em"
    rounded: "{rounded.sm}"
    padding: "0.78rem 1.5rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography:
      fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, sans-serif"
      fontSize: "0.82rem"
      fontWeight: 600
      lineHeight: 1.2
      letterSpacing: "0.14em"
    rounded: "{rounded.sm}"
    padding: "0.78rem 1.5rem"
  tag-chip:
    backgroundColor: "{colors.surface-tint}"
    textColor: "{colors.ink-body}"
    typography:
      fontFamily: "'JetBrains Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"
      fontSize: "0.72rem"
      fontWeight: 500
      lineHeight: 1.5
    rounded: "{rounded.xs}"
    padding: "0.2rem 0.6rem"
---

# Design System: Danke Hidayat — Botanical Folio

## Overview

**Creative North Star: "The Botanical Folio"**

A portfolio set as a herbarium: plate-cream paper (`#f6f1e6`), hairline sepia rules (`#d9cdb5`), leaf-green ink (`#2e5e3d`), and lilac bloom (`#7b5c9e`) as the only heat — the owner pin that retunes the folio scarlet. Every work is a numbered specimen plate at fixed scale, arched like a pressed flower under glass. Display type is Bodoni Moda (Didone engraving); reading is Newsreader; labels are Source Sans 3 small-caps; data is JetBrains Mono.

Density is editorial and airy: chapters breathe with `clamp(4rem, 9vw, 7rem)` vertical rhythm, separation comes from 1px hairlines and double rules rather than cards or shadows. Light-first with a real dark token set (night herbarium); the theme toggle is icon-only and its choice survives every client-side navigation. Motion is one authored moment per region under GSAP + Lenis, gated on `prefers-reduced-motion`, then stillness. On multi-chapter pages (≥3 chapters) Lenis eases to the nearest chapter top after a short pause — never mid-scroll, never on single-section record pages; the snap offset matches the anchor-scroll offset so clicks and snaps agree. Navigation is **Leafing**: shared-element View Transitions pair each plate's framed picture (`plate-<id>`) across home → folio index → record → adjacent record, and each florilegium cover (`cover-<id>`) across fan/wall card → record → prev/next thumb; a hairline route sweep draws under the running head after every soft swap. Morphs and sweep are instant/absent under `prefers-reduced-motion`.

The freshly-cut specimen carries one more authored moment: a pointer-driven 3D tilt with a tracking glare, resolved across three transform owners so no two systems ever touch one element (see *Signature: Perspective Plate*). Craft is also spent where nobody sees it — the motion bundle is deferred off the critical path, every image is delivered through a width ladder sized to the box it renders in, and a seven-spec Playwright suite holds the whole system to its invariants.

The world refuses the dark SaaS card grid, the résumé-timeline default, gradient text, hard offset shadows, and system display faces. Folio flavor (plate numbers, captions, marquees, stage labels) stays decorative; navigation vocabulary stays functional.

**Key Characteristics:**
- Plate-cream ground with sepia hairline rules; registration-ring depth, not drop shadows
- Arched double-rule specimen plates with botanical imagery and italic species names
- Lilac as the single heat — buttons, active states, contact bloom; green leads ink and focus
- Bodoni Moda display / Newsreader body / Source Sans 3 labels / JetBrains Mono data
- Saglitz-intensity GSAP motion (scrub, staggers, velocity marquees, pointer tilt), reduced-motion gated
- A full night-herbarium dark set and a real icon grammar, both verified rather than assumed

## Colors

A cream herbarium palette: green ink leads, lilac blooms as the only heat, sepia hairlines structure the page. Every token above is the light set; the `dark-*` slugs are the night herbarium applied through `data-theme`.

### Primary
- **Leaf Green** (`#2e5e3d`): Primary ink for chapter titles’ emphasis, focus rings, active nav, links that need weight. Deep (`#23492f`) for hover; bright (`#4e8260`) for success and lighter accents.
- **Lilac Bloom** (`#7b5c9e`): The only heat — primary buttons, plate hover, contact field, selection wash. Deep (`#64497f`) hover; bright (`#a98bc6`) dark-mode accent; field (`#efe7f5`) soft washes.

### Secondary
- **Sage** (`#7fa37a`): Quiet botanical secondary — florets, secondary-button marks, stage labels, spore field. Never a CTA fill.

### Neutral
- **Plate Cream** (`#f6f1e6`): Page ground.
- **Raised Cream** (`#fbf8ef`): Surface / plate slots / nav sheet.
- **Tinted Cream** (`#efe8d8`): Colophon, chips, code — tonal layering instead of shadow.
- **Sepia Rule** (`#d9cdb5`): Hairline borders and dividers; strong (`#c2b294`) for emphasis rules.
- **Graphite Ink** (`#2c2a24`): Headings and primary text; body (`#4a4a4a`); muted (`#6b6456`).

### On-Heat Ink
- **On-Heat Cream** (`#fbf7ee`, token `--color-ink-on-tangerine`): Text and marks sitting *on* the lilac heat — primary button labels, the filled favorite heart, the fan-stage counter. Muted variant (`#e8ddf3`) for secondary marks on the same fill; dark-mode pair is near-ink (`#17121f` / `#241c31`) because the heat inverts lighter than the ground.
- **Naming debt, deliberately kept:** the CSS variable still carries its Warm Signal name (`tangerine`) while its value is the on-lilac cream. The same applies to `--color-ink-on-tangerine-muted`. Read them as *on-heat*; do not reintroduce a tangerine hue, and do not rename the variables as a drive-by — a rename is a code change with its own regression surface.

### Retired Aliases
- `--color-tangerine`, `--color-tangerine-deep`, `--color-tangerine-field`, and `--color-saffron` survive in `global.css` remapped onto lilac and sage. **Nothing consumes them.** They are dead Warm Signal vocabulary kept only so an old stylesheet cannot fail loudly; they are deliberately absent from the frontmatter. New work must not reference them.

### Functional
- Success `#4e8260`, warning `#a4791c`, error `#a33c2b` (dark: `#8fbe9c` / `#d3a94a` / `#d98a76`).

### Named Rules
**The One Heat Rule.** Lilac is the folio’s only heat. It marks the primary action, the active state, and the contact peak — never a large structural fill outside the contact chapter, never a second accent beside it. The legacy `tangerine`/`saffron` names are history, not a second palette.
**The Hairline Rule.** Structure is drawn with 1px sepia rules and double hairlines. Heavy blocks, cards-with-shadows, and gradient fields do not build hierarchy here.
**The Named Ramp Rule.** `-deep` and `-bright` name positions on the *light* ramp. In dark mode the ramp inverts and `green-deep` (`#a7cdb1`) is lighter than `green` (`#8fbe9c`). Read the role, not the suffix — never assume `-deep` means darker.

## Typography

**Display Font:** Bodoni Moda (with Didot, Georgia fallback)
**Body Font:** Newsreader (with Georgia, Times fallback)
**Label Font:** Source Sans 3 (small-caps labels, buttons)
**Mono Font:** JetBrains Mono (plate numbers, periods, tags)

**Character:** Didone engraving for display, literary serif for reading, letterspaced small-caps for labels — a specimen plate’s voice, not a dashboard’s.

### Motion Typography
- **SplitText reveals**: chapter heads split to letters/words/lines under GSAP SplitText and reveal on scroll (owner directive: gsap.com = source of truth). Splits are reverted before any re-init so soft navs never leave stale spans.

### Reserved
- `--font-instrument` (Instrument Serif) is declared and self-hosted but **currently unused**. It is not a role in the hierarchy. Wiring it into a surface is a deliberate act, not a cleanup.

### Hierarchy
- **Display** (700, `clamp(3.1rem, 8.5vw, 6.4rem)`, 0.98): Split-letter title plate name only.
- **Headline** (600, `clamp(2rem, 4.6vw, 3.3rem)`, 1.08): Chapter titles; italic green `<em>` on the key phrase.
- **Title** (600, `clamp(1.4rem, 2.4vw, 1.75rem)`, 1.16): Plate names (italic for species), section heads, card titles.
- **Body** (400, 1rem, 1.6): Chapter intros, prose; measure held ≤ ~72ch.
- **Body — record account** (400, `clamp(1.06rem, 0.5vw + 0.98rem, 1.16rem)`, 1.72): the `/folio/[slug]` account only. **Off the ramp above, on purpose — see *The Account Ramp Addition* below.**
- **Label** (600, 0.78rem, tracking 0.14em, uppercase): Buttons, stage labels, small-caps nav (Newsreader small-caps 0.95rem in the running head).
- **Mono** (500, 0.72rem): Plate numbers, tag chips, ledger data.

### Named Rules
**The Italic Species Rule.** Botanical and project names set in italic Bodoni; roman for structure, italic for the specimen.
**The Small-Caps Label Rule.** Uppercase labels carry tracking ≥ 0.14em in Source Sans 3 or JetBrains Mono — never the display face at label size.
**The Weight-Axis Pin.** The display face loads as the **weight-only** variable build and no stylesheet may import an `opsz` build or hand-write `font-variation-settings: 'opsz'`. The optical-size axis is pinned off on purpose; shipping both builds regressed the display type once already, and `tests/contract.spec.ts` fails the build if it returns.
**The Account Ramp Addition.** The record account's body step (`clamp(1.06rem, 0.5vw + 0.98rem, 1.16rem)` / 1.72, measure capped at `68ch`) is a documented addition to the Body step, not a deviation to be corrected. A feature passage held at a fixed 1rem cannot keep its measure as the fluid ramp moves underneath it — the character count collapses at the top of the range and stretches at the bottom — so the step is fluid and the cap is expressed in `ch` rather than `rem`. The sister surface already sets its record essay above the body step (`.record-desc`, `clamp(1.08rem, 1.7vw, 1.22rem)`), so this makes the precedent explicit rather than leaving two unexplained sizes. As rendered it lands near 63 characters, inside the 60–75ch reading band.

## Layout

Single centered shell at `72rem` (`--shell`) with `clamp(1.25rem, 4vw, 2.5rem)` side padding. Chapters are full-width bands separated by top hairlines; inner grids use `clamp` gaps (2.25–4rem). Pages: `/` (the folio home), `/folio/` (index + `[slug]` records, renamed 2026-09 from `/works`), `/florilegium/` (index + `[slug]` record sheets), `/atelier/`, `404`. The folio index groups plates into categories from `WORK_CATEGORIES` (Web Apps, Internet of Things) — each category a section with an italic `<em>` heading, note, and mono plate count; contents rows mirror the same grouping. Home is a vertical folio: hero → marquee → About → Folio set-piece → Experience → Credentials → Contact → colophon. Responsive: plate grids collapse 3→2→1; desktop nav collapses to the mobile sheet below its breakpoint; sticky chapter head only on the record chapter. Spacing rhythm is clamp-driven, not a fixed scale — gutters 0.5–2.5rem, section padding 4–8.5rem. Breakpoints in use: 479 / 639 / 720 / 860 / 900 / 960 / 1024 / 1179 / 1180 / 1440px.

### Chapter Rail
- Fixed left rail on home, folio, florilegium, and atelier: numbered chapter links (folio: 001–00N) whose active state is resolved from geometry on scroll. The progress fill and labels are **luminance-aware**: sampled against the painted background each frame, the fill flips between lilac and on-heat cream (`data-rail-fill="lilac" | "on-heat"`) so the rail never blends into a heat band; labels flip with it.

### Image Delivery
- Every plate, screenshot, cover, and gallery frame goes through `src/lib/responsive-image.ts`, the single place a full-resolution master becomes the bytes a slot needs. Ladders are declared per slot and sized from the real CSS box (`PLATE_WIDTHS`, `SHOT_WIDTHS`, `COVER_WIDTHS`, `LILY_WIDTHS`, atelier archive): each rung is capped at the source's own width, so **nothing upscales**; `src` is a mid-rung rather than the master; and intrinsic dimensions always ship so the slot reserves its box before the bytes land (CLS stays at 0). Masters live in `src/assets/images/` and are never modified. Moving a master back to `public/` bypasses the pipeline and loses all three guarantees.

## Elevation & Depth

Flat by default. Depth is tonal (raised/tinted cream on plate cream) plus registration-ring double hairlines (`0 0 0 3px bg, 0 0 0 4px border`). Shadows stay whisper-quiet and only under interactive lift. The one exception is the perspective plate, whose shade pool is real but is *earned by rotation* — it exists because the plate is turning in space, not to decorate a flat card.

### Shadow Vocabulary
- **Lift-sm** (`0 1px 2px rgb(44 42 36 / 0.05)`): Barely-there card rest. Dark: `0 1px 2px rgb(0 0 0 / 0.3)`.
- **Lift-md** (`0 6px 12px -8px rgb(44 42 36 / 0.4)`): Button hover under lilac. Dark: `0 6px 12px -8px rgb(0 0 0 / 0.65)`.
- **Lift-lg** (`0 8px 12px -6px rgb(44 42 36 / 0.45)`): The deepest rest state in the system — use sparingly. Dark: `0 8px 12px -6px rgb(0 0 0 / 0.7)`.
- **Registration ring** (`0 0 0 3px var(--color-bg), 0 0 0 4px var(--color-border)`): Secondary button / focused plate double hairline.
- **Tilt shade** (`0 14px 24px -16px`, opacity driven by `--glare`): Only on a plate under the pointer. It carries a real offset and blur, and its strength is bound to the rotation — at `--glare: 0` it contributes nothing.

### Named Rules
**The Registration-Ring Rule.** Emphasis frames are concentric hairlines separated by a cream gap — never a hard offset shadow, never a glow blur as the primary depth cue.
**The Earned-Glare Rule.** The glare highlight rides the tilt. Copying a radial sheen onto a flat surface is a zero-offset colored halo — decoration, not depth — and it is banned outside the perspective plate.

## Shapes

Nearly square: radius scale is 2px / 3px / 4px / 6px (`--radius-xs` via chips / `--radius-sm` / `--radius` / `--radius-lg`). Buttons are chamfered tickets (clip-path corners), not pills. Plates use an arched silhouette (`border-radius: 50% 50% 2px 2px / 32% 32% 2px 2px`) on a 3:4 slot. Borders are 1px sepia; the nav and key sections close with a second hairline 4px below the first. Chips are 2px radius; no full-round pills anywhere. Images that tilt carry a deliberate `scale(1.04)` overscan so rotation never opens a gap at the arch's far edge.

## Components

### Buttons
Two treatments. Both are effective-radius 0 and both are built from hairlines; they differ in what they are imitating.

**The ticket** — the site's action buttons.
- **Shape:** Chamfered ticket (7px corner cut via clip-path); effective radius 0.
- **Primary:** Lilac fill, on-heat cream text (`#fbf7ee`), Source Sans 3 600 / 0.82rem / 0.14em uppercase, padding `0.78rem 1.5rem`, drawn floret mask before the label.
- **Hover / Focus:** Deep lilac (`#64497f`) + `translateY(-1px)`; focus uses the global green outline.
- **Secondary:** Transparent, ink text, 1px strong-sepia border + registration-ring double hairline; sage floret mark; hover border → lilac.

**The stamp** — the record page's outbound links only (`/folio/[slug]`, `.plate-link`): a repository and a live dashboard are references into an archive, not actions the visitor takes on this site, so they are pressed into the sheet rather than offered as a call to action.
- **Shape:** Square-cut ticket, no clip-path; tinted-cream ground (`--color-surface-tint`).
- **Type:** Source Sans 3 600 / 0.78rem / 0.14em uppercase, graphite (`--color-ink`).
- **Border:** 1px `--color-ink-muted`. **This token is deliberate and must not be "corrected" to `--color-border-strong`** — see *The Stamp-Border Rule* below.
- **Mark:** a hairline divider between label and outbound arrow, both drawn, never a unicode glyph.
- **Hover / Focus:** ground lifts to `--color-surface`, rule and label warm to lilac (`--color-lilac` / `--color-lilac-deep`).
- **Active:** ground to `--color-lilac-field`; the stamp presses 2px into the sheet (hover 1px). The press is declared only inside `prefers-reduced-motion: no-preference`.
- **Target:** `min-height: 2.75rem` (44px), comfortably over the 24px floor, and two stamps sit on one row down to 375px.

**The Stamp-Border Rule.** The stamp's hairline is `--color-ink-muted`, not `--color-border-strong`, because the stamp's boundary is carried by that line and the line must clear WCAG 1.4.11 non-text contrast (3:1) on its own. Measured: `--color-ink-muted` reads **5.20:1** on the page ground in light and **5.74:1** in dark; `--color-border-strong` reads **1.85:1** and **2.17:1** — it fails both themes. Do not "harmonise" this border back to the sepia hairline used for rules and dividers; a decorative hairline and a control boundary are not the same job, and the hairline rule in *Named Rules* governs the first, not the second.

### Chips
- **Style:** Tinted cream fill, 1px sepia border, 2px radius, mono 0.72rem, padding `0.2rem 0.6rem`.
- **State:** Static tags (tech stack); no selected-state fill.

### Cards / Containers
- **Corner Style:** 3–6px or arched plate frame.
- **Background:** Raised cream or tinted cream on plate cream.
- **Shadow Strategy:** Registration rings and tonal lift (see Elevation).
- **Border:** 1px `border` / `border-strong`; plate frames are double-rule (outer + inset hairline).
- **Internal Padding:** clamp ~1.1–2.4rem depending on plate size.

### Inputs / Fields
- **Style:** Hairline stroke, raised-cream fill, 3px radius (forms on florilegium/atelier filters).
- **Focus:** 2px green outline, 3px offset (global `:focus-visible`).
- **Targets:** Interactive controls are at least 24×24 CSS px; the mobile menu disclosure is 44×44.

### Navigation
- Running-head strip: sticky, plate-cream, bottom hairline + second hairline 4px below. Brand “Danke” centered (Bodoni italic + sage floret); links Newsreader small-caps 0.95rem — About · Folio · Florilegium · Atelier, nothing deeper; active link takes lilac. Folio is a plain link to /folio/ (renamed 2026-09 from Works; no dropdown panel); below breakpoint, left/right groups collapse into the icon menu disclosure sheet (two-rule glyph → X, 44×44 target).

### Theme Toggle
- Icon-only, in the running head. A pre-paint inline script resolves the theme from an explicit `localStorage` choice, else the OS preference, and applies it as `data-theme` plus the matching `theme-color` (`#f6f1e6` / `#17150f`). Because Astro's ClientRouter copies the *incoming* document's `<html>` attributes onto the live element — and static markup carries no `data-theme` — the script re-applies on `astro:before-swap` (on the new document, so there is no flash) and again on `astro:after-swap`. The choice therefore survives any number of soft navigations. Never solve theme with a CSS inversion filter, and never let a swap re-introduce a light flash.

### Icons
- **Two tiers.** The sage **floret** is the hand-drawn brand mark and stays authored SVG/mask — it is the only mark that may appear as pure decoration. **Functional glyphs** (close, arrows, hearts, social) come from `@hugeicons/core-free-icons` via `src/components/Icon.astro`, all rendered at `currentColor` on a 24×24 box at the set's 1.5 stroke with round caps. Two marks — the outbound arrow and the telegram plane — are hand-authored to that same 1.5 grammar, because the vendor's open-in-new-tab box was rejected by the owner. **One stroke weight, one grammar, everywhere.**
- Decorative icons take `aria-hidden="true"`; meaningful ones take `aria-label` + `role="img"`. Unicode glyphs and emoji standing in for icons are banned outright.

### Signature: Specimen Plate
- Arched 3:4 frame, double rule, engraving-hatch slot (sage floret) until image lands, italic species/project name, small-caps label, mono plate number, floret baseline. Hover warms the frame to lilac and eases the image forward (`transform 0.55s var(--ease)`).

### Signature: Documentation Plate
The record page's evidence: the project's own screenshot or photograph, framed as a figure in the folio (outer hairline, inset hairline in the cream gap, print caption beneath carrying `FIG. NN` in mono lilac, the record name in Bodoni italic, and a kind stamp that says *Screenshot* or *Photograph* truthfully). It is the one component whose size is set by a **height cap** rather than a width, and the cap must not be removed.
- **The cap:** `max-height: max(37rem, 78vh)` on the media, with the frame `width: fit-content` so a tall plate narrows instead of becoming a full-bleed tower. Because the aspect ratio is always preserved, a `max-height` is the only lever needed — the six masters run 0.75 to 1.86 and nothing is ever cropped to a box.
- **The floor is load-bearing.** 37rem (592px) is the largest height the two 1.86 dashboards reach at full measure (569px and 568px). A pure `vh` cap shrinks plates the owner signed off as correct the moment the window gets short — `78vh` is 546px on a 700px-tall window, under both. The `vh` half above the floor carries the actual intent: a plate should be readable in one look rather than scrolled past. On a 900px window the cap resolves to 702px; on 1200px, 936px.
- **What a narrowed plate does:** the frame shrink-wraps and centres in the sheet's measure (`margin-inline: auto` on the frame itself, not on the figure — the figure's other child is the caption, which must not move; auto margins on a definite-width block resolve symmetrically). The caption keeps the sheet's full measure beneath it. A figure caption is set to the page, not to the figure — narrowing the caption with the plate turns a long record name into a wrapping ribbon, and it also breaks the caption's `border-top` hairline into a stub that stops for no reason. That rule is the full-measure horizontal that closes the composition, so it stays full-measure and the band below a centred plate is the intended treatment.
- A master too small to reach the sheet (Eco Office, 255×191) is capped at 17.5rem and centred, mounted rather than stretched.

### Signature: Perspective Plate (3D tilt + glare)
- The freshly-cut treatment for the hero specimen on every page: pointer-driven `rotateX`/`rotateY` under a shared `perspective: 1150px` / `perspective-origin: 50% 45%`, with a `radial-gradient` glare at `mix-blend-mode: overlay` tracking the pointer, plus a shade pool that blooms from the same `--glare` value. The tilt layer carries a `scale(1.04)` overscan so the far edge of the arch never opens.
- **Three layers, three transform owners — never two systems on one element:**
  - **outer** `figure[data-hero-plate]` — owns the reveal and scroll-parallax transform (GSAP); the tilt adds only `perspective`, which is a *layout* property, not a transform.
  - **middle** `.plate` (plate heroes) or the cover image on the record sheet — owns `rotateX`/`rotateY`.
  - **inner** the glare `::after` on `.plate-frame` / `.record-cover` — lit through `--gx` / `--gy` / `--glare` written on the figure.
- The entrance **settle** composes with the hero reveal rather than competing: the outer layer fades and slides while the inner eases out of a laid-back angle.
- **Gating:** pointer tracking requires `(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`; the settle allows touch but still honors reduced motion. Every listener, tween, and inline property is registered for teardown, so a route swap or a mid-tilt reduced-motion flip unwinds cleanly and leaves the plate at zero.

### Signature: Marquee
- Infinite hairline band, 52s linear loop, floret separators, small-caps items; pauses under reduced motion. Screenshot slots mark `SCREENSHOT · PENDING` in hatch — never fabricated imagery.

## Do's and Don'ts

### Do:
- **Do** build hierarchy with sepia hairlines, double rules, and registration rings on plate cream.
- **Do** keep lilac as the single heat: primary CTA, active state, contact peak.
- **Do** set specimen names in italic Bodoni and labels in tracked small-caps.
- **Do** keep plates at fixed scale on the shared baseline when adding works.
- **Do** gate every GSAP moment behind `prefers-reduced-motion` and clear inline styles after settle.
- **Do** use the real dark token set via `data-theme` — never CSS inversion filters.
- **Do** give every element exactly **one** transform owner, and express depth cues that belong to a layout property (`perspective`) as layout properties.
- **Do** route every image through `src/lib/responsive-image.ts` with a ladder sized to its rendered box.
- **Do** run `pnpm test` before calling a visual change done — the suite is the gate, not a formality.

### Don't:
- **Don't** add kickers or eyebrows above headings; let the heading speak.
- **Don't** use Unicode glyphs or emoji as icons — the floret is drawn SVG, functional glyphs come from Hugeicons at one stroke weight.
- **Don't** introduce hard offset shadows, gradient text, or a second accent beside lilac.
- **Don't** round into pills; keep the chamfered ticket and the 2–6px radius scale.
- **Don't** fabricate screenshots or metrics — pending slots and evidence-gated stats only.
- **Don't** put folio decorative vocabulary (plate numbers as chrome) into navigation labels.
- **Don't** reference the retired `tangerine` / `saffron` aliases; they are dead Warm Signal vocabulary.
- **Don't** put a glare or sheen on a flat surface — it belongs to the perspective plate, where rotation earns it.
- **Don't** import an `opsz` font build or hand-write `font-variation-settings: 'opsz'`; the weight-only pin is deliberate and enforced.
- **Don't** reintroduce a generated-image artifact: no built HTML may reference a `pollinations.ai` URL. Every plate image is a real botanical plate or a marked pending slot.

### The Verification Contract
`pnpm test` runs seven Playwright specs against the built site. They are the machine-checked half of this system — treat a red spec as a design regression, not a flaky test.

- **`smoke`** — every route serves 200 with exactly one `h1`; head carries title, description, canonical, Open Graph and Twitter cards; no broken internal links; in-page anchors resolve to real elements.
- **`accessibility`** — one `h1` and no skipped heading levels per route; real landmarks; every link and button has an accessible name; no positive `tabindex`; `lang` is a valid BCP-47 tag; every `<img>` has `alt`; a focused nav control shows a visible indicator.
- **`theme`** — the OS preference resolves correctly when nothing is stored; an explicit choice applies on full load and survives one *and* two consecutive soft navigations; the header toggle flips, persists, syncs `theme-color`, and survives a soft navigation.
- **`reduced-motion`** — the media query is genuinely in force; no motion target carries a transform and no GSAP inline transform survives; headings and body copy are visible and unpainted.
- **`responsive`** — no horizontal overflow at any breakpoint; the mobile menu opens, is keyboard reachable, closes on Escape and on a second activation, and releases the scroll lock; home controls meet 24×24.
- **`images`** — every `<img>` declares `srcset`, `sizes`, and intrinsic dimensions, and is either named or explicitly presentational; every `srcset` URL resolves 200; no descriptor upscales past its master; the home page transfers under 3 MB.
- **`contract`** — the world seed appears exactly once and leads the body; `global.css` imports the Bodoni Moda **variable** build and no `opsz` build, and no stylesheet re-pins the optical-size axis; no built HTML references `pollinations.ai`.
