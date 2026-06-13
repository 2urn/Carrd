// 2urn · Shader FX v1.0
(function() {
  'use strict';
  document.querySelectorAll('[data-shader]').forEach(el => {
    const type = el.dataset.shader || 'waves';
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    el.style.position = 'relative';
    el.insertBefore(canvas, el.firstChild);

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const shaders = {
      waves: `
        precision mediump float;
        uniform float u_time;
        uniform vec2 u_resolution;
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          float wave = sin(uv.x * 10.0 + u_time) * 0.05;
          float c = smoothstep(0.4, 0.6, uv.y + wave);
          gl_FragColor = mix(vec4(0.49, 0.36, 0.75, 1.0), vec4(0.29, 0.56, 0.85, 1.0), c);
        }`,
    };

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, 'attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0,1); }');
    gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, shaders[type] || shaders.waves);
    gl.compileShader(fs);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes  = gl.getUniformLocation(prog, 'u_resolution');

    function resize() { canvas.width = el.offsetWidth; canvas.height = el.offsetHeight; gl.viewport(0,0,canvas.width,canvas.height); }
    resize(); window.addEventListener('resize', resize);

    let start = Date.now();
    (function render() {
      gl.uniform1f(uTime, (Date.now() - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    })();
  });
})();
