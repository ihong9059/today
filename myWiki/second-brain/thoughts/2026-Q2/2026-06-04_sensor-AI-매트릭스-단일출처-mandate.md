---
title: sensor AI 매트릭스 단일 출처 mandate + 워크플로우 §0.4 표준 + CMSIS-NN chip-specific 매트릭스
type: thought
created: 2026-06-04
updated: 2026-06-04
tags: [sensor, AI매트릭스, 단일출처, mandate, 워크플로우04, factory-rpi4, CMSIS-NN, M7-plain-C, R50, R48-Path-C, INA219, FT5336, INMP441, Path-D, Path-B-4]
links: [onDevice-ai, ai-fanstick, ai-direction, strengths, 영업전략, 위시캣활동, 2026-06-03_R50-touch-mnist-path-D-산업응용]
---

# sensor AI 매트릭스 단일 출처 mandate + 워크플로우 §0.4 + CMSIS-NN chip-specific 매트릭스

## 한 줄

ondevice-claude 카드 005+006+007 megasession 흡수. 본 vault `onDevice_AI/sensor/` 라이브러리 12 모듈 완성 + AI 매트릭스 단일 출처 mandate + 외부 module 7 카테고리 카탈로그 + factory-rpi4 6번째 ssh + 워크플로우 §0.4 표준 + CMSIS-NN chip-specific 매트릭스 검증. **본 vault project 결단 자산화 단일 출처 박제** (결정 41~43).

## 매칭 패턴 1 — 자산화 단일 출처 mandate (사용자 명시 절대 신뢰)

| 자산 | 위치 | 본질 |
|---|---|---|
| sensor 12 모듈 README | `sensor/{MODULE}/` | 9 모듈 (6/3 carry) + FT5336/INMP441 (R50) + INA219 (R48 Path C) |
| AI 매트릭스 단일 출처 | `sensor/AI_매트릭스.md` (491 lines) | 11 sensor × 2~3 AI model × 14 보드 최저선 매핑 |
| 외부 module 7 카테고리 | `sensor/_추가_module_후보/` (8 파일 1,466 lines) | 40+ module: 압력/거리TOF/환경/모션/광학/산업/농업 |

사용 규칙 — **최저선 보드 3축 정의**:
1. RAM hard wall (보드 SRAM ≥ 모델 메모리)
2. accuracy ≥ acceptable (target 응용별)
3. latency ≤ 양산 실시간 (응용별 throughput 요구)

검증 carry 박제값 (절대 신뢰값, 6 instance): R18 3.23× / R44 KWS 9.91ms 75% / R46 9.26ms / R47 1.06× / R50 8.13ms 100% / R48 Path C 100% delta 0pp.

## 매칭 패턴 2 — 워크플로우 §0.4 표준 (원격 학습 + 최저선 deploy 2단계)

`sensor/AI_매트릭스.md §0.4` 명시 박제. 모든 sensor + AI 응용 공통 적용 6 step:

1. **데이터 수집** (factory-rpi4 + sensor)
2. **학습** (uttecMac 16GB / uttecRpi5 8GB asimddp / factory-rpi4 4GB / pc-windows 16GB)
3. **PC 검증** (sanity ≥ target)
4. **INT8 quantize** (R46 calibrate pattern: per-tensor symmetric weight + p99 activation)
5. **MCU port** (pca10040/56 CMSIS-NN / esp32s3 esp-nn / stm32h745disco plain C 또는 CMSIS-NN)
6. **MCU sweep** (latency / accuracy / RAM 3축 검증)

→ factory-rpi4 = 6번째 ssh 머신 (Tailscale 100.109.84.79, Pi 4 Model B Rev 1.5, 4GB, asimddp 없음, Debian 13, gcc 14.2 aarch64, PyTorch 2.12.0+cpu venv `--system-site-packages`). 3중 역할: production QC + 데이터 수집 + 작은 모델 학습/INT8 quantize.

## 매칭 패턴 3 — CMSIS-NN chip-specific 매트릭스 + M7 plain C 우회 path

R46 pca10056 carry (Cortex-M4F 3.14× 가속) → R50 stm32h745 (Cortex-M7) 1:1 적용 시 R50-1 비결정 saturate 발견 → 결정 43:

> "CMSIS-NN port = chip × library × toolchain 매트릭스 검증 필수. Cortex-M7 + L1 cache + dual-issue = plain C가 CMSIS-NN과 동등 latency → M7에서는 plain C 우회 path 권장."

| Chip | CMSIS-NN | Plain C | 권장 |
|---|---|---|---|
| Cortex-M4F (pca10040/56) | ⭐⭐⭐ 3.14× (R18/R46) | baseline | CMSIS-NN 우선 |
| Cortex-M7 (stm32h745) | ⚠️ R50-1 비결정 saturate | ⭐⭐⭐ 8.13ms ≈ CMSIS-NN 8.28ms | **plain C 우회 path** |
| LX7 (esp32s3) | ESP-NN 1.06× (R47) | baseline | ESP-NN 우선 |

## 매칭 패턴 4 — 영업 narrative 확장 결정타

**본 vault 11 sensor 중 9개는 pca10056 (Cortex-M4F 256KB) 이내 양산 가능** → AI FanStick 차세대 BOM에 거의 모든 sensor 추가 가능.

| BOM | 구성 | 영업 포지션 |
|---|---|---|
| K-POP 차세대 $27 | esp32s3 + 5 sensor (INMP441 KWS + MPU-9265 gesture + BH1750 자동 LED + MAX30102 흥분도 + BME680 환경) | 응원봉 sensor cluster |
| Stage 4 산업 $50 | R50 base $30 + 5 sensor $20 | Path D+ 산업 multi-modal input pad |
| 한림용인CC $65 | 기존 BOM $39 + 4 sensor $26 (토양 수분 ×4 + DS18B20 ×4 + INA219 ×2) | 잔디 자동 살수 + 수조 multi-zone + 전력 모니터 |
| K-POP entry $8 | pca10040 + MPU (6축) + battery (Path B-4) | K-POP entry-level "메인 $30 vs entry $8 라인" |

## 매칭 패턴 5 — 위시캣 SOP 룰 5 확장 (cluster 8 신규)

| 위시캣 키워드 | 매칭 sensor + AI model + 최저선 보드 | 새 발주 후보 |
|---|---|---|
| 압력 / 무게 / 하중 / 자판기 / 물류 분류 | (보유 없음) | HX711 + load cell $8 |
| 비접촉 체온 / 출입 통제 | (보유 없음) | MLX90614 $10 |
| 정밀 거리 mm / gesture / 키오스크 | HC-SR04 (cm) | VL53L0X $5 |
| CO2 / 학교 환기 / 회의실 occupancy | (BME680/ENS160 eCO2는 추정) | SCD30 $40 |
| 비접촉 호흡 / 노인 케어 / vital | MAX30102 (PPG 접촉) | HLK-LD2410 $5 |
| 전력 모니터 / 가전 분류 / battery SoC | INA219 (NEW) | — |
| 산업 진동 / 베어링 anomaly | ADXL345 (3.2 kHz) | KX112 $4 (25.6 kHz) |
| 토양 수분 / 자동 살수 / 농업 자동화 | (보유 없음) | 정전식 토양 $2 |
| 방수 multi-zone 수온 / 양식 / 한림용인CC | MAX31865 (정밀 단일) | DS18B20 $3 (1-Wire) |
| 산업 HMI / 키오스크 input pad / 손글씨 / 의료 | **R50 + FT5336 + INMP441** Path D | — |
| Multi-modal HMI / 음성+손글씨+환경 sensor 통합 | **R50 + sensor cluster (Path D+)** | — |
| STM32H745 / Cortex-M7 + LCD touch + AI | **R50 carry** | — |
| capacitive touch / 5-point multi-touch | **FT5336** R50 검증 | — |
| I2S MEMS / 음성 / KWS | **R44 KWS + INMP441** | — |
| Arduino shield 호환 / STM32 + sensor 통합 | **`_STM32H745_EXPANSION/` carry** | — |

→ wishket-claude 측 매칭 시 즉시 BOM + 최저선 보드 + 발주 결단 가이드 제공 가능.

## 다음 cascade

- R50 Step 4·5 (10/10 정량 박제 - 사용자 직접 손글씨 그리기)
- R48 Phase 5 (응원봉 form factor 고정 후 Path B fine-tune, Transfer learning: Path C pretrain → Path B fine-tune)
- 외부 module 일괄 발주 결단 ($100~150 핵심 6)
- `business/entities/AI_FanStick.md` Path D 기술 근거 추가 (다음 ondevice 세션)
- 한림용인CC 양산 노드 sensor 4종 통합 결단

자세히 [[onDevice-ai]] § R50 Step 1~3 + sensor 12 + AI 매트릭스 + [[ai-direction]] § 결정 41~43 + [[ai-fanstick]] § Path D 정량 + Path B-4 + [[strengths]] § 14 sensor 라이브러리.
