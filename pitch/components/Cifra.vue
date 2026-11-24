<script setup lang="ts">
// A big figure with a one-line meaning under it.
defineProps<{ valor: string; tono?: "primary" | "alerta" }>()
</script>

<template>
  <div class="cifra">
    <div :class="['valor', tono ?? 'primary']">{{ valor }}</div>
    <div class="texto"><slot /></div>
  </div>
</template>

<style scoped>
.cifra { display: flex; flex-direction: column; gap: 0.35rem; }
.valor { font-family: var(--font-display-family); font-size: 3.1rem; font-weight: 700; line-height: 1; }
.valor.primary { color: var(--primary); }
.valor.alerta { color: var(--chart-4); }
.texto { font-size: 1.05rem; line-height: 1.35; color: var(--foreground); }
</style>
