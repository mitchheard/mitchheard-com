import type { Metadata } from "next";
import { shareImage, site } from "@/data/site";

/** Per-page metadata with a canonical URL and matching Open Graph / Twitter tags.
 *  A page's `openGraph` replaces the layout's wholesale, so every page builds the full set
 *  here, including the share image. */
export function pageMetadata(
  path: string,
  page: { title: string; description: string; absoluteTitle?: boolean },
): Metadata {
  const fullTitle = page.absoluteTitle ? page.title : `${page.title} · ${site.name}`;
  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description: page.description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [shareImage.url],
    },
  };
}
