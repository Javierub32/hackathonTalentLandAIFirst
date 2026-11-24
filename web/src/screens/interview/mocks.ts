import { delay, http, HttpResponse } from "msw"
import type { RequestHandler } from "msw"
// Copy of backend/api/resources/interview/stub.json (Seam "Entrevista"); keep both in step.
import stub from "./stub.json"

/** Fixtures-mode stubs for `POST /api/interview/questions` and `POST /api/interview/feedback`. */
export const handlers: RequestHandler[] = [
  http.post("*/api/interview/questions", async () => {
    await delay(600)
    return HttpResponse.json(stub.questions)
  }),
  http.post("*/api/interview/feedback", async () => {
    await delay(1200)
    const { offer_id, good, improve, tip } = stub.feedback
    return HttpResponse.json({ offer_id, good, improve, tip })
  }),
]
