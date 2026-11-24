import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, Check, X } from "lucide-react"
import { Link, useParams } from "react-router"
import { EmptyState } from "@/components/common/EmptyState"
import { QueryState } from "@/components/common/QueryState"
import { DrawnUnderline } from "@/components/effects/DrawnUnderline"
import { Button } from "@/components/ui/button"
import { API_MODE } from "@/lib/api/client"
import type { components } from "@/lib/api/schema"
import { adaptCv, checkCv, loadCandidate, loadOffer, saveDraft } from "../api"
import { CvCompare, UploadedCv } from "../components/CvViews"

const actionClass = "min-h-12 h-auto whitespace-normal text-lg font-semibold"
const panelClass = "space-y-5 rounded-xl border bg-card p-5 sm:p-8"
const headingClass = "font-display text-2xl font-semibold"

type Offer = components["schemas"]["OfferRead"]
type FilterReport = components["schemas"]["FilterReport"]

function Score({ report }: { report: FilterReport }) {
  return <>{report.found} de {report.total} · {report.percent}%</>
}

function OfferDetails({ offer }: { offer: Offer }) {
  const conditions = [
    ["Lugar", offer.location],
    ["Contrato", offer.contract],
    ["Jornada", offer.schedule],
    ["Salario", offer.salary],
  ]

  return (
    <header className={panelClass}>
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">{offer.title}</h1>
      <p>{offer.employer}</p>
      <dl className="grid gap-4 sm:grid-cols-2">
        {conditions.map(([label, value]) => (
          <div key={label}>
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

function focusAdaptedHeading(heading: HTMLHeadingElement | null) {
  heading?.focus()
}

function Preparation({ offerId }: { offerId: number }) {
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

  return (
    <>
      <section aria-labelledby="workspace-filter" className={panelClass}>
        <h2 id="workspace-filter" className={headingClass}>Así lee el filtro tu currículum</h2>
        <p>El filtro automático (ATS) busca en tu currículum los requisitos de esta oferta.</p>
        {candidate.data && <UploadedCv name={candidate.data.name} cvText={candidate.data.cv_text} />}
        {filter.isPending && <p role="status">Comprobando los requisitos…</p>}
        {filter.isError && (
          <EmptyState
            title="No se pudo comprobar el currículum"
            action={<Button variant="outline" className={actionClass} onClick={() => void filter.refetch()}>Volver a intentar</Button>}
          />
        )}
        {filter.data && (
          <>
            <p className="text-2xl font-semibold"><Score report={filter.data} /></p>
            {filter.data.requirements.length === 0 && <p>La oferta no indica requisitos.</p>}
            {!adapted && (
              <Button className={actionClass} disabled={adaptation.isPending} onClick={() => adaptation.mutate()}>
                {adaptation.isPending ? "Adaptando tu CV…" : "Adaptar mi CV"}
              </Button>
            )}
            {adaptation.isError && <p role="alert" className="text-destructive">No se pudo adaptar el currículum. Vuelve a intentarlo.</p>}
            <details open={!adapted}>
              <summary className="min-h-8 cursor-pointer font-semibold">Requisitos del filtro inicial</summary>
              <ul className="mt-3 divide-y rounded-lg border">
                {filter.data.requirements.map((requirement, index) => (
                  <li key={index} className="space-y-1 px-4 py-3">
                    <p className="font-semibold">{requirement.text}</p>
                    <p className="flex items-center gap-2">
                      {requirement.found ? <Check aria-hidden className="size-5 shrink-0" /> : <X aria-hidden className="size-5 shrink-0" />}
                      {requirement.found ? "Encontrado" : "No encontrado"}
                    </p>
                    <p className="text-muted-foreground">{requirement.evidence || "El filtro no encontró palabras que lo acrediten."}</p>
                  </li>
                ))}
              </ul>
            </details>
          </>
        )}
      </section>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {adapted ? <>CV adaptado. <Score report={adapted.report} /></> : adaptation.isPending ? "Adaptando tu currículum" : ""}
      </div>
      {adapted && (
        <section aria-labelledby="workspace-adapted" className={panelClass}>
          <h2 id="workspace-adapted" className={headingClass} tabIndex={-1} ref={focusAdaptedHeading}>Tu CV adaptado</h2>
          <div className="rounded-xl bg-accent p-4 text-accent-foreground">
            <p className="text-3xl font-semibold"><DrawnUnderline><Score report={adapted.report} /></DrawnUnderline></p>
            <p className="mt-2">Requisitos encontrados en el CV adaptado</p>
          </div>
          <CvCompare
            name={candidate.data?.name ?? "Pilar Romero"}
            original={candidate.data?.cv_text ?? ""}
            adapted={adapted.cv_text}
            changes={adapted.changes}
          />
          <div className="space-y-2 rounded-lg bg-accent p-4 text-accent-foreground">
            <h3 className="font-semibold">Nada inventado</h3>
            {adapted.not_covered.length > 0 && (
              <>
                <p>Requisitos que aún quedan sin cubrir:</p>
                <ul className="list-disc pl-6">
                  {adapted.not_covered.map((requirement, index) => <li key={index}>{requirement}</li>)}
                </ul>
              </>
            )}
            {adapted.note && <p>{adapted.note}</p>}
          </div>
          {draft.data && (
            <p role="status">
              {draft.data.status === "borrador" ? "Tu borrador está guardado." : `Tu candidatura ya está ${draft.data.status}.`}
            </p>
          )}
          {draft.isError && <p role="alert" className="text-destructive">No se pudo guardar la candidatura. Vuelve a intentarlo.</p>}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {draft.data ? (
              <Button className={actionClass} asChild><Link to="/candidaturas">Ver mi candidatura</Link></Button>
            ) : (
              <Button className={actionClass} disabled={draft.isPending} onClick={() => draft.mutate(adapted.cv_text)}>
                {draft.isPending ? "Guardando el borrador…" : "Preparar candidatura"}
              </Button>
            )}
            <Button variant="outline" className={actionClass} asChild>
              <Link to={`/ofertas/${offerId}/entrevista`}>Practicar la entrevista</Link>
            </Button>
          </div>
        </section>
      )}
    </>
  )
}

function Workspace({ offerId }: { offerId: number }) {
  const offer = useQuery({
    queryKey: ["workspace", offerId],
    queryFn: ({ signal }) => loadOffer(offerId, signal),
  })

  return (
    <div className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed">
      <Button variant="outline" className={actionClass} asChild>
        <Link to="/ofertas"><ArrowLeft aria-hidden /> Volver a las ofertas</Link>
      </Button>
      {offer.isError ? (
        <EmptyState
          title="No se pudo cargar la oferta"
          action={<Button variant="outline" className={actionClass} onClick={() => void offer.refetch()}>Volver a intentar</Button>}
        />
      ) : (
        <QueryState query={offer} empty={{ title: "No encontramos esa oferta" }}>
          {(data) => data && (
            <>
              <OfferDetails offer={data} />
              {API_MODE === "fixtures" && offerId !== 1 ? (
                <p className={panelClass}>En el modo de demostración puedes adaptar el CV en la <Link className="font-semibold text-primary underline" to="/ofertas/1">oferta de perfumería</Link>.</p>
              ) : (
                <Preparation offerId={offerId} />
              )}
            </>
          )}
        </QueryState>
      )}
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
