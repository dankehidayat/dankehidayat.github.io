# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Hiring managers, recruiters, and technical collaborators evaluating Danke Hidayat for junior software, DevOps, IoT, embedded, or full-stack work. They need a clear, trustworthy picture of skills, shipped projects, work history, and how to reach him.

**Secondary:** Readers who discover the site through GitHub or social links (Bluesky, LinkedIn). They land on projects, experience, and proof of work.

## Product Purpose

Personal portfolio and professional presence for **Danke Hidayat** at [dankehidayat.my.id](https://dankehidayat.my.id).

The site makes it possible to:

- Present who Danke is, what he builds, and where he works — on a single page, scannable in one pass
- Show real project work (IoT, embedded, monitoring systems, DevOps) and career history
- Offer a low-friction path to contact (email, socials, resume PDF)

**Success (next year):** both inbound opportunities from the right people *and* a living, credible technical presence — portfolio first.

## Positioning

Junior Software Developer & DevOps Engineer who bridges **hardware and software into systems that work in the real world** — sensors, firmware, edge-to-cloud data, containers and deployments — prioritizing stability, simplicity, and clarity over flash.

Not a generic "full-stack portfolio": the durable claim is hands-on connected-device and integration work (ESP32/Arduino, calibration/monitoring, React/TypeScript dashboards, Docker/Ansible/Caddy), grounded in Computer Engineering training and current employment at PT. Labdha Teknika Nusantara.

## Operating Context

- **Static personal site** built with Astro 5, content collections for projects and shelf
- **Routes:** `/` (single-page: Hero, About, Experience, Projects, Certifications, Contact), `/folio` + `/folio/[slug]` (the plate folio, renamed 2026-09 from `/works`), `/florilegium` + `/florilegium/[slug]` (the reading florilegium, renamed 2026-09 from `/shelf`), `/atelier` (hardware/tools atelier, renamed 2026-09 from `/setup`), sitemap, `/404`; old routes (`/projects`, `/experience`, `/about`, `/contact`, plus their `/en/*` variants, and exact-path `/id`) redirect to their single-page anchors; `/works` (+ the six plate slugs) redirect to `/folio`; retired `/fun` → `/florilegium`, `/stats` → `/`; no redirects exist for `/shelf` or `/setup` — those routes are fully retired
- **Blog/notes removed (2026-09):** the `/notes` index and post pages, the blog content collection, the home notes preview, nav/footer notes links, and the `/rss.xml` feed were removed as a product decision; the florilegium's field-notes reviews are unrelated and remain
- **Florilegium:** `/florilegium` (formerly "Shelf") is a catalog drawer of Danke's manga, anime, light novels, fiction, and non-fiction — a "Freshly cut" panel for in-progress reading, category filter chips with live counts and an empty state, a cover grid with favorite hearts and monogram fallbacks, and a staggered cover wall. Each entry has its own page (`/florilegium/[slug]`) with cover, record meta, note, links, optional rating, and an optional field-notes review body plus previous/next card navigation. Entries are a content collection (`src/content/shelf/*.mdx`); covers live in `public/florilegium/covers/`; sorting and cover lookup come from `src/lib/shelf.ts`
- **Atelier:** `/atelier` (formerly "Setup") is the hardware-and-tools ledger — a hardware ledger (MacBook Pro M1, Weikav Alice Record keyboard, switch stash, mice, mousepad, audio, watch, charger), a tools ledger (Brave, VS Code, opencode, iTerm2), and a "Previously" archive with the old Arch + Hyprland dotfiles/bootstrap repo links plus dated archive media (the 2020 desk photo and 2019–2022 desktop-ricing screenshots opened in an in-page gallery dialog with source-repo links). Data lives in `src/data/setup.ts`
- **Language:** English only (Indonesian routes removed in the 2026 redesign)
- **Theme:** light-first with a working dark theme toggle (owner decision 2026-09, supersedes the 2026-07 light-only commitment)
- **Identity sources:** `src/data/site-config.ts`, `src/data/experience.ts`, `src/data/about.ts`, `src/data/certifications.ts`, `src/data/projects.ts`, `src/data/stats.ts`, `src/data/publications.ts`, `src/data/setup.ts`, Markdown/MDX in `src/content/` (projects, shelf), resume at `public/Resume_Danke_Hidayat.pdf`
- **Public URL:** https://dankehidayat.my.id
- **Social / external:** GitHub, Bluesky, LinkedIn (as linked on the site)
- **Authoring model:** Markdown/MDX content + data files; no app login or multi-user roles

## Capabilities and Constraints

**Capabilities (confirmed in the product today):**

- Single-page home: hero with arch portrait and two actions; About with stats bar; work experience timeline; tech stack ledger; six project cards; certifications list; contact panel with email, socials, and resume
- Florilegium (`/florilegium`): 35 catalogued entries across six categories; client-side category filters that re-bind on view-transition navigation (`astro:page-load`), cover grid with monogram fallbacks, catalog rows, and per-entry pages ready for owner-written reviews and ratings
- Atelier (`/atelier`): hardware and tools ledgers, dotfiles links, and the ricing archive; built to accept a desk photo later without redesign
- SEO: canonical URLs, Open Graph, sitemap; `theme-color` (`#F6F1E6` light / `#17150F` dark, synced by the pre-paint theme script and re-applied across soft navigations) and `light dark` `color-scheme`
- Motion is choreographed on the home page only (GSAP + ScrollTrigger entrance/reveals, SplitText chapter heads, Lenis smooth scroll, timeline rail draw); the freshly-cut 3D plate tilt with tracking glare is site-wide across all six pages; the chapter rail is on home, folio, florilegium, and atelier. All of it is static under `prefers-reduced-motion`, and the motion bundle is deferred off the critical path
- A seven-spec Playwright suite (`tests/`) is the regression gate: smoke, accessibility, theme, reduced-motion, responsive, images, and a project contract spec; `DESIGN.md` records these as durable design invariants
- Responsive image delivery: every plate, cover, screenshot, and gallery frame goes through `src/lib/responsive-image.ts`, which caps a width ladder at the source's own width (never upscales) and always ships intrinsic dimensions

**Constraints:**

- Single-author personal site; no product multi-tenancy or auth
- Content and claims must stay factual; do not invent employers, metrics, clients, or testimonials
- Stats bar and Publications section are **evidence-gated**: values and entries render only when the owner supplies them from the CV (`src/data/stats.ts`, `src/data/publications.ts` — currently placeholders)
- Theme origin is Just Good UI's Dante (GPL-3.0); product identity is Danke's, not the theme brand

**Confirmed after redesign brief (2026-07):**

- **Language:** English only; no i18n, no `/id/` routes
- **Theme:** light-first with a working dark toggle (2026-09; supersedes light-only)
- **Visual world:** the Botanical Folio, shipped 2026-09 (plate-cream ground, hairline sepia rules, engraved serif, lilac bloom accent retuning the folio scarlet per owner pin); the durable tokens and the verification contract are recorded in `DESIGN.md`. Prior world was Warm Signal — warm paper `#FBF5EA`, green/tangerine/saffron tricolor, Bricolage Grotesque display, ledger rows and signal ticks; its `tangerine`/`saffron` variable names survive in `global.css` as dead aliases remapped onto lilac and sage
- **Personality:** professional, measured tone on the main page; personal interests (yuri, BanG Dream!, Japanese) stay out of the professional bio
- **Motion:** GSAP + ScrollTrigger + Lenis smooth scroll, home page only

**Still open:**

- Owner-supplied publication entries and stats numbers (currently marked placeholders)
- Deployment target is the owner's infrastructure call (repo ships the GitHub Pages workflow; static output deploys anywhere)

## Brand Commitments

- **Name:** Danke Hidayat
- **Role framing:** Junior Software Developer & DevOps Engineer (site subtitle / positioning)
- **Education:** IPB University (Institut Pertanian Bogor) — an agricultural (*pertanian*) institution; owner-confirmed background (2026-09)
- **Employer (current):** PT. Labdha Teknika Nusantara
- **Domain / email:** dankehidayat.my.id · contact@dankehidayat.my.id
- **Voice:** First-person, clear, technical, measured; specifics over generalizations; no hype words ("passionate", "excited", "thrilled") in professional copy

## Evidence on Hand

Real assets and content that future work must use or honestly omit — not fabricate:

| Kind | Location / note |
|------|-----------------|
| Avatar & hero imagery | `src/assets/images/avatar.jpeg`, `hero.jpeg` |
| Resume PDF | `public/Resume_Danke_Hidayat.pdf` |
| Projects | selene, flowpoint-next, flora, eco-office, ecobin-sorter, hydrolevi (`src/content/projects/` + `src/data/projects.ts` for tech/links). `src/content/projects/neon.md` also exists but is deliberately excluded from the folio's curated six (`FOLIO_WORK_IDS` in `src/data/works.ts`) |
| Experience / education | `src/data/experience.ts` |
| Certifications | Eleven credentials with verify links (`src/data/certifications.ts`) |
| Site copy & nav | `src/data/site-config.ts` |
| Social links | GitHub, Bluesky, LinkedIn as published |

**Absences:** No third-party testimonials, client case-study metrics, press quotes, or paid product claims on hand. No publications data or confirmed stat numbers yet — `src/data/stats.ts` and `src/data/publications.ts` hold marked placeholders until the owner supplies real values from the CV. Do not invent them.

## Product Principles

1. **Professional first** — Help evaluators decide quickly on the single page; keep personal interests out of the professional copy.
2. **Show real work, not claims** — Projects, experience, and resume are the proof; unsubstantiated polish is not.
3. **Clarity over spectacle** — Stability and simplicity in systems mirror how the site should communicate: scannable, honest, decision-friendly.
4. **Measured voice** — Direct, first-person, technical; specifics over generalizations.
5. **Preserve published truth** — Existing pages, projects, and links stay in scope unless the owner deliberately changes them.

## Accessibility & Inclusion

Light-first with a full dark ("night herbarium") token set applied through `data-theme`; body text and muted text both exceed 4.5:1 on their surfaces in both themes, and primary button text passes on its fill. An explicit theme choice persists across client-side navigations. Full keyboard focus treatment, visible focus rings, semantic landmarks, `prefers-reduced-motion` support, and meaningful alt text for real photos. Tap targets meet 24×24 CSS px (44×44 for the mobile menu disclosure).
