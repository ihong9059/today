// 고급 과정 Part 3 (Day 66-75): 저전력과 최적화
export const advancedPromptsPart3: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  66: {
    title: '딥슬립 기초',
    project: '저전력 모드',
    files: ['main.ino', 'sleep_manager.h', 'sleep_manager.cpp', 'README.md'],
    prompt: `[Day 66] ESP32 Arduino - 딥슬립 기초

프로젝트: 저전력 모드

프로젝트 구조:
day66_deep_sleep/
├── main.ino
├── sleep_manager.h
├── sleep_manager.cpp
└── README.md

요구사항:
1. esp_deep_sleep_start() 사용
2. esp_sleep_enable_timer_wakeup() 타이머 깨우기
3. 10초 슬립 후 깨어나기
4. RTC 메모리로 데이터 유지
5. 슬립 전 LED 끄기
6. 깨어난 원인 확인

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: sleep_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: sleep_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(전력 소비 비교)
===== 파일 끝 =====`
  },
  67: {
    title: '외부 인터럽트 깨우기',
    project: '버튼으로 슬립 해제',
    files: ['main.ino', 'ext_wakeup.h', 'ext_wakeup.cpp', 'README.md'],
    prompt: `[Day 67] ESP32 Arduino - 외부 인터럽트 깨우기

프로젝트: 버튼으로 슬립 해제

프로젝트 구조:
day67_ext_wakeup/
├── main.ino
├── ext_wakeup.h
├── ext_wakeup.cpp
└── README.md

요구사항:
1. esp_sleep_enable_ext0_wakeup() 사용
2. GPIO32 버튼으로 깨우기
3. 웨이크업 핀 레벨 설정 (LOW)
4. 깨어난 후 LED 깜빡임
5. 10초 후 다시 슬립
6. 웨이크업 원인 로깅

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: ext_wakeup.h =====
(코드)
===== 파일 끝 =====

===== 파일: ext_wakeup.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(웨이크업 소스 종류)
===== 파일 끝 =====`
  },
  68: {
    title: '저전력 센서 노드',
    project: '배터리 구동 센서',
    files: ['main.ino', 'battery_node.h', 'battery_node.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 68] ESP32 Arduino - 저전력 센서 노드

프로젝트: 배터리 구동 센서

프로젝트 구조:
day68_battery_node/
├── main.ino
├── battery_node.h
├── battery_node.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. 깨어나기 → 센서 읽기 → 전송 → 슬립 사이클
2. 10분 간격 전송
3. WiFi 빠른 연결 (BSSID 저장)
4. ADC로 배터리 전압 읽기
5. 저전압 경고
6. 예상 배터리 수명 계산

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: battery_node.h =====
(코드)
===== 파일 끝 =====

===== 파일: battery_node.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(배터리 최적화 팁)
===== 파일 끝 =====`
  },
  69: {
    title: 'FreeRTOS 태스크',
    project: '멀티태스킹',
    files: ['main.ino', 'task_manager.h', 'task_manager.cpp', 'README.md'],
    prompt: `[Day 69] ESP32 Arduino - FreeRTOS 태스크

프로젝트: 멀티태스킹

프로젝트 구조:
day69_freertos_task/
├── main.ino
├── task_manager.h
├── task_manager.cpp
└── README.md

요구사항:
1. xTaskCreate() 태스크 생성
2. LED 깜빡임 태스크
3. 센서 읽기 태스크
4. vTaskDelay() 사용
5. 태스크 우선순위 설정
6. 태스크 삭제 및 일시정지

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: task_manager.h =====
(코드)
===== 파일 끝 =====

===== 파일: task_manager.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(FreeRTOS 기초)
===== 파일 끝 =====`
  },
  70: {
    title: '세마포어와 뮤텍스',
    project: '리소스 동기화',
    files: ['main.ino', 'sync_utils.h', 'sync_utils.cpp', 'README.md'],
    prompt: `[Day 70] ESP32 Arduino - 세마포어와 뮤텍스

프로젝트: 리소스 동기화

프로젝트 구조:
day70_semaphore/
├── main.ino
├── sync_utils.h
├── sync_utils.cpp
└── README.md

요구사항:
1. xSemaphoreCreateMutex() 뮤텍스 생성
2. xSemaphoreTake(), xSemaphoreGive()
3. 시리얼 출력 동기화
4. I2C 접근 동기화
5. 바이너리 세마포어 이벤트 알림
6. 데드락 방지

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: sync_utils.h =====
(코드)
===== 파일 끝 =====

===== 파일: sync_utils.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(세마포어 vs 뮤텍스)
===== 파일 끝 =====`
  },
  71: {
    title: 'FreeRTOS 큐',
    project: '태스크 간 통신',
    files: ['main.ino', 'queue_comm.h', 'queue_comm.cpp', 'README.md'],
    prompt: `[Day 71] ESP32 Arduino - FreeRTOS 큐

프로젝트: 태스크 간 통신

프로젝트 구조:
day71_queue/
├── main.ino
├── queue_comm.h
├── queue_comm.cpp
└── README.md

요구사항:
1. xQueueCreate() 큐 생성
2. xQueueSend(), xQueueReceive()
3. 센서 태스크 → 표시 태스크 데이터 전달
4. 큐 오버플로 처리
5. 구조체 데이터 전달
6. 타임아웃 설정

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: queue_comm.h =====
(코드)
===== 파일 끝 =====

===== 파일: queue_comm.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(큐 사용 패턴)
===== 파일 끝 =====`
  },
  72: {
    title: 'FreeRTOS 타이머',
    project: '소프트웨어 타이머',
    files: ['main.ino', 'sw_timer.h', 'sw_timer.cpp', 'README.md'],
    prompt: `[Day 72] ESP32 Arduino - FreeRTOS 타이머

프로젝트: 소프트웨어 타이머

프로젝트 구조:
day72_timer/
├── main.ino
├── sw_timer.h
├── sw_timer.cpp
└── README.md

요구사항:
1. xTimerCreate() 타이머 생성
2. 주기적 타이머 vs 원샷 타이머
3. xTimerStart(), xTimerStop()
4. 타이머 콜백에서 LED 토글
5. 타이머 주기 동적 변경
6. 여러 타이머 관리

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: sw_timer.h =====
(코드)
===== 파일 끝 =====

===== 파일: sw_timer.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(타이머 vs delay 비교)
===== 파일 끝 =====`
  },
  73: {
    title: '멀티코어 기초',
    project: '듀얼 코어 활용',
    files: ['main.ino', 'dual_core.h', 'dual_core.cpp', 'README.md'],
    prompt: `[Day 73] ESP32 Arduino - 멀티코어 기초

프로젝트: 듀얼 코어 활용

프로젝트 구조:
day73_dual_core/
├── main.ino
├── dual_core.h
├── dual_core.cpp
└── README.md

요구사항:
1. xTaskCreatePinnedToCore() 사용
2. Core 0: WiFi/네트워크 처리
3. Core 1: 센서/UI 처리
4. 코어 간 데이터 공유 (큐)
5. 각 코어 상태 모니터링
6. 코어별 스택 사용량 확인

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: dual_core.h =====
(코드)
===== 파일 끝 =====

===== 파일: dual_core.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(ESP32 듀얼코어 아키텍처)
===== 파일 끝 =====`
  },
  74: {
    title: '성능 최적화',
    project: '시스템 모니터링',
    files: ['main.ino', 'perf_monitor.h', 'perf_monitor.cpp', 'README.md'],
    prompt: `[Day 74] ESP32 Arduino - 성능 최적화

프로젝트: 시스템 모니터링

프로젝트 구조:
day74_performance/
├── main.ino
├── perf_monitor.h
├── perf_monitor.cpp
└── README.md

요구사항:
1. ESP.getFreeHeap() 메모리 모니터링
2. uxTaskGetStackHighWaterMark() 스택 사용량
3. CPU 사용률 추정
4. 웹페이지에 시스템 상태 표시
5. 메모리 누수 감지
6. 최적화 팁 적용

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: perf_monitor.h =====
(코드)
===== 파일 끝 =====

===== 파일: perf_monitor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(성능 최적화 체크리스트)
===== 파일 끝 =====`
  },
  75: {
    title: '워치독 타이머',
    project: '시스템 안정성',
    files: ['main.ino', 'watchdog.h', 'watchdog.cpp', 'README.md'],
    prompt: `[Day 75] ESP32 Arduino - 워치독 타이머

프로젝트: 시스템 안정성

프로젝트 구조:
day75_watchdog/
├── main.ino
├── watchdog.h
├── watchdog.cpp
└── README.md

요구사항:
1. esp_task_wdt_init() 초기화
2. esp_task_wdt_add() 태스크 등록
3. esp_task_wdt_reset() 주기적 피드
4. 타임아웃 시 자동 재부팅
5. 재부팅 원인 로깅
6. 안전 모드 진입 (선택)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: watchdog.h =====
(코드)
===== 파일 끝 =====

===== 파일: watchdog.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(워치독 설정 가이드)
===== 파일 끝 =====`
  }
};

export default advancedPromptsPart3;
