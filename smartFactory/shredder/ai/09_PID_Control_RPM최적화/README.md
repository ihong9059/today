# 모델 9: RPM 최적화 — 룰 기반 + PID 피드백 제어

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | RPM 최적화 (RPM Optimization) |
| **알고리즘** | 룰 기반 (Look-up Table) + PID 피드백 제어 |
| **영역** | 품질관리 (Quality Control) |
| **입력** | 파쇄 크기 예측값 (모델 8) + 목표값 + 재료 종류 |
| **출력** | 축A/B 최적 RPM |
| **추론 시간** | < 100ms |
| **실행 주기** | 매 1분 |

---

## 2. 알고리즘 설명

### 2.1 왜 AI가 아닌 룰 기반인가?

| 이유 | 설명 |
|------|------|
| **안전 직결** | RPM 제어는 안전에 직결 → 예측 가능하고 해석 가능한 방법이 더 안전 |
| **제어 변수 단순** | RPM 하나 → 복잡한 AI보다 PID가 더 안정적 |
| **즉시 이해** | 현장 운전자가 "왜 그 RPM인지" 즉시 이해 가능 |
| **검증 용이** | 룰 테이블을 직접 확인하고 수정 가능 |

### 2.2 2단계 제어 구조

```
[1단계] Look-up Table → 재료 + 목표 크기에 따른 기본 RPM 결정
                          ↓
[2단계] PID 피드백 → 모델 8 예측 크기와 목표의 차이로 RPM 미세 조정
```

---

## 3. 구현

### 3.1 1단계: Look-up Table (기본 RPM)

```python
class RPMOptimizer:
    """RPM 최적화 — 룰 기반 + PID 피드백"""

    # 재료별 + 목표 크기별 기본 RPM 테이블
    # (실제 운전 경험으로 초기 설정, 운영 중 튜닝)
    RPM_TABLE = {
        # 재료: { 목표크기(mm): (RPM_A, RPM_B) }
        'battery': {
            30: (100, 100),   # 작게 파쇄 → 고속
            50: (80, 80),     # 표준
            80: (60, 60),     # 크게 파쇄 → 저속
        },
        'plastic': {
            30: (120, 120),
            50: (90, 90),
            80: (70, 70),
        },
        'metal': {
            30: (80, 80),     # 금속은 저속 필요
            50: (65, 65),
            80: (50, 50),
        },
        'mixed': {
            30: (90, 90),
            50: (75, 75),
            80: (55, 55),
        },
    }

    # RPM 안전 범위
    RPM_MIN = 30    # 최소 RPM (너무 낮으면 끼임 위험)
    RPM_MAX = 140   # 최대 RPM (모터 정격 한계)

    def __init__(self):
        self.pid = PIDController(
            Kp=0.5,    # 비례 이득
            Ki=0.05,   # 적분 이득
            Kd=0.1,    # 미분 이득
            output_min=-10,   # RPM 최대 감소
            output_max=10,    # RPM 최대 증가
        )

    def recommend(self, current_size, target_size, material,
                  blade_wear_pct=0, current_load_pct=0):
        """
        최적 RPM 추천

        Args:
            current_size: 모델 8이 예측한 현재 파쇄 크기 (mm)
            target_size: 목표 파쇄 크기 (mm)
            material: 재료 종류
            blade_wear_pct: 칼날 마모율 (모델 2)
            current_load_pct: 현재 부하율

        Returns:
            dict: 최적 RPM 및 근거
        """
        # 1단계: Look-up Table에서 기본 RPM 결정
        base_rpm_a, base_rpm_b = self._lookup_base_rpm(material, target_size)

        # 칼날 마모 보정: 마모가 심할수록 RPM 약간 증가 (절삭력 보상)
        wear_compensation = blade_wear_pct * 0.1  # 마모 100% → +10 RPM
        base_rpm_a += wear_compensation
        base_rpm_b += wear_compensation

        # 부하 보정: 과부하 시 RPM 감소
        if current_load_pct > 85:
            load_reduction = (current_load_pct - 85) * 0.5
            base_rpm_a -= load_reduction
            base_rpm_b -= load_reduction

        # 2단계: PID 피드백 (예측 크기 ↔ 목표 크기 오차 보정)
        error = target_size - current_size  # 양수: 더 크게 필요 → RPM↓
        pid_adjustment = self.pid.compute(error)

        # 최종 RPM (PID는 error가 양수이면 RPM 감소, 음수이면 RPM 증가)
        final_rpm_a = self._clamp(base_rpm_a - pid_adjustment)
        final_rpm_b = self._clamp(base_rpm_b - pid_adjustment)

        return {
            'rpm_a': round(final_rpm_a, 1),
            'rpm_b': round(final_rpm_b, 1),
            'base_rpm': round(base_rpm_a, 1),
            'pid_adjustment': round(pid_adjustment, 1),
            'wear_compensation': round(wear_compensation, 1),
            'reasoning': self._explain(current_size, target_size, pid_adjustment),
        }

    def _lookup_base_rpm(self, material, target_size):
        """Look-up Table에서 기본 RPM 보간"""
        table = self.RPM_TABLE.get(material, self.RPM_TABLE['mixed'])
        sizes = sorted(table.keys())

        # 정확히 일치하면 그대로
        if target_size in table:
            return table[target_size]

        # 선형 보간
        for i in range(len(sizes) - 1):
            if sizes[i] <= target_size <= sizes[i+1]:
                ratio = (target_size - sizes[i]) / (sizes[i+1] - sizes[i])
                rpm_a = table[sizes[i]][0] + ratio * (table[sizes[i+1]][0] - table[sizes[i]][0])
                rpm_b = table[sizes[i]][1] + ratio * (table[sizes[i+1]][1] - table[sizes[i]][1])
                return rpm_a, rpm_b

        # 범위 밖: 가장 가까운 값
        if target_size < sizes[0]:
            return table[sizes[0]]
        return table[sizes[-1]]

    def _clamp(self, rpm):
        """안전 범위 내로 제한"""
        return max(self.RPM_MIN, min(self.RPM_MAX, rpm))

    def _explain(self, current_size, target_size, pid_adj):
        """운전자에게 이해 가능한 설명 생성"""
        diff = current_size - target_size
        if abs(diff) <= 2:
            return f"목표 크기({target_size}mm)에 근접 — RPM 유지"
        elif diff > 0:
            return f"파쇄 크기({current_size:.0f}mm)가 목표({target_size}mm)보다 큼 → RPM +{abs(pid_adj):.1f} 증가"
        else:
            return f"파쇄 크기({current_size:.0f}mm)가 목표({target_size}mm)보다 작음 → RPM -{abs(pid_adj):.1f} 감소"
```

### 3.2 PID 제어기

```python
class PIDController:
    """이산 PID 제어기"""

    def __init__(self, Kp=0.5, Ki=0.05, Kd=0.1,
                 output_min=-10, output_max=10):
        self.Kp = Kp
        self.Ki = Ki
        self.Kd = Kd
        self.output_min = output_min
        self.output_max = output_max

        self.integral = 0.0
        self.prev_error = 0.0
        self.prev_time = None

    def compute(self, error, dt=60):
        """
        PID 출력 계산

        Args:
            error: 목표 - 현재 (양수 = 더 크게 필요)
            dt: 시간 간격 (초, 기본 60초)

        Returns:
            float: RPM 조정값
        """
        # 비례 (P)
        p_term = self.Kp * error

        # 적분 (I) — Anti-windup
        self.integral += error * dt
        self.integral = max(-100, min(100, self.integral))  # 적분 제한
        i_term = self.Ki * self.integral

        # 미분 (D)
        derivative = (error - self.prev_error) / dt if dt > 0 else 0
        d_term = self.Kd * derivative

        self.prev_error = error

        # 출력 제한
        output = p_term + i_term + d_term
        return max(self.output_min, min(self.output_max, output))

    def reset(self):
        """PID 상태 리셋 (재료 변경, 칼날 교체 시)"""
        self.integral = 0.0
        self.prev_error = 0.0
```

### 3.3 PID 파라미터 튜닝 가이드

| 파라미터 | 기본값 | 효과 | 조정 방법 |
|----------|--------|------|----------|
| **Kp** (비례) | 0.5 | 오차에 비례하여 즉시 반응 | 응답 느리면 ↑, 진동하면 ↓ |
| **Ki** (적분) | 0.05 | 누적 오차 제거 (정상상태 오차 0) | 정상상태 오차 있으면 ↑, 오버슈트 크면 ↓ |
| **Kd** (미분) | 0.1 | 오차 변화 속도 제동 (오버슈트 방지) | 진동 심하면 ↑, 응답 느리면 ↓ |

**Ziegler-Nichols 튜닝법**:
1. Ki=0, Kd=0으로 설정
2. Kp를 서서히 올려서 RPM이 진동하기 시작하는 Ku(한계 이득) 찾기
3. 진동 주기 Tu 측정
4. Kp=0.6×Ku, Ki=2×Kp/Tu, Kd=Kp×Tu/8

---

## 4. 안전 인터록

```python
class RPMSafetyInterlock:
    """RPM 변경 전 안전 검증"""

    def validate(self, new_rpm_a, new_rpm_b, current_state):
        """RPM 변경이 안전한지 검증"""
        checks = []

        # 1. 범위 검증
        if not (30 <= new_rpm_a <= 140 and 30 <= new_rpm_b <= 140):
            checks.append("RPM 범위 초과")

        # 2. 급격한 변경 제한 (1회 최대 ±5 RPM)
        if abs(new_rpm_a - current_state['rpm_a']) > 5:
            checks.append(f"A축 RPM 변경폭 초과 ({abs(new_rpm_a - current_state['rpm_a']):.1f})")

        # 3. 과부하 시 RPM 증가 금지
        if current_state['load_pct'] > 90 and new_rpm_a > current_state['rpm_a']:
            checks.append("과부하 중 RPM 증가 불가")

        # 4. 끼임 감지 중 변경 금지
        if current_state.get('jamming', False):
            checks.append("이물질 끼임 중 RPM 변경 금지")

        return {
            'safe': len(checks) == 0,
            'issues': checks,
        }
```

---

## 5. 운영 흐름

```
매 1분:
  1. 모델 8 → 파쇄 크기 예측 (63mm)
  2. 목표 크기 (50mm) 과 비교
  3. RPM 최적화 → "목표보다 크니 RPM +2"
  4. 안전 인터록 검증
  5. PLC에 RPM 변경 명령
  6. 다음 1분 후 효과 확인 → 반복
```

---

## 6. 주의사항

- **RPM 변경 속도 제한**: 급격한 RPM 변화는 기계적 충격 유발 → 1회 최대 ±5 RPM
- **운전자 확인 모드**: 초기에는 RPM 변경을 "권고"만 하고 운전자가 수동 적용 → 신뢰 확보 후 자동 전환
- **재료 전환 시**: PID 적분 리셋 + Look-up Table에서 새 기본 RPM 적용
- **차동 운전**: 양축 RPM이 다른 경우(차동 파쇄) Look-up Table에 차동 비율 추가 필요
- **Look-up Table 업데이트**: 실제 운전 데이터 축적에 따라 주기적으로 RPM 기준값 갱신
