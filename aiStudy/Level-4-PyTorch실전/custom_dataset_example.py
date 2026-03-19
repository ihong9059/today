# ============================================================
# 커스텀 데이터셋 예제
# MNIST처럼 준비된 데이터가 없을 때 직접 데이터를 만드는 방법
#
# 실행 방법:
#   ./venv/bin/python custom_dataset_example.py
# ============================================================

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
import os

# ============================================================
# 1. 가상의 데이터 생성 (실제로는 이미지/CSV 파일 등)
# ============================================================
print("=" * 60)
print("Step 1: 데이터 생성")
print("=" * 60)

# 예시: 3개 클래스의 2D 점 데이터
# 실제 프로젝트에서는 이미지 파일, CSV 파일 등을 사용

np.random.seed(42)

# 클래스 0: 중심 (0, 0) 주변의 점들
class_0_x = np.random.randn(100, 2) + np.array([0, 0])
class_0_y = np.zeros(100)

# 클래스 1: 중심 (3, 3) 주변의 점들
class_1_x = np.random.randn(100, 2) + np.array([3, 3])
class_1_y = np.ones(100)

# 클래스 2: 중심 (-3, 3) 주변의 점들
class_2_x = np.random.randn(100, 2) + np.array([-3, 3])
class_2_y = np.full(100, 2)

# 데이터 합치기
X = np.vstack([class_0_x, class_1_x, class_2_x]).astype(np.float32)
y = np.hstack([class_0_y, class_1_y, class_2_y]).astype(np.int64)

print(f"전체 데이터: {len(X)}개")
print(f"특성 shape: {X.shape}")
print(f"클래스별 개수: 클래스0={sum(y==0)}, 클래스1={sum(y==1)}, 클래스2={sum(y==2)}")

# ============================================================
# 2. 커스텀 Dataset 클래스 정의
# ============================================================
print("\n" + "=" * 60)
print("Step 2: 커스텀 Dataset 클래스")
print("=" * 60)

class PointDataset(Dataset):
    """
    커스텀 Dataset 클래스

    모든 Dataset은 3가지 메서드를 구현해야 함:
    - __init__: 데이터 로드/초기화
    - __len__: 데이터 개수 반환
    - __getitem__: 인덱스로 샘플 반환
    """

    def __init__(self, features, labels):
        """
        Args:
            features: numpy array 또는 리스트 (입력 데이터)
            labels: numpy array 또는 리스트 (정답 라벨)
        """
        # numpy → torch tensor 변환
        self.features = torch.FloatTensor(features)
        self.labels = torch.LongTensor(labels)

        print(f"Dataset 생성 완료: {len(self)}개 샘플")

    def __len__(self):
        """데이터셋 크기 반환"""
        return len(self.labels)

    def __getitem__(self, idx):
        """
        인덱스에 해당하는 샘플 반환

        Returns:
            feature: 입력 텐서
            label: 정답 라벨
        """
        return self.features[idx], self.labels[idx]

# 전체 데이터셋 생성
full_dataset = PointDataset(X, y)

# 샘플 확인
sample_feature, sample_label = full_dataset[0]
print(f"샘플 feature: {sample_feature}, label: {sample_label}")

# ============================================================
# 3. Train/Validation 분할
# ============================================================
print("\n" + "=" * 60)
print("Step 3: 데이터 분할 (Train 80% / Val 20%)")
print("=" * 60)

from torch.utils.data import random_split

train_size = int(0.8 * len(full_dataset))
val_size = len(full_dataset) - train_size

train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])

print(f"학습 데이터: {len(train_dataset)}개")
print(f"검증 데이터: {len(val_dataset)}개")

# ============================================================
# 4. DataLoader 생성
# ============================================================
print("\n" + "=" * 60)
print("Step 4: DataLoader 생성")
print("=" * 60)

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True
)

val_loader = DataLoader(
    val_dataset,
    batch_size=32,
    shuffle=False
)

# 배치 확인
for batch_features, batch_labels in train_loader:
    print(f"배치 feature shape: {batch_features.shape}")
    print(f"배치 label shape: {batch_labels.shape}")
    break

# ============================================================
# 5. 모델 정의
# ============================================================
print("\n" + "=" * 60)
print("Step 5: 모델 정의")
print("=" * 60)

class SimpleClassifier(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_classes):
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, num_classes)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = torch.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

model = SimpleClassifier(
    input_dim=2,       # 입력 차원 (2D 점)
    hidden_dim=64,     # 은닉층 크기
    num_classes=3      # 클래스 수
)

print(f"모델 구조:\n{model}")
print(f"파라미터 수: {sum(p.numel() for p in model.parameters()):,}개")

# ============================================================
# 6. 학습 설정
# ============================================================
print("\n" + "=" * 60)
print("Step 6: 학습 설정")
print("=" * 60)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)
epochs = 50

print(f"손실 함수: CrossEntropyLoss")
print(f"옵티마이저: Adam (lr=0.01)")
print(f"에폭 수: {epochs}")

# ============================================================
# 7. 학습 및 검증 함수
# ============================================================
def train_epoch(model, dataloader, criterion, optimizer):
    model.train()
    total_loss = 0
    correct = 0
    total = 0

    for features, labels in dataloader:
        optimizer.zero_grad()
        outputs = model(features)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    return total_loss / len(dataloader), 100 * correct / total

def validate(model, dataloader, criterion):
    model.eval()
    total_loss = 0
    correct = 0
    total = 0

    with torch.no_grad():
        for features, labels in dataloader:
            outputs = model(features)
            loss = criterion(outputs, labels)

            total_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    return total_loss / len(dataloader), 100 * correct / total

# ============================================================
# 8. 학습 실행
# ============================================================
print("\n" + "=" * 60)
print("Step 7: 학습 실행")
print("=" * 60)

best_val_acc = 0.0

for epoch in range(epochs):
    train_loss, train_acc = train_epoch(model, train_loader, criterion, optimizer)
    val_loss, val_acc = validate(model, val_loader, criterion)

    # 10 에폭마다 출력
    if (epoch + 1) % 10 == 0:
        print(f"Epoch {epoch+1:2d}/{epochs} | "
              f"Train Loss: {train_loss:.4f}, Acc: {train_acc:.1f}% | "
              f"Val Loss: {val_loss:.4f}, Acc: {val_acc:.1f}%")

    # 최고 성능 모델 저장
    if val_acc > best_val_acc:
        best_val_acc = val_acc
        torch.save(model.state_dict(), "custom_model.pth")

print(f"\n최고 검증 정확도: {best_val_acc:.1f}%")
print("모델 저장 완료: custom_model.pth")

# ============================================================
# 9. 새로운 데이터로 예측
# ============================================================
print("\n" + "=" * 60)
print("Step 8: 새로운 데이터 예측")
print("=" * 60)

# 저장된 모델 로드
model.load_state_dict(torch.load("custom_model.pth", weights_only=True))
model.eval()

# 새로운 점 데이터
new_points = torch.FloatTensor([
    [0.5, 0.5],    # 클래스 0 근처
    [2.8, 3.2],    # 클래스 1 근처
    [-2.5, 2.8],   # 클래스 2 근처
])

class_names = ["클래스0 (원점)", "클래스1 (3,3)", "클래스2 (-3,3)"]

print("새로운 점 예측 결과:")
with torch.no_grad():
    outputs = model(new_points)
    probabilities = torch.softmax(outputs, dim=1)
    _, predictions = torch.max(outputs, dim=1)

    for i, (point, pred, prob) in enumerate(zip(new_points, predictions, probabilities)):
        conf = prob[pred].item() * 100
        print(f"  점 ({point[0]:.1f}, {point[1]:.1f}) → {class_names[pred]} (확신도: {conf:.1f}%)")

# ============================================================
# 정리
# ============================================================
print("\n" + "=" * 60)
print("요약: 커스텀 데이터셋 파이프라인")
print("=" * 60)
print("""
1. 데이터 준비 (numpy array, 파일 등)
2. Dataset 클래스 구현 (__init__, __len__, __getitem__)
3. random_split으로 Train/Val 분할
4. DataLoader로 배치 공급
5. 모델 정의 (nn.Module)
6. 학습 설정 (criterion, optimizer)
7. 학습 루프 실행
8. 모델 저장 및 추론
""")
