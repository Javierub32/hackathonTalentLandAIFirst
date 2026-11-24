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
    <div v-for="(p, i) in pasos" :key="i" :class="['paso-d', { wow: p.n }]">
      <div class="bola">{{ i + 1 }}</div>
      <div v-if="p.n" :class="['pct', { mal: p.mal }]">{{ p.n }}</div>
      <div class="txt">{{ p.t }}</div>
    </div>
  </div>
</template>

<style scoped>
.camino { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.9rem; }
.paso-d { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; padding: 1rem 1rem 1.1rem; background: var(--ac-medio); border-radius: 6px; min-height: 11rem; }
.paso-d:not(:last-child)::after { content: "›"; position: absolute; right: -0.85rem; top: 50%; transform: translateY(-50%); font-size: 2rem; font-weight: 800; color: var(--ac-menta); z-index: 2; }
.bola { width: 2.4rem; height: 2.4rem; display: grid; place-items: center; background: var(--ac-menta); color: var(--ac-noche); font-weight: 900; font-size: 1.1rem;
  clip-path: polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%); width: 3rem; }
.pct { font-weight: 900; font-size: 2.7rem; line-height: 1; color: var(--ac-bosque); }
.pct.mal { color: var(--destructive); }
.txt { font-size: 1.05rem; line-height: 1.3; color: var(--ac-fondo); font-weight: 600; }
.paso-d.wow { background: var(--ac-menta); box-shadow: 6px 6px 0 var(--ac-fondo); }
.paso-d.wow .bola { background: var(--ac-bosque); color: var(--ac-fondo); }
.paso-d.wow .txt { color: var(--ac-noche); }
</style>
