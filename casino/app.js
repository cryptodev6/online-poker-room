/*
 * Centraliza las páginas de destino. Sustituye BASE si el casino usa otro dominio.
 * La landing no simula un juego ni procesa depósitos: cada enlace lleva a su ruta.
 */
const BASE = "https://vosspoker.org";
const ROUTES = Object.freeze({
  login: "/casino/ingresar",
  register: "/casino/registro",
  casinoBonus: "/casino/bono-bienvenida",
  sportsBonus: "/casino/deportes/bono",
  blackjack: "/casino/blackjack",
  baccarat: "/casino/baccarat",
  roulette: "/casino/ruleta",
  liveCasino: "/casino/en-vivo",
  slots: "/casino/slots",
  crash: "/casino/crash",
  plinko: "/casino/plinko",
  mines: "/casino/mines",
  dice: "/casino/dice",
  videoPoker: "/casino/video-poker",
  keno: "/casino/keno",
  sports: "/casino/deportes",
  football: "/casino/deportes/futbol",
  basketball: "/casino/deportes/basquet",
  tennis: "/casino/deportes/tenis",
  mma: "/casino/deportes/mma",
  esports: "/casino/deportes/esports"
});

window.VOSSCASINO_ROUTES = Object.freeze(
  Object.fromEntries(Object.entries(ROUTES).map(([key, path]) => [key, BASE + path]))
);

document.querySelectorAll("[data-route]").forEach((link) => {
  const url = window.VOSSCASINO_ROUTES[link.dataset.route];
  if (url) link.href = url;
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "Abrir menú" : "Cerrar menú");
  mobileMenu.hidden = expanded;
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
}));

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".spotlight").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}
