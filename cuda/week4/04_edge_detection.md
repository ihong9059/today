# Day 4: Edge Detection

## 1. Edge Detection이란?

이미지에서 경계(에지)를 찾는 기술입니다.

```
원본 이미지:          에지 검출 결과:
┌──────────────┐      ┌──────────────┐
│  ████████    │      │      ▓▓      │
│  ████████    │  →   │  ▓▓▓▓  ▓▓▓▓  │
│  ████████    │      │      ▓▓      │
└──────────────┘      └──────────────┘
   물체 영역            경계선만 표시
```

---

## 2. Sobel 필터

### 2.1 원리

x방향과 y방향의 변화율(기울기)을 계산합니다.

### 2.2 Sobel 커널

```
Gx (수평 에지):        Gy (수직 에지):
┌────┬────┬────┐      ┌────┬────┬────┐
│ -1 │  0 │  1 │      │ -1 │ -2 │ -1 │
├────┼────┼────┤      ├────┼────┼────┤
│ -2 │  0 │  2 │      │  0 │  0 │  0 │
├────┼────┼────┤      ├────┼────┼────┤
│ -1 │  0 │  1 │      │  1 │  2 │  1 │
└────┴────┴────┘      └────┴────┴────┘
```

### 2.3 에지 강도 계산

```
G = √(Gx² + Gy²)

또는 간단히:
G = |Gx| + |Gy|
```

---

## 3. GPU 구현

### 3.1 기본 커널

```c
__constant__ int sobelX[9] = {-1, 0, 1, -2, 0, 2, -1, 0, 1};
__constant__ int sobelY[9] = {-1, -2, -1, 0, 0, 0, 1, 2, 1};

__global__ void sobelEdge(unsigned char* input, unsigned char* output,
                           int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
        float gx = 0, gy = 0;
        int k = 0;

        for (int dy = -1; dy <= 1; dy++) {
            for (int dx = -1; dx <= 1; dx++) {
                int nx = x + dx;
                int ny = y + dy;
                unsigned char pixel = input[ny * width + nx];

                gx += pixel * sobelX[k];
                gy += pixel * sobelY[k];
                k++;
            }
        }

        // 에지 강도
        float magnitude = sqrtf(gx * gx + gy * gy);

        // 0~255로 클램핑
        output[y * width + x] = (unsigned char)min(magnitude, 255.0f);
    } else if (x < width && y < height) {
        output[y * width + x] = 0;
    }
}
```

---

## 4. 전체 파이프라인

### 4.1 처리 순서

```
원본 (RGB) → Grayscale → Sobel → 출력
```

### 4.2 완성 코드

```c
// edge_detection.cu
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

#include <stdio.h>

// Grayscale 변환
__global__ void toGrayscale(unsigned char* input, unsigned char* output,
                             int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int rgbIdx = (y * width + x) * channels;
        unsigned char r = input[rgbIdx + 0];
        unsigned char g = input[rgbIdx + 1];
        unsigned char b = input[rgbIdx + 2];

        output[y * width + x] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
    }
}

// Sobel Edge Detection
__constant__ int sobelX[9] = {-1, 0, 1, -2, 0, 2, -1, 0, 1};
__constant__ int sobelY[9] = {-1, -2, -1, 0, 0, 0, 1, 2, 1};

__global__ void sobelEdge(unsigned char* input, unsigned char* output,
                           int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
        float gx = 0, gy = 0;
        int k = 0;

        for (int dy = -1; dy <= 1; dy++) {
            for (int dx = -1; dx <= 1; dx++) {
                unsigned char pixel = input[(y + dy) * width + (x + dx)];
                gx += pixel * sobelX[k];
                gy += pixel * sobelY[k];
                k++;
            }
        }

        float magnitude = sqrtf(gx * gx + gy * gy);
        output[y * width + x] = (unsigned char)min(magnitude, 255.0f);
    } else if (x < width && y < height) {
        output[y * width + x] = 0;
    }
}

// 이진화 (임계값 적용)
__global__ void threshold(unsigned char* input, unsigned char* output,
                           int width, int height, unsigned char thresh) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = y * width + x;
        output[idx] = (input[idx] > thresh) ? 255 : 0;
    }
}

int main(int argc, char** argv) {
    const char* inputFile = (argc > 1) ? argv[1] : "input.jpg";
    unsigned char thresholdValue = (argc > 2) ? atoi(argv[2]) : 50;

    int width, height, channels;
    unsigned char* h_input = stbi_load(inputFile, &width, &height, &channels, 0);

    if (!h_input) {
        printf("Failed to load image!\n");
        return 1;
    }

    printf("Image: %dx%d, %d channels\n", width, height, channels);
    printf("Threshold: %d\n", thresholdValue);

    size_t rgbSize = width * height * channels;
    size_t graySize = width * height;

    // GPU 메모리 할당
    unsigned char *d_input, *d_gray, *d_edge, *d_binary;
    cudaMalloc(&d_input, rgbSize);
    cudaMalloc(&d_gray, graySize);
    cudaMalloc(&d_edge, graySize);
    cudaMalloc(&d_binary, graySize);

    cudaMemcpy(d_input, h_input, rgbSize, cudaMemcpyHostToDevice);

    dim3 threads(16, 16);
    dim3 blocks((width + 15) / 16, (height + 15) / 16);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);

    // 1. Grayscale 변환
    toGrayscale<<<blocks, threads>>>(d_input, d_gray, width, height, channels);

    // 2. Sobel Edge Detection
    sobelEdge<<<blocks, threads>>>(d_gray, d_edge, width, height);

    // 3. 이진화 (선택)
    threshold<<<blocks, threads>>>(d_edge, d_binary, width, height, thresholdValue);

    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms;
    cudaEventElapsedTime(&ms, start, stop);
    printf("Total GPU Time: %.3f ms\n", ms);

    // 결과 복사 및 저장
    unsigned char* h_output = (unsigned char*)malloc(graySize);

    // 에지 이미지 저장
    cudaMemcpy(h_output, d_edge, graySize, cudaMemcpyDeviceToHost);
    stbi_write_png("edges.png", width, height, 1, h_output, width);

    // 이진화 이미지 저장
    cudaMemcpy(h_output, d_binary, graySize, cudaMemcpyDeviceToHost);
    stbi_write_png("edges_binary.png", width, height, 1, h_output, width);

    printf("Saved: edges.png, edges_binary.png\n");

    // 정리
    cudaFree(d_input);
    cudaFree(d_gray);
    cudaFree(d_edge);
    cudaFree(d_binary);
    free(h_output);
    stbi_image_free(h_input);

    return 0;
}
```

---

## 5. 컴파일 및 실행

```bash
nvcc edge_detection.cu -o edge_detection
./edge_detection input.jpg 50
```

---

## 6. 다른 에지 검출 필터

### 6.1 Prewitt 필터

```
Gx:                    Gy:
[-1  0  1]            [-1 -1 -1]
[-1  0  1]            [ 0  0  0]
[-1  0  1]            [ 1  1  1]
```

### 6.2 Laplacian 필터

```
[ 0 -1  0]
[-1  4 -1]
[ 0 -1  0]
```

---

## 7. 오늘의 실습

### 실습 1: Sobel 구현
- [ ] edge_detection.cu 작성
- [ ] 테스트 이미지로 실행

### 실습 2: 임계값 실험
- [ ] threshold = 30, 50, 100 비교
- [ ] 최적 값 찾기

### 실습 3: 다른 필터 구현
- [ ] Prewitt 필터 구현
- [ ] Laplacian 필터 구현
- [ ] Sobel과 비교

---

## 8. 다음 시간 예고

내일은 미니 프로젝트를 완성합니다!
- 여러 필터 통합
- 명령줄 옵션 처리
- 성능 측정 및 보고
