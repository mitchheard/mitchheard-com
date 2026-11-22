import type { Metadata } from "next";
import { newsreader, plexMono, plexSans } from "./site-fonts";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";
import { UmamiPageviewRouteListener } from "@/components/UmamiPageviewRouteListener";
import { seo, shareImage, site } from "@/data/site";
import {
  UMAMI_INSTANCE_URL,
  UMAMI_WEBSITE_ID,
} from "@/lib/umami-bootstrap";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Pages that set a plain string title get "<title> · Mitch Heard".
  title: { default: site.name, template: `%s · ${site.name}` },
  description: seo.home.description,
  // Defaults for pages that don't set their own (dashboard, 404, articles).
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", images: [shareImage.url] },
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
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
          strategy="afterInteractive"
        />
      </head>
      <body className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} flex min-h-screen flex-col antialiased`}>
        <UmamiPageviewRouteListener />
        <TopNav />
        <main className="flex-1">
          <div className="site-container pb-14 pt-10 md:pb-16 md:pt-[72px]">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
