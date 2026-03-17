import torch
import torch.nn as nn
from torchvision import datasets, transforms
from torch.utils.data import DataLoader


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


def main():
    # 디바이스 설정
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"사용 디바이스: {device}")

    # 데이터 변환 정의
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])

    # MNIST 데이터셋 로드
    print("MNIST 데이터셋 로딩 중...")
    train_dataset = datasets.MNIST(root='./data', train=True, download=True, transform=transform)
    test_dataset = datasets.MNIST(root='./data', train=False, download=True, transform=transform)

    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

    # 모델 생성
    model = MNISTClassifier().to(device)
    print(f"\n모델 구조:\n{model}")

    # 손실 함수와 옵티마이저
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    # 학습
    epochs = 3
    print(f"\n{epochs} 에포크 학습 시작...")

    for epoch in range(epochs):
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

            if batch_idx % 200 == 0:
                print(f"  에포크 {epoch+1}/{epochs}, 배치 {batch_idx}/{len(train_loader)}, 손실: {loss.item():.4f}")

        avg_loss = total_loss / len(train_loader)
        print(f"에포크 {epoch+1} 완료 - 평균 손실: {avg_loss:.4f}")

    # 테스트
    print("\n테스트 중...")
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

    accuracy = 100 * correct / total
    print(f"\n테스트 정확도: {accuracy:.2f}% ({correct}/{total})")


if __name__ == "__main__":
    main()
