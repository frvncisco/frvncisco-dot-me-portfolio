# Testing and verification

There is no test framework in this repo, and don't add one (Vitest, Playwright, etc.) without asking first. The only automated tests use Node's built-in runner (`pnpm test`, files named `*.test.ts` under `src/`) and cover pure library code. Test files can't import through the `@/` alias, so keep testable logic in its own file (see `normalize-site-url.ts`). Everything else is a manual gate; run it before calling work done:

1. `pnpm format:check`, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test` and `pnpm audit`, all clean. `pnpm audit` currently reports two `picomatch` advisories (via `@content-collections/core` and `eslint-config-next`) with no patched version; they only affect build-time file matching, so recheck for a fix and treat anything new as a failure. The repo has no CI, so this is the only check for advisories before merging. On a fresh clone or worktree, run `pnpm build` or `pnpm dev` once before `tsc`. They generate the gitignored `.content-collections/`, and without it `tsc` can't resolve the `content-collections` import.
2. `FEATURE_BLOG=true FEATURE_WORK=true pnpm build`. It type-checks the whole project, including unimported files. Expect `/writings` to stay dynamic and `/about` and `/work` to be static.
3. Run the dev server (`.claude/launch.json`, or with the flags above) and check in the browser pane:
   - Affected pages in light and dark mode (use the nav's toggle, or set `localStorage.theme`) and at a phone width (about 375px). Re-measure contrast for any text over the hero sky in both themes. No horizontal overflow (`documentElement.scrollWidth` equals `clientWidth`).
   - No console errors or failed requests that your change caused.
   - With flags off (default) the gated routes return 404 and render `not-found.tsx`; with flags on they return 200.
   - For layout changes on `/`, confirm the `#hero` section starts at `0` and its height equals `innerHeight`; everything after it (and the footer) is below the fold, so the page scrolls.
4. Wait for animated content (`BlurFade`) to finish before screenshots or text checks; it starts blurred.

Report what you ran and what you did not run. If the dev server and `build` both need `.next`, stop one first.
