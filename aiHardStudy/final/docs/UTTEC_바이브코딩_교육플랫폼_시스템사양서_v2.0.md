# UTTEC 바이브코딩 교육 플랫폼 — 시스템 사양서 v2.0

**문서번호**: UTTEC-SYS-SPEC-2026-002
**작성일**: 2026-04-12
**버전**: 2.0
**변경 사항**: Web App(PWA) 클라이언트 추가, HTTPS 적용, 코딩 질문 API 추가, Flutter/Web 비교

---

## 1. 시스템 개요

### 1.1 제품 정의

스마트폰 또는 웹 브라우저에서 자연어(한국어)로 원하는 동작을 입력하면 AI가 ESP32 펌웨어 코드를 자동 생성하고, 무선(BLE OTA)으로 보드에 전송하여 즉시 동작시키는 IoT 교육 플랫폼.

### 1.2 핵심 가치

- **코딩 없이 하드웨어 제어**: 자연어 프롬프트 → AI 코드 생성 → 자동 빌드 → 무선 전송
- **전체 소요 시간**: 프롬프트 입력부터 보드 동작까지 **35~70초**
- **교육 현장 최적화**: 학생별 보드 개별 식별, 한국어 코드 주석, 학습 카드 제공
- **앱 설치 불필요**: 웹 브라우저(Chrome)만으로 전체 기능 사용 가능 (PWA)
- **AI 코딩 튜터**: 코딩 질문에 대한 AI 실시간 답변 제공

### 1.3 클라이언트 구성

| 클라이언트 | 기술 | 설치 방식 | BLE 지원 |
|:----------|:-----|:---------|:---------|
| Flutter 네이티브 앱 | Flutter 3.32.2 + Dart | APK (USB/Play Store) | flutter_blue_plus |
| Web App (PWA) | HTML/CSS/JS | URL 접속 → 홈 화면 추가 | Web Bluetooth API |

### 1.4 시스템 구성도

```
┌──────────────────┐                        ┌──────────────────┐
│  클라이언트        │     HTTPS/REST        │  Nginx (443)     │
│                  │ ───────────────────▶   │  Let's Encrypt   │
│  ┌─── Flutter ───┐│                       │       │          │
│  │ APK 네이티브앱 ││                       │  ┌────▼────┐     │
│  └───────────────┘│                       │  │ Web UI   │     │
│                  │                       │  │ (8094)   │     │
│  ┌─── Web App ───┐│                       │  └────┬────┘     │
│  │ Chrome PWA   ││                       │       │ 프록시    │
│  └───────────────┘│                       │  ┌────▼────┐     │
│                  │                       │  │빌드 서버  │     │
│                  │     BLE OTA           │  │ (8092)   │     │
│                  │ ───────────────────▶   │  │Claude AI │     │
│                  │     펌웨어 전송         │  │Arduino   │     │
│                  │ ◀───────────────────   │  └─────────┘     │
│                  │     상태 알림          └──────────────────┘
│                  │
│                  │     BLE GATT          ┌──────────────────┐
│                  │ ───────────────────▶   │  ESP32 보드       │
│                  │ ◀───────────────────   │  (UTTEC Board)   │
│                  │                       │  LED/부저/OLED    │
└──────────────────┘                       └──────────────────┘
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
| Flutter 앱 | UTTEC Local / UTTEC Cloud | Flutter 3.32.2, Dart |
| Web App (PWA) | UTTEC Web | HTML/CSS/JS, Web Bluetooth API |
| 웹 UI 서버 | 정적 파일 + API 프록시 | Python 3, FastAPI (8094) |
| 빌드 서버 | 코드 생성 + 빌드 | Python 3, FastAPI (8092) |
| AI 코드 생성 | Claude CLI | Claude Sonnet 4.6 |
| 펌웨어 빌드 | Arduino-CLI | ESP32 Arduino Core 3.2.0 |
| 펌웨어 | BLE OTA Bootloader | Arduino + NimBLE-Arduino 2.3.7 |
| RTOS | FreeRTOS | ESP-IDF 기반 (Arduino 래퍼) |
| 리버스 프록시 | Nginx + SSL | Let's Encrypt 자동 갱신 |

### 3.2 Flutter 앱 vs Web App 비교

#### 3.2.1 기능 비교

| 기능 | Flutter 앱 | Web App (PWA) |
|:-----|:----------|:-------------|
| 프롬프트 → 빌드 → OTA | O | O |
| BLE 실시간 제어 (패드) | O | O (Chrome Android) |
| HW 학습 (3x3 그리드 → 상세) | O | O |
| SW 학습 (레슨 + 코드 뷰어) | O | O |
| 코딩 질문 AI 답변 | X | O (신규) |
| 단계별 빌드 시간 표시 | X | O (신규) |
| BLE 기기 스캔/선택 | O (자동 MAC 기반) | O (브라우저 팝업) |
| BLE 이름 변경 | O (앱+NVS 동시) | O (NVS) |
| 스위치 실시간 모니터 | O (FE05 Notify) | O (FE05 Notify) |
| 설정 영구 저장 | SharedPreferences | localStorage |
| 오프라인 동작 | O (앱 자체) | 제한적 (캐시) |

#### 3.2.2 기술 비교

| 항목 | Flutter 앱 | Web App (PWA) |
|:-----|:----------|:-------------|
| **언어** | Dart | HTML/CSS/JavaScript |
| **UI 프레임워크** | Flutter Material | 순수 CSS (다크 테마) |
| **BLE 라이브러리** | flutter_blue_plus | Web Bluetooth API |
| **HTTP 통신** | http 패키지 | fetch API |
| **데이터 저장** | SharedPreferences | localStorage |
| **빌드 도구** | Flutter SDK + Gradle | 없음 (정적 HTML) |
| **배포** | APK → USB 또는 Play Store | URL 접속 즉시 |
| **업데이트** | APK 재빌드 + 재설치 | 서버 파일 교체 즉시 |
| **코드 규모** | ~2300줄 (main.dart) | ~1200줄 (index.html) |

#### 3.2.3 BLE 구현 차이

**Flutter (flutter_blue_plus)**
```dart
// 자동 스캔 → MAC 주소로 자동 연결
await FlutterBluePlus.startScan(timeout: Duration(seconds: 5));
// 저장된 MAC 주소와 매칭
for (var r in results) {
  if (r.device.remoteId.toString() == savedMac) {
    target = r; break;
  }
}
await target.device.connect();
// 서비스 디스커버리 → 특성 직접 접근
List<BluetoothService> services = await device.discoverServices();
```

**Web App (Web Bluetooth API)**
```javascript
// 브라우저 기기 선택 팝업 (사용자 직접 선택 필수)
bleDevice = await navigator.bluetooth.requestDevice({
  acceptAllDevices: true,
  optionalServices: ['0000fe00-0000-1000-8000-00805f9b34fb']
});
bleServer = await bleDevice.gatt.connect();
const svc = await bleServer.getPrimaryService(OTA_SVC);
cmdChar = await svc.getCharacteristic(OTA_CMD);
```

| 항목 | Flutter | Web Bluetooth |
|:-----|:--------|:-------------|
| BLE 스캔 | 백그라운드 자동 | 사용자 선택 팝업 필수 |
| MAC 주소 저장 | O (자동 재연결) | X (매번 선택) |
| HTTPS 필수 | X | O (Secure Context) |
| iOS 지원 | O | X (Apple 미지원) |
| Android 지원 | O | O (Chrome만) |

#### 3.2.4 배포/운영 비교

| 항목 | Flutter 앱 | Web App |
|:-----|:----------|:--------|
| **초기 배포** | APK 빌드 (수 분) + USB 설치 | URL 공유 즉시 |
| **업데이트** | 재빌드 + 재설치 | 서버 HTML 교체 (0초) |
| **교육 현장 배포** | 30대 폰에 각각 설치 필요 | URL 1개 공유로 끝 |
| **Play Store** | 심사 1~3일 | 불필요 |
| **개발 환경** | Flutter SDK + Android Studio | 텍스트 에디터만 |
| **멀티 플랫폼** | Android + (iOS 가능) | Chrome Android + Desktop |

### 3.3 Web App 상세 (신규)

#### 3.3.1 PWA 구성

| 파일 | 역할 |
|:-----|:-----|
| index.html | 단일 페이지 앱 (5탭 + 코딩 질문) |
| manifest.json | PWA 매니페스트 (홈 화면 설치) |
| icon-192.png, icon-512.png | PWA 아이콘 |

**PWA 설치 방법**
```
1. Chrome Android에서 https://uttec-ai.duckdns.org/firmware 접속
2. ⋮ 메뉴 → "홈 화면에 추가" 또는 "앱 설치"
3. 홈 화면에 UTTEC 아이콘 생성
4. 탭하면 주소창 없이 전체화면 앱으로 실행
```

#### 3.3.2 Web App 5탭 + 코딩 질문 구조

| 탭 | 기능 | 핵심 기술 |
|:---|:-----|:---------|
| 홈 | 펌웨어 빌드 + 코딩 질문 (2개 카드 분리) | HTTP REST + Web Bluetooth |
| HW | 9개 하드웨어 부품 (3x3 그리드 → 상세 페이지) | 인터랙티브 UI |
| SW | 레슨 카드 (잠금/별점) + 인터랙티브 코드 뷰어 + 퀴즈 | 줄 클릭 → 설명 |
| 패드 | LED 토글/부저/피아노/OLED/온도/스위치모니터/콤보 | Web Bluetooth CMD |
| 설정 | 서버 URL, BLE 기기 스캔/이름변경, 시스템 정보 | localStorage |

**홈 탭 — 펌웨어 만들기 카드**
```
1. 예시 프롬프트 칩 터치 → 자동 입력
2. [빌드 & 전송] 버튼
3. 단계별 진행 표시:
   Step 1. AI 코드 생성 (Claude)  — 12~70초
   Step 2. Arduino 빌드           — 24~26초
4. 완료 시 timing 요약 표시
5. BLE 자동 연결 → OTA 전송
```

**홈 탭 — 코딩 질문 카드 (신규)**
```
1. 예시 질문 칩: "for문이 뭐야?", "I2C 통신" 등
2. [질문하기] 버튼 (보라색)
3. Claude AI가 한국어로 답변 (코드 블록 + 마크다운 포맷)
4. 응답 시간 표시
```

### 3.4 Flutter 앱 상세

#### 3.4.1 앱 종류 (동시 설치 가능)

| 앱 | 패키지명 | 기본 서버 | 용도 |
|:---|:---------|:---------|:-----|
| UTTEC Local | com.uttec.local | http://192.168.0.2:8092 | 로컬 PC 빌드 (개발/테스트) |
| UTTEC Cloud | com.uttec.cloud | http://178.128.90.37:8092 | 클라우드 빌드 (배포/교육) |

#### 3.4.2 앱 의존성

| 패키지 | 버전 | 용도 |
|:-------|:-----|:-----|
| http | ^1.2.0 | REST API 통신 |
| flutter_blue_plus | ^1.35.0 | BLE 통신 |
| permission_handler | ^11.3.0 | 안드로이드 권한 관리 |
| shared_preferences | ^2.3.0 | 앱 설정 영구 저장 |

### 3.5 빌드 서버 (FastAPI)

#### 3.5.1 서버 구성

| 서버 | 호스트 | 포트 | 파일 | 역할 |
|:-----|:------|:-----|:-----|:-----|
| 빌드 서버 | 178.128.90.37 | 8092 | build_server_cloud_arduino.py | AI 코드 생성 + Arduino 빌드 + 코딩 질문 |
| 웹 UI 서버 | 178.128.90.37 | 8094 | web_ui_server.py | Web App 서빙 + API 프록시 |
| 로컬 Arduino | Windows PC | 8092 | build_server_arduino.py | 로컬 빌드 (개발용) |

#### 3.5.2 REST API 명세

| Method | Endpoint | 설명 | 요청 | 응답 |
|:-------|:---------|:-----|:-----|:-----|
| GET | /health | 서버 상태 확인 | - | {status, build_system, acli_exists, active_jobs} |
| POST | /api/v1/generate | 빌드 시작 | {prompt, retry_on_fail, max_retries} | {job_id, status} |
| GET | /api/v1/status/{id} | 빌드 상태 조회 | - | {job_id, status, progress, message, timing} |
| GET | /api/v1/download/{id} | 펌웨어 다운로드 | - | binary (.bin) |
| GET | /api/v1/code/{id} | 생성 코드 조회 | - | {code, status} |
| POST | /api/v1/chat | **코딩 질문 (신규)** | {question} | {answer, elapsed} |

#### 3.5.3 빌드 파이프라인

```
1. 프롬프트 수신
2. 시스템 프롬프트 + 사용자 프롬프트 합성 (prepare_prompt)
3. Claude CLI 호출 → Arduino 코드 생성 (call_claude)
4. 코드 정제 (마크다운 제거, #include 제거, 코드 시작점 탐색)
5. 베이스 펌웨어 + 생성 코드 병합 (marker: "// ─── LED Task ───")
6. Arduino-CLI 빌드 (--fqbn esp32:esp32:esp32 --build-property build.partitions=min_spiffs)
7. .bin 파일 해시(SHA256) 계산 및 저장
8. 실패 시 최대 3회 자동 재시도
```

#### 3.5.4 성능 측정 (timing 필드)

| 단계 | 키 | 설명 | 평균 시간 |
|:-----|:---|:-----|:---------|
| 초기화 | 1_init | 공유 빌드 디렉토리 준비 | <0.1초 |
| 프롬프트 합성 | 2a_prompt | 시스템+사용자 프롬프트 결합 | <0.1초 |
| AI 코드 생성 | 2b_claude | Claude CLI 호출 및 응답 | 12~70초 |
| 코드 병합 | 3_merge | 베이스+사용자 코드 합치기 | <0.1초 |
| Arduino 빌드 | 4_build | arduino-cli compile | 24~26초 |
| 결과 처리 | 5_copy_hash | .bin 복사 및 SHA256 | <0.1초 |
| **전체** | **total** | | **35~70초** |

**Web App 단계별 표시** (사용자 화면)

| Step | 내용 | 표시 |
|:-----|:-----|:-----|
| Step 1 | AI 코드 생성 (Claude) | 실시간 경과 시간 + 완료 시 소요 시간 |
| Step 2 | Arduino 빌드 | 실시간 경과 시간 + 완료 시 소요 시간 |

#### 3.5.5 코딩 질문 API (신규)

```
시스템 프롬프트: ESP32/Arduino 초보자 대상 한국어 코딩 튜터
사용자 질문 → Claude Sonnet 4.6 → 한국어 답변 (코드 예시 포함)
평균 응답 시간: 5~15초
```

#### 3.5.6 시스템 프롬프트 주요 규칙

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

### 3.6 펌웨어 (ESP32 Arduino)

**구조**

```
ble_ota_arduino.ino (444줄)
├── BLE OTA Service (NimBLE)
│   ├── FE01: OTA_CONTROL (Write) — START/END/ABORT
│   ├── FE02: OTA_DATA (Write No Response) — 펌웨어 청크
│   ├── FE03: OTA_STATUS (Notify) — 진행률
│   ├── FE04: CMD (Write) — 패드 실시간 제어
│   └── FE05: SENSOR (Notify) — 스위치 상태
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

---

## 4. 서버 인프라

### 4.1 클라우드 서버 (Digital Ocean)

| 항목 | 사양 |
|:-----|:-----|
| 제공자 | Digital Ocean Droplet |
| IP | 178.128.90.37 |
| 도메인 | uttec-ai.duckdns.org (Duck DNS, 무료) |
| 리전 | SGP1 (싱가포르) |
| OS | Ubuntu 24.04 LTS |
| CPU | 2 vCPU |
| RAM | 4GB |
| 디스크 | 77GB SSD |
| 설치 소프트웨어 | Arduino-CLI 1.1.1, ESP32 Core 3.2.0, NimBLE-Arduino 2.3.7, Claude CLI 2.x, Python 3, FastAPI, Nginx, Certbot |

### 4.2 systemd 서비스

| 서비스 | 파일 | 포트 | 설명 |
|:-------|:-----|:-----|:-----|
| nginx | /etc/nginx/ | 80/443 | 리버스 프록시 + HTTPS |
| uttec-arduino | uttec-arduino.service | 8092 | Arduino 빌드 서버 |
| uttec-webui | uttec-webui.service | 8094 | Web UI 서버 |

### 4.3 Nginx 구성

```
uttec-ai.duckdns.org (443 HTTPS — Let's Encrypt)
├── /firmware     → 8094 (웹 UI 서버 — PWA + 정적 파일)
├── /api/v1/*     → 8094 → 8092 (빌드 API 프록시)
└── /             → 3002 (ai-education Next.js)
```

### 4.4 SSL 인증서

| 항목 | 값 |
|:-----|:---|
| 발급자 | Let's Encrypt |
| 도메인 | uttec-ai.duckdns.org |
| 인증서 경로 | /etc/letsencrypt/live/uttec-ai.duckdns.org/ |
| 만료일 | 자동 갱신 (90일 주기) |
| HTTP → HTTPS | 자동 리다이렉트 (Certbot) |

### 4.5 방화벽 (UFW)

| 포트 | 용도 |
|:-----|:-----|
| 22 | SSH |
| 80 | HTTP → HTTPS 리다이렉트 |
| 443 | HTTPS (Nginx) |
| 8092 | Arduino 빌드 서버 (직접 접근) |
| 8094 | Web UI 서버 (직접 접근) |

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
│   ├── build_server_cloud_arduino.py ← 클라우드 빌드 서버 + 코딩 질문 API
│   ├── web_ui_server.py              ← Web UI 서버 (8094) + API 프록시
│   ├── web/                          ← Web App 정적 파일
│   │   ├── index.html                ← PWA 단일 페이지 앱 (~1200줄)
│   │   ├── manifest.json             ← PWA 매니페스트
│   │   ├── icon-192.png              ← PWA 아이콘
│   │   └── icon-512.png              ← PWA 아이콘
│   ├── build_server_arduino.py       ← 로컬 빌드 서버 (370줄)
│   ├── nginx-uttec-ai                ← Nginx 설정 파일
│   ├── uttec-tunnel.service          ← Cloudflare Tunnel (백업)
│   ├── ble_ota_arduino/              ← 공유 빌드 캐시
│   └── jobs_arduino/                 ← 빌드 작업 디렉토리
│
├── smartphone/
│   ├── vibe_ut_local/                ← UTTEC Local Flutter 앱
│   │   ├── lib/main.dart             ← 5탭 앱 (2314줄)
│   │   └── pubspec.yaml              ← Flutter 의존성
│   ├── vibe_ut_cloud/                ← UTTEC Cloud Flutter 앱
│   │   └── lib/main.dart             ← 5탭 앱 (서버 URL만 다름)
│   └── vibe_firmware_app/            ← 원본 앱 (아카이브)
│
├── hardware/                         ← 보드 문서, 핀맵
├── 시스템사양서/                       ← 이 문서
└── 진행사항/                          ← 일자별 진행사항 문서
```

---

## 6. 통신 프로토콜

### 6.1 클라이언트 ↔ 빌드 서버 (HTTPS REST)

| 단계 | 메서드 | 엔드포인트 | 데이터 |
|:-----|:-------|:----------|:-------|
| 빌드 요청 | POST | /api/v1/generate | {"prompt": "..."} |
| 상태 폴링 | GET | /api/v1/status/{id} | - |
| 바이너리 수신 | GET | /api/v1/download/{id} | .bin (application/octet-stream) |
| 코드 조회 | GET | /api/v1/code/{id} | {"code": "..."} |
| 코딩 질문 | POST | /api/v1/chat | {"question": "..."} |

### 6.2 클라이언트 ↔ ESP32 (BLE GATT)

| 용도 | UUID | 방향 | 데이터 |
|:-----|:-----|:-----|:-------|
| OTA 제어 | FE01 | 클라이언트→ESP32 | 0x01(시작), 0x02(종료), 0x03(중단) |
| OTA 데이터 | FE02 | 클라이언트→ESP32 | 펌웨어 바이너리 청크 (MTU=256) |
| OTA 상태 | FE03 | ESP32→클라이언트 | [상태코드, 진행률%] (Notify) |
| CMD 제어 | FE04 | 클라이언트→ESP32 | 문자열 명령 (UTF-8) |
| 센서 알림 | FE05 | ESP32→클라이언트 | [0x01=스위치, 0/1=상태] (Notify) |

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
→ "LED 켜기" 제목의 설명 카드로 변환
```

### 7.3 인터랙티브 코드 뷰어 (SW 탭)

코드 각 줄을 터치하면 해당 줄의 설명이 펼쳐지는 교육용 코드 뷰어:
- 구문 하이라이팅 (전처리기=빨강, 함수=보라, 호출=주황, 주석=회색)
- 레슨 6개 (C기초, GPIO, 반복/조건, 함수, I2C, PWM) — 3개 잠금
- 퀴즈 기능

### 7.4 코딩 질문 AI 튜터 (Web App 전용)

```
홈 탭 하단 "코딩 질문하기" 카드
├── 예시 질문 칩 (for문, digital vs analog, I2C, FreeRTOS)
├── 자유 질문 입력
├── [질문하기] 버튼
└── AI 답변 표시 (마크다운 + 코드 블록 포맷)
```

### 7.5 학생별 보드 개별 관리

```
설정 탭 → BLE 기기 스캔 → 선택 → 이름 변경
  학생 A: "UTTEC-A반1번" → 앱: SharedPreferences / 웹: localStorage + ESP32 NVS
  학생 B: "UTTEC-A반2번" → 각자 자기 보드만 찾아서 연결
```

---

## 8. 보안

### 8.1 현재 상태

| 항목 | 상태 | 비고 |
|:-----|:----:|:-----|
| HTTPS | ✅ 적용 | Let's Encrypt (uttec-ai.duckdns.org) |
| HTTP → HTTPS 리다이렉트 | ✅ 적용 | Nginx + Certbot 자동 |
| API 인증 | ⬜ 미적용 | API Key 또는 JWT 예정 |
| BLE 페어링 | ⬜ 미적용 | Just Works 방식 |
| 코드 샌드박싱 | ✅ 적용 | 시스템 프롬프트로 코드 범위 제한 |
| Web Bluetooth | ✅ HTTPS 필수 충족 | Secure Context 보장 |

### 8.2 향후 보안 계획

1. API Key 기반 인증 — 무단 빌드 요청 방지
2. 빌드 횟수 제한 (Rate Limiting) — 리소스 보호
3. BLE 본딩 — 무단 OTA 방지

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

### 9.4 코딩 질문 응답 성능

| 항목 | 값 |
|:-----|:---|
| AI 모델 | Claude Sonnet 4.6 |
| 평균 응답 시간 | 5~15초 |
| 최대 타임아웃 | 120초 |

---

## 10. 개발 환경 및 도구

| 도구 | 버전 | 용도 |
|:-----|:-----|:-----|
| Arduino-CLI | 1.1.1 | ESP32 펌웨어 빌드 |
| ESP32 Arduino Core | 3.2.0 | ESP32 HAL/라이브러리 |
| NimBLE-Arduino | 2.3.7 | BLE 스택 |
| Flutter SDK | 3.32.2 | 네이티브 앱 개발 |
| Python | 3.12+ | 빌드 서버 + 웹 UI 서버 |
| FastAPI | 0.133.0 | REST API 프레임워크 |
| Uvicorn | latest | ASGI 서버 |
| Nginx | 1.24.0 | 리버스 프록시 + HTTPS |
| Certbot | 2.9.0 | Let's Encrypt 인증서 |
| Claude CLI | 2.x | AI 코드 생성 + 코딩 질문 |
| Claude Model | claude-sonnet-4-6 | 빌드 서버 + 질문 API |
| httpx | 0.28+ | 웹 UI → 빌드 서버 프록시 |
| scrcpy | 3.2 | PC에서 스마트폰 화면 미러링 |

---

## 11. 접속 URL

| URL | 기능 |
|:----|:-----|
| https://uttec-ai.duckdns.org/firmware | Web App (PWA) |
| https://uttec-ai.duckdns.org/ | AI 교육 웹사이트 |
| http://178.128.90.37:8092/health | 빌드 서버 상태 확인 (직접) |

---

## 12. 프로젝트 이력

| 날짜 | 마일스톤 |
|:-----|:---------|
| 2026-04-06 | Phase 0: Claude CLI 연동 검증 |
| 2026-04-11 | Phase 1: 로컬 개발환경 구축 |
| 2026-04-11 | Phase 2: E2E 파이프라인 (로컬 USB) |
| 2026-04-12 | Phase 3: BLE OTA 부트로더 완성 |
| 2026-04-12 | Phase 4: E2E 통합 (스마트폰 BLE OTA) |
| 2026-04-12 | Phase 5: Arduino 전환 + Flutter 5탭 앱 |
| 2026-04-12 | Phase 6: 클라우드 배포 (DO Arduino 빌드 서버) |
| 2026-04-12 | Phase 7: 듀얼 앱 (UTTEC Local / UTTEC Cloud) |
| 2026-04-12 | **Phase 8: Web App (PWA) + HTTPS + 코딩 질문 API** |

---

## 13. 동시 접속 및 확장성

### 13.1 현재 아키텍처의 제약

현재 빌드 서버는 **싱글 빌드 락** 구조로, 한 번에 하나의 빌드만 수행합니다.

```python
# 현재 빌드 서버 코드
_build_lock = False  # 전역 빌드 락 (1개)

while _build_lock:          # 다른 빌드 진행 중이면
    await asyncio.sleep(1)  # 1초마다 대기
_build_lock = True          # 락 획득 → 빌드 시작
```

**제약 요인**

| 항목 | 현재 상태 | 제약 |
|:-----|:---------|:-----|
| Arduino 빌드 | 공유 디렉토리 1개 | 동시 빌드 시 파일 충돌 |
| 빌드 락 | 전역 1개 | 한 번에 1건만 빌드 가능 |
| Claude API | 동시 호출 가능 | Anthropic Rate Limit (분당 요청 수) |
| 서버 CPU | 2 vCPU | 빌드 중 100% 사용 |
| 서버 RAM | 4GB | 동시 빌드 시 OOM 위험 |

### 13.2 동시 접속 시 영향 분석

**교육 현장 시나리오: 30명 학생 동시 접속**

```
빌드 1건 소요 시간: ~37초 (Claude 12초 + 빌드 25초)

[동시 요청 시 처리 흐름]
학생 A:  ████████████████████████████████████░░  37초 (즉시 시작)
학생 B:  ─────────────────────────────────────████████████████████████████████████░░  74초
학생 C:  ─────────────────────────────────────────────────────────────────────────████████...  111초
...
학생 10: ──────────────────────────────────────...  ~6분 대기
학생 30: ──────────────────────────────────────...  ~18분 대기 ★★★
```

| 동시 사용자 | 마지막 학생 대기 시간 | 평가 |
|:----------:|:-------------------|:-----|
| 1~2명 | 0~37초 | 문제 없음 |
| 5명 | ~3분 | 약간 불편 |
| 10명 | ~6분 | 교육 진행 어려움 |
| 30명 | ~18분 | 사실상 불가능 |

**병렬 처리 가능/불가 구간**

| 구간 | 병렬 가능 | 이유 |
|:-----|:---------|:-----|
| Web UI 접속 | O | Nginx + 정적 파일 (수백 명 가능) |
| 코딩 질문 (/chat) | O | Claude API 병렬 호출 (Rate Limit 내) |
| Claude 코드 생성 | O (부분) | API 동시 호출 가능하지만 Rate Limit |
| **Arduino 빌드** | **X** | **공유 디렉토리 1개 + 빌드 락** |
| BLE OTA 전송 | 개별 | 각 학생 스마트폰 → 각자 보드 (독립) |

### 13.3 확장 방안

#### 방안 A: 빌드 디렉토리 분리 (즉시 적용 가능)

```
현재: 공유 디렉토리 1개 → 순차 빌드
개선: job별 독립 디렉토리 → 동시 빌드

[변경 전]
~/vibe-firmware/ble_ota_arduino/  ← 1개 공유, 파일 덮어쓰기

[변경 후]
~/vibe-firmware/builds/job_a1b2/  ← job A 전용
~/vibe-firmware/builds/job_c3d4/  ← job B 전용 (동시 빌드 가능)
~/vibe-firmware/builds/job_e5f6/  ← job C 전용
```

| 항목 | 값 |
|:-----|:---|
| 동시 빌드 수 | 2~3건 (CPU 코어 수에 의존) |
| 추가 비용 | 무료 (코드 변경만) |
| 작업량 | 중 (빌드 로직 수정) |
| 디스크 사용 | job당 ~30MB (빌드 캐시 포함) |

#### 방안 B: 서버 업그레이드

| 서버 사양 | CPU | RAM | 동시 빌드 | 빌드 시간 | 비용/월 |
|:----------|:----|:----|:---------|:---------|:--------|
| **현재** | **2 vCPU** | **4GB** | **1건** | **~33초** | **$24** |
| Premium 4CPU | 4 vCPU | 8GB | 2~3건 | ~18초 | $48 |
| Premium 8CPU | 8 vCPU | 16GB | 4~6건 | ~12초 | $96 |
| CPU-Optimized 8 | 8 전용CPU | 16GB | 6~8건 | ~10초 | $168 |

방안 A + B 조합 시 예상:

| 서버 | 동시 빌드 | 10명 최대 대기 | 30명 최대 대기 |
|:-----|:---------|:-------------|:-------------|
| 2CPU + 분리 | 2건 | ~3분 | ~9분 |
| 4CPU + 분리 | 3건 | ~1분 | ~3분 |
| **8CPU + 분리** | **6건** | **~30초** | **~2.5분** |

#### 방안 C: 빌드 큐 + 공정 스케줄링

```
[현재: 선착순]
학생 A → 즉시 빌드
학생 B → A 완료 후 빌드 (37초 대기)
학생 C → B 완료 후 빌드 (74초 대기)

[개선: 우선순위 큐]
1. Claude 코드 생성은 모든 학생 동시 진행 (병렬)
2. Arduino 빌드만 큐에 등록 (순차)
3. 대기 중 예상 시간 표시 ("앞에 3명 대기 중, 약 90초 후 빌드 시작")
```

효과: 총 시간은 동일하지만, Claude 코드 생성(~12초)이 병렬로 처리되어 체감 대기 감소.

#### 방안 D: 인기 프롬프트 사전 빌드 캐시

```
교육 현장에서 자주 사용되는 프롬프트:
  "LED 깜빡이기"           → 사전 빌드 .bin 캐시
  "부저 5회 울리고 멈추기"  → 사전 빌드 .bin 캐시
  "학교종 멜로디"           → 사전 빌드 .bin 캐시

동일 프롬프트 요청 시:
  Claude 호출 생략 + 빌드 생략 → 즉시 .bin 반환 (<1초)
```

| 항목 | 값 |
|:-----|:---|
| 캐시 히트 시 응답 | <1초 |
| 저장 공간 | 프롬프트당 ~700KB (.bin + 코드) |
| 효과 | 교육 초반 예시 프롬프트에서 극적 효과 |

#### 방안 E: 다중 빌드 서버 (로드밸런싱)

```
Nginx (로드밸런서)
├── 빌드 서버 1 (178.128.90.37:8092) — 현재 서버
├── 빌드 서버 2 (새 서버:8092) — 추가
└── 빌드 서버 3 (새 서버:8092) — 추가

라운드로빈 또는 최소 연결 방식 분배
```

| 서버 수 | 동시 빌드 | 30명 최대 대기 | 비용/월 |
|:--------|:---------|:-------------|:--------|
| 1대 (현재) | 1건 | ~18분 | $24 |
| 2대 | 2건 | ~9분 | $48 |
| 3대 (4CPU) | 9건 | ~1.5분 | $144 |

### 13.4 교육 규모별 권장 구성

| 규모 | 동시 사용자 | 권장 방안 | 예상 비용 | 최대 대기 |
|:-----|:----------|:---------|:---------|:---------|
| 소규모 (1:1 ~ 1:5) | 1~5명 | 현재 그대로 | $24/월 | ~3분 |
| 중규모 (1:10 ~ 1:15) | 10~15명 | 방안 A+B (4CPU) + D | $48/월 | ~2분 |
| 대규모 (1:30) | 30명 | 방안 A+B (8CPU) + C + D | $96/월 | ~2.5분 |
| 다학급 (60명+) | 60명+ | 방안 E (다중 서버) + D | $200+/월 | ~2분 |

### 13.5 Anthropic API Rate Limit

| 항목 | Tier 1 (기본) | Tier 2 | Tier 4 |
|:-----|:-------------|:-------|:-------|
| 분당 요청 (RPM) | 50 | 1,000 | 4,000 |
| 분당 토큰 (입력) | 40,000 | 80,000 | 400,000 |
| 30명 동시 요청 | 초과 가능 | 충분 | 충분 |
| 월 예상 비용 (교육) | ~$10 | ~$10 | ~$10 |

교육 현장에서 30명이 동시에 빌드 요청 시, 입력 ~610 토큰 × 30 = 18,300 토큰/분으로 Tier 1에서도 토큰 제한은 문제없지만, RPM이 50이므로 1분 내 50건 초과 시 제한 발생 가능. Tier 2 이상 권장.

---

## 14. 향후 계획

| 우선순위 | 항목 | 설명 |
|:--------:|:-----|:-----|
| 높음 | 빌드 동시 처리 (디렉토리 분리) | 교육 현장 다인원 지원 (13장 방안 A) |
| 높음 | HW/SW 탭 콘텐츠 완성 | 레슨 4~6 잠금 해제 |
| 높음 | API 인증 | API Key 기반 무단 사용 방지 |
| 높음 | Claude CLI → Python SDK 전환 | 빌드 -3초 + 안정성 향상 |
| 중간 | 서버 4 vCPU 업그레이드 | 빌드 -15초 + 동시 3건 |
| 중간 | 인기 프롬프트 사전 빌드 캐시 | 교육 예시 즉시 응답 (<1초) |
| 중간 | Google Play 배포 | APK → AAB 변환, 스토어 등록 |
| 중간 | ESP32-C3 보드 지원 | 보드 프로파일 추가 |
| 중간 | 투자자 데모 영상 | 전체 E2E 시연 촬영 |
| 중간 | BLE 시간 동기화 | 스마트폰 → ESP32 현재 시간 전송 |
| 낮음 | LoRa 통신 연동 | 원격 모니터링 |
| 낮음 | 빌드 이력 대시보드 | 사용 통계, 인기 프롬프트 |

---

**문서 끝**
