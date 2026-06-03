---
title: AI FanStick (응원봉)
type: entity
created: 2026-04-19
updated: 2026-06-03 Path D 산업 응용 신설 (R50 Touch MNIST PoC carry — STM32H745 + LCD + touch + CMSIS-NN MNIST CNN INT8, BOM ~$30, K-POP 외 첫 응용 확장 = 키오스크/스마트팩토리 HMI/의료 input pad B2B narrative, PC sanity 99.41% PASS / 보드 INT8 ≥95% Step 1~5 carry)
tags: [프로젝트, 제품, 특허, 블루오션, 정지선, 창업프로젝트, onDevice-검증완료, 차세대-S3-DSP, 양산방향-재전환, 3계열매트릭스완성, 5계열매트릭스완성, Premium-Plus-4tier, 즉시학습-carrier, Hybrid-SoC, selective-personalization, mandate-v2.7-종결, mandate-v2.8-종결, mandate-v2.9-종결, mandate-v2.10-R38, 6mandate-모두종결, Edge-AI-Gateway, 산업노드, B2B, LAN-path, mobile-NEON-negative, Cortex-M-tier-최강, 17x-CNN-가속, SLM-적재, R37-positive-정정, asymmetric-multiprocessing, LiteRT, Jetson-Super, 영업카피-신뢰성-강화, QSPI-128MB-SFDP, SDRAM-penalty-zero, Phi-2-적재-실증, 3tier-메모리, Path-D-산업응용, LCD-touch-MNIST, 키오스크-HMI-의료inputpad]
links: [ai-direction, experience, me, projects, skills, strengths, onDevice-ai, build-gotcha-inventory, stm32h745-disco, oldProject, 2026-05-08_응원봉-온디바이스AI-정지선, 2026-05-09_이진서협업-창업프로젝트도전, 2026-05-20_esp32-arm-family-스펙트럼, 2026-05-21_esp-dsp-3조건-매칭, 2026-05-22_npu-vendor-광고-실측-격차, 2026-05-24_application별-SoC-결정-Hybrid-SoC, 2026-05-24_selective-personalization-pattern, 2026-05-24_negative-finding-누적-신뢰성-자산, 2026-05-24_5계열-AI가속-매트릭스-완성, 2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질, 2026-05-26_STM32H745-LAN-path-Stage4-결정타, 2026-05-27_Cortex-M-tier-최강-AI-노드, 2026-05-28_R36-R37-baseline-artifact-paired-check-fix, 2026-05-28_본vault-영업카피-신뢰성-강화, 2026-06-03_R50-touch-mnist-path-D-산업응용]
---

## 2026-06-03 Path D 산업 응용 path 신설 (R50 Touch MNIST PoC carry) ⭐⭐⭐

### R50 STM32H745 Touch MNIST 손글씨 PoC — AI FanStick K-POP 외 첫 응용 확장

ondevice-claude 카드 #2026-06-03-001 흡수. R48 IMU carry (MPU6050 미준비) → 사용자 신규 방향 결단으로 **R50 STM32H745I-DISCO LCD touch 손글씨 MNIST CNN inference PoC** 진입. 본 vault 첫 LCD+touch+CNN 통합 PoC.

### BOM 4-path 양산 자산 — Path D 신설

| Path | 칩 구성 | BOM | 영업 포지션 | 정량 근거 |
|:-:|---|---:|---|---|
| A | esp32s3 단독 | ~$25 | K-POP 양산 표준 | R26 carry 75% / R44 esp32s3 build PASS |
| B | esp32s3 + nRF52840 | ~$31 | K-POP Premium (BLE5 + AI 분리) | R44 verdict |
| B-2 | pca10056 (nRF52840) 단독 | ~$16 | K-POP 저가형 / OEM / 매스마켓 | R46 CMSIS-NN 3.14× (esp32s3 plain C 동급 latency) |
| **D** ⭐ NEW | **STM32H745 + LCD + touch + CMSIS-NN** | **~$30** | **산업 응용 — 키오스크 / 스마트팩토리 HMI / 의료 input pad B2B** | **R50 Step 0 PC sanity 99.41%** + R36 CNN 17.58× carry |

### R50 Step 0 PC sanity ✅ MNIST CNN INT8 99.41% PASS ⭐⭐⭐

- LeNet-5 변형 ~105K params / INT8 ~105KB / Cortex-M7 fit
- `artifacts/model_fp32.pt` 학습 완료
- 보드 INT8 ≥95% 목표 (Step 1~5 carry: R46 `calibrate_int8.py` carry → MNIST 변형 + INT8 양자화 + CMSIS-NN port → STM32 BSP touch + LCD canvas → stroke normalize + inference → 99_결론 + 영업 cascade)

### Path D 영업 카피 신규 ⭐⭐⭐

- ⭐⭐⭐ "**Cortex-M7 단일 chip + LCD + touch + CMSIS-NN MNIST CNN INT8 = 통합 산업 input pad** (BOM ~$30, 99.41% PC sanity / 보드 INT8 ≥95% 목표)" — Path D 결정타
- ⭐⭐⭐ "**5계열 AI 가속 매트릭스 본 vault 응용 진입 단계 도달**" — 측정 → 매트릭스 → 통합 → 응용 4단계 깊이 진화 (R26/R34/R36/R50 누적)
- ⭐⭐ "**키오스크 / 스마트팩토리 HMI / 의료 input pad B2B narrative** — 다른 1인 컨설팅·중소 OEM 대비 단일 chip 통합 차별화"
- ⭐⭐ "**임베디드 AI on-device 통합 PoC = 강사양성 사례 자산**" (R26 KWS + R34 Hybrid SoC + R36 STM32H745 + R50 LCD touch 누적, Day 5 모듈 carry)

### 영업 cascade 후속 (Step 5 cascade carry)

- 위시캣 키오스크/HMI/의료 input pad cluster 자동 매칭 SOP 발동 (결정 34)
- 의료 input pad 영역은 [[의료AI]] entity carry 후보 (인증 트랙 분리 필요, IEC 62304 등)
- [[강사양성_파일럿]] Day 5 모듈에 R50 통합 PoC 추가 후보

자세히 [[onDevice-ai]] § R50 + [[2026-06-03_R50-touch-mnist-path-D-산업응용]] + [[ai-direction]] § 결정 32~34 + [[위시캣활동]] § 키오스크 cluster.

---

## 2026-06-01 R44 양산 verdict + R46 CMSIS-NN 가속 + BOM 3-path 영업 자산 ⭐⭐⭐⭐⭐

### R44 esp32s3 + pca10056 3-board KWS 매트릭스 양산 verdict (ondevice-claude 카드 #2026-06-01-001 + #2026-06-01-002 megasession 흡수)

**핵심 finding**: pca10056 + CMSIS-NN ≈ esp32s3 plain C **동급 latency** ($15 M4F + 가속 = $5 LX7 plain C). 양산 결단: **esp32s3 메인 + pca10056 BLE 결합**.

### BOM 3-path 양산 자산 (영업 차별화 결정타)

| Path | 칩 구성 | BOM | 영업 포지션 | 정량 근거 |
|:-:|---|---:|---|---|
| **A** | esp32s3 단독 | ~$25 | 양산 표준 | R26 carry 75% / R44 esp32s3 build PASS |
| **B** | esp32s3 + nRF52840 | ~$31 | Premium (BLE5 + AI 분리) | R44 verdict |
| **B-2** ⭐ NEW | pca10056 (nRF52840) 단독 | ~$16 | **K-POP 저가형 / OEM / 매스마켓** | R46 CMSIS-NN 3.14× (esp32s3 plain C 동급 latency) |

### INT8 quantization 0pp 손실 ⭐⭐⭐ (영업 카피 결정타)

MLP 1024→128→8 symmetric per-tensor INT8 양자화:
- PC float32: **75.0%** (120/160) ↔ PC INT8 simulation: **75.0%** (120/160) → delta +0.00pp
- per_keyword 패턴 동일 (down/stop 85% / right 55%, R26 baseline 보존)

→ **AI FanStick 차세대 INT8 양산 path 사실상 무손실** 영업 카피. CMSIS-NN / ESP-DSP 활용 안전 확정.

### 5중 일치 75% — 모델 transfer + 양산 path 4 layer 무손실 검증 ⭐⭐⭐

| Layer | 환경 | 정확도 |
|---|---|---:|
| 1 | R26 PyTorch 원본 | 75.0% |
| 2 | R42 STM32 carry | 75.0% |
| 3 | R44 esp32s3 (plain C INT8) | 75.0% |
| 4 | R44 pca10056 (plain C) | 75.0% |
| 5 | R46 CMSIS-NN full FC | 75.0% (3.14× 가속) |

→ **"edge AI 모델 양산 path 4 layer 무손실 검증"** 강사양성 Day 5 / 정부지원 결정타 자료.

### esp32s3 Path B 검증 통과 (R44)

esp32_kws.bin 507KB: Flash .rodata 332KB (INT8 weights 132KB + MFCC 160KB) + .text 96KB / DRAM 13KB (520KB SRAM 중 **2.5%**) / IRAM 16KB → **PSRAM 불필요** = 부록 D Path B 양산 표준 정량 검증. AI FanStick 차세대 esp32s3 ($5) 메인 보드 가능성 강화.

### 영업 카피 신규 (Path B-2 + R46 CMSIS-NN)

- ⭐⭐⭐ "**nRF52840 단독 SoC + CMSIS-NN = ESP32-S3 plain C 동급 latency** (BOM $16, BLE5 + KWS 단일 칩)" — Path B-2 매스마켓·OEM 결정타
- ⭐⭐⭐ "**5중 일치 75% — 모델 transfer + INT8 + 보드 + library port 4 layer 무손실 검증**" — 양산 신뢰성 카피
- ⭐⭐ "API 단위 가속 본질 = fused operation (matmul + bias + requant) vs separate" — R45/R46 본질 결단 (CMSIS-DSP 1.077× 미미 / CMSIS-NN 3.14× 결정적 차이)

자세히 [[onDevice-ai]] § 6/1 R44/R45/R46 흡수 + [[2026-06-01_R44-3board-verdict-CMSIS-NN-fused]] + [[ai-direction]] § BOM Path B-2 + 가속 가설 검증 framework.

---

## 2026-05-29 R41 Path A 본격 진입 cascade — Stage 4 시나리오 E E1/E2/E3 분리 + E1 영업 자산 회복 ⭐⭐⭐⭐⭐

### 시나리오 E1 영업 자산 회복 path 확정 (ondevice-claude #2026-05-29-002 흡수)

옛 박제 (5/24 시점): "stm32h745 single chip + DMIC voice command 본질 불가능"
새 박제 (5/29 R41): ✅ **vanilla Zephyr STM32H7 + SAI4 + BDMA + mpxxdtyy 11.5/12 단계 PASS** + 본 vault custom Zephyr patch chain (binding 1 + driver 8 + overlay v3 + main.c) carry. 다음 세션 ACR1.DMAEN write protection 우회 patch 시 R41 본격 종결.

### 시나리오 E E1/E2/E3 분리 박제 ⭐⭐⭐

| 시나리오 | DMIC | ETH | 본질 | 영업 path |
|:-:|:-:|:-:|---|---|
| **E1** | ✅ | ❌ | Voice/KWS firmware 단독 | **Stage 4 응원봉 후속 PoC 메인 path** |
| **E2** | ❌ | ✅ | LAN AI 산업 노드 | uttec-stage-package 시나리오 G 별도 트랙 |
| **E3** | ✅ | ✅ | ⚠️ hw modification 필수 | Phase 4 ship 옵션 |

→ PC1+PE2 2핀 Ethernet 양방향 충돌 확정 (PC1 eth_mdc + PE2 eth_txd3) — MII 모드 활성 시 MEMS DMIC 절대 불가. 영업 카탈로그 = **E1 + E2 명시** (E3 별도).

### ⭐⭐⭐ 영업 카피 회복 (Stage 4 응원봉 후속 PoC path)

- ⭐⭐⭐ "**stm32h745 single chip + CMSIS-NN CNN 17.6× + DMIC voice command + 본 vault custom Zephyr patch chain R&D 자산**" — Cortex-M tier 최강 + R&D 차별화 (R41 본격 path 종결 시 carry)
- ⭐⭐⭐ "**vanilla Zephyr STM32H7 DMIC 정식 지원 0 → 본 vault patch chain 11.5/12 PASS 검증**" (governance 신뢰성 자산)
- ⭐⭐ "**Zephyr upstream PR contribution carrier**" (i2s_stm32_sai BDMA aware + mpxxdtyy STM32 H7 정식 지원) — 본 vault R&D R&D governance 외부 회사 영업 자산

자세히 [[stm32h745-disco]] § R41 absorb + [[2026-05-29_R41-Path-A-본격-진입-stm32h745-SAI4-BDMA]].

---

## 2026-05-28 R38 SDRAM+QSPI 정량 실증 cascade — Stage 4 시나리오 E Cortex-M tier 결정타 보강 ⭐⭐⭐⭐

### Cortex-M 단일 칩 SLM 적재 정량 실증 박제 (ondevice-claude #2026-05-28-002 흡수)

옛 박제: "Cortex-M 단일 칩에서 GPT-2 mini / Phi-2 mini Q4 (50~60MB) 적재 **가능** 가설" (QSPI 65MB)
새 박제: ✅ **정량 실증** + QSPI capacity 2배 박제 정정:

| 항목 | 옛 박제 (5/27) | 5/28 R38 실증 정정 |
|---|---|---|
| QSPI Flash XIP | 65 MB (internal 1 + QSPI 64) | **129 MB** (internal 1 + QSPI **128**) ⭐ SFDP 실측 |
| Phi-2 mini Q4 적재 | "50~60MB 가능" 가설 | ✅ **boot 3.22s 정량 실증** (50MB / 15.51 MB/s throughput) |
| multi-SLM capacity | 1 모델 (50~60MB) | **2× 모델 동시 적재 가능** (129MB / 50MB) |
| 3-tier 메모리 | (정의 안 됨) | DTCM 128KB (1.0×) + SDRAM 8MB (1.28×) + QSPI 128MB (15.51 MB/s) ⭐⭐ |
| D-cache 효과 | (정의 안 됨) | SDRAM 4.19× / DTCM 2.82× ⭐ |
| SDRAM weights MLP forward | (가설: SDRAM 적재 시 penalty 큼) | ⭐⭐⭐ **penalty 거의 zero** (latency ratio 18.14× < param ratio 20.29× = 11% 더 효율적) |

### ⭐⭐⭐ 영업 카피 신규 (Cortex-M tier 결정타)

- ⭐⭐⭐ "**Cortex-M 단일 칩에 Phi-2 mini Q4 SLM 50MB 적재 정량 실증 — boot 3.22s / 15.51 MB/s throughput**" (mandate v2.10 R38, 5/28)
- ⭐⭐⭐ "**SLM SDRAM 적재 = DTCM 적재와 거의 동등 효율** — D-cache 4.19× + ART + compute-bound dominance" (Phase D)
- ⭐⭐ "**stm32h745 QSPI 128MB = Cortex-M tier multi-SLM 2× 적재 가능**" (SFDP 실측, dts upstream 64MB 정정)
- ⭐⭐ "**3-tier 메모리 모델 정량 실증** (DTCM/SDRAM/QSPI XIP) — Cortex-M tier 최강 영업 카피"

### Stage 4 시나리오 E 5 항목 우위 (4 → 5 항목)

| # | 우위 | 정량 근거 |
|:-:|---|---|
| 1 | CMSIS-NN CNN 17.58× | R36 (5/27) |
| 2 | dual-core asymmetric multiprocessing (R34 Hybrid SoC carrier 단일 칩 실현) | R37 (5/28) |
| 3 | M7 baseline IPC gain 1.78× (dual-issue + L1 + ART) | R37 paired-check (5/28) |
| 4 | LCD + Ethernet + USB OTG FS + sensor I/O single-chip | Wave 13 PoC (5/26) |
| **5** ⭐⭐ NEW | **3-tier 메모리 정량 실증 + Phi-2 50MB 적재 boot 3.22s + SDRAM penalty zero** | **R38 (5/28)** |

자세히 [[stm32h745-disco]] § R38 absorb + [[2026-05-28_R38-stm32h745-SDRAM-QSPI-3tier-메모리-실증]].

---

## 2026-05-28 R37 정정 + 04_종합비교 영업카피 흡수 — Cortex-M tier 영업 가이드 정정 + 영업 카피 신뢰성 강화 ⭐⭐⭐

### Cortex-M tier 영업 가이드 정정 (R37 M4 단독 positive 정정 흡수)

옛 박제 ❌ (취소): "H745 M4 단독 권장 안 함 — effective ≈ pca10056 64MHz, BOM 더 비쌈"

✅ 정정 메시지:
- **H745 M4 단독도 정상** — pca10056 대비 3.71× 빠름 (240MHz 클럭 비례 정확)
- **M7이 same-chip 3.56× 추가 우월** → AI 단독 워크로드는 **M7 우선** 권장
- ⭐ **H745 진가 = M7 + M4 dual-core 동시 운영** (M7 AI inference + M4 sensor/control = **asymmetric multiprocessing**, 단일 칩에 R34 Hybrid SoC carrier 실현)
- ⭐ M7 baseline IPC gain 1.78× = Cortex-M7 카탈로그 정상치 (dual-issue + L1 + ART) — Cortex-M tier 최강 영업 정확성 강화

### 영업 카피 직결 정정 (04_종합비교_해설 49건 정정 중 영업 핵심)

#### 1. 외부 toolchain / 가격 갱신 (vendor 공식 발표)

| 영역 | 옛 박제 (영업 시 사용 금지) | 정정값 (5/28 영업 카피) |
|---|---|---|
| **TFLM 명명** | TensorFlow Lite Micro / TFLM | **LiteRT for Microcontrollers** (Google 2024-09 rebrand, https://ai.google.dev/edge/litert/microcontrollers/overview) |
| **Jetson Orin Nano** | $499 / 40 TOPS @ INT8 | **$249 / 67 TOPS @ INT8** (NVIDIA 2024-12 Super, Llama 3.1 8B 적재 baseline) |
| **Jetson AGX Orin 64GB** | $2,999 | **$2,499** |
| **Jetson AGX Thor** (NEW 2025) | (미박제) | **$3,499 / 2,070 FP4 TFLOPS / Blackwell GPU / 128GB** (humanoid robot 최강) |
| **rpi5 + Hailo HAT vs Orin Nano Super 비교** | 3.3× 가격 차이 ($150 vs $499) | **1.66× 가격 차이만** ($150 vs $249, 영업 결정타 정정) |
| **pca10040 Dev kit** | ~$50 | **$51~58** (Mouser/eBay 5/28 확인) |

#### 2. 본 vault 박제 정확화 (master cross-check)

| 영역 | 옛 박제 | 정정값 (5/28) |
|---|---|---|
| **stm32h745 QSPI Flash** | 16MB | **64MB Macronix MX25LM51245G** (512 Mbit Octal SPI/Octal DDR) |
| **stm32h745 SDRAM** | 16MB (sample c 주석 오류) | **8MB IS42S16400J** (ST UM2381 user manual + master 일치) |
| **stm32h745 RAM 총합** | 9.2 MB (불변) | DTCM 128 + ITCM 64 + AXI 512 + SRAM1-3 288 + SRAM4 64 + Backup 4 + SDRAM 8MB = **9.04 MB ≈ 9.2 라운드** |
| **Exynos 980** | 5nm | **8nm LPP** (Samsung 공식 datasheet) |
| **esp32s3 PSRAM** | "외장 PSRAM" 또는 "단일 chip 최대 SLM" | **in-package PSRAM 8MB Octal @ 80MHz (T3 tier SLM 1~5M params)** — stm32h745 (T4 tier SLM 50~60MB Q4) 별도 path 분리 |

#### 3. Stage 4 시나리오 권장 SoC 정정

| 시나리오 | 옛 박제 (분리 부족) | 정정값 (5/28) |
|---|---|---|
| **시나리오 C** (M4F 단독 ~$5 BOM) | nRF52833 (128KB) 또는 nRF52840 (256KB) 둘 다 권장 | **nRF52840 (pca10056, 본 vault 실측 ✅) 우선 권장 / nRF52833 (128KB) = spec 추정 중간 후보 (본 vault 미측정)** 분리 |
| **시나리오 D** (rpi5 + Hailo HAT) | $150 BOM | **$150 BOM 유지** — 단 Jetson Orin Nano Super $249 vs 1.66× 차이만 (대안 분석) |
| **시나리오 E** ⭐ NEW (stm32h745 산업 노드) | $70 BOM (옛 박제) | **$70~150 BOM** (산업 + 케이스 + I/O 포함 ~$150 정확) |

#### 4. R35 한국어 KWS carry 표현 영업 카피 정확화 ⭐⭐

옛 단순 카피 ❌: "한국어 KWS 정확도 우월" — **사실 부정확**.

정정:
- **personalization 속도 carry 100%** (esp32s3 0.37초 = 영어/한국어 동일 알고리즘) ✅
- **정확도 개선 carry 강도 50%** (R26 영어 K=5 +11.4% → R35 한국어 +5.38%)
- **8번째 negative finding 추가**: 한국어 KWS는 capacity 보강 무효 (MLP 130K vs CNN 35K 4× 차이 동일 ceiling -0.3%p)
- 영업 시 "personalization은 동작 / 정확도 carry는 50% 강도" 분리 박제 필수

#### 5. § 9 esp32s3 차세대 BOM (K-POP 시장)

- esp32s3 SLM + LoRA → **BOM $10 / retail $25~50** (K-POP 시장 정량 박제)
- § 6 esp32c3 → esp32s3 Round 15 정량 근거: **+$1.5/대 × 5만 대 = +$75k 양산 BOM** (5/8 정지선 정정 근거)

### 영업 카피 † footnote 표준 신설 (본 vault 미측정 명시)

본 vault § 2~3 TinyML 6 case 매트릭스 (anomaly / gesture / fall / 환경 / 이미지 / CNN 등) — **본 vault 미측정 외부 추정**:
- "anomaly ~10KB / gesture ~15KB / fall ~5KB" 등 모델 크기 박제 = TinyML Foundation / Edge Impulse / LiteRT 공식 example 기준 추정
- **영업 시 † footnote 필수**: "본 vault 미측정, 외부 TinyML 표준 자료 추정. 실제 model architect별 ±2×~5× 범위"

### vendor 광고 cross-check 정책 강화 5/28 ⭐⭐⭐

- "vendor 광고 신뢰 X UTTEC 자체 측정 자산" 영업 메시지 강화
- 본 vault Round 1~37 누적 박제 → 모든 영업 카피 = 본 vault § 2-1 표 + § 3 비교 짝 표 + § 14-x Round 결론 cross-reference 필수
- 영업 시 모호 카피 ("AI 가속 가능") 금지 → 정량 박제 ("Round X: 변수 Y → ratio Z×") 사용 필수
- **5계열 AI 가속 매트릭스** = 본 vault 영업 결정타 자산 (CMSIS-NN 14×/17.6× / ESP-DSP 13.4× / esp-nn 2.93× / NEON+dotprod 6.7× / NPU R19 negative)
- **6 negative finding** (R19 NPU / R24 INT16 Adam / R27 FP16 / R29 Multi-layer LoRA / R28 TF / R32 64KB / R30 mobile clang dotprod) = R&D 신뢰성 영업 자산 — **R37 NEGATIVE에서 제외 ✅ (positive 정정)**

자세히 [[2026-05-28_본vault-영업카피-신뢰성-강화]] + [[2026-05-28_R36-R37-baseline-artifact-paired-check-fix]].

---

## 2026-05-27 R35 한국어 KWS detail 흡수 — 영업 카피 정확성 박제 ⭐⭐⭐

### R35 한국어 path 박제 (영업 카피 정확성 필수)

본 vault Wave 14 흡수에서 R35는 부분 박제만. detail 흡수로 영업 정확성 확보:

| 가설 | 임계값 | 측정 | 판정 |
|---|---|---|:-:|
| H1 한국어 baseline ≥ 70% | ≥ 70% | MLP 48.3% / CNN 48.0% | **❌ FAIL** |
| H1' 어려운 화자 +5% | +5% | **CNN +5.38%** (improved 70%) | ✅ PASS |
| H2 LoRA K=5 +5% | +5% | CNN +5.38% | ✅ PASS |
| H4 esp32s3 inference < 30ms | < 30ms | 52.9ms (R25 carry) | ❌ FAIL (학술) |
| **H4' personalization total < 1초** ⭐ | < 1초 | **0.37초** (R25 carry) | **✅ PASS** |

### R35 3대 finding (영업 직결)

1. **architecture 보강 무효** — MLP 130K vs CNN 35K (4× 차이) 동일 ceiling (-0.3%p) → 한국어 KWS는 capacity 보강 불가 본질 한계
2. **CNN LoRA carrier 부분 carry-over** — K=5 +5.38% / K=10 +6.60%. R26 영어 +11.4%의 **50%** = 절대 수치는 약하나 방향성 ✅
3. **esp32s3 latency carrier 완전 carry-over** — R35 CNN ↔ R25 C16 r=4 architecture 1:1 → **personalization total 0.37초 (외부 0%)**

### ⚠️ 영업 카피 금지 (정확성 필수)

| 금지 카피 | 이유 |
|---|---|
| ~~"한국어 KWS baseline 78.7% 정확도"~~ | R26 영어 baseline은 한국어 1:1 carry 불가 (48% ceiling). 실제 한국어 ≈ 48% |
| ~~"한국어 KWS LoRA +11.4% 정확도 향상"~~ | R26 영어 +11.4% 카피 금지. 한국어 CNN LoRA = +5.38% (50% 강도) |
| ~~"capacity 보강으로 한국어 정확도 향상"~~ | MLP↔CNN 본질 ceiling 동일, capacity 보강 무효 |

### ✅ 영업 카피 정확 박제

- ⭐ "**esp32s3 personalization total 0.37초 — Cloud GPT-4 API 대비 8~27× 빠름 (외부 의존 0%)**" (한국어 100% carry)
- ⭐ "**한국어 응원봉 명령 LoRA personalization +5.38% 정확도 향상**" (CNN LoRA K=5)
- ⭐ "**KsponSpeech 23,731 WAV × 8 keyword × 496 화자 dataset 보유**" (R26 영어 8,000 sample 대비 3× 풍부, 화자 수 ~500 동등)

### dataset 자산화

- **KsponSpeech 한국어 일반 대화 corpus + wav2vec2-large-xlsr-korean + ctc-segmentation 추출 first-success 패턴**
- 8 keyword UX 매핑: 네(확인) / 아니(취소) / 좋아 / 싫어 / 다시(replay) / 가자(start) / 잠깐(pause) / 꺼(OFF)
- **53× 불균형** (아니 14,986 ↔ 꺼 281) → Phase 2 class weight balancing 필수

### mandate v2.9 후속 검증 후보

- R35 한국어 모델 + esp-nn 가속 (R21 carry) → H4 < 30ms 검증 (Cortex-M7 R36 + 한국어 esp-nn 후속 가능)
- R35 본질 한계 원인 검증 (KsponSpeech 일반 대화 vs KWS-specific 녹음 본질 차이)

---

## 2026-05-27 Wave 14 흡수 — Cortex-M7 tier 영업 메시지 ⭐⭐⭐

### R36 STM32H745 + CMSIS-NN 영업 carry

| 항목 | 값 | 영업 의미 |
|---|---|---|
| CNN 32 가속 | **17.7×** ⭐⭐⭐ | KWS / image classify Cortex-M tier 최강 |
| CNN 64 가속 | **17.58×** ⭐⭐⭐ | 큰 모델도 일관된 ~17.6× — pca10056 14.02× 상회 25% |
| RW RAM | **9.2 MB** (DTCM 128 + ITCM 64 + AXI 512 + SRAM1-3 288 + SRAM4 64 + SDRAM2 8192) | esp32s3 PSRAM 8MB 동급 |
| Flash XIP | **65 MB** (internal 1 + QSPI 64) | **GPT-2 mini / Phi-2 mini Q4 (50~60MB) 적재 가능** |
| 클럭 | 480 MHz | M4F 64MHz × 7.5× |
| BOM | ~$70 | Cortex-M 단일 칩 SLM 적재 + CNN 17× — 신규 영업 path |

### 마케팅 카피 추가 (5/27)

- ⭐⭐⭐ "**Cortex-M7 + CMSIS-NN CNN 17.58× — pca10056 M4F 14.02× 상회 25%**" (Cortex-M tier 최강 AI 노드)
- ⭐⭐⭐ "**Cortex-M 단일 칩에서 GPT-2 mini / Phi-2 mini Q4 50~60MB SLM 적재 가능**" (STM32H745 QSPI XIP 65MB)
- ⭐⭐ "**본 vault 6/6 mandate 모두 종결 — 응용 진입 직전 마지막 측정 mandate 완성**" (영업·양산 결단 trigger 준비 완료)

### 응원봉 후속 PoC path (Cortex-M7)

- 기존: esp32s3 + ESP-DSP + LoRA (mandate v2.7 4 tier)
- 신규 path: **STM32H745 + CMSIS-NN CNN 17.6× + USB CDC + LCD R/G/B + Ethernet** (Wave 13+14 PoC stack 박제 완료)
- 한국 산업 LAN 환경 = AI FanStick B2B 산업 노드 path (응원봉 B2C 외 추가 channel)

자세히 [[stm32h745-disco]] · [[2026-05-27_Cortex-M-tier-최강-AI-노드]].

# AI FanStick (응원봉)

## 한 줄 정의
AI 음성 비서 + LED 응원봉 + BLE 통합 제품. K-POP 1.5억+ 팬덤 타겟. **특허 출원 완료.** **5/24 mandate v2.7 4/4 ✅ 100% 종결 + Premium Plus 4 tier 양산 trigger 완성 + 5/26 mandate v2.8 5/6 ✅ + 5계열 매트릭스 완성 + Stage 4 시나리오 D Edge AI Gateway + STM32H745 산업 노드 path 신설**.

## 2026-05-26 Wave 10/11/12/13 흡수 — 5계열 매트릭스 완성 + 시나리오 D/E 신설 ⭐⭐⭐

### Wave 10 (5/24) — R34 Hybrid SoC PoC firmware 실작동 + R33 esp-nn PSRAM 2.62× + R31 rpi5 NEON 6.7×

| Round | 핵심 | 영업 영향 |
|---|---|---|
| R34 ⭐⭐⭐ | Hybrid SoC PoC firmware 실작동 (16 cycle × 8 keyword × ACK 100%, UART jumper 38400 bps) | Stage 4 시나리오 B Hybrid SoC 시연 trace 박제 ✅ |
| R33 ⭐⭐ | esp-nn TF 484 PSRAM 2.62× (ESP-DSP 대비) — **memory tier 분기 신규 finding** | AI FanStick SLM (PSRAM 적재) 응답 시간 60% 단축 |
| R32 | pca10040 64KB 부적합 6번째 negative | Stage 4 시나리오 C nRF52833/40 권장 필수 |
| R31 ⭐⭐⭐ | rpi5 ARM NEON+dotprod 6.73× (GCC 14.2 + flag만으로) | **Stage 4 시나리오 D Edge AI Gateway 신설** ($15~30만원, Cloud 대안 정량 근거) |
| R31.5 | A72 vs A76 sdot 효과 분리 (dense 2.6~3.7× / strided 동등) | CNN strided 한계 cross-vendor 일관 (LX7 + ARM-A) |

### Wave 11 (5/24) — R30 mobile NEON 7번째 negative

- Galaxy A51 5G NDK clang 18 `-O3 -march=armv8.2-a+dotprod` 12셀 평균 **0.97×** = 가속 효과 없음
- rpi5 gcc 6.7× vs smartphone clang 0.97× = **6.9× gap 본질 = toolchain vectorizer 정책 차이**
- 3 mobile 가속 path 모두 negative (NPU + NEON 명시 + baseline)
- **마케팅 카피 강화**: mobile NEON 1.0× 대비 MCU 가속 13.4~14× = **14×↑ 우월성 정량 근거**
- 자세히 [[2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질]]

### Wave 12/13 (5/25~26) — STM32H745 14번째 보드 + Stage 4 산업 노드 path 신설

- 본 vault 정통 = Zephyr 통합 (Nordic + STM32)
- STM32H745I-DISCO 신규 (Cortex-M7 480MHz + M4 240MHz dual / 1MB + 8MB SDRAM)
- USB CDC + LAN **단일 firmware** 동시 streaming → **B2B 산업 노드 영업 path 추가** (한국기계 등 LAN 인프라 영업)
- 응원봉 후속 PoC 가능 path: Cortex-M7 + USB CDC streaming + LCD R/G/B 기반
- 보드 영업 매칭 baseline: esp32-S3 → WiFi/BT / Nordic → BLE / **STM32H7 → 산업 LAN**
- 자세히 [[stm32h745-disco]] · [[2026-05-26_STM32H745-LAN-path-Stage4-결정타]]

### 마케팅 카피 추가 (5/26)

- ⭐⭐⭐ "**rpi5 gcc NEON 6.7× vs mobile clang 0.97× = 6.9× gap, toolchain vectorizer 정책이 본질**" (R30/R31 cross-vendor)
- ⭐⭐⭐ "**Mobile NPU + NEON + baseline 3 path 모두 negative — UTTEC MCU 가속이 14× 우월**" (R19 + R30 누적)
- ⭐⭐⭐ "**esp-nn TF PSRAM 2.62× 가속 = SLM 응답 60% 단축**" (R33 신규 finding)
- ⭐⭐ "**Stage 4 시나리오 D Edge AI Gateway**" — Cloud 대안 정량 근거 ($15~30만원, rpi5 gcc native)
- ⭐⭐ "**STM32H745 산업 노드 path = USB CDC + LAN 단일 firmware**" — 한국 산업 환경 B2B 영업
- ⭐⭐ "**11 함정 cluster 박제 후 1차 success**" — vendor 함정 인벤토리 47건 carry-over 효과 정량화

## 2026-05-24 megasession — Premium Plus 4 tier 양산 trigger 완성 ⭐⭐⭐⭐ (mandate v2.5 + v2.6 + v2.7 종결 흡수)

## 2026-05-24 megasession — Premium Plus 4 tier 양산 trigger 완성 ⭐⭐⭐⭐ (mandate v2.5 + v2.6 + v2.7 종결 흡수)

### Premium Plus 4 tier 양산 라인업 (R23 fast_adam + R25 KWS + R26 selective 결합)

| tier | MLP 학습 (R23) | KWS personalization (R25 C16) | 정확도 개선 (R26) | 종합 carrier |
|---|---|---|---|---|
| **Tiny** ⭐⭐⭐ | **0.05 초** | **0.37 초** | +11.4% (어려운 화자만) | "즉시 학습 + 음성 personalization" |
| Small | 0.76 초 | 0.55 초 | +5~10% | "5 응원 + 음성 1초" |
| Medium | 4.36 초 | 1.59 초 | +5~10% | "20 응원 + 음성 4초" |
| Large | 8.17 초 | 5.37 초 | +5~10% | "전체 personalization 8초" |

- **Cloud GPT-4 API (3~10초) 대비 8~27× 빠름** + 외부 인터넷 0%
- **R26 Selective personalization 신규 finding** (5/24): baseline 정확도 <70% 사용자에게만 자동 제안 — "내 목소리로 학습할까요?" UX trigger
- 카타스트로픽 포겟팅 <1.1% ✅

### ⭐⭐⭐ R34 Hybrid SoC PoC firmware ready (5/24 Wave 8, mandate v2.8 진입)

**측정 → 실제 PoC firmware 변환 완료** (R28 정량 매트릭스 → 실제 양측 firmware):

| 보드 | 역할 | firmware | 라인 수 | 핵심 자산 |
|---|---|---|---|---|
| **pca10056 (nRF52840)** | KWS frontend | `main_nrf_r34.c` | ~200 | R28 CMSIS-NN CNN 14× 가속 |
| **esp32s3 (LilyGo T-Display)** | Personalization backend | `main_esp32_r34.c` | ~180 | R25 cnn_lora_skeleton + R23 fast_adam 0.05초 |

**통신**: UART 3-line jumper (P1.02/P1.01/GND ↔ GPIO 18/17/GND), 38400 bps, 8N1, no flow control. 1 byte exchange (keyword index 0~7 / ACK·error).

**응답 시간 예상 (R28 + R25 실측 데이터 기반)**:

| 단계 | 시간 |
|---|---:|
| pca10056 KWS detect (R28 CMSIS-NN CNN 32) | 167 ms |
| UART transit (1 byte + overhead) | ~10 ms |
| esp32s3 personalization 1-step (R23 fast_adam Tiny/Small) | 50~370 ms |
| UART ACK | ~5 ms |
| **총 wake word → backend ACK latency** | **~230~550 ms** |

### A/B/C BOM 3 시나리오 (Stage 4 영업 자료 핵심, 5/24 Wave 8)

| 시나리오 | 본질 | BOM | 소비자가 | 영업 채널 |
|---|---|:-:|:-:|---|
| A | esp32s3 단일 | $12.00 | 3~5만원 | K-POP B2C |
| **B** ⭐⭐⭐ | **Hybrid SoC** | **$16.70** | **5~8만원** | **Stage 4 B2B** |
| C | M4F 단독 | $9.50 | 2~4만원 | Matter IoT |

→ 시나리오 B = mandate v2.4~v2.7 (4 mandate) 누적 결과 100% 활용 = Stage 4 패키지 1,500만원 가치의 정량 근거. Day 4 시연 영상 사용자 broker 대기.

### ⭐⭐ Hybrid SoC carrier (5/24 R28 흡수, single SoC mindset 탈피)

| 역할 | 칩 + 가속 | 측정값 |
|---|---|---|
| **KWS frontend** (Voice command) | pca10056 (nRF52840) + CMSIS-NN `arm_convolve_wrapper_s8` | **14.02× 가속** (예측 5배 초과) |
| **Personalization backend** (사용자 응원 학습) | esp32s3 + ESP-DSP + LoRA | 0.05초 (Tiny) |

→ KWS 우선 수신 (M4F 저전력 + 14× 가속) + 학습/SLM 응답은 esp32s3 위임. UTTEC Stage 4 영업 결정타.

### 양산 확정 = R23 fast_adam (4 negative finding 측정 검증)

| 대안 | 결과 | 차이 |
|---|---|---|
| R19 Mobile NPU NNAPI | ❌ | -79~421× 느림 |
| R24 INT16 dynamic scale | ❌ | -1.65~4.25× 느림 (FP division ~10 cycles/elem) |
| **R27 FP16 Adam state** | ❌ | -1.08~1.88× 느림 (R23 baseline 우월) |
| R29 Multi-layer LoRA | ❌ | -7.7~-9.3% 정확도 손실 |
| **R23 fast_adam** | ✅ | baseline (Tiny 0.05초 carrier) |

→ "vendor 광고 신뢰 X, 자체 측정 자산 (Round 17·18·19·24·27·28·29) 기반 양산 결정" = R&D 신뢰성 영업 카피. 자세히 [[2026-05-24_negative-finding-누적-신뢰성-자산]].

### 차세대 firmware stack 갱신 (3계열 매트릭스 완성)

| 응용 | 라이브러리 | 칩 | 가속배 | Round |
|---|---|---|:-:|:-:|
| 칩 교체 (baseline) | — | C3 → S3 | +1.84× | R15 |
| MLP Dense (Korean-Small SLM) | ESP-DSP | ESP32-S3 LX7 | **+13.4×** | R17 |
| CNN Conv2D (KWS wake word) | esp-nn | ESP32-S3 LX7 | +2.93× | R21 |
| **CNN Conv2D (KWS Hybrid SoC) ⭐** | **CMSIS-NN** | **pca10056 (nRF52840) M4F** | **+14.02×** | **R28** |
| TF Attention+MLP SRAM | ESP-DSP | ESP32-S3 LX7 | +10.8× | R17.5 |
| **on-device 학습 (LoRA + fast_adam) ⭐** | **자체 (R23 + R25)** | **ESP32-S3 + PSRAM 8MB** | **Tiny 0.05초** | **R23/R25** |

## 2026-05-23 야간 — 차세대 firmware stack 확정 ⭐⭐ (Round 21 esp-nn CNN 흡수)

| 응용 | 라이브러리 | 칩 | 가속배 | Round |
|---|---|---|:-:|:-:|
| 칩 교체 (baseline) | — | C3 → S3 | **+1.84×** | R15 |
| MLP Dense (Korean-Small SLM) | ESP-DSP | ESP32-S3 LX7 | **+13.4×** | R17 |
| **CNN Conv2D (KWS wake word)** ⭐ | **esp-nn** | ESP32-S3 LX7 | **+2.93×** | **R21** |
| TF Attention+MLP SRAM | ESP-DSP | ESP32-S3 LX7 | **+10.8×** | R17.5 |

**종합 가속**:
- MLP: **24.8×** (1.84 × 13.4)
- CNN: **3.19×** (1.09 × 2.93, 칩 교체 + esp-nn)
- TF: **19.1×** (1.84 × 10.8)

**UX 결정타**: KWS wake word 응답 **547ms → 187ms** (3× 단축) — 사용자 체감 직결 영업 카피.

## 왜 중요한가
- 블루오션 확인: BTS ARMY Bomb, SM Beyond Live, PixMob 모두 AI 통합 없음
- [[ai-direction|AI 방향]]에서 "AI + 하드웨어 제품화"의 첫 사례
- 2주 만에 리서치→MVP→특허까지 완료 — [[strengths|실행 속도]] 증명

## 현재 상태
- MVP 코드 완성 (ESP32-C3 + BLE + Android + FastAPI)
- 특허 출원 문서 작성 완료 (7개 다이어그램)
- 마케팅 이미지 프롬프트 21개 (Midjourney/DALL-E)
- 사용설명서 v2.1

## 기술 스택
- ESP32-C3: WS2812 RGB LED + BLE
- Android: Kotlin/Compose + Retrofit
- 서버: FastAPI + Gemini 2.0 Flash + GPT-4o-mini (듀얼 AI)
- BLE 통신: 텍스트 입력 + WebSocket 재연결

## 타임라인
| 날짜 | 마일스톤 |
|------|---------|
| 2/12 | 컨셉 + 시장 조사 시작 |
| 2/16 | 마케팅 이미지 프롬프트 21개 |
| 2/21 | 사업 계획서 |
| 2/24 | 작동 원리 상세 문서 |
| 2/25 | MVP 전체 코드 완성 |
| 2/27 | 특허 출원 문서 완성 |
| 4/17 | 앱 개선 (텍스트 입력, WebSocket) |

## 양산 방향 진화 (2-Stage)

### 1차 잠금 (2026-05-08, 폐기됨)

응원봉 양산은 **"스마트폰 Gemma 2B + Cloud Gemini 하이브리드"**로 방향 고정. 응원봉 본체는 BLE 명령 수신·LED 제어만.

근거 (당시):
- newMvp/온디바이스_AI_검토서(2026-02-27) §10 결론과 일치
- onDevice_AI(2026-05-08) microGPT 4K 파라미터 = 응원봉 사용자 기대 응답 품질에 6~7자릿수 미달
- 양산 칩 교체(ESP32-C3 → ESP32-S3-N16R8) +1,500원/대 = 5만 대 +7,500만 BOM, 사용자 가치 미입증

### 2차 재전환 ⭐⭐⭐ (2026-05-20, 현재)

Round 17 결정타 (ESP-DSP `dsps_dp_s8_aes3` 활성 시 MLP 13.4× / C3→S3+DSP 24.8×) + Round 11 (PSRAM 결정타) + Round 17.5 (TF 10.8× / CNN 별도 가속) 누적으로 **5/8 결정 뒤집힘**:

| 단계 | ESP32-C3 (양산) | ESP32-S3 + DSP (차세대) | 우위 |
|:-:|---:|---:|:-:|
| 1. 단순 칩 교체 (plain C) | 2,677us | 1,452us | 1.84× |
| 2. **+ ESP-DSP intrinsics** | 2,677us | **108us** | **24.8× ⭐⭐⭐** |
| 3. + PSRAM Korean-Small 154K | (적재 불가, 400KB SRAM) | **~150ms 추정** | 양산 가능 |

→ **차세대 양산 = ESP32-S3-N16R8 + ESP-DSP + PSRAM SLM**
→ **사용자 가치 입증됨**: "외부 인터넷 0% 음성 명령" + 응답 ~150ms 자연스러움
→ **BOM 수용**: C3 $1.5 → S3-N16R8 $5~6 (3~4×). K-POP Premium 5~10만원 가격대에서 흡수 가능

자세한 정지선 (1차): [[2026-05-08_응원봉-온디바이스AI-정지선]]
1차 자료: `응원봉/마케팅검토/2026-05-08_온디바이스AI_정렬도검토.md`
2차 재전환 근거: `onDevice_AI/프로젝트_보드한계모델_v2.5/Round17_ESP-DSP/03_결론.md` · `Round17.5_CNN_TF_ESP-DSP/03_결론.md`

## 본 제품 관련 onDevice 검증 결과 (2026-05-20 흡수)

[[onDevice-ai]] vault에서 2026-05-08~5/20 동안 진행된 검증 결과 중 본 제품에 직접 영향 주는 항목:

### 기술 근거 정량화 (Stage 4 영업 카피 보증)

| 항목 | 측정값 (esp32s3 + PSRAM 8MB) | 의미 |
|---|---|---|
| MLP 1024 (2.17MB params) | **96ms** | 1초의 ~10% — 여유 |
| CNN 32 (39KB) | **547ms** | 1초 안 ✅ |
| TF 484 (5.87MB) | **255ms** | 1초 안 ✅ |
| CNN 64 (115KB) | 2.17초 ❌ | Xtensa LX7 SIMD 미사용 시 1초 초과 |

→ **AI FanStick 차세대 SLM은 6MB 이하 + 작은 hidden 사용** 시 1초 응답 보증. Korean-Small 154K (150KB)는 **충분 ✅**.

### 3계열 AI 가속 매트릭스 (2026-05-22 Round 18 CMSIS-NN 측정 완료 — 두 번째 축 채움) ⭐⭐⭐

본 제품 application class (small/medium dense + batch=1 + plain INT8) 에서 3계열 가속의 일관 우월 입증. **5/22 Round 18 측정으로 Cortex-M4F 행이 [측정 예정] → 실측 +3.23× 채워져 매트릭스 완성**:

| 계열 | 칩 / 가속 | 결과 | Round |
|---|---|---|---|
| MCU LX7 + ESP-DSP | esp32s3 + ESP-DSP `dsps_dp_s8_aes3` | **+13.4× 가속** ⭐⭐⭐ (1,452μs → 108μs) | Round 17 (5/21) |
| **MCU Cortex-M4F + CMSIS-NN (256KB tier)** ⭐ | **pca10056 (nRF52840 256KB)** + SMLAD DSP extension | **+3.23× 가속** ⭐⭐ (7,367μs → 2,285μs) ✅ | Round 18 (5/22) |
| **MCU Cortex-M4F (64KB tier — AI 부적합)** ⚠️NEW | pca10040 (nRF52832 64KB) | **전셀 RAM wall 12/12** (weights > heap, CMSIS-NN .bss 34KB 차지) | Round 18 후속 (5/22 야간) |
| Mobile NPU NNAPI | Galaxy A51 5G Eden NPU (Samsung 2.1 TOPS 광고) | **‒79~421× 느림** ⚠️ | Round 19 (5/22) |
| CPU baseline | Cortex-A77 + asimddp (NDK clang `-O2`) | 모바일 응용 충분 (NPU 보다 빠름) | Round 19 |

**클럭 normalize 단위 효율** (5/22 Round 18 신규): LX7 25,920 cycles vs M4F 146,240 cycles = **LX7 5.64× M4F 우위**. AI 가속 = ISA-specific instruction 폭 (128-bit AI vector > 32-bit SMLAD).

**영업 카피 갱신** (5/22):
- 본 양산 트랙: "AI FanStick C3→S3+ESP-DSP **24.8×** (Round 17/17.5, 응원봉 SLM 핵심)"
- **별도 B2B 시나리오**: "**B2B 통합 SoC = nRF52840 (256KB) 필수 (nRF52832 부적합)** + CMSIS-NN +3.23× (Round 18·후속, KWS / anomaly detection / BLE+AI)"
- "vendor 광고는 best-case 기준 — application class 사전 확인 + **RAM tier 적합도** 4번째 조건"
- Stage 4 패키지: mobile NPU 적극 제안 X, MCU 가속 매트릭스로 전개 (S3+DSP 또는 nRF52840+CMSIS-NN 분기, **nRF52832는 BLE-only 트랙 분리**)

### 응원봉 SLM 최종 권장 사양 확정

| 차원 | 권장 | 근거 |
|---|---|---|
| dtype | **INT8** | TF FP32 대비 51% 사이즈 |
| threshold | **1s 대화** | 응원봉 응용 baseline |
| thread | **single-core** | dual-core 효과 1.1× (가치 낮음) |
| SIMD | **ESP-DSP dotprod** ⭐ | AVX2 1.8~2.0× 추정, dual-core 우선 |
| 모델 사이즈 | **~100K params** | esp32s3 추정 한계, Korean-Small 154K 적합 |

### 칩 변경 결정 (2-Stage 진화)

**1차 (5/8, 폐기)**: microGPT 4K params는 SRAM 400KB의 1% 미만. 칩 변경 불필요.

**2차 (5/20, 현재)** ⭐: Round 17 ESP-DSP 24.8× + Round 11 PSRAM 결정타 + Round 17.5 TF 10.8× 종합 = **칩 변경 필수**. C3 + ESP-DSP는 ansi fallback으로 손해 (LX6/RISC-V 1.54× 느림). S3-N16R8 (LX7 + PSRAM 8MB)로 교체 시 Korean-Small 154K INT8 응답 ~150ms.
- BOM: $1.5 → $5~6 (3~4×). 5만 대 +7,500만 미흡 영향 → K-POP Premium 5~10만원에서 수용 가능.

### 핵심 발견 (Round 9·11·17·17.5)

- **Round 9**: Xtensa LX7 plain C는 ARM 대비 9~38× 느림 (SIMD intrinsics 미사용 시)
- **Round 11**: PSRAM 유무가 mandate RAM_safe 셀 결정타 (60% 격차)
- **Round 17** ⭐⭐⭐: ESP-DSP `dsps_dp_s8_aes3` 활성 시 LX7 AI Vector Instruction MLP 13.4× / C3→S3+DSP 종합 **24.8× 가속** — 영업 결정타
- **Round 17.5** ⭐: TF SRAM **10.8× 가속** (SLM 핵심 워크로드 MLP+Attention 모두 ~20× 가속). CNN strided access는 적용 불가 (esp-nn 대안). PSRAM 가득 모델은 가속 무효 또는 손해.
- **ESP-DSP 효과 = 3조건 곱** (Round 17.5 매칭): LX7 + SRAM (또는 small PSRAM) + contiguous matvec. C3·esp32wroom·RISC-V에서 적용은 손해. 자세히 [[2026-05-21_esp-dsp-3조건-매칭]]

### 응원봉 SLM 최종 권장 사양 (5/21 갱신)

| 차원 | 권장 | 근거 |
|---|---|---|
| dtype | **INT8** | TF FP32 대비 51% 사이즈 |
| threshold | **1s 대화** | 응원봉 응용 baseline |
| thread | **single-core** | dual-core 효과 1.1× (가치 낮음) |
| SIMD | **ESP-DSP dotprod** ⭐ | MLP 24.8× / TF 19.1× 정량 확정 (Round 17·17.5) |
| 모델 사이즈 | **~100K params (~600KB)** | esp32s3 SRAM + 작은 PSRAM sweet spot, Korean-Small 154K 적합 |
| KWS wake word | esp-nn 또는 TFLM esp-nn delegate | CNN strided access는 ESP-DSP 적용 불가 |

### 마케팅 정량화 카피 (B2B/PR 트랙용)

- "MCU급 SLM 추론 **1초 안**" → 측정으로 보증
- "응원봉 안에 GPT 200줄 — 한국 최초 시연"
- "Korean-Small 150KB 한국어 응원 도메인 — esp32s3 SRAM 30%"
- ⭐⭐⭐ "**ESP-DSP intrinsics 24.8× 가속** — C3→S3 칩 교체로 응답 150ms 달성" (5/20 신규)
- ⭐ "**외부 인터넷 0% 음성 명령**" (Round 17·17.5 종합)
- ⭐⭐⭐ "**Tiny 0.05초 즉시 학습 (R23 fast_adam) + KWS 0.37초 personalization (R25)**" (5/24 신규) — Cloud GPT-4 (3~10초) 대비 8~27× 빠름
- ⭐⭐⭐ "**어려운 사용자에게만 +11.4% 정확도 자동 학습**" (R26 selective personalization, 5/24 신규)
- ⭐⭐ "**Hybrid SoC = KWS frontend (M4F CMSIS-NN 14×) + Personalization backend (S3 LoRA 0.05초)**" (R28 Hybrid SoC, 5/24 신규) — 예측 5배 초과 가속
- ⭐⭐ "**4 대안 측정 검증 후 R23 양산 확정**" (NPU/INT16/FP16/Multi-layer LoRA 모두 negative, 5/24 신규) — vendor 광고 신뢰 X, 자체 측정 자산화

본 검증 결과는 **양산 트랙 본체**로 전환됨 (5/20 결정). 1차 정지선(5/8) 폐기. PR·B2B 영업·강의 자산은 24.8× 카피 신규 활용.

→ 자세한 검증 데이터: [[onDevice-ai]] / [[2026-05-20_esp32-arm-family-스펙트럼]]

## 마케팅 카피 분리 정책

| 청자 | 카피 |
|---|---|
| C2C 응원봉 사용자 | "AI 팬덤 비서가 내 손 안에" / "오프라인에서도 작동하는 첫 응원봉" |
| B2B (Stage 4) | "응원봉 자체에 GPT 탑재한 첫 사례" (검증 트랙 산출물 활용) |
| PR/언론 | "1만원 칩에 GPT 200줄 — UTTEC 한국 최초 시연" |
| 강의 | "임베디드 엔지니어를 위한 On-Device AI" |

**중요**: B2B/PR 카피를 C2C 사용자 마케팅에 쓰지 말 것 (기대 격차 클레임 위험).

## 「모두의 창업 프로젝트」 도전 트랙 (2026-05-09 신설)

응원봉 본체 양산 트랙(정지선 = Phase 2 종료)과 **별도로**, 본 제품을 베이스로 한 **신규 법인 창업 도전 트랙**을 개시.

| 항목 | 내용 |
|---|---|
| **공모전** | 중기부 공고 제2026-208호 「모두의 창업 프로젝트」 일반/기술트랙 |
| **마감** | 2026-05-15 (목) 16:00 |
| **신청자** | 이진서 (서울대 졸업학기, 예비창업자) — UTTEC은 사업년수 10년으로 자격 미달 |
| **협업 구조** | 이진서 51% (대표) + UTTEC 49% (CTO·기술 출자) |
| **이진서 매칭 핵심** | 응원단장(7대) + 기획단장(6대) — 9년 응원단 운영 경험 = "응원단장이 만드는 응원봉" 진정성 |
| **제품 포지션** | 세계 최초 온디바이스 AI 응원봉 + 팬덤 영상 자동편집 플랫폼 (양면 수익) |
| **매출 목표** | 1년차 9.7억 / 3년차 100억 (GP 마진 81%) |
| **상금** | TOP 1 = 5억 + 사업화 1억 / TOP 100 = 사업화 1억 + AI 바우처 + 시제품 1천만 |

자세한 내용:
- 인사이트 기록: [[2026-05-09_이진서협업-창업프로젝트도전]]
- 사업계획: `이진서/창업project/items/A_AI응원봉_팬덤플랫폼.md`
- 도전신청서 초안: `이진서/창업project/A안_도전신청서_초안_v1.md`
- 종합 정리: `이진서/창업project/창업아이템_종합정리.md`

## 특허 IP 백업 (2026-05-09 추가)

응원봉 특허 출원 자료 + 검토 자료 + 분석 자료 일체를 [[oldProject]] 아카이브에 보존.

| 폴더 | 위치 | 내용 |
|---|---|---|
| 응원봉특허_now | `oldProject/rfTech/응원봉/응원봉특허_now/` (60 files / 200 MB) | 최신 특허 출원 자료 본 (확정본) |
| 루트 docx/xlsx 7건 | `oldProject/rfTech/응원봉/` | UTTEC 응원봉 System.pptx, 특허 분석.docx, 응원봉특허list.xlsx, 응원봉 사업 계획서.docx 등 |

큐레이션 정책에 따라 `final특허/`, `검토특허/`, `응원봉특허/` (구버전 3개)는 제외. `_now` 버전만 단일 source of truth로 유지.

## 관련 페이지
- [[me]]: 사업가/발명가 정체성
- [[projects]]: 완료 프로젝트
- [[skills]]: ESP32 + BLE + Android + AI API
- [[ai-direction]]: AI+HW 제품화 사례
- [[strengths]]: 폭발적 실행 속도 증거
- [[experience]]: 제품화 경험
- [[onDevice-ai]]: 별도 트랙 (PR·B2B·강의 자산용)
- [[oldProject]]: 응원봉 특허 IP 백업 (2026-05-09)
- [[2026-05-08_응원봉-온디바이스AI-정지선]]: 정지선 의사결정 기록
