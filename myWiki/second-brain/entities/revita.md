---
title: REVITA
type: entity
created: 2026-04-19
updated: 2026-05-04
tags: [프로젝트, IoT, 펌웨어, LoRa, Zephyr, CC1101, Sub-GHz, revitaProject]
links: [claude-code, experience, projects, skills, tailscale네트워크, 양산제품, 위시캣활��]
---

# REVITA

## 한 줄 정의
IoT 장비 프로젝트. LoRa 무선 통신 + RS485 유선 통신 + KC 인증 대응. **위시캣 수주 (#153090)**.

## 현재 상태 (2026-05-04 동기화)
- RAK4630 펌웨어 프로젝트 (Zephyr RTOS)
- LoRa 프로토콜 v2 (16B 통일) — 양방향 TX/RX, ACK 상태머신 완료
- KC RS485 Modbus RTU **인증 Testbed 완성** (Modbus 슬레이브 + Flask Web UI 마스터)
- 회로도/핀매핑 지속 업데이트
- CC1101 리모콘 데모 완성 + **OOK Replay 447.925MHz 성공** (대상 기기 ON/OFF, 10버튼 코드)
- **Sensor RS485 모듈** 완료 (sensor_rs485.c, sensor_blob NVS 저장)
- **Valve 모듈** 완료 (3선 H-bridge CW/CCW/STOP, 2시간 하드리밋)
- **MCP23017 드라이버** 완성 (Tower I/O 확장, shadow 복구, mutex 직렬화)
- **모듈 파일 분리**: Link 20+ 파일, Tower 8+ 파일 아키텍처
- **펌웨어 정본 문서 5종** 신규 (DM·Power·Sensor·NVS·모듈공통)

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

### CC1101 리모콘 데모 (revita 서버 → /home/uttec/revita/remocon/)
pca10056 2대 + CC1101 (HW-863) 2개로 433.92MHz Sub-GHz 무선 버튼 리모콘 구현.
- **cc1101/**: CC1101 SPI 드라이버 (커스텀, Zephyr 공식 드라이버 없음)
- **tx/**: TX 앱 — 버튼 1~4 누르면 4B 패킷 무선 송신
- **rx/**: RX 앱 — 수신 후 해당 번호 LED 토글
- RF: 433.92MHz, 2-FSK, 38.4kbps, 10dBm
- 패킷: [LEN][BTN_ID][SEQ][CRC8] 4바이트 고정
- SPI pinctrl 오버라이드: P0.27(SCK), P0.26(MOSI), P1.08(MISO), P1.06(CSN), P0.05(GDO0)
- 빌드: `build.sh tx|rx [pristine|flash]`, Windows에서 nrfjprog로 플래시
- 보드: 683449679(COM11, TX), 683795210(COM13, RX)
- 참고: `USAGE.md` (사용설명서), `pinmap.md` (배선표), `plan.md` (계획서)

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
