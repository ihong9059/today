# Day 5: 미니 프로젝트

## 1. 프로젝트 개요

### 1.1 목표

이번 주에 배운 내용을 통합한 **이미지 처리 프로그램** 완성

### 1.2 기능

1. Grayscale 변환
2. Blur 필터 (크기 조절 가능)
3. Edge Detection
4. 밝기 조절
5. 여러 필터 조합

---

## 2. 프로젝트 구조

```
week4/project/
├── main.cu           # 메인 프로그램
├── filters.cuh       # 커널 함수 헤더
├── stb_image.h       # 이미지 읽기
├── stb_image_write.h # 이미지 쓰기
├── input.jpg         # 테스트 이미지
└── Makefile          # 빌드 스크립트
```

---

## 3. 완성 코드

### 3.1 filters.cuh

```c
// filters.cuh - CUDA 이미지 필터 커널들
#ifndef FILTERS_CUH
#define FILTERS_CUH

// Grayscale 변환
__global__ void grayscaleKernel(unsigned char* input, unsigned char* output,
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

// Box Blur
__global__ void blurKernel(unsigned char* input, unsigned char* output,
                            int width, int height, int radius) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        float sum = 0;
        int count = 0;

        for (int dy = -radius; dy <= radius; dy++) {
            for (int dx = -radius; dx <= radius; dx++) {
                int nx = min(max(x + dx, 0), width - 1);
                int ny = min(max(y + dy, 0), height - 1);
                sum += input[ny * width + nx];
                count++;
            }
        }
        output[y * width + x] = (unsigned char)(sum / count);
    }
}

// Sobel Edge Detection
__constant__ int d_sobelX[9] = {-1, 0, 1, -2, 0, 2, -1, 0, 1};
__constant__ int d_sobelY[9] = {-1, -2, -1, 0, 0, 0, 1, 2, 1};

__global__ void sobelKernel(unsigned char* input, unsigned char* output,
                             int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
        float gx = 0, gy = 0;
        int k = 0;

        for (int dy = -1; dy <= 1; dy++) {
            for (int dx = -1; dx <= 1; dx++) {
                unsigned char pixel = input[(y + dy) * width + (x + dx)];
                gx += pixel * d_sobelX[k];
                gy += pixel * d_sobelY[k];
                k++;
            }
        }
        float magnitude = sqrtf(gx * gx + gy * gy);
        output[y * width + x] = (unsigned char)min(magnitude, 255.0f);
    } else if (x < width && y < height) {
        output[y * width + x] = 0;
    }
}

// 밝기 조절
__global__ void brightnessKernel(unsigned char* image, int width, int height,
                                  int channels, int adjustment) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        for (int c = 0; c < channels; c++) {
            int idx = (y * width + x) * channels + c;
            int newVal = image[idx] + adjustment;
            image[idx] = (unsigned char)min(max(newVal, 0), 255);
        }
    }
}

// 이미지 반전
__global__ void invertKernel(unsigned char* image, int width, int height,
                              int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        for (int c = 0; c < channels && c < 3; c++) {
            int idx = (y * width + x) * channels + c;
            image[idx] = 255 - image[idx];
        }
    }
}

#endif // FILTERS_CUH
```

### 3.2 main.cu

```c
// main.cu - CUDA 이미지 처리 프로그램
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

#include <stdio.h>
#include <string.h>
#include "filters.cuh"

void printUsage(const char* progName) {
    printf("Usage: %s <input> <output> <filter> [options]\n\n", progName);
    printf("Filters:\n");
    printf("  grayscale          - Convert to grayscale\n");
    printf("  blur <radius>      - Apply box blur (default radius: 2)\n");
    printf("  edge               - Sobel edge detection\n");
    printf("  brightness <value> - Adjust brightness (-255 to 255)\n");
    printf("  invert             - Invert colors\n");
    printf("  all                - Apply grayscale + blur + edge\n");
}

int main(int argc, char** argv) {
    if (argc < 4) {
        printUsage(argv[0]);
        return 1;
    }

    const char* inputFile = argv[1];
    const char* outputFile = argv[2];
    const char* filter = argv[3];

    // 이미지 로드
    int width, height, channels;
    unsigned char* h_input = stbi_load(inputFile, &width, &height, &channels, 0);

    if (!h_input) {
        printf("Error: Failed to load %s\n", inputFile);
        return 1;
    }

    printf("Input: %s (%dx%d, %d channels)\n", inputFile, width, height, channels);
    printf("Filter: %s\n", filter);

    size_t rgbSize = width * height * channels;
    size_t graySize = width * height;

    // GPU 메모리
    unsigned char *d_input, *d_gray, *d_output;
    cudaMalloc(&d_input, rgbSize);
    cudaMalloc(&d_gray, graySize);
    cudaMalloc(&d_output, graySize);

    cudaMemcpy(d_input, h_input, rgbSize, cudaMemcpyHostToDevice);

    dim3 threads(16, 16);
    dim3 blocks((width + 15) / 16, (height + 15) / 16);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);
    cudaEventRecord(start);

    unsigned char* h_output = NULL;
    int outChannels = channels;

    // 필터 적용
    if (strcmp(filter, "grayscale") == 0) {
        grayscaleKernel<<<blocks, threads>>>(d_input, d_gray, width, height, channels);
        h_output = (unsigned char*)malloc(graySize);
        cudaMemcpy(h_output, d_gray, graySize, cudaMemcpyDeviceToHost);
        outChannels = 1;

    } else if (strcmp(filter, "blur") == 0) {
        int radius = (argc > 4) ? atoi(argv[4]) : 2;
        printf("Blur radius: %d\n", radius);

        // Grayscale 먼저
        grayscaleKernel<<<blocks, threads>>>(d_input, d_gray, width, height, channels);
        blurKernel<<<blocks, threads>>>(d_gray, d_output, width, height, radius);

        h_output = (unsigned char*)malloc(graySize);
        cudaMemcpy(h_output, d_output, graySize, cudaMemcpyDeviceToHost);
        outChannels = 1;

    } else if (strcmp(filter, "edge") == 0) {
        grayscaleKernel<<<blocks, threads>>>(d_input, d_gray, width, height, channels);
        sobelKernel<<<blocks, threads>>>(d_gray, d_output, width, height);

        h_output = (unsigned char*)malloc(graySize);
        cudaMemcpy(h_output, d_output, graySize, cudaMemcpyDeviceToHost);
        outChannels = 1;

    } else if (strcmp(filter, "brightness") == 0) {
        int adjustment = (argc > 4) ? atoi(argv[4]) : 50;
        printf("Brightness adjustment: %d\n", adjustment);

        brightnessKernel<<<blocks, threads>>>(d_input, width, height, channels, adjustment);

        h_output = (unsigned char*)malloc(rgbSize);
        cudaMemcpy(h_output, d_input, rgbSize, cudaMemcpyDeviceToHost);

    } else if (strcmp(filter, "invert") == 0) {
        invertKernel<<<blocks, threads>>>(d_input, width, height, channels);

        h_output = (unsigned char*)malloc(rgbSize);
        cudaMemcpy(h_output, d_input, rgbSize, cudaMemcpyDeviceToHost);

    } else if (strcmp(filter, "all") == 0) {
        // Grayscale → Blur → Edge
        grayscaleKernel<<<blocks, threads>>>(d_input, d_gray, width, height, channels);
        blurKernel<<<blocks, threads>>>(d_gray, d_output, width, height, 1);
        cudaMemcpy(d_gray, d_output, graySize, cudaMemcpyDeviceToDevice);
        sobelKernel<<<blocks, threads>>>(d_gray, d_output, width, height);

        h_output = (unsigned char*)malloc(graySize);
        cudaMemcpy(h_output, d_output, graySize, cudaMemcpyDeviceToHost);
        outChannels = 1;

    } else {
        printf("Unknown filter: %s\n", filter);
        printUsage(argv[0]);
        stbi_image_free(h_input);
        cudaFree(d_input);
        cudaFree(d_gray);
        cudaFree(d_output);
        return 1;
    }

    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms;
    cudaEventElapsedTime(&ms, start, stop);
    printf("Processing time: %.3f ms\n", ms);

    // 저장
    stbi_write_png(outputFile, width, height, outChannels, h_output, width * outChannels);
    printf("Output: %s\n", outputFile);

    // 정리
    cudaFree(d_input);
    cudaFree(d_gray);
    cudaFree(d_output);
    free(h_output);
    stbi_image_free(h_input);

    printf("Done!\n");
    return 0;
}
```

---

## 4. 컴파일 및 실행

### 4.1 컴파일

```bash
nvcc main.cu -o imgproc
```

### 4.2 사용 예시

```bash
# Grayscale
./imgproc input.jpg gray.png grayscale

# Blur (반경 5)
./imgproc input.jpg blur.png blur 5

# Edge Detection
./imgproc input.jpg edge.png edge

# 밝기 증가
./imgproc input.jpg bright.png brightness 50

# 색상 반전
./imgproc input.jpg invert.png invert

# 모든 필터 적용
./imgproc input.jpg all.png all
```

---

## 5. 확장 아이디어

### 5.1 추가 필터
- Sepia 효과
- Sharpen
- Gaussian Blur

### 5.2 기능 개선
- 여러 필터 순차 적용
- 배치 처리 (여러 이미지)
- GUI 연동

---

## 6. 이번 주 정리

### 6.1 학습 내용
1. 이미지 데이터 구조
2. stb_image 라이브러리 사용
3. Grayscale, Blur, Edge 필터 구현
4. CUDA 이미지 처리 파이프라인

### 6.2 핵심 패턴
```c
// 픽셀당 하나의 스레드
int x = blockIdx.x * blockDim.x + threadIdx.x;
int y = blockIdx.y * blockDim.y + threadIdx.y;

// 2D Grid 설정
dim3 threads(16, 16);
dim3 blocks((width + 15) / 16, (height + 15) / 16);
```

---

## 7. 다음 주 예고

**Week 5: TensorRT/OpenCV 연동**

- OpenCV와 CUDA 연동
- TensorRT 소개
- AI 추론 가속화
