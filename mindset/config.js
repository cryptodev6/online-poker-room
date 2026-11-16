/* Edición comercial: enlaces de compra sólo se activan si existe checkoutUrl real. */
window.vossConfig = Object.freeze({
  whatsappNumber: "573007068986",
  checkoutUrl: "", // URL HTTPS del checkout real. Vacío = solicitud por WhatsApp.
  launchPriceUsd: 27,
  messages: Object.freeze({
    hero: "Hola, quiero saber cómo adquirir El juego detrás del juego por US$27 y confirmar el formato de entrega.",
    concept: "Hola, me interesa el libro sobre mentalidad y psicología del jugador de póker.",
    content: "Hola, quisiera consultar los capítulos sobre tilt, varianza, banca y mentalidad de El juego detrás del juego.",
    excerpt: "Hola, leí la muestra del libro y quisiera saber cómo adquirirlo.",
    launch: "Hola, quisiera solicitar El juego detrás del juego por US$27. ¿Qué formato y condiciones de entrega están disponibles?",
    closing: "Hola, quiero consultar cómo adquirir El juego detrás del juego por US$27."
  })
});
