"""
PC 폰트로 MNIST 모델 테스트

사용법:
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
from datetime import datetime

# ============================================================
# 설정
# ============================================================

# 모델 경로 (Colab에서 다운로드한 모델)
MODEL_PATH = '../../models/baseline_cnn.pt'

# Windows 폰트 경로
FONT_DIR = 'C:/Windows/Fonts'

# 테스트할 폰트 목록
TEST_FONTS = [
    ('Arial', 'arial.ttf'),
    ('Times New Roman', 'times.ttf'),
    ('Courier New', 'cour.ttf'),
    ('Verdana', 'verdana.ttf'),
    ('Tahoma', 'tahoma.ttf'),
    ('Georgia', 'georgia.ttf'),
    ('Trebuchet MS', 'trebuc.ttf'),
    ('Comic Sans MS', 'comic.ttf'),
]

# ============================================================
# 모델 정의 (Colab과 동일해야 함)
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
# 유틸리티 함수
# ============================================================

def create_digit_image(digit, font_path, size=28):
    """폰트를 사용해 숫자 이미지 생성"""
    canvas_size = 100

    # 흰 배경 생성
    img = Image.new('L', (canvas_size, canvas_size), color=255)
    draw = ImageDraw.Draw(img)

    # 폰트 로드
    try:
        font = ImageFont.truetype(font_path, 70)
    except:
        print(f"폰트 로드 실패: {font_path}")
        font = ImageFont.load_default()

    # 텍스트 크기 계산
    text = str(digit)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # 중앙 배치
    x = (canvas_size - text_width) // 2 - bbox[0]
    y = (canvas_size - text_height) // 2 - bbox[1]

    # 검은색으로 숫자 그리기
    draw.text((x, y), text, fill=0, font=font)

    # 28x28로 리사이즈
    img = img.resize((size, size), Image.Resampling.LANCZOS)

    return img


def preprocess_image(img):
    """PIL 이미지를 모델 입력으로 변환"""
    img_array = np.array(img, dtype=np.float32)

    # MNIST는 검은 배경에 흰 글씨 → 반전
    img_array = 255 - img_array

    # 0~1 정규화
    img_array = img_array / 255.0

    # MNIST 평균/표준편차 정규화
    img_array = (img_array - 0.1307) / 0.3081

    # Tensor로 변환
    tensor = torch.tensor(img_array).unsqueeze(0).unsqueeze(0)

    return tensor


def predict_digit(model, device, img):
    """이미지에서 숫자 예측"""
    model.eval()
    tensor = preprocess_image(img).to(device)

    with torch.no_grad():
        output = model(tensor)
        prob = F.softmax(output, dim=1)
        pred = output.argmax(dim=1).item()
        confidence = prob[0, pred].item()

    return pred, confidence, prob[0].cpu().numpy()


# ============================================================
# 메인 실행
# ============================================================

def main():
    print("=" * 60)
    print("PC 폰트로 MNIST 모델 테스트")
    print("=" * 60)

    # 디바이스 설정
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"\n디바이스: {device}")

    # 모델 로드
    model = CNN().to(device)

    if not os.path.exists(MODEL_PATH):
        # 대체 경로 시도
        alt_paths = [
            'baseline_cnn.pt',
            '../baseline_cnn.pt',
            '../../models/baseline_weights.pth',
        ]
        for alt in alt_paths:
            if os.path.exists(alt):
                MODEL_PATH_FOUND = alt
                break
        else:
            print(f"\n오류: 모델 파일을 찾을 수 없습니다!")
            print(f"시도한 경로: {MODEL_PATH}")
            print("\nColab에서 모델을 다운로드하고 다음 경로에 저장하세요:")
            print("  - ai-practice/01-MNIST/models/baseline_cnn.pt")
            return
    else:
        MODEL_PATH_FOUND = MODEL_PATH

    try:
        checkpoint = torch.load(MODEL_PATH_FOUND, map_location=device)
        if 'model_state_dict' in checkpoint:
            model.load_state_dict(checkpoint['model_state_dict'])
            saved_acc = checkpoint.get('final_accuracy', 'N/A')
            print(f"모델 로드 완료: {MODEL_PATH_FOUND}")
            print(f"저장된 테스트 정확도: {saved_acc}%")
        else:
            model.load_state_dict(checkpoint)
            print(f"가중치 로드 완료: {MODEL_PATH_FOUND}")
    except Exception as e:
        print(f"모델 로드 실패: {e}")
        return

    model.eval()

    # 사용 가능한 폰트 확인
    print("\n" + "-" * 40)
    print("폰트 확인")
    print("-" * 40)

    available_fonts = []
    for name, filename in TEST_FONTS:
        path = os.path.join(FONT_DIR, filename)
        if os.path.exists(path):
            available_fonts.append((name, path))
            print(f"  ✓ {name}")
        else:
            print(f"  ✗ {name} (없음)")

    if not available_fonts:
        print("\n사용 가능한 폰트가 없습니다!")
        return

    # 테스트 실행
    print("\n" + "-" * 40)
    print("테스트 진행")
    print("-" * 40)

    results = []
    all_predictions = []

    for font_name, font_path in available_fonts:
        font_correct = 0
        font_predictions = []

        for digit in range(10):
            try:
                img = create_digit_image(digit, font_path)
                pred, conf, probs = predict_digit(model, device, img)

                is_correct = (pred == digit)
                if is_correct:
                    font_correct += 1

                font_predictions.append({
                    'true': digit,
                    'pred': pred,
                    'confidence': conf,
                    'correct': is_correct
                })
            except Exception as e:
                font_predictions.append({
                    'true': digit,
                    'pred': -1,
                    'confidence': 0,
                    'correct': False,
                    'error': str(e)
                })

        accuracy = font_correct / 10 * 100
        results.append({
            'font': font_name,
            'accuracy': accuracy,
            'correct': font_correct
        })
        all_predictions.append({
            'font': font_name,
            'predictions': font_predictions
        })

        bar = '█' * int(accuracy / 10)
        print(f"  {font_name:20s} {bar:10s} {accuracy:.0f}% ({font_correct}/10)")

    # 시각화
    print("\n" + "-" * 40)
    print("시각화 생성")
    print("-" * 40)

    # 전체 결과 이미지
    num_fonts = len(available_fonts)
    fig, axes = plt.subplots(num_fonts, 10, figsize=(20, num_fonts * 2.5))

    if num_fonts == 1:
        axes = axes.reshape(1, -1)

    for row, (font_name, font_path) in enumerate(available_fonts):
        for digit in range(10):
            ax = axes[row, digit]

            try:
                img = create_digit_image(digit, font_path)
                pred, conf, _ = predict_digit(model, device, img)

                display_img = 255 - np.array(img)
                ax.imshow(display_img, cmap='gray')

                is_correct = (pred == digit)
                color = 'green' if is_correct else 'red'
                ax.set_title(f'{pred} ({conf:.0%})', fontsize=9, color=color)
            except:
                ax.text(0.5, 0.5, 'Err', ha='center', va='center')

            ax.axis('off')

            if digit == 0:
                ax.text(-0.3, 0.5, font_name, transform=ax.transAxes,
                       fontsize=10, va='center', ha='right')

    plt.suptitle('PC 폰트 테스트 결과', fontsize=14)
    plt.tight_layout()

    output_path = '../../results/font_test_results.png'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    print(f"  결과 이미지 저장: {output_path}")
    plt.show()

    # 결과 요약
    print("\n" + "=" * 60)
    print("테스트 결과 요약")
    print("=" * 60)

    avg_accuracy = sum(r['accuracy'] for r in results) / len(results)
    best = max(results, key=lambda x: x['accuracy'])
    worst = min(results, key=lambda x: x['accuracy'])

    print(f"\n평균 정확도: {avg_accuracy:.1f}%")
    print(f"최고 성능: {best['font']} ({best['accuracy']:.0f}%)")
    print(f"최저 성능: {worst['font']} ({worst['accuracy']:.0f}%)")

    # JSON 저장
    result_data = {
        'date': datetime.now().strftime('%Y-%m-%d %H:%M'),
        'model': MODEL_PATH_FOUND,
        'device': str(device),
        'average_accuracy': avg_accuracy,
        'results': results,
        'predictions': all_predictions
    }

    json_path = '../../results/font_test_results.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(result_data, f, indent=2, ensure_ascii=False)
    print(f"\n결과 JSON 저장: {json_path}")

    # 분석
    print("\n" + "-" * 40)
    print("숫자별 인식률 분석")
    print("-" * 40)

    digit_stats = {d: {'correct': 0, 'total': 0} for d in range(10)}
    for font_data in all_predictions:
        for pred in font_data['predictions']:
            d = pred['true']
            digit_stats[d]['total'] += 1
            if pred['correct']:
                digit_stats[d]['correct'] += 1

    for d in range(10):
        if digit_stats[d]['total'] > 0:
            acc = digit_stats[d]['correct'] / digit_stats[d]['total'] * 100
            bar = '█' * int(acc / 10)
            print(f"  숫자 {d}: {bar:10s} {acc:.0f}%")


if __name__ == '__main__':
    main()
