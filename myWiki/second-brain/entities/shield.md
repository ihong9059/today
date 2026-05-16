---
title: shield 보드 (RPi shield 응용 개발 vault)
type: entity
created: 2026-05-16
updated: 2026-05-16
tags: [shield, rpi, hardware, lora, rs485, multi-agent, 분산호스트]
links: [revita, 한림용인cc-고가수조, aiHardStudy, n8n-uttec, onDevice-ai]
---

# shield — RPi shield 보드 응용 개발

## 한 줄

> **Raspberry Pi 4 또는 3B+ 에 장착하는 hardware 응용 shield (LoRa·RS485·RS422·MESH·I2C 센서·디스플레이 통합 시험 플랫폼). multi-agent 5번째 vault, RPi Linux 분산 호스트.**

## 위치

| 항목 | 값 |
|---|---|
| 호스트 머신 | `uttec` (Tailscale 100.120.255.34 / LAN 192.168.0.3) — RPi Linux |
| 작업 폴더 | `/home/uttec/project/shield/` |
| SSH alias | `ssh shield` (5/16 추가) |
| git remote | `https://github.com/ihong9059/shield.git` (private, 5/16 생성, 초기 commit `d0fd5e9`) |
| Claude 식별자 | `shield-claude` (5 Claude 시스템의 5번째, 5/16 합류) |
| 현재 단계 | **시험 단계** (자체 개발, 외부 발주처 없음) |
| 도입 셋업일 | 2026-05-10 (기존 자기-완결 평면 파일 패턴) |
| myWikiSetup 적용일 | 2026-05-16 (시나리오 D 세 번째 검증 사례) |

## 하드웨어 구성 (요약)

### 통신 채널 (4종 트랜시버 + I2C)
- **UART1 (GPIO14/15)** + **MAX4052 4:1 멀티플렉서** → MESH / LoRa / RS422 / RS485 중 1개 선택
  - 채널 선택: ADDA = GPIO17, ADDB = GPIO27
- 직결 옵션 UART2~5 (R3~R8 0Ω 점퍼 실장 시) — 현재 NC
- **I2C1 (GPIO2/3)** — 4개 장치 공유 (AHT20 / OLED / AT24C02 / TM1637 등)
- **LoRa 모듈 라인**: M0 = GPIO24, M1 = GPIO25 (모드 핀)

### 시험 진행 상태 (2026-05-16 기준)

| 영역 | 상태 |
|---|---|
| LoRa air 송수신 | 🔴 수신측 장비 마련 필요 (E22 호환 1대) |
| LoRa 모듈 모델명 확인 | 🟠 미확정 (E22-XXXT22S 또는 E220) |
| M0/M1 라인 모듈 도달 검증 | 🟠 회로 확정 진단 필요 |
| UART4/UART5 핀 충돌 | 🟡 후순위 — 회로도 표기 vs BCM2711 표준 불일치 |
| I2C 센서·디스플레이 | ✅ aht20_oled / at24c02 / tm1637 시험 코드 작성 (5/10) |
| RS485 / RS422 | ⬜ 미진행 |
| MESH | ⬜ 미진행 |

## UTTEC 사업 자산화 관점 (핵심)

shield는 자체 개발이라 직접 매출 X. 하지만 **기술 자산 / 사업 가능성 매칭** 풍부:

### 1. shield × revita LoRa
- shield의 920 MHz LoRa air 시험 결과 → revita 920 MHz E22 KC 인증 모듈 발주 사양에 반영 가능
- 5/15 megasession에서 revita 920.9→923.1 MHz / 22→23 dBm 변경 박제 (`project/lora_range.zip`)
- shield 측에서 같은 대역·dBm 시험 → revita KC 인증 검증 데이터 보강

### 2. shield × revita RS485 Modbus
- shield의 RS485 시험 코드 → revita protocol과 Modbus 라이브러리 공통화
- 다중 디바이스 RS485 통신 라이브러리 (Python pyserial 기반) → 강의 자산 후보

### 3. shield × 한림용인CC 고가수조 (8노드)
- I2C 수위 센서 (현재 시험 단계) + LoRa 통합 모듈 → 8노드 LoS 측정 모듈 후보
- 한림용인CC 5/20 시공 진행 — D-4 시급
- shield가 검증된 모듈 raw로 활용 가능 (PoC → 실 사용)

### 4. shield × aiHardStudy / UTTEC 보드
- UTTEC ESP32 보드와 RPi shield 비교 강의 자산
- 1인 작업자가 hardware 시험을 myWiki 패턴으로 자산화한 사례 (호오컨설팅·인프런)

### 5. shield × myWikiSetup
- **시나리오 D 세 번째 검증 사례** (Windows × 1 + Linux × 2 = 분산 호스트 3 사례)
- myWikiSetup 컨설팅 deliverable로 "다양한 OS·다양한 hardware에서 작동" 입증 데이터

## 자동 absorb 메커니즘

shield work-end SKILL § 4를 **"always send absorb card" 강제 룰**로 커스텀:
- 매 work-end 시 myWiki/_inbox/pending/에 absorb 카드 자동 발송
- 빈 세션이라도 heartbeat 카드 (변경 없음 통보)
- mywiki-claude는 매 카드를 읽고 entities/shield.md / 매칭 패턴 / gaps.md 검토

→ "shield와 myWiki 연결" 확실하게 보장 (판단 기반 X, 강제 자동 ✅)

## gotcha / gaps 발견 (시간 누적)

- **2026-05-15**: UART4 RXD / UART5 TXD 회로도 표기 vs BCM2711 표준 alt function 불일치
- **2026-05-16**: gh CLI가 없는 머신(shield = RPi)에서 GitHub push 인증 셋업 필요 패턴
- **2026-05-16**: 분산 호스트 환경에서 PROTOCOL.md / SYSTEM_GUIDE.md 5 vault 동일 사본 유지 시 sync 절차 (scp + md5 검증)

## 관련 entity / thought

- `[[revita]]` — REVITA 제품 (LoRa·RS485 매칭 후보)
- `[[한림용인cc-고가수조]]` — 8노드 LoRa·I2C 통합 후보
- `[[onDevice-ai]]` — AI 제품 vault (multi-agent 3번째)
- `[[n8n-uttec]]` — 자동화 vault (multi-agent 4번째, 같은 RPi 분산 호스트 패턴)
- `[[2026-05-16_shield-claude-합류]]` — 합류 사례 박제 (thoughts/2026-Q2)
- `[[2026-05-16_n8n-claude-합류]]` — 시나리오 D 두 번째 사례
- `[[2026-05-15_제품별-vault-통합-패턴]]` — 시나리오 D 첫 사례

## 관련 raw 자산

- shield 머신 (분산 호스트, junction X) — `ssh shield`로 접근
- `_진행로그.md`, `_다음할일.md` — 자기-완결 평면 layer (5/10 셋업)
- `second-brain/`, `_inbox/`, `.claude/skills/` — myWikiSetup layer (5/16 셋업)
