"""
MNIST Baseline 학습 스크립트

로컬 PC에서 실행:
    cd C:\todo\today\ai-practice\01-MNIST\experiments\exp00_baseline
    python train.py

필요 패키지:
    pip install torch torchvision matplotlib numpy
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt
import numpy as np
import json
import os
from datetime import datetime

# ============================================================
# 설정
# ============================================================

# 하이퍼파라미터
BATCH_SIZE = 64
EPOCHS = 10
LEARNING_RATE = 0.001

# 저장 경로
SAVE_DIR = '../../models'
RESULT_DIR = '../../results'

# 재현성
torch.manual_seed(42)

# ============================================================
# 디바이스 설정
# ============================================================

print("=" * 60)
print("MNIST Baseline 학습")
print("=" * 60)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"\nPyTorch 버전: {torch.__version__}")
print(f"디바이스: {device}")

if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")

# ============================================================
# 데이터 로드
# ============================================================

print("\n" + "-" * 40)
print("데이터 로드")
print("-" * 40)

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

# 데이터 폴더
DATA_DIR = '../../data'
os.makedirs(DATA_DIR, exist_ok=True)

train_dataset = datasets.MNIST(DATA_DIR, train=True, download=True, transform=transform)
test_dataset = datasets.MNIST(DATA_DIR, train=False, download=True, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

print(f"학습 데이터: {len(train_dataset):,}장")
print(f"테스트 데이터: {len(test_dataset):,}장")
print(f"배치 크기: {BATCH_SIZE}")

# ============================================================
# 모델 정의
# ============================================================

class CNN(nn.Module):
    """
    간단한 CNN 모델
    Conv1(32) → Pool → Conv2(64) → Pool → FC(128) → FC(10)
    """
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.dropout = nn.Dropout(0.25)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))  # (B, 32, 14, 14)
        x = self.pool(F.relu(self.conv2(x)))  # (B, 64, 7, 7)
        x = x.view(-1, 64 * 7 * 7)            # Flatten
        x = self.dropout(F.relu(self.fc1(x)))
        x = self.fc2(x)
        return x

model = CNN().to(device)

print("\n" + "-" * 40)
print("모델 구조")
print("-" * 40)
print(model)
print(f"\n총 파라미터 수: {sum(p.numel() for p in model.parameters()):,}")

# ============================================================
# 학습 설정
# ============================================================

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)

print("\n" + "-" * 40)
print("학습 설정")
print("-" * 40)
print(f"에포크: {EPOCHS}")
print(f"학습률: {LEARNING_RATE}")
print(f"옵티마이저: Adam")
print(f"손실 함수: CrossEntropyLoss")

# ============================================================
# 학습 함수
# ============================================================

def train_epoch(model, device, train_loader, optimizer, criterion):
    """한 에포크 학습"""
    model.train()
    total_loss = 0
    correct = 0
    total = 0

    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)

        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()
        pred = output.argmax(dim=1)
        correct += pred.eq(target).sum().item()
        total += target.size(0)

        # 진행 상황 (200 배치마다)
        if batch_idx % 200 == 0:
            print(f'    배치 [{batch_idx:>4}/{len(train_loader)}] Loss: {loss.item():.4f}')

    return total_loss / len(train_loader), 100. * correct / total


def evaluate(model, device, test_loader, criterion):
    """테스트 데이터로 평가"""
    model.eval()
    total_loss = 0
    correct = 0
    total = 0

    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            total_loss += criterion(output, target).item()
            pred = output.argmax(dim=1)
            correct += pred.eq(target).sum().item()
            total += target.size(0)

    return total_loss / len(test_loader), 100. * correct / total

# ============================================================
# 학습 실행
# ============================================================

print("\n" + "=" * 60)
print("학습 시작")
print("=" * 60)

history = {
    'train_loss': [],
    'train_acc': [],
    'test_loss': [],
    'test_acc': []
}

for epoch in range(1, EPOCHS + 1):
    print(f"\nEpoch {epoch}/{EPOCHS}")
    print("-" * 40)

    # 학습
    train_loss, train_acc = train_epoch(model, device, train_loader, optimizer, criterion)

    # 평가
    test_loss, test_acc = evaluate(model, device, test_loader, criterion)

    # 기록
    history['train_loss'].append(train_loss)
    history['train_acc'].append(train_acc)
    history['test_loss'].append(test_loss)
    history['test_acc'].append(test_acc)

    print(f"\n  Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}%")
    print(f"  Test Loss:  {test_loss:.4f} | Test Acc:  {test_acc:.2f}%")

print("\n" + "=" * 60)
print(f"학습 완료! 최종 테스트 정확도: {history['test_acc'][-1]:.2f}%")
print("=" * 60)

# ============================================================
# 결과 시각화
# ============================================================

print("\n" + "-" * 40)
print("결과 시각화")
print("-" * 40)

os.makedirs(RESULT_DIR, exist_ok=True)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Loss 그래프
axes[0].plot(history['train_loss'], 'b-', label='Train', linewidth=2)
axes[0].plot(history['test_loss'], 'r-', label='Test', linewidth=2)
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Loss')
axes[0].set_title('Loss Curve')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Accuracy 그래프
axes[1].plot(history['train_acc'], 'b-', label='Train', linewidth=2)
axes[1].plot(history['test_acc'], 'r-', label='Test', linewidth=2)
axes[1].set_xlabel('Epoch')
axes[1].set_ylabel('Accuracy (%)')
axes[1].set_title('Accuracy Curve')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plot_path = os.path.join(RESULT_DIR, 'learning_curves.png')
plt.savefig(plot_path, dpi=150)
print(f"학습 곡선 저장: {plot_path}")
plt.show()

# ============================================================
# 모델 저장
# ============================================================

print("\n" + "-" * 40)
print("모델 저장")
print("-" * 40)

os.makedirs(SAVE_DIR, exist_ok=True)

# 전체 저장
model_path = os.path.join(SAVE_DIR, 'baseline_cnn.pt')
torch.save({
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'history': history,
    'final_accuracy': history['test_acc'][-1]
}, model_path)
print(f"모델 저장: {model_path}")

# 가중치만 저장
weights_path = os.path.join(SAVE_DIR, 'baseline_weights.pth')
torch.save(model.state_dict(), weights_path)
print(f"가중치 저장: {weights_path}")

# ============================================================
# 결과 저장 (JSON)
# ============================================================

result = {
    'experiment': 'EXP-00 Baseline',
    'date': datetime.now().strftime('%Y-%m-%d %H:%M'),
    'device': str(device),
    'model': 'CNN (32-64-128-10)',
    'epochs': EPOCHS,
    'learning_rate': LEARNING_RATE,
    'batch_size': BATCH_SIZE,
    'final_train_acc': history['train_acc'][-1],
    'final_test_acc': history['test_acc'][-1],
    'final_train_loss': history['train_loss'][-1],
    'final_test_loss': history['test_loss'][-1]
}

json_path = os.path.join(RESULT_DIR, 'exp00_results.json')
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
print(f"결과 JSON 저장: {json_path}")

# ============================================================
# 완료
# ============================================================

print("\n" + "=" * 60)
print("실험 완료!")
print("=" * 60)
print(f"\n다음 단계: python font_test.py 실행하여 PC 폰트로 테스트")
