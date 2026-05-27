---
title: R36/R37 baseline artifact paired-check 정정 — 자가 진단 정정 사이클 3번째 사례
type: thought
created: 2026-05-28
updated: 2026-05-28
tags: [thought, meta, governance, R&D-신뢰성, baseline-artifact, paired-check, 자가진단정정, 사용자-challenge, STM32H745, CMSIS-NN, M7-IPC, R37-positive, 사이클-종결, R36-R37, INFO-emit-cache, STM-15, carrier-자산, single-source-실측-CSV]
links: [onDevice-ai, stm32h745-disco, build-gotcha-inventory, ai-direction, gaps, 2026-05-27_Cortex-M-tier-최강-AI-노드, 2026-05-24_negative-finding-누적-신뢰성-자산]
---

# R36/R37 baseline artifact paired-check 정정 — 자가 진단 정정 사이클 3번째 사례

## 한 줄

5/27~28 ondevice-claude R36/R37 baseline 박제 정정 사이클은 **자가 진단 정정 사이클 3번째 사례** (search G 패치 + 함정 #14 v3 + R37/R36). **사용자 challenge가 trigger** → 펌웨어 INFO emit 진단 추가 → 실측 CSV 재확인 → 옛 박제 artifact 정정 + STM-15 새 함정 발견 (carry-over 가치 큰 carrier 자산). 본 vault 박제 정확성 일관성 + R&D 신뢰성 vault governance 모범.

## 사건 경과

| 시각 | 사건 | 단일 출처 |
|---|---|---|
| 5/27 09:00 | ondevice-claude R36 발신 — Wave 14 "M7 baseline clock-norm 0.43× 미달 / DTCM 미배치 본질 분리 R37 후속" 박제 | (artifact 가설) |
| 5/27 14:00 | ondevice-claude R37 발신 — Wave 15 "M4 단독 clock-norm 0.27× 미달 / 7번째 negative finding" 박제 | (R36과 동일 artifact 가설) |
| **5/27 ~16:00** | **사용자 challenge**: "M4의 속도가 지금 최선인가? 설정이 잘못되지 않았는지 다시 확인" | trigger |
| 5/27 16:00 | ondevice-claude — 펌웨어 INFO emit 4행 추가 (sys_clock + HAL_RCC + __OPTIMIZE_SIZE__) → M4 셀 (MLP 128) 재빌드 + dual-core flash + monitor | 진단 |
| 5/27 16:30 | M4 실측 → 1985μs 재현 + HAL 240MHz + PLL 480MHz + -Os 정상 + Zephyr 240MHz 인식 | 측정 정상 확인 |
| 5/27 16:35 | **pca10056 R18 baseline 실측 검증** — CSV `프로젝트_보드한계모델/results/pca10056/MLP/128_20260520-093645.csv` → **7,367μs** (옛 추정 1,798μs의 4×) | **artifact 정체 발견** |
| 5/27 16:40 | R37 정정 — clock-norm = 7367 / 1985 × (240/64)⁻¹ = **0.99× ≈ 1.00× 정상**. negative finding 등재 취소, M4 positive | R37 정정판 발신 |
| 5/27 16:50 | R36 paired-check — M7 baseline 692μs (옛 557μs와 24% 차이 발견) → INFO emit 위치 변경 (post bench) → 556μs 정확 재현 | **STM-15 발견** |
| 5/27 17:00 | R36 정정 — M7 vs pca10056 = 7367 / (557 × 7.5) = **1.76× 빠름** (옛 0.43× 미달 artifact 정정). Cortex-M7 IPC gain 1.78× 카탈로그 매칭 | R36 정정판 발신 |
| 5/28 | mywiki-claude 5단계 lifecycle 흡수 + 정정 카드 3장 (R37 negative supersede + R37 correction + R36 paired-check) processed/ + cascade 종결 | mywiki 박제 |

## artifact 정체 분해

### 옛 박제 artifact 원인

```
pca10056 R18 baseline 추정값 ~1,798 μs (출처 불명)
↓
M7 vs pca10056 = 1798 / 557 = 3.23× / 7.5 (클럭비) = 0.43× → "0.43× 미달" 박제
M4 vs pca10056 = 1798 / 1985 = 0.91× / 3.75 (클럭비) = 0.24× → "0.27× 미달 negative finding" 박제
```

→ 두 박제 모두 **잘못된 baseline 추정값** 단일 원인. CMSIS-NN 17.58× 결정타 측정 자체는 정확 (5회 range 0).

### 정정 후

```
pca10056 R18 baseline 실측 7,367 μs (CSV 파일 단일 출처)
↓
M7 vs pca10056 = 7367 / (557 × 7.5) = 1.76× 빠름 ✅ (Cortex-M7 IPC gain 1.78× 카탈로그 매칭)
M4 vs pca10056 = 7367 / (1985 × 3.75) = 0.99× ≈ 1.00× 정상 클럭 비례 ✅
M7 vs M4 same-chip = 557 / 1985 = 3.56× / 2 (클럭비) = IPC gain 1.78× ✅
```

→ 모든 비율이 Cortex-M 카탈로그 IPC 정확 매칭. 측정 자체 정확성 + baseline 정정으로 일관성 확보.

## STM-15 새 함정 발견 (paired-check 부수 효과 ⭐⭐)

R36 paired-check 시 M7 INFO emit 추가 빌드에서 692μs 측정 (옛 557μs와 24% 차이) → 위치 이동 (post-bench 배치) → 556μs 정확 재현.

| 배치 | latency_avg | p99 |
|---|---:|---:|
| INFO emit 전 (`model_run_bench` 호출 이전) | 692 μs | 19,500 μs |
| INFO emit 후 (`model_run_bench` 호출 이후) | 556 μs | 7,400 μs |

**5회 측정 range 0** → 측정 잡음 아닌 **결정론적 build/cache 효과**. 원인: printk + HAL_RCC peripheral access가 측정 직전 cache state 변동 (I-cache layout + RCC register access first-trial cache cold).

**carry-over 가치**: 본 vault 모든 보드 measurement 일관성 표준 = 다른 보드 (Nordic / ESP32 / Linux PC) 측정 시 동일 패턴 적용. printk emit 위치 검증 필수.

## 자가 진단 정정 사이클 3번째 사례 — governance 신뢰성 패턴

| # | 일자 | 사례 | 가설 | 정정 | 의의 |
|:-:|---|---|---|---|---|
| 1 | 5/22 | **search G 패치** (search-claude) | Sonnet 모델 격하 | 프론트엔드 표시 버그 → 자가 진단 fix | 모델 격하 가설 → 표시 버그 정정 |
| 2 | 5/24 | **함정 #14 v3** (ondevice-claude) | Claude Code harness cwd reset | ESP-IDF/cmake/Windows cmd.exe cwd 보존 결함 | harness 책임 가설 → vendor toolchain 결함 정정 |
| **3** | **5/27~28** | **R37/R36 baseline** (ondevice-claude) | M4 0.27× / M7 0.43× clock-norm 미달 (7번째 negative) | pca10056 R18 실측 7,367μs baseline → M4 0.99× / M7 1.76× 정상 | **박제 정확성 정정 + negative 6건 유지 + 사용자 challenge가 trigger** |

→ Claude가 자기 박제 가설 검증 + 정정 + cascade 카드 발신 = 외부 회사 도입 시 시연 자산. **사용자 challenge trigger** = 사용자 능동 + Claude 검증 능동 = R&D 신뢰성 vault governance.

## 일반화 원칙 ⭐⭐

### 원칙 1: baseline 추정값 cross-check 부재 위험

- **함정**: 박제 시 정확한 단일 출처 (실측 CSV) 대신 추정값을 사용하면 derivative 박제 모두 artifact
- **회피**: baseline 박제 시 **단일 출처 (실측 CSV 파일 경로)** 명시 + 다른 박제와 비율 검증 시 같은 단일 출처 참조
- **carry-over**: Nordic / ESP32 / 다른 보드 measurement baseline 박제 시 동일 패턴

### 원칙 2: 측정값 의심 시 단일 출처 재확인 후 정정

- **함정**: 비정상치 (Cortex-M4F 240MHz가 64MHz와 effective 동급) 발견 시 그냥 박제 X
- **회피**: 카탈로그 IPC 일관성 + 실측 baseline 재확인 + 펌웨어 진단 INFO emit 추가
- **carry-over**: search G / 함정 #14 v3 / 본 사이클 = 자가 진단 정정 표준 SOP

### 원칙 3: 사용자 challenge = 정정 trigger 가치 박제

- **함정**: 사용자 challenge 없으면 artifact 박제가 영구 carry
- **회피**: 사용자 직접 challenge ("이 결과가 최선인가?")는 정정 trigger의 가장 강한 source. work-end 시 사용자 단순 confirm 후 박제 → 사용자 challenge 능동 (5/27 16:00 같은 자가 challenge 사례)
- **carry-over**: 모든 vault 측정 박제 사이클 — 사용자 challenge 응답 시 INFO emit + 단일 출처 재확인 SOP

## 본 vault 의미

- ⭐ **R&D 신뢰성 자산 강화** — R37 정정 직후 paired-check로 R36 박제도 동일 artifact 발견 + 정정. 박제 정확성 일관성 확보.
- ⭐⭐ **새 carrier 자산 STM-15** — INFO emit cache 영향 24% 발견은 본 vault 모든 보드 measurement carrier 일관성 표준 (다른 보드 carry-over 가치 큼)
- **negative finding 6건 유지** (R19/R24/R27/R29/R30/R32 — R37 제외)
- **CMSIS-NN 17.58× 결정타 변경 없음** = Cortex-M tier 최강 영업 메시지 영향 0
- **사용자 challenge로 시작된 정정 연쇄** = 사용자 능동 + Claude 검증 능동 = R&D 신뢰성 패턴 박제

## 매칭 패턴

| 영역 | carry-over |
|---|---|
| **multi-agent governance** | 자가 진단 정정 사이클 3번째 사례 = vault 간 cascade 카드 발신 (5/27 wishket #002 정정 cascade + 본 R36/R37 baseline 정정 = 2건 connected) |
| **영업 자산** | "vendor 광고 신뢰 X + UTTEC 자체 측정 자산 + 자가 정정 사이클 시연 가능" 영업 카피 |
| **carrier 표준** | INFO emit 위치 검증 SOP — 다른 보드 measurement (Nordic / ESP32 / Linux PC) carry-over |
| **사용자 challenge 가치** | 사용자가 자기 측정 능동 review + Claude 검증 능동 응답 = R&D 신뢰성 vault governance 모범 |

## 관련 페이지

- [[stm32h745-disco]] — R37/R36 정정판 박제 단일 출처
- [[onDevice-ai]] — 6 negative finding 유지 (R37 제외) + 가설 진화 표 Round 37 추가
- [[build-gotcha-inventory]] — STM-13/14/15 신규 함정 3건 + 자가 진단 정정 사이클 3번째 사례
- [[ai-fanstick]] — Cortex-M tier 영업 가이드 정정 (M4 단독도 정상)
- [[ai-direction]] — R37 정정 사이클 = R&D 신뢰성 자산 강화 (결정 추가)
- [[gaps]] — baseline 추정값 cross-check 부재 함정 + STM-15 측정 진단 코드 위치 효과
- [[2026-05-27_Cortex-M-tier-최강-AI-노드]] — 정정 반영 (M7 baseline IPC 1.76× + asymmetric multiprocessing path)
- [[2026-05-24_negative-finding-누적-신뢰성-자산]] — 6건 유지 (R37 제외, positive로 분류)
