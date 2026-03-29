"""
모델 04: 이물질 끼임 감지 — Rule-based + Statistical Pattern Recognition 시뮬레이션
====================================================================================
- 고주파 전류/속도 데이터 생성 (10ms 간격)
- 전류 스파이크 + 속도 급감 패턴 인식
- 끼임 확률 계산 (0~1)
- 결과 시각화 (pattern_recognition_result.png)
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager, rc
from collections import deque

# 한글 폰트 설정
try:
    font_path = font_manager.findfont(font_manager.FontProperties(family='Malgun Gothic'))
    rc('font', family='Malgun Gothic')
except:
    pass
plt.rcParams['axes.unicode_minus'] = False

from common_data import generate_high_freq_data

# ============================================================
# 1. 고주파 센서 데이터 생성 (10ms 간격, 60초 시뮬레이션)
# ============================================================

def generate_highfreq_data(duration_sec=60, sampling_ms=10, seed=42):
    """
    고주파 전류/속도 데이터 생성 (10ms 간격)
    - 정상 구간 + 이물질 끼임 이벤트 3건 삽입

    Returns:
        time_ms: 시간 배열 (ms)
        current_A: 축A 전류 (A)
        current_B: 축B 전류 (A)
        speed_A: 축A 속도 (RPM)
        speed_B: 축B 속도 (RPM)
        events: 이벤트 정보 리스트
    """
    np.random.seed(seed)

    n_samples = duration_sec * 1000 // sampling_ms  # 6000 samples for 60초
    time_ms = np.arange(n_samples) * sampling_ms

    # --- 정상 운전 기준값 ---
    base_current = 60.0   # A (정격)
    base_speed = 120.0    # RPM (정격)

    # --- 정상 신호 생성 ---
    # 전류: 기본값 + 저주파 변동 + 고주파 노이즈
    low_freq_cur = 3.0 * np.sin(2 * np.pi * 0.5 * time_ms / 1000)  # 0.5Hz 변동
    noise_cur_a = np.random.normal(0, 2.0, n_samples)
    noise_cur_b = np.random.normal(0, 1.8, n_samples)
    current_A = base_current + low_freq_cur + noise_cur_a
    current_B = base_current * 0.97 + low_freq_cur * 0.95 + noise_cur_b

    # 속도: 기본값 + 미세 변동
    low_freq_spd = 1.0 * np.sin(2 * np.pi * 0.3 * time_ms / 1000)
    noise_spd_a = np.random.normal(0, 0.8, n_samples)
    noise_spd_b = np.random.normal(0, 0.7, n_samples)
    speed_A = base_speed + low_freq_spd + noise_spd_a
    speed_B = base_speed * 0.98 + low_freq_spd * 0.95 + noise_spd_b

    # --- 이물질 끼임 이벤트 삽입 ---
    events = []

    # 이벤트 1: 경미한 끼임 (t=12~14초) — 전류 1.5배, 속도 30% 감소
    ev1_start = 12000 // sampling_ms  # index 1200
    ev1_end = 14000 // sampling_ms    # index 1400
    ev1_ramp = 500 // sampling_ms     # 0.5초 램프
    ev1_len = ev1_end - ev1_start

    cur_rise_1 = np.zeros(ev1_len)
    cur_rise_1[:ev1_ramp] = np.linspace(0, 30, ev1_ramp)       # 60→90A
    cur_rise_1[ev1_ramp:] = 30
    cur_rise_1[-ev1_ramp:] = np.linspace(30, 0, ev1_ramp)     # 회복
    current_A[ev1_start:ev1_end] += cur_rise_1
    current_B[ev1_start:ev1_end] += cur_rise_1 * 0.8

    spd_drop_1 = np.zeros(ev1_len)
    spd_drop_1[:ev1_ramp] = np.linspace(0, -36, ev1_ramp)      # 120→84 RPM
    spd_drop_1[ev1_ramp:] = -36
    spd_drop_1[-ev1_ramp:] = np.linspace(-36, 0, ev1_ramp)
    speed_A[ev1_start:ev1_end] += spd_drop_1
    speed_B[ev1_start:ev1_end] += spd_drop_1 * 0.9

    events.append({
        'name': '경미한 끼임', 'start_ms': 12000, 'end_ms': 14000,
        'severity': 'warning', 'cur_peak_A': 90, 'spd_min_RPM': 84
    })

    # 이벤트 2: 심각한 끼임 (t=28~33초) — 전류 2.5배, 속도 60% 감소, 오래 지속
    ev2_start = 28000 // sampling_ms
    ev2_end = 33000 // sampling_ms
    ev2_ramp = 300 // sampling_ms     # 0.3초 급상승
    ev2_len = ev2_end - ev2_start

    cur_rise_2 = np.zeros(ev2_len)
    cur_rise_2[:ev2_ramp] = np.linspace(0, 90, ev2_ramp)       # 60→150A
    cur_rise_2[ev2_ramp:ev2_ramp*4] = 90
    cur_rise_2[ev2_ramp*4:ev2_ramp*8] = np.linspace(90, 110, ev2_ramp*4)  # 추가 상승
    cur_rise_2[ev2_ramp*8:] = np.linspace(110, 0, ev2_len - ev2_ramp*8)   # 역회전 후 회복
    current_A[ev2_start:ev2_end] += cur_rise_2
    current_B[ev2_start:ev2_end] += cur_rise_2 * 0.85

    spd_drop_2 = np.zeros(ev2_len)
    spd_drop_2[:ev2_ramp] = np.linspace(0, -72, ev2_ramp)      # 120→48 RPM
    spd_drop_2[ev2_ramp:ev2_ramp*6] = -72
    spd_drop_2[ev2_ramp*6:ev2_ramp*10] = np.linspace(-72, -96, ev2_ramp*4)  # 추가 감소
    spd_drop_2[ev2_ramp*10:] = np.linspace(-96, 0, ev2_len - ev2_ramp*10)
    speed_A[ev2_start:ev2_end] += spd_drop_2
    speed_B[ev2_start:ev2_end] += spd_drop_2 * 0.9

    events.append({
        'name': '심각한 끼임', 'start_ms': 28000, 'end_ms': 33000,
        'severity': 'critical', 'cur_peak_A': 170, 'spd_min_RPM': 24
    })

    # 이벤트 3: 순간 충격 (t=45~45.5초) — 전류 1.3배, 속도 10% 감소 (정상 투입)
    ev3_start = 45000 // sampling_ms
    ev3_end = 45500 // sampling_ms
    ev3_len = ev3_end - ev3_start

    cur_rise_3 = 18.0 * np.exp(-np.linspace(0, 5, ev3_len))  # 빠른 감쇠
    current_A[ev3_start:ev3_end] += cur_rise_3
    current_B[ev3_start:ev3_end] += cur_rise_3 * 0.7

    spd_drop_3 = -12.0 * np.exp(-np.linspace(0, 5, ev3_len))
    speed_A[ev3_start:ev3_end] += spd_drop_3
    speed_B[ev3_start:ev3_end] += spd_drop_3 * 0.8

    events.append({
        'name': '순간 충격 (정상)', 'start_ms': 45000, 'end_ms': 45500,
        'severity': 'normal', 'cur_peak_A': 78, 'spd_min_RPM': 108
    })

    # 클리핑
    current_A = np.clip(current_A, 0, 200)
    current_B = np.clip(current_B, 0, 200)
    speed_A = np.clip(speed_A, 0, 200)
    speed_B = np.clip(speed_B, 0, 200)

    return time_ms, current_A, current_B, speed_A, speed_B, events


# ============================================================
# 2. 패턴 인식 알고리즘
# ============================================================

class PatternRecognitionDetector:
    """
    Rule-based + Statistical 패턴 인식 끼임 감지기

    감지 원리:
    1. 슬라이딩 윈도우 기반 기준선(baseline) 계산
    2. Z-score 기반 전류 스파이크 감지
    3. Z-score 기반 속도 급감 감지
    4. 결합 규칙: 전류↑ + 속도↓ = 끼임
    5. 다중 증거 융합으로 확률 계산
    """

    def __init__(self, config=None):
        self.config = config or {
            # 슬라이딩 윈도우 (기준선 계산용)
            'baseline_window': 300,       # 300 samples = 3초 (10ms 간격)
            'baseline_guard': 30,         # 최근 0.3초는 기준선에서 제외

            # Z-score 임계값
            'current_zscore_warn': 2.5,   # 전류 Z-score 주의
            'current_zscore_alarm': 4.0,  # 전류 Z-score 경보
            'speed_zscore_warn': -2.5,    # 속도 Z-score 주의 (음수)
            'speed_zscore_alarm': -4.0,   # 속도 Z-score 경보 (음수)

            # 비율 기반 임계값
            'current_spike_ratio': 1.5,   # 기준선 대비 1.5배
            'speed_drop_ratio': 0.7,      # 기준선 대비 70% 이하

            # 변화율 (미분)
            'current_rate_warn': 200.0,   # A/s 이상
            'current_rate_alarm': 500.0,  # A/s 이상
            'speed_rate_warn': -150.0,    # RPM/s 이하
            'speed_rate_alarm': -300.0,   # RPM/s 이하

            # 끼임 확인
            'confirm_samples': 20,        # 200ms 지속 시 확인
            'coincidence_window': 50,     # 500ms 내 동시 발생
        }

        self.reset()

    def reset(self):
        """상태 초기화"""
        self.cur_buffer = deque(maxlen=self.config['baseline_window'])
        self.spd_buffer = deque(maxlen=self.config['baseline_window'])
        self.jam_counter = 0
        self.state = 'NORMAL'

    def compute_baseline(self, buffer):
        """슬라이딩 윈도우 기준선 (평균, 표준편차)"""
        guard = self.config['baseline_guard']
        if len(buffer) < guard + 30:
            arr = np.array(buffer)
        else:
            arr = np.array(list(buffer)[:-guard])
        return np.mean(arr), max(np.std(arr), 0.1)  # std 최소 0.1

    def compute_rate(self, buffer, dt_sec=0.01):
        """변화율 계산 (최근 5 samples = 50ms)"""
        if len(buffer) < 5:
            return 0.0
        recent = list(buffer)[-5:]
        rate = (recent[-1] - recent[0]) / (4 * dt_sec)
        return rate

    def update(self, cur_a, spd_a):
        """
        매 10ms 호출하여 끼임 판정

        Returns:
            dict: 판정 결과 (probability, state, details)
        """
        self.cur_buffer.append(cur_a)
        self.spd_buffer.append(spd_a)

        if len(self.cur_buffer) < 50:
            return {
                'probability': 0.0, 'state': 'INIT',
                'cur_zscore': 0.0, 'spd_zscore': 0.0,
                'cur_rate': 0.0, 'spd_rate': 0.0,
                'spike_detected': False, 'drop_detected': False,
            }

        # --- 기준선 계산 ---
        cur_mean, cur_std = self.compute_baseline(self.cur_buffer)
        spd_mean, spd_std = self.compute_baseline(self.spd_buffer)

        # --- Z-score ---
        cur_zscore = (cur_a - cur_mean) / cur_std
        spd_zscore = (spd_a - spd_mean) / spd_std

        # --- 변화율 ---
        cur_rate = self.compute_rate(self.cur_buffer)
        spd_rate = self.compute_rate(self.spd_buffer)

        # --- 전류 스파이크 감지 ---
        spike_score = 0.0
        spike_detected = False

        # Z-score 기반
        if cur_zscore >= self.config['current_zscore_alarm']:
            spike_score += 0.4
            spike_detected = True
        elif cur_zscore >= self.config['current_zscore_warn']:
            spike_score += 0.2
            spike_detected = True

        # 비율 기반
        if cur_mean > 10 and cur_a > cur_mean * self.config['current_spike_ratio']:
            spike_score += 0.2
            spike_detected = True

        # 변화율 기반
        if cur_rate >= self.config['current_rate_alarm']:
            spike_score += 0.2
        elif cur_rate >= self.config['current_rate_warn']:
            spike_score += 0.1

        # --- 속도 급감 감지 ---
        drop_score = 0.0
        drop_detected = False

        # Z-score 기반
        if spd_zscore <= self.config['speed_zscore_alarm']:
            drop_score += 0.4
            drop_detected = True
        elif spd_zscore <= self.config['speed_zscore_warn']:
            drop_score += 0.2
            drop_detected = True

        # 비율 기반
        if spd_mean > 10 and spd_a < spd_mean * self.config['speed_drop_ratio']:
            drop_score += 0.2
            drop_detected = True

        # 변화율 기반
        if spd_rate <= self.config['speed_rate_alarm']:
            drop_score += 0.2
        elif spd_rate <= self.config['speed_rate_warn']:
            drop_score += 0.1

        # --- 다중 증거 융합 (끼임 확률) ---
        # 단독 증거: 최대 0.4, 결합 증거: 최대 1.0
        if spike_detected and drop_detected:
            # 전류↑ + 속도↓ 동시: 결합 보너스
            probability = min(1.0, (spike_score + drop_score) * 1.2)
        elif spike_detected:
            probability = min(0.4, spike_score * 0.7)
        elif drop_detected:
            probability = min(0.4, drop_score * 0.7)
        else:
            probability = 0.0

        # --- 상태 머신 ---
        if probability >= 0.6:
            self.jam_counter += 1
        elif probability >= 0.3:
            self.jam_counter = max(0, self.jam_counter - 1)
        else:
            self.jam_counter = max(0, self.jam_counter - 3)

        if self.jam_counter >= self.config['confirm_samples']:
            self.state = 'JAMMING'
        elif self.jam_counter >= self.config['confirm_samples'] // 2:
            self.state = 'WARNING'
        elif self.jam_counter > 0:
            self.state = 'CAUTION'
        else:
            self.state = 'NORMAL'

        return {
            'probability': round(probability, 4),
            'state': self.state,
            'cur_zscore': round(cur_zscore, 2),
            'spd_zscore': round(spd_zscore, 2),
            'cur_rate': round(cur_rate, 1),
            'spd_rate': round(spd_rate, 1),
            'spike_detected': spike_detected,
            'drop_detected': drop_detected,
            'cur_baseline': round(cur_mean, 1),
            'spd_baseline': round(spd_mean, 1),
            'jam_counter': self.jam_counter,
        }


# ============================================================
# 3. 시뮬레이션 실행
# ============================================================

def run_simulation():
    """전체 시뮬레이션 실행"""
    print("=" * 65)
    print("  모델 04: 이물질 끼임 감지 — 패턴 인식 시뮬레이션")
    print("=" * 65)

    # 1) 데이터 생성
    print("\n[1단계] 고주파 센서 데이터 생성 (10ms 간격, 60초)...")
    time_ms, cur_A, cur_B, spd_A, spd_B, events = generate_highfreq_data(
        duration_sec=60, sampling_ms=10, seed=42
    )
    n_samples = len(time_ms)
    print(f"  - 총 샘플 수: {n_samples:,}개")
    print(f"  - 시뮬레이션 시간: {time_ms[-1]/1000:.1f}초")
    print(f"  - 삽입된 이벤트: {len(events)}건")
    for ev in events:
        print(f"    * {ev['name']}: {ev['start_ms']/1000:.1f}~{ev['end_ms']/1000:.1f}초 "
              f"(전류 피크 {ev['cur_peak_A']}A, 속도 최저 {ev['spd_min_RPM']}RPM)")

    # 2) 패턴 인식 실행
    print("\n[2단계] 패턴 인식 알고리즘 실행...")
    detector = PatternRecognitionDetector()

    results = []
    for i in range(n_samples):
        result = detector.update(cur_A[i], spd_A[i])
        results.append(result)

    # 결과 배열 변환
    probabilities = np.array([r['probability'] for r in results])
    states = [r['state'] for r in results]
    cur_zscores = np.array([r['cur_zscore'] for r in results])
    spd_zscores = np.array([r['spd_zscore'] for r in results])
    spikes = np.array([r['spike_detected'] for r in results])
    drops = np.array([r['drop_detected'] for r in results])

    # 3) 결과 분석
    print("\n[3단계] 감지 결과 분석...")

    # 상태별 집계
    state_counts = {}
    for s in states:
        state_counts[s] = state_counts.get(s, 0) + 1

    print(f"\n  상태 분포:")
    state_names_kr = {
        'INIT': '초기화', 'NORMAL': '정상', 'CAUTION': '주의',
        'WARNING': '경고', 'JAMMING': '끼임 확인'
    }
    for state, count in sorted(state_counts.items()):
        pct = count / n_samples * 100
        kr_name = state_names_kr.get(state, state)
        print(f"    {kr_name:8s} ({state:8s}): {count:5d}회 ({pct:5.1f}%)")

    # 이벤트별 감지 성능
    print(f"\n  이벤트 감지 성능:")
    for ev in events:
        start_idx = ev['start_ms'] // 10
        end_idx = ev['end_ms'] // 10
        max_prob = np.max(probabilities[start_idx:end_idx])
        max_prob_time = time_ms[start_idx + np.argmax(probabilities[start_idx:end_idx])]

        jam_detected = 'JAMMING' in states[start_idx:end_idx]
        warn_detected = 'WARNING' in states[start_idx:end_idx] or jam_detected

        # 감지 지연 시간
        first_detect_idx = None
        for j in range(start_idx, min(end_idx, n_samples)):
            if probabilities[j] >= 0.3:
                first_detect_idx = j
                break

        detect_delay = (first_detect_idx - start_idx) * 10 if first_detect_idx else None

        print(f"    [{ev['name']}] t={ev['start_ms']/1000:.1f}~{ev['end_ms']/1000:.1f}초")
        print(f"      최대 확률: {max_prob:.3f} (t={max_prob_time/1000:.2f}초)")
        print(f"      끼임 확인: {'O' if jam_detected else 'X'} | "
              f"경고 감지: {'O' if warn_detected else 'X'}")
        if detect_delay is not None:
            print(f"      감지 지연: {detect_delay}ms")
        else:
            print(f"      감지 지연: 미감지")

    # 통계 요약
    print(f"\n  전체 통계:")
    print(f"    전류 Z-score 범위: {np.min(cur_zscores):.2f} ~ {np.max(cur_zscores):.2f}")
    print(f"    속도 Z-score 범위: {np.min(spd_zscores):.2f} ~ {np.max(spd_zscores):.2f}")
    print(f"    스파이크 감지 횟수: {np.sum(spikes)}회")
    print(f"    속도 급감 감지 횟수: {np.sum(drops)}회")
    print(f"    최대 끼임 확률: {np.max(probabilities):.4f}")

    # 4) 시각화
    print("\n[4단계] 결과 시각화...")
    plot_results(time_ms, cur_A, spd_A, probabilities, states,
                 cur_zscores, spd_zscores, spikes, drops, events)

    print("\n" + "=" * 65)
    print("  시뮬레이션 완료!")
    print("  결과 파일: pattern_recognition_result.png")
    print("=" * 65)

    return results


# ============================================================
# 4. 결과 시각화
# ============================================================

def plot_results(time_ms, current, speed, probabilities, states,
                 cur_zscores, spd_zscores, spikes, drops, events):
    """4패널 시각화"""

    time_sec = time_ms / 1000.0

    fig, axes = plt.subplots(4, 1, figsize=(16, 14), sharex=True,
                              gridspec_kw={'height_ratios': [1, 1, 1, 0.6]})
    fig.suptitle('모델 04: 이물질 끼임 감지 — 패턴 인식 시뮬레이션 결과',
                 fontsize=16, fontweight='bold', y=0.98)

    # 이벤트 영역 표시 함수
    def shade_events(ax):
        colors = {'normal': '#90EE9040', 'warning': '#FFD70060', 'critical': '#FF634760'}
        for ev in events:
            t_start = ev['start_ms'] / 1000
            t_end = ev['end_ms'] / 1000
            color = colors.get(ev['severity'], '#CCCCCC40')
            ax.axvspan(t_start, t_end, alpha=0.3, color=color, zorder=0)

    # ─── 패널 1: 전류 신호 + 스파이크 감지 ───
    ax1 = axes[0]
    ax1.plot(time_sec, current, color='#2563eb', linewidth=0.5, alpha=0.8, label='전류 (A)')

    # 스파이크 감지 포인트
    spike_idx = np.where(spikes)[0]
    if len(spike_idx) > 0:
        # 간격 10으로 서브샘플링 (너무 많으면 느림)
        spike_sub = spike_idx[::3]
        ax1.scatter(time_sec[spike_sub], current[spike_sub],
                   color='#dc2626', s=8, alpha=0.6, zorder=5, label='스파이크 감지')

    # Z-score 보조축
    ax1_twin = ax1.twinx()
    ax1_twin.plot(time_sec, cur_zscores, color='#ea580c', linewidth=0.4, alpha=0.5)
    ax1_twin.axhline(y=2.5, color='#ca8a04', linestyle='--', linewidth=0.8, alpha=0.6)
    ax1_twin.axhline(y=4.0, color='#dc2626', linestyle='--', linewidth=0.8, alpha=0.6)
    ax1_twin.set_ylabel('전류 Z-score', fontsize=9, color='#ea580c')
    ax1_twin.tick_params(axis='y', labelcolor='#ea580c', labelsize=8)

    shade_events(ax1)
    ax1.set_ylabel('전류 (A)', fontsize=10, fontweight='bold')
    ax1.legend(loc='upper left', fontsize=8)
    ax1.set_title('전류 신호 및 스파이크 감지', fontsize=11, fontweight='bold', pad=8)
    ax1.grid(True, alpha=0.3)
    ax1.tick_params(labelsize=8)

    # ─── 패널 2: 속도 신호 + 급감 감지 ───
    ax2 = axes[1]
    ax2.plot(time_sec, speed, color='#16a34a', linewidth=0.5, alpha=0.8, label='속도 (RPM)')

    # 급감 감지 포인트
    drop_idx = np.where(drops)[0]
    if len(drop_idx) > 0:
        drop_sub = drop_idx[::3]
        ax2.scatter(time_sec[drop_sub], speed[drop_sub],
                   color='#dc2626', s=8, alpha=0.6, zorder=5, label='급감 감지')

    # Z-score 보조축
    ax2_twin = ax2.twinx()
    ax2_twin.plot(time_sec, spd_zscores, color='#7c3aed', linewidth=0.4, alpha=0.5)
    ax2_twin.axhline(y=-2.5, color='#ca8a04', linestyle='--', linewidth=0.8, alpha=0.6)
    ax2_twin.axhline(y=-4.0, color='#dc2626', linestyle='--', linewidth=0.8, alpha=0.6)
    ax2_twin.set_ylabel('속도 Z-score', fontsize=9, color='#7c3aed')
    ax2_twin.tick_params(axis='y', labelcolor='#7c3aed', labelsize=8)

    shade_events(ax2)
    ax2.set_ylabel('속도 (RPM)', fontsize=10, fontweight='bold')
    ax2.legend(loc='lower left', fontsize=8)
    ax2.set_title('속도 신호 및 급감 감지', fontsize=11, fontweight='bold', pad=8)
    ax2.grid(True, alpha=0.3)
    ax2.tick_params(labelsize=8)

    # ─── 패널 3: 끼임 확률 ───
    ax3 = axes[2]
    ax3.fill_between(time_sec, probabilities, alpha=0.3, color='#dc2626')
    ax3.plot(time_sec, probabilities, color='#dc2626', linewidth=0.8, label='끼임 확률')

    # 임계값 라인
    ax3.axhline(y=0.3, color='#ca8a04', linestyle='--', linewidth=1, alpha=0.7, label='주의 (0.3)')
    ax3.axhline(y=0.6, color='#ea580c', linestyle='--', linewidth=1, alpha=0.7, label='경고 (0.6)')
    ax3.axhline(y=0.8, color='#dc2626', linestyle='--', linewidth=1, alpha=0.7, label='위험 (0.8)')

    shade_events(ax3)
    ax3.set_ylabel('끼임 확률', fontsize=10, fontweight='bold')
    ax3.set_ylim(-0.05, 1.05)
    ax3.legend(loc='upper left', fontsize=8, ncol=2)
    ax3.set_title('끼임 확률 (다중 증거 융합)', fontsize=11, fontweight='bold', pad=8)
    ax3.grid(True, alpha=0.3)
    ax3.tick_params(labelsize=8)

    # ─── 패널 4: 이벤트 타임라인 ───
    ax4 = axes[3]

    state_colors = {
        'INIT': '#94a3b8', 'NORMAL': '#16a34a',
        'CAUTION': '#ca8a04', 'WARNING': '#ea580c', 'JAMMING': '#dc2626'
    }
    state_values = {
        'INIT': 0, 'NORMAL': 0, 'CAUTION': 1, 'WARNING': 2, 'JAMMING': 3
    }

    state_nums = np.array([state_values.get(s, 0) for s in states])

    # 색상별로 분할 표시
    for state_name, state_val in state_values.items():
        mask = state_nums == state_val
        if np.any(mask):
            ax4.fill_between(time_sec, 0, state_val + 0.5,
                           where=mask, alpha=0.5,
                           color=state_colors[state_name], label=state_name,
                           step='mid')

    # 이벤트 라벨
    for ev in events:
        t_center = (ev['start_ms'] + ev['end_ms']) / 2000
        ax4.annotate(ev['name'], xy=(t_center, 3.3), fontsize=8,
                    ha='center', fontweight='bold',
                    bbox=dict(boxstyle='round,pad=0.3', facecolor='white',
                             edgecolor='gray', alpha=0.9))

    ax4.set_ylabel('상태', fontsize=10, fontweight='bold')
    ax4.set_xlabel('시간 (초)', fontsize=11, fontweight='bold')
    ax4.set_yticks([0, 1, 2, 3])
    ax4.set_yticklabels(['정상', '주의', '경고', '끼임'], fontsize=9)
    ax4.set_ylim(-0.3, 4.0)
    ax4.legend(loc='upper right', fontsize=7, ncol=5)
    ax4.set_title('이벤트 감지 타임라인', fontsize=11, fontweight='bold', pad=8)
    ax4.grid(True, alpha=0.3, axis='x')
    ax4.tick_params(labelsize=8)

    plt.tight_layout(rect=[0, 0, 1, 0.96])

    # 저장
    output_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(output_dir, 'pattern_recognition_result.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print(f"  그래프 저장: {output_path}")


# ============================================================
# 5. 메인 실행
# ============================================================

if __name__ == "__main__":
    results = run_simulation()
