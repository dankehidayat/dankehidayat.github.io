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
  ink-on-lilac: "#fbf7ee"
  ink-on-green: "#f6f1e6"
  code-bg: "#efe8d8"
  success: "#4e8260"
  warning: "#a4791c"
  error: "#a33c2b"
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
    textColor: "{colors.ink-on-lilac}"
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
    textColor: "{colors.ink-on-lilac}"
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
    rounded: "2px"
    padding: "0.2rem 0.6rem"
---

# Design System: Danke Hidayat — Botanical Folio

## Overview

**Creative North Star: "The Botanical Folio"**

A portfolio set as a herbarium: plate-cream paper (`#f6f1e6`), hairline sepia rules (`#d9cdb5`), leaf-green ink (`#2e5e3d`), and lilac bloom (`#7b5c9e`) as the only heat — the owner pin that retunes the folio scarlet. Every work is a numbered specimen plate at fixed scale, arched like a pressed flower under glass. Display type is Bodoni Moda (Didone engraving); reading is Newsreader; labels are Source Sans 3 small-caps; data is JetBrains Mono.

Density is editorial and airy: chapters breathe with `clamp(4rem, 9vw, 7rem)` vertical rhythm, separation comes from 1px hairlines and double rules rather than cards or shadows. Light-first with a real dark token set (night herbarium); the theme toggle is icon-only. Motion is one authored moment per region under GSAP + Lenis, gated on `prefers-reduced-motion`, then stillness. On multi-chapter pages (≥3 chapters) Lenis eases to the nearest chapter top after a short pause — never mid-scroll, never on single-section record pages; the snap offset matches the anchor-scroll offset so clicks and snaps agree. Navigation is **Leafing**: shared-element View Transitions pair each plate's framed picture (`plate-<id>`) across home → folio index → record → adjacent record, and each florilegium cover (`cover-<id>`) across fan/wall card → record → prev/next thumb; a hairline route sweep draws under the running head after every soft swap. Morphs and sweep are instant/absent under `prefers-reduced-motion`.

The world refuses the dark SaaS card grid, the résumé-timeline default, gradient text, hard offset shadows, and system display faces. Folio flavor (plate numbers, captions, marquees, stage labels) stays decorative; navigation vocabulary stays functional.

**Key Characteristics:**
- Plate-cream ground with sepia hairline rules; registration-ring depth, not drop shadows
- Arched double-rule specimen plates with botanical imagery and italic species names
- Lilac as the single heat — buttons, active states, contact bloom; green leads ink and focus
- Bodoni Moda display / Newsreader body / Source Sans 3 labels / JetBrains Mono data
- Saglitz-intensity GSAP motion (scrub, staggers, velocity marquees), reduced-motion gated

## Colors

A cream herbarium palette: green ink leads, lilac blooms as the only heat, sepia hairlines structure the page.

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

### Functional
- Success `#4e8260`, warning `#a4791c`, error `#a33c2b`.

### Named Rules
**The One Heat Rule.** Lilac is the folio’s only heat. It marks the primary action, the active state, and the contact peak — never a large structural fill outside the contact chapter, never a second accent beside it.
**The Hairline Rule.** Structure is drawn with 1px sepia rules and double hairlines. Heavy blocks, cards-with-shadows, and gradient fields do not build hierarchy here.

## Typography

**Display Font:** Bodoni Moda (with Didot, Georgia fallback)
**Body Font:** Newsreader (with Georgia, Times fallback)
**Label Font:** Source Sans 3 (small-caps labels, buttons)
**Mono Font:** JetBrains Mono (plate numbers, periods, tags)

**Character:** Didone engraving for display, literary serif for reading, letterspaced small-caps for labels — a specimen plate’s voice, not a dashboard’s.

### Motion Typography
- **SplitText reveals**: chapter heads split to letters/words/lines under GSAP SplitText and reveal on scroll (owner directive: gsap.com = source of truth). Splits are reverted before any re-init so soft navs never leave stale spans.

### Hierarchy
- **Display** (700, `clamp(3.1rem, 8.5vw, 6.4rem)`, 0.98): Split-letter title plate name only.
- **Headline** (600, `clamp(2rem, 4.6vw, 3.3rem)`, 1.08): Chapter titles; italic green `<em>` on the key phrase.
- **Title** (600, `clamp(1.4rem, 2.4vw, 1.75rem)`, 1.16): Plate names (italic for species), section heads, card titles.
- **Body** (400, 1rem, 1.6): Chapter intros, prose; measure held ≤ ~72ch.
- **Label** (600, 0.78rem, tracking 0.14em, uppercase): Buttons, stage labels, small-caps nav (Newsreader small-caps 0.95rem in the running head).
- **Mono** (500, 0.72rem): Plate numbers, tag chips, ledger data.

### Named Rules
**The Italic Species Rule.** Botanical and project names set in italic Bodoni; roman for structure, italic for the specimen.
**The Small-Caps Label Rule.** Uppercase labels carry tracking ≥ 0.14em in Source Sans 3 or JetBrains Mono — never the display face at label size.

## Layout

Single centered shell at `72rem` (`--shell`) with `clamp(1.25rem, 4vw, 2.5rem)` side padding. Chapters are full-width bands separated by top hairlines; inner grids use `clamp` gaps (2.25–4rem). Pages: `/` (the folio home), `/folio/` (index + `[slug]` records, renamed 2026-09 from `/works`), `/florilegium/` (index + `[slug]` record sheets), `/atelier/`, `404`. The folio index groups plates into categories from `WORK_CATEGORIES` (Web Apps, Internet of Things) — each category a section with an italic `<em>` heading, note, and mono plate count; contents rows mirror the same grouping. Home is a vertical folio: hero → marquee → About → Folio set-piece → Experience → Credentials → Contact → colophon. Responsive: plate grids collapse 3→2→1; desktop nav collapses to the mobile sheet below its breakpoint; sticky chapter head only on the record chapter. Spacing rhythm is clamp-driven, not a fixed scale — gutters 0.5–2.5rem, section padding 4–8.5rem.

### Chapter Rail
- Fixed left rail on home, folio, florilegium, and atelier: numbered chapter links (folio: 001–00N) whose active state is resolved from geometry on scroll. The progress fill and labels are **luminance-aware**: sampled against the painted background each frame, the fill flips between lilac and on-heat cream (`data-rail-fill="lilac" | "on-heat"`) so the rail never blends into a heat band; labels flip with it.

## Elevation & Depth

Flat by default. Depth is tonal (raised/tinted cream on plate cream) plus registration-ring double hairlines (`0 0 0 3px bg, 0 0 0 4px border`). Shadows stay whisper-quiet and only under interactive lift.

### Shadow Vocabulary
- **Lift-sm** (`0 1px 2px rgb(44 42 36 / 0.05)`): Barely-there card rest.
- **Lift-md** (`0 6px 12px -8px rgb(44 42 36 / 0.4)`): Button hover under lilac.
- **Registration ring** (`0 0 0 3px var(--color-bg), 0 0 0 4px var(--color-border)`): Secondary button / focused plate double hairline.

### Named Rules
**The Registration-Ring Rule.** Emphasis frames are concentric hairlines separated by a cream gap — never a hard offset shadow, never a glow blur as the primary depth cue.

## Shapes

Nearly square: radius scale is 3px / 4px / 6px (`--radius-sm` / `--radius` / `--radius-lg`). Buttons are chamfered tickets (clip-path corners), not pills. Plates use an arched silhouette (`border-radius: 50% 50% 2px 2px / 32% 32% 2px 2px`) on a 3:4 slot. Borders are 1px sepia; the nav and key sections close with a second hairline 4px below the first. Chips are 2px radius; no full-round pills anywhere.

## Components

### Buttons
- **Shape:** Chamfered ticket (7px corner cut via clip-path); effective radius 0.
- **Primary:** Lilac fill, cream text (`#fbf7ee`), Source Sans 3 600 / 0.82rem / 0.14em uppercase, padding `0.78rem 1.5rem`, drawn floret mask before the label.
- **Hover / Focus:** Deep lilac (`#64497f`) + `translateY(-1px)`; focus uses the global green outline.
- **Secondary:** Transparent, ink text, 1px strong-sepia border + registration-ring double hairline; sage floret mark; hover border → lilac.

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

### Navigation
- Running-head strip: sticky, plate-cream, bottom hairline + second hairline 4px below. Brand “Danke” centered (Bodoni italic + sage floret); links Newsreader small-caps 0.95rem — About · Folio · Florilegium · Atelier, nothing deeper; active link takes lilac. Folio is a plain link to /folio/ (renamed 2026-09 from Works; no dropdown panel); below breakpoint, left/right groups collapse into the icon menu disclosure sheet (two-rule glyph → X, 44×44 target). Theme toggle is icon-only.

### Signature: Specimen Plate
- Arched 3:4 frame, double rule, engraving-hatch slot (sage floret) until image lands, italic species/project name, small-caps label, mono plate number, floret baseline. Hover warms the frame to lilac and eases the image forward (`transform 0.55s var(--ease)`).

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

### Don't:
- **Don't** add kickers or eyebrows above headings; let the heading speak.
- **Don't** use Unicode glyphs or emoji as icons — draw the floret (SVG/mask).
- **Don't** introduce hard offset shadows, gradient text, or a second accent beside lilac.
- **Don't** round into pills; keep the chamfered ticket and the 3–6px radius scale.
- **Don't** fabricate screenshots or metrics — pending slots and evidence-gated stats only.
- **Don't** put folio decorative vocabulary (plate numbers as chrome) into navigation labels.
