---
title: esp32wroom (ESP32-WROOM-32) — spec
type: hardware-spec
created: 2026-05-15
board_id: ESP32-WROOM-32
chip: ESP32 (original)
tier: T1
status: skeleton
---

# esp32wroom — ESP32-WROOM-32

## 한 줄 위치

본 vault에서 **ESP32 baseline (AI 가속 없음)**. esp32s3와의 비교군으로 "AI SIMD가 실제로 얼마나 차이를 만드는가" 정량화에 사용.

## 사양

| 항목 | 값 |
|---|---|
| 칩 | Espressif ESP32 (original) |
| 코어 | Xtensa LX6 dual @ 240MHz (+ ULP coprocessor) |
| **RAM** | **520KB SRAM** (DRAM 320KB + IRAM 200KB) |
| RTC SRAM | 16KB (deep sleep 보존) |
| **Flash** | 4MB (모듈 기본, 8/16MB 옵션) |
| PSRAM | 옵션 (WROOM-32E는 없음, WROVER는 8MB) |
| 무선 | WiFi 4 (b/g/n) + Bluetooth 4.2 (Classic + BLE) |
| AI 가속 | ❌ — FPU만 (single-precision FP32) |
| SIMD | ❌ |
| 전력 | 10μA deep sleep, ~160mA WiFi TX |
| 가격 | $5 (모듈) / $10 (DevKitC) |

## 입수

- 공식: Espressif store / Amazon / AliExpress
- 한국: Devicemart, Eleparts, IC뱅크 (DevKitC 흔함)
- **사용자 보유: ✅** (2026-05-15 확인, AI FanStick 양산 칩과 동급)

## 개발 환경

| 항목 | 도구 |
|---|---|
| SDK | ESP-IDF v5.x (공식, FreeRTOS 기반) |
| IDE | VS Code + ESP-IDF Extension / Arduino IDE / PlatformIO |
| Toolchain | xtensa-esp32-elf-gcc |
| AI 프레임워크 | TFLM (Espressif 포크) / ESP-NN (legacy) |

## AI 관련 특이점

- **AI 가속 없음 — 비교군의 가치**: esp32s3의 vector instruction이 빠지면 추론이 얼마나 느려지는가? 본 보드가 정량 비교의 기준.
- **dual core 활용**: 한 core는 WiFi/BLE 통신, 한 core는 추론 — 응용 시 분담 설계 가능.
- **ULP coprocessor**: 초저전력 wake-on-event용 (RISC-V 별도 코어, ESP32-S3와 다름). AI 추론 불가.
- **PSRAM 옵션**: WROOM-32E는 없으나 WROVER 변형은 8MB PSRAM. **AI 응용은 WROVER 권장** (본 폴더는 WROOM 기준).

## 본 vault 관련성

| 질문 | 답 |
|---|---|
| 정의 Section 6의 어느 축? | 양자화 축 Q12 (SIMD 효과 측정), 하드웨어 축 Q5 (가속 칩 vs 일반 칩) |
| 왜 검증하는가? | "esp32s3가 AI 가속 덕에 정말 빠른가" 정량 증명. 양산 칩 선택 의사결정의 근거. |
| 영업 가치 | $5 칩에 AI 가능하면 **저가 양산 라인** 시장. 단, 가속 없으면 응용 한정. |
| 우선순위 | 후순위 (esp32s3 측정 후 비교군으로) |

## 제약·함정

- **AI 가속 없음**: INT8 추론도 일반 곱셈으로 — esp32s3 대비 5~10배 느릴 수 있음.
- **WROOM vs WROVER 혼동**: 같은 ESP32 칩이라도 PSRAM 유무로 가능 모델 크기가 다름. 본 파일은 WROOM 기준 (RAM 520KB only).
- **Xtensa LX6는 단종 진행형**: 신규 설계는 ESP32-S3 (LX7) 또는 RISC-V (C6) 권장.

## 다음 검증

- [ ] 보드 확인 (WROOM vs WROVER)
- [ ] 01_baseline.md — ESP-IDF hello_world
- [ ] 02_model_limits.md — microGPT 4K, 154K INT8
- [ ] 03_inference_bench.md — esp32s3와 동일 모델 비교
- [ ] 04_applications.md — 가속 없이 가능한 응용 범위

## 참조

- 칩 datasheet: https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf
- ESP-IDF: https://docs.espressif.com/projects/esp-idf/
- TFLM ESP fork: https://github.com/espressif/tflite-micro-esp-examples
