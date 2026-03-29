# 모델 8: 파쇄 크기 예측 — Random Forest

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 파쇄 크기 예측 (Shred Size Prediction) |
| **알고리즘** | Random Forest (랜덤 포레스트) |
| **영역** | 품질관리 (Quality Control) |
| **입력** | CUR, SPD, VIB, SCL 등 12개 특징 |
| **출력** | 예상 파쇄 크기 (mm), 균일도 (%) |
| **추론 시간** | < 5ms |
| **실행 주기** | 매 1분 |
| **목표 정확도** | R² > 0.92 |

---

## 2. 알고리즘 설명

### 2.1 Random Forest란?

의사결정나무(Decision Tree) 수백 개를 독립적으로 만들어서 **다수결(평균)**로 예측하는 앙상블 기법입니다.

```
나무 1: "전류 높고 속도 느리면 → 큰 파쇄" → 75mm
나무 2: "진동 크고 무게 많으면 → 중간 파쇄" → 60mm
나무 3: "전류 보통이고 속도 빠르면 → 작은 파쇄" → 55mm
... (200개 나무)

최종 예측 = 200개 나무의 평균 = 63mm
```

### 2.2 왜 Random Forest인가?

| 장점 | 설명 |
|------|------|
| **안정적** | 개별 나무의 오류가 평균으로 상쇄 → 과적합에 강함 |
| **비선형 관계 포착** | 전류-크기, 속도-크기 등 복잡한 관계 학습 |
| **특징 중요도** | 어떤 변수가 파쇄 크기에 가장 영향을 주는지 파악 |
| **빠른 추론** | 의사결정나무 병렬 실행 → < 5ms |
| **이상치에 강건** | 센서 노이즈에 덜 민감 |

### 2.3 파쇄 크기 간접 측정 원리

슈레더에서 파쇄 크기를 직접 실시간 측정하기 어려우므로, **센서 데이터로 간접 추정**합니다:

```
물리적 관계:
  전류 ↑ → 부하 ↑ → 파쇄 대상이 크거나 단단함 → 파쇄 크기 ↑
  속도 ↑ → 칼날 회전 빠름 → 더 잘게 파쇄 → 크기 ↓
  진동 ↑ → 파쇄 충격 큼 → 불균일 파쇄 → 균일도 ↓
  투입량 ↑ → 과부하 → 완전 파쇄 어려움 → 크기 ↑
```

---

## 3. 데이터 요구사항

### 3.1 입력 센서 및 특징 (12개)

| # | 특징명 | 센서 | 단위 | 설명 |
|:-:|--------|------|------|------|
| 1 | cur_a_mean | CUR-A | A | 축A 전류 평균 (1분) |
| 2 | cur_b_mean | CUR-B | A | 축B 전류 평균 |
| 3 | cur_a_std | CUR-A | A | 전류 변동성 |
| 4 | spd_a_mean | SPD-A | RPM | 축A 속도 평균 |
| 5 | spd_b_mean | SPD-B | RPM | 축B 속도 평균 |
| 6 | spd_diff | SPD-A/B | RPM | 양축 속도차 (차동 운전 반영) |
| 7 | vib_a_rms | VIB-A | g | 축A 진동 RMS |
| 8 | vib_b_rms | VIB-B | g | 축B 진동 RMS |
| 9 | weight_rate | SCL-1 | kg/min | 투입 속도 (로드셀) |
| 10 | cum_weight | SCL-1 | kg | 배치 누적 투입량 |
| 11 | material_type | 수동 입력 | 범주 | 투입 재료 종류 (배터리/플라스틱/금속/혼합) |
| 12 | blade_wear_pct | 모델 2 출력 | % | 현재 칼날 마모율 (모델 연계) |

### 3.2 라벨 데이터 (정답)

| 항목 | 수집 방법 | 빈도 |
|------|----------|------|
| **파쇄 크기 (mm)** | 수동 샘플링 + 체분석 | 배치당 1회 |
| **균일도 (%)** | 체분석 결과의 CV | 배치당 1회 |

→ **최소 500 배치** 이상의 (센서 특징, 파쇄 크기) 쌍이 필요
→ 예상 수집 기간: **약 2개월**

---

## 4. 구현

### 4.1 데이터 전처리

```python
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

def extract_quality_features(cur_a, cur_b, spd_a, spd_b, vib_a, vib_b,
                              weight_rate, cum_weight, material_type,
                              blade_wear_pct, window_sec=60):
    """1분 윈도우 → 12개 품질 예측 특징"""
    features = {
        'cur_a_mean': np.mean(cur_a),
        'cur_b_mean': np.mean(cur_b),
        'cur_a_std': np.std(cur_a),
        'spd_a_mean': np.mean(spd_a),
        'spd_b_mean': np.mean(spd_b),
        'spd_diff': abs(np.mean(spd_a) - np.mean(spd_b)),
        'vib_a_rms': np.sqrt(np.mean(vib_a**2)),
        'vib_b_rms': np.sqrt(np.mean(vib_b**2)),
        'weight_rate': weight_rate,
        'cum_weight': cum_weight,
        'material_type': material_type,   # 범주형 → 인코딩 필요
        'blade_wear_pct': blade_wear_pct,
    }
    return features

# 범주형 인코딩
material_encoder = LabelEncoder()
material_encoder.fit(['battery', 'plastic', 'metal', 'mixed'])
```

### 4.2 모델 학습

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import TimeSeriesSplit, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib

# 데이터 로드
df = pd.read_csv('shredder_quality_data.csv')
df['material_encoded'] = material_encoder.transform(df['material_type'])

feature_columns = [
    'cur_a_mean', 'cur_b_mean', 'cur_a_std',
    'spd_a_mean', 'spd_b_mean', 'spd_diff',
    'vib_a_rms', 'vib_b_rms',
    'weight_rate', 'cum_weight',
    'material_encoded', 'blade_wear_pct'
]

X = df[feature_columns].values
y_size = df['shred_size_mm'].values
y_uniformity = df['uniformity_pct'].values

# === 파쇄 크기 예측 모델 ===
model_size = RandomForestRegressor(
    n_estimators=200,         # 나무 200개
    max_depth=15,             # 최대 깊이
    min_samples_split=10,     # 분할 최소 샘플
    min_samples_leaf=5,       # 리프 최소 샘플
    max_features='sqrt',      # 각 나무가 사용할 특징 수
    random_state=42,
    n_jobs=-1,                # 병렬 처리
)

# 시계열 교차검증
tscv = TimeSeriesSplit(n_splits=5)
cv_scores = cross_val_score(model_size, X, y_size, cv=tscv, scoring='r2')
print(f"CV R² scores: {cv_scores}")
print(f"Mean R²: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# 전체 학습
model_size.fit(X, y_size)

# === 균일도 예측 모델 ===
model_uniformity = RandomForestRegressor(
    n_estimators=200,
    max_depth=12,
    min_samples_split=10,
    min_samples_leaf=5,
    max_features='sqrt',
    random_state=42,
    n_jobs=-1,
)
model_uniformity.fit(X, y_uniformity)

# 평가
y_pred_size = model_size.predict(X_test)
print(f"파쇄 크기 R²: {r2_score(y_size_test, y_pred_size):.4f}")
print(f"파쇄 크기 MAE: {mean_absolute_error(y_size_test, y_pred_size):.1f} mm")

# 모델 저장
joblib.dump(model_size, 'shred_size_rf.joblib')
joblib.dump(model_uniformity, 'uniformity_rf.joblib')
```

### 4.3 하이퍼파라미터

| 파라미터 | 권장값 | 설명 |
|----------|--------|------|
| n_estimators | 200 | 나무 수 (많을수록 안정, 추론 시간↑) |
| max_depth | 15 | 트리 최대 깊이 (너무 깊으면 과적합) |
| min_samples_split | 10 | 분할 최소 샘플 (과적합 방지) |
| min_samples_leaf | 5 | 리프 최소 샘플 |
| max_features | 'sqrt' | 각 나무가 랜덤 선택하는 특징 수 (√12 ≈ 3~4개) |

### 4.4 특징 중요도 분석

```python
import matplotlib.pyplot as plt

importances = model_size.feature_importances_
indices = np.argsort(importances)[::-1]

print("파쇄 크기 예측 — 특징 중요도:")
for i, idx in enumerate(indices):
    print(f"  {i+1}. {feature_columns[idx]}: {importances[idx]:.4f}")

# 시각화
plt.barh(range(len(importances)), importances[indices])
plt.yticks(range(len(importances)), [feature_columns[i] for i in indices])
plt.xlabel('Feature Importance')
plt.title('Random Forest — Shred Size Prediction')
plt.tight_layout()
plt.savefig('feature_importance.png')
```

---

## 5. Edge 배포

```python
import joblib
import numpy as np

class ShredSizePredictor:
    """Edge용 파쇄 크기 예측"""

    def __init__(self):
        self.model_size = joblib.load('shred_size_rf.joblib')
        self.model_uniformity = joblib.load('uniformity_rf.joblib')
        self.material_map = {'battery': 0, 'plastic': 1, 'metal': 2, 'mixed': 3}

    def predict(self, features_dict):
        """
        매 1분 호출

        Args:
            features_dict: 12개 특징 딕셔너리

        Returns:
            dict: 예상 파쇄 크기 및 균일도
        """
        # 특징 벡터 구성
        x = np.array([[
            features_dict['cur_a_mean'],
            features_dict['cur_b_mean'],
            features_dict['cur_a_std'],
            features_dict['spd_a_mean'],
            features_dict['spd_b_mean'],
            features_dict['spd_diff'],
            features_dict['vib_a_rms'],
            features_dict['vib_b_rms'],
            features_dict['weight_rate'],
            features_dict['cum_weight'],
            self.material_map.get(features_dict['material_type'], 3),
            features_dict['blade_wear_pct'],
        ]])

        size_mm = self.model_size.predict(x)[0]
        uniformity = self.model_uniformity.predict(x)[0]

        # 품질 등급
        grade = self._grade_quality(size_mm, uniformity, features_dict.get('target_size', 50))

        return {
            'predicted_size_mm': round(size_mm, 1),
            'uniformity_pct': round(uniformity, 1),
            'grade': grade['label'],
            'action': grade['action'],
        }

    def _grade_quality(self, size_mm, uniformity, target_size):
        deviation = abs(size_mm - target_size) / target_size * 100

        if deviation <= 5 and uniformity >= 90:
            return {'label': '우수', 'action': '현재 조건 유지'}
        elif deviation <= 10 and uniformity >= 80:
            return {'label': '양호', 'action': '정상 운전'}
        elif deviation <= 20 and uniformity >= 70:
            return {'label': '보통', 'action': 'RPM 조정 권고 (모델 9 참조)'}
        else:
            return {'label': '불량', 'action': 'RPM + 투입속도 조정 필요'}
```

---

## 6. 모델 9(RPM 최적화)와 연계

```python
# 파쇄 크기 예측 → RPM 최적화 피드백 루프
predicted = size_predictor.predict(features)
if predicted['grade'] in ['보통', '불량']:
    # 모델 9에 최적 RPM 요청
    optimal_rpm = rpm_optimizer.recommend(
        current_size=predicted['predicted_size_mm'],
        target_size=target_size,
        material=material_type
    )
    print(f"권고 RPM: A={optimal_rpm['rpm_a']}, B={optimal_rpm['rpm_b']}")
```

---

## 7. 재학습 및 유지보수

| 항목 | 주기 | 비고 |
|------|------|------|
| 모델 재학습 | 매 500 배치 축적 시 | 새 데이터 추가 학습 |
| 기준선 업데이트 | 칼날 교체 후 | 새 칼날 상태에서 기준 재설정 |
| 특징 중요도 모니터링 | 월 1회 | 중요도 변화 → 센서 이상 의심 |
| 수동 샘플링 지속 | 배치당 1회 | 모델 성능 검증용 라벨 확보 |

### 주의사항
- 수동 체분석(라벨) 품질이 모델 성능을 결정 → 표준화된 샘플링 절차 필요
- 재료 종류가 변경되면 해당 재료 데이터 최소 50배치 확보 후 재학습
- 칼날 마모가 심할 때 예측 오차 증가 가능 → 모델 2(마모 예측)와 연계하여 보정
