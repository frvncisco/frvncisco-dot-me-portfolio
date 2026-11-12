"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

// MotionConfig sits here because this is the existing client provider the server layout wraps
// everything in. "user" drops movement (BlurFade's slide) when the OS asks for reduced
// motion; the fade and blur still play.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
