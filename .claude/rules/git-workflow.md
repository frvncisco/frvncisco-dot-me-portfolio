# Git workflow

- **Branch flow:** feature branch -> `dev` (staging, flags on) -> `main`. Open PRs against `dev`; promote `dev` to `main` with its own PR. Don't push directly to `dev` or `main`.
- **Old history:** the pre-reset `main` is tagged `archive/pre-reset`. Don't delete the tag.
- **Commits:** small, logical commits with an imperative subject and a short body saying why. Separate unrelated changes (e.g. content edits vs code fixes). End with the `Co-Authored-By` trailer for the assisting model when one is configured.
- **Hooks:** no Husky/lint-staged hooks are installed, so the verification gate in `testing.md` is the check. Don't use `--no-verify` to hide a failing gate.
- **Check `git status` before committing.** The user edits files (notably `src/data/resume.tsx`) outside of Claude sessions. Stage specific paths (`git add <path>`), not `git add -A`, and never fold their uncommitted edits into an unrelated commit without asking.
- `AGENTS.md` and `CLAUDE.md` are rewritten by `next dev`; commit them with related work so the tree stays clean.
- Never force-push, reset or delete shared branches without explicit approval. Don't commit `.env*` (except `.env.example`), `.claude/launch.json`, or generated `.content-collections/`.
- PR descriptions: summary, what was verified, anything not verified or left unresolved. Keep pinned dependencies and their reason in the PR.
