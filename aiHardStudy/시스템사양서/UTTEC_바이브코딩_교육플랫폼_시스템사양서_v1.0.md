# UTTEC 바이브코딩 교육 플랫폼 — 시스템 사양서 v1.0

**문서번호**: UTTEC-SYS-SPEC-2026-001
**작성일**: 2026-04-12
**버전**: 1.0

---

## 1. 시스템 개요

### 1.1 제품 정의

스마트폰에서 자연어(한국어)로 원하는 동작을 입력하면 AI가 ESP32 펌웨어 코드를 자동 생성하고, 무선(BLE OTA)으로 보드에 전송하여 즉시 동작시키는 IoT 교육 플랫폼.

### 1.2 핵심 가치

- **코딩 없이 하드웨어 제어**: 자연어 프롬프트 → AI 코드 생성 → 자동 빌드 → 무선 전송
- **전체 소요 시간**: 프롬프트 입력부터 보드 동작까지 **35~70초**
- **교육 현장 최적화**: 학생별 보드 개별 식별, 한국어 코드 주석, 학습 카드 제공

### 1.3 시스템 구성도

```
┌─────────────┐     HTTP/REST      ┌──────────────────┐
│  스마트폰 앱  │ ──────────────────▶ │  빌드 서버         │
│  (Flutter)   │     프롬프트 전송    │  (FastAPI+Python) │
│              │ ◀────────────────── │                  │
│              │     .bin 다운로드    │  Claude AI 코드생성│
│              │                    │  Arduino-CLI 빌드 │
│              │     BLE OTA        └──────────────────┘
│              │ ──────────────────▶ ┌──────────────────┐
│              │     펌웨어 전송      │  ESP32 보드        │
│              │ ◀────────────────── │  (UTTEC Board)    │
│              │     상태 알림        │  LED/부저/OLED/센서│
└─────────────┘                    └──────────────────┘
```

---

## 2. 하드웨어 사양

### 2.1 메인 보드

| 항목 | 사양 |
|:-----|:-----|
| MCU | ESP32-WROOM-32 (Xtensa LX6 듀얼코어, 240MHz) |
| Flash | 4MB |
| RAM | 520KB SRAM |
| 무선 | Wi-Fi 802.11 b/g/n + Bluetooth 4.2 (BLE) |
| 보드 형태 | DevKitC 38-pin |
| 전원 | USB 5V (Micro-USB) |
| OTA 파티션 | min_spiffs (듀얼 OTA 파티션) |

### 2.2 주변장치 (온보드)

| 장치 | 핀 배정 | 인터페이스 | 사양 |
|:-----|:--------|:----------|:-----|
| LED (빨강) | GPIO25 | Digital OUT | Active LOW |
| LED (노랑) | GPIO26 | Digital OUT | Active LOW |
| LED (파랑) | GPIO27 | Digital OUT | Active LOW |
| 부저 (능동) | GPIO14 | Digital OUT | Active LOW |
| 멜로디 부저 (수동) | GPIO33 | PWM (tone) | 주파수 제어 |
| OLED 디스플레이 | GPIO21(SDA), GPIO22(SCL) | I2C | SSD1306, 128x64, 0.96", addr 0x3C |
| 온습도 센서 | GPIO21(SDA), GPIO22(SCL) | I2C | AHT20, addr 0x38 |
| 스위치 | GPIO32 | Digital IN | INPUT_PULLUP, Active LOW |

### 2.3 I2C 버스 구성

```
I2C Bus (GPIO21=SDA, GPIO22=SCL, 100kHz)
├── SSD1306 OLED (0x3C)
└── AHT20 온습도 센서 (0x38)
```

---

## 3. 소프트웨어 아키텍처

### 3.1 전체 소프트웨어 스택

| 계층 | 컴포넌트 | 기술 스택 |
|:-----|:---------|:---------|
| 스마트폰 앱 | UTTEC Local / UTTEC Cloud | Flutter 3.32.2, Dart |
| 빌드 서버 | 로컬 / 클라우드 | Python 3, FastAPI, Uvicorn |
| AI 코드 생성 | Claude API | Claude Sonnet 4.6 (클라우드), stream-json (로컬) |
| 펌웨어 빌드 | Arduino-CLI | ESP32 Arduino Core 3.2.0 |
| 펌웨어 | BLE OTA Bootloader | Arduino + NimBLE-Arduino 2.3.7 |
| RTOS | FreeRTOS | ESP-IDF 기반 (Arduino 래퍼) |

### 3.2 컴포넌트 상세

#### 3.2.1 스마트폰 앱 (Flutter)

**앱 종류 (동시 설치 가능)**

| 앱 | 패키지명 | 기본 서버 | 용도 |
|:---|:---------|:---------|:-----|
| UTTEC Local | com.uttec.local | http://192.168.0.2:8092 | 로컬 PC 빌드 (개발/테스트) |
| UTTEC Cloud | com.uttec.cloud | http://178.128.90.37:8092 | 클라우드 빌드 (배포/교육) |

**5탭 UI 구조**

| 탭 | 기능 | 핵심 기술 |
|:---|:-----|:---------|
| 홈 | 프롬프트 입력 → 빌드 → BLE OTA 전송 | HTTP REST + BLE GATT |
| HW | 9개 하드웨어 부품 상세 설명 | 교육 콘텐츠 |
| SW | C언어/GPIO/반복문 학습 + 코드 뷰어 | 인터랙티브 코드 카드 |
| 패드 | LED/부저/피아노/OLED/온도 실시간 제어 | BLE CMD 특성 (FE04) |
| 설정 | 서버 URL, BLE 기기 스캔/선택/이름변경 | SharedPreferences + NVS |

**앱 의존성**

| 패키지 | 버전 | 용도 |
|:-------|:-----|:-----|
| http | ^1.2.0 | REST API 통신 |
| flutter_blue_plus | ^1.35.0 | BLE 통신 |
| permission_handler | ^11.3.0 | 안드로이드 권한 관리 |
| shared_preferences | ^2.3.0 | 앱 설정 영구 저장 |

**홈 탭 동작 플로우**

```
1. 사용자 프롬프트 입력 (예: "학교종 멜로디 2회 반복")
2. POST /api/v1/generate → job_id 반환
3. GET /api/v1/status/{id} 폴링 (3초 간격)
4. 빌드 성공 → GET /api/v1/download/{id} → .bin 다운로드
5. BLE 자동 연결 (저장된 MAC 주소 기반)
6. BLE OTA 전송 (FE01:제어, FE02:데이터, FE03:상태)
7. ESP32 자동 재부팅 → 새 펌웨어 실행
```

#### 3.2.2 빌드 서버 (FastAPI)

**서버 구성**

| 서버 | 호스트 | 포트 | 프레임워크 | AI 모델 |
|:-----|:------|:-----|:----------|:--------|
| 로컬 Arduino | Windows PC | 8092 | build_server_arduino.py | stream-json 모드 |
| 클라우드 Arduino | 178.128.90.37 (DO) | 8092 | build_server_cloud_arduino.py | Claude Sonnet 4.6 |
| 레거시 ESP-IDF | Windows PC | 8091 | build_server_local.py | stream-json 모드 |
| 레거시 클라우드 | 178.128.90.37 (DO) | 8090 | build_server.py | ESP-IDF text 모드 |

**REST API 명세**

| Method | Endpoint | 설명 | 요청 | 응답 |
|:-------|:---------|:-----|:-----|:-----|
| GET | /health | 서버 상태 확인 | - | {status, build_system, acli_exists, active_jobs} |
| POST | /api/v1/generate | 빌드 시작 | {prompt, retry_on_fail, max_retries} | {job_id, status} |
| GET | /api/v1/status/{id} | 빌드 상태 조회 | - | {job_id, status, progress, message, timing, ...} |
| GET | /api/v1/download/{id} | 펌웨어 다운로드 | - | binary (.bin) |
| GET | /api/v1/code/{id} | 생성 코드 조회 | - | {code, status} |

**빌드 파이프라인**

```
1. 프롬프트 수신
2. 시스템 프롬프트 + 사용자 프롬프트 합성
3. Claude CLI 호출 → Arduino 코드 생성 (--model claude-sonnet-4-6 --tools "")
4. 코드 정제 (마크다운 제거, #include 제거, 코드 시작점 탐색)
5. 베이스 펌웨어 + 생성 코드 병합 (marker: "// ─── LED Task ───")
6. Arduino-CLI 빌드 (--fqbn esp32:esp32:esp32 --build-property build.partitions=min_spiffs)
7. .bin 파일 해시(SHA256) 계산 및 저장
8. 실패 시 최대 3회 자동 재시도
```

**성능 측정 (timing 필드)**

| 단계 | 키 | 설명 | 평균 시간 |
|:-----|:---|:-----|:---------|
| 초기화 | 1_init | 공유 빌드 디렉토리 준비 | <0.1초 |
| AI 코드 생성 | 2_claude_gen | Claude CLI 호출 및 응답 | 12~70초 |
| 코드 병합 | 3_merge | 베이스+사용자 코드 합치기 | <0.1초 |
| Arduino 빌드 | 4_build | arduino-cli compile | 24~26초 |
| 결과 처리 | 5_copy_hash | .bin 복사 및 SHA256 | <0.1초 |
| **전체** | **total** | | **35~70초** |

**시스템 프롬프트 주요 규칙**

| # | 규칙 | 목적 |
|:--|:-----|:-----|
| 1 | 코드만 출력 (설명/마크다운 금지) | 파싱 안정성 |
| 2 | setup()+loop()만 정의 | 베이스 코드 충돌 방지 |
| 3 | #include 금지 | 베이스에 이미 포함 |
| 4 | initHardware() + initBLE() 필수 호출 | 하드웨어/BLE 보장 |
| 5 | 기존 함수 재정의 금지 | 빌드 에러 방지 |
| 6 | tone() 전용 (LEDC 금지) | ESP32 호환성 |
| 7 | 한국어 주석 간결하게 | 교육용 + 속도 |
| 8 | LED Active LOW | 하드웨어 극성 일치 |

#### 3.2.3 펌웨어 (ESP32 Arduino)

**구조**

```
ble_ota_arduino.ino (444줄)
├── BLE OTA Service (NimBLE)
│   ├── FE01: OTA_CONTROL (Write) — START/END/ABORT
│   ├── FE02: OTA_DATA (Write No Response) — 펌웨어 청크
│   ├── FE03: OTA_STATUS (Notify) — 진행률
│   └── FE04: CMD (Write) — 패드 실시간 제어
│
├── 하드웨어 초기화 (initHardware)
│   ├── LED x3 핀 초기화 (Active LOW)
│   ├── 부저 핀 초기화 (Active LOW)
│   └── I2C + OLED 초기화
│
├── AHT20 온습도 센서
│   ├── aht20_init() — 소프트 리셋 + 캘리브레이션
│   └── aht20_read() — 온도/습도 읽기
│
├── CMD 핸들러 (BLE FE04 특성)
│   ├── LED_RED_ON/OFF, LED_YELLOW_ON/OFF, LED_BLUE_ON/OFF
│   ├── LED_ALL_OFF
│   ├── BEEP (능동 부저)
│   ├── NOTE_0~7 (멜로디 부저, 도레미파솔라시도)
│   ├── OLED:{text} (OLED 텍스트 표시)
│   ├── TEMP (AHT20 온습도 → OLED 표시)
│   └── SETNAME:{name} (BLE 이름 변경 + NVS 저장 + 재부팅)
│
├── BLE 이름 영구 저장 (NVS/Preferences)
│
└── 사용자 생성 코드 영역 (marker 이후)
    ├── setup() — initHardware() + initBLE() + 사용자 로직
    └── loop() — delay(10000)

ssd1306.h (140줄)
└── SSD1306 OLED 드라이버 (I2C, 128x64)
```

**BLE 프로토콜**

| UUID | 이름 | 속성 | 용도 |
|:-----|:-----|:-----|:-----|
| 0000FE00-... | OTA Service | - | 서비스 UUID |
| 0000FE01-... | OTA_CONTROL | Write | OTA 시작/종료/중단 |
| 0000FE02-... | OTA_DATA | Write No Response | 펌웨어 데이터 청크 |
| 0000FE03-... | OTA_STATUS | Notify | 상태/진행률 알림 |
| 0000FE04-... | CMD | Write | 패드 실시간 명령 |

**OTA 프로토콜**

| 단계 | 제어 바이트 | 설명 |
|:-----|:-----------|:-----|
| 시작 | 0x01 + 4바이트 크기 | Update.begin() |
| 데이터 | FE02에 청크 전송 | Update.write(), 2KB마다 진행률 알림 |
| 종료 | 0x02 | Update.end() → 검증 → 재부팅 |
| 중단 | 0x03 | Update.abort() |

**OTA 전송 성능**

| 항목 | 값 |
|:-----|:---|
| MTU | 256 bytes |
| 펌웨어 크기 | ~650KB |
| 전송 시간 | ~14초 |
| 전송 속도 | ~46KB/s |

---

## 4. 서버 인프라

### 4.1 클라우드 서버 (Digital Ocean)

| 항목 | 사양 |
|:-----|:-----|
| 제공자 | Digital Ocean Droplet |
| IP | 178.128.90.37 |
| 리전 | SGP1 (싱가포르) |
| OS | Ubuntu 24.04 LTS |
| CPU | 2 vCPU |
| RAM | 4GB |
| 디스크 | 77GB SSD |
| 설치 소프트웨어 | Arduino-CLI 1.1.1, ESP32 Core 3.2.0, NimBLE-Arduino 2.3.7, Claude CLI 2.x, Python 3, FastAPI |

### 4.2 systemd 서비스

| 서비스 | 파일 | 포트 | 설명 |
|:-------|:-----|:-----|:-----|
| uttec-arduino | /etc/systemd/system/uttec-arduino.service | 8092 | Arduino 빌드 서버 (자동 시작, 자동 재시작) |

### 4.3 방화벽 (UFW)

| 포트 | 용도 |
|:-----|:-----|
| 22 | SSH |
| 80 | HTTP (향후 HTTPS 리다이렉트) |
| 8090 | ESP-IDF 빌드 서버 (레거시) |
| 8092 | Arduino 빌드 서버 (현재 사용) |

### 4.4 로컬 개발 서버 (Windows PC)

| 항목 | 사양 |
|:-----|:-----|
| OS | Windows 11 Pro |
| Arduino-CLI | ~/bin/arduino-cli.exe |
| Flutter SDK | C:\src\flutter\ (3.32.2) |
| 포트 8091 | ESP-IDF 로컬 빌드 서버 |
| 포트 8092 | Arduino 로컬 빌드 서버 |

---

## 5. 파일 구조

```
aiHardStudy/
├── firmware/
│   ├── ble_ota_arduino/              ← Arduino 펌웨어 (현재)
│   │   ├── ble_ota_arduino.ino       ← BLE OTA + CMD + AHT20 (444줄)
│   │   └── ssd1306.h                 ← OLED 드라이버 (140줄)
│   ├── ble_ota/                      ← ESP-IDF 펌웨어 (레거시)
│   └── led_blink/                    ← LED 테스트
│
├── cloud/
│   ├── build_server_cloud_arduino.py ← 클라우드 빌드 서버 (350줄)
│   ├── build_server_arduino.py       ← 로컬 빌드 서버 (370줄)
│   ├── build_server_local.py         ← ESP-IDF 로컬 서버
│   ├── build_server.py               ← ESP-IDF 클라우드 서버
│   ├── ble_ota_arduino/              ← 로컬 공유 빌드 캐시
│   └── jobs_arduino/                 ← 빌드 작업 디렉토리
│
├── smartphone/
│   ├── vibe_ut_local/                ← UTTEC Local 앱
│   │   ├── lib/main.dart             ← 5탭 앱 (2314줄)
│   │   ├── pubspec.yaml              ← Flutter 의존성
│   │   └── android/                  ← Android 설정 (com.uttec.local)
│   ├── vibe_ut_cloud/                ← UTTEC Cloud 앱
│   │   ├── lib/main.dart             ← 5탭 앱 (서버 URL만 다름)
│   │   └── android/                  ← Android 설정 (com.uttec.cloud)
│   ├── vibe_firmware_app/            ← 원본 앱 (아카이브)
│   └── app/                          ← PWA 웹앱 (이전)
│
├── hardware/                         ← 보드 문서, 핀맵
├── 시스템사양서/                       ← 이 문서
├── 진행사항/                          ← 일자별 진행사항 문서
└── 기본 검토자료/                     ← 기획 문서
```

---

## 6. 통신 프로토콜

### 6.1 앱 ↔ 빌드 서버 (HTTP REST)

| 단계 | 메서드 | 엔드포인트 | 데이터 |
|:-----|:-------|:----------|:-------|
| 빌드 요청 | POST | /api/v1/generate | {"prompt": "..."} |
| 상태 폴링 | GET | /api/v1/status/{id} | - |
| 바이너리 수신 | GET | /api/v1/download/{id} | .bin (application/octet-stream) |
| 코드 조회 | GET | /api/v1/code/{id} | {"code": "..."} |

### 6.2 앱 ↔ ESP32 (BLE GATT)

| 용도 | UUID | 방향 | 데이터 |
|:-----|:-----|:-----|:-------|
| OTA 제어 | FE01 | 앱→ESP32 | 0x01(시작), 0x02(종료), 0x03(중단) |
| OTA 데이터 | FE02 | 앱→ESP32 | 펌웨어 바이너리 청크 (MTU=256) |
| OTA 상태 | FE03 | ESP32→앱 | [상태코드, 진행률%] (Notify) |
| CMD 제어 | FE04 | 앱→ESP32 | 문자열 명령 (UTF-8) |

### 6.3 CMD 명령어 목록 (FE04)

| 명령 | 동작 |
|:-----|:-----|
| LED_RED_ON / LED_RED_OFF | 빨간 LED 켜기/끄기 |
| LED_YELLOW_ON / LED_YELLOW_OFF | 노란 LED 켜기/끄기 |
| LED_BLUE_ON / LED_BLUE_OFF | 파란 LED 켜기/끄기 |
| LED_ALL_OFF | 전체 LED 끄기 |
| BEEP | 능동 부저 100ms 울림 |
| NOTE_0 ~ NOTE_7 | 멜로디 부저 (도레미파솔라시도) |
| OLED:{text} | OLED에 텍스트 표시 |
| TEMP | AHT20 온습도 → OLED 표시 |
| SETNAME:{name} | BLE 이름 변경 + NVS 저장 + 재부팅 |

---

## 7. 교육 기능

### 7.1 예시 프롬프트 (홈 탭)

| 프롬프트 | 난이도 | 생성 시간 |
|:---------|:------:|:---------|
| LED 깜빡이기 | 초급 | ~35초 |
| 부저 5회 울리고 멈추기 | 초급 | ~35초 |
| 학교종 멜로디 2회 반복 | 중급 | ~50초 |
| 온도 측정해서 OLED에 표시 | 중급 | ~38초 |
| RGB LED 순차 점등 + 부저 | 중급 | ~45초 |

### 7.2 코드 학습 카드

AI가 생성한 코드에 포함된 한국어 주석을 파싱하여 교육용 설명 박스로 표시:

```
// [LED 켜기] GPIO25에 LOW를 보내면 빨간 LED가 켜집니다
→ 💡 "LED 켜기" 제목의 설명 카드로 변환
```

### 7.3 학생별 보드 개별 관리

```
설정 탭 → BLE 기기 스캔 → 선택 → 이름 변경
  학생 A: "UTTEC-A반1번" → SharedPreferences + ESP32 NVS 영구 저장
  학생 B: "UTTEC-A반2번" → 각자 자기 보드만 찾아서 연결
```

---

## 8. 보안

### 8.1 현재 상태

| 항목 | 상태 | 비고 |
|:-----|:----:|:-----|
| HTTPS | ⬜ 미적용 | Let's Encrypt 예정 |
| API 인증 | ⬜ 미적용 | API Key 또는 JWT 예정 |
| BLE 페어링 | ⬜ 미적용 | Just Works 방식 |
| 코드 샌드박싱 | ✅ 적용 | 시스템 프롬프트로 코드 범위 제한 |
| HTTP Cleartext | ✅ 허용 | Android Manifest에서 명시 허용 |

### 8.2 향후 보안 계획

1. HTTPS 설정 (Let's Encrypt) — 통신 암호화
2. API Key 기반 인증 — 무단 빌드 요청 방지
3. 빌드 횟수 제한 (Rate Limiting) — 리소스 보호
4. BLE 본딩 — 무단 OTA 방지

---

## 9. 성능 사양

### 9.1 빌드 성능

| 측정 항목 | 로컬 (Windows) | 클라우드 (DO) |
|:---------|:--------------|:-------------|
| AI 코드 생성 | 5~15초 | 12~70초 |
| Arduino 빌드 (증분) | 30~44초 | 24~26초 |
| 전체 (단순 프롬프트) | ~45초 | ~35초 |
| 전체 (복잡 프롬프트) | ~60초 | ~70초 |
| 빌드 재시도 시 | +40~80초 | +40~80초 |

### 9.2 BLE OTA 성능

| 항목 | 값 |
|:-----|:---|
| BLE MTU | 256 bytes |
| 펌웨어 크기 | ~650KB |
| OTA 전송 시간 | ~14초 |
| 전송 속도 | ~46KB/s |
| ESP32 재부팅 | ~3초 |

### 9.3 전체 E2E 성능

| 단계 | 시간 |
|:-----|:-----|
| 프롬프트 → AI 코드 생성 | 12~70초 |
| Arduino 빌드 | 24~26초 |
| .bin 다운로드 | ~1초 |
| BLE 자동 연결 | ~5초 |
| BLE OTA 전송 | ~14초 |
| ESP32 재부팅 | ~3초 |
| **합계** | **35~120초** |

---

## 10. 개발 환경 및 도구

| 도구 | 버전 | 용도 |
|:-----|:-----|:-----|
| Arduino-CLI | 1.1.1 | ESP32 펌웨어 빌드 |
| ESP32 Arduino Core | 3.2.0 | ESP32 HAL/라이브러리 |
| NimBLE-Arduino | 2.3.7 | BLE 스택 |
| Flutter SDK | 3.32.2 | 스마트폰 앱 개발 |
| Python | 3.12+ | 빌드 서버 |
| FastAPI | 0.133.0 | REST API 프레임워크 |
| Uvicorn | latest | ASGI 서버 |
| Claude CLI | 2.x | AI 코드 생성 |
| Claude Model | claude-sonnet-4-6 | 클라우드 빌드 서버 |
| ADB | Android SDK | APK 설치 |

---

## 11. 프로젝트 이력

| 날짜 | 마일스톤 |
|:-----|:---------|
| 2026-04-06 | Phase 0: Claude CLI 연동 검증 |
| 2026-04-11 | Phase 1: 로컬 개발환경 구축 |
| 2026-04-11 | Phase 2: E2E 파이프라인 (로컬 USB) |
| 2026-04-12 | Phase 3: BLE OTA 부트로더 완성 |
| 2026-04-12 | Phase 4: E2E 통합 (스마트폰 BLE OTA) |
| 2026-04-12 | Phase 5: Arduino 전환 + Flutter 5탭 앱 |
| 2026-04-12 | Phase 6: 클라우드 배포 (DO Arduino 빌드 서버) |
| 2026-04-12 | Phase 6: 듀얼 앱 (UTTEC Local / UTTEC Cloud) |

---

## 12. 향후 계획

| 우선순위 | 항목 | 설명 |
|:--------:|:-----|:-----|
| 높음 | HTTPS 설정 | Let's Encrypt, 통신 보안 |
| 높음 | HW/SW 탭 콘텐츠 완성 | 레슨 4~6 잠금 해제 |
| 중간 | Google Play 배포 | APK → AAB 변환, 스토어 등록 |
| 중간 | ESP32-C3 보드 지원 | 보드 프로파일 추가 |
| 중간 | 투자자 데모 영상 | 전체 E2E 시연 촬영 |
| 낮음 | LoRa 통신 연동 | 원격 모니터링 |
| 낮음 | 웹 대시보드 | 빌드 이력/통계 |

---

**문서 끝**
