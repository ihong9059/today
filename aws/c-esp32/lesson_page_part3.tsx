// 초급 과정 Part 3 (Day 11-15): WiFi 기초
export const beginnerPromptsPart3: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  11: {
    title: 'WiFi 연결',
    project: 'WiFi 연결 테스트',
    files: ['main.ino', 'wifi_manager.h', 'wifi_manager.cpp', 'config.h', 'README.md'],
    prompt: `[Day 11] ESP32 Arduino - WiFi 연결

프로젝트: WiFi 연결 테스트

프로젝트 구조:
day11_wifi_connect/
├── main.ino
├── wifi_manager.h
├── wifi_manager.cpp
├── config.h
└── README.md

요구사항:
1. WiFi.h 라이브러리 사용
2. config.h에 SSID, PASSWORD 정의
3. WiFi.begin()으로 공유기 연결
4. 연결 상태 시리얼 모니터 출력
5. IP 주소 출력: WiFi.localIP()
6. 연결 성공 시 BLUE LED 켜기
7. 연결 실패 시 RED LED 깜빡임

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: wifi_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: wifi_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 - SSID/PASSWORD 수정 안내)
===== 파일 끝 =====`
  },
  12: {
    title: '웹서버 기초',
    project: 'Hello World 웹서버',
    files: ['main.ino', 'web_server.h', 'web_server.cpp', 'README.md'],
    prompt: `[Day 12] ESP32 Arduino - 웹서버 기초

프로젝트: Hello World 웹서버

프로젝트 구조:
day12_webserver/
├── main.ino
├── web_server.h
├── web_server.cpp
└── README.md

요구사항:
1. WebServer.h 라이브러리 사용
2. WebServer server(80) 객체 생성
3. server.on("/", handleRoot) 라우트 설정
4. HTML 응답: "<h1>Hello ESP32!</h1>"
5. server.handleClient() 루프에서 호출
6. 시리얼에 접속 URL 출력

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 웹 접속 안내)
===== 파일 끝 =====`
  },
  13: {
    title: '웹으로 LED 제어',
    project: '웹 LED 제어',
    files: ['main.ino', 'web_server.h', 'web_server.cpp', 'led_control.h', 'led_control.cpp', 'README.md'],
    prompt: `[Day 13] ESP32 Arduino - 웹으로 LED 제어

프로젝트: 웹 LED 제어

프로젝트 구조:
day13_web_led/
├── main.ino
├── web_server.h
├── web_server.cpp
├── led_control.h
├── led_control.cpp
└── README.md

요구사항:
1. /led/on, /led/off 엔드포인트 구현
2. /led/red/on, /led/red/off 등 색상별 제어
3. HTML 버튼으로 LED 제어 UI
4. 현재 LED 상태 표시
5. server.send(200, "text/html", html) 응답
6. 버튼 클릭 시 해당 URL로 이동

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  14: {
    title: '웹에 센서 데이터 표시',
    project: '센서 데이터 API',
    files: ['main.ino', 'web_server.h', 'web_server.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 14] ESP32 Arduino - 웹에 센서 데이터 표시

프로젝트: 센서 데이터 API

프로젝트 구조:
day14_web_sensor/
├── main.ino
├── web_server.h
├── web_server.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. /api/sensor 엔드포인트 - JSON 응답
2. ArduinoJson 라이브러리 사용
3. {"temperature": 25.3, "humidity": 45.2} 형식
4. 웹페이지에서 fetch로 데이터 가져오기
5. 5초 간격 자동 갱신 (JavaScript setInterval)
6. 온습도 값 실시간 업데이트 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 ArduinoJson 설치)
===== 파일 끝 =====`
  },
  15: {
    title: '초급 종합 프로젝트',
    project: 'IoT 환경 모니터 v1',
    files: ['main.ino', 'config.h', 'wifi_manager.h', 'wifi_manager.cpp', 'web_server.h', 'web_server.cpp', 'led_control.h', 'led_control.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'oled_display.h', 'oled_display.cpp', 'README.md'],
    prompt: `[Day 15] ESP32 Arduino - 초급 종합 프로젝트

프로젝트: IoT 환경 모니터 v1

프로젝트 구조:
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

요구사항:
1. WiFi 연결 후 웹서버 구동
2. 온습도 실시간 웹 표시 (JSON API + HTML)
3. LED 원격 제어 (웹 버튼)
4. OLED에 IP 주소 + 센서 데이터 표시
5. 버튼(GPIO32)으로 BEEP 부저 알림
6. 모든 모듈 통합 및 테스트
7. 에러 처리 및 상태 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: wifi_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: wifi_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.h =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(전체 프로젝트 설명 및 실행 방법)
===== 파일 끝 =====`
  }
};

export default beginnerPromptsPart3;
