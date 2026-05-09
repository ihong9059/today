---
name: uttec@192.168.0.23 서버
description: Debian 13 ARM64 로컬 서버, SSH 키 등록 완료, Claude Code 설치됨
type: reference
originSessionId: 4e620767-7536-4df9-915b-a3c780b466f7
---
- 호스트: 192.168.0.23 (LAN)
- 계정: uttec / 비밀번호 uttec (SSH 키 등록 후 키 인증 사용)
- OS: Debian GNU/Linux 13 (trixie), aarch64 (ARM64 — Raspberry Pi 계열로 추정)
- SSH 키: lenovo PC의 `~/.ssh/id_ed25519` 등록됨 → `ssh uttec@192.168.0.23`로 비번 없이 접속
- Claude Code: `~/.local/bin/claude` (v2.1.132, 2026-05-07 설치). `~/.bashrc`에 PATH 추가 완료
- 설치 방법: `curl -fsSL https://claude.ai/install.sh | bash` (네이티브, Node 불필요)

주의: SSH 키 등록 시 복사 과정에서 공백이 잘리는 사고가 있었음. authorized_keys에 키 추가할 때는 `sed`로 공백 주입하거나 here-doc 사용 권장.
