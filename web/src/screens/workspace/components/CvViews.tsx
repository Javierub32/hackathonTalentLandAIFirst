import { Download, FileText } from "lucide-react"
import { useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CvPage } from "./CvPage"
import { parseCv, type CvChange } from "./cvDocument"
import "./cv-print.css"

const actionClass = "min-h-12 h-auto whitespace-normal text-lg font-semibold"

/** Simulated upload for the demo: the seeded CV shown as if it were her PDF. A real `upload` replaces this later. */
export function cvFileName(name: string) {
  return `CV_${name.trim().split(/\s+/).join("_")}.pdf`
}

/** Card «CV_….pdf · Subido» with a thumbnail of the first page and a button to open it full size. */
export function UploadedCv({ name, cvText }: { name: string; cvText: string }) {
  const [open, setOpen] = useState(false)
  const doc = useMemo(() => parseCv(cvText), [cvText])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-background p-4">
        <div aria-hidden className="h-[113px] w-[80px] shrink-0 overflow-hidden rounded-sm border bg-card">
          <div inert className="pointer-events-none w-[800px] origin-top-left scale-[0.1]">
            <CvPage doc={doc} className="rounded-none border-0 shadow-none" />
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="flex items-center gap-2 break-all font-semibold"><FileText aria-hidden className="size-5 shrink-0" />{cvFileName(name)}</p>
          <p className="text-muted-foreground">Subido · tu currículum de siempre</p>
        </div>
        <Button variant="outline" className={actionClass} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? "Cerrar el CV" : "Ver mi CV"}
        </Button>
      </div>
      {open && <CvPage doc={parseCv(cvText)} />}
    </div>
  )
}

/** The clean adapted CV, rendered outside the app root so the print stylesheet keeps only this page. */
function PrintCopy({ cvText }: { cvText: string }) {
  return createPortal(
    <div className="cv-print-root"><CvPage doc={parseCv(cvText)} /></div>,
    document.body,
  )
}

function download(name: string) {
  const title = document.title
  document.title = cvFileName(`${name} adaptado`).replace(/\.pdf$/, "")
  window.addEventListener("afterprint", () => { document.title = title }, { once: true })
  window.print()
}

type CompareProps = { name: string; original: string; adapted: string; changes: CvChange[] }

/** Before / after of the same A4 sheet: side by side on wide screens, a switch on phones. */
export function CvCompare({ name, original, adapted, changes }: CompareProps) {
  const [side, setSide] = useState<"antes" | "despues">("despues")
  const [active, setActive] = useState<number[]>([])
  const before = useMemo(() => parseCv(original), [original])
  const after = useMemo(() => parseCv(adapted, original, changes), [adapted, original, changes])
  const select = (indexes: number[]) => {
    setActive(indexes)
    requestAnimationFrame(() => document.getElementById("cv-explained")?.scrollIntoView({ behavior: "smooth", block: "nearest" }))
  }

  return (
    <div className="space-y-5">
      <div role="group" aria-label="Qué currículum ver" className="grid grid-cols-2 gap-2 lg:hidden">
        {(["antes", "despues"] as const).map((value) => (
          <Button
            key={value}
            variant={side === value ? "secondary" : "outline"}
            aria-pressed={side === value}
            className={cn(actionClass, side === value && "border-2 border-primary")}
            onClick={() => setSide(value)}
          >
            {value === "antes" ? "Antes" : "Después"}
          </Button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className={cn("space-y-2", side !== "antes" && "hidden lg:block")}>
          <h3 className="font-semibold">Antes · {cvFileName(name)}</h3>
          <CvPage doc={before} />
        </div>
        <div className={cn("space-y-2", side !== "despues" && "hidden lg:block")}>
          <h3 className="font-semibold">Después · adaptado a esta oferta</h3>
          <CvPage doc={after} marks={{ active, onSelect: select }} />
        </div>
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <p className="font-semibold">Cómo leer los cambios</p>
        <p>
          <span className="rounded-sm bg-accent px-1 text-accent-foreground underline decoration-primary decoration-2 underline-offset-4">Subrayado con número</span>:
          cubre un requisito de la oferta. Tócalo para ver de dónde sale.
        </p>
        <p><span className="underline decoration-muted-foreground decoration-dotted decoration-2 underline-offset-4">Subrayado de puntos</span>: tu experiencia, dicha con otras palabras.</p>
      </div>

      <div id="cv-explained" aria-live="polite" className={cn(active.length > 0 && "space-y-3 rounded-lg border-2 border-primary bg-accent p-4 text-accent-foreground")}>
        {active.map((index) => (
          <div key={index}>
            <p className="font-semibold">Cambio {index + 1} · Cubre: {changes[index].requirement}</p>
            <p>Sale de: {changes[index].source}</p>
          </div>
        ))}
      </div>

      {changes.length > 0 && (
        <>
          <h3 className="font-display text-2xl font-semibold">Qué cambió y de dónde sale</h3>
          <ol className="space-y-3">
            {changes.map((change, index) => (
              <li
                key={index}
                id={`cv-change-${index}`}
                className={cn("flex gap-3 rounded-lg border p-4", active.includes(index) && "border-2 border-primary")}
              >
                <span aria-hidden className="h-fit rounded-sm bg-primary px-2 font-semibold text-primary-foreground">{index + 1}</span>
                <div>
                  <p className="font-semibold"><span className="sr-only">Cambio {index + 1}. </span>Cubre: {change.requirement}</p>
                  <p>{change.text}</p>
                  <p className="text-muted-foreground">Sale de: {change.source}</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      <Button variant="outline" className={actionClass} onClick={() => download(name)}>
        <Download aria-hidden /> Descargar PDF
      </Button>
      <PrintCopy cvText={adapted} />
    </div>
  )
}
