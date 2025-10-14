import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold my-6 text-foreground">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold my-5 text-foreground border-b-2 border-primary pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold my-4 text-foreground">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold my-3 text-foreground">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-relaxed text-muted-foreground">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary hover:underline border-b border-primary/30 hover:border-primary/80 transition-colors"
    >
      {children}
    </a>
  ),
  // Table components for GFM support
  table: ({ children }) => (
    <div className="table-container my-6">
      <table className="w-full">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted border-b-2 border-border">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-border hover:bg-muted/50 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-foreground bg-muted/80">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-muted-foreground">{children}</td>
  ),
  // Code blocks
  pre: ({ children }) => (
    <pre className="bg-card border border-border rounded-lg p-4 my-4 overflow-x-auto">
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    const isInline = !className?.includes("language-");
    return isInline ? (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm border border-border">
        {children}
      </code>
    ) : (
      <code className={className}>{children}</code>
    );
  },
  // Lists
  ul: ({ children }) => (
    <ul className="my-4 list-disc list-inside space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal list-inside space-y-2">{children}</ol>
  ),
  li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 my-6 italic bg-muted/30 py-2">
      {children}
    </blockquote>
  ),
  // Image support
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
  // GFM specific components
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
