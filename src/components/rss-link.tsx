// src/components/rss-link.tsx
"use client";

import { Rss } from "lucide-react";

export function RSSLink() {
  return (
    <a
      href="/rss.xml"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-600 transition-colors"
      title="Subscribe to RSS feed"
    >
      <Rss className="h-4 w-4" />
      <span>RSS</span>
    </a>
  );
}
