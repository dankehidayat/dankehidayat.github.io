import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import siteConfig from '../data/site-config.ts';
import { sortItemsByDateDesc } from '../utils/data-utils.ts';

export async function GET(context) {
    const posts = (await getCollection('blog')).sort(sortItemsByDateDesc);

    const items = await Promise.all(
        posts.map(async (post) => {
            let content = '';
            try {
                if (post.body && typeof post.body === 'string') {
                    content = marked.parse(post.body);
                }
            } catch {
                content = '';
            }

            return {
                title: post.data.title,
                description: post.data.excerpt,
                content,
                link: `/blog/${post.id}/`,
                pubDate: new Date(post.data.publishDate)
            };
        })
    );

    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items,
        customData: `<language>en-us</language>`
    });
}
