(() => {
  "use strict";

  document.body.classList.add("js");

  const CLUB_ID = "598956";
  const PHONE = "573007068986";

  // Popup automático del bono.
  // true = se muestra en cada visita/recarga.
  // false = solo se abre manualmente.
  const AUTO_PROMOS_ENABLED = true;

  const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const track = (event, extras = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...extras });
  };

  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    hourCycle: "h23"
  }).formatToParts(new Date());

  const get = (name) =>
    Number(dateParts.find((part) => part.type === name).value);

  const today = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day")
  );

  let nextSession;

  for (let offset = 0; offset < 8; offset += 1) {
    const candidate = new Date(today + offset * 86400000);

    if (
      [2, 4].includes(candidate.getUTCDay()) &&
      (offset > 0 || get("hour") < 18)
    ) {
      nextSession = candidate;
      break;
    }
  }

  const dateLabel = new Intl.DateTimeFormat("es-PE", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(nextSession);

  document.getElementById("nextDate").textContent =
    dateLabel.toLocaleUpperCase("es-PE");

  document.getElementById("year").textContent =
    new Date().getFullYear();

  const messages = {
    receipt: "Hola, compré fichas de Voss Room por Mercado Pago. Quiero enviar mi comprobante y mi ID de ClubGG para coordinar la acreditación.",
    seat: "Hola, quiero unirme a la mesa de Voss Room. ¿Hay espacio?",
    sunday: "Hola, quiero unirme a la mesa High Roller del domingo. ¿Hay espacio?",
    join: "Hola, quiero unirme a Voss Room. ¿Cómo entro?",
    details: "Hola, quiero jugar en Voss Room. ¿Qué mesas tienen disponibles?",
    pro: "Hola, quiero jugar en Voss Room. Soy jugador regular y quiero conversar sobre condiciones para mi volumen.",
    bonus: "Hola, quiero unirme a Voss Room y consultar el bono de bienvenida.",
    payment: "Hola, quiero unirme a Voss Room. ¿Qué métodos de pago tienen?",
    question: "Hola, tengo una pregunta sobre Voss Room.",
    support: "Hola, necesito ayuda para entrar a Voss Room."
  };

  const bonusDialog = document.getElementById("bonusDialog");
  const bonusNudge = document.getElementById("bonusNudge");
  let nudgeDismissed = false;
  let nudgeTimer;

  const hideBonusNudge = () => {
    if (!bonusNudge) return;
    clearTimeout(nudgeTimer);
    bonusNudge.hidden = true;
    bonusNudge.classList.remove("is-visible", "is-settled");
  };

  const showBonusNudge = () => {
    if (!bonusNudge || nudgeDismissed) return;
    bonusNudge.hidden = false;
    bonusNudge.classList.add("is-visible");
    nudgeTimer = setTimeout(() => {
      bonusNudge.classList.add("is-settled");
    }, 4500);
    track("bonus_nudge_view");
  };

  bonusNudge?.querySelector(".bonus-nudge__close")?.addEventListener("click", () => {
    nudgeDismissed = true;
    hideBonusNudge();
    track("bonus_nudge_dismissed");
  });

  bonusNudge?.querySelector(".bonus-nudge__main")?.addEventListener("click", () => {
    track("sports_bonus_nudge_click", { destination: "/casino/" });
  });

  document.querySelectorAll("[data-wa]").forEach((link) => {
    const purpose = link.dataset.wa;

    link.href =
      "https://wa.me/" +
      PHONE +
      "?text=" +
      encodeURIComponent(messages[purpose] || messages.seat);

    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.addEventListener("click", () => {
      track("whatsapp_click", { purpose });

      if (
        purpose === "bonus" &&
        bonusDialog &&
        bonusDialog.open
      ) {
        bonusDialog.close("engaged");
      }
    });
  });

  document.querySelectorAll("[data-event]").forEach((link) => {
    link.addEventListener("click", () => {
      track(link.dataset.event);
    });
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
    toggle.setAttribute(
      "aria-label",
      open ? "Cerrar menú" : "Abrir menú"
    );
  });

  menu
    .querySelectorAll("a, button[data-open-bonus]")
    .forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  const header = document.getElementById("header");
  const progress = document.getElementById("scrollProgress");

  let raf = 0;

  const updateScroll = () => {
    raf = 0;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

    const remaining =
      document.documentElement.scrollHeight -
      window.innerHeight;

    progress.style.width =
      (
        remaining > 0
          ? Math.min(
              100,
              (window.scrollY / remaining) * 100
            )
          : 0
      ) + "%";
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!raf) {
        raf = requestAnimationFrame(updateScroll);
      }
    },
    { passive: true }
  );

  updateScroll();

  if ("IntersectionObserver" in window && !motionOff) {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            reveal.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: "0px 0px -5% 0px",
        threshold: 0.07
      }
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => reveal.observe(element));

    const scenes =
      document.querySelectorAll("[data-scene]");

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const night =
            entry.target.dataset.scene === "night";

          document
            .getElementById("worldBeach")
            .classList.toggle("is-active", !night);

          document
            .getElementById("worldNight")
            .classList.toggle("is-active", night);
        });
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0
      }
    );

    scenes.forEach((element) =>
      sceneObserver.observe(element)
    );
  } else {
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) =>
        element.classList.add("visible")
      );
  }

  const toast = document.getElementById("toast");
  let toastTimer;

  document
    .getElementById("copyId")
    .addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CLUB_ID);
      } catch (_) {
        const field =
          document.createElement("textarea");

        field.value = CLUB_ID;
        field.style.position = "fixed";
        field.style.opacity = "0";

        document.body.appendChild(field);

        field.select();
        document.execCommand("copy");
        field.remove();
      }

      toast.textContent =
        "Club ID copiado: " + CLUB_ID;

      toast.classList.add("show");

      clearTimeout(toastTimer);

      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 2000);

      track("club_id_copy");
    });

  // ==================================================
  // POPUP DE BONO
  // ==================================================

  if (bonusDialog) {
    bonusDialog.addEventListener("cancel", () => {
      bonusDialog.returnValue = "dismissed";
    });

    bonusDialog.addEventListener("close", () => {
      if (bonusDialog.returnValue !== "engaged") {
        showBonusNudge();
      }
    });

    bonusDialog.addEventListener("click", (event) => {
      if (event.target === bonusDialog) {
        bonusDialog.close("dismissed");
      }
    });

    document
      .querySelectorAll("[data-close-bonus]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          bonusDialog.close("dismissed");
        });
      });

    document
      .querySelectorAll("[data-open-bonus]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          if (!bonusDialog.open) {
            hideBonusNudge();
            bonusDialog.returnValue = "";
            bonusDialog.showModal();
            track("bonus_reopened");
          }
        });
      });

    const showAutoOffer = () => {
      if (
        !AUTO_PROMOS_ENABLED ||
        bonusDialog.open
      ) {
        return;
      }

      hideBonusNudge();
      bonusDialog.returnValue = "";
      bonusDialog.showModal();
      track("bonus_modal_view");
    };

    setTimeout(showAutoOffer, 1600);

    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        setTimeout(showAutoOffer, 450);
      }
    });
  }
})();
