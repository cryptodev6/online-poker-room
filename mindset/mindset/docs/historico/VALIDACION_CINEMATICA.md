# Validación — experiencia cinematográfica de la sección 2

## Comprobaciones realizadas

- Parséo HTML con 12 escenas y 12 fotogramas, todas con imagen de fallback.
- 12 WebP para escritorio (1600 × 1000) y 12 WebP para móvil (900 × 1200) disponibles.
- Valores de la mano y símbolos de cartas contrastados con el prólogo suministrado.
- Syntax check de `app.js` y `cinematic.js` con Node.
- Renderizado visual en Chromium mediante HTML/CSS/JS e imágenes integradas en memoria, probado en 360×740, 390×844, 768×1024, 1440×900 y 1920×1080.
- Sin errores de JavaScript detectados en esa vista de pruebas.
- Sin overflow horizontal observado en esas cinco resoluciones.
- Comprobación de la transición por las escenas 1, 5, 8, 9, 11 y 12.
- Sin JavaScript: lectura cronológica con imágenes en flujo normal.
- Con `prefers-reduced-motion`: mismo modo de lectura sin animaciones sticky.
- Comparación automática del HTML original: no hay cambios en otras secciones más allá de cargar las nuevas hojas CSS y el motor JS.

## Limitaciones conocidas

- El entorno de navegador impidió navegar directamente al URL local y al archivo `file://`. Para las comprobaciones visuales se construyó una vista equivalente de la sección con sus hojas de estilo y scripts inyectados; **no se verificó la página completa como navegación real de extremo a extremo**.
- No hay certificación de Lighthouse, ni pruebas en Safari/iOS reales o dispositivos Android físicos.
- Algunos assets compuestos tienen menor resolución fuente que sus dimensiones de salida. Véase `DIRECCION_CINEMATOGRAFICA.md`.
- No se modifica el backend, las llamadas de contacto ni ningún CTA fuera de la sección.

## Para probar localmente

Extrae el ZIP y abre `index.html` directamente en Chrome, Edge o Firefox, o utiliza Live Server. Desplázate desde el hero hacia la sección «Una mesa que ya cambió» y confirma las transiciones, en especial el river y el flashback de la apuesta del turn. La web sigue siendo estática; no necesita instalación.
