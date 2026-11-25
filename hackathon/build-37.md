---
status: draft
issue: 37
lane: web
owner: alraro
---

# Build #37 · Marco de la app con el estilo del cartel + inicio con ofertas

- [x] 1 Pick
- [x] 2 Read
- [x] 3 Implement
- [x] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Files owned

- `web/src/app/layouts/`
- `web/src/components/brand/`
- `web/src/screens/offers/` (salvo `fixtures.json`)

## Criterios de aceptación

- [x] `AppLayout` con cabecera fina y logo, sin barra lateral; el menú solo enseña «Ofertas».
- [x] Decoración de marca (bandas diagonales y triángulo de esquina, bosque y menta, `aria-hidden`, `pointer-events: none`) en todas las pantallas.
- [x] `Etiqueta` (antetítulo en flecha del cartel) reutilizable.
- [x] `/` muestra «Hola, Pilar» + una frase y las ofertas en un solo nivel; insignia Emplea-T donde aplica.
- [x] Sin scroll a 1366×768 con las ofertas de la demo; texto ≥ 18px, foco visible.

## Notas

- La oferta de perfumería no tiene `hiring_aid` en los datos; la insignia Emplea-T sale en las ofertas que sí lo tienen (no se inventa).

## Verificación

- Chrome sin cabecera a 1366×768 (modo live con la API): inicio, oferta 1 y entrevista caben sin scroll; a 390 px no hay desbordamiento horizontal.
- Decoración: `FondoMarca` en el marco (todas las pantallas); `Decoracion` es solo un triángulo de esquina pequeño dentro de las secciones, para no duplicar las bandas.
- `make check` pasa (los avisos de ruff son de antes y no bloquean).
