// Sestaví Biflovnu do jednoho samostatného souboru dist/www/index.html (+ PWA soubory).
// Vše je vložené (fonty, ikony, předměty) – aplikace funguje 100 % offline.
// Spuštění: node scripts/build-web.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const r = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const pkg = JSON.parse(r("package.json"));
const OUT = path.join(ROOT, "dist", "www");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "icons"), { recursive: true });

// --- předměty: každý soubor v src/subjects (kromě _šablon) ---
const subjDir = path.join(ROOT, "src", "subjects");
const subjects = fs.readdirSync(subjDir).filter(f => f.endsWith(".js") && !f.startsWith("_")).sort();
const subjJs = subjects.map(f => `// --- ${f} ---\n` + fs.readFileSync(path.join(subjDir, f), "utf8")).join("\n");

// --- lehká minifikace CSS (bez závislostí) ---
const minCss = css => css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{};,>])\s*/g, "$1").replace(/;}/g, "}").trim();

// --- ikona ---
// ikona: stejné PNG jako všude jinde (build/icons z scripts/render_icons.py)
const png = f => "data:image/png;base64," + fs.readFileSync(path.join(ROOT, "build", "icons", f)).toString("base64");
const back = `<svg class="i" aria-hidden="true"><use href="#i-back"/></svg>`;

// --- obsah pro automatické aktualizace: subjects.json + version.json ---
const subjData = [];
for (const f of subjects) vm.runInNewContext(fs.readFileSync(path.join(subjDir, f), "utf8"), { Biflovna: { subject: x => subjData.push(x) } });
const contentJson = JSON.stringify(subjData);
const hash = crypto.createHash("sha256").update(contentJson).digest("hex").slice(0, 16);
const stateFile = path.join(ROOT, "build", "content-state.json");   // datum se mění jen při změně obsahu
const prev = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, "utf8")) : {};
const date = prev.hash === hash ? prev.date : new Date().toISOString();
fs.mkdirSync(path.dirname(stateFile), { recursive: true });
fs.writeFileSync(stateFile, JSON.stringify({ hash, date }));
const webUrl = pkg.webUrl ? pkg.webUrl.replace(/\/?$/, "/") : "";
let relBase = "";
if (webUrl) {
  const u = new URL(webUrl);
  relBase = `https://github.com/${u.hostname.split(".")[0]}/${u.pathname.split("/").filter(Boolean)[0]}/releases/latest/download/`;
}

const appJs = r("src/app.js").replace(
  "const SUBJECTS = [];",
  `const SUBJECTS = [];\nconst APP_VERSION = ${JSON.stringify(pkg.version)};\nconst CONTENT = ${JSON.stringify({ hash, date })};\nconst UPDATE_URL = ${JSON.stringify(webUrl)};`
);
// app.js definuje registr, předměty se registrují až po něm
const js = appJs + "\n" + subjJs;

const pwa = `<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/apple-touch-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Biflovna">`;

let html = r("src/index.html")
  .replace("<!--PWA-->", pwa)
  .replace("%%FAVICON%%", () => png("icon-64.png"))
  .replace("%%LOGO%%", () => png("logo-96.png"))
  .replace("%%BACK%%", () => back)
  .replace("%%FONTS%%", () => r("assets/fonts.css").trim())
  .replace("%%CSS%%", () => minCss(r("src/styles.css")))
  .replace("%%JS%%", () => js.replace(/<\/script/gi, "<\\/script"));
fs.writeFileSync(path.join(OUT, "index.html"), html);
fs.writeFileSync(path.join(OUT, "subjects.json"), contentJson);
fs.writeFileSync(path.join(OUT, "version.json"), JSON.stringify({
  version: pkg.version, minApp: pkg.contentMinApp || "1.1.0", contentHash: hash, contentDate: date,
  pc: relBase + "Biflovna-Setup.exe", android: relBase + "Biflovna.apk",
}, null, 2));

// --- PWA: manifest + service worker (cache-first, plně offline) ---
const icons = path.join(ROOT, "build", "icons");
for (const f of ["icon-192.png", "icon-512.png", "maskable-192.png", "maskable-512.png", "apple-touch-180.png"])
  if (fs.existsSync(path.join(icons, f))) fs.copyFileSync(path.join(icons, f), path.join(OUT, "icons", f));
fs.writeFileSync(path.join(OUT, "manifest.webmanifest"), JSON.stringify({
  name: "Biflovna", short_name: "Biflovna", lang: "cs",
  description: "Trénovací testy a stručné výpisky ke zkouškám. Funguje offline.",
  start_url: "./", scope: "./", display: "standalone", orientation: "portrait",
  background_color: "#151B2A", theme_color: "#151B2A",
  icons: [
    { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    { src: "icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
}, null, 2));
fs.writeFileSync(path.join(OUT, "sw.js"), `const C="biflovna-${pkg.version}";
const F=["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","icons/apple-touch-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(e.request,c));return n})).catch(()=>caches.match("index.html")))});
`);

const kb = Math.round(Buffer.byteLength(html) / 1024);
console.log(`Biflovna ${pkg.version}: ${subjects.length} předmět(ů) → dist/www/index.html (${kb} KB)`);
