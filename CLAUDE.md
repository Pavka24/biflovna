# Biflovna – instrukce pro Claude

Biflovna je offline studijní aplikace (ABCD testy + výpisky „Learning“) pro víc předmětů.
Rozesílá se na Discordu: `Instalace/PC/Biflovna-Setup.exe` (PC), `Instalace/Android/Biflovna.apk` (Android) a pro iPhone odkaz na `<webUrl>ios/`
(instalační stránka s profilem `Instalace/iOS/Biflovna.mobileconfig` – Web Clip na webovou verzi hostovanou na GitHub Pages, `scripts/deploy-web.mjs`).
Uživatel komunikuje česky – odpovídej česky.

## Struktura
- `src/subjects/<id>.js` – **jeden soubor = jeden předmět** (otázky + learning). Šablona: `src/subjects/_sablona.js.txt`.
- `src/app.js`, `src/index.html`, `src/styles.css` – aplikace (router, test, výsledky, Learning). Na obsah předmětů nesahej odsud.
- `src/pdf.js` – export výpisků do PDF (jsPDF, skládá z HTML v `learn`; nové bloky ve výpiscích je potřeba doplnit do smyčky na konci `makeLearnPdf`). `assets/pdf-fonts.js` generuje `scripts/make_pdf_font.py`, znovu ho spusť při nových znacích.
- `assets/` – ikony (SVG) a vložené fonty. `desktop/app.py` – PC okno (pywebview). `installer/Biflovna.iss` – instalátor.
- `linux/biflovna.py` – okno pro Linux (GTK 3 + WebKitGTK, bez pywebview). `scripts/build-linux.mjs` z něj a z `dist/www` skládá `Instalace/Linux/Biflovna.deb`
  přímo v Node (ar + tar.gz, žádné dpkg), takže se staví i na Windows. Statistiky na Linuxu: `~/.local/share/biflovna`. Stránka pozná Linux podle `IS_LINUX()`
  (`window.webkit.messageHandlers.biflovna`): PDF posílá oknu zprávou (uloží do Stažené), nová verze = lišta „Stáhnout“ → `.deb` v prohlížeči (ručně nainstalovat).
  **Na tomto PC není Linux ani WSL, balíček se tu nedá spustit** – po změně `linux/biflovna.py` to řekni uživateli a nech ho vyzkoušet.
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
   Krátké, ale **celé věty, kterým rozumí i někdo bez přednášky** (žádné heslovité „DNS jména → IP“). Karta se člení `<h3>` nadpisy; `<ul><li>` s `<b>` klíčovými pojmy (barva tématu), `<li class="hl">` pro to nejdůležitější, `<div class="cmp">` se dvěma `<div>` (`yes`/`no` volitelně) na srovnání, `<div class="grid2">` na seznamy pojmů,
   tabulky `<table class="lt">` (řádek `class="g"` = doporučené/zelené, `class="r"` = nedoporučené/červené).
   Uvnitř šablonového řetězce nepoužívej zpětný apostrof ani `${`.
5. **Ověř:** `node scripts/validate.mjs` (musí být 0 chyb, varování oprav), pak
   `node scripts/build-web.mjs` a `~/.local/bin/uv.exe run --no-project --python 3.13 --with pywebview python scripts/smoke_test.py`.
6. **Vydej** (nasazení webu na GitHub Pages je veřejné – jde tam jen sestavený web, nikdy `signing/` ani zdroje): zvyš verzi v `package.json` (nový předmět = minor `1.1.0`, opravy = patch) a spusť `node scripts/release.mjs`.
   Výsledné 2 soubory jsou v `Instalace/`. Uživateli shrň: kolik otázek/témat, co bylo nejasné, a připomeň rozeslat nové soubory.

## Aktualizace (jak se nová verze dostane k lidem)
- **Pravidlo od uživatele: po každé změně aplikace nebo obsahu vydej update sám, bez ptaní.** Ověř (validate, build, smoke test), zvyš patch verzi v `package.json`
  (nový předmět = minor) a spusť `node scripts/release.mjs`. Nakonec zkontroluj živý `version.json`. Pokud ověření selže, nevydávej a řekni to.
- `node scripts/release.mjs` (bez přepínačů) = sestaví PC+Android+Linux+iOS → nahraje instalátory na **GitHub Releases** (`scripts/publish-release.mjs`)
  → nasadí web na **GitHub Pages** (`scripts/deploy-web.mjs`) včetně `version.json` a `subjects.json`.
- **Co je nového:** před každým vydáním přidej nahoru do `CHANGELOG` v `src/app.js` krátký záznam (build bez něj spadne).
- **Otázky/learning** se do nainstalovaných aplikací stáhnou samy při startu s internetem (`subjects.json`, uloží se do localStorage → offline).
  Stačí tedy vydat; přeinstalace není potřeba. `contentMinApp` v package.json = nejnižší verze appky, která nový formát obsahu umí.
- **Nová verze aplikace** (změna `src/app.js`/designu) → zvýšit `version`. PC: stáhne se samo na pozadí (`Api.prepare`), lišta „připravená“ →
  „Restartovat teď“ (`Api.apply`) nebo tichá instalace po zavření okna (`/NORELAUNCH`). Android: nativní `UpdaterPlugin.java` stáhne APK
  v aplikaci a otevře instalaci. iPhone: service worker.
- **Cache:** PC maže HTTP cache WebView2 při startu (`clear_http_cache`), iPhone má stránku network-first s fallbackem na cache. Seznam souborů pro service worker se bere z toho, co v buildu opravdu je (jeden 404 by shodil celou instalaci).
- **Ukazatel v hlavičce** (`#net`): 1× po spuštění se zeptá GitHubu (`version.json`) → Aktuální / Offline / Nová verze (klik = aktualizovat).
- **Git:** repo `Pavka24/biflovna` – větev `main` = zdrojáky (release.mjs sám commitne + pushne), `gh-pages` = web, Releases = instalátory.
  Starší releasy jde mazat (`gh release delete vX --cleanup-tag`), odkazy `latest/download` vedou vždy na nejnovější.
- Nikdy nevydávej verzi s nižším číslem než poslední na Releases. Odkazy: `https://github.com/pavka24/biflovna/releases/latest/download/<soubor>`.

## Pokračování na jiném počítači / v jiném sezení
- **Repo:** `git clone https://github.com/Pavka24/biflovna`. Nemá nastavený remote (push jde přes token v `release.mjs`), stav ověřuj přes GitHub API nebo živý `version.json`. Aktuální číslo verze je v `package.json`, historie v `CHANGELOG` (`src/app.js`).
- **V gitu NENÍ a je potřeba přenést ručně** (repo je veřejné, proto nikam nenahrávat):
  - `signing/biflovna.jks` + `signing/keystore.properties` – **bez nich nejde vydat APK, které se nainstaluje přes stávající verzi**.
  - Prezentace `.ppsx` (pošle uživatel), `Instalace/`, `dist/`, `build/` (vzniknou buildem).
- **Nástroje:** Node, `~/.local/bin/uv.exe`, `npm install` v rootu. `%LOCALAPPDATA%\BiflovnaTools\` musí obsahovat `jdk`, `android-sdk`, `inno` (ISCC.exe), `gh\bin\gh.exe`.
  GitHub přihlášení: `"%LOCALAPPDATA%\BiflovnaTools\gh\bin\gh.exe" auth login` (účet Pavka24). `release.mjs` je psaný pro Windows.
- **Bez lokálních nástrojů** lze upravovat kód a obsah a commitovat, ale **nevydávat**: appky by se bez nové verze na Releases/Pages neaktualizovaly.

### Workflow každé změny
1. Úprava (`src/…`, obsah v `src/subjects/`).
2. Zvýšit patch v `package.json` a přidat záznam nahoru do `CHANGELOG` (`{ v, added: [], fixed: [] }`, česky, krátce, jen to, co pozná uživatel; zobrazí se jako verze + Nové/Opraveno).
3. `node scripts/validate.mjs` → `node scripts/build-web.mjs` → `uv … scripts/smoke_test.py`.
4. U UI změn změřit reálné rozložení v šířce telefonu (viz níže), ne jen to, že prvek existuje.
5. `node scripts/release.mjs` – **commitne sám** (zpráva `Biflovna X.Y.Z` + řádek `Co-Authored-By`), pushne `main`, nahraje Release a web. Ruční commit jen u změn bez vydání (např. dokumentace).
6. Ověřit: živý `version.json`, `releases/latest`, SHA `main` = lokální `HEAD`, `git status` čistý. Uživateli napsat, co je ověřené a co ne (reálný telefon obvykle nemáme).

### Jak dělat otázky (doplňuje postup importu výše)
- Vycházet z přednášek; **rozpory ve slidech nahlas říct** (známé: Cat.6 400 vs 250 MHz, mikrovlny od 100 MHz vs 1 GHz, 6 GHz dva rozsahy, CGN překlep `100.64.0.10/10`, podsíť B překlep `.63`).
- Co uživatel chce: otázky, které by **reálně mohly být v testu**. Definice a parametry z tabulek ano (hlavně kategorie kabelů Cat.5 až Cat.8), k tomu diagnostika poruch, volba řešení podle situace (kabel, vlákno, firewall, protokol) a „proč“.
- Co nechce: **výpočty podsítí a otázky s konkrétními IP adresami/prefixy** (subnetting jen jako pojem, od 1.3.0), barvy vodičů, roky a kuriozity, konkrétní IP adresy služeb, „jak držet konektor“.
- Špatné odpovědi věrohodné a ze stejné oblasti, žádné zjevné nesmysly („Jen v tiskárnách“, „Dosah 1 m“), správná se nesmí poznat podle délky.
- Počty v tématech drž vyrovnané (zhruba 14 až 27). Test si témata střídá dokola (`pick` v `src/app.js`), takže jsou zastoupená rovnoměrně.
- Max 200 na předmět. Změna textu otázky maže její statistiku; když stačí lepší špatné odpovědi, měň jen je. Otázky jsou řádky JSON polí, hromadné úpravy skriptem podle textu otázky.

### Testování na tomto PC (poučení)
- Testy přes pywebview pouštět **mimo obrazovku** (`x=-3000`) s časovým limitem (`threading.Timer` + `os._exit`), jinak uživateli zůstane viset bílé okno. Skripty dávat do scratchpadu.
- Web bez iPhonu ověřit přes lokální server + WebView2. Service worker funguje jen na `localhost`/https a `IS_HOSTED()` je jen pro `github.io`, v testu ho zaregistruj ručně. `evaluate_js` po přenačtení stránky přes service worker může přestat odpovídat, výsledek si pak nech poslat stránkou na testovací server.
- Šířka: okno o 15 px širší než cílová kvůli scrollbaru. Kontroluj 320 a 393 px, `scrollWidth` a pozice prvků.
- Pozor na kolize CSS tříd: `.upd` je plovoucí lišta aktualizace. Před novou třídou ji vyhledej.

### Design pluginy (Claude Code)
`impeccable` (audit, polish, critique; detektor `impeccable detect --json`), `mobile-native` (viewport, dotyk, safe area), `emil-design-eng` + animační skills, `ui-ux-pro-max`, `design-taste-frontend` (spíš weby). Na jiném stroji je nainstaluj zvlášť, projekt na nich nezávisí.

## Build – poznámky k prostředí (Windows tohoto uživatele)
- Python není v PATH → vždy `~/.local/bin/uv.exe run --no-project --python 3.13 ...`.
- Nástroje jsou v `%LOCALAPPDATA%\BiflovnaTools` (JDK 21, Android SDK, Inno Setup). `scripts/release.mjs` si je najde sám.
- **Smart App Control** na tomto PC blokuje nepodepsané exe (i vlastní `Biflovna.exe`/`Setup.exe` a `pyinstaller.exe`) →
  PyInstaller spouštěj jako `python -m PyInstaller`, aplikaci testuj přes `scripts/smoke_test.py` (ne spuštěním exe).
- MT5/jiné projekty v nadřazené složce nesouvisí.

## Design (neměnit bez důvodu)
Od 1.3.0 „Liquid Glass“ (schváleno uživatelem na ukázce): průsvitné skleněné vrstvy (`backdrop-filter`) nad pomalu plynoucím barevným pozadím (`.scene`),
plovoucí spodní lišta předmětu (`#dock`: Předměty / Test / Learning), inkoustově modrý akcent `#1D4ED8` (**ne fialová**), světlý i tmavý režim.
- **Tmavý režim musí být opravdu tmavý** (podklad `#020306`, tlumené skvrny). **Žádné rušivé prvky**: nic nesmí reagovat na pohyb myši (odlesky, paralaxa), žádné pulzování.
- **Písmo jen Inter** (nadpisy i text). Playfair Display uživatel odmítl jako špatně čitelný; build ho z `assets/fonts.css` vyřazuje.
- Tokeny a sklo jsou v `src/styles.css` (začátek souboru + sekce „LIQUID GLASS“ na konci). `--card` a `--bg-soft` jsou průsvitné, na neprůhledné plochy použij `--solid`.
- Rozostření pozadí jen na pár velkých ploch a plovoucích prvcích; dlouhé seznamy (`.lc`, `.ri`) ho kvůli výkonu na telefonu nemají.
- Pohyb: `scale(.97)` na stisk, ease-out `cubic-bezier(.23,1,.32,1)`, pružina `--spring` jen u přepínače a odpovědí, žádné animace u akcí z klávesnice,
  hover jen pro `(hover:hover) and (pointer:fine)`, respektovat `prefers-reduced-motion` a `prefers-reduced-transparency`. SVG ikony, žádné emoji.
