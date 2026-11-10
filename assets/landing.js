(() => {
  "use strict";

  document.body.classList.add("js");

  const CLUB_ID = "526745";
  const PHONE = "573007068986";

  // Popup automático del bono.
  // true = se muestra en cada visita/recarga.
  // false = solo se abre manualmente.
  const AUTO_PROMOS_ENABLED = false;
  const BONUS_MODAL_ENABLED = false; // Temporarily hide automatic and manual opening.

  const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const track = (event, extras = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...extras });
  };

  const now = new Date();
  const peruNow = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Lima",
      year: "numeric",
      month: "numeric",
      day: "numeric"
    })
      .formatToParts(now)
      .map(({ type, value }) => [type, value])
  );
  const peruToday = new Date(Date.UTC(
    Number(peruNow.year),
    Number(peruNow.month) - 1,
    Number(peruNow.day)
  ));
  const nextSession = Array.from({ length: 8 }, (_, dayOffset) => {
    const date = new Date(Date.UTC(
      Number(peruNow.year),
      Number(peruNow.month) - 1,
      Number(peruNow.day) + dayOffset
    ));
    const weekday = date.getUTCDay();
    const session = weekday === 2
      ? { hour: 9, games: "NL200 + PLO5 200", minimumBuyIn: "US$100" }
      : weekday === 5
        ? { hour: 13, games: "NL400 + PLO5 400", minimumBuyIn: "US$500" }
        : null;

    return session
      ? {
          ...session,
          date: new Date(Date.UTC(
            Number(peruNow.year),
            Number(peruNow.month) - 1,
            Number(peruNow.day) + dayOffset,
            session.hour + 5
          ))
        }
      : null;
  })
    .filter((session) => session && session.date > now)
    .sort((a, b) => a.date - b.date)[0];
  const sessionDateParts = Object.fromEntries(
    new Intl.DateTimeFormat("es-PE", {
      timeZone: "America/Lima",
      weekday: "long",
      day: "2-digit",
      month: "short"
    })
      .formatToParts(nextSession.date)
      .map(({ type, value }) => [type, value])
  );
  const NEXT_SESSION = {
    dateLabel: `${sessionDateParts.weekday} ${sessionDateParts.day} ${sessionDateParts.month}`.toLocaleUpperCase("es-PE"),
    time: `${String(nextSession.hour).padStart(2, "0")}:00`,
    games: nextSession.games,
    minimumBuyIn: nextSession.minimumBuyIn
  };

  document.getElementById("nextDate").textContent =
    NEXT_SESSION.dateLabel;

  document.querySelector(".panel-time b").textContent =
    NEXT_SESSION.time;

  document.querySelector(".panel-min strong").textContent =
    NEXT_SESSION.minimumBuyIn;

  document.querySelectorAll(".panel-games span").forEach((game, index) => {
    game.textContent = NEXT_SESSION.games.split(" + ")[index];
  });

  document.querySelectorAll("[data-timezone]").forEach((time) => {
    time.textContent = new Intl.DateTimeFormat("es-PE", {
      timeZone: time.dataset.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).format(nextSession.date);
  });

  const nextSessionMessage =
    `Hola, quiero unirme a la mesa del ${NEXT_SESSION.dateLabel.toLocaleLowerCase("es-PE")} ` +
    `a las ${NEXT_SESSION.time}, hora de Perú. ${NEXT_SESSION.games}. ` +
    `La entrada mínima es ${NEXT_SESSION.minimumBuyIn}. ¿Hay espacio?`;
  const nextSessionUrl =
    `https://wa.me/${PHONE}?text=${encodeURIComponent(nextSessionMessage)}`;
  document.querySelectorAll("[data-next-session]").forEach((link) => {
    link.href = nextSessionUrl;
  });
  document.getElementById("nextSessionMobile").textContent =
    `${NEXT_SESSION.dateLabel} · ${NEXT_SESSION.time} PERÚ · MÍN. ${NEXT_SESSION.minimumBuyIn}`;
  document.getElementById("nextGamesMobile").textContent =
    NEXT_SESSION.games;

  document.getElementById("year").textContent =
    new Date().getFullYear();

  const messages = {
    receipt: "Hola, compré fichas por Mercado Pago. Quiero enviar mi comprobante y mi ID de ClubGG para coordinar la acreditación.",
    seat: "Hola, quiero unirme a la mesa",
    friday: "Hola, quiero unirme a la mesa High Roller del viernes a las 13:00, hora de Perú. ¿Hay espacio? La entrada mínima es US$500.",
    join: "Hola, quiero unirme a las mesas privadas online de ClubGG. ¿Cómo ingreso?",
    details: "Hola, quiero jugar online. ¿Qué mesas y horarios tienen disponibles?",
    pro: "Hola, soy jugador regular y quiero consultar las condiciones de rakeback disponibles.",
    bonus: "Hola, quiero consultar los beneficios y bonos disponibles para jugadores.",
    payment: "Hola, quiero consultar los métodos de pago disponibles para jugar.",
    question: "Hola, tengo una pregunta sobre las mesas privadas.",
    support: "Hola, necesito ayuda para ingresar a ClubGG."
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

  if (BONUS_MODAL_ENABLED && bonusDialog) {
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
