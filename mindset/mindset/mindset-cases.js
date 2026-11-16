/* Situaciones de mentalidad. Ejemplos de lectura, no un test ni un diagnóstico. */
(() => {
  'use strict';
  const controls = [...document.querySelectorAll('[data-mindset-case]')];
  const title = document.getElementById('mindset-case-title');
  const label = document.getElementById('mindset-case-label');
  const copy = document.getElementById('mindset-case-copy');
  const question = document.getElementById('mindset-case-question');
  if (!controls.length || !title || !label || !copy || !question) return;
  const cases = {
    fatiga: {
      label: 'FATIGA · A-GAME',
      title: 'La oportunidad sigue ahí. ¿Y tu capacidad de aprovecharla?',
      copy: 'Una mesa favorable no basta si empiezas a olvidar tamaños, perder el hilo de las manos o jugar en automático. El problema no es desconocer la estrategia; es que ya no estás utilizando todo lo que sabes.',
      question: '¿Qué señales concretas te harían interrumpir la sesión, aunque todavía hubiera dinero por ganar?'
    },
    perdida: {
      label: 'RESULTADO · DECISIÓN SIGUIENTE',
      title: 'El bote terminó. Tu necesidad de recuperarlo quizá no.',
      copy: 'Después de una pérdida importante puedes seguir tomando decisiones técnicamente defendibles, pero también puedes empezar a alargar la sesión para alcanzar una cifra que ya no existe. El saldo anterior deja de ser información y se convierte en una obligación emocional.',
      question: '¿Continuarías jugando el mismo tiempo si no hubieras perdido ese bote?'
    },
    ganancia: {
      label: 'UPSWING · CONFIANZA',
      title: 'Ganar puede hacer más difícil detectar lo que empeoró.',
      copy: 'Una buena racha permite sentirse capaz y puede premiar decisiones débiles. Si amplías mesas, cambias de límite o te expones a más riesgo, el resultado reciente no demuestra que esos cambios hayan sido correctos.',
      question: '¿Qué revisarías hoy si esa misma sesión hubiera terminado en pérdidas?'
    }
  };
  controls.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-mindset-case');
      const data = cases[id];
      if (!data) return;
      controls.forEach(b => {
        const selected = b === button;
        b.classList.toggle('is-active', selected);
        b.setAttribute('aria-pressed', String(selected));
      });
      label.textContent = data.label;
      title.textContent = data.title;
      copy.textContent = data.copy;
      question.textContent = data.question;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'mindset_scenario_view', scenario: id });
    });
  });
})();
