import { Fragment } from "react"
import { cn } from "@/lib/utils"
import type { CvDoc, CvSpan } from "./cvDocument"

function titleCase(text: string) {
  return text === text.toUpperCase() ? text.toLowerCase().replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase()) : text
}

function sectionTitle(text: string) {
  return text.charAt(0) + text.slice(1).toLowerCase()
}

type Comparison = "added" | "removed"

const addedClass = "rounded-sm bg-accent text-accent-foreground underline decoration-primary"

function Span({ span, comparison }: { span: CvSpan; comparison?: Comparison }) {
  if (!span.isNew || !comparison) return <>{span.text}</>
  if (comparison === "removed") return <del className="text-muted-foreground">{span.text}</del>
  return (
    <ins className={addedClass}>
      {span.text}
      {span.changes.length > 0 && (
        <sup className="ml-0.5 font-bold">[{span.changes.map((index) => index + 1).join(", ")}]</sup>
      )}
    </ins>
  )
}

function Spans({ spans, comparison }: { spans: CvSpan[]; comparison?: Comparison }) {
  return spans.map((span, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <Span span={span} comparison={comparison} />
    </Fragment>
  ))
}

/**
 * Comparison previews mark changed sentences on each side. In the improved version,
 * numbered changes correspond to the sources shown in the comparison.
 */
export function CvPage({ doc, comparison, className }: { doc: CvDoc; comparison?: Comparison; className?: string }) {
  return (
    <article className={cn("cv-page aspect-[210/297] w-full space-y-5 rounded-sm border bg-card p-6 text-card-foreground shadow-sm sm:p-8", className)}>
      {doc.name && (
        <header className="space-y-1 border-b-2 border-primary pb-3">
          <p className="cv-name font-display text-3xl font-semibold">{titleCase(doc.name)}</p>
          {doc.headline.map((spans, i) => <p key={i} className="cv-body"><Spans spans={spans} comparison={comparison} /></p>)}
        </header>
      )}
      {doc.sections.map((section, s) => (
        <section key={s} className="space-y-2">
          {section.title && <p className="cv-section font-display text-xl font-semibold text-primary">{sectionTitle(section.title)}</p>}
          {section.lines.map((line, l) =>
            line.kind === "bullet" ? (
              <p key={l} className="cv-body relative pl-5 before:absolute before:left-1 before:content-['•']"><Spans spans={line.spans} comparison={comparison} /></p>
            ) : line.kind === "entry" ? (
              <p key={l} className="cv-body"><span className="font-semibold">{line.date}</span> · <Spans spans={line.spans} comparison={comparison} /></p>
            ) : (
              <p key={l} className="cv-body"><Spans spans={line.spans} comparison={comparison} /></p>
            ),
          )}
        </section>
      ))}
    </article>
  )
}
