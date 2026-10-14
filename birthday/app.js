(() => {
'use strict';
const config = window.VOSS_CONFIG || {};
const messages = {
 estandar: 'Hola, quiero información sobre la habitación estándar de Voss Birthday Medellín 2026, del 7 al 21 de diciembre. ¿Me compartes disponibilidad, fotos y condiciones?',
 premium: 'Hola, quiero separar una habitación premium para Voss Birthday Medellín del 7 al 21 de diciembre de 2026. ¿Me compartes disponibilidad, fotos y condiciones?',
 disponibilidad: 'Hola Alexander, quiero ver disponibilidad para Voss Birthday Medellín 2026, del 7 al 21 de diciembre.',
 info: 'Hola, quiero más información sobre Voss Birthday Medellín 2026 y las condiciones de reserva.',
 fotos: 'Hola, quisiera ver fotos reales, ubicación y características de la casa y las habitaciones de Voss Birthday Medellín 2026.'
};
const contact = document.querySelector('#contact-dialog');
const number = String(config.whatsapp || '');
document.querySelectorAll('[data-wa]').forEach(a => {
 if (/^[1-9]\d{7,14}$/.test(number)) { a.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent(messages[a.dataset.wa]); a.target = '_blank'; a.rel = 'noopener noreferrer'; }
 else a.addEventListener('click', e => { e.preventDefault(); contact.showModal(); });
});
document.querySelectorAll('dialog').forEach(dialog => {
 dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
});
document.querySelector('#dialog-ok').addEventListener('click', () => contact.close());
const lightbox = document.querySelector('#photo-dialog');
document.querySelectorAll('[data-photo]').forEach(slot => {
 const src = config.photos?.[slot.dataset.photo]; if(!src) return;
 const image = new Image(); image.src = src; image.alt = slot.querySelector('.slot-index').textContent.replace(/^\d+ \/ /,''); image.loading = 'lazy';
 image.addEventListener('load',()=>{
  const label = image.alt; slot.replaceChildren(image); const caption=document.createElement('span'); caption.className='slot-index'; caption.textContent=label; slot.append(caption);
  slot.classList.add('has-photo'); slot.tabIndex=0; slot.setAttribute('role','button'); slot.setAttribute('aria-label','Ampliar fotografía: '+label);
  const open=()=>{lightbox.querySelector('img').src=src; lightbox.querySelector('img').alt=label; lightbox.querySelector('p').textContent=label; lightbox.showModal();};
  slot.addEventListener('click',open);slot.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
 });
});
// Corte real: 1 de noviembre, 00:00 de Colombia/Perú (UTC−5).
if(Date.now() >= Date.parse('2026-11-01T00:00:00-05:00')) {
 document.querySelector('#standard-price').textContent='US$1,000'; document.querySelector('#premium-price').textContent='US$1,400';
 ['#standard-usd','#premium-usd','#standard-normal','#premium-normal'].forEach(s=>document.querySelector(s).hidden=true);
 document.querySelector('#offer-label').textContent='Tarifa regular desde noviembre.';
 document.querySelector('.hero-price strong').textContent='Desde US$1,000'; document.querySelector('.hero-price small').textContent='Tarifa regular';document.querySelector('#mobile-price').textContent='Desde US$1,000';
}
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});
 document.querySelectorAll('.section-heading,.benefits article,.intro-grid,.room-card,.timeline article').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
}
})();
