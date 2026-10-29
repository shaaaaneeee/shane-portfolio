window.__MOTION = {
  scrollOffset: 88,
  topId: 'top',
  hero: '.hero h1',
  bigType: '.foot .say',
  highlight: '.about-grid .lead',
  reveal: '.head, .index, .mail, .f-row',
  stagger: '.bento',
  marquee: '.track',
  roll: '.lg-link, .f-links a',
  magnetic: '.cta, .copy',
  cursor: 'a.w-card',
  css: '.w-card .lg-bend,.b .lg-bend,.b-photo figcaption .lg-bend{filter:none}',
  extra: function (m) {
    var root = document.documentElement, hero = document.getElementById('top');

    // 1. Light hero shrinks into a rounded card over the dark background, then scrolls away.
    if (hero) {
      gsap.fromTo(hero, { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
        { clipPath: 'inset(0% 2.4% 0% 2.4% round 44px)', ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '40% top', scrub: true } });
      gsap.to(hero, { scale: 0.965, transformOrigin: '50% 100%', ease: 'none', scrollTrigger: { trigger: hero, start: '25% top', end: 'bottom top', scrub: true } });
      ScrollTrigger.create({ trigger: hero, start: 'bottom 44px', onEnter: function () { root.classList.add('is-dark'); }, onLeaveBack: function () { root.classList.remove('is-dark'); } });
      gsap.to('.port', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero h1', { yPercent: -40, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    }

    // 2. Binary-digit portrait: assembles on load, scrambles to blue under the cursor, flickers when idle.
    (function () {
      var cv = document.querySelector('.bin'), img = document.querySelector('.port-img');
      if (!cv || !window.__PORTRAIT) return;
      var P = window.__PORTRAIT, raw = atob(P.d), N = P.cols * P.rows, val = new Uint8Array(N);
      for (var i = 0; i < N; i++) val[i] = raw.charCodeAt(i);
      var bits = new Uint8Array(N), thr = new Float32Array(N);
      for (i = 0; i < N; i++) { bits[i] = Math.random() < 0.5 ? 1 : 0; thr[i] = Math.random() * 0.7 + (Math.floor(i / P.cols) / P.rows) * 0.3; }
      var ctx = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2), cw = 0, ch = 0, W = 0, H = 0;
      var st = { p: 0 }, mx = -1e4, my = -1e4, R = 90, visible = true, last = 0;
      function size() {
        var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cw = W / P.cols; ch = H / P.rows;
        ctx.font = '600 ' + (ch * 0.92).toFixed(2) + 'px "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textBaseline = 'top';
      }
      size(); window.addEventListener('resize', size);
      if (document.fonts) document.fonts.ready.then(size);
      if (img) img.style.visibility = 'hidden';
      gsap.to(st, { p: 1, duration: 2.4, ease: 'power2.out', delay: 0.2 });
      window.addEventListener('mousemove', function (e) { var r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
      document.addEventListener('mouseleave', function () { mx = my = -1e4; });
      ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: function (s) { visible = s.isActive; } });
      function draw(now) {
        requestAnimationFrame(draw);
        if (!visible || document.hidden || window.__lsScrolling || now - last < 33) return;
        last = now;
        ctx.clearRect(0, 0, W, H);
        var p = st.p, accent = [];
        for (var k = 0; k < 40; k++) { var j = (Math.random() * N) | 0; bits[j] ^= 1; }
        ctx.fillStyle = '#15161A';
        for (var r = 0; r < P.rows; r++) {
          for (var c = 0; c < P.cols; c++) {
            var i = r * P.cols + c, v = val[i];
            if (!v) continue;
            var front = p * 1.25 - thr[i];
            if (front < 0) continue;
            var x = c * cw, y = r * ch, a = v / 255;
            var dx = x + cw / 2 - mx, dy = y + ch / 2 - my, d2 = dx * dx + dy * dy;
            if (front < 0.08 || d2 < R * R) {
              var f = d2 < R * R ? 1 - Math.sqrt(d2) / R : 1 - front / 0.08;
              accent.push(x, y, Math.max(a, 0.35 + 0.6 * f));
              continue;
            }
            ctx.globalAlpha = a;
            ctx.fillText(bits[i] ? '1' : '0', x, y);
          }
        }
        ctx.fillStyle = '#2F5BEA';
        for (var q = 0; q < accent.length; q += 3) {
          ctx.globalAlpha = accent[q + 2];
          ctx.fillText(Math.random() < 0.5 ? '1' : '0', accent[q], accent[q + 1]);
        }
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(draw);
    })();

    // 3. Background: a slow domain-warped flow field in navy, blue, teal and violet.
    //    Drawn at half resolution (it is soft by design), drifts with scroll, ripples under the cursor.
    (function () {
      var host = document.querySelector('.amb'); if (!host) return;
      var cv = document.createElement('canvas');
      var gl = cv.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
      if (!gl) return;
      host.insertBefore(cv, host.firstChild);
      var vs = 'attribute vec2 p; varying vec2 vUv; void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }';
      var fs = [
        'precision highp float;',
        'uniform float uTime, uScroll;',
        'uniform vec2 uRes;',
        'uniform sampler2D uTouch;',
        'varying vec2 vUv;',
        'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
        'float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);',
        '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }',
        'float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; } return v; }',
        'void main(){',
        '  vec2 uv = vUv;',
        '  vec4 tt = texture2D(uTouch, uv);',
        '  uv -= (tt.rg * 2.0 - 1.0) * 0.12 * tt.b;',
        '  vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 1.7 + vec2(0.0, uScroll * 0.9);',
        '  float t = uTime * 0.045;',
        '  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));',
        '  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + 0.7 * t), fbm(p + 3.2 * q + vec2(8.3, 2.8) - 0.6 * t));',
        '  float f = fbm(p + 3.0 * r);',
        '  vec3 navy = vec3(0.027, 0.035, 0.075), deep = vec3(0.07, 0.12, 0.33), teal = vec3(0.05, 0.27, 0.34), violet = vec3(0.24, 0.15, 0.46), glow = vec3(0.55, 0.71, 1.0);',
        '  vec3 col = mix(navy, deep, smoothstep(0.25, 0.85, f));',
        '  col = mix(col, teal, clamp(length(q) - 0.55, 0.0, 1.0) * 0.9);',
        '  col = mix(col, violet, smoothstep(0.55, 0.95, r.x) * 0.55);',
        '  col += glow * pow(smoothstep(0.55, 1.0, f), 3.0) * 0.35;',
        '  col += glow * tt.b * 0.12;',
        '  float vig = smoothstep(1.25, 0.25, length((vUv - 0.5) * vec2(1.25, 1.0)));',
        '  col *= mix(0.55, 1.0, vig);',
        '  gl_FragColor = vec4(col, 1.0);',
        '}'
      ].join('\n');
      function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
      var pr = gl.createProgram();
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.remove(); return; }
      gl.useProgram(pr);
      var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      var U = function (n) { return gl.getUniformLocation(pr, n); };
      var uTime = U('uTime'), uRes = U('uRes'), uScroll = U('uScroll');

      // Cursor trail texture (direction in R/G, strength in B).
      var tc = document.createElement('canvas'); tc.width = tc.height = 64;
      var tx = tc.getContext('2d'), trail = [], lastPt = null, maxAge = 64;
      function addTouch(x, y) {
        var force = 0, vx = 0, vy = 0;
        if (lastPt) { var dx = x - lastPt.x, dy = y - lastPt.y; if (!dx && !dy) return; var dd = Math.sqrt(dx * dx + dy * dy); vx = dx / dd; vy = dy / dd; force = Math.min((dx * dx + dy * dy) * 20000, 2); }
        lastPt = { x: x, y: y }; trail.push({ x: x, y: y, age: 0, force: force, vx: vx, vy: vy });
      }
      function drawTouch() {
        tx.fillStyle = 'black'; tx.fillRect(0, 0, 64, 64);
        for (var i = trail.length - 1; i >= 0; i--) {
          var pt = trail[i], f = pt.force / 64 * (1 - pt.age / maxAge);
          pt.x += pt.vx * f; pt.y += pt.vy * f; pt.age++;
          if (pt.age > maxAge) { trail.splice(i, 1); continue; }
          var a = pt.age < maxAge * 0.3 ? Math.sin((pt.age / (maxAge * 0.3)) * Math.PI / 2) : (function () { var k = 1 - (pt.age - maxAge * 0.3) / (maxAge * 0.7); return -k * (k - 2); })();
          a *= pt.force;
          tx.shadowOffsetX = 320; tx.shadowOffsetY = 320; tx.shadowBlur = 6.4;
          tx.shadowColor = 'rgba(' + ((pt.vx + 1) / 2 * 255) + ',' + ((pt.vy + 1) / 2 * 255) + ',' + (a * 255) + ',' + (0.2 * a) + ')';
          tx.beginPath(); tx.fillStyle = 'rgba(255,0,0,1)';
          tx.arc(pt.x * 64 - 320, (1 - pt.y) * 64 - 320, 6.4, 0, Math.PI * 2); tx.fill();
        }
      }
      var tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform1i(U('uTouch'), 0);
      window.addEventListener('mousemove', function (e) { addTouch(e.clientX / innerWidth, 1 - e.clientY / innerHeight); });
      window.addEventListener('touchmove', function (e) { var t0 = e.touches[0]; if (t0) addTouch(t0.clientX / innerWidth, 1 - t0.clientY / innerHeight); }, { passive: true });

      var scale = 0.5;
      function resize() { cv.width = Math.max(2, Math.round(innerWidth * scale)); cv.height = Math.max(2, Math.round(innerHeight * scale)); gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(uRes, cv.width, cv.height); }
      resize(); window.addEventListener('resize', resize);
      var scrollV = 0, prev = performance.now(), time = 0;
      (function frame(now) {
        requestAnimationFrame(frame);
        var dt = Math.min((now - prev) / 1000, 0.1); prev = now;
        if (document.hidden || window.__lsScrolling) return;
        time += dt;
        scrollV += ((window.scrollY / Math.max(1, innerHeight)) * 0.35 - scrollV) * 0.08;
        drawTouch();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc);
        gl.uniform1f(uTime, time); gl.uniform1f(uScroll, scrollV);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      })(prev);
    })();

    // 4. Liquid glass drop in the nav: follows hover and the section in view.
    (function () {
      var nav = document.querySelector('.nav'), drop = nav && nav.querySelector('.lg-drop');
      if (!drop) return;
      var links = m.$('.lg-link', nav), active = links[0];
      var place = function (a, instant) {
        var x = a.offsetLeft, w = a.offsetWidth;
        if (instant) { gsap.set(drop, { left: x, width: w }); return; }
        gsap.to(drop, { left: x, width: w, duration: 0.75, ease: 'elastic.out(1, 0.8)', overwrite: 'auto' });
        gsap.fromTo(drop, { scaleY: 0.86, scaleX: 1.04 }, { scaleY: 1, scaleX: 1, duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: false });
      };
      place(active, true);
      links.forEach(function (a) { a.addEventListener('mouseenter', function () { place(a); }); a.addEventListener('focus', function () { place(a); }); });
      nav.addEventListener('mouseleave', function () { place(active); });
      [['#top', 0], ['#work', 1], ['#about', 2], ['#contact', 3]].forEach(function (pair) {
        var sec = document.querySelector(pair[0]); if (!sec) return;
        ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: function (s) { if (s.isActive) { active = links[pair[1]]; place(active); } } });
      });
      if (document.fonts) document.fonts.ready.then(function () { place(active, true); });
    })();

    // 5. Work: pinned horizontal scroll on wide screens, with a progress line and screenshot parallax.
    (function () {
      var sec = document.getElementById('work'), rail = sec && sec.querySelector('.rail'), bar = sec && sec.querySelector('.progress i');
      if (!rail) return;
      // gsap.matchMedia re-creates (or reverts) the pin whenever the width crosses 900px,
      // so resizing the window or panel never leaves a half-pinned section behind.
      gsap.matchMedia().add('(min-width: 900px), (hover: hover) and (pointer: fine)', function () {
        var dist = function () { return Math.max(0, rail.scrollWidth - document.documentElement.clientWidth); };
        var tween = gsap.to(rail, { x: function () { return -dist(); }, ease: 'none',
          scrollTrigger: { trigger: sec, start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: function (s) { if (bar) gsap.set(bar, { scaleX: s.progress }); } } });
        m.$('.w-card', rail).forEach(function (card) {
          var shot = card.querySelector('.shot, .flow');
          if (shot) gsap.fromTo(shot, { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        });
        return function () { gsap.set(rail, { clearProps: 'transform' }); if (bar) gsap.set(bar, { clearProps: 'transform' }); };
      });
      // Late-loading images and fonts change heights below/above; re-measure once they land.
      var re = function () { ScrollTrigger.refresh(); };
      window.addEventListener('load', re);
      if (document.fonts) document.fonts.ready.then(re);
      var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(re, 200); });
    })();

    // 6. Bento: cards tilt toward the cursor.
    if (m.fine) m.$('.bento .b').forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        gsap.to(c, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 6, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 6, transformPerspective: 900, duration: 0.5, ease: 'power3' });
      });
      c.addEventListener('mouseleave', function () { gsap.to(c, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3' }); });
    });

    // 7. Desktop: windows pop open one after another when the section scrolls into view.
    gsap.from('.desk .w98', { y: 40, scale: 0.94, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.14, clearProps: 'transform', scrollTrigger: { trigger: '.desk', start: 'top 75%' } });

    // 8. About: twelve faint column lines draw in from the top.
    (function () {
      var cols = document.querySelector('.about .cols'); if (!cols) return;
      for (var i = 0; i <= 12; i++) { var l = document.createElement('i'); l.style.left = 'calc(var(--gutter-l) + (100% - var(--gutter-l) - var(--gutter-r)) * ' + (i / 12) + ')'; cols.appendChild(l); }
      gsap.from(cols.children, { scaleY: 0, duration: 1.6, ease: 'expo.inOut', stagger: 0.04, scrollTrigger: { trigger: '#about', start: 'top 75%' } });
    })();
  }
};
