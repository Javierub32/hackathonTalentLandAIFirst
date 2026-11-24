<script setup lang="ts">
// A rubber-stamp label (e.g. DESCARTADA) that lands with a small thump when `visible`.
defineProps<{ visible?: boolean; tono?: "alerta" | "primary" }>()
</script>

<template>
  <span :class="['sello', tono ?? 'alerta', { visible }]"><slot /></span>
</template>

<style scoped>
.sello {
  --c: var(--destructive);
  display: inline-block; padding: 0.15em 0.55em; border: 4px solid var(--c); border-radius: 8px; color: var(--c);
  font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; transform: rotate(-8deg) scale(1.6); opacity: 0;
  transition: transform 260ms cubic-bezier(0.3, 1.6, 0.6, 1), opacity 200ms;
}
.sello.primary { --c: var(--primary); }
.sello.visible { opacity: 1; transform: rotate(-8deg) scale(1); }
@media (prefers-reduced-motion: reduce) { .sello { transition: none; } }
</style>
