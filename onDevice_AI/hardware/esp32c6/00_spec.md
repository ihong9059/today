---
title: esp32c6 (ESP32-C6) — spec
type: hardware-spec
created: 2026-05-15
board_id: ESP32-C6-DevKitC / ESP32-C6-WROOM-1
chip: ESP32-C6
tier: T1
status: skeleton
---

# esp32c6 — ESP32-C6

## 한 줄 위치

본 vault에서 **차세대 저전력 IoT 플랫폼**. RISC-V + WiFi 6 + BLE 5 + 802.15.4(Thread/Zigbee/Matter)로 "Matter 표준 결합 AI 노드"의 시장 진입 후보.

## 사양

| 항목 | 값 |
|---|---|
| 칩 | Espressif ESP32-C6 |
| 코어 | RISC-V single @ 160MHz (HP) + RISC-V LP @ 20MHz |
| **RAM** | **512KB HP SRAM** + 16KB LP SRAM |
| **Flash** | 4MB (모듈 기본) |
| 무선 | **WiFi 6 (ax)** + BLE 5 + **802.15.4** (Thread/Zigbee/Matter) |
| AI 가속 | ❌ — FPU 없음 (단정밀도 FP는 소프트웨어) |
| SIMD | ❌ |
| 보안 | HW 가속 AES/SHA/RSA/ECC, Secure Boot v2, Flash Encryption |
| 전력 | 7μA deep sleep, ~120mA WiFi TX |
| 가격 | $8 (모듈) / $10~$12 (DevKitC) |

## 입수

- 공식: Espressif store
- 한국: Devicemart, Eleparts (2024~25 본격 유통)
- **사용자 보유: ✅** (2026-05-15 확인)

## 개발 환경

| 항목 | 도구 |
|---|---|
| SDK | ESP-IDF v5.1+ (C6 지원 필수) |
| IDE | VS Code + ESP-IDF Extension |
| Toolchain | riscv32-esp-elf-gcc (xtensa 아님!) |
| AI 프레임워크 | TFLM (Espressif 포크, C6 지원) |
| Matter | esp-matter SDK |

## AI 관련 특이점

- **RISC-V 단일 코어**: dual core인 esp32wroom·s3 대비 동시 통신/추론 분담 어려움. 추론 중 WiFi 처리 제한.
- **AI 가속 없음**: esp32wroom과 같은 위치 — 비교군. 단 RISC-V 명령 셋이라 esp32s3 SIMD와 ISA 차이.
- **WiFi 6 + Matter**: 본 칩의 진짜 가치는 AI보다 **연결성**. AI는 부수 기능으로 결합.
- **저전력 LP 코어**: wake-on-event 시나리오에 유리 (배터리 IoT).

## 본 vault 관련성

| 질문 | 답 |
|---|---|
| 정의 Section 6의 어느 축? | 하드웨어 축 Q4 (대안 칩), 응용 축 Q9 (Matter 결합) |
| 왜 검증하는가? | "Matter 표준 + AI 결합 노드" 시장 진입의 기술 검증. WiFi 6 흐름 대응. |
| 영업 가치 | 스마트홈 매터(Matter) 시장 (2025~ 본격), AI 결합 시 차별화 |
| 우선순위 | 보조 (esp32s3 다음, Matter 응용 발견 시 우선) |

## 제약·함정

- **FPU 없음**: nRF52 (Cortex-M4F) 대비 부동소수점 연산 매우 느림 — INT 양자화 필수.
- **RISC-V 신생**: 라이브러리·예제 esp32s3 대비 부족. TFLM은 지원하나 일부 최적화 누락.
- **Matter SDK 무거움**: Flash 4MB로 AI 모델 + Matter stack 동시 적재 빠듯.
- **dual core 아님**: 추론 중 다른 작업 동시 처리 한계.

## 다음 검증

- [ ] 보드 확인
- [ ] 01_baseline.md — ESP-IDF v5.1+ hello_world (RISC-V toolchain)
- [ ] 02_model_limits.md — microGPT INT8 적재 (FPU 없음 영향)
- [ ] 03_inference_bench.md — esp32wroom·s3와 비교
- [ ] 04_applications.md — Matter 결합 AI 응용 (스마트 센서 등)

## 참조

- 칩 datasheet: https://www.espressif.com/sites/default/files/documentation/esp32-c6_datasheet_en.pdf
- ESP-C6 기술 reference: https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/
- Matter SDK: https://github.com/espressif/esp-matter
