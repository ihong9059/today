# AI FanStick MVP 계획서
## 스마트폰 마이크 활용 버전

**작성일:** 2026-02-24
**버전:** 1.0
**목표:** 최소 비용으로 AI 응원봉 핵심 기능 검증

---

## 1. MVP 컨셉 변경

### 1.1 기존 계획 vs MVP 계획

| 항목 | 기존 계획 | MVP (스마트폰 마이크) |
|------|----------|----------------------|
| 마이크 | 응원봉 내장 (ICS-43434) | **스마트폰 내장 마이크** |
| 음성 처리 | 응원봉 → BLE → 폰 → AI | **폰에서 직접 처리** |
| 응원봉 역할 | 마이크 + LED + 센서 | **LED + BLE만** |
| 하드웨어 비용 | ~25,000원 | **~15,000원** |
| 개발 복잡도 | 높음 | **낮음** |

### 1.2 MVP 장점

1. **개발 기간 단축**: BLE 오디오 스트리밍 구현 불필요
2. **하드웨어 간소화**: 마이크 모듈, 오디오 처리 회로 제거
3. **음질 향상**: 스마트폰 마이크가 저가 MEMS보다 우수
4. **배터리 절약**: 오디오 처리 전력 소모 없음
5. **빠른 검증**: 핵심 가치(AI 비서 + LED 피드백) 먼저 테스트

---

## 2. MVP 시스템 아키텍처

### 2.1 전체 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│                        사용자 음성 입력                              │
│                             │                                       │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────┐               │
│  │              스마트폰 앱 (핵심)                    │               │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐          │               │
│  │  │ 마이크   │→│  STT    │→│ AI API  │          │               │
│  │  │ (내장)  │  │(Whisper)│  │(Gemini) │          │               │
│  │  └─────────┘  └─────────┘  └────┬────┘          │               │
│  │                                  │               │               │
│  │                    ┌─────────────┴─────────────┐ │               │
│  │                    │                           │ │               │
│  │                    ▼                           ▼ │               │
│  │              ┌─────────┐                ┌─────────┐              │
│  │              │   TTS   │                │   BLE   │              │
│  │              │  (음성) │                │ (LED)   │              │
│  │              └─────────┘                └────┬────┘              │
│  └──────────────────────────────────────────────┼───┘               │
│                                                  │                   │
│                                                  ▼                   │
│                                    ┌─────────────────────┐          │
│                                    │    AI FanStick      │          │
│                                    │  (ESP32 + LED만)    │          │
│                                    │                     │          │
│                                    │  ● LED 색상 변경    │          │
│                                    │  ● 패턴 애니메이션  │          │
│                                    │  ● 진동 피드백      │          │
│                                    └─────────────────────┘          │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 데이터 흐름 상세 설명

#### 전체 흐름 요약

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  사용자  │ → │  마이크  │ → │   STT   │ → │   AI    │ → │  출력   │
│  음성   │    │  녹음   │    │  변환   │    │  처리   │    │TTS+LED │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
                   │              │              │              │
               스마트폰        인터넷         인터넷          BLE
               내부처리        API호출        API호출        무선통신
```

---

#### STEP 1: 사용자 음성 입력

**무슨 일이 일어나는가?**
```
사용자가 스마트폰에 대고 "다음 곡 뭐야?" 라고 말합니다.
```

**상세 설명:**
- 사용자는 앱의 "말하기" 버튼을 **길게 누른 상태**에서 말합니다
- 버튼을 누르는 동안만 녹음됩니다 (Push-to-Talk 방식)
- 버튼에서 손을 떼면 녹음이 종료됩니다

**왜 버튼을 눌러야 하나?**
- 콘서트장은 시끄러워서 항상 듣고 있으면 잡음이 많이 녹음됨
- 배터리 절약
- 의도치 않은 녹음 방지

---

#### STEP 2: 스마트폰 마이크 녹음

**무슨 일이 일어나는가?**
```
스마트폰 앱이 내장 마이크로 사용자 음성을 녹음합니다.
```

**상세 설명:**

| 항목 | 값 | 설명 |
|------|-----|------|
| 녹음 장치 | 스마트폰 내장 마이크 | 별도 장치 불필요 |
| 샘플레이트 | 16,000 Hz | 음성 인식에 적합 |
| 비트 깊이 | 16-bit | 표준 음질 |
| 채널 | Mono (1채널) | 음성에 스테레오 불필요 |
| 포맷 | PCM 또는 WAV | 압축 안 된 원본 |

**실제 동작:**
```
1. 사용자가 버튼을 누름
2. 앱이 마이크 권한 확인 (최초 1회)
3. AudioRecord 시작
4. 음성 데이터를 메모리 버퍼에 저장
5. 사용자가 버튼에서 손을 뗌
6. AudioRecord 종료
7. 버퍼의 음성 데이터를 WAV 파일로 저장
```

**예상 데이터:**
- 3초 말하기 → 약 96KB 음성 파일
- 계산: 16,000Hz × 16bit × 3초 = 96,000 bytes

---

#### STEP 3: STT (Speech-to-Text) 변환

**무슨 일이 일어나는가?**
```
녹음된 음성 파일을 인터넷으로 Google 서버에 보내서
텍스트로 변환합니다.

입력: "다음 곡 뭐야?" (음성 파일)
출력: "다음 곡 뭐야?" (텍스트)
```

**상세 설명:**

| 항목 | 값 | 설명 |
|------|-----|------|
| 서비스 | Google Cloud Speech-to-Text | 또는 Whisper API |
| 통신 | HTTPS (인터넷 필요) | WiFi 또는 LTE |
| 언어 | 한국어 (ko-KR) | 설정에서 선택 |
| 소요 시간 | 약 0.5~1초 | 네트워크 상태에 따라 |

**실제 동작:**
```
1. 앱이 음성 파일을 Google Speech API로 전송
   POST https://speech.googleapis.com/v1/speech:recognize

2. 요청 데이터:
   {
     "config": {
       "encoding": "LINEAR16",
       "sampleRateHertz": 16000,
       "languageCode": "ko-KR"
     },
     "audio": {
       "content": "BASE64로 인코딩된 음성 데이터"
     }
   }

3. Google 서버가 음성을 분석

4. 응답 수신:
   {
     "results": [{
       "alternatives": [{
         "transcript": "다음 곡 뭐야",
         "confidence": 0.95
       }]
     }]
   }

5. 앱이 "다음 곡 뭐야" 텍스트 추출
```

**왜 인터넷이 필요한가?**
- 음성 인식은 복잡한 AI 모델이 필요
- 스마트폰에서 직접 처리하면 느리고 정확도 낮음
- 클라우드 서버는 강력한 모델로 빠르고 정확하게 처리

---

#### STEP 4: AI 응답 생성 (Gemini)

**무슨 일이 일어나는가?**
```
변환된 텍스트를 Gemini AI에게 보내서
적절한 답변을 받습니다.

입력: "다음 곡 뭐야?" (텍스트)
출력: "다음 곡은 '좋아'입니다! 파란색으로 바꿔드릴게요 💙" (텍스트)
```

**상세 설명:**

| 항목 | 값 | 설명 |
|------|-----|------|
| 서비스 | Google Gemini API | 무료 한도 있음 |
| 모델 | gemini-2.0-flash | 빠른 응답 |
| 통신 | HTTPS (인터넷 필요) | WiFi 또는 LTE |
| 소요 시간 | 약 1~2초 | 질문 복잡도에 따라 |

**실제 동작:**
```
1. 앱이 시스템 프롬프트 + 사용자 질문을 Gemini에 전송

2. 요청 데이터:
   {
     "contents": [
       {
         "role": "user",
         "parts": [{
           "text": "시스템: 당신은 K-POP 콘서트 AI 비서입니다...
                   현재 콘서트: BTS
                   셋리스트: 1.Dynamite 2.좋아 3.봄날...
                   현재 곡: Dynamite (1번)

                   사용자: 다음 곡 뭐야?"
         }]
       }
     ]
   }

3. Gemini 서버가 질문을 이해하고 답변 생성

4. 응답 수신:
   {
     "candidates": [{
       "content": {
         "parts": [{
           "text": "다음 곡은 '좋아'입니다! 파란색으로 바꿔드릴게요 💙"
         }]
       }
     }]
   }

5. 앱이 답변 텍스트 추출
```

**AI는 어떻게 LED 색상을 알려주나?**
- 시스템 프롬프트에 "LED 색상 추천을 포함하라"고 지시
- AI가 답변에 "파란색", "빨간색" 등 색상 단어 포함
- 앱이 답변에서 색상 키워드를 찾아서 LED 명령으로 변환

---

#### STEP 5-A: TTS (Text-to-Speech) 음성 출력

**무슨 일이 일어나는가?**
```
AI의 텍스트 답변을 음성으로 변환하여
스마트폰 스피커로 출력합니다.

입력: "다음 곡은 '좋아'입니다! 파란색으로 바꿔드릴게요" (텍스트)
출력: 스마트폰 스피커에서 음성이 나옴
```

**상세 설명:**

| 항목 | 값 | 설명 |
|------|-----|------|
| 서비스 | Android 내장 TTS | 인터넷 불필요 |
| 언어 | 한국어 | 설정에서 선택 |
| 음성 | 여성/남성 선택 가능 | |
| 소요 시간 | 거의 즉시 | 로컬 처리 |

**실제 동작:**
```
1. 앱이 Android TTS 엔진에 텍스트 전달
   textToSpeech.speak("다음 곡은 '좋아'입니다!", QUEUE_FLUSH, null)

2. TTS 엔진이 텍스트를 음성으로 변환

3. 스마트폰 스피커 (또는 블루투스 이어폰)로 출력
```

**왜 스마트폰 TTS를 쓰나?**
- 무료, 빠름 (로컬 처리)
- 인터넷 불필요
- 품질 충분함

---

#### STEP 5-B: BLE로 LED 명령 전송

**무슨 일이 일어나는가?**
```
AI 답변에서 색상 정보를 추출하여
블루투스로 응원봉에 LED 색상 변경 명령을 보냅니다.

입력: "파란색으로 바꿔드릴게요" (AI 답변 중 일부)
출력: "C:0,0,255" (BLE 명령) → 응원봉으로 전송
```

**상세 설명:**

| 항목 | 값 | 설명 |
|------|-----|------|
| 통신 | Bluetooth Low Energy (BLE) | 저전력 무선 |
| 거리 | 최대 10m | 실내 기준 |
| 소요 시간 | 약 50ms | 거의 즉시 |

**실제 동작:**
```
1. 앱이 AI 답변에서 색상 키워드 검색
   "파란색" 발견!

2. 색상 키워드 → RGB 값 변환
   "파란색" → R:0, G:0, B:255

3. BLE 명령 생성
   "C:0,0,255"

4. BLE로 응원봉에 전송
   bluetoothGatt.writeCharacteristic(ledCharacteristic)

5. 응원봉이 명령 수신
```

**색상 매핑 테이블:**
```
"빨간색", "빨강", "레드"  → C:255,0,0
"파란색", "파랑", "블루"  → C:0,0,255
"초록색", "녹색", "그린"  → C:0,255,0
"보라색", "퍼플"         → C:128,0,255
"노란색", "노랑", "옐로"  → C:255,255,0
"흰색", "화이트"         → C:255,255,255
"무지개", "레인보우"      → P:rainbow (패턴)
```

---

#### STEP 6: 응원봉 LED 변경

**무슨 일이 일어나는가?**
```
응원봉이 BLE 명령을 받아서 LED 색상을 변경합니다.

입력: "C:0,0,255" (BLE 명령)
출력: LED가 파란색으로 변경됨 + 진동
```

**상세 설명:**
```
1. ESP32가 BLE로 "C:0,0,255" 수신

2. 명령 파싱
   C: 색상 변경 명령
   0,0,255: R=0, G=0, B=255 (파란색)

3. WS2812B LED 제어
   for(int i=0; i<10; i++) {
     strip.setPixelColor(i, Color(0, 0, 255));
   }
   strip.show();

4. 진동 모터 작동 (피드백)
   digitalWrite(VIBRATION_PIN, HIGH);
   delay(100);
   digitalWrite(VIBRATION_PIN, LOW);

5. 결과: LED 10개가 파란색으로 점등 + 짧은 진동
```

---

#### 전체 타이밍 예시

```
시간(초)  이벤트
───────────────────────────────────────
0.0      사용자가 버튼을 누름
0.0-2.0  사용자가 "다음 곡 뭐야?" 말함
2.0      버튼에서 손을 뗌 (녹음 종료)
2.0-2.1  음성 파일 생성
2.1-2.6  STT API 호출 (음성 → 텍스트)  [0.5초]
2.6-3.8  Gemini API 호출 (질문 → 답변)  [1.2초]
3.8-3.85 색상 키워드 추출
3.85-3.9 BLE 명령 전송  [50ms]
3.9      LED 색상 변경 + 진동
3.9-5.0  TTS 음성 출력
───────────────────────────────────────
총 소요: 약 3초 (말 끝 → LED 변경)
```

---

## 3. 하드웨어 구성

### 3.1 응원봉 (단순화)

| 부품 | 사양 | 예상 가격 |
|------|------|-----------|
| ESP32-C3 Mini | BLE 5.0, 저전력 | 4,000원 |
| WS2812B LED x 10 | 풀컬러 RGB | 2,000원 |
| 진동 모터 | 소형 코인 모터 | 500원 |
| 3.7V LiPo 500mAh | 배터리 | 3,000원 |
| TP4056 | 충전 모듈 | 500원 |
| PCB | 커스텀 | 2,000원 |
| 케이스 | 3D 프린팅 | 3,000원 |
| **합계** | | **15,000원** |

### 3.2 기존 대비 제거 부품

| 제거 부품 | 절감 비용 | 이유 |
|-----------|-----------|------|
| ICS-43434 마이크 | 2,000원 | 스마트폰 마이크 사용 |
| MPU6050 가속도 | 1,500원 | MVP에서 제외 |
| ESP32-C6 → C3 | 1,000원 | WiFi 불필요 |
| 오디오 회로 | 2,000원 | 불필요 |
| **총 절감** | **6,500원** | |

### 3.3 회로 구성 (간단)

```
ESP32-C3 Mini
     │
     ├── GPIO 8 ──── WS2812B LED (Data In)
     │
     ├── GPIO 2 ──── 진동 모터 (+ 트랜지스터)
     │
     └── 3.3V/GND ── 전원

전원:
LiPo 3.7V ── TP4056 충전모듈 ── ESP32-C3
                    │
                 Type-C 충전
```

---

## 4. 소프트웨어 구성

### 4.1 스마트폰 앱 (Android 우선)

#### 앱의 역할 - 왜 앱이 중요한가?

```
┌─────────────────────────────────────────────────────────────┐
│                    스마트폰 앱 = 두뇌                        │
│                                                              │
│   응원봉은 단순한 출력 장치 (LED + 진동)                      │
│   모든 "생각"은 앱에서 처리됨                                │
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  음성 녹음 → STT → AI 처리 → TTS + LED 명령 생성    │   │
│   │              ↑                                      │   │
│   │         앱이 모두 처리                               │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

#### 핵심 기능 상세 설명

##### 기능 1: 음성 녹음 (Voice Recording)

**이 기능이 하는 일:**
```
사용자가 말하는 음성을 스마트폰 마이크로 녹음하여
WAV 파일로 저장합니다.
```

**왜 필요한가?**
- AI에게 질문하려면 먼저 음성을 캡처해야 함
- 녹음된 음성 파일을 STT 서비스로 보내서 텍스트로 변환

**어떻게 동작하는가?**
```
1. 사용자가 🎤 버튼을 길게 누름
   ↓
2. 앱이 마이크 녹음 시작 (AudioRecord 클래스)
   ↓
3. 사용자가 말하는 동안 음성 데이터가 버퍼에 저장됨
   ↓
4. 사용자가 버튼에서 손을 뗌
   ↓
5. 녹음 종료, WAV 파일 생성
   ↓
6. 다음 단계(STT)로 파일 전달
```

**기술 구현:**
```kotlin
// Android Kotlin 코드 예시
class VoiceRecorder {
    private var audioRecord: AudioRecord? = null
    private val sampleRate = 16000  // 16kHz
    private val buffer = ByteArray(1024)

    fun startRecording() {
        audioRecord = AudioRecord(
            MediaRecorder.AudioSource.MIC,
            sampleRate,
            AudioFormat.CHANNEL_IN_MONO,
            AudioFormat.ENCODING_PCM_16BIT,
            buffer.size
        )
        audioRecord?.startRecording()

        // 백그라운드에서 버퍼에 계속 저장
        thread {
            while (isRecording) {
                audioRecord?.read(buffer, 0, buffer.size)
                // 버퍼 데이터를 파일에 쓰기
            }
        }
    }

    fun stopRecording(): File {
        audioRecord?.stop()
        // WAV 파일로 저장 후 반환
        return saveAsWavFile()
    }
}
```

**사용자 경험:**
- 버튼 누르면 → 빨간색 녹음 표시 + "말씀하세요" 텍스트
- 버튼 떼면 → "처리 중..." 표시

---

##### 기능 2: STT (Speech-to-Text)

**이 기능이 하는 일:**
```
녹음된 음성 파일(WAV)을 Google 서버로 보내서
텍스트로 변환합니다.

예: 음성 "다음 곡 뭐야" → 텍스트 "다음 곡 뭐야"
```

**왜 필요한가?**
- AI(Gemini)는 텍스트만 이해함
- 음성을 그대로 보낼 수 없음
- 음성 → 텍스트 변환이 반드시 필요

**어떻게 동작하는가?**
```
1. 녹음된 WAV 파일을 Base64로 인코딩
   ↓
2. Google Cloud Speech-to-Text API 호출
   POST https://speech.googleapis.com/v1/speech:recognize
   ↓
3. Google 서버가 음성을 분석 (약 0.5~1초)
   ↓
4. 텍스트 결과 수신
   {"transcript": "다음 곡 뭐야", "confidence": 0.95}
   ↓
5. 다음 단계(AI)로 텍스트 전달
```

**기술 구현:**
```kotlin
// Google Speech-to-Text API 호출
class SpeechToText {
    suspend fun recognize(audioFile: File): String {
        // 1. 오디오 파일을 Base64로 인코딩
        val audioBytes = audioFile.readBytes()
        val audioBase64 = Base64.encodeToString(audioBytes, Base64.DEFAULT)

        // 2. API 요청 생성
        val request = RecognizeRequest(
            config = RecognitionConfig(
                encoding = "LINEAR16",
                sampleRateHertz = 16000,
                languageCode = "ko-KR"
            ),
            audio = Audio(content = audioBase64)
        )

        // 3. API 호출 (Retrofit 사용)
        val response = speechApi.recognize(request)

        // 4. 결과 텍스트 반환
        return response.results[0].alternatives[0].transcript
    }
}
```

**비용:**
- Google Cloud Speech-to-Text: 월 60분 무료
- 초과 시: 15초당 $0.006 (매우 저렴)
- MVP 테스트에는 무료 한도로 충분

---

##### 기능 3: AI 응답 생성 (Gemini)

**이 기능이 하는 일:**
```
사용자의 질문(텍스트)을 Gemini AI에게 보내서
적절한 답변을 받습니다.

예: "다음 곡 뭐야" → "다음 곡은 '좋아'입니다! 파란색으로 바꿔드릴게요 💙"
```

**왜 필요한가?**
- 사용자 질문에 똑똑하게 답변하려면 AI가 필요
- 단순 키워드 매칭으로는 자연스러운 대화 불가능
- Gemini는 무료이면서 한국어를 잘 이해함

**어떻게 동작하는가?**
```
1. 시스템 프롬프트 준비 (AI의 역할 정의)
   ↓
2. 사용자 질문 + 콘서트 정보 결합
   ↓
3. Gemini API 호출
   POST https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent
   ↓
4. Gemini가 답변 생성 (약 1~2초)
   ↓
5. 답변 텍스트 수신
   ↓
6. 답변에서 색상 키워드 추출 (LED 제어용)
   ↓
7. TTS + BLE로 각각 전달
```

**시스템 프롬프트 (AI에게 주는 지시):**
```
당신은 K-POP 콘서트 AI 비서 "FanStick"입니다.

[역할]
- 콘서트 정보 안내 (셋리스트, 떼창 구간)
- 아티스트 정보 제공 (생일, 프로필)
- 팬 응원 문화 안내

[응답 규칙]
1. 간결하게 1-2문장으로 답변
2. 친근한 반말 사용
3. 이모지 적절히 사용
4. ★중요★ 답변 끝에 LED 색상 추천 포함
   예: "파란색으로 바꿔드릴게요!"

[현재 콘서트 정보]
- 아티스트: BTS
- 셋리스트: 1.Dynamite 2.좋아 3.봄날 4.작은것들을위한시
- 현재 곡: 1번 Dynamite
- 다음 곡: 2번 좋아 (응원색: 파란색)
```

**기술 구현:**
```kotlin
class GeminiAI {
    suspend fun ask(userQuestion: String, concertInfo: ConcertInfo): AIResponse {
        // 1. 프롬프트 조합
        val prompt = """
            ${SYSTEM_PROMPT}

            현재 콘서트: ${concertInfo.artist}
            셋리스트: ${concertInfo.setlist}
            현재 곡: ${concertInfo.currentSong}

            사용자 질문: $userQuestion
        """.trimIndent()

        // 2. Gemini API 호출
        val response = geminiApi.generateContent(
            model = "gemini-2.0-flash",
            contents = listOf(Content(parts = listOf(Part(text = prompt))))
        )

        // 3. 답변 텍스트 추출
        val answerText = response.candidates[0].content.parts[0].text

        // 4. 색상 키워드 추출
        val color = extractColorFromText(answerText)

        return AIResponse(text = answerText, ledColor = color)
    }

    // 답변에서 색상 추출
    private fun extractColorFromText(text: String): RGB? {
        return when {
            text.contains("빨간") || text.contains("빨강") -> RGB(255, 0, 0)
            text.contains("파란") || text.contains("파랑") -> RGB(0, 0, 255)
            text.contains("초록") || text.contains("녹색") -> RGB(0, 255, 0)
            text.contains("보라") -> RGB(128, 0, 255)
            text.contains("노란") || text.contains("노랑") -> RGB(255, 255, 0)
            text.contains("흰") -> RGB(255, 255, 255)
            else -> null
        }
    }
}
```

**비용:**
- Gemini 2.0 Flash: 분당 15회 무료
- 하루 약 1,500회 질문 가능
- MVP 테스트에 충분

---

##### 기능 4: TTS (Text-to-Speech)

**이 기능이 하는 일:**
```
AI의 텍스트 답변을 음성으로 변환하여
스마트폰 스피커로 들려줍니다.

예: "다음 곡은 '좋아'입니다!" → 🔊 음성 출력
```

**왜 필요한가?**
- 콘서트장에서는 화면을 보기 어려움
- 음성으로 들으면 바로 이해 가능
- 더 자연스러운 AI 비서 경험

**어떻게 동작하는가?**
```
1. AI 답변 텍스트 수신
   ↓
2. Android TTS 엔진에 전달
   ↓
3. TTS 엔진이 음성 합성 (즉시, 로컬)
   ↓
4. 스마트폰 스피커로 출력
   (또는 블루투스 이어폰)
```

**기술 구현:**
```kotlin
class TextToSpeechManager(context: Context) {
    private val tts: TextToSpeech = TextToSpeech(context) { status ->
        if (status == TextToSpeech.SUCCESS) {
            tts.language = Locale.KOREAN
            tts.setSpeechRate(1.0f)  // 말하기 속도
        }
    }

    fun speak(text: String) {
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "utteranceId")
    }

    // TTS 완료 시 콜백
    fun setOnCompleteListener(listener: () -> Unit) {
        tts.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onDone(utteranceId: String?) {
                listener()
            }
            // ...
        })
    }
}
```

**장점:**
- 인터넷 불필요 (로컬 처리)
- 무료
- 빠름 (거의 즉시)

---

##### 기능 5: BLE 통신 (Bluetooth Low Energy)

**이 기능이 하는 일:**
```
스마트폰과 응원봉을 블루투스로 연결하고
LED 색상 변경 명령을 전송합니다.

예: 앱에서 "파란색" 명령 → 응원봉 LED가 파란색으로
```

**왜 필요한가?**
- 응원봉에는 인터넷 연결이 없음
- 스마트폰에서 처리한 결과를 응원봉에 전달해야 함
- BLE는 저전력이라 배터리 오래감

**어떻게 동작하는가?**
```
[최초 연결 - 1회만]
1. 앱이 주변 BLE 장치 스캔
2. "AI FanStick" 이름의 장치 발견
3. 연결 버튼 터치
4. BLE 연결 (페어링)
5. 연결 완료 → 이후 자동 연결

[명령 전송 - 매번]
1. AI 응답에서 색상 추출 (예: 파란색)
2. RGB 값으로 변환 (0, 0, 255)
3. 명령 문자열 생성 "C:0,0,255"
4. BLE로 응원봉에 전송
5. 응원봉이 LED 색상 변경
```

**BLE 통신 구조:**
```
┌─────────────────────┐         ┌─────────────────────┐
│     스마트폰 앱      │         │      응원봉         │
│   (BLE Central)     │         │   (BLE Peripheral)  │
├─────────────────────┤         ├─────────────────────┤
│                     │  연결   │                     │
│  BLE Manager ───────┼────────►│ BLE Server          │
│                     │         │                     │
│  LED Service ───────┼────────►│ LED Characteristic  │
│  (Write)            │  명령   │ (Receive)           │
│                     │         │                     │
│  "C:0,0,255" ───────┼────────►│ LED 색상 변경       │
└─────────────────────┘         └─────────────────────┘
```

**기술 구현:**
```kotlin
class BLEManager(context: Context) {
    private var bluetoothGatt: BluetoothGatt? = null
    private var ledCharacteristic: BluetoothGattCharacteristic? = null

    // 1. BLE 장치 스캔
    fun startScan() {
        val scanner = bluetoothAdapter.bluetoothLeScanner
        scanner.startScan(object : ScanCallback() {
            override fun onScanResult(callbackType: Int, result: ScanResult) {
                if (result.device.name == "AI FanStick") {
                    // 발견! 연결 시도
                    connect(result.device)
                }
            }
        })
    }

    // 2. 장치 연결
    fun connect(device: BluetoothDevice) {
        bluetoothGatt = device.connectGatt(context, false, gattCallback)
    }

    // 3. LED 명령 전송
    fun sendLEDCommand(r: Int, g: Int, b: Int) {
        val command = "C:$r,$g,$b"
        ledCharacteristic?.setValue(command.toByteArray())
        bluetoothGatt?.writeCharacteristic(ledCharacteristic)
    }

    // 4. 패턴 명령 전송
    fun sendPatternCommand(pattern: String) {
        val command = "P:$pattern"  // 예: "P:rainbow"
        ledCharacteristic?.setValue(command.toByteArray())
        bluetoothGatt?.writeCharacteristic(ledCharacteristic)
    }
}
```

**명령어 종류:**
| 명령 | 형식 | 예시 | 설명 |
|------|------|------|------|
| 색상 | `C:R,G,B` | `C:255,0,0` | 빨간색 |
| 패턴 | `P:이름` | `P:rainbow` | 무지개 패턴 |
| 진동 | `V:시간` | `V:200` | 200ms 진동 |
| 밝기 | `B:값` | `B:128` | 50% 밝기 |

---

#### 핵심 기능 요약 테이블

| 순서 | 기능 | 입력 | 출력 | 처리 위치 | 시간 |
|------|------|------|------|-----------|------|
| 1 | 음성 녹음 | 사용자 음성 | WAV 파일 | 스마트폰 | 말하는 시간 |
| 2 | STT | WAV 파일 | 텍스트 | 클라우드 (Google) | 0.5~1초 |
| 3 | AI 응답 | 텍스트 질문 | 텍스트 답변 | 클라우드 (Gemini) | 1~2초 |
| 4 | TTS | 텍스트 답변 | 음성 출력 | 스마트폰 | 즉시 |
| 5 | BLE | 색상 정보 | LED 변경 | 응원봉 | 0.05초 |

---

#### 앱 화면 구성

```
┌─────────────────────────────────┐
│         AI FanStick             │
├─────────────────────────────────┤
│                                 │
│    ┌───────────────────────┐    │
│    │   🎤 말하기 버튼       │    │  ← 길게 누르면 녹음
│    │      (크게)           │    │
│    └───────────────────────┘    │
│                                 │
│    ┌───────────────────────┐    │
│    │ "다음 곡은 '좋아'입니다" │    │  ← AI 응답 표시
│    └───────────────────────┘    │
│                                 │
│    ┌─────────┐  ┌─────────┐    │
│    │ LED 색상 │  │ 패턴    │    │  ← 수동 제어
│    │  🔴🟢🔵  │  │ 선택    │    │
│    └─────────┘  └─────────┘    │
│                                 │
│    ┌───────────────────────┐    │
│    │ 🔗 응원봉 연결: ✅      │    │  ← BLE 상태
│    └───────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

#### AI 프롬프트 설정

```python
SYSTEM_PROMPT = """
당신은 K-POP 콘서트 AI 비서 "FanStick"입니다.

역할:
- 콘서트 정보 안내 (셋리스트, 떼창 구간 등)
- 아티스트 정보 제공 (생일, 프로필, 일정)
- 팬 응원 문화 안내

응답 규칙:
1. 간결하게 답변 (1-2문장)
2. 친근한 말투 사용
3. 이모지 적절히 사용
4. LED 색상 추천 포함 (예: "파란색으로 바꿔드릴게요!")

현재 콘서트 정보:
- 아티스트: {artist_name}
- 셋리스트: {setlist}
- 현재 곡: {current_song}
"""
```

### 4.2 ESP32-C3 펌웨어

#### 기능

1. BLE 서버로 동작
2. LED 색상/패턴 명령 수신
3. 진동 피드백 제어
4. 저전력 모드

#### 핵심 코드 구조

```cpp
#include <BLEDevice.h>
#include <Adafruit_NeoPixel.h>

#define LED_PIN 8
#define LED_COUNT 10
#define VIBRATION_PIN 2

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

// BLE 서비스 UUID
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define LED_CHAR_UUID       "beb5483e-36e1-4688-b7f5-ea07361b26a8"

class LEDCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
        // LED 명령 처리
        // 형식: "COLOR:R,G,B" 또는 "PATTERN:name"
        String value = pCharacteristic->getValue();
        parseAndExecute(value);
    }
};

void setup() {
    strip.begin();
    strip.show();

    pinMode(VIBRATION_PIN, OUTPUT);

    // BLE 초기화
    BLEDevice::init("AI FanStick");
    BLEServer *pServer = BLEDevice::createServer();
    BLEService *pService = pServer->createService(SERVICE_UUID);

    BLECharacteristic *pCharacteristic = pService->createCharacteristic(
        LED_CHAR_UUID,
        BLECharacteristic::PROPERTY_WRITE
    );
    pCharacteristic->setCallbacks(new LEDCallbacks());

    pService->start();
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->start();
}

void loop() {
    // 애니메이션 업데이트
    updateAnimation();
    delay(20);
}

void setColor(uint8_t r, uint8_t g, uint8_t b) {
    for(int i = 0; i < LED_COUNT; i++) {
        strip.setPixelColor(i, strip.Color(r, g, b));
    }
    strip.show();
}

void vibrate(int duration_ms) {
    digitalWrite(VIBRATION_PIN, HIGH);
    delay(duration_ms);
    digitalWrite(VIBRATION_PIN, LOW);
}
```

### 4.3 BLE 통신 프로토콜

#### 명령 형식

| 명령 | 형식 | 예시 |
|------|------|------|
| 색상 변경 | `C:R,G,B` | `C:255,0,0` (빨강) |
| 패턴 실행 | `P:패턴명` | `P:rainbow` |
| 진동 | `V:시간ms` | `V:200` |
| 밝기 | `B:0-255` | `B:128` |

#### 앱 → 응원봉 명령 예시

```kotlin
// Android 앱에서 BLE 명령 전송
fun sendLEDCommand(color: String) {
    val command = "C:${color}"  // 예: "C:0,0,255"
    ledCharacteristic?.setValue(command.toByteArray())
    bluetoothGatt?.writeCharacteristic(ledCharacteristic)
}

// AI 응답에서 색상 추출 후 전송
fun processAIResponse(response: String) {
    // AI가 "파란색으로 바꿔드릴게요" 라고 응답하면
    if (response.contains("파란색")) {
        sendLEDCommand("0,0,255")
    }
}
```

---

## 5. 개발 단계별 계획

### Phase 1: 하드웨어 프로토타입 (1주)

- [ ] ESP32-C3 + WS2812B LED 연결
- [ ] BLE 서버 기본 구현
- [ ] LED 색상 변경 테스트
- [ ] 브레드보드 프로토타입 완성

**필요 부품:**
- ESP32-C3 Mini 개발보드
- WS2812B LED 스트립 (10개)
- 브레드보드, 점퍼선
- USB 케이블

### Phase 2: Android 앱 기본 (1주)

- [ ] BLE 스캔 및 연결
- [ ] LED 색상 제어 UI
- [ ] 음성 녹음 기능
- [ ] 기본 UI 구현

**기술 스택:**
- Kotlin + Jetpack Compose
- Android BLE API
- MediaRecorder / AudioRecord

### Phase 3: AI 연동 (1주)

- [ ] Google STT 연동
- [ ] Gemini API 연동
- [ ] TTS 출력
- [ ] AI 응답 → LED 색상 매핑

**API 키 필요:**
- Google Cloud Speech-to-Text
- Google Gemini API

### Phase 4: 통합 테스트 (1주)

- [ ] 전체 플로우 테스트
- [ ] 응답 시간 최적화
- [ ] 버그 수정
- [ ] 사용자 테스트

---

## 6. MVP 테스트 시나리오

### 6.1 기본 시나리오

```
1. 앱 실행 → BLE로 응원봉 연결
2. "말하기" 버튼 누르고 "다음 곡 뭐야?" 질문
3. AI 응답: "다음 곡은 '좋아'입니다! 파란색 준비하세요 💙"
4. 스마트폰 스피커로 음성 출력
5. 응원봉 LED가 파란색으로 변경
6. 진동 피드백 (짧게)
```

### 6.2 테스트 항목

| 항목 | 목표값 | 측정 방법 |
|------|--------|-----------|
| 음성 인식 정확도 | > 90% | 10개 명령어 테스트 |
| 응답 시간 | < 3초 | 말 끝 → 음성 출력 |
| BLE 연결 안정성 | > 95% | 1시간 연속 테스트 |
| 배터리 지속 | > 5시간 | LED 상시 점등 기준 |

---

## 7. 예상 비용

### 7.1 하드웨어 (1대 기준)

| 항목 | 비용 |
|------|------|
| ESP32-C3 Mini | 4,000원 |
| WS2812B LED x10 | 2,000원 |
| 진동 모터 + 트랜지스터 | 1,000원 |
| LiPo 배터리 500mAh | 3,000원 |
| TP4056 충전모듈 | 500원 |
| 브레드보드/점퍼선 | 2,000원 |
| **합계** | **12,500원** |

### 7.2 소프트웨어/API

| 항목 | 비용 |
|------|------|
| Gemini API | 무료 (일일 한도) |
| Google STT | 월 60분 무료 |
| Android 개발 | 무료 |
| **합계** | **0원 (MVP 기준)** |

### 7.3 총 MVP 비용

**약 12,500원 + 개발 시간 4주**

---

## 8. MVP 이후 확장 계획

### 8.1 Phase 2 추가 기능

| 기능 | 설명 |
|------|------|
| 가속도 센서 추가 | 흔들기 감지 → 감정 표현 |
| 콘서트 모드 | 셋리스트 연동, 자동 색상 변경 |
| 팬 커뮤니티 | 근처 팬 찾기, 그룹 채팅 |

### 8.2 Phase 3 고급 기능

| 기능 | 설명 |
|------|------|
| 마이크 내장 버전 | 기존 계획대로 ICS-43434 추가 |
| 무대 연동 | 공연장 서버와 실시간 동기화 |
| AR 기능 | 응원봉으로 AR 콘텐츠 활성화 |

---

## 9. 결론

### MVP 핵심 포인트

1. **스마트폰 마이크 활용** → 하드웨어 단순화
2. **앱이 두뇌** → AI 처리는 모두 스마트폰에서
3. **응원봉은 출력 장치** → LED + 진동만 담당
4. **빠른 검증** → 4주 내 핵심 기능 테스트 가능

### 검증할 가설

1. "AI 팬덤 비서가 팬들에게 가치 있는가?"
2. "음성 명령 + LED 피드백이 직관적인가?"
3. "콘서트 현장에서도 음성 인식이 작동하는가?"

### 다음 단계

MVP 성공 시:
- 기획사 데모 (HYBE, SM 등)
- 크라우드 펀딩 검토
- 마이크 내장 버전 개발

---

*작성일: 2026-02-24*
*작성: Claude Code / UTTEC*
