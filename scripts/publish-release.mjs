// Nahraje instalátory z Instalace/ jako GitHub Release v<verze> (repo z webUrl, např. pavka24/biflovna).
// Stálé odkazy: https://github.com/<user>/biflovna/releases/latest/download/Biflovna-Setup.exe | Biflovna.apk
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GH = path.join(process.env.LOCALAPPDATA, "BiflovnaTools", "gh", "bin", "gh.exe");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const u = new URL(pkg.webUrl);
const repo = `${u.hostname.split(".")[0]}/${u.pathname.split("/").filter(Boolean)[0]}`;
const tag = "v" + pkg.version;
const files = ["PC/Biflovna-Setup.exe", "Android/Biflovna.apk", "iOS/Biflovna.mobileconfig"]
  .map(f => path.join(ROOT, "Instalace", f)).filter(f => fs.existsSync(f));
const gh = (...a) => execFileSync(GH, a, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

const notes = `Biflovna ${pkg.version}

- **Windows:** Biflovna-Setup.exe
- **Android:** Biflovna.apk
- **iPhone:** ${pkg.webUrl}ios/`;
let exists = true;
try { gh("release", "view", tag, "--repo", repo); } catch { exists = false; }
if (exists) gh("release", "upload", tag, ...files, "--repo", repo, "--clobber");
else gh("release", "create", tag, ...files, "--repo", repo, "--title", `Biflovna ${pkg.version}`, "--notes", notes, "--latest");
console.log(`Release ${tag} → https://github.com/${repo}/releases/tag/${tag} (${files.length} souborů)`);
