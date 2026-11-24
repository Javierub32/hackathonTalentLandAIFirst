---
status: done
---

# Contracts

- [x] 1 Ask
- [x] 2 Walk the Beats
- [x] 3 Confirm the Seams
- [x] 4 Stub
- [x] 5 Close

## Answers (step 1)

Heard: Driver, 2026-11-24.

1. External shape to match: none. LLM and STT provider is **Groq** (free tier, `GROQ_API_KEY`); stubs expose our own interface, the provider stays behind it.
2. Entities: candidate **Pilar**, 53, Málaga, 18 months unemployed, 20+ years in retail and admin (renamed from "Mari Carmen" for a recent public controversy around that name; `05-pitch.md` and `06-prune.md` updated). IMFE counsellor: fictitious name. Employers: no names invented; each offer shows the employer description the IMFE portal publishes.
3. Real data: 11 real offers from the IMFE municipal placement agency (https://malagaempleo.portalemp.com/, fetched 2026-11-24, code and link cited per offer). Demo offer: **2026/01198 Dependiente/a de perfumería, atención al cliente y asesoramiento** (Beats 01:50, 02:05 now say "dependienta de perfumería" instead of "auxiliar administrativa"; the portal had no admin offer). No synthetic offers needed.

## Seams

Kind: HTTP, Python function, Data/file, Event, New piece.

| Seam | Kind | Producer Lane | Consumer Lane(s) | Interface (path) | Stub | Beats |
|---|---|---|---|---|---|---|
| Ofertas | HTTP | api | web, llm | `backend/api/resources/offers/` (`GET/POST /api/offers`, `GET /api/offers/{id}`) | 11 real IMFE offers (code, title, employer description, place, contract, schedule, salary, `requirements[]`, `functions[]`, `source_url`, `hiring_aid` note on permanent ones); POST stores a company-posted offer | 01:50, 03:35 |
| Candidata | HTTP | api | web, llm | `backend/api/resources/candidates/` (`GET /api/candidates/{id}`) | Pilar, 53: summary, 4 jobs in retail and admin with real-sounding tasks, ESO, skills, basic English; `cv_text` as she wrote it | 02:05, 02:25, 02:50 |
| Preparación (filtro + CV) | HTTP | llm | web | `backend/api/resources/prep/` (`POST /api/prep/filter`, `POST /api/prep/adapt-cv`, body `{offer_id, candidate_id}`) | filter: 5 of 13 requirements found (38%), each `{text, found, evidence}`; adapt-cv: rewritten CV, 11 of 13 (85%), each change linked to a real job of Pilar, `not_covered` = experience in perfumery, high English | 02:05, 02:25 |
| Entrevista | HTTP | llm | web | `backend/api/resources/interview/` (`POST /api/interview/questions` `{offer_id, candidate_id}`, `POST /api/interview/feedback` `{offer_id, question, answer}`) | 2 questions about the perfumería offer; feedback `{good[], improve[], tip}` in kind plain Spanish | 02:50 |
| Voz | HTTP (existing) | llm | web | `backend/api/resources/transcribe/` (`POST /api/llm/transcribe`, unchanged); TTS in browser | `web/src/mocks/voice.ts` returns a sample answer of Pilar | 02:50 |
| Candidaturas | HTTP | api | web | `backend/api/resources/applications/` (`GET/POST /api/applications`, `PATCH /api/applications/{id}`) | one draft application of Pilar to 2026/01198 with the adapted CV; status `borrador → revisada → enviada`, counsellor "Lucía Ortega (IMFE)" and a short note | 03:20 |

`prep` and `interview` read offers and the candidate through the `offers` and `candidates` models (database session); the Ofertas and Candidata Contracts are their inputs.

## No Seam

- 00:00, 00:20, 00:45, 01:05, 01:35: slides, `pitch` Lane only.
- 03:50, 04:05, 04:30, 04:45: slides, `pitch` Lane only.

## Contract paths

- `backend/api/resources/offers/` (`models.py`, `router.py`, `seed.json`: 11 real IMFE offers, demo offer first = id 1)
- `backend/api/resources/candidates/` (`models.py`, `router.py`, `seed.json`: Pilar = id 1)
- `backend/api/resources/applications/` (`models.py`, `router.py`, `seed.json`: 1 draft application)
- `backend/api/resources/prep/` (`models.py`, `router.py`, `stub.json`)
- `backend/api/resources/interview/` (`models.py`, `router.py`, `stub.json`)
- `backend/api/resources/transcribe/` (existing, unchanged)
- `backend/api/core/app.py` (routers registered: offers, candidates, applications `# module:api`; prep, interview `# module:llm`)
- `backend/openapi.json`, `web/src/lib/api/schema.d.ts` (generated)
- `web/src/screens/{offers,candidates,applications}/fixtures.json` (generated from `seed.json`)
- `web/src/screens/prep/mocks.ts` + `stub.json`, `web/src/screens/interview/mocks.ts` + `stub.json` (fixtures-mode copies of the backend stubs; keep in step)
- `web/src/mocks/voice.ts` (sample transcript: Pilar's answer)
- `backend/llm/MODULE.md` paths now list `prep`, `interview` and their web mocks (llm Lane)

Stubs answer the demo offer (IMFE 2026/01198) with the scripted data; any other offer gets a naive word match (filter) or generic questions (interview), so no screen is empty. `items` and `_example` stay as templates (Feature `crud` on); Task split may remove them.

## Change protocol

- Additive change, by the producer Lane: run `make openapi api-client`, then add a line to the Change log.
- Breaking change: stop and ask the Driver.
- Other Lanes: comment on the issue, or open an issue labelled `blocked` + `lane:<producer>`.

## Change log

<!-- One line per change: date, Seam, what changed, by whom. -->
- 2026-11-24 · Preparación · añade `label` (1–3 palabras) a cada requisito de `filter` y `adapt-cv` · @apr2004
