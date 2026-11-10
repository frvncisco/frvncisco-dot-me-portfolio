# Testing and verification

There is no automated test framework in this repo. Do not add one (Vitest, Playwright, etc.) without asking first. Verification is a manual gate; run it before calling work done:

1. `pnpm format:check`, `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm audit`, all clean. The repo has no CI, so this is the only check for advisories before merging.
2. `FEATURE_BLOG=true FEATURE_WORK=true FEATURE_CONTACT=true pnpm build`. It type-checks the whole project, including unimported files. Expect `/blog` to stay dynamic and `/about`, `/work`, `/contact` to be static.
3. Run the dev server (`.claude/launch.json`, or with the flags above) and check in the browser pane:
   - Affected pages in light and dark mode, and at a phone width (about 375px). No horizontal overflow (`documentElement.scrollWidth` equals `clientWidth`).
   - No console errors or failed requests that your change caused.
   - With flags off (default) the gated routes return 404 and render `not-found.tsx`; with flags on they return 200.
   - For layout changes on `/`, confirm the page doesn't scroll (`scrollHeight` equals `innerHeight`).
4. Wait for animated content (`BlurFade`) to finish before screenshots or text checks; it starts blurred.

Report what you ran and what you did not run. If the dev server and `build` both need `.next`, stop one first.
