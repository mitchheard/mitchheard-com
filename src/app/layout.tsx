import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";
import { seo, shareImage, site } from "@/data/site";
import {
  UMAMI_BEFORE_SEND_NAME,
  UMAMI_BEFORE_SEND_SOURCE,
  UMAMI_DOMAINS,
  UMAMI_INSTANCE_URL,
  UMAMI_WEBSITE_ID,
} from "@/lib/umami-bootstrap";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

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
        <script dangerouslySetInnerHTML={{ __html: UMAMI_BEFORE_SEND_SOURCE }} />
        <Script
          src={`${UMAMI_INSTANCE_URL}/script.js`}
          data-website-id={UMAMI_WEBSITE_ID}
          data-domains={UMAMI_DOMAINS}
          data-before-send={UMAMI_BEFORE_SEND_NAME}
          data-exclude-hash="true"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} flex min-h-screen flex-col antialiased`}>
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
