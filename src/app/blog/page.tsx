import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { FEATURE_FLAGS } from "@/lib/flags";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  if (!FEATURE_FLAGS.blog) {
    notFound();
  }

  const { page: pageParam } = await searchParams;

  const posts = allPosts;
  const sortedPosts = [...posts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
  const requestedPage = Number.parseInt(pageParam ?? "", 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);
  const paginatedPosts = sortedPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <main id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          Blog{" "}
          <span className="ml-1 rounded-md border border-border bg-card px-2 py-1 text-sm text-muted-foreground">
            {sortedPosts.length} posts
          </span>
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          My thoughts on software development, life, and more.
        </p>
      </BlurFade>

      {paginatedPosts.length > 0 ? (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-5">
              {paginatedPosts.map((post, id) => {
                const slug = post._meta.path.replace(/\.mdx$/, "");
                const indexNumber = (currentPage - 1) * PAGE_SIZE + id + 1;
                return (
                  <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={slug}>
                    <Link
                      className="group flex cursor-pointer items-start gap-x-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                      href={`/blog/${slug}`}
                    >
                      <span className="mt-[5px] font-mono text-xs font-medium tabular-nums">
                        {String(indexNumber).padStart(2, "0")}.
                      </span>
                      <div className="flex flex-1 flex-col gap-y-2">
                        <p className="text-lg font-medium tracking-tight">
                          <span className="transition-colors group-hover:text-foreground">
                            {post.title}
                            <ChevronRight
                              className="ml-1 inline-block size-4 -translate-x-2 stroke-3 text-muted-foreground opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                              aria-hidden
                            />
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </Link>
                  </BlurFade>
                );
              })}
            </div>
          </BlurFade>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <nav
                aria-label="Pagination"
                className="mt-8 flex flex-row items-center justify-between gap-3"
              >
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2 sm:justify-end">
                  {currentPage > 1 ? (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="flex h-8 w-fit items-center justify-center rounded-lg border border-border px-2 text-sm transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="flex h-8 w-fit cursor-not-allowed items-center justify-center rounded-lg border border-border px-2 text-sm opacity-50"
                    >
                      Previous
                    </span>
                  )}
                  {currentPage < totalPages ? (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="flex h-8 w-fit items-center justify-center rounded-lg border border-border px-2 text-sm transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Next
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="flex h-8 w-fit cursor-not-allowed items-center justify-center rounded-lg border border-border px-2 text-sm opacity-50"
                    >
                      Next
                    </span>
                  )}
                </div>
              </nav>
            </BlurFade>
          )}
        </>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center rounded-xl border border-border px-4 py-12">
            <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        </BlurFade>
      )}
    </main>
  );
}
