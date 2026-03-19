# ============================================================
# MNIST 추론(예측) 예제
# 저장된 모델(mnist_classifier.pth)을 불러와서 예측합니다.
#
# 실행 방법:
#   ./venv/bin/python mnist_predict.py
# ============================================================

import torch
import torch.nn as nn
from torchvision import datasets, transforms
import random

# ============================================================
# 1. 모델 구조 정의 (학습할 때와 동일해야 함)
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

# ============================================================
# 2. 저장된 가중치 불러오기
# ============================================================
model = MNISTClassifier()

# .pth 파일에서 가중치 로드
model.load_state_dict(torch.load("mnist_classifier.pth", weights_only=True))

# 평가 모드로 전환 (Dropout 비활성화)
model.eval()

print("모델 로드 완료: mnist_classifier.pth")
print("-" * 50)

# ============================================================
# 3. 테스트 데이터 준비
# ============================================================
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

test_dataset = datasets.MNIST(root="./data", train=False, download=True, transform=transform)

# ============================================================
# 4. 랜덤 샘플 예측
# ============================================================
print("\n🔮 랜덤 샘플 5개 예측 결과:\n")

for i in range(5):
    # 랜덤 인덱스 선택
    idx = random.randint(0, len(test_dataset) - 1)
    image, label = test_dataset[idx]

    # 예측 수행
    with torch.no_grad():
        output = model(image.unsqueeze(0))  # 배치 차원 추가
        probabilities = torch.softmax(output, dim=1)
        predicted = torch.argmax(output, dim=1).item()
        confidence = probabilities[0][predicted].item() * 100

    # 결과 출력
    status = "✅" if predicted == label else "❌"
    print(f"  샘플 {i+1}: 정답={label}, 예측={predicted}, 확신도={confidence:.1f}% {status}")

# ============================================================
# 5. 전체 테스트셋 정확도
# ============================================================
print("\n" + "-" * 50)
print("📊 전체 테스트셋 평가 중...")

correct = 0
total = 0

with torch.no_grad():
    for image, label in test_dataset:
        output = model(image.unsqueeze(0))
        predicted = torch.argmax(output, dim=1).item()
        total += 1
        if predicted == label:
            correct += 1

accuracy = 100 * correct / total
print(f"✅ 전체 정확도: {accuracy:.2f}% ({correct}/{total})")

# ============================================================
# 6. 숫자별 정확도
# ============================================================
print("\n📈 숫자별 정확도:")

digit_correct = [0] * 10
digit_total = [0] * 10

with torch.no_grad():
    for image, label in test_dataset:
        output = model(image.unsqueeze(0))
        predicted = torch.argmax(output, dim=1).item()
        digit_total[label] += 1
        if predicted == label:
            digit_correct[label] += 1

for digit in range(10):
    acc = 100 * digit_correct[digit] / digit_total[digit]
    bar = "█" * int(acc // 5)
    print(f"  {digit}: {acc:5.1f}% {bar}")
