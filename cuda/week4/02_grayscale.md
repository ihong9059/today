# Day 2: Grayscale 변환

## 1. Grayscale이란?

컬러 이미지를 흑백으로 변환하는 것입니다.

```
컬러 (RGB)           Grayscale
┌─────────┐          ┌─────────┐
│ R G B   │    →     │  Gray   │
│255 0 0  │          │   76    │
└─────────┘          └─────────┘
  빨간색                어두운 회색
```

---

## 2. 변환 공식

### 2.1 단순 평균 (Simple Average)

```
Gray = (R + G + B) / 3
```

### 2.2 가중 평균 (Weighted Average) - 권장

인간의 눈은 초록색에 가장 민감합니다:

```
Gray = 0.299 × R + 0.587 × G + 0.114 × B
```

또는 정수 연산용:

```
Gray = (77 × R + 150 × G + 29 × B) / 256
```

---

## 3. CPU 구현

```c
void grayscaleCPU(unsigned char* input, unsigned char* output,
                   int width, int height) {
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            int idx = (y * width + x) * 3;

            unsigned char r = input[idx + 0];
            unsigned char g = input[idx + 1];
            unsigned char b = input[idx + 2];

            unsigned char gray = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);

            output[y * width + x] = gray;
        }
    }
}
```

---

## 4. GPU 구현

### 4.1 기본 커널

```c
__global__ void grayscaleGPU(unsigned char* input, unsigned char* output,
                              int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int rgbIdx = (y * width + x) * 3;
        int grayIdx = y * width + x;

        unsigned char r = input[rgbIdx + 0];
        unsigned char g = input[rgbIdx + 1];
        unsigned char b = input[rgbIdx + 2];

        // 가중 평균
        output[grayIdx] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
    }
}
```

### 4.2 정수 연산 커널 (더 빠름)

```c
__global__ void grayscaleGPU_int(unsigned char* input, unsigned char* output,
                                  int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int rgbIdx = (y * width + x) * 3;
        int grayIdx = y * width + x;

        unsigned int r = input[rgbIdx + 0];
        unsigned int g = input[rgbIdx + 1];
        unsigned int b = input[rgbIdx + 2];

        // 정수 연산 (부동소수점 연산 회피)
        output[grayIdx] = (unsigned char)((77 * r + 150 * g + 29 * b) >> 8);
    }
}
```

---

## 5. 완성 코드

```c
// grayscale.cu
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// GPU 커널
__global__ void grayscaleGPU(unsigned char* input, unsigned char* output,
                              int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int rgbIdx = (y * width + x) * 3;
        int grayIdx = y * width + x;

        unsigned char r = input[rgbIdx + 0];
        unsigned char g = input[rgbIdx + 1];
        unsigned char b = input[rgbIdx + 2];

        output[grayIdx] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
    }
}

// CPU 함수 (비교용)
void grayscaleCPU(unsigned char* input, unsigned char* output,
                   int width, int height) {
    for (int i = 0; i < width * height; i++) {
        int rgbIdx = i * 3;
        unsigned char r = input[rgbIdx + 0];
        unsigned char g = input[rgbIdx + 1];
        unsigned char b = input[rgbIdx + 2];
        output[i] = (unsigned char)(0.299f * r + 0.587f * g + 0.114f * b);
    }
}

int main(int argc, char** argv) {
    const char* inputFile = (argc > 1) ? argv[1] : "input.jpg";

    int width, height, channels;
    unsigned char* h_input = stbi_load(inputFile, &width, &height, &channels, 3);

    if (!h_input) {
        printf("Failed to load %s\n", inputFile);
        return 1;
    }

    printf("Image: %dx%d\n", width, height);

    size_t rgbSize = width * height * 3;
    size_t graySize = width * height;

    // 출력 메모리
    unsigned char* h_output_cpu = (unsigned char*)malloc(graySize);
    unsigned char* h_output_gpu = (unsigned char*)malloc(graySize);

    // GPU 메모리
    unsigned char *d_input, *d_output;
    cudaMalloc(&d_input, rgbSize);
    cudaMalloc(&d_output, graySize);

    cudaMemcpy(d_input, h_input, rgbSize, cudaMemcpyHostToDevice);

    // CPU 실행
    clock_t cpu_start = clock();
    grayscaleCPU(h_input, h_output_cpu, width, height);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // GPU 실행
    dim3 threads(16, 16);
    dim3 blocks((width + 15) / 16, (height + 15) / 16);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    grayscaleGPU<<<blocks, threads>>>(d_input, d_output, width, height);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_time;
    cudaEventElapsedTime(&gpu_time, start, stop);

    cudaMemcpy(h_output_gpu, d_output, graySize, cudaMemcpyDeviceToHost);

    // 결과 출력
    printf("CPU Time: %.3f ms\n", cpu_time);
    printf("GPU Time: %.3f ms\n", gpu_time);
    printf("Speedup: %.2fx\n", cpu_time / gpu_time);

    // 저장
    stbi_write_png("grayscale_cpu.png", width, height, 1, h_output_cpu, width);
    stbi_write_png("grayscale_gpu.png", width, height, 1, h_output_gpu, width);
    printf("Saved: grayscale_cpu.png, grayscale_gpu.png\n");

    // 정리
    cudaFree(d_input);
    cudaFree(d_output);
    free(h_output_cpu);
    free(h_output_gpu);
    stbi_image_free(h_input);

    return 0;
}
```

---

## 6. 컴파일 및 실행

```bash
nvcc grayscale.cu -o grayscale
./grayscale input.jpg
```

---

## 7. 오늘의 실습

### 실습 1: Grayscale 구현
- [ ] grayscale.cu 작성
- [ ] 테스트 이미지로 실행
- [ ] CPU vs GPU 성능 비교

### 실습 2: 정수 연산 버전
- [ ] grayscaleGPU_int 커널 구현
- [ ] 부동소수점 버전과 성능 비교

### 실습 3: 다양한 이미지 테스트
- [ ] 작은 이미지 (640x480)
- [ ] 큰 이미지 (1920x1080)
- [ ] 크기별 Speedup 비교

---

## 8. 다음 시간 예고

내일은 Blur 필터를 구현합니다!
- Box Blur 알고리즘
- Gaussian Blur
- Shared Memory 활용
