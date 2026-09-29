(() => {
  'use strict';
  const status = document.getElementById('copy-status');
  let timer;
  const announce = (message) => {
    clearTimeout(timer);
    status.textContent = message;
    status.classList.add('visible');
    timer = setTimeout(() => status.classList.remove('visible'), 4500);
  };
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const input = document.getElementById(button.dataset.copy);
      let copied = false;
      try {
        await navigator.clipboard.writeText(input.value);
        copied = true;
      } catch (_) {
        input.focus();
        input.select();
        input.setSelectionRange(0, input.value.length);
        try { copied = document.execCommand('copy'); } catch (_) { /* Manual selection remains available. */ }
      }
      if (copied) {
        announce('Dirección copiada. Verifica la red antes de enviar.');
        button.focus({ preventScroll: true });
      } else {
        announce('Seleccionamos la dirección. Mantén pulsado o usa Ctrl+C para copiarla.');
      }
    });
  });
})();
