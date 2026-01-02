'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Copy, Check, Code, Lightbulb, ExternalLink, FileText, AlertTriangle } from 'lucide-react';

// 포트설명서 참조 안내
const portSpecNote = `
⚠️ 중요: 포트설명서를 AI에게 함께 첨부하세요!

프롬프트와 함께 'raspberry_esp32c3_포트설명서.md' 파일을 AI에게 첨부하면
정확한 핀 번호와 Active LOW 제어 방식을 적용한 코드를 생성합니다.

핀 정보 요약:
- LED: RED(17), YELLOW(27), BLUE(22) - LOW=켜짐
- SWITCH: GPIO4 - LOW=눌림 (내부 풀업)
- ALARM: GPIO5 - LOW=울림
- NeoPixel: GPIO12 - WS2812 x4
- SPEAKER: GPIO13 - PWM
- I2C: AHT20(0x38), OLED(0x3C)
- UART: TX(14), RX(15) - ESP32 통신
`;

// 초급 과정 (Day 1-15): GPIO, 센서, 웹 기초
const beginnerPrompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  1: {
    title: '환경설정 및 Hello World',
    app: '시스템 정보 출력 프로그램',
    files: ['main.py', 'system_info.py', 'README.md'],
    prompt: `[Day 1] Python UTTEC Shield - 환경설정 및 Hello World

프로젝트: 시스템 정보 출력 프로그램

프로젝트 구조:
day01_hello/
├── main.py              # 메인 프로그램
├── system_info.py       # 시스템 정보 함수
└── README.md

요구사항:
1. Python 버전, Raspberry Pi 시스템 정보 출력
2. GPIO 라이브러리 설치 확인 (RPi.GPIO)
3. 기본 print, 변수 사용
4. 각 파일에 한글 주석 포함

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: system_info.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  2: {
    title: 'LED 켜기/끄기',
    app: 'LED 제어 프로그램',
    files: ['main.py', 'led.py', 'README.md'],
    prompt: `[Day 2] Python UTTEC Shield - LED 켜기/끄기

프로젝트: LED 제어 프로그램

프로젝트 구조:
day02_led/
├── main.py              # 메인 프로그램
├── led.py               # LED 제어 모듈
└── README.md

요구사항:
1. RED LED(GPIO17) 켜기/끄기
2. **중요: Active LOW 방식** - GPIO.output(pin, GPIO.LOW)가 LED 켜짐
3. 1초 간격 깜빡이기
4. BCM 모드 사용: GPIO.setmode(GPIO.BCM)
5. cleanup() 포함

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: led.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  3: {
    title: '신호등 만들기',
    app: '3색 신호등',
    files: ['main.py', 'traffic_light.py', 'README.md'],
    prompt: `[Day 3] Python UTTEC Shield - 신호등 만들기

프로젝트: 3색 신호등

프로젝트 구조:
day03_traffic/
├── main.py              # 메인 프로그램
├── traffic_light.py     # 신호등 제어 모듈
└── README.md

요구사항:
1. 3색 LED 사용: RED(17), YELLOW(27), BLUE(22)
2. **Active LOW**: GPIO.LOW = LED 켜짐, GPIO.HIGH = LED 꺼짐
3. 신호등 타이밍: 빨강 3초 → 노랑 1초 → 파랑(녹색 대신) 3초
4. 콘솔에 현재 신호 상태 출력
5. time.sleep() 활용

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: traffic_light.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  4: {
    title: '버튼 입력 처리',
    app: '버튼으로 LED 토글',
    files: ['main.py', 'button.py', 'led.py', 'README.md'],
    prompt: `[Day 4] Python UTTEC Shield - 버튼 입력 처리

프로젝트: 버튼으로 LED 토글

프로젝트 구조:
day04_button/
├── main.py
├── button.py            # 버튼 입력 모듈
├── led.py               # LED 모듈 재사용
└── README.md

요구사항:
1. SWITCH(GPIO4) 상태 읽기
2. **Active LOW**: GPIO.input(4) == GPIO.LOW 일 때 버튼 눌림
3. GPIO.setup(4, GPIO.IN, pull_up_down=GPIO.PUD_UP) 설정
4. 버튼 누르면 RED LED 토글
5. 디바운싱 처리 (200ms time.sleep)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: button.py =====
(코드)
===== 파일 끝 =====

===== 파일: led.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  5: {
    title: '버튼 인터럽트와 부저',
    app: '도어벨 시스템',
    files: ['main.py', 'gpio_handler.py', 'README.md'],
    prompt: `[Day 5] Python UTTEC Shield - 버튼 인터럽트와 부저

프로젝트: 도어벨 시스템

프로젝트 구조:
day05_doorbell/
├── main.py
├── gpio_handler.py      # GPIO 통합 모듈
└── README.md

요구사항:
1. GPIO.add_event_detect() 인터럽트 사용
2. SWITCH(GPIO4) 눌림 감지 (FALLING edge)
3. 버튼 누르면 ALARM 부저(GPIO5) 울림 + LED 깜빡임
4. **Active LOW**: 부저도 GPIO.LOW = 울림
5. 콜백 함수로 처리, bouncetime=300

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: gpio_handler.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  6: {
    title: 'I2C 통신과 장치 스캔',
    app: 'I2C 장치 탐지기',
    files: ['main.py', 'i2c_utils.py', 'README.md'],
    prompt: `[Day 6] Python UTTEC Shield - I2C 통신과 장치 스캔

프로젝트: I2C 장치 탐지기

프로젝트 구조:
day06_i2c_scan/
├── main.py
├── i2c_utils.py         # I2C 유틸리티
└── README.md

요구사항:
1. smbus2 라이브러리 사용
2. I2C 버스 1 (SMBus(1)) 스캔
3. 0x00~0x77 주소 범위 스캔
4. 발견된 장치 주소 출력 (예: AHT20=0x38, OLED=0x3C)
5. 예외 처리로 존재하지 않는 장치 무시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: i2c_utils.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 pip install smbus2)
===== 파일 끝 =====`
  },
  7: {
    title: '온습도 센서 (AHT20)',
    app: '온습도 모니터',
    files: ['main.py', 'aht20_sensor.py', 'README.md'],
    prompt: `[Day 7] Python UTTEC Shield - 온습도 센서 (AHT20)

프로젝트: 온습도 모니터

프로젝트 구조:
day07_temperature/
├── main.py
├── aht20_sensor.py      # AHT20 센서 모듈
└── README.md

요구사항:
1. adafruit_ahtx0 라이브러리 사용
2. board.I2C()로 I2C 버스 초기화
3. AHT20 센서 (주소 0x38) 데이터 읽기
4. 온도(°C), 습도(%) 2초 간격 출력
5. 포맷팅: "온도: 25.3°C, 습도: 45.2%"

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 pip install adafruit-circuitpython-ahtx0)
===== 파일 끝 =====`
  },
  8: {
    title: 'OLED 디스플레이 기초',
    app: 'OLED Hello World',
    files: ['main.py', 'oled_display.py', 'README.md'],
    prompt: `[Day 8] Python UTTEC Shield - OLED 디스플레이 기초

프로젝트: OLED Hello World

프로젝트 구조:
day08_oled/
├── main.py
├── oled_display.py      # OLED 제어 모듈
└── README.md

요구사항:
1. adafruit_ssd1306 + Pillow 라이브러리 사용
2. OLED 주소 0x3C, 크기 128x64
3. "Hello UTTEC!" 텍스트 출력
4. 한글 폰트 사용 시 PIL.ImageFont
5. 화면 중앙 정렬

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 pip install adafruit-circuitpython-ssd1306 Pillow)
===== 파일 끝 =====`
  },
  9: {
    title: 'OLED에 센서 데이터 표시',
    app: '온습도 디스플레이',
    files: ['main.py', 'aht20_sensor.py', 'oled_display.py', 'README.md'],
    prompt: `[Day 9] Python UTTEC Shield - OLED에 센서 데이터 표시

프로젝트: 온습도 디스플레이

프로젝트 구조:
day09_sensor_display/
├── main.py
├── aht20_sensor.py      # AHT20 센서 모듈
├── oled_display.py      # OLED 디스플레이 모듈
└── README.md

요구사항:
1. AHT20에서 온습도 읽기
2. OLED에 실시간 표시 (2초 간격 업데이트)
3. "온도: 25.3°C" / "습도: 45.2%" 두 줄 표시
4. 화면 깜빡임 방지 (전체 클리어 후 다시 그리기)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.py =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  10: {
    title: 'NeoPixel LED 기초',
    app: '무지개 LED',
    files: ['main.py', 'neopixel_ctrl.py', 'README.md'],
    prompt: `[Day 10] Python UTTEC Shield - NeoPixel LED 기초

프로젝트: 무지개 LED

프로젝트 구조:
day10_neopixel/
├── main.py
├── neopixel_ctrl.py     # NeoPixel 제어 모듈
└── README.md

요구사항:
1. rpi_ws281x 라이브러리 사용 (sudo 필요)
2. GPIO12, LED 4개, 밝기 50
3. 개별 LED 색상 제어: strip.setPixelColor(n, Color(R, G, B))
4. 무지개 색상 순환 애니메이션
5. strip.show() 호출로 업데이트

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.py =====
(코드)
===== 파일 끝 =====

===== 파일: neopixel_ctrl.py =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 - sudo python3 main.py 필요)
===== 파일 끝 =====`
  },
  11: {
    title: 'Flask 웹서버 기초',
    app: 'Hello World 웹서버',
    files: ['app.py', 'templates/index.html', 'README.md'],
    prompt: `[Day 11] Python UTTEC Shield - Flask 웹서버 기초

프로젝트: Hello World 웹서버

프로젝트 구조:
day11_flask_hello/
├── app.py               # Flask 앱
├── templates/
│   └── index.html       # 메인 페이지
└── README.md

요구사항:
1. Flask 설치 및 기본 서버 구동 (포트 5000)
2. "Hello UTTEC Shield!" 웹페이지
3. host='0.0.0.0' 설정으로 외부 접속 허용
4. 라우팅 기초 (@app.route)
5. render_template 사용

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: app.py =====
(코드)
===== 파일 끝 =====

===== 파일: templates/index.html =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 pip install Flask)
===== 파일 끝 =====`
  },
  12: {
    title: 'HTML/CSS 기초',
    app: 'LED 제어 UI 디자인',
    files: ['app.py', 'templates/index.html', 'static/style.css', 'README.md'],
    prompt: `[Day 12] Python UTTEC Shield - HTML/CSS 기초

프로젝트: LED 제어 UI 디자인

프로젝트 구조:
day12_html_css/
├── app.py
├── templates/
│   └── index.html
├── static/
│   └── style.css
└── README.md

요구사항:
1. LED ON/OFF 버튼 3개 (RED, YELLOW, BLUE)
2. 각 버튼에 해당 색상 스타일링
3. CSS Flexbox로 중앙 정렬
4. 반응형 디자인 기초 (모바일 고려)
5. static 폴더에서 CSS 로드

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: app.py =====
(코드)
===== 파일 끝 =====

===== 파일: templates/index.html =====
(코드)
===== 파일 끝 =====

===== 파일: static/style.css =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  13: {
    title: 'JavaScript와 AJAX',
    app: '동적 LED 제어',
    files: ['app.py', 'templates/index.html', 'static/style.css', 'static/script.js', 'README.md'],
    prompt: `[Day 13] Python UTTEC Shield - JavaScript와 AJAX

프로젝트: 동적 LED 제어 (페이지 새로고침 없이)

프로젝트 구조:
day13_javascript/
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
└── README.md

요구사항:
1. fetch API로 서버와 비동기 통신
2. 버튼 클릭 시 페이지 새로고침 없이 LED 제어
3. LED 상태에 따라 버튼 색상 변경 (ON=밝게, OFF=어둡게)
4. /api/led/<color>/<state> 엔드포인트 (GET)
5. JSON 응답 처리

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: app.py =====
(코드)
===== 파일 끝 =====

===== 파일: templates/index.html =====
(코드)
===== 파일 끝 =====

===== 파일: static/style.css =====
(코드)
===== 파일 끝 =====

===== 파일: static/script.js =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  14: {
    title: '웹으로 LED 제어',
    app: '웹 LED 제어 시스템',
    files: ['app.py', 'hardware.py', 'templates/index.html', 'static/style.css', 'static/script.js', 'README.md'],
    prompt: `[Day 14] Python UTTEC Shield - 웹으로 LED 제어

프로젝트: 웹 LED 제어 시스템 (실제 하드웨어 연동)

프로젝트 구조:
day14_web_led/
├── app.py
├── hardware.py          # GPIO 제어 모듈
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
└── README.md

요구사항:
1. /api/led/<color>/<state> API 엔드포인트 (color: red/yellow/blue, state: on/off)
2. hardware.py에서 실제 GPIO 제어
3. **Active LOW**: on → GPIO.LOW, off → GPIO.HIGH
4. LED 핀: RED(17), YELLOW(27), BLUE(22)
5. 현재 LED 상태 반환 API (/api/led/status)
6. 웹 UI에서 상태 실시간 반영

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: app.py =====
(코드)
===== 파일 끝 =====

===== 파일: hardware.py =====
(코드)
===== 파일 끝 =====

===== 파일: templates/index.html =====
(코드)
===== 파일 끝 =====

===== 파일: static/style.css =====
(코드)
===== 파일 끝 =====

===== 파일: static/script.js =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  15: {
    title: '초급 종합 프로젝트',
    app: '스마트 환경 모니터 v1',
    files: ['app.py', 'hardware.py', 'sensors.py', 'display.py', 'templates/index.html', 'static/style.css', 'static/script.js', 'README.md'],
    prompt: `[Day 15] Python UTTEC Shield - 초급 종합 프로젝트

프로젝트: 스마트 환경 모니터 v1

프로젝트 구조:
day15_smart_monitor/
├── app.py
├── hardware.py          # GPIO 제어 (LED, 부저)
├── sensors.py           # 센서 모듈 (AHT20)
├── display.py           # OLED 모듈
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
└── README.md

요구사항:
1. 온습도 실시간 웹 표시 (/api/sensor)
2. LED 3색 원격 제어 (/api/led/<color>/<state>)
3. 버튼 누르면 부저 울림 + 웹에 알림 표시
4. OLED에 현재 IP 주소 + 온습도 표시
5. 모든 하드웨어 Active LOW 적용
6. 초급에서 배운 모든 개념 종합

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: app.py =====
(코드)
===== 파일 끝 =====

===== 파일: hardware.py =====
(코드)
===== 파일 끝 =====

===== 파일: sensors.py =====
(코드)
===== 파일 끝 =====

===== 파일: display.py =====
(코드)
===== 파일 끝 =====

===== 파일: templates/index.html =====
(코드)
===== 파일 끝 =====

===== 파일: static/style.css =====
(코드)
===== 파일 끝 =====

===== 파일: static/script.js =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  }
};

// 중급 과정 (Day 16-45): PWM, ESP32 AP, 데이터베이스
const intermediatePrompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  16: { title: 'PWM 기초 - LED 밝기 조절', app: 'LED 페이더', files: ['main.py', 'pwm_led.py', 'README.md'], prompt: `[Day 16] Python UTTEC Shield - PWM LED 밝기 조절\n\n프로젝트: LED 페이더\n\n요구사항:\n1. 소프트웨어 PWM으로 RED LED(17) 밝기 조절\n2. GPIO.PWM(pin, frequency) 사용\n3. pwm.ChangeDutyCycle(0~100)으로 밝기 변경\n4. 0%→100%→0% 부드러운 페이드 효과\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  17: { title: '스피커 톤 생성', app: '음계 연주기', files: ['main.py', 'speaker.py', 'README.md'], prompt: `[Day 17] Python UTTEC Shield - 스피커 톤 생성\n\n프로젝트: 음계 연주기\n\n요구사항:\n1. SPEAKER(GPIO13) PWM으로 도레미파솔라시도 연주\n2. 주파수: C(262), D(294), E(330), F(349), G(392), A(440), B(494), C(523)\n3. GPIO.PWM으로 각 음계 재생\n4. time.sleep()으로 음길이 조절\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  18: { title: 'NeoPixel 고급 효과', app: 'LED 애니메이션', files: ['main.py', 'neopixel_effects.py', 'README.md'], prompt: `[Day 18] Python UTTEC Shield - NeoPixel 고급 효과\n\n프로젝트: LED 애니메이션\n\n요구사항:\n1. GPIO12 NeoPixel 4개\n2. 무지개 그라데이션 효과\n3. 숨쉬기 효과 (밝기 0~100% 순환)\n4. 경찰차 사이렌 효과 (빨강↔파랑 교차)\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  19: { title: '온도 기반 LED 표시', app: '온도 시각화', files: ['main.py', 'temp_led.py', 'README.md'], prompt: `[Day 19] Python UTTEC Shield - 온도 기반 LED 표시\n\n프로젝트: 온도 시각화\n\n요구사항:\n1. AHT20 온도 읽기\n2. 온도에 따라 NeoPixel 색상 변경\n3. 저온(20°C 미만): 파랑, 적정(20-28°C): 녹색, 고온(28°C 초과): 빨강\n4. 색상 그라데이션 적용\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  20: { title: '알람 시스템', app: '온도 알람', files: ['app.py', 'alarm.py', 'templates/index.html', 'README.md'], prompt: `[Day 20] Python UTTEC Shield - 알람 시스템\n\n프로젝트: 온도 알람\n\n요구사항:\n1. 임계값 초과 시 ALARM 부저(GPIO5) + LED 경고\n2. 웹에서 임계값 설정 가능 (/api/alarm/set)\n3. 알람 해제 버튼\n4. Active LOW 부저 제어\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  21: { title: 'OLED 그래픽', app: '온도 게이지', files: ['main.py', 'oled_graphics.py', 'README.md'], prompt: `[Day 21] Python UTTEC Shield - OLED 그래픽\n\n프로젝트: 온도 게이지\n\n요구사항:\n1. Pillow로 도형 그리기 (draw.rectangle, draw.ellipse)\n2. 온도에 따른 게이지 바 표시\n3. 아이콘 표시 (온도계 모양)\n4. 128x64 화면 구성\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  22: { title: 'OLED 멀티 화면', app: '화면 전환 시스템', files: ['main.py', 'screens.py', 'README.md'], prompt: `[Day 22] Python UTTEC Shield - OLED 멀티 화면\n\n프로젝트: 화면 전환 시스템\n\n요구사항:\n1. SWITCH(GPIO4) 버튼으로 화면 전환\n2. 화면 1: 온습도 표시\n3. 화면 2: 현재 시각\n4. 화면 3: IP 주소 정보\n5. 화면 인덱스 순환\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  23: { title: 'UART 통신 기초', app: '시리얼 통신 테스트', files: ['main.py', 'uart_comm.py', 'README.md'], prompt: `[Day 23] Python UTTEC Shield - UART 통신 기초\n\n프로젝트: 시리얼 통신 테스트\n\n요구사항:\n1. pyserial 라이브러리 사용\n2. /dev/ttyS0 또는 /dev/serial0 사용\n3. 9600 baud rate\n4. 문자열 송수신 테스트\n5. ESP32-C3와 통신 준비\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  24: { title: 'ESP32-C3 Arduino 환경설정', app: 'ESP32 LED Blink', files: ['esp32_blink.ino', 'README.md'], prompt: `[Day 24] Python UTTEC Shield - ESP32-C3 Arduino 환경설정\n\n프로젝트: ESP32 LED Blink (Arduino 코드)\n\n요구사항:\n1. Arduino IDE에 ESP32 보드 추가\n2. ESP32-C3 SuperMini 선택\n3. 내장 LED 깜빡이기\n4. Serial 통신 테스트 (Serial.println)\n\n참고: 이 레슨은 Arduino 코드입니다.\n\n===== 파일: esp32_blink.ino =====\n(Arduino 코드)\n===== 파일 끝 =====` },
  25: { title: 'ESP32 WiFi AP 모드', app: 'WiFi 핫스팟', files: ['esp32_ap.ino', 'README.md'], prompt: `[Day 25] Python UTTEC Shield - ESP32 WiFi AP 모드\n\n프로젝트: WiFi 핫스팟 (Arduino 코드)\n\n요구사항:\n1. ESP32-C3를 WiFi AP 모드로 설정\n2. SSID: "UTTEC_SHIELD_AP"\n3. 비밀번호: "uttec1234"\n4. 스마트폰에서 연결 테스트\n\n===== 파일: esp32_ap.ino =====\n(Arduino 코드)\n===== 파일 끝 =====` },
  26: { title: 'ESP32 웹서버', app: 'ESP32 미니 웹서버', files: ['esp32_webserver.ino', 'README.md'], prompt: `[Day 26] Python UTTEC Shield - ESP32 웹서버\n\n프로젝트: ESP32 미니 웹서버 (Arduino 코드)\n\n요구사항:\n1. 192.168.4.1 웹페이지 제공\n2. HTML 버튼으로 ESP32 LED 제어\n3. WebServer 라이브러리 사용\n\n===== 파일: esp32_webserver.ino =====\n(Arduino 코드)\n===== 파일 끝 =====` },
  27: { title: 'RPi-ESP32 명령 프로토콜', app: '통신 프로토콜 설계', files: ['protocol.py', 'esp32_protocol.ino', 'README.md'], prompt: `[Day 27] Python UTTEC Shield - RPi-ESP32 명령 프로토콜\n\n프로젝트: 통신 프로토콜 설계\n\n요구사항:\n1. JSON 형식 명령어 정의\n2. 예: {"cmd": "LED_ON", "color": "red"}\n3. 예: {"cmd": "GET_TEMP"}\n4. RPi에서 명령 전송, ESP32에서 처리\n5. 응답 형식: {"status": "ok", "data": ...}\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  28: { title: 'ESP32 AP + RPi 연동 (1)', app: '3-Tier 아키텍처', files: ['rpi_sender.py', 'esp32_bridge.ino', 'README.md'], prompt: `[Day 28] Python UTTEC Shield - ESP32 AP + RPi 연동 (1)\n\n프로젝트: 3-Tier 아키텍처\n\n요구사항:\n1. 스마트폰 → ESP32 AP(WiFi) → RPi(UART) → 하드웨어\n2. ESP32가 WiFi 요청을 UART 명령으로 변환\n3. RPi가 하드웨어 제어 후 응답\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  29: { title: 'ESP32 AP + RPi 연동 (2)', app: '실시간 데이터 전송', files: ['rpi_sensor.py', 'esp32_data.ino', 'README.md'], prompt: `[Day 29] Python UTTEC Shield - ESP32 AP + RPi 연동 (2)\n\n프로젝트: 실시간 데이터 전송\n\n요구사항:\n1. RPi 센서 데이터 → UART → ESP32 → WiFi → 스마트폰\n2. 온습도 데이터 실시간 전송\n3. JSON 형식 데이터 패킷\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  30: { title: '모바일 친화적 UI', app: '터치 UI', files: ['app.py', 'templates/mobile.html', 'static/mobile.css', 'README.md'], prompt: `[Day 30] Python UTTEC Shield - 모바일 친화적 UI\n\n프로젝트: 터치 UI\n\n요구사항:\n1. 반응형 디자인 (모바일 퍼스트)\n2. 큰 터치 버튼 (최소 48px)\n3. viewport meta 태그\n4. CSS 미디어 쿼리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  31: { title: 'PC 브라우저 연동', app: '대시보드', files: ['app.py', 'templates/dashboard.html', 'static/dashboard.js', 'README.md'], prompt: `[Day 31] Python UTTEC Shield - PC 브라우저 연동\n\n프로젝트: 대시보드\n\n요구사항:\n1. PC 브라우저용 대시보드 레이아웃\n2. Chart.js로 센서 그래프 표시\n3. 실시간 데이터 폴링 (setInterval)\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  32: { title: '다중 클라이언트 처리', app: '멀티 클라이언트', files: ['app.py', 'client_manager.py', 'README.md'], prompt: `[Day 32] Python UTTEC Shield - 다중 클라이언트 처리\n\n프로젝트: 멀티 클라이언트\n\n요구사항:\n1. 여러 기기 동시 접속 처리\n2. 상태 동기화 (한 클라이언트 변경 → 모든 클라이언트 반영)\n3. 접속 클라이언트 목록 관리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  33: { title: 'SQLite 데이터베이스', app: '센서 DB', files: ['app.py', 'database.py', 'README.md'], prompt: `[Day 33] Python UTTEC Shield - SQLite 데이터베이스\n\n프로젝트: 센서 DB\n\n요구사항:\n1. sqlite3 모듈 사용\n2. sensor_data 테이블 생성 (id, timestamp, temperature, humidity)\n3. INSERT, SELECT 쿼리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  34: { title: '센서 데이터 로깅', app: '자동 로거', files: ['app.py', 'logger.py', 'database.py', 'README.md'], prompt: `[Day 34] Python UTTEC Shield - 센서 데이터 로깅\n\n프로젝트: 자동 로거\n\n요구사항:\n1. 1분 간격 자동 저장\n2. threading 또는 schedule 라이브러리\n3. 백그라운드 스레드로 실행\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  35: { title: '데이터 조회 API', app: 'History API', files: ['app.py', 'database.py', 'README.md'], prompt: `[Day 35] Python UTTEC Shield - 데이터 조회 API\n\n프로젝트: History API\n\n요구사항:\n1. /api/history?hours=24 엔드포인트\n2. 지정 시간 내 데이터 JSON 반환\n3. 통계 (평균, 최고, 최저)\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  36: { title: '웹 그래프 표시', app: '데이터 시각화', files: ['app.py', 'templates/charts.html', 'static/charts.js', 'README.md'], prompt: `[Day 36] Python UTTEC Shield - 웹 그래프 표시\n\n프로젝트: 데이터 시각화\n\n요구사항:\n1. Chart.js 시계열 그래프\n2. 온도/습도 실시간 그래프\n3. 10초 간격 업데이트\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  37: { title: '이벤트 로깅', app: '이벤트 히스토리', files: ['app.py', 'events.py', 'database.py', 'README.md'], prompt: `[Day 37] Python UTTEC Shield - 이벤트 로깅\n\n프로젝트: 이벤트 히스토리\n\n요구사항:\n1. 버튼/LED 이벤트 기록\n2. events 테이블 (id, timestamp, event_type, description)\n3. 이벤트 필터링 조회\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  38: { title: '설정 저장/불러오기', app: '설정 관리자', files: ['app.py', 'config_manager.py', 'config.json', 'README.md'], prompt: `[Day 38] Python UTTEC Shield - 설정 저장/불러오기\n\n프로젝트: 설정 관리자\n\n요구사항:\n1. config.json 파일 저장/로드\n2. 알람 임계값, 로깅 간격 등 설정\n3. 부팅 시 자동 로드\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  39: { title: '데이터 내보내기', app: 'CSV 익스포터', files: ['app.py', 'exporter.py', 'templates/export.html', 'README.md'], prompt: `[Day 39] Python UTTEC Shield - 데이터 내보내기\n\n프로젝트: CSV 익스포터\n\n요구사항:\n1. 센서 데이터 CSV 다운로드\n2. /api/export/csv?hours=24 엔드포인트\n3. Content-Disposition 헤더로 파일 다운로드\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  40: { title: '중급 종합 프로젝트 (1)', app: '스마트 환경 모니터 v2 - 설계', files: ['docs/architecture.md', 'docs/api_spec.md', 'README.md'], prompt: `[Day 40] Python UTTEC Shield - 중급 종합 프로젝트 설계\n\n프로젝트: 스마트 환경 모니터 v2 - 설계\n\n요구사항:\n1. 시스템 아키텍처 설계\n2. API 명세서 작성\n3. 데이터베이스 스키마 설계\n4. UI 와이어프레임\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  41: { title: '중급 종합 프로젝트 (2)', app: '스마트 환경 모니터 v2 - 백엔드', files: ['app.py', 'hardware.py', 'database.py', 'README.md'], prompt: `[Day 41] Python UTTEC Shield - 중급 종합 프로젝트 백엔드\n\n프로젝트: 스마트 환경 모니터 v2 - 백엔드\n\n요구사항:\n1. Flask API 서버\n2. SQLite 데이터베이스\n3. 센서/LED/알람 제어 API\n4. 데이터 로깅 백그라운드 작업\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  42: { title: '중급 종합 프로젝트 (3)', app: '스마트 환경 모니터 v2 - 프론트', files: ['templates/index.html', 'static/style.css', 'static/app.js', 'README.md'], prompt: `[Day 42] Python UTTEC Shield - 중급 종합 프로젝트 프론트\n\n프로젝트: 스마트 환경 모니터 v2 - 프론트엔드\n\n요구사항:\n1. 반응형 대시보드 UI\n2. 실시간 센서 그래프 (Chart.js)\n3. LED 제어 버튼\n4. 설정 페이지\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  43: { title: '중급 종합 프로젝트 (4)', app: '스마트 환경 모니터 v2 - ESP32', files: ['esp32_monitor.ino', 'README.md'], prompt: `[Day 43] Python UTTEC Shield - 중급 종합 프로젝트 ESP32\n\n프로젝트: 스마트 환경 모니터 v2 - ESP32 연동\n\n요구사항:\n1. ESP32 AP 모드 웹서버\n2. RPi UART 통신 브릿지\n3. 스마트폰에서 접속 가능\n\n===== 파일: esp32_monitor.ino =====\n(Arduino 코드)\n===== 파일 끝 =====` },
  44: { title: '중급 종합 프로젝트 (5)', app: '스마트 환경 모니터 v2 - 통합', files: ['app.py', 'hardware.py', 'database.py', 'uart_bridge.py', 'templates/index.html', 'README.md'], prompt: `[Day 44] Python UTTEC Shield - 중급 종합 프로젝트 통합\n\n프로젝트: 스마트 환경 모니터 v2 - 전체 통합\n\n요구사항:\n1. 모든 모듈 통합\n2. RPi ↔ ESP32 통신 연결\n3. 웹 대시보드 + 모바일 접속\n4. 알람 + 데이터 로깅\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  45: { title: '중급 종합 프로젝트 (6)', app: '스마트 환경 모니터 v2 - 완성', files: ['app.py', 'config.json', 'README.md', 'MANUAL.md'], prompt: `[Day 45] Python UTTEC Shield - 중급 종합 프로젝트 완성\n\n프로젝트: 스마트 환경 모니터 v2 - 완성 및 문서화\n\n요구사항:\n1. 최종 테스트 및 버그 수정\n2. 사용자 매뉴얼 작성\n3. 설치 가이드\n4. 프로젝트 정리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` }
};

// 고급 과정 (Day 46-90): 실시간 통신, 보안, 클라우드
const advancedPrompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  46: { title: 'WebSocket 기초', app: '실시간 채팅', files: ['app.py', 'templates/chat.html', 'README.md'], prompt: `[Day 46] Python UTTEC Shield - WebSocket 기초\n\n프로젝트: 실시간 채팅\n\n요구사항:\n1. Flask-SocketIO 설치\n2. 실시간 양방향 통신\n3. 다중 클라이언트 채팅\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  47: { title: 'WebSocket 센서 푸시', app: '실시간 센서 모니터', files: ['app.py', 'templates/realtime.html', 'README.md'], prompt: `[Day 47] Python UTTEC Shield - WebSocket 센서 푸시\n\n프로젝트: 실시간 센서 모니터\n\n요구사항:\n1. 서버에서 클라이언트로 데이터 푸시\n2. 1초 간격 센서 데이터 전송\n3. 폴링 없이 실시간 업데이트\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  48: { title: 'WebSocket LED 동기화', app: 'LED 상태 동기화', files: ['app.py', 'templates/sync.html', 'README.md'], prompt: `[Day 48] Python UTTEC Shield - WebSocket LED 동기화\n\n프로젝트: LED 상태 동기화\n\n요구사항:\n1. 한 클라이언트에서 LED 변경 → 모든 클라이언트 동기화\n2. 브로드캐스트 이벤트\n3. 실시간 UI 업데이트\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  49: { title: 'ESP32 WebSocket 서버', app: 'ESP32 실시간 통신', files: ['esp32_websocket.ino', 'README.md'], prompt: `[Day 49] Python UTTEC Shield - ESP32 WebSocket 서버\n\n프로젝트: ESP32 실시간 통신 (Arduino 코드)\n\n요구사항:\n1. ESP32 WebSocket 서버 구현\n2. ArduinoWebSockets 라이브러리\n3. 실시간 양방향 통신\n\n===== 파일: esp32_websocket.ino =====\n(Arduino 코드)\n===== 파일 끝 =====` },
  50: { title: 'ESP32-RPi WebSocket 브릿지', app: 'WebSocket 브릿지', files: ['rpi_ws_bridge.py', 'esp32_ws_bridge.ino', 'README.md'], prompt: `[Day 50] Python UTTEC Shield - ESP32-RPi WebSocket 브릿지\n\n프로젝트: WebSocket 브릿지\n\n요구사항:\n1. ESP32: WiFi WebSocket 서버\n2. RPi: UART로 ESP32 연결\n3. 스마트폰 → ESP32(WiFi) → RPi(UART) → 하드웨어\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  51: { title: 'APScheduler 스케줄링', app: '자동화 스케줄러', files: ['app.py', 'scheduler.py', 'README.md'], prompt: `[Day 51] Python UTTEC Shield - APScheduler 스케줄링\n\n프로젝트: 자동화 스케줄러\n\n요구사항:\n1. APScheduler 라이브러리\n2. 정해진 시간에 LED 켜기/끄기\n3. 주기적 센서 체크 및 알람\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  52: { title: 'IF-THEN 자동화', app: '시나리오 자동화', files: ['app.py', 'automation.py', 'README.md'], prompt: `[Day 52] Python UTTEC Shield - IF-THEN 자동화\n\n프로젝트: 시나리오 자동화\n\n요구사항:\n1. "온도 > 30°C → 빨간 LED + 부저" 규칙\n2. 규칙 추가/삭제 API\n3. 조건-동작 엔진\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  53: { title: '매크로 녹화/재생', app: '매크로 시스템', files: ['app.py', 'macro.py', 'README.md'], prompt: `[Day 53] Python UTTEC Shield - 매크로 녹화/재생\n\n프로젝트: 매크로 시스템\n\n요구사항:\n1. 사용자 동작 녹화 (LED 순서, 타이밍)\n2. 녹화된 매크로 재생\n3. 매크로 저장/불러오기\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  54: { title: '사용자 인증 - 로그인', app: '로그인 시스템', files: ['app.py', 'auth.py', 'templates/login.html', 'README.md'], prompt: `[Day 54] Python UTTEC Shield - 사용자 인증\n\n프로젝트: 로그인 시스템\n\n요구사항:\n1. 사용자 등록/로그인\n2. Flask session 사용\n3. 비밀번호 해싱 (werkzeug)\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  55: { title: '세션 기반 인증', app: '세션 관리', files: ['app.py', 'auth.py', 'README.md'], prompt: `[Day 55] Python UTTEC Shield - 세션 기반 인증\n\n프로젝트: 세션 관리\n\n요구사항:\n1. 로그인 상태 유지\n2. 세션 타임아웃\n3. 로그아웃 기능\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  56: { title: '역할 기반 접근 제어', app: '관리자/사용자 권한', files: ['app.py', 'auth.py', 'decorators.py', 'README.md'], prompt: `[Day 56] Python UTTEC Shield - 역할 기반 접근 제어\n\n프로젝트: 관리자/사용자 권한\n\n요구사항:\n1. admin, user 역할 구분\n2. @login_required 데코레이터\n3. 역할별 기능 제한\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  57: { title: 'HTTPS 적용', app: 'SSL 인증서 설정', files: ['app.py', 'generate_cert.py', 'README.md'], prompt: `[Day 57] Python UTTEC Shield - HTTPS 적용\n\n프로젝트: SSL 인증서 설정\n\n요구사항:\n1. self-signed 인증서 생성\n2. Flask HTTPS 설정\n3. SSL context 적용\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  58: { title: 'API 토큰 인증', app: 'API Key 시스템', files: ['app.py', 'api_auth.py', 'README.md'], prompt: `[Day 58] Python UTTEC Shield - API 토큰 인증\n\n프로젝트: API Key 시스템\n\n요구사항:\n1. API 키 발급\n2. 헤더로 API 키 전송\n3. 키 검증 미들웨어\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  59: { title: '입력 검증과 보안', app: '보안 강화', files: ['app.py', 'validators.py', 'README.md'], prompt: `[Day 59] Python UTTEC Shield - 입력 검증과 보안\n\n프로젝트: 보안 강화\n\n요구사항:\n1. 입력값 검증 (타입, 범위)\n2. SQL Injection 방지\n3. XSS 방지\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  60: { title: '감사 로그', app: '보안 감사', files: ['app.py', 'audit.py', 'README.md'], prompt: `[Day 60] Python UTTEC Shield - 감사 로그\n\n프로젝트: 보안 감사\n\n요구사항:\n1. 모든 API 요청 로깅\n2. 로그인 시도 기록\n3. 의심스러운 활동 감지\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  61: { title: '하드웨어 PWM (pigpio)', app: '정밀 PWM 제어', files: ['main.py', 'hw_pwm.py', 'README.md'], prompt: `[Day 61] Python UTTEC Shield - 하드웨어 PWM\n\n프로젝트: 정밀 PWM 제어\n\n요구사항:\n1. pigpio 라이브러리 (하드웨어 PWM)\n2. pigpiod 데몬 실행 필요\n3. 더 정밀한 주파수/듀티 제어\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  62: { title: 'WAV 파일 재생', app: '사운드 플레이어', files: ['main.py', 'sound_player.py', 'README.md'], prompt: `[Day 62] Python UTTEC Shield - WAV 파일 재생\n\n프로젝트: 사운드 플레이어\n\n요구사항:\n1. pygame.mixer로 WAV 재생\n2. 알람 사운드 재생\n3. 볼륨 조절\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  63: { title: '멜로디 작곡기', app: 'RTTTL 플레이어', files: ['main.py', 'melody.py', 'README.md'], prompt: `[Day 63] Python UTTEC Shield - 멜로디 작곡기\n\n프로젝트: RTTTL 플레이어\n\n요구사항:\n1. RTTTL 형식 멜로디 파싱\n2. SPEAKER(GPIO13) PWM으로 재생\n3. 간단한 곡 연주\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  64: { title: 'NeoPixel 고급 애니메이션', app: 'LED 쇼', files: ['main.py', 'led_show.py', 'README.md'], prompt: `[Day 64] Python UTTEC Shield - NeoPixel 고급 애니메이션\n\n프로젝트: LED 쇼\n\n요구사항:\n1. 복잡한 애니메이션 시퀀스\n2. 음악 비트에 맞춘 효과\n3. 사용자 정의 패턴\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  65: { title: 'OLED 애니메이션', app: '아날로그 시계', files: ['main.py', 'clock.py', 'README.md'], prompt: `[Day 65] Python UTTEC Shield - OLED 애니메이션\n\n프로젝트: 아날로그 시계\n\n요구사항:\n1. OLED에 아날로그 시계 표시\n2. 초침, 분침, 시침 그리기\n3. 실시간 업데이트\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  66: { title: '센서 캘리브레이션', app: '정밀 센서 보정', files: ['main.py', 'calibration.py', 'README.md'], prompt: `[Day 66] Python UTTEC Shield - 센서 캘리브레이션\n\n프로젝트: 정밀 센서 보정\n\n요구사항:\n1. 온도 오프셋 보정\n2. 습도 보정 테이블\n3. 보정값 저장/로드\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  67: { title: '멀티스레딩', app: '병렬 작업 처리', files: ['app.py', 'workers.py', 'README.md'], prompt: `[Day 67] Python UTTEC Shield - 멀티스레딩\n\n프로젝트: 병렬 작업 처리\n\n요구사항:\n1. threading 모듈\n2. 센서 읽기 + 웹서버 동시 실행\n3. Lock으로 동기화\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  68: { title: 'asyncio 비동기', app: '비동기 센서 읽기', files: ['app.py', 'async_sensors.py', 'README.md'], prompt: `[Day 68] Python UTTEC Shield - asyncio 비동기\n\n프로젝트: 비동기 센서 읽기\n\n요구사항:\n1. async/await 문법\n2. asyncio 이벤트 루프\n3. 비동기 I/O 처리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  69: { title: '시스템 모니터링', app: 'RPi 상태 모니터', files: ['app.py', 'system_monitor.py', 'README.md'], prompt: `[Day 69] Python UTTEC Shield - 시스템 모니터링\n\n프로젝트: RPi 상태 모니터\n\n요구사항:\n1. CPU 온도, 사용률\n2. 메모리 사용량\n3. 디스크 공간\n4. 웹 대시보드 표시\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  70: { title: 'ESP32 Station 모드', app: '인터넷 연결', files: ['esp32_station.ino', 'README.md'], prompt: `[Day 70] Python UTTEC Shield - ESP32 Station 모드\n\n프로젝트: 인터넷 연결 (Arduino 코드)\n\n요구사항:\n1. ESP32를 기존 WiFi에 연결\n2. 인터넷 접속 테스트\n3. AP + Station 동시 모드\n\n===== 파일: esp32_station.ino =====\n(Arduino 코드)\n===== 파일 끝 =====` },
  71: { title: '날씨 API 연동', app: '날씨 정보 표시', files: ['app.py', 'weather.py', 'README.md'], prompt: `[Day 71] Python UTTEC Shield - 날씨 API 연동\n\n프로젝트: 날씨 정보 표시\n\n요구사항:\n1. OpenWeatherMap API 호출\n2. 현재 날씨 + 예보\n3. OLED에 날씨 아이콘 표시\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  72: { title: 'NTP 시간 동기화', app: '정확한 시계', files: ['main.py', 'ntp_sync.py', 'README.md'], prompt: `[Day 72] Python UTTEC Shield - NTP 시간 동기화\n\n프로젝트: 정확한 시계\n\n요구사항:\n1. NTP 서버에서 시간 동기화\n2. ntplib 라이브러리\n3. 자동 시간 동기화\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  73: { title: 'MQTT 기초', app: 'MQTT 클라이언트', files: ['publisher.py', 'subscriber.py', 'README.md'], prompt: `[Day 73] Python UTTEC Shield - MQTT 기초\n\n프로젝트: MQTT 클라이언트\n\n요구사항:\n1. paho-mqtt 라이브러리\n2. 발행/구독 패턴\n3. 테스트 브로커 연결\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  74: { title: 'MQTT 센서 발행', app: 'IoT 센서 노드', files: ['sensor_publisher.py', 'README.md'], prompt: `[Day 74] Python UTTEC Shield - MQTT 센서 발행\n\n프로젝트: IoT 센서 노드\n\n요구사항:\n1. 주기적 센서 데이터 발행\n2. JSON 페이로드\n3. QoS 설정\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  75: { title: 'MQTT 장치 제어', app: 'MQTT LED 제어', files: ['led_controller.py', 'README.md'], prompt: `[Day 75] Python UTTEC Shield - MQTT 장치 제어\n\n프로젝트: MQTT LED 제어\n\n요구사항:\n1. LED 제어 토픽 구독\n2. 원격 LED 제어\n3. 상태 피드백 발행\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  76: { title: 'Home Assistant 연동', app: 'HA 통합', files: ['ha_integration.py', 'README.md'], prompt: `[Day 76] Python UTTEC Shield - Home Assistant 연동\n\n프로젝트: HA 통합\n\n요구사항:\n1. MQTT Discovery 프로토콜\n2. Home Assistant 자동 발견\n3. 센서/스위치 엔티티\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  77: { title: '클라우드 데이터 저장', app: 'Firebase 연동', files: ['app.py', 'firebase_client.py', 'README.md'], prompt: `[Day 77] Python UTTEC Shield - 클라우드 데이터 저장\n\n프로젝트: Firebase 연동\n\n요구사항:\n1. Firebase Realtime Database\n2. 센서 데이터 클라우드 저장\n3. 실시간 동기화\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  78: { title: 'PWA 모바일 앱', app: '설치 가능 웹앱', files: ['app.py', 'static/manifest.json', 'static/sw.js', 'templates/pwa.html', 'README.md'], prompt: `[Day 78] Python UTTEC Shield - PWA 모바일 앱\n\n프로젝트: 설치 가능 웹앱\n\n요구사항:\n1. manifest.json 설정\n2. Service Worker\n3. 오프라인 지원\n4. 홈 화면 추가\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  79: { title: '텔레그램 봇', app: '알림 봇', files: ['app.py', 'telegram_bot.py', 'README.md'], prompt: `[Day 79] Python UTTEC Shield - 텔레그램 봇\n\n프로젝트: 알림 봇\n\n요구사항:\n1. python-telegram-bot 라이브러리\n2. 알람 발생 시 알림 전송\n3. 명령어로 상태 조회\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  80: { title: '음성 제어', app: '음성 명령', files: ['app.py', 'voice_control.py', 'README.md'], prompt: `[Day 80] Python UTTEC Shield - 음성 제어\n\n프로젝트: 음성 명령\n\n요구사항:\n1. SpeechRecognition 라이브러리\n2. "불 켜" → LED ON\n3. "온도 알려줘" → TTS 응답\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  81: { title: '최종 프로젝트 기획', app: '스마트홈 컨트롤러 - 기획', files: ['docs/requirements.md', 'docs/architecture.md', 'README.md'], prompt: `[Day 81] Python UTTEC Shield - 최종 프로젝트 기획\n\n프로젝트: 스마트홈 컨트롤러 - 기획\n\n요구사항:\n1. 요구사항 정의\n2. 시스템 아키텍처 설계\n3. 기술 스택 선정\n4. 일정 계획\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  82: { title: '최종 프로젝트 설계', app: '스마트홈 컨트롤러 - 설계', files: ['docs/database.md', 'docs/api_spec.md', 'docs/ui_wireframe.md', 'README.md'], prompt: `[Day 82] Python UTTEC Shield - 최종 프로젝트 설계\n\n프로젝트: 스마트홈 컨트롤러 - 설계\n\n요구사항:\n1. 데이터베이스 스키마\n2. REST API 명세\n3. UI 와이어프레임\n4. 보안 설계\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  83: { title: '최종 프로젝트 백엔드 (1)', app: '스마트홈 - 코어 백엔드', files: ['app/__init__.py', 'app/models.py', 'app/routes/auth.py', 'README.md'], prompt: `[Day 83] Python UTTEC Shield - 최종 프로젝트 백엔드 (1)\n\n프로젝트: 스마트홈 컨트롤러 - 코어 백엔드\n\n요구사항:\n1. Flask 앱 구조 (Blueprint)\n2. SQLAlchemy 모델\n3. 사용자 인증 API\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  84: { title: '최종 프로젝트 백엔드 (2)', app: '스마트홈 - 장치 제어', files: ['app/routes/devices.py', 'app/routes/sensors.py', 'app/hardware.py', 'README.md'], prompt: `[Day 84] Python UTTEC Shield - 최종 프로젝트 백엔드 (2)\n\n프로젝트: 스마트홈 컨트롤러 - 장치 제어\n\n요구사항:\n1. 장치 제어 API\n2. 센서 데이터 API\n3. 하드웨어 모듈\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  85: { title: '최종 프로젝트 프론트 (1)', app: '스마트홈 - 대시보드', files: ['app/templates/dashboard.html', 'app/static/css/style.css', 'app/static/js/dashboard.js', 'README.md'], prompt: `[Day 85] Python UTTEC Shield - 최종 프로젝트 프론트 (1)\n\n프로젝트: 스마트홈 컨트롤러 - 대시보드\n\n요구사항:\n1. 반응형 대시보드\n2. 실시간 센서 그래프\n3. 장치 제어 UI\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  86: { title: '최종 프로젝트 프론트 (2)', app: '스마트홈 - 설정/자동화', files: ['app/templates/settings.html', 'app/templates/automation.html', 'app/static/js/automation.js', 'README.md'], prompt: `[Day 86] Python UTTEC Shield - 최종 프로젝트 프론트 (2)\n\n프로젝트: 스마트홈 컨트롤러 - 설정/자동화\n\n요구사항:\n1. 시스템 설정 페이지\n2. 자동화 규칙 UI\n3. 사용자 관리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  87: { title: '최종 프로젝트 ESP32', app: '스마트홈 - ESP32', files: ['esp32_smarthome.ino', 'README.md'], prompt: `[Day 87] Python UTTEC Shield - 최종 프로젝트 ESP32\n\n프로젝트: 스마트홈 컨트롤러 - ESP32\n\n요구사항:\n1. WiFi AP + WebSocket\n2. RPi UART 브릿지\n3. 모바일 접속 지원\n\n===== 파일: esp32_smarthome.ino =====\n(Arduino 코드)\n===== 파일 끝 =====` },
  88: { title: '최종 프로젝트 통합', app: '스마트홈 - 통합', files: ['app/__init__.py', 'config.py', 'run.py', 'README.md'], prompt: `[Day 88] Python UTTEC Shield - 최종 프로젝트 통합\n\n프로젝트: 스마트홈 컨트롤러 - 전체 통합\n\n요구사항:\n1. 모든 모듈 통합\n2. 설정 파일 분리\n3. 시작 스크립트\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  89: { title: '최종 프로젝트 테스트', app: '스마트홈 - 테스트', files: ['tests/test_api.py', 'tests/test_hardware.py', 'README.md'], prompt: `[Day 89] Python UTTEC Shield - 최종 프로젝트 테스트\n\n프로젝트: 스마트홈 컨트롤러 - 테스트\n\n요구사항:\n1. pytest 테스트 코드\n2. API 엔드포인트 테스트\n3. 하드웨어 모킹\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  90: { title: '최종 프로젝트 완성', app: '스마트홈 컨트롤러 - 완성', files: ['README.md', 'MANUAL.md', 'requirements.txt', 'install.sh'], prompt: `[Day 90] Python UTTEC Shield - 최종 프로젝트 완성\n\n프로젝트: 스마트홈 컨트롤러 - 문서화 및 완성\n\n요구사항:\n1. 프로젝트 README 작성\n2. 사용자 매뉴얼\n3. 설치 스크립트\n4. 최종 테스트\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` }
};

// 모든 프롬프트 합치기
const allPrompts = { ...beginnerPrompts, ...intermediatePrompts, ...advancedPrompts };

// AI 서비스 목록
const aiServices = [
  { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-500' },
  { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-500' },
  { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600' },
];

export default function PythonUTTECLessonPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPortSpec, setShowPortSpec] = useState(false);

  const lessonData = allPrompts[day];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    // 완료 상태 로드
    const saved = localStorage.getItem(`python-uttec-${level}-completed`);
    if (saved) {
      const completed = JSON.parse(saved);
      setIsCompleted(completed.includes(day));
    }
  }, [level, day]);

  const handleCopy = async () => {
    if (lessonData?.prompt) {
      await navigator.clipboard.writeText(lessonData.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleComplete = () => {
    const saved = localStorage.getItem(`python-uttec-${level}-completed`);
    let completed = saved ? JSON.parse(saved) : [];

    if (isCompleted) {
      completed = completed.filter((d: number) => d !== day);
    } else {
      completed.push(day);
    }

    localStorage.setItem(`python-uttec-${level}-completed`, JSON.stringify(completed));
    setIsCompleted(!isCompleted);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  // 이전/다음 레슨 계산
  const prevDay = day > 1 ? day - 1 : null;
  const nextDay = day < 90 ? day + 1 : null;

  const getLevelForDay = (d: number) => {
    if (d <= 15) return '초급';
    if (d <= 45) return '중급';
    return '고급';
  };

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">레슨을 찾을 수 없습니다</h1>
          <Link href={`/course/coding/python-uttec/${level}`} className="text-blue-600 hover:underline">
            레벨 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/course/coding/python-uttec/${level}`} className="hover:text-gray-700">Python UTTEC Shield - {level}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Day {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Day {day}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {level}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  🛡️ UTTEC Shield
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{lessonData.title}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Code className="w-4 h-4" />
                만들 프로젝트: <span className="font-medium">{lessonData.app}</span>
              </p>
            </div>
            <button
              onClick={toggleComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {isCompleted ? '완료됨' : '완료 표시'}
            </button>
          </div>

          {/* 파일 목록 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-2">생성할 파일 목록:</h3>
            <div className="flex flex-wrap gap-2">
              {lessonData.files.map((file, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border rounded text-sm font-mono">
                  {file}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 포트설명서 안내 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 mb-1">중요: 포트설명서를 함께 첨부하세요!</h3>
              <p className="text-amber-800 text-sm mb-2">
                프롬프트와 함께 포트설명서 파일을 AI에게 첨부하면 정확한 핀 번호와 Active LOW 제어 방식을 적용한 코드를 생성합니다.
              </p>
              <button
                onClick={() => setShowPortSpec(!showPortSpec)}
                className="text-amber-700 text-sm font-medium flex items-center gap-1 hover:text-amber-900"
              >
                <FileText className="w-4 h-4" />
                {showPortSpec ? '핀 정보 숨기기' : '핀 정보 보기'}
              </button>
              {showPortSpec && (
                <div className="mt-3 p-3 bg-white rounded-lg text-xs font-mono text-gray-700 whitespace-pre-wrap">
{`LED: RED(17), YELLOW(27), BLUE(22) - LOW=켜짐
SWITCH: GPIO4 - LOW=눌림 (내부 풀업)
ALARM: GPIO5 - LOW=울림 (능동 부저)
NeoPixel: GPIO12 - WS2812 x4
SPEAKER: GPIO13 - PWM (BCX56 경유)
I2C: AHT20(0x38), OLED(0x3C)
UART: TX(14), RX(15) - ESP32 통신`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI 서비스 선택 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            AI 서비스 선택
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            아래 프롬프트를 복사한 후, 원하는 AI 서비스에 붙여넣으세요.
          </p>
          <div className="flex flex-wrap gap-3">
            {aiServices.map((service) => (
              <a
                key={service.name}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${service.color} text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition`}
              >
                {service.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* 프롬프트 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">AI에게 입력할 프롬프트</h2>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '복사됨!' : '프롬프트 복사'}
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
              {lessonData.prompt}
            </pre>
          </div>
        </div>

        {/* 학습 가이드 */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-purple-900 mb-2">📌 코드 저장 및 실행 방법</h3>
          <ol className="text-purple-800 text-sm space-y-1">
            <li>1. AI 응답에서 <code className="bg-purple-100 px-1 rounded">===== 파일: xxx =====</code> 구분자를 찾습니다</li>
            <li>2. 각 구분자 사이의 코드를 해당 파일명으로 저장합니다</li>
            <li>3. 폴더 구조에 맞게 Raspberry Pi에 파일을 배치합니다</li>
            <li>4. 터미널에서 <code className="bg-purple-100 px-1 rounded">python3 main.py</code> 또는 <code className="bg-purple-100 px-1 rounded">python3 app.py</code> 실행</li>
            <li>5. NeoPixel 사용 시: <code className="bg-purple-100 px-1 rounded">sudo python3 main.py</code> (root 권한 필요)</li>
          </ol>
        </div>

        {/* 네비게이션 */}
        <div className="flex justify-between">
          {prevDay ? (
            <Link
              href={`/course/coding/python-uttec/${getLevelForDay(prevDay)}/lesson/${prevDay}`}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              이전 레슨 (Day {prevDay})
            </Link>
          ) : (
            <div />
          )}
          {nextDay ? (
            <Link
              href={`/course/coding/python-uttec/${getLevelForDay(nextDay)}/lesson/${nextDay}`}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              다음 레슨 (Day {nextDay})
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
