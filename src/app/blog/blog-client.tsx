// src/app/blog/blog-client.tsx
"use client";

import { BlogFilters } from "./blog-filters";
import { BlogPostsDisplay } from "./blog-posts-display";
import { BlogPagination } from "./blog-pagination";
import { useState } from "react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  labels: string[];
}

interface BlogClientProps {
  initialPosts: BlogPost[];
  tags: string[];
  categories: string[];
  labels: string[];
  tagCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  labelCounts: Record<string, number>;
}

export function BlogClient({
  initialPosts,
  tags,
  categories,
  labels,
  tagCounts,
  categoryCounts,
  labelCounts,
}: BlogClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Show 10 posts per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="mb-6">Blog</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Thoughts on technology, development, and more. Sharing insights
                from my journey in software development and research.
              </p>
            </div>

            {/* Blog Posts Section with ID for scrolling */}
            <div id="blog-posts-section">
              <BlogFilters
                posts={initialPosts}
                tags={tags}
                categories={categories}
                labels={labels}
                tagCounts={tagCounts}
                categoryCounts={categoryCounts}
                labelCounts={labelCounts}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                onPageChange={handlePageChange}
              >
                <BlogPostsDisplay />
                <BlogPagination />
              </BlogFilters>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
