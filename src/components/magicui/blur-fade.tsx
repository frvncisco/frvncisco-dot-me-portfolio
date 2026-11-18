import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  blur?: string;
}

// A CSS animation (see `.blur-fade` in globals.css), not motion: motion's `initial` is rendered
// into the server HTML as opacity 0, so the content stayed invisible until hydration. Under
// reduced motion the animation is off and the content simply shows.
export default function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  blur = "6px",
}: BlurFadeProps) {
  return (
    <div
      className={cn("blur-fade", className)}
      style={
        {
          "--bf-duration": `${duration}s`,
          "--bf-delay": `${0.04 + delay}s`,
          "--bf-y": `${-yOffset}px`,
          "--bf-blur": blur,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
