"""
ARIMA 시뮬레이션 — 슈레더 베어링 온도 기본 예측
================================================
ARIMA의 핵심 특징을 체험합니다:
  1. 순수 통계 모델 (AI/딥러닝 아님)
  2. 수학적으로 명확한 원리
  3. 적은 데이터로도 작동
  4. 다른 모델의 Baseline(기준선)으로 사용
"""
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from sklearn.metrics import mean_absolute_error
from common_data import generate_shredder_data

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False


def run_arima_simulation():
    print("=" * 60)
    print("  ARIMA 시뮬레이션 — 베어링 온도 기본 예측")
    print("=" * 60)

    # 1. 데이터 생성 (일 단위로 집계 — ARIMA에 적합)
    print("\n[1단계] 데이터 생성 (일 단위 평균)...")
    df = generate_shredder_data(days=90, freq_minutes=60)

    # 일 단위 평균으로 리샘플링 (ARIMA는 고빈도 데이터에 비효율)
    daily = df.set_index('timestamp').resample('D')['temperature'].mean().reset_index()
    daily.columns = ['date', 'temperature']
    print(f"  데이터: {len(daily)}일")

    # 2. 시간순 분할
    train_size = int(len(daily) * 0.75)
    train = daily.iloc[:train_size]
    test = daily.iloc[train_size:]
    print(f"  Train: {len(train)}일 / Test: {len(test)}일")

    # 3. ARIMA 모델 학습
    print("\n[2단계] ARIMA 모델 학습...")
    print("  ARIMA(p,d,q) 파라미터:")
    print("    p=2: 과거 2일의 값을 참조 (자기회귀)")
    print("    d=1: 1차 차분 (트렌드 제거)")
    print("    q=1: 과거 1일의 오차를 참조 (이동평균)")

    model = ARIMA(train['temperature'], order=(2, 1, 1))
    fitted = model.fit()
    print(f"\n  AIC: {fitted.aic:.2f} (낮을수록 좋은 모델)")
    print(f"  BIC: {fitted.bic:.2f}")

    # 4. 예측
    print("\n[3단계] 미래 예측...")
    forecast = fitted.forecast(steps=len(test))
    mae = mean_absolute_error(test['temperature'], forecast)

    print(f"  MAE = {mae:.2f}°C")

    # 5. 시각화
    print("\n[4단계] 결과 시각화...")
    fig, axes = plt.subplots(3, 1, figsize=(14, 12))

    # 5-1. 예측 그래프
    ax1 = axes[0]
    ax1.plot(train['date'], train['temperature'], 'b-', linewidth=1.5, label='Train (실제)')
    ax1.plot(test['date'], test['temperature'], 'g-', linewidth=1.5, label='Test (실제)')
    ax1.plot(test['date'], forecast.values, 'r--', linewidth=2, label='ARIMA 예측')
    ax1.axvline(x=train['date'].iloc[-1], color='gray', linestyle=':', label='학습/테스트 경계')
    ax1.fill_between(test['date'], forecast - 2*mae, forecast + 2*mae,
                     alpha=0.15, color='red', label='±2σ 구간')
    ax1.set_title(f'ARIMA(2,1,1) 예측 — 일평균 베어링 온도 (MAE={mae:.2f}°C)', fontsize=14, fontweight='bold')
    ax1.set_ylabel('온도 (°C)')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # 5-2. 자기상관 함수 (ACF) — ARIMA의 핵심 개념!
    ax2 = axes[1]
    acf_values = pd.Series(train['temperature']).autocorr
    lags = range(1, 15)
    acf_vals = [train['temperature'].autocorr(lag=l) for l in lags]
    ax2.bar(lags, acf_vals, color='steelblue', alpha=0.7)
    ax2.axhline(y=0, color='black', linewidth=0.5)
    ax2.axhline(y=1.96/np.sqrt(len(train)), color='red', linestyle='--', alpha=0.5, label='95% 신뢰 구간')
    ax2.axhline(y=-1.96/np.sqrt(len(train)), color='red', linestyle='--', alpha=0.5)
    ax2.set_title('자기상관 함수 (ACF) — "과거 며칠 전 데이터가 현재와 관련 있는가?"', fontsize=13, fontweight='bold')
    ax2.set_xlabel('Lag (일)')
    ax2.set_ylabel('자기상관 계수')
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    # 5-3. ARIMA 원리 설명
    ax3 = axes[2]
    # 원본 vs 차분 비교
    diff = train['temperature'].diff().dropna()
    ax3.plot(train['date'][1:], diff, 'purple', alpha=0.7, linewidth=1)
    ax3.axhline(y=0, color='black', linewidth=1)
    ax3.axhline(y=diff.mean(), color='red', linestyle='--', label=f'평균: {diff.mean():.3f}°C/일')
    ax3.set_title('1차 차분 (d=1) — 트렌드를 제거하여 정상 시계열로 변환', fontsize=13, fontweight='bold')
    ax3.set_xlabel('날짜')
    ax3.set_ylabel('일간 온도 변화 (°C)')
    ax3.legend()
    ax3.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(os.path.join(os.path.dirname(__file__), 'arima_result.png'), dpi=150, bbox_inches='tight')
    plt.show()

    # 6. ARIMA 핵심 특징 요약
    print("\n" + "=" * 60)
    print("  ARIMA 핵심 특징 요약")
    print("=" * 60)
    print(f"""
  ✅ 장점:
    • 순수 통계 — AI/딥러닝 없이 수학적 원리로 예측
    • 적은 데이터로 작동 (수십~수백 건)
    • 수학적으로 명확한 해석 (p, d, q 파라미터의 의미 명확)
    • Baseline 모델로 최적 (다른 모델과 비교 기준)

  ❌ 단점:
    • 단변량만 가능 (온도 하나)
    • 비선형 패턴 학습 불가
    • 장기 예측 정확도 급격히 하락
    • 고빈도 데이터(초/분 단위)에 비효율

  📊 ARIMA의 의미:
    • AR (Auto-Regressive): 과거 p일의 값으로 예측
    • I (Integrated): d번 차분하여 트렌드 제거
    • MA (Moving Average): 과거 q일의 오차로 보정

  🏭 슈레더 적용:
    • 다른 AI 모델의 Baseline(기준선)으로 사용
    • "ARIMA보다 {mae:.2f}°C 더 정확합니다" → AI 도입 근거
    """)


if __name__ == "__main__":
    run_arima_simulation()
