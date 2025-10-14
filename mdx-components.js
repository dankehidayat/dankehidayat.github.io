// mdx-components.js (or mdx-components.mjs)
import { useMDXComponents as getMDXComponents } from "@next/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export function useMDXComponents(components) {
  return getMDXComponents({
    ...components,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  });
}
