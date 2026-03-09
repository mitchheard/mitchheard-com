import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { TopNav } from "@/components/TopNav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mitch Heard",
  description: "Personal site — articles, projects, photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <TopNav />
        <main className="min-h-screen bg-[var(--content-bg)]">
          <div className="mx-auto max-w-[45rem] px-5 pb-16 pt-5 md:px-10 md:pb-20 md:pt-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
