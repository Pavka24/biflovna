"""Vyrobí assets/pdf-fonts.js: Inter Regular + Bold jako malé TTF pro export do PDF.

Bere kompletní Inter z balíčku inter-ui (devDependency) a zmenší ho na znaky, které výpisky opravdu potřebují.
Spuštění (jen po přidání neobvyklých znaků do výpisků):
  uv run --no-project --python 3.13 --with fonttools --with brotli python scripts/make_pdf_font.py
"""
import base64
import io
import pathlib
import re
import string
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXTRA = "áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ„“”‚‘’–—…·×−≈→←↔≠≤≥°μΩ₁¹²³⁴⁵⁶⁷⁸⁹⁰✓✗• "
text = string.printable + EXTRA + "".join(p.read_text(encoding="utf-8") for p in (ROOT / "src" / "subjects").glob("*.js"))
wanted = {ord(c) for c in text if ord(c) >= 32}

def find(name: str) -> TTFont:
    hits = sorted((ROOT / "node_modules" / "inter-ui").rglob(name))
    if not hits:
        sys.exit("Chybí " + name + " – spusť npm install")
    return TTFont(str(hits[0]))


out = {}
for key, name in (("r", "Inter-Regular.woff2"), ("b", "Inter-Bold.woff2")):
    font = find(name)
    missing = sorted(chr(c) for c in wanted - set(font.getBestCmap()) if c > 126)
    opts = subset.Options(layout_features=[], hinting=False, name_IDs=["*"], notdef_outline=True)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=wanted & set(font.getBestCmap()))
    sub.subset(font)
    font.flavor = None
    buf = io.BytesIO()
    font.save(buf)
    out[key] = base64.b64encode(buf.getvalue()).decode()
    print(f"{key}: {len(buf.getvalue()) // 1024} KB, chybí: {' '.join(missing) or '-'}")

(ROOT / "assets" / "pdf-fonts.js").write_text(
    "// Vygenerováno skriptem scripts/make_pdf_font.py\nconst PDF_FONTS = " + repr(out).replace("'", '"') + ";\n",
    encoding="utf-8",
)
