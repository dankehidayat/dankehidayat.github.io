# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Hiring managers, recruiters, and technical collaborators evaluating Danke Hidayat for junior software, IoT, embedded, or full-stack work. They need a clear, trustworthy picture of skills, shipped projects, work history, and how to reach him—while also getting a sense of the person behind the resume.

**Secondary:** Readers who discover the blog (RSS, social, or via the portfolio). Writing supports credibility and personality; it is not the primary job of the site.

## Product Purpose

Personal portfolio and professional presence for **Danke Hidayat** at [dankehidayat.my.id](https://dankehidayat.my.id).

The site makes it possible to:

- Present who Danke is, what he builds, and where he works
- Show real project work (IoT, embedded, monitoring systems) and career history
- Share technical and personal writing
- Offer a low-friction path to contact (email, socials, resume PDF)

**Success (next year):** both inbound opportunities from the right people *and* a living, credible technical presence—portfolio with personality first; writing second.

## Positioning

Junior software developer and IoT engineer who bridges **hardware and software into systems that work in the real world**—sensors, firmware, edge-to-cloud data, mobile/web interfaces—prioritizing stability, simplicity, and clarity over flash.

Not a generic “full-stack portfolio”: the durable claim is hands-on connected-device and integration work (ESP32/Arduino, LoRaWAN, calibration/monitoring, Flutter/SvelteKit when the project needs an interface), grounded in Computer Engineering training and current employment at PT. Labdha Teknika Nusantara.

## Operating Context

- **Static personal site** built with Astro + Tailwind (Dante theme lineage), content collections for blog, projects, and static pages
- **Routes visitors use:** Home (hero + featured work/writing), Projects, Experience, Blog (+ tags), About, Contact; RSS and sitemap
- **Identity sources:** `src/data/site-config.ts`, Markdown in `src/content/`, resume at `public/Resume_Danke_Hidayat.pdf`
- **Public URL:** https://dankehidayat.my.id
- **Social / external:** GitHub, Bluesky, LinkedIn, Instagram, Last.fm, AniList (as linked in content)
- **Authoring model:** Markdown/MDX content + site-config; dark/light theme; no app login or multi-user roles

## Capabilities and Constraints

**Capabilities (confirmed in the product today):**

- Hero bio with primary CTA to Contact
- Project portfolio (listing + detail), blog (listing, detail, tags, pagination), Experience, About, Contact
- RSS feed; SEO (canonical, Open Graph, sitemap)
- Theme toggle (light/dark)
- Resume download (PDF)
- Subscribe block points visitors to RSS (not a third-party email form as primary)

**Constraints:**

- Single-author personal site; no product multi-tenancy or auth
- Content and claims must stay factual; do not invent employers, metrics, clients, or testimonials
- Theme origin is Just Good UI’s Dante (GPL-3.0); product identity is Danke’s, not the theme brand
- Technical stack (Astro 5, Tailwind 4, content collections) is current implementation, not a product promise to visitors

**Confirmed after redesign brief (2026-07):**

- **i18n:** English (default, unprefixed) + Indonesian (`/id/…`). UI chrome and key marketing strings are bilingual; long-form blog/project bodies may remain English until translated.
- **Atmosphere:** Night Signal (deep lab field); mint “online” signal + warm ember accent; soft organic modules — not square gallery cards.
- **Motion:** GSAP + ScrollTrigger only (hero typeset, scroll reveals). **No** Lenis / third-party smooth scroll.
- **Visual world (2026 redesign):** Night Signal — Unbounded display + Manrope UI, typeset-first hero, EN/ID + blog/RSS retained.

**Still open:**

- Whether newsletter email capture should replace or complement RSS-only subscribe
- Specific role/title targets beyond the stated junior software / IoT / embedded / connected-device focus
- Full Indonesian translations of long-form markdown content

## Brand Commitments

- **Name:** Danke Hidayat
- **Role framing:** Junior Software Developer & IoT Engineer (site subtitle / positioning)
- **Employer (current):** PT. Labdha Teknika Nusantara
- **Domain / email:** dankehidayat.my.id · contact@dankehidayat.my.id
- **Voice:** First-person, clear and technical without empty hype; comfortable mixing engineering depth with personal interests (manga/light novels especially yuri, BanG Dream! / The iDOLM@STER, Japanese language, music)
- **Personality is part of the product:** portfolio leads, but personal interests and writing remain legitimate site content—not optional decoration to strip by default

## Evidence on Hand

Real assets and content that future work must use or honestly omit—not fabricate:

| Kind | Location / note |
|------|-----------------|
| Avatar & hero imagery | `src/assets/images/avatar.jpeg`, `hero.jpeg`, `about.jpg` |
| Resume PDF | `public/Resume_Danke_Hidayat.pdf` |
| Projects | Energy & Temperature Monitoring; HydroleVI Water Levelling Monitoring Control System; IoT-based Automatic Trash Bin Sorter (`src/content/projects/`) |
| Blog posts | Six posts (society/tech opinion, performance, anime review, Japanese input guide, calibration/Colab) in `src/content/blog/` |
| About / Experience / Contact | `src/content/pages/` |
| Site copy & nav | `src/data/site-config.ts` |
| Social proof links | GitHub, Bluesky, LinkedIn, Instagram, AniList, Last.fm as published |

**Absences:** No third-party testimonials, case-study metrics from clients, press quotes, or paid product claims on hand. Do not invent them.

## Product Principles

1. **Portfolio with personality first** — Help evaluators decide quickly, without sanding off who Danke is.
2. **Show real work, not claims** — Projects, experience, resume, and writing are the proof; unsubstantiated polish is not.
3. **Clarity over spectacle** — Stability and simplicity in systems mirror how the site should communicate: scannable, honest, decision-friendly.
4. **Writing is secondary, not discarded** — Blog and interests deepen trust and voice; they should not compete with or bury the professional job.
5. **Preserve published truth** — Existing pages, projects, posts, and links stay in scope unless the owner deliberately changes them.

## Accessibility & Inclusion

No product-specific legal standard was established beyond ordinary good practice for a public personal site (readable type, contrast, keyboard-usable controls, meaningful alt text for real photos). Prefer inclusive defaults when changing UI.
