import { useState } from "react"
import { Link } from "react-router"
import { ArrowRight, BadgeEuro, Briefcase, ChefHat, ChevronDown, ChevronRight, Clock, Cpu, Dumbbell, HeartPulse, type LucideIcon, MapPin, ShoppingBag, Sparkles, Users, Wrench } from "lucide-react"
import { Etiqueta } from "@/components/brand"
import { EmptyState } from "@/components/common/EmptyState"
import { QueryState } from "@/components/common/QueryState"
import { Button } from "@/components/ui/button"
import { type Offer, useOffers } from "../api"

/** Demo candidate; the greeting is the first thing the jury sees (Beat 01:50). */
const CANDIDATA = "Pilar"
/** Rows shown before "Ver todas", so the home fits one 1366×768 screen. */
const VISIBLES = 5

const PASOS = ["Elige una oferta", "Adapta tu currículum", "Practica la entrevista"]

/** "Parcial: lunes a viernes…" → "Parcial"; keeps rows on one line. */
const jornadaCorta = (schedule: string) => schedule.split(/[:,(]/)[0].trim() || "Jornada sin indicar"

/** The demo offer, large: a forest header like the poster, then the conditions on white. */
function OfertaDestacada({ offer }: { offer: Offer }) {
  return (
    <article className="overflow-hidden rounded-md border border-primary/20 bg-card shadow-[10px_10px_0_0_var(--color-accent)]">
      <header className="relative space-y-3 bg-primary px-6 pb-6 pt-5 text-primary-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-chart-3 [clip-path:polygon(70%_0,100%_0,100%_100%,30%_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-accent [clip-path:polygon(62%_0,70%_0,30%_100%,22%_100%)]" />
        <Etiqueta className="relative text-base">Nueva en Málaga</Etiqueta>
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

/** A recognisable icon per kind of job, from the title; Briefcase when nothing matches. Add a pair to grow it. */
const ICONOS: [RegExp, LucideIcon][] = [
  [/dependient|vend|comercio|perfum|tienda/i, ShoppingBag],
  [/cocin|camarer|hosteler/i, ChefHat],
  [/deport|monitor/i, Dumbbell],
  [/limpieza/i, Sparkles],
  [/fisio|enfermer|cuidad|sanitari/i, HeartPulse],
  [/electr[oó]nic|montaje|manipulador/i, Cpu],
  [/t[eé]cnic|servicio t|mantenimiento/i, Wrench],
  [/orienta|laboral|social/i, Users],
]
const iconoDe = (title: string) => ICONOS.find(([re]) => re.test(title))?.[1] ?? Briefcase

/** Every other offer as a row of one list: job icon, title, place and schedule. */
function FilaOferta({ offer }: { offer: Offer }) {
  const Icono = iconoDe(offer.title)
  return (
    <Link
      to={`/ofertas/${offer.id}`}
      className="group flex min-h-[72px] items-center gap-4 px-5 py-3 transition-colors hover:bg-secondary/60 focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
    >
      <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-md bg-secondary text-chart-3 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icono className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-lg font-semibold leading-snug group-hover:underline">{offer.title}</span>
        <span className="flex min-w-0 items-center gap-3 text-lg leading-snug text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1"><MapPin className="size-4 shrink-0" aria-hidden /><span className="truncate">{offer.location || "Lugar sin indicar"}</span></span>
          <span className="flex shrink-0 items-center gap-1"><Clock className="size-4" aria-hidden />{jornadaCorta(offer.schedule)}</span>
        </span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
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
        <section aria-labelledby="mas-ofertas" className="self-start overflow-hidden rounded-md border bg-card shadow-sm lg:mt-2">
          <header className="flex items-center justify-between gap-4 border-b-4 border-accent px-5 pb-3 pt-4">
            <h2 id="mas-ofertas" className="font-display text-xl font-extrabold">Más ofertas para ti</h2>
            <span className="rounded-full bg-secondary px-3 py-0.5 text-base font-semibold text-secondary-foreground">{rows.length} en Málaga</span>
          </header>
          <ul className="divide-y">
            {visibles.map((offer) => (
              <li key={offer.id}><FilaOferta offer={offer} /></li>
            ))}
          </ul>
          {resto.length > VISIBLES && (
            <button
              type="button"
              aria-expanded={todas}
              onClick={() => setTodas((v) => !v)}
              className="flex min-h-12 w-full items-center justify-center gap-2 border-t bg-card text-lg font-semibold text-primary hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring"
            >
              {todas ? "Ver menos" : `Ver las ${resto.length} ofertas`}
              <ChevronDown className={`size-5 transition-transform ${todas ? "rotate-180" : ""}`} aria-hidden />
            </button>
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
