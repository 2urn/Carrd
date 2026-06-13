// 2urn · Carrd Section Cloner v1.0
(function() {
  'use strict';

  let selectedSection = null;

  // Inject floating panel
  const panel = document.createElement('div');
  panel.id = 'twourn-cloner';
  panel.style.cssText = `
    position: fixed; top: 80px; right: 20px; z-index: 99999;
    background: #0d0d1a; border: 1px solid #7C5CBF; border-radius: 12px;
    padding: 16px; width: 260px; font-family: monospace; font-size: 12px;
    color: #fff; box-shadow: 0 8px 32px rgba(124,92,191,0.3);
  `;
  panel.innerHTML = `
    <div style="font-weight:bold;margin-bottom:12px;color:#7C5CBF;">⬡ 2urn Section Cloner</div>
    <div id="twourn-sections" style="max-height:200px;overflow-y:auto;margin-bottom:12px;"></div>
    <div style="display:flex;gap:8px;">
      <button id="twourn-clone-above" style="flex:1;padding:8px;background:#7C5CBF;border:none;border-radius:6px;color:#fff;cursor:pointer;">↑ Above</button>
      <button id="twourn-clone-below" style="flex:1;padding:8px;background:#7C5CBF;border:none;border-radius:6px;color:#fff;cursor:pointer;">↓ Below</button>
    </div>
    <div style="margin-top:8px;display:flex;gap:8px;">
      <button id="twourn-save-template" style="flex:1;padding:6px;background:#333;border:none;border-radius:6px;color:#aaa;cursor:pointer;">Save Template</button>
      <button id="twourn-paste-template" style="flex:1;padding:6px;background:#333;border:none;border-radius:6px;color:#aaa;cursor:pointer;">Paste Template</button>
    </div>
  `;
  document.body.appendChild(panel);

  function getSections() {
    return Array.from(document.querySelectorAll('.site-main > .inner > section, [data-element-type="section"]'));
  }

  function renderSectionList() {
    const list = document.getElementById('twourn-sections');
    const sections = getSections();
    list.innerHTML = sections.map((s, i) =>
      `<div data-idx="${i}" style="padding:6px 8px;margin-bottom:4px;border-radius:4px;cursor:pointer;
        background:${selectedSection === s ? '#7C5CBF' : '#1a1a2e'};">
        ${s.id || s.dataset.scrollpoint || 'Section ' + (i+1)}
      </div>`
    ).join('');

    list.querySelectorAll('[data-idx]').forEach(item => {
      item.addEventListener('click', () => {
        selectedSection = sections[parseInt(item.dataset.idx)];
        renderSectionList();
        highlightSection(selectedSection);
      });
    });
  }

  function highlightSection(section) {
    document.querySelectorAll('.twourn-highlight').forEach(el => el.classList.remove('twourn-highlight'));
    if (section) section.classList.add('twourn-highlight');
  }

  function cloneSection(position) {
    if (!selectedSection) return alert('Select a section first');
    const clone = selectedSection.cloneNode(true);
    clone.id = (selectedSection.id || 'section') + '-clone-' + Date.now();

    // Update scrollpoint anchor IDs
    clone.querySelectorAll('[id]').forEach(el => {
      if (el !== clone) el.id = el.id + '-' + Date.now();
    });
    clone.querySelectorAll('[data-scrollpoint]').forEach(el => {
      el.dataset.scrollpoint = el.dataset.scrollpoint + '-clone';
    });

    if (position === 'above') {
      selectedSection.parentNode.insertBefore(clone, selectedSection);
    } else {
      selectedSection.parentNode.insertBefore(clone, selectedSection.nextSibling);
    }
    renderSectionList();
  }

  document.getElementById('twourn-clone-above').addEventListener('click', () => cloneSection('above'));
  document.getElementById('twourn-clone-below').addEventListener('click', () => cloneSection('below'));

  document.getElementById('twourn-save-template').addEventListener('click', () => {
    if (!selectedSection) return alert('Select a section first');
    chrome.storage.local.set({ cloneTemplate: selectedSection.outerHTML });
    alert('Template saved ✓');
  });

  document.getElementById('twourn-paste-template').addEventListener('click', () => {
    chrome.storage.local.get('cloneTemplate', ({ cloneTemplate }) => {
      if (!cloneTemplate) return alert('No template saved');
      const tmp = document.createElement('div');
      tmp.innerHTML = cloneTemplate;
      const clone = tmp.firstElementChild;
      clone.id = (clone.id || 'section') + '-paste-' + Date.now();
      if (selectedSection) {
        selectedSection.parentNode.insertBefore(clone, selectedSection.nextSibling);
      } else {
        document.querySelector('.site-main > .inner').appendChild(clone);
      }
      renderSectionList();
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.altKey && !e.shiftKey && e.key === 'c') { e.preventDefault(); cloneSection('below'); }
    if (e.altKey && e.shiftKey  && e.key === 'C') { e.preventDefault(); cloneSection('above'); }
  });

  // Highlight style
  const style = document.createElement('style');
  style.textContent = `.twourn-highlight { outline: 2px solid #7C5CBF !important; outline-offset: 2px; }`;
  document.head.appendChild(style);

  renderSectionList();
  setInterval(renderSectionList, 3000);
})();
