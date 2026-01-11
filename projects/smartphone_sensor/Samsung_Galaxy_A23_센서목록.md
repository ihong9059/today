# Samsung Galaxy A23 (SM-A235N) 센서 목록

## 기기 정보
- **모델명**: Samsung Galaxy A23 (SM-A235N)
- **Android 버전**: 14
- **확인일**: 2026-01-11

---

## 센서 전체 목록

### 1. 모션 센서 (Motion Sensors)

| 센서 | 칩셋 | 측정값 | 단위 | 용도 |
|------|------|--------|------|------|
| **가속도계** | LSM6DSO | X, Y, Z 축 가속도 | m/s² | 흔들림 감지, 기울기, 낙하 감지, 걸음 수 |
| **자이로스코프** | LSM6DSO | X, Y, Z 축 회전 | rad/s | 회전 감지, AR/VR, 게임 컨트롤 |
| **걸음 수 측정** | - | 누적 걸음 수 | steps | 만보계, 건강 앱 |
| **걸음 감지** | - | 걸음 이벤트 | event | 실시간 걸음 감지 |
| **선형 가속도** | 가상 센서 | X, Y, Z (중력 제외) | m/s² | 순수 움직임 감지 |

### 2. 방향/위치 센서 (Orientation/Position Sensors)

| 센서 | 칩셋 | 측정값 | 단위 | 용도 |
|------|------|--------|------|------|
| **지자기 센서** | AK09918 | X, Y, Z 자기장 | μT | 나침반, 방향 감지 |
| **회전 벡터** | 가상 센서 | Quaternion (x,y,z,w) | - | 3D 방향, AR |
| **화면 방향** | Samsung | 방향 상태 | - | 자동 회전 |
| **게임 회전 벡터** | 가상 센서 | Quaternion | - | 게임용 (지자기 제외) |

### 3. 위치 서비스 (Location Services)

| 기능 | 설명 | 정확도 | 용도 |
|------|------|--------|------|
| **GPS** | 위성 기반 위치 | ~3-5m | 내비게이션, 위치 추적 |
| **Network Location** | WiFi/기지국 기반 | ~20-100m | 실내 위치, 빠른 위치 |
| **AGPS** | 보조 GPS | 빠른 수신 | GPS 초기 수신 개선 |

**GPS 측정값:**
- 위도 (Latitude)
- 경도 (Longitude)
- 고도 (Altitude)
- 속도 (Speed)
- 방위각 (Bearing)
- 정확도 (Accuracy)

### 4. 환경 센서 (Environmental Sensors)

| 센서 | 설명 | 측정값 | 단위 | 용도 |
|------|------|--------|------|------|
| **카메라 조도 센서** | 카메라 기반 | 밝기 | lux | 화면 밝기 자동 조절 |

> ⚠️ 참고: Galaxy A23에는 독립 조도 센서, 기압계, 온도계가 없습니다.

### 5. 근접/터치 센서 (Proximity Sensors)

| 센서 | 설명 | 측정값 | 용도 |
|------|------|--------|------|
| **근접 센서** | ProToS Lite | 거리 (near/far) | 통화 시 화면 끄기 |
| **호버 근접 센서** | Samsung | 거리 | 제스처 감지 |
| **그립 센서** | ISG6320 | 손 감지 | 손으로 잡았는지 감지 |

### 6. 삼성 전용 센서 (Samsung Specific)

| 센서 | 설명 | 용도 |
|------|------|------|
| **Motion Sensor** | 복합 모션 감지 | 제스처 인식 |
| **SensorHub** | 센서 허브 | 저전력 센서 처리 |

---

## 센서 구조도

```
📱 Samsung Galaxy A23 센서
│
├── 🏃 모션 (Motion)
│   ├── LSM6DSO Accelerometer (가속도계)
│   ├── LSM6DSO Gyroscope (자이로스코프)
│   ├── Step Counter (걸음 수)
│   ├── Step Detector (걸음 감지)
│   └── Linear Acceleration (선형 가속도) [가상]
│
├── 🧭 방향 (Orientation)
│   ├── AK09918 Magnetometer (지자기)
│   ├── Rotation Vector (회전 벡터) [가상]
│   ├── Game Rotation Vector [가상]
│   └── Screen Orientation (화면 방향)
│
├── 📍 위치 (Location)
│   ├── GPS (위성)
│   ├── Network Location (WiFi/기지국)
│   └── AGPS (보조 GPS)
│
├── 👆 근접 (Proximity)
│   ├── Proximity Sensor (근접)
│   ├── Hover Proximity (호버)
│   └── ISG6320 Grip Sensor (그립)
│
├── 💡 환경 (Environment)
│   └── Camera Light Sensor (조도)
│
└── 🔧 삼성 전용 (Samsung)
    ├── Motion Sensor
    └── SensorHub
```

---

## 앱 개발 시 사용 가능한 센서 API

### Android Sensor API
```kotlin
// 센서 매니저 획득
val sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager

// 센서 타입
Sensor.TYPE_ACCELEROMETER        // 가속도계
Sensor.TYPE_GYROSCOPE           // 자이로스코프
Sensor.TYPE_MAGNETIC_FIELD      // 지자기
Sensor.TYPE_PROXIMITY           // 근접
Sensor.TYPE_STEP_COUNTER        // 걸음 수
Sensor.TYPE_STEP_DETECTOR       // 걸음 감지
Sensor.TYPE_ROTATION_VECTOR     // 회전 벡터
Sensor.TYPE_LINEAR_ACCELERATION // 선형 가속도
Sensor.TYPE_GAME_ROTATION_VECTOR // 게임 회전 벡터
```

### Location API
```kotlin
// 위치 매니저
val locationManager = getSystemService(LOCATION_SERVICE) as LocationManager

// 위치 제공자
LocationManager.GPS_PROVIDER      // GPS
LocationManager.NETWORK_PROVIDER  // Network
LocationManager.FUSED_PROVIDER    // Fused (권장)
```

---

## 필요 권한

```xml
<!-- 센서 (권한 불필요) -->
<!-- 대부분의 센서는 별도 권한 없이 사용 가능 -->

<!-- 위치 (권한 필요) -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- 걸음 수 (Android 10+) -->
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
```

---

## 센서 활용 예시

| 앱 종류 | 사용 센서 |
|---------|-----------|
| 만보계/건강 앱 | 걸음 수, 가속도계, GPS |
| 나침반 | 지자기, 가속도계 |
| 레벨(수평계) | 가속도계 |
| AR 앱 | 자이로스코프, 회전벡터, 카메라 |
| 운동 추적 | GPS, 가속도계, 걸음 수 |
| 수면 추적 | 가속도계, 근접 센서 |
| 흔들어서 실행 | 가속도계 |
| 자동 회전 | 화면 방향 센서 |

---

*작성일: 2026-01-11*
*기기: Samsung Galaxy A23 (SM-A235N)*
