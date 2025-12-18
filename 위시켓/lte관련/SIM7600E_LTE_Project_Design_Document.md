# SIM7600E LTE 통신 모듈 기반 IoT 디바이스 설계서

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | SIM7600E 기반 LTE IoT 통신 디바이스 개발 |
| **사용 플랫폼** | LILYGO T-SIM7600E-H ESP32 개발보드 |
| **개발 목적** | LTE Cat4 통신을 활용한 원격 IoT 데이터 전송 시스템 구축 |
| **통신 방식** | 4G LTE / Wi-Fi / Bluetooth / GPS |

---

## 1. 하드웨어 구성

### 1.1 메인 보드 사양

| 구성요소 | 사양 |
|----------|------|
| **메인 MCU** | ESP32-WROVER-B |
| **LTE 모듈** | SIMCom SIM7600E-H |
| **Flash 메모리** | 4MB |
| **PSRAM** | 8MB |
| **USB-TTL 변환** | CP2104 |
| **클럭 속도** | 40MHz |
| **보드 크기** | 111mm × 37mm × 20mm |
| **무게** | 50g |

### 1.2 SIM7600E-H LTE 모듈 상세 사양

| 항목 | 사양 |
|------|------|
| **모듈 타입** | LTE Cat4 SMT 모듈 |
| **패키지 크기** | 30 × 30 × 2.9mm |
| **동작 전압** | 3.4V ~ 4.2V (권장 3.8V) |
| **동작 온도** | -40°C ~ +85°C |
| **다운로드 속도** | 최대 150 Mbps |
| **업로드 속도** | 최대 50 Mbps |

### 1.3 지원 주파수 대역 (유럽/아시아 버전)

| 네트워크 | 주파수 대역 |
|----------|-------------|
| **LTE-FDD** | B1 / B3 / B5 / B7 / B8 / B20 |
| **LTE-TDD** | B38 / B40 |
| **UMTS/HSPA+** | B1 / B8 |
| **GSM/GPRS/EDGE** | 900 / 1800 MHz |

---

## 2. 통신 인터페이스

### 2.1 무선 통신

#### Wi-Fi
| 항목 | 사양 |
|------|------|
| **표준** | 802.11 b/g/n |
| **주파수** | 2.4GHz ~ 2.5GHz |
| **최대 속도** | 150 Mbps |
| **송신 출력** | 22 dBm |
| **통신 거리** | 최대 300m |
| **인증** | FCC / CE / RED / IC / TELEC / KCC / SRRC / NCC |

#### Bluetooth
| 항목 | 사양 |
|------|------|
| **버전** | Bluetooth v4.2 BR/EDR + BLE |
| **감도** | -97 dBm |
| **송신 클래스** | Class 1, 2, 3 지원 |

#### GPS/GNSS
| 항목 | 사양 |
|------|------|
| **지원 시스템** | GPS / GLONASS |
| **기본 모드** | Standalone Mode |
| **AT 명령** | AT+CGPS로 제어 |

### 2.2 유선 인터페이스

| 인터페이스 | 설명 |
|------------|------|
| **USB Type-C #1** | ESP32 프로그래밍 및 디버깅용 |
| **USB Type-C #2** | SIM7600E USB 동글/네트워크 카드 모드 |
| **UART** | 시리얼 통신 |
| **I2C** | 센서 연결용 |
| **SPI** | 고속 주변장치 연결 |
| **SDIO** | SD 카드 인터페이스 |
| **I2S** | 오디오 인터페이스 |
| **CAN** | 차량용 네트워크 |
| **GPIO** | 범용 입출력 |

---

## 3. 전원 시스템

### 3.1 전원 사양

| 항목 | 사양 |
|------|------|
| **입력 전압** | 5V (USB) |
| **태양광 입력** | 4.4V ~ 6V |
| **동작 전류** | 약 200mA |
| **충전 전류** | 780mA |
| **배터리 타입** | 18650 리튬이온 |
| **슬립 모드 전류** | 최저 300μA |

### 3.2 전원 보호 기능

- 배터리 역극성 보호
- 과충전 보호
- 과방전 보호
- GPS 전원 제어를 통한 저전력 최적화

---

## 4. 시스템 블록 다이어그램

```
┌─────────────────────────────────────────────────────────────────┐
│                    LILYGO T-SIM7600E-H                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐         ┌──────────────────┐                 │
│  │   ESP32      │  UART   │   SIM7600E-H     │                 │
│  │   WROVER-B   │◄───────►│   LTE Module     │                 │
│  │              │         │                  │                 │
│  │  - WiFi      │         │  - LTE Cat4      │                 │
│  │  - BT 4.2    │         │  - GNSS          │                 │
│  │  - 4MB Flash │         │  - Voice/SMS     │                 │
│  │  - 8MB PSRAM │         │                  │                 │
│  └──────┬───────┘         └────────┬─────────┘                 │
│         │                          │                            │
│         │                          │                            │
│  ┌──────▼───────┐         ┌────────▼─────────┐                 │
│  │  USB Type-C  │         │   USB Type-C     │                 │
│  │  (CP2104)    │         │   (USB Dongle)   │                 │
│  │  Programming │         │   Network Card   │                 │
│  └──────────────┘         └──────────────────┘                 │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Nano SIM     │  │  TF Card     │  │  18650       │          │
│  │ Slot         │  │  Slot        │  │  Battery     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │ LTE Antenna  │  │ GPS Antenna  │                            │
│  └──────────────┘  └──────────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. 소프트웨어 구성

### 5.1 개발 환경

| 항목 | 내용 |
|------|------|
| **IDE** | Arduino IDE / PlatformIO |
| **Framework** | ESP-IDF / Arduino Core |
| **AT 명령 제어** | TinyGSM 라이브러리 |
| **프로토콜 지원** | MQTT, HTTP, TCP/UDP, FTP |

### 5.2 주요 AT 명령어

```c
// LTE 연결 초기화
AT+CGDCONT=1,"IP","<APN>"    // APN 설정
AT+CGACT=1,1                  // PDP Context 활성화
AT+NETOPEN                    // 네트워크 연결

// GPS 제어
AT+CGPS=1,1                   // GPS 활성화 (Standalone 모드)
AT+CGPSINFO                   // GPS 위치 정보 조회
AT+CGPS=0                     // GPS 비활성화

// HTTP 통신
AT+HTTPINIT                   // HTTP 초기화
AT+HTTPPARA="URL","<URL>"     // URL 설정
AT+HTTPACTION=0               // GET 요청
AT+HTTPREAD                   // 응답 읽기

// MQTT 통신
AT+CMQTTSTART                 // MQTT 시작
AT+CMQTTCONNECT=<clientID>,<server>  // 브로커 연결
AT+CMQTTPUB=<topic>,<msg>     // 메시지 발행
AT+CMQTTSUB=<topic>           // 토픽 구독
```

### 5.3 예제 코드 (Arduino)

```cpp
#include <HardwareSerial.h>

#define MODEM_TX 27
#define MODEM_RX 26
#define MODEM_PWRKEY 4

HardwareSerial SerialAT(1);

void setup() {
    Serial.begin(115200);
    SerialAT.begin(115200, SERIAL_8N1, MODEM_RX, MODEM_TX);

    // 모뎀 전원 켜기
    pinMode(MODEM_PWRKEY, OUTPUT);
    digitalWrite(MODEM_PWRKEY, HIGH);
    delay(1000);
    digitalWrite(MODEM_PWRKEY, LOW);

    delay(5000);  // 모뎀 부팅 대기

    // AT 명령 테스트
    sendATCommand("AT", 1000);
    sendATCommand("AT+CPIN?", 1000);
    sendATCommand("AT+CSQ", 1000);
    sendATCommand("AT+CREG?", 1000);
}

void loop() {
    // 모뎀 응답 확인
    while (SerialAT.available()) {
        Serial.write(SerialAT.read());
    }
    while (Serial.available()) {
        SerialAT.write(Serial.read());
    }
}

String sendATCommand(const char* cmd, int timeout) {
    SerialAT.println(cmd);
    delay(timeout);
    String response = "";
    while (SerialAT.available()) {
        response += (char)SerialAT.read();
    }
    Serial.println(response);
    return response;
}
```

---

## 6. 응용 분야

### 6.1 적용 가능 프로젝트

| 분야 | 응용 예시 |
|------|-----------|
| **스마트 농업** | 원격 환경 모니터링, 관개 시스템 제어 |
| **자산 추적** | GPS 기반 차량/물류 추적 |
| **원격 감시** | CCTV 데이터 전송, 보안 시스템 |
| **스마트 미터링** | 전력/가스/수도 원격 검침 |
| **헬스케어** | 원격 환자 모니터링 디바이스 |
| **산업 IoT** | 공장 설비 원격 모니터링 |

### 6.2 프로젝트 특장점

- **다중 통신**: LTE + WiFi + Bluetooth 동시 지원으로 유연한 네트워크 구성
- **저전력 설계**: 태양광 충전 및 슬립 모드로 장기 운용 가능
- **GPS 통합**: 위치 기반 서비스 구현 용이
- **USB 동글 모드**: PC 연결 시 무선 네트워크 카드로 활용 가능
- **확장성**: 다양한 인터페이스(I2C, SPI, UART)로 센서 확장 용이

---

## 7. 핀 맵 (Pin Configuration)

### 7.1 ESP32 ↔ SIM7600E 연결

| ESP32 GPIO | SIM7600E | 기능 |
|------------|----------|------|
| GPIO 27 | TXD | UART TX |
| GPIO 26 | RXD | UART RX |
| GPIO 4 | PWRKEY | 전원 제어 |
| GPIO 5 | RST | 리셋 |
| GPIO 36 | RI | Ring Indicator |

### 7.2 기타 핀 연결

| GPIO | 기능 |
|------|------|
| GPIO 2 | Status LED |
| GPIO 13 | SD Card CS |
| GPIO 14 | SD Card CLK |
| GPIO 15 | SD Card MOSI |
| GPIO 32 | Battery ADC |

---

## 8. 참고 자료

### 8.1 공식 문서

- [LILYGO T-SIM7600 제품 페이지](https://lilygo.cc/products/t-sim7600)
- [LilyGO GitHub Repository](https://github.com/Xinyuan-LilyGO/LilyGo-Modem-Series)
- [SIM7600 Series Hardware Design Datasheet](https://datasheet.lcsc.com/lcsc/2204131800_SIMCom-Wireless-Solutions-SIM7600E_C2995536.pdf)

### 8.2 관련 라이브러리

- [TinyGSM Library](https://github.com/vshymanskyy/TinyGSM)
- [ESP32 Arduino Core](https://github.com/espressif/arduino-esp32)

---

## 9. 개발 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v1.0 | - | 초기 설계 문서 작성 |

---

## 10. 라이선스 및 저작권

이 문서는 포트폴리오 목적으로 작성되었습니다.

- 하드웨어 플랫폼: LILYGO
- LTE 모듈: SIMCom SIM7600E-H

---

*본 문서는 SIM7600E LTE 모듈을 활용한 IoT 프로젝트 설계를 위해 작성되었습니다.*
