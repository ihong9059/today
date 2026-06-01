"""
PDF → DXF 변환 (PyMuPDF + ezdxf)

DGIST ESCO LED 조명제어구역 도면 (AutoCAD 2026 plot) 시범 변환.

알고리즘:
  1. PyMuPDF로 PDF page open
  2. get_drawings()로 vector path 추출 (line / bezier / rect)
  3. get_text("dict")로 text 추출 (한글 포함)
  4. PDF Optional Content Group(OCG) → DXF layer 매핑
  5. 좌표 변환: PDF (origin top-left, y down) → DXF (origin bottom-left, y up)
  6. ezdxf로 DXF R2018 저장

PDF point 그대로 DXF 단위로 박제 (1 pt ≈ 0.353 mm). AutoCAD에서 SCALE 후처리.
"""

import sys
import argparse
from pathlib import Path

import fitz  # PyMuPDF
import ezdxf
from ezdxf import colors as dxf_colors


def rgb_to_aci(rgb):
    """Convert RGB tuple (0-1 floats) to AutoCAD Color Index. Use truecolor if available."""
    if rgb is None:
        return 7  # white/black (default by background)
    r, g, b = [int(c * 255) for c in rgb[:3]]
    return dxf_colors.rgb2int((r, g, b))


def convert_pdf_to_dxf(pdf_path: Path, dxf_path: Path, page_num: int = 0) -> dict:
    """Convert PDF page → DXF. Returns statistics dict."""
    doc = fitz.open(pdf_path)
    if page_num >= len(doc):
        raise ValueError(f"Page {page_num} not found (total {len(doc)} pages)")

    page = doc[page_num]
    page_height = page.rect.height  # for y-flip

    # OCG (PDF Layer) inventory
    ocg_info = doc.get_ocgs()  # {xref: {"name": ..., "intent": ..., "on": bool}}
    print(f"\n  PDF Layer (OCG) 개수: {len(ocg_info)}")
    for xref, info in list(ocg_info.items())[:10]:
        print(f"    [{xref}] {info.get('name', '?')}")
    if len(ocg_info) > 10:
        print(f"    ... (+{len(ocg_info) - 10} more)")

    # DXF document — R2018 (AutoCAD 2018+)
    dwg = ezdxf.new("R2018", setup=True)
    msp = dwg.modelspace()

    # Predefine layers from OCG
    layer_map = {}
    for xref, info in ocg_info.items():
        name = info.get("name", f"LAYER_{xref}").strip()
        # DXF layer name 제약: < 256 char, 공백·특수문자 일부 허용
        safe_name = name.replace("/", "_").replace("\\", "_")[:255]
        if safe_name not in dwg.layers:
            dwg.layers.add(name=safe_name, color=7)
        layer_map[xref] = safe_name

    # Default layer for paths without OCG
    if "PDF_DEFAULT" not in dwg.layers:
        dwg.layers.add(name="PDF_DEFAULT", color=7)
    if "PDF_TEXT" not in dwg.layers:
        dwg.layers.add(name="PDF_TEXT", color=3)

    # 1) Vector paths
    drawings = page.get_drawings()
    n_line = n_bezier = n_rect = n_other = 0

    for d in drawings:
        items = d.get("items", [])
        stroke = d.get("stroke_color") or d.get("color")
        try:
            true_color = rgb_to_aci(stroke)
        except Exception:
            true_color = None

        for item in items:
            op = item[0]

            if op == "l":  # line: (op, p1, p2)
                p1, p2 = item[1], item[2]
                attribs = {"layer": "PDF_DEFAULT"}
                if true_color:
                    attribs["true_color"] = true_color
                msp.add_line(
                    (p1.x, page_height - p1.y),
                    (p2.x, page_height - p2.y),
                    dxfattribs=attribs,
                )
                n_line += 1

            elif op == "c":  # bezier curve: (op, p1, p2, p3, p4) - cubic
                # Approximate with 8-segment polyline
                pts = [item[1], item[2], item[3], item[4]]
                if len(pts) >= 4:
                    p0, c1, c2, p3 = pts[:4]
                    poly_pts = []
                    N = 8
                    for i in range(N + 1):
                        t = i / N
                        # Cubic Bezier
                        x = (
                            (1 - t) ** 3 * p0.x
                            + 3 * (1 - t) ** 2 * t * c1.x
                            + 3 * (1 - t) * t ** 2 * c2.x
                            + t ** 3 * p3.x
                        )
                        y = (
                            (1 - t) ** 3 * p0.y
                            + 3 * (1 - t) ** 2 * t * c1.y
                            + 3 * (1 - t) * t ** 2 * c2.y
                            + t ** 3 * p3.y
                        )
                        poly_pts.append((x, page_height - y))
                    attribs = {"layer": "PDF_DEFAULT"}
                    if true_color:
                        attribs["true_color"] = true_color
                    msp.add_lwpolyline(poly_pts, dxfattribs=attribs)
                    n_bezier += 1

            elif op == "re":  # rectangle: (op, fitz.Rect)
                r = item[1]
                pts = [
                    (r.x0, page_height - r.y0),
                    (r.x1, page_height - r.y0),
                    (r.x1, page_height - r.y1),
                    (r.x0, page_height - r.y1),
                    (r.x0, page_height - r.y0),
                ]
                attribs = {"layer": "PDF_DEFAULT"}
                if true_color:
                    attribs["true_color"] = true_color
                msp.add_lwpolyline(pts, dxfattribs=attribs)
                n_rect += 1
            else:
                n_other += 1

    # 2) Text
    n_text = 0
    n_text_korean = 0
    text_dict = page.get_text("dict")
    for block in text_dict.get("blocks", []):
        if block.get("type") != 0:  # 0 = text
            continue
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                s = span.get("text", "")
                if not s.strip():
                    continue
                bbox = span.get("bbox")  # (x0, y0, x1, y1)
                if not bbox:
                    continue
                size = span.get("size", 8) * 0.75  # PDF pt → approximate
                insert = (bbox[0], page_height - bbox[3])  # bottom-left

                # Detect Korean
                if any("가" <= ch <= "힯" for ch in s):
                    n_text_korean += 1

                try:
                    msp.add_text(
                        s,
                        dxfattribs={
                            "layer": "PDF_TEXT",
                            "height": size,
                            "insert": insert,
                        },
                    )
                    n_text += 1
                except Exception as e:
                    # Some unicode/glyph errors — skip
                    print(f"    [warn] text skip: {repr(s[:30])} ({e})")

    # 3) Save DXF
    dwg.saveas(dxf_path)

    stats = {
        "pdf": str(pdf_path),
        "dxf": str(dxf_path),
        "page_size_pt": (page.rect.width, page.rect.height),
        "page_size_mm": (page.rect.width * 0.3528, page.rect.height * 0.3528),
        "ocg_count": len(ocg_info),
        "ocg_names": [v.get("name", "?") for v in ocg_info.values()],
        "lines": n_line,
        "beziers": n_bezier,
        "rects": n_rect,
        "other": n_other,
        "texts": n_text,
        "korean_texts": n_text_korean,
        "total_entities": n_line + n_bezier + n_rect + n_text,
    }
    return stats


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("dxf", type=Path)
    parser.add_argument("--page", type=int, default=0)
    args = parser.parse_args()

    print(f"\n[PDF → DXF 변환]")
    print(f"  입력: {args.pdf}")
    print(f"  출력: {args.dxf}")
    print(f"  페이지: {args.page}")

    stats = convert_pdf_to_dxf(args.pdf, args.dxf, args.page)

    print(f"\n[변환 결과]")
    print(f"  PDF 페이지 크기: {stats['page_size_pt'][0]:.1f} × {stats['page_size_pt'][1]:.1f} pt")
    print(f"  = {stats['page_size_mm'][0]:.1f} × {stats['page_size_mm'][1]:.1f} mm")
    print(f"  Vector entity:")
    print(f"    Line       : {stats['lines']:>6d}")
    print(f"    Bezier (→ polyline 8 seg): {stats['beziers']:>6d}")
    print(f"    Rectangle  : {stats['rects']:>6d}")
    print(f"    Other      : {stats['other']:>6d}")
    print(f"  Text entity   : {stats['texts']:>6d} (한글 포함: {stats['korean_texts']})")
    print(f"  Total entity  : {stats['total_entities']:>6d}")
    print(f"  PDF Layer (OCG): {stats['ocg_count']}")
    if stats['ocg_names']:
        print(f"  OCG names: {stats['ocg_names'][:5]}{'...' if len(stats['ocg_names'])>5 else ''}")

    dxf_size = args.dxf.stat().st_size
    print(f"\n  DXF 파일 크기: {dxf_size:,} byte ({dxf_size/1024:.1f} KB)")
    print(f"\n[완료]")


if __name__ == "__main__":
    main()
