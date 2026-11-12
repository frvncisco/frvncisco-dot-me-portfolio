import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Turns off stylistic rules that conflict with Prettier. Keep it last.
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".content-collections/**",
    // Claude Code checks out worktrees inside the repo; they are copies, not project source.
    ".claude/worktrees/**",
  ]),
]);

export default eslintConfig;
