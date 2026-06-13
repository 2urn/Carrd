// 2urn · Gradient FX v1.0
(function() {
  'use strict';
  document.querySelectorAll('[data-gradient]').forEach(el => {
    const preset = el.dataset.gradient || 'purple-blue';
    const presets = {
      'purple-blue': ['#7C5CBF', '#4A90D9', '#7C5CBF'],
      'sunset':      ['#FF6B6B', '#FFE66D', '#FF6B6B'],
      'ocean':       ['#0099CC', '#00CC99', '#0099CC'],
      'dark':        ['#1a1a2e', '#16213e', '#0f3460', '#1a1a2e'],
    };
    const stops = presets[preset] || presets['purple-blue'];
    let pos = 0;
    el.style.backgroundSize = '400% 400%';
    el.style.background = `linear-gradient(135deg, ${stops.join(', ')})`;
    el.style.animation = 'gradientShift 8s ease infinite';
  });

  if (!document.getElementById('twourn-gradient-style')) {
    const s = document.createElement('style');
    s.id = 'twourn-gradient-style';
    s.textContent = `@keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }`;
    document.head.appendChild(s);
  }
})();
