// 2urn Artist Pro — Combined Plugin Bundle
// Paste this into Carrd: Settings → Body End → Embed

// ── 1. Design Tokens ──────────────────────────────────────────────────────────
(function() {
  const s = document.createElement('style');
  s.textContent = `:root {
    --color-primary:  #0a0a0a;
    --color-accent:   #7C5CBF;
    --color-surface:  #f8f8f6;
    --font-heading:   'Cormorant Garamond', serif;
    --font-body:      'Inter', sans-serif;
    --space-section:  6rem;
    --ease-default:   0.4s ease;
  }`;
  document.head.appendChild(s);
})();

// ── 2. Gallery Filter Pro+ v1.7.3 ─────────────────────────────────────────────
(function() {
  const filters = document.querySelectorAll('[data-filter]');
  const items   = document.querySelectorAll('[data-category]');
  if (!filters.length || !items.length) return;
  const filter = (cat) => {
    items.forEach(item => {
      const show = cat === 'all' || item.dataset.category === cat;
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      item.style.opacity    = show ? '1' : '0';
      item.style.transform  = show ? 'scale(1)' : 'scale(0.96)';
      item.style.pointerEvents = show ? '' : 'none';
    });
    filters.forEach(f => f.classList.toggle('active', f.dataset.filter === cat));
  };
  filters.forEach(b => b.addEventListener('click', () => filter(b.dataset.filter)));
  filter('all');
})();

// ── 3. Clone Engine v2.0 ──────────────────────────────────────────────────────
window.CarrdClone = {
  clone(src, tgt, pos = 'after') {
    const s = document.getElementById(src), t = document.getElementById(tgt);
    if (!s || !t) return;
    const c = s.cloneNode(true);
    c.id = src + '-' + Date.now();
    c.querySelectorAll('[id]').forEach(el => { el.id = el.id + '-' + Date.now(); });
    t.parentNode.insertBefore(c, pos === 'after' ? t.nextSibling : t);
    return c;
  }
};

// ── 4. SVG FX v2.0 ────────────────────────────────────────────────────────────
(function() {
  document.querySelectorAll('[data-svgfx]').forEach(el => {
    const color = el.dataset.svgfxColor || 'rgba(124,92,191,0.08)';
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;top:-20%;right:-10%;width:55%;pointer-events:none;z-index:0;';
    wrap.innerHTML = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" d="M44.7,-62.3C56.9,-53.5,64.8,-38.5,68.4,-23C72,-7.5,71.3,8.4,65.5,22.1C59.7,35.8,48.9,47.4,36.1,55.3C23.3,63.2,8.6,67.4,-6.7,68.1C-22,68.8,-38,66,-50.4,57.4C-62.7,48.8,-71.5,34.3,-73.8,18.9C-76.1,3.5,-71.9,-12.9,-63.7,-26.4C-55.5,-39.9,-43.3,-50.5,-30.3,-58.9C-17.3,-67.3,-3.5,-73.5,10.3,-73C24.1,-72.5,32.5,-71.1,44.7,-62.3Z" transform="translate(100 100)">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="25s" repeatCount="indefinite"/>
      </path></svg>`;
    el.insertBefore(wrap, el.firstChild);
  });
})();

// ── 5. Water Glass Engine v1.0 ────────────────────────────────────────────────
(function() {
  document.querySelectorAll('[data-glass]').forEach(el => {
    const blur = el.dataset.glassBlur || '20';
    const op   = el.dataset.glassOpacity || '0.12';
    el.style.cssText += `
      background: rgba(255,255,255,${op}) !important;
      backdrop-filter: blur(${blur}px) saturate(160%);
      -webkit-backdrop-filter: blur(${blur}px) saturate(160%);
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    `;
  });
})();
