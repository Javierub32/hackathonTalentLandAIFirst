---
status: draft
issue: 39
lane: llm
owner: apr2004
---

# Build #39 · Etiqueta corta por requisito

- [x] 1 Pick
- [x] 2 Read
- [x] 3 Implement
- [x] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Files owned

- `backend/api/resources/prep/`
- `backend/llm/prompts/prep_*.md`
- `web/src/screens/prep/`
- `hackathon/08-contracts.md` (una línea en el Change log)

## Acceptance criteria

- [x] `POST /api/prep/filter` y `/adapt-cv` devuelven `label` en cada requisito, en modo real y en stub
- [x] Mocks web en paso con el backend; cliente regenerado
- [x] Change log actualizado

## Next

CI passed `make check` in PR #42. Local checks were blocked by unavailable Docker; review the PR and approve before merging.
