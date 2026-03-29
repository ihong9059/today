"""
Gradient Boosting 시뮬레이션 — 슈레더 칼날 마모율 예측 & RUL 추정
================================================================
Gradient Boosting의 핵심 특징을 체험합니다:
  1. 6채널 센서(CUR-A/B, SPD-A/B, VIB-A/B) → 24개 특징 추출
  2. 순차적 약한 학습기 앙상블 → 오차 보정으로 정밀 예측
  3. 마모율(0~100%) 예측 + 잔여수명(RUL) 시간 추정
  4. 특징 중요도로 어떤 센서가 핵심인지 해석 가능
"""
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # 비대화형 백엔드
import matplotlib.pyplot as plt
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from common_data import generate_shredder_full_data

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False


# ────────────────────────────────────────
# 1. 6채널 센서 준비 (VIB는 3축 RMS로 합성)
# ────────────────────────────────────────
def prepare_6ch_sensors(df):
    """
    common_data의 14종 센서에서 6채널(CUR-A/B, SPD-A/B, VIB-A/B)을 추출합니다.
    VIB-A/B는 3축(x,y,z)의 RMS를 계산하여 단일 값으로 합성합니다.
    """
    result = df[['timestamp', 'CUR_A', 'CUR_B', 'SPD_A', 'SPD_B']].copy()
    # VIB-A: 3축 RMS = sqrt(x² + y² + z²)
    result['VIB_A'] = np.sqrt(df['VIB_A_x']**2 + df['VIB_A_y']**2 + df['VIB_A_z']**2)
    # VIB-B: 3축 RMS
    result['VIB_B'] = np.sqrt(df['VIB_B_x']**2 + df['VIB_B_y']**2 + df['VIB_B_z']**2)

    result['VIB_A'] = np.round(result['VIB_A'], 3)
    result['VIB_B'] = np.round(result['VIB_B'], 3)

    return result


# ────────────────────────────────────────
# 2. 24개 특징 추출
# ────────────────────────────────────────
def extract_24_features(df, window=6):
    """
    6채널 센서 데이터에서 24개 통계 특징을 추출합니다.

    CUR-A/B: mean, std, max, min (8개)
    SPD-A/B: mean, std, max, min (8개)
    VIB-A/B: mean, std, max, min (8개)
    합계: 24개
    """
    feat = pd.DataFrame(index=df.index)

    sensor_cols = ['CUR_A', 'CUR_B', 'SPD_A', 'SPD_B', 'VIB_A', 'VIB_B']

    for col in sensor_cols:
        # 롤링 윈도우 기반 통계 (window=6 → 최근 1시간, 10분 간격 기준)
        rolling = df[col].rolling(window=window, min_periods=1)

        feat[f'{col}_mean'] = rolling.mean()
        feat[f'{col}_std'] = rolling.std().fillna(0)
        feat[f'{col}_max'] = rolling.max()
        feat[f'{col}_min'] = rolling.min()

    return feat


# ────────────────────────────────────────
# 3. 마모율 & RUL 라벨 생성
# ────────────────────────────────────────
def generate_wear_labels(blade_wear_pct_raw, blade_life_hours=500):
    """
    common_data의 blade_wear_pct(0→~30%, 선형 증가)를 사용하여
    마모율(0~100%)과 RUL(잔여수명, 시간)을 생성합니다.

    common_data는 마모에 따라 전류↑, 진동↑ 를 내장하고 있으므로
    센서 특징과 마모율 사이에 물리적 상관관계가 자연스럽게 존재합니다.
    """
    # 원본 0~30%를 0~100%로 스케일링
    max_raw = blade_wear_pct_raw.max()
    if max_raw > 0:
        wear_pct = (blade_wear_pct_raw / max_raw) * 100.0
    else:
        wear_pct = blade_wear_pct_raw * 0.0

    wear_pct = np.clip(wear_pct, 0, 100)

    # RUL: 마모율에서 역산
    rul_hours = blade_life_hours * (1.0 - wear_pct / 100.0)
    rul_hours = np.clip(rul_hours, 0, blade_life_hours)

    return np.round(wear_pct, 2), np.round(rul_hours, 1)


# ────────────────────────────────────────
# 4. 마모 등급 판정
# ────────────────────────────────────────
def classify_wear(wear_rate, rul_hours):
    """마모율 기반 등급 판정"""
    if wear_rate < 50:
        return "양호", "green"
    elif wear_rate < 70:
        return "주의", "yellow"
    elif wear_rate < 85:
        return "경고", "orange"
    else:
        return "위험", "red"


# ────────────────────────────────────────
# 메인 시뮬레이션
# ────────────────────────────────────────
def run_gradient_boosting_simulation():
    print("=" * 65)
    print("  Gradient Boosting 시뮬레이션 — 슈레더 칼날 마모율 & RUL 예측")
    print("=" * 65)

    # ── 1단계: 데이터 생성 (3사이클 × 90일씩) ──
    print("\n[1단계] 슈레더 센서 데이터 생성 (칼날 교체 3사이클)...")

    # 3개의 독립적인 칼날 사이클을 생성하여 연결
    # 각 사이클은 seed를 바꿔 다른 노이즈 패턴 생성
    cycles = []
    for cycle_idx, seed in enumerate([42, 123, 789], 1):
        df_cycle = generate_shredder_full_data(days=90, freq_minutes=10, seed=seed)
        df_cycle['cycle'] = cycle_idx
        cycles.append(df_cycle)
        print(f"  사이클 {cycle_idx}: {len(df_cycle)}건 (seed={seed})")

    df_raw = pd.concat(cycles, ignore_index=True)
    print(f"  총 데이터: {len(df_raw)}건 (3사이클 × 90일)")

    # ── 2단계: 6채널 센서 추출 ──
    print("\n[2단계] 6채널 센서 추출 (CUR-A/B, SPD-A/B, VIB-A/B)...")
    df_6ch = prepare_6ch_sensors(df_raw)
    print(f"  센서: {[c for c in df_6ch.columns if c != 'timestamp']}")

    # ── 3단계: 24개 특징 추출 ──
    print("\n[3단계] 24개 특징 추출 (Feature Extraction)...")
    features = extract_24_features(df_6ch, window=6)
    feature_names = features.columns.tolist()

    print(f"  추출된 특징: {len(feature_names)}개")
    for i, name in enumerate(feature_names, 1):
        print(f"    {i:2d}. {name}")

    # ── 4단계: 마모율 & RUL 라벨 생성 ──
    print("\n[4단계] 마모율 & RUL 라벨 생성 (각 사이클별 0→100%)...")

    # 각 사이클별 독립적으로 마모율 생성 후 연결
    wear_all = []
    rul_all = []
    for cycle_idx in [1, 2, 3]:
        mask = df_raw['cycle'] == cycle_idx
        raw_wear = df_raw.loc[mask, 'blade_wear_pct'].values
        w, r = generate_wear_labels(raw_wear)
        wear_all.append(w)
        rul_all.append(r)

    wear_pct = np.concatenate(wear_all)
    rul_hours = np.concatenate(rul_all)

    print(f"  마모율 범위: {wear_pct.min():.1f}% ~ {wear_pct.max():.1f}%")
    print(f"  RUL 범위: {rul_hours.min():.1f}h ~ {rul_hours.max():.1f}h")

    # ── 5단계: 시계열 분할 ──
    # 사이클 1+2 = Train/Val, 사이클 3 = Test (실제 운영과 동일)
    print("\n[5단계] 시계열 분할 (사이클 1+2 학습, 사이클 3 테스트)...")

    cycle_sizes = [len(c) for c in cycles]
    c1_end = cycle_sizes[0]
    c2_end = c1_end + cycle_sizes[1]

    train_end = int(c2_end * 0.85)  # 사이클 1 전체 + 사이클 2의 85%
    val_end = c2_end                # 사이클 2의 나머지 15% = validation

    X_train = features.iloc[:train_end]
    X_val = features.iloc[train_end:val_end]
    X_test = features.iloc[val_end:]

    y_wear_train = wear_pct[:train_end]
    y_wear_val = wear_pct[train_end:val_end]
    y_wear_test = wear_pct[val_end:]

    y_rul_train = rul_hours[:train_end]
    y_rul_val = rul_hours[train_end:val_end]
    y_rul_test = rul_hours[val_end:]

    print(f"  Train: {len(X_train)} / Val: {len(X_val)} / Test: {len(X_test)}")

    # ── 6단계: Gradient Boosting 모델 학습 ──
    print("\n[6단계] Gradient Boosting 모델 학습...")

    # 마모율 예측 모델
    print("  (1) 마모율 예측 모델 학습 중...")
    model_wear = GradientBoostingRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        min_samples_leaf=10,
        random_state=42
    )
    model_wear.fit(X_train, y_wear_train)
    print("      완료!")

    # RUL 예측 모델
    print("  (2) RUL 예측 모델 학습 중...")
    model_rul = GradientBoostingRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        min_samples_leaf=10,
        random_state=42
    )
    model_rul.fit(X_train, y_rul_train)
    print("      완료!")

    # ── 7단계: 예측 및 평가 ──
    print("\n[7단계] 예측 및 성능 평가...")

    # 마모율 예측
    y_wear_pred = model_wear.predict(X_test)
    wear_mae = mean_absolute_error(y_wear_test, y_wear_pred)
    wear_rmse = np.sqrt(mean_squared_error(y_wear_test, y_wear_pred))
    wear_r2 = r2_score(y_wear_test, y_wear_pred)

    print(f"\n  [마모율 예측 성능]")
    print(f"    R²   = {wear_r2:.4f}")
    print(f"    MAE  = {wear_mae:.2f}%")
    print(f"    RMSE = {wear_rmse:.2f}%")

    # RUL 예측
    y_rul_pred = model_rul.predict(X_test)
    rul_mae = mean_absolute_error(y_rul_test, y_rul_pred)
    rul_rmse = np.sqrt(mean_squared_error(y_rul_test, y_rul_pred))
    rul_r2 = r2_score(y_rul_test, y_rul_pred)

    print(f"\n  [RUL 예측 성능]")
    print(f"    R²   = {rul_r2:.4f}")
    print(f"    MAE  = {rul_mae:.1f}시간")
    print(f"    RMSE = {rul_rmse:.1f}시간")

    # ── 8단계: 특징 중요도 ──
    print("\n[8단계] 특징 중요도 분석 (Gradient Boosting의 핵심 장점!)...")
    importance = pd.Series(model_wear.feature_importances_, index=feature_names)
    importance = importance.sort_values(ascending=False)

    print("  순위 | 특징                     | 중요도")
    print("  " + "-" * 55)
    for i, (name, imp) in enumerate(importance.items(), 1):
        bar = "█" * int(imp * 200)
        print(f"  {i:2d}   | {name:25s} | {imp:.4f} {bar}")

    # ── 9단계: 시각화 (4개 서브플롯) ──
    print("\n[9단계] 결과 시각화...")

    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('Gradient Boosting — 슈레더 칼날 마모 예측 시뮬레이션', fontsize=16, fontweight='bold', y=0.98)

    # 테스트 데이터의 인덱스 (사이클 3)
    test_x = np.arange(len(y_wear_test))

    # ── 서브플롯 1: 실제 vs 예측 마모율 ──
    ax1 = axes[0, 0]
    ax1.plot(test_x, y_wear_test, 'b-', alpha=0.6, linewidth=0.8, label='실제 마모율')
    ax1.plot(test_x, y_wear_pred, 'r--', alpha=0.8, linewidth=0.8, label='GB 예측')
    ax1.axhline(y=70, color='orange', linestyle=':', alpha=0.7, label='주의선 (70%)')
    ax1.axhline(y=85, color='red', linestyle=':', alpha=0.7, label='위험선 (85%)')
    ax1.fill_between(test_x, 85, 100, alpha=0.1, color='red')
    ax1.fill_between(test_x, 70, 85, alpha=0.1, color='orange')
    ax1.set_title(f'① 마모율 예측 (R²={wear_r2:.4f}, MAE={wear_mae:.2f}%)', fontsize=12, fontweight='bold')
    ax1.set_ylabel('마모율 (%)')
    ax1.set_xlabel('테스트 샘플 (사이클 3)')
    ax1.legend(fontsize=8, loc='upper left')
    ax1.grid(True, alpha=0.3)
    ax1.set_ylim(-5, 105)

    # ── 서브플롯 2: 특징 중요도 ──
    ax2 = axes[0, 1]
    top_n = importance.head(15)
    colors = []
    for v in top_n.values:
        if v > 0.08:
            colors.append('#dc2626')  # 높은 중요도 → 빨강
        elif v > 0.04:
            colors.append('#2563eb')  # 중간 → 파랑
        else:
            colors.append('#94a3b8')  # 낮음 → 회색
    ax2.barh(range(len(top_n)), top_n.values, color=colors)
    ax2.set_yticks(range(len(top_n)))
    ax2.set_yticklabels(top_n.index, fontsize=8)
    ax2.invert_yaxis()
    ax2.set_title('② 특징 중요도 — "어떤 센서가 마모 예측에 핵심인가?"', fontsize=11, fontweight='bold')
    ax2.set_xlabel('중요도')
    ax2.grid(True, alpha=0.3, axis='x')

    # ── 서브플롯 3: RUL 예측 ──
    ax3 = axes[1, 0]
    ax3.plot(test_x, y_rul_test, 'b-', alpha=0.6, linewidth=0.8, label='실제 RUL')
    ax3.plot(test_x, y_rul_pred, 'r--', alpha=0.8, linewidth=0.8, label='GB 예측 RUL')
    ax3.axhline(y=50, color='orange', linestyle=':', alpha=0.7, label='교체 준비선 (50h)')
    ax3.axhline(y=20, color='red', linestyle=':', alpha=0.7, label='긴급 교체선 (20h)')
    ax3.fill_between(test_x, 0, 20, alpha=0.1, color='red')
    ax3.fill_between(test_x, 20, 50, alpha=0.1, color='orange')
    ax3.set_title(f'③ RUL 잔여수명 예측 (R²={rul_r2:.4f}, MAE={rul_mae:.1f}h)', fontsize=12, fontweight='bold')
    ax3.set_ylabel('잔여수명 (시간)')
    ax3.set_xlabel('테스트 샘플 (사이클 3)')
    ax3.legend(fontsize=8, loc='upper right')
    ax3.grid(True, alpha=0.3)

    # ── 서브플롯 4: 예측 오차 분포 ──
    ax4 = axes[1, 1]
    errors = y_wear_test - y_wear_pred
    ax4.hist(errors, bins=60, color='steelblue', alpha=0.7, edgecolor='white', density=True)
    ax4.axvline(x=0, color='red', linestyle='--', linewidth=2, label='오차=0')
    ax4.axvline(x=np.mean(errors), color='orange', linestyle='-', linewidth=1.5,
                label=f'평균={np.mean(errors):.2f}%')
    # 정규분포 커브
    from scipy.stats import norm
    x_range = np.linspace(errors.min(), errors.max(), 100)
    ax4.plot(x_range, norm.pdf(x_range, np.mean(errors), np.std(errors)),
             'r-', linewidth=2, alpha=0.7, label=f'정규분포 (σ={np.std(errors):.2f}%)')
    ax4.set_title(f'④ 예측 오차 분포 (평균={np.mean(errors):.2f}%, σ={np.std(errors):.2f}%)',
                  fontsize=12, fontweight='bold')
    ax4.set_xlabel('예측 오차 (%)')
    ax4.set_ylabel('밀도')
    ax4.legend(fontsize=8)
    ax4.grid(True, alpha=0.3)

    plt.tight_layout(rect=[0, 0, 1, 0.96])
    save_path = os.path.join(os.path.dirname(__file__), 'gradient_boosting_result.png')
    plt.savefig(save_path, dpi=150, bbox_inches='tight')
    print(f"  저장 완료: {save_path}")

    # ── 결과 요약 ──
    print("\n" + "=" * 65)
    print("  Gradient Boosting 시뮬레이션 결과 요약")
    print("=" * 65)
    print(f"""
  마모율 R²  = {wear_r2:.4f}   MAE = {wear_mae:.2f}%
  RUL R²     = {rul_r2:.4f}   MAE = {rul_mae:.1f}시간

  상위 5개 핵심 특징:""")
    for i, (name, imp) in enumerate(importance.head(5).items(), 1):
        print(f"    {i}. {name} (중요도: {imp:.4f})")

    print(f"""
  Gradient Boosting 장점:
    - 앙상블 방식: 약한 학습기를 순차적으로 결합 → 높은 정확도
    - 특징 중요도: 어떤 센서가 마모에 가장 중요한지 해석 가능
    - 빠른 추론: <5ms (Edge 디바이스 배포 적합)
    - 정형 데이터 처리: 숫자 테이블 예측에서 딥러닝보다 우수

  Gradient Boosting 단점:
    - 노이즈 민감: 이상치에 과도하게 반응할 수 있음
    - 과적합 위험: 트리 개수/깊이 조절 필요
    - 순차 학습: 병렬 학습 불가 (XGBoost/LightGBM으로 개선)

  슈레더 적용:
    - 칼날 마모 모니터링 → 사전 교체 계획
    - RUL 기반 정비 스케줄링
    - 특징 중요도로 센서 이상 간접 감지
    """)

    return {
        'wear_r2': wear_r2, 'wear_mae': wear_mae,
        'rul_r2': rul_r2, 'rul_mae': rul_mae,
        'top_features': importance.head(5).to_dict()
    }


if __name__ == "__main__":
    results = run_gradient_boosting_simulation()
