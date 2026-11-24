<script setup lang="ts">
// Small source line at the bottom of a slide.
</script>

<template>
  <p class="fuente">Fuente: <slot /></p>
</template>

<style scoped>
.fuente { position: absolute; left: 3.5rem; right: 3.5rem; bottom: 1.1rem; font-size: 0.7rem; line-height: 1.3; color: var(--muted-foreground); margin: 0; }
</style>
