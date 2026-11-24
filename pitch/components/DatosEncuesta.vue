<script setup lang="ts">
// Survey figures (people aged 45+ only), from pitch/data/encuesta.json.
// Three facts at once, then one click for the punchline.
import e from "../data/encuesta.json"
const n = e.n45
</script>

<template>
  <div class="datos">
    <div class="dato-enc">
      <FilaPersonas :n="e.edadQuita.deAcuerdo" :de="n" tono="alerta" />
      <div class="cifra-enc alerta">{{ e.edadQuita.deAcuerdo }} de {{ n }}</div>
      <div>sienten que su <strong>edad</strong> les cierra puertas</div>
    </div>
    <div class="dato-enc">
      <FilaPersonas :n="e.noConocianFiltro" :de="n" />
      <div class="cifra-enc">{{ e.noConocianFiltro }} de {{ n }}</div>
      <div><strong>no sabían</strong> que existe el filtro automático</div>
    </div>
    <div class="dato-enc">
      <FilaPersonas :n="e.noAdaptaCv" :de="n" />
      <div class="cifra-enc">{{ e.noAdaptaCv }} de {{ n }}</div>
      <div><strong>no adaptan</strong> su CV a cada oferta</div>
    </div>
  </div>
  <div v-click class="remate">
    <FilaPersonas :n="e.laUsarian" :de="n" />
    <span class="remate-cifra">{{ e.laUsarian }} de {{ n }}</span>
    <span>lo usarían</span>
  </div>
  <p class="n">Encuesta propia · {{ n }} personas de 45 años o más ({{ e.respuestas }} respuestas en total) · actualizado {{ e.actualizado }}</p>
</template>

<style scoped>
.datos { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.3rem; margin-top: 0.6rem; }
.dato-enc { background: #fff; border-top: 10px solid var(--ac-medio); border-radius: 6px; padding: 1rem 1.2rem 1.1rem; font-size: 1.1rem; line-height: 1.35; display: flex; flex-direction: column; gap: 0.45rem; box-shadow: 6px 6px 0 var(--ac-menta); }
.dato-enc:first-child { border-top-color: var(--chart-4); }
.cifra-enc { font-weight: 900; font-size: 3.4rem; line-height: 1; color: var(--ac-bosque); letter-spacing: -0.02em; }
.cifra-enc.alerta { color: var(--chart-4); }
.remate { margin: 1.5rem auto 0; width: fit-content; display: flex; align-items: center; gap: 1.1rem; padding: 0.8rem 2rem; border-radius: 6px; background: var(--ac-bosque); color: var(--ac-fondo); font-size: 1.7rem; font-weight: 700; box-shadow: 8px 8px 0 var(--ac-menta); }
.remate :deep(.persona.lit) { fill: var(--ac-menta); }
.remate-cifra { font-weight: 900; font-size: 2.8rem; color: var(--ac-menta); }
.remate.slidev-vclick-target { transition: opacity 400ms ease, transform 450ms cubic-bezier(0.3, 1.5, 0.6, 1); }
.remate.slidev-vclick-hidden { transform: scale(0.85); }
.n { position: absolute; left: 3.5rem; bottom: 1.1rem; font-size: 0.7rem; color: var(--muted-foreground); margin: 0; }
</style>
