import { Check, ChevronRight, Plus } from "lucide-react"
import { type CSSProperties, useEffect, useState } from "react"
import "./keywords.css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { components } from "@/lib/api/schema"

type FilterReport = components["schemas"]["FilterReport"]
type Requirement = FilterReport["requirements"][number] & { label?: string }

/**
 * Groups the offer's requirements so many keywords never flood the panel. The Contract has no category,
 * so it is inferred from the wording; anything unmatched is a task of the job. Add a rule here to grow it.
 */
const GRUPOS: { name: string; test: (text: string) => boolean }[] = [
  { name: "Experiencia", test: (t) => /^experiencia|\bexperiencia (previa|en|de)\b/i.test(t) },
  { name: "Formación y conocimientos", test: (t) => /\b(eso|graduado|bachiller\w*|t[ií]tulo|titulaci[oó]n|formaci[oó]n|grado|fp|ciclo|carn[eé]t?|ingl[eé]s|franc[eé]s|alem[aá]n|idiomas?|certificad\w*|curso|conocimientos?)\b/i.test(t) },
  { name: "Competencias", test: (t) => /(comunicat|orientaci[oó]n|actitud|proactiv|responsab|equipo|iniciativa|empat|organiza|puntual|flexib|inter[eé]s|motiva|habilidad)/i.test(t) },
  { name: "Tareas del puesto", test: () => true },
]

function grupoDe(text: string) {
  return GRUPOS.find((g) => g.test(text))!.name
}

function shortLabel({ label, text }: Requirement) {
  if (label?.trim()) return label.trim()
  const words = text.replace(/^se valoran?:?\s+/i, "")
    .replace(/^experiencia previa en\s+/i, "Experiencia en ")
    .replace(/^(conocimientos e interés por(?: la| el)?|buenas)\s+/i, "")
    .replace(/[,;:].*$/, "").split(/\s+/)
  const short = words.slice(0, 3).join(" ").replace(/\s+(y|e|en|de|por|al|o|la|el)$/i, "")
  return short.charAt(0).toUpperCase() + short.slice(1)
}

/** Counts from `from` to `to` once (respects reduced motion). */
function useCountUp(to: number, from?: number) {
  const [value, setValue] = useState(from ?? to)
  useEffect(() => {
    if (from === undefined || from === to || matchMedia("(prefers-reduced-motion: reduce)").matches) { setValue(to); return }
    const start = performance.now(), duration = 1400
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration)
      setValue(Math.round(from + (to - from) * (1 - (1 - t) ** 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [to, from])
  return value
}

/**
 * Keywords the automatic filter looks for. With `previous` (the report before the adaptation),
 * the count climbs and the newly covered keywords flip to green one after another.
 */
export function RequirementSummary({ report, previous }: { report: FilterReport; previous?: FilterReport }) {
  const found = useCountUp(report.found, previous?.found)
  const percent = report.total ? Math.round((found / report.total) * 100) : 0
  let flipped = 0
  return (
    <section aria-labelledby="kw-title" className="space-y-3">
      <div className="flex min-h-11 flex-wrap items-center gap-x-4 gap-y-2">
        <h2 id="kw-title" className="font-display text-2xl font-extrabold">Palabras clave</h2>
        <Dialog>
          <DialogTrigger asChild><Button variant="link" className="ml-auto h-auto px-0 text-base">Revisar requisitos</Button></DialogTrigger>
          <DialogContent className="max-h-[85dvh] overflow-auto sm:max-w-2xl" showCloseButton={false}>
            <DialogTitle className="font-display text-2xl">Requisitos de la oferta</DialogTitle>
            <DialogDescription className="text-lg">El filtro automático (ATS) busca los requisitos de la oferta en tu CV.</DialogDescription>
            <ul className="divide-y text-lg">
              {report.requirements.map(({ text, found, evidence }, index) => (
                <li key={index} className="py-2">
                  <p className="font-semibold">{text}</p>
                  <p>{found ? "Encontrado" : "No encontrado"}{evidence && ` · ${evidence}`}</p>
                </li>
              ))}
            </ul>
            <DialogClose asChild><Button variant="outline" className="justify-self-start">Cerrar</Button></DialogClose>
          </DialogContent>
        </Dialog>
        <div className="basis-full space-y-2">
          <p className="flex items-baseline gap-2 leading-none" aria-label={`${report.found} de ${report.total} palabras clave, ${report.percent}%`}>
            <span className="font-display text-4xl font-extrabold tabular-nums text-primary">{found}</span>
            <span className="text-lg font-bold text-muted-foreground">de {report.total}</span>
            <span className="ml-auto text-xl font-extrabold tabular-nums text-primary">{percent}%</span>
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
            <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
      {report.requirements.length === 0 ? <p>La oferta no indica requisitos.</p> : (
        <ul aria-label="Palabras clave del CV por grupos" className="space-y-2">
          {GRUPOS.map(({ name }) => {
            const items = report.requirements
              .map((requirement, index) => ({ requirement, index }))
              .filter(({ requirement }) => grupoDe(requirement.text) === name)
            if (!items.length) return null
            const ok = items.filter(({ requirement }) => requirement.found).length
            const gained = previous ? items.filter(({ requirement, index }) => requirement.found && !previous.requirements[index]?.found).length : 0
            return (
              <li key={name} className="rounded-md border bg-card shadow-sm transition-shadow hover:shadow-md">
                <details className="group/kw">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-3 py-2 text-lg font-semibold hover:bg-secondary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-open/kw:rotate-90" aria-hidden />
                    <span className="flex-1">{name}</span>
                    {gained > 0 && (
                      <span className="keyword-gain rounded-full bg-accent px-2 text-base font-bold text-accent-foreground">+{gained}</span>
                    )}
                    <span className={`rounded-full px-2.5 text-base font-bold tabular-nums ${ok === items.length ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <span className="sr-only">Encontradas </span>{ok} de {items.length}
                    </span>
                  </summary>
                  <ul className="flex flex-wrap gap-1.5 px-3 pb-3 pt-1">
                    {items.map(({ requirement, index }) => {
                      const isNew = !!previous && requirement.found && !previous.requirements[index]?.found
                      return (
                        <li
                          key={index}
                          title={requirement.text}
                          style={isNew ? ({ "--k": flipped++ } as CSSProperties) : undefined}
                          className={`${requirement.found
                            ? "border-2 border-primary bg-primary text-primary-foreground"
                            : "border-2 border-dashed border-muted-foreground/50 bg-card text-muted-foreground"} inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-base font-semibold leading-6 ${isNew ? "keyword-new" : ""}`}
                        >
                          <span className="sr-only">{requirement.found ? "Encontrado: " : "Falta: "}</span>
                          {requirement.found ? <Check size={16} strokeWidth={3} aria-hidden /> : <Plus size={16} aria-hidden />}
                          {shortLabel(requirement)}
                        </li>
                      )
                    })}
                  </ul>
                </details>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
