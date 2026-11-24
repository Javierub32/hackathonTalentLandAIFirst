---
status: draft
---

# Ideas

- [x] 1 Collect the team's ideas
- [x] 2 Widen the list
- [x] 3 Kill-check
- [x] 4 Score
- [ ] 5 Review the ranking
- [ ] 6 Close

## Heard

Vetoed, loved, roster strength to show off.

- Loved (Driver, 2026-11-24, from Research): persona 45+ long-term unemployed in Málaga; end-to-end companion (training, CV for ATS, interview practice, employer offers).
- Vetoed (Driver, 2026-11-24, from Research): young people and UMA as main customer.
- Team ideas (Driver, 2026-11-24): all one flow, the whole job search: CV adapted to ATS, interview prep by profile, companies post their own offers so the platform recommends them to candidates, CV tailored to each offer, interview practice for that company's offer. Recorded as card #1.
- Vetoed: nothing beyond the above. Loved: nothing extra ("sin limitantes").
- List confirmed (Driver, 2026-11-24): the team prefers #1 because it already contains most ideas; the others are add-ons to fit in as time allows, and some drift too far from the concept.
- Roster strength to show off: none in particular ("nos adaptamos"); the 6 teammates are all technical generalists.

## Idea cards

### 1 · Acompañante 45+ (team · fit)

- One line: end-to-end AI companion for 45+ long-term unemployed in Málaga: training, CV adapted to ATS, interview practice by profile (incl. AI interviews), offers posted by companies and recommended to candidates, CV and interview practice tailored to each offer, with a human counsellor in the loop.
- Axes: Domain=senior long-term unemployment · Target user=45+ long-term unemployed, Málaga · Paying customer=IMFE (Ayuntamiento de Málaga) · Platform=responsive web · Product type=end-to-end assistant + job board · Data=candidate CV + offers posted by companies · AI=Gemini free tier (LLM)
- Wow moment: one person goes from a CV the ATS rejects to a matched offer and a rehearsed interview in the same session.
- R covered: R1, R2, R4, R9, R13, R14, R16 (combination)
- Kill-check: ok (job boards and simulators exist, but no Landscape item combines ATS coaching + per-offer prep + counsellor for 45+)
- Agent note: endorsed as the base. Strong because it covers the whole journey, but it is wide: six features to demo in 3-5 min and an empty job board on day one (Research So what 4). See #2 for the same idea with a sharper spine.

### 2 · Puesto a puesto (team+agent · fit)

- One line: variant of #1 where the unit is the offer: pick a real offer (posted by a company or seeded from Empléate/IMFE) → the AI tailors your CV to its ATS keywords → you rehearse that company's interview → the counsellor reviews → you apply. Training and the general coach hang off that loop.
- Axes: Domain=senior long-term unemployment · Target user=45+ long-term unemployed, Málaga · Paying customer=IMFE, employers second (featured posts) · Platform=responsive web · Product type=per-offer pipeline · Data=public offers (Empléate, IMFE agency) + CV · AI=LLM (Gemini/Groq)
- Wow moment: the same CV scores 38% against an offer's ATS filter, the AI rewrites it in seconds, it scores 85%, and the interview that follows asks questions from that exact offer.
- R covered: R1, R2, R4, R9, R14, R16
- Kill-check: ok (same difference as #1)
- Agent note: improves #1: one linear flow that fits a demo, and offers are seeded so the board is never empty.

### 3 · Copiloto del orientador (agent · fit)

- One line: a tool for IMFE T-Acompañamos counsellors: the AI pre-diagnoses each 45+ user, drafts CVs and interview plans, and the counsellor reviews and decides, so each counsellor serves three times more people.
- Axes: Domain=public employment orientation · Target user=IMFE counsellor (end beneficiary: 45+) · Paying customer=IMFE · Platform=web dashboard · Product type=tool for professionals · Data=case files of the counsellor · AI=LLM + RAG over IMFE programmes
- Wow moment: a counsellor opens a new case and has diagnosis, CV draft and a 4-week plan ready to approve in 30 seconds.
- R covered: R1, R2 (human decides), R9, R13, R16
- Kill-check: ok (Labora pilots interview training, not a counsellor copilot)

### 4 · Entrevista por teléfono (agent · twist)

- One line: practice interviews by voice, like a real phone screening, in plain Spanish, for people with low digital skills: no forms, just talk; the AI gives spoken feedback.
- Axes: Domain=senior long-term unemployment · Target user=45+ with low digital skills · Paying customer=Andalucía Orienta entity · Platform=voice (web mic / phone) · Product type=voice assistant · Data=speech transcripts (no voice biometrics) · AI=STT + LLM + TTS
- Wow moment: live on stage, someone answers interview questions out loud and gets spoken, kind, concrete feedback.
- R covered: R1, R2, R4, R13, R14, R16
- Kill-check: ok (Toptrabajos and others are video/web simulators for digital-fluent users; voice-first for low digital skills is the difference)

### 5 · Traductor de experiencia (agent · twist)

- One line: you tell your 25 years of work out loud, informally; the AI turns it into recognised skills (ESCO), ATS keywords and an honest CV, and shows which sectors in Málaga need those skills.
- Axes: Domain=hidden skills of senior workers · Target user=45+ with long careers in one trade · Paying customer=IMFE · Platform=web + voice · Product type=skills extractor · Data=ESCO skills taxonomy (public) + narration · AI=LLM extraction
- Wow moment: "I was a waiter for 20 years" becomes 14 skills, 3 sectors with shortage and a CV that passes the filter.
- R covered: R1, R2, R9, R14, R16
- Kill-check: ok

### 6 · Contrata 45+ con ayuda (agent · twist)

- One line: the employer side: an SME posts an offer, the AI tells it how much it gets from Emplea-T (up to €18,000) and the Social Security rebate, and recommends prepared 45+ candidates.
- Axes: Domain=hiring incentives for seniors · Target user=Málaga SME (hospitality, services) · Paying customer=SMEs, Cámara de Comercio de Málaga · Platform=web · Product type=B2B matching platform · Data=BOJA aid rules + candidate profiles · AI=LLM + RAG over BOJA
- Wow moment: a bar owner posts "camarero" and sees "hire this candidate permanently and receive €18,000".
- R covered: R1, R2, R9, R16
- Kill-check: ok (Empléate, Senia, Krisalidas list 45+ offers; none computes Emplea-T aid for the employer)

### 7 · Rayos X del filtro (agent · twist)

- One line: shows the candidate how an ATS and an AI interviewer see them: simulates the screening, explains why they would be rejected, and coaches the fix; also explains how AI hiring works (AI Act, rights).
- Axes: Domain=algorithmic screening literacy · Target user=45+ who "never get called" · Paying customer=Andalucía Orienta / SAE · Platform=web · Product type=diagnostic + coaching tool · Data=CV + offer text · AI=LLM scoring
- Wow moment: a red/green X-ray of a CV against a real offer, showing exactly where the filter drops it and why.
- R covered: R1, R2, R4, R9, R14, R16
- Kill-check: ok

### 8 · El entrevistador de la empresa (agent · moonshot)

- One line: a company loads its real interview process (questions, values, role); the AI clones its interviewer so 45+ candidates rehearse with "that" company before the real interview; the company gets prepared candidates.
- Axes: Domain=interview preparation · Target user=45+ applying to a specific company · Paying customer=employers (per hire) + IMFE · Platform=web + voice · Product type=company-branded interview agent · Data=company interview guide · AI=LLM agent with persona + voice
- Wow moment: "Practise with Hotel X's interviewer" and the agent asks the questions Hotel X really asks.
- R covered: R1, R2, R9, R16
- Kill-check: ok

### 9 · Mentores que ya lo lograron (agent · moonshot)

- One line: a network of 45+ who got a job again mentoring those still looking; the AI matches pairs by trade and situation, prepares each session and follows up; tackles self-esteem (65% lost it) with humans, not emotion analysis.
- Axes: Domain=peer support and confidence · Target user=45+ long-term unemployed + 45+ re-employed mentors · Paying customer=Fundación Unicaja / Fundación Adecco · Platform=mobile web + WhatsApp · Product type=accompaniment platform · Data=mentor and mentee profiles · AI=LLM matching + session briefs
- Wow moment: "Carmen, 52, got hired at 51 in the same sector; she has 30 min on Thursday" with a session brief written for both.
- R covered: R1, R2, R13, R14, R16
- Kill-check: ok

### 10 · Agente que busca por ti (agent · moonshot)

- One line: an autonomous agent that scans offers every day, tailors the CV and drafts each application; the person approves each one with a tap and the counsellor sees progress (human decides every send).
- Axes: Domain=senior long-term unemployment · Target user=45+ overwhelmed by the search · Paying customer=IMFE · Platform=mobile (notifications) · Product type=autonomous agent · Data=offer feeds + CV · AI=LLM agent with tools
- Wow moment: the phone buzzes: "3 offers for you today, CV adapted, approve?"
- R covered: R1, R2 (approval), R9, R13, R14
- Kill-check: ⚠ exists already: auto-apply is AIApply's core feature (Q1); only the 45+ framing and the approval tap differ

### 11 · Plan de 30 días por WhatsApp (agent · fit)

- One line: a guided daily plan in the channel 45+ already use: micro-lessons (digital tools, AI, CV, interviews) and small tasks by WhatsApp-style chat; progress is reported to the IMFE counsellor.
- Axes: Domain=digital and job-search skills · Target user=45+ with low digital skills · Paying customer=IMFE (fits Aquileo+ training) · Platform=chat (WhatsApp-like) · Product type=coaching programme · Data=progress per day · AI=LLM tutor
- Wow moment: day 1 to day 30 replayed in 20 seconds: from "I don't know what ATS is" to a passed mock interview.
- R covered: R1, R2, R9, R14, R16
- Kill-check: ok

### 12 · Ruta de reconversión (agent · twist)

- One line: for 45+ whose sector shrank: the AI maps their skills to sectors short of staff in Málaga (hospitality, logistics, care) and builds a route with free IMFE Aquileo+ courses and target offers.
- Axes: Domain=reskilling · Target user=45+ from declining sectors (industry, retail) · Paying customer=IMFE (Aquileo+, ESF+) · Platform=web · Product type=career-path planner · Data=Aquileo+ course catalogue + shortage data · AI=LLM + RAG over courses
- Wow moment: a 3-step route from "ex-shop assistant" to "logistics coordinator" with named free courses and starting dates.
- R covered: R1, R2, R9, R16
- Kill-check: ok

## Ranked table

Scores 1 to 5 per Rubric criterion, each with a one-line reason below the table.

Total = weighted Rubric score (1 to 5, weights from `01-brief.md`) + Demo-ability (1 to 5); max 10. Feasibility counts pieces absent from `CATALOG.md`.

| Rank | # | Idea | Validation (×25%) | Idea (×20%) | Marketing & pitch (×15%) | Concrete customer (×10%) | Business model (×10%) | Roadmap (×10%) | Prototype & AI (×10%) | Weighted | Demo-ability | Total | Feasibility (new pieces) | Flag |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2 | Puesto a puesto | 4 | 5 | 4 | 5 | 4 | 5 | 5 | 4.50 | 5 | 9.50 | 1-2: PDF/CV text extraction, ATS match scorer (offers seeded as fixtures) | ok |
| 2 | 7 | Rayos X del filtro | 5 | 4 | 5 | 4 | 3 | 3 | 4 | 4.20 | 5 | 9.20 | 1-2: PDF/CV text extraction, ATS match scorer | ok |
| 3 | 4 | Entrevista por teléfono | 4 | 3 | 4 | 3 | 3 | 3 | 5 | 3.60 | 5 | 8.60 | 0: voice (STT/TTS) and chat are in the catalog | ok |
| 4 | 5 | Traductor de experiencia | 3 | 4 | 4 | 4 | 3 | 3 | 4 | 3.55 | 4 | 7.55 | 1-2: ESCO skills import, skills→sector mapping | ok |
| 5 | 1 | Acompañante 45+ | 4 | 4 | 4 | 5 | 4 | 5 | 4 | 4.20 | 3 | 7.20 | 3+: PDF/CV text extraction, ATS match scorer, offer→candidate recommender | ok |
| 6 | 8 | El entrevistador de la empresa | 2 | 4 | 4 | 3 | 3 | 3 | 4 | 3.20 | 4 | 7.20 | 1-2: company interview-guide upload, persona agent config | ok |
| 7 | 6 | Contrata 45+ con ayuda | 3 | 3 | 3 | 3 | 4 | 3 | 3 | 3.10 | 4 | 7.10 | 1-2: aid-rules calculator, candidate matching | ok |
| 8 | 3 | Copiloto del orientador | 3 | 4 | 3 | 5 | 5 | 4 | 3 | 3.70 | 3 | 6.70 | 1-2: PDF/CV text extraction, case-diagnosis view | ok |
| 9 | 11 | Plan de 30 días por WhatsApp | 3 | 3 | 3 | 5 | 4 | 4 | 3 | 3.40 | 3 | 6.40 | 1-2: WhatsApp-style channel, daily scheduler | ok |
| 10 | 12 | Ruta de reconversión | 3 | 3 | 3 | 5 | 4 | 3 | 3 | 3.30 | 3 | 6.30 | 1-2: Aquileo+ course catalogue, shortage-sector data | ok |
| 11 | 9 | Mentores que ya lo lograron | 3 | 3 | 3 | 3 | 2 | 3 | 2 | 2.80 | 2 | 4.80 | 3+: mentor matching, scheduling, WhatsApp integration | ok |
| 12 | 10 | Agente que busca por ti | 3 | 2 | 3 | 4 | 3 | 3 | 4 | 3.00 | 3 | 6.00 | 3+: offer-feed scraper, agent tool loop, per-offer CV tailoring | ⚠ |

### Reasons

- #2: V: same evidence as #1 · I: one sharp loop answers the 'invisible filter' pain directly · M: the 38%→85% number sells itself · C: IMFE named · B: IMFE + featured offers for employers · R: training, mentors and employer aid are the next phases · P: AI rewrites, scores and interviews: core, not decoration · Demo: one linear flow with a visible before/after
- #7: V: hits the best-sourced pain (90% believe the filter drops them) · I: education + fix, clear difference from generic simulators · M: 'see what the robot sees' is a strong hook · C: Andalucía Orienta/SAE or IMFE · B: diagnostic tool alone is a thin product · R: extends into #2's full loop · P: AI scoring and explanation are the core · Demo: red/green X-ray is instantly readable
- #4: V: digital gap of 45+ sourced (Fundación Generation) · I: interview simulators exist; voice is the twist · M: very human and memorable on stage · C: payer less obvious (Andalucía Orienta entity, unnamed) · B: single-feature product is harder to sell · R: limited growth path alone · P: live voice AI is the core · Demo: talking to it live is the strongest moment
- #5: V: hidden-skills pain inferred, not sourced · I: original angle on long careers · M: 'a waiter for 20 years = 14 skills' is quotable · C: IMFE fits · B: hard to sell alone · R: feeds reskilling (#12) · P: AI extraction is the core · Demo: narration → CV transformation is visual
- #1: V: strong desk evidence (Adecco 90% believe the filter rejects them; Labora pilot) but no primary data yet · I: covers the whole journey; the width blurs the core · M: easy message ('del CV al empleo'), many features to explain · C: IMFE named, with ESF+ budget · B: IMFE pays + employers as second line · R: the add-ons (#4, #5, #6, #7) are a ready roadmap · P: AI does the core task in several places · Demo: six features in 3-5 min, hard to show end to end
- #8: V: no evidence companies would share their interview guides · I: strong idea for prepared candidates · M: 'practise with Hotel X's interviewer' is striking · C: depends on employers we don't have · B: per-hire fee plausible but unproven · R: needs a company pilot · P: persona agent with voice · Demo: good, but faked company content
- #6: V: employer pain sourced (78% struggle) but not our employers · I: the aid hook is real but it is the demand side, not the vulnerable group · M: '€18,000' is catchy but aimed at bosses · C: 'Málaga SMEs' is a category · B: SMEs could pay per post · R: needs a candidate pool first · P: RAG over BOJA, moderate AI · Demo: one clear number
- #3: V: needs a counsellor interview to validate, hard to get today · I: multiplies a scarce resource, solid fit · M: message aimed at administrations, less emotional · C: IMFE T-Acompañamos counsellors are concrete · B: clearest B2G buyer · R: pilot with one IMFE office is natural · P: AI drafts, human decides, but the AI is less visible · Demo: a back-office dashboard is less striking
- #11: V: digital-gap evidence sourced · I: solid but known (courses by chat) · M: 'in the app you already use' · C: IMFE Aquileo+ fits exactly · B: fits ESF+ training budgets · R: 30-day pilot is easy to plan · P: LLM tutor, moderate · Demo: a time-lapse is needed to show value
- #12: V: shortage data sourced (hospitality 75%), reskilling need inferred · I: useful, close to existing orientation · M: concrete route is clear · C: IMFE Aquileo+ named · B: fits IMFE budgets · R: depends on course data · P: RAG over courses, moderate · Demo: a route on screen, not much interaction
- #9: V: self-esteem loss sourced (65%) · I: human value strong, AI role thin · M: emotional story · C: foundation payers not verified · B: weak revenue · R: needs a mentor community first · P: AI only matches and briefs (R2 risk) · Demo: hard to show live
- #10: V: overwhelm is plausible, not sourced · I: AIApply already does it (⚠) · M: convenient, but 'spam applications' risk · C: IMFE fits · B: B2C competitors are cheap · R: scraping is fragile · P: agentic AI is strong tech · Demo: notifications are hard to show in a pitch

### Overrides

