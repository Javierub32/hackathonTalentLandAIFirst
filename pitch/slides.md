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
  <div class="ficha-sello"><Sello :visible="$clicks >= 1">Sin respuesta</Sello></div>
</div>

<div v-click="1" class="ficha-frase-grande">Envía currículums. <span class="rojo">Nadie la llama.</span></div>

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

<div v-click="1" class="explica">
  <div class="explica-texto"><strong>Misma experiencia, distintas palabras.</strong> Pilar cumple todos los requisitos, pero como su CV no tiene las <strong>palabras clave</strong> que lee el filtro automático, queda fuera sin que nadie llegue a conocerla.</div>
  <Sello :visible="$clicks >= 1">Descartada</Sello>
</div>

<div v-click="2" class="dato-42">
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

# Todo está ahí… menos la preparación

<div class="evidencias">
  <div class="evi"><div class="evi-tit">Hay ofertas</div><div class="evi-num">78 %</div><div>de empresas no encuentra a quién contratar</div></div>
  <div class="evi"><div class="evi-tit">Hay ayudas</div><div class="evi-num">18.000 €</div><div>por contratar a una persona de +45 (Emplea-T)</div></div>
  <div class="evi"><div class="evi-tit">Hay quien paga</div><div class="evi-num">9,99 M€</div><div>del IMFE para personas en paro vulnerables</div></div>
  <div v-click class="evi falta"><div class="evi-tit">Lo que falta</div><div class="evi-num">Nadie</div><div>prepara a la persona <strong>para cada oferta</strong></div></div>
</div>

<Fuente>ManpowerGroup, Desajuste de Talento 2026 · Junta de Andalucía, Emplea-T 2026, Línea 1 (BOJA 2026/60) · El Español, Aquileo+ (abr. 2026) · EPALE (Empléate) · Valencia Plaza (Labora).</Fuente>

<!--
La investigación nos dice tres cosas: las empresas no encuentran a quién contratar, la Junta paga por contratar a mayores de 45, y el Ayuntamiento ya tiene orientadores y fondos europeos para esto. Lo que falta es preparar a la persona para cada oferta.
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
class: slide-puente
---

<!-- 02:00 · Puente a la demo (R14.1) -->

<div class="puente">
  <p class="puente-ante">Ahora, en directo</p>
  <h1>Vamos a verlo</h1>
  <p class="puente-sub">Una oferta real. El CV de Pilar. Del <span class="mal-claro">38 %</span> al <strong>85 %</strong>.</p>
  <PasosDemo />
</div>

<!--
Pasamos a la aplicación. (Cambiar a la web en directo.)
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
