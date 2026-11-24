import { Link } from "react-router"
import { EmptyState } from "@/components/common/EmptyState"
import { QueryState } from "@/components/common/QueryState"
import { Button } from "@/components/ui/button"
import { type Offer, useOffers } from "../api"

function OfferCard({ offer }: { offer: Offer }) {
  const source = [offer.source, offer.code].filter(Boolean).join(" · ")

  return (
    <article className="flex h-full flex-col gap-4 rounded-lg border bg-card p-5 text-card-foreground">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold leading-tight">{offer.title}</h2>
        <p className="text-lg leading-relaxed">{offer.employer || "Empresa sin indicar"}</p>
      </div>

      {offer.hiring_aid && (
        <p className="rounded-md bg-secondary px-3 py-2 text-lg font-semibold leading-relaxed text-secondary-foreground">
          {offer.hiring_aid}
        </p>
      )}

      <dl className="space-y-2 text-lg leading-relaxed">
        <div>
          <dt className="font-semibold">Lugar</dt>
          <dd>{offer.location || "Sin indicar"}</dd>
        </div>
        <div>
          <dt className="font-semibold">Jornada</dt>
          <dd>{offer.schedule || "Sin indicar"}</dd>
        </div>
        <div>
          <dt className="font-semibold">Salario</dt>
          <dd>{offer.salary || "Sin indicar"}</dd>
        </div>
      </dl>

      <div className="mt-auto space-y-3">
        {source && <p className="text-lg leading-relaxed text-muted-foreground">{source}</p>}
        <Button asChild className="h-auto min-h-12 w-full whitespace-normal text-lg font-semibold sm:w-auto">
          <Link to={`/ofertas/${offer.id}`} aria-label={`Ver oferta: ${offer.title}`}>
            Ver oferta
          </Link>
        </Button>
      </div>
    </article>
  )
}

export default function OffersPage() {
  const offers = useOffers()
  const retry = (
    <Button variant="outline" className="min-h-12 text-lg font-semibold" onClick={() => void offers.refetch()}>
      Volver a cargar
    </Button>
  )

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Ofertas de empleo</h1>
      {offers.isPending ? (
        <p className="text-lg" role="status">Cargando ofertas…</p>
      ) : offers.isError ? (
        <div role="alert">
          <EmptyState title="No se pudieron cargar las ofertas" action={retry} />
        </div>
      ) : (
        <QueryState query={offers} empty={{ title: "No hay ofertas disponibles", action: retry }}>
          {(rows) => (
            <ul className="grid gap-4 md:grid-cols-2">
              {rows.map((offer) => (
                <li key={offer.id} className="min-w-0"><OfferCard offer={offer} /></li>
              ))}
            </ul>
          )}
        </QueryState>
      )}
    </section>
  )
}
