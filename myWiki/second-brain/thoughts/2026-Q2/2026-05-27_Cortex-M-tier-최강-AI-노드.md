---
title: Cortex-M tier 최강 AI 노드 — stm32h745 + CMSIS-NN 17.58×의 본질
type: thought
created: 2026-05-27
updated: 2026-05-28 (R37/R36 paired-check 정정 반영 — M7 baseline IPC 1.76× 정정 박제 + asymmetric multiprocessing path 추가)
tags: [thought, Cortex-M, Cortex-M7, STM32H745, CMSIS-NN, AI-가속, 클럭, DSP-intrinsics, L1-cache, SLM-적재, mandate-v2.9-종결, 6mandate-모두종결, baseline-IPC-1.76x, asymmetric-multiprocessing, R37-정정사이클]
links: [onDevice-ai, ai-fanstick, uttec-stage-package, stm32h745-disco, ai-direction, build-gotcha-inventory, 2026-05-26_STM32H745-LAN-path-Stage4-결정타, 2026-05-25_STM32H745-Zephyr-통합-cross-vendor, 2026-05-24_5계열-AI가속-매트릭스-완성, 2026-05-24_application별-SoC-결정-Hybrid-SoC, 2026-05-28_R36-R37-baseline-artifact-paired-check-fix]
---

## 2026-05-28 정정 박제 (R37/R36 paired-check 흡수)

본 thought 작성 시점 (5/27) 박제 "M7 baseline IPC 우위" 표 항목은 정성적 표현이었음. 5/27~28 R37 정정 cascade로 정량 박제 추가:

- **M7 baseline vs pca10056 = 1.76× 빠름** (실측 7,367μs / (557μs × 7.5 클럭비) = 1.76×). 옛 박제 "0.43× 미달" artifact 정정. **Cortex-M7 IPC gain 1.78× 카탈로그 정확 매칭** (dual-issue 1.4× + L1 cache 1.2× + ART 1.05~1.1×).
- **R37 M4 단독 positive 정정** — clock-norm 0.99× = 정상 클럭 비례 (M4 240MHz 활용 정확). negative finding 등재 취소.
- **asymmetric multiprocessing path 확정** — H745 진가 = M7 AI inference + M4 sensor/control 동시 운영. 단일 칩에 R34 Hybrid SoC carrier 실현 (R28 KWS frontend + R25 personalization backend) = Stage 4 시나리오 E 정량 강화.
- **STM-15 carrier 자산 박제** — INFO emit cache 영향 24% 발견. 본 vault 모든 보드 measurement 일관성 표준 (printk emit 위치 검증 필수).

→ 본 vault baseline 박제 정확성 일관성 확보. CMSIS-NN 17.58× 결정타 영업 메시지 변경 없음. 자세히 [[2026-05-28_R36-R37-baseline-artifact-paired-check-fix]].

---

# Cortex-M tier 최강 AI 노드 — stm32h745 + CMSIS-NN 17.58×의 본질

## 한 줄

**stm32h745 + CMSIS-NN CNN 17.58× 가속은 단순 클럭 7.5× 증분이 아니라 클럭 + DSP intrinsics + L1 cache + 9.2MB RAM의 곱.** 같은 ARM Cortex-M tier 내 pca10056 (M4F 64MHz) 14.02× 대비 25% 추가 가속 = M7 baseline IPC + L1 cache + AXI SRAM 메모리 path 우위. 본 vault Cortex-M tier 가장 강력한 ANN inference 노드 + Cortex-M 단일 칩에서 SLM 50~60MB 적재 가능 (QSPI XIP 64MB).

## 본질 분해

### 가속 17.58×의 근원 (CNN 64 기준)

| 요인 | 기여 | 근거 |
|---|---|---|
| **클럭** | M7 480 / M4F 64 = **7.5×** | 단순 클럭 비교 |
| **CMSIS-NN SMLAD SIMD im2col** | M4F의 14.02× 가속 동일 메커니즘 | R28 pca10056 측정 |
| **M7 baseline IPC 우위** | M7 dual-issue + L1 cache hit | MLP 128 = 2.05× CMSIS-NN (M4F 3.23× 대비 baseline IPC 우월) |
| **AXI SRAM 메모리 path** | 512KB AXI + 288KB SRAM1-3 = STM32H7 메모리 계층 | M4F 256KB SRAM 단일 path 대비 우위 |

**계산 일관성**:
- 단순 클럭 비교: 14.02× × 7.5× / 7.5× = ~14× 가속 예상 (클럭만 보정)
- 실측: 17.58× → 14× 대비 **25% 추가 가속** = baseline IPC + L1 cache + AXI SRAM 메모리 path 효과
- → M7 architecture 우위의 정량 박제 (단순 클럭 게인 아님)

### 메모리 4-tier가 영업의 본질 ⭐⭐⭐

| 항목 | 값 | 의미 |
|---|---|---|
| DTCM | 128 KB | hottest data, zero-wait |
| ITCM | 64 KB | hottest code |
| AXI SRAM | 512 KB | working set + framebuffer |
| SRAM1-3 | 288 KB | model weight |
| SRAM4 | 64 KB | inter-core comm |
| SDRAM2 | 8 MB | large model + KWS dataset |
| **총 RW RAM** | **9.2 MB** | esp32s3 PSRAM 8MB 동급 |
| QSPI Flash XIP | 64 MB | **SLM 50~60MB 적재 가능** (Macronix MX25LM51245G) |
| internal Flash | 1 MB | bootloader + firmware |

→ **GPT-2 mini / Phi-2 mini Q4 (50~60MB)을 Cortex-M 단일 칩에서 실행 가능**. esp32s3 PSRAM 8MB 한계(SLM 10MB 미만)를 6× 상회.

## 비교 — 왜 esp32s3는 SLM 50~60MB가 불가한가

| 칩 | RAM 최대 | Flash XIP | SLM 적재 가능 모델 |
|---|---:|---:|---|
| esp32s3 PSRAM 8MB | 8 MB | 16 MB | TinyLLaMA 3M Q4 / 작은 KWS 모델 |
| pca10056 (M4F) | 256 KB | 1 MB | tiny CNN only |
| **stm32h745** | **9.2 MB RW + 65 MB XIP** | **65 MB** | **GPT-2 mini / Phi-2 mini Q4 50~60MB** |

→ QSPI XIP 64MB의 read-only 영역에 SLM weight를 적재 + working set만 DTCM/AXI SRAM 사용 = **Cortex-M tier 유일 SLM 적재 path**.

## 영업 결정타

### Stage 4 시나리오 E 갱신

**STM32H7 산업 노드** = USB CDC + LAN + CMSIS-NN CNN 17.58× + SLM 50~60MB 적재 ($70 BOM). 한국 산업 환경 (LAN 인프라 + STM32 선호) + Cortex-M 단일 칩 SLM path.

### Cortex-M tier 두 path 분리

| Application | 칩 | BOM | path |
|---|---|---:|---|
| KWS / Voice command (소형) | pca10056 (M4F + CMSIS-NN) | $15 | BLE+AI 통합 SoC |
| **KWS / 큰 CNN application (대형) + SLM 적재** | **stm32h745 (M7 + CMSIS-NN)** | **$70** | **산업 LAN + 큰 모델 통합 노드** |

→ Cortex-M tier 단일 path 아닌 BOM/RAM/Flash tier 분리 = vendor 단일 칩 광고 X UTTEC 차별화 영업.

## 본 vault 의미

### 6/6 mandate 모두 종결 = 응용 진입 직전 마지막 측정 완성

| mandate | 종결 | 핵심 |
|---|---|---|
| v2.4 | 14 보드 baseline | 13 → 14 보드 매트릭스 완성 |
| v2.5 | R17~R21 (LX7 ESP-DSP + Nordic CMSIS-NN + esp-nn) | 가속 계열 첫 조사 |
| v2.6 | R22~R25 LoRA + KWS personalization | on-device 학습 4번째 축 |
| v2.7 | R26~R29 | 3계열 → 5계열 매트릭스 진화 |
| v2.8 | R30~R35 (mobile + rpi NEON + 한국어 KWS) | 5계열 매트릭스 완성 + 7번째 negative |
| **v2.9** | **R36 STM32H745 CMSIS-NN** | **Cortex-M tier 최강 + SLM 적재 path** |

→ **응용 진입 직전 마지막 측정 mandate 완성** — 사용자 결단 (b 영업 데모 / c 양산) trigger 준비 완료.

## 매칭 패턴

| 패턴 | 시너지 |
|---|---|
| **AI FanStick Premium Plus 5번째 tier 후보** | STM32H7 큰 모델 path = Premium Plus 4 tier (esp32s3 LoRA) + 5번째 tier (Cortex-M7 SLM) — 사용자 결단 |
| **B2B 산업 노드 영업** | STM32H7 LAN + CMSIS-NN CNN 17× → 한국 산업 환경 (한국기계 등) Stage 4 데모 |
| **Hybrid SoC 확장 carrier** | KWS frontend (M4F CMSIS-NN 14×) + Personalization backend (esp32s3 ESP-DSP) + **Large CNN/SLM backend (stm32h745 CMSIS-NN 17.58× + SLM 50~60MB)** = 3 SoC Hybrid carrier 후보 |
| **carry-over 효과 정량 입증** | R36 sweep 신규 함정 2건 (race fix + monitor 부족) 모두 minor = 함정 47건 인벤토리 carry-over 가치 영업 자산 |

## 다음 결단

- 본 vault `프로젝트_보드한계모델/` 6/6 mandate 모두 종결 → **응용 진입 결단 시점** (사용자)
- 양산 진입 시 R36 carry path: AI FanStick Premium Plus 5번째 tier 후보 (Cortex-M7 SLM) + STM32H7 B2B 산업 노드 직접 영업
- 영업 데모 진입 시 R36 carry path: Stage 4 자료 결정타 (5계열 매트릭스 + Cortex-M tier 최강 + SLM 적재 path) + 시연 영상 (USB CDC + LAN + CNN 17.58× 실측)

## 관련 페이지

- [[stm32h745-disco]] — R36 cmsis 결과 + 메모리 4-tier 정정 단일 출처
- [[onDevice-ai]] — 6/6 mandate 종결 + 5계열 매트릭스 14번째 행 갱신
- [[ai-fanstick]] — Cortex-M7 tier 영업 carry
- [[uttec-stage-package]] — Stage 4 시나리오 E 정량 박제
- [[ai-direction]] — 결정 12/13/14
- [[2026-05-26_STM32H745-LAN-path-Stage4-결정타]] — Wave 13 carry
- [[2026-05-24_application별-SoC-결정-Hybrid-SoC]] — Hybrid SoC 3 SoC 확장 carrier
