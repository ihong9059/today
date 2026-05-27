---
title: REVITA
type: entity
created: 2026-04-19
updated: 2026-05-28 (revita ingest #10 + #11 흡수 — link_v2_test_tower LoRa 게이트웨이 신설 + Tower 펌웨어 정본 채택 + KC 인증 통합 트랙 kc_cert_link_v2 + kc_cert_tower 신규 + tower_DK deprecated)
tags: [프로젝트, IoT, 펌웨어, LoRa, Zephyr, CC1101, Sub-GHz, BLE-LR, Solar, revitaProject, rtuRemocon, Modbus, 산업통합제어, link_v2_test_tower, 회귀시험자동화, kc_cert_link_v2, kc_cert_tower, KC인증통합트랙, BLE-pairing-L2, DUT-다중-브리지-단일, IQC자동화, Flask-Web-5010, tower_DK-deprecated, 두-하향-경로-동일-규약, 펌웨어모듈-단일진실]
links: [claude-code, experience, projects, skills, tailscale네트워크, 양산제품, 위시캣활동, rtu-remocon, shield, 한림용인cc-고가수조, 2026-05-27_revita-IQC-자동화-인프라]
---

# REVITA

## 한 줄 정의
IoT 장비 프로젝트. LoRa 무선 통신 + RS485 유선 통신 + KC 인증 대응. **위시캣 수주 (#153090)**.

## 2026-05-28 ingest #10 + #11 흡수 — LoRa 게이트웨이 신설 + KC 인증 통합 트랙 ⭐⭐⭐

### 신규 entity (3건, revitaWiki 박제)

#### `entity-link-v2-test-tower` (ingest #10, 5/22 commit `56b6f051`)

- 위치: `zephyr_workspace/apps/system/link_v2_test_tower/` (30 파일 / +2,164줄)
- 본질: link_v2 DUT 시험용 **LoRa 게이트웨이 타워** (RAK4631 + LoRa async RX + 상향 ACK + 하향 ACK 테이블 + NOTIFY decoder + Shell `gw` + Host FastAPI Web/CLI)
- 사양: 922 MHz / SF7 / BW 125 kHz / CR 4/5 / 14 dBm / 16B PDU (link_v2와 동일)
- node_id: gw 0x0001, dev 0x001F. ACK 테이블 16 slot · 2s timeout · retry 3
- Host: FastAPI Web (REST API v1) + tower_cli.py + uart_bridge.py (UART 단일 점유)
- 하드웨어: J-Link S/N 683449679, UART `/dev/ttyUSB1`
- **사업 가치**: 회귀 시험 자동화 (1분) + 수입검사 JIG + n8n cron 통합 + 위시캣 사례연구 (펌웨어 품질 트랙)

#### `entity-kc-cert-link-v2` (ingest #11, commit `a5e3ea22`)

- 위치: `apps/kc_cert_link_v2/` (23 파일 / +3,500줄)
- 본질: KC 인증 통합 링크 v2 — 3단 구조 (PC + bridge_app + link_app) + Flask Web :5010 + RS485 Modbus master + BLE pairing L2
- **와이어 프로토콜 KC2** (`kc_lora2_proto.h`, 매직 0x4B 0x32, 7B 헤더 + 32B max payload + XOR checksum)
- **AUTO 모드 자동 진입** (전원 인가 즉시) — X축 5초 교대 + 배터리/RS485/리프 주기 EVT
- 다운링크 **최소만 처리** (AUTO + VALVE STOP만, 그 외 UNSUPPORTED — 안전 강화)
- 빌드 프로파일 3종 (FULL / BLE_ONLY / RS485_ONLY)
- 물리 버튼: 짧게 = AUTO 토글, 5초 = 딥슬립

#### `entity-kc-cert-tower` (ingest #11, commit `1693ab13` + 후속)

- 위치: `apps/system/kc_cert_tower/` (약 1,500줄)
- **PC 브리지는 `kc_cert_link_v2/bridge_app` 공유** (KCT=KC2 와이어 동일) — DUT 다중 + 브리지 단일 패턴
- 구현: LED / 부저 / 배터리(AIN7) / 진동(P1.04 + 50ms 디바운스) / **SBC active 명령(KCT_CMD_SBC_ACTIVE)** / 버튼 EVT
- BLE pairing L2 (link_v2와 동일 코드 사본)
- **tower_DK 흡수**: 기존 SBC 토글 단독 앱이 KCT_CMD_SBC_ACTIVE 명령으로 흡수됨 → tower_DK deprecated 2026-05-27 (-587줄, commit `0da632f2`)

### 갱신 entity (revitaWiki 박제)

- **`entity-link-v2`**: build.sh +168줄 신규 (standalone 빌드) + lora_byte_proto.h v2 ACK 게이트 inline 함수 + DM NOTIFY 상태 매크로 5종 + README +25줄
- **`entity-solar-monitoring`**: 5/18 차트 Y축 + 10분 자동 새로고침 + 5/22 Current Y축 고정 + 시정수 40→80mA 변경 의도 박제 (변경 위치 미확정, 사용자 입력 대기 5/27)
- **`entity-module-lifecycle`**: Tower 펌웨어 정본 채택 (`doc/revita_tower_firmware/01_모듈_공통구성.md` +321줄). Link 정본 동일 4 상태 + NVS `[5]` `session_lifecycle` + DM 경유 NVS API + CONFIG_* 라운드 + B안 커밋. 두 하향 경로 (LoRa+LTE/MQTT) 동일 `bool` 규약
- **`entity-tower`**: 00_적용범위 +98줄 (펌웨어 단위 10개 + 외부 시스템 관계 + 트리거 분류 + 3계층 구성 블록) + 02_Device_Manager +304줄 (DM 시간 동기 게이트 + NVS 32B blob + *_force_session_off 명명 규약)
- **`entity-tower-dk`**: deprecated 2026-05-27 (디렉토리 완전 제거, historical 보존 audit trail)

### 사업 가치 후보 패턴 ⭐⭐ (myWiki 매칭)

| 패턴 | revita 사례 | myWiki 매칭 |
|---|---|---|
| **DUT 다중 + 브리지 단일** | kc_cert_link_v2/bridge_app 하나로 링크 + 타워 시험 | shield-claude (RPi 자동화 DUT 다중) / n8n-claude (자동화 학습) |
| **양산 IQC 자동화 인프라** ★★★ | link_v2_test_tower 회귀 시험 + Flask Web :5010 + AUTO 모드 자동 진입 | **uttechome 영업 자료 (제품 신뢰도 증빙) + 위시캣 사례연구 + 한림용인CC IQC 트랙 확장** |
| **회귀 시험 자동화** | link_v2 빌드 → 1분 시험 → Web PASS/FAIL → CI 통합 | 위시캣 펌웨어 품질 영업 자산 + shield-claude RPi 하드웨어 자동화 |
| **두 하향 경로 동일 규약** | LoRa + LTE/MQTT `bool` 규약 (Tower 펌웨어 정본) | n8n-claude (다중 경로 자동화) + shield-claude (RPi 다중 path) |
| **BLE pairing 표준 L2 + user 토글** | link_v2 / kc_cert_tower 동일 코드 사본 | 양산 BLE 워크플로우 정본화 (n8n-claude 페어링 자동화) |
| **KC 인증 후속 시험 트랙 분리** | 옛 kc_cert_link_app → kc_cert_link_v2 후속, 안전 강화 | uttechome (KC EMI fail 대응 후속 시험 자산화) |

→ thought [[2026-05-27_revita-IQC-자동화-인프라]] (DUT 다중 + 브리지 단일 + IQC 자동화 풀스택 + KC 인증 통합 분리 패턴 박제).

### intentionally skipped (#10 + #11 흡수 범위 외)

- 작업보고서 5/18/5/20/5/22 (메타) — 사실은 entity로 흡수
- `doc/revita_tower_firmware_old/` (+429줄 구버전 archive) — `ignore_paths` 추가
- `ref/MeshCore` / `ref/meshtastic` submodule
- `.claude/settings.local.json` 변경 — 5/24 cleanup 이전 별도 정책

## 현재 상태 (2026-05-15 갱신 — ingest #9 흡수 5/20)

- **rtuRemocon end-to-end 검증 완료** (2026-05-15) ⭐ — RS485 Modbus RTU(0x20) + CC1101 OOK 447.925 MHz + Flask Web UI(:5003) 통합. 단순 RF Replay → **산업 통합 제어 시스템**으로 격상. 자세히: [[rtu-remocon]]
- **tower_DK 신규** (2026-05-12~15) — RAK4631 단독 SBC 토글 앱, MCP 시퀀스 재사용 (rail 80ms + boost 120ms + cam 40ms + mux + reset)
- 응용 매칭: AISG 3.0 #155057 / 한림용인CC 8노드 / shield × n8n 통합 / 시설농업 IoT
- 영업 카피 격상: "단순 RF Replay 데모" → "검증된 RF 자산을 Modbus 슬레이브로 패키징한 운용 가능 제품"

## 이전 상태 (2026-05-08 동기화)
- RAK4630/RAK4631 펌웨어 프로젝트 (Zephyr RTOS NCS v2.x)
- LoRa 프로토콜 v2 (16B 통일) — 양방향 TX/RX, ACK 상태머신 완료
- KC RS485 Modbus RTU **인증 Testbed 완성** (Modbus 슬레이브 + Flask Web UI 마스터)
- 회로도/핀매핑 지속 업데이트
- CC1101 리모콘 데모 완성 + **OOK Replay 447.925MHz 성공** (대상 기기 ON/OFF, 10버튼 코드)
- **Sensor RS485 모듈** 완료 (sensor_rs485.c, sensor_blob NVS 저장)
- **Valve 모듈** 완료 (3선 H-bridge CW/CCW/STOP, 2시간 하드리밋)
- **MCP23017 드라이버** 완성 (Tower I/O 확장, shadow 복구, mutex 직렬화)
- **모듈 파일 분리**: Link 20+ 파일, Tower 8+ 파일 아키텍처
- **펌웨어 정본 문서 5종** 신규 (DM·Power·Sensor·NVS·모듈공통)
- **STM32 Modbus RTU 리모콘 시뮬 (5/6)**: PC Web UI(Flask :5001) ↔ USB CDC ↔ STM32 Slave 0x20 ↔ CC1101 OOK TX 양방향 통신 완성
- **CC1101 전수 검사 firmware (5/6)**: nRF52840 + STM32 6항목 + VERSION 판정 (0x04=양품/0x14=클론)
- **Python 시뮬 스택 (5/6)**: `revita_link_sim/` 26개 테스트 파일 143+ pass
- **link_v2 신설 (5/8)**: `apps/system/link_v2/` ~10K줄, RAK4631 정식 overlay, 모듈 Kconfig 시도
- **CC1101 FSK 양방향 통신 (5/8)**: 433.92MHz 2-FSK 38.4kbps STM32↔nRF52840 4B+CRC 검증
- **BLE Long Range (5/8)**: BLE Coded PHY S=8 (125kbps, 2.4GHz) 검증 — LoRa 대비 통달거리 매우 짧음 확인
- **솔라 원격 모니터링 (5/8)**: RAK4631 + INA219 + LoRa SF12 (922.1MHz, 22dBm) 근거리 RSSI=-86dBm 성공, Web UI Flask :5002
- **KC 인증 통합 Link 앱 (5/8)**: `apps/kc_cert_link/link_app/` main.c 1125줄 — LoRa(KC2) + BLE peripheral + RS485 master + 버튼/sleep 통합
- **정본 문서 재구성 (5/8)**: `doc/revita_link_firmware/` 본문 정리 + `doc/revita_link_firmware_old/` 아카이브 신설

## 기술 스택
- RAK4630 (nRF52840 + SX1262 LoRa)
- nRF52840 DK (pca10056) + CC1101 (HW-863) Sub-GHz RF
- Zephyr RTOS
- Modbus RTU / RS485
- SCP/SSH 원격 관리

## 타임라인
| 날짜 | 마일스톤 |
|------|---------|
| 12/17 | 한국기계 협력 제안 (15억 규모) |
| 4/4 | REVITA_TOWER PDF 전송 |
| 4/7 | tower.h 핀 수정 |
| 4/14 | LoRa 프로토콜 v2 (16B 통일) |
| 4/16 | 회로도 추출 |
| 3/24 | RAK4630 핀매핑, 펌웨어 GSD 계획 |
| 3/30 | KC RS485 프로토콜 설계 + 검증 시스템 |
| 4/27 | CC1101 리모콘 데모 — pca10056 2대 + CC1101 HW-863 2개, TX/RX 433MHz 무선 통신 완성 |
| 4/24~26 | Sensor RS485 + Valve 3선 H-bridge 모듈 완료 (집중 개발) |
| 4/27~5/1 | KC 인증 Testbed + MCP23017 + CC1101 OOK Replay 447MHz 성공 + 펌웨어 정본 문서 5종 |
| 5/6 | STM32 Modbus RTU 리모콘 시뮬 + CC1101 전수검사 + Python 시뮬 스택 (143+ tests) |
| 5/8 | link_v2 신설 + CC1101 FSK 양방향(433MHz) + BLE LR Coded PHY 검증 + 솔라 INA219 + KC 통합 Link 앱(1125줄) |

## 코드베이스

### revitaProject (C:/todo/revitaProject/) — raw/revitaProject junction
- **application/**: REVITA 애플리케이션 소스
- **zephyr_workspace/**: Zephyr RTOS 빌드 환경
- **doc/**: 프로젝트 문서
- **ref/**: 참고 자료
- **revitaWiki/**: REVITA 지식 위키 (유일한 Source of Truth)
- **자료/**: 기타 자료
- **작업보고서/**: REVITA 프로젝트 작업보고서

### 로컬 (C:/todo/today/revita/)
- 약 7,830개 파일
- `protocol/`: 통신 프로토콜 문서
- `luckfox/`: Luckfox Core3506 평가 (RK3506 SBC)
- `회로도/`: Tower v3, Link v3 회로도
- `기구설계/`: 기계 설계 문서
- `kc_cert/`: KC 인증 관련

### 원격 펌웨어 (revita 서버 → raw/revita-apps/)
- **system/**: Link 노드 통합 앱 (DM + 7모듈: LoRa, 센서, 밸브, 보안, 전원, cron)
- **loraPing_tower/**: Tower 게이트웨이 (DATA 수신 → ACK 응답)
- **protocol/**: LoRa 바이트 프로토콜 v2 (19종 메시지, 16B 고정 프레임)
- **test/2026-04-14/**: TC-01~TC-08 **전항 PASS**
- 하드웨어: RAK4631 × 2 (Tower S/N: 001050295470, Link S/N: 001050234191)
- RF: 922MHz, SF7, BW125kHz, CR4/5, 14dBm
- 빌드: `build.sh` (양쪽 빌드/플래시/리셋)

### CC1101 OOK 리모콘 Replay 시스템 (revita 서버 → `~/revita/remocon/`)

당초 nRF52840 ↔ CC1101 4버튼 데모로 출발 → **시판 OOK 리모콘 신호 분석·복제** 풀스택으로 확장. **2026-05-12 로컬 동기화**: `git checkout origin/main -- remocon/` 로 핀포인트 도착 (29 MB / 1507 파일).

#### 펌웨어 변형 5종

| 폴더 | 플랫폼 | RTOS | 역할 |
|---|---|---|---|
| `tx/`, `rx/` | nRF52840 (pca10056) | Zephyr | 2-FSK 패킷 송수신 (당초 데모) |
| `tx_ook/`, `rx_ook/` | nRF52840 | Zephyr | **OOK 송수신** — 시판 리모콘 신호 재방사 |
| `txrx/` | nRF52840 | Zephyr | 통합형 |
| `ble_lr/` | nRF52840 | Zephyr | BLE 5 Coded PHY S=8 거리 비교 (결론: LoRa 대비 짧음) |
| **`stm32/`** | **STM32F103C8T6 Blue Pill** | **bare-metal (libopencm3)** | **Modbus RTU Slave + OOK 10버튼 송신 + USB CDC 디버그** |

#### RF 사양 (실측, OOK Replay)
- 주파수: **447.925 MHz** (CC1101은 +9.6 kHz 보정), OOK / Pulse-Distance Modulation
- 데이터레이트: ~3,769 bps (265 us/bit)
- 프레임: 64 심볼 × 8 프레임/버스트 (고정코드, rolling code 아님)
- **2026-05-01 대상 기기 ON/OFF 제어 성공**

#### 영업 자산화 — AISG와의 시너지
- 본 프로젝트 OOK Replay (447 MHz) ↔ **AISG OOK PHY (2.176 MHz)** — 변조 원리 동일, 주파수만 다름
- → 위시캣 **#155057 AISG 매칭 영업 자산**으로 활용 ([[aisg]] / [[2026-05-07_OOK-두-응용-영역]] 참조)
- 1인이 직접 만든 PoC = "보드 검증 없이 제안만 하는 다른 외주" 대비 차별화

#### 2026-05-12 ingest #8 흡수 — Solar Monitor + 현장 함정 박제

본 ingest #8(BASE `18bfce8f` → HEAD `1da01060`, 5/9~5/12)에서 흡수된 항목:

- **Solar Monitor Web UI 정본화 완료** (revita 부 시스템) — RAK4631 + INA219 + LoRa SF12(922.1MHz) + Flask + Chart.js 로컬 + systemd 자동 실행 + 5분 평균 + data.json 영속화. **현장 배포 가능 단계 진입**. 동일 풀스택이 [[한림용인cc-고가수조]] 시공에 즉시 재사용 가능 → [[2026-05-12_원격모니터링-사업라인]] 참조.
- **현장 배포 함정 3종 박제** ([[gaps]] § "현장 배포 함정 패턴"):
  - CP2104 USB-UART 동글 S/N 충돌 (udev rule ID_PATH 회피)
  - RPi USB Undervoltage (powered USB hub 필수)
  - 외부 CDN 의존 (정적 자원 로컬 호스팅 정책)
- **link_v2 button_module 정본 박제** (502줄 신규, link_v1 정본 유지하면서 v2 노트만)
- **3계층 자동화 패턴** ([[ai-direction]] 판단 로그 2026-05-12) — SessionStart hook + work-start 강화 + `_remote-cache/`. revitaWiki 자체 노하우가 myWiki에도 multi-agent `_inbox/` 패턴으로 확장됨.

#### 2026-05-12 박제 — 현장 식별 단서
- 이 PC USB에 꽂힌 `VID_0483 PID_5740 / S/N REMOCON01` (COM25) = **본 STM32 펌웨어의 USB CDC 식별자**. 향후 보드 회수 시 단서.
- 같은 보드(STM32F103C8T6)로 별도 `today/revita/blue_pill_blink/` 실증 완료 (244 byte, CMSIS-free, STM32CubeIDE 1.19 + arm-none-eabi-gcc 13.3). **본 펌웨어와 보드 호환** → 디버그 출력 통합 시 `stm32/src/usb_cdc.c` 재사용 가능.
- ST-Link 드라이버 본 PC에 영구 설치 완료 (Problem 28 해결).

#### 참조 자료
- **상세 entity**: [`revitaWiki/entities/entity-cc1101-remocon.md`](file:///C:/todo/revitaProject/revitaWiki/entities/entity-cc1101-remocon.md) — 200줄 정밀 명세 (레지스터·버튼 코드·핀맵·검사 절차)
- 보고서 8건: `OOK_TX_REPLAY_REPORT.md`, `CC1101_불량보고서.md`, `OOK_vs_FSK_변조방식_비교.md` 등 — RF 파형 분석 + 모듈 전수 검사
- 빌드: `cd ~/revita/remocon/stm32 && make && st-flash write bin/stm32_remocon.bin 0x08000000`
- 빌드 크기: 35.7 KB / 64 KB

## Zephyr RTOS 아키텍처
- Tower: 4+ 스레드 (LoRa, USB CDC, LTE/MQTT, 센서)
- Link: 3+ 스레드 (LoRa, 센서, 저전력)
- 검증 완료 드라이버: LoRa, USB CDC, QSPI, ADC, GPIO, I2C
- bare-metal 불가 → Zephyr 필수 (LoRa/USB/QSPI 동시성)

## 위키 연결

- **revitaWiki** (C:\todo\revitaProject\revitaWiki) — 기술 상세 (설계 결정, 모듈, TC, 로드맵)
- **myWiki의 이 페이지** — 사업 관점 요약

## 관련 페이지
- [[위시캣활��]]: 수주 이력 (#153090, 주3회, 월500만)
- [[projects]]: 프로젝트 맵
- [[skills]]: LoRa, RS485, Modbus, Zephyr
- [[experience]]: 산업 자동화 경험
- [[tailscale네트워크]]: 원격 접근
- [[양산제품]]: 양산 기술 활용
- [[claude-code]]: 전체 개발을 AI 협업으로 진행
- [[aisg]]: AISG 3.0 통신 프로토콜 — 본 프로젝트의 OOK Replay(447MHz)가 AISG OOK PHY(2.176MHz) 매칭 자산으로 활용 (위시캣 #155057)
- [[2026-05-07_OOK-두-응용-영역]]: OOK 변조 두 응용 영역 통합 인사이트
