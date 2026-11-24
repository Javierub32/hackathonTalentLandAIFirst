---
status: draft
---

# Pitch

- [x] 1 Show the ideas
- [x] 2 Devil's advocate
- [x] 3 Vote
- [x] 4 Identity and axes
- [x] 5 Presenter and demo length
- [ ] 6 Wow moment and Demo script
- [ ] 7 Not building and Coverage
- [ ] 8 Close

## Votes

| Idea | Main risk | Votes |
|---|---|---|
| #2 Puesto a puesto (top 1, 9.50, recommended: #1's idea with one demoable spine) | Fake offers or a made-up "ATS score" kill credibility. Answer (Driver): seed 3-5 real Málaga offers from Empléate/IMFE by hand, citing source; we have no real ATS, so the score is our own transparent filter simulator (offer requirements covered by the CV + common ATS format rules), pitched as "closer to the filter", never "guaranteed to pass" | whole team (consensus) |
| #7 Rayos X del filtro (top 2, 9.20) | A diagnosis alone is a thin product for IMFE to pay for. Driver: will not be picked; at most it is the first step of #2 | none |
| #4 Entrevista por teléfono (top 3, 8.60) | Live voice may fail on stage (public wifi, laptop mic). Driver: not a concern, will not be picked now | none |
| #1 Acompañante 45+ (5th, 7.20; team favourite) | Too wide to validate today: validation (25%) gets spread thin. Answer (Driver): validate only the core pain (filter rejects me, can't prepare interviews) with the 10+ survey; the final idea will be a mix of #1 and #2 | whole team (consensus) |

Votes: no individual dot vote; the team discussed it together and agreed on one combined idea (heard: Driver, 2026-11-24).

Winner: **#1 + #2 combined** (team consensus, confirmed by the Driver). A platform (#1) where companies post their offers and the candidate keeps a profile, CV and training; selecting one offer opens the per-offer workspace (#2): train for that offer, optimise the CV for that offer's filter, practise that offer's interview, and apply inside the platform. Takes the employer hook from #6: the offer shows the Emplea-T aid for hiring a 45+ person, which gives companies a reason to post.

Kill-check: **pass**. Requirements: covers R1 (45+ long-term unemployed), R2 (AI tailors CV, simulates filter and interview; candidate and counsellor decide), R9 (IMFE + Málaga 45+ persona), R14, R16 (no Landscape item combines a job board with per-offer coaching and the 45+ hiring aid). Gates: R13 holds if no face or emotion analysis and the CV rewrite never invents experience; R8/R15 depend on today's survey, not on the idea. Event logistics: fits ~20 h with 6 people; demo via public URL (R12). Risk carried over: empty marketplace, mitigated by seeding real public offers (Q1).

## Identity

- Name: **Empleate** (provisional, heard: Driver, 2026-11-24 "por ahora"). ⚠ Clash: SEPE's portal is called **Empléate** (29,000+ offers for 45+, Research Q4) and is a competitor we must name under R16; same name risks confusion with the jury and looking like an official SEPE product. Revisit before the canvas/marketing are final.
- Tagline: "Tu experiencia, preparada para cada oferta."
- Voice and look (heard: Driver, 2026-11-24): made for Spanish people over 45. Simple, familiar, calm, nothing modernist, foreign-looking or extravagant. Plain Spanish without anglicisms (say "filtro automático", explain "ATS" once), short sentences, large text, clear buttons, warm and respectful tone. Input for Design (Phase 8).

## Problem, User, Solution

- Problem: in Andalucía 57% of the unemployed are 45+ and over half of over-50s search for more than a year; 90% of them believe automatic CV filters reject them for their age, and they get no preparation for each specific offer (Research Q2, Q3).
- User: a 45-60-year-old long-term unemployed person in Málaga (persona: "Mari Carmen", 52, 18 months unemployed, 20+ years in admin and retail, basic digital skills), served by IMFE's T-Acompañamos counsellors.
- Solution: a job platform where Málaga companies post offers (and see the Emplea-T aid for hiring 45+) and, for each offer the candidate selects, an AI prepares them: trains them, adapts their CV to that offer's filter using only their real experience, rehearses that offer's interview, and lets them apply; an IMFE counsellor reviews before sending.

## Fixed axes

- Domain: long-term unemployment of people over 45
- Target user: 45-60 long-term unemployed in Málaga, basic digital skills
- Paying customer: IMFE (Ayuntamiento de Málaga), funded through ESF+ programmes (Aquileo+, T-Acompañamos); employers as a second line (featured offers)
- Platform: responsive web (mobile first), public URL
- Product type: job platform + per-offer AI preparation workspace
- Data: candidate CV and profile (consented, minimal), offers posted by companies, seeded with real public Málaga offers (Empléate/IMFE, source cited)
- AI provider and model: LLM on a free tier (Gemini or Groq), chosen in Design/Contracts

## Wow moment

Mari Carmen picks a real Málaga offer; the screen shows how an automatic filter reads her CV for that offer (5 of 13 requirements found, 38%). One tap, and the AI rewrites the CV with her real experience in the offer's words: 11 of 13, 85%. Then the interview that follows asks about that exact offer.

## Demo

- presenter: alraro (placeholder: the team has not decided; heard: Driver, 2026-11-24)
- Length: 5 min (whole pitch with the live demo inside; length not announced yet, ask the organisers). Built to stay complete in 5 min; trim Beats marked "cut first" if it is shorter.

What the judges know walking in: the challenge (an AI that leaves nobody behind) and that this is a business pitch. They do not know what an ATS is, who Mari Carmen is, or what IMFE or Emplea-T are: each is explained in plain words the first time it appears.

| t (mm:ss) | Screen | Say | Proves (R<n>.<m>) | Module | Real/Faked |
|---|---|---|---|---|---|
| 00:00 | Slide: photo-free persona card "Mari Carmen, 52, Málaga. 18 meses en paro." | "Mari Carmen tiene 52 años, 20 años de experiencia en administración y comercio, y lleva 18 meses enviando currículums. Nadie la llama." | R1.1, R9.2 | pitch | Real (persona built from survey data) |
| 00:20 | Slide: 3 big figures with sources | "No es un caso aislado: en Andalucía, el 57% de las personas en paro tiene más de 45 años. Más de la mitad de los mayores de 50 busca más de un año. Y el 90% cree que su currículum ni siquiera llega a una persona." | R1.2, R8.1 | pitch | Real (Research Q3, Q2 sources) |
| 00:45 | Slide: "CV → filtro automático → persona" diagram | "¿Por qué? Muchas empresas usan un filtro automático, llamado ATS, que lee el currículum antes que nadie y descarta el que no encaja con las palabras de la oferta. Y cada vez más entrevistas las hace una IA." | R1.2 | pitch | Real (ManpowerGroup 42%, AI Act) |
| 01:05 | Slide: survey results (N, %, 2 quotes) + logo/name of the organisation consulted | "Hoy hemos hablado con <N> personas mayores de 45 en paro: <X>% no sabe cómo adaptar su CV a cada oferta. <cita>. Y hemos hablado con <organización>." | R8.2, R15.1, R15.2 | pitch | Real (fill with today's survey; placeholder until then) |
| 01:35 | Slide: name + tagline + one-line solution, Human/AI split | "Por eso hemos creado Empleate: tu experiencia, preparada para cada oferta. La IA prepara; la persona y su orientador deciden." | R2.2 | pitch | Real |
| 01:50 | App: offers list, large cards, one with badge "Ayuda Emplea-T: hasta 18.000 €" | "Las empresas de Málaga publican aquí sus ofertas. Mari Carmen elige una: auxiliar administrativa en una pyme de Málaga." | R4.1, R14.1 | web | Real (offers seeded from real public listings, source cited) |
| 02:05 | App: offer workspace, filter view "5 de 13 requisitos · 38%", missing ones in plain words | "Así lee el filtro automático su currículum para esta oferta: solo encuentra 5 de los 13 requisitos. Y ella los cumple casi todos; simplemente no lo dice con esas palabras." | R2.1 | web, llm | Real |
| 02:25 | App: tap "Adaptar mi CV" → rewritten CV, "11 de 13 · 85%", each change linked to her real experience | "Un toque, y la IA reescribe su CV para esta oferta, solo con experiencia real suya, nada inventado. 85%." (Wow) | R2.1, R4.1, R13.2 | web, llm | Real |
| 02:50 | App: interview practice for this offer, 2 questions + answer + kind, concrete feedback | "Ahora practica la entrevista de esta oferta: las preguntas salen de este puesto. La IA le dice qué ha hecho bien y qué mejorar." | R2.1, R14.1 | web, llm | Real |
| 03:20 | App: "Revisado por tu orientadora" + "Enviar candidatura" | "Antes de enviar, su orientadora del IMFE lo revisa. Mari Carmen aplica sin salir de la plataforma." | R2.2, R13.2, R4.1 | web, api | Real (counsellor review: simple approve state) |
| 03:35 | App: company view "Publicar oferta" with aid shown | "Y la empresa no solo publica gratis: ve al momento cuánto recibe por contratar a una persona de más de 45. Emplea-T, de la Junta, da hasta 18.000 €." (cut first) | R16.1 | web, api | Real (aid amount from BOJA; confirm figure) |
| 03:50 | Slide: alternatives table (Empléate SEPE, simuladores IA, Labora) vs Empleate | "Hay portales de empleo y simuladores de entrevista, pero ninguno prepara a la persona para cada oferta, ni está hecho para mayores de 45." | R16.1 | pitch | Real (Research Q1, Q4) |
| 04:05 | Slide: customer + business model | "Quién paga: el IMFE, el Instituto de Empleo del Ayuntamiento de Málaga, que ya tiene orientadores y fondos europeos para este colectivo. Cada orientador atiende a más personas. Las empresas pagan por destacar ofertas. Coste de IA: céntimos por persona." | R9.1, R3.2 | pitch | Real (canvas) |
| 04:30 | Slide: dated roadmap | "Piloto con el IMFE en 2027 con 100 personas, después Andalucía Orienta, y formación y voz para entrevistas por teléfono." | R10.1 | pitch | Real |
| 04:45 | Slide: ask + tagline | "Buscamos un piloto con el IMFE y vuestro apoyo. Empleate: que la experiencia vuelva a contar." | R6.2 | pitch | Real |
| 05:00 | End | | | | |

Time split (R11.3): problem, validation and business 3:00; app 2:00.
## Not building

- <what is out>

## Coverage

- R<n>.<m>: <no Beat proves it; justification or warning>
