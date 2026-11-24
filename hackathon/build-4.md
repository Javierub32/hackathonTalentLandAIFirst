---
status: draft
issue: 4
lane: web
owner: Javierub32
---

# Build #4 — entrevista con audio

- [x] 1 Pick
- [x] 2 Read
- [x] 3 Implement
- [x] 4 Local checks
- [x] 5 Live service verification (synthetic Spanish audio); user device review pending
- [ ] 6 Merge (user will create the PR)
- [ ] 7 Handoff

## Scope update

User request, 2026-11-24: implement simulated video call and expand interviews to 6–12 questions. Chosen count: 8. Producer #5 is closed. Existing HTTP request/response fields stay unchanged; only question generation, prompt and fixture data change. GitHub write permission returned 403 when attempting to record the expanded ownership in #4.

Paths changed: `web/src/screens/practice/`, `backend/api/resources/interview/`, `backend/llm/prompts/interview_questions.md`, `web/src/screens/interview/stub.json`, this artifact. The earlier navigation fix also changed `web/src/screens/workspace/pages/WorkspacePage.tsx` at the user's explicit request.

## Acceptance and evidence

- [x] Fixed interviewer illustration, Spanish greeting and questions spoken after user starts the interview.
- [x] Voice recording with Spanish transcription request; editable text fallback; visible recording/transcription/error states.
- [x] Side panel with good points, improvements and advice. Eight-answer summary at the end.
- [x] No face, tone or emotion analysis. Optional camera is local video-only preview; denied camera uses avatar.
- [x] Simulated video-call layout: large interviewer, small candidate tile, bottom subtitles and large Responder control.
- [x] Eight questions in the LLM output schema, prompt, fixtures and offline fallback for offers 1, 2 and 3.
- [x] Browser fixture walkthrough through all eight answers and completion summary.
- [x] At 1366×768, document height is 768 at start, during answer entry, side feedback and completion. Long feedback can scroll inside its panel.
- [x] `npm --prefix web run check`: exit 0 (TypeScript, contrast and Vite build).
- [x] User explicitly authorized demo CV, offer requirements and test answers to Groq. Live requests returned eight offer-specific questions for offers 1, 2 and 3. Spanish synthetic speech was transcribed accurately via `/api/llm/transcribe?language=es`, then received content-specific live feedback. This verifies the audio upload/STT service, not the physical microphone on the user device.
- [x] Added reusable `web/src/components/brand/Etiqueta.tsx` and `Decoracion.tsx` and consumed both in the call screen after the user explicitly authorized completing all remaining work. #37 has no published components or matching branch yet; these additive components supply the shared pieces, without changing its shell or offers implementation.
- [x] Live browser walkthrough on offer 2: eight-question intro, relevant textile question and tailored feedback. Document stayed at 1366×768 with no page scroll. Mobile width 375 had no horizontal overflow.
- [x] Latest `npm --prefix web run check` passed with the shared brand imports.

Next: user reviews local microphone/camera behavior on their device and creates the PR. Source changes are implemented and local service/browser checks pass; merge has not been performed. The GitHub issue body still needs its expanded scope recorded because the integration cannot write issues (403).

## Manual device smoke check

Open `http://localhost:5174/ofertas`, select an offer, then Practicar la entrevista. Start audio, press Responder, permit the microphone, speak, then Terminar grabación. Confirm that the editable text matches your speech before requesting feedback. Repeat on another offer; its title and questions must change. Camera is optional and may be declined; the avatar must remain usable.
