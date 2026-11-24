---
theme: default
title: "Al curro · Tu experiencia, preparada para cada oferta"
fonts:
  provider: none
mdc: true
transition: fade
---

<!-- 00:00 · Persona (R1.1, R9.2). Guion: hackathon/05-pitch.md ## Demo -->

<div class="ficha">
  <div class="ficha-cab">Ficha</div>
  <div class="ficha-cuerpo">
    <Persona :size="96" lit />
    <div>
      <h1>Pilar, 53 años</h1>
      <ul class="ficha-datos">
        <li><strong>Málaga</strong></li>
        <li><strong>18 meses</strong> en paro</li>
        <li><strong>20 años</strong> en administración y comercio</li>
      </ul>
    </div>
  </div>
  <p class="ficha-frase" v-click>Envía currículums. Nadie la llama.</p>
</div>

<!--
Pilar tiene 53 años, 20 años de experiencia en administración y comercio, y lleva 18 meses enviando currículums. Nadie la llama.
-->

---

<!-- 00:20 · Cifras (R1.2, R8.1) -->

# Pilar no es la única

<div class="multitud">
  <div class="multitud-gente">
    <div v-if="$clicks < 1" class="una"><Persona :size="140" lit /></div>
    <PersonGrid v-else :highlight="57" :lit="$clicks >= 2" />
  </div>
  <div class="multitud-cifras">
    <div v-click="2"><Cifra valor="305.742">personas en paro en Andalucía tienen <strong>más de 45 años</strong>: el 57 %</Cifra></div>
    <div v-click="3"><Cifra valor="55 %">de los mayores de 50 lleva <strong>más de un año</strong> buscando</Cifra></div>
    <div v-click="4"><Cifra valor="90 %" tono="alerta">cree que su currículum <strong>ni llega a una persona</strong></Cifra></div>
  </div>
</div>

<div v-click="1" class="sr-cuenta">Cada figura, 1 de cada 100 personas en paro.</div>

<Fuente>Andalucía Informa / elDiario (jun. 2026, 305.742 de 536.523) · Fundación Adecco, «Tu edad es un tesoro» 2025 (55,4 %) y 2024 (90 %, 600 personas).</Fuente>

<!--
No es un caso aislado: en Andalucía, el 57% de las personas en paro tiene más de 45 años. Más de la mitad de los mayores de 50 busca más de un año. Y el 90% cree que su currículum ni siquiera llega a una persona.
-->

---

<!-- 00:45 · El filtro automático (R1.2) -->

# ¿Por qué no la llaman?

<div class="flujo">
  <div class="paso">
    <div class="caja">CV de Pilar</div>
    <small>20 años de experiencia, contados con sus palabras</small>
  </div>
  <div class="flecha">→</div>
  <div class="paso">
    <div class="caja filtro">Filtro automático<br><small>(ATS)</small></div>
    <small>Un programa busca las palabras exactas de la oferta</small>
  </div>
  <div class="flecha">→</div>
  <div class="paso">
    <div class="caja persona-decide" :class="{ tachada: $clicks >= 1 }">Persona que decide</div>
    <small v-click="1" class="descartado">✗ Descartado antes de que nadie lo lea</small>
  </div>
</div>

<div v-click="2" class="nota-grande">
  El <strong>42 %</strong> de las empresas ya valora filtrar currículums de forma automática. Y cada vez más entrevistas las hace una IA.
</div>

<Fuente>ManpowerGroup, Encuesta de Proyección de Empleo T3 2026 (vía Que.es, ago. 2026).</Fuente>

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

<!-- 01:20 · Validación: cifras de la encuesta (R8.2, R15.1) -->

<p class="antetitulo">En qué nos apoyamos · 2. Lo que dicen sus respuestas</p>

# Les pasa lo mismo que a Pilar

<DatosEncuesta />

<!--
Y los números lo confirman: casi todos creen que su edad les quita oportunidades, la mayoría no sabía que un programa lee su CV antes que nadie, y casi ninguno lo adapta a cada oferta. Todos dicen que lo usarían.
-->

---

<!-- 01:35 · Validación: investigación (R8.1, R9.1, R16.1) -->

<p class="antetitulo">En qué nos apoyamos · 3. Lo que dice la investigación</p>

# Hay ofertas, hay ayudas y hay quien paga

<div class="evidencias">
  <div v-click><Cifra valor="78 %">de las empresas españolas <strong>no encuentra</strong> a quién contratar</Cifra></div>
  <div v-click><Cifra valor="18.000 €">de ayuda <strong>Emplea-T</strong> (Junta) por contratar indefinida a una persona de más de 45</Cifra></div>
  <div v-click><Cifra valor="9,99 M€">del Ayuntamiento de Málaga (IMFE, Aquileo+, 85 % fondos europeos) para personas en paro vulnerables</Cifra></div>
  <div v-click><Cifra valor="29.000" tono="alerta">ofertas para mayores de 45 en Empléate (SEPE)… pero <strong>nadie prepara</strong> a la persona para cada una</Cifra></div>
</div>

<Fuente>ManpowerGroup, Desajuste de Talento 2026 · Junta de Andalucía, Emplea-T 2026, Línea 1 (BOJA 2026/60) · El Español, Aquileo+ (abr. 2026) · EPALE, Empléate.</Fuente>

<!--
Y la investigación nos dice tres cosas: las empresas no encuentran a quién contratar, la Junta paga por contratar a mayores de 45, y el Ayuntamiento ya tiene orientadores y fondos europeos para esto. Ofertas hay de sobra; lo que falta es preparar a la persona para cada una.
-->

---
layout: center
class: text-center
---

<!-- 01:50 · Solución (R2.2) -->

<h1 class="marca">Al curro</h1>

<p class="lema">Tu experiencia, preparada para cada oferta.</p>

<div class="reparto">
  <div class="lado ia">
    <div class="lado-tit">La IA prepara</div>
    <div>lee la oferta · adapta el CV con su experiencia real · ensaya la entrevista</div>
  </div>
  <div class="lado humano">
    <div class="lado-tit">Las personas deciden</div>
    <div>Pilar elige y envía · su orientadora del IMFE revisa</div>
  </div>
</div>

<!--
Por eso hemos creado Al curro: tu experiencia, preparada para cada oferta. La IA prepara; la persona y su orientadora deciden.
-->

---

<!-- 02:00 · Puente a la demo (R14.1) -->

# Vamos a verlo

<div class="pasos-demo">
  <div class="pd"><span class="num">1</span><div>Pilar <strong>elige una oferta</strong> real de Málaga</div></div>
  <div class="pd"><span class="num">2</span><div>Ve cómo la <strong>lee el filtro</strong>: <span class="mal">5 de 13 · 38 %</span></div></div>
  <div class="pd"><span class="num">3</span><div>La IA <strong>adapta su CV</strong>, sin inventar: <span class="bien">11 de 13 · 85 %</span></div></div>
  <div class="pd"><span class="num">4</span><div><strong>Practica la entrevista</strong> de ese puesto</div></div>
  <div class="pd"><span class="num">5</span><div>Su orientadora revisa y <strong>envía la candidatura</strong></div></div>
</div>

<!--
Pasamos a la aplicación. (Cambiar a la web en directo.)
-->

---

<!-- 03:50 · Alternativas (R16.1) -->

# Lo que ya existe

<table class="comparativa">
  <thead>
    <tr><th></th><th>Ofertas</th><th>CV adaptado a cada oferta</th><th>Entrevista de esa oferta</th><th>Pensado para 45+</th><th>Con orientador</th></tr>
  </thead>
  <tbody>
    <tr><th>Empléate (SEPE)</th><td class="si">✓ Sí</td><td class="no">✗ No</td><td class="no">✗ No</td><td class="si">✓ Sí</td><td class="no">✗ No</td></tr>
    <tr><th>Simuladores con IA<br><small>Toptrabajos, AIApply</small></th><td class="no">✗ No</td><td class="no">✗ No</td><td class="parte">~ Genérica, de pago</td><td class="no">✗ No</td><td class="no">✗ No</td></tr>
    <tr><th>Labora (Valencia)</th><td class="si">✓ Sí</td><td class="no">✗ No</td><td class="parte">~ Piloto, genérica</td><td class="no">✗ No</td><td class="si">✓ Sí</td></tr>
    <tr><th>Krisalidas, Senia</th><td class="si">✓ Sí</td><td class="no">✗ No</td><td class="no">✗ No</td><td class="si">✓ Sí</td><td class="no">✗ No</td></tr>
    <tr class="nuestra"><th>Al curro</th><td class="si">✓ Sí</td><td class="si">✓ Sí</td><td class="si">✓ Sí</td><td class="si">✓ Sí</td><td class="si">✓ Sí</td></tr>
  </tbody>
</table>

<Fuente>EPALE (Empléate) · Toptrabajos y AIApply (webs) · Valencia Plaza (piloto de Labora) · The Objective (Krisalidas) · Ecosistema Startup (Senia).</Fuente>

<!--
Hay portales de empleo y simuladores de entrevista, pero ninguno prepara a la persona para cada oferta, ni está hecho para mayores de 45.
-->

---

<!-- 04:05 · Cliente y modelo (R9.1, R3.2) -->

# Quién paga

<div class="modelo">
  <div class="pagador principal">
    <div class="quien">IMFE · Ayuntamiento de Málaga</div>
    <div>Licencia anual por orientador, con los fondos europeos que ya tiene para este colectivo. Cada orientador de T-Acompañamos prepara a más personas.</div>
  </div>
  <div class="pagador">
    <div class="quien">Empresas de Málaga</div>
    <div>Publicar es gratis. Pagan por destacar ofertas. Ven al momento la ayuda Emplea-T.</div>
  </div>
  <div class="pagador">
    <div class="quien">Después: Andalucía Orienta</div>
    <div>2,7 M€ asignados a Málaga para orientación laboral.</div>
  </div>
  <div class="pagador gratis">
    <div class="quien">Pilar no paga nada</div>
    <div>Coste de la IA: céntimos por persona.</div>
  </div>
</div>

<Fuente>IMFE, T-Acompañamos y Aquileo+ (El Español, abr. 2026) · BOJA 2026/72 (Andalucía Orienta, Málaga: 2.708.196 €).</Fuente>

<!--
Quién paga: el IMFE, el Instituto de Empleo del Ayuntamiento de Málaga, que ya tiene orientadores y fondos europeos para este colectivo. Cada orientador atiende a más personas. Las empresas pagan por destacar ofertas. Coste de IA: céntimos por persona.
-->

---

<!-- 04:30 · Hoja de ruta (R10.1) -->

# Hoja de ruta

<div class="ruta">
  <div class="hito hecho"><div class="cuando">Nov. 2026</div><div class="que">Prototipo funcionando con ofertas reales de Málaga</div></div>
  <div class="hito"><div class="cuando">1.er semestre 2027</div><div class="que">Piloto con el IMFE: 100 personas y sus orientadores</div></div>
  <div class="hito"><div class="cuando">2.º semestre 2027</div><div class="que">Entidades de Andalucía Orienta en Málaga</div></div>
  <div class="hito"><div class="cuando">2028</div><div class="que">Formación para cada oferta (cursos Aquileo+) y entrevistas por teléfono, con voz</div></div>
</div>

<!--
Piloto con el IMFE en 2027 con 100 personas, después Andalucía Orienta, y formación y voz para entrevistas por teléfono.
-->

---
layout: center
class: text-center
---

<!-- 04:45 · Petición y cierre (R6.2) -->

<div class="ficha ficha-final">
  <div class="ficha-cuerpo">
    <Persona :size="72" lit />
    <div><h2>Pilar, 53 años · Málaga</h2></div>
  </div>
</div>

<p class="cierre">Que su experiencia vuelva a contar.</p>

<p class="peticion">Buscamos <strong>un piloto con el IMFE</strong> y vuestro apoyo.</p>

<p class="marca-pie">Al curro</p>

<!--
Buscamos un piloto con el IMFE y vuestro apoyo. Al curro: que su experiencia vuelva a contar.
-->

---
layout: center
class: text-center
---

<!-- Reserva: solo si falla la demo en directo -->

# Reserva

Si la demo en directo falla, pasamos al vídeo de respaldo.

<!--
Capturas de la aplicación: añadirlas en pitch/public/ cuando la app esté integrada (Polish) y enlazarlas aquí.
-->
