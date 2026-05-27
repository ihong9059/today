---
title: uttec-factory vault — UTTEC Shield AI 공장자동화 교육 + hardware 검증
type: entity
created: 2026-05-26
updated: 2026-05-27 (세션 2+3 흡수 — 실장 7/7 검증 ✅ + gotcha 3건 + 보드 변종 발견 + git repo ihong9059/uttec-factory private 신설 완료)
status: 실장 7/7 ✅ 완료 + LoRa 미탑재 / 보드 변종 존재 + git repo ihong remote 활성 + 교육·영업 자산 통합 운영지
tags: [vault, UTTEC-Shield, AI-공장자동화, 교육, 강사양성, factory-rpi4, Raspberry-Pi-4, E22-900T30D, LoRa, multi-agent, uttec-factory-claude, 분산호스트, broker-자동화, hardware-검증, 8일-교육커리큘럼, 실장-7/7-완료, 보드-변종, GPIO7-SPI충돌, WS2812-NOPASSWD, git-private-repo]
links: [shield, onDevice-ai, ai-fanstick, 강사양성_파일럿, uttec-edu, claude-code, build-gotcha-inventory, gaps, 위시캣활동, 영업전략, 2026-05-26_uttec-factory-vault-신설]
---

## 2026-05-27 흡수 — 세션 2+3 (실장 7/7 ✅ + gotcha 3건 + 보드 변종 발견) ⭐⭐

### 세션 2 (5/26 야간, factory-rpi4 직접 검증 스프린트)

**신규 검증 4종**: AHT20(0x38) · 부저(GPIO5) · 스위치(GPIO4) · 스피커(GPIO13) + 통합 데모(AHT20→OLED).

**매트릭스**: 3/9 → **실장 7/7 ✅** (OLED·LED·WS2812·AHT20·부저·스피커·스위치). LoRa E22-900T30D는 **코드 완성, 모듈 물리 미탑재** → 장착 후 즉시 검증.

**결과 정량**: AHT20 CRC 5/5 / 부저 S-O-S / 스위치 5회 edge / 스피커 2.7kHz+음계 — 전부 정상.

### 세션 3 (5/26 야간, WS2812 전용 새 보드 재검증)

**중대 발견** ⭐: **UTTEC Shield는 단일 고정 보드가 아니라 여러 변종 존재**. 최소 2종 확인:
- **V1.0 풀 보드**: I2C 0x38(AHT20)+0x3C(OLED) + GPIO LED/부저/스피커/스위치 + WS2812
- **WS2812 전용 보드**: I2C 빈 버스, WS2812(GPIO12)만 탑재

**운영 함정**: 세션 시작 시 어느 보드가 장착됐는지 모름 → **`i2cdetect -y 1`로 현재 보드 먼저 식별 필수**.

### gotcha 3건 박제 (build-gotcha-inventory + gaps cascade)

| # | 함정 | 우회 |
|---|---|---|
| 1 | **0x68 · BMP280(0x77) · EEPROM(0x50) 부재 확정** — 회로도 V1.0 I2C = AHT20+OLED 2종만이 ground truth | shield A vs B carry-over 잘못, 매트릭스에서 8/9 row 정정 (BMP280 + 0x68 = hardware 부재 row 삭제 또는 ❌ 표기) |
| 2 | **GPIO7(LoRa AUX) = SPI0 CE1 충돌** (`dtparam=spi=on` → spidev0.1 점유) | LoRa AUX GPIO read 불가, `dtoverlay=spi0-1cs` 해제 필요 |
| 3 | **WS2812 root 불가피** (`/dev/mem` PWM/DMA, SPI 우회는 GPIO12 배선이라 불가) | `/etc/sudoers.d/ws2812-uttec`로 tty 없는 자동화에서도 직접 구동 (NOPASSWD SOP) |

### 매트릭스 정정 (실장 기준, 회로도 V1.0 ground truth)

| # | 카테고리 | 컴포넌트 | 인터페이스 | GPIO / 주소 | 검증 |
|:-:|---|---|---|---|:--:|
| 1 | 디스플레이 | OLED (SSD1306/SH1106) | I2C | 0x3C | ✅ (V1.0 풀 보드) |
| 2 | LED | 3색 RYB | GPIO | 17/27/22 | ✅ |
| 3 | NeoPixel | WS2812 ×4 | PWM0 | GPIO12 | ✅ (V1.0 + WS2812 전용 보드 양쪽 동작, NOPASSWD SOP) |
| 4 | 부저 | BUZ1 능동 | GPIO | 5 | ✅ S-O-S 정상 |
| 5 | 스피커 | Q1 BCX56 | software PWM | 13 | ✅ 2.7kHz + 음계 정상 |
| 6 | 스위치 | SW1 TS-1088 | GPIO input | 4 | ✅ 5회 edge 정상 |
| 7 | 센서 | AHT20 | I2C | 0x38 | ✅ CRC 5/5 정상 (V1.0 풀 보드만) |
| ~~8~~ | ~~센서~~ | ~~BMP280~~ | ~~I2C~~ | ~~0x77~~ | ❌ **hardware 부재 확정** (회로도 V1.0 미명시) |
| 9 | LoRa | E22-900T30D | UART + GPIO | TX=14/RX=15/M0=21/M1=20/AUX=7 | ⬜ 코드 완성 / **모듈 물리 미탑재** (장착 후 즉시 검증) |

**실장 진행률**: **7/7 (100%) ✅** (LoRa 제외, 모듈 장착 후 8/8 가능).

### git private repo 신설 ✅ (todo #11 사용자 직접 완료)

- GitHub `ihong9059/uttec-factory` (private, 5/26 11:10 생성)
- factory-rpi4 remote `ihong` 활성 (3 commit pushed: 초기 + 검증 스프린트 + WS2812 전용 보드 재검증)

### broker 자동화 양방향 동작 검증 완료 ✅

- factory → myWiki pull: 5/26 야간 첫 동작 + 5/27 본 cascade 2장 자동 sync
- myWiki → factory push: ack 카드 자동 도착 (uttec-factory-claude 측 확인)
- 분산 vault git 공유 repo 자체 구축 계획 = **중복 폐기** (broker 자동화로 대체 충분)

---



# uttec-factory vault — UTTEC Shield AI 공장자동화 교육 + hardware 검증

## 한 줄 정의

**UTTEC Shield (AI 공장자동화 교육용)** 9 컴포넌트 통합 검증 + 8일 교육 커리큘럼 + 영업 자산 통합 운영 vault. multi-agent 13번째 합류 (2026-05-26).

## 위치

- **운영지**: `/home/uttec/project/uttec-factory/` on **factory-rpi4** (Raspberry Pi 4 Model B Rev 1.5)
- **네트워크**: Tailscale **100.109.84.79** / LAN **192.168.0.23** (eth0)
- **OS**: Debian 13 trixie aarch64 (kernel 6.12+rpt-rpi-v8)
- **source-of-truth**: 본 PC `C:\todo\today\aiHardStudy\중소기업교육\ai공장자동화\` (회로도 + 교육자료 source, 추후 git sync 결정)

## Multi-agent 식별자

- **Claude 식별자**: `uttec-factory-claude` (13번째 합류, 2026-05-26)
- **통신 채널**: `_inbox/{pending, processed, outbound}/`
- **PROTOCOL**: `myWiki/_inbox/PROTOCOL.md` § 2026-05-26
- **broker 자동화**: ⭐ 분산 호스트 첫 자동화 진화 — `today/.claude/hooks/pull-multi-agent-outbound.py` (Tailscale ssh로 factory-rpi4 outbound → myWiki pending sync)

## hardware 구성 (UTTEC Shield 9 컴포넌트)

회로도 source: `회로도/ai_smart_factory_schematic.pdf` V1.0 (2026-05-03).
Python 핀맵 source-of-truth: `회로도/port_map.py` (`CN1_PIN_MAP`).

| # | 카테고리 | 컴포넌트 | 인터페이스 | GPIO / 주소 | 검증 |
|:-:|---|---|---|---|:--:|
| 1 | 디스플레이 | OLED (SSD1306/SH1106) | I2C | 0x3C | ✅ |
| 2 | LED | 3색 RYB | GPIO | RED=17 / YEL=27 / BLUE=22 | ✅ |
| 3 | NeoPixel | WS2812 ×4 | PWM0 | DIN=GPIO12 | ✅ (PWM0/audio 충돌 SOP 박제) |
| 4 | 부저 | BUZ1 (능동) | GPIO | 5 | ⬜ |
| 5 | 스피커 | Q1 BCX56 | software PWM | 13 | ⬜ |
| 6 | 스위치 | SW1 (TS-1088) | GPIO input | 4 | ⬜ |
| 7 | 센서 | AHT20 | I2C | 0x38 | ⬜ |
| 8 | 센서 | BMP280 (회로도 V1.0 미명시) | I2C | 0x77 (추정) | ⬜ (5/26 본 보드 검출 ❌ — hardware 부재 가능성) |
| 9 | LoRa | E22-900T30D | UART + GPIO | TX=14/RX=15/M0=21/M1=20/AUX=7 | ⬜ |

**진행률**: **3/9 ✅ (33%)** (5/26 신설 시점).

⭐ 본 보드 i2cdetect 결과 = 0x38 + 0x3C **2 디바이스만** 검출 (회로도 V1.0 일치, BMP280 + 0x68 부재). 5/26 오전 신규 RPi3 (192.168.1.20)에서 본 0x68/0x77는 다른 hardware로 추정 (사용자 confirm 대기).

## 트랙 구조

| 트랙 | 위치 | 내용 |
|---|---|---|
| **hardware 검증** | `구현/` | 9 컴포넌트 검증 코드 (oled_test, led_test, ws2812_test + 잔여 6 컴포넌트 코드 작성 예정) + `_README_검증진행상태.md` 매트릭스 + `_SETUP.md` 환경 가이드 |
| **회로도** | `회로도/` | V1.0 PDF + port_map.py + 핀맵.md + 4 PNG (pinMap, 40pin, loraPinMap) + raspberry_esp32c3 참고 |
| **교육 커리큘럼** | `교육자료/` | aiSmartFactory교육자료.pdf (6.9MB 메인) + 8일_교육커리큘럼.md + 구현가능_기능목록.md + 커리큘럼_설명자료.md + 동영상 시나리오·대사 + Smart_Factory_Upgrade_Protocol.pdf (14MB) |
| **영업** | `영업/` | 교육설명서 + 대면교육 상세계획 + 제안서 HTML + 강사카드 + 동영상 시나리오 + Claude 가이드 등 9 문서 (본 PC source 사본) |
| **매뉴얼** | `매뉴얼/` | E22-900T30D_Manual.pdf (2.8MB) |

## shield vault와 비교 (별개 hardware + 별개 vault)

| 항목 | `/home/uttec/project/shield/` (shield-rpi4) | `/home/uttec/project/uttec-factory/` (factory-rpi4) |
|---|---|---|
| 호스트 Tailscale | 100.110.51.14 | **100.109.84.79** |
| 호스트 LAN | 192.168.0.3 (eth0) | **192.168.0.23 (eth0)** |
| LoRa 모듈 | **E32-433** / SX1278 / 410~441MHz | **E22-900T30D** / 920MHz |
| 통신 | RS485 + RS422 + MESH + I2C + LoRa | I2C + LoRa (RS485/MESH 없음) |
| LED | 1개 (GPIO22) | **3색 RYB** (GPIO17/27/22) |
| WS2812 | ❌ | ✅ 4개 (GPIO12) |
| 부저/스피커/스위치 | ❌ | ✅ (GPIO5/13/4) |
| 7-Seg | TM1637 (GPIO19/26) | ❌ |
| 회로도 | 회로도.jpg (2024-06-01) | ai_smart_factory_schematic.pdf V1.0 (2026-05-03) |
| 트랙 | hardware-only | **hardware + 교육 + 영업 통합** ⭐ 첫 사례 |
| Claude | shield-claude (5th, 5/16) | **uttec-factory-claude (13th, 5/26)** |

→ 두 vault는 **물리적으로 다른 보드, 다른 hardware, 다른 트랙**. 같은 호스트 family (Pi 4) + 같은 사용자 (uttec) + 같은 cross-vendor 함정 경험만 공유.

## broker 자동화 (분산 호스트 첫 진화)

기존 분산 호스트 vault (shield, n8n, uttec-vault, uttec-search, uttec-rag-local)는 사용자가 수동 broker (scp 또는 사본 path). 본 vault부터 자동화:

### 패턴

```
factory-rpi4 (uttec-factory)                    본 PC (myWiki)
─────────────────────────────                  ────────────────────────────
vault-end Step V3:                              today/.claude/hooks/
  _inbox/outbound/<카드>.md 작성                  pull-multi-agent-outbound.py
    │                                              │ (정기 또는 work-start hook)
    │                                              │
    ▼ ssh + scp pull ◀──────────────────────────  ▼
  myWiki/_inbox/pending/<카드>.md                ssh uttec@100.109.84.79
    │                                            scp outbound/*.md → myWiki/pending/
    ▼                                            mv factory:outbound/*.md → outbound-archived/
  mywiki-claude SessionStart hook 감지
    │
    ▼
  처리 후 응답 카드 → factory-rpi4 outbound 또는 mywiki entity 갱신
```

### 발신 패턴 (uttec-factory → myWiki)

| trigger | 발신 내용 |
|---|---|
| hardware 검증 마일스톤 (예: 9/9 완료) | absorb 카드 + 매트릭스 변경 보고 |
| 신규 entity 후보 (예: 새 hardware 부품, 새 기법) | entity 신설 요청 |
| 교육 자료 ↔ 영업 cascade (예: 8일 커리큘럼 ↔ 강사양성) | cross-vault 매칭 패턴 |
| 함정 박제 (예: WS2812 PWM0 + audio 충돌, E22 Config baud) | gotcha cascade |

## 본 vault 신설 cascade (5/26)

| 활동 | mywiki-claude 처리 |
|---|---|
| factory-rpi4에 hardware 이전 (RPi3 192.168.1.20 → factory-rpi4) 사용자 알림 | shield A vs B 분리 박제 + 5/26 오전 진단 정정 |
| `/home/uttec/project/uttec-factory/` 디렉토리 신설 + 6 하위 폴더 | (mywiki-claude가 cross-vault 진행) |
| 본 PC source 자료 일괄 scp (3 batch, 25MB) | 회로도 + 구현 + 교육자료 + 매뉴얼 + 영업 |
| 메타 파일 8건 작성 (README + CLAUDE + 진행로그 + 다음할일 + 핀맵 + 검증진행상태 + SETUP + 작업보고서) | (mywiki-claude가 cross-vault 진행) |
| `.claude/skills/{work-start, work-end, vault-start, vault-end}` shield 패턴 미러 | work-start/work-end는 shield와 동일, vault-start/end는 uttec-factory 특화 |
| `_inbox/{pending, processed, outbound}` + PROTOCOL.md | 13th 합의 등재 |
| check-inbox.py SELF_ID="uttec-factory-claude" + settings.local.json | SessionStart hook 동작 검증 완료 |
| ⭐ broker 자동화 스크립트 신설 | `today/.claude/hooks/pull-multi-agent-outbound.py` (분산 호스트 첫 자동화 사례) |

## cascade 권고 (myWiki 다른 entity)

| 흡수 위치 | 갱신 내용 |
|---|---|
| [[강사양성_파일럿]] | 본 vault 검증 결과 → 8일 교육 커리큘럼 자산화 trigger (강사양성 Day 5 모듈 후보) |
| [[uttec-edu]] | 본 vault 교육자료 + 영업 자산 + 강사양성 cross-link |
| [[shield]] | sibling vault (별개 hardware) cross-reference + Pi family 함정 공유 |
| [[onDevice-ai]] | On-Device AI 트랙과 교육 cascade (ESP32-S3 / Cortex-M / Pi 비교) |
| [[build-gotcha-inventory]] | WS2812 PWM0/audio 충돌 SOP 추가 (RPi family 일반 함정) + E22 Config baud 박제 |
| [[claude-code]] | broker 자동화 첫 사례 (분산 호스트 sync 패턴) |

## 영업 임팩트 (예상)

| 트랙 | 자산 | 매출 임팩트 |
|---|---|---|
| 중소기업 8일 교육 | aiSmartFactory교육자료.pdf + 8일 커리큘럼 + 강사카드 + 대면교육 상세계획 | 1회 교육 ~500~1,000만 (대면 + 교재) |
| 강사양성 Day 5 | UTTEC Shield 9 컴포넌트 검증 결과 → 실습 모듈 | 강사 1인당 ~200~500만 |
| 영업 자산 | 제안서 HTML + 동영상 시나리오 | 영업 사이클 수주 trigger |
| **합계** | — | **6개월 ~1,000~2,000만** (1차 자산화 완료 시) |

## 진행 상태

| 트랙 | 상태 |
|---|---|
| vault 신설 + 셋업 | ✅ (5/26 완료) |
| factory-rpi4 환경 셋업 (I2C + audio off + 패키지) | ✅ (5/26 완료) |
| hardware 검증 3/9 | ✅ (OLED + LED 3색 + WS2812) |
| hardware 검증 6/9 잔여 | ⬜ (다음 세션) |
| 0x68/0x77 hardware 부재 확정 | △ (사용자 confirm 대기) |
| 8일 교육 커리큘럼 cascade | ⬜ (검증 완료 후) |
| 강사양성 Day 5 모듈 자산화 | ⬜ |
| 영업 자료 갱신 | ⬜ (본 PC source 우선, vault는 사본) |
| git private repo 신설 (`ihong9059/uttec-factory`) | ⬜ |
| multi-agent broker 자동화 동작 검증 | ⬜ (첫 카드 발송 후) |

## 관련 페이지

- [[shield]] — sibling vault (별개 hardware, sibling 트랙)
- [[onDevice-ai]] — On-Device AI 트랙 cross-link
- [[ai-fanstick]] — AI FanStick (E22 LoRa는 다른 모델 E22-900T30D + factory 통신 비교 가능)
- [[강사양성_파일럿]] — 강사양성 Day 5 모듈 후보
- [[uttec-edu]] — 교육 트랙 통합
- [[build-gotcha-inventory]] — WS2812 PWM0/audio 충돌 + E22 Config baud 함정 박제
- [[claude-code]] — broker 자동화 첫 사례 (분산 호스트 sync)
- [[2026-05-26_uttec-factory-vault-신설]] — 본 vault 신설 thought (작성 예정)

## 메타

| 항목 | 값 |
|---|---|
| vault 신설 | 2026-05-26 (mywiki-claude cross-vault 진행) |
| 진행 단계 | 시험 단계 (검증 + 셋업 완료) |
| Tier 분류 | **Tier 3** (별도 호스트 + multi-agent 합류 + 자체 git repo 예정) — Tier 3 6번째 vault (revita, onDevice_AI, wishket, shield, n8n, lemonLabs, **uttec-factory**) |
| 분산 호스트 패턴 | 4번째 사례 (Linux × 3 + Windows × 1) — uttec-vault, uttec-search, uttec-rag-local 후 + broker 자동화 첫 진화 |
| 다음 갱신 | 첫 broker 카드 도착 시 + 9/9 검증 완료 시 + 강사양성 cascade 시 |
| 본 entity 갱신 주기 | 본 vault 활동 발생 시 (특히 매트릭스 변경·교육 cascade·영업 이벤트) |
