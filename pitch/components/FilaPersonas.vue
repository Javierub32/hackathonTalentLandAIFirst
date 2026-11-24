<script setup lang="ts">
// A row of `de` people with `n` lit: "n de de" made visible.
defineProps<{ n: number; de: number; tono?: "primary" | "alerta" }>()
</script>

<template>
  <div :class="['fila', tono ?? 'primary']" role="img" :aria-label="`${n} de ${de}`">
    <Persona v-for="i in de" :key="i" :size="30" :lit="i <= n" />
  </div>
</template>

<style scoped>
.fila { display: flex; gap: 2px; }
.fila.alerta :deep(.persona.lit) { fill: var(--chart-4); }
</style>
