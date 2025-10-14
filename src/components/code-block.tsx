// src/components/code-block.tsx
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language = "text" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative my-6 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      {/* Header with language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
        <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-xs hover:bg-background"
        >
          {copied ? (
            <Check className="h-3 w-3 mr-1" />
          ) : (
            <Copy className="h-3 w-3 mr-1" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-sm bg-background">
        <code className="font-mono whitespace-pre text-foreground">
          {children}
        </code>
      </pre>
    </div>
  );
}
