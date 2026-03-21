# MNIST 데이터셋 완벽 가이드

## 개요

**MNIST (Modified National Institute of Standards and Technology)**는 손글씨 숫자 이미지 데이터셋으로, 딥러닝의 "Hello World"라고 불립니다.

| 항목 | 내용 |
|------|------|
| 제작 | Yann LeCun, Corinna Cortes, Christopher Burges |
| 연도 | 1998년 |
| 용도 | 이미지 분류 (Image Classification) |
| 라이선스 | 공개 (무료 사용) |

---

## 데이터 구성

### 전체 구조

```
MNIST Dataset
├── 학습 데이터 (Training Set): 60,000장
└── 테스트 데이터 (Test Set): 10,000장
    총합: 70,000장
```

### 이미지 사양

| 항목 | 사양 |
|------|------|
| 크기 | 28 x 28 픽셀 |
| 채널 | 1 (그레이스케일) |
| 픽셀 값 | 0~255 (0=검정, 255=흰색) |
| 포맷 | 정수 배열 |

### 클래스 (레이블)

| 레이블 | 의미 |
|:------:|------|
| 0 | 숫자 0 |
| 1 | 숫자 1 |
| 2 | 숫자 2 |
| 3 | 숫자 3 |
| 4 | 숫자 4 |
| 5 | 숫자 5 |
| 6 | 숫자 6 |
| 7 | 숫자 7 |
| 8 | 숫자 8 |
| 9 | 숫자 9 |

**총 10개 클래스** (다중 클래스 분류 문제)

---

## 데이터 시각화

### 샘플 이미지 예시

```
┌─────────────────────────────────────────────────────┐
│  [0]      [1]      [2]      [3]      [4]            │
│  ████     █        ███      ███      █  █           │
│ █    █    █       █   █        █     █  █           │
│ █    █    █           █      ██      ████           │
│ █    █    █         ██          █       █           │
│ █    █    █       █            █        █           │
│  ████     █       █████    ███         █            │
│                                                     │
│  [5]      [6]      [7]      [8]      [9]            │
│ █████     ████    █████     ███      ███            │
│ █        █            █    █   █    █   █           │
│ ████     ████        █      ███     █   █           │
│     █    █   █      █      █   █     ████           │
│     █    █   █     █       █   █        █           │
│ ████      ███      █        ███      ███            │
└─────────────────────────────────────────────────────┘
```

### 실제 데이터 형태

```python
# 하나의 이미지 데이터 구조
image.shape = (28, 28)      # 2D 배열
image.dtype = uint8         # 0~255 정수
label = 5                   # 정답 레이블 (0~9)

# 배치로 묶으면
batch_images.shape = (64, 1, 28, 28)  # (배치, 채널, 높이, 너비)
batch_labels.shape = (64,)             # (배치,)
```

---

## 클래스별 데이터 분포

### 학습 데이터 (60,000장)

| 숫자 | 개수 | 비율 |
|:----:|-----:|-----:|
| 0 | 5,923 | 9.87% |
| 1 | 6,742 | 11.24% |
| 2 | 5,958 | 9.93% |
| 3 | 6,131 | 10.22% |
| 4 | 5,842 | 9.74% |
| 5 | 5,421 | 9.04% |
| 6 | 5,918 | 9.86% |
| 7 | 6,265 | 10.44% |
| 8 | 5,851 | 9.75% |
| 9 | 5,949 | 9.92% |

**분포 특징**: 거의 균등하게 분포 (클래스 불균형 없음)

```
0: ████████████████████ 5,923
1: ██████████████████████ 6,742
2: ████████████████████ 5,958
3: ████████████████████ 6,131
4: ███████████████████ 5,842
5: ██████████████████ 5,421
6: ████████████████████ 5,918
7: ████████████████████ 6,265
8: ███████████████████ 5,851
9: ████████████████████ 5,949
```

---

## 데이터 로드 방법

### PyTorch에서 로드

```python
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# 전처리 정의
transform = transforms.Compose([
    transforms.ToTensor(),                    # PIL → Tensor, 0~1 정규화
    transforms.Normalize((0.1307,), (0.3081,))  # 평균/표준편차 정규화
])

# 데이터셋 다운로드 및 로드
train_dataset = datasets.MNIST(
    root='./data',          # 저장 경로
    train=True,             # 학습 데이터
    download=True,          # 없으면 다운로드
    transform=transform
)

test_dataset = datasets.MNIST(
    root='./data',
    train=False,            # 테스트 데이터
    download=True,
    transform=transform
)

# DataLoader 생성
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

# 데이터 확인
print(f"학습 데이터: {len(train_dataset)}장")
print(f"테스트 데이터: {len(test_dataset)}장")
```

### 정규화 값의 의미

```python
# MNIST 전체 데이터의 통계
mean = 0.1307  # 평균 픽셀 값 (0~1 스케일)
std = 0.3081   # 표준편차

# 정규화 공식
normalized_pixel = (pixel - mean) / std

# 정규화 후 범위
# 대략 -0.42 ~ 2.82 사이 값
```

**왜 정규화하는가?**
- 학습 안정화
- 수렴 속도 향상
- 기울기 소실/폭발 방지

---

## 데이터 탐색 코드

### 샘플 시각화

```python
import matplotlib.pyplot as plt
import numpy as np

# 샘플 이미지 가져오기
fig, axes = plt.subplots(2, 5, figsize=(12, 5))

for i, ax in enumerate(axes.flat):
    image, label = train_dataset[i]

    # Tensor → NumPy, 정규화 해제
    img = image.squeeze().numpy()
    img = img * 0.3081 + 0.1307  # 역정규화

    ax.imshow(img, cmap='gray')
    ax.set_title(f'Label: {label}')
    ax.axis('off')

plt.tight_layout()
plt.savefig('mnist_samples.png')
plt.show()
```

### 클래스별 분포 확인

```python
import numpy as np
from collections import Counter

# 레이블 분포 계산
labels = [label for _, label in train_dataset]
distribution = Counter(labels)

print("클래스별 분포:")
for digit in range(10):
    count = distribution[digit]
    bar = '█' * (count // 300)
    print(f"{digit}: {bar} {count:,}")
```

### 통계 정보 확인

```python
# 전체 데이터의 통계
all_pixels = []
for image, _ in train_dataset:
    all_pixels.extend(image.numpy().flatten())

all_pixels = np.array(all_pixels)

print(f"픽셀 값 범위: {all_pixels.min():.4f} ~ {all_pixels.max():.4f}")
print(f"평균: {all_pixels.mean():.4f}")
print(f"표준편차: {all_pixels.std():.4f}")
```

---

## 파일 구조 (다운로드 후)

```
data/
└── MNIST/
    └── raw/
        ├── train-images-idx3-ubyte.gz    # 학습 이미지 (9.9 MB)
        ├── train-labels-idx1-ubyte.gz    # 학습 레이블 (29 KB)
        ├── t10k-images-idx3-ubyte.gz     # 테스트 이미지 (1.6 MB)
        └── t10k-labels-idx1-ubyte.gz     # 테스트 레이블 (5 KB)
```

| 파일 | 크기 | 내용 |
|------|------|------|
| train-images | ~9.9 MB | 60,000개 이미지 |
| train-labels | ~29 KB | 60,000개 레이블 |
| t10k-images | ~1.6 MB | 10,000개 이미지 |
| t10k-labels | ~5 KB | 10,000개 레이블 |

**총 용량**: 약 12 MB (압축 상태)

---

## IDX 파일 포맷 (참고)

MNIST는 IDX라는 바이너리 포맷을 사용합니다. PyTorch가 자동으로 파싱하므로 직접 다룰 필요는 없지만, 구조는 다음과 같습니다:

### 이미지 파일 구조

```
[offset] [type]          [value]          [description]
0000     32 bit integer  0x00000803       magic number
0004     32 bit integer  60000            number of images
0008     32 bit integer  28               number of rows
0012     32 bit integer  28               number of columns
0016     unsigned byte   ??               pixel (0~255)
0017     unsigned byte   ??               pixel
...
```

### 레이블 파일 구조

```
[offset] [type]          [value]          [description]
0000     32 bit integer  0x00000801       magic number
0004     32 bit integer  60000            number of items
0008     unsigned byte   ??               label (0~9)
0009     unsigned byte   ??               label
...
```

---

## MNIST의 한계와 변형

### MNIST의 한계

| 한계점 | 설명 |
|--------|------|
| 너무 쉬움 | 현대 모델은 99.8%+ 달성 |
| 현실과 다름 | 깔끔하게 정제된 데이터 |
| 작은 크기 | 28x28은 현실 이미지와 거리 |
| 흑백만 | 컬러 이미지 처리 불가 |

### 더 어려운 변형 데이터셋

| 데이터셋 | 설명 | 난이도 |
|----------|------|:------:|
| **Fashion-MNIST** | 의류 이미지 10종 | ★★☆ |
| **EMNIST** | 영문자 + 숫자 | ★★☆ |
| **KMNIST** | 일본어 문자 | ★★★ |
| **CIFAR-10** | 32x32 컬러 이미지 | ★★★ |

### Fashion-MNIST 로드 (동일한 방식)

```python
from torchvision import datasets

fashion_train = datasets.FashionMNIST(
    root='./data',
    train=True,
    download=True,
    transform=transform
)

# 클래스: T-shirt, Trouser, Pullover, Dress, Coat,
#         Sandal, Shirt, Sneaker, Bag, Ankle boot
```

---

## 왜 MNIST로 시작하는가?

### 장점

1. **빠른 학습**: 데이터가 작아서 CPU로도 몇 분 내 학습 가능
2. **명확한 결과**: 정확도로 성능 측정 쉬움
3. **풍부한 자료**: 수많은 튜토리얼과 예제 존재
4. **비교 가능**: 내 모델과 다른 모델 성능 비교 용이
5. **디버깅 쉬움**: 이미지가 단순해서 문제 파악 쉬움

### 학습 목표

| 실험 | 학습 내용 |
|------|----------|
| Baseline | PyTorch 기본 사용법, 학습 루프 |
| 모델 변경 | MLP vs CNN 차이 이해 |
| 하이퍼파라미터 | 학습률, 배치 크기 영향 |
| 정규화 | 과적합 방지 기법 |

---

## 실습 체크리스트

- [ ] PyTorch에서 MNIST 데이터 로드
- [ ] 샘플 이미지 시각화
- [ ] 클래스별 분포 확인
- [ ] 정규화 전후 픽셀 값 비교
- [ ] DataLoader로 배치 생성

---

## 참고 자료

- [MNIST 공식 사이트](http://yann.lecun.com/exdb/mnist/)
- [PyTorch MNIST 튜토리얼](https://pytorch.org/tutorials/)
- [Papers with Code - MNIST](https://paperswithcode.com/dataset/mnist)
