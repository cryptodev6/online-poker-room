# EL JUEGO DETRÁS DEL JUEGO — Versión cinematográfica V3

**Alcance:** mejora visual mobile-first. No se alteró el copy, los doce títulos del índice, los ejemplos didácticos, el prólogo, los llamados a la acción ni la lógica comercial.

## Sistema cinematográfico

- **Portada/hero:** se conserva el libro 3D, la fotografía de mesa privada y el texto original; movimiento ambiental lento en escritorio, estático en móvil.
- **Prólogo/Daniel:** se conservan todas las escenas y su interacción; la apertura y epílogo tienen nuevos ambientes más cinematográficos.
- **La mentalidad:** biblioteca nocturna y panel de interacción con profundidad / contraste controlado.
- **Seis dimensiones:** sala de póker con galería y contenidos editoriales.
- **Laboratorio:** arquitectura de vidrio y líneas de latón detrás de la simulación.
- **Revisión:** ambiente de estudio privado, imagen de luz lateral.
- **Bote perdido:** fotografía de mesa privada; cartas exactas siguen generadas en HTML.
- **Índice:** imagen arquitectónica, conservando íntegros sus acordeones.
- **Riesgo:** fotografía de silla vacía y panel central editorial.
- **Muestra:** libro abierto sobre superficie editorial con páginas claras y legibles.
- **Autor:** estudio privado con escritorio real, sin crear rostros ni retratos ficticios.
- **Oferta:** libro físico conceptual en ambiente editorial; precio y CTA sin cambios.
- **FAQ:** corredor oscuro iluminado.
- **Cierre:** conserva su fotografía final y composición original.

Tres bandas fotográficas cortas introducen un efecto de **capas superpuestas** en las transiciones, sin agregar contenido comercial ni retrasos artificiales.

## Mobile first

Fondos verticales específicos y degradados individuales (`cinema-v3.css`). El fondo de cada sección puede quedar visualmente adherido al viewport con `position: sticky`, mientras el texto se desplaza normalmente. Esto evita `background-attachment: fixed`, que suele ser inestable en Safari y Chrome móviles. El movimiento disminuye bajo `prefers-reduced-motion`. En ausencia de JS, los componentes originales siguen funcionando con sus fondos previos.

## Verificaciones

- Copy completo del HTML idéntico a la versión «Mentalidad» (30 171 caracteres extraídos).
- 12 títulos del índice y toda la prosa preservados.
- Las 11 secciones editoriales cuentan con fotos de fondo propias y el resto de secciones conserva imagen independiente.
- Pruebas de interacción de mentalidad, modelo EV, índice y river completadas en móvil de 390 px, sin errores JavaScript ni overflow horizontal.
- Validación de sintaxis de todos los JS y referencias de recursos locales.
- Capturas visuales para 390 px y 1440 px realizadas; pruebas de hardware real y WebKit/Safari pendientes antes de lanzamiento público.

## Publicación

Abrir `index.html` desde servidor HTTP estático. No es necesario compilar. El checkout sigue sin configurarse: la solicitud de US$27 continúa en WhatsApp, sin simular pagos completados.
