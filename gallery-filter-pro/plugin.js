// 2urn · Gallery Filter Pro+ v1.7.3
(function() {
  'use strict';

  const filters = document.querySelectorAll('[data-filter]');
  const items   = document.querySelectorAll('[data-category]');
  if (!filters.length || !items.length) return;

  function filter(category) {
    items.forEach(item => {
      const match = category === 'all' || item.dataset.category === category;
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      item.style.opacity    = match ? '1' : '0';
      item.style.transform  = match ? 'scale(1)' : 'scale(0.95)';
      item.style.pointerEvents = match ? '' : 'none';
    });

    filters.forEach(f => f.classList.toggle('active', f.dataset.filter === category));
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => filter(btn.dataset.filter));
  });

  filter('all');
})();
