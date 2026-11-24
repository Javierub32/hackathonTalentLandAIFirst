---
status: draft
---

# Build #3 · Lista de ofertas

- [x] 1 Pick
- [x] 2 Read
- [x] 3 Implement
- [ ] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Files owned

- `web/src/screens/offers/`, salvo `fixtures.json` (generado).

## Acceptance criteria

- [x] En `/ofertas` se ven las 11 ofertas reales con título, empresa, lugar, jornada y salario.
- [x] Las ofertas con `hiring_aid` muestran la insignia de la ayuda Emplea-T.
- [x] Cada tarjeta enlaza a `/ofertas/<id>` y cita la fuente (IMFE, código).
- [x] Se lee bien en móvil con texto grande y botones claros.

Verificación en modo demo, a 360 px: 11 tarjetas, 6 insignias, 11 códigos del IMFE, enlaces a los 11 detalles y controles de 48 px con texto de 18 px. El enlace de la primera tarjeta abrió `/ofertas/1`.
