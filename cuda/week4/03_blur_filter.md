# Day 3: 이미지 필터링 (Blur)

## 1. 컨볼루션이란?

이미지 필터링의 핵심 연산입니다.

```
입력 이미지의 각 픽셀에 대해:
1. 주변 픽셀들을 가져옴
2. 필터(커널)와 곱셈
3. 합산하여 새 픽셀 값 생성
```

### 1.1 시각화

```
입력 (3x3 영역)    필터 (3x3)      출력
┌───┬───┬───┐    ┌───┬───┬───┐
│ 1 │ 2 │ 3 │    │1/9│1/9│1/9│
├───┼───┼───┤  × ├───┼───┼───┤  = 새 픽셀 값
│ 4 │ 5 │ 6 │    │1/9│1/9│1/9│
├───┼───┼───┤    ├───┼───┼───┤
│ 7 │ 8 │ 9 │    │1/9│1/9│1/9│
└───┴───┴───┘    └───┴───┴───┘

결과 = (1+2+3+4+5+6+7+8+9) / 9 = 5
```

---

## 2. Box Blur (평균 블러)

### 2.1 원리

주변 픽셀의 평균을 계산합니다.

```
3x3 Box Blur 필터:
┌─────┬─────┬─────┐
│ 1/9 │ 1/9 │ 1/9 │
├─────┼─────┼─────┤
│ 1/9 │ 1/9 │ 1/9 │
├─────┼─────┼─────┤
│ 1/9 │ 1/9 │ 1/9 │
└─────┴─────┴─────┘
```

### 2.2 GPU 커널

```c
#define BLUR_SIZE 1  // 3x3 (중심에서 ±1)

__global__ void boxBlur(unsigned char* input, unsigned char* output,
                         int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        for (int c = 0; c < channels; c++) {
            float sum = 0;
            int count = 0;

            // 주변 픽셀 합산
            for (int dy = -BLUR_SIZE; dy <= BLUR_SIZE; dy++) {
                for (int dx = -BLUR_SIZE; dx <= BLUR_SIZE; dx++) {
                    int nx = x + dx;
                    int ny = y + dy;

                    // 경계 체크
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        sum += input[(ny * width + nx) * channels + c];
                        count++;
                    }
                }
            }

            output[(y * width + x) * channels + c] = (unsigned char)(sum / count);
        }
    }
}
```

---

## 3. Gaussian Blur

### 3.1 원리

가까운 픽셀에 더 높은 가중치를 부여합니다.

```
3x3 Gaussian 필터:
┌──────┬──────┬──────┐
│ 1/16 │ 2/16 │ 1/16 │
├──────┼──────┼──────┤
│ 2/16 │ 4/16 │ 2/16 │
├──────┼──────┼──────┤
│ 1/16 │ 2/16 │ 1/16 │
└──────┴──────┴──────┘

또는 정수로:
[ 1  2  1 ]
[ 2  4  2 ] / 16
[ 1  2  1 ]
```

### 3.2 GPU 커널

```c
__constant__ float gaussianKernel[9] = {
    1/16.0f, 2/16.0f, 1/16.0f,
    2/16.0f, 4/16.0f, 2/16.0f,
    1/16.0f, 2/16.0f, 1/16.0f
};

__global__ void gaussianBlur(unsigned char* input, unsigned char* output,
                              int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        for (int c = 0; c < channels; c++) {
            float sum = 0;
            int k = 0;

            for (int dy = -1; dy <= 1; dy++) {
                for (int dx = -1; dx <= 1; dx++) {
                    int nx = min(max(x + dx, 0), width - 1);
                    int ny = min(max(y + dy, 0), height - 1);

                    sum += input[(ny * width + nx) * channels + c] * gaussianKernel[k];
                    k++;
                }
            }

            output[(y * width + x) * channels + c] = (unsigned char)sum;
        }
    }
}
```

---

## 4. Shared Memory 최적화

### 4.1 문제점

각 픽셀이 주변 9개 픽셀을 읽음 → 메모리 접근 많음!

### 4.2 해결: 타일링

```c
#define TILE_SIZE 16
#define BLUR_RADIUS 1
#define BLOCK_SIZE (TILE_SIZE + 2 * BLUR_RADIUS)

__global__ void boxBlurShared(unsigned char* input, unsigned char* output,
                               int width, int height) {
    __shared__ unsigned char tile[BLOCK_SIZE][BLOCK_SIZE];

    int x = blockIdx.x * TILE_SIZE + threadIdx.x - BLUR_RADIUS;
    int y = blockIdx.y * TILE_SIZE + threadIdx.y - BLUR_RADIUS;

    // 경계 처리
    int clampedX = min(max(x, 0), width - 1);
    int clampedY = min(max(y, 0), height - 1);

    // Shared Memory에 로드
    tile[threadIdx.y][threadIdx.x] = input[clampedY * width + clampedX];
    __syncthreads();

    // 실제 처리할 픽셀만
    if (threadIdx.x >= BLUR_RADIUS && threadIdx.x < TILE_SIZE + BLUR_RADIUS &&
        threadIdx.y >= BLUR_RADIUS && threadIdx.y < TILE_SIZE + BLUR_RADIUS) {

        int outX = blockIdx.x * TILE_SIZE + threadIdx.x - BLUR_RADIUS;
        int outY = blockIdx.y * TILE_SIZE + threadIdx.y - BLUR_RADIUS;

        if (outX < width && outY < height) {
            float sum = 0;
            for (int dy = -BLUR_RADIUS; dy <= BLUR_RADIUS; dy++) {
                for (int dx = -BLUR_RADIUS; dx <= BLUR_RADIUS; dx++) {
                    sum += tile[threadIdx.y + dy][threadIdx.x + dx];
                }
            }
            output[outY * width + outX] = (unsigned char)(sum / 9.0f);
        }
    }
}
```

---

## 5. 완성 코드

```c
// blur.cu
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

#include <stdio.h>

#define BLUR_SIZE 2  // 5x5 blur

__global__ void boxBlur(unsigned char* input, unsigned char* output,
                         int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        for (int c = 0; c < channels; c++) {
            float sum = 0;
            int count = 0;

            for (int dy = -BLUR_SIZE; dy <= BLUR_SIZE; dy++) {
                for (int dx = -BLUR_SIZE; dx <= BLUR_SIZE; dx++) {
                    int nx = x + dx;
                    int ny = y + dy;

                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        sum += input[(ny * width + nx) * channels + c];
                        count++;
                    }
                }
            }

            output[(y * width + x) * channels + c] = (unsigned char)(sum / count);
        }
    }
}

int main(int argc, char** argv) {
    const char* inputFile = (argc > 1) ? argv[1] : "input.jpg";

    int width, height, channels;
    unsigned char* h_input = stbi_load(inputFile, &width, &height, &channels, 0);

    if (!h_input) {
        printf("Failed to load image!\n");
        return 1;
    }

    printf("Image: %dx%d, %d channels\n", width, height, channels);
    printf("Blur size: %dx%d\n", BLUR_SIZE * 2 + 1, BLUR_SIZE * 2 + 1);

    size_t size = width * height * channels;
    unsigned char* h_output = (unsigned char*)malloc(size);

    unsigned char *d_input, *d_output;
    cudaMalloc(&d_input, size);
    cudaMalloc(&d_output, size);

    cudaMemcpy(d_input, h_input, size, cudaMemcpyHostToDevice);

    dim3 threads(16, 16);
    dim3 blocks((width + 15) / 16, (height + 15) / 16);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    boxBlur<<<blocks, threads>>>(d_input, d_output, width, height, channels);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms;
    cudaEventElapsedTime(&ms, start, stop);
    printf("GPU Time: %.3f ms\n", ms);

    cudaMemcpy(h_output, d_output, size, cudaMemcpyDeviceToHost);

    stbi_write_png("blurred.png", width, height, channels, h_output, width * channels);
    printf("Saved: blurred.png\n");

    cudaFree(d_input);
    cudaFree(d_output);
    free(h_output);
    stbi_image_free(h_input);

    return 0;
}
```

---

## 6. 오늘의 실습

### 실습 1: Box Blur
- [ ] blur.cu 작성
- [ ] 3x3, 5x5, 7x7 블러 비교

### 실습 2: Gaussian Blur
- [ ] Gaussian 커널 구현
- [ ] Box Blur와 결과 비교

### 실습 3: 성능 최적화
- [ ] Shared Memory 버전 구현
- [ ] 기본 버전과 성능 비교

---

## 7. 다음 시간 예고

내일은 Edge Detection을 구현합니다!
- Sobel 필터
- 에지 검출 원리
