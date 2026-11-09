"""Vyrenderuje ikony Biflovny do build/icons/ (PNG pro PWA/Android + .ico pro Windows).
Návrh: tmavá půlnoční modř, krémový monogram „B“ (Playfair Display) a zlatá záložka (stužka) shora.
Kreslí se na <canvas> ve WebView2 s vloženým fontem z assets/fonts.css (stejný font jako v aplikaci).
Spouštět: uv run --no-project --python 3.13 --with pywebview --with pillow python scripts/render_icons.py
"""
import base64
import json
import os
import time

import webview
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "build", "icons")
os.makedirs(OUT, exist_ok=True)
FONTS = open(os.path.join(ROOT, "assets", "fonts.css"), encoding="utf-8").read()

# (mode, size, file)   mode: full = zaoblená ikona, bleed = plnoplošná (maskable), fg = jen monogram, bg = jen pozadí
JOBS = [("full", s, f"icon-{s}.png") for s in (16, 24, 32, 48, 64, 128, 256, 512, 1024)]
JOBS += [("bleed", 512, "maskable-512.png"), ("bleed", 192, "maskable-192.png"), ("bleed", 180, "apple-touch-180.png")]
for d, s in (("mdpi", 48), ("hdpi", 72), ("xhdpi", 96), ("xxhdpi", 144), ("xxxhdpi", 192)):
    JOBS += [("full", s, f"android/mipmap-{d}/ic_launcher.png"), ("round", s, f"android/mipmap-{d}/ic_launcher_round.png")]
for d, s in (("mdpi", 108), ("hdpi", 162), ("xhdpi", 216), ("xxhdpi", 324), ("xxxhdpi", 432)):
    JOBS += [("fg", s, f"android/mipmap-{d}/ic_launcher_foreground.png"), ("bg", s, f"android/mipmap-{d}/ic_launcher_background.png")]

JOBS += [("full", s, f"logo-{s}.png") for s in (96,)]                       # logo v aplikaci + favicon
JOBS += [("wizard", [164, 314], "wizard-164.png"), ("wizard", [328, 628], "wizard-328.png"), ("full", 55, "wizsmall-55.png"), ("full", 110, "wizsmall-110.png")]

PAGE = "<html><head><style>%s</style></head><body style='font-family:\"Playfair Display\"'>B</body></html>" % FONTS

JS = r"""
(async function(jobs){
  await document.fonts.load('600 100px "Playfair Display"'); await document.fonts.load('400 20px "Inter"');
  // ---- paleta ----
  const INK0 = '#232C42', INK1 = '#141A28', INK2 = '#0A0D15';
  function bg(x, W, H, r){
    x.save(); x.beginPath(); x.roundRect(0, 0, W, H, r); x.clip();
    const g = x.createLinearGradient(0, 0, W*.6, H);
    g.addColorStop(0, INK0); g.addColorStop(.55, INK1); g.addColorStop(1, INK2);
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    const rg = x.createRadialGradient(W*.22, H*.12, 0, W*.22, H*.12, Math.max(W, H)*.85);   // měkké světlo zleva nahoře
    rg.addColorStop(0, 'rgba(255,255,255,.11)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = rg; x.fillRect(0, 0, W, H);
    x.restore();
  }
  // monogram „B“ + zlatá záložka; (cx, cy) střed, U = velikost čtverce značky
  function mark(x, cx, cy, U, clipR){
    const top = cy - U/2;
    // B
    const fs = U*.60;
    x.font = `600 ${fs}px "Playfair Display"`; x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    const m = x.measureText('B'), h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
    const bx = cx - U*.035, base = cy + h/2 - m.actualBoundingBoxDescent + U*.05;
    const g = x.createLinearGradient(0, base - h, 0, base);
    g.addColorStop(0, '#FCF8EF'); g.addColorStop(1, '#E6D7B8');
    x.fillStyle = g; x.fillText('B', bx, base);
    // záložka (stužka s výřezem) – visí shora přes pravé horní bříško písmene
    if (U < 20) return;
    const w = U*.13, rx = cx + U*.17, y0 = top, y1 = cy - U*.02, notch = U*.055;
    x.save();
    if (clipR !== undefined) { x.beginPath(); x.roundRect(cx - U/2, top, U, U, clipR); x.clip(); }
    x.shadowColor = 'rgba(0,0,0,.45)'; x.shadowBlur = U*.035; x.shadowOffsetY = U*.012;
    const rg = x.createLinearGradient(rx, 0, rx + w, 0);
    rg.addColorStop(0, '#F1DCA6'); rg.addColorStop(.55, '#D9B56E'); rg.addColorStop(1, '#A87C3C');
    x.fillStyle = rg; x.beginPath();
    x.moveTo(rx, y0); x.lineTo(rx + w, y0); x.lineTo(rx + w, y1); x.lineTo(rx + w/2, y1 - notch); x.lineTo(rx, y1); x.closePath(); x.fill();
    x.shadowColor = 'transparent';
    x.fillStyle = 'rgba(255,255,255,.28)'; x.fillRect(rx + w*.16, y0, Math.max(1, w*.07), y1 - y0 - notch*.9);   // lesk
    x.restore();
  }
  const out = {};
  for (const [mode, size, name] of jobs) {
    const [W, H] = Array.isArray(size) ? size : [size, size], S = W;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    if (mode === 'full')  { const r = S*.225; bg(x, S, S, r); mark(x, S/2, S/2, S, r); }
    if (mode === 'round') { x.beginPath(); x.arc(S/2, S/2, S/2, 0, Math.PI*2); x.clip(); bg(x, S, S, 0); mark(x, S/2, S/2, S*.92, S*.46); }
    if (mode === 'bleed') { bg(x, S, S, 0); mark(x, S/2, S/2, S*.78, S*.12); }
    if (mode === 'bg')    { bg(x, S, S, 0); }
    if (mode === 'fg')    { mark(x, S/2, S/2, S*.62, S*.14); }
    if (mode === 'wizard'){ bg(x, W, H, 0); mark(x, W/2, H*.40, W*.62, W*.62*.225);
      x.font = `600 ${W*.15}px "Playfair Display"`; x.textAlign = 'center'; x.fillStyle = '#F4ECDC'; x.fillText('Biflovna', W/2, H*.70);
      x.font = `${W*.062}px "Inter", sans-serif`; x.fillStyle = 'rgba(244,236,220,.6)'; x.fillText('testy a výpisky', W/2, H*.77); }
    out[name] = c.toDataURL('image/png');
  }
  window.__icons = JSON.stringify(out);
})(%s);
""" % json.dumps(JOBS)


def run(w):
    time.sleep(1)
    w.evaluate_js(JS)
    for _ in range(150):
        r = w.evaluate_js("window.__icons || null")
        if r:
            for name, url in json.loads(r).items():
                p = os.path.join(OUT, name)
                os.makedirs(os.path.dirname(p), exist_ok=True)
                with open(p, "wb") as f:
                    f.write(base64.b64decode(url.split(",", 1)[1]))
            break
        time.sleep(0.2)
    w.destroy()


w = webview.create_window("icons", html=PAGE, hidden=True)
webview.start(run, w, private_mode=True)

imgs = [Image.open(os.path.join(OUT, f"icon-{s}.png")).convert("RGBA") for s in (16, 24, 32, 48, 64, 128, 256)]
imgs[-1].save(os.path.join(OUT, "icon.ico"), sizes=[(i.width, i.height) for i in imgs], append_images=imgs[:-1])
# obrázky pro průvodce instalací (Inno Setup chce BMP bez průhlednosti)
for n, bgc in (("wizard-164", None), ("wizard-328", None), ("wizsmall-55", (255, 255, 255)), ("wizsmall-110", (255, 255, 255))):
    im = Image.open(os.path.join(OUT, n + ".png")).convert("RGBA")
    flat = Image.new("RGB", im.size, bgc or (20, 26, 40)); flat.paste(im, mask=im.split()[3]); flat.save(os.path.join(OUT, n + ".bmp"))
print("ikony OK:", sum(len(f) for _, _, f in os.walk(OUT)))
