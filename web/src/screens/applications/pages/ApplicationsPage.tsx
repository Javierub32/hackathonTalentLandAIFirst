import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router"
import { EmptyState } from "@/components/common/EmptyState"
import { PageHeader } from "@/components/common/PageHeader"
import { QueryState } from "@/components/common/QueryState"
import { Button } from "@/components/ui/button"
import { applicationsKey, loadApplications, updateApplication, type Application } from "../api"

const statusLabels = { borrador: "Borrador", revisada: "Revisada", enviada: "Enviada" }
const actionClass = "min-h-12 w-full text-lg sm:w-auto"

function ApplicationCard({ application, reviewing }: { application: Application; reviewing: boolean }) {
  const queryClient = useQueryClient()
  const { id, offer_id: offerId, status, cv_text: cv, counsellor_name: name, counsellor_note: note } = application
  const counsellor = name || "Lucía Ortega (IMFE)"
  const update = useMutation({
    mutationFn: (body: Parameters<typeof updateApplication>[1]) => updateApplication(id, body),
    onSuccess: (saved) => {
      queryClient.setQueryData<Application[]>(applicationsKey, (rows) =>
        rows?.map((row) => row.id === saved.id ? saved : row),
      )
    },
  })

  return (
    <article className="min-w-0 space-y-5 rounded-xl border bg-card p-5 sm:p-7">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold">
          <Link className="text-primary underline underline-offset-4" to={`/ofertas/${offerId}`}>
            {offerId === 1 ? "Dependienta de perfumería" : `Oferta ${offerId}`}
          </Link>
        </h2>
        <p role="status" className="text-lg">Estado: <strong>{statusLabels[status]}</strong></p>
      </div>

      {!reviewing && status !== "borrador" && (
        <div className="space-y-2 rounded-lg bg-secondary p-4 text-lg leading-relaxed">
          <p className="font-semibold">Revisado por tu orientadora</p>
          <p>{counsellor}</p>
          {note && <p className="whitespace-pre-wrap wrap-anywhere">{note}</p>}
        </div>
      )}

      <details open={reviewing} className="rounded-lg border p-4">
        <summary className="min-h-8 cursor-pointer text-lg font-semibold">Currículum adaptado</summary>
        <p className="mt-3 whitespace-pre-wrap wrap-anywhere text-lg leading-relaxed">
          {cv || "Todavía no hay un currículum adaptado para esta candidatura."}
        </p>
      </details>

      {reviewing && status === "borrador" && (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault()
            if (update.isPending || !cv.trim()) return
            const value = new FormData(event.currentTarget).get("note")
            if (typeof value !== "string") return
            update.mutate({ status: "revisada", counsellor_name: counsellor, counsellor_note: value.trim() })
          }}
        >
          <label htmlFor={`note-${id}`} className="block text-lg font-semibold">Nota para Pilar</label>
          <textarea id={`note-${id}`} name="note" defaultValue={note} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2 text-lg" />
          <Button type="submit" disabled={update.isPending || !cv.trim()} className={actionClass}>
            {update.isPending ? "Guardando revisión…" : "Marcar como revisada"}
          </Button>
        </form>
      )}

      {reviewing && status !== "borrador" && note && (
        <p className="whitespace-pre-wrap wrap-anywhere text-lg leading-relaxed"><strong>Nota para Pilar:</strong> {note}</p>
      )}
      {!reviewing && status === "borrador" && (
        <p className="text-lg">Tu orientadora revisará el currículum antes de que puedas enviar la candidatura.</p>
      )}
      {!reviewing && status === "revisada" && (
        <Button className={actionClass} disabled={update.isPending} onClick={() => update.mutate({ status: "enviada" })}>
          {update.isPending ? "Enviando…" : "Enviar candidatura"}
        </Button>
      )}
      {!reviewing && status === "enviada" && <p className="text-lg">Tu candidatura se ha enviado.</p>}
      {update.isError && <p role="alert" className="text-lg text-destructive">{update.error.message}</p>}
    </article>
  )
}

export default function ApplicationsPage() {
  const [search] = useSearchParams()
  const reviewing = search.get("vista") === "orientadora"
  const query = useQuery({
    queryKey: applicationsKey,
    queryFn: ({ signal }) => loadApplications(signal),
  })

  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <PageHeader title={reviewing ? "Revisar candidaturas" : "Mis candidaturas"} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg">{reviewing ? "Lucía Ortega (IMFE) · Candidaturas de Pilar Romero" : "Pilar Romero"}</p>
        <Button asChild variant="outline" className={actionClass}>
          <Link to={reviewing ? "/candidaturas" : "/candidaturas?vista=orientadora"}>
            {reviewing ? "Volver a la vista de Pilar" : "Vista de orientadora"}
          </Link>
        </Button>
      </div>
      {query.isError ? (
        <EmptyState
          title="No se pudieron cargar las candidaturas"
          action={<Button className={actionClass} onClick={() => void query.refetch()}>Volver a intentar</Button>}
        />
      ) : (
        <QueryState
          query={query}
          empty={{
            title: "Todavía no hay candidaturas",
            action: <Button asChild className={actionClass}><Link to="/ofertas">Ver ofertas</Link></Button>,
          }}
        >
          {(applications) => applications.map((application) => (
            <ApplicationCard key={`${application.id}-${reviewing}`} application={application} reviewing={reviewing} />
          ))}
        </QueryState>
      )}
    </section>
  )
}
