// Level 4 콘텐츠 - PyTorch 실전
// 이 파일은 curriculum.ts에 import되어 사용됩니다.

export const LEVEL_4_LESSON_1 = `
# MNIST 손글씨 분류

> **🖥️ 로컬 실행 필수**
>
> 이 레슨의 모든 코드는 **PyTorch**를 사용하며, **브라우저에서 실행되지 않습니다**.
>
> **실행 방법:**
> 1. Python 설치: [python.org](https://www.python.org/downloads/)
> 2. 터미널에서 PyTorch 설치: \`pip install torch torchvision\`
> 3. 레슨 하단의 **"전체 통합 코드"**를 복사하여 \`mnist_train.py\`로 저장
> 4. 터미널에서 실행: \`python mnist_train.py\`
>
> 💡 각 코드 조각은 학습용으로, 개별 실행이 불가합니다. 전체 통합 코드를 사용하세요.

## 학습 목표
이 레슨을 완료하면:
- MNIST 데이터셋의 구조와 역사적 의미를 이해합니다
- 완전한 딥러닝 파이프라인을 PyTorch로 구현합니다
- 데이터 전처리부터 모델 평가까지 전 과정을 설명할 수 있습니다
- 98% 이상의 정확도를 달성하는 모델을 만듭니다

---

## MNIST란 무엇인가?

> **비유**: MNIST는 딥러닝의 "Hello, World!"입니다. 프로그래밍을 배울 때 첫 프로그램으로 "Hello, World!"를 출력하듯, 딥러닝을 배울 때 첫 프로젝트로 MNIST를 다룹니다.

MNIST(Modified National Institute of Standards and Technology)는 손으로 쓴 숫자(0~9) 이미지 데이터셋입니다. 1998년 Yann LeCun이 공개한 이후, 수십 년간 머신러닝 알고리즘의 벤치마크로 사용되어 왔습니다.

| 항목 | 내용 |
|------|------|
| 전체 이미지 수 | 70,000개 |
| 훈련 데이터 | 60,000개 |
| 테스트 데이터 | 10,000개 |
| 이미지 크기 | 28 x 28 픽셀 |
| 색상 | 흑백 (1채널) |
| 클래스 수 | 10개 (숫자 0~9) |
| 픽셀 값 범위 | 0(검정) ~ 255(흰색) |

### 왜 MNIST로 시작하는가?

1. **단순함**: 28x28 흑백 이미지라 복잡한 전처리가 필요 없습니다
2. **빠른 학습**: 데이터가 작아 CPU로도 수 분 내에 학습됩니다
3. **높은 성능**: 간단한 모델로도 98% 이상 정확도를 달성할 수 있습니다
4. **검증된 벤치마크**: 수십 년간 사용되어 참고 자료가 풍부합니다

---

## Step 1: 환경 설정 및 데이터 로드

### 라이브러리 임포트

딥러닝 프로젝트는 항상 필요한 도구를 불러오는 것부터 시작합니다. 각 라이브러리의 역할을 이해하는 것이 중요합니다.

\`\`\`python
# [코드 조각 1/7] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
import torch                          # PyTorch 핵심 라이브러리
import torch.nn as nn                 # 신경망 레이어 모음
import torch.optim as optim           # 최적화 알고리즘 (Adam, SGD 등)
from torch.utils.data import DataLoader  # 배치 단위 데이터 공급
from torchvision import datasets, transforms  # 이미지 데이터셋과 변환

# GPU가 있으면 GPU를, 없으면 CPU를 사용합니다
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using device:", device)
\`\`\`

| 라이브러리 | 역할 | 비유 |
|-------------|------|------|
| torch | 텐서 연산 핵심 | 공장의 기본 기계 |
| torch.nn | 레이어, 손실함수 | 조립용 부품 |
| torch.optim | 최적화 알고리즘 | 품질 개선 담당자 |
| DataLoader | 배치 데이터 공급 | 컨베이어 벨트 |
| torchvision | 이미지 관련 유틸 | 이미지 전문 도구함 |

### 데이터 전처리: transforms

> **비유**: 요리 전에 재료를 씻고 손질하듯, 모델에 데이터를 넣기 전에 전처리가 필요합니다.

\`\`\`python
# [코드 조각 2/7] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
# 데이터 변환 파이프라인을 정의합니다
transform = transforms.Compose([
    # 1단계: PIL 이미지를 PyTorch 텐서로 변환 (0~255 -> 0.0~1.0)
    transforms.ToTensor(),
    # 2단계: 정규화 - 평균 0.1307, 표준편차 0.3081로 표준화
    # 이 값은 MNIST 전체 데이터에서 미리 계산된 통계값입니다
    transforms.Normalize((0.1307,), (0.3081,))
])
\`\`\`

**왜 정규화를 하는가?**

정규화 전 픽셀 값 범위는 0~1이고, 정규화 후에는 대략 -0.42~2.82 범위가 됩니다. 이렇게 하면:
- 학습 속도가 빨라집니다 (그래디언트가 안정적)
- 모든 특성(feature)이 비슷한 스케일을 가집니다

### 데이터셋 다운로드와 DataLoader 생성

\`\`\`python
# [코드 조각 3/7] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
# 훈련 데이터셋 (60,000개)
train_dataset = datasets.MNIST(
    root="./data",       # 다운로드 경로
    train=True,          # 훈련용 데이터
    download=True,       # 없으면 자동 다운로드
    transform=transform  # 위에서 정의한 전처리 적용
)

# 테스트 데이터셋 (10,000개)
test_dataset = datasets.MNIST(
    root="./data",
    train=False,         # 테스트용 데이터
    download=True,
    transform=transform
)

# DataLoader: 데이터를 배치 단위로 묶어서 공급합니다
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)
\`\`\`

> **비유**: Dataset은 창고에 쌓인 재료이고, DataLoader는 그 재료를 64개씩 묶어서 공장(모델)으로 보내는 컨베이어 벨트입니다. shuffle=True는 매번 다른 순서로 재료를 보내서 모델이 순서에 의존하지 않게 합니다.

---

## Step 2: 모델 설계 (MLP)

> **비유**: 모델 설계는 건물 설계도를 그리는 것과 같습니다. 입구(입력층)에서 출구(출력층)까지 데이터가 어떤 경로로 흘러갈지 결정합니다.

우리는 다층 퍼셉트론(MLP, Multi-Layer Perceptron)을 사용합니다. MLP는 가장 기본적인 신경망 구조입니다.

| 레이어 | 입력 크기 | 출력 크기 | 활성화 함수 | 설명 |
|--------|-----------|-----------|-------------|------|
| Flatten | 28x28 | 784 | - | 2D 이미지를 1D로 펼침 |
| 은닉층 1 | 784 | 512 | ReLU | 주요 특징 추출 |
| Dropout | 512 | 512 | - | 과적합 방지 (20% 뉴런 비활성화) |
| 은닉층 2 | 512 | 256 | ReLU | 세부 특징 추출 |
| Dropout | 256 | 256 | - | 과적합 방지 |
| 출력층 | 256 | 10 | - | 각 숫자(0~9)에 대한 점수 |

\`\`\`python
# [코드 조각 4/7] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        # 첫 번째 은닉층: 784개 입력 -> 512개 출력
        self.fc1 = nn.Linear(784, 512)
        # 두 번째 은닉층: 512개 입력 -> 256개 출력
        self.fc2 = nn.Linear(512, 256)
        # 출력층: 256개 입력 -> 10개 출력 (숫자 0~9)
        self.fc3 = nn.Linear(256, 10)
        # Dropout: 학습 시 뉴런의 20%를 무작위로 끕니다
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        # 28x28 이미지를 784 길이의 1차원 벡터로 변환
        x = x.view(-1, 784)
        # 첫 번째 레이어 통과 후 ReLU 활성화
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        # 두 번째 레이어 통과 후 ReLU 활성화
        x = torch.relu(self.fc2(x))
        x = self.dropout(x)
        # 출력층 (활성화 함수 없음 - CrossEntropyLoss가 처리)
        x = self.fc3(x)
        return x

# 모델 생성 후 디바이스(GPU/CPU)로 이동
model = MNISTClassifier().to(device)
\`\`\`

### 왜 출력층에 활성화 함수가 없는가?

PyTorch의 CrossEntropyLoss는 내부적으로 Softmax를 포함하고 있습니다. 따라서 출력층에 별도의 Softmax를 넣으면 중복 적용이 되어 성능이 떨어집니다. 이것은 PyTorch를 사용할 때 흔히 하는 실수 중 하나입니다.

---

## Step 3: 학습 설정

\`\`\`python
# [코드 조각 5/7] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
# 손실 함수: 다중 클래스 분류에 사용
criterion = nn.CrossEntropyLoss()

# 옵티마이저: Adam (적응적 학습률)
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 하이퍼파라미터
epochs = 10
\`\`\`

| 설정 | 선택 | 이유 |
|------|------|------|
| 손실 함수 | CrossEntropyLoss | 다중 클래스 분류 표준, 내부에 Softmax 포함 |
| 옵티마이저 | Adam | 학습률 자동 조절, 대부분의 경우 좋은 성능 |
| 학습률 | 0.001 | Adam의 기본 권장값, 안정적 수렴 |
| 에폭 수 | 10 | MNIST는 10 에폭이면 충분히 수렴 |

---

## Step 4: 학습 루프

> **비유**: 학습 루프는 시험공부와 같습니다. 문제를 풀고(순전파), 답을 확인하고(손실 계산), 틀린 부분을 분석하고(역전파), 그 부분을 보완합니다(가중치 업데이트). 이 과정을 반복할수록 실력이 향상됩니다.

\`\`\`python
# [코드 조각 6/7] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
for epoch in range(epochs):
    model.train()  # 학습 모드 (Dropout 활성화)
    total_loss = 0

    for batch_idx, (data, target) in enumerate(train_loader):
        # 데이터를 GPU/CPU로 이동
        data, target = data.to(device), target.to(device)

        # [1단계] 그래디언트 초기화 - 이전 배치의 그래디언트를 지웁니다
        optimizer.zero_grad()

        # [2단계] 순전파 - 모델에 데이터를 통과시킵니다
        output = model(data)

        # [3단계] 손실 계산 - 예측과 정답의 차이를 측정합니다
        loss = criterion(output, target)

        # [4단계] 역전파 - 각 가중치가 손실에 미친 영향을 계산합니다
        loss.backward()

        # [5단계] 가중치 업데이트 - 손실을 줄이는 방향으로 조정합니다
        optimizer.step()

        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    print("Epoch {}/{}, Loss: {:.4f}".format(epoch+1, epochs, avg_loss))
\`\`\`

### 왜 zero_grad()가 필요한가?

PyTorch는 기본적으로 그래디언트를 누적합니다. 이전 배치의 그래디언트가 남아있으면 현재 배치의 그래디언트와 섞여서 잘못된 방향으로 학습됩니다. 매 배치마다 초기화해야 합니다.

---

## Step 5: 모델 평가

\`\`\`python
# [코드 조각 7/7] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
model.eval()   # 평가 모드 (Dropout 비활성화)
correct = 0
total = 0

with torch.no_grad():  # 그래디언트 계산 끔 -> 메모리 절약 + 속도 향상
    for data, target in test_loader:
        data, target = data.to(device), target.to(device)
        output = model(data)
        # 가장 높은 점수를 가진 클래스를 예측값으로 선택
        _, predicted = torch.max(output.data, 1)
        total += target.size(0)
        correct += (predicted == target).sum().item()

accuracy = 100 * correct / total
print("Test Accuracy: {:.2f}%".format(accuracy))
# 기대 출력: Test Accuracy: 98.XX%
\`\`\`

### 학습 진행에 따른 성능 변화 (예시)

| Epoch | 평균 Loss | 테스트 정확도 | 설명 |
|-------|-----------|---------------|------|
| 1 | 0.35 | ~95% | 기본 패턴 학습 |
| 3 | 0.12 | ~97% | 세부 특징 학습 |
| 5 | 0.08 | ~98% | 미세 조정 단계 |
| 10 | 0.04 | ~98.5% | 거의 수렴 완료 |

---

## 핵심 요약

| 단계 | 코드 | 설명 | 비유 |
|------|------|------|------|
| 데이터 로드 | datasets.MNIST + DataLoader | 데이터 준비 및 배치 공급 | 재료 준비 + 컨베이어 벨트 |
| 모델 설계 | nn.Module 상속 | 신경망 구조 정의 | 건물 설계도 |
| 학습 설정 | CrossEntropyLoss + Adam | 목표와 전략 설정 | 학습 계획 수립 |
| 학습 루프 | 5단계 반복 | 실제 학습 진행 | 반복 학습 |
| 평가 | eval() + no_grad() | 최종 성능 측정 | 모의시험 |

---

## 학습 체크리스트
- [ ] MNIST 데이터셋의 구조(28x28, 흑백, 10클래스)를 설명할 수 있다
- [ ] transforms.Normalize의 역할을 이해한다
- [ ] MLP 모델의 각 레이어 역할을 설명할 수 있다
- [ ] 학습 루프 5단계를 순서대로 나열할 수 있다
- [ ] model.train()과 model.eval()의 차이를 안다
- [ ] torch.no_grad()를 왜 사용하는지 설명할 수 있다

---

## 전체 통합 코드

아래는 위에서 설명한 모든 코드 조각을 하나로 합친 완전한 실행 가능 코드입니다. 이 코드를 복사하여 실행하면 MNIST 분류기를 학습시킬 수 있습니다.

\`\`\`python
# ============================================================
# MNIST 손글씨 분류 - 전체 통합 코드
# 이 파일 하나로 전체 학습 파이프라인을 실행할 수 있습니다.
# ============================================================

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# ============================================================
# 1. 디바이스 설정
# ============================================================
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# ============================================================
# 2. 데이터 전처리 및 로드
# ============================================================
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

# 데이터셋 다운로드 및 로드
train_dataset = datasets.MNIST(root="./data", train=True, download=True, transform=transform)
test_dataset = datasets.MNIST(root="./data", train=False, download=True, transform=transform)

# DataLoader 생성
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

print(f"훈련 데이터: {len(train_dataset)}개")
print(f"테스트 데이터: {len(test_dataset)}개")

# ============================================================
# 3. 모델 정의 (MLP)
# ============================================================
class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 512)
        self.fc2 = nn.Linear(512, 256)
        self.fc3 = nn.Linear(256, 10)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = x.view(-1, 784)
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = torch.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

model = MNISTClassifier().to(device)
print(f"모델 파라미터 수: {sum(p.numel() for p in model.parameters()):,}개")

# ============================================================
# 4. 학습 설정
# ============================================================
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
epochs = 10

# ============================================================
# 5. 학습 함수
# ============================================================
def train_one_epoch(model, train_loader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    for data, target in train_loader:
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    return total_loss / len(train_loader)

# ============================================================
# 6. 평가 함수
# ============================================================
def evaluate(model, test_loader, device):
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
    return 100 * correct / total

# ============================================================
# 7. 학습 실행
# ============================================================
print("\\n학습 시작...")
print("-" * 40)

for epoch in range(epochs):
    avg_loss = train_one_epoch(model, train_loader, criterion, optimizer, device)
    accuracy = evaluate(model, test_loader, device)
    print(f"Epoch {epoch+1:2d}/{epochs} | Loss: {avg_loss:.4f} | Test Accuracy: {accuracy:.2f}%")

print("-" * 40)
print("학습 완료!")

# ============================================================
# 8. 최종 평가
# ============================================================
final_accuracy = evaluate(model, test_loader, device)
print(f"\\n최종 테스트 정확도: {final_accuracy:.2f}%")

# ============================================================
# 9. 모델 저장 (선택사항)
# ============================================================
# torch.save(model.state_dict(), "mnist_classifier.pth")
# print("모델 저장 완료: mnist_classifier.pth")
\`\`\`

**실행 방법:**
1. 위 코드를 \`mnist_train.py\` 파일로 저장
2. 터미널에서 \`python mnist_train.py\` 실행
3. 약 1-2분 후 98% 이상의 정확도 달성

**예상 출력:**
\`\`\`
Using device: cpu
훈련 데이터: 60000개
테스트 데이터: 10000개
모델 파라미터 수: 535,818개

학습 시작...
----------------------------------------
Epoch  1/10 | Loss: 0.3521 | Test Accuracy: 95.42%
Epoch  2/10 | Loss: 0.1423 | Test Accuracy: 96.89%
...
Epoch 10/10 | Loss: 0.0412 | Test Accuracy: 98.21%
----------------------------------------
학습 완료!

최종 테스트 정확도: 98.21%
\`\`\`

---

## 모델 저장과 불러오기

### .pth 파일이란?

학습이 완료되면 모델의 **가중치(weights)**를 파일로 저장할 수 있습니다. PyTorch에서는 \`.pth\` 확장자를 사용합니다.

| 항목 | 설명 |
|------|------|
| 저장 내용 | 신경망의 모든 가중치와 편향(bias) 값 |
| 파일 크기 | 약 2MB (535,818개 파라미터 기준) |
| 형식 | PyTorch 직렬화 형식 |

### 왜 모델을 저장하나요?

1. **학습 시간 절약**: 10 에폭 학습에 수 분 소요 → 저장하면 다시 학습 불필요
2. **배포**: 학습된 모델을 웹 서버나 앱에서 사용
3. **재사용**: 학습 없이 즉시 예측(추론) 가능

> **비유**: 요리 레시피를 완성한 후 레시피북에 적어두는 것과 같습니다. 다음에 요리할 때 처음부터 개발할 필요 없이 레시피만 보면 됩니다.

### 모델 저장하기

\`\`\`python
# [코드 조각] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
# 모델의 가중치만 저장 (권장 방식)
torch.save(model.state_dict(), "mnist_classifier.pth")
print("모델 저장 완료!")
\`\`\`

### 모델 불러오기

\`\`\`python
# [코드 조각] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
# 1. 모델 구조 정의 (학습할 때와 동일해야 함)
model = MNISTClassifier()

# 2. 저장된 가중치 불러오기
model.load_state_dict(torch.load("mnist_classifier.pth", weights_only=True))

# 3. 평가 모드로 전환 (Dropout 비활성화)
model.eval()

# 4. 예측 수행
with torch.no_grad():
    output = model(image)
    predicted = torch.argmax(output, dim=1)
\`\`\`

### 추론(예측) 전체 코드

저장된 모델을 불러와서 예측하는 전체 코드입니다.

\`\`\`python
# [추론용 전체 코드] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
# ============================================================
# MNIST 추론(예측) 예제
# mnist_classifier.pth 파일이 있어야 실행됩니다.
# ============================================================

import torch
import torch.nn as nn
from torchvision import datasets, transforms
import random

# 모델 구조 정의
class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 512)
        self.fc2 = nn.Linear(512, 256)
        self.fc3 = nn.Linear(256, 10)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = x.view(-1, 784)
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = torch.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

# 모델 로드
model = MNISTClassifier()
model.load_state_dict(torch.load("mnist_classifier.pth", weights_only=True))
model.eval()
print("모델 로드 완료!")

# 테스트 데이터 준비
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])
test_dataset = datasets.MNIST(root="./data", train=False, download=True, transform=transform)

# 랜덤 샘플 5개 예측
print("\\n랜덤 샘플 5개 예측 결과:")
for i in range(5):
    idx = random.randint(0, len(test_dataset) - 1)
    image, label = test_dataset[idx]

    with torch.no_grad():
        output = model(image.unsqueeze(0))
        probabilities = torch.softmax(output, dim=1)
        predicted = torch.argmax(output, dim=1).item()
        confidence = probabilities[0][predicted].item() * 100

    status = "O" if predicted == label else "X"
    print(f"  정답={label}, 예측={predicted}, 확신도={confidence:.1f}% [{status}]")
\`\`\`

**예상 출력:**
\`\`\`
모델 로드 완료!

랜덤 샘플 5개 예측 결과:
  정답=2, 예측=2, 확신도=100.0% [O]
  정답=8, 예측=8, 확신도=99.8% [O]
  정답=7, 예측=7, 확신도=100.0% [O]
  정답=3, 예측=3, 확신도=99.5% [O]
  정답=5, 예측=5, 확신도=98.7% [O]
\`\`\`

### 실제 활용 사례

| 분야 | 활용 예시 |
|------|-----------|
| 웹 서비스 | 사용자가 손글씨 그리면 숫자 인식 |
| 모바일 앱 | 카메라로 숫자 인식 |
| 문서 스캔 | 손글씨 숫자 자동 입력 |
| 우편 분류 | 우편번호 자동 인식 |

> **핵심 포인트**: 학습은 시간이 걸리지만, \`.pth\` 파일만 있으면 **즉시 예측**이 가능합니다!

---

## 다음 단계: 커스텀 데이터로 프로젝트 진행하기

MNIST는 이미 준비된 데이터셋입니다. 실제 프로젝트에서는 직접 데이터를 준비해야 합니다.

### MNIST vs 실제 프로젝트 비교

| 항목 | MNIST | 실제 프로젝트 |
|------|-------|--------------|
| 데이터 수집 | 자동 다운로드 | 직접 수집/구매 |
| 라벨링 | 이미 완료됨 | 직접 라벨링 필요 |
| 전처리 | 표준화됨 | 데이터에 맞게 설계 |
| Dataset | \`datasets.MNIST\` | 커스텀 클래스 작성 |
| 모델 | 참고 자료 풍부 | 직접 실험 필요 |

### 커스텀 프로젝트 워크플로우

\`\`\`text
┌─────────────────────────────────────────────────────────────┐
│                   딥러닝 프로젝트 파이프라인                   │
├─────────────────────────────────────────────────────────────┤
│  1. 데이터 수집    →  이미지, 텍스트, 센서 데이터 등          │
│  2. 데이터 정리    →  라벨링, 폴더 구조화, 품질 검수          │
│  3. Dataset 클래스 →  PyTorch가 이해하는 형식으로 변환       │
│  4. DataLoader    →  배치 단위로 데이터 공급                │
│  5. 모델 정의     →  신경망 구조 설계                       │
│  6. 학습/평가     →  학습 루프 실행, 검증                   │
│  7. 모델 저장     →  .pth 파일로 가중치 저장                │
│  8. 배포/추론     →  실제 서비스에 적용                     │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 커스텀 Dataset 클래스 기본 구조

실제 프로젝트에서는 다음과 같이 커스텀 Dataset을 만듭니다:

\`\`\`python
# [코드 조각] 로컬 Python 환경에서 실행하세요 (브라우저 실행 불가)
from torch.utils.data import Dataset
from PIL import Image
import pandas as pd
import os

class CustomImageDataset(Dataset):
    """
    커스텀 Dataset 클래스

    필수 메서드 3가지:
    - __init__: 데이터 로드/초기화
    - __len__: 데이터 개수 반환
    - __getitem__: 인덱스로 샘플 반환
    """

    def __init__(self, csv_file, img_dir, transform=None):
        self.labels_df = pd.read_csv(csv_file)
        self.img_dir = img_dir
        self.transform = transform

    def __len__(self):
        return len(self.labels_df)

    def __getitem__(self, idx):
        # 이미지 로드
        img_name = self.labels_df.iloc[idx]['filename']
        img_path = os.path.join(self.img_dir, img_name)
        image = Image.open(img_path).convert('RGB')

        # 라벨
        label = self.labels_df.iloc[idx]['label']

        # 변환 적용
        if self.transform:
            image = self.transform(image)

        return image, label
\`\`\`

### 폴더 구조 예시

\`\`\`text
data/
├── train/           # 학습 데이터 (70~80%)
│   ├── cat/        # 클래스별 폴더
│   │   ├── cat_001.jpg
│   │   └── ...
│   ├── dog/
│   └── bird/
├── val/             # 검증 데이터 (10~15%)
│   ├── cat/
│   ├── dog/
│   └── bird/
└── test/            # 테스트 데이터 (10~15%)
\`\`\`

> **참고**: 상세한 커스텀 데이터셋 가이드는 학습 자료 폴더의 \`딥러닝_프로젝트_절차_가이드.md\`를 참조하세요.
`;

export const LEVEL_4_LESSON_2 = `
# 이미지 분류 CNN

## 학습 목표
이 레슨을 완료하면:
- CNN(합성곱 신경망)이 이미지 처리에 효과적인 이유를 설명합니다
- Conv2d, MaxPool2d, BatchNorm2d 레이어의 동작을 이해합니다
- CIFAR-10 데이터셋으로 이미지 분류기를 구현합니다
- 특성 맵(feature map)의 크기 변화를 계산할 수 있습니다

---

## 왜 CNN이 필요한가?

> **비유**: MLP로 이미지를 처리하는 것은, 퍼즐 조각을 일렬로 늘어놓고 원래 그림을 맞추라는 것과 같습니다. 조각들의 위치 관계가 사라지니 그림을 파악하기 매우 어렵습니다. CNN은 퍼즐 조각을 원래 위치 그대로 보면서 패턴을 찾습니다.

### MLP의 한계

MLP는 이미지를 1차원으로 펼쳐야(flatten) 합니다.

| 문제점 | 설명 | 예시 |
|--------|------|------|
| 공간 정보 손실 | 인접 픽셀 관계가 사라짐 | "눈 위에 이마"라는 정보 상실 |
| 파라미터 폭발 | 모든 픽셀이 모든 뉴런에 연결 | 32x32x3 이미지 -> 3,072개 입력 |
| 위치 의존성 | 같은 물체가 다른 위치에 있으면 새로 학습 필요 | 왼쪽 고양이와 오른쪽 고양이를 다르게 인식 |

### CNN의 해결책

CNN은 세 가지 핵심 아이디어로 이 문제들을 해결합니다:

| 핵심 아이디어 | 설명 | 효과 |
|---------------|------|------|
| 지역 연결 (Local Connectivity) | 작은 영역(3x3)만 보고 특징 추출 | 공간 정보 보존 |
| 가중치 공유 (Weight Sharing) | 같은 필터를 이미지 전체에 적용 | 파라미터 수 대폭 감소 |
| 계층적 특징 학습 | 낮은 층은 선/모서리, 높은 층은 복잡한 패턴 | 추상화 수준별 학습 |

---

## CNN 핵심 레이어 상세 설명

### 1. Conv2d (합성곱 레이어)

> **비유**: 합성곱은 돋보기로 이미지를 훑는 것과 같습니다. 3x3 크기의 돋보기(필터)가 이미지 위를 한 칸씩 이동하면서 "이 부분에 세로선이 있나?", "모서리가 있나?" 같은 질문에 답합니다.

\`\`\`python
# Conv2d의 주요 파라미터
nn.Conv2d(
    in_channels=3,     # 입력 채널 수 (RGB 이미지 = 3)
    out_channels=32,   # 출력 채널 수 (= 필터 개수)
    kernel_size=3,     # 필터 크기 (3x3)
    stride=1,          # 이동 보폭 (기본값 1)
    padding=1           # 테두리 패딩 (출력 크기 유지)
)
\`\`\`

**출력 크기 계산 공식:**

출력 크기 = (입력 크기 - 커널 크기 + 2 x 패딩) / 스트라이드 + 1

| 입력 | kernel_size | padding | stride | 출력 |
|------|-------------|---------|--------|------|
| 32x32 | 3 | 1 | 1 | 32x32 |
| 32x32 | 3 | 0 | 1 | 30x30 |
| 32x32 | 5 | 2 | 1 | 32x32 |
| 32x32 | 3 | 1 | 2 | 16x16 |

### 2. MaxPool2d (최대 풀링)

> **비유**: 풀링은 이미지를 요약하는 것입니다. 2x2 영역에서 가장 두드러진 특징(최댓값)만 남기고 나머지는 버립니다. 마치 긴 글을 핵심 문장만 남기고 요약하는 것과 같습니다.

\`\`\`python
nn.MaxPool2d(kernel_size=2, stride=2)
# 2x2 영역에서 최댓값만 선택
# 결과: 크기가 절반으로 줄어듦 (32x32 -> 16x16)
\`\`\`

**풀링의 효과:**
- 계산량 감소 (크기가 1/4로)
- 작은 위치 변화에 강건해짐 (위치 불변성)
- 과적합 방지에 도움

### 3. BatchNorm2d (배치 정규화)

> **비유**: 배치 정규화는 각 레이어의 출력을 "표준 점수"로 변환하는 것입니다. 학생들의 시험 점수가 과목마다 다른 범위를 가지면 비교가 어렵듯, 레이어 출력의 분포가 들쭉날쭉하면 학습이 불안정해집니다.

\`\`\`python
nn.BatchNorm2d(32)  # 32개 채널 각각을 정규화
\`\`\`

**효과**: 학습이 더 빠르고 안정적으로 진행됩니다.

---

## CIFAR-10 데이터셋

CIFAR-10은 MNIST보다 한 단계 어려운 이미지 분류 데이터셋입니다.

| 항목 | MNIST | CIFAR-10 |
|------|-------|----------|
| 이미지 크기 | 28x28 | 32x32 |
| 색상 | 흑백 (1채널) | 컬러 (3채널) |
| 클래스 수 | 10 (숫자) | 10 (사물) |
| 훈련 데이터 | 60,000 | 50,000 |
| 테스트 데이터 | 10,000 | 10,000 |
| 난이도 | 쉬움 | 중간 |

CIFAR-10의 10개 클래스: 비행기, 자동차, 새, 고양이, 사슴, 개, 개구리, 말, 배, 트럭

\`\`\`python
from torchvision import datasets, transforms

# 훈련용 변환 (데이터 증강 포함)
train_transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),  # 50% 확률로 좌우 반전
    transforms.RandomCrop(32, padding=4),  # 무작위 자르기
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),  # CIFAR-10 평균
                         (0.2470, 0.2435, 0.2616))   # CIFAR-10 표준편차
])

# 테스트용 변환 (증강 없음 - 공정한 평가를 위해)
test_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),
                         (0.2470, 0.2435, 0.2616))
])

train_dataset = datasets.CIFAR10(
    root="./data", train=True, download=True, transform=train_transform
)
test_dataset = datasets.CIFAR10(
    root="./data", train=False, download=True, transform=test_transform
)
\`\`\`

---

## CNN 모델 구현

### 특성 맵 크기 변화 추적

모델을 설계할 때는 각 레이어를 통과하면서 데이터 크기가 어떻게 변하는지 추적해야 합니다.

| 레이어 | 출력 크기 | 채널 수 | 설명 |
|--------|-----------|---------|------|
| 입력 | 32x32 | 3 | RGB 이미지 |
| Conv Block 1 | 32x32 | 32 | 기본 특징 추출 |
| MaxPool | 16x16 | 32 | 다운샘플링 |
| Conv Block 2 | 16x16 | 64 | 중간 특징 추출 |
| MaxPool | 8x8 | 64 | 다운샘플링 |
| Conv Block 3 | 8x8 | 128 | 고수준 특징 추출 |
| MaxPool | 4x4 | 128 | 다운샘플링 |
| Flatten | 2048 | - | 1차원 변환 (128x4x4) |
| FC | 256 | - | 분류 준비 |
| 출력 | 10 | - | 클래스별 점수 |

\`\`\`python
class ImageClassifier(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()

        # 특징 추출부: 이미지에서 패턴을 찾아내는 부분
        self.features = nn.Sequential(
            # Block 1: 선, 모서리 같은 저수준 특징 추출
            nn.Conv2d(3, 32, kernel_size=3, padding=1),   # 3채널 -> 32채널
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),                           # 32x32 -> 16x16

            # Block 2: 텍스처, 모양 같은 중수준 특징 추출
            nn.Conv2d(32, 64, kernel_size=3, padding=1),  # 32채널 -> 64채널
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),                           # 16x16 -> 8x8

            # Block 3: 부위, 구조 같은 고수준 특징 추출
            nn.Conv2d(64, 128, kernel_size=3, padding=1), # 64채널 -> 128채널
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),                           # 8x8 -> 4x4
        )

        # 분류부: 추출된 특징을 바탕으로 클래스를 결정하는 부분
        self.classifier = nn.Sequential(
            nn.Flatten(),                    # 128x4x4 = 2048차원 벡터로 변환
            nn.Linear(128 * 4 * 4, 256),     # 2048 -> 256
            nn.ReLU(),
            nn.Dropout(0.5),                 # 과적합 방지
            nn.Linear(256, num_classes)      # 256 -> 10 (클래스 수)
        )

    def forward(self, x):
        x = self.features(x)     # 특징 추출
        x = self.classifier(x)   # 분류
        return x

model = ImageClassifier(num_classes=10).to(device)
\`\`\`

---

## MLP vs CNN 성능 비교

| 항목 | MLP | CNN |
|------|-----|-----|
| MNIST 정확도 | ~98% | ~99.5% |
| CIFAR-10 정확도 | ~55% | ~85% |
| 파라미터 수 (CIFAR) | 수백만 개 | 수십만 개 |
| 공간 정보 활용 | 불가 | 가능 |
| 위치 불변성 | 없음 | 있음 (풀링 덕분) |
| 적합한 데이터 | 정형 데이터 | 이미지, 공간 데이터 |

CNN이 CIFAR-10에서 MLP보다 30% 이상 높은 정확도를 보이는 이유는, 이미지의 공간적 구조를 그대로 활용하기 때문입니다.

---

## 실용적 팁

1. **padding=1 + kernel_size=3**: 이 조합은 입력과 출력 크기를 동일하게 유지합니다. 크기 줄이기는 MaxPool에 맡기세요.
2. **BatchNorm은 Conv 뒤, ReLU 앞에**: Conv -> BatchNorm -> ReLU가 표준 순서입니다.
3. **채널 수는 점진적으로 증가**: 32 -> 64 -> 128처럼 2배씩 늘리는 것이 일반적입니다.
4. **Dropout은 FC 레이어에**: 합성곱 레이어보다 FC 레이어에서 과적합이 더 심합니다.

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| Conv2d | 필터로 지역 패턴 추출 | 돋보기로 세부 관찰 |
| MaxPool2d | 크기 축소 + 핵심만 보존 | 긴 글을 요약 |
| BatchNorm2d | 분포 안정화 | 시험 점수 표준화 |
| 특징 추출부 | 이미지에서 패턴 탐색 | 사진에서 단서 찾기 |
| 분류부 | 패턴으로 클래스 결정 | 단서로 정답 판단 |

---

## 학습 체크리스트
- [ ] MLP가 이미지 처리에 부적합한 이유 3가지를 말할 수 있다
- [ ] Conv2d의 출력 크기를 계산할 수 있다
- [ ] MaxPool2d가 하는 일과 효과를 설명할 수 있다
- [ ] BatchNorm의 역할을 설명할 수 있다
- [ ] 특징 추출부와 분류부의 역할 차이를 안다
- [ ] CNN이 MLP보다 이미지에서 뛰어난 이유를 설명할 수 있다
`;

export const LEVEL_4_LESSON_3 = `
# 텍스트 분류

## 학습 목표
이 레슨을 완료하면:
- 텍스트를 신경망에 입력하기 위한 전처리 과정을 설명합니다
- 토큰화, 어휘 사전, 임베딩의 개념과 관계를 이해합니다
- LSTM 기반 감성 분석 모델을 구현합니다
- RNN과 LSTM의 차이점을 설명할 수 있습니다

---

## 텍스트를 숫자로 바꾸는 과정

> **비유**: 신경망은 오직 숫자만 이해합니다. 텍스트를 신경망에 넣는 것은, 한국어를 모르는 외국인에게 한국 소설을 읽히는 것과 같습니다. 먼저 외국인이 이해할 수 있는 형태(숫자)로 "번역"해야 합니다.

텍스트 전처리는 세 단계를 거칩니다:

| 단계 | 입력 | 출력 | 설명 |
|------|------|------|------|
| 1. 토큰화 | 문장 | 단어 목록 | 문장을 단어로 쪼갬 |
| 2. 인덱싱 | 단어 목록 | 숫자 목록 | 각 단어에 번호 부여 |
| 3. 임베딩 | 숫자 목록 | 벡터 목록 | 번호를 의미 벡터로 변환 |

### 전체 과정 예시

\`\`\`python
# 원본 텍스트
"This movie is really great!"

# 1단계: 토큰화 -> 단어로 분리
["this", "movie", "is", "really", "great", "!"]

# 2단계: 인덱싱 -> 숫자로 변환
[42, 156, 11, 89, 2341, 5]

# 3단계: 임베딩 -> 의미 벡터로 변환 (각 숫자가 128차원 벡터로)
[[0.2, -0.1, 0.5, ...],   # "this"의 의미 벡터
 [0.8, 0.3, -0.2, ...],   # "movie"의 의미 벡터
 [0.1, 0.0, 0.3, ...],    # "is"의 의미 벡터
 ...]
\`\`\`

---

## 1단계: 토큰화 (Tokenization)

> **비유**: 토큰화는 문장을 레고 블록처럼 작은 조각으로 분해하는 것입니다. 어떤 크기로 분해하느냐에 따라 결과가 달라집니다.

\`\`\`python
from torchtext.data.utils import get_tokenizer

# 영어 기본 토크나이저
tokenizer = get_tokenizer("basic_english")
tokens = tokenizer("This movie is great!")
# 결과: ["this", "movie", "is", "great", "!"]
\`\`\`

**토큰화 방식 비교:**

| 방식 | 예시 입력 | 결과 | 특징 |
|------|-----------|------|------|
| 단어 단위 | "I love cats" | ["I", "love", "cats"] | 직관적, 어휘 크기 큼 |
| 서브워드 | "playing" | ["play", "##ing"] | 어휘 크기 적당 |
| 문자 단위 | "cat" | ["c", "a", "t"] | 어휘 매우 작음, 시퀀스 길어짐 |

현대 모델(BERT, GPT)은 대부분 서브워드 토큰화를 사용합니다.

---

## 2단계: 어휘 사전 (Vocabulary)

> **비유**: 어휘 사전은 "단어-번호 변환표"입니다. 도서관에서 각 책에 고유 번호를 붙이듯, 각 단어에 고유 번호를 부여합니다.

\`\`\`python
# 간단한 어휘 사전 구축 예시
vocab = {
    "<pad>": 0,    # 패딩 (빈 칸 채우기용)
    "<unk>": 1,    # 미등록 단어 (사전에 없는 단어)
    "this": 2,
    "movie": 3,
    "is": 4,
    "great": 5,
    "terrible": 6,
    # ... 수천~수만 단어
}

# 문장을 숫자로 변환
def encode(tokens, vocab):
    return [vocab.get(token, vocab["<unk>"]) for token in tokens]

encoded = encode(["this", "movie", "is", "great"], vocab)
# 결과: [2, 3, 4, 5]
\`\`\`

### 왜 pad와 unk가 필요한가?

| 특수 토큰 | 역할 | 예시 |
|-----------|------|------|
| pad | 길이가 다른 문장을 같은 길이로 맞춤 | "hi" -> [24, 0, 0, 0, 0] |
| unk | 학습 시 본 적 없는 단어 처리 | "supercalifragilistic" -> 1 |

---

## 3단계: 임베딩 (Embedding)

> **비유**: 임베딩은 단어의 "주민등록번호"를 "성격 프로필"로 바꾸는 과정입니다. 숫자 42는 아무런 의미 정보를 담고 있지 않지만, [0.2, -0.1, 0.5, ...]같은 벡터는 그 단어의 의미를 담고 있습니다.

\`\`\`python
# 임베딩 레이어: 숫자 인덱스 -> 의미 벡터
embedding = nn.Embedding(
    num_embeddings=10000,  # 어휘 크기 (단어 수)
    embedding_dim=128      # 벡터 차원 (의미 공간의 차원 수)
)

# 사용 예시
import torch
word_indices = torch.tensor([2, 3, 4, 5])  # "this movie is great"
word_vectors = embedding(word_indices)
# 결과 크기: [4, 128] - 4개 단어, 각각 128차원 벡터
\`\`\`

**임베딩의 핵심 특성:**
- 비슷한 의미의 단어는 비슷한 벡터를 가지게 됩니다
- 예: "good"과 "great"의 벡터가 가까움
- 이 벡터 값들은 학습 과정에서 자동으로 조정됩니다

---

## LSTM 이해하기

### RNN의 문제점

> **비유**: 기본 RNN은 "금붕어 기억력"을 가지고 있습니다. 긴 문장의 앞부분을 읽을 때쯤이면 뒷부분은 까먹습니다. 이것이 "기울기 소실(vanishing gradient)" 문제입니다.

### LSTM의 해결책

> **비유**: LSTM은 "수첩을 가진 학생"입니다. 중요한 정보는 수첩(셀 상태)에 적어두고, 필요 없는 정보는 지우며, 필요할 때 꺼내 봅니다.

| 구성 요소 | 역할 | 비유 |
|-----------|------|------|
| 셀 상태 (Cell State) | 장기 기억 저장소 | 수첩 |
| 망각 게이트 (Forget Gate) | 불필요한 정보 삭제 | 수첩에서 줄 긋기 |
| 입력 게이트 (Input Gate) | 새 정보 저장 결정 | 수첩에 새로 적기 |
| 출력 게이트 (Output Gate) | 현재 필요한 정보 출력 | 수첩에서 읽기 |

\`\`\`python
# LSTM 레이어 생성
lstm = nn.LSTM(
    input_size=128,    # 입력 벡터 크기 (= 임베딩 차원)
    hidden_size=256,   # 은닉 상태 크기
    batch_first=True,  # 입력 형태: [배치, 시퀀스길이, 특성]
    num_layers=1       # LSTM 층 수
)
\`\`\`

---

## 감성 분석 모델 구현

감성 분석(Sentiment Analysis)은 텍스트가 긍정적인지 부정적인지 판단하는 작업입니다.

\`\`\`python
class SentimentClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_classes):
        super().__init__()

        # 1. 임베딩: 단어 인덱스 -> 의미 벡터
        self.embedding = nn.Embedding(vocab_size, embed_dim, padding_idx=0)

        # 2. LSTM: 순서 정보를 활용한 문맥 파악
        self.lstm = nn.LSTM(
            embed_dim,       # 입력 크기 = 임베딩 차원
            hidden_dim,      # 은닉 상태 크기
            batch_first=True,
            bidirectional=False  # 단방향 (앞에서 뒤로만 읽음)
        )

        # 3. 분류기: 최종 은닉 상태 -> 클래스 예측
        self.fc = nn.Linear(hidden_dim, num_classes)
        self.dropout = nn.Dropout(0.3)

    def forward(self, x):
        # x: [배치크기, 시퀀스길이] - 숫자로 인코딩된 문장
        embedded = self.embedding(x)
        # embedded: [배치크기, 시퀀스길이, embed_dim]

        # LSTM에 임베딩 벡터를 순서대로 입력
        output, (hidden, cell) = self.lstm(embedded)
        # hidden: [1, 배치크기, hidden_dim] - 마지막 은닉 상태

        # 마지막 은닉 상태로 감성 분류
        hidden = self.dropout(hidden.squeeze(0))
        logits = self.fc(hidden)
        # logits: [배치크기, num_classes]
        return logits

# 모델 생성
model = SentimentClassifier(
    vocab_size=10000,    # 어휘 크기
    embed_dim=128,       # 임베딩 차원
    hidden_dim=256,      # LSTM 은닉 크기
    num_classes=2        # 긍정(1) / 부정(0)
)
\`\`\`

### 왜 마지막 은닉 상태만 사용하는가?

LSTM의 마지막 은닉 상태(hidden)는 전체 문장을 읽은 후의 "요약"입니다. 문장 전체의 맥락을 압축한 벡터이므로, 감성 분류에 적합합니다.

---

## 학습 코드

\`\`\`python
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    model.train()
    total_loss = 0

    for texts, labels in train_loader:
        texts, labels = texts.to(device), labels.to(device)

        optimizer.zero_grad()
        output = model(texts)
        loss = criterion(output, labels)
        loss.backward()

        # 그래디언트 클리핑: RNN 계열에서 기울기 폭발 방지
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

        optimizer.step()
        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    print("Epoch {}, Loss: {:.4f}".format(epoch+1, avg_loss))
\`\`\`

### 왜 그래디언트 클리핑이 필요한가?

RNN/LSTM은 시퀀스가 길어지면 역전파 시 그래디언트가 폭발적으로 커질 수 있습니다. clip_grad_norm_은 그래디언트의 크기를 max_norm 이하로 제한하여 안정적인 학습을 보장합니다.

---

## 이미지 분류 vs 텍스트 분류 비교

| 항목 | 이미지 분류 (CNN) | 텍스트 분류 (LSTM) |
|------|-------------------|---------------------|
| 입력 형태 | 2D 픽셀 격자 | 1D 단어 시퀀스 |
| 전처리 | 정규화, 크기 조정 | 토큰화, 임베딩 |
| 핵심 레이어 | Conv2d | LSTM/GRU |
| 패턴 유형 | 공간적 패턴 | 순차적 패턴 |
| 주요 과제 | 위치/크기 변화 | 문맥 이해 |

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| 토큰화 | 문장을 단어로 분리 | 문장을 레고 블록으로 분해 |
| 어휘 사전 | 단어에 고유 번호 부여 | 도서관 분류 번호 |
| 임베딩 | 번호를 의미 벡터로 변환 | 번호를 성격 프로필로 변환 |
| LSTM | 순서 정보로 문맥 파악 | 수첩 들고 읽는 학생 |
| 감성 분석 | 텍스트의 감정 판단 | 영화 리뷰 평가 |

---

## 학습 체크리스트
- [ ] 텍스트 전처리 3단계(토큰화 -> 인덱싱 -> 임베딩)를 설명할 수 있다
- [ ] pad 토큰과 unk 토큰의 역할을 안다
- [ ] 임베딩 레이어가 하는 일을 설명할 수 있다
- [ ] LSTM이 RNN의 어떤 문제를 해결하는지 안다
- [ ] 그래디언트 클리핑이 필요한 이유를 설명할 수 있다
- [ ] 감성 분석 모델의 전체 구조를 이해한다
`;

export const LEVEL_4_LESSON_4 = `
# nn.Module 기초

## 학습 목표
이 레슨을 완료하면:
- nn.Module이 PyTorch에서 차지하는 역할을 이해합니다
- 커스텀 모델과 레이어를 자유롭게 설계할 수 있습니다
- forward() 메서드의 동작 원리를 설명합니다
- 파라미터를 확인하고 관리하는 방법을 익힙니다

---

## nn.Module이란?

> **비유**: nn.Module은 레고의 "기본 브릭"과 같습니다. 작은 브릭(개별 레이어)을 조합해 더 큰 구조물(모델)을 만들고, 그 구조물을 또다시 더 큰 구조물의 부품으로 사용할 수 있습니다. PyTorch의 모든 신경망 구성 요소는 이 기본 브릭을 기반으로 만들어집니다.

nn.Module은 PyTorch에서 **모든 신경망 레이어와 모델의 기본 클래스(부모 클래스)** 입니다.

| 기능 | 설명 | 예시 |
|------|------|------|
| 파라미터 관리 | 학습 가능한 가중치 자동 추적 | model.parameters() |
| 디바이스 이동 | GPU/CPU 간 이동 | model.to("cuda") |
| 모드 전환 | 학습/평가 모드 전환 | model.train() / model.eval() |
| 저장/로드 | 모델 가중치 저장 및 복원 | torch.save(model.state_dict(), ...) |
| 서브모듈 관리 | 하위 레이어 자동 등록 | model.children() |

---

## 기본 구조: 반드시 지켜야 할 규칙

\`\`\`python
import torch
import torch.nn as nn

class MyModel(nn.Module):
    def __init__(self):
        # [규칙 1] 반드시 부모 클래스 초기화를 호출해야 합니다
        super().__init__()

        # [규칙 2] __init__에서 레이어를 정의합니다
        self.layer1 = nn.Linear(784, 256)
        self.layer2 = nn.Linear(256, 10)

    def forward(self, x):
        # [규칙 3] forward에서 데이터 흐름을 정의합니다
        x = torch.relu(self.layer1(x))
        x = self.layer2(x)
        return x
\`\`\`

### 왜 super().__init__()이 필수인가?

super().__init__()을 호출하지 않으면 PyTorch가 내부적으로 사용하는 파라미터 추적 시스템이 초기화되지 않습니다. 결과적으로:
- model.parameters()가 빈 리스트를 반환합니다
- model.to(device)가 작동하지 않습니다
- optimizer가 학습할 파라미터를 찾지 못합니다

이것은 PyTorch 초보자가 가장 자주 겪는 오류 중 하나입니다.

---

## 자주 사용하는 레이어 총정리

### 완전 연결층 (Linear)

> **비유**: nn.Linear는 "투표 시스템"입니다. 각 입력에 가중치(투표 영향력)를 곱하고 합산하여 결과를 냅니다.

\`\`\`python
# 784개 입력을 받아 256개 출력을 만드는 레이어
linear = nn.Linear(in_features=784, out_features=256)
# 내부적으로 가중치 행렬 [256, 784]와 편향 벡터 [256]을 가짐
\`\`\`

### 합성곱층 (Conv2d)

\`\`\`python
# 3채널 입력, 64채널 출력, 3x3 필터
conv = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, padding=1)
\`\`\`

### 활성화 함수

\`\`\`python
relu = nn.ReLU()           # max(0, x) - 음수를 0으로
sigmoid = nn.Sigmoid()     # 0~1 사이로 압축
tanh = nn.Tanh()           # -1~1 사이로 압축
\`\`\`

| 활성화 함수 | 출력 범위 | 주로 사용되는 곳 |
|-------------|-----------|------------------|
| ReLU | [0, +무한) | 은닉층 (가장 보편적) |
| Sigmoid | (0, 1) | 이진 분류 출력층 |
| Tanh | (-1, 1) | RNN 은닉 상태 |
| Softmax | (0, 1), 합=1 | 다중 분류 출력층 |

### 정규화 레이어

\`\`\`python
bn = nn.BatchNorm2d(64)    # 배치 정규화 (CNN용)
bn1d = nn.BatchNorm1d(256) # 배치 정규화 (FC용)
dropout = nn.Dropout(0.5)  # 50% 뉴런을 무작위로 끔
\`\`\`

---

## nn.Sequential: 간단한 모델 만들기

레이어가 단순히 순서대로 연결되는 경우, nn.Sequential을 사용하면 코드가 간결해집니다.

\`\`\`python
# 방법 1: nn.Sequential 사용 (간결)
model_simple = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(256, 10)
)

# 방법 2: nn.Module 상속 (유연)
class ModelFlexible(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 256)
        self.fc2 = nn.Linear(256, 10)
        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x
\`\`\`

| 비교 항목 | nn.Sequential | nn.Module 상속 |
|-----------|---------------|----------------|
| 코드 길이 | 짧음 | 김 |
| 유연성 | 낮음 (순차적만 가능) | 높음 (분기, 잔차 연결 등) |
| 가독성 | 단순 모델에서 좋음 | 복잡 모델에서 좋음 |
| 적합한 경우 | 레이어가 순서대로 | 복잡한 데이터 흐름 |

### 왜 nn.Module 상속이 더 많이 사용되는가?

실제 모델은 단순히 레이어를 쌓는 것 이상입니다. 잔차 연결(ResNet), 다중 입력/출력, 조건부 분기 등을 구현하려면 forward()를 직접 작성해야 합니다.

---

## 파라미터 확인과 관리

모델이 정확히 어떤 파라미터를 가지고 있는지 확인하는 것은 디버깅과 최적화에 매우 중요합니다.

\`\`\`python
model = ModelFlexible()

# 모든 파라미터의 이름과 크기 출력
for name, param in model.named_parameters():
    print("{}: {}".format(name, param.shape))

# 출력:
# fc1.weight: torch.Size([256, 784])
# fc1.bias: torch.Size([256])
# fc2.weight: torch.Size([10, 256])
# fc2.bias: torch.Size([10])

# 총 파라미터 수 계산
total_params = sum(p.numel() for p in model.parameters())
print("Total parameters: {:,}".format(total_params))
# 출력: Total parameters: 203,530

# 학습 가능한 파라미터만 세기
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
print("Trainable parameters: {:,}".format(trainable))
\`\`\`

---

## 모드 전환: train() vs eval()

> **비유**: 축구 선수가 연습(train)할 때와 시합(eval)할 때 행동이 다르듯, 모델도 학습할 때와 평가할 때 동작이 달라야 합니다.

\`\`\`python
# 학습 모드: Dropout 활성화, BatchNorm이 배치 통계 사용
model.train()

# 평가 모드: Dropout 비활성화, BatchNorm이 저장된 통계 사용
model.eval()

# 평가 시에는 그래디언트 계산도 꺼서 메모리와 속도를 절약
with torch.no_grad():
    output = model(test_data)
\`\`\`

| 동작 | train() 모드 | eval() 모드 |
|------|-------------|-------------|
| Dropout | 뉴런 무작위 비활성화 | 모든 뉴런 활성화 |
| BatchNorm | 현재 배치의 평균/분산 사용 | 학습 중 누적된 평균/분산 사용 |
| 용도 | 학습 루프 | 검증/테스트/추론 |

---

## 실전 예제: 재사용 가능한 블록 설계

큰 모델은 반복되는 패턴을 "블록"으로 만들어 재사용하면 코드가 깔끔해집니다.

\`\`\`python
class ConvBlock(nn.Module):
    """Conv -> BatchNorm -> ReLU 패턴을 하나의 블록으로"""
    def __init__(self, in_ch, out_ch, kernel_size=3, padding=1):
        super().__init__()
        self.conv = nn.Conv2d(in_ch, out_ch, kernel_size, padding=padding)
        self.bn = nn.BatchNorm2d(out_ch)
        self.relu = nn.ReLU()

    def forward(self, x):
        return self.relu(self.bn(self.conv(x)))


class MyNet(nn.Module):
    """ConvBlock을 재사용해서 모델 구성"""
    def __init__(self, num_classes=10):
        super().__init__()
        self.block1 = ConvBlock(3, 32)     # 3채널 -> 32채널
        self.block2 = ConvBlock(32, 64)    # 32채널 -> 64채널
        self.block3 = ConvBlock(64, 128)   # 64채널 -> 128채널
        self.pool = nn.MaxPool2d(2)
        self.fc = nn.Linear(128 * 4 * 4, num_classes)

    def forward(self, x):
        x = self.pool(self.block1(x))  # 32x32 -> 16x16
        x = self.pool(self.block2(x))  # 16x16 -> 8x8
        x = self.pool(self.block3(x))  # 8x8 -> 4x4
        x = x.view(x.size(0), -1)     # Flatten
        return self.fc(x)

model = MyNet(num_classes=10)
\`\`\`

블록 기반 설계의 장점:
1. **코드 중복 제거**: 같은 패턴을 반복 작성하지 않아도 됩니다
2. **수정 용이**: 블록 하나만 수정하면 모든 곳에 반영됩니다
3. **가독성 향상**: 모델 구조를 한눈에 파악할 수 있습니다

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| nn.Module | 모든 레이어/모델의 기본 클래스 | 레고의 기본 브릭 |
| __init__ | 레이어 정의 | 부품 목록 |
| forward | 데이터 흐름 정의 | 조립 설명서 |
| parameters() | 학습 가능한 가중치 반환 | 조절 가능한 나사들 |
| train()/eval() | 모드 전환 | 연습/시합 모드 전환 |
| nn.Sequential | 순차적 레이어 묶음 | 파이프라인 |

---

## 학습 체크리스트
- [ ] super().__init__()을 호출해야 하는 이유를 안다
- [ ] __init__과 forward의 역할 차이를 설명할 수 있다
- [ ] nn.Sequential과 nn.Module 상속의 차이를 안다
- [ ] model.parameters()로 파라미터를 확인할 수 있다
- [ ] train()과 eval() 모드에서 Dropout/BatchNorm의 동작 차이를 안다
- [ ] 블록 기반 모델 설계의 장점을 이해한다
`;

export const LEVEL_4_LESSON_5 = `
# 데이터 로딩

## 학습 목표
이 레슨을 완료하면:
- Dataset과 DataLoader의 역할과 관계를 이해합니다
- 커스텀 Dataset 클래스를 직접 구현합니다
- transforms를 활용한 데이터 증강의 원리를 설명합니다
- 효율적인 데이터 파이프라인을 설계합니다

---

## 데이터 로딩이 왜 중요한가?

> **비유**: 아무리 좋은 요리사(모델)라도 재료(데이터)가 제때 공급되지 않으면 요리를 할 수 없습니다. GPU가 아무리 빨라도 데이터가 느리게 도착하면 GPU는 대부분의 시간을 기다리며 낭비합니다. 효율적인 데이터 로딩은 학습 속도에 직접적인 영향을 미칩니다.

### 데이터 로딩 파이프라인 전체 흐름

| 단계 | 구성 요소 | 역할 | 비유 |
|------|-----------|------|------|
| 1 | 원본 데이터 | 디스크에 저장된 파일 | 창고의 원재료 |
| 2 | Dataset | 데이터 접근 방법 정의 | 재료 꺼내기 규칙 |
| 3 | transforms | 전처리 및 변환 | 재료 손질 |
| 4 | DataLoader | 배치 묶기, 셔플, 병렬 처리 | 컨베이어 벨트 |
| 5 | 모델 학습 | 배치 단위 학습 | 요리 시작 |

---

## Dataset 클래스 이해하기

Dataset은 "데이터 하나를 어떻게 가져올 것인가"를 정의하는 클래스입니다.

### 반드시 구현해야 하는 메서드

| 메서드 | 역할 | 반환값 |
|--------|------|--------|
| __init__ | 데이터 경로, 변환 등 초기 설정 | 없음 |
| __len__ | 데이터셋의 총 크기 | 정수 |
| __getitem__ | 인덱스로 데이터 1개 가져오기 | (입력, 라벨) 튜플 |

\`\`\`python
from torch.utils.data import Dataset
import torch

class MyDataset(Dataset):
    def __init__(self, data, labels, transform=None):
        """데이터셋 초기화 - 데이터를 메모리에 올리거나 경로를 저장"""
        self.data = data
        self.labels = labels
        self.transform = transform

    def __len__(self):
        """데이터셋 크기 반환 - DataLoader가 전체 크기를 알아야 배치를 나눌 수 있음"""
        return len(self.data)

    def __getitem__(self, idx):
        """인덱스로 데이터 1개를 가져옴 - DataLoader가 이 메서드를 반복 호출"""
        x = self.data[idx]
        y = self.labels[idx]

        # 변환(전처리)이 정의되어 있으면 적용
        if self.transform:
            x = self.transform(x)

        return x, y
\`\`\`

### 왜 __getitem__이 핵심인가?

DataLoader는 내부적으로 인덱스를 생성하고, 각 인덱스에 대해 __getitem__을 호출합니다. 이 메서드가 효율적이지 않으면 전체 학습 속도가 느려집니다.

---

## DataLoader 상세 설명

> **비유**: DataLoader는 레스토랑의 웨이터입니다. 주방(Dataset)에서 음식(데이터)을 가져와 테이블(모델)에 배달하는데, 한 번에 여러 접시(배치)를 나르고, 매번 다른 메뉴 순서(셔플)로 서빙합니다.

\`\`\`python
from torch.utils.data import DataLoader

train_loader = DataLoader(
    dataset=train_dataset,  # 위에서 만든 Dataset 객체
    batch_size=64,          # 한 번에 처리할 데이터 수
    shuffle=True,           # 매 에폭마다 순서를 섞을지 여부
    num_workers=4,          # 데이터 로딩에 사용할 프로세스 수
    pin_memory=True,        # GPU 전송 최적화 (CUDA 사용 시)
    drop_last=True          # 마지막 불완전 배치를 버릴지 여부
)
\`\`\`

### DataLoader 파라미터 상세

| 파라미터 | 기본값 | 설명 | 팁 |
|----------|--------|------|-----|
| batch_size | 1 | 배치 크기 | 메모리 허용 범위에서 크게 설정 |
| shuffle | False | 데이터 섞기 | 훈련: True, 테스트: False |
| num_workers | 0 | 병렬 로딩 프로세스 | CPU 코어 수의 2~4배 시도 |
| pin_memory | False | GPU 전송 최적화 | GPU 사용 시 True 권장 |
| drop_last | False | 마지막 불완전 배치 처리 | BatchNorm 사용 시 True 권장 |

### 왜 shuffle이 중요한가?

셔플을 하지 않으면, 모델이 데이터의 순서에서 패턴을 학습할 수 있습니다. 예를 들어 고양이 이미지가 앞에, 개 이미지가 뒤에 몰려 있으면 모델은 "앞쪽 = 고양이"라는 잘못된 규칙을 학습할 수 있습니다.

### DataLoader 사용 패턴

\`\`\`python
# 기본 사용법: for 문으로 배치를 하나씩 가져옴
for batch_idx, (data, target) in enumerate(train_loader):
    # data 크기: [batch_size, channels, height, width]
    # target 크기: [batch_size]
    data, target = data.to(device), target.to(device)

    # ... 학습 코드 ...

    if batch_idx % 100 == 0:
        print("Batch {}/{}".format(batch_idx, len(train_loader)))
\`\`\`

---

## transforms: 데이터 변환과 증강

### 기본 변환

모든 이미지 데이터에 필수적으로 적용하는 변환입니다.

\`\`\`python
from torchvision import transforms

# 기본 변환 파이프라인
basic_transform = transforms.Compose([
    transforms.Resize((224, 224)),         # 크기 통일 (모델 입력 크기에 맞춤)
    transforms.ToTensor(),                 # PIL 이미지 -> PyTorch 텐서 (0~1)
    transforms.Normalize(                  # 정규화
        mean=[0.485, 0.456, 0.406],        # ImageNet 평균
        std=[0.229, 0.224, 0.225]          # ImageNet 표준편차
    )
])
\`\`\`

### 데이터 증강 (Data Augmentation)

> **비유**: 데이터 증강은 "같은 시험 문제를 조금씩 변형해서 연습량을 늘리는 것"입니다. 고양이 사진을 뒤집거나, 밝기를 바꾸거나, 약간 회전시키면 모델 입장에서는 새로운 데이터입니다.

\`\`\`python
# 훈련용 변환: 증강 포함
train_transform = transforms.Compose([
    transforms.RandomHorizontalFlip(p=0.5),   # 50% 확률로 좌우 반전
    transforms.RandomRotation(15),            # -15도 ~ +15도 무작위 회전
    transforms.RandomCrop(32, padding=4),     # 패딩 후 무작위 자르기
    transforms.ColorJitter(                   # 색상 변화
        brightness=0.2,                       # 밝기 +/- 20%
        contrast=0.2,                         # 대비 +/- 20%
        saturation=0.2                        # 채도 +/- 20%
    ),
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),
                         (0.2470, 0.2435, 0.2616))
])

# 테스트용 변환: 증강 없음 (공정한 평가)
test_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),
                         (0.2470, 0.2435, 0.2616))
])
\`\`\`

### 왜 테스트 데이터에는 증강을 적용하지 않는가?

테스트는 모델의 "진짜 실력"을 측정하는 것입니다. 테스트 데이터에 무작위 변환을 적용하면 매번 다른 결과가 나와서 공정한 평가가 불가능합니다.

| 변환 | 훈련 시 | 테스트 시 | 이유 |
|------|---------|-----------|------|
| RandomHorizontalFlip | 적용 | 미적용 | 데이터 다양성 증가 |
| RandomRotation | 적용 | 미적용 | 회전에 강건해지도록 |
| ToTensor | 적용 | 적용 | 형식 변환 (필수) |
| Normalize | 적용 | 적용 | 분포 통일 (필수) |

---

## 실전 예제 1: 이미지 폴더 Dataset

폴더 이름이 클래스 라벨이 되는 구조는 실무에서 가장 흔합니다.

\`\`\`python
# 폴더 구조 예시:
# data/
#   train/
#     cat/
#       cat001.jpg, cat002.jpg, ...
#     dog/
#       dog001.jpg, dog002.jpg, ...
#   test/
#     cat/
#       cat101.jpg, ...
#     dog/
#       dog101.jpg, ...

from torchvision.datasets import ImageFolder

# ImageFolder는 폴더 이름을 자동으로 클래스 라벨로 사용합니다
train_dataset = ImageFolder(
    root="data/train",
    transform=train_transform
)

print(train_dataset.classes)        # ["cat", "dog"]
print(train_dataset.class_to_idx)   # {"cat": 0, "dog": 1}
print("Total images:", len(train_dataset))  # 폴더 내 전체 이미지 수
\`\`\`

---

## 실전 예제 2: CSV 데이터 로딩

\`\`\`python
import pandas as pd

class CSVDataset(Dataset):
    def __init__(self, csv_file, feature_cols, label_col):
        """CSV 파일에서 데이터를 로드하는 커스텀 Dataset"""
        self.df = pd.read_csv(csv_file)
        self.features = self.df[feature_cols].values
        self.labels = self.df[label_col].values

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        x = torch.tensor(self.features[idx], dtype=torch.float32)
        y = torch.tensor(self.labels[idx], dtype=torch.long)
        return x, y

# 사용 예시
dataset = CSVDataset(
    csv_file="data.csv",
    feature_cols=["age", "income", "score"],
    label_col="target"
)

loader = DataLoader(dataset, batch_size=32, shuffle=True)
\`\`\`

---

## 데이터셋 분할: 훈련/검증 나누기

\`\`\`python
from torch.utils.data import random_split

# 전체 데이터를 80% 훈련, 20% 검증으로 분할
full_dataset = MyDataset(data, labels, transform=train_transform)
train_size = int(0.8 * len(full_dataset))
val_size = len(full_dataset) - train_size

train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])

# 각각 DataLoader 생성
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=64, shuffle=False)
\`\`\`

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| Dataset | 데이터 1개를 가져오는 방법 정의 | 재료 꺼내기 규칙 |
| DataLoader | 배치 묶기, 셔플, 병렬 로딩 | 컨베이어 벨트 |
| transforms | 전처리 및 데이터 증강 | 재료 손질 과정 |
| ImageFolder | 폴더 구조 기반 이미지 로딩 | 자동 분류 시스템 |
| random_split | 데이터셋 분할 | 재료를 훈련/검증용으로 나누기 |

---

## 학습 체크리스트
- [ ] Dataset의 필수 메서드 3가지(__init__, __len__, __getitem__)를 안다
- [ ] DataLoader의 주요 파라미터(batch_size, shuffle, num_workers)를 설명할 수 있다
- [ ] 훈련 데이터에만 증강을 적용하는 이유를 안다
- [ ] ImageFolder의 사용법을 이해한다
- [ ] random_split으로 데이터를 분할하는 방법을 안다
- [ ] num_workers와 pin_memory의 역할을 설명할 수 있다
`;

export const LEVEL_4_LESSON_6 = `
# 학습 루프

## 학습 목표
이 레슨을 완료하면:
- 학습 루프의 5단계를 코드와 함께 설명할 수 있습니다
- 검증 루프의 구현과 학습 루프와의 차이를 이해합니다
- 학습 과정을 모니터링하고 시각화하는 방법을 익힙니다
- 조기 종료(Early Stopping)를 구현합니다

---

## 학습 루프란?

> **비유**: 학습 루프는 "시험공부 사이클"과 같습니다. 문제를 풀고(순전파), 정답과 비교하고(손실 계산), 어디서 틀렸는지 분석하고(역전파), 약점을 보완합니다(가중치 업데이트). 이 사이클을 수천 번 반복하면 실력이 향상됩니다.

학습 루프는 딥러닝의 핵심입니다. 모델이 아무리 잘 설계되어도, 학습 루프가 올바르지 않으면 제대로 학습되지 않습니다.

---

## 학습 루프 5단계 상세

| 단계 | 코드 | 역할 | 왜 필요한가? |
|------|------|------|-------------|
| 1 | optimizer.zero_grad() | 그래디언트 초기화 | 이전 배치의 영향 제거 |
| 2 | output = model(data) | 순전파 | 현재 가중치로 예측 수행 |
| 3 | loss = criterion(output, target) | 손실 계산 | 예측과 정답의 차이 측정 |
| 4 | loss.backward() | 역전파 | 각 가중치의 개선 방향 계산 |
| 5 | optimizer.step() | 가중치 업데이트 | 실제로 가중치를 수정 |

### 각 단계를 자세히 살펴봅시다

**1단계: optimizer.zero_grad() - 왜 매번 초기화해야 하는가?**

> **비유**: 칠판에 이전 수업의 내용이 남아있으면 새 수업 내용과 섞여서 혼란스럽습니다. 매 수업(배치) 전에 칠판을 깨끗이 지우는 것과 같습니다.

PyTorch는 .backward()를 호출할 때마다 그래디언트를 기존 값에 더합니다(누적). 이 설계는 특별한 경우(그래디언트 축적)에 유용하지만, 일반적인 학습에서는 반드시 초기화해야 합니다.

**2단계: output = model(data) - 순전파**

모델의 forward() 메서드가 자동으로 호출됩니다. 데이터가 레이어를 순서대로 통과하면서 예측값을 만들어냅니다.

**3단계: loss = criterion(output, target) - 손실 계산**

예측값과 실제 정답의 차이를 하나의 숫자(스칼라)로 요약합니다. 이 숫자가 작을수록 모델이 정답에 가깝게 예측한 것입니다.

**4단계: loss.backward() - 역전파**

> **비유**: 시험에서 틀린 문제를 분석하는 것입니다. "이 가중치를 이 방향으로 조금 바꾸면 손실이 줄어들 것"이라는 정보(그래디언트)를 계산합니다.

**5단계: optimizer.step() - 가중치 업데이트**

4단계에서 계산한 방향으로 실제로 가중치를 수정합니다. 학습률이 이 수정의 크기를 결정합니다.

---

## 기본 학습 함수 구현

\`\`\`python
def train_one_epoch(model, loader, criterion, optimizer, device):
    """한 에폭의 학습을 수행하는 함수"""
    model.train()  # 학습 모드 (Dropout, BatchNorm 활성화)
    total_loss = 0
    correct = 0
    total = 0

    for data, target in loader:
        # 데이터를 디바이스(GPU/CPU)로 이동
        data, target = data.to(device), target.to(device)

        # === 학습 루프 5단계 ===
        optimizer.zero_grad()              # 1. 그래디언트 초기화
        output = model(data)               # 2. 순전파
        loss = criterion(output, target)   # 3. 손실 계산
        loss.backward()                    # 4. 역전파
        optimizer.step()                   # 5. 가중치 업데이트

        # === 통계 기록 ===
        total_loss += loss.item()          # .item()으로 Python 숫자로 변환
        _, predicted = output.max(1)       # 가장 높은 점수의 클래스 선택
        total += target.size(0)            # 전체 샘플 수 누적
        correct += predicted.eq(target).sum().item()  # 맞은 개수 누적

    avg_loss = total_loss / len(loader)
    accuracy = 100.0 * correct / total
    return avg_loss, accuracy
\`\`\`

### 왜 loss.item()을 사용하는가?

loss는 PyTorch 텐서로, 전체 계산 그래프에 연결되어 있습니다. 그냥 loss를 누적하면 계산 그래프가 계속 메모리에 남아서 메모리가 폭발합니다. .item()은 순수한 Python 숫자를 반환하므로 안전합니다.

---

## 검증 함수 구현

검증(Validation)은 모델이 학습 데이터에만 잘 맞는 것이 아니라, 처음 보는 데이터에도 잘 동작하는지 확인하는 과정입니다.

\`\`\`python
def validate(model, loader, criterion, device):
    """검증/테스트를 수행하는 함수"""
    model.eval()  # 평가 모드 (Dropout 비활성화, BatchNorm 고정)
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

    avg_loss = total_loss / len(loader)
    accuracy = 100.0 * correct / total
    return avg_loss, accuracy
\`\`\`

### 학습 루프 vs 검증 루프 차이점

| 항목 | 학습 루프 | 검증 루프 |
|------|-----------|-----------|
| model.train/eval | model.train() | model.eval() |
| torch.no_grad() | 사용 안 함 | 사용함 |
| zero_grad() | 매 배치마다 호출 | 불필요 |
| loss.backward() | 호출 | 불필요 |
| optimizer.step() | 호출 | 불필요 |
| Dropout | 활성화 | 비활성화 |
| 목적 | 모델 가중치 수정 | 현재 성능 측정 |

---

## 전체 학습 과정: 에폭 루프

\`\`\`python
# 하이퍼파라미터
epochs = 50
best_val_loss = float("inf")   # 최고 성능 추적
patience = 7                   # 조기 종료 인내심
patience_counter = 0

# 학습 기록 저장
history = {
    "train_loss": [], "val_loss": [],
    "train_acc": [], "val_acc": []
}

for epoch in range(epochs):
    # 학습
    train_loss, train_acc = train_one_epoch(
        model, train_loader, criterion, optimizer, device
    )

    # 검증
    val_loss, val_acc = validate(
        model, val_loader, criterion, device
    )

    # 기록 저장
    history["train_loss"].append(train_loss)
    history["val_loss"].append(val_loss)
    history["train_acc"].append(train_acc)
    history["val_acc"].append(val_acc)

    # 현재 상태 출력
    print("Epoch {}/{}".format(epoch + 1, epochs))
    print("  Train - Loss: {:.4f}, Acc: {:.2f}%".format(train_loss, train_acc))
    print("  Val   - Loss: {:.4f}, Acc: {:.2f}%".format(val_loss, val_acc))

    # === 조기 종료 (Early Stopping) ===
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        # 최고 성능 모델 저장
        torch.save(model.state_dict(), "best_model.pt")
        patience_counter = 0
        print("  >> Best model saved!")
    else:
        patience_counter += 1
        print("  >> No improvement ({}/{})".format(patience_counter, patience))
        if patience_counter >= patience:
            print("Early stopping triggered!")
            break
\`\`\`

---

## 조기 종료 (Early Stopping) 상세 설명

> **비유**: 조기 종료는 "더 이상 공부해도 성적이 오르지 않으면 공부를 멈추는 것"입니다. 과도한 공부(학습)는 오히려 응용력(일반화)을 떨어뜨릴 수 있습니다.

### 과적합의 3가지 상태

| 상태 | Train Loss | Val Loss | 의미 | 조치 |
|------|------------|----------|------|------|
| 정상 학습 | 감소 | 감소 | 모델이 잘 배우는 중 | 학습 계속 |
| 과적합 시작 | 감소 | 증가 | 훈련 데이터만 외우기 시작 | 조기 종료 |
| 과소적합 | 높음 | 높음 | 모델 용량이 부족 | 모델 크기 증가 |

**조기 종료의 핵심 파라미터: patience**
- patience가 너무 작으면 (예: 2): 일시적인 변동에도 학습이 멈춤
- patience가 너무 크면 (예: 50): 과적합이 심해진 후에야 멈춤
- 일반적인 권장값: 5~10

---

## 학습률 스케줄러

학습이 진행될수록 학습률을 줄이면 더 세밀한 최적화가 가능합니다.

\`\`\`python
# 방법 1: StepLR - 일정 에폭마다 학습률을 감소
scheduler = torch.optim.lr_scheduler.StepLR(
    optimizer, step_size=10, gamma=0.1
)
# 10 에폭마다 학습률을 1/10로 줄임

# 방법 2: ReduceLROnPlateau - 성능 정체 시 학습률 감소
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode="min", patience=3, factor=0.5
)
# val_loss가 3 에폭 동안 개선되지 않으면 학습률을 절반으로

# 에폭 루프에서 사용
for epoch in range(epochs):
    train_loss, train_acc = train_one_epoch(...)
    val_loss, val_acc = validate(...)

    # StepLR의 경우
    scheduler.step()

    # ReduceLROnPlateau의 경우
    # scheduler.step(val_loss)
\`\`\`

| 스케줄러 | 전략 | 적합한 경우 |
|----------|------|------------|
| StepLR | 고정 간격으로 감소 | 학습 패턴을 미리 아는 경우 |
| ReduceLROnPlateau | 성능 정체 시 감소 | 가장 범용적 (추천) |
| CosineAnnealingLR | 코사인 곡선으로 감소 | 긴 학습에서 주기적 재시작 |

---

## 학습 과정 시각화

학습이 제대로 진행되고 있는지 그래프로 확인하는 것은 매우 중요합니다. 아래는 학습 기록 데이터로 그래프를 그리는 개념적 예시입니다.

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# 학습 기록 시뮬레이션 (실제로는 위의 history 딕셔너리 사용)
epochs_range = np.arange(1, 21)
train_loss = 2.0 * np.exp(-0.2 * epochs_range) + 0.1
val_loss = 2.0 * np.exp(-0.15 * epochs_range) + 0.2 + 0.05 * np.maximum(0, epochs_range - 12)

fig, ax = plt.subplots(1, 1, figsize=(8, 5))
ax.plot(epochs_range, train_loss, "b-o", label="Train Loss", markersize=4)
ax.plot(epochs_range, val_loss, "r-s", label="Val Loss", markersize=4)
ax.axvline(x=12, color="gray", linestyle="--", alpha=0.7, label="Overfitting starts")
ax.set_xlabel("Epoch")
ax.set_ylabel("Loss")
ax.set_title("Training vs Validation Loss")
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
\`\`\`

**그래프 읽는 법:**
- 두 곡선이 함께 내려가면: 정상 학습 중
- Train은 내려가는데 Val이 올라가면: 과적합 발생
- 두 곡선 사이 간격이 크면: 과적합 심각

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| 학습 루프 5단계 | zero_grad -> forward -> loss -> backward -> step | 시험공부 사이클 |
| 검증 루프 | eval() + no_grad()로 성능 측정 | 모의시험 |
| 조기 종료 | Val Loss가 개선되지 않으면 학습 중단 | 더 공부해도 성적 안 오르면 멈추기 |
| 학습률 스케줄러 | 학습 진행에 따라 학습률 조정 | 처음엔 큰 보폭, 나중엔 세밀하게 |
| 학습 기록 | loss/accuracy를 에폭별로 기록 | 성적 추이 기록 |

---

## 학습 체크리스트
- [ ] 학습 루프 5단계를 순서대로 설명할 수 있다
- [ ] zero_grad()가 필요한 이유를 안다
- [ ] loss.item()을 사용하는 이유를 안다
- [ ] 학습 루프와 검증 루프의 차이점 5가지를 나열할 수 있다
- [ ] 과적합의 징후를 그래프에서 식별할 수 있다
- [ ] 조기 종료의 patience가 하는 역할을 설명할 수 있다
`;

export const LEVEL_4_LESSON_7 = `
# 모델 저장과 로드

## 학습 목표
이 레슨을 완료하면:
- state_dict 방식과 전체 모델 저장 방식의 차이를 이해합니다
- 체크포인트를 사용해 학습을 중단하고 재개할 수 있습니다
- GPU와 CPU 간 모델을 이동하는 방법을 익힙니다
- 실무에서의 모델 저장 전략을 설명할 수 있습니다

---

## 왜 모델 저장이 중요한가?

> **비유**: 모델 저장은 게임의 "세이브" 기능과 같습니다. 몇 시간 동안 열심히 학습(플레이)한 결과를 저장하지 않으면, 프로그램을 종료하는 순간 모든 것이 사라집니다. 특히 GPU로 며칠간 학습하는 대규모 모델에서는 저장이 필수입니다.

모델을 저장해야 하는 상황:

| 상황 | 설명 | 저장 방식 |
|------|------|-----------|
| 학습 완료 후 배포 | 학습된 모델을 서비스에 적용 | state_dict (권장) |
| 학습 중간 저장 | 긴 학습 중 진행 상태 보존 | 체크포인트 |
| 실험 비교 | 여러 설정의 모델 비교 | state_dict + 설정 정보 |
| 전이 학습 | 사전 학습된 모델 재활용 | state_dict |

---

## 3가지 저장 방식 비교

| 방식 | 저장 내용 | 파일 크기 | 장점 | 단점 |
|------|-----------|-----------|------|------|
| state_dict | 가중치만 | 작음 | 호환성 좋음, 유연함 | 모델 클래스 코드 필요 |
| 전체 모델 | 구조 + 가중치 | 중간 | 간편함 | Pickle 의존, 호환성 문제 |
| 체크포인트 | 전체 학습 상태 | 큼 | 학습 재개 가능 | 파일 크기가 큼 |

---

## 방식 1: state_dict 저장 (권장)

> **비유**: state_dict 저장은 "레시피는 따로 보관하고, 양념 비율(가중치)만 저장"하는 것입니다. 레시피(모델 구조)가 있으면 양념 비율만으로 같은 요리를 재현할 수 있습니다.

### state_dict란?

state_dict는 파이썬 딕셔너리로, 각 레이어의 이름을 키(key)로, 해당 레이어의 가중치 텐서를 값(value)으로 가집니다.

\`\`\`python
# state_dict 내용 확인
model = MyModel()
print(model.state_dict().keys())
# 출력 예시:
# odict_keys(["fc1.weight", "fc1.bias", "fc2.weight", "fc2.bias"])

# 각 레이어의 가중치 크기 확인
for name, tensor in model.state_dict().items():
    print("{}: {}".format(name, tensor.shape))
\`\`\`

### 저장하기

\`\`\`python
# 모델의 가중치(state_dict)만 저장합니다
torch.save(model.state_dict(), "model_weights.pt")
# .pt 또는 .pth 확장자를 관례적으로 사용합니다
\`\`\`

### 로드하기

\`\`\`python
# 1단계: 모델 구조를 먼저 생성합니다 (코드가 필요!)
model = MyModel()

# 2단계: 저장된 가중치를 모델에 로드합니다
model.load_state_dict(torch.load("model_weights.pt"))

# 3단계: 추론(예측)에 사용할 경우 평가 모드로 전환합니다
model.eval()
\`\`\`

### 왜 state_dict가 권장되는가?

1. **PyTorch 버전 호환성**: 다른 버전에서도 로드 가능
2. **유연한 수정**: 모델 구조를 변경한 후 일부 가중치만 로드 가능
3. **파일 크기**: 가중치만 저장하므로 상대적으로 작음
4. **보안**: 전체 모델 저장은 Pickle을 사용하므로 보안 위험 존재

---

## 방식 2: 전체 모델 저장

> **비유**: 전체 모델 저장은 "완성된 요리를 통째로 냉동 보관"하는 것입니다. 꺼내면 바로 먹을 수 있지만, 냉동 방식(Pickle)에 의존하므로 해동이 안 될 수도 있습니다.

### 저장하기

\`\`\`python
# 모델 전체를 저장합니다 (구조 + 가중치)
torch.save(model, "model_full.pt")
\`\`\`

### 로드하기

\`\`\`python
# 모델 클래스 코드 없이도 바로 사용 가능
model = torch.load("model_full.pt")
model.eval()
\`\`\`

### 전체 모델 저장의 주의사항

| 주의사항 | 설명 |
|----------|------|
| 클래스 경로 의존 | 모델 클래스의 파일 위치가 바뀌면 로드 실패 |
| Python 버전 의존 | 다른 Python 버전에서 로드 실패 가능 |
| 보안 위험 | Pickle은 임의 코드 실행이 가능하므로, 신뢰할 수 없는 파일 로드 금지 |
| 리팩토링 어려움 | 코드 구조를 변경하면 기존 저장 파일과 호환 불가 |

이러한 이유로, PyTorch 공식 문서에서도 state_dict 방식을 권장합니다.

---

## 방식 3: 체크포인트 저장

> **비유**: 체크포인트는 게임의 "풀 세이브"입니다. 캐릭터 상태(모델), 장비(옵티마이저), 진행도(에폭), 최고 점수(최적 성능) 등 학습을 이어가기 위한 모든 정보를 저장합니다.

### 왜 체크포인트가 필요한가?

모델 가중치만 저장하면 학습을 재개할 수 없습니다. 학습을 이어가려면:
- 모델 가중치 (어디까지 학습했는지)
- 옵티마이저 상태 (모멘텀 등 누적 정보)
- 현재 에폭 (어디서부터 이어갈지)
- 학습률 스케줄러 상태
- 최고 검증 성능 (비교 기준)

이 모든 것이 필요합니다.

### 체크포인트 저장하기

\`\`\`python
def save_checkpoint(model, optimizer, epoch, val_loss, filepath):
    """학습 상태 전체를 체크포인트로 저장"""
    checkpoint = {
        "epoch": epoch,
        "model_state_dict": model.state_dict(),
        "optimizer_state_dict": optimizer.state_dict(),
        "val_loss": val_loss,
    }
    torch.save(checkpoint, filepath)
    print("Checkpoint saved: {}".format(filepath))

# 사용 예시: 매 에폭마다 또는 최고 성능일 때 저장
save_checkpoint(model, optimizer, epoch, val_loss, "checkpoint.pt")
\`\`\`

### 체크포인트에서 학습 재개하기

\`\`\`python
def load_checkpoint(filepath, model, optimizer):
    """체크포인트를 로드하고 학습 상태를 복원"""
    checkpoint = torch.load(filepath)

    # 모델 가중치 복원
    model.load_state_dict(checkpoint["model_state_dict"])

    # 옵티마이저 상태 복원 (모멘텀 등)
    optimizer.load_state_dict(checkpoint["optimizer_state_dict"])

    # 메타 정보 반환
    epoch = checkpoint["epoch"]
    val_loss = checkpoint["val_loss"]

    print("Resumed from epoch {}, val_loss: {:.4f}".format(epoch, val_loss))
    return epoch, val_loss

# 사용 예시
model = MyModel().to(device)
optimizer = optim.Adam(model.parameters(), lr=0.001)

start_epoch, best_val_loss = load_checkpoint(
    "checkpoint.pt", model, optimizer
)

# 이어서 학습
for epoch in range(start_epoch + 1, total_epochs):
    train_loss, train_acc = train_one_epoch(...)
    val_loss, val_acc = validate(...)
    # ... 나머지 학습 코드 ...
\`\`\`

---

## GPU와 CPU 간 모델 이동

실무에서는 GPU에서 학습하고 CPU에서 추론(서비스)하는 경우가 많습니다. 디바이스 간 모델 이동 방법을 알아야 합니다.

### 시나리오별 로드 방법

| 저장 환경 | 로드 환경 | 핵심 코드 |
|-----------|-----------|-----------|
| GPU | GPU | torch.load("model.pt") |
| GPU | CPU | torch.load("model.pt", map_location="cpu") |
| CPU | GPU | torch.load("model.pt"); model.cuda() |
| GPU 0 | GPU 1 | torch.load("model.pt", map_location="cuda:1") |

### GPU에서 저장, CPU에서 로드

\`\`\`python
# === GPU에서 학습 후 저장 ===
model = MyModel().cuda()
# ... 학습 진행 ...
torch.save(model.state_dict(), "model_gpu.pt")

# === CPU 환경에서 로드 ===
model = MyModel()  # CPU에 모델 생성
# map_location으로 텐서를 CPU로 매핑
model.load_state_dict(
    torch.load("model_gpu.pt", map_location=torch.device("cpu"))
)
model.eval()
\`\`\`

### CPU에서 저장, GPU에서 로드

\`\`\`python
# === CPU에서 저장 ===
torch.save(model.state_dict(), "model_cpu.pt")

# === GPU 환경에서 로드 ===
model = MyModel()
model.load_state_dict(torch.load("model_cpu.pt"))
model = model.cuda()  # 모델을 GPU로 이동
model.eval()
\`\`\`

### 왜 map_location이 필요한가?

GPU에서 저장한 텐서는 기본적으로 "cuda:0"이라는 위치 정보를 가지고 있습니다. CPU만 있는 환경에서 이 파일을 로드하면 "cuda:0 디바이스를 찾을 수 없다"는 오류가 발생합니다. map_location은 이 위치 정보를 재매핑합니다.

---

## 실무 저장 전략

### 전략 1: 최고 성능 모델만 저장

가장 기본적이고 많이 사용하는 전략입니다.

\`\`\`python
best_val_loss = float("inf")

for epoch in range(epochs):
    train_loss, _ = train_one_epoch(model, train_loader, criterion, optimizer, device)
    val_loss, val_acc = validate(model, val_loader, criterion, device)

    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), "best_model.pt")
        print("Epoch {}: New best model saved (val_loss={:.4f})".format(
            epoch + 1, val_loss))
\`\`\`

### 전략 2: 주기적 체크포인트 + 최고 모델

긴 학습에서는 주기적 체크포인트와 최고 모델을 함께 저장합니다.

\`\`\`python
for epoch in range(epochs):
    train_loss, _ = train_one_epoch(...)
    val_loss, val_acc = validate(...)

    # 최고 성능 모델 저장
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), "best_model.pt")

    # 10 에폭마다 체크포인트 저장 (학습 재개용)
    if (epoch + 1) % 10 == 0:
        save_checkpoint(model, optimizer, epoch, val_loss,
                       "checkpoint_epoch_{}.pt".format(epoch + 1))
\`\`\`

### 전략 3: 마지막 N개 체크포인트만 유지

디스크 공간을 절약하면서도 안전하게 체크포인트를 관리합니다.

\`\`\`python
import os

def save_with_rotation(model, optimizer, epoch, val_loss, max_keep=3):
    """최근 N개의 체크포인트만 유지"""
    filepath = "checkpoint_epoch_{}.pt".format(epoch + 1)
    save_checkpoint(model, optimizer, epoch, val_loss, filepath)

    # 오래된 체크포인트 삭제
    # 현재 에폭에서 max_keep 이전의 체크포인트를 찾아 삭제
    old_epoch = epoch + 1 - max_keep
    old_path = "checkpoint_epoch_{}.pt".format(old_epoch)
    if os.path.exists(old_path):
        os.remove(old_path)
        print("Removed old checkpoint: {}".format(old_path))
\`\`\`

---

## 자주 발생하는 오류와 해결법

| 오류 | 원인 | 해결법 |
|------|------|--------|
| RuntimeError: Missing keys | 모델 구조와 state_dict 불일치 | strict=False로 부분 로드 |
| RuntimeError: CUDA not available | GPU 없는 환경에서 GPU 모델 로드 | map_location="cpu" 사용 |
| AttributeError: Can't pickle | 전체 모델 저장 시 직렬화 불가 객체 | state_dict 방식으로 전환 |
| FileNotFoundError | 잘못된 저장 경로 | 절대 경로 사용 권장 |

\`\`\`python
# 부분 로드 (모델 구조가 약간 변경된 경우)
model.load_state_dict(
    torch.load("model.pt"),
    strict=False  # 일치하지 않는 키를 무시
)
\`\`\`

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| state_dict | 가중치만 저장 (권장) | 레시피 양념 비율 저장 |
| 전체 모델 저장 | 구조 + 가중치 저장 | 완성 요리 냉동 보관 |
| 체크포인트 | 모든 학습 상태 저장 | 게임 풀 세이브 |
| map_location | 디바이스 간 이동 | 주소 변경 |
| strict=False | 부분 로드 허용 | 일부 부품만 교체 |

---

## 학습 체크리스트
- [ ] state_dict와 전체 모델 저장의 차이를 설명할 수 있다
- [ ] state_dict 방식이 권장되는 이유 4가지를 안다
- [ ] 체크포인트에 포함해야 하는 정보를 나열할 수 있다
- [ ] GPU에서 저장한 모델을 CPU에서 로드하는 방법을 안다
- [ ] map_location이 필요한 이유를 설명할 수 있다
- [ ] 실무에서의 저장 전략(최고 모델 + 주기적 체크포인트)을 이해한다
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
