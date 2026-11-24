---
status: draft
issue: 6
lane: web
owner: Paaula21
---

# Build #6 · Candidaturas y revisión de la orientadora

- [x] 1 Pick
- [x] 2 Read
- [x] 3 Implement
- [ ] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Files owned

- `web/src/screens/applications/` (salvo `fixtures.json`).

## Criterios de aceptación

- [x] En `/candidaturas` se ve la candidatura de Pilar a la oferta de perfumería con su CV adaptado y su estado.
- [x] Lucía Ortega (IMFE) puede escribir una nota y marcar la candidatura como revisada.
- [x] Pilar ve «Revisado por tu orientadora» y puede enviar la candidatura revisada.
- [x] Los estados se muestran como borrador, revisada y enviada.

## Verificación

- Chromium con datos de demostración a 375 px. Se abrió el CV adaptado, se confirmó que el borrador no se podía enviar, se guardó una nota como Lucía y se envió la candidatura desde la vista de Pilar tras ver la nota y el estado de revisión. Sin desbordamiento horizontal.
- Vista local para revisión: http://localhost:4176/candidaturas.
