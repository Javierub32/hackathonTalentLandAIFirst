#!/usr/bin/env node
// Recalcula las cifras de la encuesta para las diapositivas.
//
// Uso: node pitch/scripts/encuesta.mjs <respuestas.json|respuestas.csv>
//   - .json: la salida de la hoja ({"values": [[cabecera...], [fila...], ...]})
//   - .csv: "Descargar > CSV" de la hoja de respuestas de Google Forms
// Escribe pitch/data/encuesta.json SOLO con agregados y frases anónimas:
// nunca guarda filas, contactos ni marcas temporales (la encuesta promete
// uso anónimo y agregado). Las preguntas se buscan por texto, no por columna.
//
// Las citas elegidas para la diapositiva se mantienen: el script conserva
// `citasElegidas` del JSON anterior; `citas` trae todas las disponibles.

import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "encuesta.json")

function parseCsv(text) {
  const rows = []
  let row = [], cell = "", quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++ }
      else if (c === '"') quoted = false
      else cell += c
    } else if (c === '"') quoted = true
    else if (c === ",") { row.push(cell); cell = "" }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++
      row.push(cell); rows.push(row); row = []; cell = ""
    } else cell += c
  }
  if (cell || row.length) { row.push(cell); rows.push(row) }
  return rows
}

const file = process.argv[2]
if (!file) {
  console.error("Uso: node pitch/scripts/encuesta.mjs <respuestas.json|respuestas.csv>")
  process.exit(1)
}
const raw = readFileSync(file, "utf8")
const [header, ...rows] = file.endsWith(".csv") ? parseCsv(raw) : JSON.parse(raw).values

const col = (needle) => {
  const i = header.findIndex((h) => h.toLowerCase().includes(needle.toLowerCase()))
  if (i < 0) throw new Error(`No encuentro la pregunta que contiene "${needle}"`)
  return i
}
const Q = {
  edad: col("qué edad"),
  situacion: col("situación laboral"),
  apuntado: col("te has apuntado"),
  respondieron: col("te llamaron"),
  adapta: col("adaptas tu currículum"),
  ats: col("lo sabías"),
  edadQuita: col("tu edad te quita"),
  entrevista: col("preparas una entrevista"),
  usaria: col("la usarías"),
  util: col("más útil"),
  dificil: col("lo más difícil"),
}

const get = (r, k) => (r[Q[k]] ?? "").trim()
const is45 = (r) => /^(45|55|65)/.test(get(r, "edad"))
const enBusqueda = (r) => /paro|buscando/i.test(get(r, "situacion"))
const count = (list, pred) => list.filter(pred).length

const p45 = rows.filter(is45)
const n = p45.length
const scores = p45.map((r) => Number(get(r, "edadQuita"))).filter((x) => x >= 1 && x <= 5)
const aplicaron = p45.filter((r) => !/ninguna/i.test(get(r, "apuntado")) && get(r, "apuntado"))

const util = {}
for (const r of p45) {
  for (const opt of get(r, "util").split(",").map((s) => s.trim()).filter(Boolean)) {
    util[opt] = (util[opt] ?? 0) + 1
  }
}

const citas = p45
  .map((r) => get(r, "dificil").replace(/\s+/g, " ").replace(/\s+\./g, ".").trim())
  .filter((t) => t.length >= 15)

const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {}
const citasElegidas = (prev.citasElegidas ?? []).filter((c) => citas.includes(c))

const out = {
  actualizado: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid", day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit" }),
  respuestas: rows.length,
  n45: n,
  n45EnBusqueda: count(p45, enBusqueda),
  edadQuita: {
    media: scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0,
    deAcuerdo: count(scores, (x) => x >= 4),
    n: scores.length,
  },
  noConocianFiltro: count(p45, (r) => /no lo sab/i.test(get(r, "ats"))),
  noAdaptaCv: count(p45, (r) => /^no/i.test(get(r, "adapta"))),
  noSabeAdaptarCv: count(p45, (r) => /no sabr/i.test(get(r, "adapta"))),
  noPreparaEntrevista: count(p45, (r) => /no la preparo/i.test(get(r, "entrevista"))),
  laUsarian: count(p45, (r) => /^(sí|probablemente sí)/i.test(get(r, "usaria"))),
  sinRespuesta: { ninguna: count(aplicaron, (r) => /ninguna/i.test(get(r, "respondieron"))), n: aplicaron.length },
  masUtil: Object.entries(util).sort((a, b) => b[1] - a[1]).map(([opcion, votos]) => ({ opcion, votos })),
  citasElegidas: citasElegidas.length ? citasElegidas : citas.slice(0, 4),
  citas,
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n")
console.log(`${OUT}: ${out.respuestas} respuestas, ${n} de 45+, ${out.n45EnBusqueda} en paro o buscando.`)
