# train.py 상세 설명서

MNIST 손글씨 숫자 인식 모델을 학습하는 스크립트입니다.
초보자도 이해할 수 있도록 각 단계를 상세히 설명합니다.

---

## 전체 흐름

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  1. 설정    │ ──▶ │ 2. 데이터   │ ──▶ │  3. 모델    │
│  (Setup)    │     │   로드      │     │   정의      │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
       ┌───────────────────────────────────────┘
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  4. 학습    │ ──▶ │ 5. 평가     │ ──▶ │  6. 저장    │
│  (Train)    │     │   시각화    │     │   (Save)    │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 1. 라이브러리 불러오기

```python
import torch                    # PyTorch 핵심 라이브러리
import torch.nn as nn           # 신경망 모듈 (레이어, 손실함수)
import torch.nn.functional as F # 활성화 함수 등
import torch.optim as optim     # 옵티마이저 (Adam, SGD 등)
from torchvision import datasets, transforms  # 데이터셋, 전처리
from torch.utils.data import DataLoader       # 배치 로더
import matplotlib.pyplot as plt  # 그래프 그리기
import numpy as np              # 수치 연산
```

### 각 라이브러리 역할

| 라이브러리 | 역할 | 비유 |
|-----------|------|------|
| `torch` | 텐서 연산, GPU 지원 | 계산기 |
| `torch.nn` | 신경망 레이어 정의 | 레고 블록 |
| `torch.optim` | 가중치 업데이트 | 선생님 (교정) |
| `torchvision` | 이미지 데이터셋 | 교과서 |
| `DataLoader` | 배치 단위 공급 | 급식 배식 |

---

## 2. 하이퍼파라미터 설정

```python
BATCH_SIZE = 64      # 한 번에 학습할 이미지 수
EPOCHS = 10          # 전체 데이터를 몇 번 반복할지
LEARNING_RATE = 0.001  # 학습률 (가중치 조정 폭)
```

### 하이퍼파라미터란?

**사람이 직접 정하는 설정값**입니다. 모델이 학습하는 것이 아닙니다.

```
비유: 요리 레시피

BATCH_SIZE = 한 번에 굽는 빵 개수 (64개씩)
EPOCHS = 전체 반죽을 몇 번 굽는지 (10번)
LEARNING_RATE = 오븐 온도 조절 (0.001 = 낮은 온도로 천천히)
```

### 값에 따른 영향

| 파라미터 | 작으면 | 크면 |
|---------|--------|------|
| BATCH_SIZE | 느림, 메모리 적음 | 빠름, 메모리 많이 필요 |
| EPOCHS | 학습 부족 | 과적합 위험 |
| LEARNING_RATE | 학습 느림 | 발산 위험 |

---

## 3. 디바이스 설정

```python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
```

### 의미

```
GPU 있으면 → 'cuda' 사용 (빠름)
GPU 없으면 → 'cpu' 사용 (느림)
```

### GPU vs CPU 속도 비교

| 환경 | MNIST 학습 시간 |
|------|----------------|
| CPU | 2~3분 |
| GPU (Tesla T4) | 30초 |

---

## 4. 데이터 전처리 (Transform)

```python
transform = transforms.Compose([
    transforms.ToTensor(),                    # [1] 이미지 → 텐서
    transforms.Normalize((0.1307,), (0.3081,)) # [2] 정규화
])
```

### [1] ToTensor()

```
원본 이미지          텐서
┌─────────┐         ┌─────────┐
│ 0~255   │   →     │ 0.0~1.0 │
│ (정수)  │         │ (소수)  │
└─────────┘         └─────────┘

예: 픽셀값 128 → 128/255 = 0.502
```

### [2] Normalize()

```
정규화 공식: (값 - 평균) / 표준편차

0.1307 = MNIST 전체 픽셀의 평균
0.3081 = MNIST 전체 픽셀의 표준편차

정규화 전: 0.0 ~ 1.0
정규화 후: -0.42 ~ 2.82 (대략)
```

### 왜 정규화하나요?

```
비유: 키와 몸무게를 함께 비교할 때

키: 150~190 cm
몸무게: 40~100 kg

→ 단위가 달라서 비교 어려움
→ 둘 다 평균 0, 표준편차 1로 변환하면 비교 가능

신경망도 마찬가지!
정규화하면 학습이 안정적이고 빨라집니다.
```

---

## 5. 데이터셋 로드

```python
train_dataset = datasets.MNIST(
    './data',           # 저장 경로
    train=True,         # 학습용 데이터 (60,000장)
    download=True,      # 없으면 다운로드
    transform=transform # 위에서 정의한 전처리 적용
)

test_dataset = datasets.MNIST(
    './data',
    train=False,        # 테스트용 데이터 (10,000장)
    download=True,
    transform=transform
)
```

### 데이터셋 구조

```
MNIST
├── 학습 데이터: 60,000장 (모델 학습용)
└── 테스트 데이터: 10,000장 (성능 평가용)

각 이미지
├── 크기: 28 x 28 픽셀
├── 채널: 1 (흑백)
└── 레이블: 0~9 (정답)
```

---

## 6. DataLoader 생성

```python
train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,  # 64장씩 묶음
    shuffle=True            # 순서 섞기
)

test_loader = DataLoader(
    test_dataset,
    batch_size=1000,        # 테스트는 큰 배치
    shuffle=False           # 순서 유지
)
```

### DataLoader가 하는 일

```
60,000장의 이미지

DataLoader (batch_size=64)
    ↓
[64장] [64장] [64장] ... [64장] [나머지]
  ↓      ↓      ↓          ↓
 배치1  배치2  배치3  ...  배치937  배치938

총 938개 배치 생성 (60000 ÷ 64 = 937.5)
```

### shuffle=True의 의미

```
섞지 않으면:
0, 0, 0, ..., 1, 1, 1, ..., 2, 2, 2, ...
→ 모델이 순서를 외워버림 (과적합)

섞으면:
3, 7, 1, 0, 9, 4, 2, ...
→ 다양한 패턴 학습 (일반화)
```

---

## 7. CNN 모델 정의

```python
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()

        # 합성곱 레이어
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)

        # 풀링 레이어
        self.pool = nn.MaxPool2d(2, 2)

        # 완전연결 레이어
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)

        # 드롭아웃
        self.dropout = nn.Dropout(0.25)
```

### 각 레이어 설명

#### Conv2d (합성곱 레이어)

```
nn.Conv2d(1, 32, kernel_size=3, padding=1)
          │  │        │           │
          │  │        │           └── 테두리에 0 추가 (크기 유지)
          │  │        └── 3x3 필터 사용
          │  └── 출력 채널 32개
          └── 입력 채널 1개 (흑백)
```

```
역할: 이미지에서 특징(엣지, 곡선) 추출

3x3 필터가 이미지를 스캔하며 특징 검출
┌───┬───┬───┐
│-1 │ 0 │ 1 │  ← 세로 엣지 검출 예시
│-2 │ 0 │ 2 │
│-1 │ 0 │ 1 │
└───┴───┴───┘
```

#### MaxPool2d (최대 풀링)

```
nn.MaxPool2d(2, 2)
             │  │
             │  └── stride (이동 간격)
             └── 2x2 영역

역할: 이미지 크기를 절반으로 줄임

┌───┬───┬───┬───┐         ┌───┬───┐
│ 1 │ 3 │ 5 │ 2 │         │ 4 │ 6 │
├───┼───┼───┼───┤   →     ├───┼───┤
│ 4 │ 2 │ 6 │ 1 │         │ 8 │ 5 │
├───┼───┼───┼───┤         └───┴───┘
│ 7 │ 8 │ 3 │ 4 │
├───┼───┼───┼───┤    4x4 → 2x2
│ 2 │ 1 │ 5 │ 3 │
└───┴───┴───┴───┘

각 2x2 영역에서 최댓값만 선택
```

#### Linear (완전연결 레이어)

```
nn.Linear(64 * 7 * 7, 128)
          │           │
          │           └── 출력 노드 128개
          └── 입력 노드 3136개 (64채널 × 7 × 7)

역할: 추출된 특징을 조합하여 분류

모든 노드가 서로 연결됨 (완전연결)
```

#### Dropout

```
nn.Dropout(0.25)
           │
           └── 25% 확률로 뉴런 비활성화

역할: 과적합 방지

학습 중 일부 뉴런을 랜덤하게 끔
→ 특정 뉴런에 의존하지 않게 됨
→ 일반화 능력 향상
```

### 데이터 흐름

```
입력: (1, 28, 28) - 흑백 28x28 이미지
        │
        ▼ Conv1 + ReLU
     (32, 28, 28)
        │
        ▼ MaxPool
     (32, 14, 14) - 크기 절반
        │
        ▼ Conv2 + ReLU
     (64, 14, 14)
        │
        ▼ MaxPool
     (64, 7, 7) - 크기 절반
        │
        ▼ Flatten (펼치기)
      [3136] - 64 × 7 × 7
        │
        ▼ FC1 + ReLU + Dropout
       [128]
        │
        ▼ FC2
       [10] - 각 숫자의 점수

출력: 0~9 각 숫자일 확률
```

---

## 8. 손실 함수와 옵티마이저

```python
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
```

### CrossEntropyLoss (교차 엔트로피 손실)

```
역할: 예측과 정답의 차이를 숫자로 계산

예측:  [0.1, 0.1, 0.05, 0.6, 0.05, 0.02, 0.02, 0.02, 0.02, 0.01]
정답:  [0,   0,   0,    1,   0,    0,    0,    0,    0,    0   ]
                        ↑
                    숫자 3이 정답

손실 = -log(0.6) ≈ 0.51

예측이 정답에 가까울수록 손실이 작아짐
```

### Adam 옵티마이저

```
역할: 손실을 줄이는 방향으로 가중치 조정

Adam의 장점:
- 학습률을 자동으로 조정
- 빠른 수렴
- 대부분의 상황에서 좋은 성능

model.parameters() = 모델의 모든 가중치
lr = 학습률 (한 번에 얼마나 조정할지)
```

---

## 9. 학습 루프 (핵심!)

```python
def train_epoch(model, device, train_loader, optimizer, criterion):
    model.train()  # 학습 모드 (Dropout 활성화)

    for data, target in train_loader:
        data, target = data.to(device), target.to(device)

        # [1] 그래디언트 초기화
        optimizer.zero_grad()

        # [2] 순전파 (Forward)
        output = model(data)

        # [3] 손실 계산
        loss = criterion(output, target)

        # [4] 역전파 (Backward)
        loss.backward()

        # [5] 가중치 업데이트
        optimizer.step()
```

### 5단계 상세 설명

#### [1] optimizer.zero_grad()

```
이전 배치의 그래디언트 초기화

왜? PyTorch는 그래디언트를 누적하기 때문
초기화하지 않으면 잘못된 방향으로 학습
```

#### [2] output = model(data)

```
순전파 (Forward Pass)

입력 데이터를 모델에 통과시켜 예측값 얻기

data (64, 1, 28, 28) → model → output (64, 10)
  64장의 이미지           각 이미지의 0~9 점수
```

#### [3] loss = criterion(output, target)

```
손실 계산

예측값과 정답을 비교하여 얼마나 틀렸는지 계산

output: 모델의 예측 [0.1, 0.2, 0.5, ...]
target: 정답 레이블 [3, 7, 1, ...]

loss: 0.52 (예시)
```

#### [4] loss.backward()

```
역전파 (Backward Pass)

손실을 줄이려면 각 가중치를 어떻게 조정해야 하는지 계산
(미분/그래디언트 계산)

출력 → FC2 → FC1 → Conv2 → Conv1 → 입력
  ←─────────── 그래디언트 전파 ───────────
```

#### [5] optimizer.step()

```
가중치 업데이트

계산된 그래디언트를 사용하여 가중치 조정

새 가중치 = 기존 가중치 - (학습률 × 그래디언트)

비유:
- 산에서 내려가기 (손실 = 높이)
- 그래디언트 = 경사 방향
- 학습률 = 보폭 크기
```

### 시각적 이해

```
              손실 (높이)
                 ▲
                /│\
               / │ \
              /  │  \
             /   │   \      ← 현재 위치 (손실 높음)
            /    │    \
           /     │     \
          /      │      \
         /       │       \
        ─────────┴────────▶ 가중치

        │←──────────────→│
              그래디언트 방향

학습 = 손실이 낮은 방향으로 이동
```

---

## 10. 평가 함수

```python
def evaluate(model, device, test_loader, criterion):
    model.eval()  # 평가 모드 (Dropout 비활성화)

    with torch.no_grad():  # 그래디언트 계산 안 함 (메모리 절약)
        for data, target in test_loader:
            output = model(data)
            pred = output.argmax(dim=1)  # 가장 높은 점수의 인덱스
            correct += pred.eq(target).sum().item()
```

### model.train() vs model.eval()

| 모드 | Dropout | BatchNorm | 용도 |
|------|---------|-----------|------|
| train() | 활성화 | 학습 통계 | 학습 시 |
| eval() | 비활성화 | 고정 통계 | 평가 시 |

### torch.no_grad()

```
평가 시에는 가중치를 업데이트하지 않음
→ 그래디언트 계산 불필요
→ 메모리 절약, 속도 향상
```

---

## 11. 전체 학습 과정

```python
for epoch in range(1, EPOCHS + 1):
    train_loss, train_acc = train_epoch(...)  # 학습
    test_loss, test_acc = evaluate(...)        # 평가

    # 기록
    history['train_loss'].append(train_loss)
    history['test_acc'].append(test_acc)
```

### 에포크(Epoch)란?

```
1 에포크 = 전체 데이터를 한 번 학습

60,000장 ÷ 64(배치) = 938 배치
938 배치 학습 = 1 에포크

10 에포크 = 938 × 10 = 9,380번 가중치 업데이트
```

### 학습 진행 예시

```
Epoch  1: Train Acc: 95.2%, Test Acc: 97.1%  ← 빠르게 학습
Epoch  2: Train Acc: 97.8%, Test Acc: 98.2%
Epoch  3: Train Acc: 98.5%, Test Acc: 98.5%
...
Epoch 10: Train Acc: 99.5%, Test Acc: 99.1%  ← 수렴
```

---

## 12. 모델 저장

```python
# 전체 저장 (학습 재개 가능)
torch.save({
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'history': history,
    'final_accuracy': history['test_acc'][-1]
}, 'baseline_cnn.pt')

# 가중치만 저장 (추론용)
torch.save(model.state_dict(), 'baseline_weights.pth')
```

### state_dict()란?

```
모델의 모든 가중치를 딕셔너리 형태로 반환

{
    'conv1.weight': tensor(...),
    'conv1.bias': tensor(...),
    'conv2.weight': tensor(...),
    ...
}
```

---

## 요약: 전체 학습 과정

```
1. 데이터 준비
   MNIST 60,000장 → 전처리 → DataLoader

2. 모델 생성
   CNN 모델 정의 → GPU로 이동

3. 학습 설정
   손실함수(CrossEntropy) + 옵티마이저(Adam)

4. 학습 루프 (10 에포크)
   ┌──────────────────────────────────────┐
   │  for 각 배치:                        │
   │    ① 그래디언트 초기화               │
   │    ② 순전파 (예측)                   │
   │    ③ 손실 계산                       │
   │    ④ 역전파 (그래디언트)             │
   │    ⑤ 가중치 업데이트                 │
   └──────────────────────────────────────┘

5. 평가
   테스트 데이터로 정확도 측정

6. 저장
   학습된 가중치 파일로 저장
```

---

## 자주 하는 실수

| 실수 | 해결 |
|------|------|
| GPU 메모리 부족 | 배치 크기 줄이기 |
| 학습이 안 됨 | 학습률 확인 (너무 크거나 작음) |
| 과적합 | Dropout 추가, 에포크 줄이기 |
| eval() 안 함 | 평가 전 model.eval() 호출 |
| zero_grad() 빠뜨림 | 매 배치마다 호출 필수 |
