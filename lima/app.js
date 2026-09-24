"use strict";

document.documentElement.classList.add("js");

const WHATSAPP_NUMBER = "573007068986";
const messages = {
  invite: "Hi Alexander, I'm interested in Voss Lima, October 7–21, 2026. Can you send me the private deck with the actual apartment photos, room availability, confirmed inclusions, price and terms?",
  residence: "Hi Alexander, I’m considering the Voss Lima poker residence, October 7–21. Can you send me the actual apartment and bedroom photos, amenities and availability?",
  question: "Hi Alexander, I have a question about Voss Lima, October 7–21, 2026."
};

document.querySelectorAll("[data-contact]").forEach((link) => {
  const key = link.dataset.contact;
  link.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(messages[key] || messages.invite);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const header = document.getElementById("siteHeader");
const progressBar = document.getElementById("scrollProgress");
const hero = document.querySelector(".hero");
const residencePan = document.getElementById("residencePan");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let scrollFrame = 0;

function paintScroll() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? window.scrollY / pageHeight : 0;
  progressBar.style.transform = "scaleX(" + Math.max(0, Math.min(1, progress)) + ")";
  header.classList.toggle("is-scrolled", window.scrollY > 12);
  if (!reducedMotion.matches) {
    const heroPart = Math.min(1, window.scrollY / Math.max(hero.offsetHeight, 1));
    hero.style.setProperty("--hero-zoom", (1 + heroPart * .055).toFixed(3));
    hero.style.setProperty("--hero-fade", (1 - heroPart * .35).toFixed(3));
    const box = residencePan.getBoundingClientRect();
    const relative = (window.innerHeight - box.top) / (window.innerHeight + box.height);
    const offset = Math.max(-28, Math.min(28, (relative - .5) * 55));
    residencePan.style.setProperty("--pan-offset", offset.toFixed(1) + "px");
  }
  scrollFrame = 0;
}
function requestPaint() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(paintScroll);
}
paintScroll();
window.addEventListener("scroll", requestPaint, { passive: true });
window.addEventListener("resize", requestPaint);

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("siteNav");
function closeMenu() {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("menu-open");
}
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      self.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -7% 0px", threshold: .07 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const nightSteps = Array.from(document.querySelectorAll(".night-step"));
const nightVisual = document.querySelector(".nights-visual");
const nightImage = document.getElementById("nightImage");
const nightClock = document.getElementById("nightClock");
const nightCaption = document.getElementById("nightCaption");
const nightImageNote = document.getElementById("nightImageNote");
let currentNightSource = nightImage.getAttribute("src");
let imageTimer = 0;

nightSteps.forEach((step) => {
  const preload = new Image();
  preload.src = step.dataset.img;
});
function activateNight(step) {
  if (!step) return;
  nightSteps.forEach((item) => item.classList.toggle("is-active", item === step));
  nightClock.textContent = step.dataset.clock || "";
  nightCaption.textContent = step.dataset.caption || "";
  nightImageNote.textContent = step.dataset.note || "";
  const next = step.dataset.img;
  if (!next || next === currentNightSource) return;
  clearTimeout(imageTimer);
  nightVisual.classList.add("is-switching");
  imageTimer = window.setTimeout(() => {
    nightImage.src = next;
    nightImage.alt = step.dataset.alt || "";
    currentNightSource = next;
    nightImage.addEventListener("load", () => nightVisual.classList.remove("is-switching"), { once: true });
    window.setTimeout(() => nightVisual.classList.remove("is-switching"), 550);
  }, 160);
}
if ("IntersectionObserver" in window && nightSteps.length) {
  const nightObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible.length) activateNight(visible[0].target);
  }, { rootMargin: "-22% 0px -46% 0px", threshold: [.05, .25, .5] });
  nightSteps.forEach((step) => nightObserver.observe(step));
}

const faqItems = document.querySelectorAll(".faq-list details");
faqItems.forEach((item) => item.addEventListener("toggle", () => {
  if (!item.open) return;
  faqItems.forEach((other) => { if (other !== item) other.open = false; });
}));
