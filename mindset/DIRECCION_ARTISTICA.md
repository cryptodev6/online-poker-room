# Dirección artística

Colección generada con la herramienta integrada de generación de imágenes. Once escenas originales; ninguna es una fotografía documental de Alexander Voss. Portada SVG conceptual conservada del proyecto original. Textos de la interfaz en HTML, no incrustados en las fotografías.

## Lenguaje común

Fotografía editorial cinematográfica, verde nocturno desaturado, carbón, latón envejecido y piedra clara. Luz lateral cálida con sombras frías. Materiales táctiles y perspectiva fotográfica. Sin neón, dinero, ruletas, celebraciones ni capturas de solver falsas. Los elementos teóricos son metáforas visuales, no datos.

## Mapa de recursos y briefs de generación

| Recurso | Sección | Composición solicitada |
|---|---|---|
| `hero.webp` | Apertura | Penthouse nocturno, pedestal vacío de travertino a la derecha, espacio oscuro a la izquierda. La portada original se coloca como elemento independiente. |
| `visible.webp` | Visible / invisible | Mesa profesional ovalada, sillas de cuero, fieltro verde y lámpara de latón. Vista oblicua elevada, sin personas. |
| `theory.webp` | La referencia | Instalación abstracta de ramas de latón detrás de vidrio ahumado, geometría y matriz grabada, sin números ni interfaz de software. |
| `execution.webp` | La ejecución | Manos y torso de un jugador anónimo, rostro fuera de cuadro, cartas boca abajo y concentración silenciosa. |
| `hand.webp` | Ejemplo interactivo | Fieltro verde vacío visto desde arriba, borde de cuero y luz cálida. Las cartas exactas y cifras se dibujan en HTML. |
| `index.webp` | Contenido | Cuatro planos de materiales diferentes: vidrio, tejido, piedra y umbral de bronce. Una composición conjunta para las cuatro dimensiones. |
| `risk.webp` | Riesgo | Silla vacía apartada de la mesa, puerta abierta y luz del amanecer. Silencio y posibilidad de retirarse. |
| `excerpt.webp` | Fragmento | Libro abierto sin texto impreso, papel de algodón y luz diagonal sobre piedra. |
| `author.webp` | Autor | Escritorio vacío junto a una ventana, cuaderno oscuro, pluma y lámpara. Alternativa editorial al retrato. |
| `launch.webp` | Publicación | Libro de lino sin impresión y pliegos sobre travertino, trabajo editorial en preparación. |
| `closing.webp` | Cierre | Corredor oscuro abierto a un horizonte azul al amanecer, profundidad a la derecha y espacio negativo a la izquierda. |

## Exportación

Cada recurso tiene una versión de 1536 × 1024 y una de 768 × 512 (`-mobile.webp`). Se exportaron a WebP con calidad 86 y 80 respectivamente. Los encuadres se adaptan en CSS mediante `object-fit` y `object-position`; los archivos pequeños evitan descargar la versión grande en pantallas estrechas cuando el navegador lo considera apropiado.

Carga diferida en escenas inferiores; prioridad alta en la apertura; dimensiones explícitas para reservar espacio. Sin enlaces a bancos de imágenes ni dependencias de URLs temporales. Los originales PNG de generación no se incluyen para evitar peso innecesario; todos los recursos usados por la web sí están incluidos.

Las imágenes representan ambientes conceptuales. No documentan una partida, un resultado estratégico, un despacho del autor ni un formato comercial confirmado.
