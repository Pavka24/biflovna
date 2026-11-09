"""Biflovna – desktopová verze (okno WebView2 nad dist/www/index.html) + samoaktualizace.

Aktualizace: aplikace (JS) zjistí novou verzi z version.json → zavolá Api.prepare(url), které na pozadí
stáhne instalátor z GitHub Releases. Pak buď Api.apply() (tlačítko „Restartovat teď“), nebo se instalátor
tiše spustí sám po zavření okna.
"""
import os
import shutil
import subprocess
import sys
import tempfile
import threading
import urllib.request

import webview

APP = "Biflovna"
ALLOWED = ("https://github.com/", "https://objects.githubusercontent.com/", "https://release-assets.githubusercontent.com/")
SETUP = os.path.join(tempfile.gettempdir(), "Biflovna-Setup.exe")
state = {"ready": False, "launched": False}


def resource(*parts: str) -> str:
    base = getattr(sys, "_MEIPASS", os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "dist"))
    return os.path.join(base, *parts)


def run_installer(relaunch: bool) -> None:
    if state["launched"] or not state["ready"]:
        return
    state["launched"] = True
    args = [SETUP, "/VERYSILENT", "/SUPPRESSMSGBOXES", "/NORESTART", "/CLOSEAPPLICATIONS"]
    if not relaunch:
        args.append("/NORELAUNCH")
    subprocess.Popen(args, creationflags=getattr(subprocess, "DETACHED_PROCESS", 0) | getattr(subprocess, "CREATE_NEW_PROCESS_GROUP", 0))


def clear_http_cache(storage: str) -> None:
    """Smaže HTTP cache WebView2 (statistiky v Local Storage zůstanou).

    Stránka se načítá pořád ze stejné adresy (127.0.0.1:42001), takže by po aktualizaci WebView2 ukázal
    starou verzi z cache a ta by aktualizaci nabízela znovu a znovu.
    """
    for name in ("Cache", "Code Cache"):
        shutil.rmtree(os.path.join(storage, "EBWebView", "Default", name), ignore_errors=True)


class Api:
    """Funkce volané z aplikace (window.pywebview.api)."""

    def prepare(self, url: str):
        """Stáhne instalátor nové verze (na pozadí, volá se automaticky)."""
        if not isinstance(url, str) or not url.startswith(ALLOWED[0]):
            return {"ok": False, "error": "neplatná adresa"}
        try:
            tmp = SETUP + ".part"
            req = urllib.request.Request(url, headers={"User-Agent": "Biflovna-updater"})
            with urllib.request.urlopen(req, timeout=120) as r, open(tmp, "wb") as f:
                if not r.geturl().startswith(ALLOWED):
                    return {"ok": False, "error": "neočekávaný server"}
                f.write(r.read())
            if os.path.getsize(tmp) < 1_000_000:
                return {"ok": False, "error": "poškozené stažení"}
            os.replace(tmp, SETUP)
            state["ready"] = True
            return {"ok": True}
        except Exception as e:  # noqa: BLE001
            return {"ok": False, "error": str(e)}

    def apply(self):
        """Nainstaluje staženou verzi hned a aplikaci znovu spustí."""
        if not state["ready"]:
            return {"ok": False, "error": "aktualizace není stažená"}
        run_installer(relaunch=True)
        threading.Timer(0.4, lambda: [w.destroy() for w in list(webview.windows)]).start()
        return {"ok": True}

    # zpětná kompatibilita s verzí 1.1.0 (stáhnout + hned nainstalovat)
    def update(self, url: str):
        r = self.prepare(url)
        return self.apply() if r.get("ok") else r


if __name__ == "__main__":
    storage = os.path.join(os.environ.get("APPDATA", os.path.expanduser("~")), APP)
    os.makedirs(storage, exist_ok=True)
    clear_http_cache(storage)
    window = webview.create_window(
        APP,
        url=resource("www", "index.html"),
        js_api=Api(),
        width=1120,
        height=880,
        min_size=(380, 560),
        background_color="#FAF9F6",
        text_select=True,
    )
    # stažená aktualizace se po zavření okna nainstaluje sama (bez znovuspuštění)
    window.events.closed += lambda: run_installer(relaunch=False)
    # private_mode=False + storage_path => statistiky (localStorage) přežijí zavření aplikace
    webview.start(private_mode=False, storage_path=storage)
