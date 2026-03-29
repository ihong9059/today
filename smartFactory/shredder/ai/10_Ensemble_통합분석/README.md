# 모델 10: 설비-품질-안전 통합 분석 — Ensemble

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 설비-품질-안전 통합 분석 (Integrated Health Analysis) |
| **알고리즘** | Ensemble (Random Forest + LSTM + XGBoost 결합) |
| **영역** | 연계분석 (Cross-domain Analysis) |
| **입력** | 모든 센서 데이터 + 모델 1~9의 출력값 |
| **출력** | 통합 건강 점수 (0~100), 상관관계 맵 |
| **추론 시간** | < 500ms |
| **실행 주기** | 매 5분 |

---

## 2. 알고리즘 설명

### 2.1 왜 통합 분석이 필요한가?

개별 모델은 자기 영역만 봅니다. 하지만 실제로는 영역 간 **상호 영향**이 있습니다:

```
칼날 마모↑ → 전류↑ → 모터 과열 → 발화 위험↑
         → 파쇄 크기↑ → 품질 저하
         → 진동↑ → 베어링 손상 가속

→ 칼날 마모(고장예지)가 안전과 품질에 동시에 영향
→ 개별 모델만으로는 이 연쇄 관계를 파악할 수 없음
```

### 2.2 Ensemble 구조

```
모델 1~4 (고장예지)  → 설비 건강 점수 (가중치 40%)
모델 5~7 (사고예방)  → 안전 상태 점수 (가중치 35%)
모델 8~9 (품질관리)  → 품질 상태 점수 (가중치 25%)
         ↓                    ↓                    ↓
    ┌─────────────────────────────────────────────────┐
    │          Ensemble 통합 분석 (모델 10)             │
    │                                                   │
    │  Random Forest: 정적 상관관계 (특징 간 관계)       │
    │  LSTM: 시간적 패턴 (A 발생 후 B 발생 경향)        │
    │  XGBoost: 비선형 복합 효과 (교호작용)              │
    │                                                   │
    │  → 가중 평균 (RF:0.3 + LSTM:0.4 + XGB:0.3)       │
    └─────────────────────────────────────────────────┘
         ↓
    통합 건강 점수 (0~100) + 상관관계 맵 + 권고 사항
```

### 2.3 3개 모델의 역할

| 모델 | 역할 | 포착하는 패턴 |
|------|------|-------------|
| **Random Forest** | 현재 상태의 정적 관계 | "마모 80% + 진동 높음 = 위험" |
| **LSTM** | 시간에 따른 동적 패턴 | "전류가 3일간 서서히 올랐다 = 악화 추세" |
| **XGBoost** | 복합 교호작용 | "마모+고온+과부하 동시 = 개별 합보다 위험" |

---

## 3. 데이터 요구사항

### 3.1 입력 데이터 (5분 윈도우 집계)

```
[모델 출력 — 9개]
 1. bearing_anomaly_score    (모델 1: 베어링 이상 점수, 0~1)
 2. blade_wear_pct           (모델 2: 칼날 마모율, 0~100%)
 3. imbalance_level          (모델 3: 불균형 레벨, mm/s)
 4. jamming_probability      (모델 4: 끼임 확률, 0~1)
 5. fire_probability         (모델 5: 발화 확률, 0~1)
 6. dust_risk                (모델 6: 분진 위험도, 0~1)
 7. leak_probability         (모델 7: 누출 확률, 0~1)
 8. predicted_size_mm        (모델 8: 예측 파쇄 크기)
 9. quality_grade            (모델 8: 품질 등급, 0~3)

[센서 집계 — 12개]
10. cur_a_mean               (전류 평균)
11. cur_b_mean
12. spd_a_mean               (속도 평균)
13. vib_total_rms            (진동 종합 RMS)
14. temp_max                 (최고 온도)
15. dust_mean                (분진 평균)
16. weight_rate_mean         (투입량 평균)
17. cur_trend_5min           (전류 5분 추세 기울기)
18. vib_trend_5min           (진동 5분 추세 기울기)
19. temp_trend_5min          (온도 5분 추세 기울기)
20. operating_hours_today    (금일 가동 시간)
21. cum_blade_hours          (현재 칼날 누적 시간)
```

### 3.2 라벨 데이터

통합 건강 점수는 **반지도 학습**으로 생성:
- 초기: 가중 합산 룰로 점수 생성
- 운영 중: 실제 고장/사고/품질 이벤트 발생 시 라벨 보정
- 6개월 이상 운영 데이터 축적 후 정밀 학습

---

## 4. 구현

### 4.1 통합 건강 점수 계산

```python
import numpy as np
import torch
import torch.nn as nn
import xgboost as xgb
from sklearn.ensemble import RandomForestRegressor
import joblib

class IntegratedHealthAnalyzer:
    """설비-품질-안전 통합 분석"""

    def __init__(self):
        # 3개 서브 모델
        self.rf_model = joblib.load('integrated_rf.joblib')
        self.lstm_model = self._load_lstm('integrated_lstm.pth')
        self.xgb_model = joblib.load('integrated_xgb.joblib')

        # 앙상블 가중치
        self.weights = {'rf': 0.3, 'lstm': 0.4, 'xgb': 0.3}

        # 5분 윈도우 이력 (LSTM용, 최근 2시간 = 24 포인트)
        self.history = []
        self.history_max = 24

        # 영역별 가중치
        self.domain_weights = {
            'maintenance': 0.40,   # 고장예지
            'safety': 0.35,        # 사고예방
            'quality': 0.25,       # 품질관리
        }

    def analyze(self, model_outputs, sensor_summary):
        """
        매 5분 호출

        Args:
            model_outputs: 모델 1~9 출력 딕셔너리
            sensor_summary: 5분 센서 집계 딕셔너리

        Returns:
            dict: 통합 분석 결과
        """
        # 특징 벡터 구성 (21개)
        features = self._build_features(model_outputs, sensor_summary)
        self.history.append(features)
        if len(self.history) > self.history_max:
            self.history = self.history[-self.history_max:]

        # === Sub-model 1: Random Forest (정적 관계) ===
        rf_score = self.rf_model.predict(features.reshape(1, -1))[0]

        # === Sub-model 2: LSTM (시간적 패턴) ===
        if len(self.history) >= 6:  # 최소 30분 이력
            lstm_input = np.array(self.history[-12:])  # 최근 1시간
            lstm_score = self._lstm_predict(lstm_input)
        else:
            lstm_score = rf_score  # 이력 부족 시 RF로 대체

        # === Sub-model 3: XGBoost (비선형 교호작용) ===
        xgb_score = self.xgb_model.predict(features.reshape(1, -1))[0]

        # === 앙상블 가중 평균 ===
        health_score = (
            self.weights['rf'] * rf_score +
            self.weights['lstm'] * lstm_score +
            self.weights['xgb'] * xgb_score
        )
        health_score = max(0, min(100, health_score))

        # === 영역별 점수 ===
        domain_scores = self._compute_domain_scores(model_outputs)

        # === 상관관계 분석 ===
        correlations = self._analyze_correlations(model_outputs)

        # === 종합 판정 ===
        level, action = self._classify_health(health_score, domain_scores)

        return {
            'health_score': round(health_score, 1),
            'level': level,
            'action': action,
            'domain_scores': domain_scores,
            'correlations': correlations,
            'sub_scores': {
                'rf': round(rf_score, 1),
                'lstm': round(lstm_score, 1),
                'xgb': round(xgb_score, 1),
            },
            'trend': self._compute_trend(),
        }

    def _compute_domain_scores(self, outputs):
        """영역별 점수 (0~100, 높을수록 양호)"""
        # 고장예지 (모델 1~4)
        maint = 100 - (
            outputs['bearing_anomaly_score'] * 30 +
            outputs['blade_wear_pct'] * 0.3 +
            outputs['imbalance_level'] * 3 +
            outputs['jamming_probability'] * 20
        )

        # 사고예방 (모델 5~7)
        safety = 100 - (
            outputs['fire_probability'] * 40 +
            outputs['dust_risk'] * 35 +
            outputs['leak_probability'] * 25
        )

        # 품질관리 (모델 8~9)
        quality = 100 - (
            outputs['quality_grade'] * 20 +   # 0=우수, 3=불량
            abs(outputs['predicted_size_mm'] - outputs.get('target_size', 50)) * 0.5
        )

        return {
            'maintenance': round(max(0, min(100, maint)), 1),
            'safety': round(max(0, min(100, safety)), 1),
            'quality': round(max(0, min(100, quality)), 1),
        }

    def _analyze_correlations(self, outputs):
        """영역 간 상관관계 분석"""
        correlations = []

        # 칼날 마모 → 품질 영향
        if outputs['blade_wear_pct'] > 70:
            correlations.append({
                'from': '칼날 마모 (고장예지)',
                'to': '파쇄 크기 증가 (품질)',
                'strength': 'strong',
                'detail': f"마모율 {outputs['blade_wear_pct']:.0f}% → 파쇄 크기 증가 예상",
            })

        # 칼날 마모 → 안전 영향
        if outputs['blade_wear_pct'] > 80 and outputs['fire_probability'] > 0.3:
            correlations.append({
                'from': '칼날 마모 (고장예지)',
                'to': '과열/발화 위험 (안전)',
                'strength': 'strong',
                'detail': "마모로 인한 과부하 → 모터 과열 → 발화 위험 연계",
            })

        # 베어링 이상 → 진동 → 품질
        if outputs['bearing_anomaly_score'] > 0.6:
            correlations.append({
                'from': '베어링 이상 (고장예지)',
                'to': '파쇄 균일도 저하 (품질)',
                'strength': 'moderate',
                'detail': "베어링 이상 → 축 진동 증가 → 파쇄 불균일",
            })

        # 분진 → 발화 연계
        if outputs['dust_risk'] > 0.5 and outputs['fire_probability'] > 0.3:
            correlations.append({
                'from': '분진 농도 (안전)',
                'to': '발화 위험 (안전)',
                'strength': 'critical',
                'detail': "분진 + 열원 = 분진 폭발 위험! 즉시 환기 + 투입 중지",
            })

        return correlations

    def _classify_health(self, score, domain_scores):
        """종합 등급 판정"""
        # 개별 영역이 심각하면 전체도 심각
        min_domain = min(domain_scores.values())

        if score >= 80 and min_domain >= 60:
            return "양호", "정상 운전 — 모니터링 유지"
        elif score >= 60 and min_domain >= 40:
            return "주의", "점검 계획 수립 권고"
        elif score >= 40 and min_domain >= 20:
            return "경고", "조기 정비 필요 — 운전 조건 완화"
        else:
            return "위험", "즉시 정비 또는 운전 중지 검토"

    def _compute_trend(self):
        """건강 점수 추세 (최근 1시간)"""
        if len(self.history) < 6:
            return "데이터 부족"

        recent = [h[0] for h in self.history[-12:]]  # bearing_anomaly가 첫 번째
        from scipy.stats import linregress
        slope, _, _, _, _ = linregress(range(len(recent)), recent)

        if slope > 0.01:
            return "악화 추세"
        elif slope < -0.01:
            return "개선 추세"
        return "안정"

    def _build_features(self, model_outputs, sensor_summary):
        """21개 특징 벡터 구성"""
        return np.array([
            model_outputs['bearing_anomaly_score'],
            model_outputs['blade_wear_pct'],
            model_outputs['imbalance_level'],
            model_outputs['jamming_probability'],
            model_outputs['fire_probability'],
            model_outputs['dust_risk'],
            model_outputs['leak_probability'],
            model_outputs['predicted_size_mm'],
            model_outputs['quality_grade'],
            sensor_summary['cur_a_mean'],
            sensor_summary['cur_b_mean'],
            sensor_summary['spd_a_mean'],
            sensor_summary['vib_total_rms'],
            sensor_summary['temp_max'],
            sensor_summary['dust_mean'],
            sensor_summary['weight_rate_mean'],
            sensor_summary['cur_trend_5min'],
            sensor_summary['vib_trend_5min'],
            sensor_summary['temp_trend_5min'],
            sensor_summary['operating_hours_today'],
            sensor_summary['cum_blade_hours'],
        ])

    def _load_lstm(self, path):
        model = IntegratedLSTM(input_dim=21, hidden_dim=64, output_dim=1)
        model.load_state_dict(torch.load(path, map_location='cpu'))
        model.eval()
        return model

    def _lstm_predict(self, sequence):
        with torch.no_grad():
            x = torch.FloatTensor(sequence).unsqueeze(0)
            score = self.lstm_model(x).item()
        return max(0, min(100, score))


class IntegratedLSTM(nn.Module):
    """통합 분석용 LSTM"""

    def __init__(self, input_dim=21, hidden_dim=64, output_dim=1):
        super().__init__()
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers=2,
                           batch_first=True, dropout=0.2)
        self.fc = nn.Sequential(
            nn.Linear(hidden_dim, 32),
            nn.ReLU(),
            nn.Linear(32, output_dim),
        )

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        return self.fc(lstm_out[:, -1, :])
```

---

## 5. 대시보드 출력 예시

```
╔══════════════════════════════════════════════════════╗
║          통합 건강 점수: 72.3 / 100  [주의]          ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  영역별 점수:                                         ║
║  ■■■■■■■■□□ 고장예지: 78.5  (주의)                   ║
║  ■■■■■■■□□□ 사고예방: 68.2  (경고 — 분진 상승)      ║
║  ■■■■■■■□□□ 품질관리: 71.0  (보통)                   ║
║                                                      ║
║  주요 상관관계:                                       ║
║  ⚠ 칼날 마모(82%) → 파쇄 크기 증가(+8mm)            ║
║  ⚠ 분진 농도 상승 → 환기 강화 필요                   ║
║                                                      ║
║  추세: 서서히 악화 ↓                                  ║
║  권고: 칼날 교체 계획 수립 + 환기 점검                ║
╚══════════════════════════════════════════════════════╝
```

---

## 6. 학습 및 운영

### 6.1 초기 (데이터 부족 시)

데이터가 부족한 초기에는 **룰 기반 가중 합산**으로 운영:

```python
def rule_based_health_score(domain_scores, weights):
    """초기 룰 기반 통합 점수"""
    return sum(domain_scores[k] * weights[k] for k in weights)
```

### 6.2 데이터 축적 후 (6개월~)

실제 고장/사고/품질 이벤트 데이터가 축적되면:
1. 이벤트 발생 전 24시간 데이터를 라벨링 (건강 점수 낮음)
2. 정상 운전 구간을 라벨링 (건강 점수 높음)
3. RF + LSTM + XGBoost 학습
4. 가중치 최적화 (검증 세트 성능 기준)

### 6.3 재학습 주기
- **정기**: 3개월마다 (이벤트 데이터 축적)
- **비정기**: 대규모 이벤트 발생 후 즉시 라벨 추가 + 재학습
- **앙상블 가중치**: 검증 세트 성능 기준으로 자동 조정

---

## 7. 주의사항

- 초기에는 룰 기반과 앙상블 **병행 운영** → 결과 비교하면서 모델 신뢰도 검증
- 상관관계 분석은 인과관계가 아닌 **동시 발생 패턴** → 운전자 판단 보조 용도
- 개별 모델(1~9)이 정확해야 통합 분석도 의미 있음 → 개별 모델 우선 안정화
- 통합 건강 점수가 낮아도 즉시 정지가 아니라 **정비 우선순위 결정** 지표로 활용
- 영역별 점수 중 하나라도 위험이면 전체도 위험으로 판정 (약점 기반 판정)
