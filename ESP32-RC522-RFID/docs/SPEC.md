# ESP32-DEVKIT_V4 + RC522 RFID 프로젝트 스펙

## 1. ESP32-DEVKIT_V4 사양

### 기본 정보
| 항목 | 값 |
|------|-----|
| MCU | ESP32-D0WD-V3 (Dual-core Xtensa LX6) |
| 클럭 | 240 MHz |
| Flash | 4MB |
| SRAM | 520KB |
| WiFi | 802.11 b/g/n |
| Bluetooth | BT 4.2, BLE |
| USB-Serial | CP2102 |
| 동작 전압 | 3.3V |
| 입력 전압 | 5V (USB) |

### 핀맵 (38핀 버전)

```
                        ┌─────────────────────┐
                        │      [USB-C]        │
                        │                     │
               3V3  ────┤ 3V3            GND ├──── GND
                EN  ────┤ EN             D23 ├──── GPIO23 (MOSI) ◄── RC522
    (ADC)     VP/36 ────┤ VP             D22 ├──── GPIO22 (SCL)
    (ADC)     VN/39 ────┤ VN              TX ├──── GPIO1  (TX0)
    (ADC)      D34  ────┤ D34             RX ├──── GPIO3  (RX0)
    (ADC)      D35  ────┤ D35            D21 ├──── GPIO21 (SDA)
              D32  ────┤ D32            GND ├──── GND
              D33  ────┤ D33            D19 ├──── GPIO19 (MISO) ◄── RC522
              D25  ────┤ D25            D18 ├──── GPIO18 (SCK)  ◄── RC522
              D26  ────┤ D26             D5 ├──── GPIO5  (SS)   ◄── RC522
              D27  ────┤ D27            D17 ├──── GPIO17 (TX2)
              D14  ────┤ D14            D16 ├──── GPIO16 (RX2)
              D12  ────┤ D12             D4 ├──── GPIO4  (RST)  ◄── RC522
              GND  ────┤ GND             D0 ├──── GPIO0  (BOOT)
              D13  ────┤ D13             D2 ├──── GPIO2  (LED)
               D9  ────┤ D9             D15 ├──── GPIO15
              D10  ────┤ D10             D8 ├──── GPIO8
              D11  ────┤ D11             D7 ├──── GPIO7
               5V  ────┤ 5V              D6 ├──── GPIO6
                        │                     │
                        └─────────────────────┘
```

### SPI 핀 (VSPI - 기본)
| 기능 | GPIO |
|------|------|
| MOSI | GPIO23 |
| MISO | GPIO19 |
| SCK  | GPIO18 |
| SS   | GPIO5 (사용자 지정 가능) |

---

## 2. RC522 RFID 모듈 사양

### 기본 정보
| 항목 | 값 |
|------|-----|
| 칩셋 | MFRC522 (NXP) |
| 주파수 | 13.56 MHz |
| 프로토콜 | ISO/IEC 14443 A/MIFARE |
| 인터페이스 | SPI / I2C / UART |
| 동작 전압 | 3.3V |
| 동작 전류 | 13~26mA |
| 대기 전류 | 10~13mA |
| 읽기 거리 | ~5cm |
| 데이터 전송률 | 10Mbit/s |

### RC522 핀아웃
```
┌─────────────────┐
│    RC522 RFID   │
│                 │
│  SDA ──────────── SS (Slave Select)
│  SCK ──────────── SPI Clock
│  MOSI ─────────── SPI Master Out
│  MISO ─────────── SPI Master In
│  IRQ ──────────── Interrupt (미사용)
│  GND ──────────── Ground
│  RST ──────────── Reset
│  3.3V ─────────── Power (3.3V만!)
│                 │
└─────────────────┘
```

### 지원 카드/태그
| 타입 | 설명 |
|------|------|
| MIFARE Classic 1K | 1KB 메모리, 16섹터 |
| MIFARE Classic 4K | 4KB 메모리, 40섹터 |
| MIFARE Ultralight | 64 bytes |
| MIFARE Mini | 320 bytes |

### MIFARE Classic 1K 메모리 구조
```
섹터 0:  블록 0 (제조사 블록 - 읽기 전용)
         블록 1 (데이터)
         블록 2 (데이터)
         블록 3 (키 A + 접근비트 + 키 B)

섹터 1-15: 동일 구조 (각 4블록)
           - 블록 0,1,2: 데이터 (각 16바이트)
           - 블록 3: 트레일러 (키/접근제어)

총 용량: 1024 bytes (실제 사용 가능: 752 bytes)
```

---

## 3. 통신 프로토콜

### SPI 설정
| 파라미터 | 값 |
|---------|-----|
| Mode | SPI_MODE0 |
| Bit Order | MSBFIRST |
| Clock | 최대 10MHz |
| Data Size | 8 bits |

### 기본 명령어
| 명령 | 설명 |
|------|------|
| PICC_REQIDL | 유휴 상태 카드 찾기 |
| PICC_REQALL | 모든 카드 찾기 |
| PICC_ANTICOLL | 충돌 방지 |
| PICC_AUTHENT1A | 키 A 인증 |
| PICC_AUTHENT1B | 키 B 인증 |
| PICC_READ | 블록 읽기 (16바이트) |
| PICC_WRITE | 블록 쓰기 (16바이트) |

---

## 4. 주의사항

1. **전압**: RC522는 **반드시 3.3V**로 구동 (5V 연결 시 손상)
2. **섹터 0 블록 0**: 제조사 데이터 (UID 등) - 쓰기 금지
3. **트레일러 블록**: 각 섹터의 마지막 블록 (블록 3, 7, 11...) - 키 저장용
4. **기본 키**: 새 카드의 기본 키는 `0xFF 0xFF 0xFF 0xFF 0xFF 0xFF`
5. **안테나**: RC522 보드의 안테나 주변에 금속 배치 금지
