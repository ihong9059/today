"""
모델 3: Classical DSP 축 불균형 진단 시뮬레이션
================================================
- FFT 기반 1X 회전 주파수 성분 추출
- ISO 10816 기준 불균형 레벨 판정
- 결과 시각화: 시간 도메인, FFT 스펙트럼, 트렌드, 분류 파이차트
"""

import sys
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager
from scipy.fft import fft, fftfreq

# ── 한글 폰트 설정 ──
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

# ── common_data 임포트 ──
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from common_data import generate_shredder_full_data

# ==============================================================================
# 1. 설정값
# ==============================================================================
FS = 10000          # 샘플링 주파수 (Hz)
DURATION = 1.0      # 신호 길이 (초)
RPM_A = 120         # 축A 정격 RPM
RPM_B = 80          # 축B 정격 RPM

# ISO 10816-3 기준 (mm/s RMS) — Group 3: 대형 산업기계
ISO_LIMITS = {
    'good':   2.8,   # 양호 상한
    'alarm':  7.1,   # 경고 상한
    'danger': 11.2,  # 위험 상한
}


# ==============================================================================
# 2. 진동 신호 생성 함수
# ==============================================================================
def generate_vibration_signal(rpm, imbalance_mm_s=0.0, noise_std=0.5, seed=None):
    """
    축 진동 시간 도메인 신호 생성

    Args:
        rpm: 회전속도 (RPM)
        imbalance_mm_s: 1X 불균형 진폭 (mm/s)
        noise_std: 배경 노이즈 표준편차 (mm/s)
        seed: 랜덤 시드
    Returns:
        t: 시간 배열 (초)
        signal: 진동 신호 (mm/s)
    """
    if seed is not None:
        np.random.seed(seed)

    n = int(DURATION * FS)
    t = np.linspace(0, DURATION, n, endpoint=False)
    f_1x = rpm / 60.0  # 1X 주파수 (Hz)

    # 1X 회전 주파수 성분 (불균형)
    signal = imbalance_mm_s * np.sin(2 * np.pi * f_1x * t + np.random.uniform(0, 2 * np.pi))

    # 2X 성분 (미스얼라인먼트 소량)
    signal += (imbalance_mm_s * 0.15) * np.sin(
        2 * np.pi * 2 * f_1x * t + np.random.uniform(0, 2 * np.pi))

    # 3X 성분 (칼날 통과 소량)
    signal += (imbalance_mm_s * 0.08) * np.sin(
        2 * np.pi * 3 * f_1x * t + np.random.uniform(0, 2 * np.pi))

    # 배경 기계 노이즈
    signal += np.random.normal(0, noise_std, n)

    # 고주파 기계 노이즈
    for freq in [150, 300, 500]:
        signal += np.random.uniform(0.05, 0.15) * np.sin(
            2 * np.pi * freq * t + np.random.uniform(0, 2 * np.pi))

    return t, signal


# ==============================================================================
# 3. FFT 및 1X 성분 추출
# ==============================================================================
def extract_1x_amplitude(signal, rpm, fs=FS):
    """
    FFT로 1X 회전주파수 성분 진폭(mm/s) 추출

    Args:
        signal: 시간 도메인 진동 신호
        rpm: 축 회전속도 (RPM)
        fs: 샘플링 주파수
    Returns:
        freqs: 주파수 배열
        magnitudes: 진폭 스펙트럼 (mm/s)
        amp_1x: 1X 성분 진폭 (mm/s)
        idx_1x: 1X 성분 인덱스
    """
    n = len(signal)
    f_1x = rpm / 60.0

    # FFT 수행
    fft_vals = fft(signal)
    freqs = fftfreq(n, 1.0 / fs)

    # 양의 주파수 절반만
    half_n = n // 2
    freqs = freqs[:half_n]
    magnitudes = (2.0 / n) * np.abs(fft_vals[:half_n])

    # 1X 주파수 근방 (±0.5Hz)에서 최대값
    tolerance = 0.5
    mask = (np.abs(freqs - f_1x) <= tolerance)
    if np.any(mask):
        candidates = magnitudes.copy()
        candidates[~mask] = 0
        idx_1x = np.argmax(candidates)
        amp_1x = magnitudes[idx_1x]
    else:
        idx_1x = 0
        amp_1x = 0.0

    return freqs, magnitudes, amp_1x, idx_1x


def classify_level(amp_mm_s):
    """ISO 10816 기준 판정"""
    if amp_mm_s <= ISO_LIMITS['good']:
        return '정상', '#22c55e'
    elif amp_mm_s <= ISO_LIMITS['alarm']:
        return '경고', '#f59e0b'
    else:
        return '위험', '#ef4444'


# ==============================================================================
# 4. 트렌드 시계열 생성 (common_data 활용)
# ==============================================================================
def generate_trend_data(n_points=200, seed=42):
    """
    common_data의 VIB_A/VIB_B 시계열을 활용하고,
    추가로 1X 진폭 시뮬레이션 트렌드를 생성한다.

    Returns:
        timestamps, levels_a, levels_b, labels
    """
    np.random.seed(seed)

    # common_data에서 가동 시간대 데이터 추출
    df = generate_shredder_full_data(days=30, freq_minutes=60, seed=seed)
    # 가동 중인 데이터만 (VIB_A_z > 1.0)
    vib_col_a = 'VIB_A_z' if 'VIB_A_z' in df.columns else 'VIB_A'
    vib_col_b = 'VIB_B_z' if 'VIB_B_z' in df.columns else 'VIB_B'
    operating = df[df[vib_col_a] > 1.0].head(n_points)

    if len(operating) < n_points:
        # 부족분은 보충
        extra_needed = n_points - len(operating)
        df2 = generate_shredder_full_data(days=60, freq_minutes=30, seed=seed + 1)
        vib_col_a2 = 'VIB_A_z' if 'VIB_A_z' in df2.columns else 'VIB_A'
        extra = df2[df2[vib_col_a2] > 1.0].head(extra_needed)
        operating = pd.concat([operating, extra]).head(n_points)

    timestamps = operating['timestamp'].values

    # VIB_A/B 기반 + 점진적 악화 트렌드 (정상 → 경고 → 위험)
    n_actual = len(operating)
    base_a = operating[vib_col_a].values * 0.3  # base noise from common_data
    base_b = operating[vib_col_b].values * 0.3

    # 축A: 점진적 악화 시나리오
    degradation = np.zeros(n_actual)
    for i in range(n_actual):
        if i < int(n_actual * 0.4):
            degradation[i] = 1.5 + 0.015 * i  # 정상 구간
        elif i < int(n_actual * 0.75):
            degradation[i] = 2.8 + 0.06 * (i - int(n_actual * 0.4))  # 경고 구간
        else:
            degradation[i] = 7.1 + 0.08 * (i - int(n_actual * 0.75))  # 위험 구간

    levels_a = base_a + degradation + np.random.normal(0, 0.3, n_actual)
    levels_b = base_b + 1.5 + 0.005 * np.arange(n_actual) + np.random.normal(0, 0.2, n_actual)
    levels_a = np.clip(levels_a, 0.5, 15.0)
    levels_b = np.clip(levels_b, 0.5, 10.0)

    labels = []
    for a, b in zip(levels_a, levels_b):
        mx = max(a, b)
        labels.append(classify_level(mx)[0])

    return timestamps, levels_a, levels_b, labels


# ==============================================================================
# 5. 메인 시뮬레이션 및 시각화
# ==============================================================================
def run_simulation():
    """전체 시뮬레이션 실행 및 4-패널 결과 이미지 생성"""

    print("=" * 60)
    print("  모델 3: Classical DSP 축 불균형 진단 시뮬레이션")
    print("=" * 60)

    # ── (A) 3가지 시나리오 신호 생성 ──
    scenarios = [
        {'name': '정상',  'imbalance': 1.8,  'color': '#22c55e', 'seed': 10},
        {'name': '경고',  'imbalance': 5.5,  'color': '#f59e0b', 'seed': 20},
        {'name': '위험',  'imbalance': 10.0, 'color': '#ef4444', 'seed': 30},
    ]

    results = []
    for sc in scenarios:
        t, sig = generate_vibration_signal(RPM_A, imbalance_mm_s=sc['imbalance'],
                                           noise_std=0.5, seed=sc['seed'])
        freqs, mags, amp_1x, idx_1x = extract_1x_amplitude(sig, RPM_A)
        level, color = classify_level(amp_1x)
        results.append({
            't': t, 'signal': sig,
            'freqs': freqs, 'mags': mags,
            'amp_1x': amp_1x, 'idx_1x': idx_1x,
            'level': level, 'color': color,
            'scenario': sc,
        })
        print(f"\n[{sc['name']} 시나리오]")
        print(f"  입력 불균형: {sc['imbalance']:.1f} mm/s")
        print(f"  FFT 추출 1X 진폭: {amp_1x:.2f} mm/s")
        print(f"  판정: {level}")

    # ── (B) 트렌드 데이터 ──
    try:
        import pandas as pd
        timestamps, levels_a, levels_b, labels = generate_trend_data(n_points=200)
    except Exception:
        # pandas 없으면 자체 생성
        np.random.seed(42)
        n_pts = 200
        timestamps = np.arange(n_pts)
        levels_a = np.concatenate([
            1.5 + 0.01 * np.arange(80) + np.random.normal(0, 0.3, 80),
            2.8 + 0.05 * np.arange(70) + np.random.normal(0, 0.4, 70),
            7.1 + 0.06 * np.arange(50) + np.random.normal(0, 0.5, 50),
        ])
        levels_a = np.clip(levels_a, 0.5, 15.0)
        levels_b = 1.8 + 0.005 * np.arange(n_pts) + np.random.normal(0, 0.25, n_pts)
        levels_b = np.clip(levels_b, 0.5, 10.0)
        labels = []
        for a, b in zip(levels_a, levels_b):
            labels.append(classify_level(max(a, b))[0])

    # ── (C) 분류 분포 ──
    dist = {'정상': labels.count('정상'), '경고': labels.count('경고'), '위험': labels.count('위험')}
    print(f"\n[트렌드 분석 결과]")
    print(f"  총 {len(labels)}건: 정상 {dist['정상']}건, 경고 {dist['경고']}건, 위험 {dist['위험']}건")

    # ==================================================================
    # 시각화 (4 패널)
    # ==================================================================
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('모델 3: Classical DSP 축 불균형 진단 — 시뮬레이션 결과',
                 fontsize=18, fontweight='bold', y=0.98)
    fig.patch.set_facecolor('#fafafa')

    # ── 패널 1: 시간 도메인 진동 신호 ──
    ax1 = axes[0, 0]
    # 경고 시나리오 표시 (가장 특징적)
    r = results[1]  # 경고 시나리오
    t_ms = r['t'][:500] * 1000  # 처음 50ms만 표시
    ax1.plot(t_ms, r['signal'][:500], color='#2563eb', linewidth=0.6, alpha=0.8)
    ax1.axhline(y=0, color='#94a3b8', linewidth=0.5, linestyle='--')
    ax1.set_title('시간 도메인 진동 신호 (경고 시나리오, 축A)', fontsize=13, fontweight='bold')
    ax1.set_xlabel('시간 (ms)', fontsize=11)
    ax1.set_ylabel('진동 속도 (mm/s)', fontsize=11)
    ax1.set_xlim(0, 50)

    # 1X 주기 표시
    f_1x = RPM_A / 60.0
    period_ms = 1000.0 / f_1x
    for i in range(1, 4):
        ax1.axvline(x=i * period_ms, color='#ef4444', linewidth=0.8, linestyle=':',
                    alpha=0.5)
    ax1.annotate(f'1X 주기 = {period_ms:.1f}ms\n(f₁ₓ = {f_1x:.1f}Hz, RPM={RPM_A})',
                 xy=(period_ms, max(r['signal'][:500]) * 0.8),
                 fontsize=9, color='#ef4444',
                 bbox=dict(boxstyle='round,pad=0.3', facecolor='#fee2e2', alpha=0.8))
    ax1.grid(True, alpha=0.3)
    ax1.tick_params(labelsize=9)

    # ── 패널 2: FFT 주파수 스펙트럼 ──
    ax2 = axes[0, 1]
    colors_fft = ['#22c55e', '#f59e0b', '#ef4444']
    for i, r in enumerate(results):
        sc = r['scenario']
        # 0~20Hz 범위만
        mask20 = r['freqs'] <= 20
        ax2.plot(r['freqs'][mask20], r['mags'][mask20],
                 color=colors_fft[i], linewidth=1.2, alpha=0.85,
                 label=f"{sc['name']} (1X={r['amp_1x']:.1f} mm/s)")
        # 1X 피크 마커
        ax2.plot(r['freqs'][r['idx_1x']], r['mags'][r['idx_1x']],
                 'v', color=colors_fft[i], markersize=10)

    # ISO 기준선
    ax2.axhline(y=ISO_LIMITS['good'], color='#22c55e', linewidth=1, linestyle='--',
                alpha=0.6, label=f"양호 기준 ({ISO_LIMITS['good']} mm/s)")
    ax2.axhline(y=ISO_LIMITS['alarm'], color='#f59e0b', linewidth=1, linestyle='--',
                alpha=0.6, label=f"경고 기준 ({ISO_LIMITS['alarm']} mm/s)")
    ax2.axhline(y=ISO_LIMITS['danger'], color='#ef4444', linewidth=1, linestyle='--',
                alpha=0.6, label=f"위험 기준 ({ISO_LIMITS['danger']} mm/s)")

    # 1X 주파수 위치 표시
    ax2.axvline(x=f_1x, color='#7c3aed', linewidth=1.5, linestyle='-.',
                alpha=0.6)
    ax2.annotate(f'1X = {f_1x:.1f}Hz', xy=(f_1x + 0.3, max(r['mags'][mask20]) * 0.95),
                 fontsize=10, fontweight='bold', color='#7c3aed')

    ax2.set_title('FFT 주파수 스펙트럼 (3개 시나리오 비교)', fontsize=13, fontweight='bold')
    ax2.set_xlabel('주파수 (Hz)', fontsize=11)
    ax2.set_ylabel('진폭 (mm/s)', fontsize=11)
    ax2.legend(fontsize=8, loc='upper right')
    ax2.set_xlim(0, 15)
    ax2.grid(True, alpha=0.3)
    ax2.tick_params(labelsize=9)

    # ── 패널 3: 불균형 레벨 트렌드 ──
    ax3 = axes[1, 0]
    x_axis = np.arange(len(levels_a))
    ax3.plot(x_axis, levels_a, color='#2563eb', linewidth=1, alpha=0.8, label='축A 1X 진폭')
    ax3.plot(x_axis, levels_b, color='#7c3aed', linewidth=1, alpha=0.6, label='축B 1X 진폭')

    # ISO 기준 배경 색상
    ax3.axhspan(0, ISO_LIMITS['good'], alpha=0.08, color='#22c55e')
    ax3.axhspan(ISO_LIMITS['good'], ISO_LIMITS['alarm'], alpha=0.08, color='#f59e0b')
    ax3.axhspan(ISO_LIMITS['alarm'], 15, alpha=0.08, color='#ef4444')

    ax3.axhline(y=ISO_LIMITS['good'], color='#22c55e', linewidth=1, linestyle='--', alpha=0.7)
    ax3.axhline(y=ISO_LIMITS['alarm'], color='#f59e0b', linewidth=1, linestyle='--', alpha=0.7)
    ax3.axhline(y=ISO_LIMITS['danger'], color='#ef4444', linewidth=1, linestyle='--', alpha=0.7)

    ax3.text(len(levels_a) * 1.01, ISO_LIMITS['good'], '양호', fontsize=8,
             color='#22c55e', va='center', fontweight='bold')
    ax3.text(len(levels_a) * 1.01, ISO_LIMITS['alarm'], '경고', fontsize=8,
             color='#f59e0b', va='center', fontweight='bold')
    ax3.text(len(levels_a) * 1.01, ISO_LIMITS['danger'], '위험', fontsize=8,
             color='#ef4444', va='center', fontweight='bold')

    ax3.set_title('축 불균형 레벨 트렌드 (시간 경과)', fontsize=13, fontweight='bold')
    ax3.set_xlabel('측정 시점 (인덱스)', fontsize=11)
    ax3.set_ylabel('1X 진폭 (mm/s)', fontsize=11)
    ax3.legend(fontsize=9, loc='upper left')
    ax3.set_ylim(0, max(max(levels_a), 12) * 1.1)
    ax3.grid(True, alpha=0.3)
    ax3.tick_params(labelsize=9)

    # ── 패널 4: 분류 파이차트 ──
    ax4 = axes[1, 1]
    pie_labels = []
    pie_sizes = []
    pie_colors = []
    if dist['정상'] > 0:
        pie_labels.append(f"정상\n({dist['정상']}건)")
        pie_sizes.append(dist['정상'])
        pie_colors.append('#22c55e')
    if dist['경고'] > 0:
        pie_labels.append(f"경고\n({dist['경고']}건)")
        pie_sizes.append(dist['경고'])
        pie_colors.append('#f59e0b')
    if dist['위험'] > 0:
        pie_labels.append(f"위험\n({dist['위험']}건)")
        pie_sizes.append(dist['위험'])
        pie_colors.append('#ef4444')

    wedges, texts, autotexts = ax4.pie(
        pie_sizes, labels=pie_labels, colors=pie_colors,
        autopct='%1.1f%%', startangle=90, pctdistance=0.65,
        wedgeprops={'linewidth': 2, 'edgecolor': 'white'},
        textprops={'fontsize': 11, 'fontweight': 'bold'}
    )
    for at in autotexts:
        at.set_fontsize(11)
        at.set_fontweight('bold')
        at.set_color('white')

    ax4.set_title(f'진단 분류 분포 (총 {len(labels)}건)', fontsize=13, fontweight='bold')

    # 중앙 원 (도넛 효과)
    centre_circle = plt.Circle((0, 0), 0.40, fc='#fafafa')
    ax4.add_artist(centre_circle)
    ax4.text(0, 0, 'ISO\n10816', ha='center', va='center',
             fontsize=12, fontweight='bold', color='#374151')

    # ── 저장 ──
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    output_path = os.path.join(os.path.dirname(__file__), 'classical_dsp_result.png')
    fig.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='#fafafa')
    plt.close(fig)

    print(f"\n결과 이미지 저장: {output_path}")
    print("=" * 60)
    print("  시뮬레이션 완료")
    print("=" * 60)

    return results, dist


# ==============================================================================
# 실행
# ==============================================================================
if __name__ == '__main__':
    import pandas as pd  # common_data에서 필요
    run_simulation()
