// src/app/blog/blog-filters.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Filter, X, Tag, Folder, Bookmark, Rss } from "lucide-react";
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  categories: string[];
  labels: string[];
}

interface BlogFiltersProps {
  posts: BlogPost[];
  tags: string[];
  categories: string[];
  labels: string[];
  tagCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  labelCounts: Record<string, number>;
  children: ReactNode;
  currentPage: number;
  postsPerPage: number;
  onPageChange: (page: number) => void;
}

// Create context for filtered posts
const FilteredPostsContext = createContext<{
  filteredPosts: BlogPost[];
  selectedCategories: string[];
  selectedTags: string[];
  selectedLabels: string[];
  totalPages: number;
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  handleCategoryFilter: (category: string) => void;
  handleTagFilter: (tag: string) => void;
  handleLabelFilter: (label: string) => void;
  clearAllFilters: () => void;
  goToPage: (page: number) => void;
} | null>(null);

export function BlogFilters({
  posts,
  tags,
  categories,
  labels,
  tagCounts,
  categoryCounts,
  labelCounts,
  children,
  currentPage,
  postsPerPage,
  onPageChange,
}: BlogFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  // Filter posts based on selections
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          post.categories.includes(category)
        );

      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));

      const labelMatch =
        selectedLabels.length === 0 ||
        selectedLabels.some((label) => post.labels.includes(label));

      return categoryMatch && tagMatch && labelMatch;
    });
  }, [posts, selectedCategories, selectedTags, selectedLabels]);

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Get current posts for the page
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage, postsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      onPageChange(1);
    } else if (currentPage > 1 && totalPosts === 0) {
      onPageChange(1);
    }
  }, [
    selectedCategories,
    selectedTags,
    selectedLabels,
    totalPages,
    currentPage,
    onPageChange,
    totalPosts,
  ]);

  // Filter handlers
  const handleCategoryFilter = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleLabelFilter = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedLabels([]);
  };

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedTags.length > 0 ||
    selectedLabels.length > 0;

  const value = {
    filteredPosts: paginatedPosts, // Provide PAGINATED posts to children
    selectedCategories,
    selectedTags,
    selectedLabels,
    totalPages,
    currentPage,
    postsPerPage,
    totalPosts,
    handleCategoryFilter,
    handleTagFilter,
    handleLabelFilter,
    clearAllFilters,
    goToPage,
  };

  return (
    <FilteredPostsContext.Provider value={value}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Posts Content */}
        <div className="flex-1">
          {/* Posts Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {paginatedPosts.length} of {totalPosts} posts
              {hasActiveFilters && " (filtered)"}
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>

          {children}
        </div>

        {/* Sidebar Filters */}
        <div className="lg:w-80 space-y-6">
          {/* Active Filters Display */}
          {hasActiveFilters && (
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-lg">
                    Active Filters
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-7 text-xs bg-secondary hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 shadow-sm hover:shadow-md transition-all duration-200 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
                  >
                    Clear all
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Selected Categories */}
                {selectedCategories.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Folder className="h-4 w-4 text-blue-500" />
                      Categories
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="gap-2 text-sm font-medium py-1.5 pr-2 pl-3 group"
                        >
                          {category}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryFilter(category);
                            }}
                            className="hover:text-destructive transition-colors duration-200 group-hover:scale-110"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Tags */}
                {selectedTags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-green-500" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="gap-2 text-sm font-medium py-1.5 pr-2 pl-3 group"
                        >
                          {tag}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagFilter(tag);
                            }}
                            className="hover:text-destructive transition-colors duration-200 group-hover:scale-110"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Labels */}
                {selectedLabels.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Bookmark className="h-4 w-4 text-purple-500" />
                      Labels
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLabels.map((label) => (
                        <Badge
                          key={label}
                          variant="secondary"
                          className="gap-2 text-sm font-medium py-1.5 pr-2 pl-3 group"
                        >
                          {label}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLabelFilter(label);
                            }}
                            className="hover:text-destructive transition-colors duration-200 group-hover:scale-110"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* RSS Feed Card - Unified Layout for both mobile and desktop */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mb-3">
                  <Rss className="h-6 w-6 text-green-500 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-base text-card-foreground mb-1">
                  Stay Updated
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to our RSS feed
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs !border-green-300 !bg-green-50 !text-green-700 hover:!bg-green-100 hover:!text-green-900 dark:!border-green-600 dark:!bg-green-950 dark:!text-green-100 dark:hover:!bg-green-900 dark:hover:!text-white"
                  asChild
                >
                  <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                    Subscribe
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filters Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground -translate-y-2" />
                <h3 className="font-heading font-semibold text-lg">Filters</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories Filter */}
              <div>
                <h4 className="font-medium text-base mb-3 flex items-center gap-2">
                  <Folder className="h-5 w-5 text-blue-500" />
                  Categories
                </h4>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Button
                          variant={
                            selectedCategories.includes(category)
                              ? "default"
                              : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start h-9 text-sm"
                          onClick={() => handleCategoryFilter(category)}
                        >
                          {category}
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {categoryCounts[category] || 0}
                          </Badge>
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Separator />

              {/* Tags Filter */}
              <div>
                <h4 className="font-medium text-base mb-3 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-green-500" />
                  Tags
                </h4>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-2">
                        <Button
                          variant={
                            selectedTags.includes(tag) ? "default" : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start h-9 text-sm"
                          onClick={() => handleTagFilter(tag)}
                        >
                          {tag}
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {tagCounts[tag] || 0}
                          </Badge>
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Separator />

              {/* Labels Filter */}
              <div>
                <h4 className="font-medium text-base mb-3 flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-purple-500" />
                  Labels
                </h4>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {labels.map((label) => (
                      <div key={label} className="flex items-center gap-2">
                        <Button
                          variant={
                            selectedLabels.includes(label) ? "default" : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start h-9 text-sm"
                          onClick={() => handleLabelFilter(label)}
                        >
                          {label}
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {labelCounts[label] || 0}
                          </Badge>
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <h3 className="font-heading font-semibold text-lg">Statistics</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Posts
                </span>
                <Badge variant="secondary">{posts.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Showing</span>
                <Badge variant="secondary">{totalPosts}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Categories
                </span>
                <Badge variant="secondary">{categories.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tags</span>
                <Badge variant="secondary">{tags.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Labels</span>
                <Badge variant="secondary">{labels.length}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FilteredPostsContext.Provider>
  );
}

// Hook to use filtered posts
export function useFilteredPosts() {
  const context = useContext(FilteredPostsContext);
  if (!context) {
    throw new Error(
      "useFilteredPosts must be used within a BlogFilters provider"
    );
  }
  return context;
}
