// app/layout.tsx
import { Bodoni_Moda, Domine } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { KaTeXRenderer } from "@/components/KaTeXRenderer";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
});

const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
});

export const metadata = {
  title: "Danke Hidayat - Portfolio",
  description:
    "Personal portfolio showcasing work experience, projects, and blog posts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${domine.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navigation />
        <main className="pt-20">{children}</main>
        <KaTeXRenderer />
      </body>
    </html>
  );
}
