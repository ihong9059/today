---
title: AISG (Antenna Interface Standards Group)
type: entity
created: 2026-05-07
updated: 2026-05-12
tags: [프로토콜, 통신, 임베디드, 기지국, 안테나, OOK, RS-485, HDLC]
links: [revita, 위시캣활동, skills, 양산제품, experience]
---

# AISG (Antenna Interface Standards Group)

## 한 줄 정의
이동통신 기지국 안테나 라인 디바이스(ALD)를 원격 제어/모니터링하는 국제 표준 프로토콜. **위시캣 #155057 (2026-05-07)** 사전 학습으로 분석 완료.

## 적용 대상 (ALD)
- **RET** (Remote Electrical Tilt) — 안테나 빔 틸트 각도 원격 조정
- **TMA** (Tower Mounted Amplifier) — 타워 장착 증폭기 제어/모니터링
- **GLS** (Geographic Location Sensor) — 위치 센서
- **ASD** (Alignment Sensor Device) — 정렬 센서

## 프로토콜 스택 (3계층)

```
+-----------------------------+
| Application Layer           |  디바이스 제어 명령/응답
+-----------------------------+
| Data Link Layer (HDLC)      |  프레임, CRC, 흐름 제어
+-----------------------------+
| Physical Layer (PHY)        |  RS-485 또는 OOK (2.176MHz)
+-----------------------------+
```

### 물리 계층 — 두 옵션
1. **RS-485 반이중** — 전용 케이블, 9,600 bps
2. **OOK 2.176MHz Bias-T** — 캐리어를 RF 피더 케이블에 in-band 주입 (별도 케이블 불필요), 9,600 bps

### 데이터 링크 (HDLC 프레임)
| Flag | Addr | Control | Info | FCS | Flag |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 0x7E | 8 bit | 8 bit | 가변 | CRC-CCITT 16 | 0x7E |

- Bit Stuffing: 연속 5개 '1' 뒤 '0' 삽입
- 토폴로지: Single-Master Multi-Slave (1:N)

## AISG 2.0 → 3.0 (2018~) 핵심 변경

| 항목 | 2.0 | 3.0 |
|---|---|---|
| 제어 포트 | 단일 | **Multi-Primary** (다중 컨트롤러) |
| 디바이스 발견 | 기본 스캔 | **Device Discovery + Connection Mapping + Ping** |
| 커넥터 전원 | +12V/10-30V/-48V | 10-30V DC 단일 |
| 사이트 맵핑 | 미지원 | RF 채널별 케이블 자동 맵핑 |
| PHY | RS-485 / OOK | 동일 (하위 호환) |

핵심 변경 4가지:
1. Multi-Primary — 한 ALD를 여러 컨트롤러가 제어
2. Device Discovery — 버스 자동 탐색
3. Connection Mapping — RF 채널 ↔ 케이블 자동 파악
4. Ping Packet — 모든 RF 채널 핑 → 장애 감지

## 사용자 보유 역량 매칭 (11/11)

| 요구 | 보유 자산 |
|---|---|
| C++ 임베디드 펌웨어 | 38년, STM32/nRF/ESP 양산 5종 |
| RS-485 반이중 | Modbus RTU 양산 (KC 인증) |
| **OOK 변조** | **CC1101 447.925MHz Replay 직접 구현 (REVITA, 2026-05)** |
| HDLC 프레임 | BLE Mesh/LoRa 패킷 프레임 다수 |
| CRC-CCITT 16 | RS-485 Modbus CRC16 양산 |
| Device Discovery | BLE Mesh 3,800대 스캔 (일본 수출) |
| Multi-Primary | BLE Mesh 게이트웨이 동시성 |
| Connection Mapping | Mesh 라우팅 테이블 |
| Ping Packet | BLE Heartbeat |
| 현장 테스트 | 용인 기흥구 사무실 = AISG 현장 동일 지역 |
| 인증 | KC/TELEC/CE 3개국 |

→ AISG 3.0 **변경점만 학습 필요**. PHY 두 옵션 모두 직접 구현 경험 보유.

## OOK 변조 — 두 응용 영역 통합 (핵심 인사이트)

| 항목 | REVITA OOK Replay | AISG 3.0 OOK |
|---|---|---|
| 주파수 | 447.925 MHz | 2.176 MHz |
| 매체 | 공중파 RF (Sub-GHz) | RF 피더 케이블 in-band (Bias-T) |
| 용도 | 외부 리모컨 신호 캡처/재현 | 기지국 ALD 원격 제어 |
| 변조 원리 | OOK On-Off Keying (동일) | 동일 |

→ 캐리어 주파수만 다를 뿐 OOK 변조/디코딩 로직 동일. 자세한 인사이트: [[2026-05-07_OOK-두-응용-영역]]

## 위시캣 #155057 지원 이력
- **공고**: 기존 C++ 소스 기반 AISG 3.0 통신 프로토콜 포팅 및 현장 연동 테스트
- **예산/기간**: 2,400만원 / 90일
- **현장**: 경기도 용인시 기흥구
- **마감**: 2026-05-15
- **지원일**: 2026-05-07
- **지원서**: `위시캣/2026-05-07_프로젝트155057_지원내용.txt`
- **매칭률**: 9/10 → 11/11 → **13/13** (OOK 직접 + HW+SW 2인 팀 추가 후)
- **★ 미팅 제안 수령**: 2026-05-12 (클라이언트가 사전 요구 4가지 송부)
- **미팅 준비물**: `위시캣/2026-05-12_프로젝트155057_미팅준비/준비물/` (6 파일 + 시각자료 14 파일)
- **요구 #3 핵심 대응**: 정직 명시(AISG 양산 소스/직접 경험 없음) + 2경로(A 클라이언트 소스 인수 / B 자체 5강점 처음부터 90일)
- **결과**: (미팅 일정 확정 대기 / 미팅 후 기록)

## 영업/사업 함의
- 한국 기지국 시장 = KC 인증 환경 → KC RS-485 Modbus Testbed (REVITA, 2026-05) 자산 활용 가능
- 안테나/RF 도메인 진입 (기존 BLE Mesh/LoRa에 더해 in-band on RF feeder 분야 확장)
- 향후 위시캣 ALD/RET/기지국/안테나 키워드 공고 진입 즉시 가능

## 관련 페이지
- [[revita]]: CC1101 OOK Replay 직접 구현 (PHY 매칭 자산)
- [[위시캣활동]]: #155057 지원 이력
- [[양산제품]]: RS-485 Modbus RTU 양산 자산
- [[skills]]: OOK 변조 / RS-485 / HDLC 등 직접 보유 기술
- [[experience]]: 통신 프로토콜 양산 + OOK 신규
- [[2026-05-07_OOK-두-응용-영역]]: 두 응용 영역 통합 인사이트 (thoughts)
