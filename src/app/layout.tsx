import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { TopNav } from "@/components/TopNav";
import { UmamiPageviewRouteListener } from "@/components/UmamiPageviewRouteListener";
import {
  UMAMI_INSTANCE_URL,
  UMAMI_WEBSITE_ID,
} from "@/lib/umami-bootstrap";
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
      <head>
        <Script
          src={`${UMAMI_INSTANCE_URL}/script.js`}
          data-website-id={UMAMI_WEBSITE_ID}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <UmamiPageviewRouteListener />
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
