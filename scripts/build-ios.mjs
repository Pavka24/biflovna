// iOS „instalátor“: konfigurační profil (Web Clip) + instalační stránka s návodem.
//   Instalace/iOS/Biflovna.mobileconfig      – soubor ke sdílení
//   dist/www/ios/index.html                  – stránka „Nainstalovat Biflovnu“ (hlavní cesta pro iPhone)
//   dist/www/ios/Biflovna.mobileconfig       – profil ke stažení ze stránky
// Vyžaduje "webUrl" v package.json (adresa, kde běží webová verze, např. https://jmeno.github.io/biflovna/).
// Spouští se po build-web.mjs (release.mjs to dělá sám).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
if (!pkg.webUrl) { console.error("Chybí \"webUrl\" v package.json – nejdřív nastav hosting (viz CLAUDE.md)."); process.exit(1); }
const URL_APP = pkg.webUrl.replace(/\/?$/, "/");
const icon = fs.readFileSync(path.join(ROOT, "build/icons/apple-touch-180.png")).toString("base64");
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Pevná UUID – nová verze profilu nahradí starou místo přidání druhé ikony.
const profile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key><string>com.apple.webClip.managed</string>
      <key>PayloadVersion</key><integer>1</integer>
      <key>PayloadIdentifier</key><string>cz.biflovna.webclip</string>
      <key>PayloadUUID</key><string>3F2B8C1E-7A4D-4E61-9C0B-B1F10A7A2026</string>
      <key>PayloadDisplayName</key><string>Biflovna</string>
      <key>Label</key><string>Biflovna</string>
      <key>URL</key><string>${esc(URL_APP)}</string>
      <key>Icon</key><data>${icon}</data>
      <key>IsRemovable</key><true/>
      <key>FullScreen</key><true/>
      <key>Precomposed</key><true/>
      <key>IgnoreManifestScope</key><true/>
    </dict>
  </array>
  <key>PayloadType</key><string>Configuration</string>
  <key>PayloadVersion</key><integer>1</integer>
  <key>PayloadIdentifier</key><string>cz.biflovna.profile</string>
  <key>PayloadUUID</key><string>9D41E7A2-5B3C-4F08-8E2A-B1F10A7A2026</string>
  <key>PayloadDisplayName</key><string>Biflovna</string>
  <key>PayloadOrganization</key><string>Biflovna</string>
  <key>PayloadDescription</key><string>Přidá na plochu aplikaci Biflovna – testy a výpisky ke zkouškám. Nic jiného nemění, nic nesleduje a jde kdykoli odebrat v Nastavení › Obecné › VPN a správa zařízení.</string>
  <key>PayloadRemovalDisallowed</key><false/>
</dict>
</plist>
`;

const OUT_IOS = path.join(ROOT, "Instalace", "iOS");
fs.rmSync(OUT_IOS, { recursive: true, force: true });
fs.mkdirSync(OUT_IOS, { recursive: true });
fs.writeFileSync(path.join(OUT_IOS, "Biflovna.mobileconfig"), profile);
const WEB_IOS = path.join(ROOT, "dist", "www", "ios");
fs.mkdirSync(WEB_IOS, { recursive: true });
fs.writeFileSync(path.join(WEB_IOS, "Biflovna.mobileconfig"), profile);

// --- instalační stránka (samostatná, bez externích zdrojů) ---
const step = (n, t, d) => `<li><span class="n">${n}</span><div><b>${t}</b><p>${d}</p></div></li>`;
const page = `<!DOCTYPE html>
<html lang="cs"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#FAF9F6">
<title>Nainstalovat Biflovnu</title>
<link rel="apple-touch-icon" href="../icons/apple-touch-180.png">
<style>
:root{--bg:#FAF9F6;--card:#fff;--b:#E7E4DC;--t:#1C1917;--m:#57534E;--p:#1D4ED8;--ink:#151B2A;--gold:#C9A86A}
*{box-sizing:border-box}body{margin:0;font:16px/1.55 -apple-system,"SF Pro Text",system-ui,sans-serif;color:var(--t);background:var(--bg);
padding:env(safe-area-inset-top) 20px calc(32px + env(safe-area-inset-bottom));-webkit-font-smoothing:antialiased}
main{max-width:460px;margin:0 auto}
.logo{width:84px;height:84px;border-radius:20px;display:block;margin:36px auto 18px;box-shadow:0 10px 30px -10px rgba(21,27,42,.5)}
h1{font:600 30px/1.15 "New York","Iowan Old Style",Georgia,serif;text-align:center;margin:0 0 6px;letter-spacing:-.01em}
.sub{text-align:center;color:var(--m);margin:0 0 26px}
.btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:56px;border-radius:14px;border:0;
background:var(--ink);color:#FBF6EC;font:600 18px/1 -apple-system,system-ui,sans-serif;text-decoration:none;transition:transform .16s cubic-bezier(.23,1,.32,1)}
.btn:active{transform:scale(.97)}.btn.ghost{background:transparent;color:var(--p);min-height:44px;font-size:16px}
.card{background:var(--card);border:1px solid var(--b);border-radius:16px;padding:18px 18px 6px;margin:22px 0}
.card h2{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--m);margin:0 0 12px}
ol{list-style:none;margin:0;padding:0}li{display:flex;gap:14px;padding:0 0 14px}
.n{flex:none;width:28px;height:28px;border-radius:50%;background:var(--ink);color:var(--gold);display:grid;place-items:center;font-weight:700;font-size:14px}
li b{display:block}li p{margin:2px 0 0;color:var(--m);font-size:15px}
.warn{display:none;background:#FFF7E6;border:1px solid #F5D9A8;border-radius:14px;padding:14px 16px;margin:0 0 18px;font-size:15px}
.warn b{display:block;margin-bottom:4px}.other{display:none;text-align:center;color:var(--m)}
.foot{text-align:center;color:var(--m);font-size:13px;margin-top:8px}
@media (prefers-color-scheme:dark){:root{--bg:#0F0E0C;--card:#1A1916;--b:#2B2925;--t:#F5F3EE;--m:#B5AFA4;--p:#93B4FF}.btn{background:#FBF6EC;color:var(--ink)}.n{background:#FBF6EC;color:var(--ink)}.warn{background:#2A2214;border-color:#5A4520}}
</style></head>
<body><main>
<img class="logo" src="../icons/apple-touch-180.png" alt="">
<h1>Biflovna pro iPhone</h1>
<p class="sub">Testy a výpisky ke zkouškám. Po instalaci funguje i bez internetu.</p>

<div class="warn" id="inapp"><b>Otevři tuhle stránku v Safari</b>Jsi v prohlížeči uvnitř aplikace (např. Discord). Klepni na <b style="display:inline">⋯</b> nebo ikonu sdílení a zvol <b style="display:inline">Otevřít v Safari</b>.</div>

<div id="ios">
  <a class="btn" href="Biflovna.mobileconfig">Nainstalovat Biflovnu</a>
  <div class="card"><h2>Postup</h2><ol>
    ${step(1, "Potvrď stažení", "Po klepnutí na tlačítko zvol <b style=\"display:inline\">Stáhnout</b> (nebo <b style=\"display:inline\">Povolit</b>).")}
    ${step(2, "Otevři stažený soubor", "V Safari klepni na ikonu stahování <b style=\"display:inline\">↓</b> v adresním řádku a pak na <b style=\"display:inline\">Biflovna.mobileconfig</b>. Pokud se rovnou objevilo „Profil stažen“, tenhle krok přeskoč.")}
    ${step(3, "Nainstaluj v Nastavení", "Otevři <b style=\"display:inline\">Nastavení</b> – hned nahoře je <b style=\"display:inline\">Profil stažen</b>. Klepni na něj, pak <b style=\"display:inline\">Instalovat</b> a zadej kód telefonu.")}
    ${step(4, "Hotovo – Biflovna je na ploše", "Poprvé ji otevři s internetem (načte se pár vteřin), pak už jede offline.")}
  </ol></div>
  <div class="card"><h2>Nebo bez profilu</h2><ol>
    ${step(1, "Otevři Biflovnu", "Klepni na odkaz <b style=\"display:inline\">Otevřít Biflovnu</b> níže.")}
    ${step(2, "Přidej ji na plochu", "Dole klepni na <b style=\"display:inline\">Sdílet</b> (čtverec se šipkou) → <b style=\"display:inline\">Přidat na plochu</b> → <b style=\"display:inline\">Přidat</b>. Funguje stejně, také offline.")}
  </ol></div>
  <a class="btn ghost" href="../">Otevřít Biflovnu</a>
</div>

<p class="other" id="other">Tahle stránka je pro iPhone a iPad.<br>Na počítači a Androidu použij instalační soubor, nebo<br><a class="btn ghost" href="../">otevři webovou verzi</a></p>
<p class="foot">Profil přidá jen ikonu na plochu a jde kdykoli odebrat<br>v Nastavení › Obecné › VPN a správa zařízení.</p>
</main>
<script>
var ua=navigator.userAgent, ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
var safari=ios&&/Safari\\//.test(ua)&&!/CriOS|FxiOS|EdgiOS|OPiOS|Discord|FBAN|FBAV|Instagram/.test(ua);
if(!ios){document.getElementById("ios").style.display="none";document.getElementById("other").style.display="block";}
else if(!safari){document.getElementById("inapp").style.display="block";}
</script>
</body></html>
`;
fs.writeFileSync(path.join(WEB_IOS, "index.html"), page);
console.log(`iOS: Instalace/iOS/Biflovna.mobileconfig + stránka ${URL_APP}ios/`);
