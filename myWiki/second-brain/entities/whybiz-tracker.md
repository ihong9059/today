---
title: whybiz GPS Tracker (IoT 모듈 IP)
type: entity
created: 2026-05-09
updated: 2026-05-09
tags: [IoT, GPS, LoRa, Modbus, BLE Mesh, IP, 모듈]
links: [oldProject, skills, 양산제품, revita, 영업전략]
---

# whybiz GPS Tracker

## 한 줄 정의
GPS + LoRa + LTE Cat M1 + Zigbee + Modbus 통합 IoT 추적 시스템. UTTEC의 **모듈러 IoT 솔루션 IP** 핵심 자산.

## 왜 중요한가
- 다채널 통신 통합 (5종) — [[skills|기술 스택]] "통신 프로토콜 다양성" 강점의 실체
- 신규 IoT 프로젝트 시 모듈 단위 즉시 재조합 가능
- [[revita|REVITA]]와 함께 IoT 사업 라인의 두 축

## 보관 위치
- `oldProject/whybiz/` (253 files / 78.4 MB)
- repo: ihong9059/oldProject (private)

## 통신 모듈 인벤토리

| 모듈 | 칩 | 용도 | 자료 위치 |
|---|---|---|---|
| **LTE Cat M1** | Quectel EG915U | 광역 추적 | `tracker_final/EG915U/` (14.7 MB) |
| **GPS L1+L5** | Quectel LG77L | 정밀 측위 | `tracker_final/LG77L/` (21 MB) |
| **Zigbee** | Quectel KG200Z | 메시 네트워크 | `tracker_final/KG200Z/` (6.2 MB) |
| **LoRa** | (자체 설계) | 장거리 저전력 | `lora/` (10.6 MB) |
| **Modbus RTU** | (RS-485) | 산업 시리얼 | `modbus/` (3.9 MB) |
| **BLE** | nRF52832/52840 | 근거리 무선 | `회로도/bleModule.pdf` (oldProject 회로도 폴더) |

## PCB 자산

### Tracker 최종 (tracker_final/)
- 143 files / 88 MB
- Quectel 모듈 데이터시트 + 통합 회로도 + Quectel 공식 설정 가이드(QCOM)
- Quectel Qnavigator (3rd party 도구)는 큐레이션 시 제외

### 모듈 PCB Gerber
- `GPS_tracker거버pdf/` (9 files / 1.9 MB) — GPS Tracker 메인 보드
- `module거버pdf/` (7 files / 0.5 MB) — 센서 모듈 보드
- `mother거버pdf/` (9 files / 1.2 MB) — Mother 보드
- `mother_module_IO_Board_V0.1/` (6 files / 1.3 MB) — IO 확장 보드
- `sensorModule/` (12 files / 1.6 MB) — 센서 모듈 v2
- `oldModule/sensorModule/` (63 files / 3.5 MB) — v1 (revision history)

### 시험 샘플
- `시험Sample/` (4 files / 1.9 MB) — 양산 검증용 샘플

## 부수 자료
- `Quectel_GNSS_SDK_Commands_Manual_V1.4.pdf` — GNSS AT 커맨드 매뉴얼
- `wirepas 2 uart.docx` — Wirepas Mesh UART 인터페이스
- `Sensor Com Module.pptx` — 센서 통신 모듈 개요
- `0911_11차/` — 11차 revision 자료
- `ESP32_C6/` — ESP32-C6 기반 변형 검토

## 재사용 시나리오
1. **위시캣 IoT 프로젝트** — 모듈 1~2개 즉시 추출 가능
2. **신규 GPS 추적 솔루션** — tracker_final 베이스 변형
3. **REVITA 확장** — LoRa·BLE 모듈 호환
4. **AI FanStick 일본 진출** — Quectel LTE 모듈 노하우 활용

## 관련 페이지
- [[oldProject]]: 자료 원본 위치
- [[skills]]: 통신 프로토콜 7종 다양성 근거
- [[양산제품]]: 양산 후보 (현재 양산은 nRF52832 BLE만)
- [[revita]]: 자매 IoT 사업 (LoRa 공통)
- [[영업전략]]: IoT 솔루션 영업 카드
