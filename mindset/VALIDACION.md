# Validación — 16 de noviembre de 2026

## Ejecutado

- Sintaxis válida de **todos** los archivos JavaScript mediante `node --check`.
- HTML analizado y comprobado con BeautifulSoup: **sin IDs duplicados**, **sin enlaces internos rotos** y **sin referencias de recursos locales ausentes**.
- Verificadas 12 escenas cinematográficas, 6 ensayos editoriales con sus 6 imágenes, las cuatro partes y los 12 capítulos del índice dinámico, 3 escenarios nuevos y 14 preguntas frecuentes.
- Fragmento de lectura: **8 párrafos idénticos al PDF original** de referencia bajo normalización de espacios, sin edición de palabras.
- Comprobado el laboratorio: el modelo de bote 300, apuesta 200 utiliza `EV(call)=p*500-(1-p)*200`; al 25 % produce `−25` y al 40 % produce `+80`.
- Probadas interacciones en **Chromium con HTML, CSS y JS incorporados en memoria** (`page.set_content`) por restricciones de navegación local del navegador administrado. Sin errores de JavaScript en el escenario móvil de 390 × 844.
- Verificados en Chromium: tres escenarios de mentalidad (click cambia contenido y estado accesible), slider de EV, desplegable del índice y botón para revelar river.
- Captura visual del hero móvil y desktop; **sin desbordamiento horizontal** en los tamaños comprobados (390 y 1440 px). Se corrigió un problema real de recorte de texto en el hero móvil detectado en la prueba inicial.
- Mantenidas imágenes, PDFs y scripts funcionales de la versión de origen. Checkout vacío, sin simulación de pago.

## Alcance y limitaciones

El entorno bloqueó con `ERR_BLOCKED_BY_ADMINISTRATOR` la navegación Chromium a `file://` y a `http://127.0.0.1`, por lo que el chequeo visual y funcional se realizó inyectando la página y sus recursos dentro del navegador de prueba, en lugar de mediante un servidor de desarrollo real. Se probó el hero en escritorio y la página con sus interacciones en móvil; no se hizo una revisión manual exhaustiva de cada sección en todos los tamaños ni una prueba de transacciones, accesos a WhatsApp o despliegue público. Debe ejecutarse una prueba final en el hosting y dispositivos reales antes de abrir ventas.
