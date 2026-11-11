// ===================== EXPORT VÝPISKŮ DO PDF =====================
// Skládá PDF přímo z HTML výpisků (skutečný text, funguje offline). Tisk přes prohlížeč nejde použít:
// v aplikaci z plochy na iPhonu a v Android WebView nefunguje.
function makeLearnPdf(subject, keys) {
  const doc = new jspdf.jsPDF({ unit: "mm", format: "a4", compress: true });
  doc.addFileToVFS("Inter-R.ttf", PDF_FONTS.r); doc.addFont("Inter-R.ttf", "Inter", "normal");
  doc.addFileToVFS("Inter-B.ttf", PDF_FONTS.b); doc.addFont("Inter-B.ttf", "Inter", "bold");
  const W = 210, H = 297, M = 16, CW = W - 2 * M, BOTTOM = H - M - 4, PT = 0.3528;
  const INK = "#1C1917", MUTED = "#6B645C", LINE = "#E7E4DC", OK = "#047857", BAD = "#B91C1C", CODE = "#1D4ED8";
  const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, p) => { const x = rgb(a), y = rgb(b); return "#" + x.map((v, i) => Math.round(v * (1 - p) + y[i] * p).toString(16).padStart(2, "0")).join(""); };
  let y = M, accent = CODE, tint = "#EFF4FF", dot = CODE;

  const lh = size => size * PT * 1.42;
  const font = (r, size) => { doc.setFont("Inter", r.b ? "bold" : "normal"); doc.setFontSize(size); };
  const width = (t, r, size) => { font(r, size); return doc.getTextWidth(t); };
  const fill = c => doc.setFillColor(...rgb(c));
  const stroke = c => doc.setDrawColor(...rgb(c));
  const newPage = () => { doc.addPage(); y = M; };
  const need = h => { if (y + h > BOTTOM) { newPage(); return true; } return false; };

  // inline obsah → úseky textu se stylem
  function runs(node, st = { b: false, c: null }, out = []) {
    for (const n of node.childNodes) {
      if (n.nodeType === 3) { const t = n.nodeValue.replace(/[ \t\r\n]+/g, " "); if (t) out.push({ t, b: st.b, c: st.c }); }
      else if (n.nodeType === 1) {
        const tag = n.tagName;
        if (tag === "B" || tag === "STRONG") runs(n, { b: true, c: st.c === "plain" ? null : (st.bc || accent), bc: st.bc }, out);
        else if (tag === "CODE") runs(n, { b: st.b, c: CODE }, out);
        else if (tag === "SMALL") { out.push({ br: true }); out.push({ t: n.textContent, b: false, c: MUTED, small: true }); }
        else runs(n, st, out);
      }
    }
    return out;
  }

  // zalomení do řádků; mezery se dělí jen běžné (pevná mezera drží pohromadě)
  function wrap(rs, w, size) {
    const lines = [[]]; let x = 0;
    const brk = () => { lines.push([]); x = 0; };
    const put = (t, r) => { lines[lines.length - 1].push({ t, b: r.b, c: r.c, x }); x += width(t, r, size); };
    for (const r of rs) {
      if (r.br) { brk(); continue; }
      for (const tok of r.t.match(/[^ ]+ *| +/g) || []) {
        if (!x && !tok.trim()) continue;
        const ww = width(tok.trimEnd(), r, size);
        if (x + ww > w && x > 0 && !/^[,.;:)]/.test(tok)) brk();
        if (ww > w) { for (const ch of tok) { if (x + width(ch, r, size) > w) brk(); put(ch, r); } continue; }
        put(tok, r);
      }
    }
    return lines.filter((l, i) => l.length || i === 0);
  }
  function draw(lines, x, top, size, color = INK) {
    lines.forEach((line, i) => {
      const base = top + i * lh(size) + size * PT;
      for (const s of line) { font(s, size); doc.setTextColor(...rgb(s.c || color)); doc.text(s.t, x + s.x, base); }
    });
  }
  const textH = (lines, size) => lines.length * lh(size);

  // nadpis nesmí zůstat osamocený nad tabulkou na konci strany
  const after = el => { let n = el.nextElementSibling; if (n && n.tagName === "H3") n = n.nextElementSibling; return n && n.tagName === "TABLE" ? 70 : 24; };
  function heading(el) {
    const lines = wrap([{ t: el.textContent, b: true, c: accent }], CW - 6, 16);
    need(textH(lines, 16) + 12 + after(el));
    if (y > M) y += 7;
    fill(dot); doc.circle(M + 1.6, y + 3.2, 1.6, "F");
    draw(lines, M + 6, y, 16); y += textH(lines, 16) + 2;
    stroke(mix(dot, "#FFFFFF", .55)); doc.setLineWidth(.4); doc.line(M, y, M + CW, y); y += 4;
  }
  function subheading(el) {
    const lines = wrap([{ t: el.textContent, b: true }], CW, 11.5);
    need(textH(lines, 11.5) + after(el));
    y += 2.5; draw(lines, M, y, 11.5); y += textH(lines, 11.5) + 1.5;
  }
  function list(ul) {
    const size = 10;
    for (const li of ul.children) {
      const hl = li.classList.contains("hl");
      const box = hl ? 3 : 0, indent = hl ? box : 5, w = CW - indent - box;
      const lines = wrap(runs(li), w, size), h = textH(lines, size);
      need(h + 2 * box + 2);
      if (hl) {
        y += .8; fill(tint); doc.roundedRect(M, y, CW, h + 2 * box - .6, 1.6, 1.6, "F");
        draw(lines, M + indent, y + box - .3, size); y += h + 2 * box + .6;
      } else {
        fill(dot); doc.circle(M + 1.6, y + 2.5, .8, "F");
        draw(lines, M + indent, y, size); y += h + 1.1;
      }
    }
    y += 1;
  }
  function grid(el) {
    const size = 10, gap = 6, w = (CW - gap) / 2, items = [...el.children];
    for (let i = 0; i < items.length; i += 2) {
      const a = wrap(runs(items[i]), w, size), b = items[i + 1] ? wrap(runs(items[i + 1]), w, size) : null;
      const h = Math.max(textH(a, size), b ? textH(b, size) : 0) + 2.6;
      need(h);
      draw(a, M, y + .8, size); if (b) draw(b, M + w + gap, y + .8, size);
      stroke(LINE); doc.setLineWidth(.2); doc.line(M, y + h, M + CW, y + h); y += h;
    }
    y += 2;
  }
  function compare(el) {
    const size = 9.5, gap = 4, pad = 3, w = (CW - gap) / 2, boxes = [...el.children].map(d => {
      const v = d.classList.contains("yes") ? OK : d.classList.contains("no") ? BAD : null;
      const c = v || dot, inner = w - 2 * pad, title = wrap([{ t: d.querySelector("strong").textContent, b: true, c: v || accent }], inner, 10.5);
      const paras = [...d.querySelectorAll("p")].map(p => wrap(runs(p), inner, size));
      const h = textH(title, 10.5) + paras.reduce((s, p) => s + textH(p, size) + 1.2, 0) + 2 * pad;
      return { c, title, paras, h };
    });
    const h = Math.max(...boxes.map(b => b.h));
    need(h + 3);
    y += .8;
    boxes.forEach((b, i) => {
      const x = M + i * (w + gap);
      fill(mix(b.c, "#FFFFFF", .92)); stroke(mix(b.c, "#FFFFFF", .68)); doc.setLineWidth(.25);
      doc.roundedRect(x, y, w, h, 1.6, 1.6, "FD");
      let t = y + pad; draw(b.title, x + pad, t, 10.5); t += textH(b.title, 10.5) + 1.2;
      for (const p of b.paras) { draw(p, x + pad, t, size); t += textH(p, size) + 1.2; }
    });
    y += h + 3;
  }
  function table(el) {
    const size = 9, padX = 2, padY = 1.5, rows = [...el.rows], occ = [], cells = [];
    rows.forEach((tr, r) => {
      let c = 0; occ[r] = occ[r] || [];
      for (const td of tr.cells) {
        while (occ[r][c]) c++;
        const rs = td.rowSpan || 1;
        for (let i = 0; i < rs; i++) (occ[r + i] = occ[r + i] || [])[c] = true;
        const head = td.tagName === "TH", first = td.cellIndex === 0;
        const base = head ? { b: true, c: MUTED } : tr.classList.contains("g") && first ? { b: true, c: OK } : tr.classList.contains("r") ? { b: false, c: BAD } : { b: first, c: null };
        const rr = runs(td, { ...base, bc: tr.classList.contains("r") ? BAD : undefined }).map(x => x.br || x.small ? x : { ...x, b: x.b || base.b });
        cells.push({ r, c, rs, rr, head });
        c++;
      }
    });
    const n = Math.max(...cells.map(c => c.c)) + 1, maxW = Array(n).fill(0), minW = Array(n).fill(0);
    for (const cell of cells) {
      let line = 0;
      for (const x of cell.rr) {
        if (x.br) { maxW[cell.c] = Math.max(maxW[cell.c], line); line = 0; continue; }
        line += width(x.t, x, size);
        for (const w of x.t.split(" ")) minW[cell.c] = Math.max(minW[cell.c], width(w, x, size));
      }
      maxW[cell.c] = Math.max(maxW[cell.c], line);
    }
    const inner = CW - 2 * padX * n, sMin = minW.reduce((a, b) => a + b, 0), sMax = maxW.reduce((a, b) => a + b, 0);
    const cols = sMax <= inner ? maxW.map(v => v + (inner - sMax) / n)
      : maxW.map((v, i) => minW[i] + (v - minW[i]) * Math.max(0, inner - sMin) / Math.max(.01, sMax - sMin));
    const xs = [M]; cols.forEach((w, i) => xs.push(xs[i] + w + 2 * padX));
    const heights = rows.map(() => 0);
    for (const cell of cells) {
      const w = xs[cell.c + cell.rs * 0 + 1] - xs[cell.c] - 2 * padX;
      cell.w = w; cell.lines = wrap(cell.rr, w, size); cell.h = textH(cell.lines, size) + 2 * padY;
      if (cell.rs === 1) heights[cell.r] = Math.max(heights[cell.r], cell.h);
    }
    for (const cell of cells.filter(c => c.rs > 1)) {
      const have = heights.slice(cell.r, cell.r + cell.rs).reduce((a, b) => a + b, 0);
      if (have < cell.h) heights[cell.r + cell.rs - 1] += cell.h - have;
    }
    const covers = (r, c) => cells.find(x => x.c === c && x.r <= r && r < x.r + x.rs);
    function drawRow(r, top) {
      const h = heights[r];
      if (cells.some(c => c.r === r && c.head)) { fill("#F1EFEA"); doc.rect(M, top, CW, h, "F"); }
      for (const cell of cells.filter(c => c.r === r)) {
        const full = heights.slice(r, r + cell.rs).reduce((a, b) => a + b, 0);
        if (cell.rs > 1) { fill("#F7F6F2"); doc.rect(xs[cell.c], top, xs[cell.c + 1] - xs[cell.c], full, "F"); }
        const off = cell.rs > 1 ? (full - textH(cell.lines, size)) / 2 : padY;
        draw(cell.lines, xs[cell.c] + padX, top + off, size);
      }
    }
    function rules(r, top) {
      const h = heights[r], last = r === rows.length - 1;
      stroke(last || r === 0 ? "#D6D2C7" : LINE); doc.setLineWidth(.2);
      for (let c = 0; c < n; c++) { const o = covers(r, c); if (!o || r === o.r + o.rs - 1) doc.line(xs[c], top + h, xs[c + 1], top + h); }
      for (const cell of cells.filter(x => x.rs > 1 && x.r === r)) {
        const full = heights.slice(r, r + cell.rs).reduce((a, b) => a + b, 0);
        stroke(LINE); doc.line(xs[cell.c], top, xs[cell.c], top + full);
      }
    }
    y += 1;
    let r = 0;
    const header = cells.some(c => c.r === 0 && c.head);
    if (need(heights[0] + (heights[1] || 0))) { /* nadpis tabulky začne na nové straně */ }
    stroke("#D6D2C7"); doc.setLineWidth(.2); doc.line(M, y, M + CW, y);
    while (r < rows.length) {
      let end = r; // řádky spojené rowspanem nedělíme mezi strany
      for (let i = r; i <= end; i++) for (const c of cells) if (c.r === i && c.rs > 1) end = Math.max(end, i + c.rs - 1);
      const h = heights.slice(r, end + 1).reduce((a, b) => a + b, 0);
      if (y + h > BOTTOM) {
        newPage();
        if (header && r > 0) { stroke("#D6D2C7"); doc.line(M, y, M + CW, y); drawRow(0, y); rules(0, y); y += heights[0]; }
      }
      for (let i = r; i <= end; i++) { drawRow(i, y); rules(i, y); y += heights[i]; }
      r = end + 1;
    }
    y += 4;
  }

  // titulní hlavička
  doc.setProperties({ title: `${subject.name} – výpisky`, creator: "Biflovna" });
  const allKeys = Object.keys(subject.topics);
  draw([[{ t: "Biflovna · výpisky", b: true, c: CODE, x: 0 }]], M, y, 10); y += 6;
  const title = wrap([{ t: subject.name, b: true }], CW, 22);
  draw(title, M, y, 22); y += textH(title, 22) + 1;
  const sub = [subject.teacher, keys.length === allKeys.length ? "všechna témata" : `vybraná témata (${keys.length} z ${allKeys.length})`].filter(Boolean).join(" · ");
  draw(wrap([{ t: sub }], CW, 10), M, y, 10, MUTED); y += 7;

  // obsah
  const tpl = document.createElement("template");
  tpl.innerHTML = subject.learn;
  for (const k of keys) {
    const card = tpl.content.getElementById("L-" + k);
    if (!card) continue;
    dot = subject.topics[k].c; accent = mix(dot, "#000000", .32); tint = mix(dot, "#FFFFFF", .88);
    for (const el of card.children) {
      if (el.tagName === "H2") heading(el);
      else if (el.tagName === "H3") subheading(el);
      else if (el.tagName === "UL") list(el);
      else if (el.tagName === "TABLE") table(el);
      else if (el.classList.contains("cmp")) compare(el);
      else if (el.classList.contains("grid2")) grid(el);
    }
  }

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i); font({ b: false }, 8); doc.setTextColor(...rgb(MUTED));
    doc.text(`${subject.name}`, M, H - 9);
    doc.text(`${i} / ${pages}`, W - M, H - 9, { align: "right" });
  }
  return doc;
}

async function savePdf(doc, name, title) {
  try {
    if (IS_PC()) {
      const r = await window.pywebview.api.save_pdf(doc.output("datauristring").split(",")[1], name);
      if (r && r.ok) toast("PDF je uložené"); else if (r && !r.cancel) toast("PDF se nepodařilo uložit");
      return;
    }
    if (IS_LINUX()) {                                       // okno na Linuxu uloží soubor do složky Stažené a samo to oznámí
      window.webkit.messageHandlers.biflovna.postMessage(JSON.stringify({ pdf: doc.output("datauristring").split(",")[1], name }));
      return;
    }
    if (IS_ANDROID()) {
      await window.Capacitor.Plugins.Updater.sharePdf({ data: doc.output("datauristring").split(",")[1], name });
      return;
    }
    const blob = doc.output("blob"), file = new File([blob], name, { type: "application/pdf" });
    if (matchMedia("(pointer:coarse)").matches && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title });     // iPhone: Uložit do Souborů, AirDrop…
      return;
    }
    const a = document.createElement("a"), url = URL.createObjectURL(blob);
    a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    toast("PDF je stažené");
  } catch (e) {
    if (e && e.name !== "AbortError") toast("PDF se nepodařilo uložit");
  }
}

// výběr témat
const PDFSEL = new Set();
function renderPdfPanel() {
  const keys = Object.keys(S.topics).filter(k => S.learn && S.learn.includes(`id="L-${k}"`));
  $("#pdfChips").innerHTML = keys.map(k => `<button class="chip ${PDFSEL.has(k) ? "" : "off"}" data-p="${k}" style="--c:${S.topics[k].c}" aria-pressed="${PDFSEL.has(k)}"><i></i>${esc(S.topics[k].n)}</button>`).join("");
  $("#pdfAll").textContent = PDFSEL.size === keys.length ? "Zrušit výběr" : "Vybrat vše";
  $("#pdfGo").disabled = !PDFSEL.size;
  $("#pdfCount").textContent = `${PDFSEL.size} z ${keys.length}`;
}
document.addEventListener("click", e => {
  const el = e.target.closest("#bPdf,#pdfAll,#pdfGo,[data-p]");
  if (!el) return;
  const keys = Object.keys(S.topics).filter(k => S.learn && S.learn.includes(`id="L-${k}"`));
  if (el.id === "bPdf") {
    const p = $("#pdfPanel"), open = p.classList.contains("hide");
    p.classList.toggle("hide", !open); el.setAttribute("aria-expanded", open);
    if (open) { PDFSEL.clear(); keys.forEach(k => PDFSEL.add(k)); renderPdfPanel(); }
  } else if (el.id === "pdfAll") {
    const all = PDFSEL.size === keys.length; PDFSEL.clear(); if (!all) keys.forEach(k => PDFSEL.add(k)); renderPdfPanel();
  } else if (el.dataset.p) {
    PDFSEL.has(el.dataset.p) ? PDFSEL.delete(el.dataset.p) : PDFSEL.add(el.dataset.p); renderPdfPanel();
  } else if (el.id === "pdfGo") {
    const chosen = keys.filter(k => PDFSEL.has(k));
    const slug = (S.short || S.id).normalize("NFD").replace(/[^A-Za-z0-9]/g, "");
    savePdf(makeLearnPdf(S, chosen), `Biflovna-${slug}-vypisky.pdf`, `${S.name} – výpisky`);   // bez čekání: iPhone chce sdílení hned po klepnutí
  }
});
