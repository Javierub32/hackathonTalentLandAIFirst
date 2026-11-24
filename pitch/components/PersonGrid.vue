<script setup lang="ts">
// 100 people; the first `highlight` light up one by one when `lit` turns true.
const props = withDefaults(defineProps<{ highlight: number; total?: number; lit?: boolean }>(), { total: 100 })
const people = Array.from({ length: props.total }, (_, i) => i)
</script>

<template>
  <div class="grid-people" role="img" :aria-label="`${highlight} de cada ${total} personas`">
    <Persona
      v-for="i in people"
      :key="i"
      :size="24"
      :lit="lit && i < highlight"
      :style="{ transitionDelay: lit ? `${i * 12}ms` : '0ms' }"
    />
  </div>
</template>

<style scoped>
.grid-people { display: grid; grid-template-columns: repeat(20, 24px); gap: 5px 3px; }
.grid-people :deep(.persona) { transition-delay: inherit; }
@media (prefers-reduced-motion: reduce) { .grid-people :deep(.persona) { transition: none; } }
</style>
