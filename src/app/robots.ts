import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Only production is crawlable. Previews (which run with every feature flag on) and local
// `next dev` disallow everything, so staging pages never get indexed. VERCEL_ENV tells the
// two apart on Vercel; on any other host it is unset, so a production build counts as production.
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
