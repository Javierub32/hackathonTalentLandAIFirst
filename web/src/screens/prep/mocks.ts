import { delay, http, HttpResponse } from "msw"
import type { RequestHandler } from "msw"
// Copy of backend/api/resources/prep/stub.json (Seam "Preparación"); keep both in step.
import stub from "./stub.json"

/** Fixtures-mode stubs for `POST /api/prep/filter` and `POST /api/prep/adapt-cv`. */
export const handlers: RequestHandler[] = [
  http.post("*/api/prep/filter", async () => {
    await delay(600)
    return HttpResponse.json(stub.filter)
  }),
  http.post("*/api/prep/adapt-cv", async () => {
    await delay(1500)
    return HttpResponse.json(stub.adapt_cv)
  }),
]
