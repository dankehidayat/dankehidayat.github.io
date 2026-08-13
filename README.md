# dankehidayat.my.id — Personal Portfolio

The personal website of **Danke Hidayat**, a junior software developer and DevOps engineer in Bandung, Indonesia. A single-page portfolio with a technical blog, a reading shelf, and a setup ledger — built with [Astro](https://astro.build) and deployed statically to GitHub Pages.

Live at [dankehidayat.my.id](https://dankehidayat.my.id).

## Design world

**Warm Signal** — a warm, saturated editorial-technical system, light-only, built for a CV-driven portfolio:

- **Palette.** Warm paper `#FBF5EA` field with a leaf-green / tangerine / saffron signal tricolor — green acts on primary buttons and links, tangerine leads the hero field (a radial gradient over film grain) and the contact band, saffron marks ticks, the hero status dot, and footer accents. No dark mode.
- **Typography.** **Bricolage Grotesque** for display and the hero name lockup, **Source Sans 3** for body copy, **JetBrains Mono** for metadata, dates, code, and technical labels. No cursive anywhere.
- **Structure.** Ledger rows with 1px hairlines and 2px signal lines; an arch portrait in a paper frame with a green signal-arch backing and a saffron keystone.
- **Motion.** GSAP + ScrollTrigger with Lenis smooth scrolling on the home page only: a hero entrance, scroll-triggered reveals, row hairline draws, and section-head reveals. Everything respects `prefers-reduced-motion`. Blog pages are static.
- **Content-first.** A one-page home with eight sections (Hero, About, Experience, Tech Stack, Projects, Notes, Certifications, Contact), a Notes blog, a **Shelf** — a catalog-drawer of manga, anime, light novels, fiction, and non-fiction with category filters, shelfmarks, and one page per entry — and a **Setup** ledger of the desk, tools, and dotfiles. Professional, measured tone throughout.

## Stack

- [Astro](https://astro.build) 5 — static output, content collections, view transitions
- [MDX](https://mdxjs.com) + [KaTeX](https://katex.org) — math in blog posts
- [Shiki](https://shiki.style) with a custom `warm-signal` theme — syntax highlighting
- [GSAP](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) + [Lenis](https://lenis.darkroom.engineering) — motion, home page only
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/) / [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — feeds and SEO

## Project structure

```text
├── public/
│   ├── shelf/covers/            # cover images for the Shelf
│   ├── favicon.svg
│   └── Resume_Danke_Hidayat.pdf
├── scripts/                    # dev tools: fetch-covers.mjs, generate-brand-icons.mjs, ...
├── src/
│   ├── assets/images/           # avatar, hero, social image
│   ├── components/              # Hero, About, ExperienceTimeline, Projects,
│   │                            # ProjectCard, BlogPreview, PostCard,
│   │                            # Certifications, Publications, ContactPanel,
│   │                            # SectionHeading, SiteNav, SiteFooter, Icon, ...
│   ├── content/
│   │   ├── blog/                # MDX posts (title, excerpt, date, tags, math)
│   │   ├── projects/            # project entries (title, description, date, seo)
│   │   └── shelf/               # MDX entries (title, creator, category, rating, links)
│   ├── data/                    # site-config, experience, about, certifications,
│   │                            # projects (tech + links), publications, stats,
│   │                            # setup (tools ledger + dotfiles), brand-icons
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro          # the single-page home
│   │   ├── notes/index.astro    # notes index
│   │   ├── notes/[id].astro     # post layout (680px reading column, KaTeX, code copy)
│   │   ├── shelf/index.astro    # the shelf drawer: filters + cover grid + catalog rows
│   │   ├── shelf/[slug].astro   # one catalog card per entry
│   │   ├── setup.astro          # the desk + software ledger
│   │   └── rss.xml.js
│   ├── lib/shelf.ts             # shelf sorting + shelfmarks (MNG·01, ANM·02, ...)
│   ├── scripts/                 # motion.ts (home), code-blocks.ts (copy buttons)
│   ├── styles/global.css        # design tokens + component styles
│   ├── content.config.ts        # collection schemas
│   └── types.ts
├── astro.config.mjs             # redirects, Shiki warm-signal theme, MDX/KaTeX
└── package.json
```

## Commands

All commands run from the project root:

| Command             | Action                                        |
| :------------------ | :-------------------------------------------- |
| `pnpm install`      | Install dependencies                          |
| `pnpm dev`          | Start the dev server at `localhost:4321`      |
| `pnpm build`        | Build the production site to `./dist/`        |
| `pnpm preview`      | Preview the production build locally          |
| `pnpm astro ...`    | Run Astro CLI commands                        |

## Writing content

### Blog posts

Add an `.mdx` file to `src/content/blog/` with frontmatter:

```yaml
---
title: 'A post title'
excerpt: 'One or two sentences that appear on the index.'
publishDate: 2025-10-17
tags: ['calibration', 'python']
seo:
  title: 'A post title'
  description: 'An SEO description.'
---
```

- Posts support `$math$` / `$$math$$` via KaTeX.
- Code blocks get a language label and a copy button automatically.
- Posts appear in reverse chronological order on `/notes` and in the RSS feed.

### Projects

Add a `.md` file to `src/content/projects/`. The tech stack and links shown on the project cards live in `src/data/projects.ts`, keyed by project id.

### Site-wide content

- `src/data/site-config.ts` — name, subtitle, description, social links
- `src/data/experience.ts` — work timeline, education, additional activities
- `src/data/about.ts` — the About section body (Markdown)
- `src/data/certifications.ts` — certification list with verify links
- `src/data/stats.ts` — the stats bar (years, projects, publications, certifications)
- `src/data/publications.ts` — publications list (rendered only when non-empty)
- `src/data/setup.ts` — Setup page: the hardware and tools ledgers and the archived Hyprland dotfile repos
- `src/data/brand-icons.ts` — brand logo paths for the tech stack

### Shelf entries

Add an `.mdx` file to `src/content/shelf/` with frontmatter:

```yaml
---
title: 'A book title'
english: 'An optional English title'
creator: 'Author name'
category: 'fiction'        # manga | anime | light-novel | fiction | non-fiction | romance
status: 'done'             # reading | done
rating: 8.5                # optional, 0–10
description: 'One paragraph that appears on the entry page.'
badge: 'favorite'          # optional: favorite | all-time
links:
  - label: 'Publisher'
    href: 'https://example.com'
---
```

Anything written below the frontmatter renders as the entry's field notes (a full review). Cover art lives in `public/shelf/covers/` as `{slug}.jpg` and is fetched/added with `scripts/fetch-covers.mjs`; entries without a cover render a monogram tile. Shelfmarks (`MNG·01`, `ANM·02`, ...) are assigned per category by `src/lib/shelf.ts`.

## Configuration

`astro.config.mjs` holds the site URL, MDX/KaTeX integration, the custom `warm-signal` Shiki theme, and redirects for the old portfolio routes (e.g. `/projects` → `/#projects`, `/id/...` → `/`, plus the retired `/fun` → `/shelf` and `/stats` → `/`).

## Deployment

Published to **GitHub Pages** by a GitHub Actions workflow (`.github/workflows/deploy.yml`) using the `withastro/action` workflow, with the `CNAME` file pointing at `dankehidayat.my.id`. The site is a fully static build and needs no server functions.

## License

Licensed under the [GPL-3.0](LICENSE) license. The site was originally built on the [Dante Astro theme](https://github.com/JustGoodUI/dante-astro-theme) (GPL-3.0) by JustGoodUI and has been fully redesigned for this project.
