// Nahraje dist/www na GitHub Pages (repo <uživatel>/biflovna, větev gh-pages).
// Potřebuje jednorázové přihlášení: %LOCALAPPDATA%\BiflovnaTools\gh\bin\gh.exe auth login
// Do repozitáře jde JEN sestavený web (otázky + výpisky), žádné zdrojáky ani podpisový klíč.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GH = path.join(process.env.LOCALAPPDATA, "BiflovnaTools", "gh", "bin", "gh.exe");
const REPO = "biflovna";
const gh = (...a) => execFileSync(GH, a, { encoding: "utf8" }).trim();
const git = (cwd, ...a) => execFileSync("git", a, { cwd, stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" });

const login = gh("api", "user", "-q", ".login");
const full = `${login}/${REPO}`;
try { gh("repo", "view", full, "--json", "name"); }
catch { console.log(`Zakládám repozitář ${full} …`); gh("repo", "create", full, "--public", "--description", "Biflovna – webová verze (pro iPhone)"); }

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const tmp = path.join(ROOT, "build", "pages");
fs.rmSync(tmp, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, "dist", "www"), tmp, { recursive: true });
fs.writeFileSync(path.join(tmp, ".nojekyll"), "");
const token = gh("auth", "token");
git(tmp, "init", "-q", "-b", "gh-pages");
git(tmp, "-c", "user.name=Biflovna", "-c", "user.email=biflovna@users.noreply.github.com", "add", "-A");
git(tmp, "-c", "user.name=Biflovna", "-c", "user.email=biflovna@users.noreply.github.com", "commit", "-q", "-m", `Biflovna ${pkg.version}`);
git(tmp, "push", "-q", "--force", `https://x-access-token:${token}@github.com/${full}.git`, "gh-pages");
fs.rmSync(tmp, { recursive: true, force: true });           // token nezůstane na disku

try { gh("api", "-X", "POST", `repos/${full}/pages`, "-f", "source[branch]=gh-pages", "-f", "source[path]=/"); console.log("GitHub Pages zapnuté."); }
catch { /* už zapnuté */ }
console.log(`Nasazeno: https://${login.toLowerCase()}.github.io/${REPO}/  (iPhone: …/${REPO}/ios/)  – první zveřejnění trvá ~1 min`);
