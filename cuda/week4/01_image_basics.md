# Day 1: 이미지 기초

## 1. 디지털 이미지란?

### 1.1 픽셀 (Pixel)

이미지는 작은 점(픽셀)들의 모임입니다.

```
이미지 (4x4 픽셀):
┌────┬────┬────┬────┐
│    │    │    │    │
├────┼────┼────┼────┤
│    │    │    │    │
├────┼────┼────┼────┤
│    │    │    │    │
├────┼────┼────┼────┤
│    │    │    │    │
└────┴────┴────┴────┘

각 칸 = 1 픽셀
```

### 1.2 해상도

- 1920 x 1080 = Full HD (약 200만 픽셀)
- 3840 x 2160 = 4K (약 800만 픽셀)

---

## 2. 색상 표현

### 2.1 Grayscale (흑백)

```
0 (검정) ←───────────→ 255 (흰색)

픽셀 값: 0~255 (8비트)
```

### 2.2 RGB (컬러)

```
Red   (R): 0~255
Green (G): 0~255
Blue  (B): 0~255

예시:
- 빨강: (255, 0, 0)
- 초록: (0, 255, 0)
- 파랑: (0, 0, 255)
- 흰색: (255, 255, 255)
- 검정: (0, 0, 0)
- 노랑: (255, 255, 0)
```

### 2.3 RGBA

RGB + Alpha (투명도)

```
Alpha: 0 (완전 투명) ~ 255 (완전 불투명)
```

---

## 3. 메모리에서의 이미지 저장

### 3.1 저장 방식

```
이미지 (3x2, RGB):
┌─────┬─────┬─────┐
│R G B│R G B│R G B│  행 0
├─────┼─────┼─────┤
│R G B│R G B│R G B│  행 1
└─────┴─────┴─────┘

메모리 (연속):
[R₀₀ G₀₀ B₀₀ R₀₁ G₀₁ B₀₁ R₀₂ G₀₂ B₀₂ R₁₀ G₁₀ B₁₀ ...]
 ────────────────────────────────────
              행 0                          행 1
```

### 3.2 인덱스 계산

```c
// 픽셀 (x, y)의 R 채널 위치
int idx = (y * width + x) * 3;      // RGB
int idx = (y * width + x) * 4;      // RGBA

// 각 채널 접근
unsigned char R = image[idx + 0];
unsigned char G = image[idx + 1];
unsigned char B = image[idx + 2];
```

---

## 4. stb_image 라이브러리

### 4.1 소개

- 헤더 파일 하나로 이미지 읽기/쓰기
- PNG, JPG, BMP 등 지원
- 간단하고 가벼움

### 4.2 설치

```bash
# 다운로드
wget https://raw.githubusercontent.com/nothings/stb/master/stb_image.h
wget https://raw.githubusercontent.com/nothings/stb/master/stb_image_write.h

# 또는 Git clone
git clone https://github.com/nothings/stb.git
```

### 4.3 사용법

```c
// 헤더 포함 (한 번만 정의)
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

int main() {
    int width, height, channels;

    // 이미지 읽기
    unsigned char* img = stbi_load("input.jpg",
                                    &width, &height, &channels, 0);

    if (img == NULL) {
        printf("Failed to load image!\n");
        return 1;
    }

    printf("Image: %d x %d, %d channels\n", width, height, channels);

    // 이미지 저장
    stbi_write_png("output.png", width, height, channels, img, width * channels);

    // 메모리 해제
    stbi_image_free(img);

    return 0;
}
```

---

## 5. CUDA에서 이미지 처리

### 5.1 기본 구조

```c
// 1. 이미지 로드 (CPU)
unsigned char* h_img = stbi_load(...);

// 2. GPU 메모리 할당
unsigned char* d_img;
cudaMalloc(&d_img, width * height * channels);

// 3. CPU → GPU 복사
cudaMemcpy(d_img, h_img, size, cudaMemcpyHostToDevice);

// 4. 커널 실행
imageKernel<<<blocks, threads>>>(d_img, width, height);

// 5. GPU → CPU 복사
cudaMemcpy(h_img, d_img, size, cudaMemcpyDeviceToHost);

// 6. 이미지 저장
stbi_write_png(...);
```

### 5.2 Unified Memory 사용 시

```c
// Jetson에서 더 간단하게
unsigned char* img;
cudaMallocManaged(&img, size);

// CPU에서 직접 로드는 안 됨 (stbi_load는 malloc 사용)
// 방법 1: 복사
unsigned char* h_img = stbi_load(...);
memcpy(img, h_img, size);
stbi_image_free(h_img);

// 또는 방법 2: cudaMemcpy 사용
```

---

## 6. 커널 설계

### 6.1 픽셀당 하나의 스레드

```c
__global__ void processImage(unsigned char* img, int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = (y * width + x) * 3;  // RGB

        unsigned char r = img[idx + 0];
        unsigned char g = img[idx + 1];
        unsigned char b = img[idx + 2];

        // 이미지 처리...
    }
}
```

### 6.2 Grid/Block 설정

```c
dim3 threads(16, 16);  // 256 threads per block
dim3 blocks((width + 15) / 16, (height + 15) / 16);

processImage<<<blocks, threads>>>(img, width, height);
```

---

## 7. 예제: 이미지 반전

### 7.1 알고리즘

```
new_pixel = 255 - old_pixel
```

### 7.2 코드

```c
// invert.cu
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

#include <stdio.h>

__global__ void invertImage(unsigned char* img, int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = (y * width + x) * channels;

        for (int c = 0; c < channels && c < 3; c++) {  // RGB만 반전
            img[idx + c] = 255 - img[idx + c];
        }
    }
}

int main() {
    int width, height, channels;

    // 이미지 로드
    unsigned char* h_img = stbi_load("input.jpg", &width, &height, &channels, 0);
    if (!h_img) {
        printf("Failed to load image!\n");
        return 1;
    }

    printf("Image: %dx%d, %d channels\n", width, height, channels);

    size_t size = width * height * channels;

    // GPU 메모리
    unsigned char* d_img;
    cudaMalloc(&d_img, size);
    cudaMemcpy(d_img, h_img, size, cudaMemcpyHostToDevice);

    // 커널 실행
    dim3 threads(16, 16);
    dim3 blocks((width + 15) / 16, (height + 15) / 16);

    invertImage<<<blocks, threads>>>(d_img, width, height, channels);

    // 결과 복사
    cudaMemcpy(h_img, d_img, size, cudaMemcpyDeviceToHost);

    // 저장
    stbi_write_png("inverted.png", width, height, channels, h_img, width * channels);
    printf("Saved: inverted.png\n");

    // 정리
    cudaFree(d_img);
    stbi_image_free(h_img);

    return 0;
}
```

---

## 8. 오늘의 실습

### 실습 1: stb_image 설치
- [ ] stb_image.h 다운로드
- [ ] stb_image_write.h 다운로드
- [ ] week4/code 폴더에 저장

### 실습 2: 이미지 읽기/쓰기
- [ ] 테스트 이미지 준비 (input.jpg)
- [ ] 이미지 정보 출력 프로그램 작성
- [ ] 이미지 복사 테스트

### 실습 3: 이미지 반전
- [ ] invert.cu 작성
- [ ] 컴파일 및 실행
- [ ] 결과 확인

---

## 9. 용어 정리

| 용어 | 의미 |
|------|------|
| **Pixel** | 이미지의 최소 단위 |
| **Resolution** | 이미지 크기 (픽셀 수) |
| **Channel** | 색상 구성요소 (R, G, B, A) |
| **Grayscale** | 흑백 이미지 |
| **stb_image** | 이미지 처리 라이브러리 |

---

## 10. 다음 시간 예고

내일은 Grayscale 변환을 구현합니다!
- RGB → Grayscale 공식
- GPU 최적화
- 성능 비교
