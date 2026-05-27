---
title: UTTEC 영업 패키지 (4.5-Stage)
type: entity
created: 2026-05-05
updated: 2026-05-27 Wave 14 흡수 (R36 ✅ + mandate v2.9 종결 — Stage 4 시나리오 E STM32H7 산업 노드 정량 결과 박제 CMSIS-NN CNN 17.58× + Cortex-M tier 비교 매트릭스 + SLM 50~60MB 적재 가능 + 본 vault 6/6 mandate 모두 종결)
tags: [영업, 패키지, Stage, foundry, business-model, onDevice-검증완료, ESP-DSP, CMSIS-NN, 3계열매트릭스, 5계열매트릭스, application별-SoC, Hybrid-SoC, on-device-학습-4번째축, 6조건곱, mandate-v2.7-종결, mandate-v2.8-종결, mandate-v2.9-종결, 6mandate-모두종결, ARM-A-NEON, rpi5, Edge-AI-Gateway, STM32H745, 산업노드, LAN-path, vectorizer-정책, carry-over-효과, Cortex-M-tier-최강, SLM-적재]
links: [영업전략, Stage0_Core_Services_견적서, On-Device AI, Foundry 5층 아키텍처, onDevice-ai, ai-fanstick, build-gotcha-inventory, stm32h745-disco, 2026-05-20_esp32-arm-family-스펙트럼, 2026-05-21_esp-dsp-3조건-매칭, 2026-05-22_npu-vendor-광고-실측-격차, 2026-05-24_application별-SoC-결정-Hybrid-SoC, 2026-05-24_negative-finding-누적-신뢰성-자산, 2026-05-24_5계열-AI가속-매트릭스-완성, 2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질, 2026-05-26_STM32H745-LAN-path-Stage4-결정타, 2026-05-27_Cortex-M-tier-최강-AI-노드]
---

## ⭐⭐⭐ 2026-05-27 Wave 14 흡수 — Stage 4 시나리오 E STM32H7 산업 노드 정량 결과 + Cortex-M tier 비교 매트릭스

### R36 정량 결과 박제 (Stage 4 시나리오 E 갱신)

| 셀 | baseline | CMSIS-NN | 가속 | 영업 의미 |
|---|---|---|:-:|---|
| MLP 128 | 557μs | 272μs | 2.05× | M4F 3.23× 대비 baseline IPC 우월 |
| **CNN 32** | 238.6ms | 13.4ms | **⭐ 17.7×** | KWS / image classify Cortex-M tier 최강 |
| **CNN 64** | 959.9ms | 54.6ms | **⭐ 17.58×** | 큰 모델 일관된 가속 |
| TF 64 | 1.5ms | 1.1ms | 1.36× | TF dense 부분만 cmsis 적용 가능 |

### Cortex-M tier 비교 매트릭스 (영업 카피)

| 보드 | BOM | 클럭 | RAM | CNN 가속 | Stage 4 application |
|---|---:|---:|---:|:-:|---|
| pca10040 (M4F 64KB) | ~$8 | 64 MHz | 64 KB | RAM wall | (AI 부적합) |
| pca10056 (M4F + CMSIS-NN) | ~$15 | 64 MHz | 256 KB | 14.02× | KWS / B2B BLE+AI 통합 SoC |
| **stm32h745 (M7 + CMSIS-NN)** | **~$70** | **480 MHz** | **9.2 MB** | **⭐ 17.58×** | **KWS / 큰 CNN application / SLM 50~60MB 적재 / 한국 산업 LAN B2B** |

→ ⭐⭐⭐ "**Cortex-M 단일 칩에서 GPT-2 mini / Phi-2 mini Q4 50~60MB SLM 적재 가능**" (QSPI XIP 64MB + internal 1MB = 65MB) — Cortex-M tier 영업 결정타.

### Stage 4 시나리오 E 갱신 (5/27 박제)

| 시나리오 | 본질 | BOM | 영업 채널 |
|---|---|:-:|---|
| **E** ⭐⭐⭐ (5/26 신설, 5/27 정량 박제) | **STM32H7 산업 노드** (USB CDC + LAN + CMSIS-NN CNN 17.58× + SLM 50~60MB 적재) | **~$70** | **한국 산업 환경** (LAN 인프라 + STM32 선호) B2B + Cortex-M 단일 칩 SLM 적재 path |

### 본 vault 6/6 mandate 모두 종결 — 응용 진입 결단 ⭐⭐⭐

본 vault `프로젝트_보드한계모델/` 6 mandate (v2.4 + v2.5 + v2.6 + v2.7 + v2.8 + v2.9) 모두 종결 → **응용 진입 직전 마지막 측정 mandate 완성**. 사용자 결단 시점:
- **b 영업 데모 진입** — 5계열 매트릭스 + Hybrid SoC + Cortex-M tier 최강 결정타 → Stage 4 영업 자료 결정타 완비
- **c 양산 진입** — AI FanStick Premium Plus 4 tier (mandate v2.7 4 tier carrier) + STM32H7 B2B path 추가

자세히 [[stm32h745-disco]] · [[2026-05-27_Cortex-M-tier-최강-AI-노드]].

# UTTEC 영업 패키지 (4.5-Stage)

## 한 줄 정의

UTTEC의 단계별 영업 모델. **Foundry 1/100 가격 재현** 컨셉 + 단계별 도입으로 고객 부담 최소화.

## 진화 이력

| 날짜 | 이벤트 | 패키지 명 |
|---|---|---|
| 2026-05-05 | Stage 0 견적서 1페이지 작성 (한국기계·태명과학 발송) | 3.5-Stage 패키지 |
| 2026-05-07 | **Stage 4 (On-Device AI) 신설 결정** | **4.5-Stage 패키지** |
| (검토 중) | Stage -1 (자영업 진입 단계) 추가 후보 | (미정, 5.5-Stage 또는 별도 funnel) |

## Stage 매트릭스 (4.5-Stage)

| Stage | 단가 | 기간 | 산출물 | Foundry 매핑 |
|:-:|:-:|:-:|---|---|
| **Stage 0** | 500만 | 1주 | Core Services Starter Pack (Tailscale + Git + Obsidian + n8n) | 1층 (Core Services) |
| **Stage 1** | 300만 | 1주 | 13개 AI 도구 가이드 + 5 Track 코스 (교육) | 4층 (Analysis) 일부 |
| **Stage 2** | 2,500만 | 1.5개월 | 도메인 wiki 30~50p + n8n 워크플로우 5종 | 2~3층 (Data + Ontology) |
| **Stage 3** | 2,500만 | 1.5개월 | demo_live.html 진화형 운영 앱 | 5층 (Application) |
| **Stage 4** | **1,500만** | **4주** | **On-Device AI 보드 + 모델 + C++ 추론 + 통합** | **4층 보조 + Application 확장** |
| **Total** | **7,300만** | (단계별) | 풀 패키지 | Foundry 1~5층 풀 |

## 단가 의미 ("4.5"의 정의)

```
Stage 0 (0.5) + Stage 1 (1) + Stage 2 (1) + Stage 3 (1) + Stage 4 (1) = 4.5
```

→ Stage 0이 1주 단발(시범) 성격이라 0.5로 카운트, 나머지는 본격 단계로 1씩.

## 핵심 차별화 메시지

> **"Foundry급 인프라를 1/100 가격에 구축합니다."**

Palantir Foundry 라이선스 연 수억~수십억 → UTTEC 4.5-Stage 풀 7,300만.

## ⭐⭐⭐ Stage 4 5계열 매트릭스 완성 + 시나리오 D/E 신설 (2026-05-26 Wave 10/11/12/13 흡수)

### 5계열 AI 가속 매트릭스 (Stage 4 칩 선택 정량 근거)

| 계열 | 하드웨어 | MLP | CNN | TF | Stage 4 시나리오 |
|---|---|:-:|:-:|:-:|---|
| LX7 ESP-DSP | esp32s3 240MHz | 13.4× | 1.00× | 10.8× SRAM | A esp32s3 단일 |
| M4F CMSIS-NN | pca10056 64MHz | 3.26× | ⭐ **14×** | 1.85× | B Hybrid SoC / C M4F 단독 |
| esp-nn (R33) | esp32s3 240MHz | (-) | 2.93× | **2.62× PSRAM** | A 보조 (PSRAM 가속) |
| **ARM-A NEON+dotprod** ⭐⭐⭐ NEW | rpi5 A76 (gcc 14.2) | **8.35×** | 3.85× | **7.64×** | **D Edge AI Gateway 신설** |
| Mobile A77 NEON ⚠️ NEW (R30 negative) | smartphone (clang 18 NDK) | 1.00× | 0.98× | 0.81× | (사용 안 함, mobile 부적합) |
| NPU NNAPI | Eden NPU | -79~421× | (-) | (-) | (사용 안 함) |

### A/B/C/D/E 시나리오 매트릭스 (확장형)

| 시나리오 | 본질 | BOM | 소비자가 | 영업 채널 |
|---|---|:-:|:-:|---|
| A | esp32s3 단일 | $12.00 | 3~5만원 | K-POP B2C |
| **B** ⭐⭐⭐ | **Hybrid SoC** (KWS frontend M4F + Personalization backend esp32s3) | **$16.70** | **5~8만원** | **Stage 4 B2B (1,500만 패키지)** |
| C | M4F 단독 (nRF52833/40, **64KB 부적합 확정**) | $9.50 | 2~4만원 | Matter IoT |
| **D** ⭐⭐⭐ NEW (5/26) | **Edge AI Gateway** (rpi5 + gcc NEON+dotprod 6.7×) | **$15~30만** | $15~30만 | **Cloud 대안 정량 근거** — 한국기계·임베디드 스타트업 |
| **E** ⭐⭐⭐ NEW (5/26) | **STM32H7 산업 노드** (USB CDC + LAN 단일 firmware) | TBD | TBD | **한국 산업 환경** (LAN 인프라 + STM32 선호) B2B |

→ 시나리오 D = R31 rpi5 6.7× 가속 (Cloud GPT-4 API 외부 의존 0% 대안). 시나리오 E = STM32H745 LAN8742A onboard + Wave 13 PoC 검증.

### ⭐⭐ mobile NEON 3 path negative — Stage 4 mobile 결단

R30 Wave 11 흡수로 mobile CPU/NPU 추가 SDK 도입 가치 없음 확정:

| Path | 결과 | 의미 |
|---|---|---|
| Mobile NPU NNAPI (R19) | -79~421× | NPU dispatch 비효율 |
| Mobile NEON 명시 `+dotprod` (R30) | **0.97×** ⚠️ | clang vectorizer `smlal` INT16 path 선택 |
| Mobile CPU baseline (-O2) | 0.97×와 동등 | memory bandwidth bound |

→ **3 path 모두 negative → mobile CPU/NPU 추가 SDK 도입 가치 없음 확정**. UTTEC Stage 4 mobile은 **CPU plain (`-O2` asimddp) baseline만 사용**.

### ⭐ 보드 영업 매칭 baseline (5/26 Wave 13 박제)

| 보드 family | 강점 | 영업 시나리오 |
|---|---|---|
| esp32-S3 | WiFi + BT wireless | 응원봉 (B2C) |
| Nordic nRF52840 | BLE 강점 | B2B BLE+AI 통합 SoC (KWS / anomaly detection) |
| **STM32H7** ⭐ NEW | **산업 LAN 강점** | **한국 산업 환경 B2B 통합 노드** |
| rpi5 | Linux native + NEON+dotprod 6.7× | Edge AI Gateway (Cloud 대안) |

### ⭐ carry-over 효과 정량화 (Wave 13 입증, 영업 카피)

- 11 STM32 함정 박제 후 Wave 13 PoC 2건 진행 → 신규 함정 1건 (minor)만
- R36 sweep 3차 시도 → 본 PoC 1차 success
- **영업 카피: "vendor 함정 인벤토리 47건 (Espressif 16 + Nordic 18 + NDK 1 + STM32 12) 보유 → 외부 회사 도입 시 first-try success ratio 향상 + ~40~80시간 직접 디버깅 비용 절감"**

## ⭐⭐⭐ Stage 4 application별 SoC 결정 가이드 (2026-05-24 R28 + mandate v2.7 종결 흡수)

**Stage 4 영업 결정타 = single SoC 선택 mindset 탈피 → application별 정량 최적 칩 매칭 + Hybrid SoC carrier**

### application별 최적 SoC 매트릭스 (R28 흡수, 5/24)

| application | 최적 SoC | 가속 | Round |
|---|---|:-:|:-:|
| **KWS / Voice command** | **pca10056 (nRF52840) + CMSIS-NN `arm_convolve_wrapper_s8`** | **14.02×** ⭐⭐⭐ | R28 (5/24) |
| Anomaly detection (CNN-based) | pca10056 + CMSIS-NN | 14× | R28 (5/24) |
| **SLM / Transformer** | **esp32s3 + ESP-DSP** | **10.8×** | R17.5 (5/21) |
| **Personalization (MLP)** | **esp32s3 + ESP-DSP** | **13.4×** | R17 (5/21) |
| **on-device 학습 (LoRA)** | **esp32s3 + PSRAM 8MB** (유일) | **0.05초 Tiny** | R20/R23/R25 (5/23~24) |
| esp32s3 CNN alternative | esp32s3 + esp-nn | 2.93× | R21 (5/23) |
| Mobile Android 응용 | CPU plain (`-O2` asimddp) | NPU 대비 79~421× 빠름 | R19 (5/22) |

### ⭐⭐⭐ Stage 4 데모 자산 — R34 Hybrid SoC PoC firmware ready (5/24 Wave 8)

mandate v2.7 종결 직후 v2.8 R34 진입 = **실제 PoC firmware 양측 작성 완료** (측정 → 실제 시연 변환).

| 보드 | 역할 | firmware |
|---|---|---|
| pca10056 (nRF52840) | KWS frontend | `main_nrf_r34.c` (~200 line) — R28 CMSIS-NN CNN 14× |
| esp32s3 (LilyGo T-Display) | Personalization backend | `main_esp32_r34.c` (~180 line) — R25 cnn_lora + R23 fast_adam 0.05초 |

**총 latency**: ~230~550 ms (KWS detect 167ms + UART 10ms + personalization 50~370ms + ACK 5ms).

**A/B/C BOM 3 시나리오** = Stage 4 영업 자료 핵심:

| 시나리오 | BOM | 소비자가 | 영업 채널 |
|---|:-:|:-:|---|
| A — esp32s3 단일 | $12.00 | 3~5만원 | K-POP B2C |
| **B — Hybrid SoC** ⭐⭐⭐ | **$16.70** | **5~8만원** | **Stage 4 B2B (1,500만 패키지)** |
| C — M4F 단독 | $9.50 | 2~4만원 | Matter IoT |

→ Day 2 build/flash + Day 4 시연 영상 사용자 broker 대기. 완성 시 Stage 4 영업 자료 cascade Wave 9.

### ⭐⭐ Hybrid SoC carrier (single SoC mindset 탈피, 5/24)

| 역할 | 칩 + 가속 | 측정값 |
|---|---|---|
| **KWS frontend** (Voice command 우선 수신) | pca10056 (nRF52840) + CMSIS-NN | **14.02× 가속** (예측 5배 초과) |
| **Personalization backend** (사용자 응원 학습) | esp32s3 + ESP-DSP + LoRA | **0.05초 (Tiny)** |
| **SLM / 응답 generation** | esp32s3 + ESP-DSP | 10.8× |

→ "vendor 단일 칩 광고 X — application 별 정량 칩 매칭" UTTEC 차별화 영업 카피. 자세히 [[2026-05-24_application별-SoC-결정-Hybrid-SoC]].

### 5 negative finding 누적 = R&D 신뢰성 자산 (5/24)

| Round | finding |
|---|---|
| R19 | Eden NPU NNAPI -79~421× |
| R24 | INT16 dynamic scale -1.65~4.25× |
| R27 | FP16 R23 미달 -1.08~1.88× |
| R29 | Multi-layer LoRA -7.7~-9.3% |
| R28 | TF 1.85×만 (attn_causal argmax 비가속) |

→ "vendor 광고 신뢰 X — UTTEC 자체 측정 자산 기반 칩 선택" 영업 카피. 자세히 [[2026-05-24_negative-finding-누적-신뢰성-자산]].

### 6조건 곱 진화 (5/24)

**AI 가속 = ISA × workload × 메모리 계층 × RAM tier × library selection × on-device 학습 가능 여부**

| 조건 | 적용 |
|---|---|
| ISA | LX7 (128-bit AI vector) vs M4F (32-bit SMLAD) vs RISC-V (가속 없음) |
| workload | MLP (matmul) vs CNN (im2col + conv) vs TF (attention) |
| 메모리 계층 | SRAM (esp32s3 512KB) vs PSRAM (8MB) vs Flash |
| RAM tier | 64KB (BLE-only) vs 256KB (B2B AI) vs PSRAM (응원봉 SLM) |
| library | ESP-DSP (LX7) vs CMSIS-NN (M4F) vs esp-nn (LX7 CNN alt) vs NNAPI (NPU 부적합) |
| **on-device 학습 ⭐NEW** | **esp32s3 + PSRAM 8MB 유일 (4번째 축)** |

## Stage 4 칩 선택 가이드 (2026-05-22 Round 18·19 흡수 — 3계열 매트릭스 완성) ⭐⭐⭐

**Mobile NPU 적극 제안 X — MCU 가속 매트릭스로 전개 (5/22 두 번째 축 정량 채움)**

5/22 Round 19 (Eden NPU NNAPI 79~421× 손해) + Round 18 (Cortex-M4F CMSIS-NN +3.23×) 동시 흡수로 3계열 가속 매트릭스가 application class별 정량 근거를 갖춰 완성. "Mobile NPU 항상 빠르다" 통념 정량 반증 + MCU 가속 일관 우월 입증.

**application class별 권장 가속 (3계열 매트릭스 + RAM tier 분리)**:

| Application | 권장 가속 | 정량 근거 | 영업 패키지 |
|---|---|---|---|
| 응원봉 / wearable / small SLM (dense + batch=1 + INT8) | **ESP32-S3 + ESP-DSP + PSRAM 8MB** | **+13.4×** (R17 5/21) / C3→S3+DSP 종합 **+24.8×** | AI FanStick 양산 |
| **B2B BLE+AI 통합 SoC** (KWS / anomaly detection / 산업 IoT) | **Nordic nRF52840 (256KB) + CMSIS-NN** ⭐ | **+3.23×** (R18 5/22, SMLAD DSP extension) | **Stage 4 B2B 임베디드** (1순위 적용 후보) |
| **저전력 BLE-only (AI 불가)** ⚠️NEW | **Nordic nRF52832 (64KB) — AI mandate 부적합** | **전셀 RAM wall 12/12** (R18 후속 5/22 야간) | BLE/sensor-only 트랙 분리 |
| Mobile T3 응용 (Android 앱) | **CPU plain (`-O2` asimddp)** — NPU 사용 X | (R19 5/22) NPU 대비 79~421× 빠름 | Stage 4 모바일 |
| 표준 CV (MobileNet 등 conv-dominant + batch>1) | Mobile NPU 적합 | (드문 케이스, 별도 검토) | — |
| 본 vault skeleton (small dense, batch=1) | CPU SIMD (asimddp / SMLAD) | baseline | — |

**클럭 normalize 단위 효율 (5/22 Round 18 신규)** — Stage 4 칩 선택 결정타:

| ISA | 클럭 | MLP 128 측정 | 클럭 normalize cycles | 단위 효율 |
|---|---|---:|---:|:-:|
| **LX7** (esp32s3) | 240MHz | 108μs (ESP-DSP) | 25,920 | **5.64× M4F 우위** ⭐ |
| Cortex-M4F (pca10056) | 64MHz | 2,285μs (CMSIS-NN) | 146,240 | baseline |

→ AI 가속 = **ISA-specific instruction 폭 + workload class 매칭**이 결정타 (128-bit AI vector vs 32-bit SMLAD). vendor TOPS 광고가 아닌 instruction set design이 진짜 변수.

**영업 카피 결정타** (5/22 완성형 + 야간 후속):
- "벤치마크 없이 vendor 광고 신뢰 X — UTTEC 자체 측정 자산 (Round 17·18·18후속·19) 기반 칩 선택"
- "**B2B 임베디드 = nRF52840 (256KB) 필수** + CMSIS-NN +3.23× (정량 검증) — nRF52832 (64KB) 는 AI 부적합"
- "응원봉/wearable = ESP32-S3 + ESP-DSP +13.4× (정량 검증)"
- "Mobile NPU 일률 적용 X — application class 사전 확인 SOP 필수"
- "**AI 가속 = ISA × workload × 메모리 계층 × RAM tier 4조건 곱**" ⭐⭐ (5/22 야간 후속 4번째 조건 추가)
- "**AI 응용 ≠ MCU 라벨** — vendor 'supports neural network frameworks' 광고는 toolchain·library 호환만 검증, 실제 RAM 적합도는 sweep 측정 필수"

## 영업 흐름 (단계별 도입)

```
[잠재 고객 발굴]
  ↓
[Stage 0 견적서 발송] (영업/Stage0_Core_Services_견적서.md)
  ↓
[Stage 0 시범 운영] (1주 500만)
  ↓ (만족 시)
[Stage 1·2·3·4 단계별 도입] (총 6,800만)
  ↓ (불만족 시)
[1주 후 모든 자료 인계 후 종료]
```

→ **Stage 0이 진입 장벽을 낮춤** (1/10 가격 + 1주 단기), 그 후 단계별 확장.

## Stage별 산출물 상세

### Stage 0 — Core Services Starter Pack (500만)
- 산출물: Tailscale ACL + Git 표준 저장소 + Obsidian Vault + n8n 자체 호스팅 + Slack 통합 + 매뉴얼·영상
- 자세히: `영업/Stage0_Core_Services_견적서.md`

### Stage 1 — 교육 (300만)
- 산출물: 13개 AI 도구 가이드 + 5 Track 코스 (Track A~E) + 영상 강의
- 컨텐츠 출처: `aiStudy/introductionAi/` 13가이드

### Stage 2 — 위키 + 워크플로우 (2,500만)
- 산출물: 도메인 wiki 30~50 페이지 + n8n 워크플로우 5종 (영업·재고·CS·생산·품질 중)

### Stage 3 — 운영 앱 (2,500만)
- 산출물: demo_live.html 진화형 운영 앱 (단일 HTML 파일 1개로 시작 → 진화)

### Stage 4 — On-Device AI (1,500만, 신규 5/7, 검증 자산 5/20 정량화)
- 산출물: 보드(Hailo-8/Jetson Orin/ESP32-S3) + 모델(SLM/microGPT 변종) + C++ 추론 엔진 + 기존 Stage 0 통합
- 자세히: `영업/Stage4_OnDeviceAI_검토.md`

**검증 자산 (2026-05-20 [[onDevice-ai]] vault 흡수, W6 종료 6/29 1차 자산화 예정)**:

| 카피 | 보증 데이터 |
|---|---|
| "MCU급 SLM 추론 **1초 안**" | esp32s3 + PSRAM 8MB: MLP 1024 = 96ms / CNN 32 = 547ms / TF 484 = 255ms |
| "1인 4주 → **1인 1일 18셀 sweep** 입증" | 5/19 하루에 5보드(rpi5·rpi4·tablet·smartphone·pc-windows) × 12셀 측정 |
| "**보드/컴파일러 선택 = 8× 차이**" | clang+신세대(smartphone) vs gcc+구세대(rpi3) CNN 128 = 20×, 컴파일러 단독 4× |
| "**8년 ARM 진화 = 46× 속도 스펙트럼**" | smartphone(0.58×) ↔ rpizero(26.65×) CNN 128 |
| "**Xtensa LX7 plain C는 ARM 9~38× 느림**" | esp32s3 → rpi3·rpi4 비교 (SIMD 미사용 시) — Round 9 발견 |
| "**PSRAM 유무가 RAM_safe 셀 60% 결정**" | esp32c6(없음) 3 ↔ esp32s3(8MB) 5 — Round 11 |
| "외부 의존성 0 ANSI C 820줄 추론 코드" | `프로젝트_보드한계모델/src/` 자체 보유 (MLP·CNN·Transformer) |
| "Korean-Small 154K (150KB) esp32s3 적합" | INT8 + ESP-DSP dotprod 활성 시 ~150ms (Round 17 확정) |
| ⭐⭐⭐ "**ESP-DSP intrinsics 24.8× 가속** — C3→S3 칩 교체로 응답 150ms" | Round 17: `dsps_dp_s8_aes3` MLP 13.4× / TF 10.8× (Round 17.5) — 영업 결정타 |
| ⭐ "**ESP-DSP 효과 = 3조건 곱** (LX7 × SRAM × contiguous matvec)" | Round 17.5 매칭 — C3·esp32wroom·RISC-V는 ESP-DSP 손해 (적용 시 1.54× 느림). KWS는 esp-nn 별도 가속 |
| ⭐ "**외부 인터넷 0% 음성 명령**" | Korean-Small 154K INT8 + S3 PSRAM = ~150ms 응답 |
| ⭐⭐ "**nRF52840 + CMSIS-NN MLP +3.23× 가속** — B2B BLE+AI 통합 SoC 결정타" (5/22 신규) | Round 18: SMLAD DSP extension MLP 128 = 7,367μs → 2,285μs (Optimistic 가설 2.5~4× 적중) |
| ⭐⭐ "**3계열 AI 가속 매트릭스 완성** — application class별 정량 칩 선택" (5/22 신규) | LX7 ESP-DSP +13.4× / M4F CMSIS-NN +3.23× / Mobile NPU NNAPI ‒79~421× |
| ⭐ "**LX7 단위 효율 5.64× Cortex-M4F 우위** — clock 아닌 instruction set design 결정타" (5/22 신규) | Round 18 클럭 normalize: 25,920 cycles (LX7) vs 146,240 cycles (M4F) |
| ⭐⭐⭐ "**M4F CMSIS-NN CNN = 14× 가속 (예측 5배 초과)**" (5/24 신규) | Round 28: pca10056 + `arm_convolve_wrapper_s8` CNN 32 = 14.02× — KWS / anomaly detection application 결정 |
| ⭐⭐ "**Hybrid SoC = single SoC 선택 mindset 탈피**" (5/24 신규) | KWS frontend (M4F CMSIS-NN 14×) + Personalization backend (S3 LoRA 0.05초) — application 별 정량 칩 매칭 |
| ⭐⭐ "**Tiny 0.05초 즉시 학습 + KWS 0.37초 personalization + 어려운 사용자 +11.4% 정확도**" (5/24 신규) | R23 fast_adam + R25 KWS + R26 selective. Cloud GPT-4 (3~10초) 대비 8~27× 빠름 |
| ⭐⭐ "**4 negative finding 측정 검증 후 R23 양산 확정**" (5/24 신규) | NPU/INT16/FP16/Multi-layer LoRA 모두 negative — "vendor 광고 신뢰 X, 자체 측정 자산화" R&D 신뢰성 영업 |
| ⭐ "**6조건 곱 = ISA × workload × 메모리 × RAM tier × library × on-device 학습**" (5/24 신규) | mandate v2.7 4/4 ✅ 100% 종결 도달 (5/23 5조건 + 5/24 on-device 학습 4번째 축 신설) |
| ⭐⭐⭐ "**5계열 매트릭스 완성 — ARM-A NEON+dotprod 행 추가, 6.73× rpi5 가속**" (5/26 신규) | R31 (Wave 10): rpi5 A76 + gcc 14.2 + `+dotprod` flag만으로 MLP 11.75× / TF 7.64× / 평균 6.73× 가속. Stage 4 시나리오 D Edge AI Gateway 정량 근거 |
| ⭐⭐⭐ "**toolchain vectorizer 정책 = AI 가속 본질의 4번째 변수**" (5/26 신규) | R30/R31 (Wave 11): same asimddp HW + 같은 flag로 gcc 6.7× vs clang 0.97× = 6.9× gap. mobile CPU/NPU 추가 SDK 가치 없음 확정 (3 path negative) |
| ⭐⭐⭐ "**esp-nn TF PSRAM 2.62× = AI FanStick SLM 응답 60% 단축**" (5/26 신규) | R33 (Wave 10): TF 484 PSRAM 270,527 → 103,410μs. memory tier 분기 신규 finding (SRAM은 ESP-DSP / PSRAM은 esp-nn) |
| ⭐⭐⭐ "**STM32H7 = 한국 산업 노드 영업 결정타, USB CDC + LAN 단일 firmware**" (5/26 신규) | Wave 13: STM32H745 + LAN8742A onboard + DHCP 2.1s + Bridge PoC FLASH 150KB/RAM 80KB. 시나리오 E 신설 |
| ⭐⭐ "**carry-over 효과 = first-try success ratio 향상**" (5/26 신규) | Wave 12 11 함정 single-day cluster 박제 → Wave 13 PoC 1차 success (신규 1건 minor만) |
| ⭐⭐ "**Stage 4 시나리오 D Edge AI Gateway 신설**" (5/26 신규) | rpi5 gcc NEON 6.7× = Cloud 대안 정량 근거 ($15~30만원, 한국기계·임베디드 스타트업) |
| ⭐ "**빌드 함정 47건 인벤토리 — 외부 회사 도입 시 ~40~80시간 절감**" (5/26 신규) | Espressif 16 + Nordic 18 + NDK 1 + STM32 12 cross-vendor 누적 |

→ **Stage 4 카피 결정 메시지**: "1인이 4주에 ESP32 + Pi family + 모바일 13보드 한계 측정 1장 표 박제" — 임베디드 스타트업 컨설팅 패키지 차별화.

→ **AI FanStick C3→S3+DSP 영업 결정타 표** (Round 15+17 종합):

| 단계 | ESP32-C3 (양산) | ESP32-S3 + DSP (차세대) | 우위 |
|:-:|---:|---:|:-:|
| 1. 단순 칩 교체 (plain C) | 2,677us | 1,452us | 1.84× |
| 2. **+ ESP-DSP intrinsics** | 2,677us | **108us** | **24.8× ⭐⭐⭐** |

## 영업 시나리오

### 시나리오 A — 한국기계 (스마트팩토리)
- Stage 0 → Stage 1 → Stage 4 (Hailo-8 예측정비)
- 매출: 2,300만 ~ 풀스택 7,300만

### 시나리오 B — 자영업·1인 사업자
- Stage 0 → Stage 1
- 매출: 800만

### 시나리오 C — 임베디드 신생기업 ⭐ (2026-05-20 카피 정량화 확보)
- Stage 0 (선택) + Stage 4 단독
- 매출: 1,500 ~ 2,000만
- 영업 핵심: 13보드 한계표 + Round 1~11 가설 변천 + ANSI C 820줄
- 첫 수주 후보: 한국기계 + 임베디드 스타트업 (Stage 4 단독 진입)

### 시나리오 E — tablet 키오스크·표시기 ⭐ NEW (5/17 흡수, T2 슬롯 확보)
- Stage 0 + Stage 4 (tablet baseline 측정 자산)
- 매출: 1,500 ~ 2,000만
- 영업 핵심: "예산형 모바일 키오스크 + NPU 없이 추론" 차별화

### 시나리오 F — Edge AI Gateway ⭐⭐⭐ NEW (5/26 Wave 10 흡수, rpi5 NEON 6.7×)
- Stage 0 + Stage 4 (rpi5 + gcc NEON+dotprod 6.7× 측정 자산)
- 매출: 2,000 ~ 3,500만 (단가 $15~30만)
- 영업 핵심: "Cloud GPT-4 외부 의존 0% 대안 — rpi5 gcc native 6.7× 가속 정량 근거" + "mobile NEON 3 path 모두 negative 대조" + R31 vs R30 (6.9× gap toolchain vectorizer 정책 본질)
- 타겟: 한국기계·임베디드 스타트업·산업 IoT (LAN 인프라 보유)

### 시나리오 G — STM32H7 산업 노드 ⭐⭐⭐ NEW (5/26 Wave 13 흡수, USB CDC + LAN 단일 firmware)
- Stage 0 + Stage 4 (STM32H745 + LAN8742A + Bridge PoC 자산)
- 매출: 1,500 ~ 2,500만
- 영업 핵심: "한국 산업 환경 = LAN 인프라 + STM32 선호 → STM32H7 산업 노드 path 첫 사례" + "USB CDC + Ethernet 단일 firmware 동시 streaming" + "11 함정 cluster carry-over 1차 success"
- 타겟: 한국기계 (LAN 기반 Stage 4) + 산업 자동화 통합 SI

### 시나리오 D — 풀스택 (대형 고객)
- Stage 0 + 1 + 2 + 3 + 4 = 7,300만

## 고객 후보 (현재)

| 고객 | 단계 | 상태 |
|---|---|---|
| 한국기계 (15억 협력 진행 중) | Stage 0 PDF 발송 (5/5) | 회신 대기 |
| 태명과학 (스마트팩토리 제안 진행) | Stage 0 PDF 발송 (5/5) | 회신 대기 |

## 관련 페이지
- [[영업전략]] — 3대 사업 라인 + 정부지원 매트릭스 + 경쟁 분석
- [[Stage0_Core_Services_견적서]] — 1페이지 영업 자료
- [[On-Device AI]] — Stage 4 핵심 기술
- [[Foundry 5층 아키텍처]] — 참조 아키텍처
- [[uttec-edu]] — Stage 1 교육 콘텐츠 출처
- [[Memory MCP]] — Stage 0~2 도구
- [[Obsidian myWiki]] — Stage 0 핵심 도구

## 메타

| 항목 | 값 |
|---|---|
| 첫 견적서 발송 | 2026-05-05 (한국기계·태명과학) |
| 첫 매출 | (대기) |
| 매출 임팩트 (Stage 4 신설로) | +1,500만 (+26%, 풀스택 시) |
| 다음 갱신 | Stage -1 (자영업 진입 단계) 검토 시 또는 첫 수주 시 |
