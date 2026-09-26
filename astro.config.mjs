import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {
    transformerMetaHighlight,
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight
} from '@shikijs/transformers';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import siteConfig from './src/data/site-config';

/**
 * Preserve `title="file.py"` from a code fence as a data-file attribute on
 * the <pre>, so the code-block header can show the file name.
 */
function transformerTitleToFile() {
    return {
        name: 'title-to-file',
        pre(node) {
            const raw = this.options.meta?.__raw ?? '';
            const m = raw.match(/title\s*=\s*"([^"]+)"/);
            if (m) node.properties['data-file'] = m[1];
        }
    };
}

/**
 * warm-signal — Warm Signal code surface.
 * Warm paper code field with the palette's green / tangerine family.
 */const salmonLightTheme = {
    name: 'warm-signal',
    type: 'light',
    colors: {
        'editor.background': '#F1E7D0',
        'editor.foreground': '#453B2E',
        'editor.lineHighlightBackground': '#E4D9C2',
        'editor.selectionBackground': '#E5A81C'
    },
    tokenColors: [
        {
            scope: ['comment', 'punctuation.definition.comment', 'comment.block'],
            settings: { foreground: '#8A7A5F', fontStyle: 'italic' }
        },
        {
            scope: ['keyword', 'keyword.control', 'storage', 'storage.type', 'keyword.operator.word'],
            settings: { foreground: '#B8430E' }
        },
        {
            scope: ['string', 'string.template', 'string.interpolated', 'punctuation.definition.string'],
            settings: { foreground: '#1E6B4A' }
        },
        {
            scope: ['entity.name.function', 'support.function', 'meta.function-call', 'entity.name.function.macro'],
            settings: { foreground: '#155236' }
        },
        {
            scope: ['constant.numeric', 'constant.language', 'constant', 'entity.name.constant'],
            settings: { foreground: '#B38614' }
        },
        {
            scope: ['entity.name.type', 'support.type', 'entity.name.class', 'entity.name.namespace', 'meta.type'],
            settings: { foreground: '#E05D1E' }
        },
        {
            scope: ['variable', 'variable.other', 'variable.parameter', 'meta.definition.variable'],
            settings: { foreground: '#5A4D3C' }
        },
        {
            scope: ['operator', 'punctuation', 'punctuation.separator', 'punctuation.definition.tag'],
            settings: { foreground: '#7A6C59' }
        },
        {
            scope: ['markup.bold', 'strong'],
            settings: { fontStyle: 'bold' }
        },
        {
            scope: ['markup.italic', 'em'],
            settings: { fontStyle: 'italic' }
        },
        {
            scope: ['markup.heading', 'markup.heading markup.bold'],
            settings: { foreground: '#155236', fontStyle: 'bold' }
        },
        {
            scope: ['markup.quote'],
            settings: { foreground: '#8A7A5F', fontStyle: 'italic' }
        },
        {
            scope: ['markup.link', 'markup.underline.link', 'constant.other.reference.link'],
            settings: { foreground: '#B8430E' }
        },
        {
            scope: ['meta.embedded.block', 'source'],
            settings: { foreground: '#453B2E' }
        },
        {
            scope: ['punctuation.definition.bracket', 'punctuation.definition.parameters'],
            settings: { foreground: '#7A6C59' }
        }
    ]
};

const RASTER = /\.(jpe?g|png|webp|avif|gif)$/i;

/**
 * pruneUnusedRasters — drop the full-resolution masters from the build.
 *
 * Every `import img from './photo.jpg'` makes Vite emit the original file so
 * the module has a URL to hand back — even when the page only renders the
 * width-laddered WebP variants (see src/lib/responsive-image.ts). Those
 * originals are never referenced by any page, so no browser ever requests
 * them; they are pure deploy weight, and a big one: the pre-ladder masters
 * alone were 16MB.
 *
 * Runs on `astro:build:done` and deletes a raster under `_astro/` only when
 * its exact filename appears in no other file in the build at all. That makes
 * it safe by construction — a referenced asset can never be dropped.
 */
function pruneUnusedRasters() {
    return {
        name: 'prune-unused-rasters',
        hooks: {
            'astro:build:done': ({ dir }) => {
                const fs = require('node:fs');
                const path = require('node:path');
                const root = fileURLToPath(dir);
                const assetsDir = path.join(root, '_astro');
                if (!fs.existsSync(assetsDir)) return;

                // Every file in the build, as text. Binary reads are lossy but
                // a false positive here only means we keep a file, never drop one.
                const haystack = [];
                const walk = (d) => {
                    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
                        const full = path.join(d, entry.name);
                        if (entry.isDirectory()) walk(full);
                        else haystack.push(fs.readFileSync(full).toString('utf8'));
                    }
                };
                walk(root);
                const blob = haystack.join('\n');

                let bytes = 0;
                let count = 0;
                for (const name of fs.readdirSync(assetsDir)) {
                    if (!RASTER.test(name)) continue;
                    if (blob.includes(name)) continue;
                    const full = path.join(assetsDir, name);
                    bytes += fs.statSync(full).size;
                    fs.unlinkSync(full);
                    count += 1;
                }
                if (count > 0) {
                    const mb = (bytes / 1024 / 1024).toFixed(1);
                    console.log(`[prune-unused-rasters] removed ${count} unreferenced raster(s), ${mb}MB`);
                }
            }
        }
    };
}

// https://astro.build/config
export default defineConfig({
    site: siteConfig.website,
    vite: {
        plugins: [tailwindcss()]
    },    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        shikiConfig: {
            theme: salmonLightTheme,
            wrap: false,
            transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationWordHighlight(),
                transformerMetaHighlight(),
                transformerTitleToFile()
            ]
        }
    },
    redirects: {
        '/projects': '/#folio',
        '/experience': '/#experience',
        '/about': '/#about',
        '/contact': '/#contact',
        // Works → Folio rename (2026-09-26): exact paths only — rest-param
        // redirects do not work in a static build.
        '/works': '/folio',
        '/works/selene': '/folio/selene',
        '/works/flowpoint-next': '/folio/flowpoint-next',
        '/works/flora': '/folio/flora',
        '/works/eco-office': '/folio/eco-office',
        '/works/ecobin-sorter': '/folio/ecobin-sorter',
        '/works/hydrolevi': '/folio/hydrolevi',
        '/id': '/',
        // Retired surfaces: music/stats removed, fun folded into the Florilegium.
        '/stats': '/',
        '/fun': '/florilegium',
        // Stale i18n-era URLs (the old site served an /en/ locale prefix).
        // Exact paths only — rest-param redirects do not work in a static build.
        '/en': '/',
        '/en/projects': '/#folio',
        '/en/experience': '/#experience',
        '/en/about': '/#about',
        '/en/contact': '/#contact'
    },
    integrations: [
        pruneUnusedRasters(),
        mdx({
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
            extendMarkdownConfig: true
        }),
        sitemap()
    ]
});
