# UTTEC BLE Module — UART pinmap 검증 펌웨어

UART0 (P0.06 TX / P0.08 RX) @ 9600 8N1 로 **매 1초 카운터 증가** 송신 + LED 2개 토글.

## 목적

`oldProject/test/bleModule/PINMAP.md` + `bleModule_lora_tx` reference로 확정된 UTTEC BLE Module 핀맵 (특히 UART0 = P0.06/P0.08, LED P0.18·P0.23) 실측 검증.

## 결선

| UTTEC BLE J23 | 신호 | 연결 |
|:-:|---|---|
| Pin 1 | VDD_3V | PCA10056 VTG_3V3 (또는 외장 3.3V) |
| **Pin 2** | **TX (P0.06)** | **USB-UART RX** ⭐ |
| Pin 3 | RX (P0.08) | (TX 검증만이면 미연결) |
| Pin 4 | GND | USB-UART GND + 외장 PSU GND 공통 |

SWD는 별도 (J-Link OB ↔ UTTEC BLE Module SWDIO/SWDCLK).

## 빌드 환경 (NCS v2.9.2)

```bash
export ZEPHYR_BASE=C:/ncs/v2.9.2/zephyr
export ZEPHYR_SDK_INSTALL_DIR=C:/ncs/toolchains/b620d30767/opt/zephyr-sdk
export PATH="/c/ncs/toolchains/b620d30767/opt/bin/Scripts:/c/Program Files/SEGGER/JLink_V818:$PATH"
```

## 빌드 & 플래시 (한글 경로 우회 — ASCII로 복사)

```bash
mkdir -p /c/uttec_uart_test
cp -r "C:/todo/today/project/골프_수조_물관리/firmware/bleModule_uart_test/"* /c/uttec_uart_test/
cd /c/uttec_uart_test
west build -b nrf52dk/nrf52832 --pristine
west flash --runner jlink --dev-id 1050234191
```

## 검증 방법

1. USB-UART (CP210x / CH340 등) 9600 8N1 터미널 열기
2. UTTEC BLE Module J23 Pin 2 (P0.06) → USB-UART RX 연결
3. GND 공통 (J23 Pin 4 + USB-UART GND + 외장 PSU GND)
4. 전원 ON (PCA10056 SW6 또는 외장)
5. 터미널에서 다음 출력 확인:

```
UTTEC BLE Module UART pinmap test (UART0 9600 8N1, P0.06 TX)
0
1
2
3
...
```

매 1초마다 1씩 증가. LED 2개 (BLUE D21 P0.23 + RED D22 P0.18)도 동시에 토글.

## 트러블슈팅

| 증상 | 원인 가능성 | 조치 |
|---|---|---|
| 터미널 출력 없음, LED 안 깜빡 | 펌웨어 미실행, 전원 미공급 | PCA10056 VTG 공급 확인, SW6 ON, 와이어 |
| LED만 깜빡, UART 없음 | UART TX 핀 매핑 오류 (P0.06 ≠ 실제 TX) | 다른 핀에 SW-UART (`main_scan` 활용) |
| UART는 OK, LED 안 깜빡 | LED net 매핑 오류 (P0.18/P0.23 ≠ 실제 LED) | `main_scan` 27 GPIO 토글로 식별 |
| 깨진 문자 (gibberish) | baud rate 불일치 또는 GND 미공통 | 터미널 9600 재설정, GND 공통화 |

## 다음 단계

본 펌웨어로 핀맵 검증 OK 후:
1. `wiki/log.md`에 검증 결과 박제
2. UART1 (RS485 sensor용) 추가 → 별도 펌웨어 또는 본 펌웨어 확장
3. RS485 MAX485 + QDY30A-B 통합 단계 진입
