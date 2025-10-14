// app/mdx-components.tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-6 text-gray-900 dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold my-5 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="my-4 leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    ),
    // REMOVED: All math components - KaTeX auto-render will handle them automatically
    ...components,
  };
}
