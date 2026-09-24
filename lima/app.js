"use strict";

document.documentElement.classList.add("js");

const WHATSAPP_NUMBER = "573007068986";
const messages = {
  invite: "Hi Alexander, I'm interested in Voss Lima, October 7–21, 2026. Can you send availability for both stays, the real apartment photos, confirmed inclusions, and payment and cancellation terms?",
  duo: "Hi Alexander, I'm interested in the Voss Lima two-player apartment at US$1,000 per person for October 7–21, 2026. Is a room available? Please send the actual property and bedroom photos, inclusions and terms.",
  house: "Hi Alexander, I'm interested in Voss House, the three-player premium apartment at US$1,499 per person for October 7–21, 2026. Is a room available? Please send the real property photos, inclusions and terms.",
  residence: "Hi Alexander, I'm considering Voss Lima, October 7–21. Can you show me the actual photos, room layouts and amenities for the two-player apartment and Voss House?",
  nights: "Hi Alexander, I'm interested in Voss Lima, October 7–21, 2026. What are the two stays, and what nightlife plans are you putting together for the group? Please send the real apartment photos, availability and terms.",
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
const tournament = document.querySelector(".tournament-section");
const city = document.querySelector(".city-section");
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
    const tournamentBox = tournament.getBoundingClientRect();
    if (tournamentBox.bottom > 0 && tournamentBox.top < window.innerHeight) {
      const passage = (window.innerHeight - tournamentBox.top) / (window.innerHeight + tournamentBox.height);
      tournament.style.setProperty("--tournament-shift", ((passage - .5) * 48).toFixed(1) + "px");
    }
    const cityBox = city.getBoundingClientRect();
    if (cityBox.bottom > 0 && cityBox.top < window.innerHeight) {
      const passage = Math.max(0, Math.min(1, (window.innerHeight - cityBox.top) / (window.innerHeight + cityBox.height)));
      city.style.setProperty("--city-zoom", (1.06 + passage * .045).toFixed(3));
      city.style.setProperty("--city-shift", ((passage - .5) * 38).toFixed(1) + "px");
    }
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
let nightFrame = 0;
let activeNight = nightSteps[0];
const desktopNightMedia = window.matchMedia("(min-width: 901px) and (pointer: fine)");

nightSteps.forEach((step) => {
  const preload = new Image();
  preload.src = step.dataset.img;
});
function activateNight(step) {
  if (!step) return;
  if (step !== activeNight) {
    activeNight = step;
    nightSteps.forEach((item) => item.classList.toggle("is-active", item === step));
    nightVisual.style.setProperty("--night-progress", String((nightSteps.indexOf(step) + 1) / nightSteps.length));
    nightClock.textContent = step.dataset.clock || "";
    nightCaption.textContent = step.dataset.caption || "";
    nightImageNote.textContent = step.dataset.note || "";
  }
  const next = step.dataset.img;
  clearTimeout(imageTimer);
  if (!next || next === currentNightSource) {
    nightVisual.classList.remove("is-switching");
    return;
  }
  if (reducedMotion.matches) {
    nightImage.src = next;
    nightImage.alt = step.dataset.alt || "";
    currentNightSource = next;
    return;
  }
  nightVisual.classList.add("is-switching");
  imageTimer = window.setTimeout(() => {
    nightImage.src = next;
    nightImage.alt = step.dataset.alt || "";
    currentNightSource = next;
    nightImage.addEventListener("load", () => nightVisual.classList.remove("is-switching"), { once: true });
    window.setTimeout(() => nightVisual.classList.remove("is-switching"), 550);
  }, 160);
}
function updateNightFromScroll() {
  nightFrame = 0;
  if (!desktopNightMedia.matches) {
    clearTimeout(imageTimer);
    nightVisual.classList.remove("is-switching");
    return;
  }
  const story = document.querySelector(".nights-story");
  const bounds = story.getBoundingClientRect();
  if (bounds.top >= window.innerHeight || bounds.bottom <= 0) return;
  const focus = window.innerHeight * .44;
  let selected = nightSteps[0];
  nightSteps.forEach((step) => {
    if (step.getBoundingClientRect().top <= focus) selected = step;
  });
  activateNight(selected);
}
function requestNightUpdate() {
  if (!nightFrame) nightFrame = window.requestAnimationFrame(updateNightFromScroll);
}
if (nightSteps.length) {
  updateNightFromScroll();
  window.addEventListener("scroll", requestNightUpdate, { passive: true });
  window.addEventListener("resize", requestNightUpdate);
  desktopNightMedia.addEventListener("change", requestNightUpdate);
}

const faqItems = document.querySelectorAll(".faq-list details");
faqItems.forEach((item) => item.addEventListener("toggle", () => {
  if (!item.open) return;
  faqItems.forEach((other) => { if (other !== item) other.open = false; });
}));
