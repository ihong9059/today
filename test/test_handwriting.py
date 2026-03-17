"""
손글씨 숫자 인식 테스트
1. 자동 생성된 손글씨 스타일 이미지 테스트
2. 직접 그린 이미지 파일 테스트
"""

import torch
import torch.nn as nn
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import os
import random


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


def generate_handwritten_digit(digit, save_path=None):
    """
    손글씨 스타일의 숫자 이미지 생성
    - 랜덤 위치, 크기, 회전, 두께 변화 적용
    """
    # 더 큰 캔버스에서 작업 후 축소 (안티앨리어싱 효과)
    canvas_size = 140
    img = Image.new('L', (canvas_size, canvas_size), color=0)  # 검은 배경
    draw = ImageDraw.Draw(img)

    # 폰트 크기 랜덤 (손글씨 크기 변화)
    font_size = random.randint(80, 110)

    # 시스템 폰트 사용 시도
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
        except:
            font = ImageFont.load_default()

    # 텍스트 크기 계산
    text = str(digit)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # 랜덤 위치 (중앙 근처에서 약간 벗어남)
    x = (canvas_size - text_width) // 2 + random.randint(-15, 15)
    y = (canvas_size - text_height) // 2 + random.randint(-15, 15)

    # 흰색으로 숫자 그리기
    draw.text((x, y), text, fill=255, font=font)

    # 랜덤 회전 (-15도 ~ +15도)
    angle = random.uniform(-15, 15)
    img = img.rotate(angle, resample=Image.BILINEAR, fillcolor=0)

    # 약간의 블러 (손글씨 느낌)
    img = img.filter(ImageFilter.GaussianBlur(radius=random.uniform(0.5, 1.5)))

    # 28x28로 리사이즈
    img = img.resize((28, 28), Image.LANCZOS)

    # 대비 조정 (MNIST와 유사하게)
    img_array = np.array(img, dtype=np.float32)
    if img_array.max() > 0:
        img_array = img_array / img_array.max() * 255
    img = Image.fromarray(img_array.astype(np.uint8))

    if save_path:
        img.save(save_path)
        print(f"  이미지 저장됨: {save_path}")

    return img


def preprocess_image(img):
    """이미지를 모델 입력 형태로 전처리"""
    # PIL Image를 numpy 배열로
    img_array = np.array(img, dtype=np.float32)

    # 0-255 -> 0-1 정규화
    img_array = img_array / 255.0

    # MNIST 정규화 적용
    img_array = (img_array - 0.1307) / 0.3081

    # 텐서로 변환 (배치 차원, 채널 차원 추가)
    tensor = torch.FloatTensor(img_array).unsqueeze(0).unsqueeze(0)

    return tensor


def load_and_preprocess_image(image_path):
    """외부 이미지 파일 로드 및 전처리"""
    # 이미지 로드
    img = Image.open(image_path)

    # 그레이스케일 변환
    img = img.convert('L')

    # 28x28로 리사이즈
    img = img.resize((28, 28), Image.LANCZOS)

    # 이미지 분석: 배경이 밝으면 반전 (MNIST는 검은 배경, 흰 글씨)
    img_array = np.array(img)
    if img_array.mean() > 127:  # 밝은 배경이면
        img_array = 255 - img_array  # 반전
        img = Image.fromarray(img_array)

    return img


def predict_digit(model, img, device):
    """이미지에서 숫자 예측"""
    model.eval()
    tensor = preprocess_image(img).to(device)

    with torch.no_grad():
        output = model(tensor)
        probabilities = torch.softmax(output, dim=1)
        predicted = torch.argmax(probabilities, dim=1).item()
        confidence = probabilities[0][predicted].item() * 100

    return predicted, confidence, probabilities[0].cpu().numpy()


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
    print("=" * 60)

    # ========================================
    # 1. 자동 생성 손글씨 테스트
    # ========================================
    print("\n[테스트 1] 자동 생성 손글씨 이미지 테스트")
    print("-" * 60)

    # generated_digits 폴더 생성
    os.makedirs("generated_digits", exist_ok=True)

    correct = 0
    total = 10

    for digit in range(10):
        # 손글씨 스타일 이미지 생성
        img = generate_handwritten_digit(digit, f"generated_digits/digit_{digit}.png")

        # 예측
        predicted, confidence, probs = predict_digit(model, img, device)

        is_correct = predicted == digit
        correct += is_correct
        status = "✓" if is_correct else "✗"

        print(f"\n  숫자 {digit}:")
        visualize_image_ascii(img)
        print(f"  예측: {predicted} (신뢰도: {confidence:.1f}%) {status}")

        # 상위 3개 예측 표시
        top3_idx = np.argsort(probs)[-3:][::-1]
        print(f"  상위 3개: ", end="")
        for idx in top3_idx:
            print(f"{idx}({probs[idx]*100:.1f}%) ", end="")
        print()

    print(f"\n  자동 생성 테스트 정확도: {correct}/{total} ({correct/total*100:.0f}%)")
    print("=" * 60)

    # ========================================
    # 2. 외부 이미지 파일 테스트
    # ========================================
    print("\n[테스트 2] 외부 이미지 파일 테스트")
    print("-" * 60)

    # 테스트용 샘플 이미지 생성 (사용자가 직접 그린 것처럼)
    sample_dir = "my_handwriting"
    os.makedirs(sample_dir, exist_ok=True)

    # 샘플 이미지 몇 개 생성 (실제로는 사용자가 그림판에서 그림)
    print("\n  샘플 이미지 생성 중 (실제로는 직접 그린 이미지 사용)...")
    sample_digits = [3, 7, 5]

    for digit in sample_digits:
        # 약간 다른 스타일로 생성
        img = Image.new('L', (100, 100), color=255)  # 흰 배경 (그림판 스타일)
        draw = ImageDraw.Draw(img)

        try:
            font = ImageFont.truetype("arial.ttf", 70)
        except:
            font = ImageFont.load_default()

        # 검은색 숫자
        draw.text((20, 10), str(digit), fill=0, font=font)

        # 저장
        path = f"{sample_dir}/my_digit_{digit}.png"
        img.save(path)
        print(f"    생성됨: {path}")

    # 외부 이미지 테스트
    print("\n  외부 이미지 예측 결과:")
    for digit in sample_digits:
        path = f"{sample_dir}/my_digit_{digit}.png"

        if os.path.exists(path):
            # 이미지 로드 및 전처리
            img = load_and_preprocess_image(path)

            # 예측
            predicted, confidence, probs = predict_digit(model, img, device)

            print(f"\n  파일: {path}")
            visualize_image_ascii(img)
            print(f"  예측: {predicted} (신뢰도: {confidence:.1f}%)")

    print("=" * 60)
    print("\n사용법:")
    print("  1. 그림판에서 28x28 ~ 100x100 크기로 숫자를 그립니다")
    print("  2. 'my_handwriting' 폴더에 PNG로 저장합니다")
    print("  3. 이 스크립트를 실행하면 자동으로 인식합니다")
    print("\n생성된 파일:")
    print("  - generated_digits/digit_0~9.png (자동 생성)")
    print("  - my_handwriting/my_digit_*.png (샘플)")


if __name__ == "__main__":
    main()
