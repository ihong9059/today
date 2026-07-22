#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sibling vault 진행상황 staleness 감지 hook (계층 A — pull, read-only)

C:/todo/ 하위 A군(사람이 읽고 결단하는) vault의 log.md 최종수정 시각을,
myWiki에 있는 해당 vault entity의 최종수정 시각과 비교한다.
vault log가 entity보다 더 최신이면 = "vault는 진행했는데 myWiki에 아직 cascade 안 됨"
→ work-start / SessionStart에서 경고를 surface 한다.

⚠️ 읽기만 한다 (자동 sync 금지 — feedback_vault_scope_isolation 준수).
   실제 반영은 사용자 판단 하에 카드 흡수/entity 갱신으로 별도 수행.

2026-07-23 신설 — uttec-academy 3차 개강(7/15)이 myWiki(6/27 entity)에
                  cascade 안 된 채 today 스코프에서 방치된 사건 후속.
"""
import sys
import re
from datetime import datetime
from pathlib import Path

TODO = Path("C:/todo")
ENTITIES = TODO / "today/myWiki/second-brain/entities"

# {vault 디렉토리명: myWiki entity 파일명}
# A군 로컬 vault 중 myWiki entity가 있는 것만. 신규 vault 합류 시 여기에 추가.
VAULT_MAP = {
    "uttec-academy": "uttec-academy.md",
    "lora":          "lora.md",
    "onDevice_AI":   "onDevice-ai.md",
    "ponet":         "ponet.md",
    "weldRobot":     "weldRobot.md",
    "factory":       "factory.md",
}

# entity가 vault보다 최소 이 일수 이상 뒤처져야 경고 (당일 노이즈 억제)
STALE_DAYS = 1

DATE_HDR = re.compile(r"^#{1,3}\s*\[(\d{4}-\d{2}-\d{2})\]\s*(.*)$")


def last_log_entry(log_path: Path):
    """vault log.md에서 날짜가 가장 최신인 '## [YYYY-MM-DD] ...' 헤더 (날짜, 요약) 반환.
    로그가 최신-상단/최신-하단 어느 순서든 무관하게 max 날짜를 고른다."""
    try:
        text = log_path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return None, None
    best_date, best_summary = None, None
    for line in text.splitlines():
        m = DATE_HDR.match(line.strip())
        if m:
            d, s = m.group(1), m.group(2).strip()
            if best_date is None or d > best_date:
                best_date, best_summary = d, s
    return best_date, best_summary


def main():
    stale = []
    for vault_dir, entity_file in VAULT_MAP.items():
        log_path = TODO / vault_dir / "log.md"
        entity_path = ENTITIES / entity_file
        if not log_path.exists() or not entity_path.exists():
            continue
        log_mtime = log_path.stat().st_mtime
        entity_mtime = entity_path.stat().st_mtime
        if log_mtime <= entity_mtime:
            continue
        days = (log_mtime - entity_mtime) / 86400
        if days < STALE_DAYS:
            continue
        log_date, log_summary = last_log_entry(log_path)
        entity_date = datetime.fromtimestamp(entity_mtime).strftime("%Y-%m-%d")
        stale.append({
            "vault": vault_dir,
            "entity": entity_file,
            "days": int(days),
            "log_date": log_date or datetime.fromtimestamp(log_mtime).strftime("%Y-%m-%d"),
            "entity_date": entity_date,
            "summary": (log_summary or "")[:70],
        })

    if not stale:
        return 0

    stale.sort(key=lambda s: s["days"], reverse=True)
    print("📊 vault 진행상황 미반영 감지 (myWiki entity가 vault log보다 뒤처짐)")
    for s in stale:
        print(f"  - {s['vault']}: log {s['log_date']} > entity {s['entity_date']} "
              f"({s['days']}일 미반영)")
        if s["summary"]:
            print(f"      └ 최근: {s['summary']}")
    print("  → 반영: 해당 vault 카드 흡수 또는 entity cascade 갱신 (읽기전용 감지, 자동 sync 안 함)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
