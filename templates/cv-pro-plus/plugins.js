// 2urn CV Pro+ — Combined Plugin Bundle
// Paste this into Carrd: Settings → Body End → Embed

// ── 1. Design Tokens ──────────────────────────────────────────────────────────
(function injectTokens() {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --color-primary:   #000000;
      --color-accent:    #7C5CBF;
      --color-muted:     #888888;
      --color-bg:        #ffffff;
      --font-heading:    'Inter', sans-serif;
      --font-body:       'Inter', sans-serif;
      --space-section:   4rem;
      --ease-default:    0.3s ease;
    }
  `;
  document.head.appendChild(style);
})();

// ── 2. Keyboard Navigation Pro+ v2.1.2 ────────────────────────────────────────
(function keyboardNav() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (!sections.length) return;
  let current = 0;
  const scrollTo = (i) => {
    if (i < 0 || i >= sections.length) return;
    current = i;
    sections[current].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  document.addEventListener('keydown', (e) => {
    if (['ArrowDown','PageDown'].includes(e.key)) { e.preventDefault(); scrollTo(current + 1); }
    if (['ArrowUp','PageUp'].includes(e.key))     { e.preventDefault(); scrollTo(current - 1); }
    if (e.key === 'Home') { e.preventDefault(); scrollTo(0); }
    if (e.key === 'End')  { e.preventDefault(); scrollTo(sections.length - 1); }
  });
  new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) current = sections.indexOf(e.target); });
  }, { threshold: 0.5 }).observe(sections.forEach ? sections[0] : sections);
  sections.forEach(s => new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) current = sections.indexOf(s); },
    { threshold: 0.5 }
  ).observe(s));
})();

// ── 3. Gallery Filter Pro+ v1.7.3 ─────────────────────────────────────────────
(function galleryFilter() {
  const filters = document.querySelectorAll('[data-filter]');
  const items   = document.querySelectorAll('[data-category]');
  if (!filters.length || !items.length) return;
  const filter = (cat) => {
    items.forEach(item => {
      const show = cat === 'all' || item.dataset.category === cat;
      item.style.transition  = 'opacity 0.3s ease, transform 0.3s ease';
      item.style.opacity     = show ? '1' : '0.15';
      item.style.transform   = show ? 'scale(1)' : 'scale(0.97)';
      item.style.pointerEvents = show ? '' : 'none';
    });
    filters.forEach(f => f.classList.toggle('active', f.dataset.filter === cat));
  };
  filters.forEach(btn => btn.addEventListener('click', () => filter(btn.dataset.filter)));
  filter('all');
})();

// ── 4. Clone Engine v2.0 ──────────────────────────────────────────────────────
window.CarrdClone = {
  clone(sourceId, targetId, position = 'after') {
    const src = document.getElementById(sourceId);
    const tgt = document.getElementById(targetId);
    if (!src || !tgt) return;
    const clone = src.cloneNode(true);
    clone.id = sourceId + '-clone-' + Date.now();
    clone.querySelectorAll('[id]').forEach(el => { el.id = el.id + '-' + Date.now(); });
    tgt.parentNode.insertBefore(clone, position === 'after' ? tgt.nextSibling : tgt);
    return clone;
  }
};
