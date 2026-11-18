import { Button } from "@/components/ui/button";

// Foreground text and ring, not the muted and --ring greys: on `/` these links sit straight on the
// hero sky, where those greys fell short of 4.5:1 (text) and 3:1 (focus ring).
export function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="link"
      className="relative h-auto cursor-alias rounded-sm px-2 py-1 text-sm font-normal text-foreground decoration-wavy after:absolute after:inset-x-0 after:-inset-y-2 after:content-[''] focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-hidden"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Button>
  );
}
