# ESP32 Arduino 교육 커리큘럼

**보드:** ESP32-WROOM (UTTEC IoT 교육보드)
**언어:** C/C++ (Arduino 프레임워크)
**총 기간:** 90일 (초급 15일 + 중급 30일 + 고급 45일)

---

## 학습 방법

### AI 프롬프트 기반 학습
1. 각 Day의 프롬프트를 Claude/Gemini/ChatGPT에 입력
2. AI가 생성한 코드를 `===== 파일: xxx =====` 구분자로 파일별 저장
3. Arduino IDE에서 컴파일 및 업로드
4. 코드를 이해하고 수정해보기

### 코드 저장 방법
```
AI 응답 예시:
===== 파일: main.ino =====
(메인 코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(헤더 파일)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(구현 파일)
===== 파일 끝 =====
```
→ 각 구분자 사이의 코드를 해당 파일명으로 저장
→ Arduino IDE에서 새 탭으로 파일 추가

### 포트설명서 참조
모든 프롬프트에는 `ESP32_회로도_분석_보고서.md` 파일을 첨부하여 핀 번호와 제어 방법을 AI가 참조하도록 합니다.

---

# 하드웨어 구성 요약

## GPIO 핀맵

| 장치 | GPIO | 방향 | 제어 | 비고 |
|------|------|------|------|------|
| **RED LED** | 25 | OUTPUT | **HIGH=켜짐** | 100Ω 저항 |
| **YELLOW LED** | 26 | OUTPUT | **HIGH=켜짐** | 100Ω 저항 |
| **BLUE LED** | 27 | OUTPUT | **HIGH=켜짐** | 100Ω 저항 |
| **SWITCH** | 32 | INPUT | **LOW=눌림** | 100nF 디바운싱 |
| **BEEP (버저1)** | 14 | OUTPUT | 직접 구동 | |
| **MELODY (버저2)** | 33 | OUTPUT | BCX56 트랜지스터 | 고전류 구동 |
| **SDA (I2C)** | 21 | I/O | 10KΩ 풀업 | |
| **SCL (I2C)** | 22 | OUTPUT | 10KΩ 풀업 | |

## I2C 장치

| 장치 | 주소 | 설명 |
|------|------|------|
| OLED | 0x3C | 128x64 SSD1306 |
| AHT20 | 0x38 | 온습도 센서 |

## LoRa 모듈 (UART2)

| GPIO | 신호 | 기능 |
|------|------|------|
| 17 | TXD2 | ESP32 → LoRa |
| 16 | RXD2 | LoRa → ESP32 |
| 15 | M0 | 모드 설정 비트 0 |
| 4 | M1 | 모드 설정 비트 1 |
| 34 | AUX | 상태 입력 |

---

# 초급 과정 (15일)

> **목표:** GPIO 기본 제어, 센서 읽기, 웹 기초

## Part 1: GPIO 기본 (Day 1-5)

### Day 1: 환경설정 및 Hello World
- **학습 목표:** Arduino IDE 설정, ESP32 보드 추가
- **프로젝트:** 시리얼 모니터 출력
- **파일 구조:**
  ```
  day01_hello/
  ├── main.ino              # 메인 프로그램
  └── README.md
  ```
- **기능:**
  - Arduino IDE ESP32 보드 설치
  - Serial.begin(), Serial.println()
  - Hello World 출력

### Day 2: LED 켜기/끄기
- **학습 목표:** GPIO 출력, digitalWrite()
- **프로젝트:** LED 제어
- **파일 구조:**
  ```
  day02_led/
  ├── main.ino              # 메인 프로그램
  ├── led_control.h         # LED 제어 헤더
  ├── led_control.cpp       # LED 제어 구현
  └── README.md
  ```
- **기능:**
  - RED LED(GPIO25) 켜기/끄기
  - **Active HIGH**: digitalWrite(pin, HIGH)가 LED 켜짐
  - 1초 간격 깜빡이기

### Day 3: 신호등 만들기
- **학습 목표:** 순차 제어, delay()
- **프로젝트:** 3색 신호등
- **파일 구조:**
  ```
  day03_traffic/
  ├── main.ino
  ├── traffic_light.h
  ├── traffic_light.cpp
  └── README.md
  ```
- **기능:**
  - 3색 LED 순차 점등 (RED→YELLOW→BLUE)
  - 신호등 타이밍 (빨강 3초, 노랑 1초, 파랑 3초)
  - 시리얼 모니터에 현재 상태 출력

### Day 4: 버튼 입력 처리
- **학습 목표:** GPIO 입력, digitalRead(), 풀다운
- **프로젝트:** 버튼으로 LED 토글
- **파일 구조:**
  ```
  day04_button/
  ├── main.ino
  ├── button.h
  ├── button.cpp
  ├── led_control.h
  ├── led_control.cpp
  └── README.md
  ```
- **기능:**
  - SWITCH(GPIO32) 상태 읽기
  - **Active LOW**: 버튼 누르면 LOW
  - 버튼 누르면 LED 토글
  - 디바운싱 처리 (200ms)

### Day 5: 버튼 인터럽트와 부저
- **학습 목표:** 인터럽트, 이벤트 기반 프로그래밍
- **프로젝트:** 도어벨 시스템
- **파일 구조:**
  ```
  day05_doorbell/
  ├── main.ino
  ├── gpio_handler.h
  ├── gpio_handler.cpp
  └── README.md
  ```
- **기능:**
  - attachInterrupt() 사용
  - 버튼 누르면 BEEP 부저(GPIO14) 울림 + LED 깜빡임
  - 콜백 함수로 처리

---

## Part 2: PWM과 센서 (Day 6-10)

### Day 6: PWM LED 밝기 조절
- **학습 목표:** analogWrite, 듀티 사이클
- **프로젝트:** LED 페이더
- **파일 구조:**
  ```
  day06_pwm_led/
  ├── main.ino
  ├── pwm_control.h
  ├── pwm_control.cpp
  └── README.md
  ```
- **기능:**
  - ledcSetup(), ledcAttachPin(), ledcWrite()
  - 0~255 밝기 조절
  - 페이드 인/아웃 효과

### Day 7: 멜로디 연주
- **학습 목표:** tone(), 주파수
- **프로젝트:** 음계 연주기
- **파일 구조:**
  ```
  day07_melody/
  ├── main.ino
  ├── melody.h
  ├── melody.cpp
  └── README.md
  ```
- **기능:**
  - MELODY(GPIO33) PWM으로 도레미파솔라시도 연주
  - 주파수: C(262), D(294), E(330), F(349), G(392), A(440), B(494), C(523)
  - ledcWriteTone()

### Day 8: I2C 통신과 AHT20
- **학습 목표:** I2C 프로토콜, 센서 읽기
- **프로젝트:** 온습도 모니터
- **파일 구조:**
  ```
  day08_temperature/
  ├── main.ino
  ├── aht20_sensor.h
  ├── aht20_sensor.cpp
  └── README.md
  ```
- **기능:**
  - Wire 라이브러리 사용
  - AHT20 센서 (주소 0x38) 데이터 읽기
  - 온도/습도 2초 간격 출력

### Day 9: OLED 디스플레이
- **학습 목표:** I2C 디스플레이, 그래픽
- **프로젝트:** OLED Hello World
- **파일 구조:**
  ```
  day09_oled/
  ├── main.ino
  ├── oled_display.h
  ├── oled_display.cpp
  └── README.md
  ```
- **기능:**
  - Adafruit_SSD1306 라이브러리
  - OLED 주소 0x3C, 크기 128x64
  - "Hello ESP32!" 텍스트 출력

### Day 10: OLED에 센서 데이터 표시
- **학습 목표:** 센서 + 디스플레이 연동
- **프로젝트:** 온습도 디스플레이
- **파일 구조:**
  ```
  day10_sensor_display/
  ├── main.ino
  ├── aht20_sensor.h
  ├── aht20_sensor.cpp
  ├── oled_display.h
  ├── oled_display.cpp
  └── README.md
  ```
- **기능:**
  - AHT20 데이터를 OLED에 실시간 표시
  - 2초 간격 업데이트
  - 온도/습도 포맷팅

---

## Part 3: WiFi 기초 (Day 11-15)

### Day 11: WiFi 연결
- **학습 목표:** WiFi.h, AP/Station 모드
- **프로젝트:** WiFi 연결 테스트
- **파일 구조:**
  ```
  day11_wifi_connect/
  ├── main.ino
  ├── wifi_manager.h
  ├── wifi_manager.cpp
  ├── config.h
  └── README.md
  ```
- **기능:**
  - WiFi.begin() 연결
  - IP 주소 출력
  - 연결 상태 LED 표시

### Day 12: 웹서버 기초
- **학습 목표:** WebServer 라이브러리
- **프로젝트:** Hello World 웹서버
- **파일 구조:**
  ```
  day12_webserver/
  ├── main.ino
  ├── web_server.h
  ├── web_server.cpp
  └── README.md
  ```
- **기능:**
  - WebServer 객체 생성
  - "/" 라우트 처리
  - HTML 응답

### Day 13: 웹으로 LED 제어
- **학습 목표:** HTTP GET, URL 파라미터
- **프로젝트:** 웹 LED 제어
- **파일 구조:**
  ```
  day13_web_led/
  ├── main.ino
  ├── web_server.h
  ├── web_server.cpp
  ├── led_control.h
  ├── led_control.cpp
  └── README.md
  ```
- **기능:**
  - /led/on, /led/off 엔드포인트
  - 웹 버튼으로 LED 제어
  - 현재 상태 표시

### Day 14: 웹에 센서 데이터 표시
- **학습 목표:** JSON 응답, AJAX
- **프로젝트:** 센서 데이터 API
- **파일 구조:**
  ```
  day14_web_sensor/
  ├── main.ino
  ├── web_server.h
  ├── web_server.cpp
  ├── aht20_sensor.h
  ├── aht20_sensor.cpp
  └── README.md
  ```
- **기능:**
  - /api/sensor JSON 엔드포인트
  - 웹페이지에서 자동 갱신
  - Chart.js 그래프 (선택)

### Day 15: 초급 종합 프로젝트
- **프로젝트:** IoT 환경 모니터 v1
- **파일 구조:**
  ```
  day15_iot_monitor/
  ├── main.ino
  ├── config.h
  ├── wifi_manager.h
  ├── wifi_manager.cpp
  ├── web_server.h
  ├── web_server.cpp
  ├── led_control.h
  ├── led_control.cpp
  ├── aht20_sensor.h
  ├── aht20_sensor.cpp
  ├── oled_display.h
  ├── oled_display.cpp
  └── README.md
  ```
- **기능:**
  - 온습도 실시간 웹 표시
  - LED 원격 제어
  - OLED에 IP 주소 + 센서 데이터 표시
  - 버튼으로 부저 알림

---

# 중급 과정 (30일)

> **목표:** WiFi AP 모드, 데이터 저장, 스마트폰 앱 연동

## Part 4: WiFi AP와 고급 웹 (Day 16-25)

### Day 16-18: WiFi AP 모드
- WiFi.softAP() 핫스팟 생성
- 캡티브 포털 구현
- 모바일 설정 페이지

### Day 19-22: SPIFFS/LittleFS
- 파일 시스템 초기화
- HTML/CSS/JS 파일 저장
- 설정 파일 저장/로드

### Day 23-25: WebSocket 실시간 통신
- WebSocketsServer 라이브러리
- 실시간 센서 데이터 푸시
- 다중 클라이언트 동기화

---

## Part 5: LoRa 통신 (Day 26-35)

### Day 26-28: LoRa 모듈 기초
- UART2 통신 설정
- E32/E220 LoRa 모듈 초기화
- 모드 설정 (M0, M1)

### Day 29-32: LoRa 데이터 송수신
- 문자열 송신/수신
- 구조체 데이터 전송
- ACK 응답 시스템

### Day 33-35: LoRa 네트워크
- 멀티 노드 통신
- 브로드캐스트/유니캐스트
- 중계기 구현

---

## Part 6: 데이터 관리 (Day 36-45)

### Day 36-38: EEPROM/NVS
- 비휘발성 데이터 저장
- 설정값 영구 저장
- 부팅 시 자동 로드

### Day 39-42: SD 카드 로깅
- SD 카드 초기화 (SPI)
- 센서 데이터 CSV 저장
- 로그 파일 관리

### Day 43-45: 중급 종합 프로젝트
- **프로젝트:** IoT 환경 모니터 v2
- WiFi AP + WebSocket
- LoRa 원격 전송
- SD 카드 로깅

---

# 고급 과정 (45일)

> **목표:** 클라우드 연동, OTA 업데이트, 보안, 저전력

## Part 7: 클라우드 연동 (Day 46-55)

### Day 46-48: MQTT 기초
- PubSubClient 라이브러리
- 브로커 연결
- 발행/구독

### Day 49-52: Firebase 연동
- Firebase Realtime Database
- 센서 데이터 클라우드 저장
- 원격 제어 명령

### Day 53-55: ThingSpeak/Blynk
- ThingSpeak 채널 생성
- 데이터 시각화
- Blynk 앱 연동

---

## Part 8: 보안과 OTA (Day 56-65)

### Day 56-58: HTTPS 클라이언트
- WiFiClientSecure
- 인증서 처리
- 보안 API 호출

### Day 59-62: OTA 업데이트
- ArduinoOTA 라이브러리
- 웹 기반 펌웨어 업데이트
- 버전 관리

### Day 63-65: ESP-NOW
- 피어 투 피어 통신
- 브로드캐스트/유니캐스트
- 메시 네트워크 기초

---

## Part 9: 저전력과 최적화 (Day 66-75)

### Day 66-68: 딥슬립
- esp_sleep 함수
- 타이머 웨이크업
- 외부 인터럽트 웨이크업

### Day 69-72: FreeRTOS 기초
- 태스크 생성
- 세마포어/뮤텍스
- 큐 통신

### Day 73-75: 멀티코어 활용
- 듀얼 코어 태스크 분배
- Core 0/Core 1 활용
- 성능 최적화

---

## Part 10: 고급 프로젝트 (Day 76-90)

### Day 76-80: Home Assistant 연동
- MQTT Discovery
- 센서/스위치 엔티티
- 자동화 규칙

### Day 81-85: 최종 프로젝트 개발
- **프로젝트:** 스마트홈 IoT 허브
- 다중 센서 통합
- LoRa + WiFi + MQTT
- 모바일 앱 연동

### Day 86-90: 문서화 및 완성
- 코드 리팩토링
- 사용자 매뉴얼
- PCB 설계 기초 (선택)

---

# 부록

## A. Arduino 핀 정의 템플릿

```cpp
// config.h
#ifndef CONFIG_H
#define CONFIG_H

// LED 핀 (Active HIGH)
#define LED_RED     25
#define LED_YELLOW  26
#define LED_BLUE    27

// 입력
#define SWITCH      32   // Active LOW

// 부저
#define BEEP        14   // 직접 구동
#define MELODY      33   // 트랜지스터 구동

// I2C
#define I2C_SDA     21
#define I2C_SCL     22

// LoRa UART2
#define LORA_TX     17
#define LORA_RX     16
#define LORA_M0     15
#define LORA_M1     4
#define LORA_AUX    34

// I2C 주소
#define OLED_ADDR   0x3C
#define AHT20_ADDR  0x38

#endif
```

## B. 프롬프트 형식 예시

```
[Day X] ESP32 Arduino - 프로젝트명

프로젝트: (프로젝트 설명)

프로젝트 구조:
dayXX_project/
├── main.ino
├── module.h
├── module.cpp
└── README.md

요구사항:
1. (기능 요구사항)
2. (핀 번호 참조: 포트설명서)
3. (Active HIGH/LOW 제어 방식 명시)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: module.h =====
(코드)
===== 파일 끝 =====
```

## C. 라이브러리 설치 목록

```
Arduino IDE > 라이브러리 관리자:
- Adafruit SSD1306
- Adafruit GFX Library
- Adafruit AHT10 AHT20
- WebSockets
- PubSubClient
- ArduinoJson
- ESP32 AnalogWrite
```

---

**작성자:** Claude
**작성일:** 2025-01-01
**검토 요청:** 커리큘럼 수정 후 웹사이트 적용 진행
