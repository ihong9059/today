#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
myWiki/raw/ junction 정합성 검증 hook

myWiki/second-brain/CLAUDE.md 스키마 § "디렉토리 구조"의 raw/ 트리에 등재된
junction 폴더가 실재하는지 검증한다. broken/missing 발견 시 복구 가이드 출력.

2026-05-20 신설 — onDevice_AI junction 부재 사건 박제 후속.
"""
import re
import sys
from pathlib import Path

SCHEMA = Path("C:/todo/today/myWiki/second-brain/CLAUDE.md")
RAW_BASE = Path("C:/todo/today/myWiki/raw")

# CLAUDE.md 디렉토리 트리에서 "├── {name}/" + "(→ junction)" 패턴 추출
JUNCTION_PATTERN = re.compile(r"├──\s+([^/\s]+)/.*?junction", re.IGNORECASE)

# 추정 target 경로 (CLAUDE.md에 명시된 경우만)
TARGET_HINTS = {
    "revitaProject": "C:/todo/revitaProject",
    "onDevice_AI": "C:/todo/onDevice_AI",
    "회사소개": "C:/todo/uttecHome/회사소개",  # uttecHome 분리 후
}


def main():
    if not SCHEMA.exists():
        print(f"check-raw-junctions: schema not found ({SCHEMA})", file=sys.stderr)
        return 0

    text = SCHEMA.read_text(encoding="utf-8", errors="ignore")
    junctions = JUNCTION_PATTERN.findall(text)
    if not junctions:
        return 0

    missing = []
    broken = []
    for name in junctions:
        p = RAW_BASE / name
        if not p.exists():
            missing.append(name)
        elif p.is_dir():
            try:
                next(p.iterdir())
            except (PermissionError, OSError):
                broken.append(name)
            except StopIteration:
                pass

    if not missing and not broken:
        return 0

    print("⚠️  raw/ junction 정합성 문제 감지")
    for name in missing:
        target = TARGET_HINTS.get(name, "(목표 경로 확인 필요)")
        print(f"  - missing: raw/{name}/  → 복구: New-Item -ItemType Junction -Path \"{RAW_BASE}\\{name}\" -Target \"{target}\"")
    for name in broken:
        print(f"  - broken : raw/{name}/  (접근 불가 — target 삭제됨 가능)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
