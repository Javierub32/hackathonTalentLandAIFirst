import { api } from "@/lib/api/client"
import type { components } from "@/lib/api/schema"

export type Application = components["schemas"]["ApplicationRead"]
type ApplicationUpdate = components["schemas"]["ApplicationUpdate"]

export const applicationsKey = ["applications", 1] as const

export async function loadApplications(signal: AbortSignal) {
  const { data } = await api.GET("/api/applications", {
    params: { query: { candidate_id: 1 } },
    signal,
  })
  if (!data) throw new Error("No se pudieron cargar las candidaturas.")

  // Fixtures return an envelope; the live API returns the list directly.
  const rows = data as Application[] | { items: Application[] }
  return Array.isArray(rows) ? rows : rows.items
}

export async function updateApplication(id: number, body: ApplicationUpdate) {
  const { data } = await api.PATCH("/api/applications/{application_id}", {
    params: { path: { application_id: id } },
    body,
  })
  if (!data) throw new Error("No se pudo guardar el cambio. Inténtalo de nuevo.")
  return data
}
