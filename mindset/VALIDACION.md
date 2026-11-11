# Validación — revisión editorial para jugadores avanzados

## Ejecutado en esta versión

- 231 comprobaciones con el JavaScript real en JSDOM, con movimiento normal y reducido.
- Seis entradas al libro presentes en HTML y disponibles sin JavaScript.
- Correspondencia entre los seis artículos, sus imágenes activas y las leyendas, mediante callbacks simulados de IntersectionObserver.
- Cuatro partes y doce capítulos; títulos oficiales conservados respecto del ZIP recibido.
- Apertura y cierre de los cuatro paneles del índice.
- Menú y Escape; controles de las tres capas; revelación del 5♠ y regreso al turn.
- Enlaces internos, identificadores únicos y recursos locales presentes.
- Contacto conservado: 573007068986. Seis mensajes contextuales distintos, correctamente codificados, con apertura segura en nueva pestaña.
- Sintaxis de los tres archivos JavaScript con Node y parseo de ambas hojas CSS con PostCSS.
- Fragmento del capítulo 6 cotejado literalmente con el manuscrito suministrado.
- Precio US$30 conservado del ZIP del autor, sin añadir fecha, formato, credenciales o testimonios.
- Todos los recursos gráficos, la portada SVG y `styles.css` se conservaron sin cambios binarios.

## Alcance

Son pruebas de estructura y comportamiento en DOM simulado, no de composición renderizada. En esta revisión no se ejecutó una prueba visual en navegador, Safari/iOS, un lector de pantalla o Lighthouse. Los callbacks simulados verifican la selección de imágenes, no el momento real en que el navegador dispara el observador al desplazarse.

Se verificaron las URL de WhatsApp construidas por la página. No se abrió ni envió una conversación.

Los documentos originales del libro no fueron modificados. El copy comercial desarrolla sus ideas con formulación propia; solo el bloque marcado como fragmento es una cita literal. Las seis entradas no son títulos nuevos del manuscrito: los títulos oficiales aparecen en sus etiquetas y en el índice completo.

## Antes de publicar

Revisar a 390, 768 y 1440 px: titulares, lectura con la imagen sticky, accesos directos a capítulos, índice, river y enlaces de contacto. Confirmar especialmente el espacio disponible en pantallas móviles bajas y con zoom de texto. Disponibilidad y formato siguen sujetos a confirmación.
