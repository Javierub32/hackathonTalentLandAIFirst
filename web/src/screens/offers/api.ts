import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api/client"
import type { components } from "@/lib/api/schema"

export type Offer = components["schemas"]["OfferRead"]

function offerRows(data: Offer[] | { items: Offer[] }): Offer[] {
  // The API returns an array and the shared fixture handler wraps it in a page.
  return Array.isArray(data) ? data : data.items
}

export function useOffers() {
  return useQuery({
    queryKey: ["offers", "list"],
    queryFn: async ({ signal }) => {
      const { data } = await api.GET("/api/offers", { signal })
      if (!data) throw new Error("No se pudieron cargar las ofertas.")
      return offerRows(data)
    },
  })
}
