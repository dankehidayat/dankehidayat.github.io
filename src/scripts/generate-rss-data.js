// src/scripts/generate-rss-data.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

// ES modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateRSSData() {
  console.log("🔧 Generating RSS data...");

  const blogDir = path.join(process.cwd(), "src/content/blog");
  const outputFile = path.join(process.cwd(), "public/rss.xml");

  try {
    // Check if blog directory exists
    if (!fs.existsSync(blogDir)) {
      console.log("📝 No blog directory found, creating empty RSS...");
      const emptyRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Danke Hidayat - Blog</title>
    <link>https://dankehidayat.my.id/blog</link>
    <description>Blog posts coming soon</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;
      fs.writeFileSync(outputFile, emptyRss);
      return;
    }

    const files = fs.readdirSync(blogDir);
    console.log(`📁 Found ${files.length} blog files`);

    const posts = files
      .map((file) => {
        if (!file.endsWith(".mdx")) return null;

        try {
          const filePath = path.join(blogDir, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContent);

          return {
            slug: file.replace(".mdx", ""),
            title: data.title || "Untitled",
            date: data.date || new Date().toISOString().split("T")[0],
            excerpt: data.excerpt || "",
            author: data.author || "Danke Hidayat",
            tags: data.tags || [],
            categories: data.categories || [],
          };
        } catch (error) {
          console.error(`❌ Error processing ${file}:`, error);
          return null;
        }
      })
      .filter(Boolean); // Remove null entries

    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Danke Hidayat - Blog</title>
    <link>https://dankehidayat.my.id/blog</link>
    <description>Thoughts on technology, development, and more. Sharing insights from my journey in software development and research.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://dankehidayat.my.id/rss.xml" rel="self" type="application/rss+xml" />
    ${sortedPosts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://dankehidayat.my.id/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <guid>https://dankehidayat.my.id/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      ${post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("")}
      ${post.categories
        .map((cat) => `<category>${escapeXml(cat)}</category>`)
        .join("")}
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

    fs.writeFileSync(outputFile, rss);
    console.log("✅ RSS data generated successfully!");
    console.log(`📄 Location: ${outputFile}`);
    console.log(`📊 Posts included: ${sortedPosts.length}`);
  } catch (error) {
    console.error("❌ Error generating RSS data:", error);
    // Don't exit with error - let build continue
  }
}

function escapeXml(unsafe) {
  if (!unsafe) return "";
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

// ES modules way to run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRSSData();
}

export default generateRSSData;
