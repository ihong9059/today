---
title: QDY30A-B RS485 수위 센서 사양서
type: reference
created: 2026-05-31
sensor_model: QDY30A-B
output: RS485 (Modbus RTU)
protocol: Modbus RTU
applies_to: 한림용인CC 고가수조 자동급수 무선제어
sources:
  - https://manuals.plus/asin/B0D9S3FCTX (ZEEGII QDY30A-B 매뉴얼)
  - https://community.home-assistant.io/t/water-level-sensor-qdy30a-modbus-rs485-with-esp32-s2-mini/698712
  - https://community.home-assistant.io/t/modbus-with-ew11-qdy30a-rs485-water-level-measure-probe/688694
  - https://community.home-assistant.io/t/modbus-water-level-sensor-qdy30a-rs485-waveshare-rs485-to-poe-eth-b-unavailable-in-ha/739638
  - https://ahqidian.en.made-in-china.com/product/ewpGfboVbhcx/...
---

# QDY30A-B RS485 수위 센서 사양서

> 2026-05-31 입수: **RS485 type** (원 계획 4-20mA → 변경됨). nRF52832 SAADC 직결 회로 → UART RS485 회로로 아키텍처 수정 필요.

## 1. 하드웨어 사양

| 항목 | 값 |
|---|---|
| 측정 범위 | 0~0.5m ~ 0~500m H₂O (주문 시 지정) |
| 정확도 | 0.5% FS (기본) / 0.2% FS (옵션) |
| 장기 안정성 | ±2% FS / Year |
| 응답 시간 | ≤ 1 ms (90% FS) |
| 과압 허용 | 200% FS |
| 전원 | DC 24 V (조정 범위 DC 10~30 V) |
| 출력 | RS485 (Modbus RTU) |
| 동작 온도 | -40°C ~ +80°C |
| 보관 온도 | -20°C ~ +85°C |
| 보호 등급 | IP68 |
| 하우징 | 스테인리스 304 또는 316L, 직경 28mm (옵션 19mm) |
| 다이어프램 보호 | nose cap 기본 제공 |
| 절연 저항 | 100 MΩ / 250 VDC |
| 케이블 | 폴리우레탄 + 벤트 튜브 내장 (5/10/50/100 m 표준) |

## 2. RS485 Modbus RTU 통신 (기본 설정 — 검증됨)

| 파라미터 | 기본값 |
|---|---|
| Slave Address | **0x01** |
| Baud Rate | **9600 bps** |
| Data Bits | 8 |
| Parity | **None** |
| Stop Bits | 1 |
| Function Code | **0x03** (Read Holding Registers) |

## 3. Holding Register Map ⭐

| 주소 | 용도 | 값 범위 | R/W | 비고 |
|:-:|---|---|:-:|---|
| 0x0000 | Slave Address | 1~247 | R/W | 변경 시 재부팅 |
| 0x0001 | Baud Rate | (코드값) | R/W | 9600 기본 |
| 0x0002 | Unit | 1=cm, 2=mm | R/W | |
| 0x0003 | Decimal Places | 0~3 | R/W | |
| **0x0004** | **수위 측정값** ⭐ | -32768~32767 (S_WORD) | R | int16 signed |
| 0x0005 | Zero Point (영점 보정) | -32768~32767 | R/W | 측정값에 가산 |
| 0x0006 | Range Full Point (만수 보정) | -32768~32767 | R/W | |

**측정값 단위**: Unit register(0x0002) 설정에 따름. 일부 사용자 보고에 따르면 라벨 cm로 표기돼도 실제 mm 단위 반환 케이스 있음 → **실측 보정 필수**.

## 4. 배선 (검증된 와이어 색 코딩)

| 색 | 신호 |
|:-:|---|
| **빨강 (Red)** | +24 VDC (전원) |
| **녹색 (Green)** | GND |
| **파랑 (Blue)** | RS485 **A+** (positive differential) |
| **노랑 (Yellow)** | RS485 **B-** (negative differential) |

⚠️ **A/B 스왑 함정**: 다수 사용자 보고 — 통신 실패 시 Blue↔Yellow 스왑 시도. 제조사 라벨 신뢰 ↓.

## 5. 회로 통합 (nRF52832 기준 — 4-20mA 안에서 변경)

### 기존 계획 (폐기)
```
QDY30A-B 4-20mA → 250Ω → nRF52832 SAADC
```

### 신규 (RS485)
```
[QDY30A-B] ─ Red(+24V) ───── [DC-DC 24V LDO]
           ├ Green(GND) ──── [GND]
           ├ Blue(A+) ────── [RS485 트랜시버 A]   ┐
           └ Yellow(B-) ──── [RS485 트랜시버 B]   │
                                                  │ (예: MAX485 / SP3485 / SN65HVD75)
                              [DI/RO]──UART TXD/RXD──> nRF52832 UARTE
                              [DE/RE] ─────────────── nRF52832 GPIO (flow control)
                              [120Ω termination across A/B at bus end]
```

### 핵심 변경사항

| 항목 | 4-20mA (원 계획) | RS485 (실제 입수) |
|---|---|---|
| nRF52832 인터페이스 | SAADC (ADC) | UARTE + GPIO (DE/RE) |
| 외부 부품 | 250Ω 정밀저항 + TVS | RS485 트랜시버 IC + 120Ω terminator |
| 전력 소모 | sensor만 ON 제어 가능 (~10mA) | 트랜시버 상시 ON or RX-only sleep |
| 소프트웨어 | ADC 1-shot 변환 | Modbus RTU master stack (CRC16 포함) |
| 노이즈 면역성 | 보통 | **높음** (차동 신호) |
| 다중 노드 | 1:1 | **bus 다중 노드 가능** (1 master + N slaves) |

→ **장점**: 다이아몬드 9번홀 + 사파이어 3번홀 양 고가수조 + 저장탱크 3개에 **bus 1개로 모두 연결 가능** (RS485 multi-drop, 최대 32 노드 / cat5/STP로 ~1.2km까지 전송).

## 6. 검증 체크리스트 (테스트 단계 — 본 sensor 기준)

### Step A: 기본 통신 확립
- [ ] RS485 트랜시버 보드 입수 (MAX485 모듈 권장 — 1,000원 내외)
- [ ] PC USB-RS485 컨버터로 1:1 통신 시도 (Modbus Poll / qModMaster 무료)
- [ ] 슬레이브 0x01 → 0x03 → 0x0004 read 응답 확인
- [ ] **A/B 스왑 필요시 즉시 박제** (제조 lot 별로 상이 가능)
- [ ] Baud rate 9600 / 8N1 / parity none 확인
- [ ] 통신 안 되면 GND 공통(센서·전원·컨버터 모두 묶기) + 120Ω terminator 추가

### Step B: 측정 정확도 검증 (4-20mA 단계 그대로 적용)
- [ ] 0m, 1m, 3m, 5m 정적 정확도 (수직 호스 + 양동이)
- [ ] 24시간 동일 수위 드리프트
- [ ] 실내 ↔ 야외 온도 변화 영향
- [ ] **Unit register(0x0002) 값과 실제 반환 단위 매칭 확인** (cm/mm 혼동 함정)
- [ ] Zero point(0x0005) 보정 적용 시 동작 확인

### Step C: nRF52832 통합
- [ ] Zephyr UART driver + DE/RE GPIO 토글 timing
- [ ] Modbus RTU master 라이브러리 적용 (또는 자체 구현 — CRC16 Modbus polynomial 0xA001)
- [ ] 1분 주기 polling → LoRa payload (8 byte)
- [ ] 전력 소모 측정 (idle / RX / TX / sensor power-cycle)

### Step D: bus 다중 노드 확장 (옵션, 장기)
- [ ] 슬레이브 주소 5개 분배: 0x01~0x05 (탱크별)
- [ ] master polling sequence: 1s 간격 sweep
- [ ] 단일 LoRa 노드 + 5 sensor bus 구성 시 단가 절감 평가

## 7. 제조사·구매 정보

- **모델**: QDY30A 시리즈 — XUYANGQIDIAN / ZEEGII / 다수 OEM 브랜드
- **AliExpress 링크 (5/10 박제)**: aliexpress.com/item/1005008630287402
- **단가**: ~50,000원 (5/10 박제 기준)
- **권장 측정 범위**: 0~7m (탱크 깊이 5m 대비 71% 여유)
- **케이블 길이**: 10m 권장 (탱크 바닥 5m + 외부 1m + 함체 2m + 서비스 루프 2m)

## 8. 알려진 함정 (커뮤니티 박제)

1. **A/B 와이어 스왑** — 다수 사례, 제조 lot 별 상이
2. **단위 표기 ↔ 실제 반환값 불일치** — 라벨 cm지만 mm 반환 사례 있음 → 실측 후 scale factor 결정
3. **전원 부족** — PoE 단독으로 부족, 별도 DC-DC 24V 컨버터 권장
4. **GND 공통 누락** — USB-RS485 컨버터 사용 시 sensor GND·전원 GND·컨버터 GND 모두 묶어야 함
5. **120Ω terminator** — bus 양 끝단 (1.2km 장거리/노이즈 환경)에서 필수

## 9. 출처 (verified 2026-05-31)

- [ZEEGII QDY30A-B User Manual (manuals.plus)](https://manuals.plus/asin/B0D9S3FCTX)
- [Home Assistant: QDY30A + ESP32 S2 mini ESPHome](https://community.home-assistant.io/t/water-level-sensor-qdy30a-modbus-rs485-with-esp32-s2-mini/698712)
- [Home Assistant: EW11 + QDY30A RS485 통합](https://community.home-assistant.io/t/modbus-with-ew11-qdy30a-rs485-water-level-measure-probe/688694)
- [Home Assistant: Waveshare RS485 PoE ETH 트러블슈팅](https://community.home-assistant.io/t/modbus-water-level-sensor-qdy30a-rs485-waveshare-rs485-to-poe-eth-b-unavailable-in-ha/739638)
- [Made-in-China: QDY30A 제조사 product page](https://ahqidian.en.made-in-china.com/product/ewpGfboVbhcx/China-Qdy30A-Analog-DC12V-24V-4-20mA-RS485-Hydrostatic-Smart-Submersible-Stainless-Steel-316-Tank-Water-Level-Sensor.html)
