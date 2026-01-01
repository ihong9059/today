// 중급 과정 Part 2 (Day 26-35): LoRa 통신
export const intermediatePromptsPart2: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  26: {
    title: 'LoRa 모듈 기초',
    project: 'LoRa 초기화',
    files: ['main.ino', 'lora_driver.h', 'lora_driver.cpp', 'config.h', 'README.md'],
    prompt: `[Day 26] ESP32 Arduino - LoRa 모듈 기초

프로젝트: LoRa 초기화

프로젝트 구조:
day26_lora_init/
├── main.ino
├── lora_driver.h
├── lora_driver.cpp
├── config.h
└── README.md

요구사항:
1. UART2 핀 설정: TX=17, RX=16
2. Serial2.begin(9600, SERIAL_8N1, 16, 17)
3. M0(GPIO15), M1(GPIO4) 모드 핀 설정
4. AUX(GPIO34) 상태 읽기
5. 모드 설정: 일반(0,0), 절전(1,1) 등
6. 모듈 응답 확인

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: lora_driver.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_driver.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(LoRa 모듈 연결 및 설정 안내)
===== 파일 끝 =====`
  },
  27: {
    title: 'LoRa 파라미터 설정',
    project: 'LoRa 설정 프로그램',
    files: ['main.ino', 'lora_config.h', 'lora_config.cpp', 'README.md'],
    prompt: `[Day 27] ESP32 Arduino - LoRa 파라미터 설정

프로젝트: LoRa 설정 프로그램

프로젝트 구조:
day27_lora_config/
├── main.ino
├── lora_config.h
├── lora_config.cpp
└── README.md

요구사항:
1. E32/E220 LoRa 모듈 AT 명령어
2. 채널, 주소, 전력 설정
3. 시리얼 모니터에서 설정 변경
4. 현재 설정 읽기 및 표시
5. 설정 저장 및 확인
6. 공장 초기화 기능

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: lora_config.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_config.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(AT 명령어 목록 및 사용법)
===== 파일 끝 =====`
  },
  28: {
    title: 'LoRa 거리 테스트',
    project: 'LoRa 범위 측정',
    files: ['main.ino', 'lora_driver.h', 'lora_driver.cpp', 'oled_display.h', 'oled_display.cpp', 'README.md'],
    prompt: `[Day 28] ESP32 Arduino - LoRa 거리 테스트

프로젝트: LoRa 범위 측정

프로젝트 구조:
day28_lora_range/
├── main.ino
├── lora_driver.h
├── lora_driver.cpp
├── oled_display.h
├── oled_display.cpp
└── README.md

요구사항:
1. 1초 간격 패킷 전송 (TX 모드)
2. 패킷 수신 및 카운터 (RX 모드)
3. 패킷 손실률 계산
4. OLED에 통신 상태 표시
5. 시리얼에 상세 로그
6. LED로 수신 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: lora_driver.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_driver.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.h =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(테스트 방법)
===== 파일 끝 =====`
  },
  29: {
    title: 'LoRa 문자열 통신',
    project: '텍스트 메시지 송수신',
    files: ['main.ino', 'lora_comm.h', 'lora_comm.cpp', 'README.md'],
    prompt: `[Day 29] ESP32 Arduino - LoRa 문자열 통신

프로젝트: 텍스트 메시지 송수신

프로젝트 구조:
day29_lora_text/
├── main.ino
├── lora_comm.h
├── lora_comm.cpp
└── README.md

요구사항:
1. 시리얼 모니터에서 메시지 입력
2. 입력된 메시지 LoRa로 전송
3. 수신된 메시지 시리얼 출력
4. 버퍼 관리 및 오버플로 방지
5. 메시지 끝 구분자 처리
6. 부저로 수신 알림

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: lora_comm.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_comm.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(통신 테스트 방법)
===== 파일 끝 =====`
  },
  30: {
    title: 'LoRa 구조체 전송',
    project: '센서 데이터 패킷',
    files: ['main.ino', 'lora_packet.h', 'lora_packet.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 30] ESP32 Arduino - LoRa 구조체 전송

프로젝트: 센서 데이터 패킷

프로젝트 구조:
day30_lora_struct/
├── main.ino
├── lora_packet.h
├── lora_packet.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. 센서 데이터 구조체 정의
2. struct __attribute__((packed)) 사용
3. 바이트 배열로 변환하여 전송
4. 수신 측에서 구조체로 복원
5. CRC 또는 체크섬 검증
6. 패킷 시퀀스 번호

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: lora_packet.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_packet.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(패킷 구조 설명)
===== 파일 끝 =====`
  },
  31: {
    title: 'LoRa ACK 시스템',
    project: '신뢰성 있는 전송',
    files: ['main.ino', 'lora_reliable.h', 'lora_reliable.cpp', 'README.md'],
    prompt: `[Day 31] ESP32 Arduino - LoRa ACK 시스템

프로젝트: 신뢰성 있는 전송

프로젝트 구조:
day31_lora_ack/
├── main.ino
├── lora_reliable.h
├── lora_reliable.cpp
└── README.md

요구사항:
1. 데이터 전송 후 ACK 대기
2. 타임아웃 처리 (3초)
3. 최대 3회 재전송
4. ACK 패킷 구조 정의
5. 전송 성공/실패 LED 표시
6. 통계: 성공률, 재전송 횟수

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: lora_reliable.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_reliable.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(프로토콜 설명)
===== 파일 끝 =====`
  },
  32: {
    title: 'LoRa 센서 노드',
    project: '원격 센서 노드',
    files: ['main.ino', 'sensor_node.h', 'sensor_node.cpp', 'lora_driver.h', 'lora_driver.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 32] ESP32 Arduino - LoRa 센서 노드

프로젝트: 원격 센서 노드

프로젝트 구조:
day32_lora_node/
├── main.ino
├── sensor_node.h
├── sensor_node.cpp
├── lora_driver.h
├── lora_driver.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. 노드 ID 할당 (config.h에 정의)
2. 10분 간격 센서 데이터 전송
3. 수신 노드에서 OLED 표시
4. 버튼으로 즉시 전송 트리거
5. 배터리 절약: 딥슬립 사이 전송
6. LED로 전송 상태 표시

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: sensor_node.h =====
(코드)
===== 파일 끝 =====

===== 파일: sensor_node.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: lora_driver.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_driver.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(노드 구성 방법)
===== 파일 끝 =====`
  },
  33: {
    title: 'LoRa 게이트웨이',
    project: 'LoRa-WiFi 브릿지',
    files: ['main.ino', 'gateway.h', 'gateway.cpp', 'lora_driver.h', 'lora_driver.cpp', 'web_server.h', 'web_server.cpp', 'README.md'],
    prompt: `[Day 33] ESP32 Arduino - LoRa 게이트웨이

프로젝트: LoRa-WiFi 브릿지

프로젝트 구조:
day33_lora_gateway/
├── main.ino
├── gateway.h
├── gateway.cpp
├── lora_driver.h
├── lora_driver.cpp
├── web_server.h
├── web_server.cpp
└── README.md

요구사항:
1. LoRa 데이터 수신
2. WiFi 연결 및 웹서버 구동
3. 수신 데이터 웹페이지 표시
4. JSON API로 데이터 제공
5. 다중 노드 데이터 관리
6. 데이터 로깅 (시간, 노드ID, 값)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: gateway.h =====
(코드)
===== 파일 끝 =====

===== 파일: gateway.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: lora_driver.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_driver.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.h =====
(코드)
===== 파일 끝 =====

===== 파일: web_server.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(게이트웨이 설정 방법)
===== 파일 끝 =====`
  },
  34: {
    title: 'LoRa 브로드캐스트',
    project: '일대다 통신',
    files: ['main.ino', 'lora_broadcast.h', 'lora_broadcast.cpp', 'README.md'],
    prompt: `[Day 34] ESP32 Arduino - LoRa 브로드캐스트

프로젝트: 일대다 통신

프로젝트 구조:
day34_lora_broadcast/
├── main.ino
├── lora_broadcast.h
├── lora_broadcast.cpp
└── README.md

요구사항:
1. 브로드캐스트 주소 설정 (0xFFFF)
2. 마스터-슬레이브 구조
3. 마스터: 명령 브로드캐스트
4. 슬레이브: 명령 수신 및 실행
5. LED 제어 명령 예시
6. 노드별 응답 처리

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: lora_broadcast.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_broadcast.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(브로드캐스트 테스트 방법)
===== 파일 끝 =====`
  },
  35: {
    title: 'LoRa 중계기',
    project: '메시 네트워크 기초',
    files: ['main.ino', 'lora_mesh.h', 'lora_mesh.cpp', 'README.md'],
    prompt: `[Day 35] ESP32 Arduino - LoRa 중계기

프로젝트: 메시 네트워크 기초

프로젝트 구조:
day35_lora_mesh/
├── main.ino
├── lora_mesh.h
├── lora_mesh.cpp
└── README.md

요구사항:
1. 패킷 TTL(Time To Live) 구현
2. 수신 패킷 조건부 재전송
3. 중복 패킷 필터링 (패킷 ID)
4. 홉 카운트 추적
5. 라우팅 테이블 기초
6. 통신 범위 확장 테스트

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: lora_mesh.h =====
(코드)
===== 파일 끝 =====

===== 파일: lora_mesh.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(메시 네트워크 구성 방법)
===== 파일 끝 =====`
  }
};

export default intermediatePromptsPart2;
