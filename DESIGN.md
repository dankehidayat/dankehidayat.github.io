# Design System

<!-- impeccable:design-schema 1 -->

## Direction

**Night Signal** — portfolio as a live telemetry wall at 2 a.m.: bold typeset name as the primary exhibit, soft organic modules (no hard squares), mint “online” signal on a deep lab field.

- Seed: `5d8702a8` · grounded #5 (live telemetry status wall) · soft chromatophore modules for non-square geometry
- Atmosphere: dark night lab / instrument glow
- Motion: GSAP + ScrollTrigger only (no Lenis / smooth-scroll library)

## Color

| Role | Token | Hex |
|------|--------|-----|
| Void | `--void` | `#07080c` |
| Field | `--field` | `#0c0e14` |
| Surface | `--surface` | `#141722` |
| Ink | `--ink` | `#f2f4f8` |
| Soft ink | `--ink-soft` | `#c4cad8` |
| Muted | `--muted` | `#8b93a7` |
| Signal (mint) | `--signal` | `#5ef2a8` |
| Ember (warm) | `--ember` | `#ff7a59` |
| Line | `--line` | white @ 8% |

Strategy: **Committed dark** — field owns the page; mint ~10–15% (status, links, primary CTA); ember as secondary human accent.

## Typography

| Role | Family |
|------|--------|
| Display / hero | Unbounded Variable |
| UI / body | Manrope Variable |
| Meta / mono | JetBrains Mono Variable |

Hero is typeset-first: stacked name at clamp 3–6.5rem, claim in display weight, body lede quieter.

## Layout

- Soft radii everywhere (`--radius` ~1.35rem, pills for controls)
- Sticky frosted nav; logo `Danke.` with signal dot
- Hero: type left / soft-blob portrait right with glow orbs
- Work: rounded modules with soft radial bloom (not square frames)
- Experience: signal-spine timeline with rounded cards
- Contact: email-first plate, no phone

## Components

`.label-kicker`, `.btn-*` (pill), `.work-card`, `.timeline-*`, `.hero-signal`, `.contact-panel`, `.closing-band`

## Motion

- Hero: name lines rise with stagger; claim/lede/actions fade-up; portrait scales in; orbs float on sine loop
- Scroll: section reveals + staggered work cards via ScrollTrigger
- `prefers-reduced-motion`: static, fully visible content
