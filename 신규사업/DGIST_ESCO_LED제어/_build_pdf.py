"""DGIST ESCO LED 자료 — Markdown → HTML → PDF 변환 (Chrome headless 사용)."""
import os
import subprocess
import sys
from pathlib import Path

import markdown

BASE = Path(__file__).parent
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

CSS = """
@page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
    @bottom-right { content: counter(page) " / " counter(pages); }
}
* { box-sizing: border-box; }
body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #222;
    max-width: 100%;
    margin: 0;
    padding: 0;
}
h1 {
    font-size: 20pt;
    color: #1a3a5c;
    border-bottom: 3px solid #1a3a5c;
    padding-bottom: 6px;
    margin-top: 22pt;
    margin-bottom: 14pt;
    page-break-before: auto;
}
h1:first-of-type { page-break-before: avoid; margin-top: 0; }
h2 {
    font-size: 15pt;
    color: #1a3a5c;
    border-bottom: 1.5px solid #c8d4e0;
    padding-bottom: 4px;
    margin-top: 18pt;
    margin-bottom: 10pt;
    page-break-after: avoid;
}
h3 {
    font-size: 12.5pt;
    color: #295583;
    margin-top: 14pt;
    margin-bottom: 8pt;
    page-break-after: avoid;
}
h4 {
    font-size: 11pt;
    color: #444;
    margin-top: 10pt;
    margin-bottom: 6pt;
}
p { margin: 6pt 0; }
strong { color: #b03030; font-weight: 600; }
em { color: #555; }
hr {
    border: 0;
    border-top: 1px dashed #aaa;
    margin: 16pt 0;
}

/* 표 — 깔끔 + 줄바꿈 OK */
table {
    border-collapse: collapse;
    width: 100%;
    margin: 10pt 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
}
th, td {
    border: 1px solid #b4c4d4;
    padding: 5pt 8pt;
    text-align: left;
    vertical-align: top;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
th {
    background: #e8eef5;
    color: #1a3a5c;
    font-weight: 600;
}
tr:nth-child(even) td { background: #f8fafc; }

/* 코드 / pre — ASCII art 계통도 보존 */
code {
    font-family: 'Consolas', 'D2Coding', 'NanumGothicCoding', monospace;
    background: #f4f5f7;
    padding: 1pt 4pt;
    border-radius: 3px;
    font-size: 9.5pt;
    color: #b03030;
}
pre {
    /* 한글 monospace 폰트 우선 — 한글 글자 정확히 영문 2-cell 폭 보장 (ASCII art 정렬) */
    font-family: 'D2Coding', 'NanumGothicCoding', Consolas, 'Courier New', 'GulimChe', 'DotumChe', monospace;
    background: #f7f8fa;
    border: 1px solid #d8dde5;
    border-left: 3px solid #1a3a5c;
    padding: 6pt 8pt;
    overflow-x: visible;
    font-size: 6.8pt;
    line-height: 1.15;
    white-space: pre;
    page-break-inside: avoid;
    color: #2a3a4a;
    letter-spacing: 0;
    tab-size: 2;
}
pre code { background: transparent; padding: 0; color: inherit; }

/* 리스트 */
ul, ol { margin: 6pt 0 6pt 22pt; padding: 0; }
li { margin: 3pt 0; }

/* blockquote — 시방서 원문 인용 */
blockquote {
    border-left: 4px solid #aacc88;
    background: #f4f9ea;
    margin: 10pt 0;
    padding: 6pt 12pt;
    color: #4a5a3a;
    font-style: italic;
}

/* 페이지 break 헬퍼 */
.page-break { page-break-after: always; }

/* === HTML 박스 다이어그램 === */
.diagram {
    margin: 12pt 0;
    padding: 10pt;
    background: #fafbfc;
    border: 1px solid #e0e4e8;
    border-radius: 6px;
    page-break-inside: avoid;
}
.diagram .row {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 8pt;
    flex-wrap: nowrap;
    margin: 4pt 0;
}
.diagram .row.wrap { flex-wrap: wrap; }
.diagram .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4pt;
    flex: 1;
}
.diagram .box {
    border: 1.5px solid #1a3a5c;
    background: #e8eef5;
    padding: 6pt 10pt;
    border-radius: 4px;
    text-align: center;
    font-size: 9pt;
    line-height: 1.35;
    color: #1a3a5c;
    min-width: 80pt;
    flex: 1;
}
.diagram .box .title {
    font-weight: bold;
    margin-bottom: 2pt;
    color: #0d2540;
}
.diagram .box .sub {
    font-size: 7.5pt;
    color: #4a5a6a;
    font-style: italic;
}
.diagram .box.cloud {
    background: #d4e7f5;
    border-color: #2a6090;
    border-radius: 14px;
}
.diagram .box.ir {
    background: #fde8d0;
    border-color: #b06820;
}
.diagram .box.ble {
    background: #e0f0e0;
    border-color: #3a7a3a;
}
.diagram .box.gateway {
    background: #f0e0e8;
    border-color: #8a3a6a;
}
.diagram .box.user {
    background: #fff5d0;
    border-color: #9a7820;
}
.diagram .arrow {
    text-align: center;
    color: #555;
    font-size: 14pt;
    font-weight: bold;
    line-height: 1;
    margin: 2pt 0;
}
.diagram .arrow-h {
    align-self: center;
    color: #555;
    font-size: 14pt;
    font-weight: bold;
    padding: 0 4pt;
}
.diagram .label {
    text-align: center;
    font-size: 7.5pt;
    color: #666;
    font-style: italic;
    margin: 2pt 0;
}
.diagram .zone {
    border: 1.5px dashed #999;
    border-radius: 6px;
    padding: 8pt 8pt 6pt 8pt;
    margin: 4pt 0;
    position: relative;
    background: #fff;
}
.diagram .zone-title {
    position: absolute;
    top: -8pt;
    left: 10pt;
    background: #fafbfc;
    padding: 0 6pt;
    font-size: 8pt;
    font-weight: bold;
    color: #555;
}
.diagram .grid {
    display: grid;
    gap: 4pt;
    margin: 4pt 0;
}
.diagram .grid-4 { grid-template-columns: repeat(4, 1fr); }
.diagram .grid-5 { grid-template-columns: repeat(5, 1fr); }
.diagram .grid-6 { grid-template-columns: repeat(6, 1fr); }
.diagram .grid-8 { grid-template-columns: repeat(8, 1fr); }
.diagram .luminaire {
    text-align: center;
    padding: 3pt;
    background: #fff5d0;
    border: 1px solid #9a7820;
    border-radius: 50%;
    font-size: 7pt;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.diagram .luminaire.active {
    background: #ffd060;
    box-shadow: 0 0 6pt 2pt rgba(255, 180, 0, 0.6);
}
.diagram .luminaire.dim {
    background: #fff5d0;
    opacity: 0.7;
}
.diagram .luminaire.off {
    background: #d0d0d0;
    border-color: #888;
    opacity: 0.5;
}
.diagram .legend {
    display: flex;
    justify-content: center;
    gap: 14pt;
    margin-top: 6pt;
    font-size: 7.5pt;
    color: #666;
}
.diagram .legend-item {
    display: flex;
    align-items: center;
    gap: 4pt;
}
.diagram .legend-dot {
    width: 8pt;
    height: 8pt;
    border-radius: 50%;
    border: 1px solid #888;
}

/* State machine */
.state-machine {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6pt;
    margin: 12pt 0;
}
.state-machine .state {
    border: 2px solid #1a3a5c;
    background: #e8eef5;
    border-radius: 50pt;
    padding: 8pt 16pt;
    font-size: 9pt;
    text-align: center;
    min-width: 140pt;
}
.state-machine .state .name { font-weight: bold; color: #0d2540; }
.state-machine .state .desc { font-size: 7.5pt; color: #666; }
.state-machine .trans {
    font-size: 8pt;
    color: #555;
    border-left: 2px solid #999;
    padding: 2pt 0 2pt 8pt;
    text-align: left;
}

/* Grafana dashboard mock */
.dashboard {
    border: 2px solid #333;
    border-radius: 6px;
    background: #f8f9fa;
    padding: 10pt;
    margin: 12pt 0;
    page-break-inside: avoid;
}
.dashboard .dash-title {
    font-weight: bold;
    font-size: 11pt;
    color: #1a3a5c;
    padding-bottom: 4pt;
    border-bottom: 1px solid #999;
    margin-bottom: 8pt;
}
.dashboard .dash-row {
    display: flex;
    gap: 8pt;
    margin: 6pt 0;
}
.dashboard .dash-panel {
    flex: 1;
    background: #fff;
    border: 1px solid #d0d4d8;
    border-radius: 4px;
    padding: 8pt;
    font-size: 8.5pt;
}
.dashboard .dash-panel-title {
    font-weight: bold;
    font-size: 8.5pt;
    color: #444;
    margin-bottom: 4pt;
}
.dashboard .dash-stat {
    font-size: 14pt;
    font-weight: bold;
    color: #1a3a5c;
}
.dashboard .dash-stat .unit { font-size: 8pt; color: #888; font-weight: normal; }
.dashboard .dash-spark {
    font-family: 'Consolas', monospace;
    font-size: 10pt;
    color: #1a7a3a;
    letter-spacing: 1pt;
}
"""

DOCS = [
    ("README.md", "표지 · 요약"),
    ("01_시스템개요.md", "01. 시스템 개요"),
    ("02_BLE_Mesh_IoT_제어시스템.md", "02. BLE Mesh IoT 제어 시스템"),
    ("03_IR_통신_그룹제어시스템.md", "03. IR 통신 그룹제어 시스템"),
    ("04_계통도_및_구현방법.md", "04. 계통도 및 구현 방법"),
]


def md_to_html_body(md_text: str) -> str:
    md = markdown.Markdown(
        extensions=["tables", "fenced_code", "sane_lists", "nl2br"],
    )
    return md.convert(md_text)


def wrap_html(body: str, title: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>{CSS}</style>
</head>
<body>
{body}
</body>
</html>"""


def chrome_print_pdf(html_file: Path, pdf_file: Path) -> bool:
    html_uri = "file:///" + str(html_file.resolve()).replace("\\", "/")
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-margins",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_file}",
        html_uri,
    ]
    print(f"  → Chrome rendering {pdf_file.name} ...", flush=True)
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if res.returncode != 0:
        print(f"  ✗ failed: {res.stderr[:200]}")
        return False
    if not pdf_file.exists():
        print(f"  ✗ PDF not created")
        return False
    print(f"  ✓ {pdf_file.name} ({pdf_file.stat().st_size // 1024} KB)")
    return True


def build_individual_pdfs():
    print("\n[1/2] 개별 PDF 생성")
    results = []
    for md_name, title in DOCS:
        md_path = BASE / md_name
        if not md_path.exists():
            print(f"  skip {md_name} (없음)")
            continue
        html_body = md_to_html_body(md_path.read_text(encoding="utf-8"))
        html_path = BASE / f".tmp_{md_path.stem}.html"
        html_path.write_text(wrap_html(html_body, title), encoding="utf-8")
        pdf_path = BASE / f"{md_path.stem}.pdf"
        ok = chrome_print_pdf(html_path, pdf_path)
        html_path.unlink(missing_ok=True)
        results.append((md_name, ok))
    return results


def build_combined_pdf():
    print("\n[2/2] 통합 PDF 생성")
    parts = []
    for md_name, title in DOCS:
        md_path = BASE / md_name
        if not md_path.exists():
            continue
        body = md_to_html_body(md_path.read_text(encoding="utf-8"))
        parts.append(f'<div class="page-break"></div>\n{body}' if parts else body)

    combined_html = wrap_html("\n".join(parts), "DGIST ESCO LED 조명제어 시스템 기술자료 (통합본)")
    html_path = BASE / ".tmp_combined.html"
    html_path.write_text(combined_html, encoding="utf-8")
    pdf_path = BASE / "_통합본_DGIST_ESCO_LED_기술자료.pdf"
    ok = chrome_print_pdf(html_path, pdf_path)
    html_path.unlink(missing_ok=True)
    return ok


if __name__ == "__main__":
    print(f"BASE = {BASE}")
    indiv = build_individual_pdfs()
    combined = build_combined_pdf()
    print("\n=== 요약 ===")
    for md_name, ok in indiv:
        print(f"  {'✓' if ok else '✗'} {md_name}")
    print(f"  {'✓' if combined else '✗'} 통합본 PDF")
