// 2urn · Clone Engine v2.0
// Deterministic cloning — no polling, no random ID collisions
(function() {
  'use strict';

  window.CarrdClone = {
    clone: function(sourceId, targetId, position = 'after') {
      const source = document.getElementById(sourceId);
      const target = document.getElementById(targetId);
      if (!source || !target) return console.warn('[CarrdClone] Source or target not found');

      const clone = source.cloneNode(true);
      const newId = sourceId + '-clone-' + Date.now();
      clone.id = newId;

      // Update internal anchor IDs
      clone.querySelectorAll('[id]').forEach(el => {
        el.id = el.id + '-' + Date.now();
      });

      if (position === 'after') {
        target.parentNode.insertBefore(clone, target.nextSibling);
      } else {
        target.parentNode.insertBefore(clone, target);
      }

      return clone;
    },

    cloneAll: function(sourceId, count = 1, position = 'after') {
      const results = [];
      let ref = document.getElementById(sourceId);
      for (let i = 0; i < count; i++) {
        const cloned = this.clone(sourceId, ref.id, position);
        if (cloned) { results.push(cloned); ref = cloned; }
      }
      return results;
    }
  };
})();
