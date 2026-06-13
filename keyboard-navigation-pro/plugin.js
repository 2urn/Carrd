// 2urn · Keyboard Navigation Pro+ v2.1.2
(function() {
  'use strict';
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (!sections.length) return;

  let current = 0;

  function scrollTo(index) {
    if (index < 0 || index >= sections.length) return;
    current = index;
    sections[current].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowDown': case 'PageDown': e.preventDefault(); scrollTo(current + 1); break;
      case 'ArrowUp':   case 'PageUp':   e.preventDefault(); scrollTo(current - 1); break;
      case 'Home': e.preventDefault(); scrollTo(0); break;
      case 'End':  e.preventDefault(); scrollTo(sections.length - 1); break;
    }
  });

  // Update current section on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        current = sections.indexOf(entry.target);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
})();
