// components/navigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4" aria-label="Global">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center border border-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xl tracking-tight text-foreground group-hover:text-primary transition-colors font-bodoni-moda font-semibold">
                Danke Hidayat
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase font-bodoni-moda font-semibold">
                Portfolio
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Fixed vertical alignment */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm tracking-wide transition-colors hover:text-primary border-b-2 pb-1 font-bodoni-moda font-semibold transform translate-y-1.5 ${
                  pathname === item.href
                    ? "text-primary border-primary"
                    : "text-foreground/90 border-transparent"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Theme toggle aligned with navigation links */}
            <div className="flex items-center transform translate-y-0.5">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary hover:bg-muted transition-all duration-300 hover:scale-110"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] p-0 bg-background border-r border-border mobile-navbar"
              >
                <SheetHeader className="flex flex-row items-center justify-between p-6 border-b border-border bg-background/95 backdrop-blur-sm navbar-header">
                  <SheetTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center border border-primary transition-transform duration-300 hover:scale-105">
                      <BookOpen className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl tracking-tight text-foreground font-bodoni-moda font-semibold">
                        Danke Hidayat
                      </div>
                      <div className="text-xs text-muted-foreground tracking-wider uppercase font-bodoni-moda font-semibold">
                        Portfolio
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="p-6 space-y-4 navbar-content">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block text-lg tracking-wide transition-all duration-300 font-bodoni-moda font-semibold py-3 px-4 rounded-lg hover:bg-muted navbar-item ${
                        pathname === item.href
                          ? "text-primary font-medium bg-primary/10"
                          : "text-foreground"
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Footer with subtle animation */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-muted/50 navbar-footer">
                  <p className="text-sm text-muted-foreground text-center font-bodoni-moda font-semibold transition-opacity duration-500">
                    Let&apos;s build something amazing together
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
