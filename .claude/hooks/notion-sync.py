#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Notion "오늘 할 일" 자동 동기화 스크립트
SessionStart hook으로 자동 실행

정책 (memory: feedback_todo_notion_sync.md):
  - 할일 생성 source of truth = 작업보고서 (Claude prompt에서 생성)
  - 완료 source of truth = Notion (사용자가 어디서나 체크)
  - 단방향: Notion 완료 → 작업보고서 ✅ (역방향 차단)

Flow:
  1. 체크된 항목 → 완료 섹션으로 이동 (날짜 태그)
  2. 완료 정리 (2일 경과 + 빈 항목 + 동일 텍스트 중복 제거)
  2.5. 완료 ↔ 목표/진행 중복 제거 (완료가 source of truth, 목표/진행 측 삭제)
  3. 작업보고서 ↔ Notion 단방향 동기화
       - 추가: 양방향 (작업보고서에 있는 항목을 Notion에 / Notion에 있는 항목을 작업보고서에)
       - 상태: Notion 완료 → 작업보고서 ✅ 만 (작업보고서 ✅ → Notion 체크 차단)
  4. 번호 재정렬 ([1], [2], ...)

입력 경로:
  - 할일 추가: Claude prompt → 작업보고서 → (sync) → Notion
  - 완료 처리: Notion에서 사용자가 체크 → (sync) → 작업보고서 ✅
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


# ── 유틸리티 ──────────────────────────────────────────────

def get_blocks():
    r = requests.get(
        f"https://api.notion.com/v1/blocks/{PAGE_ID}/children?page_size=100",
        headers=HEADERS,
    )
    return r.json().get("results", []) if r.status_code == 200 else []


def get_block_text(block):
    t = block.get("type", "")
    data = block.get(t, {})
    return "".join(rt.get("plain_text", "") for rt in data.get("rich_text", []))


def strip_number_prefix(text):
    """[N] 번호 프리픽스 제거"""
    return re.sub(r"^\[\d+\]\s*", "", text.strip())


def get_section_map(blocks):
    sections = {}
    current = None
    for b in blocks:
        t = b.get("type", "")
        if t.startswith("heading"):
            text = get_block_text(b)
            if "목표" in text:
                current = "목표"
            elif "진행" in text:
                current = "진행"
            elif "완료" in text:
                current = "완료"
            elif "메모" in text:
                current = "메모"
            else:
                current = text
            sections.setdefault(current, {"heading_id": b["id"], "blocks": []})
        elif current and current in sections:
            sections[current]["blocks"].append(b)
    return sections


def normalize_text(text):
    """비교용 정규화: 번호, 마크다운, 숫자, 특수문자 제거"""
    t = text.strip()
    t = re.sub(r"^\[\d+\]\s*", "", t)   # [N] 번호 제거
    t = re.sub(r"~{2}", "", t)          # ~~취소선~~ 제거
    t = re.sub(r"\[.*?\]", "", t)       # [태그] 제거
    t = re.sub(r"[#\d]+", "", t)        # 숫자, # 제거
    t = re.sub(r"[()（）\-—~,，.。·:：/]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def is_similar(a, b):
    """두 텍스트가 유사한지 판단"""
    a, b = a.strip(), b.strip()
    if not a or not b:
        return False

    na, nb = normalize_text(a), normalize_text(b)
    if na and nb:
        if na in nb or nb in na:
            return True
        # 글자 기반 유사도
        set_a, set_b = set(na), set(nb)
        if set_a and set_b:
            ratio = len(set_a & set_b) / max(len(set_a), len(set_b))
            if ratio >= 0.7:
                return True

    # 키워드 일치: 3개 이상 또는 작은 쪽의 50% 이상
    ka = set(w for w in normalize_text(a).split() if len(w) >= 2)
    kb = set(w for w in normalize_text(b).split() if len(w) >= 2)
    if ka and kb:
        common = len(ka & kb)
        ratio = common / min(len(ka), len(kb))
        if common >= 3 or (common >= 2 and ratio >= 0.5):
            return True

    return False


def get_report_path():
    project_root = Path(__file__).resolve().parent.parent.parent
    return project_root / "작업보고서" / f"{TODAY.strftime('%Y-%m-%d')}_작업보고서.md"


def get_report_todos():
    report_path = get_report_path()
    if not report_path.exists():
        return []

    todos = []
    for i, line in enumerate(report_path.read_text(encoding="utf-8").split("\n")):
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
        if todo_text:
            todos.append({
                "text": todo_text,
                "done": "✅" in status,
                "progress": "🔄" in status,
                "line": i,
            })
    return todos


# ── 1단계: 체크된 항목 → 완료 이동 ─────────────────────────

def move_checked_to_complete(sections):
    if "완료" not in sections:
        return

    complete_heading_id = sections["완료"]["heading_id"]
    moved = []

    for sec in ["목표", "진행"]:
        if sec not in sections:
            continue
        for b in sections[sec]["blocks"]:
            if b.get("type") != "to_do":
                continue
            data = b.get("to_do", {})
            if not data.get("checked", False):
                continue
            text = get_block_text(b).strip()
            if not text:
                continue

            # 번호 프리픽스 제거 후 완료 섹션에 추가
            clean_text = strip_number_prefix(text)
            new_block = {
                "object": "block",
                "type": "to_do",
                "to_do": {
                    "rich_text": [{"type": "text", "text": {"content": f"[{TODAY_TAG}] {clean_text}"}}],
                    "checked": True,
                },
            }
            r = requests.patch(
                f"https://api.notion.com/v1/blocks/{PAGE_ID}/children",
                headers=HEADERS,
                json={"children": [new_block], "after": complete_heading_id},
            )
            if r.status_code == 200:
                requests.delete(f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS)
                moved.append(clean_text)

    if moved:
        print(f"notion-sync: 완료로 이동 {len(moved)}건")


# ── 2단계: 완료 정리 ───────────────────────────────────────

def cleanup_completed(sections):
    if "완료" not in sections:
        return

    deleted = []
    seen_texts = []

    for b in sections["완료"]["blocks"]:
        if b.get("type") != "to_do":
            continue
        text = get_block_text(b).strip()

        # 빈 항목 삭제
        if not text:
            requests.delete(f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS)
            deleted.append("(빈 항목)")
            continue

        # 동일 텍스트 중복 삭제 (첫 번째만 유지)
        if text in seen_texts:
            requests.delete(f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS)
            deleted.append(text)
            continue
        seen_texts.append(text)

        # 2일 경과 삭제
        match = re.match(r"\[(\d{2}/\d{2})\]\s*(.*)", text)
        if match:
            try:
                item_date = datetime.strptime(f"{TODAY.year}/{match.group(1)}", "%Y/%m/%d")
                if item_date > TODAY + timedelta(days=30):
                    item_date = item_date.replace(year=TODAY.year - 1)
                if (TODAY - item_date).days >= 2:
                    requests.delete(f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS)
                    deleted.append(match.group(2))
            except ValueError:
                pass
        else:
            # 날짜 태그 없는 항목 → 오래된 항목이므로 삭제
            requests.delete(f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS)
            deleted.append(text)

    if deleted:
        print(f"notion-sync: 완료 정리 {len(deleted)}건")


# ── 2.5단계: 완료 ↔ 목표/진행 중복 제거 ────────────────────

def dedup_against_completed(sections):
    """완료 섹션의 항목과 동일한 항목이 목표/진행에 있으면 → 목표/진행 측 삭제.
    완료가 source of truth. 같은 항목이 양쪽에 있으면 미완료 측 정리."""
    if "완료" not in sections:
        return

    completed_texts = []
    for b in sections["완료"]["blocks"]:
        if b.get("type") != "to_do":
            continue
        text = get_block_text(b).strip()
        if text:
            completed_texts.append(text)

    if not completed_texts:
        return

    deleted = 0
    for sec in ["목표", "진행"]:
        if sec not in sections:
            continue
        for b in sections[sec]["blocks"]:
            if b.get("type") != "to_do":
                continue
            text = get_block_text(b).strip()
            if not text:
                continue
            for ct in completed_texts:
                if is_similar(text, ct):
                    requests.delete(
                        f"https://api.notion.com/v1/blocks/{b['id']}",
                        headers=HEADERS,
                    )
                    deleted += 1
                    break

    if deleted:
        print(f"notion-sync: 완료 중복 제거 {deleted}건 (목표/진행 측)")


# ── 3단계: 작업보고서 ↔ Notion 양방향 동기화 ────────────────

def sync_bidirectional(sections):
    if "목표" not in sections:
        return

    report_todos = get_report_todos()
    report_path = get_report_path()

    # Notion 모든 섹션 항목 수집 (완료 매칭으로 작업보고서 ✅ 동기화에 사용)
    notion_todos = []
    for sec in ["목표", "진행", "완료"]:
        if sec not in sections:
            continue
        for b in sections[sec]["blocks"]:
            if b.get("type") != "to_do":
                continue
            text = get_block_text(b).strip()
            if not text:
                continue
            # 비교 시 번호 프리픽스 + 날짜 태그 제거
            clean_text = strip_number_prefix(text)
            clean_text = re.sub(r"^\[\d{2}/\d{2}\]\s*", "", clean_text)
            checked = b.get("to_do", {}).get("checked", False)
            # 완료 섹션 항목은 강제 done=True
            if sec == "완료":
                checked = True
            notion_todos.append({"text": clean_text, "done": checked, "id": b["id"], "section": sec})

    # --- 작업보고서 → Notion 추가 ---
    goal_heading_id = sections["목표"]["heading_id"]
    progress_heading_id = sections.get("진행", {}).get("heading_id")
    added_to_notion = []

    for rt in report_todos:
        if rt["done"]:
            continue
        # 이미 Notion에 있는지 확인
        if any(is_similar(rt["text"], nt["text"]) for nt in notion_todos):
            continue

        target = progress_heading_id if rt.get("progress") and progress_heading_id else goal_heading_id
        new_block = {
            "object": "block",
            "type": "to_do",
            "to_do": {
                "rich_text": [{"type": "text", "text": {"content": rt["text"]}}],
                "checked": False,
            },
        }
        r = requests.patch(
            f"https://api.notion.com/v1/blocks/{PAGE_ID}/children",
            headers=HEADERS,
            json={"children": [new_block], "after": target},
        )
        if r.status_code == 200:
            added_to_notion.append(rt["text"])

    # --- Notion → 작업보고서 추가 ---
    added_to_report = []
    if report_path.exists():
        content = report_path.read_text(encoding="utf-8")
        lines = content.split("\n")

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
            # 완료 항목은 작업보고서에 새로 추가하지 않음 (역사적 완료 누적 방지)
            if nt["done"]:
                continue
            if any(is_similar(rt["text"], nt["text"]) for rt in report_todos):
                continue

            max_num += 1
            if nt.get("section") == "진행":
                status = "🔄"
            else:
                status = "⬜"
            new_line = f"| {max_num} | {nt['text']} | Notion | {status} |"
            if last_table_line >= 0:
                lines.insert(last_table_line + 1, new_line)
                last_table_line += 1
            added_to_report.append(nt["text"])

        # --- 상태 동기화 (단방향: Notion → 작업보고서) ---
        # 정책 (memory: feedback_todo_notion_sync.md):
        # - 완료 source of truth = Notion (사용자가 어디서나 체크)
        # - 작업보고서 ✅ → Notion 체크는 차단 (역방향 금지)
        status_synced = []
        for rt in report_todos:
            for nt in notion_todos:
                if not is_similar(rt["text"], nt["text"]):
                    continue
                if nt["done"] and not rt["done"]:
                    # ⬜/🔄 → ✅ 변경 + 텍스트 ~~취소선~~ 추가
                    line = lines[rt["line"]]
                    line = line.replace("⬜", "✅").replace("🔄", "✅")
                    # 작업보고서 행: | N | TEXT | 출처 | 상태 |
                    # TEXT 부분만 ~~로 감싸기 (이미 감싸져 있으면 skip)
                    parts = line.split("|")
                    if len(parts) >= 5:
                        todo_text = parts[2].strip()
                        if todo_text and not todo_text.startswith("~~"):
                            parts[2] = f" ~~{todo_text}~~ "
                            line = "|".join(parts)
                    lines[rt["line"]] = line
                    status_synced.append(f'{rt["text"]} → ✅')
                # 역방향(작업보고서 ✅ → Notion checked) 차단 — 정책상 금지
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


# ── 4단계: 번호 재정렬 ─────────────────────────────────────

def renumber_todos(sections):
    """목표 + 진행 중 항목에 [1], [2], ... 번호 부여"""
    num = 1
    updated = 0

    for sec in ["목표", "진행"]:
        if sec not in sections:
            continue
        for b in sections[sec]["blocks"]:
            if b.get("type") != "to_do":
                continue
            data = b.get("to_do", {})
            text = get_block_text(b).strip()
            if not text:
                continue

            clean = strip_number_prefix(text)
            new_text = f"[{num}] {clean}"

            # 텍스트가 변경된 경우에만 업데이트
            if text != new_text:
                requests.patch(
                    f"https://api.notion.com/v1/blocks/{b['id']}",
                    headers=HEADERS,
                    json={
                        "to_do": {
                            "rich_text": [{"type": "text", "text": {"content": new_text}}],
                            "checked": data.get("checked", False),
                        }
                    },
                )
                updated += 1
            num += 1

    if updated:
        print(f"notion-sync: 번호 재정렬 {updated}건")


# ── 메인 ──────────────────────────────────────────────────

def main():
    blocks = get_blocks()
    if not blocks:
        print("notion-sync: 블록 조회 실패")
        return

    # 1. 체크된 항목 → 완료 이동
    sections = get_section_map(blocks)
    move_checked_to_complete(sections)

    # 2. 완료 정리 (2일 경과 + 동일 중복 + 날짜 없음)
    blocks = get_blocks()
    sections = get_section_map(blocks)
    cleanup_completed(sections)

    # 2.5. 완료 ↔ 목표/진행 중복 제거 (완료가 source of truth)
    blocks = get_blocks()
    sections = get_section_map(blocks)
    dedup_against_completed(sections)

    # 3. 작업보고서 ↔ Notion 동기화 (단방향: Notion 완료 → 작업보고서 ✅)
    blocks = get_blocks()
    sections = get_section_map(blocks)
    sync_bidirectional(sections)

    # 4. 번호 재정렬
    blocks = get_blocks()
    sections = get_section_map(blocks)
    renumber_todos(sections)


if __name__ == "__main__":
    main()
