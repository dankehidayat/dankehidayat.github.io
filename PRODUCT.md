# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Hiring managers, recruiters, and technical collaborators evaluating Danke Hidayat for junior software, DevOps, IoT, embedded, or full-stack work. They need a clear, trustworthy picture of skills, shipped projects, work history, and how to reach him.

**Secondary:** Readers who discover the blog (RSS, social, or via the portfolio). Writing supports credibility; personal-interest posts live on the blog, not in the professional bio.

## Product Purpose

Personal portfolio and professional presence for **Danke Hidayat** at [dankehidayat.my.id](https://dankehidayat.my.id).

The site makes it possible to:

- Present who Danke is, what he builds, and where he works — on a single page, scannable in one pass
- Show real project work (IoT, embedded, monitoring systems, DevOps) and career history
- Share technical writing on the blog
- Offer a low-friction path to contact (email, socials, resume PDF)

**Success (next year):** both inbound opportunities from the right people *and* a living, credible technical presence — portfolio first; writing second.

## Positioning

Junior Software Developer & DevOps Engineer who bridges **hardware and software into systems that work in the real world** — sensors, firmware, edge-to-cloud data, containers and deployments — prioritizing stability, simplicity, and clarity over flash.

Not a generic "full-stack portfolio": the durable claim is hands-on connected-device and integration work (ESP32/Arduino, calibration/monitoring, React/TypeScript dashboards, Docker/Ansible/Caddy), grounded in Computer Engineering training and current employment at PT. Labdha Teknika Nusantara.

## Operating Context

- **Static personal site** built with Astro 5 + Tailwind 4, content collections for blog and projects
- **Routes:** `/` (single-page: Hero, About, Experience, Projects, Notes, Certifications, Contact), `/blog`, `/blog/[slug]`, `/rss.xml`, sitemap, `/404`; old routes (`/projects`, `/experience`, `/about`, `/contact`, `/tags`, `/id/*`) redirect to their single-page anchors
- **Language:** English only (Indonesian routes removed in the 2026 redesign)
- **Theme:** light-only — no dark mode, no theme toggle
- **Identity sources:** `src/data/site-config.ts`, `src/data/experience.ts`, `src/data/about.ts`, `src/data/certifications.ts`, `src/data/projects.ts`, `src/data/stats.ts`, `src/data/publications.ts`, Markdown in `src/content/`, resume at `public/Resume_Danke_Hidayat.pdf`
- **Public URL:** https://dankehidayat.my.id
- **Social / external:** GitHub, Bluesky, LinkedIn, RSS (as linked on the site)
- **Authoring model:** Markdown/MDX content + data files; no app login or multi-user roles

## Capabilities and Constraints

**Capabilities (confirmed in the product today):**

- Single-page home: hero with arch portrait and two actions; About with stats bar; work experience timeline; tech stack ledger; six project cards; three latest craft posts; certifications list; contact panel with email, socials, and resume
- Blog: index, post layout (680px reading column, KaTeX math, code blocks with copy buttons, prev/next navigation), RSS feed
- SEO: canonical URLs, Open Graph, sitemap; light-only `theme-color` and `color-scheme`
- Motion on the home page only: GSAP + ScrollTrigger entrance/reveals, Lenis smooth scroll, timeline rail draw; static under `prefers-reduced-motion`

**Constraints:**

- Single-author personal site; no product multi-tenancy or auth
- Content and claims must stay factual; do not invent employers, metrics, clients, or testimonials
- Stats bar and Publications section are **evidence-gated**: values and entries render only when the owner supplies them from the CV (`src/data/stats.ts`, `src/data/publications.ts` — currently placeholders)
- Theme origin is Just Good UI's Dante (GPL-3.0); product identity is Danke's, not the theme brand

**Confirmed after redesign brief (2026-07):**

- **Language:** English only; no i18n, no `/id/` routes
- **Theme:** light-only; no dark mode, no theme toggle
- **Visual world:** Warm Signal — warm paper `#FBF5EA`, leaf-green `#1E6B4A` / tangerine `#E05D1E` / saffron `#E5A81C` signal tricolor, Bricolage Grotesque display (no cursive), ledger rows and signal ticks, arch portrait, light-only
- **Personality:** professional, measured tone on the main page; personal interests (yuri, BanG Dream!, Japanese) live in blog posts, not the bio
- **Motion:** GSAP + ScrollTrigger + Lenis smooth scroll, home page only; blog pages static

**Still open:**

- Owner-supplied publication entries and stats numbers (currently marked placeholders)
- Deployment target is the owner's infrastructure call (repo ships the GitHub Pages workflow; static output deploys anywhere)

## Brand Commitments

- **Name:** Danke Hidayat
- **Role framing:** Junior Software Developer & DevOps Engineer (site subtitle / positioning)
- **Employer (current):** PT. Labdha Teknika Nusantara
- **Domain / email:** dankehidayat.my.id · contact@dankehidayat.my.id
- **Voice:** First-person, clear, technical, measured; specifics over generalizations; no hype words ("passionate", "excited", "thrilled") in professional copy
- **Personality lives on the blog:** personal-interest writing remains legitimate site content, but the home bio stays professional

## Evidence on Hand

Real assets and content that future work must use or honestly omit — not fabricate:

| Kind | Location / note |
|------|-----------------|
| Avatar & hero imagery | `src/assets/images/avatar.jpeg`, `hero.jpeg` |
| Resume PDF | `public/Resume_Danke_Hidayat.pdf` |
| Projects | selene, flowpoint-next, flora, eco-office, ecobin-sorter, hydrolevi (`src/content/projects/` + `src/data/projects.ts` for tech/links) |
| Blog posts | Six posts (tech opinion, performance, anime review, Japanese input guide, calibration, Colab automation) in `src/content/blog/` |
| Experience / education | `src/data/experience.ts` |
| Certifications | Eleven credentials with verify links (`src/data/certifications.ts`) |
| Site copy & nav | `src/data/site-config.ts` |
| Social links | GitHub, Bluesky, LinkedIn, RSS as published |

**Absences:** No third-party testimonials, client case-study metrics, press quotes, or paid product claims on hand. No publications data or confirmed stat numbers yet — `src/data/stats.ts` and `src/data/publications.ts` hold marked placeholders until the owner supplies real values from the CV. Do not invent them.

## Product Principles

1. **Professional first, personality in the writing** — Help evaluators decide quickly on the single page; let personal interests live in blog posts.
2. **Show real work, not claims** — Projects, experience, resume, and writing are the proof; unsubstantiated polish is not.
3. **Clarity over spectacle** — Stability and simplicity in systems mirror how the site should communicate: scannable, honest, decision-friendly.
4. **Measured voice** — Direct, first-person, technical; specifics over generalizations.
5. **Preserve published truth** — Existing pages, projects, posts, and links stay in scope unless the owner deliberately changes them.

## Accessibility & Inclusion

Light-only, high-contrast warm palette (body text and muted text both exceed 4.5:1 on their surfaces; primary button text passes on its fill). Full keyboard focus treatment, visible focus rings, semantic landmarks, `prefers-reduced-motion` support, and meaningful alt text for real photos.
