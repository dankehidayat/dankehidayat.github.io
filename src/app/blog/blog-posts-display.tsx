// src/app/blog/blog-posts-display.tsx
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, Tag, Folder, Bookmark } from "lucide-react";
import { useFilteredPosts } from "./blog-filters";

export function BlogPostsDisplay() {
  const { filteredPosts, totalPosts } = useFilteredPosts();

  if (totalPosts === 0) {
    return (
      <Card className="text-center py-16 border-border">
        <CardContent>
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <p className="text-xl text-muted-foreground">No blog posts found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {filteredPosts.map((post, index) => (
        <Card
          key={post.slug}
          className="group hover:shadow-md transition-all duration-300 border-border blog-post-item"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <CardContent className="p-0">
            <Link href={`/blog/${post.slug}`}>
              <div className="p-8 hover:bg-card/50 transition-colors">
                {/* Header with badges and metadata */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="default" className="font-domine">
                    Blog Post
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time className="font-domine">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span className="font-domine">By {post.author}</span>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Taxonomy Display */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {/* Categories */}
                  {post.categories.map((category: string) => (
                    <Badge
                      key={`category-${category}`}
                      variant="outline"
                      className="gap-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800 text-sm font-medium"
                    >
                      <Folder className="h-3 w-3" />
                      {category}
                    </Badge>
                  ))}

                  {/* Tags */}
                  {post.tags.map((tag: string) => (
                    <Badge
                      key={`tag-${tag}`}
                      variant="secondary"
                      className="gap-1 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 text-sm font-medium"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}

                  {/* Labels */}
                  {post.labels.map((label: string) => (
                    <Badge
                      key={`label-${label}`}
                      variant="outline"
                      className="gap-1 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800 text-sm font-medium"
                    >
                      <Bookmark className="h-3 w-3" />
                      {label}
                    </Badge>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Read more
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
