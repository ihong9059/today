---
title: pca10040 (Nordic nRF52832 DK) — spec
type: hardware-spec
created: 2026-05-15
board_id: PCA10040
chip: nRF52832
tier: T1-
status: skeleton
---

# pca10040 — nRF52832 DK

## 한 줄 위치

본 vault에서 **극한 압축 baseline**. RAM 64KB로 어디까지 가능한지가 "On-Device AI 하한선" 검증의 기준점.

## 사양

| 항목 | 값 |
|---|---|
| 칩 | Nordic nRF52832 (QFAA-R) |
| 코어 | ARM Cortex-M4F @ 64MHz (FPU 있음) |
| **RAM** | **64KB** |
| **Flash** | **512KB** |
| 무선 | Bluetooth 5 (LE), Bluetooth Mesh, ANT, 2.4GHz proprietary |
| 안테나 | PCB 내장 + SMA |
| USB | 디버그 (no native USB) |
| AI 가속 | ❌ — FPU만 (FP32 단정밀도 가속) |
| SIMD | ❌ (DSP 명령 일부 있음 — SMLAD 등) |
| 전력 | <500nA sleep, 5.3mA TX@0dBm |
| 가격 (DK) | ~$40 |

## 입수

- 공식: nordicsemi.com / Mouser / Digi-Key
- 한국: Devicemart, IC뱅크 등
- **사용자 보유: ✅** (2026-05-15 확인)

## 개발 환경

| 항목 | 도구 |
|---|---|
| SDK | nRF5 SDK (구) / nRF Connect SDK (Zephyr 기반, 신) |
| IDE | Segger Embedded Studio (free for Nordic) / VS Code + nRF Connect |
| Toolchain | GCC ARM (arm-none-eabi-gcc) |
| 디버거 | J-Link OB 내장 |
| AI 프레임워크 | TensorFlow Lite Micro (TFLM) / CMSIS-NN |

## AI 관련 특이점

- **FPU 활용**: FP32 곱셈 1 cycle (Cortex-M4F). 단, 양자화 INT8이 메모리 효율상 필수.
- **CMSIS-NN**: ARM 공식 신경망 라이브러리. INT8 곱셈 누적(SMLAD)으로 4 elements/cycle 가속. AI 가속이라기엔 약하지만 무가속 대비 3~5x.
- **메모리가 가장 큰 제약**: 64KB 중 시스템·BLE 스택·앱이 차지하면 모델용 가용 RAM 20~40KB 수준.

## 본 vault 관련성

| 질문 | 답 |
|---|---|
| 정의 Section 6의 어느 축? | 모델 축 Q1 (최소 모델 크기), 양자화 축 Q10 (정확도 손실) |
| 왜 검증하는가? | "이 보드도 되면 ESP32는 당연히 된다"는 **하한선 증명** |
| 영업 가치 | BLE 응용 + AI = 무선 센서 노드 시장 (산업 IoT) |
| 우선순위 | 보조 (esp32s3 다음) |

## 제약·함정

- **RAM 64KB는 진짜 빠듯**: BLE 스택만 20~30KB. 앱+모델 합쳐 30~40KB로 짜야 함.
- **PSRAM 없음**: 외장 메모리 확장 불가. 모델은 Flash에 두고 일부만 RAM에 로드하는 streaming 추론 설계 필요.
- **FP16 직접 지원 없음**: M4F는 FP32만. FP16은 소프트웨어 변환 비용.
- **microGPT 4K params INT8 (4KB)** → 들어가지만, KV 캐시·activation buffer 합치면 빠듯.

## 다음 검증 (Phase 2 이후)

- [ ] 보드 입수 (사용자 직접)
- [ ] 01_baseline.md — hello_world, RAM 가용 측정
- [ ] 02_model_limits.md — microGPT 4K INT8 적재 시도
- [ ] 03_inference_bench.md — 추론 latency 측정
- [ ] 04_applications.md — BLE 결합 응용 카탈로그

## 참조

- 칩 datasheet: https://docs.nordicsemi.com/bundle/ps_nrf52832/
- DK 가이드: https://docs.nordicsemi.com/bundle/ug_nrf52832_dk/
- TFLM Cortex-M: https://www.tensorflow.org/lite/microcontrollers
- CMSIS-NN: https://github.com/ARM-software/CMSIS-NN
