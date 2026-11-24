# Uso de la IA en Empleate

Empleate ayuda a una persona de más de 45 años en paro de larga duración (nuestra persona de ejemplo es Pilar, 53 años, Málaga) a preparar cada oferta concreta: ver cómo la lee un filtro automático, adaptar su CV con su experiencia real y ensayar la entrevista. La IA prepara a la persona. No decide nada sobre ella.

## 1. Qué hace la IA y qué decide cada uno

| Función | Qué pasa | ¿Usa IA? | Quién decide |
| --- | --- | --- | --- |
| **Filtro** («así te lee el filtro») | Compara los requisitos de la oferta con las frases del CV, usando las palabras de la oferta y sus sinónimos. Para cada requisito muestra si aparece y la frase del CV que lo prueba (por ejemplo, 5 de 13 requisitos, 38 %). | **No.** Son reglas fijas que se pueden explicar una a una. La puntuación es nuestra, no la de un ATS real: decimos «más cerca del filtro», nunca «pasarás el filtro». | Nadie: solo informa. |
| **CV adaptado** | Un modelo de lenguaje reescribe el CV con las palabras de la oferta, usando **solo los hechos reales** de la persona (puestos, tareas, formación, idiomas, intereses). Cada cambio dice de qué hecho real sale. Después, el mismo filtro de reglas vuelve a revisar el CV (por ejemplo, 11 de 13, 85 %). | **Sí**, el modelo `openai/gpt-oss-120b`. | **La persona** acepta o no el CV. **La orientadora del IMFE** lo revisa antes de enviarlo. La candidatura pasa por `borrador → revisada → enviada`. |
| **Entrevista** | La IA hace 2 preguntas sobre esa oferta. La persona responde hablando. Su voz se pasa a texto y la IA devuelve consejos sencillos: qué ha estado bien, qué mejorar y un ejemplo. | **Sí**: `whisper-large-v3-turbo` pasa la voz a texto y el modelo de lenguaje escribe las preguntas y los consejos. La voz que lee las preguntas es la del navegador, que no envía nada fuera. | **La persona**: es un ensayo, sin nota ni aprobado o suspenso, y no se envía a ninguna empresa. |

Lo que la IA **nunca** hace:

- No elige candidatos ni los ordena, y no descarta a nadie. Está del lado de la persona que busca trabajo, no del de quien contrata.
- No envía nada sin que la persona y la orientadora lo vean.
- No analiza caras, gestos, tono de voz ni emociones. Solo lee **lo que la persona dice**, ya pasado a texto.

## 2. Nada inventado en el CV

Un CV con experiencia falsa perjudica a la persona en la entrevista. Por eso el CV adaptado tiene cuatro protecciones:

1. **Instrucción**: el modelo solo puede usar los hechos reales que le damos. No puede inventar empresas, años, cursos, niveles ni experiencia, y un interés no cuenta como experiencia (archivo `backend/llm/prompts/prep_adapt_cv.md`).
2. **Requisitos imposibles**: antes de llamar al modelo, las reglas marcan lo que la persona no tiene y una reescritura no puede crear (experiencia en perfumería, inglés alto, un título). Le pedimos al modelo que no lo mencione.
3. **Revisión automática**: el CV que devuelve el modelo pasa otra vez por el filtro de reglas. Si dice que cumple un requisito que no cumple, **lo rechazamos** y no se muestra (`backend/api/resources/prep/adapt.py`).
4. **Lo que falta, a la vista**: la pantalla dice claramente lo que no añadimos («No añadimos experiencia en perfumería porque no la tiene: prepáralo para la entrevista»).

Y al final siempre revisan la persona y la orientadora.

## 3. Modelo, proveedor, coste y límites

**Proveedor**: [Groq](https://groq.com/pricing), con su capa gratuita. No pide tarjeta y, al pasar el límite, devuelve un error en lugar de cobrar ([límites de Groq](https://console.groq.com/docs/rate-limits)). El evento no da créditos, así que el prototipo cuesta **0 €**.

| Uso | Modelo |
| --- | --- |
| CV adaptado, preguntas y consejos de entrevista | `openai/gpt-oss-120b`: modelo de pesos abiertos de OpenAI, servido por Groq |
| Voz a texto | `whisper-large-v3-turbo`, servido por Groq |
| Voz que lee las preguntas | La del navegador (no cuesta nada y no envía nada fuera) |

**Coste estimado por persona y oferta preparada**, con precios de pago de Groq por si se supera la capa gratuita (0,15 $ por millón de tokens de entrada, 0,60 $ por millón de salida y 0,04 $ por hora de audio; [Groq](https://groq.com/pricing), consultado el 24-11-2026):

| Paso | Uso aproximado | Coste |
| --- | --- | --- |
| CV adaptado | 1 llamada: ~2.000 tokens de entrada y ~1.500 de salida | ~0,001 $ |
| Entrevista (preguntas y 2 consejos) | 3 llamadas: ~3.000 tokens de entrada y ~1.000 de salida | ~0,001 $ |
| Voz a texto | ~3 minutos de respuestas | ~0,002 $ |
| **Total** | | **menos de 1 céntimo** |

Son cálculos aproximados, no medidos. Aunque una persona prepare 20 ofertas, la IA cuesta menos de 0,10 € al mes. En un piloto con el IMFE, lo que más cuesta es el alojamiento web y la formación de las orientadoras, no la IA.

**Límites**:

- **Capa gratuita**: el modelo admite unos 8.000 tokens por minuto. Para no pasar de ahí, los avisos al modelo son cortos y las respuestas que se repiten se guardan (caché) y no se vuelven a pedir. Con varias personas a la vez se pasaría a la tarifa de pago (ver arriba).
- **El filtro es una simulación**: cada empresa usa un ATS distinto y no podemos ver por dentro ninguno. Nuestro filtro es transparente y se acerca a cómo leen un CV. No garantiza que la persona pase.
- **El modelo se puede equivocar**: puede escribir una frase poco natural o dejarse un requisito. Por eso hay revisión automática y revisión humana.
- **Voz**: el ruido o un mal micrófono pueden dar un texto con errores. La persona puede volver a responder.
- **Español sencillo**: los textos están pensados para el español de España y para personas con pocas habilidades digitales.

## 4. Datos personales y RGPD

Las personas que usan Empleate son un colectivo vulnerable, así que tratamos sus datos con más cuidado.

| Pregunta | Respuesta |
| --- | --- |
| **Qué datos** | Solo los necesarios para un CV: nombre, ciudad, experiencia (puesto, años, tareas), formación, idiomas, habilidades e intereses. Además, las respuestas de la entrevista ya pasadas a texto. **No** pedimos DNI, fecha de nacimiento exacta, foto, salud, origen ni datos bancarios. |
| **Para qué** | Solo para preparar a la persona para la oferta que ella elige. Ni se venden ni se usan para hacer perfiles o publicidad. |
| **Con qué permiso** | Con su **consentimiento** explícito: la persona acepta antes de subir su CV y puede retirarlo cuando quiera (RGPD, art. 6.1.a y art. 7). La orientadora del IMFE se lo explica en persona. |
| **Dónde se guardan** | En la base de datos de la plataforma, que en el piloto estaría en un servidor en la UE. Groq recibe los textos solo para responder en ese momento. |
| **Cuánto tiempo** | Mientras la persona use el servicio. Si se da de baja, se borran su perfil, sus CV, sus respuestas y la caché. |
| **Sus derechos** | Puede ver, corregir, borrar y llevarse sus datos (RGPD, arts. 15 a 20), y pedir que una persona revise todo lo que haga la IA (art. 22: aquí nunca decide la IA sola). |
| **Mínimos datos** | Al modelo solo le enviamos lo que necesita para cada paso: los hechos del CV y la oferta, sin datos de contacto (RGPD, art. 5.1.c). |

**En el prototipo** solo usamos a Pilar, una persona **inventada**, y 11 ofertas públicas reales de la agencia de colocación del IMFE ([malagaempleo.portalemp.com](https://malagaempleo.portalemp.com/), consultado el 24-11-2026), con su código y su enlace. No guardamos datos de ninguna persona real.

**Antes de un piloto real** faltan tres pasos, que ya tenemos identificados:

1. Pantalla de consentimiento y opción de borrar la cuenta (aún no están en el prototipo).
2. Contrato de encargado del tratamiento con el proveedor de IA. Groq es una empresa de Estados Unidos y habría que revisar la transferencia internacional de datos. Si el IMFE lo pide, podemos cambiar de proveedor sin tocar la aplicación (variable `LLM_PROVIDER`) o usar un modelo propio en un servidor local.
3. Evaluación de impacto (RGPD, art. 35), porque son datos de un colectivo vulnerable.

## 5. Ley Europea de IA

- **Usar IA para seleccionar candidatos es de alto riesgo** ([AI Act, Anexo III, punto 4](https://ai-act-service-desk.ec.europa.eu/es/ai-act/annex-3)). Empleate no selecciona a nadie: ayuda a la persona que busca trabajo. Ninguna empresa la usa para filtrar candidatos.
- **Está prohibido reconocer emociones en el trabajo** ([AI Act, art. 5.1.f](https://artificialintelligenceact.eu/es/article/5/)). Empleate no analiza caras, gestos, tono de voz ni emociones. La entrevista solo trabaja con el texto de la respuesta.
- **Transparencia**: la persona siempre sabe qué parte hace la IA, y el filtro explica cada resultado con la frase del CV que lo prueba.

Aun así, el problema existe: el 90 % de las personas en paro de más de 50 años cree que su CV no pasa el filtro por su edad ([Fundación Adecco, 2024](https://fundacionadecco.org/wp-content/uploads/2024/06/190624NDP-TUEDADESUNTESORO-.pdf)), y las empresas usan cada vez más estos sistemas ([ManpowerGroup, vía Que.es](https://www.que.es/2026/08/14/como-hacer-cv-para-ia/)). Empleate enseña a la persona cómo la leen estos filtros, para que no la dejen atrás.

## Fuentes

- Groq, precios: <https://groq.com/pricing> (consultado el 24-11-2026; los precios de `gpt-oss-120b` coinciden con [CostBench](https://www.costbench.com/software/llm-api-providers/groq/))
- Groq, límites de uso: <https://console.groq.com/docs/rate-limits>
- Groq, capa gratuita sin cobro: <https://community.groq.com/t/do-i-get-charged-for-anything-on-the-groq-free-plan/832>
- AI Act, Anexo III (sistemas de alto riesgo): <https://ai-act-service-desk.ec.europa.eu/es/ai-act/annex-3>
- AI Act, art. 5 (prácticas prohibidas): <https://artificialintelligenceact.eu/es/article/5/>
- RGPD (Reglamento (UE) 2016/679), arts. 5, 6, 7, 15-20, 22 y 35: <https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679>
- Fundación Adecco, informe «Tu edad es un tesoro» 2024: <https://fundacionadecco.org/wp-content/uploads/2024/06/190624NDP-TUEDADESUNTESORO-.pdf>
- ManpowerGroup, vía Que.es: <https://www.que.es/2026/08/14/como-hacer-cv-para-ia/>
- Ofertas reales: agencia de colocación del IMFE (Ayuntamiento de Málaga): <https://malagaempleo.portalemp.com/>
- Código: `backend/api/resources/prep/` (filtro y CV adaptado), `backend/llm/prompts/prep_adapt_cv.md` (instrucciones al modelo), `backend/llm/settings.py` (modelos)
