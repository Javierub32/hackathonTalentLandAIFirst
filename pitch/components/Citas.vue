<script setup lang="ts">
// Real, anonymous answers to "¿Qué es lo más difícil...?": the first one featured, the rest one per click.
// Data: pitch/data/encuesta.json (regenerate with pitch/scripts/encuesta.mjs).
import encuesta from "../data/encuesta.json"
const [principal, ...resto] = encuesta.citasElegidas
</script>

<template>
  <div class="citas">
    <blockquote class="principal">
      <span class="comilla" aria-hidden="true">“</span>
      {{ principal }}
    </blockquote>
    <div class="resto">
      <blockquote v-for="(c, i) in resto" :key="i" v-click>{{ c }}</blockquote>
    </div>
  </div>
</template>

<style scoped>
.citas { display: grid; grid-template-columns: 1.25fr 1fr; gap: 1.2rem; align-items: stretch; }
blockquote { margin: 0; font-family: var(--font-display-family); line-height: 1.35; }
.principal { position: relative; padding: 2.4rem 1.8rem 1.6rem; border-radius: var(--radius); background: var(--primary); color: var(--primary-foreground); font-size: 1.45rem; }
.comilla { position: absolute; top: -0.6rem; left: 1rem; font-size: 6rem; line-height: 1; opacity: 0.35; }
.resto { display: flex; flex-direction: column; gap: 0.9rem; justify-content: center; }
.resto blockquote { padding: 0.9rem 1.1rem; border-left: 6px solid var(--chart-4); border-radius: var(--radius); background: var(--card); font-size: 1.3rem; box-shadow: 0 1px 0 var(--border); }
.resto blockquote::before { content: "«"; } .resto blockquote::after { content: "»"; }
</style>
