# 모델 1: 베어링 이상 탐지 — LSTM Autoencoder

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 베어링 이상 탐지 (Bearing Anomaly Detection) |
| **알고리즘** | LSTM Autoencoder |
| **영역** | 고장예지 (Predictive Maintenance) |
| **입력** | VIB-A/B 3축 진동 데이터 → FFT → 1024 frequency bins |
| **출력** | 이상 점수 (0.0 ~ 1.0) |
| **추론 시간** | < 10ms |
| **실행 주기** | 매 1초 |
| **목표 정확도** | 95%+ |

---

## 2. 알고리즘 설명

### 2.1 LSTM Autoencoder란?

**Autoencoder**는 입력 데이터를 압축(인코딩)한 후 다시 복원(디코딩)하는 신경망입니다. 정상 데이터만으로 학습하면, 비정상 데이터 입력 시 복원 오차(reconstruction error)가 커지는 원리를 이용합니다.

**LSTM(Long Short-Term Memory)**은 시계열 데이터에서 시간적 패턴과 장기 의존성을 학습하는 RNN 변형입니다. 일반 Autoencoder와 달리 진동 신호의 시간적 변화 패턴을 포착합니다.

```
입력 (1024 bins) → [LSTM Encoder] → 잠재 벡터 (32~64 dim) → [LSTM Decoder] → 복원 (1024 bins)
                                                                              ↓
                                                               재구성 오차 = 이상 점수
```

### 2.2 왜 LSTM Autoencoder인가?

| 장점 | 설명 |
|------|------|
| **비지도 학습** | 고장 데이터 없이 정상 패턴만으로 학습 가능 (실제 베어링 고장 데이터는 매우 드묾) |
| **시계열 특화** | LSTM이 진동 패턴의 시간적 변화를 효과적으로 포착 |
| **미지 고장 감지** | 사전 정의하지 않은 새로운 유형의 이상도 감지 가능 |
| **점진적 악화 추적** | 이상 점수가 서서히 올라가는 것으로 열화 추세 파악 |

---

## 3. 데이터 요구사항

### 3.1 입력 센서
- **VIB-A**: 축A 베어링 하우징 3축 진동 가속도계 (0~50g, 10Hz~10kHz, 1ms 샘플링)
- **VIB-B**: 축B 베어링 하우징 3축 진동 가속도계 (동일 스펙)

### 3.2 학습 데이터

| 단계 | 데이터 | 기간 |
|------|--------|------|
| 정상 운전 데이터 | 다양한 부하/RPM 조건에서 연속 수집 | **28일** |
| 이상 데이터 (선택) | 시뮬레이션 또는 Transfer Learning | 2일 |
| **총 예상 수집 기간** | | **약 2개월** |

### 3.3 데이터 전처리 파이프라인

```
Raw 진동 신호 (3축, 1ms)
    ↓
1. 리샘플링 (필요시 10kHz 정규화)
    ↓
2. 윈도우 분할 (1초 = 10,000 samples)
    ↓
3. FFT 변환 → 주파수 스펙트럼 (1024 bins)
    ↓
4. Envelope Analysis (포락선 분석)
    ↓
5. 베어링 결함 주파수 계산
    - BPFO (Outer Race): 외륜 결함 주파수
    - BPFI (Inner Race): 내륜 결함 주파수
    - BSF (Ball Spin): 전동체 결함 주파수
    - FTF (Cage): 보유기 결함 주파수
    ↓
6. 정규화 (Min-Max 또는 Z-score)
    ↓
7. 시퀀스 생성 (window_size=60, stride=1)
```

---

## 4. 모델 아키텍처

### 4.1 네트워크 구조

```python
# Encoder
Input:  (batch, seq_len=60, features=1024)
    → LSTM(1024, 512, return_sequences=True)
    → LSTM(512, 256, return_sequences=True)
    → LSTM(256, 128, return_sequences=False)  # → 잠재 벡터
    → Dense(64)  # Bottleneck

# Decoder
    → RepeatVector(60)
    → LSTM(64, 128, return_sequences=True)
    → LSTM(128, 256, return_sequences=True)
    → LSTM(256, 512, return_sequences=True)
    → TimeDistributed(Dense(1024))
```

### 4.2 하이퍼파라미터

| 파라미터 | 권장값 | 비고 |
|----------|--------|------|
| Sequence Length | 60 (60초) | 1초 간격 FFT × 60 스텝 |
| Latent Dimension | 64 | 압축률 약 1/16 |
| LSTM Hidden Units | 512→256→128 | 점진적 축소 |
| Learning Rate | 1e-3 (Adam) | ReduceLROnPlateau 적용 |
| Batch Size | 32 | GPU 메모리에 따라 조정 |
| Epochs | 100~200 | EarlyStopping patience=10 |
| Loss Function | MSE (Mean Squared Error) | 재구성 오차 |
| Dropout | 0.2 | 과적합 방지 |

---

## 5. 구현 절차

### 5.1 Phase 1 — 환경 세팅 (1일)

```bash
# 가상환경 생성
python -m venv venv
source venv/bin/activate  # Linux
# venv\Scripts\activate   # Windows

# 패키지 설치
pip install torch torchvision numpy scipy scikit-learn pandas matplotlib
pip install onnx onnxruntime-gpu  # Edge 배포용
```

### 5.2 Phase 2 — 데이터 수집 및 전처리 (28일 수집 + 1일 처리)

```python
import numpy as np
from scipy.fft import fft
from scipy.signal import hilbert

def preprocess_vibration(raw_signal, fs=10000, n_fft=2048):
    """진동 신호 → FFT 스펙트럼 변환"""
    # 1. 윈도우 분할 (1초 = fs samples)
    n_windows = len(raw_signal) // fs
    spectra = []

    for i in range(n_windows):
        segment = raw_signal[i*fs : (i+1)*fs]

        # 2. FFT
        freq_spectrum = np.abs(fft(segment, n=n_fft))[:n_fft//2]

        # 3. 정규화
        freq_spectrum = freq_spectrum / np.max(freq_spectrum + 1e-8)

        # 4. 1024 bins로 리사이즈
        spectrum_1024 = np.interp(
            np.linspace(0, len(freq_spectrum)-1, 1024),
            np.arange(len(freq_spectrum)),
            freq_spectrum
        )
        spectra.append(spectrum_1024)

    return np.array(spectra)

def compute_bearing_frequencies(rpm, n_balls, d_ball, d_pitch, contact_angle=0):
    """베어링 결함 주파수 계산"""
    f_shaft = rpm / 60  # 축 회전 주파수 (Hz)
    bpfo = (n_balls / 2) * f_shaft * (1 - (d_ball/d_pitch) * np.cos(contact_angle))
    bpfi = (n_balls / 2) * f_shaft * (1 + (d_ball/d_pitch) * np.cos(contact_angle))
    bsf  = (d_pitch / (2*d_ball)) * f_shaft * (1 - (d_ball/d_pitch)**2 * np.cos(contact_angle)**2)
    ftf  = 0.5 * f_shaft * (1 - (d_ball/d_pitch) * np.cos(contact_angle))
    return {'BPFO': bpfo, 'BPFI': bpfi, 'BSF': bsf, 'FTF': ftf}

def create_sequences(data, window_size=60, stride=1):
    """시계열 시퀀스 생성"""
    sequences = []
    for i in range(0, len(data) - window_size, stride):
        sequences.append(data[i:i+window_size])
    return np.array(sequences)
```

### 5.3 Phase 3 — 모델 학습 (2~4시간, GPU)

```python
import torch
import torch.nn as nn

class LSTMAutoencoder(nn.Module):
    def __init__(self, input_dim=1024, hidden_dims=[512, 256, 128], latent_dim=64, seq_len=60):
        super().__init__()
        self.seq_len = seq_len

        # Encoder
        self.encoder_lstm1 = nn.LSTM(input_dim, hidden_dims[0], batch_first=True)
        self.encoder_lstm2 = nn.LSTM(hidden_dims[0], hidden_dims[1], batch_first=True)
        self.encoder_lstm3 = nn.LSTM(hidden_dims[1], hidden_dims[2], batch_first=True)
        self.encoder_fc = nn.Linear(hidden_dims[2], latent_dim)

        # Decoder
        self.decoder_fc = nn.Linear(latent_dim, hidden_dims[2])
        self.decoder_lstm1 = nn.LSTM(hidden_dims[2], hidden_dims[1], batch_first=True)
        self.decoder_lstm2 = nn.LSTM(hidden_dims[1], hidden_dims[0], batch_first=True)
        self.decoder_lstm3 = nn.LSTM(hidden_dims[0], input_dim, batch_first=True)

        self.dropout = nn.Dropout(0.2)

    def encode(self, x):
        x, _ = self.encoder_lstm1(x)
        x = self.dropout(x)
        x, _ = self.encoder_lstm2(x)
        x = self.dropout(x)
        x, _ = self.encoder_lstm3(x)
        # 마지막 타임스텝만
        latent = self.encoder_fc(x[:, -1, :])
        return latent

    def decode(self, z):
        z = self.decoder_fc(z)
        # seq_len만큼 반복
        z = z.unsqueeze(1).repeat(1, self.seq_len, 1)
        x, _ = self.decoder_lstm1(z)
        x = self.dropout(x)
        x, _ = self.decoder_lstm2(x)
        x = self.dropout(x)
        x, _ = self.decoder_lstm3(x)
        return x

    def forward(self, x):
        latent = self.encode(x)
        reconstructed = self.decode(latent)
        return reconstructed

# 학습 루프
def train_model(model, train_loader, val_loader, epochs=150, lr=1e-3):
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5, factor=0.5)
    criterion = nn.MSELoss()
    best_val_loss = float('inf')
    patience_counter = 0

    for epoch in range(epochs):
        model.train()
        train_loss = 0
        for batch in train_loader:
            optimizer.zero_grad()
            output = model(batch)
            loss = criterion(output, batch)
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
            optimizer.step()
            train_loss += loss.item()

        # Validation
        model.eval()
        val_loss = 0
        with torch.no_grad():
            for batch in val_loader:
                output = model(batch)
                loss = criterion(output, batch)
                val_loss += loss.item()

        val_loss /= len(val_loader)
        scheduler.step(val_loss)

        # Early Stopping
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), 'best_model.pth')
            patience_counter = 0
        else:
            patience_counter += 1
            if patience_counter >= 10:
                print(f"Early stopping at epoch {epoch}")
                break

        if epoch % 10 == 0:
            print(f"Epoch {epoch}: Train={train_loss/len(train_loader):.6f}, Val={val_loss:.6f}")
```

### 5.4 Phase 4 — 이상 판정 로직

```python
def compute_anomaly_score(model, input_sequence, threshold_stats):
    """
    이상 점수 계산 (0.0 ~ 1.0)
    threshold_stats: 학습 데이터의 재구성 오차 통계 (mean, std, p95, p99)
    """
    model.eval()
    with torch.no_grad():
        reconstructed = model(input_sequence.unsqueeze(0))
        mse = torch.mean((input_sequence - reconstructed.squeeze(0)) ** 2).item()

    # 정규화: 정상 분포 기준으로 0~1 스케일링
    z_score = (mse - threshold_stats['mean']) / threshold_stats['std']
    anomaly_score = min(1.0, max(0.0, z_score / 5.0))  # ±5σ 범위를 0~1로

    return anomaly_score

def classify_severity(score):
    """이상 등급 분류"""
    if score < 0.3:
        return "정상", "green"
    elif score < 0.6:
        return "주의", "yellow"       # 모니터링 강화
    elif score < 0.8:
        return "경고", "orange"       # 정비 계획 수립
    else:
        return "위험", "red"          # 즉시 조치 필요
```

### 5.5 Phase 5 — Edge 배포 (1일)

```python
# PyTorch → ONNX 변환
import torch.onnx

dummy_input = torch.randn(1, 60, 1024)
torch.onnx.export(
    model, dummy_input,
    "bearing_anomaly_lstm_ae.onnx",
    input_names=['vibration_fft'],
    output_names=['reconstructed'],
    dynamic_axes={'vibration_fft': {0: 'batch'}, 'reconstructed': {0: 'batch'}}
)

# ONNX → TensorRT 변환 (Jetson Orin에서)
# trtexec --onnx=bearing_anomaly_lstm_ae.onnx --saveEngine=bearing_anomaly.trt --fp16
```

```python
# Edge 추론 코드 (TensorRT)
import tensorrt as trt
import pycuda.driver as cuda

class BearingAnomalyDetector:
    def __init__(self, engine_path='bearing_anomaly.trt'):
        self.engine = self._load_engine(engine_path)
        self.context = self.engine.create_execution_context()

    def infer(self, fft_sequence):
        """
        fft_sequence: numpy array (60, 1024)
        returns: anomaly_score (float 0~1)
        """
        # TensorRT 추론 (< 10ms)
        input_data = fft_sequence.astype(np.float32).reshape(1, 60, 1024)
        output = self._run_inference(input_data)
        reconstruction_error = np.mean((input_data - output) ** 2)
        return self._normalize_score(reconstruction_error)
```

---

## 6. 검증 및 평가

### 6.1 평가 지표
| 지표 | 목표 | 설명 |
|------|------|------|
| Detection Rate (감지율) | ≥ 95% | 실제 이상 중 감지한 비율 |
| False Positive Rate | ≤ 5% | 정상을 이상으로 오판한 비율 |
| Detection Lead Time | ≥ 48h | 실제 고장 전 감지 선행 시간 |
| Inference Latency | < 10ms | Edge 추론 속도 |

### 6.2 검증 방법
1. **정상 데이터 테스트**: 학습에 사용하지 않은 정상 데이터 → 이상 점수 < 0.3 확인
2. **인위적 이상 시뮬레이션**: 고의적 불균형/과부하 → 이상 점수 상승 확인
3. **Transfer Learning 검증**: 유사 베어링 고장 데이터셋(CWRU 등) 활용
4. **Shadow Mode 운영**: 실제 환경에서 2주간 병행 운영, 알람만 기록 (자동 조치 없음)

---

## 7. 운영 및 유지보수

### 7.1 모니터링 대시보드 항목
- 실시간 이상 점수 추이 (축A/B 각각)
- 주파수 스펙트럼 워터폴 차트
- 베어링 결함 주파수(BPFO/BPFI/BSF/FTF) 에너지 추이
- 알람 이력 및 정비 조치 기록

### 7.2 모델 재학습 주기
- **정기**: 3개월마다 최근 데이터로 Fine-tuning
- **비정기**: 베어링 교체, 대규모 정비 후 재학습
- **임계값 조정**: False Positive 빈도에 따라 threshold 미세 조정

### 7.3 주의사항
- 초기 28일간 정상 데이터 품질이 모델 성능을 결정함
- 다양한 운전 조건(부하, RPM)에서 데이터를 수집해야 일반화 성능이 좋음
- 베어링 교체 후에는 기준선(baseline) 재설정 필요
