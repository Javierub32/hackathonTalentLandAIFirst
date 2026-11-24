---
status: draft
issue: 5
lane: llm
owner: alraro
---

# Build #5 · Entrevista: preguntas y feedback con IA · Spine

- [x] 1 Pick
- [x] 2 Read
- [ ] 3 Implement
- [ ] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Acceptance criteria

- [x] `POST /api/interview/questions` genera 2 preguntas con Groq a partir de la oferta y el CV; una toca un requisito que no cubre
- [x] `POST /api/interview/feedback` devuelve `good`, `improve` y `tip` sobre el contenido de la respuesta, nunca sobre voz, tono o emociones (R13, AI Act art. 5.1.f)
- [ ] La transcripción funciona en español con una respuesta grabada
- [x] Si la IA falla, la oferta demo devuelve el stub

## Files owned

- `backend/api/resources/interview/`
- `backend/llm/prompts/interview_*.md`
- `web/src/screens/interview/`
- `web/src/mocks/voice.ts`
- `hackathon/build-5.md` (this artifact)

Next: check Spanish transcription with a recorded answer.
