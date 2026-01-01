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

📚 문법 설명 (코드 내 주석으로 포함):
- esp_deep_sleep_start(): 딥슬립 모드 진입 (전류 10µA 이하)
- esp_sleep_enable_timer_wakeup(마이크로초): 타이머 웨이크업 설정
- 1000000 = 1초: 마이크로초 단위 (uS)
- RTC_DATA_ATTR 변수명: 딥슬립 중에도 유지되는 RTC 메모리 변수
- esp_sleep_get_wakeup_cause(): 깨어난 원인 반환
- ESP_SLEEP_WAKEUP_TIMER: 타이머에 의해 깨어남
- 딥슬립: CPU/WiFi 끔, RTC만 동작하는 최저 전력 모드
- esp_reset_reason(): 리셋 원인 확인 (깨어남 vs 전원 리셋)

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

📚 문법 설명 (코드 내 주석으로 포함):
- esp_sleep_enable_ext0_wakeup(핀, 레벨): 외부 인터럽트 웨이크업 설정
- GPIO_NUM_32: RTC GPIO (딥슬립 중 사용 가능한 핀)
- 0 또는 1: 웨이크업 트리거 레벨 (LOW/HIGH)
- ESP_SLEEP_WAKEUP_EXT0: 외부 인터럽트에 의해 깨어남
- esp_sleep_enable_ext1_wakeup(마스크, 모드): 다중 핀 웨이크업
- RTC GPIO: GPIO32-39만 딥슬립에서 사용 가능
- gpio_pullup_en(핀): 내부 풀업 활성화
- gpio_pulldown_dis(핀): 내부 풀다운 비활성화

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

📚 문법 설명 (코드 내 주석으로 포함):
- WiFi.config(ip, gateway, subnet): 고정 IP로 연결 속도 향상
- WiFi.begin(ssid, pass, channel, bssid): 채널/BSSID 지정으로 빠른 연결
- analogRead(핀): ADC로 전압 읽기 (0-4095)
- (값 / 4095.0) * 3.3: ADC 값을 전압으로 변환
- 전압분배: R1, R2 저항으로 배터리 전압을 측정 가능 범위로 낮춤
- 18650 배터리: 3.0V(방전) ~ 4.2V(만충) 리튬이온 배터리
- 슬립 사이클 시간 = 활성시간 + 슬립시간
- 배터리 수명 = 용량(mAh) / 평균전류(mA)

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

📚 문법 설명 (코드 내 주석으로 포함):
- xTaskCreate(함수, "이름", 스택크기, 파라미터, 우선순위, &핸들): 태스크 생성
- void 태스크함수(void* parameter): 태스크 함수 시그니처
- for(;;) { ... }: 태스크 무한 루프 (while(1)과 동일)
- vTaskDelay(pdMS_TO_TICKS(ms)): 밀리초 단위 블로킹 대기
- pdMS_TO_TICKS(ms): 밀리초를 FreeRTOS 틱으로 변환
- TaskHandle_t handle: 태스크 핸들 (제어용)
- vTaskDelete(handle): 태스크 삭제 (NULL=자기자신)
- vTaskSuspend(handle): 태스크 일시정지
- vTaskResume(handle): 태스크 재개
- FreeRTOS: ESP32에 내장된 실시간 운영체제

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

📚 문법 설명 (코드 내 주석으로 포함):
- SemaphoreHandle_t mutex: 세마포어/뮤텍스 핸들 타입
- xSemaphoreCreateMutex(): 뮤텍스 생성 (상호배제용)
- xSemaphoreCreateBinary(): 바이너리 세마포어 생성 (신호용)
- xSemaphoreTake(핸들, 타임아웃): 세마포어 획득 (대기)
- xSemaphoreGive(핸들): 세마포어 반환
- portMAX_DELAY: 무한 대기
- 뮤텍스: 공유 리소스 접근 제어 (한 번에 한 태스크만)
- 세마포어: 태스크 간 신호 전달
- 데드락: 서로 다른 리소스를 기다리며 영원히 대기하는 상태

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

📚 문법 설명 (코드 내 주석으로 포함):
- QueueHandle_t queue: 큐 핸들 타입
- xQueueCreate(개수, 항목크기): 큐 생성
- xQueueSend(큐, &데이터, 타임아웃): 큐에 데이터 넣기 (뒤에)
- xQueueReceive(큐, &버퍼, 타임아웃): 큐에서 데이터 빼기 (앞에서)
- xQueueSendToFront(큐, &데이터, 타임아웃): 큐 앞에 넣기 (긴급용)
- uxQueueMessagesWaiting(큐): 큐에 대기 중인 항목 수
- errQUEUE_FULL: 큐가 가득 찬 경우 반환
- pdTRUE/pdFALSE: 성공/실패 반환값
- FIFO: First-In-First-Out (먼저 넣은 것 먼저 꺼냄)

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

📚 문법 설명 (코드 내 주석으로 포함):
- TimerHandle_t timer: 타이머 핸들 타입
- xTimerCreate("이름", 주기틱, 자동리로드, ID, 콜백): 타이머 생성
- pdTRUE: 주기적 타이머 (자동 반복)
- pdFALSE: 원샷 타이머 (한 번만 실행)
- xTimerStart(핸들, 타임아웃): 타이머 시작
- xTimerStop(핸들, 타임아웃): 타이머 정지
- xTimerChangePeriod(핸들, 새주기, 타임아웃): 주기 변경
- void 콜백(TimerHandle_t xTimer): 타이머 콜백 시그니처
- 소프트웨어 타이머: CPU 블로킹 없이 주기적 작업 실행

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

📚 문법 설명 (코드 내 주석으로 포함):
- xTaskCreatePinnedToCore(..., 코어번호): 특정 코어에 태스크 고정
- 0 또는 1: ESP32 코어 번호 (듀얼코어)
- xPortGetCoreID(): 현재 태스크 실행 중인 코어 번호 반환
- Core 0: Protocol CPU (WiFi/BLE 처리 담당)
- Core 1: Application CPU (사용자 코드 기본 실행)
- tskNO_AFFINITY: 코어 지정 안함 (자동 할당)
- uxTaskGetStackHighWaterMark(handle): 스택 최소 여유 공간
- vTaskList(버퍼): 모든 태스크 상태 문자열로 출력

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

📚 문법 설명 (코드 내 주석으로 포함):
- ESP.getFreeHeap(): 사용 가능한 힙 메모리 (바이트)
- ESP.getMinFreeHeap(): 런타임 중 최소 힙 크기
- ESP.getHeapSize(): 전체 힙 크기
- ESP.getFreePsram(): 사용 가능한 PSRAM (있는 경우)
- ESP.getCpuFreqMHz(): CPU 주파수 (MHz)
- ESP.getChipRevision(): 칩 리비전 번호
- ESP.getFlashChipSize(): 플래시 크기
- 메모리 누수: getFreeHeap()이 계속 감소하면 누수 의심
- 스택 오버플로: HighWaterMark가 0에 가까우면 위험

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

📚 문법 설명 (코드 내 주석으로 포함):
- #include <esp_task_wdt.h>: 워치독 타이머 라이브러리
- esp_task_wdt_init(타임아웃초, true): 워치독 초기화 (true=패닉 시 리셋)
- esp_task_wdt_add(NULL): 현재 태스크를 워치독에 등록
- esp_task_wdt_reset(): 워치독 피드 (타임아웃 리셋)
- esp_task_wdt_delete(NULL): 현재 태스크를 워치독에서 제거
- esp_reset_reason(): 리셋 원인 확인
- ESP_RST_TASK_WDT: 워치독 타임아웃에 의한 리셋
- 워치독: 시스템 무한루프/멈춤 시 자동 복구용 타이머
- 피드(Feed): 워치독에게 "정상 동작 중" 신호 전달

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
