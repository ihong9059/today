# 05. ARIMA — 통계 기반 시계열의 기본 (Baseline 모델)

## 이 시뮬레이션이 보여주는 것

| 항목 | 내용 |
|------|------|
| **모델** | ARIMA (Auto-Regressive Integrated Moving Average) |
| **시나리오** | 일평균 베어링 온도로 미래 예측 |
| **핵심 체험** | 통계 원리(자기상관/차분), Baseline 역할, AI와의 차이 |

## 실행 방법

```bash
pip install statsmodels pandas numpy matplotlib scikit-learn
cd 05_ARIMA
python simulation.py
```

## ARIMA가 하는 일

```
ARIMA(p=2, d=1, q=1) 의미:

  p=2: "어제와 그제의 온도"를 참고하여 오늘 예측
  d=1: "온도 자체"가 아닌 "온도의 변화량"을 사용 (트렌드 제거)
  q=1: "어제의 예측 오차"를 보정에 활용
```

## 핵심 교훈

- ARIMA는 **AI가 아닌 순수 통계** — 원리가 수학적으로 명확
- **Baseline** 역할: "ARIMA보다 X% 더 정확합니다" → AI 도입 근거
- 적은 데이터(수십 건)로도 작동하지만, 복잡한 패턴에는 한계
