import type { Metadata } from "next";
import { Inter, Source_Serif_4, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      <body className={`${inter.variable} ${sourceSerif.variable} ${geistMono.variable} antialiased`}>
        <Sidebar />
        <main className="min-h-screen bg-[var(--content-bg)] pl-0 md:pl-56">
          <div className="mx-auto max-w-[45rem] px-6 py-14 md:px-14 md:py-20">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
