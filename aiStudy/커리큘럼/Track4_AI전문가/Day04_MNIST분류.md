# Day 4: MNIST 분류 — "손글씨 숫자를 AI가 읽는다"

## 학습 목표
- 신경망(MLP)의 구조와 동작 원리를 이해한다
- MNIST 데이터셋을 로드하고 전처리한다
- 분류 모델을 학습시키고 정확도를 측정한다
- 혼동 행렬로 모델 성능을 분석하고 과적합을 인식한다

## 준비물
- Google Colab (GPU 런타임)
- Day 3 nn.Module 패턴 이해

## 실습 1: MNIST 데이터 탐색 (20분)

1. 데이터셋을 다운로드하고 구조를 확인한다:

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt

# 데이터 변환: 이미지 -> 텐서 + 정규화
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

# 데이터 로드
train_dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
test_dataset = datasets.MNIST('./data', train=False, transform=transform)

print(f"학습 데이터: {len(train_dataset)}개")
print(f"테스트 데이터: {len(test_dataset)}개")
print(f"이미지 shape: {train_dataset[0][0].shape}")
print(f"클래스: 0~9 (숫자)")
```

2. 샘플 이미지를 시각화한다:

```python
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    image, label = train_dataset[i]
    ax.imshow(image.squeeze(), cmap='gray')
    ax.set_title(f"Label: {label}")
    ax.axis('off')
plt.suptitle("MNIST 샘플 이미지")
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- 28x28 크기의 그레이스케일 이미지임을 확인했는가?
- 정규화 값(0.1307, 0.3081)은 MNIST 전체의 평균/표준편차이다

## 실습 2: MLP 모델 학습 (40분)

1. DataLoader와 모델을 정의한다:

```python
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.layers = nn.Sequential(
            nn.Linear(28*28, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        x = self.flatten(x)
        return self.layers(x)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = MLP().to(device)
print(f"모델 파라미터 수: {sum(p.numel() for p in model.parameters()):,}")
```

2. 학습 루프를 구현한다:

```python
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

train_losses = []
test_accuracies = []

for epoch in range(10):
    model.train()
    epoch_loss = 0
    for batch_x, batch_y in train_loader:
        batch_x, batch_y = batch_x.to(device), batch_y.to(device)

        optimizer.zero_grad()
        output = model(batch_x)
        loss = criterion(output, batch_y)
        loss.backward()
        optimizer.step()
        epoch_loss += loss.item()

    avg_loss = epoch_loss / len(train_loader)
    train_losses.append(avg_loss)

    # 테스트 정확도
    model.eval()
    correct = 0
    with torch.no_grad():
        for batch_x, batch_y in test_loader:
            batch_x, batch_y = batch_x.to(device), batch_y.to(device)
            output = model(batch_x)
            pred = output.argmax(dim=1)
            correct += (pred == batch_y).sum().item()

    accuracy = correct / len(test_dataset) * 100
    test_accuracies.append(accuracy)
    print(f"Epoch {epoch+1}: loss={avg_loss:.4f}, accuracy={accuracy:.2f}%")
```

### 관찰 포인트
- CrossEntropyLoss가 분류 문제에 사용되는 이유를 이해했는가?
- model.train()과 model.eval()의 차이(Dropout 동작)를 파악했는가?

## 실습 3: 성능 분석 — 혼동 행렬 (20분)

1. 혼동 행렬을 생성한다:

```python
from sklearn.metrics import confusion_matrix, classification_report
import numpy as np
import seaborn as sns

all_preds = []
all_labels = []

model.eval()
with torch.no_grad():
    for batch_x, batch_y in test_loader:
        batch_x = batch_x.to(device)
        output = model(batch_x)
        preds = output.argmax(dim=1).cpu().numpy()
        all_preds.extend(preds)
        all_labels.extend(batch_y.numpy())

cm = confusion_matrix(all_labels, all_preds)

plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=range(10), yticklabels=range(10))
plt.xlabel("예측")
plt.ylabel("실제")
plt.title("혼동 행렬 (Confusion Matrix)")
plt.show()

print(classification_report(all_labels, all_preds))
```

2. 오분류 샘플을 확인한다:

```python
# 틀린 예측 찾기
wrong_indices = [i for i in range(len(all_preds)) if all_preds[i] != all_labels[i]]
print(f"오분류 개수: {len(wrong_indices)}/{len(all_labels)}")

fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    idx = wrong_indices[i]
    image = test_dataset[idx][0].squeeze()
    ax.imshow(image, cmap='gray')
    ax.set_title(f"실제:{all_labels[idx]} 예측:{all_preds[idx]}", color='red')
    ax.axis('off')
plt.suptitle("오분류 샘플")
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- 어떤 숫자 쌍이 가장 많이 혼동되는가? (예: 4와 9, 3과 5)
- 오분류된 이미지를 보면 사람도 헷갈릴 만한 것들인가?

## 과제

### 제출물: "MNIST 분류 성능 분석 보고서"

```markdown
# Day 4 과제: MNIST 분류

## 1. 모델 성능
- 최종 테스트 정확도: ___%
- 혼동 행렬 스크린샷:
- 가장 많이 혼동되는 숫자 쌍:

## 2. 과적합 실험
- Dropout 제거 후 train/test 정확도 차이:
- Dropout 있을 때 vs 없을 때 비교:

## 3. 하이퍼파라미터 실험
| 설정               | 테스트 정확도 |
|-------------------|--------------|
| 기본 (256-128)    |              |
| 큰 모델 (512-256) |              |
| 작은 모델 (64-32) |              |
```

## 강사 참고 사항
- MLP로 97% 정도가 한계이며, 이를 통해 "CNN이 왜 필요한지" Day 5로 연결한다
- Dropout의 효과를 train accuracy vs test accuracy 그래프로 보여주면 과적합 개념이 명확해진다
- batch_size를 바꿔보는 실험도 시간 여유 시 추가할 수 있다
