# Biflovna

Offline aplikace na učení: ABCD testy po 20 náhodných otázkách, okamžitá zpětná vazba, statistiky a stručné výpisky (Learning).

## Odkazy ke sdílení (vždy nejnovější verze)
- Windows: https://github.com/pavka24/biflovna/releases/latest/download/Biflovna-Setup.exe
- Android: https://github.com/pavka24/biflovna/releases/latest/download/Biflovna.apk
- Linux (Mint, Ubuntu): https://github.com/pavka24/biflovna/releases/latest/download/Biflovna.deb
- iPhone: https://pavka24.github.io/biflovna/ios/

Aplikace se pak aktualizuje sama (otázky automaticky, nová verze aplikace přes lištu „Aktualizovat“).

## Soubory
| Soubor | Pro koho | Instalace |
|---|---|---|
| `Instalace/PC/Biflovna-Setup.exe` | Windows | Spustit → Další → Dokončit. Vytvoří zástupce na ploše a v nabídce Start. Nepotřebuje admin práva. |
| `Instalace/Linux/Biflovna.deb` | Linux Mint, Ubuntu, Debian | Dvojklik → Instalovat balíček (doinstaluje si WebKitGTK). Nebo `sudo apt install ./Biflovna.deb`. Najdeš ji pak v nabídce pod Vzdělávání. |
| `Instalace/Android/Biflovna.apk` | Android | Otevřít v telefonu → povolit „Instalovat z neznámých zdrojů“ → Instalovat. |
| **odkaz** `…github.io/biflovna/ios/` (nebo `Instalace/iOS/Biflovna.mobileconfig`) | iPhone / iPad | Otevřít v **Safari** → Nainstalovat Biflovnu → Povolit → Nastavení › Profil stažen › Instalovat. Poprvé spustit s internetem, pak jede offline. |

Windows u neznámého vydavatele ukáže modré okno *„Systém Windows ochránil váš počítač“* → **Další informace → Přesto spustit**.
Na počítačích se zapnutým *Smart App Control* se nepodepsaný instalátor nespustí vůbec.

## Přidání předmětu
Pošli Claudovi prezentace (pptx/ppsx/pdf) a napiš „přidej předmět do Biflovny“. Postup je popsaný v `CLAUDE.md`.

## Sestavení
```
node scripts/release.mjs          # obojí → Instalace/
node scripts/release.mjs --pc     # jen Windows
node scripts/release.mjs --android
node scripts/release.mjs --linux   # jen balíček .deb
node scripts/release.mjs --ios     # iOS profil + nahrání webu na GitHub Pages
```

## iPhone
Apple nedovoluje instalovat aplikace ze souboru. iOS „instalátor“ je konfigurační profil, který přidá Biflovnu na plochu jako webovou aplikaci (celá obrazovka, offline). Obsah se při prvním spuštění stáhne z GitHub Pages – proto `release.mjs` web při každém vydání nahraje.
Pro iPhone posílej spíš **odkaz** – profil z přílohy Discordu jde nainstalovat jen přes Uložit do Souborů.

## Důležité
- **Zálohuj složku `signing/`** (klíč + heslo k APK). Bez ní nepůjde vydat aktualizaci, kterou si telefony nainstalují přes starou verzi.
- Statistiky se ukládají v zařízení (PC: `%APPDATA%\Biflovna`), aktualizace je nesmaže.
