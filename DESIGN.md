---
name: Danke Hidayat — Warm Signal
description: Warm, saturated editorial-technical portfolio; paper field, green/tangerine/saffron signal tricolor, Bricolage display lockup, ledger rows.
colors:
  green: "#1e6b4a"
  green-deep: "#155236"
  green-bright: "#2f9e65"
  tangerine: "#e05d1e"
  tangerine-deep: "#b8430e"
  tangerine-field: "#e4651f"
  saffron: "#e5a81c"
  paper: "#fbf5ea"
  surface: "#ffffff"
  surface-tint: "#f3ead7"
  border: "#e4d9c2"
  border-strong: "#c9bca0"
  ink: "#251f16"
  ink-body: "#453b2e"
  ink-muted: "#7a6c59"
  code-bg: "#f1e7d0"
  ink-on-green: "#fbf5ea"
  ink-on-green-muted: "#cfe3d5"
  ink-on-tangerine: "#2e1608"
  footer-dark: "#1f1910"
  success: "#2f9e65"
  warning: "#b38614"
  error: "#c2402e"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.6vw, 4.1rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 3.6vw, 2.7rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Bricolage Grotesque Variable', 'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.4vw, 1.55rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  xs: "0.4rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  2xl: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "#ffffff"
    typography:
      fontFamily: "'Source Sans 3 Variable', 'Source Sans 3', system-ui, sans-serif"
      fontSize: "0.95rem"
      fontWeight: 600
      lineHeight: 1.2
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.4rem"
  button-primary-hover:
    backgroundColor: "{colors.green-deep}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.4rem"
  button-inverse:
    backgroundColor: "{colors.ink-on-green}"
    textColor: "{colors.green-deep}"
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.4rem"
  button-inverse-ghost:
    textColor: "{colors.ink-on-green}"
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.4rem"
  button-dark:
    backgroundColor: "{colors.ink-on-tangerine}"
    textColor: "#f7ead6"
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.4rem"
  button-dark-ghost:
    textColor: "{colors.ink-on-tangerine}"
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.4rem"
  button-tangerine:
    backgroundColor: "{colors.tangerine}"
    textColor: "{colors.ink-on-tangerine}"
    rounded: "{rounded.sm}"
    padding: "0.72rem 1.4rem"
  button-tangerine-hover:
    backgroundColor: "{colors.tangerine-deep}"
  tag-chip:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.ink-body}"
    typography:
      fontFamily: "'JetBrains Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"
      fontSize: "0.72rem"
      lineHeight: 1.5
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.6rem"
  project-plate:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.md}"
    padding: "1.7rem 1.7rem 1.55rem"
  post-nav-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.2rem 1.35rem"
  stack-row:
    typography:
      fontFamily: "'JetBrains Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"
      fontSize: "0.78rem"
      fontWeight: 500
      letterSpacing: "0.1em"
    padding: "1.25rem 0.15rem"
---

# Design System: Danke Hidayat — Warm Signal

## Overview

**Creative North Star: "The Warm Signal"**

A warm, saturated editorial-technical portfolio. The page is warm paper, and across it runs a signal system of leaf-green, tangerine, and saffron — green leading fields and actions, tangerine marking dates, links, and the contact band, saffron flashing in ticks and footer accents. Structure is drawn like a ledger: rows separated by hairlines, each topped with a 2px colored signal line that traces in as it enters view. Type is Bricolage Grotesque for display and headings, Source Sans 3 for reading, and JetBrains Mono as the instrument panel of dates, periods, and code. A Bricolage Grotesque lockup sets the name.

The story is three beats: meet a precise engineer on a tangerine signal field, scan the shipped systems in ledger rows, reach him by email on a full-bleed tangerine band. Density is editorial, not crowded — sections breathe with generous vertical rhythm (`clamp(4.5rem, 9vw, 7rem)`), and separation comes from 1px hairlines and 2px signal lines rather than heavy blocks. Light-only by decision; the palette is tuned for daylight professional reading. No costume, no dark mode.

Motion is one authored moment per region, then stillness: a Bricolage name lockup that clips in, a polaroid portrait that settles into its paper frame, signal ticks that pop, and row hairlines that draw across with scroll. Under `prefers-reduced-motion` everything renders static. The interface recedes; the systems lead.

**Key Characteristics:**
- Warm paper field (`#FBF5EA`) with a green/tangerine/saffron signal tricolor; a Bricolage Grotesque name lockup (no cursive)
- Ledger structure: 1px hairline row borders with 2px colored signal lines that draw in on scroll
- Section rhythm: About(tint) → Experience(white) → Tech Stack(tint) → Projects(tint) → Notes(white) → Certifications(tint) → Contact(tangerine) → footer(dark)
- Bricolage Grotesque for display/headlines, Source Sans 3 for body, JetBrains Mono for data/labels/code
- Light-only, high-contrast, no dark mode, no theme toggle

## Colors

A warm, saturated three-signal system on a warm paper field — green leads, tangerine acts, saffron marks.

### Primary
- **Leaf Green** (`#1e6b4a`): the lead signal — primary buttons, active nav underlines, focus rings, the section tick. Text on green is paper (`#fbf5ea`).
- **Deep Green** (`#155236`): hover for green fills and the stat figures on the tinted About section.
- **Bright Green** (`#2f9e65`): the "live" signal — availability dot and its 3px halo.

### Secondary
- **Tangerine** (`#e05d1e`): the acting signal — period text, link underlines, the experience-row top line, inline-code text on its field, the nav contact CTA, and the mobile menu active state. As a field it renders ≈`#E4651F`.
- **Deep Tangerine** (`#b8430e`): the accessible tangerine text for periods, links, post meta, and verify links — tangerine at body size only passes contrast in this deep form.
- **Tangerine Field** (`#e4651f`): the full-bleed contact band; ink on tangerine (`#2e1608`) is its text color. The hero is the same family — a radial gradient from ≈`#f68b4a` through Tangerine Field to Deep Tangerine, over a faint dot grid and film grain, with a saffron halo behind the polaroid.

### Tertiary
- **Saffron** (`#e5a81c`): the marker signal — the offset corner of every signal tick, the nav logo-mark corner, the footer role line and link hovers, the second half of the project-plate top line, the tech-stack signal line, the hero keystone, and the footer quote attribution.

### Neutral
- **Warm Paper** (`#fbf5ea`): the page field; also the base of the frosted nav.
- **White** (`#ffffff`): surfaces raised above the field — project plates, post-nav links, the hero portrait frame.
- **Warm Tint** (`#f3ead7`): alternating section backgrounds (About, Tech Stack, Projects, Certifications).
- **Hairline** (`#e4d9c2`): 1px borders and row dividers.
- **Hairline Strong** (`#c9bca0`): secondary interactive strokes — secondary button and menu-button borders.
- **Ink** (`#251f16`): headings and primary text; also the 2px top rule of the stats ledger.
- **Ink Body** (`#453b2e`): body copy.
- **Ink Muted** (`#7a6c59`): secondary text and record meta.
- **Code Field** (`#f1e7d0`): code blocks, inline-code and chip backgrounds; also the Shiki `warm-signal` editor background.
- **Footer Dark** (`#1f1910`): the dark footer band; text `#d9cfba` with saffron hovers.

### Functional
- **Signal Green** (`#2f9e65`): success — code copy "copied" state, diff-add lines.
- **Brass** (`#b38614`): warning — also the code theme constant color.
- **Signal Red** (`#c2402e`): error — KaTeX errors, diff-remove lines.

### Named Rules
**The Signal Tricolor Rule.** Each signal has one job: green leads fields and actions, tangerine acts on links, dates, the contact band, and the nav CTA, saffron marks ticks and footer accents. Swap the roles and the system reads as noise.
**The Paper Field Rule.** The page is warm paper by default; dark appears only in the footer band (`#1f1910`). Nothing else on the page is a dark surface.

## Typography

**Display Font:** Bricolage Grotesque Variable (fallback `'Bricolage Grotesque', system-ui`)
**Body Font:** Source Sans 3 Variable (fallback `system-ui`)
**Label/Mono Font:** JetBrains Mono Variable (fallback `ui-monospace, Menlo`)

**Character:** A warm, confident editorial-technical pairing. Bricolage Grotesque carries the personality in headlines and the name lockup; Source Sans 3 reads clean and measured in body copy; JetBrains Mono is the instrument panel — dates, periods, indices, and code, never costume. No cursive; the name is a Bricolage Grotesque lockup.

### Hierarchy
- **Name lockup** (Bricolage Grotesque, Variable): `Danke` and `Hidayat` both at weight 700, `clamp(2.75rem, 6vw, 4.35rem)`, line-height 1.02, letter-spacing -0.02em, sentence case — one family, one weight, one size across the two lines, so the name reads as a single mark.
- **Headline** (Bricolage Grotesque, 700, `clamp(1.85rem, 3.6vw, 2.7rem)`, line-height 1.08, letter-spacing `-0.015em`): section titles, page titles, post titles. Preceded by the signal tick. The hero headline (weight 500, `clamp(1.2rem, 2.2vw, 1.45rem)`) states the pitch below the name lockup.
- **Title** (Bricolage Grotesque, 700, `clamp(1.3rem, 2.4vw, 1.55rem)` down to `1.2rem`, line-height 1.25–1.4): experience roles, project titles (1.35rem), post-row titles (1.4rem), record titles (1.2rem).
- **Body** (Source Sans 3, 400, `1rem`, line-height 1.7): paragraphs; prose and section intros run `1.05rem`. Columns capped at 40–48rem; measure stays ~65–75ch.
- **Label** (JetBrains Mono, 500, `0.72–0.82rem`, line-height 1.5, uppercase, letter-spacing `0.08–0.14em`): dates, periods, indices, captions, status lines — the instrument panel.

### Named Rules
**The No-Cursive Rule.** Cursive is banned across the site — the hero name is a Bricolage Grotesque lockup, and no script font appears anywhere.
**The Instrument-Panel Rule.** JetBrains Mono is reserved for data, labels, and code. Using it for decorative or display text is costume — off-world.
**The No-Kicker Rule.** Nothing sits above a heading as an eyebrow or label; a section is marked by the signal tick, never a word.

## Layout

A single 72rem (`1152px`) shell centers all content with fluid gutters (`clamp(1.25rem, 4vw, 2.5rem)`). Every section owns its full-bleed background — white or warm tint alternating — while content stays shell-constrained. Vertical rhythm is generous: sections pad `clamp(4.5rem, 9vw, 7rem)` top and bottom; the hero pads `clamp(4.5rem, 11vh, 7.5rem)` top and `clamp(3.5rem, 8vh, 5.5rem)` bottom.

The structure is a ledger, not a card grid: rows separated by 1px hairlines, each topped with a 2px colored signal line that draws across as it enters view. Sections run **About(tint) → Experience(white) → Tech Stack(tint) → Projects(tint) → Notes(white) → Certifications(tint) → Contact(tangerine) → footer(dark)** down the page. A Tech Stack ledger (six groups: Languages / Frameworks & Libraries / Data & Backend / DevOps & Infrastructure / Embedded & IoT / Design & Tools) sits between Experience and Projects on a warm-tint band, with saffron signal lines and tag-chip rows.

Grids: hero is `1.35fr / 0.65fr` at ≥900px (stacking with the portrait centered below on mobile); About is `1.25fr / 0.75fr` at ≥1024px; project plates 1 → 2 columns at ≥768px; contact `1.3fr / 0.7fr` at ≥860px; footer `1.2fr / 0.8fr` at ≥720px; experience rows `11rem / 1fr` at ≥720px; tech stack rows `11rem / 1fr` at ≥720px; record rows stack on mobile and become `auto 1fr auto` (issuer brand tile / body / meta) at ≥640px; post nav 2 columns at ≥560px. Blog posts read in a 680px column. The sticky nav sits at 4.25rem with `scroll-padding-top: 5.5rem` so anchored sections clear it.

Blog and content pages get `padding-bottom: clamp(3.5rem, 7vw, 5rem)` so the dark footer never crowds the text, and post navigation adds its own `padding-bottom: clamp(3rem, 6vw, 4.5rem)` so prev/next cards clear the footer.

## Elevation & Depth

Tonal-first: depth comes from warm tint layering and white surfaces against paper, plus sparse ambient shadows. Shadows are warm-toned (`rgb(37 31 22 / …)`), always soft and diffuse, and appear only at rest for raised plates or as a hover/scroll response:

### Shadow Vocabulary
- **Resting Plate** (`0 1px 2px rgb(37 31 22 / 0.06)`): project plates and secondary buttons at rest — barely perceptible grounding.
- **Hover Lift** (`0 16px 36px -20px rgb(37 31 22 / 0.22)`): plate, card, and post-nav hover.
- **Float** (`0 30px 60px -30px rgb(37 31 22 / 0.28)`): large raised moments.
- **Portrait Cast** (`0 34px 60px -30px rgb(0 0 0 / 0.55)`): the hero polaroid — the one genuinely floating element.
- **Nav Scrolled** (`0 10px 30px -26px rgb(37 31 22 / 0.3)`): appears under the nav once scrolled (the hairline is permanent).
- **Button Glow** (`0 10px 22px -14px <signal> 80%`): colored halo under primary, inverse, tangerine, and dark buttons, deepening on hover.

**The Flat-At-Rest Rule.** Surfaces are flat at rest; shadows appear only as a hover or scroll response. Hard offset shadows are never used in this world.

## Shapes

A warm, ledger-like form language. Radii step 6px (sm) / 10px (md) / 14px (lg). Buttons, chips, and menu buttons use 6px; project plates and post-nav cards use 10px; the hero polaroid uses 8px with a 4px photo inset. The only true circle is the status/availability dot (0.5rem) and the polaroid's Leica-style red brand dot.

The signature geometry is the **signal tick**: a 0.85rem green square with a saffron offset corner (`box-shadow: 0.3rem 0.3rem 0 -0.15rem #E5A81C`) that precedes every section title, echoed as the favicon in the nav and inverted to dark ink on the tangerine contact band.

Structure is drawn with 1px hairlines (`--color-border`) as row bottoms, each topped with a 2px colored signal line — tangerine for experience rows, green for post rows, saffron for certification/publication records and tech-stack rows — and a 3px `green → saffron` line across the top of every project plate.

The hero portrait is a POLAROID: white paper card with `border-radius: 8px`, padding `0.7rem 0.7rem 1.05rem`, rotated -1.5deg, with a photo inset (4:5, `border-radius: 4px`) and a Leica-style watermark line under the photo: a red dot (`#d9231f`, 0.5rem) beside "DANKE" in JetBrains Mono 0.62rem with 0.3em tracking, then the name in mono uppercase (0.78rem, 0.14em tracking) and the role line. Hover straightens the rotation and lifts the card.

## Components

### Buttons
- **Shape:** 6px radius, `0.72rem 1.4rem` padding, inline-flex with a 0.5rem icon gap, weight 600 at 0.95rem, line-height 1.2.
- **Primary:** Leaf Green fill (`#1e6b4a`), white text, green glow; hover Deep Green (`#155236`) with a `-1px` rise.
- **Tangerine (nav CTA):** tangerine fill (`#e05d1e`), ink-on-tangerine text (`#2e1608`), 6px radius, 1rem arrow icon; hover Deep Tangerine (`#b8430e`) with a `-1px` rise. The contact CTA on the paper nav (desktop and mobile menu) — the green primary CTA is gone from the nav.
- **Inverse (on tangerine hero):** ink-on-tangerine fill (`#2e1608`), `#f7ead6` text; hover `#1d0e04`. Ghost inverse is transparent with a 45% ink stroke.
- **Dark (on tangerine contact):** ink-on-tangerine fill (`#2e1608`), `#f7ead6` text; hover `#1d0e04`. Ghost dark is transparent with a 55% ink stroke.
- **Secondary:** white fill, ink text, Hairline Strong stroke; hover shifts the stroke to green and the text to Deep Green.
- **Focus:** 2px Leaf Green outline, 3px offset, 0.25rem radius (global `:focus-visible`).

### Navigation
- A floating frosted pill: the whole bar is a single 999px-radius capsule, sticky at `top: 0.75rem`, `max-width: 66rem`, `rgb(251 245 234 / 0.82)` fill with `blur(16px) saturate(1.3)`, a `1px` Hairline Strong border at ~70%, and a soft shadow. The page shows through as warm paper tint, so the pill reads as frosted, not solid. On the tangerine hero it floats over the orange field with clear air below it.
- Logo: the wordmark "Danke Hidayat" in Bricolage 700 1.15rem. No icon or square mark beside it — the name alone is the mark.
- Links: 7 items — About, Experience, Stack, Projects, Notes, Fun, Contact — Source Sans 3 0.95rem weight 500, ink-body, each a full-height pill (`border-radius: 999px`) with an 8% green wash on hover. The active section is a soft green pill-tab (green 14% field, Deep Green text, weight 600, radius 999px) instead of an underline — the selected state is a filled tab, not a line.
- Contact CTA: a tangerine button (`.btn-tangerine`, bg `#e05d1e`, text `#2e1608`, `border-radius: 999px` to match the pill, tighter `0.5rem 1.15rem` padding so it sits level with the links). Its hover stays seated inside the pill: it darkens to Deep Tangerine but keeps `transform: none` — no lift, no shadow bloom — so it reads as part of the capsule rather than a floating button. The mobile menu CTA is the same tangerine pill.
- ≤899px: a line-morph toggle (2.5rem square, Hairline Strong stroke) whose three bars animate into an X when open (bars 2px, gap 5px; open: rotate ±45° with the middle bar fading) — no raw glyph. The open button flips to a tangerine fill with ink-on-tangerine icon. It opens an accessible `aria-expanded` floating card panel anchored to the pill (left/right 0, `max-width: 24rem`, centered): white surface, Hairline Strong border, 14px radius, soft shadow, link rows at 1.05rem weight-600 with 6px-radius hover tiles, Fun linking to `/fun`.

### Cards (project plates)
- **Corner:** 10px. **Background:** white. **Border:** 1px hairline.
- **Shadow:** resting plate → hover lift (with a `-3px` rise and Hairline Strong border).
- **Padding:** `1.7rem 1.7rem 1.55rem`.
- **Accent:** a 3px `green → saffron` line across the top that draws in on hover; title links tint green on hover.

### Chips (tech tags)
- Mono 0.72rem, code-field background (`#f1e7d0`), 1px hairline, 6px radius, ink-body text.

### Ledger Rows (experience, post, certification, publication)
- Each row is a hairline-bottomed ledger entry with a 2px signal line across the top that draws in on scroll — tangerine for experience, green for posts, saffron for records. Periods and dates are JetBrains Mono at Deep Tangerine; current roles read "Present".

### Tech Stack ledger
- Six ledger rows (Languages / Frameworks & Libraries / Data & Backend / DevOps & Infrastructure / Embedded & IoT / Design & Tools) on the warm-tint band: a mono uppercase label column (0.78rem, letter-spacing 0.1em, ink-muted) beside a tag-chip row. Each row is hairline-bordered with a 2px saffron signal line that draws in on scroll (`--line`).

### Section Heading (signature)
- The signal tick (0.85rem green square + saffron corner), then a Bricolage headline with a one-line intro (max 46rem, 1.05rem). No kicker, ever.

### Contact panel
- Full-bleed tangerine band; the section tick and title invert to dark ink. The email is the hero — Bricolage `clamp(1.35rem, 3.4vw, 2rem)` 700 with a 2px ink underline that solidifies on hover. Socials are a hairline-ruled ledger column with 0.95rem (~15px) arrow icons; dark buttons carry the actions.

### Hero portrait
- 4:5 photo in a white polaroid card (`border-radius: 8px`, padding `0.7rem 0.7rem 1.05rem`, 1px ink border, soft cast shadow), rotated -1.5deg with a 4px-radius photo inset. A Leica-style watermark line sits under the photo: red dot (`#d9231f` 0.5rem) + "DANKE" in JetBrains Mono (0.62rem, 0.3em tracking), then the name in mono uppercase (0.78rem, 0.14em tracking) and the role line. Hover straightens the rotation and lifts the card `translateY(-4px)`.

### Footer
- Dark band (`#1f1910`), text `#d9cfba`. Name is Bricolage 700 (`1.6rem`) — no script; role line "Software developer & DevOps engineer" in saffron.
- A quote block closes the identity column — "I was born to be the star." with a mono saffron attribution, "Saijou Claudine · Revue Starlight". The sections column now includes Stack.

### Fun page (the leisure corner)
- **Ledger.** The page opens with a short, human lede ("This page corner is where we stop with all the work life for a while..."), then three sections — manga / anime & light novels / music — each with a count chip beside the section heading (mono 0.72rem, ink-muted, a white hairline pill with 999px radius showing the bare number).
- **Cards (FunCard).** A responsive cover grid (`repeat(auto-fill, minmax(166px, 1fr))`, 5 columns on desktop, 2 on mobile). Each card is a `<button>`: the 2:3 cover art with a 4px radius and a hairline border, a heart chip in the top-right corner (tangerine field, ink heart icon) for favorites, and the title in two clamped lines below. Hover lifts the cover, shows a small "Details" ink pill over the art (bottom-left), and tints the title green.
- **Detail dialog.** Clicking a card opens a native `<dialog>` (backdrop dim, ESC / backdrop / close-button dismiss, body scroll lock). Desktop is a two-column panel (cover column `minmax(136px,168px)` + details): title, badge for favorites ("Favorite" / "All-time favorite"), creator line, note, and a list of links — "Details" (MAL / AniList) plus "Buy" or "Read online" per entry. Mobile turns into a bottom sheet (cover 9rem, radius 18px 18px 0 0). JS reads a JSON blob embedded in the page (`#fun-data`) keyed by card slug.
- **Music section.** A live "now playing" card at the top, fed by a Vercel serverless function (`api/now-playing.mjs`) that reads `LASTFM_API_KEY` / `LASTFM_USERNAME` from the environment — a green pulsing dot with "Listening now", or a muted dot with "Last played", plus the track, artist, cover, and a link to the last.fm page. Below it the on-repeat tracks are grouped by artist (CHiCO with HoneyWorks, 初星学園 · Gakuen iDOLM@STER), each track keeping its Spotify embed under its artist heading. The section closes with "Also on rotation": a grid of artist chips, each linking out to the artist's Spotify page. If the serverless function is missing or unconfigured (local dev, GitHub Pages), the now-playing card stays hidden and the rest of the section is unaffected.

## Do's and Don'ts

### Do:
- **Do** keep the tricolor roles fixed: green leads, tangerine acts, saffron marks.
- **Do** draw structure with 1px hairlines and 2px signal lines — the ledger is the world's skeleton.
- **Do** use Bricolage Grotesque for display, headings, and the hero name lockup; Source Sans 3 for body; JetBrains Mono for data/labels/code.
- **Do** keep the hero name lockup in Bricolage only — no cursive anywhere.
- **Do** alternate white and warm-tint sections, keep the hero and the contact band in the tangerine family (hero graded and grained so the two never read flat-identical), and give blog content pages enough bottom padding (`clamp(3.5rem, 7vw, 5rem)`; post nav `clamp(3rem, 6vw, 4.5rem)`) to clear the dark footer.

### Don't:
- **Don't** ship a dark mode or a theme toggle — the world is light-only by decision.
- **Don't** use JetBrains Mono as costume; it is the instrument panel only.
- **Don't** put a kicker or eyebrow above a heading — the signal tick marks sections.
- **Don't** use cursive anywhere — the name is a Bricolage lockup.
- **Don't** use hard offset shadows, gradient text, or neon; shadows stay warm, soft, and diffuse.
- **Don't** use pill radius on buttons (6px is the button radius) or let muted text fall below 4.5:1 on its surface.
