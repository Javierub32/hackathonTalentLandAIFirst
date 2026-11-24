import { Fragment } from "react"
import { cn } from "@/lib/utils"
import type { CvDoc, CvSpan } from "./cvDocument"

type Marks = {
  /** Index of the change being explained, or null. */
  active: number | null
  onSelect: (change: number) => void
}

function titleCase(text: string) {
  return text === text.toUpperCase() ? text.toLowerCase().replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase()) : text
}

function sectionTitle(text: string) {
  return text.charAt(0) + text.slice(1).toLowerCase()
}

function Span({ span, marks }: { span: CvSpan; marks?: Marks }) {
  if (marks && span.changes.length > 0) {
    const numbers = span.changes.map((c) => c + 1)
    const active = span.changes.includes(marks.active ?? -1)
    return (
      <button
        type="button"
        onClick={() => marks.onSelect(span.changes[0])}
        aria-label={`${span.text} (cambio ${numbers.join(" y ")}: toca para ver de dónde sale)`}
        className={cn(
          "inline rounded-sm bg-accent px-0.5 text-left text-accent-foreground underline decoration-primary decoration-2 underline-offset-4",
          active && "outline-2 outline-primary",
        )}
      >
        {span.text}
        <span aria-hidden className="ml-1 rounded-sm bg-primary px-1 align-super text-xs font-semibold text-primary-foreground no-underline">
          {numbers.join("·")}
        </span>
      </button>
    )
  }
  if (marks && span.isNew) {
    return <span className="underline decoration-muted-foreground decoration-dotted decoration-2 underline-offset-4">{span.text}</span>
  }
  return <>{span.text}</>
}

function Spans({ spans, marks }: { spans: CvSpan[]; marks?: Marks }) {
  return spans.map((span, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <Span span={span} marks={marks} />
    </Fragment>
  ))
}

/**
 * One CV as an A4 sheet. With `marks`, new sentences are underlined and the ones a change explains
 * become buttons with their change number (never colour alone). Without `marks` it is the clean copy.
 */
export function CvPage({ doc, marks, className }: { doc: CvDoc; marks?: Marks; className?: string }) {
  return (
    <article className={cn("cv-page aspect-[210/297] w-full space-y-5 rounded-sm border bg-card p-6 text-card-foreground shadow-sm sm:p-8", className)}>
      {doc.name && (
        <header className="space-y-1 border-b-2 border-primary pb-3">
          <p className="cv-name font-display text-3xl font-semibold">{titleCase(doc.name)}</p>
          {doc.headline.length > 0 && <p className="cv-body"><Spans spans={doc.headline} marks={marks} /></p>}
        </header>
      )}
      {doc.sections.map((section, s) => (
        <section key={s} className="space-y-2">
          {section.title && <p className="cv-section font-display text-xl font-semibold text-primary">{sectionTitle(section.title)}</p>}
          {section.lines.map((line, l) =>
            line.kind === "bullet" ? (
              <p key={l} className="cv-body relative pl-5 before:absolute before:left-1 before:content-['•']"><Spans spans={line.spans} marks={marks} /></p>
            ) : line.kind === "entry" ? (
              <p key={l} className="cv-body"><span className="font-semibold">{line.date}</span> · <Spans spans={line.spans} marks={marks} /></p>
            ) : (
              <p key={l} className="cv-body"><Spans spans={line.spans} marks={marks} /></p>
            ),
          )}
        </section>
      ))}
    </article>
  )
}
