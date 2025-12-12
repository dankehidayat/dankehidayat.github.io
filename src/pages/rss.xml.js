import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { marked } from 'marked';
import siteConfig from '../data/site-config.ts';
import { sortItemsByDateDesc } from '../utils/data-utils.ts';

export async function GET(context) {
    const posts = (await getCollection('blog')).sort(sortItemsByDateDesc);

    const items = await Promise.all(
        posts.map(async (post) => {
            // Attempt to render the post to HTML. If rendering isn't available, fall back to the raw body.
            let content = '';
            try {
                const rendered = await render(post);
                // If render returns HTML, use it. Otherwise, fall back to converting the markdown body to HTML.
                if (rendered?.html && typeof rendered.html === 'string') {
                    content = rendered.html;
                } else if (post.body && typeof post.body === 'string') {
                    // Convert markdown body to HTML to ensure RSS contains rendered content
                    content = marked.parse(post.body);
                } else {
                    content = '';
                }
            } catch (e) {
                // On any error, try to use the raw markdown body rendered to HTML
                if (post.body && typeof post.body === 'string') {
                    content = marked.parse(post.body);
                } else {
                    content = '';
                }
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
        items
    });
}
