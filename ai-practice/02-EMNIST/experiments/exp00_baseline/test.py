"""
EMNIST 손글씨/이미지 테스트 스크립트

영문자 + 숫자 인식

사용법:
    python test.py                    # my_chars/ 폴더의 모든 이미지
    python test.py image.png          # 단일 이미지
    python test.py folder/            # 특정 폴더
    python test.py img1.png img2.jpg  # 여러 이미지

지원 형식:
    PNG, JPG, JPEG, BMP, GIF

필요 패키지:
    pip install torch torchvision pillow matplotlib numpy
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import os
import sys
import glob

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

# ============================================================
# 설정
# ============================================================

MODEL_PATH = '../../models/emnist_cnn.pt'
DEFAULT_IMAGE_DIR = '../../my_chars'
SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.bmp', '.gif']

# ============================================================
# 모델 정의 (학습 시와 동일)
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
# 이미지 전처리
# ============================================================

def detect_background(img_array):
    """배경색 자동 감지"""
    h, w = img_array.shape[:2]
    margin_h = max(1, h // 10)
    margin_w = max(1, w // 10)

    corners = [
        img_array[:margin_h, :margin_w],
        img_array[:margin_h, -margin_w:],
        img_array[-margin_h:, :margin_w],
        img_array[-margin_h:, -margin_w:]
    ]

    corner_mean = np.mean([np.mean(c) for c in corners])
    return 'white' if corner_mean > 128 else 'black'


def center_and_resize(img, target_size=28):
    """중앙 정렬 및 리사이즈"""
    img_array = np.array(img)

    rows = np.any(img_array > 20, axis=1)
    cols = np.any(img_array > 20, axis=0)

    if not np.any(rows) or not np.any(cols):
        return img.resize((target_size, target_size), Image.Resampling.LANCZOS)

    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]

    digit_region = img_array[rmin:rmax+1, cmin:cmax+1]

    h, w = digit_region.shape
    max_dim = max(h, w)

    square = np.zeros((max_dim, max_dim), dtype=np.uint8)
    y_offset = (max_dim - h) // 2
    x_offset = (max_dim - w) // 2
    square[y_offset:y_offset+h, x_offset:x_offset+w] = digit_region

    digit_img = Image.fromarray(square)
    digit_img = digit_img.resize((20, 20), Image.Resampling.LANCZOS)

    final = Image.new('L', (28, 28), 0)
    final.paste(digit_img, (4, 4))

    return final


def preprocess_image(image_path):
    """이미지 전처리"""
    original_img = Image.open(image_path)
    img = original_img.convert('L')
    img_array = np.array(img)

    bg_color = detect_background(img_array)
    if bg_color == 'white':
        img_array = 255 - img_array

    img = Image.fromarray(img_array)
    img = center_and_resize(img, 28)

    display_img = np.array(img)

    img_array = np.array(img, dtype=np.float32)
    img_array = img_array / 255.0
    img_array = (img_array - 0.1307) / 0.3081

    tensor = torch.tensor(img_array).unsqueeze(0).unsqueeze(0)

    return tensor, display_img, original_img


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

    return pred_char, confidence, probs.cpu().numpy()


# ============================================================
# 결과 시각화
# ============================================================

def visualize_single(image_path, pred, confidence, probs, display_img, original_img):
    """단일 이미지 결과 시각화"""
    fig, axes = plt.subplots(1, 3, figsize=(14, 4))

    axes[0].imshow(original_img, cmap='gray')
    axes[0].set_title(f'Original\n{os.path.basename(image_path)}')
    axes[0].axis('off')

    axes[1].imshow(display_img, cmap='gray')
    axes[1].set_title(f'Preprocessed (28x28)\nPrediction: "{pred}" ({confidence:.1%})')
    axes[1].axis('off')

    # Top 10 확률
    top10_idx = np.argsort(probs)[-10:][::-1]
    top10_chars = [EMNIST_LABELS[i] for i in top10_idx]
    top10_probs = [probs[i] for i in top10_idx]

    colors = ['green' if c == pred else 'gray' for c in top10_chars]
    axes[2].barh(range(10), top10_probs, color=colors)
    axes[2].set_yticks(range(10))
    axes[2].set_yticklabels(top10_chars)
    axes[2].set_xlabel('Probability')
    axes[2].set_title('Top 10 Predictions')
    axes[2].invert_yaxis()

    plt.tight_layout()
    plt.show()


def visualize_multiple(results):
    """여러 이미지 결과 시각화"""
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
                    f"Pred: '{result['pred']}' ({result['confidence']:.1%})",
                    fontsize=10, color=color)
        ax.axis('off')

    for idx in range(n, rows * cols):
        row = idx // cols
        col = idx % cols
        axes[row, col].axis('off')

    plt.suptitle(f'EMNIST Character Recognition ({n} images)', fontsize=14)
    plt.tight_layout()
    plt.savefig('../../results/emnist_test_results.png', dpi=150, bbox_inches='tight')
    print(f"\nResult saved: ../../results/emnist_test_results.png")
    plt.show()


# ============================================================
# 메인 함수
# ============================================================

def find_images(paths):
    """이미지 파일 찾기"""
    image_files = []

    for path in paths:
        if os.path.isfile(path):
            ext = os.path.splitext(path)[1].lower()
            if ext in SUPPORTED_EXTENSIONS:
                image_files.append(path)
            else:
                print(f"Unsupported format: {path}")
        elif os.path.isdir(path):
            for ext in SUPPORTED_EXTENSIONS:
                image_files.extend(glob.glob(os.path.join(path, f'*{ext}')))
                image_files.extend(glob.glob(os.path.join(path, f'*{ext.upper()}')))
        else:
            print(f"Path not found: {path}")

    return sorted(set(image_files))


def main():
    print("=" * 60)
    print("EMNIST Character Recognition Test")
    print("(Digits + Letters: 47 classes)")
    print("=" * 60)

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"\nDevice: {device}")

    # 모델 로드
    model = CNN(num_classes=NUM_CLASSES).to(device)

    model_paths = [
        MODEL_PATH,
        'emnist_cnn.pt',
        '../../models/emnist_best.pt',
        '../../../models/emnist_cnn.pt',
    ]

    model_found = None
    for mp in model_paths:
        if os.path.exists(mp):
            model_found = mp
            break

    if not model_found:
        print(f"\nError: Model not found!")
        print("Please run train.py first.")
        print(f"\nTried paths:")
        for mp in model_paths:
            print(f"  - {mp}")
        return

    try:
        checkpoint = torch.load(model_found, map_location=device)
        if 'model_state_dict' in checkpoint:
            model.load_state_dict(checkpoint['model_state_dict'])
            saved_acc = checkpoint.get('final_accuracy', checkpoint.get('accuracy', 'N/A'))
            print(f"Model loaded: {model_found}")
            print(f"Saved accuracy: {saved_acc}%")
        else:
            model.load_state_dict(checkpoint)
            print(f"Weights loaded: {model_found}")
    except Exception as e:
        print(f"Model load failed: {e}")
        return

    model.eval()

    # 이미지 경로 결정
    if len(sys.argv) > 1:
        paths = sys.argv[1:]
    else:
        if os.path.exists(DEFAULT_IMAGE_DIR):
            paths = [DEFAULT_IMAGE_DIR]
        else:
            os.makedirs(DEFAULT_IMAGE_DIR, exist_ok=True)
            print(f"\nCreated '{DEFAULT_IMAGE_DIR}' folder.")
            print("Put your test images in this folder and run again.")
            return

    # 이미지 찾기
    image_files = find_images(paths)

    if not image_files:
        print(f"\nNo image files found.")
        print(f"Supported formats: {', '.join(SUPPORTED_EXTENSIONS)}")
        return

    print(f"\nFound images: {len(image_files)}")

    # 예측 실행
    print("\n" + "-" * 40)
    print("Recognition Results")
    print("-" * 40)

    results = []

    for image_path in image_files:
        try:
            tensor, display_img, original_img = preprocess_image(image_path)
            pred, confidence, probs = predict_char(model, device, tensor)

            results.append({
                'path': image_path,
                'pred': pred,
                'confidence': confidence,
                'probs': probs,
                'display_img': display_img,
                'original_img': original_img
            })

            conf_bar = '=' * int(confidence * 10)
            status = 'O' if confidence > 0.9 else '?' if confidence > 0.5 else 'X'
            print(f"  {status} {os.path.basename(image_path):20s} -> '{pred}' ({confidence:.1%}) {conf_bar}")

        except Exception as e:
            print(f"  X {os.path.basename(image_path):20s} -> Error: {e}")

    if not results:
        print("\nNo images were recognized.")
        return

    # 통계
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

    # 인식된 문자 목록
    chars = ''.join([r['pred'] for r in results])
    print(f"\n  Recognized string: \"{chars}\"")

    # 시각화
    if len(results) == 1:
        r = results[0]
        visualize_single(r['path'], r['pred'], r['confidence'],
                        r['probs'], r['display_img'], r['original_img'])
    else:
        visualize_multiple(results)


if __name__ == '__main__':
    main()
