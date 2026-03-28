# 03. TFT (Temporal Fusion Transformer) — 최신 최강 시계열 모델

## 이 시뮬레이션이 보여주는 것

| 항목 | 내용 |
|------|------|
| **모델** | TFT (Google Research, 2020) |
| **시나리오** | 다변량 센서 데이터로 24시간 후 베어링 온도 예측 |
| **핵심 체험** | 3가지 입력 유형, Variable Selection, Attention 시각화 |

## 실행 방법

```bash
pip install scikit-learn pandas numpy matplotlib
cd 03_TFT
python simulation.py
```

## TFT만의 차별점

```
다른 모델:  과거 데이터 → 미래 예측
TFT:       과거 데이터 + 미래 알 수 있는 정보 + 정적 정보 → 미래 예측

예시:
  과거: 어제 온도 28°C, 진동 3.2mm/s (센서 — 미래 모름)
  미래: 내일은 월요일, 오전 10시 (시간 — 미래에도 알 수 있음)
  정적: 칼날 교체 후 300시간 (장비 정보 — 시간에 무관)

  → TFT는 이 3가지를 구분하여 각각 최적으로 활용!
```

## 핵심 교훈

- TFT는 **"왜 이렇게 예측했는지" 설명 가능** (Variable Selection + Attention)
- 다변량 장기 예측에서 **최고 성능** (LSTM, Prophet 대비)
- 단, **데이터 많이 필요** + **무거움** → Edge 배포 부적합, 서버용
