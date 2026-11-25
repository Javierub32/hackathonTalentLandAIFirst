---
status: draft
issue: 37
lane: web
owner: alraro
---

# Build #37 · Marco de la app con el estilo del cartel + inicio con ofertas

- [x] 1 Pick
- [x] 2 Read
- [ ] 3 Implement
- [ ] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Files owned

- `web/src/app/layouts/`
- `web/src/components/brand/`
- `web/src/screens/offers/` (salvo `fixtures.json`)

## Criterios de aceptación

- [ ] `AppLayout` con cabecera fina y logo, sin barra lateral; el menú solo enseña «Ofertas».
- [ ] Decoración de marca (bandas diagonales y triángulo de esquina, bosque y menta, `aria-hidden`, `pointer-events: none`) en todas las pantallas.
- [ ] `Etiqueta` (antetítulo en flecha del cartel) reutilizable.
- [ ] `/` muestra «Hola, Pilar» + una frase y las ofertas en un solo nivel; insignia Emplea-T donde aplica.
- [ ] Sin scroll a 1366×768 con las ofertas de la demo; texto ≥ 18px, foco visible.

## Notas

- La oferta de perfumería no tiene `hiring_aid` en los datos; la insignia Emplea-T sale en las ofertas que sí lo tienen (no se inventa).
