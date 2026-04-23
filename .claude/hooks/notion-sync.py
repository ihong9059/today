#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Notion "오늘 할 일" 자동 동기화 스크립트
SessionStart hook으로 자동 실행

기능:
1. 체크된 항목 → 완료 섹션으로 이동 (날짜 태그 추가)
2. 작업보고서 할일 ↔ Notion 오늘의 목표 양방향 동기화
   - 작업보고서에만 있는 항목 → Notion에 추가
   - Notion에만 있는 항목 → 작업보고서에 추가
   - 상태 동기화: Notion 체크 → 작업보고서 ✅, 작업보고서 ✅ → Notion 체크
"""

import os
import re
import sys
from datetime import datetime, timedelta
from pathlib import Path

try:
    import requests
except ImportError:
    print("notion-sync: requests 모듈 없음, 스킵")
    sys.exit(0)

TOKEN = os.environ.get("NOTION_TOKEN", "")
if not TOKEN:
    print("notion-sync: NOTION_TOKEN 없음, 스킵")
    sys.exit(0)

PAGE_ID = "349cb620-8c2b-817d-a7fe-c887ecdee292"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}
TODAY = datetime.now()
TODAY_TAG = TODAY.strftime("%m/%d")


def get_blocks():
    """페이지의 모든 블록 조회"""
    r = requests.get(
        f"https://api.notion.com/v1/blocks/{PAGE_ID}/children?page_size=100",
        headers=HEADERS,
    )
    if r.status_code != 200:
        return []
    return r.json().get("results", [])


def get_block_text(block):
    """블록에서 텍스트 추출"""
    t = block.get("type", "")
    data = block.get(t, {})
    return "".join(rt.get("plain_text", "") for rt in data.get("rich_text", []))


def get_section_map(blocks):
    """섹션별 블록 분류"""
    sections = {}
    current_section = None
    for b in blocks:
        t = b.get("type", "")
        if t.startswith("heading"):
            text = get_block_text(b)
            if "목표" in text:
                current_section = "목표"
            elif "진행" in text:
                current_section = "진행"
            elif "완료" in text:
                current_section = "완료"
            elif "메모" in text:
                current_section = "메모"
            else:
                current_section = text
            sections.setdefault(current_section, {"heading_id": b["id"], "blocks": []})
        elif current_section and current_section in sections:
            sections[current_section]["blocks"].append(b)
    return sections


def move_checked_to_complete(sections):
    """체크된 항목을 완료 섹션으로 이동"""
    if "완료" not in sections:
        return

    complete_heading_id = sections["완료"]["heading_id"]
    moved = []

    for section_name in ["목표", "진행"]:
        if section_name not in sections:
            continue
        for b in sections[section_name]["blocks"]:
            if b.get("type") != "to_do":
                continue
            data = b.get("to_do", {})
            if not data.get("checked", False):
                continue
            text = get_block_text(b)
            if not text.strip():
                continue

            # 완료 섹션에 날짜 태그와 함께 추가
            new_block = {
                "object": "block",
                "type": "to_do",
                "to_do": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {"content": f"[{TODAY_TAG}] {text}"},
                        }
                    ],
                    "checked": True,
                },
            }
            r = requests.patch(
                f"https://api.notion.com/v1/blocks/{PAGE_ID}/children",
                headers=HEADERS,
                json={"children": [new_block], "after": complete_heading_id},
            )
            if r.status_code == 200:
                # 원래 위치에서 삭제
                requests.delete(
                    f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS
                )
                moved.append(text)

    if moved:
        print(f"notion-sync: 완료로 이동 {len(moved)}건")


def delete_old_completed(sections):
    """완료 섹션에서 2일 지난 항목 삭제"""
    if "완료" not in sections:
        return

    deleted = []
    for b in sections["완료"]["blocks"]:
        if b.get("type") != "to_do":
            continue
        text = get_block_text(b)
        # [MM/DD] 패턴에서 날짜 추출
        match = re.match(r"\[(\d{2}/\d{2})\]\s*(.*)", text)
        if not match:
            continue
        date_str = match.group(1)
        try:
            item_date = datetime.strptime(
                f"{TODAY.year}/{date_str}", "%Y/%m/%d"
            )
            # 연말/연초 경계 처리
            if item_date > TODAY + timedelta(days=30):
                item_date = item_date.replace(year=TODAY.year - 1)
            if (TODAY - item_date).days >= 2:
                r = requests.delete(
                    f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS
                )
                if r.status_code == 200:
                    deleted.append(match.group(2))
        except ValueError:
            continue

    if deleted:
        print(f"notion-sync: 2일 경과 삭제 {len(deleted)}건")


def get_report_path():
    """오늘 작업보고서 경로"""
    today_str = TODAY.strftime("%Y-%m-%d")
    return Path(r"C:\todo\today\작업보고서") / f"{today_str}_작업보고서.md"


def get_report_todos():
    """오늘 작업보고서에서 할일 목록 추출 (텍스트, 상태, 줄번호)"""
    report_path = get_report_path()
    if not report_path.exists():
        return []

    content = report_path.read_text(encoding="utf-8")
    todos = []

    # 테이블 형식: | 순번 | 할일 | 출처 | 상태 |
    for i, line in enumerate(content.split("\n")):
        stripped = line.strip()
        if not stripped.startswith("|"):
            continue
        parts = [p.strip() for p in stripped.split("|")]
        if len(parts) < 5:
            continue
        try:
            int(parts[1])
        except (ValueError, IndexError):
            continue
        todo_text = parts[2]
        status = parts[4]
        is_done = "✅" in status
        if todo_text:
            todos.append({"text": todo_text, "done": is_done, "line": i})

    return todos


def is_similar(a, b):
    """두 텍스트가 유사한지 판단 (부분 매칭)"""
    a = a.strip()
    b = b.strip()
    if not a or not b:
        return False
    return a in b or b in a


def sync_bidirectional(sections):
    """작업보고서 ↔ Notion 오늘의 목표 양방향 동기화"""
    if "목표" not in sections:
        return

    report_todos = get_report_todos()
    report_path = get_report_path()

    # Notion 목표 항목 수집
    notion_todos = []
    for b in sections["목표"]["blocks"]:
        if b.get("type") != "to_do":
            continue
        text = get_block_text(b).strip()
        if not text:
            continue
        checked = b.get("to_do", {}).get("checked", False)
        notion_todos.append({"text": text, "done": checked, "id": b["id"]})

    # 완료 섹션 항목도 수집 (중복 방지용)
    completed_texts = set()
    for sec in ["완료"]:
        if sec in sections:
            for b in sections[sec]["blocks"]:
                if b.get("type") == "to_do":
                    text = get_block_text(b).strip()
                    cleaned = re.sub(r"^\[\d{2}/\d{2}\]\s*", "", text)
                    completed_texts.add(cleaned)

    # --- 1. 작업보고서 → Notion 추가 ---
    heading_id = sections["목표"]["heading_id"]
    added_to_notion = []
    for rt in report_todos:
        # 이미 Notion에 있는지 확인
        found = False
        for nt in notion_todos:
            if is_similar(rt["text"], nt["text"]):
                found = True
                break
        # 완료 섹션에도 확인
        for ct in completed_texts:
            if is_similar(rt["text"], ct):
                found = True
                break
        if found:
            continue

        new_block = {
            "object": "block",
            "type": "to_do",
            "to_do": {
                "rich_text": [{"type": "text", "text": {"content": rt["text"]}}],
                "checked": rt["done"],
            },
        }
        r = requests.patch(
            f"https://api.notion.com/v1/blocks/{PAGE_ID}/children",
            headers=HEADERS,
            json={"children": [new_block], "after": heading_id},
        )
        if r.status_code == 200:
            added_to_notion.append(rt["text"])

    # --- 2. Notion → 작업보고서 추가 ---
    added_to_report = []
    if report_path.exists():
        content = report_path.read_text(encoding="utf-8")
        lines = content.split("\n")

        # 현재 작업보고서의 마지막 순번 찾기
        max_num = 0
        last_table_line = -1
        for i, line in enumerate(lines):
            stripped = line.strip()
            if not stripped.startswith("|"):
                continue
            parts = [p.strip() for p in stripped.split("|")]
            if len(parts) < 5:
                continue
            try:
                num = int(parts[1])
                if num > max_num:
                    max_num = num
                    last_table_line = i
            except (ValueError, IndexError):
                continue

        for nt in notion_todos:
            # 이미 작업보고서에 있는지 확인
            found = False
            for rt in report_todos:
                if is_similar(rt["text"], nt["text"]):
                    found = True
                    break
            if found:
                continue

            max_num += 1
            status = "✅" if nt["done"] else "⬜"
            new_line = f"| {max_num} | {nt['text']} | Notion | {status} |"
            if last_table_line >= 0:
                lines.insert(last_table_line + 1, new_line)
                last_table_line += 1
            added_to_report.append(nt["text"])

        # --- 3. 상태 동기화 ---
        status_synced = []
        for rt in report_todos:
            for nt in notion_todos:
                if not is_similar(rt["text"], nt["text"]):
                    continue
                # Notion 체크됨 → 작업보고서 ✅
                if nt["done"] and not rt["done"]:
                    old_line = lines[rt["line"]]
                    lines[rt["line"]] = old_line.replace("⬜", "✅")
                    status_synced.append(f'{rt["text"]} → ✅')
                # 작업보고서 ✅ → Notion 체크
                elif rt["done"] and not nt["done"]:
                    requests.patch(
                        f'https://api.notion.com/v1/blocks/{nt["id"]}',
                        headers=HEADERS,
                        json={"to_do": {"checked": True}},
                    )
                    status_synced.append(f'{nt["text"]} → checked')
                break

        if added_to_report or status_synced:
            report_path.write_text("\n".join(lines), encoding="utf-8")

        if status_synced:
            print(f"notion-sync: 상태 동기화 {len(status_synced)}건")

    if added_to_notion:
        print(f"notion-sync: 작업보고서→Notion {len(added_to_notion)}건 추가")
    if added_to_report:
        print(f"notion-sync: Notion→작업보고서 {len(added_to_report)}건 추가")
    if not added_to_notion and not added_to_report:
        print("notion-sync: 동기화 완료 (변경 없음)")


def main():
    blocks = get_blocks()
    if not blocks:
        print("notion-sync: 블록 조회 실패")
        return

    sections = get_section_map(blocks)

    # 1. 체크된 항목 → 완료로 이동
    move_checked_to_complete(sections)

    # 2. 작업보고서 ↔ Notion 양방향 동기화
    blocks = get_blocks()
    sections = get_section_map(blocks)
    sync_bidirectional(sections)


if __name__ == "__main__":
    main()
