# Samsung Galaxy M53 5G (SM-M536S) 사양

**작성일**: 2026-01-11

---

## 기기 정보

| 항목 | 사양 |
|------|------|
| **모델명** | SM-M536S |
| **제품명** | Samsung Galaxy M53 5G |
| **브랜드** | Samsung |
| **Android 버전** | 14 |
| **SDK 버전** | 34 |
| **빌드 번호** | UP1A.231005.007.M536SKSSAEYD1 |
| **보안 패치** | 2025-04-01 |
| **시리얼 번호** | RFCTB13LCKF |

---

## 접속 방법

### USB ADB 접속

```bash
# ADB 장치 확인
adb devices

# 결과
RFCTB13LCKF    device
```

### 접속 전 필수 사항
1. 스마트폰에서 **개발자 옵션** 활성화
2. **USB 디버깅** 켜기
3. USB 케이블로 PC에 연결
4. "USB 디버깅 허용" 팝업에서 **허용** 선택

### SSH 접속 (Termux)

| 항목 | 값 |
|------|-----|
| **IP 주소** | 192.168.0.12 |
| **포트** | 8022 |
| **사용자** | u0_a323 |

```bash
ssh -p 8022 u0_a323@192.168.0.12
```

---

## Termux 환경

| 항목 | 사양 |
|------|------|
| **Termux 버전** | 0.118.3 |
| **Python** | 3.12.12 |
| **SSH** | OpenSSH 10.2p1 |

### Python 사용법

```bash
# SSH 접속 후 Python 실행
python

# 스크립트 실행
python script.py

# 패키지 설치
pip install numpy pandas
```

### Termux 추가 패키지 설치

```bash
# Termux 내에서
pkg install git vim nodejs
```

---

## CPU

| 항목 | 사양 |
|------|------|
| **프로세서** | MediaTek Dimensity 900 (MT6877V/ZA) |
| **플랫폼** | mt6877 |
| **코어 수** | 8코어 (옥타코어) |
| **아키텍처** | ARM64-v8a (64비트) |
| **공정** | 6nm |

### CPU 코어 구성

| 코어 | 타입 | 클럭 속도 | 개수 |
|------|------|----------|------|
| 0-5 | Cortex-A55 (효율) | 최대 2.0 GHz | 6개 |
| 6-7 | Cortex-A78 (성능) | 최대 2.4 GHz | 2개 |

### CPU 상세
- CPU part 0xd05: ARM Cortex-A55 (6개) - 효율 코어
- CPU part 0xd41: ARM Cortex-A78 (2개) - 성능 코어
- Hardware: MediaTek MT6877V/ZA (Dimensity 900)

---

## 메모리 (RAM)

| 항목 | 용량 |
|------|------|
| **RAM 총량** | 7,704 MB (약 8GB) |
| **사용 가능** | 약 2.7GB |
| **캐시** | 약 2.6GB |

---

## 저장소

| 항목 | 용량 |
|------|------|
| **전체 용량** | 107GB (128GB 모델) |
| **사용 중** | 52GB (49%) |
| **남은 공간** | 55GB (51%) |

---

## GPU

| 항목 | 사양 |
|------|------|
| **GPU** | Mali-G68 MC4 |
| **OpenGL ES** | 3.2 |
| **OpenGL 버전 코드** | 196610 |
| **Vulkan** | 지원 |

### GPU AI 가속
- **NNAPI**: 지원 (Neural Network API)
- **TensorFlow Lite GPU Delegate**: 지원
- **ML Kit 가속**: 지원

---

## 디스플레이

| 항목 | 사양 |
|------|------|
| **해상도** | 1080 x 2400 (FHD+) |
| **물리적 밀도** | 450 dpi |
| **화면 크기** | 6.7인치 |
| **화면 비율** | 20:9 |
| **주사율** | 120Hz |
| **패널** | Super AMOLED Plus |

---

## 센서 (총 26개)

### 주요 센서

| 센서 | 제조사 | 타입 | 최대 주파수 | 특징 |
|------|--------|------|------------|------|
| **LSM6DSL Accelerometer** | STM | 가속도계 | 500Hz | 연속, X/Y/Z |
| **MMC5633 Magnetometer** | Memsic | 자기장 | 125Hz | 연속, X/Y/Z |
| **LSM6DSL Gyroscope** | STM | 자이로스코프 | 500Hz | 연속, X/Y/Z |
| **STK33910 Light** | Sitronix | 조도 | 5Hz | On-change |
| **STK33910 Proximity** | Sitronix | 근접 | - | Wake-up |
| **Palm Proximity Sensor v2** | Samsung | 근접 | - | Wake-up |

### 복합 센서 (Samsung)

| 센서 | 타입 | 최대 주파수 | 설명 |
|------|------|------------|------|
| **Samsung Gravity Sensor** | 중력 | 100Hz | 중력 벡터 (X/Y/Z) |
| **Samsung Linear Acceleration** | 선형 가속 | 100Hz | 중력 제외 가속도 |
| **Samsung Rotation Vector** | 회전 벡터 | 100Hz | 기기 방향 (쿼터니언) |
| **Samsung Orientation Sensor** | 방향 | 100Hz | Azimuth/Pitch/Roll |
| **Samsung Game Rotation Vector** | 게임 회전 | 100Hz | 게임용 회전 벡터 |

### 동작 감지 센서

| 센서 | 제조사 | 타입 | 설명 |
|------|--------|------|------|
| **Step Counter** | Samsung | 걸음 수 | 누적 걸음 수 카운트 |
| **Step Detector** | Samsung | 걸음 감지 | 걸음 이벤트 트리거 |
| **Significant Motion** | Samsung | 중요 움직임 | 이동 시작 감지 (Wake-up) |
| **Tilt Detector** | Samsung | 기울기 | 기기 기울임 감지 |
| **Pick Up Gesture** | Samsung | 픽업 | 기기 들어올림 감지 |
| **Device Orientation** | Samsung | 기기 방향 | 세로/가로 모드 감지 |
| **Wake Up Motion** | Samsung | 웨이크업 | 움직임으로 화면 켜기 |

### 미보정 센서

| 센서 | 제조사 | 최대 주파수 | 설명 |
|------|--------|------------|------|
| **Gyroscope Uncalibrated** | STM | 500Hz | 바이어스 포함 자이로 |
| **Magnetometer Uncalibrated** | Memsic | 125Hz | 바이어스 포함 자기장 |

### 특수 센서

| 센서 | 제조사 | 설명 |
|------|--------|------|
| **ISG5320A Grip Sensor** | IMAGIS | 그립 감지 (Wake-up) |
| **ISG5320A_SUB Grip Sensor** | IMAGIS | 서브 그립 센서 |
| **STK33910 Light CCT** | Sitronix | 색온도 조도 센서 |
| **STK33910 Auto Brightness** | Sitronix | 자동 밝기 센서 |
| **Touch Proximity** | Samsung | 터치 근접 센서 |
| **Camera Light Sensor** | Samsung | 카메라용 조도 센서 |
| **VDIS Gyroscope** | Samsung | 비디오 손떨림 보정용 |
| **Pocket Mode** | Samsung | 주머니 감지 |
| **Call Gesture** | Samsung | 통화 제스처 |
| **Motion Sensor** | Samsung | 모션 센서 |
| **Interrupt Gyroscope** | Samsung | 인터럽트 자이로 |
| **Scontext** | Samsung | 센서 컨텍스트 허브 |
| **SBM** | Samsung | SAR 백오프 모션 |

### GPS/위치 서비스

| 항목 | 사양 |
|------|------|
| **GPS** | ✅ 지원 |
| **A-GPS** | ✅ 지원 (Assisted GPS) |
| **GNSS** | ✅ 지원 |
| **Network Location** | ✅ 지원 (WiFi/Cell 기반) |
| **Fused Location** | ✅ 지원 (Google FLP) |

**GPS 상세:**
- Vendor: MediaTek (MT6877)
- GPS Version: 0x6877
- LPP Protocol: 지원
- 정확도: 약 8.4m (최근 측정)
- 고도 측정: 지원

### 센서 상세 스펙

```
LSM6DSL Accelerometer (STM)
- Type: android.sensor.accelerometer
- Range: ±78.45 m/s² (약 8G)
- Resolution: 0.0024 m/s²
- Min Rate: 6.25Hz, Max Rate: 500Hz
- Power: 0.15mA

MMC5633 Magnetometer (Memsic)
- Type: android.sensor.magnetic_field
- Range: ±3000 μT
- Resolution: 0.0625 μT
- Min Rate: 6.25Hz, Max Rate: 125Hz

LSM6DSL Gyroscope (STM)
- Type: android.sensor.gyroscope
- Range: ±34.9 rad/s (약 2000°/s)
- Resolution: 0.0011 rad/s
- Min Rate: 6.25Hz, Max Rate: 500Hz

STK33910 Light (Sitronix)
- Type: android.sensor.light
- Range: 0-65535 lux
- Resolution: 1 lux
- Rate: 5Hz

STK33910 Proximity (Sitronix)
- Type: android.sensor.proximity
- Range: 0-5 cm
- Wake-up sensor
```

---

## Android System Services API

앱 개발 시 활용 가능한 시스템 서비스 목록입니다.

### 위치/센서 관련

| 서비스 | API | 설명 | 권한 |
|--------|-----|------|------|
| **LocationManager** | `getSystemService(LOCATION_SERVICE)` | GPS, Network 위치 | `ACCESS_FINE_LOCATION` |
| **SensorManager** | `getSystemService(SENSOR_SERVICE)` | 하드웨어 센서 (26개) | - |
| **GnssStatus** | LocationManager 통해 | GPS 위성 상세 정보 | `ACCESS_FINE_LOCATION` |

### 연결/통신

| 서비스 | API | 설명 | 권한 |
|--------|-----|------|------|
| **WifiManager** | `getSystemService(WIFI_SERVICE)` | WiFi 상태, 스캔, 연결 | `ACCESS_WIFI_STATE` |
| **BluetoothManager** | `getSystemService(BLUETOOTH_SERVICE)` | 블루투스 기기 | `BLUETOOTH` |
| **TelephonyManager** | `getSystemService(TELEPHONY_SERVICE)` | 통화, 셀룰러, SIM 정보 | `READ_PHONE_STATE` |
| **ConnectivityManager** | `getSystemService(CONNECTIVITY_SERVICE)` | 네트워크 상태 | `ACCESS_NETWORK_STATE` |
| **NfcManager** | `getSystemService(NFC_SERVICE)` | NFC 태그 읽기/쓰기 | `NFC` |
| **UsbManager** | `getSystemService(USB_SERVICE)` | USB 기기 연결 | - |

### 전원/배터리

| 서비스 | API | 설명 | 권한 |
|--------|-----|------|------|
| **BatteryManager** | `getSystemService(BATTERY_SERVICE)` | 배터리 상태, 충전량, 온도 | - |
| **PowerManager** | `getSystemService(POWER_SERVICE)` | 전원 관리, Wake Lock | `WAKE_LOCK` |

### 미디어/카메라

| 서비스 | API | 설명 | 권한 |
|--------|-----|------|------|
| **CameraManager** | `getSystemService(CAMERA_SERVICE)` | 카메라 제어 | `CAMERA` |
| **AudioManager** | `getSystemService(AUDIO_SERVICE)` | 오디오, 볼륨 | - |
| **Vibrator** | `getSystemService(VIBRATOR_SERVICE)` | 진동 | `VIBRATE` |
| **MediaRouter** | `getSystemService(MEDIA_ROUTER_SERVICE)` | 미디어 라우팅 | - |

### 시스템 정보

| 서비스 | API | 설명 | 권한 |
|--------|-----|------|------|
| **ActivityManager** | `getSystemService(ACTIVITY_SERVICE)` | 앱, 메모리 상태 | - |
| **WindowManager** | `getSystemService(WINDOW_SERVICE)` | 화면 정보, 디스플레이 | - |
| **InputMethodManager** | `getSystemService(INPUT_METHOD_SERVICE)` | 키보드 제어 | - |
| **ClipboardManager** | `getSystemService(CLIPBOARD_SERVICE)` | 클립보드 | - |
| **NotificationManager** | `getSystemService(NOTIFICATION_SERVICE)` | 알림 | `POST_NOTIFICATIONS` |
| **AlarmManager** | `getSystemService(ALARM_SERVICE)` | 예약 작업 | - |
| **DownloadManager** | `getSystemService(DOWNLOAD_SERVICE)` | 백그라운드 다운로드 | - |

### 보안/생체인식

| 서비스 | API | 설명 | 권한 |
|--------|-----|------|------|
| **BiometricManager** | `getSystemService(BIOMETRIC_SERVICE)` | 지문, 얼굴 인식 | `USE_BIOMETRIC` |
| **KeyguardManager** | `getSystemService(KEYGUARD_SERVICE)` | 잠금화면 | - |

### 사용 예시 (Kotlin)

```kotlin
// 위치 서비스
val locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000L, 1f, listener)

// 센서
val sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
val accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
sensorManager.registerListener(listener, accelerometer, SensorManager.SENSOR_DELAY_UI)

// WiFi
val wifiManager = getSystemService(Context.WIFI_SERVICE) as WifiManager
val wifiInfo = wifiManager.connectionInfo  // SSID, 신호강도 등

// 배터리
val batteryManager = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
val batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)

// NFC
val nfcManager = getSystemService(Context.NFC_SERVICE) as NfcManager
val nfcAdapter = nfcManager.defaultAdapter
```

---

## 지원 ABI

| 타입 | ABI |
|------|-----|
| 64비트 | arm64-v8a |
| 32비트 | armeabi-v7a, armeabi |

---

## 5G 지원

| 항목 | 사양 |
|------|------|
| **5G** | Sub-6GHz 지원 |
| **LTE** | Cat.18 지원 |
| **WiFi** | WiFi 6 (802.11ax) |

---

## 성능 비교 (보유 기기)

| 기기 | CPU | 코어 | RAM | 저장소 | 특징 |
|------|-----|------|-----|--------|------|
| **Galaxy M53 5G** | Dimensity 900 | 8코어 2.4GHz | **8GB** | 128GB | **최고 성능**, 5G |
| Galaxy A23 | Snapdragon 680 | 8코어 2.4GHz | 4GB | 128GB | 중급, 4G |
| Lenovo TB310FU | Helio G80 | 8코어 2.0GHz | 4GB | 48GB | 태블릿, 큰 화면 |

### 성능 순위
1. **Galaxy M53 5G** - RAM 2배, 6nm 공정, Cortex-A78 탑재
2. Galaxy A23 - 안정적인 중급 성능
3. Lenovo 태블릿 - 화면 크기 장점

---

## AI 활용 능력

| 항목 | 지원 |
|------|------|
| **ML Kit** | ✅ GPU 가속 |
| **TensorFlow Lite** | ✅ GPU/NNAPI 가속 |
| **MediaTek APU** | ✅ AI 전용 프로세서 (APU 3.0) |
| **On-device AI** | ✅ 고성능 |

### MediaTek APU (AI Processing Unit)
Dimensity 900은 **APU 3.0**을 탑재하여 AI 연산 전용 하드웨어 가속을 지원합니다.
- OCR, 이미지 인식 등에서 더 빠른 처리 가능
- GPU보다 AI 작업에 최적화

---

## 요약

**Galaxy M53 5G**는 보유 기기 중 **최고 성능**의 스마트폰입니다.

- **장점**:
  - 8GB RAM (다른 기기 대비 2배)
  - 6nm 공정 CPU (전력 효율 우수)
  - Cortex-A78 고성능 코어
  - MediaTek APU 3.0 (AI 가속)
  - 5G 지원
  - 120Hz Super AMOLED 디스플레이
  - 26개 센서 (500Hz 가속도계/자이로, 그립센서 등)

- **단점**:
  - 특별한 단점 없음

---

## 원본 데이터

### /proc/cpuinfo (요약)
```
processor   : 0-5  (CPU part: 0xd05 - Cortex-A55)
processor   : 6-7  (CPU part: 0xd41 - Cortex-A78)
Hardware    : MT6877V/ZA
```

### getprop 정보
```
ro.product.model=SM-M536S
ro.product.brand=samsung
ro.build.version.release=14
ro.board.platform=mt6877
ro.hardware=mt6877
ro.product.cpu.abi=arm64-v8a
ro.product.cpu.abilist=arm64-v8a,armeabi-v7a,armeabi
```

### /proc/meminfo (요약)
```
MemTotal:        7704000 kB
MemFree:          310560 kB
MemAvailable:    2791740 kB
```

---

*이 문서는 ADB를 통해 수집된 정보로 작성되었습니다.*
