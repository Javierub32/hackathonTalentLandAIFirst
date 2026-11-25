---
status: done
issue: 37
lane: web
owner: alraro
---

# Build #37 · Marco de la app con el estilo del cartel + inicio con ofertas

- [x] 1 Pick
- [x] 2 Read
- [x] 3 Implement
- [x] 4 Check
- [x] 5 Review requests
- [x] 6 Merge
- [ ] 7 Handoff

## Files owned

- `web/src/app/layouts/`
- `web/src/components/brand/`
- `web/src/screens/offers/` (salvo `fixtures.json`)

## Criterios de aceptación

- [x] `AppLayout` con cabecera fina y logo, sin barra lateral; el menú solo enseña «Ofertas».
- [x] Decoración de marca (bandas diagonales y triángulo de esquina, bosque y menta, `aria-hidden`, `pointer-events: none`) en todas las pantallas.
- [x] `Etiqueta` (antetítulo en flecha del cartel) reutilizable.
- [x] `/` muestra «Hola, Pilar» + una frase y las ofertas en un solo nivel; insignia Emplea-T donde aplica.
- [x] Sin scroll a 1366×768 con las ofertas de la demo; texto ≥ 18px, foco visible.

## Notas

- La oferta de perfumería no tiene `hiring_aid` en los datos; la insignia Emplea-T sale en las ofertas que sí lo tienen (no se inventa).

## Verificación

- Chrome sin cabecera a 1366×768 (modo live con la API): inicio, oferta 1 y entrevista caben sin scroll; a 390 px no hay desbordamiento horizontal.
- Decoración: `FondoMarca` en el marco (todas las pantallas); `Decoracion` es solo un triángulo de esquina pequeño dentro de las secciones, para no duplicar las bandas.
- `make check` pasa (los avisos de ruff son de antes y no bloquean).

## Ronda de revisión 1 (Alfonso)

- Fondo de la app en `muted` (salvia) para que las superficies blancas destaquen; tarjeta destacada con cabecera verde y sombra menta del cartel.
- Oferta: cabecera verde con bandas, condiciones con iconos en una superficie y panel «Prepárate para esta oferta» con pasos 01/02.
- CV: requisitos como chips (verde con ✓ = encontrado, borde discontinuo con + = falta), cifra grande, CTA en el hueco del CV mejorado; quitado «No lo inventamos».
- Entrevista: marco de videollamada verde con sombra menta; comentarios en panel blanco.
- Files owned ampliados a `web/src/screens/workspace/` y `web/src/screens/practice/` (issues de origen cerradas; comentado en #37).
- 1366×768 sin scroll en inicio, oferta, CV antes y después y entrevista.

## Ronda de revisión 2 (Alfonso)

- Paleta: fondo beige `#F0E8D9` y `secondary` `#D4E8D8` (Design Change #47).
- «Prepárate para esta oferta» sin numeración.
- CV único: «Tu CV actual» → al pulsar «Mejorar mi CV» una banda menta lo escanea y la página gira al CV mejorado; las frases añadidas se resaltan en orden como con rotulador. Conmutador «Antes / Después».
- Palabras clave: cifra que sube (5 → 11), barra de progreso, chips grandes; los nuevos pasan a verde uno tras otro. Todo respeta `prefers-reduced-motion`.
- 1366×768 sin scroll en CV antes y después.

## Ronda de revisión 3 (Alfonso)

- CV como protagonista: columna del CV más ancha (1,3:0,7), letra del CV más grande y sombra menta; panel de palabras clave más compacto.
- Quitada la frase «Destacamos tu experiencia real…»; el botón «Mejorar mi CV» queda solo, bajo el CV.

## Ronda de revisión 4 (Alfonso)

- Beige más claro `#F7F3EA` (Design Change #50).
- CV con más interlineado (1,6) y márgenes entre secciones.
- Fuera todas las menciones a la ayuda Emplea-T en la interfaz (insignias y nota).
- «Practicar la entrevista» en menta (el color de su hover); «Ver todas» blanco con borde verde; botones secundarios sobre blanco.
- Palabras clave agrupadas y plegables: Experiencia, Formación y conocimientos, Competencias, Tareas del puesto, con «N de M» y un «+N» animado tras mejorar el CV.

## Ronda de revisión 5 (Alfonso)

- «Más ofertas para ti»: panel blanco con cabecera y banda menta, icono por tipo de puesto, lugar y jornada con iconos, «Ver las N ofertas» integrado al pie.
- «Practicar la entrevista»: botón secundario blanco con borde verde bosque; el menta queda solo para el hover.

## Ronda de revisión 6 (Alfonso)

- Entrevista: botón «Hablar» legible (verde; rojo con micro parpadeando al grabar); respuesta en un panel blanco con micro, texto y «Ver mi comentario» en una fila; «Repetir pregunta» y «Activar cámara» agrupados a la derecha.
- Mejorar mi CV: columnas alineadas con títulos del mismo estilo; categorías de palabras clave como tarjetas flotantes; una sola fila de acciones bajo el CV.
- Botón «Volver» (antes «Volver a la oferta») en CV y entrevista.

## Ronda de revisión 7 (Alfonso)

- Más espacio entre el CV y sus botones; botones separados entre sí.
- Barra de palabras clave con la parte vacía en blanco.
