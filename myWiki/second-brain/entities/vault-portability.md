---
title: vault Cross-Platform Portability (engineering track — uttec-vault 의 기술 sub-track)
created: 2026-05-23
updated: 2026-05-23 (야간 mission pivot — 본 entity = engineering track, mission 은 [[uttec-vault]] 참조)
status: M4 ✅ (Day 1-3 1시간 완료) / Day 4 미진입
type: entity
category: infra / product-candidate
owner: mywiki-claude
priority: long-term-strategic
related:
  - [[uttec-ubuntu-pc]]
  - [[search]]
  - [[서버인프라]]
  - [[uttec-homepage]]
links:
  - 작업보고서/계획서_vault-cross-platform-이관_2026-05-23.md
tags: [vault, portability, cross-platform, cloud, uttec-product, infra]
---

# vault Cross-Platform Portability

> ⚠️ **2026-05-23 야간 mission pivot**: 본 entity 는 이제 uttec-vault 의 **engineering / portability sub-track** 만 다룬다. 비즈니스 mission (onDevice 제품 + 판매 + 비즈니스 전반) 은 → [[uttec-vault]] 참조.

## 한 줄 (engineering track)
uttec-vault (Ubuntu primary) 의 OS-agnostic + cloud-ready 기술 골격 트랙. M1~M4 (work-start/end · CI · Docker) 완료, M5~M6 dogfooding + cloud 진행 중.

## 재정의 (2026-05-23 사용자 명시)
> "이 vault도 어떻게 보면, 다른 용도로 사용하기 전에 uttec이라는 회사를 기반으로 개발하고 있다고 생각해야합니다. ... 궁극적으로는 cloud에 탑재할 예정입니다."

- vault ≠ 개인 second-brain
- vault = **UTTEC 회사 product candidate + 회사 운영 hub**
- "다른 시스템 동작 확인 → cloud 탑재" 가 가야 product 수준

## 현재 상태 (Phase 0 baseline)

### Windows 종속 정량 (2026-05-23 자동 audit)
| 카테고리 | 정량 | 영향도 |
|---|:-:|:-:|
| 경로 hardcoding (`C:\todo\today`) | 58건 / 12 SKILL | 🔴 매우 높음 |
| PowerShell 종속 | 10건 / 5 SKILL + 1 `.ps1` 파일 | 🟠 높음 |
| NTFS Junction | 7+ 위치 | 🟡 중간 |
| Claude project slug | 1건 (memory 경로) | 🟡 중간 |
| External alias (ssh) | ~5건 | 🟢 낮음 |
| Terminal profile (registry) | 1건 | 🟢 낮음 |

### 기 cross-platform 우호 자산
- 6 hook 중 5 Python (notion-sync, notion-cleanup, setup-memory-sync, check-raw-junctions, create-daily-report)
- search vault (FastAPI + Vite) — OS-agnostic 표준
- 9 vault inbox 카드 frontmatter (YAML)
- git / Notion / Tailscale external dependencies

## 목표 단계

| Level | 정의 | 검증 |
|:-:|---|---|
| **L1** | Mac 개발 PC에서 핵심 워크플로우 가동 | `/work-start` + `/work-end` 무에러 |
| **L2** | OS-agnostic 표준 layer 확립 | CI matrix (Windows + macOS + Linux) green |
| **L3** | Cloud 탑재 가능 architecture | Docker 단일 배포 + persistent volume + web UI |

## Phase 진행

| Phase | 작업량 | 진행 |
|:-:|:-:|:-:|
| 0 인벤토리·진단 | 0.5일 | ⬜ |
| 1 경로 추상화 layer | 1~2일 | ⬜ |
| 2 Shell layer 통합 | 2~3일 | ⬜ |
| 3 OS 분기 hook 표준화 | 1일 | ⬜ |
| 4 Mac dry-run | 0.5일 | ⬜ |
| 5 Mac write + 정책 합의 | 1~2일 | ⬜ |
| 6 자동 회귀 테스트 (CI matrix) | 1~2일 | ⬜ |
| 7 Cloud 탑재 | 3~5일 | ⬜ |
| 누적 | **10~16일** | — |

## 핵심 의존 관계

### vault scope 격리 정책에 미치는 영향
- 현재: PC 경계 ≈ vault 경계 (Windows 단일 PC = 5-vault hub)
- L2 이후: PC 경계 / vault 경계 분리 필요 — Phase 5 정책 합의 시 명문화

### 9 vault PROTOCOL 영향
- 현재: 9 vault (8/9 동기화 완료, shield staging)
- L2: 10 vault (Mac replica 추가) — 단방향 sync 로 비대칭 최소화
- L3: 11+ vault (cloud instance) — 메시지큐 도입 검토

### 다른 vault 와의 관계
- [[search]] — Phase 7 web UI 의 패턴 재사용 후보 (FastAPI+Vite+Claude API)
- [[uttec-homepage]] — DigitalOcean 7777 보류 상태이지만 Phase 7 cloud target 후보
- [[uttec-ubuntu-pc]] — Phase 4 dry-run 의 1차 target (Linux 동등)
- [[uttec-stage-package]] — vault 자체를 Stage 4 영업 자산화 가능성 (L3 도달 후 검토)

## 결정 필요 사항 (사용자 결단 대기)

| # | 결정 | 권장 |
|:-:|---|---|
| D1 | 작업 슬롯 우선순위 | (b) #18·#21·#24 후순 |
| D2 | Mac 실체 | (a) ssh ubuntu (Linux) 활용 |
| D3 | Cloud target | (a) DigitalOcean |
| D4 | 정책 모델 (Phase 5) | (a) Windows single-source 유지 |
| D5 | 회사 자산화 범위 | (a) UTTEC 사내 전용 → 추후 (c) 상용 검토 |
| D6 | 위임 모델 | (b) search-claude 일부 위임 (web UI) |

## 다음 행동
1. 사용자가 `ssh ubuntu` (= `ssh uttecMac` 100.90.158.36) 접속 → `claude` 실행 → uttec-vault-claude 가 HANDOFF.md 읽고 자동 진행
2. uttec-vault-claude 가 D'1~D'5 사용자 확정 받기
3. Day 1 scaffold 시작 (M1 도달 = Ubuntu `/work-start` + `/work-end` 무에러)

## 진화 (2026-05-23 야간) — A+C+U 로 피벗 + Ubuntu handoff 완료 ⭐

### Pivot 1: 이관 → 신규 연습용 vault (A+C)
사용자 결정: 기존 today vault 이관 X. 격리된 신규 vault 구축 (search vault 선례 차용). 리스크 0 + 깨끗한 슬레이트 + UTTEC product reference template 가치.

### Pivot 2: Windows primary → Ubuntu primary (+U)
사용자 통찰: Ubuntu PC (구 Mac, 100.90.158.36, 24/7) = 사실상 private cloud. DO 마이그레이션 갭 ~ 0. Day 1 부터 Linux/SSH dogfooding 강제 = OS-agnostic 표준 자연 박힘.

### Handoff 완료 (2026-05-23)
- Ubuntu `~/uttec-vault/` 신규 디렉토리 (415G 여유 / Python 3.10.12 / Claude 2.1.141 검증)
- 4 핸드오프 파일 배치: README.md / HANDOFF.md (~10KB) / PLAN.md / DECISIONS.md
- mywiki-claude (Windows) → uttec-vault-claude (Ubuntu) 컨텍스트 인계 완료
- 사용자 SSH 접속 후 Day 1 부터 Mac Claude 가 자동 진행

### 다음 milestone
- M1 (Ubuntu work-start/end 무에러) — Day 1 종료
- M5 (1주 dogfooding 무회귀) — Day 10
- M6 (DO cloud 배포) — M5 + 0.5~1일

## 변경 이력
- 2026-05-23 오전: entity 신설, planning L0 등록 (mywiki-claude)
- 2026-05-23 오후: A+C+U 피벗 + Ubuntu handoff 완료 (mywiki-claude)
