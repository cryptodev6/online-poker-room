const header = document.getElementById('site-header');
const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 45);
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

const whatsappMessage = 'Hola Yoshi, quiero información para entrar a La Hermandad del Dinero con Alexander Voss. Quiero reservar mi lugar para la primera edición.';
const whatsappUrl = `https://wa.me/51929000877?text=${encodeURIComponent(whatsappMessage)}`;
document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = whatsappUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const sticky = document.querySelector('.mobile-sticky');
const syncSticky = () => sticky?.classList.toggle('show', window.scrollY > 620);
window.addEventListener('scroll', syncSticky, { passive: true });
syncSticky();
