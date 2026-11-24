<script setup lang="ts">
// Survey figures (people aged 45+ only), from pitch/data/encuesta.json.
import e from "../data/encuesta.json"
const n = e.n45
const top = e.masUtil[0]
</script>

<template>
  <div class="datos">
    <Cifra v-click :valor="`${e.edadQuita.deAcuerdo} de ${n}`" tono="alerta">creen que su edad les quita oportunidades</Cifra>
    <Cifra v-click :valor="`${e.noConocianFiltro} de ${n}`">no sabían que un filtro automático lee su CV</Cifra>
    <Cifra v-click :valor="`${e.noAdaptaCv} de ${n}`">no adaptan su CV a cada oferta ({{ e.noSabeAdaptarCv }} no sabrían cómo)</Cifra>
    <Cifra v-click :valor="`${e.noPreparaEntrevista} de ${n}`">no preparan la entrevista</Cifra>
    <Cifra v-click :valor="`${e.laUsarian} de ${n}`">usarían Al curro · lo más pedido: «{{ top.opcion.toLowerCase() }}»</Cifra>
  </div>
  <p class="n">Encuesta propia, {{ e.respuestas }} respuestas · {{ n }} personas de 45 años o más ({{ e.n45EnBusqueda }} en paro o buscando empleo) · actualizado {{ e.actualizado }}</p>
</template>

<style scoped>
.datos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem 2rem; margin-top: 1.2rem; }
.n { position: absolute; left: 3.5rem; bottom: 1.1rem; font-size: 0.7rem; color: var(--muted-foreground); margin: 0; }
</style>
