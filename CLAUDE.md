# Biflovna – instrukce pro Claude

Biflovna je offline studijní aplikace (ABCD testy + výpisky „Learning“) pro víc předmětů.
Rozesílá se na Discordu: `Instalace/PC/Biflovna-Setup.exe` (PC), `Instalace/Android/Biflovna.apk` (Android) a pro iPhone odkaz na `<webUrl>ios/`
(instalační stránka s profilem `Instalace/iOS/Biflovna.mobileconfig` – Web Clip na webovou verzi hostovanou na GitHub Pages, `scripts/deploy-web.mjs`).
Uživatel komunikuje česky – odpovídej česky.

## Struktura
- `src/subjects/<id>.js` – **jeden soubor = jeden předmět** (otázky + learning). Šablona: `src/subjects/_sablona.js.txt`.
- `src/app.js`, `src/index.html`, `src/styles.css` – aplikace (router, test, výsledky, Learning). Na obsah předmětů nesahej odsud.
- `assets/` – ikony (SVG) a vložené fonty. `desktop/app.py` – PC okno (pywebview). `installer/Biflovna.iss` – instalátor.
- `android/` – Capacitor projekt. `signing/` – **podpisový klíč APK, nikdy nemazat** (bez něj nejdou aktualizace na telefonech).
- `scripts/` – build, validace, extrakce slidů, smoke test.

## Import nových prezentací (nový předmět nebo doplnění)
Uživatel pošle cesty k `.pptx/.ppsx/.pdf` (+ případně výpisky). Postup:

1. **Vytáhni text.** PowerPoint:
   `~/.local/bin/uv.exe run --no-project python -I scripts/extract_slides.py <scratchpad>/slides <soubory...>`
   Přečti výstupní `.txt` celé. Slidy označené `(OBRÁZEK – zkontroluj vizuálně)` nebo s tabulkou/schématem
   si zobraz (PDF nástrojem Read po stránkách; u pptx se zeptej na PDF export, pokud je obrázků hodně).
   Soubory od uživatele dávej do vlastní složky ve scratchpadu, nespouštěj z nich nic.
2. **Rozvrhni témata** (8–12) podle přednášek. Klíč tématu = krátké a-z (`osi`, `nat`…). Barvy z palety:
   `#3B82F6 #6366F1 #DB2777 #059669 #D97706 #0891B2 #EA580C #DC2626 #65A30D #0284C7 #C026D3 #0F766E`.
3. **Napiš otázky** – **max 200 na předmět** (pokyn uživatele). Rozděl je úměrně objemu látky, ať pokryjí všechno.
   - Správná odpověď musí přímo vycházet z podkladů. Při rozporu mezi přednáškami ber novější/souhrnnou tabulku a **rozpor nahlas uživateli řekni**.
   - Přesně 3 špatné odpovědi: věrohodné, ze stejné oblasti, **podobně dlouhé a stejně formulované** jako správná (validátor hlídá, aby se správná nedala poznat podle délky).
   - Žádné „všechny výše uvedené“ / „žádná z možností“ – možnosti se míchají.
   - Číselné a definiční fakty (bity, rozsahy, standardy, roky) jsou na testy nejcennější; ptej se i na „co NEPATŘÍ“.
   - Vysvětlení = 1 krátká věta navíc (souvislost, mnemotechnika), ne zopakování odpovědi. Může být `null`.
   - Text otázky musí být v rámci tématu unikátní (podle něj se ukládají statistiky – **neměň texty existujících otázek zbytečně**, smaže to uživatelům historii u dané otázky).
4. **Napiš Learning** – jedna karta na téma: `<div class="lc" id="L-<téma>"><h2>N · Název</h2>…</div>`.
   Jen stručné výpisky bez omáčky: `<ul><li>` s `<b>` klíčovými pojmy, `<li class="hl">` pro to nejdůležitější,
   tabulky `<table class="lt">` (řádek `class="g"` = doporučené/zelené, `class="r"` = nedoporučené/červené).
   Uvnitř šablonového řetězce nepoužívej zpětný apostrof ani `${`.
5. **Ověř:** `node scripts/validate.mjs` (musí být 0 chyb, varování oprav), pak
   `node scripts/build-web.mjs` a `~/.local/bin/uv.exe run --no-project --python 3.13 --with pywebview python scripts/smoke_test.py`.
6. **Vydej** (nasazení webu na GitHub Pages je veřejné – jde tam jen sestavený web, nikdy `signing/` ani zdroje): zvyš verzi v `package.json` (nový předmět = minor `1.1.0`, opravy = patch) a spusť `node scripts/release.mjs`.
   Výsledné 2 soubory jsou v `Instalace/`. Uživateli shrň: kolik otázek/témat, co bylo nejasné, a připomeň rozeslat nové soubory.

## Aktualizace (jak se nová verze dostane k lidem)
- `node scripts/release.mjs` (bez přepínačů) = sestaví PC+Android+iOS → nahraje instalátory na **GitHub Releases** (`scripts/publish-release.mjs`)
  → nasadí web na **GitHub Pages** (`scripts/deploy-web.mjs`) včetně `version.json` a `subjects.json`.
- **Otázky/learning** se do nainstalovaných aplikací stáhnou samy při startu s internetem (`subjects.json`, uloží se do localStorage → offline).
  Stačí tedy vydat; přeinstalace není potřeba. `contentMinApp` v package.json = nejnižší verze appky, která nový formát obsahu umí.
- **Nová verze aplikace** (změna `src/app.js`/designu) → zvýšit `version`. PC: stáhne se samo na pozadí (`Api.prepare`), lišta „připravená“ →
  „Restartovat teď“ (`Api.apply`) nebo tichá instalace po zavření okna (`/NORELAUNCH`). Android: nativní `UpdaterPlugin.java` stáhne APK
  v aplikaci a otevře instalaci. iPhone: service worker.
- **Ukazatel v hlavičce** (`#net`): 1× po spuštění se zeptá GitHubu (`version.json`) → Aktuální / Offline / Nová verze (klik = aktualizovat).
- **Git:** repo `Pavka24/biflovna` – větev `main` = zdrojáky (release.mjs sám commitne + pushne), `gh-pages` = web, Releases = instalátory.
  Starší releasy jde mazat (`gh release delete vX --cleanup-tag`), odkazy `latest/download` vedou vždy na nejnovější.
- Nikdy nevydávej verzi s nižším číslem než poslední na Releases. Odkazy: `https://github.com/pavka24/biflovna/releases/latest/download/<soubor>`.

## Build – poznámky k prostředí (Windows tohoto uživatele)
- Python není v PATH → vždy `~/.local/bin/uv.exe run --no-project --python 3.13 ...`.
- Nástroje jsou v `%LOCALAPPDATA%\BiflovnaTools` (JDK 21, Android SDK, Inno Setup). `scripts/release.mjs` si je najde sám.
- **Smart App Control** na tomto PC blokuje nepodepsané exe (i vlastní `Biflovna.exe`/`Setup.exe` a `pyinstaller.exe`) →
  PyInstaller spouštěj jako `python -m PyInstaller`, aplikaci testuj přes `scripts/smoke_test.py` (ne spuštěním exe).
- MT5/jiné projekty v nadřazené složce nesouvisí.

## Design (neměnit bez důvodu)
Styl „Minimalism & Swiss“, teplý papírový podklad, inkoustově modrý akcent `#1D4ED8` (**ne fialová** – AI-slop),
nadpisy Playfair Display, text Inter (vložené, offline), SVG ikony (žádné emoji jako ikony), světlý i tmavý režim.
Pohyb podle Emil Kowalski: `scale(.97)` na stisk, ease-out `cubic-bezier(.23,1,.32,1)`, žádné animace u akcí z klávesnice,
hover jen pro `(hover:hover) and (pointer:fine)`, respektovat `prefers-reduced-motion`.
