// src/scripts/generate-rss-data.js
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function generateRSSData() {
  console.log("🔧 Generating blog data with full content...");

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

    const posts = [];
    let errorCount = 0;

    files.forEach((file) => {
      if (!file.endsWith(".mdx")) return;

      try {
        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        // For MDX files, we'll use a simpler approach since we can't easily process JSX
        // Remove MDX components and JSX syntax, keep only markdown content
        let cleanedContent = cleanMDXContent(content);

        // Convert basic markdown to HTML (simple approach)
        let contentHtml = convertMarkdownToHTML(cleanedContent);

        posts.push({
          slug: file.replace(".mdx", ""),
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString().split("T")[0],
          excerpt: data.excerpt || "",
          author: data.author || "Danke Hidayat",
          tags: data.tags || [],
          categories: data.categories || [],
          labels: data.labels || [],
          content: content,
          contentHtml: contentHtml,
        });

        console.log(`✅ Processed: ${file}`);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        errorCount++;
      }
    });

    if (errorCount > 0) {
      console.log(`⚠️  ${errorCount} files had errors and were skipped`);
    }

    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Generate blog data JSON file with full content
    generateBlogDataFile(sortedPosts, outputDir);

    console.log(
      `✅ Blog data generated successfully! ${sortedPosts.length} posts processed.`
    );
  } catch (error) {
    console.error("❌ Error generating data:", error);
    process.exit(1); // Exit with error code
  }
}

// Simple function to clean MDX content by removing JSX components
function cleanMDXContent(content) {
  if (!content) return "";

  // Remove JSX components (basic pattern matching)
  let cleaned = content
    // Remove import statements
    .replace(/^import\s+.*?from\s+['"][^'"]+['"];?\s*$/gm, "")
    // Remove export statements
    .replace(/^export\s+.*$/gm, "")
    // Remove JSX components (simple pattern)
    .replace(/<[A-Z][^>]*\/>/g, "") // Self-closing components
    .replace(/<[A-Z][^>]*>.*?<\/[A-Z][^>]*>/gs, "") // Opening and closing components
    // Remove any remaining JSX tags
    .replace(/<[^>]*>/g, "")
    // Clean up extra whitespace
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();

  return cleaned;
}

// Simple markdown to HTML converter (basic implementation)
function convertMarkdownToHTML(markdown) {
  if (!markdown) return "";

  return (
    markdown
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Links
      .replace(/\[([^\[]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>')
      // Paragraphs
      .replace(/^\s*(\n)?(.+)/gim, function (m) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
          ? m
          : "<p>" + m + "</p>";
      })
      // Line breaks
      .replace(/\n$/gim, "<br/>")
      // Lists (basic)
      .replace(/^\s*[\-\*]\s+(.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      // Code blocks (simple)
      .replace(/```([^`]+)```/gim, "<pre><code>$1</code></pre>")
      // Inline code
      .replace(/`([^`]+)`/gim, "<code>$1</code>")
      // Blockquotes
      .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
  );
}

function generateBlogDataFile(posts, outputDir) {
  const blogDataFile = path.join(outputDir, "blog-data.json");
  fs.writeFileSync(blogDataFile, JSON.stringify(posts, null, 2));
  console.log(`📊 Blog data generated: ${blogDataFile}`);
  console.log(`📝 Posts included: ${posts.length}`);
}

function createEmptyData(outputDir) {
  const blogDataFile = path.join(outputDir, "blog-data.json");
  fs.writeFileSync(blogDataFile, JSON.stringify([], null, 2));
}

if (require.main === module) {
  generateRSSData();
}

module.exports = generateRSSData;
