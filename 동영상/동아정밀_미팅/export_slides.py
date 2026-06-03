"""PPTX → PNG export via PowerPoint COM
Output: slides/slide_01.png ... slide_12.png (1920x1080)
"""
import os
import sys
from pathlib import Path
import win32com.client
import pythoncom

BASE = Path(r"C:\todo\today\동영상\동아정밀_미팅")
PPTX = BASE / "동아정밀_PET두께측정기_제안.pptx"
OUT = BASE / "slides"
OUT.mkdir(exist_ok=True)

# clean previous PNG outputs
for f in OUT.glob("slide_*.png"):
    try:
        f.unlink()
    except Exception:
        pass

pythoncom.CoInitialize()
try:
    ppt = win32com.client.Dispatch("PowerPoint.Application")
    # COM Visible is recommended for PowerPoint
    ppt.Visible = 1
    pres = ppt.Presentations.Open(str(PPTX), WithWindow=False)
    total = pres.Slides.Count
    print(f"Slides: {total}")
    for i in range(1, total + 1):
        out_path = OUT / f"slide_{i:02d}.png"
        # Export individual slide
        pres.Slides(i).Export(str(out_path), "PNG", 1920, 1080)
        print(f"  - {out_path.name}")
    pres.Close()
    ppt.Quit()
finally:
    pythoncom.CoUninitialize()

print("Done.")
