# UTTEC 교육 기자재 — Setup 폴더

**작성일**: 2026-04-13

출하 준비 및 대량 설치에 필요한 파일과 문서를 모아놓은 폴더입니다.

---

## 폴더 구조

```
setup/
├── README.md                          ← 이 파일
│
├── apk/                               ← Android 앱 설치 파일
│   ├── UTTEC_Cloud_v1.0.apk           ← Flutter 앱 (21.4MB, com.uttec.cloud)
│   └── install_all.bat                ← 다수 기기 adb 일괄 설치 스크립트
│
├── firmware/                          ← ESP32 펌웨어 바이너리
│   ├── UTTEC_firmware_v1.0.bin        ← 통합 이미지 (4MB, bootloader+파티션+앱 포함)
│   ├── flash_esp32.bat                ← 1대 플래싱 스크립트
│   └── flash_all.bat                  ← 다수 보드 순차 플래싱 스크립트
│
├── 01_개발환경_설치.md                 ← Arduino-CLI + ESP32 환경 설치 기록
├── 02_보드_연결_확인.md               ← USB 연결 + 시리얼 통신 확인
├── 03_펌웨어_빌드_업로드.md           ← 빌드 → 플래싱 → 부팅 확인
├── 04_태블릿_앱설치.md               ← APK 빌드 + Lenovo Tab M9 설치
└── 05_다수_기기_APK_배포.md           ← 30대 배포 3가지 방법
```

---

## 빠른 사용법

### ESP32 보드 1대 플래싱

```
firmware\flash_esp32.bat COM3
```
또는 esptool 직접 사용:
```
esptool.py --port COM3 --baud 921600 write_flash 0x0 firmware\UTTEC_firmware_v1.0.bin
```

### ESP32 보드 다수 플래싱 (USB 허브)

```
firmware\flash_all.bat
→ 포트 목록 입력: COM3,COM4,COM5,COM6
```

### Android 기기 1대 APK 설치

```
adb install apk\UTTEC_Cloud_v1.0.apk
```

### Android 기기 다수 APK 설치 (USB 허브)

```
apk\install_all.bat
```

---

## 빌드 정보

| 항목 | 값 |
|:-----|:---|
| 펌웨어 빌드일 | 2026-04-13 |
| 펌웨어 소스 | `firmware/ble_ota_arduino/ble_ota_arduino.ino` (444줄) |
| ESP32 Core | 3.2.0 |
| NimBLE | 2.3.7 |
| APK 빌드일 | 2026-04-13 |
| APK 소스 | `smartphone/vibe_ut_cloud/lib/main.dart` (2332줄) |
| Flutter SDK | 3.32.2 |
| 패키지명 | com.uttec.cloud |
| 기본 서버 | http://178.128.90.37:8092 |
