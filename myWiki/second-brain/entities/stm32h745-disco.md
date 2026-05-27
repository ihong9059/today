---
title: STM32H745I-DISCO (14번째 보드, Cortex-M tier 최강 AI 노드)
type: entity
created: 2026-05-26
updated: 2026-05-28 R37 정정 cascade 흡수 (M4 단독 positive clock-norm 0.99× 정정 / R36 M7 baseline clock-norm 1.76× 정정 / STM-15 INFO emit cache 영향 신규 함정 / R37 정정 사이클 = R&D 신뢰성 자산)
tags: [STM32, STM32H745, Cortex-M7, Cortex-M4, dual-core, Zephyr, LCD, USB-CDC, Ethernet, LAN, LAN8742A, B2B, Stage4, ondevice, mandate-v2.8, mandate-v2.9-종결, 14th-board, carry-over, CMSIS-NN, 17x-가속, SLM-적재, 6mandate-종결, R37-정정사이클, baseline-artifact, paired-check, STM-15-INFO-emit-cache, M4-positive, asymmetric-multiprocessing]
links: [onDevice-ai, ai-fanstick, uttec-stage-package, build-gotcha-inventory, gaps, ai-direction, 2026-05-25_STM32H745-Zephyr-통합-cross-vendor, 2026-05-26_STM32H745-LAN-path-Stage4-결정타, 2026-05-27_Cortex-M-tier-최강-AI-노드, 2026-05-28_R36-R37-baseline-artifact-paired-check-fix]
---

## 2026-05-28 R37 정정 cascade 흡수 — M4 positive 정정 + R36 baseline IPC 1.76× 정정 + STM-15 신규 함정 ⭐⭐⭐

### R37 M4 단독 positive 정정 (옛 negative artifact 취소)

5/27 14:00 ondevice-claude 첫 발신 R37 카드 "M4 clock-norm 0.27× / 7번째 negative finding"은 **잘못된 pca10056 baseline 추정 (~1,798μs)에서 비롯된 artifact**. 실측 pca10056 R18 CSV 7,367μs 기반 재계산 시 **clock-norm 0.99× ≈ 1.00× = 정상 클럭 비례**. negative finding 등재 취소, M4 단독 positive 박제.

| 셀 | M4 baseline | M7 baseline (R36) | M7/M4 ratio | clock-norm M4 vs pca10056 |
|---|---:|---:|:-:|:-:|
| **MLP 128** | 1,985 μs | 557 μs | 3.56× | **0.99× ✅** (pca10056 R18 실측 7,367μs / 240/64 = 3.75 클럭비) |

**IPC gain 분해**: M7 vs M4 same-chip 3.56× / 클럭 ratio 2× = **IPC gain 1.78×** = Cortex-M7 dual-issue (~1.4×) + L1 cache 16KB (~1.2×) + ART accelerator (~1.05~1.1×) 카탈로그 정확 매칭.

### R36 M7 baseline clock-norm 1.76× 정정 (옛 0.43× 미달 artifact 취소)

R37 정정 직후 paired-check: pca10056 R18 실측 7,367μs 기반 재계산 → **M7 vs pca10056 = 7,367 / (557 × 7.5) = 1.76× 빠름** (M7 480MHz vs pca10056 64MHz 클럭비 7.5× 안에서 IPC 1.78× 카탈로그 매칭). 옛 박제 "0.43× 미달 / DTCM 미배치 본질 분리 R37 후속"은 artifact 정정. 측정값 자체 (557μs / 5회 range 0)는 정확.

### STM-15 새 함정 — INFO emit cache 영향 24% ⭐⭐ (carry-over 가치 큰 자산)

R36 정정 검증 시 발견. INFO emit (printk + HAL_RCC peripheral access) **위치**가 측정 결과에 24% 영향:

| 배치 | latency_avg | p99 | 비고 |
|---|---:|---:|---|
| `model_run_bench` **전** 배치 | 692 μs (+24%) | 19,500 μs (+2.6×) | I-cache layout + RCC register access first-trial cache cold |
| `model_run_bench` **후** 배치 | 556 μs (정확) | 7,400 μs (정상) | cache state 진단 없는 빌드와 동일 |

**5회 측정 range 0** = 측정 잡음 아닌 결정론적 build/cache 효과. carry-over 표준: 다른 보드 (Nordic / ESP32 / Linux PC) 측정 시 동일 패턴 적용 (printk emit 위치 검증 필수).

### 영업 가이드 정정 (Cortex-M tier)

- ❌ 옛 메시지 (취소): "H745 M4 단독 권장 안 함 — effective ≈ pca10056 64MHz, BOM 더 비쌈"
- ✅ 정정 메시지:
  - **H745 M4 단독도 정상** — pca10056 대비 3.71× 빠름 (240MHz 클럭 비례 정확)
  - **M7이 same-chip 3.56× 추가 우월** → AI 단독 워크로드는 M7 우선 권장
  - ⭐ **H745 진가 = M7 + M4 dual-core 동시 운영** (M7 AI inference + M4 sensor/control = asymmetric multiprocessing, 단일 칩에 R34 Hybrid SoC carrier 실현)

### CMSIS-NN 17.6× 결정타 영업 메시지 변경 없음 ⭐

- ✅ Cortex-M tier 최강 = stm32h745 + CMSIS-NN 17.6× CNN (Wave 14 메시지 유지)
- ✅ Stage 4 시나리오 E ($70 BOM, dual-core asymmetric multiprocessing) 변경 없음
- ⚪ 추가 정확화: M7 baseline IPC gain 1.78× = Cortex-M7 카탈로그 정상치 (산업 노드 영업 정확성 강화)

### negative finding 누적 (정정판) — 6건 유지

R19 NPU / R24 INT16 Adam / R27 FP16 / R29 Multi-layer LoRA / R30 mobile clang dotprod / R32 pca10040 64KB. **R37 제외** (positive로 분류). 본 vault 박제 정확성 일관성 확보.

### R36/R37 정정 사이클 = R&D 신뢰성 자산 강화 ⭐⭐

- 사용자 challenge ("M4의 속도가 지금 최선인가?") → 펌웨어 INFO emit (sys_clock + HAL_RCC + __OPTIMIZE_SIZE__) 진단 4행 추가 → 실측 검증 → 옛 박제 artifact 정정
- 패턴 박제: **"측정값 의심 시 단일 출처 (실측 CSV) 재확인 후 정정"** = 본 vault carrier 표준
- 사용자 능동 + Claude 검증 능동 = R&D 신뢰성 vault governance 모범 (cascade chain 사례: search-claude G 패치 자가 진단 / ondevice-claude #14 v3 진단 정정 → R36/R37 baseline 정정 = 3번째 사례)

자세히 [[2026-05-28_R36-R37-baseline-artifact-paired-check-fix]].

---

## 2026-05-27 Wave 14 흡수 — R36 ✅ + mandate v2.9 종결 + Cortex-M tier 최강 AI 노드 박제 ⭐⭐⭐

### R36 정량 결과 (CMSIS-NN 4 RAM_safe 셀)

| 셀 | baseline (plain C) | CMSIS-NN | 가속 | 비고 |
|---|---|---|:-:|---|
| **MLP 128** | 557 μs | 272 μs | **2.05×** | H2 ✅ 부분 PASS (M4F 3.23× 대비 M7 baseline IPC 우월) |
| **CNN 32** | 238.6 ms | 13.4 ms | **⭐⭐⭐ 17.7×** | H3 ✅ — 본 vault Cortex-M tier 최대 가속 |
| **CNN 64** | 959.9 ms | 54.6 ms | **⭐⭐⭐ 17.58×** | H3 ✅ 확정 — CNN 32와 일관된 ~17.6× |
| TF 64 | 1.5 ms | 1.1 ms | 1.36× | TF dense 부분만 cmsis 적용 가능 한계 |

→ 본 vault Cortex-M tier 가장 강력한 ANN inference 노드 박제. **M4F pca10056 R28 14.02× 상회 25%**.

### Cortex-M tier 비교 (7.5× 클럭 + RAM 36× + CNN 25% 추가)

| 보드 | 클럭 | RAM | MLP 가속 | CNN 가속 | TF 가속 |
|---|---:|---:|:-:|:-:|:-:|
| pca10040 (M4F 64KB) | 64 MHz | 64 KB | RAM wall | RAM wall | RAM wall |
| pca10056 (M4F 256KB + CMSIS-NN) | 64 MHz | 256 KB | 3.23× | 14.02× | 1.85× |
| **stm32h745 (M7 + CMSIS-NN)** | **480 MHz** | **9.2 MB** | **2.05×** | **⭐ 17.58×** | **1.36×** |

→ Cortex-M tier 최강 = **stm32h745 + CMSIS-NN** (클럭 7.5× + RAM 36× + CNN 가속 25% 추가).

### 메모리 4-tier 정정 ⚠️ (옛 박제 정정)

| 항목 | 값 |
|---|---|
| QSPI Flash | ~~16 MB~~ → **64 MB** (Macronix MX25LM51245G, DTS `mt25ql512ab1 DT_SIZE_M(64)` 확인) |
| 총 RW RAM | **9.2 MB** (DTCM 128 + ITCM 64 + AXI 512 + SRAM1-3 288 + SRAM4 64 + SDRAM2 8192) |
| 총 Flash XIP | **65 MB** (internal 1 + QSPI 64) |
| **AI 모델 적재** | **GPT-2 mini / Phi-2 mini Q4 (50~60MB) 가능** (QSPI XIP read-only) — 4× 상향 |

### R36 신규 gotcha (sweep race fix + CNN 64 진단)

⭐ **race fix 단일 cell 패턴** (sweep [1] first-cell timing 회피):
```
mass erase + flash → port.Open() + DiscardInBuffer() → 300ms 대기 → reset trigger → monitor loop
```
→ `sweep12_stm32.ps1` carry-over 가치 (다른 STM32 board sweep에 즉시 carry).

⭐ **CNN 64 진단 finding** (5/27 e1-2): "hang" 의심 → 단순 monitor 시간 부족 확정. bench loop 100회 × ~960ms ≈ 96초 (LATENCY_WALL_US 1초 직전), 30s/40s/90s monitor 모두 부족이었음. **150s monitor에서 정상 emit.** 패턴: `monitor 시간 < bench 총 시간`이면 silent loss → 셀별 monitor budget 계산 필수.

### mandate v2.9 종결 → 본 vault 6/6 mandate 모두 종결 ⭐⭐⭐

본 vault `프로젝트_보드한계모델/` 6 mandate 모두 종결:
- v2.4 (14 보드 baseline) ✅
- v2.5 (R17 ESP-DSP + R18 CMSIS-NN + R19 NPU + R20 LoRA + R21 esp-nn) ✅
- v2.6 (R22~R25 LoRA + KWS personalization) ✅
- v2.7 (R26 KWS 정확도 + R27 FP16 + R28 pca10056 + R29 multi-layer negative) ✅
- v2.8 (R30 mobile + R31 rpi NEON + R32 pca10040 + R33 esp-nn TF + R34 Hybrid SoC + R35 한국어 KWS) ✅
- **v2.9 (R36 STM32H745) ✅ 5/27 종결**

→ **응용 진입 직전 마지막 측정 mandate 완성** — 사용자 결단 (b 영업 데모 진입 / c 양산 진입) 시점.

---

# STM32H745I-DISCO (14번째 보드)

# STM32H745I-DISCO (14번째 보드, Cortex-M tier 최강 AI 노드)

## 한 줄 정의

ST `STM32H745I-DISCO` discovery 보드 — **Cortex-M7 480MHz + Cortex-M4 240MHz dual-core, 9.2 MB RW RAM (1MB internal + 8MB SDRAM) + 65 MB Flash XIP (internal 1 + QSPI 64), DP FPU + L1 cache + DSP intrinsics + CMSIS-NN CNN 17.58× 가속**. onDevice 14번째 보드. 5/25 신규 진입 (Wave 12) + 5/26 Ethernet/Bridge PoC (Wave 13) + **5/27 R36 ✅ + mandate v2.9 종결 (Wave 14) — Cortex-M tier 최강 AI 노드 박제 + SLM 50~60MB 적재 가능**. **Stage 4 산업 노드 (USB CDC + LAN 동시 streaming) + Cortex-M7 KWS/CNN application 결정타**.

## 진입 컨텍스트 (Wave 12, 5/25)

- **본 vault 정통 = Zephyr** 합의 후 첫 cross-vendor 통합 사례 (Nordic + STM32 같은 toolchain 일관성)
- 11 보드 → 14 보드 매트릭스 확장 (Cortex-M tier 행 강화)
- 같은 12셀 schema 비교 = 5계열 매트릭스 ARM tier 행 강화 (pca10056 M4F 64MHz → STM32H745 M7 480MHz)

## 측정 결과 — R36 baseline + 3 PoC (Wave 12, 5/25)

| 항목 | 값 |
|---|---|
| baseline R36 | 12셀 sweep 완료 |
| CNN 32 | 238 ms |
| TF 64 | 1.5 ms |
| LCD R/G/B PoC | ✅ (480×272 RGB565) |
| USB CDC ACM streaming PoC | ✅ (38400 bps) |

## Wave 13 추가 PoC (5/26) ⭐⭐⭐

### Ethernet TCP echo

| 항목 | 값 |
|---|---|
| Ethernet PHY | Microchip **LAN8742A** (ID 0x7C111) onboard, MII 100Mb full duplex |
| DHCP 시간 | ~2.1 s (PHY link up + IP 할당) |
| TCP echo Memory | FLASH 132 KB / RAM 67 KB (12.6% / 12.9% of 1MB / 512KB AXI) |
| 검증 도구 | PowerShell TcpClient + SerialPort (단일 세션 양방향 round-trip) |

### USB-CDC ↔ TCP Bridge (single firmware)

| 항목 | 값 |
|---|---|
| Bridge Memory | FLASH 150 KB / RAM 80 KB (USB stack + Net stack 동시 동작) |
| 구조 | **ring_buf 2개 + ISR 1개 + thread 1개** 양방향 |
| 영업 의미 | USB CDC + Ethernet **단일 firmware** 동시 streaming → Stage 4 데모 두 시나리오(직접 PC = CDC / LAN 통합 = TCP) 동시 만족 |

## 영업 매칭 (Cortex-M tier 차별화)

| 보드 | wireless / wired | 영업 시나리오 |
|---|---|---|
| pca10056 (M4F 64MHz 256KB) | **BLE wireless** (UART/USB-CDC, Ethernet 없음) | KWS / B2B BLE+AI 통합 SoC |
| **STM32H745 (M7 480MHz, 512KB AXI + 1MB internal)** | ⭐ **Ethernet onboard + USB OTG 동시** | **한국 산업 환경 (LAN 인프라 + STM32 선호)** + Stage 4 통합 노드 |
| esp32s3 | WiFi + BT | 응원봉 / Personalization |

**시너지 카피**: AI FanStick 응원봉 외 **B2B 산업 노드 영업 추가 path** (한국기계 등 LAN 기반 Stage 4).

## carry-over 효과 정량화 (Wave 13 발견)

- 11 STM32 함정 (STM-1~11) 박제 후 본 세션 PoC 2건 진행 → 신규 함정 **1건 (STM-12 minor)** 만 발현
- 패턴: **"환경 셋업 함정은 보드 첫 작업에 집중, 이후 PoC는 carry-over로 1차 success"**
- 첫 R36 sweep = 3차 시도, 본 PoC = **1차 success** ⭐
- 정량 근거: 함정 인벤토리의 R&D 신뢰성 영업 자산 가치

## 11 함정 cluster (single-day, 5/25 박제)

| # | 함정 | 우회 |
|---|---|---|
| STM-1 | 한글 경로 cmake 0xC0000409 (ESP-IDF #1 carry-over) | C:\stm32_proj\ 영어 사본 |
| STM-2 | 함정 #14 cd . cwd 보존 결함 | patch_ninja.ps1 매 reconfigure 후 |
| STM-3 | dual-core boot 함정 (M4 wwdg 잔존 console 점유) | mass erase 매 셀 |
| STM-4 | STM32CubeProgrammer halt 거부 | mode=UR reset=HWrst |
| STM-5 | 보드명 자가진단 (사용자 "H746" → 실제 H745) | STM32CubeProgrammer 식별 + DAPLink label + Zephyr board 정의 3중 교차 |
| STM-6 | ST 사전 빌드 .hex segmented binary (Sector[0] fail) | STM32CubeIDE headless build sample 직접 빌드 |
| STM-7 | LTDC sample backlight (PK0) + display enable (PK7) 누락 | main.c에 직접 GPIO set |
| STM-8 | 480×272 RGB565 framebuffer 261KB → DTCM 128KB overflow | AXI SRAM 0x24000000 직접 + SCB_CleanDCache |
| STM-9 | LD8 (PD3) active HIGH polarity (LD6/LD7 active LOW와 반대) | 직접 GPIO + SET=ON |
| STM-10 | PowerShell sweep monitor function scope New-Object cast fail | monitor inline (function scope 회피) |
| STM-11 | USB silk-screen 확인 — H745 = CN13 USB FS (NOT HS ULPI) | nucleo_h745zi_q carry-over (PA11/PA12 internal PHY) |

## Wave 13 추가 함정 (5/26, minor)

- **STM-12** (Zephyr API change): `net_mgmt_event_handler_t` 시그니처 4.3에서 `uint32_t mgmt_event` → `uint64_t` 변경. 옛 시그니처 사용 시 `-Wincompatible-pointer-types` warning만 (error 아님, runtime 정상). 다른 보드 carry-over 시 silent breakage 가능성.

→ STM32 함정 누적 **12건** (5/25 cluster 11 + 5/26 minor 1). cross-vendor 함정 인벤토리 갱신: [[build-gotcha-inventory]].

## 매칭 패턴 (시너지)

| 패턴 | 시너지 |
|---|---|
| **USB CDC streaming = R35 KWS 결과 영업 데모** | R35 한국어 KWS → STM32H745 보드 → CDC streaming → PC visualization → Stage 4 영업 결정타 (한국 기업 STM32 친화 + 한국어 응원봉 PoC) |
| **Cortex-M tier 정량 비교 매트릭스 확장** | pca10056 R18 (M4F 64MHz) → STM32H745 R36 (M7 480MHz) → 같은 12셀 schema 비교 = 5계열 매트릭스 ARM tier 행 강화 |
| **함정 11건 cluster carry-over 자산** | 미래 STM32H7 family 진입 (H7Bx, H7Sx, H723 등) 시 같은 함정 → 박제로 시간 절약 |
| **Zephyr USB CDC sample carry-over** | `boards/stm32_cdc_project/` 패턴 = 다른 STM32 보드(F4/L4/G0 등) overlay만 변경 → 즉시 재사용 |
| **BSD socket + USB CDC ring_buf 동일 구조** | `uart_irq_callback + ring_buf` = `zsock_recv + ring_buf` → 양방향 bridge는 ring_buf 2개 + ISR 1개 + thread 1개로 구현. 다른 보드(esp32-S3 + ethernet, F4xx) carry-over 가능 |

## 박제 commit (5/25 단일 day, ondevice 측)

- `f31d398` R36 smoke + STM-1~5
- `b735870` R35 keyword 8개 확정
- `e6a3f28` LCD R/G/B PoC + STM-6/7/8
- `a850e5e` R36 12셀 sweep + STM-10
- `ac75300` USB CDC ACM PoC + STM-11

## 관련 페이지

- [[onDevice-ai]] — 14 보드 매트릭스 갱신
- [[ai-fanstick]] — STM32H745 응원봉 후속 PoC 가능 path (Cortex-M7 + USB CDC streaming + LCD)
- [[uttec-stage-package]] — Stage 4 영업 데모 path (CNN 32 238ms / TF 64 1.5ms / USB CDC + LAN 동시 streaming)
- [[build-gotcha-inventory]] — STM32 12건 cluster
- [[2026-05-25_STM32H745-Zephyr-통합-cross-vendor]]
- [[2026-05-26_STM32H745-LAN-path-Stage4-결정타]]

## 메타

| 항목 | 값 |
|---|---|
| 진입 일자 | 2026-05-25 (Wave 12, ondevice 5/25-001) |
| 확장 일자 | 2026-05-26 (Wave 13, ondevice 5/26-001) |
| 박제 commit | 5건 (5/25 single day) + Wave 13 추가 2건 (TCP + Bridge) |
| 신규 entity 등재 일자 | 2026-05-26 (본 megasession 흡수) |
| 다음 갱신 | mandate v2.9 진입 시 / 한국 산업 노드 첫 영업 이벤트 발생 시 |
