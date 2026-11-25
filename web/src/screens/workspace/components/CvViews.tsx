import { Download, Maximize2 } from "lucide-react"
import { type ReactNode, useEffect, useMemo, useState } from "react"
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

/**
 * One CV on screen. Before the adaptation it shows the current CV with the call to action (`action`)
 * over its bottom edge; while `pending` a scan line sweeps it; once `adapted` arrives the same page turns
 * into the improved CV and the added sentences are highlighted one after another. "Antes / Después" compares.
 */
export function CvViews({ name, original, adapted, pending, action, afterActions }: {
  name: string
  original: string
  adapted?: Adaptation
  pending?: boolean
  action?: ReactNode
  /** Shown next to the download button once the CV is improved (e.g. "Preparar candidatura"). */
  afterActions?: ReactNode
}) {
  const before = useMemo(() => parseCv(original, adapted?.cv_text), [original, adapted])
  const after = useMemo(() => adapted && parseCv(adapted.cv_text, original, adapted.changes.map((change) => ({
    ...change,
    evidence: adapted.report.requirements.find((requirement) => requirement.found && requirement.text === change.requirement)?.evidence,
  }))), [adapted, original])
  const printDoc = useMemo(() => adapted && parseCv(adapted.cv_text), [adapted])
  const [view, setView] = useState<"antes" | "despues">("despues")
  useEffect(() => setView("despues"), [adapted])
  const showAfter = !!after && view === "despues"
  const doc = showAfter ? after : before
  const title = showAfter ? "CV mejorado" : after ? "CV anterior" : "Tu CV actual"

  return (
    <div className="min-w-0 space-y-2">
      <section aria-labelledby="cv-title" className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 id="cv-title" className={`font-display text-2xl font-extrabold ${showAfter ? "text-primary" : ""}`}>{title}</h2>
          {after && (
            <div role="group" aria-label="Comparar versiones" className="inline-flex rounded-md border bg-card p-0.5">
              {(["antes", "despues"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={`min-h-10 rounded-sm px-4 text-lg font-semibold focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {v === "antes" ? "Antes" : "Después"}
                </button>
              ))}
            </div>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-x-1">
            <ZoomCv doc={doc} title={title} comparison={after ? (showAfter ? "added" : "removed") : undefined} />
          </div>
        </div>
        <div className={`cv-stage relative ${pending ? "is-scanning" : ""}`}>
          <CvPage
            key={showAfter ? "after" : after ? "before-compare" : "before"}
            doc={doc}
            comparison={after ? (showAfter ? "added" : "removed") : undefined}
            className={`cv-preview ${showAfter ? "cv-reveal" : ""}`}
          />
          {pending && (
            <div className="cv-scan" aria-hidden="true"><span /></div>
          )}
        </div>
        {!after && action && (
          <div className="flex justify-end pt-1">{action}</div>
        )}
      </section>
      {adapted && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-lg">{showAfter ? <mark className="bg-accent text-accent-foreground underline">Añadido</mark> : <s>Quitado</s>}</p>
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
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Button variant="outline" className="min-h-12 bg-card text-lg font-semibold" onClick={() => download(name)}><Download aria-hidden /> Descargar PDF</Button>
            {afterActions}
          </div>
        </div>
      )}
      {printDoc && createPortal(<div className="cv-print-root"><CvPage doc={printDoc} /></div>, document.body)}
    </div>
  )
}
