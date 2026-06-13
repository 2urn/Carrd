// 2urn · Water Glass Engine v1.0
(function() {
  'use strict';
  document.querySelectorAll('[data-glass]').forEach(el => {
    const blur    = el.dataset.glassBlur    || '16';
    const opacity = el.dataset.glassOpacity || '0.15';
    const color   = el.dataset.glassColor   || '255,255,255';

    el.style.cssText += `
      background: rgba(${color}, ${opacity}) !important;
      backdrop-filter: blur(${blur}px) saturate(180%);
      -webkit-backdrop-filter: blur(${blur}px) saturate(180%);
      border: 1px solid rgba(${color}, 0.3);
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    `;
  });

  // Water ripple effect on click
  document.querySelectorAll('[data-glass-ripple]').forEach(el => {
    el.addEventListener('click', (e) => {
      const rect   = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size   = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background: rgba(255,255,255,0.3);
        transform: scale(0); animation: glassRipple 0.6s ease-out forwards;
      `;
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const s = document.createElement('style');
  s.textContent = `@keyframes glassRipple { to { transform: scale(2); opacity: 0; } }`;
  document.head.appendChild(s);
})();
