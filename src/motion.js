(function () {
  var cfg = window.__MOTION || {};
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.gsap || !window.ScrollTrigger || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  var root = document.documentElement;
  root.classList.add('js-motion');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var wide = window.matchMedia('(min-width: 900px)').matches;
  var $ = function (s, c) { if (!s) return []; try { return Array.prototype.slice.call((c || document).querySelectorAll(s)); } catch (e) { return []; } };

  var css = document.createElement('style');
  css.textContent =
    '.ch{display:inline-block;overflow:hidden;vertical-align:top;padding:0 0.02em 0.1em;margin:0 -0.02em -0.1em}' +
    '.ch-i{display:inline-block;will-change:transform}' +
    '.wd{display:inline-block;white-space:nowrap}' +
    '.roll{display:inline-block;overflow:hidden;vertical-align:bottom;height:1.2em;line-height:1.2em}' +
    '.roll>span{display:block;height:1.2em;line-height:1.2em;transition:transform .45s cubic-bezier(.7,0,.2,1)}' +
    'a:hover .roll>span,a:focus-visible .roll>span{transform:translateY(-100%)}' +
    '.cur{position:fixed;left:0;top:0;z-index:999;pointer-events:none;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#fff;mix-blend-mode:difference;display:flex;align-items:center;justify-content:center;font:500 11px/1 system-ui,sans-serif;color:#000;letter-spacing:.02em;transition:width .35s cubic-bezier(.2,.7,0,1),height .35s cubic-bezier(.2,.7,0,1),margin .35s cubic-bezier(.2,.7,0,1)}' +
    '.cur span{opacity:0;transition:opacity .2s}' +
    '.cur.is-big{width:58px;height:58px;margin:-29px 0 0 -29px}' +
    '.cur.is-big span{opacity:1}' +
    (cfg.css || '');
  document.head.appendChild(css);

  // Split text into characters, keeping nested elements and line breaks.
  function splitChars(el) {
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.data.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'wd';
            Array.from(part).forEach(function (c) {
              var o = document.createElement('span'); o.className = 'ch';
              var i = document.createElement('span'); i.className = 'ch-i'; i.textContent = c;
              o.appendChild(i); w.appendChild(o);
            });
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    })(el);
    return $('.ch-i', el);
  }
  function splitWords(el) {
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.data.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var o = document.createElement('span'); o.className = 'ch';
            var i = document.createElement('span'); i.className = 'ch-i'; i.textContent = part;
            o.appendChild(i); frag.appendChild(o);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    })(el);
    return $('.ch-i', el);
  }
  window.__split = { chars: splitChars, words: splitWords };

  // Hero: vertical cut reveal of characters on load.
  $(cfg.hero === undefined ? 'h1' : cfg.hero).forEach(function (el, k) {
    gsap.from(splitChars(el), { yPercent: 115, rotate: 4, duration: 1.15, ease: 'expo.out', stagger: 0.032, delay: 0.15 + k * 0.12 });
  });

  // Big type further down: same reveal, started by scroll.
  $(cfg.bigType || '').forEach(function (el) {
    gsap.from(splitChars(el), { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.025, scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // Paragraphs that brighten word by word as they scroll through.
  $(cfg.highlight || '').forEach(function (el) {
    var w = splitWords(el);
    $('.ch', el).forEach(function (c) { c.style.overflow = 'visible'; });
    gsap.fromTo(w, { opacity: 0.22 }, { opacity: 1, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: true } });
  });

  // Blocks that rise into place. They stay visible the whole time.
  $(cfg.reveal || '').forEach(function (el) {
    gsap.from(el, { y: 70, duration: 1.2, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: el, start: 'top 94%' } });
  });
  $(cfg.stagger || '').forEach(function (group) {
    gsap.from(group.children, { y: 80, scale: 0.97, duration: 1.2, ease: 'expo.out', stagger: 0.09, clearProps: 'transform', scrollTrigger: { trigger: group, start: 'top 90%' } });
  });

  // Screenshot windows drift up inside their stage.
  $('.win').forEach(function (w) {
    gsap.fromTo(w, { yPercent: 14 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: w.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Photos with gentle parallax.
  $(cfg.parallax || '').forEach(function (img) {
    gsap.set(img, { scale: 1.14 });
    gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Letter-roll on text links.
  $(cfg.roll === undefined ? 'nav a' : cfg.roll).forEach(function (a) {
    if (a.children.length || !a.textContent.trim()) return;
    var t = a.textContent;
    a.innerHTML = '';
    var r = document.createElement('span'); r.className = 'roll';
    var s1 = document.createElement('span'); s1.textContent = t;
    var s2 = document.createElement('span'); s2.textContent = t; s2.setAttribute('aria-hidden', 'true');
    r.appendChild(s1); r.appendChild(s2); a.appendChild(r);
  });

  if (fine) {
    // Magnetic buttons.
    $(cfg.magnetic || '').forEach(function (b) {
      var xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' });
      var yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' });
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.35); yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      b.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });
    // Cursor that grows into a label over projects.
    var cur = document.createElement('div'); cur.className = 'cur'; cur.setAttribute('aria-hidden', 'true');
    var lab = document.createElement('span'); lab.textContent = cfg.cursorLabel || 'Read'; cur.appendChild(lab);
    document.body.appendChild(cur);
    var cx = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' });
    var cy = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('mousemove', function (e) { cx(e.clientX); cy(e.clientY); });
    $(cfg.cursor || '').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cur.classList.add('is-big'); });
      el.addEventListener('mouseleave', function () { cur.classList.remove('is-big'); });
    });
  }

  // Marquee driven by GSAP; it speeds up with scroll velocity.
  $(cfg.marquee || '').forEach(function (track) {
    track.style.animation = 'none';
    var loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 32, repeat: -1 });
    ScrollTrigger.create({ onUpdate: function (s) {
      var v = Math.min(Math.abs(s.getVelocity()) / 300, 5);
      gsap.to(loop, { timeScale: 1 + v, duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
    } });
  });


  // Smooth scrolling. Lenis smooths the whole page (wheel and link jumps alike) and drives ScrollTrigger,
  // so every scroll moves the same way. Without Lenis, a GSAP tween is the fallback for link jumps.
  root.style.scrollBehavior = 'auto';
  var lenis = null;
  if (window.Lenis) {
    var lc = document.createElement('style');
    lc.textContent = 'html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}.lenis.lenis-stopped{overflow:hidden}';
    document.head.appendChild(lc);
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  var sState = { y: 0 }, sTween = null;
  function stopScroll() { if (sTween) { sTween.kill(); sTween = null; window.__lsScrolling = false; } }
  if (!lenis) ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, stopScroll, { passive: true }); });
  var easeJump = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id || id.indexOf('cs-') === 0) return;
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    // A pinned section lands exactly where its pin starts (no offset), measured from its spacer.
    var spacer = el.parentElement && el.parentElement.classList.contains('pin-spacer') ? el.parentElement : null;
    var off = spacer ? 0 : (cfg.scrollOffset || 0);
    var target = id === (cfg.topId || '') ? 0 : (spacer || el).getBoundingClientRect().top + window.scrollY - off;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    target = Math.round(Math.max(0, Math.min(target, max)));
    var dist = Math.abs(target - window.scrollY);
    if (dist < 2) return;
    var dur = Math.min(1.8, 1.0 + dist / 3500);
    window.__lsScrolling = true;
    if (lenis) {
      lenis.scrollTo(target, { duration: dur, easing: easeJump, onComplete: function () { window.__lsScrolling = false; } });
      setTimeout(function () { window.__lsScrolling = false; }, dur * 1000 + 200);
    } else {
      stopScroll();
      sState.y = window.scrollY;
      sTween = gsap.to(sState, { y: target, duration: dur, ease: easeJump,
        onUpdate: function () { window.scrollTo(0, sState.y); },
        onComplete: function () { sTween = null; window.__lsScrolling = false; ScrollTrigger.update(); } });
    }
    if (a.blur) a.blur();
  });

  if (cfg.extra) cfg.extra({ $: $, fine: fine, wide: wide, splitChars: splitChars });
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
