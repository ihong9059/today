# REVITA 통신 프로토콜 정의서

**문서 버전**: v0.2
**작성일**: 2026-04-06
**대상 시스템**: REVITA 필지 모니터링/관수 제어 시스템

---

## 1. 시스템 개요

### 1.1 구성 블록

```
 [서버]                 [리비타 타워]                        [리비타 링크]

┌────────┐                                                   ┌──────────────────┐
│ MQTT   │    LTE/MQTT    ┌────────┐                         │                  │
│ Broker │◄──────────────►│  LTE   │                         │  ┌────────────┐  │
└────┬───┘                │  Modem │                         │  │            │  │
     │                    └─┬────┬─┘                         │  │    MCU     │  │
┌────▼───┐              USB0│    │UART1                      │  │ (RAK4630)  │  │
│ MQTT   │                  │    │                           │  │            │  │
│Manager │              ┌───▼─┐  │                           │  └─┬────────┬─┘  │
└────┬───┘              │     │  │                           │    │UART1   │    │
     │ SQL              │ SBC │  │                           │    │(RS485) │DIO │
┌────▼───┐              │     │  │                           │    │        │GPIO│
│  DB    │              └──┬──┘  │                           │    │        │    │
└────────┘              ETH│     │                           │ ┌──▼───┐  ┌─▼──┐ │
                     ┌─────▼┐    │                           │ │RS485 │  │관수│ │
                     │ CCTV │    │                           │ │ Bus  │  │제어│ │
                     └──────┘    │                           │ └─┬──┬─┘  │포트│ │
                                 │                           │   │  │    └─┬──┘ │
                              ┌──▼──────┐                    │ ┌─▼─┐┌─▼─┐  │    │
                              │   MCU   │          LoRa      │ │토양││엽온│  │    │
                              │(RAK4630)│◄──────────────────►│ │센서││센서│  │    │
                              └──┬──────┘          (AES-128)  │ └───┘└───┘ │    │
                                 │UART0                       │            │    │
                              ┌──▼──────┐                     │      ┌─────┴──┐ │
                              │UART MUX │                     │      │관수모터│ │
                              └──┬──────┘                     │      │ (ON/OFF)│
                                 │RS485                       │      └────────┘ │
                           ┌─────┴────┐                       │      ┌────────┐ │
                           │          │                       │      │ 유량계  │ │
                        ┌──▼──┐   ┌───▼─┐                     │      │(pulse) │ │
                        │조도 │   │카메라│                     │      └────────┘ │
                        │센서 │   │센서 │                     └──────────────────┘
                        └─────┘   └─────┘
```

### 1.2 통신 경로 일람

| # | 구간 | 물리 계층 | 프로토콜 | 본 문서 |
|---|------|----------|---------|:------:|
| 1 | Server ↔ Tower LTE | LTE | MQTT/TCP | §3 |
| 2 | Tower LTE ↔ SBC | USB0 (CDC) | AT / PPP (SBC가 데이터 경로) | §4.1 |
| 3 | Tower LTE ↔ MCU | UART1 | AT command | §4.2 |
| 4 | Tower SBC ↔ MCU | USB1 | *(추후 정리)* | — |
| 5 | Tower MCU ↔ UART MUX ↔ RS485 | UART0 + RS485 | Modbus RTU | §4.3 |
| 6 | Tower ↔ Link | LoRa (SX1262) | **RVT-LoRa v1** (16B/AES-128) | §5 |
| 7 | Link MCU ↔ RS485 센서 (토양/엽온) | UART1 + RS485 | Modbus RTU | §6.1 |
| 8 | Link MCU ↔ 관수 모터 | GPIO (3선식) | 단순 ON/OFF 제어 | §6.2 |
| 9 | Link MCU ↔ 유량계 | DIO (pulse input) | Edge counting | §6.3 |

---

## 2. 설계 원칙

1. **LoRa 16 byte 고정**: 모든 LoRa 프레임은 AES-128 단일 블록(=16 byte)에 들어가도록 설계한다. 프레임 분할/연결 금지.
2. **AES-128 암호화**: 사전 공유 키 방식(PSK). 암호문 자체가 프레임이 되므로 패딩/오버헤드 없음.
3. **계층 일관성**: Server의 논리 명령(JSON `cmd`)과 LoRa opcode(1B)는 1:1 매핑 테이블을 가진다.
4. **Idempotent 명령**: `SEQ` 기반 중복 제거로 재전송 안전성 보장.
5. **Tower는 게이트웨이**: MCU는 MQTT↔LoRa, MQTT↔Modbus 변환만 수행.
6. **저전력/듀티**: KR ISM 1 % 듀티 사이클 내에서 동작.

---

## 3. MQTT 프로토콜 (Server ↔ Tower)

### 3.1 Broker 연결

| 항목 | 값 |
|------|-----|
| Transport | LTE TCP (운용 TLS 1.2 / 포트 8883, 개발 1883) |
| QoS | 명령 downlink: **1**, 텔레메트리 uplink: **1** |
| Keep-alive | 120 s |
| Clean session | False |
| Last-will | `revita/tower/<tower_id>/status` = `offline`, retained |

### 3.2 토픽 네임스페이스

```
revita/
├── tower/<tower_id>/
│   ├── status                   # uplink  : online/offline (retained)
│   ├── telemetry/sensors        # uplink  : Tower 직결 RS485 센서 (조도, 카메라)
│   ├── telemetry/system         # uplink  : Tower 자체 상태 (RSSI, uptime)
│   ├── event                    # uplink  : 이벤트/경보
│   ├── cmd                      # downlink: Tower 명령
│   └── cmd/ack                  # uplink  : 명령 ACK
└── link/<tower_id>/<link_id>/
    ├── status                   # uplink  : 링크 상태 (마지막 수신 시각, RSSI)
    ├── telemetry                # uplink  : Link 센서값 (Tower가 LoRa→JSON 변환)
    ├── event                    # uplink  : Link 이벤트/경보
    ├── cmd                      # downlink: Link 명령 (Tower가 JSON→LoRa 변환)
    └── cmd/ack                  # uplink  : ACK
```

- `<tower_id>`: Tower MCU의 `DeviceID` 8 hex 자리 (예: `A1B2C3D4`)
- `<link_id>`: 1 byte hex (01..FE)

### 3.3 페이로드 포맷 (JSON)

**공통 필드**
```json
{ "ts": 1775808000, "seq": 1234, "v": 1 }
```

**telemetry/sensors** (Tower 직결)
```json
{
  "ts": 1775808000, "seq": 1234, "v": 1,
  "illum_lux": 32100,
  "cam_health": "ok"
}
```

**link/<.>/telemetry** (Tower가 LoRa → JSON 변환)
```json
{
  "ts": 1775808000, "seq": 42, "v": 1,
  "rssi": -97, "snr": 9,
  "batt_mv": 4021,
  "soil_temp_c": 17.4,
  "soil_moist_pct": 38,
  "leaf_temp_c": 22.1,
  "flow_count": 1523,
  "valve_state": "closed",
  "pump_state": "off",
  "err_mask": 0
}
```

**cmd**
```json
{
  "ts": 1775808000, "req_id": "e7c3-42", "v": 1,
  "cmd": "VALVE_SET",
  "args": { "state": "open", "duration_s": 600 }
}
```

**cmd/ack**
```json
{
  "req_id": "e7c3-42",
  "result": "ok",            // ok | err | timeout | unreachable
  "err_code": 0,
  "ts": 1775808005
}
```

### 3.4 논리 명령 테이블

| `cmd` | 대상 | 설명 | 인자 |
|-------|------|------|------|
| `PING` | Tower/Link | 생존 확인 | - |
| `GET_STATE` | Tower/Link | 즉시 상태 보고 | - |
| `SET_PERIOD` | Tower/Link | 텔레메트리 주기 변경 | `{"period_s":N}` |
| `VALVE_SET` | Link | 관수 밸브 | `{"state":"open\|close","duration_s":N}` |
| `PUMP_SET` | Link | 관수 모터 | `{"state":"on\|off","duration_s":N}` |
| `FLOW_RESET` | Link | 유량계 카운터 리셋 | - |
| `REBOOT` | Tower/Link | 재시작 | `{"after_s":N}` |

---

## 4. Tower 내부 프로토콜

### 4.1 LTE ↔ SBC (USB0)

- 물리: USB CDC (SBC Linux 기준 `/dev/ttyACMx`)
- 용도: 고대역 데이터 경로 (영상, 대용량 전송). SBC가 AT command로 PPP/데이터 세션을 올림.
- 본 문서 범위 밖 (Linux 측 구현).

### 4.2 LTE ↔ MCU (UART1, AT command)

- **라인**: RAK4631 UART1 (P0.16 TX / P0.15 RX), **115200bps 8N1**, 흐름 제어 없음
- **전원/리셋**: `LTE_RST_N`은 MCP23017 GPA0 (Active Low 500 ms 펄스)
- **프레임**: Sierra Wireless RC76xx AT 스펙. CR/LF 종단, 종결자 `OK` / `ERROR` / `+CME ERROR:` / `+CMS ERROR:`
- **송신 규칙**
  1. 한 번에 하나의 AT 명령만 전송 (non-pipelined).
  2. 응답 또는 타임아웃까지 블로킹.
  3. URC(`+CREG:`, `+CSQ:` 등)는 RX 인터럽트 ring buffer에서 URC 파서가 별도 처리.
- **타임아웃**: 기본 2 s, 네트워크 명령 30 s, `AT+COPS=?` 는 180 s
- **주기 감시**
  ```
  15 s   : AT , AT+CSQ , AT+CREG? , AT+CGATT?
  5 min  : AT+COPS? , AT+CGDCONT?
  ```
- **에러 복구**: `AT` 무응답 3회 연속 시 `LTE_RST_N` 펄스 → 재초기화

MCU는 LTE 상태 모니터링을 담당하고, 실제 데이터 경로(MQTT)는 SBC가 처리한다.
MCU 자체가 MQTT 클라이언트가 되는 경우(SBC 전원 OFF 시)에는 `+KTCPCFG` / `+KMQTT*` 명령 세트를 사용한다.

### 4.3 MCU ↔ UART MUX ↔ RS485 (UART0, Modbus RTU)

- **라인**: RAK4631 UART0, **9600bps 8N1** (센서 기본)
- **RS485 방향 제어**: DE/RE#는 MCP23017 핀 (Tower 보드 정의 참조)
- **MUX 제어** (MCP23017):
  - `GPA3 = MUX_SEL`  (0: MCU, 1: SBC)
  - `GPA4 = MUX_EN#`  (0: enable, 1: disable)
  - 소유권 교체 절차: TX flush → `MUX_EN#=1` → `MUX_SEL` 토글 → `MUX_EN#=0` → 1 ms 안정화
- **프레임**: 표준 Modbus RTU (ADDR(1) + FUNC(1) + DATA + CRC16(2)), 3.5 char inter-frame gap
- **슬레이브 맵** (예시, 실 센서 데이터시트 확정 후 고정)

  | Slave ID | 디바이스 | 레지스터 | 값 |
  |----------|---------|---------|-----|
  | 0x10 | 조도 센서 | IR 0x0000 | lux × 10 (u16) |
  | 0x11 | 카메라/분광 | HR 0x0000..0x000F | health, fps, err_code |

- **폴링 주기**: 조도 30 s, 카메라 상태 60 s
- **타임아웃**: 응답 300 ms, 3회 실패 시 `event` 업링크 (`sensor_unreachable`)

---

## 5. LoRa 프로토콜 — **RVT-LoRa v1**

Tower MCU ↔ Link MCU 간 유일한 무선 프로토콜.
**PHY payload = 16 byte 고정**, **AES-128 암호화 (단일 블록)**.

### 5.1 물리 / MAC 파라미터

| 항목 | 값 |
|------|-----|
| Radio | Semtech SX1262 (RAK4631 내장) |
| Region | KR 920~923 MHz |
| Frequency | **922.1 MHz** |
| Bandwidth | 125 kHz |
| Spreading Factor | **SF9** 운용 / SF12 fallback |
| Coding Rate | 4/6 |
| TX Power | 14 dBm |
| Preamble | 8 symbol |
| Sync word | Private 0x12 |
| PHY header | Explicit |
| PHY CRC | Enabled (SX1262 내장) |
| **Payload** | **16 byte 고정** (AES-128 블록 1개) |
| Duty cycle | ≤ 1 % (KR 규제) |

SF9 / 16 byte / BW125 기준 airtime 약 **113 ms** → Tower/Link 각 슬롯 1회 송신 후 ≥ 11 s 휴식으로 듀티 유지.

### 5.2 프레임 구조 (평문 16 byte)

AES-128 ECB로 1 블록 암호화. 암호문이 그대로 PHY payload.

```
 Byte   0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
      +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
      |DST |SRC | FC |SEQ | OP |                 DATA (10 byte)                 |CRC16|
      +----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
```

| 오프셋 | 필드 | 크기 | 설명 |
|:------:|------|:----:|------|
| 0 | DST | 1 | 목적지 node id (Tower=0x00, Link=0x01..0xFE, Broadcast=0xFF) |
| 1 | SRC | 1 | 송신자 node id |
| 2 | FC | 1 | Frame Control (§5.3) |
| 3 | SEQ | 1 | 송신자별 단조 증가 (0..255 wrap) |
| 4 | OP | 1 | Opcode (§5.5) |
| 5-14 | DATA | 10 | Opcode별 구조체 (부족한 필드는 0 패딩) |
| 15 | CRC16 | 2* | CCITT (poly 0x1021, init 0xFFFF), 평문 byte 0-13에 대해 계산 |

\* CRC16은 2 byte이므로 실제 레이아웃은 `[0..13]` + `CRC16[14..15]`, 합 **16 byte**.

**CRC16의 역할**: 복호화 무결성 검증. (키가 다르면 복호 결과가 깨져 CRC가 거의 확실히 실패 → 기본 인증 효과. 강한 메시지 인증은 §5.8 참조.)

### 5.3 Frame Control (FC) 바이트

```
 bit  7    6    5    4    3    2    1    0
     +----+----+----+----+----+----+----+----+
     |  TYPE   | ACK| REQ|   PRI   |  RSVD   |
     +----+----+----+----+----+----+----+----+
```

| bits | 필드 | 값 |
|:----:|------|----|
| 7:6 | TYPE | 00=DATA, 01=CMD, 10=RSP, 11=BEACON |
| 5 | ACK | 1이면 이 프레임이 ACK |
| 4 | REQ | 1이면 ACK 요구 |
| 3:2 | PRI | 00=low, 01=normal, 10=high, 11=critical |
| 1:0 | RSVD | 0 |

### 5.4 재전송 / ACK

- `REQ=1`로 송신 후 **1.5 s** 내 동일 (SRC↔DST 역전, SEQ 일치) ACK 미수신 시 최대 **3회** 재전송.
- 수신측은 최근 (SRC, SEQ) 쌍 **8개** 를 기억해 중복을 버린다.
- ACK 프레임: `FC.ACK=1`, `OP=OP_ACK`, DATA[0]=status, DATA[1]=원본 opcode, 나머지 0.

### 5.5 Opcode 테이블

| Op | 이름 | 방향 | 설명 | DATA(10B) 요약 |
|----|------|:----:|------|----------------|
| 0x01 | OP_PING | T↔L | 생존 확인 | 0 |
| 0x02 | OP_PONG | T↔L | PING 응답 | uptime_s(u32) |
| 0x03 | OP_BEACON | T→* | Tower 비콘 / 시간 동기 | epoch_s(u32), period_s(u16), flags(u8) |
| 0x04 | OP_JOIN_REQ | L→T | 조인 요청 | dev_id[8] (FICR 앞 8B) |
| 0x05 | OP_JOIN_ACK | T→L | 주소 할당 | link_id(1), period_s(u2), flags(1) |
| 0x10 | OP_ACK | T↔L | ACK/NACK | status(1), req_op(1) |
| 0x20 | OP_TELEMETRY | L→T | 주기 보고 | §5.6 (10 B 가득) |
| 0x21 | OP_EVENT | L→T | 이벤트/경보 | code(1), ctx(≤9) |
| 0x30 | OP_GET_STATE | T→L | 즉시 상태 요청 | 0 |
| 0x31 | OP_STATE | L→T | 상태 응답 | §5.6 (텔레메트리와 동일 포맷) |
| 0x40 | OP_VALVE_SET | T→L | 밸브 제어 | state(1), duration_s(u16) |
| 0x41 | OP_PUMP_SET | T→L | 관수 모터 | state(1), duration_s(u16) |
| 0x42 | OP_SET_PERIOD | T→L | 주기 변경 | period_s(u16) |
| 0x43 | OP_FLOW_RESET | T→L | 유량 카운터 리셋 | 0 |
| 0x50 | OP_REBOOT | T→L | 재시작 | after_s(u16) |

**OTA 펌웨어 업데이트**는 16 byte 프레임으로는 비현실적이므로 **LTE 경로(SBC)** 에서 직접 수행하거나 별도 인라인 모드(추후 정의)를 사용한다.

### 5.6 OP_TELEMETRY DATA 구조 (정확히 10 byte)

```c
struct rvt_telemetry {
    uint16_t batt_mv;          // 2B : 배터리 전압 mV (0~65535)
    int16_t  soil_temp_cx10;   // 2B : 토양 온도 ×10 ℃ (-3276.8~3276.7)
    uint8_t  soil_moist_pct;   // 1B : 토양 수분 % (0~100)
    int16_t  leaf_temp_cx10;   // 2B : 엽온 ×10 ℃
    uint16_t flow_count;       // 2B : 유량계 누적 펄스 (wrap 0~65535)
    uint8_t  state;            // 1B : bit0=valve(1=open), bit1=pump(1=on),
                               //      bit2-4=err_mask (b2=soil,b3=leaf,b4=flow),
                               //      bit5-7=reserved
};                             // = 10 B
```

### 5.7 시간 동기 / 스케줄

- Tower는 **60 s** 주기로 `OP_BEACON` broadcast (ACK 불필요).
- Link는 자신의 텔레메트리를 `beacon + (link_id × 2 s)` 오프셋에 송신하여 충돌을 피한다 (TDMA-lite).
- 기본 텔레메트리 주기 **5 분** (`OP_SET_PERIOD`로 변경 가능).
- Link는 송신 슬롯 외에는 RX 상태(저전력 SLEEP 모드에서 BEACON 시점만 깨우는 정책 가능).

### 5.8 보안 — AES-128

| 항목 | 값 |
|------|-----|
| 알고리즘 | **AES-128 ECB (single block)** |
| 키 길이 | 128 bit (16 byte) |
| 키 관리 | 공장 프로비저닝 시 Tower/Link 모두에 동일 PSK 주입 |
| 저장 위치 | MCU 내부 플래시 보호 영역 (UICR or Secure partition) |
| IV / Nonce | **없음** (1 블록이므로 불필요) |
| 인증 | CRC16 + SEQ 기반 간이 인증 |

**송신 (Tower / Link 공통)**
```
plain[16]  = build_frame(DST,SRC,FC,SEQ,OP,DATA)  // CRC16 포함
cipher[16] = AES128_ENCRYPT(key, plain)
lora_tx(cipher)
```

**수신**
```
cipher[16] = lora_rx()
plain[16]  = AES128_DECRYPT(key, cipher)
if (crc16(plain[0..13]) != plain[14..15]) drop;
if (plain[DST] != self_id && plain[DST] != 0xFF) drop;
if (dup_check(plain[SRC], plain[SEQ])) drop;
dispatch(plain[OP], plain[5..14]);
```

**ECB 사용 근거**: 페이로드가 정확히 1 블록(16 B)이므로 CBC/CTR의 체이닝/IV가 의미가 없다. 동일 평문 → 동일 암호문이 되는 ECB의 약점은 `SEQ` 증가 및 `ts`/카운터 변동으로 거의 해소되지만, 완전히 피하려면 v1.1에서 **AES-128-CTR (nonce = SRC‖SEQ‖pad)** 로 전환한다.

**보안 한계 및 v1.1 개선**
- v1.0은 **수동 도청 방지**와 **명령 위조 방지(CRC+SEQ 의존)** 수준. 적극적 공격자 대비 보호는 약하다.
- v1.1: AES-128-CTR + AES-CMAC 짧은 MIC(2~4 byte)를 DATA 영역 일부로 통합하는 옵션 검토.

---

## 6. Link 내부 I/O

### 6.1 Link MCU ↔ 토양/엽온 센서 (UART1 + RS485, Modbus RTU)

- **라인**: RAK4631 UART1, **9600bps 8N1** (센서 기본)
- **프레임**: 표준 Modbus RTU
- **슬레이브 맵**

  | Slave ID | 디바이스 | 레지스터 | 값 |
  |----------|---------|---------|-----|
  | 0x21 | 토양 센서 | IR 0x0000 | temp ×10 ℃ (int16) |
  | 0x21 | 토양 센서 | IR 0x0001 | moisture % (u16) |
  | 0x22 | 엽온 센서 | IR 0x0000 | leaf_temp ×10 ℃ (int16) |

- **폴링 주기**: 텔레메트리 주기 −5 s (즉 LoRa 송신 직전에 최신값 수집)
- **타임아웃**: 300 ms, 3회 실패 시 state.err_mask 해당 비트 세팅

### 6.2 Link MCU ↔ 관수 모터 (GPIO 3선식)

- **신호**: GPIO 출력 (보드에서 할당, 예: P0.xx)
  - `PUMP_EN`  : HIGH=ON, LOW=OFF
  - (선택) `PUMP_DIR` 또는 `PUMP_COM` : 3선식 중 COM
- **제어 흐름**
  1. `OP_PUMP_SET` 수신 (state, duration_s)
  2. `state=1` → `PUMP_EN=HIGH`, 타이머 `duration_s` 시작
  3. 타이머 만료 또는 `state=0` 수신 → `PUMP_EN=LOW`
  4. 제어 결과는 다음 텔레메트리 `state.bit1`로 반영
- **안전 타임아웃**: `duration_s=0` 일 때 기본 **최대 2시간** 하드 리밋 (runaway 방지)
- **프로토콜 오버헤드 없음** — 순수 GPIO 레벨 제어

### 6.3 Link MCU ↔ 유량계 (DIO pulse 카운트)

- **신호**: DIO 입력 1개 (edge-triggered interrupt)
- **카운트 동작**
  - GPIOTE 인터럽트 핸들러에서 매 rising edge마다 `flow_count` 증가 (u16, wrap)
  - chattering 방지: 디바운스 5 ms (HW RC + SW re-check)
- **리셋**: `OP_FLOW_RESET` 수신 시 `flow_count = 0`
- **단위 환산**: 물리 유량은 서버 측에서 `pulse × K (L/pulse)` 로 환산 (센서 사양 K값은 서버 DB 저장)
- **프로토콜 오버헤드 없음**

---

## 7. MQTT ↔ LoRa 매핑 (Tower 게이트웨이)

### 7.1 Downlink (MQTT → LoRa)

| MQTT `cmd` | LoRa OP | DATA 변환 |
|-----------|:-------:|----------|
| `PING` | 0x01 | - |
| `GET_STATE` | 0x30 | - |
| `SET_PERIOD` | 0x42 | period_s |
| `VALVE_SET` | 0x40 | state(open=1,close=0), duration_s |
| `PUMP_SET` | 0x41 | state(on=1,off=0), duration_s |
| `FLOW_RESET` | 0x43 | - |
| `REBOOT` | 0x50 | after_s |

### 7.2 Uplink (LoRa → MQTT)

| LoRa OP | MQTT 토픽 |
|:-------:|-----------|
| 0x20 OP_TELEMETRY | `link/<tower>/<link>/telemetry` |
| 0x31 OP_STATE | `link/<tower>/<link>/telemetry` (즉시 보고 플래그) |
| 0x21 OP_EVENT | `link/<tower>/<link>/event` |
| 0x10 OP_ACK | `link/<tower>/<link>/cmd/ack` |

Tower는 `(req_id ↔ (link_id, lora_seq))` 매핑을 유지하고, ACK 수신 또는 3회 재전송 실패 시 `cmd/ack` 를 MQTT로 업링크한다. 실패 시 `result = "unreachable"`.

---

## 8. 오류 코드

| 코드 | 이름 | 설명 |
|:----:|------|------|
| 0 | OK | 성공 |
| 1 | ERR_BAD_CRC | CRC 불일치 (복호 실패/키 불일치 포함) |
| 2 | ERR_BAD_VER | 버전 불일치 |
| 3 | ERR_UNKNOWN_OPCODE | 미지원 opcode |
| 4 | ERR_BAD_PARAM | 파라미터 오류 |
| 5 | ERR_BUSY | 이전 명령 처리 중 |
| 6 | ERR_TIMEOUT | 타임아웃 |
| 7 | ERR_UNREACHABLE | LoRa 재전송 모두 실패 |
| 8 | ERR_NOT_JOINED | Link 미조인 |
| 9 | ERR_HW | 하드웨어 오류 (센서/밸브/펌프) |

---

## 9. 버전 관리 / 호환성

- LoRa 프레임에 명시적 VER 필드는 없음 (16 B 제약). 대신 `FC.PRI` 의 최상위 비트를 미래에 버전 플래그로 확장 가능.
- 현재 버전: **RVT-LoRa v1.0**, **RVT-MQTT v1**
- **키 교체 정책**: 키 변경 시 모든 Tower/Link가 동시 재프로비저닝 필요 (fleet-wide). 점진 교체를 위해 MCU에 `key_id` 1 byte + 현재/이전 2슬롯 키 저장은 v1.1에서 검토.

---

## 10. 추후 결정 사항

- [ ] Tower SBC ↔ MCU (USB1) 프로토콜 정의
- [ ] OTA 전송 채널 (LTE/SBC 경유 vs LoRa 인라인)
- [ ] 보안 강화 (AES-CTR + CMAC MIC)
- [ ] 다수 Link TDMA 스케줄 세부화 (노드 수 증가 대응)
- [ ] 비콘 시간 정확도 요구사항 확정
- [ ] 유량계 K값 (L/pulse) 표준화
- [ ] 관수 모터 3선식 핀 할당 확정 (보드 정의 참조)

---

*작성: Claude Code*
*최종 업데이트: 2026-04-06*
