---
title: hardware/ — 보드별 spec·실측·한계 단일 출처
type: navigation
created: 2026-05-15
purpose: 7개 보드의 능력·한계·실측을 한 schema로 정리. 보드 × 응용 매트릭스의 보드 축.
boards: 7 (pca10040, pca10056, esp32wroom, esp32c6, esp32s3, smartphone, pc)
schema_version: 1
---

# hardware/ — 보드별 spec·실측·한계

> **정의 Section 5 (스펙트럼 T1~T4) 의 구현체.** 각 보드의 능력 한계가 가능한 모델·응용을 결정하므로, 보드를 1차 축으로 둠.

## 7개 보드 한눈 비교

| 보드 | 코어 | RAM | Flash | AI 가속 | 무선 | 가격대 | 티어 | 보유 | 본 vault 위치 |
|---|---|---|---|:-:|---|---|:-:|:-:|---|
| **pca10040** | Cortex-M4F @ 64MHz (nRF52832) | **64KB** | 512KB | ❌ (FPU만) | BLE 5 | $40 (DK) | T1- | ✅ | 극한 압축 baseline |
| **pca10056** | Cortex-M4F @ 64MHz (nRF52840) | **256KB** | 1MB | ❌ (FPU만) | BLE 5 + USB + NFC | $50 (DK) | T1 | ✅ | 무선 응용 표준 |
| **esp32wroom** | Xtensa LX6 dual @ 240MHz | **520KB** | 4MB | ❌ | WiFi + BT4.2 | $5 (모듈) | T1 | ✅ | ESP32 baseline (가속 없음) |
| **esp32c6** | RISC-V single @ 160MHz | **512KB** | 4MB | ❌ | WiFi 6 + BLE 5 + 802.15.4 | $8 (모듈) | T1 | ✅ | 차세대 저전력 IoT |
| **esp32s3** | Xtensa LX7 dual @ 240MHz | **512KB + PSRAM 8MB** | 8MB | ✅ vector SIMD | WiFi + BLE 5 | $10 (모듈) | T1+ | ✅ | **메인 타겟** (AI FanStick) |
| **smartphone** | Exynos 980 + 2.1 TOPS NPU | **6GB** | 128GB | ⚙️ NPU (약함) | 5G + WiFi + BLE | (보유) | T3- | ✅ | **Galaxy A51 5G** (2020 미드레인지) |
| **pc-Windows** | i5-1235U (12T) | 16GB | (lenovo) | ❌ NPU | Ethernet/WiFi | (보유) | T4 | ✅ | myWiki/일상 (Win11) |
| **pc-Ubuntu** | i7-4770HQ (8T) | 16GB | (MBP11,4) | ❌ NPU | Ethernet/WiFi | (보유) | T4 | ✅ | **개발 전용** (Ubuntu 22.04, `ssh ubuntu`) |

**모든 보드·디바이스 보유 ✅** (2026-05-15 확인). 메모리 차수: pca10040 64KB → pc 16GB = **6 차수(million-fold) 차이**. 같은 응용이라도 보드마다 구현·정확도·속도가 완전히 다름.

**주목할 점**: 보유 smartphone은 **플래그십이 아닌 2020 미드레인지** (Galaxy A51 5G, Exynos 980 2.1 TOPS). 이 점이 오히려 가치 — "보통 사용자 폰의 한계" 현실 검증 가능. 플래그십(30~80 TOPS) 가정의 응용은 차단.

## 폴더 schema (7개 보드 공통)

```
hardware/<board>/
├── 00_spec.md              ← 칩 사양 + 입수 + 개발 환경 (정적, 거의 안 바뀜)
├── 01_baseline.md          ← hello_world / 부팅 / 가용 메모리 실측
├── 02_model_limits.md      ← 최대 모델 크기 (FP32/INT8/INT4 / w_PSRAM)
├── 03_inference_bench.md   ← latency · throughput · 전력 실측
├── 04_applications.md      ← 이 보드에서 가능한 응용 리스트 + 가능성 점수
├── 05_pitfalls.md          ← 학습한 함정·버그·우회법 (사용자 본인 메모)
└── results/                ← raw data (csv·log·sram_dump 등)
```

**채워나가는 순서**: 00 (즉시) → 01 (보드 입수 후) → 02·03 (실측) → 04 (결론 종합) → 05 (누적)

## 운영 규칙

### 보드별 비교를 만들 때
**보드 폴더에 직접 비교표를 만들지 말 것**. 모든 cross-board 비교는 `_matrix.md` 1곳에서만 운영.
- ❌ `pca10056/04_applications.md` 안에 "vs esp32s3" 표
- ✅ `_matrix.md` 1개에 "응용 × 보드" 매트릭스

### 응용 컨텍스트가 필요할 때
응용 정의·시나리오는 `applications/` 폴더에서. hardware 폴더는 **이 응용을 이 보드에서 측정한 결과**만.

### microGPT·AI FanStick의 위치
- `microGPT/` 와 `aiFanStick_차세대/` 는 **유지** (실험·제품 단위, hardware 축과 직교)
- 둘이 hardware/ 에 측정 의뢰: `microGPT/01_검증절차.md` → `hardware/esp32s3/02_model_limits.md` 결과 참조

## 시작점

> **모든 보드 보유 확인 완료 (2026-05-15)** — 보드 입수 대기 없이 즉시 실측 가능.

1. **1순위 — esp32s3**: 메인 타겟 (microGPT·AI FanStick 둘 다 사용). 보드 입수 ✅ → 즉시 `01_baseline.md` 시작 가능.
2. **2순위 — pca10056·esp32wroom·esp32c6**: 비교군. esp32s3 측정 후 동일 모델로 비교 → AI SIMD 효과 정량화.
3. **3순위 — pca10040**: 극한 baseline (64KB), 다른 보드 측정 후 진행.
4. **병렬 가능 — pc (Ubuntu)**: 학습·증류·시뮬레이션은 보드 측정과 독립. `ssh ubuntu` 환경에서 즉시 가능.
5. **참조용 — smartphone**: Galaxy A51 5G 응용 실증 1~2건 (TinyLlama 1.1B Q4 구동 등).

## 보드 × 응용 매트릭스

→ `_matrix.md` 참조 (cross-cutting view)
