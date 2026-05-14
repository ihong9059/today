---
title: uttec-MacBookPro (Ubuntu 개발 전용 PC)
type: entity
created: 2026-05-14
updated: 2026-05-14
tags: [hardware, dev-environment, ssh, tailscale, linux, ubuntu, ex-mac]
links: [skills, project_dual_pc, reference_uttec_ubuntu_mac, 2026-05-14_mac에서-ubuntu로]
---

# uttec-MacBookPro — Ubuntu 22.04 개발 전용 PC

## 한 줄 정의

> 2026-05-14, **Intel MacBook Pro에서 macOS를 완전히 지우고 Ubuntu 22.04 LTS를 설치**하여 개발 전용 PC로 재편한 머신. 그동안 myWiki를 Windows PC와 공유하던 동기화 파트너 → **이제는 개발 노드로 역할 분리**.

## 하드웨어·환경

| 항목 | 값 |
|---|---|
| 호스트명 | `uttec-MacBookPro` |
| OS | Ubuntu 22.04.5 LTS |
| 아키텍처 | x86_64 (Intel Mac) |
| 커널 | 6.8.0-111-generic |
| CPU | 8 코어 |
| RAM | 16 GB |
| 디스크 | 457 GB NVMe (3% 사용, 422 GB 여유) |
| 사용자 | `uttec` (비번 `uttec`, sudo 가능) |

## 네트워크 (IP 4개)

| 인터페이스 | IP | 용도 |
|---|---|---|
| LAN 유선 | `192.168.1.4` | 같은 네트워크 빠른 접속 |
| LAN Wi-Fi | `192.168.1.14` | 보조 |
| **Tailscale** | **`100.90.158.36`** | **외부·원격 접속 (기본)** |
| Tailscale IPv6 | `fd7a:115c:a1e0::5e38:9e24` | IPv6 |

## SSH 접속

Windows PC `~/.ssh/config`에 별칭 등록 → **`ssh ubuntu`** 한 단어로 접속:

```
Host ubuntu
    HostName 100.90.158.36
    User uttec
```

- 키 인증: `id_ed25519` 등록 완료 (비밀번호 입력 불필요)
- 원격 명령: `ssh ubuntu "명령"`
- 파일 전송: `scp/rsync ubuntu:경로`

## 설치된 도구

| 도구 | 버전 | 설치 경로 |
|---|---|---|
| Node.js | 20.20.2 (NodeSource 저장소) | `/usr/bin/node` |
| npm | 10.8.2 | `/usr/bin/npm` |
| **Claude Code** | **2.1.141** | `/usr/bin/claude` |
| openssh-server | apt 기본 | systemd `ssh.service` |
| curl, git, ca-certificates | apt | 표준 |

## 역할 (이전 vs 현재)

| 시점 | 역할 | 비고 |
|---|---|---|
| ~2026-05-13 | macOS + myWiki 동기화 + 일상 작업 | git history rewrite 이후 pull 불가로 사용 중지 |
| 2026-05-14~ | **Ubuntu 개발 전용 PC** | 개발·빌드·실험 노드 |

## 사용 시나리오 (예상)

1. **빌드 머신**: Flutter / Node / Python 컴파일 작업을 Windows에서 SSH로 위임
2. **백그라운드 실행**: 24/7 켜두고 Claude Code 장기 작업
3. **이중 OS 검증**: 코드가 Linux에서 동작하는지 확인 (그동안 Windows만)
4. **모델 추론**: Intel CPU 8코어로 작은 LLM 추론 실험 (onDevice_AI 연계 가능)

## 관련 메모리

- `reference_uttec_ubuntu_mac.md` — SSH 별칭 `ubuntu` 셋업 상세
- `project_dual_pc.md` — 2대 PC 동기화 정책 (2026-05-14 갱신: Ubuntu는 동기화 파트너에서 제외)

## 관련 페이지

- [[reference_uttec_192_168_0_23]] — 다른 SSH 서버 (Debian ARM64, 별개)
- [[2026-05-14_mac에서-ubuntu로]] — 컨버전 회고 (사고 흐름·의미)
- [[skills]] — Linux 개발 환경 운영 능력 추가

## 다음 단계 (후속 작업 후보)

- [ ] GitHub SSH 키 생성 + 등록 (clone/push 용)
- [ ] today repo clone 검토 (또는 의도적 미clone 유지 — 개발 전용이라)
- [ ] dotfiles 셋업 (`.bashrc`, `.zshrc`, `.gitconfig`)
- [ ] Docker / build-essential 등 개발 패키지 추가 설치
- [ ] 자동 백업·snapshot 정책 (개발 결과물 보호)
