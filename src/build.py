"""Rebuild public/index.html from the sources in this folder. Run: python3 src/build.py"""
import json, os, shutil, sys
S = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(S, '..', 'public')
sys.path.insert(0, S)
from cs_themes import THEMES
os.makedirs(OUT + '/img', exist_ok=True)
for n in os.listdir(S + '/img'): shutil.copy(f'{S}/img/{n}', f'{OUT}/img/{n}')
theme = dict(THEMES['glass']); theme['cards'] = 'a.w-card'; theme['bg'] = '#0C0E14'
r = lambda n: open(os.path.join(S, n), encoding='utf-8').read()
html = ('<!doctype html>\n' + r('src.html')
  + f"<script>window.__PORTRAIT = {r('portrait.json')};</script>\n"
  + '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n'
  + '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n'
  + '<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>\n'
  + '<script>\n' + r('config.js') + '\n' + r('motion.js') + '\n</script>\n'
  + f'<script>window.__CS_THEME = {json.dumps(theme)};\n' + r('casestudy.js') + '\n</script>\n')
open(OUT + '/index.html', 'w', encoding='utf-8').write(html)
print('built public/index.html', len(html), 'bytes')
