---
status: done
---

# Task split

- [x] 1 Announce and gather
- [x] 2 Draft the split
- [x] 3 Review with the team
- [x] 4 Scaffold commit
- [x] 5 Labels
- [x] 6 Create the issues
- [x] 7 Assign
- [x] 8 Merge and hand off

## Inputs

Heard: Driver, 2026-11-24. Nobody leaves early: the team keeps working from class, so hours stay at ~7 each. No Lane preferences. Presenter not decided (`05-pitch.md` keeps alraro as placeholder).

| Person | GitHub | Hours | Agent Tier | Works in repo | Strengths | Notes (early/late, preferences, pitch) |
| --- | --- | --- | --- | --- | --- | --- |
| Alfonso Ramos | alraro | ~7 | strong | yes | backend, frontend | Driver; Presenter placeholder |
| Paula Fernández | Paaula21 | ~7 | strong | yes | backend, frontend | |
| Andrea | apr2004 | ~7 | weak | yes | backend, frontend | simple one-folder issues (Driver ok) |
| Marina Fernández | mafese3 | ~7 | mid | yes | backend, frontend | shares ChatGPT with Javier |
| Javier Urbaneja | Javierub32 | ~7 | mid | yes | backend, frontend | shares ChatGPT with Marina |
| Alba Cruz | albaalibaii | ~7 | strong | yes | unknown | |

## Lanes

| Lane | Owner(s) | Tier | Σ Weight | Hours |
| --- | --- | --- | --- | --- |
| lane:web | Paula, Marina, Javier, Andrea | strong, mid, mid, weak | 14 | 28 (shared) |
| lane:llm | Alfonso, Alba | strong | 6 | 14 (shared) |
| lane:api | Javier | mid | 2 | (shared) |
| lane:pitch | Andrea, Alfonso, Alba | weak, strong, strong | 5 | (shared) |

Per person (Σ Weight / hours): Alfonso 8/7 · Paula 5/7 · Alba 3/7 · Javier 2/7 · Marina 3/7 · Andrea 3/7.

⚠ Marina and Andrea carry 3 against 4-5 for the others: they pick up help or Polish work first.
⚠ The pitch Lane should belong to the Presenter, who is not decided: slides go to Andrea for now; reassign #9 (slides) once the Presenter is named.

## Issues

Frontier order: Spine pass (Wow moment first), then Depth pass.

| # | Title | Lane | Owner | Pass | Weight | Beats | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| #1 | Espacio de la oferta: filtro y CV adaptado · Spine | lane:web | Paula | Spine | 3 (Wow moment) | 02:05, 02:25 | none |
| #2 | Preparación: filtro y CV adaptado con IA · Spine | lane:llm | Alfonso | Spine | 3 (Seam with producer logic: scoring + LLM, Wow moment) | 02:05, 02:25 | none |
| #3 | Lista de ofertas · Spine | lane:web | Marina | Spine | 2 (Real against the Ofertas Contract) | 01:50 | none |
| #4 | Práctica de entrevista con voz · Spine | lane:web | Javier | Spine | 2 (Real against Entrevista + Voz Contracts) | 02:50 | none |
| #5 | Entrevista: preguntas y feedback con IA · Spine | lane:llm | Alba | Spine | 3 (Seam with producer logic: LLM + STT) | 02:50 | none |
| #6 | Candidaturas y revisión de la orientadora · Spine | lane:web | Paula | Spine | 2 (Real against the Candidaturas Contract) | 03:20 | none |
| #7 | Publicar oferta (empresa) · Spine | lane:web | Marina | Spine | 1 (one folder, one form over the stub) | 03:35 | none |
| #8 | Inicio: elegir vista (candidata, orientadora, empresa) · Spine | lane:web | Andrea | Spine | 1 (one folder, fixtures, no Seam) | 01:50, 03:20, 03:35 | none |
| #9 | Diapositivas del pitch · Spine | lane:pitch | Andrea | Spine | 2 (2+ files, content from 05-pitch and research) | 00:00-01:35, 03:50-04:45 | none |
| #10 | API: ofertas, candidata y candidaturas reales · Depth | lane:api | Alfonso | Depth | 2 (Real producer of 3 Contracts) | 01:50, 03:20, 03:35 | none |
| #11 | Documento de uso de IA · Depth | lane:pitch | Alfonso | Depth | 1 (one file, no Seam) | R4.2, R13.1 | none |
| #12 | Pieza de marketing · Depth | lane:pitch | Alba | Depth | 2 (asset + copy, 2+ files) | R5.1, R5.2 | none |

Per issue (#1-#12, same order): Tier · Agent · Files owned.

1. strong · repo · `web/src/screens/workspace/`
2. strong · repo · `backend/api/resources/prep/`, `backend/llm/prompts/prep_*.md`, `web/src/screens/prep/`
3. mid · repo · `web/src/screens/offers/` (except the generated `fixtures.json`)
4. mid · repo · `web/src/screens/practice/`
5. strong · repo · `backend/api/resources/interview/`, `backend/llm/prompts/interview_*.md`, `web/src/screens/interview/`, `web/src/mocks/voice.ts`
6. mid · repo · `web/src/screens/applications/` (except the generated `fixtures.json`)
7. any · repo · `web/src/screens/publish/`
8. any · repo · `web/src/screens/home/`
9. any · repo · `pitch/slides.md`, `pitch/style.css`, `pitch/public/`
10. mid · repo · `backend/api/resources/offers/`, `backend/api/resources/candidates/`, `backend/api/resources/applications/`
11. any · repo · `pitch/entregables/uso-ia.md`
12. mid · repo · `pitch/entregables/marketing/`

No blocking edges: the Spine and Depth issues own disjoint paths and every Seam has a stub.

## Coverage

- Beats: 00:00-01:35 → #9; 01:50 → #3, #8, #10; 02:05 → #1, #2; 02:25 (Wow) → #1, #2; 02:50 → #4, #5; 03:20 → #6, #8, #10; 03:35 → #7, #8, #10; 03:50-04:45 → #9.
- Seams: Ofertas → producer #10, consumers #3, #7; Candidata → producer #10, consumer #1; Preparación → producer #2, consumer #1; Entrevista → producer #5, consumer #4; Voz → producer #5, consumer #4; Candidaturas → producer #10, consumers #6, #1.
- Requirements outside Beats: R4.2, R13.1 → #11; R5 → #12; R6.1 pitch script, R12.2 backup video, R7 zip → #14 (Demo); R12.1 public URL → #13 (Integrate & Polish); R3 canvas → `hackathon/canvas.md` (done outside Build).
- ⚠ Producer issues for Ofertas, Candidata and Candidaturas are Depth: the Contract stubs are already Real CRUD over the seed, so consumers are not blocked.

## New Lanes

- none

## Phase issues

- Integrate & Polish: #13 (unassigned)
- Demo: #14 (Presenter placeholder alraro, until the team decides)

Frontier: every Build issue (#1-#12); no blocking edges.
