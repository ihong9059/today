// Level 5 콘텐츠 - CNN & 이미지 처리
// 이 파일은 curriculum.ts에 import되어 사용됩니다.

export const LEVEL_5_LESSON_1 = `
# 컴퓨터 비전 소개

## 🎯 학습 목표
이 레슨을 완료하면:
- 컴퓨터가 이미지를 어떻게 인식하는지 이해합니다
- 픽셀과 채널의 개념을 배웁니다
- 이미지 데이터의 구조를 파악합니다
- 컴퓨터 비전의 주요 응용 분야를 알게 됩니다

---

## 🖼️ 1. 컴퓨터 비전이란?

### 정의
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│   컴퓨터 비전 = 컴퓨터가 "보고" 이해하는 기술   │
│                                                 │
│   이미지/영상에서 의미 있는 정보를 추출         │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

### 주요 응용 분야
\`\`\`
┌────────────────┬─────────────────────────────┐
│     분야       │          예시               │
├────────────────┼─────────────────────────────┤
│   이미지 분류  │  고양이 vs 개 구분          │
│   객체 탐지    │  자율주행 차량 인식         │
│   얼굴 인식    │  스마트폰 Face ID           │
│   의료 영상    │  X-ray, CT 분석             │
│   OCR          │  문서 텍스트 추출           │
│   자세 추정    │  운동 자세 분석             │
└────────────────┴─────────────────────────────┘
\`\`\`

---

## 📊 2. 이미지의 디지털 표현

### 픽셀(Pixel)이란?
\`\`\`
픽셀 = Picture + Element (그림 요소)

이미지의 가장 작은 단위!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  실제 이미지          컴퓨터가 보는 것
  ┌─────────┐         ┌─────────────────┐
  │  🐱     │    →    │ 128 135 142 ... │
  │  고양이  │         │ 130 138 145 ... │
  │         │         │ 125 132 140 ... │
  └─────────┘         └─────────────────┘
                      (픽셀 밝기 값들)
\`\`\`

### 이미지 크기
\`\`\`
이미지 크기 = 가로 픽셀 × 세로 픽셀

예시:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HD:     1920 × 1080 = 약 200만 픽셀
  4K:     3840 × 2160 = 약 800만 픽셀
  MNIST:  28 × 28 = 784 픽셀
  CIFAR:  32 × 32 = 1,024 픽셀
\`\`\`

---

## 🎨 3. 채널(Channel)의 이해

### 흑백 vs 컬러
\`\`\`
흑백 이미지 (1채널 = Grayscale)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  각 픽셀: 0~255 (밝기만)

  0 = 검정 ████████████████ 255 = 흰색

  Shape: (H, W) 또는 (H, W, 1)
  예: MNIST (28, 28, 1)


컬러 이미지 (3채널 = RGB)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  각 픽셀: R, G, B 세 값의 조합

  Red:   0~255  🔴
  Green: 0~255  🟢
  Blue:  0~255  🔵

  Shape: (H, W, 3)
  예: CIFAR-10 (32, 32, 3)
\`\`\`

### RGB 색상 조합
\`\`\`
┌─────────────────┬─────────────────────┐
│   색상          │   (R, G, B)         │
├─────────────────┼─────────────────────┤
│   빨강 🔴       │   (255, 0, 0)       │
│   초록 🟢       │   (0, 255, 0)       │
│   파랑 🔵       │   (0, 0, 255)       │
│   노랑 🟡       │   (255, 255, 0)     │
│   흰색 ⬜       │   (255, 255, 255)   │
│   검정 ⬛       │   (0, 0, 0)         │
└─────────────────┴─────────────────────┘
\`\`\`

---

## 🔢 4. 텐서로 표현하기

### 이미지 텐서 Shape
\`\`\`
단일 이미지:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  흑백: (H, W) 또는 (1, H, W)
  컬러: (C, H, W) - PyTorch 방식
        (H, W, C) - TensorFlow/numpy 방식

  C = 채널 수 (1 또는 3)
  H = 높이 (Height)
  W = 너비 (Width)


배치 이미지:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PyTorch: (N, C, H, W)

  N = 배치 크기
  예: (64, 3, 224, 224)
     = 64개의 224×224 컬러 이미지
\`\`\`

### PyTorch 예시
\`\`\`python
import torch
from torchvision import transforms
from PIL import Image

# 이미지 로드
img = Image.open('cat.jpg')  # (H, W, 3)

# 텐서로 변환
transform = transforms.ToTensor()
tensor = transform(img)  # (3, H, W), 0~1 정규화

print(tensor.shape)  # torch.Size([3, 224, 224])
print(tensor.min(), tensor.max())  # 0.0, 1.0

# 배치 차원 추가
batch = tensor.unsqueeze(0)  # (1, 3, H, W)
\`\`\`

---

## 🔄 5. 정규화의 중요성

### 왜 정규화가 필요한가?
\`\`\`
원본 픽셀값: 0 ~ 255

문제점:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 값이 너무 큼 → 기울기 폭발 위험
2. 학습 불안정
3. 수렴 속도 느림

해결책: 정규화!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
방법 1: [0, 1] 범위로
        pixel / 255.0

방법 2: [-1, 1] 범위로
        (pixel - 127.5) / 127.5

방법 3: 평균/표준편차 정규화
        (pixel - mean) / std
\`\`\`

### PyTorch 정규화
\`\`\`python
# ImageNet 통계 사용 (가장 일반적)
transform = transforms.Compose([
    transforms.ToTensor(),  # 0~1로 변환
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],  # RGB 평균
        std=[0.229, 0.224, 0.225]    # RGB 표준편차
    )
])
\`\`\`

---

## 🎯 핵심 정리

\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  이미지 = 픽셀들의 격자                         │
│  픽셀 = 0~255 밝기 값                           │
│                                                 │
│  흑백: 1채널 (H, W)                             │
│  컬러: 3채널 RGB (C, H, W)                      │
│                                                 │
│  PyTorch 배치: (N, C, H, W)                     │
│                                                 │
│  정규화: 학습 안정성과 속도 향상                │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

## ✅ 학습 체크리스트
- [ ] 픽셀과 이미지의 관계 이해
- [ ] RGB 채널의 의미 파악
- [ ] 텐서 Shape (N, C, H, W) 이해
- [ ] 정규화의 필요성 인식

## 🔜 다음 강의 예고
**"합성곱 연산"** - CNN의 핵심인 합성곱이 어떻게 이미지의 특징을 추출하는지 배웁니다!
`;

export const LEVEL_5_LESSON_2 = `
# 합성곱 연산

## 🎯 학습 목표
이 레슨을 완료하면:
- 합성곱 연산의 원리를 이해합니다
- 커널/필터의 역할을 배웁니다
- 스트라이드와 패딩의 효과를 이해합니다
- 특성 맵(Feature Map)의 의미를 파악합니다

---

## 🔄 1. 합성곱(Convolution)이란?

### 핵심 아이디어
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│   합성곱 = 작은 필터를 이미지 위에서 슬라이딩   │
│           하면서 특징을 추출하는 연산           │
│                                                 │
└─────────────────────────────────────────────────┘

MLP vs CNN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MLP: 이미지를 1차원으로 펼침 → 공간 정보 손실!
CNN: 2D 구조 유지 → 공간 정보 보존!
\`\`\`

### 시각적 이해
\`\`\`
입력 이미지 (5×5)          커널 (3×3)
┌───┬───┬───┬───┬───┐     ┌───┬───┬───┐
│ 1 │ 2 │ 3 │ 0 │ 1 │     │ 1 │ 0 │ 1 │
├───┼───┼───┼───┼───┤     ├───┼───┼───┤
│ 0 │ 1 │ 2 │ 3 │ 1 │     │ 0 │ 1 │ 0 │
├───┼───┼───┼───┼───┤     ├───┼───┼───┤
│ 1 │ 2 │ 1 │ 0 │ 0 │     │ 1 │ 0 │ 1 │
├───┼───┼───┼───┼───┤     └───┴───┴───┘
│ 0 │ 1 │ 1 │ 2 │ 1 │
├───┼───┼───┼───┼───┤
│ 2 │ 0 │ 1 │ 1 │ 0 │
└───┴───┴───┴───┴───┘

        ↓ 합성곱 연산 ↓

출력 특성 맵 (3×3)
┌───┬───┬───┐
│ 8 │ 7 │ 6 │
├───┼───┼───┤
│ 5 │ 6 │ 5 │
├───┼───┼───┤
│ 6 │ 5 │ 4 │
└───┴───┴───┘
\`\`\`

---

## 🔢 2. 합성곱 계산 방법

### 단계별 계산
\`\`\`
Step 1: 커널을 이미지 왼쪽 위에 배치
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌───┬───┬───┐
│ 1 │ 2 │ 3 │  ×  커널
├───┼───┼───┤
│ 0 │ 1 │ 2 │
├───┼───┼───┤
│ 1 │ 2 │ 1 │
└───┴───┴───┘

Step 2: 요소별 곱셈 후 합산
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(1×1) + (2×0) + (3×1) +
(0×0) + (1×1) + (2×0) +
(1×1) + (2×0) + (1×1)
= 1 + 0 + 3 + 0 + 1 + 0 + 1 + 0 + 1
= 7

Step 3: 커널을 오른쪽으로 이동하며 반복
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ → → (가로 끝까지)
↓ (다음 줄)
→ → → ...
\`\`\`

---

## 🎛️ 3. 커널(필터)의 역할

### 커널이란?
\`\`\`
커널 = 학습 가능한 작은 가중치 행렬

일반적인 크기: 3×3, 5×5, 7×7
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

커널의 역할: 특정 패턴/특징 감지!

예시 커널들:
┌─────────────┬─────────────┬─────────────┐
│  수평 엣지   │  수직 엣지   │  블러       │
├─────────────┼─────────────┼─────────────┤
│ -1 -1 -1    │ -1  0  1    │ 1/9 1/9 1/9 │
│  0  0  0    │ -1  0  1    │ 1/9 1/9 1/9 │
│  1  1  1    │ -1  0  1    │ 1/9 1/9 1/9 │
└─────────────┴─────────────┴─────────────┘
\`\`\`

### 여러 커널 = 여러 특징
\`\`\`
하나의 Conv 레이어에 여러 커널 사용!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

입력 이미지     커널 1    →  특성 맵 1 (엣지)
    │          커널 2    →  특성 맵 2 (코너)
    │          커널 3    →  특성 맵 3 (질감)
    │            ...
    └──────→   커널 N    →  특성 맵 N

출력 채널 수 = 커널 개수
\`\`\`

---

## 📏 4. 스트라이드(Stride)

### 스트라이드란?
\`\`\`
스트라이드 = 커널이 이동하는 칸 수

Stride = 1 (기본값)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ 한 칸씩 이동
  [□□□]         [□□□]
  [□□□]    →    [□□□]    →   ...
  [□□□]         [□□□]
  ↑             ↑+1

Stride = 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ 두 칸씩 이동 (출력 크기 절반!)
  [□□□]             [□□□]
  [□□□]    →        [□□□]    →   ...
  [□□□]             [□□□]
  ↑                 ↑+2
\`\`\`

### 출력 크기 계산
\`\`\`
출력 크기 = (입력 - 커널) / 스트라이드 + 1

예시:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
입력: 7×7, 커널: 3×3, 스트라이드: 1
출력 = (7 - 3) / 1 + 1 = 5×5

입력: 7×7, 커널: 3×3, 스트라이드: 2
출력 = (7 - 3) / 2 + 1 = 3×3
\`\`\`

---

## 🔲 5. 패딩(Padding)

### 패딩이란?
\`\`\`
패딩 = 이미지 가장자리에 값을 추가

문제: 합성곱 후 크기가 줄어듦!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
입력 5×5 → (3×3 커널) → 출력 3×3 😱

해결: 패딩으로 크기 유지!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  0  0  0  0  0  0  0
  0 [1  2  3  0  1] 0
  0 [0  1  2  3  1] 0
  0 [1  2  1  0  0] 0   ← padding=1
  0 [0  1  1  2  1] 0
  0 [2  0  1  1  0] 0
  0  0  0  0  0  0  0

7×7 → (3×3 커널) → 5×5 ✅ (원본 크기 유지!)
\`\`\`

### 패딩 종류
\`\`\`
┌────────────┬──────────────────────────────┐
│   종류     │          설명                │
├────────────┼──────────────────────────────┤
│  Valid     │  패딩 없음 (크기 감소)       │
│  Same      │  출력=입력 크기 (자동 패딩)  │
│  Zero      │  0으로 패딩 (가장 일반적)    │
│  Reflect   │  가장자리 값 반사            │
└────────────┴──────────────────────────────┘
\`\`\`

### 완전한 출력 크기 공식
\`\`\`
출력 = (입력 + 2×패딩 - 커널) / 스트라이드 + 1

예시 (Same 패딩):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
입력: 32×32, 커널: 3×3, 스트라이드: 1, 패딩: 1
출력 = (32 + 2×1 - 3) / 1 + 1 = 32×32 ✅
\`\`\`

---

## 💻 6. PyTorch 구현

### Conv2d 기본 사용
\`\`\`python
import torch
import torch.nn as nn

# 합성곱 레이어 정의
conv = nn.Conv2d(
    in_channels=3,      # 입력 채널 (RGB)
    out_channels=64,    # 출력 채널 (필터 개수)
    kernel_size=3,      # 커널 크기 3×3
    stride=1,           # 스트라이드
    padding=1           # 패딩 (same)
)

# 입력: (배치, 채널, 높이, 너비)
x = torch.randn(1, 3, 32, 32)
output = conv(x)
print(output.shape)  # torch.Size([1, 64, 32, 32])
\`\`\`

### 파라미터 수 계산
\`\`\`python
# 가중치: out_channels × in_channels × kernel × kernel
# 편향: out_channels

params = 64 * 3 * 3 * 3 + 64  # = 1,792
print(f"파라미터 수: {sum(p.numel() for p in conv.parameters())}")
\`\`\`

---

## 🎯 핵심 정리

\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  합성곱 = 커널 × 이미지 영역의 합               │
│  커널 = 학습되는 특징 추출기                    │
│                                                 │
│  스트라이드 ↑ → 출력 크기 ↓                    │
│  패딩 → 크기 유지 가능                          │
│                                                 │
│  출력 = (입력 + 2P - K) / S + 1                 │
│                                                 │
│  PyTorch: nn.Conv2d(in, out, kernel, stride, padding) │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

## ✅ 학습 체크리스트
- [ ] 합성곱 연산 과정 이해
- [ ] 커널의 특징 추출 역할 파악
- [ ] 스트라이드와 패딩 효과 이해
- [ ] 출력 크기 계산 공식 암기

## 🔜 다음 강의 예고
**"풀링과 정규화"** - 특성 맵의 크기를 줄이고 학습을 안정화하는 기법을 배웁니다!
`;

export const LEVEL_5_LESSON_3 = `
# 풀링과 정규화

## 🎯 학습 목표
이 레슨을 완료하면:
- 풀링 레이어의 역할과 종류를 이해합니다
- Max Pooling과 Average Pooling의 차이를 파악합니다
- Batch Normalization의 원리와 효과를 배웁니다
- Dropout의 정규화 효과를 이해합니다

---

## 🏊 1. 풀링(Pooling)이란?

### 핵심 개념
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│   풀링 = 특성 맵의 크기를 줄이는 다운샘플링     │
│                                                 │
│   목적:                                         │
│   1. 계산량 감소                                │
│   2. 과적합 방지                                │
│   3. 위치 불변성 (약간의 이동에 강인)           │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

### 풀링의 동작
\`\`\`
입력 (4×4)                    출력 (2×2)
┌────┬────┬────┬────┐         ┌────┬────┐
│ 1  │ 3  │ 2  │ 1  │         │    │    │
├────┼────┼────┼────┤   →     │ 4  │ 6  │
│ 4  │ 2  │ 6  │ 4  │         ├────┼────┤
├────┼────┼────┼────┤         │    │    │
│ 3  │ 1  │ 2  │ 3  │         │ 5  │ 4  │
├────┼────┼────┼────┤         └────┴────┘
│ 5  │ 2  │ 4  │ 1  │
└────┴────┴────┴────┘

2×2 풀링, 스트라이드 2
→ 크기가 절반으로!
\`\`\`

---

## 🔵 2. Max Pooling

### 작동 방식
\`\`\`
Max Pooling = 영역 내 최대값 선택

┌────┬────┐
│ 1  │ 3  │  →  max(1,3,4,2) = 4
├────┼────┤
│ 4  │ 2  │
└────┴────┘

특징:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 가장 강한 특징만 선택
- 노이즈에 강함
- CNN에서 가장 많이 사용
\`\`\`

### PyTorch 구현
\`\`\`python
import torch.nn as nn

# Max Pooling 정의
pool = nn.MaxPool2d(
    kernel_size=2,  # 2×2 영역
    stride=2        # 2칸씩 이동
)

# 입력: (배치, 채널, 높이, 너비)
x = torch.randn(1, 64, 32, 32)
output = pool(x)
print(output.shape)  # torch.Size([1, 64, 16, 16])
\`\`\`

---

## 🟢 3. Average Pooling

### 작동 방식
\`\`\`
Average Pooling = 영역 내 평균값

┌────┬────┐
│ 1  │ 3  │  →  avg(1,3,4,2) = 2.5
├────┼────┤
│ 4  │ 2  │
└────┴────┘

특징:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 부드러운 다운샘플링
- 모든 정보 반영
- Global Average Pooling에서 주로 사용
\`\`\`

### Global Average Pooling (GAP)
\`\`\`
전체 특성 맵을 1×1로 축소!

입력: (N, 512, 7, 7)
       ↓ GAP
출력: (N, 512, 1, 1) → (N, 512)

장점:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- FC 레이어 대체 → 파라미터 대폭 감소
- 과적합 방지
- 현대 CNN에서 필수!
\`\`\`

### PyTorch 구현
\`\`\`python
# Global Average Pooling
gap = nn.AdaptiveAvgPool2d(1)  # 출력 크기 1×1

x = torch.randn(1, 512, 7, 7)
output = gap(x)
print(output.shape)  # torch.Size([1, 512, 1, 1])

# Flatten
output = output.view(output.size(0), -1)  # (1, 512)
\`\`\`

---

## 📊 4. Batch Normalization

### 문제: Internal Covariate Shift
\`\`\`
학습 중 각 층의 입력 분포가 계속 변함!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

층 1 → 층 2 → 층 3
  ↓      ↓      ↓
분포 A  분포 B  분포 C  (계속 변함!)

문제점:
- 학습 불안정
- 느린 수렴
- 높은 학습률 사용 불가
\`\`\`

### Batch Normalization 원리
\`\`\`
각 미니배치에서 정규화!

Step 1: 평균과 분산 계산
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
μ = (1/m) × Σxᵢ         (배치 평균)
σ² = (1/m) × Σ(xᵢ-μ)²  (배치 분산)

Step 2: 정규화
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
x̂ = (x - μ) / √(σ² + ε)

Step 3: 스케일과 시프트 (학습 가능)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
y = γx̂ + β

γ, β = 학습되는 파라미터
\`\`\`

### 왜 γ, β가 필요한가?
\`\`\`
정규화만 하면 표현력 제한!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

γ = 1, β = 0 → 표준 정규화 (평균 0, 분산 1)
γ = σ, β = μ → 원래 분포로 복원 가능

네트워크가 최적의 분포를 학습!
\`\`\`

### PyTorch 구현
\`\`\`python
# Conv 뒤에 BatchNorm 배치
self.conv1 = nn.Conv2d(3, 64, 3, padding=1)
self.bn1 = nn.BatchNorm2d(64)  # 채널 수

def forward(self, x):
    x = self.conv1(x)
    x = self.bn1(x)      # Conv 후 BN
    x = F.relu(x)        # BN 후 활성화
    return x
\`\`\`

### BatchNorm의 효과
\`\`\`
┌────────────────────┬─────────────────────────┐
│      효과          │         설명            │
├────────────────────┼─────────────────────────┤
│  학습 안정화       │  기울기 흐름 개선       │
│  빠른 수렴         │  더 높은 학습률 가능    │
│  정규화 효과       │  약간의 Dropout 효과    │
│  초기화 덜 민감    │  가중치 초기화 영향 ↓   │
└────────────────────┴─────────────────────────┘
\`\`\`

---

## 🎲 5. Dropout

### 원리
\`\`\`
학습 시 일부 뉴런을 무작위로 비활성화!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

훈련 시:
○ ● ○ ● ○     ● = 활성
● ○ ● ○ ●     ○ = 비활성 (dropout)
○ ● ● ○ ●

테스트 시:
● ● ● ● ●     모든 뉴런 활성화
● ● ● ● ●     (출력에 keep_prob 곱함)
● ● ● ● ●
\`\`\`

### 효과
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. 과적합 방지                                 │
│     → 특정 뉴런에 의존 X                        │
│                                                 │
│  2. 앙상블 효과                                 │
│     → 여러 서브네트워크의 평균                  │
│                                                 │
│  3. 견고한 특징 학습                            │
│     → 중복/분산된 표현                          │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

### PyTorch 구현
\`\`\`python
self.dropout = nn.Dropout(p=0.5)  # 50% 비활성화

def forward(self, x):
    x = F.relu(self.fc1(x))
    x = self.dropout(x)  # FC 레이어 후 적용
    x = self.fc2(x)
    return x

# 주의: 평가 시 model.eval() 필수!
model.eval()  # Dropout 비활성화
\`\`\`

---

## 🎯 핵심 정리

\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  풀링: 크기 축소, 위치 불변성                   │
│  - Max Pool: 가장 강한 특징 선택                │
│  - Avg Pool: 부드러운 평균                      │
│  - GAP: FC 대체, 파라미터 감소                  │
│                                                 │
│  BatchNorm: 학습 안정화, 빠른 수렴              │
│  - Conv → BN → ReLU 순서                        │
│                                                 │
│  Dropout: 과적합 방지                           │
│  - 훈련: 무작위 비활성화                        │
│  - 테스트: model.eval()                         │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

## ✅ 학습 체크리스트
- [ ] Max/Average Pooling 차이 이해
- [ ] Global Average Pooling 용도 파악
- [ ] BatchNorm 원리와 효과 이해
- [ ] Dropout 적용 방법 숙지

## 🔜 다음 강의 예고
**"CNN 아키텍처"** - LeNet부터 VGG까지, 유명한 CNN 구조들을 살펴봅니다!
`;

export const LEVEL_5_LESSON_4 = `
# CNN 아키텍처

## 🎯 학습 목표
이 레슨을 완료하면:
- CNN 발전 역사를 이해합니다
- LeNet, AlexNet, VGG의 구조를 비교합니다
- 각 아키텍처의 핵심 아이디어를 파악합니다
- 현대 CNN 설계 원칙을 배웁니다

---

## 📜 1. CNN의 역사

### 발전 타임라인
\`\`\`
1998: LeNet-5 (Yann LeCun)
      → 최초의 성공적인 CNN, 손글씨 인식

2012: AlexNet (Alex Krizhevsky)
      → ImageNet 우승, 딥러닝 부활!

2014: VGGNet (Oxford)
      → 깊은 네트워크의 힘 증명

2014: GoogLeNet/Inception
      → 효율적인 모듈 설계

2015: ResNet (Microsoft)
      → 잔차 연결, 매우 깊은 네트워크

2017+: EfficientNet, Vision Transformer...
\`\`\`

---

## 🔢 2. LeNet-5 (1998)

### 구조
\`\`\`
입력: 32×32×1 (흑백 이미지)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Conv1 → Pool → Conv2 → Pool → FC → FC → 출력

┌─────────────────────────────────────────────────┐
│  Layer        Output      Params               │
├─────────────────────────────────────────────────┤
│  Input        32×32×1     -                    │
│  Conv1(5×5)   28×28×6     156                  │
│  AvgPool      14×14×6     -                    │
│  Conv2(5×5)   10×10×16    2,416                │
│  AvgPool      5×5×16      -                    │
│  FC1          120         48,120               │
│  FC2          84          10,164               │
│  Output       10          850                  │
├─────────────────────────────────────────────────┤
│  Total                    ~60K                 │
└─────────────────────────────────────────────────┘
\`\`\`

### 핵심 특징
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. 최초의 CNN 실용화                           │
│  2. Conv → Pool 반복 패턴                       │
│  3. 수표/우편번호 인식에 사용                   │
│  4. Sigmoid/Tanh 활성화 (ReLU 이전)            │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

### PyTorch 구현
\`\`\`python
class LeNet5(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 6, 5)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc1 = nn.Linear(16*5*5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        x = F.avg_pool2d(F.relu(self.conv1(x)), 2)
        x = F.avg_pool2d(F.relu(self.conv2(x)), 2)
        x = x.view(-1, 16*5*5)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        return self.fc3(x)
\`\`\`

---

## 🏆 3. AlexNet (2012)

### ImageNet 혁명
\`\`\`
ImageNet Challenge 2012:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  2위: 26.2% 에러율 (전통적 방법)
  1위: 15.3% 에러율 (AlexNet) ← 압도적!

  → 딥러닝의 부활을 알린 역사적 순간!
\`\`\`

### 구조
\`\`\`
입력: 227×227×3 (컬러 이미지)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────┐
│  Layer        Kernel    Output       Params    │
├─────────────────────────────────────────────────┤
│  Input        -         227×227×3    -         │
│  Conv1        11×11,s4  55×55×96     35K       │
│  MaxPool      3×3,s2    27×27×96     -         │
│  Conv2        5×5       27×27×256    614K      │
│  MaxPool      3×3,s2    13×13×256    -         │
│  Conv3        3×3       13×13×384    885K      │
│  Conv4        3×3       13×13×384    1.3M      │
│  Conv5        3×3       13×13×256    885K      │
│  MaxPool      3×3,s2    6×6×256      -         │
│  FC1          -         4096         37M       │
│  FC2          -         4096         17M       │
│  FC3          -         1000         4M        │
├─────────────────────────────────────────────────┤
│  Total                               ~60M      │
└─────────────────────────────────────────────────┘
\`\`\`

### 핵심 혁신
\`\`\`
┌────────────────┬────────────────────────────────┐
│     기법       │           효과                 │
├────────────────┼────────────────────────────────┤
│  ReLU          │  Sigmoid 대비 6배 빠른 학습    │
│  Dropout       │  과적합 방지 (FC에 0.5)        │
│  Data Aug      │  이미지 변환으로 데이터 증강   │
│  GPU 학습      │  2개 GPU 병렬 처리             │
│  LRN           │  Local Response Norm (현재 X)  │
└────────────────┴────────────────────────────────┘
\`\`\`

---

## 🏗️ 4. VGGNet (2014)

### 핵심 아이디어
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│   "더 깊게, 하지만 단순하게!"                   │
│                                                 │
│   3×3 커널만 사용 (일관된 설계)                 │
│                                                 │
└─────────────────────────────────────────────────┘

왜 3×3인가?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7×7 커널 1개 = 3×3 커널 3개 (같은 수용 영역)

7×7: 49개 파라미터
3×3 × 3: 27개 파라미터 + 더 많은 비선형성!
\`\`\`

### VGG-16 구조
\`\`\`
입력: 224×224×3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Block 1: Conv3-64 × 2 → MaxPool    [224→112]
Block 2: Conv3-128 × 2 → MaxPool   [112→56]
Block 3: Conv3-256 × 3 → MaxPool   [56→28]
Block 4: Conv3-512 × 3 → MaxPool   [28→14]
Block 5: Conv3-512 × 3 → MaxPool   [14→7]
FC: 4096 → 4096 → 1000

총 파라미터: ~138M (대부분 FC에!)
\`\`\`

### PyTorch 구현 (간략)
\`\`\`python
def make_layers(cfg):
    layers = []
    in_channels = 3
    for v in cfg:
        if v == 'M':
            layers.append(nn.MaxPool2d(2, 2))
        else:
            layers.append(nn.Conv2d(in_channels, v, 3, padding=1))
            layers.append(nn.ReLU(inplace=True))
            in_channels = v
    return nn.Sequential(*layers)

# VGG-16 설정
cfg = [64, 64, 'M', 128, 128, 'M', 256, 256, 256, 'M',
       512, 512, 512, 'M', 512, 512, 512, 'M']
\`\`\`

---

## 📊 5. 아키텍처 비교

### 성능 비교
\`\`\`
┌───────────┬─────────┬───────────┬───────────────┐
│  모델     │ 파라미터 │ Top-5 Err │    특징       │
├───────────┼─────────┼───────────┼───────────────┤
│  LeNet-5  │  60K    │   -       │ 최초 CNN      │
│  AlexNet  │  60M    │  15.3%    │ 딥러닝 부활   │
│  VGG-16   │  138M   │  7.3%     │ 깊은 네트워크 │
│  VGG-19   │  144M   │  7.1%     │ 더 깊게       │
└───────────┴─────────┴───────────┴───────────────┘
\`\`\`

### 설계 트렌드
\`\`\`
LeNet → AlexNet → VGG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 점점 더 깊어짐
   5층 → 8층 → 16/19층

2. 커널 크기 감소
   5×5, 11×11 → 3×3

3. 채널 수 증가
   6, 16 → 96, 256 → 64, 128, 256, 512

4. FC 레이어의 문제
   파라미터 대부분이 FC에 집중! (비효율)
\`\`\`

---

## 💡 6. 현대 CNN 설계 원칙

### VGG 이후의 발전
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. Skip Connection (ResNet)                    │
│     → 매우 깊은 네트워크 가능                   │
│                                                 │
│  2. Inception Module (GoogLeNet)                │
│     → 여러 크기 커널 병렬 사용                  │
│                                                 │
│  3. Global Average Pooling                      │
│     → FC 대체, 파라미터 감소                    │
│                                                 │
│  4. Batch Normalization                         │
│     → 학습 안정화 필수                          │
│                                                 │
│  5. Depthwise Separable Conv (MobileNet)        │
│     → 모바일용 경량화                           │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

---

## 🎯 핵심 정리

\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  LeNet-5: CNN의 시작, 기본 패턴 확립            │
│  AlexNet: ReLU, Dropout, GPU → 딥러닝 부활      │
│  VGG: 3×3 커널, 깊을수록 좋다                   │
│                                                 │
│  공통 패턴:                                     │
│  Conv → BN → ReLU → Pool (반복)                │
│  → Global Average Pool → FC → Softmax           │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

## ✅ 학습 체크리스트
- [ ] LeNet의 역사적 의의 이해
- [ ] AlexNet의 핵심 혁신 파악
- [ ] VGG의 3×3 커널 전략 이해
- [ ] CNN 발전 트렌드 파악

## 🔜 다음 강의 예고
**"CNN 구현 (MNIST)"** - 직접 CNN을 구현하여 손글씨를 분류해봅니다!
`;

export const LEVEL_5_LESSON_5 = `
# CNN 구현 (MNIST)

## 🎯 학습 목표
이 레슨을 완료하면:
- PyTorch로 CNN을 처음부터 구현합니다
- MNIST 데이터셋으로 99% 이상 정확도를 달성합니다
- MLP와 CNN의 성능 차이를 체감합니다
- 학습 과정을 시각화하고 분석합니다

---

## 🔄 1. MLP vs CNN 비교

### 왜 CNN인가?
\`\`\`
MLP의 문제점:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
입력: 28×28 = 784개 픽셀

MLP: 784 → 512 → 256 → 10
     파라미터: 784×512 + 512×256 + ... ≈ 500K+
     공간 정보 손실!

CNN의 장점:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 공간 정보 보존 (2D 구조 유지)
- 파라미터 공유 (커널 재사용)
- 지역적 특징 학습 (엣지, 코너 등)
\`\`\`

### 기대 성능
\`\`\`
┌───────────┬───────────┬───────────────┐
│   모델    │  파라미터  │  테스트 정확도 │
├───────────┼───────────┼───────────────┤
│   MLP     │  ~500K    │  ~98%         │
│   CNN     │  ~50K     │  ~99%+        │
└───────────┴───────────┴───────────────┘

10배 적은 파라미터로 더 높은 정확도!
\`\`\`

---

## 📦 2. 환경 설정

### 라이브러리 임포트
\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import matplotlib.pyplot as plt

# GPU 설정
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f'Using device: {device}')
\`\`\`

### 데이터 로드
\`\`\`python
# 데이터 변환
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

# 데이터셋
train_dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
test_dataset = datasets.MNIST('./data', train=False, transform=transform)

# DataLoader
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

# 데이터 확인
images, labels = next(iter(train_loader))
print(f'배치 Shape: {images.shape}')  # [64, 1, 28, 28]
\`\`\`

---

## 🧠 3. CNN 모델 설계

### 모델 구조
\`\`\`
입력: (N, 1, 28, 28)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Conv1: 1 → 32, 3×3, padding=1     [28×28×32]
  → BatchNorm → ReLU → MaxPool    [14×14×32]

Conv2: 32 → 64, 3×3, padding=1    [14×14×64]
  → BatchNorm → ReLU → MaxPool    [7×7×64]

Flatten: 7×7×64 = 3136

FC1: 3136 → 128 → Dropout
FC2: 128 → 10

출력: (N, 10)
\`\`\`

### PyTorch 구현
\`\`\`python
class MNIST_CNN(nn.Module):
    def __init__(self):
        super().__init__()
        # Conv Block 1
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)

        # Conv Block 2
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)

        # FC Layers
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)

        self.dropout = nn.Dropout(0.25)
        self.pool = nn.MaxPool2d(2, 2)

    def forward(self, x):
        # Conv Block 1: (N,1,28,28) → (N,32,14,14)
        x = self.conv1(x)
        x = self.bn1(x)
        x = F.relu(x)
        x = self.pool(x)

        # Conv Block 2: (N,32,14,14) → (N,64,7,7)
        x = self.conv2(x)
        x = self.bn2(x)
        x = F.relu(x)
        x = self.pool(x)

        # Flatten: (N,64,7,7) → (N,3136)
        x = x.view(x.size(0), -1)

        # FC: (N,3136) → (N,10)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)

        return x

model = MNIST_CNN().to(device)
print(f'총 파라미터: {sum(p.numel() for p in model.parameters()):,}')
# 출력: 총 파라미터: 약 440,000
\`\`\`

---

## ⚙️ 4. 학습 설정

\`\`\`python
# 손실 함수와 옵티마이저
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 학습률 스케줄러 (선택사항)
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.5)
\`\`\`

---

## 🔄 5. 학습 루프

\`\`\`python
def train(model, loader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    correct = 0
    total = 0

    for images, labels in loader:
        images, labels = images.to(device), labels.to(device)

        # 순전파
        outputs = model(images)
        loss = criterion(outputs, labels)

        # 역전파
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # 통계
        total_loss += loss.item()
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()

    return total_loss / len(loader), 100. * correct / total

def test(model, loader, criterion, device):
    model.eval()
    total_loss = 0
    correct = 0
    total = 0

    with torch.no_grad():
        for images, labels in loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)

            total_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

    return total_loss / len(loader), 100. * correct / total
\`\`\`

### 학습 실행
\`\`\`python
epochs = 10
history = {'train_loss': [], 'train_acc': [], 'test_loss': [], 'test_acc': []}

for epoch in range(epochs):
    train_loss, train_acc = train(model, train_loader, criterion, optimizer, device)
    test_loss, test_acc = test(model, test_loader, criterion, device)
    scheduler.step()

    history['train_loss'].append(train_loss)
    history['train_acc'].append(train_acc)
    history['test_loss'].append(test_loss)
    history['test_acc'].append(test_acc)

    print(f'Epoch {epoch+1:2d}/{epochs} | '
          f'Train Loss: {train_loss:.4f}, Acc: {train_acc:.2f}% | '
          f'Test Loss: {test_loss:.4f}, Acc: {test_acc:.2f}%')
\`\`\`

### 예상 출력
\`\`\`
Epoch  1/10 | Train Loss: 0.1523, Acc: 95.32% | Test Acc: 98.45%
Epoch  2/10 | Train Loss: 0.0521, Acc: 98.41% | Test Acc: 98.92%
...
Epoch 10/10 | Train Loss: 0.0089, Acc: 99.72% | Test Acc: 99.21%
\`\`\`

---

## 📊 6. 결과 시각화

\`\`\`python
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# 손실 그래프
axes[0].plot(history['train_loss'], label='Train')
axes[0].plot(history['test_loss'], label='Test')
axes[0].set_title('Loss')
axes[0].legend()

# 정확도 그래프
axes[1].plot(history['train_acc'], label='Train')
axes[1].plot(history['test_acc'], label='Test')
axes[1].set_title('Accuracy (%)')
axes[1].legend()

plt.tight_layout()
plt.show()
\`\`\`

### 예측 결과 확인
\`\`\`python
# 테스트 이미지로 예측
model.eval()
images, labels = next(iter(test_loader))
images, labels = images[:10].to(device), labels[:10]

with torch.no_grad():
    outputs = model(images)
    _, predicted = outputs.max(1)

# 시각화
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    ax.imshow(images[i].cpu().squeeze(), cmap='gray')
    color = 'green' if predicted[i] == labels[i] else 'red'
    ax.set_title(f'Pred: {predicted[i].item()}', color=color)
    ax.axis('off')
plt.show()
\`\`\`

---

## 🎯 핵심 정리

\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  CNN 구조:                                      │
│  Conv → BN → ReLU → Pool (반복)                │
│  → Flatten → FC → Dropout → Output              │
│                                                 │
│  MNIST에서:                                     │
│  - 2개 Conv 레이어면 충분                       │
│  - 99%+ 정확도 달성 가능                        │
│  - MLP보다 적은 파라미터, 높은 성능             │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

## ✅ 학습 체크리스트
- [ ] CNN 모델 직접 구현
- [ ] 학습 루프 작성
- [ ] 99% 이상 정확도 달성
- [ ] 학습 곡선 분석

## 🔜 다음 강의 예고
**"CNN 구현 (CIFAR-10)"** - 컬러 이미지 분류에 도전합니다!
`;

export const LEVEL_5_LESSON_6 = `
# CNN 구현 (CIFAR-10)

## 🎯 학습 목표
이 레슨을 완료하면:
- CIFAR-10 데이터셋의 특성을 이해합니다
- 컬러 이미지용 더 깊은 CNN을 구현합니다
- 데이터 증강의 효과를 확인합니다
- 80% 이상의 정확도를 달성합니다

---

## 🖼️ 1. CIFAR-10 소개

### 데이터셋 특성
\`\`\`
CIFAR-10 vs MNIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────────────┬───────────────┬───────────────┐
│            │    MNIST      │   CIFAR-10    │
├────────────┼───────────────┼───────────────┤
│  이미지    │   28×28×1     │   32×32×3     │
│  색상      │   흑백        │   컬러 (RGB)  │
│  클래스    │   10 (숫자)   │   10 (객체)   │
│  훈련 수   │   60,000      │   50,000      │
│  테스트    │   10,000      │   10,000      │
│  난이도    │   쉬움        │   어려움      │
└────────────┴───────────────┴───────────────┘
\`\`\`

### 10가지 클래스
\`\`\`
0: 비행기 ✈️    5: 개 🐕
1: 자동차 🚗    6: 개구리 🐸
2: 새 🐦        7: 말 🐴
3: 고양이 🐱    8: 배 🚢
4: 사슴 🦌      9: 트럭 🚚
\`\`\`

---

## 📦 2. 데이터 준비

### 데이터 증강 적용
\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# 훈련용 변환 (데이터 증강 포함)
train_transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),     # 좌우 반전
    transforms.RandomCrop(32, padding=4),  # 랜덤 크롭
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.4914, 0.4822, 0.4465],
        std=[0.2470, 0.2435, 0.2616]
    )
])

# 테스트용 변환 (증강 없음)
test_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.4914, 0.4822, 0.4465],
        std=[0.2470, 0.2435, 0.2616]
    )
])

# 데이터셋 로드
train_dataset = datasets.CIFAR10('./data', train=True, download=True, transform=train_transform)
test_dataset = datasets.CIFAR10('./data', train=False, transform=test_transform)

train_loader = DataLoader(train_dataset, batch_size=128, shuffle=True, num_workers=2)
test_loader = DataLoader(test_dataset, batch_size=100, shuffle=False, num_workers=2)
\`\`\`

---

## 🧠 3. 깊은 CNN 모델

### VGG 스타일 구조
\`\`\`
입력: (N, 3, 32, 32)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Block 1: Conv64 × 2 → Pool     [32→16]
Block 2: Conv128 × 2 → Pool    [16→8]
Block 3: Conv256 × 2 → Pool    [8→4]

Global Average Pooling          [4→1]
FC: 256 → 10
\`\`\`

### PyTorch 구현
\`\`\`python
class CIFAR10_CNN(nn.Module):
    def __init__(self):
        super().__init__()

        # Block 1: 3 → 64
        self.block1 = nn.Sequential(
            nn.Conv2d(3, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),  # 32 → 16
            nn.Dropout(0.25)
        )

        # Block 2: 64 → 128
        self.block2 = nn.Sequential(
            nn.Conv2d(64, 128, 3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 128, 3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),  # 16 → 8
            nn.Dropout(0.25)
        )

        # Block 3: 128 → 256
        self.block3 = nn.Sequential(
            nn.Conv2d(128, 256, 3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(inplace=True),
            nn.Conv2d(256, 256, 3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),  # 8 → 4
            nn.Dropout(0.25)
        )

        # Global Average Pooling + FC
        self.gap = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Linear(256, 10)

    def forward(self, x):
        x = self.block1(x)  # (N, 64, 16, 16)
        x = self.block2(x)  # (N, 128, 8, 8)
        x = self.block3(x)  # (N, 256, 4, 4)
        x = self.gap(x)     # (N, 256, 1, 1)
        x = x.view(x.size(0), -1)  # (N, 256)
        x = self.fc(x)      # (N, 10)
        return x

model = CIFAR10_CNN().to(device)
print(f'파라미터 수: {sum(p.numel() for p in model.parameters()):,}')
# 약 1.2M 파라미터
\`\`\`

---

## ⚙️ 4. 학습 설정

\`\`\`python
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-4)

# Cosine Annealing 스케줄러
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=50)
\`\`\`

---

## 🔄 5. 학습 실행

\`\`\`python
epochs = 50
best_acc = 0

for epoch in range(epochs):
    # 학습
    model.train()
    train_loss = 0
    correct = 0
    total = 0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        train_loss += loss.item()
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()

    train_acc = 100. * correct / total

    # 평가
    model.eval()
    test_loss = 0
    correct = 0
    total = 0

    with torch.no_grad():
        for images, labels in test_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)

            test_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

    test_acc = 100. * correct / total
    scheduler.step()

    # Best 모델 저장
    if test_acc > best_acc:
        best_acc = test_acc
        torch.save(model.state_dict(), 'best_cifar10.pth')

    print(f'Epoch {epoch+1:2d} | Train Acc: {train_acc:.2f}% | Test Acc: {test_acc:.2f}%')

print(f'\\nBest Test Accuracy: {best_acc:.2f}%')
\`\`\`

### 예상 결과
\`\`\`
Epoch  1 | Train Acc: 45.23% | Test Acc: 52.10%
Epoch 10 | Train Acc: 78.45% | Test Acc: 75.32%
Epoch 30 | Train Acc: 92.18% | Test Acc: 82.45%
Epoch 50 | Train Acc: 96.72% | Test Acc: 85.21%

Best Test Accuracy: 85.21%
\`\`\`

---

## 📊 6. 결과 분석

### 클래스별 정확도
\`\`\`python
# 클래스별 정확도 계산
class_names = ['plane', 'car', 'bird', 'cat', 'deer',
               'dog', 'frog', 'horse', 'ship', 'truck']

class_correct = [0] * 10
class_total = [0] * 10

model.eval()
with torch.no_grad():
    for images, labels in test_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        _, predicted = outputs.max(1)

        for i in range(labels.size(0)):
            label = labels[i]
            class_correct[label] += (predicted[i] == label).item()
            class_total[label] += 1

for i in range(10):
    print(f'{class_names[i]:>8}: {100*class_correct[i]/class_total[i]:.1f}%')
\`\`\`

### 혼동 행렬
\`\`\`
어려운 클래스:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cat ↔ dog: 비슷하게 생겨서 혼동
car ↔ truck: 형태가 유사
bird ↔ plane: 하늘을 나는 물체

쉬운 클래스:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ship, frog: 특징이 명확
\`\`\`

---

## 💡 7. 성능 향상 팁

### 더 높은 정확도를 위해
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. 더 깊은 네트워크 (ResNet 사용)              │
│     → 90%+ 가능                                 │
│                                                 │
│  2. 더 강한 데이터 증강                         │
│     - Cutout, Mixup, CutMix                     │
│                                                 │
│  3. 학습률 튜닝                                 │
│     - Warm-up + Cosine Decay                    │
│                                                 │
│  4. 정규화 강화                                 │
│     - Label Smoothing                           │
│     - Weight Decay 조정                         │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

---

## 🎯 핵심 정리

\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  CIFAR-10: 32×32 컬러 이미지, 10개 클래스       │
│                                                 │
│  핵심 기법:                                     │
│  - 데이터 증강 필수 (Flip, Crop)                │
│  - VGG 스타일: Conv×2 → Pool 반복               │
│  - Global Average Pooling 사용                  │
│  - BatchNorm + Dropout 조합                     │
│                                                 │
│  목표: 85%+ (더 깊은 모델로 90%+)               │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

## ✅ 학습 체크리스트
- [ ] CIFAR-10 데이터셋 이해
- [ ] 데이터 증강 적용
- [ ] VGG 스타일 CNN 구현
- [ ] 80%+ 정확도 달성

## 🔜 다음 강의 예고
**"전이 학습"** - 사전 학습된 모델을 활용해 더 높은 성능을 달성합니다!
`;

export const LEVEL_5_LESSON_7 = `
# 전이 학습

## 🎯 학습 목표
이 레슨을 완료하면:
- 전이 학습의 개념과 장점을 이해합니다
- Pre-trained 모델을 불러와 사용합니다
- Fine-tuning 기법을 적용합니다
- 적은 데이터로도 높은 성능을 달성합니다

---

## 🔄 1. 전이 학습이란?

### 핵심 개념
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│   전이 학습 = 한 작업에서 학습한 지식을         │
│               다른 작업에 적용하는 기법         │
│                                                 │
│   ImageNet에서 학습한 모델 →                    │
│   새로운 분류 문제에 활용!                      │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

### 왜 전이 학습인가?
\`\`\`
직접 학습의 문제:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 대량의 데이터 필요 (수십만 장)
- 긴 학습 시간 (수일~수주)
- 많은 GPU 자원
- 과적합 위험

전이 학습의 장점:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 적은 데이터로도 가능 (수백~수천 장)
✅ 빠른 학습 (수 시간)
✅ 적은 자원
✅ 높은 성능
\`\`\`

---

## 🧠 2. CNN의 특징 추출 과정

### 레이어별 학습 내용
\`\`\`
CNN이 학습하는 특징의 계층 구조:

초기 레이어 (범용적):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conv1: 엣지, 색상 블롭
Conv2: 텍스처, 패턴
  → 모든 이미지에 공통!

중간 레이어:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conv3-4: 부분 구조 (눈, 바퀴 등)
  → 점점 구체적

후반 레이어 (작업 특화):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conv5: 고수준 특징 (얼굴, 물체)
FC: 최종 분류
  → 작업에 따라 다름
\`\`\`

### 전이 학습 전략
\`\`\`
┌─────────────────┬─────────────────────────────┐
│     방법        │          설명               │
├─────────────────┼─────────────────────────────┤
│  Feature        │  Conv 레이어 고정           │
│  Extraction     │  FC만 새로 학습             │
├─────────────────┼─────────────────────────────┤
│  Fine-tuning    │  일부/전체 레이어 재학습    │
│                 │  낮은 학습률 사용           │
└─────────────────┴─────────────────────────────┘
\`\`\`

---

## 📦 3. PyTorch에서 Pre-trained 모델

### 사용 가능한 모델
\`\`\`python
from torchvision import models

# 주요 모델들
resnet18 = models.resnet18(pretrained=True)   # 11M params
resnet50 = models.resnet50(pretrained=True)   # 25M params
vgg16 = models.vgg16(pretrained=True)         # 138M params
mobilenet_v2 = models.mobilenet_v2(pretrained=True)  # 3.4M params (경량)
efficientnet_b0 = models.efficientnet_b0(pretrained=True)  # 5.3M params
\`\`\`

### 모델 구조 확인
\`\`\`python
model = models.resnet18(pretrained=True)
print(model)

# ResNet18 구조:
# - conv1: 첫 번째 Conv
# - bn1, relu, maxpool
# - layer1~4: ResNet 블록들
# - avgpool: Global Average Pool
# - fc: 최종 분류 (1000 classes)
\`\`\`

---

## 🔧 4. Feature Extraction 방식

### 마지막 레이어만 교체
\`\`\`python
import torch
import torch.nn as nn
from torchvision import models

# Pre-trained ResNet18 로드
model = models.resnet18(pretrained=True)

# 모든 파라미터 고정
for param in model.parameters():
    param.requires_grad = False

# 마지막 FC 레이어만 교체
num_classes = 10  # 새로운 클래스 수
model.fc = nn.Linear(model.fc.in_features, num_classes)

# fc 레이어만 학습됨
print(f"학습 가능 파라미터: {sum(p.numel() for p in model.parameters() if p.requires_grad)}")
# 출력: 5,130 (512*10 + 10)
\`\`\`

### 학습
\`\`\`python
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

# FC만 학습하므로 빠름!
optimizer = torch.optim.Adam(model.fc.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

# 5~10 에폭이면 충분
for epoch in range(10):
    # 학습 코드...
    pass
\`\`\`

---

## 🎯 5. Fine-tuning 방식

### 전체 네트워크 미세 조정
\`\`\`python
# Pre-trained 모델 로드
model = models.resnet18(pretrained=True)

# 마지막 레이어 교체
model.fc = nn.Linear(model.fc.in_features, num_classes)

# 모든 파라미터 학습 (requires_grad = True가 기본)
model = model.to(device)

# 낮은 학습률 사용 (pre-trained 가중치 보존)
optimizer = torch.optim.Adam([
    {'params': model.fc.parameters(), 'lr': 1e-3},       # 새 레이어: 높은 lr
    {'params': model.layer4.parameters(), 'lr': 1e-4},   # 후반: 중간 lr
    {'params': model.layer3.parameters(), 'lr': 1e-5},   # 중반: 낮은 lr
], lr=1e-5)  # 나머지: 매우 낮은 lr
\`\`\`

### 점진적 언프리징
\`\`\`python
# 처음에는 FC만 학습
for param in model.parameters():
    param.requires_grad = False
model.fc.requires_grad_(True)

# 몇 에폭 후 layer4도 언프리징
model.layer4.requires_grad_(True)

# 더 진행 후 layer3도...
model.layer3.requires_grad_(True)
\`\`\`

---

## 💻 6. 완전한 예제: CIFAR-10 전이 학습

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader

# 데이터 준비 (ImageNet 정규화 사용!)
transform = transforms.Compose([
    transforms.Resize(224),  # ResNet 입력 크기
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],  # ImageNet 통계
        std=[0.229, 0.224, 0.225]
    )
])

train_dataset = datasets.CIFAR10('./data', train=True, download=True, transform=transform)
test_dataset = datasets.CIFAR10('./data', train=False, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=100)

# 모델 준비
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(512, 10)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

# Fine-tuning 설정
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-4)

# 학습
for epoch in range(5):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

    # 평가
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for images, labels in test_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

    print(f'Epoch {epoch+1}: Test Acc = {100*correct/total:.2f}%')
\`\`\`

### 예상 결과
\`\`\`
Epoch 1: Test Acc = 85.23%
Epoch 2: Test Acc = 89.45%
Epoch 3: Test Acc = 91.12%
Epoch 4: Test Acc = 92.34%
Epoch 5: Test Acc = 93.10%

→ 직접 학습(85%)보다 훨씬 높은 성능!
→ 학습 시간도 대폭 단축!
\`\`\`

---

## 📊 7. 전이 학습 가이드라인

### 데이터 크기에 따른 전략
\`\`\`
┌─────────────────┬─────────────────────────────┐
│   데이터 크기   │          전략               │
├─────────────────┼─────────────────────────────┤
│   매우 적음     │  Feature Extraction         │
│   (100장 미만)  │  FC만 학습, 높은 정규화     │
├─────────────────┼─────────────────────────────┤
│   적음          │  Fine-tune 후반 레이어      │
│   (1000장 미만) │  layer4 + FC                │
├─────────────────┼─────────────────────────────┤
│   보통          │  Fine-tune 전체             │
│   (1만장 이상)  │  낮은 학습률로 전체 조정    │
├─────────────────┼─────────────────────────────┤
│   충분          │  처음부터 학습 고려         │
│   (10만장 이상) │  Pre-trained가 도움 안 될 수│
└─────────────────┴─────────────────────────────┘
\`\`\`

---

## 🎯 핵심 정리

\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  전이 학습: ImageNet 지식 → 새 작업 적용        │
│                                                 │
│  Feature Extraction:                            │
│  - Conv 고정, FC만 학습                         │
│  - 빠르고 간단                                  │
│                                                 │
│  Fine-tuning:                                   │
│  - 전체 미세 조정                               │
│  - 낮은 학습률 필수                             │
│                                                 │
│  ImageNet 정규화 사용:                          │
│  mean=[0.485, 0.456, 0.406]                     │
│  std=[0.229, 0.224, 0.225]                      │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

## ✅ 학습 체크리스트
- [ ] 전이 학습 개념 이해
- [ ] Pre-trained 모델 불러오기
- [ ] Feature Extraction 적용
- [ ] Fine-tuning 적용

## 🔜 다음 강의 예고
**"데이터 증강"** - 이미지 변환으로 데이터를 늘리는 다양한 기법을 배웁니다!
`;

export const LEVEL_5_LESSON_8 = `
# 데이터 증강

## 🎯 학습 목표
이 레슨을 완료하면:
- 데이터 증강의 필요성과 효과를 이해합니다
- 다양한 이미지 변환 기법을 익힙니다
- torchvision.transforms를 능숙하게 사용합니다
- 고급 증강 기법(Cutout, Mixup, CutMix)을 배웁니다

---

## 🔄 1. 데이터 증강이란?

### 핵심 개념
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│   데이터 증강 = 원본 이미지를 변환하여          │
│                학습 데이터를 늘리는 기법        │
│                                                 │
│   1장의 이미지 → 수십 가지 변형 생성!           │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

### 왜 필요한가?
\`\`\`
문제: 데이터 부족 → 과적합!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

학습 데이터가 적으면:
- 모델이 훈련 데이터를 외움
- 새로운 데이터에 일반화 실패

데이터 증강의 효과:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 데이터 양 증가 (가상)
✅ 다양한 상황 학습
✅ 과적합 방지
✅ 일반화 성능 향상
\`\`\`

---

## 🖼️ 2. 기본 변환 기법

### 기하학적 변환
\`\`\`python
from torchvision import transforms

# 1. 좌우 반전 (Horizontal Flip)
transforms.RandomHorizontalFlip(p=0.5)
# 50% 확률로 좌우 반전
# 대부분의 객체에 적용 가능

# 2. 상하 반전 (Vertical Flip)
transforms.RandomVerticalFlip(p=0.5)
# 위성 이미지, 의료 이미지 등에 사용
# 일반 객체에는 부자연스러울 수 있음

# 3. 회전 (Rotation)
transforms.RandomRotation(degrees=15)
# -15° ~ +15° 범위에서 무작위 회전

# 4. 랜덤 크롭 (Random Crop)
transforms.RandomCrop(32, padding=4)
# 이미지 가장자리에 4픽셀 패딩 후 32×32 크롭
\`\`\`

### 크기 및 비율 변환
\`\`\`python
# 5. 랜덤 리사이즈 크롭
transforms.RandomResizedCrop(
    size=224,
    scale=(0.8, 1.0),   # 원본의 80~100%
    ratio=(0.9, 1.1)    # 가로세로 비율
)

# 6. 아핀 변환 (회전+이동+스케일)
transforms.RandomAffine(
    degrees=15,         # 회전
    translate=(0.1, 0.1),  # 이동
    scale=(0.9, 1.1),   # 스케일
    shear=10            # 기울기
)
\`\`\`

---

## 🎨 3. 색상 변환

### ColorJitter
\`\`\`python
# 밝기, 대비, 채도, 색조 변환
transforms.ColorJitter(
    brightness=0.2,  # ±20% 밝기
    contrast=0.2,    # ±20% 대비
    saturation=0.2,  # ±20% 채도
    hue=0.1          # ±10% 색조
)
\`\`\`

### 기타 색상 변환
\`\`\`python
# 그레이스케일 변환
transforms.RandomGrayscale(p=0.1)
# 10% 확률로 흑백 변환

# 가우시안 블러
transforms.GaussianBlur(kernel_size=3)

# 색상 반전
transforms.RandomInvert(p=0.1)
\`\`\`

---

## 📦 4. 실전 변환 파이프라인

### CIFAR-10용 기본 증강
\`\`\`python
train_transform = transforms.Compose([
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomCrop(32, padding=4),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.4914, 0.4822, 0.4465],
        std=[0.2470, 0.2435, 0.2616]
    )
])

test_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.4914, 0.4822, 0.4465],
        std=[0.2470, 0.2435, 0.2616]
    )
])
\`\`\`

### ImageNet용 강한 증강
\`\`\`python
train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(0.4, 0.4, 0.4, 0.1),
    transforms.RandomGrayscale(p=0.2),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])
\`\`\`

---

## 🚀 5. 고급 증강 기법

### Cutout (Random Erasing)
\`\`\`
이미지의 일부를 무작위로 가림
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

원본:           Cutout 적용:
┌─────────┐     ┌─────────┐
│  🐱     │     │  🐱     │
│         │  →  │ ███     │
│         │     │         │
└─────────┘     └─────────┘

모델이 일부만 보고도 인식하도록 학습!
\`\`\`

\`\`\`python
# PyTorch 구현
transforms.RandomErasing(
    p=0.5,           # 50% 확률
    scale=(0.02, 0.33),  # 면적 비율
    ratio=(0.3, 3.3),    # 가로세로 비율
    value=0          # 채울 값 (0=검정)
)
\`\`\`

### Mixup
\`\`\`
두 이미지를 섞어서 새로운 샘플 생성
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

이미지 A (고양이)  +  이미지 B (개)
    60%                 40%
              ↓
       혼합 이미지
    라벨: [0.6, 0.4]
\`\`\`

\`\`\`python
def mixup_data(x, y, alpha=1.0):
    lam = np.random.beta(alpha, alpha)
    batch_size = x.size(0)
    index = torch.randperm(batch_size)

    mixed_x = lam * x + (1 - lam) * x[index]
    y_a, y_b = y, y[index]

    return mixed_x, y_a, y_b, lam

def mixup_criterion(criterion, pred, y_a, y_b, lam):
    return lam * criterion(pred, y_a) + (1 - lam) * criterion(pred, y_b)
\`\`\`

### CutMix
\`\`\`
한 이미지의 일부를 다른 이미지로 대체
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

이미지 A:        이미지 B:        CutMix:
┌─────────┐     ┌─────────┐     ┌─────────┐
│  🐱     │  +  │  🐕     │  =  │  🐱     │
│         │     │         │     │ 🐕│     │
└─────────┘     └─────────┘     └─────────┘

라벨: 면적 비율로 혼합
\`\`\`

---

## 📊 6. 증강 효과 비교

### 실험 결과 (CIFAR-10)
\`\`\`
┌─────────────────────┬───────────────────┐
│       방법          │    Test Accuracy  │
├─────────────────────┼───────────────────┤
│  기본 (증강 없음)   │      85.0%        │
│  Flip + Crop        │      88.5%        │
│  + ColorJitter      │      89.2%        │
│  + Cutout           │      90.5%        │
│  + Mixup            │      91.2%        │
│  + CutMix           │      92.0%        │
│  AutoAugment        │      93.5%        │
└─────────────────────┴───────────────────┘
\`\`\`

### 증강 선택 가이드
\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  항상 사용:                                     │
│  - RandomHorizontalFlip                         │
│  - RandomCrop (with padding)                    │
│                                                 │
│  추가로 사용:                                   │
│  - ColorJitter (색상 변화가 있는 경우)          │
│  - RandomRotation (회전 불변성 필요시)          │
│                                                 │
│  고급 (성능 향상):                              │
│  - Cutout/RandomErasing                         │
│  - Mixup/CutMix                                 │
│                                                 │
│  자동화:                                        │
│  - AutoAugment, RandAugment                     │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

---

## 💻 7. 완전한 예제

\`\`\`python
import torch
from torchvision import transforms, datasets
from torch.utils.data import DataLoader

# 강력한 증강 파이프라인
train_transform = transforms.Compose([
    # 기하학적 변환
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomCrop(32, padding=4),
    transforms.RandomRotation(15),

    # 색상 변환
    transforms.ColorJitter(
        brightness=0.2,
        contrast=0.2,
        saturation=0.2
    ),

    # 텐서 변환
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.4914, 0.4822, 0.4465],
        std=[0.2470, 0.2435, 0.2616]
    ),

    # Cutout
    transforms.RandomErasing(p=0.5, scale=(0.02, 0.2))
])

# 데이터 로드
train_dataset = datasets.CIFAR10(
    './data', train=True, download=True, transform=train_transform
)
train_loader = DataLoader(train_dataset, batch_size=128, shuffle=True)

# 변환된 이미지 확인
images, labels = next(iter(train_loader))
print(f"배치 shape: {images.shape}")  # [128, 3, 32, 32]
\`\`\`

---

## 🎯 핵심 정리

\`\`\`
┌─────────────────────────────────────────────────┐
│                                                 │
│  데이터 증강: 이미지 변환으로 데이터 확장       │
│                                                 │
│  기본 기법:                                     │
│  - Flip, Crop, Rotation                         │
│  - ColorJitter                                  │
│                                                 │
│  고급 기법:                                     │
│  - Cutout: 일부 가림                            │
│  - Mixup: 이미지 혼합                           │
│  - CutMix: 영역 대체                            │
│                                                 │
│  주의: 테스트 데이터에는 증강 적용 X!           │
│                                                 │
└─────────────────────────────────────────────────┘
\`\`\`

## ✅ 학습 체크리스트
- [ ] 데이터 증강의 필요성 이해
- [ ] transforms.Compose 사용
- [ ] 기하학적/색상 변환 적용
- [ ] Cutout, Mixup 원리 이해

## 🎉 Level 5 완료!
축하합니다! CNN과 이미지 처리의 기초를 완성했습니다.
다음 레벨에서는 RNN/LSTM을 배워 시퀀스 데이터를 다룹니다!
`;
