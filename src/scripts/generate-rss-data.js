// src/scripts/generate-rss-data.js
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function generateRSSData() {
  console.log("🔧 Generating RSS and blog data...");

  const blogDir = path.join(process.cwd(), "src/content/blog");
  const outputDir = path.join(process.cwd(), "src/lib/generated");

  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Check if blog directory exists
    if (!fs.existsSync(blogDir)) {
      console.log("📝 No blog directory found, creating empty data...");
      createEmptyData(outputDir);
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
            labels: data.labels || [],
          };
        } catch (error) {
          console.error(`❌ Error processing ${file}:`, error);
          return null;
        }
      })
      .filter(Boolean);

    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Generate RSS file
    generateRSSFile(sortedPosts);

    // Generate blog data JSON file
    generateBlogDataFile(sortedPosts, outputDir);

    console.log("✅ RSS and blog data generated successfully!");
  } catch (error) {
    console.error("❌ Error generating data:", error);
  }
}

function generateRSSFile(posts) {
  const outputFile = path.join(process.cwd(), "public/rss.xml");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Danke Hidayat - Blog</title>
    <link>https://dankehidayat.my.id/blog</link>
    <description>Thoughts on technology, development, and more. Sharing insights from my journey in software development and research.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://dankehidayat.my.id/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
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
  console.log(`📄 RSS file generated: ${outputFile}`);
}

function generateBlogDataFile(posts, outputDir) {
  const blogDataFile = path.join(outputDir, "blog-data.json");
  fs.writeFileSync(blogDataFile, JSON.stringify(posts, null, 2));
  console.log(`📊 Blog data generated: ${blogDataFile}`);
  console.log(`📝 Posts included: ${posts.length}`);
}

function createEmptyData(outputDir) {
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

  const outputFile = path.join(process.cwd(), "public/rss.xml");
  fs.writeFileSync(outputFile, emptyRss);

  const blogDataFile = path.join(outputDir, "blog-data.json");
  fs.writeFileSync(blogDataFile, JSON.stringify([], null, 2));
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

if (require.main === module) {
  generateRSSData();
}

module.exports = generateRSSData;
