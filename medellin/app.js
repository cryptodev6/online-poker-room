"use strict";

document.documentElement.classList.add("js");

const CONFIG = {
  whatsapp: "573007068986",
  // Para activar un video en el hero, guarda el MP4 en assets/ y escribe la ruta.
  // Ejemplo: heroVideo: "./assets/voss-experience-teaser.mp4"
  heroVideo: ""
};

const whatsappCopy = {
  general: "Hola Alexander, quiero mi spot para Voss Experience Medellín del 1 al 8 de noviembre de 2026. ¿Me compartes disponibilidad, fotos del departamento y condiciones?",
  standard: "Hola Alexander, quiero el Spot Standard de Voss Experience Medellín (1–8 noviembre 2026). ¿Hay lugar? Me gustaría ver el departamento y las condiciones.",
  premium: "Hola Alexander, quiero el Spot Premium de Voss Experience Medellín (1–8 noviembre 2026). ¿Hay lugar? Me gustaría ver la habitación y las condiciones."
};

document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
  const key = link.dataset.whatsapp;
  const message = whatsappCopy[key] || whatsappCopy.general;
  link.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const header = document.getElementById("siteHeader");
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const scrollProgress = document.getElementById("scrollProgress");
const hero = document.querySelector(".hero");
let scrollFrame = 0;

function updateScrollEffects() {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pageProgress = documentHeight > 0 ? window.scrollY / documentHeight : 0;
  const heroProgress = hero ? Math.min(1, window.scrollY / Math.max(hero.offsetHeight * 0.92, 1)) : 0;
  scrollProgress.style.transform = "scaleX(" + pageProgress + ")";
  if (hero) {
    hero.style.setProperty("--hero-scale", (1 + (heroProgress * 0.055)).toFixed(3));
    hero.style.setProperty("--hero-opacity", (1 - (heroProgress * 0.38)).toFixed(3));
  }
  scrollFrame = 0;
}

function requestScrollEffects() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(updateScrollEffects);
}

updateScrollEffects();
window.addEventListener("scroll", requestScrollEffects, { passive: true });
window.addEventListener("resize", requestScrollEffects);

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("siteNav");
function closeMenu() {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  document.body.classList.remove("menu-open");
}
menuToggle.addEventListener("click", function () {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  document.body.classList.toggle("menu-open", open);
});
nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeMenu();
});
window.matchMedia("(min-width: 821px)").addEventListener("change", function (event) {
  if (event.matches) closeMenu();
});

const days = [
  {
    date: "DOMINGO · 1 NOVIEMBRE",
    title: "Aterrizas. Esa noche sales.",
    description: "El viaje empieza el mismo día que llegas. Dejas la maleta, conoces al grupo y salimos a abrir la semana en Provenza.",
    schedule: [
      { time: "15:00–19:00", name: "Llegada y check-in", detail: "Traslado de bienvenida y entrada al departamento." },
      { time: "20:30", name: "El grupo se reúne", detail: "Primera previa y presentaciones en nuestra base." },
      { time: "22:00", name: "Cena de apertura", detail: "Una mesa reservada en Provenza para conocernos." },
      { time: "00:00", name: "Primera salida", detail: "Bar con música; el regreso queda a tu ritmo." }
    ]
  },
  {
    date: "LUNES · 2 NOVIEMBRE",
    title: "Ya tienes con quién salir.",
    description: "Despiertas con tiempo. La tarde deja espacio para jugar o descansar; por la noche volvemos a reunirnos y salimos como grupo.",
    schedule: [
      { time: "13:00", name: "Brunch sin alarma", detail: "Nos encontramos cuando el cuerpo vuelva a pedir movimiento." },
      { time: "17:30", name: "Póker opcional", detail: "Encuentro coordinado para quienes quieran sentarse a jugar." },
      { time: "21:00", name: "Cena con el grupo", detail: "Reservamos mesa y ponemos en marcha la segunda noche." },
      { time: "23:30", name: "Bar y música", detail: "Seguimos juntos; cada uno decide cuándo volver." }
    ]
  },
  {
    date: "MARTES · 3 NOVIEMBRE",
    title: "Del rooftop a la pista.",
    description: "La tarde empieza arriba, con la ciudad de fondo. Cuando cae la noche, cambiamos de escenario sin romper el ritmo.",
    schedule: [
      { time: "13:30", name: "Inicio sin prisa", detail: "Brunch y tiempo libre para recuperarte o trabajar." },
      { time: "18:00", name: "Rooftop", detail: "Atardecer, música y encuentro del grupo." },
      { time: "21:30", name: "Cena", detail: "Mesa coordinada cerca del siguiente plan." },
      { time: "23:30", name: "Noche en Provenza", detail: "Bar o discoteca según la programación confirmada." }
    ]
  },
  {
    date: "MIÉRCOLES · 4 NOVIEMBRE",
    title: "Una mesa antes de la música.",
    description: "El póker entra en escena para quien lo quiera. Después cerramos las fichas, nos cambiamos y salimos a buscar la siguiente noche.",
    schedule: [
      { time: "14:00", name: "Tarde para ti", detail: "Descanso, trabajo o planes propios." },
      { time: "18:30", name: "Encuentro de póker", detail: "Sesión opcional con jugadores de la comunidad." },
      { time: "22:00", name: "Cena y reencuentro", detail: "Se suma también quien prefirió no jugar." },
      { time: "00:00", name: "Lounge nocturno", detail: "Música, conversación y una salida con otro ritmo." }
    ]
  },
  {
    date: "JUEVES · 5 NOVIEMBRE",
    title: "La ciudad sube el volumen.",
    description: "Jueves en Medellín. Empezamos en la casa, cenamos juntos y entramos en la noche con reserva y transporte coordinados.",
    schedule: [
      { time: "13:00", name: "Brunch y recuperación", detail: "La mañana es tuya; la noche empieza más tarde." },
      { time: "19:30", name: "Previa en la casa", detail: "Nos reunimos antes de salir." },
      { time: "21:30", name: "Cena en Provenza", detail: "La primera parada de una noche larga." },
      { time: "23:45", name: "Discoteca", detail: "Entrada con reserva coordinada, según disponibilidad." },
      { time: "02:30+", name: "La noche sigue", detail: "Plan opcional para quienes tengan energía." }
    ]
  },
  {
    date: "VIERNES · 6 NOVIEMBRE",
    title: "Viernes. Todos al mismo plan.",
    description: "Guardamos la tarde para llegar bien a la noche. Cena, previa y discoteca: el viernes se vive con el grupo completo.",
    schedule: [
      { time: "14:00", name: "Brunch y tarde libre", detail: "Descansa, haz tus planes y prepárate." },
      { time: "20:30", name: "Cena de viernes", detail: "Punto de reunión antes de salir." },
      { time: "22:30", name: "Previa", detail: "Volvemos a reunir al grupo y nos movemos juntos." },
      { time: "00:00", name: "Discoteca", detail: "Noche principal con reserva coordinada." },
      { time: "03:00+", name: "After opcional", detail: "Si quieres seguir, coordinamos el siguiente movimiento." }
    ]
  },
  {
    date: "SÁBADO · 7 NOVIEMBRE",
    title: "La última noche no se improvisa.",
    description: "Cerramos la semana fuerte. Puedes sumarte al encuentro especial de póker o reservar energía para la cena y la última discoteca.",
    schedule: [
      { time: "14:00", name: "Recarga", detail: "Brunch y tarde libre." },
      { time: "18:00", name: "Mesa especial opcional", detail: "Póker sujeto a disponibilidad del espacio habilitado." },
      { time: "21:30", name: "Cena de cierre", detail: "Nos reunimos todos antes de la última salida." },
      { time: "00:00", name: "Final night", detail: "Discoteca y noche de cierre con el grupo." },
      { time: "03:00+", name: "Último movimiento", detail: "Extensión opcional para quienes quieran seguir." }
    ]
  },
  {
    date: "DOMINGO · 8 NOVIEMBRE",
    title: "Te vas con historias.",
    description: "La semana termina, pero el grupo queda. Cerramos el departamento y coordinamos contigo la logística de salida según tu vuelo.",
    schedule: [
      { time: "11:00", name: "Check-out", detail: "Despedida en la casa y cierre de la estancia." },
      { time: "12:00–17:00", name: "Salidas", detail: "Te ayudamos a organizar el transporte que necesites." }
    ]
  }
];

const tabs = Array.from(document.querySelectorAll(".day-tab"));
const panel = document.getElementById("dayPanel");
const kicker = document.getElementById("dayKicker");
const title = document.getElementById("dayTitle");
const description = document.getElementById("dayDescription");
const timeline = document.getElementById("dayTimeline");
const counter = document.getElementById("dayCounter");
const previous = document.getElementById("prevDay");
const next = document.getElementById("nextDay");
let activeDay = 0;

function showDay(index, moveFocus) {
  if (index < 0 || index >= days.length) return;
  activeDay = index;
  const day = days[index];
  tabs.forEach(function (tab, tabIndex) {
    const selected = tabIndex === index;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", tabs[index].id);
  kicker.textContent = day.date;
  title.textContent = day.title;
  description.textContent = day.description;
  timeline.replaceChildren();
  day.schedule.forEach(function (item) {
    const row = document.createElement("div");
    const time = document.createElement("time");
    const content = document.createElement("div");
    const name = document.createElement("strong");
    const detail = document.createElement("span");
    row.className = "timeline-row";
    time.textContent = item.time;
    name.textContent = item.name;
    detail.textContent = item.detail;
    content.append(name, detail);
    row.append(time, content);
    timeline.append(row);
  });
  counter.textContent = String(index + 1).padStart(2, "0") + " / " + String(days.length).padStart(2, "0");
  previous.disabled = index === 0;
  next.disabled = index === days.length - 1;
  if (moveFocus) {
    tabs[index].focus();
    tabs[index].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }
}

tabs.forEach(function (tab, index) {
  tab.addEventListener("click", function () { showDay(index, false); });
  tab.addEventListener("keydown", function (event) {
    let target = -1;
    if (event.key === "ArrowRight") target = (index + 1) % days.length;
    if (event.key === "ArrowLeft") target = (index - 1 + days.length) % days.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = days.length - 1;
    if (target !== -1) {
      event.preventDefault();
      showDay(target, true);
    }
  });
});
previous.addEventListener("click", function () { showDay(activeDay - 1, false); });
next.addEventListener("click", function () { showDay(activeDay + 1, false); });

// Las fotos quedan visibles hasta que exista un archivo de video.
// No se envían solicitudes a servicios externos para reproducir los videos.
function installVideo(containerSelector, src) {
  if (!src) return;
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const poster = container.querySelector("img");
  const video = document.createElement("video");
  video.src = src;
  video.poster = poster ? poster.currentSrc || poster.src : "";
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute("aria-hidden", "true");
  container.replaceChildren(video);
  video.play().catch(function () { /* El poster permanece si el navegador bloquea autoplay. */ });
}
installVideo(".hero-media", CONFIG.heroVideo);

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  revealItems.forEach(function (item) { revealObserver.observe(item); });
} else {
  revealItems.forEach(function (item) { item.classList.add("is-visible"); });
}

const storyImage = document.getElementById("storyImage");
const storyTime = document.getElementById("storyTime");
const storyLabel = document.getElementById("storyLabel");
const storyVisual = document.querySelector(".night-visual");
const storySteps = Array.from(document.querySelectorAll(".night-step"));
let activeStoryImage = storyImage ? storyImage.getAttribute("src") : "";
let storyTimer = 0;

storySteps.forEach(function (step) {
  const source = step.dataset.image;
  if (source) {
    const preload = new Image();
    preload.src = source;
  }
});

function activateStory(step) {
  if (!step || !storyImage || !storyVisual) return;
  storySteps.forEach(function (item) {
    item.classList.toggle("is-active", item === step);
  });
  storyTime.textContent = step.dataset.time || "";
  storyLabel.textContent = step.dataset.label || "";
  storyImage.alt = step.dataset.alt || "";
  const nextImage = step.dataset.image;
  if (!nextImage || nextImage === activeStoryImage) return;
  window.clearTimeout(storyTimer);
  storyVisual.classList.add("is-switching");
  storyTimer = window.setTimeout(function () {
    storyImage.src = nextImage;
    activeStoryImage = nextImage;
    storyImage.addEventListener("load", function revealStoryImage() {
      storyVisual.classList.remove("is-switching");
    }, { once: true });
    window.setTimeout(function () {
      storyVisual.classList.remove("is-switching");
    }, 450);
  }, 170);
}

if ("IntersectionObserver" in window && storySteps.length) {
  const storyObserver = new IntersectionObserver(function (entries) {
    const visible = entries
      .filter(function (entry) { return entry.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
    if (visible.length) activateStory(visible[0].target);
  }, { rootMargin: "-26% 0px -46% 0px", threshold: [0.05, 0.25, 0.5] });
  storySteps.forEach(function (step) { storyObserver.observe(step); });
}

const faqItems = Array.from(document.querySelectorAll(".faq-list details"));
faqItems.forEach(function (item) {
  item.addEventListener("toggle", function () {
    if (!item.open) return;
    faqItems.forEach(function (other) {
      if (other !== item) other.open = false;
    });
  });
});
