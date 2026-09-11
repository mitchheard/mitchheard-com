import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { TopNav } from "@/components/TopNav";
import { UmamiPageviewRouteListener } from "@/components/UmamiPageviewRouteListener";
import {
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
  title: "Mitch Heard",
  description: "Mitch Heard — CPO at Newzip, builder of small software bets under AvidX. Austin, TX.",
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
      <body className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}>
        <UmamiPageviewRouteListener />
        <TopNav />
        <main className="min-h-screen">
          <div className="site-container pb-16 pt-10 md:pb-24 md:pt-[72px]">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
