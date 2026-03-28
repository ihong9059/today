"""
TFT(Temporal Fusion Transformer) 시뮬레이션 — 다변량 장기 예측
===============================================================
TFT의 핵심 특징을 체험합니다:
  1. Transformer(GPT 구조)를 시계열에 적용
  2. 다변량 + 미래 정보 + 정적 정보 동시 활용
  3. Attention — "어떤 과거 시점이 중요한지" 자동 파악
  4. 변수 중요도 — "어떤 센서가 예측에 기여하는지" 시각화

  ※ 실제 TFT는 pytorch-forecasting 라이브러리 필요 (무거움)
  ※ 이 시뮬레이션은 TFT의 핵심 개념을 간소화하여 체험합니다.
"""
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from common_data import generate_shredder_data

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False


def run_tft_simulation():
    print("=" * 60)
    print("  TFT 시뮬레이션 — 다변량 센서 데이터 장기 예측")
    print("=" * 60)
    print("  (TFT 핵심 개념을 간소화 모델로 체험합니다)")

    # 1. 데이터 생성
    print("\n[1단계] 다변량 센서 데이터 생성 (90일)...")
    df = generate_shredder_data(days=90, freq_minutes=60)
    print(f"  데이터: {len(df)}건")

    # 2. TFT의 3가지 입력 유형 시뮬레이션
    print("\n[2단계] TFT의 3가지 입력 유형 구성...")
    print("  ★ 이것이 TFT의 핵심 — 3종류의 정보를 동시에 활용!")
    print()
    print("  [과거에만 있는 정보 — Time-varying Unknown]")
    print("    온도, 진동, 전류 (미래 값을 모르는 센서 데이터)")
    print()
    print("  [미래에도 아는 정보 — Time-varying Known]")
    print("    시간(hour), 요일(day_of_week) — 미래에도 알 수 있음")
    print("    → Prophet/LSTM은 이런 구분을 못 함!")
    print()
    print("  [고정 정보 — Static]")
    print("    장비 ID, 칼날 교체 후 경과시간 — 시간에 따라 변하지 않음")

    # 3. TFT 스타일 특징 구성
    features = pd.DataFrame()

    # 과거에만 있는 정보 (Time-varying Unknown)
    for col in ['temperature', 'vibration', 'current', 'rpm', 'throughput']:
        features[col] = df[col].values
        for lag in [1, 3, 6, 12, 24]:
            features[f'{col}_lag{lag}'] = df[col].shift(lag).values
        features[f'{col}_roll_mean_12'] = df[col].rolling(12).mean().values
        features[f'{col}_roll_std_12'] = df[col].rolling(12).std().values

    # 미래에도 아는 정보 (Time-varying Known) — ★ TFT 차별점!
    features['hour'] = df['timestamp'].dt.hour
    features['day_of_week'] = df['timestamp'].dt.dayofweek
    features['is_weekend'] = (df['timestamp'].dt.dayofweek >= 5).astype(int)
    features['hour_sin'] = np.sin(2 * np.pi * features['hour'] / 24)
    features['hour_cos'] = np.cos(2 * np.pi * features['hour'] / 24)

    # 정적 정보 (Static) — ★ TFT 차별점!
    features['blade_age_hours'] = np.arange(len(df))  # 칼날 사용 시간
    features['equipment_id'] = 0  # 장비 ID (슈레더 1대)

    target = df['temperature'].shift(-24)  # 24시간 후 온도 예측!

    # NaN 제거
    valid = features.notna().all(axis=1) & target.notna()
    features = features[valid]
    target = target[valid]

    feature_names = features.columns.tolist()
    print(f"\n  총 특징: {len(feature_names)}개")
    print(f"    과거 센서 특징: {sum(1 for f in feature_names if any(c in f for c in ['temperature','vibration','current','rpm','throughput']) and 'hour' not in f and 'day' not in f and 'weekend' not in f and 'blade' not in f and 'equip' not in f)}개")
    print(f"    미래 알 수 있는 특징: hour, day_of_week, is_weekend, hour_sin/cos = 5개")
    print(f"    정적 특징: blade_age_hours, equipment_id = 2개")

    # 4. 시간순 분할
    train_size = int(len(features) * 0.7)
    X_train = features.iloc[:train_size]
    y_train = target.iloc[:train_size]
    X_test = features.iloc[train_size:]
    y_test = target.iloc[train_size:]

    # 5. 모델 학습 (TFT 개념을 GBM으로 간소화 시뮬레이션)
    print("\n[3단계] 모델 학습 (TFT 개념 시뮬레이션)...")
    model = GradientBoostingRegressor(n_estimators=300, max_depth=8, learning_rate=0.05, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"  MAE = {mae:.2f}°C (24시간 후 온도 예측 오차)")
    print(f"  R²  = {r2:.4f}")

    # 6. 변수 중요도 분석 (★ TFT의 핵심 기능: Variable Selection)
    importance = pd.Series(model.feature_importances_, index=feature_names)
    importance = importance.sort_values(ascending=False)

    # 그룹별 중요도 합산
    group_imp = {}
    for name, imp in importance.items():
        if any(s in name for s in ['temperature']):
            group_imp['온도 관련'] = group_imp.get('온도 관련', 0) + imp
        elif any(s in name for s in ['vibration']):
            group_imp['진동 관련'] = group_imp.get('진동 관련', 0) + imp
        elif any(s in name for s in ['current']):
            group_imp['전류 관련'] = group_imp.get('전류 관련', 0) + imp
        elif any(s in name for s in ['hour', 'day', 'weekend']):
            group_imp['시간 정보'] = group_imp.get('시간 정보', 0) + imp
        elif any(s in name for s in ['blade', 'equip']):
            group_imp['정적 정보'] = group_imp.get('정적 정보', 0) + imp
        else:
            group_imp['기타'] = group_imp.get('기타', 0) + imp

    print(f"\n[4단계] 변수 그룹별 중요도 (★ TFT Variable Selection 시뮬레이션):")
    for group, imp in sorted(group_imp.items(), key=lambda x: -x[1]):
        bar = "█" * int(imp * 50)
        print(f"  {group:12s}: {imp:.4f} {bar}")

    # 7. Attention 시뮬레이션 — "어떤 과거 시점이 중요한가?"
    print("\n[5단계] Attention 시뮬레이션...")
    lag_importance = {}
    for name, imp in importance.items():
        if '_lag' in name:
            lag = name.split('_lag')[1]
            lag_importance[f'{lag}시간 전'] = lag_importance.get(f'{lag}시간 전', 0) + imp

    print("  '어떤 과거 시점이 미래 예측에 가장 중요한가?'")
    for lag, imp in sorted(lag_importance.items(), key=lambda x: -x[1])[:5]:
        bar = "█" * int(imp * 200)
        print(f"    {lag:10s}: {imp:.4f} {bar}")

    # 8. 시각화
    print("\n[6단계] 결과 시각화...")
    fig, axes = plt.subplots(2, 2, figsize=(16, 10))

    test_timestamps = df['timestamp'].iloc[train_size:train_size+len(y_test)]

    # 8-1. 24시간 후 예측
    ax1 = axes[0, 0]
    ax1.plot(test_timestamps[:200], y_test.values[:200], 'b-', alpha=0.7, label='실제 (24h 후)')
    ax1.plot(test_timestamps[:200], y_pred[:200], 'r--', alpha=0.8, label='TFT 예측')
    ax1.set_title(f'24시간 후 온도 예측 (MAE={mae:.2f}°C)', fontsize=13, fontweight='bold')
    ax1.set_ylabel('온도 (°C)')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # 8-2. 변수 그룹별 중요도 (파이 차트)
    ax2 = axes[0, 1]
    colors = ['#dc2626', '#2563eb', '#059669', '#d97706', '#7c3aed', '#94a3b8']
    sorted_groups = sorted(group_imp.items(), key=lambda x: -x[1])
    ax2.pie([v for _, v in sorted_groups],
            labels=[k for k, _ in sorted_groups],
            colors=colors[:len(sorted_groups)],
            autopct='%1.1f%%', startangle=90)
    ax2.set_title('★ TFT Variable Selection\n"어떤 센서 그룹이 가장 중요한가?"', fontsize=13, fontweight='bold')

    # 8-3. 시간 Lag별 중요도 (Attention 시뮬레이션)
    ax3 = axes[1, 0]
    if lag_importance:
        lags_sorted = sorted(lag_importance.items(), key=lambda x: -x[1])
        ax3.barh([k for k, _ in lags_sorted], [v for _, v in lags_sorted], color='steelblue', alpha=0.7)
        ax3.invert_yaxis()
    ax3.set_title('★ TFT Attention\n"어떤 과거 시점이 미래에 중요한가?"', fontsize=13, fontweight='bold')
    ax3.set_xlabel('중요도')
    ax3.grid(True, alpha=0.3, axis='x')

    # 8-4. 모델 비교
    ax4 = axes[1, 1]
    models = ['ARIMA\n(통계)', 'Prophet\n(Meta)', 'XGBoost\n(트리)', 'LSTM\n(딥러닝)', 'TFT\n(Transformer)']
    scores = [2, 3, 4, 4.5, 5]  # 상대적 성능 (개념적)
    colors_bar = ['#94a3b8', '#fbbf24', '#2563eb', '#7c3aed', '#059669']
    bars = ax4.bar(models, scores, color=colors_bar, alpha=0.8, edgecolor='white', linewidth=2)
    ax4.set_title('모델 간 상대적 성능 비교 (다변량 장기 예측)', fontsize=13, fontweight='bold')
    ax4.set_ylabel('상대 성능')
    ax4.set_ylim(0, 6)
    for bar, score in zip(bars, scores):
        ax4.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 0.1,
                f'{score}', ha='center', va='bottom', fontweight='bold')
    ax4.grid(True, alpha=0.3, axis='y')

    plt.tight_layout()
    plt.savefig(os.path.join(os.path.dirname(__file__), 'tft_result.png'), dpi=150, bbox_inches='tight')
    plt.show()

    # 9. TFT 핵심 특징 요약
    print("\n" + "=" * 60)
    print("  TFT 핵심 특징 요약")
    print("=" * 60)
    print(f"""
  ✅ TFT만의 차별점 (다른 모델에 없는 기능):

    1. 3가지 입력 유형 동시 처리
       • 과거 센서: 온도, 진동, 전류 (미래 모름)
       • 미래 알 수 있는 것: 시간, 요일, 생산 스케줄
       • 정적 정보: 장비 ID, 칼날 교체 이력
       → Prophet: 과거만 / LSTM: 과거만 / TFT: 3가지 모두!

    2. Variable Selection (변수 선택)
       → "어떤 센서가 예측에 기여하는지" 자동 선별+시각화
       → 가장 중요한 그룹: {sorted_groups[0][0]} ({sorted_groups[0][1]:.1%})

    3. Multi-head Attention
       → "과거의 어떤 시점이 미래에 중요한지" 자동 파악
       → LSTM은 순서대로만 봄 / TFT는 중요한 시점을 직접 참조

    4. 확률 예측 (Quantile Output)
       → "내일 온도는 35°C (90% 신뢰: 33~37°C)"
       → 불확실성까지 제공

  ❌ 단점:
    • 데이터 많이 필요 (수천~수만 건)
    • 모델이 무거움 (Edge 배포 어려움)
    • 학습 시간이 김
    • pytorch-forecasting 라이브러리 필요

  🏭 슈레더 적용:
    • 통합 장기 예측 (서버에서) → 적합
    • Edge 실시간 추론 → 부적합 (XGBoost/LSTM 사용)
    """)


if __name__ == "__main__":
    run_tft_simulation()
