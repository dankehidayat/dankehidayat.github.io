// scripts/generate-static-rss.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function generateStaticRSS() {
  console.log("📝 Generating static RSS file...");

  const blogDir = path.join(process.cwd(), "src/content/blog");
  const outputFile = path.join(process.cwd(), "public/rss.xml");

  try {
    const files = fs.readdirSync(blogDir);

    const posts = files
      .map((file) => {
        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
          slug: file.replace(".mdx", ""),
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString().split("T")[0],
          excerpt: data.excerpt || "",
          author: data.author || "Danke Hidayat",
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

    fs.writeFileSync(outputFile, rss);
    console.log("✅ Static RSS file generated!");
    console.log(`📄 Location: ${outputFile}`);
  } catch (error) {
    console.error("❌ Error generating static RSS:", error);
    process.exit(1);
  }
}

function escapeXml(unsafe) {
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
  generateStaticRSS();
}

module.exports = generateStaticRSS;
