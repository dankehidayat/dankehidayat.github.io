---
target: homepage
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-07-25T21-12-01Z
slug: src-pages-index-astro
---
# Critique: homepage (src/pages/index.astro)

**Method:** dual-agent (A: 019f9b1a-0607-7483-94ac-d4998f4f2c28 · B: 019f9b1a-0611-78b2-8f3b-4b1a608eb3bc + parent detect.mjs)
**Mode:** Experience + Persuade · Daylight Gallery Labels
**Detector:** exit 0, findings []

## Heuristics (23/32)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Mobile menu open state not labeled Close |
| 2 | Match System / Real World | 3 | Hero lede denser than product claim |
| 3 | User Control and Freedom | 3 | No Escape/focus trap on mobile menu |
| 4 | Consistency and Standards | 4 | Token system coherent |
| 5 | Error Prevention | 3 | Static surface; weak external-link cues |
| 6 | Recognition Rather Than Recall | 2 | Text-only work cards; 7 equal peers |
| 7 | Flexibility and Efficiency | n/a | Portfolio single-path |
| 8 | Aesthetic and Minimalist Design | 3 | Strong atmosphere; CTA/section redundancy |
| 9 | Error Recovery | 2 | No failure copy on this surface |
| 10 | Help and Documentation | n/a | Not a complex product |

## Design specificity
Specific daylight gallery world (wall/ink/rail/mat, Literata labels). Weakens where proof is missing: text-only project wall, uncurated “Selected” list.

## Strengths
1. Own-world visual system is real, not theme sludge
2. IA puts projects before writing; Contact primary
3. Person present via portrait-as-exhibit

## Priority issues
### P0 Uncurated project wall
What: All projects equal Work 01…N text cards under “Selected”
Why: Hiring scan fails
Fix: 3 featured + view all; stack/outcome line
Command: distill / layout

### P0 Work cards without work
What: No thumbnails/diagrams
Why: IoT needs visual proof
Fix: Cover images or exhibit mats
Command: polish / delight

### P1 Hero CTA overload + résumé blob
What: Long lede + 3 CTAs
Why: No single primary action
Fix: 2-line lede; Contact + one secondary
Command: clarify / distill

### P1 Featured writing mix
What: Anime review next to calibration on home
Why: Confuses professional first impression
Fix: Feature craft posts; label personal
Command: clarify / distill

### P2 Label redundancy + thin mobile menu a11y
What: Duplicate kicker=h2; menu never Close; no Escape
Fix: Dedupe heads; close label + Escape
Command: polish / harden

## Personas
Jordan (hiring manager): beauty without ranked proof; Resume ghost
Casey (mobile): dense cards, Contact behind Menu
Maya (technical hire): wants systems depth visuals

## Minor
PRODUCT theme-toggle drift; footer group labeled “Home”; Work NN English on ID
