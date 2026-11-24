---
status: draft
---

# Prune

- [x] 1 Propose
- [ ] 2 Confirm
- [ ] 3 Dry run
- [ ] 4 Prune
- [ ] 5 Close

## Modules

Reason cites a Beat `t` or an `R<n>`. `pitch` is always `keep`.

| Module | Decision | Reason |
|---|---|---|
| web | keep | Beats 01:50-03:35 run in the browser; R12.1 public URL, R14.1 mobile-first responsive web |
| mobile | prune | No Gate asks for an app, no Beat needs a device capability, and "Native mobile app" is in Not building; the web already works on phones as a PWA |
| api | keep | Beats 03:20 (apply + counsellor approve state) and 03:35 (company posts an offer) need persistence; R4.1 end-to-end flow. Required by `llm` |
| llm | keep | Beats 02:05 (filter reading), 02:25 (CV rewrite, Wow) and 02:50 (interview practice) call a language model; R2.1 |
| data | prune | No Beat predicts from a table, clusters or classifies images; the filter score at 02:05 is our own transparent rule simulator (offer requirements covered by the CV), built in `llm`/`api` |
| pitch | keep | always kept; slide Beats 00:00-01:35 and 03:50-04:45 |

## Features

Flags in `features.json` are shared by id across Modules.

| Feature | Module | State | Reason |
|---|---|---|---|
| landing | web | off | No Beat shows a public landing; the demo opens on the offers list (Beat 01:50). Open question: R5.1 marketing asset |
| auth | web | off | Not building: company accounts and login roles; one seeded candidate (Mari Carmen), candidate/company/counsellor views reached by a simple switch (Beats 01:50, 03:20, 03:35) |
| dashboard | web | off | No Beat shows KPIs or an overview |
| crud | web | on | Offers list and detail (Beat 01:50), "Publicar oferta" form (Beat 03:35), applications with approve state (Beat 03:20) |
| settings | web | off | No Beat configures preferences |
| showcase | web | on | Design Phase (next) uses the gallery; drop before the demo if unused |
| chat | web | on | Beat 02:50: interview practice is a conversation with the model, driven by voice (`voice` on); text stays as fallback |
| upload | web | off | Mari Carmen's CV is seeded; no Beat uploads a file |
| realtime | web | off | No Beat shows data changing live |
| notifications | web | off | No Beat alerts the user |
| map | web | off | Offers are shown as a list, no Beat uses a map |
| qr | web | off | No Beat hands off to a phone or scans a code |
| voice | web | on | Beat 02:50: the interviewer asks out loud (browser TTS) and the candidate answers by voice; a text interview is not realistic and demos badly (heard: Driver, 2026-11-24). Static interviewer image on screen (Design). R14.1: speech suits basic digital skills |
| auth | api | off | Same flag as web `auth`: no accounts or roles in the demo |
| crud | api | on | Offers, applications and the candidate profile are stored records (Beats 01:50, 03:20, 03:35); copy `items` per resource |
| upload | api | off | Same flag as web `upload` |
| realtime | api | off | Same flag as web `realtime`; the llm chat uses its own socket `/api/llm/chat/ws` |
| chat | llm | on | Beat 02:50 (streaming interview over `/api/llm/chat/ws`) |
| rag | llm | off | Answers come from the offer and the CV passed in the prompt, not from a document corpus |
| voice | llm | on | Beat 02:50: speech-to-text of the candidate's answers (`STT_PROVIDER=groq`, reuses `GROQ_API_KEY`); TTS `browser`, free. Transcription only: no voice-emotion analysis (R13, AI Act Art. 5(1)(f)) |
| vision | data | off | `data` is pruned |
| reports | data | off | `data` is pruned |

Requires: `llm` requires `api` (kept). Features `chat` and `voice` need `api` + `llm` (both kept).

Note: `05-pitch.md` Not building lists "Voice interview (#4)". That item is the phone-call interview idea; spoken practice inside the 02:50 Beat is in scope (heard: Driver, 2026-11-24).

## Open questions

- Does R5 (marketing deliverable, Gate) need the web `landing` Feature as its ready-to-use asset? keep on / off (proposal: off; the marketing piece is a flyer or post in the zip).

## Pre-Prune SHA

<sha>

## Check result

`make check`: <green / what was fixed>

## Changes

- Keep <Module>: remove it from the prune list before the run.
- Turn on <Feature>: set it to `true` in `features.json`.
- Restore <Module>: `python3 scripts/prune.py --restore <module> --sha <pre-Prune SHA>`
