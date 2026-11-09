"""Vytáhne text ze slidů PowerPointu (.pptx / .ppsx / .potx) do .txt – podklad pro tvorbu otázek a learningu.
Použití:  uv run --no-project python -I scripts/extract_slides.py <výstupní_složka> <soubor1.pptx> [soubor2.ppsx ...]
Výstup:   <výstupní_složka>/<název>.txt   – každý slide jako  [číslo] odstavec | odstavec | ...
          Prázdné slidy (jen obrázek) jsou označené  [číslo] (OBRÁZEK – zkontroluj vizuálně)
PDF se nečte tímto skriptem – Claude ho přečte přímo nástrojem Read (umí i obrázky/tabulky).
"""
import html
import os
import re
import sys
import zipfile


def slide_texts(path):
    z = zipfile.ZipFile(path)
    names = [n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)]
    names.sort(key=lambda n: int(re.findall(r"\d+", n)[0]))
    for n in names:
        x = z.read(n).decode("utf-8")
        paras = ["".join(re.findall(r"<a:t>([^<]*)</a:t>", p)) for p in re.findall(r"<a:p>.*?</a:p>", x, re.S)]
        paras = [html.unescape(p).strip() for p in paras if p.strip()]
        # poznámky přednášejícího (často tam bývá doplňující výklad)
        notes = ""
        nn = n.replace("slides/slide", "notesSlides/notesSlide")
        if nn in z.namelist():
            nx = z.read(nn).decode("utf-8")
            nt = " ".join(html.unescape(t) for t in re.findall(r"<a:t>([^<]*)</a:t>", nx)).strip()
            if nt and not nt.isdigit():
                notes = f"  [POZNÁMKY: {nt}]"
        num = re.findall(r"\d+", n)[0]
        has_pic = "<p:pic>" in x or "<a:blip" in x
        if paras:
            yield f"[{num}] " + " | ".join(paras) + (" (+obrázek)" if has_pic else "") + notes
        else:
            yield f"[{num}] (OBRÁZEK – zkontroluj vizuálně)" if has_pic else f"[{num}] (prázdný)"


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    for p in sys.argv[2:]:
        lines = list(slide_texts(p))
        name = os.path.splitext(os.path.basename(p))[0]
        with open(os.path.join(out, name + ".txt"), "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        pics = sum("OBRÁZEK" in l for l in lines)
        print(f"{name}: {len(lines)} slidů, {pics} jen s obrázkem -> {name}.txt")


if __name__ == "__main__":
    main()
