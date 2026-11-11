/* Biflovna – studijní aplikace (testy + výpisky), vše offline. */
"use strict";

// ===================== REGISTR PŘEDMĚTŮ =====================
const SUBJECTS = [];
const Biflovna = {
  subject(s) {
    const bad = s.questions.filter(q => !Array.isArray(q) || q.length < 4 || !s.topics[q[0]] || !Array.isArray(q[3]) || q[3].length !== 3);
    if (bad.length) console.warn(`[Biflovna] ${s.id}: ${bad.length} vadných otázek`, bad);
    s.questions = s.questions.filter(q => !bad.includes(q));
    SUBJECTS.push(s);
  },
};

// ===================== POMOCNÉ =====================
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ic = n => `<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const qid = q => q[0] + "|" + q[1];
const KH_ANS = `<span class="kbd">A</span>–<span class="kbd">D</span> vyber odpověď`;
const KH_NEXT = `<span class="kbd">Enter</span> pokračovat · <span class="kbd">←</span> zpět`;

// ===================== ÚLOŽIŠTĚ =====================
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* plné / zakázané */ } },
};
function loadSubjectState(s) {
  const key = "biflovna.v1." + s.id;
  let d = store.get(key, null);
  if (!d && s.legacyStorage) {                       // migrace ze staré verze kvízu
    const old = store.get(s.legacyStorage, null);
    if (old) { d = { stats: old.stats || {}, off: old.off || [] }; store.set(key, d); }
  }
  d = d || { stats: {}, off: [] };
  return { key, stats: d.stats || {}, off: new Set(d.off || []) };
}
function saveSubjectState(st) { store.set(st.key, { stats: st.stats, off: [...st.off] }); }
function summary(s, st) {
  let seen = 0, tot = 0, ok = 0, wrong = 0;
  for (const q of s.questions) { const x = st.stats[qid(q)]; if (x) { seen++; tot += x.s; ok += x.c; if (x.w) wrong++; } }
  return { seen, acc: tot ? Math.round(ok / tot * 100) : null, wrong, total: s.questions.length };
}

// ===================== POČET OTÁZEK + POTVRZOVACÍ OKNO =====================
const ALL = 9999;                                    // „Vše“ – ořízne se na počet otázek ve výběru
let CNT = +store.get("biflovna.count", 20) || 20;
function setCount(n, fromInput) {
  CNT = Math.max(1, Math.min(ALL, Math.round(n) || 20)); store.set("biflovna.count", CNT);
  let preset = false;
  $$("#cnt button").forEach(b => { const on = +b.dataset.n === CNT; preset = preset || on; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
  const inp = $("#cntIn"); inp.classList.toggle("on", !preset);
  if (!fromInput) inp.value = preset ? "" : CNT;
}
function ask(title, text, okLabel, danger) {         // vlastní okno místo systémového confirm()
  const d = $("#dlg");
  if (!d || !d.showModal) return Promise.resolve(confirm(title + "\n" + text));
  $("#dlgT").textContent = title; $("#dlgP").textContent = text;
  $("#dlgOk").textContent = okLabel; $("#dlgOk").classList.toggle("danger", !!danger);
  return new Promise(res => { d.returnValue = ""; d.onclose = () => res(d.returnValue === "ok"); d.showModal(); });
}

// ===================== MOTIV =====================
let theme = store.get("biflovna.theme", null);
function applyTheme() {
  const t = theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = t;
  $$('meta[name="theme-color"]').forEach(m => m.content = t === "dark" ? "#020306" : "#F3F1EA");
  $("#bTheme").innerHTML = ic(t === "dark" ? "sun" : "moon");
}

// ===================== ROUTER =====================
// #/                    domů (seznam předmětů)
// #/s/<id>[/learn]      předmět – Test / Learning
// #/s/<id>/test         běžící test
// #/s/<id>/result       výsledek
let S = null, ST = null, T = null, learnFor = null;

function show(id) {
  for (const v of ["home", "subject", "quiz", "result", "updates"]) $("#" + v).classList.toggle("hide", v !== id);
  $("#dock").classList.toggle("hide", id !== "subject");
}
function go(hash, replace) {
  if (replace) location.replace(hash); else location.hash = hash;
}
function route() {
  if (location.hash === "#/updates") { S = null; renderUpdates(); show("updates"); window.scrollTo(0, 0); return; }
  const [, , id, sub] = location.hash.split("/");
  if (!id) { S = null; renderHome(); show("home"); window.scrollTo(0, 0); return; }
  const s = SUBJECTS.find(x => x.id === id);
  if (!s) return go("#/", true);
  if (S !== s) { S = s; ST = loadSubjectState(s); T = null; }
  document.documentElement.style.setProperty("--subject", s.color);
  if ((sub === "test" || sub === "result") && !T) return go(`#/s/${id}`, true);
  if (sub === "test") { show("quiz"); renderQ(); }
  else if (sub === "result") { show("result"); renderResult(); }
  else { renderSubject(sub === "learn" ? "learn" : "test"); show("subject"); }
  window.scrollTo(0, 0);
}

// ===================== CO JE NOVÉHO =====================
// Při každém vydání přidej nahoru záznam: krátce, lidsky, jen to, co pozná uživatel. Bez záznamu build spadne.
const CHANGELOG = [
  { v: "1.3.4", added: ["Novou verzi appka ohlásí sama i za běhu, není potřeba ji kvůli tomu restartovat"], fixed: [] },
  { v: "1.3.3", added: ["Chytřejší výběr otázek: do nových testů se častěji vrací ty, které opakovaně kazíš"], fixed: ["PC: šedý posuvník okna nahradil tenký průsvitný, který ladí se vzhledem aplikace"] },
  { v: "1.3.2", added: ["Verze pro Linux (Mint, Ubuntu): instalační balíček .deb"], fixed: [] },
  { v: "1.3.1", added: ["Vlastní počet otázek v testu (nebo rovnou všechny)", "Tlačítko Vybrat vše / Zrušit výběr u témat testu"], fixed: ["iPhone: pruh s hodinami nahoře už ladí s tmavým režimem", "Hezčí výběr počtu otázek místo rozbalovacího seznamu", "Potvrzovací okna (ukončení testu, smazání statistik) ladí se vzhledem aplikace"] },
  { v: "1.3.0", added: ["Nový skleněný vzhled s plynulými animacemi a čitelnějším písmem", "Tlačítko Zpět v testu: můžeš se vracet k předchozím otázkám", "Témata jsou v každém testu zastoupená rovnoměrně", "Víc otázek na kategorie kabelů (Cat.5 až Cat.8)", "Rozdělaný test jde znovu otevřít tlačítkem Pokračovat v testu"], fixed: ["Pryč jsou výpočty podsítí a otázky na konkrétní IP adresy", "PC: nabídka nové verze se už neztratí při pomalejším startu", "Výběr témat pro PDF už nemění témata testu"] },
  { v: "1.2.10", added: ["Nové otázky na látku, která chyběla (firewally, NAT, kabely, optika, WiFi)"], fixed: ["Chybné a duplicitní otázky"] },
  { v: "1.2.9", added: ["Export výpisků do PDF: v Learningu si vybereš témata a uložíš je"], fixed: [] },
  { v: "1.2.8", added: ["Přehlednější Learning: nadpisy, srovnávací rámečky, barevné klíčové pojmy"], fixed: ["Výpisky jsou srozumitelnější, hesla jsou celé krátké věty"] },
  { v: "1.2.7", added: [], fixed: ["Lepší ovládání a čitelnost na telefonu, v tmavém režimu sedí horní lišta", "Hlavička i domovská stránka se vejdou i na malé telefony", "Výběr počtu otázek už na iPhonu nepřibližuje stránku"] },
  { v: "1.2.6", added: ["Praktické otázky: výpočty podsítí, hledání poruch a volba kabelu nebo firewallu"], fixed: ["Vyřazené otázky typu barva vodiče nebo rok a odpovědi, které šly poznat bez učení"] },
  { v: "1.2.5", added: [], fixed: ["Přehlednější tabulky v Learningu, OSI se vejde na displej telefonu"] },
  { v: "1.2.4", added: [], fixed: ["Co je nového: záznamy se už nepřekrývají"] },
  { v: "1.2.3", added: ["Sekce Co je nového"], fixed: ["PC: aktualizace se po restartu už neopakuje dokola", "iPhone: aplikace správně pozná novou verzi a funguje i bez internetu"] },
  { v: "1.2.2", added: [], fixed: ["Learning na mobilu: tabulky se vejdou do karty a lišta témat nepřekrývá text"] },
  { v: "1.2.1", added: ["Ukazatel v hlavičce: online/offline a jestli máš nejnovější verzi"], fixed: [] },
  { v: "1.2.0", added: ["Aktualizace přímo v aplikaci na PC a Androidu", "Nová ikona"], fixed: [] },
  { v: "1.1.0", added: ["Verze pro iPhone", "Otázky a výpisky se stahují samy"], fixed: [] },
];
function renderUpdates() {
  document.title = "Co je nového – Biflovna";
  const list = (label, cls, items) => items.length ? `<p class="upd-label ${cls}">${label}</p><ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
  $("#updates").innerHTML = `<a class="back" href="#/">${ic("back")}Všechny předměty</a>
    <p class="eyebrow">Tvoje verze ${esc(APP_VERSION)}</p>
    <h1 class="subject-title">Co je nového</h1>
    ${CHANGELOG.map(c => `<article class="lc rel"><h2>Verze ${esc(c.v)}</h2>${list("Nové", "new", c.added)}${list("Opraveno", "fix", c.fixed)}</article>`).join("")}`;
}

// ===================== DOMŮ =====================
function renderHome() {
  document.title = "Biflovna – studijní testy a výpisky";
  $("#updLink").innerHTML = `<span class="subj-ic">${ic("news")}</span><span><b>Co je nového</b><small>Verze ${esc(APP_VERSION)} · přidané a opravené věci</small></span>${ic("arrow")}`;
  $("#subjects").innerHTML = SUBJECTS.map(s => {
    const sum = summary(s, loadSubjectState(s));
    const pct = Math.round(sum.seen / sum.total * 100);
    return `<a class="subj" href="#/s/${s.id}" style="--c:${s.color}">
      <div class="subj-top"><span class="subj-ic">${ic(s.icon || "book")}</span><span class="subj-code">${esc(s.short || "")}</span></div>
      <h2>${esc(s.name)}</h2>
      <p class="subj-meta">${esc(s.teacher || "")}${s.note ? " · " + esc(s.note) : ""}</p>
      <div class="subj-stats"><span><b>${sum.total}</b> otázek</span><span><b>${pct} %</b> prošlo</span><span><b>${sum.acc === null ? "–" : sum.acc + " %"}</b> úspěšnost</span></div>
      <div class="subj-bar"><div style="width:${pct}%"></div></div>
      <span class="subj-go">Otevřít ${ic("arrow")}</span>
    </a>`;
  }).join("");
}

// ===================== PŘEDMĚT =====================
function renderSubject(tab) {
  document.title = S.name + " – Biflovna";
  $("#sEyebrow").textContent = S.note || "";
  $("#sName").textContent = S.name;
  $("#sTeacher").textContent = S.teacher || "";
  $$("#dock button").forEach(b => { const on = b.dataset.t === tab; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
  $("#dock").style.setProperty("--at", tab === "learn" ? 2 : 1);
  $("#testPane").classList.toggle("hide", tab !== "test");
  $("#learnPane").classList.toggle("hide", tab !== "learn");
  if (tab === "learn" && learnFor !== S) {            // výpisky se vykreslí až při prvním otevření
    learnFor = S;
    $("#pdfPanel").classList.add("hide"); $("#bPdf").setAttribute("aria-expanded", false);
    $("#toc").innerHTML = Object.entries(S.topics).map(([k, t]) => `<a href="#L-${k}" class="tag" style="--c:${t.c}">${esc(t.n)}</a>`).join("");
    $("#learnBody").innerHTML = S.learn || `<p class="hint">K tomuto předmětu zatím nejsou výpisky.</p>`;
    $$("#learnBody .lc").forEach(el => { const t = S.topics[el.id.slice(2)]; if (t) el.style.setProperty("--c", t.c); });
    $$("#learnBody table.lt").forEach(t => { const w = document.createElement("div"); w.className = "lt-wrap"; t.replaceWith(w); w.append(t); });
  }
  if (tab === "test") renderStartPane();
}
function renderStartPane() {
  const counts = {}; S.questions.forEach(q => counts[q[0]] = (counts[q[0]] || 0) + 1);
  $("#chips").innerHTML = Object.entries(S.topics).map(([k, t]) =>
    `<button class="chip ${ST.off.has(k) ? "off" : ""}" data-k="${k}" style="--c:${t.c}" aria-pressed="${!ST.off.has(k)}"><i></i>${esc(t.n)}<small>${counts[k] || 0}</small></button>`).join("");
  const pool = S.questions.filter(q => !ST.off.has(q[0]));
  const sum = summary(S, ST);
  $("#sTotal").textContent = pool.length + (pool.length !== S.questions.length ? ` / ${S.questions.length}` : "");
  $("#sSeen").textContent = `${sum.seen} / ${sum.total}`;
  $("#sAcc").textContent = sum.acc === null ? "–" : sum.acc + " %";
  $("#nWrong").textContent = sum.wrong;
  $("#bWrong").disabled = sum.wrong === 0;
  $("#bStart").disabled = pool.length === 0;
  $("#bAllTopics").textContent = ST.off.size ? "Vybrat vše" : "Zrušit výběr";
  setCount(CNT);
  const left = T ? T.items.filter(x => x.chosen === null).length : 0;
  $("#bResume").classList.toggle("hide", !left);
  if (left) $("#nResume").textContent = `${T.items.length - left} / ${T.items.length}`;
}

// ===================== TEST =====================
function pick(n, onlyWrong) {
  let pool = S.questions.filter(q => !ST.off.has(q[0]));
  if (onlyWrong) pool = S.questions.filter(q => ST.stats[qid(q)]?.w);
  // váha: čím častěji otázku kazíš, tím spíš přijde znovu (podíl chyb + bonus za poslední pokus špatně);
  // neviděná má váhu 1, opakovaně zvládnutá klesá k 0,15, takže se vrací jen občas
  const scored = pool.map(q => {
    const s = ST.stats[qid(q)];
    const w = !s || !s.s ? 1 : 0.15 + 0.5 / (1 + s.s) + 2.6 * (s.s - (s.c || 0)) / (s.s + 1) + (s.w ? 0.8 : 0);
    return { q, k: Math.pow(Math.random(), 1 / w) };
  });
  scored.sort((a, b) => b.k - a.k);
  // témata se střídají dokola, takže jsou v testu zastoupená rovnoměrně
  const by = {}; scored.forEach(x => (by[x.q[0]] = by[x.q[0]] || []).push(x.q));
  const out = []; let groups = shuffle(Object.values(by));
  while (out.length < n && groups.length) { for (const g of groups) { if (out.length < n) out.push(g.shift()); } groups = groups.filter(g => g.length); }
  return shuffle(out);
}
function startTest(list) {
  if (!list.length) return;
  T = { items: list.map(q => { const opts = shuffle([q[2], ...q[3]]); return { q, opts, ci: opts.indexOf(q[2]), chosen: null }; }), i: 0, score: 0 };
  go(`#/s/${S.id}/test`);
}
function renderQ(dir) {
  const it = T.items[T.i], q = it.q, t = S.topics[q[0]], n = T.items.length;
  $("#qTag").textContent = t.n; $("#qTag").style.setProperty("--c", t.c);
  $("#qNum").textContent = `Otázka ${T.i + 1} z ${n}`;
  $("#qScore").textContent = T.score;
  $("#qProg").style.transform = `scaleX(${T.items.filter(x => x.chosen !== null).length / n})`;
  $("#dots").innerHTML = T.items.map((x, j) => `<span class="dot ${x.chosen === null ? "" : x.chosen === x.ci ? "ok" : "bad"}${j === T.i ? " cur" : ""}"></span>`).join("");
  $("#qText").textContent = q[1];
  $("#opts").innerHTML = it.opts.map((o, j) => `<button class="opt" data-j="${j}"><span class="L">${"ABCD"[j]}</span><span class="txt">${esc(o)}</span><span class="mk"></span></button>`).join("");
  $("#bPrev").disabled = T.i === 0;
  $("#bNext").innerHTML = (T.i === n - 1 ? "Vyhodnotit" : "Další") + ic("arrow");
  if (it.chosen === null) { $("#fb").className = "fb"; $("#fb").innerHTML = ""; $("#bNext").disabled = true; $("#kHint").innerHTML = KH_ANS; }
  else paintAnswer(it);
  const body = $("#qBody"); body.classList.remove("in-r", "in-l");
  if (dir) { void body.offsetWidth; body.classList.add(dir > 0 ? "in-r" : "in-l"); }   // jen po klepnutí, z klávesnice bez animace
}
function paintAnswer(it) {                           // zobrazí vyhodnocenou otázku (hned po odpovědi i při návratu zpět)
  const ok = it.chosen === it.ci;
  $$("#opts .opt").forEach((b, k) => {
    b.disabled = true;
    if (k === it.ci) { b.classList.add("ok"); b.querySelector(".mk").innerHTML = ic("check"); }
    else if (k === it.chosen) { b.classList.add("bad"); b.querySelector(".mk").innerHTML = ic("x"); }
    else b.classList.add("dim");
  });
  const fb = $("#fb");
  fb.className = "fb " + (ok ? "ok" : "bad");
  fb.innerHTML = (ok ? `<h3>${ic("check")}Správně</h3>`
    : `<h3>${ic("x")}Špatně</h3><p class="ans">Správná odpověď: <b>${"ABCD"[it.ci]}) ${esc(it.q[2])}</b></p>`)
    + (it.q[4] ? `<div class="ex">${ic("bulb")}<span>${esc(it.q[4])}</span></div>` : "");
  $("#bNext").disabled = false;
  $("#kHint").innerHTML = KH_NEXT;
}
function answer(j, anim) {
  const it = T.items[T.i]; if (it.chosen !== null || j >= it.opts.length) return;
  it.chosen = j; const ok = j === it.ci; if (ok) T.score++;
  const id = qid(it.q); const s = ST.stats[id] || { s: 0, c: 0, w: 0 };
  s.s++; if (ok) { s.c++; s.w = 0; } else s.w = 1; ST.stats[id] = s; saveSubjectState(ST);
  paintAnswer(it);
  if (anim) { $("#opts").classList.add("just"); setTimeout(() => $("#opts")?.classList.remove("just"), 600); }
  $("#qScore").textContent = T.score;
  $("#qProg").style.transform = `scaleX(${T.items.filter(x => x.chosen !== null).length / T.items.length})`;
  $("#dots").children[T.i].className = "dot cur " + (ok ? "ok" : "bad");
  $("#bNext").focus({ preventScroll: true });
  $("#fb").scrollIntoView({ block: "nearest" });
}
function step(d, anim) {                             // d = 1 další, -1 zpět na předchozí otázku
  if (!T) return;
  if (d < 0) { if (T.i === 0) return; T.i--; }
  else {
    if (T.items[T.i].chosen === null) return;
    if (T.i === T.items.length - 1) return go(`#/s/${S.id}/result`, true);
    T.i++;
  }
  renderQ(anim ? d : 0); window.scrollTo(0, 0);
}

// ===================== VÝSLEDEK =====================
function renderResult() {
  const n = T.items.length, s = T.score, p = Math.round(s / n * 100);
  const col = p >= 90 ? "var(--ok)" : p >= 75 ? "#65A30D" : p >= 60 ? "#D97706" : p >= 50 ? "#EA580C" : "var(--bad)";
  const C = 427.26, val = $("#ringVal");
  val.style.setProperty("--c", col); val.style.transition = "none"; val.setAttribute("stroke-dashoffset", C);
  requestAnimationFrame(() => requestAnimationFrame(() => { val.style.transition = ""; val.setAttribute("stroke-dashoffset", C * (1 - p / 100)); }));
  $("#rPct").textContent = p + " %"; $("#rPct").style.color = col;
  $("#rFrac").textContent = `${s} z ${n}`;
  const [g, m] = p >= 90 ? ["Výborně", "Tohle máš v malíčku, zápočet je tvůj."] :
    p >= 75 ? ["Chvalitebně", "Hodně dobré – projdi si chyby a bude to za jedna."] :
    p >= 60 ? ["Dobře", "Základ máš, mrkni na témata s nejnižším skóre."] :
    p >= 50 ? ["Těsně", "Ještě to chce zopakovat – zkus „Zopakovat chyby“."] :
              ["Zatím nic moc", "Projdi si Learning a pusť si test znovu."];
  $("#rGrade").textContent = g; $("#rGrade").style.color = col; $("#rMsg").textContent = m;
  $("#rSub").textContent = `${S.name} · správně ${s} z ${n} otázek.`;
  const by = {}; T.items.forEach(it => { const k = it.q[0]; by[k] = by[k] || { o: 0, n: 0 }; by[k].n++; if (it.chosen === it.ci) by[k].o++; });
  $("#tbars").innerHTML = `<p class="label" style="margin:0 0 4px">Podle témat</p>` + Object.entries(by).sort((a, b) => a[1].o / a[1].n - b[1].o / b[1].n).map(([k, v]) => {
    const t = S.topics[k], pp = Math.round(v.o / v.n * 100);
    return `<div class="tbar"><span class="tag" style="--c:${t.c};justify-self:start">${esc(t.n)}</span><div class="b"><div style="width:${pp}%;background:${t.c}"></div></div><span class="n">${v.o}/${v.n}</span></div>`;
  }).join("");
  $("#bRetry").disabled = s === n;
  renderReview("all");
}
function renderReview(f) {
  $$("#result .filter button").forEach(b => { b.classList.toggle("on", b.dataset.f === f); b.setAttribute("aria-pressed", b.dataset.f === f); });
  $("#rev").innerHTML = T.items.map((it, j) => {
    const ok = it.chosen === it.ci; if (f === "ok" && !ok || f === "bad" && ok) return "";
    const t = S.topics[it.q[0]];
    return `<div class="ri ${ok ? "ok" : "bad"}">
      <div class="top"><span class="tag" style="--c:${t.c}">${esc(t.n)}</span><span class="st">${ic(ok ? "check" : "x")}#${j + 1}</span></div>
      <div class="qq">${esc(it.q[1])}</div>
      ${ok ? "" : `<div class="a bad">${ic("x")}<span>${esc(it.opts[it.chosen])}</span></div>`}
      <div class="a ok">${ic("check")}<span>${esc(it.q[2])}</span></div>
      ${it.q[4] ? `<div class="ex">${ic("bulb")}<span>${esc(it.q[4])}</span></div>` : ""}
    </div>`;
  }).join("") || `<p class="hint">Nic k zobrazení.</p>`;
}

// ===================== UDÁLOSTI (delegace) =====================
document.addEventListener("click", e => {
  const el = e.target.closest("button,a"); if (!el) return;
  if (el.matches("#cnt button")) setCount(+el.dataset.n);
  else if (el.matches(".chip[data-k]")) { const k = el.dataset.k; ST.off.has(k) ? ST.off.delete(k) : ST.off.add(k); saveSubjectState(ST); renderStartPane(); }
  else if (el.matches(".opt")) answer(+el.dataset.j, true);
  else if (el.matches("#dock button")) go(`#/s/${S.id}${el.dataset.t === "learn" ? "/learn" : ""}`, true);
  else if (el.matches("#result .filter button")) renderReview(el.dataset.f);
  else if (el.matches('#toc a')) { e.preventDefault(); document.getElementById(el.getAttribute("href").slice(1))?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
  else switch (el.id) {
    case "bTheme": theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; store.set("biflovna.theme", theme); applyTheme(); break;
    case "bStart": case "bAgain": startTest(pick(CNT)); break;
    case "bWrong": startTest(pick(CNT, true)); break;
    case "bAllTopics": if (ST.off.size) ST.off.clear(); else Object.keys(S.topics).forEach(k => ST.off.add(k)); saveSubjectState(ST); renderStartPane(); break;
    case "dlgOk": $("#dlg").close("ok"); break;
    case "dlgNo": $("#dlg").close(""); break;
    case "bRetry": startTest(shuffle(T.items.filter(it => it.chosen !== it.ci).map(it => it.q))); break;
    case "bReset": ask("Vymazat statistiky?", `Smaže se historie odpovědí předmětu „${S.name}“. Nejde to vrátit.`, "Vymazat", true).then(y => { if (y) { ST.stats = {}; saveSubjectState(ST); renderStartPane(); } }); break;
    case "bNext": step(1, true); break;
    case "bPrev": step(-1, true); break;
    case "bResume": go(`#/s/${S.id}/test`); break;
    case "bQuit": ask("Ukončit test?", "Odpovědi, které už máš, zůstanou ve statistikách.", "Ukončit test").then(y => { if (y) { T = null; go(`#/s/${S.id}`, true); } }); break;
    case "bHome": go(`#/s/${S.id}`, true); break;
  }
});
document.addEventListener("keydown", e => {
  if ($("#quiz").classList.contains("hide") || $("#dlg").open || e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key.toUpperCase(), map = { A: 0, B: 1, C: 2, D: 3, "1": 0, "2": 1, "3": 2, "4": 3 };
  if (k in map) { answer(map[k]); e.preventDefault(); }
  else if (e.key === "Enter" || e.key === "ArrowRight") { step(1); e.preventDefault(); }
  else if (e.key === "ArrowLeft" || e.key === "Backspace") { step(-1); e.preventDefault(); }
});
document.addEventListener("input", e => { if (e.target.id === "cntIn") { const v = parseInt(e.target.value, 10); if (v >= 1) setCount(v, true); } });
document.addEventListener("click", e => { if (e.target.id === "dlg") e.target.close(""); });      // klepnutí mimo okno = zrušit
window.addEventListener("hashchange", () => { if ($("#dlg").open) $("#dlg").close(""); route(); });
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => theme || applyTheme());

// ===================== AKTUALIZACE (GitHub Pages + Releases) =====================
// Obsah (otázky, výpisky) se stáhne sám a uloží pro offline. Nová verze aplikace → lišta s tlačítkem.
const IS_PC = () => !!(window.pywebview && window.pywebview.api);
const IS_ANDROID = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const IS_LINUX = () => !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.biflovna);   // okno z balíčku .deb (linux/biflovna.py)
const IS_HOSTED = () => /github\.io$/.test(location.hostname);     // webová verze se aktualizuje přes service worker
const newer = (a, b) => { const x = a.split(".").map(Number), y = b.split(".").map(Number); for (let i = 0; i < 3; i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0); return false; };

function useContent(list) {                      // nahradí vestavěné předměty staženými
  const keep = SUBJECTS.splice(0);
  try { list.forEach(s => Biflovna.subject(s)); if (!SUBJECTS.length) throw 0; }
  catch (e) { SUBJECTS.splice(0, SUBJECTS.length, ...keep); return false; }
  SUBJECTS.sort((a, b) => a.name.localeCompare(b.name, "cs"));
  learnFor = null;
  return true;
}
function loadCachedContent() {
  const c = store.get("biflovna.content", null);
  if (c && c.date > CONTENT.date && c.minApp && !newer(c.minApp, APP_VERSION)) useContent(c.subjects);
}
function toast(msg) {
  const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.classList.add("out"), 3200); setTimeout(() => t.remove(), 3700);
}
function updateBar(title, text, btn, onGo) {
  $("#upd")?.remove();
  const bar = document.createElement("div"); bar.id = "upd"; bar.className = "upd";
  bar.innerHTML = `<div><b>${esc(title)}</b><span>${esc(text)}</span></div>
    <div class="row"><button class="btn ghost sm" id="updLater">Později</button><button class="btn primary sm" id="updGo">${esc(btn)}</button></div>`;
  document.body.appendChild(bar);
  $("#updLater").onclick = () => bar.remove();
  $("#updGo").onclick = onGo;
}
async function offerUpdate(v) {
  if (IS_PC()) {
    // PC: stáhne se samo na pozadí; nainstaluje se po zavření aplikace, nebo hned tlačítkem
    const r = await window.pywebview.api.prepare(v.pc).catch(e => ({ ok: false, error: String(e) }));
    if (!r || !r.ok) return;                       // zkusí se zase při příštím spuštění
    updateBar(`Biflovna ${v.version} je připravená`, "Nainstaluje se sama po zavření aplikace.", "Restartovat teď", async () => {
      $("#updGo").disabled = true; $("#updGo").textContent = "Instaluji…";
      await window.pywebview.api.apply();
    });
  } else if (IS_ANDROID()) {
    const U = window.Capacitor.Plugins && window.Capacitor.Plugins.Updater;
    updateBar(`Nová verze Biflovny ${v.version}`, "Stáhne se v aplikaci a pak jen potvrdíš instalaci.", "Aktualizovat", async () => {
      const b = $("#updGo"); b.disabled = true; b.textContent = "Stahuji…";
      if (!U) { location.href = v.android; return; }   // starší APK bez modulu → stažení v prohlížeči
      const h = await U.addListener("progress", p => { b.textContent = `Stahuji ${p.percent} %`; });
      try { await U.install({ url: v.android }); b.textContent = "Instalace…"; }
      catch (e) { b.disabled = false; b.textContent = "Zkusit znovu"; toast("Stažení se nepovedlo – zkontroluj internet."); }
      finally { h && h.remove && h.remove(); }
    });
  } else if (IS_LINUX() && v.linux) {
    updateBar(`Nová verze Biflovny ${v.version}`, "Stáhne se balíček .deb. Otevři ho a potvrď instalaci.", "Stáhnout", () => { location.href = v.linux; $("#upd")?.remove(); });
  } else if (IS_HOSTED()) {
    updateBar(`Nová verze Biflovny ${v.version}`, "Stačí klepnout, nic se neinstaluje.", "Aktualizovat", async () => {
      try { const r = await navigator.serviceWorker.getRegistration(); if (r) await r.update(); } catch (e) { /* načte se i bez toho */ }
      location.reload();
    });
  }
}
// ---- ukazatel v hlavičce: online/offline + jestli je to poslední verze (1× za spuštění dotaz na GitHub) ----
const NET = { s: "check", v: null, at: null };
function setNet(s, text) {
  NET.s = s; const el = $("#net"); if (!el) return;
  el.dataset.s = s; el.querySelector("span").textContent = text;
  el.title = s === "update" ? "Klepni pro aktualizaci" : s === "ok" ? "Máš nejnovější verzi" : s === "off" ? "Bez internetu – vše funguje z uloženého obsahu" : "Kontroluji GitHub…";
}
function netInfo() {
  if (NET.s === "update" && NET.v) return offerUpdate(NET.v);
  const c = store.get("biflovna.content", null), d = new Date(c && c.date > CONTENT.date ? c.date : CONTENT.date);
  const when = NET.at ? `, zkontrolováno ${NET.at.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}` : "";
  toast(`Verze ${APP_VERSION} · obsah z ${d.toLocaleDateString("cs-CZ")}${NET.s === "off" ? " · offline" : when}`);
}
// Kontrola běží při startu a pak potichu dál (každých 15 min a při návratu do okna), takže o nové verzi
// se appka dozví i bez restartu. Stejnou verzi nabídne jen jednou („Později“ platí).
const RECHECK_MS = 15 * 60 * 1000, REFOCUS_MS = 5 * 60 * 1000;
let updChecked = false, updBusy = false, updOffered = null;
async function checkUpdates(again) {
  if (updBusy || (updChecked && !again)) return;
  if (!UPDATE_URL || !navigator.onLine) { if (NET.s !== "update") setNet("off", `Offline · ${APP_VERSION}`); return; }
  updBusy = true;
  if (!updChecked) setNet("check", "Kontroluji…");     // další kontroly ukazatel nepřeblikávají
  updChecked = true;
  try {
    const ctl = new AbortController(); setTimeout(() => ctl.abort(), 8000);
    const v = await (await fetch(UPDATE_URL + "version.json?t=" + Date.now(), { cache: "no-store", signal: ctl.signal })).json();
    NET.at = new Date();
    const cur = store.get("biflovna.content", null), have = cur && cur.date > CONTENT.date ? cur : CONTENT;
    const inTest = /\/test$/.test(location.hash);      // rozdělaný test nový obsah nepřepíše, načte se při další kontrole
    if (!inTest && !IS_HOSTED() && v.contentHash !== have.hash && v.contentDate > have.date && !newer(v.minApp || "0.0.0", APP_VERSION)) {
      const list = await (await fetch(UPDATE_URL + "subjects.json?h=" + v.contentHash, { cache: "no-store" })).json();
      if (Array.isArray(list) && list.length) {
        store.set("biflovna.content", { hash: v.contentHash, date: v.contentDate, minApp: v.minApp || "0.0.0", subjects: list });
        if (useContent(JSON.parse(JSON.stringify(list)))) { route(); toast("Otázky a výpisky byly aktualizovány"); }
      }
    }
    if (newer(v.version, APP_VERSION)) {
      NET.v = v; setNet("update", `Nová verze ${v.version}`);
      if (updOffered !== v.version) { updOffered = v.version; offerUpdate(v); }
    } else setNet("ok", `Aktuální · ${APP_VERSION}`);
  } catch (e) {
    if (!again) updChecked = false;                    // nepovedlo se → zkusí se znovu, až bude síť
    if (NET.s !== "update") setNet("off", `Offline · ${APP_VERSION}`);
  } finally { updBusy = false; }
}
setInterval(() => { if (!document.hidden) checkUpdates(true); }, RECHECK_MS);
const recheckOnReturn = () => { if (updChecked && !document.hidden && (!NET.at || Date.now() - NET.at > REFOCUS_MS)) checkUpdates(true); };
document.addEventListener("visibilitychange", recheckOnReturn);
window.addEventListener("focus", recheckOnReturn);
window.addEventListener("online", () => checkUpdates(true));
window.addEventListener("offline", () => { if (NET.s !== "update") setNet("off", `Offline · ${APP_VERSION}`); });
document.addEventListener("click", e => { if (e.target.closest("#net")) netInfo(); });

// ===================== START =====================
document.addEventListener("DOMContentLoaded", () => {
  SUBJECTS.sort((a, b) => a.name.localeCompare(b.name, "cs"));
  loadCachedContent();
  if (navigator.standalone) document.documentElement.classList.add("ios-app");   // iPhone z plochy: stavový řádek má vždy bílé písmo
  applyTheme();
  route();
  if ("serviceWorker" in navigator && IS_HOSTED()) navigator.serviceWorker.register("sw.js").catch(() => {});
  // pywebview API je dostupné až po události pywebviewready
  if (window.pywebview) setTimeout(checkUpdates, 800);
  else {
    window.addEventListener("pywebviewready", () => { if (NET.v) offerUpdate(NET.v); else checkUpdates(); }, { once: true });
    setTimeout(checkUpdates, 1500);
  }
});
