# AISG v3.0 상세 표준 스펙

> 위시캣 #155057 미팅 (2026-05-13) 대비 — AISG v3.0 표준의 계층·HDLC·전기·명령 구조 전반 정리.
> 출처: AISG 공식(aisg.org.uk), Wikipedia, Analog Devices, EDN, 3GPP TS 25.46x 시리즈, Connector Supplier.

---

## 1. 표준 개요

| 항목 | 값 |
|---|---|
| 표준 정식 명칭 | **Antenna Interface Standards Group Base Standard AISG v3.0** |
| 최초 공개 | **2018년 11월** (이후 빈번한 개정 — v3.0.2.1 / v3.0.4.4 / v3.0.6.2 등) |
| 발행 기관 | AISG (영국 비영리 컨소시엄, 2001년 설립, 회원 45+개사, 2019 기준) |
| 적용 대상 | 이동통신 기지국 안테나 라인 디바이스(ALD)의 디지털 원격 제어·모니터링 |
| 호환성 | AISG v2.0 modem과 **물리계층 호환** (PHY 모뎀 그대로 사용 가능) |
| 3GPP 매핑 | TS 25.460 / 25.461 / 25.462 / 25.463 / 25.466 (UMTS Iuant 인터페이스) |

### 표준 문서 트리

```
AISG v3.0 Family
├── AISG-BASE-v3.0.x.x.pdf      ← Base Standard (HDLC, 명령, 절차)
├── AISG-ST-RET-vR.x.pdf         ← Subunit Type: RET
├── AISG-ST-TMA-vTMA3.0.5.pdf    ← Subunit Type: TMA
├── AISG-ES-GLS-v?.?.pdf         ← Extension Standard: GLS
└── AISG-ES-ASD-v2.1.0.pdf       ← Extension Standard: ASD
```

---

## 2. 계층 구조 (Protocol Stack)

```
+--------------------------------------------------+
| Layer 3  │ Application Layer                     |
|          │ - Elementary Procedures (EP)          |
|          │ - Subunit-specific commands           |
|          │   (RET / TMA / GLS / ASD)             |
+--------------------------------------------------+
| Layer 2  │ Data Link Layer (HDLC)                |
|          │ - ISO/IEC 13239, Class UNC1,15.1 TWA  |
|          │ - Frame: Flag-Addr-Ctrl-Info-FCS-Flag |
|          │ - CRC-CCITT 16, Bit stuffing          |
+--------------------------------------------------+
| Layer 1  │ Physical Layer                        |
|          │ - RS-485 반이중 (전용 케이블)           |
|          │ - OOK 2.176 MHz (RF feeder + Bias-T)  |
|          │ - 9.6 kbit/s 기본 baud rate           |
+--------------------------------------------------+
```

**3GPP 표준 매핑**

| 3GPP TS | AISG 대응 |
|---|---|
| TS 25.460 | 일반 원칙·아키텍처 (Iuant interface) |
| TS 25.461 | Layer 1 (Physical) |
| TS 25.462 | Signalling Transport |
| TS 25.463 | RNSAP-AISG mapping (signalling 매핑) |
| TS 25.466 | Application Part Signalling Procedures |

---

## 3. Physical Layer 상세

### 3.1 전송 방식 — 2가지 옵션

| 항목 | RS-485 옵션 | OOK 옵션 |
|---|---|---|
| 매체 | 전용 8-pin AISG 케이블 | RF 피더 케이블 공유 |
| 방식 | 반이중 차동 | OOK (On-Off Keying) |
| 캐리어 | — | **2.176 MHz** |
| 주입 방식 | RS-485 차동 페어 | **Bias-T**로 RF 피더에 합성 |
| Baud Rate | **9,600 bps** | 9,600 bps |
| 토폴로지 | Single-Master Multi-Slave | Single-Master Multi-Slave |
| 케이블 추가 | 필요 | **불필요** (RF 피더 공용) |

### 3.2 커넥터 (C485)

- 표준: IEC 60130-9 Ed.3.0 — screw-ring locking (M16 × 0.75)
- 형상: 8-pin 원형 커넥터
- 보호등급: **IP68**
- 정격 전압: 32 V
- 삽입/추출 력: 최대 60 N
- 케이블 게이지: crimp 0.75 mm² (AWG 18) / solder 0.5 mm² (AWG 20)

### 3.3 전원 핀 — v2.0 vs v3.0 결정적 차이

| 핀 | v2.0 | v3.0 |
|---|---|---|
| +12 V DC | ✓ 전용 핀 | ❌ 제거 |
| 10–30 V DC | ✓ 전용 핀 | ✅ **유일한 DC 전원 핀** |
| −48 V DC | ✓ 전용 핀 | ❌ 제거 |

→ v3.0은 전원 구조 단순화. 단, 기존 v2.0 케이블·모뎀의 PHY는 그대로 호환.

---

## 4. Data Link Layer — HDLC

### 4.1 HDLC Class

- ISO/IEC 13239 준수
- **Class UNC1,15.1 TWA** (Unbalanced Normal Response Mode, Class 1)
- 단일 마스터·다중 슬레이브 (TWA = Two-Way Alternate, 반이중)

### 4.2 프레임 구조

```
+-------+--------+---------+----------+-------+-------+
| Flag  | Addr   | Control | Info     | FCS   | Flag  |
| 0x7E  | 8 bit  | 8 bit   | 가변     | 16 bit| 0x7E  |
+-------+--------+---------+----------+-------+-------+
        └─────── 비트 스터핑 적용 영역 ─────────┘
```

| 필드 | 길이 | 설명 |
|---|---|---|
| Flag | 1 byte | `0x7E` (01111110) — 프레임 시작/종료 구분자 |
| Address | 1 byte | 슬레이브 주소 + C/R bit (Command/Response 구분) |
| Control | 1 byte | 프레임 타입 (I-frame / S-frame / U-frame) |
| Info | 가변 (≤ 78 octets) | 명령/응답 페이로드 |
| FCS | 2 bytes | **CRC-CCITT 16** (Address + Control + Info 대상) |
| Flag | 1 byte | `0x7E` (다음 프레임의 시작 Flag 겸용 가능) |

### 4.3 비트 스터핑

- 데이터 영역에서 연속 5개의 '1' 발생 시 그 뒤에 '0' 자동 삽입 (송신)
- 수신 측에서는 5개 '1' 뒤의 '0'을 제거
- 목적: Flag(`0x7E` = `01111110`)와 데이터 충돌 방지

### 4.4 Address Field 규칙

- `0x00` = 초기 상태 (설치 시점)
- C/R bit로 Primary 명령 vs Secondary 응답 구분
- 수신 측에서 자신의 주소와 일치할 때만 프레임 처리

### 4.5 Frame Length

- 기본 N = **78 octets** (모든 Secondary 디바이스가 지원해야 하는 최소 크기)
- 4 ~ N octets 범위에서 가변

---

## 5. Application Layer — 명령 구조

### 5.1 명령 정의 패턴

```
PrimaryCommand {
    CommandCode          uint8    // 절차 식별자
    PrimaryCommandSequence uint8  // 시퀀스 번호
    [추가 파라미터...]
}

ALDCommand {
    CommandCode          uint8
    ALDCommandSequence   uint8
    [추가 파라미터...]
}
```

- 명령 발신자에 따라 `PrimaryCommand` (마스터) 또는 `ALDCommand` (슬레이브) 구분
- **첫 파라미터** = 명령 코드 (procedure identifier)
- **두 번째 파라미터** = 시퀀스 번호 (재전송·응답 매칭)
- 명령명에는 접미사 `"Command"` 부여 (예: `ScanCommand`)

### 5.2 응답 구조

- 모든 응답은 HDLC INFO field에 실어 전송
- **Return Code** 1바이트(또는 다중) — 처리 결과 식별
- 실패 시: 실패 원인을 식별하는 Return Code 반환
- 전체 Return Code 표는 Base Standard **Appendix C**에 정의됨

### 5.3 Elementary Procedures (EP) 분류

| 카테고리 | 예시 EP |
|---|---|
| **공통 (Common)** | Address Assignment, Reset, Get Software Version, Set Date/Time, Get Alarm Status, Get Bias-T Voltage |
| **Discovery (v3.0)** | Scan Bus, Get Subunit List, Get Subunit Type |
| **Site Mapping (v3.0)** | Get RF Port Mapping, Get Antenna-to-RET Association, Get Frequency Range |
| **Ping (v3.0 선택)** | Send Ping, Get Ping Response |
| **Multi-Primary (v3.0)** | Get Primary List, Set Access Rights, Acquire Subunit |
| **RET 전용** | Set Tilt, Get Tilt, Set Tilt Limits, Calibrate |
| **TMA 전용** | Get Gain, Set Bypass, Get Temperature, Get Current |
| **GLS 전용** | Get Position, Get Heading |
| **ASD 전용** | Get Alignment Angles, Calibrate Sensor |

---

## 6. AISG v3.0 신규 기능 4종 (Phase 3 핵심 구현 대상)

### 6.1 Multi-Primary Control (MALD)

- 한 ALD를 **여러 컨트롤러(Primary)가 동시 제어**
- **Subunit 단위로 접근 권한 설정**: 각 Primary가 어느 Subunit에 접근 가능한지 ALD가 관리
- 충돌 방지: 트랜잭션 ID + mutex로 동시 접근 시 직렬화
- 예시 시나리오: 동일 ALD를 LTE 컨트롤러 + 5G 컨트롤러가 공동 제어

### 6.2 Device Discovery

- Primary가 버스에 broadcast → 응답하는 모든 Secondary 자동 식별
- 신규 Hot-plug 디바이스 감지 (주기적 재스캔)
- v2.0의 수동 주소 지정 방식에서 **자동 탐색**으로 확장

### 6.3 Site Mapping (Connection Mapping)

- ALD 간 관계·내부 구성·RF 케이블 연결을 자동 파악
- 발견 가능 정보:
  - RET ↔ 논리 안테나 어레이 연결
  - 주파수 대역 범위
  - RF 포트 ↔ 케이블 연결
  - 센서 ↔ 안테나 매핑
  - 기지국 RF 포트 매핑

### 6.4 Ping Packet (선택 기능)

- RF 채널별로 Ping 패킷 송신 → 응답 수집
- RF 케이블 연결 자동 발견·검증
- **각 채널이 AISG-aware** 여야 매핑 가능 (v3.0의 새 요구사항)
- 장애 감지 도구로도 활용 (응답 없는 채널 = 단선·고장)

---

## 7. v2.0 대비 추가 사항 (요약)

| 카테고리 | v3.0 신규 |
|---|---|
| 명령 셋 | Multi-Primary / Discovery / Mapping / Ping 명령 추가 |
| 데이터 모델 | Subunit 단위 access right 모델 |
| 전기 | 전원 핀 단일화 (10–30 V만 사용) |
| 사양 명확도 | **Pseudocode 포함**, 벤더 구현 요구 강화 |
| IOT (Interoperability Test) | 명령·HW 정의 강화 — AISG v3.0 인증 적합성 검증 |
| 표준 플랫폼 | Multi-band, Multi-array 복합 기지국 운영성 향상 |

---

## 8. 우리(UTTEC) 구현 매핑

| AISG v3.0 요구 | UTTEC 보유 자산 | 즉시 활용성 |
|---|---|---|
| HDLC 프레임 + CRC-16 | Modbus RTU 양산 / BLE Mesh / LoRa 4종 프로토콜 | 즉시 |
| RS-485 PHY 반이중 9600bps | Modbus RTU 컴프레서 컨트롤러 (KC 인증 양산) | 즉시 |
| OOK 변조 (2.176 MHz) | CC1101 447.925 MHz OOK Replay (2026-05) | 즉시 (주파수만 변경) |
| Device Discovery | BLE Mesh 3,800대 스캔/인식 | 즉시 |
| Connection Mapping | BLE Mesh Routing Table | 패턴 동일 |
| Ping | BLE Heartbeat | 패턴 동일 |
| Multi-Primary mutex | FreeRTOS mutex / semaphore 패턴 | 즉시 |
| 시퀀스 번호 / 재전송 | LoRa / BLE Mesh ACK 메커니즘 | 즉시 |
| Subunit 데이터 모델 | EtherCAT MFC 다중 channel 구조 | 즉시 |

---

## 9. 미팅에서 답변 가능한 질문 (Cheat Sheet)

**Q: AISG v3.0 표준 문서 어떻게 입수했나?**
> aisg.org.uk 공식 사이트에서 Base Standard PDF (현재 v3.0.6.2 최신) 공개 배포. 별도 라이선스·회비 없이 다운로드 가능.

**Q: 기존 v2.0 modem이 v3.0과 호환되나?**
> Yes. v3.0의 가장 큰 변화는 **상위 계층(L2/L3)** 신기능이고, 물리계층(RS-485 차동 또는 OOK 2.176 MHz Bias-T)은 v2.0과 동일. 기존 modem 그대로 사용 가능.

**Q: HDLC 프레임 직접 구현해본 적 있나?**
> Modbus RTU(CRC-16) 양산 + BLE Mesh 커스텀 프로토콜 + LoRa 헤더 + EtherCAT 프레임 — 4종 프로토콜에서 프레임 파서·생성기·CRC 검증·비트스터핑 패턴 구현 경험. AISG는 이 중 가장 정형적인 HDLC 표준이라 즉시 착수 가능.

**Q: 3GPP 표준 문서도 참고하나?**
> AISG가 3GPP TS 25.460~466 시리즈로 통합되어 있어, 양쪽 모두 참조 가능. 다만 ALD 디바이스 측 구현은 AISG 본 표준이 더 상세하므로 그것을 1차 reference로 사용.

**Q: Multi-Primary 구현 시 가장 큰 위험은?**
> 동시성 버그 (race condition / deadlock). BLE Mesh 3,800대 시스템의 검증된 mutex 패턴 그대로 재사용 + ThreadSanitizer 또는 정적 분석 도구로 사전 검증.

---

## 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-12 |
| 작성 목적 | 위시캣 #155057 미팅 사전 학습 — 상세 spec 자료 |
| 출처 | AISG 공식 / 3GPP / Analog Devices / EDN / Wikipedia / Connector Supplier |
| 다음 자료 | `02_AISG_2.0_vs_3.0_심도비교.md` / `03_ALD_타입별_상세.md` |
