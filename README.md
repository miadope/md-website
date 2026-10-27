# mariadopheide.com

Static one-page site built with Tailwind CSS. The CSS is built **locally** and
the finished `assets/css/styles.css` is committed, so Netlify publishes the
files as they are, with no build step of its own.

## Structure

```
index.html                    markup: semantic classes, one section after another
assets/
  css/tailwind.css            ← SOURCE: tokens, base styles and components, edit here
  css/styles.css              ← BUILD OUTPUT, never edit by hand
  js/main.js                  mobile menu
  fonts/                      Nyght Serif (headings) + its licence, OFL.txt
  images/                     photos and the logo
netlify.toml                  publish settings
```

## Working on it

Once after cloning:

```bash
npm install
```

While working, rebuild the CSS on every change:

```bash
npm run watch
```

In another tab, a local server:

```bash
npm run serve
```

Open http://127.0.0.1:8765. Always go through the server: relative paths
do not work over `file://`.

## Before every commit

```bash
npm run build
```

This step is required: `styles.css` is part of the repository, and without a
rebuild the live site keeps the old styles.

## Design system

Everything lives in `assets/css/tailwind.css`.

| | |
|---|---|
| Tokens | `@theme` block: colours (`ink`, `bone`, `cream`, `accent`…) and fonts |
| Headings | Nyght Serif Light / Light Italic, self-hosted; every display size is multiplied by `--display-scale` |
| Body | Manrope from Google Fonts |
| Accent | `#FD3631`, the brand red, stays as it is |
| Grid | `.grid12` (12 columns), `.bento` (tiles), `.cols4` |
| Breakpoint | one, at 900px: below it every grid collapses to a single column and the burger menu appears |

Components (`.btn`, `.tile`, `.plan`, `.review-card`…) are written as plain CSS
in `@layer components`, one block per section, in page order.

Tailwind runs **without Preflight**: the design was drawn on browser defaults
plus the small reset in `@layer base`. Utilities still work for quick tweaks
(`bg-ink`, `text-accent`, `font-display`), and because utilities sit in a later
layer they win over components.

### Brand graphics

Background graphics built from the logo (chaos line in ADHD, timeline in How I
Work, ripple in Automations & AI, loop in the final call to action) are inline
SVG. They animate with CSS only and respect `prefers-reduced-motion`; where
scroll-driven animations are unsupported they show their final state.

### Motion

Page motion is plain CSS plus a little of `assets/js/main.js`, no libraries.
It is opt-in: an inline script in `<head>` adds `.motion` to `<html>` unless
the visitor prefers reduced motion, and only then do elements start hidden.
Without it (or without JavaScript) the page is static and fully visible.

Hooks in the markup:

| Attribute | Effect |
|---|---|
| `data-split` | heading words rise out of a mask, one after another |
| `data-reveal` | the block fades up as it enters the viewport; `="clip"` wipes its photo open |
| `data-stagger` | the group's children fade up in turn |
| `data-spot` | a soft light follows the pointer over the card |
| `--delay` | inline custom property to hold an element back, used in the hero |

Also: a red scroll-progress hairline, parallax on the large photos, and
buttons that drift toward the pointer (mouse only). The marquees are a plain
CSS loop at constant speed; each holds six copies of its text so even very
wide screens never show a gap.

## Logo, icons and share image

- `assets/images/logo.svg` is the vector logo (rebuilt from the original
  `logo.png`). On the page it is inlined as SVG with `fill="currentColor"`,
  so its colour comes from CSS: `.logo-mark { color: … }`.
- `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png` (180) and
  `assets/icons/icon-192.png`, `icon-512.png` with `site.webmanifest`: the
  logo in cream on a brand-red tile.
- `assets/images/og-image.jpg` (1200×630) is the preview shown when the link
  is shared; it is referenced by absolute URL in the Open Graph tags, so it
  only shows once the site is live on mariadopheide.com.

## Fonts

Nyght Serif by Maksym Kobuzan is licensed under the SIL Open Font License 1.1.
The licence travels with the files in `assets/fonts/OFL.txt` and must stay there.

## Publishing

```bash
npm run build && git add -A && git commit -m "message" && git push
```

Netlify deploys automatically after a push to `main`.

## Booking link

The calendar link appears in `index.html` seven times (including the header button):

```bash
grep -n "calendar.app.google" index.html
```
