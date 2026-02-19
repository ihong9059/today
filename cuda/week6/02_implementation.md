# Day 2-4: 프로젝트 구현

## 1. 구현 가이드

### 1.1 Day 2: 기본 구조

- [ ] 프로젝트 폴더 구조 생성
- [ ] 핵심 기능 구현
- [ ] 기본 동작 확인

### 1.2 Day 3: GPU 최적화

- [ ] CUDA 커널 작성
- [ ] CPU vs GPU 성능 비교
- [ ] 병목 지점 최적화

### 1.3 Day 4: 완성

- [ ] 추가 기능 구현
- [ ] 에러 처리
- [ ] 테스트 및 디버깅
- [ ] 문서화

---

## 2. 예제 프로젝트 구현

### 2.1 프로젝트 구조

```bash
mkdir -p my_project/{src,include,data,docs}
cd my_project
```

```
my_project/
├── src/
│   ├── main.cu          # 메인 프로그램
│   ├── kernels.cu       # CUDA 커널
│   └── utils.cpp        # 유틸리티 함수
├── include/
│   ├── kernels.cuh      # 커널 헤더
│   └── utils.h          # 유틸리티 헤더
├── data/
│   └── test_images/     # 테스트 데이터
├── docs/
│   └── README.md        # 문서
├── Makefile             # 빌드 스크립트
└── run.sh               # 실행 스크립트
```

### 2.2 Makefile

```makefile
# Makefile
NVCC = nvcc
CXX = g++

CUDA_FLAGS = -O3 -arch=sm_53
OPENCV_FLAGS = `pkg-config --cflags --libs opencv4`

TARGET = my_project

SRCS = src/main.cu src/kernels.cu
OBJS = $(SRCS:.cu=.o)

all: $(TARGET)

$(TARGET): $(SRCS)
	$(NVCC) $(CUDA_FLAGS) $(OPENCV_FLAGS) -o $@ $^

clean:
	rm -f $(TARGET) $(OBJS)

run: $(TARGET)
	./$(TARGET)

.PHONY: all clean run
```

### 2.3 메인 프로그램 템플릿

```c
// src/main.cu
#include <stdio.h>
#include <opencv2/opencv.hpp>
#include "include/kernels.cuh"

int main(int argc, char** argv) {
    printf("=== My CUDA Project ===\n\n");

    // 1. 입력 처리
    if (argc < 2) {
        printf("Usage: %s <input>\n", argv[0]);
        return 1;
    }

    // 2. 데이터 로드
    cv::Mat input = cv::imread(argv[1]);
    if (input.empty()) {
        printf("Failed to load image!\n");
        return 1;
    }

    printf("Input: %dx%d\n", input.cols, input.rows);

    // 3. GPU 메모리 할당
    unsigned char *d_input, *d_output;
    size_t size = input.total() * input.elemSize();

    cudaMalloc(&d_input, size);
    cudaMalloc(&d_output, size);

    // 4. 데이터 복사
    cudaMemcpy(d_input, input.data, size, cudaMemcpyHostToDevice);

    // 5. 커널 실행
    dim3 threads(16, 16);
    dim3 blocks((input.cols + 15) / 16, (input.rows + 15) / 16);

    myKernel<<<blocks, threads>>>(d_input, d_output,
                                   input.cols, input.rows, input.channels());

    cudaDeviceSynchronize();

    // 6. 결과 복사
    cv::Mat output(input.size(), input.type());
    cudaMemcpy(output.data, d_output, size, cudaMemcpyDeviceToHost);

    // 7. 결과 저장
    cv::imwrite("output.png", output);
    printf("Saved: output.png\n");

    // 8. 정리
    cudaFree(d_input);
    cudaFree(d_output);

    printf("Done!\n");
    return 0;
}
```

### 2.4 커널 템플릿

```c
// src/kernels.cu
#include "include/kernels.cuh"

__global__ void myKernel(unsigned char* input, unsigned char* output,
                          int width, int height, int channels) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = (y * width + x) * channels;

        // 예: 색상 반전
        for (int c = 0; c < channels; c++) {
            output[idx + c] = 255 - input[idx + c];
        }
    }
}
```

---

## 3. 디버깅 팁

### 3.1 CUDA 에러 체크

```c
#define CUDA_CHECK(call) \
    do { \
        cudaError_t err = call; \
        if (err != cudaSuccess) { \
            printf("CUDA Error: %s at %s:%d\n", \
                   cudaGetErrorString(err), __FILE__, __LINE__); \
            exit(1); \
        } \
    } while(0)

// 사용
CUDA_CHECK(cudaMalloc(&d_data, size));
```

### 3.2 커널 에러 체크

```c
myKernel<<<blocks, threads>>>(...);
CUDA_CHECK(cudaGetLastError());
CUDA_CHECK(cudaDeviceSynchronize());
```

### 3.3 printf 디버깅

```c
__global__ void debugKernel(...) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;

    if (idx == 0) {  // 첫 번째 스레드만
        printf("Debug: value = %d\n", someValue);
    }
}
```

---

## 4. 성능 측정

### 4.1 CUDA Events

```c
cudaEvent_t start, stop;
cudaEventCreate(&start);
cudaEventCreate(&stop);

cudaEventRecord(start);
// 측정할 코드
myKernel<<<blocks, threads>>>(...);
cudaEventRecord(stop);

cudaEventSynchronize(stop);

float ms;
cudaEventElapsedTime(&ms, start, stop);
printf("Kernel time: %.3f ms\n", ms);
```

### 4.2 전체 시간 측정

```c
#include <chrono>

auto start = std::chrono::high_resolution_clock::now();
// 측정할 코드
auto end = std::chrono::high_resolution_clock::now();

auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
printf("Total time: %ld ms\n", duration.count());
```

---

## 5. 코드 정리

### 5.1 체크리스트

- [ ] 불필요한 코드 제거
- [ ] 주석 추가
- [ ] 함수 분리
- [ ] 상수 정의
- [ ] 에러 처리

### 5.2 코드 스타일

```c
// 좋은 예
#define BLOCK_SIZE 16
#define MAX_ITERATIONS 100

__global__ void processImage(unsigned char* data, int width, int height) {
    // 명확한 변수명
    int pixelX = blockIdx.x * blockDim.x + threadIdx.x;
    int pixelY = blockIdx.y * blockDim.y + threadIdx.y;

    // 경계 체크
    if (pixelX >= width || pixelY >= height) return;

    // 처리 로직
    int index = pixelY * width + pixelX;
    data[index] = processPixel(data[index]);
}
```

---

## 6. 내일 준비

### 6.1 발표 준비

- [ ] 슬라이드 준비 (5~10장)
- [ ] 데모 준비
- [ ] 질문 예상 및 답변 준비

### 6.2 문서화

- [ ] README.md 작성
- [ ] 사용법 설명
- [ ] 성능 결과 정리
