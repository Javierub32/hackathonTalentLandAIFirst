<script setup lang="ts">
// The demo path as a horizontal journey; step 2→3 is the wow (38 % → 85 %).
const pasos = [
  { t: "Elige una oferta real de Málaga" },
  { t: "El filtro lee su CV", n: "38 %", mal: true },
  { t: "La IA lo adapta, sin inventar", n: "85 %" },
  { t: "Practica la entrevista de ese puesto" },
  { t: "Su orientadora revisa y envía" },
]
</script>

<template>
  <div class="camino">
    <div v-for="(p, i) in pasos" :key="i" class="paso-d">
      <div class="bola">{{ i + 1 }}</div>
      <div v-if="p.n" :class="['pct', { mal: p.mal }]">{{ p.n }}</div>
      <div class="txt">{{ p.t }}</div>
    </div>
  </div>
</template>

<style scoped>
.camino { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
.camino::before { content: ""; position: absolute; left: 10%; right: 10%; top: 1.6rem; height: 4px; background: color-mix(in oklch, var(--primary-foreground) 45%, transparent); }
.paso-d { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.5rem; }
.bola { width: 3.2rem; height: 3.2rem; border-radius: 50%; display: grid; place-items: center; background: var(--primary-foreground); color: var(--primary); font-weight: 800; font-size: 1.4rem; }
.pct { font-family: var(--font-display-family); font-weight: 800; font-size: 2.6rem; line-height: 1; color: var(--primary-foreground); }
.pct.mal { color: oklch(0.85 0.1 50); }
.txt { font-size: 1.1rem; line-height: 1.3; color: var(--primary-foreground); }
</style>
