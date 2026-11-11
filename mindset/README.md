# EL JUEGO DETRÁS DEL JUEGO

By Alexander Voss · Versión editorial optimizada

## Abrir en Visual Studio Code

1. Extrae el ZIP completo.
2. En VS Code, elige **Archivo → Abrir carpeta** y selecciona `mindset`.
3. Abre `index.html` en tu navegador desde el explorador de archivos. La página es estática: funciona sin instalar dependencias, sin compilación y sin servidor.

### Desarrollo con recarga automática

Si ya utilizas la extensión Live Server de VS Code, haz clic derecho en `index.html` → **Open with Live Server**. Usa la URL que abra la extensión.

### Servidor local opcional con Python

En la terminal de VS Code, dentro de `mindset`:

Windows:
```powershell
py -m http.server 8000
```

macOS / Linux:
```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`. Detén el servidor con `Ctrl+C`.

## Archivos principales

- `index.html`: narrativa, secciones, mano ilustrativa y fragmento.
- `styles.css`: sistema visual original, conservado.
- `editorial.css`: evolución cinematográfica, responsive y accesibilidad.
- `app.js`: índice, menú, capas, river, animaciones y enlaces.
- `data.js`: cuatro partes y doce capítulos del manuscrito.
- `config.js`: número oficial y seis mensajes de WhatsApp.
- `cover-concept.svg`: portada conceptual original, todavía provisional.
- `assets/`: once imágenes originales, cada una en dos tamaños WebP.
- `AUDITORIA.md`: diagnóstico y decisiones de diseño.
- `VALIDACION.md`: pruebas ejecutadas y límites de verificación.
- `DIRECCION_ARTISTICA.md`: mapa de imágenes, criterios y prompts.

## WhatsApp

Número confirmado: **+57 300 7068986**. Configuración: `whatsappNumber` en `config.js`, sin espacios ni signo `+`.

Cada CTA abre `https://wa.me/573007068986?text=...` con su mensaje codificado. Abrir el enlace no envía el mensaje: el visitante confirma el envío en WhatsApp. Los enlaces de exploración interna mantienen sus anclas.

No se guardan correos, no hay formularios de demostración ni analítica incorporada.
La demo muestra el precio de **US$30** indicado por el autor y deriva las consultas de disponibilidad y formato a WhatsApp. No incluye checkout, reserva ni precios comparativos inventados.

## Edición y publicación

No necesitas React, Vite, npm ni un backend. Conserva la carpeta `assets` junto al HTML y los scripts. Para publicar, sube el contenido completo de `mindset` a cualquier alojamiento estático.

El índice y las leyendas del temario se configuran en `data.js`. Las seis entradas desarrolladas están en `index.html`; edita allí títulos, argumentos, distinciones y preguntas. Los textos de las demás secciones están en `index.html`. El precio indicado es US$30; la fecha y los formatos comerciales todavía no están confirmados. El concepto de libro físico no constituye una confirmación de formato.

La demo no procesa pagos ni reserva ejemplares. Antes de una publicación pública conviene revisar visualmente la página a 390 px, 768 px y 1440 px, y configurar una imagen Open Graph con URL absoluta en el dominio definitivo. Consulta `VALIDACION.md` para los controles pendientes.

Los documentos del libro no fueron modificados ni se incluyen en este ZIP.

## Revisión de copy para jugadores avanzados

Consulta `CAMBIOS_COPY.md` para el nuevo recorrido y `VALIDACION.md` para las comprobaciones de esta entrega. Esta versión se abre igual que la anterior: extraer el ZIP, abrir `mindset` en VS Code y abrir `index.html` en el navegador, sin instalar dependencias.
