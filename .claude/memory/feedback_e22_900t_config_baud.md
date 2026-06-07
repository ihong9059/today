---
name: E22-900T30D 두 가지 baud 함정 — Config 9600 + Normal REG0 (115200 default)
description: 🚨 E22 두 모드 별개 baud — Config(M0=0,M1=1) = 9600 고정 / Normal(M0=0,M1=0) = REG0 SPED 값 (default 0xE0 = 115200). Normal 통신 시 펌웨어 UART baud를 9600으로 두면 신호 무시 → 송수신 0. 두 함정 합산 4회 박제
type: feedback
originSessionId: 2342b18f-2ed1-4bab-9ccc-709595c431c9
triggers: [E22 LoRa 펌웨어 작성, E22 통신 안 됨, LoRa byte 0, REG0 설정, UART baud 결정]
---
# E22-900T30D — 두 모드별 baud 절대 규칙

## ⭐ 핵심 — Config baud와 Normal baud는 다르다

| 모드 | M0 | M1 | UART baud | 용도 |
|---|:-:|:-:|---|---|
| **Normal (transparent)** | 0 | 0 | **REG0 SPED 값** (default 0xE0 = **115200**) | LoRa 데이터 송수신 |
| **Config** | 0 | 1 | **9600 고정** ★ | register read/write |
| WOR | 1 | 0 | REG0 SPED | wake on radio |
| Sleep | 1 | 1 | UART OFF | 절대 사용 금지 |

→ **Normal 통신 시 펌웨어 UART baud = REG0 SPED 값**. default REG0=0xE0 = 115200.
→ **펌웨어 baud 9600 + E22 REG0=0xE0 (115200)** = 송수신 0 byte (E22가 신호 해석 못함).

## 규칙

E22-400T / E22-900T30D (EBYTE LoRa) 모듈을 펌웨어에서 설정 read/write 할 때:

1. **Config 모드 = M0=0, M1=1** (Mapping B, 실측 검증)
   - M0=1, M1=1은 **Sleep 모드 = UART OFF, 모든 명령 무응답**
2. **Config 모드 UART baud = 9600 8N1 고정** ★★★
   - REG0 SPED 값이 115200/57600/등 어떤 값이어도 Config 모드 진입 시점에는 9600
3. **Normal 모드 UART baud = REG0 SPED 값** (default 0xE0 = 115200) ★★★ ⭐ 2026-06-07 박제
   - 펌웨어가 잘못된 baud로 송수신하면 0 byte
   - 양쪽 모듈이 동일 REG0일 때만 통신 성립
4. **응답 prefix 모두 C1** (write 명령 C0도 응답은 C1)
5. **AUX 핀 폴링**: idle=HIGH(1), busy=LOW(0). mode 전환 시 5~20ms LOW dip 후 HIGH 복귀. 반드시 wait_aux_high()로 대기

## Why (절대 잊지 말 것)

**이 함정에 3번 빠짐**:

| 날짜 | 사건 | 시간 손실 |
|---|---|---|
| 2026-05-09 | M0=1, M1=1로 Config 시도 → Deep Sleep → 12개 AT 명령 무응답 → "모듈 lock" 잘못된 결론 | 반나절 |
| 2026-05-10 | dual-test로 ★ Config = M0=0, M1=1 확인 + AT_COMMANDS.md 박제 | 해결 |
| **2026-05-19** | **PCA10040 포팅 시 또 같은 실수** — 115200 baud + (1,1)=Deep Sleep → 0 bytes → 다시 진단 | **수 시간** |
| **2026-06-07** ⭐ | **lora_test_tx/rx 펌웨어를 Normal mode baud 9600으로 작성** → E22 REG0=0xE0(115200)와 mismatch → LoRa 송수신 0 → 사용자가 5/19 검증본 차이 직접 지적. **본 박제에 Normal mode baud 항목 신규 추가** | 약 1시간 |

매번 똑같이 헤맴. 사용자가 "다시는 이렇게 헤매지 않도록" 강력 요청 → 본 memory 박제.

## 빠른 진단 (LoRa 통신 안 될 때)

1. **Normal 모드 펌웨어 UART baud = REG0 SPED 값과 일치?** ★ 가장 흔한 함정
   - 펌웨어 9600 + REG0 0xE0(115200) = 0 byte
   - 5/19 검증본 (`pca10040_e22_900t_tx`) 핀맵·setting을 항상 reference로 비교
2. M0=0, M1=0 (Normal mode)인지?
3. M0/M1 결선이 펌웨어 가정과 일치?
4. 양쪽 E22 REG0 동일 (channel, address, air rate 포함)?
5. 안테나·전원·거리 점검

## How to apply

E22 펌웨어 작성 시 **반드시 다음 순서 그대로 적용**:

```c
// 1. Normal mode reset
set_mode(0, 0); k_msleep(100); wait_aux_high(500);

// 2. Config mode (M0=0, M1=1)
set_mode(0, 1); k_msleep(50); wait_aux_high(500);

// 3. UART baud → 9600 (★★★ 필수, REG0 무관)
uart_configure(uart, {.baudrate=9600, .parity=NONE, .stop_bits=1, .data_bits=8});
k_msleep(50);

// 4. C1 00 09 → 12 byte 응답 (C1 prefix)
// 5. C0 00 09 [9 bytes] → 12 byte echo (C1 prefix)
// 6. UART baud → 115200 (또는 REG0 설정값)
// 7. Normal mode (M0=0, M1=0), wait_aux_high
```

**빠른 진단 (응답 0 bytes 발생 시 즉시 점검)**:
1. baud 9600인가? (REG0 값에 속지 말 것)
2. M0=0, M1=1인가? (M0=1, M1=1은 Sleep)
3. AUX HIGH 확인했는가?
4. write 응답 prefix는 C1인가?

## 참조 파일

- `oldProject/test/bleModule/lora_e22/AT_COMMANDS.md` (5/10 박제)
- `oldProject/test/bleModule/src/main.c` (5/10 검증 시퀀스)
- `project/골프_수조_물관리/firmware/pca10040_e22_900t_*/src/main.c` (5/19 PCA10040 포팅, baud 9600 fallback 자동)
- `.claude/sessions/session_2026-05-19_*.md` (5/19 함정 진단 과정)
