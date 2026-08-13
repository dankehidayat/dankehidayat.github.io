import { glob } from 'astro/loaders';
import { defineCollection, z, type ImageFunction } from 'astro:content';

const imageSchema = (image: ImageFunction) =>
    z.object({
        src: image(),
        alt: z.string().optional()
    });

const seoSchema = (image: ImageFunction) =>
    z.object({
        title: z.string().min(5).max(120).optional(),
        description: z.string().min(15).max(160).optional(),
        image: imageSchema(image).optional(),
        pageType: z.enum(['website', 'article']).default('website')
    });

const blog = defineCollection({
    // Prefer MDX; plain .md still works if you drop one in
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            excerpt: z.string().optional(),
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            isFeatured: z.boolean().default(false),
            tags: z.array(z.string()).default([]),
            seo: seoSchema(image).optional()
        })
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            publishDate: z.coerce.date(),
            isFeatured: z.boolean().default(false),
            seo: seoSchema(image).optional()
        })
});

const shelf = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/shelf' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            english: z.string().optional(),
            creator: z.string(),
            category: z.enum(['manga', 'anime', 'light-novel', 'fiction', 'non-fiction', 'romance']),
            status: z.enum(['reading', 'done']).default('done'),
            rating: z.number().min(0).max(10).optional(),
            description: z.string(),
            note: z.string().optional(),
            badge: z.enum(['favorite', 'all-time']).optional(),
            /** Cover file slug when it differs from the entry id (reused key visuals). */
            cover: z.string().optional(),
            links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
            seo: seoSchema(image).optional()
        })
});

export const collections = { blog, projects, shelf };
