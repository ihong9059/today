// 중급 과정 Part 3 (Day 36-45): 데이터 관리
export const intermediatePromptsPart3: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  36: {
    title: 'EEPROM 기초',
    project: '데이터 영구 저장',
    files: ['main.ino', 'eeprom_manager.h', 'eeprom_manager.cpp', 'README.md'],
    prompt: `[Day 36] ESP32 Arduino - EEPROM 기초

프로젝트: 데이터 영구 저장

프로젝트 구조:
day36_eeprom/
├── main.ino
├── eeprom_manager.h
├── eeprom_manager.cpp
└── README.md

요구사항:
1. EEPROM.h 라이브러리 사용
2. EEPROM.begin(512) 초기화
3. 바이트 단위 읽기/쓰기
4. EEPROM.commit() 저장 확정
5. 부팅 횟수 카운터 예제
6. 유효성 검사 (매직 넘버)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <EEPROM.h>: EEPROM 에뮬레이션 라이브러리
- EEPROM.begin(크기): EEPROM 영역 초기화 (최대 4096바이트)
- EEPROM.read(주소): 해당 주소의 1바이트 읽기
- EEPROM.write(주소, 값): 해당 주소에 1바이트 쓰기
- EEPROM.commit(): 변경사항을 플래시에 저장 (반드시 호출)
- 매직 넘버: 데이터 유효성 확인용 고정값 (예: 0xAB)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: eeprom_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: eeprom_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(EEPROM 사용법)
===== 파일 끝 =====`
  },
  37: {
    title: 'Preferences 라이브러리',
    project: 'NVS 설정 저장',
    files: ['main.ino', 'preferences_manager.h', 'preferences_manager.cpp', 'README.md'],
    prompt: `[Day 37] ESP32 Arduino - Preferences 라이브러리

프로젝트: NVS 설정 저장

프로젝트 구조:
day37_preferences/
├── main.ino
├── preferences_manager.h
├── preferences_manager.cpp
└── README.md

요구사항:
1. Preferences.h 라이브러리 (ESP32 전용)
2. preferences.begin("app", false)
3. putInt, putString, getString 등
4. WiFi 설정 저장 및 로드
5. 네임스페이스로 분류
6. 초기화 기능

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Preferences.h>: ESP32 NVS(Non-Volatile Storage) 라이브러리
- Preferences preferences: Preferences 객체 생성
- preferences.begin("namespace", false): 네임스페이스 열기 (false=읽기/쓰기)
- preferences.putInt("key", value): 정수 저장
- preferences.getString("key", "기본값"): 문자열 읽기 (없으면 기본값)
- preferences.end(): 네임스페이스 닫기
- NVS: ESP32의 키-값 저장소 (EEPROM보다 편리)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: preferences_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: preferences_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(Preferences vs EEPROM 비교)
===== 파일 끝 =====`
  },
  38: {
    title: '자동 WiFi 연결',
    project: '저장된 WiFi 자동 연결',
    files: ['main.ino', 'wifi_auto.h', 'wifi_auto.cpp', 'preferences_manager.h', 'preferences_manager.cpp', 'README.md'],
    prompt: `[Day 38] ESP32 Arduino - 자동 WiFi 연결

프로젝트: 저장된 WiFi 자동 연결

프로젝트 구조:
day38_wifi_auto/
├── main.ino
├── wifi_auto.h
├── wifi_auto.cpp
├── preferences_manager.h
├── preferences_manager.cpp
└── README.md

요구사항:
1. NVS에 저장된 WiFi 정보 자동 로드
2. 연결 실패 시 AP 모드 전환
3. 웹에서 새 WiFi 설정 입력
4. 설정 저장 후 재부팅
5. 연결 상태 OLED 표시
6. 버튼으로 설정 초기화

📚 문법 설명 (코드 내 주석으로 포함):
- ESP.restart(): ESP32 소프트웨어 재부팅
- preferences.clear(): 네임스페이스의 모든 데이터 삭제
- WiFi.waitForConnectResult(): 연결 완료까지 대기 후 결과 반환
- 폴백(fallback): 주 동작 실패 시 대체 동작 (Station 실패 → AP 모드)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: wifi_auto.h =====
(코드)
===== 파일 끝 =====

===== 파일: wifi_auto.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: preferences_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: preferences_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(자동 연결 플로우 설명)
===== 파일 끝 =====`
  },
  39: {
    title: 'SD 카드 기초',
    project: 'SD 카드 읽기/쓰기',
    files: ['main.ino', 'sd_manager.h', 'sd_manager.cpp', 'README.md'],
    prompt: `[Day 39] ESP32 Arduino - SD 카드 기초

프로젝트: SD 카드 읽기/쓰기

프로젝트 구조:
day39_sd_card/
├── main.ino
├── sd_manager.h
├── sd_manager.cpp
└── README.md

요구사항:
1. SD.h 라이브러리 사용
2. SPI 핀 설정 (기본값 또는 커스텀)
3. SD.begin() 초기화
4. 파일 생성, 읽기, 쓰기
5. 디렉토리 생성 및 목록
6. 카드 정보 출력 (용량, 타입)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <SD.h>: SD 카드 라이브러리
- #include <SPI.h>: SPI 통신 라이브러리 (SD 카드용)
- SD.begin(CS핀): SD 카드 초기화 (CS=Chip Select 핀)
- SD.mkdir("/폴더명"): 디렉토리 생성
- SD.open(경로, 모드): 파일 열기 (FILE_WRITE, FILE_READ)
- SD.cardType(): SD/SDHC/SDXC 카드 타입 반환
- SD.cardSize(): 카드 용량(바이트) 반환

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: sd_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: sd_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(SD 카드 연결 방법)
===== 파일 끝 =====`
  },
  40: {
    title: 'SD 카드 데이터 로깅',
    project: '센서 데이터 CSV 저장',
    files: ['main.ino', 'data_logger.h', 'data_logger.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 40] ESP32 Arduino - SD 카드 데이터 로깅

프로젝트: 센서 데이터 CSV 저장

프로젝트 구조:
day40_sd_logging/
├── main.ino
├── data_logger.h
├── data_logger.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. 센서 데이터 CSV 형식 저장
2. 헤더: timestamp,temperature,humidity
3. 10초 간격 로깅
4. 파일명: datalog_YYYYMMDD.csv
5. 로그 파일 로테이션 (일별)
6. 시리얼로 마지막 10개 항목 출력

📚 문법 설명 (코드 내 주석으로 포함):
- CSV: Comma Separated Values - 쉼표로 구분된 데이터 형식
- file.print()/println(): 파일에 데이터 쓰기
- 로그 로테이션: 일정 조건(날짜/크기)에서 새 파일로 전환
- snprintf(버퍼, 크기, 포맷, ...): 안전한 문자열 포맷팅 (버퍼 오버플로 방지)
- FILE_APPEND: 기존 파일 끝에 추가 모드

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: data_logger.h =====
(코드)
===== 파일 끝 =====

===== 파일: data_logger.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(로그 파일 형식 설명)
===== 파일 끝 =====`
  },
  41: {
    title: 'NTP 시간 동기화',
    project: '인터넷 시간 연동',
    files: ['main.ino', 'ntp_time.h', 'ntp_time.cpp', 'README.md'],
    prompt: `[Day 41] ESP32 Arduino - NTP 시간 동기화

프로젝트: 인터넷 시간 연동

프로젝트 구조:
day41_ntp_time/
├── main.ino
├── ntp_time.h
├── ntp_time.cpp
└── README.md

요구사항:
1. configTime()으로 NTP 설정
2. 한국 시간대: GMT+9
3. getLocalTime() 현재 시간 가져오기
4. strftime()으로 시간 포맷팅
5. OLED에 현재 시간 표시
6. 시간 동기화 주기 설정

📚 문법 설명 (코드 내 주석으로 포함):
- configTime(GMT오프셋초, DST오프셋초, NTP서버): NTP 시간 동기화 설정
- GMT+9 = 9 * 3600초: 한국 표준시 오프셋
- struct tm timeinfo: 시간 정보 구조체 (년,월,일,시,분,초)
- getLocalTime(&timeinfo): 현재 시간 가져오기
- strftime(버퍼, 크기, 포맷, &tm): 시간을 문자열로 포맷팅
- %Y-%m-%d %H:%M:%S: 날짜/시간 포맷 (2025-01-01 12:00:00)
- NTP: Network Time Protocol - 인터넷 시간 동기화 프로토콜

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ntp_time.h =====
(코드)
===== 파일 끝 =====

===== 파일: ntp_time.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(NTP 서버 설정 안내)
===== 파일 끝 =====`
  },
  42: {
    title: '시간 기반 로깅',
    project: '타임스탬프 로그',
    files: ['main.ino', 'timed_logger.h', 'timed_logger.cpp', 'ntp_time.h', 'ntp_time.cpp', 'README.md'],
    prompt: `[Day 42] ESP32 Arduino - 시간 기반 로깅

프로젝트: 타임스탬프 로그

프로젝트 구조:
day42_timed_log/
├── main.ino
├── timed_logger.h
├── timed_logger.cpp
├── ntp_time.h
├── ntp_time.cpp
└── README.md

요구사항:
1. NTP 시간 + SD 카드 로깅 통합
2. ISO 8601 타임스탬프: 2025-01-01T12:00:00+09:00
3. 웹에서 로그 파일 다운로드
4. 로그 레벨 (INFO, WARN, ERROR)
5. 버퍼링으로 쓰기 최적화
6. 로그 파일 크기 제한

📚 문법 설명 (코드 내 주석으로 포함):
- ISO 8601: 국제 표준 날짜/시간 형식 (2025-01-01T12:00:00+09:00)
- 로그 레벨: 메시지 중요도 분류 (DEBUG < INFO < WARN < ERROR)
- enum LogLevel { DEBUG, INFO, WARN, ERROR }: 열거형으로 레벨 정의
- 버퍼링: 여러 로그를 모아서 한 번에 쓰기 (SD 카드 수명 연장)
- file.size(): 파일 크기(바이트) 반환

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: timed_logger.h =====
(코드)
===== 파일 끝 =====

===== 파일: timed_logger.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: ntp_time.h =====
(코드)
===== 파일 끝 =====

===== 파일: ntp_time.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(로그 시스템 사용법)
===== 파일 끝 =====`
  },
  43: {
    title: '중급 종합 프로젝트 1',
    project: 'IoT 환경 모니터 v2 - 센서/웹',
    files: ['main.ino', 'config.h', 'wifi_auto.h', 'wifi_auto.cpp', 'websocket_server.h', 'websocket_server.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'oled_display.h', 'oled_display.cpp', 'README.md'],
    prompt: `[Day 43] ESP32 Arduino - 중급 종합 프로젝트 1

프로젝트: IoT 환경 모니터 v2 - 센서/웹

프로젝트 구조:
day43_iot_v2_web/
├── main.ino
├── config.h
├── wifi_auto.h
├── wifi_auto.cpp
├── websocket_server.h
├── websocket_server.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
├── oled_display.h
├── oled_display.cpp
└── README.md

요구사항:
1. 자동 WiFi 연결 (저장된 정보 사용)
2. WebSocket 실시간 센서 데이터
3. Chart.js 그래프 표시
4. LED 원격 제어
5. OLED 상태 표시
6. 버튼으로 설정 초기화

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 형식 동일)

===== 파일: README.md =====
(프로젝트 설명)
===== 파일 끝 =====`
  },
  44: {
    title: '중급 종합 프로젝트 2',
    project: 'IoT 환경 모니터 v2 - LoRa',
    files: ['main.ino', 'config.h', 'lora_driver.h', 'lora_driver.cpp', 'sensor_node.h', 'sensor_node.cpp', 'data_logger.h', 'data_logger.cpp', 'README.md'],
    prompt: `[Day 44] ESP32 Arduino - 중급 종합 프로젝트 2

프로젝트: IoT 환경 모니터 v2 - LoRa

프로젝트 구조:
day44_iot_v2_lora/
├── main.ino
├── config.h
├── lora_driver.h
├── lora_driver.cpp
├── sensor_node.h
├── sensor_node.cpp
├── data_logger.h
├── data_logger.cpp
└── README.md

요구사항:
1. LoRa로 센서 데이터 원격 전송
2. 게이트웨이에서 데이터 수신
3. SD 카드에 수신 데이터 로깅
4. ACK 기반 신뢰성 전송
5. 멀티 노드 지원 (최대 4개)
6. OLED에 수신 데이터 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 형식 동일)

===== 파일: README.md =====
(LoRa 네트워크 구성)
===== 파일 끝 =====`
  },
  45: {
    title: '중급 종합 프로젝트 3',
    project: 'IoT 환경 모니터 v2 - 통합',
    files: ['main.ino', 'config.h', 'wifi_auto.h', 'wifi_auto.cpp', 'websocket_server.h', 'websocket_server.cpp', 'lora_driver.h', 'lora_driver.cpp', 'gateway.h', 'gateway.cpp', 'data_logger.h', 'data_logger.cpp', 'oled_display.h', 'oled_display.cpp', 'README.md'],
    prompt: `[Day 45] ESP32 Arduino - 중급 종합 프로젝트 3

프로젝트: IoT 환경 모니터 v2 - 통합

프로젝트 구조:
day45_iot_v2_full/
├── main.ino
├── config.h
├── wifi_auto.h
├── wifi_auto.cpp
├── websocket_server.h
├── websocket_server.cpp
├── lora_driver.h
├── lora_driver.cpp
├── gateway.h
├── gateway.cpp
├── data_logger.h
├── data_logger.cpp
├── oled_display.h
├── oled_display.cpp
└── README.md

요구사항:
1. WiFi AP + WebSocket 서버
2. LoRa 데이터 수신 및 표시
3. SD 카드 로깅 (타임스탬프 포함)
4. 웹 대시보드에 모든 노드 표시
5. LED/부저 알람 (임계값 초과)
6. 모든 모듈 통합 테스트

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 형식 동일)

===== 파일: README.md =====
(전체 시스템 구성도)
===== 파일 끝 =====`
  }
};

export default intermediatePromptsPart3;
