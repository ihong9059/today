# 한림용인CC LoRa 거리 테스트 펌웨어

PCA10040 (nRF52 DK) × E22-900T30D LoRa 모듈로 거리별 통신 품질 측정.

**작성일**: 2026-05-19 (한림용인CC D-day 검증용)
**상태**: ✅ Loopback 양방향 + Korea CH 72 + RSSI 측정 완료

## 🔴 작업 재시작 전 반드시 읽기

E22 모듈 설정 함정에 **3번 빠짐** (5/9, 5/19 ×2). 본 README 수정 또는 펌웨어 재포팅 전:

1. **`~/.claude/projects/C--todo-today/memory/feedback_e22_900t_config_baud.md`** (자동 로드 memory)
2. **`oldProject/test/bleModule/lora_e22/GOTCHA.md`** (절대 규칙 4개 + 정답 시퀀스 + 점검표)

요약:
- ★ Config 모드 = M0=0, M1=1 (M0=1 M1=1은 Sleep, UART OFF)
- ★★★ Config UART baud = **9600 8N1 고정** (REG0 SPED 값과 무관)
- ★ 응답 prefix 항상 **C1** (write 명령 C0도 응답은 C1)
- ★ AUX HIGH 폴링 필수 (idle=1, busy=0)

## 빌드 결과물

| 폴더 | 역할 | 보드 SN | LED1 |
|---|---|---|:-:|
| `pca10040_e22_900t_tx/` | 송신 (2초 주기 `$SEQ=NNNNN#\n`) | **682359916** | 송신마다 toggle |
| `pca10040_e22_900t_rx/` | 수신 (frame 파싱 + PER) | **1050349064** | **수신마다 toggle ⭐** |

## ⚠️ E22 모듈 사전 설정 (필수, 1회만)

펌웨어 자동 config는 제거됨 (Config 모드 read/write 응답 없음 — M0/M1 또는 baud 단절 추정). E22 모듈은 사전에 **EBYTE RF Setting Software**로 1회 설정 필요:

| Register | 값 | 의미 |
|---|---|---|
| REG0 (SPED) | **0xE0** | baud 115200 / 8N1 / **air 0.3 kbps** (최저 = 최장거리) ★ |
| REG1 (OPTION) | 0x00 | TX 30 dBm (1W 최대) / subpkt 200B |
| REG2 (CHAN) | **0x48** | **CH 72 = 922.125 MHz** (Korea KC ISM 중심) ※ 미설정 시 default CH 18 = 868 MHz로 동작 — 일반 테스트는 가능하나 한국 운용 불가 |
| REG3 (TRANS_MODE) | **0x00** | RSSI byte OFF (현 firmware 호환). 0x80 (RSSI byte ON)로 설정 시 firmware 수정 필요 |

**EBYTE 소프트웨어 절차**:
1. E22 모듈을 USB-UART 어댑터로 PC 직결 (또는 PCA10040에서 M0=1 M1=1로 Config 모드 진입 후 J-Link CDC로 통신)
2. EBYTE RF Setting Software 실행 → "Read" → 현재 값 확인
3. 위 표 값으로 변경 → "Write"
4. 2 모듈 모두 동일 설정 (TX/RX NETID·CHAN 일치 필수)

> 5/10 작업으로 한 모듈은 REG0=0xE0 (115200/8N1/0.3k) 적용됨. 나머지 1대도 동일하게.

## 검증 결과 (2026-05-19 10:50)

벤치 테스트 (TX·RX 데스크 위 1m 이내, 안테나 체결):
```
RX 00037  AUX=0
RX 00038  AUX=0
RX 00039  AUX=1
RX 00040  AUX=1
...
STAT rx=15 lost=0 bad=0 PER=0.0%  last_seq=51
```
- ✅ PER 0% (모든 프레임 수신)
- ✅ LED1 토글 정상
- ✅ AUX pin 정상 (busy↔idle 전환)
- ⚠️ RSSI 측정 불가 (REG3 미설정 — EBYTE 소프트웨어로 0x80 설정 후 firmware 수정 필요)
- ⚠️ Korea KC 채널 (CH 72) 미적용 가능성 — 모듈 read로 확인 필요

## 결선 (TX·RX 동일)

| E22 핀 | PCA10040 라벨 | nRF52832 | 비고 |
|---|:-:|:-:|---|
| VCC | +3.3V (P3) | — | 3.3V 권장 |
| GND | GND (P3) | — | |
| RXD | **D0** (P1) | P0.11 | UART TX (MCU → E22) |
| TXD | **D1** (P1) | P0.12 | UART RX (MCU ← E22) |
| M0 | **A3** (P4) | P0.29 | mode bit 0 (= 0 Normal) |
| M1 | **A4** (P4) | P0.30 | mode bit 1 (= 0 Normal) |
| AUX | **A5** (P4) | P0.31 | busy signal (input + pullup) |

> ⚠️ **920 MHz SMA 안테나 필수** (E22-900T30D 30 dBm 출력 → 안테나 없이 켜면 PA 손상)

## 빌드 & 플래시 (재현용)

NCS v2.9.2 환경. **한글 경로 → ASCII 경로 빌드 필요** (CMake 한글 path 미지원).

### 빌드 환경 셋업
```bash
export ZEPHYR_BASE=C:/ncs/v2.9.2/zephyr
export ZEPHYR_SDK_INSTALL_DIR=C:/ncs/toolchains/b620d30767/opt/zephyr-sdk
export PATH="/c/ncs/toolchains/b620d30767/opt/bin/Scripts:/c/Program Files/SEGGER/JLink_V818:$PATH"
```

### ASCII 경로로 복사 후 빌드
```bash
mkdir -p /c/lora_900t_build
cp -r "C:/todo/today/project/골프_수조_물관리/firmware/"* /c/lora_900t_build/
```

### 064 보드 잠금 해제 (RX 측, 1회만)
```bash
nrfjprog -s 1050349064 --recover
```

### TX 빌드 & 플래시
```bash
cd /c/lora_900t_build/pca10040_e22_900t_tx
west build -b nrf52dk/nrf52832 --pristine
west flash --runner jlink --dev-id 682359916
```

### RX 빌드 & 플래시
```bash
cd /c/lora_900t_build/pca10040_e22_900t_rx
west build -b nrf52dk/nrf52832 --pristine
west flash --runner jlink --dev-id 1050349064
```

### RTT 로그 모니터링

#### GUI (권장 — 두 보드 동시 보기)
```bash
"C:/Program Files/SEGGER/JLink_V818/JLinkRTTViewer.exe"
# Connect → SN: 1050349064 (RX) → NRF52832_XXAA, SWD, 4000 kHz
# 두 번째 인스턴스로 SN: 682359916 (TX) 같은 방식
```

#### CLI (로그 파일로 저장)
```bash
JLinkRTTLogger.exe -Device NRF52832_XXAA -If SWD -Speed 4000 \
    -RTTChannel 0 -USB 1050349064 rx_log.txt
```

## 거리 측정 절차 (한림용인CC 8 노드)

1. **TX 보드 = 1 기준 위치** (예: 펌프장 또는 게이트웨이 예정 위치)
2. **RX 보드를 7 후보 위치로 이동** (휴대 배터리 + 안테나 + 노트북)
3. 각 위치에서 **60초 머무름 → 30 frame 수신** (2초 주기)
4. RX 로그에서 STAT 라인의 PER 기록
5. 8 위치 × 60초 ≈ 10분 소요

### 합격 기준 권고 (PER 기준)

| PER | 판정 | 비고 |
|---|---|---|
| ≤ 1% | ✅ 직결 (중계 불필요) | |
| 1~10% | 🟡 마진 적음, 환경 변화 시 위험 | |
| 10~30% | 🟠 중계기 권장 | |
| > 30% | 🔴 중계기 필수 또는 위치 재선정 | |

> 0.3 kbps air rate + 30 dBm + Korea ISM 922 MHz → 카탈로그 통달거리 약 5 km LoS (실측 변동 큼)

## 트러블슈팅 노트

### 시도했으나 실패한 자동 config
펌웨어에서 E22 Config 모드 진입 + REG write 시도 → 응답 없음 (read 0 bytes). 원인 추정:
- M0/M1 pin 신호 — Zephyr GPIO_OUTPUT 적용 후 실제 핀 전압 미검증
- UART runtime baud 9600 전환 동작 미검증
- AUX HIGH 대기 부재
- 모듈 fresh 여부 — factory default 9600 baud 가능성

**해결**: firmware 자동 config 제거 → EBYTE 소프트웨어로 사전 1회 설정 권장.

### -220 dBm 패턴 (이전 빌드)
13-byte 파싱 (RSSI byte 포함) 사용 시 매 alternate frame만 수신 + RSSI 항상 -220 dBm:
- 원인: REG3 미설정 → RSSI byte OFF → 13번째 byte로 다음 프레임 '$' (0x24) 사용 → -(256-36) = -220 dBm
- **해결**: 12-byte 파싱으로 단순화 (현 firmware)

### 한글 경로 CMake 오류 (3221226505 = 0xC0000409)
```
FATAL ERROR: command exited with status 3221226505: cmake.exe ...
```
- 원인: NCS CMake가 non-ASCII 경로 미지원
- **해결**: `/c/lora_900t_build/` ASCII 경로로 소스 복사 후 빌드
