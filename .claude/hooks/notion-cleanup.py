#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Notion "오늘 할 일" 완료 섹션 정리 스크립트
work-end 스킬에서 호출 — 2일 경과 완료 항목 자동 삭제
"""

import os
import re
import sys
from datetime import datetime, timedelta

try:
    import requests
except ImportError:
    print("notion-cleanup: requests 모듈 없음, 스킵")
    sys.exit(0)

TOKEN = os.environ.get("NOTION_TOKEN", "")
if not TOKEN:
    print("notion-cleanup: NOTION_TOKEN 없음, 스킵")
    sys.exit(0)

PAGE_ID = "349cb620-8c2b-817d-a7fe-c887ecdee292"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}
TODAY = datetime.now()


def main():
    # 블록 조회
    r = requests.get(
        f"https://api.notion.com/v1/blocks/{PAGE_ID}/children?page_size=100",
        headers=HEADERS,
    )
    if r.status_code != 200:
        print("notion-cleanup: 블록 조회 실패")
        return

    blocks = r.json().get("results", [])

    # 완료 섹션 찾기
    in_complete = False
    deleted = []

    for b in blocks:
        t = b.get("type", "")
        if t.startswith("heading"):
            data = b.get(t, {})
            text = "".join(rt.get("plain_text", "") for rt in data.get("rich_text", []))
            in_complete = "완료" in text
            continue

        if not in_complete or t != "to_do":
            continue

        data = b.get("to_do", {})
        text = "".join(rt.get("plain_text", "") for rt in data.get("rich_text", []))

        # [MM/DD] 패턴 확인
        match = re.match(r"\[(\d{2}/\d{2})\]\s*(.*)", text)
        if not match:
            continue

        try:
            item_date = datetime.strptime(f"{TODAY.year}/{match.group(1)}", "%Y/%m/%d")
            # 연말/연초 경계
            if item_date > TODAY + timedelta(days=30):
                item_date = item_date.replace(year=TODAY.year - 1)
            if (TODAY - item_date).days >= 2:
                dr = requests.delete(
                    f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS
                )
                if dr.status_code == 200:
                    deleted.append(match.group(2))
        except ValueError:
            continue

    if deleted:
        print(f"notion-cleanup: 2일 경과 {len(deleted)}건 삭제 — {', '.join(deleted)}")
    else:
        print("notion-cleanup: 삭제할 항목 없음")


if __name__ == "__main__":
    main()
