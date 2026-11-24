import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FormEvent } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api/client"
import type { components } from "@/lib/api/schema"

type OfferCreate = components["schemas"]["OfferCreate"]

const offerFields = [
  { name: "title", label: "Título de la oferta", required: true },
  { name: "employer", label: "Empresa", required: true },
  { name: "location", label: "Lugar", required: false },
  { name: "contract", label: "Contrato", required: false },
  { name: "schedule", label: "Jornada", required: false },
  { name: "salary", label: "Salario", required: false },
] as const

export default function PublishPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const publish = useMutation({
    mutationFn: async (offer: OfferCreate) => {
      const { data } = await api.POST("/api/offers", { body: offer })
      if (!data) throw new Error("No se pudo publicar la oferta.")
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["offers", "list"] })
      void navigate("/ofertas")
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (publish.isPending) return

    const form = new FormData(event.currentTarget)
    const read = (name: string) => String(form.get(name) ?? "").trim()

    publish.mutate({
      title: read("title"),
      employer: read("employer"),
      location: read("location"),
      contract: read("contract"),
      schedule: read("schedule"),
      salary: read("salary"),
      requirements: read("requirements").split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
      functions: [],
      source: "Publicada por la empresa",
    })
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Publicar oferta</h1>

      <aside className="rounded-lg border bg-accent p-4 text-lg leading-relaxed text-accent-foreground">
        <strong>Ayuda Emplea-T:</strong> hasta 18.000 € si contratas de forma indefinida a una persona
        mayor de 45 años en paro.
      </aside>

      <form className="space-y-6 rounded-lg border bg-card p-4 text-card-foreground sm:p-6" onSubmit={handleSubmit}>
        <p className="text-lg text-muted-foreground">El título y la empresa son obligatorios.</p>
        <fieldset disabled={publish.isPending} className="grid gap-4 sm:grid-cols-2">
          {offerFields.map(({ name, label, required }) => (
            <div key={name} className="min-w-0 space-y-2">
              <label htmlFor={name} className="block text-lg font-semibold">{label}</label>
              <Input
                id={name}
                name={name}
                required={required}
                pattern={required ? ".*\\S.*" : undefined}
                className="h-12 text-lg md:text-lg"
              />
            </div>
          ))}
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="requirements" className="block text-lg font-semibold">Requisitos</label>
            <p id="requirements-help" className="text-lg text-muted-foreground">Escribe un requisito por línea.</p>
            <textarea
              id="requirements"
              name="requirements"
              aria-describedby="requirements-help"
              rows={4}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-lg focus-visible:border-ring focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50"
            />
          </div>
        </fieldset>

        {publish.isError && (
          <p role="alert" className="text-lg text-destructive">
            No se pudo publicar la oferta. Vuelve a intentarlo.
          </p>
        )}
        <Button type="submit" disabled={publish.isPending} className="min-h-12 w-full text-lg font-semibold sm:w-auto">
          {publish.isPending ? "Publicando…" : "Publicar oferta"}
        </Button>
      </form>
    </section>
  )
}
