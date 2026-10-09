@AGENTS.md

# Portfolio site (heyfrancisco.me)

Personal portfolio and blog. Next.js 16 (App Router), React 19, TypeScript 6, Tailwind CSS v4, shadcn/ui (`new-york`) plus Magic UI components, MDX blog via content-collections, `next-themes` for light/dark. Package manager is pnpm. Started from the magicuidesign/portfolio template; much of the content is still template placeholder (see "Placeholder content").

Detailed, topic-specific guidance lives in `.claude/rules/`. Read those before changing the matching area.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`, `pnpm lint`, `pnpm exec tsc --noEmit`.
- Verification gate before calling work done: `tsc --noEmit`, `lint`, then `build` with all flags on (`FEATURE_BLOG=true FEATURE_WORK=true FEATURE_CONTACT=true pnpm build`). `build` type-checks **every** file, including components nothing imports.
- Stop `next dev` before `next build` (they share `.next`).
- Local quirk: corepack's pnpm shim is broken on this machine. Use `npx -y pnpm@10 <cmd>` with Node 24 on PATH (`export PATH=~/.nvm/versions/node/v24.2.0/bin:$PATH`; `.nvmrc` is `24`). `.claude/launch.json` starts the dev server via `./node_modules/.bin/next dev`.

## Layout

- `src/app/`: routes. `/` (hero), `/about`, `/work`, `/contact`, `/blog`, `/blog/[slug]`, custom `not-found.tsx`, three `opengraph-image.tsx` routes. `layout.tsx` holds fonts, `ThemeProvider`, the content column (`max-w-2xl`, `py-12 pb-24 sm:py-24 px-6`) and the dock `Navbar`.
- `src/components/section/`: page sections (`work-section`, `projects-section`, `contact-section`, `hackathons-section`). `ui/` is shadcn; `magicui/` is Magic UI (`blur-fade`, `dock`, `flickering-grid`); `mdx/` is MDX code blocks.
- `src/data/resume.tsx`: the single content config (name, summary, skills, nav, social, work, education, projects).
- `src/lib/flags.ts`: feature flags. `src/lib/utils.ts`: `cn`, `formatDate`.
- `content/*.mdx`: blog posts, compiled by `content-collections.ts` (schema + `compileMDX`). `.content-collections/` is generated and gitignored; import via the `content-collections` alias.
- `@/*` maps to `src/*`.

## Conventions that are easy to get wrong

- **Feature flags**: `/blog`, `/work`, `/contact` are hidden unless `FEATURE_BLOG` / `FEATURE_WORK` / `FEATURE_CONTACT` equals `"true"`. Gated pages call `notFound()`; the dock hides the matching `DATA.navbar` entry (its `flag` field); `blog/[slug]` `generateStaticParams` returns `[]` when off. Flags are read at build time, so changing them on a host needs a redeploy. The `opengraph-image` routes are not gated. See `.env.example`.
- **Fonts**: `--font-sans` Inter (body), `--font-serif` Instrument Serif (all `h1`-`h6`, set in `globals.css`), `--font-mono` IBM Plex Mono (code). Instrument Serif only has weight 400, so `font-synthesis-weight: none` is set; Radix accordion headers are `<h3>` and are reset with `font-sans`.
- **Homepage**: a `FlickeringGrid` is `fixed inset-0` on `/` only (not in the layout). The hero `main` height subtracts the layout padding (`min-h-[calc(100dvh-9rem)] sm:min-h-[calc(100dvh-12rem)]`) so the page fits one screen.
- **Tailwind v4** is configured in CSS (`@import "tailwindcss"`, `@theme inline` in `globals.css`). There is no `tailwind.config.ts`; `components.json` still names one, which is stale.
- **Dark mode** is the `.dark` class (`next-themes`, default light). Colors come from CSS variables; avoid hard-coded colors.
- **Pins**: `eslint` stays on 9.x (eslint-plugin-react crashes on 10) and `typescript` on 6.0.x (typescript-eslint needs <6.1). Don't bump without checking.
- `next.config.mjs` sends `X-Frame-Options: DENY`, so the site can't be loaded in an iframe.
- `next dev` regenerates the Next.js block in `AGENTS.md`/`CLAUDE.md`; leave them committed so the tree stays clean.

## Placeholder content (not yet real)

Lorem ipsum summary/description/work text, Dillion Verma's projects (with his links and videos), social URLs `dub.sh/dillion-*`, `hello@example.com`, and sample blog posts by "John Doe". Logos for work/education are expected at `public/niche.png`, `blackhawk.png`, `coursera.png`, `unh.png` and aren't added yet (a gray circle shows). `hackathons-section.tsx` is kept for reuse but not rendered; `DATA.hackathons` is an empty typed array.

## Workflow

Plan first for anything beyond a small fix. Branch flow is feature branch to `dev` (staging) to `main`. See `.claude/rules/git-workflow.md`. Review diffs with the `code-reviewer` agent.
