import { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-static";

/* No lastModified on fixed pages: a build-time `new Date()` would claim every page changed on every deploy.
   Intentionally excludes /dashboard. /articles and each post appear once there is a published post. */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  return [
    { url: site.url },
    { url: `${site.url}/career` },
    { url: `${site.url}/projects` },
    ...(articles.length > 0
      ? [
          { url: `${site.url}/articles` },
          ...articles.map((a) => ({ url: `${site.url}/articles/${a.id}`, lastModified: a.date })),
        ]
      : []),
  ];
}
