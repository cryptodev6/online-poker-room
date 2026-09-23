const header = document.getElementById('site-header');
const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();
