# Auditoría y evolución de la web existente

## Diagnóstico inicial

Se inspeccionaron los cinco archivos del ZIP: HTML, CSS, JavaScript, datos del índice y portada SVG. No había framework, gestor de dependencias, servicios externos ni fotografía: era una página estática con ilustraciones CSS/SVG. Se contrastaron la fuente maestra y el manuscrito suministrados; el título comercial vigente se mantiene en toda la web.

### Decisiones que merecían conservarse

- Contraste entre tinta y papel, verde apagado, latón y azul grisáceo.
- Tipografía serif de sistema para titulares y lectura; sans para desarrollo y monoespaciada para anotaciones.
- Composición en tres líneas del título, cursiva y mockup con perspectiva.
- Alternancia entre secciones oscuras y claras.
- Orden narrativo: idea, marco, mano, contenido, límites, fragmento, autor, lanzamiento, preguntas y cierre.
- Índice de cuatro partes y doce capítulos, controles accesibles y preguntas nativas desplegables.
- Mano A♥ A♦ contra K♠ Q♠ sobre A♠ 7♠ 2♦ 9♥, equity 37/44 y river 5♠, coincidentes con el capítulo 5.

### Carencias identificadas en el código original

| Área | Hallazgo | Intervención |
|---|---|---|
| Imágenes | Solo portada SVG e ilustración CSS; poca identidad propia por escena | Once escenas originales, locales, optimizadas y específicas |
| Narrativa | Varias reformulaciones de conocer/ejecutar, sin suficiente desarrollo de supuestos | Cada bloque ahora responde una pregunta distinta |
| Marco teórico | Tres columnas resumían demasiado la relación entre modelo y jugador | Dos ensayos breves con escena sticky y cambio de imagen |
| Mano | El texto revelaba el river antes de pulsar; no permitía reiniciar | Desenlace reservado al botón, vuelta al turn y cuenta desplegable |
| Conversión | Formulario de demostración que guardaba correo en localStorage | Eliminado; seis CTA contextuales hacia el número confirmado |
| Scroll | Sin recorrido visual vinculado al desplazamiento | Progreso, revelaciones, parallax acotado y composición sticky |
| Móvil | Numerosos rótulos de 5–8 px | Se aumentaron tamaños de notas y controles relevantes |
| Accesibilidad | Buena base de etiquetas y foco; cierre móvil limitado | Escape, cierre exterior, estado del river, tamaños táctiles y movimiento reducido |
| Mantenimiento | Cinco archivos sin dependencias | Misma arquitectura; una hoja de evolución y configuración de contacto |

## Nueva secuencia editorial

1. **Conocer / sostener:** la distancia entre explicar una estrategia y ejecutarla.
2. **El bote / el criterio:** el historial no revela por sí solo la calidad del proceso.
3. **La referencia:** una solución necesita conservar las condiciones del problema.
4. **La ejecución:** serenidad y rendimiento no son sinónimos.
5. **El river:** el desenlace cambia al ganador, no la información anterior.
6. **El contenido:** decisión, ejecución, riesgo y entorno conectados con los capítulos reales.
7. **El riesgo:** la competencia técnica no garantiza control de la participación.
8. **La lectura:** fragmento literal del cierre, cotejado con el Word.
9. **El autor:** perspectiva intelectual sin rostro ni credenciales inventados.
10. **La publicación:** consulta directa; precio indicado de US$30, sin valoración comparativa inventada ni checkout. Fecha y formatos pendientes de confirmación.
11. **El cierre:** la decisión de volver a sentarse.

## Criterio de evaluación

La mejora principal está en la dirección artística y la precisión editorial: fotografía original en lugar de decoración CSS, seis destinos de conversión reales y una distinción más nítida entre modelo, ejecución y participación. Se mantuvo el sistema tipográfico y cromático original, y la página sigue sin dependencias de producción.

No se certifica una calificación global de 18/20: falta validar la composición real y la fluidez en navegador de escritorio y móvil. La auditoría inicial y las mejoras se basan en los archivos; las imágenes fueron inspeccionadas visualmente como recursos, pero la interfaz completa no pudo capturarse por las restricciones del entorno. No se atribuyen resultados de rendimiento, conversión o accesibilidad no medidos.
