# -*- coding: utf-8 -*-
"""PowerPoint COM으로 pptx를 슬라이드 PNG로 내보내고, 썸네일 그리드 1장 생성."""
import sys, os, glob
import win32com.client
from PIL import Image

pptx = os.path.abspath(sys.argv[1])
outdir = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else "render_out")
os.makedirs(outdir, exist_ok=True)
for f in glob.glob(os.path.join(outdir, "*.png")):
    os.remove(f)

pp = win32com.client.Dispatch("PowerPoint.Application")
deck = pp.Presentations.Open(pptx, WithWindow=False)
deck.SaveAs(outdir, 18)  # 18 = ppSaveAsPNG → 슬라이드별 PNG 폴더
deck.Close()
pp.Quit()

imgs = sorted(glob.glob(os.path.join(outdir, "*.PNG")) + glob.glob(os.path.join(outdir, "*.png")),
              key=lambda x: int(''.join(filter(str.isdigit, os.path.basename(x))) or 0))
print("rendered:", len(imgs))

# 썸네일 그리드 (4열)
cols = 4
thumbs = [Image.open(i).convert("RGB") for i in imgs]
tw = 640
sized = [t.resize((tw, int(tw*t.height/t.width))) for t in thumbs]
th = sized[0].height
rows = (len(sized)+cols-1)//cols
pad = 12
grid = Image.new("RGB", (cols*tw+(cols+1)*pad, rows*th+(rows+1)*pad), (235,238,242))
for idx, im in enumerate(sized):
    r, c = divmod(idx, cols)
    grid.paste(im, (pad+c*(tw+pad), pad+r*(th+pad)))
gpath = os.path.join(outdir, "_grid.png")
grid.save(gpath)
print("grid:", gpath)
