// src/app/rss.xml/route.ts
import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog-data";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Function to get full post content
function getFullPostContent(slug: string) {
  try {
    const fileContent = readFileSync(`./src/content/blog/${slug}.mdx`, "utf8");
    const { content } = matter(fileContent);

    // Convert markdown to HTML
    const processedContent = remark().use(html).processSync(content);
    return processedContent.toString();
  } catch {
    return "";
  }
}

export async function GET() {
  const posts = getBlogPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Danke Hidayat - Blog</title>
    <link>https://yourdomain.com/blog</link>
    <description>Thoughts on technology, development, and more. Sharing insights from my journey in software development and research.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://yourdomain.com/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map((post) => {
        const fullContent = getFullPostContent(post.slug);
        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://yourdomain.com/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
              }
              h1, h2, h3 { 
                color: #111; 
                margin-top: 1.5em;
                margin-bottom: 0.5em;
              }
              h1 { font-size: 2em; border-bottom: 2px solid #e5e5e5; padding-bottom: 0.3em; }
              h2 { font-size: 1.5em; }
              h3 { font-size: 1.25em; }
              p { margin-bottom: 1em; }
              a { color: #2563eb; text-decoration: none; }
              a:hover { text-decoration: underline; }
              code { 
                background: #f4f4f4; 
                padding: 0.2em 0.4em; 
                border-radius: 3px; 
                font-family: 'Monaco', 'Menlo', monospace; 
                font-size: 0.9em;
              }
              pre { 
                background: #1f2937; 
                color: #f8f8f2; 
                padding: 1em; 
                border-radius: 5px; 
                overflow-x: auto; 
                margin: 1.5em 0;
              }
              pre code { background: none; padding: 0; }
              blockquote { 
                border-left: 4px solid #2563eb; 
                padding-left: 1em; 
                margin-left: 0; 
                color: #666; 
                font-style: italic;
              }
              img { max-width: 100%; height: auto; border-radius: 5px; }
              ul, ol { margin: 1em 0; padding-left: 2em; }
              li { margin: 0.5em 0; }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin: 1.5em 0;
              }
              th, td { 
                padding: 0.75em; 
                text-align: left; 
                border-bottom: 1px solid #e5e5e5;
              }
              th { 
                background: #f8fafc; 
                font-weight: 600;
              }
              .post-meta { 
                color: #666; 
                font-size: 0.9em; 
                margin-bottom: 2em;
                padding-bottom: 1em;
                border-bottom: 1px solid #e5e5e5;
              }
              .taxonomy { 
                margin: 1.5em 0; 
                display: flex; 
                flex-wrap: wrap; 
                gap: 0.5em;
              }
              .badge { 
                display: inline-flex; 
                align-items: center; 
                gap: 0.25em; 
                padding: 0.25em 0.75em; 
                border-radius: 9999px; 
                font-size: 0.75em; 
                font-weight: 500; 
              }
              .badge-category { 
                background: #dbeafe; 
                color: #1e40af; 
                border: 1px solid #bfdbfe;
              }
              .badge-tag { 
                background: #dcfce7; 
                color: #166534; 
              }
              .badge-label { 
                background: #f3e8ff; 
                color: #7e22ce; 
                border: 1px solid #e9d5ff;
              }
              .read-more { 
                margin-top: 2em; 
                padding-top: 1em; 
                border-top: 1px solid #e5e5e5; 
                text-align: center;
              }
            </style>
          </head>
          <body>
            <article>
              <header>
                <h1>${post.title}</h1>
                <div class="post-meta">
                  <strong>Published:</strong> ${new Date(
                    post.date
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} | 
                  <strong>Author:</strong> ${post.author}
                </div>
                
                ${
                  post.categories.length > 0 ||
                  post.tags.length > 0 ||
                  post.labels.length > 0
                    ? `
                <div class="taxonomy">
                  ${post.categories
                    .map(
                      (cat) =>
                        `<span class="badge badge-category">📁 ${cat}</span>`
                    )
                    .join("")}
                  ${post.tags
                    .map(
                      (tag) => `<span class="badge badge-tag">🏷️ ${tag}</span>`
                    )
                    .join("")}
                  ${post.labels
                    .map(
                      (label) =>
                        `<span class="badge badge-label">📌 ${label}</span>`
                    )
                    .join("")}
                </div>
                `
                    : ""
                }
              </header>
              
              <div class="post-content">
                ${fullContent}
              </div>
              
              <footer class="read-more">
                <p><em>Read the full post online: <a href="https://yourdomain.com/blog/${
                  post.slug
                }">https://yourdomain.com/blog/${post.slug}</a></em></p>
              </footer>
            </article>
          </body>
        </html>
      ]]></content:encoded>
      <guid>https://yourdomain.com/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      ${post.categories
        .map((category) => `<category>${escapeXml(category)}</category>`)
        .join("")}
      ${post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("")}
    </item>
    `;
      })
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
