/**
 * Crea la encuesta de validación de Empleate en Google Forms
 * y una hoja de cálculo con las respuestas.
 * Uso: script.google.com → Nuevo proyecto → pegar → ejecutar crearEncuesta.
 * Las preguntas son las de hackathon/encuesta.md.
 */
function crearEncuesta() {
  const form = FormApp.create('Buscar trabajo con más de 45 años');
  form
    .setDescription(
      'Somos un equipo del Hackathon IA First (Talent Land, Málaga). Queremos entender cómo es ' +
      'buscar trabajo con más de 45 años para crear una herramienta gratuita que ayude. ' +
      'Son 3 minutos. Es anónima: no pedimos nombre, correo ni ningún dato personal.'
    )
    .setCollectEmail(false)
    .setProgressBar(true)
    .setShowLinkToRespondAgain(false)
    .setConfirmationMessage('¡Muchas gracias! Tu experiencia nos ayuda a hacer algo útil de verdad.');

  // Sección 1 · Consentimiento (las opciones con salto se ponen al final)
  const consentimiento = form.addMultipleChoiceItem()
    .setTitle('Tus respuestas se usarán solo de forma anónima y agregada para este proyecto del hackathon y se borrarán al terminar. ¿Aceptas participar?')
    .setRequired(true);

  // Sección 2 · Sobre ti
  form.addPageBreakItem().setTitle('Sobre ti');
  const edad = form.addMultipleChoiceItem().setTitle('¿Qué edad tienes?').setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('¿Dónde vives?')
    .setChoiceValues(['Málaga capital', 'Provincia de Málaga', 'Otra provincia de Andalucía', 'Fuera de Andalucía']);

  // Sección 3 · Situación
  form.addPageBreakItem().setTitle('Tu situación');
  const situacion = form.addMultipleChoiceItem()
    .setTitle('¿Cuál es tu situación laboral ahora?')
    .setRequired(true);

  // Sección 4 · Búsqueda
  const pagBusqueda = form.addPageBreakItem().setTitle('Tu búsqueda de empleo');
  form.addMultipleChoiceItem()
    .setTitle('¿En qué has trabajado sobre todo?')
    .setChoiceValues(['Administración u oficina', 'Comercio o atención al cliente', 'Hostelería',
      'Limpieza o cuidados', 'Industria, construcción o logística'])
    .showOtherOption(true);
  form.addCheckboxItem()
    .setTitle('¿Dónde buscas ofertas? (puedes marcar varias)')
    .setChoiceValues(['InfoJobs u otros portales', 'LinkedIn', 'SEPE / Empléate', 'SAE / Andalucía Orienta',
      'Ayuntamiento (IMFE)', 'ETT', 'Familia, amigos y conocidos', 'Grupos de WhatsApp o Facebook'])
    .showOtherOption(true);
  form.addMultipleChoiceItem()
    .setTitle('En el último mes, ¿a cuántas ofertas te has apuntado?')
    .setChoiceValues(['Ninguna', '1-5', '6-20', 'Más de 20']);
  form.addMultipleChoiceItem()
    .setTitle('¿Cuántas de esas candidaturas te llamaron o respondieron?')
    .setChoiceValues(['Ninguna', '1 o 2', '3 o más', 'No me apunté a ninguna']);
  form.addMultipleChoiceItem()
    .setTitle('¿Adaptas tu currículum a cada oferta?')
    .setChoiceValues(['Sí, siempre', 'A veces', 'No, envío siempre el mismo', 'No sabría cómo hacerlo']);
  form.addMultipleChoiceItem()
    .setTitle('Muchas empresas usan un filtro automático (programa ATS) que lee el currículum antes que una persona y descarta el que no tiene las palabras de la oferta. ¿Lo sabías?')
    .setChoiceValues(['Sí, y sé cómo funciona', 'Había oído algo', 'No lo sabía']);
  form.addScaleItem()
    .setTitle('¿Crees que tu edad te quita oportunidades al buscar trabajo?')
    .setBounds(1, 5)
    .setLabels('Nada', 'Muchísimo');
  form.addCheckboxItem()
    .setTitle('¿Cómo preparas una entrevista de trabajo? (puedes marcar varias)')
    .setChoiceValues(['No la preparo', 'Por mi cuenta', 'Con familia o amigos', 'Con un orientador/a laboral',
      'En cursos', 'Con vídeos o webs', 'Con ChatGPT u otra IA']);
  form.addMultipleChoiceItem()
    .setTitle('¿Has hecho alguna entrevista por vídeo grabado o con un programa/IA en lugar de una persona?')
    .setChoiceValues(['Sí', 'No', 'No lo sé']);
  form.addScaleItem()
    .setTitle('¿Te manejas bien con el móvil y el ordenador para buscar trabajo?')
    .setBounds(1, 5)
    .setLabels('Me cuesta mucho', 'Sin problema');
  form.addCheckboxItem()
    .setTitle('¿Te atiende ahora algún servicio de orientación laboral? (puedes marcar varias)')
    .setChoiceValues(['IMFE / T-Acompañamos (Ayuntamiento)', 'Andalucía Orienta / SAE', 'SEPE',
      'Una fundación u ONG (Adecco, Cruz Roja…)', 'Ninguno'])
    .showOtherOption(true);

  // Sección 5 · La idea
  form.addPageBreakItem()
    .setTitle('Nuestra idea')
    .setHelpText(
      'Imagina una web gratuita, ofrecida por tu Ayuntamiento. Eliges una oferta de trabajo y te dice qué le ' +
      'falta a tu currículum para pasar el filtro, lo adapta a esa oferta solo con tu experiencia real, te deja ' +
      'practicar la entrevista de ese puesto con consejos sencillos y tu orientador/a lo revisa antes de enviarlo.'
    );
  form.addMultipleChoiceItem()
    .setTitle('¿La usarías?')
    .setChoiceValues(['Sí, seguro', 'Probablemente sí', 'No lo sé', 'Probablemente no', 'No'])
    .setRequired(true);
  form.addCheckboxItem()
    .setTitle('¿Qué te sería más útil? (elige hasta 2)')
    .setChoiceValues(['Adaptar mi currículum a cada oferta', 'Practicar la entrevista de esa oferta',
      'Ver ofertas de empresas que buscan gente de +45', 'Formación para el puesto',
      'Que un orientador/a lo revise conmigo'])
    .setValidation(FormApp.createCheckboxValidation().requireSelectAtMost(2).build());
  form.addParagraphTextItem()
    .setTitle('¿Qué es lo más difícil de buscar trabajo con más de 45 años?')
    .setHelpText('Por favor, no escribas tu nombre ni datos que te identifiquen.');

  // Sección final · fuera del público objetivo; quien llega desde Nuestra idea envía directamente
  const pagFinal = form.addPageBreakItem()
    .setTitle('¡Gracias!')
    .setHelpText('Esta encuesta es para personas de 45 años o más que buscan trabajo. ¿Conoces a alguien así? ' +
      'Reenvíale este mismo enlace: nos ayudas muchísimo.')
    .setGoToPage(FormApp.PageNavigationType.SUBMIT);
  form.addMultipleChoiceItem()
    .setTitle('¿Conoces a alguien de 45+ que esté buscando trabajo?')
    .setChoiceValues(['Sí, se la reenvío', 'Sí, pero no creo que la conteste', 'No']);

  // Saltos según la respuesta
  consentimiento.setChoices([
    consentimiento.createChoice('Sí, acepto', FormApp.PageNavigationType.CONTINUE),
    consentimiento.createChoice('No', FormApp.PageNavigationType.SUBMIT),
  ]);
  edad.setChoices([
    edad.createChoice('Menos de 35', pagFinal),
    edad.createChoice('35-44', pagFinal),
    edad.createChoice('45-54', FormApp.PageNavigationType.CONTINUE),
    edad.createChoice('55-64', FormApp.PageNavigationType.CONTINUE),
    edad.createChoice('65 o más', FormApp.PageNavigationType.CONTINUE),
  ]);
  situacion.setChoices([
    situacion.createChoice('En paro desde hace menos de 1 año', pagBusqueda),
    situacion.createChoice('En paro desde hace más de 1 año', pagBusqueda),
    situacion.createChoice('Trabajando, pero buscando otro empleo', pagBusqueda),
    situacion.createChoice('Trabajando y sin buscar', pagFinal),
    situacion.createChoice('Jubilado/a', pagFinal),
  ]);

  // Hoja de respuestas
  const hoja = SpreadsheetApp.create('Respuestas · Buscar trabajo con más de 45 años');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, hoja.getId());

  Logger.log('Enlace para responder: ' + form.getPublishedUrl());
  Logger.log('Enlace para editar:    ' + form.getEditUrl());
  Logger.log('Hoja de respuestas:    ' + hoja.getUrl());
}
