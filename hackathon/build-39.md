---
status: draft
issue: 39
lane: llm
owner: apr2004
---

# Build #39 · Etiqueta corta por requisito

- [x] 1 Pick
- [ ] 2 Read
- [ ] 3 Implement
- [ ] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Files owned

- `backend/api/resources/prep/`
- `backend/llm/prompts/prep_*.md`
- `web/src/screens/prep/`
- `hackathon/08-contracts.md` (una línea en el Change log)

## Acceptance criteria

- [ ] `POST /api/prep/filter` y `/adapt-cv` devuelven `label` en cada requisito, en modo real y en stub
- [ ] Mocks web en paso con el backend; cliente regenerado
- [ ] Change log actualizado

## Next

Read the Contract seam and the owned prep files, then implement the additive `label` field.
