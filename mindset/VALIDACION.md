# Validación de la entrega

## Comprobado

- Sintaxis de `app.js`, `data.js` y `config.js` con Node.
- Parseo de ambas hojas CSS con PostCSS.
- 229 aserciones en JSDOM con ejecución del JavaScript real, en configuraciones de movimiento normal y reducido.
- Cuatro partes y doce capítulos; apertura y cierre de todos los paneles.
- Menú: abrir, cerrar con Escape y cerrar al navegar.
- Tres estados de la escena; un solo control marcado como activo.
- River 5♠, actualización de etiquetas y vuelta al turn.
- Seis URL con el número confirmado `573007068986`, mensajes distintos correctamente codificados, nueva pestaña y `noopener`.
- Anclas internas, referencias `aria-controls`, identificadores únicos y presencia de los recursos de cada imagen y variante.
- En esta iteración: sintaxis de `app.js`, `data.js` y `config.js`; IDs, anclas y recursos locales presentes.
- Cuatro bloques y 16 encabezados del temario cotejados con el manuscrito; precio indicado de US$30 y ausencia de un desglose promocional ficticio.
- `git diff --check` sin errores.
- Enumeración independiente de los 44 rivers: 37 ganadores, 7 perdedores y ningún empate.
- Fragmento literal cotejado con el manuscrito.
- Inspección visual de las once imágenes generadas, reunidas en una hoja de contacto interna.
- Ningún documento fuente del libro fue editado.

## Límites

Las pruebas de interacción anteriores se realizaron en un DOM simulado y no cubren la nueva interacción del temario. No equivalen a una revisión visual ni a pruebas de layout en navegador. En esta iteración PostCSS no está disponible, así que los cambios nuevos de CSS no se validaron con su parser.

Chromium local no pudo iniciar por una restricción del entorno. El navegador remoto tampoco pudo acceder al servidor local ni al archivo. Por ello no se certifican ausencia de desbordamientos a todos los anchos, mediciones Lighthouse/Core Web Vitals, navegación con lector de pantalla real, ni revisión en Safari/iOS.

Se verificaron los destinos y mensajes construidos de WhatsApp; no se abrió una conversación ni se envió mensaje alguno. La disponibilidad de la cuenta en WhatsApp no fue comprobada externamente.

## Revisión visual recomendada antes de publicar

Abrir en Chrome y Safari, a 390, 768 y 1440 px. Recorrer el nuevo temario para comprobar el cambio de imagen, desplegar las cuatro partes, revelar/reiniciar el river y abrir una pregunta frecuente. Comprobar foco por teclado y opción del sistema «reducir movimiento». Confirmar que cada CTA muestra en WhatsApp el número y mensaje esperados, sin necesidad de enviarlos.

La portada sigue marcada como conceptual. El precio indicado por el autor es US$30; la fecha y los formatos comerciales siguen pendientes de confirmación. No se asignaron valores ficticios a capítulos o materiales para formar un total promocional de US$1.000.
