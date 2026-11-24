---
status: draft
issue: 2
lane: llm
owner: alraro
---

# Build #2 · Preparación: filtro y CV adaptado con IA · Spine

- [x] 1 Pick
- [x] 2 Read
- [ ] 3 Implement
- [ ] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Acceptance criteria

- [ ] `POST /api/prep/filter` calcula requisitos encontrados con una regla explicable (palabras y sinónimos de la oferta en el CV) y devuelve la evidencia
- [ ] `POST /api/prep/adapt-cv` reescribe el CV con Groq usando solo `experience`, `skills`, `interests` y `education` de la candidata; cada cambio trae su `source`
- [ ] Lo que la candidata no cumple sale en `not_covered`, nunca en el CV (R13.2)
- [ ] Para la oferta demo devuelve 5/13 → 11/13; si la llamada falla o tarda más de 15 s, devuelve el stub
- [ ] Caché del LLM activa: la segunda llamada idéntica no gasta cuota

## Files owned

- `backend/api/resources/prep/`
- `backend/llm/prompts/prep_*.md`
- `web/src/screens/prep/`
- `hackathon/build-2.md` (this artifact)

Next: implementar el filtro por reglas (`rules.py`).
