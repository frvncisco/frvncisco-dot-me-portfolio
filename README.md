# heyfrancisco.me

Personal portfolio and blog for Francisco Santana.

Built with [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript, [Tailwind CSS](https://tailwindcss.com) v4, [shadcn/ui](https://ui.shadcn.com/) and [Magic UI](https://magicui.design/), with an MDX blog powered by [content-collections](https://www.content-collections.dev/). Based on the MIT-licensed [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio) template.

## Pages

| Route                   | Contents                                  | Gated by          |
| ----------------------- | ----------------------------------------- | ----------------- |
| `/`                     | Hero                                      | always on         |
| `/about`                | About, work experience, education, skills | always on         |
| `/work`                 | Projects                                  | `FEATURE_WORK`    |
| `/contact`              | Contact                                   | `FEATURE_CONTACT` |
| `/blog`, `/blog/[slug]` | MDX blog                                  | `FEATURE_BLOG`    |

## Getting started

Requires Node 24 (see `.nvmrc`) and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

| Command                  | What it does                                                      |
| ------------------------ | ----------------------------------------------------------------- |
| `pnpm dev`               | Start the dev server                                              |
| `pnpm build`             | Production build (type-checks the whole project)                  |
| `pnpm start`             | Serve the production build                                        |
| `pnpm lint`              | Run ESLint (`pnpm lint:fix` to autofix)                           |
| `pnpm format`            | Format the repo with Prettier (`pnpm format:check` to check only) |
| `pnpm exec tsc --noEmit` | Type-check only                                                   |

## Feature flags

`/blog`, `/work` and `/contact` are hidden by default: they return a 404 and their dock icons are removed. Turn one on by setting its variable to `true` (see [`.env.example`](./.env.example)):

```bash
FEATURE_BLOG=true
FEATURE_WORK=true
FEATURE_CONTACT=true
```

Flags are read at build time, so on a host like Vercel, change the environment variable and redeploy. Locally, restart the dev server. The flags live in [`src/lib/flags.ts`](./src/lib/flags.ts).

## Site URL

Absolute URLs (`metadataBase`, `og:url`, the sitemap, `robots.txt`, JSON-LD) come from [`src/lib/site-url.ts`](./src/lib/site-url.ts):

1. `SITE_URL`, if it's set.
2. On Vercel previews, the preview's own URL.
3. With `next dev`, `localhost`.
4. Otherwise, `DATA.url`.

Until the domain in `DATA.url` is connected, set `SITE_URL` on Vercel Production to the project's `*.vercel.app` alias so that link previews work. Once the domain is live, remove the variable. Like the flags, it's read at build time.

`robots.txt` allows crawling only when `VERCEL_ENV` is `production`. Previews, local builds and any host other than Vercel get `Disallow: /`.

## Editing content

- **Site content** (name, summary, skills, work, education, projects, social links, dock items) is configured in [`src/data/resume.tsx`](./src/data/resume.tsx).
- **Logos and images** go in `public/`.
- **Blog posts** are MDX files in [`content/`](./content). The file name is the URL slug. Frontmatter: `title`, `publishedAt`, `summary` (required) and `updatedAt`, `author`, `image` (optional; `image` is a site-relative path). Start headings at `##`, because the page renders the title.

## Project structure

```
src/
  app/            routes, layout, global CSS, 404, OG images
  components/
    section/      page sections (work, projects, contact, hackathons)
    ui/           shadcn/ui components
    magicui/      Magic UI components (dock, blur fade, flickering grid)
    mdx/          MDX code blocks and media
  data/resume.tsx single content config
  lib/            feature flags, helpers
content/          blog posts (MDX)
public/           static assets and OG fonts
```

## Tooling notes

- ESLint is pinned to 9.x and TypeScript to 6.0.x until `eslint-plugin-react` and `typescript-eslint` support the newer majors.
- `pnpm.overrides` in `package.json` fixes security advisories in four transitive dependencies. Each override is keyed on the vulnerable version range, so it applies to any parent that pulls in an affected version:
  - `postcss-selector-parser` <6.1.5, today through `@tailwindcss/typography`
  - `minimatch` 7 to 11.0.0, today through `typescript-estree`
  - `toml` <5.0.1, today through `remark-mdx-frontmatter`
  - `uuid` <11.1.1, today through `mdx-bundler`

  Remove an override once no parent needs it. `pnpm audit` is part of the verification gate.

- The project targets Node 24: `.nvmrc`, `engines` (`24.x`, which also sets the Vercel runtime) and `@types/node` (^24). Moving to Node 26 means changing all three together.
- `packageManager` pins pnpm 10.34.9, so corepack uses the version that wrote the lockfile.
- Fonts: Instrument Serif (headings), Inter (body), IBM Plex Mono (code).
- Commits that only reformat are listed in `.git-blame-ignore-revs`. GitHub's blame view skips them automatically. For local `git blame`, run `git config blame.ignoreRevsFile .git-blame-ignore-revs` once.
- Project guidance for AI coding agents lives in [`CLAUDE.md`](./CLAUDE.md) and [`.claude/`](./.claude).

## License

MIT, see [LICENSE](./LICENSE). Original template copyright Dillion Verma.
