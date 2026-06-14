#!/usr/bin/env python3
"""Multi-agent outbound push broker — myWiki/_inbox/outbox-staging/*.md 를 frontmatter to: 기준으로 분산 vault pending/에 push.

mywiki-claude가 다른 vault에 회신 카드 발송 시 사용.
대칭 패턴: pull-multi-agent-outbound.py (factory → myWiki) ↔ push-multi-agent-pending.py (myWiki → 분산 vault)

지원 vault:
- 분산 vault (ssh + scp): uttec-factory-claude, shield-claude, n8n-claude 등
- 본 PC vault (단순 copy): ondevice-claude, wishket-claude, lemonlabs-claude 등 (옵션, ssh 불요)

동작:
1. myWiki/_inbox/outbox-staging/*.md 카드 list (.gitkeep 제외)
2. frontmatter `to:` 필드 읽어 라우팅
3. 분산 vault: ssh + scp push → 원격 _inbox/pending/<filename>
4. 본 PC vault: file copy → vault _inbox/pending/<filename>
5. push 성공 시 outbox-staging/<card> → outbox-staging/sent-archived/ 이동 (재발송 방지)
6. 결과 요약 출력

PROTOCOL: C:/todo/today/myWiki/_inbox/PROTOCOL.md
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

OUTBOX_STAGING = Path("C:/todo/today/myWiki/_inbox/outbox-staging")
SENT_ARCHIVED = OUTBOX_STAGING / "sent-archived"
SELF_ID = "mywiki-claude"

# 분산 vault 라우팅 — to 식별자 → ssh + pending 경로
REMOTE_VAULTS = {
    "uttec-factory-claude": {
        "ssh": "uttec@100.109.84.79",
        "pending": "/home/uttec/project/uttec-factory/_inbox/pending",
    },
    "shield-claude": {
        "ssh": "uttec@100.110.51.14",
        "pending": "/home/uttec/project/shield/_inbox/pending",
    },
    "n8n-claude": {
        "ssh": "uttec@100.90.158.36",
        "pending": "/home/uttec/project/n8nUttec/_inbox/pending",
    },
    "uttec-plc-claude": {
        "ssh": "uttec@100.90.158.36",
        "pending": "/home/uttec/uttec-plc/_inbox/pending",
    },
    # 추후 추가:
    # "uttec-vault-claude": {"ssh": "uttec@100.90.158.36", "pending": "/home/uttec/uttec-vault/_inbox/pending"},
    # ...
}

# 본 PC vault 라우팅 — to 식별자 → 본 PC pending 경로 (ssh 불요)
LOCAL_VAULTS = {
    "ondevice-claude": Path("C:/todo/onDevice_AI/_inbox/pending"),
    "wishket-claude": Path("C:/todo/wishketProject/_inbox/pending"),
    "lemonlabs-claude": Path("C:/todo/lemonLabs/_inbox/pending"),
    "uttechome-claude": Path("C:/todo/uttecHome/_inbox/pending"),
    "search-claude": Path("C:/todo/search/_inbox/pending"),
    "revita-claude": Path("C:/todo/revitaProject/_inbox/pending"),
    "weldrobot-claude": Path("C:/todo/weldRobot/_inbox/pending"),
    "ponet-claude": Path("C:/todo/ponet/_inbox/pending"),
    "factory-claude": Path("C:/todo/factory/_inbox/pending"),
    "tabm9-claude": Path("C:/todo/tabM9/_inbox/pending"),
    "lora-claude": Path("C:/todo/lora/_inbox/pending"),
}


def run(cmd, timeout=15):
    try:
        return subprocess.run(
            cmd, shell=True, capture_output=True, text=True,
            encoding="utf-8", errors="replace", timeout=timeout
        )
    except subprocess.TimeoutExpired:
        return None


def parse_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return {}
    out = {}
    for line in m.group(1).splitlines():
        if ":" in line and not line.lstrip().startswith("-"):
            k, v = line.split(":", 1)
            out[k.strip()] = v.strip()
    return out


def push_remote(card_path, to_id):
    """분산 vault scp push."""
    vault = REMOTE_VAULTS[to_id]
    cmd = f'scp -o ConnectTimeout=5 "{card_path}" {vault["ssh"]}:{vault["pending"]}/'
    r = run(cmd)
    if r and r.returncode == 0:
        return True, "OK"
    return False, (r.stderr if r else "timeout")


def push_local(card_path, to_id):
    """본 PC vault file copy."""
    target_dir = LOCAL_VAULTS[to_id]
    if not target_dir.is_dir():
        return False, f"target 디렉토리 없음: {target_dir}"
    try:
        shutil.copy2(card_path, target_dir / card_path.name)
        return True, "OK"
    except Exception as e:
        return False, str(e)


def archive_card(card_path):
    """outbox-staging → sent-archived 이동."""
    SENT_ARCHIVED.mkdir(exist_ok=True)
    try:
        shutil.move(str(card_path), str(SENT_ARCHIVED / card_path.name))
        return True
    except Exception as e:
        print(f"  ⚠️ archive 실패: {e}", file=sys.stderr)
        return False


def main():
    if not OUTBOX_STAGING.is_dir():
        print(f"ERROR: outbox-staging 없음 → {OUTBOX_STAGING}", file=sys.stderr)
        sys.exit(1)

    results = {"pushed": [], "skipped": [], "errored": []}

    for card in sorted(OUTBOX_STAGING.glob("*.md")):
        if card.name.startswith("."):
            continue
        try:
            text = card.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError) as e:
            results["errored"].append(f"{card.name} — read 실패: {e}")
            continue

        fm = parse_frontmatter(text)
        if not fm:
            results["skipped"].append(f"{card.name} — frontmatter 없음")
            continue

        to_id = fm.get("to", "").strip()
        if not to_id:
            results["skipped"].append(f"{card.name} — to: 필드 없음")
            continue

        # 라우팅
        if to_id in REMOTE_VAULTS:
            ok, msg = push_remote(card, to_id)
            target = f"{to_id} (remote)"
        elif to_id in LOCAL_VAULTS:
            ok, msg = push_local(card, to_id)
            target = f"{to_id} (local)"
        else:
            results["skipped"].append(f"{card.name} — to: {to_id} 라우팅 미정의")
            continue

        if ok:
            if archive_card(card):
                results["pushed"].append(f"{card.name} → {target}")
            else:
                results["errored"].append(f"{card.name} → {target} (push OK, archive 실패)")
        else:
            results["errored"].append(f"{card.name} → {target} — {msg}")

    # 요약
    if results["pushed"]:
        print(f"📤 multi-agent push broker — {len(results['pushed'])}건 push 완료:")
        for f in results["pushed"]:
            print(f"  - {f}")
    if results["skipped"]:
        print(f"⏭ skip: {len(results['skipped'])}건")
        for f in results["skipped"]:
            print(f"  - {f}")
    if results["errored"]:
        print(f"⚠️ error: {len(results['errored'])}건", file=sys.stderr)
        for f in results["errored"]:
            print(f"  - {f}", file=sys.stderr)

    if not any(results.values()):
        print("push broker: outbox-staging 비어있음")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
