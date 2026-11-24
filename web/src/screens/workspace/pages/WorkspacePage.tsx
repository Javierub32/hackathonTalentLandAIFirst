import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, ClipboardList, FileText, MessageCircle } from "lucide-react"
import { useRef, useState } from "react"
import { Link, useParams } from "react-router"
import { Decoracion } from "@/components/brand/Decoracion"
import { EmptyState } from "@/components/common/EmptyState"
import { QueryState } from "@/components/common/QueryState"
import { Button } from "@/components/ui/button"
import { API_MODE } from "@/lib/api/client"
import type { components } from "@/lib/api/schema"
import { adaptCv, checkCv, loadCandidate, loadOffer, saveDraft } from "../api"
import { CvViews } from "../components/CvViews"
import { RequirementSummary } from "../components/RequirementSummary"

const actionClass = "min-h-12 h-auto whitespace-normal text-lg font-semibold"
type Offer = components["schemas"]["OfferRead"]

function OfferDetails({ offer }: { offer: Offer }) {
  const conditions = [
    ["Lugar", offer.location],
    ["Contrato", offer.contract],
    ["Jornada", offer.schedule],
    ["Salario", offer.salary],
  ]
  return (
    <header className="space-y-4 border-b pb-5">
      <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">{offer.title}</h1>
      <p>{offer.employer}</p>
      <dl className="flex flex-wrap gap-x-6 gap-y-2">
        {conditions.map(([label, value]) => (
          <div key={label} className="flex flex-wrap gap-x-2">
            <dt className="font-semibold">{label}</dt>
            <dd>{value || "Sin especificar"}</dd>
          </div>
        ))}
      </dl>
      {offer.hiring_aid && <p>{offer.hiring_aid}</p>}
      {offer.source && (
        <p>
          Fuente{" "}
          {offer.source_url ? (
            <a href={offer.source_url} className="font-semibold text-primary underline underline-offset-4">
              {offer.source}{offer.code && ` · ${offer.code}`}
            </a>
          ) : offer.source}
        </p>
      )}
    </header>
  )
}

function Preparation({ offerId, offerTitle, onBack }: { offerId: number; offerTitle: string; onBack: () => void }) {
  const ids = { offer_id: offerId, candidate_id: 1 }
  const queryClient = useQueryClient()
  const filter = useQuery({
    queryKey: ["workspace", offerId, ids.candidate_id, "filter"],
    queryFn: ({ signal }) => checkCv(ids, signal),
  })
  const candidate = useQuery({
    queryKey: ["workspace", "candidate", ids.candidate_id],
    queryFn: ({ signal }) => loadCandidate(ids.candidate_id, signal),
  })
  const adaptation = useMutation({ mutationFn: () => adaptCv(ids) })
  const draft = useMutation({
    mutationFn: (cvText: string) => saveDraft(ids, cvText),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  })
  const adapted = adaptation.data
  const report = adapted?.report ?? filter.data
  const cv = candidate.data

  return (
    <section aria-labelledby="workspace-cv" className="space-y-3">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b pb-2">
        <Button variant="ghost" onClick={onBack}><ArrowLeft aria-hidden /> Volver a la oferta</Button>
        <div>
          <h1 id="workspace-cv" tabIndex={-1} className="font-display text-2xl font-bold text-primary">Mejorar mi CV</h1>
          <p className="text-base leading-6 text-muted-foreground">{offerTitle}</p>
        </div>
      </header>
      {(filter.isPending || candidate.isPending) && <p role="status">Cargando tu CV y los requisitos…</p>}
      {filter.isError && (
        <EmptyState title="No se pudo comprobar el currículum" action={
          <Button variant="outline" onClick={() => void filter.refetch()}>Volver a intentar</Button>
        } />
      )}
      {candidate.isError && (
        <EmptyState title="No se pudo cargar tu currículum" action={
          <Button variant="outline" onClick={() => void candidate.refetch()}>Volver a intentar</Button>
        } />
      )}
      <div className="grid items-start gap-3 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-5">
        <div>{report && <RequirementSummary report={report} />}</div>
        {cv && <CvViews name={cv.name} original={cv.cv_text} adapted={adapted} />}
      </div>
      <div className="sr-only" role="status" aria-atomic="true">
        {adapted ? `CV mejorado. ${adapted.report.found} de ${adapted.report.total} requisitos · ${adapted.report.percent}%` :
          adaptation.isPending ? "Mejorando tu currículum…" : ""}
      </div>
      {adaptation.isError && <p role="alert" className="text-destructive">No se pudo mejorar el CV. Vuelve a intentarlo.</p>}
      {!adapted && cv && filter.data && (
        <Button className={actionClass} disabled={adaptation.isPending} onClick={() => adaptation.mutate()}>
          <FileText aria-hidden />{adaptation.isPending ? "Mejorando tu CV…" : "Mejorar mi CV"}
        </Button>
      )}
      {adapted && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {adapted.not_covered.length > 0 && (
            <p><strong>No lo inventamos:</strong> {adapted.not_covered.join(" · ")} quedan sin cubrir.</p>
          )}
          {draft.data ? (
            <>
              <p role="status">{draft.data.status === "borrador" ? "Tu borrador está guardado." : `Tu candidatura ya está ${draft.data.status}.`}</p>
              <Button variant="outline" asChild><Link to="/candidaturas">Ver mi candidatura</Link></Button>
            </>
          ) : (
            <Button variant="outline" disabled={draft.isPending} onClick={() => draft.mutate(adapted.cv_text)}>
              <ClipboardList aria-hidden />{draft.isPending ? "Guardando…" : "Preparar candidatura"}
            </Button>
          )}
          {draft.isError && <p role="alert" className="text-destructive">No se pudo guardar el borrador. Vuelve a intentarlo.</p>}
        </div>
      )}
    </section>
  )
}

function Workspace({ offerId }: { offerId: number }) {
  const [view, setView] = useState<"offer" | "cv" | "return">("offer")
  const showCv = view === "cv"
  const focusOfferAction = useRef<HTMLButtonElement>(null)
  const offer = useQuery({
    queryKey: ["workspace", offerId],
    queryFn: ({ signal }) => loadOffer(offerId, signal),
  })
  const canImprove = API_MODE !== "fixtures" || offerId === 1

  return (
    <div className="relative mx-auto max-w-6xl text-lg">
      <Decoracion className="opacity-50" />
      <div className="relative space-y-3">
        {!showCv && (
          <Button variant="ghost" asChild><Link to="/ofertas"><ArrowLeft aria-hidden /> Volver a las ofertas</Link></Button>
        )}
        {offer.isError ? (
          <EmptyState title="No se pudo cargar la oferta" action={
            <Button variant="outline" onClick={() => void offer.refetch()}>Volver a intentar</Button>
          } />
        ) : (
          <QueryState query={offer} empty={{ title: "No encontramos esa oferta" }}>
            {(data) => data && (
              <div className="space-y-4">
                {!showCv && (
                  <>
                    <OfferDetails offer={data} />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {canImprove && (
                        <Button ref={focusOfferAction} className={actionClass} onClick={() => {
                          setView("cv")
                          requestAnimationFrame(() => document.getElementById("workspace-cv")?.focus({ preventScroll: true }))
                        }}>
                          <FileText aria-hidden /> Mejorar mi CV
                        </Button>
                      )}
                      <Button variant="outline" className={actionClass} asChild>
                        <Link to={`/ofertas/${offerId}/entrevista`}><MessageCircle aria-hidden /> Practicar la entrevista</Link>
                      </Button>
                    </div>
                    {!canImprove && (
                      <p>Prueba la mejora del CV en la <Link className="font-semibold text-primary underline" to="/ofertas/1">oferta de perfumería</Link>.</p>
                    )}
                  </>
                )}
                {canImprove && view !== "offer" && (
                  <div hidden={!showCv}>
                    <Preparation offerId={offerId} offerTitle={data.title} onBack={() => {
                      setView("return")
                      requestAnimationFrame(() => focusOfferAction.current?.focus())
                    }} />
                  </div>
                )}
              </div>
            )}
          </QueryState>
        )}
      </div>
    </div>
  )
}

export default function WorkspacePage() {
  const { id } = useParams()
  const offerId = Number(id)
  if (!id || !/^\d+$/.test(id) || !Number.isSafeInteger(offerId) || offerId < 1) {
    return <EmptyState title="No encontramos esa oferta" action={<Button asChild className={actionClass}><Link to="/ofertas">Volver a las ofertas</Link></Button>} />
  }
  return <Workspace key={offerId} offerId={offerId} />
}
