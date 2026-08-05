import react from '@astrojs/react';
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
 */
const salmonLightTheme = {
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

// https://astro.build/config
export default defineConfig({
    site: siteConfig.website,
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
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
        '/projects': '/#projects',
        '/experience': '/#experience',
        '/about': '/#about',
        '/contact': '/#contact',
        '/tags': '/blog',
        '/id': '/',
        // Stale i18n-era URLs (the old site served an /en/ locale prefix).
        // Exact paths only — rest-param redirects do not work in a static build.
        '/en': '/',
        '/en/blog': '/blog',
        '/en/projects': '/#projects',
        '/en/experience': '/#experience',
        '/en/about': '/#about',
        '/en/contact': '/#contact',
        '/en/tags': '/blog',
        '/en/rss.xml': '/rss.xml'
    },
    integrations: [
        react(),
        mdx({
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
            extendMarkdownConfig: true
        }),
        sitemap()
    ]
});
