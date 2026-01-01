// 고급 과정 Part 2 (Day 56-65): 보안과 OTA
export const advancedPromptsPart2: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  56: {
    title: 'HTTPS 클라이언트',
    project: '보안 API 호출',
    files: ['main.ino', 'https_client.h', 'https_client.cpp', 'README.md'],
    prompt: `[Day 56] ESP32 Arduino - HTTPS 클라이언트

프로젝트: 보안 API 호출

프로젝트 구조:
day56_https/
├── main.ino
├── https_client.h
├── https_client.cpp
└── README.md

요구사항:
1. WiFiClientSecure 사용
2. 루트 인증서 설정 (CA cert)
3. client.setCACert(root_ca)
4. HTTPS GET 요청
5. JSON 응답 파싱
6. 공개 API 호출 예시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <WiFiClientSecure.h>: TLS/SSL 지원 WiFi 클라이언트
- WiFiClientSecure client: 보안 연결용 클라이언트 객체
- client.setCACert(인증서문자열): 서버 인증용 루트 CA 인증서 설정
- client.setInsecure(): 인증서 검증 생략 (테스트용, 비권장)
- const char* root_ca = R"EOF(...)EOF": Raw 문자열 리터럴로 인증서 저장
- HTTPS: HTTP + TLS/SSL, 포트 443 사용
- TLS: Transport Layer Security, 데이터 암호화 프로토콜
- client.connect(호스트, 443): HTTPS 포트로 연결

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: https_client.h =====
(코드)
===== 파일 끝 =====

===== 파일: https_client.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(인증서 획득 방법)
===== 파일 끝 =====`
  },
  57: {
    title: 'HTTPS POST',
    project: '보안 데이터 전송',
    files: ['main.ino', 'https_post.h', 'https_post.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 57] ESP32 Arduino - HTTPS POST

프로젝트: 보안 데이터 전송

프로젝트 구조:
day57_https_post/
├── main.ino
├── https_post.h
├── https_post.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. HTTPS POST 요청
2. Content-Type: application/json
3. 센서 데이터 JSON 본문
4. 응답 코드 확인
5. 에러 처리 및 재시도
6. 타임아웃 설정

📚 문법 설명 (코드 내 주석으로 포함):
- client.print("POST /api HTTP/1.1\\r\\n"): HTTP POST 요청 라인 전송
- client.print("Content-Type: application/json\\r\\n"): 헤더 설정
- client.print("Content-Length: " + String(길이) + "\\r\\n"): 본문 길이 명시
- client.print("\\r\\n"): 헤더 종료 표시 (빈 줄)
- client.print(jsonBody): POST 본문 전송
- client.setTimeout(밀리초): 응답 대기 타임아웃 설정
- HTTP 상태코드: 200(성공), 400(잘못된 요청), 500(서버 오류)
- \\r\\n: HTTP에서 줄바꿈 표준 (Carriage Return + Line Feed)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: https_post.h =====
(코드)
===== 파일 끝 =====

===== 파일: https_post.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(POST 요청 테스트)
===== 파일 끝 =====`
  },
  58: {
    title: 'API 인증',
    project: 'Bearer Token 인증',
    files: ['main.ino', 'api_auth.h', 'api_auth.cpp', 'README.md'],
    prompt: `[Day 58] ESP32 Arduino - API 인증

프로젝트: Bearer Token 인증

프로젝트 구조:
day58_api_auth/
├── main.ino
├── api_auth.h
├── api_auth.cpp
└── README.md

요구사항:
1. Authorization: Bearer <token> 헤더
2. 토큰 NVS에 안전하게 저장
3. 토큰 만료 처리
4. 리프레시 토큰 (선택)
5. API 키 vs Bearer Token 비교
6. 보안 모범 사례

📚 문법 설명 (코드 내 주석으로 포함):
- "Authorization: Bearer " + token: Bearer 토큰 인증 헤더 형식
- Bearer Token: OAuth 2.0 표준 인증 방식
- API Key: 요청에 포함하는 고정 비밀 키
- NVS(Non-Volatile Storage): ESP32 내장 플래시에 키-값 저장
- 토큰 만료(Expiry): 보안을 위해 일정 시간 후 토큰 무효화
- 리프레시 토큰: 만료된 토큰을 갱신하는 별도 토큰
- Authorization 헤더: HTTP 표준 인증 헤더

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: api_auth.h =====
(코드)
===== 파일 끝 =====

===== 파일: api_auth.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(API 인증 방식 비교)
===== 파일 끝 =====`
  },
  59: {
    title: 'ArduinoOTA 기초',
    project: '무선 펌웨어 업데이트',
    files: ['main.ino', 'ota_handler.h', 'ota_handler.cpp', 'README.md'],
    prompt: `[Day 59] ESP32 Arduino - ArduinoOTA 기초

프로젝트: 무선 펌웨어 업데이트

프로젝트 구조:
day59_ota_basic/
├── main.ino
├── ota_handler.h
├── ota_handler.cpp
└── README.md

요구사항:
1. ArduinoOTA.h 라이브러리
2. ArduinoOTA.begin() 초기화
3. ArduinoOTA.handle() 루프에서 호출
4. OTA 비밀번호 설정
5. 진행률 콜백
6. Arduino IDE에서 네트워크 포트 선택

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ArduinoOTA.h>: Arduino OTA(Over-The-Air) 라이브러리
- ArduinoOTA.setHostname("이름"): 네트워크에서 보이는 기기 이름 설정
- ArduinoOTA.setPassword("비밀번호"): OTA 업데이트 비밀번호 설정
- ArduinoOTA.onStart(콜백): 업데이트 시작 시 호출할 함수 등록
- ArduinoOTA.onProgress(콜백): 진행률 업데이트 시 호출 (current, total)
- ArduinoOTA.onEnd(콜백): 업데이트 완료 시 호출할 함수 등록
- ArduinoOTA.onError(콜백): 오류 발생 시 호출 (에러 코드)
- ArduinoOTA.begin(): OTA 서비스 시작
- ArduinoOTA.handle(): loop()에서 OTA 요청 처리 (필수)
- OTA: Over-The-Air, 무선 펌웨어 업데이트

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ota_handler.h =====
(코드)
===== 파일 끝 =====

===== 파일: ota_handler.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(OTA 업데이트 절차)
===== 파일 끝 =====`
  },
  60: {
    title: '웹 기반 OTA',
    project: 'HTTP OTA 업데이트',
    files: ['main.ino', 'web_ota.h', 'web_ota.cpp', 'README.md'],
    prompt: `[Day 60] ESP32 Arduino - 웹 기반 OTA

프로젝트: HTTP OTA 업데이트

프로젝트 구조:
day60_web_ota/
├── main.ino
├── web_ota.h
├── web_ota.cpp
└── README.md

요구사항:
1. ESPhttpUpdate 라이브러리
2. 웹페이지에서 .bin 파일 업로드
3. Update.h 사용
4. 업데이트 진행률 표시
5. 실패 시 롤백 (선택)
6. 버전 체크 후 업데이트

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Update.h>: ESP32 펌웨어 업데이트 라이브러리
- #include <ESPhttpUpdate.h>: HTTP 기반 OTA 업데이트
- Update.begin(크기): 업데이트 시작 (플래시 공간 확보)
- Update.write(데이터, 길이): 펌웨어 데이터 쓰기
- Update.end(): 업데이트 완료 및 검증
- Update.hasError(): 업데이트 오류 발생 여부
- .bin 파일: 컴파일된 바이너리 펌웨어 파일
- ESP.restart(): 업데이트 후 재부팅

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: web_ota.h =====
(코드)
===== 파일 끝 =====

===== 파일: web_ota.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(.bin 파일 생성 및 업로드)
===== 파일 끝 =====`
  },
  61: {
    title: '자동 OTA 업데이트',
    project: '서버에서 펌웨어 다운로드',
    files: ['main.ino', 'auto_ota.h', 'auto_ota.cpp', 'config.h', 'README.md'],
    prompt: `[Day 61] ESP32 Arduino - 자동 OTA 업데이트

프로젝트: 서버에서 펌웨어 다운로드

프로젝트 구조:
day61_auto_ota/
├── main.ino
├── auto_ota.h
├── auto_ota.cpp
├── config.h
└── README.md

요구사항:
1. 서버에서 버전 정보 확인
2. 새 버전 있으면 자동 다운로드
3. httpUpdate.update(client, url)
4. 부팅 시 업데이트 체크
5. 실패 시 재시도 (최대 3회)
6. 업데이트 로그 저장

📚 문법 설명 (코드 내 주석으로 포함):
- httpUpdate.update(client, url): URL에서 펌웨어 다운로드 및 설치
- t_httpUpdate_return ret: 업데이트 결과 타입
- HTTP_UPDATE_FAILED: 업데이트 실패
- HTTP_UPDATE_NO_UPDATES: 업데이트 불필요
- HTTP_UPDATE_OK: 업데이트 성공 (재부팅됨)
- httpUpdate.getLastError(): 마지막 오류 코드
- httpUpdate.getLastErrorString(): 오류 메시지 문자열
- 버전 비교: 서버 버전 > 현재 버전이면 업데이트 실행

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: auto_ota.h =====
(코드)
===== 파일 끝 =====

===== 파일: auto_ota.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(버전 관리 서버 설정)
===== 파일 끝 =====`
  },
  62: {
    title: '버전 관리',
    project: '펌웨어 버전 시스템',
    files: ['main.ino', 'version.h', 'version_manager.h', 'version_manager.cpp', 'README.md'],
    prompt: `[Day 62] ESP32 Arduino - 버전 관리

프로젝트: 펌웨어 버전 시스템

프로젝트 구조:
day62_versioning/
├── main.ino
├── version.h
├── version_manager.h
├── version_manager.cpp
└── README.md

요구사항:
1. 시맨틱 버저닝 (MAJOR.MINOR.PATCH)
2. version.h에 버전 정의
3. 웹페이지에 현재 버전 표시
4. 빌드 날짜/시간 포함
5. 버전 비교 함수
6. 변경 로그 관리

📚 문법 설명 (코드 내 주석으로 포함):
- #define VERSION_MAJOR 1: 메이저 버전 (호환성 깨는 변경)
- #define VERSION_MINOR 2: 마이너 버전 (기능 추가)
- #define VERSION_PATCH 3: 패치 버전 (버그 수정)
- __DATE__: 컴파일 날짜 (예: "Jan 1 2025")
- __TIME__: 컴파일 시간 (예: "12:00:00")
- 시맨틱 버저닝: MAJOR.MINOR.PATCH 형식의 버전 관리 표준
- 버전 비교: (major * 10000) + (minor * 100) + patch로 숫자 비교

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: version.h =====
(코드)
===== 파일 끝 =====

===== 파일: version_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: version_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(버전 관리 가이드)
===== 파일 끝 =====`
  },
  63: {
    title: 'ESP-NOW 기초',
    project: 'P2P 통신',
    files: ['main.ino', 'espnow_comm.h', 'espnow_comm.cpp', 'README.md'],
    prompt: `[Day 63] ESP32 Arduino - ESP-NOW 기초

프로젝트: P2P 통신

프로젝트 구조:
day63_espnow/
├── main.ino
├── espnow_comm.h
├── espnow_comm.cpp
└── README.md

요구사항:
1. esp_now.h 라이브러리
2. esp_now_init() 초기화
3. esp_now_add_peer() 피어 등록
4. esp_now_send() 데이터 전송
5. 수신 콜백 등록
6. MAC 주소 확인 및 설정

📚 문법 설명 (코드 내 주석으로 포함):
- #include <esp_now.h>: ESP-NOW 프로토콜 라이브러리
- esp_now_init(): ESP-NOW 초기화 (WiFi 모드 설정 후)
- WiFi.mode(WIFI_STA): Station 모드 설정 (ESP-NOW에 필요)
- esp_now_peer_info_t peerInfo: 피어 정보 구조체
- memcpy(peerInfo.peer_addr, mac, 6): MAC 주소 복사
- esp_now_add_peer(&peerInfo): 피어 등록
- esp_now_send(mac, 데이터, 길이): 데이터 전송
- esp_now_register_recv_cb(콜백): 수신 콜백 등록
- esp_now_register_send_cb(콜백): 전송 결과 콜백 등록
- ESP-NOW: WiFi 기반 P2P 통신 (공유기 불필요)
- MAC 주소: 6바이트 하드웨어 주소 (예: {0xAA,0xBB,0xCC,0xDD,0xEE,0xFF})

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: espnow_comm.h =====
(코드)
===== 파일 끝 =====

===== 파일: espnow_comm.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(ESP-NOW vs WiFi 비교)
===== 파일 끝 =====`
  },
  64: {
    title: 'ESP-NOW 센서 네트워크',
    project: '다중 노드 통신',
    files: ['main.ino', 'espnow_sensor.h', 'espnow_sensor.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 64] ESP32 Arduino - ESP-NOW 센서 네트워크

프로젝트: 다중 노드 통신

프로젝트 구조:
day64_espnow_sensor/
├── main.ino
├── espnow_sensor.h
├── espnow_sensor.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. 센서 노드 → 게이트웨이 통신
2. 구조체로 데이터 패킹
3. 다중 노드 등록 (최대 20개)
4. 노드 ID로 식별
5. 수신 데이터 OLED 표시
6. 전송 성공/실패 콜백

📚 문법 설명 (코드 내 주석으로 포함):
- typedef struct { ... } SensorData: 센서 데이터 구조체 정의
- esp_now_send(nullptr, (uint8_t*)&data, sizeof(data)): 구조체 전송
- ESP_NOW_MAX_PEER_NUM: 최대 피어 수 (약 20개)
- 게이트웨이: 여러 노드 데이터를 수집하는 중앙 장치
- 노드 ID: 각 센서 장치를 구분하는 고유 번호
- 콜백 함수 시그니처: void OnDataRecv(const uint8_t* mac, const uint8_t* data, int len)
- esp_read_mac(mac, ESP_MAC_WIFI_STA): 자신의 MAC 주소 읽기

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: espnow_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: espnow_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(네트워크 구성 방법)
===== 파일 끝 =====`
  },
  65: {
    title: 'ESP-NOW 브로드캐스트',
    project: '일대다 동기화',
    files: ['main.ino', 'espnow_broadcast.h', 'espnow_broadcast.cpp', 'led_control.h', 'led_control.cpp', 'README.md'],
    prompt: `[Day 65] ESP32 Arduino - ESP-NOW 브로드캐스트

프로젝트: 일대다 동기화

프로젝트 구조:
day65_espnow_broadcast/
├── main.ino
├── espnow_broadcast.h
├── espnow_broadcast.cpp
├── led_control.h
├── led_control.cpp
└── README.md

요구사항:
1. 브로드캐스트 MAC: FF:FF:FF:FF:FF:FF
2. 모든 노드 동시 명령
3. LED 동기화 제어
4. 버튼으로 브로드캐스트 트리거
5. 응답 집계 (선택)
6. 타이밍 동기화

📚 문법 설명 (코드 내 주석으로 포함):
- uint8_t broadcastAddr[] = {0xFF,0xFF,0xFF,0xFF,0xFF,0xFF}: 브로드캐스트 MAC
- 브로드캐스트: 모든 수신자에게 동시 전송 (1:N 통신)
- 유니캐스트: 특정 대상에게만 전송 (1:1 통신)
- esp_now_send(broadcastAddr, data, len): 모든 ESP-NOW 장치에 전송
- 동기화: 여러 장치가 동시에 동작하도록 타이밍 맞춤
- millis() 동기화: 기준 시간을 전파하여 노드 간 시간 일치

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: espnow_broadcast.h =====
(코드)
===== 파일 끝 =====

===== 파일: espnow_broadcast.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(브로드캐스트 테스트)
===== 파일 끝 =====`
  }
};

export default advancedPromptsPart2;
