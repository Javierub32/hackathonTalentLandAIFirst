---
status: draft
---

# Task split

- [x] 1 Announce and gather
- [x] 2 Draft the split
- [ ] 3 Review with the team
- [ ] 4 Scaffold commit
- [ ] 5 Labels
- [ ] 6 Create the issues
- [ ] 7 Assign
- [ ] 8 Merge and hand off

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

Per person (Σ Weight / hours): Alfonso 4/7 · Paula 5/7 · Alba 5/7 · Javier 4/7 · Marina 3/7 · Andrea 3/7.

⚠ Marina and Andrea carry 3 against 4-5 for the others: they pick up help or Polish work first.
⚠ The pitch Lane should belong to the Presenter, who is not decided: slides go to Andrea for now; reassign #? (slides) once the Presenter is named.

## Issues

Frontier order: Spine pass (Wow moment first), then Depth pass.

| # | Title | Lane | Owner | Pass | Weight | Beats | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | Espacio de la oferta: filtro y CV adaptado · Spine | lane:web | Paula | Spine | 3 (Wow moment) | 02:05, 02:25 | none |
| | Preparación: filtro y CV adaptado con IA · Spine | lane:llm | Alfonso | Spine | 3 (Seam with producer logic: scoring + LLM, Wow moment) | 02:05, 02:25 | none |
| | Lista de ofertas · Spine | lane:web | Marina | Spine | 2 (Real against the Ofertas Contract) | 01:50 | none |
| | Práctica de entrevista con voz · Spine | lane:web | Javier | Spine | 2 (Real against Entrevista + Voz Contracts) | 02:50 | none |
| | Entrevista: preguntas y feedback con IA · Spine | lane:llm | Alba | Spine | 3 (Seam with producer logic: LLM + STT) | 02:50 | none |
| | Candidaturas y revisión de la orientadora · Spine | lane:web | Paula | Spine | 2 (Real against the Candidaturas Contract) | 03:20 | none |
| | Publicar oferta (empresa) · Spine | lane:web | Marina | Spine | 1 (one folder, one form over the stub) | 03:35 | none |
| | Inicio: elegir vista (candidata, orientadora, empresa) · Spine | lane:web | Andrea | Spine | 1 (one folder, fixtures, no Seam) | 01:50, 03:20, 03:35 | none |
| | Diapositivas del pitch · Spine | lane:pitch | Andrea | Spine | 2 (2+ files, content from 05-pitch and research) | 00:00-01:35, 03:50-04:45 | none |
| | API: ofertas, candidata y candidaturas reales · Depth | lane:api | Javier | Depth | 2 (Real producer of 3 Contracts) | 01:50, 03:20, 03:35 | none |
| | Documento de uso de IA · Depth | lane:pitch | Alfonso | Depth | 1 (one file, no Seam) | R4.2, R13.1 | none |
| | Pieza de marketing · Depth | lane:pitch | Alba | Depth | 2 (asset + copy, 2+ files) | R5.1, R5.2 | none |

Per issue (same order): Tier · Agent · Files owned.

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

- Beats: 00:00-01:35 → slides; 01:50 → offers, home, api; 02:05 → workspace, prep; 02:25 (Wow) → workspace, prep; 02:50 → practice, interview; 03:20 → applications, home, api; 03:35 → publish, home, api; 03:50-04:45 → slides.
- Seams: Ofertas → producer api (Depth), consumers offers, publish; Candidata → producer api, consumer workspace; Preparación → producer prep, consumer workspace; Entrevista → producer interview, consumer practice; Voz → producer interview (STT in Spanish), consumer practice; Candidaturas → producer api, consumers applications, workspace ("Preparar candidatura" creates the draft).
- Requirements outside Beats: R4.2, R13.1 → AI-use document; R5 → marketing; R6.1 pitch script and R12 public URL + backup video → Demo Phase issue; R3 canvas → `hackathon/canvas.md` (done outside Build).
- ⚠ Producer issues for Ofertas, Candidata and Candidaturas are Depth: the Contract stubs are already Real CRUD over the seed, so consumers are not blocked.

## New Lanes

- none

## Phase issues

- Integrate & Polish: #<n> (unassigned)
- Demo: #<n> (Presenter <name>)
