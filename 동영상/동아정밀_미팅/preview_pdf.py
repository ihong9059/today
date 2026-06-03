"""Quick PDF preview — extract pages 1, 4, 10, 11, 14 as PNG"""
import fitz
from pathlib import Path

BASE = Path(r"C:\todo\today\동영상\동아정밀_미팅")
pdf = BASE / "uttec_회사소개서_동아정밀_v1.pdf"
out_dir = BASE / "preview"
out_dir.mkdir(exist_ok=True)

doc = fitz.open(str(pdf))
print(f"Total pages: {doc.page_count}")
pages = [1, 2, 3, 4, 10, 11, 13, 14, 15]
for p in pages:
    if p > doc.page_count:
        continue
    page = doc[p - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    out = out_dir / f"page_{p:02d}.png"
    pix.save(str(out))
    print(f"  - page {p}: {out.name}  ({page.rect.width:.0f}x{page.rect.height:.0f})")
doc.close()
