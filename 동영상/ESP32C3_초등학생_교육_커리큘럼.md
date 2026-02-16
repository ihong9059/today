# ESP32C3 SuperMini 초등학생 교육 커리큘럼

**대상**: 초등학교 4~6학년
**총 차시**: 12차시 (각 40분)
**목표**: Arduino를 활용한 IoT 기초 이해 및 실습

---

## 교육 목표

1. **전자회로 기초** 이해하기
2. **프로그래밍 기초** 배우기
3. **센서와 액추에이터** 작동 원리 이해하기
4. **창의적 문제해결** 능력 기르기

---

## 커리큘럼 개요

| 단원 | 차시 | 주제 | 학습 내용 |
|------|------|------|----------|
| 1 | 1~2 | 만나서 반가워! | ESP32C3 소개, Arduino IDE 설치 |
| 2 | 3~4 | 반짝반짝 무지개 | WS2812 RGB LED 제어 |
| 3 | 5~6 | 뚜뚜뚜 멜로디 | 부저로 소리 만들기 |
| 4 | 7~8 | 버튼을 눌러봐! | 스위치 입력 처리 |
| 5 | 9~10 | 날씨를 알려줘 | AHT20 온습도 센서 |
| 6 | 11~12 | 화면에 보여줘 | OLED 디스플레이 |

---

## 단원별 상세 커리큘럼

---

## 단원 1: 만나서 반가워! (1~2차시)

### 1차시: ESP32C3와 첫 만남

**학습 목표**
- 마이크로컨트롤러가 무엇인지 이해한다
- ESP32C3 보드의 구성요소를 알아본다

**학습 내용**

```
┌─────────────────────────────────────────────────────────┐
│                  마이크로컨트롤러란?                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   🧠 아주 작은 컴퓨터예요!                               │
│                                                         │
│   일반 컴퓨터        vs        마이크로컨트롤러          │
│   ┌─────────┐                  ┌─────────┐             │
│   │ 📺 모니터│                  │    🔌    │             │
│   │ ⌨️ 키보드│                  │  센서에  │             │
│   │ 🖱️ 마우스│                  │  연결!   │             │
│   └─────────┘                  └─────────┘             │
│                                                         │
│   인터넷, 게임,                 LED 켜기,               │
│   영상 시청                     온도 측정,              │
│                                 로봇 제어               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**준비물**
- ESP32C3 SuperMini 보드
- USB-C 케이블
- 컴퓨터

**활동**
1. ESP32C3 보드 관찰하기
2. 보드의 각 부품 이름 알아보기
3. USB 케이블로 컴퓨터에 연결하기

---

### 2차시: Arduino IDE 설치하고 첫 프로그램 만들기

**학습 목표**
- Arduino IDE를 설치할 수 있다
- 첫 번째 프로그램을 업로드할 수 있다

**학습 내용**

```
┌─────────────────────────────────────────────────────────┐
│              프로그래밍이란?                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   컴퓨터에게 할 일을 알려주는 것이에요!                   │
│                                                         │
│   "LED를 켜줘!"     →    digitalWrite(LED, HIGH);       │
│   "1초 기다려!"     →    delay(1000);                   │
│   "LED를 꺼줘!"     →    digitalWrite(LED, LOW);        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**첫 번째 프로그램: LED 깜빡이기**

```cpp
// 내장 LED 깜빡이기
void setup() {
  pinMode(8, OUTPUT);  // GPIO8을 출력으로 설정
}

void loop() {
  digitalWrite(8, HIGH);  // LED 켜기
  delay(1000);            // 1초 기다리기
  digitalWrite(8, LOW);   // LED 끄기
  delay(1000);            // 1초 기다리기
}
```

**활동**
1. Arduino IDE 설치하기
2. ESP32C3 보드 설정하기
3. LED 깜빡이기 프로그램 작성하고 업로드하기
4. 깜빡이는 속도 바꿔보기

---

## 단원 2: 반짝반짝 무지개 (3~4차시)

### 3차시: RGB LED의 원리

**학습 목표**
- 빛의 삼원색을 이해한다
- WS2812 RGB LED의 원리를 안다

**학습 내용**

```
┌─────────────────────────────────────────────────────────┐
│                   빛의 삼원색                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│           🔴 빨강 (Red)                                 │
│              /\                                         │
│             /  \                                        │
│            /    \                                       │
│           / 노랑 \  자홍                                │
│          /        \                                     │
│    🟢 ───────────── 🔵                                 │
│    초록     청록      파랑                              │
│   (Green)         (Blue)                                │
│                                                         │
│   세 가지 색을 섞으면 모든 색을 만들 수 있어요!           │
│                                                         │
│   빨강 + 초록 = 노랑                                    │
│   빨강 + 파랑 = 자홍                                    │
│   초록 + 파랑 = 청록                                    │
│   빨강 + 초록 + 파랑 = 흰색                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**WS2812 RGB LED 구조**

```
┌─────────────┐
│  WS2812     │
│  ┌───────┐  │
│  │🔴🟢🔵│  │  ← 작은 LED 3개가 들어있어요!
│  └───────┘  │
│ DIN    DOUT │  ← 데이터 입력/출력
└─────────────┘
```

---

### 4차시: 무지개 LED 만들기

**학습 목표**
- NeoPixel 라이브러리를 사용할 수 있다
- 다양한 색상을 표현할 수 있다

**프로그램: 무지개 색 표현하기**

```cpp
#include <Adafruit_NeoPixel.h>

#define LED_PIN 4      // GPIO4에 연결
#define LED_COUNT 1    // LED 1개

Adafruit_NeoPixel pixel(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  pixel.begin();
  pixel.setBrightness(50);  // 밝기 설정 (0~255)
}

void loop() {
  // 빨강
  pixel.setPixelColor(0, 255, 0, 0);
  pixel.show();
  delay(1000);

  // 주황
  pixel.setPixelColor(0, 255, 165, 0);
  pixel.show();
  delay(1000);

  // 노랑
  pixel.setPixelColor(0, 255, 255, 0);
  pixel.show();
  delay(1000);

  // 초록
  pixel.setPixelColor(0, 0, 255, 0);
  pixel.show();
  delay(1000);

  // 파랑
  pixel.setPixelColor(0, 0, 0, 255);
  pixel.show();
  delay(1000);

  // 보라
  pixel.setPixelColor(0, 128, 0, 128);
  pixel.show();
  delay(1000);
}
```

**활동**
1. 좋아하는 색 RGB 값 찾아보기
2. 무지개 색 순서대로 표현하기
3. 색이 천천히 변하는 효과 만들기

---

## 단원 3: 뚜뚜뚜 멜로디 (5~6차시)

### 5차시: 소리의 원리

**학습 목표**
- 소리가 어떻게 만들어지는지 이해한다
- 주파수와 음의 관계를 안다

**학습 내용**

```
┌─────────────────────────────────────────────────────────┐
│                   소리의 원리                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   소리 = 공기의 떨림 (진동)                              │
│                                                         │
│   느린 떨림 (낮은 주파수)    빠른 떨림 (높은 주파수)      │
│   ∿∿∿∿∿∿∿                   ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿            │
│   낮은 소리 🎵               높은 소리 🎶               │
│                                                         │
│   ┌─────────────────────────────────────────┐          │
│   │  음계와 주파수 (Hz)                      │          │
│   │  도(C) = 262Hz                          │          │
│   │  레(D) = 294Hz                          │          │
│   │  미(E) = 330Hz                          │          │
│   │  파(F) = 349Hz                          │          │
│   │  솔(G) = 392Hz                          │          │
│   │  라(A) = 440Hz                          │          │
│   │  시(B) = 494Hz                          │          │
│   │  높은도(C) = 523Hz                      │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 6차시: 멜로디 연주하기

**학습 목표**
- tone() 함수를 사용할 수 있다
- 간단한 멜로디를 연주할 수 있다

**프로그램: 학교 종 연주하기**

```cpp
#define BUZZER_PIN 2   // GPIO2에 부저 연결

// 음계 정의 (주파수)
#define NOTE_C4 262
#define NOTE_D4 294
#define NOTE_E4 330
#define NOTE_F4 349
#define NOTE_G4 392
#define NOTE_A4 440
#define NOTE_B4 494
#define NOTE_C5 523

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  // 학교 종: 솔솔라라 솔솔미
  playNote(NOTE_G4, 400);
  playNote(NOTE_G4, 400);
  playNote(NOTE_A4, 400);
  playNote(NOTE_A4, 400);
  playNote(NOTE_G4, 400);
  playNote(NOTE_G4, 400);
  playNote(NOTE_E4, 800);

  delay(500);

  // 솔솔미미 레레도
  playNote(NOTE_G4, 400);
  playNote(NOTE_G4, 400);
  playNote(NOTE_E4, 400);
  playNote(NOTE_E4, 400);
  playNote(NOTE_D4, 400);
  playNote(NOTE_D4, 400);
  playNote(NOTE_C4, 800);

  delay(2000);  // 2초 쉬고 반복
}

void playNote(int frequency, int duration) {
  tone(BUZZER_PIN, frequency, duration);
  delay(duration + 50);  // 음 사이 짧은 쉼
}
```

**활동**
1. 도레미파솔라시도 연주하기
2. 좋아하는 노래 멜로디 만들기
3. 음의 길이(박자) 조절해보기

---

## 단원 4: 버튼을 눌러봐! (7~8차시)

### 7차시: 입력과 출력

**학습 목표**
- 입력과 출력의 개념을 이해한다
- 스위치의 작동 원리를 안다

**학습 내용**

```
┌─────────────────────────────────────────────────────────┐
│                  입력과 출력                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   입력 (INPUT)              출력 (OUTPUT)               │
│   ┌─────────┐              ┌─────────┐                 │
│   │ 🔘 버튼  │              │ 💡 LED   │                 │
│   │ 🌡️ 센서  │  →  🧠  →   │ 🔊 스피커│                 │
│   │ 🎤 마이크│     ESP32   │ 📺 화면  │                 │
│   └─────────┘              └─────────┘                 │
│                                                         │
│   정보를 받는 것           정보를 보내는 것              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**스위치 작동 원리**

```
버튼 안 누름               버튼 누름
┌─────────────┐           ┌─────────────┐
│     VCC     │           │     VCC     │
│      │      │           │      │      │
│    ┌─┴─┐    │           │    ┌─┴─┐    │
│    │ R │    │           │    │ R │    │
│    └─┬─┘    │           │    └─┬─┘    │
│      │      │           │      │      │
│   ───┤      │           │   ───┼───   │  ← 연결됨!
│   GPIO3     │           │   GPIO3     │
│      │      │           │      │      │
│    ──┴──    │           │    ──┴──    │
│    GND      │           │    GND      │
└─────────────┘           └─────────────┘
  읽은 값: HIGH              읽은 값: LOW
```

---

### 8차시: 버튼으로 LED 제어하기

**학습 목표**
- digitalRead() 함수를 사용할 수 있다
- 버튼 입력에 따라 동작을 제어할 수 있다

**프로그램: 버튼으로 LED 켜고 끄기**

```cpp
#include <Adafruit_NeoPixel.h>

#define LED_PIN 4
#define BUTTON_PIN 3

Adafruit_NeoPixel pixel(1, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  pixel.begin();
  pixel.setBrightness(50);
  pinMode(BUTTON_PIN, INPUT_PULLUP);  // 내부 풀업 사용
}

void loop() {
  // 버튼 상태 읽기
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW) {  // 버튼 눌림
    // LED 빨간색으로 켜기
    pixel.setPixelColor(0, 255, 0, 0);
    pixel.show();
  } else {  // 버튼 안 눌림
    // LED 끄기
    pixel.setPixelColor(0, 0, 0, 0);
    pixel.show();
  }
}
```

**프로그램: 버튼 누를 때마다 색 바꾸기**

```cpp
#include <Adafruit_NeoPixel.h>

#define LED_PIN 4
#define BUTTON_PIN 3

Adafruit_NeoPixel pixel(1, LED_PIN, NEO_GRB + NEO_KHZ800);

int colorIndex = 0;
bool lastButtonState = HIGH;

void setup() {
  pixel.begin();
  pixel.setBrightness(50);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  // 버튼이 눌렸을 때 (HIGH → LOW 변화)
  if (buttonState == LOW && lastButtonState == HIGH) {
    colorIndex++;
    if (colorIndex > 6) colorIndex = 0;

    // 색상 변경
    switch (colorIndex) {
      case 0: pixel.setPixelColor(0, 255, 0, 0);   break;  // 빨강
      case 1: pixel.setPixelColor(0, 255, 165, 0); break;  // 주황
      case 2: pixel.setPixelColor(0, 255, 255, 0); break;  // 노랑
      case 3: pixel.setPixelColor(0, 0, 255, 0);   break;  // 초록
      case 4: pixel.setPixelColor(0, 0, 0, 255);   break;  // 파랑
      case 5: pixel.setPixelColor(0, 128, 0, 128); break;  // 보라
      case 6: pixel.setPixelColor(0, 0, 0, 0);     break;  // 끄기
    }
    pixel.show();
    delay(200);  // 디바운싱
  }

  lastButtonState = buttonState;
}
```

**활동**
1. 버튼 누르면 LED 켜기
2. 버튼 누를 때마다 색 바꾸기
3. 버튼 누르면 소리 나게 하기

---

## 단원 5: 날씨를 알려줘 (9~10차시)

### 9차시: 온도와 습도 측정하기

**학습 목표**
- 센서의 역할을 이해한다
- AHT20 온습도 센서를 사용할 수 있다

**학습 내용**

```
┌─────────────────────────────────────────────────────────┐
│                  센서란 무엇일까요?                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   센서 = 감각 기관 (눈, 코, 귀, 피부...)                 │
│                                                         │
│   사람          센서                                    │
│   👁️ 눈    →    📷 카메라 (빛 감지)                     │
│   👂 귀    →    🎤 마이크 (소리 감지)                   │
│   🖐️ 피부  →    🌡️ 온도 센서 (온도 감지)                │
│   👃 코    →    💨 가스 센서 (냄새 감지)                │
│                                                         │
│   AHT20 센서 = 온도 + 습도를 측정하는 센서               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**I2C 통신이란?**

```
┌─────────────────────────────────────────────────────────┐
│                    I2C 통신                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ESP32C3 ─────────────────────── 센서들                │
│           │ SDA (데이터 선) │                           │
│           │ SCL (클럭 선)   │                           │
│           └─────────────────┘                           │
│                                                         │
│   📦 주소로 구분!                                       │
│   AHT20 주소: 0x38                                      │
│   OLED 주소: 0x3C                                       │
│                                                         │
│   하나의 선으로 여러 장치와 대화할 수 있어요!            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 10차시: 온습도 측정 프로그램

**프로그램: 온습도 측정하기**

```cpp
#include <Wire.h>
#include <AHTxx.h>

// I2C 핀 설정
#define SDA_PIN 5
#define SCL_PIN 6

AHTxx aht20(AHTXX_ADDRESS_X38, AHT2x_SENSOR);

void setup() {
  Serial.begin(115200);

  // I2C 초기화
  Wire.begin(SDA_PIN, SCL_PIN);

  // AHT20 초기화
  if (aht20.begin()) {
    Serial.println("AHT20 센서 연결 성공!");
  } else {
    Serial.println("AHT20 센서 연결 실패!");
  }
}

void loop() {
  // 온도와 습도 읽기
  float temperature = aht20.readTemperature();
  float humidity = aht20.readHumidity();

  // 시리얼 모니터에 출력
  Serial.print("온도: ");
  Serial.print(temperature, 1);
  Serial.print("°C, 습도: ");
  Serial.print(humidity, 1);
  Serial.println("%");

  delay(2000);  // 2초마다 측정
}
```

**활동**
1. 현재 온도와 습도 측정하기
2. 손으로 센서 감싸서 온도 변화 관찰하기
3. 입김 불어서 습도 변화 관찰하기

---

## 단원 6: 화면에 보여줘 (11~12차시)

### 11차시: OLED 디스플레이 사용하기

**학습 목표**
- OLED 디스플레이의 원리를 이해한다
- 화면에 글자를 표시할 수 있다

**학습 내용**

```
┌─────────────────────────────────────────────────────────┐
│                  OLED 디스플레이                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   OLED = 스스로 빛나는 작은 점들의 모임                   │
│                                                         │
│   ┌─────────────────────────────────┐                  │
│   │ ■ ■ □ ■ ■ □ □ ■ ■ □ ... │ ← 128개 점             │
│   │ ■ □ ■ □ ■ □ ■ □ ■ □ ... │                        │
│   │ □ ■ ■ ■ □ ■ ■ ■ □ ■ ... │ ← 64줄                 │
│   │ ...                       │                        │
│   └─────────────────────────────────┘                  │
│                                                         │
│   128 x 64 = 8,192개의 점으로 그림과 글자 표현!          │
│                                                         │
│   ■ = 켜진 점 (밝음)                                    │
│   □ = 꺼진 점 (어두움)                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**프로그램: OLED에 글자 표시하기**

```cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SDA_PIN 5
#define SCL_PIN 6
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Wire.begin(SDA_PIN, SCL_PIN);

  // OLED 초기화
  if (display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED 연결 성공!");
  }

  // 화면 지우기
  display.clearDisplay();

  // 글자 설정
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);

  // 글자 표시
  display.setCursor(10, 10);
  display.println("Hello!");
  display.setCursor(10, 35);
  display.println("ESP32C3");

  // 화면에 출력
  display.display();
}

void loop() {
  // 아무것도 안 함
}
```

---

### 12차시: 종합 프로젝트 - 미니 날씨 스테이션

**학습 목표**
- 배운 내용을 종합하여 프로젝트를 완성한다
- 창의적으로 기능을 추가할 수 있다

**프로그램: 미니 날씨 스테이션**

```cpp
#include <Wire.h>
#include <AHTxx.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_NeoPixel.h>

// 핀 설정
#define SDA_PIN 5
#define SCL_PIN 6
#define LED_PIN 4
#define BUTTON_PIN 3
#define BUZZER_PIN 2

// 객체 생성
AHTxx aht20(AHTXX_ADDRESS_X38, AHT2x_SENSOR);
Adafruit_SSD1306 display(128, 64, &Wire, -1);
Adafruit_NeoPixel pixel(1, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  Serial.begin(115200);
  Wire.begin(SDA_PIN, SCL_PIN);

  // 초기화
  aht20.begin();
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  pixel.begin();
  pixel.setBrightness(50);

  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);

  // 시작 알림
  tone(BUZZER_PIN, 1000, 200);
}

void loop() {
  // 온습도 측정
  float temp = aht20.readTemperature();
  float humi = aht20.readHumidity();

  // OLED 표시
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  display.setCursor(0, 0);
  display.println("=== Weather Station ===");

  display.setTextSize(2);
  display.setCursor(0, 20);
  display.print("T:");
  display.print(temp, 1);
  display.println("C");

  display.setCursor(0, 45);
  display.print("H:");
  display.print(humi, 1);
  display.println("%");

  display.display();

  // 온도에 따라 LED 색상 변경
  if (temp < 18) {
    pixel.setPixelColor(0, 0, 0, 255);    // 파랑 (추움)
  } else if (temp < 26) {
    pixel.setPixelColor(0, 0, 255, 0);    // 초록 (쾌적)
  } else {
    pixel.setPixelColor(0, 255, 0, 0);    // 빨강 (더움)
  }
  pixel.show();

  // 버튼 누르면 현재 상태 알림음
  if (digitalRead(BUTTON_PIN) == LOW) {
    if (temp < 18) {
      tone(BUZZER_PIN, 262, 500);  // 낮은 음 (추움)
    } else if (temp < 26) {
      tone(BUZZER_PIN, 523, 500);  // 높은 음 (쾌적)
    } else {
      tone(BUZZER_PIN, 1000, 500); // 경고음 (더움)
    }
    delay(600);
  }

  delay(1000);
}
```

**활동**
1. 미니 날씨 스테이션 완성하기
2. 나만의 기능 추가하기
   - 습도가 높으면 특별한 색 표시
   - 버튼 길게 누르면 다른 정보 표시
3. 친구들에게 내 작품 발표하기

---

## 부록: 필요한 라이브러리

Arduino IDE에서 설치할 라이브러리:

| 라이브러리 | 용도 | 설치 방법 |
|-----------|------|----------|
| Adafruit NeoPixel | WS2812 RGB LED | 라이브러리 관리자 검색 |
| AHTxx | AHT20 온습도 센서 | 라이브러리 관리자 검색 |
| Adafruit SSD1306 | OLED 디스플레이 | 라이브러리 관리자 검색 |
| Adafruit GFX Library | 그래픽 라이브러리 | 라이브러리 관리자 검색 |

---

## 부록: Arduino IDE ESP32C3 설정

1. **보드 매니저 URL 추가**
   - 파일 → 기본 설정 → 추가 보드 매니저 URLs
   - `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`

2. **ESP32 보드 설치**
   - 툴 → 보드 → 보드 매니저
   - "ESP32" 검색 후 설치

3. **보드 선택**
   - 툴 → 보드 → ESP32 Arduino → ESP32C3 Dev Module

4. **포트 선택**
   - 툴 → 포트 → COM포트 선택

---

*커리큘럼 작성: 2026-02-15*
