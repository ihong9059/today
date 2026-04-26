# Day 1: AI/ML/DL 개념 + 환경 설정 — "AI의 세계로 첫 발을 내딛다"

## 학습 목표
- AI, ML, DL의 관계와 차이를 명확히 이해한다
- Google Colab 환경에서 PyTorch를 설치하고 GPU 사용을 확인한다
- 딥러닝의 핵심 개념(뉴런, 레이어, 학습)을 직관적으로 이해한다
- Claude Code를 활용해 개념 정리 문서를 작성한다

## 준비물
- Google 계정 (Colab 접속용)
- 웹 브라우저 (Chrome 권장)
- Claude Code CLI 설치 완료

## 실습 1: 개념 정리 — Claude Code 활용 (30분)

1. Claude Code에 다음 프롬프트를 입력한다:

```
AI, ML, DL의 관계를 설명하는 표를 만들어줘.
각각의 정의, 예시, 핵심 알고리즘을 포함해서.
마크다운 표 형식으로 작성해줘.
```

2. 추가로 다음 프롬프트를 입력한다:

```
딥러닝이 전통 머신러닝보다 유리한 경우와 불리한 경우를
각각 3가지씩 정리해줘. 실제 산업 사례를 포함해서.
```

3. 결과를 `concepts.md` 파일로 저장한다.

### 관찰 포인트
- AI > ML > DL의 포함 관계를 이해했는가?
- 지도학습/비지도학습/강화학습의 차이를 설명할 수 있는가?

## 실습 2: Google Colab 환경 설정 (30분)

1. [Google Colab](https://colab.research.google.com) 접속 후 새 노트북 생성
2. 런타임 > 런타임 유형 변경 > GPU 선택
3. 다음 코드를 셀에 입력하고 실행한다:

```python
import torch
print(f"PyTorch 버전: {torch.__version__}")
print(f"CUDA 사용 가능: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU 이름: {torch.cuda.get_device_name(0)}")
    print(f"GPU 메모리: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

4. 추가 라이브러리 설치 확인:

```python
import numpy as np
import matplotlib.pyplot as plt

print(f"NumPy 버전: {np.__version__}")

# 간단한 시각화 테스트
x = np.linspace(0, 10, 100)
y = np.sin(x)
plt.plot(x, y)
plt.title("Environment Test - Sine Wave")
plt.show()
```

### 관찰 포인트
- GPU가 T4 또는 V100으로 할당되었는가?
- PyTorch 버전이 2.x 이상인가?

## 실습 3: 뉴런과 퍼셉트론 직관 이해 (30분)

1. 단일 뉴런을 Python으로 구현한다:

```python
import numpy as np

def neuron(inputs, weights, bias):
    """단일 뉴런: 입력 * 가중치 + 편향 -> 활성화"""
    z = np.dot(inputs, weights) + bias
    # 시그모이드 활성화 함수
    activation = 1 / (1 + np.exp(-z))
    return activation

# AND 게이트 시뮬레이션
inputs_list = [[0,0], [0,1], [1,0], [1,1]]
weights = [0.5, 0.5]
bias = -0.7

print("=== AND 게이트 시뮬레이션 ===")
for inp in inputs_list:
    result = neuron(inp, weights, bias)
    print(f"입력: {inp} -> 출력: {result:.4f} -> 판정: {int(result > 0.5)}")
```

2. 가중치와 편향을 바꿔가며 OR 게이트도 만들어본다.

### 관찰 포인트
- 가중치를 바꾸면 출력이 어떻게 변하는가?
- 시그모이드 함수의 역할은 무엇인가?

## 과제

### 제출물: "AI 개념 정리 + 환경 확인 보고서"

```markdown
# Day 1 과제: AI 개념 정리

## 1. AI/ML/DL 비교표
| 구분 | 정의 | 예시 | 핵심 알고리즘 |
|------|------|------|---------------|
| AI   |      |      |               |
| ML   |      |      |               |
| DL   |      |      |               |

## 2. 환경 확인 스크린샷
- PyTorch 버전:
- CUDA 사용 여부:
- GPU 이름:

## 3. 뉴런 실험 결과
- AND 게이트 가중치/편향:
- OR 게이트 가중치/편향:
- XOR 게이트가 단일 뉴런으로 안 되는 이유:
```

## 강사 참고 사항
- Colab 무료 GPU 할당이 안 될 경우 CPU로 진행해도 Day 1~3까지는 문제없다
- XOR 문제를 언급하며 "다층 퍼셉트론의 필요성"으로 자연스럽게 Day 2 예고
- 수강생 Python 수준이 낮으면 NumPy 기초를 10분 추가 설명한다
