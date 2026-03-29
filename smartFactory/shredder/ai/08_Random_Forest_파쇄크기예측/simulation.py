"""
Random Forest 시뮬레이션 — 슈레더 파쇄 크기 예측
==================================================
Random Forest의 핵심 특징을 체험합니다:
  1. 앙상블(Ensemble): 여러 Decision Tree를 결합
  2. Bagging: Bootstrap 샘플로 각 트리 독립 학습
  3. 12개 특징에서 파쇄 크기(mm) 및 균일도(%) 예측
  4. Feature Importance로 핵심 센서 파악
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from common_data import generate_shredder_full_data

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False


def extract_12_features(df):
    """
    CUR, SPD, VIB, SCL 센서에서 12개 특징을 추출합니다.
    각 센서별 평균(mean), 표준편차(std), 최대값(max) → 4센서 x 3통계 = 12특징

    원본 센서:
      CUR: CUR_A, CUR_B (전류 A/B축)
      SPD: SPD_A, SPD_B (속도 A/B축)
      VIB: VIB_A_x, VIB_A_y, VIB_A_z, VIB_B_x, VIB_B_y, VIB_B_z (진동 6채널)
      SCL: SCL_weight (무게 스케일)
    """
    features = pd.DataFrame()
    n = len(df)

    # CUR (전류): A축+B축 합산 통계
    features['CUR_mean'] = (df['CUR_A'] + df['CUR_B']) / 2
    features['CUR_std'] = np.abs(df['CUR_A'] - df['CUR_B'])
    features['CUR_max'] = np.maximum(df['CUR_A'], df['CUR_B'])

    # SPD (속도): A축+B축 합산 통계
    features['SPD_mean'] = (df['SPD_A'] + df['SPD_B']) / 2
    features['SPD_std'] = np.abs(df['SPD_A'] - df['SPD_B'])
    features['SPD_max'] = np.maximum(df['SPD_A'], df['SPD_B'])

    # VIB (진동): 6채널(A_xyz + B_xyz) 합산 통계
    vib_cols = ['VIB_A_x', 'VIB_A_y', 'VIB_A_z', 'VIB_B_x', 'VIB_B_y', 'VIB_B_z']
    vib_data = df[vib_cols]
    features['VIB_mean'] = vib_data.mean(axis=1)
    features['VIB_std'] = vib_data.std(axis=1)
    features['VIB_max'] = vib_data.max(axis=1)

    # SCL (스케일/무게): SCL_weight 기반
    features['SCL_mean'] = df['SCL_weight']
    features['SCL_std'] = df['SCL_weight'].rolling(6, min_periods=1).std().fillna(0)
    features['SCL_max'] = df['SCL_weight'].rolling(6, min_periods=1).max().fillna(df['SCL_weight'])

    return features


def simulate_shred_size(features):
    """파쇄 크기(mm)와 균일도(%) 시뮬레이션"""
    n = len(features)
    rng = np.random.default_rng(123)

    # 파쇄 크기: 전류 높으면 감소, 속도 높으면 감소, 진동 높으면 불규칙, 무게 높으면 증가
    shred_size = (
        25.0
        - 0.04 * (features['CUR_mean'].values - features['CUR_mean'].median())
        - 0.008 * (features['SPD_mean'].values - features['SPD_mean'].median())
        + 0.8 * (features['VIB_mean'].values - features['VIB_mean'].median())
        + 0.03 * (features['SCL_mean'].values - features['SCL_mean'].median())
        + rng.normal(0, 0.8, n)
    )
    shred_size = np.clip(shred_size, 5, 50)

    # 균일도: 진동 낮고 속도 안정적이면 높음
    uniformity = (
        88.0
        - 1.5 * features['VIB_std'].values
        - 0.3 * features['SPD_std'].values
        - 0.2 * features['CUR_std'].values
        + rng.normal(0, 1.5, n)
    )
    uniformity = np.clip(uniformity, 40, 99)

    return np.round(shred_size, 2), np.round(uniformity, 2)


FEATURE_NAMES_KO = [
    '전류 평균', '전류 표준편차', '전류 최대값',
    '속도 평균', '속도 표준편차', '속도 최대값',
    '진동 평균', '진동 표준편차', '진동 최대값',
    '무게 평균', '무게 표준편차', '무게 최대값',
]


def run_random_forest_simulation():
    print("=" * 60)
    print("  Random Forest 시뮬레이션 — 파쇄 크기 예측")
    print("=" * 60)

    # 1. 데이터 생성
    print("\n[1단계] 센서 데이터 생성...")
    df = generate_shredder_full_data(days=90, freq_minutes=10)
    print(f"  데이터: {len(df)}건 (90일, 10분 간격)")

    # 2. 12개 특징 추출
    print("\n[2단계] 12개 특징 추출 (4센서 x 3통계)...")
    features = extract_12_features(df)
    feature_cols = features.columns.tolist()

    for i, (col, ko) in enumerate(zip(feature_cols, FEATURE_NAMES_KO), 1):
        print(f"    {i:2d}. {col:12s} ({ko})")

    # 3. 타겟 생성
    print("\n[3단계] 파쇄 크기 & 균일도 시뮬레이션...")
    shred_size, uniformity = simulate_shred_size(features)
    print(f"  파쇄 크기 범위: {shred_size.min():.1f} ~ {shred_size.max():.1f} mm")
    print(f"  균일도 범위: {uniformity.min():.1f} ~ {uniformity.max():.1f} %")

    # 4. 학습/테스트 분할
    X = features.values
    y_size = shred_size
    y_unif = uniformity

    X_train, X_test, y_size_train, y_size_test = train_test_split(
        X, y_size, test_size=0.2, random_state=42
    )
    _, _, y_unif_train, y_unif_test = train_test_split(
        X, y_unif, test_size=0.2, random_state=42
    )

    print(f"\n  Train: {len(X_train)}건 / Test: {len(X_test)}건")

    # 5. Random Forest 학습 — 파쇄 크기
    print("\n[4단계] Random Forest 학습 (파쇄 크기)...")
    rf_size = RandomForestRegressor(
        n_estimators=200,
        max_depth=12,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features='sqrt',
        random_state=42,
        n_jobs=-1
    )
    rf_size.fit(X_train, y_size_train)
    y_size_pred = rf_size.predict(X_test)

    r2_size = r2_score(y_size_test, y_size_pred)
    mae_size = mean_absolute_error(y_size_test, y_size_pred)

    print(f"  R² = {r2_size:.4f}")
    print(f"  MAE = {mae_size:.4f} mm")

    # 6. Random Forest 학습 — 균일도
    print("\n[5단계] Random Forest 학습 (균일도)...")
    rf_unif = RandomForestRegressor(
        n_estimators=200,
        max_depth=12,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features='sqrt',
        random_state=42,
        n_jobs=-1
    )
    rf_unif.fit(X_train, y_unif_train)
    y_unif_pred = rf_unif.predict(X_test)

    r2_unif = r2_score(y_unif_test, y_unif_pred)
    mae_unif = mean_absolute_error(y_unif_test, y_unif_pred)

    print(f"  R² = {r2_unif:.4f}")
    print(f"  MAE = {mae_unif:.4f} %")

    # 7. 특징 중요도
    importance = pd.Series(rf_size.feature_importances_, index=feature_cols)
    importance = importance.sort_values(ascending=False)

    print(f"\n[6단계] 특징 중요도 (파쇄 크기 예측 기준):")
    print("  순위 | 특징               | 중요도")
    print("  " + "-" * 45)
    for i, (name, imp) in enumerate(importance.items(), 1):
        ko = FEATURE_NAMES_KO[feature_cols.index(name)]
        bar = "█" * int(imp * 50)
        print(f"  {i:2d}   | {name:12s} ({ko:6s}) | {imp:.4f} {bar}")

    # 8. 시각화 (2x2 4개 그래프)
    print("\n[7단계] 결과 시각화...")
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))

    # 8-1. 실제 vs 예측 파쇄 크기
    ax1 = axes[0, 0]
    idx_sorted = np.argsort(y_size_test)
    ax1.plot(y_size_test[idx_sorted], 'b-', alpha=0.6, linewidth=1, label='실제 파쇄 크기')
    ax1.plot(y_size_pred[idx_sorted], 'r--', alpha=0.7, linewidth=1, label='RF 예측')
    ax1.set_title(f'파쇄 크기: 실제 vs 예측 (R²={r2_size:.4f}, MAE={mae_size:.2f}mm)',
                  fontsize=13, fontweight='bold')
    ax1.set_xlabel('샘플 (크기순 정렬)')
    ax1.set_ylabel('파쇄 크기 (mm)')
    ax1.legend(fontsize=10)
    ax1.grid(True, alpha=0.3)

    # 8-2. 특징 중요도 (12개)
    ax2 = axes[0, 1]
    top12 = importance
    ko_labels = [FEATURE_NAMES_KO[feature_cols.index(n)] for n in top12.index]
    colors = ['#dc2626' if v > 0.15 else '#2563eb' if v > 0.05 else '#94a3b8'
              for v in top12.values]
    bars = ax2.barh(range(len(top12)), top12.values, color=colors)
    ax2.set_yticks(range(len(top12)))
    ax2.set_yticklabels([f'{ko} ({en})' for ko, en in zip(ko_labels, top12.index)], fontsize=9)
    ax2.invert_yaxis()
    ax2.set_title('특징 중요도 (12개 센서 특징)', fontsize=13, fontweight='bold')
    ax2.set_xlabel('중요도')
    ax2.grid(True, alpha=0.3, axis='x')

    # 8-3. 예측 오차 산점도 (Scatter)
    ax3 = axes[1, 0]
    errors = y_size_test - y_size_pred
    scatter = ax3.scatter(y_size_test, y_size_pred, c=np.abs(errors),
                          cmap='RdYlGn_r', alpha=0.5, s=15, edgecolors='none')
    min_val = min(y_size_test.min(), y_size_pred.min())
    max_val = max(y_size_test.max(), y_size_pred.max())
    ax3.plot([min_val, max_val], [min_val, max_val], 'k--', linewidth=1.5, label='완벽 예측선')
    ax3.set_title(f'예측 오차 산점도 (평균 오차={np.mean(np.abs(errors)):.2f}mm)',
                  fontsize=13, fontweight='bold')
    ax3.set_xlabel('실제 파쇄 크기 (mm)')
    ax3.set_ylabel('예측 파쇄 크기 (mm)')
    ax3.legend(fontsize=10)
    ax3.grid(True, alpha=0.3)
    plt.colorbar(scatter, ax=ax3, label='|오차| (mm)')

    # 8-4. 파쇄 크기 분포 히스토그램
    ax4 = axes[1, 1]
    ax4.hist(y_size_test, bins=40, alpha=0.6, color='#2563eb', label='실제', edgecolor='white')
    ax4.hist(y_size_pred, bins=40, alpha=0.5, color='#dc2626', label='예측', edgecolor='white')
    ax4.axvline(x=np.mean(y_size_test), color='#2563eb', linestyle='--', linewidth=2,
                label=f'실제 평균={np.mean(y_size_test):.1f}mm')
    ax4.axvline(x=np.mean(y_size_pred), color='#dc2626', linestyle='--', linewidth=2,
                label=f'예측 평균={np.mean(y_size_pred):.1f}mm')
    ax4.set_title('파쇄 크기 분포 비교', fontsize=13, fontweight='bold')
    ax4.set_xlabel('파쇄 크기 (mm)')
    ax4.set_ylabel('빈도')
    ax4.legend(fontsize=9)
    ax4.grid(True, alpha=0.3)

    plt.suptitle('Random Forest 파쇄 크기 예측 결과', fontsize=16, fontweight='bold', y=1.01)
    plt.tight_layout()
    save_path = os.path.join(os.path.dirname(__file__), 'random_forest_result.png')
    plt.savefig(save_path, dpi=150, bbox_inches='tight')
    plt.show()
    print(f"  저장 완료: {save_path}")

    # 9. 핵심 요약
    print("\n" + "=" * 60)
    print("  Random Forest 핵심 요약")
    print("=" * 60)
    print(f"""
  ★ 파쇄 크기 예측:
    R²  = {r2_size:.4f}
    MAE = {mae_size:.4f} mm

  ★ 균일도 예측:
    R²  = {r2_unif:.4f}
    MAE = {mae_unif:.4f} %

  ★ 가장 중요한 특징 Top 3:
    1위: {importance.index[0]} ({FEATURE_NAMES_KO[feature_cols.index(importance.index[0])]}) = {importance.values[0]:.4f}
    2위: {importance.index[1]} ({FEATURE_NAMES_KO[feature_cols.index(importance.index[1])]}) = {importance.values[1]:.4f}
    3위: {importance.index[2]} ({FEATURE_NAMES_KO[feature_cols.index(importance.index[2])]}) = {importance.values[2]:.4f}

  ★ Random Forest 장점:
    - 비선형 관계 학습 가능
    - 특징 중요도로 핵심 센서 파악
    - 과적합에 강건 (Bagging 효과)

  ★ Random Forest 단점:
    - 단일 트리보다 모델 크기 큼 (200 트리)
    - 선형 모델보다 해석이 어려움
    - 추론 시 모든 트리 순회 필요
    """)

    return r2_size, mae_size, r2_unif, mae_unif


if __name__ == "__main__":
    run_random_forest_simulation()
