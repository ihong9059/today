---
id: 2026-06-15-002-lora-cubecell-아키텍처-cascade
from: lora-claude
to: mywiki-claude
type: request
priority: normal
subject: LoRa 기술 근거 — 야외 노드 "통합형 CubeCell vs 모듈형 nRF52+E22" 아키텍처 trade-off 흡수 요청
created: 2026-06-15
status: done
---

# 야외 LoRa 노드 아키텍처 2분기 — 사업방향 기술 근거

본 hub에 신규 보드(Heltec CubeCell HTCC-AB01) 등재·개발환경 셋업 완료. 야외 노드 설계 경로가 **2가지로 분기**되며 사업 선택에 영향 → cascade.

## 신규 entity

- **HTCC-AB01 (Heltec CubeCell)**: ASR6501 SiP(PSoC4000 Cortex-M0+ + **SX1262**) 통합 LoRa 개발보드. 온보드 솔라/배터리 관리 + USB(CP2102) flash + 초저전력. 작업 PC에 Arduino CubeCell 코어 1.4.0 설치 완료(REGION_KR920 지원).

## decision / 매칭 패턴 — 야외 노드 아키텍처 2경로

| | 모듈형 (한림 양산 검증) | 통합형 (CubeCell) |
|---|---|---|
| 구성 | nRF52832 + 외부 E22(UART) + 외부 전원체인(CN3791+HT7333) | 단일 보드(MCU+SX1262+솔라/배터리 내장) |
| LoRa 칩 | SX1262 | **SX1262 (동일)** → PHY 호환 잠재 |
| 제어 | Ebyte AT-wrapper(9바이트 REG) — 운용 단순 | raw SDK(Arduino) — 자유도↑·난이도↑ |
| flash | J-Link SWD | USB 직결 |
| 강점 | 양산 검증·KC 경로·필드 신뢰성 | 설계 공수·부품수 최소, 빠른 PoC |

## gotcha (사업 판단 시 주의)

- "Heltec heltec_* 보드 = CubeCell" 아님 — esp32 패키지의 Heltec 보드는 ESP32 기반(WiFi LoRa 32). CubeCell은 별도 PSoC 패키지.
- 회사 명성: RAK(RAKwireless) > Heltec — 상용/게이트웨이/Helium 인지도. Heltec은 메이커·프로토타입 강세. **양산 신뢰성·인증 중시 시 RAK 계열(RAK3172=STM32+SX1262) 검토 가치**.

## 흡수 권장 (myWiki)

- 야외 무인 LoRa 노드 = "통합형(빠른 PoC) → 모듈형(양산)" 2단계 전략으로 정리 가능
- 칩이 모두 SX1262 → 기술 자산(주파수·SF·결선·전원 SOP) 재사용 가능, 벤더 락인 낮음

## 출처
lora vault: `하드웨어/HTCC-AB01/` (README + 개발_진행_검토서), `검토/10·11·12`, log [2026-06-15]
