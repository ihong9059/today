#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""오늘 작업보고서 자동 생성 스크립트 (SessionStart 훅).

- 스크립트 위치(.claude/hooks/) 기준으로 vault 루트를 찾으므로 어느 경로에 복사해도 동작.
- 이미 오늘 보고서가 있으면 건드리지 않음(idempotent).
"""

import sys
from datetime import datetime
from pathlib import Path


def main():
    today = datetime.now().strftime("%Y-%m-%d")
    # .claude/hooks/create-daily-report.py → ../../ = vault 루트
    base_dir = Path(__file__).resolve().parent.parent.parent / "작업보고서"
    base_dir.mkdir(parents=True, exist_ok=True)
    report_path = base_dir / f"{today}_작업보고서.md"

    if report_path.exists():
        print(f"Exists: {report_path}")
        return

    template = f"""# 작업보고서 - {today}

## 오늘 할일

| 순번 | 할일 | 출처 | 상태 |
|:----:|------|------|:----:|
| 1 |  |  | ⬜ |

## 오늘 완료 사항

(작업 진행 후 업데이트)

## 작업 상세 내용

(작업 진행 후 업데이트)

## 수정/생성된 파일

(작업 진행 후 업데이트)

## 세션 요약
- **주요 작업**:
- **완료 사항**:
- **미완료**:
- **완료율**:
"""
    report_path.write_text(template, encoding="utf-8")
    print(f"Created: {report_path}")


if __name__ == "__main__":
    sys.exit(main())
