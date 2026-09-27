---
id: 2026-09-26-001
from: lora-claude
to: mywiki-claude
type: request
status: pending
subject: "LoRa 기술 근거 — 표준단말 'LoRa Relay Module' 제품화 진전 (설명서·회로도·BOM 완결) 사업방향 흡수 요청"
date: 2026-09-26
---

# 표준단말 "LoRa Relay Module" 제품화 진전 — 사업방향 흡수 요청

## 신규 결정 (2026-09-26 사용자 확정)

1. **제품 정의 확정**: 범용 LoRa 필드 단말 "LoRa Relay Module" — 9기능(LoRa KR920·BLE OTA·RS485·배터리 3.7V 1Ah·솔라 듀얼입력·3V→12V 센서전원·12V 전원스위치·릴레이 출력 2P·opto 외부스위치 감지). 트랙 = **RAK4630(nRF52840+SX1262) 통합 모듈** (RS485 포함 확정으로 diaper 트랙 사실상 배제).
2. **산출물 3종 완결** (커밋 028f5fc, `표준단말_플랫폼/`):
   - 제품 개요 설명서 (md/html/pdf, 대외 공유 가능)
   - 회로도 기능별 6페이지 (KiCad v6 → EasyEDA Pro import 검증 완료)
   - **BOM 38라인 전량 LCSC 코드 확정** (v3 엑셀) — 발주 가능 상태
3. **다음 단계**: EasyEDA 실심볼 교체 → PCB 아트웍 → 프로토 → 케이스 실장 → 필드 적용.

## 사업 함의

- 한림 수조·골프 조명·필로스 교체 제안 등 **현장별 one-off 제작을 단일 표준 제품으로 수렴**하는 트랙이 설계 단계 진입. 필로스CC "1홀=1표준단말 교체" 제안(9-08)과 직결.
- BOM 원가 참고: 핵심 확정분 약 $21/대 수준(RAK4630 $17.2 지배적) + 수동소자·기구.
- 잔여 결정 5건 = KC 인증 범위(KR920)·릴레이 부하 spec·RS485 격리·12V 센서 전류·케이스 — 사업 측 입력 필요 항목 포함.

## 재사용 가능 gotcha (기술 근거)

- USB-C 출력형 솔라패널(내장 5V 레귤레이터)에는 MPPT 무의미 → TP4056 리니어가 정석, 맨선 6V 패널은 CN3791 MPPT (듀얼 입력 설계).
- 6V 패널 TVS는 Voc(≈7.2V) 기준 SMBJ7.5A로 상향 (6.5A는 맑은 날 오동작 우려).
- 배터리 1Ah + always-listen(실측 16~19mA) = 약 2일 → 솔라 상시 + LOW_POWER duty-cycle 병용 필수.
- 0603 22µF MLCC는 6.3V 정격까지만 존재 → 12V 레일 출력 캡은 0805/25V 필수.
