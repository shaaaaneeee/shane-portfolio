# Shane Lee — portfolio site (handover)

Static one-page portfolio. No framework, no bundler. Designed and built in a claude.ai session, then handed over for deployment.

## Layout
- `public/` — deployable output. `index.html` + `img/`. Deploy this folder as-is.
- `src/` — sources. Edit these, then run `python3 src/build.py` to regenerate `public/index.html`.
  - `src.html` — markup + all CSS (sections: hero, ticker, `#work`, bento, `#desk`, `#about`, `#contact`).
  - `config.js` — page-specific GSAP motion (`window.__MOTION`): hero card shrink + light→dark flip, binary portrait canvas, WebGL flow background, liquid-glass nav pill, pinned horizontal Work scroll, desk window entrance.
  - `motion.js` — shared engine: char-split reveals, magnetic buttons, custom cursor, Lenis smooth scroll, anchor-jump easing (handles pinned sections via `.pin-spacer`).
  - `casestudy.js` — full-screen case-study sheets, deep-linkable as `#cs-<key>`.
  - `cs_themes.py` — case-study theme + image list. `portrait.json` — 140×78 binary-portrait grid (`window.__PORTRAIT`).
  - `img/` — all images.

## Runtime dependencies (CDN, pinned)
GSAP 3.12.5 + ScrollTrigger (cdnjs), Lenis 1.1.13 (unpkg), Google Fonts: Bricolage Grotesque, Onest, Geist Mono, Instrument Serif, Press Start 2P.

## Gotchas
- Page must render in standards mode (`<!doctype html>` is prepended by build.py). Without it Lenis breaks.
- Work section pins only for `(min-width:900px), (hover:hover) and (pointer:fine)`; touch phones get a native swipe rail. CSS media queries in `src.html` and `gsap.matchMedia` in `config.js` must stay in sync.
- Email links use copy-to-clipboard + toast (mailto was blocked in the claude.ai iframe). On a real domain, plain `mailto:` would work again if preferred.
- Desk wallpaper `img/hill.jpg` is "house on hill" by Chris Barbalis, Unsplash licence (https://unsplash.com/photos/05902e-ZscE). Credit is in the wallpaper's `title` attribute.
- `#desk` windows are draggable (inline script in `src.html`), clamped above the taskbar.

## Suggested next steps
1. Add `<html lang="en">`, meta description, Open Graph/Twitter tags + share image, favicon.
2. Deploy `public/` to Vercel (static, no build command, output dir `public`), replacing the old portfolio at portfolio-shaaaaneeees-projects.vercel.app or a new project.
3. Lighthouse pass: lazy-load below-fold images, `font-display: swap` is already set via Google Fonts URL.
4. Optional: self-host GSAP/Lenis/fonts instead of CDNs.

Live preview of the final design (private claude.ai artifact): https://claude.ai/artifact/LthmTq8z2zy3uDGF2Vitof
