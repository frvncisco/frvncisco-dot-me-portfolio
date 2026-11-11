import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle, ThemeIcon } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { FEATURE_FLAGS } from "@/lib/flags";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

const dockIconClass =
  "size-full cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground backdrop-blur-3xl transition-colors hover:bg-muted hover:text-foreground";

function NavTooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        <p>{label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

// Internal paths use next/link so a click is a client-side navigation, not a full page load.
function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const icon = (
    <DockIcon className={dockIconClass}>
      <Icon className="size-full overflow-hidden rounded-sm object-contain" />
    </DockIcon>
  );

  return (
    <NavTooltip label={label}>
      {href.startsWith("/") ? (
        <Link href={href} aria-label={label}>
          {icon}
        </Link>
      ) : (
        <a
          href={href}
          aria-label={label}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {icon}
        </a>
      )}
    </NavTooltip>
  );
}

export default function Navbar() {
  return (
    <nav aria-label="Main" className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="pointer-events-auto relative z-50 mx-auto flex min-h-16 w-fit max-w-[calc(100vw-1rem)] flex-wrap justify-center gap-2 border bg-card/90 p-2 shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl">
        {DATA.navbar
          .filter((item) => item.flag === null || FEATURE_FLAGS[item.flag])
          .map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
        <Separator orientation="vertical" className="m-auto hidden h-2/3 w-px bg-border sm:block" />
        {Object.values(DATA.contact.social)
          .filter((social) => social.navbar)
          .map((social) => (
            <NavLink key={social.name} href={social.url} label={social.name} icon={social.icon} />
          ))}
        <Separator orientation="vertical" className="m-auto hidden h-2/3 w-px bg-border sm:block" />
        {/* The button wraps the DockIcon, like the links above, so the whole magnified icon is
            the click target and the tooltip trigger. */}
        <NavTooltip label="Theme">
          <ModeToggle className="h-auto w-auto cursor-pointer rounded-3xl p-0">
            <DockIcon className={dockIconClass}>
              <ThemeIcon className="size-full" />
            </DockIcon>
          </ModeToggle>
        </NavTooltip>
      </Dock>
    </nav>
  );
}
