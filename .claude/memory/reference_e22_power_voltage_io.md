---
name: reference_e22_power_voltage_io
description: "E22 LoRa 전원전압 선택 — 22D는 3.3V 고정(전압-거리 무관), 30D는 5V 필요(but IO=VCC라 nRF52832 직결 깨짐). 전원전압은 거리 변수 아님"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 55902860-2a74-4821-86c8-087b167333f6
---

E22-900T(TTL) LoRa 모듈 전원전압 설계 판단. **핵심: IO 레벨 = VCC**, 그래서 전압 선택이 nRF52832(5V tolerant 아님) 직결 가능성을 결정한다.

| 변종 | 최대출력 | 정격 도달 전압 | TX peak 전류 | IO 레벨 | nRF52832 직결 |
|---|---|---|---|---|---|
| **E22-900T22D** | 22dBm(160mW) | **3.3V에서 풀출력** | ~110mA | 3.3V | ✅ 안전 |
| **E22-900T30D** | 30dBm(1W) | **5V 필요** (데이터시트: <5V면 정격 미달) | ~600~700mA | 5V | ❌ 위험(레벨시프트 필수) |

**22D (한림용인CC 사용 모듈) 결론**:
- **3.3V 고정이 정답.** 3.3~5.5V 전 구간 동일 22dBm 풀출력 → 전압을 올려도 거리 안 늘어남.
- 5V로 올리면 IO가 5V가 돼 nRF 핀 손상 + MCU→E22 VIH(0.7×5=3.5V) 미달로 통신 비대칭만 생김 → **3.3V가 엄격히 유리**.
- J28 Pin 11=3.3V 급전이 이 모듈엔 최적 (수정 불요).

**30D 쓸 경우**: 5V VCC 필요한데 IO도 5V가 되므로 nRF52832와 직결 금지 → TXD 분압/레벨시프트 + MCU→E22 입력레벨 보강 설계 필요. VCC 옆 벌크캡(100~470µF) 필수(고전류).

**거리를 결정하는 진짜 변수** (전압 아님, 22D 기준):
1. air rate (0.3k = 최저 = 수신감도 최대 = 거리 최적)
2. 안테나 이득·정합·설치 높이 (NLOS에서 가장 큰 실변수)
3. 중계기 배치 (1.5~2km를 ~1km hop으로 분할)
4. 벌크캡으로 TX 순간전류 안정화 (마진)

관련: [[feedback_e22_900t_config_baud]] (REG0 baud) · [[reference_uttec_ble_module_j28_pinmap]] (Pin 11=3.3V) · [[feedback_dont_assume_ask_when_unclear]] (모듈 변종 확인 후 판단)
