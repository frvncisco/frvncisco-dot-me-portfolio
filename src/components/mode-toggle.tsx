"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Spreads the rest of the props so it can sit under a Radix `TooltipTrigger asChild`,
// which passes its event handlers, data-state and ref through to the button.
// Toggles from `resolvedTheme`, not `theme`: a stored theme of "system" would otherwise
// make the first click set the theme that's already showing.
export function ModeToggle({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="link"
      aria-label="Toggle theme"
      size="icon"
      {...props}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <SunIcon className="h-full w-full dark:hidden" aria-hidden />
      <MoonIcon className="hidden h-full w-full dark:block" aria-hidden />
    </Button>
  );
}
