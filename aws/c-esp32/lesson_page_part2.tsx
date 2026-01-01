// 초급 과정 Part 2 (Day 6-10): PWM과 센서
export const beginnerPromptsPart2: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  6: {
    title: 'PWM LED 밝기 조절',
    project: 'LED 페이더',
    files: ['main.ino', 'pwm_control.h', 'pwm_control.cpp', 'README.md'],
    prompt: `[Day 6] ESP32 Arduino - PWM LED 밝기 조절

프로젝트: LED 페이더

프로젝트 구조:
day06_pwm_led/
├── main.ino
├── pwm_control.h
├── pwm_control.cpp
└── README.md

요구사항:
1. ESP32 LEDC PWM 기능 사용
2. ledcSetup(channel, freq, resolution) 설정
3. ledcAttachPin(pin, channel)로 핀 연결
4. ledcWrite(channel, duty)로 밝기 조절 (0-255)
5. RED LED(GPIO25) 페이드 인/아웃 효과
6. 부드러운 전환: 10ms 간격으로 밝기 변경

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: pwm_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: pwm_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  7: {
    title: '멜로디 연주',
    project: '음계 연주기',
    files: ['main.ino', 'melody.h', 'melody.cpp', 'README.md'],
    prompt: `[Day 7] ESP32 Arduino - 멜로디 연주

프로젝트: 음계 연주기

프로젝트 구조:
day07_melody/
├── main.ino
├── melody.h
├── melody.cpp
└── README.md

요구사항:
1. MELODY 부저(GPIO33) 사용 (트랜지스터 구동)
2. ledcWriteTone(channel, frequency)로 음 출력
3. 도레미파솔라시도 음계 연주
4. 주파수: C4(262), D4(294), E4(330), F4(349), G4(392), A4(440), B4(494), C5(523)
5. 각 음 500ms 재생, 100ms 쉼
6. ledcWriteTone(channel, 0)으로 음 정지

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: melody.h =====
(코드)
===== 파일 끝 =====

===== 파일: melody.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  8: {
    title: 'I2C 통신과 AHT20',
    project: '온습도 모니터',
    files: ['main.ino', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 8] ESP32 Arduino - I2C 통신과 AHT20

프로젝트: 온습도 모니터

프로젝트 구조:
day08_temperature/
├── main.ino
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. Wire 라이브러리 사용: Wire.begin(21, 22)
2. Adafruit_AHTX0 라이브러리 사용
3. AHT20 센서 (주소 0x38) 데이터 읽기
4. 온도(°C), 습도(%) 2초 간격 시리얼 출력
5. 센서 초기화 실패 시 에러 메시지 출력
6. 포맷: "온도: 25.3°C, 습도: 45.2%"

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 라이브러리 설치: Adafruit AHTX0)
===== 파일 끝 =====`
  },
  9: {
    title: 'OLED 디스플레이',
    project: 'OLED Hello World',
    files: ['main.ino', 'oled_display.h', 'oled_display.cpp', 'README.md'],
    prompt: `[Day 9] ESP32 Arduino - OLED 디스플레이

프로젝트: OLED Hello World

프로젝트 구조:
day09_oled/
├── main.ino
├── oled_display.h
├── oled_display.cpp
└── README.md

요구사항:
1. Adafruit_SSD1306 라이브러리 사용
2. OLED 주소 0x3C, 크기 128x64
3. Wire.begin(21, 22)로 I2C 초기화
4. display.begin(SSD1306_SWITCHCAPVCC, 0x3C)
5. "Hello ESP32!" 텍스트 중앙 출력
6. setTextSize(), setTextColor(), setCursor() 사용

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.h =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법 및 라이브러리 설치: Adafruit SSD1306, Adafruit GFX)
===== 파일 끝 =====`
  },
  10: {
    title: 'OLED에 센서 데이터 표시',
    project: '온습도 디스플레이',
    files: ['main.ino', 'aht20_sensor.h', 'aht20_sensor.cpp', 'oled_display.h', 'oled_display.cpp', 'README.md'],
    prompt: `[Day 10] ESP32 Arduino - OLED에 센서 데이터 표시

프로젝트: 온습도 디스플레이

프로젝트 구조:
day10_sensor_display/
├── main.ino
├── aht20_sensor.h
├── aht20_sensor.cpp
├── oled_display.h
├── oled_display.cpp
└── README.md

요구사항:
1. AHT20 온습도 데이터를 OLED에 실시간 표시
2. 2초 간격 업데이트
3. 화면 구성:
   - 1줄: "IoT Monitor"
   - 2줄: "Temp: 25.3 C"
   - 3줄: "Humi: 45.2 %"
4. display.clearDisplay()로 화면 지우기
5. 센서 모듈과 디스플레이 모듈 분리

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.h =====
(코드)
===== 파일 끝 =====

===== 파일: oled_display.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  }
};

export default beginnerPromptsPart2;
