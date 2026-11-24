import type { components } from "@/lib/api/schema"

type Offer = components["schemas"]["OfferRead"]
type Candidate = components["schemas"]["CandidateRead"]
type Report = components["schemas"]["FilterReport"]
type AdaptedCv = components["schemas"]["AdaptedCv"]

// These examples use Pilar's seeded experience. Perfumería uses the shared preparation stub.
const DEMO_OFFER = "2026/01198"
const examples: Record<string, { evidence: Record<string, string>; changes: AdaptedCv["changes"] }> = {
  "2026/01201": {
    evidence: {
      "Experiencia como dependiente (6 meses)": "Dependienta en tienda de moda.",
      "Se valora: experiencia en el sector textil": "Dependienta en tienda de moda.",
      "Se valora: inglés": "Inglés básico.",
    },
    changes: [
      {
        requirement: "Experiencia como dependiente (6 meses)",
        text: "Dependienta y cajera en tienda de moda y complementos durante 16 años.",
        source: "Tienda de moda y complementos (2009–2025).",
      },
      {
        requirement: "Se valora: manejo de ofimática",
        text: "Ofimática básica con Word y correo electrónico.",
        source: "Habilidades del perfil de Pilar.",
      },
    ],
  },
  "2026/01204": {
    evidence: {
      "Buenas habilidades comunicativas y de atención al cliente": "Atendía a las clientas",
    },
    changes: [
      {
        requirement: "Buenas habilidades comunicativas y de atención al cliente",
        text: "Atención al cliente y asesoramiento en la elección de prendas y complementos.",
        source: "Tienda de moda y complementos (2009–2025).",
      },
      {
        requirement: "Capacidad de organización y resolución de problemas",
        text: "Organización del género, recuento de inventario y gestión de cambios y devoluciones.",
        source: "Tienda de moda y complementos (2009–2025).",
      },
    ],
  },
}

export function usesLocalDemo(offer: Offer) {
  return offer.code !== DEMO_OFFER
}

export function demoReport(offer: Offer, candidate: Candidate, changes: AdaptedCv["changes"] = []): Report {
  const evidence = examples[offer.code ?? ""]?.evidence
  const requirements = (offer.requirements ?? []).map((text) => {
    const original = evidence?.[text]
    const quote = changes.find((change) => change.requirement === text)?.text
      ?? (original && candidate.cv_text.includes(original) ? original : "")
    return { text, found: Boolean(quote), evidence: quote }
  })
  const found = requirements.filter((requirement) => requirement.found).length
  return {
    offer_id: offer.id,
    candidate_id: candidate.id,
    requirements,
    found,
    total: requirements.length,
    percent: requirements.length ? Math.round(100 * found / requirements.length) : 0,
  }
}

function demoChanges(offer: Offer) {
  return (examples[offer.code ?? ""]?.changes ?? [])
    .filter((change) => offer.requirements?.includes(change.requirement))
}

export function hasDemoMatch(offer: Offer) {
  return demoChanges(offer).length > 0
}

export function demoAdaptation(offer: Offer, candidate: Candidate): AdaptedCv {
  const changes = demoChanges(offer)
  const report = demoReport(offer, candidate, changes)
  const additions = changes.map((change) => `- ${change.text}`).join("\n")
  return {
    offer_id: offer.id,
    candidate_id: candidate.id,
    cv_text: additions ? `${candidate.cv_text.trim()}\n\nCOMPETENCIAS\n${additions}` : candidate.cv_text,
    changes,
    report,
    not_covered: report.requirements.filter((requirement) => !requirement.found).map((requirement) => requirement.text),
    note: "Ejemplo de demostración basado en el perfil de Pilar.",
  }
}
