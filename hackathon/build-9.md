---
status: draft
---

# Build #9 · Diapositivas del pitch

- [x] 1 Pick
- [x] 2 Read
- [x] 3 Implement
- [x] 4 Check
- [ ] 5 Review requests
- [ ] 6 Merge
- [ ] 7 Handoff

## Acceptance criteria

- [x] Una diapositiva por Beat de diapositivas del guion, en su orden (12 + reserva; estructura acordada en el comentario de #9)
- [x] Cifras con su fuente en pequeño; la validación sale de `pitch/data/encuesta.json` y se recalcula con `node pitch/scripts/encuesta.mjs <respuestas>`
- [x] `grep -E '\[[A-Z]' pitch/slides.md` no encuentra placeholders y `make slides` la sirve
- [ ] Reasignar al presentador cuando se decida

## Files owned

`pitch/slides.md`, `pitch/style.css`, `pitch/public/`, `pitch/components/`, `pitch/data/`, `pitch/scripts/`, `hackathon/build-9.md`

## Encuesta

Antes del pitch: leer la hoja de respuestas, guardarla en un JSON o CSV fuera del repo y ejecutar el script. Solo se guardan agregados y frases anónimas; `citasElegidas` mantiene la selección y el orden.

## Next

Mañana: pulir detalles con Alfonso, actualizar la encuesta («actualiza la encuesta»: leer la hoja, `node pitch/scripts/encuesta.mjs <respuestas>`, revisar `citasElegidas` y `resaltar`), añadir capturas de la app a la diapo de reserva y comprobar que el 38 % → 85 % coincide con la demo. Luego `make check` y fusionar.
