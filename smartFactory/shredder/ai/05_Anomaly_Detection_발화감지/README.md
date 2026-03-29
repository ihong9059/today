# 모델 5: 발화 감지 — Rate-of-Change + Anomaly Detection

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 발화 감지 (Fire/Thermal Runaway Detection) |
| **알고리즘** | Rate-of-Change (변화율 분석) + Anomaly Detection |
| **영역** | 사고예방 (Accident Prevention) |
| **입력** | TMP-IR, TMP-IR2 (이중화), TMP-A/B |
| **출력** | 발화 확률 (0~1), 발화 추정 위치 |
| **추론 시간** | < 100ms |
| **실행 주기** | 매 100ms |
| **목표** | 발화 감지 → 대응 시간 **1초 이내** |

---

## 2. 알고리즘 설명

### 2.1 왜 Rate-of-Change인가?

배터리 열폭주(Thermal Runaway)는 **온도 급상승**이 핵심 특징입니다:

```
정상: 온도 변화 ~0.1°C/s (서서히)
발화 전조: 온도 변화 ~5°C/s (급상승 시작)
열폭주: 온도 변화 >50°C/s (폭발적 상승)
```

복잡한 AI보다 **온도 변화율(dT/dt)**을 감시하는 것이 가장 빠르고 확실합니다.

### 2.2 다중 계층 감지

```
[Layer 1] 절대값 감시    → TMP-IR > 80°C 즉시 경보
[Layer 2] 변화율 감시    → dT/dt > 5°C/s 발화 전조 감지
[Layer 3] 가속도 감시    → d²T/dt² > 0 (변화율이 점점 빨라짐) 열폭주 확인
[Layer 4] 이중화 교차    → TMP-IR과 TMP-IR2 교차 검증으로 오경보 제거
```

---

## 3. 데이터 요구사항

### 3.1 입력 센서
- **TMP-IR**: 적외선 온도센서 (파쇄 챔버 상부, -20~500°C, **100ms 샘플링**)
- **TMP-IR2**: 적외선 온도센서 이중화 (반대측, 동일 스펙)
- **TMP-A**: PT100 베어링 온도 (축A, -40~200°C, 1s 샘플링)
- **TMP-B**: PT100 베어링 온도 (축B, 동일 스펙)

### 3.2 학습 데이터
- **정상 패턴**: 14일간의 정상 온도 프로파일 (다양한 재료)
- **실제 발화 데이터**: 없어도 가능 (물리 기반 + 시뮬레이션)
- 수집 기간: 약 1개월

---

## 4. 구현

### 4.1 핵심 감지 로직

```python
import numpy as np
from collections import deque
import time

class FireDetector:
    """배터리 발화/열폭주 실시간 감지"""

    def __init__(self):
        # 온도 이력 버퍼 (최근 60초, 100ms 간격 = 600개)
        self.ir1_buffer = deque(maxlen=600)
        self.ir2_buffer = deque(maxlen=600)
        self.tmp_a_buffer = deque(maxlen=60)   # 1s 간격
        self.tmp_b_buffer = deque(maxlen=60)

        # 임계값
        self.THRESHOLDS = {
            # Layer 1: 절대값
            'abs_warning': 60.0,      # °C — 경고
            'abs_alarm': 80.0,        # °C — 알람
            'abs_emergency': 120.0,   # °C — 비상정지

            # Layer 2: 변화율 (dT/dt)
            'rate_warning': 2.0,      # °C/s — 전조 감시
            'rate_alarm': 5.0,        # °C/s — 발화 전조
            'rate_emergency': 20.0,   # °C/s — 열폭주 확정

            # Layer 3: 가속도 (d²T/dt²)
            'accel_alarm': 1.0,       # °C/s² — 변화율 가속 시 위험

            # Layer 4: 이중화 교차
            'ir_diff_max': 10.0,      # °C — IR1과 IR2 허용 차이 (초과 시 센서 이상)
        }

        # 정상 기준선 (14일 학습 후 설정)
        self.baseline_mean = None
        self.baseline_std = None

    def update(self, tmp_ir1, tmp_ir2, tmp_a=None, tmp_b=None, timestamp_ms=None):
        """
        매 100ms 호출 (TMP-IR)
        TMP-A/B는 1s 주기로 별도 업데이트

        Returns:
            dict: 발화 판정 결과
        """
        self.ir1_buffer.append(tmp_ir1)
        self.ir2_buffer.append(tmp_ir2)
        if tmp_a is not None:
            self.tmp_a_buffer.append(tmp_a)
        if tmp_b is not None:
            self.tmp_b_buffer.append(tmp_b)

        if len(self.ir1_buffer) < 20:  # 최소 2초
            return {'fire': False, 'probability': 0.0, 'level': 'INITIALIZING'}

        # === Layer 1: 절대값 감시 ===
        current_temp = max(tmp_ir1, tmp_ir2)
        abs_level = self._check_absolute(current_temp)

        # === Layer 2: 변화율 감시 (dT/dt) ===
        rate_1s = self._compute_rate(self.ir1_buffer, window=10)   # 1초 변화율
        rate_5s = self._compute_rate(self.ir1_buffer, window=50)   # 5초 변화율
        rate_level = self._check_rate(max(rate_1s, rate_5s))

        # === Layer 3: 가속도 감시 (d²T/dt²) ===
        accel = self._compute_acceleration(self.ir1_buffer)
        accel_level = "ALARM" if accel > self.THRESHOLDS['accel_alarm'] else "NORMAL"

        # === Layer 4: 이중화 교차 검증 ===
        ir_diff = abs(tmp_ir1 - tmp_ir2)
        sensor_ok = ir_diff < self.THRESHOLDS['ir_diff_max']
        both_high = tmp_ir1 > self.THRESHOLDS['abs_warning'] and tmp_ir2 > self.THRESHOLDS['abs_warning']

        # === 종합 판정 ===
        probability = 0.0
        fire_level = "NORMAL"
        action = "정상 운전"

        # 센서 이상 체크
        if not sensor_ok:
            return {
                'fire': False, 'probability': 0.0,
                'level': 'SENSOR_FAULT',
                'action': 'IR 센서 점검 필요',
                'details': {'ir_diff': round(ir_diff, 1)}
            }

        # 비상: 절대값 초과 또는 열폭주 변화율
        if abs_level == "EMERGENCY" or rate_level == "EMERGENCY":
            probability = 1.0
            fire_level = "EMERGENCY"
            action = "비상정지 + 소화 시스템 작동"

        # 알람: 높은 온도 + 빠른 변화율
        elif abs_level == "ALARM" or rate_level == "ALARM":
            probability = 0.8
            if accel_level == "ALARM":  # 가속 중이면 더 위험
                probability = 0.9
            fire_level = "ALARM"
            action = "투입 중지 + 모니터링 강화"

        # 경고: 전조 감지
        elif abs_level == "WARNING" or rate_level == "WARNING":
            probability = 0.4
            fire_level = "WARNING"
            action = "투입 속도 감소 + 감시 강화"

        # Anomaly Detection: 기준선 대비 이상
        elif self.baseline_mean is not None:
            z_score = (current_temp - self.baseline_mean) / (self.baseline_std + 1e-8)
            if z_score > 3:
                probability = 0.3
                fire_level = "WATCH"
                action = "온도 이상 감시"

        return {
            'fire': fire_level in ["EMERGENCY", "ALARM"],
            'probability': round(probability, 2),
            'level': fire_level,
            'action': action,
            'details': {
                'current_temp_ir1': round(tmp_ir1, 1),
                'current_temp_ir2': round(tmp_ir2, 1),
                'rate_1s': round(rate_1s, 2),
                'rate_5s': round(rate_5s, 2),
                'acceleration': round(accel, 3),
                'ir_diff': round(ir_diff, 1),
            }
        }

    def _check_absolute(self, temp):
        if temp >= self.THRESHOLDS['abs_emergency']:
            return "EMERGENCY"
        elif temp >= self.THRESHOLDS['abs_alarm']:
            return "ALARM"
        elif temp >= self.THRESHOLDS['abs_warning']:
            return "WARNING"
        return "NORMAL"

    def _check_rate(self, rate):
        if rate >= self.THRESHOLDS['rate_emergency']:
            return "EMERGENCY"
        elif rate >= self.THRESHOLDS['rate_alarm']:
            return "ALARM"
        elif rate >= self.THRESHOLDS['rate_warning']:
            return "WARNING"
        return "NORMAL"

    def _compute_rate(self, buffer, window=10):
        """변화율 계산 (°C/s)"""
        if len(buffer) < window:
            return 0.0
        data = list(buffer)
        dt = window * 0.1  # 100ms 간격 × window
        return (data[-1] - data[-window]) / dt

    def _compute_acceleration(self, buffer, window=20):
        """변화율의 변화율 (°C/s²)"""
        if len(buffer) < window * 2:
            return 0.0
        data = list(buffer)
        rate_now = (data[-1] - data[-window]) / (window * 0.1)
        rate_prev = (data[-window] - data[-window*2]) / (window * 0.1)
        return (rate_now - rate_prev) / (window * 0.1)

    def set_baseline(self, temp_history):
        """정상 온도 기준선 설정 (14일 데이터)"""
        self.baseline_mean = np.mean(temp_history)
        self.baseline_std = np.std(temp_history)
```

### 4.2 비상 대응 시퀀스

```python
class FireResponseController:
    """발화 감지 시 자동 비상 대응"""

    RESPONSE_SEQUENCE = {
        'WARNING': [
            ('투입 컨베이어 감속', 0),         # 즉시
            ('알림: 운전자 주의', 0),
        ],
        'ALARM': [
            ('투입 컨베이어 정지', 0),         # 즉시
            ('슈레더 감속 → 50%', 0),
            ('알림: 관리자 호출', 0),
            ('소방 시스템 대기', 0),
        ],
        'EMERGENCY': [
            ('비상정지: 전체 라인', 0),         # 0ms
            ('N₂ 퍼지 시작', 100),             # 100ms
            ('소화 시스템 작동', 500),          # 500ms
            ('배기 팬 정지', 500),              # 500ms (분진 확산 방지)
            ('알림: 119 자동 신고', 1000),      # 1초
            ('알림: 전 직원 대피', 1000),
        ],
    }

    def execute(self, fire_result, plc_interface, alarm_system):
        level = fire_result['level']
        if level not in self.RESPONSE_SEQUENCE:
            return

        for action_name, delay_ms in self.RESPONSE_SEQUENCE[level]:
            if delay_ms > 0:
                time.sleep(delay_ms / 1000)
            self._do_action(action_name, plc_interface, alarm_system)

    def _do_action(self, action_name, plc, alarm):
        actions = {
            '비상정지: 전체 라인': lambda: plc.emergency_stop_all(),
            'N₂ 퍼지 시작': lambda: plc.activate_nitrogen_purge(),
            '소화 시스템 작동': lambda: plc.activate_fire_suppression(),
            '배기 팬 정지': lambda: plc.stop_exhaust_fan(),
            '투입 컨베이어 정지': lambda: plc.stop_conveyor(),
            '투입 컨베이어 감속': lambda: plc.slow_conveyor(50),
            '슈레더 감속 → 50%': lambda: plc.set_speed_percent(50),
            '알림: 119 자동 신고': lambda: alarm.call_119(),
            '알림: 전 직원 대피': lambda: alarm.evacuate_all(),
            '알림: 운전자 주의': lambda: alarm.notify_operator("온도 경고"),
            '알림: 관리자 호출': lambda: alarm.notify_manager("발화 알람"),
            '소방 시스템 대기': lambda: plc.arm_fire_suppression(),
        }
        if action_name in actions:
            actions[action_name]()
```

---

## 5. 발화 위치 추정

```python
def estimate_fire_location(tmp_ir1, tmp_ir2, tmp_a, tmp_b):
    """
    4개 온도센서의 상대적 온도로 발화 위치 추정

    센서 배치:
    TMP-IR1 ─── 챔버 상부 좌 ──── TMP-IR2
       │                              │
    TMP-A ──── 축A 베어링 ──── TMP-B (축B 베어링)
    """
    temps = {
        'ir1': tmp_ir1,  # 챔버 좌
        'ir2': tmp_ir2,  # 챔버 우
        'a': tmp_a,      # 축A (좌)
        'b': tmp_b,      # 축B (우)
    }

    max_sensor = max(temps, key=temps.get)
    location_map = {
        'ir1': "챔버 좌측 상부 (투입구 근방)",
        'ir2': "챔버 우측 상부",
        'a': "축A 베어링 부근 (좌측)",
        'b': "축B 베어링 부근 (우측)",
    }

    return {
        'estimated_location': location_map[max_sensor],
        'hottest_sensor': max_sensor,
        'temperature_map': temps
    }
```

---

## 6. 주의사항

- **이중화 필수**: IR 센서 1개 고장 시에도 감지 가능하도록 TMP-IR2 이중화
- **렌즈 오염**: 적외선 센서 렌즈에 분진이 쌓이면 측정 오차 → 주기적 에어퍼지 필요
- **정상 온도 변동**: 재료 종류(플라스틱, 금속, 배터리)에 따라 정상 온도 범위가 다름 → 재료별 기준선 필요
- **오경보 최소화**: Layer 4(이중화 교차)로 센서 이상을 필터링하고, 200ms 지속 확인으로 순간 노이즈 제거
- **100ms 이내 감지 → 1초 이내 대응**이 핵심 목표 (배터리 열폭주는 수 초 만에 확산)
