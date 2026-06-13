// 2urn · Pattern FX v1.0
(function() {
  'use strict';
  const patterns = {
    dots:  (c) => `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='2' cy='2' r='1.5' fill='${c}'/></svg>`,
    grid:  (c) => `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M 20 0 L 0 0 0 20' fill='none' stroke='${c}' stroke-width='0.5'/></svg>`,
    lines: (c) => `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><line x1='0' y1='10' x2='20' y2='10' stroke='${c}' stroke-width='0.5'/></svg>`,
    cross: (c) => `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><line x1='10' y1='0' x2='10' y2='20' stroke='${c}' stroke-width='0.5'/><line x1='0' y1='10' x2='20' y2='10' stroke='${c}' stroke-width='0.5'/></svg>`,
  };

  document.querySelectorAll('[data-pattern]').forEach(el => {
    const type  = el.dataset.pattern || 'dots';
    const color = el.dataset.patternColor || 'rgba(0,0,0,0.15)';
    const svg   = patterns[type] ? patterns[type](color) : patterns.dots(color);
    const encoded = 'data:image/svg+xml,' + encodeURIComponent(svg);
    el.style.backgroundImage = `url("${encoded}")`;
    el.style.backgroundRepeat = 'repeat';
  });
})();
