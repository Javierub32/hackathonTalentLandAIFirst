import { Check, Plus } from "lucide-react"
import { type CSSProperties, useEffect, useState } from "react"
import "./keywords.css"
import { Etiqueta } from "@/components/brand/Etiqueta"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { components } from "@/lib/api/schema"

type FilterReport = components["schemas"]["FilterReport"]
type Requirement = FilterReport["requirements"][number] & { label?: string }

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
export function RequirementSummary({ report, previous, showFitHint }: { report: FilterReport; previous?: FilterReport; showFitHint: boolean }) {
  const found = useCountUp(report.found, previous?.found)
  const percent = report.total ? Math.round((found / report.total) * 100) : 0
  let flipped = 0
  return (
    <div className="space-y-3 rounded-md border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h2><Etiqueta>Palabras clave</Etiqueta></h2>
        <Dialog>
          <DialogTrigger asChild><Button variant="link" className="ml-auto h-auto px-0 text-lg">Revisar requisitos</Button></DialogTrigger>
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
            <span className="font-display text-5xl font-extrabold tabular-nums text-primary">{found}</span>
            <span className="text-xl font-bold text-muted-foreground">de {report.total}</span>
            <span className="ml-auto text-2xl font-extrabold tabular-nums text-primary">{percent}%</span>
          </p>
          <div className="h-3 overflow-hidden rounded-full bg-muted" aria-hidden>
            <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${percent}%` }} />
          </div>
        </div>
        {showFitHint && report.found > 0 && report.found < report.total && (
          <p className="basis-full leading-snug text-muted-foreground">
            Tu CV recoge parte de lo que pide la oferta.
          </p>
        )}
      </div>
      {report.requirements.length === 0 ? <p>La oferta no indica requisitos.</p> : (
        <ul aria-label="Palabras clave del CV" className="flex flex-wrap gap-2">
          {report.requirements.map((requirement, index) => {
            const isNew = !!previous && requirement.found && !previous.requirements[index]?.found
            return (
              <li
                key={index}
                title={requirement.text}
                style={isNew ? ({ "--k": flipped++ } as CSSProperties) : undefined}
                className={`${requirement.found
                  ? "border-2 border-primary bg-primary text-primary-foreground"
                  : "border-2 border-dashed border-muted-foreground/50 bg-card text-muted-foreground"} inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-lg font-semibold leading-6 ${isNew ? "keyword-new" : ""}`}
              >
                <span className="sr-only">{requirement.found ? "Encontrado: " : "Falta: "}</span>
                {requirement.found ? <Check size={18} strokeWidth={3} aria-hidden /> : <Plus size={18} aria-hidden />}
                {shortLabel(requirement)}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
