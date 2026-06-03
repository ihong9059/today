"""build_pptx.py에서 S6, S10 블록 통째 삭제 + 페이지번호 재매핑"""
from pathlib import Path
import re

f = Path(r"C:\todo\today\동영상\동아정밀_미팅\build_pptx.py")
src = f.read_text(encoding="utf-8")

# === S6 블록 삭제 ===
# "# Slide 6 — 임호균 경력 타임라인" 부터 "add_notes(s, narration_s6)\n" 까지
s6_pattern = re.compile(
    r"# ============================================================\n"
    r"# Slide 6 — 임호균 경력 타임라인\n"
    r"# ============================================================\n.*?"
    r"add_notes\(s, narration_s6\)\n\n",
    re.DOTALL,
)
n6 = len(s6_pattern.findall(src))
src = s6_pattern.sub("", src)
print(f"S6 block removed: {n6}")

# === S10 블록 삭제 ===
s10_pattern = re.compile(
    r"# ============================================================\n"
    r"# Slide 10 — 2호기 재개발 패턴 일본 사례\n"
    r"# ============================================================\n.*?"
    r"add_notes\(s, narration_s10\)\n\n",
    re.DOTALL,
)
n10 = len(s10_pattern.findall(src))
src = s10_pattern.sub("", src)
print(f"S10 block removed: {n10}")

# === 페이지 번호 재매핑 ===
# 옛 S7 → 새 S6, S8→S7, S9→S8, S11→S9, S12→S10
mappings = [
    ("add_page_header(s, 7, TOTAL,", "add_page_header(s, 6, TOTAL,"),
    ("add_page_header(s, 8, TOTAL,", "add_page_header(s, 7, TOTAL,"),
    ("add_page_header(s, 9, TOTAL,", "add_page_header(s, 8, TOTAL,"),
    ("add_page_header(s, 11, TOTAL,", "add_page_header(s, 9, TOTAL,"),
    ("add_page_header(s, 12, TOTAL,", "add_page_header(s, 10, TOTAL,"),
]
for old, new in mappings:
    cnt = src.count(old)
    src = src.replace(old, new)
    print(f"  {old.strip()} → {new.strip()}  : {cnt}")

f.write_text(src, encoding="utf-8")
print("done.")
