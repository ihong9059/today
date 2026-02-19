# Day 3: Vector Addition

## 1. Vector Addition이란?

두 벡터(배열)의 같은 위치 원소를 더하는 연산입니다.

```
A = [1, 2, 3, 4, 5]
B = [10, 20, 30, 40, 50]
────────────────────────
C = [11, 22, 33, 44, 55]
```

### 1.1 왜 GPU에 적합한가?

```
CPU 방식 (순차 처리):
A[0]+B[0] → A[1]+B[1] → A[2]+B[2] → A[3]+B[3] → ...
    ↓          ↓          ↓          ↓
   C[0]       C[1]       C[2]       C[3]

GPU 방식 (병렬 처리):
A[0]+B[0]   A[1]+B[1]   A[2]+B[2]   A[3]+B[3]
    ↓          ↓          ↓          ↓
   C[0]       C[1]       C[2]       C[3]
         ↑ 동시에 처리! ↑
```

- 각 덧셈이 **독립적** (다른 결과에 영향 없음)
- **같은 연산** 반복
- 데이터가 **많을수록** GPU 효과 증가

---

## 2. CPU 버전

먼저 CPU로 구현해봅시다.

```c
// CPU 버전
void vectorAddCPU(float* a, float* b, float* c, int n) {
    for (int i = 0; i < n; i++) {
        c[i] = a[i] + b[i];
    }
}
```

---

## 3. GPU 버전 (커널)

### 3.1 기본 커널

```c
__global__ void vectorAddGPU(float* a, float* b, float* c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;

    if (idx < n) {  // 범위 체크 중요!
        c[idx] = a[idx] + b[idx];
    }
}
```

### 3.2 각 스레드의 역할

```
스레드 0: c[0] = a[0] + b[0]
스레드 1: c[1] = a[1] + b[1]
스레드 2: c[2] = a[2] + b[2]
...
스레드 n-1: c[n-1] = a[n-1] + b[n-1]
```

---

## 4. 전체 코드 (Unified Memory)

```c
// vector_add.cu
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// GPU 커널
__global__ void vectorAddGPU(float* a, float* b, float* c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        c[idx] = a[idx] + b[idx];
    }
}

// CPU 함수 (비교용)
void vectorAddCPU(float* a, float* b, float* c, int n) {
    for (int i = 0; i < n; i++) {
        c[i] = a[i] + b[i];
    }
}

// 결과 검증
void verify(float* cpu, float* gpu, int n) {
    for (int i = 0; i < n; i++) {
        if (abs(cpu[i] - gpu[i]) > 0.0001) {
            printf("Mismatch at %d: CPU=%f, GPU=%f\n", i, cpu[i], gpu[i]);
            return;
        }
    }
    printf("Results match!\n");
}

int main() {
    int n = 1000000;  // 100만 개
    size_t size = n * sizeof(float);

    printf("Vector Addition: %d elements\n\n", n);

    // Unified Memory 할당
    float *a, *b, *c_gpu, *c_cpu;
    cudaMallocManaged(&a, size);
    cudaMallocManaged(&b, size);
    cudaMallocManaged(&c_gpu, size);
    c_cpu = (float*)malloc(size);

    // 데이터 초기화
    for (int i = 0; i < n; i++) {
        a[i] = rand() / (float)RAND_MAX;
        b[i] = rand() / (float)RAND_MAX;
    }

    // ===== CPU 실행 =====
    clock_t cpu_start = clock();
    vectorAddCPU(a, b, c_cpu, n);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // ===== GPU 실행 =====
    int threadsPerBlock = 256;
    int blocksPerGrid = (n + threadsPerBlock - 1) / threadsPerBlock;

    clock_t gpu_start = clock();
    vectorAddGPU<<<blocksPerGrid, threadsPerBlock>>>(a, b, c_gpu, n);
    cudaDeviceSynchronize();
    clock_t gpu_end = clock();
    double gpu_time = (double)(gpu_end - gpu_start) / CLOCKS_PER_SEC * 1000;

    // 결과 출력
    printf("CPU Time: %.3f ms\n", cpu_time);
    printf("GPU Time: %.3f ms\n", gpu_time);
    printf("Speedup: %.2fx\n\n", cpu_time / gpu_time);

    // 검증
    verify(c_cpu, c_gpu, n);

    // 처음 5개 결과 확인
    printf("\nFirst 5 results:\n");
    for (int i = 0; i < 5; i++) {
        printf("a[%d]=%.4f + b[%d]=%.4f = c[%d]=%.4f\n",
               i, a[i], i, b[i], i, c_gpu[i]);
    }

    // 메모리 해제
    cudaFree(a);
    cudaFree(b);
    cudaFree(c_gpu);
    free(c_cpu);

    return 0;
}
```

---

## 5. 컴파일 및 실행

```bash
nvcc vector_add.cu -o vector_add
./vector_add
```

**예상 출력:**
```
Vector Addition: 1000000 elements

CPU Time: 5.234 ms
GPU Time: 0.892 ms
Speedup: 5.87x

Results match!

First 5 results:
a[0]=0.8402 + b[0]=0.3944 = c[0]=1.2346
a[1]=0.7831 + b[1]=0.7984 = c[1]=1.5815
...
```

---

## 6. 코드 분석

### 6.1 블록 수 계산

```c
int threadsPerBlock = 256;
int blocksPerGrid = (n + threadsPerBlock - 1) / threadsPerBlock;
```

| n | threadsPerBlock | blocksPerGrid | 총 스레드 |
|---|-----------------|---------------|----------|
| 1000 | 256 | 4 | 1024 |
| 1000000 | 256 | 3907 | 1000192 |

### 6.2 범위 체크

```c
if (idx < n) {  // 필수!
    c[idx] = a[idx] + b[idx];
}
```

총 스레드(1000192) > 데이터(1000000)이므로, 192개 스레드는 아무것도 안 함.

---

## 7. 성능 향상 팁

### 7.1 데이터 크기가 클수록 GPU 유리

| 데이터 크기 | CPU 시간 | GPU 시간 | 속도 향상 |
|------------|---------|---------|----------|
| 1,000 | 0.01 ms | 0.5 ms | 0.02x (GPU 느림) |
| 100,000 | 0.5 ms | 0.6 ms | 0.8x (비슷) |
| 1,000,000 | 5 ms | 1 ms | 5x (GPU 빠름) |
| 10,000,000 | 50 ms | 3 ms | 16x (GPU 매우 빠름) |

### 7.2 GPU 오버헤드

- 커널 호출 시간
- 메모리 전송 시간 (Unified Memory는 자동)
- 동기화 시간

작은 데이터에서는 오버헤드가 연산 시간보다 클 수 있음!

---

## 8. 더 정확한 시간 측정

### 8.1 CUDA Events 사용

```c
cudaEvent_t start, stop;
cudaEventCreate(&start);
cudaEventCreate(&stop);

cudaEventRecord(start);
vectorAddGPU<<<blocks, threads>>>(a, b, c, n);
cudaEventRecord(stop);

cudaEventSynchronize(stop);

float milliseconds = 0;
cudaEventElapsedTime(&milliseconds, start, stop);

printf("GPU Time: %.3f ms\n", milliseconds);

cudaEventDestroy(start);
cudaEventDestroy(stop);
```

---

## 9. 오늘의 실습

### 실습 1: 기본 Vector Addition
- [ ] `vector_add.cu` 작성
- [ ] n = 1000으로 테스트
- [ ] n = 1000000으로 테스트
- [ ] 속도 비교

### 실습 2: 다양한 연산
- [ ] 덧셈 대신 뺄셈으로 변경
- [ ] 덧셈 대신 곱셈으로 변경
- [ ] c[i] = a[i] * a[i] + b[i] * b[i] 구현

### 실습 3: 블록 크기 실험
- [ ] threadsPerBlock = 128로 변경
- [ ] threadsPerBlock = 512로 변경
- [ ] 성능 차이 관찰

---

## 10. 연습 문제

### 문제 1: 세 벡터 덧셈

세 벡터를 더하는 커널을 작성하세요: D = A + B + C

```c
__global__ void vectorAdd3(float* a, float* b, float* c, float* d, int n) {
    // 여기에 코드 작성
}
```

### 문제 2: 스칼라 곱셈

벡터의 모든 원소에 상수를 곱하는 커널:

```c
// B = A * scalar
__global__ void scalarMul(float* a, float* b, float scalar, int n) {
    // 여기에 코드 작성
}
```

---

## 11. 용어 정리

| 용어 | 의미 |
|------|------|
| **Vector** | 1차원 배열 |
| **Speedup** | CPU 시간 / GPU 시간 |
| **Overhead** | 부가적인 시간 비용 |
| **CUDA Event** | GPU 시간 측정 도구 |

---

## 12. 다음 시간 예고

내일은 Unified Memory를 더 자세히 알아봅니다!
- Unified Memory vs 전통적 방식 비교
- 메모리 프리패칭
- Jetson 최적화 팁
