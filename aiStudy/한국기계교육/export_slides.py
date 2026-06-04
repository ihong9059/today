"""PPTX → PNG export via PowerPoint COM
Output: slides/slide_01.png ... slide_10.png (1920x1080)
"""
from pathlib import Path
import win32com.client
import pythoncom

BASE = Path(r"C:\todo\today\aiStudy\한국기계교육")
PPTX = BASE / "한국기계_AI교육_제안.pptx"
OUT = BASE / "slides"
OUT.mkdir(exist_ok=True)

for f in OUT.glob("slide_*.png"):
    try:
        f.unlink()
    except Exception:
        pass

pythoncom.CoInitialize()
try:
    ppt = win32com.client.Dispatch("PowerPoint.Application")
    ppt.Visible = 1
    pres = ppt.Presentations.Open(str(PPTX), WithWindow=False)
    total = pres.Slides.Count
    print(f"Slides: {total}")
    for i in range(1, total + 1):
        out_path = OUT / f"slide_{i:02d}.png"
        pres.Slides(i).Export(str(out_path), "PNG", 1920, 1080)
        print(f"  - {out_path.name}")
    pres.Close()
    ppt.Quit()
finally:
    pythoncom.CoUninitialize()

print("Done.")
