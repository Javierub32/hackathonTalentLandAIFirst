<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { computed } from 'vue'

// Importes aproximados en miles de euros, estimados a partir de public/ingresos-gastos.jpg.
const datos = [
  { anio: 1, ingresos: 130, gastos: 300 },
  { anio: 2, ingresos: 300, gastos: 290 },
  { anio: 3, ingresos: 450, gastos: 310 },
]

const series = [
  { clave: 'ingresos', nombre: 'Ingresos' },
  { clave: 'gastos', nombre: 'Gastos' },
] as const

const escala = [0, 100, 200, 300, 400, 500]
const maximo = 500
const descripcion = datos
  .map(({ anio, ingresos, gastos }) => `Año ${anio}: ingresos de ${ingresos} mil euros y gastos de ${gastos} mil euros.`)
  .join(' ')

const activa = useIsSlideActive()
const { $renderContext } = useSlideContext()
const animar = computed(() => activa.value && ['slide', 'presenter'].includes($renderContext.value))
</script>

<template>
  <figure class="grafico">
    <div role="img" :aria-label="`Importes aproximados. ${descripcion}`" :class="{ animado: animar }">
      <div class="leyenda" aria-hidden="true">
        <span v-for="serie in series" :key="serie.clave">
          <i :class="serie.clave" />
          {{ serie.nombre }}
        </span>
      </div>

      <div class="area" aria-hidden="true">
        <div v-for="valor in escala" :key="valor" class="guia" :style="{ bottom: `${valor / maximo * 100}%` }">
          <span>{{ valor }}</span>
        </div>

        <div class="grupos">
          <div v-for="(fila, i) in datos" :key="fila.anio" class="grupo">
            <div
              v-for="(serie, j) in series"
              :key="serie.clave"
              class="columna"
              :style="{ height: `${fila[serie.clave] / maximo * 100}%`, '--retraso': `${i * 140 + j * 45}ms` }"
            >
              <span class="importe">{{ fila[serie.clave] }}</span>
              <span class="barra" :class="serie.clave" />
            </div>
            <strong class="anio">Año {{ fila.anio }}</strong>
          </div>
        </div>
      </div>
    </div>
    <figcaption>Importes aproximados en miles de euros.</figcaption>
  </figure>
</template>

<style scoped>
.grafico {
  --gastos: #9abca5;
  max-width: 51rem;
  margin: 1rem auto 0;
  color: var(--ac-noche);
}

.leyenda,
.leyenda span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.leyenda {
  justify-content: center;
  gap: 1.6rem;
  margin-bottom: 1.4rem;
  font-weight: 700;
}

.leyenda i {
  width: 1rem;
  height: 0.65rem;
  border-radius: 2px;
}

.ingresos { background: var(--ac-bosque); }
.gastos { background: var(--gastos); border: 1px solid var(--ac-medio); }

.area {
  position: relative;
  height: 15.5rem;
  margin-left: 2.5rem;
  border-bottom: 1px solid var(--ac-bosque);
}

.guia {
  position: absolute;
  width: 100%;
  border-top: 1px solid var(--ac-linea);
}

.guia:first-child { border-color: var(--ac-bosque); }

.guia span {
  position: absolute;
  right: calc(100% + 0.6rem);
  transform: translateY(-50%);
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
}

.grupos {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grupo {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.45rem;
}

.columna { position: relative; width: 25%; }

.importe,
.anio {
  position: absolute;
  width: 100%;
  text-align: center;
}

.importe {
  bottom: calc(100% + 0.25rem);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.anio { top: calc(100% + 0.45rem); }

.barra {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 4px 4px 0 0;
  transform-origin: bottom;
}

figcaption {
  margin: 2.5rem 0 0 2.5rem;
  font-size: 0.9rem;
  color: var(--ac-medio);
}

@media screen and (prefers-reduced-motion: no-preference) {
  .animado .barra { animation: crecer 720ms cubic-bezier(0.18, 0.75, 0.28, 1) var(--retraso) both; }
  .animado .importe { animation: aparecer 260ms ease calc(var(--retraso) + 420ms) both; }
}

@keyframes crecer {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@keyframes aparecer {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
