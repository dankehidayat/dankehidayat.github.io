# dankehidayat.my.id — Personal Portfolio

The personal website of **Danke Hidayat**, a junior software developer and DevOps engineer in Bandung, Indonesia. A single-page portfolio with a technical blog, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com) v4, deployed statically to GitHub Pages.

Live at [dankehidayat.my.id](https://dankehidayat.my.id).

## Design world

**Warm Signal** — a warm, saturated editorial-technical system, light-only, built for a CV-driven portfolio:

- **Palette.** Warm paper `#FBF5EA` field with a leaf-green / tangerine / saffron signal tricolor — green acts on primary buttons and links, tangerine leads the hero field (a radial gradient over film grain) and the contact band, saffron marks ticks, the hero status dot, and footer accents. No dark mode.
- **Typography.** **Bricolage Grotesque** for display and the hero name lockup, **Source Sans 3** for body copy, **JetBrains Mono** for metadata, dates, code, and technical labels. No cursive anywhere.
- **Structure.** Ledger rows with 1px hairlines and 2px signal lines; an arch portrait in a paper frame with a green signal-arch backing and a saffron keystone.
- **Motion.** GSAP + ScrollTrigger with Lenis smooth scrolling on the home page only: a hero entrance, scroll-triggered reveals, row hairline draws, and section-head reveals. Everything respects `prefers-reduced-motion`. Blog pages are static.
- **Content-first.** A one-page home with eight sections (Hero, About, Experience, Tech Stack, Projects, Notes, Certifications, Contact), a Notes blog, and a Fun page for the leisurely stuff: a cover grid of yuri manga, anime, and light novels that opens a detail dialog (creator, note, buy/read links) on tap, plus a music corner with a live last.fm now-playing card, Spotify embeds grouped by artist, and artist links. Professional, measured tone throughout.

## Stack

- [Astro](https://astro.build) 5 — static output, content collections, view transitions
- [Tailwind CSS](https://tailwindcss.com) 4 — via `@tailwindcss/vite`
- [MDX](https://mdxjs.com) + [KaTeX](https://katex.org) — math in blog posts
- [Shiki](https://shiki.style) with a custom `warm-signal` theme — syntax highlighting
- [GSAP](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) + [Lenis](https://lenis.darkroom.engineering) — motion, home page only
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/) / [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — feeds and SEO

## Project structure

```text
├── public/
│   ├── fun/covers/             # locally stored cover images for the Fun page
│   ├── favicon.svg
│   └── Resume_Danke_Hidayat.pdf
├── api/
│   └── now-playing.mjs         # Vercel serverless fn: last.fm now-playing (reads .env)
├── scripts/                    # dev tools: fetch-covers.mjs, serve-local.mjs, ...
├── .env.example                # LASTFM_API_KEY / LASTFM_USERNAME template
├── src/
│   ├── assets/images/           # avatar, hero, social image
│   ├── components/              # Hero, About, ExperienceTimeline, Projects,
│   │                            # ProjectCard, BlogPreview, PostCard,
│   │                            # Certifications, Publications, ContactPanel,
│   │                            # FunCard, SectionHeading, SiteNav, SiteFooter, Icon, ...
│   ├── content/
│   │   ├── blog/                # MDX posts (title, excerpt, date, tags, math)
│   │   └── projects/            # project entries (title, description, date, seo)
│   ├── data/                    # site-config, experience, about, certifications,
│   │                            # projects (tech + links), publications, stats,
│   │                            # fun (manga/anime/LN + music), brand-icons
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro          # the single-page home
│   │   ├── blog/index.astro     # notes index
│   │   ├── blog/[id].astro      # post layout (680px reading column, KaTeX, code copy)
│   │   ├── fun.astro            # the leisure corner: manga/anime/LN grid + dialog + music
│   │   └── rss.xml.js
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
| `pnpm preview:api`  | Local preview that also serves `/api/now-playing` (reads `.env`) |
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
- Posts appear in reverse chronological order on `/blog` and in the RSS feed.

### Projects

Add a `.md` file to `src/content/projects/`. The tech stack and links shown on the project cards live in `src/data/projects.ts`, keyed by project id.

### Site-wide content

- `src/data/site-config.ts` — name, subtitle, description, social links
- `src/data/experience.ts` — work timeline, education, additional activities
- `src/data/about.ts` — the About section body (Markdown)
- `src/data/certifications.ts` — certification list with verify links
- `src/data/stats.ts` — the stats bar (years, projects, publications, certifications)
- `src/data/publications.ts` — publications list (rendered only when non-empty)
- `src/data/fun.ts` — Fun page entries: manga / anime & light novels (title, creator, note, cover path, buy/read links, favorite flag) plus music tracks grouped by artist and artist links
- `src/data/brand-icons.ts` — brand logo paths for the tech stack

The Fun page grid and its detail dialog are driven by `src/data/fun.ts`; cover art lives in `public/fun/covers/` and is fetched/added with `scripts/fetch-covers.mjs`.

## last.fm now-playing

The Fun page shows what's currently playing via [last.fm](https://www.last.fm/api). On Vercel, `api/now-playing.mjs` runs as a serverless function and reads two environment variables (never shipped to the client):

```env
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_USERNAME=your_lastfm_username
```

Get a key at https://www.last.fm/api/account/create.

**On Vercel:** add both variables in Vercel → Project → Settings → Environment Variables (Production and Preview), commit `api/now-playing.mjs`, and redeploy. A local `.env` is gitignored and never uploaded, so it alone does not make the card appear in production.

**Locally:** `astro dev` and `astro preview` do not serve the `api/` folder, so the card stays hidden under those commands. To preview with the live card, run `pnpm build` then `pnpm preview:api` — it serves the built site plus the function and reads `.env`.

The client fetches `/api/now-playing`; if the function is absent (GitHub Pages) or unconfigured, the card simply stays hidden.

## Configuration

`astro.config.mjs` holds the site URL, MDX/KaTeX integration, the custom `salmon-light` Shiki theme, and redirects for the old portfolio routes (e.g. `/projects` → `/#projects`, `/id/...` → `/`).

## Deployment

Deployed to **Vercel** (which serves the static build and runs `api/now-playing.mjs` as a serverless function). The repo also includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that publishes to **GitHub Pages** via the `withastro/action` workflow, with the `CNAME` file pointing at `dankehidayat.my.id`; on that host the now-playing card simply stays hidden since there is no serverless function.

## License

Licensed under the [GPL-3.0](LICENSE) license. The site was originally built on the [Dante Astro theme](https://github.com/JustGoodUI/dante-astro-theme) (GPL-3.0) by JustGoodUI and has been fully redesigned for this project.
