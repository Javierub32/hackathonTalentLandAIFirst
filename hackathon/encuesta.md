---
status: draft
---

# Encuesta y contacto con organizaciones · Empleate

Validación R8 + R15. Objetivo: **≥10 respuestas válidas** (45+ y en paro, R15.1) antes del pitch y **1 conversación con una organización** (R15.2).

- Parte A: encuesta a personas (Google Forms). Se crea sola con el script `hackathon/encuesta-form.gs`.
- Parte B: contacto con organizaciones (último paso, si hay tiempo).
- Parte C: cómo convertir los resultados en la diapositiva del pitch.

## Parte A · Encuesta a personas

### Enlaces (creada 2026-11-24 13:28)

- Responder (para difundir): <https://docs.google.com/forms/d/e/1FAIpQLSd01nXl1iFrlbE8ysh786zmHGrkZRx2HKvqR618h1Hs-JgNZg/viewform>
- Editar (solo el equipo): <https://docs.google.com/forms/d/1pxGe-lBfnhPQfMkV38lZ4jtRBs-TXTeVdMu7dyT0Zys/edit>
- Respuestas (hoja): <https://docs.google.com/spreadsheets/d/1fp0MXxttFYGOtmi3vb4a9MWLKNOubKtmOszIARJqyTs/edit>

### Cómo crearla (2 minutos)

1. Abre <https://script.google.com> → **Nuevo proyecto**.
2. Borra lo que haya y pega el contenido de `hackathon/encuesta-form.gs`.
3. Guarda y ejecuta la función `crearEncuesta`. Acepta los permisos (es tu propia cuenta).
4. En **Registro de ejecución** aparecen 3 enlaces: el formulario para responder, el formulario para editar y la hoja de cálculo con las respuestas.
5. Pasa el enlace para responder.

Si prefieres hacerla a mano en Forms, las preguntas están abajo, en el mismo orden.

### ⚠ Sobre el chat de 42 Málaga

La mayoría de la gente de 42 no es el público objetivo (son estudiantes de programación). Las respuestas de menores de 45 no cuentan para R15.1. La encuesta las desvía a una página final que pide **reenviar el enlace a padres, familiares o conocidos de 45+ en paro**. El mensaje está escrito para eso:

> ¡Hola! Estamos en el Hackathon IA First de Talent Land y estamos validando una idea para ayudar a personas **de más de 45 años en paro** a encontrar trabajo. ¿Nos ayudáis con 3 minutos? Si no es vuestro caso, nos haría muchísima ilusión que se la pasarais a vuestros **padres, tíos o conocidos de 45+ que estén buscando trabajo**. Es anónima. 🙏 <enlace>

Versión para grupos de personas mayores (WhatsApp, asociaciones):

> Buenas, somos un equipo de Málaga y estamos preparando una herramienta gratuita para ayudar a personas de más de 45 años a encontrar trabajo. Si estás buscando empleo, ¿nos cuentas tu experiencia en 3 minutos? Es anónima y nos ayuda mucho. Gracias. <enlace>

### Preguntas

Título: **Buscar trabajo con más de 45 años**

Descripción: Somos un equipo del Hackathon IA First (Talent Land, Málaga). Queremos entender cómo es buscar trabajo con más de 45 años para crear una herramienta gratuita que ayude. Son 3 minutos. Es anónima: no pedimos nombre ni correo (solo al final, si tú quieres).

**Sección 1 · Antes de empezar**

1. *Consentimiento* (obligatoria). Tus respuestas se usarán solo de forma anónima y agregada para este proyecto del hackathon y se borrarán al terminar. ¿Aceptas participar? → Sí, acepto · No (fin)

**Sección 2 · Sobre ti**

2. ¿Qué edad tienes? (obligatoria) → Menos de 35 · 35-44 · 45-54 · 55-64 · 65 o más. *Menos de 45 → sección final.*
3. ¿Dónde vives? → Málaga capital · Provincia de Málaga · Otra provincia de Andalucía · Fuera de Andalucía

**Sección 3 · Tu situación**

4. ¿Cuál es tu situación laboral ahora? (obligatoria) → En paro desde hace menos de 1 año · En paro desde hace más de 1 año · Trabajando, pero buscando otro empleo · Trabajando y sin buscar · Jubilado/a. *Trabajando y sin buscar, o jubilado/a → sección final.*

**Sección 4 · Tu búsqueda de empleo**

5. ¿En qué has trabajado sobre todo? → Administración u oficina · Comercio o atención al cliente · Hostelería · Limpieza o cuidados · Industria, construcción o logística · Otra
6. ¿Dónde buscas ofertas? (varias) → InfoJobs u otros portales · LinkedIn · SEPE / Empléate · SAE / Andalucía Orienta · Ayuntamiento (IMFE) · ETT · Familia, amigos y conocidos · Grupos de WhatsApp o Facebook · Otra
7. En el último mes, ¿a cuántas ofertas te has apuntado? → Ninguna · 1-5 · 6-20 · Más de 20
8. ¿Cuántas de esas candidaturas te llamaron o respondieron? → Ninguna · 1 o 2 · 3 o más · No me apunté a ninguna
9. ¿Adaptas tu currículum a cada oferta? → Sí, siempre · A veces · No, envío siempre el mismo · No sabría cómo hacerlo
10. Muchas empresas usan un **filtro automático** (programa ATS) que lee el currículum antes que una persona y descarta el que no tiene las palabras de la oferta. ¿Lo sabías? → Sí, y sé cómo funciona · Había oído algo · No lo sabía
11. ¿Crees que tu edad te quita oportunidades al buscar trabajo? → escala 1 (nada) a 5 (muchísimo)
12. ¿Cómo preparas una entrevista de trabajo? (varias) → No la preparo · Por mi cuenta · Con familia o amigos · Con un orientador/a laboral · En cursos · Con vídeos o webs · Con ChatGPT u otra IA
13. ¿Has hecho alguna entrevista por vídeo grabado o con un programa/IA en lugar de una persona? → Sí · No · No lo sé
14. ¿Te manejas bien con el móvil y el ordenador para buscar trabajo? → escala 1 (me cuesta mucho) a 5 (sin problema)
15. ¿Te atiende ahora algún servicio de orientación laboral? (varias) → IMFE / T-Acompañamos (Ayuntamiento) · Andalucía Orienta / SAE · SEPE · Una fundación u ONG (Adecco, Cruz Roja…) · Ninguno · Otra

**Sección 5 · Nuestra idea**

Texto: Imagina una web **gratuita, ofrecida por tu Ayuntamiento**. Eliges una oferta de trabajo y te dice qué le falta a tu currículum para pasar el filtro, lo adapta a esa oferta **solo con tu experiencia real**, te deja **practicar la entrevista de ese puesto** con consejos sencillos y tu orientador/a lo revisa antes de enviarlo.

16. ¿La usarías? (obligatoria) → Sí, seguro · Probablemente sí · No lo sé · Probablemente no · No
17. ¿Qué te sería más útil? (elige hasta 2) → Adaptar mi currículum a cada oferta · Practicar la entrevista de esa oferta · Ver ofertas de empresas que buscan gente de +45 · Formación para el puesto · Que un orientador/a lo revise conmigo
18. ¿Qué es lo más difícil de buscar trabajo con más de 45 años? (abierta, opcional)

**Sección 6 · Para terminar (opcional)**

19. Si quieres probar la herramienta o hablar 10 minutos con nosotros, deja un correo o teléfono. Solo lo usaremos para eso y lo borraremos al acabar el hackathon. (opcional)

**Sección final (menores de 45 o no buscan empleo)**

Texto: ¡Gracias! Esta encuesta es para personas de 45 años o más que buscan trabajo. **¿Conoces a alguien así?** Reenvíale este mismo enlace: nos ayudas muchísimo.

20. ¿Conoces a alguien de 45+ que esté buscando trabajo? → Sí, se la reenvío · Sí, pero no creo que la conteste · No

### Qué valida cada pregunta

| Pregunta | Valida | Alimenta |
|---|---|---|
| 2, 4 | Filtro: respuesta válida = 45+ y busca empleo (R15.1) | N del pitch |
| 3, 5, 14 | Perfil concreto de USUARIOS (R9.2) | Canvas USUARIOS, persona |
| 6, 15 | Por dónde llegar a ellos | Canvas CANALES, ALIADOS |
| 7, 8 | Dolor: muchas candidaturas, pocas respuestas | Canvas PROBLEMAS 1 |
| 9, 10, 12, 13 | No adaptan el CV, no conocen el filtro, no preparan entrevistas | Canvas PROBLEMAS 1-2, Beat 01:05 |
| 11, 18 | Edadismo y lado emocional, citas reales | Canvas PROBLEMAS 3, citas del pitch |
| 16, 17 | Interés en la solución y qué parte importa más | Canvas PROPUESTA DE VALOR, prioridad del prototipo |
| 19 | Contactos para probar el prototipo (más evidencia) | R8 |

Datos personales (R13): sin nombre ni correo obligatorios; la edad va en tramos; el contacto es opcional y se borra al terminar.

## Parte B · Contacto con organizaciones (último paso)

R15.2 pide **1 conversación real** con una organización del tipo cliente (no los mentores), apuntando quién, cuándo y qué dijo. Orden recomendado, del más rápido al más lento:

1. **Mentores del hackathon** (hoy, en persona): pedirles una presentación, no contar su opinión como validación. "¿Conocéis a alguien en el IMFE, el SAE, Andalucía Orienta o una fundación de empleo con quien podamos hablar 10 minutos hoy o mañana por la mañana?"
2. **IMFE / T-Acompañamos** (Ayuntamiento de Málaga): buscar el teléfono o correo del servicio en malaga.eu. Llamar es más rápido que escribir.
3. **Entidades de Andalucía Orienta en Málaga**: el SAE publica el listado de unidades; muchas son asociaciones que contestan el teléfono.
4. **Fundaciones**: Fundación Adecco (programas para +45), Cámara de Comercio de Málaga (Talento 45+), Cruz Roja Empleo.

### Mensaje (correo o WhatsApp)

> Asunto: 10 minutos para validar una herramienta de empleo para mayores de 45 (Hackathon IA First, Málaga)
>
> Hola, somos el equipo Left Joiners del Hackathon IA First de Talent Land (Málaga, 24-25 de noviembre). Estamos diseñando una herramienta gratuita que ayuda a personas de más de 45 años en paro de larga duración a preparar cada candidatura: adapta su currículum a la oferta con su experiencia real, le enseña a pasar los filtros automáticos y le deja practicar la entrevista de ese puesto, siempre con su orientador/a revisando.
>
> Trabajáis con este colectivo y vuestra opinión nos ayudaría muchísimo. ¿Podríamos hablar 10 minutos por teléfono hoy o mañana antes de las 10:00?
>
> Gracias,
> <nombre> · <teléfono>

### Guion de la llamada (5 preguntas, 10 minutos)

1. ¿Cuántas personas de 45+ atendéis y cuántas son de larga duración?
2. ¿Qué es lo que más les cuesta: el currículum, las entrevistas, lo digital, la confianza?
3. ¿Cuánto tiempo puede dedicar un orientador a preparar a una persona para una oferta concreta?
4. Una herramienta así, que la persona usa sola y el orientador revisa, ¿os ayudaría? ¿Qué le faltaría?
5. ¿Quién decide comprar o probar algo así en vuestra organización y con qué fondos? ¿Haríais un piloto?

### Registro (para el zip)

| Quién (organización, cargo) | Cuándo | Canal | Qué dijo (frases literales) | ¿Piloto / siguiente paso? |
|---|---|---|---|---|
| | | | | |

## Parte C · Del resultado al pitch

- **N válido** = respuestas con edad 45+ **y** situación "en paro" o "buscando otro empleo". Contar a parte cuántas son de larga duración (>1 año).
- Diapositiva del Beat 01:05: "Hemos hablado con **N** personas de más de 45 en paro" + 2 porcentajes (p. ej. % que no adapta el CV [P9] y % que no conocía el filtro [P10]) + % que la usaría [P16] + 2 citas literales [P18] + organización consultada (Parte B).
- Exportar la hoja de respuestas (sin la columna de contacto) a `hackathon/sources/encuesta-resultados.csv` para el zip (R15.1).
- Rellenar los `<pendiente encuesta>` de `hackathon/canvas.md`.
