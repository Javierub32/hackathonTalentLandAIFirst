import { Download, Maximize2 } from "lucide-react"
import { type ReactNode, useMemo } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { components } from "@/lib/api/schema"
import { CvPage } from "./CvPage"
import { parseCv, type CvDoc } from "./cvDocument"
import "./cv-print.css"
import "./cv-preview.css"

type Adaptation = components["schemas"]["AdaptedCv"]

function download(name: string) {
  const title = document.title
  document.title = ["CV", name.trim(), "adaptado"].join(" ").replace(/\s+/g, "_")
  window.addEventListener("afterprint", () => { document.title = title }, { once: true })
  window.print()
}

function ZoomCv({ doc, title, comparison }: { doc: CvDoc; title: string; comparison?: "added" | "removed" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" aria-label={`Ampliar ${title.toLowerCase()}`}><Maximize2 aria-hidden /> Ampliar</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-auto sm:max-w-3xl" showCloseButton={false}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DialogTitle className="font-display text-2xl">{title}</DialogTitle>
          <DialogClose asChild><Button variant="outline">Cerrar</Button></DialogClose>
        </div>
        <DialogDescription className="sr-only">Currículum a tamaño de lectura.</DialogDescription>
        <CvPage doc={doc} comparison={comparison} className="aspect-auto rounded-none border-0 p-0 text-lg shadow-none sm:p-0" />
      </DialogContent>
    </Dialog>
  )
}

/** `placeholder` fills the second column until the adapted CV exists (e.g. the call to action). */
export function CvViews({ name, original, adapted, placeholder }: { name: string; original: string; adapted?: Adaptation; placeholder?: ReactNode }) {
  const before = useMemo(() => parseCv(original, adapted?.cv_text), [original, adapted])
  const after = useMemo(() => adapted && parseCv(adapted.cv_text, original, adapted.changes.map((change) => ({
    ...change,
    evidence: adapted.report.requirements.find((requirement) => requirement.found && requirement.text === change.requirement)?.evidence,
  }))), [adapted, original])
  const printDoc = useMemo(() => adapted && parseCv(adapted.cv_text), [adapted])

  return (
    <div className="min-w-0 space-y-1">
      <div className={adapted || placeholder ? "grid gap-4 md:grid-cols-2" : "max-w-xl"}>
        <section aria-labelledby="cv-before" className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-x-2">
            <h2 id="cv-before" className="font-display text-xl font-bold">CV actual</h2>
            <ZoomCv doc={before} title="CV actual" comparison={after ? "removed" : undefined} />
          </div>
          <CvPage doc={before} comparison={after ? "removed" : undefined} className="cv-preview" />
        </section>
        {!adapted && placeholder}
        {adapted && after && (
          <section aria-labelledby="cv-after" className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-x-2">
              <h2 id="cv-after" className="font-display text-xl font-bold text-primary">CV mejorado</h2>
              <div className="flex flex-wrap items-center gap-x-1">
                <ZoomCv doc={after} title="CV mejorado" comparison="added" />
                <Button variant="outline" onClick={() => download(name)}><Download aria-hidden /> Descargar PDF</Button>
              </div>
            </div>
            <CvPage doc={after} comparison="added" className="cv-preview" />
          </section>
        )}
      </div>
      {adapted && (
        <div className="flex flex-wrap items-center gap-x-4">
          <p className="text-lg"><s>Quitado</s> · <mark className="bg-accent text-accent-foreground underline">Añadido</mark></p>
          {adapted.changes.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="h-auto px-0 text-lg">Ver cambios y sus fuentes</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85dvh] overflow-auto sm:max-w-2xl" showCloseButton={false}>
                <DialogTitle className="font-display text-2xl">Cambios y sus fuentes</DialogTitle>
                <DialogDescription className="text-lg">Cada cambio se apoya en experiencia real de tu perfil.</DialogDescription>
                <ol className="list-decimal divide-y pl-6 text-lg">
                  {adapted.changes.map((change, index) => (
                    <li key={index} className="space-y-1 py-2">
                      <p className="font-semibold">{change.requirement}</p>
                      <p>{change.text}</p>
                      <p className="text-muted-foreground">Sale de {change.source}</p>
                    </li>
                  ))}
                </ol>
                <DialogClose asChild><Button variant="outline" className="justify-self-start">Cerrar</Button></DialogClose>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
      {printDoc && createPortal(<div className="cv-print-root"><CvPage doc={printDoc} /></div>, document.body)}
    </div>
  )
}
