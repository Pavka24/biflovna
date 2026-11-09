"""Automatický proklik sestavené aplikace (dist/www/index.html) ve WebView2.
Pro každý předmět: otevře ho, dokončí test, zkontroluje výsledek a Learning. Exit 1 při chybě.
Spuštění:  uv run --no-project --python 3.13 --with pywebview python scripts/smoke_test.py
"""
import json
import os
import sys
import time

import webview

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = os.path.join(ROOT, "dist", "www", "index.html")
report = {"ok": False}


def js(w, code, wait=0.25):
    r = w.evaluate_js(code)
    time.sleep(wait)
    return r


def run(w):
    try:
        time.sleep(2)
        js(w, "window.__errs=[];window.addEventListener('error',e=>__errs.push(e.message));")
        ids = json.loads(js(w, "JSON.stringify(SUBJECTS.map(s=>s.id))"))
        report["subjects"] = {}
        for sid in ids:
            js(w, f"localStorage.clear();location.hash='#/s/{sid}'")
            js(w, "document.querySelector('#bStart').click()")
            n = js(w, "T.items.length")
            for _ in range(n):
                js(w, "document.querySelectorAll('#opts .opt')[0].click();document.querySelector('#bNext').click()", 0.05)
            time.sleep(0.4)
            res = json.loads(js(w, "JSON.stringify({hash:location.hash,pct:document.querySelector('#rPct').textContent,rev:document.querySelectorAll('#rev .ri').length})"))
            js(w, f"location.hash='#/s/{sid}/learn'")
            cards = js(w, "document.querySelectorAll('#learnBody .lc').length")
            js(w, "location.hash='#/'")
            seen = js(w, "document.querySelector('.subj-stats').textContent")
            report["subjects"][sid] = {"questions": n, "result": res, "learnCards": cards, "home": seen}
            assert res["hash"].endswith("/result") and res["rev"] == n, f"{sid}: výsledek nesedí {res}"
        report["errors"] = json.loads(js(w, "JSON.stringify(__errs)"))
        report["ok"] = not report["errors"]
    except Exception as e:  # noqa: BLE001
        report["exception"] = str(e)
    finally:
        w.destroy()


w = webview.create_window("smoke", url=URL, width=1000, height=800)
webview.start(run, w, private_mode=True)
print(json.dumps(report, ensure_ascii=False, indent=1))
sys.exit(0 if report["ok"] else 1)
