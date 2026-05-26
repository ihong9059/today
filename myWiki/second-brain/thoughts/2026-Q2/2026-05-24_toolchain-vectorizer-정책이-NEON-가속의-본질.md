---
title: toolchain vectorizer 정책이 NEON 가속의 본질 — same SIMD HW, 6.9× gap (Wave 11)
type: thought
created: 2026-05-24
updated: 2026-05-26 (myWiki 흡수, Wave 11 카드 흡수 시)
tags: [vectorizer, toolchain, gcc, clang, NDK, NEON, dotprod, sdot, smlal, INT16-promote, asimddp, R30, R31, 7번째-negative-finding, mobile, smartphone, mandate-v2.8]
links: [onDevice-ai, ai-fanstick, uttec-stage-package, ai-direction, 2026-05-24_5계열-AI가속-매트릭스-완성, 2026-05-22_npu-vendor-광고-실측-격차]
---

# toolchain vectorizer 정책이 NEON 가속의 본질

## 한 줄 요약

⭐⭐⭐ **Galaxy A51 5G (A77 + asimddp, NDK clang 18) `-O3 -march=armv8.2-a+dotprod` 12셀 평균 0.97× = 가속 효과 없음.** R31 rpi5 (A76, gcc 14.2, Linux) 같은 flag로 **6.7× 가속**과 정반대. **6.9× gap의 본질 = toolchain vectorizer 정책 차이** (gcc는 `sdot` 자동 선택 / clang은 `smlal` INT16 promote path 선택). same SIMD HW 보유라도 컴파일러 정책으로 결정됨.

## R30 12셀 매트릭스 (smartphone)

| Cell | R19 baseline (-O2) | R30 (-O3 +dotprod) | 가속률 |
|---|---:|---:|:-:|
| MLP 128 | 27 μs | 27 μs | 1.00× |
| MLP 1024 | 389 μs | 463 μs | **0.84×** ⚠️ 느려짐 |
| MLP 4096 | 4,380 μs | 4,379 μs | 1.00× |
| MLP 8192 | 17,369 μs | 17,352 μs | 1.00× |
| MLP 16384 | 69,396 μs | 69,391 μs | 1.00× |
| CNN 32/64/128 | (3셀) | (3셀) | 0.98× |
| TF 64 | 85 μs | 105 μs | **0.81×** ⚠️ 느려짐 |
| TF 484/1084/2436 | (3셀) | (3셀) | 0.99~1.00× |
| **12셀 평균** | — | — | **0.97×** ⚠️ |

→ ⭐⭐ **9/12 셀 1.00× / 3/12 셀 0.81~0.98× (오히려 느려짐) / 0/12 셀 의미 있는 가속.**

## objdump 분석 — vectorizer 정책

| binary | NEON SIMD 명령 | latency MLP 128 |
|---|---|:-:|
| O2 baseline | (거의) 없음 — scalar code | **27 μs** |
| O3neon | `smlal/smlal2` (4-way INT16) — **`sdot` 미사용** | **27 μs** |

⭐ 발견:
- clang 18 vectorizer는 `+dotprod` flag 인식하나 INT8 src를 `smlal` (INT16 promote) path 선택 → `sdot` 자동 미선택
- O2 baseline은 NEON 명령 거의 없음에도 동일 latency → **memory bandwidth bound** 추정

## rpi5 vs smartphone cross-vendor 비교

| 항목 | rpi5 (R31) | smartphone (R30) |
|---|---|---|
| 컴파일러 | gcc 14.2 (Linux native) | clang 18 (Android NDK) |
| CPU | A76 × 4 @ 2.4GHz | A77 × 2 @ 2.2GHz |
| asimddp HW | ✅ | ✅ |
| `+dotprod` 시 NEON 명령 | **`sdot` 자동 vectorize** ⭐ | `smlal` (INT16 path) |
| `+dotprod` 가속률 | **6.7× ⭐⭐⭐** | **0.97×** ⚠️ |

⭐ **6.9× gap 본질 = vectorizer 정책 차이.** SIMD HW (asimddp)는 양쪽 모두 보유.

## 7번째 negative finding 누적

| # | Round | 발견 |
|:-:|---|---|
| 1 | R19 | mobile NPU NNAPI -79~421× |
| 2 | R24 | INT16 양자화 baseline INT8 대비 동등 |
| 3 | R27 | FP16 Adam vs fast_adam baseline 우월 |
| 4 | R29 | multi-layer LoRA top-1 → multi-layer 동일 정확도 |
| 5 | R28 후속 | TF 1.85×만 (attn_causal argmax 비가속) |
| 6 | R32 | pca10040 64KB tier 6/6 wall (static RAM 89.8%) |
| 7 ⭐ | **R30** | **mobile clang 18 `+dotprod` flag 무효 (0.97×)** |

## 5계열 매트릭스 mobile 행 negative 완성

| 계열 | 보드 | 컴파일러 | MLP small | CNN small | TF small |
|---|---|---|:-:|:-:|:-:|
| LX7 ESP-DSP | esp32s3 | xtensa-elf-gcc 14.2 | **13.4×** | 1.00× | **10.8×** |
| M4F CMSIS-NN | pca10056 | arm-zephyr-eabi gcc | 3.23× | **14.02× ⭐⭐⭐** | 1.85× |
| esp-nn | esp32s3 | xtensa-elf-gcc 14.2 | — | 2.93× | 3.78× / 2.62× PSRAM |
| ARM-A NEON+dotprod (rpi5) | rpi5 | gcc 14.2 (Linux) | **11.75×** | 4.17× | **7.64×** |
| **Mobile A77 NEON+dotprod** ⭐ | **smartphone** | **clang 18 (Android)** | **1.00×** ⚠️ | **0.98×** ⚠️ | **0.81×** ⚠️ |
| Mobile NPU NNAPI | smartphone | NNAPI runtime | — | — | — |

⚠️ **3 mobile 가속 path (NPU + NEON 명시 + baseline) 모두 negative** = mobile CPU/NPU 추가 SDK 도입 가치 없음 확정.

## ⭐ 일반화 — toolchain vectorizer 정책이 본질

> "same SIMD HW (asimddp) 보유라도 컴파일러 vectorizer 정책 차이로 6.9× gap 발생. AI 가속 본질 = HW + library + **toolchain 정책**."

본 패턴은 vectorize-dependent 작업에 일반화 가능:
- LLM kernel (llama.cpp matmul) — gcc vs clang vs MSVC vectorizer 정책 차이
- Scientific compute (BLAS, FFTW) — auto-vectorize 의존 코드 path
- Mobile/embedded 응용 — NDK clang 정책이 vendor lib 효율 결정

## ai-direction 결단 (Wave 11 흡수)

- **결정 1**: mandate v2.8 trajectory 5/6 ✅ + R30 negative finding 7건 누적
- **결정 2**: ⭐⭐⭐ **mobile CPU/NPU 추가 SDK 도입 결단 = 가치 없음 확정** (3 path 측정 검증 후 — NPU + NEON 명시 + baseline)
- **결정 3**: toolchain vectorizer 정책 = R&D 신뢰성 모범 (자체 정정 사이클 3번째 케이스)

## 영업 자료 영향 (Wave 11 cascade)

| 시나리오 | 갱신 |
|---|---|
| A esp32s3 단일 ($12) | mobile baseline 동등 → AI FanStick BOM 우월성 정량 |
| B Hybrid SoC ($16.70) | mobile NEON 1.0× 대비 14× 차이 (CNN) — pca10056 KWS 우월 |
| C M4F 단독 ($9.50) | 64KB 부적합 (R32) + mobile 대비 14× 우월 (M4 → mobile A77) |
| D Edge AI Gateway ($15~30만원) | **rpi5 gcc 6.7× vs smartphone clang 1.0× → rpi gcc native 우월** (rpi 보드 선택 정량 근거) |

## 관련

- [[onDevice-ai]] § 5계열 매트릭스 mobile 행 negative 추가
- [[ai-fanstick]] § 차세대 기술 근거 (mobile NEON 0.97× negative + MCU 가속 13.4×↑)
- [[uttec-stage-package]] § Stage 4 영업 카피 (3 mobile path 측정 검증)
- [[2026-05-24_5계열-AI가속-매트릭스-완성]] — Wave 10 ARM-A 행 추가 cascade
- [[2026-05-22_npu-vendor-광고-실측-격차]] — R19 1번째 mobile negative cross-link
