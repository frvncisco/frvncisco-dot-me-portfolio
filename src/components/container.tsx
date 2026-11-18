import { cn } from "@/lib/utils";

// The one page container: max width and gutter come from the tokens in globals.css. A section that
// should span the full width simply doesn't use it (see "Layout widths" in CLAUDE.md).
export function Container({
  as: Comp = "div",
  className,
  ...props
}: React.ComponentProps<"div"> & { as?: "div" | "main" }) {
  return (
    <Comp
      className={cn("mx-auto w-full max-w-(--container) px-(--gutter)", className)}
      {...props}
    />
  );
}
