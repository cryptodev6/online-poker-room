/* Destino único de compra de fichas del casino. */
const CASINO_PAYMENT_URL = "/payment/";

document.querySelectorAll("[data-route], [data-deposit-cta]").forEach((link) => {
  link.href = CASINO_PAYMENT_URL;
  link.removeAttribute("target");
  link.removeAttribute("rel");
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute(
      "aria-label",
      expanded ? "Abrir menú" : "Cerrar menú"
    );
    mobileMenu.hidden = expanded;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    });
  });
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

/* Navegación inferior */
const navItems = [
  { label: "Poker", href: "/#inicio", icon: "poker" },
  { label: "Casino", href: "/casino/#juegos", icon: "cards" },
  { label: "Deportes", href: "/casino/#deportes", icon: "ball" },
  { label: "Bonos", href: "/payment", icon: "gift" }
];

const icons = {
  poker: '<path d="M12 3C10 6 4 9 4 13a4 4 0 0 0 7 2c0 3-1 5-3 6h8c-2-1-3-3-3-6a4 4 0 0 0 7-2c0-4-6-7-8-10Z"/>',
  cards: '<path d="M5 5.5 16 3l3 13-11 2.5L5 5.5Z"/><path d="m7 9-3 2 5 10 9-5"/><path d="m11 8 2 2-2 2-2-2 2-2Z"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="m9 4 2 4-2 3-4 1m7-4 4-1 3 3-2 4-5 1-3-4m3 4 1 6m4-7 4 3"/>',
  gift: '<path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13"/><path d="M12 8H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z"/>'
};

const dock = document.createElement("nav");
dock.className = "voss-dock";
dock.setAttribute("aria-label", "Navegación rápida");

navItems.forEach((item) => {
  const link = document.createElement("a");
  link.href = item.href;
  link.className = "voss-dock__item";
  link.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      ${icons[item.icon]}
    </svg>
    <span>${item.label}</span>
  `;

  if (item.icon === "cards") {
    link.setAttribute("aria-current", "page");
  }

  dock.append(link);
});

document.body.append(dock);