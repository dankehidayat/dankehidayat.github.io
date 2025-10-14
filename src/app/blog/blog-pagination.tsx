// src/app/blog/blog-pagination.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useFilteredPosts } from "./blog-filters";

export function BlogPagination() {
  const { totalPages, totalPosts, currentPage, postsPerPage, goToPage } =
    useFilteredPosts();

  // Don't show pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    goToPage(page);
    // Scroll to top of posts section smoothly
    setTimeout(() => {
      const postsSection = document.getElementById("blog-posts-section");
      if (postsSection) {
        postsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
      {/* Posts info */}
      <div className="text-sm text-muted-foreground">
        Showing {(currentPage - 1) * postsPerPage + 1} to{" "}
        {Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} posts
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        {/* Page numbers */}
        {pageNumbers.map((pageNumber, index) => (
          <div key={index}>
            {pageNumber === "..." ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0"
                disabled
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="sm"
                className="h-9 w-9 p-0 font-medium"
                onClick={() => handlePageChange(pageNumber as number)}
              >
                {pageNumber}
              </Button>
            )}
          </div>
        ))}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  );
}
