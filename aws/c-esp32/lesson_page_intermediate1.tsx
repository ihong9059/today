// 중급 과정 Part 1 (Day 16-25): WiFi AP와 고급 웹
export const intermediatePromptsPart1: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  16: {
    title: 'WiFi AP 모드 기초',
    project: '핫스팟 생성',
    files: ['main.ino', 'ap_manager.h', 'ap_manager.cpp', 'config.h', 'README.md'],
    prompt: `[Day 16] ESP32 Arduino - WiFi AP 모드 기초

프로젝트: 핫스팟 생성

프로젝트 구조:
day16_wifi_ap/
├── main.ino
├── ap_manager.h
├── ap_manager.cpp
├── config.h
└── README.md

요구사항:
1. WiFi.softAP(ssid, password)로 AP 모드 시작
2. AP 이름: "ESP32_IoT_AP"
3. AP IP 주소: 192.168.4.1 (기본값)
4. 연결된 클라이언트 수 표시
5. OLED에 AP 정보 표시
6. 시리얼에 연결/해제 이벤트 출력

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
(실행 방법)
===== 파일 끝 =====`
  },
  17: {
    title: 'AP 모드 웹서버',
    project: 'AP 설정 페이지',
    files: ['main.ino', 'ap_manager.h', 'ap_manager.cpp', 'web_server.h', 'web_server.cpp', 'README.md'],
    prompt: `[Day 17] ESP32 Arduino - AP 모드 웹서버

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
1. AP 모드로 시작 + 웹서버 구동
2. 192.168.4.1 접속 시 설정 페이지
3. WiFi SSID/Password 입력 폼
4. 입력받은 정보로 Station 모드 연결 시도
5. 연결 성공/실패 결과 표시
6. LED로 연결 상태 표시

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

===== 파일: web_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  18: {
    title: '캡티브 포털',
    project: '자동 설정 페이지',
    files: ['main.ino', 'captive_portal.h', 'captive_portal.cpp', 'dns_server.h', 'dns_server.cpp', 'README.md'],
    prompt: `[Day 18] ESP32 Arduino - 캡티브 포털

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
1. DNSServer 라이브러리로 DNS 서버 구동
2. 모든 도메인을 ESP32 IP로 리다이렉트
3. 스마트폰 연결 시 자동으로 설정 페이지 표시
4. WiFi 설정 입력 후 저장
5. 모바일 친화적 UI (viewport 메타태그)
6. 연결 테스트 및 결과 페이지

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: captive_portal.h =====
(코드)
===== 파일 끝 =====

===== 파일: captive_portal.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: dns_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: dns_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  19: {
    title: 'SPIFFS 파일 시스템',
    project: '파일 저장',
    files: ['main.ino', 'file_system.h', 'file_system.cpp', 'README.md'],
    prompt: `[Day 19] ESP32 Arduino - SPIFFS 파일 시스템

프로젝트: 파일 저장

프로젝트 구조:
day19_spiffs/
├── main.ino
├── file_system.h
├── file_system.cpp
└── README.md

요구사항:
1. SPIFFS.h 라이브러리 사용
2. SPIFFS.begin(true)로 포맷 후 마운트
3. 파일 쓰기: File file = SPIFFS.open("/test.txt", "w")
4. 파일 읽기: SPIFFS.open("/test.txt", "r")
5. 파일 목록 출력: SPIFFS.openDir("/")
6. 시리얼로 파일 내용 확인

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: file_system.h =====
(코드)
===== 파일 끝 =====

===== 파일: file_system.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 - SPIFFS 데이터 업로드 안내)
===== 파일 끝 =====`
  },
  20: {
    title: 'SPIFFS 웹 페이지 저장',
    project: 'HTML/CSS 파일 서빙',
    files: ['main.ino', 'file_system.h', 'file_system.cpp', 'web_server.h', 'web_server.cpp', 'data/index.html', 'data/style.css', 'README.md'],
    prompt: `[Day 20] ESP32 Arduino - SPIFFS 웹 페이지 저장

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
1. SPIFFS에 HTML/CSS 파일 저장
2. Arduino IDE SPIFFS 업로드 도구 사용
3. server.serveStatic("/", SPIFFS, "/")
4. MIME 타입 자동 처리
5. 외부 CSS 파일 링크
6. 캐싱 헤더 설정

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: file_system.h =====
(코드)
===== 파일 끝 =====

===== 파일: file_system.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: data/index.html =====
(코드)
===== 파일 끝 =====

===== 파일: data/style.css =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(SPIFFS 업로드 방법 포함)
===== 파일 끝 =====`
  },
  21: {
    title: 'LittleFS 마이그레이션',
    project: 'LittleFS 파일 시스템',
    files: ['main.ino', 'file_system.h', 'file_system.cpp', 'README.md'],
    prompt: `[Day 21] ESP32 Arduino - LittleFS 마이그레이션

프로젝트: LittleFS 파일 시스템

프로젝트 구조:
day21_littlefs/
├── main.ino
├── file_system.h
├── file_system.cpp
└── README.md

요구사항:
1. LittleFS.h 라이브러리 사용 (SPIFFS 대체)
2. LittleFS.begin()으로 마운트
3. SPIFFS와 동일한 API 사용
4. 더 안정적이고 빠른 파일 시스템
5. 설정값 JSON 형태로 저장/로드
6. ArduinoJson과 연동

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: file_system.h =====
(코드)
===== 파일 끝 =====

===== 파일: file_system.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  22: {
    title: '설정 파일 관리',
    project: 'JSON 설정 저장',
    files: ['main.ino', 'config_manager.h', 'config_manager.cpp', 'README.md'],
    prompt: `[Day 22] ESP32 Arduino - 설정 파일 관리

프로젝트: JSON 설정 저장

프로젝트 구조:
day22_config_json/
├── main.ino
├── config_manager.h
├── config_manager.cpp
└── README.md

요구사항:
1. ArduinoJson으로 설정 파일 관리
2. /config.json 파일에 WiFi 정보 저장
3. 부팅 시 설정 자동 로드
4. 웹에서 설정 변경 가능
5. 설정 초기화 버튼
6. struct로 설정 구조체 정의

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: config_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: config_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  23: {
    title: 'WebSocket 기초',
    project: '실시간 통신',
    files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'README.md'],
    prompt: `[Day 23] ESP32 Arduino - WebSocket 기초

프로젝트: 실시간 통신

프로젝트 구조:
day23_websocket/
├── main.ino
├── websocket_server.h
├── websocket_server.cpp
└── README.md

요구사항:
1. WebSocketsServer 라이브러리 사용
2. WebSocketsServer webSocket(81)
3. webSocket.onEvent(webSocketEvent) 콜백
4. 클라이언트 연결/해제 이벤트 처리
5. 양방향 메시지 송수신
6. JSON 메시지 형식

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: websocket_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: websocket_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 WebSockets 라이브러리 설치)
===== 파일 끝 =====`
  },
  24: {
    title: 'WebSocket LED 제어',
    project: '실시간 LED 제어',
    files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'led_control.h', 'led_control.cpp', 'data/index.html', 'README.md'],
    prompt: `[Day 24] ESP32 Arduino - WebSocket LED 제어

프로젝트: 실시간 LED 제어

프로젝트 구조:
day24_ws_led/
├── main.ino
├── websocket_server.h
├── websocket_server.cpp
├── led_control.h
├── led_control.cpp
├── data/
│   └── index.html
└── README.md

요구사항:
1. WebSocket으로 LED 실시간 제어
2. 페이지 새로고침 없이 즉시 반영
3. 다중 클라이언트 동기화
4. LED 상태 변경 시 모든 클라이언트에 브로드캐스트
5. JavaScript WebSocket 클라이언트 코드
6. 연결 상태 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: websocket_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: websocket_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: data/index.html =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  25: {
    title: 'WebSocket 센서 모니터',
    project: '실시간 센서 대시보드',
    files: ['main.ino', 'websocket_server.h', 'websocket_server.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'data/index.html', 'README.md'],
    prompt: `[Day 25] ESP32 Arduino - WebSocket 센서 모니터

프로젝트: 실시간 센서 대시보드

프로젝트 구조:
day25_ws_sensor/
├── main.ino
├── websocket_server.h
├── websocket_server.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
├── data/
│   └── index.html
└── README.md

요구사항:
1. 1초 간격 센서 데이터 WebSocket 전송
2. 실시간 그래프 (Chart.js 사용)
3. 최근 60개 데이터 포인트 표시
4. 온도/습도 경고 알림 (임계값 초과 시)
5. 연결 상태 및 데이터 수신 표시
6. 반응형 대시보드 UI

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: websocket_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: websocket_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: data/index.html =====
(코드 - Chart.js CDN 포함)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  }
};

export default intermediatePromptsPart1;
