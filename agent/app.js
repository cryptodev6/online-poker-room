/* Rutas centralizadas: el primer juego ya vive en este sitio. */
const EXTERNAL_BASE = "https://vosspoker.org";
const PATHS = Object.freeze({
  login: "/casino/ingresar", register: "/casino/registro",
  casinoBonus: "/casino/bono-bienvenida", sportsBonus: "/casino/deportes/bono",
  baccarat: "/casino/baccarat", roulette: "/casino/ruleta",
  liveCasino: "/casino/en-vivo", slots: "/casino/slots",
  crash: "/casino/crash", plinko: "/casino/plinko",
  mines: "/casino/mines", dice: "/casino/dice",
  videoPoker: "/casino/video-poker", keno: "/casino/keno",
  sports: "/casino/deportes", football: "/casino/deportes/futbol",
  basketball: "/casino/deportes/basquet", tennis: "/casino/deportes/tenis",
  mma: "/casino/deportes/mma", esports: "/casino/deportes/esports"
});

window.VOSSCASINO_ROUTES = Object.freeze({
  ...Object.fromEntries(Object.entries(PATHS).map(([key, path]) => [key, EXTERNAL_BASE + path])),
  blackjack: "/casino/blackjack/"
});
// Enlaces independientes para cada oferta. Añade el de Mercado Pago cuando esté listo.
const DEPOSIT_URLS = Object.freeze({ welcome: "", blackjack: "" });
document.querySelectorAll("[data-route]").forEach((link) => {
  const url = window.VOSSCASINO_ROUTES[link.dataset.route];
  if (url) link.href = url;
});

const depositDialog = document.querySelector("#deposit-dialog");
document.querySelectorAll("[data-deposit-cta]").forEach((link) => {
  const depositUrl = DEPOSIT_URLS[link.dataset.depositProduct || "welcome"];
  if (depositUrl) link.href = depositUrl;
  else link.addEventListener("click", (event) => {
    event.preventDefault();
    depositDialog?.showModal();
  });
});
depositDialog?.querySelectorAll("[data-close-deposit]").forEach((control) => {
  control.addEventListener("click", () => depositDialog.close());
});
depositDialog?.addEventListener("click", (event) => {
  if (event.target === depositDialog) depositDialog.close();
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
if (menuButton && mobileMenu) {
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
}

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".spotlight").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}

/* Una barra compartida para el lobby y las páginas de juegos. */
const navItems = [
  { label: "Voss", href: "/#inicio", icon: "voss" },
  { label: "Casino", href: "/#juegos", icon: "cards" },
  { label: "Deportes", href: "/#deportes", icon: "ball" },
  { label: "Actividad", href: "/casino/blackjack/#actividad", icon: "activity" }
];
const icons = {
  voss: '<path d="M4 5h5l3 11 3-11h5l-5 15H9L4 5Z"/>',
  cards: '<path d="M5 5.5 16 3l3 13-11 2.5L5 5.5Z"/><path d="m7 9-3 2 5 10 9-5"/><path d="m11 8 2 2-2 2-2-2 2-2Z"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="m9 4 2 4-2 3-4 1m7-4 4-1 3 3-2 4-5 1-3-4m3 4 1 6m4-7 4 3"/>',
  activity: '<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/>'
};
const dock = document.createElement("nav");
dock.className = "voss-dock";
dock.setAttribute("aria-label", "Navegación rápida");
const isGame = document.body.dataset.page === "blackjack";
navItems.forEach((item) => {
  const link = document.createElement("a");
  link.href = item.href;
  link.className = "voss-dock__item";
  link.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[item.icon]}</svg><span>${item.label}</span>`;
  if (item.icon === (isGame ? "activity" : "voss")) link.setAttribute("aria-current", "page");
  dock.append(link);
});
document.body.append(dock);
