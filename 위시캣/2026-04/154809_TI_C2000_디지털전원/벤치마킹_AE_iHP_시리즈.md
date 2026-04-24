# Advanced Energy iHP 시리즈 — 벤치마킹 대상 분석

## 제품 개요

| 항목 | 사양 |
|------|------|
| **제조사** | Advanced Energy (Artesyn) |
| **모델명** | iHP24/30 Air Cooled Series |
| **제품 유형** | Configurable Modular AC-DC Power Supply |
| **최대 출력** | 24~30 kW |
| **모듈 구성** | 최대 8슬롯 (3kW 모듈 × 8 또는 12kW + 3kW 혼합) |
| **MTBF** | > 500,000 시간 |
| **보증** | 5년 |

## 입력 사양

| 항목 | 사양 |
|------|------|
| **입력 전압** | 180~660 VAC |
| **3상 옵션** | 208/240V, 380/480V, 600V (캐나다) |
| **입력 주파수** | 47~63 Hz |

## 출력 사양

| 항목 | 사양 |
|------|------|
| **출력 전압 범위** | 0.6 ~ 1000 VDC |
| **3kW 모듈** | 0.6~300 VDC (8개 정격 전압 옵션) |
| **12kW 모듈** | 2.5~360 VDC (50V 또는 300V 정격) |
| **출력 구성** | 최대 8개 독립 출력 |

### 3kW 모듈 라인업 (추정)

| 모듈 | 정격 전압 | 최대 전류 |
|------|----------|----------|
| iHP-C-05 | 5V | 600A |
| iHP-C-12 | 12V | 250A |
| iHP-C-24 | 24V | 125A |
| iHP-C-48 | 48V | 62.5A |
| iHP-C-80 | 80V | 37.5A |
| iHP-C-125 | 125V | 24A |
| iHP-C-200 | 200V | 15A |
| iHP-C-300 | 300V | 10A |

> 정확한 모듈 사양은 AE 데이터시트 확인 필요

## 통신 인터페이스

| 인터페이스 | 설명 |
|-----------|------|
| **아날로그** | 0-5V / 0-10V 제어 |
| **RS485** | 시리얼 통신 |
| **CAN Bus** | 산업용 통신 |
| **Ethernet UDP** | 네트워크 제어 |
| **Ethernet TCP/IP** | 네트워크 제어 |
| **EtherCAT** | Isocomm 모듈 (옵션) |
| **GUI** | 소프트웨어 대시보드 |

## 물리 사양

| 항목 | 사양 |
|------|------|
| **크기** | 706.8 × 447.0 × 132.5 mm (18" × 17.6" × 5.22") |
| **냉각** | 강제 공냉 (Air Cooled) |

## 보호 기능

- OVP (과전압 보호)
- OCP (과전류 보호)
- OTP (과온 보호)
- Short Circuit Protection (단락 보호)

## 인증

| 인증 | 규격 |
|------|------|
| **안전** | EN/UL 62368 |
| **의료** | IEC/EN/UL 60601-1 |
| **반도체** | SEMI F47 compliant |

## 주요 특징 (국산화 시 구현 필요)

1. **모듈러 설계** — 3kW 단위 플러그인 모듈, 핫스왑 가능
2. **디지털 제어** — DSP 기반 전압/전류 정밀 제어
3. **다중 출력** — 최대 8개 독립 출력 동시 운용
4. **고정밀** — 업계 최저 수준 리플 잡음
5. **고속 응답** — 슬루 레이트 200Hz
6. **다중 통신** — RS485, CAN, Ethernet, EtherCAT 지원
7. **프로그래머블** — GUI/API를 통한 원격 제어

## 참고 링크

- 제품 페이지: https://www.advancedenergy.com/en-us/products/ac-dc-power-supply-units/configurable-modular-psus/ihp/ihp/
- 데이터시트: https://www.advancedenergy.com/getmedia/0dc938c5-1b6a-4ea3-8fad-8c5f9c274470/ENG-IHP-235-01-01-09-24.pdf
- Artesyn 제품 페이지: https://www.artesyn.com/power-supplies/websheet/606/ihp-series
