// lib/blog-data.ts
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

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

export function getBlogPosts(): BlogPost[] {
  const files = readdirSync("./src/content/blog");

  const posts = files.map((file) => {
    const fileContent = readFileSync(`./src/content/blog/${file}`, "utf8");
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
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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
