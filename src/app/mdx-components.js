// app/mdx-components.js
export function useMDXComponents(components) {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-6 text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold my-5 text-foreground">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="my-4 leading-relaxed text-muted-foreground">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-primary hover:underline">
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="table-container my-6">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    pre: ({ children }) => <pre className="code-block">{children}</pre>,
    code: ({ children, className }) => (
      <code className={className}>{children}</code>
    ),
    ...components,
  };
}
