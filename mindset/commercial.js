(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const cfg = window.vossConfig || {};
  const data = window.dataLayer = window.dataLayer || [];
  const track = (event, fields = {}) => {
    data.push({event, ...fields});
    // First-party integration point. Does not assume GA, Meta Pixel or a sale.
    window.dispatchEvent(new CustomEvent('voss:analytics', { detail:{event, ...fields} }));
  };
  const checkout = (typeof cfg.checkoutUrl === 'string' && /^https:\/\//i.test(cfg.checkoutUrl.trim())) ? cfg.checkoutUrl.trim() : '';
  const whatsapp = /^\d{8,15}$/.test(cfg.whatsappNumber || '')
    ? `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.messages?.launch || 'Hola, quisiera solicitar El juego detrás del juego.')}` : '';
  document.querySelectorAll('[data-purchase]').forEach(el => {
    const origin = el.dataset.purchase;
    if (checkout) {
      el.href = checkout;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      el.setAttribute('aria-label', `Continuar al checkout del libro desde ${origin} (abre otra pestaña)`);
      if (origin === 'offer') el.firstChild.textContent='Adquirir el libro ';
    } else if (whatsapp) {
      el.href = whatsapp;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      el.setAttribute('aria-label', `Solicitar el libro por WhatsApp desde ${origin} (abre otra pestaña; no realiza un pago)`);
    } else {
      el.href = '#novedades';
      el.setAttribute('aria-label', 'Consultar detalles del libro; compra no configurada');
    }
    el.addEventListener('click', () => track(checkout ? 'checkout_start' : 'purchase_inquiry', { origin, price_usd:27, destination: checkout ? 'checkout' : whatsapp ? 'whatsapp' : 'offer' }));
  });
  document.querySelectorAll('[data-contact]').forEach(el => {
    el.addEventListener('click', () => track('contact_click', {origin:el.dataset.contact || 'generic'}));
  });
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => track(el.dataset.track, {href:el.getAttribute('href')}));
  });
  document.querySelectorAll('.part__trigger').forEach((el,i) => {
    el.addEventListener('click', () => track('chapter_part_toggle', { part:i+1, will_open: el.getAttribute('aria-expanded') === 'false' }));
  });
  document.querySelectorAll('.faq details').forEach((details,i) => {
    details.addEventListener('toggle', () => {if (details.open) track('faq_open', {number:i+1});});
  });
  const range = $('#bluff-range'), value = $('#bluff-value'), ev = $('#ev-value'), advice=$('#ev-advice'), bar=$('#ev-bar');
  if(range && value && ev && advice && bar) {
    const update = () => {
      const bluff = Number(range.value);
      const result = bluff / 100 * 500 - (1 - bluff / 100) * 200;
      const signed = Math.abs(result) < .0001 ? '0' : `${result>0?'+':'−'}${Math.abs(result).toLocaleString('es-PE',{maximumFractionDigits:1})}`;
      value.textContent=`${bluff} %`;
      ev.textContent=signed;
      ev.classList.toggle('negative',result<0);
      advice.textContent=result>0.001?'Call':result < -.001?'Fold':'Indiferente';
      bar.style.width=`${bluff/60*100}%`;
      range.setAttribute('aria-valuetext',`${bluff} por ciento de faroles; EV de pagar ${signed}`);
    };
    range.addEventListener('input',update);
    range.addEventListener('change', () => track('ev_scenario_changed',{ bluff_pct:Number(range.value), call_ev:Number((Number(range.value)/100*700-200).toFixed(1)) }));
    update();
  }
  const floating = $('#mobile-purchase'), hero = $('#inicio'), footer = $('.site-footer');
  if (floating && hero && footer) {
    let ticking = false;
    const visible = () => {
      ticking=false;
      const afterHero = hero.getBoundingClientRect().bottom < window.innerHeight*.66;
      const beforeOfferEnd = footer.getBoundingClientRect().top > window.innerHeight * .4;
      const keyboardUp = !!(document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName));
      floating.classList.toggle('is-visible', afterHero && beforeOfferEnd && !keyboardUp);
    };
    const request=() => {if(!ticking){ticking=true;requestAnimationFrame(visible);}};
    window.addEventListener('scroll', request, {passive:true});
    window.addEventListener('resize', request, {passive:true});
    document.addEventListener('focusin',request); document.addEventListener('focusout',request);
    visible();
  }
})();
