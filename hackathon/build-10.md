---
status: draft
---

# Build #10 · API: ofertas, candidata y candidaturas reales · Depth

- [x] 1 Pick
- [x] 2 Read
- [ ] 3 Implement
- [ ] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Acceptance criteria

- [ ] `PATCH /api/applications/{id}` solo permite borrador → revisada → enviada (409 si no)
- [ ] `POST /api/offers` rellena `hiring_aid` cuando el contrato es indefinido y la fuente «Publicada por la empresa»
- [ ] `POST /api/applications` responde 404 si la oferta o la candidata no existen y no duplica la candidatura de la misma oferta
- [ ] `make seed` deja las 11 ofertas, Pilar y la candidatura en borrador; `make check` pasa

## Files owned

- `backend/api/resources/offers/`
- `backend/api/resources/candidates/`
- `backend/api/resources/applications/`
- `hackathon/build-10.md` (this artifact)
