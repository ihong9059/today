#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""오늘 작업보고서 자동 생성 스크립트"""

import os
from datetime import datetime
from pathlib import Path

def main():
    today = datetime.now().strftime("%Y-%m-%d")
    # 스크립트 위치 기준으로 프로젝트 루트 찾기 (.claude/hooks/ → ../../)
    base_dir = Path(__file__).resolve().parent.parent.parent / "작업보고서"
    report_path = base_dir / f"{today}_작업보고서.md"

    if not report_path.exists():
        template = f"""# 작업보고서 - {today}

## 오늘 할일
- [ ]

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
    else:
        print(f"Exists: {report_path}")

if __name__ == "__main__":
    main()
