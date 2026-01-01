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

📚 문법 설명 (코드 내 주석으로 포함):
- WiFi.softAP(ssid, password): ESP32를 AP(Access Point)로 동작시켜 핫스팟 생성
- WiFi.softAPIP(): AP 모드에서 ESP32의 IP 주소 반환 (기본 192.168.4.1)
- WiFi.softAPgetStationNum(): 현재 연결된 클라이언트 수 반환
- AP 모드 vs Station 모드: AP=핫스팟 제공, Station=공유기에 연결
- WiFi.mode(WIFI_AP): WiFi 모드를 AP 전용으로 설정

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

📚 문법 설명 (코드 내 주석으로 포함):
- server.arg("파라미터명"): HTTP 요청에서 폼 데이터 가져오기
- server.hasArg("파라미터명"): 해당 파라미터 존재 여부 확인
- WiFi.mode(WIFI_AP_STA): AP와 Station 모드 동시 사용
- WiFi.disconnect(): 현재 WiFi 연결 해제
- HTML <form>: method="POST" action="/save"로 데이터 전송
- <input type="text/password">: 사용자 입력 필드

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

📚 문법 설명 (코드 내 주석으로 포함):
- #include <DNSServer.h>: DNS 서버 라이브러리 포함
- DNSServer dnsServer: DNS 서버 객체 생성
- dnsServer.start(53, "*", apIP): 포트 53에서 모든 도메인("*")을 apIP로 리다이렉트
- dnsServer.processNextRequest(): DNS 요청 처리 (loop에서 호출)
- 캡티브 포털: WiFi 연결 시 자동으로 로그인 페이지가 뜨는 기능
- <meta name="viewport">: 모바일 화면에 맞게 크기 조정

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

📚 문법 설명 (코드 내 주석으로 포함):
- #include <SPIFFS.h>: SPI Flash File System 라이브러리
- SPIFFS.begin(true): 파일 시스템 마운트 (true=실패 시 포맷)
- SPIFFS.format(): 파일 시스템 초기화 (모든 데이터 삭제)
- File file = SPIFFS.open(경로, 모드): 파일 열기 ("r"=읽기, "w"=쓰기, "a"=추가)
- file.print()/println(): 파일에 데이터 쓰기
- file.readString(): 파일 내용 전체를 문자열로 읽기
- file.close(): 파일 닫기 (반드시 호출)
- SPIFFS: ESP32 내장 플래시에 파일 저장하는 시스템

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

📚 문법 설명 (코드 내 주석으로 포함):
- server.serveStatic(URL경로, 파일시스템, 폴더경로): 정적 파일 자동 서빙
- data/ 폴더: Arduino IDE에서 SPIFFS로 업로드되는 폴더
- MIME 타입: 파일 형식 지정 (text/html, text/css, application/javascript)
- Cache-Control 헤더: 브라우저 캐싱 제어 ("max-age=86400" = 1일)
- <link rel="stylesheet" href="/style.css">: 외부 CSS 파일 연결

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

📚 문법 설명 (코드 내 주석으로 포함):
- #include <LittleFS.h>: LittleFS 라이브러리 (SPIFFS보다 안정적)
- LittleFS.begin(): 파일 시스템 마운트
- LittleFS vs SPIFFS: LittleFS가 전원 차단에 더 안전하고 wear leveling 지원
- SPIFFS에서 마이그레이션: #include와 SPIFFS→LittleFS만 변경하면 됨

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

📚 문법 설명 (코드 내 주석으로 포함):
- struct 구조체명 { 멤버들 }: 여러 변수를 하나로 묶는 사용자 정의 타입
- struct Config { char ssid[32]; char password[64]; int port; };
- 구조체변수.멤버: 점(.) 연산자로 멤버 접근
- strcpy(목적지, 원본): C 문자열 복사 (char 배열용)
- deserializeJson(doc, file): 파일에서 JSON 읽어 파싱
- doc["키"].as<타입>(): JSON 값을 특정 타입으로 변환

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

📚 문법 설명 (코드 내 주석으로 포함):
- #include <WebSocketsServer.h>: WebSocket 서버 라이브러리
- WebSocketsServer webSocket(81): 포트 81에서 WebSocket 서버 생성
- webSocket.begin(): WebSocket 서버 시작
- webSocket.onEvent(콜백함수): 이벤트 발생 시 호출될 함수 등록
- webSocket.loop(): 이벤트 처리 (loop에서 반복 호출)
- WStype_CONNECTED/DISCONNECTED/TEXT: WebSocket 이벤트 타입
- webSocket.sendTXT(클라이언트번호, 메시지): 특정 클라이언트에 메시지 전송
- WebSocket vs HTTP: WebSocket은 연결 유지하며 양방향 실시간 통신

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

📚 문법 설명 (코드 내 주석으로 포함):
- webSocket.broadcastTXT(메시지): 모든 연결된 클라이언트에 메시지 전송
- JavaScript: new WebSocket("ws://IP:81"): 브라우저에서 WebSocket 연결
- ws.onopen/onmessage/onclose: JavaScript WebSocket 이벤트 핸들러
- ws.send(메시지): JavaScript에서 서버로 메시지 전송
- JSON.parse()/JSON.stringify(): JavaScript JSON 변환

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

📚 문법 설명 (코드 내 주석으로 포함):
- Chart.js: JavaScript 그래프 라이브러리 (CDN으로 로드)
- new Chart(ctx, config): 차트 객체 생성
- chart.data.datasets[0].data.push(값): 데이터 포인트 추가
- chart.update(): 차트 갱신 (데이터 변경 후 호출)
- 배열.shift(): 배열 첫 요소 제거 (오래된 데이터 삭제)
- setInterval(함수, ms): 주기적 실행 (JavaScript)

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
