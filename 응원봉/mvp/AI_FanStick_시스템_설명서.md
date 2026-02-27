# AI FanStick 시스템 설명서

## 목차
1. [시스템 개요](#1-시스템-개요)
2. [시스템 구성도](#2-시스템-구성도)
3. [각 컴포넌트 설명](#3-각-컴포넌트-설명)
4. [데이터 흐름](#4-데이터-흐름)
5. [동작 시나리오](#5-동작-시나리오)
6. [통신 프로토콜](#6-통신-프로토콜)
7. [설치 및 실행](#7-설치-및-실행)

---

## 1. 시스템 개요

### 1.1 프로젝트 목적
AI FanStick은 K-POP 콘서트에서 사용하는 **AI 기반 스마트 응원봉** 시스템입니다.
음성 명령으로 AI와 대화하고, 자동으로 LED 색상을 제어하며, 본부에서 수천 개의 응원봉을 동시에 관리할 수 있습니다.

### 1.2 주요 기능
| 기능 | 설명 |
|------|------|
| **AI 대화** | 음성으로 질문하면 AI가 콘서트 정보, 응원법 등을 안내 |
| **자동 LED 제어** | 현재 곡에 맞는 응원 색상으로 자동 변경 |
| **본부 연동** | 콘서트 본부에서 전체 응원봉 색상/패턴 동시 제어 |
| **추첨 이벤트** | 관객 중 당첨자 선정, 당첨 응원봉에 특수 효과 |
| **BLE 통신** | 스마트폰과 응원봉(ESP32) 간 저전력 블루투스 연결 |

### 1.3 기술 스택
```
┌─────────────────────────────────────────────────────┐
│  Frontend       │  Backend        │  Hardware      │
├─────────────────┼─────────────────┼────────────────┤
│  Kotlin         │  Python 3       │  ESP32-C3      │
│  Jetpack Compose│  FastAPI        │  WS2812 LED    │
│  Android BLE    │  OpenAI/Gemini  │  SSD1306 OLED  │
│  OkHttp         │  WebSocket      │  Buzzer        │
│  Speech-to-Text │  uvicorn        │  BLE 5.0       │
└─────────────────┴─────────────────┴────────────────┘
```

---

## 2. 시스템 구성도

### 2.1 전체 아키텍처
```
┌─────────────────────────────────────────────────────────────────────┐
│                         클라우드 서버 (Tailscale VPN)                 │
│                         100.79.180.64                               │
│  ┌─────────────────────┐    ┌─────────────────────┐                │
│  │   AI Server         │    │   Control Center    │                │
│  │   (Port 8081)       │    │   (Port 8090)       │                │
│  │                     │    │                     │                │
│  │  ┌───────────────┐  │    │  ┌───────────────┐  │                │
│  │  │ OpenAI/Gemini │  │    │  │   WebSocket   │  │                │
│  │  │     API       │  │    │  │    Server     │  │                │
│  │  └───────────────┘  │    │  └───────────────┘  │                │
│  │  ┌───────────────┐  │    │  ┌───────────────┐  │                │
│  │  │ Concert Data  │  │    │  │  Admin Panel  │  │                │
│  │  │    (JSON)     │  │    │  │   (HTML)      │  │                │
│  │  └───────────────┘  │    │  └───────────────┘  │                │
│  └──────────┬──────────┘    └──────────┬──────────┘                │
└─────────────┼──────────────────────────┼────────────────────────────┘
              │ HTTP REST API            │ WebSocket
              │                          │
┌─────────────┴──────────────────────────┴────────────────────────────┐
│                         인터넷 / Tailscale VPN                       │
└─────────────┬──────────────────────────┬────────────────────────────┘
              │                          │
              ▼                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    스마트폰 (Android App)                            │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     AI FanStick App                          │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │   │
│  │  │    STT      │ │   AI API    │ │   Control   │            │   │
│  │  │  (음성입력)  │ │   Client    │ │   Client    │            │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘            │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │   │
│  │  │    TTS      │ │  BLE Manager│ │    UI       │            │   │
│  │  │  (음성출력)  │ │             │ │  (Compose)  │            │   │
│  │  └──────┬──────┘ └──────┬──────┘ └─────────────┘            │   │
│  └─────────┼───────────────┼────────────────────────────────────┘   │
└────────────┼───────────────┼────────────────────────────────────────┘
             │               │ BLE (Bluetooth Low Energy)
             ▼               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    응원봉 (ESP32-C3 SuperMini)                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │   │
│  │  │ BLE Server  │ │ LED Control │ │    OLED     │            │   │
│  │  │  (GATT)     │ │  (WS2812)   │ │  (SSD1306)  │            │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘            │   │
│  │  ┌─────────────┐ ┌─────────────┐                            │   │
│  │  │   Buzzer    │ │   Button    │                            │   │
│  │  │  (멜로디)    │ │  (입력)     │                            │   │
│  │  └─────────────┘ └─────────────┘                            │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 네트워크 구성
```
┌──────────────────────────────────────────────────────────┐
│                  Tailscale VPN Network                    │
│                                                          │
│   ┌────────────┐     ┌────────────┐     ┌────────────┐  │
│   │ Cloud      │     │ Mac        │     │ Smartphone │  │
│   │ Server     │     │ (개발PC)   │     │ (Android)  │  │
│   │            │     │            │     │            │  │
│   │ 100.79.    │     │ 100.87.    │     │ 100.90.    │  │
│   │ 180.64     │     │ 2.63       │     │ 178.27     │  │
│   └────────────┘     └────────────┘     └────────────┘  │
│        │                   │                  │         │
│        └───────────────────┴──────────────────┘         │
│                    안전한 P2P 연결                       │
└──────────────────────────────────────────────────────────┘
```

---

## 3. 각 컴포넌트 설명

### 3.1 ESP32-C3 응원봉 (Firmware)

#### 역할
- 실제 응원봉 하드웨어
- BLE 통신으로 스마트폰과 연결
- LED, OLED, 버저 제어

#### 주요 파일
```
firmware_arduino/FanStick_BLE_KR/
└── FanStick_BLE_KR.ino    # 메인 펌웨어 (한글 지원)
```

#### 하드웨어 구성
| 부품 | GPIO | 역할 |
|------|:----:|------|
| WS2812 LED | GPIO 1 | RGB LED (응원 색상) |
| Buzzer | GPIO 2 | 멜로디/알림음 |
| Button | GPIO 5 | 사용자 입력 |
| OLED SDA | GPIO 6 | I2C 데이터 |
| OLED SCL | GPIO 7 | I2C 클럭 |

#### BLE 서비스
```
Service UUID: 4fafc201-1fb5-459e-8fcc-c5c9c331914b
├── LED Characteristic (Write): beb5483e-36e1-4688-b7f5-ea07361b26a8
└── Notify Characteristic (Read): beb5483e-36e1-4688-b7f5-ea07361b26a9
```

#### 명령어 프로토콜
| 명령 | 형식 | 예시 | 설명 |
|------|------|------|------|
| 색상 | `C:R,G,B` | `C:255,0,128` | LED 색상 설정 |
| 패턴 | `P:패턴명` | `P:rainbow` | LED 패턴 (rainbow/pulse/blink/wave) |
| 텍스트 | `T:텍스트` | `T:BTS 사랑해` | OLED에 텍스트 표시 |
| 버저 | `B:패턴` | `B:dynamite` | 멜로디 재생 |
| 밝기 | `L:값` | `L:128` | LED 밝기 (0-255) |

---

### 3.2 Android App (FanStickApp)

#### 역할
- 사용자 인터페이스
- 음성 입력(STT) → AI 질문 → 음성 출력(TTS)
- ESP32 응원봉과 BLE 연결
- 서버/본부와 HTTP/WebSocket 통신

#### 주요 파일
```
FanStickApp/
├── app/
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── kotlin/com/uttec/fanstick/
│       │   └── MainActivity.kt      # 메인 액티비티 (UI + 로직)
│       └── res/
│           └── drawable/            # 앱 아이콘
└── build.gradle.kts
```

#### 주요 기능
| 기능 | 구현 |
|------|------|
| 음성 입력 | Android SpeechRecognizer |
| 음성 출력 | Android TextToSpeech |
| BLE 통신 | BluetoothLeScanner, BluetoothGatt |
| AI 통신 | OkHttp (REST API) |
| 본부 연결 | OkHttp WebSocket |
| UI | Jetpack Compose, Material3 |

#### 서버 주소 설정
```kotlin
private const val AI_SERVER_URL = "http://100.79.180.64:8081"
private const val CONTROL_CENTER_WS_URL = "ws://100.79.180.64:8090/ws"
```

---

### 3.3 AI Server

#### 역할
- AI 질문 처리 (OpenAI GPT / Google Gemini)
- 콘서트 데이터 관리 (셋리스트, 멤버 정보)
- LED 색상 추천

#### 주요 파일
```
ai_fanstick_server/
├── main.py              # FastAPI 서버
├── gemini_service.py    # AI 서비스 (OpenAI/Gemini)
├── prompt_generator.py  # 시스템 프롬프트 생성
├── data/
│   └── concert_data.json # 콘서트/셋리스트 데이터
├── .env                  # API 키 설정
└── requirements.txt
```

#### API 엔드포인트
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/` | 서버 상태 확인 |
| POST | `/api/ask` | AI 질문 (질문 → 응답 + LED 색상) |
| GET | `/api/concert` | 콘서트 정보 조회 |
| POST | `/api/song/next` | 다음 곡으로 이동 |
| POST | `/api/song/prev` | 이전 곡으로 이동 |
| GET | `/api/status` | 현재 상태 조회 |
| GET | `/api/setlist` | 셋리스트 조회 |
| GET | `/api/members` | 멤버 정보 조회 |

#### AI 응답 형식
```json
{
  "success": true,
  "response": "지금 곡은 'Dynamite'예요! 응원 색상은 골드입니다!",
  "led_color": [255, 215, 0],
  "current_song": {
    "order": 1,
    "title": "Dynamite",
    "color_name": "골드",
    "color_rgb": [255, 215, 0],
    "fan_chant": "BTS! BTS!",
    "highlight": "후렴구에서 점프!"
  }
}
```

---

### 3.4 Control Center (본부 관제)

#### 역할
- 콘서트 본부에서 전체 응원봉 실시간 제어
- WebSocket으로 수천 개 응원봉 동시 연결
- 추첨 이벤트 진행
- 전체 LED 색상/패턴 변경

#### 주요 파일
```
control_center/
├── server.py      # FastAPI + WebSocket 서버
├── admin.html     # 관리자 대시보드
└── README.md
```

#### 관리자 대시보드 기능
| 기능 | 설명 |
|------|------|
| 실시간 현황 | 연결된 응원봉 수 표시 |
| LED 제어 | 전체 응원봉 색상 변경 |
| 패턴 제어 | Rainbow, Pulse, Blink 효과 |
| 멜로디 재생 | 전체 응원봉에서 동시 재생 |
| 추첨 | 연결된 응원봉 중 당첨자 선정 |
| 메시지 전송 | 전체 OLED에 메시지 표시 |

#### WebSocket 메시지 형식
```json
// 서버 → 클라이언트
{"type": "connected", "message": "본부에 연결됨", "device_count": 150}
{"type": "led_command", "led": {"r": 128, "g": 0, "b": 128, "pattern": "pulse"}}
{"type": "winner", "message": "축하합니다!", "led": {"pattern": "rainbow"}, "melody": "winner"}
{"type": "display_message", "message": "BTS 사랑해요!"}
```

---

## 4. 데이터 흐름

### 4.1 AI 질문 흐름
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ 사용자   │    │  App    │    │ Server  │    │OpenAI/  │    │  App    │
│ (음성)  │    │  (STT)  │    │  (API)  │    │ Gemini  │    │  (TTS)  │
└────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
     │              │              │              │              │
     │ "다음 곡 뭐야?" │              │              │              │
     │──────────────>│              │              │              │
     │              │              │              │              │
     │              │ POST /api/ask│              │              │
     │              │ {question,   │              │              │
     │              │  ble_name}   │              │              │
     │              │──────────────>│              │              │
     │              │              │              │              │
     │              │              │ AI Request   │              │
     │              │              │──────────────>│              │
     │              │              │              │              │
     │              │              │ AI Response  │              │
     │              │              │<──────────────│              │
     │              │              │              │              │
     │              │ {response,   │              │              │
     │              │  led_color}  │              │              │
     │              │<──────────────│              │              │
     │              │              │              │              │
     │              │──────────────────────────────────────────>│
     │              │                         "다음 곡은 봄날이에요!"
     │              │              │              │              │
     │              │ BLE: C:255,182,193        │              │
     │              │──────────────>│ (ESP32)     │              │
     │              │              │              │              │
     │<─────────────────────────────────────────────────────────│
     │        음성 출력 + LED 색상 변경                          │
```

### 4.2 본부 제어 흐름
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ 관리자   │    │Control  │    │  App    │    │  App    │    │ ESP32   │
│(브라우저)│    │ Center  │    │  #1     │    │  #N     │    │ (LED)   │
└────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
     │              │              │              │              │
     │ "전체 보라색"  │              │              │              │
     │──────────────>│              │              │              │
     │              │              │              │              │
     │              │ WebSocket    │              │              │
     │              │ Broadcast    │              │              │
     │              │──────────────>│              │              │
     │              │──────────────────────────────>│              │
     │              │              │              │              │
     │              │              │ BLE Command  │              │
     │              │              │──────────────────────────────>│
     │              │              │              │ BLE Command  │
     │              │              │              │──────────────>│
     │              │              │              │              │
     │              │              │         LED 색상 변경 (동시) │
```

### 4.3 추첨 이벤트 흐름
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ 관리자   │    │Control  │    │  당첨   │    │  미당첨  │
│         │    │ Center  │    │  App    │    │  App    │
└────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘
     │              │              │              │
     │ 추첨 (5명)   │              │              │
     │──────────────>│              │              │
     │              │              │              │
     │              │ 무작위 선정   │              │
     │              │──────────────>│              │
     │              │              │              │
     │              │ winner 메시지 │              │
     │              │──────────────>│              │
     │              │              │              │
     │              │              │ LED Rainbow  │
     │              │              │ 멜로디 재생   │
     │              │              │ "축하합니다!" │
     │              │              │              │
     │              │ lottery_result│              │
     │              │──────────────────────────────>│
     │              │              │              │
     │              │              │              │ 결과만 표시
```

---

## 5. 동작 시나리오

### 5.1 시나리오 1: AI 질문
1. 사용자가 앱의 마이크 버튼을 누르고 "다음 곡이 뭐야?"라고 말함
2. STT가 음성을 텍스트로 변환
3. 앱이 AI 서버에 질문 전송 (BLE 이름 포함)
4. 서버가 콘서트 데이터 + AI로 응답 생성
5. 앱이 응답을 TTS로 읽어줌
6. 앱이 BLE로 ESP32에 LED 색상 명령 전송
7. 응원봉 LED가 다음 곡 색상으로 변경

### 5.2 시나리오 2: 콘서트 본부 제어
1. 콘서트 시작 전, 관객들이 앱에서 "본부 연결" 버튼 클릭
2. 앱이 WebSocket으로 Control Center에 연결
3. 관리자 대시보드에 연결된 응원봉 수 표시
4. 관리자가 "Purple" 버튼 클릭
5. Control Center가 모든 앱에 LED 명령 브로드캐스트
6. 모든 응원봉이 동시에 보라색으로 변경

### 5.3 시나리오 3: 추첨 이벤트
1. MC가 추첨 이벤트 안내
2. 관리자가 대시보드에서 "5명 추첨" 실행
3. Control Center가 연결된 응원봉 중 무작위로 5개 선정
4. 당첨자 앱에 winner 메시지 전송
5. 당첨 응원봉: LED 무지개 효과 + 축하 멜로디 + 진동
6. 미당첨자: 추첨 결과 메시지만 표시
7. MC: "응원봉이 반짝이는 분들 무대로!"

---

## 6. 통신 프로토콜

### 6.1 BLE 프로토콜 (App ↔ ESP32)
```
┌────────────────────────────────────────────────────────┐
│                    BLE GATT 구조                        │
├────────────────────────────────────────────────────────┤
│ Service: 4fafc201-1fb5-459e-8fcc-c5c9c331914b         │
│                                                        │
│ ├── LED Characteristic (Write)                        │
│ │   UUID: beb5483e-36e1-4688-b7f5-ea07361b26a8       │
│ │   명령 형식: "C:R,G,B" / "P:pattern" / "T:text"     │
│ │                                                     │
│ └── Notify Characteristic (Read/Notify)               │
│     UUID: beb5483e-36e1-4688-b7f5-ea07361b26a9       │
│     응답 형식: "BTN:pressed" / "STATUS:ok"            │
└────────────────────────────────────────────────────────┘
```

### 6.2 HTTP REST API (App ↔ AI Server)
```
POST /api/ask
Request:
{
  "question": "다음 곡이 뭐야?",
  "ble_name": "홍광삼 응원봉"
}

Response:
{
  "success": true,
  "response": "다음 곡은 '봄날'이에요!",
  "led_color": [255, 182, 193],
  "current_song": {...}
}
```

### 6.3 WebSocket (App ↔ Control Center)
```
// 연결
ws://100.79.180.64:8090/ws/{device_id}

// 초기 등록 메시지 (클라이언트 → 서버)
{"type": "fan", "name": "응원봉 ABC1", "platform": "Android"}

// 서버 → 클라이언트 메시지 종류
{"type": "connected", "device_count": 150}
{"type": "led_command", "led": {"r": 128, "g": 0, "b": 128}}
{"type": "winner", "message": "축하합니다!", "melody": "winner"}
{"type": "display_message", "message": "BTS 사랑해요!"}
```

---

## 7. 설치 및 실행

### 7.1 ESP32 펌웨어 업로드
```bash
# Arduino CLI 사용
arduino-cli compile --fqbn esp32:esp32:esp32c3 FanStick_BLE_KR
arduino-cli upload --fqbn esp32:esp32:esp32c3 --port /dev/cu.usbmodem* FanStick_BLE_KR
```

### 7.2 Android 앱 빌드 및 설치
```bash
# 빌드
cd FanStickApp
./gradlew assembleDebug

# 설치
adb install -r app/build/outputs/apk/debug/app-debug.apk

# 실행
adb shell am start -n com.uttec.fanstick/.MainActivity
```

### 7.3 서버 실행
```bash
# AI 서버
cd ~/ai_fanstick_server
source venv/bin/activate
python main.py
# → http://0.0.0.0:8081

# Control Center
cd ~/control_center
source venv/bin/activate
python server.py
# → http://0.0.0.0:8090
# → 관리자 페이지: http://localhost:8090/admin
```

### 7.4 환경 변수 (.env)
```env
# AI 서버 설정
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AI...
AI_PROVIDER=openai  # openai 또는 gemini
```

---

## 부록

### A. 콘서트 데이터 구조
```json
{
  "artist": { "name": "BTS", "fandom_name": "ARMY" },
  "members": [{ "stage_name": "RM", "position": "리더" }],
  "concert": { "venue": "잠실 주경기장", "date": "2026-06-15" },
  "setlist": [
    {
      "order": 1,
      "title": "Dynamite",
      "color_rgb": [255, 215, 0],
      "fan_chant": "BTS! BTS!"
    }
  ]
}
```

### B. 포트 정리
| 서비스 | 포트 | 프로토콜 |
|--------|:----:|----------|
| AI Server | 8081 | HTTP |
| Control Center | 8090 | HTTP + WebSocket |
| BLE | - | Bluetooth Low Energy |

### C. Tailscale IP 주소
| 장치 | IP |
|------|-----|
| Cloud Server | 100.79.180.64 |
| Mac (개발) | 100.87.2.63 |
| Smartphone | 100.90.178.27 |

---

**문서 버전**: 1.0
**최종 업데이트**: 2026-02-26
**작성**: AI FanStick MVP Project
