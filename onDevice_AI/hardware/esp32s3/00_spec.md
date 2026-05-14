---
title: esp32s3 (ESP32-S3) — spec
type: hardware-spec
created: 2026-05-15
board_id: ESP32-S3-DevKitC-1 / ESP32-S3-WROOM-1
chip: ESP32-S3
tier: T1+
status: skeleton
priority: **메인 타겟**
---

# esp32s3 — ESP32-S3

## 한 줄 위치

본 vault의 **메인 타겟**. microGPT·AI FanStick 검증의 1순위. Xtensa LX7의 vector instruction(AI SIMD) + 최대 8MB PSRAM으로 "MCU에서 LLM을 돌릴 수 있는 가장 유력한 칩".

## 사양

| 항목 | 값 |
|---|---|
| 칩 | Espressif ESP32-S3 |
| 코어 | **Xtensa LX7 dual** @ 240MHz (+ ULP RISC-V coprocessor) |
| **RAM (내장)** | **512KB SRAM** (HP) + 16KB RTC SRAM |
| **PSRAM (외장)** | 옵션 **최대 8MB** (Octal SPI) — WROOM-1 N16R8 등 |
| Flash | 8MB / 16MB (모듈별) |
| 무선 | WiFi 4 (b/g/n, 2.4GHz) + BLE 5 |
| **AI 가속** | ✅ **vector instructions** (128-bit SIMD), INT8/INT16 동시 곱셈, dot product |
| FPU | ✅ FP32 단정밀도 |
| USB | Native USB-OTG, USB-Serial-JTAG |
| 보안 | AES/SHA/RSA HW 가속, Digital Signature, World Controller, Secure Boot v2 |
| 카메라 | DVP 인터페이스 (camera 직접 연결) |
| 전력 | 7μA deep sleep, ~150mA WiFi TX |
| 가격 | $10 (모듈 N16R8) / $15~$20 (DevKitC-1 N16R8) |

## 입수

- 공식: Espressif store / Mouser
- 한국: Devicemart, Eleparts, IC뱅크 (DevKitC-1 흔함)
- **권장 변형**: ESP32-S3-WROOM-1 **N16R8** (Flash 16MB + PSRAM 8MB) — AI 응용 표준
- **사용자 보유: ✅** (2026-05-15 확인, AI FanStick 차세대 후보 칩)

## 개발 환경

| 항목 | 도구 |
|---|---|
| SDK | ESP-IDF v5.x (S3 완전 지원) |
| IDE | VS Code + ESP-IDF Extension |
| Toolchain | xtensa-esp32s3-elf-gcc |
| AI 프레임워크 | **TFLM (Espressif 포크, S3 SIMD 최적화)** / ESP-DL (Espressif 공식 DL 라이브러리) / Edge Impulse |
| 양자화 도구 | TensorFlow → TFLite Converter → ESP-DL Quantizer |

## AI 관련 특이점

- **Vector instruction (AI SIMD)**: 128-bit 레지스터로 INT8 16개 동시 곱셈·누적. esp32wroom 대비 **3~10배 추론 가속**.
- **PSRAM 8MB**: 내장 SRAM 512KB 부족 시 외장으로 확장. 단, PSRAM 접근은 SRAM 대비 5~10배 느림 → **자주 쓰는 weight·activation은 SRAM 캐시 필요**.
- **ESP-DL 라이브러리**: Espressif 공식 — 얼굴 인식·객체 탐지·인간 검출 등 pre-quantized 모델 제공. S3 SIMD 최적화 내장.
- **카메라 DVP**: OV2640·OV5640 직결로 비전 응용 (ESP32-CAM 류). AI + 카메라 통합 응용에 강점.

## 본 vault 관련성

| 질문 | 답 |
|---|---|
| 정의 Section 6의 어느 축? | **전 축** — 모델 Q1·Q2·Q3, 하드웨어 Q6 (PSRAM 효과), 양자화 Q12 (SIMD 효과), 응용 Q7 (AI FanStick) |
| 왜 검증하는가? | "MCU급 On-Device AI"의 메인 증명. **본 vault의 핵심 가설은 esp32s3에서 결정됨**. |
| 영업 가치 | Stage 4 1,500만 패키지의 기술 근거 1순위. AI FanStick 차세대 후보 칩 (정지선 내 PR·B2B 한정). |
| 우선순위 | **1순위** |

## 제약·함정

- **WROOM vs WROVER 혼동 (재발 주의)**: S3 라인업은 N4R2 / N8R8 / N16R8 등 변형 다수. **반드시 N16R8 (Flash 16MB + PSRAM 8MB) 권장** — AI 응용 표준.
- **PSRAM 속도**: 내장 SRAM 1 cycle vs PSRAM 5~10 cycle. weight를 PSRAM에 두고 작은 SRAM 버퍼로 streaming하는 설계 필수.
- **WiFi와 SIMD 동시**: dual core라도 WiFi RX·TX 중 SIMD 명령 stall 가능. 시간 critical 응용은 core 분담 + 인터럽트 우선순위 설계.
- **양산 응원봉 정지선 (2026-05-08)**: 본 vault의 esp32s3 검증은 **PR·B2B·강의** 용도까지만. Phase 3+ 양산 적용은 ⛔.

## 다음 검증

- [x] 모델 분석 (5/8): microGPT 4K INT8 4.1KB, 154K INT8 150KB → 적재 가능
- [ ] 보드 입수 (사용자 직접)
- [ ] 01_baseline.md — ESP-IDF hello_world, SRAM/PSRAM 가용 측정
- [ ] 02_model_limits.md — microGPT 4K·154K 실측 적재
- [ ] 03_inference_bench.md — vector instruction 가속 실측 (vs esp32wroom)
- [ ] 04_applications.md — AI FanStick 응원 패턴 + microGPT 텍스트 생성

## 참조

- 칩 datasheet: https://www.espressif.com/sites/default/files/documentation/esp32-s3_datasheet_en.pdf
- 기술 reference: https://docs.espressif.com/projects/esp-idf/en/stable/esp32s3/
- ESP-DL: https://github.com/espressif/esp-dl
- TFLM ESP fork: https://github.com/espressif/tflite-micro-esp-examples
- 기존 microGPT 검증 (S3 분석): `../../microGPT/01_검증절차.md`
- AI FanStick 학습 설계: `../../aiFanStick_차세대/학습설계/04_권장_로드맵.md`
