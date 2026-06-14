#!/usr/bin/env python3
"""Multi-agent outbound broker — 분산 호스트 vault + 본 PC vault outbound 카드를 myWiki/_inbox/pending/으로 sync.

사용자가 수동 broker 안 해도 자동 sync. work-start 시 자동 호출 또는 수동 실행 가능.

지원 vault (2026-05-27 시점):
- 분산 vault (ssh+scp): uttec-factory-claude (100.109.84.79), shield-claude (100.110.51.14)
- 본 PC vault (file copy): ondevice-claude (_outbox/ 컨벤션)
- (추후 추가: n8n-claude, uttec-vault-claude, uttec-search-claude, uttec-rag-local-claude)

동작:
1. 각 분산 vault outbound 카드 ssh 로 list / 본 PC vault outbox는 directly glob
2. frontmatter `to: mywiki-claude` 카드만 broker 대상 (다른 수신자 skip)
3. myWiki/_inbox/{pending,processed}/에 없는 카드만 pull (중복 방지)
4. 성공 시 원격 outbound → outbound-archived/ 이동 (보존, 재발송 방지)
5. 결과 요약 출력 (work-start hook 통합 시 additionalContext로 주입 가능)

PROTOCOL: C:/todo/today/myWiki/_inbox/PROTOCOL.md
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

# myWiki _inbox 경로 (본 PC, Windows)
MYWIKI_PENDING = Path("C:/todo/today/myWiki/_inbox/pending")
MYWIKI_PROCESSED = Path("C:/todo/today/myWiki/_inbox/processed")
SELF_ID = "mywiki-claude"

# 분산 vault 리스트 — Tailscale alias + 원격 outbound 경로
REMOTE_VAULTS = [
    {
        "name": "uttec-factory",
        "ssh": "uttec@100.109.84.79",
        "outbound": "/home/uttec/project/uttec-factory/_inbox/outbound",
        "archived": "/home/uttec/project/uttec-factory/_inbox/outbound-archived",
    },
    {
        "name": "shield",
        "ssh": "uttec@100.110.51.14",
        "outbound": "/home/uttec/project/shield/_inbox/outbound",
        "archived": "/home/uttec/project/shield/_inbox/outbound-archived",
    },
    {
        # n8nUttec 컨벤션: outbound 디렉토리 = pending_outbound/, 발송 완료 = sent/
        "name": "n8n",
        "ssh": "uttec@100.90.158.36",
        "outbound": "/home/uttec/project/n8nUttec/_inbox/pending_outbound",
        "archived": "/home/uttec/project/n8nUttec/_inbox/sent",
    },
    {
        # uttec-plc (18th, 2026-06-13 신설): outbox-staging → sent-archived (myWiki 동일 컨벤션)
        "name": "uttec-plc",
        "ssh": "uttec@100.90.158.36",
        "outbound": "/home/uttec/uttec-plc/_inbox/outbox-staging",
        "archived": "/home/uttec/uttec-plc/_inbox/outbox-staging/sent-archived",
    },
    # 추후 추가 후보:
    # {"name": "uttec-vault", "ssh": "uttec@100.90.158.36", "outbound": "/home/uttec/uttec-vault/outbox", ...},
]

# 본 PC vault 리스트 — file path (ssh 불요). 각 vault의 outbox 컨벤션 명시.
LOCAL_VAULTS = [
    {
        "name": "ondevice",
        "outbound": Path("C:/todo/onDevice_AI/_outbox"),
        "archived": Path("C:/todo/onDevice_AI/_outbox-archived"),
    },
    {
        "name": "weldrobot",
        "outbound": Path("C:/todo/weldRobot/_inbox/outbox-staging"),
        "archived": Path("C:/todo/weldRobot/_inbox/sent-archived"),
    },
    {
        "name": "ponet",
        "outbound": Path("C:/todo/ponet/_inbox/outbox-staging"),
        "archived": Path("C:/todo/ponet/_inbox/sent-archived"),
    },
    {
        "name": "factory",
        "outbound": Path("C:/todo/factory/_inbox/outbox-staging"),
        "archived": Path("C:/todo/factory/_inbox/sent-archived"),
    },
    {
        "name": "tabm9",
        "outbound": Path("C:/todo/tabM9/_inbox/outbox-staging"),
        "archived": Path("C:/todo/tabM9/_inbox/sent-archived"),
    },
    {
        # lora (19th, 2026-06-13 신설): LoRa 기술 전문 hub
        "name": "lora",
        "outbound": Path("C:/todo/lora/_inbox/outbox-staging"),
        "archived": Path("C:/todo/lora/_inbox/outbox-staging/sent-archived"),
    },
    # 추후 추가 후보:
    # {"name": "wishket", "outbound": Path("C:/todo/wishketProject/_outbox"), "archived": Path("C:/todo/wishketProject/_outbox-archived")},
    # {"name": "lemonlabs", "outbound": Path("C:/todo/lemonLabs/_outbox"), "archived": Path("C:/todo/lemonLabs/_outbox-archived")},
]


def run(cmd, timeout=10):
    """subprocess wrapper — UTF-8 보장, 실패 시 None 반환."""
    try:
        r = subprocess.run(
            cmd, shell=True, capture_output=True, text=True,
            encoding="utf-8", errors="replace", timeout=timeout
        )
        return r
    except subprocess.TimeoutExpired:
        return None


def list_remote_outbound(vault):
    """원격 outbound/*.md 파일명 리스트 반환 (.gitkeep 제외)."""
    cmd = f'ssh -o ConnectTimeout=5 -o BatchMode=yes {vault["ssh"]} "ls {vault["outbound"]}/*.md 2>/dev/null | grep -v gitkeep"'
    r = run(cmd)
    if not r or r.returncode != 0:
        return []
    files = [line.strip() for line in r.stdout.splitlines() if line.strip()]
    return [f for f in files if f.endswith(".md")]


def parse_frontmatter(text):
    """단순 frontmatter 파서 — yaml 의존 회피."""
    m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return {}
    out = {}
    for line in m.group(1).splitlines():
        if ":" in line and not line.lstrip().startswith("-"):
            k, v = line.split(":", 1)
            out[k.strip()] = v.strip()
    return out


def check_card_for_mywiki(vault, remote_path):
    """원격 카드 frontmatter 읽기 → to: mywiki-claude 카드만 broker 대상."""
    cmd = f'ssh {vault["ssh"]} "head -40 {remote_path}"'
    r = run(cmd)
    if not r or r.returncode != 0:
        return None
    fm = parse_frontmatter(r.stdout)
    if not fm:
        return None
    to = fm.get("to", "").strip()
    status = fm.get("status", "pending").strip()
    if to != SELF_ID:
        return None  # 다른 수신자
    if status not in {"pending", "in_progress", ""}:
        return None  # 이미 처리됨
    return fm


def already_in_mywiki(filename):
    """myWiki/_inbox/{pending,processed}/에 같은 이름 카드 있으면 True (중복 방지)."""
    return (MYWIKI_PENDING / filename).exists() or (MYWIKI_PROCESSED / filename).exists()


def pull_card(vault, remote_path):
    """scp pull → myWiki/_inbox/pending/ 으로 복사."""
    filename = Path(remote_path).name
    if already_in_mywiki(filename):
        return ("skip", filename, "myWiki에 이미 존재 (pending/processed)")
    local = MYWIKI_PENDING / filename
    cmd = f'scp {vault["ssh"]}:{remote_path} "{local}"'
    r = run(cmd, timeout=15)
    if not r or r.returncode != 0:
        return ("error", filename, r.stderr if r else "timeout")
    return ("pulled", filename, "OK")


def archive_remote(vault, remote_path):
    """원격에서 outbound → outbound-archived/로 이동 (재발송 방지)."""
    cmd = f'ssh {vault["ssh"]} "mkdir -p {vault["archived"]} && mv {remote_path} {vault["archived"]}/"'
    r = run(cmd)
    return r and r.returncode == 0


def check_local_card_for_mywiki(card_path):
    """본 PC vault 카드 frontmatter 읽기 → to: mywiki-claude 카드만 broker 대상."""
    try:
        text = card_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return None
    fm = parse_frontmatter(text)
    if not fm:
        return None
    to = fm.get("to", "").strip()
    status = fm.get("status", "pending").strip()
    if to != SELF_ID:
        return None
    if status not in {"pending", "in_progress", ""}:
        return None
    return fm


def pull_local_card(card_path):
    """본 PC vault outbox → myWiki/_inbox/pending/ file copy."""
    filename = card_path.name
    if already_in_mywiki(filename):
        return ("skip", filename, "myWiki에 이미 존재 (pending/processed)")
    target = MYWIKI_PENDING / filename
    try:
        shutil.copy2(card_path, target)
        return ("pulled", filename, "OK")
    except Exception as e:
        return ("error", filename, str(e))


def archive_local(vault, card_path):
    """본 PC vault outbox → _outbox-archived/ 이동 (재발송 방지)."""
    archived_dir = vault["archived"]
    archived_dir.mkdir(exist_ok=True)
    try:
        shutil.move(str(card_path), str(archived_dir / card_path.name))
        return True
    except Exception as e:
        print(f"  ⚠️ local archive 실패: {e}", file=sys.stderr)
        return False


def main():
    if not MYWIKI_PENDING.is_dir():
        print(f"ERROR: myWiki pending 경로 없음 → {MYWIKI_PENDING}", file=sys.stderr)
        sys.exit(1)

    results = {"pulled": [], "skipped": [], "errored": []}

    # 분산 vault (ssh+scp)
    for vault in REMOTE_VAULTS:
        files = list_remote_outbound(vault)
        if not files:
            continue
        for remote_path in files:
            fm = check_card_for_mywiki(vault, remote_path)
            if not fm:
                continue
            status, filename, msg = pull_card(vault, remote_path)
            if status == "pulled":
                if archive_remote(vault, remote_path):
                    results["pulled"].append(f"{vault['name']}/{filename}")
                else:
                    results["errored"].append(f"{vault['name']}/{filename} (archive 실패)")
            elif status == "skip":
                # skip이지만 원격 archive는 진행 (재발송 방지)
                if archive_remote(vault, remote_path):
                    results["skipped"].append(f"{vault['name']}/{filename} (archived)")
                else:
                    results["skipped"].append(f"{vault['name']}/{filename}")
            else:
                results["errored"].append(f"{vault['name']}/{filename} — {msg}")

    # 본 PC vault (file copy, ssh 불요)
    for vault in LOCAL_VAULTS:
        outbox = vault["outbound"]
        if not outbox.is_dir():
            continue
        for card_path in sorted(outbox.glob("*.md")):
            if card_path.name.startswith("."):
                continue
            fm = check_local_card_for_mywiki(card_path)
            if not fm:
                continue
            status, filename, msg = pull_local_card(card_path)
            if status == "pulled":
                if archive_local(vault, card_path):
                    results["pulled"].append(f"{vault['name']}/{filename}")
                else:
                    results["errored"].append(f"{vault['name']}/{filename} (local archive 실패)")
            elif status == "skip":
                if archive_local(vault, card_path):
                    results["skipped"].append(f"{vault['name']}/{filename} (archived)")
                else:
                    results["skipped"].append(f"{vault['name']}/{filename}")
            else:
                results["errored"].append(f"{vault['name']}/{filename} — {msg}")

    # 요약 출력
    if results["pulled"]:
        print(f"📥 multi-agent broker — {len(results['pulled'])}건 pull 완료:")
        for f in results["pulled"]:
            print(f"  - {f}")
    if results["skipped"]:
        print(f"⏭ 이미 pending에 존재 (skip): {len(results['skipped'])}건")
    if results["errored"]:
        print(f"⚠️ error: {len(results['errored'])}건")
        for f in results["errored"]:
            print(f"  - {f}", file=sys.stderr)

    if not any(results.values()):
        print("broker: 신규 카드 없음")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
