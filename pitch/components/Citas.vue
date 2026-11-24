<script setup lang="ts">
// Real, anonymous answers to "¿Qué es lo más difícil...?", one per click.
// Data: pitch/data/encuesta.json (regenerate with pitch/scripts/encuesta.mjs).
import encuesta from "../data/encuesta.json"
const citas = encuesta.citasElegidas
</script>

<template>
  <div class="citas">
    <blockquote v-for="(c, i) in citas" :key="i" v-click :class="{ larga: c.length > 120 }">«{{ c }}»</blockquote>
  </div>
</template>

<style scoped>
.citas { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
blockquote {
  margin: 0; padding: 1rem 1.25rem; border-left: 5px solid var(--primary); border-radius: var(--radius);
  background: var(--card); color: var(--card-foreground); font-family: var(--font-display-family);
  font-size: 1.15rem; line-height: 1.4; box-shadow: 0 1px 0 var(--border);
}
blockquote.larga { grid-column: 1 / -1; font-size: 1.05rem; }
</style>
