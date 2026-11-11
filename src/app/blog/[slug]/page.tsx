import { allPosts } from "content-collections";
import { siteUrl } from "@/lib/site-url";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURE_FLAGS } from "@/lib/flags";

function getSortedPosts() {
  return [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export async function generateStaticParams() {
  if (!FEATURE_FLAGS.blog) {
    return [];
  }

  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  // The page calls notFound() when the blog is off; don't leak the post's metadata either.
  if (!FEATURE_FLAGS.blog) {
    return undefined;
  }

  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug);

  if (!post) {
    return undefined;
  }

  let { title, publishedAt: publishedTime, summary: description, image } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${siteUrl}/blog/${slug}`,
      ...(image && {
        images: [
          {
            url: absoluteUrl(image, siteUrl),
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [absoluteUrl(image, siteUrl)],
      }),
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  if (!FEATURE_FLAGS.blog) {
    notFound();
  }

  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex((p) => p._meta.path.replace(/\.mdx$/, "") === slug);
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  const getSlug = (post: (typeof sortedPosts)[0]) => post._meta.path.replace(/\.mdx$/, "");

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    description: post.summary,
    image: post.image
      ? absoluteUrl(post.image, siteUrl)
      : `${siteUrl}/blog/${slug}/opengraph-image`,
    url: `${siteUrl}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: DATA.name,
    },
  }).replace(/</g, "\\u003c");

  return (
    <main id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: jsonLdContent,
        }}
      />
      <div className="flex items-center justify-start gap-4">
        <Link
          href="/blog"
          className="group mb-6 inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Back to Blog"
        >
          <ChevronLeft className="size-3 transition-transform group-hover:-translate-x-px" />
          Back to Blog
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="title text-3xl leading-tight font-semibold tracking-tighter md:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
      </div>
      <div className="my-6 flex w-full items-center">
        <div
          className="h-px flex-1 bg-border"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>
      <article className="prose max-w-full font-sans leading-relaxed text-pretty text-muted-foreground dark:prose-invert">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </article>

      <nav className="mt-12 max-w-2xl pt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          {previousPost ? (
            <Link
              href={`/blog/${getSlug(previousPost)}`}
              className="group flex flex-1 flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium wrap-break-word whitespace-normal transition-colors group-hover:text-foreground">
                {previousPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden flex-1 sm:block" />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${getSlug(nextPost)}`}
              className="group flex flex-1 flex-col gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:bg-accent/50"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium wrap-break-word whitespace-normal transition-colors group-hover:text-foreground">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden flex-1 sm:block" />
          )}
        </div>
      </nav>
    </main>
  );
}
