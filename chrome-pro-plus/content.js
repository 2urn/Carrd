// 2urn · Carrd Chrome Pro+ v1.1
(function() {
  'use strict';
  const header = document.querySelector('#header, header, .header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    header.classList.toggle('is-shrunk', scrollY > 80);
    if (header.classList.contains('transparent')) {
      header.style.backgroundColor = `rgba(255,255,255,${Math.min(scrollY / 80, 1)})`;
    }
  });

  const nav = document.querySelector('nav, #nav, .nav');
  if (!nav) return;

  const btn = document.createElement('button');
  btn.className = 'twourn-menu-btn';
  btn.innerHTML = '&#9776;';
  const overlay = document.createElement('div');
  overlay.className = 'twourn-overlay';
  document.body.appendChild(overlay);
  header.appendChild(btn);

  btn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    overlay.classList.toggle('is-visible');
  });
  overlay.addEventListener('click', () => {
    nav.classList.remove('is-open');
    overlay.classList.remove('is-visible');
  });

  const style = document.createElement('style');
  style.textContent = `
    header.is-shrunk { transition: all 0.3s ease; transform: scale(0.98); }
    .twourn-menu-btn { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; }
    .twourn-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999; }
    .twourn-overlay.is-visible { display: block; }
    @media (max-width: 768px) {
      .twourn-menu-btn { display: block; }
      nav { position: fixed; top: 0; right: 0; height: 100vh; width: 280px; background: #fff;
            transform: translateX(100%); transition: transform 0.3s ease; z-index: 1000; padding: 2rem; }
      nav.is-open { transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);
})();
