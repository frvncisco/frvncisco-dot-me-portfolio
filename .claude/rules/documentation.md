# Documentation

- Keep `README.md` accurate: stack, commands, feature flags, project structure. Update it in the same change that alters any of those.
- `.env.example` must list every `FEATURE_*` flag read in `src/lib/flags.ts`. Add new flags in both places.
- Update `CLAUDE.md` and the relevant `.claude/rules/*.md` when a convention, command, pin or gotcha changes. Keep `CLAUDE.md` under about 200 lines; move detail into a rule.
- Code comments explain non-obvious reasons (build-time env, browser quirks, library pins). Don't narrate what the code does, and don't leave TODO comments without an owner or reason.
- Record pinned dependencies and why in the commit message and PR (e.g. eslint 9, typescript 6.0).
- Don't write new standalone docs files unless asked.
