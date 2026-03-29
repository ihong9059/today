"""
Rate-of-Change + Anomaly Detection 시뮬레이션 — 슈레더 발화 감지
==================================================================
배터리 파쇄 슈레더의 발화/열폭주를 감지합니다:
  1. 이중 IR 센서 + 열전대(PT100) 4채널 온도 모니터링
  2. Rate-of-Change (dT/dt) 분석으로 열폭주 조기 감지
  3. 3단계 경보 시스템: Normal / Warning / Emergency
  4. 이중화 센서 교차검증으로 오경보 제거

  ※ ../common_data.py에서 기본 슈레더 데이터를 가져와
    발화 시나리오를 합성합니다.
"""
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from collections import deque

try:
    from common_data import generate_shredder_data
except ImportError:
    generate_shredder_data = None

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False


# ─────────────────────────────────────────────
# 1. 데이터 생성: 4채널 온도 (IR1, IR2, TMP-A, TMP-B)
# ─────────────────────────────────────────────
def generate_fire_scenario(duration_sec=300, dt=0.1, seed=42):
    """
    발화 시나리오 포함 온도 데이터 생성 (100ms 샘플링)

    시나리오 타임라인:
      0~120s   : 정상 운전 (배터리 파쇄)
      120~180s : 전조 단계 (느린 온도 상승)
      180~210s : 발화 단계 (급격한 온도 상승)
      210~240s : 열폭주 단계 (폭발적 상승)
      240~300s : 대응 후 냉각 (질소 퍼지 + 소화)

    Returns:
        dict: time, ir1, ir2, tmp_a, tmp_b 배열
    """
    np.random.seed(seed)
    n = int(duration_sec / dt)
    time = np.arange(n) * dt

    # --- 기본 온도 프로파일 ---
    ir1 = np.full(n, 35.0)   # IR 센서 1 (챔버 상부 좌)
    ir2 = np.full(n, 35.0)   # IR 센서 2 (챔버 상부 우)
    tmp_a = np.full(n, 32.0) # 열전대 A (축A 베어링)
    tmp_b = np.full(n, 32.0) # 열전대 B (축B 베어링)

    for i in range(n):
        t = time[i]

        # ── Phase 1: 정상 운전 (0~120s) ──
        if t < 120:
            # 작동 중 서서히 상승 (~0.05°C/s)
            base = 35.0 + 0.05 * t
            # 파쇄 진동에 의한 미세 변동 (진폭 작게 → 정상 구간에서 오경보 방지)
            fluct = 0.8 * np.sin(2 * np.pi * t / 30) + 0.3 * np.sin(2 * np.pi * t / 12)
            ir1[i] = base + fluct
            ir2[i] = base + fluct * 0.9 + np.random.normal(0, 0.3)
            tmp_a[i] = 32.0 + 0.03 * t + 0.5 * np.sin(2 * np.pi * t / 45)
            tmp_b[i] = 32.0 + 0.025 * t + 0.4 * np.sin(2 * np.pi * t / 50)

        # ── Phase 2: 전조 단계 (120~180s) ──
        elif t < 180:
            dt_phase = t - 120
            # Phase 1 끝점에서 연속적으로 이어지도록 (35+0.05*120=41.0)
            base = 41.0 + 0.05 * dt_phase
            # IR1 쪽에서 배터리 발열 시작 (편측) — 점점 빨라짐
            rise = 0.3 * dt_phase + 0.01 * dt_phase**1.5
            ir1[i] = base + rise
            ir2[i] = base + rise * 0.4  # 반대편은 덜 올라감
            tmp_a[i] = 35.6 + 0.1 * dt_phase
            tmp_b[i] = 35.0 + 0.05 * dt_phase

        # ── Phase 3: 발화 단계 (180~210s) ──
        elif t < 210:
            dt_phase = t - 180
            # Phase 2 끝점 연속: base=44, rise=22.65 → ~66.65
            base_ir = 66.65
            # 급격한 상승 시작 (~5°C/s → 가속)
            rise = 5.0 * dt_phase + 0.5 * dt_phase**2
            ir1[i] = base_ir + rise
            ir2[i] = base_ir * 0.85 + rise * 0.6 + 3.0 * dt_phase  # 열 전파
            tmp_a[i] = 41.6 + 2.0 * dt_phase
            tmp_b[i] = 38.0 + 1.0 * dt_phase

        # ── Phase 4: 열폭주 단계 (210~240s) ──
        elif t < 240:
            dt_phase = t - 210
            # Phase 3 끝점 연속: ir1=66.65+600=666.65
            base_ir1 = 66.65 + 5.0 * 30 + 0.5 * 900
            base_ir2 = 66.65 * 0.85 + (5.0 * 30 + 0.5 * 900) * 0.6 + 90.0
            # 폭발적 상승 (>50°C/s)
            runaway = 50.0 * dt_phase + 5.0 * dt_phase**2
            ir1[i] = min(base_ir1 + runaway, 800.0)  # 최대 800°C
            ir2[i] = min(base_ir2 + runaway * 0.7, 700.0)
            tmp_a[i] = min(101.6 + 10.0 * dt_phase, 250.0)
            tmp_b[i] = min(68.0 + 5.0 * dt_phase, 200.0)

        # ── Phase 5: 대응 후 냉각 (240~300s) ──
        else:
            dt_phase = t - 240
            # 질소 퍼지 + 소화 → 급냉
            peak_ir1 = min(68.0 + 5.0*30 + 0.5*900 + 50.0*30 + 5.0*900, 800.0)
            peak_ir2 = min(peak_ir1 * 0.7, 700.0)
            decay = np.exp(-0.08 * dt_phase)
            ir1[i] = 50.0 + (peak_ir1 - 50.0) * decay
            ir2[i] = 50.0 + (peak_ir2 - 50.0) * decay
            tmp_a[i] = 40.0 + (250.0 - 40.0) * np.exp(-0.05 * dt_phase)
            tmp_b[i] = 38.0 + (200.0 - 38.0) * np.exp(-0.04 * dt_phase)

    # 센서 노이즈 추가
    ir1 += np.random.normal(0, 0.5, n)
    ir2 += np.random.normal(0, 0.5, n)
    tmp_a += np.random.normal(0, 0.2, n)
    tmp_b += np.random.normal(0, 0.2, n)

    # 양수 보장
    ir1 = np.clip(ir1, 0, 900)
    ir2 = np.clip(ir2, 0, 900)
    tmp_a = np.clip(tmp_a, 0, 300)
    tmp_b = np.clip(tmp_b, 0, 300)

    return {
        'time': time,
        'ir1': ir1,
        'ir2': ir2,
        'tmp_a': tmp_a,
        'tmp_b': tmp_b,
        'n': n,
        'dt': dt,
    }


# ─────────────────────────────────────────────
# 2. Rate-of-Change 분석 + 발화 감지
# ─────────────────────────────────────────────
class FireDetector:
    """Rate-of-Change 기반 발화/열폭주 감지기"""

    def __init__(self):
        self.THRESHOLDS = {
            'abs_warning': 60.0,      # °C
            'abs_alarm': 80.0,        # °C
            'abs_emergency': 120.0,   # °C
            'rate_warning': 2.0,      # °C/s
            'rate_alarm': 5.0,        # °C/s
            'rate_emergency': 20.0,   # °C/s
            'ir_diff_max': 15.0,      # °C — 이중화 허용 차이
        }

    def analyze(self, data, window_sec=1.0):
        """
        전체 시계열에 대해 Rate-of-Change 분석 수행

        Returns:
            dict: rate_ir1, rate_ir2, fire_prob, alert_level 배열
        """
        n = data['n']
        dt = data['dt']
        window = max(int(window_sec / dt), 1)

        ir1 = data['ir1']
        ir2 = data['ir2']
        tmp_a = data['tmp_a']
        tmp_b = data['tmp_b']

        # 변화율 계산 (dT/dt, °C/s)
        rate_ir1 = np.zeros(n)
        rate_ir2 = np.zeros(n)

        for i in range(window, n):
            rate_ir1[i] = (ir1[i] - ir1[i - window]) / window_sec
            rate_ir2[i] = (ir2[i] - ir2[i - window]) / window_sec

        # 발화 확률 + 경보 레벨 계산
        fire_prob = np.zeros(n)
        alert_level = np.zeros(n)  # 0=Normal, 1=Warning, 2=Emergency

        for i in range(n):
            current_temp = max(ir1[i], ir2[i])
            current_rate = max(rate_ir1[i], rate_ir2[i])
            ir_diff = abs(ir1[i] - ir2[i])

            prob = 0.0
            level = 0

            # --- 절대값 기반 ---
            if current_temp >= self.THRESHOLDS['abs_emergency']:
                prob = max(prob, 1.0)
                level = max(level, 2)
            elif current_temp >= self.THRESHOLDS['abs_alarm']:
                prob = max(prob, 0.7)
                level = max(level, 2)
            elif current_temp >= self.THRESHOLDS['abs_warning']:
                prob = max(prob, 0.3)
                level = max(level, 1)

            # --- 변화율 기반 ---
            if current_rate >= self.THRESHOLDS['rate_emergency']:
                prob = max(prob, 1.0)
                level = max(level, 2)
            elif current_rate >= self.THRESHOLDS['rate_alarm']:
                prob = max(prob, 0.8)
                level = max(level, 2)
            elif current_rate >= self.THRESHOLDS['rate_warning']:
                prob = max(prob, 0.4)
                level = max(level, 1)

            # --- 이중화 교차검증 보정 ---
            # 두 센서 모두 높아야 진짜 발화
            if ir1[i] > self.THRESHOLDS['abs_warning'] and ir2[i] > self.THRESHOLDS['abs_warning']:
                prob = min(prob * 1.2, 1.0)  # 확신 상향
            elif ir_diff > self.THRESHOLDS['ir_diff_max'] and current_temp < self.THRESHOLDS['abs_alarm']:
                prob *= 0.5  # 한쪽만 높으면 센서 오류 가능성

            fire_prob[i] = np.clip(prob, 0, 1)
            alert_level[i] = level

        return {
            'rate_ir1': rate_ir1,
            'rate_ir2': rate_ir2,
            'fire_prob': fire_prob,
            'alert_level': alert_level,
        }


# ─────────────────────────────────────────────
# 3. 시각화 (4-panel 결과 플롯)
# ─────────────────────────────────────────────
def plot_results(data, result, save_path='anomaly_detection_result.png'):
    """
    4개 서브플롯 생성:
      1) 4채널 온도 시계열
      2) 변화율 (dT/dt) + 임계값 라인
      3) 발화 확률
      4) 경보 레벨 타임라인
    """
    time = data['time']

    fig, axes = plt.subplots(4, 1, figsize=(14, 16), gridspec_kw={'height_ratios': [3, 2.5, 2, 1.5]})
    fig.suptitle('Rate-of-Change + Anomaly Detection 발화 감지 시뮬레이션',
                 fontsize=18, fontweight='bold', y=0.98)

    # 위상 구간 표시용 (모든 플롯에 동일)
    phases = [
        (0, 120, '#e8f5e9', '정상 운전'),
        (120, 180, '#fff9c4', '전조 단계'),
        (180, 210, '#ffccbc', '발화 단계'),
        (210, 240, '#ffcdd2', '열폭주'),
        (240, 300, '#e3f2fd', '냉각/대응'),
    ]

    for ax in axes:
        for start, end, color, label in phases:
            ax.axvspan(start, end, alpha=0.3, color=color, zorder=0)

    # ── Panel 1: 온도 시계열 ──
    ax1 = axes[0]
    ax1.plot(time, data['ir1'], color='#d32f2f', linewidth=1.2, label='IR센서 1 (챔버 좌)', alpha=0.9)
    ax1.plot(time, data['ir2'], color='#e65100', linewidth=1.2, label='IR센서 2 (챔버 우)', alpha=0.9)
    ax1.plot(time, data['tmp_a'], color='#1565c0', linewidth=1.0, label='열전대 A (축A)', alpha=0.8)
    ax1.plot(time, data['tmp_b'], color='#00838f', linewidth=1.0, label='열전대 B (축B)', alpha=0.8)

    # 임계값 라인
    ax1.axhline(y=60, color='#ffa000', linestyle='--', linewidth=0.8, alpha=0.7, label='경고 (60°C)')
    ax1.axhline(y=80, color='#e65100', linestyle='--', linewidth=0.8, alpha=0.7, label='알람 (80°C)')
    ax1.axhline(y=120, color='#b71c1c', linestyle='--', linewidth=0.8, alpha=0.7, label='비상 (120°C)')

    ax1.set_ylabel('온도 (°C)', fontsize=12, fontweight='bold')
    ax1.set_title('① 4채널 센서 온도 모니터링', fontsize=13, fontweight='bold', pad=10)
    ax1.legend(loc='upper left', fontsize=8, ncol=4)
    ax1.set_yscale('symlog', linthresh=100)
    ax1.set_ylim(20, 900)
    ax1.grid(True, alpha=0.3)

    # 위상 텍스트 (Panel 1에만)
    for start, end, color, label in phases:
        mid = (start + end) / 2
        ax1.text(mid, 850, label, ha='center', va='top', fontsize=9,
                fontweight='bold', color='#37474f',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))

    # ── Panel 2: 변화율 (dT/dt) ──
    ax2 = axes[1]
    ax2.plot(time, result['rate_ir1'], color='#d32f2f', linewidth=0.8, label='dT/dt IR1', alpha=0.9)
    ax2.plot(time, result['rate_ir2'], color='#e65100', linewidth=0.8, label='dT/dt IR2', alpha=0.8)

    # 임계값
    ax2.axhline(y=2.0, color='#ffa000', linestyle='--', linewidth=1.0, alpha=0.8, label='경고 (2°C/s)')
    ax2.axhline(y=5.0, color='#e65100', linestyle='--', linewidth=1.0, alpha=0.8, label='알람 (5°C/s)')
    ax2.axhline(y=20.0, color='#b71c1c', linestyle='--', linewidth=1.0, alpha=0.8, label='비상 (20°C/s)')
    ax2.axhline(y=0.1, color='#4caf50', linestyle=':', linewidth=0.8, alpha=0.6, label='정상 (~0.1°C/s)')

    ax2.set_ylabel('변화율 (°C/s)', fontsize=12, fontweight='bold')
    ax2.set_title('② 온도 변화율 (dT/dt) — 열폭주 조기 감지 핵심', fontsize=13, fontweight='bold', pad=10)
    ax2.legend(loc='upper left', fontsize=8, ncol=4)
    ax2.set_yscale('symlog', linthresh=5)
    ax2.grid(True, alpha=0.3)

    # ── Panel 3: 발화 확률 ──
    ax3 = axes[2]
    ax3.fill_between(time, result['fire_prob'], color='#d32f2f', alpha=0.4)
    ax3.plot(time, result['fire_prob'], color='#b71c1c', linewidth=1.5)

    ax3.axhline(y=0.3, color='#ffa000', linestyle='--', linewidth=0.8, alpha=0.8, label='Warning 임계 (0.3)')
    ax3.axhline(y=0.7, color='#b71c1c', linestyle='--', linewidth=0.8, alpha=0.8, label='Emergency 임계 (0.7)')

    ax3.set_ylabel('발화 확률', fontsize=12, fontweight='bold')
    ax3.set_title('③ 실시간 발화 확률 추정', fontsize=13, fontweight='bold', pad=10)
    ax3.set_ylim(-0.05, 1.1)
    ax3.legend(loc='upper left', fontsize=9)
    ax3.grid(True, alpha=0.3)

    # ── Panel 4: 경보 레벨 타임라인 ──
    ax4 = axes[3]
    level_colors = {0: '#4caf50', 1: '#ffa000', 2: '#d32f2f'}
    level_names = {0: 'Normal', 1: 'Warning', 2: 'Emergency'}

    # 컬러 바 형태로 경보 레벨 표시
    for i in range(len(time) - 1):
        lvl = int(result['alert_level'][i])
        ax4.axvspan(time[i], time[i + 1], color=level_colors[lvl], alpha=0.8)

    # 범례용 더미
    for lvl, color in level_colors.items():
        ax4.plot([], [], color=color, linewidth=8, label=level_names[lvl])

    ax4.set_ylabel('경보', fontsize=12, fontweight='bold')
    ax4.set_xlabel('시간 (초)', fontsize=12, fontweight='bold')
    ax4.set_title('④ 3단계 경보 시스템 타임라인', fontsize=13, fontweight='bold', pad=10)
    ax4.set_yticks([])
    ax4.legend(loc='upper left', fontsize=9, ncol=3)
    ax4.set_xlim(time[0], time[-1])

    # 공통 설정
    for ax in axes:
        ax.set_xlim(time[0], time[-1])

    plt.tight_layout(rect=[0, 0, 1, 0.96])
    plt.savefig(save_path, dpi=150, bbox_inches='tight', facecolor='white')
    print(f"\n  [저장 완료] {save_path}")
    plt.close()


# ─────────────────────────────────────────────
# 4. 메인 실행
# ─────────────────────────────────────────────
def run_simulation():
    print("=" * 60)
    print("  Rate-of-Change + Anomaly Detection 발화 감지 시뮬레이션")
    print("  모델 05 — 슈레더 배터리 열폭주 감지")
    print("=" * 60)

    # 1) 데이터 생성
    print("\n[1단계] 발화 시나리오 데이터 생성...")
    data = generate_fire_scenario(duration_sec=300, dt=0.1, seed=42)
    print(f"  - 시뮬레이션 길이: {data['time'][-1]:.0f}초")
    print(f"  - 샘플링 간격: {data['dt']*1000:.0f}ms")
    print(f"  - 총 데이터 포인트: {data['n']:,}개")
    print(f"  - 센서 4채널: IR1, IR2, TMP-A, TMP-B")

    # 2) 발화 감지 실행
    print("\n[2단계] Rate-of-Change 분석 실행...")
    detector = FireDetector()
    result = detector.analyze(data, window_sec=1.0)

    # 3) 감지 결과 요약
    print("\n[3단계] 감지 결과 요약")
    print("-" * 40)

    # 최초 경고/비상 시점
    warning_idx = np.where(result['alert_level'] >= 1)[0]
    emergency_idx = np.where(result['alert_level'] >= 2)[0]

    if len(warning_idx) > 0:
        first_warning_t = data['time'][warning_idx[0]]
        print(f"  최초 Warning 발생: {first_warning_t:.1f}초")
        print(f"    → 실제 전조 시작(120초) 대비 감지 지연: {first_warning_t - 120:.1f}초")
    else:
        print("  Warning 미발생")

    if len(emergency_idx) > 0:
        first_emergency_t = data['time'][emergency_idx[0]]
        print(f"  최초 Emergency 발생: {first_emergency_t:.1f}초")
        print(f"    → 실제 발화 시작(180초) 대비 감지 지연: {first_emergency_t - 180:.1f}초")
    else:
        print("  Emergency 미발생")

    # 최대 변화율
    max_rate = max(np.max(result['rate_ir1']), np.max(result['rate_ir2']))
    max_rate_t = data['time'][np.argmax(np.maximum(result['rate_ir1'], result['rate_ir2']))]
    print(f"\n  최대 변화율: {max_rate:.1f}°C/s (t={max_rate_t:.1f}초)")

    # 최대 온도
    max_temp_ir1 = np.max(data['ir1'])
    max_temp_ir2 = np.max(data['ir2'])
    print(f"  IR1 최대 온도: {max_temp_ir1:.1f}°C")
    print(f"  IR2 최대 온도: {max_temp_ir2:.1f}°C")

    # 각 경보 레벨 지속시간
    total_sec = data['time'][-1]
    normal_pct = np.sum(result['alert_level'] == 0) / data['n'] * 100
    warning_pct = np.sum(result['alert_level'] == 1) / data['n'] * 100
    emergency_pct = np.sum(result['alert_level'] == 2) / data['n'] * 100
    print(f"\n  경보 비율:")
    print(f"    Normal:    {normal_pct:.1f}% ({normal_pct/100*total_sec:.0f}초)")
    print(f"    Warning:   {warning_pct:.1f}% ({warning_pct/100*total_sec:.0f}초)")
    print(f"    Emergency: {emergency_pct:.1f}% ({emergency_pct/100*total_sec:.0f}초)")

    # 감지 성능
    print("\n  감지 성능 평가:")
    # Warning: 전조 단계(120초) 이후 ~ 발화(180초) 이전에 발생했는지
    warning_in_precursor = [i for i in warning_idx if 120 <= data['time'][i] < 180]
    if len(warning_in_precursor) > 0:
        first_precursor_warning = data['time'][warning_in_precursor[0]]
        lead_time = 180 - first_precursor_warning
        print(f"    ✓ 발화 전 사전경고 성공! (발화 {lead_time:.1f}초 전 Warning, t={first_precursor_warning:.1f}s)")

    # Emergency: 발화(180초) 이후 얼마나 빨리 감지했는지
    emergency_after_fire = [i for i in emergency_idx if data['time'][i] >= 180]
    if len(emergency_after_fire) > 0:
        first_fire_emergency = data['time'][emergency_after_fire[0]]
        response_time = first_fire_emergency - 180
        if response_time < 1.0:
            print(f"    ✓ 1초 이내 Emergency 감지 성공! ({response_time*1000:.0f}ms, t={first_fire_emergency:.1f}s)")
        else:
            print(f"    △ Emergency 감지까지 {response_time:.1f}초 소요 (t={first_fire_emergency:.1f}s)")
    elif len(emergency_idx) > 0:
        # Emergency가 전조 단계에서 이미 발생 → 더 빠른 감지
        first_e = data['time'][emergency_idx[0]]
        print(f"    ✓ 발화 전 Emergency 조기 감지! (t={first_e:.1f}s, 발화 {180-first_e:.1f}초 전)")

    # 4) 플롯 생성
    print("\n[4단계] 결과 플롯 생성...")
    save_dir = os.path.dirname(os.path.abspath(__file__))
    save_path = os.path.join(save_dir, 'anomaly_detection_result.png')
    plot_results(data, result, save_path=save_path)

    print("\n" + "=" * 60)
    print("  시뮬레이션 완료!")
    print("=" * 60)

    return data, result


if __name__ == "__main__":
    run_simulation()
