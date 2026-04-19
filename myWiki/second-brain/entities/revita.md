---
title: REVITA
type: entity
created: 2026-04-19
updated: 2026-04-19
tags: [프로젝트, IoT, 펌웨어, LoRa]
---

# REVITA

## 한 줄 정의
IoT 장비 프로젝트. LoRa 무선 통신 + RS485 유선 통신 + KC 인증 대응.

## 현재 상태
- RAK4630 펌웨어 프로젝트 (Zephyr RTOS)
- LoRa 프로토콜 v2 (16B 통일)
- KC RS485 Modbus RTU 인증 프로토콜 설계 완료
- RS485 사전 검증 시스템 (DUT 시뮬레이터 + Flask 웹)
- 회로도/핀매핑 지속 업데이트

## 기술 스택
- RAK4630 (nRF52840 + SX1262 LoRa)
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

## 코드베이스

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

## Zephyr RTOS 아키텍처
- Tower: 4+ 스레드 (LoRa, USB CDC, LTE/MQTT, 센서)
- Link: 3+ 스레드 (LoRa, 센서, 저전력)
- 검증 완료 드라이버: LoRa, USB CDC, QSPI, ADC, GPIO, I2C
- bare-metal 불가 → Zephyr 필수 (LoRa/USB/QSPI 동시성)

## 관련 페이지
- [[projects]]: 프로젝트 맵
- [[skills]]: LoRa, RS485, Modbus, Zephyr
- [[experience]]: 산업 자동화 경험
- [[tailscale네트워크]]: 원격 접근
- [[양산제품]]: 양산 기술 활용
