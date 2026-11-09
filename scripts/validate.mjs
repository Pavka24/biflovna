// Kontrola předmětů v src/subjects/*.js – spusť po každé úpravě otázek:  node scripts/validate.mjs
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(ROOT, "src", "subjects");
const MAX_Q = 200;
let errors = 0, warns = 0;
const err = (s, m) => { errors++; console.log(`  ✗ [${s}] ${m}`); };
const warn = (s, m) => { warns++; console.log(`  ! [${s}] ${m}`); };
const ids = new Set();

for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".js") && !f.startsWith("_")).sort()) {
  let subj = null;
  try { vm.runInNewContext(fs.readFileSync(path.join(dir, f), "utf8"), { Biflovna: { subject: s => { subj = s; } } }); }
  catch (e) { err(f, "syntaktická chyba: " + e.message); continue; }
  if (!subj) { err(f, "soubor nevolá Biflovna.subject({...})"); continue; }
  const S = subj.id || f;
  console.log(`• ${f}: ${subj.name} – ${subj.questions?.length ?? 0} otázek, ${Object.keys(subj.topics || {}).length} témat`);
  for (const k of ["id", "name", "short", "color", "topics", "questions"]) if (!subj[k]) err(S, `chybí pole "${k}"`);
  if (ids.has(subj.id)) err(S, "duplicitní id předmětu"); ids.add(subj.id);
  if (!/^[a-z0-9-]+$/.test(subj.id || "")) err(S, "id smí obsahovat jen a-z, 0-9 a pomlčky");
  const Q = subj.questions || [], T = subj.topics || {};
  if (Q.length > MAX_Q) err(S, `víc než ${MAX_Q} otázek (${Q.length})`);
  const seen = new Set(), perTopic = {};
  Q.forEach((q, i) => {
    const at = `#${i + 1} „${String(q[1]).slice(0, 50)}“`;
    if (!Array.isArray(q) || q.length < 4) return err(S, `${at}: špatný tvar`);
    const [t, text, ok, wrong, ex] = q;
    if (!T[t]) err(S, `${at}: neznámé téma "${t}"`);
    perTopic[t] = (perTopic[t] || 0) + 1;
    if (!Array.isArray(wrong) || wrong.length !== 3) err(S, `${at}: musí mít přesně 3 špatné odpovědi`);
    else {
      if (wrong.includes(ok)) err(S, `${at}: špatná odpověď je shodná se správnou`);
      if (new Set(wrong).size !== 3) err(S, `${at}: duplicitní špatné odpovědi`);
      const L = ok.length, mx = Math.max(...wrong.map(w => w.length));
      if (L > 2.2 * mx && L > 40) warn(S, `${at}: správná odpověď je výrazně delší než ostatní (prozrazuje se)`);
    }
    const key = t + "|" + text;
    if (seen.has(key)) err(S, `${at}: duplicitní text otázky v tématu`); seen.add(key);
    if (ex != null && typeof ex !== "string") err(S, `${at}: vysvětlení musí být text nebo null`);
  });
  for (const k of Object.keys(T)) if (!perTopic[k]) warn(S, `téma "${k}" nemá žádnou otázku`);
  if (subj.learn) {
    const cards = [...subj.learn.matchAll(/id="L-([a-z0-9]+)"/g)].map(m => m[1]);
    for (const c of cards) if (!T[c]) err(S, `learning karta L-${c} nemá odpovídající téma`);
    for (const k of Object.keys(T)) if (!cards.includes(k)) warn(S, `téma "${k}" nemá learning kartu (id="L-${k}")`);
  } else warn(S, "chybí learning");
}
console.log(errors ? `\n${errors} chyb, ${warns} varování` : `\nOK – ${warns} varování`);
process.exit(errors ? 1 : 0);
