"""
DXF header extents 후처리 — Autodesk Viewer 호환성 fix

증상:
  Autodesk Viewer가 "설계는 비어 있습니다" 에러
  원인: $EXTMIN=(1e+20, ...), $EXTMAX=(-1e+20, ...) uninitialized

해결:
  모든 entity bbox 계산 → header 변수 + modelspace viewport 설정
"""

import sys
from pathlib import Path

import ezdxf
from ezdxf import bbox


def fix_extents(dxf_path: Path):
    dwg = ezdxf.readfile(dxf_path)
    msp = dwg.modelspace()

    ext = bbox.extents(msp)
    if not ext.has_data:
        print(f"  ⚠️ {dxf_path.name}: bbox 계산 불가 (entity 없음?)")
        return

    extmin = ext.extmin
    extmax = ext.extmax
    size_x = extmax.x - extmin.x
    size_y = extmax.y - extmin.y
    center_x = (extmin.x + extmax.x) / 2
    center_y = (extmin.y + extmax.y) / 2

    # Set header extents
    dwg.header["$EXTMIN"] = (extmin.x, extmin.y, 0)
    dwg.header["$EXTMAX"] = (extmax.x, extmax.y, 0)
    dwg.header["$LIMMIN"] = (extmin.x, extmin.y)
    dwg.header["$LIMMAX"] = (extmax.x, extmax.y)

    # Modelspace viewport — show all
    dwg.set_modelspace_vport(
        height=size_y * 1.1,
        center=(center_x, center_y),
    )

    dwg.saveas(dxf_path)

    print(
        f"  ✓ {dxf_path.name:30s} "
        f"bbox=({extmin.x:.0f},{extmin.y:.0f}) → ({extmax.x:.0f},{extmax.y:.0f})  "
        f"size {size_x:.0f}×{size_y:.0f}"
    )


def main():
    folder = Path(sys.argv[1] if len(sys.argv) > 1 else "변환")
    dxfs = sorted(folder.glob("*.dxf"))
    print(f"\n[DXF extents fix — {folder}/]\n")
    for dxf in dxfs:
        fix_extents(dxf)
    print(f"\n총 {len(dxfs)}개 DXF 처리 완료\n")


if __name__ == "__main__":
    main()
