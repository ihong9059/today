# Galaxy A23 Sensor Monitor 구축 계획서

## 개요

기존 Galaxy M53 5G (SM-M536S)에서 운영 중인 SensorMonitor 시스템을 Galaxy A23 (SM-A235N)에도 동일하게 적용하여, 두 대의 스마트폰 센서 데이터를 EC2 서버에서 통합 모니터링합니다.

---

## 현재 시스템 구성

### 기존 구성 (Galaxy M53)
| 항목 | 값 |
|------|-----|
| 기기 | Galaxy M53 5G (SM-M536S) |
| IP | 192.168.0.12 |
| EC2 서버 | 52.78.119.132:5000 |
| 기능 | 센서 데이터 수집 → WebSocket → EC2 → PostgreSQL 저장 |

### 추가 구성 (Galaxy A23)
| 항목 | 값 |
|------|-----|
| 기기 | Galaxy A23 (SM-A235N) |
| IP | 192.168.0.31 |
| SSH | `ssh u0_a314@192.168.0.31 -p 8022` |
| ADB | R59T406TH0P |
| Android | 14 |
| Node.js | v25.2.1 |
| Claude Code | 2.1.5 |

---

## 목표

1. Galaxy A23에 동일한 SensorMonitor 앱 설치
2. EC2 대시보드에서 다중 디바이스 지원 (디바이스 ID로 구분)
3. PostgreSQL에 디바이스별 데이터 저장
4. 웹 대시보드에서 디바이스 선택/비교 기능

---

## 작업 단계

### Phase 1: 앱 설치 및 테스트

| # | 작업 | 설명 |
|---|------|------|
| 1.1 | APK 빌드 | 기존 SensorMonitor 프로젝트에서 APK 빌드 |
| 1.2 | APK 설치 | ADB를 통해 Galaxy A23에 APK 설치 |
| 1.3 | 앱 실행 테스트 | 센서 데이터 수집 정상 동작 확인 |
| 1.4 | EC2 연결 테스트 | 서버로 데이터 전송 확인 |

**명령어:**
```bash
# APK 빌드 (Windows)
cd C:\todo\today\projects\SensorMonitor
.\gradlew.bat assembleDebug

# APK 설치 (ADB)
/c/todo/today/downloads/platform-tools/adb.exe install -r app/build/outputs/apk/debug/app-debug.apk
```

---

### Phase 2: 다중 디바이스 지원 (서버 수정)

| # | 작업 | 설명 |
|---|------|------|
| 2.1 | 디바이스 ID 추가 | 앱에서 디바이스 고유 ID 전송 |
| 2.2 | DB 스키마 확장 | device 컬럼 인덱싱 및 쿼리 최적화 |
| 2.3 | WebSocket 다중 연결 | 디바이스별 WebSocket 채널 관리 |
| 2.4 | API 수정 | 디바이스별 데이터 조회 API |

**DB 스키마 변경:**
```sql
-- 기존 device 컬럼에 인덱스 추가
CREATE INDEX idx_sensor_data_device ON sensor_data(device);

-- 디바이스별 최신 데이터 조회
SELECT DISTINCT ON (device) *
FROM sensor_data
ORDER BY device, timestamp DESC;
```

---

### Phase 3: 대시보드 수정

| # | 작업 | 설명 |
|---|------|------|
| 3.1 | 디바이스 목록 표시 | 연결된 디바이스 목록 UI |
| 3.2 | 디바이스 선택 | 특정 디바이스 데이터 보기 |
| 3.3 | 비교 모드 | 두 디바이스 데이터 나란히 비교 |
| 3.4 | 통계 추가 | 디바이스별 데이터 수집 통계 |

**대시보드 UI 변경안:**
```
┌─────────────────────────────────────────────────┐
│ Sensor Monitor Dashboard                         │
├─────────────────────────────────────────────────┤
│ Devices: [M53] [A23] [All]                       │
├─────────────────────────────────────────────────┤
│ ┌─────────────┐  ┌─────────────┐                │
│ │ Galaxy M53  │  │ Galaxy A23  │                │
│ │ ● Connected │  │ ● Connected │                │
│ │ GPS: ON     │  │ GPS: ON     │                │
│ │ DB: ON      │  │ DB: ON      │                │
│ └─────────────┘  └─────────────┘                │
├─────────────────────────────────────────────────┤
│ [센서 데이터 실시간 표시]                        │
└─────────────────────────────────────────────────┘
```

---

### Phase 4: 앱 개선 (선택사항)

| # | 작업 | 설명 |
|---|------|------|
| 4.1 | 디바이스 이름 설정 | 앱에서 디바이스 이름 커스텀 |
| 4.2 | 자동 재연결 | 네트워크 끊김 시 자동 재연결 |
| 4.3 | 배터리 최적화 | 백그라운드 실행 최적화 |
| 4.4 | 알림 기능 | 연결 상태 알림 |

---

## 디바이스 비교

| 항목 | Galaxy M53 5G | Galaxy A23 |
|------|--------------|------------|
| 모델 | SM-M536S | SM-A235N |
| Android | - | 14 |
| IP | 192.168.0.12 | 192.168.0.31 |
| SSH 포트 | 8022 | 8022 |
| SSH 유저 | u0_a323 | u0_a314 |
| Claude Code | 2.1.5 | 2.1.5 |

---

## 파일 위치

| 항목 | 경로 |
|------|------|
| Android 프로젝트 | `C:\todo\today\projects\SensorMonitor\` |
| MainActivity | `app\src\main\java\com\example\sensormonitor\MainActivity.kt` |
| 빌드 APK | `app\build\outputs\apk\debug\app-debug.apk` |
| EC2 서버 코드 | `~/sensor-monitor/server.js` |
| EC2 대시보드 | `~/sensor-monitor/public/index.html` |

---

## EC2 서버 정보

| 항목 | 값 |
|------|-----|
| IP | 52.78.119.132 |
| 대시보드 URL | http://52.78.119.132:5000 |
| DB | PostgreSQL (sensordb) |
| SSH | `ssh -i "C:/todo/today/uttec-first-ec2.pem" ec2-user@52.78.119.132` |

---

## 예상 데이터 구조

```json
{
  "device": "Galaxy_A23_SM-A235N",
  "timestamp": 1736812800000,
  "saveToDb": true,
  "gps": {
    "latitude": 37.5665,
    "longitude": 126.9780,
    "altitude": 38.5,
    "speed": 0.0,
    "accuracy": 10.0
  },
  "sensors": {
    "accelerometer": {"x": 0.1, "y": 0.2, "z": 9.8},
    "gyroscope": {"x": 0.01, "y": 0.02, "z": 0.01},
    "magnetometer": {"x": 25.5, "y": -15.3, "z": 42.1},
    "light": 350.5,
    "proximity": 5.0,
    "pressure": 1013.25
  }
}
```

---

## 즉시 실행 가능한 작업

### 1. 기존 APK 설치 (현재 바로 가능)
```bash
# APK가 이미 빌드되어 있다면 바로 설치
/c/todo/today/downloads/platform-tools/adb.exe install -r C:\todo\today\projects\SensorMonitor\app\build\outputs\apk\debug\app-debug.apk
```

### 2. APK 새로 빌드 후 설치
```bash
# Windows에서 빌드
cd C:\todo\today\projects\SensorMonitor
.\gradlew.bat assembleDebug

# ADB로 설치
/c/todo/today/downloads/platform-tools/adb.exe install -r app\build\outputs\apk\debug\app-debug.apk
```

---

## 다음 단계 권장 순서

1. **즉시**: 기존 APK를 Galaxy A23에 설치하여 테스트
2. **단기**: EC2 서버에서 다중 디바이스 구분 기능 추가
3. **중기**: 대시보드에서 디바이스 선택/비교 UI 추가
4. **장기**: AI 학습을 위한 다중 디바이스 데이터 분석

---

*작성일: 2026-01-13*
*프로젝트: Galaxy A23 Sensor Monitor 구축*
