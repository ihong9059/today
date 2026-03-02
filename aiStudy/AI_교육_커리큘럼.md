# AI 첫걸음 - 전체 커리큘럼

**프로젝트명**: AI 첫걸음 (AI First Steps)
**작성일**: 2026-03-01
**총 레벨**: 10개 (Level 0 ~ Level 9)
**총 레슨 수**: 58개
**예상 총 학습 시간**: 약 50시간

---

## 커리큘럼 개요

```
Level 0  ──▶  Level 1  ──▶  Level 2  ──▶  Level 3
(Python)     (AI기초)      (수학)       (딥러닝)
   │                                        │
   │                                        ▼
   │         Level 5  ◀──  Level 4  ◀──  PyTorch
   │         (CNN)        (텐서/자동미분)
   │            │
   │            ▼
   │         Level 6  ──▶  Level 7  ──▶  Level 8
   │         (RNN)        (Transformer)  (CUDA)
   │                                        │
   │                                        ▼
   └────────────────────────────────────▶ Level 9
                                        (프로젝트)
```

---

## Level 0: Python 기초 (선수과목)

**목표**: AI 학습에 필요한 Python 프로그래밍 기초 습득
**예상 시간**: 4시간
**선수과목**: 없음

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 0-1 | Python 환경 설정 | 설치, IDE, Jupyter Notebook | 30분 |
| 0-2 | 변수와 자료형 | int, float, str, bool, list, dict | 40분 |
| 0-3 | 조건문과 반복문 | if, for, while, break, continue | 40분 |
| 0-4 | 함수 | def, return, 매개변수, 람다 | 40분 |
| 0-5 | NumPy 기초 | 배열 생성, 연산, 인덱싱, 브로드캐스팅 | 50분 |
| 0-6 | Matplotlib 기초 | 선 그래프, 산점도, 히스토그램 | 40분 |

**실습 프로젝트**: 간단한 데이터 시각화

---

## Level 1: AI 기초 이론

**목표**: 인공지능과 신경망의 기본 개념 이해
**예상 시간**: 5시간
**선수과목**: Level 0
**참조 자료**: `aiStudy/introduction/00_퍼셉트론_기초개념.md`, `01_XOR문제해결.md`

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 1-1 | AI란 무엇인가? | AI의 정의, 역사, 분류 (규칙 기반 vs 학습 기반) | 30분 |
| 1-2 | 뉴런에서 퍼셉트론으로 | 생물학적 뉴런, 수학적 모델링, 맥컬록-피츠 뉴런 | 40분 |
| 1-3 | 퍼셉트론 구조 | 입력, 가중치, 편향, 활성화 함수 | 45분 |
| 1-4 | 퍼셉트론 학습 | 학습 규칙, 가중치 업데이트, 수렴 조건 | 50분 |
| 1-5 | AND, OR, NOT 게이트 구현 | 논리 게이트를 퍼셉트론으로 구현 | 45분 |
| 1-6 | XOR 문제와 한계 | 선형 분리 불가능 문제, 퍼셉트론의 한계 | 40분 |
| 1-7 | 다층 퍼셉트론 소개 | MLP로 XOR 해결, 은닉층의 역할 | 50분 |

**퀴즈**: 퍼셉트론 개념 확인 (10문제)
**실습**: Python으로 퍼셉트론 구현하여 AND/OR 게이트 학습

```python
# 실습 예시: 퍼셉트론 클래스
class Perceptron:
    def __init__(self, learning_rate=0.1):
        self.lr = learning_rate
        self.weights = None
        self.bias = None

    def fit(self, X, y, epochs=100):
        # 가중치 초기화 및 학습 구현
        pass

    def predict(self, X):
        # 예측 구현
        pass
```

---

## Level 2: 수학 기초

**목표**: 딥러닝에 필요한 수학적 개념 이해
**예상 시간**: 6시간
**선수과목**: Level 0
**참조 자료**: `hongLab/Part1/Ch1/`, `hongLab/Part1/Ch2/`

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 2-1 | 함수와 그래프 | 1차/2차 함수, 지수/로그 함수 시각화 | 40분 |
| 2-2 | 미분의 직관적 이해 | 기울기, 순간 변화율, 접선 | 45분 |
| 2-3 | 미분 공식 | 기본 미분 규칙, 합성함수 미분 (체인룰) | 50분 |
| 2-4 | 편미분 | 다변수 함수, 그래디언트 벡터 | 45분 |
| 2-5 | 벡터와 행렬 기초 | 내적, 행렬곱, 전치 | 50분 |
| 2-6 | 확률 기초 | 확률 정의, 조건부 확률, 베이즈 정리 | 45분 |
| 2-7 | 확률 분포 | 이산/연속 분포, 정규분포, 기댓값/분산 | 50분 |
| 2-8 | 통계 기초 | 평균, 분산, 표준편차, 상관관계 | 45분 |

**퀴즈**: 수학 개념 확인 (15문제)
**실습**: NumPy로 미분, 행렬 연산, 확률 계산

```python
# 실습 예시: 수치 미분
def numerical_derivative(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)

# 실습 예시: 그래디언트
def gradient(f, x):
    grad = np.zeros_like(x)
    for i in range(len(x)):
        h = np.zeros_like(x)
        h[i] = 1e-5
        grad[i] = (f(x + h) - f(x - h)) / (2 * 1e-5)
    return grad
```

---

## Level 3: 딥러닝 핵심

**목표**: 경사하강법과 역전파 알고리즘 완벽 이해
**예상 시간**: 6시간
**선수과목**: Level 1, Level 2
**참조 자료**: `aiStudy/introduction/02_역전파와_다층퍼셉트론.md`, `hongLab/Part1/Ch3/`

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 3-1 | 손실 함수 | MSE, Cross-Entropy, 손실 지형 시각화 | 45분 |
| 3-2 | 경사하강법 기본 | 기울기 방향, 학습률, 수렴 과정 | 50분 |
| 3-3 | 경사하강법 변형 | SGD, Mini-batch, Momentum, Adam | 50분 |
| 3-4 | 순전파 | 입력 → 출력 계산 과정, 행렬 연산 | 45분 |
| 3-5 | 역전파 이론 | 체인룰, 오차 역전파, 그래디언트 계산 | 60분 |
| 3-6 | 역전파 구현 | 직접 코드로 역전파 구현 | 60분 |
| 3-7 | 활성화 함수 | Sigmoid, ReLU, Tanh, Softmax | 45분 |
| 3-8 | 과적합과 정규화 | Dropout, L1/L2 정규화, Early Stopping | 45분 |

**퀴즈**: 역전파 이해도 확인 (10문제)
**실습**: 순수 NumPy로 2층 신경망 구현

```python
# 실습 예시: 역전파 핵심 코드
class TwoLayerNet:
    def forward(self, x):
        self.z1 = x @ self.W1 + self.b1
        self.a1 = relu(self.z1)
        self.z2 = self.a1 @ self.W2 + self.b2
        self.a2 = softmax(self.z2)
        return self.a2

    def backward(self, x, y):
        m = x.shape[0]
        dz2 = self.a2 - y
        dW2 = (1/m) * self.a1.T @ dz2
        db2 = (1/m) * np.sum(dz2, axis=0)
        da1 = dz2 @ self.W2.T
        dz1 = da1 * relu_derivative(self.z1)
        dW1 = (1/m) * x.T @ dz1
        db1 = (1/m) * np.sum(dz1, axis=0)
        return dW1, db1, dW2, db2
```

---

## Level 4: PyTorch 입문

**목표**: PyTorch 프레임워크 사용법 습득
**예상 시간**: 5시간
**선수과목**: Level 3
**참조 자료**: `hongLab/Part1/Ch3/`, `유투브/파이토치_기초_강의_요약.md`

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 4-1 | PyTorch 소개 | 설치, 텐서 생성, GPU 사용 | 40분 |
| 4-2 | 텐서 연산 | 인덱싱, 형태 변환, 브로드캐스팅 | 45분 |
| 4-3 | 자동 미분 (Autograd) | requires_grad, backward(), grad | 50분 |
| 4-4 | nn.Module 기초 | 레이어 정의, forward(), 파라미터 | 50분 |
| 4-5 | 데이터 로딩 | Dataset, DataLoader, transforms | 45분 |
| 4-6 | 학습 루프 | train/eval 모드, optimizer, loss | 50분 |
| 4-7 | 모델 저장/로드 | state_dict, checkpoint | 30분 |

**퀴즈**: PyTorch 기본 사용법 (8문제)
**실습**: MNIST 분류기 구현

```python
# 실습 예시: PyTorch 신경망
import torch
import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = x.view(-1, 784)
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x
```

---

## Level 5: CNN & 이미지 처리

**목표**: 합성곱 신경망 이해 및 이미지 분류 구현
**예상 시간**: 6시간
**선수과목**: Level 4
**참조 자료**: `aiStudy/introduction/AI_딥러닝_연습예제_리스트.md` (Level 2-3)

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 5-1 | 컴퓨터 비전 소개 | 이미지 표현, 픽셀, 채널 | 30분 |
| 5-2 | 합성곱 연산 | 커널, 스트라이드, 패딩, 특성 맵 | 50분 |
| 5-3 | 풀링과 정규화 | Max Pooling, Batch Normalization | 40분 |
| 5-4 | CNN 아키텍처 | LeNet, AlexNet, VGG 구조 이해 | 50분 |
| 5-5 | CNN 구현 (MNIST) | PyTorch로 CNN 구현 | 60분 |
| 5-6 | CNN 구현 (CIFAR-10) | 더 복잡한 이미지 분류 | 50분 |
| 5-7 | 전이 학습 | Pre-trained 모델, Fine-tuning | 50분 |
| 5-8 | 데이터 증강 | 회전, 뒤집기, 색상 변환 | 40분 |

**퀴즈**: CNN 개념 확인 (10문제)
**실습**: CIFAR-10 분류기 (정확도 80% 이상 목표)

```python
# 실습 예시: CNN 구현
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 8 * 8, 512)
        self.fc2 = nn.Linear(512, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x
```

---

## Level 6: 시퀀스 모델 (RNN/LSTM)

**목표**: 순환 신경망 이해 및 시계열/텍스트 처리
**예상 시간**: 5시간
**선수과목**: Level 4
**참조 자료**: `aiStudy/introduction/AI_딥러닝_연습예제_리스트.md` (Level 3)

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 6-1 | 시퀀스 데이터 | 시계열, 텍스트, 음성의 특성 | 30분 |
| 6-2 | RNN 기본 구조 | 순환 구조, 은닉 상태, 시간 펼치기 | 50분 |
| 6-3 | RNN의 문제점 | 기울기 소실/폭발, 장기 의존성 | 40분 |
| 6-4 | LSTM | 게이트 구조, 셀 상태, 기억 메커니즘 | 60분 |
| 6-5 | GRU | LSTM 간소화, 리셋/업데이트 게이트 | 40분 |
| 6-6 | 텍스트 전처리 | 토큰화, 임베딩, 패딩 | 45분 |
| 6-7 | 감성 분석 구현 | 영화 리뷰 긍정/부정 분류 | 55분 |

**퀴즈**: RNN/LSTM 이해도 (8문제)
**실습**: IMDB 감성 분석

```python
# 실습 예시: LSTM 감성 분석
class SentimentLSTM(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = self.embedding(x)
        _, (h_n, _) = self.lstm(x)
        out = self.fc(h_n.squeeze(0))
        return self.sigmoid(out)
```

---

## Level 7: Transformer & LLM 원리

**목표**: 현대 AI의 핵심인 Transformer 아키텍처 이해
**예상 시간**: 6시간
**선수과목**: Level 6
**참조 자료**: `aiStudy/introduction/AI_딥러닝_연습예제_리스트.md` (Level 5)

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 7-1 | Attention 메커니즘 | Query, Key, Value, Attention Score | 50분 |
| 7-2 | Self-Attention | 자기 참조, 문맥 이해 | 50분 |
| 7-3 | Multi-Head Attention | 여러 관점에서 보기, 병렬 처리 | 45분 |
| 7-4 | Positional Encoding | 위치 정보 인코딩, 사인/코사인 | 40분 |
| 7-5 | Transformer 구조 | Encoder-Decoder, Layer Norm | 60분 |
| 7-6 | BERT 개요 | 양방향 인코더, MLM, NSP | 45분 |
| 7-7 | GPT 개요 | 디코더 전용, 자기회귀, 다음 토큰 예측 | 45분 |
| 7-8 | LLM 작동 원리 | 토큰화, 추론, 샘플링 전략 | 45분 |

**퀴즈**: Transformer 이해도 (10문제)
**실습**: 간단한 Self-Attention 구현

```python
# 실습 예시: Self-Attention
def self_attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    attention_weights = F.softmax(scores, dim=-1)
    output = torch.matmul(attention_weights, V)
    return output, attention_weights
```

---

## Level 8: GPU 프로그래밍 (CUDA 기초)

**목표**: GPU 가속 원리와 CUDA 기초 이해
**예상 시간**: 5시간
**선수과목**: Level 4, C/C++ 기초 권장
**참조 자료**: `cuda/Jetson_CUDA_학습계획서.md`

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 8-1 | GPU vs CPU | 병렬 처리, SIMT, 메모리 구조 | 40분 |
| 8-2 | CUDA 개요 | 커널, 스레드, 블록, 그리드 | 50분 |
| 8-3 | CUDA 환경 설정 | 드라이버, 툴킷, nvcc | 40분 |
| 8-4 | 첫 CUDA 프로그램 | Hello World, 벡터 덧셈 | 50분 |
| 8-5 | 메모리 관리 | Global, Shared, Local 메모리 | 50분 |
| 8-6 | 병렬 패턴 | Reduction, Scan, Histogram | 50분 |
| 8-7 | PyTorch + CUDA | .to(device), 텐서 연산 가속 | 40분 |

**퀴즈**: CUDA 기본 개념 (6문제)
**실습**: 행렬 곱셈 CUDA 구현

```c
// 실습 예시: CUDA 벡터 덧셈
__global__ void vectorAdd(float *a, float *b, float *c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        c[idx] = a[idx] + b[idx];
    }
}
```

---

## Level 9: 종합 프로젝트

**목표**: 배운 내용을 종합하여 실제 프로젝트 완성
**예상 시간**: 8시간
**선수과목**: Level 5, Level 7
**참조 자료**: `aiStudy/introduction/번호판인식_*.md`

### 프로젝트: 번호판 인식 시스템

| 레슨 | 제목 | 내용 | 시간 |
|------|------|------|------|
| 9-1 | 프로젝트 개요 | 요구사항 분석, 시스템 설계 | 40분 |
| 9-2 | 데이터 수집/준비 | 이미지 수집, 라벨링, 전처리 | 60분 |
| 9-3 | 번호판 검출 모델 | Object Detection (YOLO/SSD) | 90분 |
| 9-4 | 문자 인식 모델 | CNN 기반 OCR | 90분 |
| 9-5 | 모델 통합 | Detection + Recognition 파이프라인 | 60분 |
| 9-6 | 성능 최적화 | 추론 속도 개선, 모델 경량화 | 60분 |
| 9-7 | 배포 | Flask/FastAPI 웹 서비스 | 60분 |
| 9-8 | 프로젝트 마무리 | 문서화, 발표 준비 | 40분 |

**최종 결과물**:
- 번호판 인식 웹 서비스
- 소스 코드 + 문서
- 데모 영상

```
시스템 구조:
┌──────────────────────────────────────────────────────────┐
│                    입력 이미지                           │
└──────────────────────┬───────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────┐
│            번호판 검출 (Object Detection)                │
│                    YOLO / SSD                            │
└──────────────────────┬───────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────┐
│              번호판 영역 추출 및 전처리                  │
│          크기 조정, 기울기 보정, 이진화                  │
└──────────────────────┬───────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────┐
│              문자 분할 및 인식 (OCR)                     │
│                    CNN 분류기                            │
└──────────────────────┬───────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────┐
│              결과 출력: "12가 3456"                      │
└──────────────────────────────────────────────────────────┘
```

---

## 학습 경로 요약

```
                        ┌─────────────────────────────────┐
                        │   총 학습 시간: 약 50시간        │
                        │   총 레슨 수: 58개               │
                        │   총 퀴즈: 9개 (약 80문제)       │
                        │   실습 프로젝트: 10개            │
                        └─────────────────────────────────┘

추천 학습 순서:

입문자 코스 (30시간):
  Level 0 → Level 1 → Level 2 → Level 3 → Level 4 → Level 5

전체 코스 (50시간):
  Level 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → (8) → 9
                                    ↑
                                  선택

빠른 실습 코스 (20시간):
  Level 0 → Level 1 → Level 4 → Level 5 → Level 9(간소화)
```

---

## 레벨별 학습 목표 체크리스트

### Level 0 완료 시
- [ ] Python 기본 문법 작성 가능
- [ ] NumPy 배열 연산 수행 가능
- [ ] Matplotlib으로 그래프 그리기 가능

### Level 1 완료 시
- [ ] 퍼셉트론의 구조와 동작 원리 설명 가능
- [ ] 단층 퍼셉트론의 한계(XOR) 이해
- [ ] 간단한 퍼셉트론 코드 구현 가능

### Level 2 완료 시
- [ ] 미분의 개념과 체인룰 이해
- [ ] 그래디언트 계산 가능
- [ ] 기본 확률/통계 개념 적용 가능

### Level 3 완료 시
- [ ] 손실 함수와 경사하강법 설명 가능
- [ ] 역전파 알고리즘 이해 및 구현 가능
- [ ] 과적합 방지 기법 적용 가능

### Level 4 완료 시
- [ ] PyTorch 텐서 연산 능숙
- [ ] nn.Module로 신경망 정의 가능
- [ ] 학습 루프 작성 가능

### Level 5 완료 시
- [ ] CNN 구조와 합성곱 연산 이해
- [ ] 이미지 분류 모델 구현 가능
- [ ] 전이 학습 적용 가능

### Level 6 완료 시
- [ ] RNN/LSTM 구조 설명 가능
- [ ] 시퀀스 데이터 처리 가능
- [ ] 텍스트 분류 모델 구현 가능

### Level 7 완료 시
- [ ] Self-Attention 메커니즘 이해
- [ ] Transformer 구조 설명 가능
- [ ] GPT/BERT 작동 원리 이해

### Level 8 완료 시
- [ ] GPU 병렬 처리 원리 이해
- [ ] 간단한 CUDA 코드 작성 가능
- [ ] PyTorch GPU 가속 활용 가능

### Level 9 완료 시
- [ ] 실제 AI 프로젝트 완성 경험
- [ ] Detection + Recognition 파이프라인 구축
- [ ] 모델 배포 경험

---

## 추가 자료 및 참고

### 각 레벨별 추천 도서

| 레벨 | 추천 도서 |
|------|----------|
| 0 | 점프 투 파이썬 |
| 1-3 | 밑바닥부터 시작하는 딥러닝 |
| 4-5 | PyTorch로 배우는 자연어 처리 |
| 6-7 | Attention Is All You Need (논문) |
| 8 | CUDA by Example |

### 온라인 자료

- [3Blue1Brown - Neural Networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
- [PyTorch 공식 튜토리얼](https://pytorch.org/tutorials/)
- [fast.ai](https://course.fast.ai/)

---

*작성일: 2026-03-01*
*버전: 1.0*
