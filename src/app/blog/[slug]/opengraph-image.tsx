import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { FEATURE_FLAGS } from "@/lib/flags";
import { renderOg } from "@/lib/og";
import { formatDate } from "@/lib/utils";

export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  // An unknown slug 404s like the post page, so unfurlers don't cache a stand-in image.
  if (!FEATURE_FLAGS.blog) notFound();
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return renderOg({
    title: post.title,
    description: post.summary,
    date: formatDate(post.publishedAt),
  });
}
