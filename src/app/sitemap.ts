import { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

/* No lastModified: a build-time `new Date()` would claim every page changed on every deploy.
   Intentionally excludes /dashboard; /articles returns once there is a first post. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    { url: `${site.url}/career` },
    { url: `${site.url}/projects` },
  ];
}
