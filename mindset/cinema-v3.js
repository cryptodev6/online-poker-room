/* Cinematic v3. Progressive enhancements only; no editorial or commercial content changes. */
(() => {
  'use strict';
  const sections = document.querySelectorAll('main > section');
  const backgrounds = ['pilares','temario','laboratorio','marco','decision','libro','riesgo','fragmento','autor','novedades'];
  for (const section of sections) {
    if (!backgrounds.includes(section.id) && !section.classList.contains('faq')) continue;
    section.classList.add('has-cinema-environment');
    const layer = document.createElement('div');
    layer.className = 'cinema-environment';
    layer.setAttribute('aria-hidden','true');
    const image = document.createElement('div');
    image.className='cinema-environment__image';
    const grain = document.createElement('div');
    grain.className='cinema-environment__texture';
    layer.append(image,grain);
    section.insertBefore(layer,section.firstChild);
  }
  document.getElementById('riesgo')?.classList.add('cinema-veil');
  document.getElementById('autor')?.classList.add('cinema-veil');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll('.has-cinema-environment .section-kicker, .has-cinema-environment h2, .film__opening h2, .film__epilogue h3')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, {threshold:0.08,rootMargin:'0px 0px 45px 0px'});
  for (const element of targets) {
    element.classList.add('v3-entrance');
    observer.observe(element);
  }
  document.documentElement.classList.add('has-cinema-v3');
})();
