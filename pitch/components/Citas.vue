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
.voces { display: flex; flex-direction: column; gap: 0.9rem; }
.resto { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.1rem; }
.voz { display: flex; flex-direction: column; gap: 0.6rem; }
.burbuja {
  position: relative; padding: 0.8rem 1.1rem; background: #fff; color: var(--ac-noche);
  border: 0; border-left: 8px solid var(--ac-medio); border-radius: 6px; font-size: 1.05rem; line-height: 1.32;
  box-shadow: 6px 6px 0 var(--ac-menta);
}
.burbuja::after {
  content: ""; position: absolute; left: 1.6rem; bottom: -12px; width: 0; height: 0;
  border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #fff;
}
.principal .burbuja { background: var(--ac-bosque); color: var(--ac-fondo); border-left-color: var(--ac-menta); font-size: 1.22rem; line-height: 1.38; padding: 0.9rem 1.5rem; box-shadow: 8px 8px 0 var(--ac-menta); }
.principal .burbuja::after { border-top-color: var(--ac-bosque); }
.burbuja::before { content: "«"; } .burbuja > span:last-child::after { content: "»"; }
.resalte { font-weight: 800; color: var(--ac-bosque); background: linear-gradient(transparent 50%, var(--ac-menta) 50%); padding: 0 2px; }
.principal .resalte { color: var(--ac-menta); background: none; text-decoration: underline; text-decoration-color: color-mix(in oklch, var(--ac-menta) 60%, transparent); text-underline-offset: 5px; text-decoration-thickness: 3px; }
.quien { display: flex; align-items: center; gap: 0.45rem; padding-left: 1.2rem; font-family: var(--font-body-family); font-size: 0.85rem; font-weight: 700; color: var(--ac-medio); }
.voz.slidev-vclick-target { transition: opacity 350ms ease, transform 350ms ease; }
.voz.slidev-vclick-hidden { transform: translateY(18px); }
</style>
