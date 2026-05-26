---
name: uttec@192.168.1.20 서버
description: Debian 13 ARM64 (Raspberry Pi 계열) LAN 서버, SSH 키 등록·Claude Code v2.1.150 설치 완료 (2026-05-26)
type: reference
originSessionId: c7cf365f-2192-44f5-8119-601af6608c97
---
- 호스트: 192.168.1.20 (LAN, ping 1~2ms)
- 계정: uttec / 비밀번호 uttec (SSH 키 등록 후 키 인증으로 무인 접속)
- 호스트명: `uttec` (192.168.0.23과 동명, 구분은 IP로만 가능 — 작업 시 IP 명시 권장)
- OS: Debian GNU/Linux 13 (trixie), aarch64 (kernel 6.12.75+rpt-rpi-v8 → 라즈베리파이 OS)
- SSH 키: lenovo PC `~/.ssh/id_ed25519.pub` 등록됨 → `ssh uttec@192.168.1.20` 무인 접속
- Claude Code: `~/.local/bin/claude` (v2.1.150, 2026-05-26 설치). `~/.bashrc`에 PATH 추가 완료
- 설치 방법: `curl -fsSL https://claude.ai/install.sh | bash` (네이티브, Node 불필요 — 192.168.0.23과 동일 패턴)
- sudo: password 필요 (NOPASSWD 미설정) — apt install 등 무인 자동화 시 stdin password 전달 필요
- node/npm: 미설치 (네이티브 Claude Code는 의존성 0이므로 OK)
- 키 등록 방법 (Windows PowerShell): `Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | ssh uttec@HOST "umask 077; mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"` — `ssh-copy-id`가 cmd/PowerShell PATH에 없을 때 대안
