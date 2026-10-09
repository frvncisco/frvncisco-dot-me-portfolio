---
paths:
  - "src/**/*.tsx"
  - "content/**/*.mdx"
---
# Accessibility

Target WCAG 2.1 AA. Known gaps are listed so they aren't made worse:

- **One `h1` per page.** `/`, `/about`, `/work` and `/contact` currently have none (the hero text is a styled `BlurFadeText`, sections use `h2`). New pages must have exactly one `h1`, and headings must not skip levels.
- **Icon-only controls need an accessible name.** The dock links in `navbar.tsx` and the theme toggle show a tooltip but have no `aria-label`; add one when touching them. Decorative icons get `aria-hidden`.
- **Images:** meaningful `alt` text; empty `alt=""` for purely decorative images. Logos use the company name.
- **Contrast** must hold in both light and dark themes. Don't rely on `text-muted-foreground` for essential text on top of the `FlickeringGrid`.
- **Focus:** keep a visible focus ring on interactive elements (existing code uses `focus-visible:ring-2`). Don't remove outlines.
- **Motion:** `BlurFade`, `BlurFadeText` and `FlickeringGrid` animate continuously and don't yet honor `prefers-reduced-motion`. Respect it in any new animation, and add it to these when you touch them.
- **Links** that open a new tab use `rel="noopener noreferrer"` and make that clear in the label when it isn't obvious.
- **Blog posts:** don't put a `#` heading in the MDX body (the page already renders the title as an `h1`); start at `##`.
- Don't set `user-scalable=no` or lock zoom.
