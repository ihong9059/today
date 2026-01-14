# ESP8266 D1 Mini + RC522 RFID 스펙

## 1. ESP8266 D1 Mini 사양

### 기본 정보
| 항목 | 값 |
|------|-----|
| MCU | ESP8266EX (Tensilica L106) |
| 클럭 | 80/160 MHz |
| Flash | 4MB |
| SRAM | 80KB (명령) + 32KB (데이터) |
| WiFi | 802.11 b/g/n |
| USB-Serial | CH340G |
| 동작 전압 | 3.3V |
| 입력 전압 | 5V (USB) |
| 크기 | 34.2mm x 25.6mm |

### D1 Mini 핀맵

```
                    ┌──────────────────┐
                    │    [USB PORT]    │
                    │                  │
              RST ──┤ RST          TX ├── GPIO1 (TX)
               A0 ──┤ A0           RX ├── GPIO3 (RX)
    GPIO16    D0  ──┤ D0           D1 ├── GPIO5  (SCL)
    GPIO14    D5  ──┤ D5 (SCK)     D2 ├── GPIO4  (SDA)  ◄── RC522 RST
    GPIO12    D6  ──┤ D6 (MISO)    D3 ├── GPIO0  (FLASH)
    GPIO13    D7  ──┤ D7 (MOSI)    D4 ├── GPIO2  (LED)
    GPIO15    D8  ──┤ D8 (SS)     GND ├── GND
             3V3 ──┤ 3V3          5V ├── 5V
                    │                  │
                    └──────────────────┘

        ◄── RC522 연결 핀 표시
```

### SPI 핀 (하드웨어 SPI)
| 기능 | D1 Mini 핀 | GPIO |
|------|-----------|------|
| MOSI | D7 | GPIO13 |
| MISO | D6 | GPIO12 |
| SCK  | D5 | GPIO14 |
| SS   | D8 | GPIO15 |

### 주의 핀
| 핀 | GPIO | 주의사항 |
|----|------|---------|
| D3 | GPIO0 | 부팅 시 HIGH 필요, LOW면 플래시 모드 |
| D4 | GPIO2 | 부팅 시 HIGH 필요, 내장 LED |
| D8 | GPIO15 | 부팅 시 LOW 필요, 외부 풀업 금지 |
| D0 | GPIO16 | PWM/I2C 미지원 |

---

## 2. D1 Mini + RC522 배선

### 연결 다이어그램

```
      D1 Mini                          RC522 RFID
    ┌─────────────┐                  ┌─────────────┐
    │             │                  │             │
    │       3.3V ─┼──────────────────┼─ 3.3V       │
    │             │                  │             │
    │        GND ─┼──────────────────┼─ GND        │
    │             │                  │             │
    │   D8(GPIO15)┼──────────────────┼─ SDA (SS)   │
    │             │                  │             │
    │   D5(GPIO14)┼──────────────────┼─ SCK        │
    │             │                  │             │
    │   D7(GPIO13)┼──────────────────┼─ MOSI       │
    │             │                  │             │
    │   D6(GPIO12)┼──────────────────┼─ MISO       │
    │             │                  │             │
    │   D2(GPIO4) ┼──────────────────┼─ RST        │
    │             │                  │             │
    │             │      (미사용) ───┼─ IRQ        │
    │             │                  │             │
    └─────────────┘                  └─────────────┘
```

### 핀 연결표

| RC522 핀 | D1 Mini 핀 | GPIO | 색상 권장 |
|----------|-----------|------|----------|
| **3.3V** | 3V3 | - | 빨강 |
| **GND** | GND | - | 검정 |
| **SDA** | D8 | GPIO15 | 주황 |
| **SCK** | D5 | GPIO14 | 노랑 |
| **MOSI** | D7 | GPIO13 | 초록 |
| **MISO** | D6 | GPIO12 | 파랑 |
| **RST** | D2 | GPIO4 | 보라 |
| **IRQ** | - | - | 미연결 |

---

## 3. ESP32 vs D1 Mini 비교

| 항목 | ESP32-DEVKIT_V4 | D1 Mini |
|------|-----------------|---------|
| CPU | Dual Core 240MHz | Single Core 80MHz |
| RAM | 520KB | 80KB |
| Flash | 4MB | 4MB |
| GPIO | 34개 | 11개 |
| ADC | 18채널 (12bit) | 1채널 (10bit) |
| Bluetooth | 있음 | 없음 |
| 전력 소모 | 높음 | 낮음 |
| 크기 | 큼 | 작음 |
| 가격 | ~$5 | ~$3 |

### RC522 연결 핀 비교

| RC522 핀 | ESP32 | D1 Mini |
|----------|-------|---------|
| SDA (SS) | GPIO5 | GPIO15 (D8) |
| SCK | GPIO18 | GPIO14 (D5) |
| MOSI | GPIO23 | GPIO13 (D7) |
| MISO | GPIO19 | GPIO12 (D6) |
| RST | GPIO4 | GPIO4 (D2) |

---

## 4. D1 Mini 주의사항

1. **D8 (GPIO15) 부팅 문제**:
   - 부팅 시 LOW 필요
   - RC522 SDA 연결 시 문제 가능
   - 해결: 10K 저항으로 GND 풀다운 추가

2. **메모리 제한**:
   - ESP32보다 RAM 적음
   - 큰 데이터 처리 시 주의

3. **3.3V 전류 제한**:
   - 최대 ~500mA
   - RC522 + 기타 센서 동시 사용 시 주의

4. **업로드 시 D3/D4 상태**:
   - D3(GPIO0): 업로드 시 LOW 필요 (버튼으로 자동 처리)
   - D4(GPIO2): HIGH 유지 필요
