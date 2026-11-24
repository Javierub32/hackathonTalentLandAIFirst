<script setup lang="ts">
// Eye-catching figure card: big number, a bar that fills to `pct` when the card is shown, one short line.
defineProps<{ valor: string; pct: number; lleno?: boolean; tono?: "primary" | "alerta" }>()
</script>

<template>
  <div :class="['dato', tono ?? 'primary']" :style="{ '--pct': `${pct}%` }">
    <div class="dato-valor">{{ valor }}</div>
    <div class="dato-barra" aria-hidden="true"><div :class="['dato-relleno', { lleno }]" /></div>
    <div class="dato-texto"><slot /></div>
  </div>
</template>

<style scoped>
.dato { --tono: var(--primary); background: var(--card); border: 1px solid var(--border); border-left: 8px solid var(--tono); border-radius: var(--radius); padding: 0.7rem 1.1rem 0.8rem; }
.dato.alerta { --tono: var(--chart-4); }
.dato-valor { font-family: var(--font-display-family); font-weight: 800; font-size: 2.8rem; line-height: 1; color: var(--tono); }
.dato-barra { height: 10px; border-radius: 5px; background: var(--muted); margin: 0.55rem 0 0.5rem; overflow: hidden; }
.dato-relleno { height: 100%; width: 0; background: var(--tono); border-radius: 5px; transition: width 900ms ease-out 150ms; }
.dato-relleno.lleno { width: var(--pct); }
.dato-texto { font-size: 1.05rem; line-height: 1.3; }
@media (prefers-reduced-motion: reduce) { .dato-relleno { transition: none; } }
</style>
