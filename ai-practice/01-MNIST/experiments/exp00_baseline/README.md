# EXP-00: MNIST Baseline 실습

기본 CNN 모델로 MNIST를 학습하고, PC 폰트로 실전 테스트까지 진행하는 전체 과정입니다.

---

## 목차

1. [환경 설정](#1-환경-설정)
2. [Google Colab 사용법](#2-google-colab-사용법)
3. [데이터 로드](#3-데이터-로드)
4. [모델 정의](#4-모델-정의)
5. [학습](#5-학습)
6. [평가](#6-평가)
7. [모델 저장 및 다운로드](#7-모델-저장-및-다운로드)
8. [PC 폰트로 실전 테스트](#8-pc-폰트로-실전-테스트)
9. [결과 분석](#9-결과-분석)

---

## 1. 환경 설정

### 로컬 환경 (선택사항)

```bash
# 가상환경 생성
python -m venv venv
venv\Scripts\activate  # Windows

# 패키지 설치
pip install torch torchvision matplotlib pillow numpy
```

### 필요 패키지

| 패키지 | 용도 | 버전 |
|--------|------|------|
| torch | 딥러닝 프레임워크 | 2.0+ |
| torchvision | 데이터셋, 전처리 | 0.15+ |
| matplotlib | 시각화 | 3.7+ |
| pillow | 이미지 처리 | 9.0+ |
| numpy | 수치 연산 | 1.24+ |

---

## 2. Google Colab 사용법

### 2.1 Colab 접속

1. [Google Colab](https://colab.research.google.com/) 접속
2. **새 노트북** 클릭
3. **런타임 > 런타임 유형 변경 > GPU** 선택 (선택사항, CPU로도 가능)

### 2.2 Google Drive 연결

```python
# Google Drive 마운트 (모델 저장용)
from google.colab import drive
drive.mount('/content/drive')

# 프로젝트 폴더 생성
import os
PROJECT_PATH = '/content/drive/MyDrive/ai-practice/01-MNIST'
os.makedirs(PROJECT_PATH, exist_ok=True)
os.makedirs(f'{PROJECT_PATH}/models', exist_ok=True)

print(f"프로젝트 경로: {PROJECT_PATH}")
```

### 2.3 환경 확인

```python
import torch
print(f"PyTorch 버전: {torch.__version__}")
print(f"CUDA 사용 가능: {torch.cuda.is_available()}")

if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    device = torch.device('cuda')
else:
    print("CPU 사용")
    device = torch.device('cpu')
```

### 2.4 Colab 장점

| 장점 | 설명 |
|------|------|
| 무료 GPU | Tesla T4 GPU 무료 사용 |
| 환경 설정 불필요 | PyTorch 사전 설치됨 |
| 어디서나 접속 | 웹 브라우저만 있으면 OK |
| Drive 연동 | 파일 자동 저장 |

### 2.5 Colab 주의사항

| 주의 | 대응 |
|------|------|
| 12시간 제한 | 중간에 모델 저장 필수 |
| 유휴 시 종료 | 주기적으로 셀 실행 |
| 세션 초기화 | Drive에 결과 저장 |

---

## 3. 데이터 로드

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt
import numpy as np

# 재현성을 위한 시드 설정
torch.manual_seed(42)

# 전처리 정의
transform = transforms.Compose([
    transforms.ToTensor(),                      # 0~255 → 0~1
    transforms.Normalize((0.1307,), (0.3081,))  # MNIST 평균/표준편차
])

# 데이터셋 로드
train_dataset = datasets.MNIST(
    root='./data',
    train=True,
    download=True,
    transform=transform
)

test_dataset = datasets.MNIST(
    root='./data',
    train=False,
    download=True,
    transform=transform
)

# DataLoader 생성
BATCH_SIZE = 64

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True
)

test_loader = DataLoader(
    test_dataset,
    batch_size=1000,
    shuffle=False
)

print(f"학습 데이터: {len(train_dataset):,}장")
print(f"테스트 데이터: {len(test_dataset):,}장")
print(f"배치 크기: {BATCH_SIZE}")
print(f"학습 배치 수: {len(train_loader)}")
```

### 3.1 샘플 시각화

```python
# 샘플 이미지 확인
fig, axes = plt.subplots(2, 5, figsize=(12, 5))

for i, ax in enumerate(axes.flat):
    image, label = train_dataset[i]
    # 정규화 해제
    img = image.squeeze().numpy()
    img = img * 0.3081 + 0.1307

    ax.imshow(img, cmap='gray')
    ax.set_title(f'Label: {label}', fontsize=12)
    ax.axis('off')

plt.suptitle('MNIST 샘플 이미지', fontsize=14)
plt.tight_layout()
plt.savefig('mnist_samples.png', dpi=150)
plt.show()
```

---

## 4. 모델 정의

### 4.1 CNN 모델 (권장)

```python
class CNN(nn.Module):
    """
    간단한 CNN 모델

    구조:
    - Conv1: 1 → 32 채널, 3x3 커널
    - Conv2: 32 → 64 채널, 3x3 커널
    - MaxPool: 2x2
    - FC1: 9216 → 128
    - FC2: 128 → 10
    """

    def __init__(self):
        super(CNN, self).__init__()

        # Convolutional layers
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)

        # Pooling
        self.pool = nn.MaxPool2d(2, 2)

        # Fully connected layers
        # 28x28 → conv1 → 28x28 → pool → 14x14
        # → conv2 → 14x14 → pool → 7x7
        # 64 * 7 * 7 = 3136
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)

        # Dropout
        self.dropout = nn.Dropout(0.25)

    def forward(self, x):
        # Conv block 1
        x = self.conv1(x)           # (B, 32, 28, 28)
        x = F.relu(x)
        x = self.pool(x)            # (B, 32, 14, 14)

        # Conv block 2
        x = self.conv2(x)           # (B, 64, 14, 14)
        x = F.relu(x)
        x = self.pool(x)            # (B, 64, 7, 7)

        # Flatten
        x = x.view(-1, 64 * 7 * 7)  # (B, 3136)

        # FC layers
        x = self.fc1(x)             # (B, 128)
        x = F.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)             # (B, 10)

        return x

# 모델 생성
model = CNN().to(device)

# 모델 구조 확인
print(model)
print(f"\n총 파라미터 수: {sum(p.numel() for p in model.parameters()):,}")
```

### 4.2 모델 구조 시각화

```
입력 이미지 (1, 28, 28)
        ↓
┌─────────────────────┐
│ Conv2d(1→32, 3x3)   │
│ ReLU                │
│ MaxPool2d(2x2)      │
└─────────────────────┘
        ↓ (32, 14, 14)
┌─────────────────────┐
│ Conv2d(32→64, 3x3)  │
│ ReLU                │
│ MaxPool2d(2x2)      │
└─────────────────────┘
        ↓ (64, 7, 7)
┌─────────────────────┐
│ Flatten → 3136      │
│ Linear(3136→128)    │
│ ReLU + Dropout      │
│ Linear(128→10)      │
└─────────────────────┘
        ↓
    출력 (10)
```

---

## 5. 학습

### 5.1 학습 설정

```python
# 하이퍼파라미터
EPOCHS = 10
LEARNING_RATE = 0.001

# 손실 함수와 옵티마이저
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)

print(f"에포크: {EPOCHS}")
print(f"학습률: {LEARNING_RATE}")
print(f"옵티마이저: Adam")
print(f"손실 함수: CrossEntropyLoss")
```

### 5.2 학습 함수

```python
def train_epoch(model, device, train_loader, optimizer, criterion, epoch):
    """한 에포크 학습"""
    model.train()
    total_loss = 0
    correct = 0
    total = 0

    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)

        # Forward pass
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)

        # Backward pass
        loss.backward()
        optimizer.step()

        # 통계
        total_loss += loss.item()
        pred = output.argmax(dim=1)
        correct += pred.eq(target).sum().item()
        total += target.size(0)

        # 진행 상황 출력 (100 배치마다)
        if batch_idx % 100 == 0:
            print(f'  배치 [{batch_idx:>4}/{len(train_loader)}] '
                  f'Loss: {loss.item():.4f}')

    avg_loss = total_loss / len(train_loader)
    accuracy = 100. * correct / total

    return avg_loss, accuracy
```

### 5.3 평가 함수

```python
def evaluate(model, device, test_loader, criterion):
    """테스트 데이터로 평가"""
    model.eval()
    total_loss = 0
    correct = 0
    total = 0

    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)

            total_loss += criterion(output, target).item()
            pred = output.argmax(dim=1)
            correct += pred.eq(target).sum().item()
            total += target.size(0)

    avg_loss = total_loss / len(test_loader)
    accuracy = 100. * correct / total

    return avg_loss, accuracy
```

### 5.4 학습 실행

```python
# 학습 기록
history = {
    'train_loss': [],
    'train_acc': [],
    'test_loss': [],
    'test_acc': []
}

print("=" * 60)
print("학습 시작")
print("=" * 60)

for epoch in range(1, EPOCHS + 1):
    print(f"\nEpoch {epoch}/{EPOCHS}")
    print("-" * 40)

    # 학습
    train_loss, train_acc = train_epoch(
        model, device, train_loader, optimizer, criterion, epoch
    )

    # 평가
    test_loss, test_acc = evaluate(model, device, test_loader, criterion)

    # 기록
    history['train_loss'].append(train_loss)
    history['train_acc'].append(train_acc)
    history['test_loss'].append(test_loss)
    history['test_acc'].append(test_acc)

    print(f"\n  Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}%")
    print(f"  Test Loss:  {test_loss:.4f} | Test Acc:  {test_acc:.2f}%")

print("\n" + "=" * 60)
print(f"학습 완료! 최종 테스트 정확도: {history['test_acc'][-1]:.2f}%")
print("=" * 60)
```

---

## 6. 평가

### 6.1 학습 곡선 시각화

```python
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Loss 그래프
axes[0].plot(history['train_loss'], 'b-', label='Train Loss', linewidth=2)
axes[0].plot(history['test_loss'], 'r-', label='Test Loss', linewidth=2)
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Loss')
axes[0].set_title('Loss Curve')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Accuracy 그래프
axes[1].plot(history['train_acc'], 'b-', label='Train Accuracy', linewidth=2)
axes[1].plot(history['test_acc'], 'r-', label='Test Accuracy', linewidth=2)
axes[1].set_xlabel('Epoch')
axes[1].set_ylabel('Accuracy (%)')
axes[1].set_title('Accuracy Curve')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('learning_curves.png', dpi=150)
plt.show()
```

### 6.2 혼동 행렬

```python
from sklearn.metrics import confusion_matrix
import seaborn as sns

# 예측 수집
model.eval()
all_preds = []
all_targets = []

with torch.no_grad():
    for data, target in test_loader:
        data = data.to(device)
        output = model(data)
        pred = output.argmax(dim=1).cpu().numpy()
        all_preds.extend(pred)
        all_targets.extend(target.numpy())

# 혼동 행렬 계산
cm = confusion_matrix(all_targets, all_preds)

# 시각화
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=range(10), yticklabels=range(10))
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.savefig('confusion_matrix.png', dpi=150)
plt.show()

# 클래스별 정확도
print("\n클래스별 정확도:")
for i in range(10):
    class_acc = cm[i, i] / cm[i].sum() * 100
    print(f"  숫자 {i}: {class_acc:.1f}%")
```

### 6.3 오분류 샘플 확인

```python
# 틀린 예측 찾기
model.eval()
wrong_samples = []

with torch.no_grad():
    for data, target in test_loader:
        data, target = data.to(device), target.to(device)
        output = model(data)
        pred = output.argmax(dim=1)

        wrong_mask = pred != target
        wrong_idx = wrong_mask.nonzero().squeeze()

        for idx in wrong_idx[:10]:  # 최대 10개
            wrong_samples.append({
                'image': data[idx].cpu(),
                'true': target[idx].item(),
                'pred': pred[idx].item(),
                'conf': F.softmax(output[idx], dim=0).max().item()
            })

        if len(wrong_samples) >= 20:
            break

# 시각화
fig, axes = plt.subplots(2, 5, figsize=(15, 6))
for i, ax in enumerate(axes.flat):
    if i < len(wrong_samples):
        sample = wrong_samples[i]
        img = sample['image'].squeeze().numpy()
        img = img * 0.3081 + 0.1307

        ax.imshow(img, cmap='gray')
        ax.set_title(f"True: {sample['true']}, Pred: {sample['pred']}\n"
                    f"Conf: {sample['conf']:.2f}", fontsize=10)
    ax.axis('off')

plt.suptitle('오분류 샘플', fontsize=14)
plt.tight_layout()
plt.savefig('wrong_predictions.png', dpi=150)
plt.show()
```

---

## 7. 모델 저장 및 다운로드

### 7.1 모델 저장 (Colab)

```python
# 모델 저장 경로
SAVE_PATH = '/content/drive/MyDrive/ai-practice/01-MNIST/models'

# 전체 모델 저장 (추천)
model_path = f'{SAVE_PATH}/baseline_cnn.pt'
torch.save({
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'history': history,
    'final_accuracy': history['test_acc'][-1]
}, model_path)

print(f"모델 저장 완료: {model_path}")

# 가중치만 저장 (용량 작음)
weights_path = f'{SAVE_PATH}/baseline_weights.pth'
torch.save(model.state_dict(), weights_path)
print(f"가중치 저장 완료: {weights_path}")
```

### 7.2 모델 다운로드 (로컬에서 사용)

**방법 1: Google Drive 동기화**
- Google Drive 데스크톱 앱 설치
- 자동으로 로컬에 동기화됨

**방법 2: 수동 다운로드**
1. [Google Drive](https://drive.google.com) 접속
2. `ai-practice/01-MNIST/models/` 폴더로 이동
3. `baseline_cnn.pt` 파일 다운로드
4. 로컬 `models/` 폴더에 저장

### 7.3 모델 로드 (로컬)

```python
# 로컬에서 모델 로드
import torch

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 모델 구조 정의 (위 CNN 클래스 필요)
model = CNN().to(device)

# 가중치 로드
checkpoint = torch.load('models/baseline_cnn.pt', map_location=device)
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

print(f"모델 로드 완료!")
print(f"저장된 정확도: {checkpoint['final_accuracy']:.2f}%")
```

---

## 8. PC 폰트로 실전 테스트

학습한 모델이 실제 환경에서 작동하는지 PC 폰트로 테스트합니다.

### 8.1 필요 패키지

```python
from PIL import Image, ImageDraw, ImageFont
import os
```

### 8.2 Windows 폰트 찾기

```python
# Windows 폰트 경로
FONT_DIR = 'C:/Windows/Fonts'

# 사용 가능한 폰트 확인
fonts = [f for f in os.listdir(FONT_DIR) if f.endswith(('.ttf', '.TTF'))]
print(f"총 {len(fonts)}개 폰트 발견")

# 숫자가 잘 보이는 폰트 추천
recommended = ['arial.ttf', 'times.ttf', 'cour.ttf', 'verdana.ttf', 'tahoma.ttf']
available = [f for f in recommended if f in fonts]
print(f"\n추천 폰트 (설치됨): {available}")
```

### 8.3 폰트로 숫자 이미지 생성

```python
def create_digit_image(digit, font_path, size=28):
    """
    폰트를 사용해 숫자 이미지 생성

    Args:
        digit: 생성할 숫자 (0-9)
        font_path: 폰트 파일 경로
        size: 출력 이미지 크기 (기본 28x28)

    Returns:
        PIL Image (28x28, grayscale)
    """
    # 큰 이미지에서 시작 (품질 향상)
    canvas_size = 100

    # 흰 배경 생성
    img = Image.new('L', (canvas_size, canvas_size), color=255)
    draw = ImageDraw.Draw(img)

    # 폰트 로드 (크기 조절)
    try:
        font = ImageFont.truetype(font_path, 70)
    except:
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

# 테스트
test_img = create_digit_image(5, 'C:/Windows/Fonts/arial.ttf')
plt.imshow(test_img, cmap='gray')
plt.title('Generated: 5')
plt.axis('off')
plt.show()
```

### 8.4 전체 숫자 생성 및 예측

```python
def preprocess_image(img):
    """
    PIL 이미지를 모델 입력으로 변환

    MNIST와 동일한 전처리:
    - 검은 배경, 흰 숫자 (반전)
    - 0~1 정규화
    - 평균/표준편차 정규화
    """
    # NumPy 배열로 변환
    img_array = np.array(img, dtype=np.float32)

    # MNIST는 검은 배경에 흰 글씨
    # 생성된 이미지는 흰 배경에 검은 글씨 → 반전 필요
    img_array = 255 - img_array

    # 0~1 정규화
    img_array = img_array / 255.0

    # MNIST 평균/표준편차 정규화
    img_array = (img_array - 0.1307) / 0.3081

    # Tensor로 변환 (배치, 채널, 높이, 너비)
    tensor = torch.tensor(img_array).unsqueeze(0).unsqueeze(0)

    return tensor

def predict_digit(model, device, img):
    """이미지에서 숫자 예측"""
    model.eval()

    # 전처리
    tensor = preprocess_image(img).to(device)

    # 예측
    with torch.no_grad():
        output = model(tensor)
        prob = F.softmax(output, dim=1)
        pred = output.argmax(dim=1).item()
        confidence = prob[0, pred].item()

    return pred, confidence, prob[0].cpu().numpy()
```

### 8.5 여러 폰트로 테스트

```python
# 테스트할 폰트 목록
test_fonts = [
    ('Arial', 'C:/Windows/Fonts/arial.ttf'),
    ('Times New Roman', 'C:/Windows/Fonts/times.ttf'),
    ('Courier New', 'C:/Windows/Fonts/cour.ttf'),
    ('Verdana', 'C:/Windows/Fonts/verdana.ttf'),
    ('Tahoma', 'C:/Windows/Fonts/tahoma.ttf'),
]

# 결과 저장
results = []

fig, axes = plt.subplots(len(test_fonts), 10, figsize=(20, len(test_fonts) * 2.5))

for row, (font_name, font_path) in enumerate(test_fonts):
    font_correct = 0

    for digit in range(10):
        ax = axes[row, digit]

        # 이미지 생성
        try:
            img = create_digit_image(digit, font_path)

            # 예측
            pred, conf, _ = predict_digit(model, device, img)

            # 표시 (반전된 이미지 표시)
            display_img = 255 - np.array(img)
            ax.imshow(display_img, cmap='gray')

            # 정답 여부
            is_correct = (pred == digit)
            if is_correct:
                font_correct += 1
                color = 'green'
            else:
                color = 'red'

            ax.set_title(f'Pred:{pred}\n({conf:.0%})',
                        fontsize=9, color=color)
        except Exception as e:
            ax.text(0.5, 0.5, 'Error', ha='center', va='center')

        ax.axis('off')

        if digit == 0:
            ax.set_ylabel(font_name, fontsize=10, rotation=0,
                         ha='right', va='center')

    results.append({
        'font': font_name,
        'accuracy': font_correct / 10 * 100
    })

plt.suptitle('PC 폰트 테스트 결과', fontsize=14)
plt.tight_layout()
plt.savefig('font_test_results.png', dpi=150, bbox_inches='tight')
plt.show()

# 결과 요약
print("\n" + "=" * 40)
print("폰트별 정확도")
print("=" * 40)
for r in results:
    bar = '█' * int(r['accuracy'] / 10)
    print(f"{r['font']:20s} {bar} {r['accuracy']:.0f}%")
```

### 8.6 상세 분석

```python
# 특정 폰트로 상세 분석
font_path = 'C:/Windows/Fonts/arial.ttf'
font_name = 'Arial'

fig, axes = plt.subplots(2, 5, figsize=(15, 7))

for digit in range(10):
    ax = axes[digit // 5, digit % 5]

    # 이미지 생성
    img = create_digit_image(digit, font_path)

    # 예측
    pred, conf, probs = predict_digit(model, device, img)

    # 이미지 표시
    display_img = 255 - np.array(img)
    ax.imshow(display_img, cmap='gray')

    # 상위 3개 예측
    top3_idx = np.argsort(probs)[-3:][::-1]
    top3_text = ', '.join([f'{i}:{probs[i]:.0%}' for i in top3_idx])

    is_correct = (pred == digit)
    color = 'green' if is_correct else 'red'

    ax.set_title(f'True: {digit} → Pred: {pred}\n{top3_text}',
                fontsize=10, color=color)
    ax.axis('off')

plt.suptitle(f'{font_name} 폰트 상세 분석', fontsize=14)
plt.tight_layout()
plt.savefig(f'font_analysis_{font_name.lower()}.png', dpi=150)
plt.show()
```

---

## 9. 결과 분석

### 9.1 예상 결과

| 항목 | 예상 값 |
|------|---------|
| MNIST 테스트 정확도 | 98~99% |
| PC 폰트 정확도 | 70~90% |

### 9.2 폰트 테스트 정확도가 낮은 이유

| 원인 | 설명 |
|------|------|
| 스타일 차이 | MNIST는 손글씨, 폰트는 인쇄체 |
| 굵기 차이 | 폰트마다 획 굵기가 다름 |
| 위치 차이 | 센터링 방식의 차이 |
| 크기 차이 | 숫자별 폰트 크기가 다름 |

### 9.3 개선 방안

1. **데이터 증강**: 폰트 스타일 학습 데이터 추가
2. **전처리 개선**: 이미지 정규화, 센터링 강화
3. **앙상블**: 여러 모델 결합
4. **Fine-tuning**: 폰트 데이터로 추가 학습

### 9.4 결과 저장

```python
import json
from datetime import datetime

# 실험 결과 저장
experiment_result = {
    'experiment': 'EXP-00 Baseline',
    'date': datetime.now().strftime('%Y-%m-%d %H:%M'),
    'model': 'CNN (32-64-128-10)',
    'epochs': EPOCHS,
    'learning_rate': LEARNING_RATE,
    'batch_size': BATCH_SIZE,
    'mnist_test_accuracy': history['test_acc'][-1],
    'font_results': results
}

# JSON 저장
with open('exp00_results.json', 'w', encoding='utf-8') as f:
    json.dump(experiment_result, f, indent=2, ensure_ascii=False)

print("결과 저장 완료: exp00_results.json")
```

---

## 체크리스트

- [ ] Colab 환경 설정 완료
- [ ] 데이터 로드 및 시각화
- [ ] CNN 모델 정의
- [ ] 10 에포크 학습 완료
- [ ] 테스트 정확도 98% 이상 달성
- [ ] 학습 곡선 시각화
- [ ] 혼동 행렬 생성
- [ ] 모델 저장 (Drive)
- [ ] 로컬로 모델 다운로드
- [ ] PC 폰트 테스트 완료
- [ ] 결과 분석 및 저장

---

## 다음 단계

1. **EXP-01**: 모델 구조 비교 (MLP vs CNN)
2. **EXP-02**: 활성화 함수 비교 (ReLU vs LeakyReLU vs ELU)
3. **손글씨 테스트**: 직접 쓴 손글씨로 테스트

---

## 참고

- [PyTorch MNIST 공식 예제](https://github.com/pytorch/examples/tree/main/mnist)
- [Google Colab 사용 가이드](https://colab.research.google.com/notebooks/intro.ipynb)
