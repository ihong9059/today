---
title: macOS와의 이별 — Mac PC를 Ubuntu 개발 전용 노드로
type: thought
created: 2026-05-14
updated: 2026-05-14
tags: [migration, dev-environment, role-separation, decision, infrastructure]
links: [uttec-ubuntu-pc, project_dual_pc, skills, me]
---

# macOS와의 이별 — Mac PC를 Ubuntu 개발 전용 노드로

## 한 줄 결론

> **myWiki 동기화 파트너로 쓰던 Mac을 Ubuntu 22.04로 완전 컨버전 → 일상·동기화에서 분리하여 "개발 전용 노드"로 역할 재정의.** 2대 PC 동시 사용 시대의 끝, 역할 분리 시대의 시작.

## 사고 흐름 — 왜 컨버전했나

### 사실 A: Mac이 git pull 불가능해진 사건

- 2026-04~05 사이 today repo에 history rewrite가 발생
- Mac 측 로컬 history와 충돌 → `git pull` 실패
- 어제(5/13) 작업보고서 #21에 "Mac PC 재 clone (history rewrite로 git pull 불가)" 로 이월

### 사실 B: 동기화 부담의 비대칭

- Windows + Mac 2대를 동시에 쓰면 git 충돌, obsidian-git 자동 백업 충돌, 메모리 동기화 충돌이 누적
- 메모리 `project_dual_pc.md`에 "경로 하드코딩 주의 — 일부 스킬·훅에 `C:\todo\today\...` 절대경로 박혀 있음 → Mac에서 동작 안 함" 박제됨
- 사실상 **Mac은 보조 노드로 점차 위축**되어 있었음

### 사실 C: Linux 개발 환경의 가치 부상

- onDevice_AI(ESP32-S3), revita(libopencm3 + USB CDC), AISG(MAX11947 펌웨어) 등 **Linux 친화 임베디드 개발**이 본업의 큰 축으로 자리잡음
- Windows에서 Linux 빌드 환경(WSL, Docker)을 띄우는 것보다 **순수 Linux 머신** 한 대를 두는 게 훨씬 깔끔
- 메모리 `reference_uttec_192_168_0_23.md` (Debian ARM64) 와 같은 패턴을 Mac에 적용 → 같은 SSH·Claude Code 워크플로 확장

### 판단 C: 동기화 파트너 → 개발 전용 노드

세 사실의 곱:
```
[A: git pull 불가 → 재 clone 필요] × [B: 동기화 부담] × [C: Linux 가치 부상]
= macOS를 굳이 살릴 이유 없음 + Ubuntu로 가는 게 더 큰 이득
```

## 진행 과정 (2026-05-14)

| 단계 | 내용 | 결과 |
|---|---|---|
| 1 | USB Ubuntu 22.04 installer 부팅 (Option 키) | EFI Boot → GRUB |
| 2 | Live USB 모드 진입 | 한 번 헛질문 — Install Ubuntu 아이콘 더블클릭 안 함 |
| 3 | "Erase disk and install Ubuntu" 진행 | 디스크 완전 포맷 → macOS 영구 삭제 |
| 4 | 계정 생성: `uttec` / `uttec` | 비번 빈 상태 사고 방지 |
| 5 | 재부팅 후 SSH 서버 설치 (`openssh-server`) | port 22 LISTEN |
| 6 | Windows id_ed25519 공개키 → authorized_keys 등록 | `ssh uttec@192.168.1.4` 키 인증 OK |
| 7 | Node.js 20 (NodeSource) + Claude Code v2.1.141 설치 | `/usr/bin/claude` 확인 |
| 8 | SSH config에 `ubuntu` 별칭 + Tailscale IP 등록 | `ssh ubuntu` 한 단어 접속 OK |

## 의미 — 인프라 진화 패턴

### "동일 동기화" → "역할 분리" 로 이행

| 시점 | 패턴 |
|---|---|
| 2026 초반 | Windows + Mac 모두 myWiki + 작업 환경 (대칭) |
| 2026-05-09 | Claude memory 통합 동기화 (대칭 강화) |
| **2026-05-14** | **Ubuntu = 개발 전용 / Windows = myWiki + 일상 (역할 분리)** |

대칭 동기화는 단순했지만 충돌·중복 비용이 컸다. **역할 분리는 더 복잡하지만 각 노드의 책임이 명확해진다.**

### 다른 노드와의 위상

```
Windows lenovo (DESKTOP-MD6RE2A)
    ├── myWiki 마스터
    ├── 작업보고서·세션
    └── 일상 작업·git source of truth

uttec-MacBookPro (100.90.158.36, Ubuntu)  ← 신규 역할
    ├── 개발 전용
    ├── Linux 빌드·실험
    └── 백그라운드 작업 노드

uttec@192.168.0.23 (Debian ARM64, Pi 추정)
    ├── 항시 가동 서버
    └── Claude Code 원격 실행

uttec@rasp_b3 / 기타 Tailscale 노드들
    └── 임베디드·테스트 노드
```

→ **개발 / 서버 / 임베디드** 3축 분리가 만들어짐.

## 감성 — 헤어짐의 의미

> "macOs와의 이별이네요"

오랫동안 손에 익은 OS와의 작별. macOS는 디자인·UX·터미널 모두 훌륭했지만, **본인의 작업 패턴이 Linux 임베디드 쪽으로 깊이 들어가면서 macOS의 우위가 사라졌다.**

- 더 이상 디자인 작업이 메인이 아니다 (그것은 Behance·웹·Remotion으로 이동)
- 더 이상 macOS 전용 도구에 의존하지 않는다 (Claude Code는 Linux/Windows에서 동일)
- 무엇보다, **2대 PC 동기화 자체가 부담**이었다

이별이지만, 그 PC는 사라지지 않았다. **같은 하드웨어가 새 역할로 환생했을 뿐.**

## 향후 검토할 패턴 (앞으로 적용)

1. **Linux 노드 표준화**: uttec@192.168.0.23 + uttec-MacBookPro + 향후 추가될 노드들이 모두 같은 셋업 방식을 따르도록 표준 dotfiles·설치 스크립트 검토
2. **개발 전용 PC의 가치 측정**: 3개월 후 Ubuntu PC가 실제로 어떤 작업에 쓰이는지 사용 패턴 분석 → 비싸지 않은 추가 노드 투자 판단
3. **myWiki entity로의 흡수**: 모든 노드를 entities/에 등록하는 정책 (이 페이지가 첫 사례 — `uttec-ubuntu-pc`)

## 관련 작업·항목

- 어제 작업보고서 #21 "Mac PC 재 clone" 항목 → **본 컨버전으로 완전 해소**
- 메모리 `project_dual_pc.md` → 갱신 (Ubuntu는 동기화 대상에서 제외)
- 신규 메모리 `reference_uttec_ubuntu_mac.md` → SSH 별칭 셋업 박제
- 신규 엔티티 [[uttec-ubuntu-pc]]

## 한 마디

> 인프라는 정체성을 따라간다. 작업의 본질이 변하면 도구도 따라 변해야 한다. macOS는 도구로서 훌륭했지만, 지금의 본질은 Linux 임베디드·AI 개발이다. — 2026-05-14
