---
paths:
  - "content/**/*.mdx"
  - "content-collections.ts"
  - "src/app/blog/**"
  - "src/mdx-components.tsx"
  - "src/components/mdx/**"
---
# Blog content

- Posts are `content/<slug>.mdx`; the file name (without `.mdx`) is the URL slug at `/blog/<slug>`. Schema lives in `content-collections.ts` (zod): `title`, `publishedAt` and `summary` are required; `updatedAt`, `author`, `image` are optional. Dates are `YYYY-MM-DD` strings.
- **Don't add a `# Title` heading in the body.** `blog/[slug]/page.tsx` already renders the title as the page `h1`; the sample posts currently duplicate it. Start body headings at `##`.
- **`image` must be a site-relative path** (e.g. `/blog/my-post.png`, file in `public/`). The metadata code builds `${DATA.url}${image}`, so the sample posts' absolute Unsplash URLs produce broken OG image URLs.
- Code fences take a language and an optional `title="file.ts"`; highlighting runs client-side in `components/mdx/code-block.tsx` with shiki (`github-light` / `github-dark`).
- The blog is behind `FEATURE_BLOG`. New blog routes must call `notFound()` when the flag is off, like the existing ones, and generated static params must return `[]` when off.
- The seven sample posts (author "John Doe") are placeholders; replace rather than extend them.
- Voice: first person, concrete, short paragraphs; lead with the takeaway. Check spelling and that internal links resolve.
