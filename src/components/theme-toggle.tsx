"use client";

import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// next-themes owns the theme and its storage; the toggler only animates the switch. Under reduced
// motion the reveal is instant. next-themes reads the saved theme as soon as it runs in the
// browser, so until hydration is done the icon must match the server's (light), or React throws
// a hydration mismatch.
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <AnimatedThemeToggler
      theme={hydrated && resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={setTheme}
      duration={reduceMotion ? 0 : 400}
      className={className}
    />
  );
}
