---
status: draft
---

# Ideas

- [x] 1 Collect the team's ideas
- [x] 2 Widen the list
- [x] 3 Kill-check
- [ ] 4 Score
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

| Rank | # | Idea | <criterion> (×weight) | Demo-ability | Total | Feasibility (new pieces) | Flag |
|---|---|---|---|---|---|---|---|

### Reasons

### Overrides

