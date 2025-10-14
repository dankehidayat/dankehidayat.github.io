// lib/blog-data.ts
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  categories: string[];
  labels: string[];
  content?: string; // Added for RSS support
  contentHtml?: string; // Added for RSS support
}

export interface BlogFilters {
  tags: string[];
  categories: string[];
  labels: string[];
}

// Cache for blog posts to avoid repeated file system operations
let blogPostsCache: BlogPost[] | null = null;

export function getBlogPosts(): BlogPost[] {
  // Return cached posts if available
  if (blogPostsCache) {
    return blogPostsCache;
  }

  const files = readdirSync("./src/content/blog");

  const posts = files.map((file) => {
    const fileContent = readFileSync(`./src/content/blog/${file}`, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug: file.replace(".mdx", ""),
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      excerpt: data.excerpt || "",
      author: data.author || "Danke Hidayat",
      tags: data.tags || [],
      categories: data.categories || [],
      labels: data.labels || [],
      content: content, // Store raw markdown content
      contentHtml: "", // Will be populated when needed
    };
  });

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Cache the results
  blogPostsCache = sortedPosts;
  return sortedPosts;
}

export function getBlogPostsWithContent(): BlogPost[] {
  const posts = getBlogPosts();

  // Convert markdown to HTML for each post
  return posts.map((post) => {
    if (post.content && !post.contentHtml) {
      try {
        const processedContent = remark().use(html).processSync(post.content);
        post.contentHtml = processedContent.toString();
      } catch (error) {
        console.error(`Error processing content for ${post.slug}:`, error);
        post.contentHtml = `<p>${post.excerpt}</p>`;
      }
    }
    return post;
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getBlogPostsWithContent();
  return posts.find((post) => post.slug === slug) || null;
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

// Utility function to clear cache (useful during development)
export function clearBlogPostsCache() {
  blogPostsCache = null;
}
