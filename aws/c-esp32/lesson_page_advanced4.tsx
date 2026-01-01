// 고급 과정 Part 4 (Day 76-90): 고급 프로젝트
export const advancedPromptsPart4: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  76: {
    title: 'Home Assistant 소개',
    project: 'MQTT Discovery',
    files: ['main.ino', 'ha_discovery.h', 'ha_discovery.cpp', 'config.h', 'README.md'],
    prompt: `[Day 76] ESP32 Arduino - Home Assistant 소개

프로젝트: MQTT Discovery

프로젝트 구조:
day76_ha_intro/
├── main.ino
├── ha_discovery.h
├── ha_discovery.cpp
├── config.h
└── README.md

요구사항:
1. Home Assistant MQTT Discovery 프로토콜
2. homeassistant/sensor/... 토픽 구조
3. 온도 센서 자동 등록
4. config 토픽에 JSON 발행
5. state 토픽에 값 발행
6. HA에서 자동 인식 확인

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ha_discovery.h =====
(코드)
===== 파일 끝 =====

===== 파일: ha_discovery.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(Home Assistant 설치 및 설정)
===== 파일 끝 =====`
  },
  77: {
    title: 'HA 센서 엔티티',
    project: '다중 센서 등록',
    files: ['main.ino', 'ha_sensors.h', 'ha_sensors.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 77] ESP32 Arduino - HA 센서 엔티티

프로젝트: 다중 센서 등록

프로젝트 구조:
day77_ha_sensors/
├── main.ino
├── ha_sensors.h
├── ha_sensors.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. 온도, 습도 각각 센서 등록
2. device_class, unit_of_measurement 설정
3. 고유 ID (unique_id) 부여
4. 장치 정보 (device) 포함
5. 가용성 (availability) 토픽
6. HA 대시보드 카드 생성

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ha_sensors.h =====
(코드)
===== 파일 끝 =====

===== 파일: ha_sensors.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(센서 엔티티 설정)
===== 파일 끝 =====`
  },
  78: {
    title: 'HA 스위치 엔티티',
    project: 'LED 원격 제어',
    files: ['main.ino', 'ha_switch.h', 'ha_switch.cpp', 'led_control.h', 'led_control.cpp', 'README.md'],
    prompt: `[Day 78] ESP32 Arduino - HA 스위치 엔티티

프로젝트: LED 원격 제어

프로젝트 구조:
day78_ha_switch/
├── main.ino
├── ha_switch.h
├── ha_switch.cpp
├── led_control.h
├── led_control.cpp
└── README.md

요구사항:
1. homeassistant/switch/... Discovery
2. command_topic으로 ON/OFF 수신
3. state_topic으로 현재 상태 발행
4. 3개 LED 각각 스위치 등록
5. HA에서 토글 제어
6. 물리 버튼과 HA 동기화

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ha_switch.h =====
(코드)
===== 파일 끝 =====

===== 파일: ha_switch.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(스위치 엔티티 설정)
===== 파일 끝 =====`
  },
  79: {
    title: 'HA 자동화',
    project: '자동화 규칙 연동',
    files: ['main.ino', 'ha_automation.h', 'ha_automation.cpp', 'README.md'],
    prompt: `[Day 79] ESP32 Arduino - HA 자동화

프로젝트: 자동화 규칙 연동

프로젝트 구조:
day79_ha_automation/
├── main.ino
├── ha_automation.h
├── ha_automation.cpp
└── README.md

요구사항:
1. 온도 임계값 초과 시 알림
2. HA 자동화 규칙 YAML 예시
3. 부저 알림 트리거
4. LED 자동 제어
5. 시간 기반 자동화
6. 센서 기반 자동화

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ha_automation.h =====
(코드)
===== 파일 끝 =====

===== 파일: ha_automation.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(HA 자동화 규칙 예시)
===== 파일 끝 =====`
  },
  80: {
    title: 'HA 통합 대시보드',
    project: 'Lovelace 카드',
    files: ['main.ino', 'ha_complete.h', 'ha_complete.cpp', 'README.md'],
    prompt: `[Day 80] ESP32 Arduino - HA 통합 대시보드

프로젝트: Lovelace 카드

프로젝트 구조:
day80_ha_dashboard/
├── main.ino
├── ha_complete.h
├── ha_complete.cpp
└── README.md

요구사항:
1. 센서 + 스위치 통합 Discovery
2. Lovelace 카드 YAML 예시
3. 게이지 카드, 버튼 카드
4. 히스토리 그래프
5. 알림 카드
6. 모바일 앱 연동

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ha_complete.h =====
(코드)
===== 파일 끝 =====

===== 파일: ha_complete.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(Lovelace 대시보드 설정)
===== 파일 끝 =====`
  },
  81: {
    title: '최종 프로젝트 1',
    project: '스마트홈 허브 - 센서 수집',
    files: ['main.ino', 'config.h', 'wifi_manager.h', 'wifi_manager.cpp', 'sensor_hub.h', 'sensor_hub.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'oled_display.h', 'oled_display.cpp', 'README.md'],
    prompt: `[Day 81] ESP32 Arduino - 최종 프로젝트 1

프로젝트: 스마트홈 허브 - 센서 수집

프로젝트 구조:
day81_smart_hub_sensor/
├── main.ino
├── config.h
├── wifi_manager.h
├── wifi_manager.cpp
├── sensor_hub.h
├── sensor_hub.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
├── oled_display.h
├── oled_display.cpp
└── README.md

요구사항:
1. 다중 센서 데이터 수집
2. 로컬 온습도 + LoRa 원격 노드
3. OLED에 모든 센서 표시
4. 데이터 구조체 정의
5. 센서 상태 모니터링
6. 오프라인 데이터 버퍼링

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 형식 동일)

===== 파일: README.md =====
(프로젝트 개요)
===== 파일 끝 =====`
  },
  82: {
    title: '최종 프로젝트 2',
    project: '스마트홈 허브 - 통신',
    files: ['main.ino', 'lora_gateway.h', 'lora_gateway.cpp', 'mqtt_bridge.h', 'mqtt_bridge.cpp', 'websocket_server.h', 'websocket_server.cpp', 'README.md'],
    prompt: `[Day 82] ESP32 Arduino - 최종 프로젝트 2

프로젝트: 스마트홈 허브 - 통신

프로젝트 구조:
day82_smart_hub_comm/
├── main.ino
├── lora_gateway.h
├── lora_gateway.cpp
├── mqtt_bridge.h
├── mqtt_bridge.cpp
├── websocket_server.h
├── websocket_server.cpp
└── README.md

요구사항:
1. LoRa 데이터 수신
2. MQTT로 클라우드 전송
3. WebSocket으로 로컬 웹 실시간
4. 프로토콜 브릿지 구현
5. 연결 상태 관리
6. 자동 재연결

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 형식 동일)

===== 파일: README.md =====
(통신 아키텍처)
===== 파일 끝 =====`
  },
  83: {
    title: '최종 프로젝트 3',
    project: '스마트홈 허브 - 웹 UI',
    files: ['main.ino', 'web_ui.h', 'web_ui.cpp', 'data/index.html', 'data/style.css', 'data/app.js', 'README.md'],
    prompt: `[Day 83] ESP32 Arduino - 최종 프로젝트 3

프로젝트: 스마트홈 허브 - 웹 UI

프로젝트 구조:
day83_smart_hub_ui/
├── main.ino
├── web_ui.h
├── web_ui.cpp
├── data/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md

요구사항:
1. 반응형 대시보드 UI
2. 실시간 센서 그래프 (Chart.js)
3. LED 제어 버튼
4. 노드 상태 표시
5. 설정 페이지
6. 다크 모드 지원

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 형식 동일)

===== 파일: README.md =====
(UI 디자인 가이드)
===== 파일 끝 =====`
  },
  84: {
    title: '최종 프로젝트 4',
    project: '스마트홈 허브 - 데이터 저장',
    files: ['main.ino', 'data_manager.h', 'data_manager.cpp', 'sd_logger.h', 'sd_logger.cpp', 'ntp_time.h', 'ntp_time.cpp', 'README.md'],
    prompt: `[Day 84] ESP32 Arduino - 최종 프로젝트 4

프로젝트: 스마트홈 허브 - 데이터 저장

프로젝트 구조:
day84_smart_hub_data/
├── main.ino
├── data_manager.h
├── data_manager.cpp
├── sd_logger.h
├── sd_logger.cpp
├── ntp_time.h
├── ntp_time.cpp
└── README.md

요구사항:
1. SD 카드 CSV 로깅
2. NVS 설정 저장
3. 데이터 백업/복원
4. 로그 파일 관리 (로테이션)
5. 웹에서 로그 다운로드
6. 데이터 내보내기 (JSON)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

(이하 모든 파일 형식 동일)

===== 파일: README.md =====
(데이터 관리 가이드)
===== 파일 끝 =====`
  },
  85: {
    title: '최종 프로젝트 5',
    project: '스마트홈 허브 - 통합',
    files: ['main.ino', 'config.h', 'smart_hub.h', 'smart_hub.cpp', 'README.md'],
    prompt: `[Day 85] ESP32 Arduino - 최종 프로젝트 5

프로젝트: 스마트홈 허브 - 통합

프로젝트 구조:
day85_smart_hub_integration/
├── main.ino
├── config.h
├── smart_hub.h
├── smart_hub.cpp
└── README.md

요구사항:
1. 모든 모듈 통합
2. FreeRTOS 태스크 분리
3. 코어별 작업 할당
4. 에러 처리 및 복구
5. 시스템 상태 모니터링
6. OTA 업데이트 지원

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: smart_hub.h =====
(코드)
===== 파일 끝 =====

===== 파일: smart_hub.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(시스템 아키텍처)
===== 파일 끝 =====`
  },
  86: {
    title: '코드 리팩토링',
    project: '코드 품질 개선',
    files: ['main.ino', 'README.md'],
    prompt: `[Day 86] ESP32 Arduino - 코드 리팩토링

프로젝트: 코드 품질 개선

요구사항:
1. 코드 스타일 통일 (clang-format)
2. 매직 넘버 상수화
3. 에러 코드 enum 정의
4. 함수 분리 및 모듈화
5. 주석 및 문서화
6. 메모리 최적화

작업 가이드:
1. 기존 코드 검토
2. 리팩토링 체크리스트
3. 개선 전/후 비교
4. 테스트 수행

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(리팩토링된 메인 코드)
===== 파일 끝 =====

===== 파일: README.md =====
(리팩토링 가이드)
===== 파일 끝 =====`
  },
  87: {
    title: '테스트 및 디버깅',
    project: '시스템 검증',
    files: ['main.ino', 'test_suite.h', 'test_suite.cpp', 'README.md'],
    prompt: `[Day 87] ESP32 Arduino - 테스트 및 디버깅

프로젝트: 시스템 검증

프로젝트 구조:
day87_testing/
├── main.ino
├── test_suite.h
├── test_suite.cpp
└── README.md

요구사항:
1. 단위 테스트 함수 작성
2. 하드웨어 테스트 루틴
3. 통신 테스트 (WiFi, LoRa, MQTT)
4. 센서 보정 확인
5. 스트레스 테스트
6. 테스트 결과 리포트

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: test_suite.h =====
(코드)
===== 파일 끝 =====

===== 파일: test_suite.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(테스트 절차)
===== 파일 끝 =====`
  },
  88: {
    title: '문서화',
    project: '사용자 매뉴얼',
    files: ['README.md', 'QUICKSTART.md', 'API.md', 'TROUBLESHOOTING.md'],
    prompt: `[Day 88] ESP32 Arduino - 문서화

프로젝트: 사용자 매뉴얼

프로젝트 구조:
day88_documentation/
├── README.md            # 프로젝트 개요
├── QUICKSTART.md        # 빠른 시작 가이드
├── API.md               # API 레퍼런스
└── TROUBLESHOOTING.md   # 문제 해결

요구사항:
1. 프로젝트 개요 및 기능
2. 하드웨어 요구사항
3. 소프트웨어 설치 방법
4. 설정 가이드
5. API 문서
6. FAQ 및 문제 해결

각 파일의 전체 내용을 다음 형식으로 작성:

===== 파일: README.md =====
(프로젝트 개요)
===== 파일 끝 =====

===== 파일: QUICKSTART.md =====
(빠른 시작 가이드)
===== 파일 끝 =====

===== 파일: API.md =====
(API 레퍼런스)
===== 파일 끝 =====

===== 파일: TROUBLESHOOTING.md =====
(문제 해결 가이드)
===== 파일 끝 =====`
  },
  89: {
    title: 'PCB 설계 기초',
    project: '회로도 및 PCB',
    files: ['README.md', 'schematic_notes.md', 'pcb_guidelines.md'],
    prompt: `[Day 89] ESP32 Arduino - PCB 설계 기초

프로젝트: 회로도 및 PCB

프로젝트 구조:
day89_pcb_design/
├── README.md            # PCB 설계 개요
├── schematic_notes.md   # 회로도 설계 노트
└── pcb_guidelines.md    # PCB 레이아웃 가이드

요구사항:
1. KiCad/EasyEDA 소개
2. ESP32 모듈 풋프린트
3. 전원 회로 설계
4. I2C/SPI 레이아웃
5. 안테나 고려사항
6. 제조 파일 생성

각 파일의 전체 내용을 다음 형식으로 작성:

===== 파일: README.md =====
(PCB 설계 개요)
===== 파일 끝 =====

===== 파일: schematic_notes.md =====
(회로도 설계 가이드)
===== 파일 끝 =====

===== 파일: pcb_guidelines.md =====
(PCB 레이아웃 가이드)
===== 파일 끝 =====`
  },
  90: {
    title: '과정 완료 및 다음 단계',
    project: '최종 리뷰',
    files: ['README.md', 'CERTIFICATE.md', 'NEXT_STEPS.md'],
    prompt: `[Day 90] ESP32 Arduino - 과정 완료 및 다음 단계

프로젝트: 최종 리뷰

프로젝트 구조:
day90_completion/
├── README.md            # 과정 요약
├── CERTIFICATE.md       # 수료 인증
└── NEXT_STEPS.md        # 다음 학습 경로

요구사항:
1. 90일 학습 내용 요약
2. 습득한 기술 목록
3. 포트폴리오 정리
4. 수료 인증 템플릿
5. 심화 학습 경로 안내
6. 커뮤니티 참여 안내

각 파일의 전체 내용을 다음 형식으로 작성:

===== 파일: README.md =====
(과정 요약 및 성과)
===== 파일 끝 =====

===== 파일: CERTIFICATE.md =====
(수료 인증 템플릿)
===== 파일 끝 =====

===== 파일: NEXT_STEPS.md =====
(다음 학습 경로)
===== 파일 끝 =====`
  }
};

export default advancedPromptsPart4;
