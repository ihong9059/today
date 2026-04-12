# 2026-04-12 진행사항 — Arduino-CLI + Flutter 앱 전환

## 1. 이전 방식 vs 현재 방식 비교

### 이전 방식 (4/11)
```
스마트폰 Chrome 브라우저 (PWA 웹앱)
  → 로컬 Flask 서버 (prototype/app.py + worker_daemon.py)
  → Claude CLI → ESP-IDF 빌드 (idf.py build)
  → USB 플래싱 (esptool, COM20)
  → ESP32 동작
```

| 항목 | 내용 |
|------|------|
| 스마트폰 앱 | Chrome PWA 웹앱 (HTML/CSS/JS) |
| 빌드 프레임워크 | ESP-IDF v5.5.1 (C, FreeRTOS) |
| 빌드 도구 | idf.py + CMake + Ninja |
| 플래싱 방식 | USB (esptool → COM20) |
| 빌드 시간 | 270초 (전체), 88초 (증분) |
| BLE OTA | 크래시 발생 → 디버깅 중 |

### 현재 방식 (4/12)
```
스마트폰 Flutter 네이티브 앱 (APK 설치)
  → FastAPI 빌드 서버 (build_server_arduino.py)
  → Claude CLI → Arduino-CLI 빌드 (arduino-cli compile)
  → 스마트폰 BLE OTA 무선 전송
  → ESP32 재부팅 → 새 펌웨어 동작
```

| 항목 | 내용 |
|------|------|
| 스마트폰 앱 | Flutter 네이티브 앱 (APK, flutter_blue_plus) |
| 빌드 프레임워크 | Arduino (ESP32 Arduino Core 3.2.0) |
| 빌드 도구 | arduino-cli + NimBLE-Arduino |
| 플래싱 방식 | BLE OTA 무선 전송 (USB 불필요) |
| 빌드 시간 | 44~57초 (증분) |
| BLE OTA | 정상 동작 (NimBLE + Update 라이브러리) |

## 2. 주요 변경 사항

### 2-1. ESP-IDF → Arduino 전환

| | ESP-IDF | Arduino |
|---|---|---|
| 코드 스타일 | app_main() + FreeRTOS 필수 | setup() + loop() |
| BLE 라이브러리 | NimBLE (수동 설정) | NimBLE-Arduino (간편) |
| OTA 라이브러리 | esp_ota_ops (수동) | Update 라이브러리 (자동 파티션 전환) |
| OLED 드라이버 | 커스텀 ssd1306.h | 동일 (커스텀 ssd1306.h) |
| 빌드 시스템 | CMake + Ninja (1141개 파일) | arduino-cli (캐시 효율적) |
| Claude 코드 생성 | ESP-IDF API 불일치 빈번 | Arduino API 정확도 높음 |

**전환 이유**:
- 빌드 시간 단축 (270초 → 44초)
- Claude 코드 생성 정확도 향상 (Arduino 학습 데이터 풍부)
- 코드 간결 (초보자 교육에 적합)
- setup()/loop() 구조가 직관적

### 2-2. PWA 웹앱 → Flutter 네이티브 앱

| | PWA 웹앱 | Flutter 앱 |
|---|---|---|
| 설치 | 브라우저 접속 (URL) | APK 설치 (USB adb install) |
| BLE 사용 | Web Bluetooth (HTTPS 필요) | flutter_blue_plus (제한 없음) |
| 기능 | BLE 제한, Chrome flags 필요 | BLE 완전 지원, 네이티브 |
| UI | 5탭 HTML/CSS/JS | 5탭 Flutter (Material Design) |
| 배포 | 서버 URL 접속 | Google Play / APK 직접 배포 |

**전환 이유**:
- Web Bluetooth는 HTTPS 필수 → 개발 환경에서 불편
- 네이티브 BLE가 안정적
- 향후 iOS 확장 가능 (같은 코드)

### 2-3. USB 플래싱 → BLE OTA 무선 전송

| | USB 플래싱 | BLE OTA |
|---|---|---|
| 연결 | USB 케이블 필요 | 무선 (블루투스) |
| 속도 | 7초 (460800 baud) | 14초 (43 KB/s) |
| 편의성 | PC 필요, 케이블 연결 | 스마트폰만으로 가능 |
| OTA 크래시 | 해당 없음 | 해결됨 (ble_hs_id_infer_auto NULL 포인터 수정) |

## 3. 최종 E2E 플로우

```
[사용자]
  "LED를 깜빡여줘" (스마트폰에서 자연어 입력)
     │
     ▼
[Flutter 앱] ──HTTP──▶ [빌드 서버 (PC:8092)]
                            │
                            ├── Claude CLI: 코드 생성 (~15초)
                            ├── Arduino-CLI: 빌드 (~30초)
                            └── .bin 반환
     │
     ◀── .bin 다운로드 ────┘
     │
     ▼
[Flutter 앱] ──BLE──▶ [ESP32-WROOM-32]
                        │
                        ├── OTA 수신 (14초)
                        ├── 검증 + 파티션 전환
                        └── 재부팅 → 새 펌웨어 동작!
```

## 4. 파일 구조

```
aiHardStudy/
├── firmware/
│   ├── ble_ota/                    ← ESP-IDF 버전 (이전, 유지)
│   │   ├── main/
│   │   ├── ota_test_client.py      ← PC BLE OTA 클라이언트
│   │   └── build/
│   └── ble_ota_arduino/            ← Arduino 버전 (현재 사용)
│       ├── ble_ota_arduino.ino     ← BLE OTA 베이스 펌웨어
│       └── ssd1306.h               ← OLED 드라이버
│
├── cloud/
│   ├── build_server.py             ← 클라우드 서버 (ESP-IDF, DO:8090)
│   ├── build_server_local.py       ← 로컬 서버 (ESP-IDF, :8091)
│   ├── build_server_arduino.py     ← 로컬 서버 (Arduino, :8092) ★현재
│   ├── shared_build/               ← ESP-IDF 빌드 캐시
│   ├── ble_ota_arduino/            ← Arduino 빌드 캐시
│   ├── jobs/                       ← ESP-IDF 빌드 결과
│   └── jobs_arduino/               ← Arduino 빌드 결과
│
├── smartphone/
│   ├── vibe_firmware_app/          ← Flutter 프로젝트 ★현재
│   │   ├── lib/main.dart           ← 5탭 앱 (홈/HW/SW/패드/설정)
│   │   └── build/app/outputs/      ← APK 빌드 결과
│   ├── app/                        ← PWA 웹앱 (이전)
│   └── 앱_설계서.md
│
└── 진행사항/
    ├── 개발계획서.md
    ├── 2026-04-11_*.md             ← 이전 세션 기록
    └── 2026-04-12_Arduino_Flutter_전환_진행사항.md ← 이 문서
```

## 5. 해결한 문제들

| # | 문제 | 원인 | 해결 |
|---|------|------|------|
| 1 | BLE 광고 시 StoreProhibited 크래시 | ble_hs_id_infer_auto(0, NULL) | NULL 대신 &own_addr_type 전달 |
| 2 | NimBLE IRK store 경고 | NVS store 콜백 | no-op 콜백 함수 제공 |
| 3 | Windows Claude CLI stdout 빈 출력 | stream-json 필요 | type 파이프로 stdin 전달 |
| 4 | ESP-IDF MSYS/Mingw 감지 | MSYSTEM 환경변수 | 키 자체를 삭제 |
| 5 | Arduino OTA 코드 미반영 | 빌드 캐시 | .ino.cpp 캐시 삭제 강제 |
| 6 | Flutter 앱 BLE 이름 검색 실패 | NimBLE 2.x 광고 이름 | MAC 주소로 대체 검색 |
| 7 | OTA 후 롤백 | rollback 확인 코드 누락 | esp_ota_mark_app_valid 추가 |

## 6. 성능 요약

| 단계 | 시간 |
|------|------|
| Claude 코드 생성 | ~15초 |
| Arduino 증분 빌드 | ~30초 |
| .bin 다운로드 | ~1초 |
| BLE 자동 연결 | ~5초 |
| BLE OTA 전송 | ~14초 |
| **전체** | **~65초** |

## 7. 다음 단계

| # | 작업 | 우선순위 |
|---|------|:--------:|
| 1 | 앱 UI 개선 (HW/SW/패드 탭 완성) | 높음 |
| 2 | 클라우드 서버 Arduino 전환 (DO) | 중간 |
| 3 | HTTPS 설정 (Let's Encrypt) | 중간 |
| 4 | 빌드 에러 자동 retry + 피드백 | 중간 |
| 5 | Flutter 앱 Google Play 배포 | 낮음 |
| 6 | iOS 빌드 (Mac 필요) | 낮음 |
