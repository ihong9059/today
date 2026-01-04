# ESP32-WROOM TinyML AI 테스트 가이드

**작성일:** 2026년 1월 4일
**대상 하드웨어:** ESP32-WROOM (38핀 DevKitC)
**참조 문서:** edge_ai_tinyml_보고서.md, ESP32_회로도_분석_보고서.md

---

## 1. 개요

본 문서는 ESP32-WROOM 보드를 활용하여 TinyML(소형 AI)을 테스트하는 방법을 안내합니다. ESP32-S3의 Xtensa LX7 코어(240MHz, 512KB SRAM)는 TinyML 실행에 적합한 사양을 갖추고 있습니다.

### 1.1 ESP32 TinyML 적합성

| 항목 | ESP32-WROOM 사양 | TinyML 요구사항 | 적합성 |
|------|------------------|-----------------|--------|
| CPU | Xtensa LX7 Dual Core | ARM Cortex-M0~M7 또는 동급 | ✅ 적합 |
| 클럭 속도 | 240MHz | 16MHz ~ 400MHz | ✅ 적합 |
| RAM | 520KB SRAM | 16KB ~ 512KB | ✅ 적합 |
| Flash | 4MB (외장) | 64KB ~ 2MB | ✅ 적합 |
| 전력 소비 | ~100mW (활성) | 1μW ~ 100mW | ✅ 적합 |

---

## 2. 하드웨어 준비

### 2.1 필수 구성품 (회로도 기반)

| 구성품 | 용도 | GPIO 핀 |
|--------|------|---------|
| ESP32-DevKitC (U15) | 메인 MCU | - |
| AHT20 온습도 센서 (U10) | 환경 데이터 수집 | SDA: IO21, SCL: IO22 |
| OLED 디스플레이 (U9) | 결과 표시 | SDA: IO21, SCL: IO22 |
| 택트 스위치 (SW1) | 사용자 입력 | IO32 |
| LED (U6, U7, U8) | 상태 표시 | RED: IO25, YELLOW: IO26, BLUE: IO27 |
| 버저 (BUZ1, BUZ2) | 알림음 | BEEP: IO14, MELODY: IO33 |

### 2.2 추가 권장 센서 (AI 테스트용)

| 센서 | 용도 | 연결 방식 | 추천 AI 모델 |
|------|------|-----------|--------------|
| INMP441 마이크 | 음성/소리 인식 | I2S | 키워드 감지 |
| MPU6050 가속도계 | 동작 인식 | I2C | 제스처 분류 |
| OV2640 카메라 | 이미지 인식 | DVP/SPI | 객체 감지 |
| MAX30102 심박 센서 | 생체 신호 | I2C | 심박 이상 감지 |

---

## 3. TinyML 프레임워크 선택

### 3.1 권장 프레임워크 비교

| 프레임워크 | 난이도 | ESP32 지원 | 장점 | 단점 |
|------------|--------|------------|------|------|
| **Edge Impulse** | ⭐ 쉬움 | ✅ 우수 | 웹 기반, AutoML, 무료 | 인터넷 필요 |
| **TensorFlow Lite Micro** | ⭐⭐ 중간 | ✅ 우수 | 공식 지원, 문서 풍부 | 설정 복잡 |
| **EloquentTinyML** | ⭐ 쉬움 | ✅ 우수 | Arduino 친화적 | 기능 제한 |
| **microTVM** | ⭐⭐⭐ 어려움 | ⚠️ 제한적 | 최적화 우수 | 학습 곡선 높음 |

**추천:** 초보자는 **Edge Impulse**, 중급자는 **TensorFlow Lite Micro** 사용

---

## 4. AI 테스트 시나리오

### 4.1 시나리오 1: 환경 모니터링 AI (AHT20 센서 활용)

**목표:** 온습도 데이터를 학습하여 이상 환경 감지

**적용 AI 유형:** TinyML (Cortex-M4 급, 128KB RAM 이하)

```
[데이터 흐름]
AHT20 센서 → I2C(IO21, IO22) → ESP32 → TinyML 추론 → OLED/LED 출력
```

**구현 단계:**

1. **데이터 수집** (1~2일)
   ```cpp
   // 1시간마다 온습도 데이터 수집
   #include <Adafruit_AHTX0.h>

   Adafruit_AHTX0 aht;

   void collectData() {
     sensors_event_t humidity, temp;
     aht.getEvent(&humidity, &temp);

     // SD카드 또는 Serial로 데이터 저장
     Serial.printf("%f,%f\n", temp.temperature, humidity.relative_humidity);
   }
   ```

2. **모델 학습** (Edge Impulse 사용)
   - Edge Impulse 프로젝트 생성
   - 수집한 CSV 데이터 업로드
   - Anomaly Detection 모델 선택
   - 학습 후 Arduino 라이브러리 다운로드

3. **모델 배포 및 추론**
   ```cpp
   #include <edge-impulse-sdk/classifier/ei_run_classifier.h>

   void runInference() {
     signal_t signal;
     ei_impulse_result_t result;

     // 센서 데이터를 signal에 복사
     EI_IMPULSE_ERROR err = run_classifier(&signal, &result, false);

     if (result.anomaly > 0.5) {
       digitalWrite(PIN_LED_RED, HIGH);  // 이상 감지
       tone(PIN_BEEP, 1000, 500);
     }
   }
   ```

---

### 4.2 시나리오 2: 버튼 패턴 인식 AI (스위치 활용)

**목표:** 사용자의 버튼 누름 패턴을 학습하여 사용자 식별 또는 명령 인식

**적용 AI 유형:** TinyML (32KB RAM 이하)

```
[데이터 흐름]
SW1(IO32) → 패턴 수집 → ESP32 → TinyML 분류 → LED 색상 출력
```

**구현 단계:**

1. **패턴 정의**
   - 패턴 A: 짧게 3번
   - 패턴 B: 길게 1번
   - 패턴 C: 짧게-길게-짧게

2. **데이터 수집 코드**
   ```cpp
   #define PIN_SWITCH 32

   unsigned long pressTime[10];
   int pressCount = 0;

   void recordPattern() {
     static unsigned long lastPress = 0;

     if (digitalRead(PIN_SWITCH) == LOW) {
       unsigned long duration = millis() - lastPress;
       pressTime[pressCount++] = duration;
       lastPress = millis();
     }
   }
   ```

3. **출력 매핑**
   - 패턴 A → RED LED (IO25)
   - 패턴 B → YELLOW LED (IO26)
   - 패턴 C → BLUE LED (IO27)

---

### 4.3 시나리오 3: 음성 키워드 감지 (마이크 추가 필요)

**목표:** "안녕", "불 켜줘" 등 간단한 음성 명령 인식

**적용 AI 유형:** TinyML ~ Embedded AI (256KB ~ 512KB RAM)

**추가 하드웨어:**
- INMP441 I2S 마이크
- 연결: BCLK → IO14*, WS → IO15*, SD → IO32*
  (*기존 핀과 충돌 시 테스트 포인트 TP1~TP4 활용)

**모델 권장:**
- Micro Speech (TensorFlow 공식 예제)
- Edge Impulse Audio Classification

---

### 4.4 시나리오 4: 제스처 인식 (가속도계 추가 필요)

**목표:** 보드 흔들기, 기울이기 등 동작 인식

**적용 AI 유형:** TinyML (128KB RAM)

**추가 하드웨어:**
- MPU6050 6축 IMU
- 연결: I2C (SDA: IO21, SCL: IO22) - 기존 I2C 버스 공유

**인식 가능한 제스처:**
- 위/아래 흔들기
- 좌/우 흔들기
- 회전
- 두드리기

---

## 5. 개발 환경 설정

### 5.1 Arduino IDE 설정

```
1. 보드 매니저에 ESP32 추가
   URL: https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json

2. 보드 선택: ESP32 Dev Module

3. 필수 라이브러리 설치:
   - Adafruit AHTX0 (온습도 센서)
   - Adafruit SSD1306 (OLED)
   - TensorFlow Lite Micro (TinyML)
```

### 5.2 Edge Impulse CLI 설치

```bash
# Node.js 설치 후
npm install -g edge-impulse-cli

# ESP32 연결 및 데이터 수집
edge-impulse-data-forwarder
```

### 5.3 PlatformIO 설정 (권장)

```ini
; platformio.ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200

lib_deps =
    adafruit/Adafruit AHTX0@^2.0.3
    adafruit/Adafruit SSD1306@^2.5.7
    eloquentarduino/EloquentTinyML@^2.4.0
```

---

## 6. 단계별 테스트 가이드

### 6.1 1단계: 하드웨어 검증 (필수)

```cpp
// 모든 GPIO 동작 확인
void setup() {
  Serial.begin(115200);

  // LED 테스트
  pinMode(25, OUTPUT); // RED
  pinMode(26, OUTPUT); // YELLOW
  pinMode(27, OUTPUT); // BLUE

  // 스위치 테스트
  pinMode(32, INPUT_PULLUP);

  // I2C 스캔
  Wire.begin(21, 22);
  scanI2C();
}

void scanI2C() {
  for (byte addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    if (Wire.endTransmission() == 0) {
      Serial.printf("I2C device at 0x%02X\n", addr);
    }
  }
  // 예상 결과: 0x38 (AHT20), 0x3C (OLED)
}
```

### 6.2 2단계: 센서 데이터 수집

```cpp
// AHT20 데이터 수집 (최소 100개 샘플)
#include <Adafruit_AHTX0.h>

Adafruit_AHTX0 aht;
int sampleCount = 0;

void setup() {
  Serial.begin(115200);
  aht.begin();
}

void loop() {
  sensors_event_t humidity, temp;
  aht.getEvent(&humidity, &temp);

  // CSV 형식으로 출력
  Serial.printf("%d,%.2f,%.2f\n",
    sampleCount++,
    temp.temperature,
    humidity.relative_humidity);

  delay(1000); // 1초 간격
}
```

### 6.3 3단계: Edge Impulse 모델 생성

1. **https://edgeimpulse.com 접속 및 프로젝트 생성**

2. **데이터 업로드**
   - Data acquisition → Upload data
   - CSV 파일 업로드

3. **Impulse 설계**
   ```
   Input Block: Time series data (온도, 습도)
   Processing Block: Spectral Analysis 또는 Raw Data
   Learning Block: Anomaly Detection (K-means)
   ```

4. **학습 및 테스트**
   - Training → Start training
   - Model testing → Classify all

5. **Arduino 라이브러리 내보내기**
   - Deployment → Arduino library
   - Build → Download

### 6.4 4단계: 모델 배포 및 실행

```cpp
// Edge Impulse 모델 실행 예제
#include <your_project_name_inferencing.h>
#include <Adafruit_AHTX0.h>

#define PIN_LED_RED    25
#define PIN_LED_YELLOW 26
#define PIN_LED_BLUE   27
#define PIN_BEEP       14

Adafruit_AHTX0 aht;

// 추론용 버퍼
float features[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE];

void setup() {
  Serial.begin(115200);
  aht.begin();

  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_LED_YELLOW, OUTPUT);
  pinMode(PIN_LED_BLUE, OUTPUT);
  pinMode(PIN_BEEP, OUTPUT);

  Serial.println("TinyML Model Loaded!");
  Serial.printf("Model input size: %d\n", EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE);
}

void loop() {
  // 센서 데이터 수집
  sensors_event_t humidity, temp;
  aht.getEvent(&humidity, &temp);

  // 특징 벡터 구성
  features[0] = temp.temperature;
  features[1] = humidity.relative_humidity;

  // 추론 실행
  signal_t signal;
  signal.total_length = sizeof(features) / sizeof(features[0]);
  signal.get_data = &get_signal_data;

  ei_impulse_result_t result;
  EI_IMPULSE_ERROR err = run_classifier(&signal, &result, false);

  if (err != EI_IMPULSE_OK) {
    Serial.printf("Classifier error: %d\n", err);
    return;
  }

  // 결과 출력
  Serial.printf("Anomaly score: %.3f\n", result.anomaly);

  // LED 표시
  if (result.anomaly > 0.8) {
    // 심각한 이상
    digitalWrite(PIN_LED_RED, HIGH);
    tone(PIN_BEEP, 2000, 200);
  } else if (result.anomaly > 0.5) {
    // 경미한 이상
    digitalWrite(PIN_LED_YELLOW, HIGH);
  } else {
    // 정상
    digitalWrite(PIN_LED_BLUE, HIGH);
  }

  delay(100);

  // LED 리셋
  digitalWrite(PIN_LED_RED, LOW);
  digitalWrite(PIN_LED_YELLOW, LOW);
  digitalWrite(PIN_LED_BLUE, LOW);

  delay(1000);
}

int get_signal_data(size_t offset, size_t length, float *out_ptr) {
  memcpy(out_ptr, features + offset, length * sizeof(float));
  return 0;
}
```

---

## 7. 성능 모니터링

### 7.1 메모리 사용량 확인

```cpp
void printMemoryInfo() {
  Serial.printf("Free Heap: %d bytes\n", ESP.getFreeHeap());
  Serial.printf("Min Free Heap: %d bytes\n", ESP.getMinFreeHeap());
  Serial.printf("Free PSRAM: %d bytes\n", ESP.getFreePsram());
}
```

### 7.2 추론 시간 측정

```cpp
unsigned long startTime = millis();
run_classifier(&signal, &result, false);
unsigned long inferenceTime = millis() - startTime;

Serial.printf("Inference time: %lu ms\n", inferenceTime);
// TinyML 목표: < 10ms
```

### 7.3 전력 소비 측정

```cpp
// 딥 슬립 모드 활용
void enterDeepSleep(int seconds) {
  esp_sleep_enable_timer_wakeup(seconds * 1000000ULL);
  esp_deep_sleep_start();
}

// 배터리 전압 모니터링 (ADC 핀 사용 시)
float readBatteryVoltage() {
  int raw = analogRead(36); // VP (TP1)
  return (raw / 4095.0) * 3.3 * 2; // 분압 회로 가정
}
```

---

## 8. 문제 해결

### 8.1 일반적인 오류

| 오류 | 원인 | 해결책 |
|------|------|--------|
| `EI_IMPULSE_ERROR_DSP` | 입력 크기 불일치 | features 배열 크기 확인 |
| `Not enough memory` | RAM 부족 | 모델 양자화(INT8) 적용 |
| `I2C device not found` | 배선 오류 | SDA/SCL 연결, 풀업 저항 확인 |
| `Model too large` | Flash 부족 | 모델 pruning, 경량 아키텍처 선택 |

### 8.2 최적화 팁

1. **INT8 양자화**: 모델 크기 75% 감소, 정확도 손실 1-3%
2. **Pruning**: 불필요한 가중치 제거로 50-90% 크기 감소
3. **PSRAM 활용**: ESP32-WROVER 사용 시 4MB 추가 메모리

---

## 9. 확장 프로젝트 아이디어

### 9.1 스마트 홈 적용

| 프로젝트 | 센서 | AI 기능 | 난이도 |
|----------|------|---------|--------|
| 에어컨 자동 제어 | AHT20 | 사용 패턴 학습 | ⭐ |
| 침입 감지 | PIR + 마이크 | 이상 소리/움직임 감지 | ⭐⭐ |
| 식물 관리 | 토양 수분 센서 | 관수 시점 예측 | ⭐ |

### 9.2 웨어러블 적용

| 프로젝트 | 센서 | AI 기능 | 난이도 |
|----------|------|---------|--------|
| 활동 추적기 | MPU6050 | 걷기/뛰기/앉기 분류 | ⭐⭐ |
| 낙상 감지 | MPU6050 | 갑작스러운 충격 감지 | ⭐⭐ |
| 수면 분석 | 심박 센서 | 수면 단계 추론 | ⭐⭐⭐ |

### 9.3 산업용 적용 (LoRa 모듈 활용)

| 프로젝트 | 센서 | AI 기능 | 난이도 |
|----------|------|---------|--------|
| 예지 정비 | 진동 센서 | 기계 이상 감지 | ⭐⭐ |
| 환경 모니터링 | 다중 센서 | 이상 환경 경보 | ⭐⭐ |

---

## 10. 참고 자료

### 10.1 공식 문서
- [TensorFlow Lite Micro](https://www.tensorflow.org/lite/microcontrollers)
- [Edge Impulse Documentation](https://docs.edgeimpulse.com/)
- [ESP32 Arduino Core](https://docs.espressif.com/projects/arduino-esp32/)

### 10.2 튜토리얼
- [Edge Impulse + ESP32 시작하기](https://docs.edgeimpulse.com/docs/edge-impulse-studio/data-acquisition)
- [TFLite Micro Hello World](https://github.com/tensorflow/tflite-micro/tree/main/tensorflow/lite/micro/examples/hello_world)

### 10.3 커뮤니티
- [TinyML Foundation](https://www.tinyml.org/)
- [ESP32 Forum](https://esp32.com/)

---

## 11. 결론

ESP32-WROOM 보드는 TinyML 테스트에 적합한 플랫폼입니다. 기존 회로에 연결된 AHT20 온습도 센서와 OLED 디스플레이를 활용하여 환경 모니터링 AI를 즉시 시작할 수 있습니다.

**권장 시작 순서:**
1. 하드웨어 검증 (I2C 스캔, LED/버저 테스트)
2. Edge Impulse로 간단한 이상 감지 모델 생성
3. 모델 배포 및 실시간 추론 테스트
4. 추가 센서 연결로 기능 확장

**예상 소요 시간:**
- 환경 설정: 1~2시간
- 데이터 수집: 1~2일
- 모델 학습: 30분~1시간
- 배포 및 테스트: 1~2시간

---

*본 가이드는 edge_ai_tinyml_보고서.md 및 ESP32_회로도_분석_보고서.md를 기반으로 작성되었습니다.*
