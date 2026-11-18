"use client";

import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FocusEvent } from "react";

type NavItem = { href: string; label: string };

const EASE = [0.4, 0, 0.2, 1] as const;

// px steps down with the width: five links plus the toggle must fit a 320px phone.
const linkClass =
  "relative isolate block rounded-lg px-1 py-1.5 text-sm font-medium text-(--nav-fg-muted) transition-colors min-[360px]:px-2 sm:px-3 after:absolute after:inset-x-0 after:-inset-y-1 after:content-[''] hover:text-(--nav-fg) focus-visible:text-(--nav-fg) focus-visible:ring-2 focus-visible:ring-(--nav-fg) focus-visible:outline-hidden data-[active]:text-(--nav-fg)";

export function NavPill({ links }: { links: NavItem[] }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  // The highlight rests on the current page and follows the pointer or focus; motion's shared
  // layout animation slides it between links. It is in the server HTML for the current page.
  const highlighted = hovered ?? links.find(({ href }) => isActive(href))?.href;

  const clear = () => setHovered(null);
  const clearUnlessInside = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) clear();
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 py-4">
      <Container>
        {/* CSS, not motion: a motion `initial` is server-rendered as opacity 0, so the nav would stay
            invisible until hydration (or forever without JS). */}
        <div className="pointer-events-auto flex items-center justify-between rounded-xl bg-(--nav-bg) p-1 shadow-lg ring-1 ring-white/10 backdrop-blur-md motion-safe:animate-[nav-in_0.3s_ease-out_both]">
          <NavigationMenu className="flex-none" onMouseLeave={clear} onBlur={clearUnlessInside}>
            <NavigationMenuList className="space-x-0">
              {links.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild active={isActive(href)}>
                    <Link
                      href={href}
                      className={linkClass}
                      onMouseEnter={() => setHovered(href)}
                      onFocus={() => setHovered(href)}
                    >
                      {highlighted === href && (
                        <motion.span
                          aria-hidden
                          layoutId="nav-highlight"
                          className="absolute inset-0 -z-10 rounded-lg bg-(--nav-highlight)"
                          transition={{ duration: 0.15, ease: EASE }}
                        />
                      )}
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle className="relative grid size-8 place-items-center rounded-lg text-(--nav-fg-muted) transition-colors after:absolute after:-inset-1 after:content-[''] hover:text-(--nav-fg) focus-visible:text-(--nav-fg) focus-visible:ring-2 focus-visible:ring-(--nav-fg) focus-visible:outline-hidden [&_svg]:size-4" />
        </div>
      </Container>
    </div>
  );
}
