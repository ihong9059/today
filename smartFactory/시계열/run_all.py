"""
전체 시계열 모델 비교 실행
==========================
5개 모델을 순차적으로 실행하여 동일 데이터에서의 성능을 비교합니다.
"""
import os
import sys

models = [
    ("05_ARIMA",    "ARIMA (통계 Baseline)"),
    ("01_Prophet",  "Prophet (Meta — 초보자 친화)"),
    ("04_XGBoost",  "XGBoost (트리 — Edge 최적)"),
    ("02_LSTM",     "LSTM Autoencoder (딥러닝 — 이상 탐지)"),
    ("03_TFT",      "TFT (Transformer — 최고 성능)"),
]

print("=" * 70)
print("  시계열 모델 전체 비교 실행")
print("  슈레더 센서 데이터 기반 — 5개 모델 순차 실행")
print("=" * 70)

for i, (folder, name) in enumerate(models, 1):
    print(f"\n{'━' * 70}")
    print(f"  [{i}/5] {name}")
    print(f"{'━' * 70}\n")

    sim_path = os.path.join(os.path.dirname(__file__), folder, "simulation.py")
    if os.path.exists(sim_path):
        os.system(f'python "{sim_path}"')
    else:
        print(f"  ⚠️ {sim_path} 파일을 찾을 수 없습니다.")

    input(f"\n  [Enter]를 누르면 다음 모델로 진행합니다...")

print("\n" + "=" * 70)
print("  전체 비교 완료!")
print("=" * 70)
print("""
  모델 선택 가이드:

  데이터 적음 (<100건)  → ARIMA, Prophet
  빠른 프로토타입       → Prophet (3줄 코드)
  칼날 마모 예측 (RUL)  → XGBoost (해석+빠름+Edge)
  베어링 이상 탐지      → LSTM Autoencoder (정상 패턴 학습)
  다변량 장기 예측      → TFT (최고 성능, 서버용)

  원칙: "최신이 최선이 아니다" — 적재적소!
""")
