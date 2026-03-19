# ============================================================
# MNIST CNN 분류 - MLP 대신 CNN 사용
# MLP와 CNN의 성능 차이를 비교해보세요
#
# 실행 방법:
#   ./venv/bin/python mnist_cnn_train.py
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

train_dataset = datasets.MNIST(root="./data", train=True, download=True, transform=transform)
test_dataset = datasets.MNIST(root="./data", train=False, download=True, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

print(f"훈련 데이터: {len(train_dataset)}개")
print(f"테스트 데이터: {len(test_dataset)}개")

# ============================================================
# 3. CNN 모델 정의
# ============================================================
class MNISTClassifierCNN(nn.Module):
    """
    MNIST용 CNN 모델

    구조:
    - Conv Block 1: Conv2d → BatchNorm → ReLU → MaxPool
    - Conv Block 2: Conv2d → BatchNorm → ReLU → MaxPool
    - Classifier: Flatten → Linear → ReLU → Dropout → Linear
    """

    def __init__(self):
        super().__init__()

        # 특징 추출부 (Convolutional Layers)
        self.features = nn.Sequential(
            # Conv Block 1: [1, 28, 28] → [32, 14, 14]
            nn.Conv2d(1, 32, kernel_size=3, padding=1),   # [1, 28, 28] → [32, 28, 28]
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),                               # [32, 28, 28] → [32, 14, 14]

            # Conv Block 2: [32, 14, 14] → [64, 7, 7]
            nn.Conv2d(32, 64, kernel_size=3, padding=1),  # [32, 14, 14] → [64, 14, 14]
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),                               # [64, 14, 14] → [64, 7, 7]
        )

        # 분류부 (Fully Connected Layers)
        self.classifier = nn.Sequential(
            nn.Flatten(),                    # [64, 7, 7] → [3136]
            nn.Linear(64 * 7 * 7, 128),     # [3136] → [128]
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(128, 10)               # [128] → [10]
        )

    def forward(self, x):
        # x shape: [batch, 1, 28, 28]
        x = self.features(x)      # → [batch, 64, 7, 7]
        x = self.classifier(x)    # → [batch, 10]
        return x

model = MNISTClassifierCNN().to(device)

# 파라미터 수 계산
total_params = sum(p.numel() for p in model.parameters())
print(f"\n모델 구조:")
print(model)
print(f"\n총 파라미터 수: {total_params:,}개")

# MLP와 비교
mlp_params = 784*512 + 512 + 512*256 + 256 + 256*10 + 10  # 약 535,818개
print(f"MLP 파라미터 수: {mlp_params:,}개")
print(f"CNN이 MLP보다 {mlp_params/total_params:.1f}배 적은 파라미터 사용")

# ============================================================
# 4. 학습 설정
# ============================================================
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
epochs = 10

# ============================================================
# 5. 학습 및 평가 함수
# ============================================================
def train_one_epoch(model, train_loader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    correct = 0
    total = 0

    for data, target in train_loader:
        data, target = data.to(device), target.to(device)

        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()
        _, predicted = torch.max(output, 1)
        total += target.size(0)
        correct += (predicted == target).sum().item()

    return total_loss / len(train_loader), 100 * correct / total

def evaluate(model, test_loader, device):
    model.eval()
    correct = 0
    total = 0

    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            _, predicted = torch.max(output, 1)
            total += target.size(0)
            correct += (predicted == target).sum().item()

    return 100 * correct / total

# ============================================================
# 6. 학습 실행
# ============================================================
print("\n" + "=" * 60)
print("CNN 학습 시작...")
print("=" * 60)

for epoch in range(epochs):
    train_loss, train_acc = train_one_epoch(model, train_loader, criterion, optimizer, device)
    test_acc = evaluate(model, test_loader, device)
    print(f"Epoch {epoch+1:2d}/{epochs} | "
          f"Loss: {train_loss:.4f} | "
          f"Train Acc: {train_acc:.2f}% | "
          f"Test Acc: {test_acc:.2f}%")

print("=" * 60)
print("학습 완료!")

# ============================================================
# 7. 최종 평가
# ============================================================
final_accuracy = evaluate(model, test_loader, device)
print(f"\n최종 테스트 정확도: {final_accuracy:.2f}%")

# ============================================================
# 8. 모델 저장
# ============================================================
torch.save(model.state_dict(), "mnist_cnn_classifier.pth")
print("모델 저장 완료: mnist_cnn_classifier.pth")

# ============================================================
# 9. MLP vs CNN 비교 요약
# ============================================================
print("\n" + "=" * 60)
print("MLP vs CNN 비교")
print("=" * 60)
print(f"""
| 항목           | MLP          | CNN          |
|----------------|--------------|--------------|
| 파라미터 수    | {mlp_params:,}     | {total_params:,}      |
| 예상 정확도    | ~98.2%       | ~99.2%+      |
| 위치 정보 보존 | X            | O            |
| 이동 불변성    | X            | O            |

CNN이 더 적은 파라미터로 더 높은 정확도를 달성합니다!
""")
