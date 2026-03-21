"""
EMNIST PC 폰트 테스트 스크립트

PC에 설치된 폰트로 문자를 생성하고 인식 테스트

사용법:
    cd experiments/exp00_baseline
    python font_test.py

필요 패키지:
    pip install torch torchvision pillow matplotlib numpy
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt
import os
import json

# ============================================================
# EMNIST 클래스 매핑
# ============================================================

EMNIST_LABELS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'd', 'e', 'f', 'g', 'h', 'n', 'q', 'r', 't'
]

NUM_CLASSES = len(EMNIST_LABELS)

# 테스트할 문자들 (숫자 + 대문자 위주)
TEST_CHARS = list('0123456789ABCDEFGHIJ')  # 20개

# ============================================================
# 설정
# ============================================================

MODEL_PATH = '../../models/emnist_cnn.pt'
RESULT_DIR = '../../results'

# 테스트할 폰트 목록 (Windows)
TEST_FONTS = [
    ('Arial', 'C:/Windows/Fonts/arial.ttf'),
    ('Times New Roman', 'C:/Windows/Fonts/times.ttf'),
    ('Courier New', 'C:/Windows/Fonts/cour.ttf'),
    ('Verdana', 'C:/Windows/Fonts/verdana.ttf'),
    ('Georgia', 'C:/Windows/Fonts/georgia.ttf'),
]

# ============================================================
# 모델 정의
# ============================================================

class CNN(nn.Module):
    def __init__(self, num_classes=47):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(128 * 3 * 3, 256)
        self.fc2 = nn.Linear(256, num_classes)
        self.dropout = nn.Dropout(0.3)
        self.bn1 = nn.BatchNorm2d(32)
        self.bn2 = nn.BatchNorm2d(64)
        self.bn3 = nn.BatchNorm2d(128)

    def forward(self, x):
        x = self.pool(F.relu(self.bn1(self.conv1(x))))
        x = self.pool(F.relu(self.bn2(self.conv2(x))))
        x = self.pool(F.relu(self.bn3(self.conv3(x))))
        x = x.view(-1, 128 * 3 * 3)
        x = self.dropout(F.relu(self.fc1(x)))
        x = self.fc2(x)
        return x

# ============================================================
# 이미지 생성 및 전처리
# ============================================================

def create_char_image(char, font_path, size=28):
    """폰트로 문자 이미지 생성"""
    canvas_size = 100
    img = Image.new('L', (canvas_size, canvas_size), color=255)

    try:
        font = ImageFont.truetype(font_path, 70)
    except:
        font = ImageFont.load_default()

    draw = ImageDraw.Draw(img)

    bbox = draw.textbbox((0, 0), char, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (canvas_size - text_width) // 2 - bbox[0]
    y = (canvas_size - text_height) // 2 - bbox[1]

    draw.text((x, y), char, fill=0, font=font)

    img = img.resize((size, size), Image.Resampling.LANCZOS)

    return img


def preprocess_image(img):
    """이미지 전처리"""
    img_array = np.array(img, dtype=np.float32)

    # 색상 반전 (흰 배경 -> 검은 배경)
    img_array = 255 - img_array

    # 정규화
    img_array = img_array / 255.0
    img_array = (img_array - 0.1307) / 0.3081

    # 텐서 변환
    tensor = torch.tensor(img_array).unsqueeze(0).unsqueeze(0)

    return tensor


def predict_char(model, device, tensor):
    """문자 예측"""
    model.eval()

    with torch.no_grad():
        tensor = tensor.to(device)
        output = model(tensor)
        probs = F.softmax(output, dim=1)[0]
        pred_idx = output.argmax(dim=1).item()
        pred_char = EMNIST_LABELS[pred_idx]
        confidence = probs[pred_idx].item()

    return pred_char, confidence

# ============================================================
# 메인 함수
# ============================================================

def main():
    print("=" * 60)
    print("EMNIST Font Test")
    print("=" * 60)

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"\nDevice: {device}")

    # 모델 로드
    model = CNN(num_classes=NUM_CLASSES).to(device)

    if not os.path.exists(MODEL_PATH):
        print(f"\nError: Model not found at {MODEL_PATH}")
        print("Please run train.py first.")
        return

    try:
        checkpoint = torch.load(MODEL_PATH, map_location=device)
        model.load_state_dict(checkpoint['model_state_dict'])
        print(f"Model loaded: {MODEL_PATH}")
    except Exception as e:
        print(f"Model load failed: {e}")
        return

    model.eval()

    # 사용 가능한 폰트 확인
    available_fonts = []
    for font_name, font_path in TEST_FONTS:
        if os.path.exists(font_path):
            available_fonts.append((font_name, font_path))
        else:
            print(f"Font not found: {font_name} ({font_path})")

    if not available_fonts:
        print("\nNo fonts available for testing!")
        return

    print(f"\nAvailable fonts: {len(available_fonts)}")
    print(f"Test characters: {len(TEST_CHARS)} ({TEST_CHARS[0]}...{TEST_CHARS[-1]})")

    # 테스트 실행
    print("\n" + "-" * 40)
    print("Font Test Results")
    print("-" * 40)

    results = {}
    all_images = []

    for font_name, font_path in available_fonts:
        font_results = []
        font_images = []

        for char in TEST_CHARS:
            # 이미지 생성
            img = create_char_image(char, font_path)

            # 전처리
            tensor = preprocess_image(img)

            # 예측
            pred, conf = predict_char(model, device, tensor)

            # 결과 저장
            is_correct = (pred.upper() == char.upper())  # 대소문자 무시 비교
            font_results.append({
                'char': char,
                'pred': pred,
                'confidence': conf,
                'correct': is_correct
            })

            font_images.append({
                'image': np.array(img),
                'char': char,
                'pred': pred,
                'correct': is_correct
            })

        # 폰트별 정확도 계산
        accuracy = sum(1 for r in font_results if r['correct']) / len(font_results) * 100
        results[font_name] = {
            'accuracy': accuracy,
            'details': font_results
        }

        all_images.append({
            'font_name': font_name,
            'images': font_images
        })

        # 결과 출력
        bar = '=' * int(accuracy / 10)
        print(f"  {font_name:20s} {accuracy:5.1f}% {bar}")

    # 평균 정확도
    avg_accuracy = np.mean([r['accuracy'] for r in results.values()])
    print("-" * 40)
    print(f"  {'Average':20s} {avg_accuracy:5.1f}%")

    # 시각화
    print("\n" + "-" * 40)
    print("Visualization")
    print("-" * 40)

    os.makedirs(RESULT_DIR, exist_ok=True)

    # 폰트별 결과 그리드
    num_fonts = len(all_images)
    num_chars = len(TEST_CHARS)

    fig, axes = plt.subplots(num_fonts, min(num_chars, 10), figsize=(15, num_fonts * 2))

    if num_fonts == 1:
        axes = axes.reshape(1, -1)

    for row, font_data in enumerate(all_images):
        for col in range(min(num_chars, 10)):
            ax = axes[row, col]
            img_data = font_data['images'][col]

            ax.imshow(img_data['image'], cmap='gray')

            color = 'green' if img_data['correct'] else 'red'
            ax.set_title(f"{img_data['char']}->{img_data['pred']}", fontsize=8, color=color)
            ax.axis('off')

            if col == 0:
                ax.set_ylabel(font_data['font_name'], fontsize=10, rotation=0, ha='right')

    plt.suptitle(f'EMNIST Font Test Results (Avg: {avg_accuracy:.1f}%)', fontsize=14)
    plt.tight_layout()

    plot_path = os.path.join(RESULT_DIR, 'emnist_font_test.png')
    plt.savefig(plot_path, dpi=150, bbox_inches='tight')
    print(f"Result image saved: {plot_path}")
    plt.show()

    # JSON 저장
    json_results = {
        'average_accuracy': avg_accuracy,
        'fonts': results
    }

    json_path = os.path.join(RESULT_DIR, 'emnist_font_test.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_results, f, indent=2, ensure_ascii=False)
    print(f"JSON saved: {json_path}")

    # 혼동 분석
    print("\n" + "-" * 40)
    print("Confusion Analysis")
    print("-" * 40)

    confusion = {}
    for font_data in results.values():
        for detail in font_data['details']:
            if not detail['correct']:
                key = f"{detail['char']} -> {detail['pred']}"
                confusion[key] = confusion.get(key, 0) + 1

    if confusion:
        print("\nMost confused pairs:")
        sorted_confusion = sorted(confusion.items(), key=lambda x: x[1], reverse=True)
        for pair, count in sorted_confusion[:5]:
            print(f"  {pair}: {count} times")
    else:
        print("\nNo confusion! All characters recognized correctly.")

    print("\n" + "=" * 60)
    print("Font test completed!")
    print("=" * 60)


if __name__ == '__main__':
    main()
