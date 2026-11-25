import { Check, Plus } from "lucide-react"
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

export function RequirementSummary({ report, showFitHint }: { report: FilterReport; showFitHint: boolean }) {
  return (
    <div className="space-y-2 rounded-md border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <h2><Etiqueta>Palabras clave</Etiqueta></h2>
        <p className="leading-none">
          <span className="font-display text-4xl font-extrabold text-primary">{report.found}</span>
          <span className="text-xl font-bold text-muted-foreground"> de {report.total}</span>
          <span className="ml-2 inline-block rounded-sm bg-primary px-2 py-0.5 align-[0.35em] text-lg font-bold text-primary-foreground">{report.percent}%</span>
        </p>
        {showFitHint && report.found > 0 && report.found < report.total && (
          <p className="basis-full leading-snug text-muted-foreground">
            Tu CV recoge parte de lo que pide la oferta.
          </p>
        )}
        <Dialog>
          <DialogTrigger asChild><Button variant="link" className="h-auto px-0 text-lg">Revisar requisitos</Button></DialogTrigger>
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
      </div>
      {report.requirements.length === 0 ? <p>La oferta no indica requisitos.</p> : (
        <ul aria-label="Palabras clave del CV" className="flex flex-wrap gap-1">
          {report.requirements.map((requirement, index) => (
            <li
              key={index}
              title={requirement.text}
              className={requirement.found
                ? "inline-flex items-center gap-1 rounded-full bg-primary py-0.5 pl-2 pr-3 text-base font-semibold leading-5 text-primary-foreground"
                : "inline-flex items-center gap-1 rounded-full border-2 border-dashed border-muted-foreground/50 bg-card py-0 pl-2 pr-3 text-base font-semibold leading-5 text-muted-foreground"}
            >
              <span className="sr-only">{requirement.found ? "Encontrado: " : "Falta: "}</span>
              {requirement.found ? <Check size={16} strokeWidth={3} aria-hidden /> : <Plus size={16} aria-hidden />}
              {shortLabel(requirement)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
