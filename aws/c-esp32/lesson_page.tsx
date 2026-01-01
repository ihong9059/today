'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Copy, Check, Code, Lightbulb, ExternalLink, FileText, AlertTriangle } from 'lucide-react';

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

// 중급 과정 (Day 16-45) - 일부만 포함, 전체는 별도 파일에
const intermediatePrompts: { [day: number]: PromptData } = {
  16: { title: 'WiFi AP 모드 기초', project: '핫스팟 생성', files: ['main.ino', 'ap_manager.h', 'ap_manager.cpp', 'config.h', 'README.md'], prompt: `[Day 16] ESP32 Arduino - WiFi AP 모드 기초\n\n프로젝트: 핫스팟 생성\n\n요구사항:\n1. WiFi.softAP(ssid, password)로 AP 모드 시작\n2. AP 이름: "ESP32_IoT_AP"\n3. 연결된 클라이언트 수 표시\n4. OLED에 AP 정보 표시\n\n===== 파일: main.ino =====\n(코드)\n===== 파일 끝 =====` },
  17: { title: 'AP 모드 웹서버', project: 'AP 설정 페이지', files: ['main.ino', 'ap_manager.h', 'ap_manager.cpp', 'web_server.h', 'web_server.cpp', 'README.md'], prompt: `[Day 17] ESP32 Arduino - AP 모드 웹서버\n\n프로젝트: AP 설정 페이지\n\n요구사항:\n1. AP 모드로 시작 + 웹서버 구동\n2. 192.168.4.1 접속 시 설정 페이지\n3. WiFi SSID/Password 입력 폼\n4. 연결 성공/실패 결과 표시` },
  18: { title: '캡티브 포털', project: '자동 설정 페이지', files: ['main.ino', 'captive_portal.h', 'captive_portal.cpp', 'README.md'], prompt: `[Day 18] ESP32 Arduino - 캡티브 포털\n\n프로젝트: 자동 설정 페이지\n\n요구사항:\n1. DNSServer 라이브러리로 DNS 서버 구동\n2. 모든 도메인을 ESP32 IP로 리다이렉트\n3. 스마트폰 연결 시 자동으로 설정 페이지 표시` },
  19: { title: 'SPIFFS 파일 시스템', project: '파일 저장', files: ['main.ino', 'file_system.h', 'file_system.cpp', 'README.md'], prompt: `[Day 19] ESP32 Arduino - SPIFFS 파일 시스템\n\n프로젝트: 파일 저장\n\n요구사항:\n1. SPIFFS.h 라이브러리 사용\n2. 파일 쓰기/읽기\n3. 파일 목록 출력` },
  20: { title: 'SPIFFS 웹 페이지 저장', project: 'HTML/CSS 파일 서빙', files: ['main.ino', 'file_system.h', 'file_system.cpp', 'web_server.h', 'web_server.cpp', 'data/index.html', 'data/style.css', 'README.md'], prompt: `[Day 20] ESP32 Arduino - SPIFFS 웹 페이지 저장\n\n프로젝트: HTML/CSS 파일 서빙\n\n요구사항:\n1. SPIFFS에 HTML/CSS 파일 저장\n2. server.serveStatic("/", SPIFFS, "/")` },
  21: { title: 'LittleFS 마이그레이션', project: 'LittleFS 파일 시스템', files: ['main.ino', 'file_system.h', 'file_system.cpp', 'README.md'], prompt: `[Day 21] ESP32 Arduino - LittleFS 마이그레이션` },
  22: { title: '설정 파일 관리', project: 'JSON 설정 저장', files: ['main.ino', 'config_manager.h', 'config_manager.cpp', 'README.md'], prompt: `[Day 22] ESP32 Arduino - 설정 파일 관리\n\n프로젝트: JSON 설정 저장` },
  23: { title: 'WebSocket 기초', project: '실시간 통신', files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'README.md'], prompt: `[Day 23] ESP32 Arduino - WebSocket 기초\n\n프로젝트: 실시간 통신\n\n요구사항:\n1. WebSocketsServer 라이브러리 사용\n2. WebSocketsServer webSocket(81)` },
  24: { title: 'WebSocket LED 제어', project: '실시간 LED 제어', files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'led_control.h', 'led_control.cpp', 'data/index.html', 'README.md'], prompt: `[Day 24] ESP32 Arduino - WebSocket LED 제어` },
  25: { title: 'WebSocket 센서 모니터', project: '실시간 센서 대시보드', files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'data/index.html', 'README.md'], prompt: `[Day 25] ESP32 Arduino - WebSocket 센서 모니터` },
  26: { title: 'LoRa 모듈 기초', project: 'LoRa 초기화', files: ['main.ino', 'lora_driver.h', 'lora_driver.cpp', 'config.h', 'README.md'], prompt: `[Day 26] ESP32 Arduino - LoRa 모듈 기초\n\n프로젝트: LoRa 초기화\n\n요구사항:\n1. UART2 핀 설정: TX=17, RX=16\n2. M0(GPIO15), M1(GPIO4) 모드 핀 설정\n3. AUX(GPIO34) 상태 읽기` },
  27: { title: 'LoRa 파라미터 설정', project: 'LoRa 설정 프로그램', files: ['main.ino', 'lora_config.h', 'lora_config.cpp', 'README.md'], prompt: `[Day 27] ESP32 Arduino - LoRa 파라미터 설정` },
  28: { title: 'LoRa 거리 테스트', project: 'LoRa 범위 측정', files: ['main.ino', 'lora_driver.h', 'lora_driver.cpp', 'README.md'], prompt: `[Day 28] ESP32 Arduino - LoRa 거리 테스트` },
  29: { title: 'LoRa 문자열 통신', project: '텍스트 메시지 송수신', files: ['main.ino', 'lora_comm.h', 'lora_comm.cpp', 'README.md'], prompt: `[Day 29] ESP32 Arduino - LoRa 문자열 통신` },
  30: { title: 'LoRa 구조체 전송', project: '센서 데이터 패킷', files: ['main.ino', 'lora_packet.h', 'lora_packet.cpp', 'README.md'], prompt: `[Day 30] ESP32 Arduino - LoRa 구조체 전송` },
  31: { title: 'LoRa ACK 시스템', project: '신뢰성 있는 전송', files: ['main.ino', 'lora_reliable.h', 'lora_reliable.cpp', 'README.md'], prompt: `[Day 31] ESP32 Arduino - LoRa ACK 시스템` },
  32: { title: 'LoRa 센서 노드', project: '원격 센서 노드', files: ['main.ino', 'sensor_node.h', 'sensor_node.cpp', 'README.md'], prompt: `[Day 32] ESP32 Arduino - LoRa 센서 노드` },
  33: { title: 'LoRa 게이트웨이', project: 'LoRa-WiFi 브릿지', files: ['main.ino', 'gateway.h', 'gateway.cpp', 'README.md'], prompt: `[Day 33] ESP32 Arduino - LoRa 게이트웨이` },
  34: { title: 'LoRa 브로드캐스트', project: '일대다 통신', files: ['main.ino', 'lora_broadcast.h', 'lora_broadcast.cpp', 'README.md'], prompt: `[Day 34] ESP32 Arduino - LoRa 브로드캐스트` },
  35: { title: 'LoRa 중계기', project: '메시 네트워크 기초', files: ['main.ino', 'lora_mesh.h', 'lora_mesh.cpp', 'README.md'], prompt: `[Day 35] ESP32 Arduino - LoRa 중계기` },
  36: { title: 'EEPROM 기초', project: '데이터 영구 저장', files: ['main.ino', 'eeprom_manager.h', 'eeprom_manager.cpp', 'README.md'], prompt: `[Day 36] ESP32 Arduino - EEPROM 기초` },
  37: { title: 'Preferences 라이브러리', project: 'NVS 설정 저장', files: ['main.ino', 'preferences_manager.h', 'preferences_manager.cpp', 'README.md'], prompt: `[Day 37] ESP32 Arduino - Preferences 라이브러리` },
  38: { title: '자동 WiFi 연결', project: '저장된 WiFi 자동 연결', files: ['main.ino', 'wifi_auto.h', 'wifi_auto.cpp', 'README.md'], prompt: `[Day 38] ESP32 Arduino - 자동 WiFi 연결` },
  39: { title: 'SD 카드 기초', project: 'SD 카드 읽기/쓰기', files: ['main.ino', 'sd_manager.h', 'sd_manager.cpp', 'README.md'], prompt: `[Day 39] ESP32 Arduino - SD 카드 기초` },
  40: { title: 'SD 카드 데이터 로깅', project: '센서 데이터 CSV 저장', files: ['main.ino', 'data_logger.h', 'data_logger.cpp', 'README.md'], prompt: `[Day 40] ESP32 Arduino - SD 카드 데이터 로깅` },
  41: { title: 'NTP 시간 동기화', project: '인터넷 시간 연동', files: ['main.ino', 'ntp_time.h', 'ntp_time.cpp', 'README.md'], prompt: `[Day 41] ESP32 Arduino - NTP 시간 동기화` },
  42: { title: '시간 기반 로깅', project: '타임스탬프 로그', files: ['main.ino', 'timed_logger.h', 'timed_logger.cpp', 'README.md'], prompt: `[Day 42] ESP32 Arduino - 시간 기반 로깅` },
  43: { title: '중급 종합 프로젝트 1', project: 'IoT 환경 모니터 v2 - 센서/웹', files: ['main.ino', 'config.h', 'README.md'], prompt: `[Day 43] ESP32 Arduino - 중급 종합 프로젝트 1` },
  44: { title: '중급 종합 프로젝트 2', project: 'IoT 환경 모니터 v2 - LoRa', files: ['main.ino', 'config.h', 'README.md'], prompt: `[Day 44] ESP32 Arduino - 중급 종합 프로젝트 2` },
  45: { title: '중급 종합 프로젝트 3', project: 'IoT 환경 모니터 v2 - 통합', files: ['main.ino', 'config.h', 'README.md'], prompt: `[Day 45] ESP32 Arduino - 중급 종합 프로젝트 3` },
};

// 고급 과정 (Day 46-90) - 일부만 포함, 전체는 별도 파일에
const advancedPrompts: { [day: number]: PromptData } = {
  46: { title: 'MQTT 기초', project: 'MQTT 연결', files: ['main.ino', 'mqtt_client.h', 'mqtt_client.cpp', 'README.md'], prompt: `[Day 46] ESP32 Arduino - MQTT 기초` },
  47: { title: 'MQTT 발행/구독', project: 'Pub/Sub 통신', files: ['main.ino', 'mqtt_pubsub.h', 'mqtt_pubsub.cpp', 'README.md'], prompt: `[Day 47] ESP32 Arduino - MQTT 발행/구독` },
  48: { title: 'MQTT 센서 모니터', project: 'MQTT 센서 대시보드', files: ['main.ino', 'mqtt_sensor.h', 'mqtt_sensor.cpp', 'README.md'], prompt: `[Day 48] ESP32 Arduino - MQTT 센서 모니터` },
  49: { title: 'Firebase 소개', project: 'Firebase 프로젝트 설정', files: ['main.ino', 'firebase_config.h', 'firebase_config.cpp', 'README.md'], prompt: `[Day 49] ESP32 Arduino - Firebase 소개` },
  50: { title: 'Firebase Realtime Database', project: '클라우드 데이터 저장', files: ['main.ino', 'firebase_db.h', 'firebase_db.cpp', 'README.md'], prompt: `[Day 50] ESP32 Arduino - Firebase Realtime Database` },
  51: { title: 'Firebase 스트림', project: '실시간 데이터 동기화', files: ['main.ino', 'firebase_stream.h', 'firebase_stream.cpp', 'README.md'], prompt: `[Day 51] ESP32 Arduino - Firebase 스트림` },
  52: { title: 'Firebase 히스토리 저장', project: '시계열 데이터 저장', files: ['main.ino', 'firebase_history.h', 'firebase_history.cpp', 'README.md'], prompt: `[Day 52] ESP32 Arduino - Firebase 히스토리 저장` },
  53: { title: 'ThingSpeak 소개', project: 'ThingSpeak 채널', files: ['main.ino', 'thingspeak_client.h', 'thingspeak_client.cpp', 'README.md'], prompt: `[Day 53] ESP32 Arduino - ThingSpeak 소개` },
  54: { title: 'ThingSpeak 그래프', project: '데이터 시각화', files: ['main.ino', 'thingspeak_multi.h', 'thingspeak_multi.cpp', 'README.md'], prompt: `[Day 54] ESP32 Arduino - ThingSpeak 그래프` },
  55: { title: 'Blynk 앱 연동', project: '스마트폰 제어', files: ['main.ino', 'blynk_client.h', 'blynk_client.cpp', 'README.md'], prompt: `[Day 55] ESP32 Arduino - Blynk 앱 연동` },
  56: { title: 'HTTPS 클라이언트', project: '보안 API 호출', files: ['main.ino', 'https_client.h', 'https_client.cpp', 'README.md'], prompt: `[Day 56] ESP32 Arduino - HTTPS 클라이언트` },
  57: { title: 'HTTPS POST', project: '보안 데이터 전송', files: ['main.ino', 'https_post.h', 'https_post.cpp', 'README.md'], prompt: `[Day 57] ESP32 Arduino - HTTPS POST` },
  58: { title: 'API 인증', project: 'Bearer Token 인증', files: ['main.ino', 'api_auth.h', 'api_auth.cpp', 'README.md'], prompt: `[Day 58] ESP32 Arduino - API 인증` },
  59: { title: 'ArduinoOTA 기초', project: '무선 펌웨어 업데이트', files: ['main.ino', 'ota_handler.h', 'ota_handler.cpp', 'README.md'], prompt: `[Day 59] ESP32 Arduino - ArduinoOTA 기초` },
  60: { title: '웹 기반 OTA', project: 'HTTP OTA 업데이트', files: ['main.ino', 'web_ota.h', 'web_ota.cpp', 'README.md'], prompt: `[Day 60] ESP32 Arduino - 웹 기반 OTA` },
  61: { title: '자동 OTA 업데이트', project: '서버에서 펌웨어 다운로드', files: ['main.ino', 'auto_ota.h', 'auto_ota.cpp', 'README.md'], prompt: `[Day 61] ESP32 Arduino - 자동 OTA 업데이트` },
  62: { title: '버전 관리', project: '펌웨어 버전 시스템', files: ['main.ino', 'version.h', 'version_manager.h', 'version_manager.cpp', 'README.md'], prompt: `[Day 62] ESP32 Arduino - 버전 관리` },
  63: { title: 'ESP-NOW 기초', project: 'P2P 통신', files: ['main.ino', 'espnow_comm.h', 'espnow_comm.cpp', 'README.md'], prompt: `[Day 63] ESP32 Arduino - ESP-NOW 기초` },
  64: { title: 'ESP-NOW 센서 네트워크', project: '다중 노드 통신', files: ['main.ino', 'espnow_sensor.h', 'espnow_sensor.cpp', 'README.md'], prompt: `[Day 64] ESP32 Arduino - ESP-NOW 센서 네트워크` },
  65: { title: 'ESP-NOW 브로드캐스트', project: '일대다 동기화', files: ['main.ino', 'espnow_broadcast.h', 'espnow_broadcast.cpp', 'README.md'], prompt: `[Day 65] ESP32 Arduino - ESP-NOW 브로드캐스트` },
  66: { title: '딥슬립 기초', project: '저전력 모드', files: ['main.ino', 'sleep_manager.h', 'sleep_manager.cpp', 'README.md'], prompt: `[Day 66] ESP32 Arduino - 딥슬립 기초` },
  67: { title: '외부 인터럽트 깨우기', project: '버튼으로 슬립 해제', files: ['main.ino', 'ext_wakeup.h', 'ext_wakeup.cpp', 'README.md'], prompt: `[Day 67] ESP32 Arduino - 외부 인터럽트 깨우기` },
  68: { title: '저전력 센서 노드', project: '배터리 구동 센서', files: ['main.ino', 'battery_node.h', 'battery_node.cpp', 'README.md'], prompt: `[Day 68] ESP32 Arduino - 저전력 센서 노드` },
  69: { title: 'FreeRTOS 태스크', project: '멀티태스킹', files: ['main.ino', 'task_manager.h', 'task_manager.cpp', 'README.md'], prompt: `[Day 69] ESP32 Arduino - FreeRTOS 태스크` },
  70: { title: '세마포어와 뮤텍스', project: '리소스 동기화', files: ['main.ino', 'sync_utils.h', 'sync_utils.cpp', 'README.md'], prompt: `[Day 70] ESP32 Arduino - 세마포어와 뮤텍스` },
  71: { title: 'FreeRTOS 큐', project: '태스크 간 통신', files: ['main.ino', 'queue_comm.h', 'queue_comm.cpp', 'README.md'], prompt: `[Day 71] ESP32 Arduino - FreeRTOS 큐` },
  72: { title: 'FreeRTOS 타이머', project: '소프트웨어 타이머', files: ['main.ino', 'sw_timer.h', 'sw_timer.cpp', 'README.md'], prompt: `[Day 72] ESP32 Arduino - FreeRTOS 타이머` },
  73: { title: '멀티코어 기초', project: '듀얼 코어 활용', files: ['main.ino', 'dual_core.h', 'dual_core.cpp', 'README.md'], prompt: `[Day 73] ESP32 Arduino - 멀티코어 기초` },
  74: { title: '성능 최적화', project: '시스템 모니터링', files: ['main.ino', 'perf_monitor.h', 'perf_monitor.cpp', 'README.md'], prompt: `[Day 74] ESP32 Arduino - 성능 최적화` },
  75: { title: '워치독 타이머', project: '시스템 안정성', files: ['main.ino', 'watchdog.h', 'watchdog.cpp', 'README.md'], prompt: `[Day 75] ESP32 Arduino - 워치독 타이머` },
  76: { title: 'Home Assistant 소개', project: 'MQTT Discovery', files: ['main.ino', 'ha_discovery.h', 'ha_discovery.cpp', 'README.md'], prompt: `[Day 76] ESP32 Arduino - Home Assistant 소개` },
  77: { title: 'HA 센서 엔티티', project: '다중 센서 등록', files: ['main.ino', 'ha_sensors.h', 'ha_sensors.cpp', 'README.md'], prompt: `[Day 77] ESP32 Arduino - HA 센서 엔티티` },
  78: { title: 'HA 스위치 엔티티', project: 'LED 원격 제어', files: ['main.ino', 'ha_switch.h', 'ha_switch.cpp', 'README.md'], prompt: `[Day 78] ESP32 Arduino - HA 스위치 엔티티` },
  79: { title: 'HA 자동화', project: '자동화 규칙 연동', files: ['main.ino', 'ha_automation.h', 'ha_automation.cpp', 'README.md'], prompt: `[Day 79] ESP32 Arduino - HA 자동화` },
  80: { title: 'HA 통합 대시보드', project: 'Lovelace 카드', files: ['main.ino', 'ha_complete.h', 'ha_complete.cpp', 'README.md'], prompt: `[Day 80] ESP32 Arduino - HA 통합 대시보드` },
  81: { title: '최종 프로젝트 1', project: '스마트홈 허브 - 센서 수집', files: ['main.ino', 'config.h', 'README.md'], prompt: `[Day 81] ESP32 Arduino - 최종 프로젝트 1` },
  82: { title: '최종 프로젝트 2', project: '스마트홈 허브 - 통신', files: ['main.ino', 'README.md'], prompt: `[Day 82] ESP32 Arduino - 최종 프로젝트 2` },
  83: { title: '최종 프로젝트 3', project: '스마트홈 허브 - 웹 UI', files: ['main.ino', 'README.md'], prompt: `[Day 83] ESP32 Arduino - 최종 프로젝트 3` },
  84: { title: '최종 프로젝트 4', project: '스마트홈 허브 - 데이터 저장', files: ['main.ino', 'README.md'], prompt: `[Day 84] ESP32 Arduino - 최종 프로젝트 4` },
  85: { title: '최종 프로젝트 5', project: '스마트홈 허브 - 통합', files: ['main.ino', 'README.md'], prompt: `[Day 85] ESP32 Arduino - 최종 프로젝트 5` },
  86: { title: '코드 리팩토링', project: '코드 품질 개선', files: ['main.ino', 'README.md'], prompt: `[Day 86] ESP32 Arduino - 코드 리팩토링` },
  87: { title: '테스트 및 디버깅', project: '시스템 검증', files: ['main.ino', 'README.md'], prompt: `[Day 87] ESP32 Arduino - 테스트 및 디버깅` },
  88: { title: '문서화', project: '사용자 매뉴얼', files: ['README.md', 'QUICKSTART.md'], prompt: `[Day 88] ESP32 Arduino - 문서화` },
  89: { title: 'PCB 설계 기초', project: '회로도 및 PCB', files: ['README.md'], prompt: `[Day 89] ESP32 Arduino - PCB 설계 기초` },
  90: { title: '과정 완료 및 다음 단계', project: '최종 리뷰', files: ['README.md', 'CERTIFICATE.md'], prompt: `[Day 90] ESP32 Arduino - 과정 완료 및 다음 단계` },
};

// 레벨별 프롬프트 데이터 가져오기
function getPromptData(level: string, day: number): PromptData | null {
  if (level === 'beginner' && beginnerPrompts[day]) {
    return beginnerPrompts[day];
  } else if (level === 'intermediate' && intermediatePrompts[day]) {
    return intermediatePrompts[day];
  } else if (level === 'advanced' && advancedPrompts[day]) {
    return advancedPrompts[day];
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
