---
name: uttec@ubuntu (Mac→Ubuntu 컨버전 개발 PC)
description: SSH 별칭 ubuntu로 접속하는 Ubuntu 22.04 개발 전용 PC. Tailscale 100.90.158.36, Claude Code v2.1.141 설치 완료
type: reference
---

Intel MacBook Pro의 macOS를 지우고 Ubuntu 22.04.5 LTS 설치 (2026-05-14). 개발 전용 노드.

## 접속

- **단축**: `ssh ubuntu` (Windows `~/.ssh/config`에 Host 별칭 등록)
- **Tailscale IP**: 100.90.158.36 (기본·외부 접속)
- **LAN IP**: 192.168.1.4 (유선), 192.168.1.14 (Wi-Fi)
- **계정**: `uttec` / `uttec` (sudo 가능)
- **SSH 키**: Windows `id_ed25519` 등록 완료 → 비번 입력 없이 키 인증

## 환경

- Ubuntu 22.04.5 LTS / 커널 6.8.0-111-generic / x86_64
- 8 코어 / 16 GB RAM / 457 GB NVMe (422 GB 여유)
- 호스트명: `uttec-MacBookPro`

## 설치된 도구

| 도구 | 버전 | 위치 |
|---|---|---|
| Node.js | 20.20.2 (NodeSource) | `/usr/bin/node` |
| npm | 10.8.2 | `/usr/bin/npm` |
| Claude Code | 2.1.141 | `/usr/bin/claude` |
| curl, git, openssh-server | apt 표준 | - |

## SSH config (Windows ~/.ssh/config)

```
# Ubuntu PC (Tailscale - Mac to Ubuntu converted, 2026-05-14)
Host ubuntu
    HostName 100.90.158.36
    User uttec
```

## 기존 [[reference_uttec_192_168_0_23]] 와 차이

| 항목 | uttec@192.168.0.23 | **uttec@ubuntu (본 항목)** |
|---|---|---|
| OS | Debian 13 ARM64 | Ubuntu 22.04 x86_64 |
| 하드웨어 | Raspberry Pi 계열 추정 | Intel MacBook Pro 재활용 |
| Claude 설치 | 네이티브 (claude.ai/install.sh) | npm (@anthropic-ai/claude-code) |
| 역할 | 항시 가동 서버 | 개발 전용 노드 |

## 주의

- 비번 입력이 필요한 sudo 명령은 `echo 'uttec' \| sudo -S 명령` 또는 사전 `sudo -v`로 캐시 활성화
- npm 글로벌 설치는 `sudo npm install -g` 필요 (또는 npm prefix 변경)
- myWiki/today repo는 **이 PC에 clone 금지** (단일 source 정책, `project_dual_pc.md` 참조)
