---
name: pr-review
description: Review a pull request for this portfolio repo against its conventions and report findings. Use when the user says "/pr-review", "review this PR", "review PR #N", or asks for feedback on a branch before merging. Read-only by default; never posts to GitHub unless explicitly asked.
---

# PR Review

Review a PR (or the current branch's PR) using the repo's own rules, and report findings locally.

## Input

An optional PR number or URL (e.g. `/pr-review 3`). With no argument, use the PR for the current branch: `gh pr view -R frvncisco/frvncisco-dot-me-portfolio <current-branch> --json ...`. If there is no PR, say so and review `git diff origin/dev...HEAD` instead.

**Always pass `-R frvncisco/frvncisco-dot-me-portfolio` to `gh pr ...`.** This clone also has `upstream` (leerob/next-mdx-blog) and `magicui` remotes, and bare `gh pr` commands resolve to the wrong repository (PR #3 came back as an unrelated "Convert to Now 2.0" PR from upstream).

## Workflow

1. **Gather context** (all read-only):
   - `gh pr view <n> -R frvncisco/frvncisco-dot-me-portfolio --json number,title,state,isDraft,baseRefName,headRefName,body,files,commits,additions,deletions`
   - `gh pr checks <n> -R frvncisco/frvncisco-dot-me-portfolio` (report CI state; "no checks" is fine)
   - `git fetch origin <baseRefName> <headRefName>` then `git diff origin/<base>...origin/<head>` for the diff. Use `gh pr diff <n> -R frvncisco/frvncisco-dot-me-portfolio` if the fetch isn't possible.
2. **Check the PR itself** against `.claude/rules/git-workflow.md`:
   - Base branch: feature branches target `dev`; only `dev` targets `main`. Flag anything else.
   - Size and focus: unrelated changes mixed together, or someone's uncommitted personal edits (notably `src/data/resume.tsx`) bundled into an unrelated change.
   - Description: has a summary, what was verified, and what wasn't; lists any dependency pins and why.
   - Commits: logical, clear subjects, no secrets, no `.env*` (except `.env.example`), no `.claude/launch.json`, no generated `.content-collections/`.
3. **Review the code.** Delegate to the `code-reviewer` subagent, giving it the exact range (`origin/<base>...origin/<head>`) and asking it to cite `path:line`. It is read-only and applies `CLAUDE.md` and the matching `.claude/rules/` files (code style, accessibility, content-blog, documentation, testing). If subagents aren't available, do the same review inline.
4. **Cross-check the gaps a diff hides:**
   - New or changed `/blog`, `/work`, `/contact` routes: gated with `notFound()`, dock entry `flag` set, `.env.example` and `src/lib/flags.ts` in sync.
   - `src/data/resume.tsx` edits: every consumer still type-checks (the whole project is type-checked, including unimported components).
   - Dependency changes: justified, one major at a time; `eslint` stays 9.x and `typescript` 6.0.x; lockfile changes match `package.json`.
   - Docs: README, `.env.example`, `CLAUDE.md`/rules updated when behavior or conventions changed.
5. **Verify only what you can.** If the PR head is the checked-out branch and the tree is clean, run the gate from `.claude/rules/testing.md` (`tsc --noEmit`, `lint`, flags-on `build`). Don't switch branches or stash someone's work to do it. Say clearly what you ran and what you didn't.

## Output

```
## PR #<n>: <title>  (<head> -> <base>)
Verdict: Approve | Request changes | Comment
CI: <state>   Verified locally: <list or "nothing run">

### Blocking
- path:line - problem, why it matters, suggested fix
### Should fix
### Nits
### PR hygiene
- base branch, description, scope, commits
### Not verified
```

Be specific and brief: cite `path:line`, skip praise, and don't report anything you didn't confirm in the code. Omit empty sections.

## Posting to GitHub

Do not post anything by default. If the user asks, show the draft first and get a clear yes, then use `gh pr review <n> -R frvncisco/frvncisco-dot-me-portfolio --comment|--approve|--request-changes -b "<body>"` (or `gh pr comment`). Posting is visible to others and can't be cleanly undone.
