---
paths:
  - "src/**/*.tsx"
  - "content/**/*.mdx"
---
# Accessibility

Target WCAG 2.1 AA. The main known gap is reduced-motion support (see Motion).

- **One `h1` per page.** Every route has exactly one (the hero uses `<BlurFadeText as="h1">`). New pages must too, and headings must not skip levels.
- **Icon-only controls need an accessible name.** Dock links and the theme toggle carry `aria-label`; do the same for any new icon-only link or button, and give decorative icons `aria-hidden`. A link that only duplicates another link (like a project card's video thumbnail) is `aria-hidden` with `tabIndex={-1}`.
- **Images:** meaningful `alt` text; empty `alt=""` for purely decorative images. Logos use the company name.
- **Contrast** must hold in both light and dark themes. Don't rely on `text-muted-foreground` for essential text on top of the `FlickeringGrid`.
- **Focus:** keep a visible focus ring on interactive elements (existing code uses `focus-visible:ring-2`). Don't remove outlines.
- **Motion:** `BlurFade`, `BlurFadeText` and `FlickeringGrid` animate continuously and don't yet honor `prefers-reduced-motion`. Respect it in any new animation, and add it to these when you touch them.
- **Links** that open a new tab use `rel="noopener noreferrer"` and make that clear in the label when it isn't obvious.
- **Blog posts:** don't put a `#` heading in the MDX body (the page already renders the title as an `h1`); start at `##`.
- Don't set `user-scalable=no` or lock zoom.
