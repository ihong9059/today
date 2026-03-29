# 모델 4: 이물질 끼임 감지 — 실시간 패턴 인식

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 이물질 끼임 감지 (Foreign Object Jamming Detection) |
| **알고리즘** | Rule-based + Statistical Pattern Recognition |
| **영역** | 고장예지 (Predictive Maintenance) |
| **입력** | CUR-A/B (10ms 간격), SPD-A/B (10ms 간격) |
| **출력** | 끼임 확률 (0~1), 권고 조치 (역회전/정지) |
| **추론 시간** | < 5ms |
| **실행 주기** | 매 10ms |
| **목표 정확도** | 95%+ |

---

## 2. 알고리즘 설명

### 2.1 왜 Rule-based인가?

이물질 끼임은 패턴이 매우 명확합니다:
- **전류 급등** + **속도 급감**이 **동시에** 발생
- 단순 룰로도 95% 이상 정확하게 감지 가능
- 복잡한 AI 모델보다 **더 빠르고 더 신뢰**할 수 있음
- 실시간 10ms 반응이 필요하므로 경량 로직이 필수

### 2.2 끼임 발생 시 물리적 패턴

```
정상 운전 중:
  전류: ~~~~60A~~~~60A~~~~60A~~~~  (안정)
  속도: ~~~~120RPM~~~~120RPM~~~~   (안정)

이물질 끼임 발생:
  전류: ~~~~60A→→→150A↑↑↑180A     (급등, 0.5~2초)
  속도: ~~~~120RPM→→→80→→→40RPM   (급감, 동시)

  → 전류 급등(×2 이상) + 속도 급감(50% 이하) = 끼임!
```

---

## 3. 데이터 요구사항

### 3.1 입력 센서
- **CUR-A/B**: CT 전류센서 (0~200A, 10ms 샘플링)
- **SPD-A/B**: 인코더 속도센서 (0~200 RPM, 10ms 샘플링)

### 3.2 학습 데이터
- **최소**: 실제 끼임 이벤트 10건 이상 (룰 파라미터 튜닝용)
- **수집 기간**: 약 1개월
- AI 학습은 불필요하지만, 임계값 보정을 위한 이벤트 데이터가 필요

---

## 4. 구현

### 4.1 핵심 감지 로직

```python
import numpy as np
from collections import deque
import time

class JammingDetector:
    """이물질 끼임 실시간 감지기"""

    def __init__(self, config=None):
        # 기본 파라미터
        self.config = config or {
            # 전류 급등 판정
            'current_spike_ratio': 2.0,      # 기준선 대비 2배 이상
            'current_spike_abs': 150.0,       # 절대값 150A 이상
            'current_rise_rate': 50.0,        # A/s 이상 상승률

            # 속도 급감 판정
            'speed_drop_ratio': 0.5,          # 기준선 대비 50% 이하
            'speed_drop_rate': -30.0,         # RPM/s 이상 감소율

            # 동시 발생 판정
            'coincidence_window_ms': 500,     # 전류↑ + 속도↓ 동시 발생 허용 윈도우
            'confirm_duration_ms': 200,       # 끼임 상태 지속 시간

            # 기준선
            'baseline_window_sec': 30,        # 기준선 계산 윈도우 (최근 30초)
        }

        # 기준선 버퍼 (최근 30초)
        buffer_size = int(self.config['baseline_window_sec'] * 100)  # 10ms 간격
        self.cur_a_buffer = deque(maxlen=buffer_size)
        self.cur_b_buffer = deque(maxlen=buffer_size)
        self.spd_a_buffer = deque(maxlen=buffer_size)
        self.spd_b_buffer = deque(maxlen=buffer_size)

        # 이벤트 상태
        self.current_spike_start = None
        self.speed_drop_start = None
        self.jamming_state = "NORMAL"

    def update(self, cur_a, cur_b, spd_a, spd_b, timestamp_ms):
        """
        매 10ms 호출

        Args:
            cur_a, cur_b: 전류 (A)
            spd_a, spd_b: 속도 (RPM)
            timestamp_ms: 타임스탬프 (ms)

        Returns:
            dict: 끼임 판정 결과
        """
        # 버퍼 업데이트
        self.cur_a_buffer.append(cur_a)
        self.cur_b_buffer.append(cur_b)
        self.spd_a_buffer.append(spd_a)
        self.spd_b_buffer.append(spd_b)

        if len(self.cur_a_buffer) < 100:  # 최소 1초 데이터
            return {'jamming': False, 'probability': 0.0, 'state': 'INITIALIZING'}

        # 기준선 계산
        baseline_cur = np.mean(list(self.cur_a_buffer)[-3000:-100])  # 최근 1초 제외
        baseline_spd = np.mean(list(self.spd_a_buffer)[-3000:-100])

        if baseline_cur < 10 or baseline_spd < 10:
            return {'jamming': False, 'probability': 0.0, 'state': 'IDLE'}

        # 조건 1: 전류 급등 감지
        cur_max = max(cur_a, cur_b)
        current_spike = (
            cur_max > baseline_cur * self.config['current_spike_ratio'] or
            cur_max > self.config['current_spike_abs']
        )

        # 조건 2: 전류 상승률 체크
        recent_cur = list(self.cur_a_buffer)[-10:]  # 최근 100ms
        if len(recent_cur) >= 10:
            cur_rate = (recent_cur[-1] - recent_cur[0]) / 0.1  # A/s
        else:
            cur_rate = 0
        current_rising = cur_rate > self.config['current_rise_rate']

        # 조건 3: 속도 급감 감지
        spd_min = min(spd_a, spd_b)
        speed_drop = spd_min < baseline_spd * self.config['speed_drop_ratio']

        # 조건 4: 속도 감소율 체크
        recent_spd = list(self.spd_a_buffer)[-10:]
        if len(recent_spd) >= 10:
            spd_rate = (recent_spd[-1] - recent_spd[0]) / 0.1  # RPM/s
        else:
            spd_rate = 0
        speed_falling = spd_rate < self.config['speed_drop_rate']

        # 끼임 확률 계산
        probability = 0.0
        conditions_met = 0
        if current_spike:
            probability += 0.3
            conditions_met += 1
        if current_rising:
            probability += 0.2
            conditions_met += 1
        if speed_drop:
            probability += 0.3
            conditions_met += 1
        if speed_falling:
            probability += 0.2
            conditions_met += 1

        # 끼임 판정: 전류↑ + 속도↓ 동시 발생
        is_jamming = (current_spike or current_rising) and (speed_drop or speed_falling)

        # 상태 머신
        if is_jamming and self.jamming_state == "NORMAL":
            self.jamming_state = "SUSPECTED"
            self.jam_start_time = timestamp_ms
        elif is_jamming and self.jamming_state == "SUSPECTED":
            duration = timestamp_ms - self.jam_start_time
            if duration >= self.config['confirm_duration_ms']:
                self.jamming_state = "CONFIRMED"
        elif not is_jamming:
            self.jamming_state = "NORMAL"
            self.jam_start_time = None

        # 권고 조치
        if self.jamming_state == "CONFIRMED":
            if probability > 0.8:
                action = "즉시 정지"
            else:
                action = "역회전 시도"
        elif self.jamming_state == "SUSPECTED":
            action = "감시 강화"
        else:
            action = "정상 운전"

        return {
            'jamming': self.jamming_state == "CONFIRMED",
            'probability': round(probability, 2),
            'state': self.jamming_state,
            'action': action,
            'details': {
                'current_spike': current_spike,
                'current_rate_A_per_s': round(cur_rate, 1),
                'speed_drop': speed_drop,
                'speed_rate_RPM_per_s': round(spd_rate, 1),
                'baseline_current_A': round(baseline_cur, 1),
                'baseline_speed_RPM': round(baseline_spd, 1),
            }
        }
```

### 4.2 자동 대응 시퀀스

```python
class JammingResponseController:
    """끼임 감지 시 자동 대응 제어"""

    def execute_response(self, jam_result, plc_interface):
        """
        끼임 확인 시 자동 대응 시퀀스 실행

        시퀀스:
        1. 즉시 정지 (0.5초 이내)
        2. 3초 대기
        3. 저속 역회전 (10 RPM, 5초)
        4. 전류 모니터링 → 정상이면 재시작
        5. 3회 실패 시 완전 정지 + 알람
        """
        if not jam_result['jamming']:
            return

        # Step 1: 즉시 정지
        plc_interface.emergency_stop()
        time.sleep(3)

        # Step 2: 역회전 시도 (최대 3회)
        for attempt in range(3):
            plc_interface.set_direction("REVERSE")
            plc_interface.set_speed(10)  # 저속 10 RPM
            plc_interface.start()
            time.sleep(5)

            # 전류 확인
            current = plc_interface.read_current()
            if current < 80:  # 정상 범위
                plc_interface.stop()
                time.sleep(2)
                plc_interface.set_direction("FORWARD")
                plc_interface.set_speed(120)  # 정상 속도
                plc_interface.start()
                return "RESOLVED"

            plc_interface.stop()
            time.sleep(3)

        # 3회 실패
        plc_interface.emergency_stop()
        plc_interface.alarm("이물질 끼임 해소 실패 — 수동 점검 필요")
        return "MANUAL_REQUIRED"
```

---

## 5. 파라미터 튜닝

실제 운전 데이터로 아래 파라미터를 보정합니다:

| 파라미터 | 기본값 | 조정 방법 |
|----------|--------|----------|
| current_spike_ratio | 2.0 | 정상 운전 중 전류 변동폭의 3σ 이상으로 설정 |
| current_spike_abs | 150A | 모터 정격 전류의 1.5배 |
| speed_drop_ratio | 0.5 | 정상 속도 변동 하한의 80% |
| confirm_duration_ms | 200 | 순간 충격(정상)을 필터링하는 최소 지속시간 |
| baseline_window_sec | 30 | 너무 짧으면 불안정, 너무 길면 운전 조건 변화 반영 못함 |

### 튜닝 절차
1. 정상 운전 1주일 데이터로 전류/속도의 평균, 표준편차 계산
2. 끼임 이벤트 발생 시 패턴 기록 (전류 상승폭, 속도 감소폭, 지속시간)
3. False Positive 발생 시 임계값 상향 조정
4. 미감지 발생 시 임계값 하향 조정

---

## 6. 주의사항

- 재료 투입 시 일시적 전류 상승 + 속도 감소는 정상 → `confirm_duration_ms`로 필터링
- 대형 이물질(금속덩어리)은 끼임 전 충격 진동이 먼저 발생 → VIB 센서 연계 가능
- 역회전 시 안전 인터록 필수 (작업자 접근 방지, 투입구 차단 확인)
- PLC와의 통신 지연 고려 (Modbus RTU ~50ms, EtherNet/IP ~10ms)
