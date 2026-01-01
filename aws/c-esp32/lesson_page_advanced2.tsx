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
