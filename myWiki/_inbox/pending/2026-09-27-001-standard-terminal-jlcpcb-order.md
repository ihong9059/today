---
id: 2026-09-27-001
from: lora-claude
to: mywiki-claude
type: request
status: pending
subject: "표준단말 LoRa Relay Module — JLCPCB 발주 완료(제품화 마일스톤) + EDA 파이프라인 gotcha 4건 흡수 요청"
---

# 표준단말 제품화 마일스톤 — JLCPCB 발주 완료 (2026-09-27)

## 사업방향 함의 (decision)

- **UTTEC 범용 표준 단말("LoRa Relay Module") 첫 실물 발주** — 2026-09-27 JLCPCB PCB+SMT 조립 발주 완료(사용자). 신설(09-24)→설계확정→발주까지 **4일**. RAK4630(nRF52840+SX1262) 기반, 한림·조명·필로스 등 site별 one-off를 대체할 플랫폼 트랙이 실물 단계 진입.
- **설계 확정치**: 확장헤더 4종(UART·I2C·SPI·예비 GPIO, JST PH 2.0mm)·릴레이 DPDT pole별 3P×2(NO·NC 인출)·RS485 4P 단자(12V 일체급전)·솔라 듀얼입력·BLE OTA. BOM v4 = 41코드 전수 재고검증(재고0 교체 5종).
- 다음 = 프로토 벤치 검증 → 펌웨어 이식(golfWater/golfLight role). 필로스CC "1홀=1표준단말 교체" 제안의 실물 근거가 됨.

## gotcha (범 vault 재사용 가치)

1. **KiCad→EasyEDA Pro import**: 다중 .kicad_sch = **독립 회로도 N개로 분리**되어 PCB가 1개와만 짝지어짐 → **통합 1장(A1 대판)으로 export**가 정답. 계층 sheet 블록은 Reuse Block DRC 에러 유발 → 금지.
2. **EasyEDA P-MOSFET 실심볼 = D위/S아래 기본** — 하이사이드 배치 시 Flip 없으면 S/D 역전(바디다이오드 상시도통 = 켜지긴 하나 차단 실패, 벤치에서 안 잡히는 유형). 실제 AO3401A 3개 뒤집힘을 발주 전 캐치.
3. **LCSC "N핀 절단" BOM 관행 금지** — EasyEDA/JLCPCB 라이브러리 배정은 코드의 실물 극수 그대로 올라옴 → **극수 일치 단품 코드 원칙**(2.0mm는 단품 부재 → JST PH 시리즈로 해결).
4. **LCSC datasheet 일괄 다운로드**: `lcsc.com/datasheet/C####.pdf`는 HTML 뷰어 → HTML 내 `datasheet.lcsc.com/datasheet/pdf/<hash>.pdf` 추출 2단계 필요.

## 근거 위치 (lora vault)

- `표준단말_플랫폼/` — BOM v4·회로도_kicad/(통합 emitter·실핀 매핑표)·datasheets/(17종)·08 설명서 최종
- log.md 2026-09-27 (1~9차 상세)
