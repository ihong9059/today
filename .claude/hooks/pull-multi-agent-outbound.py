#!/usr/bin/env python3
"""Multi-agent outbound broker — 분산 호스트 vault의 outbound 카드를 myWiki/_inbox/pending/으로 sync.

사용자가 수동 broker 안 해도 자동 sync. work-start 시 자동 호출 또는 수동 실행 가능.

지원 vault (2026-05-26 시점):
- uttec-factory-claude (factory-rpi4, Tailscale 100.109.84.79)
- (추후 추가: shield-claude, n8n-claude, uttec-vault-claude, uttec-search-claude, uttec-rag-local-claude)

동작:
1. 각 분산 vault outbound 카드 ssh 로 list
2. myWiki/_inbox/pending/에 없는 카드만 scp pull
3. 성공 시 원격 outbound 카드를 outbound-archived/로 이동 (보존, 재발송 방지)
4. 결과 요약 출력 (work-start hook 통합 시 additionalContext로 주입 가능)

PROTOCOL: C:/todo/today/myWiki/_inbox/PROTOCOL.md
"""
import json
import re
import subprocess
import sys
from pathlib import Path

# myWiki _inbox 경로 (본 PC, Windows)
MYWIKI_PENDING = Path("C:/todo/today/myWiki/_inbox/pending")
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
    # 추후 추가 후보:
    # {"name": "n8n", "ssh": "uttec@100.90.158.36", "outbound": "/home/uttec/project/n8nUttec/_inbox/outbound", ...},
    # {"name": "uttec-vault", "ssh": "uttec@100.90.158.36", "outbound": "/home/uttec/uttec-vault/_inbox/outbound", ...},
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


def pull_card(vault, remote_path):
    """scp pull → myWiki/_inbox/pending/ 으로 복사."""
    filename = Path(remote_path).name
    local = MYWIKI_PENDING / filename
    if local.exists():
        return ("skip", filename, "이미 pending에 존재")
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


def main():
    if not MYWIKI_PENDING.is_dir():
        print(f"ERROR: myWiki pending 경로 없음 → {MYWIKI_PENDING}", file=sys.stderr)
        sys.exit(1)

    results = {"pulled": [], "skipped": [], "errored": []}

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
