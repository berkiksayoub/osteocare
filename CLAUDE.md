# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OstéoCare is a static multi-page website for an osteopathy practice located at 22 Rue de la République, 34000 Montpellier. It is French-language only. There is no build system, bundler, framework, or package manager — all pages are standalone `.html` files with inline CSS and inline JavaScript.

**Contact info embedded across the site:**
- Phone: `04 34 66 00 00` (`tel:+33434660000`)
- Email: `contact@osteocare.fr`
- Address: `22 Rue de la République, 34000 Montpellier`

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, interactive body-map zone selector, techniques preview, reviews, map, partners |
| `avis.html` | Patient reviews page |
| `techniques.html` | Osteopathy techniques listing |
| `cabinet.html` | Practice description and access info |
| `rendez-vous.html` | Appointment booking — interactive weekly calendar + modal form |

## Architecture

**No shared files.** Every page is self-contained: CSS lives in a `<style>` block in `<head>`, JavaScript lives in a `<script>` block before `</body>`. Changing shared elements (header, footer, nav, design tokens) means updating **every file**.

**Design tokens** — identical `:root` block in all five files:
```css
--accent: #2F80ED   /* primary blue */
--accent-deep: #1A5AAE
--text: #1A2540
--bg: #FFFFFF
--bg-2: #F5F7FA
--bg-3: #EEEFFD
```
Fonts: `Manrope` (headings, brand, buttons) and `Inter` (body), loaded from Google Fonts.

**Navigation** — each page has two nav copies (desktop `.nav-links` and `.mobile-menu`) plus a footer with the full link list. The `active` class is set on the `<a>` matching the current page.

**Scroll-reveal animations** — `index.html` uses an `IntersectionObserver` to add `.visible` to elements with class `.reveal`, triggering a CSS opacity/translate-Y transition.

**Sticky CTA** — `index.html` shows a floating "Prendre rendez-vous" button that appears after the hero and hides when the final CTA or footer is in view.

**Interactive body map** (`index.html`) — SVG hotspots with `data-zone` attributes; `selectZone(zone)` reads from `zoneData` object and updates the info panel and CTA link.

**Appointment calendar** (`rendez-vous.html`) — pure client-side, no backend. Uses seeded `Math.sin()` to generate deterministic fake "taken" slots. `renderCalendar()` builds the weekly grid; `selectSlot()` opens a modal; `submitForm()` fakes a submission (shows a confirmation panel, no actual POST). The booking system is entirely presentational.

## Development

**To preview:** open any `.html` file directly in a browser, or serve with any static server:
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

No compilation, no dependencies to install.

## Conventions

- All user-visible text is in **French**.
- Map images are inlined as `data:image/webp;base64` — do not replace them with external URLs.
- Class naming is BEM-adjacent kebab-case (`.site-header`, `.hero-split`, `.btn-primary`).
- Responsive breakpoints: `@media (max-width: 768px)` for tablet/mobile, `@media (max-width: 480px)` for small phones.
- The burger menu toggled by `toggleMenu()` exists in every page and follows the same pattern.
