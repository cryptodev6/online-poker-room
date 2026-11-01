const header = document.getElementById('site-header');
const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 45);
window.addEventListener('scroll', syncHeader, { passive: true }); syncHeader();
// The CTA source travels in the WhatsApp message, even without JavaScript.
document.querySelectorAll('[data-whatsapp]').forEach(link => {
 link.addEventListener('click', () => { if (Array.isArray(window.dataLayer)) window.dataLayer.push({event:'whatsapp_click',cta_source:link.dataset.whatsapp}); });
});
// Absolute campaign deadline: Lima (UTC-5). Never resets on reload.
if(Date.now() >= Date.parse('2026-11-01T00:00:00-05:00')) {
 document.querySelectorAll('.deadline-copy').forEach(el => el.textContent='Inscripciones de esta edición cerradas');
 document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href='https://wa.me/51929000877?text='+encodeURIComponent('Hola Yoshi, quiero información sobre la próxima edición de La Hermandad del Dinero. (Referencia: '+link.dataset.whatsapp+')');
 });
}
