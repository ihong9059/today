# Day 5: CNN — "합성곱으로 이미지를 정복한다"

## 학습 목표
- CNN(합성곱 신경망)의 핵심 구성요소를 이해한다 (Conv2d, BatchNorm, ReLU, MaxPool)
- MNIST에 CNN을 적용하여 99% 이상의 정확도를 달성한다
- 필터(커널)가 이미지에서 특징을 추출하는 과정을 시각화한다
- MLP 대비 CNN의 장점을 체감한다

## 준비물
- Google Colab (GPU 런타임)
- Day 4 MNIST 코드

## 실습 1: CNN 구조 이해 (20분)

1. Conv2d의 동작을 시각적으로 확인한다:

```python
import torch
import torch.nn as nn
import matplotlib.pyplot as plt
from torchvision import datasets, transforms

# 샘플 이미지 1장 준비
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))])
dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
sample_image = dataset[0][0].unsqueeze(0)  # (1, 1, 28, 28)
print(f"입력 shape: {sample_image.shape}")

# Conv2d 적용
conv = nn.Conv2d(1, 8, kernel_size=3, padding=1)
output = conv(sample_image)
print(f"Conv2d 출력 shape: {output.shape}")  # (1, 8, 28, 28)

# 8개 필터 출력 시각화
fig, axes = plt.subplots(2, 4, figsize=(12, 6))
for i, ax in enumerate(axes.flat):
    ax.imshow(output[0, i].detach().numpy(), cmap='viridis')
    ax.set_title(f"Filter {i}")
    ax.axis('off')
plt.suptitle("Conv2d 필터 출력 (8개 채널)")
plt.tight_layout()
plt.show()
```

2. MaxPool2d의 효과를 확인한다:

```python
pool = nn.MaxPool2d(2)
pooled = pool(output)
print(f"MaxPool 전: {output.shape}")   # (1, 8, 28, 28)
print(f"MaxPool 후: {pooled.shape}")   # (1, 8, 14, 14)
```

### 관찰 포인트
- 각 필터가 서로 다른 특징(에지, 코너 등)을 추출하는가?
- MaxPool이 크기를 절반으로 줄이는 것을 확인했는가?

## 실습 2: CNN 모델 구현 및 학습 (40분)

1. CNN 모델을 정의한다:

```python
from torch.utils.data import DataLoader

train_dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
test_dataset = datasets.MNIST('./data', train=False, transform=transform)
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            # Block 1: 1 -> 32 채널
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),  # 28x28 -> 14x14

            # Block 2: 32 -> 64 채널
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),  # 14x14 -> 7x7
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = CNN().to(device)

total_params = sum(p.numel() for p in model.parameters())
print(f"모델 파라미터 수: {total_params:,}")
print(model)
```

2. 학습을 실행한다:

```python
import torch.optim as optim

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    model.train()
    total_loss = 0
    correct = 0
    total = 0

    for batch_x, batch_y in train_loader:
        batch_x, batch_y = batch_x.to(device), batch_y.to(device)
        optimizer.zero_grad()
        output = model(batch_x)
        loss = criterion(output, batch_y)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()
        pred = output.argmax(dim=1)
        correct += (pred == batch_y).sum().item()
        total += batch_y.size(0)

    train_acc = correct / total * 100

    # 테스트
    model.eval()
    test_correct = 0
    with torch.no_grad():
        for batch_x, batch_y in test_loader:
            batch_x, batch_y = batch_x.to(device), batch_y.to(device)
            output = model(batch_x)
            test_correct += (output.argmax(1) == batch_y).sum().item()

    test_acc = test_correct / len(test_dataset) * 100
    print(f"Epoch {epoch+1}: loss={total_loss/len(train_loader):.4f}, "
          f"train_acc={train_acc:.2f}%, test_acc={test_acc:.2f}%")
```

### 관찰 포인트
- 10 epoch 이내에 99% 이상 정확도에 도달하는가?
- Day 4의 MLP(~97%)와 비교하여 얼마나 향상되었는가?

## 실습 3: 학습된 필터 시각화 (20분)

1. 첫 번째 Conv 레이어의 필터를 시각화한다:

```python
# 학습된 필터 시각화
filters = model.features[0].weight.data.cpu()
print(f"필터 shape: {filters.shape}")  # (32, 1, 3, 3)

fig, axes = plt.subplots(4, 8, figsize=(14, 7))
for i, ax in enumerate(axes.flat):
    ax.imshow(filters[i, 0], cmap='gray')
    ax.axis('off')
plt.suptitle("학습된 Conv1 필터 (32개)")
plt.tight_layout()
plt.show()
```

2. 특징 맵(Feature Map)을 시각화한다:

```python
# 중간 레이어 출력 확인
sample = dataset[0][0].unsqueeze(0).to(device)

# Block 1 출력
with torch.no_grad():
    block1_out = model.features[:4](sample)  # Conv->BN->ReLU->Pool

fig, axes = plt.subplots(4, 8, figsize=(14, 7))
for i, ax in enumerate(axes.flat):
    ax.imshow(block1_out[0, i].cpu().numpy(), cmap='viridis')
    ax.axis('off')
plt.suptitle("Block 1 Feature Maps (32채널, 14x14)")
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- 학습된 필터가 에지, 코너, 곡선 등을 감지하는 형태인가?
- 깊은 레이어로 갈수록 특징 맵이 추상적으로 변하는가?

## 과제

### 제출물: "CNN vs MLP 비교 분석 보고서"

```markdown
# Day 5 과제: CNN 정복

## 1. MLP vs CNN 비교
| 항목         | MLP (Day 4) | CNN (Day 5) |
|-------------|-------------|-------------|
| 파라미터 수  |             |             |
| 테스트 정확도|             |             |
| 학습 시간    |             |             |

## 2. CNN 구조 실험
| 구조 변형                  | 테스트 정확도 |
|---------------------------|--------------|
| 기본 (32-64)              |              |
| 채널 늘림 (64-128)        |              |
| BatchNorm 제거            |              |
| Dropout 제거              |              |

## 3. 필터 시각화 분석
- 학습된 필터가 감지하는 패턴 설명:
- 특징 맵 시각화 스크린샷:
```

## 강사 참고 사항
- BatchNorm의 효과를 제거해보는 실험을 통해 학습 안정성 차이를 보여준다
- 99%를 넘지 못하는 경우 epoch를 15~20으로 늘리거나 학습률 스케줄러를 소개한다
- "왜 이미지에는 Flatten+Linear보다 Conv가 좋은가"를 파라미터 공유 관점에서 설명한다
