import { api } from "@/lib/api/client"
import type { components } from "@/lib/api/schema"

type PrepRequest = components["schemas"]["PrepRequest"]
type Application = components["schemas"]["ApplicationRead"]

export async function loadOffer(offerId: number, signal: AbortSignal) {
  const { data, response } = await api.GET("/api/offers/{offer_id}", {
    params: { path: { offer_id: offerId } },
    signal,
  })
  if (response.status === 404) return null
  if (!data) throw new Error("No se pudo cargar la oferta.")
  return data
}

export async function checkCv(body: PrepRequest, signal: AbortSignal) {
  const { data } = await api.POST("/api/prep/filter", { body, signal })
  if (!data || data.offer_id !== body.offer_id || data.candidate_id !== body.candidate_id) {
    throw new Error("No se pudo comprobar el currículum para esta oferta.")
  }
  return data
}

export async function adaptCv(body: PrepRequest) {
  const { data } = await api.POST("/api/prep/adapt-cv", { body })
  if (!data || data.offer_id !== body.offer_id || data.candidate_id !== body.candidate_id) {
    throw new Error("No se pudo adaptar el currículum para esta oferta.")
  }
  return data
}

export async function saveDraft(ids: PrepRequest, cvText: string) {
  const { data } = await api.GET("/api/applications", { params: { query: ids } })
  if (!data) throw new Error("No se pudo consultar la candidatura.")

  // The fixtures CRUD wraps lists in an envelope. The live contract returns an array.
  const rows = data as Application[] | { items: Application[] }
  const existing = (Array.isArray(rows) ? rows : rows.items)
    .find((row) => row.offer_id === ids.offer_id && row.candidate_id === ids.candidate_id)

  if (existing) {
    if (existing.status !== "borrador" || existing.cv_text === cvText) return existing
    const { data: updated } = await api.PATCH("/api/applications/{application_id}", {
      params: { path: { application_id: existing.id } },
      body: { cv_text: cvText },
    })
    if (!updated) throw new Error("No se pudo actualizar el borrador.")
    return updated
  }

  const { data: created } = await api.POST("/api/applications", {
    body: {
      ...ids,
      cv_text: cvText,
      status: "borrador",
      counsellor_name: "Lucía Ortega (IMFE)",
      counsellor_note: "",
    },
  })
  if (!created) throw new Error("No se pudo guardar el borrador.")
  return created
}

/** The candidate with her original `cv_text` (the CV shown as «subido»). */
export async function loadCandidate(candidateId: number, signal: AbortSignal) {
  const { data } = await api.GET("/api/candidates/{candidate_id}", {
    params: { path: { candidate_id: candidateId } },
    signal,
  })
  if (!data) throw new Error("No se pudo cargar tu currículum.")
  return data
}
