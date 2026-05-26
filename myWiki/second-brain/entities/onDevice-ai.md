---
title: onDevice_AI vault — AI FanStick + Stage 4 + 보드한계모델
type: entity
created: 2026-05-07
updated: 2026-05-26 Wave 10/11/12/13 흡수 (mandate v2.8 4~5/6 ✅ — R34 Hybrid SoC PoC + R33 esp-nn SRAM/PSRAM 분기 + R32 64KB 6번째 negative + R31 rpi5 NEON 6.7× + R31.5 sdot 분리 + R30 mobile 7번째 negative + STM32H745 14th 보드 + 11 함정 cluster + Ethernet/Bridge PoC + Stage 4 LAN path)
status: ✅ 1차 mandate 전환 완료 (5/17) / **v2.5 7/7 + v2.6 4/4 + v2.7 4/4 ✅ + v2.8 5/6 ✅ (R30~R34 5 Round)** / **14/14 보드 100% 완성** (STM32H745 14번째 신규 5/25) / 5계열 AI 가속 매트릭스 완성 (LX7 ESP-DSP + M4F CMSIS-NN + esp-nn + **ARM-A NEON+dotprod** + NPU NNAPI) / on-device 학습 4번째 축 / W6 종료 6/22~28 후 Stage 4 영업 자산화 6/29
tags: [vault, On-Device AI, 보드한계모델, AI FanStick, ESP32-S3, ESP-DSP, ESP32-C6, RISC-V, Xtensa, ARM, ARM-A, NEON, dotprod, Cortex-M4F, Cortex-M7, CMSIS-NN, Nordic, STM32, STM32H745, Zephyr-cross-vendor, Stage4, LAN-path, 정지선, multi-agent, ondevice-claude, mandate-v2.5-종결, mandate-v2.6-종결, mandate-v2.7-종결, mandate-v2.8, LoRA, fast-adam, KWS, selective-personalization, Hybrid-SoC, 5계열매트릭스완성, 7-negative-finding, 6조건곱, 47빌드함정, vectorizer-정책]
links: [ai-fanstick, uttec-stage-package, On-Device AI, claude-code, build-gotcha-inventory, stm32h745-disco, 2026-05-08_응원봉-온디바이스AI-정지선, revita, 2026-05-20_esp32-arm-family-스펙트럼, 2026-05-21_esp-dsp-3조건-매칭, 2026-05-22_npu-vendor-광고-실측-격차, 2026-05-24_application별-SoC-결정-Hybrid-SoC, 2026-05-24_negative-finding-누적-신뢰성-자산, 2026-05-24_selective-personalization-pattern, 2026-05-24_5계열-AI가속-매트릭스-완성, 2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질, 2026-05-25_STM32H745-Zephyr-통합-cross-vendor, 2026-05-26_STM32H745-LAN-path-Stage4-결정타]
---

> **2026-05-17 mandate 전환**: 옛 "AI FanStick + Stage 4 영업 4 Phase 12 실험" → 새 **"보드한계모델 37셀 측정 (W0~W6)"** 단일 strand. 응용·영업은 W6 종료 후 후속(C 단계)으로 분리. 단일 출처 = `0_마스터플랜.md v2.0`.
> **2026-05-20 흡수 완료**: 5/17~20 ondevice-claude 카드 6장 + 5/20 새벽 esp32c6/Round 10·11 추가분 일괄 흡수.
> **2026-05-21 흡수 완료**: Round 17·17.5 ESP-DSP intrinsics 결정타 흡수 — MLP 13.4× / C3→S3+DSP 24.8× / TF 10.8× / CNN strided 적용 불가 / PSRAM 가속 무효. **AI FanStick 양산 방향 5/8 결정 뒤집힘** (C3 유지 → S3-N16R8 + ESP-DSP + PSRAM SLM).
> **2026-05-22 흡수 완료**: Round 18 Cortex-M4F CMSIS-NN MLP 128 = 3.23× 가속 (7,367μs → 2,285μs). **3계열 AI 가속 매트릭스 두 번째 축 완성** (LX7 ESP-DSP +13.4× ⭐⭐⭐ / M4F CMSIS-NN +3.23× ⭐⭐ / Eden NPU NNAPI ‒79~421× ⚠️). 클럭 normalize 시 LX7 단위 효율 5.64× M4F 우위. CNN/TF skeleton 미패치 (1.01×). Nordic 빌드 함정 5건 신규 박제.
> **2026-05-22 야간 흡수 완료**: Round 18 후속 pca10040 (nRF52832 64KB) 12/12 RAM wall = **13/13 보드 완성 (100%)**. Round 14 plain C 100% 재현 — CMSIS-NN library 추가해도 RAM tier 한계 동일. "AI 응용 = nRF52840 (256KB)+ 또는 ESP32-S3 (PSRAM 8MB) 필수" 정량 박제. Stage 4 칩 선택 가이드 § "저전력 BLE-only (AI 불가)" 행 신설. Nordic 함정 11건 cross-vendor 인벤토리 (Round 17 ESP-DSP 4 + Round 18 본편 5 + Round 18 후속 R18-F/G 2). **AI 가속 4조건 곱 = ISA × workload × 메모리 계층 × RAM tier 적합도**.
> **2026-05-23 야간 흡수 완료**: ondevice-claude 5/22 카드 (Round 9 cascade revisit + v2.5 종합 단일 출처 99_종합_v2.5) + 5/23 Round 21 esp-nn CNN 2.93~2.95× 카드 2건 통합 흡수. **3계열 AI 가속 매트릭스 CNN 행 채움** (esp-nn CNN LX7 +2.93× = ESP-DSP MLP/TF + CMSIS-NN MLP 옆 4번째 사례). **mandate v2.5 trajectory 5/6 → 6/7** (Round 20 LoRA 별도 결단 대기). **AI 가속 5조건 곱 진화 = ISA × workload × 메모리 계층 × RAM tier × library selection by workload** (5/22 4조건에서 library selection 1조건 추가). Round 9 evolution 시계열 6단계 박제 (Round 9 → 17 → 17.5 → 18 → 18후속 → 19 → 21). 14 보드 클럭 normalize cycle-per-MAC ranking (LX7 25,920 = MCU 최고 단위 효율, M4F 146,240 = MCU 2위, 자기자신 plain 의 5.64× 우위). esp-nn 빌드 함정 3건 신규 (R21-1 ninja PRE_LINK cd . cwd reset / R21-2 sections.ld-*.bat 상대 경로 / R21-3 PowerShell 5.1 UTF-8 BOM CP949 fallback). cross-vendor 빌드 함정 누적 **19건** (Espressif 8 + Nordic 11). **AI FanStick 차세대 firmware stack 확정**: MLP=ESP-DSP 13.4× + CNN=esp-nn 2.93× + TF=ESP-DSP 10.8× = KWS wake word 547ms → 187ms (3× 단축).
> **2026-05-26 megasession 흡수 완료 ⭐⭐⭐ Wave 10/11/12/13** (4 카드 일괄 — 5/24-011 + 5/24-013 + 5/25-001 + 5/26-001):
> **(Wave 10, 5/24)** mandate v2.8 4/6 ✅ — R34 Hybrid SoC PoC firmware 실작동 (16 cycle × 8 keyword × ACK 100%, UART jumper 38400 bps) + R33 esp-nn TF SRAM/PSRAM 분기 신규 finding (SRAM은 ESP-DSP 우월 / PSRAM은 esp-nn 2.62× 우월) + R32 pca10040 64KB 부적합 6번째 negative finding (Static RAM 89.8%, MLP 1KB도 fit 불가) + R31 rpi5 ARM NEON+dotprod 6.73× (MLP 128 11.75× / TF 64 7.64×, GCC 14.2 + `+dotprod` flag만으로) + R31.5 A72 vs A76 sdot 효과 분리 (dense matmul 2.6~3.7× / strided conv 동등) + **5계열 매트릭스 완성** (LX7 / M4F / esp-nn / ARM-A / NPU). Stage 4 시나리오 D Edge AI Gateway 신설 ($15~30만원, rpi5 gcc 6.7× Cloud 대안 정량 근거).
> **(Wave 11, 5/24)** R30 smartphone NDK clang 18 `-O3 -march=armv8.2-a+dotprod` 12셀 평균 **0.97× = 가속 효과 없음** (7번째 negative). same asimddp HW + rpi5 6.7× 가속과 정반대 → **6.9× gap 본질 = toolchain vectorizer 정책 차이** (gcc는 `sdot` 자동 / clang은 `smlal` INT16 promote path). 3 mobile 가속 path (NPU + NEON 명시 + baseline) 모두 negative → **mobile CPU/NPU 추가 SDK 도입 가치 없음 확정**. mandate v2.8 5/6 ✅.
> **(Wave 12, 5/25)** **STM32H745I-DISCO 14번째 보드 신규** + 본 vault 정통 = Zephyr 합의 (Nordic + STM32 cross-vendor 통합) + 11 함정 single-day cluster 박제 (STM-1 한글 cmake / STM-2 cd cwd / STM-3 dual-core boot / STM-4 CubeProgrammer halt / STM-5 보드명 자가진단 H746→H745 / STM-6 segmented binary / STM-7 LTDC backlight / STM-8 framebuffer DTCM overflow / STM-9 LD8 polarity / STM-10 PowerShell function scope / STM-11 USB FS not HS ULPI) + 3 PoC (R36 baseline 12셀 + LCD R/G/B + USB CDC ACM streaming). R35 keyword KsponSpeech 일반 대화 재구성 (네/아니/좋아/싫어/다시/가자/잠깐/꺼).
> **(Wave 13, 5/26)** STM32H745 Ethernet TCP echo (Microchip LAN8742A onboard, MII 100Mb full duplex, DHCP ~2.1s, FLASH 132KB / RAM 67KB) + USB-CDC↔TCP Bridge PoC (ring_buf 2개 + ISR 1개 + thread 1개, 단일 firmware 동시 streaming, FLASH 150KB / RAM 80KB) + STM-12 minor (Zephyr 4.3 `net_mgmt_event_handler_t` uint32_t → uint64_t signature change). **carry-over 효과 정량화**: R36 3차 시도 → 본 PoC **1차 success** (11 함정 박제 후 신규 1건 minor만). **Stage 4 영업 path 확장**: USB CDC + LAN 동시 단일 firmware → 한국 산업 노드 (LAN 인프라 + STM32 선호) B2B path 추가.
> **(누적)** 빌드 함정 **47건** (Espressif 16 + Nordic 18 + NDK 1 + STM32 12). 신규 entity [[stm32h745-disco]] 신설 + thoughts/2026-Q2/ 4건 박제 (5계열 매트릭스 / toolchain vectorizer / STM32H745 Zephyr 통합 / Stage 4 LAN path).

> **2026-05-24 megasession 흡수 완료 ⭐⭐⭐⭐** (6 카드 일괄 — #011 + #001 + #003 + #005 + #007 + uttec-vault #002): 
> **(1) mandate v2.5 7/7 ✅ 종결** — Round 20 LoRA on-device 9 cell esp32s3 + PSRAM 8MB PASS (MLP 128 r=8 1,949μs, 100 step 0.20초 학습 / PC numpy 검증 gradient rel error 1.78e-10 / Adam 78 step 99.9954% loss 감소). **4번째 축 (on-device 학습) 신설** — 13 보드 중 esp32s3 + PSRAM 8MB 유일 학습 가능 칩.
> **(2) mandate v2.6 4/4 ✅ 종결** — R22 (LoRA phase 분리, Adam 60~92% dominance 발견) + **R23 ⭐⭐⭐⭐ Adam optimizer 5.87× 가속 → Tiny MLP 128 r=8 = 0.05초 "즉시 학습" carrier** (fast_rsqrtf + bias precompute) + R24 INT16 negative finding (1.65~4.25× 느림, esp32s3 FP division ~10 cycles/elem) + **R25 ⭐⭐⭐⭐ CNN+LoRA KWS personalization C16 r=4 = 0.37초 carrier** + "CNN forward 92~99% dominant, LoRA fine-tune 1~8% only = 사실상 무료" 신규 finding. 33 cell + 27 PHASE row 누적.
> **(3) mandate v2.7 4/4 ✅ 100% 종결 ⭐⭐⭐** — R26 KWS personalization 정확도 검증 (실제 mini_speech_commands 8 keyword × 1,000 sample, **어려운 화자 K=5 +11.4% improvement / Selective personalization 신규 finding**: baseline <70% 사용자에게만 효과) + R27 FP16 Adam state 측정 (R23 baseline 우월 확정 1.08~1.88×, R24 negative 우월 대안 1.37~2.25× 빠름, RAM 50% 절감 carrier, **함정 #14 v3 진단 정정**: ESP-IDF/cmake/Windows cmd.exe 결함 — Claude Code harness 책임 아님) + **R28 ⭐⭐⭐ pca10056 Cortex-M4F + CMSIS-NN `arm_convolve_wrapper_s8` CNN 32 = 14.02× 가속 (예측 5배 초과)** — im2col + SMLAD SIMD 가 LX7 ESP-DSP CNN strided 한계 완벽 압도 + R29 Multi-layer LoRA negative (-7.7~-9.3%). mandate v2.7 = 12시간 소요 (5/24 1일).
> **(4) 3계열 AI 가속 매트릭스 완성 + Hybrid SoC carrier** — LX7 ESP-DSP (MLP 13.4× + TF 10.8× + CNN 1.00× 한계) / M4F CMSIS-NN (MLP 3.26× + **CNN 14.02× ⭐** + TF 1.85×) / NPU NNAPI (‒79~421× 부적합) / esp-nn (CNN 2.93×). **Hybrid SoC carrier**: KWS frontend (M4F CMSIS-NN 14×) + Personalization backend (esp32s3 ESP-DSP + LoRA 0.05초) — single SoC mindset 탈피.
> **(5) AI FanStick Premium Plus 4 tier 양산 확정 (R23 fast_adam)** — Tiny 0.05초/Small 0.76초/Medium 4.36초/Large 8.17초 학습 + KWS personalization 0.37~5.37초 + selective +11.4% 정확도. Cloud GPT-4 API (3~10초) 대비 8~27× 빠름 + 외부 의존 0%.
> **(6) 6조건 곱 진화** — 5/24 = ISA × workload × 메모리 계층 × RAM tier × library × **on-device 학습 가능 여부** (R20/R23 esp32s3 + PSRAM 8MB 유일 학습 칩).
> **(7) 5 negative finding 누적 R&D 신뢰성 자산** — R19 (NPU) + R24 (INT16) + R27 (FP16) + R29 (Multi-layer LoRA) + R28 (TF 1.85×만). R23 채택 결정이 4 대안 측정 비교 후 도출.
> **(8) 빌드 함정 34건 누적** — Espressif 16 (R20-1 PowerShell 한글경로, R21-1/2/3, R27-1/2/v3 등) + Nordic 18 (R28-1 Zephyr 4.3.99 arm_convolve_s8 upscale_dims 추가, R28-2 Bash↔PowerShell env var, R18 Nordic 5 + 후속 R18-F/G 등) → entities/build-gotcha-inventory.md 신설.

# onDevice_AI vault — AI FanStick + Stage 4 + 보드한계모델

## 한 줄 정의

**AI FanStick + Stage 4 제품의 기술 검증 + 비즈니스 운영 통합 vault**. 1차 mandate = **보드한계모델 37셀 측정** (8 보드 → 13 보드 확장, 3 아키텍처 × 4 크기, 추론 전용 + synthetic random weights). 결과를 Stage 4 영업 자산으로 cascade.

## 위치

- **현재**: `C:\todo\onDevice_AI\` (myWiki 외부, 별도 git repo, private, `ihong9059/onDevice_AI`)
- myWiki traversal: `myWiki/raw/onDevice_AI/` junction (5/20 복구)
- 단일 출처: `0_마스터플랜.md v2.0` (5/17 신설, 8 § ~250줄)

## Multi-agent 식별자

- Claude 식별자: `ondevice-claude`
- 통신 채널: `_inbox/{pending,processed}/`
- 4-vault 운영 중 (myWiki + onDevice_AI + lemonLabs + uttecHome)
- PROTOCOL: `myWiki/_inbox/PROTOCOL.md` § 2026-05-15

## 핵심 mandate — 보드한계모델 (v2.3, 5/19 확정)

**목적**: 13 보드 × 3 아키텍처(MLP·CNN·Transformer) × 4 크기 = **37 셀**의 한계 envelope 측정. 추론 전용. 학습 0회. synthetic random weights (weight 의미 무관, 메모리·연산 envelope만).
**방법론**: Binary Search Wall Finding + 동일 ANSI C99 스켈레톤 + 자동화 Makefile + boards/ scripts/ 빌드 자동화.
**일정**: 5주 → 6주 (W0~W6, 5/17~6/22~28) — W5 → W6로 1주 연장.
**Stage 4 영업 자산화 시점**: 2026-06-29 (W6 종료 익일).

## 13 보드 진행 매트릭스 (10/13 ✅, 78%)

| # | 보드 | 정식 W | 실제 측정 | 측정 셀 | 핵심 |
|:-:|---|:-:|:-:|:-:|---|
| 1 | **pc (uttecMac)** | W1 | 5/18 | 3 + 4 sweep | x86 baseline · AVX2 · gcc 11.4 · Ubuntu 22.04 |
| 2 | **pc-windows** | W1 | 5/18 | 12 sweep ✅ | 같은 Haswell + Win11 — OS·툴체인 차이 정량화 |
| 3 | **rpi5** | W5 | 5/19 ✅ 1개월↑ | 12 sweep | ARM baseline · A76 · gcc 14.2 · asimddp |
| 4 | **tablet** | W4 | 5/19 ✅ 1개월↑ | 12 | A75 clang · Helio G80 · NPU 부재 |
| 5 | **smartphone** | W4 | 5/19 ✅ 1개월↑ | 12 | A77 clang · Exynos 980 · NPU 2.1 TOPS |
| 6 | **rpi4** | W5 | 5/19 ✅ 1개월↑ | 12 | A72 1세대 big · gcc 14.2 · asimddp 없음 |
| 7 | **rpi3** | W5 | 5/19 ✅ 1개월↑ | 12 | A53 1세대 little · in-order · LAN ethernet |
| 8 | **rpizero** | W5 | 5/19 ✅ 1개월↑ | 11 + 1 RAM wall | ARMv6 single · NEON 없음 · USB OTG 동글 |
| 9 ⭐ | **esp32s3** (메인 타겟) | W2 | 5/19 ✅ 5일↑ | 5 RAM_safe + 1 lat + 1 timeout + 5 RAM | ESP32-S3 dual + Embedded PSRAM 8MB + Flash 16MB |
| 10 ⭐ | **esp32c6** (W3 첫 진입) | W3 | 5/20 ✅ 12일↑ | 3 RAM_safe + 1 lat + 8 RAM | RISC-V single 160MHz + **PSRAM 없음** + 512KB SRAM |
| 11 | esp32wroom | W3 | — | 3 | ESP32 baseline (LX6 dual · 가속 없음 · 520KB) |
| 11⭐ | **pca10056** (Round 18 CMSIS-NN ⭐⭐) | W3 | 5/22 ✅ | 12 sweep | Nordic nRF52840 (M4F 64MHz · 256KB · CMSIS-NN SMLAD MLP 3.23×) |
| 13⭐ | **pca10040** (Round 18 후속 ⭐) | W4 | 5/22 ✅ | 12 **전셀 RAM wall** | Nordic nRF52832 (M4F · 64KB · **AI 응용 부적합** 정량 박제) |
| **14⭐** | **STM32H745I-DISCO** (Wave 12+13, R36) | — | **5/25** ✅ | 12 baseline + 3 PoC + Ethernet | ST **Cortex-M7 480MHz + M4 240MHz dual** · 1MB internal + 8MB SDRAM · LCD + USB CDC + **Ethernet (LAN8742A onboard)** · Stage 4 산업 노드 path |

**진행률**: **13/13 보드 ✅ (100%)** / **42/49 셀 (86%, v2.4 baseline + v2.5 Round 18 누적)**. **메인 타겟 esp32s3 + RISC-V esp32c6 + Cortex-M4F 2 보드 (pca10056 ✅ / pca10040 RAM wall) 완료**. 1일 5보드 18셀 (5/19) + esp32s3 (5/19) + esp32c6 (5/20) + pca10056 + pca10040 (5/22) = **mandate 13/13 보드 완성**. v2.5 Round 18 CMSIS-NN 트랙 종료 (cnn/tf skeleton CMSIS-NN 패치 별도 후속 Round 18.5 후보).

## ⭐ 가설 진화 — Round 1~11 (v2.10)

mandate 가설 11회 반증·정제. 매 보드 추가 시 가설 1개씩 정제.

| Round | 가설 | 검증 환경 | 결과 |
|:-:|---|---|:-:|
| 1 | "5× 느림" (artifact) | 초기 | ❌ uninitialized stack |
| 2 | "i586-tune SIMD" | rpi5 | ❌ rpi5에 i586 무관 |
| 3 | "L3 cache 영향" | tablet | △ 부분 반증 (clang으로 가려짐) |
| 4 | "clang vs gcc" | rpi5 vs tablet | ✅ **2.2× 부분 확정** |
| 5 | "+ ARM 코어 세대 clang (A75→A77)" | tablet → smartphone | ✅ **1.85× 합성 4×** |
| 6 | "+ 같은 gcc 1세대 (A72→A76)" | rpi4 → rpi5 | ✅ **1.75× + CNN L3 cache +0.41× 부활** |
| 7 | "+ ARMv8 1세대 little vs big (A53→A72)" | rpi3 → rpi4 | ✅ **3.0~3.8×** |
| 8 | "+ ARMv6 vs ARMv8 + NEON 없음 + single" | rpizero → rpi3 | ✅ 2.0~2.7× (NEON 영향 한정) |
| 9 ⭐ | "+ Xtensa LX7 plain C는 ARM 9~38× 느림 + PSRAM 8MB 새 한계점" | esp32s3 → rpi3·rpi4 | ✅ MLP/CNN/TF 9~38×, PSRAM 8MB가 5/12 cells RAM wall |
| **10** | "+ RISC-V plain C는 Xtensa LX7과 클럭 normalize 시 동급" | esp32c6 → esp32s3 | ✅ 시간 0.97~1.36× / **CNN 32 RISC-V 1.5× 우위** |
| **11** ⭐ | "+ **PSRAM 유무가 mandate RAM_safe 셀 결정타**" | esp32c6(없음) ↔ esp32s3(8MB) | ✅ **3 RAM_safe ↔ 5 RAM_safe = 60% 격차** (MLP 1024+ / TF 484+ 모두 esp32c6 wall) |
| 12 | "+ LX6→LX7 코어 진화 영향" | esp32wroom → esp32s3 | ✅ 정량화 (1차 양산 방향 5/8 결정 근거 보강) |
| **15** | "+ AI FanStick C3→S3 단순 칩 교체 정량화" | esp32c3 → esp32s3 (plain C) | ✅ MLP 128 = 1.84× (2,677us → 1,452us) — 영업 카피 1단계 |
| **17** ⭐⭐⭐ | "+ ESP-DSP `dsps_dp_s8_aes3` 활성 시 LX7 AI Vector Instruction" | esp32s3 (plain C vs +DSP) | ✅ **MLP 128 13.4× (1,452us → 108us)** / MLP 1024 PSRAM 2.66× / **C3→S3+DSP 24.8× ⭐ 결정타** |
| **17.5** ⭐ | "+ TF/CNN/PSRAM ESP-DSP 적용 한계" | esp32s3 + DSP 후속 | ✅ **TF SRAM 10.8× ⭐** / CNN strided 1.00× (적용 불가) / PSRAM 가득 모델 가속 무효 또는 손해 / LX6·RISC-V에서 적용 시 1.54× 느림 |
| **18** ⭐⭐ | "+ Cortex-M4F CMSIS-NN SMLAD (DSP extension) MLP 가속 = 2.5~4× (Optimistic 가설 안)" | pca10056 (plain C vs +CMSIS-NN) | ✅ **MLP 128 3.23× (7,367μs → 2,285μs)** / CNN/TF 1.01× (skeleton 미패치, im2col 필요) / 클럭 normalize 시 **LX7 5.64× M4F 단위 효율 우위** (25,920 vs 146,240 cycles MLP 128) |
| **20** ⭐⭐ (v2.5 종결) | "+ LoRA on-device fine-tune esp32s3 + PSRAM 8MB 9 cell PASS" | esp32s3 (3 hidden × 3 rank) | ✅ MLP 128 r=8 1,949μs (100 step = **0.20초**) / RAM_safe + sanity 9/9 PASS / gradient rel error 1.78e-10 / Adam 78 step 99.9954% loss 감소 / **13 보드 중 유일 학습 가능 칩 = on-device 학습 4번째 축 신설** |
| **21** | "+ esp-nn CNN LX7 가속" | esp32s3 | ✅ CNN 16/32 = **2.93~2.95×** (3계열 매트릭스 CNN 행 채움, ESP-DSP CNN strided 한계 우회) |
| **22** | "+ LoRA phase 분리 측정 → Adam dominance" | esp32s3 | ✅ Adam phase **60~92% dominant** (forward+backward 합보다 큼) — fast_adam 가속 trigger |
| **23** ⭐⭐⭐⭐ (v2.6) | "+ Adam optimizer fast_rsqrtf + bias precompute 가속" | esp32s3 | ✅ MLP 128 r=8 = **3.94× (1,949 → 495μs) / Tiny 0.05초 "즉시 학습" carrier** + MLP 4096 r=16 1.71× |
| **24** ❌ (negative) | "+ INT16 Adam state quantize → RAM 50% 절감" | esp32s3 | ❌ **1.65~4.25× 느림** (FP32 division ~10 cycles/elem × dynamic scale requantize 2/elem = ~20 cycles → R23 회피한 비용 재도입). RAM 50% 절감 확인 (실용 가치 0) |
| **25** ⭐⭐⭐⭐ (v2.6) | "+ CNN+LoRA KWS personalization" | esp32s3 | ✅ **C16 r=4 = 0.37초 "즉시 학습" carrier** + CNN forward 92~99% dominant → LoRA fine-tune 1~8% only = **"사실상 무료" 신규 finding** |
| **26** ⭐⭐⭐ (v2.7) | "+ KWS personalization 실제 정확도 검증 (mini_speech_commands 8 keyword × 1000 sample)" | esp32s3 + PC | ✅ baseline 78.7% / **어려운 화자 K=5 +11.4% improvement (max +23.1%) / catastrophic forgetting <1.1%** / **Selective personalization 신규 finding** (baseline <70% 사용자에게만 effect) |
| **27** ❌ (negative + 함정 #14 v3) | "+ FP16 Adam state RAM 50% 절감 carrier 대안" | esp32s3 | ❌ R23 baseline 우월 (R27/R23 1.08~1.88× 느림) but **R24 negative 우월 대안 입증 (R27 vs R24 1.37~2.25× 빠름)** / RAM 50% 절감 carrier 확인 / **함정 #14 v3 진단 정정**: ESP-IDF/cmake/Windows cmd.exe 결함 (Claude Code harness 책임 아님) |
| **28** ⭐⭐⭐ (v2.7) | "+ pca10056 Cortex-M4F + CMSIS-NN `arm_convolve_wrapper_s8` CNN 가속 (Optimistic 2~3×)" | pca10056 64MHz | ✅ ⭐⭐⭐ **CNN 32 = 14.02× 가속 (예측 5배 초과)** — im2col + SMLAD SIMD 가 LX7 ESP-DSP CNN strided 한계 (R17.5 1.00×) 완벽 압도 / MLP 3.26× / TF 1.85× |
| **29** ❌ (negative, v2.7) | "+ Multi-layer LoRA (마지막 + intermediate fc)" | esp32s3 | ❌ **-7.7~-9.3%** (single LoRA 우월, 표현력 trade-off 부정적) |

### 핵심 발견 (Stage 4 영업 카피 원료)

1. **smartphone(0.58×) → rpizero(26.65×) = 46× 스펙트럼** (CNN 128, 8 보드 1줄 정렬)
2. **8년 ARM 진화 = 46× 속도 차이** (ARMv6 → A77, rpizero → smartphone)
3. **Xtensa LX7 plain C는 ARM 대비 9~38× 느림** (INT8 SIMD intrinsics 미사용 시) — Round 9 의외 발견
4. **RISC-V vs Xtensa는 plain C에서 동급** (클럭 normalize 시 CNN 32 1.5× 우위 — Round 10)
5. **PSRAM 유무 = mandate RAM_safe 셀 결정타** (60% 격차 — Round 11)
6. **AI FanStick mandate 영업 카피 정량화**: MLP 1024 = 96ms / CNN 32 = 547ms / TF 484 = 255ms — 모두 1초 안. 6MB 이하 모델은 esp32s3에서 1초 응답 가능.
7. **응원봉 SLM 최종 권장**: INT8 + 1s threshold + single-core + **ESP-DSP dotprod** + ~100K params → **Korean-Small 154K (150KB) 적합** (SRAM 30%)
8. ⭐⭐⭐ **Round 17 결정타**: ESP-DSP `dsps_dp_s8_aes3` 활성 시 LX7 AI Vector Instruction MLP 13.4× / C3→S3+DSP 종합 **24.8× 가속** — AI FanStick C3 → S3-N16R8 양산 방향 5/8 결정 뒤집힘
9. ⭐ **Round 17.5 후속**: TF SRAM **10.8× 가속** (SLM 핵심 워크로드 MLP+Attention 모두 ~20× 가속) / CNN conv strided access는 dsps_dp_s8 적용 불가 (im2col 필요 또는 esp-nn 대안) / PSRAM 가득 모델은 가속 무효 또는 손해 (memory bottleneck) / **C3·esp32wroom·RISC-V에서 ESP-DSP 적용은 손해** (LX6/RISC-V ansi fallback 1.54× 느림)
10. **ESP-DSP 효과 = 3조건 곱** ⭐ (Round 17.5 매칭): LX7 AI Vector Instruction × 메모리 계층 (SRAM 우위) × 접근 패턴 (contiguous matvec) — 자세한 분석 `thoughts/2026-Q2/2026-05-21_esp-dsp-3조건-매칭.md`
11. **Cortex-M4F CMSIS-NN MLP +3.23× 가속** (Round 18, 5/22) — SMLAD `__SMLAD(__PKHBT(a,b,16), __PKHBT(c,d,16), acc)` DSP extension 활용. Optimistic 가설 (2.5~4×) 안에 적중. CNN/TF는 skeleton 미패치 (im2col 필요 또는 별도 conv API).
12. **LX7 단위 효율 5.64× Cortex-M4F 우위** ⭐⭐ (Round 18 클럭 normalize) — MLP 128 LX7 25,920 cycles vs M4F 146,240 cycles. **AI 가속 = ISA-specific instruction 폭 결정타** (LX7 128-bit AI vector > M4F 32-bit SMLAD). clock speed / vendor TOPS 광고가 아닌 instruction set design이 진짜 변수.
13. **pca10040 (nRF52832 64KB) 전셀 RAM wall** ⭐⭐ (Round 18 후속, 5/22 오후) — MLP/CNN/TF 12셀 모두 RAM wall (weights ~42KB+ > heap ~30KB 부족, CMSIS-NN static .bss 34KB 차지). **Round 14 plain C 100% 재현** = CMSIS-NN library 추가해도 RAM tier 한계 동일. **vendor "supports neural network frameworks" 광고 vs 실제 RAM 적합도 격차** 정량 박제. **AI 응용 = nRF52840 (256KB)+ 또는 ESP32-S3 (PSRAM 8MB) 필수**. nRF52832 = BLE-only / sensor-only 트랙 분리.
14. **Round 20 LoRA on-device 학습 4번째 축 신설** ⭐⭐ (5/23 야간, v2.5 종결) — esp32s3 + PSRAM 8MB 9 cell PASS, 13 보드 중 유일 학습 가능 칩. PC numpy 검증 (gradient rel error 1.78e-10 + Adam 78 step 99.9954% loss 감소).
15. **Round 23 fast_adam "즉시 학습" carrier** ⭐⭐⭐⭐ (5/23~24, v2.6) — Adam optimizer 5.87× 가속 (fast_rsqrtf + bias precompute). **Tiny MLP 128 r=8 = 100 step 0.05초** (R20 0.20초의 4× 추가 가속). AI FanStick Premium Plus 양산 trigger.
16. **Round 25 KWS personalization "사실상 무료" finding** ⭐⭐⭐⭐ (5/24, v2.6) — CNN+LoRA C16 r=4 = 0.37초 carrier. **CNN forward 92~99% dominant → LoRA fine-tune 1~8% only** = R23 fast_adam이 만든 "Adam이 너무 빨라 그림자 사라짐" 의외 결과.
17. **Round 26 Selective personalization 신규 finding** ⭐⭐⭐ (5/24, v2.7) — 실제 mini_speech_commands 8 keyword × 1,000 sample 검증. baseline 78.7% / **어려운 화자 (acc<70%) K=5 +11.4% improvement** (max +23.1%) / 카타스트로픽 포겟팅 <1.1%. **AI FanStick UX 결정**: baseline <70% 사용자에게만 "내 목소리로 학습할까요?" 자동 제안.
18. **Round 27 FP16 negative + 함정 #14 v3 진단 정정** ⭐⭐ (5/24, v2.7) — R23 baseline 우월 확정 (1.08~1.88× 느림) but R24 우월 대안 입증 (1.37~2.25× 빠름) + RAM 50% 절감 carrier 확인. **함정 #14 v3 진단 정정**: ESP-IDF/cmake/Windows cmd.exe `cmd /C "cd . && tool ... && cd ."` cwd 보존 결함 — 일반 PowerShell 에서도 동일 fail (Claude Code harness 책임 아님).
19. **Round 28 ⭐⭐⭐ M4F CMSIS-NN CNN 14× 가속 (예측 5배 초과)** (5/24, v2.7 종결) — pca10056 (Cortex-M4F @ 64MHz) + `arm_convolve_wrapper_s8` CNN 32 = **14.02× 가속**. ARM CMSIS-NN im2col + SMLAD SIMD 가 LX7 ESP-DSP CNN strided 한계 (R17.5 1.00×) 완벽 압도. **application별 SoC 결정 가이드 신설**: KWS=pca10056 14× / SLM=esp32s3 10.8× / Personalization=esp32s3 13.4×.
20. **Hybrid SoC carrier ⭐⭐ (5/24, v2.7 종결)** — KWS frontend (M4F CMSIS-NN 14×) + Personalization backend (esp32s3 LoRA 0.05초) = single SoC mindset 탈피. Stage 4 영업 자료 결정타.
21. **5 negative finding 누적 R&D 신뢰성 자산 (5/24)** — R19 (NPU 79~421×) + R24 (INT16 1.65~4.25×) + R27 (FP16 1.08~1.88×) + R29 (Multi-layer LoRA -7.7~-9.3%) + R28 (TF 1.85×만, attn_causal argmax 비가속). **R23 채택 결정이 4 대안 측정 비교 후 도출** = "vendor 광고 신뢰 X, 자체 측정 자산화" 영업 신뢰성.
22. **6조건 곱 진화 (5/24)** — AI 가속 = ISA × workload × 메모리 계층 × RAM tier × library selection × **on-device 학습 가능 여부**. R20/R23/R25 esp32s3 + PSRAM 8MB 가 4번째 축 (학습) 유일 검증 사례.

## vault 폴더 구조 (5/20 갱신)

```
/todo/onDevice_AI/                  ← 별도 git repo (private)
├── README.md / CLAUDE.md / 0_마스터플랜.md v2.0 (단일 출처)
├── 00_정의_OnDeviceAI.md           헌법 (5축 15질문)
├── log.md                          시간순 기록 (84.6KB)
│
├── hardware/                       ⭐ 13 보드 spec + matrix (esp32c6 5/20 신설)
│   ├── pc/ pc-windows/ rpi5/ rpi4/ rpi3/ rpizero/ tablet/ smartphone/
│   ├── esp32s3/ ⭐ esp32c6/ ⭐NEW
│   ├── esp32wroom/ pca10056/ pca10040/ (skeleton)
│   └── _README.md _matrix.md
│
├── 프로젝트_보드한계모델/          ⭐ 1차 mandate strand (5/17 신설)
│   ├── 00_계획서.md v2.3
│   ├── 0_마스터플랜.md v2.0 (단일 출처)
│   ├── _RESULTS_SCHEMA.md (측정 1회 → 7위치 cascading update)
│   ├── 아키텍처_3종_비교.md + .html (470줄 + 580줄 + SVG 3)
│   ├── src/                        ANSI C99 3 아키텍처 스켈레톤 (820줄, 외부 의존성 0)
│   ├── boards/ scripts/            ESP-IDF v5.5.1 + Zephyr v2.9.2 빌드 자동화
│   └── 03_보드별_실행/{보드명}/    각 보드 5+1 분할 (01목적·02test방법·03결과해석·04용도·05일지·06확장계획)
│
├── education/                      ⭐ 후계자 교육 13 파일 (5/17 신설, 영구)
│   └── 01~10 챕터 + HTML 시각가이드 (15 SVG, 3Blue1Brown 한국어 재구성)
│
├── microGPT/ aiFanStick_차세대/ 통합검증/ 시장조사/
│
├── business/                       제품 비즈니스 (5/15 흡수, 구 uttecBizWiki)
│   └── entities/AI_FanStick.md
│
└── _inbox/ .claude/ 작업보고서/
```

## ssh 머신 컨벤션

| alias | 실체 | OS / toolchain | 역할 |
|---|---|---|---|
| `ssh ubuntu` = `ssh mac` | MBP11,4 (uttecMac) | Ubuntu 22.04 + gcc 11.4 | x86 baseline |
| `ssh uttecRpi5` | Pi 5 (Tailscale) | Debian 13 + gcc 14.2 (asimddp) | ARM 최신 baseline |
| `ssh uttecRpi4` | Pi 4 Model B (Tailscale 100.112.133.101) | Debian 13 + gcc 14.2 (asimddp 없음) | ARM 1세대 비교 |
| `ssh uttecRpi3` | Pi 3 B+ (LAN 192.168.0.51) | Debian 13 + gcc 14.2 | ARM little 1세대 |
| (LAN) | Pi Zero W (192.168.0.53 USB OTG 동글) | Raspbian 12 + gcc 12.2 armhf | ARMv6 single |

## 진행 상태 (옛 Phase 1~4 + 새 보드한계모델)

| 트랙 | 상태 |
|---|---|
| Phase 0 vault 골격 | ✅ (5/7) |
| Phase 1A·1B microGPT PC | ✅ (5/8, Loss 3.37→2.65, 4192 params, INT8 4.1KB) |
| Phase 1B+ 모델 확장 시뮬레이션 | ✅ (5/8, Korean-Small 154K 권장) |
| **1차 mandate 전환** | ✅ (5/17, Phase 2~4 → 보드한계모델로 통합) |
| 보드한계모델 W0 (계획) | ✅ (5/17) |
| 보드한계모델 W1 (pc baseline) | ✅ (5/18, 18 PC-only baseline) |
| 보드한계모델 W2 (esp32s3) | ✅ (5/19, 5일 앞당김) |
| 보드한계모델 W3 (esp32c6 + esp32wroom + pca10056) | △ 1/3 (5/20 esp32c6 완료) |
| 보드한계모델 W4 (pca10040 + 모바일 W4 정식) | △ 모바일 5/19 앞당김, pca10040 미진행 |
| 보드한계모델 W5 (rpi family) | ✅ (5/19, 1개월 앞당김) |
| 보드한계모델 W6 종합 (04_종합_비교.md) | ⬜ (6/22~28) |
| Stage 4 영업 자산화 | ⬜ (6/29 W6 종료 익일) |

## vault 정책 (5/17~18 신설 박제)

1. **🔴 결단 마커**: Claude 응답 시 사용자 결단 필요 부분은 분리 박스 + 🔴 마커
2. **md + html 쌍**: 모든 설명문은 md + html 동시 작성 (`아키텍처_3종_비교.html` 스타일)
3. **단일 출처 원칙**: `0_마스터플랜.md` = 진행·실험·검증·읽기의 단일 출처. 충돌 시 본 문서 정답.
4. **점진적 backbone**: A(완료) → B(W1~W6 보드한계모델) → C(후속 응용) → ⛔ 정지선
5. **schema 통일**: 13 보드 모두 동일 `pc/` 양식 (01~06 분할)
6. **outbox-staging 잔존 청산**: 회신 도착 시 staging 정리

## 검증 → 영업 자산 흐름 (6/29 cascade 예정)

1. `영업/Stage4_OnDeviceAI_검토.md` § 3·4·6 — 보드한계모델 37셀 비교표 + Round 1~11 가설 변천
2. `entities/uttec-stage-package.md` — Stage 4 카피 갱신 (1인 1일 18셀 + 보드/컴파일러 8× + Xtensa 9~38× + PSRAM 결정타)
3. `entities/ai-fanstick.md` — 차세대 BOM 영향 + Korean-Small 154K 적합성 확정
4. 강사양성 Day 5 / 호오컨설팅 / 인프런 — Round 1~11 진행 과정 = 측정 과학 진행 과정 사례

## 영업 임팩트 (W6 종료 후 6/29~)

- Stage 4 첫 수주: 1,500만/4주 (한국기계 또는 임베디드 스타트업, ESP32 + AI 자산 보유)
- 위시캣 임베디드 IoT 공고: 본 vault src/ ANSI C 820줄 + 보드한계모델 비교표 인용 가능
- 강사양성 Day 5 + 호오컨설팅 + 인프런: 6개월 누계 2,000~3,500만

## 마케팅 정지선 (2026-05-08, 본 mandate 전환 후에도 유효)

본 vault는 **응원봉 양산 적용 트랙이 아니라 "회사의 기술 자산·B2B 영업 무기·PR 콘텐츠" 트랙**. 정지선 = **Phase 2 종료** = **현 보드한계모델 W6 종료 시점과 정렬**.

근거: microGPT 4K 파라미터 = 응원봉 사용자 기대 응답 품질에 6~7자릿수 미달. 응원봉 양산 방향은 newMvp 결론(Gemma 2B 하이브리드)으로 잠금.

자세한 의사결정: [[2026-05-08_응원봉-온디바이스AI-정지선]]

## 5/17~20 카드 흡수 lifecycle (5단계 모두 완료, 5/20)

myWiki `_inbox/pending/` → `_inbox/processed/` 이동 + done 회신 1장 발송:
- 2026-05-17-004: tablet 추가·smartphone·프로젝트_보드한계모델·education 13파일
- 2026-05-17-005: 마스터플랜 v2.0 + 보드한계모델 W1 wrap + 1차 mandate 전환
- 2026-05-18-002: 18 PC-only baseline + 응원봉 SLM 최종 권장
- 2026-05-19-001: v2.2 mandate 12보드 34셀 + W6 연장
- 2026-05-19-003: 1일 5보드 18셀 + Round 6 가설
- 2026-05-19-004: Round 7~9 + esp32s3 메인 타겟
- (5/20 새벽 esp32c6 + Round 10·11은 카드 없이 vault 직접 흡수, ondevice 측 외부 발송 부담 차단)

## 관련 페이지

- [[ai-fanstick]] — 5/21 갱신 (양산 방향 재전환 C3→S3+DSP+PSRAM SLM + Round 17/17.5 결정타)
- [[uttec-stage-package]] — 5/21 갱신 (Stage 4 카피 + ESP-DSP 24.8× 추가)
- [[On-Device AI]] — 핵심 기술 트렌드
- [[2026-05-08_응원봉-온디바이스AI-정지선]]
- [[2026-05-20_esp32-arm-family-스펙트럼]] — 매칭 패턴 박제 (Round 1~11 + ARM 8년 진화 + RISC-V vs Xtensa)
- [[2026-05-21_esp-dsp-3조건-매칭]] ⭐ — Round 17.5 매칭 패턴 (LX7 AI Vector × 메모리 계층 × 접근 패턴)
- [[2026-05-22_npu-vendor-광고-실측-격차]] ⭐⭐ — Round 19 결정타 패턴 (Eden NPU NNAPI 79~421× 손해 + 일반화 원칙)

## Mobile NPU 부적합 case — Round 19 결정타 (2026-05-22 흡수) ⭐⭐⭐

**Galaxy A51 5G Eden NPU NNAPI** 는 plain INT8 MLP 128~16384 전 범위에서 CPU Cortex-A77 + asimddp 대비 **79~421× 느림**.

- NNAPI device 정상 노출 (`eden-drv`, ACCELERATOR/NPU, EdenDriver_1_3, featureLevel=30)
- auto-pick = explicit `createForDevices(eden)` 동일 latency → NPU 이미 선택 중, dispatch 자체 비효율
- Samsung 2.1 TOPS 광고 vs 실측 격차

**원인**: NPU = 표준 ML model (MobileNet conv-dominant, batch>1) 전용. plain INT8 small dense = NPU dispatch overhead 큼. CPU asimddp `sdot` = 16 MACs/cycle 우월.

**영업 함의 (Stage 4 패키지)**:
- mobile NPU 적극 제안 X — MCU 가속 (ESP-DSP / CMSIS-NN) 매트릭스 우월
- 3계열 가속 매트릭스: LX7 ESP-DSP +13.4× (R17) / Cortex-M4F CMSIS-NN [예정 R18] / Eden NPU **‒79~421×** (R19 손해)

**본 vault skeleton application class 정의** (mlp/cnn/transformer + batch=1 + plain INT8):
- ✅ MCU 가속 (ESP-DSP/CMSIS-NN): 5~25× 일관
- ⚠️ Mobile NPU NNAPI: 손해 또는 효과 없음
- ✅ CPU SIMD (NDK clang `-O2` asimddp): NPU 보다 빠름

## MCU AI 가속 매트릭스 — 3계열 완성 (2026-05-22 Round 18 흡수) ⭐⭐⭐

3계열 AI 가속의 정량 매트릭스가 5/22 Round 18 측정으로 두 번째 축 채워져 **완성**.

| 계열 | 칩 / 가속 | MLP 128 plain → 가속 | 배속 | Round | 영업 적합 |
|---|---|---:|:-:|:-:|---|
| **MCU LX7** | esp32s3 + ESP-DSP `dsps_dp_s8_aes3` | 1,452μs → **108μs** | **⭐⭐⭐ 13.4×** | R17 (5/21) | AI FanStick 양산 (응원봉 / wearable / small SLM) |
| **MCU Cortex-M4F** | pca10056 + CMSIS-NN SMLAD | 7,367μs → **2,285μs** | **⭐⭐ 3.23×** | R18 (5/22) | B2B BLE+AI 통합 SoC (KWS / anomaly detection) |
| **Mobile NPU** | Galaxy A51 5G Eden NPU NNAPI | (CPU 0.18ms baseline) → 14~76ms | **⚠️ ‒79~421×** (손해) | R19 (5/22) | Stage 4 모바일에는 **부적합** (광고 vs 실측 격차) |

### 클럭 normalize — 단위 효율 비교 (5/22 신규)

| ISA | 클럭 | MLP 128 측정 | 클럭 normalize (cycles) | 단위 효율 (대비) |
|---|---|---:|---:|:-:|
| **LX7** (esp32s3) | 240MHz | 108μs (ESP-DSP `aes3`) | 25,920 | **5.64× M4F 대비 우위** ⭐ |
| Cortex-M4F (pca10056) | 64MHz | 2,285μs (CMSIS-NN SMLAD) | 146,240 | baseline |

→ AI 가속은 **ISA-specific instruction 폭이 결정타**: LX7 128-bit AI vector instruction (`dsps_dp_s8_aes3`) > M4F 32-bit DSP extension (SMLAD = 2 × 16-bit MAC). clock speed/vendor TOPS 광고가 아니라 instruction set design이 진짜 변수.

### Stage 4 칩 선택 가이드 매핑 (cascade)

본 매트릭스가 [[uttec-stage-package]] § Stage 4 칩 선택 가이드로 cascade:

- **응원봉 / wearable / small SLM** → ESP32-S3 + ESP-DSP (LX7 13.4× + PSRAM 8MB)
- **B2B BLE+AI 통합 SoC (KWS / anomaly detection)** → nRF52840 + CMSIS-NN (M4F 3.23×, **256KB RAM 필수**) ⭐ Round 18 정량 근거
- **저전력 BLE-only (AI 불가)** → **nRF52832 (64KB) — AI mandate 부적합, 5/22 후속 정량 박제** ⚠️
- **Mobile T3 / 표준 ML model (MobileNet 등)** → Mobile NPU NNAPI delegate (적합 application 한정)
- **본 vault skeleton (small dense, batch=1, INT8)** → CPU SIMD (asimddp / SMLAD) 또는 MCU 가속

### RAM tier 결정타 — AI 응용 ≠ MCU 라벨 (Round 18 후속 5/22 박제) ⭐⭐

vendor 광고 "Cortex-M4F + neural network frameworks 지원" 만으로 AI 응용 적합 단정 불가. **실제 RAM tier 적합도가 결정타**:

| RAM tier | 칩 예 | mandate 적합 | 비고 |
|---|---|:-:|---|
| **8MB+ PSRAM** | ESP32-S3 + PSRAM | ✅ 전셀 | SLM Korean-Small 154K + Stage 4 응원봉 양산 |
| **256KB SRAM** | nRF52840 (pca10056) | ✅ MLP 128 / TF 64 | B2B BLE+AI 통합 SoC + KWS / anomaly detection |
| **64KB SRAM** | nRF52832 (pca10040) | ❌ **전셀 wall** | **AI mandate 부적합** (CMSIS-NN .bss 34KB + heap < weights) — BLE/sensor-only 트랙 분리 |
| 512KB SRAM | esp32c6 | △ MLP 1024 wall | PSRAM 없음 → 60% 셀 한계 (Round 11 발견) |

→ "AI 가속 = ISA-specific instruction 폭 × workload class 매칭 × 메모리 계층 × **RAM tier 적합도**" **4조건 곱** (5/22 후속 4번째 조건 추가).

### Round 18 ⭐ 신규 발견 (5/22)

- **CMSIS-NN SMLAD 적용 = 3.23×** — Optimistic 가설 (2.5~4×) 범위 적중
- **CNN 32 / TF 64 = 1.01×** (skeleton 미패치) — strided access / matmul shape 표준 CMSIS-NN API와 호환 안 됨. im2col 또는 `arm_convolve_HWC_q7_basic` 별도 변환 필요
- **클럭 normalize LX7 5.64× M4F** — ISA 단위 효율 우위 정량화 (Stage 4 칩 선택 결정타)
- **Nordic 빌드 함정 5건 신규 박제** (gaps.md `## Round 18 Nordic 빌드·monitor 함정 패턴` 참조)

## 5계열 AI 가속 매트릭스 완성 (2026-05-26 Wave 10/11 흡수) ⭐⭐⭐

5/26 mandate v2.8 R30/R31/R33 흡수로 **ARM-A NEON+dotprod 행 + mobile clang vectorizer 정책 negative** 추가. 5계열 완성.

| 계열 | 하드웨어 | MLP | CNN | TF | 결정 application |
|---|---|:-:|:-:|:-:|---|
| **LX7 ESP-DSP** | esp32s3 240MHz | 13.4× | 1.00× (한계) | 10.8× SRAM | SLM / Personalization |
| **M4F CMSIS-NN** | pca10056 64MHz | 3.26× | ⭐ 14.02× | 1.85× | KWS / CNN application |
| **esp-nn** (R33) | esp32s3 240MHz | (-) | 2.93× | 3.78× / **2.62× PSRAM** | esp32s3 PSRAM SLM alternative |
| **ARM-A NEON+dotprod** ⭐⭐⭐ NEW | rpi5 A76 (gcc 14.2 Linux) | **8.35×** | 3.85× | **7.64×** | **Edge AI Gateway (rpi5 native)** |
| **Mobile A77 NEON+dotprod** ⚠️ NEW (R30 negative) | smartphone (clang 18 NDK) | **1.00×** ⚠️ | **0.98×** ⚠️ | **0.81×** ⚠️ | (사용 안 함, mobile NEON 가치 없음) |
| **NPU NNAPI** | Eden NPU | -79~421× | (-) | (-) | (사용 안 함) |

⭐ **R33 신규 finding (memory tier 분기)**: TF 64 SRAM은 ESP-DSP 우월 (381 vs 1,089μs) / TF 484 PSRAM은 esp-nn 우월 (270,527 vs 103,410μs **2.62×**). AI FanStick SLM (PSRAM 적재) 응답 시간 60% 단축.

⭐⭐ **R30/R31 toolchain vectorizer 정책 본질 (Wave 11)**: same asimddp HW + 같은 `-O3 -march=armv8.2-a+dotprod` flag로도 gcc 14.2 (rpi5)는 `sdot` 자동 vectorize → 6.7× 가속, clang 18 (NDK Android)는 `smlal` INT16 promote path → 0.97×. **6.9× gap = vectorizer 정책 차이**. mobile CPU/NPU 추가 SDK 도입 가치 없음 확정 (3 path 모두 negative). 자세히 [[2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질]].

⭐⭐⭐ **R34 Hybrid SoC PoC firmware**: 측정 → 실제 작동 firmware 변환 (16 cycle × 8 keyword × 양방향 ACK 100% / `demo_trace_v3.log` 28초). UART jumper 3-line 38400 bps. BOM 3 시나리오 + ASCII 회로도. Stage 4 영업 결정타.

## STM32H745 14번째 보드 + Stage 4 LAN path (2026-05-26 Wave 12/13 흡수) ⭐⭐⭐

- **본 vault 정통 = Zephyr** 합의 (5/25, Nordic + STM32 cross-vendor 통합) — ESP-IDF ↔ Zephyr 2-track 정착
- **14번째 보드 STM32H745I-DISCO 신규**: Cortex-M7 480MHz + M4 240MHz dual / 1MB + 8MB SDRAM / DP FPU + L1 cache + DSP intrinsics
- R36 baseline 12셀 sweep + LCD R/G/B PoC + USB CDC ACM streaming + Ethernet TCP echo + USB-CDC↔TCP Bridge (단일 firmware)
- **11 함정 single-day cluster (5/25)** + STM-12 minor (5/26, Zephyr API change) → 함정 47건 (Espressif 16 + Nordic 18 + NDK 1 + STM32 12)
- **carry-over 효과 정량화**: R36 3차 시도 → 본 PoC 1차 success (11 함정 박제 효과)
- **Stage 4 영업 path 확장**: USB CDC + LAN 동시 단일 firmware → **한국 산업 노드** (LAN 인프라 + STM32 선호) B2B path 추가
- 보드 영업 매칭 baseline: esp32-S3 → WiFi/BT / Nordic → BLE / **STM32H7 → 산업 LAN**
- 자세히 [[stm32h745-disco]] · [[2026-05-25_STM32H745-Zephyr-통합-cross-vendor]] · [[2026-05-26_STM32H745-LAN-path-Stage4-결정타]]

## 3계열 AI 가속 매트릭스 완성 (2026-05-24 R28 흡수) ⭐⭐⭐

| 계열 | 하드웨어 | MLP | CNN | TF | 결정 application |
|---|---|:-:|:-:|:-:|---|
| **LX7 ESP-DSP** | esp32s3 240MHz | **13.4×** | 1.00× (한계) | **10.8×** | SLM / Personalization |
| **M4F CMSIS-NN** | pca10056 64MHz | 3.26× | ⭐⭐⭐ **14.02×** | 1.85× | **KWS / CNN application** |
| **NPU NNAPI** | Eden NPU | ‒79~421× ❌ | (미측정) | (미측정) | (사용 안 함) |
| **esp-nn** | esp32s3 240MHz | (미측정) | 2.93× | (미측정) | esp32s3 alternative |

→ R28 예측 5배 초과 (Optimistic 2~3× → 14.02×) = ARM CMSIS-NN im2col + SMLAD SIMD 가 LX7 ESP-DSP CNN strided access 한계 완벽 압도. 자세히 [[2026-05-24_application별-SoC-결정-Hybrid-SoC]].

## On-device 학습 4번째 축 (2026-05-23 R20 + 5/24 R23/R25 흡수)

13 보드 한계모델 중 **esp32s3 + PSRAM 8MB 만 학습 가능** = 4번째 축 신설.

| tier | MLP 학습 (R23 fast_adam) | KWS personalization (R25 C16) |
|---|---|---|
| Tiny ⭐⭐⭐ | **0.05초** | **0.37초** |
| Small | 0.76초 | 0.55초 |
| Medium | 4.36초 | 1.59초 |
| Large | 8.17초 | 5.37초 |

Cloud GPT-4 API (3~10초) 대비 8~27× 빠름 + 외부 의존 0%. R26 selective personalization +11.4% 정확도 개선 (어려운 화자 K=5). [[ai-fanstick]] § Premium Plus 4 tier 참조.

## 5 negative finding 누적 (2026-05-24 R&D 신뢰성 자산)

| Round | finding | application 의미 |
|---|---|---|
| R19 | Eden NPU NNAPI -79~421× | smartphone NPU 비효율 |
| R24 | INT16 dynamic scale -1.65~4.25× | RAM 절감 carrier 미달 |
| R27 | FP16 R23 미달 -1.08~1.88× | R23 baseline 우월 |
| R29 | Multi-layer LoRA -7.7~-9.3% | single LoRA 우월 |
| **R28** | TF 1.85×만 (attn_causal argmax 비가속) | MLP/CNN 가속 대비 절반 |

→ R23 채택 결정이 4 대안 측정 비교 후 도출. 자세히 [[2026-05-24_negative-finding-누적-신뢰성-자산]].

## 빌드 함정 47건 누적 (2026-05-26 Wave 11/12/13 흡수 갱신)

| Vendor | 누적 | 신규 |
|---|:-:|---|
| Espressif (esp32s3) | **16** | (5/24 mandate v2.7 시점 박제 유지) |
| Nordic (Zephyr) | **18** | (5/24 mandate v2.7 시점 박제 유지) |
| **NDK (Android)** ⭐NEW | **1** | E1 — clang 18 vectorizer 정책 `+dotprod` flag 무효 (R30 Wave 11, sdot 자동 미선택) |
| **STM32 (STM32H745I-DISCO)** ⭐NEW | **12** | STM-1~11 single-day cluster (5/25 Wave 12) + STM-12 Zephyr 4.3 net_mgmt API change (5/26 Wave 13 minor) |
| **합계** | **47** | — |

→ entity: [[build-gotcha-inventory]] (5/26 47건 갱신).

## 메타

| 항목 | 값 |
|---|---|
| vault 시작 | 2026-05-07 |
| 1차 mandate 전환 | 2026-05-17 |
| 현재 진행률 | **14/14 보드 ✅ 100% + 5계열 매트릭스 완성 (5/26 megasession)** |
| mandate v2.5 종결 | 2026-05-23 야간 (Round 20 LoRA 7/7 ✅) |
| mandate v2.6 종결 | 2026-05-24 (R22 + R23 + R24 + R25, 4/4 ✅) |
| mandate v2.7 종결 ⭐⭐⭐ | 2026-05-24 (R26 + R27 + R28 + R29, 4/4 ✅, 12시간 소요) |
| **mandate v2.8 5/6 ✅** ⭐⭐⭐ | **2026-05-24~26 Wave 8/10/11** — R34 Hybrid SoC PoC firmware + R33 esp-nn SRAM/PSRAM 분기 + R32 64KB 6번째 negative + R31 rpi5 NEON 6.7× + R31.5 sdot 분리 + R30 mobile 0.97× 7번째 negative. 5계열 매트릭스 완성. 잔여 R35 한국어 KWS Phase 2 학습. |
| **STM32H745 14th 보드 + Stage 4 LAN path** ⭐⭐⭐ | **2026-05-25/26 Wave 12/13** — Zephyr cross-vendor 정통 + 11 함정 cluster + Ethernet/Bridge PoC. 한국 산업 노드 영업 path 추가. |
| W6 종료 예정 | 2026-06-22~28 |
| Stage 4 영업 자산화 | 2026-06-29 (W6 종료 익일) |
| 예상 매출 임팩트 | 6개월 2,000~3,500만 (Hybrid SoC + Edge AI Gateway + 산업 노드 carrier 추가 시 +α) |
| 본 entity 갱신 주기 | 카드 흡수 시마다 (5/26 megasession Wave 10/11/12/13 흡수 완료 — 다음 = R35 한국어 KWS 결과 or 영업 이벤트 발생 시) |
