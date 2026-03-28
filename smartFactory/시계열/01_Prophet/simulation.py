"""
Prophet-Style 시뮬레이션 — 슈레더 베어링 온도 예측
===================================================
Prophet의 핵심 원리를 체험합니다:
  1. 시계열 = 트렌드 + 계절성 + 노이즈 분해
  2. 각 구성요소를 분리하여 시각화
  3. 미래 예측 + 불확실성 구간 제공
  4. 단변량 전용 (온도 하나만 사용)

  ※ Prophet 라이브러리 대신 statsmodels STL 분해 + 선형회귀로
    Prophet의 핵심 원리를 동일하게 구현합니다.
"""
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import STL
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
from common_data import generate_shredder_data, split_time_series

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False


def run_prophet_simulation():
    print("=" * 60)
    print("  Prophet-Style 시뮬레이션 — 슈레더 베어링 온도 예측")
    print("  (Prophet 핵심 원리: 트렌드 + 계절성 + 노이즈 분해)")
    print("=" * 60)

    # 1. 데이터 생성
    print("\n[1단계] 슈레더 센서 데이터 생성 (90일)...")
    df = generate_shredder_data(days=90, freq_minutes=60)
    print(f"  데이터: {len(df)}건 ({df['timestamp'].min()} ~ {df['timestamp'].max()})")

    ts = df.set_index('timestamp')['temperature']

    # 2. 시간순 분할
    train_size = int(len(ts) * 0.7)
    train_ts = ts.iloc[:train_size]
    test_ts = ts.iloc[train_size:]
    print(f"  Train: {len(train_ts)}건 / Test: {len(test_ts)}건")

    # 3. STL 분해 — Prophet의 핵심과 동일한 원리!
    print("\n[2단계] 시계열 분해 (Prophet 핵심 원리)...")
    print("  y(t) = Trend + Seasonality + Residual")
    print("  STL(Seasonal-Trend decomposition using LOESS) 적용...")

    stl = STL(train_ts, period=24, robust=True)  # 24시간 주기
    result = stl.fit()

    print("  분해 완료!")
    print(f"  트렌드 범위: {result.trend.min():.1f} ~ {result.trend.max():.1f}°C")
    print(f"  계절성 범위: {result.seasonal.min():.1f} ~ {result.seasonal.max():.1f}°C")
    print(f"  잔차(노이즈) 표준편차: {result.resid.std():.2f}°C")

    # 4. 트렌드 외삽으로 미래 예측
    print("\n[3단계] 미래 예측 (트렌드 외삽 + 계절성 반복)...")

    # 트렌드: 선형 회귀로 외삽
    X_train_idx = np.arange(len(train_ts)).reshape(-1, 1)
    trend_model = LinearRegression()
    trend_model.fit(X_train_idx, result.trend.values)

    X_test_idx = np.arange(len(train_ts), len(train_ts) + len(test_ts)).reshape(-1, 1)
    trend_pred = trend_model.predict(X_test_idx)

    # 계절성: 학습 데이터의 24시간 패턴을 반복
    seasonal_pattern = result.seasonal.values[-24:]  # 마지막 24시간 패턴
    seasonal_pred = np.tile(seasonal_pattern, len(test_ts) // 24 + 1)[:len(test_ts)]

    # 예측 = 트렌드 + 계절성
    forecast = trend_pred + seasonal_pred
    noise_std = result.resid.std()

    # 5. 성능 평가
    mae = mean_absolute_error(test_ts.values, forecast)
    rmse = np.sqrt(np.mean((test_ts.values - forecast)**2))

    print(f"\n[4단계] 성능 평가:")
    print(f"  MAE  = {mae:.2f}°C (평균 {mae:.2f}도 오차)")
    print(f"  RMSE = {rmse:.2f}°C")

    # 6. 시각화
    print("\n[5단계] 결과 시각화...")
    fig, axes = plt.subplots(4, 1, figsize=(14, 14))

    # 6-1. 전체 예측
    ax1 = axes[0]
    ax1.plot(ts.index, ts.values, 'b.', alpha=0.3, markersize=2, label='실제 온도')
    ax1.plot(test_ts.index, forecast, 'r-', linewidth=1.5, label='Prophet-Style 예측')
    ax1.fill_between(test_ts.index, forecast - 2*noise_std, forecast + 2*noise_std,
                     alpha=0.15, color='red', label='불확실성 구간 (±2σ)')
    ax1.axvline(x=train_ts.index[-1], color='green', linestyle='--', linewidth=2, label='학습/테스트 경계')
    ax1.set_title(f'Prophet-Style 예측 — 슈레더 베어링 온도 (MAE={mae:.2f}°C)', fontsize=14, fontweight='bold')
    ax1.set_ylabel('온도 (°C)')
    ax1.legend(fontsize=9)
    ax1.grid(True, alpha=0.3)

    # 6-2. 트렌드
    ax2 = axes[1]
    ax2.plot(train_ts.index, result.trend.values, 'g-', linewidth=2, label='학습 트렌드')
    ax2.plot(test_ts.index, trend_pred, 'r--', linewidth=2, label='트렌드 외삽 (예측)')
    ax2.set_title('★ Prophet 핵심 1: 트렌드 감지 (칼날 마모 → 온도 서서히 상승)', fontsize=13, fontweight='bold')
    ax2.set_ylabel('트렌드 (°C)')
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    # 6-3. 계절성 (일간 패턴)
    ax3 = axes[2]
    hours = np.arange(24)
    ax3.bar(hours, seasonal_pattern, color='steelblue', alpha=0.7)
    ax3.set_title('★ Prophet 핵심 2: 계절성 감지 (낮 가동→온도↑, 밤 정지→온도↓)', fontsize=13, fontweight='bold')
    ax3.set_xlabel('시간 (0~23시)')
    ax3.set_ylabel('계절성 효과 (°C)')
    ax3.set_xticks(range(0, 24, 2))
    ax3.grid(True, alpha=0.3)

    # 6-4. 잔차 (노이즈)
    ax4 = axes[3]
    ax4.plot(train_ts.index, result.resid.values, 'purple', alpha=0.5, linewidth=0.5)
    ax4.axhline(y=0, color='black', linewidth=1)
    ax4.axhline(y=2*noise_std, color='red', linestyle='--', alpha=0.5, label=f'±2σ ({2*noise_std:.1f}°C)')
    ax4.axhline(y=-2*noise_std, color='red', linestyle='--', alpha=0.5)
    ax4.set_title('★ Prophet 핵심 3: 잔차(노이즈) — 트렌드/계절성 제거 후 남은 것', fontsize=13, fontweight='bold')
    ax4.set_ylabel('잔차 (°C)')
    ax4.legend()
    ax4.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(os.path.join(os.path.dirname(__file__), 'prophet_result.png'), dpi=150, bbox_inches='tight')
    print("  prophet_result.png 저장 완료!")
    plt.show()

    # 7. 핵심 요약
    print("\n" + "=" * 60)
    print("  Prophet 핵심 특징 요약")
    print("=" * 60)
    print(f"""
  ★ Prophet의 핵심 원리 (이 시뮬레이션에서 체험한 것):

    y(t) = Trend + Seasonality + Noise

    1. 트렌드: 칼날 마모로 온도가 90일간 서서히 상승
       → 범위: {result.trend.min():.1f}°C ~ {result.trend.max():.1f}°C

    2. 계절성: 낮에 가동하면 온도↑, 밤에 정지하면 온도↓
       → 진폭: ±{abs(seasonal_pattern).max():.1f}°C (일간 패턴)

    3. 잔차: 센서 노이즈 + 이상 이벤트
       → 표준편차: {noise_std:.2f}°C

  ✅ 장점:
    • 트렌드/계절성을 자동 분리 → "왜 올라가는지" 설명 가능
    • 불확실성 구간 제공 (±2σ)
    • 코드가 매우 간단 (실제 Prophet은 3줄이면 완성)

  ❌ 단점:
    • 단변량만 가능 (온도 하나 — 진동, 전류 동시 활용 불가)
    • 비선형 복잡 패턴에 약함

  🏭 슈레더 적용:
    • 처리량/에너지 장기 트렌드 예측 → 적합
    • 베어링 이상 탐지 → 부적합 (다변량 필요 → LSTM 사용)
    """)

    return mae, rmse


if __name__ == "__main__":
    run_prophet_simulation()
