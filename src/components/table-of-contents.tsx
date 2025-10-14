// components/table-of-contents.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { List } from "lucide-react";
import { useState, useEffect } from "react";

interface TableOfContentsProps {
  headings: Array<{ level: number; text: string; id: string }>;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
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

  const handleLinkClick = () => {
    setOpen(false);
  };

  // Mobile View - Sheet
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="inline-flex items-center gap-2 text-primary bg-card hover:bg-muted px-4 py-2 rounded-lg border border-border text-sm font-domine transition-colors w-full sm:w-auto justify-center">
            <List className="h-4 w-4" />
            Table of Contents
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-3/4 rounded-t-2xl">
          <div className="flex flex-col h-full pt-4">
            {/* Header - No custom close button */}
            <div className="flex items-center justify-center mb-6 px-1">
              <SheetTitle className="font-heading font-bold text-xl text-foreground">
                Table of Contents
              </SheetTitle>
            </div>

            {/* Content with increased left padding */}
            <ScrollArea className="flex-1 px-1">
              <nav className="pb-4 pl-4">
                <ul className="space-y-3">
                  {numberedHeadings.map((heading, index) => (
                    <li key={index}>
                      <a
                        href={`#${heading.id}`}
                        className={`flex items-start gap-4 py-3 px-4 rounded-lg transition-all duration-200 ${
                          heading.level === 2
                            ? "font-medium text-base"
                            : "text-sm"
                        } ${
                          activeId === heading.id
                            ? "text-primary bg-primary/10 font-semibold"
                            : "text-muted-foreground hover:text-primary hover:bg-muted"
                        } ${heading.level === 3 ? "ml-6" : ""}`}
                        onClick={handleLinkClick}
                      >
                        {/* Styled number with better alignment - FIXED: Added translate-y-1 */}
                        <span
                          className={`font-mono text-xs font-semibold flex-shrink-0 min-w-8 text-right translate-y-1 ${
                            activeId === heading.id
                              ? "text-primary"
                              : "text-muted-foreground/70"
                          }`}
                        >
                          {heading.number}
                        </span>
                        <span className="flex-1 leading-relaxed -translate-y-px">
                          {heading.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop View - Always Visible Sidebar
  return (
    <div className="w-80 sticky top-24 h-fit">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-bold text-lg text-foreground mb-4">
          Table of Contents
        </h3>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <nav className="pl-2">
            <ul className="space-y-2">
              {numberedHeadings.map((heading, index) => (
                <li key={index}>
                  <a
                    href={`#${heading.id}`}
                    className={`flex items-start gap-4 py-2 px-3 rounded-lg transition-all duration-200 ${
                      heading.level === 2 ? "font-medium text-sm" : "text-xs"
                    } ${
                      activeId === heading.id
                        ? "text-primary bg-primary/10 font-semibold border-l-2 border-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    } ${heading.level === 3 ? "ml-6" : ""}`}
                  >
                    {/* Styled number with better alignment */}
                    <span
                      className={`font-mono text-xs font-semibold flex-shrink-0 min-w-6 text-right translate-y-0.5 ${
                        activeId === heading.id
                          ? "text-primary"
                          : "text-muted-foreground/70"
                      }`}
                    >
                      {heading.number}
                    </span>
                    <span className="flex-1 leading-relaxed -translate-y-px">
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
