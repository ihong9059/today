"""
손글씨/그림 파일 숫자 인식 테스트

사용법:
    python handwriting_test.py                    # 기본 폴더(my_digits/)의 모든 이미지
    python handwriting_test.py image.png          # 단일 이미지
    python handwriting_test.py folder/            # 특정 폴더의 모든 이미지
    python handwriting_test.py img1.png img2.jpg  # 여러 이미지

지원 형식:
    PNG, JPG, JPEG, BMP, GIF

이미지 요구사항:
    - 크기: 자유 (자동으로 28x28로 변환)
    - 배경: 흰색 또는 검은색 (자동 감지)
    - 숫자: 0~9

필요 패키지:
    pip install torch torchvision pillow matplotlib numpy
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from PIL import Image, ImageOps, ImageFilter
import matplotlib.pyplot as plt
import os
import sys
import glob
from datetime import datetime

# ============================================================
# 설정
# ============================================================

# 모델 경로
MODEL_PATH = '../../models/baseline_cnn.pt'

# 기본 이미지 폴더
DEFAULT_IMAGE_DIR = '../../my_digits'

# 지원 이미지 확장자
SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.bmp', '.gif']

# ============================================================
# 모델 정의 (학습 시와 동일해야 함)
# ============================================================

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.dropout = nn.Dropout(0.25)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 7 * 7)
        x = self.dropout(F.relu(self.fc1(x)))
        x = self.fc2(x)
        return x

# ============================================================
# 이미지 전처리 함수
# ============================================================

def detect_background(img_array):
    """
    배경색 자동 감지 (흰색 또는 검은색)

    Returns:
        'white' 또는 'black'
    """
    # 모서리 픽셀들의 평균값으로 판단
    h, w = img_array.shape[:2]

    # 모서리 영역 (10% 크기)
    margin_h = max(1, h // 10)
    margin_w = max(1, w // 10)

    corners = [
        img_array[:margin_h, :margin_w],           # 좌상
        img_array[:margin_h, -margin_w:],          # 우상
        img_array[-margin_h:, :margin_w],          # 좌하
        img_array[-margin_h:, -margin_w:]          # 우하
    ]

    corner_mean = np.mean([np.mean(c) for c in corners])

    # 128을 기준으로 판단
    return 'white' if corner_mean > 128 else 'black'


def center_and_resize(img, target_size=28):
    """
    이미지를 중앙 정렬하고 리사이즈

    - 숫자 영역을 찾아서 중앙에 배치
    - 20x20 영역에 맞추고 4픽셀 여백 추가 (MNIST 스타일)
    """
    img_array = np.array(img)

    # 숫자가 있는 영역 찾기 (0이 아닌 픽셀)
    rows = np.any(img_array > 20, axis=1)
    cols = np.any(img_array > 20, axis=0)

    if not np.any(rows) or not np.any(cols):
        # 숫자가 없으면 그냥 리사이즈
        return img.resize((target_size, target_size), Image.Resampling.LANCZOS)

    # 바운딩 박스 찾기
    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]

    # 숫자 영역 추출
    digit_region = img_array[rmin:rmax+1, cmin:cmax+1]

    # 정사각형으로 만들기 (긴 쪽에 맞춤)
    h, w = digit_region.shape
    max_dim = max(h, w)

    # 정사각형 캔버스 생성
    square = np.zeros((max_dim, max_dim), dtype=np.uint8)

    # 중앙에 배치
    y_offset = (max_dim - h) // 2
    x_offset = (max_dim - w) // 2
    square[y_offset:y_offset+h, x_offset:x_offset+w] = digit_region

    # 20x20으로 리사이즈 (MNIST 스타일)
    digit_img = Image.fromarray(square)
    digit_img = digit_img.resize((20, 20), Image.Resampling.LANCZOS)

    # 28x28 캔버스에 4픽셀 여백으로 배치
    final = Image.new('L', (28, 28), 0)
    final.paste(digit_img, (4, 4))

    return final


def preprocess_image(image_path):
    """
    이미지 파일을 모델 입력으로 변환

    처리 과정:
    1. 이미지 로드
    2. 그레이스케일 변환
    3. 배경색 감지 및 반전 (필요시)
    4. 중앙 정렬 및 28x28 리사이즈
    5. MNIST 정규화 적용

    Returns:
        tensor: 모델 입력 텐서 (1, 1, 28, 28)
        display_img: 시각화용 이미지 (28x28)
        original_img: 원본 이미지
    """
    # 이미지 로드
    original_img = Image.open(image_path)

    # 그레이스케일 변환
    img = original_img.convert('L')
    img_array = np.array(img)

    # 배경색 감지
    bg_color = detect_background(img_array)

    # MNIST는 검은 배경에 흰 숫자
    # 흰 배경이면 반전 필요
    if bg_color == 'white':
        img_array = 255 - img_array

    # PIL 이미지로 변환
    img = Image.fromarray(img_array)

    # 노이즈 제거 (선택적)
    # img = img.filter(ImageFilter.MedianFilter(size=3))

    # 중앙 정렬 및 리사이즈
    img = center_and_resize(img, 28)

    # 시각화용 이미지 저장
    display_img = np.array(img)

    # 정규화
    img_array = np.array(img, dtype=np.float32)
    img_array = img_array / 255.0
    img_array = (img_array - 0.1307) / 0.3081

    # 텐서 변환 (1, 1, 28, 28)
    tensor = torch.tensor(img_array).unsqueeze(0).unsqueeze(0)

    return tensor, display_img, original_img


def predict_digit(model, device, tensor):
    """
    숫자 예측

    Returns:
        pred: 예측된 숫자 (0-9)
        confidence: 확신도 (0-1)
        probs: 각 숫자별 확률
    """
    model.eval()

    with torch.no_grad():
        tensor = tensor.to(device)
        output = model(tensor)
        probs = F.softmax(output, dim=1)[0]
        pred = output.argmax(dim=1).item()
        confidence = probs[pred].item()

    return pred, confidence, probs.cpu().numpy()


# ============================================================
# 결과 시각화
# ============================================================

def visualize_single(image_path, pred, confidence, probs, display_img, original_img):
    """Single image result visualization"""
    fig, axes = plt.subplots(1, 3, figsize=(12, 4))

    # Original image
    axes[0].imshow(original_img, cmap='gray')
    axes[0].set_title(f'Original Image\n{os.path.basename(image_path)}')
    axes[0].axis('off')

    # Preprocessed image (28x28)
    axes[1].imshow(display_img, cmap='gray')
    axes[1].set_title(f'Preprocessed (28x28)\nPrediction: {pred} ({confidence:.1%})')
    axes[1].axis('off')

    # Probability distribution
    colors = ['green' if i == pred else 'gray' for i in range(10)]
    axes[2].bar(range(10), probs, color=colors)
    axes[2].set_xlabel('Digit')
    axes[2].set_ylabel('Probability')
    axes[2].set_title('Prediction Probability')
    axes[2].set_xticks(range(10))

    plt.tight_layout()
    plt.show()


def visualize_multiple(results):
    """Multiple images result visualization"""
    n = len(results)
    cols = min(5, n)
    rows = (n + cols - 1) // cols

    fig, axes = plt.subplots(rows, cols, figsize=(cols * 3, rows * 3.5))

    if rows == 1 and cols == 1:
        axes = np.array([[axes]])
    elif rows == 1:
        axes = axes.reshape(1, -1)
    elif cols == 1:
        axes = axes.reshape(-1, 1)

    for idx, result in enumerate(results):
        row = idx // cols
        col = idx % cols
        ax = axes[row, col]

        ax.imshow(result['display_img'], cmap='gray')

        color = 'green' if result['confidence'] > 0.9 else 'orange' if result['confidence'] > 0.5 else 'red'
        ax.set_title(f"{os.path.basename(result['path'])}\n"
                    f"Pred: {result['pred']} ({result['confidence']:.1%})",
                    fontsize=10, color=color)
        ax.axis('off')

    # Hide empty subplots
    for idx in range(n, rows * cols):
        row = idx // cols
        col = idx % cols
        axes[row, col].axis('off')

    plt.suptitle(f'Handwriting Recognition Results ({n} images)', fontsize=14)
    plt.tight_layout()
    plt.savefig('../../results/handwriting_test_results.png', dpi=150, bbox_inches='tight')
    print(f"\nResult image saved: ../../results/handwriting_test_results.png")
    plt.show()


# ============================================================
# 메인 함수
# ============================================================

def find_images(paths):
    """이미지 파일 경로 찾기"""
    image_files = []

    for path in paths:
        if os.path.isfile(path):
            # Single file
            ext = os.path.splitext(path)[1].lower()
            if ext in SUPPORTED_EXTENSIONS:
                image_files.append(path)
            else:
                print(f"Unsupported format: {path}")
        elif os.path.isdir(path):
            # Directory
            for ext in SUPPORTED_EXTENSIONS:
                image_files.extend(glob.glob(os.path.join(path, f'*{ext}')))
                image_files.extend(glob.glob(os.path.join(path, f'*{ext.upper()}')))
        else:
            print(f"Path not found: {path}")

    return sorted(set(image_files))


def main():
    print("=" * 60)
    print("Handwriting / Image Digit Recognition Test")
    print("=" * 60)

    # Device setup
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"\nDevice: {device}")

    # Load model
    model = CNN().to(device)

    # Find model file
    model_paths = [
        MODEL_PATH,
        'baseline_cnn.pt',
        '../../models/baseline_weights.pth',
        '../../../models/baseline_cnn.pt',
    ]

    model_found = None
    for mp in model_paths:
        if os.path.exists(mp):
            model_found = mp
            break

    if not model_found:
        print(f"\nError: Model file not found!")
        print("Please run train.py first or download the model from Colab.")
        print(f"\nTried paths:")
        for mp in model_paths:
            print(f"  - {mp}")
        return

    try:
        checkpoint = torch.load(model_found, map_location=device)
        if 'model_state_dict' in checkpoint:
            model.load_state_dict(checkpoint['model_state_dict'])
            saved_acc = checkpoint.get('final_accuracy', 'N/A')
            print(f"Model loaded: {model_found}")
            print(f"Saved accuracy: {saved_acc}%")
        else:
            model.load_state_dict(checkpoint)
            print(f"Weights loaded: {model_found}")
    except Exception as e:
        print(f"Model load failed: {e}")
        return

    model.eval()

    # Determine image paths
    if len(sys.argv) > 1:
        paths = sys.argv[1:]
    else:
        # Default folder
        if os.path.exists(DEFAULT_IMAGE_DIR):
            paths = [DEFAULT_IMAGE_DIR]
        else:
            # Create folder
            os.makedirs(DEFAULT_IMAGE_DIR, exist_ok=True)
            print(f"\nCreated '{DEFAULT_IMAGE_DIR}' folder.")
            print("Put your test images in this folder and run again.")
            print("\nUsage:")
            print("  python handwriting_test.py                  # my_digits/ folder")
            print("  python handwriting_test.py image.png        # single image")
            print("  python handwriting_test.py folder/          # specific folder")
            return

    # Find image files
    image_files = find_images(paths)

    if not image_files:
        print(f"\nNo image files found.")
        print(f"Supported formats: {', '.join(SUPPORTED_EXTENSIONS)}")
        return

    print(f"\nFound images: {len(image_files)}")

    # Run predictions
    print("\n" + "-" * 40)
    print("Recognition Results")
    print("-" * 40)

    results = []

    for image_path in image_files:
        try:
            # Preprocess
            tensor, display_img, original_img = preprocess_image(image_path)

            # Predict
            pred, confidence, probs = predict_digit(model, device, tensor)

            # Save result
            results.append({
                'path': image_path,
                'pred': pred,
                'confidence': confidence,
                'probs': probs,
                'display_img': display_img,
                'original_img': original_img
            })

            # Print
            conf_bar = '=' * int(confidence * 10)
            status = 'O' if confidence > 0.9 else '?' if confidence > 0.5 else 'X'
            print(f"  {status} {os.path.basename(image_path):20s} -> {pred} ({confidence:.1%}) {conf_bar}")

        except Exception as e:
            print(f"  X {os.path.basename(image_path):20s} -> Error: {e}")

    if not results:
        print("\nNo images were recognized.")
        return

    # Statistics
    print("\n" + "-" * 40)
    print("Statistics")
    print("-" * 40)

    high_conf = sum(1 for r in results if r['confidence'] > 0.9)
    med_conf = sum(1 for r in results if 0.5 < r['confidence'] <= 0.9)
    low_conf = sum(1 for r in results if r['confidence'] <= 0.5)

    print(f"  High confidence (>90%): {high_conf}")
    print(f"  Medium confidence (50-90%): {med_conf}")
    print(f"  Low confidence (<50%): {low_conf}")
    print(f"  Average confidence: {np.mean([r['confidence'] for r in results]):.1%}")

    # Visualization
    if len(results) == 1:
        r = results[0]
        visualize_single(r['path'], r['pred'], r['confidence'],
                        r['probs'], r['display_img'], r['original_img'])
    else:
        visualize_multiple(results)

    # Detailed results (single image)
    if len(results) == 1:
        r = results[0]
        print("\n" + "-" * 40)
        print("Top 3 Predictions")
        print("-" * 40)
        top3 = np.argsort(r['probs'])[-3:][::-1]
        for i, idx in enumerate(top3):
            bar = '=' * int(r['probs'][idx] * 20)
            print(f"  {i+1}. Digit {idx}: {r['probs'][idx]:.1%} {bar}")


if __name__ == '__main__':
    main()
