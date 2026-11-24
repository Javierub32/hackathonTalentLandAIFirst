---
status: done
---

# Build #10 · API: ofertas, candidata y candidaturas reales · Depth

- [x] 1 Pick
- [x] 2 Read
- [x] 3 Implement
- [x] 4 Check
- [x] 5 Review requests
- [x] 6 Merge
- [x] 7 Handoff

## Acceptance criteria

- [x] `PATCH /api/applications/{id}` solo permite borrador → revisada → enviada (409 si no)
- [x] `POST /api/offers` rellena `hiring_aid` cuando el contrato es indefinido y la fuente «Publicada por la empresa»
- [x] `POST /api/applications` responde 404 si la oferta o la candidata no existen y no duplica la candidatura de la misma oferta
- [x] `make seed` deja las 11 ofertas, Pilar y la candidatura en borrador; `make check` pasa

## Files owned

- `backend/api/resources/offers/`
- `backend/api/resources/candidates/`
- `backend/api/resources/applications/`
- `hackathon/build-10.md` (this artifact)
