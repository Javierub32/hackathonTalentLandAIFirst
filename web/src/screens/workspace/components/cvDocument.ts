/**
 * Turns a plain-text CV into a document model (header + sections) and marks, sentence by sentence,
 * what the adapted CV adds over the original and which `changes[]` entry explains it.
 * Pure functions: no React, easy to reuse for another layout or a real uploaded PDF later.
 */

/** `evidence`: the quote the filter found in the adapted CV for this requirement (from `report.requirements`). */
export type CvChange = { requirement: string; text: string; source: string; evidence?: string }

/** A sentence of the CV. `changes` holds indexes into `changes[]`; `isNew` is true when the original lacks it. */
export type CvSpan = { text: string; isNew: boolean; changes: number[] }
export type CvLine = { kind: "entry" | "bullet" | "text"; date?: string; spans: CvSpan[] }
export type CvSection = { title: string; lines: CvLine[] }
export type CvDoc = { name: string; headline: CvSpan[][]; sections: CvSection[]; structured: boolean }

const SECTION_TITLES = /^(PERFIL|EXPERIENCIA|EXPERIENCIA PROFESIONAL|ESTUDIOS|FORMACI[ÓO]N|IDIOMAS|HABILIDADES|COMPETENCIAS|OTROS DATOS)$/

/** Lowercase, no accents, no punctuation: two sentences match when their words match. */
export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ]+/g, " ")
    .trim()
}

function sentences(line: string) {
  return line.split(/(?<=[.!?…])\s+/).map((s) => s.trim()).filter(Boolean)
}

/** The adapted wording a change refers to: the filter's evidence, «X» pasa a «Y» → Y, or its text without a trailing ellipsis. */
function changeKeys(change: CvChange) {
  const moved = [...change.text.matchAll(/pasa a «([^»]+)»/g)].map((m) => m[1])
  const keys = moved.length > 0 ? moved : [change.text.replace(/[…]+$|\.\.\.$/, "")]
  if (change.evidence) keys.push(...change.evidence.split(/\s*(?:…|\.\.\.)\s*/))
  return keys.map(normalize).filter((k) => k.length >= 6)
}

/** Reworded sentences: a long key (4+ words of 4+ letters) matches when 80% of those words are in the sentence. */
function mostWordsIn(key: string, words: Set<string>) {
  const significant = key.split(" ").filter((w) => w.length >= 4)
  return significant.length >= 4 && significant.filter((w) => words.has(w)).length >= 0.8 * significant.length
}

type Marker = { original: Set<string>; keys: string[][] } | null

function toSpans(line: string, marker: Marker): CvSpan[] {
  return sentences(line).map((text) => {
    if (!marker) return { text, isNew: false, changes: [] }
    const norm = normalize(text)
    const words = new Set(norm.split(" "))
    const changes = marker.keys.flatMap((keys, index) =>
      keys.some((key) => norm.includes(key) || (norm.length >= 15 && key.includes(norm)) || mostWordsIn(key, words)) ? [index] : [],
    )
    return { text, isNew: norm.length > 0 && !marker.original.has(norm), changes }
  })
}

function toLine(raw: string, marker: Marker): CvLine {
  if (raw.startsWith("- ")) return { kind: "bullet", spans: toSpans(raw.slice(2), marker) }
  const entry = raw.match(/^(\d{4}\s*[-–]\s*(?:\d{4}|actualidad|hoy))\s*[·:]?\s*(.*)$/i)
  if (entry) return { kind: "entry", date: entry[1], spans: toSpans(entry[2], marker) }
  return { kind: "text", spans: toSpans(raw, marker) }
}

/**
 * Parses `text` into a CV document. Pass `original` (and `changes`) to mark what is new in `text`.
 * When no known section title is found, `structured` is false and every line is plain text.
 */
export function parseCv(text: string, original?: string, changes: CvChange[] = []): CvDoc {
  const marker: Marker = original === undefined ? null : {
    original: new Set(original.split("\n").flatMap((l) => sentences(l.replace(/^- /, ""))).map(normalize)),
    keys: changes.map(changeKeys),
  }
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
  const structured = lines.some((l) => SECTION_TITLES.test(l))
  if (!structured) {
    return { name: "", headline: [], sections: [{ title: "", lines: lines.map((l) => ({ kind: "text", spans: toSpans(l, marker) })) }], structured }
  }

  const [name = "", ...rest] = lines
  const firstTitle = rest.findIndex((l) => SECTION_TITLES.test(l))
  const headline = rest.slice(0, firstTitle).map((l) => toSpans(l, marker))
  const sections: CvSection[] = []
  for (const raw of rest.slice(firstTitle)) {
    if (SECTION_TITLES.test(raw)) sections.push({ title: raw, lines: [] })
    else sections[sections.length - 1].lines.push(toLine(raw, marker))
  }
  return { name, headline, sections, structured }
}
