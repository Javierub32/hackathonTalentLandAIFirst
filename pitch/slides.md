---
theme: default
title: "Al curro · Tu experiencia no caduca"
fonts:
  provider: none
mdc: true
transition: fade
class: slide-marca
---

<MarcaPitch />

---
class: slide-portada
---

<!-- 00:00 · Persona (R1.1, R9.2). Guion: hackathon/05-pitch.md ## Demo -->

<div class="portada">
  <figure class="portada-foto">
    <img src="/pilar.jpg" alt="Pilar, nuestra persona de ejemplo" />
    <figcaption>Imagen ilustrativa</figcaption>
  </figure>
  <div class="portada-datos">
    <p class="antetitulo">Ficha</p>
    <h1>Pilar, 53 años</h1>
    <div class="chips">
      <div class="chip"><span class="chip-num">Málaga</span><span>donde vive</span></div>
      <div class="chip"><span class="chip-num">18 meses</span><span>en paro</span></div>
      <div class="chip"><span class="chip-num">20 años</span><span>en administración y comercio</span></div>
    </div>
    <div v-click="1" class="portada-frase">Envía currículums.<br><span class="rojo">Nadie la llama.</span></div>
  </div>
  <div class="portada-sello"><Sello :visible="$clicks >= 1">Sin respuesta</Sello></div>
</div>

<!--
Pilar tiene 53 años, 20 años de experiencia en administración y comercio, y lleva 18 meses enviando currículums. Nadie la llama.
-->

---

<!-- 00:20 · Cifras (R1.2, R8.1) -->

# Pilar no es la única

<div class="multitud">
  <div class="multitud-gente">
    <PersonGrid :highlight="57" :lit="$clicks >= 1" />
    <div class="leyenda">Cada figura, 1 de cada 100 personas en paro en Andalucía.</div>
  </div>
  <div class="multitud-cifras">
    <div v-click="1"><Dato valor="57 %" :pct="57" :lleno="$clicks >= 1">de las personas en paro en Andalucía tienen <strong>más de 45 años</strong>: 305.742</Dato></div>
    <div v-click="2"><Dato valor="55 %" :pct="55" :lleno="$clicks >= 2">de los mayores de 50 lleva <strong>más de un año</strong> buscando</Dato></div>
    <div v-click="3"><Dato valor="90 %" :pct="90" :lleno="$clicks >= 3" tono="alerta">cree que su CV <strong>ni llega a una persona</strong></Dato></div>
  </div>
</div>

<Fuente>Andalucía Informa / elDiario (jun. 2026, 305.742 de 536.523) · Fundación Adecco, «Tu edad es un tesoro» 2025 (55,4 %) y 2024 (90 %, 600 personas).</Fuente>

<!--
No es un caso aislado: en Andalucía, el 57% de las personas en paro tiene más de 45 años. Más de la mitad de los mayores de 50 busca más de un año. Y el 90% cree que su currículum ni siquiera llega a una persona.
-->

---

<!-- 00:45 · El filtro automático (R1.2) -->

# ¿Por qué no la llaman?

<FiltroCvs :paso="$clicks" />

<div v-click="2" class="explica">
  <div class="explica-texto">
    <div class="explica-tit">Misma experiencia, distintas palabras.</div>
    Pilar cumple todos los requisitos, pero como su CV no tiene las <span class="clave">palabras clave</span> que lee el filtro automático, queda fuera sin que nadie llegue a conocerla.
  </div>
  <Sello :visible="$clicks >= 2">Descartada</Sello>
</div>

<div v-click="3" class="dato-42">
  <span class="dato-42-num">42 %</span>
  <span>de las empresas ya valora <strong>filtrar currículums de forma automática</strong></span>
</div>

<Fuente>Ilustración. Dato: ManpowerGroup, Encuesta de Proyección de Empleo T3 2026 (vía Que.es, ago. 2026).</Fuente>

<!--
¿Por qué? Muchas empresas usan un filtro automático, llamado ATS, que lee el currículum antes que nadie y descarta el que no encaja con las palabras de la oferta. Y cada vez más entrevistas las hace una IA.
-->

---

<!-- 01:05 · Validación: voces (R8.2, R15.1) -->

<div class="cita-titulo">
<p class="antetitulo">En qué nos apoyamos · 1. Les hemos preguntado</p>

<h1>«¿Qué es lo más difícil de buscar trabajo con más de 45 años?»</h1>
</div>

<Citas />

<Fuente>Encuesta propia, respuestas anónimas de personas de 45 años o más, tal como las escribieron.</Fuente>

<!--
Hoy hemos preguntado a personas de más de 45 años qué es lo más difícil. Esto es lo que nos han dicho. (Leer una o dos, no todas.)
-->

---

<!-- 01:35 · Validación: investigación (R8.1, R9.1, R16.1) -->

<p class="antetitulo">En qué nos apoyamos · 3. Lo que dice la investigación</p>

# Todo está ahí… menos la preparación

<div class="evidencias">
  <div class="evi" :class="{ apagada: $clicks >= 1 }"><div class="evi-cab"><span class="evi-ok">✓</span> Hay ofertas</div><div class="evi-cuerpo"><div class="evi-num">78 %</div><div>de empresas <strong>no encuentra</strong> a quién contratar</div></div></div>
  <div class="evi" :class="{ apagada: $clicks >= 1 }"><div class="evi-cab"><span class="evi-ok">✓</span> Hay ayudas</div><div class="evi-cuerpo"><div class="evi-num">18.000 €</div><div>por contratar a una persona <strong>de más de 45</strong> (Emplea-T)</div></div></div>
  <div class="evi" :class="{ apagada: $clicks >= 1 }"><div class="evi-cab"><span class="evi-ok">✓</span> Hay quien paga</div><div class="evi-cuerpo"><div class="evi-num">9,99 M€</div><div>del IMFE para personas <strong>en paro vulnerables</strong></div></div></div>
  <div v-click class="evi falta"><div class="evi-cab"><span class="evi-ok">✗</span> Lo que falta</div><div class="evi-cuerpo"><div class="evi-num">Nadie</div><div>prepara a la persona <strong>para cada oferta</strong></div></div></div>
</div>

<Fuente>ManpowerGroup, Desajuste de Talento 2026 · Junta de Andalucía, Emplea-T 2026, Línea 1 (BOJA 2026/60) · El Español, Aquileo+ (abr. 2026) · EPALE (Empléate) · Valencia Plaza (Labora).</Fuente>

<!--
La investigación nos dice tres cosas: las empresas no encuentran a quién contratar, la Junta paga por contratar a mayores de 45, y el Ayuntamiento ya tiene orientadores y fondos europeos para esto. Lo que falta es preparar a la persona para cada oferta.
-->

---

<!-- Demo · Mejora del CV (R2.1, R2.2, R14.1) -->

# Pilar adapta su CV a la oferta

<figure class="demo-captura demo-cv">
  <img class="demo-cv-fija" src="/demo-cv.png" alt="CV mejorado de Pilar para una oferta de dependienta de perfumería, con 11 de los 13 requisitos detectados." />
  <img class="demo-cv-animada" src="/demo-cv.gif" alt="Con su CV ya abierto, Pilar pulsa Mejorar mi CV y ve cómo pasa del 38 % al 85 % de requisitos detectados." />
  <figcaption>La IA propone cambios a partir de la experiencia de Pilar. Ella revisa el antes y el después y decide qué usar.</figcaption>
</figure>

<!--
Con el CV abierto, Pilar pulsa «Mejorar mi CV». La versión adaptada hace visible su experiencia en atención al cliente para la oferta de perfumería.
-->

---

<!-- Demo · Entrevista (R2.1, R14.1) -->

# Pilar practica la entrevista

<figure class="demo-captura demo-entrevista">
  <img src="/demo-entrevista.png" alt="Pantalla inicial de la entrevista de Pilar para una oferta de perfumería, con la entrevistadora virtual y la opción de empezar con audio." />
  <figcaption>
    <p><strong>Lo que hizo bien</strong><br>Preguntó qué buscaba la clienta.</p>
    <p><strong>Qué puede mejorar</strong><br>Sugerir una familia de fragancias.</p>
  </figcaption>
</figure>

<!--
Para esa misma oferta, Pilar ensaya una pregunta sobre atención al cliente. Puede responder hablando o por escrito. Tras responder, recibe una sugerencia concreta que puede aplicar en la entrevista.
-->

---
class: slide-grafico-financiero
---

<!-- 04:30 · Ingresos y gastos -->

# Ingresos y gastos

<figure class="grafico-financiero">
  <img src="/ingresos-gastos.jpg" alt="Ingresos y gastos en euros durante tres años. Los gastos superan a los ingresos en el primer año, ambas cifras se acercan en el segundo y los ingresos superan a los gastos en el tercero." />
</figure>

---
class: slide-cierre
---

<!-- 04:45 · Petición y cierre (R6.2) -->

<div class="cierre-grid">
  <MarcaPitch cierre />
  <div class="cierre-foto"><img src="/pilar.jpg" alt="Pilar, nuestra persona de ejemplo" /></div>
</div>

<!--
Buscamos un piloto con el IMFE y vuestro apoyo. Al curro: que su experiencia vuelva a contar.
-->
