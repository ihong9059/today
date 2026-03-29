# 모델 6: 분진 폭발 예측 — CUSUM + 트렌드 예측

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 분진 폭발 예측 (Dust Explosion Prediction) |
| **알고리즘** | CUSUM (누적합 관리도) + 트렌드 예측 |
| **영역** | 사고예방 (Accident Prevention) |
| **입력** | DST-1 (레이저 분진 센서) 시계열 데이터 |
| **출력** | 폭발 위험도 (0~1), 예상 위험 도달 시간 |
| **추론 시간** | < 500ms |
| **실행 주기** | 매 1초 |

---

## 2. 알고리즘 설명

### 2.1 분진 폭발의 5가지 조건 (폭발 오각형)

분진 폭발은 다음 5가지가 **동시에** 충족될 때 발생합니다:

```
     연료 (가연성 분진)
      / \
     /   \
  산소 ── 점화원
    |       |
  밀폐 ── 분산 (공기 중 부유)
```

- **분진 농도**: LEL(하한폭발한계) ~ UEL(상한폭발한계) 범위
- 배터리 분쇄 시: 리튬/흑연 분진이 특히 위험 (LEL ~40g/m³)

### 2.2 CUSUM이란?

**CUSUM (Cumulative Sum)**: 평균으로부터의 편차를 누적하여 미세한 추세 변화를 감지하는 통계적 공정 관리 기법입니다.

```
일반 비교: "현재 농도 < 한계치" → OK (한계 근방의 점진 상승을 놓침)

CUSUM: 매 측정마다 기준값과의 차이를 누적
  S(n) = max(0, S(n-1) + (X(n) - μ₀ - k))

  → 누적합이 임계값(h) 초과 시 경보
  → 서서히 올라가는 위험도 조기 감지 가능
```

### 2.3 왜 CUSUM인가?

| 장점 | 설명 |
|------|------|
| **미세 변화 감지** | 급격한 변화뿐만 아니라 서서히 올라가는 추세도 조기 감지 |
| **통계적 근거** | 오경보율을 수학적으로 제어 가능 (ARL₀ 조정) |
| **실시간 적합** | 계산 복잡도 O(1) — 매 측정마다 덧셈 1회 |
| **학습 불필요** | 정상 평균과 표준편차만 있으면 즉시 적용 |

---

## 3. 구현

### 3.1 CUSUM 분진 모니터링

```python
import numpy as np
from collections import deque

class DustExplosionPredictor:
    """분진 폭발 위험도 실시간 예측"""

    def __init__(self, baseline_mean=None, baseline_std=None):
        # 분진 농도 기준값 (14일 학습 후 설정)
        self.mu_0 = baseline_mean or 5.0     # 정상 평균 (mg/m³)
        self.sigma = baseline_std or 2.0      # 정상 표준편차

        # CUSUM 파라미터
        self.k = 0.5 * self.sigma   # 허용 편이 (slack value)
        self.h = 5.0 * self.sigma   # 결정 구간 (decision interval)

        # CUSUM 상태
        self.S_upper = 0.0   # 상향 CUSUM (농도 증가 감지)
        self.S_lower = 0.0   # 하향 CUSUM (센서 이상 감지)

        # 이력 버퍼
        self.history = deque(maxlen=3600)   # 최근 1시간 (1s 간격)
        self.cusum_history = deque(maxlen=3600)

        # 폭발 한계
        self.LEL = 40.0      # 하한폭발한계 (g/m³) — 리튬/흑연 분진 기준
        self.WARNING_PCT = 25  # LEL의 25%에서 경고 시작

    def update(self, dust_concentration_mg_m3, timestamp=None):
        """
        매 1초 호출

        Args:
            dust_concentration_mg_m3: 현재 분진 농도 (mg/m³)

        Returns:
            dict: 폭발 위험도 판정
        """
        x = dust_concentration_mg_m3
        self.history.append(x)

        # === CUSUM 업데이트 ===
        self.S_upper = max(0, self.S_upper + (x - self.mu_0 - self.k))
        self.S_lower = max(0, self.S_lower + (self.mu_0 - self.k - x))
        self.cusum_history.append(self.S_upper)

        cusum_alarm = self.S_upper > self.h

        # === 절대값 감시 ===
        lel_mg = self.LEL * 1000  # g → mg 변환
        concentration_pct_lel = (x / lel_mg) * 100  # LEL 대비 %

        # === 트렌드 예측 ===
        trend_result = self._predict_trend()

        # === 종합 위험도 계산 ===
        risk = 0.0
        level = "NORMAL"
        action = "정상 운전"

        # 1. LEL 비율 기반
        if concentration_pct_lel >= 50:
            risk = max(risk, 0.9)
            level = "EMERGENCY"
            action = "비상정지 + 환기 최대"
        elif concentration_pct_lel >= 25:
            risk = max(risk, 0.6)
            level = "ALARM"
            action = "투입 중지 + 환기 강화"
        elif concentration_pct_lel >= 10:
            risk = max(risk, 0.3)
            level = "WARNING"
            action = "환기 확인"

        # 2. CUSUM 이상 감지
        if cusum_alarm:
            risk = max(risk, 0.5)
            if level == "NORMAL":
                level = "CUSUM_ALERT"
                action = "분진 농도 상승 추세 감지 — 환기 점검"

        # 3. 트렌드 예측 반영
        if trend_result['time_to_warning_min'] is not None:
            if trend_result['time_to_warning_min'] < 10:
                risk = max(risk, 0.7)
                level = "ALARM" if level == "NORMAL" else level
                action = f"현재 추세 지속 시 {trend_result['time_to_warning_min']:.0f}분 후 경고 수준 도달"

        return {
            'risk': round(risk, 2),
            'level': level,
            'action': action,
            'details': {
                'concentration_mg_m3': round(x, 1),
                'concentration_pct_lel': round(concentration_pct_lel, 1),
                'cusum_upper': round(self.S_upper, 2),
                'cusum_alarm': cusum_alarm,
                'trend_slope': trend_result.get('slope', 0),
                'time_to_warning_min': trend_result.get('time_to_warning_min'),
            }
        }

    def _predict_trend(self):
        """분진 농도 추세 예측 — 경고 수준 도달 시간 추정"""
        if len(self.history) < 60:  # 최소 1분
            return {'slope': 0, 'time_to_warning_min': None}

        data = np.array(list(self.history)[-300:])  # 최근 5분
        x_axis = np.arange(len(data))

        # 선형 회귀
        from scipy.stats import linregress
        slope, intercept, r_value, _, _ = linregress(x_axis, data)

        # 경고 수준(LEL 25%)까지 도달 시간 예측
        warning_level = self.LEL * 1000 * (self.WARNING_PCT / 100)  # mg/m³
        current = data[-1]

        if slope > 0 and current < warning_level:
            remaining = warning_level - current
            time_to_warning_sec = remaining / slope
            time_to_warning_min = time_to_warning_sec / 60
        else:
            time_to_warning_min = None

        return {
            'slope': round(slope, 4),           # mg/m³ 매 초당 증가량
            'r_squared': round(r_value**2, 3),
            'time_to_warning_min': round(time_to_warning_min, 1) if time_to_warning_min else None
        }

    def reset_cusum(self):
        """CUSUM 리셋 (환기 후 정상 복귀 확인 시)"""
        self.S_upper = 0.0
        self.S_lower = 0.0

    def set_baseline(self, normal_data):
        """정상 기준선 설정 (14일 데이터)"""
        self.mu_0 = np.mean(normal_data)
        self.sigma = np.std(normal_data)
        self.k = 0.5 * self.sigma
        self.h = 5.0 * self.sigma
```

### 3.2 CUSUM 파라미터 설명

| 파라미터 | 공식 | 역할 | 조정 |
|----------|------|------|------|
| **μ₀** (목표 평균) | 정상 14일 평균 | 기준 수준 | 환경 변화 시 재계산 |
| **k** (허용 편이) | 0.5σ ~ 1.0σ | 민감도 조절 | 작을수록 민감 (오경보↑) |
| **h** (결정 구간) | 4σ ~ 6σ | 경보 임계값 | 작을수록 빠른 감지 (오경보↑) |
| **ARL₀** | 관련 공식 | 정상 시 평균 경보 간격 | h와 k로 결정 |

### 3.3 파라미터 튜닝 가이드

```python
def tune_cusum_params(normal_data, desired_false_alarm_hours=168):
    """
    CUSUM 파라미터 자동 튜닝

    Args:
        normal_data: 정상 운전 시 분진 농도 시계열
        desired_false_alarm_hours: 원하는 오경보 간격 (기본 168시간 = 1주)

    Returns:
        최적 k, h 값
    """
    mu = np.mean(normal_data)
    sigma = np.std(normal_data)

    # k: 감지하고 싶은 최소 변화량의 절반
    # 예: 정상 평균에서 2σ 변화를 감지하고 싶으면 k = σ
    k = 0.5 * sigma

    # h: 시뮬레이션으로 원하는 ARL₀에 맞추기
    best_h = 5.0 * sigma
    for h_candidate in np.arange(3*sigma, 8*sigma, 0.1*sigma):
        arl0 = _simulate_arl0(normal_data, mu, k, h_candidate, n_sim=1000)
        arl0_hours = arl0 / 3600  # 1초 간격 기준
        if abs(arl0_hours - desired_false_alarm_hours) < abs(arl0_hours - desired_false_alarm_hours):
            best_h = h_candidate

    return k, best_h
```

---

## 4. 환기 연동 제어

```python
class VentilationController:
    """분진 농도에 따른 환기 자동 제어"""

    def control(self, dust_result, plc):
        level = dust_result['level']
        pct_lel = dust_result['details']['concentration_pct_lel']

        if level == "EMERGENCY":
            plc.ventilation_set(100)        # 환기 100%
            plc.stop_conveyor()             # 투입 중지
            plc.emergency_stop()            # 비상정지
        elif level == "ALARM":
            plc.ventilation_set(100)        # 환기 100%
            plc.stop_conveyor()             # 투입 중지
        elif level in ["WARNING", "CUSUM_ALERT"]:
            # 비례 제어: LEL% 10~25 → 환기 60~100%
            vent_pct = min(100, 60 + (pct_lel - 10) * (40/15))
            plc.ventilation_set(int(vent_pct))
        else:
            plc.ventilation_set(40)         # 기본 환기
```

---

## 5. 주의사항

- **LEL 값은 분진 종류에 따라 다름**: 리튬 ~40g/m³, 흑연 ~50g/m³, 폴리머 ~20g/m³ → 투입 재료에 따라 기준 변경
- **센서 위치**: 분진 부유가 가장 심한 곳(파쇄 챔버 상부 + 배출 덕트)에 설치
- **센서 오염**: 레이저 분진 센서는 렌즈 오염에 취약 → 자동 에어퍼지 필수
- **습도 영향**: 습도가 높으면 분진이 가라앉아 폭발 위험 감소 → 습도 보정 고려
- **CUSUM 리셋 타이밍**: 환기 후 정상 복귀가 확인된 후 리셋 (너무 빠른 리셋은 재감지 불가)
