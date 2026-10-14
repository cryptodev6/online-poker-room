# VOSS BIRTHDAY — MEDELLÍN 2026

Landing estática para Namecheap y cualquier hosting HTML/PHP. Sin instalación, compilación ni backend. Esta entrega es una versión de diseño funcional; antes de abrir reservas deben completarse el contacto, las fotos y las condiciones comerciales.

## Dirección creativa

**La noche es nuestra.** Editorial nocturna: fotografía de ciudad a sangre, tipografía condensada monumental, negro ciruela y acento fucsia. La serif cursiva y los tonos champán dan intimidad; el fucsia marca acciones y el cumpleaños. Se evita el vocabulario visual de casino.

Paleta: fondo #110A11, superficies #1B121B, texto #F4E9D7, champán #E8C297, fucsia #F24991. Tipografías: Barlow Condensed para titulares de impacto y cifras; DM Sans para lectura; Playfair Display italic para frases emocionales. Se cargan desde Google Fonts con fuentes de sistema como respaldo.

## Recorrido y copy

Todo el copy final se encuentra en index.html, por secciones semánticas:
1. La noche es nuestra: hero, fechas, propuesta y precio.
2. No es un tour. Es vivir Medellín desde adentro: concepto y cuatro beneficios.
3. De día, a tu ritmo. De noche, nos encontramos: nightlife con foto.
4. Una noche. Todos en la misma historia: cumpleaños, 14 de diciembre.
5. Ritmo de las dos semanas, sin inventar locales o actividades confirmadas.
6. La casa es donde empieza todo: galería conectable a fotos reales.
7. El plan está aquí. Falta tu habitación: comparación estándar/premium.
8. Sabes a qué vienes. Y qué estás pagando: inclusiones y proceso.
9. Once preguntas frecuentes.
10. Hay viajes que haces. Y noches que se quedan: cierre WhatsApp.

## Publicar en Namecheap

1. Descomprime la carpeta.
2. Edita config.js: introduce el WhatsApp internacional de reservas, solo dígitos.
3. Sube index.html, styles.css, config.js, app.js y assets/ dentro de public_html/medellin/ (o la carpeta que elijas).
4. Abre tu dominio/medellin/. No necesita PHP, bases de datos ni npm.
5. Antes del lanzamiento, sustituye las imágenes referenciales por fotos propias/autorizadas y confirma las condiciones indicadas abajo.
6. Añade og:url y og:image absolutos al head cuando conozcas la URL y tengas una imagen social autorizada; estos no se inventaron.

## WhatsApp y funcionamiento

Los cinco mensajes prellenados están en app.js. Todas las acciones de WhatsApp leen config.js. Si el número está vacío o es inválido, se muestra «Contacto por confirmar»: no hay redirección a un número ficticio ni reserva simulada. Con un número válido los enlaces abren wa.me con el mensaje de su categoría. Probar desde teléfono antes de publicar.

La galería conserva marcadores explícitos hasta añadir fotos. Introducir rutas en config.js, por ejemplo photos.sala = 'assets/sala.webp'. Las fotos cargadas activan ampliación en diálogo con teclado/Escape. Si una ruta falla, se conserva el marcador. El FAQ funciona sin JavaScript. La animación respeta reduced-motion.

Precios octubre: estándar S/2,500 (aprox. US$727), premium S/3,500 (aprox. US$1,018). El 1 de noviembre de 2026 a las 00:00 UTC−5 pasan a US$1,000 y US$1,400. El cambio depende de la hora del dispositivo; si se requiere control autoritativo se debe pasar a PHP. No se recalcula una cotización cambiaria actual. Ambos son precios por persona por 14 noches. El inventario es total (3 + 2), no disponibilidad viva. No se procesan pagos.

## Fotografías necesarias

- Hero: foto propia de Medellín nocturna, horizontal 2400 × 1600 o mayor; ciudad visible y espacio oscuro para el titular.
- Nightlife: foto autorizada de grupo/salida real en Medellín, horizontal o vertical de al menos 1600 px. Evitar presentar un lugar como incluido si no lo está.
- Sala: horizontal 1800 × 1400; abrir la galería con el principal espacio común.
- Estándar y premium: al menos una foto real por habitación (ideal 2–3), luz natural, encuadre completo; no corregir dimensiones con gran angular extremo.
- Fachada: horizontal de 1800 px; puede sustituirse por un detalle real si la dirección debe mantenerse privada.
- Opcional: retrato real de Alexander en contexto social; terraza/vista solo si existen y su uso está permitido.

La galería principal tiene cuatro posiciones editables. Se puede ampliar replicando la estructura data-photo y agregando la clave en config.js. Optimizar a WebP, entre 150 y 350 KB por foto cuando sea posible. No se usaron imágenes ficticias de la propiedad.

## Fuentes de las imágenes de referencia

Estas imágenes permiten revisar la dirección visual. No se ha acreditado una licencia de uso comercial; reemplazarlas por material propio/autorizado antes de publicar.
- Medellín: https://de.best-wallpaper.net/Medellin-Republic-of-Colombia-city-night-buildings-lights_1920x1080.html
- Ambiente nocturno: https://www.tangra.club/contact (Tangra; no se presenta como un establecimiento de Medellín ni como incluido). La propia landing identifica la fotografía como imagen de ambiente referencial.

## Confirmar antes de abrir reservas

WhatsApp, fotos y derecho de uso; ubicación de la casa; ocupación por habitación y cómo se aplica el precio por persona; camas y diferencias premium; reglas de convivencia/visitas; importe del adelanto; vencimiento del saldo; cancelación/reembolso/transferencia; métodos de pago y comisiones; lugar, formato y gastos del cumpleaños. Estas condiciones no fueron inventadas.

La casa no se presenta como venue de fiesta; no se prometen entradas, botellas, traslados, exclusividad de locales, seguridad absoluta ni acceso VIP. El póker solo aparece como opcional en FAQ.

## Verificación de esta entrega

Sintaxis JavaScript, unicidad de IDs, destinos de enlaces internos y existencia de imágenes verificados. La revisión visual automatizada no pudo ejecutarse porque Chromium no se pudo instalar en este entorno. Probar escritorio y móvil antes del lanzamiento. VISTA-PREVIA.html permite revisar sin servidor; es una copia autónoma, no el archivo que debes editar. Para producción usa index.html y sus archivos asociados.
