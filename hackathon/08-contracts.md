---
status: draft
---

# Contracts

- [x] 1 Ask
- [ ] 2 Walk the Beats
- [ ] 3 Confirm the Seams
- [ ] 4 Stub
- [ ] 5 Close

## Answers (step 1)

Heard: Driver, 2026-11-24.

1. External shape to match: none. LLM and STT provider is **Groq** (free tier, `GROQ_API_KEY`); stubs expose our own interface, the provider stays behind it.
2. Entities: candidate **Pilar**, 53, Málaga, 18 months unemployed, 20+ years in retail and admin (renamed from "Mari Carmen" for a recent public controversy around that name; `05-pitch.md` and `06-prune.md` updated). IMFE counsellor: fictitious name. Employers: no names invented; each offer shows the employer description the IMFE portal publishes.
3. Real data: 11 real offers from the IMFE municipal placement agency (https://malagaempleo.portalemp.com/, fetched 2026-11-24, code and link cited per offer). Demo offer: **2026/01198 Dependiente/a de perfumería, atención al cliente y asesoramiento** (Beats 01:50, 02:05 now say "dependienta de perfumería" instead of "auxiliar administrativa"; the portal had no admin offer). No synthetic offers needed.

## Seams

Kind: HTTP, Python function, Data/file, Event, New piece.

| Seam | Kind | Producer Lane | Consumer Lane(s) | Interface (path) | Stub | Beats |
|---|---|---|---|---|---|---|
| <seam> | <kind> | <lane> | <lane, lane> | <path> | <what the stub returns> | <Beat 00:00> |

## No Seam

- <Beat 00:00>: <why it crosses no Lane>

## Contract paths

- <path>

## Change protocol

- Additive change, by the producer Lane: run `make openapi api-client`, then add a line to the Change log.
- Breaking change: stop and ask the Driver.
- Other Lanes: comment on the issue, or open an issue labelled `blocked` + `lane:<producer>`.

## Change log

<!-- One line per change: date, Seam, what changed, by whom. -->
