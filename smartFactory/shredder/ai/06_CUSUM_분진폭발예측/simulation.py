"""
CUSUM 분진 폭발 예측 시뮬레이션
================================
CUSUM(누적합 관리도)을 이용한 분진 폭발 위험 조기 감지:
  1. DST-1 레이저 분진 센서 데이터 생성 (mg/m³)
  2. CUSUM+ / CUSUM- 통계량 계산
  3. 제어 한계(h) 초과 시 이상 감지
  4. 선형 외삽으로 위험 수준 도달 시간 예측
  5. 폭발 위험도(0~1) 종합 계산

  ※ common_data.py의 슈레더 가동 패턴(idle 마스크)을 활용하여
    분진 농도 시뮬레이션 데이터를 생성합니다.
"""
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from common_data import generate_shredder_full_data

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False


# ─────────────────────────────────────────────
# 1. 분진 농도 데이터 생성
# ─────────────────────────────────────────────
def generate_dust_data(days=7, freq_seconds=60, seed=42):
    """
    DST-1 레이저 분진 센서 시뮬레이션 데이터 생성

    Parameters:
        days: 생성 일수 (기본 7일)
        freq_seconds: 샘플링 간격 (초)
        seed: 랜덤 시드

    Returns:
        DataFrame: timestamp, dust_mg_m3 (분진 농도 mg/m³)
    """
    np.random.seed(seed)

    n_points = days * 24 * 3600 // freq_seconds
    timestamps = pd.date_range(
        start='2026-03-01',
        periods=n_points,
        freq=f'{freq_seconds}s'
    )

    hours = np.array([ts.hour for ts in timestamps])
    dow = np.array([ts.dayofweek for ts in timestamps])
    t = np.arange(n_points)

    # 가동/비가동 패턴
    weekend = dow >= 5
    night = (hours >= 22) | (hours < 6)
    idle = weekend | night

    # 기본 분진 농도 (mg/m³)
    base = 5.0
    daily_pattern = 2.0 * np.sin(2 * np.pi * hours / 24 - np.pi / 3)
    noise = np.random.normal(0, 1.2, n_points)
    idle_effect = np.where(idle, -4.0, 0.0)

    dust = base + daily_pattern + noise + idle_effect

    # === 이벤트 1: 점진적 농도 상승 (3일차~4일차, 느린 드리프트) ===
    #     필터 막힘 / 환기 성능 저하 시나리오
    day3_start = 3 * 24 * 3600 // freq_seconds
    day4_end = 4 * 24 * 3600 // freq_seconds
    if day3_start < n_points and day4_end > day3_start:
        day4_end = min(day4_end, n_points)
        drift_region = np.zeros(n_points)
        drift_len = day4_end - day3_start
        drift_region[day3_start:day4_end] = np.linspace(0, 25, drift_len)
        dust += drift_region

    # === 이벤트 2: 급격한 스파이크 (5일차 14시경) ===
    #     대량 투입 충격 / 파쇄 충격
    spike_center = (5 * 24 + 14) * 3600 // freq_seconds
    if spike_center < n_points:
        spike_width = 600 // freq_seconds  # 10분간
        spike_start = max(0, spike_center - spike_width)
        spike_end = min(n_points, spike_center + spike_width)
        dust[spike_start:spike_end] += np.random.uniform(25, 45, spike_end - spike_start)

    # === 이벤트 3: 소규모 반복 상승 (6일차) ===
    #     간헐적 재료 걸림 / 분진 재부유
    day6_start = 6 * 24 * 3600 // freq_seconds
    if day6_start < n_points:
        day6_end = min(n_points, (6 * 24 + 16) * 3600 // freq_seconds)
        step = max(1, 1800 // freq_seconds)
        for i in range(day6_start, day6_end, step):
            end = min(i + 300 // freq_seconds, n_points)
            dust[i:end] += np.random.uniform(8, 18)

    dust = np.clip(dust, 0.1, 50)

    return pd.DataFrame({
        'timestamp': timestamps,
        'dust_mg_m3': np.round(dust, 2)
    })


# ─────────────────────────────────────────────
# 2. CUSUM 알고리즘
# ─────────────────────────────────────────────
class CUSUMDetector:
    """
    CUSUM(누적합) 관리도 기반 분진 폭발 위험 감지

    Parameters:
        mu_0: 정상 평균 (mg/m³)
        sigma: 정상 표준편차
        k_factor: 허용 편이 배수 (k = k_factor * sigma)
        h_factor: 결정 구간 배수 (h = h_factor * sigma)
    """

    def __init__(self, mu_0=5.0, sigma=1.5, k_factor=0.5, h_factor=5.0):
        self.mu_0 = mu_0
        self.sigma = sigma
        self.k = k_factor * sigma   # 허용 편이 (slack value)
        self.h = h_factor * sigma   # 결정 구간 (decision interval)

        # CUSUM 상태
        self.S_plus = 0.0    # 상향 CUSUM (농도 증가 감지)
        self.S_minus = 0.0   # 하향 CUSUM (농도 감소 = 센서 이상 감지)

        # LEL 기준
        self.LEL_g_m3 = 40.0   # 하한폭발한계 (g/m³), 리튬/흑연
        self.LEL_mg_m3 = self.LEL_g_m3 * 1000   # mg/m³
        self.WARNING_PCT = 25  # LEL 25%에서 경고

    def update(self, x):
        """단일 측정값으로 CUSUM 업데이트"""
        self.S_plus = max(0.0, self.S_plus + (x - self.mu_0 - self.k))
        self.S_minus = max(0.0, self.S_minus + (self.mu_0 - self.k - x))

        return self.S_plus, self.S_minus

    def is_alarm(self):
        """상향 CUSUM이 임계값 초과 여부"""
        return self.S_plus > self.h

    def reset(self):
        """CUSUM 리셋"""
        self.S_plus = 0.0
        self.S_minus = 0.0

    def run(self, data):
        """전체 시계열에 대해 CUSUM 실행 (벡터화)"""
        n = len(data)
        s_plus_arr = np.zeros(n)
        s_minus_arr = np.zeros(n)

        # 증분 계산
        delta_plus = data - self.mu_0 - self.k
        delta_minus = self.mu_0 - self.k - data

        # 누적합 (max(0, ...) 때문에 순차 필요하지만 최적화)
        sp = 0.0
        sm = 0.0
        for i in range(n):
            sp = max(0.0, sp + delta_plus[i])
            sm = max(0.0, sm + delta_minus[i])
            s_plus_arr[i] = sp
            s_minus_arr[i] = sm

        alarms = s_plus_arr > self.h
        return s_plus_arr, s_minus_arr, alarms


# ─────────────────────────────────────────────
# 3. 트렌드 예측 (위험 도달 시간)
# ─────────────────────────────────────────────
def predict_time_to_danger(dust_values, timestamps, window=180,
                            danger_level_mg=10000.0, freq_seconds=60,
                            stride=10):
    """
    슬라이딩 윈도우 선형 외삽으로 위험 수준 도달 시간 예측

    Parameters:
        dust_values: 분진 농도 배열 (mg/m³)
        timestamps: 시간 배열
        window: 회귀에 사용할 과거 데이터 포인트 수 (기본 180 = 3시간@60초)
        danger_level_mg: 위험 농도 (mg/m³, LEL 25% = 10,000)
        freq_seconds: 샘플링 간격 (초)
        stride: 계산 간격 (매 stride 포인트마다 계산, 중간은 보간)

    Returns:
        time_to_danger_min: 각 시점에서 위험 도달까지 예상 시간 (분), None이면 np.nan
    """
    n = len(dust_values)
    ttd = np.full(n, np.nan)

    # 사전 계산: x_axis 통계
    x_axis = np.arange(window, dtype=float)
    x_mean = x_axis.mean()
    x_var = np.sum((x_axis - x_mean) ** 2)

    for i in range(window, n, stride):
        segment = dust_values[i - window:i]
        y_mean = segment.mean()
        slope = np.sum((x_axis - x_mean) * (segment - y_mean)) / (x_var + 1e-12)

        if slope > 0.001:  # 의미 있는 상승 추세일 때만
            current = segment[-1]
            if current < danger_level_mg:
                remaining = danger_level_mg - current
                steps_to_danger = remaining / slope
                val = (steps_to_danger * freq_seconds) / 60.0  # 분 단위
                # stride 구간 채우기
                end = min(i + stride, n)
                ttd[i:end] = val

    return ttd


# ─────────────────────────────────────────────
# 4. 폭발 위험도 계산 (0~1)
# ─────────────────────────────────────────────
def calculate_explosion_risk(dust_values, s_plus, h, ttd,
                              lel_mg=40000.0):
    """
    종합 폭발 위험도 계산

    risk = w1 * (dust / LEL_warning) + w2 * (S+ / h) + w3 * time_urgency

    Parameters:
        dust_values: 분진 농도 (mg/m³)
        s_plus: CUSUM+ 배열
        h: CUSUM 임계값
        ttd: time-to-danger 배열 (분)
        lel_mg: LEL (mg/m³)

    Returns:
        risk: 0~1 위험도 배열
    """
    n = len(dust_values)
    risk = np.zeros(n)

    warning_level = lel_mg * 0.25  # LEL 25%

    for i in range(n):
        # (1) 농도 비율 (LEL 25% 대비)
        conc_ratio = min(dust_values[i] / warning_level, 1.0)

        # (2) CUSUM 비율
        cusum_ratio = min(s_plus[i] / (h * 2), 1.0) if h > 0 else 0.0

        # (3) 시간 긴급도 (30분 이내면 위험)
        if not np.isnan(ttd[i]) and ttd[i] < 60:
            time_urgency = max(0, 1.0 - ttd[i] / 60.0)
        else:
            time_urgency = 0.0

        # 가중 합산
        risk[i] = 0.4 * conc_ratio + 0.35 * cusum_ratio + 0.25 * time_urgency

    return np.clip(risk, 0, 1)


# ─────────────────────────────────────────────
# 5. 메인 시뮬레이션
# ─────────────────────────────────────────────
def run_cusum_simulation():
    print("=" * 60)
    print("  CUSUM 분진 폭발 예측 시뮬레이션")
    print("  (DST-1 레이저 분진 센서 기반)")
    print("=" * 60)

    # ── 데이터 생성 ──
    print("\n[1단계] 분진 농도 데이터 생성 (7일, 60초 간격)...")
    df = generate_dust_data(days=7, freq_seconds=60, seed=42)
    print(f"  데이터: {len(df)}건 ({df['timestamp'].min()} ~ {df['timestamp'].max()})")
    print(f"  분진 농도 범위: {df['dust_mg_m3'].min():.1f} ~ {df['dust_mg_m3'].max():.1f} mg/m³")

    dust = df['dust_mg_m3'].values
    ts = df['timestamp'].values

    # ── 정상 구간에서 기준값 산출 (1~2일차) ──
    normal_end = 2 * 24 * 3600 // 60
    normal_data = dust[:normal_end]
    mu_0 = np.mean(normal_data)
    sigma = np.std(normal_data)
    print(f"\n[2단계] 정상 기준선 산출 (1~2일차)")
    print(f"  정상 평균 μ₀ = {mu_0:.2f} mg/m³")
    print(f"  정상 표준편차 σ = {sigma:.2f} mg/m³")

    # ── CUSUM 실행 ──
    print("\n[3단계] CUSUM 알고리즘 실행...")
    detector = CUSUMDetector(mu_0=mu_0, sigma=sigma, k_factor=0.5, h_factor=5.0)
    print(f"  파라미터: k = {detector.k:.2f}, h = {detector.h:.2f}")

    s_plus, s_minus, alarms = detector.run(dust)

    alarm_count = np.sum(alarms)
    alarm_start_idx = np.argmax(alarms) if alarm_count > 0 else None
    print(f"  경보 발생: {alarm_count}건")
    if alarm_start_idx is not None:
        print(f"  첫 경보 시각: {ts[alarm_start_idx]}")

    # ── 트렌드 예측 ──
    print("\n[4단계] 위험 도달 시간 예측 (선형 외삽)...")
    # 트렌드 예측 기준: 현장 비상 정지 수준 (50 mg/m³)
    # (실제 LEL 25% = 10,000 mg/m³는 훨씬 높지만, 현장에서는 50 mg/m³에서 비상 조치)
    danger_level = 50.0  # mg/m³
    ttd = predict_time_to_danger(dust, ts, window=180,
                                  danger_level_mg=danger_level, freq_seconds=60,
                                  stride=10)
    valid_ttd = ttd[~np.isnan(ttd)]
    if len(valid_ttd) > 0:
        print(f"  예측 가능 구간: {len(valid_ttd)}건")
        print(f"  최소 예상 도달 시간: {valid_ttd.min():.1f}분")
    else:
        print("  (위험 수준 접근 구간 없음)")

    # ── 위험도 계산 ──
    print("\n[5단계] 종합 폭발 위험도 계산...")
    risk = calculate_explosion_risk(dust, s_plus, detector.h, ttd,
                                     lel_mg=200.0)  # 현장 관리 기준 (200 mg/m³)
    print(f"  최대 위험도: {risk.max():.3f}")
    print(f"  평균 위험도: {risk.mean():.4f}")

    high_risk = risk > 0.5
    if np.any(high_risk):
        print(f"  고위험(>0.5) 구간: {np.sum(high_risk)}건")

    # ── 그래프 생성 ──
    print("\n[6단계] 결과 시각화 (cusum_result.png)...")
    plot_results(df, s_plus, s_minus, detector.h, alarms, risk, ttd, danger_level)
    print("  cusum_result.png 저장 완료!")

    # ── 요약 ──
    print("\n" + "=" * 60)
    print("  시뮬레이션 요약")
    print("=" * 60)
    print(f"  알고리즘       : CUSUM (누적합 관리도)")
    print(f"  데이터         : 7일, 60초 간격, {len(df)}건")
    print(f"  정상 기준      : μ₀={mu_0:.2f}, σ={sigma:.2f}")
    print(f"  CUSUM 파라미터 : k={detector.k:.2f}, h={detector.h:.2f}")
    print(f"  경보 횟수      : {alarm_count}건")
    print(f"  최대 위험도    : {risk.max():.3f}")
    print("=" * 60)


# ─────────────────────────────────────────────
# 6. 시각화
# ─────────────────────────────────────────────
def plot_results(df, s_plus, s_minus, h, alarms, risk, ttd, danger_level):
    """4-panel 결과 그래프 생성"""
    fig, axes = plt.subplots(4, 1, figsize=(16, 14), sharex=True)
    fig.suptitle('CUSUM 분진 폭발 예측 시뮬레이션 결과', fontsize=18, fontweight='bold', y=0.98)

    ts = df['timestamp']
    dust = df['dust_mg_m3']

    # ── 패널 1: 분진 농도 시계열 ──
    ax1 = axes[0]
    ax1.plot(ts, dust, color='#2563eb', linewidth=0.5, alpha=0.8, label='분진 농도 (mg/m³)')
    # 로컬 경고 수준 (현장 관리 기준)
    local_warning = 30.0  # mg/m³ — 현장 환기 강화 기준
    ax1.axhline(y=local_warning, color='#d97706', linestyle='--', linewidth=1.5,
                label=f'현장 경고선 ({local_warning:.0f} mg/m³)')
    ax1.axhline(y=50.0, color='#dc2626', linestyle='--', linewidth=1.5,
                label=f'비상 정지선 (50 mg/m³)')

    # 경보 구간 표시
    alarm_regions = _find_contiguous_regions(alarms)
    for start, end in alarm_regions:
        ax1.axvspan(ts.iloc[start], ts.iloc[min(end, len(ts) - 1)],
                    alpha=0.15, color='red')

    ax1.set_ylabel('분진 농도 (mg/m³)', fontsize=11)
    ax1.set_title('① 분진 농도 시계열 (DST-1 레이저 센서)', fontsize=13, fontweight='bold')
    ax1.legend(loc='upper left', fontsize=9)
    ax1.grid(True, alpha=0.3)

    # ── 패널 2: CUSUM+ / CUSUM- ──
    ax2 = axes[1]
    ax2.plot(ts, s_plus, color='#dc2626', linewidth=0.8, label='CUSUM+ (상향)')
    ax2.plot(ts, s_minus, color='#2563eb', linewidth=0.8, label='CUSUM- (하향)')
    ax2.axhline(y=h, color='#dc2626', linestyle='--', linewidth=2, alpha=0.7,
                label=f'제어 한계 h = {h:.1f}')
    ax2.fill_between(ts, s_plus, alpha=0.15, color='#dc2626')
    ax2.fill_between(ts, s_minus, alpha=0.10, color='#2563eb')
    ax2.set_ylabel('CUSUM 통계량', fontsize=11)
    ax2.set_title('② CUSUM+ / CUSUM- 관리도', fontsize=13, fontweight='bold')
    ax2.legend(loc='upper left', fontsize=9)
    ax2.grid(True, alpha=0.3)

    # ── 패널 3: 폭발 위험도 ──
    ax3 = axes[2]
    # 위험도 구간별 색상 채우기
    risk_levels = [
        (0.7, 1.1, '#dc2626', 0.5),
        (0.4, 0.7, '#d97706', 0.4),
        (0.2, 0.4, '#f59e0b', 0.3),
        (0.0, 0.2, '#059669', 0.2),
    ]
    for lo, hi, color, alpha in risk_levels:
        mask = (risk >= lo) & (risk < hi)
        if np.any(mask):
            ax3.fill_between(ts, 0, risk, where=mask, alpha=alpha, color=color)
    ax3.plot(ts, risk, color='#374151', linewidth=0.5, alpha=0.6)

    ax3.axhline(y=0.7, color='#dc2626', linestyle='--', alpha=0.6, label='위험 (0.7)')
    ax3.axhline(y=0.4, color='#d97706', linestyle='--', alpha=0.6, label='경고 (0.4)')
    ax3.axhline(y=0.2, color='#f59e0b', linestyle='--', alpha=0.6, label='주의 (0.2)')
    ax3.set_ylabel('폭발 위험도', fontsize=11)
    ax3.set_ylim(-0.05, 1.05)
    ax3.set_title('③ 종합 폭발 위험도 (0 = 안전, 1 = 위험)', fontsize=13, fontweight='bold')
    ax3.legend(loc='upper left', fontsize=9)
    ax3.grid(True, alpha=0.3)

    # ── 패널 4: 위험 도달 예상 시간 ──
    ax4 = axes[3]
    valid_mask = ~np.isnan(ttd)
    ttd_clipped = np.clip(ttd, 0, 120)  # 120분 이상은 클리핑

    if np.any(valid_mask):
        ax4.scatter(ts[valid_mask], ttd_clipped[valid_mask], c=ttd_clipped[valid_mask],
                    cmap='RdYlGn', s=1, alpha=0.6, vmin=0, vmax=120)
        ax4.axhline(y=10, color='#dc2626', linestyle='--', linewidth=1.5,
                    label='긴급 (10분 이내)')
        ax4.axhline(y=30, color='#d97706', linestyle='--', linewidth=1.5,
                    label='경고 (30분 이내)')

    ax4.set_ylabel('위험 도달 예상 (분)', fontsize=11)
    ax4.set_xlabel('시간', fontsize=11)
    ax4.set_ylim(-5, 125)
    ax4.set_title('④ 위험 수준 도달 예상 시간 (선형 외삽)', fontsize=13, fontweight='bold')
    ax4.legend(loc='upper right', fontsize=9)
    ax4.grid(True, alpha=0.3)

    plt.tight_layout(rect=[0, 0, 1, 0.96])
    save_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cusum_result.png')
    plt.savefig(save_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()


def _find_contiguous_regions(mask):
    """True 연속 구간의 (start, end) 리스트 반환"""
    regions = []
    in_region = False
    start = 0
    for i, v in enumerate(mask):
        if v and not in_region:
            start = i
            in_region = True
        elif not v and in_region:
            regions.append((start, i))
            in_region = False
    if in_region:
        regions.append((start, len(mask)))
    return regions


# ─────────────────────────────────────────────
if __name__ == "__main__":
    run_cusum_simulation()
