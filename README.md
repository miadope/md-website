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
