"use client";

import { Container } from "@/components/container";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FocusEvent, type SyntheticEvent } from "react";

type NavItem = { href: string; label: string };

const EASE = [0.4, 0, 0.2, 1] as const;

const linkClass =
  "relative block rounded-sm px-1.5 py-1 text-sm text-foreground/70 transition-colors sm:px-2 after:absolute after:inset-x-0 after:-inset-y-2 after:content-[''] hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden data-[active]:text-foreground data-[active]:underline data-[active]:underline-offset-4";

export function NavPill({ links }: { links: NavItem[] }) {
  const pathname = usePathname();
  // The hover highlight belongs to the link under the pointer or focus. `slide` is false for the
  // first link after it was hidden, so it appears in place instead of sweeping in from the last one.
  const [highlight, setHighlight] = useState({ x: 0, width: 0, shown: false, slide: false });

  const show = (event: SyntheticEvent<HTMLElement>) => {
    const { offsetLeft, offsetWidth } = event.currentTarget;
    setHighlight((current) => ({
      x: offsetLeft,
      width: offsetWidth,
      shown: true,
      slide: current.shown,
    }));
  };
  const hide = () => setHighlight((current) => ({ ...current, shown: false, slide: false }));
  const hideUnlessInside = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) hide();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 py-4">
      <Container className="flex items-center justify-center sm:justify-start">
        {/* CSS, not motion: a motion `initial` is server-rendered as opacity 0, so the nav would stay
            invisible until hydration (or forever without JS). */}
        <div className="pointer-events-auto motion-safe:animate-[nav-in_0.3s_ease-out_both]">
          <NavigationMenu
            className="flex-none rounded-lg border border-border bg-background/70 p-1 shadow-md backdrop-blur-md"
            onMouseLeave={hide}
            onBlur={hideUnlessInside}
          >
            <motion.div
              aria-hidden
              className="absolute top-1 left-1 z-0 h-7 rounded-sm bg-foreground/10" // left-1 = the pill's p-1; offsetLeft is measured from the list, inside it
              initial={false}
              animate={{ x: highlight.x, width: highlight.width, opacity: highlight.shown ? 1 : 0 }}
              transition={{
                duration: 0.15,
                ease: EASE,
                x: { duration: highlight.slide ? 0.15 : 0 },
                width: { duration: highlight.slide ? 0.15 : 0 },
              }}
            />
            <NavigationMenuList className="relative z-10 space-x-0">
              {links.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild active={isActive(href)}>
                    <Link href={href} className={linkClass} onMouseEnter={show} onFocus={show}>
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </Container>
    </div>
  );
}
