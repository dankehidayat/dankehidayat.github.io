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

// This will be populated during build time
let blogPosts: BlogPost[] = [];

// Function to set blog posts (called during build)
export function setBlogPosts(posts: BlogPost[]) {
  blogPosts = posts;
}

export function getBlogPosts(): BlogPost[] {
  if (blogPosts.length === 0 && process.env.NODE_ENV === "development") {
    // Only use file system in development
    return getBlogPostsFromFS();
  }
  return blogPosts;
}

export function getBlogPostsWithContent(): BlogPost[] {
  return getBlogPosts().filter((post) => post.contentHtml);
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return getBlogPostsWithContent().find((post) => post.slug === slug) || null;
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

// Development-only file system functions
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

function getBlogPostsFromFS(): BlogPost[] {
  if (process.env.NODE_ENV !== "development") {
    return [];
  }

  try {
    const files = readdirSync("./src/content/blog");
    const posts = files.map((file) => {
      const fileContent = readFileSync(`./src/content/blog/${file}`, "utf8");
      const { data, content } = matter(fileContent);

      let contentHtml = "";
      if (content) {
        try {
          const processedContent = remark().use(html).processSync(content);
          contentHtml = processedContent.toString();
        } catch (error) {
          console.error(`Error processing content for ${file}:`, error);
        }
      }

      return {
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
      };
    });

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts from file system:", error);
    return [];
  }
}
