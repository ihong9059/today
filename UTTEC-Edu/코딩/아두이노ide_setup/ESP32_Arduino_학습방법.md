# ESP32 Arduino 학습 방법 설명서

## 개요

본 교육 코스는 **AI 프롬프트 기반 학습법**을 사용합니다.
학습자는 제공된 프롬프트를 AI에게 입력하고, AI가 생성한 코드를 Arduino IDE에서 실행합니다.

---

## 1. 필요한 준비물

### 하드웨어
- **ESP32-WROOM 교육보드** (UTTEC IoT 보드)
- USB 케이블 (Type-C 또는 Micro USB)
- PC (Windows/Mac/Linux)

### 소프트웨어
- **Arduino IDE 2.x** 또는 1.8.x
- ESP32 보드 매니저 설치
- 필요 라이브러리 설치

### AI 서비스 (택 1)
- [Claude](https://claude.ai) - 권장
- [Gemini](https://gemini.google.com)
- [ChatGPT](https://chat.openai.com)

---

## 2. Arduino IDE 설정

### ESP32 보드 추가
1. Arduino IDE 열기
2. File > Preferences
3. Additional Board Manager URLs에 추가:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
4. Tools > Board > Board Manager
5. "esp32" 검색 후 설치

### 보드 선택
- Tools > Board > ESP32 Arduino > **ESP32 Dev Module**

### 필수 라이브러리 설치
Sketch > Include Library > Manage Libraries에서 설치:
- Adafruit SSD1306
- Adafruit GFX Library
- Adafruit AHTX0
- WebSockets
- ArduinoJson
- PubSubClient

---

## 3. 학습 진행 방법

### Step 1: 프롬프트 복사
각 Day의 레슨 페이지에서 제공되는 프롬프트를 복사합니다.

### Step 2: 포트설명서 첨부 (권장)
프롬프트와 함께 `ESP32_회로도_분석_보고서.md` 파일을 AI에게 첨부합니다.
이렇게 하면 AI가 정확한 핀 번호와 제어 방식을 적용한 코드를 생성합니다.

### Step 3: AI에게 입력
선택한 AI 서비스(Claude/Gemini/ChatGPT)에 프롬프트를 입력합니다.

### Step 4: 코드 분리 저장
AI 응답에서 파일 구분자를 찾아 각 파일로 저장합니다:

```
===== 파일: main.ino =====
(여기 코드를 main.ino로 저장)
===== 파일 끝 =====

===== 파일: led_control.h =====
(여기 코드를 led_control.h로 저장)
===== 파일 끝 =====
```

### Step 5: Arduino IDE에서 열기
1. 새 스케치 생성 (File > New)
2. main.ino 내용 붙여넣기
3. 탭 추가 (우측 상단 ▼ > New Tab)
4. 파일명 입력 (예: led_control.h)
5. 해당 코드 붙여넣기
6. 모든 파일에 대해 반복

### Step 6: 컴파일 및 업로드
1. Tools > Port에서 ESP32 포트 선택
2. Sketch > Verify/Compile (Ctrl+R) - 오류 확인
3. Sketch > Upload (Ctrl+U) - 보드에 업로드

### Step 7: 동작 확인
1. Tools > Serial Monitor (Ctrl+Shift+M)
2. Baud Rate: 115200 설정
3. 출력 메시지 확인
4. 하드웨어 동작 확인 (LED, 부저 등)

---

## 4. 파일 구조 이해

### 왜 파일을 분리하는가?
- **재사용성**: 같은 모듈을 여러 프로젝트에서 사용
- **가독성**: 코드가 길어져도 관리 용이
- **협업**: 팀 프로젝트에서 역할 분담 가능
- **실무 패턴**: 실제 개발 환경과 동일한 구조

### 일반적인 구조
```
project_name/
├── main.ino              # 메인 프로그램 (setup, loop)
├── config.h              # 핀 정의, 상수
├── module_name.h         # 모듈 헤더 (함수 선언)
├── module_name.cpp       # 모듈 구현 (함수 정의)
└── README.md             # 프로젝트 설명
```

### 헤더 파일 (.h)
```cpp
// led_control.h
#ifndef LED_CONTROL_H
#define LED_CONTROL_H

void initLEDs();
void setLED(int pin, bool state);
void blinkLED(int pin, int times, int delayMs);

#endif
```

### 구현 파일 (.cpp)
```cpp
// led_control.cpp
#include "led_control.h"
#include "config.h"
#include <Arduino.h>

void initLEDs() {
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);
}

void setLED(int pin, bool state) {
  digitalWrite(pin, state ? HIGH : LOW);
}

void blinkLED(int pin, int times, int delayMs) {
  for (int i = 0; i < times; i++) {
    setLED(pin, true);
    delay(delayMs);
    setLED(pin, false);
    delay(delayMs);
  }
}
```

### 메인 파일 (.ino)
```cpp
// main.ino
#include "config.h"
#include "led_control.h"

void setup() {
  Serial.begin(115200);
  initLEDs();
  Serial.println("ESP32 Ready!");
}

void loop() {
  blinkLED(LED_RED, 3, 500);
  delay(1000);
}
```

---

## 5. 하드웨어 핀 정보

### GPIO 핀맵 (빠른 참조)

| 장치 | GPIO | 제어 방식 |
|------|------|-----------|
| RED LED | 25 | HIGH=켜짐 |
| YELLOW LED | 26 | HIGH=켜짐 |
| BLUE LED | 27 | HIGH=켜짐 |
| SWITCH | 32 | LOW=눌림 |
| BEEP 부저 | 14 | 직접 구동 |
| MELODY 부저 | 33 | 트랜지스터 |
| I2C SDA | 21 | - |
| I2C SCL | 22 | - |

### I2C 장치 주소
| 장치 | 주소 |
|------|------|
| OLED 디스플레이 | 0x3C |
| AHT20 온습도 센서 | 0x38 |

### 중요 사항
- **LED는 Active HIGH**: `digitalWrite(LED_RED, HIGH)` = LED 켜짐
- **스위치는 Active LOW**: 버튼 누르면 `digitalRead(SWITCH) == LOW`
- **입력 전용 핀**: GPIO 34, 35, 36, 39는 출력으로 사용 불가

---

## 6. 문제 해결

### 컴파일 오류
1. 라이브러리가 설치되어 있는지 확인
2. 헤더 파일 include 경로 확인
3. 함수 선언과 정의가 일치하는지 확인

### 업로드 오류
1. 올바른 포트가 선택되었는지 확인
2. ESP32 드라이버 설치 확인
3. USB 케이블 연결 상태 확인
4. BOOT 버튼을 누른 상태로 업로드 시도

### LED가 안 켜짐
1. 핀 번호가 맞는지 확인 (RED=25, YELLOW=26, BLUE=27)
2. pinMode(pin, OUTPUT) 설정 확인
3. digitalWrite(pin, HIGH) 확인 (Active HIGH)

### 버튼 인식 안 됨
1. SWITCH 핀은 GPIO 32
2. Active LOW: 눌렀을 때 LOW
3. pinMode(32, INPUT) 설정 필요

### 센서 인식 안 됨
1. I2C 스캔 코드로 주소 확인
2. SDA=21, SCL=22 연결 확인
3. Wire.begin(21, 22) 호출 확인

---

## 7. 학습 팁

### 효과적인 학습 순서
1. **먼저 프롬프트를 그대로 실행**하여 동작 확인
2. **코드를 읽고 주석 이해**
3. **작은 수정**을 해보며 변화 관찰
4. **스스로 응용** 프로젝트 시도

### AI 활용 팁
- 오류가 발생하면 오류 메시지를 AI에게 보여주세요
- "이 코드를 설명해줘"라고 요청하면 상세 설명을 받을 수 있습니다
- "기능을 추가해줘"라고 요청하여 확장할 수 있습니다

### 추천 학습 자세
- 코드를 복사만 하지 말고, 한 줄씩 이해하려고 노력하세요
- 동작을 예측한 후 실행해서 확인하세요
- 모르는 함수는 바로 검색하거나 AI에게 물어보세요

---

## 8. 다음 단계

### 초급 완료 후
- 중급에서 WiFi AP, 데이터 저장, LoRa 통신 학습
- 실제 IoT 프로젝트 구현

### 고급 완료 후
- 클라우드 서비스 연동 (AWS, Firebase, ThingSpeak)
- 저전력 설계 및 배터리 구동
- PCB 설계 및 제품화

---

**작성자:** Claude
**작성일:** 2025-01-01
**버전:** 1.0
