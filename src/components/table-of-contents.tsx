// components/table-of-contents.tsx
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { List, X } from "lucide-react";
import { useState, useEffect } from "react";

interface TableOfContentsProps {
  headings: Array<{ level: number; text: string; id: string }>;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect mobile screen size and scroll position
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    checkScreenSize();
    handleScroll();

    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open, isMobile]);

  if (headings.length === 0) {
    return null;
  }

  // Generate numbering for headings
  const numberedHeadings = headings.map((heading, index) => {
    if (heading.level === 2) {
      return {
        ...heading,
        number: `${index + 1}.`,
      };
    } else {
      let h2Index = -1;
      for (let i = index; i >= 0; i--) {
        if (headings[i].level === 2) {
          h2Index = i;
          break;
        }
      }

      if (h2Index !== -1) {
        const h2Number = h2Index + 1;
        let h3Count = 0;
        for (let i = h2Index + 1; i <= index; i++) {
          if (headings[i].level === 3) {
            h3Count++;
          }
        }
        return {
          ...heading,
          number: `${h2Number}.${h3Count}`,
        };
      }
    }
    return { ...heading, number: "" };
  });

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();

    if (isMobile) {
      setOpen(false);
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        window.history.pushState(null, "", `#${id}`);
      }, 300);
    }
  };

  // Mobile View - Custom Sheet with animations
  if (isMobile) {
    return (
      <>
        {/* Floating TOC Button */}
        <div
          className={`fixed right-4 z-40 transition-all duration-300 ease-in-out bottom-4`}
        >
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 text-foreground dark:text-foreground bg-card dark:bg-card hover:bg-muted dark:hover:bg-muted px-4 py-3 rounded-full border border-border dark:border-border shadow-lg text-sm font-domine transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <List className="h-5 w-5" />
            <span className="hidden sm:inline">Contents</span>
          </button>
        </div>

        {/* Custom Sheet Overlay */}
        {open && (
          <div
            className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />
        )}

        {/* Custom Sheet Content */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-card dark:bg-card border-t border-border dark:border-border rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ height: "75vh" }}
        >
          <div className="flex flex-col h-full">
            {/* Header - Decreased bottom padding, increased top padding */}
            <div className="flex items-center justify-between pt-6 pb-3 px-6 border-b border-border dark:border-border">
              <h3 className="font-domine font-bold text-xl text-foreground dark:text-foreground">
                Table of Contents
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-muted dark:hover:bg-muted rounded-lg transition-colors text-foreground dark:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content with proper scrolling - Increased top padding */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <nav className="pt-4 pb-4">
                  <ul className="space-y-3">
                    {numberedHeadings.map((heading, index) => (
                      <li key={index}>
                        <a
                          href={`#${heading.id}`}
                          className={`flex items-start gap-4 py-3 px-4 rounded-lg transition-all duration-200 font-domine text-sm ${
                            activeId === heading.id
                              ? "text-primary dark:text-primary bg-primary/10 dark:bg-primary/10 font-semibold"
                              : "text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary hover:bg-muted dark:hover:bg-muted"
                          } ${heading.level === 3 ? "ml-6" : ""}`}
                          onClick={(e) => handleLinkClick(e, heading.id)}
                        >
                          <span
                            className={`font-domine text-sm font-semibold flex-shrink-0 min-w-8 text-right translate-y-1 ${
                              activeId === heading.id
                                ? "text-primary dark:text-primary"
                                : "text-muted-foreground dark:text-muted-foreground"
                            }`}
                          >
                            {heading.number}
                          </span>
                          <span className="flex-1 leading-relaxed translate-y-1 text-foreground dark:text-foreground">
                            {heading.text}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </ScrollArea>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop View - Always Visible Sidebar
  return (
    <div className="w-80 sticky top-24 h-fit">
      <div className="bg-card dark:bg-card border border-border dark:border-border rounded-lg p-6">
        <h3 className="font-domine font-bold text-lg text-foreground dark:text-foreground mb-4">
          Table of Contents
        </h3>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <nav className="pl-2">
            <ul className="space-y-2">
              {numberedHeadings.map((heading, index) => (
                <li key={index}>
                  <a
                    href={`#${heading.id}`}
                    className={`flex items-start gap-4 py-2 px-3 rounded-lg transition-all duration-200 font-domine text-sm ${
                      activeId === heading.id
                        ? "text-primary dark:text-primary bg-primary/10 dark:bg-primary/10 font-semibold border-l-2 border-primary dark:border-primary"
                        : "text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary hover:bg-muted dark:hover:bg-muted"
                    } ${heading.level === 3 ? "ml-6" : ""}`}
                    onClick={(e) => handleLinkClick(e, heading.id)}
                  >
                    <span
                      className={`font-domine text-sm font-semibold flex-shrink-0 min-w-6 text-right translate-y-0.5 ${
                        activeId === heading.id
                          ? "text-primary dark:text-primary"
                          : "text-muted-foreground dark:text-muted-foreground"
                      }`}
                    >
                      {heading.number}
                    </span>
                    <span className="flex-1 leading-relaxed translate-y-0.5 text-foreground dark:text-foreground">
                      {heading.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
