---
title: UTTEC BLE Module J28 14-pin 매핑 (한림용인CC 양산 펌웨어 기준)
type: reference
created: 2026-06-07
updated: 2026-06-07
tags: [pinmap, j28, nrf52832, lora, modbus, hanlim-yongin-cc]
links: [한림용인cc-고가수조, bleModule_uart_test]
source_commit: fd7087f5 (2026-06-01) "한림용인 7-ch UART (TX4/RX4 USB-VCOM 추가)"
verified_by: 사용자 실측 (2026-05-31 J28 1Hz 토글) + fd7087f5 7-channel bring-up (2026-06-01)
---

# UTTEC BLE Module — J28 14-pin 매핑 자료

> **하드웨어**: UTTEC BLE Module (nRF52832-QFAA QFN48, 2022.09.22 PCB)
> **회로도**: `references/bleModule.pdf`
> **검증 펌웨어**: `firmware/bleModule_uart_test/` (fd7087f5 시점, 7-channel UART bring-up 완료본)
> **검증일**: 2026-05-31 J28 풀 매핑 실측 확정 + 2026-06-01 7-channel 동작 검증

---

## 1. J28 14-pin 시각 매핑

```
        ┌─────────────────┬─────────────────┐
   Pin 1│ P0.11  TX1(LoRa)│ P0.15  TX2(485) │Pin 2
        │ UART0 TX → E22  │ SW-UART → MAX485│
        ├─────────────────┼─────────────────┤
   Pin 3│ P0.13  RX1(LoRa)│ P0.02  RX2(485) │Pin 4
        │ UART0 RX ← E22  │ SW-UART ← MAX485│
        ├─────────────────┼─────────────────┤
   Pin 5│ P0.08  RX4(USB) │ P0.17  LoRa M0  │Pin 6
        │ SW-UART ← VCOM  │ GPIO OUT        │
        ├─────────────────┼─────────────────┤
   Pin 7│ P0.22  TX3(DBG) │ P0.19  LoRa M1  │Pin 8
        │ SW-UART → Debug │ GPIO OUT        │
        ├─────────────────┼─────────────────┤
   Pin 9│ P0.24  485 DE/RE│ P0.20  LoRa AUX │Pin 10
        │ GPIO OUT        │ GPIO IN pull-up │
        ├─────────────────┼─────────────────┤
  Pin 11│ VDDA_3.3V       │ P0.04  ⚪ free  │Pin 12
        │ MAX485 VCC      │ 미사용           │
        ├─────────────────┼─────────────────┤
  Pin 13│ GND             │ P0.05  ❌ N.C.  │Pin 14
        │ 공통 GND        │ J28 미연결 불가  │
        └─────────────────┴─────────────────┘
```

---

## 2. 14-pin 풀 매핑 표 (fd7087f5 7-channel UART 검증 기준)

| Pin | nRF52832 port | 채널/신호 | 페리퍼럴 | baud | 외부 연결 | 사용 | 비고 |
|:-:|:-:|---|---|:-:|---|:-:|---|
| **1** | P0.11 | **TX1** | HW UART0 TX | 9600 | LoRa E22 **RXD** | ✅ | I2C SDA 대안 가능 |
| **2** | P0.15 | **TX2** | SW-UART (SPI1 MOSI) | 9600 | MAX485 **DI** (RS485) | ✅ | |
| **3** | P0.13 | **RX1** | HW UART0 RX | 9600 | LoRa E22 **TXD** | ✅ | PCA10040 button0 충돌, overlay disable 필요 |
| **4** | P0.02 | **RX2** | SW-UART (GPIO INT) | 9600 | MAX485 **RO** (RS485) | ✅ | |
| **5** | P0.08 | **RX4** | SW-UART (GPIO INT) | 9600 | PCA10040 USB-VCOM **RX** | ✅ | J23 Pin 3과 동일 net |
| **6** | P0.17 | **LoRa M0** | GPIO OUT | — | E22 mode pin M0 | ✅ | Config: M0=0 / Normal: M0=0 |
| **7** | P0.22 | **TX3** | SW-UART (SPI2 MOSI) | **115200** | Debug console (CP210x) | ✅ | 디버그 전용 (고속) |
| **8** | P0.19 | **LoRa M1** | GPIO OUT | — | E22 mode pin M1 | ✅ | Config: M1=1 / Normal: M1=0 |
| **9** | P0.24 | **485 DE/RE** | GPIO OUT | — | MAX485 direction control | ✅ | OP_LED (P0.23)와 별도 net |
| **10** | P0.20 | **LoRa AUX** | GPIO IN + pull-up | — | E22 busy signal | ✅ | TX 종료 감지 |
| **11** | VDDA_3.3V | 전원 | — | — | MAX485 VCC | ✅ | 아날로그 3.3V 레일 |
| **12** | P0.04 | ⚪ **free** | — | — | — | ❌ | **현재 미사용 — 확장 여유** |
| **13** | GND | 접지 | — | — | 공통 GND | ✅ | |
| **14** | P0.05 | ❌ **N.C.** | — | — | — | ❌ | **PCB lot에서 J28 헤더 라우팅 안 됨 — 사용 불가** |

→ **총 11핀 사용 + 2핀 미사용 + 1핀 사용 불가** (전원 2 + 신호 9 + 자유 1 + 불가 1)

---

## 3. 사용하지 않는 핀 (미사용 / 사용 불가)

### 3-A. Pin 12 (P0.04) — 미사용 ⚪

| 항목 | 값 |
|---|---|
| 칩 port | P0.04 (nRF52832 Pin 6) |
| 현재 상태 | overlay에 SPI1 dummy MOSI로 reserved되나 실제 신호 없음 |
| 가용성 | ✅ 일반 GPIO로 자유롭게 활용 가능 |
| 권장 활용 | 펌프 ON/OFF relay 제어 / 추가 sensor input / status LED / 확장 RS485 차순위 |
| 제약 | 없음 (HW UART/SPI/I2C 모두 매핑 가능한 자유 GPIO) |

### 3-B. Pin 14 (P0.05) — 사용 불가 ❌

| 항목 | 값 |
|---|---|
| 칩 port | P0.05 (nRF52832 Pin 7) |
| 현재 상태 | **chip pin은 동작 / J28 헤더로 라우팅 안 됨 (PCB 결함 또는 의도적 미연결)** |
| 가용성 | ❌ 본 PCB lot에서 J28에서 사용 불가 |
| 검증 결과 | 2026-05-31 `bleModule_uart_test`로 P0.05 토글 → J28 Pin 14에서 신호 0V (측정 실패) |
| 대안 | 칩 pin을 직접 wire-bonding 또는 dead-bug 와이어로 연결 (양산 비추) |
| 차기 PCB lot 권고 | R98 또는 별도 0Ω 점퍼로 라우팅 추가 검토 |

### 3-C. 칩 내부 기타 미사용 port (J28 외부)

| 칩 Pin | port | 상태 | 비고 |
|:-:|:-:|---|---|
| 11 | P0.09 | NFC1 default | NFCT_PINS_AS_GPIOS로 GPIO 가능 |
| 12 | P0.10 | NFC2 default | NFCT_PINS_AS_GPIOS로 GPIO 가능 |
| 15 | P0.12 | SPI1 SCK dummy | TX2 SW-UART의 SPI1 SCK pin (실제 신호 없음) |
| 17 | P0.14 | SPI2 SCK dummy | TX3 SW-UART의 SPI2 SCK pin |
| 19 | P0.16 | SPI0 SCK dummy | TX4 SW-UART의 SPI0 SCK pin (J28 미노출) |
| 24 | P0.21 | nRESET default | UICR 설정 시 GPIO 가능 |
| 37~43 | P0.25~P0.31 | 미정 | J28에 노출 안 됨, 양산 PCB 부재 |

→ 본 PCB에서 추가 신호 확장 시 **J28 Pin 12 (P0.04)가 유일한 가용 GPIO**.

---

## 4. J23 커넥터 (참고, J28 외)

J23은 SWD + UART 디버그 헤더 (양산보드에만 실장).

| Pin | 신호 | 칩 port | 비고 |
|:-:|---|:-:|---|
| 1 | VDD_3V | — | 3.3V 전원 |
| 2 | TX4 | **P0.06** | SW-UART (SPI0 MOSI) → PCA10040 USB-VCOM TX |
| 3 | RX4 | **P0.08** | = J28 Pin 5 동일 net |
| 4 | GND | — | |
| 5 | GND | — | |
| 6 | GND | — | |

**중요**:
- P0.06 (TX4) = J23 Pin 2에만 노출, J28에 없음
- P0.08 (RX4) = J23 Pin 3 = J28 Pin 5 (공유)
- PCA10040 onboard J-Link OB와 직결 → HyperTerminal 9600 8N1로 PC↔MCU 직접 통신

---

## 5. LED 매핑 (확정)

| LED | 색 | 칩 port | 회로 경로 | 극성 |
|:-:|:-:|:-:|---|:-:|
| **D21** | BLUE | **P0.23** | R24 (470Ω) → 0Ω 점퍼 → 칩 | ACTIVE_LOW |
| **D22** | RED | **P0.18** | R25 (470Ω) → R97 (0Ω) → 칩 | ACTIVE_LOW |

---

## 6. 채널별 기능 요약 (fd7087f5 펌웨어)

| 채널 | 방향 | 용도 | 검증 결과 |
|:-:|:-:|---|---|
| **TX1 / RX1** | 양방향 | **LoRa E22-900T 데이터 통신** (920 MHz, 0.3k air rate) | ✅ overlay UART0 박제 / 양산 reference 검증 |
| TX2 / RX2 | 양방향 | **RS485 Modbus RTU** (QDY30A-B 수위센서, slave=1, reg 0x0004) | ✅ 6/2 풀체인 검증 완결 (HW UART 우회 후) |
| TX3 | 송신 | **Debug console** (CP210x USB-Serial) | ✅ 115200 안정 |
| TX4 / RX4 | 양방향 | **PCA10040 USB-VCOM** (J-Link OB) | ✅ 6/1 line-buffered loopback 검증 |
| LoRa M0/M1 | 출력 | E22 mode 전환 (Config / Normal / WOR / Sleep) | ✅ Mapping B (Config M0=0 M1=1) 박제 |
| LoRa AUX | 입력 | E22 busy/TX 종료 감지 | ✅ pull-up 셋업 |
| MAX485 DE/RE | 출력 | RS485 송수신 방향 제어 | ✅ Modbus 통합 검증 |

---

## 7. 시공 노드별 핀 활용 패턴

본 매핑은 한림용인CC 시공의 **펌프/중계기/고가수조 노드** 모두 동일 적용:

| 노드 종류 | 사용 채널 | Pin 12 (P0.04) 활용 후보 |
|---|---|---|
| **펌프 노드 ×2** | LoRa + RS485 (펌프 status) + Debug | 펌프 ON/OFF relay 직접 제어 |
| **중계기 노드 ×2** | LoRa + Debug (USB-VCOM optional) | LED status (NLOS 통달 표시) |
| **고가수조 노드 ×2** | LoRa + RS485 (수위센서) + Debug | overflow alarm 출력 |
| **저장탱크 노드 ×3** | LoRa + RS485 (수위센서) | (동일) |

→ **9개 노드 전부 동일 펌웨어 base + 노드별 config**로 분기 가능.

---

## 8. 함정·주의사항 (박제)

| 함정 | 박제 위치 | 대응 |
|---|---|---|
| **E22 Config Mode baud는 9600 고정** (REG0 무관) | `memory/feedback_e22_900t_config_baud.md` | M0=0 M1=1 + UART 9600 reset 필수 |
| **SW-UART 9600 bit 3 corruption** (영문 'o', 'y' 깨짐) | `wiki/log.md` [2026-06-01] | RS485는 HW UART 승격 / LoRa는 영향 미관찰 |
| **SW-UART line transaction 분리 시 false-start** | `wiki/log.md` [2026-06-01] | line + `\r\n` single transaction으로 통합 |
| **PCA10040 button0 (P0.13) 충돌** | overlay `&button0 { status="disabled" }` | LoRa RX1과 동일 핀이라 disable 필수 |
| **Pin 14 (P0.05) J28 미연결** | 본 문서 §3-B | 차기 PCB lot 라우팅 추가 검토 |

---

## 9. 변경 이력 (현재 working tree 기준)

| 시점 | 커밋 | 변경 |
|---|---|---|
| 2026-05-31 | b744586d | 5-channel UART bring-up + J28 풀 매핑 확정 |
| 2026-06-01 (오전) | fd7087f5 | 7-channel UART 통합 (TX4/RX4 USB-VCOM 추가) |
| 2026-06-01 (오후) | 3952048e | TX4/RX4 line-buffered loopback 검증 |
| 2026-06-02 | 92b60e9c | Modbus 풀체인 검증 — HW UART0를 RS485로 재할당 |
| 2026-06-07 (오전) | (post-92b60e9c) | Relay P0.04 추가 + 6/7 사용자 검증 (LED+Relay+Modbus) |
| **2026-06-07 (오후) ⭐⭐⭐** | (lora_test_tx/rx) | **E22 register 자동 setup (REG0=0x60, 9600+0.3k+30dBm max) + LoRa 통신 검증** |
| **2026-06-07 (저녁) ⭐⭐⭐⭐** | (lora_tx_water_level + lora_rx_display) | **Modbus + LoRa time-mux 통합 펌웨어 완성** ⭐ **본 문서 최종 기준** |

⚠️ **6/2 변경 주의**: 6/2 Modbus 검증을 위해 HW UART0가 **LoRa(P0.11/P0.13) → RS485(P0.15/P0.02)** 로 재배치되었음. 6/7 저녁 통합 펌웨어에서 **time-multiplexing**으로 양쪽 모두 HW UART 사용.

---

## 11. 최종 통합 펌웨어 구조 (2026-06-07 저녁) ⭐⭐⭐⭐

### TX 노드 (lora_tx_water_level) — time-multiplexed HW UART

`firmware/lora_tx_water_level/` — Modbus + LoRa 모두 HW UART 사용 (정확성 우선)

#### 페리퍼럴 분배

| 페리퍼럴 | 핀 | 용도 | 비고 |
|---|---|---|---|
| **NRF_UARTE0** (default = LoRa) | P0.11 TX / P0.13 RX | **LoRa E22 (HW UART, 정확성)** | PSEL runtime 변경으로 임시 RS485 |
| (NRF_UARTE0 임시 모드) | P0.15 TX / P0.02 RX | RS485 Modbus (HW UART, 정확성) | uart_to_rs485() 호출 시 |
| SPI0 MOSI (SW-UART) | P0.06 | USB-VCOM display (9600) | cosmetic (corruption 있음) |
| SPI2 MOSI (SW-UART) | P0.22 | Debug TX3 (115200) | corruption 없음 |
| SPI1 | — | **disabled** (P0.11 충돌 방지) | |
| GPIO | P0.17/P0.19/P0.20 | LoRa M0/M1/AUX (Normal mode) | M0=M1=LOW |
| GPIO | P0.24 | MAX485 DE/RE | auto-DE/RE 가정 |
| GPIO | P0.04 | Relay (1Hz 대신 3s 토글) | |
| LED | P0.18/P0.23 | RED/BLUE | ACTIVE_LOW |

#### Cycle 패턴 (3초)

```c
while (1) {
    // === RS485 phase (임시) ===
    uart_to_rs485();      // PSEL: P0.11/P0.13 → P0.15/P0.02
    rs485_send(modbus_req, 8);
    rx_n = modbus_wait_response(resp, 16, 200ms);
    
    if (CRC OK) {
        snprintf(msg, "tx<N>:<level>\r\n");
        
        // === LoRa phase (default 복원) ===
        uart_to_lora();   // PSEL: P0.15/P0.02 → P0.11/P0.13
        uart_send(msg, len);
        k_msleep(50);     // LoRa air time
        sw_uart_write(tx4, msg, len);  // USB-VCOM display
    }
    
    // LED + Relay toggle
    k_msleep(3000 - elapsed);  // cycle 끝 = LoRa 상태 (default)
}
```

#### PSEL 변경 함수 (핵심)

```c
static void uart_switch_pins(uint32_t tx_pin, uint32_t rx_pin)
{
    uart_irq_rx_disable(uart0);
    NRF_UARTE0->TASKS_STOPRX = 1;
    NRF_UARTE0->TASKS_STOPTX = 1;
    k_busy_wait(200);

    NRF_UARTE0->ENABLE = 0;
    NRF_UARTE0->PSEL.TXD = tx_pin;
    NRF_UARTE0->PSEL.RXD = rx_pin;
    NRF_UARTE0->ENABLE = 8;

    NRF_UARTE0->TASKS_STARTRX = 1;  /* ⭐ 필수 — Zephyr driver 자동 안 함 */

    uart_irq_rx_enable(uart0);
    k_busy_wait(2000);  /* settle */
}
```

### RX 노드 (lora_rx_display) — LoRa HW UART RX + echo

`firmware/lora_rx_display/` — 받은 메시지 그대로 USB-VCOM에 표시

| 페리퍼럴 | 핀 | 용도 |
|---|---|---|
| **NRF_UARTE0** | P0.11 TX / P0.13 RX | LoRa E22 (HW UART, 정확성) |
| SPI0 MOSI (SW-UART) | P0.06 | USB-VCOM display (9600) |
| GPIO | P0.17/P0.19/P0.20 | LoRa M0/M1/AUX |

### 메시지 포맷

| 채널 | 포맷 | 예시 |
|---|---|---|
| LoRa over-the-air | `tx<N>:<센서값>\r\n` | `tx1:373\r\n` |
| TX USB-VCOM display | 동일 (+ phase markers `R`, `L`) | `c29 R n=7 L tx1:373` |
| RX USB-VCOM display | 받은 그대로 echo | `tx1:373` |

→ TX 노드 ID는 빌드 시 `#define TX_NODE_ID 1` (1, 2, 3 변경 가능, 9 노드 확장 base)

### E22 register 설정 (양쪽 동일, 자동 setup)

```c
static const uint8_t target_cfg[9] = {
    0x00, 0x00, 0x00,  /* ADDH, ADDL, NETID */
    0x60,              /* REG0: 9600 baud + 0.3 kbps air (max range) */
    0x00,              /* REG1: TX 30 dBm max */
    0x48,              /* REG2: CH 72 = 922.125 MHz Korea ISM */
    0x80,              /* REG3: RSSI byte ON + transparent */
    0x00, 0x00,        /* CRYPT */
};
```

부팅 시 e22_config() 자동 호출 → 차이 있으면 write → verify → 다시 Normal mode 복귀.

### 박제된 함정 3가지 (메모리)

| # | 함정 | 메모리 |
|:-:|---|---|
| 1 | **PSEL runtime 변경 시 TASKS_STARTRX 명시 trigger 필수** | `feedback_nrf_uarte_psel_time_mux.md` |
| 2 | **E22 두 모드별 baud 다름** — Config(9600 고정) / Normal(REG0 SPED) | `feedback_e22_900t_config_baud.md` |
| 3 | **SW-UART 9600 bit 3 corruption** (cosmetic, 'L'→'D', 'x'→'p' 등) | `wiki/log.md` 박제 |

### Design pattern: default = main role

| 항목 | 적용 |
|---|---|
| overlay `uart0_default` | LoRa (P0.11/P0.13) |
| 부팅 직후 상태 | LoRa |
| `uart_to_rs485()` 의미 | 임시 phase로 변경 |
| `uart_to_lora()` 의미 | default로 복원 |
| sleep 중 상태 | 항상 LoRa |
| Modbus FAIL case | LoRa로 자동 복원 (cycle 끝 보장) |

본 pattern은 **time-multiplexed 페리퍼럴이 두 가지 역할 가질 때 main role을 default로 두고 보조 role을 임시로 처리**하는 일반 패턴. 다른 LoRa 노드 / 다른 골프장 / 다른 SI 시공 시 재사용 가능.

```bash
# fd7087f5 main.c + overlay 복원 (working tree 보존 후 별도 변형본으로):
git show fd7087f5:project/골프_수조_물관리/firmware/bleModule_uart_test/src/main.c \
  > project/골프_수조_물관리/firmware/bleModule_uart_test/src/main_7ch.c
git show fd7087f5:project/골프_수조_물관리/firmware/bleModule_uart_test/boards/nrf52dk_nrf52832.overlay \
  > project/골프_수조_물관리/firmware/bleModule_uart_test/boards/nrf52dk_nrf52832_7ch.overlay
```

---

## 10. 외부 점퍼 검증 절차 (재현 가능)

| Step | 점퍼 | 기대 결과 |
|:-:|---|---|
| 1 | TX1 ↔ RX1 (J28 Pin 1 ↔ Pin 3) | TX3에서 `RX1: TX1: N\r\n` 1Hz 출력 |
| 2 | TX2 ↔ RX2 (J28 Pin 2 ↔ Pin 4) | TX3에서 `RX2: TX2: N\r\n` 1Hz 출력 |
| 3 | TX4 → PCA10040 USB-VCOM | HyperTerminal에서 `TX4: N` 1Hz 출력 |
| 4 | USB-VCOM 키 입력 → RX4 | TX3에서 `RX4: x\r\n` echo |
| 5 | LoRa (Pin 1↔Pin 3 점퍼 제거 후 E22-900T 외부 결선) | E22 register read/write 정상 + 점대점 송수신 |

---

## 관련 파일

- 회로도: `references/bleModule.pdf` (UTTEC 2022.09.22)
- 검증 펌웨어: `firmware/bleModule_uart_test/` (fd7087f5 시점, 7-channel 통합)
- LoRa baseline driver: `oldProject/test/bleModule/lora_e22/` (2026-05-19 갱신)
- 양산 reference: `oldProject/test/bleModule_lora_tx/` (LED·INA219·SAADC 통합)
- 통합 PINMAP 원본: `oldProject/test/bleModule/PINMAP.md` (전체 칩 핀 표 포함)
- 시공 entity: `myWiki/second-brain/entities/한림용인cc-고가수조.md`
- 진행 로그: `wiki/log.md`
