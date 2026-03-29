"""
LSTM Autoencoder 시뮬레이션 — 슈레더 베어링 이상 탐지 (FFT 기반)
================================================================
슈레더 베어링의 진동 센서 데이터를 FFT 변환하여 주파수 도메인에서
LSTM Autoencoder 개념을 구현합니다.
  - 1024 frequency bins (FFT 스펙트럼)
  - 정상 데이터로만 학습 → 재구성 오차로 이상 탐지
  - numpy/sklearn만 사용 (TensorFlow/PyTorch 불필요)
"""
import sys, os
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA

# 공통 데이터 생성기
from common_data import generate_fft_data

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


# ──────────────────────────────────────────
# LSTM Autoencoder 개념 구현 (numpy 기반)
# ──────────────────────────────────────────
class NumpyLSTMAutoencoder:
    """
    LSTM Autoencoder의 핵심 개념을 PCA + 밀도 추정으로 시뮬레이션합니다.

    실제 LSTM Autoencoder 동작 원리:
      Encoder: 고차원 입력 → 저차원 잠재 벡터로 압축
      Decoder: 잠재 벡터 → 원본과 유사하게 복원
      이상 탐지: 복원 오차(MSE)가 클수록 비정상

    시뮬레이션 근사:
      PCA: 차원 축소 (Encoder 역할)
      역변환: 차원 복원 (Decoder 역할)
      복원 오차: 원본 vs PCA 역변환 차이
    """

    def __init__(self, latent_dim=32):
        self.latent_dim = latent_dim
        self.pca = PCA(n_components=latent_dim)
        self.scaler = MinMaxScaler()
        self.threshold = None
        self.train_errors = None

    def fit(self, X_train):
        """정상 데이터로 학습 (Encoder-Decoder 패턴 기억)"""
        # 정규화
        X_scaled = self.scaler.fit_transform(X_train)

        # PCA: 차원 축소 → 복원 (Autoencoder 시뮬레이션)
        encoded = self.pca.fit_transform(X_scaled)    # Encoder
        decoded = self.pca.inverse_transform(encoded)  # Decoder

        # 학습 데이터의 재구성 오차 계산
        self.train_errors = np.mean((X_scaled - decoded) ** 2, axis=1)

        # 임계값: 학습 데이터 오차의 95 percentile
        self.threshold = np.percentile(self.train_errors, 95)

        return self

    def predict(self, X):
        """입력 데이터의 재구성 결과 반환"""
        X_scaled = self.scaler.transform(X)
        encoded = self.pca.transform(X_scaled)
        decoded = self.pca.inverse_transform(encoded)
        return self.scaler.inverse_transform(decoded)

    def anomaly_score(self, X):
        """이상 점수 계산 (0~1)"""
        X_scaled = self.scaler.transform(X)
        encoded = self.pca.transform(X_scaled)
        decoded = self.pca.inverse_transform(encoded)

        # 재구성 오차 (MSE)
        mse = np.mean((X_scaled - decoded) ** 2, axis=1)

        # 0~1 스케일로 정규화
        # 정상 범위: 0~threshold → 0~0.3
        # 이상 범위: threshold~ → 0.3~1.0
        scores = np.zeros_like(mse)
        normal_mask = mse <= self.threshold
        scores[normal_mask] = 0.3 * (mse[normal_mask] / (self.threshold + 1e-10))

        anomaly_mask = mse > self.threshold
        if anomaly_mask.any():
            max_error = max(mse.max(), self.threshold * 5)
            scores[anomaly_mask] = 0.3 + 0.7 * (
                (mse[anomaly_mask] - self.threshold) /
                (max_error - self.threshold + 1e-10)
            )
        scores = np.clip(scores, 0, 1)
        return scores, mse


# ──────────────────────────────────────────
# 메인 시뮬레이션
# ──────────────────────────────────────────
def run_simulation():
    print("=" * 65)
    print("  모델 01: LSTM Autoencoder 베어링 이상 탐지 시뮬레이션")
    print("  (FFT 1024 bins 기반)")
    print("=" * 65)

    # ── 1단계: FFT 스펙트럼 데이터 생성 ──
    print("\n[1단계] FFT 스펙트럼 데이터 생성 (common_data.generate_fft_data)...")
    fft_data = generate_fft_data(n_samples=1000, n_bins=1024, seed=42)

    vib_a_fft = fft_data['VIB_A_fft']  # (1000, 1024, 3)
    vib_b_fft = fft_data['VIB_B_fft']  # (1000, 1024, 3)
    labels = fft_data['labels']          # (1000,) 0=정상, 1=이상
    freqs = fft_data['freqs']            # (1024,) Hz

    n_samples = len(labels)
    n_bins = vib_a_fft.shape[1]

    print(f"  생성된 FFT 데이터: {n_samples}개 윈도우")
    print(f"  VIB_A shape: {vib_a_fft.shape} (샘플, bins, 축)")
    print(f"  VIB_B shape: {vib_b_fft.shape}")
    print(f"  주파수 범위: {freqs[0]:.1f} ~ {freqs[-1]:.1f} Hz")
    print(f"  정상 데이터: {(labels==0).sum()}개, 이상 데이터: {(labels==1).sum()}개")

    # ── 2단계: 특징 행렬 구성 ──
    print("\n[2단계] FFT 특징 행렬 구성...")
    print("  → A축 x,y,z + B축 x,y,z → 6채널의 1024 bins 평균 파워 스펙트럼")

    # 6채널을 평균하여 대표 스펙트럼 생성 (또는 concatenate)
    # 여기서는 A축 3채널의 평균 파워를 사용 (실무에서는 6채널 모두 사용)
    fft_features = np.mean(vib_a_fft, axis=2)  # (1000, 1024) — A축 평균
    print(f"  특징 행렬 shape: {fft_features.shape} (샘플수, 주파수 bins)")

    # ── 3단계: 학습/테스트 분할 ──
    print("\n[3단계] 학습/테스트 데이터 분할...")
    # 정상 데이터만 학습에 사용 (비지도 학습!)
    normal_mask = labels == 0
    X_normal = fft_features[normal_mask]

    # 정상 데이터의 70%를 학습, 나머지는 정상 테스트
    train_size = int(len(X_normal) * 0.7)
    X_train = X_normal[:train_size]

    # 테스트: 나머지 정상 + 전체 이상
    X_test_normal = X_normal[train_size:]
    X_test_anomaly = fft_features[labels == 1]
    X_test = np.vstack([X_test_normal, X_test_anomaly])
    test_labels = np.concatenate([
        np.zeros(len(X_test_normal)),
        np.ones(len(X_test_anomaly))
    ])

    print(f"  학습 데이터: {X_train.shape[0]}건 (정상만!)")
    print(f"  테스트 데이터: {X_test.shape[0]}건 (정상 {len(X_test_normal)} + 이상 {len(X_test_anomaly)})")

    # ── 4단계: 모델 학습 ──
    print("\n[4단계] LSTM Autoencoder 학습 (정상 패턴 기억 중)...")
    print("  → PCA 기반 차원축소로 Encoder-Decoder 시뮬레이션")
    print("  → 잠재 차원: 32 (1024 → 32 → 1024 압축/복원)")

    model = NumpyLSTMAutoencoder(latent_dim=32)
    model.fit(X_train)

    explained_var = model.pca.explained_variance_ratio_.sum() * 100
    print(f"  학습 완료!")
    print(f"  설명된 분산: {explained_var:.1f}% (32개 주성분으로 정보 보존)")
    print(f"  임계값(threshold): {model.threshold:.6f}")

    # ── 5단계: 이상 탐지 ──
    print("\n[5단계] 이상 탐지 실행...")

    # 학습 데이터 점수
    train_scores, train_mse = model.anomaly_score(X_train)

    # 테스트 데이터 점수
    test_scores, test_mse = model.anomaly_score(X_test)

    # 이상 판정
    test_anomalies = test_scores > 0.3  # 임계값 초과
    n_detected = test_anomalies.sum()

    print(f"  테스트 이상 감지: {n_detected}건 / {len(X_test)}건 ({n_detected/len(X_test)*100:.1f}%)")
    print(f"  평균 이상 점수: {test_scores.mean():.4f}")
    print(f"  최대 이상 점수: {test_scores.max():.4f}")

    # 실제 라벨과 비교
    true_anomaly = test_labels == 1
    detected_anomaly = test_scores > 0.3
    tp = np.sum(true_anomaly & detected_anomaly)
    fp = np.sum(~true_anomaly & detected_anomaly)
    fn = np.sum(true_anomaly & ~detected_anomaly)
    tn = np.sum(~true_anomaly & ~detected_anomaly)

    precision = tp / (tp + fp + 1e-10)
    recall = tp / (tp + fn + 1e-10)
    f1 = 2 * precision * recall / (precision + recall + 1e-10)

    print(f"\n  [탐지 성능]")
    print(f"    정밀도 (Precision): {precision:.3f}")
    print(f"    재현율 (Recall):    {recall:.3f}")
    print(f"    F1-Score:           {f1:.3f}")
    print(f"    True Positive:  {tp} | False Positive: {fp}")
    print(f"    False Negative: {fn} | True Negative:  {tn}")

    # 등급별 분류
    normal_cnt = (test_scores < 0.3).sum()
    caution_cnt = ((test_scores >= 0.3) & (test_scores < 0.6)).sum()
    warning_cnt = ((test_scores >= 0.6) & (test_scores < 0.8)).sum()
    danger_cnt = (test_scores >= 0.8).sum()

    print(f"\n  [등급별 분류]")
    print(f"    정상 (0.0~0.3): {normal_cnt}건 ({normal_cnt/len(X_test)*100:.1f}%)")
    print(f"    주의 (0.3~0.6): {caution_cnt}건 ({caution_cnt/len(X_test)*100:.1f}%)")
    print(f"    경고 (0.6~0.8): {warning_cnt}건 ({warning_cnt/len(X_test)*100:.1f}%)")
    print(f"    위험 (0.8~1.0): {danger_cnt}건 ({danger_cnt/len(X_test)*100:.1f}%)")

    # ── 6단계: 복원 결과 비교 ──
    print("\n[6단계] 원본 vs 복원 신호 비교 준비...")
    reconstructed_test = model.predict(X_test)

    # 대표 정상 / 이상 샘플 선택
    normal_test_scores = test_scores[:len(X_test_normal)]
    anomaly_test_scores = test_scores[len(X_test_normal):]
    normal_idx = np.argmin(normal_test_scores)  # 가장 정상적인 정상 샘플
    anomaly_idx = len(X_test_normal) + np.argmax(anomaly_test_scores)  # 가장 이상적인 이상 샘플

    print(f"  대표 정상 샘플: index={normal_idx}, 점수={test_scores[normal_idx]:.4f}")
    print(f"  대표 이상 샘플: index={anomaly_idx}, 점수={test_scores[anomaly_idx]:.4f}")

    # ── 7단계: 시각화 ──
    print("\n[7단계] 결과 시각화...")
    fig, axes = plt.subplots(4, 1, figsize=(14, 16))

    # ─── 그래프 1: 원본 vs 복원 신호 (정상 & 이상) ───
    ax1 = axes[0]
    offset = 1.5 * X_test[anomaly_idx].max()

    ax1.plot(freqs, X_test[normal_idx], 'b-', alpha=0.7, linewidth=0.8, label='원본 (정상)')
    ax1.plot(freqs, reconstructed_test[normal_idx], 'g--', alpha=0.7, linewidth=0.8, label='복원 (정상)')
    ax1.plot(freqs, X_test[anomaly_idx] + offset, 'r-', alpha=0.7, linewidth=0.8,
             label=f'원본 (이상) +{offset:.0f} offset')
    ax1.plot(freqs, reconstructed_test[anomaly_idx] + offset, 'm--', alpha=0.7, linewidth=0.8,
             label=f'복원 (이상) +{offset:.0f} offset')

    # 베어링 결함 주파수 표시 (A축 기준: BPFO≈71Hz, BPFI≈109Hz, BSF≈46Hz)
    f1x_a = 1200 / 60.0  # 20Hz
    bearing_freqs = {
        'BPFO': f1x_a * 3.56,
        'BPFI': f1x_a * 5.44,
        'BSF': f1x_a * 2.32,
    }
    for name, freq_val in bearing_freqs.items():
        ax1.axvline(x=freq_val, color='orange', linestyle=':', alpha=0.5, linewidth=0.8)
        ax1.text(freq_val + 3, ax1.get_ylim()[1] * 0.9 if ax1.get_ylim()[1] > 0 else offset * 1.5,
                 name, fontsize=8, color='orange', alpha=0.8)

    ax1.set_title('원본 vs 복원 FFT 스펙트럼 (정상 샘플 / 이상 샘플)', fontsize=13, fontweight='bold')
    ax1.set_xlabel('주파수 (Hz)')
    ax1.set_ylabel('FFT 파워')
    ax1.legend(loc='upper right', fontsize=9)
    ax1.grid(True, alpha=0.3)
    ax1.set_xlim(0, 300)  # 저주파 대역 확대

    # ─── 그래프 2: 재구성 오차 시계열 ───
    ax2 = axes[1]
    time_idx = np.arange(len(test_mse))
    colors2 = np.where(test_labels == 1, 'red', 'blue')
    ax2.scatter(time_idx, test_mse, c=colors2, s=6, alpha=0.5,
                label='재구성 오차 (파랑=정상, 빨강=실제이상)')
    ax2.axhline(y=model.threshold, color='red', linestyle='--', linewidth=2,
                label=f'임계값 ({model.threshold:.6f})')
    ax2.fill_between(time_idx, 0, test_mse,
                     where=test_mse > model.threshold,
                     color='red', alpha=0.15)

    ax2.set_title('재구성 오차 — 높을수록 비정상 (빨간 점 = 실제 이상 라벨)', fontsize=13, fontweight='bold')
    ax2.set_xlabel('테스트 샘플 인덱스')
    ax2.set_ylabel('재구성 오차 (MSE)')
    ax2.legend(fontsize=9)
    ax2.grid(True, alpha=0.3)

    # ─── 그래프 3: 이상 점수 (0~1) + 등급 표시 ───
    ax3 = axes[2]
    colors3 = np.where(test_scores < 0.3, 'green',
              np.where(test_scores < 0.6, 'gold',
              np.where(test_scores < 0.8, 'orange', 'red')))

    # 정상/이상 라벨별 마커
    ax3.scatter(time_idx[test_labels == 0], test_scores[test_labels == 0],
                c=colors3[test_labels == 0], s=8, alpha=0.6, marker='o', label='정상 라벨')
    ax3.scatter(time_idx[test_labels == 1], test_scores[test_labels == 1],
                c=colors3[test_labels == 1], s=20, alpha=0.8, marker='^', label='이상 라벨')

    ax3.axhline(y=0.3, color='green', linestyle='--', alpha=0.7, label='정상/주의 경계 (0.3)')
    ax3.axhline(y=0.6, color='orange', linestyle='--', alpha=0.7, label='주의/경고 경계 (0.6)')
    ax3.axhline(y=0.8, color='red', linestyle='--', alpha=0.7, label='경고/위험 경계 (0.8)')

    # 등급 배경색
    ax3.axhspan(0.0, 0.3, alpha=0.05, color='green')
    ax3.axhspan(0.3, 0.6, alpha=0.05, color='gold')
    ax3.axhspan(0.6, 0.8, alpha=0.05, color='orange')
    ax3.axhspan(0.8, 1.0, alpha=0.05, color='red')

    ax3.text(len(test_scores) * 0.98, 0.15, '정상', ha='right', fontsize=10,
             color='green', fontweight='bold')
    ax3.text(len(test_scores) * 0.98, 0.45, '주의', ha='right', fontsize=10,
             color='goldenrod', fontweight='bold')
    ax3.text(len(test_scores) * 0.98, 0.7, '경고', ha='right', fontsize=10,
             color='orange', fontweight='bold')
    ax3.text(len(test_scores) * 0.98, 0.9, '위험', ha='right', fontsize=10,
             color='red', fontweight='bold')

    ax3.set_title('이상 점수 (0~1) — 등급별 분류 (삼각형=실제 이상)', fontsize=13, fontweight='bold')
    ax3.set_xlabel('테스트 샘플 인덱스')
    ax3.set_ylabel('이상 점수')
    ax3.set_ylim(-0.02, 1.02)
    ax3.legend(loc='upper left', fontsize=8)
    ax3.grid(True, alpha=0.3)

    # ─── 그래프 4: 재구성 오차 분포 (정상 vs 이상) ───
    ax4 = axes[3]
    ax4.hist(train_mse, bins=50, alpha=0.6, color='green', label='학습 (정상)', density=True)
    ax4.hist(test_mse[test_labels == 0], bins=50, alpha=0.5, color='blue',
             label='테스트 (정상)', density=True)
    ax4.hist(test_mse[test_labels == 1], bins=30, alpha=0.5, color='red',
             label='테스트 (이상)', density=True)
    ax4.axvline(x=model.threshold, color='red', linestyle='--', linewidth=2,
                label=f'임계값 ({model.threshold:.6f})')

    ax4.set_title('재구성 오차 분포 — 정상(학습) vs 정상(테스트) vs 이상', fontsize=13, fontweight='bold')
    ax4.set_xlabel('재구성 오차 (MSE)')
    ax4.set_ylabel('밀도')
    ax4.legend(fontsize=9)
    ax4.grid(True, alpha=0.3)

    plt.tight_layout()
    save_path = os.path.join(SCRIPT_DIR, 'lstm_autoencoder_result.png')
    plt.savefig(save_path, dpi=150, bbox_inches='tight')
    print(f"  그래프 저장: {save_path}")

    # ── 결과 요약 ──
    print("\n" + "=" * 65)
    print("  LSTM Autoencoder 베어링 이상 탐지 — 결과 요약")
    print("=" * 65)
    print(f"""
  [데이터]
    입력: VIB-A 3축 진동 → FFT → {n_bins} frequency bins
    학습: {X_train.shape[0]}건 (정상 운전 데이터만)
    테스트: {X_test.shape[0]}건 (정상 {len(X_test_normal)} + 이상 {len(X_test_anomaly)})

  [모델]
    구조: Encoder (1024→32) → Latent (32) → Decoder (32→1024)
    학습 방식: 비지도 학습 (정상 데이터만으로 학습)
    설명 분산: {explained_var:.1f}%

  [이상 탐지 결과]
    임계값: {model.threshold:.6f}
    이상 감지: {n_detected}건 ({n_detected/len(X_test)*100:.1f}%)
    정밀도: {precision:.3f} | 재현율: {recall:.3f} | F1: {f1:.3f}

  [등급 분류]
    정상: {normal_cnt}건 | 주의: {caution_cnt}건 | 경고: {warning_cnt}건 | 위험: {danger_cnt}건

  [핵심 원리]
    정상 데이터를 압축→복원할 때 오차가 작음 (잘 복원됨)
    이상 데이터를 압축→복원할 때 오차가 큼 (복원 못함)
    → 재구성 오차 = 이상 점수!

  [슈레더 적용 시]
    1. 정상 운전 28일간 FFT 스펙트럼 수집 → 학습
    2. 실시간으로 매 1초마다 FFT 계산 → 재구성 오차 산출
    3. 이상 점수가 임계값 초과 시 경보 발생
    4. 베어링 결함 주파수(BPFO/BPFI/BSF) 모니터링
    """)


if __name__ == "__main__":
    run_simulation()
