# SensorMonitor 프로젝트

## 프로젝트 개요
스마트폰 센서 데이터를 EC2 서버로 전송하고 웹 대시보드에서 실시간 모니터링하는 시스템

## 구성 요소

| 구성 요소 | 위치 | 기술 스택 |
|----------|------|-----------|
| **Android 앱** | `app/` | Kotlin, CameraX, Sensors |
| **백엔드 서버** | `server/` | Node.js, Express, Socket.IO |
| **웹 대시보드** | `server/public/` | HTML, JavaScript, Three.js, Leaflet.js |

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
| 09:50 | git commit & push |
| 12:30 | 점심 후 작업 재개 |
| 12:35 | 날씨 API 연동 작업 시작 (wttr.in 사용) |
| 12:45 | server.js에 /api/weather 엔드포인트 추가 |
| 12:50 | 대시보드에 날씨 카드 UI 추가 |
| 12:55 | EC2 서버 배포 및 테스트 완료 |
| 13:00 | 센서 설명 문서 작성 (SENSORS.md) |
| 13:30 | 공장 자동화 3D 대시보드 설계 시작 |
| 14:00 | Three.js 기반 3D 시각화 구현 |
| - | - 진동 벡터: 3D 와이어프레임 구체 + 방향 화살표 |
| - | - 회전: 자이로스코프 데이터로 3D 디바이스 회전 |
| - | - 기울기: 중력 센서로 3D 디바이스 기울기 표현 |
| - | - 조도: 수직 막대그래프 + 색상 변화 |
| - | - 근접: 원형 인디케이터 (감지 시 경고 표시) |
| 14:30 | EC2 배포 완료 (Factory Sensor Monitor) |
| 15:30 | 3D 캘리브레이션 기능 디버깅 시작 |
| 15:45 | Bun 크래시 발생 (한글 문자열 경계 버그) |
| 16:00 | updateRotation 함수 JavaScript 오류 수정 (존재하지 않는 요소 참조 제거) |
| 16:15 | Gravity 센서 디버그 패널 수정 - gx, gy, gz 값 표시 |
| 16:30 | 캘리브레이션 동작 확인 - 원위치 설정 시 보정 후 값 0°로 변경됨 |
| 16:45 | Roll 방향 반전 수정 (`-finalRoll` → `finalRoll`) |
| 17:00 | Yaw(수평 회전) 지원 추가 - Orientation 센서의 azimuth 사용 |
| 17:15 | Gravity 센서 + Orientation 센서 혼합 사용 시 충돌 문제 발견 |
| 17:30 | **Orientation 센서만 사용하도록 변경** - 모든 회전(Yaw, Pitch, Roll) 처리 |
| 17:45 | Three.js 회전 순서 'YXZ'로 설정 |
| 18:00 | 수평 회전(Yaw) 테스트 - 왼쪽 면(초록색) 표시 성공 |
| 18:10 | **추가 보정 필요** - 일부 방향에서 아직 정확하지 않음 |

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

### 🔴 우선순위 높음: 3D 캘리브레이션 보정
- [ ] **3D 모델 방향 정확도 개선** - 일부 방향에서 아직 불일치
- [ ] Euler 각도 vs Quaternion 검토 (짐벌 락 문제 해결)
- [ ] 삼성 폰 Orientation 센서 좌표계 분석 필요
- [ ] 캘리브레이션 3단계(원위치/오른쪽90°/뒤로90°) 스케일링 적용

### 일반 작업
- [ ] 디바이스명 표시 형식 개선 (samsung SM-M536S → Galaxy M53)
- [ ] 양쪽 디바이스 동시 모니터링 테스트
- [ ] 서버 디바이스 삭제 API 추가
- [ ] DB 저장 기능 활성화
- [ ] 3초 간격 최대 진동값 표시 기능
- [ ] 진동 임계치 경고 알림

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

### Three.js 3D 시각화
- 진동(Accelerometer): 3D 구체 위에 벡터 화살표
- 회전(Gyroscope): 자이로 값으로 3D 큐브 회전
- 기울기(Gravity): 중력 벡터로 3D 디바이스 기울기 표현
- 조도(Light): 밝기에 따라 막대그래프 높이/색상 변화
- 근접(Proximity): 감지 시 빨간색 경고 표시

### 3D 캘리브레이션 현재 상태 (2026-01-13)

#### 현재 구현
```javascript
// Orientation 센서만 사용 (Gravity 센서 혼합 제거)
function updateRotation(azimuth, pitch, roll) {
    // calHome 기준으로 delta 계산
    deltaYaw = azimuth - calHome.orientation.azimuth
    deltaPitch = pitch - calHome.orientation.pitch
    deltaRoll = roll - calHome.orientation.roll

    // 3D 모델에 적용 (회전 순서: YXZ)
    tiltDevice.rotation.y = -yawRad   // Yaw (수평 회전)
    tiltDevice.rotation.x = pitchRad  // Pitch (앞뒤 기울기)
    tiltDevice.rotation.z = rollRad   // Roll (좌우 기울기)
}
```

#### 작동하는 것
- ✅ 캘리브레이션 원위치 설정 → 3D 모델 초기화
- ✅ 수평 회전(Yaw) → 왼쪽/오른쪽 면 표시
- ✅ 좌우 기울기(Roll) → 3D 모델 기울어짐

#### 문제점
- ❌ 일부 방향에서 3D 모델과 실제 폰 방향 불일치
- ❌ Euler 각도 짐벌 락 가능성 (90° 기울기 시)
- ❌ 삼성 Orientation 센서 좌표계 분석 필요

#### 다음 세션에서 시도할 것
1. **Quaternion 사용 검토** - Euler 각도 대신 Rotation Vector 센서의 quaternion 사용
2. **좌표계 매핑** - 삼성 폰 센서 좌표계 ↔ Three.js 좌표계 정확한 매핑
3. **회전 순서 실험** - YXZ 외 다른 순서(ZYX, XYZ 등) 테스트
4. **캘리브레이션 스케일링** - 90° 캘리브레이션 값으로 실제 각도 보정

---

*최종 업데이트: 2026-01-13 18:15*
