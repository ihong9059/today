# 분쇄기 고장 예지 AI 시스템 구축 가이드

## 목차
1. [개요](#1-개요)
2. [시스템 구성](#2-시스템-구성)
3. [하드웨어 설계](#3-하드웨어-설계)
4. [센서 상세 사양](#4-센서-상세-사양)
5. [데이터 수집 시스템](#5-데이터-수집-시스템)
6. [AI 모델 개발](#6-ai-모델-개발)
7. [시스템 구현](#7-시스템-구현)
8. [설치 및 운영](#8-설치-및-운영)
9. [비용 및 ROI](#9-비용-및-roi)
10. [체크리스트](#10-체크리스트)

---

## 1. 개요

### 1.1 프로젝트 목적

분쇄기에 진동 센서(MPU6050)와 전류 센서를 부착하여 실시간으로 설비 상태를 모니터링하고, AI를 통해 고장을 사전에 예측하는 **예지보전(Predictive Maintenance)** 시스템을 구축합니다.

### 1.2 기대 효과

```
┌─────────────────────────────────────────────────────────────────┐
│                      예지보전 도입 효과                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   기존 방식                        예지보전 방식                 │
│   ┌─────────┐                     ┌─────────┐                  │
│   │ 사후보전 │ → 고장 후 수리      │ 예지보전 │ → 고장 전 예측   │
│   └─────────┘   비용 높음         └─────────┘   계획 정비       │
│                 생산 중단                       가동률 최대화    │
│                                                                 │
│   ┌─────────┐                                                  │
│   │ 예방보전 │ → 주기적 교체                                    │
│   └─────────┘   과잉 정비                                       │
│                 부품 낭비                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

| 항목 | 현재 (사후보전) | 목표 (예지보전) | 개선율 |
|------|----------------|----------------|--------|
| 비계획 정지 | 월 8시간 | 월 1시간 | 87% 감소 |
| 정비 비용 | 100% | 60% | 40% 절감 |
| 부품 수명 | 70% 활용 | 95% 활용 | 35% 향상 |
| 설비 가동률 | 92% | 98% | 6%p 향상 |

### 1.3 검출 가능한 이상 유형

#### 진동 센서(MPU6050)로 검출 가능한 이상
```yaml
진동_기반_이상:
  - 베어링 마모/손상
  - 축 불균형 (Unbalance)
  - 축 정렬불량 (Misalignment)
  - 느슨함 (Looseness)
  - 기어 마모/손상
  - 벨트 느슨함/마모
  - 공진 현상
```

#### 전류 센서로 검출 가능한 이상
```yaml
전류_기반_이상:
  - 모터 과부하
  - 모터 권선 이상
  - 전원 불균형
  - 막힘/과투입
  - 기계적 구속
  - 절연 열화
```

---

## 2. 시스템 구성

### 2.1 전체 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────────┐
│                    분쇄기 고장 예지 시스템 구성도                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                         ┌─────────────┐                            │
│                         │   분쇄기    │                            │
│                         │   (설비)    │                            │
│                         └──────┬──────┘                            │
│                                │                                    │
│              ┌─────────────────┼─────────────────┐                 │
│              │                 │                 │                 │
│              ▼                 ▼                 ▼                 │
│       ┌───────────┐     ┌───────────┐     ┌───────────┐          │
│       │  MPU6050  │     │  MPU6050  │     │ 전류센서  │          │
│       │ (모터측)  │     │ (베어링측)│     │  (CT)    │          │
│       └─────┬─────┘     └─────┬─────┘     └─────┬─────┘          │
│             │                 │                 │                 │
│             └─────────────────┼─────────────────┘                 │
│                               │                                    │
│                               ▼                                    │
│                      ┌─────────────────┐                          │
│                      │    ESP32/       │                          │
│                      │  라즈베리파이   │                          │
│                      │  (데이터 수집)  │                          │
│                      └────────┬────────┘                          │
│                               │                                    │
│                               │ WiFi / Ethernet                   │
│                               ▼                                    │
│                      ┌─────────────────┐                          │
│                      │    AI 서버     │                          │
│                      │  (분석/예측)   │                          │
│                      └────────┬────────┘                          │
│                               │                                    │
│              ┌────────────────┼────────────────┐                  │
│              ▼                ▼                ▼                  │
│       ┌───────────┐   ┌───────────┐   ┌───────────┐             │
│       │ Dashboard │   │   경보    │   │   PLC     │             │
│       │  (모니터) │   │  시스템   │   │  연동     │             │
│       └───────────┘   └───────────┘   └───────────┘             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 데이터 흐름

```
센서 데이터 수집 (1kHz)
        │
        ▼
    전처리/필터링
        │
        ▼
    특징 추출 (FFT, RMS, Peak 등)
        │
        ▼
    AI 모델 추론
        │
        ├──▶ 정상 → 계속 모니터링
        │
        ├──▶ 주의 → 경고 알림, 점검 권고
        │
        └──▶ 위험 → 긴급 알림, 정지 권고
```

---

## 3. 하드웨어 설계

### 3.1 센서 배치도

```
┌─────────────────────────────────────────────────────────────────┐
│                       분쇄기 센서 배치도                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────┐         ┌─────────────────────┐                  │
│   │         │         │                     │                  │
│   │  모터   │─────────│      분쇄기 본체    │                  │
│   │         │  커플링  │                     │                  │
│   └────┬────┘         └──────────┬──────────┘                  │
│        │                         │                              │
│   [MPU6050-1]               [MPU6050-2]                        │
│   모터 베어링               분쇄기 베어링                        │
│   설치 위치                 설치 위치                           │
│                                                                 │
│                                                                 │
│   ┌─────────────────────────────────────────┐                  │
│   │              전원 케이블                 │                  │
│   │  ○───[CT센서]───○───[CT센서]───○       │                  │
│   │      R상            S상         T상     │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   권장 설치 위치:                                               │
│   • MPU6050: 베어링 하우징에 직접 부착 (수직/수평 방향)         │
│   • CT센서: 모터 전원 케이블에 클램프                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 하드웨어 구성품 목록

```yaml
센서부:
  MPU6050_모듈:
    수량: 2개
    용도: 모터측, 베어링측 진동 측정
    가격: 약 3,000원/개

  전류센서_CT:
    모델: SCT-013-030 (30A) 또는 YHDC SCT-019
    수량: 3개 (3상 측정)
    가격: 약 8,000원/개

  ADS1115:
    용도: 전류센서 ADC (16bit 정밀도)
    수량: 1개
    가격: 약 5,000원

데이터_수집부:
  옵션1_ESP32:
    모델: ESP32-WROOM-32
    장점: 저비용, WiFi 내장
    가격: 약 8,000원

  옵션2_라즈베리파이:
    모델: Raspberry Pi 4 (4GB)
    장점: 고성능, Edge AI 가능
    가격: 약 80,000원

  옵션3_산업용:
    모델: 산업용 IoT 게이트웨이
    장점: 안정성, 내환경성
    가격: 약 300,000원~

케이스_및_부품:
  - 방진/방수 케이스 (IP65): 30,000원
  - 케이블/커넥터: 20,000원
  - 전원 공급 장치: 15,000원

AI_서버:
  옵션1_클라우드:
    AWS/Azure IoT
    월 비용: 50,000원~

  옵션2_온프레미스:
    미니PC + GPU
    초기비용: 1,500,000원~
```

### 3.3 회로 구성도

```
┌─────────────────────────────────────────────────────────────────┐
│                    ESP32 기반 회로 구성도                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   MPU6050 #1                    MPU6050 #2                     │
│   ┌────────┐                    ┌────────┐                     │
│   │ VCC────┼──────────┬─────────┼────VCC │                     │
│   │ GND────┼──────────┼────┬────┼────GND │                     │
│   │ SCL────┼──────────┼────┼────┼────SCL │ (주소: 0x69)        │
│   │ SDA────┼──────────┼────┼────┼────SDA │ (AD0=HIGH)          │
│   │ AD0────┼──GND     │    │    │        │                     │
│   └────────┘ (주소:0x68)   │    │    └────────┘                │
│                  │         │    │                               │
│                  │         │    │                               │
│              ┌───┴─────────┴────┴───┐                          │
│              │       ESP32          │                          │
│              │                      │                          │
│              │  GPIO21 ─── SDA      │                          │
│              │  GPIO22 ─── SCL      │                          │
│              │  3.3V ───── VCC      │                          │
│              │  GND ────── GND      │                          │
│              │                      │                          │
│              │  GPIO34 ◀── ADS1115  │                          │
│              │  GPIO35 ◀── (ADC)    │                          │
│              └──────────────────────┘                          │
│                        │                                        │
│                        │ I2C                                   │
│                        ▼                                        │
│              ┌──────────────────────┐                          │
│              │      ADS1115         │                          │
│              │  A0 ◀── CT센서 R상   │                          │
│              │  A1 ◀── CT센서 S상   │                          │
│              │  A2 ◀── CT센서 T상   │                          │
│              └──────────────────────┘                          │
│                                                                 │
│   ※ CT센서 출력은 버든 저항(10~33Ω)과 바이어스 회로 필요        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 CT 센서 인터페이스 회로

```
┌─────────────────────────────────────────────────────────────────┐
│                 CT센서 신호 처리 회로                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌───────────────┐                           │
│   CT센서 출력 ○────┤               │                           │
│                    │   버든저항    │ 33Ω                       │
│              ○────┤    (Burden)   │                           │
│              │     └───────┬───────┘                           │
│              │             │                                    │
│              │             ├─────────────○ ADC 입력            │
│              │             │             (ADS1115)              │
│              │     ┌───────┴───────┐                           │
│              │     │               │                           │
│              │     │  바이어스     │ 1.65V (3.3V/2)            │
│              │     │  (DC Offset)  │                           │
│              │     │               │                           │
│              │     └───────────────┘                           │
│              │             │                                    │
│              └─────────────┴─────────────○ GND                 │
│                                                                 │
│   바이어스 회로 (전압 분배):                                     │
│                                                                 │
│   3.3V ──┬── R1 (10kΩ) ──┬── R2 (10kΩ) ──┬── GND              │
│          │               │               │                      │
│          │          1.65V (출력)         │                      │
│          │               │               │                      │
│          └── C1 (10μF) ──┴── C2 (10μF) ──┘                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. 센서 상세 사양

### 4.1 MPU6050 상세

```yaml
MPU6050_사양:
  가속도계:
    범위: ±2g, ±4g, ±8g, ±16g (선택 가능)
    분해능: 16bit
    감도: 16384 LSB/g (±2g 설정시)
    노이즈: 400 μg/√Hz

  자이로스코프:
    범위: ±250, ±500, ±1000, ±2000 °/s
    분해능: 16bit
    감도: 131 LSB/(°/s) (±250°/s 설정시)

  샘플링:
    최대 샘플레이트: 1kHz (가속도계)
    내장 FIFO: 1024 bytes

  통신:
    인터페이스: I2C (최대 400kHz)
    주소: 0x68 (AD0=LOW), 0x69 (AD0=HIGH)

  전원:
    동작전압: 2.375V ~ 3.46V
    소비전류: 3.9mA (정상 동작)
```

#### 진동 분석을 위한 권장 설정
```yaml
분쇄기_진동_측정_설정:
  가속도_범위: ±8g  # 산업용 설비 진동 범위
  샘플레이트: 1000Hz  # 나이퀴스트: 500Hz까지 분석 가능
  필터: DLPF 42Hz  # 저역통과 필터 (노이즈 제거)

  측정_축:
    - X축: 수평 방향 (로터 불균형)
    - Y축: 수직 방향 (베어링 상태)
    - Z축: 축 방향 (축정렬 불량)
```

### 4.2 전류 센서 상세

```yaml
SCT-013-030_사양:
  측정범위: 0 ~ 30A AC
  출력: 0 ~ 1V AC
  비율: 30A:1V
  정확도: ±1%
  절연전압: 3000V

사용시_주의:
  - 비침습 측정 (전원 차단 불필요)
  - AC 전류만 측정 가능
  - 케이블 1선에만 클램프 (3상 개별 측정)
```

#### 전류 분석 항목
```yaml
전류_분석_항목:
  RMS_전류: 부하 상태 판단
  피크_전류: 순간 과부하 검출
  전류_불균형: 3상 불균형 검출
  고조파_분석: 전기적 이상 검출
  기동_전류: 기동 특성 분석
  유효_전력: 효율 저하 검출
```

---

## 5. 데이터 수집 시스템

### 5.1 ESP32 펌웨어 (Arduino)

```cpp
// crusher_monitor.ino - 분쇄기 모니터링 펌웨어

#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Adafruit_ADS1X15.h>

// ============ 설정 ============
const char* WIFI_SSID = "Factory_WiFi";
const char* WIFI_PASS = "password";
const char* SERVER_URL = "http://192.168.1.100:5000/api/sensor_data";

#define MPU1_ADDR 0x68  // 모터측
#define MPU2_ADDR 0x69  // 베어링측
#define SAMPLE_RATE 1000  // Hz
#define BUFFER_SIZE 1024  // 샘플 수

// ============ 전역 변수 ============
Adafruit_ADS1115 ads;

// 진동 데이터 버퍼
float accel1_x[BUFFER_SIZE], accel1_y[BUFFER_SIZE], accel1_z[BUFFER_SIZE];
float accel2_x[BUFFER_SIZE], accel2_y[BUFFER_SIZE], accel2_z[BUFFER_SIZE];

// 전류 데이터 버퍼
float current_r[BUFFER_SIZE], current_s[BUFFER_SIZE], current_t[BUFFER_SIZE];

int sampleIndex = 0;
unsigned long lastSampleTime = 0;

// ============ MPU6050 초기화 ============
void initMPU(uint8_t addr) {
    Wire.beginTransmission(addr);
    Wire.write(0x6B);  // PWR_MGMT_1
    Wire.write(0x00);  // Wake up
    Wire.endTransmission();

    // 가속도계 범위 설정: ±8g
    Wire.beginTransmission(addr);
    Wire.write(0x1C);  // ACCEL_CONFIG
    Wire.write(0x10);  // ±8g
    Wire.endTransmission();

    // 샘플레이트 설정: 1kHz
    Wire.beginTransmission(addr);
    Wire.write(0x19);  // SMPLRT_DIV
    Wire.write(0x00);  // 1kHz
    Wire.endTransmission();

    // DLPF 설정: 42Hz
    Wire.beginTransmission(addr);
    Wire.write(0x1A);  // CONFIG
    Wire.write(0x03);  // DLPF 42Hz
    Wire.endTransmission();
}

// ============ MPU6050 데이터 읽기 ============
void readMPU(uint8_t addr, float* ax, float* ay, float* az) {
    Wire.beginTransmission(addr);
    Wire.write(0x3B);  // ACCEL_XOUT_H
    Wire.endTransmission(false);
    Wire.requestFrom(addr, (uint8_t)6);

    int16_t raw_ax = (Wire.read() << 8) | Wire.read();
    int16_t raw_ay = (Wire.read() << 8) | Wire.read();
    int16_t raw_az = (Wire.read() << 8) | Wire.read();

    // ±8g 범위에서 g 단위로 변환
    *ax = raw_ax / 4096.0;
    *ay = raw_ay / 4096.0;
    *az = raw_az / 4096.0;
}

// ============ 전류 센서 읽기 ============
float readCurrent(int channel) {
    int16_t adc = ads.readADC_SingleEnded(channel);
    float voltage = adc * 0.0001875;  // ADS1115 분해능

    // 바이어스 제거 및 전류 변환
    voltage -= 1.65;  // DC 오프셋 제거
    float current = voltage * 30.0;  // CT 비율 적용

    return current;
}

// ============ 특징 추출 ============
struct Features {
    // 진동 특징
    float rms_accel1, rms_accel2;
    float peak_accel1, peak_accel2;
    float crest_factor1, crest_factor2;

    // 전류 특징
    float rms_current_r, rms_current_s, rms_current_t;
    float current_unbalance;
    float total_power;
};

Features extractFeatures() {
    Features f;

    // RMS 계산 (진동)
    float sum1 = 0, sum2 = 0;
    float max1 = 0, max2 = 0;

    for(int i = 0; i < BUFFER_SIZE; i++) {
        float mag1 = sqrt(accel1_x[i]*accel1_x[i] +
                         accel1_y[i]*accel1_y[i] +
                         accel1_z[i]*accel1_z[i]);
        float mag2 = sqrt(accel2_x[i]*accel2_x[i] +
                         accel2_y[i]*accel2_y[i] +
                         accel2_z[i]*accel2_z[i]);

        sum1 += mag1 * mag1;
        sum2 += mag2 * mag2;

        if(mag1 > max1) max1 = mag1;
        if(mag2 > max2) max2 = mag2;
    }

    f.rms_accel1 = sqrt(sum1 / BUFFER_SIZE);
    f.rms_accel2 = sqrt(sum2 / BUFFER_SIZE);
    f.peak_accel1 = max1;
    f.peak_accel2 = max2;
    f.crest_factor1 = max1 / f.rms_accel1;
    f.crest_factor2 = max2 / f.rms_accel2;

    // RMS 계산 (전류)
    float sum_r = 0, sum_s = 0, sum_t = 0;
    for(int i = 0; i < BUFFER_SIZE; i++) {
        sum_r += current_r[i] * current_r[i];
        sum_s += current_s[i] * current_s[i];
        sum_t += current_t[i] * current_t[i];
    }

    f.rms_current_r = sqrt(sum_r / BUFFER_SIZE);
    f.rms_current_s = sqrt(sum_s / BUFFER_SIZE);
    f.rms_current_t = sqrt(sum_t / BUFFER_SIZE);

    // 전류 불균형 계산
    float avg_current = (f.rms_current_r + f.rms_current_s + f.rms_current_t) / 3;
    float max_dev = max(abs(f.rms_current_r - avg_current),
                       max(abs(f.rms_current_s - avg_current),
                           abs(f.rms_current_t - avg_current)));
    f.current_unbalance = (max_dev / avg_current) * 100;  // %

    // 전력 계산 (3상)
    f.total_power = sqrt(3) * 380 * avg_current * 0.85;  // 역률 0.85 가정

    return f;
}

// ============ 데이터 전송 ============
void sendData(Features& f) {
    if(WiFi.status() != WL_CONNECTED) return;

    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<512> doc;
    doc["device_id"] = "CRUSHER_01";
    doc["timestamp"] = millis();

    JsonObject vibration = doc.createNestedObject("vibration");
    vibration["rms_motor"] = f.rms_accel1;
    vibration["rms_bearing"] = f.rms_accel2;
    vibration["peak_motor"] = f.peak_accel1;
    vibration["peak_bearing"] = f.peak_accel2;
    vibration["crest_motor"] = f.crest_factor1;
    vibration["crest_bearing"] = f.crest_factor2;

    JsonObject current = doc.createNestedObject("current");
    current["rms_r"] = f.rms_current_r;
    current["rms_s"] = f.rms_current_s;
    current["rms_t"] = f.rms_current_t;
    current["unbalance"] = f.current_unbalance;
    current["power"] = f.total_power;

    String json;
    serializeJson(doc, json);

    int httpCode = http.POST(json);
    http.end();
}

// ============ Setup ============
void setup() {
    Serial.begin(115200);
    Wire.begin();
    Wire.setClock(400000);  // I2C 400kHz

    // WiFi 연결
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    while(WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi Connected");

    // 센서 초기화
    initMPU(MPU1_ADDR);
    initMPU(MPU2_ADDR);
    ads.begin();
    ads.setGain(GAIN_ONE);  // ±4.096V

    Serial.println("Crusher Monitor Started");
}

// ============ Loop ============
void loop() {
    unsigned long currentTime = micros();

    // 1kHz 샘플링
    if(currentTime - lastSampleTime >= 1000) {  // 1ms
        lastSampleTime = currentTime;

        // 진동 데이터 읽기
        readMPU(MPU1_ADDR, &accel1_x[sampleIndex],
                          &accel1_y[sampleIndex],
                          &accel1_z[sampleIndex]);
        readMPU(MPU2_ADDR, &accel2_x[sampleIndex],
                          &accel2_y[sampleIndex],
                          &accel2_z[sampleIndex]);

        // 전류 데이터 읽기
        current_r[sampleIndex] = readCurrent(0);
        current_s[sampleIndex] = readCurrent(1);
        current_t[sampleIndex] = readCurrent(2);

        sampleIndex++;

        // 버퍼가 차면 처리
        if(sampleIndex >= BUFFER_SIZE) {
            sampleIndex = 0;

            // 특징 추출 및 전송
            Features features = extractFeatures();
            sendData(features);
        }
    }
}
```

### 5.2 라즈베리파이 버전 (Python)

```python
# crusher_monitor.py - 라즈베리파이용 데이터 수집

import smbus2
import time
import numpy as np
from collections import deque
import requests
import json
from threading import Thread
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

class MPU6050:
    """MPU6050 진동 센서 클래스"""

    PWR_MGMT_1 = 0x6B
    ACCEL_CONFIG = 0x1C
    ACCEL_XOUT_H = 0x3B

    def __init__(self, bus, address):
        self.bus = bus
        self.address = address
        self.accel_scale = 4096.0  # ±8g
        self._init_sensor()

    def _init_sensor(self):
        # Wake up
        self.bus.write_byte_data(self.address, self.PWR_MGMT_1, 0x00)
        time.sleep(0.1)
        # 가속도계 ±8g 설정
        self.bus.write_byte_data(self.address, self.ACCEL_CONFIG, 0x10)

    def read_accel(self):
        """가속도 값 읽기 (g 단위)"""
        data = self.bus.read_i2c_block_data(self.address, self.ACCEL_XOUT_H, 6)

        ax = (data[0] << 8 | data[1])
        ay = (data[2] << 8 | data[3])
        az = (data[4] << 8 | data[5])

        # 부호 처리
        if ax > 32767: ax -= 65536
        if ay > 32767: ay -= 65536
        if az > 32767: az -= 65536

        return (ax / self.accel_scale,
                ay / self.accel_scale,
                az / self.accel_scale)


class CurrentSensor:
    """CT 전류 센서 클래스 (ADS1115 사용)"""

    def __init__(self, ads, channel):
        self.channel = AnalogIn(ads, channel)
        self.ct_ratio = 30.0  # 30A:1V
        self.bias = 1.65  # DC 오프셋

    def read_current(self):
        """전류 값 읽기 (A 단위)"""
        voltage = self.channel.voltage
        current = (voltage - self.bias) * self.ct_ratio
        return current


class CrusherMonitor:
    """분쇄기 모니터링 메인 클래스"""

    def __init__(self, config):
        self.config = config
        self.server_url = config['server_url']
        self.sample_rate = config.get('sample_rate', 1000)
        self.buffer_size = config.get('buffer_size', 1024)

        # I2C 버스 초기화
        self.bus = smbus2.SMBus(1)

        # MPU6050 초기화
        self.mpu_motor = MPU6050(self.bus, 0x68)
        self.mpu_bearing = MPU6050(self.bus, 0x69)

        # ADS1115 초기화
        i2c = busio.I2C(board.SCL, board.SDA)
        self.ads = ADS.ADS1115(i2c)

        # 전류 센서 초기화
        self.ct_r = CurrentSensor(self.ads, ADS.P0)
        self.ct_s = CurrentSensor(self.ads, ADS.P1)
        self.ct_t = CurrentSensor(self.ads, ADS.P2)

        # 데이터 버퍼
        self.accel_motor = deque(maxlen=self.buffer_size)
        self.accel_bearing = deque(maxlen=self.buffer_size)
        self.current_data = deque(maxlen=self.buffer_size)

        self.running = False

    def collect_sample(self):
        """단일 샘플 수집"""
        # 진동 데이터
        motor_accel = self.mpu_motor.read_accel()
        bearing_accel = self.mpu_bearing.read_accel()

        # 전류 데이터
        current = (
            self.ct_r.read_current(),
            self.ct_s.read_current(),
            self.ct_t.read_current()
        )

        self.accel_motor.append(motor_accel)
        self.accel_bearing.append(bearing_accel)
        self.current_data.append(current)

    def extract_features(self):
        """특징 추출"""
        motor = np.array(self.accel_motor)
        bearing = np.array(self.accel_bearing)
        current = np.array(self.current_data)

        # 진동 크기 계산
        motor_mag = np.sqrt(np.sum(motor**2, axis=1))
        bearing_mag = np.sqrt(np.sum(bearing**2, axis=1))

        features = {
            'vibration': {
                'rms_motor': float(np.sqrt(np.mean(motor_mag**2))),
                'rms_bearing': float(np.sqrt(np.mean(bearing_mag**2))),
                'peak_motor': float(np.max(motor_mag)),
                'peak_bearing': float(np.max(bearing_mag)),
                'crest_motor': float(np.max(motor_mag) / np.sqrt(np.mean(motor_mag**2))),
                'crest_bearing': float(np.max(bearing_mag) / np.sqrt(np.mean(bearing_mag**2))),
                'std_motor': float(np.std(motor_mag)),
                'std_bearing': float(np.std(bearing_mag)),
            },
            'current': {
                'rms_r': float(np.sqrt(np.mean(current[:, 0]**2))),
                'rms_s': float(np.sqrt(np.mean(current[:, 1]**2))),
                'rms_t': float(np.sqrt(np.mean(current[:, 2]**2))),
            }
        }

        # 전류 불균형 계산
        avg_current = np.mean([features['current']['rms_r'],
                               features['current']['rms_s'],
                               features['current']['rms_t']])
        max_dev = max(abs(features['current']['rms_r'] - avg_current),
                     abs(features['current']['rms_s'] - avg_current),
                     abs(features['current']['rms_t'] - avg_current))

        features['current']['unbalance'] = float((max_dev / avg_current) * 100) if avg_current > 0 else 0
        features['current']['power'] = float(np.sqrt(3) * 380 * avg_current * 0.85)

        return features

    def send_data(self, features):
        """서버로 데이터 전송"""
        try:
            payload = {
                'device_id': self.config['device_id'],
                'timestamp': time.time(),
                **features
            }

            response = requests.post(
                self.server_url,
                json=payload,
                timeout=5
            )

            if response.status_code == 200:
                result = response.json()
                if result.get('alert'):
                    print(f"⚠️ 경고: {result['message']}")

        except Exception as e:
            print(f"전송 오류: {e}")

    def run(self):
        """메인 실행 루프"""
        self.running = True
        sample_interval = 1.0 / self.sample_rate

        print(f"분쇄기 모니터링 시작 (Sample Rate: {self.sample_rate}Hz)")

        while self.running:
            start_time = time.perf_counter()

            # 샘플 수집
            self.collect_sample()

            # 버퍼가 차면 특징 추출 및 전송
            if len(self.accel_motor) >= self.buffer_size:
                features = self.extract_features()

                # 비동기 전송
                Thread(target=self.send_data, args=(features,)).start()

                # 버퍼 클리어
                self.accel_motor.clear()
                self.accel_bearing.clear()
                self.current_data.clear()

            # 샘플링 간격 유지
            elapsed = time.perf_counter() - start_time
            if elapsed < sample_interval:
                time.sleep(sample_interval - elapsed)

    def stop(self):
        """모니터링 중지"""
        self.running = False


if __name__ == "__main__":
    config = {
        'device_id': 'CRUSHER_01',
        'server_url': 'http://192.168.1.100:5000/api/sensor_data',
        'sample_rate': 1000,
        'buffer_size': 1024
    }

    monitor = CrusherMonitor(config)

    try:
        monitor.run()
    except KeyboardInterrupt:
        monitor.stop()
        print("모니터링 종료")
```

---

## 6. AI 모델 개발

### 6.1 데이터 전처리 및 특징 공학

```python
# feature_engineering.py - 고급 특징 추출

import numpy as np
from scipy import signal
from scipy.fft import fft, fftfreq

class FeatureExtractor:
    """진동/전류 데이터 특징 추출"""

    def __init__(self, sample_rate=1000):
        self.sample_rate = sample_rate

    def time_domain_features(self, data):
        """시간 영역 특징"""
        features = {
            'mean': np.mean(data),
            'std': np.std(data),
            'rms': np.sqrt(np.mean(data**2)),
            'peak': np.max(np.abs(data)),
            'peak_to_peak': np.max(data) - np.min(data),
            'crest_factor': np.max(np.abs(data)) / np.sqrt(np.mean(data**2)),
            'skewness': self._skewness(data),
            'kurtosis': self._kurtosis(data),
            'shape_factor': np.sqrt(np.mean(data**2)) / np.mean(np.abs(data)),
            'impulse_factor': np.max(np.abs(data)) / np.mean(np.abs(data)),
        }
        return features

    def frequency_domain_features(self, data):
        """주파수 영역 특징 (FFT)"""
        n = len(data)
        freq = fftfreq(n, 1/self.sample_rate)[:n//2]
        fft_mag = np.abs(fft(data))[:n//2]

        # 정규화
        fft_mag_norm = fft_mag / np.sum(fft_mag)

        features = {
            'dominant_freq': freq[np.argmax(fft_mag)],
            'spectral_centroid': np.sum(freq * fft_mag_norm),
            'spectral_spread': np.sqrt(np.sum(((freq - np.sum(freq * fft_mag_norm))**2) * fft_mag_norm)),
            'spectral_entropy': -np.sum(fft_mag_norm * np.log2(fft_mag_norm + 1e-10)),
        }

        # 주파수 대역별 에너지
        bands = [(0, 50), (50, 100), (100, 200), (200, 500)]
        for low, high in bands:
            mask = (freq >= low) & (freq < high)
            features[f'energy_{low}_{high}Hz'] = np.sum(fft_mag[mask]**2)

        return features

    def vibration_specific_features(self, data):
        """진동 분석 특수 특징"""
        features = {}

        # 엔벨로프 분석 (베어링 결함 검출)
        analytic = signal.hilbert(data)
        envelope = np.abs(analytic)

        features['envelope_rms'] = np.sqrt(np.mean(envelope**2))
        features['envelope_peak'] = np.max(envelope)

        # 베어링 결함 주파수 (예시: 볼 베어링)
        # BPFO, BPFI, BSF, FTF 계산 필요 (베어링 사양에 따라)

        return features

    def _skewness(self, data):
        """왜도 계산"""
        mean = np.mean(data)
        std = np.std(data)
        return np.mean(((data - mean) / std)**3) if std > 0 else 0

    def _kurtosis(self, data):
        """첨도 계산"""
        mean = np.mean(data)
        std = np.std(data)
        return np.mean(((data - mean) / std)**4) - 3 if std > 0 else 0

    def extract_all(self, vibration_data, current_data):
        """모든 특징 추출"""
        features = {}

        # 진동 특징 (각 축별)
        for i, axis in enumerate(['x', 'y', 'z']):
            td = self.time_domain_features(vibration_data[:, i])
            fd = self.frequency_domain_features(vibration_data[:, i])
            vs = self.vibration_specific_features(vibration_data[:, i])

            for key, value in {**td, **fd, **vs}.items():
                features[f'vib_{axis}_{key}'] = value

        # 전류 특징 (각 상별)
        for i, phase in enumerate(['r', 's', 't']):
            td = self.time_domain_features(current_data[:, i])
            fd = self.frequency_domain_features(current_data[:, i])

            for key, value in {**td, **fd}.items():
                features[f'cur_{phase}_{key}'] = value

        return features
```

### 6.2 AI 모델 아키텍처

#### 6.2.1 모델 옵션 비교

| 모델 | 장점 | 단점 | 적용 상황 |
|------|-----|------|----------|
| Random Forest | 해석 용이, 빠른 학습 | 시계열 패턴 제한적 | 초기 구축, PoC |
| XGBoost | 높은 정확도, 특징 중요도 | 하이퍼파라미터 튜닝 필요 | 정형 데이터 |
| LSTM | 시계열 패턴 학습 | 많은 데이터 필요 | 추세 예측 |
| 1D-CNN | 빠른 추론, 패턴 인식 | 긴 시계열 제한 | 실시간 분류 |
| Autoencoder | 양품만으로 학습 가능 | 임계값 설정 필요 | 이상 탐지 |

#### 6.2.2 추천 모델: 앙상블 접근

```python
# model.py - 고장 예지 AI 모델

import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, LSTM, Conv1D, MaxPooling1D, Flatten

class CrusherHealthModel:
    """분쇄기 건강 상태 예측 모델"""

    def __init__(self):
        self.scaler = StandardScaler()
        self.classifier = None
        self.anomaly_detector = None
        self.degradation_model = None

    # ========== 분류 모델 (상태 진단) ==========
    def build_classifier(self, n_features, n_classes=4):
        """
        상태 분류 모델
        Classes: 0=정상, 1=주의, 2=경고, 3=위험
        """
        self.classifier = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            random_state=42,
            n_jobs=-1
        )
        return self.classifier

    def train_classifier(self, X_train, y_train):
        """분류 모델 학습"""
        X_scaled = self.scaler.fit_transform(X_train)
        self.classifier.fit(X_scaled, y_train)

        # 특징 중요도 출력
        importances = self.classifier.feature_importances_
        return importances

    def predict_status(self, features):
        """상태 예측"""
        X_scaled = self.scaler.transform(features.reshape(1, -1))
        prediction = self.classifier.predict(X_scaled)[0]
        probabilities = self.classifier.predict_proba(X_scaled)[0]

        status_names = ['정상', '주의', '경고', '위험']

        return {
            'status': status_names[prediction],
            'status_code': int(prediction),
            'confidence': float(max(probabilities)),
            'probabilities': {
                name: float(prob)
                for name, prob in zip(status_names, probabilities)
            }
        }

    # ========== 이상 탐지 모델 ==========
    def build_anomaly_detector(self):
        """Isolation Forest 기반 이상 탐지"""
        self.anomaly_detector = IsolationForest(
            contamination=0.05,  # 예상 이상치 비율
            random_state=42,
            n_jobs=-1
        )
        return self.anomaly_detector

    def train_anomaly_detector(self, X_normal):
        """정상 데이터로 이상 탐지 모델 학습"""
        X_scaled = self.scaler.fit_transform(X_normal)
        self.anomaly_detector.fit(X_scaled)

    def detect_anomaly(self, features):
        """이상 탐지"""
        X_scaled = self.scaler.transform(features.reshape(1, -1))
        score = self.anomaly_detector.decision_function(X_scaled)[0]
        is_anomaly = self.anomaly_detector.predict(X_scaled)[0] == -1

        return {
            'is_anomaly': bool(is_anomaly),
            'anomaly_score': float(-score),  # 높을수록 이상
        }

    # ========== 열화 예측 모델 (LSTM) ==========
    def build_degradation_model(self, sequence_length, n_features):
        """RUL (Remaining Useful Life) 예측 LSTM 모델"""

        inputs = Input(shape=(sequence_length, n_features))

        x = LSTM(64, return_sequences=True)(inputs)
        x = LSTM(32)(x)
        x = Dense(16, activation='relu')(x)
        outputs = Dense(1, activation='linear')(x)  # RUL 예측

        self.degradation_model = Model(inputs, outputs)
        self.degradation_model.compile(
            optimizer='adam',
            loss='mse',
            metrics=['mae']
        )

        return self.degradation_model

    def train_degradation_model(self, X_sequences, y_rul, epochs=100):
        """열화 모델 학습"""
        history = self.degradation_model.fit(
            X_sequences, y_rul,
            epochs=epochs,
            batch_size=32,
            validation_split=0.2,
            callbacks=[
                tf.keras.callbacks.EarlyStopping(patience=10),
                tf.keras.callbacks.ReduceLROnPlateau(patience=5)
            ]
        )
        return history

    def predict_rul(self, sequence):
        """잔여 수명 예측"""
        rul = self.degradation_model.predict(sequence.reshape(1, *sequence.shape))[0, 0]
        return {
            'rul_hours': float(max(0, rul)),
            'rul_days': float(max(0, rul / 24))
        }

    # ========== 모델 저장/로드 ==========
    def save(self, path):
        """모델 저장"""
        joblib.dump({
            'scaler': self.scaler,
            'classifier': self.classifier,
            'anomaly_detector': self.anomaly_detector
        }, f"{path}/sklearn_models.pkl")

        if self.degradation_model:
            self.degradation_model.save(f"{path}/degradation_model.h5")

    def load(self, path):
        """모델 로드"""
        models = joblib.load(f"{path}/sklearn_models.pkl")
        self.scaler = models['scaler']
        self.classifier = models['classifier']
        self.anomaly_detector = models['anomaly_detector']

        try:
            self.degradation_model = tf.keras.models.load_model(
                f"{path}/degradation_model.h5"
            )
        except:
            pass


# ========== 통합 예측 함수 ==========
def predict_health(model, features, sequence=None):
    """
    통합 건강 상태 예측

    Returns:
        dict: 종합 진단 결과
    """
    result = {
        'timestamp': np.datetime64('now'),
        'status': model.predict_status(features),
        'anomaly': model.detect_anomaly(features),
    }

    if sequence is not None and model.degradation_model:
        result['rul'] = model.predict_rul(sequence)

    # 종합 판정
    if result['status']['status_code'] >= 3 or result['anomaly']['is_anomaly']:
        result['action'] = 'STOP_RECOMMENDED'
        result['priority'] = 'HIGH'
    elif result['status']['status_code'] >= 2:
        result['action'] = 'INSPECTION_REQUIRED'
        result['priority'] = 'MEDIUM'
    elif result['status']['status_code'] >= 1:
        result['action'] = 'MONITOR_CLOSELY'
        result['priority'] = 'LOW'
    else:
        result['action'] = 'NORMAL_OPERATION'
        result['priority'] = 'NONE'

    return result
```

### 6.3 모델 학습 파이프라인

```python
# train_pipeline.py - 모델 학습 파이프라인

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from model import CrusherHealthModel
from feature_engineering import FeatureExtractor

def prepare_training_data(data_path):
    """학습 데이터 준비"""

    # 데이터 로드
    df = pd.read_csv(data_path)

    # 특징 추출
    extractor = FeatureExtractor(sample_rate=1000)

    features_list = []
    labels = []

    for _, row in df.iterrows():
        # 원시 데이터 파싱 (예시)
        vibration = np.array(row['vibration_data'])
        current = np.array(row['current_data'])

        features = extractor.extract_all(vibration, current)
        features_list.append(list(features.values()))
        labels.append(row['label'])  # 0=정상, 1=주의, 2=경고, 3=위험

    X = np.array(features_list)
    y = np.array(labels)

    return X, y

def train_models(X, y, save_path='./models'):
    """모델 학습"""

    # 데이터 분할
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 모델 초기화
    model = CrusherHealthModel()

    # 1. 분류 모델 학습
    print("분류 모델 학습 중...")
    model.build_classifier(n_features=X.shape[1])
    importances = model.train_classifier(X_train, y_train)

    # 평가
    from sklearn.metrics import classification_report
    y_pred = model.classifier.predict(model.scaler.transform(X_test))
    print("\n분류 모델 성능:")
    print(classification_report(y_test, y_pred,
                               target_names=['정상', '주의', '경고', '위험']))

    # 2. 이상 탐지 모델 학습 (정상 데이터만 사용)
    print("\n이상 탐지 모델 학습 중...")
    X_normal = X[y == 0]
    model.build_anomaly_detector()
    model.train_anomaly_detector(X_normal)

    # 3. 모델 저장
    import os
    os.makedirs(save_path, exist_ok=True)
    model.save(save_path)

    print(f"\n모델 저장 완료: {save_path}")

    return model

if __name__ == "__main__":
    # 학습 데이터 준비
    X, y = prepare_training_data('crusher_data.csv')

    # 모델 학습
    model = train_models(X, y)
```

---

## 7. 시스템 구현

### 7.1 서버 API (Flask)

```python
# server.py - AI 서버 API

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from datetime import datetime
import sqlite3
from model import CrusherHealthModel, predict_health
from feature_engineering import FeatureExtractor

app = Flask(__name__)
CORS(app)

# 모델 로드
model = CrusherHealthModel()
model.load('./models')

extractor = FeatureExtractor()

# 데이터베이스 초기화
def init_db():
    conn = sqlite3.connect('crusher_data.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS sensor_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id TEXT,
            timestamp DATETIME,
            features TEXT,
            status TEXT,
            status_code INTEGER,
            anomaly_score REAL,
            action TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id TEXT,
            timestamp DATETIME,
            alert_type TEXT,
            message TEXT,
            acknowledged INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/sensor_data', methods=['POST'])
def receive_sensor_data():
    """센서 데이터 수신 및 분석"""
    try:
        data = request.json
        device_id = data['device_id']
        timestamp = datetime.fromtimestamp(data['timestamp'])

        # 특징 벡터 구성
        features = np.array([
            data['vibration']['rms_motor'],
            data['vibration']['rms_bearing'],
            data['vibration']['peak_motor'],
            data['vibration']['peak_bearing'],
            data['vibration']['crest_motor'],
            data['vibration']['crest_bearing'],
            data['current']['rms_r'],
            data['current']['rms_s'],
            data['current']['rms_t'],
            data['current']['unbalance'],
            data['current']['power'],
        ])

        # AI 예측
        result = predict_health(model, features)

        # 데이터베이스 저장
        conn = sqlite3.connect('crusher_data.db')
        c = conn.cursor()
        c.execute('''
            INSERT INTO sensor_data
            (device_id, timestamp, features, status, status_code, anomaly_score, action)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            device_id,
            timestamp,
            str(features.tolist()),
            result['status']['status'],
            result['status']['status_code'],
            result['anomaly']['anomaly_score'],
            result['action']
        ))

        # 경고 생성
        alert = None
        if result['priority'] in ['HIGH', 'MEDIUM']:
            alert_msg = f"[{result['priority']}] {device_id}: {result['status']['status']} 상태 - {result['action']}"
            c.execute('''
                INSERT INTO alerts (device_id, timestamp, alert_type, message)
                VALUES (?, ?, ?, ?)
            ''', (device_id, timestamp, result['priority'], alert_msg))
            alert = alert_msg

        conn.commit()
        conn.close()

        return jsonify({
            'success': True,
            'result': result,
            'alert': alert
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/status/<device_id>', methods=['GET'])
def get_device_status(device_id):
    """장치 상태 조회"""
    conn = sqlite3.connect('crusher_data.db')
    c = conn.cursor()

    # 최근 데이터 조회
    c.execute('''
        SELECT timestamp, status, status_code, anomaly_score, action
        FROM sensor_data
        WHERE device_id = ?
        ORDER BY timestamp DESC
        LIMIT 1
    ''', (device_id,))

    row = c.fetchone()
    conn.close()

    if row:
        return jsonify({
            'device_id': device_id,
            'timestamp': row[0],
            'status': row[1],
            'status_code': row[2],
            'anomaly_score': row[3],
            'action': row[4]
        })
    else:
        return jsonify({'error': 'Device not found'}), 404

@app.route('/api/history/<device_id>', methods=['GET'])
def get_history(device_id):
    """이력 조회"""
    hours = request.args.get('hours', 24, type=int)

    conn = sqlite3.connect('crusher_data.db')
    c = conn.cursor()

    c.execute('''
        SELECT timestamp, status_code, anomaly_score
        FROM sensor_data
        WHERE device_id = ?
        AND timestamp > datetime('now', ?)
        ORDER BY timestamp
    ''', (device_id, f'-{hours} hours'))

    rows = c.fetchall()
    conn.close()

    return jsonify({
        'device_id': device_id,
        'data': [
            {'timestamp': r[0], 'status_code': r[1], 'anomaly_score': r[2]}
            for r in rows
        ]
    })

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """경고 목록 조회"""
    conn = sqlite3.connect('crusher_data.db')
    c = conn.cursor()

    c.execute('''
        SELECT id, device_id, timestamp, alert_type, message, acknowledged
        FROM alerts
        WHERE acknowledged = 0
        ORDER BY timestamp DESC
        LIMIT 100
    ''')

    rows = c.fetchall()
    conn.close()

    return jsonify({
        'alerts': [
            {
                'id': r[0],
                'device_id': r[1],
                'timestamp': r[2],
                'type': r[3],
                'message': r[4],
                'acknowledged': bool(r[5])
            }
            for r in rows
        ]
    })

@app.route('/api/alerts/<int:alert_id>/acknowledge', methods=['POST'])
def acknowledge_alert(alert_id):
    """경고 확인 처리"""
    conn = sqlite3.connect('crusher_data.db')
    c = conn.cursor()
    c.execute('UPDATE alerts SET acknowledged = 1 WHERE id = ?', (alert_id,))
    conn.commit()
    conn.close()

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

### 7.2 대시보드 (웹 UI)

```html
<!-- dashboard.html - 모니터링 대시보드 -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>분쇄기 고장 예지 시스템</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #1a1a2e;
            color: #eee;
            min-height: 100vh;
        }

        .header {
            background: #16213e;
            padding: 20px;
            text-align: center;
            border-bottom: 2px solid #0f3460;
        }

        .header h1 {
            color: #e94560;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .status-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .card {
            background: #16213e;
            border-radius: 10px;
            padding: 20px;
            border: 1px solid #0f3460;
        }

        .card h3 {
            color: #e94560;
            margin-bottom: 15px;
            font-size: 14px;
            text-transform: uppercase;
        }

        .status-indicator {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .status-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
        }

        .status-normal { background: linear-gradient(135deg, #00b894, #00cec9); }
        .status-caution { background: linear-gradient(135deg, #fdcb6e, #f39c12); }
        .status-warning { background: linear-gradient(135deg, #e17055, #d63031); }
        .status-danger { background: linear-gradient(135deg, #d63031, #c0392b); animation: pulse 1s infinite; }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .metric {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #0f3460;
        }

        .metric:last-child {
            border-bottom: none;
        }

        .metric-value {
            font-weight: bold;
            color: #00cec9;
        }

        .chart-container {
            background: #16213e;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #0f3460;
        }

        .alerts {
            background: #16213e;
            border-radius: 10px;
            padding: 20px;
            border: 1px solid #0f3460;
        }

        .alert-item {
            background: #1a1a2e;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 10px;
            border-left: 4px solid;
        }

        .alert-high { border-left-color: #e74c3c; }
        .alert-medium { border-left-color: #f39c12; }
        .alert-low { border-left-color: #3498db; }

        .alert-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .alert-time {
            color: #888;
            font-size: 12px;
        }

        .btn {
            background: #e94560;
            color: white;
            border: none;
            padding: 5px 15px;
            border-radius: 5px;
            cursor: pointer;
        }

        .btn:hover {
            background: #c73e54;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏭 분쇄기 고장 예지 시스템</h1>
        <p>실시간 AI 기반 설비 상태 모니터링</p>
    </div>

    <div class="container">
        <!-- 상태 카드 -->
        <div class="status-cards">
            <div class="card">
                <h3>설비 상태</h3>
                <div class="status-indicator">
                    <div class="status-circle status-normal" id="statusCircle">
                        정상
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: bold;" id="statusText">정상 운전</div>
                        <div style="color: #888;" id="statusAction">계속 모니터링</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3>진동 데이터</h3>
                <div class="metric">
                    <span>모터 RMS</span>
                    <span class="metric-value" id="vibMotorRms">0.00 g</span>
                </div>
                <div class="metric">
                    <span>베어링 RMS</span>
                    <span class="metric-value" id="vibBearingRms">0.00 g</span>
                </div>
                <div class="metric">
                    <span>Peak 값</span>
                    <span class="metric-value" id="vibPeak">0.00 g</span>
                </div>
                <div class="metric">
                    <span>Crest Factor</span>
                    <span class="metric-value" id="vibCrest">0.00</span>
                </div>
            </div>

            <div class="card">
                <h3>전류 데이터</h3>
                <div class="metric">
                    <span>R상 전류</span>
                    <span class="metric-value" id="curR">0.0 A</span>
                </div>
                <div class="metric">
                    <span>S상 전류</span>
                    <span class="metric-value" id="curS">0.0 A</span>
                </div>
                <div class="metric">
                    <span>T상 전류</span>
                    <span class="metric-value" id="curT">0.0 A</span>
                </div>
                <div class="metric">
                    <span>불균형률</span>
                    <span class="metric-value" id="curUnbalance">0.0 %</span>
                </div>
            </div>

            <div class="card">
                <h3>AI 분석</h3>
                <div class="metric">
                    <span>이상 점수</span>
                    <span class="metric-value" id="anomalyScore">0.00</span>
                </div>
                <div class="metric">
                    <span>신뢰도</span>
                    <span class="metric-value" id="confidence">0.0 %</span>
                </div>
                <div class="metric">
                    <span>예상 잔여 수명</span>
                    <span class="metric-value" id="rul">- 일</span>
                </div>
            </div>
        </div>

        <!-- 트렌드 차트 -->
        <div class="chart-container">
            <h3 style="color: #e94560; margin-bottom: 15px;">📈 상태 트렌드 (24시간)</h3>
            <canvas id="trendChart" height="100"></canvas>
        </div>

        <!-- 경고 목록 -->
        <div class="alerts">
            <h3 style="color: #e94560; margin-bottom: 15px;">🚨 경고 알림</h3>
            <div id="alertList">
                <p style="color: #888; text-align: center;">경고 없음</p>
            </div>
        </div>
    </div>

    <script>
        const API_BASE = 'http://localhost:5000/api';
        const DEVICE_ID = 'CRUSHER_01';

        // 트렌드 차트 초기화
        const ctx = document.getElementById('trendChart').getContext('2d');
        const trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: '상태 점수',
                        data: [],
                        borderColor: '#e94560',
                        tension: 0.1,
                        fill: false
                    },
                    {
                        label: '이상 점수',
                        data: [],
                        borderColor: '#00cec9',
                        tension: 0.1,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#0f3460' }
                    },
                    x: {
                        grid: { color: '#0f3460' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#eee' }
                    }
                }
            }
        });

        // 상태 업데이트
        async function updateStatus() {
            try {
                const response = await fetch(`${API_BASE}/status/${DEVICE_ID}`);
                const data = await response.json();

                // 상태 표시 업데이트
                const statusCircle = document.getElementById('statusCircle');
                const statusClasses = ['status-normal', 'status-caution', 'status-warning', 'status-danger'];
                const statusTexts = ['정상', '주의', '경고', '위험'];

                statusCircle.className = `status-circle ${statusClasses[data.status_code]}`;
                statusCircle.textContent = statusTexts[data.status_code];

                document.getElementById('statusText').textContent = data.status;
                document.getElementById('statusAction').textContent = data.action;
                document.getElementById('anomalyScore').textContent = data.anomaly_score.toFixed(2);

            } catch (error) {
                console.error('상태 업데이트 오류:', error);
            }
        }

        // 이력 업데이트
        async function updateHistory() {
            try {
                const response = await fetch(`${API_BASE}/history/${DEVICE_ID}?hours=24`);
                const data = await response.json();

                trendChart.data.labels = data.data.map(d =>
                    new Date(d.timestamp).toLocaleTimeString()
                );
                trendChart.data.datasets[0].data = data.data.map(d => d.status_code);
                trendChart.data.datasets[1].data = data.data.map(d => d.anomaly_score);
                trendChart.update();

            } catch (error) {
                console.error('이력 업데이트 오류:', error);
            }
        }

        // 경고 업데이트
        async function updateAlerts() {
            try {
                const response = await fetch(`${API_BASE}/alerts`);
                const data = await response.json();

                const alertList = document.getElementById('alertList');

                if (data.alerts.length === 0) {
                    alertList.innerHTML = '<p style="color: #888; text-align: center;">경고 없음</p>';
                    return;
                }

                alertList.innerHTML = data.alerts.map(alert => `
                    <div class="alert-item alert-${alert.type.toLowerCase()}">
                        <div class="alert-header">
                            <strong>${alert.device_id}</strong>
                            <span class="alert-time">${new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                        <div>${alert.message}</div>
                        <button class="btn" onclick="acknowledgeAlert(${alert.id})" style="margin-top: 10px;">확인</button>
                    </div>
                `).join('');

            } catch (error) {
                console.error('경고 업데이트 오류:', error);
            }
        }

        // 경고 확인
        async function acknowledgeAlert(alertId) {
            try {
                await fetch(`${API_BASE}/alerts/${alertId}/acknowledge`, { method: 'POST' });
                updateAlerts();
            } catch (error) {
                console.error('경고 확인 오류:', error);
            }
        }

        // 주기적 업데이트
        setInterval(updateStatus, 1000);
        setInterval(updateHistory, 10000);
        setInterval(updateAlerts, 5000);

        // 초기 로드
        updateStatus();
        updateHistory();
        updateAlerts();
    </script>
</body>
</html>
```

---

## 8. 설치 및 운영

### 8.1 센서 설치 가이드

#### 8.1.1 MPU6050 설치 위치
```yaml
설치_위치_선정:
  권장_위치:
    - 베어링 하우징 (가장 중요)
    - 모터 프레임
    - 커플링 근처

  설치_방향:
    - X축: 수평 (로터 회전 방향)
    - Y축: 수직 (하중 방향)
    - Z축: 축 방향 (스러스트 방향)

  주의사항:
    - 평탄한 면에 견고하게 고정
    - 자성 부품 근처 피할 것
    - 케이블 고정 (진동 노이즈 방지)
    - 방진/방수 처리 필수
```

#### 8.1.2 설치 순서
```
1. 설치면 청소 및 평탄화
2. 에폭시 접착제로 마운팅 패드 부착
3. 센서 모듈 볼트 체결 (M4 x 2)
4. 케이블 고정 및 배선
5. 방수 커버 설치
6. 초기 교정 (캘리브레이션)
```

### 8.2 시스템 교정

```python
# calibration.py - 센서 교정 스크립트

import numpy as np
import time

def calibrate_mpu6050(mpu, samples=1000):
    """MPU6050 오프셋 교정"""
    print("센서 교정 중... 설비를 정지 상태로 유지하세요.")

    offsets = {'ax': 0, 'ay': 0, 'az': 0}

    for _ in range(samples):
        ax, ay, az = mpu.read_accel()
        offsets['ax'] += ax
        offsets['ay'] += ay
        offsets['az'] += az
        time.sleep(0.001)

    offsets = {k: v/samples for k, v in offsets.items()}

    # Z축은 중력 보정 (1g)
    offsets['az'] -= 1.0

    print(f"교정 완료: {offsets}")
    return offsets

def calibrate_current_sensor(ct, voltage_supply=3.3, samples=1000):
    """전류 센서 DC 오프셋 교정"""
    print("전류 센서 교정 중... 부하 차단 상태로 유지하세요.")

    readings = []
    for _ in range(samples):
        readings.append(ct.read_raw_voltage())
        time.sleep(0.001)

    dc_offset = np.mean(readings)
    print(f"DC 오프셋: {dc_offset:.4f}V (예상: {voltage_supply/2:.2f}V)")

    return dc_offset
```

### 8.3 알람 임계값 설정

```yaml
진동_임계값: # ISO 10816 기준 참고
  정상:
    rms: < 2.8 mm/s
    peak: < 7.1 mm/s

  주의:
    rms: 2.8 ~ 7.1 mm/s
    peak: 7.1 ~ 18 mm/s

  경고:
    rms: 7.1 ~ 18 mm/s
    peak: 18 ~ 45 mm/s

  위험:
    rms: > 18 mm/s
    peak: > 45 mm/s

전류_임계값:
  과전류: > 정격전류 × 1.1 (10% 초과)
  저전류: < 정격전류 × 0.5 (공회전)
  불균형: > 5%

이상_탐지_임계값:
  anomaly_score: > 0.5
```

### 8.4 운영 매뉴얼

```yaml
일일_점검:
  □ 대시보드 상태 확인
  □ 경고 알림 확인 및 조치
  □ 센서 연결 상태 확인

주간_점검:
  □ 트렌드 분석 (이상 패턴 확인)
  □ 센서 케이블/고정 상태 점검
  □ 데이터 백업

월간_점검:
  □ 센서 재교정
  □ 임계값 검토 및 조정
  □ 모델 성능 평가
  □ 예측 정확도 분석

비상_대응:
  위험_상태_발생시:
    1. 설비 정지 (안전 확보)
    2. 현장 점검 실시
    3. 원인 분석 및 조치
    4. 이력 기록
```

---

## 9. 비용 및 ROI

### 9.1 비용 산정

```yaml
하드웨어_비용:
  센서부:
    MPU6050 x 2: 6,000원
    CT센서 x 3: 24,000원
    ADS1115: 5,000원
    소계: 35,000원

  데이터_수집부:
    ESP32 (기본): 8,000원
    또는 라즈베리파이4: 80,000원
    방수케이스: 30,000원
    전원/케이블: 20,000원
    소계: 60,000 ~ 130,000원

  서버 (옵션별):
    클라우드: 월 50,000원~
    온프레미스: 1,500,000원~

설비_1대당_총비용:
  기본 구성: 약 200,000원
  고급 구성: 약 500,000원

개발_비용:
  소프트웨어_개발: 5,000,000 ~ 20,000,000원
  AI_모델_개발: 10,000,000 ~ 30,000,000원
  설치_및_교육: 2,000,000원/대
```

### 9.2 ROI 분석

```yaml
시나리오:
  분쇄기_가격: 100,000,000원
  연간_정비비용: 10,000,000원
  비계획_정지_손실: 시간당 500,000원
  연간_비계획_정지: 48시간 (월 4시간)

현재_연간_비용:
  정비비: 10,000,000원
  정지손실: 48 × 500,000 = 24,000,000원
  총계: 34,000,000원

예지보전_도입_후:
  시스템_비용: 500,000원 (1회)
  연간_운영비: 1,000,000원
  정비비: 6,000,000원 (40% 절감)
  정지손실: 6 × 500,000 = 3,000,000원 (87% 감소)
  총계: 10,000,000원

연간_절감_효과: 24,000,000원
투자_회수_기간: 약 1개월
5년_ROI: 4,700%
```

---

## 10. 체크리스트

### 10.1 프로젝트 준비

```
□ 대상 설비 선정 및 분석
□ 불량/고장 이력 데이터 확보
□ 설비 도면 및 사양 확인
□ 네트워크 환경 확인
□ 예산 및 일정 수립
□ 담당자 지정
```

### 10.2 하드웨어 구축

```
□ 센서 구매 및 검수
□ 데이터 수집 장치 구성
□ 회로 조립 및 테스트
□ 케이스/방수 처리
□ 설치 위치 선정
□ 센서 설치 및 배선
□ 통신 테스트
```

### 10.3 소프트웨어 개발

```
□ 펌웨어 개발 (ESP32/라즈베리파이)
□ 서버 API 개발
□ AI 모델 개발
□ 대시보드 개발
□ 통합 테스트
□ 성능 최적화
```

### 10.4 데이터 수집 및 학습

```
□ 정상 운전 데이터 수집 (최소 2주)
□ 이상 상태 데이터 수집/생성
□ 데이터 라벨링
□ 모델 학습
□ 모델 검증
□ 임계값 설정
```

### 10.5 배포 및 운영

```
□ 시스템 설치
□ 초기 교정
□ 시운전 테스트
□ 운영자 교육
□ 문서 인계
□ 정기 점검 일정 수립
```

---

## 부록

### A. 주요 고장 유형별 진동 특성

| 고장 유형 | 주파수 특성 | 진동 파형 | 전류 특성 |
|----------|------------|----------|----------|
| 불균형 | 1x RPM | 사인파 | 정상 |
| 축정렬 불량 | 1x, 2x RPM | 복합파 | 약간 증가 |
| 베어링 손상 | BPFO, BPFI, BSF | 충격 펄스 | 불규칙 증가 |
| 기어 손상 | GMF ± 측대역 | 변조파 | 불규칙 증가 |
| 느슨함 | 1x, 2x, 3x RPM | 복합파 | 불안정 |
| 과부하 | 저주파 증가 | 전체 증가 | 지속 증가 |

### B. 참고 표준

```
ISO 10816: 기계 진동 평가
ISO 13373: 상태 모니터링
ISO 13379: 진단 기술
ISO 13381: 예지 기술
IEEE 841: 모터 진동
```

### C. 트러블슈팅

| 문제 | 가능한 원인 | 해결 방법 |
|------|------------|----------|
| 데이터 수신 안됨 | WiFi 연결, 센서 오류 | 네트워크/센서 점검 |
| 노이즈 심함 | 접지 불량, EMI | 실드 케이블, 접지 |
| 오검출 많음 | 임계값 부적절 | 임계값 재조정 |
| 미검출 | 모델 성능, 센서 위치 | 재학습, 위치 변경 |

---

**문서 버전**: 1.0
**작성일**: 2026-01-18
**작성자**: AI 적용 전문가
