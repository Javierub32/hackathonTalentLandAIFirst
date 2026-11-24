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
    <span class="remate-cifra">{{ e.laUsarian }} de {{ n }}</span>
    <span>lo usarían</span>
  </div>
  <p class="n">Encuesta propia · {{ n }} personas de 45 años o más ({{ e.respuestas }} respuestas en total) · actualizado {{ e.actualizado }}</p>
</template>

<style scoped>
.datos { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; margin-top: 0.8rem; }
.dato-enc { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.1rem 1.2rem; font-size: 1.15rem; line-height: 1.35; display: flex; flex-direction: column; gap: 0.5rem; }
.cifra-enc { font-family: var(--font-display-family); font-weight: 800; font-size: 3rem; line-height: 1; color: var(--primary); }
.cifra-enc.alerta { color: var(--chart-4); }
.remate { margin: 1.6rem auto 0; width: fit-content; display: flex; align-items: baseline; gap: 1rem; padding: 0.9rem 2.2rem; border-radius: var(--radius); background: var(--primary); color: var(--primary-foreground); font-size: 1.8rem; font-family: var(--font-display-family); }
.remate-cifra { font-weight: 800; font-size: 3rem; }
.n { position: absolute; left: 3.5rem; bottom: 1.1rem; font-size: 0.7rem; color: var(--muted-foreground); margin: 0; }
</style>
