<script setup lang="ts">
// Illustration: many CVs enter the automatic filter, very few get through. Pilar's is one of the rejected.
// `paso` 0: pile waiting · 1: filter applied.
const props = defineProps<{ paso: number }>()
const TOTAL = 30
const PASAN = [4, 17, 26]
const PILAR = 12
const cvs = Array.from({ length: TOTAL }, (_, i) => ({ i, pasa: PASAN.includes(i), pilar: i === PILAR }))
</script>

<template>
  <div class="flujo-cv" :class="{ filtrado: paso >= 1 }">
    <div class="monton">
      <div class="etq">Currículums enviados</div>
      <div class="pila">
        <div
          v-for="c in cvs"
          :key="c.i"
          :class="['cv', { pasa: c.pasa, pilar: c.pilar }]"
          :style="{ transitionDelay: `${c.i * 12}ms` }"
        >
          <span class="lineas" aria-hidden="true" />
          <span v-if="c.pilar" class="nombre">Pilar</span>
          <span class="x" aria-hidden="true">✗</span>
        </div>
      </div>
    </div>

    <div class="embudo">
      <div class="flecha-larga">→</div>
      <div class="embudo-caja">Filtro automático<small>(ATS)</small></div>
      <div class="flecha-larga">→</div>
    </div>

    <div class="salida">
      <div class="etq">Llegan a una persona</div>
      <div class="pasan">
        <div v-for="k in PASAN.length" :key="k" class="cv grande" :style="{ transitionDelay: `${300 + k * 120}ms` }">
          <span class="lineas" aria-hidden="true" />
        </div>
      </div>
      <div class="resumen" :style="{ opacity: paso >= 1 ? 1 : 0 }"><strong>{{ PASAN.length }}</strong> de {{ TOTAL }}</div>
    </div>
  </div>
</template>

<style scoped>
.flujo-cv { display: grid; grid-template-columns: 1fr auto 250px; align-items: center; gap: 1.6rem; }
.etq { font-weight: 700; margin-bottom: 0.6rem; color: var(--muted-foreground); }
.pila { display: grid; grid-template-columns: repeat(10, 1fr); gap: 1.1rem 8px; }
.cv { position: relative; aspect-ratio: 3 / 4; background: var(--card); border: 2px solid var(--border); border-radius: 4px; transition: opacity 400ms ease, transform 400ms ease, border-color 400ms; }
.lineas { position: absolute; inset: 22% 18% auto 18%; height: 40%; background: repeating-linear-gradient(to bottom, var(--border) 0 3px, transparent 3px 8px); }
.cv.pilar { border-color: var(--primary); border-width: 3px; }
.nombre { position: absolute; left: 50%; bottom: -1.35rem; transform: translateX(-50%); font-size: 0.8rem; font-weight: 700; color: var(--primary); }
.x { position: absolute; inset: 0; display: grid; place-items: center; font-size: 1.6rem; font-weight: 800; color: var(--destructive); opacity: 0; transition: opacity 300ms; }
.filtrado .cv:not(.pasa):not(.grande) { opacity: 0.35; transform: rotate(-6deg) scale(0.9); }
.filtrado .cv.pilar { opacity: 1 !important; border-color: var(--destructive); }
.filtrado .cv.pilar .nombre { color: var(--destructive); }
.filtrado .cv:not(.pasa):not(.grande) .x { opacity: 1; }
.filtrado .cv.pasa { opacity: 0.15; }
.embudo { display: flex; align-items: center; gap: 0.6rem; }
.embudo-caja { display: flex; flex-direction: column; align-items: center; padding: 1.4rem 1.1rem; border: 3px solid var(--chart-3); border-radius: var(--radius); background: var(--card); font-weight: 700; font-size: 1.15rem; text-align: center; }
.embudo-caja small { font-weight: 500; }
.flecha-larga { font-size: 2.4rem; color: var(--muted-foreground); }
.pasan { display: flex; gap: 12px; min-height: 78px; }
.cv.grande { width: 58px; opacity: 0; transform: translateX(-30px); border-color: var(--primary); }
.filtrado .cv.grande { opacity: 1; transform: none; }
.resumen { margin-top: 0.8rem; font-size: 1.3rem; transition: opacity 300ms ease 600ms; }
.resumen strong { font-family: var(--font-display-family); font-size: 2.4rem; color: var(--primary); }
@media (prefers-reduced-motion: reduce) { .cv, .x { transition: none; } }
</style>
