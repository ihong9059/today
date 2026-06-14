---
title: 솔라 전원 LoRa 노드 전원 체인 + Nordic Long Range 구분
type: thought
created: 2026-06-15
updated: 2026-06-15
tags: [lora, power, solar, nordic, hardware, 한림용인CC]
links: [[lora]]
---

# 솔라 전원 LoRa 노드 전원 체인 + Nordic Long Range 구분

한림용인CC 야외 수조 LoRa 노드(및 revita 야외 노드) 전원·RF 설계 상담에서 정리된 재사용 지식. 출처 = 2026-06-15 기술 상담 세션.

## 1. Nordic "Long Range" = BLE Coded PHY ≠ LoRa

흔한 혼동 차단. Nordic의 long range는 **Bluetooth 5 LE Coded PHY**(S=2 500kbps / S=8 125kbps)이고, Semtech **LoRa 변조와 완전히 다른 기술**. 거리도 BLE Coded PHY는 LOS 수백m~1km, LoRa는 수~십수 km로 체급이 다름. → Nordic 칩 단독으로 E22(LoRa)를 대체하는 개념 아님.

**칩별 Coded PHY(Long Range) 지원** (시작점 = nRF52 세대, 단 칩별 상이):

| 칩 | Long Range | 비고 |
|---|:---:|---|
| nRF51 계열 | ❌ | BT4.2, Coded PHY 없음 |
| nRF52810 / **nRF52832** | ❌ | ⚠️ **52832 = 한림 양산칩, 미지원** |
| nRF52811 | ✅ | 💰 최저가 진입점 |
| nRF52820 / 52833 / 52840 | ✅ | 52840 풀스펙(+8dBm) |
| nRF5340 / nRF54L15 / 54H20 | ✅ | 최신 세대 |

- 더 멀리: **nRF21540 FEM**(PA/LNA, +20dBm) 추가 가능.
- 한림 구조는 nRF52832(MCU) + E22(LoRa 라디오) UART 연동 → 장거리는 E22 담당. 52832 Coded PHY 미지원이 현 양산설계에 문제 안 됨. Nordic 자체 무선 장거리는 → SPI LoRa 모듈(E22-M/E19) + Zephyr lora 드라이버 전환 논의(lora vault _inbox 카드)와 직결.

## 2. 솔라 → 3.3V 전원 체인

솔라 출력은 불안정(일사량 따라 변동) → 단순 레귤레이터 X, **MPPT + 저장 + 3.3V 안정화** 필요. 두 방식:

**방식 A — 하베스팅 PMIC 단일칩** (초저전력·슈퍼캡·무인 장기)
- TI **BQ25570**(콜드스타트 600mV, MPPT+buck 3.3V), e-peas **AEM10941**(LDO 2채널 1.8+3.3V), ADI LTC3105, ST SPV1050

**방식 B — 충전IC + LDO** (Li-ion 기반·저가·검증)
```
솔라 → CN3791(MPPT 충전, 입력단) → Li-ion 3.7V → HT7333(3.3V LDO, 출력단) → nRF52+E22
```
- **CN3791** = 입력단. 1S Li-ion 스위칭(벅) 충전 IC + **MPPT**. 출력 = 배터리 전압(3.0~4.2V, 변동). ⚠️ 3.3V 아님. 모듈 6V/9V/12V 버전 = MPPT setpoint.
- **HT7333** = 출력단. 3.3V 고정 LDO, **저Iq(~2~4µA)** → 슬립 노드 수명 결정적. ~250mA.
- 두 부품 역할 정반대(수확/저장 vs 정형)이라 상호 보완, 겹치지 않음.
- ⚠️ TP4056 비권장(USB 5V 전용, MPPT 없음).

## 3. 솔라 패널 전압 기준점 (STC)

- **광량↓ → 전류↓(거의 비례)·전압 거의 일정(살짝↓)**. **온도↑ → 전압↓(~-0.3%/°C)**. 직관과 달리 전압은 광량에 둔감, 전류가 광량에 민감.
- 기준 = **STC**(1000 W/m², 셀 25°C, AM1.5).
- **Voc**(개방전압, 무부하 최고) vs **Vmp**(최대전력점 전압 ≈ Voc의 80%). "9V 패널" = **Vmp ≈ 9V**(최대출력값 아님). 무부하로 재면 Voc 10~11V.
- **CN3791 버전은 패널 Vmp에 매칭**(Voc 아님). Voc는 CN3791 입력 정격 초과 점검용(저온 시 Voc 상승 마진).

## 후속 (할일 cascade)
- 한림/revita 야외 노드 평균 소비전류(슬립 µA + 송신 피크) + 패널 사양 확정 시 → BQ25570 vs CN3791+HT7333 선택 + 패널 W·배터리 용량 산정.
- 본 지식은 **lora vault(LoRa 기술 hub)** 로 cascade 가치 있음 (야외 노드 전원 설계 공통 자산).
