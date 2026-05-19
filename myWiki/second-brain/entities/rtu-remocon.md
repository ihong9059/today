---
title: rtuRemocon — RS485 Modbus + CC1101 OOK 통합 응용
type: entity
created: 2026-05-20
updated: 2026-05-20
tags: [revita, RS485, Modbus, CC1101, OOK, 산업통합, 양산자산]
links: [revita, AISG, 한림용인cc-고가수조, shield, 영업전략, strengths]
---

# rtuRemocon — RS485 Modbus + CC1101 OOK 통합 응용

## 한 줄 정의

**RS485 Modbus RTU(0x20) + CC1101 OOK 447.925 MHz + Flask Web UI(:5003) 통합 응용**. revita 측에서 2026-05-15 end-to-end 검증 완료. 기존 CC1101 OOK Replay 자산을 **산업 표준 프로토콜(Modbus)로 패키징**하여 단순 PoC → 운용 가능 제품으로 격상.

## 위치

- vault: `C:\todo\revitaProject\application\revitaWiki\entities\entity-rtu-remocon.md` (원본)
- 본 entity: mywiki 측 사업 자산 박제 (revita ingest #9 흡수, 5/20)

## 기술 구성

| 레이어 | 기술 |
|---|---|
| **RF** | CC1101 OOK 447.925 MHz (revita 검증 자산) |
| **산업 통신** | RS485 Modbus RTU 슬레이브 (slave_id=0x20) |
| **MCU** | STM32 (Blue Pill 등) + 소프트웨어 UART (TIM4 1MHz bit-bang) |
| **Web UI** | Flask :5003 (RPi 호스팅) |
| **응답 패턴** | ACK/NACK (FC06 + exception code 0x04) |

## 차별점 (강의·교재 자산화 가치)

1. PCB PA2/PA3 역배선 → 소프트웨어 UART 구현 (HW USART 사용 불가)
2. ACK/NACK 응답 패턴 (Modbus exception)
3. pymodbus 3.13.0 API 변경 대응 (`slave=` → `device_id=`)

## 사업 가치 (mywiki 영업 자산)

### skills.md 후보 — "RS485 Modbus + RF 무선 통합 시스템 풀스택"

산업 표준 프로토콜 + RF 양산 자산 + Web UI 운용 = 통합 풀스택. 데모는 누구나 만들지만 운용은 1인 기업이 직접.

### strengths.md 후보 — "검증된 RF 자산을 Modbus 슬레이브로 패키징"

산업 시설(PLC/HMI)·고가수조·골프장 IoT에 즉시 통합 가능 — **단순 RF Replay** 인식에서 **산업 통합 제어 시스템**으로 격상.

### 영업 응용 후보

| 도메인 | 응용 |
|---|---|
| 한림용인CC 고가수조 | 다중 밸브 RS485 통합 후보 (8노드) |
| 시설농업 IoT | Modbus RTU 통합 |
| 산업 시설 무선 제어 | RS485 → CC1101 game |
| 위시캣 AISG 3.0 #155057 | RF Replay 인식 격상 → 산업 통합 제어 카피 |
| shield-claude vault | 동일 도메인 검증 패턴 공유 |

## 양산 자산 lifecycle

```
CC1101 OOK Replay (PoC, 2025)
  ↓ packaging
Modbus RTU 슬레이브 + Flask Web UI (운용, 2026-05-15)
  ↓ 사업화
산업 통합 제어 시스템 (영업 trigger)
  ↓ 매칭
AISG 3.0 / 한림용인CC / 시설농업 IoT
```

## 관련 페이지

- [[revita]] — 본 자산의 원천 vault
- [[AISG]] (예정 또는 [[위시캣활동]] § AISG 매칭)
- [[한림용인cc-고가수조]] — 8노드 다중 밸브 응용 후보
- [[shield]] — RS485 + LoRa 통합 시험 플랫폼
- [[strengths]] — 검증된 풀스택 보유

## 메타

| 항목 | 값 |
|---|---|
| 검증 완료 | 2026-05-15 (revita ingest #9) |
| 신설 트리거 | revita-claude 5/17-003 카드 흡수 |
| 신설일 | 2026-05-20 |
| 사업 가치 | 매우 높음 ⭐ — 수주 영업 trigger |
