---
title: STM32H745 — Zephyr cross-vendor 통합 + 11 함정 single-day cluster (Wave 12)
type: thought
created: 2026-05-25
updated: 2026-05-26 (myWiki 흡수, Wave 12 카드 흡수 시)
tags: [STM32H745, Zephyr, cross-vendor, toolchain-일관성, 14th-board, 11-함정-cluster, single-day, carry-over, USB-CDC, LCD, dual-core, mandate-v2.8]
links: [stm32h745-disco, onDevice-ai, build-gotcha-inventory, gaps, ai-direction, 2026-05-26_STM32H745-LAN-path-Stage4-결정타]
---

# STM32H745 — Zephyr cross-vendor 통합 + 11 함정 single-day cluster

## 한 줄 요약

5/25 단일 day에 onDevice vault가 **STM32H745I-DISCO 14번째 보드 신규 진입** + Zephyr toolchain cross-vendor 통합 (Nordic + STM32) + **11 함정 single-day cluster 박제** + 3 PoC (R36 baseline + LCD + USB CDC ACM). 정통 Zephyr 합의로 11→14 보드 매트릭스 확장 + Cortex-M tier 행 강화.

## 의의 3축

### (1) Zephyr cross-vendor 통합 (정통 합의)

- **본 vault 정통 = Zephyr** (사용자 명시 합의, 5/25)
- Nordic Zephyr 환경에 STM32H7 통합 (`boards/stm32_project/`, `boards/stm32_cdc_project/`)
- toolchain 일관성 + carry-over 자산 (Zephyr USB CDC sample → 다른 STM32 family overlay만 변경)
- ESP-IDF (Espressif) ↔ Zephyr (Nordic + STM32) 2-track 정착

### (2) Cortex-M tier 매트릭스 확장

| 보드 | 코어 | 클럭 | RAM | mandate cell |
|---|---|---|---|---|
| pca10040 (R18 후속) | M4F | 64MHz | 64KB | 12/12 RAM wall (64KB tier 부적합) |
| pca10056 (R18) | M4F | 64MHz | 256KB | MLP 3.23× / CNN 14.02× (R28) |
| **STM32H745I-DISCO** ⭐ | M7 + M4 dual | **480 / 240MHz** | **1MB + 8MB SDRAM** | R36 baseline 12셀 sweep |

→ Cortex-M tier 행 강화 (5계열 매트릭스 ARM-M slot 다양화). 같은 12셀 schema 비교 가능.

### (3) 11 함정 single-day cluster — R&D 신뢰성 자산

5/25 단일 day에 11 함정 모두 박제 — cross-vendor 함정 인벤토리 누적 (Espressif 16 + Nordic 18 + **STM32 11**) = 45건 → **47건** (Wave 13 추가 1건 + NDK 1건 포함).

상세는 [[stm32h745-disco]] § 11 함정 cluster 또는 [[build-gotcha-inventory]] 참조.

**carry-over 효과 정량화 (Wave 13에서 검증)**:
- R36 sweep = 3차 시도
- 본 PoC (Ethernet + Bridge) = **1차 success** (신규 함정 1건 minor만)
- 패턴: "환경 셋업 함정은 보드 첫 작업에 집중, 이후 PoC는 carry-over 1차 success"

## 신규 decision (ai-direction 갱신 후보)

| # | decision | 근거 |
|---|---|---|
| 1 | **본 vault 정통 = Zephyr** (5/25 사용자 명시 합의) | Nordic + STM32 같은 toolchain 일관성 + carry-over 자산 |
| 2 | **R35 keyword 재구성** | KsponSpeech 일반 대화 corpus → K-POP 직접 단어 부재 → 일반 대화 풍부 단어로 재구성 (네/아니/좋아/싫어/다시/가자/잠깐/꺼). 응원봉 UX 매핑은 firmware layer 별도 처리 |
| 3 | **STM-6 함정 → ST 사전 빌드 데모 단독 flash X** | 보드 segmented binary는 bootloader+QSPI font+CM4 partner 모두 필요. 자체 빌드 sample이 정통 |

## 매칭 패턴 발견

| 패턴 | 시너지 |
|---|---|
| **USB CDC streaming = R35 KWS 결과 영업 데모** | R35 한국어 KWS → STM32H745 → CDC streaming → PC visualization → Stage 4 영업 결정타 (한국 기업 STM32 친화 + 한국어 응원봉 PoC) |
| **Cortex-M tier 정량 비교 매트릭스 확장** | pca10056 R18 (M4F 64MHz) → STM32H745 R36 (M7 480MHz) → 같은 12셀 schema |
| **함정 11건 cluster carry-over 자산** | 미래 STM32H7 family (H7Bx, H7Sx, H723) 진입 시 시간 절약 |
| **Zephyr USB CDC sample carry-over** | `boards/stm32_cdc_project/` 패턴 = 다른 STM32 보드(F4/L4/G0) overlay만 변경 → 즉시 재사용 |

## 박제 commit (5/25 단일 day)

- `f31d398` R36 smoke + STM-1~5
- `b735870` R35 keyword 8개 확정
- `e6a3f28` LCD R/G/B PoC + STM-6/7/8
- `a850e5e` R36 12셀 sweep + STM-10
- `ac75300` USB CDC ACM PoC + STM-11

## 관련

- [[stm32h745-disco]] — 신규 entity (본 thought 직접 자산)
- [[onDevice-ai]] § 14 보드 매트릭스 갱신 + STM32H745 R36 baseline 박제
- [[ai-fanstick]] § STM32H745 응원봉 후속 PoC 가능 path (Cortex-M7 + USB CDC streaming + LCD R/G/B 기반)
- [[uttec-stage-package]] § Stage 4 영업 데모 path 정량 근거 (CNN 32 238ms / TF 64 1.5ms / USB CDC streaming 검증)
- [[build-gotcha-inventory]] § STM32 12건 cluster 추가
- [[2026-05-26_STM32H745-LAN-path-Stage4-결정타]] — Wave 13 후속 (Ethernet + Bridge PoC)
