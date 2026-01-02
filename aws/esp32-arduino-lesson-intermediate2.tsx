// 중급 과정 Part 2 (Day 31-45): 인터럽트와 고급 센서
// esp32-arduino-lesson-day-page.tsx에서 import해서 사용

export const intermediateDataPart2: Record<number, any> = {
  // ============================================
  // Day 31: 인터럽트 기초
  // ============================================
  31: {
    day: 31,
    title: '인터럽트 기초',
    subtitle: '하드웨어 인터럽트로 즉각적인 반응을 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '인터럽트 개념 이해',
        description: '인터럽트의 원리와 폴링과의 차이를 학습합니다.',
        prompt: `하드웨어 인터럽트에 대해 설명해줘.

설명해야 할 내용:
1. 인터럽트란 무엇인지 (이벤트 발생 시 즉시 처리)
2. 폴링(Polling)과 인터럽트의 차이
3. 인터럽트의 장점 (빠른 반응, CPU 효율)
4. 인터럽트 트리거 종류 (RISING, FALLING, CHANGE)
5. ISR(Interrupt Service Routine)의 역할

📚 문법 설명:
- RISING: 신호가 LOW→HIGH로 변할 때
- FALLING: 신호가 HIGH→LOW로 변할 때
- CHANGE: 신호가 변할 때마다
- ISR: 인터럽트 발생 시 실행되는 함수

폴링과 인터럽트를 비교하는 그림(텍스트)을 보여줘.`,
        expectedKeywords: ['인터럽트', 'ISR', 'RISING', 'FALLING'],
        quiz: {
          question: '버튼을 눌렀을 때(HIGH→LOW) 트리거되는 인터럽트는?',
          options: ['RISING', 'FALLING', 'HIGH', 'LOW'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '버튼 인터럽트 구현',
        description: 'attachInterrupt()로 버튼 인터럽트를 구현합니다.',
        prompt: `ESP32에서 버튼 인터럽트를 구현하는 코드를 작성해줘.

요구사항:
1. 버튼 핀에 인터럽트 연결 (GPIO 32)
2. FALLING 트리거 (버튼 누름 감지)
3. 인터럽트 발생 시 LED 토글
4. 디바운싱 처리 (millis() 사용)
5. 시리얼에 인터럽트 발생 횟수 출력
6. OLED에 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- attachInterrupt(pin, ISR, mode): 인터럽트 등록
- digitalPinToInterrupt(pin): GPIO를 인터럽트 번호로 변환
- void IRAM_ATTR isr_function(): ISR 함수 (IRAM에 배치)
- volatile 변수: ISR과 메인 코드 간 공유 변수에 사용
- 디바운싱: 연속 인터럽트 방지 (시간 체크)

핀: 버튼(32), LED(25), I2C(21,22)`,
        expectedKeywords: ['attachInterrupt', 'IRAM_ATTR', 'volatile', '디바운싱'],
        quiz: {
          question: 'ISR 함수 앞에 붙이는 매크로는?',
          options: ['INTERRUPT', 'ISR_ATTR', 'IRAM_ATTR', 'FAST_ISR'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '다중 인터럽트 처리',
        description: '여러 개의 인터럽트를 동시에 처리합니다.',
        prompt: `ESP32에서 여러 버튼의 인터럽트를 처리하는 코드를 작성해줘.

요구사항:
1. 3개 버튼 각각에 인터럽트 연결
2. 각 버튼이 해당 색상 LED 토글 (빨강/노랑/파랑)
3. 마지막 누른 버튼 정보 OLED에 표시
4. 모든 버튼 동시 3초 누르면 리셋
5. 각 LED의 토글 횟수 카운트

📚 문법 설명 (코드 내 주석으로 포함):
- 여러 ISR 함수 정의
- 공통 로직을 위한 플래그 변수
- 인터럽트 우선순위 (ESP32 기본 동일)
- detachInterrupt(): 인터럽트 해제

핀: 버튼(32,33,34), LED(25,26,27), I2C(21,22)`,
        expectedKeywords: ['다중', 'detachInterrupt', '플래그', '우선순위'],
        quiz: {
          question: '인터럽트를 해제하는 함수는?',
          options: ['removeInterrupt()', 'detachInterrupt()', 'clearInterrupt()', 'disableInterrupt()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 32, title: '타이머 인터럽트' },
  },

  // ============================================
  // Day 32: 타이머 인터럽트
  // ============================================
  32: {
    day: 32,
    title: '타이머 인터럽트',
    subtitle: 'ESP32 하드웨어 타이머로 정밀한 주기 작업을 실행합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '타이머 인터럽트 이해',
        description: '하드웨어 타이머의 원리와 활용을 학습합니다.',
        prompt: `ESP32의 하드웨어 타이머에 대해 설명해줘.

설명해야 할 내용:
1. 하드웨어 타이머란 (CPU와 독립적으로 동작)
2. millis()와 하드웨어 타이머의 차이
3. ESP32의 4개 하드웨어 타이머 (Timer 0~3)
4. 타이머 인터럽트 활용 (정밀한 주기 실행)
5. 프리스케일러(Prescaler)의 역할

📚 문법 설명:
- 프리스케일러: 클럭을 분주하여 타이머 속도 조절
- 80MHz / 80 = 1MHz (1마이크로초 단위)
- 알람: 특정 카운트 도달 시 인터럽트 발생

타이머 구조를 그림(텍스트)으로 설명해줘.`,
        expectedKeywords: ['타이머', '프리스케일러', '알람', '하드웨어'],
        quiz: {
          question: 'ESP32에는 하드웨어 타이머가 몇 개 있나요?',
          options: ['1개', '2개', '4개', '8개'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '주기적 인터럽트 구현',
        description: '타이머로 정확한 간격의 인터럽트를 발생시킵니다.',
        prompt: `ESP32에서 타이머 인터럽트로 주기적 작업을 실행하는 코드를 작성해줘.

요구사항:
1. Timer 0 사용
2. 1ms마다 인터럽트 발생
3. 인터럽트에서 카운터 증가
4. 1000ms마다 LED 토글 (카운터 기반)
5. 시리얼에 경과 시간 출력
6. OLED에 타이머 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- hw_timer_t *timer = NULL: 타이머 핸들
- timerBegin(num, divider, countUp): 타이머 초기화
- timerAttachInterrupt(timer, isr, edge): ISR 연결
- timerAlarmWrite(timer, value, autoreload): 알람 설정
- timerAlarmEnable(timer): 알람 활성화

핀: LED(25), I2C(21,22)`,
        expectedKeywords: ['timerBegin', 'timerAttachInterrupt', 'timerAlarmWrite'],
        quiz: {
          question: '타이머 알람을 활성화하는 함수는?',
          options: ['timerStart()', 'timerAlarmEnable()', 'timerEnable()', 'timerRun()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '정밀 PWM 제어',
        description: '타이머 인터럽트로 소프트웨어 PWM을 구현합니다.',
        prompt: `ESP32에서 타이머 인터럽트로 소프트웨어 PWM을 구현하는 코드를 작성해줘.

요구사항:
1. 타이머로 100μs마다 인터럽트
2. PWM 주파수: 100Hz (10ms 주기)
3. 듀티 사이클 변수로 조절 (0~100%)
4. 버튼으로 듀티 사이클 변경 (+10%씩)
5. LED 밝기 조절
6. OLED에 현재 듀티 사이클 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 소프트웨어 PWM: 타이머로 직접 HIGH/LOW 제어
- 카운터와 듀티 비교로 출력 결정
- ISR 내에서 digitalWrite (가능하면 포트 직접 제어)

핀: LED(25), 버튼(32), I2C(21,22)`,
        expectedKeywords: ['소프트웨어 PWM', '듀티 사이클', '100μs', 'digitalWrite'],
        quiz: {
          question: '100Hz PWM의 주기는?',
          options: ['1ms', '10ms', '100ms', '1초'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 33, title: '아날로그 센서 심화' },
  },

  // ============================================
  // Day 33: 아날로그 센서 심화
  // ============================================
  33: {
    day: 33,
    title: '아날로그 센서 심화',
    subtitle: 'ESP32의 ADC를 깊이 이해하고 정확한 측정을 수행합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'ESP32 ADC 특성 이해',
        description: 'ESP32 ADC의 특성과 한계를 학습합니다.',
        prompt: `ESP32의 ADC(Analog-to-Digital Converter)에 대해 설명해줘.

설명해야 할 내용:
1. ADC란 무엇인지 (아날로그→디지털 변환)
2. ESP32 ADC 사양 (12비트, 0~4095)
3. ADC1과 ADC2의 차이 (WiFi 사용 시 ADC2 제한)
4. ADC 비선형성 문제와 보정
5. 감쇠(Attenuation) 설정

📚 문법 설명:
- 12비트 분해능: 0~4095 (2^12)
- ADC1: GPIO 32~39 (WiFi와 독립)
- ADC2: GPIO 0~27 일부 (WiFi 사용 시 문제)
- 감쇠: 입력 전압 범위 조절

ADC 비선형성 그래프(텍스트)를 보여줘.`,
        expectedKeywords: ['ADC', '12비트', 'ADC1', 'ADC2', '감쇠'],
        quiz: {
          question: 'WiFi 사용 중에도 안전하게 쓸 수 있는 ADC는?',
          options: ['ADC1', 'ADC2', '둘 다 가능', '둘 다 불가'],
          correctAnswer: 0,
        },
      },
      {
        id: 2,
        title: '센서 값 보정',
        description: '센서 값을 보정하여 정확도를 높입니다.',
        prompt: `ESP32에서 ADC 값을 보정하는 코드를 작성해줘.

요구사항:
1. 조도 센서 (CDS) 읽기
2. 여러 번 읽어서 평균값 계산 (10회)
3. 이동 평균 필터 적용
4. 룩업 테이블로 전압 보정
5. 보정된 조도 값(lux) 계산
6. OLED에 원시값과 보정값 모두 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 다중 샘플링: 여러 번 읽어 평균으로 노이즈 감소
- 이동 평균: 최근 N개 값의 평균 (배열 사용)
- 룩업 테이블: 입력값→보정값 매핑 배열
- map() 함수: 값 범위 변환

핀: 조도센서(ADC1 - GPIO34), I2C(21,22)`,
        expectedKeywords: ['평균', '이동 평균', '룩업 테이블', 'map'],
        quiz: {
          question: '노이즈를 줄이기 위해 사용하는 필터는?',
          options: ['하이패스 필터', '이동 평균 필터', '밴드패스 필터', '노치 필터'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '다중 센서 데이터 수집',
        description: '여러 아날로그 센서를 효율적으로 읽습니다.',
        prompt: `ESP32에서 여러 아날로그 센서를 읽는 코드를 작성해줘.

요구사항:
1. 조도 센서 (GPIO 34)
2. 온도 센서 (GPIO 35) - NTC 서미스터
3. 가변저항 (GPIO 36)
4. 각 센서 100ms 간격으로 순차 읽기
5. 모든 값을 JSON으로 구성
6. OLED에 3개 센서 값 실시간 표시

📚 문법 설명 (코드 내 주석으로 포함):
- analogSetAttenuation(ADC_11db): 전체 ADC 감쇠 설정
- analogRead(pin): ADC 값 읽기
- NTC 온도 계산: 스타인하트-하트 방정식
- 구조체로 센서 데이터 관리

핀: 조도(34), 온도(35), 가변저항(36), I2C(21,22)`,
        expectedKeywords: ['다중 센서', 'analogRead', 'NTC', '구조체'],
        quiz: {
          question: 'NTC 서미스터는 온도가 올라가면?',
          options: ['저항 증가', '저항 감소', '변화 없음', '끊어짐'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 34, title: 'I2C 통신 심화' },
  },

  // ============================================
  // Day 34: I2C 통신 심화
  // ============================================
  34: {
    day: 34,
    title: 'I2C 통신 심화',
    subtitle: 'I2C 버스에 여러 장치를 연결하고 통신합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'I2C 버스 이해',
        description: 'I2C 통신 프로토콜을 깊이 이해합니다.',
        prompt: `I2C 통신 프로토콜에 대해 자세히 설명해줘.

설명해야 할 내용:
1. I2C 버스 구조 (SDA, SCL, 풀업 저항)
2. 마스터/슬레이브 개념
3. 7비트 주소 체계 (최대 128개 장치)
4. 통신 순서 (Start, 주소, R/W, 데이터, Stop)
5. ACK/NACK의 역할
6. 클럭 스트레칭

📚 문법 설명:
- SDA: 데이터 라인
- SCL: 클럭 라인
- 풀업 저항: I2C 버스에 필수 (보통 4.7kΩ)
- ACK: 수신 확인 (Acknowledge)

I2C 타이밍 다이어그램(텍스트)을 보여줘.`,
        expectedKeywords: ['I2C', 'SDA', 'SCL', 'ACK', '주소'],
        quiz: {
          question: 'I2C 7비트 주소로 연결 가능한 최대 장치 수는?',
          options: ['64개', '128개', '256개', '512개'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'I2C 스캐너',
        description: 'I2C 버스에 연결된 장치들을 검색합니다.',
        prompt: `ESP32에서 I2C 장치를 스캔하는 코드를 작성해줘.

요구사항:
1. 모든 I2C 주소 (0x01~0x7F) 스캔
2. 응답하는 장치의 주소 출력
3. 일반적인 장치 주소 자동 인식 (OLED, AHT20 등)
4. 스캔 결과를 OLED에 표시
5. 5초마다 자동 재스캔
6. 새 장치 연결/해제 감지

📚 문법 설명 (코드 내 주석으로 포함):
- Wire.beginTransmission(address): 전송 시작
- Wire.endTransmission(): 전송 종료, 결과 반환
- 반환값 0: 장치 응답 (ACK)
- 반환값 2: 주소 NACK (장치 없음)
- 알려진 장치 목록 배열

핀: I2C(21,22)`,
        expectedKeywords: ['스캐너', 'beginTransmission', 'endTransmission', 'ACK'],
        quiz: {
          question: 'Wire.endTransmission()이 0을 반환하면?',
          options: ['에러 발생', '장치가 응답함', '장치 없음', '버스 충돌'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '다중 I2C 장치 통신',
        description: '여러 I2C 장치와 동시에 통신합니다.',
        prompt: `ESP32에서 여러 I2C 장치와 통신하는 코드를 작성해줘.

요구사항:
1. OLED (0x3C) - 데이터 표시
2. AHT20 (0x38) - 온습도 센서
3. BH1750 (0x23) - 조도 센서 (또는 다른 I2C 센서)
4. 2초마다 모든 센서 읽기
5. OLED에 모든 센서 값 표시
6. 장치 연결 상태 모니터링

📚 문법 설명 (코드 내 주석으로 포함):
- 각 장치마다 라이브러리 또는 직접 통신
- Wire.requestFrom(address, bytes): 데이터 요청
- Wire.read(): 1바이트 읽기
- 장치별 프로토콜에 맞게 데이터 처리

핀: I2C(21,22)`,
        expectedKeywords: ['다중 장치', 'requestFrom', 'Wire.read', '프로토콜'],
        quiz: {
          question: 'I2C에서 데이터를 요청하는 함수는?',
          options: ['Wire.get()', 'Wire.requestFrom()', 'Wire.receive()', 'Wire.fetch()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 35, title: 'SPI 통신' },
  },

  // ============================================
  // Day 35: SPI 통신
  // ============================================
  35: {
    day: 35,
    title: 'SPI 통신',
    subtitle: '고속 SPI 통신으로 디스플레이와 메모리를 제어합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'SPI 프로토콜 이해',
        description: 'SPI 통신의 원리와 I2C와의 차이를 학습합니다.',
        prompt: `SPI 통신 프로토콜에 대해 설명해줘.

설명해야 할 내용:
1. SPI 버스 구조 (MOSI, MISO, SCK, CS)
2. 마스터/슬레이브 통신
3. 전이중(Full-Duplex) 통신
4. SPI 모드 (CPOL, CPHA)
5. SPI vs I2C 비교 (속도, 핀 수, 거리)

📚 문법 설명:
- MOSI: Master Out Slave In (마스터→슬레이브)
- MISO: Master In Slave Out (슬레이브→마스터)
- SCK: Serial Clock (클럭)
- CS/SS: Chip Select (장치 선택)
- 속도: 최대 수십 MHz (I2C보다 훨씬 빠름)

SPI 연결도(텍스트)를 그려줘.`,
        expectedKeywords: ['SPI', 'MOSI', 'MISO', 'SCK', 'CS'],
        quiz: {
          question: 'SPI에서 마스터가 데이터를 보내는 핀은?',
          options: ['MISO', 'MOSI', 'SCK', 'CS'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'SPI 디스플레이 제어',
        description: 'SPI TFT 디스플레이를 제어합니다.',
        prompt: `ESP32에서 SPI TFT 디스플레이를 제어하는 코드를 작성해줘.

요구사항:
1. TFT_eSPI 라이브러리 사용
2. 배경색 채우기
3. 텍스트 출력 (다양한 크기, 색상)
4. 도형 그리기 (사각형, 원, 선)
5. 센서 데이터 그래프 표시
6. 화면 갱신 최적화

📚 문법 설명 (코드 내 주석으로 포함):
- #include <TFT_eSPI.h>: TFT 라이브러리
- TFT_eSPI tft = TFT_eSPI(): TFT 객체 생성
- tft.init(): 디스플레이 초기화
- tft.fillScreen(color): 화면 채우기
- tft.drawString(text, x, y): 텍스트 출력
- tft.drawRect(), tft.fillCircle(): 도형 그리기

핀: SPI (기본 VSPI), CS, DC, RST`,
        expectedKeywords: ['TFT_eSPI', 'fillScreen', 'drawString', 'drawRect'],
        quiz: {
          question: 'SPI TFT에서 화면을 지우는 함수는?',
          options: ['tft.clear()', 'tft.fillScreen()', 'tft.erase()', 'tft.reset()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'SD 카드 데이터 저장',
        description: 'SPI SD 카드에 데이터를 저장합니다.',
        prompt: `ESP32에서 SD 카드에 데이터를 저장하는 코드를 작성해줘.

요구사항:
1. SD 카드 초기화
2. 파일 생성 및 쓰기
3. 센서 데이터 CSV 형식으로 저장
4. 10초마다 데이터 추가
5. 파일 읽기 및 시리얼 출력
6. SD 카드 용량 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <SD.h>: SD 카드 라이브러리
- SD.begin(CS_PIN): SD 카드 초기화
- File file = SD.open(path, mode): 파일 열기
- file.println(data): 파일에 쓰기
- file.close(): 파일 닫기 (필수!)
- SD.totalBytes(), SD.usedBytes(): 용량 확인

핀: SD_CS(5), SPI 기본 핀`,
        expectedKeywords: ['SD', 'SD.begin', 'SD.open', 'file.println'],
        quiz: {
          question: 'SD 카드에 파일을 쓴 후 반드시 해야 할 것은?',
          options: ['file.save()', 'file.close()', 'file.flush()', 'file.end()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 36, title: 'UART 통신' },
  },

  // ============================================
  // Day 36: UART 통신
  // ============================================
  36: {
    day: 36,
    title: 'UART 통신',
    subtitle: 'ESP32의 여러 UART 포트로 다른 장치와 통신합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'UART 프로토콜 이해',
        description: 'UART 시리얼 통신의 원리를 학습합니다.',
        prompt: `UART(Universal Asynchronous Receiver/Transmitter)에 대해 설명해줘.

설명해야 할 내용:
1. UART란 무엇인지 (비동기 시리얼 통신)
2. TX, RX 핀의 역할
3. 통신 파라미터 (Baud rate, 데이터 비트, 패리티, 정지 비트)
4. ESP32의 3개 UART (UART0, UART1, UART2)
5. UART0은 USB 시리얼과 공유

📚 문법 설명:
- TX: Transmit (송신)
- RX: Receive (수신)
- Baud rate: 초당 비트 수 (9600, 115200 등)
- 교차 연결: 장치A TX → 장치B RX

UART 연결도(텍스트)를 그려줘.`,
        expectedKeywords: ['UART', 'TX', 'RX', 'Baud rate'],
        quiz: {
          question: 'ESP32에는 UART 포트가 몇 개 있나요?',
          options: ['1개', '2개', '3개', '4개'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'GPS 모듈 연결',
        description: 'UART로 GPS 모듈을 연결하여 위치 정보를 읽습니다.',
        prompt: `ESP32에서 UART로 GPS 모듈을 연결하는 코드를 작성해줘.

요구사항:
1. UART2 사용 (TX:17, RX:16)
2. GPS 데이터 수신 (NMEA 문장)
3. $GPGGA 문장 파싱
4. 위도, 경도 추출
5. OLED에 GPS 좌표 표시
6. 위성 수 표시

📚 문법 설명 (코드 내 주석으로 포함):
- HardwareSerial GPS(2): UART2 객체 생성
- GPS.begin(9600, SERIAL_8N1, RX, TX): UART 초기화
- GPS.available(): 수신 데이터 있는지 확인
- GPS.read(): 1바이트 읽기
- NMEA 문장: $GPGGA,시간,위도,N/S,경도,E/W,...

핀: GPS TX→GPIO16, GPS RX→GPIO17, I2C(21,22)`,
        expectedKeywords: ['HardwareSerial', 'NMEA', '$GPGGA', '위도', '경도'],
        quiz: {
          question: 'GPS가 주로 사용하는 통신 속도는?',
          options: ['4800', '9600', '115200', '1000000'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '다른 MCU와 통신',
        description: 'ESP32와 Arduino 간 UART 통신을 구현합니다.',
        prompt: `ESP32와 다른 마이크로컨트롤러 간 UART 통신 코드를 작성해줘.

요구사항:
1. ESP32에서 센서 데이터 전송
2. JSON 형식으로 데이터 구성
3. 상대 MCU에서 명령 수신
4. LED 제어 명령 처리
5. ACK/NAK 응답 프로토콜
6. 타임아웃 및 재전송 로직

📚 문법 설명 (코드 내 주석으로 포함):
- 단순 프로토콜 설계: STX + 데이터 + ETX
- JSON으로 복잡한 데이터 교환
- 버퍼에 데이터 축적 후 완전한 메시지 처리
- 체크섬으로 오류 검출

핀: UART2(TX:17, RX:16), LED(25,26,27)`,
        expectedKeywords: ['JSON', 'ACK', '프로토콜', '체크섬'],
        quiz: {
          question: '통신 오류를 검출하는 방법은?',
          options: ['데이터 무시', '체크섬', '속도 증가', '핀 추가'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 37, title: '모터 제어 - DC 모터' },
  },

  // ============================================
  // Day 37: 모터 제어 - DC 모터
  // ============================================
  37: {
    day: 37,
    title: '모터 제어 - DC 모터',
    subtitle: 'H-브릿지로 DC 모터의 속도와 방향을 제어합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'DC 모터와 H-브릿지 이해',
        description: 'DC 모터 제어의 원리를 학습합니다.',
        prompt: `DC 모터와 H-브릿지 드라이버에 대해 설명해줘.

설명해야 할 내용:
1. DC 모터의 동작 원리
2. 왜 직접 GPIO로 모터를 제어할 수 없는지 (전류 문제)
3. H-브릿지란 (4개의 스위치로 전류 방향 제어)
4. L298N, L293D 등 모터 드라이버
5. PWM으로 속도 제어

📚 문법 설명:
- H-브릿지: 모터 회전 방향을 바꿀 수 있는 회로
- ENA: PWM으로 속도 제어
- IN1, IN2: 방향 제어 (01=정방향, 10=역방향)
- 외부 전원 필요 (모터는 별도 전원)

H-브릿지 회로도(텍스트)를 그려줘.`,
        expectedKeywords: ['DC 모터', 'H-브릿지', 'L298N', 'PWM'],
        quiz: {
          question: 'H-브릿지에서 IN1=HIGH, IN2=LOW일 때 모터는?',
          options: ['정지', '정방향', '역방향', '브레이크'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '모터 속도 제어',
        description: 'PWM으로 DC 모터의 속도를 제어합니다.',
        prompt: `ESP32에서 DC 모터의 속도를 제어하는 코드를 작성해줘.

요구사항:
1. L298N 모터 드라이버 사용
2. PWM으로 속도 제어 (0~100%)
3. 버튼으로 속도 증가/감소 (+10%, -10%)
4. 가변저항으로 속도 조절 (옵션)
5. OLED에 현재 속도 표시
6. 부드러운 가속/감속

📚 문법 설명 (코드 내 주석으로 포함):
- ledcSetup(channel, freq, resolution): PWM 채널 설정
- ledcAttachPin(pin, channel): 핀에 PWM 채널 연결
- ledcWrite(channel, duty): PWM 듀티 설정
- 부드러운 가속: 현재값에서 목표값까지 점진적 변화

핀: ENA(25), IN1(26), IN2(27), 버튼(32,33), I2C(21,22)`,
        expectedKeywords: ['ledcSetup', 'ledcWrite', 'PWM', '가속'],
        quiz: {
          question: 'ESP32에서 PWM 채널을 설정하는 함수는?',
          options: ['analogWrite()', 'pwmSetup()', 'ledcSetup()', 'setPWM()'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '모터 방향 제어',
        description: 'DC 모터의 회전 방향을 제어합니다.',
        prompt: `ESP32에서 DC 모터의 방향을 제어하는 코드를 작성해줘.

요구사항:
1. 정방향/역방향 전환
2. 버튼 A: 정방향, 버튼 B: 역방향, 버튼 C: 정지
3. 웹 인터페이스로 원격 제어
4. 방향 전환 시 부드러운 감속 후 전환
5. OLED에 방향과 속도 표시
6. 비상 정지 기능

📚 문법 설명 (코드 내 주석으로 포함):
- 정방향: IN1=HIGH, IN2=LOW
- 역방향: IN1=LOW, IN2=HIGH
- 정지: IN1=LOW, IN2=LOW (또는 ENA=0)
- 브레이크: IN1=HIGH, IN2=HIGH
- 방향 전환 전 속도 0으로 감속

핀: ENA(25), IN1(26), IN2(27), 버튼(32,33,34), I2C(21,22)`,
        expectedKeywords: ['정방향', '역방향', '정지', '브레이크'],
        quiz: {
          question: 'DC 모터를 급정지(브레이크)하려면?',
          options: ['IN1=LOW, IN2=LOW', 'IN1=HIGH, IN2=HIGH', 'ENA=0', '전원 차단'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 38, title: '서보 모터 제어' },
  },

  // ============================================
  // Day 38: 서보 모터 제어
  // ============================================
  38: {
    day: 38,
    title: '서보 모터 제어',
    subtitle: 'PWM으로 서보 모터의 각도를 정밀하게 제어합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '서보 모터 이해',
        description: '서보 모터의 원리와 제어 방법을 학습합니다.',
        prompt: `서보 모터에 대해 설명해줘.

설명해야 할 내용:
1. 서보 모터란 (위치 제어가 가능한 모터)
2. 서보 모터의 구조 (모터 + 기어 + 제어 회로)
3. PWM 신호로 각도 제어 (0.5~2.5ms 펄스)
4. 일반 서보 (0~180도) vs 연속 회전 서보
5. 전원 요구사항 (보통 5V, 전류 주의)

📚 문법 설명:
- PWM 주기: 20ms (50Hz)
- 펄스 폭: 0.5ms=0도, 1.5ms=90도, 2.5ms=180도
- SG90: 소형 서보 (토크 약함)
- MG996R: 금속 기어 서보 (토크 강함)

서보 PWM 타이밍 다이어그램(텍스트)을 보여줘.`,
        expectedKeywords: ['서보', 'PWM', '펄스 폭', '각도'],
        quiz: {
          question: '서보 모터에서 1.5ms 펄스는 몇 도?',
          options: ['0도', '45도', '90도', '180도'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '서보 각도 제어',
        description: 'ESP32Servo 라이브러리로 서보를 제어합니다.',
        prompt: `ESP32에서 서보 모터의 각도를 제어하는 코드를 작성해줘.

요구사항:
1. ESP32Servo 라이브러리 사용
2. 버튼으로 각도 조절 (+10도, -10도)
3. 가변저항으로 각도 조절 (0~180도)
4. OLED에 현재 각도 표시
5. 웹 슬라이더로 각도 제어
6. 부드러운 이동 (서서히 각도 변경)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ESP32Servo.h>: 서보 라이브러리
- Servo myservo: 서보 객체 생성
- myservo.attach(pin): 서보 핀 연결
- myservo.write(angle): 각도 설정 (0~180)
- myservo.writeMicroseconds(us): 펄스 폭 직접 설정

핀: 서보(13), 버튼(32,33), 가변저항(34), I2C(21,22)`,
        expectedKeywords: ['ESP32Servo', 'attach', 'write', 'writeMicroseconds'],
        quiz: {
          question: '서보를 핀에 연결하는 함수는?',
          options: ['servo.connect()', 'servo.attach()', 'servo.begin()', 'servo.init()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '다축 서보 제어',
        description: '여러 서보 모터를 동시에 제어합니다.',
        prompt: `ESP32에서 여러 서보 모터를 제어하는 코드를 작성해줘.

요구사항:
1. 2축 팬틸트 시스템 (수평/수직)
2. 조이스틱으로 각도 조절
3. 프리셋 위치 저장 (3개)
4. 버튼으로 프리셋 이동
5. OLED에 현재 각도 (X, Y) 표시
6. 이동 속도 조절

📚 문법 설명 (코드 내 주석으로 포함):
- 여러 Servo 객체 생성
- map() 함수로 조이스틱 값 → 각도 변환
- 구조체로 프리셋 관리
- Preferences로 프리셋 저장

핀: 서보1(13), 서보2(14), 조이스틱(34,35), 버튼(32), I2C(21,22)`,
        expectedKeywords: ['팬틸트', '조이스틱', '프리셋', 'map'],
        quiz: {
          question: '팬틸트에서 "팬"은 어떤 동작?',
          options: ['상하 이동', '좌우 이동', '줌', '회전'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 39, title: '스테퍼 모터 제어' },
  },

  // ============================================
  // Day 39: 스테퍼 모터 제어
  // ============================================
  39: {
    day: 39,
    title: '스테퍼 모터 제어',
    subtitle: '스테퍼 모터로 정밀한 위치 제어를 수행합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '스테퍼 모터 이해',
        description: '스테퍼 모터의 원리와 구동 방식을 학습합니다.',
        prompt: `스테퍼 모터에 대해 설명해줘.

설명해야 할 내용:
1. 스테퍼 모터란 (스텝 단위로 회전하는 모터)
2. 유니폴라 vs 바이폴라 방식
3. 스텝 각도 (1.8도 = 200 스텝/회전)
4. 풀스텝, 하프스텝, 마이크로스텝
5. 28BYJ-48 + ULN2003 드라이버

📚 문법 설명:
- 스텝: 모터의 최소 이동 단위
- 풀스텝: 기본 스텝 (2상 여자)
- 하프스텝: 2배 정밀도 (1-2상 여자)
- 마이크로스텝: 훨씬 더 정밀 (드라이버 필요)

스테퍼 모터 시퀀스(텍스트)를 표로 보여줘.`,
        expectedKeywords: ['스테퍼', '스텝', '풀스텝', '하프스텝'],
        quiz: {
          question: '1.8도 스텝 모터가 1회전하려면 몇 스텝 필요?',
          options: ['100', '180', '200', '360'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '스테퍼 회전 제어',
        description: 'Stepper 라이브러리로 스테퍼 모터를 제어합니다.',
        prompt: `ESP32에서 스테퍼 모터를 제어하는 코드를 작성해줘.

요구사항:
1. 28BYJ-48 + ULN2003 사용
2. 시계방향/반시계방향 회전
3. 회전 속도 조절 (RPM)
4. 특정 스텝 수만큼 회전
5. OLED에 현재 위치(스텝) 표시
6. 홈 위치 리셋 기능

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Stepper.h>: 스테퍼 라이브러리
- Stepper stepper(steps, pin1, pin2, pin3, pin4): 객체 생성
- stepper.setSpeed(rpm): 속도 설정
- stepper.step(steps): 스텝 이동 (음수=반대방향)
- 28BYJ-48: 2048 스텝/회전 (감속기어 포함)

핀: IN1(25), IN2(26), IN3(27), IN4(14), I2C(21,22)`,
        expectedKeywords: ['Stepper', 'setSpeed', 'step', '2048'],
        quiz: {
          question: '28BYJ-48이 한 바퀴 회전하려면 몇 스텝?',
          options: ['64', '512', '2048', '4096'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '위치 제어 시스템',
        description: '스테퍼 모터로 정밀한 위치 제어를 구현합니다.',
        prompt: `ESP32에서 스테퍼 모터 위치 제어 시스템을 만들어줘.

요구사항:
1. 목표 위치(각도)를 웹에서 입력
2. 현재 위치에서 목표까지 최단 경로로 이동
3. 리미트 스위치로 원점 복귀
4. 위치를 Preferences에 저장
5. 부팅 시 저장된 위치 복원
6. 비상 정지 버튼

📚 문법 설명 (코드 내 주석으로 포함):
- 현재 위치 추적 변수
- 각도 → 스텝 변환
- 최단 경로: 정방향 vs 역방향 비교
- 리미트 스위치로 원점 찾기 (호밍)

핀: 스테퍼(25,26,27,14), 리미트스위치(32), 버튼(33), I2C(21,22)`,
        expectedKeywords: ['위치 제어', '호밍', '리미트 스위치', '최단 경로'],
        quiz: {
          question: '원점을 찾는 과정을 무엇이라고 하나?',
          options: ['포지셔닝', '호밍', '캘리브레이션', '리셋'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 40, title: '릴레이 제어' },
  },

  // ============================================
  // Day 40: 릴레이 제어
  // ============================================
  40: {
    day: 40,
    title: '릴레이 제어',
    subtitle: '릴레이로 고전압/고전류 기기를 안전하게 제어합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '릴레이 이해',
        description: '릴레이의 동작 원리와 안전 사용법을 학습합니다.',
        prompt: `릴레이(Relay)에 대해 설명해줘.

설명해야 할 내용:
1. 릴레이란 (전자석으로 스위치를 제어)
2. NO(Normally Open)와 NC(Normally Closed)
3. COM, NO, NC 단자의 역할
4. 릴레이 모듈 (옵토커플러 내장)
5. 릴레이 사용 시 안전 주의사항
6. 액티브 LOW vs 액티브 HIGH

📚 문법 설명:
- NO: 평소 열림, 활성화 시 닫힘
- NC: 평소 닫힘, 활성화 시 열림
- 플라이백 다이오드: 역기전력 보호
- 고전압 작업 시 반드시 전원 차단!

릴레이 회로도(텍스트)를 그려줘.`,
        expectedKeywords: ['릴레이', 'NO', 'NC', 'COM'],
        quiz: {
          question: 'NO(Normally Open) 릴레이가 비활성화 상태일 때?',
          options: ['회로 연결됨', '회로 끊어짐', '모터 동작', '경고음'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '릴레이 제어하기',
        description: 'GPIO로 릴레이를 제어하여 LED 스트립을 켜고 끕니다.',
        prompt: `ESP32에서 릴레이를 제어하는 코드를 작성해줘.

요구사항:
1. 1채널 릴레이 모듈 사용
2. 버튼으로 릴레이 토글
3. 웹 인터페이스로 원격 제어
4. 타이머로 자동 끄기 (30분 후)
5. OLED에 릴레이 상태 표시
6. LED로 릴레이 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 액티브 LOW: LOW로 릴레이 활성화
- 액티브 HIGH: HIGH로 릴레이 활성화
- digitalWrite(RELAY_PIN, LOW/HIGH)
- 상태 저장으로 토글 구현

핀: 릴레이(25), 버튼(32), LED(27), I2C(21,22)`,
        expectedKeywords: ['digitalWrite', '토글', '타이머', '액티브'],
        quiz: {
          question: '액티브 LOW 릴레이를 켜려면?',
          options: ['digitalWrite(pin, HIGH)', 'digitalWrite(pin, LOW)', 'pinMode(pin, OUTPUT)', 'analogWrite(pin, 255)'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '스마트 플러그 만들기',
        description: '릴레이로 가전제품을 스마트하게 제어합니다.',
        prompt: `ESP32로 스마트 플러그를 만드는 코드를 작성해줘.

요구사항:
1. 릴레이로 AC 기기 제어 (시뮬레이션)
2. 웹 대시보드에서 ON/OFF 제어
3. 스케줄 기능 (시간대별 자동 제어)
4. MQTT로 원격 제어
5. 전력 소비 시간 로깅 (ON 시간 누적)
6. 안전 기능 (최대 연속 사용 시간)

📚 문법 설명 (코드 내 주석으로 포함):
- 스케줄: NTP 시간과 설정 시간 비교
- 누적 시간: millis()로 ON 시간 계산
- 안전 타이머: 연속 사용 제한
- MQTT: esp32/plug/control 토픽

핀: 릴레이(25), I2C(21,22), LED(27)`,
        expectedKeywords: ['스케줄', 'MQTT', '누적 시간', '안전'],
        quiz: {
          question: '스마트 플러그에 안전 기능이 필요한 이유는?',
          options: ['멋있어서', '과열 방지', '속도 향상', '배터리 절약'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 41, title: '초음파 센서' },
  },

  // ============================================
  // Day 41: 초음파 센서
  // ============================================
  41: {
    day: 41,
    title: '초음파 센서',
    subtitle: 'HC-SR04로 물체까지의 거리를 측정합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '초음파 센서 원리',
        description: '초음파 거리 측정의 원리를 학습합니다.',
        prompt: `HC-SR04 초음파 센서에 대해 설명해줘.

설명해야 할 내용:
1. 초음파 거리 측정 원리 (TOF: Time of Flight)
2. 트리거(Trig)와 에코(Echo) 핀의 역할
3. 측정 범위 (2cm ~ 400cm)
4. 측정 정확도와 한계
5. 음속과 거리 계산 (거리 = 시간 × 음속 / 2)

📚 문법 설명:
- 트리거: 10μs HIGH 펄스로 초음파 발사
- 에코: 반사파 수신 시간 (HIGH 지속 시간)
- 음속: 340m/s (20°C 기준)
- 거리(cm) = 에코 시간(μs) / 58

초음파 측정 타이밍(텍스트)을 그려줘.`,
        expectedKeywords: ['초음파', '트리거', '에코', 'TOF'],
        quiz: {
          question: '초음파 센서의 트리거 펄스 길이는?',
          options: ['1μs', '10μs', '100μs', '1ms'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '거리 측정하기',
        description: '초음파 센서로 거리를 측정합니다.',
        prompt: `ESP32에서 초음파 센서로 거리를 측정하는 코드를 작성해줘.

요구사항:
1. HC-SR04 센서 연결
2. 거리 측정 함수 작성
3. 10회 측정 후 평균값 계산 (노이즈 제거)
4. 측정 범위 필터링 (2~400cm)
5. OLED에 거리(cm) 표시
6. 바 그래프로 거리 시각화

📚 문법 설명 (코드 내 주석으로 포함):
- digitalWrite(TRIG, HIGH/LOW): 트리거 펄스
- pulseIn(ECHO, HIGH, timeout): 에코 시간 측정
- pulseIn 반환값: 마이크로초 단위
- 타임아웃: 측정 실패 방지 (30000μs 권장)

핀: Trig(13), Echo(14), I2C(21,22)`,
        expectedKeywords: ['pulseIn', 'digitalWrite', '평균', '필터링'],
        quiz: {
          question: '에코 핀의 HIGH 시간을 측정하는 함수는?',
          options: ['digitalRead()', 'pulseIn()', 'analogRead()', 'echoTime()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '근접 감지 시스템',
        description: '거리에 따라 경고를 발생시키는 시스템을 만듭니다.',
        prompt: `ESP32에서 초음파 근접 감지 시스템을 만들어줘.

요구사항:
1. 연속 거리 측정
2. 거리별 경고 단계:
   - 100cm 이상: 파랑 LED (안전)
   - 50~100cm: 노랑 LED (주의)
   - 50cm 미만: 빨강 LED + 경고음
3. 거리에 따라 경고음 빈도 변화
4. OLED에 거리와 상태 표시
5. 웹에서 실시간 거리 모니터링

📚 문법 설명 (코드 내 주석으로 포함):
- 조건문으로 거리 범위 분기
- map() 함수로 거리 → 경고음 빈도 변환
- 논블로킹 부저 (tone/noTone)

핀: Trig(13), Echo(14), LED(25,26,27), 부저(12), I2C(21,22)`,
        expectedKeywords: ['근접 감지', '경고 단계', 'map', 'tone'],
        quiz: {
          question: '물체가 가까워질수록 경고음은?',
          options: ['느려짐', '빨라짐', '변화 없음', '꺼짐'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 42, title: 'PIR 모션 센서' },
  },

  // ============================================
  // Day 42: PIR 모션 센서
  // ============================================
  42: {
    day: 42,
    title: 'PIR 모션 센서',
    subtitle: 'PIR 센서로 사람의 움직임을 감지합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'PIR 센서 원리',
        description: 'PIR 센서의 동작 원리를 학습합니다.',
        prompt: `PIR(Passive Infrared) 모션 센서에 대해 설명해줘.

설명해야 할 내용:
1. PIR 센서란 (적외선 변화 감지)
2. 동작 원리 (사람의 체온=적외선)
3. 감도 조절과 지연 시간 조절
4. 감지 범위와 각도
5. HC-SR501 모듈 사용법

📚 문법 설명:
- Passive: 적외선을 발사하지 않고 수신만 함
- 디지털 출력: 감지 시 HIGH, 미감지 시 LOW
- 워밍업 시간: 처음 30~60초 안정화 필요
- Retriggering: 연속 감지 시 출력 유지

PIR 센서 내부 구조(텍스트)를 설명해줘.`,
        expectedKeywords: ['PIR', '적외선', '모션', '감지'],
        quiz: {
          question: 'PIR 센서가 감지하는 것은?',
          options: ['소리', '빛', '적외선 변화', '초음파'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '모션 감지 구현',
        description: 'PIR 센서로 모션을 감지합니다.',
        prompt: `ESP32에서 PIR 센서로 모션을 감지하는 코드를 작성해줘.

요구사항:
1. PIR 센서 디지털 입력
2. 감지 시 LED 점등 + 시리얼 출력
3. 인터럽트 방식으로 즉각 반응
4. 마지막 감지 시간 기록
5. OLED에 감지 상태와 시간 표시
6. 감지 횟수 카운트

📚 문법 설명 (코드 내 주석으로 포함):
- digitalRead(PIR_PIN): 센서 상태 읽기
- attachInterrupt(): 인터럽트로 빠른 반응
- millis(): 마지막 감지 시간 저장
- volatile 변수: ISR과 메인 공유

핀: PIR(32), LED(25), I2C(21,22)`,
        expectedKeywords: ['digitalRead', 'attachInterrupt', 'volatile', '감지 횟수'],
        quiz: {
          question: 'PIR 센서가 모션을 감지하면 출력은?',
          options: ['LOW', 'HIGH', 'PWM', '아날로그'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '자동 조명 시스템',
        description: '모션 감지로 조명을 자동 제어합니다.',
        prompt: `ESP32에서 PIR 기반 자동 조명 시스템을 만들어줘.

요구사항:
1. 모션 감지 시 조명(릴레이) ON
2. 감지 후 3분간 유지 후 자동 OFF
3. 연속 감지 시 타이머 리셋
4. 밤 시간에만 동작 (조도 센서 연동)
5. 수동 모드 전환 (버튼)
6. OLED에 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 타이머 리셋: 감지마다 마지막 감지 시간 갱신
- 조도 체크: 어두울 때만 조명 ON
- enum Mode { AUTO, MANUAL }
- 상태 머신으로 모드 관리

핀: PIR(32), 릴레이(25), 조도(34), 버튼(33), I2C(21,22)`,
        expectedKeywords: ['자동 조명', '타이머 리셋', '조도', '모드'],
        quiz: {
          question: '자동 조명에서 타이머 리셋이 필요한 이유는?',
          options: ['배터리 절약', '연속 감지 시 조명 유지', '센서 보호', '속도 향상'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 43, title: 'RFID/NFC 리더' },
  },

  // ============================================
  // Day 43: RFID/NFC 리더
  // ============================================
  43: {
    day: 43,
    title: 'RFID/NFC 리더',
    subtitle: 'RC522로 RFID 카드를 읽고 출입 시스템을 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'RFID 기술 이해',
        description: 'RFID와 NFC의 원리를 학습합니다.',
        prompt: `RFID(Radio-Frequency Identification)에 대해 설명해줘.

설명해야 할 내용:
1. RFID란 (무선 인식 기술)
2. RFID 태그와 리더기의 동작
3. 주파수 대역 (LF, HF, UHF)
4. NFC와 RFID의 차이
5. MFRC522 모듈 (13.56MHz, SPI 통신)

📚 문법 설명:
- 태그: 고유 ID를 가진 칩 (카드, 키링)
- 리더: 전자기파로 태그를 읽음
- UID: Unique ID (태그 고유번호)
- MIFARE: NXP의 RFID 카드 표준

RFID 동작 원리(텍스트)를 설명해줘.`,
        expectedKeywords: ['RFID', 'NFC', 'UID', 'MFRC522'],
        quiz: {
          question: 'RC522 모듈이 사용하는 통신 방식은?',
          options: ['I2C', 'SPI', 'UART', 'BLE'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'RFID 카드 읽기',
        description: 'RC522로 RFID 카드의 UID를 읽습니다.',
        prompt: `ESP32에서 RC522로 RFID 카드를 읽는 코드를 작성해줘.

요구사항:
1. MFRC522 라이브러리 사용
2. 카드 감지 시 UID 읽기
3. UID를 HEX 문자열로 변환
4. 시리얼과 OLED에 UID 출력
5. 카드 감지 시 비프음
6. 읽은 UID 기록 저장 (배열)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <MFRC522.h>: RFID 라이브러리
- MFRC522 rfid(SS_PIN, RST_PIN): 객체 생성
- rfid.PCD_Init(): 리더 초기화
- rfid.PICC_IsNewCardPresent(): 새 카드 감지
- rfid.PICC_ReadCardSerial(): 카드 읽기
- rfid.uid.uidByte[]: UID 바이트 배열

핀: SDA(5), SCK(18), MOSI(23), MISO(19), RST(22), I2C(21,22)`,
        expectedKeywords: ['MFRC522', 'PICC_IsNewCardPresent', 'uidByte'],
        quiz: {
          question: '새 카드가 있는지 확인하는 함수는?',
          options: ['rfid.detect()', 'rfid.PICC_IsNewCardPresent()', 'rfid.read()', 'rfid.scan()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '출입 관리 시스템',
        description: 'RFID로 출입을 관리하는 시스템을 만듭니다.',
        prompt: `ESP32에서 RFID 출입 관리 시스템을 만들어줘.

요구사항:
1. 등록된 카드 UID 목록 관리
2. 등록된 카드: 문 열림(릴레이) + 파랑 LED + 승인 비프
3. 미등록 카드: 빨강 LED + 거부 비프
4. 웹에서 새 카드 등록/삭제
5. 출입 로그 저장 (시간, UID, 결과)
6. OLED에 마지막 출입 정보 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 등록 UID 배열 관리
- memcmp(): UID 비교
- Preferences로 등록 카드 저장
- 로그: 구조체 배열 또는 SPIFFS 파일

핀: RFID(SPI), 릴레이(25), LED(26,27), 부저(14), I2C(21,22)`,
        expectedKeywords: ['출입 관리', 'memcmp', '등록', '로그'],
        quiz: {
          question: 'UID 비교에 사용하는 함수는?',
          options: ['strcmp()', 'memcmp()', 'uidcmp()', '=='],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 44, title: '적외선 송수신' },
  },

  // ============================================
  // Day 44: 적외선 송수신
  // ============================================
  44: {
    day: 44,
    title: '적외선 송수신',
    subtitle: 'IR LED와 리시버로 리모컨 신호를 송수신합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '적외선 통신 원리',
        description: 'IR 리모컨 통신의 원리를 학습합니다.',
        prompt: `적외선(IR) 리모컨 통신에 대해 설명해줘.

설명해야 할 내용:
1. IR 통신이란 (적외선으로 데이터 전송)
2. 캐리어 주파수 (38kHz)
3. IR 프로토콜 종류 (NEC, Sony, RC5, RC6)
4. NEC 프로토콜 구조 (리더, 주소, 명령, 반전)
5. IR 수신기와 송신기

📚 문법 설명:
- 캐리어 주파수: 38kHz 변조 (노이즈 필터링)
- NEC 프로토콜: 리더 펄스 + 32비트 데이터
- VS1838B: IR 수신기 모듈
- IR LED: 적외선 발광 다이오드

NEC 신호 파형(텍스트)을 그려줘.`,
        expectedKeywords: ['IR', '38kHz', 'NEC', 'VS1838B'],
        quiz: {
          question: 'IR 리모컨의 캐리어 주파수는 보통?',
          options: ['10kHz', '38kHz', '100kHz', '433MHz'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'IR 신호 수신',
        description: 'IRremote 라이브러리로 리모컨 신호를 수신합니다.',
        prompt: `ESP32에서 IR 리모컨 신호를 수신하는 코드를 작성해줘.

요구사항:
1. IRremote 라이브러리 사용
2. IR 수신기로 리모컨 신호 수신
3. 프로토콜과 코드값 출력
4. 버튼별 코드 학습 및 저장
5. OLED에 수신 데이터 표시
6. LED로 수신 표시 (깜빡임)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <IRremote.hpp>: IR 라이브러리
- IrReceiver.begin(pin): 수신기 초기화
- IrReceiver.decode(): 신호 수신 및 디코딩
- IrReceiver.decodedIRData.command: 명령 코드
- IrReceiver.resume(): 다음 수신 준비

핀: IR_RECV(15), LED(25), I2C(21,22)`,
        expectedKeywords: ['IRremote', 'IrReceiver', 'decode', 'command'],
        quiz: {
          question: 'IR 신호 수신 후 다음 수신을 위해 호출하는 함수는?',
          options: ['IrReceiver.next()', 'IrReceiver.resume()', 'IrReceiver.reset()', 'IrReceiver.clear()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'IR 리모컨 만들기',
        description: 'IR LED로 리모컨 신호를 송신합니다.',
        prompt: `ESP32에서 IR 리모컨을 만드는 코드를 작성해줘.

요구사항:
1. IR LED로 NEC 프로토콜 신호 송신
2. 버튼별 다른 코드 전송
3. 학습한 리모컨 코드 재생
4. 웹에서 버튼으로 IR 전송
5. 학습 모드: 수신 → 저장 → 재생
6. OLED에 전송 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- IrSender.begin(): 송신기 초기화
- IrSender.sendNEC(address, command, repeats): NEC 전송
- 학습: 수신 데이터를 EEPROM/Preferences에 저장
- 재생: 저장된 데이터로 sendNEC 호출

핀: IR_SEND(4), IR_RECV(15), 버튼(32,33), I2C(21,22)`,
        expectedKeywords: ['IrSender', 'sendNEC', '학습', '재생'],
        quiz: {
          question: 'NEC 프로토콜로 IR 신호를 보내는 함수는?',
          options: ['IrSender.send()', 'IrSender.sendNEC()', 'IrSender.transmit()', 'IrSender.emit()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 45, title: '중급 최종 프로젝트' },
  },

  // ============================================
  // Day 45: 중급 최종 프로젝트
  // ============================================
  45: {
    day: 45,
    title: '중급 최종 프로젝트',
    subtitle: '중급 과정에서 배운 모든 기술을 통합한 스마트 도어락 시스템을 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '프로젝트 설계',
        description: '스마트 도어락 시스템을 설계합니다.',
        prompt: `ESP32 스마트 도어락 시스템을 설계해줘.

통합할 기능:
1. RFID 카드 인증
2. 웹 원격 잠금/해제
3. PIR 센서로 접근 감지
4. MQTT로 상태 알림
5. 타이머 자동 잠금 (30초)
6. 출입 로그 저장
7. OLED 상태 표시
8. LED/부저 피드백

각 기능별로 필요한 하드웨어와 핀을 정리하고,
시스템 흐름도(텍스트)를 그려줘.`,
        expectedKeywords: ['설계', 'RFID', 'PIR', 'MQTT'],
        quiz: {
          question: '스마트 도어락에서 RFID의 역할은?',
          options: ['거리 측정', '카드 인증', '온도 측정', '조명 제어'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '핵심 기능 구현',
        description: '도어락 시스템의 핵심 코드를 작성합니다.',
        prompt: `ESP32 스마트 도어락 핵심 코드를 작성해줘.

구현할 기능:
1. RFID 카드 인증 (등록 카드만 해제)
2. 서보 모터로 잠금/해제 동작
3. PIR 센서로 접근 시 OLED 활성화
4. 잠금 상태 LED 표시 (잠김:빨강, 열림:파랑)
5. 해제 후 30초 뒤 자동 잠금
6. 웹에서 잠금/해제 제어

📚 문법 설명 (코드 내 주석으로 포함):
- 상태 머신: LOCKED, UNLOCKED, LOCKING
- 이벤트 기반: RFID/웹 → 상태 전환
- 타이머: millis()로 자동 잠금

핀: RFID(SPI), 서보(13), PIR(32), LED(25,27), I2C(21,22)`,
        expectedKeywords: ['상태 머신', '서보', 'PIR', '자동 잠금'],
        quiz: {
          question: '상태 머신에서 상태를 정의하는 키워드는?',
          options: ['struct', 'enum', 'class', 'typedef'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '알림 및 로그 시스템',
        description: 'MQTT 알림과 출입 로그를 구현합니다.',
        prompt: `ESP32 스마트 도어락에 알림과 로그 기능을 추가해줘.

요구사항:
1. MQTT로 상태 변경 알림 (잠금/해제)
2. MQTT로 원격 잠금/해제 명령 수신
3. 출입 로그 저장 (SPIFFS)
   - 시간, 카드 UID, 결과(성공/실패)
4. 웹에서 로그 조회
5. 미등록 카드 시도 시 알림
6. NTP 시간 동기화

📚 문법 설명 (코드 내 주석으로 포함):
- SPIFFS.open("/log.txt", "a"): 추가 모드로 파일 열기
- NTP로 정확한 시간 기록
- JSON 형식으로 로그 구성
- 오래된 로그 자동 삭제 (파일 크기 제한)

핀: (이전과 동일)`,
        expectedKeywords: ['MQTT', 'SPIFFS', '로그', 'NTP'],
        quiz: {
          question: 'SPIFFS에서 파일에 내용을 추가하려면?',
          options: ['mode: "w"', 'mode: "r"', 'mode: "a"', 'mode: "+"'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 46, title: 'BLE 기초' },
  },
};
