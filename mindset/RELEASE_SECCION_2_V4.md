# V4 · Sección 2: La partida que cambió

## Alcance de la entrega

Sustituida la experiencia de doce escenas de Daniel por tres momentos dentro de una única sección:

1. **La invitación**: microhistoria editorial sobre la partida privada de 5/10, dos empresarios que daban acción, cansancio inicial y llegada a las 9:20 p. m.
2. **La transformación**: dos imágenes complementarias de la misma sala, a las 9:20 p. m. y cerca de medianoche. A las 11:30 p. m. comienza la salida de los empresarios. Los dos estados presentan los cambios de alineación y straddle de 20.
3. **La revelación**: «La misma silla. Otra partida». El eje es la falta de reevaluación de las condiciones, no un supuesto error técnico demostrado.

La muestra completa del prólogo permanece disponible en `muestra-prologo.pdf`. Los enlaces al índice y a la tesis siguen funcionando.

## Dirección artística

Las fotografías nuevas fueron generadas como dos momentos de una misma sala y optimizadas como cuatro archivos WebP: `assets/story-v4/entrada.webp`, `medianoche.webp` y variantes móviles. El diseño utiliza superposiciones de sombra, tipografía editorial y transición con `position: sticky` solo en la comparación móvil. La segunda escena se desplaza sobre la primera. No hay bloqueo de scroll ni interacción obligatoria.

## Integridad del copy

Se verificó por comparación automática que todo el texto **fuera de `#perspectiva`** coincide exactamente con la V3. Se conserva el precio de lanzamiento de US$27, los enlaces comerciales, los recursos descargables y las interacciones de otras secciones. Se retiró la carga de `cinematic.js` porque únicamente operaba el recorrido de doce escenas retirado, pero se conserva el archivo como recurso histórico en el proyecto.

La sección 2 pasa de **4.740 a 1.687 caracteres visibles** en la extracción textual de HTML, una reducción del **64,4 %**. Sus recursos son cuatro imágenes de aproximadamente 233 KB en total.

## QA

- Anchos comprobados: 360, 390, 430, 768 y 1440 px.
- Sin overflow horizontal ni errores JavaScript en las pruebas automatizadas.
- La sección ocupa aproximadamente 3,08 alturas de pantalla a 360×780; 2,8 a 390×844; 2,53 a 430×932; 2,42 a 768×1024; y 3,01 a 1440×900 (según CSS y viewport del navegador de prueba).
- Imágenes locales y enlaces HTML existentes verificados.
- Fotografías de los estados y sección comprobadas visualmente en móvil y escritorio.
- También se probó la comparación sin JavaScript, mediante representación estática en navegador.

**Limitación:** antes de publicar, comprobar una vez en un iPhone/Safari real y en el hosting definitivo. La compra sigue siendo por consulta en WhatsApp; esta actualización no configura checkout.

## Uso

Abrir `index.html` o servir esta carpeta desde un servidor estático, preservando rutas relativas. `story-v4.css` se importa al final para encapsular la nueva sección y no modificar las demás.
