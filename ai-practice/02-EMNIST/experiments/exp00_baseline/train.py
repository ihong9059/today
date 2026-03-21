"""
EMNIST Baseline 학습 스크립트

영문자 + 숫자 인식 (47 클래스)

로컬 PC에서 실행:
    cd C:\\todo\\today\\ai-practice\\02-EMNIST\\experiments\\exp00_baseline
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
# EMNIST 클래스 매핑
# ============================================================

# ByMerge 47 클래스 라벨
EMNIST_LABELS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  # 0-9: 숫자
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',  # 10-19: 대문자
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',  # 20-29
    'U', 'V', 'W', 'X', 'Y', 'Z',                      # 30-35
    'a', 'b', 'd', 'e', 'f', 'g', 'h', 'n', 'q', 'r', 't'  # 36-46: 일부 소문자
]

NUM_CLASSES = len(EMNIST_LABELS)  # 47

# ============================================================
# 설정
# ============================================================

# 하이퍼파라미터
BATCH_SIZE = 128  # EMNIST는 데이터가 많아서 배치 크기 증가
EPOCHS = 15       # 클래스가 많아서 에포크 증가
LEARNING_RATE = 0.001

# 저장 경로
SAVE_DIR = '../../models'
RESULT_DIR = '../../results'
DATA_DIR = '../../data'

# 재현성
torch.manual_seed(42)

# ============================================================
# 디바이스 설정
# ============================================================

print("=" * 60)
print("EMNIST Baseline 학습 (영문자 + 숫자)")
print("=" * 60)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"\nPyTorch 버전: {torch.__version__}")
print(f"디바이스: {device}")
print(f"클래스 수: {NUM_CLASSES}")

if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")

# ============================================================
# 데이터 로드
# ============================================================

print("\n" + "-" * 40)
print("데이터 로드 (EMNIST ByMerge)")
print("-" * 40)

# EMNIST는 이미지가 전치(transpose)되어 있음 - 수정 필요
class EMNISTTransform:
    """EMNIST 이미지 전처리 (회전 + 반전 수정)"""
    def __init__(self):
        self.transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize((0.1307,), (0.3081,))
        ])

    def __call__(self, img):
        # EMNIST는 이미지가 전치되어 있어서 회전 필요
        img = transforms.functional.rotate(img, -90)
        img = transforms.functional.hflip(img)
        return self.transform(img)

transform = EMNISTTransform()

os.makedirs(DATA_DIR, exist_ok=True)

# EMNIST ByMerge 데이터셋
train_dataset = datasets.EMNIST(
    DATA_DIR,
    split='bymerge',  # 47 클래스
    train=True,
    download=True,
    transform=transform
)

test_dataset = datasets.EMNIST(
    DATA_DIR,
    split='bymerge',
    train=False,
    download=True,
    transform=transform
)

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False, num_workers=0)

print(f"학습 데이터: {len(train_dataset):,}장")
print(f"테스트 데이터: {len(test_dataset):,}장")
print(f"배치 크기: {BATCH_SIZE}")
print(f"클래스: {NUM_CLASSES}개 (0-9, A-Z, 일부 소문자)")

# ============================================================
# 모델 정의
# ============================================================

class CNN(nn.Module):
    """
    EMNIST용 CNN 모델
    MNIST와 동일한 구조, 출력만 47개로 변경
    """
    def __init__(self, num_classes=47):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)  # 레이어 추가
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(128 * 3 * 3, 256)  # 더 큰 FC
        self.fc2 = nn.Linear(256, num_classes)
        self.dropout = nn.Dropout(0.3)
        self.bn1 = nn.BatchNorm2d(32)
        self.bn2 = nn.BatchNorm2d(64)
        self.bn3 = nn.BatchNorm2d(128)

    def forward(self, x):
        # Conv Block 1: (B, 1, 28, 28) -> (B, 32, 14, 14)
        x = self.pool(F.relu(self.bn1(self.conv1(x))))

        # Conv Block 2: (B, 32, 14, 14) -> (B, 64, 7, 7)
        x = self.pool(F.relu(self.bn2(self.conv2(x))))

        # Conv Block 3: (B, 64, 7, 7) -> (B, 128, 3, 3)
        x = self.pool(F.relu(self.bn3(self.conv3(x))))

        # Flatten
        x = x.view(-1, 128 * 3 * 3)

        # FC layers
        x = self.dropout(F.relu(self.fc1(x)))
        x = self.fc2(x)
        return x

model = CNN(num_classes=NUM_CLASSES).to(device)

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
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.5)

print("\n" + "-" * 40)
print("학습 설정")
print("-" * 40)
print(f"에포크: {EPOCHS}")
print(f"학습률: {LEARNING_RATE} (5 에포크마다 0.5배)")
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

        # 진행 상황 (500 배치마다)
        if batch_idx % 500 == 0:
            print(f'    배치 [{batch_idx:>5}/{len(train_loader)}] Loss: {loss.item():.4f}')

    return total_loss / len(train_loader), 100. * correct / total


def evaluate(model, device, test_loader, criterion):
    """테스트 데이터로 평가"""
    model.eval()
    total_loss = 0
    correct = 0
    total = 0

    # 클래스별 정확도 계산용
    class_correct = [0] * NUM_CLASSES
    class_total = [0] * NUM_CLASSES

    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            total_loss += criterion(output, target).item()
            pred = output.argmax(dim=1)
            correct += pred.eq(target).sum().item()
            total += target.size(0)

            # 클래스별 통계
            for i in range(len(target)):
                label = target[i].item()
                class_correct[label] += pred[i].eq(target[i]).item()
                class_total[label] += 1

    return total_loss / len(test_loader), 100. * correct / total, class_correct, class_total

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

best_acc = 0

for epoch in range(1, EPOCHS + 1):
    print(f"\nEpoch {epoch}/{EPOCHS} (LR: {optimizer.param_groups[0]['lr']:.6f})")
    print("-" * 40)

    # 학습
    train_loss, train_acc = train_epoch(model, device, train_loader, optimizer, criterion)

    # 평가
    test_loss, test_acc, class_correct, class_total = evaluate(model, device, test_loader, criterion)

    # 스케줄러 스텝
    scheduler.step()

    # 기록
    history['train_loss'].append(train_loss)
    history['train_acc'].append(train_acc)
    history['test_loss'].append(test_loss)
    history['test_acc'].append(test_acc)

    print(f"\n  Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}%")
    print(f"  Test Loss:  {test_loss:.4f} | Test Acc:  {test_acc:.2f}%")

    # 최고 성능 모델 저장
    if test_acc > best_acc:
        best_acc = test_acc
        os.makedirs(SAVE_DIR, exist_ok=True)
        torch.save({
            'model_state_dict': model.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
            'epoch': epoch,
            'accuracy': test_acc
        }, os.path.join(SAVE_DIR, 'emnist_best.pt'))
        print(f"  ** Best model saved! (Acc: {test_acc:.2f}%)")

print("\n" + "=" * 60)
print(f"학습 완료! 최종 테스트 정확도: {history['test_acc'][-1]:.2f}%")
print(f"최고 테스트 정확도: {best_acc:.2f}%")
print("=" * 60)

# ============================================================
# 클래스별 정확도 출력
# ============================================================

print("\n" + "-" * 40)
print("클래스별 정확도 (상위/하위 5개)")
print("-" * 40)

class_acc = []
for i in range(NUM_CLASSES):
    if class_total[i] > 0:
        acc = 100. * class_correct[i] / class_total[i]
        class_acc.append((EMNIST_LABELS[i], acc, class_total[i]))

# 정확도 기준 정렬
class_acc.sort(key=lambda x: x[1], reverse=True)

print("\n[가장 잘 인식하는 문자]")
for char, acc, total in class_acc[:5]:
    print(f"  '{char}': {acc:.1f}% ({total}장)")

print("\n[가장 어려운 문자]")
for char, acc, total in class_acc[-5:]:
    print(f"  '{char}': {acc:.1f}% ({total}장)")

# ============================================================
# 결과 시각화
# ============================================================

print("\n" + "-" * 40)
print("결과 시각화")
print("-" * 40)

os.makedirs(RESULT_DIR, exist_ok=True)

fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# Loss 그래프
axes[0].plot(history['train_loss'], 'b-', label='Train', linewidth=2)
axes[0].plot(history['test_loss'], 'r-', label='Test', linewidth=2)
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Loss')
axes[0].set_title('EMNIST Loss Curve')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Accuracy 그래프
axes[1].plot(history['train_acc'], 'b-', label='Train', linewidth=2)
axes[1].plot(history['test_acc'], 'r-', label='Test', linewidth=2)
axes[1].set_xlabel('Epoch')
axes[1].set_ylabel('Accuracy (%)')
axes[1].set_title('EMNIST Accuracy Curve')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

# 클래스별 정확도 (상위 15개)
chars = [x[0] for x in class_acc[:15]]
accs = [x[1] for x in class_acc[:15]]
colors = ['green' if a > 95 else 'orange' if a > 85 else 'red' for a in accs]
axes[2].barh(range(len(chars)), accs, color=colors)
axes[2].set_yticks(range(len(chars)))
axes[2].set_yticklabels(chars)
axes[2].set_xlabel('Accuracy (%)')
axes[2].set_title('Top 15 Class Accuracy')
axes[2].set_xlim([80, 100])
axes[2].grid(True, alpha=0.3, axis='x')

plt.tight_layout()
plot_path = os.path.join(RESULT_DIR, 'emnist_learning_curves.png')
plt.savefig(plot_path, dpi=150)
print(f"학습 곡선 저장: {plot_path}")
plt.show()

# ============================================================
# 모델 저장
# ============================================================

print("\n" + "-" * 40)
print("모델 저장")
print("-" * 40)

# 최종 모델 저장
model_path = os.path.join(SAVE_DIR, 'emnist_cnn.pt')
torch.save({
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'history': history,
    'final_accuracy': history['test_acc'][-1],
    'best_accuracy': best_acc,
    'num_classes': NUM_CLASSES,
    'labels': EMNIST_LABELS
}, model_path)
print(f"모델 저장: {model_path}")

# 가중치만 저장
weights_path = os.path.join(SAVE_DIR, 'emnist_weights.pth')
torch.save(model.state_dict(), weights_path)
print(f"가중치 저장: {weights_path}")

# ============================================================
# 결과 저장 (JSON)
# ============================================================

result = {
    'experiment': 'EMNIST Baseline',
    'date': datetime.now().strftime('%Y-%m-%d %H:%M'),
    'device': str(device),
    'model': 'CNN (32-64-128-256-47)',
    'epochs': EPOCHS,
    'learning_rate': LEARNING_RATE,
    'batch_size': BATCH_SIZE,
    'num_classes': NUM_CLASSES,
    'final_train_acc': history['train_acc'][-1],
    'final_test_acc': history['test_acc'][-1],
    'best_test_acc': best_acc,
    'class_accuracy': {char: acc for char, acc, _ in class_acc}
}

json_path = os.path.join(RESULT_DIR, 'emnist_results.json')
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
print(f"결과 JSON 저장: {json_path}")

# ============================================================
# 완료
# ============================================================

print("\n" + "=" * 60)
print("EMNIST 학습 완료!")
print("=" * 60)
print(f"\n다음 단계:")
print(f"  1. python font_test.py  - PC 폰트로 테스트")
print(f"  2. python test.py       - 손글씨 이미지 테스트")
