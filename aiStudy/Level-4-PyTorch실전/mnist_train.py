# ============================================================
# MNIST 손글씨 분류 - 전체 통합 코드
# 이 파일 하나로 전체 학습 파이프라인을 실행할 수 있습니다.
#
# 실행 방법:
#   python mnist_train.py
#
# 필요 라이브러리:
#   pip install torch torchvision
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
print("\n학습 시작...")
print("-" * 50)

for epoch in range(epochs):
    avg_loss = train_one_epoch(model, train_loader, criterion, optimizer, device)
    accuracy = evaluate(model, test_loader, device)
    print(f"Epoch {epoch+1:2d}/{epochs} | Loss: {avg_loss:.4f} | Test Accuracy: {accuracy:.2f}%")

print("-" * 50)
print("학습 완료!")

# ============================================================
# 8. 최종 평가
# ============================================================
final_accuracy = evaluate(model, test_loader, device)
print(f"\n최종 테스트 정확도: {final_accuracy:.2f}%")

# ============================================================
# 9. 모델 저장 (선택사항)
# ============================================================
torch.save(model.state_dict(), "mnist_classifier.pth")
print("모델 저장 완료: mnist_classifier.pth")
