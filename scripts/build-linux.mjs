// Sestaví Instalace/Linux/Biflovna.deb (Linux Mint, Ubuntu, Debian) z dist/www a linux/biflovna.py.
// Balíček se skládá přímo v Node (formát ar + tar.gz), takže jde vyrobit i na Windows bez dpkg.
// Spuštění: node scripts/build-web.mjs && node scripts/build-linux.mjs
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const WWW = path.join(ROOT, "dist", "www");
const OUT = path.join(ROOT, "Instalace", "Linux");
const now = Math.floor(Date.now() / 1000);
const lf = s => Buffer.from(s.replace(/\r\n/g, "\n"), "utf8");            // unixové konce řádků (skripty by s CRLF nešly spustit)

// ---------- soubory v balíčku: cesta → { data, mode } ----------
const files = new Map();
const add = (p, data, mode = 0o644) => files.set(p, { data: Buffer.isBuffer(data) ? data : lf(data), mode });
add("opt/biflovna/biflovna.py", lf(fs.readFileSync(path.join(ROOT, "linux", "biflovna.py"), "utf8")), 0o755);
add("opt/biflovna/www/index.html", fs.readFileSync(path.join(WWW, "index.html")));
add("usr/bin/biflovna", `#!/bin/sh\nexec /usr/bin/python3 /opt/biflovna/biflovna.py "$@"\n`, 0o755);
add("usr/share/applications/biflovna.desktop", `[Desktop Entry]
Type=Application
Version=1.0
Name=Biflovna
GenericName=Studijní testy
Comment=Trénovací testy a stručné výpisky ke zkouškám
Exec=biflovna
Icon=biflovna
Terminal=false
Categories=Education;
StartupWMClass=biflovna
StartupNotify=true
`);
for (const n of [48, 64, 128, 256, 512])
  add(`usr/share/icons/hicolor/${n}x${n}/apps/biflovna.png`, fs.readFileSync(path.join(ROOT, "build", "icons", `icon-${n}.png`)));
add("usr/share/doc/biflovna/copyright", `Biflovna ${pkg.version}\nZdrojový kód: https://github.com/pavka24/biflovna\n`);

const installedKb = Math.ceil([...files.values()].reduce((a, f) => a + f.data.length, 0) / 1024);
const control = `Package: biflovna
Version: ${pkg.version}
Section: education
Priority: optional
Architecture: all
Depends: python3, python3-gi, gir1.2-gtk-3.0, gir1.2-webkit2-4.1 | gir1.2-webkit2-4.0
Installed-Size: ${installedKb}
Maintainer: Pavka24 <pavka24@users.noreply.github.com>
Homepage: https://github.com/pavka24/biflovna
Description: Studijni testy a vypisky ke zkouskam
 Biflovna je offline aplikace na uceni: ABCD testy s okamzitou zpetnou
 vazbou, statistiky a strucne vypisky. Otazky se aktualizuji samy.
`;

// ---------- tar (ustar) ----------
function tarHeader(name, size, mode, type) {
  const h = Buffer.alloc(512);
  if (Buffer.byteLength(name) > 100) throw new Error("příliš dlouhá cesta v balíčku: " + name);
  const oct = (v, len) => v.toString(8).padStart(len - 1, "0") + "\0";
  h.write(name, 0, "utf8");
  h.write(oct(mode, 8), 100); h.write(oct(0, 8), 108); h.write(oct(0, 8), 116);       // mode, uid, gid (root)
  h.write(oct(size, 12), 124); h.write(oct(now, 12), 136);
  h.write("        ", 148);                                                           // místo pro kontrolní součet
  h.write(type, 156); h.write("ustar\0", 257); h.write("00", 263);
  h.write("root", 265); h.write("root", 297);
  let sum = 0; for (const b of h) sum += b;
  h.write(sum.toString(8).padStart(6, "0") + "\0 ", 148);
  return h;
}
function tarGz(entries) {                                   // entries: Map cesta → { data, mode }; adresáře se doplní samy
  const dirs = new Set();
  for (const p of entries.keys()) { const parts = p.split("/"); for (let i = 1; i < parts.length; i++) dirs.add(parts.slice(0, i).join("/")); }
  const blocks = [tarHeader("./", 0, 0o755, "5")];
  const all = [...[...dirs].map(d => [d + "/", null]), ...entries].sort((a, b) => (a[0] < b[0] ? -1 : 1));
  for (const [p, f] of all) {
    if (!f) { blocks.push(tarHeader("./" + p, 0, 0o755, "5")); continue; }
    blocks.push(tarHeader("./" + p, f.data.length, f.mode, "0"), f.data, Buffer.alloc((512 - (f.data.length % 512)) % 512));
  }
  blocks.push(Buffer.alloc(1024));
  return zlib.gzipSync(Buffer.concat(blocks), { level: 9 });
}

// ---------- ar (obal .deb) ----------
function ar(members) {
  const parts = [Buffer.from("!<arch>\n")];
  for (const [name, data] of members) {
    const head = name.padEnd(16) + String(now).padEnd(12) + "0".padEnd(6) + "0".padEnd(6) + "100644".padEnd(8) + String(data.length).padEnd(10) + "`\n";
    parts.push(Buffer.from(head, "latin1"), data);
    if (data.length % 2) parts.push(Buffer.from("\n"));
  }
  return Buffer.concat(parts);
}

const controlTar = tarGz(new Map([["control", { data: lf(control), mode: 0o644 }]]));
const dataTar = tarGz(files);
const deb = ar([["debian-binary", Buffer.from("2.0\n")], ["control.tar.gz", controlTar], ["data.tar.gz", dataTar]]);
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "Biflovna.deb"), deb);
console.log(`Biflovna ${pkg.version} → Instalace/Linux/Biflovna.deb (${(deb.length / 1048576).toFixed(1)} MB, ${files.size} souborů)`);
