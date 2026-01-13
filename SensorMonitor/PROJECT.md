# SensorMonitor 프로젝트

## 프로젝트 개요
스마트폰 센서 데이터를 EC2 서버로 전송하고 웹 대시보드에서 실시간 모니터링하는 시스템

## 구성 요소

| 구성 요소 | 위치 | 기술 스택 |
|----------|------|-----------|
| **Android 앱** | `app/` | Kotlin, CameraX, Sensors |
| **백엔드 서버** | `server/` | Node.js, Express, Socket.IO |
| **웹 대시보드** | `server/public/` | HTML, JavaScript, Chart.js |

## EC2 서버 정보

| 항목 | 값 |
|------|-----|
| **IP** | 52.78.119.132 |
| **대시보드 URL** | http://52.78.119.132:5000 |
| **SSH 접속** | `ssh uttec-ec2` |
| **서버 경로** | `~/sensor-monitor/` |
| **PM2 앱명** | sensor-monitor |

## 배포 명령어

```bash
# 서버 파일 업로드
scp server/server.js uttec-ec2:~/sensor-monitor/
scp server/public/index.html uttec-ec2:~/sensor-monitor/public/

# 서버 재시작
ssh uttec-ec2 "pm2 restart sensor-monitor"

# Android APK 빌드 (Mac)
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=/usr/local/share/android-commandlinetools
./gradlew assembleDebug

# APK 설치
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

## 작업 이력

### 2026-01-13

| 시간 | 작업 내용 |
|------|----------|
| 09:08 | 세션 시작, git pull, 작업보고서 검토 |
| 09:12 | Mac에 adb 설치 (`brew install android-platform-tools`) |
| 09:17 | Galaxy A23 adb 연결, EC2 서버 연결 문제 확인 |
| 09:24 | Galaxy M53 adb 연결, 앱 재시작으로 서버 연결 성공 |
| 09:27 | M53 카메라 동작 확인 완료 |
| 09:29 | Mac에 Android SDK 설치 시작 |
| 09:31 | Java 17 (Temurin) 설치 |
| 09:32 | Gradle 8.5 설치 |
| 09:33 | APK 빌드 성공 (`./gradlew assembleDebug`) |
| 09:35 | M53에 APK 설치 (서명 문제로 재설치) |
| 09:36 | 디바이스명 동적 표시 확인 (samsung SM-M536S) |
| 09:37 | 카메라 권한 부여 (`adb shell pm grant`) |
| 09:38 | M53 카메라 동작 확인 완료 |
| 09:39 | EC2 서버 재시작, 구버전 디바이스 데이터 정리 |
| 09:41 | EC2 서버 코드를 로컬로 복사 (`server/`) |
| 09:45 | PROJECT.md 생성 |

### 2026-01-12 (이전 세션)

| 시간 | 작업 내용 |
|------|----------|
| - | 디바이스 모델명 동적 표시 기능 추가 (`Build.MANUFACTURER + Build.MODEL`) |
| - | Galaxy A23 카메라 YUV 변환 오류 수정 (row stride 처리) |
| - | Galaxy A23 APK 빌드 및 배포 |

---

## 등록된 디바이스

| 디바이스명 | 모델 | 상태 |
|-----------|------|------|
| samsung SM-M536S | Galaxy M53 5G | 활성 |

---

## 다음 작업 (예정)

- [ ] 디바이스명 표시 형식 개선 (samsung SM-M536S → Galaxy M53)
- [ ] 양쪽 디바이스 동시 모니터링 테스트
- [ ] 서버 디바이스 삭제 API 추가
- [ ] DB 저장 기능 활성화

---

## 주요 파일

### Android 앱
- `app/src/main/java/com/example/sensormonitor/MainActivity.kt` - 메인 액티비티
- `app/src/main/res/layout/activity_main.xml` - UI 레이아웃
- `app/src/main/AndroidManifest.xml` - 앱 설정

### 서버
- `server/server.js` - Express 서버 + Socket.IO
- `server/public/index.html` - 웹 대시보드
- `server/package.json` - 의존성 목록

---

## 기술 메모

### YUV420 Row Stride 문제
- Galaxy M53: row stride = width (패딩 없음)
- Galaxy A23: row stride > width (패딩 있음)
- 범용 코드는 row stride를 항상 고려해야 함

### Build 클래스로 디바이스 정보
```kotlin
Build.MANUFACTURER  // "samsung"
Build.MODEL         // "SM-M536S"
```

---

*최종 업데이트: 2026-01-13*
