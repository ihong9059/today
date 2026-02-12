# 무선 AI 마이크 프로젝트 계획서

**작성일:** 2026-02-12
**목표:** 소형 무선 마이크 + 핸드폰 AI 음성 비서 시스템 구축

---

## 1. 프로젝트 개요

### 1.1 목적
소형 마이크 모듈을 통해 음성을 수집하고, 스마트폰을 통해 AI(ChatGPT, Gemini 등)와 대화하는 웨어러블 음성 비서 시스템 구축

### 1.2 사용 시나리오
1. 사용자가 마이크에 대고 질문
2. 음성이 스마트폰 앱으로 전송 (BLE/WiFi)
3. 앱에서 AI API 호출하여 답변 생성
4. 스마트폰 스피커 또는 이어폰으로 답변 출력

---

## 2. 시스템 아키텍처

### 2.1 권장 구성 (가장 합리적)

```
┌─────────────────┐      BLE       ┌──────────────────┐      WiFi/LTE    ┌────────────┐
│  ESP32-C6       │ ───────────── │  스마트폰 앱     │ ─────────────── │  AI API    │
│  + ICS-43434    │   오디오 전송  │  (Android/iOS)   │   API 요청/응답  │  (Gemini,  │
│  (소형 마이크)   │               │                  │                  │  ChatGPT)  │
└─────────────────┘               └──────────────────┘                  └────────────┘
      │                                    │
      │                                    ├── STT (Speech-to-Text)
      └── 배터리 동작                       ├── AI 응답 생성
          (3.7V LiPo)                      └── TTS (Text-to-Speech)
```

### 2.2 왜 이 구성인가?

| 항목 | ESP32-C6 온디바이스 처리 | 스마트폰 연동 (권장) |
|------|--------------------------|---------------------|
| 비용 | 높음 (추가 메모리 필요) | 낮음 |
| 정확도 | 제한적 (명령어만) | 높음 (클라우드 AI) |
| 배터리 | 높은 소모 | 낮은 소모 |
| 기능 | 웨이크워드 + 명령어 | 자유 대화, 다국어 |
| 개발 난이도 | 높음 | 중간 |

---

## 3. 하드웨어 구성

### 3.1 마이크 모듈 (ESP32-C6 + ICS-43434)

| 부품 | 사양 | 예상 가격 |
|------|------|-----------|
| ESP32-C6-DevKitC-1 | WiFi 6 + BLE 5, 저전력 | ~8,000원 |
| ICS-43434 | I2S MEMS 마이크, 고감도 | ~3,000원 |
| 3.7V LiPo 배터리 | 300mAh, 소형 | ~3,000원 |
| 충전 모듈 | TP4056 Type-C | ~1,000원 |
| 케이스 | 3D 프린팅 | ~2,000원 |
| **합계** | | **~17,000원** |

### 3.2 핀 연결

| ICS-43434 | ESP32-C6 |
|-----------|----------|
| SCK | GPIO 6 |
| WS | GPIO 7 |
| SD | GPIO 8 |
| VDD | 3.3V |
| GND | GND |
| L/R | GND (Left) |

### 3.3 회로도 (간략)

```
           ┌─────────────┐
  3.3V ────┤ VDD     SCK ├──── GPIO 6
           │             │
  GND ─────┤ GND      WS ├──── GPIO 7
           │             │
  GND ─────┤ L/R      SD ├──── GPIO 8
           │  ICS-43434  │
           └─────────────┘
```

---

## 4. 소프트웨어 구성

### 4.1 ESP32-C6 펌웨어

**기능:**
1. I2S로 오디오 캡처 (16kHz, 16bit)
2. BLE로 스마트폰에 오디오 스트리밍
3. 버튼/웨이크워드로 녹음 시작
4. 저전력 대기 모드

**개발 환경:** ESP-IDF 5.x 또는 Arduino

```c
// 핵심 코드 구조
void app_main() {
    init_i2s_microphone();
    init_ble_audio_service();

    while(1) {
        wait_for_wakeup();          // 버튼 또는 웨이크워드
        start_recording();          // I2S 캡처 시작
        stream_audio_via_ble();     // BLE로 전송
        enter_deep_sleep();         // 저전력 모드
    }
}
```

### 4.2 스마트폰 앱 (Android 우선)

**기능:**
1. BLE로 ESP32 마이크와 연결
2. 오디오 수신 및 버퍼링
3. Google STT 또는 Whisper API로 텍스트 변환
4. AI API 호출 (Gemini, ChatGPT)
5. TTS로 응답 음성 출력

**기술 스택:**
- Kotlin + Jetpack Compose
- Android BLE API
- Google Speech-to-Text SDK
- Retrofit (API 통신)

### 4.3 AI API 선택

| API | 장점 | 단점 | 비용 |
|-----|------|------|------|
| Google Gemini | 한국어 우수, 무료 한도 | 가끔 느림 | 무료~저렴 |
| OpenAI GPT-4 | 최고 품질 | 비용 | $0.03/1K tokens |
| Groq Llama | 매우 빠름 | 품질 보통 | 무료 |
| Claude | 긴 대화 | 비용 | $0.015/1K tokens |

**권장:** Gemini 2.0 Flash (무료 + 빠름 + 한국어)

---

## 5. 통신 프로토콜

### 5.1 BLE 오디오 스트리밍

```
ESP32-C6                    스마트폰
   │                           │
   │  [GATT Service]           │
   │  UUID: 0x1234             │
   │                           │
   │──── Notify (Audio Chunk) ─┤  20바이트/패킷
   │──── Notify (Audio Chunk) ─┤  50 패킷/초
   │──── Notify (Audio Chunk) ─┤  = 1KB/초
   │                           │
   │◄─── Write (Command) ──────│  시작/종료 명령
```

### 5.2 데이터 포맷

```
오디오 청크 (20 bytes):
┌────────┬─────────────────┐
│ Header │ Audio Data      │
│ 2 byte │ 18 bytes        │
└────────┴─────────────────┘
  │
  └── Sequence number
```

---

## 6. 개발 단계

### Phase 1: 하드웨어 프로토타입
- [ ] ESP32-C6 + ICS-43434 회로 구성
- [ ] I2S 오디오 캡처 테스트
- [ ] SD카드로 녹음 저장 테스트

### Phase 2: BLE 통신
- [ ] ESP32 BLE 오디오 서비스 구현
- [ ] Android BLE 연결 앱 개발
- [ ] 오디오 스트리밍 테스트

### Phase 3: AI 연동
- [ ] Google STT 연동
- [ ] Gemini API 연동
- [ ] TTS 응답 재생

### Phase 4: 최적화 및 완성
- [ ] 저전력 모드 구현
- [ ] 배터리 수명 테스트
- [ ] 케이스 설계 및 제작
- [ ] 앱 UI/UX 개선

---

## 7. 대안 검토

### 7.1 더 간단한 방안: WiFi 직접 연결

```
ESP32-C6 ──WiFi──► 스마트폰 핫스팟 ──► AI API
```

- **장점:** BLE보다 빠른 전송, 구현 간단
- **단점:** 배터리 소모 큼, 폰 핫스팟 필요

### 7.2 더 고급 방안: 온디바이스 STT

```
ESP32-S3 (PSRAM) ──► WakeNet + MultiNet ──► WiFi ──► AI API
```

- **장점:** 웨이크워드 감지 후 WiFi 연결
- **단점:** ESP32-S3 필요 (C6보다 비쌈)

---

## 8. 예상 성능

| 항목 | 목표값 |
|------|--------|
| 응답 지연 | < 3초 (말 → AI 답변) |
| 배터리 지속 | > 4시간 (연속 사용) |
| 마이크 범위 | 50cm 이내 명확한 음성 |
| BLE 거리 | 10m 이내 |

---

## 9. 필요 자료 및 참고

### 구매 링크
- [ESP32-C6-DevKitC-1 (디바이스마트)](https://www.devicemart.co.kr/)
- [ICS-43434 모듈 (AliExpress)](https://www.aliexpress.com/)

### 참고 문서
- ESP-IDF I2S: https://docs.espressif.com/projects/esp-idf/
- Android BLE: https://developer.android.com/guide/topics/connectivity/bluetooth-le
- Gemini API: https://ai.google.dev/

---

## 10. 결론

**가장 합리적인 구성:**

1. **하드웨어:** ESP32-C6 + ICS-43434 (저비용, 저전력)
2. **통신:** BLE 오디오 스트리밍 (안정적, 저전력)
3. **AI:** 스마트폰 앱에서 Gemini API 호출 (무료, 고품질)
4. **출력:** 스마트폰 스피커 또는 블루투스 이어폰

이 구성은 약 2만원 이하의 하드웨어 비용으로, 고품질 AI 음성 비서를 구현할 수 있는 가장 현실적인 방안입니다.

---

*작성: Claude Code*
*프로젝트 시작일: 2026-02-12*
