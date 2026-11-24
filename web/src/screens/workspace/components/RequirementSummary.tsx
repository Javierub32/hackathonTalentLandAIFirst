import { Check } from "lucide-react"
import { Etiqueta } from "@/components/brand/Etiqueta"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { components } from "@/lib/api/schema"

type FilterReport = components["schemas"]["FilterReport"]
type Requirement = FilterReport["requirements"][number] & { label?: string }

function shortLabel({ label, text }: Requirement) {
  if (label?.trim()) return label.trim()
  const words = text.replace(/^experiencia previa en\s+/i, "Experiencia en ")
    .replace(/^(conocimientos e interés por(?: la| el)?|buenas)\s+/i, "")
    .replace(/[,;:].*$/, "").split(/\s+/)
  const short = words.slice(0, 3).join(" ").replace(/\s+(y|e|en|de|por|al|o|la|el)$/i, "")
  return short.charAt(0).toUpperCase() + short.slice(1)
}

export function RequirementSummary({ report }: { report: FilterReport }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <h2><Etiqueta>Palabras clave</Etiqueta></h2>
        <p className="text-xl font-bold text-primary">{report.found} de {report.total} · {report.percent}%</p>
        <Dialog>
          <DialogTrigger asChild><Button variant="link" className="px-0 text-base">Ver requisitos</Button></DialogTrigger>
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
        <ul aria-label="Palabras clave del CV" className="flex flex-wrap gap-1.5">
          {report.requirements.map((requirement, index) => (
            <li key={index} title={requirement.text} className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-sm leading-5 font-semibold ${requirement.found ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
              <span className="sr-only">{requirement.found ? "Encontrado: " : "No encontrado: "}</span>
              {requirement.found ? <><Check size={16} aria-hidden />{shortLabel(requirement)}</> : <s>{shortLabel(requirement)}</s>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
