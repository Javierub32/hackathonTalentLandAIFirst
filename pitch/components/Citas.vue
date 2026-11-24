<script setup lang="ts">
// Real, anonymous answers to "¿Qué es lo más difícil...?" as speech bubbles.
// The first one is featured; the rest appear one per click. Phrases in `resaltar` are highlighted.
// Data: pitch/data/encuesta.json (regenerate with pitch/scripts/encuesta.mjs).
import encuesta from "../data/encuesta.json"

type Trozo = { t: string; marca: boolean }
function trocear(texto: string): Trozo[] {
  let trozos: Trozo[] = [{ t: texto, marca: false }]
  for (const frase of encuesta.resaltar) {
    trozos = trozos.flatMap((tr) => {
      if (tr.marca) return [tr]
      const i = tr.t.toLowerCase().indexOf(frase.toLowerCase())
      if (i < 0) return [tr]
      return [
        { t: tr.t.slice(0, i), marca: false },
        { t: tr.t.slice(i, i + frase.length), marca: true },
        { t: tr.t.slice(i + frase.length), marca: false },
      ].filter((x) => x.t)
    })
  }
  return trozos
}

const citas = encuesta.citasElegidas.map((texto) => ({
  trozos: trocear(texto),
  quien: encuesta.citas.find((c) => c.texto === texto)?.quien ?? "",
}))
const [principal, ...resto] = citas
</script>

<template>
  <div class="voces">
    <div class="voz principal">
      <div class="burbuja">
        <span v-for="(tr, k) in principal.trozos" :key="k" :class="{ resalte: tr.marca }">{{ tr.t }}</span>
      </div>
      <div class="quien"><Persona :size="26" lit /> {{ principal.quien }}</div>
    </div>
    <div class="resto">
      <div v-for="(c, i) in resto" :key="i" v-click class="voz">
        <div class="burbuja">
          <span v-for="(tr, k) in c.trozos" :key="k" :class="{ resalte: tr.marca }">{{ tr.t }}</span>
        </div>
        <div class="quien"><Persona :size="22" lit /> {{ c.quien }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.voces { display: flex; flex-direction: column; gap: 1rem; }
.resto { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.2rem; }
.voz { display: flex; flex-direction: column; gap: 0.55rem; }
.burbuja {
  position: relative; padding: 1rem 1.3rem; background: var(--card); color: var(--foreground);
  border: 2px solid var(--border); border-radius: var(--radius); font-size: 1.05rem; line-height: 1.35;
}
.burbuja::after {
  content: ""; position: absolute; left: 1.6rem; bottom: -11px; width: 18px; height: 18px;
  background: var(--card); border-right: 2px solid var(--border); border-bottom: 2px solid var(--border); transform: rotate(45deg);
}
.principal .burbuja { font-family: var(--font-display-family); font-size: 1.3rem; line-height: 1.4; padding: 1rem 1.5rem; border-color: var(--primary); border-width: 3px; }
.principal .burbuja::after { border-color: var(--primary); border-width: 3px; bottom: -12px; }
.burbuja::before { content: "«"; } .burbuja > span:last-child::after { content: "»"; }
.resalte { font-weight: 700; color: var(--foreground); background: linear-gradient(transparent 55%, color-mix(in oklch, var(--chart-4) 35%, transparent) 55%); }
.quien { display: flex; align-items: center; gap: 0.45rem; padding-left: 1.2rem; font-family: var(--font-body-family); font-size: 0.85rem; font-weight: 600; color: var(--foreground); }
</style>
