// src/app/blog/[slug]/page.tsx
import { readdirSync, readFileSync, existsSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import { ArrowLeft, Calendar, User, Clock, FileText } from "lucide-react";
import { TableOfContents } from "@/components/table-of-contents";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogDir = "./src/content/blog";

  if (!existsSync(blogDir)) {
    return [];
  }

  const folders = readdirSync(blogDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return folders.map((folder) => ({
    slug: folder,
  }));
}

// Format date safely
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}

// Extract headings from HTML content for TOC
function extractHeadings(htmlContent: string) {
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/g;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ""); // Remove any inner HTML tags
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    headings.push({ level, text, id });
  }

  return headings;
}

// Get blog post data
async function getBlogPost(slug: string) {
  try {
    const folderPath = `./src/content/blog/${slug}`;

    if (!existsSync(folderPath)) {
      return null;
    }

    const filePath = `${folderPath}/index.mdx`;

    if (!existsSync(filePath)) {
      return null;
    }

    const fileContent = readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    // Extract headings for TOC
    const headings = extractHeadings(contentHtml);

    return {
      title: data.title || "Untitled",
      date: data.date || slug, // Use folder name as fallback date
      author: data.author || "Danke Hidayat",
      excerpt: data.excerpt || "",
      content: contentHtml,
      headings,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 max-w-4xl">
            {/* Back button and Mobile TOC in same row - FIXED RESPONSIVE LAYOUT */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              {/* Back button on the left - UPDATED STYLING */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary bg-card hover:bg-muted px-4 py-2 rounded-lg border border-border text-sm font-domine transition-colors w-full sm:w-auto justify-center sm:justify-start flex-1 sm:flex-none"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>

              {/* Mobile TOC Button on the right - only visible on mobile */}
              <div className="lg:hidden w-full sm:w-auto flex justify-end flex-1 sm:flex-none">
                <TableOfContents headings={post.headings} />
              </div>
            </div>

            {/* Blog Post Card */}
            <article className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
              {/* Article Header */}
              <header className="border-b border-border p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs! font-domine font-medium border border-foreground text-foreground">
                    Blog Post
                  </span>
                </div>

                <h1 className="text-2xl! md:text-2xl! font-heading font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span className="text-xs! font-domine">
                        By {post.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <time className="text-xs! font-domine">
                        {formatDate(post.date)}
                      </time>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs! font-domine">5 min read</span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="p-8">
                <div
                  className="prose prose-sm max-w-none 
                             prose-headings:font-bold prose-headings:text-foreground prose-headings:font-heading
                             prose-h1:text-xl prose-h1:mb-6 prose-h1:border-b prose-h1:pb-4 prose-h1:border-border
                             prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4 prose-h2:scroll-mt-20
                             prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3 prose-h3:scroll-mt-20
                             prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4 prose-p:text-[13px]!
                             prose-li:text-foreground prose-li:leading-relaxed prose-li:text-[13px]!
                             prose-strong:text-foreground prose-strong:font-bold
                             prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                             prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4
                             prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 
                             prose-blockquote:italic prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:my-6 prose-blockquote:text-[13px]!
                             prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                             prose-table:border prose-table:border-border prose-table:my-6
                             prose-th:bg-muted prose-th:font-bold prose-th:p-3 prose-th:text-[13px]!
                             prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-[13px]!
                             prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                             prose-ul:list-disc prose-ol:list-decimal prose-ul:my-6 prose-ol:my-6
                             prose-li:my-1"
                  dangerouslySetInnerHTML={{
                    __html: post.content.replace(
                      /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/g,
                      (match, level, content) => {
                        const text = content.replace(/<[^>]*>/g, "");
                        const id = text
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-");
                        return `<h${level} id="${id}" class="scroll-mt-20">${content}</h${level}>`;
                      }
                    ),
                  }}
                />
              </div>

              {/* Article Footer */}
              <footer className="bg-muted/30 border-t border-border p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-domine">
                      Thanks for reading! Feel free to share this post.
                    </p>
                  </div>
                </div>
              </footer>
            </article>
          </div>

          {/* Desktop TOC - only visible on desktop */}
          <div className="hidden lg:block">
            <TableOfContents headings={post.headings} />
          </div>
        </div>
      </div>
    </div>
  );
}
