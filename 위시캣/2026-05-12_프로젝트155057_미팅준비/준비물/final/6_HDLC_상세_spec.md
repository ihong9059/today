# 6. AISG HDLC 데이터 링크 계층 상세 spec — 미팅 답변용 심층 자료

> 클라이언트의 핵심 질문 "HDLC 프레임 처리 어떻게 구현하실 건가요?"에 답변할 수 있는 깊이.
> AISG v2.0 / v3.0의 **L2(HDLC) 계층은 동일** — 본 자료는 v3.0에도 100% 그대로 적용된다.
> 출처: ISO/IEC 13239, ITU-T Q.921, 3GPP TS 25.462, AISG Base Standard v3.0, Wikipedia.

---

## 0. 한 줄 요약 (미팅에서 가장 먼저 말할 문장)

> "AISG의 L2는 **ISO/IEC 13239 표준 HDLC**를 그대로 채택하되, **Class UNC1,15.1 TWA**(Unbalanced Normal Response Mode, Two-Way Alternate = 반이중 단일 마스터·다중 슬레이브)로 운용됩니다. 우리는 **Modbus RTU(CRC-16) 양산 + BLE Mesh + LoRa + EtherCAT** 4종 프로토콜에서 프레임 파서·생성기·CRC 검증·비트스터핑 패턴을 반복 구현해왔기 때문에, HDLC 파서는 **첫 sprint 안에 동작**시킬 수 있습니다."

---

## 1. HDLC란 무엇인가 (배경)

### 1.1 표준 계보

| 항목 | 값 |
|---|---|
| **표준명** | High-Level Data Link Control (HDLC) |
| **현행 표준** | **ISO/IEC 13239:2002** (Information technology — Telecommunications and information exchange between systems — High-level data link control (HDLC) procedures) |
| **최초 표준화** | 1979년 (ISO 3309 / 4335) — IBM SDLC(1975)를 ISO가 일반화 |
| **OSI 계층** | **Layer 2 (Data Link Layer)** |
| **파생 프로토콜** | LAPB(X.25), LAPD(ISDN), LAPF(Frame Relay), Cisco HDLC, PPP, **AISG** |

### 1.2 왜 AISG가 HDLC를 채택했나

| 요구사항 | HDLC가 충족하는 방식 |
|---|---|
| 시리얼 회선의 신뢰성 확보 | 비트 스터핑 + CRC-CCITT 16 → 단일 비트 오류 100% 검출 |
| 마스터-슬레이브 토폴로지 | UNC(Unbalanced Normal Response Mode)가 정확히 이 모델 |
| 반이중 통신 (RS-485, OOK 모두 반이중) | TWA(Two-Way Alternate) 클래스 |
| 단일 페어 어드레싱 | 8-bit Address 필드 + C/R bit |
| 표준 정합 (3GPP TS 25.46x) | HDLC가 통신업계 사실상 de-facto L2 표준 |
| 오픈 IP, 라이선스 부담 없음 | 1979년 표준화 → 특허 만료 |

### 1.3 HDLC의 3가지 운용 모드

| 모드 | 약어 | 설명 | AISG 사용 |
|---|---|---|---|
| Normal Response Mode | **NRM** | Primary가 polling, Secondary는 허가 받을 때만 송신 | ✅ **AISG가 채택** |
| Asynchronous Response Mode | ARM | Secondary가 능동 송신 가능 | ❌ |
| Asynchronous Balanced Mode | ABM | 양쪽이 동등(peer-to-peer), point-to-point | ❌ |

### 1.4 HDLC Class — UNC1,15.1 TWA 의미 해부

AISG 표준 문서에 나오는 정확한 클래스: **"UNC1,15.1 TWA"**

| 토큰 | 풀이 | 의미 |
|---|---|---|
| **U** | Unbalanced | 마스터(Primary) 1대 + 슬레이브(Secondary) N대의 비대칭 구조 |
| **N** | Normal response | NRM 모드 — Primary polling 기반 |
| **C** | Class 1 | 기본 클래스 (확장 옵션 사용 안 함) |
| **1** | 옵션 1 | Mod-8 시퀀스 번호 (3-bit N(S)/N(R), 0~7) |
| **15.1** | XID 옵션 15.1 | 기본 frame size N = 78 octets |
| **TWA** | Two-Way Alternate | **반이중** — 한 번에 한쪽만 송신 |

→ 즉, AISG HDLC는 **가장 기본형, 가장 단순한** HDLC 변형. 풀 LAPB/LAPD 같은 복잡도가 아님.

---

## 2. 프레임 구조 상세

### 2.1 전체 프레임 레이아웃

```
  ┌──────┬──────────┬─────────┬───────────────┬────────┬──────┐
  │ Flag │ Address  │ Control │ Information   │  FCS   │ Flag │
  │ 0x7E │  1 byte  │ 1 byte  │  0~78 bytes   │ 2 bytes│ 0x7E │
  └──────┴──────────┴─────────┴───────────────┴────────┴──────┘
         └──────── bit stuffing 적용 영역 ───────────────┘
         └──── FCS 계산 대상 (Addr + Ctrl + Info) ─────┘
```

### 2.2 필드별 상세

#### A. Flag (1 byte, `0x7E` = `01111110`)

- **유일하게 6개 연속 '1'을 갖는 패턴** → 비트 스터핑에 의해 데이터 영역에서는 절대 나올 수 없음
- 프레임 경계 식별자
- 연속 프레임 사이에 단일 Flag 공유 가능 (한 Flag가 앞 프레임의 종료 + 뒤 프레임의 시작 역할)
- Idle 회선에서 Flag 연속 송출 (= Flag Idle) 또는 '1' 연속 (= Mark Idle) 선택 가능

#### B. Address (1 byte)

```
  bit 7  bit 6  bit 5  bit 4  bit 3  bit 2  bit 1  bit 0
  ┌─────────────────────────────────────────────┬─────┐
  │             Secondary Address (7 bit)        │ C/R │
  └─────────────────────────────────────────────┴─────┘
```

| 값 | 의미 |
|---|---|
| `0x00` | 미할당 (설치 직후 / address assignment 직전 상태) |
| `0x01 ~ 0xFE` | Secondary device 할당 주소 |
| `0xFF` | All-stations broadcast (스캔 시 사용) |

- **C/R bit** (bit 0): 0 = Command(Primary→Secondary), 1 = Response(Secondary→Primary)
- Secondary는 자신의 주소와 일치하지 않으면 프레임 전체 무시

#### C. Control (1 byte) — 프레임 타입 식별

| 타입 | 비트 패턴 (LSB 우측) | 용도 | AISG에서 |
|---|---|---|---|
| **I-frame** (Information) | `0  N(S) P/F  N(R)` | 데이터 송신 + 시퀀스 관리 | Elementary Procedure 명령/응답 운반 |
| **S-frame** (Supervisory) | `1 0 SS  P/F  N(R)` | 흐름 제어 (ACK/REJ/RNR) | 응답·재전송 요청 |
| **U-frame** (Unnumbered) | `1 1 MM  P/F  MMM` | 링크 제어 (연결/해제/리셋) | SNRM, UA, DM, DISC, FRMR |

**I-frame 상세 (가장 많이 쓰임)**

```
  bit 7   bit 6   bit 5   bit 4   bit 3   bit 2   bit 1   bit 0
  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
  │       N(R) 송신 윈도우 ack │ P/F │       N(S) 송신 시퀀스 │ 0 │
  └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

- **N(S)** (Send Sequence): 이 프레임의 일련번호 0~7 (Mod-8)
- **N(R)** (Receive Sequence): 다음에 받을 것으로 기대하는 N(S) → 누적 ACK
- **P/F** (Poll/Final): Primary가 보내면 P=1(응답 요구), Secondary가 보내면 F=1(이 프레임이 응답 마지막)

**주요 S-frame 종류**

| Code (SS) | 약어 | 풀이 | 의미 |
|---|---|---|---|
| `00` | **RR** | Receive Ready | "N(R)까지 받았음, 다음 보내라" |
| `01` | **REJ** | Reject | "N(R)부터 재전송 요청" (Go-Back-N) |
| `10` | **RNR** | Receive Not Ready | "수신 버퍼 부족, 잠시 대기" |
| `11` | **SREJ** | Selective Reject | (옵션 — AISG 기본에서는 미사용) |

**주요 U-frame 종류**

| 약어 | 풀이 | 의미 |
|---|---|---|
| **SNRM** | Set Normal Response Mode | Primary → Secondary: NRM 모드 진입 |
| **UA** | Unnumbered Acknowledgement | SNRM/DISC에 대한 긍정 응답 |
| **DM** | Disconnected Mode | Secondary가 disconnected 상태임을 통지 |
| **DISC** | Disconnect | 링크 해제 요청 |
| **FRMR** | Frame Reject | 복구 불가 오류 보고 (잘못된 제어 필드 등) |

#### D. Information (가변, 0 ~ N octets)

- AISG 기본: **N = 78 octets** (모든 Secondary가 의무 지원해야 하는 최소 크기)
- I-frame의 경우 Application Layer 명령/응답 데이터가 들어감
- S-frame은 보통 Information 필드 없음
- U-frame은 종류에 따라 옵션

**AISG Information 페이로드 패턴**:
```
  ┌─────────────┬──────────────┬──────────────────┐
  │ CommandCode │ SequenceNum  │  명령별 파라미터  │
  │   (1 byte)  │   (1 byte)   │   (가변)         │
  └─────────────┴──────────────┴──────────────────┘
```

#### E. FCS — Frame Check Sequence (2 bytes)

- **알고리즘**: CRC-CCITT 16-bit (= CRC-16-X.25)
- **생성 다항식**: `x^16 + x^12 + x^5 + 1` = `0x1021`
- **초기값**: `0xFFFF`
- **결과 처리**: 1의 보수(complement) → 송신
- **수신 측 잔여값**: `0xF0B8` (전체를 CRC 돌리면 이 값이 나오면 오류 없음)
- **계산 대상**: Address + Control + Information (Flag와 FCS 자신은 제외)
- **검출 능력**:
  - 모든 단일 비트 오류
  - 모든 2-비트 오류 (FCS 길이 ≤ 32,767 bit 이내)
  - 홀수 개 비트 오류
  - 16비트 이하 길이의 모든 burst error

#### F. 종료 Flag (1 byte)

- 시작 Flag와 동일 패턴 `0x7E`
- 다음 프레임이 즉시 이어지면 그 프레임의 시작 Flag로 재사용 가능 (back-to-back)

---

## 3. 비트 스터핑 (Bit Stuffing) 상세

### 3.1 동작 원리

송신 측:
```
  데이터 영역에서 연속된 '1'이 5개 발견되면 →
  바로 뒤에 '0' 비트를 강제로 삽입한다.
```

수신 측:
```
  연속 '1' 5개 다음의 '0' 비트는 제거(de-stuffing)한다.
  → 만약 5개 '1' 다음에 '0'이 와야 할 자리에 '1'이 또 있으면 = Flag(6개 '1') 후보.
```

### 3.2 예시 — 스터핑 적용

원본 데이터 (예: 명령 코드 `0xFE` = `1111 1110`):

```
  원본:           1 1 1 1 1 1 1 0
                  └──── 7개 연속 1 ────┘
  스터핑 후 (송신): 1 1 1 1 1 0 1 1 0
                  └─5개─┘ └─2개─┘
                         ↑
                  강제 0 삽입
```

수신 측은 5개 1 뒤의 0을 제거해서 원본 복원.

### 3.3 구현 시 주의점

| 항목 | 주의 |
|---|---|
| **적용 영역** | Flag와 Flag 사이의 **모든 비트** (Address + Control + Info + FCS) |
| **Flag는 제외** | Flag 자체는 6개 연속 1을 포함 — 스터핑하면 안 됨 |
| **FCS 계산 전후** | CRC는 **스터핑 전** 원본 데이터로 계산 → 계산 끝난 FCS도 스터핑 대상 |
| **bit 단위 처리** | UART/USART는 byte 단위 → bit 단위 스트림으로 변환 필요 (HDLC controller 또는 SW 시리얼라이저) |
| **abort 시퀀스** | 7개 이상 연속 '1' = abort 신호 (프레임 무효화) |
| **idle 패턴** | 15개 이상 연속 '1' = idle 회선 |

### 3.4 UTTEC 보유 경험과 매핑

| HDLC 요구 | UTTEC 보유 자산 |
|---|---|
| 비트 스터핑 SW 구현 | LoRa custom header 직접 인코더 / BLE Mesh 페이로드 마샬링 |
| 비트 스터핑 HW 가속 | STM32 USART의 SmartCard/IrDA 모드 활용 가능 (single-wire half-duplex) |
| FPGA 옵션 | CC1101 같은 외부 modem 사용 시 modem IC가 처리 |

---

## 4. CRC-CCITT 16 (FCS) 구현 디테일

### 4.1 알고리즘 의사 코드

```c
#define POLY 0x1021
#define INIT 0xFFFF

uint16_t hdlc_crc16(const uint8_t *data, size_t len) {
    uint16_t crc = INIT;
    for (size_t i = 0; i < len; i++) {
        crc ^= ((uint16_t)data[i]) << 8;
        for (int b = 0; b < 8; b++) {
            if (crc & 0x8000)
                crc = (crc << 1) ^ POLY;
            else
                crc <<= 1;
        }
    }
    return ~crc;  // 1의 보수 (HDLC 규약)
}
```

### 4.2 송신/수신 측 처리 흐름

**송신**:
1. Address + Control + Info를 직렬화
2. 위 영역으로 CRC-16 계산 → 1의 보수
3. 16-bit 결과를 **LSB-first**(LSByte 먼저, 각 byte 내부도 LSB 먼저) 송신
4. 결과 16 bits를 Information 뒤에 추가
5. 전체 영역에 비트 스터핑 적용
6. Flag로 감싸 송신

**수신**:
1. Flag 검출 → 다음 Flag까지 비트 스트림 수집
2. de-stuffing 적용
3. 마지막 16 bits를 FCS로 떼어냄
4. 받은 Address + Control + Info로 CRC 재계산
5. 받은 FCS와 비교 → 일치하면 정상 / 불일치하면 폐기 + 통계
6. 또는 전체 영역(Info + FCS)을 CRC 돌려 잔여값 `0xF0B8` 확인 방식도 사용 가능

### 4.3 검증 벡터 (구현 후 회귀 테스트용)

| 입력 (hex) | 기대 FCS (hex, post-complement) |
|---|---|
| `0xA0 0x53` | `0x07 0x37` |
| `0xA0 0x03 0xC0 0x01` | `0x07 0xE0` |
| `0xA0 0x03 0xC0 0x01 0x02 0x03 0x04` | `0xE5 0x86` |

(테스트 벡터는 ITU-T Q.921 § L.5 / RFC 1662 § C 참고. 실제 시리얼라이저의 byte/bit 순서에 따라 보정 필요.)

---

## 5. AISG HDLC 운용 시나리오

### 5.1 링크 수립 — SNRM/UA

```
Primary                        Secondary
  │ ──── SNRM (P=1) ────►       │   "NRM 모드 진입하라"
  │                              │
  │ ◄──── UA (F=1) ───── │      "수락"
  │                              │
  │ ── 이제 I-frame 교환 가능 ──   │
```

### 5.2 정상 데이터 교환 (Poll/Final)

```
Primary                        Secondary
  │ ── I[N(S)=0, N(R)=0, P=1] ►  │   "데이터 0 보냄, 응답해라"
  │                              │
  │ ◄── I[N(S)=0, N(R)=1, F=1] ─ │   "데이터 0 받았음(N(R)=1=다음기대),
  │                              │     내 데이터 0 보낸다, 응답 끝(F=1)"
  │                              │
  │ ── RR[N(R)=1, P=1] ──────►   │   "그 데이터 0 받음, 다음 polls?"
  │                              │
  │ ◄── RR[N(R)=1, F=1] ────── │     "보낼 거 없음"
```

### 5.3 오류 시나리오 — Go-Back-N 재전송

```
Primary 송신: I[N(S)=0] I[N(S)=1] I[N(S)=2]
                              ↓ FCS 오류로 손실
Secondary 응답: REJ[N(R)=1] → "1번부터 다시"
Primary 재송신: I[N(S)=1] I[N(S)=2]
```

### 5.4 타이머 / 윈도우

| 변수 | 일반값 (AISG) | 의미 |
|---|---|---|
| T1 | 1 ~ 3 초 | Primary가 응답 기다리는 시간 |
| N2 | 3 ~ 5 회 | T1 만료 시 재전송 횟수 |
| Window size | **7** (Mod-8) | 미응답 I-frame 최대 개수 |

---

## 6. AISG Application Layer ↔ HDLC 매핑

### 6.1 Elementary Procedure (EP) → I-frame Info 페이로드

예시: `ScanCommand` (Device Discovery)

```
Information 필드:
┌──────────────┬──────────────┬──────────────────┐
│ CommandCode  │ SequenceNum  │ Subunit Filter   │
│  = 0x XX     │  = 0x YY     │  = 1 byte        │
└──────────────┴──────────────┴──────────────────┘
                         ↓
        Address + Control + Info → CRC 계산
                         ↓
        Flag + Address + Control + Info + FCS + Flag
                         ↓
                 비트 스터핑 + 직렬화
                         ↓
                  RS-485 또는 OOK 송신
```

### 6.2 Return Code 응답

응답 I-frame의 Info:

```
┌──────────────┬──────────────┬──────────────────┐
│ CommandCode  │ SequenceNum  │ ReturnCode + ... │
│  (echo)      │  (echo)      │  = 1+ bytes      │
└──────────────┴──────────────┴──────────────────┘
```

전체 Return Code 표는 **Base Standard Appendix C**에 정의 (0x00 = OK, 그 외는 실패 사유).

---

## 7. 구현 아키텍처 권장안 (UTTEC 제안)

```
┌──────────────────────────────────────────────┐
│ Application Layer                            │
│ - EP dispatcher (Scan/SetTilt/GetSubunit...) │
│ - Return Code 처리                            │
└──────────────────────────────────────────────┘
                  ▲ ▼
┌──────────────────────────────────────────────┐
│ HDLC State Machine                           │
│ - SNRM / UA / Connect / Disconnect           │
│ - N(S)/N(R) 윈도우, 재전송 타이머             │
│ - Frame Type 디스패처 (I/S/U)                 │
└──────────────────────────────────────────────┘
                  ▲ ▼
┌──────────────────────────────────────────────┐
│ HDLC Frame Encoder / Decoder                 │
│ - Flag 검출 / 삽입                            │
│ - 비트 스터핑 / de-stuffing                   │
│ - CRC-16 계산 / 검증                          │
└──────────────────────────────────────────────┘
                  ▲ ▼
┌──────────────────────────────────────────────┐
│ PHY Driver                                   │
│ - RS-485: UART + DE/RE 제어                  │
│ - OOK:    MAX11947 SPI + 인터럽트            │
└──────────────────────────────────────────────┘
```

### 7.1 핵심 모듈 분리 (테스트 용이성)

| 모듈 | 단위 테스트 |
|---|---|
| `crc16.c` | 검증 벡터 (Section 4.3) |
| `stuffing.c` | 알려진 입출력 쌍으로 round-trip |
| `frame_codec.c` | encode→decode 무손실 + 손상 시 오류 검출 |
| `hdlc_sm.c` | 상태 천이 시뮬레이션 (mocked PHY) |
| `ep_dispatch.c` | 각 EP 단위 정상/실패 응답 |

### 7.2 메모리 풋프린트 예상

| 항목 | 추정 |
|---|---|
| RX 프레임 버퍼 | 256 bytes (max 78 + 마진) |
| TX 윈도우 버퍼 | 7 × 80 bytes = 560 bytes |
| 상태 머신 RAM | < 100 bytes |
| 코드 크기 (Cortex-M4 -Os) | 8~12 KB |

→ STM32G0/F0 클래스 MCU에도 충분.

---

## 8. UTTEC 보유 자산과 1:1 매핑 (재확인)

| HDLC 요구 | UTTEC 직접 구현 경험 | 즉시 활용성 |
|---|---|---|
| **CRC-16 계산** | Modbus RTU 컴프레서 컨트롤러 (KC 인증 양산) | 100% — 동일 다항식 0x1021 ≠ Modbus(0xA001)지만 코드 구조 동일 |
| **프레임 파서** (Flag→Addr→Ctrl→Info) | Modbus RTU + EtherCAT + LoRa 헤더 | 패턴 100% 동일 |
| **비트 스터핑** | LoRa 커스텀 페이로드 인코딩 | 동일 |
| **상태 머신** (SNRM/UA/I-frame) | BLE Mesh provisioning 상태머신 | 더 복잡한 케이스 경험 보유 |
| **재전송 타이머** | LoRa ACK / BLE Mesh segment ACK | 동일 |
| **시퀀스 윈도우** | EtherCAT cyclic frame counter / BLE Mesh seq | 동일 |
| **반이중 RS-485 제어** | Modbus RTU (DE/RE GPIO + UART IDLE 인터럽트) | 동일 |
| **OOK 변조** | CC1101 447.925 MHz Replay (2026-05) | 주파수만 2.176 MHz로 변경 |
| **다중 슬레이브 polling** | BLE Mesh 3,800대 스캔 운영 | 더 큰 규모 경험 |

---

## 9. 흔한 함정 & 회피 전략

| 함정 | 증상 | 회피 |
|---|---|---|
| **bit/byte 순서 혼동** | CRC 항상 불일치 | LSB-first 송신 명시, 시뮬레이터로 비트 단위 검증 |
| **스터핑 누락** | 데이터가 Flag로 보임 → 프레임 조기 종료 | de-stuffing 단위테스트 + 의도적 0x7E 포함 케이스 |
| **FCS 1의 보수 누락** | 모든 프레임 reject | RFC 1662 검증 벡터로 단위 테스트 |
| **Polling/Final 오용** | Secondary가 응답 안 함 | 상태머신에서 P/F 비트 명시적 처리 |
| **반이중 회선 충돌** | 마스터 송신 중 DE 미해제 | DE/RE 제어 ISR + TX EMPTY 인터럽트 |
| **시퀀스 wrap-around** | Mod-8 경계에서 멈춤 | 모듈러 산술 + 윈도우 boundary 테스트 |
| **Receive Window 미관리** | RNR 미발행 → 버퍼 오버플로 | High-water mark에서 RNR 발행 |
| **Address 0x00 처리 누락** | 신규 디바이스 인식 안 됨 | Address Assignment EP 우선 구현 |

---

## 10. 미팅 Q&A Cheat Sheet — HDLC 직격 질문 대비

**Q: HDLC 구현 경험 있으신가요?**
> 표준 HDLC 자체는 이번 AISG가 첫 직접 구현입니다. 다만 **Modbus RTU**(같은 CRC-16, 반이중 RS-485, 마스터-슬레이브, 시리얼 프레임 파서)를 KC 인증 양산 제품에 적용한 경험이 있고, BLE Mesh의 segmented PDU 파서·LoRa의 비트 단위 인코딩·EtherCAT 프레임도 직접 다뤘습니다. HDLC는 이들의 **상위 집합**이라기보다 **표준화된 정형**이기 때문에, 첫 sprint 내에 인코더/디코더 + CRC 검증 + 스터핑까지 동작 가능합니다.

**Q: 비트 스터핑은 SW로 처리하시나요 HW로 처리하시나요?**
> 1차는 **SW 구현 + STM32 USART의 byte 모드**를 권장드립니다. 디버깅 가시성과 검증 벡터 적용이 쉬워서 인증·IOT 통과까지 빠릅니다. 양산 단계에서 CPU 부하가 문제가 되면 **STM32 USART의 single-wire/SmartCard 모드** 또는 외부 modem IC(MAX11947)가 비트 단위를 떠맡는 방식으로 옮길 수 있습니다.

**Q: CRC가 안 맞을 때 어떻게 디버깅하시나요?**
> 우선 **로지컬 어널라이저(Saleae)**로 RS-485 라인을 캡처해서 비트 단위로 스터핑 정합성부터 확인합니다. 그 다음 RFC 1662 §C 또는 ITU-T Q.921의 검증 벡터를 단위 테스트에 박아두고 CRC 함수 자체의 동작을 확인합니다. 보통 문제는 ① bit/byte 순서, ② 1의 보수 누락, ③ FCS 영역 자기 자신 포함 중 하나에서 옵니다.

**Q: I-frame과 S-frame의 시퀀스 관리는 어떻게?**
> Mod-8 N(S)/N(R) 윈도우(window size 7)를 상태머신에서 관리합니다. BLE Mesh의 segment ACK 패턴과 거의 동일해서, 재전송 타이머(T1=1~3초)와 N2(재시도 3~5회)도 동일 패턴으로 구현합니다. Go-Back-N(REJ) 우선 구현, SREJ는 v3.0에서 요구되지 않아 후순위.

**Q: 다중 슬레이브 polling 시 충돌은?**
> Address 필드로 명시적 어드레싱 + Primary가 P=1 polling으로 송신 권한을 1대씩 부여하므로 충돌 가능성 자체가 closed. Multi-Primary(v3.0 신기능)에서는 subunit 단위 access right + transaction ID + mutex로 직렬화합니다. BLE Mesh 3,800대 동시 운영에서 검증된 mutex 패턴 그대로 재사용.

**Q: AISG HDLC와 일반 PPP HDLC의 차이는?**
> PPP HDLC-like framing(RFC 1662)은 ABM 비슷한 peer-to-peer 모드라 윈도우·polling 개념이 없고, **AISG는 NRM(polling 기반)**입니다. 또한 PPP는 escape 문자(0x7D)로 0x7E를 치환하는 byte-stuffing을 쓰는 반면, **AISG는 정통 bit-stuffing**을 사용합니다. CRC는 둘 다 CCITT-16으로 동일.

---

## 11. 참고 문헌

| 문서 | 용도 |
|---|---|
| ISO/IEC 13239:2002 | HDLC 표준 본문 |
| ITU-T Recommendation Q.921 | LAPD (HDLC 변형) — 검증 벡터 출처 |
| RFC 1662 (1994) | PPP HDLC-like framing — 검증 벡터 출처 |
| 3GPP TS 25.462 | AISG signalling transport (L2 매핑) |
| AISG Base Standard v3.0.x.x | AISG 측 HDLC 클래스 명시 (UNC1,15.1 TWA) |
| Tanenbaum, "Computer Networks" 5/e Ch.3 | HDLC 동작 원리 교과서적 설명 |

---

## 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-13 |
| 작성 목적 | 위시캣 #155057 미팅 — HDLC 직격 질문 대응 |
| 출처 | AISG Base Standard / ISO 13239 / ITU-T Q.921 / RFC 1662 / 3GPP TS 25.462 |
| 관련 자료 | `5_OOK_2.176MHz_BiasT_상세.md` (PHY) / 상위 `AISG자료/01_AISG_3.0_상세_spec.md` § 4 (요약) |
| 핵심 메시지 | HDLC는 표준 정형(UNC1,15.1 TWA) → UTTEC의 Modbus RTU/BLE Mesh/LoRa/EtherCAT 4종 자산을 첫 sprint에 그대로 매핑 |
