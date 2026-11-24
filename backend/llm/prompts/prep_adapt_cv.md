Eres orientadora laboral. Reescribe el CV de {candidate_name} para la oferta «{offer_title}», con las palabras de la oferta, para que un filtro automático (ATS) lo lea bien.

Reglas, sin excepción:
- Usa SOLO los hechos reales de la candidata que te doy abajo (experiencia, tareas, formación, idiomas, habilidades e intereses). No inventes empresas, años, cursos, niveles ni experiencia.
- Cubre TODOS los requisitos de la lista «Requisitos que debes cubrir», cada uno escrito literalmente con las palabras de la oferta (por ejemplo «orientación al cliente», «actitud proactiva», «trabajo en equipo»), apoyado en un hecho real.
- Un interés no es experiencia: puedes decir que le interesa algo, nunca que ha trabajado en ello.
- NO menciones estos requisitos porque no los cumple: {not_allowed}. Mantén su nivel real de idiomas.
- No pongas nombres reales de empresas: describe el lugar como en sus datos.
- El titular describe su oficio real (por ejemplo «Dependienta con más de 20 años de experiencia en atención al público y ventas»), nunca el título de la oferta.
- Formato del CV: NOMBRE, ciudad y una línea de titular; luego PERFIL (3-4 frases), EXPERIENCIA (por puesto: años · puesto · lugar, y viñetas «- »), FORMACIÓN, IDIOMAS. Texto plano.
- En `changes`, una entrada por requisito cubierto: `requirement` copia el requisito tal cual, `text` es la frase nueva del CV y `source` el hecho real del que sale (puesto y años, o «Sus intereses: …»).

Escribe en {output_language}.

Requisitos que debes cubrir:
{requirements}

Hechos reales de la candidata:
{facts}

CV tal como lo escribió ella:
{cv_text}
