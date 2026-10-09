# heyfrancisco.me

Personal portfolio and blog for Francisco Santana.

Built with [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript, [Tailwind CSS](https://tailwindcss.com) v4, [shadcn/ui](https://ui.shadcn.com/) and [Magic UI](https://magicui.design/), with an MDX blog powered by [content-collections](https://www.content-collections.dev/). Based on the MIT-licensed [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio) template.

## Pages

| Route | Contents | Gated by |
| --- | --- | --- |
| `/` | Hero | always on |
| `/about` | About, work experience, education, skills | always on |
| `/work` | Projects | `FEATURE_WORK` |
| `/contact` | Contact | `FEATURE_CONTACT` |
| `/blog`, `/blog/[slug]` | MDX blog | `FEATURE_BLOG` |

## Getting started

Requires Node 24 (see `.nvmrc`) and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (type-checks the whole project) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint (`pnpm lint:fix` to autofix) |
| `pnpm exec tsc --noEmit` | Type-check only |

## Feature flags

`/blog`, `/work` and `/contact` are hidden by default: they return a 404 and their dock icons are removed. Turn one on by setting its variable to `true` (see [`.env.example`](./.env.example)):

```bash
FEATURE_BLOG=true
FEATURE_WORK=true
FEATURE_CONTACT=true
```

Flags are read at build time, so on a host like Vercel, change the environment variable and redeploy. Locally, restart the dev server. The flags live in [`src/lib/flags.ts`](./src/lib/flags.ts).

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
- Fonts: Instrument Serif (headings), Inter (body), IBM Plex Mono (code).
- Project guidance for AI coding agents lives in [`CLAUDE.md`](./CLAUDE.md) and [`.claude/`](./.claude).

## License

MIT, see [LICENSE](./LICENSE). Original template copyright Dillion Verma.
