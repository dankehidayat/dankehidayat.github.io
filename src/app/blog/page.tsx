// src/app/blog/page.tsx
import { getBlogPosts, getAllFilters, getFilterCounts } from "@/lib/blog-data";
import { BlogClient } from "./blog-client";

export default function BlogPage() {
  const allPosts = getBlogPosts();
  const { tags, categories, labels } = getAllFilters(allPosts);
  const { tagCounts, categoryCounts, labelCounts } = getFilterCounts(allPosts);

  return (
    <BlogClient
      initialPosts={allPosts}
      tags={tags}
      categories={categories}
      labels={labels}
      tagCounts={tagCounts}
      categoryCounts={categoryCounts}
      labelCounts={labelCounts}
    />
  );
}
