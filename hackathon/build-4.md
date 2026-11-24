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
- [ ] 5 Live voice verification and review
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
- [ ] Live Groq generation/feedback and real microphone smoke test. Automatic approval review rejected external transmission of demo candidate data; explicit authorization requested, pending.
- [ ] Reuse shared `components/brand/` from #37 when available. #37 is still open and the directory does not exist on main. The screen currently uses shared theme tokens and local poster-style geometry/arrow label without editing Marina's owned paths.

Next: authorize demo payload transmission to Groq, verify live voice, then integrate brand components once #37 provides them. Do not claim all issue criteria complete before these checks.
