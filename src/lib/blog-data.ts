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
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";

function getDevelopmentPosts(): BlogPost[] {
  if (process.env.NODE_ENV !== "development") {
    return [];
  }

  try {
    const blogDir = path.join(process.cwd(), "src/content/blog");
    const files = readdirSync(blogDir);

    const posts = files
      .map((file) => {
        if (!file.endsWith(".mdx")) return null;

        const filePath = path.join(blogDir, file);
        const fileContent = readFileSync(filePath, "utf8");
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
      })
      .filter(Boolean) as BlogPost[];

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts from file system:", error);
    return [];
  }
}
