#!/usr/bin/env python3
"""SessionStart hook — _inbox/pending/ 자동 확인 (multi-agent 통신)

{{SELF_CLAUDE_ID}} ↔ {{PEER_CLAUDE_ID}} (그 외 위키) 간 비동기 통신 통로.
PROTOCOL: _inbox/PROTOCOL.md
"""
import json
import os
import re
import sys
from pathlib import Path


INBOX_PENDING = Path("_inbox/pending")
SELF_ID = "{{SELF_CLAUDE_ID}}"   # ★ 셋업 시 본 위키 Claude 식별자로 변경 (예: mywiki-claude)


def parse_frontmatter(text: str) -> dict:
    """단순 frontmatter 파서 (yaml 의존 회피)."""
    m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return {}
    out: dict[str, str] = {}
    for line in m.group(1).splitlines():
        if ":" in line and not line.lstrip().startswith("-"):
            k, v = line.split(":", 1)
            out[k.strip()] = v.strip()
    return out


def main() -> None:
    if not INBOX_PENDING.is_dir():
        return

    cards: list[dict] = []
    for path in sorted(INBOX_PENDING.glob("*.md")):
        try:
            text = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        fm = parse_frontmatter(text)
        if not fm:
            continue
        # `to:` 필드가 자기인 카드만 (보호: 잘못 놓인 카드 무시)
        to = fm.get("to", "").strip()
        if to and to != SELF_ID:
            continue
        # status 가 done/rejected면 skip (정리 안 된 카드)
        status = fm.get("status", "pending").strip()
        if status not in {"pending", "in_progress", ""}:
            continue
        cards.append(
            {
                "path": str(path).replace("\\", "/"),
                "id": fm.get("id", path.stem),
                "from": fm.get("from", "unknown"),
                "type": fm.get("type", "request"),
                "priority": fm.get("priority", "normal"),
                "subject": fm.get("subject", "(no subject)"),
            }
        )

    if not cards:
        return

    # priority 순 정렬: urgent > high > normal > low
    rank = {"urgent": 0, "high": 1, "normal": 2, "low": 3}
    cards.sort(key=lambda c: rank.get(c["priority"], 2))

    lines = [f"📬 _inbox/pending/ 미처리 카드 {len(cards)}건 (multi-agent 통신):"]
    for c in cards:
        lines.append(
            f"  - [{c['priority']}/{c['type']}] from {c['from']} | "
            f"{c['subject']} ({c['path']})"
        )
    lines.append(
        "처리: 카드 본문 읽기 → 실행 → processed/로 이동. "
        "필요 시 응답 카드는 발신측 inbox에 작성. PROTOCOL: _inbox/PROTOCOL.md"
    )

    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "SessionStart",
                    "additionalContext": "\n".join(lines),
                }
            }
        )
    )


if __name__ == "__main__":
    try:
        main()
    except Exception:
        sys.exit(0)
