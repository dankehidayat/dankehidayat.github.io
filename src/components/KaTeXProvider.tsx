// components/KaTeXProvider.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

export function KaTeXProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize KaTeX after component mounts
    if (typeof window !== "undefined" && window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
      });
    }
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/contrib/auto-render.min.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      {children}
    </>
  );
}
