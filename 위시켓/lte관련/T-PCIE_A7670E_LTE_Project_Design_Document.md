# T-PCIE A7670E LTE Cat1 통신 모듈 기반 IoT 디바이스 설계서

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | A7670E 기반 LTE Cat1 IoT 통신 디바이스 개발 |
| **사용 플랫폼** | LILYGO T-PCIE + T-A7670E R2 모듈 |
| **개발 목적** | LTE Cat1 통신을 활용한 저전력 IoT 데이터 전송 시스템 구축 |
| **통신 방식** | 4G LTE Cat1 / Wi-Fi / Bluetooth / GPS(옵션) |

---

## 1. 하드웨어 구성

### 1.1 T-PCIE 메인 보드 사양

| 구성요소 | 사양 |
|----------|------|
| **메인 MCU** | ESP32-WROVER-B/E |
| **Flash 메모리** | 4MB / 16MB (선택) |
| **PSRAM** | 8MB |
| **SRAM** | 520KB |
| **USB-TTL 변환** | CH9102F |
| **전원 관리 IC** | AXP2101 |
| **보드 크기** | 75 × 33 × 10.5mm |
| **무게** | 14.5g |

### 1.2 T-A7670E R2 LTE 모듈 사양

| 항목 | 사양 |
|------|------|
| **모듈 타입** | LTE Cat1 SMT 모듈 |
| **제조사** | SIMCom |
| **패키지 크기** | 24 × 24 × 2.4mm |
| **동작 전압** | 3.4V ~ 4.2V |
| **동작 온도** | -40°C ~ +85°C |
| **다운로드 속도** | 최대 10 Mbps |
| **업로드 속도** | 최대 5 Mbps |
| **GPRS/EDGE** | 236.8 Kbps (DL/UL) |

### 1.3 제품 변형 옵션

| 모델명 | GPS | 대상 지역 |
|--------|-----|-----------|
| **T-A7670E R2** | 선택 | 유럽, 중동, 한국, 태국 |
| **T-A7670G R2** | 선택 | 글로벌 (GNSS 내장) |
| **T-A7670SA R2** | 선택 | 남미, 뉴질랜드, 호주 |

---

## 2. 지원 주파수 대역

### 2.1 A7670E (유럽/아시아 버전)

| 네트워크 | 주파수 대역 |
|----------|-------------|
| **LTE-FDD** | B1 / B3 / B5 / B7 / B8 / B20 |
| **GSM/GPRS/EDGE** | 900 / 1800 MHz |

### 2.2 A7670SA (남미/호주 버전)

| 네트워크 | 주파수 대역 |
|----------|-------------|
| **LTE-FDD** | B1 / B2 / B3 / B4 / B5 / B7 / B8 / B28 / B66 |
| **GSM/GPRS/EDGE** | 850 / 900 / 1800 / 1900 MHz |

### 2.3 A7670G (글로벌 버전)

| 네트워크 | 주파수 대역 |
|----------|-------------|
| **LTE-FDD** | B1 / B2 / B3 / B4 / B5 / B7 / B8 / B20 / B28 / B66 |
| **GSM/GPRS/EDGE** | 850 / 900 / 1800 / 1900 MHz |

---

## 3. 통신 인터페이스

### 3.1 무선 통신

#### Wi-Fi (ESP32)
| 항목 | 사양 |
|------|------|
| **표준** | 802.11 b/g/n |
| **주파수** | 2.4GHz |
| **최대 속도** | 150 Mbps |

#### Bluetooth (ESP32)
| 항목 | 사양 |
|------|------|
| **버전** | Bluetooth v4.2 BR/EDR + BLE |
| **감도** | -97 dBm |

#### GPS/GNSS (옵션)
| 항목 | 사양 |
|------|------|
| **지원 시스템** | GPS / GLONASS / BDS |
| **모드** | Standalone / Assisted GPS |

### 3.2 유선 인터페이스

| 인터페이스 | 설명 |
|------------|------|
| **USB Type-C** | 프로그래밍 및 전원 공급 |
| **Mini PCIe 슬롯** | LTE 모듈 연결 |
| **UART** | 시리얼 통신 (AT 명령) |
| **I2C** | 센서 연결용 |
| **SPI** | 고속 주변장치 연결 |
| **GPIO** | 12개 디지털 I/O (PWM 지원) |
| **ADC** | 8채널 (12-bit 해상도) |
| **Nano SIM 슬롯** | 1.8V / 3V SIM 카드 지원 |
| **TF 카드 슬롯** | 데이터 저장 확장 |

---

## 4. 전원 시스템

### 4.1 전원 사양

| 항목 | 사양 |
|------|------|
| **USB 입력** | 5V / 1A |
| **배터리 입력** | 3.7V ~ 4.2V |
| **충전 전류** | 500mA |
| **동작 전압** | 2.7V ~ 3.6V |
| **슬립 모드 전류** | 약 700μA |
| **피크 전류** | 최대 2A |
| **배터리 타입** | 18650 리튬이온 |
| **전원 관리 IC** | AXP2101 |

### 4.2 전원 보호 기능

- USB 및 Wi-Fi 원활한 통합
- 저전력 모드 지원 (VBAT 핀)
- 과충전/과방전 보호
- 안정적인 전원 공급 보장

---

## 5. 시스템 아키텍처

### 5.1 블록 다이어그램

```
┌─────────────────────────────────────────────────────────────────────┐
│                        T-PCIE Main Board                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────┐         ┌─────────────────────────────┐    │
│  │    ESP32-WROVER    │         │     Mini PCIe Slot          │    │
│  │                    │  UART   │   ┌─────────────────────┐   │    │
│  │  - Dual Core       │◄───────►│   │   T-A7670E R2       │   │    │
│  │    240MHz          │         │   │   LTE Cat1 Module   │   │    │
│  │  - WiFi 802.11bgn  │         │   │                     │   │    │
│  │  - BT 4.2          │         │   │  - LTE Cat1         │   │    │
│  │  - 4/16MB Flash    │         │   │  - GSM/GPRS/EDGE    │   │    │
│  │  - 8MB PSRAM       │         │   │  - GPS (Optional)   │   │    │
│  └─────────┬──────────┘         │   └─────────────────────┘   │    │
│            │                    └─────────────────────────────┘    │
│            │                                                        │
│  ┌─────────▼──────────┐         ┌─────────────────────────────┐    │
│  │    USB Type-C      │         │       AXP2101               │    │
│  │    (CH9102F)       │         │    Power Management         │    │
│  │   Programming      │         │                             │    │
│  └────────────────────┘         └──────────────┬──────────────┘    │
│                                                │                    │
│  ┌────────────────┐  ┌────────────────┐  ┌─────▼──────────────┐    │
│  │  Nano SIM      │  │   TF Card      │  │  18650 Battery     │    │
│  │  Slot          │  │   Slot         │  │  Holder            │    │
│  └────────────────┘  └────────────────┘  └────────────────────┘    │
│                                                                     │
│  ┌────────────────┐  ┌────────────────┐                            │
│  │  LTE Antenna   │  │  GPS Antenna   │                            │
│  └────────────────┘  └────────────────┘                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 모듈 호환성

T-PCIE 보드는 다양한 통신 모듈과 호환됩니다:

| 모듈 시리즈 | 통신 방식 |
|-------------|-----------|
| **A7670X** | LTE Cat1 |
| **A7608X-H** | LTE Cat4 |
| **SIM7600X** | LTE Cat4 |
| **SIM7070X** | LTE Cat-M / NB-IoT |
| **SIM7080X** | LTE Cat-M / NB-IoT |
| **SIM7000X** | LTE Cat-M / NB-IoT |
| **SIM7020X** | NB-IoT |
| **SIM868** | GSM/GPRS + GPS |

---

## 6. 소프트웨어 구성

### 6.1 개발 환경

| 항목 | 내용 |
|------|------|
| **IDE** | Arduino IDE / PlatformIO / ESP-IDF |
| **Framework** | ESP-IDF / Arduino Core for ESP32 |
| **AT 명령 호환** | SIM7500/SIM7600 시리즈 호환 |
| **프로토콜 지원** | MQTT, HTTP, TCP/UDP, FTP, SMS |

### 6.2 주요 AT 명령어

```c
// 모듈 초기화 및 상태 확인
AT                          // 모듈 응답 확인
AT+CPIN?                    // SIM 카드 상태 확인
AT+CSQ                      // 신호 강도 확인
AT+CREG?                    // 네트워크 등록 상태
AT+CGDCONT=1,"IP","<APN>"   // APN 설정

// LTE 네트워크 연결
AT+CGACT=1,1                // PDP Context 활성화
AT+CGPADDR                  // IP 주소 확인

// GPS 제어 (GPS 버전만)
AT+CGNSSPWR=1               // GPS 전원 켜기
AT+CGNSSINFO                // GPS 위치 정보 조회
AT+CGNSSPWR=0               // GPS 전원 끄기

// HTTP 통신
AT+HTTPINIT                 // HTTP 초기화
AT+HTTPPARA="URL","<URL>"   // URL 설정
AT+HTTPACTION=0             // GET 요청
AT+HTTPACTION=1             // POST 요청
AT+HTTPREAD                 // 응답 읽기
AT+HTTPTERM                 // HTTP 종료

// MQTT 통신
AT+CMQTTSTART               // MQTT 클라이언트 시작
AT+CMQTTACCQ=0,"<clientID>" // 클라이언트 획득
AT+CMQTTCONNECT=0,"<broker>",60,1  // 브로커 연결
AT+CMQTTSUB=0,"<topic>",1   // 토픽 구독
AT+CMQTTPUB=0,"<topic>",1,0 // 메시지 발행

// SMS 전송
AT+CMGF=1                   // 텍스트 모드 설정
AT+CMGS="<phone_number>"    // SMS 전송
```

### 6.3 예제 코드 (Arduino)

```cpp
#include <HardwareSerial.h>

// 핀 정의
#define MODEM_TX    27
#define MODEM_RX    26
#define MODEM_PWRKEY 4
#define MODEM_RST   5

HardwareSerial SerialAT(1);

void setup() {
    Serial.begin(115200);
    SerialAT.begin(115200, SERIAL_8N1, MODEM_RX, MODEM_TX);

    // 모뎀 초기화
    pinMode(MODEM_PWRKEY, OUTPUT);
    pinMode(MODEM_RST, OUTPUT);

    // 모뎀 리셋
    digitalWrite(MODEM_RST, LOW);
    delay(100);
    digitalWrite(MODEM_RST, HIGH);
    delay(100);

    // 모뎀 전원 켜기
    digitalWrite(MODEM_PWRKEY, LOW);
    delay(1500);
    digitalWrite(MODEM_PWRKEY, HIGH);

    delay(10000);  // 모뎀 부팅 대기

    Serial.println("A7670E LTE Module Test");

    // 기본 AT 명령 테스트
    sendATCommand("AT", 1000);
    sendATCommand("AT+CPIN?", 2000);
    sendATCommand("AT+CSQ", 1000);
    sendATCommand("AT+CREG?", 1000);
    sendATCommand("AT+CGREG?", 1000);
}

void loop() {
    // 모뎀 응답 출력
    while (SerialAT.available()) {
        Serial.write(SerialAT.read());
    }
    // 시리얼 입력을 모뎀으로 전달
    while (Serial.available()) {
        SerialAT.write(Serial.read());
    }
}

String sendATCommand(const char* cmd, int timeout) {
    Serial.print("Send: ");
    Serial.println(cmd);

    SerialAT.println(cmd);

    long startTime = millis();
    String response = "";

    while (millis() - startTime < timeout) {
        while (SerialAT.available()) {
            char c = SerialAT.read();
            response += c;
        }
    }

    Serial.print("Response: ");
    Serial.println(response);
    return response;
}

// HTTP GET 요청 예제
void httpGet(const char* url) {
    sendATCommand("AT+HTTPINIT", 2000);

    char cmd[256];
    sprintf(cmd, "AT+HTTPPARA=\"URL\",\"%s\"", url);
    sendATCommand(cmd, 2000);

    sendATCommand("AT+HTTPACTION=0", 10000);  // GET
    delay(5000);
    sendATCommand("AT+HTTPREAD", 5000);
    sendATCommand("AT+HTTPTERM", 2000);
}

// GPS 위치 조회 (GPS 버전)
void getGPSLocation() {
    sendATCommand("AT+CGNSSPWR=1", 2000);     // GPS ON
    delay(30000);                              // GPS Fix 대기
    sendATCommand("AT+CGNSSINFO", 2000);       // 위치 조회
    sendATCommand("AT+CGNSSPWR=0", 2000);     // GPS OFF
}
```

### 6.4 MQTT 통신 예제

```cpp
void connectMQTT(const char* broker, int port, const char* clientId) {
    // MQTT 시작
    sendATCommand("AT+CMQTTSTART", 3000);

    // 클라이언트 획득
    char cmd[128];
    sprintf(cmd, "AT+CMQTTACCQ=0,\"%s\"", clientId);
    sendATCommand(cmd, 2000);

    // 브로커 연결
    sprintf(cmd, "AT+CMQTTCONNECT=0,\"tcp://%s:%d\",60,1", broker, port);
    sendATCommand(cmd, 10000);
}

void publishMQTT(const char* topic, const char* message) {
    char cmd[256];

    // 토픽 설정
    sprintf(cmd, "AT+CMQTTTOPIC=0,%d", strlen(topic));
    sendATCommand(cmd, 1000);
    SerialAT.print(topic);
    delay(500);

    // 페이로드 설정
    sprintf(cmd, "AT+CMQTTPAYLOAD=0,%d", strlen(message));
    sendATCommand(cmd, 1000);
    SerialAT.print(message);
    delay(500);

    // 발행
    sendATCommand("AT+CMQTTPUB=0,1,60", 5000);
}

void subscribeMQTT(const char* topic) {
    char cmd[128];
    sprintf(cmd, "AT+CMQTTSUB=0,\"%s\",1", topic);
    sendATCommand(cmd, 3000);
}
```

---

## 7. 응용 분야

### 7.1 적용 가능 프로젝트

| 분야 | 응용 예시 |
|------|-----------|
| **차량 추적** | GPS 기반 실시간 위치 추적 시스템 |
| **원격 모니터링** | 필드 센서 데이터 수집 및 전송 |
| **POS 시스템** | 무선 결제 단말기 |
| **산업용 라우터** | 원격지 네트워크 연결 |
| **스마트 미터링** | 전력/가스/수도 원격 검침 |
| **보안 시스템** | 알람 및 감시 시스템 |
| **농업 IoT** | 스마트팜 환경 모니터링 |
| **헬스케어** | 원격 환자 모니터링 |

### 7.2 LTE Cat1 vs Cat4 비교

| 항목 | LTE Cat1 (A7670E) | LTE Cat4 (SIM7600E) |
|------|-------------------|---------------------|
| **다운로드 속도** | 10 Mbps | 150 Mbps |
| **업로드 속도** | 5 Mbps | 50 Mbps |
| **전력 소모** | 낮음 | 높음 |
| **비용** | 저렴 | 고가 |
| **적합 용도** | 저속 IoT, 센서 데이터 | 고속 데이터, 영상 전송 |

### 7.3 프로젝트 특장점

- **저전력 설계**: LTE Cat1의 낮은 전력 소모로 배터리 수명 연장
- **비용 효율성**: Cat4 대비 저렴한 모듈 비용
- **다중 통신**: LTE + WiFi + Bluetooth 동시 지원
- **GPS 통합**: 옵션으로 위치 기반 서비스 구현 가능
- **모듈 확장성**: T-PCIE의 Mini PCIe 슬롯으로 다양한 모듈 교체 가능
- **글로벌 호환**: 지역별 주파수 대역 지원 모델 선택 가능
- **산업용 온도 범위**: -40°C ~ +85°C

---

## 8. 핀 맵 (Pin Configuration)

### 8.1 ESP32 ↔ A7670E 연결

| ESP32 GPIO | A7670E | 기능 |
|------------|--------|------|
| GPIO 27 | TXD | UART TX |
| GPIO 26 | RXD | UART RX |
| GPIO 4 | PWRKEY | 전원 제어 |
| GPIO 5 | RST | 리셋 |
| GPIO 36 | RI | Ring Indicator |
| GPIO 39 | DTR | Data Terminal Ready |

### 8.2 T-PCIE GPIO 핀아웃

| GPIO | 기능 |
|------|------|
| GPIO 2 | Status LED |
| GPIO 12 | ADC Channel |
| GPIO 13 | SD Card CS |
| GPIO 14 | SD Card CLK |
| GPIO 15 | SD Card CMD |
| GPIO 32 | Battery ADC |
| GPIO 33 | PWM Output |
| GPIO 34 | ADC Input Only |
| GPIO 35 | ADC Input Only |

---

## 9. 인증 및 규격

| 인증 | 설명 |
|------|------|
| **CE** | 유럽 적합성 인증 |
| **RoHS** | 유해물질 사용 제한 |
| **REACH** | 화학물질 등록 및 평가 |

---

## 10. 구성품 목록

### GPS 포함 버전
- T-A7670E R2 모듈 × 1
- GPS 안테나 × 1
- LTE 안테나 × 1
- PH2.0mm 전원 케이블 × 1
- 핀 헤더 × 2

### GPS 미포함 버전
- T-A7670E R2 모듈 × 1
- LTE 안테나 × 1
- PH2.0mm 전원 케이블 × 1
- 핀 헤더 × 2

> **참고**: 18650 배터리 및 SIM 카드는 미포함

---

## 11. 참고 자료

### 11.1 공식 문서

- [LILYGO T-A7670E/G/SA R2 제품 페이지](https://lilygo.cc/products/t-sim-a7670e)
- [LILYGO T-PCIE 제품 페이지](https://lilygo.cc/products/a-t-pcie)
- [LilyGO-T-A76XX GitHub Repository](https://github.com/Xinyuan-LilyGO/LilyGO-T-A76XX)
- [A7670 Series Hardware Design Datasheet](https://nostris.ee/pdf/A7670%20Series%20Hardware%20Design_V1.00.pdf)

### 11.2 관련 튜토리얼

- [Random Nerd Tutorials - LILYGO T-A7670G Getting Started](https://randomnerdtutorials.com/lilygo-ttgo-t-a7670g-a7670e-a7670sa-esp32/)

### 11.3 관련 라이브러리

- [TinyGSM Library](https://github.com/vshymanskyy/TinyGSM)
- [ESP32 Arduino Core](https://github.com/espressif/arduino-esp32)

---

## 12. 개발 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v1.0 | - | 초기 설계 문서 작성 |

---

## 13. 라이선스 및 저작권

이 문서는 포트폴리오 목적으로 작성되었습니다.

- 하드웨어 플랫폼: LILYGO
- LTE 모듈: SIMCom A7670E/A7670SA

---

*본 문서는 A7670E LTE Cat1 모듈을 활용한 IoT 프로젝트 설계를 위해 작성되었습니다.*
