// 2urn · SVG FX v2.0
(function() {
  'use strict';
  document.querySelectorAll('[data-svgfx]').forEach(el => {
    const type  = el.dataset.svgfx || 'blob';
    const color = el.dataset.svgfxColor || 'rgba(124,92,191,0.15)';
    el.style.position = 'relative';
    el.style.overflow = 'hidden';

    const svgs = {
      blob: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" d="M44.7,-62.3C56.9,-53.5,64.8,-38.5,68.4,-23C72,−7.5,71.3,8.4,65.5,22.1C59.7,35.8,48.9,47.4,36.1,55.3C23.3,63.2,8.6,67.4,-6.7,68.1C-22,68.8,-38,66,-50.4,57.4C-62.7,48.8,-71.5,34.3,-73.8,18.9C-76.1,3.5,-71.9,-12.9,-63.7,-26.4C-55.5,-39.9,-43.3,-50.5,-30.3,-58.9C-17.3,-67.3,-3.5,-73.5,10.3,-73C24.1,-72.5,32.5,-71.1,44.7,-62.3Z" transform="translate(100 100)">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite"/>
        </path></svg>`,
      circle: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="none" stroke="${color}" stroke-width="2">
          <animate attributeName="r" values="80;90;80" dur="4s" repeatCount="indefinite"/>
        </circle></svg>`,
    };

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:absolute;top:-20%;right:-10%;width:60%;opacity:0.8;pointer-events:none;z-index:0;';
    wrapper.innerHTML = svgs[type] || svgs.blob;
    el.insertBefore(wrapper, el.firstChild);
  });
})();
