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

// https://astro.build/config
export default defineConfig({
    site: siteConfig.website,
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'id'],
        routing: {
            prefixDefaultLocale: false
        }
    },
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        shikiConfig: {
            // Night Signal dark code surfaces
            theme: 'night-owl',
            wrap: false,
            transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationWordHighlight(),
                transformerMetaHighlight()
            ]
        }
    },
    integrations: [
        mdx({
            // Inherit markdown remark/rehype + shiki; still explicit for clarity
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
            extendMarkdownConfig: true
        }),
        sitemap()
    ]
});
