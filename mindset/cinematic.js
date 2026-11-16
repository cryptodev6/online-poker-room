/* Scroll cinematográfico progresivo. No interfiere con los eventos de app.js. */
(() => {
  'use strict';
  const root = document.getElementById('perspectiva');
  const experience = root?.querySelector('.film__experience');
  if (!experience || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const beats = Array.from(root.querySelectorAll('[data-film-step]'));
  const frames = Array.from(root.querySelectorAll('[data-film-frame]'));
  const time = root.querySelector('.film__stage-time');
  const count = root.querySelector('.film__stage-count');
  const progress = root.querySelector('.film__progress span');
  const flashback = root.querySelector('.film__flashback');
  const reprise = root.querySelector('.film__reprise');
  if (beats.length !== frames.length || !beats.length) return;
  document.documentElement.classList.add('has-cinematic-js');
  let pending = false;
  let lastActive = -1;
  let positions = [];

  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

  function measure() {
    const scrolled = window.scrollY;
    positions = beats.map(el => {
      const r = el.getBoundingClientRect();
      return { start: scrolled + r.top, height: r.height };
    });
    request();
  }

  function render() {
    pending = false;
    if (!positions.length) return;
    const anchor = window.scrollY + window.innerHeight * (window.innerWidth < 701 ? .54 : .50);
    let active = 0;
    for (let i = 1; i < positions.length; i++) {
      if (anchor >= positions[i].start) active = i;
      else break;
    }
    const current = positions[active];
    const local = clamp((anchor - current.start) / Math.max(1, current.height));
    // Dissolve the next photographic plate over the final 26% of the beat.
    const dissolve = clamp((local - .74) / .26);
    for (let i = 0; i < frames.length; i++) {
      let opacity = i === active ? 1 : i === active + 1 ? dissolve : 0;
      if (i === active && active < frames.length - 1) opacity = 1 - dissolve;
      frames[i].style.setProperty('--frame-opacity', opacity.toFixed(3));
      if (opacity > .001) frames[i].style.setProperty('--film-scale', (1.045 + local * .025).toFixed(4));
    }
    // Visual memory: first revisit the forgotten turn, then dissolve the original lineup.
    if (flashback) {
      const fadeIn = clamp(local / .20);
      const fadeOut = 1 - clamp((local - .56) / .26);
      flashback.style.opacity = active === 10 ? String((fadeIn * fadeOut).toFixed(3)) : '0';
    }
    if (reprise) {
      reprise.style.opacity = active === 11 ? String((1 - clamp((local - .08) / .72)).toFixed(3)) : '0';
    }
    if (lastActive !== active) {
      beats.forEach((beat,i) => {
        beat.classList.toggle('is-active', i === active);
        beat.classList.toggle('is-near', i === active + 1 && dissolve > .5);
      });
      const actTime = beats[active].querySelector('time')?.textContent || '';
      time.textContent = actTime;
      count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(beats.length).padStart(2, '0')}`;
      lastActive = active;
    }
    const start = positions[0].start;
    const last = positions[positions.length - 1];
    const end = last.start + last.height;
    const overall = clamp((anchor - start) / Math.max(1, end - start));
    progress.style.width = `${(overall * 100).toFixed(2)}%`;
  }

  function request() {
    if (!pending) {
      pending = true;
      window.requestAnimationFrame(render);
    }
  }
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(measure) : null;
  resizeObserver?.observe(experience);
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('pageshow', measure);
  document.fonts?.ready?.then(measure);
  measure();
})();
