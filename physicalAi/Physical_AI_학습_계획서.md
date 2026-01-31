# Physical AI 예지정비 학습 계획서

## 1. 프로젝트 개요

### 1.1 목표
Raspberry Pi 4와 I2C 센서들을 활용하여 Physical AI의 핵심 개념인 **예지정비(Predictive Maintenance)**를 실습하고, AI/ML 파이프라인의 전체 흐름을 이해한다.

### 1.2 학습 목표
- 센서 데이터 수집 및 전처리 이해
- 시계열 데이터 분석 기법 습득
- 이상 탐지(Anomaly Detection) 알고리즘 학습
- 예측 모델 구축 및 평가 방법 이해
- Edge AI 구현 경험

### 1.3 하드웨어 구성

| 센서 | I2C 주소 | 측정 항목 | 예지정비 활용 |
|------|----------|-----------|---------------|
| AHT20 | 0x38 | 온도, 습도 | 환경 이상 감지 |
| BMP280 | 0x76/0x77 | 기압, 온도 | 환경 변화 예측 |
| MPU6050 | 0x68 | 가속도, 자이로 | 진동 이상 감지, 고장 예측 |

```
Raspberry Pi 4 (40-pin GPIO)
├── I2C1 (GPIO 2, 3)
│   ├── AHT20 (0x38) ─── 온도/습도
│   ├── BMP280 (0x76) ─── 기압/온도
│   └── MPU6050 (0x68) ─── 6축 가속도/자이로
└── Power (3.3V, GND)
```

---

## 2. AI 파이프라인 전체 흐름

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Physical AI 예지정비 파이프라인                    │
└─────────────────────────────────────────────────────────────────────┘

[1. 데이터 수집]     [2. 전처리]      [3. 특성 추출]    [4. 모델 학습]
     │                   │                 │                 │
     ▼                   ▼                 ▼                 ▼
┌─────────┐       ┌───────────┐     ┌───────────┐     ┌───────────┐
│ Sensors │──────▶│ Cleaning  │────▶│ Feature   │────▶│ Training  │
│ AHT20   │       │ Filtering │     │ Engineering│    │ ML Model  │
│ BMP280  │       │ Normalizing│    │ Statistics │    │ Validation│
│ MPU6050 │       └───────────┘     └───────────┘     └───────────┘
└─────────┘              │                 │                 │
                         ▼                 ▼                 ▼
                  ┌───────────┐     ┌───────────┐     ┌───────────┐
[5. 추론/예측]    │ Real-time │     │ Anomaly   │     │ Predictive│
     │            │ Inference │◀────│ Detection │◀────│ Model     │
     ▼            └───────────┘     └───────────┘     └───────────┘
┌─────────┐              │
│ Alert   │◀─────────────┘
│ Action  │
└─────────┘
```

---

## 3. 단계별 학습 계획

### Phase 1: 환경 구축 및 데이터 수집

#### 3.1 Step 1: 하드웨어 연결 및 I2C 설정
**목표**: Raspberry Pi와 센서 간 통신 확인

**의미**:
- Physical AI의 시작점은 물리적 세계의 데이터를 디지털로 변환하는 것
- I2C 프로토콜 이해 (마스터-슬레이브, 주소 체계)

**실습 내용**:
```bash
# I2C 활성화 확인
sudo raspi-config  # Interface Options > I2C > Enable

# I2C 장치 스캔
sudo i2cdetect -y 1
# 예상 출력: 0x38(AHT20), 0x68(MPU6050), 0x76(BMP280)
```

**필요 라이브러리**:
```bash
pip install smbus2 adafruit-circuitpython-ahtx0 adafruit-circuitpython-bmp280 mpu6050-raspberrypi
```

---

#### 3.2 Step 2: 센서 데이터 수집 프로그램 작성
**목표**: 실시간 센서 데이터 수집 및 저장

**의미**:
- 데이터는 AI의 원료 - 품질 좋은 데이터가 좋은 모델을 만듦
- 샘플링 레이트의 중요성 이해 (Nyquist 정리)
- 데이터 저장 형식 결정 (CSV, SQLite, InfluxDB)

**수집 데이터 구조**:
```python
{
    "timestamp": "2024-01-31T12:00:00.000",
    "aht20": {
        "temperature": 25.3,  # 섭씨
        "humidity": 45.2      # %RH
    },
    "bmp280": {
        "temperature": 25.1,  # 섭씨
        "pressure": 1013.25   # hPa
    },
    "mpu6050": {
        "accel_x": 0.02,      # g
        "accel_y": -0.01,     # g
        "accel_z": 1.01,      # g
        "gyro_x": 0.5,        # deg/s
        "gyro_y": -0.3,       # deg/s
        "gyro_z": 0.1         # deg/s
    }
}
```

---

### Phase 2: 데이터 전처리 및 탐색

#### 3.3 Step 3: 데이터 정제 (Data Cleaning)
**목표**: 노이즈 제거 및 결측치 처리

**의미**:
- 실제 센서 데이터는 완벽하지 않음 (노이즈, 이상치, 결측)
- 쓰레기 입력 = 쓰레기 출력 (Garbage In, Garbage Out)
- 전처리가 전체 성능의 80%를 결정

**주요 기법**:
| 문제 | 해결 방법 | 적용 예 |
|------|-----------|---------|
| 결측치 | 보간법(Interpolation) | 센서 일시 단절 |
| 노이즈 | 이동평균, 칼만필터 | MPU6050 진동 데이터 |
| 이상치 | IQR, Z-score | 센서 오작동 |
| 스케일 | Min-Max, StandardScaler | 다른 단위 통합 |

---

#### 3.4 Step 4: 탐색적 데이터 분석 (EDA)
**목표**: 데이터 패턴 및 특성 파악

**의미**:
- 데이터를 이해해야 적절한 모델 선택 가능
- 시각화를 통한 인사이트 도출
- 가설 수립의 기초

**분석 항목**:
```python
# 기본 통계
- 평균, 표준편차, 최소/최대
- 분포 확인 (정규분포 여부)

# 시계열 분석
- 추세(Trend) 확인
- 계절성(Seasonality) 확인
- 자기상관(Autocorrelation) 분석

# 상관관계
- 센서 간 상관계수
- 온도↔습도, 기압↔고도 관계
```

---

### Phase 3: 특성 공학 (Feature Engineering)

#### 3.5 Step 5: 특성 추출
**목표**: 원시 데이터에서 의미 있는 특성 생성

**의미**:
- 도메인 지식을 데이터에 반영
- 모델이 학습하기 쉬운 형태로 변환
- 예지정비에서 가장 중요한 단계

**진동 데이터(MPU6050) 특성**:
```python
# 시간 영역 특성
- RMS (Root Mean Square): 진동 강도
- Peak-to-Peak: 최대 진폭
- Crest Factor: 충격 지표
- Kurtosis: 이상 진동 민감도

# 주파수 영역 특성 (FFT)
- 주파수 스펙트럼
- 지배 주파수
- 에너지 분포
```

**환경 데이터(AHT20, BMP280) 특성**:
```python
# 변화율
- 온도 변화율 (dT/dt)
- 습도 변화율 (dH/dt)

# 통계적 특성 (윈도우 기반)
- 이동 평균
- 이동 표준편차
- 엔트로피
```

---

### Phase 4: 머신러닝 모델 구축

#### 3.6 Step 6: 이상 탐지 모델 (Anomaly Detection)
**목표**: 정상 패턴에서 벗어나는 이상 상태 감지

**의미**:
- 레이블이 없는 데이터에서 학습 (비지도 학습)
- 정상 상태 학습 후 이상 판별
- 고장 발생 전 조기 경고

**알고리즘 비교**:
| 알고리즘 | 장점 | 단점 | 적용 |
|----------|------|------|------|
| Isolation Forest | 빠름, 해석 용이 | 고차원 약함 | 환경 이상 |
| One-Class SVM | 복잡한 경계 | 느림 | 진동 이상 |
| Autoencoder | 복잡한 패턴 | 학습 어려움 | 복합 이상 |
| LSTM-AE | 시계열 특화 | 많은 데이터 필요 | 시간적 이상 |

---

#### 3.7 Step 7: 예측 모델 (Predictive Model)
**목표**: 미래 상태 예측 및 잔여 수명(RUL) 추정

**의미**:
- 과거 패턴으로 미래 예측
- 고장 시점 예측으로 사전 대응
- 예지정비의 핵심 가치

**모델 옵션**:
```python
# 전통적 시계열
- ARIMA: 선형 시계열
- Prophet: 추세 + 계절성

# 머신러닝
- Random Forest: 특성 기반 분류
- XGBoost: 높은 성능

# 딥러닝
- LSTM: 장기 의존성 학습
- Transformer: 최신 시계열 모델
```

---

### Phase 5: 모델 평가 및 배포

#### 3.8 Step 8: 모델 평가
**목표**: 모델 성능 검증 및 개선

**의미**:
- 실제 환경에서 모델이 동작하는지 확인
- 과적합/과소적합 진단
- 비즈니스 요구사항 충족 여부

**평가 지표**:
```python
# 이상 탐지
- Precision: 정밀도 (오탐 최소화)
- Recall: 재현율 (미탐 최소화)
- F1-Score: 균형 지표
- AUC-ROC: 전체 성능

# 예측
- MAE: 평균 절대 오차
- RMSE: 평균 제곱근 오차
- MAPE: 평균 절대 백분율 오차
```

---

#### 3.9 Step 9: Edge 배포 및 실시간 추론
**목표**: Raspberry Pi에서 실시간 예측 수행

**의미**:
- Edge AI: 데이터 발생 지점에서 처리
- 낮은 지연시간, 프라이버시 보장
- 클라우드 의존도 감소

**배포 옵션**:
```python
# 경량화
- TensorFlow Lite
- ONNX Runtime
- scikit-learn joblib

# 최적화
- 양자화(Quantization)
- 프루닝(Pruning)
```

---

## 4. 실습 시나리오

### 시나리오 1: 모터 진동 이상 감지
```
[정상 상태]
- MPU6050 진동 패턴 수집 (1시간)
- 정상 범위 학습

[이상 시뮬레이션]
- 모터에 불균형 무게 부착
- 진동 패턴 변화 감지

[결과]
- 이상 탐지 알람 발생
- 잔여 수명 예측
```

### 시나리오 2: 환경 이상 예측
```
[데이터 수집]
- 온도, 습도, 기압 연속 측정

[패턴 학습]
- 일간/주간 패턴 학습
- 정상 범위 설정

[예측]
- 급격한 온도 상승 예측
- 냉각 시스템 사전 가동
```

---

## 5. 폴더 구조

```
physicalAi/
├── Physical_AI_학습_계획서.md     # 본 문서
├── 01_setup/                       # 환경 설정
│   ├── install.sh                  # 패키지 설치
│   └── i2c_test.py                 # I2C 연결 테스트
├── 02_data_collection/             # 데이터 수집
│   ├── sensor_reader.py            # 센서 읽기
│   └── data_logger.py              # 데이터 저장
├── 03_preprocessing/               # 전처리
│   ├── cleaning.py                 # 데이터 정제
│   └── eda.ipynb                   # 탐색적 분석
├── 04_feature_engineering/         # 특성 공학
│   ├── time_features.py            # 시간 영역 특성
│   └── freq_features.py            # 주파수 영역 특성
├── 05_modeling/                    # 모델링
│   ├── anomaly_detection.py        # 이상 탐지
│   └── prediction.py               # 예측 모델
├── 06_deployment/                  # 배포
│   ├── realtime_inference.py       # 실시간 추론
│   └── alert_system.py             # 알림 시스템
└── data/                           # 데이터 저장
    ├── raw/                        # 원본 데이터
    └── processed/                  # 처리된 데이터
```

---

## 6. 기대 효과

### 학습 성과
1. **AI 파이프라인 전체 이해**: 데이터 수집부터 배포까지
2. **실무 역량 강화**: 실제 센서와 하드웨어 경험
3. **예지정비 개념 습득**: Industry 4.0 핵심 기술
4. **Edge AI 경험**: IoT + AI 융합

### 확장 가능성
- 공장 설비 모니터링 시스템
- 스마트팜 환경 관리
- 드론/로봇 상태 감시
- 건물 에너지 관리

---

## 7. 참고 자료

### 라이브러리
- **센서**: adafruit-circuitpython, smbus2
- **데이터 처리**: pandas, numpy, scipy
- **시각화**: matplotlib, seaborn, plotly
- **ML/DL**: scikit-learn, tensorflow, pytorch

### 학습 리소스
- Predictive Maintenance using Machine Learning (AWS)
- TinyML (TensorFlow)
- Edge Impulse (Edge AI 플랫폼)

---

*작성일: 2026-01-31*
*버전: 1.0*
