(() => {
  "use strict";

  document.body.classList.add("js");
  const CLUB_ID = "598956";
  const PHONE = "573007068986";
  // Ponlo en false para desactivar la apertura automática de ambos popups.
  // En true se muestran en cada visita o recarga; no se guarda ninguna preferencia.
  const AUTO_PROMOS_ENABLED = true;
  const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const track = (event, extras = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...extras });
  };

  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima", year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", hourCycle: "h23"
  }).formatToParts(new Date());
  const get = (name) => Number(dateParts.find((part) => part.type === name).value);
  const today = Date.UTC(get("year"), get("month") - 1, get("day"));
  let nextSession;
  for (let offset = 0; offset < 8; offset += 1) {
    const candidate = new Date(today + offset * 86400000);
    if ([2, 4].includes(candidate.getUTCDay()) && (offset > 0 || get("hour") < 18)) {
      nextSession = candidate;
      break;
    }
  }
  const dateLabel = new Intl.DateTimeFormat("es-PE", {
    timeZone: "UTC", weekday: "long", day: "numeric", month: "long"
  }).format(nextSession);
  document.getElementById("nextDate").textContent = dateLabel.toLocaleUpperCase("es-PE");
  document.getElementById("year").textContent = new Date().getFullYear();

  const messages = {
    seat: "Hola, quiero jugar la mesa de Voss Room del " + dateLabel + " en el club " + CLUB_ID + ". ¿Hay asiento en NL200 o PLO5 200? Entiendo que la entrada mínima es US$500. Envíame las condiciones, rake y forma de ingreso.",
    sunday: "Hola, quiero consultar la mesa High Roller del domingo de Voss Room: NL400 o PLO500, entrada mínima US$1.000. ¿A qué hora empieza y hay asiento?",
    join: "Hola, quiero unirme a Voss Room. ¿Cómo encuentro el Club ID " + CLUB_ID + " y qué mesas están disponibles?",
    details: "Hola, quiero conocer las mesas, entradas mínimas, rake y asientos de la próxima sesión en Voss Room.",
    pro: "Hola, juego póker online con mucho volumen y quiero consultar si hay condiciones individuales de rakeback para mi juego en Voss Room, ClubGG " + CLUB_ID + ". Juego [NL/PLO5], límites [indica tus límites] y mi volumen aproximado es [indica tu volumen]. Entiendo que un acuerdo de rakeback no se combina con el bono de bienvenida.",
    bonus: "Hola, quiero consultar y reclamar el bono del 25% sobre mi primer depósito elegible. Antes de depositar US$1.000, confírmame si recibiría US$250 adicionales y todas las condiciones de uso y retiro.",
    payment: "Hola, quiero conocer los medios de pago vigentes y el plazo real de retiro antes de ingresar saldo en Voss Room.",
    question: "Hola, tengo una pregunta sobre las mesas de Voss Room.",
    support: "Hola, necesito ayuda con mi acceso al club Voss Room."
  };
  document.querySelectorAll("[data-wa]").forEach((link) => {
    const purpose = link.dataset.wa;
    link.href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(messages[purpose] || messages.seat);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.addEventListener("click", () => {
      track("whatsapp_click", { purpose });
      if (purpose === "bonus" && bonusDialog.open) bonusDialog.close("engaged");
    });
  });
  document.querySelectorAll("[data-event]").forEach((link) => {
    link.addEventListener("click", () => track(link.dataset.event));
  });

  const menu = document.getElementById("navLinks");
  const toggle = document.getElementById("menuToggle");
  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  };
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  menu.querySelectorAll("a, button[data-open-bonus]").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const header = document.getElementById("header");
  const progress = document.getElementById("scrollProgress");
  let raf = 0;
  const updateScroll = () => {
    raf = 0;
    header.classList.toggle("scrolled", window.scrollY > 30);
    const remaining = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (remaining > 0 ? Math.min(100, window.scrollY / remaining * 100) : 0) + "%";
  };
  window.addEventListener("scroll", () => {
    if (!raf) raf = requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();

  if ("IntersectionObserver" in window && !motionOff) {
    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          reveal.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -5% 0px", threshold: .07 });
    document.querySelectorAll("[data-reveal]").forEach((element) => reveal.observe(element));

    const scenes = document.querySelectorAll("[data-scene]");
    const sceneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const night = entry.target.dataset.scene === "night";
        document.getElementById("worldBeach").classList.toggle("is-active", !night);
        document.getElementById("worldNight").classList.toggle("is-active", night);
      });
    }, { rootMargin: "-35% 0px -35% 0px", threshold: 0 });
    scenes.forEach((element) => sceneObserver.observe(element));
  } else {
    document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("visible"));
  }

  const toast = document.getElementById("toast");
  let toastTimer;
  document.getElementById("copyId").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CLUB_ID);
    } catch (_) {
      const field = document.createElement("textarea");
      field.value = CLUB_ID;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    toast.textContent = "Club ID copiado: " + CLUB_ID;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
    track("club_id_copy");
  });

  const bonusDialog = document.getElementById("bonusDialog");
  const limaDialog = document.getElementById("limaDialog");
  let sequenceActive = false;
  const closeOnBackdrop = (dialog, result) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close(result);
    });
  };
  closeOnBackdrop(bonusDialog, "dismissed");
  closeOnBackdrop(limaDialog, "dismissed");
  document.querySelectorAll("[data-close-bonus]").forEach((button) => {
    button.addEventListener("click", () => bonusDialog.close("dismissed"));
  });
  document.querySelectorAll("[data-close-lima]").forEach((button) => {
    button.addEventListener("click", () => limaDialog.close("dismissed"));
  });
  document.querySelectorAll("[data-open-bonus]").forEach((button) => {
    button.addEventListener("click", () => {
      sequenceActive = false;
      if (!bonusDialog.open) bonusDialog.showModal();
      track("bonus_reopened");
    });
  });
  bonusDialog.addEventListener("close", () => {
    if (!sequenceActive) return;
    sequenceActive = false;
    if (bonusDialog.returnValue === "engaged") return;
    setTimeout(() => {
      if (!limaDialog.open) {
        limaDialog.showModal();
        track("lima_modal_view");
      }
    }, 420);
  });
  const showAutoOffer = () => {
    if (!AUTO_PROMOS_ENABLED || bonusDialog.open || limaDialog.open) return;
    sequenceActive = true;
    bonusDialog.showModal();
    track("bonus_modal_view");
  };
  setTimeout(showAutoOffer, 1600);
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) setTimeout(showAutoOffer, 450);
  });
})();
