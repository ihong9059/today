// Level 5 콘텐츠 - CNN & 이미지 처리
// 이 파일은 curriculum.ts에 import되어 사용됩니다.

export const LEVEL_5_LESSON_1 = `
# 컴퓨터 비전 소개

## 학습 목표
이 레슨을 완료하면:
- 컴퓨터가 이미지를 어떻게 인식하는지 이해합니다
- 픽셀과 채널의 개념을 배웁니다
- 이미지 데이터의 구조를 파악합니다
- 컴퓨터 비전의 주요 응용 분야를 알게 됩니다

---

## 핵심 메시지
> **"컴퓨터에게 이미지는 숫자들의 배열일 뿐입니다."**
> 우리가 보는 고양이 사진은 컴퓨터에게는 수십만 개의 숫자 행렬입니다. 이 숫자들에서 패턴을 찾아내는 것이 컴퓨터 비전의 핵심입니다.

---

## 1. 컴퓨터 비전이란?

> **비유**: 시각장애인이 점자를 통해 글을 읽듯이, 컴퓨터는 숫자를 통해 이미지를 "읽습니다". 우리가 눈으로 보는 것을 컴퓨터가 숫자로 이해하도록 번역하는 것이 컴퓨터 비전입니다.

### 주요 응용 분야

| 분야 | 예시 | 설명 |
|------|------|------|
| 이미지 분류 | 고양이 vs 개 구분 | 이미지가 어떤 카테고리인지 판별 |
| 객체 탐지 | 자율주행 차량 인식 | 이미지 내 물체의 위치와 종류 파악 |
| 얼굴 인식 | 스마트폰 Face ID | 얼굴의 특징점을 추출하여 신원 확인 |
| 의료 영상 | X-ray, CT 분석 | 질병의 징후를 자동으로 탐지 |
| OCR | 문서 텍스트 추출 | 이미지에서 문자를 인식 |
| 자세 추정 | 운동 자세 분석 | 사람의 관절 위치를 추적 |

---

## 2. 이미지의 디지털 표현

### 픽셀(Pixel)이란?

**픽셀(Pixel)** = Picture + Element (그림 요소)

이미지의 가장 작은 단위입니다. 디지털 이미지는 수많은 픽셀들이 격자 형태로 배열된 것입니다.

| 이미지 종류 | 크기 | 총 픽셀 수 |
|-------------|------|-----------|
| HD | 1920 × 1080 | 약 200만 |
| 4K | 3840 × 2160 | 약 800만 |
| MNIST | 28 × 28 | 784 |
| CIFAR-10 | 32 × 32 | 1,024 |

---

## 3. 채널(Channel)의 이해

### 흑백 이미지 (1채널 = Grayscale)

각 픽셀은 0~255 사이의 밝기 값 하나만 가집니다.
- **0**: 완전한 검정
- **255**: 완전한 흰색

텐서 Shape: **(H, W)** 또는 **(H, W, 1)**

예: MNIST 이미지는 (28, 28, 1)

### 컬러 이미지 (3채널 = RGB)

각 픽셀은 R, G, B 세 가지 값의 조합입니다.

| 채널 | 범위 | 설명 |
|------|------|------|
| Red (R) | 0~255 | 빨간색 강도 |
| Green (G) | 0~255 | 초록색 강도 |
| Blue (B) | 0~255 | 파란색 강도 |

텐서 Shape: **(H, W, 3)** 또는 **(C, H, W)**

### RGB 색상 조합 예시

| 색상 | (R, G, B) |
|------|-----------|
| 빨강 | (255, 0, 0) |
| 초록 | (0, 255, 0) |
| 파랑 | (0, 0, 255) |
| 노랑 | (255, 255, 0) |
| 흰색 | (255, 255, 255) |
| 검정 | (0, 0, 0) |

---

## 4. 텐서로 표현하기

### 이미지 텐서 Shape

딥러닝에서 이미지는 텐서(다차원 배열)로 표현됩니다.

**단일 이미지:**
- 흑백: **(H, W)** 또는 **(1, H, W)**
- 컬러: **(C, H, W)** - PyTorch 방식
- 컬러: **(H, W, C)** - TensorFlow/NumPy 방식

**배치 이미지 (PyTorch):**
- Shape: **(N, C, H, W)**
- N = 배치 크기, C = 채널 수, H = 높이, W = 너비
- 예: (64, 3, 224, 224) = 64개의 224×224 컬러 이미지

### 🔬 실습: 이미지 텐서 다루기

\`\`\`python
import torch
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 이미지 텐서의 구조 이해하기
# ═══════════════════════════════════════════════════════════════

# 랜덤 컬러 이미지 생성 (H, W, C) - NumPy 방식
np.random.seed(42)
image_numpy = np.random.randint(0, 256, size=(32, 32, 3), dtype=np.uint8)

print("=" * 50)
print("📊 이미지 텐서 구조")
print("=" * 50)
print(f"NumPy 이미지 shape: {image_numpy.shape}")
print(f"  → (Height, Width, Channels) = (32, 32, 3)")

# PyTorch 텐서로 변환 (C, H, W) - PyTorch 방식
image_torch = torch.from_numpy(image_numpy).permute(2, 0, 1).float() / 255.0

print(f"\\nPyTorch 텐서 shape: {image_torch.shape}")
print(f"  → (Channels, Height, Width) = (3, 32, 32)")

# 배치 차원 추가
batch = image_torch.unsqueeze(0)  # (1, 3, 32, 32)
print(f"\\n배치 텐서 shape: {batch.shape}")
print(f"  → (Batch, Channels, Height, Width) = (1, 3, 32, 32)")

# 시각화
fig, axes = plt.subplots(1, 3, figsize=(12, 4))

# RGB 각 채널 시각화
channels = ['Red', 'Green', 'Blue']
for i, (ax, name) in enumerate(zip(axes, channels)):
    ax.imshow(image_numpy[:, :, i], cmap='gray')
    ax.set_title(f'{name} Channel')
    ax.axis('off')

plt.suptitle('RGB Channel Separation of Color Image', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\n💡 핵심: PyTorch는 (N, C, H, W), NumPy는 (H, W, C) 순서를 사용합니다!")
\`\`\`

---

## 5. 정규화의 중요성

### 왜 정규화가 필요한가?

원본 픽셀값 범위: 0 ~ 255

| 문제점 | 설명 |
|--------|------|
| 값이 너무 큼 | 기울기 폭발 위험 |
| 학습 불안정 | 수렴이 어려움 |
| 수렴 속도 느림 | 학습에 오래 걸림 |

### 정규화 방법

| 방법 | 공식 | 결과 범위 |
|------|------|----------|
| 0~1 범위 | pixel / 255.0 | [0, 1] |
| -1~1 범위 | (pixel - 127.5) / 127.5 | [-1, 1] |
| 표준화 | (pixel - mean) / std | 평균 0, 표준편차 1 |

### 🔬 실습: 이미지 정규화

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 이미지 정규화 비교
# ═══════════════════════════════════════════════════════════════

np.random.seed(42)

# 원본 이미지 (0-255 범위)
original = np.random.randint(0, 256, size=(8, 8), dtype=np.uint8).astype(float)

# 방법 1: [0, 1] 범위로 정규화
norm_01 = original / 255.0

# 방법 2: [-1, 1] 범위로 정규화
norm_11 = (original - 127.5) / 127.5

# 방법 3: 표준화 (평균 0, 표준편차 1)
mean, std = original.mean(), original.std()
standardized = (original - mean) / std

print("=" * 55)
print("📊 정규화 방법 비교")
print("=" * 55)
print(f"원본:        min={original.min():>6.1f}, max={original.max():>6.1f}")
print(f"[0,1]:       min={norm_01.min():>6.3f}, max={norm_01.max():>6.3f}")
print(f"[-1,1]:      min={norm_11.min():>6.3f}, max={norm_11.max():>6.3f}")
print(f"표준화:      min={standardized.min():>6.3f}, max={standardized.max():>6.3f}")
print(f"             mean={standardized.mean():>6.3f}, std={standardized.std():>6.3f}")

# 시각화
fig, axes = plt.subplots(1, 4, figsize=(14, 3))

titles = ['Original (0-255)', '[0, 1] Norm', '[-1, 1] Norm', 'Standardized']
images = [original, norm_01, norm_11, standardized]

for ax, img, title in zip(axes, images, titles):
    im = ax.imshow(img, cmap='viridis')
    ax.set_title(title, fontsize=11)
    ax.axis('off')
    plt.colorbar(im, ax=ax, fraction=0.046)

plt.suptitle('Image Normalization Methods Comparison', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\n💡 정규화는 학습 안정성과 수렴 속도를 크게 향상시킵니다!")
\`\`\`

---

## 핵심 요약

| 개념 | 핵심 내용 | 기억할 포인트 |
|------|-----------|--------------|
| 픽셀 | 이미지의 최소 단위 | 0~255 밝기 값 |
| 채널 | 색상 정보 | 흑백=1채널, 컬러=3채널(RGB) |
| 텐서 Shape | 이미지의 차원 | PyTorch: (N, C, H, W) |
| 정규화 | 값 범위 조정 | 학습 안정성 향상 |

---

## 학습 체크리스트
- [ ] 픽셀과 이미지의 관계를 설명할 수 있다
- [ ] RGB 채널의 의미를 이해한다
- [ ] 텐서 Shape (N, C, H, W)를 해석할 수 있다
- [ ] 정규화의 필요성을 설명할 수 있다

## 다음 강의 예고
**"합성곱 연산"** - CNN의 핵심인 합성곱이 어떻게 이미지의 특징을 추출하는지 배웁니다!
`;

export const LEVEL_5_LESSON_2 = `
# 합성곱 연산

## 학습 목표
이 레슨을 완료하면:
- 합성곱 연산의 원리를 이해합니다
- 커널/필터의 역할을 배웁니다
- 스트라이드와 패딩의 효과를 이해합니다
- 특성 맵(Feature Map)의 의미를 파악합니다

---

## 핵심 메시지
> **"합성곱은 작은 창문으로 이미지를 훑으면서 특징을 찾아내는 연산입니다."**
> 3×3 크기의 작은 필터가 이미지 위를 슬라이딩하면서 "여기에 세로선이 있나?", "모서리가 있나?" 같은 질문에 답합니다.

---

## 1. 합성곱(Convolution)이란?

> **비유**: 돋보기로 신문을 읽는다고 상상해보세요. 돋보기(커널)를 신문(이미지) 위에서 한 칸씩 이동하면서 글자(특징)를 확인합니다. 합성곱은 이와 비슷하게 작은 필터로 이미지 전체를 훑으면서 패턴을 감지합니다.

### MLP vs CNN 비교

| 특성 | MLP | CNN |
|------|-----|-----|
| 이미지 처리 | 1차원으로 펼침 (flatten) | 2D 구조 유지 |
| 공간 정보 | 손실됨 | 보존됨 |
| 파라미터 수 | 매우 많음 | 적음 (가중치 공유) |
| 위치 불변성 | 없음 | 있음 |

---

## 2. 합성곱 계산 방법

합성곱 연산은 커널과 이미지 영역의 **요소별 곱셈 후 합산**입니다.

### 계산 예시

입력 이미지의 3×3 영역과 3×3 커널:

| 이미지 영역 | 커널 |
|-------------|------|
| 1, 2, 3 | 1, 0, 1 |
| 0, 1, 2 | 0, 1, 0 |
| 1, 2, 1 | 1, 0, 1 |

**계산:**
(1×1) + (2×0) + (3×1) + (0×0) + (1×1) + (2×0) + (1×1) + (2×0) + (1×1) = **8**

이 과정을 이미지 전체에서 반복하면 **특성 맵(Feature Map)**이 생성됩니다.

### 🔬 실습: 합성곱 연산 직접 구현

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 합성곱 연산 직접 구현하기
# ═══════════════════════════════════════════════════════════════

def conv2d_manual(image, kernel):
    """합성곱 연산을 직접 구현 (padding=0, stride=1)"""
    h, w = image.shape
    kh, kw = kernel.shape
    out_h = h - kh + 1
    out_w = w - kw + 1
    output = np.zeros((out_h, out_w))

    for i in range(out_h):
        for j in range(out_w):
            # 이미지 영역과 커널의 요소별 곱 후 합산
            region = image[i:i+kh, j:j+kw]
            output[i, j] = np.sum(region * kernel)

    return output

# 5×5 입력 이미지
image = np.array([
    [1, 2, 3, 0, 1],
    [0, 1, 2, 3, 1],
    [1, 2, 1, 0, 0],
    [0, 1, 1, 2, 1],
    [2, 0, 1, 1, 0]
], dtype=float)

# 3×3 커널 (엣지 검출용)
kernel = np.array([
    [1, 0, -1],
    [1, 0, -1],
    [1, 0, -1]
], dtype=float)

# 합성곱 수행
output = conv2d_manual(image, kernel)

print("=" * 50)
print("📊 합성곱 연산 결과")
print("=" * 50)
print(f"입력 이미지 크기: {image.shape}")
print(f"커널 크기: {kernel.shape}")
print(f"출력 크기: {output.shape}")
print(f"\\n출력 특성 맵:\\n{output}")

# 시각화
fig, axes = plt.subplots(1, 3, figsize=(12, 4))

axes[0].imshow(image, cmap='gray')
axes[0].set_title('Input Image (5x5)', fontsize=12)
axes[0].axis('off')

axes[1].imshow(kernel, cmap='RdBu', vmin=-1, vmax=1)
axes[1].set_title('Kernel (Vertical Edge)', fontsize=12)
axes[1].axis('off')

axes[2].imshow(output, cmap='gray')
axes[2].set_title('Output Feature Map (3x3)', fontsize=12)
axes[2].axis('off')

plt.suptitle('Convolution Operation', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\n💡 커널이 이미지를 훑으면서 수직 엣지를 감지했습니다!")
\`\`\`

---

## 3. 커널(필터)의 역할

커널은 **학습 가능한 작은 가중치 행렬**입니다. 각 커널은 특정 패턴이나 특징을 감지합니다.

### 일반적인 커널 크기

| 크기 | 용도 |
|------|------|
| 3×3 | 가장 많이 사용, 효율적 |
| 5×5 | 더 넓은 영역 감지 |
| 7×7 | 초기 레이어에서 가끔 사용 |
| 1×1 | 채널 수 조정용 |

### 커널의 특징 검출 예시

| 커널 종류 | 역할 |
|-----------|------|
| 수평 엣지 | 가로선 감지 |
| 수직 엣지 | 세로선 감지 |
| 가우시안 | 블러 (노이즈 제거) |
| 샤프닝 | 선명도 강화 |

---

## 4. 스트라이드(Stride)

**스트라이드** = 커널이 이동하는 칸 수

| 스트라이드 | 효과 |
|------------|------|
| 1 (기본값) | 한 칸씩 이동, 출력 크기 큼 |
| 2 | 두 칸씩 이동, 출력 크기 절반 |

### 출력 크기 계산

**출력 크기 = (입력 - 커널) / 스트라이드 + 1**

| 입력 | 커널 | 스트라이드 | 출력 |
|------|------|-----------|------|
| 7×7 | 3×3 | 1 | 5×5 |
| 7×7 | 3×3 | 2 | 3×3 |
| 32×32 | 3×3 | 1 | 30×30 |

---

## 5. 패딩(Padding)

**패딩** = 이미지 가장자리에 값을 추가하여 출력 크기를 조절

### 패딩의 필요성

합성곱 후에는 크기가 줄어듭니다:
- 입력 5×5 → (3×3 커널) → 출력 3×3

패딩을 사용하면 크기를 유지할 수 있습니다:
- 입력 5×5 + 패딩 1 → (3×3 커널) → 출력 5×5

### 패딩 종류

| 종류 | 설명 |
|------|------|
| Valid (패딩 없음) | 크기 감소 |
| Same | 출력 = 입력 크기 |
| Zero Padding | 0으로 채움 (가장 일반적) |

### 완전한 출력 크기 공식

**출력 = (입력 + 2×패딩 - 커널) / 스트라이드 + 1**

### 🔬 실습: 스트라이드와 패딩 효과

\`\`\`python
import torch
import torch.nn as nn

# ═══════════════════════════════════════════════════════════════
# 📊 스트라이드와 패딩에 따른 출력 크기 변화
# ═══════════════════════════════════════════════════════════════

def test_conv_output(in_size, kernel, stride, padding):
    """합성곱 출력 크기 테스트"""
    conv = nn.Conv2d(1, 1, kernel_size=kernel, stride=stride, padding=padding)
    x = torch.randn(1, 1, in_size, in_size)
    out = conv(x)
    return out.shape[-1]

print("=" * 60)
print("📊 합성곱 출력 크기 실험")
print("=" * 60)
print(f"{'설정':<30} {'출력 크기':<10}")
print("-" * 40)

# 다양한 설정 테스트
configs = [
    (32, 3, 1, 0, "기본 (패딩 없음)"),
    (32, 3, 1, 1, "Same 패딩"),
    (32, 3, 2, 0, "Stride=2"),
    (32, 3, 2, 1, "Stride=2 + 패딩"),
    (32, 5, 1, 2, "5×5 커널, Same"),
]

for in_size, kernel, stride, padding, desc in configs:
    out_size = test_conv_output(in_size, kernel, stride, padding)
    print(f"입력={in_size}, k={kernel}, s={stride}, p={padding} ({desc}): {out_size}×{out_size}")

# 공식으로 직접 계산
print("\\n" + "=" * 60)
print("📐 출력 크기 공식: (입력 + 2×패딩 - 커널) / 스트라이드 + 1")
print("=" * 60)

for in_size, kernel, stride, padding, desc in configs:
    calc = (in_size + 2*padding - kernel) // stride + 1
    print(f"({in_size} + 2×{padding} - {kernel}) / {stride} + 1 = {calc}")

print("\\n💡 패딩=1, 커널=3, 스트라이드=1이면 크기가 유지됩니다!")
\`\`\`

---

## 6. PyTorch로 합성곱 구현

\`\`\`python
import torch
import torch.nn as nn

# ═══════════════════════════════════════════════════════════════
# 📊 PyTorch Conv2d 사용법
# ═══════════════════════════════════════════════════════════════

# 합성곱 레이어 정의
conv = nn.Conv2d(
    in_channels=3,      # 입력 채널 수 (RGB)
    out_channels=64,    # 출력 채널 수 (필터 개수)
    kernel_size=3,      # 커널 크기 3×3
    stride=1,           # 스트라이드
    padding=1           # 패딩 (same)
)

# 입력: (배치, 채널, 높이, 너비)
x = torch.randn(1, 3, 32, 32)
output = conv(x)

print("=" * 50)
print("📊 Conv2d 레이어 분석")
print("=" * 50)
print(f"입력 shape: {x.shape}")
print(f"출력 shape: {output.shape}")

# 파라미터 수 계산
# 가중치: out_channels × in_channels × kernel × kernel
# 편향: out_channels
weight_params = 64 * 3 * 3 * 3
bias_params = 64
total_params = sum(p.numel() for p in conv.parameters())

print(f"\\n파라미터 수:")
print(f"  가중치: {weight_params} (64 × 3 × 3 × 3)")
print(f"  편향: {bias_params}")
print(f"  총합: {total_params}")
\`\`\`

---

## 핵심 요약

| 개념 | 핵심 내용 | 기억할 포인트 |
|------|-----------|--------------|
| 합성곱 | 커널 × 이미지 영역의 합 | 특징 추출기 |
| 커널 | 학습되는 가중치 행렬 | 보통 3×3 사용 |
| 스트라이드 | 커널 이동 칸 수 | 크면 출력 작아짐 |
| 패딩 | 가장자리에 값 추가 | 크기 유지 가능 |
| 출력 크기 | (입력 + 2P - K) / S + 1 | 공식 암기! |

---

## 학습 체크리스트
- [ ] 합성곱 연산 과정을 설명할 수 있다
- [ ] 커널의 특징 추출 역할을 이해한다
- [ ] 스트라이드와 패딩의 효과를 안다
- [ ] 출력 크기 계산 공식을 사용할 수 있다

## 다음 강의 예고
**"풀링과 정규화"** - 특성 맵의 크기를 줄이고 학습을 안정화하는 기법을 배웁니다!
`;

export const LEVEL_5_LESSON_3 = `
# 풀링과 정규화

## 학습 목표
이 레슨을 완료하면:
- 풀링 레이어의 역할과 종류를 이해합니다
- Max Pooling과 Average Pooling의 차이를 파악합니다
- Batch Normalization의 원리와 효과를 배웁니다
- CNN에서의 정규화 적용 위치를 알게 됩니다

---

## 핵심 메시지
> **"풀링은 요약이고, 정규화는 균형입니다."**
> 풀링은 특성 맵을 압축하여 핵심 정보만 남기고, 정규화는 각 층의 출력을 일정한 범위로 맞춰 학습을 안정화합니다.

---

## 1. 풀링(Pooling)이란?

> **비유**: 책의 각 장을 한 문장으로 요약하는 것과 같습니다. 중요한 핵심만 남기고 세부 사항은 생략합니다. 풀링도 특성 맵에서 가장 중요한 값만 남깁니다.

### 풀링의 목적

| 목적 | 설명 |
|------|------|
| 계산량 감소 | 특성 맵 크기를 줄임 |
| 과적합 방지 | 파라미터 수 감소 |
| 위치 불변성 | 약간의 위치 변화에 강건함 |

### 풀링의 동작

2×2 풀링, 스트라이드 2를 적용하면:
- 입력 4×4 → 출력 2×2
- 크기가 **절반**으로 줄어듦

---

## 2. Max Pooling

**Max Pooling** = 영역 내 **최댓값** 선택

### 동작 예시

2×2 영역 [1, 3, 4, 2]에서:
- max(1, 3, 4, 2) = **4**

### Max Pooling의 특징

| 특징 | 설명 |
|------|------|
| 가장 강한 특징 선택 | 가장 활성화된 값만 남김 |
| 노이즈에 강함 | 작은 값들은 무시됨 |
| CNN에서 가장 많이 사용 | 표준 방식 |

### 🔬 실습: Max Pooling 구현

\`\`\`python
import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 Max Pooling 동작 이해하기
# ═══════════════════════════════════════════════════════════════

# 4×4 입력 생성
np.random.seed(42)
input_data = np.random.randint(0, 10, (4, 4)).astype(float)

# PyTorch 텐서로 변환
x = torch.tensor(input_data).unsqueeze(0).unsqueeze(0).float()

# Max Pooling 적용
pool = nn.MaxPool2d(kernel_size=2, stride=2)
output = pool(x)

print("=" * 50)
print("📊 Max Pooling 결과")
print("=" * 50)
print(f"입력 (4×4):\\n{input_data.astype(int)}")
print(f"\\n출력 (2×2):\\n{output.squeeze().numpy().astype(int)}")

# 시각화
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

im1 = axes[0].imshow(input_data, cmap='Blues', vmin=0, vmax=9)
axes[0].set_title('Input (4x4)', fontsize=12)
for i in range(4):
    for j in range(4):
        axes[0].text(j, i, int(input_data[i, j]), ha='center', va='center', fontsize=12)
axes[0].set_xticks([])
axes[0].set_yticks([])

im2 = axes[1].imshow(output.squeeze().numpy(), cmap='Blues', vmin=0, vmax=9)
axes[1].set_title('Max Pooling Output (2x2)', fontsize=12)
out_np = output.squeeze().numpy()
for i in range(2):
    for j in range(2):
        axes[1].text(j, i, int(out_np[i, j]), ha='center', va='center', fontsize=12)
axes[1].set_xticks([])
axes[1].set_yticks([])

plt.suptitle('Max Pooling: Select max value from each 2x2 region', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\n💡 각 2×2 영역에서 가장 큰 값만 남았습니다!")
\`\`\`

---

## 3. Average Pooling

**Average Pooling** = 영역 내 **평균값** 계산

### 동작 예시

2×2 영역 [1, 3, 4, 2]에서:
- avg(1, 3, 4, 2) = **2.5**

### Average Pooling의 특징

| 특징 | 설명 |
|------|------|
| 모든 값 고려 | 정보 손실이 적음 |
| 부드러운 결과 | 값들이 평균화됨 |
| Global Average Pooling | FC 레이어 대체에 사용 |

### Max vs Average Pooling 비교

| 특성 | Max Pooling | Average Pooling |
|------|-------------|-----------------|
| 선택 기준 | 최댓값 | 평균값 |
| 정보 보존 | 가장 강한 특징 | 전체 분포 |
| 주 사용처 | 대부분의 CNN | 마지막 층 (GAP) |
| 노이즈 | 강함 | 민감할 수 있음 |

---

## 4. Batch Normalization

> **비유**: 마라톤 선수들의 페이스를 매 체크포인트에서 조절하는 것과 같습니다. 너무 빠른 선수는 늦추고, 너무 느린 선수는 빠르게 하여 전체적으로 일정한 속도를 유지하게 합니다.

### Batch Normalization의 공식

**Step 1.** 배치 평균 계산: μ = (1/m) Σ x_i

**Step 2.** 배치 분산 계산: σ² = (1/m) Σ (x_i - μ)²

**Step 3.** 정규화: x̂ = (x - μ) / √(σ² + ε)

**Step 4.** 스케일 & 시프트: y = γ × x̂ + β

여기서 γ(감마)와 β(베타)는 **학습 가능한 파라미터**입니다.

### Batch Normalization의 효과

| 효과 | 설명 |
|------|------|
| 학습 속도 향상 | 더 큰 학습률 사용 가능 |
| 초기화에 덜 민감 | 가중치 초기값이 나빠도 잘 학습 |
| 정규화 효과 | 약간의 과적합 방지 |
| 기울기 흐름 개선 | 기울기 소실/폭발 완화 |

### 🔬 실습: Batch Normalization 효과

\`\`\`python
import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 Batch Normalization 효과 확인
# ═══════════════════════════════════════════════════════════════

np.random.seed(42)
torch.manual_seed(42)

# 다양한 범위의 입력 데이터 생성
batch_size = 64
features = 4

# 각 특성마다 다른 범위
data = torch.randn(batch_size, features)
data[:, 0] = data[:, 0] * 10 + 50   # 특성1: 평균~50
data[:, 1] = data[:, 1] * 0.1 - 2   # 특성2: 평균~-2
data[:, 2] = data[:, 2] * 100       # 특성3: 범위 매우 큼
data[:, 3] = data[:, 3] * 5 + 20    # 특성4: 평균~20

# Batch Normalization 적용
bn = nn.BatchNorm1d(features)
bn.eval()  # 평가 모드
normalized = bn(data)

# 결과 출력
print("=" * 55)
print("📊 Batch Normalization 효과")
print("=" * 55)

print("\\n정규화 전:")
for i in range(features):
    mean = data[:, i].mean().item()
    std = data[:, i].std().item()
    print(f"  특성 {i+1}: 평균={mean:>8.2f}, 표준편차={std:>8.2f}")

print("\\n정규화 후:")
for i in range(features):
    mean = normalized[:, i].mean().item()
    std = normalized[:, i].std().item()
    print(f"  특성 {i+1}: 평균={mean:>8.4f}, 표준편차={std:>8.4f}")

# 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# 정규화 전
axes[0].boxplot([data[:, i].numpy() for i in range(features)])
axes[0].set_xticklabels(['Feat1', 'Feat2', 'Feat3', 'Feat4'])
axes[0].set_title('Before Batch Norm: Different ranges', fontsize=12)
axes[0].set_ylabel('Value')
axes[0].grid(True, alpha=0.3)

# 정규화 후
axes[1].boxplot([normalized[:, i].detach().numpy() for i in range(features)])
axes[1].set_xticklabels(['Feat1', 'Feat2', 'Feat3', 'Feat4'])
axes[1].set_title('After Batch Norm: Uniform range', fontsize=12)
axes[1].set_ylabel('Value')
axes[1].grid(True, alpha=0.3)

plt.suptitle('Batch Normalization Effect', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\n💡 모든 특성이 비슷한 범위로 정규화되었습니다!")
\`\`\`

---

## 5. CNN에서의 레이어 순서

일반적인 CNN 블록 구성:

| 순서 | 레이어 | 역할 |
|------|--------|------|
| 1 | Conv2d | 특징 추출 |
| 2 | BatchNorm2d | 정규화 |
| 3 | ReLU | 비선형성 |
| 4 | MaxPool2d (선택) | 다운샘플링 |

### PyTorch 구현 예시

\`\`\`python
import torch.nn as nn

# 일반적인 CNN 블록
class ConvBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.conv = nn.Conv2d(in_ch, out_ch, kernel_size=3, padding=1)
        self.bn = nn.BatchNorm2d(out_ch)
        self.relu = nn.ReLU()
        self.pool = nn.MaxPool2d(2, 2)

    def forward(self, x):
        x = self.conv(x)      # 합성곱
        x = self.bn(x)        # 배치 정규화
        x = self.relu(x)      # 활성화
        x = self.pool(x)      # 풀링
        return x

# 사용 예시
block = ConvBlock(3, 64)
print(block)
\`\`\`

---

## 핵심 요약

| 개념 | 핵심 내용 | 기억할 포인트 |
|------|-----------|--------------|
| Max Pooling | 영역 내 최댓값 선택 | 강한 특징 보존 |
| Average Pooling | 영역 내 평균값 | 전체 정보 고려 |
| Batch Norm | 평균 0, 분산 1로 정규화 | 학습 안정화 |
| 레이어 순서 | Conv → BN → ReLU → Pool | 표준 구성 |

---

## 학습 체크리스트
- [ ] Max Pooling과 Average Pooling의 차이를 설명할 수 있다
- [ ] Batch Normalization의 4단계 과정을 이해한다
- [ ] CNN 블록의 일반적인 레이어 순서를 안다
- [ ] 풀링의 위치 불변성 효과를 이해한다

## 다음 강의 예고
**"CNN 아키텍처"** - LeNet, AlexNet, VGG 등 유명한 CNN 구조를 배웁니다!
`;

export const LEVEL_5_LESSON_4 = `
# CNN 아키텍처

## 학습 목표
이 레슨을 완료하면:
- CNN 아키텍처의 발전 역사를 이해합니다
- LeNet, AlexNet, VGG의 구조와 특징을 파악합니다
- 각 아키텍처의 핵심 기여를 설명할 수 있습니다
- 현대 CNN 설계 원칙을 배웁니다

---

## 핵심 메시지
> **"CNN의 역사는 '더 깊게, 더 효율적으로'의 여정입니다."**
> LeNet의 5층에서 시작해 VGG의 19층, ResNet의 152층까지. 깊이가 깊어질수록 더 복잡한 패턴을 학습할 수 있게 되었습니다.

---

## 1. LeNet-5 (1998)

> **비유**: LeNet은 CNN의 "원조 할아버지"입니다. 손글씨 숫자 인식을 위해 설계된 최초의 성공적인 CNN으로, 현대 CNN의 모든 핵심 요소를 이미 갖추고 있었습니다.

### LeNet-5 구조

| 레이어 | 출력 크기 | 설명 |
|--------|----------|------|
| 입력 | 32×32×1 | 흑백 이미지 |
| Conv1 (5×5) | 28×28×6 | 6개 필터 |
| AvgPool (2×2) | 14×14×6 | 다운샘플링 |
| Conv2 (5×5) | 10×10×16 | 16개 필터 |
| AvgPool (2×2) | 5×5×16 | 다운샘플링 |
| FC1 | 120 | Fully Connected |
| FC2 | 84 | Fully Connected |
| 출력 | 10 | 숫자 0-9 |

### LeNet의 핵심 기여

| 기여 | 설명 |
|------|------|
| 합성곱 + 풀링 | 특징 추출의 기본 패턴 확립 |
| 가중치 공유 | 파라미터 수 대폭 감소 |
| 계층적 특징 | 낮은 층은 엣지, 높은 층은 패턴 |

---

## 2. AlexNet (2012)

> **비유**: AlexNet은 "딥러닝 르네상스의 시작"입니다. 2012년 ImageNet 대회에서 기존 방법들을 압도적으로 이기며 딥러닝 시대를 열었습니다.

### AlexNet의 혁신

| 혁신 | 설명 |
|------|------|
| ReLU 활성화 | Sigmoid 대신 사용, 학습 속도 6배 향상 |
| Dropout | 과적합 방지 기법 도입 |
| GPU 학습 | 2개 GPU로 병렬 학습 |
| 데이터 증강 | 이미지 변환으로 데이터 확장 |
| Local Response Normalization | 정규화 기법 (현재는 BN으로 대체) |

### AlexNet 구조 요약

| 특성 | 값 |
|------|-----|
| 총 레이어 | 8개 (Conv 5 + FC 3) |
| 파라미터 수 | 약 6천만 개 |
| 입력 크기 | 227×227×3 |
| ImageNet 정확도 | Top-5 에러 15.3% |

---

## 3. VGGNet (2014)

> **비유**: VGG는 "단순함의 미학"을 보여줍니다. 3×3 작은 필터만 사용하고 깊이를 늘리는 간단한 전략으로 뛰어난 성능을 달성했습니다.

### VGG의 핵심 아이디어

**"3×3 필터만 사용하자!"**

왜 3×3인가?
- 5×5 필터 1개 = 3×3 필터 2개와 같은 수용 영역
- 7×7 필터 1개 = 3×3 필터 3개와 같은 수용 영역
- 파라미터는 더 적고, 비선형성은 더 많음

| 비교 | 7×7 × 1개 | 3×3 × 3개 |
|------|-----------|-----------|
| 수용 영역 | 7×7 | 7×7 (동일) |
| 파라미터 | 49C² | 27C² (45% 적음) |
| ReLU 개수 | 1개 | 3개 (더 많은 비선형성) |

### VGG 구조

| 모델 | Conv 레이어 | 파라미터 |
|------|-------------|----------|
| VGG-11 | 8 | 약 1억 3천만 |
| VGG-16 | 13 | 약 1억 3천8백만 |
| VGG-19 | 16 | 약 1억 4천4백만 |

---

## 4. 아키텍처 발전 비교

### 🔬 실습: 아키텍처 비교

\`\`\`python
import torch
import torch.nn as nn

# ═══════════════════════════════════════════════════════════════
# 📊 CNN 아키텍처 비교: 파라미터 수와 구조
# ═══════════════════════════════════════════════════════════════

# 간단한 VGG-스타일 블록
class VGGBlock(nn.Module):
    def __init__(self, in_ch, out_ch, num_convs):
        super().__init__()
        layers = []
        for i in range(num_convs):
            layers.append(nn.Conv2d(in_ch if i == 0 else out_ch, out_ch, 3, padding=1))
            layers.append(nn.BatchNorm2d(out_ch))
            layers.append(nn.ReLU(inplace=True))
        layers.append(nn.MaxPool2d(2, 2))
        self.block = nn.Sequential(*layers)

    def forward(self, x):
        return self.block(x)

# 간단한 CNN 모델들 정의
class SimpleCNN(nn.Module):
    def __init__(self, name, config):
        super().__init__()
        self.name = name
        self.features = nn.Sequential(*[
            VGGBlock(in_ch, out_ch, num_convs)
            for in_ch, out_ch, num_convs in config
        ])
        self.classifier = nn.Linear(512 * 7 * 7, 1000)

    def forward(self, x):
        x = self.features(x)
        x = x.view(x.size(0), -1)
        return self.classifier(x)

# 설정: (입력채널, 출력채널, Conv 레이어 수)
configs = {
    'VGG-11 스타일': [(3, 64, 1), (64, 128, 1), (128, 256, 2), (256, 512, 2), (512, 512, 2)],
    'VGG-16 스타일': [(3, 64, 2), (64, 128, 2), (128, 256, 3), (256, 512, 3), (512, 512, 3)],
}

print("=" * 60)
print("📊 CNN 아키텍처 비교")
print("=" * 60)

for name, config in configs.items():
    model = SimpleCNN(name, config)
    total_params = sum(p.numel() for p in model.parameters())
    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)

    print(f"\\n{name}:")
    print(f"  총 파라미터: {total_params:,}")
    print(f"  학습 가능: {trainable:,}")

# 역사적 발전 요약
print("\\n" + "=" * 60)
print("📈 CNN 아키텍처 발전 역사")
print("=" * 60)

history = [
    ("1998", "LeNet-5", "5층", "6만", "손글씨 인식의 시작"),
    ("2012", "AlexNet", "8층", "6천만", "딥러닝 르네상스"),
    ("2014", "VGG", "19층", "1.4억", "3×3 필터의 힘"),
    ("2014", "GoogLeNet", "22층", "5백만", "Inception 모듈"),
    ("2015", "ResNet", "152층", "6천만", "스킵 연결"),
]

print(f"{'년도':<6} {'모델':<12} {'깊이':<8} {'파라미터':<10} {'핵심 기여'}")
print("-" * 60)
for year, model, depth, params, contribution in history:
    print(f"{year:<6} {model:<12} {depth:<8} {params:<10} {contribution}")

print("\\n💡 더 깊어지면서도 효율적인 방향으로 발전했습니다!")
\`\`\`

---

## 5. 현대 CNN 설계 원칙

| 원칙 | 설명 |
|------|------|
| 작은 필터 선호 | 3×3이 표준, 가끔 1×1 사용 |
| BatchNorm 사용 | 모든 Conv 뒤에 적용 |
| ReLU 활성화 | 또는 변형 (LeakyReLU, GELU) |
| 깊이 > 너비 | 더 깊은 네트워크 선호 |
| 스킵 연결 | 매우 깊은 경우 필수 (ResNet) |
| Global Average Pooling | FC 레이어 대신 사용 |

---

## 핵심 요약

| 모델 | 년도 | 깊이 | 핵심 기여 |
|------|------|------|-----------|
| LeNet | 1998 | 5층 | CNN의 기본 구조 확립 |
| AlexNet | 2012 | 8층 | ReLU, Dropout, GPU |
| VGG | 2014 | 19층 | 3×3 필터, 깊이의 힘 |

---

## 학습 체크리스트
- [ ] LeNet의 역사적 의의를 설명할 수 있다
- [ ] AlexNet의 혁신 5가지를 나열할 수 있다
- [ ] VGG의 3×3 필터 전략을 이해한다
- [ ] 현대 CNN 설계 원칙을 알고 있다

## 다음 강의 예고
**"CNN 구현 (MNIST)"** - PyTorch로 CNN을 직접 구현하고 MNIST를 분류합니다!
`;

export const LEVEL_5_LESSON_5 = `
# CNN 구현 (MNIST)

## 학습 목표
이 레슨을 완료하면:
- PyTorch로 CNN 모델을 처음부터 구현합니다
- MNIST 데이터셋에서 99% 이상의 정확도를 달성합니다
- 학습 과정을 시각화하고 분석합니다
- MLP와 CNN의 성능을 비교합니다

---

## 핵심 메시지
> **"CNN은 이미지의 공간 구조를 이해합니다."**
> MLP는 이미지를 일렬로 펼쳐서 처리하지만, CNN은 2D 구조를 유지하며 인접 픽셀 간의 관계를 학습합니다. 이것이 이미지 인식에서 CNN이 압도적인 이유입니다.

---

## 1. 데이터 준비

### 🔬 실습: MNIST 데이터 로딩

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import matplotlib.pyplot as plt
import numpy as np

# ═══════════════════════════════════════════════════════════════
# 📊 MNIST 데이터셋 준비
# ═══════════════════════════════════════════════════════════════

# 데이터 변환 정의
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))  # MNIST 평균, 표준편차
])

# 데이터셋 다운로드
train_dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
test_dataset = datasets.MNIST('./data', train=False, transform=transform)

# DataLoader 생성
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

print("=" * 50)
print("📊 MNIST 데이터셋 정보")
print("=" * 50)
print(f"훈련 데이터: {len(train_dataset)}개")
print(f"테스트 데이터: {len(test_dataset)}개")
print(f"이미지 크기: 28 × 28 × 1 (흑백)")
print(f"클래스 수: 10 (숫자 0-9)")

# 샘플 이미지 시각화
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    img, label = train_dataset[i]
    ax.imshow(img.squeeze(), cmap='gray')
    ax.set_title(f'Label: {label}')
    ax.axis('off')
plt.suptitle('MNIST Sample Images', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()
\`\`\`

---

## 2. CNN 모델 설계

### 모델 구조

| 레이어 | 출력 크기 | 파라미터 |
|--------|----------|----------|
| 입력 | 1×28×28 | - |
| Conv1 (3×3, 32필터) | 32×28×28 | 320 |
| MaxPool (2×2) | 32×14×14 | - |
| Conv2 (3×3, 64필터) | 64×14×14 | 18,496 |
| MaxPool (2×2) | 64×7×7 | - |
| Flatten | 3136 | - |
| FC1 | 128 | 401,536 |
| FC2 | 10 | 1,290 |

### 🔬 실습: CNN 모델 정의

\`\`\`python
import torch
import torch.nn as nn

# ═══════════════════════════════════════════════════════════════
# 📊 CNN 모델 정의
# ═══════════════════════════════════════════════════════════════

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()

        # 합성곱 레이어
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)

        # 풀링 레이어
        self.pool = nn.MaxPool2d(2, 2)

        # 정규화
        self.bn1 = nn.BatchNorm2d(32)
        self.bn2 = nn.BatchNorm2d(64)

        # 완전연결 레이어
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)

        # 드롭아웃
        self.dropout = nn.Dropout(0.25)

    def forward(self, x):
        # 첫 번째 합성곱 블록: Conv -> BN -> ReLU -> Pool
        x = self.pool(torch.relu(self.bn1(self.conv1(x))))

        # 두 번째 합성곱 블록
        x = self.pool(torch.relu(self.bn2(self.conv2(x))))

        # Flatten
        x = x.view(-1, 64 * 7 * 7)

        # 완전연결 레이어
        x = self.dropout(torch.relu(self.fc1(x)))
        x = self.fc2(x)

        return x

# 모델 생성
model = CNN()

# 모델 구조 출력
print("=" * 50)
print("📊 CNN 모델 구조")
print("=" * 50)
print(model)

# 파라미터 수 계산
total_params = sum(p.numel() for p in model.parameters())
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
print(f"\\n총 파라미터: {total_params:,}")
print(f"학습 가능: {trainable_params:,}")

# 입력/출력 테스트
x = torch.randn(1, 1, 28, 28)
output = model(x)
print(f"\\n입력 shape: {x.shape}")
print(f"출력 shape: {output.shape}")
\`\`\`

---

## 3. 학습 루프

### 🔬 실습: 모델 학습

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 CNN 모델 학습
# ═══════════════════════════════════════════════════════════════

# 디바이스 설정
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"사용 디바이스: {device}")

# 모델, 손실함수, 옵티마이저
model = CNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 학습 기록
train_losses = []
train_accs = []
test_accs = []

# 학습 함수
def train_epoch(model, loader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    correct = 0
    total = 0

    for data, target in loader:
        data, target = data.to(device), target.to(device)

        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()
        pred = output.argmax(dim=1)
        correct += pred.eq(target).sum().item()
        total += target.size(0)

    return total_loss / len(loader), 100. * correct / total

# 평가 함수
def evaluate(model, loader, device):
    model.eval()
    correct = 0
    total = 0

    with torch.no_grad():
        for data, target in loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            pred = output.argmax(dim=1)
            correct += pred.eq(target).sum().item()
            total += target.size(0)

    return 100. * correct / total

# 학습 실행
epochs = 10
print("\\n학습 시작!")
print("=" * 50)

for epoch in range(1, epochs + 1):
    train_loss, train_acc = train_epoch(model, train_loader, criterion, optimizer, device)
    test_acc = evaluate(model, test_loader, device)

    train_losses.append(train_loss)
    train_accs.append(train_acc)
    test_accs.append(test_acc)

    print(f"Epoch {epoch:2d}/{epochs} | Loss: {train_loss:.4f} | "
          f"Train Acc: {train_acc:.2f}% | Test Acc: {test_acc:.2f}%")

print("=" * 50)
print(f"최종 테스트 정확도: {test_accs[-1]:.2f}%")

# 학습 곡선 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

axes[0].plot(train_losses, 'b-', linewidth=2)
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Loss')
axes[0].set_title('Training Loss')
axes[0].grid(True, alpha=0.3)

axes[1].plot(train_accs, 'b-', label='Train', linewidth=2)
axes[1].plot(test_accs, 'r--', label='Test', linewidth=2)
axes[1].set_xlabel('Epoch')
axes[1].set_ylabel('Accuracy (%)')
axes[1].set_title('Accuracy')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.suptitle('CNN Training Results (MNIST)', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()
\`\`\`

---

## 4. 예측 결과 분석

### 🔬 실습: 예측 시각화

\`\`\`python
import torch
import matplotlib.pyplot as plt
import numpy as np

# ═══════════════════════════════════════════════════════════════
# 📊 예측 결과 분석
# ═══════════════════════════════════════════════════════════════

model.eval()

# 테스트 이미지 가져오기
test_images, test_labels = next(iter(test_loader))
test_images, test_labels = test_images[:16].to(device), test_labels[:16].to(device)

# 예측
with torch.no_grad():
    outputs = model(test_images)
    predictions = outputs.argmax(dim=1)

# 시각화
fig, axes = plt.subplots(4, 4, figsize=(10, 10))

for i, ax in enumerate(axes.flat):
    img = test_images[i].cpu().squeeze()
    true_label = test_labels[i].item()
    pred_label = predictions[i].item()

    ax.imshow(img, cmap='gray')

    color = 'green' if true_label == pred_label else 'red'
    ax.set_title(f'Pred: {pred_label} (True: {true_label})', color=color)
    ax.axis('off')

plt.suptitle('CNN Predictions (Green=Correct, Red=Wrong)', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# 정확도 계산
correct = (predictions == test_labels).sum().item()
print(f"\\n표시된 16개 중 {correct}개 정답")
\`\`\`

---

## 핵심 요약

| 단계 | 내용 | 핵심 포인트 |
|------|------|-------------|
| 데이터 | MNIST 로딩 | transforms, DataLoader |
| 모델 | CNN 정의 | Conv → BN → ReLU → Pool |
| 학습 | 10 에포크 | Adam, CrossEntropy |
| 결과 | 99%+ 정확도 | MLP보다 우수 |

---

## 학습 체크리스트
- [ ] CNN 모델을 직접 정의할 수 있다
- [ ] 학습 루프를 구현할 수 있다
- [ ] train/eval 모드의 차이를 안다
- [ ] 학습 곡선을 해석할 수 있다

## 다음 강의 예고
**"CNN 구현 (CIFAR-10)"** - 더 복잡한 컬러 이미지 분류에 도전합니다!
`;

export const LEVEL_5_LESSON_6 = `
# CNN 구현 (CIFAR-10)

## 학습 목표
이 레슨을 완료하면:
- CIFAR-10 데이터셋의 특성을 이해합니다
- 데이터 증강 기법을 적용합니다
- 더 깊은 CNN을 구현합니다
- 컬러 이미지 분류 모델을 학습합니다

---

## 핵심 메시지
> **"실제 이미지는 MNIST보다 훨씬 복잡합니다."**
> CIFAR-10은 컬러 이미지, 다양한 배경, 다양한 물체 위치를 가집니다. 이를 해결하려면 더 깊은 네트워크와 데이터 증강이 필요합니다.

---

## 1. CIFAR-10 데이터셋

### MNIST vs CIFAR-10 비교

| 특성 | MNIST | CIFAR-10 |
|------|-------|----------|
| 이미지 크기 | 28×28 | 32×32 |
| 색상 | 흑백 (1채널) | 컬러 (3채널) |
| 클래스 | 숫자 0-9 | 사물 10종 |
| 난이도 | 쉬움 | 중간 |
| 배경 | 단순 (검정) | 복잡 (다양) |

### CIFAR-10의 10개 클래스
비행기, 자동차, 새, 고양이, 사슴, 개, 개구리, 말, 배, 트럭

### 🔬 실습: CIFAR-10 데이터 로딩

\`\`\`python
import torch
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import matplotlib.pyplot as plt
import numpy as np

# ═══════════════════════════════════════════════════════════════
# 📊 CIFAR-10 데이터셋 준비
# ═══════════════════════════════════════════════════════════════

# 클래스 이름
classes = ['비행기', '자동차', '새', '고양이', '사슴',
           '개', '개구리', '말', '배', '트럭']

# 훈련용 변환 (데이터 증강 포함)
train_transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),  # 좌우 반전
    transforms.RandomCrop(32, padding=4),  # 랜덤 크롭
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),
                         (0.2470, 0.2435, 0.2616))
])

# 테스트용 변환 (증강 없음)
test_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),
                         (0.2470, 0.2435, 0.2616))
])

# 데이터셋 로드
train_dataset = datasets.CIFAR10('./data', train=True, download=True,
                                  transform=train_transform)
test_dataset = datasets.CIFAR10('./data', train=False,
                                 transform=test_transform)

train_loader = DataLoader(train_dataset, batch_size=128, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=100, shuffle=False)

print("=" * 50)
print("📊 CIFAR-10 데이터셋 정보")
print("=" * 50)
print(f"훈련 데이터: {len(train_dataset)}개")
print(f"테스트 데이터: {len(test_dataset)}개")
print(f"이미지 크기: 32 × 32 × 3 (컬러)")
print(f"클래스 수: 10")

# 샘플 이미지 시각화 (정규화 해제)
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    # 정규화 해제를 위한 원본 이미지 사용
    img, label = datasets.CIFAR10('./data', train=True, download=False)[i]
    ax.imshow(img)
    ax.set_title(classes[label])
    ax.axis('off')
plt.suptitle('CIFAR-10 Sample Images', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()
\`\`\`

---

## 2. 데이터 증강

데이터 증강은 학습 데이터를 인위적으로 늘려 과적합을 방지합니다.

### 주요 증강 기법

| 기법 | 설명 | 효과 |
|------|------|------|
| RandomHorizontalFlip | 좌우 반전 | 방향 불변성 |
| RandomCrop | 랜덤 자르기 | 위치 불변성 |
| RandomRotation | 회전 | 각도 불변성 |
| ColorJitter | 색상 변환 | 조명 불변성 |

---

## 3. 깊은 CNN 모델

### 🔬 실습: CIFAR-10용 CNN

\`\`\`python
import torch
import torch.nn as nn

# ═══════════════════════════════════════════════════════════════
# 📊 CIFAR-10용 깊은 CNN 모델
# ═══════════════════════════════════════════════════════════════

class CIFAR10_CNN(nn.Module):
    def __init__(self):
        super(CIFAR10_CNN, self).__init__()

        # 블록 1: 32 -> 32 -> Pool -> 16
        self.block1 = nn.Sequential(
            nn.Conv2d(3, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2)
        )

        # 블록 2: 16 -> 16 -> Pool -> 8
        self.block2 = nn.Sequential(
            nn.Conv2d(64, 128, 3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 128, 3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2)
        )

        # 블록 3: 8 -> 8 -> Pool -> 4
        self.block3 = nn.Sequential(
            nn.Conv2d(128, 256, 3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(inplace=True),
            nn.Conv2d(256, 256, 3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2)
        )

        # 분류기
        self.classifier = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(256 * 4 * 4, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(512, 10)
        )

    def forward(self, x):
        x = self.block1(x)
        x = self.block2(x)
        x = self.block3(x)
        x = x.view(x.size(0), -1)
        x = self.classifier(x)
        return x

# 모델 생성
model = CIFAR10_CNN()

print("=" * 50)
print("📊 CIFAR-10 CNN 모델")
print("=" * 50)

# 파라미터 수
total_params = sum(p.numel() for p in model.parameters())
print(f"총 파라미터: {total_params:,}")

# 테스트
x = torch.randn(1, 3, 32, 32)
output = model(x)
print(f"입력: {x.shape} -> 출력: {output.shape}")
\`\`\`

---

## 4. 학습 및 평가

### 🔬 실습: CIFAR-10 학습

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 CIFAR-10 모델 학습
# ═══════════════════════════════════════════════════════════════

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = CIFAR10_CNN().to(device)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.5)

# 학습 기록
train_losses, test_accs = [], []

# 학습 실행
epochs = 20
print("\\n학습 시작!")
print("=" * 60)

for epoch in range(1, epochs + 1):
    # 훈련
    model.train()
    total_loss = 0
    for data, target in train_loader:
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    # 평가
    model.eval()
    correct = 0
    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            correct += output.argmax(1).eq(target).sum().item()

    train_loss = total_loss / len(train_loader)
    test_acc = 100. * correct / len(test_dataset)

    train_losses.append(train_loss)
    test_accs.append(test_acc)

    scheduler.step()

    if epoch % 5 == 0 or epoch == 1:
        print(f"Epoch {epoch:2d}/{epochs} | Loss: {train_loss:.4f} | "
              f"Test Acc: {test_acc:.2f}%")

print("=" * 60)
print(f"최종 테스트 정확도: {test_accs[-1]:.2f}%")

# 학습 곡선
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].plot(train_losses, 'b-', linewidth=2)
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Loss')
axes[0].set_title('Training Loss')
axes[0].grid(True, alpha=0.3)

axes[1].plot(test_accs, 'r-', linewidth=2)
axes[1].set_xlabel('Epoch')
axes[1].set_ylabel('Accuracy (%)')
axes[1].set_title('Test Accuracy')
axes[1].grid(True, alpha=0.3)

plt.suptitle('CIFAR-10 CNN Training Results', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()
\`\`\`

---

## 핵심 요약

| 항목 | MNIST CNN | CIFAR-10 CNN |
|------|-----------|--------------|
| 입력 | 1×28×28 | 3×32×32 |
| Conv 블록 | 2개 | 3개 |
| 데이터 증강 | 불필요 | 필수 |
| 목표 정확도 | 99%+ | 85%+ |

---

## 학습 체크리스트
- [ ] MNIST와 CIFAR-10의 차이를 설명할 수 있다
- [ ] 데이터 증강 기법을 적용할 수 있다
- [ ] 더 깊은 CNN을 구현할 수 있다
- [ ] 학습률 스케줄러를 사용할 수 있다

## 다음 강의 예고
**"전이 학습"** - 사전 훈련된 모델을 활용하여 적은 데이터로 높은 성능을 달성합니다!
`;

export const LEVEL_5_LESSON_7 = `
# 전이 학습

## 학습 목표
이 레슨을 완료하면:
- 전이 학습의 개념과 이점을 이해합니다
- 사전 훈련된 모델을 로드하고 사용합니다
- 특성 추출(Feature Extraction)과 미세 조정(Fine-tuning)의 차이를 파악합니다
- 실제 이미지 분류에 전이 학습을 적용합니다

---

## 핵심 메시지
> **"거인의 어깨 위에 서라."**
> ImageNet에서 훈련된 모델은 이미 일반적인 이미지 특징(엣지, 텍스처, 패턴)을 학습했습니다. 이 지식을 재활용하면 적은 데이터로도 높은 성능을 얻을 수 있습니다.

---

## 1. 전이 학습이란?

> **비유**: 피아노를 배운 사람이 신디사이저를 더 빨리 배우는 것과 같습니다. 기본적인 건반 연주 능력이 이미 있기 때문입니다. 전이 학습도 마찬가지로, 다른 문제에서 학습한 지식을 새로운 문제에 활용합니다.

### 전이 학습의 이점

| 이점 | 설명 |
|------|------|
| 적은 데이터 | 수백~수천 장으로도 가능 |
| 빠른 학습 | 처음부터 학습하는 것보다 훨씬 빠름 |
| 높은 성능 | 작은 데이터셋에서도 좋은 결과 |
| 컴퓨팅 절약 | GPU 시간 대폭 감소 |

---

## 2. 두 가지 접근 방식

### 특성 추출 (Feature Extraction)

사전 훈련된 층은 **동결(freeze)**하고, 새로운 분류기만 학습합니다.

| 레이어 | 학습 여부 |
|--------|----------|
| Conv 레이어들 | 동결 (학습 X) |
| 새 FC 레이어 | 학습 O |

**사용 시점**: 데이터가 매우 적거나, 원본 데이터셋과 비슷한 경우

### 미세 조정 (Fine-tuning)

전체 또는 일부 층을 **작은 학습률**로 추가 학습합니다.

| 레이어 | 학습 여부 |
|--------|----------|
| 초기 Conv 레이어 | 동결 |
| 후기 Conv 레이어 | 학습 (작은 lr) |
| FC 레이어 | 학습 |

**사용 시점**: 데이터가 충분하거나, 원본과 다른 도메인인 경우

---

## 3. PyTorch에서 사전 훈련 모델 사용

### 🔬 실습: ResNet 사전 훈련 모델 로드

\`\`\`python
import torch
import torch.nn as nn
from torchvision import models

# ═══════════════════════════════════════════════════════════════
# 📊 사전 훈련된 ResNet18 로드
# ═══════════════════════════════════════════════════════════════

# 사전 훈련된 모델 로드
model = models.resnet18(weights='IMAGENET1K_V1')

print("=" * 50)
print("📊 ResNet18 구조")
print("=" * 50)

# 마지막 FC 레이어 확인
print(f"원래 FC 레이어: {model.fc}")
print(f"  입력: 512, 출력: 1000 (ImageNet 클래스)")

# 새로운 분류기로 교체 (예: 10 클래스)
num_classes = 10
model.fc = nn.Linear(512, num_classes)
print(f"\\n새 FC 레이어: {model.fc}")
print(f"  입력: 512, 출력: {num_classes}")

# 파라미터 수
total = sum(p.numel() for p in model.parameters())
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
print(f"\\n총 파라미터: {total:,}")
print(f"학습 가능: {trainable:,}")
\`\`\`

---

## 4. 특성 추출 구현

### 🔬 실습: 층 동결하기

\`\`\`python
import torch
import torch.nn as nn
from torchvision import models

# ═══════════════════════════════════════════════════════════════
# 📊 특성 추출: Conv 층 동결
# ═══════════════════════════════════════════════════════════════

model = models.resnet18(weights='IMAGENET1K_V1')

# 모든 파라미터 동결
for param in model.parameters():
    param.requires_grad = False

# 새 분류기 추가 (이 레이어만 학습됨)
model.fc = nn.Sequential(
    nn.Linear(512, 256),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(256, 10)
)

print("=" * 50)
print("📊 특성 추출 모드")
print("=" * 50)

# 학습 가능한 파라미터 확인
total = sum(p.numel() for p in model.parameters())
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)

print(f"총 파라미터: {total:,}")
print(f"학습 가능: {trainable:,} ({100*trainable/total:.1f}%)")

# 어떤 레이어가 학습되는지 확인
print("\\n학습되는 레이어:")
for name, param in model.named_parameters():
    if param.requires_grad:
        print(f"  {name}: {param.shape}")
\`\`\`

---

## 5. 미세 조정 구현

### 🔬 실습: 일부 층 해동하기

\`\`\`python
import torch
import torch.nn as nn
from torchvision import models

# ═══════════════════════════════════════════════════════════════
# 📊 미세 조정: 일부 층 해동
# ═══════════════════════════════════════════════════════════════

model = models.resnet18(weights='IMAGENET1K_V1')

# 먼저 모두 동결
for param in model.parameters():
    param.requires_grad = False

# layer4와 fc만 해동 (미세 조정)
for param in model.layer4.parameters():
    param.requires_grad = True

# 새 분류기
model.fc = nn.Linear(512, 10)

print("=" * 50)
print("📊 미세 조정 모드")
print("=" * 50)

total = sum(p.numel() for p in model.parameters())
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)

print(f"총 파라미터: {total:,}")
print(f"학습 가능: {trainable:,} ({100*trainable/total:.1f}%)")

# 레이어별 학습률 설정 (미세 조정 시 중요!)
optimizer = torch.optim.Adam([
    {'params': model.layer4.parameters(), 'lr': 1e-4},  # 작은 학습률
    {'params': model.fc.parameters(), 'lr': 1e-3}       # 일반 학습률
])

print("\\n레이어별 학습률:")
print("  layer4: 0.0001 (작은 학습률)")
print("  fc:     0.001  (일반 학습률)")
\`\`\`

---

## 6. 실전 전이 학습 예제

### 🔬 실습: CIFAR-10에 전이 학습 적용

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, datasets, transforms
from torch.utils.data import DataLoader

# ═══════════════════════════════════════════════════════════════
# 📊 CIFAR-10에 전이 학습 적용
# ═══════════════════════════════════════════════════════════════

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 데이터 준비 (ImageNet 정규화 사용)
transform = transforms.Compose([
    transforms.Resize(224),  # ResNet 입력 크기
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

train_data = datasets.CIFAR10('./data', train=True, download=True, transform=transform)
test_data = datasets.CIFAR10('./data', train=False, transform=transform)

# 작은 서브셋 사용 (전이 학습의 장점 보여주기)
train_subset = torch.utils.data.Subset(train_data, range(5000))  # 5000개만
train_loader = DataLoader(train_subset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_data, batch_size=100)

# 모델 준비 (특성 추출)
model = models.resnet18(weights='IMAGENET1K_V1')
for param in model.parameters():
    param.requires_grad = False
model.fc = nn.Linear(512, 10)
model = model.to(device)

# 학습 설정
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.fc.parameters(), lr=0.001)

print("=" * 50)
print("📊 전이 학습 (특성 추출)")
print("=" * 50)
print(f"훈련 데이터: {len(train_subset)}개 (전체의 10%)")
print(f"디바이스: {device}")

# 학습
epochs = 5
for epoch in range(1, epochs + 1):
    model.train()
    for data, target in train_loader:
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()

    # 평가
    model.eval()
    correct = 0
    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            correct += model(data).argmax(1).eq(target).sum().item()

    acc = 100. * correct / len(test_data)
    print(f"Epoch {epoch}/{epochs} | Test Acc: {acc:.2f}%")

print("\\n💡 10%의 데이터만으로도 좋은 성능을 얻었습니다!")
\`\`\`

---

## 핵심 요약

| 방법 | 동결 층 | 학습 층 | 사용 시점 |
|------|---------|---------|----------|
| 특성 추출 | Conv 전체 | FC만 | 데이터 적음 |
| 미세 조정 | 초기 Conv | 후기 Conv + FC | 데이터 많음 |

---

## 학습 체크리스트
- [ ] 전이 학습의 이점을 설명할 수 있다
- [ ] 특성 추출과 미세 조정의 차이를 안다
- [ ] requires_grad로 층을 동결할 수 있다
- [ ] 레이어별 다른 학습률을 설정할 수 있다

## 다음 강의 예고
**"데이터 증강"** - 적은 데이터를 효과적으로 늘리는 다양한 기법을 배웁니다!
`;

export const LEVEL_5_LESSON_8 = `
# 데이터 증강

## 학습 목표
이 레슨을 완료하면:
- 데이터 증강의 필요성과 효과를 이해합니다
- 다양한 이미지 증강 기법을 적용합니다
- torchvision.transforms를 능숙하게 사용합니다
- 데이터 증강이 모델 성능에 미치는 영향을 파악합니다

---

## 핵심 메시지
> **"같은 이미지를 다르게 보는 연습"**
> 사람은 고양이 사진을 뒤집어도, 회전해도, 밝기가 달라도 고양이로 인식합니다. 데이터 증강은 모델에게 이런 "불변성"을 가르치는 방법입니다.

---

## 1. 왜 데이터 증강이 필요한가?

### 데이터 부족의 문제

| 문제 | 원인 | 결과 |
|------|------|------|
| 과적합 | 훈련 데이터 암기 | 새 데이터에서 성능 하락 |
| 다양성 부족 | 한정된 조건의 데이터 | 실제 환경에서 실패 |
| 수집 비용 | 라벨링 비용 높음 | 충분한 데이터 확보 어려움 |

### 데이터 증강의 효과

| 효과 | 설명 |
|------|------|
| 데이터 양 증가 | 가상으로 훈련 데이터 확장 |
| 과적합 방지 | 매번 다른 변형 이미지 학습 |
| 불변성 학습 | 회전, 이동, 색상 변화에 강건 |
| 일반화 향상 | 실제 환경에서 성능 개선 |

---

## 2. 주요 증강 기법

### 기하학적 변환

| 기법 | 설명 | PyTorch |
|------|------|---------|
| 좌우 반전 | 50% 확률로 뒤집기 | RandomHorizontalFlip() |
| 상하 반전 | 50% 확률로 뒤집기 | RandomVerticalFlip() |
| 회전 | 임의 각도 회전 | RandomRotation(degrees) |
| 크롭 | 일부분 자르기 | RandomCrop(size, padding) |
| 크기 조절 | 랜덤 크기 변경 후 자르기 | RandomResizedCrop(size) |

### 색상 변환

| 기법 | 설명 | PyTorch |
|------|------|---------|
| 밝기 | 밝기 조절 | ColorJitter(brightness) |
| 대비 | 대비 조절 | ColorJitter(contrast) |
| 채도 | 색상 강도 조절 | ColorJitter(saturation) |
| 색조 | 색상 변경 | ColorJitter(hue) |
| 흑백 | 그레이스케일 변환 | RandomGrayscale(p) |

---

## 3. PyTorch 구현

### 🔬 실습: 증강 기법 시각화

\`\`\`python
import torch
from torchvision import transforms
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np

# ═══════════════════════════════════════════════════════════════
# 📊 데이터 증강 기법 시각화
# ═══════════════════════════════════════════════════════════════

# 샘플 이미지 생성 (체커보드 패턴)
def create_sample_image():
    img = np.zeros((64, 64, 3), dtype=np.uint8)
    img[::8, ::8] = [255, 100, 100]  # 빨간 점
    img[4::8, 4::8] = [100, 100, 255]  # 파란 점
    for i in range(64):
        for j in range(64):
            if (i // 8 + j // 8) % 2 == 0:
                img[i, j] = [200, 200, 200]
    return Image.fromarray(img)

original = create_sample_image()

# 다양한 증강 기법
augmentations = {
    'Original': transforms.Compose([transforms.ToTensor()]),
    'H-Flip': transforms.Compose([
        transforms.RandomHorizontalFlip(p=1.0),
        transforms.ToTensor()
    ]),
    'Rotation (45)': transforms.Compose([
        transforms.RandomRotation([45, 45]),
        transforms.ToTensor()
    ]),
    'Random Crop': transforms.Compose([
        transforms.RandomCrop(48),
        transforms.Resize(64),
        transforms.ToTensor()
    ]),
    'Color Jitter': transforms.Compose([
        transforms.ColorJitter(brightness=0.5, contrast=0.5, saturation=0.5),
        transforms.ToTensor()
    ]),
    'Combined': transforms.Compose([
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(0.2, 0.2, 0.2),
        transforms.ToTensor()
    ]),
}

# 시각화
fig, axes = plt.subplots(2, 3, figsize=(12, 8))

for ax, (name, transform) in zip(axes.flat, augmentations.items()):
    img_tensor = transform(original)
    img_np = img_tensor.permute(1, 2, 0).numpy()
    img_np = np.clip(img_np, 0, 1)
    ax.imshow(img_np)
    ax.set_title(name, fontsize=12)
    ax.axis('off')

plt.suptitle('Data Augmentation Techniques', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()
\`\`\`

---

## 4. 실전 증강 파이프라인

### 🔬 실습: CIFAR-10 증강 파이프라인

\`\`\`python
from torchvision import transforms

# ═══════════════════════════════════════════════════════════════
# 📊 실전 데이터 증강 파이프라인
# ═══════════════════════════════════════════════════════════════

# 훈련용 (강한 증강)
train_transform = transforms.Compose([
    # 기하학적 변환
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(15),
    transforms.RandomCrop(32, padding=4),

    # 색상 변환
    transforms.ColorJitter(
        brightness=0.2,
        contrast=0.2,
        saturation=0.2,
        hue=0.1
    ),

    # 텐서 변환 및 정규화
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.4914, 0.4822, 0.4465],
        std=[0.2470, 0.2435, 0.2616]
    ),

    # 추가 정규화 (선택)
    transforms.RandomErasing(p=0.2),  # 일부 영역 지우기
])

# 테스트용 (증강 없음)
test_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.4914, 0.4822, 0.4465],
        std=[0.2470, 0.2435, 0.2616]
    ),
])

print("=" * 50)
print("📊 훈련용 증강 파이프라인")
print("=" * 50)
print("1. RandomHorizontalFlip (p=0.5)")
print("2. RandomRotation (±15°)")
print("3. RandomCrop (32, padding=4)")
print("4. ColorJitter (밝기, 대비, 채도, 색조)")
print("5. ToTensor + Normalize")
print("6. RandomErasing (p=0.2)")

print("\\n📊 테스트용 파이프라인")
print("=" * 50)
print("1. ToTensor + Normalize (증강 없음)")
\`\`\`

---

## 5. 증강 효과 검증

### 🔬 실습: 증강 유무에 따른 성능 비교

\`\`\`python
import torch
import torch.nn as nn
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 데이터 증강 효과 시뮬레이션
# ═══════════════════════════════════════════════════════════════

# 시뮬레이션 데이터 (실제 학습 결과 시뮬레이션)
epochs = list(range(1, 31))

# 증강 없이 학습
no_aug_train = [90 - 30*np.exp(-e/5) + np.random.randn()*2 for e in epochs]
no_aug_test = [75 - 20*np.exp(-e/8) + np.random.randn()*2 for e in epochs]

# 증강과 함께 학습
with_aug_train = [85 - 25*np.exp(-e/7) + np.random.randn()*2 for e in epochs]
with_aug_test = [82 - 15*np.exp(-e/10) + np.random.randn()*2 for e in epochs]

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 훈련 정확도
axes[0].plot(epochs, no_aug_train, 'b-', label='No Augmentation', linewidth=2)
axes[0].plot(epochs, with_aug_train, 'g-', label='With Augmentation', linewidth=2)
axes[0].set_xlabel('Epoch')
axes[0].set_ylabel('Train Accuracy (%)')
axes[0].set_title('Train Accuracy')
axes[0].legend()
axes[0].grid(True, alpha=0.3)
axes[0].set_ylim(50, 95)

# 테스트 정확도
axes[1].plot(epochs, no_aug_test, 'b-', label='No Augmentation', linewidth=2)
axes[1].plot(epochs, with_aug_test, 'g-', label='With Augmentation', linewidth=2)
axes[1].axhline(y=80, color='r', linestyle='--', alpha=0.5, label='Target Accuracy')
axes[1].set_xlabel('Epoch')
axes[1].set_ylabel('Test Accuracy (%)')
axes[1].set_title('Test Accuracy')
axes[1].legend()
axes[1].grid(True, alpha=0.3)
axes[1].set_ylim(50, 95)

plt.suptitle('Data Augmentation Effect Comparison', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("=" * 55)
print("📊 결과 분석")
print("=" * 55)
print("증강 없음:")
print("  - 훈련 정확도 높음, 테스트 정확도 낮음 → 과적합!")
print("\\n증강 있음:")
print("  - 훈련 정확도 약간 낮음, 테스트 정확도 높음 → 일반화 성공!")
print("\\n💡 데이터 증강은 과적합을 방지하고 일반화 성능을 높입니다!")
\`\`\`

---

## 핵심 요약

| 증강 유형 | 기법 | 효과 |
|----------|------|------|
| 기하학적 | Flip, Rotation, Crop | 위치/방향 불변성 |
| 색상 | ColorJitter, Grayscale | 조명/색상 불변성 |
| 삭제 | RandomErasing | 부분 가림에 강건 |
| 혼합 | Mixup, CutMix | 고급 정규화 |

---

## 학습 체크리스트
- [ ] 데이터 증강의 필요성을 설명할 수 있다
- [ ] 기하학적/색상 증강 기법을 구분한다
- [ ] transforms.Compose로 파이프라인을 만들 수 있다
- [ ] 훈련/테스트 시 증강 적용 차이를 안다

## Level 5 완료!
축하합니다! CNN과 이미지 처리의 핵심을 모두 학습했습니다.
다음 Level에서는 순환 신경망(RNN)과 시퀀스 데이터 처리를 배웁니다!
`;
