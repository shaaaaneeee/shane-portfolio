(function () {
  var T = window.__CS_THEME || {};
  var STUDIES = {
    repd: {
      title: 'REPD', kind: 'Web app', year: '2025',
      summary: 'A gym tracker that records every set and rep, charts your progression, and has an AI coach you can ask about your training.',
      role: 'Solo: design, frontend, backend, deployment',
      stack: ['React', 'FastAPI', 'Supabase', 'Groq API (Llama 3.3 70B)', 'Tailwind', 'Framer Motion'],
      links: [['Open the app', 'https://repd-sigma.vercel.app'], ['GitHub', 'https://github.com/shaaaaneeee/REPD']],
      problem: 'Most workout logs are either a notes app or a bloated fitness platform. I wanted something fast enough to use between sets that still answers the real question: am I actually getting stronger?',
      built: [
        'Session logging with exercises, sets, reps and muscle-group tags.',
        'A dashboard with total sessions, sessions this week, total volume and current streak.',
        'Progress and history views so trends over weeks are visible at a glance.',
        'An AI coach powered by Llama 3.3 70B through the Groq API, answering questions about your own training.'
      ],
      how: [
        ['Frontend', 'React with Tailwind and Framer Motion for the interface and transitions.'],
        ['API', 'FastAPI handles sessions, sets and the coach endpoint.'],
        ['Data and auth', 'Supabase stores each user’s workouts behind their own account.'],
        ['AI coach', 'Requests go to Llama 3.3 70B on Groq for quick responses.']
      ],
      shots: [['img/repd_dash.jpg', 'REPD dashboard with stats, recent sessions and quick actions']]
    },
    planwise: {
      title: 'PlanWise', kind: 'Chrome extension · co-founded', year: '2025',
      summary: 'Plans you type in chat become events on a calendar you share. PlanWise spots the plan, the time and the people, and asks before adding anything.',
      role: 'Co-founder and software engineer, building it with a fellow SP engineer',
      stack: ['JavaScript', 'Chrome Extension APIs', 'Node.js', 'Supabase'],
      links: [['GitHub', 'https://github.com/shaaaaneeee/Calendar']],
      problem: '“Dinner with Sam at 7pm Saturday?” gets agreed in a group chat and then lives nowhere. Copying it into a calendar by hand is the step everyone skips.',
      built: [
        'Plan, time and note detection that reads what you type in WhatsApp Web, Telegram Web and Gmail.',
        'A popup that pre-fills the title, date, time, place and people, so confirming takes one click.',
        'A web dashboard with a month calendar, an upcoming list and categories.',
        'Groups with RSVPs and comments, plus a task board for planning the details.'
      ],
      how: [
        ['Detection', 'Runs in the extension as you type; you confirm the plan before anything is saved.'],
        ['Sync', 'Events, groups and tasks are stored in Supabase and shared across members.'],
        ['Backend', 'Node.js services sit alongside the extension and dashboard.']
      ],
      shots: [
        ['img/planwise_banner.jpg', 'PlanWise banner: plans you type in chat become events on a calendar you share'],
        ['img/planwise_popup.jpg', 'PlanWise popup detecting a coffee plan in a chat message'],
        ['img/planwise_month.jpg', 'PlanWise month calendar with upcoming events'],
        ['img/planwise_groups.jpg', 'PlanWise group event with RSVPs and comments'],
        ['img/planwise_kanban.jpg', 'PlanWise task board with to-do, in-progress and done columns']
      ]
    },
    tracker: {
      title: 'Internship Tracker', kind: 'Web app · open source', year: '2024',
      summary: 'A clean, minimal app to track every internship and job application, so you always know where you stand.',
      role: 'Solo: full stack and deployment',
      stack: ['React', 'FastAPI', 'PostgreSQL', 'Supabase', 'Docker', 'Vercel', 'Render'],
      links: [['Open the app', 'https://internship-tracker-shane.vercel.app'], ['GitHub', 'https://github.com/shaaaaneeee/internship-tracker']],
      problem: 'Applying to dozens of internships turns into a spreadsheet nobody updates. I wanted a tracker that is quicker to use than the spreadsheet.',
      built: [
        'Accounts with JWT authentication; every account only ever sees its own applications.',
        'A live stats row (total, interviews, offers, rejected) and a status breakdown chart.',
        'Instant search and filtering by company, role or status.',
        'Dark mode that remembers your preference.'
      ],
      how: [
        ['Frontend', 'React, deployed on Vercel.'],
        ['Backend', 'FastAPI in Docker, deployed on Render.'],
        ['Data', 'PostgreSQL via Supabase, scoped per user.']
      ],
      shots: [
        ['img/tracker_landing.jpg', 'Internship Tracker landing page'],
        ['img/tracker_dark.jpg', 'Internship Tracker dashboard in dark mode with stats and status breakdown']
      ]
    },
    faceid: {
      title: 'Face-ID Door Access', kind: '5G & AIoT module project', year: '2025',
      summary: 'A door access system that recognises registered faces from a live camera stream sent over 5G, then signals the door through the Pi’s GPIO.',
      role: 'Built the streaming pipeline, recognition flow and GPIO control',
      stack: ['mediamtx', 'ffmpeg', 'OpenCV', 'CodeProject.AI', 'SSH', 'GPIO'],
      links: [],
      problem: 'Face recognition on a live stream is only useful if it is fast. Every stage between the camera and the decision adds delay.',
      built: [
        'A full RTSP streaming pipeline using mediamtx and ffmpeg, tuned for low latency.',
        'Recognition with OpenCV and CodeProject.AI on the incoming stream.',
        'Face registration over the same RTSP stream used for recognition, so enrolment needs no separate setup.',
        'Door-access signalling through GPIO LED control over SSH.'
      ],
      how: [
        ['Capture', 'Camera feed published as RTSP through mediamtx.'],
        ['Transport', 'Stream carried over 5G and handled with ffmpeg.'],
        ['Recognise', 'OpenCV frames passed to CodeProject.AI for face matching.'],
        ['Act', 'A match triggers the GPIO LED over SSH.']
      ],
      flow: ['IP camera', 'RTSP · mediamtx', 'CodeProject.AI', 'GPIO signal'],
      shots: []
    },
    library: {
      title: 'Smart Library', kind: 'Hardware + software', year: '2024',
      summary: 'Library management on a Raspberry Pi: scan a book’s RFID tag to identify it, borrow it and return it.',
      role: 'Hardware integration and software',
      stack: ['Raspberry Pi', 'Python', 'RFID', 'Docker', 'Linux'],
      links: [['GitHub', 'https://github.com/shaaaaneeee/Library-system']],
      problem: 'Manual borrowing records are slow and easy to get wrong. RFID makes identifying a book a single tap.',
      built: [
        'Automated book identification from RFID tags.',
        'Borrowing and return tracking.',
        'Containerised with Docker and deployed on Linux.'
      ],
      how: [
        ['Hardware', 'RFID reader wired to a Raspberry Pi.'],
        ['Software', 'Python service handling scans, borrowing and returns.'],
        ['Deploy', 'Docker on Linux.']
      ],
      flow: ['RFID tag', 'Reader', 'Raspberry Pi', 'Python in Docker'],
      shots: []
    }
  };
  var ORDER = ['repd', 'planwise', 'tracker', 'faceid', 'library'];
  function keyFor(text) {
    if (/REPD/i.test(text)) return 'repd';
    if (/PlanWise|Group plans|Calendar/i.test(text)) return 'planwise';
    if (/Tracker/i.test(text)) return 'tracker';
    if (/Face-ID/i.test(text)) return 'faceid';
    if (/Library/i.test(text)) return 'library';
    return null;
  }

  var css = document.createElement('style');
  css.textContent = [
    '.cs{position:fixed;inset:0;z-index:200;display:none;background:' + (T.scrim || 'rgba(0,0,0,0.45)') + '}',
    '.cs.is-open{display:block}',
    '.cs-sheet{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;background:' + T.bg + ';color:' + T.ink + ';font-family:' + T.body + ';-webkit-overflow-scrolling:touch}',
    '.cs-in{max-width:1120px;margin:0 auto;padding-block:calc(28px + env(safe-area-inset-top,0px)) 96px;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}',
    '.cs-bar{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;background:' + T.bg + '}',
    '.cs-btn{appearance:none;border:1px solid ' + T.line + ';background:transparent;color:' + T.ink + ';font:500 14px/1 ' + T.body + ';min-height:44px;padding:0 18px;border-radius:' + (T.radius || '999px') + ';cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none}',
    '.cs-btn:hover{border-color:' + T.accent + ';color:' + T.accent + '}',
    '.cs-btn:focus-visible,.cs a:focus-visible{outline:2px solid ' + T.accent + ';outline-offset:2px}',
    '.cs-kick{font:500 12px/1.4 ' + T.mono + ';letter-spacing:.06em;text-transform:uppercase;color:' + T.muted + '}',
    '.cs h2{margin:28px 0 20px;font-family:' + T.display + ';font-weight:' + (T.displayWeight || 500) + ';font-style:' + (T.displayStyle || 'normal') + ';font-size:clamp(48px,9vw,128px);line-height:.92;letter-spacing:' + (T.tracking || '-0.04em') + ';text-wrap:balance}',
    '.cs-sum{margin:0;max-width:40ch;font-size:clamp(20px,2.2vw,28px);line-height:1.3;letter-spacing:-0.01em}',
    '.cs-meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;margin:48px 0;padding:24px 0;border-top:1px solid ' + T.line + ';border-bottom:1px solid ' + T.line + '}',
    '.cs-meta dt{font:500 12px/1.4 ' + T.mono + ';letter-spacing:.06em;text-transform:uppercase;color:' + T.muted + ';margin-bottom:8px}',
    '.cs-meta dd{margin:0;font-size:15px;line-height:1.5}',
    '.cs-chips{display:flex;flex-wrap:wrap;gap:6px}',
    '.cs-chip{padding:5px 10px;border-radius:999px;border:1px solid ' + T.line + ';font-size:13px}',
    '.cs-links{display:flex;flex-wrap:wrap;gap:8px}',
    '.cs-shots{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:16px;margin:0 0 64px}',
    '.cs-shot{margin:0;border-radius:12px;overflow:hidden;background:#0F0F10;box-shadow:0 24px 60px -24px rgba(0,0,0,.45),0 0 0 1px rgba(0,0,0,.08)}',
    '.cs-shot:first-child{grid-column:1/-1}',
    '.cs-shot .dots{display:flex;gap:5px;padding:8px 10px;background:#1D1D20}',
    '.cs-shot .dots i{width:7px;height:7px;border-radius:50%;display:block}',
    '.cs-shot img{display:block;width:100%;height:auto}',
    '.cs-flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin:0 0 64px;padding:56px 24px;border-radius:16px;background:' + T.panel + ';border:1px solid ' + T.line + '}',
    '.cs-flow span{padding:14px 18px;border:1px solid ' + T.line + ';border-radius:10px;font:500 13px/1 ' + T.mono + ';background:' + T.bg + '}',
    '.cs-flow b{color:' + T.accent + ';font-weight:400}',
    '.cs-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:48px;margin-bottom:64px}',
    '.cs h3{margin:0 0 16px;font:500 12px/1.4 ' + T.mono + ';letter-spacing:.06em;text-transform:uppercase;color:' + T.muted + '}',
    '.cs p.cs-body{margin:0;max-width:62ch;font-size:17px;line-height:1.6}',
    '.cs ul.cs-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column}',
    '.cs ul.cs-list li{padding:14px 0;border-top:1px solid ' + T.line + ';font-size:16px;line-height:1.5}',
    '.cs-how{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:12px;margin-bottom:72px}',
    '.cs-how div{padding:20px;border-radius:' + (T.cardRadius || '12px') + ';background:' + T.panel + ';border:1px solid ' + T.line + '}',
    '.cs-how strong{display:block;margin-bottom:8px;font-weight:600}',
    '.cs-how span{font-size:15px;line-height:1.5;color:' + T.muted + '}',
    '.cs-next{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;padding-top:32px;border-top:1px solid ' + T.line + ';text-decoration:none;color:' + T.ink + '}',
    '.cs-next span:last-child{font-family:' + T.display + ';font-style:' + (T.displayStyle || 'normal') + ';font-size:clamp(36px,6vw,80px);line-height:1;letter-spacing:' + (T.tracking || '-0.04em') + '}',
    '.cs-next:hover span:last-child{color:' + T.accent + '}'
  ].join('');
  document.head.appendChild(css);

  var wrap = document.createElement('div');
  wrap.className = 'cs'; wrap.setAttribute('data-lenis-prevent', ''); wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', 'Project case study');
  var sheet = document.createElement('div'); sheet.className = 'cs-sheet'; wrap.appendChild(sheet);
  document.body.appendChild(wrap);
  var lastFocus = null, current = null;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render(key) {
    var s = STUDIES[key], i = ORDER.indexOf(key), nk = ORDER[(i + 1) % ORDER.length], n = STUDIES[nk];
    var h = '<div class="cs-in">';
    h += '<div class="cs-bar"><button type="button" class="cs-btn cs-close" aria-label="Close case study">← Back</button><span class="cs-kick">' + esc(s.kind) + ' · ' + esc(s.year) + '</span></div>';
    h += '<h2>' + esc(s.title) + '</h2><p class="cs-sum">' + esc(s.summary) + '</p>';
    h += '<dl class="cs-meta"><div><dt>Role</dt><dd>' + esc(s.role) + '</dd></div><div><dt>Stack</dt><dd class="cs-chips">' +
      s.stack.map(function (t) { return '<span class="cs-chip">' + esc(t) + '</span>'; }).join('') + '</dd></div>';
    if (s.links.length) h += '<div><dt>Links</dt><dd class="cs-links">' + s.links.map(function (l) { return '<a class="cs-btn" href="' + l[1] + '" target="_blank" rel="noopener">' + esc(l[0]) + ' ↗</a>'; }).join('') + '</dd></div>';
    h += '</dl>';
    if (s.shots.length) {
      h += '<div class="cs-shots">' + s.shots.map(function (sh) {
        return '<figure class="cs-shot"><span class="dots"><i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i></span><img src="' + sh[0] + '" alt="' + esc(sh[1]) + '" loading="lazy"></figure>';
      }).join('') + '</div>';
    } else if (s.flow) {
      h += '<div class="cs-flow" role="img" aria-label="' + esc(s.flow.join(' to ')) + '">' + s.flow.map(function (f, k) { return '<span>' + esc(f) + '</span>' + (k < s.flow.length - 1 ? '<b aria-hidden="true">→</b>' : ''); }).join('') + '</div>';
    }
    h += '<div class="cs-cols"><div><h3>The problem</h3><p class="cs-body">' + esc(s.problem) + '</p></div><div><h3>What I built</h3><ul class="cs-list">' +
      s.built.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul></div></div>';
    h += '<h3>How it works</h3><div class="cs-how">' + s.how.map(function (x) { return '<div><strong>' + esc(x[0]) + '</strong><span>' + esc(x[1]) + '</span></div>'; }).join('') + '</div>';
    h += '<a class="cs-next" href="#cs-' + nk + '" data-cs-next="' + nk + '"><span class="cs-kick">Next project</span><span>' + esc(n.title) + ' →</span></a>';
    h += '</div>';
    sheet.innerHTML = h;
    sheet.scrollTop = 0;
    sheet.querySelector('.cs-close').addEventListener('click', function () { close(true); });
    sheet.querySelector('[data-cs-next]').addEventListener('click', function (e) { e.preventDefault(); open(nk, true); });
  }
  function open(key, push) {
    if (!STUDIES[key]) return;
    var wasOpen = !!current; current = key;
    if (!wasOpen) lastFocus = document.activeElement;
    render(key);
    wrap.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
    if (push) { try { history.replaceState(null, '', '#cs-' + key); } catch (e) { location.hash = 'cs-' + key; } }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.gsap && !reduce) {
      if (!wasOpen) gsap.fromTo(sheet, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: 'expo.out' });
      gsap.from(sheet.querySelectorAll('h2, .cs-sum, .cs-meta, .cs-shots, .cs-flow'), { y: 40, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: wasOpen ? 0 : 0.15, clearProps: 'transform' });
    }
    sheet.querySelector('.cs-close').focus({ preventScroll: true });
  }
  function close(clearHash) {
    if (!current) return;
    current = null;
    var done = function () { wrap.classList.remove('is-open'); document.documentElement.style.overflow = ''; if (window.__lenis) window.__lenis.start(); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); };
    if (clearHash) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; } }
    if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.to(sheet, { yPercent: 100, duration: 0.55, ease: 'expo.in', onComplete: done });
    else done();
  }
  wrap.addEventListener('click', function (e) { if (e.target === wrap) close(true); });
  document.addEventListener('keydown', function (e) {
    if (!current) return;
    if (e.key === 'Escape') close(true);
    if (e.key === 'Tab') {
      var f = sheet.querySelectorAll('a[href], button');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  function fromHash() { var m = /^#cs-([a-z]+)$/.exec(location.hash); if (m && STUDIES[m[1]]) open(m[1], false); else if (current) close(false); }
  window.addEventListener('hashchange', fromHash);

  // Wire project cards: clicking opens the case study; the live link moves inside the sheet.
  Array.prototype.forEach.call(document.querySelectorAll(T.cards || 'a'), function (a) {
    var key = keyFor(a.textContent || '');
    if (!key) return;
    a.setAttribute('href', '#cs-' + key);
    a.setAttribute('aria-label', 'Read the ' + STUDIES[key].title + ' case study');
    a.removeAttribute('target');
    a.addEventListener('click', function (e) { e.preventDefault(); open(key, true); });
  });
  fromHash();
})();

// Email links can't open from inside the page frame (the browser blocks it), so they copy the address instead.
(function () {
  var T = window.__CS_THEME || {};
  var toast = document.createElement('div');
  toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
  toast.style.cssText = 'position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translate(-50%,20px);z-index:300;opacity:0;pointer-events:none;padding:12px 18px;border-radius:999px;font:500 14px/1.3 ' + (T.body || 'system-ui, sans-serif') + ';background:' + (T.ink || '#111') + ';color:' + (T.bg || '#fff') + ';box-shadow:0 12px 30px -10px rgba(0,0,0,.45);transition:opacity .3s, transform .3s;max-width:calc(100vw - 40px);text-align:center';
  document.body.appendChild(toast);
  var timer;
  function show(msg) {
    toast.textContent = msg; toast.style.opacity = '1'; toast.style.transform = 'translate(-50%,0)';
    clearTimeout(timer); timer = setTimeout(function () { toast.style.opacity = '0'; toast.style.transform = 'translate(-50%,20px)'; }, 2600);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a) return;
    e.preventDefault();
    var addr = decodeURIComponent(a.getAttribute('href').slice(7).split('?')[0]);
    var ok = function () { show('Email copied: ' + addr); };
    var fail = function () { show('Email: ' + addr); };
    try { navigator.clipboard.writeText(addr).then(ok, fail); } catch (err) { fail(); }
  }, true);
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (a) {
    if (!a.getAttribute('title')) a.setAttribute('title', 'Copy email address');
  });
})();
