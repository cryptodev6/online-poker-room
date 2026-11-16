# V6 — Fotografía temática de capítulos (sin cambios en fondos)

Esta actualización parte de `El_Juego_Detras_Del_Juego_V5_Fondos_Movil_Corregidos.zip`.

## Intervención exclusiva

En `#temario`, galería `syllabus__gallery`, se sustituyeron las seis fotografías temáticas por recursos exclusivos ubicados en `assets/chapters-v6/` (seis desktop y seis versiones móviles), conservando exactamente la estructura, el orden, las animaciones, el texto y los fondos originales.

| Posición | Capítulo | Nuevo recurso | Idea visual |
|---|---|---|---|
| 1 | 06: Tilt silencioso | `tilt` | Jugador en tensión contenida; aparente calma, decisión difícil |
| 2 | 04: Estado / cansancio | `cansancio` | Fatiga perceptible en el rostro y la postura durante una sesión |
| 3 | 07: Resultados / varianza | `varianza` | Oscilación de resultados frente a fichas de juego |
| 4 | 09: Banca | `banca` | Gastos, liquidez y exposición junto a capital de juego |
| 5 | 10: Partidas privadas | `privadas` | Interacción entre jugadores en una partida privada realista |
| 6 | 11: Integridad online | `integridad` | Análisis cuidadoso de actividad online y datos observables |

La fotografía de «Partidas privadas» procede de una escena cinematográfica anteriormente producida y que no estaba siendo utilizada en la sección 2 vigente; las restantes escenas son material generado específicamente durante esta revisión. Todas se presentan como representaciones artísticas, no episodios documentados ni pruebas sobre plataformas o personas reales.

## Integridad

- **Ningún archivo CSS modificado**, incluidos los estilos de fondos móviles V5.
- **Ningún JavaScript modificado**.
- Contenido visible del HTML idéntico al de V5.
- Únicamente seis rutas de imágenes de la galería y sus descripciones alternativas cambian en `index.html`.
- Mantiene estructura y precios de oferta existentes. No se configuró checkout.
- Archivos originales conservados para otras secciones que los reutilizan como fondos o material editorial.

## Verificaciones

- Seis imágenes en el orden de capítulos correcto.
- Versiones móviles independientes y formatos WebP comprobados.
- Comprobación de integridad de archivos locales y referencias HTML.
- Browser Chromium en contenido embebido: 390 y 1440 px, seis estados de galería, imágenes cargadas, sin errores de JavaScript ni scroll horizontal.
- El acceso a servidor local HTTP en Chromium estuvo bloqueado por políticas del entorno: la prueba visual se hizo con recursos embebidos; conviene realizar una comprobación final en hosting antes de publicar.
