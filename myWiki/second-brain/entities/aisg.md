---
title: AISG (Antenna Interface Standards Group)
type: entity
created: 2026-05-07
updated: 2026-06-03 (위성 원격탐사 + 노지 관리 신사업 carry 확장 — Sentinel-2/3 NDVI/LST + 농림위성 2026 발사 + Google Earth Engine + revita LoRa 노드 fusion = 노지 마이크로 calibration + 매크로 정찰 통합 SaaS 검토 trigger, 사용자 도메인 질의 후속 박제 + revita 카드 발송)
tags: [프로토콜, 통신, 임베디드, 기지국, 안테나, OOK, RS-485, HDLC, ESP32-P4, CNN-가속, 영상-추론, 농업-IoT-신사업, 위성-원격탐사, NDVI, LST, 노지관리, 농림위성, Google-Earth-Engine, 정부RD]
links: [revita, 위시캣활동, skills, 양산제품, experience, 한림용인cc-고가수조, ai-fanstick, onDevice-ai, 영업전략, 2026-06-03_위성-원격탐사-노지관리-신사업]
---

# AISG (Antenna Interface Standards Group)

## 2026-06-03 — 위성 원격탐사 + 노지 관리 신사업 carry 확장 ⭐⭐⭐ (사용자 도메인 질의 후속 박제 + revita 카드 발송)

사용자 도메인 질의 ("인공위성 영상으로 곡물/지형 온도·작황 측정 서비스 있나요?") + 결단 ("이 data로 노지 관리 방안 추구, 다음 사업분야 검토") → ai-direction §결정 35 신설 + revita 카드 #2026-06-03-001 발송.

### 위성 원격탐사 + revita LoRa fusion 시너지

| revita 자산 | 위성 결합 | 노지 관리 본질 |
|---|---|---|
| LoRa 센서 노드 양산 (지상 ground truth) | Sentinel-2 NDVI / Sentinel-3 LST / 농림위성 (2026 발사) | **위성 매크로 + 지상 마이크로 fusion = 정밀 노지 관리** |
| Sub-GHz BLE-LR 통신 | Google Earth Engine 클라우드 처리 + 지상 distribution | 농가 마지막 1km 인프라 |
| Solar 자가발전 | 위성 매주 갱신 / 지상 매일 | 인프라 부재 노지 무인 운영 |
| rtuRemocon Modbus 제어 | 위성 → 결정 → Modbus 출력 (관수·시비·차광) | **위성 → 결정 → 노지 행동 폐회로** ⭐ |

### 사업 시나리오 (영업전략 carry — 응답율 검증 누적 전 단계)

| 진입 형태 | 본 vault 적합도 |
|---|:-:|
| 농진청 / 농어촌공사 정부 R&D | ⭐⭐ Tier 3 정부 R&D 트랙 |
| **지상 LoRa IoT + 위성 fusion SaaS** | ⭐⭐⭐ revita / AISG / 한림용인CC 자산 직접 매칭 ⭐ |
| 위시캣 위성 분석 외주 | ⭐ 산발 |

### 시장 타이밍 결정타

- **농림위성 2026년 발사** + 본 vault revita LoRa 양산 자산 = **동시 활용 가능 시점** ⭐
- ESP32-P4 채택 결정 시 영상 노드 (결정 31) + 위성 data fusion 통합 carrier 진화

자세히 [[ai-direction]] § 결정 35 + [[2026-06-03_위성-원격탐사-노지관리-신사업]] (신규 thought) + [[영업전략]] § 신사업 검토 carry.

---

## 2026-06-02 야간 — ESP32-P4 CNN 가속 영상 추론 신사업 carry ⭐⭐ (revita ingest #15-2)

revita-claude 카드 #2026-06-02-003 흡수 (ingest #15-2 Tower SBC 대체 보드 조사). **ESP32-P4+C6 RTOS $14** (Core3506 Linux $17 대비) — RS-485 / Ethernet / WiFi / **MIPI-CSI+ISP / H.264 / CNN 가속** + 부팅 1~2s. 본 entity AISG 측면 신사업 carry 단서.

### 신사업 carry 매칭

- **AI + 농업 IoT**: 현 LoRa 센서 노드 (텍스트/숫자 metric) → **영상 추론 노드** 진화 옵션. ESP32-P4 CNN 가속으로 작물 상태/병해충 엣지 추론 가능
- **시설농업 IoT**: [[한림용인cc-고가수조]] 시설 IoT 확장 — 수위 sensor 노드 옆에 영상 추론 노드 (탁도/이물질/구조물 변형) 옵션
- **AISG 3.0 확장**: 본 AISG는 기지국 안테나 표준. CNN 가속 노드는 안테나 정렬·환경 모니터링·고장 예측에 적용 가능 (RET / TMA / GLS / ASD 측면 영상 분석 추가)
- **AI FanStick / Stage 4 cross-link**: onDevice_AI Stage 4 영상 추론 트랙 ($14 ESP32-P4 BOM path 후보)

### 채택 미결정 carry

- Core3506 Linux $17 vs ESP32-P4+C6 RTOS $14 — Linux→RTOS 포팅 비용 + RAM 32MB + 전원 + BSP + C6 의존 우려
- revita 측 Core3506 Linux 앱 코드량 확인 후 결정
- myWiki 측에서는 "신사업 단서" 박제만 — 채택 결정은 revita 측

→ [[revita]] § 6/2 야간 ingest #15 + [[ai-direction]] §결정 31 + [[2026-06-02_certification-tracks-matrix]] § AISG CNN 가속 carry.

---

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
- **AISG 표준 자료 패키지** (PM3, 2026-05-12): `위시캣/2026-05-12_프로젝트155057_미팅준비/AISG자료/` — WHY/WHAT/DIFF/DEVICE 4단 분류 5 파일 (55 KB) + Q&A 21개. 미팅 1회용이 아니라 **후속 영업·교육 자산**으로 재사용 가능.
- **OOK PHY 심층 자료** (2026-05-13): `위시캣/2026-05-12_프로젝트155057_미팅준비/준비물/5_OOK_2.176MHz_BiasT_상세.md` — 9 KB / 8 섹션 / 출처 18 / **driver IC MAX11947 확정** (ADI/Maxim, AISG v2/v3 통합 4채널 single-chip, +15 dB spectral mask margin) + Bias-T L/C 토폴로지 + Smart Bias-T 5 vendor (Kaelus/HUBER+SUHNER/Amphenol/CCI/RFS) + Q&A 6개. PHY 위험 분석에 결정적.
- **UTTEC × AISG 3.0 Pitch 동영상** (2026-05-13): `remotion-project/out/UttecAisgPitch/video.mp4` (8:56 · 35.5 MB · 7 scene) + `video_1.2x.mp4` (7:27 · 20.7 MB · 1.2배속). Remotion + Edge TTS ko-KR-SunHiNeural. 미팅 사후 follow-up·임원 1차 자료·후속 AISG 영업에 재사용 가능.
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
