// components/KaTeXRenderer.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function KaTeXRenderer() {
  const pathname = usePathname();

  useEffect(() => {
    const renderMath = () => {
      if (typeof window !== "undefined" && window.renderMathInElement) {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
          ],
          throwOnError: false,
        });
      }
    };

    // Load KaTeX scripts if not already loaded
    const loadKaTeX = async () => {
      if (typeof window !== "undefined" && !window.katex) {
        // Load KaTeX CSS
        const cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href =
          "https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css";
        cssLink.crossOrigin = "anonymous";
        document.head.appendChild(cssLink);

        // Load KaTeX JS
        const katexScript = document.createElement("script");
        katexScript.src =
          "https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.js";
        katexScript.crossOrigin = "anonymous";
        katexScript.async = true;

        katexScript.onload = () => {
          const autoRenderScript = document.createElement("script");
          autoRenderScript.src =
            "https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/contrib/auto-render.min.js";
          autoRenderScript.crossOrigin = "anonymous";
          autoRenderScript.async = true;
          autoRenderScript.onload = () => {
            // Initial render
            setTimeout(renderMath, 100);
          };
          document.body.appendChild(autoRenderScript);
        };

        document.body.appendChild(katexScript);
      } else {
        // KaTeX already loaded, just render
        setTimeout(renderMath, 100);
      }
    };

    loadKaTeX();
  }, [pathname]); // Re-run when route changes

  return null;
}
