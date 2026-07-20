// ============================================================
// VELARION PLATFORM — script.js
// Menú móvil + revelado de secciones al hacer scroll
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Menú móvil ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // --- Revelado al hacer scroll (Intersection Observer) ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: mostrar todo si no hay soporte
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // --- Header: sombra ligera al hacer scroll ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 8px 30px rgba(0,0,0,0.35)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // --- Formulario de contacto (sin backend conectado todavía) ---
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Mensaje listo para enviar';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2500);
      // Nota: este formulario aún no está conectado a un servicio de envío real.
    });
  }
});
