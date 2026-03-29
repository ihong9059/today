"""
슈레더 AI 모델 공통 센서 시뮬레이션 데이터 생성기
- 배터리 리사이클링 슈레더 시스템의 10개 AI 모델에서 공통으로 사용
- 14종 센서 데이터를 물리적 상관관계를 반영하여 생성
- 정상 운전 패턴, 점진적 마모, 이상 이벤트 포함

센서 목록 (14종 + 파생 2종):
  VIB-A/B (x,y,z)  — 3축 가속도 진동 (mm/s)
  CUR-A/B           — 모터 전류 (A)
  SPD-A/B           — 모터 속도 (RPM)
  TMP-IR1/IR2       — 비접촉 적외선 온도 (°C)
  TMP-A/B           — 접촉식 온도 (°C)
  DST-1             — 레이저 분진 농도 (mg/m³)
  GAS-VOC/H2/CO     — 가스 센서 (ppm)
  SCL-weight        — 처리량 스케일 (kg)
  blade_wear_pct    — 칼날 마모율 (0-100%)

AI 모델 10종:
  1. LSTM Autoencoder 베어링이상탐지  — VIB-A/B FFT 1024 bins
  2. Gradient Boosting 칼날마모예측    — CUR, SPD, VIB → 24 features
  3. Classical DSP 축불균형진단         — VIB-A/B 1X 회전주파수
  4. Pattern Recognition 이물질끼임감지 — CUR, SPD 10ms 고속 데이터
  5. Anomaly Detection 발화감지        — TMP-IR, TMP-A/B
  6. CUSUM 분진폭발예측                — DST-1 레이저 분진
  7. Multi Gas Fusion 전해액누출감지    — GAS-VOC, H2, CO
  8. Random Forest 파쇄크기예측         — CUR, SPD, VIB, SCL → 12 features
  9. PID Control RPM최적화             — 모델8 출력 + 목표 + 소재유형
  10. Ensemble 통합분석                 — 전체 센서 + 모델1-9 출력
"""
import numpy as np
import pandas as pd
from datetime import datetime, timedelta


# ──────────────────────────────────────────────
# 상수 정의
# ──────────────────────────────────────────────
# 슈레더 A축 (주축), B축 (보조축) 기본 운전 조건
_BASE_RPM_A = 1200.0      # A축 정격 RPM
_BASE_RPM_B = 800.0       # B축 정격 RPM (역회전, 감속)
_BASE_CUR_A = 85.0        # A축 정격 전류 (A)
_BASE_CUR_B = 60.0        # B축 정격 전류 (A)
_BASE_VIB = 2.5           # 정상 진동 RMS (mm/s)
_BASE_TEMP = 35.0         # 정상 베어링 온도 (°C)
_BASE_IR_TEMP = 45.0      # 정상 IR 표면 온도 (°C)
_BASE_DUST = 5.0          # 정상 분진 농도 (mg/m³)
_BASE_GAS_VOC = 10.0      # 정상 VOC (ppm)
_BASE_GAS_H2 = 2.0        # 정상 H2 (ppm)
_BASE_GAS_CO = 3.0        # 정상 CO (ppm)
_BASE_WEIGHT = 150.0      # 10분당 처리량 (kg)

# 이상 이벤트 확률
_P_BEARING_ANOMALY = 0.003   # 베어링 이상 (0.3%)
_P_FIRE_EVENT = 0.001        # 발화 이벤트 (0.1%)
_P_DUST_SPIKE = 0.005        # 분진 급상승 (0.5%)
_P_GAS_LEAK = 0.002          # 전해액 누출 (0.2%)
_P_JAM_EVENT = 0.004         # 이물질 끼임 (0.4%)


# ──────────────────────────────────────────────
# 내부 헬퍼 함수
# ──────────────────────────────────────────────
def _operating_mask(timestamps):
    """
    가동 마스크 생성: 평일 08-18시 정상가동, 야간/주말은 대기 또는 정지.
    Returns:
        operating: 0.0 (정지) ~ 1.0 (정상가동) 배열
    """
    hours = np.array([ts.hour for ts in timestamps])
    dow = np.array([ts.dayofweek for ts in timestamps])

    # 기본: 평일 주간 = 1.0
    operating = np.ones(len(timestamps), dtype=float)

    # 주말: 정지 (토=5, 일=6)
    operating[dow >= 5] = 0.0

    # 야간 (18시~08시): 감속 운전 or 정지
    night_mask = (hours < 8) | (hours >= 18)
    operating[night_mask & (dow < 5)] = 0.15  # 평일 야간: 저부하 대기

    # 점심시간 (12~13시): 약간 감속
    lunch_mask = (hours == 12)
    operating[lunch_mask & (dow < 5)] = 0.6

    return operating


def _daily_cycle(hours, phase_shift=0.0):
    """일간 사인파 패턴 (낮에 높고 밤에 낮음)"""
    return np.sin(2 * np.pi * hours / 24 - np.pi / 2 + phase_shift)


def _wear_trend(n_points, days, max_wear_pct=30.0):
    """
    칼날 마모 트렌드 생성 (0% → max_wear_pct%).
    비선형 증가: 초기 느리고 후반 가속 (제곱 커브).
    """
    t_norm = np.linspace(0, 1, n_points)
    wear = max_wear_pct * t_norm ** 1.3  # 약간의 가속 마모
    return wear


def _inject_events(n_points, rng, event_prob, duration_range=(3, 15)):
    """
    이벤트 마스크 생성: 발생 시 연속 duration 포인트에 걸쳐 이벤트 지속.
    Returns:
        mask: bool 배열, intensity: 0~1 강도 배열
    """
    mask = np.zeros(n_points, dtype=bool)
    intensity = np.zeros(n_points)

    i = 0
    while i < n_points:
        if rng.random() < event_prob:
            dur = rng.integers(duration_range[0], duration_range[1] + 1)
            end = min(i + dur, n_points)
            mask[i:end] = True
            # 이벤트 강도: 점진적 상승 후 하강 (삼각파)
            event_len = end - i
            peak = rng.uniform(0.5, 1.0)
            ramp = np.concatenate([
                np.linspace(0, peak, event_len // 2 + 1),
                np.linspace(peak, 0, event_len - event_len // 2)
            ])[:event_len]
            intensity[i:end] = ramp
            i = end + rng.integers(50, 200)  # 이벤트 간 최소 간격
        else:
            i += 1

    return mask, intensity


# ──────────────────────────────────────────────
# 메인 데이터 생성 함수
# ──────────────────────────────────────────────
def generate_shredder_full_data(days=90, freq_minutes=10, seed=42):
    """
    슈레더 전체 센서 데이터를 시뮬레이션합니다 (10분 간격, 90일).

    Parameters:
        days: 생성할 일수 (기본 90일)
        freq_minutes: 샘플링 간격 (분, 기본 10분)
        seed: 랜덤 시드

    Returns:
        DataFrame — 14종 센서 + 칼날 마모율 + 타임스탬프 + 이벤트 라벨
        컬럼: timestamp, VIB_A_x, VIB_A_y, VIB_A_z, VIB_B_x, VIB_B_y, VIB_B_z,
              CUR_A, CUR_B, SPD_A, SPD_B, TMP_IR1, TMP_IR2, TMP_A, TMP_B,
              DST_1, GAS_VOC, GAS_H2, GAS_CO, SCL_weight, blade_wear_pct,
              event_label
    """
    rng = np.random.default_rng(seed)

    n_points = days * 24 * 60 // freq_minutes
    timestamps = pd.date_range(
        start='2026-01-01',
        periods=n_points,
        freq=f'{freq_minutes}min'
    )

    hours = np.array([ts.hour for ts in timestamps])
    dow = np.array([ts.dayofweek for ts in timestamps])
    t = np.arange(n_points)

    # ── 가동 마스크 ──
    op = _operating_mask(timestamps)

    # ── 칼날 마모 트렌드 (전체 기간에 걸쳐 0→~30%) ──
    wear = _wear_trend(n_points, days, max_wear_pct=30.0)
    # 마모가 높을수록 전류↑, 진동↑, 온도↑ 에 영향
    wear_factor = 1.0 + wear / 100.0  # 1.0 → 1.3

    # ── 이상 이벤트 생성 ──
    bearing_mask, bearing_int = _inject_events(n_points, rng, _P_BEARING_ANOMALY, (5, 20))
    fire_mask, fire_int = _inject_events(n_points, rng, _P_FIRE_EVENT, (3, 10))
    dust_mask, dust_int = _inject_events(n_points, rng, _P_DUST_SPIKE, (5, 25))
    gas_mask, gas_int = _inject_events(n_points, rng, _P_GAS_LEAK, (10, 40))
    jam_mask, jam_int = _inject_events(n_points, rng, _P_JAM_EVENT, (2, 8))

    # ── 일간 사이클 ──
    daily = _daily_cycle(hours)
    daily_shifted = _daily_cycle(hours, phase_shift=np.pi / 6)

    # ================================================================
    # SPD: 모터 속도 (RPM)
    # ================================================================
    # 속도는 가동 상태에 비례, 이물질 끼임 시 급감
    spd_a = (_BASE_RPM_A * op
             + 30.0 * daily * op
             + rng.normal(0, 8, n_points) * op
             - 400.0 * jam_int * op)  # 끼임 → 속도 급감
    spd_a = np.clip(spd_a, 0, _BASE_RPM_A * 1.15)

    spd_b = (_BASE_RPM_B * op
             + 20.0 * daily * op
             + rng.normal(0, 6, n_points) * op
             - 300.0 * jam_int * op)
    spd_b = np.clip(spd_b, 0, _BASE_RPM_B * 1.15)

    # ================================================================
    # CUR: 모터 전류 (A) — 마모↑, 부하↑ → 전류↑
    # ================================================================
    cur_a = (_BASE_CUR_A * op * wear_factor
             + 8.0 * daily * op
             + rng.normal(0, 2.0, n_points) * op
             + 25.0 * jam_int * op)  # 끼임 → 전류 급상승
    cur_a = np.clip(cur_a, 0, 180)

    cur_b = (_BASE_CUR_B * op * wear_factor
             + 5.0 * daily * op
             + rng.normal(0, 1.5, n_points) * op
             + 18.0 * jam_int * op)
    cur_b = np.clip(cur_b, 0, 130)

    # ================================================================
    # VIB: 3축 진동 (mm/s) — 마모↑, 베어링이상 → 진동↑
    # ================================================================
    def _make_vib(base, axis_weight, bearing_scale):
        """단일 축 진동 생성 (x가 가장 크고 z가 작음)"""
        vib = (base * op * wear_factor * axis_weight
               + 0.4 * daily * op * axis_weight
               + rng.normal(0, 0.25, n_points) * op
               + bearing_scale * bearing_int * op  # 베어링 이상
               + 1.5 * jam_int * op)  # 끼임 → 진동 증가
        return np.clip(vib, 0, 30)

    # A축 진동 — x(수평)>y(수직)>z(축방향)
    vib_a_x = _make_vib(_BASE_VIB, 1.0, 12.0)
    vib_a_y = _make_vib(_BASE_VIB, 0.8, 10.0)
    vib_a_z = _make_vib(_BASE_VIB, 0.5, 6.0)

    # B축 진동 — 보조축이라 약간 낮음
    vib_b_x = _make_vib(_BASE_VIB * 0.8, 1.0, 9.0)
    vib_b_y = _make_vib(_BASE_VIB * 0.8, 0.8, 7.5)
    vib_b_z = _make_vib(_BASE_VIB * 0.8, 0.5, 4.5)

    # ================================================================
    # TMP: 온도 (°C) — 가동 시 상승, 발화이벤트 시 급등
    # ================================================================
    # IR 센서 (비접촉, 파쇄물 표면 온도 — 기본 높음)
    tmp_ir1 = (_BASE_IR_TEMP * np.maximum(op, 0.4)  # 정지 시에도 잔열
               + 5.0 * daily * op
               + wear * 0.1 * op  # 마모→마찰열 증가
               + rng.normal(0, 1.2, n_points)
               + 80.0 * fire_int  # 발화 → 대폭 온도 상승
               + 8.0 * jam_int * op)  # 끼임 → 마찰열

    tmp_ir2 = (tmp_ir1
               + rng.normal(0, 1.5, n_points)  # IR2는 IR1과 유사하나 약간 차이
               - 2.0)  # 위치 차이로 약간 낮음
    tmp_ir1 = np.clip(tmp_ir1, 15, 350)
    tmp_ir2 = np.clip(tmp_ir2, 15, 340)

    # 접촉식 온도 (베어링 하우징)
    tmp_a = (_BASE_TEMP * np.maximum(op, 0.5)
             + 3.0 * daily_shifted * op
             + wear * 0.08 * op
             + rng.normal(0, 0.6, n_points)
             + 15.0 * bearing_int * op  # 베어링 이상 → 국부 과열
             + 30.0 * fire_int)
    tmp_a = np.clip(tmp_a, 15, 150)

    tmp_b = (_BASE_TEMP * 0.9 * np.maximum(op, 0.5)
             + 2.5 * daily_shifted * op
             + wear * 0.06 * op
             + rng.normal(0, 0.5, n_points)
             + 12.0 * bearing_int * op
             + 25.0 * fire_int)
    tmp_b = np.clip(tmp_b, 15, 140)

    # ================================================================
    # DST: 분진 농도 (mg/m³) — 가동 시 발생, 마모↑→증가
    # ================================================================
    dst_1 = (_BASE_DUST * op * wear_factor
             + 1.5 * daily * op
             + rng.normal(0, 0.8, n_points) * op
             + rng.exponential(0.5, n_points) * op  # 간헐적 분진
             + 40.0 * dust_int * op  # 분진 급상승 이벤트
             + 5.0 * jam_int * op)  # 끼임 → 분진 약간 증가
    dst_1 = np.clip(dst_1, 0, 80)

    # ================================================================
    # GAS: 가스 센서 (ppm) — 전해액 누출 시 급상승
    # ================================================================
    gas_voc = (_BASE_GAS_VOC * np.maximum(op, 0.3)
               + 2.0 * daily * op
               + rng.normal(0, 1.0, n_points)
               + 200.0 * gas_int  # 누출 → VOC 대폭 상승
               + 15.0 * fire_int)  # 발화 시에도 VOC 증가
    gas_voc = np.clip(gas_voc, 0, 500)

    gas_h2 = (_BASE_GAS_H2 * np.maximum(op, 0.2)
              + 0.3 * daily * op
              + rng.normal(0, 0.3, n_points)
              + 80.0 * gas_int  # 누출 → H2 상승
              + 20.0 * fire_int)
    gas_h2 = np.clip(gas_h2, 0, 200)

    gas_co = (_BASE_GAS_CO * np.maximum(op, 0.2)
              + 0.5 * daily * op
              + rng.normal(0, 0.4, n_points)
              + 50.0 * gas_int
              + 40.0 * fire_int)  # 발화 시 CO 급상승
    gas_co = np.clip(gas_co, 0, 200)

    # ================================================================
    # SCL: 처리량 (kg/10분) — 가동 시 발생, 끼임 시 감소
    # ================================================================
    scl_weight = (_BASE_WEIGHT * op
                  + 15.0 * daily * op
                  + rng.normal(0, 5.0, n_points) * op
                  - 80.0 * jam_int * op  # 끼임 → 처리량 감소
                  - wear * 0.3 * op)  # 마모 → 처리 효율 약간 감소
    scl_weight = np.clip(scl_weight, 0, 250)

    # ================================================================
    # 이벤트 라벨 (디버그/분석용)
    # ================================================================
    event_labels = np.full(n_points, 'normal', dtype=object)
    event_labels[bearing_mask] = 'bearing_anomaly'
    event_labels[fire_mask] = 'fire_event'
    event_labels[dust_mask] = 'dust_spike'
    event_labels[gas_mask] = 'gas_leak'
    event_labels[jam_mask] = 'jam_event'

    # ── DataFrame 구성 ──
    df = pd.DataFrame({
        'timestamp': timestamps,
        'VIB_A_x': np.round(vib_a_x, 3),
        'VIB_A_y': np.round(vib_a_y, 3),
        'VIB_A_z': np.round(vib_a_z, 3),
        'VIB_B_x': np.round(vib_b_x, 3),
        'VIB_B_y': np.round(vib_b_y, 3),
        'VIB_B_z': np.round(vib_b_z, 3),
        'CUR_A': np.round(cur_a, 2),
        'CUR_B': np.round(cur_b, 2),
        'SPD_A': np.round(spd_a, 1),
        'SPD_B': np.round(spd_b, 1),
        'TMP_IR1': np.round(tmp_ir1, 1),
        'TMP_IR2': np.round(tmp_ir2, 1),
        'TMP_A': np.round(tmp_a, 1),
        'TMP_B': np.round(tmp_b, 1),
        'DST_1': np.round(dst_1, 2),
        'GAS_VOC': np.round(gas_voc, 1),
        'GAS_H2': np.round(gas_h2, 1),
        'GAS_CO': np.round(gas_co, 1),
        'SCL_weight': np.round(scl_weight, 1),
        'blade_wear_pct': np.round(wear, 2),
        'event_label': event_labels,
    })

    return df


def generate_high_freq_data(seconds=3600, freq_ms=10, seed=42):
    """
    고속 센서 데이터 생성 (10ms 간격) — 모델4 이물질끼임감지용.

    Parameters:
        seconds: 생성할 총 시간 (초, 기본 3600초 = 1시간)
        freq_ms: 샘플링 간격 (밀리초, 기본 10ms = 100Hz)
        seed: 랜덤 시드

    Returns:
        DataFrame — CUR_A, CUR_B, SPD_A, SPD_B, is_jam_event
        10ms 간격의 고속 전류/속도 데이터
    """
    rng = np.random.default_rng(seed)

    n_points = seconds * 1000 // freq_ms
    timestamps = pd.date_range(
        start='2026-01-15 09:00:00',
        periods=n_points,
        freq=f'{freq_ms}ms'
    )

    t = np.arange(n_points)
    t_sec = t * freq_ms / 1000.0  # 초 단위 시간

    # ── RPM 기본 파형 (회전 주파수 성분 포함) ──
    rotation_freq_a = _BASE_RPM_A / 60.0  # Hz (20Hz)
    rotation_freq_b = _BASE_RPM_B / 60.0  # Hz (~13.3Hz)

    # SPD: 기본 RPM + 미세 변동
    spd_a = (_BASE_RPM_A
             + 3.0 * np.sin(2 * np.pi * 0.01 * t_sec)  # 저주파 변동
             + rng.normal(0, 2.0, n_points))

    spd_b = (_BASE_RPM_B
             + 2.0 * np.sin(2 * np.pi * 0.01 * t_sec + 0.5)
             + rng.normal(0, 1.5, n_points))

    # CUR: 기본 전류 + 회전 맥동 + 노이즈
    cur_a = (_BASE_CUR_A
             + 3.0 * np.sin(2 * np.pi * rotation_freq_a * t_sec)  # 회전 맥동
             + 1.0 * np.sin(2 * np.pi * rotation_freq_a * 2 * t_sec)  # 2차 고조파
             + rng.normal(0, 1.5, n_points))

    cur_b = (_BASE_CUR_B
             + 2.0 * np.sin(2 * np.pi * rotation_freq_b * t_sec)
             + 0.7 * np.sin(2 * np.pi * rotation_freq_b * 2 * t_sec)
             + rng.normal(0, 1.0, n_points))

    # ── 이물질 끼임 이벤트 주입 ──
    # 1시간 중 3~5번의 끼임 이벤트 (각 0.5~3초 지속)
    is_jam = np.zeros(n_points, dtype=bool)
    n_events = rng.integers(3, 6)
    event_starts = sorted(rng.choice(
        np.arange(n_points // 10, n_points - n_points // 10),
        size=n_events, replace=False
    ))

    for start in event_starts:
        duration_pts = rng.integers(50, 300)  # 0.5~3초 (10ms 단위)
        end = min(start + duration_pts, n_points)
        is_jam[start:end] = True

        # 끼임 시 패턴: 전류 급상승 → 속도 급감 (시간차 존재)
        event_len = end - start
        # 전류: 급상승 후 서서히 감소
        cur_spike = 30.0 * np.exp(-np.linspace(0, 3, event_len))
        cur_a[start:end] += cur_spike
        cur_b[start:end] += cur_spike * 0.7

        # 속도: 약간의 지연 후 감소 (관성)
        delay = min(10, event_len // 3)
        spd_drop = -200.0 * (1 - np.exp(-np.linspace(0, 2, event_len - delay)))
        if end - start - delay > 0:
            spd_a[start + delay:end] += spd_drop[:end - start - delay]
            spd_b[start + delay:end] += spd_drop[:end - start - delay] * 0.6

    # 클리핑
    spd_a = np.clip(spd_a, 0, _BASE_RPM_A * 1.2)
    spd_b = np.clip(spd_b, 0, _BASE_RPM_B * 1.2)
    cur_a = np.clip(cur_a, 0, 200)
    cur_b = np.clip(cur_b, 0, 150)

    df = pd.DataFrame({
        'timestamp': timestamps,
        'CUR_A': np.round(cur_a, 3),
        'CUR_B': np.round(cur_b, 3),
        'SPD_A': np.round(spd_a, 2),
        'SPD_B': np.round(spd_b, 2),
        'is_jam_event': is_jam.astype(int),
    })

    return df


def generate_fft_data(n_samples=1000, n_bins=1024, seed=42):
    """
    FFT 스펙트럼 데이터 생성 — 모델1 LSTM Autoencoder 베어링이상탐지용.

    VIB-A/B 센서의 3축 진동을 FFT 변환한 결과를 시뮬레이션.
    실제로는 고속 샘플링(10kHz 이상) 원시 데이터를 FFT한 결과이며,
    여기서는 주파수 도메인 특성을 직접 생성.

    Parameters:
        n_samples: 생성할 FFT 윈도우 수 (기본 1000개)
        n_bins: FFT bin 수 (기본 1024)
        seed: 랜덤 시드

    Returns:
        dict:
            'VIB_A_fft': (n_samples, 1024, 3) — A축 x,y,z FFT 파워 스펙트럼
            'VIB_B_fft': (n_samples, 1024, 3) — B축 x,y,z FFT 파워 스펙트럼
            'labels': (n_samples,) — 0=정상, 1=베어링이상
            'freqs': (1024,) — 주파수 축 (Hz), 0~5000Hz
    """
    rng = np.random.default_rng(seed)

    fs = 10000  # 샘플링 주파수 10kHz 가정
    freqs = np.linspace(0, fs / 2, n_bins)  # 0~5000 Hz

    # 주요 주파수 성분
    rpm_a = _BASE_RPM_A  # 1200 RPM = 20 Hz
    rpm_b = _BASE_RPM_B  # 800 RPM = ~13.3 Hz
    f1x_a = rpm_a / 60.0  # 1X 회전 주파수 (A축)
    f1x_b = rpm_b / 60.0  # 1X (B축)

    # 베어링 결함 특성 주파수 (볼 베어링 기준 근사)
    bpfo_a = f1x_a * 3.56   # 외륜 결함 주파수 (Ball Pass Freq. Outer)
    bpfi_a = f1x_a * 5.44   # 내륜 결함 주파수
    bsf_a = f1x_a * 2.32    # 볼 결함 주파수
    ftf_a = f1x_a * 0.38    # 케이지 결함 주파수 (예비)

    bpfo_b = f1x_b * 3.56
    bpfi_b = f1x_b * 5.44
    bsf_b = f1x_b * 2.32

    # 이상 비율 (약 10%를 이상으로 설정)
    n_anomaly = int(n_samples * 0.10)
    labels = np.zeros(n_samples, dtype=int)
    anomaly_indices = rng.choice(n_samples, size=n_anomaly, replace=False)
    labels[anomaly_indices] = 1

    def _freq_peak(freqs, center_freq, bandwidth=2.0, amplitude=1.0):
        """특정 주파수에 가우시안 피크 생성"""
        return amplitude * np.exp(-0.5 * ((freqs - center_freq) / bandwidth) ** 2)

    def _make_spectrum(is_anomaly, base_freq, bpfo, bpfi, bsf, axis_scale):
        """단일 축 FFT 파워 스펙트럼 생성"""
        spec = np.zeros(n_bins)

        # 기본 1X 피크
        spec += _freq_peak(freqs, base_freq, 1.5, rng.uniform(8, 12) * axis_scale)
        # 2X, 3X 고조파
        spec += _freq_peak(freqs, base_freq * 2, 1.5, rng.uniform(3, 5) * axis_scale)
        spec += _freq_peak(freqs, base_freq * 3, 2.0, rng.uniform(1, 3) * axis_scale)

        # 배경 노이즈 (1/f 스펙트럼)
        bg = 0.5 * axis_scale / (1 + freqs / 100)
        spec += bg + rng.exponential(0.1 * axis_scale, n_bins)

        if is_anomaly:
            # 베어링 결함 주파수 피크 추가
            severity = rng.uniform(0.5, 1.0)
            spec += _freq_peak(freqs, bpfo, 2.0, rng.uniform(5, 15) * severity * axis_scale)
            spec += _freq_peak(freqs, bpfi, 2.0, rng.uniform(3, 10) * severity * axis_scale)
            spec += _freq_peak(freqs, bsf, 1.5, rng.uniform(2, 8) * severity * axis_scale)
            # 결함 고조파 (2X, 3X)
            for h in [2, 3]:
                spec += _freq_peak(freqs, bpfo * h, 3.0,
                                   rng.uniform(1, 5) * severity * axis_scale)
            # 전체 노이즈 플로어 상승
            spec += rng.uniform(0.5, 2.0) * severity * axis_scale

        return np.maximum(spec, 0)

    # 6채널 FFT 생성 (A: x,y,z / B: x,y,z)
    vib_a_fft = np.zeros((n_samples, n_bins, 3))
    vib_b_fft = np.zeros((n_samples, n_bins, 3))
    axis_scales = [1.0, 0.8, 0.5]  # x > y > z

    for i in range(n_samples):
        is_anom = labels[i] == 1
        for ax_idx, scale in enumerate(axis_scales):
            vib_a_fft[i, :, ax_idx] = _make_spectrum(
                is_anom, f1x_a, bpfo_a, bpfi_a, bsf_a, scale)
            vib_b_fft[i, :, ax_idx] = _make_spectrum(
                is_anom, f1x_b, bpfo_b, bpfi_b, bsf_b, scale * 0.85)

    return {
        'VIB_A_fft': vib_a_fft,
        'VIB_B_fft': vib_b_fft,
        'labels': labels,
        'freqs': freqs,
    }


def split_time_series(df, train_ratio=0.7, val_ratio=0.15):
    """
    시계열 데이터를 시간순으로 분할합니다 (랜덤 분할 금지!).

    Parameters:
        df: 시계열 DataFrame
        train_ratio: 학습 데이터 비율 (기본 70%)
        val_ratio: 검증 데이터 비율 (기본 15%)
        (테스트 = 나머지 15%)

    Returns:
        train_df, val_df, test_df
    """
    n = len(df)
    train_end = int(n * train_ratio)
    val_end = int(n * (train_ratio + val_ratio))

    train = df.iloc[:train_end].copy()
    val = df.iloc[train_end:val_end].copy()
    test = df.iloc[val_end:].copy()

    return train, val, test


# ──────────────────────────────────────────────
# 유틸리티 함수
# ──────────────────────────────────────────────
def get_sensor_columns():
    """센서 컬럼 목록을 딕셔너리로 반환 (모델별 필요 센서 매핑)"""
    return {
        'vibration': ['VIB_A_x', 'VIB_A_y', 'VIB_A_z',
                       'VIB_B_x', 'VIB_B_y', 'VIB_B_z'],
        'current': ['CUR_A', 'CUR_B'],
        'speed': ['SPD_A', 'SPD_B'],
        'temperature': ['TMP_IR1', 'TMP_IR2', 'TMP_A', 'TMP_B'],
        'dust': ['DST_1'],
        'gas': ['GAS_VOC', 'GAS_H2', 'GAS_CO'],
        'scale': ['SCL_weight'],
        'wear': ['blade_wear_pct'],
        'all_sensors': [
            'VIB_A_x', 'VIB_A_y', 'VIB_A_z',
            'VIB_B_x', 'VIB_B_y', 'VIB_B_z',
            'CUR_A', 'CUR_B', 'SPD_A', 'SPD_B',
            'TMP_IR1', 'TMP_IR2', 'TMP_A', 'TMP_B',
            'DST_1', 'GAS_VOC', 'GAS_H2', 'GAS_CO',
            'SCL_weight', 'blade_wear_pct',
        ],
    }


def get_model_sensors():
    """각 AI 모델이 사용하는 센서 목록 반환"""
    cols = get_sensor_columns()
    return {
        'model_01_bearing': cols['vibration'],
        'model_02_blade_wear': cols['current'] + cols['speed'] + cols['vibration'],
        'model_03_imbalance': cols['vibration'],
        'model_04_jamming': cols['current'] + cols['speed'],
        'model_05_fire': cols['temperature'],
        'model_06_dust': cols['dust'],
        'model_07_gas_leak': cols['gas'],
        'model_08_crush_size': (cols['current'] + cols['speed']
                                + cols['vibration'] + cols['scale']),
        'model_09_pid_rpm': cols['speed'] + cols['scale'],
        'model_10_ensemble': cols['all_sensors'],
    }


# ──────────────────────────────────────────────
# 메인 실행
# ──────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 70)
    print("  슈레더 AI 공통 센서 데이터 생성기")
    print("=" * 70)

    # ── 1. 전체 센서 데이터 (10분 간격, 90일) ──
    print("\n[1] 전체 센서 데이터 생성 (90일, 10분 간격)...")
    df = generate_shredder_full_data(days=90, freq_minutes=10, seed=42)
    print(f"    생성 완료: {len(df):,}건")
    print(f"    기간: {df['timestamp'].min()} ~ {df['timestamp'].max()}")
    print(f"    컬럼 수: {len(df.columns)}개")

    # 이벤트 통계
    event_counts = df['event_label'].value_counts()
    print(f"\n    이벤트 분포:")
    for label, count in event_counts.items():
        pct = count / len(df) * 100
        print(f"      {label:20s}: {count:6,}건 ({pct:5.2f}%)")

    # 센서별 통계
    sensor_cols = get_sensor_columns()['all_sensors']
    print(f"\n    센서별 통계:")
    print(df[sensor_cols].describe().round(2).to_string())

    # 학습/검증/테스트 분할
    train, val, test = split_time_series(df)
    print(f"\n    데이터 분할: 학습={len(train):,} / 검증={len(val):,} / 테스트={len(test):,}")

    # ── 2. 고속 데이터 (10ms 간격, 1시간) ──
    print("\n" + "-" * 70)
    print("[2] 고속 센서 데이터 생성 (1시간, 10ms 간격)...")
    df_hf = generate_high_freq_data(seconds=3600, freq_ms=10, seed=42)
    print(f"    생성 완료: {len(df_hf):,}건")
    n_jam = df_hf['is_jam_event'].sum()
    print(f"    끼임 이벤트 포인트: {n_jam:,}건 ({n_jam/len(df_hf)*100:.2f}%)")
    print(f"    CUR_A 범위: {df_hf['CUR_A'].min():.1f} ~ {df_hf['CUR_A'].max():.1f} A")
    print(f"    SPD_A 범위: {df_hf['SPD_A'].min():.1f} ~ {df_hf['SPD_A'].max():.1f} RPM")

    # ── 3. FFT 데이터 (1024 bins) ──
    print("\n" + "-" * 70)
    print("[3] FFT 스펙트럼 데이터 생성 (1000 샘플, 1024 bins)...")
    fft_data = generate_fft_data(n_samples=1000, n_bins=1024, seed=42)
    print(f"    VIB_A_fft shape: {fft_data['VIB_A_fft'].shape}")
    print(f"    VIB_B_fft shape: {fft_data['VIB_B_fft'].shape}")
    n_normal = (fft_data['labels'] == 0).sum()
    n_anom = (fft_data['labels'] == 1).sum()
    print(f"    정상: {n_normal}건 / 이상: {n_anom}건")
    print(f"    주파수 범위: {fft_data['freqs'][0]:.0f} ~ {fft_data['freqs'][-1]:.0f} Hz")

    # ── 4. 모델별 센서 매핑 ──
    print("\n" + "-" * 70)
    print("[4] 모델별 사용 센서:")
    model_sensors = get_model_sensors()
    for model, sensors in model_sensors.items():
        short = ', '.join(sensors[:4])
        suffix = '...' if len(sensors) > 4 else ''
        print(f"    {model:25s}: {len(sensors):2d}개 — {short}{suffix}")

    print("\n" + "=" * 70)
    print("  데이터 생성 완료!")
    print("=" * 70)
