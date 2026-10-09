---
paths:
  - "src/**/*.{ts,tsx}"
  - "content-collections.ts"
---
# Code style and quality

- TypeScript is `strict`. No `any` (the existing `remark-code-meta.ts` and `code-block.tsx` casts are legacy, don't add more). Prefer explicit types for data shapes (see `Education` and `Hackathon` in `src/data/resume.tsx`).
- Import app code through the `@/` alias (`@/*` -> `src/*`), not deep relative paths. Import generated blog data from `content-collections`.
- Components are server components by default. Add `"use client"` only when you need state, effects, refs or browser APIs, and keep the client boundary as small as possible (see `LogoImage`, `code-block`, `work-section`).
- Match the file you are editing: most files use 2 spaces and double quotes; `src/data/resume.tsx` and `src/app/page.tsx` use tabs and single quotes. There is no Prettier config, so don't reformat unrelated lines.
- Style with Tailwind utilities and the CSS variables in `src/app/globals.css`. Use `cn()` from `@/lib/utils` to merge classes. Don't hard-code colors; use the theme tokens so dark mode works.
- Prefer existing building blocks (`src/components/ui`, `src/components/magicui`) over adding a dependency. Add shadcn components with the shadcn CLI.
- No dead code, no commented-out blocks, no unused imports. Comments explain why, not what.
- Don't bump `eslint` past 9.x or `typescript` past 6.0.x (see `CLAUDE.md` pins).
- Every change must pass `tsc --noEmit` and `lint` with zero errors.
