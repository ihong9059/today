"""
LSTM Autoencoder 시뮬레이션 — 슈레더 베어링 이상 탐지
=====================================================
LSTM의 핵심 특징을 체험합니다:
  1. 시퀀스(연속된 데이터)의 패턴을 학습
  2. 정상 패턴을 학습한 후, 비정상을 감지 (Autoencoder)
  3. 다변량 입력 가능 (온도+진동+전류 동시 사용)
  4. "기억" 능력 — 과거 패턴을 기억하여 판단
"""
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from common_data import generate_shredder_data

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False


def create_sequences(data, seq_length=30):
    """시계열 데이터를 LSTM 입력용 시퀀스로 변환"""
    sequences = []
    for i in range(len(data) - seq_length):
        sequences.append(data[i:i+seq_length])
    return np.array(sequences)


def run_lstm_simulation():
    print("=" * 60)
    print("  LSTM Autoencoder 시뮬레이션 — 베어링 이상 탐지")
    print("=" * 60)

    # 1. 데이터 생성
    print("\n[1단계] 데이터 생성...")
    df = generate_shredder_data(days=90, freq_minutes=60)

    # 다변량: 온도 + 진동 + 전류 (3개 센서 동시 사용!)
    features = ['temperature', 'vibration', 'current']
    data = df[features].values

    print(f"  데이터: {len(df)}건, 특징: {features}")
    print(f"  ★ Prophet과 달리 3개 센서를 동시에 사용합니다 (다변량)")

    # 2. 정규화
    scaler = StandardScaler()
    data_scaled = scaler.fit_transform(data)

    # 3. 학습/테스트 분할 (시간순!)
    train_size = int(len(data_scaled) * 0.7)
    train_data = data_scaled[:train_size]
    test_data = data_scaled[train_size:]

    # 4. 시퀀스 생성 (30 타임스텝 = 30시간 윈도우)
    seq_length = 30
    X_train = create_sequences(train_data, seq_length)
    X_test = create_sequences(test_data, seq_length)

    print(f"  Train 시퀀스: {X_train.shape} (시퀀스수, 길이, 특징수)")
    print(f"  Test 시퀀스: {X_test.shape}")

    # 5. LSTM Autoencoder 구축 (Keras)
    print("\n[2단계] LSTM Autoencoder 모델 구축...")
    try:
        import tensorflow as tf
        from tensorflow.keras.models import Sequential, Model
        from tensorflow.keras.layers import LSTM, Dense, RepeatVector, TimeDistributed, Input

        # 모델 구조
        model = Sequential([
            # Encoder — 입력을 압축 (30×3 → 16)
            LSTM(32, input_shape=(seq_length, len(features)), return_sequences=True),
            LSTM(16, return_sequences=False),

            # Bottleneck — 핵심 패턴만 남김
            RepeatVector(seq_length),

            # Decoder — 압축을 복원 (16 → 30×3)
            LSTM(16, return_sequences=True),
            LSTM(32, return_sequences=True),
            TimeDistributed(Dense(len(features)))
        ])

        model.compile(optimizer='adam', loss='mse')
        print(f"  모델 파라미터: {model.count_params():,}개")

        # 6. 학습
        print("\n[3단계] 정상 데이터로 학습 (정상 패턴 기억 중)...")
        history = model.fit(
            X_train, X_train,  # 입력=출력 (Autoencoder!)
            epochs=20,
            batch_size=32,
            validation_split=0.1,
            verbose=0
        )
        print(f"  학습 완료! (최종 loss: {history.history['loss'][-1]:.6f})")

        # 7. 이상 탐지
        print("\n[4단계] 이상 탐지 실행...")
        train_pred = model.predict(X_train, verbose=0)
        test_pred = model.predict(X_test, verbose=0)

        # 재구성 오차 = 정상과 얼마나 다른가
        train_mse = np.mean(np.power(X_train - train_pred, 2), axis=(1, 2))
        test_mse = np.mean(np.power(X_test - test_pred, 2), axis=(1, 2))

        # 임계값 = Train의 95 percentile
        threshold = np.percentile(train_mse, 95)
        anomalies = test_mse > threshold

        print(f"  임계값: {threshold:.6f}")
        print(f"  Test 이상 감지: {anomalies.sum()}건 / {len(anomalies)}건 ({anomalies.mean()*100:.1f}%)")

        use_real_model = True

    except ImportError:
        print("  ⚠️ TensorFlow 미설치 — 간소화 버전으로 시뮬레이션합니다.")
        print("  (pip install tensorflow 로 설치하면 실제 LSTM 실행 가능)")

        # 간소화: sklearn의 Isolation Forest로 대체 시뮬레이션
        from sklearn.ensemble import IsolationForest
        iso = IsolationForest(contamination=0.05, random_state=42)
        iso.fit(train_data)

        test_scores = -iso.score_samples(test_data)
        threshold = np.percentile(-iso.score_samples(train_data), 95)
        anomalies_full = test_scores > threshold

        # 시퀀스 길이에 맞춤
        test_mse = test_scores[seq_length:]
        train_mse = -iso.score_samples(train_data)
        anomalies = anomalies_full[seq_length:]

        print(f"  임계값: {threshold:.4f}")
        print(f"  Test 이상 감지: {anomalies.sum()}건")
        use_real_model = False

    # 8. 시각화
    print("\n[5단계] 결과 시각화...")
    fig, axes = plt.subplots(4, 1, figsize=(14, 14))

    test_timestamps = df['timestamp'].iloc[train_size + seq_length:train_size + seq_length + len(test_mse)]

    # 8-1. 원본 센서 데이터
    ax1 = axes[0]
    ax1.plot(df['timestamp'], df['temperature'], 'b-', alpha=0.5, linewidth=0.5, label='온도')
    ax1.axvline(x=df['timestamp'].iloc[train_size], color='green', linestyle='--', label='학습/테스트 경계')
    ax1.set_title('원본 센서 데이터 — 베어링 온도', fontsize=13, fontweight='bold')
    ax1.set_ylabel('온도 (°C)')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # 8-2. 재구성 오차 (이상 점수)
    ax2 = axes[1]
    ax2.plot(test_timestamps[:len(test_mse)], test_mse, 'b-', alpha=0.7, linewidth=0.5, label='재구성 오차')
    ax2.axhline(y=threshold, color='red', linestyle='--', linewidth=2, label=f'임계값 ({threshold:.4f})')
    ax2.fill_between(test_timestamps[:len(test_mse)], 0, test_mse,
                     where=anomalies[:len(test_timestamps)], color='red', alpha=0.3, label='이상 감지!')
    ax2.set_title('LSTM Autoencoder 재구성 오차 (높을수록 비정상)', fontsize=13, fontweight='bold')
    ax2.set_ylabel('재구성 오차 (MSE)')
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    # 8-3. 정상 vs 이상 분포
    ax3 = axes[2]
    ax3.hist(train_mse, bins=50, alpha=0.6, color='green', label='정상 (Train)', density=True)
    ax3.hist(test_mse, bins=50, alpha=0.6, color='blue', label='테스트 (Test)', density=True)
    ax3.axvline(x=threshold, color='red', linestyle='--', linewidth=2, label='임계값')
    ax3.set_title('재구성 오차 분포 — 정상 vs 테스트', fontsize=13, fontweight='bold')
    ax3.set_xlabel('재구성 오차')
    ax3.legend()
    ax3.grid(True, alpha=0.3)

    # 8-4. 다변량 시각화 (LSTM의 강점!)
    ax4 = axes[3]
    ax4_twin1 = ax4.twinx()
    ax4.plot(df['timestamp'][-200:], df['temperature'][-200:], 'r-', label='온도', alpha=0.8)
    ax4.plot(df['timestamp'][-200:], df['vibration'][-200:] * 5, 'b-', label='진동(×5)', alpha=0.8)
    ax4_twin1.plot(df['timestamp'][-200:], df['current'][-200:], 'g-', label='전류', alpha=0.5)
    ax4.set_title('★ LSTM의 강점: 다변량 동시 분석 (온도+진동+전류)', fontsize=13, fontweight='bold')
    ax4.set_ylabel('온도/진동')
    ax4_twin1.set_ylabel('전류 (A)', color='green')
    ax4.legend(loc='upper left')
    ax4_twin1.legend(loc='upper right')
    ax4.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(os.path.join(os.path.dirname(__file__), 'lstm_result.png'), dpi=150, bbox_inches='tight')
    plt.show()

    # 9. LSTM 핵심 특징 요약
    print("\n" + "=" * 60)
    print("  LSTM Autoencoder 핵심 특징 요약")
    print("=" * 60)
    print(f"""
  ✅ 장점:
    • 다변량 입력: 온도+진동+전류 3개를 동시에 분석
      (Prophet은 온도 하나만 가능했음)
    • Autoencoder: 정상 패턴을 학습 → 비정상 자동 감지
      (이상 데이터가 없어도 학습 가능!)
    • 시퀀스 학습: 30시간 윈도우의 패턴을 기억
    • 이상 감지: {anomalies.sum()}건 감지 (전체의 {anomalies.mean()*100:.1f}%)

  ❌ 단점:
    • Prophet보다 코드가 복잡 (모델 구조 설계 필요)
    • 하이퍼파라미터 튜닝 필요 (시퀀스 길이, 레이어 수 등)
    • "왜 이상인지" 설명이 어려움 (블랙박스)

  🏭 슈레더 적용:
    • 베어링 이상 탐지 → ★ 최적! (이 프로젝트에서 실제 사용)
    • 정상 운전 28일 학습 → 이후 이상 자동 감지
    """)


if __name__ == "__main__":
    run_lstm_simulation()
