---
status: done
---

# Design

- [x] 1 Ask the four questions
- [x] 2 Recommend
- [x] 3 Compare live
- [x] 4 Pick and tune
- [x] 5 Check contrast
- [x] 6 Freeze
- [x] 7 Close

## Brief

- Brand: none (heard: Driver, 2026-11-24 "hacemos lo nuestro").
- References: Junta de Andalucía identity (green Pantone 356, Noto Sans; https://www.juntadeandalucia.es/identidad); accessibility guides for older users (large text, common fonts, no thin or decorative type, big separated targets; https://web.dev/learn/accessibility/typography?hl=es); SheReady (https://github.com/mafese3/sheready, from `hackathon/sources/notas-equipo-definicion.md`): ivory background, one brand colour, soft tinted surfaces, serif titles, sans body. Driver rejected the 5 stock presets as too modern, informal or techie (2026-11-24).
- Feeling: cercana, tranquila, familiar (made for Spanish people over 45; nothing foreign-looking or international).
- Mode: light only.

## Base

Preset: `sobrio` (new, `design/presets/sobrio.json`). Level: 4, built from the references; chosen by the Driver over the all-sans variant `sobrio-sans` (2026-11-24, "sobrio me sirve por ahora").

## Changes from the preset

- colors: ivory background, deep green `primary` (own tone, darker than Junta's Pantone 356), light-green `secondary`/`accent` surfaces, green-black text, because the Driver wants white and light greens familiar to Andalucía without looking like an official Junta site; darker green keeps white text legible.
- colors.dark: removed, and `web/src/app/providers.tsx` forces light, because the Brief asks for light only.
- fonts: Noto Sans Variable for titles (weight 800) and body, because the poster and the deck use a bold sans and the app must look like them (changed during Build, from Noto Serif titles).
- radius: 0.4rem, because the poster and deck use tight corners and diagonal cuts (changed during Build, from 0.75rem).
- shadow: 1px lines and a solid mint offset under highlighted pieces (like the deck's persona card), no diffuse blur.
- colours: the poster palette (forest `#204437`, night `#183a2e`, mid `#2f604a`, mint `#cce5cc`, background `#f8faf7`), because app, deck and poster must read as one brand (changed during Build).
- motion: 120/200/300 ms, no overshoot, soft spring, because calm and nothing that distracts.
- focus: 3px ring, 2px offset, because high visibility for older users.
- effects: DrawnUnderline, ScrollProgressRule only, because the rest read as modern or playful.

## Never

- Purple-to-blue gradients.
- Inter everywhere.
- Emojis as icons.
- Default glassmorphism.
- A centred "Revolutionize your X" hero.
- Three-column icon cards.
- Generic diffuse shadows.
- `rounded-2xl` everywhere.
- Dark mode, neon, gradients or tech look (Brief: familiar, calm, light only).
- Junta, IMFE or SEPE logos, or their exact green: we must not look like an official site.
- English UI words or anglicisms ("dashboard", "match", "score"); "ATS" only once, explained as "filtro automático".
- Body text under 18px; thin or light font weights; all-caps paragraphs.
- Stock photos of smiling young people in offices.
- Animations that move content on their own (carousels, autoplay, blobs).
- Boxes inside boxes (a card inside a card inside a panel): one surface level per piece of content.
- Flat empty screens: every app screen carries the brand's geometric decoration.
- Scrolling inside the demo flow: offers, CV and interview each fit one 1366×768 screen.

## Always

- Visible focus.
- Labels on every field.
- Alt text on every image.
- Never colour alone.
- Real buttons.
- 24px minimum targets.
- Reduced motion respected.
- 48px minimum height for main buttons, with a text label (icon alone is not enough).
- One main action per screen, in `primary`.
- Geometric decoration as in the poster and deck: diagonal bands and corner triangles in forest and mint, in the background, decorative only (`pointer-events: none`, `aria-hidden`).
- Section labels as the poster's arrow tag (mint band with a pointed right end, bold text).
- Logo in the app header.

## Effects

Preset effects (2-4): DrawnUnderline, ScrollProgressRule.
Any other effect only for a Beat (`t`), at most one per screen: none.

## Usage rules

- `font-display` (Noto Sans 800): page titles and card titles only, never buttons, labels or body.
- Noto Sans (`font-sans`): everything else. Body `text-lg` (18px) minimum, line height 1.6, weight 400; buttons and labels weight 600.
- `primary` green: the one main button per screen, links and the active step. Never as a large background block behind long text.
- `secondary` / `accent` light green: highlighted cards (the selected offer, tips from the AI), never for buttons.
- Background near-white, content on white surfaces with a 1px `border`, never nested.
- `destructive` only for errors and deleting; state errors in words too.
- DrawnUnderline: one key phrase in the landing title or the Wow moment result, once per screen.
- ScrollProgressRule: long pages only (CV review, interview transcript).
