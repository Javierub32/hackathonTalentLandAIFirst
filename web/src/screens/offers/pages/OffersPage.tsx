import { useState } from "react"
import { Link } from "react-router"
import { ArrowRight, BadgeEuro, ChevronRight, Clock, MapPin } from "lucide-react"
import { Etiqueta } from "@/components/brand"
import { EmptyState } from "@/components/common/EmptyState"
import { QueryState } from "@/components/common/QueryState"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Offer, useOffers } from "../api"

/** Demo candidate; the greeting is the first thing the jury sees (Beat 01:50). */
const CANDIDATA = "Pilar"
/** Rows shown before "Ver todas", so the home fits one 1366×768 screen. */
const VISIBLES = 5

const PASOS = ["Elige una oferta", "Adapta tu currículum", "Practica la entrevista"]

/** "Parcial: lunes a viernes…" → "Parcial"; keeps rows on one line. */
const jornadaCorta = (schedule: string) => schedule.split(/[:,(]/)[0].trim() || "Jornada sin indicar"

function AyudaEmpleaT({ offer, className }: { offer: Offer; className?: string }) {
  if (!offer.hiring_aid) return null
  return (
    <span
      title={offer.hiring_aid}
      className={cn("inline-flex shrink-0 items-center gap-1 rounded-sm bg-accent px-2 py-0.5 text-base font-semibold text-accent-foreground", className)}
    >
      <BadgeEuro className="size-4" aria-hidden />
      Ayuda Emplea-T
    </span>
  )
}

/** The demo offer, large: a forest header like the poster, then the conditions on white. */
function OfertaDestacada({ offer }: { offer: Offer }) {
  return (
    <article className="overflow-hidden rounded-md border border-primary/20 bg-card shadow-[10px_10px_0_0_var(--color-accent)]">
      <header className="relative space-y-3 bg-primary px-6 pb-6 pt-5 text-primary-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-chart-3 [clip-path:polygon(70%_0,100%_0,100%_100%,30%_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-accent [clip-path:polygon(62%_0,70%_0,30%_100%,22%_100%)]" />
        <div className="relative flex flex-wrap items-center gap-2">
          <Etiqueta className="text-base">Nueva en Málaga</Etiqueta>
          <AyudaEmpleaT offer={offer} />
        </div>
        <h2 className="relative max-w-[22ch] font-display text-2xl font-extrabold leading-tight">{offer.title}</h2>
      </header>
      <div className="space-y-4 px-6 pb-6 pt-4">
        <p className="line-clamp-1 text-lg text-muted-foreground">{offer.employer || "Empresa sin indicar"}</p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-lg">
          <li className="flex items-center gap-2"><MapPin className="size-5 shrink-0 text-chart-3" aria-hidden /><span className="sr-only">Lugar: </span>{offer.location || "Sin indicar"}</li>
          <li className="flex items-center gap-2"><Clock className="size-5 shrink-0 text-chart-3" aria-hidden /><span className="sr-only">Jornada: </span>{jornadaCorta(offer.schedule)}</li>
          <li className="col-span-2 flex items-center gap-2"><BadgeEuro className="size-5 shrink-0 text-chart-3" aria-hidden /><span className="sr-only">Salario: </span>{offer.salary || "Sin indicar"}</li>
        </ul>
        <Button asChild size="lg" className="h-auto min-h-12 px-6 text-lg font-semibold">
          <Link to={`/ofertas/${offer.id}`} aria-label={`Ver oferta: ${offer.title}`}>
            Ver oferta <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </article>
  )
}

/** Every other offer as a row of one list: title, place · schedule, aid badge. */
function FilaOferta({ offer }: { offer: Offer }) {
  return (
    <Link
      to={`/ofertas/${offer.id}`}
      className="group flex min-h-[72px] items-center gap-4 px-5 py-3 hover:bg-secondary focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-lg font-semibold leading-snug group-hover:underline">{offer.title}</span>
        <span className="block truncate text-lg leading-snug text-muted-foreground">
          {offer.location || "Lugar sin indicar"} · {jornadaCorta(offer.schedule)}
        </span>
      </span>
      <AyudaEmpleaT offer={offer} className="hidden sm:inline-flex" />
      <ChevronRight className="size-5 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
    </Link>
  )
}

function Ofertas({ rows }: { rows: Offer[] }) {
  const [todas, setTodas] = useState(false)
  const [destacada, ...resto] = rows
  const visibles = todas ? resto : resto.slice(0, VISIBLES)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)] lg:gap-10">
      <div className="space-y-5">
        <Saludo />
        <OfertaDestacada offer={destacada} />
      </div>

      {resto.length > 0 && (
        <section aria-labelledby="mas-ofertas" className="space-y-3 lg:pt-2">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="mas-ofertas"><Etiqueta>Más ofertas para ti</Etiqueta></h2>
            <p className="text-lg text-muted-foreground">{rows.length} ofertas</p>
          </div>
          <ul className="divide-y overflow-hidden rounded-md border bg-card shadow-sm">
            {visibles.map((offer) => (
              <li key={offer.id}><FilaOferta offer={offer} /></li>
            ))}
          </ul>
          {resto.length > VISIBLES && (
            <Button variant="outline" className="min-h-12 text-lg font-semibold" aria-expanded={todas} onClick={() => setTodas((v) => !v)}>
              {todas ? "Ver menos" : `Ver todas (${resto.length})`}
            </Button>
          )}
        </section>
      )}
    </div>
  )
}

function Saludo() {
  return (
    <header className="space-y-3">
      <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Hola, <span className="text-chart-3">{CANDIDATA}</span>
      </h1>
      <p className="max-w-[32ch] text-xl leading-relaxed">Elige una oferta y te ayudamos a preparar tu candidatura.</p>
      <ol className="flex flex-wrap gap-x-5 gap-y-1 text-lg text-muted-foreground" aria-label="Cómo funciona">
        {PASOS.map((paso, i) => (
          <li key={paso} className="flex items-center gap-2">
            <span className="font-bold text-chart-3">{String(i + 1).padStart(2, "0")}</span>
            {paso}
          </li>
        ))}
      </ol>
    </header>
  )
}

export default function OffersPage() {
  const offers = useOffers()
  const retry = (
    <Button variant="outline" className="min-h-12 text-lg font-semibold" onClick={() => void offers.refetch()}>
      Volver a cargar
    </Button>
  )

  if (offers.isPending) {
    return (
      <div className="space-y-5">
        <Saludo />
        <p className="text-lg" role="status">Cargando ofertas…</p>
      </div>
    )
  }
  if (offers.isError) {
    return (
      <div className="space-y-5">
        <Saludo />
        <div role="alert"><EmptyState title="No se pudieron cargar las ofertas" action={retry} /></div>
      </div>
    )
  }
  return (
    <QueryState query={offers} empty={{ title: "No hay ofertas disponibles", action: retry }}>
      {(rows) => <Ofertas rows={rows} />}
    </QueryState>
  )
}
