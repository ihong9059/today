# 예제 1: grayscale.cu

## 목적
**GPU로 이미지를 그레이스케일로 변환한다.**

이미지 처리의 가장 기본적인 연산으로, 컬러(RGB) 이미지를 흑백으로 변환합니다.

---

## 실행 방법

```bash
cd ~/cuda/week4/code
nvcc grayscale.cu -o grayscale

# 테스트 이미지로 실행
./grayscale

# 실제 이미지로 실행
./grayscale input.jpg output.jpg
```

---

## 실행 결과

```
==========================================
  GPU Grayscale Conversion
==========================================

Generated test image (1920x1080)...

Running CPU version...
Running GPU version...
  Grid: 120 x 68 blocks
  Block: 16 x 16 threads

========== Results ==========
Image size: 1920 x 1080 (2073600 pixels)
CPU Time: 12.456 ms
GPU Time: 0.523 ms
Speedup: 23.82x
=============================

Verification: PASSED (0 errors)

Output saved: grayscale_output.jpg
```

---

## 코드 분석

### 그레이스케일 변환 공식

```
Gray = 0.299 × R + 0.587 × G + 0.114 × B
```

이 가중치는 **인간의 눈이 색상에 대한 민감도**를 반영합니다:
- 녹색에 가장 민감 (0.587)
- 빨간색 다음 (0.299)
- 파란색에 가장 둔감 (0.114)

### GPU 커널

```c
__global__ void rgbToGrayscale(unsigned char* input, unsigned char* output,
                                int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = (y * width + x) * channels;  // RGB 위치
        int outIdx = y * width + x;             // Gray 위치

        unsigned char r = input[idx];
        unsigned char g = input[idx + 1];
        unsigned char b = input[idx + 2];

        // 가중치 그레이스케일
        output[outIdx] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
    }
}
```

### 2D 그리드 구성

```c
dim3 threads(16, 16);  // 블록당 256 스레드
dim3 blocks((width + 15) / 16, (height + 15) / 16);

// 1920x1080 이미지:
// blocks = (120, 68) = 8160 블록
// 총 스레드 = 8160 × 256 = 2,088,960개
```

---

## 핵심 포인트

### 1. 이미지 메모리 구조

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   RGB 이미지 (channels = 3)                                 │
│                                                             │
│   픽셀 0:    [R0][G0][B0]                                   │
│   픽셀 1:    [R1][G1][B1]                                   │
│   픽셀 2:    [R2][G2][B2]                                   │
│   ...                                                       │
│                                                             │
│   idx = (y * width + x) * 3                                 │
│   R = input[idx], G = input[idx+1], B = input[idx+2]        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Grayscale 이미지 (channels = 1)                           │
│                                                             │
│   픽셀 0:    [Gray0]                                        │
│   픽셀 1:    [Gray1]                                        │
│   ...                                                       │
│                                                             │
│   outIdx = y * width + x                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. stb_image 라이브러리

이미지 로드/저장을 위해 **헤더 전용** 라이브러리를 사용합니다:

```c
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

// 이미지 로드
unsigned char* img = stbi_load("input.jpg", &width, &height, &channels, 3);

// 이미지 저장
stbi_write_jpg("output.jpg", width, height, 1, gray_data, 90);
```

**장점:**
- 별도 라이브러리 설치 불필요
- 크로스 플랫폼
- JPG, PNG, BMP 등 다양한 형식 지원

### 3. GPU 이미지 처리가 빠른 이유

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1920 × 1080 = 2,073,600 픽셀                              │
│                                                             │
│   CPU (4코어):                                              │
│   - 각 픽셀을 순차 처리                                     │
│   - ~200만 번 반복                                          │
│                                                             │
│   GPU (128코어 + 수천 스레드):                              │
│   - 각 픽셀을 병렬 처리                                     │
│   - 모든 픽셀이 "동시에" 변환                               │
│                                                             │
│   → 20배 이상 빠름!                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. 이미지 = 2D 배열 → 2D 그리드/블록 사용                   ║
║                                                               ║
║   2. 픽셀별 독립 연산 → GPU 병렬화에 최적                     ║
║                                                               ║
║   3. stb_image로 간편한 이미지 입출력                         ║
║                                                               ║
║   4. 그레이스케일 공식: 0.299R + 0.587G + 0.114B              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 다음 단계

`blur.cu`에서 컨볼루션 필터를 구현합니다.

---

*작성일: 2026-02-20*
