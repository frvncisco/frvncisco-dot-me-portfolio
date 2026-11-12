---
paths:
  - "content/**/*.mdx"
  - "content-collections.ts"
  - "src/app/blog/**"
  - "src/mdx-components.tsx"
  - "src/components/mdx/**"
---

# Blog content

- Posts are `content/<slug>.mdx`; the file name (without `.mdx`) is the URL slug at `/blog/<slug>`. Schema lives in `content-collections.ts` (zod): `title`, `publishedAt` and `summary` are required; `updatedAt`, `author`, `image` are optional. Dates are `YYYY-MM-DD` strings, validated with `z.iso.date()`, so a typo fails the build. The schema adds a `slug` field (the file name); use `post.slug` and `getSortedPosts()` from `src/lib/posts.ts`, not `_meta.path` or a local sort.
- **Don't add a `# Title` heading in the body.** `blog/[slug]/page.tsx` already renders the title as the page `h1`. Start body headings at `##` (a second `h1` breaks the one-`h1` rule).
- **`image`** may be an absolute URL (the sample posts use Unsplash) or a site-relative path (e.g. `/blog/my-post.png`, file in `public/`). `absoluteUrl()` in `src/lib/utils.ts` leaves absolute URLs alone and prefixes `siteUrl` (`src/lib/site-url.ts`) onto relative ones for OG, Twitter and JSON-LD metadata; use it instead of string-concatenating. Build site URLs from `siteUrl`, not `DATA.url`.
- Code fences take a language and an optional `title="file.ts"`; highlighting runs at build time in `content-collections.ts` (`@shikijs/rehype`, `github-light` / `github-dark`), so a changed fence only shows after the content rebuilds. `components/mdx/code-block.tsx` adds the title bar and copy button, and `globals.css` switches the `--shiki-light` / `--shiki-dark` token colors with the theme. An unknown language falls back to plain text.
- The blog is behind `FEATURE_BLOG`. New blog routes must call `notFound()` when the flag is off, like the existing ones, and generated static params must return `[]` when off.
- The seven sample posts (author "John Doe") are placeholders; replace rather than extend them.
- Voice: first person, concrete, short paragraphs; lead with the takeaway. Check spelling and that internal links resolve.
