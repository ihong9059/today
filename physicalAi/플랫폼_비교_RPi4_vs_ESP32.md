# Physical AI 플랫폼 비교: Raspberry Pi 4 vs ESP32

## 1. 하드웨어 사양 비교

### 1.1 기본 스펙 비교표

| 항목 | Raspberry Pi 4 | ESP32-WROOM-32 | ESP32-C3 |
|------|----------------|----------------|----------|
| **CPU** | ARM Cortex-A72 (64bit) | Xtensa LX6 듀얼코어 | RISC-V 싱글코어 |
| **클럭** | 1.5 GHz | 240 MHz | 160 MHz |
| **RAM** | 2/4/8 GB | 520 KB | 400 KB |
| **Flash** | microSD (무제한) | 4 MB (외장 16MB 가능) | 4 MB |
| **OS** | Linux (Raspberry Pi OS) | FreeRTOS / 베어메탈 | FreeRTOS / 베어메탈 |
| **전력** | 3A @ 5V (15W) | 80mA @ 3.3V (0.26W) | 40mA @ 3.3V (0.13W) |
| **WiFi** | 802.11ac (별도 모듈) | 802.11 b/g/n (내장) | 802.11 b/g/n (내장) |
| **Bluetooth** | BT 5.0 (별도 모듈) | BT 4.2 (내장) | BLE 5.0 (내장) |
| **I2C** | 2채널 | 2채널 | 1채널 |
| **가격** | $35~75 | $3~8 | $2~5 |

### 1.2 연산 성능 비교

```
┌────────────────────────────────────────────────────────────────────┐
│                    상대적 연산 성능 (RPi4 = 100)                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Raspberry Pi 4  ████████████████████████████████████████ 100      │
│                                                                    │
│  ESP32-WROOM     ██                                      2.5       │
│                                                                    │
│  ESP32-C3        █                                       1.2       │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 2. Physical AI 구현 관점 비교

### 2.1 데이터 수집 (Sensor → MCU)

| 항목 | Raspberry Pi 4 | ESP32-WROOM | ESP32-C3 |
|------|----------------|-------------|----------|
| **I2C 속도** | 400kHz (Fast) | 400kHz (Fast) | 400kHz (Fast) |
| **동시 센서** | 다수 (메모리 충분) | 10개 이내 권장 | 5개 이내 권장 |
| **샘플링 레이트** | 10kHz+ 가능 | 1kHz 권장 | 500Hz 권장 |
| **버퍼 크기** | GB 단위 | KB 단위 (제한적) | KB 단위 (매우 제한) |
| **FFT 처리** | numpy로 즉시 | 제한적 (메모리) | 거의 불가 |

#### Raspberry Pi 4 - 센서 데이터 수집
```python
# Python - 풍부한 라이브러리 사용
import board
import adafruit_ahtx0
import adafruit_bmp280
from mpu6050 import mpu6050
import numpy as np
from collections import deque

# 대용량 버퍼 가능
buffer = deque(maxlen=10000)  # 10초 @ 1kHz

# I2C 초기화
i2c = board.I2C()
aht = adafruit_ahtx0.AHTx0(i2c)
bmp = adafruit_bmp280.Adafruit_BMP280_I2C(i2c)
mpu = mpu6050(0x68)

while True:
    data = {
        'temp': aht.temperature,
        'humidity': aht.relative_humidity,
        'pressure': bmp.pressure,
        'accel': mpu.get_accel_data(),
        'gyro': mpu.get_gyro_data()
    }
    buffer.append(data)

    # 실시간 FFT 분석 가능
    if len(buffer) == 1000:
        accel_array = np.array([d['accel']['x'] for d in buffer])
        fft_result = np.fft.fft(accel_array)
```

#### ESP32-WROOM - 센서 데이터 수집
```cpp
// C/C++ - Arduino/ESP-IDF
#include <Wire.h>
#include <Adafruit_AHTX0.h>
#include <Adafruit_BMP280.h>
#include <MPU6050.h>

// 제한된 버퍼 (RAM 520KB 중 일부만 사용 가능)
#define BUFFER_SIZE 256
float accel_buffer[BUFFER_SIZE];
uint16_t buffer_idx = 0;

Adafruit_AHTX0 aht;
Adafruit_BMP280 bmp;
MPU6050 mpu;

void setup() {
    Wire.begin(21, 22);  // SDA, SCL 핀 지정
    aht.begin();
    bmp.begin(0x76);
    mpu.initialize();
}

void loop() {
    sensors_event_t humidity, temp;
    aht.getEvent(&humidity, &temp);

    float pressure = bmp.readPressure();

    int16_t ax, ay, az, gx, gy, gz;
    mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

    // 버퍼에 저장 (순환)
    accel_buffer[buffer_idx] = ax / 16384.0;  // g 단위 변환
    buffer_idx = (buffer_idx + 1) % BUFFER_SIZE;

    delay(10);  // 100Hz 샘플링
}
```

#### ESP32-C3 - 센서 데이터 수집
```cpp
// ESP32-C3는 I2C 핀이 다름
#include <Wire.h>

#define SDA_PIN 8
#define SCL_PIN 9

// 더 제한된 버퍼 (RAM 400KB)
#define BUFFER_SIZE 128
float accel_buffer[BUFFER_SIZE];

void setup() {
    Wire.begin(SDA_PIN, SCL_PIN);
    // ... 센서 초기화
}

// ESP32-WROOM과 유사하지만 더 보수적인 메모리 사용 필요
```

---

### 2.2 데이터 저장 및 DB 비교

#### 2.2.1 로컬 저장소 옵션

| 저장 방식 | Raspberry Pi 4 | ESP32-WROOM | ESP32-C3 |
|-----------|----------------|-------------|----------|
| **SQLite** | ✅ 완벽 지원 | ❌ 불가 | ❌ 불가 |
| **PostgreSQL** | ✅ 설치 가능 | ❌ 불가 | ❌ 불가 |
| **InfluxDB** | ✅ 설치 가능 | ❌ 불가 | ❌ 불가 |
| **파일 시스템** | ✅ ext4, NTFS | ⚠️ SPIFFS/LittleFS (제한) | ⚠️ SPIFFS/LittleFS |
| **SD 카드** | ✅ 무제한 | ✅ SPI 연결 | ✅ SPI 연결 |
| **EEPROM** | ❌ 해당없음 | ✅ 4KB | ✅ 4KB |
| **NVS** | ❌ 해당없음 | ✅ 키-값 저장소 | ✅ 키-값 저장소 |

#### 2.2.2 원격 DB 연결 비교

| DB 연결 방식 | Raspberry Pi 4 | ESP32-WROOM | ESP32-C3 |
|--------------|----------------|-------------|----------|
| **MySQL/MariaDB 직접 연결** | ✅ Python/C 드라이버 | ⚠️ 제한적 라이브러리 | ⚠️ 매우 제한적 |
| **PostgreSQL 직접 연결** | ✅ psycopg2 | ❌ 불가 | ❌ 불가 |
| **MongoDB 직접 연결** | ✅ pymongo | ❌ 불가 | ❌ 불가 |
| **InfluxDB HTTP API** | ✅ 네이티브 | ✅ HTTP 클라이언트 | ✅ HTTP 클라이언트 |
| **Firebase Realtime DB** | ✅ SDK | ✅ REST API | ✅ REST API |
| **AWS IoT / Azure IoT** | ✅ SDK | ✅ MQTT | ✅ MQTT |
| **MQTT Broker** | ✅ paho-mqtt | ✅ PubSubClient | ✅ PubSubClient |

---

### 2.3 DB 아키텍처 비교

#### Raspberry Pi 4 - 풀스택 로컬 DB

```
┌─────────────────────────────────────────────────────────────┐
│                    Raspberry Pi 4 아키텍처                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │ Sensors │───▶│ Python App   │───▶│ Local Database   │   │
│  │ I2C     │    │ Data Process │    │ (SQLite/Postgres)│   │
│  └─────────┘    └──────────────┘    └──────────────────┘   │
│                        │                     │              │
│                        ▼                     ▼              │
│                 ┌──────────────┐    ┌──────────────────┐   │
│                 │ ML Inference │    │ Web Dashboard    │   │
│                 │ (TensorFlow) │    │ (Flask/Grafana)  │   │
│                 └──────────────┘    └──────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```python
# Raspberry Pi - SQLite 직접 사용
import sqlite3
import pandas as pd
from datetime import datetime

class SensorDatabase:
    def __init__(self, db_path='sensor_data.db'):
        self.conn = sqlite3.connect(db_path)
        self.create_tables()

    def create_tables(self):
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS sensor_readings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                temperature REAL,
                humidity REAL,
                pressure REAL,
                accel_x REAL,
                accel_y REAL,
                accel_z REAL,
                gyro_x REAL,
                gyro_y REAL,
                gyro_z REAL
            )
        ''')

        # 인덱스 생성 (시계열 쿼리 최적화)
        self.conn.execute('''
            CREATE INDEX IF NOT EXISTS idx_timestamp
            ON sensor_readings(timestamp)
        ''')
        self.conn.commit()

    def insert_reading(self, data):
        self.conn.execute('''
            INSERT INTO sensor_readings
            (temperature, humidity, pressure, accel_x, accel_y, accel_z, gyro_x, gyro_y, gyro_z)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (data['temp'], data['humidity'], data['pressure'],
              data['accel']['x'], data['accel']['y'], data['accel']['z'],
              data['gyro']['x'], data['gyro']['y'], data['gyro']['z']))
        self.conn.commit()

    def get_recent_data(self, minutes=60):
        query = '''
            SELECT * FROM sensor_readings
            WHERE timestamp > datetime('now', '-{} minutes')
            ORDER BY timestamp DESC
        '''.format(minutes)
        return pd.read_sql_query(query, self.conn)

    def get_statistics(self, hours=24):
        query = '''
            SELECT
                AVG(temperature) as avg_temp,
                MAX(temperature) as max_temp,
                MIN(temperature) as min_temp,
                AVG(humidity) as avg_humidity,
                AVG(accel_x*accel_x + accel_y*accel_y + accel_z*accel_z) as avg_vibration
            FROM sensor_readings
            WHERE timestamp > datetime('now', '-{} hours')
        '''.format(hours)
        return pd.read_sql_query(query, self.conn)

# InfluxDB 사용 (시계열 특화)
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

class InfluxSensorDB:
    def __init__(self):
        self.client = InfluxDBClient(
            url="http://localhost:8086",
            token="my-token",
            org="my-org"
        )
        self.write_api = self.client.write_api(write_options=SYNCHRONOUS)
        self.bucket = "sensor_data"

    def insert_reading(self, data):
        point = Point("environment") \
            .tag("device", "rpi4") \
            .field("temperature", data['temp']) \
            .field("humidity", data['humidity']) \
            .field("pressure", data['pressure'])

        vibration_point = Point("vibration") \
            .tag("device", "rpi4") \
            .field("accel_x", data['accel']['x']) \
            .field("accel_y", data['accel']['y']) \
            .field("accel_z", data['accel']['z'])

        self.write_api.write(bucket=self.bucket, record=[point, vibration_point])
```

#### ESP32 - 경량 로컬 + 원격 DB 하이브리드

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ESP32 아키텍처                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │ Sensors │───▶│ ESP32 App    │───▶│ Local Buffer │                   │
│  │ I2C     │    │ (C/C++)      │    │ (SPIFFS/SD)  │                   │
│  └─────────┘    └──────────────┘    └──────────────┘                   │
│                        │                                                │
│                        │ WiFi                                           │
│                        ▼                                                │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     Cloud / Edge Server                           │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  │  │
│  │  │ MQTT Broker│  │ InfluxDB   │  │ ML Server  │  │ Dashboard  │  │  │
│  │  │ (Mosquitto)│  │ (TimeSeries│  │ (TFServing)│  │ (Grafana)  │  │  │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

```cpp
// ESP32 - SPIFFS 로컬 저장 + MQTT 원격 전송
#include <WiFi.h>
#include <PubSubClient.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

// WiFi & MQTT 설정
const char* ssid = "your_wifi";
const char* password = "your_password";
const char* mqtt_server = "broker.hivemq.com";
const char* influx_url = "http://your-server:8086/api/v2/write";

WiFiClient espClient;
PubSubClient mqtt(espClient);

// 로컬 버퍼 (연결 끊김 대비)
#define LOCAL_BUFFER_SIZE 100
struct SensorData {
    unsigned long timestamp;
    float temperature;
    float humidity;
    float pressure;
    float accel_x, accel_y, accel_z;
};
SensorData localBuffer[LOCAL_BUFFER_SIZE];
int bufferIndex = 0;

void setup() {
    // SPIFFS 초기화 (로컬 파일 시스템)
    if (!SPIFFS.begin(true)) {
        Serial.println("SPIFFS Mount Failed");
        return;
    }

    // WiFi 연결
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
    }

    // MQTT 연결
    mqtt.setServer(mqtt_server, 1883);
}

// MQTT로 데이터 전송
void sendToMQTT(SensorData* data) {
    StaticJsonDocument<256> doc;
    doc["timestamp"] = data->timestamp;
    doc["temperature"] = data->temperature;
    doc["humidity"] = data->humidity;
    doc["pressure"] = data->pressure;
    doc["accel_x"] = data->accel_x;
    doc["accel_y"] = data->accel_y;
    doc["accel_z"] = data->accel_z;

    char buffer[256];
    serializeJson(doc, buffer);

    mqtt.publish("sensors/esp32/data", buffer);
}

// InfluxDB HTTP API로 전송
void sendToInfluxDB(SensorData* data) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(influx_url);
        http.addHeader("Content-Type", "text/plain");
        http.addHeader("Authorization", "Token your-token");

        // Line Protocol 형식
        String payload = "environment,device=esp32 ";
        payload += "temperature=" + String(data->temperature, 2) + ",";
        payload += "humidity=" + String(data->humidity, 2) + ",";
        payload += "pressure=" + String(data->pressure, 2) + " ";
        payload += String(data->timestamp) + "000000000";  // 나노초

        int httpCode = http.POST(payload);
        http.end();
    }
}

// 오프라인 시 로컬 저장
void saveToLocal(SensorData* data) {
    File file = SPIFFS.open("/buffer.dat", FILE_APPEND);
    if (file) {
        file.write((uint8_t*)data, sizeof(SensorData));
        file.close();
    }
}

// 연결 복구 시 로컬 데이터 전송
void syncLocalData() {
    if (SPIFFS.exists("/buffer.dat")) {
        File file = SPIFFS.open("/buffer.dat", FILE_READ);
        SensorData data;
        while (file.read((uint8_t*)&data, sizeof(SensorData)) == sizeof(SensorData)) {
            sendToInfluxDB(&data);
        }
        file.close();
        SPIFFS.remove("/buffer.dat");
    }
}

void loop() {
    SensorData data;
    data.timestamp = millis();
    // ... 센서 데이터 읽기

    if (WiFi.status() == WL_CONNECTED && mqtt.connected()) {
        syncLocalData();  // 오프라인 데이터 동기화
        sendToMQTT(&data);
        sendToInfluxDB(&data);
    } else {
        saveToLocal(&data);  // 오프라인 저장
    }

    delay(1000);
}
```

---

### 2.4 ML/AI 처리 비교

| 항목 | Raspberry Pi 4 | ESP32-WROOM | ESP32-C3 |
|------|----------------|-------------|----------|
| **TensorFlow** | ✅ TF/TFLite | ⚠️ TFLite Micro | ⚠️ TFLite Micro (제한) |
| **PyTorch** | ✅ 가능 | ❌ 불가 | ❌ 불가 |
| **scikit-learn** | ✅ 완벽 지원 | ❌ 불가 | ❌ 불가 |
| **모델 크기** | 수백 MB 가능 | ~500KB 권장 | ~200KB 권장 |
| **실시간 추론** | 복잡한 모델 가능 | 단순 모델만 | 매우 단순 모델 |
| **학습(Training)** | ✅ 온디바이스 가능 | ❌ 불가 | ❌ 불가 |

#### Raspberry Pi 4 - 전체 ML 파이프라인

```python
# 온디바이스 학습 및 추론 모두 가능
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
import joblib

class OnDeviceML:
    def __init__(self):
        self.scaler = StandardScaler()
        self.anomaly_model = IsolationForest(contamination=0.1, random_state=42)

        # LSTM 모델 로드 (예측용)
        self.prediction_model = tf.keras.models.load_model('vibration_lstm.h5')

    def train_anomaly_detector(self, training_data):
        """온디바이스에서 이상 탐지 모델 학습"""
        scaled_data = self.scaler.fit_transform(training_data)
        self.anomaly_model.fit(scaled_data)

        # 모델 저장
        joblib.dump(self.scaler, 'scaler.pkl')
        joblib.dump(self.anomaly_model, 'anomaly_model.pkl')

    def detect_anomaly(self, sensor_data):
        """실시간 이상 탐지"""
        scaled = self.scaler.transform([sensor_data])
        prediction = self.anomaly_model.predict(scaled)
        score = self.anomaly_model.score_samples(scaled)
        return prediction[0] == -1, score[0]  # True if anomaly

    def predict_failure(self, time_series_data):
        """LSTM으로 고장 예측"""
        # 시퀀스 준비
        sequence = np.array(time_series_data).reshape(1, -1, 6)  # 6 features
        prediction = self.prediction_model.predict(sequence)
        return prediction[0][0]  # 잔여 수명 또는 고장 확률
```

#### ESP32 - TFLite Micro 추론 전용

```cpp
// ESP32 - TensorFlow Lite Micro 사용
#include <TensorFlowLite_ESP32.h>
#include "tensorflow/lite/micro/all_ops_resolver.h"
#include "tensorflow/lite/micro/micro_interpreter.h"
#include "tensorflow/lite/schema/schema_generated.h"

// 모델 데이터 (헤더 파일로 변환된 .tflite)
#include "anomaly_model.h"

// TFLite Micro 설정
constexpr int kTensorArenaSize = 32 * 1024;  // 32KB
uint8_t tensor_arena[kTensorArenaSize];

tflite::MicroInterpreter* interpreter;
TfLiteTensor* input;
TfLiteTensor* output;

void setupTFLite() {
    static tflite::AllOpsResolver resolver;

    const tflite::Model* model = tflite::GetModel(anomaly_model_data);

    static tflite::MicroInterpreter static_interpreter(
        model, resolver, tensor_arena, kTensorArenaSize);
    interpreter = &static_interpreter;

    interpreter->AllocateTensors();
    input = interpreter->input(0);
    output = interpreter->output(0);
}

float runInference(float* sensor_data, int data_size) {
    // 입력 데이터 복사
    for (int i = 0; i < data_size; i++) {
        input->data.f[i] = sensor_data[i];
    }

    // 추론 실행
    interpreter->Invoke();

    // 결과 반환
    return output->data.f[0];
}

void loop() {
    float sensor_values[6] = {
        accel_x, accel_y, accel_z,
        gyro_x, gyro_y, gyro_z
    };

    float anomaly_score = runInference(sensor_values, 6);

    if (anomaly_score > 0.8) {
        // 이상 감지 알림
        sendAlert();
    }
}
```

---

## 3. 사용 시나리오별 권장 플랫폼

### 3.1 시나리오 비교표

| 시나리오 | 권장 플랫폼 | 이유 |
|----------|-------------|------|
| **프로토타입/학습** | Raspberry Pi 4 | 빠른 개발, 풍부한 라이브러리 |
| **복잡한 ML 모델** | Raspberry Pi 4 | 충분한 RAM/CPU |
| **배터리 구동** | ESP32-C3 | 초저전력 |
| **대량 배포** | ESP32-WROOM | 저비용, 소형 |
| **실시간 클라우드 연동** | ESP32-WROOM | WiFi 내장 |
| **오프라인 데이터 로깅** | Raspberry Pi 4 | 로컬 DB 가능 |
| **에지 추론** | ESP32-WROOM + TFLite | 저전력 추론 |
| **개발/테스트** | Raspberry Pi 4 | 디버깅 용이 |
| **양산/제품화** | ESP32 계열 | 비용, 크기 |

### 3.2 하이브리드 아키텍처 권장

```
┌────────────────────────────────────────────────────────────────────────┐
│                     권장 하이브리드 아키텍처                             │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [현장 - Edge Layer]                                                   │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐                  │
│  │   ESP32-C3  │   │ ESP32-WROOM │   │ ESP32-WROOM │   ... (다수)     │
│  │   센서노드1  │   │  센서노드2   │   │  센서노드3   │                  │
│  │  (저전력)   │   │ (TFLite추론)│   │ (데이터수집) │                  │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘                  │
│         │                 │                 │                          │
│         └────────────┬────┴────────────────┘                          │
│                      │ WiFi/BLE Mesh                                   │
│                      ▼                                                 │
│  [게이트웨이 - Fog Layer]                                              │
│  ┌───────────────────────────────────────────────────────────┐        │
│  │                    Raspberry Pi 4                          │        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │        │
│  │  │ 데이터   │  │ 로컬 DB  │  │ ML 모델  │  │ 알림     │   │        │
│  │  │ 집계     │  │ (SQLite) │  │ 학습/추론│  │ 시스템   │   │        │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │        │
│  └───────────────────────────┬───────────────────────────────┘        │
│                              │ Internet                                │
│                              ▼                                         │
│  [클라우드 - Cloud Layer]                                              │
│  ┌───────────────────────────────────────────────────────────┐        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │        │
│  │  │InfluxDB  │  │ 대시보드 │  │ 모델학습 │  │ API서버  │   │        │
│  │  │TimeSeries│  │ Grafana  │  │ (GPU)    │  │          │   │        │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │        │
│  └───────────────────────────────────────────────────────────┘        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 개발 환경 비교

| 항목 | Raspberry Pi 4 | ESP32-WROOM | ESP32-C3 |
|------|----------------|-------------|----------|
| **주 언어** | Python, C/C++ | C/C++ (Arduino) | C/C++ (Arduino) |
| **IDE** | VSCode, Thonny | Arduino IDE, PlatformIO | Arduino IDE, PlatformIO |
| **디버깅** | GDB, 원격 디버깅 | Serial, JTAG | Serial, JTAG |
| **OTA 업데이트** | apt, pip | ESP-IDF OTA | ESP-IDF OTA |
| **개발 난이도** | 쉬움 | 중간 | 중간 |
| **커뮤니티** | 매우 큼 | 큼 | 성장 중 |

---

## 5. 비용 분석 (10대 기준)

| 항목 | Raspberry Pi 4 | ESP32-WROOM | ESP32-C3 |
|------|----------------|-------------|----------|
| **보드** | $550 (4GB x 10) | $50 | $30 |
| **전원** | $100 | $20 | $20 |
| **케이스** | $100 | $30 | $30 |
| **SD카드** | $80 | $0 | $0 |
| **센서** | $150 | $150 | $150 |
| **총합** | **$980** | **$250** | **$230** |
| **전력비 (년)** | ~$130 | ~$5 | ~$3 |

---

## 6. 결론 및 권장사항

### 학습 목적
**Raspberry Pi 4 권장**
- Python 기반 빠른 프로토타이핑
- 전체 ML 파이프라인 경험
- 로컬 DB 운영 실습

### 제품 개발/양산
**ESP32-WROOM 권장**
- 저비용 대량 배포
- WiFi 내장으로 IoT 구현 용이
- TFLite Micro로 에지 추론

### 초저전력 응용
**ESP32-C3 권장**
- 배터리 구동 센서 노드
- BLE 메쉬 네트워크
- 단순 데이터 수집

### 하이브리드 접근
1. **개발 단계**: Raspberry Pi 4로 알고리즘 개발
2. **테스트 단계**: ESP32로 포팅 및 최적화
3. **배포 단계**: ESP32 다수 + Raspberry Pi 게이트웨이

---

*작성일: 2026-01-31*
*버전: 1.0*
