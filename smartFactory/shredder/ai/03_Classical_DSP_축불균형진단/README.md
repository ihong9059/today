# 모델 3: 축 불균형 진단 — Classical DSP (FFT)

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 축 불균형 진단 (Shaft Imbalance Diagnosis) |
| **알고리즘** | Classical DSP — FFT 1X 성분 분석 |
| **영역** | 고장예지 (Predictive Maintenance) |
| **입력** | VIB-A/B 1X 회전 주파수 성분 |
| **출력** | 불균형 레벨 (mm/s), 정상/경고/위험 등급 |
| **추론 시간** | < 1ms |
| **실행 주기** | 매 1초 |
| **목표 정확도** | 98%+ |

---

## 2. 알고리즘 설명

### 2.1 물리적 원리

축 불균형은 **1X 회전 주파수**에 진동 에너지가 집중되는 물리 법칙에 기반합니다.

```
회전축이 불균형 → 무거운 쪽으로 원심력 발생 → 매 회전마다 1번 진동
                                                → 1X 주파수 진동 증가
```

- **1X 주파수** = 축 회전속도(RPM) / 60 (Hz)
- 예: 축이 120 RPM이면 → 1X = 2 Hz

### 2.2 왜 DSP(AI가 아닌)인가?

| 장점 | 설명 |
|------|------|
| **물리 법칙 기반** | 불균형 → 1X 진동은 물리적으로 확실한 관계. AI 학습 불필요 |
| **극도로 빠름** | FFT 1회 연산 < 1ms. AI 모델보다 수십 배 빠름 |
| **100% 해석 가능** | "1X가 5mm/s" = "불균형 있음" — 블랙박스 없음 |
| **데이터 불필요** | 학습 데이터 없이 **즉시** 적용 가능 |
| **ISO 표준** | ISO 10816 진동 기준이 이미 확립되어 있음 |

---

## 3. 데이터 요구사항

### 3.1 입력 센서
- **VIB-A**: 축A 베어링 하우징 3축 진동 가속도계 (0~50g, 10Hz~10kHz, 1ms 샘플링)
- **VIB-B**: 축B 베어링 하우징 3축 진동 가속도계
- **SPD-A/B**: 현재 RPM (1X 주파수 계산용)

### 3.2 학습 데이터
**학습 불필요** — 정상 운전 7일간의 기준선(baseline) 데이터만 수집하면 됩니다.

---

## 4. 구현 절차

### 4.1 1X 주파수 추출

```python
import numpy as np
from scipy.fft import fft, fftfreq
from scipy.signal import butter, filtfilt

def extract_1x_component(vibration_signal, rpm, fs=10000, window_sec=1):
    """
    진동 신호에서 1X 회전 주파수 성분 추출

    Args:
        vibration_signal: 1축 진동 데이터 (1초 = 10000 samples)
        rpm: 현재 축 회전속도
        fs: 샘플링 주파수
    Returns:
        amplitude_1x: 1X 성분 진폭 (mm/s)
        phase_1x: 1X 성분 위상 (degrees)
    """
    n_samples = len(vibration_signal)

    # FFT 수행
    fft_values = fft(vibration_signal)
    freqs = fftfreq(n_samples, 1/fs)

    # 1X 주파수
    f_1x = rpm / 60.0  # Hz

    # 1X 주파수 근방(±0.5Hz)에서 최대 진폭 찾기
    tolerance = 0.5  # Hz
    mask = (np.abs(freqs - f_1x) <= tolerance) & (freqs > 0)
    if np.any(mask):
        idx = np.argmax(np.abs(fft_values[mask]))
        actual_idx = np.where(mask)[0][idx]
        amplitude_1x = 2 * np.abs(fft_values[actual_idx]) / n_samples  # mm/s
        phase_1x = np.angle(fft_values[actual_idx], deg=True)
    else:
        amplitude_1x = 0.0
        phase_1x = 0.0

    return amplitude_1x, phase_1x

def extract_harmonics(vibration_signal, rpm, fs=10000, n_harmonics=5):
    """1X ~ 5X까지 고조파 성분 추출"""
    results = {}
    for i in range(1, n_harmonics + 1):
        amp, phase = extract_1x_component(vibration_signal, rpm * i, fs)
        results[f'{i}X_amplitude'] = amp
        results[f'{i}X_phase'] = phase
    return results
```

### 4.2 불균형 레벨 판정

```python
# ISO 10816-3 기반 진동 심각도 기준 (mm/s RMS)
# 대형 산업용 기계 (슈레더: Group 3 — 고정 기초, 15kW~300kW)
VIBRATION_LIMITS = {
    'good':     2.8,   # mm/s RMS 이하 → 양호
    'alarm':    7.1,   # mm/s RMS 이하 → 경고
    'danger':   11.2,  # mm/s RMS 이하 → 위험
    # 이상 → 즉시 정지
}

def diagnose_imbalance(vib_a_signal, vib_b_signal, rpm_a, rpm_b, fs=10000):
    """
    축 불균형 진단

    Returns:
        dict: 각 축의 불균형 레벨, 등급, 권고 조치
    """
    results = {}

    for axis_name, signal, rpm in [('A', vib_a_signal, rpm_a),
                                    ('B', vib_b_signal, rpm_b)]:
        # 1X 성분 추출
        amp_1x, phase_1x = extract_1x_component(signal, rpm, fs)

        # 전체 RMS 대비 1X 비율 (불균형 확인)
        total_rms = np.sqrt(np.mean(signal**2))
        ratio_1x = amp_1x / (total_rms + 1e-8)

        # 불균형 판정 (1X가 전체의 50% 이상이면 불균형 의심)
        is_imbalance = ratio_1x > 0.5

        # 심각도 판정 (ISO 10816 기준)
        if amp_1x <= VIBRATION_LIMITS['good']:
            severity = "양호"
            color = "green"
            action = "정상 운전"
        elif amp_1x <= VIBRATION_LIMITS['alarm']:
            severity = "경고"
            color = "yellow"
            action = "밸런싱 정비 계획 수립"
        elif amp_1x <= VIBRATION_LIMITS['danger']:
            severity = "위험"
            color = "orange"
            action = "가능한 빨리 밸런싱 실시"
        else:
            severity = "즉시 정지"
            color = "red"
            action = "즉시 운전 중지 후 점검"

        results[f'axis_{axis_name}'] = {
            'amplitude_1x_mm_s': round(amp_1x, 2),
            'phase_1x_deg': round(phase_1x, 1),
            'total_rms_mm_s': round(total_rms, 2),
            'ratio_1x': round(ratio_1x, 3),
            'is_imbalance': is_imbalance,
            'severity': severity,
            'color': color,
            'action': action
        }

    return results
```

### 4.3 추세 모니터링

```python
class ImbalanceTrendMonitor:
    """불균형 추세 모니터링 — 점진적 악화 감지"""

    def __init__(self, history_hours=168):  # 1주일
        self.history = []
        self.max_history = history_hours * 3600  # 초 단위

    def update(self, timestamp, amp_1x_a, amp_1x_b):
        self.history.append({
            'time': timestamp,
            'amp_1x_a': amp_1x_a,
            'amp_1x_b': amp_1x_b
        })
        # 오래된 데이터 제거
        self._trim()

    def get_trend(self):
        """추세 분석: 1X 진폭이 증가 추세인지 판단"""
        if len(self.history) < 100:
            return "데이터 부족", 0.0

        times = np.array([h['time'] for h in self.history])
        amps_a = np.array([h['amp_1x_a'] for h in self.history])
        amps_b = np.array([h['amp_1x_b'] for h in self.history])

        # 선형 회귀로 추세 기울기 계산
        from scipy.stats import linregress
        slope_a, _, r_a, _, _ = linregress(range(len(amps_a)), amps_a)
        slope_b, _, r_b, _, _ = linregress(range(len(amps_b)), amps_b)

        max_slope = max(slope_a, slope_b)
        if max_slope > 0.01 and max(r_a**2, r_b**2) > 0.5:
            return "악화 추세", max_slope
        elif max_slope < -0.005:
            return "개선 추세", max_slope
        else:
            return "안정", max_slope
```

---

## 5. 불균형 원인 분류

1X뿐만 아니라 고조파 패턴으로 원인을 구분할 수 있습니다.

| 고조파 패턴 | 원인 | 조치 |
|-------------|------|------|
| **1X만 높음** | 질량 불균형 (칼날 탈락, 이물질 부착) | 밸런싱 또는 이물질 제거 |
| **1X + 2X** | 미스얼라인먼트 (축 정렬 불량) | 축 재정렬 |
| **2X만 높음** | 루스니스 (볼트 풀림) | 체결 점검 |
| **고차(3X~5X)** | 칼날 손상/균열 | 칼날 교체 |
| **비동기 주파수** | 베어링 결함 | → 모델 1(베어링 이상 탐지)로 연계 |

```python
def classify_root_cause(harmonics):
    """고조파 패턴으로 불균형 원인 분류"""
    amp_1x = harmonics['1X_amplitude']
    amp_2x = harmonics['2X_amplitude']
    amp_3x = harmonics['3X_amplitude']

    if amp_1x > VIBRATION_LIMITS['alarm']:
        if amp_2x < amp_1x * 0.3:
            return "질량 불균형", "밸런싱 또는 이물질 제거"
        elif amp_2x > amp_1x * 0.5:
            return "미스얼라인먼트", "축 정렬 점검"
        else:
            return "복합 원인", "종합 점검 필요"
    elif amp_2x > VIBRATION_LIMITS['alarm']:
        return "루스니스(볼트 풀림)", "체결 상태 점검"
    elif amp_3x > VIBRATION_LIMITS['good']:
        return "칼날 손상 의심", "칼날 상태 확인"
    else:
        return "정상 범위", "모니터링 계속"
```

---

## 6. Edge 배포

DSP 기반이므로 모델 변환이 필요 없습니다. NumPy/SciPy만으로 직접 실행합니다.

```python
class ShaftImbalanceDiagnostic:
    """Edge용 축 불균형 진단 모듈"""

    def __init__(self, iso_group=3):
        self.limits = VIBRATION_LIMITS
        self.trend_monitor = ImbalanceTrendMonitor()

    def run(self, vib_a, vib_b, rpm_a, rpm_b, timestamp):
        """
        매 1초 실행
        Returns: 진단 결과 dict
        """
        # 1. 불균형 진단
        result = diagnose_imbalance(vib_a, vib_b, rpm_a, rpm_b)

        # 2. 고조파 분석 → 원인 분류
        harmonics_a = extract_harmonics(vib_a, rpm_a)
        root_cause, action = classify_root_cause(harmonics_a)
        result['root_cause'] = root_cause
        result['recommended_action'] = action

        # 3. 추세 업데이트
        self.trend_monitor.update(
            timestamp,
            result['axis_A']['amplitude_1x_mm_s'],
            result['axis_B']['amplitude_1x_mm_s']
        )
        trend, slope = self.trend_monitor.get_trend()
        result['trend'] = trend

        return result
```

---

## 7. 주의사항

- RPM 변동이 큰 구간에서는 1X 주파수도 변하므로, **Order Tracking** 기법 적용 권장
- 슈레더 특성상 충격성 진동이 크므로, 윈도우 평균(5~10초)으로 안정성 확보
- ISO 10816 기준은 참고용이며, 실제 슈레더 환경에 맞게 기준값 조정 필요 (초기 1주 기준선 측정)
- 칼날 교체 직후 불균형은 정상일 수 있음 → 안정화 기간(1~2시간) 고려
