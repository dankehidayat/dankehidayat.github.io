// types/katex.d.ts
declare namespace Katex {
  function render(
    expression: string,
    element: HTMLElement,
    options?: any
  ): void;
}

declare global {
  interface Window {
    katex: typeof Katex;
    renderMathInElement: (element: HTMLElement, options?: any) => void;
  }
}

export {};
