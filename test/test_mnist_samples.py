"""
my_handwriting 폴더의 MNIST 샘플 이미지 테스트
"""

import torch
import torch.nn as nn
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from PIL import Image
import numpy as np
import os


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


def train_model(device):
    """모델 학습"""
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])

    print("MNIST 데이터셋 로딩 중...")
    train_dataset = datasets.MNIST(root='./data', train=True, download=True, transform=transform)
    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)

    model = MNISTClassifier().to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    print("3 에포크 학습 시작...")
    for epoch in range(3):
        model.train()
        total_loss = 0
        for batch_idx, (data, target) in enumerate(train_loader):
            data, target = data.to(device), target.to(device)
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f"  에포크 {epoch+1}/3 완료 - 평균 손실: {total_loss/len(train_loader):.4f}")

    return model


def preprocess_image(img):
    """이미지를 모델 입력 형태로 전처리"""
    img_array = np.array(img, dtype=np.float32)
    img_array = img_array / 255.0
    img_array = (img_array - 0.1307) / 0.3081
    tensor = torch.FloatTensor(img_array).unsqueeze(0).unsqueeze(0)
    return tensor


def visualize_image_ascii(img):
    """이미지를 ASCII 아트로 시각화"""
    img_array = np.array(img)
    chars = " .:-=+*#%@"

    print("  +" + "-" * 28 + "+")
    for row in img_array:
        line = "  |"
        for pixel in row:
            idx = int(pixel / 255 * (len(chars) - 1))
            line += chars[idx]
        line += "|"
        print(line)
    print("  +" + "-" * 28 + "+")


def main():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"사용 디바이스: {device}")
    print("=" * 60)

    # 모델 학습
    model = train_model(device)
    model.eval()
    print("=" * 60)

    # my_handwriting 폴더의 MNIST 샘플 테스트
    sample_dir = "C:/todo/today/test/my_handwriting"

    print("\n[MNIST 테스트셋 샘플 테스트]")
    print("-" * 60)

    correct = 0
    total = 0

    for digit in range(10):
        path = f"{sample_dir}/mnist_{digit}.png"

        if os.path.exists(path):
            # 이미지 로드
            img = Image.open(path).convert('L')
            img_array = np.array(img)

            # 예측
            tensor = preprocess_image(img).to(device)

            with torch.no_grad():
                output = model(tensor)
                probabilities = torch.softmax(output, dim=1)
                predicted = torch.argmax(probabilities, dim=1).item()
                confidence = probabilities[0][predicted].item() * 100

            is_correct = predicted == digit
            correct += is_correct
            total += 1
            status = "✓" if is_correct else "✗"

            print(f"\n  파일: mnist_{digit}.png (정답: {digit})")
            visualize_image_ascii(img)
            print(f"  예측: {predicted} (신뢰도: {confidence:.1f}%) {status}")

            # 상위 3개 예측 표시
            probs = probabilities[0].cpu().numpy()
            top3_idx = np.argsort(probs)[-3:][::-1]
            print(f"  상위 3개: ", end="")
            for idx in top3_idx:
                print(f"{idx}({probs[idx]*100:.1f}%) ", end="")
            print()

    print("\n" + "=" * 60)
    print(f"MNIST 테스트셋 샘플 정확도: {correct}/{total} ({correct/total*100:.0f}%)")
    print("=" * 60)


if __name__ == "__main__":
    main()
