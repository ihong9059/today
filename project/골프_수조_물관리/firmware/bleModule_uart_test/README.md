# UTTEC BLE Module — 7-channel UART bring-up + SW-UART TX 검증 펌웨어

한림용인CC PCB 설계 입력값 확정 + 양산 노드 펌웨어 베이스. 4 TX + 3 RX (HW UART × 1 + SW-UART × 6) 동시 운용 검증.

## 채널 배치 (UTTEC BLE Module J28 14-pin 풀 매핑 기준)

| J28 Pin | port | 채널 | 디바이스 | 구현 | 비고 |
|:-:|:-:|:-:|---|---|---|
| 1 | P0.11 | TX1 | LoRa E22 RXD | HW UART0 TX | 9600 8N1 |
| 2 | P0.15 | TX2 | MAX485 DI (RS485) | SW-UART (SPI1 MOSI) | 9600, **single transaction** |
| 3 | P0.13 | RX1 | LoRa E22 TXD | HW UART0 RX | 9600 8N1, button0 disabled |
| 4 | P0.02 | RX2 | MAX485 RO (RS485) | SW-UART (GPIO INT + DWT) | 9600 |
| 5 | P0.08 | RX4 | PCA10040 USB-VCOM RX | SW-UART (GPIO INT + DWT) | **9600**, J23 Pin 3 동일 net |
| 6 | P0.17 | LoRa M0 | E22 mode bit 0 | GPIO OUT | |
| 7 | P0.22 | TX3 | Debug console (CP210x) | SW-UART (SPI2 MOSI) | 115200, **per-byte transaction** |
| 8 | P0.19 | LoRa M1 | E22 mode bit 1 | GPIO OUT | |
| 9 | P0.24 | DE/RE | MAX485 방향 | GPIO OUT | |
| 10 | P0.20 | LoRa AUX | E22 busy signal | GPIO IN + pull-up | |
| 11 | 3.3V | — | MAX485 VCC | 전원 | |
| 13 | GND | — | 공통 | 전원 | |
| 14 | — | NC | — | PCB 미연결 | ⚠️ 5/31 실측 확인 |

**J23 (SWD/UART 헤더, 양산 보드만)** ★ TX4 신규 (2026-06-01):
| J23 Pin | port | 채널 | 디바이스 | 구현 | 비고 |
|:-:|:-:|:-:|---|---|---|
| 2 | P0.06 | TX4 | PCA10040 USB-VCOM TX | SW-UART (SPI0 MOSI) | **9600, single transaction** |
| 3 | P0.08 | RX4 | PCA10040 USB-VCOM RX | (J28 Pin 5 동일 net) | 9600 |

→ **PCA10040 J-Link OB가 P0.06/P0.08을 USB CDC VCOM으로 직결**. HyperTerminal을 J-Link COM 포트에 9600 8N1로 열면 CP210x 별도 케이블 없이 PC↔MCU 양방향 통신 가능. 한 USB 케이블에 디버그(TX3, 115200 CP210x)와 USB-VCOM(TX4/RX4, 9600 J-Link) 병행 운용.

⚠️ **양산 보드 P0.06 접근**: UTTEC BLE Module 양산 보드에서는 J23 헤더에서만 P0.06 접근 가능 (J28에 미노출). 양산 path에 TX4를 쓰려면 J23 wire 필수.

## 동작

매 1초 카운터 N 증가, 다음 송신:
- TX1 (UART0,   P0.11) : "TX1: N\r\n" — LoRa channel       (9600)
- TX2 (SW SPI1, P0.15) : "TX2: N\r\n" — RS485 channel      (9600)
- TX3 (SW SPI2, P0.22) : "TX3: N\r\n" — Debug console      (115200, CP210x)
- TX4 (SW SPI0, P0.06) : "TX4: N\r\n" — PCA10040 USB-VCOM (9600)
- 매 5초 TX3에 "RX2-stats: ..." + "RX4-stats: ..."
- 동시에 LED 토글 (BLUE P0.23, RED P0.18)

**TX3는 추가로 monitor 역할**:
- RX1 (UART0,    P0.13) 입력 → "RX1: ..." 으로 TX3 echo
- RX2 (GPIO INT, P0.02) 입력 → "RX2: ..." 으로 TX3 echo
- RX4 (GPIO INT, P0.08) 입력 → "RX4: ..." 으로 TX3 echo

검증:
- **TX1 ↔ RX1** (J28 Pin 1 ↔ Pin 3 점퍼) → TX3에서 "RX1: TX1: N\r\n" 확인
- **TX2 ↔ RX2** (J28 Pin 2 ↔ Pin 4 점퍼) → TX3에서 "RX2: TX2: N\r\n" 확인
- **TX4 → USB-VCOM** (PCA10040 J-Link COM 포트 9600 8N1) → HyperTerminal에 "TX4: N" 확인. 점퍼 불필요.
- **USB-VCOM 키 입력 → RX4** → TX3에서 "RX4: x\r\n" 확인 (PCA10040 USB↔MCU 양방향 검증)

## ⭐ SW-UART TX 핵심 — baud-dependent 분기 (2026-06-01 확정)

`sw_uart.c` `sw_uart_write()` 가 baud에 따라 정반대 전송 전략 사용:

| baud | 전략 | 이유 |
|:-:|---|---|
| 9600 | **Single concatenated SPI transaction** (전체 string 1개 buffer) | inter-transaction MOSI glitch (~수십 µs) 가 9600 bit period (104 µs) 의 큰 비율 → false start 유발. gap 제거로 해결 |
| 115200 | **Per-byte SPI transaction** | inter-transaction glitch는 115200 bit period (8.7 µs) 보다 짧아 영향 없음. 오히려 single transaction은 back-to-back byte 사이 idle 부족 (0.25 µs) 으로 receiver 재동기화 실패 |

상세: `wiki/thoughts/2026-Q2/2026-06-01_sw-uart-tx-debug-cp210x.md`

## sw_uart_rx (SW-UART RX, GPIO INT + DWT)

- GPIO falling edge → ISR 진입 → start bit 검증 → 8 data bit busy-wait sampling → stop bit 검증 → ring buffer push
- DWT CYCCNT (64 MHz) 사용으로 9600 baud bit period 104.17 µs 정확
- **ISR 부하**: 1 ms/byte 점유 (다른 Zephyr ISR 그동안 pending)
- **양산 부하**: Modbus 1 Hz polling 기준 1% CPU avg (안전)
- 추후 개선 여지: TIMER capture로 ISR 외 sampling

## 빌드 환경 (NCS v2.9.2)

```bash
export ZEPHYR_BASE=C:/ncs/v2.9.2/zephyr
export ZEPHYR_SDK_INSTALL_DIR=C:/ncs/toolchains/b620d30767/opt/zephyr-sdk
export PATH="/c/ncs/toolchains/b620d30767/opt/bin/Scripts:/c/Program Files/SEGGER/JLink_V818:$PATH"
```

## 빌드 + 플래시 (한글 경로 우회 ASCII 빌드)

⚠️ NCS 빌드 ↔ cmd AutoRun 충돌 (`feedback_ncs_build_cmd_autorun_conflict.md`) — 빌드 전후 AutoRun 일시 해제 필수.

```powershell
$env:ZEPHYR_BASE = "C:\ncs\v2.9.2\zephyr"
$env:ZEPHYR_SDK_INSTALL_DIR = "C:\ncs\toolchains\b620d30767\opt\zephyr-sdk"
$env:PATH = "C:\ncs\toolchains\b620d30767\opt\bin;C:\ncs\toolchains\b620d30767\opt\bin\Scripts;C:\Program Files\SEGGER\JLink_V818;" + $env:PATH

$saved = (Get-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun -ErrorAction SilentlyContinue).AutoRun
Set-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun -Value ""
try {
    # ASCII 경로로 복사 후 빌드 (CMake 한글 path 미지원)
    Copy-Item 'C:\todo\today\project\골프_수조_물관리\firmware\bleModule_uart_test\*' 'C:\uttec_uart_test\' -Recurse -Force
    Set-Location "C:\uttec_uart_test"
    west build -b nrf52dk/nrf52832 --pristine

    # PCA10056 J-Link OB SN 683795210 → UTTEC BLE Module SWD
    & "C:\Program Files\Nordic Semiconductor\nrf-command-line-tools\bin\nrfjprog.exe" --snr 683795210 --program build\zephyr\zephyr.hex --sectorerase --verify --reset
} finally {
    if ($saved) { Set-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun -Value $saved }
    else { Set-ItemProperty 'HKCU:\Software\Microsoft\Command Processor' -Name AutoRun -Value "" }
}
```

## 검증 (HyperTerminal)

| 채널 | 핀 | baud | USB-UART 칩 | 결과 |
|---|:-:|:-:|---|:-:|
| TX2 | J28 Pin 2 (P0.15) | 9600 | CP210x | ✅ 깔끔 (2026-06-01) |
| TX3 | J28 Pin 7 (P0.22) | 115200 | CP210x | ✅ 깔끔 (2026-06-01) |

검증 출력 예:
```
TX3: 41
RX2: TX2: 41
TX3: 42
RX2: TX2: 42
RX2-stats: isr=373 ok=279 framing=32 false=62
RX2: TX2: 45
```

## 리소스

- FLASH: 27 KB / 512 KB (5.3%)
- RAM: 22 KB / 64 KB (34%) — 9600 path의 16 KB 정적 buffer 포함

## 빌드 함정 박제

### SPIM PAN 58 (nRF52832)
SPIM은 Product Anomaly 58 (RXD.MAXCNT==1 + TXD.MAXCNT<=1 시 추가 byte clocked out)로 기본 빌드 차단. SW-UART는 TX-only라 PAN 58 영향 없음.

해결: `prj.conf`에 `CONFIG_SOC_NRF52832_ALLOW_SPIM_DESPITE_PAN_58=y` 추가.

### NCS 빌드 ↔ cmd AutoRun 충돌
`HKCU\Software\Microsoft\Command Processor\AutoRun = cd /d C:\todo` 가 ninja → cmd.exe → ar.exe CWD를 강제 이동 → ar.exe 가 build dir 상대 경로의 .a 파일 못 만듦 → 전체 실패.

해결: 빌드 전후 PowerShell try-finally로 AutoRun 일시 해제 (위 빌드 명령 참조).

메모리: `~/.claude/projects/C--todo-today/memory/feedback_ncs_build_cmd_autorun_conflict.md`

## 다음 단계

본 펌웨어가 PCB 설계 입력값 (5-channel 핀 배치 + MAX485 DE control + LoRa M0/M1/AUX) 확정. PCB 입고 (6/8경) 후 carrier board에 그대로 적용.

**6/2 (화) 수조 sensing test 시 사용 펌웨어**.
