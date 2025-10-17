// app/mdx-components.js
export function useMDXComponents(components) {
  return {
    h1: ({ children }) => (
      <h1 className="text-xl font-bold my-4 text-foreground scroll-mt-20">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-bold my-3 text-foreground scroll-mt-20">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-bold my-2 text-foreground scroll-mt-20">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="my-3 leading-relaxed text-foreground text-[13px]">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-primary hover:underline text-[13px]">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="my-4 list-disc list-inside space-y-1 text-[13px]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 list-decimal list-inside space-y-1 text-[13px]">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-foreground text-[13px]">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary bg-primary/5 italic py-2 px-6 my-4 text-[13px]">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-muted px-1 py-0.5 rounded text-xs text-foreground">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="bg-muted border border-border rounded-lg p-4 my-4 overflow-x-auto">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-muted font-bold p-3 border border-border text-[13px]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="p-3 border border-border text-[13px]">{children}</td>
    ),
    ...components,
  };
}
