#!/usr/bin/python3
"""Biflovna pro Linux: okno aplikace (GTK 3 + WebKitGTK). Web je vedle tohoto souboru ve složce www.

Balíček .deb sestavuje scripts/build-linux.mjs. Závislosti: python3-gi, gir1.2-gtk-3.0, gir1.2-webkit2-4.1 (nebo 4.0).
Statistiky a stažené otázky se ukládají do ~/.local/share/biflovna.
"""
import base64
import json
import os
import sys

import gi

gi.require_version("Gtk", "3.0")
gi.require_version("Gdk", "3.0")
try:
    gi.require_version("WebKit2", "4.1")
except ValueError:
    gi.require_version("WebKit2", "4.0")
from gi.repository import Gdk, Gio, GLib, Gtk, WebKit2  # noqa: E402

HERE = os.path.dirname(os.path.realpath(__file__))
INDEX = os.path.join(HERE, "www", "index.html")
APP_ID = "io.github.pavka24.biflovna"


def run_js(view, code):
    """Spustí JavaScript ve stránce (novější WebKitGTK má evaluate_javascript, starší run_javascript)."""
    try:
        if hasattr(view, "evaluate_javascript"):
            view.evaluate_javascript(code, -1, None, None, None, None, None)
        else:
            view.run_javascript(code, None, None, None)
    except Exception as e:  # noqa: BLE001
        print("biflovna: JS se nepodařilo spustit:", e, file=sys.stderr)


def downloads_dir():
    d = GLib.get_user_special_dir(GLib.UserDirectory.DIRECTORY_DOWNLOAD)
    return d if d and os.path.isdir(d) else os.path.expanduser("~")


def unique_path(folder, name):
    name = os.path.basename(name) or "Biflovna.pdf"
    stem, ext = os.path.splitext(name)
    path, n = os.path.join(folder, name), 1
    while os.path.exists(path):
        n += 1
        path = os.path.join(folder, f"{stem} ({n}){ext}")
    return path


def on_message(_manager, result, view):
    """Zprávy ze stránky: zatím jen uložení PDF s výpisky do složky Stažené."""
    try:
        value = result.get_js_value() if hasattr(result, "get_js_value") else result
        msg = json.loads(value.to_string())
        if msg.get("pdf"):
            path = unique_path(downloads_dir(), msg.get("name", "Biflovna.pdf"))
            with open(path, "wb") as f:
                f.write(base64.b64decode(msg["pdf"]))
            folder = os.path.basename(os.path.dirname(path)) or "domovské složce"
            run_js(view, "toast(%s)" % json.dumps(f"PDF je uložené ve složce {folder}"))
    except Exception as e:  # noqa: BLE001
        print("biflovna: PDF se nepodařilo uložit:", e, file=sys.stderr)
        run_js(view, "toast('PDF se nepodařilo uložit')")


def on_policy(_view, decision, kind):
    """Odkazy na web (stažení nové verze) se otevřou ve výchozím prohlížeči, ne v okně aplikace."""
    if kind in (WebKit2.PolicyDecisionType.NAVIGATION_ACTION, WebKit2.PolicyDecisionType.NEW_WINDOW_ACTION):
        uri = decision.get_navigation_action().get_request().get_uri() or ""
        if uri.startswith(("http://", "https://")):
            try:
                Gio.AppInfo.launch_default_for_uri(uri, None)
            except GLib.Error as e:
                print("biflovna: odkaz se nepodařilo otevřít:", e, file=sys.stderr)
            decision.ignore()
            return True
    return False


class App(Gtk.Application):
    def __init__(self):
        super().__init__(application_id=APP_ID)
        self.win = None

    def do_activate(self):
        if self.win:                                   # druhé spuštění jen zvedne existující okno
            self.win.present()
            return
        data = os.path.join(GLib.get_user_data_dir(), "biflovna")
        cache = os.path.join(GLib.get_user_cache_dir(), "biflovna")
        manager = WebKit2.WebsiteDataManager(base_data_directory=data, base_cache_directory=cache)
        context = WebKit2.WebContext(website_data_manager=manager)
        content = WebKit2.UserContentManager()
        view = WebKit2.WebView(web_context=context, user_content_manager=content)
        content.connect("script-message-received::biflovna", on_message, view)
        content.register_script_message_handler("biflovna")
        view.connect("decide-policy", on_policy)
        view.connect("context-menu", lambda *_: True)  # bez nabídky pravého tlačítka (Zpět, Obnovit…)
        bg = Gdk.RGBA()
        bg.parse("#020306")
        view.set_background_color(bg)
        view.load_uri(GLib.filename_to_uri(INDEX, None))

        self.win = Gtk.ApplicationWindow(application=self, title="Biflovna")
        self.win.set_default_size(1120, 880)
        self.win.set_size_request(380, 560)
        self.win.set_icon_name("biflovna")
        self.win.add(view)
        self.win.show_all()


if __name__ == "__main__":
    GLib.set_prgname("biflovna")
    GLib.set_application_name("Biflovna")
    sys.exit(App().run(sys.argv))
