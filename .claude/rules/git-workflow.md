# Git workflow

- **Branch flow:** feature branch -> `dev` (staging, flags on) -> `main`. Open PRs against `dev`; promote `dev` to `main` with its own PR. Don't push directly to `dev` or `main`.
- **Old history:** the pre-reset `main` is tagged `archive/pre-reset`. Don't delete the tag.
- **Commits:** follow the `commit` skill (`.claude/skills/commit`): conventional format `type(scope): subject` (imperative, no period, about 50 characters), body only when the subject isn't enough. Small, logical commits; separate unrelated changes (e.g. content edits vs code fixes). Stage specific paths rather than everything (see below). End with the `Co-Authored-By` trailer for the assisting model when one is configured.
- **Hooks:** no Husky/lint-staged hooks are installed, so the verification gate in `testing.md` is the check. Don't use `--no-verify` to hide a failing gate.
- **Check `git status` before committing.** The user edits files (notably `src/data/resume.tsx`) outside of Claude sessions. Stage specific paths (`git add <path>`), not `git add -A`, and never fold their uncommitted edits into an unrelated commit without asking.
- `AGENTS.md` and `CLAUDE.md` are rewritten by `next dev`; commit them with related work so the tree stays clean.
- Never force-push, reset or delete shared branches without explicit approval. Don't commit `.env*` (except `.env.example`), `.claude/launch.json`, or generated `.content-collections/`.
- PR descriptions: summary, what was verified, anything not verified or left unresolved. Keep pinned dependencies and their reason in the PR.
- **`gh` commands must name the repo:** this clone has `upstream` (leerob/next-mdx-blog) and `magicui` remotes, so bare `gh pr ...` can resolve to the wrong repository. Always pass `-R frvncisco/frvncisco-dot-me-portfolio`.
- **PR review:** use the `pr-review` skill (`/pr-review <n>`). It reports findings locally and doesn't post to GitHub unless asked.
