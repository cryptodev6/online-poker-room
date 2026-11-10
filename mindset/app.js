(() => {
  "use strict";

  const content = window.mindsetContent;
  const partsList = document.getElementById("parts-list");

  document.getElementById("current-year").textContent = String(new Date().getFullYear());

  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.getElementById("primary-nav");
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    primaryNav.classList.toggle("is-open", !expanded);
  });
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    });
  });

  const syllabus = document.getElementById("syllabus-chapters");
  const syllabusContent = content.syllabusGroups;
  syllabusContent.forEach((group, index) => {
    const section = document.createElement("article");
    section.className = "syllabus-set";
    section.dataset.syllabusIndex = String(index);

    const label = document.createElement("p");
    label.className = "eyebrow";
    label.textContent = group.label;
    const topics = document.createElement("ol");
    topics.className = "syllabus-set__topics";
    group.topics.forEach(([chapterNumber, topic]) => {
      const item = document.createElement("li");
      item.className = "syllabus-topic";
      const number = document.createElement("span");
      number.className = "syllabus-topic__chapter";
      number.textContent = `CAPÍTULO ${chapterNumber}`;
      const title = document.createElement("h3");
      title.textContent = topic;
      item.append(number, title);
      topics.append(item);
    });
    section.append(label, topics);
    syllabus.append(section);
  });

  const syllabusImages = [...document.querySelectorAll("[data-syllabus-image]")];
  const syllabusCaption = document.querySelector(".syllabus__caption-label");
  const syllabusCounter = document.querySelector(".syllabus__caption-index");
  function activateSyllabusGroup(index) {
    const group = syllabusContent[index];
    if (!group) return;
    syllabusImages.forEach((image, imageIndex) => {
      const active = imageIndex === index;
      image.classList.toggle("is-active", active);
      image.setAttribute("aria-hidden", String(!active));
    });
    document.querySelectorAll("[data-syllabus-index]").forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
    });
    syllabusCaption.textContent = group.label;
    syllabusCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(syllabusContent.length).padStart(2, "0")}`;
  }
  activateSyllabusGroup(0);
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("has-syllabus-observer");
    const syllabusObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activateSyllabusGroup(Number(entry.target.dataset.syllabusIndex));
      });
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
    document.querySelectorAll("[data-syllabus-index]").forEach((item) => syllabusObserver.observe(item));
  }

  const scene = document.querySelector(".dual-scene");
  const sceneCaption = document.querySelector(".scene-caption__text");
  const sceneCaptions = {
    visible: "Lo que cualquiera puede ver",
    invisible: "La lógica debajo de cada acción",
    human: "La persona detrás de la decisión"
  };
  document.querySelectorAll("[data-scene-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = button.dataset.sceneStep;
      scene.dataset.scene = step;
      sceneCaption.textContent = sceneCaptions[step];
      document.querySelector('.scene-caption b').textContent = ({visible:'01', invisible:'02', human:'03'})[step];
      document.querySelectorAll("[data-scene-step]").forEach((control) => {
        control.setAttribute("aria-pressed", String(control === button));
      });
    });
  });

  content.parts.forEach((part, index) => {
    const article = document.createElement("article");
    article.className = "part";
    const trigger = document.createElement("button");
    const panelId = `part-panel-${index + 1}`;
    trigger.className = "part__trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", panelId);

    const roman = document.createElement("span");
    roman.className = "part__roman";
    roman.textContent = part.roman;
    const title = document.createElement("span");
    title.className = "part__title";
    title.textContent = part.title;
    const count = document.createElement("span");
    count.className = "part__count";
    count.textContent = `${String(part.chapters.length).padStart(2, "0")} CAPÍTULOS`;
    const toggle = document.createElement("span");
    toggle.className = "part__toggle";
    toggle.setAttribute("aria-hidden", "true");
    toggle.textContent = "+";
    trigger.append(roman, title, count, toggle);

    const panel = document.createElement("div");
    panel.className = "part__panel";
    panel.id = panelId;
    panel.dataset.open = "false";
    panel.hidden = true;
    const panelInner = document.createElement("div");
    panelInner.className = "part__panel-inner";
    const chapters = document.createElement("div");
    chapters.className = "part__chapters";
    part.chapters.forEach(([number, chapterTitle, description]) => {
      const chapter = document.createElement("article");
      chapter.className = "chapter";
      const chapterNumber = document.createElement("span");
      chapterNumber.className = "chapter__number";
      chapterNumber.textContent = number;
      const chapterCopy = document.createElement("div");
      const heading = document.createElement("h3");
      heading.textContent = chapterTitle;
      const summary = document.createElement("p");
      summary.textContent = description;
      chapterCopy.append(heading, summary);
      chapter.append(chapterNumber, chapterCopy);
      chapters.append(chapter);
    });
    panelInner.append(chapters);
    panel.append(panelInner);
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.dataset.open = String(!expanded);
      panel.hidden = expanded;
    });
    article.append(trigger, panel);
    partsList.append(article);
  });

  const handTable = document.querySelector(".hand-table");
  const revealButton = document.getElementById("reveal-river");
  revealButton.addEventListener("click", () => {
    if (handTable.dataset.revealed === 'true') {
      handTable.dataset.revealed = 'false';
      revealButton.innerHTML = 'Revelar el river <span aria-hidden="true">↗</span>';
      document.getElementById('river-card').setAttribute('aria-label', 'River oculto');
      document.getElementById('river-status').textContent = 'RIVER POR REVELAR';
      document.getElementById('decision-outcome').innerHTML = '<span>ANTES DEL RIVER</span>La ventaja matemática no es una promesa de victoria.';
      return;
    }
    handTable.dataset.revealed = "true";
    revealButton.innerHTML = "Volver al turn <span aria-hidden=\"true\">↺</span>";
    document.getElementById("river-card").setAttribute("aria-label", "Cinco de picas");
    document.getElementById("river-status").textContent = "RIVER · 5♠";
    const outcome = document.getElementById("decision-outcome");
    outcome.innerHTML = "<span>DESPUÉS DEL RIVER</span>El 5♠ completa el color del rival. La mano con mayor equity pierde.";
  });

  // Contact links use one confirmed destination and contextual messages.
  const config = window.vossConfig;
  document.querySelectorAll('[data-contact]').forEach(link => {
    const message = config?.messages[link.dataset.contact];
    if (!/^\d{8,15}$/.test(config?.whatsappNumber || '') || !message) {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      return;
    }
    link.href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${link.textContent.trim()} por WhatsApp (abre otra pestaña)`);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
    }
  });

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const journeyImages = [...document.querySelectorAll('.journey-image')];
  const artCaption = document.querySelector('.art-caption');
  const cards = [...document.querySelectorAll('[data-frame]')];
  const progress = document.querySelector('.reading-progress span');
  const heroPhoto = document.querySelector('.hero-photo');
  const hero = document.querySelector('.hero');
  let scheduled = false;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (!reducedMotion.matches && innerWidth > 900) {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0) heroPhoto.style.transform = `translate3d(0,${Math.min(scrollY * .12, 90)}px,0) scale(1.08)`;
    } else heroPhoto.style.transform = 'none';
    let active = 0;
    cards.forEach((card,index) => {if(card.getBoundingClientRect().top < innerHeight * .56) active = index;});
    journeyImages.forEach((image,index) => image.classList.toggle('is-active', index === active));
    artCaption.textContent = active ? 'II / LA EJECUCIÓN' : 'I / LA REFERENCIA';
    scheduled = false;
  }
  function requestScroll() {if(!scheduled) {scheduled = true; requestAnimationFrame(updateScroll);}}
  addEventListener('scroll', requestScroll, {passive:true});
  addEventListener('resize', requestScroll, {passive:true});
  reducedMotion.addEventListener('change', requestScroll);
  updateScroll();

  // Progressive enhancement: content is never hidden without a working observer.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          reveal.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    document.querySelectorAll('.perspective__intro, .decision__heading, .book-index__heading, .excerpt__book, .author__copy, .signup__copy, .closing h2').forEach(el => {
      el.classList.add('reveal');
      reveal.observe(el);
    });
  }
})();
