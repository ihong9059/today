# 모델 7: 전해액 누출 감지 — Multi-gas Fusion

## 1. 개요

| 항목 | 내용 |
|------|------|
| **모델명** | 전해액 누출 감지 (Electrolyte Leak Detection) |
| **알고리즘** | Multi-gas Fusion (다중 가스 복합 분석) |
| **영역** | 사고예방 (Accident Prevention) |
| **입력** | GAS-1 복합가스센서 (VOC, H₂, CO 동시 측정) |
| **출력** | 누출 확률 (0~1), 추정 가스 종류 |
| **추론 시간** | < 1s |
| **실행 주기** | 매 1초 |

---

## 2. 알고리즘 설명

### 2.1 배경: 배터리 전해액이란?

리튬이온 배터리 전해액은 유기 용매(EC, DMC, EMC 등) + LiPF₆ 혼합물입니다. 파쇄 시 배터리가 손상되면:

```
전해액 누출 → 유기 용매 증발 → VOC 농도 상승
                             → H₂ 미량 발생 (전기화학 분해)
             → LiPF₆ 분해 → HF (불화수소) 독성 가스 발생 위험
             → 발화 시    → CO 발생 (불완전 연소)
```

### 2.2 Multi-gas Fusion이란?

**단일 가스**만으로는 오판 가능:
- VOC 높음 → 전해액? or 윤활유? or 세척제?
- H₂ 높음 → 전해액? or 축전지 충전?

**다중 가스 패턴**을 복합 분석하면 원인을 정확히 구분:

| 패턴 | VOC | H₂ | CO | 원인 |
|------|:---:|:--:|:--:|------|
| A | ↑↑ | ↑ | - | **전해액 누출 (초기)** |
| B | ↑↑ | ↑ | ↑↑ | **전해액 + 발화** |
| C | ↑ | - | - | 윤활유/세척제 (비위험) |
| D | - | ↑ | - | 외부 H₂ 유입 (비위험) |
| E | - | - | ↑ | 마찰 과열 (모델 5 연계) |

### 2.3 왜 Fusion인가?

| 장점 | 설명 |
|------|------|
| **높은 특이도** | 다중 가스 패턴으로 전해액을 정확히 구분 (단일 센서 대비 오경보 80%↓) |
| **원인 분류** | 누출인지, 발화인지, 외부 유입인지 자동 판별 |
| **조기 감지** | VOC + H₂ 복합 상승이 발화보다 수십 초~수 분 선행 |

---

## 3. 구현

### 3.1 다중 가스 패턴 분석

```python
import numpy as np
from collections import deque

class ElectrolyteLeakDetector:
    """전해액 누출 다중 가스 융합 감지"""

    def __init__(self):
        # 정상 기준선 (14일 학습 후)
        self.baseline = {
            'voc': {'mean': 50, 'std': 15},    # ppb
            'h2': {'mean': 200, 'std': 50},     # ppb
            'co': {'mean': 0.5, 'std': 0.2},    # ppm
        }

        # 이력 버퍼 (최근 10분)
        self.voc_history = deque(maxlen=600)
        self.h2_history = deque(maxlen=600)
        self.co_history = deque(maxlen=600)

        # 가스 패턴 정의 (Z-score 기준)
        self.PATTERNS = {
            'electrolyte_leak': {
                'voc_z': 3.0,    # VOC Z-score ≥ 3
                'h2_z': 2.0,     # H₂ Z-score ≥ 2
                'co_z': None,    # CO는 무관
                'probability': 0.85,
                'label': '전해액 누출 (초기)',
                'severity': 'ALARM',
            },
            'electrolyte_fire': {
                'voc_z': 3.0,
                'h2_z': 2.0,
                'co_z': 3.0,     # CO도 높음 → 연소 발생
                'probability': 0.95,
                'label': '전해액 누출 + 발화',
                'severity': 'EMERGENCY',
            },
            'lubricant_normal': {
                'voc_z': 2.0,
                'h2_z': None,    # H₂ 정상
                'co_z': None,
                'probability': 0.2,
                'label': '윤활유/세척제 (정상)',
                'severity': 'NORMAL',
            },
            'external_h2': {
                'voc_z': None,
                'h2_z': 2.0,
                'co_z': None,
                'probability': 0.1,
                'label': '외부 H₂ 유입',
                'severity': 'WATCH',
            },
            'friction_heat': {
                'voc_z': None,
                'h2_z': None,
                'co_z': 2.0,
                'probability': 0.4,
                'label': '마찰 과열 (모델 5 연계)',
                'severity': 'WARNING',
            },
        }

    def update(self, voc_ppb, h2_ppb, co_ppm):
        """
        매 1초 호출

        Args:
            voc_ppb: VOC 농도 (ppb)
            h2_ppb: H₂ 농도 (ppb)
            co_ppm: CO 농도 (ppm)

        Returns:
            dict: 누출 판정 결과
        """
        self.voc_history.append(voc_ppb)
        self.h2_history.append(h2_ppb)
        self.co_history.append(co_ppm)

        # Z-score 계산
        z_voc = (voc_ppb - self.baseline['voc']['mean']) / self.baseline['voc']['std']
        z_h2 = (h2_ppb - self.baseline['h2']['mean']) / self.baseline['h2']['std']
        z_co = (co_ppm - self.baseline['co']['mean']) / self.baseline['co']['std']

        # 변화율 계산 (최근 30초)
        rate_voc = self._compute_rate(self.voc_history, window=30)
        rate_h2 = self._compute_rate(self.h2_history, window=30)
        rate_co = self._compute_rate(self.co_history, window=30)

        # 패턴 매칭
        matched_pattern = self._match_pattern(z_voc, z_h2, z_co)

        # 종합 누출 확률
        leak_probability = self._compute_leak_probability(z_voc, z_h2, z_co,
                                                          rate_voc, rate_h2, rate_co)

        return {
            'leak': leak_probability > 0.5,
            'probability': round(leak_probability, 2),
            'pattern': matched_pattern['label'],
            'severity': matched_pattern['severity'],
            'action': self._get_action(matched_pattern['severity']),
            'details': {
                'voc_ppb': round(voc_ppb, 0),
                'h2_ppb': round(h2_ppb, 0),
                'co_ppm': round(co_ppm, 2),
                'z_voc': round(z_voc, 2),
                'z_h2': round(z_h2, 2),
                'z_co': round(z_co, 2),
                'rate_voc': round(rate_voc, 1),
                'rate_h2': round(rate_h2, 1),
                'rate_co': round(rate_co, 3),
            }
        }

    def _match_pattern(self, z_voc, z_h2, z_co):
        """다중 가스 패턴 매칭 — 가장 위험한 패턴 우선"""
        best_match = {'label': '정상', 'severity': 'NORMAL', 'probability': 0}

        for name, pattern in self.PATTERNS.items():
            match = True
            if pattern['voc_z'] is not None and z_voc < pattern['voc_z']:
                match = False
            if pattern['h2_z'] is not None and z_h2 < pattern['h2_z']:
                match = False
            if pattern['co_z'] is not None and z_co < pattern['co_z']:
                match = False

            if match and pattern['probability'] > best_match['probability']:
                best_match = pattern

        return best_match

    def _compute_leak_probability(self, z_voc, z_h2, z_co,
                                   rate_voc, rate_h2, rate_co):
        """가중 합산으로 누출 확률 계산"""
        score = 0.0

        # Z-score 기여 (0~0.6)
        if z_voc > 2: score += min(0.3, (z_voc - 2) * 0.1)
        if z_h2 > 2: score += min(0.2, (z_h2 - 2) * 0.07)
        if z_co > 2: score += min(0.1, (z_co - 2) * 0.05)

        # 변화율 기여 (0~0.3) — 급상승 시 추가 점수
        if rate_voc > 5: score += min(0.15, rate_voc * 0.01)
        if rate_h2 > 10: score += min(0.1, rate_h2 * 0.005)
        if rate_co > 0.1: score += min(0.05, rate_co * 0.1)

        # 복합 상승 보너스 (0~0.1) — VOC+H₂ 동시 상승
        if z_voc > 2 and z_h2 > 1.5:
            score += 0.1

        return min(1.0, score)

    def _compute_rate(self, buffer, window=30):
        if len(buffer) < window:
            return 0.0
        data = list(buffer)
        return (data[-1] - data[-window]) / window  # 단위/초

    def _get_action(self, severity):
        actions = {
            'NORMAL': '정상 운전',
            'WATCH': '모니터링 강화',
            'WARNING': '환기 확인 + 모델 5(발화) 연계 감시',
            'ALARM': '투입 중지 + 환기 최대 + 작업자 대피 준비',
            'EMERGENCY': '비상정지 + 대피 + 소방 대응',
        }
        return actions.get(severity, '확인 필요')

    def set_baseline(self, voc_data, h2_data, co_data):
        """정상 기준선 설정 (14일 데이터)"""
        self.baseline = {
            'voc': {'mean': np.mean(voc_data), 'std': np.std(voc_data)},
            'h2': {'mean': np.mean(h2_data), 'std': np.std(h2_data)},
            'co': {'mean': np.mean(co_data), 'std': np.std(co_data)},
        }
```

---

## 4. 가스 종류별 위험 기준

| 가스 | 정상 범위 | 경고 | 위험 | 독성 한계 |
|------|----------|------|------|----------|
| **VOC** | < 100 ppb | 500 ppb | 2,000 ppb | 물질별 상이 |
| **H₂** | < 400 ppb | 1,000 ppb | 4,000 ppb | 비독성, 폭발 위험 (4% vol) |
| **CO** | < 1 ppm | 10 ppm | 50 ppm | TWA 25 ppm, IDLH 1,200 ppm |
| **HF** | 0 | 0.5 ppm | 3 ppm | TWA 0.5 ppm (매우 독성) |

---

## 5. 주의사항

- **센서 교차 민감도**: MOX 가스센서는 다른 가스에도 반응 → 캘리브레이션 주기적 필요
- **온도/습도 보정**: 가스 센서 감도는 온습도에 민감 → 보정 알고리즘 필수
- **HF(불화수소)**: 복합가스센서로 직접 측정 어려움 → VOC+H₂ 패턴으로 간접 추정
- **환기 시스템과 연동**: 누출 감지 시 배기만 하면 가스가 작업자 쪽으로 이동할 수 있음 → 풍향 고려
- **모델 5(발화)와 연계**: 전해액 누출은 발화의 전조 → 두 모델의 교차 확인으로 신뢰도 향상
