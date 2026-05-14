---
title: pca10056 (Nordic nRF52840 DK) — spec
type: hardware-spec
created: 2026-05-15
board_id: PCA10056
chip: nRF52840
tier: T1
status: skeleton
---

# pca10056 — nRF52840 DK

## 한 줄 위치

본 vault에서 **무선 응용 표준**. RAM 256KB + BLE 5 + USB + NFC로 "AI + 무선 통합 노드"의 reference platform.

## 사양

| 항목 | 값 |
|---|---|
| 칩 | Nordic nRF52840 (QIAA-R) |
| 코어 | ARM Cortex-M4F @ 64MHz (FPU 있음) |
| **RAM** | **256KB** |
| **Flash** | **1MB** |
| 무선 | Bluetooth 5 (LE), 802.15.4 (Thread/Zigbee), ANT, 2.4GHz proprietary |
| USB | **Native USB 2.0** (full-speed) |
| NFC | NFC-A 태그 |
| 보안 | ARM CryptoCell-310 (HW 가속 AES/RSA/ECC) |
| AI 가속 | ❌ — FPU만 |
| SIMD | ❌ (DSP 명령 일부) |
| 전력 | 0.4μA sleep, 4.8mA TX@0dBm |
| 가격 (DK) | ~$50 |

## 입수

- 공식: nordicsemi.com / Mouser / Digi-Key
- 한국: Devicemart, IC뱅크
- **사용자 보유: ✅** (2026-05-15 확인)

## 개발 환경

| 항목 | 도구 |
|---|---|
| SDK | nRF Connect SDK (Zephyr) — 권장 / nRF5 SDK (legacy) |
| IDE | VS Code + nRF Connect Extension |
| Toolchain | GCC ARM (Zephyr 통합) |
| 디버거 | J-Link OB 내장 |
| AI 프레임워크 | TFLM / CMSIS-NN / Edge Impulse |

## AI 관련 특이점

- **pca10040 대비 RAM 4배**: 256KB로 모델·KV 캐시·activation buffer 여유가 생김. microGPT 154K INT8 (~150KB) 도 검토 가능.
- **USB native**: PC와 직접 시리얼·HID·MSC 통신 — **데이터 수집·모델 OTA 업데이트**에 유리.
- **NFC**: AI 추론 결과를 태그에 즉시 기록 → 스마트폰 NFC 리딩으로 출력 가능.
- **CryptoCell**: 모델 가중치 암호화·복호화 가속 → **모델 IP 보호** 시나리오 가능.

## 본 vault 관련성

| 질문 | 답 |
|---|---|
| 정의 Section 6의 어느 축? | 응용 축 Q9 (BLE 결합 task), 하드웨어 축 Q4 (대안 칩) |
| 왜 검증하는가? | ESP32 진영 외 **ARM 표준 진영**의 reference. 둘 비교로 "어느 진영이 AI에 유리한가" 답. |
| 영업 가치 | 산업 IoT 센서 노드 (BLE 5 Mesh 결합), 의료 웨어러블, 보안 토큰 |
| 우선순위 | 보조 (esp32s3 다음, pca10040 보다 우선) |

## 제약·함정

- **AI 가속 없음**: SIMD/벡터 명령 없어 ESP32-S3 대비 3~5배 느린 추론 예상.
- **Flash 1MB는 충분하나 RAM이 병목**: 모델 가중치는 Flash에 두고 stream하는 설계 권장.
- **Zephyr 학습 곡선**: nRF Connect SDK가 Zephyr 기반으로 전환 — RTOS 개념 익숙 필요.
- **NFC와 BLE 동시**: 안테나 간섭 가능, 배치 주의.

## 다음 검증 (Phase 2 이후)

- [ ] 보드 입수 또는 보유 확인
- [ ] 01_baseline.md — Zephyr hello_world, free RAM 측정
- [ ] 02_model_limits.md — microGPT 4K, 154K INT8 시도
- [ ] 03_inference_bench.md — Cortex-M4F vs Xtensa LX7 (esp32s3) 정량 비교
- [ ] 04_applications.md — BLE 5 Mesh + AI 노드 시나리오

## 참조

- 칩 datasheet: https://docs.nordicsemi.com/bundle/ps_nrf52840/
- DK 가이드: https://docs.nordicsemi.com/bundle/ug_nrf52840_dk/
- nRF Connect SDK: https://docs.nordicsemi.com/bundle/ncs-latest/
