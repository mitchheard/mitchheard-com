import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mitchheard.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/articles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/photography`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Intentionally exclude /dashboard from sitemap
  ];
}
