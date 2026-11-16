# V5 — Corrección de fondos en móvil

**Base:** archivo `mindset(4).zip` proporcionado por el usuario (versión con historia de Daniel V4).

## Qué se corrigió

- Los fondos responsive existían, pero la transparencia de los degradados móviles los ocultaba hasta un 96 % en varias secciones.
- El elemento fotográfico era `position:sticky` dentro de un contenedor absolutamente posicionado, lo que daba un comportamiento de desplazamiento poco fiable en secciones largas. Ahora el contenedor fotográfico es sticky dentro del flujo normal, con margen compensatorio, y su imagen cubre únicamente el viewport.
- Se ajustó la opacidad de los degradados en el hero y la sección 2 para recuperar detalle visual sin sacrificar contraste de los textos.
- Se ajustaron los degradados sobre las dos escenas comparativas de Daniel.
- Se dejó un fondo estático de respaldo si JavaScript no está disponible y se respetó la preferencia de movimiento reducido.

## Integridad

- No se editó ningún párrafo, titular, precio, ancla, CTA, hoja de datos, JS ni asset original.
- El escritorio mantiene los estilos de V4. Todos los nuevos overrides están limitados a pantallas de hasta 800 px.
- El ZIP final contiene **una sola versión del sitio en raíz**; se ha omitido la carpeta `mindset/` antigua y duplicada que venía en el ZIP de origen. El archivo a publicar es `index.html` en la raíz.

## Archivos modificados/agregados

- `index.html`: referencia adicional a `mobile-backdrops-v5.css` (ningún otro cambio).
- `mobile-backdrops-v5.css`: correcciones responsive para fondos fotográficos.
- `MOBILE_BACKGROUND_FIX_V5.md`: esta nota.
