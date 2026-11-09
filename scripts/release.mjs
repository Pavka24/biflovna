// Sestaví VŠE k rozeslání:  Instalace/PC/Biflovna-Setup.exe  +  Instalace/Android/Biflovna.apk  +  Instalace/iOS/Biflovna.mobileconfig
// a nahraje webovou verzi pro iPhone na GitHub Pages.
// Oba soubory jsou samostatné a instalují se bez internetu.
// Spuštění:  node scripts/release.mjs        (verze se bere z package.json)
// Volby:     --pc  jen PC  |  --android  jen Android  |  --ios  jen iOS + nasazení webu
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TOOLS = path.join(process.env.LOCALAPPDATA, "BiflovnaTools");
const UV = path.join(process.env.USERPROFILE, ".local", "bin", "uv.exe");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const [maj, min, pat] = pkg.version.split(".").map(Number);
const versionCode = maj * 10000 + min * 100 + pat;
const only = process.argv.slice(2);
const want = k => !only.length || only.includes("--" + k);
const env = { ...process.env, JAVA_HOME: path.join(TOOLS, "jdk"), ANDROID_HOME: path.join(TOOLS, "android-sdk"), PYTHONIOENCODING: "utf-8" };
const run = (cmd, cwd = ROOT) => { console.log("› " + cmd); execSync(cmd, { cwd, stdio: "inherit", env }); };
const step = t => console.log(`\n=== ${t} ===`);

const OUT_PC = path.join(ROOT, "Instalace", "PC"), OUT_AND = path.join(ROOT, "Instalace", "Android");

step("Ikony");
run(`"${UV}" run --no-project --python 3.13 --with pywebview --with pillow python scripts/render_icons.py`);
fs.cpSync(path.join(ROOT, "build/icons/android"), path.join(ROOT, "android/app/src/main/res"), { recursive: true });   // stejná ikona i v APK

step(`Web ${pkg.version}`);
run("node scripts/build-web.mjs");

if (want("ios")) {
  step("iOS (profil + instalační stránka)");
  if (!pkg.webUrl) {                       // adresa se odvodí z přihlášeného GitHub účtu
    const login = execSync(`"${path.join(TOOLS, "gh", "bin", "gh.exe")}" api user -q .login`, { encoding: "utf8" }).trim();
    pkg.webUrl = `https://${login.toLowerCase()}.github.io/biflovna/`;
    fs.writeFileSync(path.join(ROOT, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
  }
  run("node scripts/build-ios.mjs");
}

if (want("pc")) {
  step("PC aplikace (PyInstaller)");
  fs.rmSync(path.join(ROOT, "dist/desktop"), { recursive: true, force: true });
  run(`"${UV}" run --no-project --python 3.13 --with pywebview --with pyinstaller python -m PyInstaller --noconfirm --onedir --windowed ` +
    `--name Biflovna --icon "${path.join(ROOT, "build/icons/icon.ico")}" --add-data "${path.join(ROOT, "dist/www")};www" ` +
    `--workpath build/pyi --specpath build/pyi --distpath dist/desktop --exclude-module tkinter --exclude-module unittest --exclude-module pydoc desktop/app.py`);
  step("PC instalátor (Inno Setup)");
  fs.rmSync(OUT_PC, { recursive: true, force: true }); fs.mkdirSync(OUT_PC, { recursive: true });
  run(`"${path.join(TOOLS, "inno", "ISCC.exe")}" /Q /DAppVersion=${pkg.version} Biflovna.iss`, path.join(ROOT, "installer"));
}

if (want("android")) {
  step("Android APK (Capacitor)");
  fs.writeFileSync(path.join(ROOT, "android/local.properties"), `sdk.dir=${path.join(TOOLS, "android-sdk").replace(/\\/g, "/")}\n`);
  const g = path.join(ROOT, "android/app/build.gradle");
  fs.writeFileSync(g, fs.readFileSync(g, "utf8")
    .replace(/versionCode \d+/, `versionCode ${versionCode}`)
    .replace(/versionName "[^"]*"/, `versionName "${pkg.version}"`));
  fs.rmSync(OUT_AND, { recursive: true, force: true }); fs.mkdirSync(OUT_AND, { recursive: true });
  run("npx cap sync android");
  run(`"${path.join(ROOT, "android", "gradlew.bat")}" assembleRelease --no-daemon -q`, path.join(ROOT, "android"));
  fs.copyFileSync(path.join(ROOT, "android/app/build/outputs/apk/release/app-release.apk"), path.join(OUT_AND, "Biflovna.apk"));
}

if (!only.length || only.includes("--publish")) {          // zdrojáky do gitu (main) – bez klíče a výstupů (.gitignore)
  step("Git commit + push");
  execSync("git add -A", { cwd: ROOT, env });
  try { execSync(`git commit -q -m "Biflovna ${pkg.version}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`, { cwd: ROOT, env, stdio: "pipe" }); console.log("commit Biflovna " + pkg.version); }
  catch { console.log("beze změn – nic k commitu"); }
  const tok = execSync(`"${path.join(TOOLS, "gh", "bin", "gh.exe")}" auth token`, { encoding: "utf8" }).trim();
  const repoUrl = new URL(pkg.webUrl), repo = `${repoUrl.hostname.split(".")[0]}/${repoUrl.pathname.split("/").filter(Boolean)[0]}`;
  execSync(`git push -q "https://x-access-token:${tok}@github.com/${repo}.git" main`, { cwd: ROOT, env, stdio: "pipe" });
  console.log(`push → https://github.com/${repo}`);
}
if (!only.length || only.includes("--publish")) {          // plné vydání: instalátory na GitHub Releases, pak web (version.json)
  step("GitHub Release"); run("node scripts/publish-release.mjs");
}
if (want("ios")) { step("Nasazení webu (GitHub Pages)"); run("node scripts/deploy-web.mjs"); }

step("Hotovo");
for (const d of [OUT_PC, OUT_AND, path.join(ROOT, "Instalace", "iOS")]) if (fs.existsSync(d)) for (const f of fs.readdirSync(d))
  console.log(`  ${path.relative(ROOT, path.join(d, f))}  (${(fs.statSync(path.join(d, f)).size / 1048576).toFixed(1)} MB)`);
