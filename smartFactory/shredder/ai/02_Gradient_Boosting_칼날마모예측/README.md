# 모델 2: 칼날 마모 예측 — Gradient Boosting

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 칼날 마모 예측 (Blade Wear Prediction) |
| **알고리즘** | Gradient Boosting (XGBoost / LightGBM) |
| **영역** | 고장예지 (Predictive Maintenance) |
| **입력** | CUR-A/B + SPD-A/B + VIB-A/B → 24개 특징 추출 |
| **출력** | 마모율 (0~100%), 잔여수명 RUL (시간) |
| **추론 시간** | < 5ms |
| **실행 주기** | 매 10분 |
| **목표 정확도** | R² > 0.92, RUL 오차 ±15% |

---

## 2. 알고리즘 설명

### 2.1 Gradient Boosting이란?

약한 예측 모델(Decision Tree)을 순차적으로 쌓아, 이전 모델의 오차를 보정하면서 점점 정확한 모델을 만드는 앙상블 기법입니다.

```
1단계 모델: "전류가 높으면 마모 높음" → 오차 20%
    ↓ (오차를 학습)
2단계 모델: "진동이 크면 추가 마모" → 오차 12%
    ↓ (오차를 학습)
3단계 모델: "속도 변동도 반영" → 오차 7%
    ↓ ... 반복 (100~500 단계)
최종 모델: 오차 3% → 정확한 마모율 예측
```

### 2.2 XGBoost vs LightGBM 비교

| 항목 | XGBoost | LightGBM |
|------|---------|----------|
| 학습 속도 | 보통 | **빠름** (2~5배) |
| 메모리 | 많음 | **적음** |
| 소규모 데이터 | **우수** | 보통 (과적합 주의) |
| 추론 속도 | 빠름 | **더 빠름** |
| **권장** | 데이터 < 10만 행 | 데이터 > 10만 행 |

→ 슈레더의 경우 초기 데이터가 적으므로 **XGBoost 추천**, 데이터 충분 축적 후 LightGBM 전환 가능

### 2.3 왜 Gradient Boosting인가?

| 장점 | 설명 |
|------|------|
| **정형 데이터 최강** | 센서 특징값(숫자 테이블) 예측에서 딥러닝보다 우수 |
| **특징 중요도** | 어떤 센서가 마모 예측에 가장 중요한지 자동 파악 (SHAP) |
| **빠른 학습** | 수분~수십 분 내 학습 완료 |
| **적은 데이터** | 교체 3사이클(~1,500시간) 데이터면 충분 |
| **해석 가능** | 예측 근거를 설명 가능 |

---

## 3. 데이터 요구사항

### 3.1 입력 센서 (6종)
- **CUR-A/B**: CT 전류센서 (0~200A, 10ms 샘플링)
- **SPD-A/B**: 인코더 속도센서 (0~200 RPM, 100ms 샘플링)
- **VIB-A/B**: 3축 진동 가속도계 (0~50g, 1ms 샘플링)

### 3.2 학습 데이터

| 항목 | 요구량 | 비고 |
|------|--------|------|
| 최소 학습 데이터 | 칼날 교체 **3사이클** | 교체 시점에서 마모율=100% 라벨링 |
| 예상 수집 기간 | **약 3개월** | 교체 주기에 따라 달라짐 |
| 라벨링 방법 | 운전시간 기반 선형 보간 | 교체→교체 사이를 0%→100%로 매핑 |

### 3.3 24개 입력 특징 상세

```
[전류 기반 - 8개]
 1. CUR-A 평균 (10분)         9. CUR-B 평균 (10분)
 2. CUR-A 표준편차            10. CUR-B 표준편차
 3. CUR-A 최대값              11. CUR-B 최대값
 4. CUR-A RMS                 12. CUR-B RMS

[속도 기반 - 4개]
 5. SPD-A 평균                13. SPD-B 평균
 6. SPD-A 변동계수(CV)        14. SPD-B 변동계수(CV)

[진동 기반 - 8개]
 7. VIB-A RMS (전체)          15. VIB-B RMS (전체)
 8. VIB-A 고주파 에너지       16. VIB-B 고주파 에너지
    (2kHz~10kHz)                  (2kHz~10kHz)

[복합 특징 - 4개]
17. 전류/속도 비율 (A축)      → 단위 속도당 전류 = 절삭 저항 지표
18. 전류/속도 비율 (B축)
19. 진동 고주파/저주파 비율 (A축) → 마모 진행 시 고주파 증가
20. 진동 고주파/저주파 비율 (B축)

[운전 누적 - 4개]
21. 누적 운전시간 (현 칼날)
22. 누적 처리량 (톤)
23. 평균 부하율 (%)
24. 과부하 이벤트 횟수
```

---

## 4. 모델 구현

### 4.1 특징 추출 코드

```python
import numpy as np
import pandas as pd
from scipy.signal import welch

def extract_features(cur_a, cur_b, spd_a, spd_b, vib_a, vib_b,
                     window_minutes=10, fs_vib=10000):
    """10분 윈도우 데이터 → 24개 특징 추출"""
    features = {}

    # 전류 특징 (8개)
    for name, signal in [('CUR_A', cur_a), ('CUR_B', cur_b)]:
        features[f'{name}_mean'] = np.mean(signal)
        features[f'{name}_std'] = np.std(signal)
        features[f'{name}_max'] = np.max(signal)
        features[f'{name}_rms'] = np.sqrt(np.mean(signal**2))

    # 속도 특징 (4개)
    for name, signal in [('SPD_A', spd_a), ('SPD_B', spd_b)]:
        features[f'{name}_mean'] = np.mean(signal)
        features[f'{name}_cv'] = np.std(signal) / (np.mean(signal) + 1e-8)

    # 진동 특징 (8개)
    for name, signal in [('VIB_A', vib_a), ('VIB_B', vib_b)]:
        features[f'{name}_rms'] = np.sqrt(np.mean(signal**2))
        # 고주파 에너지 (2kHz~10kHz)
        freqs, psd = welch(signal, fs=fs_vib, nperseg=2048)
        hf_mask = (freqs >= 2000) & (freqs <= 10000)
        lf_mask = (freqs >= 10) & (freqs < 2000)
        hf_energy = np.sum(psd[hf_mask])
        lf_energy = np.sum(psd[lf_mask])
        features[f'{name}_hf_energy'] = hf_energy
        features[f'{name}_hf_lf_ratio'] = hf_energy / (lf_energy + 1e-8)

    # 복합 특징 (2개 - 전류/속도 비율)
    features['cur_spd_ratio_A'] = features['CUR_A_rms'] / (features['SPD_A_mean'] + 1e-8)
    features['cur_spd_ratio_B'] = features['CUR_B_rms'] / (features['SPD_B_mean'] + 1e-8)

    return features

def add_cumulative_features(df, blade_change_dates):
    """누적 운전 특징 추가 (4개)"""
    # 현재 칼날의 누적 운전시간
    df['cum_hours'] = ...        # 마지막 교체로부터 누적 시간
    df['cum_tonnage'] = ...      # 누적 처리량
    df['avg_load_pct'] = ...     # 평균 부하율
    df['overload_count'] = ...   # 과부하 이벤트 횟수
    return df
```

### 4.2 라벨링 (마모율 계산)

```python
def label_wear_rate(df, blade_change_dates):
    """
    칼날 교체 시점 사이를 0% → 100%로 선형 보간하여 마모율 라벨 생성
    """
    df['wear_rate'] = 0.0

    for i in range(len(blade_change_dates) - 1):
        start = blade_change_dates[i]
        end = blade_change_dates[i + 1]
        mask = (df['timestamp'] >= start) & (df['timestamp'] < end)
        total_hours = (end - start).total_seconds() / 3600

        # 각 시점의 마모율 = (경과시간 / 총시간) × 100
        elapsed = (df.loc[mask, 'timestamp'] - start).dt.total_seconds() / 3600
        df.loc[mask, 'wear_rate'] = (elapsed / total_hours) * 100

    return df
```

### 4.3 모델 학습

```python
import xgboost as xgb
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_squared_error, r2_score
import shap

# 데이터 준비
feature_columns = [f for f in df.columns if f not in ['timestamp', 'wear_rate', 'rul']]
X = df[feature_columns].values
y_wear = df['wear_rate'].values
y_rul = df['rul'].values  # 잔여수명 (시간)

# 시계열 교차검증
tscv = TimeSeriesSplit(n_splits=5)

# XGBoost 모델 (마모율 예측)
params_wear = {
    'objective': 'reg:squarederror',
    'max_depth': 6,
    'learning_rate': 0.05,
    'n_estimators': 500,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'reg_alpha': 0.1,      # L1 정규화
    'reg_lambda': 1.0,     # L2 정규화
    'min_child_weight': 5,
    'early_stopping_rounds': 20,
    'eval_metric': 'rmse',
}

model_wear = xgb.XGBRegressor(**params_wear)
model_wear.fit(
    X_train, y_wear_train,
    eval_set=[(X_val, y_wear_val)],
    verbose=50
)

# XGBoost 모델 (RUL 예측)
params_rul = params_wear.copy()
model_rul = xgb.XGBRegressor(**params_rul)
model_rul.fit(
    X_train, y_rul_train,
    eval_set=[(X_val, y_rul_val)],
    verbose=50
)

# 평가
y_pred_wear = model_wear.predict(X_test)
print(f"마모율 R²: {r2_score(y_wear_test, y_pred_wear):.4f}")
print(f"마모율 RMSE: {mean_squared_error(y_wear_test, y_pred_wear, squared=False):.2f}%")

y_pred_rul = model_rul.predict(X_test)
print(f"RUL R²: {r2_score(y_rul_test, y_pred_rul):.4f}")

# SHAP 분석 — 특징 중요도 해석
explainer = shap.TreeExplainer(model_wear)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values, X_test, feature_names=feature_columns)
```

### 4.4 하이퍼파라미터

| 파라미터 | XGBoost 권장값 | 설명 |
|----------|---------------|------|
| max_depth | 6 | 트리 최대 깊이 (과적합 방지) |
| learning_rate | 0.05 | 학습률 (낮을수록 안정) |
| n_estimators | 500 | 트리 개수 (early stopping으로 조절) |
| subsample | 0.8 | 각 트리에 사용할 데이터 비율 |
| colsample_bytree | 0.8 | 각 트리에 사용할 특징 비율 |
| reg_alpha (L1) | 0.1 | L1 정규화 |
| reg_lambda (L2) | 1.0 | L2 정규화 |
| min_child_weight | 5 | 리프 노드 최소 가중치 |

---

## 5. Edge 배포

```python
# XGBoost → ONNX 변환
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import onnxmltools

# XGBoost 모델을 ONNX로 변환
onnx_model = onnxmltools.convert_xgboost(
    model_wear,
    initial_types=[('input', FloatTensorType([None, 24]))]
)
onnxmltools.utils.save_model(onnx_model, 'blade_wear_xgb.onnx')

# Edge 추론
import onnxruntime as ort

class BladeWearPredictor:
    def __init__(self):
        self.session_wear = ort.InferenceSession('blade_wear_xgb.onnx')
        self.session_rul = ort.InferenceSession('blade_rul_xgb.onnx')

    def predict(self, features_24):
        """
        features_24: numpy array (24,)
        returns: (wear_rate_pct, rul_hours)
        """
        input_data = features_24.astype(np.float32).reshape(1, -1)
        wear = self.session_wear.run(None, {'input': input_data})[0][0]
        rul = self.session_rul.run(None, {'input': input_data})[0][0]
        return float(wear), float(max(0, rul))
```

---

## 6. 운영 로직

### 6.1 마모 등급 판정

```python
def classify_wear(wear_rate, rul_hours):
    if wear_rate < 50:
        return "양호", "green", "정상 운전"
    elif wear_rate < 70:
        return "주의", "yellow", "교체 계획 수립 권고"
    elif wear_rate < 85:
        return "경고", "orange", f"잔여 {rul_hours:.0f}시간 — 교체 자재 준비"
    else:
        return "위험", "red", f"잔여 {rul_hours:.0f}시간 — 즉시 교체 필요"
```

### 6.2 재학습 기준
- **정기**: 칼날 교체 1사이클 완료 시마다 데이터 추가 후 재학습
- **비정기**: R² < 0.88 또는 RUL 오차 > ±20% 지속 시
- **신규 재료**: 파쇄 대상 재료 변경 시 재학습 필요

### 6.3 SHAP 해석 활용
- 마모 예측에 가장 큰 영향을 미치는 특징을 대시보드에 표시
- "전류 증가가 마모 예측의 45%를 차지" 등 운전자에게 직관적 설명 제공
- 특징 중요도 변화 추이로 센서 이상 여부도 간접 감지 가능
