// lib/blog-data.ts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  categories: string[];
  labels: string[];
  content?: string;
  contentHtml?: string;
}

export interface BlogFilters {
  tags: string[];
  categories: string[];
  labels: string[];
}

// Try to load generated data, fallback to empty array
let blogPosts: BlogPost[] = [];

// Load data on module initialization
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const generatedData = require("./generated/blog-data.json");
  blogPosts = generatedData;
} catch (error) {
  // Fallback for development or if file doesn't exist
  console.warn("Could not load generated blog data, using development data");
  blogPosts = getDevelopmentPosts();
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostsWithContent(): BlogPost[] {
  return blogPosts.filter((post) => post.contentHtml);
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find((post) => post.slug === slug) || null;
}

export function getAllFilters(posts: BlogPost[]): BlogFilters {
  const tags = new Set<string>();
  const categories = new Set<string>();
  const labels = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
    post.categories.forEach((category) => categories.add(category));
    post.labels.forEach((label) => labels.add(label));
  });

  return {
    tags: Array.from(tags).sort(),
    categories: Array.from(categories).sort(),
    labels: Array.from(labels).sort(),
  };
}

export function getFilterCounts(posts: BlogPost[]) {
  const tagCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  const labelCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    post.categories.forEach((category) => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    post.labels.forEach((label) => {
      labelCounts[label] = (labelCounts[label] || 0) + 1;
    });
  });

  return { tagCounts, categoryCounts, labelCounts };
}

// Development-only function
import { readdirSync, readFileSync, existsSync } from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

function getDevelopmentPosts(): BlogPost[] {
  if (process.env.NODE_ENV !== "development") {
    return [];
  }

  try {
    const blogDir = path.join(process.cwd(), "src/content/blog");

    // Check if blog directory exists
    if (!existsSync(blogDir)) {
      console.warn("Blog directory not found:", blogDir);
      return [];
    }

    // Get all folders in blog directory
    const folders = readdirSync(blogDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    console.log(`📁 Found ${folders.length} blog folders in development`);

    const posts = folders
      .map((folder) => {
        const folderPath = path.join(blogDir, folder);
        const files = readdirSync(folderPath);

        // Look for .mdx files in the folder
        const mdxFile = files.find((file) => file.endsWith(".mdx"));
        if (!mdxFile) {
          console.warn(`⚠️ No .mdx file found in folder: ${folder}`);
          return null;
        }

        const filePath = path.join(folderPath, mdxFile);

        try {
          const fileContent = readFileSync(filePath, "utf8");
          const { data, content } = matter(fileContent);

          let contentHtml = "";
          if (content) {
            try {
              const processedContent = remark().use(html).processSync(content);
              contentHtml = processedContent.toString();
            } catch (error) {
              console.error(`Error processing content for ${folder}:`, error);
            }
          }

          // Use folder name as slug, fallback to filename without extension
          const slug = folder;

          // Use frontmatter date, fallback to folder name (if it contains date), then current date
          let date = data.date;
          if (!date) {
            // Try to extract date from folder name (format: YYYY-MM-DD-rest-of-slug)
            const dateMatch = folder.match(/^(\d{4}-\d{2}-\d{2})-/);
            if (dateMatch) {
              date = dateMatch[1];
            } else {
              date = new Date().toISOString().split("T")[0];
            }
          }

          return {
            slug: slug,
            title: data.title || "Untitled",
            date: date,
            excerpt: data.excerpt || "",
            author: data.author || "Danke Hidayat",
            tags: data.tags || [],
            categories: data.categories || [],
            labels: data.labels || [],
            content: content,
            contentHtml: contentHtml,
          };
        } catch (error) {
          console.error(`❌ Error reading file ${filePath}:`, error);
          return null;
        }
      })
      .filter(Boolean) as BlogPost[];

    // Sort by date descending
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    console.log(`✅ Loaded ${sortedPosts.length} blog posts in development`);
    return sortedPosts;
  } catch (error) {
    console.error("Error reading blog posts from file system:", error);
    return [];
  }
}

// Utility function to get all blog post slugs (useful for static generation)
export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

// Utility function to get posts by tag/category/label
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.categories.includes(category));
}

export function getPostsByLabel(label: string): BlogPost[] {
  return blogPosts.filter((post) => post.labels.includes(label));
}

// Utility function to get recent posts
export function getRecentPosts(limit: number = 5): BlogPost[] {
  return blogPosts
    .filter((post) => post.contentHtml) // Only posts with content
    .slice(0, limit);
}

// Utility function to search posts
export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content?.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      post.categories.some((category) =>
        category.toLowerCase().includes(lowerQuery)
      )
  );
}
