import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { FEATURE_FLAGS } from "@/lib/flags";
import { siteUrl } from "@/lib/site-url";

// Gated routes and posts are listed only when their flag is on, so the sitemap
// never advertises pages that return 404.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    ...(FEATURE_FLAGS.work ? ["/work"] : []),
    ...(FEATURE_FLAGS.contact ? ["/contact"] : []),
    ...(FEATURE_FLAGS.blog ? ["/blog"] : []),
  ].map((path) => ({ url: `${siteUrl}${path}` }));

  const posts = FEATURE_FLAGS.blog
    ? allPosts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt ?? post.publishedAt,
      }))
    : [];

  return [...pages, ...posts];
}
