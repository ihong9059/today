'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Copy, Check, Code, Lightbulb, ExternalLink, FileText, AlertTriangle } from 'lucide-react';

// 중급/고급 프롬프트 데이터 import
import { intermediatePromptsPart1 } from './lesson_page_intermediate1';
import { intermediatePromptsPart2 } from './lesson_page_intermediate2';
import { intermediatePromptsPart3 } from './lesson_page_intermediate3';
import { advancedPromptsPart1 } from './lesson_page_advanced1';
import { advancedPromptsPart2 } from './lesson_page_advanced2';
import { advancedPromptsPart3 } from './lesson_page_advanced3';
import { advancedPromptsPart4 } from './lesson_page_advanced4';

// 포트설명서 참조 안내
const portSpecNote = `
⚠️ 중요: 포트설명서를 AI에게 함께 첨부하세요!

프롬프트와 함께 'ESP32_회로도_분석_보고서.md' 파일을 AI에게 첨부하면
정확한 핀 번호와 Active HIGH 제어 방식을 적용한 코드를 생성합니다.

핀 정보 요약:
- LED: RED(25), YELLOW(26), BLUE(27) - HIGH=켜짐
- SWITCH: GPIO32 - LOW=눌림 (외부 디바운싱)
- BEEP 부저: GPIO14 - 직접 구동
- MELODY 부저: GPIO33 - 트랜지스터 구동
- I2C: SDA(21), SCL(22)
- I2C 장치: AHT20(0x38), OLED(0x3C)
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
`;

// 프롬프트 데이터 타입
interface PromptData {
  title: string;
  project: string;
  prompt: string;
  files: string[];
}

// 초급 과정 (Day 1-15)
const beginnerPrompts: { [day: number]: PromptData } = {
  1: { title: '환경설정 및 Hello World', project: '시리얼 모니터 출력', files: ['main.ino', 'README.md'], prompt: `[Day 1] ESP32 Arduino - 환경설정 및 Hello World\n\n프로젝트: 시리얼 모니터 출력\n\n프로젝트 구조:\nday01_hello/\n├── main.ino\n└── README.md\n\n요구사항:\n1. Arduino IDE ESP32 보드 설정 확인\n2. Serial.begin(115200)로 시리얼 통신 시작\n3. "Hello ESP32!" 메시지 출력\n4. 1초 간격으로 카운터 증가 출력\n5. 각 파일에 한글 주석 포함\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- void setup(): 프로그램 시작 시 한 번만 실행되는 초기화 함수\n- void loop(): setup() 후 무한 반복 실행되는 메인 함수\n- Serial.begin(속도): 시리얼 통신 초기화 (115200 = 초당 115200비트)\n- Serial.println(): 문자열 출력 후 줄바꿈\n- delay(ms): 밀리초 동안 대기 (1000ms = 1초)\n- int 변수: 정수형 변수 선언\n- 변수++: 변수 값을 1 증가시키는 증감 연산자\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n===== 파일: README.md =====\n(Arduino IDE 설정 및 업로드 방법)\n===== 파일 끝 =====` },
  2: { title: 'LED 켜기/끄기', project: 'LED 제어', files: ['main.ino', 'led_control.h', 'led_control.cpp', 'README.md'], prompt: `[Day 2] ESP32 Arduino - LED 켜기/끄기\n\n프로젝트: LED 제어\n\n프로젝트 구조:\nday02_led/\n├── main.ino\n├── led_control.h\n├── led_control.cpp\n└── README.md\n\n요구사항:\n1. RED LED(GPIO25) 켜기/끄기\n2. **중요: Active HIGH 방식** - digitalWrite(pin, HIGH)가 LED 켜짐\n3. pinMode(LED_RED, OUTPUT) 설정\n4. 1초 간격 깜빡이기\n5. 시리얼 모니터에 현재 상태 출력\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- #define 매크로명 값: 컴파일 시 치환되는 상수 정의\n- #include "파일.h": 사용자 헤더 파일 포함\n- pinMode(핀, 모드): GPIO 핀을 INPUT 또는 OUTPUT으로 설정\n- digitalWrite(핀, 값): 디지털 핀에 HIGH(1) 또는 LOW(0) 출력\n- 헤더파일(.h): 함수 선언과 상수 정의를 담는 파일\n- 소스파일(.cpp): 함수의 실제 구현 코드를 담는 파일\n- #ifndef/#define/#endif: 헤더 가드 - 중복 포함 방지\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n===== 파일: led_control.h =====\n(코드)\n===== 파일 끝 =====\n\n===== 파일: led_control.cpp =====\n(코드)\n===== 파일 끝 =====\n\n===== 파일: README.md =====\n(실행 방법)\n===== 파일 끝 =====` },
  3: { title: '신호등 만들기', project: '3색 신호등', files: ['main.ino', 'traffic_light.h', 'traffic_light.cpp', 'README.md'], prompt: `[Day 3] ESP32 Arduino - 신호등 만들기\n\n프로젝트: 3색 신호등\n\n프로젝트 구조:\nday03_traffic/\n├── main.ino\n├── traffic_light.h\n├── traffic_light.cpp\n└── README.md\n\n요구사항:\n1. 3색 LED 사용: RED(25), YELLOW(26), BLUE(27)\n2. **Active HIGH**: digitalWrite(pin, HIGH) = LED 켜짐\n3. 신호등 타이밍: 빨강 3초 → 노랑 1초 → 파랑 3초\n4. 시리얼 모니터에 현재 신호 상태 출력\n5. delay() 함수 활용\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- void 함수명(): 반환값이 없는 함수 정의\n- 함수 호출: 함수명()으로 정의된 함수 실행\n- 순차 실행: 코드는 위에서 아래로 순서대로 실행됨\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n===== 파일: traffic_light.h =====\n(코드)\n===== 파일 끝 =====\n\n===== 파일: traffic_light.cpp =====\n(코드)\n===== 파일 끝 =====\n\n===== 파일: README.md =====\n(실행 방법)\n===== 파일 끝 =====` },
  4: { title: '버튼 입력 처리', project: '버튼으로 LED 토글', files: ['main.ino', 'button.h', 'button.cpp', 'led_control.h', 'led_control.cpp', 'README.md'], prompt: `[Day 4] ESP32 Arduino - 버튼 입력 처리\n\n프로젝트: 버튼으로 LED 토글\n\n프로젝트 구조:\nday04_button/\n├── main.ino\n├── button.h\n├── button.cpp\n├── led_control.h\n├── led_control.cpp\n└── README.md\n\n요구사항:\n1. SWITCH(GPIO32) 상태 읽기\n2. **Active LOW**: 버튼 누르면 digitalRead() == LOW\n3. pinMode(32, INPUT) 설정 (외부 풀업 저항 있음)\n4. 버튼 누르면 RED LED 토글\n5. 디바운싱 처리 (200ms delay)\n6. 시리얼 모니터에 버튼 이벤트 출력\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- digitalRead(핀): 디지털 핀의 상태를 HIGH 또는 LOW로 읽기\n- if (조건) { }: 조건이 참일 때 중괄호 안의 코드 실행\n- == 연산자: 두 값이 같은지 비교 (같으면 true)\n- bool 변수: true 또는 false 값을 저장하는 논리형 변수\n- ! 연산자: NOT 연산 - true를 false로, false를 true로 반전\n- 토글(toggle): 현재 상태를 반대로 바꾸는 동작\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  5: { title: '버튼 인터럽트와 부저', project: '도어벨 시스템', files: ['main.ino', 'gpio_handler.h', 'gpio_handler.cpp', 'README.md'], prompt: `[Day 5] ESP32 Arduino - 버튼 인터럽트와 부저\n\n프로젝트: 도어벨 시스템\n\n프로젝트 구조:\nday05_doorbell/\n├── main.ino\n├── gpio_handler.h\n├── gpio_handler.cpp\n└── README.md\n\n요구사항:\n1. attachInterrupt() 사용하여 버튼 감지\n2. SWITCH(GPIO32) FALLING edge 감지\n3. 버튼 누르면 BEEP 부저(GPIO14) 울림 + LED 깜빡임\n4. volatile 변수로 인터럽트 플래그 처리\n5. ISR 내에서는 최소한의 작업만 수행\n6. 디바운싱: millis() 활용\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- attachInterrupt(핀, ISR함수, 모드): 인터럽트 설정 함수\n- FALLING: 신호가 HIGH에서 LOW로 떨어질 때 트리거\n- RISING: 신호가 LOW에서 HIGH로 올라갈 때 트리거\n- volatile: 인터럽트에서 변경되는 변수에 필수 - 컴파일러 최적화 방지\n- ISR (Interrupt Service Routine): 인터럽트 발생 시 자동 호출되는 함수\n- IRAM_ATTR: ISR 함수를 RAM에 배치하여 빠른 실행 보장\n- millis(): 프로그램 시작 후 경과 시간(밀리초) 반환\n- unsigned long: 부호 없는 4바이트 정수 (0 ~ 4,294,967,295)\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  6: { title: 'PWM LED 밝기 조절', project: 'LED 페이더', files: ['main.ino', 'pwm_control.h', 'pwm_control.cpp', 'README.md'], prompt: `[Day 6] ESP32 Arduino - PWM LED 밝기 조절\n\n프로젝트: LED 페이더\n\n프로젝트 구조:\nday06_pwm_led/\n├── main.ino\n├── pwm_control.h\n├── pwm_control.cpp\n└── README.md\n\n요구사항:\n1. ESP32 LEDC PWM 기능 사용\n2. ledcSetup(channel, freq, resolution) 설정\n3. ledcAttachPin(pin, channel)로 핀 연결\n4. ledcWrite(channel, duty)로 밝기 조절 (0-255)\n5. RED LED(GPIO25) 페이드 인/아웃 효과\n6. 부드러운 전환: 10ms 간격으로 밝기 변경\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- for (초기화; 조건; 증감) { }: 반복문 - 조건이 참인 동안 반복 실행\n- ledcSetup(채널, 주파수, 해상도): PWM 채널 설정 (해상도 8비트 = 0~255)\n- ledcAttachPin(핀, 채널): GPIO 핀을 PWM 채널에 연결\n- ledcWrite(채널, 값): PWM 듀티사이클 설정 (0=꺼짐, 255=최대)\n- PWM (Pulse Width Modulation): 펄스 폭 변조 - 아날로그 출력 효과 구현\n- 듀티사이클: HIGH 신호의 비율 (50% = 반만 켜짐)\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  7: { title: '멜로디 연주', project: '음계 연주기', files: ['main.ino', 'melody.h', 'melody.cpp', 'README.md'], prompt: `[Day 7] ESP32 Arduino - 멜로디 연주\n\n프로젝트: 음계 연주기\n\n프로젝트 구조:\nday07_melody/\n├── main.ino\n├── melody.h\n├── melody.cpp\n└── README.md\n\n요구사항:\n1. MELODY 부저(GPIO33) 사용 (트랜지스터 구동)\n2. ledcWriteTone(channel, frequency)로 음 출력\n3. 도레미파솔라시도 음계 연주\n4. 주파수: C4(262), D4(294), E4(330), F4(349), G4(392), A4(440), B4(494), C5(523)\n5. 각 음 500ms 재생, 100ms 쉼\n6. ledcWriteTone(channel, 0)으로 음 정지\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- 배열 선언: int notes[] = {값1, 값2, ...} - 같은 타입의 데이터 모음\n- 배열 접근: notes[인덱스] - 인덱스는 0부터 시작\n- sizeof(배열)/sizeof(배열[0]): 배열의 요소 개수 계산\n- ledcWriteTone(채널, 주파수): 지정 주파수의 음 출력\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  8: { title: 'I2C 통신과 AHT20', project: '온습도 모니터', files: ['main.ino', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'], prompt: `[Day 8] ESP32 Arduino - I2C 통신과 AHT20\n\n프로젝트: 온습도 모니터\n\n프로젝트 구조:\nday08_temperature/\n├── main.ino\n├── aht20_sensor.h\n├── aht20_sensor.cpp\n└── README.md\n\n요구사항:\n1. Wire 라이브러리 사용: Wire.begin(21, 22)\n2. Adafruit_AHTX0 라이브러리 사용\n3. AHT20 센서 (주소 0x38) 데이터 읽기\n4. 온도(°C), 습도(%) 2초 간격 시리얼 출력\n5. 센서 초기화 실패 시 에러 메시지 출력\n6. 포맷: "온도: 25.3°C, 습도: 45.2%"\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- #include <라이브러리.h>: 시스템/외부 라이브러리 포함\n- Wire.begin(SDA, SCL): I2C 통신 초기화 (ESP32: SDA=21, SCL=22)\n- I2C 통신: 두 선(SDA, SCL)으로 여러 장치와 통신하는 프로토콜\n- 0x38, 0x3C: 16진수 주소 - I2C 장치 식별\n- float 변수: 소수점을 포함하는 실수형 변수\n- 객체.메서드(): 객체 지향 - 객체가 가진 함수 호출\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  9: { title: 'OLED 디스플레이', project: 'OLED Hello World', files: ['main.ino', 'oled_display.h', 'oled_display.cpp', 'README.md'], prompt: `[Day 9] ESP32 Arduino - OLED 디스플레이\n\n프로젝트: OLED Hello World\n\n프로젝트 구조:\nday09_oled/\n├── main.ino\n├── oled_display.h\n├── oled_display.cpp\n└── README.md\n\n요구사항:\n1. Adafruit_SSD1306 라이브러리 사용\n2. OLED 주소 0x3C, 크기 128x64\n3. Wire.begin(21, 22)로 I2C 초기화\n4. display.begin(SSD1306_SWITCHCAPVCC, 0x3C)\n5. "Hello ESP32!" 텍스트 중앙 출력\n6. setTextSize(), setTextColor(), setCursor() 사용\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  10: { title: 'OLED에 센서 데이터 표시', project: '온습도 디스플레이', files: ['main.ino', 'aht20_sensor.h', 'aht20_sensor.cpp', 'oled_display.h', 'oled_display.cpp', 'README.md'], prompt: `[Day 10] ESP32 Arduino - OLED에 센서 데이터 표시\n\n프로젝트: 온습도 디스플레이\n\n프로젝트 구조:\nday10_sensor_display/\n├── main.ino\n├── aht20_sensor.h\n├── aht20_sensor.cpp\n├── oled_display.h\n├── oled_display.cpp\n└── README.md\n\n요구사항:\n1. AHT20 온습도 데이터를 OLED에 실시간 표시\n2. 2초 간격 업데이트\n3. 화면 구성: 1줄 "IoT Monitor", 2줄 "Temp: 25.3 C", 3줄 "Humi: 45.2 %"\n4. display.clearDisplay()로 화면 지우기\n5. 센서 모듈과 디스플레이 모듈 분리\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  11: { title: 'WiFi 연결', project: 'WiFi 연결 테스트', files: ['main.ino', 'wifi_manager.h', 'wifi_manager.cpp', 'config.h', 'README.md'], prompt: `[Day 11] ESP32 Arduino - WiFi 연결\n\n프로젝트: WiFi 연결 테스트\n\n프로젝트 구조:\nday11_wifi_connect/\n├── main.ino\n├── wifi_manager.h\n├── wifi_manager.cpp\n├── config.h\n└── README.md\n\n요구사항:\n1. WiFi.h 라이브러리 사용\n2. config.h에 SSID, PASSWORD 정의\n3. WiFi.begin()으로 공유기 연결\n4. 연결 상태 시리얼 모니터 출력\n5. IP 주소 출력: WiFi.localIP()\n6. 연결 성공 시 BLUE LED 켜기\n7. 연결 실패 시 RED LED 깜빡임\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- const char*: 문자열 상수 포인터 - 문자열 저장에 사용\n- WiFi.begin(ssid, password): WiFi 연결 시작\n- WiFi.status(): 연결 상태 반환 (WL_CONNECTED = 연결됨)\n- while (조건) { }: 조건이 참인 동안 반복 실행\n- != 연산자: 두 값이 다른지 비교 (다르면 true)\n- WiFi.localIP(): 할당받은 IP 주소 반환\n- String 클래스: 문자열을 다루는 Arduino 객체\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  12: { title: '웹서버 기초', project: 'Hello World 웹서버', files: ['main.ino', 'web_server.h', 'web_server.cpp', 'README.md'], prompt: `[Day 12] ESP32 Arduino - 웹서버 기초\n\n프로젝트: Hello World 웹서버\n\n프로젝트 구조:\nday12_webserver/\n├── main.ino\n├── web_server.h\n├── web_server.cpp\n└── README.md\n\n요구사항:\n1. WebServer.h 라이브러리 사용\n2. WebServer server(80) 객체 생성\n3. server.on("/", handleRoot) 라우트 설정\n4. HTML 응답: "<h1>Hello ESP32!</h1>"\n5. server.handleClient() 루프에서 호출\n6. 시리얼에 접속 URL 출력\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- WebServer server(80): 포트 80에서 웹서버 객체 생성\n- server.on(경로, 함수): URL 경로와 처리 함수 연결 (라우팅)\n- server.begin(): 웹서버 시작\n- server.handleClient(): 클라이언트 요청 처리 (loop에서 반복 호출)\n- server.send(코드, 타입, 내용): HTTP 응답 전송\n- 콜백 함수: 특정 이벤트 발생 시 자동 호출되는 함수\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  13: { title: '웹으로 LED 제어', project: '웹 LED 제어', files: ['main.ino', 'web_server.h', 'web_server.cpp', 'led_control.h', 'led_control.cpp', 'README.md'], prompt: `[Day 13] ESP32 Arduino - 웹으로 LED 제어\n\n프로젝트: 웹 LED 제어\n\n프로젝트 구조:\nday13_web_led/\n├── main.ino\n├── web_server.h\n├── web_server.cpp\n├── led_control.h\n├── led_control.cpp\n└── README.md\n\n요구사항:\n1. /led/on, /led/off 엔드포인트 구현\n2. /led/red/on, /led/red/off 등 색상별 제어\n3. HTML 버튼으로 LED 제어 UI\n4. 현재 LED 상태 표시\n5. server.send(200, "text/html", html) 응답\n6. 버튼 클릭 시 해당 URL로 이동\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  14: { title: '웹에 센서 데이터 표시', project: '센서 데이터 API', files: ['main.ino', 'web_server.h', 'web_server.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'], prompt: `[Day 14] ESP32 Arduino - 웹에 센서 데이터 표시\n\n프로젝트: 센서 데이터 API\n\n프로젝트 구조:\nday14_web_sensor/\n├── main.ino\n├── web_server.h\n├── web_server.cpp\n├── aht20_sensor.h\n├── aht20_sensor.cpp\n└── README.md\n\n요구사항:\n1. /api/sensor 엔드포인트 - JSON 응답\n2. ArduinoJson 라이브러리 사용\n3. {"temperature": 25.3, "humidity": 45.2} 형식\n4. 웹페이지에서 fetch로 데이터 가져오기\n5. 5초 간격 자동 갱신 (JavaScript setInterval)\n6. 온습도 값 실시간 업데이트 표시\n\n📚 문법 설명 (코드 내 주석으로 포함):\n- StaticJsonDocument<크기> doc: JSON 데이터를 담을 버퍼\n- doc["키"] = 값: JSON 객체에 키-값 쌍 추가\n- serializeJson(doc, output): JSON을 문자열로 변환\n- "application/json": JSON 데이터의 MIME 타입\n- API (Application Programming Interface): 프로그램 간 데이터 교환 규약\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
  15: { title: '초급 종합 프로젝트', project: 'IoT 환경 모니터 v1', files: ['main.ino', 'config.h', 'wifi_manager.h', 'wifi_manager.cpp', 'web_server.h', 'web_server.cpp', 'led_control.h', 'led_control.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'oled_display.h', 'oled_display.cpp', 'README.md'], prompt: `[Day 15] ESP32 Arduino - 초급 종합 프로젝트\n\n프로젝트: IoT 환경 모니터 v1\n\n프로젝트 구조:\nday15_iot_monitor/\n├── main.ino\n├── config.h\n├── wifi_manager.h / .cpp\n├── web_server.h / .cpp\n├── led_control.h / .cpp\n├── aht20_sensor.h / .cpp\n├── oled_display.h / .cpp\n└── README.md\n\n요구사항:\n1. WiFi 연결 후 웹서버 구동\n2. 온습도 실시간 웹 표시 (JSON API + HTML)\n3. LED 원격 제어 (웹 버튼)\n4. OLED에 IP 주소 + 센서 데이터 표시\n5. 버튼(GPIO32)으로 BEEP 부저 알림\n6. 모든 모듈 통합 및 테스트\n\n각 파일의 전체 코드를 다음 형식으로 작성:\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====\n\n(이하 모든 파일 형식 동일)` },
};

// 중급 과정 (Day 16-45)
const intermediatePrompts: { [day: number]: PromptData } = {
  16: { title: 'WiFi AP 모드 기초', project: '핫스팟 생성', files: ['main.ino', 'ap_manager.h', 'ap_manager.cpp', 'config.h', 'README.md'], prompt: `[Day 16] ESP32 Arduino - WiFi AP 모드 기초

프로젝트: 핫스팟 생성

프로젝트 구조:
day16_ap_mode/
├── main.ino
├── ap_manager.h
├── ap_manager.cpp
├── config.h
└── README.md

요구사항:
1. WiFi.softAP(ssid, password)로 AP 모드 시작
2. AP 이름: "ESP32_IoT_AP", 비밀번호: "12345678"
3. WiFi.softAPgetStationNum()으로 연결된 클라이언트 수 확인
4. OLED에 AP 이름, IP 주소(192.168.4.1), 클라이언트 수 표시
5. 클라이언트 연결/해제 시 BLUE LED 깜빡임
6. 시리얼 모니터에 연결 이벤트 로그 출력

📚 문법 설명 (코드 내 주석으로 포함):
- WiFi.mode(WIFI_AP): WiFi를 AP(Access Point) 모드로 설정
- WiFi.softAP(ssid, password): 지정한 이름과 비밀번호로 핫스팟 생성
- WiFi.softAPIP(): AP 모드의 IP 주소 반환 (기본 192.168.4.1)
- WiFi.softAPgetStationNum(): 현재 연결된 클라이언트 수 반환
- WiFi.softAPConfig(ip, gateway, subnet): AP의 IP 설정 변경

핀 정보:
- I2C: SDA(21), SCL(22) - OLED 디스플레이
- LED: BLUE(27) - 연결 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ap_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: ap_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 테스트 방법)
===== 파일 끝 =====` },

  17: { title: 'AP 모드 웹서버', project: 'AP 설정 페이지', files: ['main.ino', 'ap_manager.h', 'ap_manager.cpp', 'web_server.h', 'web_server.cpp', 'README.md'], prompt: `[Day 17] ESP32 Arduino - AP 모드 웹서버

프로젝트: AP 설정 페이지

프로젝트 구조:
day17_ap_webserver/
├── main.ino
├── ap_manager.h
├── ap_manager.cpp
├── web_server.h
├── web_server.cpp
└── README.md

요구사항:
1. AP 모드로 시작 후 웹서버 구동 (포트 80)
2. 192.168.4.1 접속 시 WiFi 설정 페이지 표시
3. HTML 폼: SSID 입력, Password 입력, 연결 버튼
4. /connect 엔드포인트에서 입력받은 WiFi로 연결 시도
5. 연결 성공 시 Station IP 주소 표시, 실패 시 에러 메시지
6. OLED에 현재 모드(AP/STA)와 IP 표시

📚 문법 설명 (코드 내 주석으로 포함):
- server.arg("ssid"): 폼에서 전송된 ssid 파라미터 값 가져오기
- server.hasArg("param"): 해당 파라미터가 존재하는지 확인
- WiFi.begin(ssid, password): Station 모드로 WiFi 연결 시도
- WiFi.waitForConnectResult(): 연결 결과 대기 (타임아웃 적용)
- WL_CONNECTED: WiFi 연결 성공 상태 상수

핀 정보:
- I2C: SDA(21), SCL(22) - OLED
- LED: RED(25) 실패, BLUE(27) 성공

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  18: { title: '캡티브 포털', project: '자동 설정 페이지', files: ['main.ino', 'captive_portal.h', 'captive_portal.cpp', 'dns_server.h', 'dns_server.cpp', 'README.md'], prompt: `[Day 18] ESP32 Arduino - 캡티브 포털

프로젝트: 자동 설정 페이지

프로젝트 구조:
day18_captive_portal/
├── main.ino
├── captive_portal.h
├── captive_portal.cpp
├── dns_server.h
├── dns_server.cpp
└── README.md

요구사항:
1. DNSServer 라이브러리로 DNS 서버 구동 (포트 53)
2. 모든 도메인 요청을 ESP32 IP(192.168.4.1)로 리다이렉트
3. 스마트폰/노트북이 연결하면 자동으로 설정 페이지 팝업
4. WiFi 설정 폼 + 저장 기능
5. 연결 성공 시 DNS 서버 중지, AP 모드 종료
6. 연결 실패 시 다시 캡티브 포털로 복귀

📚 문법 설명 (코드 내 주석으로 포함):
- #include <DNSServer.h>: DNS 서버 라이브러리
- DNSServer dnsServer: DNS 서버 객체 생성
- dnsServer.start(53, "*", apIP): 모든 도메인(*)을 apIP로 응답
- dnsServer.processNextRequest(): DNS 요청 처리 (loop에서 호출)
- dnsServer.stop(): DNS 서버 중지
- 캡티브 포털: 네트워크 연결 시 자동으로 표시되는 로그인/설정 페이지

핀 정보:
- I2C: SDA(21), SCL(22) - OLED
- LED: YELLOW(26) AP모드, BLUE(27) 연결완료

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  19: { title: 'SPIFFS 파일 시스템', project: '파일 저장', files: ['main.ino', 'file_system.h', 'file_system.cpp', 'README.md'], prompt: `[Day 19] ESP32 Arduino - SPIFFS 파일 시스템

프로젝트: 파일 저장

프로젝트 구조:
day19_spiffs/
├── main.ino
├── file_system.h
├── file_system.cpp
└── README.md

요구사항:
1. SPIFFS.begin(true)로 파일 시스템 마운트 (true=포맷 허용)
2. 텍스트 파일 쓰기: /data/log.txt에 메시지 저장
3. 파일 읽기: 저장된 내용 시리얼 출력
4. 파일 추가(append): 기존 파일 끝에 내용 추가
5. 디렉토리 목록: SPIFFS 내 모든 파일 이름과 크기 출력
6. 파일 삭제: SPIFFS.remove() 사용
7. 남은 용량 확인: SPIFFS.totalBytes(), usedBytes()

📚 문법 설명 (코드 내 주석으로 포함):
- #include <SPIFFS.h>: SPI Flash File System 라이브러리
- SPIFFS.begin(formatOnFail): 파일 시스템 초기화
- SPIFFS.open(path, mode): 파일 열기 (FILE_WRITE, FILE_READ, FILE_APPEND)
- file.print() / file.println(): 파일에 쓰기
- file.readString(): 파일 전체 내용을 String으로 읽기
- file.close(): 파일 닫기 (필수!)
- SPIFFS.exists(path): 파일 존재 여부 확인
- SPIFFS.remove(path): 파일 삭제

핀 정보:
- I2C: SDA(21), SCL(22) - OLED에 파일 정보 표시
- LED: BLUE(27) 성공, RED(25) 에러

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  20: { title: 'SPIFFS 웹 페이지 저장', project: 'HTML/CSS 파일 서빙', files: ['main.ino', 'file_system.h', 'file_system.cpp', 'web_server.h', 'web_server.cpp', 'data/index.html', 'data/style.css', 'README.md'], prompt: `[Day 20] ESP32 Arduino - SPIFFS 웹 페이지 저장

프로젝트: HTML/CSS 파일 서빙

프로젝트 구조:
day20_spiffs_web/
├── main.ino
├── file_system.h
├── file_system.cpp
├── web_server.h
├── web_server.cpp
├── data/
│   ├── index.html
│   └── style.css
└── README.md

요구사항:
1. SPIFFS에 HTML, CSS, JavaScript 파일 저장
2. server.serveStatic("/", SPIFFS, "/")로 정적 파일 서빙
3. index.html: 센서 데이터 표시 페이지
4. style.css: 반응형 스타일 (모바일 지원)
5. /api/sensor 엔드포인트: JSON 센서 데이터
6. JavaScript fetch()로 5초마다 데이터 갱신
7. Arduino IDE의 "ESP32 Sketch Data Upload" 도구 사용법 설명

📚 문법 설명 (코드 내 주석으로 포함):
- server.serveStatic(uri, fs, path): 파일 시스템의 파일을 HTTP로 서빙
- server.streamFile(file, contentType): 파일을 스트리밍으로 전송
- MIME 타입: "text/html", "text/css", "application/javascript"
- data 폴더: SPIFFS에 업로드될 파일들을 저장하는 폴더

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED
- LED: 상태 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: data/index.html =====
(HTML 코드)
===== 파일 끝 =====

===== 파일: data/style.css =====
(CSS 코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  21: { title: 'LittleFS 마이그레이션', project: 'LittleFS 파일 시스템', files: ['main.ino', 'file_system.h', 'file_system.cpp', 'README.md'], prompt: `[Day 21] ESP32 Arduino - LittleFS 마이그레이션

프로젝트: LittleFS 파일 시스템

프로젝트 구조:
day21_littlefs/
├── main.ino
├── file_system.h
├── file_system.cpp
└── README.md

요구사항:
1. SPIFFS 대신 LittleFS 사용 (더 안정적, 웨어레벨링 지원)
2. LittleFS.begin(true)로 초기화
3. 파일 쓰기/읽기/삭제 기능 구현
4. 디렉토리 생성: LittleFS.mkdir()
5. 재귀적 디렉토리 탐색 함수 구현
6. SPIFFS 코드를 LittleFS로 변환하는 방법 설명

📚 문법 설명 (코드 내 주석으로 포함):
- #include <LittleFS.h>: LittleFS 라이브러리
- LittleFS.begin(formatOnFail): SPIFFS와 동일한 API
- LittleFS.mkdir(path): 디렉토리 생성 (SPIFFS는 미지원)
- LittleFS.rmdir(path): 빈 디렉토리 삭제
- File dir = LittleFS.open(path): 디렉토리 열기
- File file = dir.openNextFile(): 다음 파일 가져오기
- file.isDirectory(): 디렉토리 여부 확인
- SPIFFS vs LittleFS: LittleFS가 전원 손실에 더 안전함

핀 정보:
- I2C: SDA(21), SCL(22) - OLED
- 버튼: GPIO32 - 파일 작업 트리거

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  22: { title: '설정 파일 관리', project: 'JSON 설정 저장', files: ['main.ino', 'config_manager.h', 'config_manager.cpp', 'README.md'], prompt: `[Day 22] ESP32 Arduino - 설정 파일 관리

프로젝트: JSON 설정 저장

프로젝트 구조:
day22_config_json/
├── main.ino
├── config_manager.h
├── config_manager.cpp
└── README.md

요구사항:
1. ArduinoJson으로 설정 파일 생성 및 파싱
2. /config.json에 WiFi SSID, Password, 장치 이름 저장
3. loadConfig(): 파일에서 설정 읽기
4. saveConfig(): 설정을 파일에 저장
5. 기본값 설정: 파일이 없으면 기본 설정 생성
6. 웹 인터페이스에서 설정 변경 가능
7. 설정 변경 후 자동 재부팅 옵션

📚 문법 설명 (코드 내 주석으로 포함):
- StaticJsonDocument<512> doc: JSON 문서 버퍼
- deserializeJson(doc, file): 파일에서 JSON 파싱
- serializeJsonPretty(doc, file): JSON을 보기 좋게 파일에 저장
- doc["key"] = value: JSON에 값 설정
- doc["key"].as<String>(): JSON에서 값 읽기
- doc.containsKey("key"): 키 존재 여부 확인
- doc.isNull(): JSON 파싱 실패 여부
- ESP.restart(): ESP32 재부팅

핀 정보:
- I2C: SDA(21), SCL(22) - OLED에 설정 표시
- 버튼: GPIO32 - 설정 초기화

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  23: { title: 'WebSocket 기초', project: '실시간 통신', files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'README.md'], prompt: `[Day 23] ESP32 Arduino - WebSocket 기초

프로젝트: 실시간 통신

프로젝트 구조:
day23_websocket_basic/
├── main.ino
├── websocket_server.h
├── websocket_server.cpp
└── README.md

요구사항:
1. WebSocketsServer 라이브러리 설치 (by Markus Sattler)
2. WebSocketsServer webSocket(81) - 포트 81에서 WebSocket 서버 시작
3. onEvent 콜백으로 연결/해제/메시지 이벤트 처리
4. 클라이언트 연결 시 환영 메시지 전송
5. 클라이언트 메시지 수신 시 에코 응답
6. 연결된 모든 클라이언트에게 브로드캐스트
7. 시리얼 모니터에 이벤트 로그 출력

📚 문법 설명 (코드 내 주석으로 포함):
- #include <WebSocketsServer.h>: WebSocket 서버 라이브러리
- WebSocketsServer webSocket(port): WebSocket 서버 객체 생성
- webSocket.begin(): WebSocket 서버 시작
- webSocket.onEvent(callback): 이벤트 핸들러 등록
- webSocket.loop(): 이벤트 처리 (loop에서 호출)
- WStype_CONNECTED: 클라이언트 연결됨
- WStype_DISCONNECTED: 클라이언트 연결 해제
- WStype_TEXT: 텍스트 메시지 수신
- webSocket.sendTXT(num, text): 특정 클라이언트에게 전송
- webSocket.broadcastTXT(text): 모든 클라이언트에게 전송

핀 정보:
- I2C: SDA(21), SCL(22) - OLED에 연결 상태 표시
- LED: BLUE(27) 연결됨

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  24: { title: 'WebSocket LED 제어', project: '실시간 LED 제어', files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'led_control.h', 'led_control.cpp', 'data/index.html', 'README.md'], prompt: `[Day 24] ESP32 Arduino - WebSocket LED 제어

프로젝트: 실시간 LED 제어

프로젝트 구조:
day24_websocket_led/
├── main.ino
├── websocket_server.h
├── websocket_server.cpp
├── led_control.h
├── led_control.cpp
├── data/
│   └── index.html
└── README.md

요구사항:
1. WebSocket으로 실시간 LED 제어
2. JSON 명령 형식: {"led": "red", "state": "on"}
3. 웹 페이지에 3색 LED 버튼 (빨강, 노랑, 파랑)
4. 버튼 클릭 → WebSocket 메시지 전송 → LED 제어
5. LED 상태 변경 시 모든 클라이언트에게 상태 브로드캐스트
6. 여러 브라우저에서 동시 접속해도 상태 동기화
7. 현재 LED 상태를 웹 페이지에 실시간 표시

📚 문법 설명 (코드 내 주석으로 포함):
- JSON.stringify(obj): JavaScript 객체를 JSON 문자열로 변환
- JSON.parse(str): JSON 문자열을 JavaScript 객체로 변환
- ws.send(message): WebSocket으로 메시지 전송
- ws.onmessage = (event) => {}: 메시지 수신 이벤트 핸들러
- deserializeJson(doc, payload): Arduino에서 JSON 파싱
- 상태 동기화: 한 클라이언트의 변경을 모든 클라이언트에 반영

핀 정보:
- LED: RED(25), YELLOW(26), BLUE(27) - Active HIGH
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: data/index.html =====
(HTML + JavaScript 코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  25: { title: 'WebSocket 센서 모니터', project: '실시간 센서 대시보드', files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'data/index.html', 'README.md'], prompt: `[Day 25] ESP32 Arduino - WebSocket 센서 모니터

프로젝트: 실시간 센서 대시보드

프로젝트 구조:
day25_websocket_sensor/
├── main.ino
├── websocket_server.h
├── websocket_server.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
├── data/
│   └── index.html
└── README.md

요구사항:
1. 1초마다 AHT20 센서 데이터를 WebSocket으로 브로드캐스트
2. JSON 형식: {"temp": 25.5, "humid": 60.2, "time": 12345}
3. 웹 페이지에 실시간 그래프 표시 (Chart.js 사용)
4. 최근 60개 데이터 포인트 유지 (1분간 기록)
5. 온도/습도 최고/최저값 표시
6. 경고 임계값 설정: 온도 30도 이상 시 빨간색 표시
7. 연결 상태 표시 (Connected/Disconnected)

📚 문법 설명 (코드 내 주석으로 포함):
- millis() 기반 non-blocking 타이머: 1초마다 데이터 전송
- Chart.js: 웹 그래프 라이브러리 (CDN으로 로드)
- chart.data.datasets[0].data.push(value): 데이터 추가
- chart.data.labels.push(label): 라벨 추가
- chart.update(): 그래프 갱신
- Array.shift(): 배열 첫 요소 제거 (오래된 데이터 삭제)

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED
- LED: RED(25) 고온 경고

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: data/index.html =====
(HTML + Chart.js 코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
  26: { title: 'LoRa 모듈 기초', project: 'LoRa 초기화', files: ['main.ino', 'lora_driver.h', 'lora_driver.cpp', 'config.h', 'README.md'], prompt: `[Day 26] ESP32 Arduino - LoRa 모듈 기초

프로젝트: LoRa 초기화

프로젝트 구조:
day26_lora_basic/
├── main.ino
├── lora_driver.h
├── lora_driver.cpp
├── config.h
└── README.md

요구사항:
1. UART2 핀 설정: TX=17, RX=16 (Serial2 사용)
2. M0(GPIO15), M1(GPIO4) 모드 핀을 OUTPUT으로 설정
3. AUX(GPIO34) 상태 읽기 (INPUT)
4. 모드 설정: M0=0, M1=0 (일반 모드)
5. Serial2.begin(9600)으로 LoRa 모듈과 통신
6. 모듈 응답 확인 및 시리얼 모니터 출력
7. OLED에 LoRa 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- Serial2.begin(baud, config, rxPin, txPin): UART2 초기화
- LoRa 모듈 모드: M0/M1 조합으로 동작 모드 설정
  - M0=0, M1=0: 일반 모드 (송수신)
  - M0=1, M1=0: Wake-up 모드
  - M0=0, M1=1: 절전 모드
  - M0=1, M1=1: 설정 모드
- AUX 핀: LOW=모듈 바쁨, HIGH=준비 완료
- Serial2.available(): 수신 데이터 유무 확인
- Serial2.read(): 1바이트 읽기

핀 정보:
- LoRa UART2: TX(17), RX(16)
- LoRa 제어: M0(15), M1(4), AUX(34)
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  27: { title: 'LoRa 파라미터 설정', project: 'LoRa 설정 프로그램', files: ['main.ino', 'lora_config.h', 'lora_config.cpp', 'README.md'], prompt: `[Day 27] ESP32 Arduino - LoRa 파라미터 설정

프로젝트: LoRa 설정 프로그램

프로젝트 구조:
day27_lora_config/
├── main.ino
├── lora_config.h
├── lora_config.cpp
└── README.md

요구사항:
1. M0=1, M1=1로 설정 모드 진입
2. AT 명령으로 모듈 파라미터 읽기/쓰기
3. 주소(ADDH, ADDL), 채널(CHAN), 통신 속도 설정
4. 시리얼 모니터에서 명령 입력 → LoRa 모듈로 전달
5. 설정 완료 후 일반 모드로 복귀
6. 현재 설정값 OLED에 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 설정 모드: M0=1, M1=1로 진입
- E32 모듈 설정 명령:
  - 0xC0: 설정 저장 (전원 꺼도 유지)
  - 0xC2: 설정 저장 안함 (임시)
  - 0xC1: 현재 설정 읽기
- 설정 바이트: [HEAD, ADDH, ADDL, SPED, CHAN, OPTION]
- SPED: 통신 속도 + 공중 속도
- CHAN: 채널 번호 (410MHz + CHAN * 1MHz)
- delay(100): 모드 전환 후 안정화 대기

핀 정보:
- LoRa UART2: TX(17), RX(16)
- LoRa 제어: M0(15), M1(4), AUX(34)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  28: { title: 'LoRa 거리 테스트', project: 'LoRa 범위 측정', files: ['main.ino', 'lora_driver.h', 'lora_driver.cpp', 'README.md'], prompt: `[Day 28] ESP32 Arduino - LoRa 거리 테스트

프로젝트: LoRa 범위 측정

프로젝트 구조:
day28_lora_range/
├── main.ino
├── lora_driver.h
├── lora_driver.cpp
└── README.md

요구사항:
1. 송신기: 1초마다 시퀀스 번호 포함 패킷 전송
2. 수신기: 패킷 수신 후 RSSI 값 측정 (가능한 경우)
3. 패킷 손실률 계산 (수신 개수 / 전송 개수)
4. 버튼으로 송신/수신 모드 전환
5. OLED에 통신 상태 표시: 패킷 수, 손실률
6. LED로 수신 성공/실패 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 시퀀스 번호: 패킷 순서 확인용 증가 카운터
- 패킷 손실률 = (1 - 수신수/송신수) * 100%
- millis() 타이머: 1초 간격 송신
- 수신 타임아웃: 일정 시간 내 응답 없으면 손실 처리
- RSSI (Received Signal Strength Indicator): 신호 세기

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- 버튼: GPIO32 - 모드 전환
- LED: RED(25) 손실, BLUE(27) 성공

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  29: { title: 'LoRa 문자열 통신', project: '텍스트 메시지 송수신', files: ['main.ino', 'lora_comm.h', 'lora_comm.cpp', 'README.md'], prompt: `[Day 29] ESP32 Arduino - LoRa 문자열 통신

프로젝트: 텍스트 메시지 송수신

프로젝트 구조:
day29_lora_text/
├── main.ino
├── lora_comm.h
├── lora_comm.cpp
└── README.md

요구사항:
1. 시리얼 모니터에서 입력한 메시지를 LoRa로 전송
2. LoRa로 수신한 메시지를 시리얼 모니터에 출력
3. 메시지 구분자: 줄바꿈(\\n) 사용
4. 최대 메시지 길이: 58바이트 (E32 모듈 버퍼 제한)
5. OLED에 최근 송신/수신 메시지 표시
6. 송신 시 YELLOW LED, 수신 시 BLUE LED 깜빡임

📚 문법 설명 (코드 내 주석으로 포함):
- Serial.readStringUntil('\\n'): 줄바꿈까지 문자열 읽기
- Serial2.print(message): LoRa로 문자열 전송
- String 클래스: 문자열 조작 (length(), substring(), c_str())
- 버퍼링: 수신 데이터 누적 후 완전한 메시지 처리
- trim(): 문자열 앞뒤 공백 제거

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- LED: YELLOW(26) 송신, BLUE(27) 수신
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  30: { title: 'LoRa 구조체 전송', project: '센서 데이터 패킷', files: ['main.ino', 'lora_packet.h', 'lora_packet.cpp', 'README.md'], prompt: `[Day 30] ESP32 Arduino - LoRa 구조체 전송

프로젝트: 센서 데이터 패킷

프로젝트 구조:
day30_lora_struct/
├── main.ino
├── lora_packet.h
├── lora_packet.cpp
└── README.md

요구사항:
1. 센서 데이터 구조체 정의 (온도, 습도, 장치ID, 시퀀스)
2. 구조체를 바이트 배열로 변환하여 LoRa 전송
3. 수신 측에서 바이트 배열을 구조체로 복원
4. CRC 체크섬으로 데이터 무결성 확인
5. AHT20 센서 데이터 실시간 전송
6. OLED에 송수신 데이터 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #pragma pack(push, 1): 구조체 패딩 제거 (메모리 정렬)
- struct __attribute__((packed)): GCC에서 패딩 제거
- memcpy(dest, src, size): 메모리 복사
- sizeof(struct): 구조체 크기
- CRC8/CRC16: 순환 중복 검사로 데이터 오류 검출
- union: 같은 메모리를 다른 타입으로 접근

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  31: { title: 'LoRa ACK 시스템', project: '신뢰성 있는 전송', files: ['main.ino', 'lora_reliable.h', 'lora_reliable.cpp', 'README.md'], prompt: `[Day 31] ESP32 Arduino - LoRa ACK 시스템

프로젝트: 신뢰성 있는 전송

프로젝트 구조:
day31_lora_ack/
├── main.ino
├── lora_reliable.h
├── lora_reliable.cpp
└── README.md

요구사항:
1. 데이터 전송 후 ACK(응답) 대기
2. 타임아웃(2초) 내 ACK 미수신 시 재전송 (최대 3회)
3. 패킷 구조: [타입][시퀀스][데이터][CRC]
4. 타입: DATA(0x01), ACK(0x02)
5. 수신 측: 데이터 수신 → ACK 응답 전송
6. 송신 결과(성공/실패/재시도 횟수) 표시

📚 문법 설명 (코드 내 주석으로 포함):
- ACK (Acknowledgment): 수신 확인 응답
- 재전송 로직: while(재시도 < 최대) { 전송 → 대기 → 확인 }
- 타임아웃: millis() 기반 시간 초과 검사
- 상태 머신: IDLE → WAIT_ACK → SUCCESS/TIMEOUT
- enum: 상태값 정의 (STATE_IDLE, STATE_WAIT_ACK 등)

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- LED: RED(25) 실패, YELLOW(26) 재시도, BLUE(27) 성공

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  32: { title: 'LoRa 센서 노드', project: '원격 센서 노드', files: ['main.ino', 'sensor_node.h', 'sensor_node.cpp', 'README.md'], prompt: `[Day 32] ESP32 Arduino - LoRa 센서 노드

프로젝트: 원격 센서 노드

프로젝트 구조:
day32_sensor_node/
├── main.ino
├── sensor_node.h
├── sensor_node.cpp
└── README.md

요구사항:
1. 30초마다 센서 데이터 수집 및 LoRa 전송
2. 딥슬립 모드로 전력 절약 (배터리 구동 고려)
3. 패킷 구조: [노드ID][온도][습도][배터리전압][시퀀스]
4. ACK 수신 시 정상 동작, 미수신 시 재시도
5. 깨어날 때마다 LED 깜빡임으로 동작 확인
6. OLED에 마지막 전송 정보 표시 후 슬립

📚 문법 설명 (코드 내 주석으로 포함):
- esp_sleep_enable_timer_wakeup(us): 타이머 웨이크업 설정
- esp_deep_sleep_start(): 딥슬립 모드 진입
- RTC_DATA_ATTR: 딥슬립 후에도 유지되는 변수
- 배터리 전압 측정: analogRead() + 전압 분배 회로
- 전력 최적화: 불필요한 주변장치 비활성화

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- I2C: SDA(21), SCL(22) - AHT20, OLED
- 배터리 ADC: GPIO35

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  33: { title: 'LoRa 게이트웨이', project: 'LoRa-WiFi 브릿지', files: ['main.ino', 'gateway.h', 'gateway.cpp', 'README.md'], prompt: `[Day 33] ESP32 Arduino - LoRa 게이트웨이

프로젝트: LoRa-WiFi 브릿지

프로젝트 구조:
day33_lora_gateway/
├── main.ino
├── gateway.h
├── gateway.cpp
└── README.md

요구사항:
1. LoRa로 수신한 센서 데이터를 WiFi로 웹서버에 표시
2. 여러 센서 노드 데이터 관리 (노드ID별 구분)
3. 웹 대시보드: 각 노드의 최신 데이터 표시
4. JSON API: /api/nodes로 모든 노드 데이터 제공
5. ACK 응답 자동 전송
6. OLED에 활성 노드 수와 최근 수신 정보 표시

📚 문법 설명 (코드 내 주석으로 포함):
- std::map<nodeId, SensorData>: 노드별 데이터 저장
- 게이트웨이 패턴: LoRa ↔ Gateway ↔ WiFi/Internet
- 데이터 집계: 여러 센서의 데이터를 하나로 모음
- 타임스탬프: 각 데이터의 수신 시간 기록
- 노드 타임아웃: 일정 시간 무응답 노드는 오프라인 처리

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  34: { title: 'LoRa 브로드캐스트', project: '일대다 통신', files: ['main.ino', 'lora_broadcast.h', 'lora_broadcast.cpp', 'README.md'], prompt: `[Day 34] ESP32 Arduino - LoRa 브로드캐스트

프로젝트: 일대다 통신

프로젝트 구조:
day34_lora_broadcast/
├── main.ino
├── lora_broadcast.h
├── lora_broadcast.cpp
└── README.md

요구사항:
1. 마스터 노드: 모든 슬레이브에게 명령 브로드캐스트
2. 브로드캐스트 주소: 0xFFFF (모든 장치 수신)
3. 명령 종류: LED 제어, 센서 읽기 요청, 설정 변경
4. 슬레이브: 명령 수신 → 실행 → 개별 응답
5. 웹 인터페이스에서 브로드캐스트 명령 전송
6. 각 슬레이브 응답 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 브로드캐스트: 모든 장치에 동시 전송 (1:N 통신)
- 유니캐스트: 특정 장치에만 전송 (1:1 통신)
- 주소 지정: E32 모듈의 ADDH, ADDL로 대상 지정
- 0xFFFF: 브로드캐스트 주소 (모든 장치)
- 명령-응답 프로토콜: [CMD_TYPE][PARAM][CRC]

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- LED: RED(25), YELLOW(26), BLUE(27)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  35: { title: 'LoRa 중계기', project: '메시 네트워크 기초', files: ['main.ino', 'lora_mesh.h', 'lora_mesh.cpp', 'README.md'], prompt: `[Day 35] ESP32 Arduino - LoRa 중계기

프로젝트: 메시 네트워크 기초

프로젝트 구조:
day35_lora_relay/
├── main.ino
├── lora_mesh.h
├── lora_mesh.cpp
└── README.md

요구사항:
1. 중계기: 수신한 패킷을 다른 노드로 재전송
2. TTL(Time To Live): 무한 루프 방지 (기본값 3)
3. 패킷 구조: [SRC][DST][TTL][SEQ][DATA][CRC]
4. 중복 패킷 필터링 (SRC+SEQ 조합으로 판단)
5. 라우팅 테이블: 목적지별 다음 홉 저장
6. 자신이 목적지면 처리, 아니면 TTL 감소 후 전달

📚 문법 설명 (코드 내 주석으로 포함):
- 메시 네트워크: 여러 노드가 서로 중계하여 통신 범위 확장
- TTL: 패킷이 거칠 수 있는 최대 홉 수
- 홉(Hop): 패킷이 거치는 중간 노드 수
- 라우팅: 목적지까지의 경로 결정
- 플러딩: 모든 이웃에게 패킷 전달 (단순 라우팅)
- std::set<uint16_t>: 중복 패킷 시퀀스 저장

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- LED: YELLOW(26) 중계, BLUE(27) 수신

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
  36: { title: 'EEPROM 기초', project: '데이터 영구 저장', files: ['main.ino', 'eeprom_manager.h', 'eeprom_manager.cpp', 'README.md'], prompt: `[Day 36] ESP32 Arduino - EEPROM 기초

프로젝트: 데이터 영구 저장

프로젝트 구조:
day36_eeprom/
├── main.ino
├── eeprom_manager.h
├── eeprom_manager.cpp
└── README.md

요구사항:
1. EEPROM.begin(512)로 512바이트 할당
2. EEPROM.write(주소, 값)으로 1바이트 쓰기
3. EEPROM.read(주소)로 1바이트 읽기
4. EEPROM.commit()으로 변경사항 저장
5. 카운터 값 저장: 부팅 횟수 기록
6. 버튼으로 값 증가, OLED에 현재 값 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <EEPROM.h>: EEPROM 라이브러리 (ESP32용 에뮬레이션)
- EEPROM.begin(size): EEPROM 영역 할당 (최대 4096)
- EEPROM.write(addr, value): 주소에 1바이트 쓰기
- EEPROM.read(addr): 주소에서 1바이트 읽기
- EEPROM.put(addr, data): 구조체/변수 쓰기 (여러 바이트)
- EEPROM.get(addr, data): 구조체/변수 읽기
- EEPROM.commit(): Flash에 실제 저장 (필수!)
- ESP32 EEPROM: 실제로는 Flash 메모리 사용

핀 정보:
- 버튼: GPIO32 - 카운터 증가
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  37: { title: 'Preferences 라이브러리', project: 'NVS 설정 저장', files: ['main.ino', 'preferences_manager.h', 'preferences_manager.cpp', 'README.md'], prompt: `[Day 37] ESP32 Arduino - Preferences 라이브러리

프로젝트: NVS 설정 저장

프로젝트 구조:
day37_preferences/
├── main.ino
├── preferences_manager.h
├── preferences_manager.cpp
└── README.md

요구사항:
1. Preferences 라이브러리로 키-값 데이터 저장
2. 네임스페이스: "settings"로 데이터 그룹화
3. 다양한 타입 저장: String, int, float, bool
4. WiFi 설정 저장 예제: SSID, Password
5. 버튼으로 설정 초기화 기능
6. 시리얼/OLED로 현재 설정값 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Preferences.h>: Preferences 라이브러리
- Preferences preferences: 객체 생성
- preferences.begin("namespace", false): 읽기/쓰기 모드로 열기
- preferences.begin("namespace", true): 읽기 전용 모드
- preferences.putString("key", value): 문자열 저장
- preferences.getString("key", default): 문자열 읽기 (없으면 기본값)
- preferences.putInt/getInt: 정수 저장/읽기
- preferences.putFloat/getFloat: 실수 저장/읽기
- preferences.remove("key"): 특정 키 삭제
- preferences.clear(): 네임스페이스 전체 삭제
- preferences.end(): 세션 종료

핀 정보:
- 버튼: GPIO32 - 설정 초기화
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  38: { title: '자동 WiFi 연결', project: '저장된 WiFi 자동 연결', files: ['main.ino', 'wifi_auto.h', 'wifi_auto.cpp', 'README.md'], prompt: `[Day 38] ESP32 Arduino - 자동 WiFi 연결

프로젝트: 저장된 WiFi 자동 연결

프로젝트 구조:
day38_wifi_auto/
├── main.ino
├── wifi_auto.h
├── wifi_auto.cpp
└── README.md

요구사항:
1. Preferences에서 저장된 WiFi 정보 읽기
2. 저장된 정보로 자동 연결 시도
3. 연결 실패 또는 정보 없음 → AP 모드로 캡티브 포털
4. 캡티브 포털에서 WiFi 설정 입력 → Preferences에 저장
5. 연결 성공 시 Station 모드로 전환
6. 버튼 5초 누름으로 저장된 WiFi 초기화

📚 문법 설명 (코드 내 주석으로 포함):
- 상태 머신: INIT → TRY_CONNECT → AP_MODE → CONNECTED
- WiFi.begin() 타임아웃: 10초 대기 후 실패 처리
- 듀얼 모드: WiFi.mode(WIFI_AP_STA) - AP와 STA 동시 사용
- 버튼 장시간 누름 감지: millis() 기반 시간 측정
- 재부팅: ESP.restart() 호출

핀 정보:
- 버튼: GPIO32 - WiFi 초기화 (5초 누름)
- LED: YELLOW(26) AP모드, BLUE(27) 연결됨
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  39: { title: 'SD 카드 기초', project: 'SD 카드 읽기/쓰기', files: ['main.ino', 'sd_manager.h', 'sd_manager.cpp', 'README.md'], prompt: `[Day 39] ESP32 Arduino - SD 카드 기초

프로젝트: SD 카드 읽기/쓰기

프로젝트 구조:
day39_sd_basic/
├── main.ino
├── sd_manager.h
├── sd_manager.cpp
└── README.md

요구사항:
1. SD.h 라이브러리로 SD 카드 초기화
2. SPI 핀 설정: CS, MOSI, MISO, SCK
3. 파일 쓰기: /test.txt에 텍스트 저장
4. 파일 읽기: 저장된 내용 시리얼 출력
5. 디렉토리 생성 및 파일 목록 출력
6. SD 카드 정보 출력: 용량, 사용량

📚 문법 설명 (코드 내 주석으로 포함):
- #include <SD.h>: SD 카드 라이브러리
- #include <SPI.h>: SPI 통신 라이브러리
- SD.begin(CS_PIN): SD 카드 초기화 (CS 핀 지정)
- SD.open(path, mode): 파일 열기 (FILE_WRITE, FILE_READ)
- file.println(): 파일에 줄 쓰기
- file.readStringUntil(): 파일에서 읽기
- SD.mkdir(path): 디렉토리 생성
- SD.exists(path): 파일/폴더 존재 확인
- SD.remove(path): 파일 삭제

핀 정보:
- SD SPI: CS(5), MOSI(23), MISO(19), SCK(18)
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  40: { title: 'SD 카드 데이터 로깅', project: '센서 데이터 CSV 저장', files: ['main.ino', 'data_logger.h', 'data_logger.cpp', 'README.md'], prompt: `[Day 40] ESP32 Arduino - SD 카드 데이터 로깅

프로젝트: 센서 데이터 CSV 저장

프로젝트 구조:
day40_sd_logging/
├── main.ino
├── data_logger.h
├── data_logger.cpp
└── README.md

요구사항:
1. 30초마다 센서 데이터를 CSV 형식으로 SD 카드에 저장
2. CSV 형식: 시간,온도,습도,장치ID
3. 날짜별 파일 생성: /logs/2024-01-15.csv
4. 파일 헤더 자동 생성 (첫 줄에 컬럼명)
5. 웹 인터페이스에서 로그 파일 다운로드
6. SD 카드 용량 부족 시 경고

📚 문법 설명 (코드 내 주석으로 포함):
- CSV (Comma Separated Values): 쉼표로 구분된 데이터 형식
- 파일 append 모드: 기존 파일 끝에 추가
- 날짜 형식화: sprintf(buffer, "%04d-%02d-%02d", year, month, day)
- 데이터 플러시: file.flush()로 버퍼 강제 저장
- millis() 타이머: 30초 간격 기록

핀 정보:
- SD SPI: CS(5), MOSI(23), MISO(19), SCK(18)
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  41: { title: 'NTP 시간 동기화', project: '인터넷 시간 연동', files: ['main.ino', 'ntp_time.h', 'ntp_time.cpp', 'README.md'], prompt: `[Day 41] ESP32 Arduino - NTP 시간 동기화

프로젝트: 인터넷 시간 연동

프로젝트 구조:
day41_ntp_time/
├── main.ino
├── ntp_time.h
├── ntp_time.cpp
└── README.md

요구사항:
1. WiFi 연결 후 NTP 서버에서 시간 동기화
2. 한국 시간대(KST, UTC+9) 설정
3. configTime() 함수로 NTP 설정
4. getLocalTime()으로 현재 시간 가져오기
5. OLED에 시계 표시 (시:분:초)
6. 1시간마다 자동 재동기화

📚 문법 설명 (코드 내 주석으로 포함):
- configTime(gmtOffset, daylightOffset, ntpServer): NTP 설정
- gmtOffset_sec: GMT 오프셋 (한국 = 9*3600 = 32400)
- daylightOffset_sec: 서머타임 오프셋 (한국 = 0)
- ntpServer: "pool.ntp.org" 또는 "time.google.com"
- struct tm timeinfo: 시간 정보 구조체
- getLocalTime(&timeinfo): 현재 시간 가져오기
- strftime(buffer, size, format, &timeinfo): 시간 포맷팅

핀 정보:
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  42: { title: '시간 기반 로깅', project: '타임스탬프 로그', files: ['main.ino', 'timed_logger.h', 'timed_logger.cpp', 'README.md'], prompt: `[Day 42] ESP32 Arduino - 시간 기반 로깅

프로젝트: 타임스탬프 로그

프로젝트 구조:
day42_timed_logging/
├── main.ino
├── timed_logger.h
├── timed_logger.cpp
└── README.md

요구사항:
1. NTP로 정확한 시간 동기화
2. 센서 데이터 + 타임스탬프 SD 카드 저장
3. 날짜별 폴더 자동 생성: /logs/2024/01/15/
4. ISO 8601 형식 타임스탬프: 2024-01-15T14:30:25
5. 로그 레벨 지원: INFO, WARNING, ERROR
6. 웹에서 로그 조회 및 필터링

📚 문법 설명 (코드 내 주석으로 포함):
- ISO 8601: 국제 표준 날짜/시간 형식
- 로그 레벨: enum LogLevel { INFO, WARNING, ERROR }
- 로그 포맷: [TIMESTAMP][LEVEL] message
- 버퍼링: 여러 로그 모아서 한번에 쓰기 (Flash 수명)
- 로그 로테이션: 오래된 파일 자동 삭제

핀 정보:
- SD SPI: CS(5), MOSI(23), MISO(19), SCK(18)
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  43: { title: '중급 종합 프로젝트 1', project: 'IoT 환경 모니터 v2 - 센서/웹', files: ['main.ino', 'config.h', 'wifi_manager.h', 'wifi_manager.cpp', 'web_server.h', 'web_server.cpp', 'sensor_manager.h', 'sensor_manager.cpp', 'README.md'], prompt: `[Day 43] ESP32 Arduino - 중급 종합 프로젝트 1

프로젝트: IoT 환경 모니터 v2 - 센서/웹

프로젝트 구조:
day43_iot_v2_part1/
├── main.ino
├── config.h
├── wifi_manager.h / .cpp
├── web_server.h / .cpp
├── sensor_manager.h / .cpp
└── README.md

요구사항:
1. 캡티브 포털로 WiFi 설정 (Preferences 저장)
2. WebSocket으로 실시간 센서 데이터 전송
3. Chart.js 그래프로 온습도 시각화
4. LED 원격 제어 (WebSocket 양방향 통신)
5. 설정 페이지: 샘플링 간격, 경고 임계값 변경
6. OLED 대시보드: IP, 센서값, 연결 클라이언트 수

📚 문법 설명 (코드 내 주석으로 포함):
- 모듈화: 기능별로 .h/.cpp 파일 분리
- 싱글톤 패턴: 전역 인스턴스 관리
- 콜백 함수: 이벤트 기반 프로그래밍
- 상태 관리: 전역 상태 객체로 데이터 공유

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED
- LED: RED(25), YELLOW(26), BLUE(27)
- 버튼: GPIO32

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  44: { title: '중급 종합 프로젝트 2', project: 'IoT 환경 모니터 v2 - LoRa', files: ['main.ino', 'config.h', 'lora_manager.h', 'lora_manager.cpp', 'sensor_node.h', 'sensor_node.cpp', 'README.md'], prompt: `[Day 44] ESP32 Arduino - 중급 종합 프로젝트 2

프로젝트: IoT 환경 모니터 v2 - LoRa

프로젝트 구조:
day44_iot_v2_part2/
├── main.ino
├── config.h
├── lora_manager.h / .cpp
├── sensor_node.h / .cpp (센서 노드용)
├── gateway.h / .cpp (게이트웨이용)
└── README.md

요구사항:
1. 센서 노드: 딥슬립 + 주기적 데이터 전송
2. 게이트웨이: LoRa 수신 + WiFi 웹서버 연동
3. ACK 기반 신뢰성 있는 통신
4. 다중 노드 지원 (노드ID로 구분)
5. 배터리 전압 모니터링 및 저전압 경고
6. 게이트웨이 웹: 모든 노드 상태 대시보드

📚 문법 설명 (코드 내 주석으로 포함):
- 컴파일 분기: #ifdef SENSOR_NODE / #ifdef GATEWAY
- 전력 최적화: WiFi.mode(WIFI_OFF), btStop()
- 노드 관리: std::map으로 다중 노드 데이터 저장
- 상태 타임아웃: 일정 시간 무응답 = 오프라인

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- I2C: SDA(21), SCL(22) - AHT20, OLED
- 배터리 ADC: GPIO35

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  45: { title: '중급 종합 프로젝트 3', project: 'IoT 환경 모니터 v2 - 통합', files: ['main.ino', 'config.h', 'wifi_manager.h', 'wifi_manager.cpp', 'web_server.h', 'web_server.cpp', 'lora_manager.h', 'lora_manager.cpp', 'data_logger.h', 'data_logger.cpp', 'README.md'], prompt: `[Day 45] ESP32 Arduino - 중급 종합 프로젝트 3

프로젝트: IoT 환경 모니터 v2 - 통합

프로젝트 구조:
day45_iot_v2_complete/
├── main.ino
├── config.h
├── wifi_manager.h / .cpp
├── web_server.h / .cpp
├── lora_manager.h / .cpp
├── data_logger.h / .cpp
├── display_manager.h / .cpp
└── README.md

요구사항:
1. Day 43 + Day 44 기능 통합
2. SD 카드 데이터 로깅 (NTP 타임스탬프)
3. 웹에서 로그 파일 다운로드
4. OTA(Over-The-Air) 펌웨어 업데이트
5. 시스템 상태 모니터링 (Heap, 업타임, WiFi 신호)
6. 에러 처리 및 자동 복구 로직

📚 문법 설명 (코드 내 주석으로 포함):
- OTA: ArduinoOTA 라이브러리로 무선 업데이트
- Watchdog Timer: 시스템 행 방지
- 에러 로깅: 시리얼 + SD 카드 + 웹 표시
- 상태 머신: 복잡한 시스템 상태 관리
- 태스크 스케줄러: millis() 기반 다중 타이머

핀 정보:
- LoRa UART2: TX(17), RX(16), M0(15), M1(4), AUX(34)
- SD SPI: CS(5), MOSI(23), MISO(19), SCK(18)
- I2C: SDA(21), SCL(22) - AHT20, OLED
- LED: RED(25), YELLOW(26), BLUE(27)
- 버튼: GPIO32

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
};

// 고급 과정 (Day 46-90)
const advancedPrompts: { [day: number]: PromptData } = {
  46: { title: 'MQTT 기초', project: 'MQTT 연결', files: ['main.ino', 'mqtt_client.h', 'mqtt_client.cpp', 'README.md'], prompt: `[Day 46] ESP32 Arduino - MQTT 기초

프로젝트: MQTT 연결

프로젝트 구조:
day46_mqtt_basic/
├── main.ino
├── mqtt_client.h
├── mqtt_client.cpp
└── README.md

요구사항:
1. PubSubClient 라이브러리 설치 및 사용
2. 공개 MQTT 브로커 연결 (test.mosquitto.org)
3. WiFi 연결 → MQTT 연결 → 상태 표시
4. 연결 끊김 시 자동 재연결 로직
5. 시리얼 모니터에 연결 상태 출력
6. OLED에 MQTT 연결 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <PubSubClient.h>: MQTT 클라이언트 라이브러리
- PubSubClient client(wifiClient): MQTT 클라이언트 객체 생성
- client.setServer(broker, port): MQTT 브로커 설정
- client.connect(clientId): 브로커에 연결
- client.connected(): 연결 상태 확인
- client.loop(): MQTT 이벤트 처리 (loop에서 호출)
- MQTT: Message Queuing Telemetry Transport (경량 IoT 프로토콜)

핀 정보:
- I2C: SDA(21), SCL(22) - OLED
- LED: BLUE(27) 연결됨

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  47: { title: 'MQTT 발행/구독', project: 'Pub/Sub 통신', files: ['main.ino', 'mqtt_pubsub.h', 'mqtt_pubsub.cpp', 'README.md'], prompt: `[Day 47] ESP32 Arduino - MQTT 발행/구독

프로젝트: Pub/Sub 통신

프로젝트 구조:
day47_mqtt_pubsub/
├── main.ino
├── mqtt_pubsub.h
├── mqtt_pubsub.cpp
└── README.md

요구사항:
1. 토픽에 메시지 발행 (Publish)
2. 토픽 구독 및 메시지 수신 (Subscribe)
3. 발행 토픽: "esp32/sensor" (온습도 데이터)
4. 구독 토픽: "esp32/led" (LED 제어 명령)
5. JSON 형식 메시지: {"temp":25.5, "humid":60}
6. 수신 메시지에 따라 LED 제어

📚 문법 설명 (코드 내 주석으로 포함):
- client.publish(topic, payload): 메시지 발행
- client.subscribe(topic): 토픽 구독
- client.setCallback(callback): 수신 콜백 함수 등록
- callback(topic, payload, length): 메시지 수신 시 호출됨
- QoS (Quality of Service): 0=최대 1회, 1=최소 1회, 2=정확히 1회
- Retained 메시지: 브로커가 마지막 메시지 저장

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED
- LED: RED(25), YELLOW(26), BLUE(27)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  48: { title: 'MQTT 센서 모니터', project: 'MQTT 센서 대시보드', files: ['main.ino', 'mqtt_sensor.h', 'mqtt_sensor.cpp', 'README.md'], prompt: `[Day 48] ESP32 Arduino - MQTT 센서 모니터

프로젝트: MQTT 센서 대시보드

프로젝트 구조:
day48_mqtt_sensor/
├── main.ino
├── mqtt_sensor.h
├── mqtt_sensor.cpp
└── README.md

요구사항:
1. 30초마다 센서 데이터 MQTT 발행
2. 별도 토픽으로 개별 값 발행: esp32/temp, esp32/humid
3. 상태 토픽: esp32/status (online/offline)
4. Last Will 메시지 설정 (비정상 종료 감지)
5. Node-RED 또는 MQTT Explorer로 수신 확인
6. 웹 대시보드 예제 (HTML + MQTT.js)

📚 문법 설명 (코드 내 주석으로 포함):
- client.connect(id, user, pass, willTopic, willQos, willRetain, willMessage): LWT 포함 연결
- Last Will and Testament (LWT): 비정상 종료 시 브로커가 자동 발행
- 토픽 계층: device/sensor/type 형식으로 구조화
- Retained 활용: 상태 정보는 retained=true로 발행
- QoS 1 사용: 센서 데이터 신뢰성 확보

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  49: { title: 'Firebase 소개', project: 'Firebase 프로젝트 설정', files: ['main.ino', 'firebase_config.h', 'firebase_config.cpp', 'README.md'], prompt: `[Day 49] ESP32 Arduino - Firebase 소개

프로젝트: Firebase 프로젝트 설정

프로젝트 구조:
day49_firebase_intro/
├── main.ino
├── firebase_config.h
├── firebase_config.cpp
└── README.md

요구사항:
1. Firebase 프로젝트 생성 및 설정 안내
2. Firebase ESP32 Client 라이브러리 설치
3. API 키, 데이터베이스 URL, 인증 정보 설정
4. Firebase 연결 테스트
5. 시리얼에 연결 상태 출력
6. 보안 규칙 설정 안내 (테스트용 규칙)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Firebase_ESP_Client.h>: Firebase 라이브러리
- FirebaseData fbdo: 데이터 객체
- FirebaseAuth auth: 인증 객체
- FirebaseConfig config: 설정 객체
- config.api_key: Firebase API 키
- config.database_url: Realtime Database URL
- Firebase.begin(&config, &auth): Firebase 초기화
- Firebase.ready(): 연결 준비 상태 확인

핀 정보:
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  50: { title: 'Firebase Realtime Database', project: '클라우드 데이터 저장', files: ['main.ino', 'firebase_db.h', 'firebase_db.cpp', 'README.md'], prompt: `[Day 50] ESP32 Arduino - Firebase Realtime Database

프로젝트: 클라우드 데이터 저장

프로젝트 구조:
day50_firebase_rtdb/
├── main.ino
├── firebase_db.h
├── firebase_db.cpp
└── README.md

요구사항:
1. Firebase RTDB에 센서 데이터 쓰기
2. 경로: /devices/esp32_001/sensors/temperature
3. JSON 구조로 여러 값 한번에 쓰기
4. 타임스탬프 포함: /devices/esp32_001/lastUpdate
5. 데이터 읽기 및 시리얼 출력
6. Firebase 콘솔에서 실시간 확인

📚 문법 설명 (코드 내 주석으로 포함):
- Firebase.RTDB.setFloat(&fbdo, path, value): float 쓰기
- Firebase.RTDB.setString(&fbdo, path, value): 문자열 쓰기
- Firebase.RTDB.setJSON(&fbdo, path, &json): JSON 쓰기
- Firebase.RTDB.getFloat(&fbdo, path): float 읽기
- fbdo.floatData(): 읽은 값 가져오기
- 경로: /부모/자식/키 형식의 계층 구조

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  51: { title: 'Firebase 스트림', project: '실시간 데이터 동기화', files: ['main.ino', 'firebase_stream.h', 'firebase_stream.cpp', 'README.md'], prompt: `[Day 51] ESP32 Arduino - Firebase 스트림

프로젝트: 실시간 데이터 동기화

프로젝트 구조:
day51_firebase_stream/
├── main.ino
├── firebase_stream.h
├── firebase_stream.cpp
└── README.md

요구사항:
1. Firebase 스트림으로 실시간 데이터 변경 감지
2. 웹/앱에서 값 변경 → ESP32 즉시 반응
3. 스트림 경로: /devices/esp32_001/commands
4. LED 제어 명령 수신 및 실행
5. 스트림 콜백 함수 구현
6. 연결 끊김 시 자동 재연결

📚 문법 설명 (코드 내 주석으로 포함):
- Firebase.RTDB.beginStream(&stream, path): 스트림 시작
- Firebase.RTDB.setStreamCallback(&stream, callback, timeout): 콜백 등록
- stream.dataType(): 수신 데이터 타입
- stream.stringData(): 수신 문자열
- stream.intData(): 수신 정수
- 스트림: 서버 푸시 방식으로 실시간 업데이트

핀 정보:
- LED: RED(25), YELLOW(26), BLUE(27)
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  52: { title: 'Firebase 히스토리 저장', project: '시계열 데이터 저장', files: ['main.ino', 'firebase_history.h', 'firebase_history.cpp', 'README.md'], prompt: `[Day 52] ESP32 Arduino - Firebase 히스토리 저장

프로젝트: 시계열 데이터 저장

프로젝트 구조:
day52_firebase_history/
├── main.ino
├── firebase_history.h
├── firebase_history.cpp
└── README.md

요구사항:
1. 센서 데이터를 시계열로 저장 (push)
2. 경로: /devices/esp32_001/history/{auto_id}
3. 데이터 구조: {timestamp, temp, humid}
4. 5분마다 데이터 저장
5. 오래된 데이터 자동 삭제 (Firebase Rules 또는 Functions)
6. 저장된 히스토리 데이터 조회

📚 문법 설명 (코드 내 주석으로 포함):
- Firebase.RTDB.pushJSON(&fbdo, path, &json): 자동 ID로 추가
- fbdo.pushName(): 생성된 자동 ID 반환
- 시계열 데이터: 시간순으로 저장되는 연속 데이터
- Firebase Timestamp: {".sv": "timestamp"} 서버 타임스탬프
- 데이터 정리: Firebase Rules의 .indexOn, .orderByChild

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  53: { title: 'ThingSpeak 소개', project: 'ThingSpeak 채널', files: ['main.ino', 'thingspeak_client.h', 'thingspeak_client.cpp', 'README.md'], prompt: `[Day 53] ESP32 Arduino - ThingSpeak 소개

프로젝트: ThingSpeak 채널

프로젝트 구조:
day53_thingspeak_intro/
├── main.ino
├── thingspeak_client.h
├── thingspeak_client.cpp
└── README.md

요구사항:
1. ThingSpeak 계정 생성 및 채널 설정 안내
2. ThingSpeak 라이브러리 설치
3. API 키 설정 (Write API Key)
4. 센서 데이터 Field 1, 2에 전송
5. 15초 간격 업로드 (ThingSpeak 무료 제한)
6. ThingSpeak 대시보드에서 그래프 확인

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ThingSpeak.h>: ThingSpeak 라이브러리
- ThingSpeak.begin(client): 초기화
- ThingSpeak.setField(field, value): 필드 값 설정
- ThingSpeak.writeFields(channelId, apiKey): 모든 필드 전송
- 채널: 센서 데이터를 그룹화하는 단위
- 필드: 채널 내 개별 데이터 (최대 8개)

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  54: { title: 'ThingSpeak 그래프', project: '데이터 시각화', files: ['main.ino', 'thingspeak_multi.h', 'thingspeak_multi.cpp', 'README.md'], prompt: `[Day 54] ESP32 Arduino - ThingSpeak 그래프

프로젝트: 데이터 시각화

프로젝트 구조:
day54_thingspeak_graph/
├── main.ino
├── thingspeak_multi.h
├── thingspeak_multi.cpp
└── README.md

요구사항:
1. 여러 센서 데이터 전송 (온도, 습도, 장치 상태)
2. ThingSpeak Visualizations 설정
3. MATLAB Analysis로 데이터 처리
4. 위젯으로 대시보드 구성
5. ThingSpeak 데이터 읽기 (Read API)
6. 알림 설정 (React 앱)

📚 문법 설명 (코드 내 주석으로 포함):
- ThingSpeak.readFloatField(channel, field, readKey): 데이터 읽기
- ThingSpeak.getLastReadStatus(): 읽기 상태 확인
- Visualization: 차트, 게이지, 숫자 표시 등
- MATLAB Analysis: 고급 데이터 처리 및 분석
- React: 조건 기반 알림 트리거

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  55: { title: 'Blynk 앱 연동', project: '스마트폰 제어', files: ['main.ino', 'blynk_client.h', 'blynk_client.cpp', 'README.md'], prompt: `[Day 55] ESP32 Arduino - Blynk 앱 연동

프로젝트: 스마트폰 제어

프로젝트 구조:
day55_blynk/
├── main.ino
├── blynk_client.h
├── blynk_client.cpp
└── README.md

요구사항:
1. Blynk 앱 설치 및 프로젝트 생성
2. Blynk 라이브러리 설치 (Blynk IoT)
3. 가상 핀(V0~V5) 사용하여 데이터 송수신
4. 스마트폰 버튼 → LED 제어
5. 센서 데이터 → 스마트폰 게이지 표시
6. 알림 기능: 온도 초과 시 푸시 알림

📚 문법 설명 (코드 내 주석으로 포함):
- #include <BlynkSimpleEsp32.h>: Blynk ESP32 라이브러리
- Blynk.begin(auth, ssid, pass): 초기화 및 연결
- BLYNK_WRITE(V0): 가상 핀 쓰기 콜백
- Blynk.virtualWrite(V1, value): 가상 핀에 값 전송
- Blynk.notify("메시지"): 푸시 알림 전송
- 가상 핀: 실제 GPIO가 아닌 소프트웨어 핀

핀 정보:
- LED: RED(25), YELLOW(26), BLUE(27)
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
  56: { title: 'HTTPS 클라이언트', project: '보안 API 호출', files: ['main.ino', 'https_client.h', 'https_client.cpp', 'README.md'], prompt: `[Day 56] ESP32 Arduino - HTTPS 클라이언트

프로젝트: 보안 API 호출

프로젝트 구조:
day56_https/
├── main.ino
├── https_client.h
├── https_client.cpp
└── README.md

요구사항:
1. WiFiClientSecure로 HTTPS 연결
2. 루트 인증서 설정 (CA Certificate)
3. 공개 HTTPS API 호출 (예: worldtimeapi.org)
4. JSON 응답 파싱
5. 인증서 검증 비활성화 옵션 (테스트용)
6. SSL 연결 상태 및 에러 처리

📚 문법 설명 (코드 내 주석으로 포함):
- #include <WiFiClientSecure.h>: 보안 WiFi 클라이언트
- WiFiClientSecure client: HTTPS용 클라이언트
- client.setCACert(root_ca): 루트 인증서 설정
- client.setInsecure(): 인증서 검증 비활성화 (테스트용)
- SSL/TLS: 암호화된 통신 프로토콜
- 인증서: 서버 신원 확인용 디지털 문서

핀 정보:
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  57: { title: 'HTTPS POST', project: '보안 데이터 전송', files: ['main.ino', 'https_post.h', 'https_post.cpp', 'README.md'], prompt: `[Day 57] ESP32 Arduino - HTTPS POST

프로젝트: 보안 데이터 전송

프로젝트 구조:
day57_https_post/
├── main.ino
├── https_post.h
├── https_post.cpp
└── README.md

요구사항:
1. HTTPS POST로 센서 데이터 전송
2. JSON 페이로드 구성
3. Content-Type: application/json 헤더 설정
4. 서버 응답 파싱 및 처리
5. 재시도 로직 구현 (3회)
6. 전송 결과 OLED 표시

📚 문법 설명 (코드 내 주석으로 포함):
- HTTPClient https: HTTP 클라이언트 객체
- https.begin(client, url): 보안 연결 시작
- https.addHeader("Content-Type", "application/json"): 헤더 추가
- https.POST(payload): POST 요청 수행
- https.getString(): 응답 본문 가져오기
- HTTP 상태 코드: 200(성공), 400(잘못된 요청), 500(서버 오류)

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  58: { title: 'API 인증', project: 'Bearer Token 인증', files: ['main.ino', 'api_auth.h', 'api_auth.cpp', 'README.md'], prompt: `[Day 58] ESP32 Arduino - API 인증

프로젝트: Bearer Token 인증

프로젝트 구조:
day58_api_auth/
├── main.ino
├── api_auth.h
├── api_auth.cpp
└── README.md

요구사항:
1. Bearer Token 인증 헤더 추가
2. API 키 인증 방식 구현
3. Basic Auth 인증 구현
4. 토큰 갱신 로직 (만료 처리)
5. 인증 정보 안전하게 저장 (Preferences)
6. 인증 실패 시 재로그인 처리

📚 문법 설명 (코드 내 주석으로 포함):
- https.addHeader("Authorization", "Bearer " + token): Bearer 토큰
- https.addHeader("X-API-Key", apiKey): API 키 헤더
- Basic Auth: Base64 인코딩된 username:password
- 토큰: 인증된 사용자임을 증명하는 문자열
- 토큰 만료: 보안을 위해 일정 시간 후 무효화

핀 정보:
- I2C: SDA(21), SCL(22) - OLED
- 버튼: GPIO32 - 재인증 트리거

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  59: { title: 'ArduinoOTA 기초', project: '무선 펌웨어 업데이트', files: ['main.ino', 'ota_handler.h', 'ota_handler.cpp', 'README.md'], prompt: `[Day 59] ESP32 Arduino - ArduinoOTA 기초

프로젝트: 무선 펌웨어 업데이트

프로젝트 구조:
day59_arduino_ota/
├── main.ino
├── ota_handler.h
├── ota_handler.cpp
└── README.md

요구사항:
1. ArduinoOTA 라이브러리로 OTA 설정
2. mDNS로 장치 검색 가능하게 설정
3. OTA 비밀번호 설정
4. Arduino IDE의 네트워크 포트에서 장치 선택
5. OTA 진행 상태 시리얼/OLED 표시
6. OTA 시작/종료/에러 콜백

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ArduinoOTA.h>: OTA 라이브러리
- ArduinoOTA.setHostname("esp32-device"): mDNS 이름 설정
- ArduinoOTA.setPassword("password"): OTA 비밀번호
- ArduinoOTA.onStart(callback): 시작 콜백
- ArduinoOTA.onProgress(callback): 진행 콜백
- ArduinoOTA.onEnd(callback): 완료 콜백
- ArduinoOTA.onError(callback): 에러 콜백
- ArduinoOTA.begin(): OTA 시작
- ArduinoOTA.handle(): 이벤트 처리 (loop에서 호출)

핀 정보:
- I2C: SDA(21), SCL(22) - OLED
- LED: BLUE(27) 업데이트 중

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  60: { title: '웹 기반 OTA', project: 'HTTP OTA 업데이트', files: ['main.ino', 'web_ota.h', 'web_ota.cpp', 'data/update.html', 'README.md'], prompt: `[Day 60] ESP32 Arduino - 웹 기반 OTA

프로젝트: HTTP OTA 업데이트

프로젝트 구조:
day60_web_ota/
├── main.ino
├── web_ota.h
├── web_ota.cpp
├── data/
│   └── update.html
└── README.md

요구사항:
1. 웹 페이지에서 펌웨어 파일(.bin) 업로드
2. /update 엔드포인트 구현
3. 파일 업로드 진행 상태 표시
4. 업로드 완료 후 자동 재부팅
5. 비밀번호 보호 (선택)
6. 현재 펌웨어 버전 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Update.h>: 펌웨어 업데이트 라이브러리
- Update.begin(size): 업데이트 시작
- Update.write(data, len): 데이터 쓰기
- Update.end(): 업데이트 완료
- Update.hasError(): 에러 확인
- server.upload(): 업로드 파일 정보 접근
- multipart/form-data: 파일 업로드용 인코딩

핀 정보:
- I2C: SDA(21), SCL(22) - OLED
- LED: YELLOW(26) 업로드 중, BLUE(27) 완료

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: data/update.html =====
(HTML 코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  61: { title: '자동 OTA 업데이트', project: '서버에서 펌웨어 다운로드', files: ['main.ino', 'auto_ota.h', 'auto_ota.cpp', 'README.md'], prompt: `[Day 61] ESP32 Arduino - 자동 OTA 업데이트

프로젝트: 서버에서 펌웨어 다운로드

프로젝트 구조:
day61_auto_ota/
├── main.ino
├── auto_ota.h
├── auto_ota.cpp
└── README.md

요구사항:
1. HTTP 서버에서 펌웨어 자동 다운로드
2. 버전 확인: /version.json에서 최신 버전 확인
3. 새 버전 있으면 /firmware.bin 다운로드
4. ESP32httpUpdate 라이브러리 사용
5. 업데이트 주기: 1시간마다 확인
6. 롤백 지원 (실패 시 이전 버전 복구)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ESP32httpUpdate.h>: HTTP OTA 라이브러리
- ESPhttpUpdate.update(client, url): URL에서 펌웨어 다운로드 및 설치
- t_httpUpdate_return 반환값: HTTP_UPDATE_FAILED, HTTP_UPDATE_OK
- 버전 비교: 현재 버전 vs 서버 버전
- 롤백: esp_ota_mark_app_valid_cancel_rollback()

핀 정보:
- I2C: SDA(21), SCL(22) - OLED
- LED: 업데이트 상태 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  62: { title: '버전 관리', project: '펌웨어 버전 시스템', files: ['main.ino', 'version.h', 'version_manager.h', 'version_manager.cpp', 'README.md'], prompt: `[Day 62] ESP32 Arduino - 버전 관리

프로젝트: 펌웨어 버전 시스템

프로젝트 구조:
day62_version/
├── main.ino
├── version.h
├── version_manager.h
├── version_manager.cpp
└── README.md

요구사항:
1. 시맨틱 버전: MAJOR.MINOR.PATCH (예: 1.2.3)
2. version.h에 버전 정보 정의
3. 빌드 날짜/시간 자동 포함 (__DATE__, __TIME__)
4. 웹 API로 현재 버전 조회
5. 버전 비교 함수 (업데이트 필요 여부 판단)
6. 부팅 시 버전 정보 시리얼/OLED 출력

📚 문법 설명 (코드 내 주석으로 포함):
- #define VERSION_MAJOR 1: 주 버전 (호환성 파괴 변경)
- #define VERSION_MINOR 2: 부 버전 (기능 추가)
- #define VERSION_PATCH 3: 패치 버전 (버그 수정)
- __DATE__: 컴파일 날짜 문자열
- __TIME__: 컴파일 시간 문자열
- 시맨틱 버전: 버전 번호 의미 체계 표준

핀 정보:
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  63: { title: 'ESP-NOW 기초', project: 'P2P 통신', files: ['main.ino', 'espnow_comm.h', 'espnow_comm.cpp', 'README.md'], prompt: `[Day 63] ESP32 Arduino - ESP-NOW 기초

프로젝트: P2P 통신

프로젝트 구조:
day63_espnow_basic/
├── main.ino
├── espnow_comm.h
├── espnow_comm.cpp
└── README.md

요구사항:
1. ESP-NOW 초기화 및 피어 등록
2. 송신기/수신기 모드 구현
3. MAC 주소로 특정 장치에 전송
4. 구조체 데이터 송수신
5. 송신 완료 콜백 (성공/실패 확인)
6. 수신 콜백 구현

📚 문법 설명 (코드 내 주석으로 포함):
- #include <esp_now.h>: ESP-NOW 라이브러리
- esp_now_init(): ESP-NOW 초기화
- esp_now_register_send_cb(callback): 송신 콜백 등록
- esp_now_register_recv_cb(callback): 수신 콜백 등록
- esp_now_add_peer(&peerInfo): 피어 등록
- esp_now_send(mac, data, len): 데이터 전송
- ESP-NOW: WiFi 없이 ESP32 간 직접 통신 (최대 250바이트)

핀 정보:
- LED: BLUE(27) 송신, YELLOW(26) 수신
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  64: { title: 'ESP-NOW 센서 네트워크', project: '다중 노드 통신', files: ['main.ino', 'espnow_sensor.h', 'espnow_sensor.cpp', 'README.md'], prompt: `[Day 64] ESP32 Arduino - ESP-NOW 센서 네트워크

프로젝트: 다중 노드 통신

프로젝트 구조:
day64_espnow_network/
├── main.ino
├── espnow_sensor.h
├── espnow_sensor.cpp
└── README.md

요구사항:
1. 여러 센서 노드 → 게이트웨이 데이터 전송
2. 노드별 MAC 주소 및 ID 관리
3. 게이트웨이: 모든 노드 데이터 수집
4. 센서 노드: 딥슬립 + 주기적 전송
5. 노드 상태 모니터링 (온라인/오프라인)
6. 웹 대시보드에 모든 노드 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 스타 토폴로지: 모든 노드 → 중앙 게이트웨이
- 피어 배열: 여러 피어 등록 (최대 20개)
- 노드 식별: MAC 주소 또는 사용자 정의 ID
- 데이터 구조체: {nodeId, temp, humid, battery, sequence}
- 하트비트: 주기적 상태 메시지로 연결 확인

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED
- LED: 노드별 상태 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  65: { title: 'ESP-NOW 브로드캐스트', project: '일대다 동기화', files: ['main.ino', 'espnow_broadcast.h', 'espnow_broadcast.cpp', 'README.md'], prompt: `[Day 65] ESP32 Arduino - ESP-NOW 브로드캐스트

프로젝트: 일대다 동기화

프로젝트 구조:
day65_espnow_broadcast/
├── main.ino
├── espnow_broadcast.h
├── espnow_broadcast.cpp
└── README.md

요구사항:
1. 브로드캐스트 MAC (FF:FF:FF:FF:FF:FF)으로 전체 전송
2. 마스터 → 모든 슬레이브 동기화 명령
3. 시간 동기화: 마스터 시간 → 슬레이브
4. LED 동기화: 모든 노드 동시 제어
5. 채널 설정: 모든 노드 같은 채널 사용
6. 브로드캐스트 + 유니캐스트 혼합 사용

📚 문법 설명 (코드 내 주석으로 포함):
- 브로드캐스트 MAC: {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF}
- esp_now_send(broadcastMac, data, len): 브로드캐스트 전송
- 채널: esp_wifi_set_channel(channel, WIFI_SECOND_CHAN_NONE)
- 동기화: 모든 노드가 같은 상태 유지
- 유니캐스트 vs 브로드캐스트: 1:1 vs 1:N

핀 정보:
- LED: RED(25), YELLOW(26), BLUE(27) - 동기 제어
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
  66: { title: '딥슬립 기초', project: '저전력 모드', files: ['main.ino', 'sleep_manager.h', 'sleep_manager.cpp', 'README.md'], prompt: `[Day 66] ESP32 Arduino - 딥슬립 기초

프로젝트: 저전력 모드

프로젝트 구조:
day66_deep_sleep/
├── main.ino
├── sleep_manager.h
├── sleep_manager.cpp
└── README.md

요구사항:
1. 타이머 웨이크업: 30초 후 자동 깨우기
2. 딥슬립 전 LED 끄기 및 주변장치 비활성화
3. 깨어난 이유 확인 (타이머/버튼/터치)
4. RTC 메모리에 데이터 유지 (RTC_DATA_ATTR)
5. 딥슬립 전/후 상태 시리얼 출력
6. 전류 소모 비교 (정상 vs 딥슬립)

📚 문법 설명 (코드 내 주석으로 포함):
- esp_sleep_enable_timer_wakeup(us): 마이크로초 후 웨이크업
- esp_deep_sleep_start(): 딥슬립 모드 진입
- esp_sleep_get_wakeup_cause(): 깨어난 이유 확인
- RTC_DATA_ATTR int count: 딥슬립 후에도 유지되는 변수
- 딥슬립: CPU 정지, RTC만 동작 (약 10µA)
- 라이트슬립: CPU 일시정지 (약 0.8mA)

핀 정보:
- LED: 모두 끄기 (전력 절약)
- I2C: 딥슬립 전 비활성화

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  67: { title: '외부 인터럽트 깨우기', project: '버튼으로 슬립 해제', files: ['main.ino', 'ext_wakeup.h', 'ext_wakeup.cpp', 'README.md'], prompt: `[Day 67] ESP32 Arduino - 외부 인터럽트 깨우기

프로젝트: 버튼으로 슬립 해제

프로젝트 구조:
day67_ext_wakeup/
├── main.ino
├── ext_wakeup.h
├── ext_wakeup.cpp
└── README.md

요구사항:
1. GPIO32 버튼으로 딥슬립 해제
2. ext0 웨이크업 소스 설정 (단일 핀)
3. ext1 웨이크업 소스 설정 (다중 핀)
4. 풀업/풀다운 설정
5. 깨어난 핀 확인
6. 터치 웨이크업 옵션 추가

📚 문법 설명 (코드 내 주석으로 포함):
- esp_sleep_enable_ext0_wakeup(pin, level): 단일 핀 웨이크업
- esp_sleep_enable_ext1_wakeup(mask, mode): 다중 핀 웨이크업
- ESP_EXT1_WAKEUP_ANY_HIGH: 아무 핀이나 HIGH면 깨움
- ESP_EXT1_WAKEUP_ALL_LOW: 모든 핀이 LOW면 깨움
- esp_sleep_get_ext1_wakeup_status(): 어느 핀이 깨웠는지
- RTC GPIO: 딥슬립 중에도 동작하는 GPIO

핀 정보:
- 버튼: GPIO32 (RTC GPIO 지원)
- LED: 상태 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  68: { title: '저전력 센서 노드', project: '배터리 구동 센서', files: ['main.ino', 'battery_node.h', 'battery_node.cpp', 'README.md'], prompt: `[Day 68] ESP32 Arduino - 저전력 센서 노드

프로젝트: 배터리 구동 센서

프로젝트 구조:
day68_battery_node/
├── main.ino
├── battery_node.h
├── battery_node.cpp
└── README.md

요구사항:
1. 30분마다 깨어나서 센서 읽기 + 전송 + 다시 슬립
2. WiFi 연결 최적화 (고정 IP, 채널 저장)
3. 배터리 전압 ADC로 측정
4. 저전압 경고 (3.3V 이하)
5. 부팅 횟수 RTC 메모리에 저장
6. 예상 배터리 수명 계산

📚 문법 설명 (코드 내 주석으로 포함):
- WiFi.setAutoConnect(true): 저장된 AP 자동 연결
- WiFi.persistent(false): Flash 쓰기 최소화
- btStop(): 블루투스 비활성화 (전력 절약)
- ADC 배터리 측정: 전압 분배 회로 + analogRead
- 듀티 사이클: (활성시간/총시간) * 100%

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20
- 배터리 ADC: GPIO35
- LED: 저전압 경고

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  69: { title: 'FreeRTOS 태스크', project: '멀티태스킹', files: ['main.ino', 'task_manager.h', 'task_manager.cpp', 'README.md'], prompt: `[Day 69] ESP32 Arduino - FreeRTOS 태스크

프로젝트: 멀티태스킹

프로젝트 구조:
day69_freertos_tasks/
├── main.ino
├── task_manager.h
├── task_manager.cpp
└── README.md

요구사항:
1. xTaskCreate()로 별도 태스크 생성
2. 센서 읽기 태스크 (1초 주기)
3. LED 깜빡이 태스크 (500ms 주기)
4. 웹서버 태스크 (별도 스레드)
5. 태스크 우선순위 설정
6. vTaskDelay()로 비차단 대기

📚 문법 설명 (코드 내 주석으로 포함):
- xTaskCreate(function, name, stack, param, priority, handle): 태스크 생성
- vTaskDelay(pdMS_TO_TICKS(ms)): 밀리초 대기
- vTaskDelete(handle): 태스크 삭제
- uxTaskGetStackHighWaterMark(): 스택 사용량 확인
- configMAX_PRIORITIES: 최대 우선순위 (0~24)
- 태스크: 독립적으로 실행되는 함수 (스레드와 유사)

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED
- LED: RED(25), YELLOW(26), BLUE(27)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  70: { title: '세마포어와 뮤텍스', project: '리소스 동기화', files: ['main.ino', 'sync_utils.h', 'sync_utils.cpp', 'README.md'], prompt: `[Day 70] ESP32 Arduino - 세마포어와 뮤텍스

프로젝트: 리소스 동기화

프로젝트 구조:
day70_semaphore/
├── main.ino
├── sync_utils.h
├── sync_utils.cpp
└── README.md

요구사항:
1. 뮤텍스로 I2C 버스 동시 접근 방지
2. 바이너리 세마포어로 이벤트 알림
3. 카운팅 세마포어로 리소스 풀 관리
4. 데드락 방지 (타임아웃 사용)
5. 두 태스크가 OLED 안전하게 공유
6. 크리티컬 섹션 구현

📚 문법 설명 (코드 내 주석으로 포함):
- SemaphoreHandle_t mutex: 뮤텍스 핸들
- xSemaphoreCreateMutex(): 뮤텍스 생성
- xSemaphoreTake(mutex, timeout): 뮤텍스 획득
- xSemaphoreGive(mutex): 뮤텍스 해제
- xSemaphoreCreateBinary(): 바이너리 세마포어
- 뮤텍스: 하나의 리소스를 한 태스크만 사용
- 세마포어: 여러 리소스 카운트 관리

핀 정보:
- I2C: SDA(21), SCL(22) - 공유 리소스

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  71: { title: 'FreeRTOS 큐', project: '태스크 간 통신', files: ['main.ino', 'queue_comm.h', 'queue_comm.cpp', 'README.md'], prompt: `[Day 71] ESP32 Arduino - FreeRTOS 큐

프로젝트: 태스크 간 통신

프로젝트 구조:
day71_freertos_queue/
├── main.ino
├── queue_comm.h
├── queue_comm.cpp
└── README.md

요구사항:
1. xQueueCreate()로 메시지 큐 생성
2. 센서 태스크 → 큐 → 디스플레이 태스크
3. 구조체 데이터 전송
4. 큐 가득 참/비어있음 처리
5. 다중 생산자, 단일 소비자 패턴
6. 큐 상태 모니터링

📚 문법 설명 (코드 내 주석으로 포함):
- QueueHandle_t queue: 큐 핸들
- xQueueCreate(length, itemSize): 큐 생성
- xQueueSend(queue, &data, timeout): 큐에 데이터 넣기
- xQueueReceive(queue, &data, timeout): 큐에서 데이터 꺼내기
- uxQueueMessagesWaiting(queue): 대기 중인 메시지 수
- 큐: FIFO(First In First Out) 데이터 구조

핀 정보:
- I2C: SDA(21), SCL(22) - AHT20, OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  72: { title: 'FreeRTOS 타이머', project: '소프트웨어 타이머', files: ['main.ino', 'sw_timer.h', 'sw_timer.cpp', 'README.md'], prompt: `[Day 72] ESP32 Arduino - FreeRTOS 타이머

프로젝트: 소프트웨어 타이머

프로젝트 구조:
day72_freertos_timer/
├── main.ino
├── sw_timer.h
├── sw_timer.cpp
└── README.md

요구사항:
1. xTimerCreate()로 소프트웨어 타이머 생성
2. 원샷 타이머 (1회 실행)
3. 반복 타이머 (자동 반복)
4. 타이머 시작/정지/리셋
5. 타이머 주기 동적 변경
6. 여러 타이머 동시 관리

📚 문법 설명 (코드 내 주석으로 포함):
- TimerHandle_t timer: 타이머 핸들
- xTimerCreate(name, period, autoReload, id, callback): 타이머 생성
- xTimerStart(timer, blockTime): 타이머 시작
- xTimerStop(timer, blockTime): 타이머 정지
- xTimerReset(timer, blockTime): 타이머 리셋 (재시작)
- xTimerChangePeriod(timer, newPeriod, blockTime): 주기 변경
- 소프트웨어 타이머: 하드웨어 타이머 대신 FreeRTOS가 관리

핀 정보:
- LED: 타이머 콜백에서 제어
- 부저: 타이머 알림

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  73: { title: '멀티코어 기초', project: '듀얼 코어 활용', files: ['main.ino', 'dual_core.h', 'dual_core.cpp', 'README.md'], prompt: `[Day 73] ESP32 Arduino - 멀티코어 기초

프로젝트: 듀얼 코어 활용

프로젝트 구조:
day73_dual_core/
├── main.ino
├── dual_core.h
├── dual_core.cpp
└── README.md

요구사항:
1. xTaskCreatePinnedToCore()로 특정 코어에 태스크 할당
2. Core 0: 통신 태스크 (WiFi, MQTT)
3. Core 1: 센서/제어 태스크
4. 코어 간 데이터 공유 (큐/뮤텍스)
5. 현재 코어 번호 확인: xPortGetCoreID()
6. 코어별 부하 모니터링

📚 문법 설명 (코드 내 주석으로 포함):
- xTaskCreatePinnedToCore(..., coreID): 특정 코어에 태스크 생성
- coreID: 0 또는 1 (ESP32는 듀얼 코어)
- xPortGetCoreID(): 현재 실행 중인 코어 번호
- PRO_CPU_NUM (0): 프로토콜 CPU (WiFi, BT)
- APP_CPU_NUM (1): 애플리케이션 CPU
- Arduino loop()는 기본적으로 Core 1에서 실행

핀 정보:
- I2C: SDA(21), SCL(22) - Core 1에서 관리
- WiFi: Core 0에서 관리

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  74: { title: '성능 최적화', project: '시스템 모니터링', files: ['main.ino', 'perf_monitor.h', 'perf_monitor.cpp', 'README.md'], prompt: `[Day 74] ESP32 Arduino - 성능 최적화

프로젝트: 시스템 모니터링

프로젝트 구조:
day74_performance/
├── main.ino
├── perf_monitor.h
├── perf_monitor.cpp
└── README.md

요구사항:
1. 힙 메모리 사용량 모니터링 (ESP.getFreeHeap())
2. 태스크별 스택 사용량 확인
3. CPU 사용률 추정
4. 실행 시간 측정 (micros())
5. 메모리 누수 감지
6. 웹 대시보드에 시스템 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- ESP.getFreeHeap(): 남은 힙 메모리 (바이트)
- ESP.getMinFreeHeap(): 최소 힙 메모리 (워터마크)
- ESP.getHeapSize(): 전체 힙 크기
- ESP.getCpuFreqMHz(): CPU 주파수
- uxTaskGetStackHighWaterMark(NULL): 현재 태스크 스택 여유
- micros(): 마이크로초 타이머 (성능 측정)

핀 정보:
- I2C: SDA(21), SCL(22) - OLED

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  75: { title: '워치독 타이머', project: '시스템 안정성', files: ['main.ino', 'watchdog.h', 'watchdog.cpp', 'README.md'], prompt: `[Day 75] ESP32 Arduino - 워치독 타이머

프로젝트: 시스템 안정성

프로젝트 구조:
day75_watchdog/
├── main.ino
├── watchdog.h
├── watchdog.cpp
└── README.md

요구사항:
1. 태스크 워치독 타이머 (TWDT) 설정
2. 인터럽트 워치독 타이머 (IWDT) 이해
3. 주기적으로 워치독 리셋 (피딩)
4. 워치독 타임아웃 시 자동 재부팅
5. 재부팅 원인 확인 (esp_reset_reason())
6. 크래시 로그 저장

📚 문법 설명 (코드 내 주석으로 포함):
- esp_task_wdt_init(timeout, panic): 워치독 초기화
- esp_task_wdt_add(NULL): 현재 태스크 워치독 등록
- esp_task_wdt_reset(): 워치독 피딩 (리셋)
- esp_reset_reason(): 마지막 재부팅 원인
- ESP_RST_TASK_WDT: 태스크 워치독 타임아웃
- 워치독: 시스템이 응답하지 않으면 자동 재시작

핀 정보:
- LED: RED(25) 워치독 경고

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
  76: { title: 'Home Assistant 소개', project: 'MQTT Discovery', files: ['main.ino', 'ha_discovery.h', 'ha_discovery.cpp', 'README.md'], prompt: `[Day 76] ESP32 Arduino - Home Assistant 소개

프로젝트: MQTT Discovery

프로젝트 구조:
day76_ha_discovery/
├── main.ino
├── ha_discovery.h
├── ha_discovery.cpp
└── README.md

요구사항:
1. Home Assistant MQTT Auto Discovery 이해
2. homeassistant/sensor/esp32_xxx/config 토픽 발행
3. JSON 형식 Discovery 메시지 생성
4. unique_id, device 정보 포함
5. state_topic으로 센서 값 발행
6. HA에서 자동으로 장치 인식

📚 문법 설명 (코드 내 주석으로 포함):
- MQTT Discovery: HA가 자동으로 장치를 인식하는 프로토콜
- homeassistant/<component>/<node_id>/config: Discovery 토픽 형식
- device_class: 센서 종류 (temperature, humidity 등)
- state_class: 측정 타입 (measurement, total_increasing)
- unique_id: HA에서 엔티티 고유 식별자 (MAC 주소 활용)
- retain: true로 설정하여 HA 재시작 후에도 인식

핀 정보:
- DHT22: DATA(4) - 테스트 센서

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  77: { title: 'HA 센서 엔티티', project: '다중 센서 등록', files: ['main.ino', 'ha_sensors.h', 'ha_sensors.cpp', 'README.md'], prompt: `[Day 77] ESP32 Arduino - HA 센서 엔티티

프로젝트: 다중 센서 등록

프로젝트 구조:
day77_ha_sensors/
├── main.ino
├── ha_sensors.h
├── ha_sensors.cpp
└── README.md

요구사항:
1. 온도, 습도, 조도, 기압 등 다중 센서 Discovery 등록
2. 각 센서별 적절한 device_class 설정
3. unit_of_measurement 단위 지정
4. suggested_display_precision 표시 정밀도
5. 주기적으로 모든 센서 값 발행
6. 장치 그룹핑 (via_device)

📚 문법 설명 (코드 내 주석으로 포함):
- device_class: "temperature", "humidity", "illuminance", "pressure"
- unit_of_measurement: "°C", "%", "lx", "hPa"
- suggested_display_precision: 소수점 자릿수
- via_device: 상위 장치 참조 (허브-자식 구조)
- expire_after: 값 만료 시간 (초)
- force_update: 동일 값도 업데이트 여부

핀 정보:
- DHT22: DATA(4)
- BH1750: SDA(21), SCL(22)
- BMP280: SDA(21), SCL(22)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  78: { title: 'HA 스위치 엔티티', project: 'LED 원격 제어', files: ['main.ino', 'ha_switch.h', 'ha_switch.cpp', 'README.md'], prompt: `[Day 78] ESP32 Arduino - HA 스위치 엔티티

프로젝트: LED 원격 제어

프로젝트 구조:
day78_ha_switch/
├── main.ino
├── ha_switch.h
├── ha_switch.cpp
└── README.md

요구사항:
1. HA 스위치 엔티티 Discovery 등록
2. command_topic으로 ON/OFF 명령 수신
3. state_topic으로 현재 상태 발행
4. payload_on, payload_off 커스터마이징
5. 릴레이/LED 실제 제어
6. 명령 수신 시 즉시 상태 피드백

📚 문법 설명 (코드 내 주석으로 포함):
- homeassistant/switch/<node_id>/config: 스위치 Discovery
- command_topic: HA가 명령을 보내는 토픽
- state_topic: ESP32가 상태를 보고하는 토픽
- payload_on/off: 명령 페이로드 ("ON"/"OFF" 또는 "1"/"0")
- optimistic: false로 실제 상태 확인 후 업데이트
- icon: "mdi:lightbulb" 아이콘 지정

핀 정보:
- LED: RED(25), GREEN(26), BLUE(27)
- 릴레이: RELAY(32)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  79: { title: 'HA 자동화', project: '자동화 규칙 연동', files: ['main.ino', 'ha_automation.h', 'ha_automation.cpp', 'README.md'], prompt: `[Day 79] ESP32 Arduino - HA 자동화

프로젝트: 자동화 규칙 연동

프로젝트 구조:
day79_ha_automation/
├── main.ino
├── ha_automation.h
├── ha_automation.cpp
└── README.md

요구사항:
1. 센서 값에 따른 자동 제어 (온도→팬)
2. HA Automation과 연동 가능한 구조
3. 트리거 조건을 토픽으로 발행
4. 로컬 자동화 규칙 (HA 없이도 동작)
5. 자동화 활성화/비활성화 스위치
6. 히스테리시스 적용 (반복 트리거 방지)

📚 문법 설명 (코드 내 주석으로 포함):
- 히스테리시스: 경계값 ±오차 범위로 반복 트리거 방지
- availability_topic: 장치 온라인/오프라인 상태
- json_attributes_topic: 추가 속성을 JSON으로 발행
- HA Automation: 트리거-조건-액션 구조
- ESP32 로컬 자동화: HA 없이 독립 실행
- 우선순위: HA 명령 > 로컬 자동화

핀 정보:
- DHT22: DATA(4)
- 팬: FAN(32) PWM 제어
- LED: STATUS(25)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  80: { title: 'HA 통합 대시보드', project: 'Lovelace 카드', files: ['main.ino', 'ha_complete.h', 'ha_complete.cpp', 'README.md'], prompt: `[Day 80] ESP32 Arduino - HA 통합 대시보드

프로젝트: Lovelace 카드

프로젝트 구조:
day80_ha_dashboard/
├── main.ino
├── ha_complete.h
├── ha_complete.cpp
└── README.md

요구사항:
1. 센서, 스위치, 자동화 통합 Discovery
2. 장치 정보 (manufacturer, model, sw_version) 포함
3. 모든 엔티티를 하나의 device로 그룹핑
4. HA Lovelace 카드용 최적 구조
5. 상태 변화 시 즉시 업데이트
6. README에 Lovelace YAML 예시 포함

📚 문법 설명 (코드 내 주석으로 포함):
- device: {identifiers, name, manufacturer, model, sw_version}
- 모든 엔티티가 동일 device 참조 → HA에서 그룹 표시
- Lovelace: HA의 대시보드 UI 시스템
- entities 카드: 여러 엔티티를 리스트로 표시
- gauge 카드: 센서 값을 게이지로 시각화
- button 카드: 스위치 제어 버튼

핀 정보:
- DHT22: DATA(4)
- LED: RED(25), GREEN(26), BLUE(27)
- 버튼: BOOT(0)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
  81: { title: '최종 프로젝트 1', project: '스마트홈 허브 - 센서 수집', files: ['main.ino', 'config.h', 'sensors.h', 'sensors.cpp', 'README.md'], prompt: `[Day 81] ESP32 Arduino - 최종 프로젝트 1

프로젝트: 스마트홈 허브 - 센서 수집

프로젝트 구조:
day81_smarthub_sensors/
├── main.ino
├── config.h
├── sensors.h
├── sensors.cpp
└── README.md

요구사항:
1. 온습도(DHT22), 조도(BH1750), 기압(BMP280) 센서 통합
2. config.h에 핀 번호, 읽기 주기 설정
3. 센서별 클래스 구현 (초기화, 읽기, 검증)
4. 센서 데이터 구조체 정의
5. 이상치 필터링 (이전 값과 비교)
6. JSON 형식으로 센서 데이터 출력

📚 문법 설명 (코드 내 주석으로 포함):
- struct SensorData: 여러 센서 값을 하나로 묶음
- 클래스 상속: BaseSensor 기본 클래스 정의
- isnan(): 센서 읽기 실패 확인
- 칼만 필터: 노이즈 제거 알고리즘 (선택)
- millis() 기반 비동기 읽기
- 센서 라이브러리: DHT, Adafruit_BH1750, Adafruit_BMP280

핀 정보:
- DHT22: DATA(4)
- I2C: SDA(21), SCL(22) - BH1750, BMP280

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  82: { title: '최종 프로젝트 2', project: '스마트홈 허브 - 통신', files: ['main.ino', 'config.h', 'mqtt_manager.h', 'mqtt_manager.cpp', 'README.md'], prompt: `[Day 82] ESP32 Arduino - 최종 프로젝트 2

프로젝트: 스마트홈 허브 - 통신

프로젝트 구조:
day82_smarthub_comm/
├── main.ino
├── config.h
├── mqtt_manager.h
├── mqtt_manager.cpp
└── README.md

요구사항:
1. WiFi 자동 재연결 구현
2. MQTT 연결 관리 (연결 끊김 감지, 재연결)
3. Home Assistant Discovery 자동 발행
4. 센서 데이터 MQTT 발행 (JSON)
5. 명령 토픽 구독 및 처리
6. 연결 상태 LED 표시

📚 문법 설명 (코드 내 주석으로 포함):
- WiFi.reconnect(): 끊김 시 자동 재연결
- WiFi.onEvent(): WiFi 이벤트 콜백 등록
- mqttClient.setCallback(): 메시지 수신 콜백
- LWT (Last Will): 비정상 종료 시 오프라인 알림
- QoS 1: 최소 한번 전달 보장
- 지수 백오프: 재연결 간격 점진적 증가

핀 정보:
- LED: WIFI(25), MQTT(26) 상태 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  83: { title: '최종 프로젝트 3', project: '스마트홈 허브 - 웹 UI', files: ['main.ino', 'config.h', 'web_server.h', 'web_server.cpp', 'index_html.h', 'README.md'], prompt: `[Day 83] ESP32 Arduino - 최종 프로젝트 3

프로젝트: 스마트홈 허브 - 웹 UI

프로젝트 구조:
day83_smarthub_web/
├── main.ino
├── config.h
├── web_server.h
├── web_server.cpp
├── index_html.h
└── README.md

요구사항:
1. AsyncWebServer로 웹 대시보드 구현
2. 반응형 HTML/CSS 인터페이스
3. JavaScript로 실시간 데이터 업데이트 (fetch)
4. REST API: /api/sensors, /api/control
5. WiFi 설정 페이지 (/setup)
6. WebSocket으로 실시간 푸시 (선택)

📚 문법 설명 (코드 내 주석으로 포함):
- PROGMEM: HTML을 플래시 메모리에 저장
- AsyncWebServer: 비동기 HTTP 서버
- server.on(): 라우트 등록
- request->send_P(): PROGMEM 데이터 전송
- ArduinoJson: API 응답 JSON 생성
- CORS 헤더: 외부 접근 허용 설정

핀 정보:
- 없음 (웹 서버는 소프트웨어)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  84: { title: '최종 프로젝트 4', project: '스마트홈 허브 - 데이터 저장', files: ['main.ino', 'config.h', 'data_logger.h', 'data_logger.cpp', 'README.md'], prompt: `[Day 84] ESP32 Arduino - 최종 프로젝트 4

프로젝트: 스마트홈 허브 - 데이터 저장

프로젝트 구조:
day84_smarthub_storage/
├── main.ino
├── config.h
├── data_logger.h
├── data_logger.cpp
└── README.md

요구사항:
1. LittleFS에 센서 데이터 로깅
2. 순환 버퍼 방식 (오래된 데이터 자동 삭제)
3. CSV 형식 저장 (timestamp, temp, humidity...)
4. NTP 시간 동기화로 정확한 타임스탬프
5. 웹에서 로그 파일 다운로드 API
6. 저장 공간 모니터링

📚 문법 설명 (코드 내 주석으로 포함):
- LittleFS.begin(): 파일시스템 초기화
- File.println(): 줄 단위 쓰기
- LittleFS.info(): 사용량/전체 용량 확인
- configTime(): NTP 시간 동기화
- getLocalTime(): 현재 시간 가져오기
- 순환 로그: 최대 파일 크기 도달 시 처음부터 덮어쓰기

핀 정보:
- 없음 (내장 플래시 사용)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  85: { title: '최종 프로젝트 5', project: '스마트홈 허브 - 통합', files: ['main.ino', 'config.h', 'sensors.h', 'sensors.cpp', 'mqtt_manager.h', 'mqtt_manager.cpp', 'web_server.h', 'web_server.cpp', 'data_logger.h', 'data_logger.cpp', 'README.md'], prompt: `[Day 85] ESP32 Arduino - 최종 프로젝트 5

프로젝트: 스마트홈 허브 - 통합

프로젝트 구조:
day85_smarthub_complete/
├── main.ino
├── config.h
├── sensors.h / sensors.cpp
├── mqtt_manager.h / mqtt_manager.cpp
├── web_server.h / web_server.cpp
├── data_logger.h / data_logger.cpp
└── README.md

요구사항:
1. Day 81-84 모든 기능 통합
2. FreeRTOS 태스크로 각 모듈 병렬 실행
3. 태스크 간 큐로 데이터 전달
4. OTA 업데이트 지원
5. 워치독 타이머로 안정성 확보
6. 시스템 상태 모니터링 (힙, 태스크)

📚 문법 설명 (코드 내 주석으로 포함):
- xTaskCreate(): 태스크 생성 (우선순위, 스택 크기)
- xQueueCreate(): 태스크 간 데이터 전달 큐
- xQueueSend/Receive(): 큐 읽기/쓰기
- ArduinoOTA.begin(): OTA 초기화
- 메인 루프에서 각 모듈 상태 확인
- 에러 발생 시 자동 복구 로직

핀 정보:
- DHT22: DATA(4)
- I2C: SDA(21), SCL(22)
- LED: RED(25), GREEN(26), BLUE(27)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
  86: { title: '코드 리팩토링', project: '코드 품질 개선', files: ['main.ino', 'utils.h', 'utils.cpp', 'README.md'], prompt: `[Day 86] ESP32 Arduino - 코드 리팩토링

프로젝트: 코드 품질 개선

프로젝트 구조:
day86_refactoring/
├── main.ino
├── utils.h
├── utils.cpp
└── README.md

요구사항:
1. Day 85 코드를 리팩토링 대상으로 분석
2. 중복 코드 함수로 추출
3. 매직 넘버를 상수/enum으로 변환
4. 함수 이름을 동사+목적어 형식으로 통일
5. 주석 추가 (함수 설명, 복잡한 로직)
6. 코드 포맷팅 일관성 적용

📚 문법 설명 (코드 내 주석으로 포함):
- #define vs const: const가 타입 안전
- enum class: 강타입 열거형 (C++11)
- 함수 분리: 하나의 함수는 하나의 역할
- DRY 원칙: Don't Repeat Yourself
- 네이밍: camelCase (함수), UPPER_CASE (상수)
- 헤더 가드: #ifndef / #define / #endif

핀 정보:
- 기존 프로젝트와 동일

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  87: { title: '테스트 및 디버깅', project: '시스템 검증', files: ['main.ino', 'test_runner.h', 'test_runner.cpp', 'README.md'], prompt: `[Day 87] ESP32 Arduino - 테스트 및 디버깅

프로젝트: 시스템 검증

프로젝트 구조:
day87_testing/
├── main.ino
├── test_runner.h
├── test_runner.cpp
└── README.md

요구사항:
1. 유닛 테스트 프레임워크 (간단한 assert 매크로)
2. 센서 읽기 테스트 (값 범위 확인)
3. WiFi 연결 테스트
4. MQTT 발행/구독 테스트
5. 파일시스템 읽기/쓰기 테스트
6. 테스트 결과 시리얼 출력 및 LED 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #define TEST_ASSERT(condition): 조건 실패 시 에러 출력
- __FILE__, __LINE__: 에러 위치 자동 출력
- 테스트 함수: test_ 접두사 사용
- 모킹: 실제 하드웨어 없이 테스트 (가상 값)
- 통합 테스트: 모듈 간 상호작용 검증
- 테스트 커버리지: 모든 주요 함수 테스트

핀 정보:
- LED: PASS(25) 녹색, FAIL(26) 빨간색

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  88: { title: '문서화', project: '사용자 매뉴얼', files: ['README.md', 'QUICKSTART.md', 'API_REFERENCE.md', 'TROUBLESHOOTING.md'], prompt: `[Day 88] ESP32 Arduino - 문서화

프로젝트: 사용자 매뉴얼

프로젝트 구조:
day88_documentation/
├── README.md
├── QUICKSTART.md
├── API_REFERENCE.md
└── TROUBLESHOOTING.md

요구사항:
1. README.md: 프로젝트 개요, 기능 목록, 사용법
2. QUICKSTART.md: 5분 안에 시작하기 가이드
3. API_REFERENCE.md: 모든 함수/클래스 설명
4. TROUBLESHOOTING.md: 흔한 문제 해결 방법
5. 마크다운 형식 (코드 블록, 표, 이미지 링크)
6. 한국어 작성

📚 문법 설명 (문서 작성법):
- Markdown: # 제목, - 목록, \`\`\` 코드 블록
- Mermaid: 다이어그램 생성 (흐름도, 시퀀스)
- README 구조: 개요 → 설치 → 사용법 → API → 라이선스
- API 문서: 함수명, 매개변수, 반환값, 예시
- 트러블슈팅: 증상 → 원인 → 해결 형식
- 버전 관리: CHANGELOG.md 추가 권장

핀 정보:
- 없음 (문서 작성)

각 파일의 전체 내용을 다음 형식으로 작성:

===== 파일: README.md =====
(내용)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  89: { title: 'PCB 설계 기초', project: '회로도 및 PCB', files: ['README.md', 'SCHEMATIC_GUIDE.md', 'BOM.md'], prompt: `[Day 89] ESP32 Arduino - PCB 설계 기초

프로젝트: 회로도 및 PCB

프로젝트 구조:
day89_pcb_design/
├── README.md
├── SCHEMATIC_GUIDE.md
└── BOM.md

요구사항:
1. 브레드보드에서 PCB로 전환 개념
2. KiCad/EasyEDA 소개 및 기본 사용법
3. ESP32 기반 회로도 설계 가이드
4. BOM (Bill of Materials) 부품 목록 작성
5. PCB 제작 업체 안내 (JLCPCB, PCBWay)
6. 납땜 및 조립 팁

📚 문법 설명 (PCB 설계 개념):
- 회로도: 논리적 연결 (심볼로 표현)
- PCB: 물리적 배치 (풋프린트, 배선)
- DRC: Design Rule Check (설계 규칙 검사)
- 거버 파일: PCB 제조용 출력 파일
- BOM: 부품 목록 (부품번호, 수량, 설명)
- SMD vs THT: 표면실장 vs 스루홀

핀 정보:
- 스마트홈 허브 전체 핀 배치 참고

각 파일의 전체 내용을 다음 형식으로 작성:

===== 파일: README.md =====
(내용)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },

  90: { title: '과정 완료 및 다음 단계', project: '최종 리뷰', files: ['README.md', 'LEARNING_PATH.md', 'RESOURCES.md'], prompt: `[Day 90] ESP32 Arduino - 과정 완료 및 다음 단계

프로젝트: 최종 리뷰

프로젝트 구조:
day90_completion/
├── README.md
├── LEARNING_PATH.md
└── RESOURCES.md

요구사항:
1. 90일 과정 전체 복습 체크리스트
2. 배운 기술 스택 정리 (WiFi, MQTT, FreeRTOS 등)
3. 다음 학습 경로 제안 (ESP-IDF, 산업용 IoT)
4. 추천 학습 리소스 (책, 강의, 커뮤니티)
5. 포트폴리오 프로젝트 아이디어
6. 수료 축하 메시지

📚 문법 설명 (학습 경로):
- ESP-IDF: 공식 개발 프레임워크 (Arduino보다 저수준)
- RTOS 심화: Semaphore, Mutex, Event Groups
- 산업용 IoT: Modbus, LoRaWAN, 4G LTE
- 엣지 AI: TensorFlow Lite, Edge Impulse
- 클라우드: AWS IoT, Azure IoT Hub
- 오픈소스 기여: GitHub 프로젝트 참여

핀 정보:
- 없음 (리뷰 문서)

각 파일의 전체 내용을 다음 형식으로 작성:

===== 파일: README.md =====
(내용)
===== 파일 끝 =====

(이하 모든 파일 동일 형식)` },
};

// 중급 프롬프트 통합 (Part 1, 2, 3)
const allIntermediatePrompts: { [day: number]: PromptData } = {
  ...intermediatePromptsPart1,  // Day 16-25
  ...intermediatePromptsPart2,  // Day 26-35
  ...intermediatePromptsPart3,  // Day 36-45
};

// 고급 프롬프트 통합 (Part 1, 2, 3, 4)
const allAdvancedPrompts: { [day: number]: PromptData } = {
  ...advancedPromptsPart1,  // Day 46-55
  ...advancedPromptsPart2,  // Day 56-65
  ...advancedPromptsPart3,  // Day 66-75
  ...advancedPromptsPart4,  // Day 76-90
};

// 레벨별 프롬프트 데이터 가져오기
function getPromptData(level: string, day: number): PromptData | null {
  if (level === 'beginner' && beginnerPrompts[day]) {
    return beginnerPrompts[day];
  } else if (level === 'intermediate' && allIntermediatePrompts[day]) {
    return allIntermediatePrompts[day];
  } else if (level === 'advanced' && allAdvancedPrompts[day]) {
    return allAdvancedPrompts[day];
  }
  return null;
}

// 레벨별 총 일수
const levelDays: { [key: string]: number } = {
  beginner: 15,
  intermediate: 30,
  advanced: 45
};

// 레벨별 시작 일수
const levelStartDay: { [key: string]: number } = {
  beginner: 1,
  intermediate: 16,
  advanced: 46
};

export default function ESP32LessonPage() {
  const router = useRouter();
  const params = useParams();
  const level = params?.level as string || 'beginner';
  const day = parseInt(params?.day as string) || 1;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPortSpec, setShowPortSpec] = useState(false);

  const promptData = getPromptData(level, day);
  const totalDays = levelDays[level] || 15;
  const startDay = levelStartDay[level] || 1;
  const endDay = startDay + totalDays - 1;

  const handleCopyPrompt = () => {
    if (promptData) {
      navigator.clipboard.writeText(promptData.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyPortSpec = () => {
    navigator.clipboard.writeText(portSpecNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateToDay = (newDay: number) => {
    if (newDay >= startDay && newDay <= endDay) {
      router.push(`/course/coding/c-esp32/${level}/lesson/${newDay}`);
    }
  };

  if (!promptData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">레슨을 찾을 수 없습니다</h1>
          <Link href={`/course/coding/c-esp32/${level}`} className="text-blue-400 hover:underline">
            코스 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const levelNames: { [key: string]: string } = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급'
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/courses" className="text-gray-400 hover:text-white">
                ← 코스 목록
              </Link>
              <span className="text-gray-500">|</span>
              <Link href={`/course/coding/c-esp32/${level}`} className="text-gray-400 hover:text-white">
                {levelNames[level]} 과정
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-600 px-3 py-1 rounded-full text-sm">
                Day {day}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Day {day}: {promptData.title}
          </h1>
          <p className="text-gray-400 text-lg">
            프로젝트: {promptData.project}
          </p>
        </div>

        {/* Port Specification Note */}
        <div className="mb-6 bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-400 mb-2">포트설명서 첨부 권장</h3>
              <p className="text-gray-300 text-sm mb-3">
                프롬프트와 함께 <code className="bg-gray-800 px-1 rounded">ESP32_회로도_분석_보고서.md</code> 파일을
                AI에게 첨부하면 정확한 핀 번호와 제어 방식을 적용한 코드를 생성합니다.
              </p>
              <button
                onClick={() => setShowPortSpec(!showPortSpec)}
                className="text-yellow-400 hover:text-yellow-300 text-sm underline"
              >
                {showPortSpec ? '핀 정보 숨기기' : '핀 정보 보기'}
              </button>
              {showPortSpec && (
                <pre className="mt-3 bg-gray-800 p-3 rounded text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                  {portSpecNote}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Files List */}
        <div className="mb-6 bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            생성될 파일
          </h3>
          <div className="flex flex-wrap gap-2">
            {promptData.files.map((file, index) => (
              <span key={index} className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">
                {file}
              </span>
            ))}
          </div>
        </div>

        {/* Prompt Section */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-700">
            <h3 className="font-semibold flex items-center gap-2">
              <Code className="w-5 h-5 text-green-400" />
              AI 프롬프트
            </h3>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  복사
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono bg-gray-900">
            {promptData.prompt}
          </pre>
        </div>

        {/* AI Service Buttons */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-purple-400" />
            AI에게 프롬프트 전달하기
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors font-medium"
            >
              Claude
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors font-medium"
            >
              Gemini
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors font-medium"
            >
              ChatGPT
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            프롬프트를 복사한 후 위 AI 서비스에 붙여넣기 하세요.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            학습 팁
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• AI가 생성한 코드에서 <code className="bg-gray-800 px-1 rounded">===== 파일: xxx =====</code> 구분자를 찾아 각 파일로 분리하세요.</li>
            <li>• Arduino IDE에서 새 탭을 추가하여 .h와 .cpp 파일을 저장합니다.</li>
            <li>• 컴파일 전 Tools {'>'} Board에서 "ESP32 Dev Module"이 선택되었는지 확인하세요.</li>
            <li>• 오류 발생 시 오류 메시지를 AI에게 보여주면 해결 방법을 알려줍니다.</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateToDay(day - 1)}
            disabled={day <= startDay}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              day <= startDay
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            이전 레슨
          </button>

          <span className="text-gray-400">
            {day - startDay + 1} / {totalDays}
          </span>

          <button
            onClick={() => navigateToDay(day + 1)}
            disabled={day >= endDay}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              day >= endDay
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            다음 레슨
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
