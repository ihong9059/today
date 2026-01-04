# Raspberry Pi + ESP32-C3 교육보드 AI 적용 프로젝트 검토 보고서

**작성일:** 2026년 1월 4일
**검토 대상:** raspberry_esp32c3 (UTTEC Shield) 90일 커리큘럼
**참조 문서:** edge_ai_tinyml_보고서.md, ESP32_TinyML_AI_테스트_가이드.md

---

## 1. 하드웨어 분석

### 1.1 교육보드 구성 요약

| 구성품 | 사양 | AI 활용 가능성 |
|--------|------|----------------|
| **Raspberry Pi** | ARM Cortex-A72, 4GB RAM | ✅ Edge AI 적합 |
| **ESP32-C3** | RISC-V, 400KB SRAM | ✅ TinyML 적합 |
| **AHT20** | 온습도 센서 (I2C 0x38) | ✅ 환경 AI |
| **OLED** | 128x64 SSD1306 | ✅ 결과 표시 |
| **LED 3색** | RED/YELLOW/BLUE | ✅ 상태 표시 |
| **NeoPixel** | WS2812 x4 | ✅ 시각화 |
| **버저/스피커** | PWM 출력 | ✅ 음성 알림 |
| **스위치** | 입력 (Active LOW) | ✅ 사용자 인터페이스 |

### 1.2 AI 유형별 플랫폼 적합성

| AI 유형 | Raspberry Pi | ESP32-C3 | 적합도 |
|---------|--------------|----------|--------|
| **TinyML** | 오버스펙 | ⭐ 최적 | ✅ |
| **Embedded AI** | ⭐ 최적 | 부족 | ✅ |
| **Edge AI** | ⭐ 최적 | 불가 | ✅ |
| **On-Device AI** | ⭐ 가능 | 제한적 | ✅ |

---

## 2. 커리큘럼 AI 확장 가능 분석

### 2.1 초급 과정 (Day 1-15) - AI 기초 통합 가능

| Day | 현재 프로젝트 | AI 확장 가능 프로젝트 | 난이도 |
|-----|--------------|----------------------|--------|
| 7 | 온습도 센서 읽기 | **AI 온습도 이상 감지** | ⭐ |
| 9 | OLED에 센서 표시 | **AI 환경 예측 표시** | ⭐ |
| 10 | NeoPixel 무지개 | **AI 온도 기반 색상 매핑** | ⭐ |
| 15 | 스마트 환경 모니터 | **AI 이상 환경 알림 시스템** | ⭐⭐ |

### 2.2 중급 과정 (Day 16-45) - AI 핵심 적용

| Day | 현재 프로젝트 | AI 확장 가능 프로젝트 | 난이도 |
|-----|--------------|----------------------|--------|
| 19 | 온도 기반 LED 표시 | **AI 온도 패턴 학습 LED** | ⭐⭐ |
| 20 | 알람 시스템 | **AI 예측 기반 사전 알람** | ⭐⭐ |
| 33-36 | 센서 데이터 로깅 | **AI 시계열 예측 대시보드** | ⭐⭐⭐ |
| 40-45 | 스마트 환경 모니터 v2 | **AI 통합 스마트 환경 시스템** | ⭐⭐⭐ |

### 2.3 고급 과정 (Day 46-90) - AI 고급 적용

| Day | 현재 프로젝트 | AI 확장 가능 프로젝트 | 난이도 |
|-----|--------------|----------------------|--------|
| 53-55 | 자동화 시스템 | **AI 기반 자동화 규칙 학습** | ⭐⭐⭐ |
| 79-82 | 음성 제어 | **AI 음성 인식 및 명령 처리** | ⭐⭐⭐⭐ |
| 83-90 | 최종 프로젝트 | **완전한 AI 스마트홈 시스템** | ⭐⭐⭐⭐ |

---

## 3. 권장 AI 프로젝트 상세

### 3.1 프로젝트 1: AI 환경 이상 감지 시스템 (초급)

**목표:** AHT20 센서 데이터를 학습하여 비정상 환경 자동 감지

**AI 유형:** TinyML (Anomaly Detection)

**아키텍처:**
```
[AHT20 센서] → [Raspberry Pi] → [TinyML 추론] → [LED/부저 알림]
                    ↓
              [OLED 표시]
```

**구현 방법:**
1. **데이터 수집 (Day 7 확장)**
   - 정상 환경 데이터 1주일 수집
   - CSV 형식 저장 (시간, 온도, 습도)

2. **모델 학습**
   - Edge Impulse 또는 scikit-learn 사용
   - Anomaly Detection (Isolation Forest 또는 K-Means)

3. **추론 및 알림**
   ```python
   # 예시 코드 구조
   from sklearn.ensemble import IsolationForest
   import joblib

   model = joblib.load('anomaly_model.pkl')

   def check_anomaly(temp, humidity):
       prediction = model.predict([[temp, humidity]])
       if prediction[0] == -1:  # 이상 감지
           set_led('RED', ON)
           sound_alarm()
           display_warning()
   ```

**필요 라이브러리:**
```bash
pip3 install scikit-learn joblib numpy pandas
```

**예상 모델 크기:** < 1MB
**추론 시간:** < 10ms

---

### 3.2 프로젝트 2: AI 환경 예측 시스템 (중급)

**목표:** 과거 데이터를 기반으로 미래 온습도 예측

**AI 유형:** Embedded AI (Time Series Forecasting)

**아키텍처:**
```
[SQLite DB] → [시계열 모델] → [예측 결과]
     ↑              ↓
[AHT20] ←→ [Raspberry Pi] → [웹 대시보드]
                   ↓
             [OLED 그래프]
```

**구현 방법:**
1. **데이터 로깅 (Day 33-34 확장)**
   - 1분 간격 센서 데이터 저장
   - 최소 1주일 데이터 축적

2. **모델 선택**
   | 모델 | 복잡도 | 정확도 | Raspberry Pi 적합성 |
   |------|--------|--------|---------------------|
   | ARIMA | 낮음 | 중간 | ⭐ 최적 |
   | Prophet | 중간 | 높음 | ⭐ 적합 |
   | LSTM | 높음 | 높음 | ⚠️ 무거움 |
   | TensorFlow Lite | 중간 | 높음 | ⭐ 적합 |

3. **웹 대시보드 (Day 36 확장)**
   ```javascript
   // Chart.js로 예측 그래프 표시
   fetch('/api/predict?hours=24')
     .then(res => res.json())
     .then(data => {
       chart.data.datasets[0].data = data.actual;
       chart.data.datasets[1].data = data.predicted;
       chart.update();
     });
   ```

**필요 라이브러리:**
```bash
pip3 install prophet statsmodels tensorflow-lite
```

---

### 3.3 프로젝트 3: AI 음성 명령 시스템 (고급)

**목표:** 음성으로 LED, 부저, NeoPixel 제어

**AI 유형:** Edge AI (Speech Recognition)

**추가 하드웨어:**
- USB 마이크 또는 I2S 마이크 (INMP441)

**아키텍처:**
```
[마이크] → [Raspberry Pi] → [음성 인식 AI] → [명령 파싱]
                                    ↓
                              [하드웨어 제어]
                              - LED ON/OFF
                              - 부저 알림
                              - NeoPixel 색상
```

**구현 옵션:**

| 옵션 | 오프라인 | 정확도 | 복잡도 |
|------|----------|--------|--------|
| Vosk | ⭐ 가능 | 중간 | 낮음 |
| Whisper (tiny) | ⭐ 가능 | 높음 | 중간 |
| Google Speech API | ❌ 온라인 | 높음 | 낮음 |
| Edge Impulse Audio | ⭐ 가능 | 중간 | 낮음 |

**권장 명령어 세트:**
```python
COMMANDS = {
    "불 켜": lambda: set_led('ALL', ON),
    "불 꺼": lambda: set_led('ALL', OFF),
    "빨간불": lambda: set_led('RED', ON),
    "온도 알려줘": lambda: speak_temperature(),
    "무지개": lambda: neopixel_rainbow(),
    "알람 울려": lambda: sound_alarm(),
}
```

**Vosk 구현 예시:**
```python
from vosk import Model, KaldiRecognizer
import pyaudio

model = Model("vosk-model-small-ko")
rec = KaldiRecognizer(model, 16000)

def recognize_command():
    p = pyaudio.PyAudio()
    stream = p.open(format=pyaudio.paInt16, channels=1,
                    rate=16000, input=True, frames_per_buffer=8000)

    while True:
        data = stream.read(4000)
        if rec.AcceptWaveform(data):
            result = json.loads(rec.Result())
            command = result.get('text', '')
            execute_command(command)
```

---

### 3.4 프로젝트 4: AI 사용자 행동 학습 시스템 (고급)

**목표:** 사용자의 버튼/LED 사용 패턴을 학습하여 자동화

**AI 유형:** Embedded AI (Pattern Recognition)

**데이터 수집:**
```python
# 이벤트 로그 구조
event_log = {
    "timestamp": "2026-01-04 14:30:00",
    "event_type": "button_press",  # or led_on, led_off
    "target": "RED",
    "duration": 3.5,
    "context": {
        "temperature": 24.5,
        "humidity": 45.2,
        "time_of_day": "afternoon"
    }
}
```

**학습 목표:**
- "매일 오후 6시에 파란 LED를 켠다" → 자동 점등 제안
- "온도가 28도 이상이면 알람을 끈다" → 자동 규칙 생성
- "주말 아침에는 NeoPixel 무지개 효과" → 스케줄 학습

**구현:**
```python
from sklearn.tree import DecisionTreeClassifier

# 컨텍스트 기반 행동 예측
features = ['hour', 'day_of_week', 'temperature', 'humidity']
target = 'action'  # led_red_on, led_blue_on, alarm_on, etc.

model = DecisionTreeClassifier()
model.fit(X_train, y_train)

def suggest_action(context):
    prediction = model.predict([context])
    confidence = max(model.predict_proba([context])[0])

    if confidence > 0.8:
        return f"추천: {prediction[0]} (신뢰도: {confidence:.0%})"
```

---

### 3.5 프로젝트 5: ESP32-C3 TinyML 연동 (고급)

**목표:** ESP32-C3에서 TinyML 추론 후 결과를 Raspberry Pi로 전송

**AI 유형:** TinyML (ESP32-C3) + Edge AI (Raspberry Pi)

**아키텍처:**
```
[센서] → [ESP32-C3 TinyML] → [UART] → [Raspberry Pi] → [웹 대시보드]
              ↓
         [로컬 판단]
         (실시간 반응)
```

**장점:**
- ESP32에서 실시간 TinyML 추론 (< 10ms)
- Raspberry Pi는 복잡한 분석/시각화 담당
- WiFi AP를 통한 스마트폰 연동

**UART 프로토콜:**
```json
// ESP32 → Raspberry Pi
{
  "type": "inference",
  "model": "anomaly_detection",
  "result": "normal",
  "confidence": 0.95,
  "sensor": {
    "temperature": 24.5,
    "humidity": 45.2
  }
}

// Raspberry Pi → ESP32
{
  "type": "command",
  "action": "update_threshold",
  "value": 0.8
}
```

---

## 4. AI 프레임워크 권장

### 4.1 Raspberry Pi 권장 프레임워크

| 프레임워크 | 용도 | 설치 |
|------------|------|------|
| **scikit-learn** | 클래식 ML (분류, 회귀, 이상탐지) | `pip3 install scikit-learn` |
| **TensorFlow Lite** | 딥러닝 추론 | `pip3 install tflite-runtime` |
| **Vosk** | 오프라인 음성 인식 | `pip3 install vosk` |
| **OpenCV** | 이미지 처리 (카메라 추가 시) | `pip3 install opencv-python` |
| **Prophet** | 시계열 예측 | `pip3 install prophet` |

### 4.2 ESP32-C3 권장 프레임워크

| 프레임워크 | 용도 | 설치 |
|------------|------|------|
| **TensorFlow Lite Micro** | TinyML 추론 | Arduino 라이브러리 |
| **Edge Impulse** | AutoML + 배포 | 웹 기반 + 라이브러리 |
| **EloquentTinyML** | Arduino 친화적 | Arduino 라이브러리 |

---

## 5. 커리큘럼 AI 통합 로드맵

### 5.1 Phase 1: AI 기초 (Day 7-15 확장)

```
[기존 커리큘럼]          [AI 확장]
Day 7: 온습도 읽기   →   + 데이터 CSV 저장
Day 9: OLED 표시     →   + 이상 감지 결과 표시
Day 15: 스마트 모니터 →  + scikit-learn 이상 탐지
```

### 5.2 Phase 2: AI 중급 (Day 33-45 확장)

```
[기존 커리큘럼]          [AI 확장]
Day 33: SQLite DB    →   + 학습 데이터 저장
Day 36: 웹 그래프    →   + 예측 그래프 표시
Day 40-45: 종합 v2   →   + AI 예측 + 자동 알람
```

### 5.3 Phase 3: AI 고급 (Day 79-90 확장)

```
[기존 커리큘럼]          [AI 확장]
Day 79-82: 음성 제어 →   + Vosk 오프라인 인식
Day 83-90: 최종     →   + 완전한 AI 스마트홈
```

---

## 6. AI 프로젝트 우선순위

### 6.1 즉시 적용 가능 (하드웨어 변경 없음)

| 순위 | 프로젝트 | 난이도 | 예상 기간 |
|------|----------|--------|-----------|
| 1 | AI 환경 이상 감지 | ⭐ | 1-2일 |
| 2 | AI 환경 예측 | ⭐⭐ | 3-5일 |
| 3 | AI 사용자 행동 학습 | ⭐⭐⭐ | 5-7일 |

### 6.2 추가 하드웨어 필요

| 순위 | 프로젝트 | 추가 하드웨어 | 난이도 |
|------|----------|--------------|--------|
| 4 | AI 음성 명령 | USB 마이크 | ⭐⭐⭐ |
| 5 | AI 얼굴 인식 | Pi 카메라 | ⭐⭐⭐⭐ |
| 6 | AI 제스처 인식 | MPU6050 | ⭐⭐⭐ |

---

## 7. 결론 및 권장사항

### 7.1 핵심 발견

1. **Raspberry Pi는 Edge AI에 최적**
   - 4GB RAM으로 대부분의 ML 모델 실행 가능
   - Python 생태계 활용 용이

2. **ESP32-C3는 TinyML에 적합**
   - 실시간 추론 가능 (< 10ms)
   - 저전력 상시 모니터링

3. **기존 센서로 충분한 AI 적용 가능**
   - AHT20 온습도 → 이상 감지, 예측
   - 버튼/LED → 행동 패턴 학습

### 7.2 권장 실행 계획

| 단계 | 프로젝트 | 커리큘럼 위치 | 소요 시간 |
|------|----------|--------------|-----------|
| 1단계 | AI 환경 이상 감지 | Day 15 확장 | 2일 |
| 2단계 | AI 환경 예측 | Day 36 확장 | 5일 |
| 3단계 | AI 행동 학습 자동화 | Day 55 확장 | 7일 |
| 4단계 | AI 음성 명령 (선택) | Day 82 확장 | 7일 |
| 5단계 | AI 통합 스마트홈 | Day 90 최종 | 10일 |

### 7.3 비용 효율성

| 항목 | 비용 | 비고 |
|------|------|------|
| 추가 하드웨어 | $0 | 기존 센서 활용 |
| 소프트웨어 | $0 | 오픈소스 프레임워크 |
| 클라우드 | $0 | 온디바이스 추론 |

### 7.4 교육적 가치

- **Python ML 실습**: scikit-learn, TensorFlow Lite
- **IoT + AI 통합**: 센서 → 학습 → 추론 → 액션
- **실용적 결과물**: 스마트홈 자동화 시스템
- **확장 가능성**: 카메라, 마이크 추가로 고급 AI

---

## 8. 참고 자료

### 8.1 내부 문서
- `edge_ai_tinyml_보고서.md` - AI 유형별 분류
- `ESP32_TinyML_AI_테스트_가이드.md` - ESP32 TinyML 구현
- `raspberry_esp32c3_커리큘럼.md` - 90일 교육 과정
- `raspberry_esp32c3_포트설명서.md` - GPIO 핀맵

### 8.2 외부 리소스
- [TensorFlow Lite for Raspberry Pi](https://www.tensorflow.org/lite/guide/python)
- [Edge Impulse Raspberry Pi](https://docs.edgeimpulse.com/docs/edge-ai-hardware/cpu/raspberry-pi-4)
- [Vosk 한국어 모델](https://alphacephei.com/vosk/models)
- [scikit-learn 공식 문서](https://scikit-learn.org/)

---

*본 보고서는 raspberry 폴더의 기존 문서와 edge_ai_tinyml_보고서.md를 기반으로 작성되었습니다.*
