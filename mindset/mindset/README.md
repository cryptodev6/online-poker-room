# EL JUEGO DETRÁS DEL JUEGO — Landing editorial y comercial

**By Alexander Voss** · Reposicionamiento y reescritura integrados · 16 de noviembre de 2026.

## Qué se entregó

La misma landing cinematográfica, sobre el stack original **HTML, CSS y JavaScript estáticos**, con una propuesta comercial corregida. Ahora la tesis se presenta desde el primer pantallazo: **conocer la estrategia no basta para sostener el rendimiento, la disciplina y las condiciones de juego**.

La página no se anuncia como un curso de GTO ni un libro de análisis de manos. El manuscrito real **sí contiene** fundamentos técnicos, GTO y ejemplos de No-Limit Hold’em en determinadas secciones; se explican cuando son pertinentes y los doce capítulos conservan sus nombres oficiales. Ningún texto del manuscrito se modificó para esta entrega.

### Cambios principales

- **Hero:** preserva el título en tres líneas, `By Alexander Voss` y `Saber qué hacer no significa poder ejecutarlo`; introduce tilt, fatiga, banca y criterio con claridad para un visitante frío.
- **Prólogo cinematográfico:** conserva las doce escenas, cartas, importes y fotografías de Daniel. La introducción contextualiza quién es y por qué importa su historia. El cierre habla de una ventaja que no se sostuvo y existe una opción para saltar al contenido.
- **Nuevo módulo de mentalidad:** tres situaciones interactivas, sin puntuaciones ni diagnósticos, sobre fatiga, persecución de pérdidas y exceso de confianza. Archivos `mindset-cases.js` y `reposition.css`.
- **Seis ensayos:** ahora comienzan por tilt, A-game, varianza, banca, partidas privadas e integridad. Están escritos para que el visitante reconozca problemas reales, no para vender exploits.
- **Simulación EV:** se conserva funcionando, ahora después del contenido central y con explicación explícita del modelo, de las pot odds, de lo que se supone sobre el adversario y de la diferencia entre observación y certeza.
- **Capítulos:** las cuatro partes y los doce nombres originales se conservan; sus descripciones comerciales se reescribieron sin sustituir el contenido real.
- **Muestra:** el panel de lectura contiene el comienzo literal del capítulo 6, más centrado en el tilt silencioso; se conserva el PDF del prólogo completo.
- **Autor, oferta y FAQ:** todos centrados en psicología competitiva, conducta, riesgo, disciplina y límite de exposición, sin atribuir biografía, resultados o garantías no verificadas.
- **Diseño:** se conservan todas las imágenes de origen y sus versiones responsive; solo se añadió estilo necesario para el nuevo contenido. No se generaron imágenes nuevas en esta revisión.

## Cómo ejecutarla

Desde la carpeta `mindset/`:

```bash
# Windows con Python
py -m http.server 8000

# Linux / macOS
python3 -m http.server 8000
```

Abre `http://localhost:8000`. Para publicar, copia **el contenido de `mindset/`** al directorio público de un hosting estático. No hay dependencias de npm ni paso de compilación.

## Pago y precio

En `config.js`:

```javascript
window.vossConfig = Object.freeze({
  whatsappNumber: "573007068986",
  checkoutUrl: "", // Completar únicamente cuando exista una URL real HTTPS
  launchPriceUsd: 27,
  // ... mensajes
});
```

**La web NO procesa pagos.** Hasta que se configure un checkout real, `data-purchase` abre WhatsApp para consultar condiciones y disponibilidad. `US$27` se presenta únicamente como precio de lanzamiento anunciado, **sin inventar un descuento previo** ni prometer una edición física/digital no confirmada. El estado de compra no debe presentarse como venta completada por hacer clic en el botón.

Antes de recibir pagos, confirmar: edición y formato, fechas y entrega, política de reembolsos y soporte, datos legales, medios de pago y privacidad. No se ofrecen coaching, clases personales ni comunidad privada como beneficios confirmados.

## Analítica, SEO y assets

- Los eventos usan `window.dataLayer`. La nueva interacción emite `mindset_scenario_view`, y el nuevo enlace editorial `explore_book`. **No hay una plataforma de analítica conectada** y ningún evento representa una venta finalizada.
- Metadatos SEO y sociales actualizados al nuevo posicionamiento. Sustituir las rutas relativas de imágenes Open Graph por URLs HTTPS absolutas cuando exista dominio de publicación.
- `assets/cinematic/` conserva las doce escenas y sus versiones móvil; `assets/generated/` contiene imágenes de la versión anterior. `cover-concept.svg` es provisional.
- `muestra-prologo.pdf` y `plantilla-revision.pdf` son recursos gratuitos. No se anuncian como bonos comerciales.

## Validación y decisiones editoriales

Consultar `VALIDACION.md` y `REPOSICIONAMIENTO.md`. Este ZIP elimina la carpeta duplicada `mindset/mindset/` que venía dentro del archivo de origen; **el código y los recursos útiles permanecen**.
