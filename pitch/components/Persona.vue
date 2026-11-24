<script setup lang="ts">
// One person icon (head + shoulders). Decorative: the slide text carries the figure.
defineProps<{ lit?: boolean; size?: number }>()
</script>

<template>
  <svg :width="size ?? 28" :height="size ?? 28" viewBox="0 0 24 24" aria-hidden="true" :class="['persona', { lit }]">
    <circle cx="12" cy="7" r="4.2" />
    <path d="M3.5 22c0-5 3.8-8.4 8.5-8.4s8.5 3.4 8.5 8.4z" />
  </svg>
</template>

<style scoped>
.persona { fill: var(--border); transition: fill var(--duration-slow) ease; }
.persona.lit { fill: var(--primary); }
</style>
