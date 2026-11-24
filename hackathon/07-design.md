---
status: draft
---

# Design

- [x] 1 Ask the four questions
- [x] 2 Recommend
- [x] 3 Compare live
- [x] 4 Pick and tune
- [x] 5 Check contrast
- [ ] 6 Freeze
- [ ] 7 Close

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
- fonts: Noto Serif Variable titles, Noto Sans Variable body, because Noto Sans is the Junta's family (familiar) and a classic serif title follows SheReady without being flashy.
- radius: 0.75rem, because SheReady uses wide rounded corners; soft but not pill-shaped.
- shadow: 1px lines and a 2px green underside, no diffuse blur, because calm and flat.
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
- <Brief-specific item>

## Always

- Visible focus.
- Labels on every field.
- Alt text on every image.
- Never colour alone.
- Real buttons.
- 24px minimum targets.
- Reduced motion respected.

## Effects

Preset effects (2-4): <effect>, <effect>.
Any other effect only for a Beat (`t`), at most one per screen: <effect: Beat t / none>.

## Usage rules

- <where a font, colour or effect is used, and where it is not>
