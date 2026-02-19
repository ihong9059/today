# Day 2: CUDA 메모리 할당

## 1. CPU vs GPU 메모리

### 1.1 일반 컴퓨터의 메모리 구조

```
┌─────────────────────────────────────────┐
│                  CPU                    │
│            ┌──────────┐                 │
│            │  RAM     │  ← CPU 메모리   │
│            │  (Host)  │                 │
│            └──────────┘                 │
└─────────────────────────────────────────┘
                  │
                  │ PCIe (데이터 전송)
                  │
┌─────────────────────────────────────────┐
│                  GPU                    │
│            ┌──────────┐                 │
│            │  VRAM    │  ← GPU 메모리   │
│            │ (Device) │                 │
│            └──────────┘                 │
└─────────────────────────────────────────┘
```

### 1.2 Jetson의 메모리 구조 (Unified Memory)

```
┌─────────────────────────────────────────┐
│              Jetson                     │
│                                         │
│  ┌────────────────────────────────────┐ │
│  │        공유 메모리 (RAM)            │ │
│  │     CPU와 GPU가 함께 사용           │ │
│  └────────────────────────────────────┘ │
│         ↑                    ↑          │
│        CPU                  GPU         │
└─────────────────────────────────────────┘
```

**Jetson의 장점**: 메모리 복사 불필요 또는 자동 처리!

---

## 2. 전통적인 CUDA 메모리 관리

일반 GPU에서 사용하는 방법입니다. Jetson에서도 동작하지만, 더 쉬운 방법이 있습니다.

### 2.1 기본 함수들

| 함수 | 설명 |
|------|------|
| `cudaMalloc()` | GPU 메모리 할당 |
| `cudaMemcpy()` | 데이터 복사 |
| `cudaFree()` | GPU 메모리 해제 |

### 2.2 cudaMalloc

```c
// GPU 메모리 할당
float *d_array;  // d_ : device(GPU)를 의미
size_t size = 1000 * sizeof(float);

cudaMalloc(&d_array, size);
// 또는
cudaMalloc((void**)&d_array, size);
```

### 2.3 cudaMemcpy

```c
// 복사 방향 지정
cudaMemcpy(dst, src, size, direction);

// direction 옵션:
// cudaMemcpyHostToDevice   : CPU → GPU
// cudaMemcpyDeviceToHost   : GPU → CPU
// cudaMemcpyDeviceToDevice : GPU → GPU
```

**예시:**
```c
float h_array[1000];  // h_ : host(CPU)를 의미
float *d_array;

// CPU → GPU 복사
cudaMemcpy(d_array, h_array, size, cudaMemcpyHostToDevice);

// GPU → CPU 복사
cudaMemcpy(h_array, d_array, size, cudaMemcpyDeviceToHost);
```

### 2.4 cudaFree

```c
// GPU 메모리 해제
cudaFree(d_array);
```

---

## 3. 전통적 방식 전체 흐름

```c
#include <stdio.h>

__global__ void kernel(float* data, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        data[idx] = data[idx] * 2;
    }
}

int main() {
    int n = 1000;
    size_t size = n * sizeof(float);

    // 1. CPU 메모리 할당 및 초기화
    float *h_data = (float*)malloc(size);
    for (int i = 0; i < n; i++) {
        h_data[i] = i;
    }

    // 2. GPU 메모리 할당
    float *d_data;
    cudaMalloc(&d_data, size);

    // 3. CPU → GPU 복사
    cudaMemcpy(d_data, h_data, size, cudaMemcpyHostToDevice);

    // 4. 커널 실행
    int threads = 256;
    int blocks = (n + threads - 1) / threads;
    kernel<<<blocks, threads>>>(d_data, n);

    // 5. GPU → CPU 복사
    cudaMemcpy(h_data, d_data, size, cudaMemcpyDeviceToHost);

    // 6. 결과 확인
    printf("h_data[0] = %f\n", h_data[0]);  // 0
    printf("h_data[1] = %f\n", h_data[1]);  // 2

    // 7. 메모리 해제
    cudaFree(d_data);
    free(h_data);

    return 0;
}
```

---

## 4. Unified Memory (Jetson 권장)

### 4.1 cudaMallocManaged

Jetson에서는 `cudaMallocManaged`를 사용하면 CPU와 GPU 모두에서 접근 가능한 메모리를 할당합니다.

```c
float *data;
cudaMallocManaged(&data, size);

// CPU에서 접근
data[0] = 1.0f;

// GPU에서도 접근 (커널 내부)
data[0] = data[0] * 2;
```

### 4.2 Unified Memory 흐름

```c
#include <stdio.h>

__global__ void kernel(float* data, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        data[idx] = data[idx] * 2;
    }
}

int main() {
    int n = 1000;
    size_t size = n * sizeof(float);

    // 1. Unified Memory 할당
    float *data;
    cudaMallocManaged(&data, size);

    // 2. CPU에서 초기화 (복사 불필요!)
    for (int i = 0; i < n; i++) {
        data[i] = i;
    }

    // 3. 커널 실행
    int threads = 256;
    int blocks = (n + threads - 1) / threads;
    kernel<<<blocks, threads>>>(data, n);

    // 4. 동기화 (중요!)
    cudaDeviceSynchronize();

    // 5. CPU에서 결과 확인 (복사 불필요!)
    printf("data[0] = %f\n", data[0]);  // 0
    printf("data[1] = %f\n", data[1]);  // 2

    // 6. 메모리 해제
    cudaFree(data);

    return 0;
}
```

### 4.3 비교

| 항목 | 전통적 방식 | Unified Memory |
|------|------------|----------------|
| 메모리 할당 | cudaMalloc | cudaMallocManaged |
| CPU→GPU 복사 | 필요 | 자동 |
| GPU→CPU 복사 | 필요 | 자동 |
| 코드 복잡도 | 높음 | 낮음 |
| 성능 | 수동 최적화 가능 | 자동 최적화 |

---

## 5. 에러 처리

### 5.1 기본 에러 체크

```c
cudaError_t err = cudaMalloc(&d_data, size);
if (err != cudaSuccess) {
    printf("CUDA Error: %s\n", cudaGetErrorString(err));
    exit(1);
}
```

### 5.2 매크로로 간편하게

```c
#define CUDA_CHECK(call) \
    do { \
        cudaError_t err = call; \
        if (err != cudaSuccess) { \
            printf("CUDA Error at %s:%d - %s\n", \
                   __FILE__, __LINE__, cudaGetErrorString(err)); \
            exit(1); \
        } \
    } while(0)

// 사용
CUDA_CHECK(cudaMalloc(&d_data, size));
CUDA_CHECK(cudaMemcpy(d_data, h_data, size, cudaMemcpyHostToDevice));
```

---

## 6. 실습 코드

### 6.1 전통적 방식 (traditional_memory.cu)

```c
// traditional_memory.cu
#include <stdio.h>
#include <stdlib.h>

__global__ void doubleArray(float* data, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        data[idx] *= 2;
    }
}

int main() {
    int n = 10;
    size_t size = n * sizeof(float);

    // CPU 메모리
    float *h_data = (float*)malloc(size);
    for (int i = 0; i < n; i++) {
        h_data[i] = i;
    }

    printf("Before (CPU):\n");
    for (int i = 0; i < n; i++) {
        printf("%.0f ", h_data[i]);
    }
    printf("\n\n");

    // GPU 메모리
    float *d_data;
    cudaMalloc(&d_data, size);

    // CPU → GPU
    cudaMemcpy(d_data, h_data, size, cudaMemcpyHostToDevice);

    // 커널 실행
    doubleArray<<<1, n>>>(d_data, n);

    // GPU → CPU
    cudaMemcpy(h_data, d_data, size, cudaMemcpyDeviceToHost);

    printf("After (GPU doubled):\n");
    for (int i = 0; i < n; i++) {
        printf("%.0f ", h_data[i]);
    }
    printf("\n");

    // 해제
    cudaFree(d_data);
    free(h_data);

    return 0;
}
```

### 6.2 Unified Memory 방식 (unified_memory.cu)

```c
// unified_memory.cu
#include <stdio.h>

__global__ void doubleArray(float* data, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        data[idx] *= 2;
    }
}

int main() {
    int n = 10;
    size_t size = n * sizeof(float);

    // Unified Memory 할당
    float *data;
    cudaMallocManaged(&data, size);

    // CPU에서 초기화
    for (int i = 0; i < n; i++) {
        data[i] = i;
    }

    printf("Before:\n");
    for (int i = 0; i < n; i++) {
        printf("%.0f ", data[i]);
    }
    printf("\n\n");

    // 커널 실행
    doubleArray<<<1, n>>>(data, n);
    cudaDeviceSynchronize();

    // CPU에서 바로 접근 (복사 불필요!)
    printf("After (GPU doubled):\n");
    for (int i = 0; i < n; i++) {
        printf("%.0f ", data[i]);
    }
    printf("\n");

    // 해제
    cudaFree(data);

    return 0;
}
```

---

## 7. 오늘의 실습

### 실습 1: 전통적 방식
- [ ] `traditional_memory.cu` 작성
- [ ] 컴파일 및 실행
- [ ] cudaMemcpy 방향 이해

### 실습 2: Unified Memory
- [ ] `unified_memory.cu` 작성
- [ ] 컴파일 및 실행
- [ ] 코드가 더 간단한지 비교

### 실습 3: 데이터 크기 변경
- [ ] n = 1000으로 변경
- [ ] 블록 수 계산 추가

---

## 8. 용어 정리

| 용어 | 의미 |
|------|------|
| **Host** | CPU와 CPU 메모리 |
| **Device** | GPU와 GPU 메모리 |
| **h_변수** | Host(CPU) 메모리의 변수 |
| **d_변수** | Device(GPU) 메모리의 변수 |
| **Unified Memory** | CPU/GPU 공유 메모리 |
| **cudaMallocManaged** | Unified Memory 할당 함수 |

---

## 9. 다음 시간 예고

내일은 Vector Addition을 구현합니다!
- 두 배열의 덧셈
- GPU로 병렬 처리
- 성능 비교
