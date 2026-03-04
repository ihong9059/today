// Level 4 콘텐츠 - PyTorch 실전
// 이 파일은 curriculum.ts에 import되어 사용됩니다.

export const LEVEL_4_LESSON_1 = `
# MNIST 손글씨 분류

## 🎯 학습 목표
이 레슨을 완료하면:
- MNIST 데이터셋의 구조를 이해합니다
- 완전한 딥러닝 파이프라인을 PyTorch로 구현합니다
- 98% 이상의 정확도를 달성합니다
- 학습 과정을 시각화하고 분석합니다

---

## 💡 MNIST란?

> "딥러닝의 Hello World!"

MNIST(Modified National Institute of Standards and Technology)는 손글씨 숫자 이미지 데이터셋입니다.

**데이터셋 구성:**
- 📊 총 70,000개 이미지
  - 훈련: 60,000개
  - 테스트: 10,000개
- 📐 이미지 크기: 28 × 28 픽셀
- 🎨 색상: 흑백 (1채널)
- 🔢 클래스: 0~9 (10개 숫자)

각 픽셀은 0에서 255 사이의 밝기 값을 가집니다.

---

## 📦 Step 1: 환경 설정 및 데이터 로드

### 필요한 라이브러리 임포트

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import matplotlib.pyplot as plt

# GPU 사용 가능 여부 확인
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f'Using device: {device}')
\`\`\`

### 데이터 전처리 및 로드

\`\`\`python
# 데이터 변환 정의
transform = transforms.Compose([
    transforms.ToTensor(),           # PIL -> Tensor (0~1 정규화)
    transforms.Normalize((0.1307,), (0.3081,))  # MNIST 평균/표준편차
])

# 데이터셋 다운로드
train_dataset = datasets.MNIST(
    root='./data',
    train=True,
    download=True,
    transform=transform
)

test_dataset = datasets.MNIST(
    root='./data',
    train=False,
    download=True,
    transform=transform
)

# DataLoader 생성
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)
\`\`\`

---

## 🧠 Step 2: 모델 설계

### MLP 구조

우리는 간단한 다층 퍼셉트론(MLP)을 사용합니다:

| 레이어 | 입력 | 출력 | 활성화 함수 |
|--------|------|------|-------------|
| 입력층 | 784 (28×28) | 512 | ReLU |
| 은닉층1 | 512 | 256 | ReLU |
| 출력층 | 256 | 10 | - |

### PyTorch 코드

\`\`\`python
class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 512)
        self.fc2 = nn.Linear(512, 256)
        self.fc3 = nn.Linear(256, 10)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = x.view(-1, 784)  # 이미지를 1차원으로 펼침
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = torch.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

model = MNISTClassifier().to(device)
\`\`\`

---

## ⚙️ Step 3: 학습 설정

\`\`\`python
# 손실 함수: 다중 클래스 분류
criterion = nn.CrossEntropyLoss()

# 옵티마이저: Adam
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 하이퍼파라미터
batch_size = 64
epochs = 10
\`\`\`

**선택 이유:**
- **CrossEntropyLoss**: 다중 클래스 분류에 적합 (내부적으로 Softmax 포함)
- **Adam**: 학습률 자동 조절, 빠른 수렴
- **lr=0.001**: Adam의 기본 권장값

---

## 🔄 Step 4: 학습 루프

\`\`\`python
for epoch in range(epochs):
    model.train()
    total_loss = 0

    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)

        # 1. 그래디언트 초기화
        optimizer.zero_grad()

        # 2. 순전파
        output = model(data)

        # 3. 손실 계산
        loss = criterion(output, target)

        # 4. 역전파
        loss.backward()

        # 5. 가중치 업데이트
        optimizer.step()

        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    print(f'Epoch {epoch+1}/{epochs}, Loss: {avg_loss:.4f}')
\`\`\`

---

## 📊 Step 5: 모델 평가

\`\`\`python
model.eval()
correct = 0
total = 0

with torch.no_grad():
    for data, target in test_loader:
        data, target = data.to(device), target.to(device)
        output = model(data)
        _, predicted = torch.max(output.data, 1)
        total += target.size(0)
        correct += (predicted == target).sum().item()

accuracy = 100 * correct / total
print(f'Test Accuracy: {accuracy:.2f}%')
# 출력: Test Accuracy: 98.XX%
\`\`\`

---

## 📈 결과 분석

학습 진행에 따른 변화:

| Epoch | Loss | Accuracy |
|-------|------|----------|
| 1 | 0.35 | 90% |
| 5 | 0.08 | 97% |
| 10 | 0.04 | 98%+ |

---

## 🎯 핵심 정리

오늘 배운 딥러닝 파이프라인:

1. **데이터 로드** - torchvision.datasets
2. **모델 설계** - nn.Module 상속
3. **학습 설정** - 손실 함수, 옵티마이저
4. **학습 루프** - 순전파 → 손실 → 역전파 → 업데이트
5. **평가** - 테스트 데이터로 정확도 측정

> 이 기본 구조는 이미지 분류, 텍스트 분류 등 다양한 문제에 동일하게 적용됩니다!

다음 레슨에서는 CNN을 사용해 더 복잡한 이미지를 분류하는 방법을 배워봅니다.
`;

export const LEVEL_4_LESSON_2 = `
# 이미지 분류 CNN

## 🎯 학습 목표
이 레슨을 완료하면:
- CNN(합성곱 신경망)의 구조를 이해합니다
- Conv2d, MaxPool2d 레이어를 활용합니다
- CIFAR-10 데이터셋으로 이미지 분류기를 만듭니다
- MLP보다 CNN이 이미지에 효과적인 이유를 설명할 수 있습니다

---

## 💡 왜 CNN인가?

### MLP의 한계

**28×28 이미지 → 784개 입력**

MLP는 이미지를 1차원으로 펼치기 때문에:
- 공간적 관계(위치 정보)를 잃어버림
- 파라미터 수가 폭발적으로 증가
- 평행이동에 취약

### CNN의 장점

**지역적 패턴 인식 + 파라미터 공유**

- 🔍 **지역 연결**: 작은 영역만 보고 특징 추출
- 🔄 **가중치 공유**: 같은 필터를 전체 이미지에 적용
- 📉 **파라미터 감소**: 효율적인 학습 가능

---

## 🔧 CNN 핵심 레이어

### 1. Conv2d (합성곱 레이어)

\`\`\`python
nn.Conv2d(
    in_channels=3,    # 입력 채널 (RGB=3)
    out_channels=32,  # 출력 채널 (필터 수)
    kernel_size=3,    # 필터 크기 (3×3)
    padding=1         # 패딩 (출력 크기 유지)
)
\`\`\`

**동작 원리:**
- 3×3 필터가 이미지를 훑으며 특징 추출
- 32개 필터 → 32개 특징 맵 생성

### 2. MaxPool2d (풀링 레이어)

\`\`\`python
nn.MaxPool2d(kernel_size=2, stride=2)
\`\`\`

**동작 원리:**
- 2×2 영역에서 최댓값만 선택
- 크기를 절반으로 줄임 (다운샘플링)
- 위치 불변성 확보

---

## 🏗️ CNN 모델 구현

\`\`\`python
class ImageClassifier(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()

        # 특징 추출부 (Convolutional Layers)
        self.features = nn.Sequential(
            # Block 1: 3 -> 32 채널
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),  # 32x32 -> 16x16

            # Block 2: 32 -> 64 채널
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),  # 16x16 -> 8x8

            # Block 3: 64 -> 128 채널
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),  # 8x8 -> 4x4
        )

        # 분류부 (Fully Connected Layers)
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x
\`\`\`

---

## 📦 CIFAR-10 데이터셋

\`\`\`python
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

train_dataset = datasets.CIFAR10(
    root='./data', train=True, download=True, transform=transform
)
test_dataset = datasets.CIFAR10(
    root='./data', train=False, download=True, transform=transform
)
\`\`\`

**CIFAR-10 구성:**
- 📊 총 60,000개 이미지 (훈련 50,000 / 테스트 10,000)
- 📐 크기: 32×32 픽셀
- 🎨 컬러 (RGB 3채널)
- 🏷️ 10개 클래스: 비행기, 자동차, 새, 고양이, 사슴, 개, 개구리, 말, 배, 트럭

---

## 📊 MLP vs CNN 비교

| 항목 | MLP | CNN |
|------|-----|-----|
| MNIST 정확도 | 98% | 99%+ |
| CIFAR-10 정확도 | ~55% | ~75% |
| 파라미터 수 | 많음 | 적음 |
| 이미지 특성 활용 | ❌ | ✅ |

> CNN은 이미지의 공간적 특성을 활용하기 때문에 복잡한 이미지에서 훨씬 뛰어난 성능을 보입니다!

---

## 🎯 핵심 정리

1. **Conv2d**: 지역적 패턴을 추출하는 합성곱 연산
2. **MaxPool2d**: 크기를 줄이고 위치 불변성 확보
3. **BatchNorm**: 학습 안정화
4. **특징 추출 → 분류**: CNN의 기본 구조

다음 레슨에서는 텍스트 분류를 배워봅니다.
`;

export const LEVEL_4_LESSON_3 = `
# 텍스트 분류

## 🎯 학습 목표
이 레슨을 완료하면:
- 텍스트 데이터의 전처리 과정을 이해합니다
- 토큰화, 임베딩의 개념을 설명할 수 있습니다
- 감성 분석 모델을 구현합니다
- RNN/LSTM의 기본 구조를 이해합니다

---

## 💡 텍스트를 어떻게 숫자로?

### 텍스트 처리 파이프라인

\`\`\`
"이 영화 정말 재미있어요!"
        ↓
   [토큰화]
        ↓
["이", "영화", "정말", "재미있어요", "!"]
        ↓
   [단어→숫자]
        ↓
[42, 156, 89, 2341, 5]
        ↓
   [임베딩]
        ↓
[[0.2, 0.5, ...], [0.1, 0.8, ...], ...]
\`\`\`

---

## 🔧 핵심 개념

### 1. 토큰화 (Tokenization)

텍스트를 작은 단위(토큰)로 분리합니다.

\`\`\`python
from torchtext.data.utils import get_tokenizer

tokenizer = get_tokenizer('basic_english')
tokens = tokenizer("This movie is great!")
# ['this', 'movie', 'is', 'great', '!']
\`\`\`

### 2. 어휘 사전 (Vocabulary)

각 토큰에 고유 번호를 부여합니다.

\`\`\`python
vocab = {'<pad>': 0, '<unk>': 1, 'this': 2, 'movie': 3, ...}
\`\`\`

### 3. 임베딩 (Embedding)

숫자 인덱스를 밀집 벡터로 변환합니다.

\`\`\`python
embedding = nn.Embedding(
    num_embeddings=10000,  # 어휘 크기
    embedding_dim=128      # 벡터 차원
)
\`\`\`

---

## 🏗️ 감성 분석 모델

\`\`\`python
class SentimentClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_classes):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, num_classes)

    def forward(self, x):
        # x: [batch, seq_len]
        embedded = self.embedding(x)  # [batch, seq_len, embed_dim]
        _, (hidden, _) = self.lstm(embedded)  # hidden: [1, batch, hidden_dim]
        output = self.fc(hidden.squeeze(0))  # [batch, num_classes]
        return output

model = SentimentClassifier(
    vocab_size=10000,
    embed_dim=128,
    hidden_dim=256,
    num_classes=2  # 긍정/부정
)
\`\`\`

---

## 📊 LSTM의 동작

LSTM(Long Short-Term Memory)은 순서가 있는 데이터를 처리합니다.

\`\`\`
입력 시퀀스:  [이]  →  [영화]  →  [정말]  →  [재미있어요]
                ↓         ↓          ↓           ↓
LSTM 셀:     h0 → h1  →  h1 → h2  →  h2 → h3  →  h3 → h4
                                                    ↓
최종 출력:                                    긍정 (0.95)
\`\`\`

각 단계에서 이전 정보를 기억하며 문맥을 파악합니다.

---

## 💻 학습 코드

\`\`\`python
# 데이터 준비
train_data = [
    ("이 영화 정말 재미있어요", 1),  # 긍정
    ("별로 좋지 않았어요", 0),        # 부정
    ...
]

# 학습 루프
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for text, label in train_loader:
        optimizer.zero_grad()
        output = model(text)
        loss = criterion(output, label)
        loss.backward()
        optimizer.step()
\`\`\`

---

## 🎯 핵심 정리

1. **토큰화**: 텍스트를 단어/서브워드로 분리
2. **임베딩**: 단어를 밀집 벡터로 변환
3. **LSTM**: 순서 정보를 활용한 문맥 파악
4. **분류 레이어**: 최종 감성 예측

다음 레슨에서는 nn.Module을 더 깊이 다뤄봅니다.
`;

export const LEVEL_4_LESSON_4 = `
# nn.Module 기초

## 🎯 학습 목표
이 레슨을 완료하면:
- nn.Module의 구조와 역할을 이해합니다
- 커스텀 레이어와 모델을 설계할 수 있습니다
- forward() 메서드의 동작을 설명할 수 있습니다
- 파라미터를 확인하고 관리할 수 있습니다

---

## 💡 nn.Module이란?

> PyTorch에서 모든 신경망의 기본 클래스

nn.Module은 레이어와 모델을 정의하는 기본 단위입니다.

**주요 기능:**
- 학습 가능한 파라미터(가중치) 관리
- GPU/CPU 이동 지원
- 저장/로드 기능
- 학습/평가 모드 전환

---

## 🔧 기본 구조

\`\`\`python
import torch.nn as nn

class MyModel(nn.Module):
    def __init__(self):
        super().__init__()  # 부모 클래스 초기화 (필수!)

        # 레이어 정의
        self.layer1 = nn.Linear(784, 256)
        self.layer2 = nn.Linear(256, 10)

    def forward(self, x):
        # 데이터 흐름 정의
        x = torch.relu(self.layer1(x))
        x = self.layer2(x)
        return x
\`\`\`

**핵심 포인트:**
1. \`super().__init__()\` - 반드시 호출!
2. \`__init__\`에서 레이어 정의
3. \`forward()\`에서 연산 순서 정의

---

## 📦 자주 사용하는 레이어

### 1. nn.Linear (완전 연결층)

\`\`\`python
nn.Linear(in_features=784, out_features=256)
# 784개 입력 → 256개 출력
\`\`\`

### 2. nn.Conv2d (합성곱층)

\`\`\`python
nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3)
# 3채널 입력 → 64채널 출력, 3×3 필터
\`\`\`

### 3. nn.Sequential (레이어 묶음)

\`\`\`python
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Linear(256, 10)
)
\`\`\`

---

## 🔍 파라미터 확인

\`\`\`python
model = MyModel()

# 모든 파라미터 이름과 크기 확인
for name, param in model.named_parameters():
    print(f'{name}: {param.shape}')

# 출력:
# layer1.weight: torch.Size([256, 784])
# layer1.bias: torch.Size([256])
# layer2.weight: torch.Size([10, 256])
# layer2.bias: torch.Size([10])

# 총 파라미터 수
total = sum(p.numel() for p in model.parameters())
print(f'Total parameters: {total:,}')
\`\`\`

---

## 🔄 모드 전환

\`\`\`python
# 학습 모드 (Dropout, BatchNorm 활성화)
model.train()

# 평가 모드 (Dropout, BatchNorm 비활성화)
model.eval()

# 평가 시에는 그래디언트 계산 불필요
with torch.no_grad():
    output = model(test_data)
\`\`\`

---

## 💻 실전 예제: 블록 기반 설계

\`\`\`python
class ConvBlock(nn.Module):
    """재사용 가능한 합성곱 블록"""
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.conv = nn.Conv2d(in_ch, out_ch, 3, padding=1)
        self.bn = nn.BatchNorm2d(out_ch)
        self.relu = nn.ReLU()

    def forward(self, x):
        return self.relu(self.bn(self.conv(x)))


class MyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.block1 = ConvBlock(3, 32)
        self.block2 = ConvBlock(32, 64)
        self.pool = nn.MaxPool2d(2)
        self.fc = nn.Linear(64 * 8 * 8, 10)

    def forward(self, x):
        x = self.pool(self.block1(x))
        x = self.pool(self.block2(x))
        x = x.view(x.size(0), -1)
        return self.fc(x)
\`\`\`

---

## 🎯 핵심 정리

| 메서드/속성 | 설명 |
|-------------|------|
| \`__init__\` | 레이어 정의 |
| \`forward\` | 연산 흐름 정의 |
| \`parameters()\` | 학습 파라미터 반환 |
| \`train()\` | 학습 모드 |
| \`eval()\` | 평가 모드 |
| \`to(device)\` | GPU/CPU 이동 |

다음 레슨에서는 데이터 로딩을 다뤄봅니다.
`;

export const LEVEL_4_LESSON_5 = `
# 데이터 로딩

## 🎯 학습 목표
이 레슨을 완료하면:
- Dataset과 DataLoader의 역할을 이해합니다
- 커스텀 Dataset을 구현할 수 있습니다
- transforms를 활용한 데이터 증강을 적용합니다
- 효율적인 배치 처리를 구현합니다

---

## 💡 데이터 로딩 파이프라인

\`\`\`
원본 데이터 (이미지/텍스트/CSV)
        ↓
    [Dataset]  ← 데이터 접근 방법 정의
        ↓
   [DataLoader] ← 배치 처리, 셔플, 병렬 로딩
        ↓
    모델 학습
\`\`\`

---

## 📦 Dataset 클래스

### 기본 구조

\`\`\`python
from torch.utils.data import Dataset

class MyDataset(Dataset):
    def __init__(self, data, labels, transform=None):
        self.data = data
        self.labels = labels
        self.transform = transform

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        x = self.data[idx]
        y = self.labels[idx]

        if self.transform:
            x = self.transform(x)

        return x, y
\`\`\`

**필수 메서드:**
- \`__len__\`: 데이터셋 크기 반환
- \`__getitem__\`: 인덱스로 데이터 접근

---

## 🔄 DataLoader

\`\`\`python
from torch.utils.data import DataLoader

train_loader = DataLoader(
    dataset=train_dataset,
    batch_size=64,          # 배치 크기
    shuffle=True,           # 에폭마다 섞기
    num_workers=4,          # 병렬 로딩 프로세스 수
    pin_memory=True         # GPU 전송 최적화
)

# 사용 예시
for batch_idx, (data, target) in enumerate(train_loader):
    # data: [64, 1, 28, 28]
    # target: [64]
    ...
\`\`\`

---

## 🎨 transforms (데이터 변환)

### 기본 변환

\`\`\`python
from torchvision import transforms

transform = transforms.Compose([
    transforms.ToTensor(),                    # PIL → Tensor
    transforms.Normalize((0.5,), (0.5,))     # 정규화
])
\`\`\`

### 데이터 증강 (Augmentation)

\`\`\`python
train_transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),        # 좌우 반전
    transforms.RandomRotation(10),            # 회전 (-10° ~ +10°)
    transforms.ColorJitter(brightness=0.2),   # 밝기 변화
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

test_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])
\`\`\`

> 💡 테스트 데이터에는 증강을 적용하지 않습니다!

---

## 💻 실전 예제: 이미지 폴더 Dataset

\`\`\`python
# 폴더 구조:
# data/
#   train/
#     cat/
#       cat001.jpg
#       cat002.jpg
#     dog/
#       dog001.jpg
#       dog002.jpg

from torchvision.datasets import ImageFolder

train_dataset = ImageFolder(
    root='data/train',
    transform=train_transform
)

print(train_dataset.classes)  # ['cat', 'dog']
print(train_dataset.class_to_idx)  # {'cat': 0, 'dog': 1}
\`\`\`

---

## 📊 CSV 데이터 로딩

\`\`\`python
import pandas as pd

class CSVDataset(Dataset):
    def __init__(self, csv_file):
        self.df = pd.read_csv(csv_file)

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        row = self.df.iloc[idx]
        features = torch.tensor(row[:-1].values, dtype=torch.float32)
        label = torch.tensor(row[-1], dtype=torch.long)
        return features, label
\`\`\`

---

## 🎯 핵심 정리

| 구성 요소 | 역할 |
|-----------|------|
| Dataset | 데이터 접근 방법 정의 |
| DataLoader | 배치 처리, 셔플, 병렬 로딩 |
| transforms | 데이터 변환 및 증강 |
| num_workers | 병렬 로딩으로 속도 향상 |

다음 레슨에서는 학습 루프를 다뤄봅니다.
`;

export const LEVEL_4_LESSON_6 = `
# 학습 루프

## 🎯 학습 목표
이 레슨을 완료하면:
- 학습 루프의 5단계를 설명할 수 있습니다
- 검증 루프를 구현할 수 있습니다
- 학습 과정을 모니터링하고 시각화합니다
- 조기 종료(Early Stopping)를 구현합니다

---

## 💡 학습 루프 5단계

\`\`\`
┌─────────────────────────────────────┐
│  1. optimizer.zero_grad()           │  그래디언트 초기화
│              ↓                      │
│  2. output = model(data)            │  순전파
│              ↓                      │
│  3. loss = criterion(output, target)│  손실 계산
│              ↓                      │
│  4. loss.backward()                 │  역전파
│              ↓                      │
│  5. optimizer.step()                │  가중치 업데이트
└─────────────────────────────────────┘
\`\`\`

---

## 🔧 기본 학습 루프

\`\`\`python
def train_epoch(model, loader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    correct = 0
    total = 0

    for data, target in loader:
        data, target = data.to(device), target.to(device)

        # 5단계
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()

        # 통계 기록
        total_loss += loss.item()
        _, predicted = output.max(1)
        total += target.size(0)
        correct += predicted.eq(target).sum().item()

    return total_loss / len(loader), 100. * correct / total
\`\`\`

---

## 📊 검증 루프

\`\`\`python
def validate(model, loader, criterion, device):
    model.eval()
    total_loss = 0
    correct = 0
    total = 0

    with torch.no_grad():  # 그래디언트 계산 비활성화
        for data, target in loader:
            data, target = data.to(device), target.to(device)

            output = model(data)
            loss = criterion(output, target)

            total_loss += loss.item()
            _, predicted = output.max(1)
            total += target.size(0)
            correct += predicted.eq(target).sum().item()

    return total_loss / len(loader), 100. * correct / total
\`\`\`

**차이점:**
- \`model.eval()\`: Dropout, BatchNorm 비활성화
- \`torch.no_grad()\`: 메모리 절약, 속도 향상

---

## 🔄 전체 학습 과정

\`\`\`python
epochs = 50
best_val_loss = float('inf')
patience = 5
patience_counter = 0

history = {'train_loss': [], 'val_loss': [], 'train_acc': [], 'val_acc': []}

for epoch in range(epochs):
    # 학습
    train_loss, train_acc = train_epoch(model, train_loader, criterion, optimizer, device)

    # 검증
    val_loss, val_acc = validate(model, val_loader, criterion, device)

    # 기록
    history['train_loss'].append(train_loss)
    history['val_loss'].append(val_loss)
    history['train_acc'].append(train_acc)
    history['val_acc'].append(val_acc)

    print(f'Epoch {epoch+1}/{epochs}')
    print(f'  Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}%')
    print(f'  Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%')

    # 조기 종료 체크
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), 'best_model.pt')
        patience_counter = 0
    else:
        patience_counter += 1
        if patience_counter >= patience:
            print('Early stopping!')
            break
\`\`\`

---

## 📈 학습 과정 시각화

\`\`\`python
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

# 손실 그래프
ax1.plot(history['train_loss'], label='Train')
ax1.plot(history['val_loss'], label='Validation')
ax1.set_xlabel('Epoch')
ax1.set_ylabel('Loss')
ax1.legend()
ax1.set_title('Loss Curve')

# 정확도 그래프
ax2.plot(history['train_acc'], label='Train')
ax2.plot(history['val_acc'], label='Validation')
ax2.set_xlabel('Epoch')
ax2.set_ylabel('Accuracy (%)')
ax2.legend()
ax2.set_title('Accuracy Curve')

plt.tight_layout()
plt.show()
\`\`\`

---

## ⚠️ 과적합 감지

| 상태 | Train Loss | Val Loss | 조치 |
|------|------------|----------|------|
| 정상 | ↓ | ↓ | 계속 학습 |
| 과적합 | ↓ | ↑ | 조기 종료/정규화 |
| 과소적합 | 높음 | 높음 | 모델 용량 증가 |

---

## 🎯 핵심 정리

1. **학습 루프 5단계**: zero_grad → forward → loss → backward → step
2. **검증 루프**: eval() + no_grad()로 평가
3. **조기 종료**: 과적합 방지
4. **시각화**: 학습 상태 모니터링

다음 레슨에서는 모델 저장과 로드를 다뤄봅니다.
`;

export const LEVEL_4_LESSON_7 = `
# 모델 저장과 로드

## 🎯 학습 목표
이 레슨을 완료하면:
- state_dict 방식으로 모델을 저장/로드합니다
- 전체 모델 저장 방식을 이해합니다
- 체크포인트로 학습을 재개할 수 있습니다
- GPU/CPU 간 모델을 이동합니다

---

## 💡 저장 방식 비교

| 방식 | 저장 내용 | 장점 | 단점 |
|------|-----------|------|------|
| state_dict | 가중치만 | 호환성 좋음, 권장 | 모델 클래스 필요 |
| 전체 모델 | 구조+가중치 | 간편함 | Pickle 의존 |
| 체크포인트 | 전체 학습 상태 | 학습 재개 가능 | 파일 크기 큼 |

---

## 📦 1. state_dict 저장 (권장)

### 저장

\`\`\`python
# 모델 가중치만 저장
torch.save(model.state_dict(), 'model_weights.pt')
\`\`\`

### 로드

\`\`\`python
# 모델 구조 먼저 생성
model = MyModel()

# 가중치 로드
model.load_state_dict(torch.load('model_weights.pt'))
model.eval()  # 추론 모드로 전환
\`\`\`

> 💡 **권장 이유**: PyTorch 버전, 클래스 위치 변경에도 호환됨

---

## 📦 2. 전체 모델 저장

### 저장

\`\`\`python
# 모델 전체 저장 (구조 + 가중치)
torch.save(model, 'model_full.pt')
\`\`\`

### 로드

\`\`\`python
# 바로 사용 가능
model = torch.load('model_full.pt')
model.eval()
\`\`\`

> ⚠️ **주의**: Pickle 직렬화 사용으로 클래스 정의 위치가 변경되면 로드 실패 가능

---

## 📦 3. 체크포인트 저장

학습 중간 상태를 저장하여 나중에 이어서 학습할 수 있습니다.

### 저장

\`\`\`python
checkpoint = {
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
    'best_val_loss': best_val_loss
}
torch.save(checkpoint, f'checkpoint_epoch_{epoch}.pt')
\`\`\`

### 로드 및 학습 재개

\`\`\`python
checkpoint = torch.load('checkpoint_epoch_10.pt')

model = MyModel()
model.load_state_dict(checkpoint['model_state_dict'])

optimizer = optim.Adam(model.parameters())
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])

start_epoch = checkpoint['epoch'] + 1
best_val_loss = checkpoint['best_val_loss']

# 이어서 학습
for epoch in range(start_epoch, total_epochs):
    ...
\`\`\`

---

## 🔄 GPU ↔ CPU 이동

### GPU에서 저장 → CPU에서 로드

\`\`\`python
# GPU에서 학습 후 저장
model = model.cuda()
# ... 학습 ...
torch.save(model.state_dict(), 'model.pt')

# CPU에서 로드
model = MyModel()
model.load_state_dict(
    torch.load('model.pt', map_location=torch.device('cpu'))
)
\`\`\`

### CPU에서 저장 → GPU에서 로드

\`\`\`python
# CPU에서 저장
torch.save(model.state_dict(), 'model.pt')

# GPU에서 로드
model = MyModel()
model.load_state_dict(torch.load('model.pt'))
model = model.cuda()  # GPU로 이동
\`\`\`

---

## 💡 실무 팁

### 최고 성능 모델 저장

\`\`\`python
best_val_loss = float('inf')

for epoch in range(epochs):
    # ... 학습 ...
    val_loss = validate(model, val_loader)

    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), 'best_model.pt')
        print(f'Best model saved at epoch {epoch}')
\`\`\`

### 주기적 체크포인트

\`\`\`python
# 5 에폭마다 저장
if (epoch + 1) % 5 == 0:
    torch.save({
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
    }, f'checkpoint_{epoch+1}.pt')
\`\`\`

---

## 🎯 핵심 정리

| 상황 | 권장 방식 |
|------|-----------|
| 배포용 | state_dict |
| 빠른 테스트 | 전체 모델 |
| 학습 재개 | 체크포인트 |
| 디바이스 이동 | map_location |

다음 레슨에서는 전이학습을 다뤄봅니다.
`;

// 모든 레슨 내용을 배열로 export
export const LEVEL_4_CONTENTS = [
  LEVEL_4_LESSON_1,
  LEVEL_4_LESSON_2,
  LEVEL_4_LESSON_3,
  LEVEL_4_LESSON_4,
  LEVEL_4_LESSON_5,
  LEVEL_4_LESSON_6,
  LEVEL_4_LESSON_7,
];
