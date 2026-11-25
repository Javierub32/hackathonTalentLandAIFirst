import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, ArrowRight, BadgeEuro, ClipboardList, Clock, ExternalLink, FileText, MapPin, MessageCircle, ScrollText } from "lucide-react"
import { useRef, useState } from "react"
import { Link, useParams } from "react-router"
import { Etiqueta } from "@/components/brand"
import { EmptyState } from "@/components/common/EmptyState"
import { QueryState } from "@/components/common/QueryState"
import { Button } from "@/components/ui/button"
import { API_MODE } from "@/lib/api/client"
import type { components } from "@/lib/api/schema"
import { adaptCv, checkCv, loadCandidate, loadOffer, saveDraft } from "../api"
import { CvViews } from "../components/CvViews"
import { RequirementSummary } from "../components/RequirementSummary"
import { demoAdaptation, demoReport, hasDemoMatch, usesLocalDemo } from "../demoPreparation"

const actionClass = "min-h-12 h-auto whitespace-normal text-lg font-semibold"
type Offer = components["schemas"]["OfferRead"]

/** Offer header like the poster: forest band with the title, diagonal mint and medium-green bands on the right. */
function OfferDetails({ offer }: { offer: Offer }) {
  return (
    <header className="relative overflow-hidden rounded-md bg-primary px-6 py-6 text-primary-foreground md:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] sm:block bg-chart-3 [clip-path:polygon(42%_0,100%_0,100%_100%,12%_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] sm:block bg-accent [clip-path:polygon(34%_0,42%_0,12%_100%,4%_100%)]" />
      <div className="relative space-y-3 sm:max-w-[70%]">
        <div className="flex flex-wrap items-center gap-2">
          <Etiqueta className="text-base">Oferta{offer.code && ` ${offer.code}`}</Etiqueta>
          {offer.hiring_aid && (
            <span className="inline-flex items-center gap-1 rounded-sm bg-primary-foreground px-2 py-0.5 text-base font-semibold text-primary">
              <BadgeEuro className="size-4" aria-hidden /> Ayuda Emplea-T
            </span>
          )}
        </div>
        <h1 className="font-display text-2xl font-extrabold leading-tight sm:text-4xl">{offer.title}</h1>
        <p className="text-lg text-primary-foreground/85">{offer.employer}</p>
      </div>
    </header>
  )
}

/** The offer conditions on one white surface, each with its icon and label. */
function OfferConditions({ offer }: { offer: Offer }) {
  const conditions = [
    { label: "Lugar", value: offer.location, Icon: MapPin },
    { label: "Jornada", value: offer.schedule, Icon: Clock },
    { label: "Salario", value: offer.salary, Icon: BadgeEuro },
    { label: "Contrato", value: offer.contract, Icon: ScrollText },
  ]
  return (
    <section aria-label="Condiciones de la oferta" className="space-y-4 rounded-md border bg-card p-6 shadow-sm">
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {conditions.map(({ label, value, Icon }) => (
          <div key={label} className="flex gap-3">
            <Icon className="mt-1 size-6 shrink-0 text-chart-3" aria-hidden />
            <div>
              <dt className="font-bold">{label}</dt>
              <dd className="leading-snug">{value || "Sin especificar"}</dd>
            </div>
          </div>
        ))}
      </dl>
      {offer.hiring_aid && <p className="border-l-4 border-chart-3 bg-secondary px-4 py-2 leading-snug">{offer.hiring_aid}</p>}
      {offer.source && (
        <p className="text-muted-foreground">
          Fuente:{" "}
          {offer.source_url ? (
            <a href={offer.source_url} className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">
              {offer.source}{offer.code && ` · ${offer.code}`} <ExternalLink className="size-4" aria-hidden />
            </a>
          ) : offer.source}
        </p>
      )}
    </section>
  )
}

function Preparation({ offer, onBack }: { offer: Offer; onBack: () => void }) {
  const ids = { offer_id: offer.id, candidate_id: 1 }
  const localDemo = API_MODE === "fixtures" && usesLocalDemo(offer)
  const queryClient = useQueryClient()
  const filter = useQuery({
    queryKey: ["workspace", offer.id, ids.candidate_id, "filter"],
    enabled: !localDemo,
    queryFn: ({ signal }) => checkCv(ids, signal),
  })
  const candidate = useQuery({
    queryKey: ["workspace", "candidate", ids.candidate_id],
    queryFn: ({ signal }) => loadCandidate(ids.candidate_id, signal),
  })
  const adaptation = useMutation({
    mutationFn: async (cv: NonNullable<typeof candidate.data>) => {
      const result = localDemo ? demoAdaptation(offer, cv) : await adaptCv(ids)
      if (!result.changes.length && result.cv_text === cv.cv_text &&
          result.note?.startsWith("La adaptación con IA no está disponible")) {
        throw new Error("El servicio de adaptación no está disponible.")
      }
      return result
    },
  })
  const draft = useMutation({
    mutationFn: (cvText: string) => saveDraft(ids, cvText),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  })
  const cv = candidate.data
  const initialReport = localDemo && cv ? demoReport(offer, cv) : filter.data
  const result = adaptation.data
  const adapted = result?.changes.length ? result : undefined
  const noRequirements = initialReport?.total === 0
  // An ATS miss can be a wording issue. In live mode, wait for the assessment of the full profile.
  const noMatch = initialReport?.found === 0 && !noRequirements && (
    localDemo ? !hasDemoMatch(offer) : result?.report.found === 0 && !result.changes.length
  )
  const noChanges = result && !adapted && !noMatch
  const report = adapted?.report ?? initialReport
  const canAdapt = !adapted && !noMatch && !noChanges && !noRequirements && !!cv && !!initialReport

  return (
    <section aria-labelledby="workspace-cv" className="space-y-3">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-1 pb-1">
        <Button variant="ghost" className="text-lg" onClick={onBack}><ArrowLeft aria-hidden /> Volver a la oferta</Button>
        <div>
          <h1 id="workspace-cv" tabIndex={-1} className="font-display text-2xl font-bold text-primary">Mejorar mi CV</h1>
          <p className="text-base leading-6 text-muted-foreground">{offer.title}</p>
        </div>
      </header>
      {((!localDemo && filter.isPending) || candidate.isPending) && <p role="status">Cargando tu CV y los requisitos…</p>}
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
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6">
        <div>{report && <RequirementSummary report={report} previous={adapted ? initialReport : undefined} showFitHint={!adapted} />}</div>
        {cv && <CvViews name={cv.name} original={cv.cv_text} adapted={adapted} pending={adaptation.isPending} afterActions={adapted && (
          draft.data ? (
            <>
              <p role="status">{draft.data.status === "borrador" ? "Tu borrador está guardado." : `Tu candidatura ya está ${draft.data.status}.`}</p>
              <Button variant="outline" asChild><Link to="/candidaturas">Ver mi candidatura</Link></Button>
            </>
          ) : (
            <Button variant="outline" className="min-h-12 text-lg font-semibold" disabled={draft.isPending} onClick={() => draft.mutate(adapted.cv_text)}>
              <ClipboardList aria-hidden />{draft.isPending ? "Guardando…" : "Preparar candidatura"}
            </Button>
          )
        )} action={canAdapt && (
          <>
            <p className="max-w-[30ch] leading-snug text-muted-foreground">Destacamos tu experiencia real para que el filtro automático encuentre lo que pide la oferta.</p>
            <Button className={`${actionClass} px-8 shadow-[6px_6px_0_0_var(--color-accent)]`} disabled={adaptation.isPending} onClick={() => adaptation.mutate(cv)}>
              <FileText aria-hidden />{adaptation.isPending ? "Mejorando tu CV…" : "Mejorar mi CV"}
            </Button>
          </>
        )} />}
      </div>
      <div className="sr-only" role="status" aria-atomic="true">
        {adapted ? `CV mejorado. ${adapted.report.found} de ${adapted.report.total} requisitos · ${adapted.report.percent}%` :
          adaptation.isPending ? "Mejorando tu currículum…" : ""}
      </div>
      {draft.isError && <p role="alert" className="text-destructive">No se pudo guardar el borrador. Vuelve a intentarlo.</p>}
      {adaptation.isError && <p role="alert" className="text-destructive">No se pudo mejorar el CV. Vuelve a intentarlo.</p>}
      {noRequirements && <p role="status">No podemos adaptar el CV porque la oferta no especifica sus requisitos.</p>}
      {noMatch && (
        <div role="status" className="border-l-4 border-primary bg-accent px-4 py-3 text-accent-foreground">
          <p className="font-bold">No podemos adaptar tu CV a esta oferta</p>
          <p>No encontramos experiencia, formación ni habilidades en tu perfil que se relacionen con los requisitos del puesto.</p>
        </div>
      )}
      {noChanges && <p role="status">No encontramos cambios respaldados por tu perfil que mejoren el CV para esta oferta.</p>}
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

  return (
    <div className="relative mx-auto max-w-6xl text-lg">
      <div className="relative space-y-3">
        {!showCv && (
          <Button variant="ghost" className="-ml-3 text-lg" asChild><Link to="/ofertas"><ArrowLeft aria-hidden /> Volver a las ofertas</Link></Button>
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
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                      <OfferConditions offer={data} />
                      <section aria-labelledby="prepara" className="space-y-3 rounded-md border bg-card p-6 shadow-[10px_10px_0_0_var(--color-accent)]">
                        <h2 id="prepara" className="font-display text-2xl font-extrabold leading-tight">Prepárate para esta oferta</h2>
                        <Button ref={focusOfferAction} className={`${actionClass} w-full justify-start px-5`} onClick={() => {
                          setView("cv")
                          requestAnimationFrame(() => document.getElementById("workspace-cv")?.focus({ preventScroll: true }))
                        }}>
                          <FileText aria-hidden /> Mejorar mi CV <ArrowRight className="ml-auto" aria-hidden />
                        </Button>
                        <p className="leading-snug text-muted-foreground">Adaptamos tu CV a lo que pide la oferta, con tu experiencia real.</p>
                        <Button variant="outline" className={`${actionClass} w-full justify-start border-primary/40 px-5`} asChild>
                          <Link to={`/ofertas/${offerId}/entrevista`}><MessageCircle aria-hidden /> Practicar la entrevista <ArrowRight className="ml-auto" aria-hidden /></Link>
                        </Button>
                        <p className="leading-snug text-muted-foreground">Ensaya con preguntas de este puesto y recibe consejos.</p>
                      </section>
                    </div>
                  </>
                )}
                {view !== "offer" && (
                  <div hidden={!showCv}>
                    <Preparation offer={data} onBack={() => {
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
