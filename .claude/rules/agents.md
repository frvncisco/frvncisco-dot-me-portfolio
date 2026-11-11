# Agent Rules

## When to Use Subagents

- Use a subagent for tasks that require focused expertise (security audit, performance analysis, test generation).
- Use a subagent when the main task would exceed the context window if done inline.
- Use a subagent for parallel work streams that do not depend on each other.
- Do not use a subagent for simple, single-step tasks. The overhead is not worth it.

## Progressive Disclosure

- Start with the high-level structure before diving into details.
- Show the plan before executing it. Get confirmation on the approach.
- Report progress incrementally: what was done, what is next.
- Surface important decisions that need human input early in the process.

## Safety and Guardrails

- Never run destructive commands (rm -rf, DROP TABLE, force push) without explicit confirmation.
- Validate assumptions before acting on them. Read the code before modifying it.
- Prefer reversible changes. Commit before refactoring so rollback is easy.
- When uncertain, ask rather than guess. A wrong assumption costs more than a clarifying question.
