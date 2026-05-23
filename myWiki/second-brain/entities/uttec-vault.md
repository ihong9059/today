---
title: uttec-vault — UTTEC onDevice 제품 비즈니스 hub
created: 2026-05-23
updated: 2026-05-23
status: mission-defined (Day 4 first task = 정체성 박제)
type: entity
category: product / business-hub
owner: uttec-vault-claude (Ubuntu 100.90.158.36)
priority: critical-strategic
related:
  - [[vault-portability]]
  - [[onDevice-ai]]
  - [[ai-fanstick]]
  - [[uttec-stage-package]]
  - [[uttec-ubuntu-pc]]
  - [[영업전략]]
  - [[회사소개]]
links:
  - 작업보고서/계획서_vault-cross-platform-이관_2026-05-23.md
  - 작업보고서/2026-05-23_작업보고서.md
tags: [vault, uttec-vault, product, business, onDevice, hub, ondevice-business]
---

# uttec-vault — UTTEC onDevice 제품 비즈니스 hub

## 한 줄
Ubuntu PC (`ssh ubuntu` = uttecMac 100.90.158.36) 에 신설된 vault. **UTTEC onDevice 제품 (응원봉 등) 개발 + 판매 + 비즈니스 전반** 을 담당. uttec-vault-claude 식별자로 10번째 vault 합류 예정.

## Mission 명시 (2026-05-23 사용자 결정)

> "현재 onDevice_AI vault는 향후 ai의 onDevice의 경향에 대해 응원봉과 같은 제품 개발에 최적의 상태를 도입할 계획으로 기술적인 부분을 검토하고있는 vault입니다. ... mac의 vault의 목표를 onDevice제품 개발 판매및 관련 비지니스의 전반을 맏아서 진행하도록 하는 vault로 만들려고 합니다."

### 정체성 변천
| 단계 | 정의 | 시점 |
|---|---|---|
| L0 | UTTEC product candidate (추상) | 2026-05-23 오전 |
| L1 | OS-agnostic vault framework (toolbox) | 2026-05-23 오후 (Day 1-3 폭주, M1~M4) |
| **L2** | **UTTEC onDevice 제품 비즈니스 hub** | **2026-05-23 야간 (사용자 mission pivot)** |

## 3 vault 역할 분리 (10 Claude 시스템 진화)

| vault | 역할 | 식별자 |
|---|---|---|
| [[onDevice-ai\|onDevice_AI]] | 기술 R&D — 측정·가속·검증·함정 인벤토리 | ondevice-claude |
| **uttec-vault** | onDevice product + business (7 영역) | **uttec-vault-claude** ⭐ NEW |
| today (myWiki) | 회사 운영 hub + 9 vault 종합 | mywiki-claude |

## 새 정보 흐름 (양방향 통신)

이전: onDevice_AI → myWiki 단방향
이제:
- onDevice_AI ⇄ uttec-vault (기술 결과 ↔ 제품 요구사항)
- uttec-vault ⇄ today (매출·계약 ↔ 전사 전략)

## 담당 7 영역 (ERP/CRM lite)

| 영역 | 핵심 객체 |
|---|---|
| Product | SKU (응원봉 v1·v2…) / BOM / 펌웨어 버전 / 인증 (KC·FCC·CE) |
| Sales | 영업 파이프라인 (lead → 견적 → 계약 → 출고) / 견적 template |
| Customer | B2B 고객 / B2C 채널 / 거래 이력 |
| Supply | 공급처 / MOQ / lead time / 재고 watermark |
| Marketing | 브랜딩 자산 / 광고 카피 / demo 영상 / 사례 |
| Operations | CS 이슈 / 출고 / A/S |
| Finance | 매출 / 원가 / 마진 / 회계 (외부 연동 가능성) |

## 현재 상태 (2026-05-23 야간)

| Milestone | 정의 | 상태 |
|:-:|---|:-:|
| M1 | Ubuntu work-start/end 무에러 | ✅ (Day 1, commit `de3bf29`) |
| M2 | Windows 동일 무에러 | ✅ (Day 2, CI fix 2회 후) |
| M3 | CI 3-OS matrix green | ✅ (commit `4fbcf22`) |
| M4 | Docker container 동일 무에러 | ✅ (Day 3, commit `b0641c0`) |
| **A (Day 4)** | **정체성 박제** — mission 명문화 | ⬜ in progress |
| B (Day 5) | 양방향 통신 채널 — inbox/PROTOCOL/check.py | ⬜ |
| C (Day 6-7) | entity template — SKU/customer/supplier/pipeline | ⬜ |
| D (Day 8-10) | 운영 dogfood — 영업 1건 처리 | ⬜ |
| M5 | 1주 무회귀 + 50% 사용 + 양방향 round trip + entity 5+ | ⬜ |
| M6 | DO 배포 (외부 stakeholder access) | ⬜ (M5+0.5~1일) |

## 단계적 진화 plan (A~E)

### 단계 A — 정체성 박제 (Day 4, 2~3h)
uttec-vault 측 산출물 5건:
- HANDOFF.md mission 갱신
- README.md "What is this" + roadmap 갱신
- docs/product-strategy.md 신설
- PLAN.md M5-M9 우선순위 재배치 (M9 immediate)
- DECISIONS.md D'6 mission 추가

### 단계 B — 양방향 통신 채널 (Day 5, 3~5h)
uttec-vault 측:
- inbox/{pending,processed}/ + .gitkeep
- inbox/PROTOCOL.md (today vault PROTOCOL 차용)
- inbox/check.py work-start hook

myWiki 측 (today):
- myWiki/_inbox/PROTOCOL.md 9 → 10 Claude 시스템 갱신

onDevice 측 (broker):
- onDevice_AI/_inbox/pending/2026-05-23-001-uttec-vault-join-bilateral.md (✅ 발송 5/23 야간)

### 단계 C — entity 정의 (Day 6-7, 5~8h)
second-brain/entities/ template:
- SKU.md (응원봉 v1 + BOM + 인증)
- customer.md / supplier.md / pipeline.md / marketing-asset.md

사용자 broker 로 실제 데이터 시드 (응원봉 1차 SKU, 진행 중 deal 있는 만큼).

### 단계 D — 운영 dogfood (Day 8-10, M5 도달)
실제 영업 1건 처리:
- lead → 견적 → 계약 → 출고 시뮬레이션
- onDevice_AI 기술 자료 카드 1건 → product 카피 변환
- today 에 매출 보고 카드 발송

### 단계 E — Cloud 배포 (M5+0.5~1일)
DO droplet 배포. 의미 = UTTEC 임원·영업 파트너 web UI 접근. 인증 (Cloudflare Access 또는 Tailscale).

## High priority audit issues (mywiki-claude 발견, 2026-05-23 야간)
mission pivot 직전 진행한 audit 에서 4건 발견:
1. `.venv` pytest 미설치 → `pip install -e ".[dev]"` 재실행
2. Dockerfile USER 지시문 없음 (root 잔재)
3. root 소유 session 파일 잔존
4. work-end 한 번도 실가동 안됨 (Day 4 미진입 핵심 증거)

상세: `entities/vault-portability.md` 또는 audit 보고서 (별도)

## 다음 행동
1. Mac Claude 측: 단계 A 5건 (사용자 broker 로 prompt 전달)
2. today 측: 본 entity 신설 (이 파일) + ai-direction + log + 5/23 보고서 ✅
3. onDevice 측: broker 카드 발송 ✅

## 변경 이력
- 2026-05-23 야간: entity 신설 — mission L2 정체성 박제, 단계 A~E plan + 양방향 통신 도입 (mywiki-claude)
