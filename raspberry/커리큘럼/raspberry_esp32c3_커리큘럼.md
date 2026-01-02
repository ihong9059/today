# Raspberry Pi + ESP32-C3 교육 커리큘럼

**보드:** raspberry_esp32c3 (UTTEC Shield)
**언어:** Python (Backend: Flask), HTML/CSS/JavaScript (Frontend)
**총 기간:** 90일 (초급 15일 + 중급 30일 + 고급 45일)

---

## 학습 방법

### AI 프롬프트 기반 학습
1. 각 Day의 프롬프트를 Claude/Gemini/ChatGPT에 입력
2. AI가 생성한 코드를 `===== 파일: xxx =====` 구분자로 파일별 저장
3. Raspberry Pi에서 실행하여 결과 확인
4. 코드를 이해하고 수정해보기

### 코드 저장 방법
```
AI 응답 예시:
===== 파일: app.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: hardware.py =====
(코드 내용)
===== 파일 끝 =====
```
→ 각 구분자 사이의 코드를 해당 파일명으로 저장

### 포트설명서 참조
모든 프롬프트에는 `raspberry_esp32c3_포트설명서.md` 파일을 첨부하여 핀 번호와 제어 방법을 AI가 참조하도록 합니다.

---

# 초급 과정 (15일)

> **목표:** GPIO 기본 제어, 센서 읽기, 웹 기초

## Part 1: GPIO 기본 (Day 1-5)

### Day 1: 환경설정 및 Hello World
- **학습 목표:** Raspberry Pi 환경 설정, Python 기초
- **프로젝트:** 시스템 정보 출력 프로그램
- **파일 구조:**
  ```
  day01_hello/
  ├── main.py              # 메인 프로그램
  ├── system_info.py       # 시스템 정보 함수
  └── README.md
  ```
- **기능:**
  - Python 버전, 시스템 정보 출력
  - GPIO 라이브러리 설치 확인
  - 기본 print, 변수 사용

### Day 2: LED 켜기/끄기
- **학습 목표:** GPIO 출력, Active LOW 이해
- **프로젝트:** LED 제어 프로그램
- **파일 구조:**
  ```
  day02_led/
  ├── main.py              # 메인 프로그램
  ├── led.py               # LED 제어 모듈
  └── README.md
  ```
- **기능:**
  - RED LED(GPIO17) 켜기/끄기
  - **중요:** LOW=켜짐, HIGH=꺼짐 (Active LOW)
  - 1초 간격 깜빡이기

### Day 3: 신호등 만들기
- **학습 목표:** 순차 제어, time.sleep()
- **프로젝트:** 3색 신호등
- **파일 구조:**
  ```
  day03_traffic/
  ├── main.py              # 메인 프로그램
  ├── traffic_light.py     # 신호등 제어 모듈
  └── README.md
  ```
- **기능:**
  - 3색 LED 순차 점등 (RED→YELLOW→BLUE)
  - 신호등 타이밍 (빨강 3초, 노랑 1초, 파랑 3초)
  - 콘솔에 현재 상태 출력

### Day 4: 버튼 입력 처리
- **학습 목표:** GPIO 입력, 풀업 저항, Active LOW
- **프로젝트:** 버튼으로 LED 토글
- **파일 구조:**
  ```
  day04_button/
  ├── main.py
  ├── button.py            # 버튼 입력 모듈
  ├── led.py               # LED 모듈 재사용
  └── README.md
  ```
- **기능:**
  - SWITCH(GPIO4) 상태 읽기
  - 버튼 누르면 LED 토글
  - 디바운싱 처리 (200ms)

### Day 5: 버튼 인터럽트와 부저
- **학습 목표:** 인터럽트, 이벤트 기반 프로그래밍
- **프로젝트:** 도어벨 시스템
- **파일 구조:**
  ```
  day05_doorbell/
  ├── main.py
  ├── gpio_handler.py      # GPIO 통합 모듈
  └── README.md
  ```
- **기능:**
  - GPIO.add_event_detect() 사용
  - 버튼 누르면 부저(GPIO5) 울림 + LED 깜빡임
  - 콜백 함수로 처리

---

## Part 2: 센서와 디스플레이 (Day 6-10)

### Day 6: I2C 통신과 장치 스캔
- **학습 목표:** I2C 프로토콜, 버스 스캔
- **프로젝트:** I2C 장치 탐지기
- **파일 구조:**
  ```
  day06_i2c_scan/
  ├── main.py
  ├── i2c_utils.py         # I2C 유틸리티
  └── README.md
  ```
- **기능:**
  - smbus2 라이브러리 사용
  - I2C 버스 스캔하여 장치 목록 출력
  - AHT20(0x38), OLED(0x3C) 확인

### Day 7: 온습도 센서 (AHT20)
- **학습 목표:** I2C 센서 데이터 읽기
- **프로젝트:** 온습도 모니터
- **파일 구조:**
  ```
  day07_temperature/
  ├── main.py
  ├── aht20_sensor.py      # AHT20 센서 모듈
  └── README.md
  ```
- **기능:**
  - adafruit_ahtx0 라이브러리 사용
  - 온도/습도 값 2초 간격 읽기
  - 콘솔에 포맷팅된 출력

### Day 8: OLED 디스플레이 기초
- **학습 목표:** I2C 디스플레이, 텍스트 출력
- **프로젝트:** OLED Hello World
- **파일 구조:**
  ```
  day08_oled/
  ├── main.py
  ├── oled_display.py      # OLED 제어 모듈
  └── README.md
  ```
- **기능:**
  - adafruit_ssd1306 라이브러리 설정
  - "Hello UTTEC!" 텍스트 출력
  - 폰트 크기, 위치 조정

### Day 9: OLED에 센서 데이터 표시
- **학습 목표:** 센서 + 디스플레이 연동
- **프로젝트:** 온습도 디스플레이
- **파일 구조:**
  ```
  day09_sensor_display/
  ├── main.py
  ├── aht20_sensor.py
  ├── oled_display.py
  └── README.md
  ```
- **기능:**
  - AHT20 데이터를 OLED에 실시간 표시
  - 2초 간격 업데이트
  - 온도/습도 아이콘 또는 레이블

### Day 10: NeoPixel LED 기초
- **학습 목표:** WS2812 제어, RGB 색상
- **프로젝트:** 무지개 LED
- **파일 구조:**
  ```
  day10_neopixel/
  ├── main.py
  ├── neopixel_ctrl.py     # NeoPixel 제어 모듈
  └── README.md
  ```
- **기능:**
  - rpi_ws281x 라이브러리 사용 (GPIO12)
  - 4개 LED 개별 색상 제어
  - 무지개 색상 순환 애니메이션

---

## Part 3: 웹 기초 (Day 11-15)

### Day 11: Flask 웹서버 기초
- **학습 목표:** HTTP, Flask 기본
- **프로젝트:** Hello World 웹서버
- **파일 구조:**
  ```
  day11_flask_hello/
  ├── app.py               # Flask 앱
  ├── templates/
  │   └── index.html       # 메인 페이지
  └── README.md
  ```
- **기능:**
  - Flask 설치 및 기본 서버 구동
  - "Hello UTTEC!" 웹페이지
  - 라우팅 기초 (@app.route)

### Day 12: HTML/CSS 기초
- **학습 목표:** 프론트엔드 기초
- **프로젝트:** LED 제어 UI 디자인
- **파일 구조:**
  ```
  day12_html_css/
  ├── app.py
  ├── templates/
  │   └── index.html
  ├── static/
  │   └── style.css
  └── README.md
  ```
- **기능:**
  - LED 제어 버튼 UI
  - CSS 스타일링 (색상, 폰트, 레이아웃)
  - 반응형 디자인 기초

### Day 13: JavaScript와 AJAX
- **학습 목표:** DOM 조작, 비동기 통신
- **프로젝트:** 동적 LED 제어
- **파일 구조:**
  ```
  day13_javascript/
  ├── app.py
  ├── templates/
  │   └── index.html
  ├── static/
  │   ├── style.css
  │   └── script.js
  └── README.md
  ```
- **기능:**
  - fetch API로 서버 통신
  - 페이지 새로고침 없이 LED 제어
  - 버튼 상태 실시간 업데이트

### Day 14: 웹으로 LED 제어
- **학습 목표:** RESTful API, 하드웨어 연동
- **프로젝트:** 웹 LED 제어 시스템
- **파일 구조:**
  ```
  day14_web_led/
  ├── app.py
  ├── hardware.py          # GPIO 제어 모듈
  ├── templates/
  │   └── index.html
  ├── static/
  │   ├── style.css
  │   └── script.js
  └── README.md
  ```
- **기능:**
  - `/api/led/<color>/<state>` API 엔드포인트
  - 웹 UI에서 3색 LED ON/OFF
  - 현재 LED 상태 표시

### Day 15: 초급 종합 프로젝트
- **프로젝트:** 스마트 환경 모니터 v1
- **파일 구조:**
  ```
  day15_smart_monitor/
  ├── app.py
  ├── hardware.py
  ├── sensors.py           # 센서 모듈
  ├── display.py           # OLED 모듈
  ├── templates/
  │   └── index.html
  ├── static/
  │   ├── style.css
  │   └── script.js
  └── README.md
  ```
- **기능:**
  - 온습도 실시간 웹 표시
  - LED 원격 제어
  - 버튼 누르면 부저 + 웹 알림
  - OLED에 IP 주소 표시

---

# 중급 과정 (30일)

> **목표:** PWM 제어, ESP32 WiFi AP, 스마트폰 연동, 데이터베이스

## Part 4: PWM과 고급 출력 (Day 16-22)

### Day 16: PWM 기초 - LED 밝기 조절
- **프로젝트:** LED 페이더
- **기능:** 소프트웨어 PWM으로 LED 밝기 0~100% 조절

### Day 17: 스피커 톤 생성
- **프로젝트:** 음계 연주기
- **기능:** SPEAKER(GPIO13) PWM으로 도레미파솔라시도 연주

### Day 18: NeoPixel 고급 효과
- **프로젝트:** LED 애니메이션
- **기능:** 무지개 그라데이션, 숨쉬기 효과, 경찰차 사이렌

### Day 19: 온도 기반 LED 표시
- **프로젝트:** 온도 시각화
- **기능:** 온도에 따라 NeoPixel 색상 변경 (저온→파랑, 고온→빨강)

### Day 20: 알람 시스템
- **프로젝트:** 온도 알람
- **기능:** 임계값 초과 시 부저 + LED 경고, 웹에서 임계값 설정

### Day 21: OLED 그래픽
- **프로젝트:** 온도 게이지
- **기능:** Pillow로 도형 그리기, 온도 게이지 UI

### Day 22: OLED 멀티 화면
- **프로젝트:** 화면 전환 시스템
- **기능:** 버튼으로 화면 전환 (온습도/시계/IP정보)

---

## Part 5: ESP32-C3 WiFi AP 연동 (Day 23-32)

### Day 23: UART 통신 기초
- **프로젝트:** 시리얼 통신 테스트
- **기능:** pyserial로 RPi ↔ ESP32 문자열 송수신

### Day 24: ESP32-C3 Arduino 환경설정
- **프로젝트:** ESP32 LED Blink
- **기능:** Arduino IDE 설정, ESP32-C3 SuperMini 펌웨어

### Day 25: ESP32 WiFi AP 모드
- **프로젝트:** WiFi 핫스팟
- **기능:** SSID "UTTEC_SHIELD_AP" 생성, 스마트폰 연결

### Day 26: ESP32 웹서버
- **프로젝트:** ESP32 미니 웹서버
- **기능:** 192.168.4.1 웹페이지, HTML 버튼 LED 제어

### Day 27: RPi-ESP32 명령 프로토콜
- **프로젝트:** 통신 프로토콜 설계
- **기능:** JSON 명령어 정의 (LED_ON, GET_TEMP 등)

### Day 28: ESP32 AP + RPi 연동 (1)
- **프로젝트:** 3-Tier 아키텍처
- **기능:** 스마트폰 → ESP32 AP → RPi UART → 하드웨어

### Day 29: ESP32 AP + RPi 연동 (2)
- **프로젝트:** 실시간 데이터 전송
- **기능:** RPi 센서 데이터 → ESP32 → 스마트폰 표시

### Day 30: 모바일 친화적 UI
- **프로젝트:** 터치 UI
- **기능:** 반응형 디자인, 큰 버튼, 모바일 최적화

### Day 31: PC 브라우저 연동
- **프로젝트:** 대시보드
- **기능:** PC에서 접속, Chart.js 센서 그래프

### Day 32: 다중 클라이언트 처리
- **프로젝트:** 멀티 클라이언트
- **기능:** 여러 기기 동시 접속, 상태 동기화

---

## Part 6: 데이터 관리 (Day 33-45)

### Day 33: SQLite 데이터베이스
- **프로젝트:** 센서 DB
- **기능:** 온습도 테이블 생성, CRUD 쿼리

### Day 34: 센서 데이터 로깅
- **프로젝트:** 자동 로거
- **기능:** 1분 간격 자동 저장, 백그라운드 스레드

### Day 35: 데이터 조회 API
- **프로젝트:** History API
- **기능:** `/api/history?hours=24` JSON 반환

### Day 36: 웹 그래프 표시
- **프로젝트:** 데이터 시각화
- **기능:** Chart.js 시계열 그래프, 실시간 업데이트

### Day 37: 이벤트 로깅
- **프로젝트:** 이벤트 히스토리
- **기능:** 버튼/LED 이벤트 기록, 필터링

### Day 38: 설정 저장/불러오기
- **프로젝트:** 설정 관리자
- **기능:** config.json 저장, 부팅 시 자동 로드

### Day 39: 데이터 내보내기
- **프로젝트:** CSV 익스포터
- **기능:** 센서 데이터 CSV 다운로드

### Day 40-45: 중급 종합 프로젝트
- **프로젝트:** 스마트 환경 모니터 v2
- **기능:**
  - ESP32 AP로 스마트폰/PC 연결
  - 실시간 센서 모니터링 + 그래프
  - 데이터 로깅 및 CSV 내보내기
  - 알람 설정 및 이벤트 로그
  - 모바일 최적화 UI

---

# 고급 과정 (45일)

> **목표:** 실시간 통신, 보안, 자동화, 클라우드

## Part 7: 실시간 통신 (Day 46-55)

### Day 46-48: WebSocket
- Flask-SocketIO 설치 및 실시간 통신
- 센서 데이터 실시간 푸시
- LED 상태 다중 클라이언트 동기화

### Day 49-52: ESP32 실시간 통신
- ESP32 WebSocket 서버
- 실시간 양방향 통신
- 채팅 기능 구현

### Day 53-55: 자동화
- APScheduler 스케줄링
- 시나리오 자동화 (IF-THEN)
- 매크로 녹화/재생

---

## Part 8: 보안 및 인증 (Day 56-62)

### Day 56-58: 사용자 인증
- 로그인/로그아웃
- 세션 기반 인증
- 역할 기반 접근 제어

### Day 59-62: 보안 강화
- HTTPS 적용
- API 토큰 인증
- 입력 검증, 감사 로그

---

## Part 9: 고급 하드웨어 제어 (Day 63-72)

### Day 63-66: 고급 PWM/오디오
- 하드웨어 PWM (pigpio)
- WAV 파일 재생
- 멜로디 작곡기

### Day 67-69: 고급 디스플레이
- NeoPixel 고급 애니메이션
- OLED 애니메이션, 아날로그 시계
- 센서 캘리브레이션

### Day 70-72: 시스템 최적화
- 멀티스레딩
- asyncio 비동기 프로그래밍
- 시스템 모니터링

---

## Part 10: 클라우드 및 외부 연동 (Day 73-82)

### Day 73-75: 인터넷 연결
- ESP32 Station 모드
- 날씨 API 연동
- NTP 시간 동기화

### Day 76-78: MQTT
- Mosquitto 브로커
- MQTT 장치 제어
- Home Assistant 연동

### Day 79-82: 확장 기능
- 클라우드 데이터 저장
- PWA 모바일 앱
- 텔레그램 봇
- 음성 제어

---

## Part 11: 최종 프로젝트 (Day 83-90)

### Day 83: 프로젝트 설계
- 기획서, 아키텍처 설계

### Day 84-86: 개발
- 하드웨어 완성
- 백엔드/프론트엔드 개발

### Day 87-88: 연동 및 테스트
- 클라우드/외부 서비스 연동
- 버그 수정, 최적화

### Day 89-90: 완성
- 문서화
- 최종 발표

---

# 부록

## A. 하드웨어 구성 요약

| 장치 | GPIO | 제어 | 비고 |
|------|------|------|------|
| RED LED | 17 | **LOW=켜짐** | Active LOW |
| YELLOW LED | 27 | **LOW=켜짐** | Active LOW |
| BLUE LED | 22 | **LOW=켜짐** | Active LOW |
| SWITCH | 4 | **LOW=눌림** | 내부 풀업 |
| ALARM | 5 | **LOW=울림** | 능동 부저 |
| NeoPixel | 12 | PWM | WS2812 x4 |
| SPEAKER | 13 | PWM | BCX56 경유 |
| AHT20 | I2C | 0x38 | 온습도 |
| OLED | I2C | 0x3C | 128x64 |
| ESP32-C3 | UART | TX14/RX15 | WiFi AP |

## B. 기술 스택

| 분류 | 기술 |
|------|------|
| 백엔드 | Python, Flask, Flask-SocketIO |
| 프론트엔드 | HTML5, CSS3, JavaScript, Chart.js |
| 데이터베이스 | SQLite |
| 하드웨어 | RPi.GPIO, smbus2, rpi_ws281x |
| 통신 | UART, I2C, WebSocket, MQTT |
| ESP32 | Arduino, WiFi AP, WebServer |

## C. 프롬프트 형식 예시

```
[Day X] Python UTTEC Shield - 프로젝트명

프로젝트: (프로젝트 설명)

프로젝트 구조:
dayXX_project/
├── app.py
├── hardware.py
├── templates/index.html
└── README.md

요구사항:
1. (기능 요구사항)
2. (핀 번호 참조: 포트설명서)
3. (Active LOW 제어 방식 명시)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: app.py =====
(코드)
===== 파일 끝 =====
```
