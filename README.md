# dankehidayat.my.id — Personal Portfolio

The personal website of **Danke Hidayat**, a junior software developer and DevOps engineer in Bandung, Indonesia. A single-page portfolio presented as a botanical herbarium, with a plate folio of shipped work, a reading florilegium, and a hardware atelier — built with [Astro](https://astro.build) and deployed statically to GitHub Pages.

Live at [dankehidayat.my.id](https://dankehidayat.my.id).

## Design world

**Botanical Folio** — a plate-cream herbarium system, light-first with a real dark theme, built for a CV-driven portfolio:

- **Palette.** Plate-cream paper `#f6f1e6` field with leaf-green ink (`#2e5e3d`) leading headings, focus rings, and links, and **lilac bloom** (`#7b5c9e`) as the single heat — primary buttons, active nav, the contact peak. Sepia hairlines (`#d9cdb5`) draw all structure. A full night-herbarium dark set ships through `data-theme`; the toggle is icon-only and its choice survives every client-side navigation.
- **Typography.** **Bodoni Moda** (Didone engraving) for display and the hero name lockup, **Newsreader** for reading, **Source Sans 3** for tracked small-caps labels, **JetBrains Mono** for plate numbers and ledger data. The display face loads weight-only; the optical-size axis is pinned off on purpose.
- **Structure.** Numbered specimen plates at fixed scale in a double-rule arch, like a pressed flower under glass; hairline ledger rows and double rules instead of cards; a fixed chapter rail down the left edge with a luminance-aware progress fill.
- **Motion.** GSAP + ScrollTrigger + Lenis on the home folio: a hero entrance, scroll-triggered reveals, SplitText chapter heads, a timeline rail draw, and a pointer-driven 3D tilt with a tracking glare on each freshly-cut plate. Everything respects `prefers-reduced-motion`; the bundle is deferred off the critical path so none of it competes with LCP. Other pages are static.
- **Content-first.** A one-page home (Hero, About, Experience, Folio set-piece, Credentials, Contact), a **Folio** of six numbered project plates, a **Florilegium** catalog of 35 manga, anime, light novels, fiction, and non-fiction entries with category filters and a page per entry, and an **Atelier** ledger of hardware, tools, and dotfiles. Professional, measured tone throughout.

The full system — tokens, type scale, components, named rules, and the verification contract — lives in [DESIGN.md](DESIGN.md).

## Stack

- [Astro](https://astro.build) 5 — static output, content collections, view transitions (`ClientRouter`)
- [Tailwind CSS](https://tailwindcss.com) v4 via `@tailwindcss/vite` — utility layer alongside the hand-written design tokens
- [MDX](https://mdxjs.com) — content collections for projects and florilegium entries
- [GSAP](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) + [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) + [Lenis](https://lenis.darkroom.engineering) — motion, home page only, dynamically imported
- [@hugeicons/core-free-icons](https://hugeicons.com) — the functional icon set, rendered at `currentColor` via `src/components/Icon.astro`
- [sharp](https://sharp.pixelplumbing.com) + `astro:assets` — responsive image ladders sized to each slot
- [Shiki](https://shiki.style) with transformers — syntax highlighting for MDX code fences
- [@fontsource-variable](https://fontsource.org) — self-hosted Bodoni Moda, Newsreader, Source Sans 3, JetBrains Mono
- [Playwright](https://playwright.dev) — the seven-spec regression suite that gates every visual change
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — SEO

## Routes

| Route | Surface |
| :--- | :--- |
| `/` | The folio home — hero, about, experience, folio set-piece, credentials, contact |
| `/folio/` | Plate index, grouped by category |
| `/folio/[slug]/` | One specimen plate per project |
| `/florilegium/` | The catalog drawer — category filters with live counts, cover grid, staggered wall |
| `/florilegium/[slug]/` | One record sheet per entry, with optional field-notes review |
| `/atelier/` | Hardware and tools ledgers, dotfiles links, and the ricing archive |
| `/404` | Not found |

Retired surfaces redirect rather than 404: the old portfolio anchors (`/projects`, `/about`, `/experience`, `/contact`) and their `/en/*` variants point at home anchors, `/works` and its six plate slugs point at `/folio`, and `/fun` and `/stats` point at `/florilegium` and `/`.

## Project structure

```text
├── public/
│   ├── CNAME                     # dankehidayat.my.id
│   ├── favicon.svg
│   └── Resume_Danke_Hidayat.pdf
├── scripts/                      # dev tools: fetch-covers.mjs, generate-brand-icons.mjs, + manifests
├── tests/                        # Playwright regression suite (see Verification below)
├── src/
│   ├── assets/images/            # avatar, hero, folio engravings, project shots,
│   │                             # florilegium covers, atelier archive media
│   ├── components/               # BaseHead, SiteNav, SiteFooter, ThemeToggle, Icon,
│   │                             # ChapterRail, PlateFigure, MarqueeBand, ScreenshotMarquee
│   ├── content/
│   │   ├── projects/             # project entries (.md)
│   │   └── shelf/                # florilegium entries (.mdx)
│   ├── data/                     # site-config, experience, about, certifications,
│   │                             # projects, works (plates + categories), stats,
│   │                             # publications, setup (atelier), extra-lilies
│   ├── layouts/BaseLayout.astro
│   ├── lib/                      # shelf.ts, huge-icons.ts, responsive-image.ts
│   ├── pages/                    # index, folio/, florilegium/, atelier, 404
│   ├── scripts/                  # motion.ts (GSAP), defer-motion.ts (loader)
│   ├── styles/                   # global.css (tokens + base), folio.css (components)
│   ├── content.config.ts         # collection schemas
│   └── types.ts
├── astro.config.mjs              # site URL, MDX/Shiki, redirects, sitemap, tailwind
├── playwright.config.ts
├── DESIGN.md                     # the design system
├── PRODUCT.md                    # durable product context
└── package.json
```

## Commands

All commands run from the project root:

| Command          | Action                                             |
| :--------------- | :------------------------------------------------- |
| `pnpm install`   | Install dependencies                               |
| `pnpm dev`       | Start the dev server at `localhost:4321`           |
| `pnpm build`     | Build the production site to `./dist/`             |
| `pnpm preview`   | Preview the production build locally               |
| `pnpm test`      | Run the Playwright regression suite                |
| `pnpm test:ui` | Run the suite in Playwright's interactive UI |
| `pnpm test:report` | Open the last HTML report |
| `pnpm astro ...` | Run Astro CLI commands |

`pnpm test` builds the site first (Playwright's `webServer` runs `astro preview`), then runs three projects: `desktop-chrome` at 1440×900, `mobile-chrome` on a Pixel 7, and a `reduced-motion` project that emulates `prefers-reduced-motion: reduce`.

## Writing content

### Projects

Add a `.md` file to `src/content/projects/`:

```yaml
---
title: 'Selene'
description: 'One or two sentences for the plate and the meta description.'
publishDate: 'Jul 01 2026'
isFeatured: true
seo:
    title: 'Selene — real-time energy monitoring'
    description: 'An ESP32 telemetry dashboard over MQTT and TimescaleDB.'
    pageType: 'article'
---
```

The body is the plate's long-form note; the first line renders as a link row. The tech stack, repo, and live links shown on the card live in `src/data/projects.ts`, keyed by project id, and the plate's category, number, and imagery come from `src/data/works.ts` (`WORK_CATEGORIES` and `isFolioWork` / `plateNumberOf`).

### Florilegium entries

Add an `.mdx` file to `src/content/shelf/`:

```yaml
---
title: 'Lycoris Recoil'
english: 'Optional English title'
creator: 'A-1 Pictures'
category: 'anime'        # manga | anime | light-novel | fiction | non-fiction | romance
status: 'done'           # reading | done
rating: 8.5              # optional, 0–10
description: 'One paragraph for the card and the record sheet.'
note: 'A short line shown under the description.'
badge: 'favorite'        # optional: favorite | all-time
cover: 'optional-file-slug'   # only when the jacket differs from the entry id
links:
    - label: 'Official site'
      href: 'https://lycoris-recoil.com'
---
```

Anything written below the frontmatter renders as the entry's **field notes** — a full review. Cover art lives in `src/assets/images/covers/`; `scripts/fetch-covers.mjs` fetches jackets against the manifests in `scripts/`, and entries without a cover render a monogram tile. Sorting and cover lookup come from `src/lib/shelf.ts`.

### Site-wide content

- `src/data/site-config.ts` — name, subtitle, description, avatar/hero, social links
- `src/data/experience.ts` — work timeline, education, additional activities
- `src/data/about.ts` — the About section body
- `src/data/certifications.ts` — certification list with verify links
- `src/data/stats.ts` — the stats bar (years, projects, publications, certifications)
- `src/data/publications.ts` — publications list (rendered only when non-empty)
- `src/data/works.ts` — plate definitions, categories, and plate numbering
- `src/data/projects.ts` — tech stacks and links per project
- `src/data/setup.ts` — the Atelier page: hardware and tools ledgers, archived dotfile repos
- `src/data/extra-lilies.ts` — the additional botanical plates

`stats.ts` and `publications.ts` are **evidence-gated**: they render only when the owner supplies real values. Do not invent numbers.

## Verification

`DESIGN.md` ends with the verification contract — the machine-checked half of the design system. A red spec is a design regression, not a flaky test.

| Spec | Holds |
| :--- | :--- |
| `smoke` | Every route serves 200 with one `h1`; complete head, canonical, and social cards; no broken internal links or dead in-page anchors |
| `accessibility` | Heading order and landmarks; accessible names on every control; no positive `tabindex`; valid `lang`; `alt` on every image; visible focus |
| `theme` | OS preference resolves when nothing is stored; an explicit choice applies on load and survives two soft navigations; the toggle syncs `theme-color` |
| `reduced-motion` | The media query is genuinely in force; no transform survives on any motion target; all copy stays visible and unpainted |
| `responsive` | No horizontal overflow at any breakpoint; the mobile menu opens, is keyboard reachable, closes on Escape, and releases the scroll lock; 24×24 minimum targets |
| `images` | Every `<img>` declares `srcset`, `sizes`, and intrinsic dimensions; every URL resolves; nothing upscales past its master; the home page stays under 3 MB |
| `contract` | The world seed leads the body exactly once; the weight-only font pin holds; no generated-image artifact reaches the build |

## Configuration

`astro.config.mjs` holds the site URL, the Tailwind Vite plugin, MDX with Shiki transformers, the sitemap, and the redirect table for every retired route. Two things there are deliberate leftovers rather than active features: the Shiki theme object is still internally named `warm-signal` from the previous design world, and the KaTeX math plugins remain wired for MDX even though no entry uses math. `@astrojs/rss` is still in `package.json` but nothing imports it since the feed was retired.

The display face must stay on the **weight-only** variable build. Shipping an `opsz` build alongside it regressed the display type once; `tests/contract.spec.ts` fails the build if it returns.

## Deployment

Published to **GitHub Pages** by `.github/workflows/deploy.yml` using the `withastro/action` workflow, with pnpm `10.25.0` and a `CNAME` file pointing at `dankehidayat.my.id`. The site is a fully static build and needs no server functions.

## License

Licensed under the [GPL-3.0](LICENSE) license. The site was originally built on the [Dante Astro theme](https://github.com/JustGoodUI/dante-astro-theme) (GPL-3.0) by JustGoodUI and has been fully redesigned for this project.
