"""
슈레더 센서 시뮬레이션 데이터 생성기
- 모든 시계열 모델 예제에서 공통으로 사용
- 실제 슈레더 베어링 온도/진동/전류를 모사
"""
import numpy as np
import pandas as pd
from datetime import datetime, timedelta


def generate_shredder_data(days=90, freq_minutes=10, seed=42):
    """
    슈레더 센서 데이터를 시뮬레이션합니다.

    Parameters:
        days: 생성할 일수 (기본 90일 = 3개월)
        freq_minutes: 샘플링 간격 (분)
        seed: 랜덤 시드

    Returns:
        DataFrame with columns:
        - timestamp: 시간
        - temperature: 베어링 온도 (°C)
        - vibration: 진동 RMS (mm/s)
        - current: 모터 전류 (A)
        - rpm: 회전속도
        - throughput: 처리량 (t/h)
    """
    np.random.seed(seed)

    n_points = days * 24 * 60 // freq_minutes
    timestamps = pd.date_range(
        start='2026-01-01',
        periods=n_points,
        freq=f'{freq_minutes}min'
    )

    t = np.arange(n_points)
    hours = np.array([ts.hour for ts in timestamps])
    dow = np.array([ts.dayofweek for ts in timestamps])

    # === 베어링 온도 ===
    # 기본 온도 + 일간 패턴 + 주간 패턴 + 칼날 마모 트렌드 + 노이즈
    base_temp = 28.0
    daily_pattern = 5.0 * np.sin(2 * np.pi * hours / 24 - np.pi/2)  # 낮에 높음
    weekly_pattern = np.where(dow >= 5, -3.0, 0.0)  # 주말 비가동 → 낮음
    wear_trend = 0.03 * t / (24 * 60 / freq_minutes)  # 하루 0.03°C씩 상승 (마모)
    noise = np.random.normal(0, 0.8, n_points)

    # 가끔 이상 고온 이벤트 (0.5% 확률)
    anomaly_mask = np.random.random(n_points) < 0.005
    anomaly_spike = anomaly_mask * np.random.uniform(15, 30, n_points)

    temperature = base_temp + daily_pattern + weekly_pattern + wear_trend + noise + anomaly_spike
    temperature = np.clip(temperature, 15, 80)

    # === 진동 RMS ===
    base_vib = 2.5
    vib_daily = 0.5 * np.sin(2 * np.pi * hours / 24)
    vib_wear = 0.02 * t / (24 * 60 / freq_minutes)  # 마모에 따라 증가
    vib_noise = np.random.normal(0, 0.3, n_points)
    vib_anomaly = anomaly_mask * np.random.uniform(5, 15, n_points)

    vibration = base_vib + vib_daily + vib_wear + vib_noise + vib_anomaly
    vibration = np.clip(vibration, 0.5, 25)

    # === 모터 전류 ===
    base_cur = 85.0
    cur_daily = 10.0 * np.sin(2 * np.pi * hours / 24 - np.pi/3)
    cur_wear = 0.05 * t / (24 * 60 / freq_minutes)
    cur_noise = np.random.normal(0, 2.0, n_points)
    cur_weekend = np.where(dow >= 5, -30.0, 0.0)

    current = base_cur + cur_daily + cur_wear + cur_noise + cur_weekend
    current = np.clip(current, 20, 150)

    # === RPM ===
    base_rpm = 20.0
    rpm_var = np.random.normal(0, 0.3, n_points)
    rpm_weekend = np.where(dow >= 5, -15.0, 0.0)

    rpm = base_rpm + rpm_var + rpm_weekend
    rpm = np.clip(rpm, 0, 25)

    # === 처리량 ===
    base_tp = 2.5
    tp_daily = 0.5 * np.sin(2 * np.pi * hours / 24 - np.pi/4)
    tp_noise = np.random.normal(0, 0.15, n_points)
    tp_weekend = np.where(dow >= 5, -2.0, 0.0)

    throughput = base_tp + tp_daily + tp_noise + tp_weekend
    throughput = np.clip(throughput, 0, 4)

    df = pd.DataFrame({
        'timestamp': timestamps,
        'temperature': np.round(temperature, 2),
        'vibration': np.round(vibration, 2),
        'current': np.round(current, 2),
        'rpm': np.round(rpm, 2),
        'throughput': np.round(throughput, 2)
    })

    return df


def split_time_series(df, train_ratio=0.7, val_ratio=0.15):
    """시계열 데이터를 시간순으로 분할 (랜덤 분할 금지!)"""
    n = len(df)
    train_end = int(n * train_ratio)
    val_end = int(n * (train_ratio + val_ratio))

    train = df.iloc[:train_end].copy()
    val = df.iloc[train_end:val_end].copy()
    test = df.iloc[val_end:].copy()

    return train, val, test


if __name__ == "__main__":
    df = generate_shredder_data(days=90)
    print(f"생성된 데이터: {len(df)}건")
    print(f"기간: {df['timestamp'].min()} ~ {df['timestamp'].max()}")
    print(f"\n컬럼별 통계:")
    print(df.describe().round(2))

    df.to_csv("shredder_sensor_data.csv", index=False)
    print("\nshredder_sensor_data.csv 저장 완료!")
